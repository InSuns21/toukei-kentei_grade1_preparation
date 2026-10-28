# CAG1-04 射影空間上のねじり層と比較の基底例

[前章の解析化と完全列](../CAG1-03/index.md#thm-cag1-03-coherent-exact)により、代数的な連接層を解析側へ移しても局所的な関係式は失われない。しかし、局所的に同じ線束が貼り合わさったことだけでは、その**大域切断**や**高次コホモロジー**まで一致するとは言えない。[アフィン直線の比較](../CAG1-01/index.md#prop-cag1-01-affine-mismatch)では実際、大域正則関数に $e^z$ が増えた。

そこで最初の大域比較を、最も明示的に計算できる射影空間 $P=\mathbb P^n_{\mathbb C}$ とねじり層 $\mathcal O_P(d)$ で行う。ここでは $n\ge1$、$d\in\mathbb Z$ とし、斉次座標を $[X_0:\cdots:X_n]$ と書く。[代数側の全コホモロジー計算](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)は既習である。今回の問いは、**解析側で増えた無限級数が新しいコホモロジー類を生まないことを、一般GAGAを使わずに示せるか**である。

## 1. 標準チャートの交叉を解析側で見る

$U_i=\{X_i\ne0\}\subset P$ とし、空でない添字集合 $I\subseteq\{0,\ldots,n\}$ に対して $U_I=\bigcap_{i\in I}U_i$ と置く。$i_0\in I$ を一つ選び、$U_{i_0}$ 上の座標を $z_j=X_j/X_{i_0}$（$j\ne i_0$）とする。$U_I^{\mathrm{an}}$ では、追加で $j\in I\setminus\{i_0\}$ に属する $z_j$ が零でない。

たとえば $\mathbb P^2$ では $U_0^{\mathrm{an}}\simeq\mathbb C^2$、$U_{01}^{\mathrm{an}}\simeq\mathbb C^*\times\mathbb C$、$U_{012}^{\mathrm{an}}\simeq(\mathbb C^*)^2$ となる。ここで $\mathbb C^*=\mathbb C\setminus\{0\}$。**局所座標に極を持てる場所と、持てない場所が交叉ごとに変わる**。

解析的なねじり層には[前章の遷移関数](../CAG1-03/index.md#prop-cag1-03-analytic-twisting)を用いる。$U_i$ 上の局所基底を $e_i=X_i^d$ と書く記号規約では、重なりで $e_j=(X_j/X_i)^de_i$ である。任意の切断 $s$ を $s=f_ie_i=f_je_j$ と表示すると

$$
f_j=f_i\left(\frac{X_i}{X_j}\right)^d.
$$

この等式は $d<0$ でも使える。基底を取り替えると係数に現れるべきが**逆向き**になることに注意する。

この後に必要な「Stein」という条件も、判定手段から導入する。複素多様体 $M$ の大域正則関数全体を $\mathcal O(M)$ と書く。大域正則関数で異なる二点を区別でき、コンパクト集合から正則関数の大きさだけで作る包が再びコンパクトなら、解析幾何でいうStein性を持つ。

<a id="def-cag1-04-stein-manifold"></a>

<!-- formal-statement-start -->
> **定義（Stein複素多様体）**
> 複素多様体 $M$ が次の二条件を満たすとき、Stein複素多様体という。
>
> 1. 任意の異なる $p,q\in M$ について、$f(p)\ne f(q)$ となる $f\in\mathcal O(M)$ が存在する（正則分離性）。
> 2. 任意のコンパクト集合 $K\subset M$ について、正則凸包

$$
\widehat K_{\mathcal O}:=\{p\in M:
|f(p)|\le\sup_{x\in K}|f(x)|\ \text{for every }f\in\mathcal O(M)\}
$$

> がコンパクトである（正則凸性）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cag1-04-stein-manifold -->
**定義の確認**：$M=\mathbb C^*$ では $z$ が異なる二点を分離する。コンパクト $K\subset\mathbb C^*$ では $|z|$ の最大値 $R$ と $|1/z|$ の最大値 $S$ は有限なので、$\widehat K_{\mathcal O}$ は $1/S\le|z|\le R$ の閉円環に含まれる。正則凸包は連続関数の不等式の共通部分として閉であるからコンパクトとなり、二条件が確認できる。$M=\mathbb C$ も $z$ による分離と有界な閉円板への包の包含から同様に確認できる。
<!-- definition-example-end -->

<a id="prop-cag1-04-stein-intersections"></a>

<!-- formal-statement-start -->
> **命題（標準交叉のStein性とねじり層の表示）**
> $n\ge1$、$P=\mathbb P^n_{\mathbb C}$ とし、空でない $I\subseteq\{0,\ldots,n\}$ を選ぶ。$i_0\in I$ を固定すると

$$
U_I^{\mathrm{an}}\simeq
\mathbb C^{\,n+1-|I|}\times(\mathbb C^*)^{|I|-1}.
$$

> この解析的空間はStein複素多様体である。$\mathcal O_P(d)^{\mathrm{an}}$ はその上で自由階数1の正則層となり、局所基底 $e_{i_0}$ の係数は右辺の正則関数である。
<!-- formal-statement-end -->

### 証明の見取り図

座標のうち $|I|-1$ 個を零でないものに限定し、残りは自由に動かせる。[Steinの二条件](#def-cag1-04-stein-manifold)を、各座標関数と非零座標の逆数で直接確かめる。線束の自明性は局所基底を実際に持っていることから分かる。

<!-- proof-start -->
### 証明

$U_{i_0}$ では $z_j=X_j/X_{i_0}$（$j\ne i_0$）が自由な $n$ 個の複素座標である。$U_I$ へ制限すると $j\in I\setminus\{i_0\}$ の $|I|-1$ 座標だけが非零であり、他の $n-(|I|-1)=n+1-|I|$ 座標は任意である。したがって表示した正則座標同型を得る。

$\mathbb C^a\times(\mathbb C^*)^b$ の座標を $u_1,\ldots,u_a,v_1,\ldots,v_b$ と置く。異なる二点では少なくとも一つの座標が異なるので、座標関数 $u_j$ または $v_k$ が二点を分離する。[Steinの定義](#def-cag1-04-stein-manifold)の第一条件が成り立つ。

任意のコンパクト $K$ について、$|u_j|,|v_k|,|1/v_k|$ は $K$ 上で有限の最大値を持つ。正則凸包 $\widehat K_{\mathcal O}$ はこれらの大きさの上界で決まる、各 $u_j$ が有界かつ各 $v_k$ が零から離れた**コンパクトな多重円板・円環の積**に含まれる。正則凸包自体も連続関数の不等式の共通部分だから閉である。従って包はコンパクトで、第二条件も成り立つ。この二条件の直接検証から積はStein複素多様体である。

[ねじり層の局所表示](../CAG1-03/index.md#prop-cag1-03-analytic-twisting)より、$U_{i_0}^{\mathrm{an}}$ 上の解析化には非消失基底 $e_{i_0}$ がある。$U_I$ へ制限しても非消失なので、切断は一意に $f e_{i_0}$ と書ける。係数 $f$ が正則であることと切断の正則性は同値である。
<!-- proof-end -->

ここまでで得たのは各交叉の幾何である。次の段階では、この交叉上に高次コホモロジーが残らないことを要する。代数側の[アフィン消滅](../../AG/AG3-08/index.md#thm-ag3-08-affine-vanishing)を解析的な $\mathbb C^*$ へそのまま適用することはできない。

## 2. Stein消滅という解析的入力とČech比較

前節では[Stein複素多様体の定義](#def-cag1-04-stein-manifold)を使って、標準交叉での二条件を直接確かめた。ただしその二条件から高次コホモロジーの消滅を導くことは初等的でない。そこで次の解析的消滅定理を入力として使う。

<a id="thm-cag1-04-cartan-b"></a>

<!-- formal-statement-start -->
> **定理（Cartanの定理B）**
> $V$ をStein複素多様体、$\mathcal E$ を $V$ 上の**解析的連接層**とすると、任意の整数 $q\ge1$ について

$$
H^q(V,\mathcal E)=0.
$$

> が成り立つ。本章では複素多様体の場合だけを適用する。
<!-- formal-statement-end -->

この定理Bの証明はOka–Cartan理論に属する深い解析的結果であり、本講の前提講座からは導出していない。**未証明の入力として採用する**。なお、定理Bは高次の消滅であって、大域切断が零になるという意味ではない。たとえば $\mathbb C$ はSteinでも $e^z$ は正則な大域関数として残る。

<a id="def-cag1-04-analytic-cech"></a>

<!-- formal-statement-start -->
> **定義（解析的標準被覆Čech複体）**
> $P=\mathbb P^n_{\mathbb C}$（$n\ge1$）、$d\in\mathbb Z$ とし、$\mathfrak U^{\mathrm{an}}=\{U_i^{\mathrm{an}}\}_{i=0}^n$ を標準解析的開被覆とする。ねじり層 $\mathcal L=\mathcal O_P(d)^{\mathrm{an}}$ に対し、$0\le p\le n$ で

$$
C_{\mathrm{an},d}^{p}
=\bigoplus_{0\le i_0<\cdots<i_p\le n}
\Gamma(U_{i_0\cdots i_p}^{\mathrm{an}},\mathcal L)
$$

> と置き、$J=\{j_0<\cdots<j_{p+1}\}$ における微分を

$$
(\delta^pc)_J=
\sum_{\nu=0}^{p+1}(-1)^\nu
c_{J\setminus\{j_\nu\}}\big|_{U_J^{\mathrm{an}}}
$$

> とする。これを解析的標準被覆Čech複体とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cag1-04-analytic-cech -->
**定義の確認**：$n=2$ なら零次の切断の組は $(s_0,s_1,s_2)$、一次の組は $(t_{01},t_{02},t_{12})$ である。たとえば

$$
(\delta^0s)_{01}=s_1-s_0,
\qquad(\delta^1t)_{012}=t_{12}-t_{02}+t_{01}.
$$

したがって $(\delta^1\delta^0s)_{012}=(s_2-s_1)-(s_2-s_0)+(s_1-s_0)=0$。制限した切断を同じ基底で表してから引くので、異なるチャートの係数をそのまま無条件に引いてはいけない。
<!-- definition-example-end -->

代数側には[次数付きČech複体](../../AG/AG3-10/index.md#def-ag3-10-graded-cech) $C_d^\bullet$ がある。多項式やLaurent多項式は正則関数としても読めるため、[ねじり層の解析化](../CAG1-03/index.md#prop-cag1-03-analytic-twisting)は複体の自然な写像を与える。

$$
C_d^\bullet\longrightarrow C_{\mathrm{an},d}^\bullet.
$$

<a id="prop-cag1-04-analytic-cech-comparison"></a>

<!-- formal-statement-start -->
> **命題（解析的標準Čech複体による計算）**
> $n\ge1$、$d\in\mathbb Z$、$P=\mathbb P^n_{\mathbb C}$ とする。標準解析的被覆のČech複体は自然に

$$
H^q(C_{\mathrm{an},d}^\bullet)
\simeq H^q(P^{\mathrm{an}},\mathcal O_P(d)^{\mathrm{an}})
\qquad(q\ge0)
$$

> を満たす。特に右辺は $q>n$ で零である。
<!-- formal-statement-end -->

### 証明の見取り図

すべての有限交叉がSteinであり、ねじり層は解析的連接層なので、定理Bで各交叉上の高次群が消える。被覆のČech複体から層コホモロジーへの比較が同型になるための**交叉上の非巡回性**がここで初めて保証される。

<!-- proof-start -->
### 証明（Cartanの定理Bへの帰着）

[交叉のStein性](#prop-cag1-04-stein-intersections)と[解析化後の連接性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)から、各空でない $I$ に対し $\mathcal L|_{U_I^{\mathrm{an}}}$ はStein上の連接層である。[Cartanの定理B](#thm-cag1-04-cartan-b)を $V=U_I^{\mathrm{an}}$、$\mathcal E=\mathcal L|_V$ として適用すると

$$
H^r(U_I^{\mathrm{an}},\mathcal L)=0\qquad(r>0)
$$

が得られる。

比較の仕組みを明示する。$\mathcal L\to\mathcal I^\bullet$ をフラスク層による解消とし、各交叉上の切断を縦次数、Čechの交代微分を横次数に置く二重複体を考える。横方向を先に計算すると、フラスク層の有限被覆のČech正次数が消えるため、全複体は大域切断 $\Gamma(P^{\mathrm{an}},\mathcal I^\bullet)$ のコホモロジーを計算する。縦方向を先に計算すると、上の高次消滅で縦次数 $r>0$ が消え、縦次数零にはちょうど $C_{\mathrm{an},d}^\bullet$ が残る。これは[既習のČech比較の二重複体論法](../../AG/AG3-08/index.md#thm-ag3-08-cech-comparison)と同じ構造で、代数側のアフィン消滅をCartanの定理Bへ置き換えたものである。

被覆は $n+1$ 個の有限被覆なので横次数は $0,\ldots,n$ の有限範囲であり、両方向の計算は同じ全コホモロジーを与える。これで自然同型が従う。さらにČech複体には $p>n$ の項がないため、高次の消滅も従う。
<!-- proof-end -->

ここではまだ、代数的複体と解析的複体のコホモロジーが**一致する**とは証明していない。Stein性で得られたのは「それぞれをČech複体で計算してよい」という段階までである。

## 3. 正則Laurent級数の余分な項は消せるか

$U_{01}^{\mathrm{an}}\simeq\mathbb C^*\times\mathbb C^{n-1}$ 上では $1/z_1$ だけでなく $e^{z_1}$ や $e^{1/z_1}$ も正則である。したがって、代数側のLaurent**多項式**を解析側のLaurent**級数**へ置き換える必要がある。

[一変数のLaurent展開](../../../解析系/CA/CA4/index.md#thm-ca4-laurent)を各座標に順に適用する。座標を積型の閉多重円環に制限し、各係数をCauchy積分で取り出すと、多変数の級数はその内部の任意のコンパクト集合上で**絶対かつ一様に収束**する。反転しない座標ではTaylor級数となる。この積型の展開と収束は一変数の係数公式を各座標へ反復した結果であり、後の縮約が級数を壊さないための鍵となる。

斉次次数を $d$ に固定し、指数ベクトル $a=(a_0,\ldots,a_n)\in\mathbb Z^{n+1}$ には $\sum_i a_i=d$ を要求する。前提章の[負指数集合](../../AG/AG3-10/index.md#def-ag3-10-negative-support)を $N(a)=\{i:a_i<0\}$ と書く。

<a id="lem-cag1-04-analytic-laurent"></a>

<!-- formal-statement-start -->
> **補題（解析的Laurent級数の負指数分解）**
> $P=\mathbb P^n_{\mathbb C}$（$n\ge1$）、$d\in\mathbb Z$ とする。標準交叉 $U_I^{\mathrm{an}}$（$I\ne\varnothing$）上の $\mathcal O_P(d)^{\mathrm{an}}$ の切断は、$i_0\in I$ を固定した基底 $e_{i_0}$ に関して、唯一の正則Laurent級数

$$
\sum_{\substack{a\in\mathbb Z^{n+1},\ \sum_i a_i=d\\N(a)\subseteq I}}
c_a\prod_{j\ne i_0}z_j^{a_j}\,e_{i_0}
$$

> として表される（各コンパクト集合上で正規収束）。ここで $z_j=X_j/X_{i_0}$ である。制限写像とČech微分は各 $a$ の係数を混ぜない。また、ある $j\notin N(a)$ に対する非負指数部分の抽出は、$z_j=0$ を許す大きいチャートへ正則に延長できる。
<!-- formal-statement-end -->

### 証明の見取り図

反転を許す座標だけが負指数を持てる。無限級数である点以外は[代数側の単項式分解](../../AG/AG3-10/index.md#lem-ag3-10-monomial-splitting)と同じである。最後の延長可能性がないと、係数単位の代数的な縮約を解析的切断に戻せない。

<!-- proof-start -->
### 証明

$i_0\in I$ を固定する。[$U_I$ の座標表示](#prop-cag1-04-stein-intersections)では $j\in I\setminus\{i_0\}$ の座標が $\mathbb C^*$ を走り、$j\notin I$ の座標が $\mathbb C$ を走る。任意の正則係数関数 $f$ について、各反転座標では[Laurentの係数公式](../../../解析系/CA/CA4/index.md#thm-ca4-laurent)、反転しない座標ではCauchyのTaylor係数公式を順に使う。多重円の半径を固定したコンパクト多重円環上で係数を評価すると、各座標での幾何級数の上界の積により絶対一様収束する。コンパクト集合を包む多重円環を動かすことで、全領域における一意な展開を得る。

したがって $f=\sum_{(a_j)_{j\ne i_0}}c_a\prod_{j\ne i_0}z_j^{a_j}$ と書け、非反転座標には負指数が現れない。$a_{i_0}:=d-\sum_{j\ne i_0}a_j$ と置けば $\sum_i a_i=d$ であり、$i_0\in I$ だから $a_{i_0}$ は任意の整数でよい。これで $N(a)\subseteq I$ と同値になる。

別の基底を使った同じ切断を比較するときは、[遷移関数](../CAG1-03/index.md#prop-cag1-03-analytic-twisting)に従い $e_k=(X_k/X_{i_0})^d e_{i_0}$ と変換する。各項 $X^a$ は斉次次数 $d$ なので、どちらの基底でも同じ $a$ の単項式として表される。Laurent係数の一意性から、交叉への制限は $c_a$ を変えず、Čech微分は交代符号を付けるだけである。

最後に $j\notin N(a)$、すなわち $a_j\ge0$ の項のみを抽出する。$j$ が反転座標なら、そのLaurent級数の非負部分は $z_j=0$ を越えて正則に延長できる。実際、元の級数が任意の有限外半径まで収束するため、非負項の部分級数も同じ外半径まで収束し、中心に穴がなくなる。ほかの座標については固定したコンパクト多重円環の一様収束を保てる。反転しない座標なら初めからTaylor級数なので同じ結論である。
<!-- proof-end -->

たとえば $\mathbb P^2$ で $a=(-1,0,-2)$、$d=-3$ とすると $N(a)=\{0,2\}$。この単項式は $U_{02}$ と $U_{012}$ に現れるが、$U_{01}$ には $X_2^{-1}$ が許されないため現れない。$j=1$ を加える縮約では $X_1$ の非負指数部分だけを使うので、解析側でも $U_{02}$ へ戻せる。指数の「許される場所」を確かめるだけで、無限級数の行き先を制御できる。

## 4. 射影空間の全次数で比較する

これで最初のGAGA型の基底比較が証明できる。重要なのは、**一般の射影的 $X$ の任意の連接層**ではなく、$\mathbb P^n$ 上の $\mathcal O(d)$ だけを扱っていることである。

<a id="thm-cag1-04-projective-comparison"></a>

<!-- formal-statement-start -->
> **定理（射影空間のねじり層の解析的比較）**
> $n\ge1$、$d\in\mathbb Z$、$P=\mathbb P^n_{\mathbb C}$ とする。解析化が誘導する自然な写像は、任意の $q\ge0$ で同型である。

$$
H^q(P,\mathcal O_P(d))\ \xrightarrow{\ \simeq\ }\
H^q(P^{\mathrm{an}},\mathcal O_P(d)^{\mathrm{an}}).
$$

> 特に $S=\mathbb C[X_0,\ldots,X_n]$、$S_d$ を次数 $d$ の斉次多項式空間（$d<0$ では零）とすると、両側の群は自然な単項式表示で

$$
H^q\simeq
\begin{cases}
S_d,&q=0,\ d\ge0,\\
\displaystyle\bigoplus_{\substack{a_i\le-1\ (\forall i)\\\sum_i a_i=d}}
\mathbb C[X^a],&q=n,\ d\le-n-1,\\
0,&\text{その他}
\end{cases}
$$

> となる。したがって $h^0=\binom{n+d}{n}$（$d\ge0$）、$h^n=\binom{-d-1}{n}$（$d\le-n-1$）であり、上記以外は零である。
<!-- formal-statement-end -->

### 証明の見取り図

解析的Čech複体に現れる各斉次Laurent単項式を、負指数集合 $N(a)$ で分ける。負指数がない場合は零次だけ、すべて負なら最高次だけが残る。途中の負指数集合では、まだ負になっていない添字を一つ選んでČech複体を縮約する。**解析側でこの縮約を正則切断として実行できる**ことは、前補題の正規収束と延長可能性が保証する。

<!-- proof-start -->
### 証明

[代数側のČech比較](../../AG/AG3-10/index.md#prop-ag3-10-cech-comparison)と[解析側のČech比較](#prop-cag1-04-analytic-cech-comparison)により、次の複体写像が層コホモロジーの比較を表す。

$$
C_d^\bullet\hookrightarrow C_{\mathrm{an},d}^\bullet.
$$

[$N(a)$ の分類補題](../../AG/AG3-10/index.md#lem-ag3-10-support-acyclicity)による係数ごとの計算を、解析側の収束級数へ移す。$N(a)=\varnothing$ なら全てのチャートでその項が存在し、零次の貼り合わせ条件は各チャートの係数が等しいこととなる。正次数では固定した添字を加除する縮約で消える。一方 $N(a)=\{0,\ldots,n\}$ ならその項は全 $n+1$ 個の交叉だけに現れ、次数 $n$ で残る。

$\varnothing\ne N(a)\subsetneq\{0,\ldots,n\}$ の場合、$j\notin N(a)$ を選び、添字集合 $I$ へ $j$ を加える操作で縮約 $h$ を作る。$j\notin I$ の項に対して

$$
(hc)_I=(-1)^{|\{i\in I:i<j\}|}
\big(c_{I\cup\{j\}}\big)_{N(a)}
$$

とし、$j\in I$ の項には零を当てる。ここで右端は $N(a)$ に属する指数ベクトルのLaurent項だけを取る操作である。$j$ の挿入・削除の交代和を展開すると、$j$ を消す一項だけが元の係数を返し、他は二通りの順序で逆符号となるため

$$
\delta h+h\delta=\operatorname{id}
$$

がこの負指数集合の部分複体で成立する。これは[代数側の縮約](../../AG/AG3-10/index.md#lem-ag3-10-support-acyclicity)と同じ符号計算である。

解析側では $a$ が無限個あり得るため、このまま係数ごとの形式計算だけで終えてはいけない。負指数集合は有限個（高々 $2^{n+1}$ 個）なので、**集合 $N$ ごとに** $j\notin N$ を一つ固定して上の縮約を行う。[$N$ ごとのLaurent部分級数](#lem-cag1-04-analytic-laurent)は元の級数から指数条件で選び出した部分級数であり、任意のコンパクト多重円環上で絶対一様収束する。$j$ の非負指数性により、縮約の行き先の大きなチャートへも正則に延長できる。有限個の $N$ の和を取れば、全ての中間負指数成分を**正則なコチェインによる境界**として消せる。

残る $N=\varnothing$ の単項式は全 $a_i\ge0$ かつ $\sum a_i=d$ であり、$d\ge0$ の場合に限って存在する。この非負整数解は有限個で、零次群の基底は次数 $d$ の斉次多項式そのものである。$d<0$ には非負整数解がないため、解析側にも大域切断は残らない。

$N$ が全体の場合は全 $a_i\le-1$ なので、$b_i=-a_i-1\ge0$ と置くと $\sum b_i=-d-n-1$。右辺が非負のときだけ最高次群があり、その基底数は

$$
\#\{(b_0,\ldots,b_n)\in\mathbb Z_{\ge0}^{n+1}:\sum b_i=-d-n-1\}
=\binom{-d-1}{n}.
$$

零次と最高次の代表は有限個のLaurent単項式なので、**すべて代数的複体から来る**。解析側にだけ現れた無限級数は、他の負指数集合に属して境界として消える。したがって自然な複体写像は全次数のコホモロジーで同型を誘導する。
<!-- proof-end -->

**大域切断を手で読む。** $n=1,d=2$ なら $H^0$ の基底は $X_0^2,X_0X_1,X_1^2$ の三つである。$U_0$ の座標 $z=X_1/X_0$ では $1,z,z^2$ に対応する。たとえば $e^z$ は $U_0^{\mathrm{an}}$ では正則でも、$U_1$ の座標 $w=1/z$ で係数を $w^2e^{1/w}$ としたとき $w=0$ に本質的特異点が残る。**チャート上で正則**と**射影空間上の大域切断**は違う。

**負次数と最高次。** $n=2,d=-2$ なら $a_i\ge0$ の総和が $-2$ にはならず、また三つの $a_i\le-1$ の総和も $-2$ にはならない。全コホモロジー群が零である。$d=-3$ にすると、三つがすべて $-1$ の一通りだけが残り、

$$
H^2((\mathbb P^2)^{\mathrm{an}},\mathcal O(-3)^{\mathrm{an}})
=\mathbb C\left[\frac1{X_0X_1X_2}\right].
$$

この同型は $H^0$ だけの偶然ではない。$0<q<n$ の消滅と、$q=n$ の非零類まで、**解析的な局所関数の無限級数を含めて**比較した結論である。

## 5. 超平面制限と長完全列の自然性

計算の使い道を見よう。$P=\mathbb P^2_{\mathbb C}$ の超平面 $H=\{X_2=0\}\simeq\mathbb P^1_{\mathbb C}$ と包含 $i:H\hookrightarrow P$ を取る。[代数側の超平面短完全列](../../AG/AG3-10/index.md#prop-ag3-10-hyperplane-sequence)で $d=-2$ とすると

$$
0\longrightarrow\mathcal O_P(-3)
\xrightarrow{\cdot X_2}\mathcal O_P(-2)
\longrightarrow i_*\mathcal O_H(-2)\longrightarrow0.
$$

<a id="prop-cag1-04-hyperplane-connecting"></a>

<!-- formal-statement-start -->
> **命題（超平面制限と連結写像の比較）**
> $P=\mathbb P^2_{\mathbb C}$、$H=\{X_2=0\}$ とする。上の短完全列を解析化すると短完全列になり、両側の長完全列における連結写像

$$
\partial:H^1(H,\mathcal O_H(-2))
\longrightarrow H^2(P,\mathcal O_P(-3))
$$

> と解析側の $\partial^{\mathrm{an}}$ は自然な比較写像と可換である。いずれの $\partial$ も同型であり、標準Čech代表は符号の規約を固定すれば

$$
\left[\frac1{X_0X_1}\right]
\longmapsto\left[\frac1{X_0X_1X_2}\right]
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

短完全列が解析化後も保たれるのは前章の局所平坦性である。長完全列の連結写像はČechコチェインを一度持ち上げて微分し、$X_2$ で割ることで見える。次数の計算は上で比較済みなので、両側で同じ代表を追える。

<!-- proof-start -->
### 証明

[前章の解析化による完全列保存](../CAG1-03/index.md#thm-cag1-03-coherent-exact)を上の代数的短完全列に適用する。各項は射影空間上の連接層なので仮定を満たす。また、閉埋込みの解析化と制限は局所の商環によって同定できるため、末項は $i_*^{\mathrm{an}}\mathcal O_{H^{\mathrm{an}}}(-2)^{\mathrm{an}}$ である。

[比較定理](#thm-cag1-04-projective-comparison)から、$P$ の $\mathcal O(-2)$ の全群は零、$H\simeq\mathbb P^1$ の $H^1(\mathcal O(-2))$ と $P$ の $H^2(\mathcal O(-3))$ はそれぞれ一次元である。[$H^q$ の長完全列](../../AG/AG3-08/index.md#thm-ag3-08-long-exact)の該当部分は

$$
0=H^1(P,\mathcal O_P(-2))\longrightarrow
H^1(H,\mathcal O_H(-2))\xrightarrow{\partial}
H^2(P,\mathcal O_P(-3))\longrightarrow
H^2(P,\mathcal O_P(-2))=0
$$

なので $\partial$ は同型である。解析側も同じ消滅から同型となる。

代表を確かめる。$H$ の二チャート $U_0\cap H,U_1\cap H$ の交叉で、$\mathcal O_H(-2)$ の一次コチェイン $1/(X_0X_1)$ を選ぶ。$P$ の $U_{01}$ へ同じ斉次分数で持ち上げ、$U_{02},U_{12}$ の一次コチェインは零とする。Čech微分の $012$ 成分は

$$
(\delta t)_{012}=t_{12}-t_{02}+t_{01}=\frac1{X_0X_1}.
$$

これは $X_2\ne0$ の三重交叉で $X_2\cdot1/(X_0X_1X_2)$ となるので、連結写像の代表は $1/(X_0X_1X_2)$ である。制限・乗法・Čech微分は代数的分数を解析的正則切断へ送っても同じ式で可換であるため、解析側の連結写像も同じ代表を与える。
<!-- proof-end -->

この例で、**長完全列がある**ことと**比較写像が同型である**ことが別々の理由に支えられていると分かる。前者は局所完全性、後者は射影空間上の解析的Čech計算に依存する。一般の連接層に対するGAGAの帰納は次章の課題である。

## 6. 演習と詳細解答

代数側の既習計算を使う場合も、どの交叉でその分数が許されるか、解析側で正則に延長できるかを確認する。Level Aでは一つの操作、Level Bでは二つ以上の構成、Level Cでは比較の証明機構そのものを再構成する。

### Level A

<a id="ex-cag1-04-a01"></a>
#### CAG1-04-A01 標準交叉での座標とStein性
- Level: A

$P=\mathbb P^2_{\mathbb C}$ の $U_{01}^{\mathrm{an}}$ と $U_{012}^{\mathrm{an}}$ を $U_0$ の座標 $z_1=X_1/X_0,z_2=X_2/X_0$ で表せ。それぞれのStein性を判定し、$\mathcal O_P(-2)^{\mathrm{an}}$ の切断 $z_1^{-1}z_2^2e_0$ がどちらにあるか述べよ。

<!-- solution-start -->
**詳細解答**。$U_{01}$ は $X_0,X_1$ が非零、$X_2$ は任意だから $z_1\ne0,z_2\in\mathbb C$ であり、$\mathbb C^*\times\mathbb C$ に同型である。$U_{012}$ では $X_2$ も非零だから $(\mathbb C^*)^2$ である。[標準交叉の命題](#prop-cag1-04-stein-intersections)によりどちらもSteinである。

与えられた係数は $z_1\ne0$ なら正則で、$z_2=0$ にも正則に延長する。したがって**両方**で切断となる。斉次指数は $a_1=-1,a_2=2$ で、総次数が $-2$ だから

$$
a_0=-2-(-1+2)=-3,
\qquad N(a)=\{0,1\}.
$$

よって $N(a)\subseteq\{0,1\}$ であり、$U_{01}$ に現れてよいことも[解析的Laurent級数の負指数分解](#lem-cag1-04-analytic-laurent)から確認できる。
<!-- solution-end -->

<a id="ex-cag1-04-a02"></a>
#### CAG1-04-A02 正次数の解析的大域切断
- Level: A

$P=\mathbb P^2_{\mathbb C}$ の $\mathcal O_P(2)^{\mathrm{an}}$ の大域切断を斉次多項式で全て列挙し、次元を求めよ。$U_0$ の係数表示も書け。

<!-- solution-start -->
**詳細解答**。[射影空間のねじり層の解析的比較](#thm-cag1-04-projective-comparison)で $n=2,d=2,q=0$ とすると、全切断は $S_2$ の元である。$a_0+a_1+a_2=2$ の非負整数解を列挙すると

$$
X_0^2,\ X_0X_1,\ X_0X_2,\ X_1^2,\ X_1X_2,\ X_2^2
$$

の六つ。$e_0=X_0^2$ で割った係数は順に $1,z_1,z_2,z_1^2,z_1z_2,z_2^2$ である。よって $h^0=6=\binom{2+2}{2}$。$U_0$ 上にはほかにも整関数があるが、それだけで全 $P$ の切断とは言えない。
<!-- solution-end -->

<a id="ex-cag1-04-a03"></a>
#### CAG1-04-A03 負次数と無限遠点
- Level: A

$P=\mathbb P^1_{\mathbb C}$、$d=-1$ とする。$U_0$ で係数 $f_0(z)=1$ と置いた局所切断を $U_1$ の基底 $e_1$ で書き、$P$ の大域切断にならない理由を示せ。$H^0(P^{\mathrm{an}},\mathcal O(-1)^{\mathrm{an}})$ も求めよ。

<!-- solution-start -->
**詳細解答**。$z=X_1/X_0$、$w=X_0/X_1=1/z$ である。[遷移式](../CAG1-03/index.md#prop-cag1-03-analytic-twisting)に $d=-1$ を代入すると

$$
f_1=f_0(X_0/X_1)^{-1}=f_0z=1/w.
$$

$w=0$ は $U_1$ に属するが $1/w$ はそこで極を持つため、全域の正則切断へ延長できない。[比較定理](#thm-cag1-04-projective-comparison)では $q=0$ の代表には全指数 $a_i\ge0$、総次数 $-1$ が必要だが、そのような整数解はない。よって大域切断空間は $0$ である。
<!-- solution-end -->

<a id="ex-cag1-04-a04"></a>
#### CAG1-04-A04 二次コホモロジーの唯一の基底
- Level: A

$P=\mathbb P^2_{\mathbb C}$ とする。$\mathcal O_P(-3)^{\mathrm{an}}$ の $H^2$ のLaurent単項式基底を求め、$\mathcal O_P(-2)^{\mathrm{an}}$ の $H^2$ と比較せよ。

<!-- solution-start -->
**詳細解答**。[比較定理](#thm-cag1-04-projective-comparison)の最高次 $q=n=2$ では $a_0,a_1,a_2\le-1$ が必要である。$d=-3$ のとき、最小の総和が $-3$ なので $(-1,-1,-1)$ だけが可能で、

$$
H^2(P^{\mathrm{an}},\mathcal O(-3)^{\mathrm{an}})
=\mathbb C\left[1/(X_0X_1X_2)\right].
$$

$d=-2$ では三つの負整数の和が $-2$ にはならず、最高次群は $0$。これは「負次数なら必ず高次群がある」という誤解への反例である。
<!-- solution-end -->

<a id="ex-cag1-04-a05"></a>
#### CAG1-04-A05 消滅定理が言わないこと
- Level: A

$V=\mathbb C$、$\mathcal E=\mathcal O_V$ とする。[Cartanの定理B](#thm-cag1-04-cartan-b)から言えることをコホモロジー次数で記し、$H^0(V,\mathcal E)=0$ と結論できないことを具体的な関数で示せ。

<!-- solution-start -->
**詳細解答**。複素平面 $V$ はStein、構造層 $\mathcal O_V$ は連接である。よって[Cartanの定理B](#thm-cag1-04-cartan-b)が与えるのは $H^q(V,\mathcal O_V)=0$（$q\ge1$）である。一方、零次群は大域正則関数の空間であり、定数関数 $1$ も $e^z$ もその元である。特に $H^0(V,\mathcal O_V)\ne0$ なので、定理Bを零次にまで延長してはならない。
<!-- solution-end -->

### Level B

<a id="ex-cag1-04-b01"></a>
#### CAG1-04-B01 射影直線の一次コホモロジー
- Level: B

$P=\mathbb P^1_{\mathbb C}$、$d=-3$ とする。$U_0\cap U_1$ の座標 $z=X_1/X_0$ によるLaurent級数から、$H^1(P^{\mathrm{an}},\mathcal O(-3)^{\mathrm{an}})$ の基底を求めよ。どの指数が両チャートのコボーダリーで消えるかも説明せよ。

<!-- solution-start -->
**詳細解答**。$U_0$ の基底 $e_0=X_0^{-3}$ で書いた $U_{01}$ の切断は $\sum_{k\in\mathbb Z}c_kz^k e_0$ である。$U_0$ 上の切断の係数は $k\ge0$ のTaylor級数だから、微分 $\delta^0(s_0,s_1)=s_1-s_0$ により $k\ge0$ の部分を消せる。

$U_1$ 上で正則な係数 $g(w)=\sum_{m\ge0}b_mw^m$ を $e_1=X_1^{-3}$ で書くと、$e_1=z^{-3}e_0$ なので $g(1/z)e_1=\sum_{m\ge0}b_mz^{-3-m}e_0$ である。従って $k\le-3$ も消せる。一変数の[Laurent展開](../../../解析系/CA/CA4/index.md#thm-ca4-laurent)の正規収束により、正・負の尾部はそれぞれのチャート上で本当に正則な切断になる。残るのは $k=-2,-1$ で、

$$
H^1(P^{\mathrm{an}},\mathcal O(-3)^{\mathrm{an}})
=\mathbb C[z^{-2}e_0]\oplus\mathbb C[z^{-1}e_0].
$$

斉次表示では順に $X_0^{-1}X_1^{-2}$ と $X_0^{-2}X_1^{-1}$。両指数が負なので[負指数分類](../../AG/AG3-10/index.md#lem-ag3-10-support-acyclicity)でも最高次に残る。次元は $-d-1=2$ で一致する。
<!-- solution-end -->

<a id="ex-cag1-04-b02"></a>
#### CAG1-04-B02 射影平面の負次数を一段動かす
- Level: B

$P=\mathbb P^2_{\mathbb C}$ の $\mathcal O_P(-4)^{\mathrm{an}}$ の全ての非零コホモロジー群と基底を求めよ。比較写像がその基底をどのように送るか述べよ。

<!-- solution-start -->
**詳細解答**。$d=-4$ なので非負指数の和で $-4$ を作れず $H^0=0$。中間次数 $H^1$ は[比較定理](#thm-cag1-04-projective-comparison)から零。$H^2$ には $a_i\le-1$、$\sum a_i=-4$ が必要で、$b_i=-a_i-1\ge0$ とおくと $b_0+b_1+b_2=1$ となる。解は $(1,0,0),(0,1,0),(0,0,1)$ だから

$$
H^2(P^{\mathrm{an}},\mathcal O(-4)^{\mathrm{an}})
=\mathbb C\left[\frac1{X_0^2X_1X_2}\right]
\oplus\mathbb C\left[\frac1{X_0X_1^2X_2}\right]
\oplus\mathbb C\left[\frac1{X_0X_1X_2^2}\right].
$$

自然な比較写像は各斉次分数を同じ式の正則切断として読むため、代数的な三つのČech類を解析側の対応する三つの類へ一対一に送る。無限級数から別の二次類は増えない。
<!-- solution-end -->

<a id="ex-cag1-04-b03"></a>
#### CAG1-04-B03 正則だが代数的でないコチェイン
- Level: B

$P=\mathbb P^1_{\mathbb C}$、$d=0$ とし、$U_{01}^{\mathrm{an}}\simeq\mathbb C^*$ の一次コチェインを $c(z)=e^z+z^{-2}$ とする。$c$ が代数的なLaurent多項式でないことを示し、解析的Čech複体では境界となることを、零次コチェインを具体的に作って確かめよ。

<!-- solution-start -->
**詳細解答**。$e^z=\sum_{m\ge0}z^m/m!$ は無限個の非零Taylor係数を持つので、$c$ は有限和のLaurent多項式ではない。一方 $U_0$ の $z$ は複素平面全体の座標で $e^z$ は整関数、$U_1$ の $w=1/z$ では $w^2$ が整関数である。よって零次コチェイン

$$
(s_0,s_1)=(-e^z,w^2)
$$

を取れる。$d=0$ だから局所基底の変換因子は $1$。重なりで $s_1=w^2=z^{-2}$ となるため、[解析的標準被覆Čech複体の定義](#def-cag1-04-analytic-cech)により

$$
(\delta^0s)_{01}=s_1-s_0=z^{-2}+e^z=c.
$$

したがって $[c]=0$。これは「解析側のコチェインは代数側より多い」が「そのために新しいコホモロジーが生じる」とは限らないことの手計算である。
<!-- solution-end -->

<a id="ex-cag1-04-b04"></a>
#### CAG1-04-B04 超平面の連結準同型
- Level: B

$P=\mathbb P^2$、$H=\{X_2=0\}\simeq\mathbb P^1$ の短完全列 $0\to\mathcal O_P(-3)\xrightarrow{X_2}\mathcal O_P(-2)\to i_*\mathcal O_H(-2)\to0$ を使う。$[1/(X_0X_1)]\in H^1(H,\mathcal O_H(-2))$ の連結像をČech微分で求め、写像が同型となる理由を述べよ。基礎体は $\mathbb C$ とする。

<!-- solution-start -->
**詳細解答**。[超平面の比較命題](#prop-cag1-04-hyperplane-connecting)の設定で、$H$ の $01$ 成分を $1/(X_0X_1)$ とし、$P$ の $\mathcal O_P(-2)$ の一次コチェインとして $t_{01}=1/(X_0X_1)$、$t_{02}=t_{12}=0$ と持ち上げる。三重交叉で

$$
(\delta t)_{012}=t_{12}-t_{02}+t_{01}=1/(X_0X_1).
$$

この切断は $X_2/(X_0X_1X_2)$ だから、$X_2$ の乗法の原像は $1/(X_0X_1X_2)$ であり、連結像はその $H^2(P,\mathcal O_P(-3))$ における類である。[射影空間のねじり層の解析的比較](#thm-cag1-04-projective-comparison)により $H^1(P,\mathcal O_P(-2))=H^2(P,\mathcal O_P(-2))=0$。よって長完全列の両隣が零であり、連結写像は単射かつ全射である。解析化後も同じ分数と消滅を使える。
<!-- solution-end -->

### Level C

<a id="ex-cag1-04-c01"></a>
#### CAG1-04-C01 三チャートで解析側の新しい類が出ない理由
- Level: C

$P=\mathbb P^2_{\mathbb C}$ の標準解析的被覆 $U_0,U_1,U_2$ と $\mathcal O_P(d)^{\mathrm{an}}$ を考える。

1. 各有限交叉に[Cartanの定理B](#thm-cag1-04-cartan-b)を適用できる条件を確認し、Čech計算が真の層コホモロジーを与える理由を述べよ。
2. $d=-3$ のとき、負指数集合 $N=\{0,2\}$ の $U_{02},U_{012}$ 成分が二次コホモロジーへ残らない理由を、微分の符号も含めて示せ。
3. $d=-2$ と $d=-3$ の全コホモロジー群を求め、なぜ解析側の無限級数が新しい類を作れないか述べよ。

<!-- solution-start -->
**詳細解答**。

(1) [標準交叉の座標表示](#prop-cag1-04-stein-intersections)により $U_i^{\mathrm{an}}\simeq\mathbb C^2$、$U_{ij}^{\mathrm{an}}\simeq\mathbb C\times\mathbb C^*$、$U_{012}^{\mathrm{an}}\simeq(\mathbb C^*)^2$。これらはSteinである。ねじり層の解析化は[前章の連接性定理](../CAG1-03/index.md#thm-cag1-03-coherent-exact)で連接だから、[Cartanの定理B](#thm-cag1-04-cartan-b)により各交叉の正次数コホモロジーは零。[解析的Čech比較](#prop-cag1-04-analytic-cech-comparison)の二重複体の縦正次数が消えるため、Čech複体で $H^q$ を計算できる。

(2) $N=\{0,2\}$ なら、この単項式が現れる最小の交叉は $U_{02}$ であり、$U_{012}$ にも現れる。一次コチェイン $b$ の $02$ 成分を $b_{02}$ とすると、[交代微分](#def-cag1-04-analytic-cech)の三重交叉成分は

$$
(\delta b)_{012}=b_{12}-b_{02}+b_{01}=-b_{02}
$$

となる。最後の等式は $N=\{0,2\}$ の項では $U_{12},U_{01}$ に同じ単項式が現れないためである。任意の $U_{012}$ のこの負指数部分の二次コチェイン $c$ に対し、一次コチェインの $02$ 成分を

$$
b_{02}=-c
$$

と置けば $\delta b=c$ になる。ここで $j=1\notin N$ なので $z_1$ の非負指数部分は $U_{02}$ へ延長できる。[解析的Laurent級数の負指数分解](#lem-cag1-04-analytic-laurent)の正規収束により、これは形式的な係数操作ではなく正則な $b_{02}$ を構成している。

(3) [負指数分解](#lem-cag1-04-analytic-laurent)の各部分級数について、空集合なら零次、真の非空部分集合なら上のような縮約で全消滅、全体集合なら二次に残る。$d=-2$ では全指数が非負で総和 $-2$、または全指数が負で総和 $-2$ のいずれも不可能だから全群が零。$d=-3$ では全負指数の唯一の解 $(-1,-1,-1)$ があり、

$$
H^0=H^1=0,\qquad
H^2(P^{\mathrm{an}},\mathcal O(-3)^{\mathrm{an}})
=\mathbb C[1/(X_0X_1X_2)].
$$

無限級数の各負指数集合部分はコンパクト上で正規収束し、縮約後も正則性が保たれる。残る零次・二次の代表は有限個の斉次Laurent単項式であり、代数的Čech複体から来る。よって新しい解析的コホモロジー類は増えない。
<!-- solution-end -->

<a id="ex-cag1-04-c02"></a>
#### CAG1-04-C02 超平面上の切断と連結像の二方向
- Level: C

$P=\mathbb P^2_{\mathbb C}$、$H=\{X_2=0\}\simeq\mathbb P^1$、$i:H\hookrightarrow P$ とする。

1. $d=1$ の超平面短完全列から大域切断の完全列を導き、$H^0(P,\mathcal O_P(1))\to H^0(H,\mathcal O_H(1))$ の核・像・次元を求めよ。
2. $d=-2$ の短完全列ではなぜ大域切断がすべて零であっても高次の連結像が非零になるか、具体的なLaurent代表で示せ。
3. (1)(2)の結論が解析化後も成立する理由を、局所完全性と比較定理の二つに分けて説明せよ。

<!-- solution-start -->
**詳細解答**。

(1) [超平面短完全列](../../AG/AG3-10/index.md#prop-ag3-10-hyperplane-sequence)で $d=1$ とすると

$$
0\to\mathcal O_P(0)\xrightarrow{X_2}
\mathcal O_P(1)\to i_*\mathcal O_H(1)\to0.
$$

[層コホモロジーの長完全列](../../AG/AG3-08/index.md#thm-ag3-08-long-exact)と[ねじり層のコホモロジー](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)により $H^1(P,\mathcal O_P)=0$ なので

$$
0\to\mathbb C\xrightarrow{\,1\mapsto X_2\,}
\mathbb C X_0\oplus\mathbb C X_1\oplus\mathbb C X_2
\xrightarrow{\,X_2=0\,}
\mathbb C X_0\oplus\mathbb C X_1\to0
$$

が完全である。中央の制限の核は $\mathbb C X_2$、像は $\mathbb C X_0\oplus\mathbb C X_1$、次元は順に $1,2$ である。従って $3-1=2$ という次元の検算も成立する。

(2) $d=-2$ では[比較定理](#thm-cag1-04-projective-comparison)から $P$ の $\mathcal O(-3),\mathcal O(-2)$ と $H$ の $\mathcal O(-2)$ の $H^0$ はいずれも零である。しかし $H^1(H,\mathcal O_H(-2))$ のLaurent代表 $[1/(X_0X_1)]$ は非零であり、[連結写像の計算](#prop-cag1-04-hyperplane-connecting)で

$$
\partial[1/(X_0X_1)]=[1/(X_0X_1X_2)]
\ne0\in H^2(P,\mathcal O_P(-3)).
$$

零次の消失は高次の消失を意味しない。連結像は局所切断の持ち上げが三重交叉で一致しない障害を記録する。

(3) 二つの短完全列を解析化しても短完全なのは、[連接層の解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)により局所的な核・像が保たれるため。一方、(1)の次元・切断基底と(2)の高次群・連結代表が一致するのは、[射影空間のねじり層の解析的比較](#thm-cag1-04-projective-comparison)が $P$ と $H\simeq\mathbb P^1$ に適用でき、解析化が乗法・制限・Čech微分と可換だからである。後者を前者だけから結論してはならない。
<!-- solution-end -->

## 7. どこまで証明したか

射影空間の標準交叉はSteinであり、**Cartanの定理Bを外部入力**として使えば解析的層コホモロジーをČechで計算できる。正則Laurent級数の負指数部分を縮約し、収束と延長可能性を確認すると、$\mathcal O(d)$ の解析側の全次数が代数側と一致する。超平面の長完全列でも同じ代表を追える。

ただし、ここで扱ったのは $P=\mathbb P^n$ の $\mathcal O_P(d)$ に限られる。任意の射影的スキーム $X$ 上の任意の連接層 $\mathcal F$ について、ねじり層の有限表示や消滅・長完全列を使って一般の比較へどう拡張するかは**次章CAG1-05**で証明する。ここで一般GAGAを既知の定理として逆輸入しない。

**解析的入力と参考文献**：[Serre, *Géométrie algébrique et géométrie analytique* (1956)](https://aif.centre-mersenne.org/item/AIF_1956__6__1_0/)、[Kedlaya, MIT 18.726 *GAGA* 講義](https://ocw.mit.edu/courses/18-726-algebraic-geometry-spring-2009/resources/mit18_726s09_lec22_gaga/)、[Cartanの定理A・Bの概要](https://encyclopediaofmath.org/wiki/Cartan_theorem)。本講はCartanの定理Bを未証明の解析的入力として使用し、標準交叉のStein性の直接確認、解析的Čech比較の相対的証明、射影空間の $\mathcal O(d)$ に特有のLaurent級数計算を詳しく与えた。
