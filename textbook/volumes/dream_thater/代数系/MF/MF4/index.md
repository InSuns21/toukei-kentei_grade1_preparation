# MF4 合同部分群・カスプ・モジュラー曲線

[MF1の基本領域](../MF1/index.md#thm-mf1-fundamental-domain)では全ての整数基底変更を許しました。[MF2のモジュラー形式](../MF2/index.md#def-mf2-modular-form)は、その変換則に従う正則関数です。しかし、楕円曲線に「位数 $N$ の巡回部分群」という追加情報を付けると、全ての基底変更がその情報を保存するとは限りません。保存する行列だけを使えば、基本領域は広がり、無限遠も複数のカスプに分かれます。

この章では、合同部分群を実際に行列の合同式で判定し、各カスプの幅から局所変数を作ります。さらに、商空間にカスプを貼ってコンパクト [Riemann 面](../../../解析系/CA/CA8/index.md#def-ca8-riemann-surface)を構成します。最後に、重さ2のカスプ形式が [正則微分](../../../解析系/CA/CA8/index.md#def-ca8-holomorphic-one-form)と正確に一致することを両方向から証明します。

<!-- definition-example-audit: strict -->

## 1. 基底変更を制限する：合同部分群と指数

[整数モジュラー群](../MF1/index.md#def-mf1-modular-group)を $\Gamma(1)=SL_2(\mathbb Z)$ と記します。整数 $N\ge1$ を固定したとき、行列の成分を $N$ で割った余りによって基底変更を制限するのが合同部分群です。

<a id="def-mf4-congruence-subgroups"></a>
<!-- formal-statement-start -->
> **定義（主要な合同部分群）**  
> 整数 $N\ge1$ に対し、次の $\Gamma(1)$ の部分群を定める。

$$
\begin{aligned}
\Gamma(N)&=\left\{\gamma\in SL_2(\mathbb Z):\gamma\equiv I\pmod N\right\},\\
\Gamma_1(N)&=\left\{\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z):
a\equiv d\equiv1,\ c\equiv0\pmod N\right\},\\
\Gamma_0(N)&=\left\{\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z):
c\equiv0\pmod N\right\}.
\end{aligned}
$$

> これらをレベル $N$ の主合同部分群、$\Gamma_1$ 型合同部分群、$\Gamma_0$ 型合同部分群と呼ぶ。$\Gamma(N)$ を含む $\Gamma(1)$ の部分群もレベル $N$ に関する合同部分群と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf4-congruence-subgroups -->
**定義の確認**。$N=2$ とし、[MF1の行列](../MF1/index.md#def-mf1-modular-group) $T=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ と $S=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ を使います。両方とも行列式1です。$T$ は $c=0,\ a=d=1$ なので $\Gamma_1(2)\subset\Gamma_0(2)$ に属しますが、右上成分が $1\not\equiv0\pmod2$ なので $\Gamma(2)$ に属しません。$S$ は $c=1$ なので $\Gamma_0(2)$ に属しません。また $\begin{pmatrix}1&0\\2&1\end{pmatrix}$ は $\Gamma(2)$ に属します。行列式・全成分の合同条件をそれぞれ検査しました。
<!-- definition-example-end -->

各集合が群であることは、法 $N$ の行列の積と逆を見れば分かります。例えば $\Gamma_0(N)$ の行列 $A,B$ では積の左下成分が $c_Aa_B+d_Ac_B$ で $N$ の倍数、逆行列の左下成分は $-c_A$ です。$\Gamma(N)\subset\Gamma_1(N)\subset\Gamma_0(N)\subset\Gamma(1)$ が成り立ちます。

有限個の基本領域が何枚必要かを数える量は、群の**指数** $[\Gamma(1):\Gamma]$、すなわち左剰余類の個数です。[部分群の指数の定義](../../GRP/GRP2/index.md#def-grp2-index)に戻ると、これは有限個の行列代表で群作用を分割する数です。

<a id="thm-mf4-subgroup-index"></a>
<!-- formal-statement-start -->
> **定理（主要合同部分群の指数）**  
> 任意の整数 $N\ge1$ について指数は有限であり、$p$ は $N$ を割る相異なる素数を走るとして

$$
\begin{aligned}
[\Gamma(1):\Gamma(N)]&=N^3\prod_{p\mid N}(1-p^{-2}),\\
[\Gamma(1):\Gamma_1(N)]&=N^2\prod_{p\mid N}(1-p^{-2}),\\
[\Gamma(1):\Gamma_0(N)]&=N\prod_{p\mid N}(1+p^{-1}).
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

法 $N$ への還元によって有限群 $SL_2(\mathbb Z/N\mathbb Z)$ を数えます。その第一列は原始ベクトル、$\Gamma_0(N)$ の商は原始ベクトルが生成する直線に対応します。

<!-- proof-start -->
### 証明

まず $\mathbb Z/p^r\mathbb Z$ 上で、第一列 $(a,c)$ が少なくとも一つ単元であることが行列式1の必要十分条件です。必要性は両方が $p$ で割れると行列式も $p$ で割れるためです。十分性は Bézout 型の等式 $ad-bc=1$ の解 $(b,d)$ が取れるためです。原始第一列の個数は

$$
p^{2r}-p^{2(r-1)}.
$$

ある解 $(b_0,d_0)$ に対して、他の第二列は $(b_0,d_0)+t(a,c)$、$t\in\mathbb Z/p^r\mathbb Z$、の形でちょうど $p^r$ 個です。従って

$$
|SL_2(\mathbb Z/p^r\mathbb Z)|
=p^r(p^{2r}-p^{2r-2})
=p^{3r}(1-p^{-2}).
$$

実際、第一列が単元成分を持つ行列は初等行列で第一列を $(1,0)$ にでき、残りは上三角の初等行列で消せます。従ってこれらの行列は整数の初等行列の還元で生成され、$\Gamma(1)\to SL_2(\mathbb Z/p^r\mathbb Z)$ は全射です。中国剰余定理で各素数冪の計算を掛け合わせると、$\Gamma(N)$ を核とする還元写像は $SL_2(\mathbb Z/N\mathbb Z)$ へ全射となり、最初の公式が得られます。

$\Gamma_1(N)$ の像は $\begin{pmatrix}1&b\\0&1\end{pmatrix}$ で $b$ が $N$ 通りなので、その指数は $|SL_2(\mathbb Z/N\mathbb Z)|/N$ です。

$\Gamma_0(N)$ の像は $\begin{pmatrix}a&b\\0&a^{-1}\end{pmatrix}$ で、$a$ は単元（$\varphi(N)$ 通り）、$b$ は任意（$N$ 通り）です。従ってその指数は

$$
\frac{N^3\prod_{p\mid N}(1-p^{-2})}{N\varphi(N)}
=\frac{N^3\prod_{p\mid N}(1-p^{-2})}{N^2\prod_{p\mid N}(1-p^{-1})}
=N\prod_{p\mid N}(1+p^{-1}).
$$

$N=1$ では空積を1とし、全ての群が $\Gamma(1)$ です。
<!-- proof-end -->

**計算例**。$[\Gamma(1):\Gamma_0(2)]=2(1+1/2)=3$、$[\Gamma(1):\Gamma_0(11)]=11(1+1/11)=12$。後者の商は、基本領域がレベル1の12枚分あることに対応します。指数が大きいことはカスプが12個あることを意味しません。

## 2. カスプを軌道・幅・局所座標で理解する

[MF1の拡張有理境界](../MF1/index.md#def-mf1-rational-boundary)は $\mathbb P^1(\mathbb Q)=\mathbb Q\cup\{\infty\}$ と書けます。ここで $\mathbb P^1(\mathbb Q)$ とは既約分数 $a/c$（$\gcd(a,c)=1$、$c=0$ なら $\infty$）を一点と見る集合です。全群はこの集合に推移的に作用しますが、部分群 $\Gamma$ では違う軌道になることがあります。その軌道が一つの**カスプ**です。

カスプ $s=a/c$ に対して $\sigma_s=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z)$ を選ぶと、$\sigma_s\infty=s$ です。この行列を**スケーリング行列**と呼びます。存在は互いに素な $a,c$ の Bézout 等式 $ad-bc=1$ によります。カスプへ近づく座標は、先に $\sigma_s$ の逆で $\infty$ に移して作ります。

<a id="def-mf4-cusp-width"></a>
<!-- formal-statement-start -->
> **定義（カスプ、スケーリング行列、幅）**  
> $\Gamma$ を $\Gamma(1)$ の有限指数部分群で、$-I\in\Gamma$ とする。カスプとは $\Gamma$ の $\mathbb P^1(\mathbb Q)$ 上の軌道である。代表 $s=\sigma_s\infty$ を選び、$T=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ とする。正整数 $h_s$ で

$$
\sigma_s T^{h_s}\sigma_s^{-1}\in\Gamma
$$

> を満たす最小のものを、カスプ $s$ の**幅**という。局所変数は次の複素指数である。

$$
q_s=e^{2\pi i\tau/h_s}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf4-cusp-width -->
**定義の確認**。$\Gamma=\Gamma_0(2)$ で $s=\infty$ なら $\sigma_\infty=I$、$T\in\Gamma_0(2)$ なので $h_\infty=1$ です。$s=0$ なら $\sigma_0=S$ と選び、

$$
S T^h S^{-1}=\begin{pmatrix}1&0\\-h&1\end{pmatrix}.
$$

左下成分が偶数になる最小の正整数は $h=2$ です。従って $h_0=2$、その局所変数は $q_0=e^{\pi i\tau}$ です。$\infty$ と $0$ は異なる幅を持ち、同じ座標を機械的に使えません。
<!-- definition-example-end -->

異なるスケーリング行列を選んでも幅は変わりません。実際、同じ $s$ に写す行列の差は $\pm T^m$ で、これが $T^h$ と可換だからです。異なる軌道代表なら $\Gamma$ の元で共役になり、やはり幅は不変です。

<a id="prop-mf4-width-formula"></a>
<!-- formal-statement-start -->
> **命題（カスプ幅の公式）**  
> $N\ge1$ と既約分数 $s=a/c$（$\infty$ は $c=0$）に対し、$\Gamma_0(N)$ での幅は

$$
h_s=\frac{N}{\gcd(N,c^2)}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\sigma_s=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ を行列式1として、積を実際に計算します。

$$
\sigma_sT^h\sigma_s^{-1}
=\begin{pmatrix}
1-ach&a^2h\\
-c^2h&1+ach
\end{pmatrix}.
$$

$\Gamma_0(N)$ の定義で必要な合同条件は左下成分の $N\mid c^2h$ だけです。$d=\gcd(N,c^2)$ と置くと $N/d$ と $c^2/d$ は互いに素であるため、$N\mid c^2h$ と $N/d\mid h$ は同値です。最小の正整数は $h=N/d$。$c=0$ の場合 $\gcd(N,0)=N$ として $h_\infty=1$ になります。
<!-- proof-end -->

### 素数レベルのカスプは二つ

$a/c$ が既約で素数 $p$ が $c$ を割るなら、$ad-bc=1$ を選んだ行列は $c\equiv0\pmod p$ なので $\Gamma_0(p)$ に入り、$\infty$ を $a/c$ へ運びます。一方 $p\nmid c$ なら $\gcd(c,pa)=1$ です。よって $xc-pa t=1$ を満たす $x,t\in\mathbb Z$ が取れ、

$$
\begin{pmatrix}x&a\\pt&c\end{pmatrix}\in\Gamma_0(p)
$$

は $0$ を $a/c$ へ移します。この二種類は混ざりません。$\Gamma_0(p)$ の行列の左下成分が $p$ の倍数なので、$\infty$ の軌道の分母は $p$ で割れ、$0$ の軌道の分母は割れないからです。

<a id="prop-mf4-prime-cusps"></a>
<!-- formal-statement-start -->
> **命題（素数レベルのカスプ）**  
> 素数 $p$ について $\Gamma_0(p)$ のカスプは $\infty$ と $0$ の二つであり、その幅はそれぞれ $1$ と $p$ である。
<!-- formal-statement-end -->

特にレベル11では $h_\infty=1,\ h_0=11$。この二つのカスプでの正則性は別々に調べなければなりません。

## 3. 「$\infty$ で正則」から「全カスプで正則」へ

[MF2のレベル1の定義](../MF2/index.md#def-mf2-modular-form)では、全てのカスプが同じ軌道にあり、$q=e^{2\pi i\tau}$ 一つで足りました。部分群では、$f$ に行列を作用させた関数の周期がカスプ幅となります。

整数 $k\ge0$ と $\sigma=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z)$ に対し、重さ $k$ の slash 作用を

$$
(f|_k\sigma)(\tau)=(c\tau+d)^{-k}f\left(\frac{a\tau+b}{c\tau+d}\right)
$$

と記します。この定義は [MF2の変換則](../MF2/index.md#def-mf2-modular-form)の係数を左辺に移したものです。連鎖した変換には $(f|_k\sigma)|_k\gamma=f|_k(\sigma\gamma)$ が成り立ちます。

幅の条件 $\sigma_sT^{h_s}\sigma_s^{-1}\in\Gamma$ と $\Gamma$ 不変性から、$f|_k\sigma_s$ は周期 $h_s$ です。[周期正則関数の$q$表示](../MF2/index.md#thm-mf2-q-coordinate)を変数 $\tau/h_s$ に適用して、穿孔円板上の Laurent 展開を得ます。

<a id="def-mf4-level-form"></a>
<!-- formal-statement-start -->
> **定義（合同部分群に関するモジュラー形式・カスプ形式）**  
> $N\ge1$、整数 $k\ge0$ とする。正則関数 $f:\mathbb H\to\mathbb C$ が $M_k(\Gamma_0(N))$ に属するとは、次の両条件が成り立つことである。
>
> (i) 全ての $\gamma\in\Gamma_0(N)$ に対し $f|_k\gamma=f$。
>
> (ii) **全ての**カスプ $s$ に対し、スケーリング行列 $\sigma_s$ と幅 $h_s$ による表示

$$
(f|_k\sigma_s)(\tau)=\sum_{n=0}^\infty a_n(s)q_s^n,
\qquad q_s=e^{2\pi i\tau/h_s}
$$

> が $q_s=0$ に正則延長する。この全てのカスプで $a_0(s)=0$ となる $f$ をカスプ形式といい、その空間を $S_k(\Gamma_0(N))$ とする。指標のない（自明指標の）場合だけを扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf4-level-form -->
**定義の確認**。レベル1の $E_4$ は [MF2のEisenstein級数のモジュラー性](../MF2/index.md#thm-mf2-eisenstein-modularity)により任意の $\sigma\in SL_2(\mathbb Z)$ に対し $E_4|_4\sigma=E_4$。よって $\Gamma_0(2)$ の変換則を満たし、$\infty$ と $0$ の両方で展開は $1+240q+\cdots$（ただし $0$ では $q_0$ の指数が2の倍数）となり、負冪はありません。従って $E_4\in M_4(\Gamma_0(2))$ ですが、両カスプの定数項が1なので $E_4\notin S_4(\Gamma_0(2))$。二つの条件を別々に検証できました。
<!-- definition-example-end -->

**$\infty$ だけでは足りない実例**。$f(\tau)=j(\tau)^{-1}$ はレベル1の関数として $\rho$ に極があるので正則形式ではなく、この反例には使えません。代わりに $f(\tau)=E_4(\tau)-E_4(2\tau)$ を見れば、$\infty$ で定数項が $1-1=0$ ですが、$0$ では一般に定数項が消えません。後述の計算で $0$ での定数項は $1-2^{-4}$ と求められます（ここでは重さ4）。従って「$\infty$ の定数項が零」だけではカスプ形式の定義を満たしません。

この例の $\Gamma_0(2)$ 変換則は、$\gamma=\begin{pmatrix}a&b\\2c&d\end{pmatrix}$ について

$$
2\gamma\tau=\frac{a(2\tau)+2b}{c(2\tau)+d}
$$

と書け、右辺の行列 $\begin{pmatrix}a&2b\\c&d\end{pmatrix}$ は整数成分・行列式1だから $E_4(2\tau)$ が重さ4で変換することから従います。$S$ での変換は $E_4(-1/\tau)=\tau^4E_4(\tau)$ より

$$
(E_4(2\tau)|_4S)(\tau)
=\tau^{-4}E_4(-2/\tau)
=2^{-4}E_4(\tau/2).
$$

$\tau\to i\infty$ で右辺の定数項は $2^{-4}$、従って $f|_4S=E_4-2^{-4}E_4(\tau/2)$ の定数項は $1-2^{-4}=15/16$ です。式の途中で幅2の変数 $q_0=e^{\pi i\tau}$ が出ます。

## 4. 商空間をコンパクト Riemann 面へ延長する

今度は関数を載せる空間を構成しましょう。$\Gamma_0(N)$ は $\mathbb H$ に正則な一次分数変換で作用します。商 $Y_0(N)$ は、同じ $\Gamma_0(N)$ 軌道の点を一つとした空間です。固定点がなければ局所的に小円板を貼り合わせるだけですが、固定点の近くでは同じ円板が有限回重なります。

固定点 $z_0$ の近傍では、[MF1の基本領域と固定点](../MF1/index.md#thm-mf1-fundamental-domain)に従い、安定化群の有効位数は2または3です。局所座標

$$
w=\frac{\tau-z_0}{\tau-\overline{z_0}}
$$

の下で、固定点を保存する変換は $w\mapsto\zeta w$（$\zeta^e=1$、$e=2$ または $3$）です。したがって商の座標は $t=w^e$ です。「分岐している」ことと「商が特異な曲線である」ことは別です。$t$ は正則な円板座標を与えます。

<a id="def-mf4-modular-curve"></a>
<!-- formal-statement-start -->
> **定義（複素モジュラー曲線）**  
> $N\ge1$ に対し、$\Gamma_0(N)$ の $\mathbb H$ 上の軌道空間を

$$
Y_0(N)(\mathbb C)=\Gamma_0(N)\backslash\mathbb H
$$

> とする。各カスプに幅 $h_s$ の局所座標 $q_s$ で原点を一つ追加し、楕円固定点では $t=w^e$ を局所座標として貼り合わせたコンパクト Riemann 面を $X_0(N)(\mathbb C)$ と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf4-modular-curve -->
**定義の確認**。$\Gamma_0(2)$ にはカスプ軌道 $\infty,0$ があり、幅はそれぞれ $1,2$。$\infty$ へは $q_\infty=e^{2\pi i\tau}$、$0$ へは $q_0=e^{\pi i\tau}$ の各原点を加えます。これは $\tau=\infty$ と $\tau=0$ を上半平面の通常点として扱う操作ではありません。各穿孔円板の $q_s=0$ を一つずつ充填する操作です。楕円固定点の近傍では $t=w^e$ が商の円板座標となります。
<!-- definition-example-end -->

<a id="thm-mf4-compactification"></a>
<!-- formal-statement-start -->
> **定理（複素モジュラー曲線のコンパクト化）**  
> 各整数 $N\ge1$ に対し $X_0(N)(\mathbb C)$ は連結コンパクト Riemann 面である。自然な射影

$$
\pi:X_0(N)(\mathbb C)\longrightarrow X(1)(\mathbb C)
$$

> は正則で、次数は $[\Gamma(1):\Gamma_0(N)]$ である。カスプでの局所次数は幅 $h_s$、楕円固定点の上では安定化群の位数の比で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

有限指数なのでレベル1の基本領域を有限枚貼れば商の大部分が覆えます。切り落とした無限遠の各端は有限個の穿孔円板であり、そこへ原点を足します。正則な局所座標 $t=w^e$ と $q_s$ が貼り合わせを保証します。

<!-- proof-start -->
### 証明

$\Gamma_0(N)$ の有限指数を $\mu$ とし、左剰余類の代表 $\gamma_1,\ldots,\gamma_\mu$ を取ります。[MF1の標準基本領域](../MF1/index.md#def-mf1-standard-domain)の $\mu$ 個の像で $\Gamma_0(N)$ の基本領域を構成できます。これを十分高い高さで切り取ると、残る部分は有限枚の閉じた領域の貼り合わせでコンパクトです。

境界の有理点は有限個のカスプ軌道へ分かれます。カスプ $s$ で $\sigma_s$ により $\infty$ に移すと、十分高い虚部の部分では安定化群の平行移動 $\tau\mapsto\tau+h_s$ 以外の群元は重なりを作りません。よって商の端は

$$
\{\operatorname{Im}\tau>Y\}/h_s\mathbb Z
\ \cong\ \{0<|q_s|<e^{-2\pi Y/h_s}\}
$$

となります。ここへ $q_s=0$ を足して閉円板の近傍を作ると、端が有限個なので全体はコンパクトになります。

$\mathbb H$ の非固定点では作用の離散性により十分小さい円板の像が互いに交わらず、射影は局所双正則です。固定点 $z_0$ では、有限位数の安定化群の作用を $w\mapsto\zeta w$ に直せるので、商上の $t=w^e$ は円板の正則座標です。これらと $q_s$ の重なりでの座標遷移は正則であり、[CA8のRiemann面の定義](../../../解析系/CA/CA8/index.md#def-ca8-riemann-surface)を満たします。有限枚の円板近傍とコンパクト部分を用いて Hausdorff 性・第二可算性も得られます。

自然な $\pi$ は軌道を忘れる写像で、一般の非固定点の上には $\mu$ 個の軌道があり次数 $\mu$ です。$\infty$ の座標 $q$ とその上のカスプ座標 $q_s$ は、非零定数因子を除いて $q=q_s^{h_s}$ なので局所次数は $h_s$。楕円点の上ではそれぞれの局所座標を固定点の有効安定化群で割るため、その局所次数はレベル1側の位数 $2,3$ をレベル $N$ 側の位数で割ったものです。
<!-- proof-end -->

この構成は**複素解析的**な構成です。$\mathbb Q$ 上の代数曲線としてのモデルや有理数体上の射が自動的に得られたわけではありません。その違いは楕円曲線との算術的対応を扱う際に重要になります。

## 5. 分岐から種数を数える

コンパクトな向き付き曲面の**種数** $g$ は穴（取手）の数です。球面は $g=0$、トーラスは $g=1$。三角形分割の頂点数を $V$、辺数を $E$、面数を $F$ とすると、その交代和は $\chi=V-E+F$ です。コンパクトな向き付き曲面では $\chi=2-2g$ が成り立ちます。後者はコンパクト向き付き曲面の分類に関する標準的な位相的事実としてここで用い、一般の分類定理そのものは証明しません。

$a$ を $X_0(N)$ 上のカスプ個数、$e_2$ と $e_3$ をそれぞれ有効安定化群が位数2、3である楕円点の個数、$\mu=[\Gamma(1):\Gamma_0(N)]$ と書きます。

<a id="thm-mf4-genus"></a>
<!-- formal-statement-start -->
> **定理（モジュラー曲線の種数公式）**  
> 上の条件と記号の下で

$$
g(X_0(N))
=1+\frac{\mu}{12}-\frac{e_2}{4}-\frac{e_3}{3}-\frac{a}{2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[MF3のモジュラー関数体定理](../MF3/index.md#thm-mf3-j-field)から、レベル1のコンパクト化は $j$ を座標に持つ Riemann 球面です。有限次数 $\mu$ の写像 $\pi$ の分岐を、$i$、$\rho$、$\infty$ の三点の上だけで数えます。

<!-- proof-start -->
### 証明

基底の球面を、分岐値 $j(i),j(\rho),j(\infty)$ を頂点とする三角形分割で覆います。分岐値を辺の内部に置かないように細分できます。三角形と辺の内部は分岐しないので、上への持ち上げで各々 $\mu$ 枚になります。頂点の逆像数は、局所次数 $r_P$ の分だけ減り、

$$
\chi(X_0(N))=\mu\chi(X(1))-\sum_P(r_P-1)
=2\mu-\sum_P(r_P-1)
$$

です。これは分岐点で頂点の持ち上げ枚数が $\sum_P r_P=\mu$ であり、実際の頂点数が $\#\{P\}$ なので、その差が $\sum_P(r_P-1)$ になる、という直接の数え上げです。

$i$ の上では、非分岐な点が $e_2$ 個（局所次数1）、残る点の局所次数は2です。総次数 $\mu$ から分岐寄与は $(\mu-e_2)/2$。同じく $\rho$ の上では、局所次数3の点が $(\mu-e_3)/3$ 個で、その寄与は $2(\mu-e_3)/3$。カスプの局所次数は幅 $h_s$ で、全次数から $\sum_s h_s=\mu$ です。従ってカスプの寄与は $\sum_s(h_s-1)=\mu-a$。

以上を代入すると

$$
\begin{aligned}
2-2g
&=2\mu-\frac{\mu-e_2}{2}
-\frac{2(\mu-e_3)}{3}-(\mu-a)\\
&=-\frac{\mu}{6}+\frac{e_2}{2}
+\frac{2e_3}{3}+a.
\end{aligned}
$$

両辺を2で割り、$g$ について解けば主張を得ます。
<!-- proof-end -->

**レベル2**。$\mu=3$、カスプ数 $a=2$。位数2の楕円点が1個、位数3は0個なので

$$
g(X_0(2))=1+\frac3{12}-\frac14-\frac22=0.
$$

位数2の点は例えば $\begin{pmatrix}1&1\\-2&-1\end{pmatrix}$（行列式1、対角成分の和が0）の固定点から得ます。**ちょうど一つ**であることは、指数3の剰余類への $S$ の作用で確認できます。$\Gamma_0(2)$ の剰余類を $\mathbb P^1(\mathbb F_2)$ の3点で表すと、$S$ は $\infty$ と $0$ を交換し、$1$ を固定します。従って位数2の固定軌道は一つです。位数3の元は法2で特性多項式 $x^2+x+1$ が既約であり、上三角の像を持つ $\Gamma_0(2)$ には存在しません。

**レベル11**。$\mu=12$、$a=2$。位数2の固定点があれば $\Gamma_0(11)$ の行列の固有方向を法11で取り、$x^2+1$ が法11で根を持つ必要があります。しかし $-1$ は法11の平方剰余ではありません。位数3なら $x^2+x+1$ が根を持つ必要があり、その判別式 $-3\equiv8$ も非平方です。従って $e_2=e_3=0$ で、

$$
g(X_0(11))=1+\frac{12}{12}-\frac22=1.
$$

ここで「固定点の位数」と「群の行列の位数」は同じではありません。$-I$ が全ての点に作用を自明にするため、**有効群** $PSL_2$ の位数2と3を数えています。

## 6. 重さ2が正則微分に変わる理由

[CA8の正則微分](../../../解析系/CA/CA8/index.md#def-ca8-holomorphic-one-form)は、座標を替えても $f(z)\,dz$ が変わらないものです。モジュラー形式の重さ2は、ちょうど微分 $d\tau$ の変換係数を打ち消します。

実際、$\gamma\tau=(a\tau+b)/(c\tau+d)$ を微分すると

$$
d(\gamma\tau)=\frac{ad-bc}{(c\tau+d)^2}\,d\tau
=(c\tau+d)^{-2}d\tau.
$$

$f(\gamma\tau)=(c\tau+d)^2f(\tau)$ なら両因子が相殺されます。ただし、これだけではカスプに極を作る可能性が残っています。

<a id="thm-mf4-weight-two-differentials"></a>
<!-- formal-statement-start -->
> **定理（重さ2のカスプ形式と正則微分）**  
> 任意の整数 $N\ge1$ に対し、線形写像

$$
S_2(\Gamma_0(N))\longrightarrow
H^0(X_0(N),\Omega^1),\qquad
f\longmapsto f(\tau)\,d\tau
$$

> は複素線形同型である。右辺は $X_0(N)$ の正則微分全体の複素ベクトル空間を意味する。写像は上半平面での表示から商へ降ろし、カスプまで延長して定める。
<!-- formal-statement-end -->

### 証明の見取り図

不変性を導関数で計算した後、通常点、楕円固定点、カスプで局所正則性を個別に確認します。逆写像では正則微分を $\mathbb H$ に引き戻し、その係数関数が各カスプで一次以上消えることを示します。

<!-- proof-start -->
### 証明

**正方向**。$f\in S_2(\Gamma_0(N))$ とします。各 $\gamma\in\Gamma_0(N)$ で

$$
f(\gamma\tau)d(\gamma\tau)
=(c\tau+d)^2f(\tau)(c\tau+d)^{-2}d\tau
=f(\tau)d\tau.
$$

従って $f\,d\tau$ は商上の微分として定義できます。通常点では局所的な商写像が双正則で、係数 $f$ は正則なので問題ありません。

楕円固定点では先述の座標 $w$ で、引き戻した微分を $A(w)dw$ と書きます。$w\mapsto\zeta w$ が安定化群の作用（$\zeta$ は原始 $e$ 乗根）なので、不変性は

$$
A(\zeta w)\zeta=A(w).
$$

$A(w)=\sum_{m\ge0}b_mw^m$ と展開すると、$b_m\ne0$ となるのは $\zeta^{m+1}=1$、すなわち $m=e-1+e\ell$（$\ell\ge0$）の場合だけです。従って $A(w)=w^{e-1}B(w^e)$ と正則な $B$ で書けます。$t=w^e$ と置けば

$$
A(w)dw=w^{e-1}B(t)dw=\frac1eB(t)\,dt
$$

となり、商の楕円点でも正則です。

カスプ $s$ の幅 $h_s$、スケーリング行列 $\sigma_s$ に対して $g=f|_2\sigma_s$ と置くと、$f(\sigma_s\tau)d(\sigma_s\tau)=g(\tau)d\tau$ です。カスプ形式だから $g=\sum_{n\ge1}a_n(s)q_s^n$。連鎖律から

$$
dq_s=\frac{2\pi i}{h_s}q_s\,d\tau,\qquad
g(\tau)d\tau=
\frac{h_s}{2\pi i}\sum_{n\ge1}a_n(s)q_s^{n-1}\,dq_s.
$$

負冪がないので $q_s=0$ まで正則に延長します。

**逆方向**。$\omega\in H^0(X_0(N),\Omega^1)$ を取ります。商写像を通じて $\mathbb H$ へ引き戻すと、正則微分の局所表示は一意に $\omega=f(\tau)d\tau$ となり、$f$ は $\mathbb H$ 上で正則です。$\omega$ が商の微分なので、$\gamma$ による引き戻しが変わりません。上記の微分公式を逆に読むと $f(\gamma\tau)=(c\tau+d)^2 f(\tau)$ です。

カスプ $s$ の局所座標で $\omega=B(q_s)dq_s$ と正則な $B(q_s)=\sum_{m\ge0}b_mq_s^m$ を取ります。$\sigma_s$ で持ち上げた係数は

$$
(f|_2\sigma_s)(\tau)
=\frac{2\pi i}{h_s}q_sB(q_s)
=\frac{2\pi i}{h_s}\sum_{m\ge0}b_mq_s^{m+1}.
$$

従って全カスプで定数項0であり、$f\in S_2(\Gamma_0(N))$ です。二つの操作は上半平面で明らかに逆で、そこで一致する正則微分は商上でも一致します。よって線形同型です。
<!-- proof-end -->

**典型的な誤り**。重さ2のモジュラー形式 $f$ がカスプで定数項 $a_0(s)\ne0$ を持つと、上の微分は

$$
\frac{h_s}{2\pi i}\left(\frac{a_0(s)}{q_s}+a_1(s)+\cdots\right)dq_s
$$

となり、単純極を持ちます。だから**形式全体ではなくカスプ形式**が正則微分に対応するのです。

**種数と次元**。任意の連結コンパクト Riemann 面 $X$ に対する古典的な定理

$$
\dim_{\mathbb C}H^0(X,\Omega^1)=g(X)
$$

を別途用いると、上の同型から $\dim_{\mathbb C}S_2(\Gamma_0(N))=g(X_0(N))$ です。この一般定理には Riemann–Roch 定理等の、CA8より進んだ理論が必要です。**ここではその一般定理の証明を行わず、外部の古典的結果として明示的に使用しています**。これを本章の同型の証明と混同しないでください。したがってレベル2では重さ2のカスプ形式は零、レベル11では空間が1次元です。

## 7. 複素格子から $(E,C)$ を読む

[CA8の複素トーラス](../../../解析系/CA/CA8/index.md#thm-ca8-complex-torus)を $E_\tau=\mathbb C/(\mathbb Z\tau+\mathbb Z)$ と書きます。複素数の加法から得られる点の群のうち、ちょうど $N$ 個の点からなり一つの点の倍数で生成できる部分群を、**位数 $N$ の巡回部分群**と呼びます。例えば $1/N$ の剰余類が生成する部分群

$$
C_\tau=\left\{\frac{r}{N}+\Lambda_\tau:0\le r<N\right\}
$$

は位数 $N$ です。$r/N\in\Lambda_\tau$ なら虚部から $\tau$ の係数は0で、実部から $N\mid r$ なので、指定範囲では $r=0$ だけだからです。

<a id="prop-mf4-complex-moduli"></a>
<!-- formal-statement-start -->
> **命題（巡回部分群付き複素楕円曲線の分類）**  
> $N\ge1$ に対し、$\mathbb H$ の点 $\tau$ から作る組 $(E_\tau,C_\tau)$ の複素解析的同型類は、$\Gamma_0(N)$ の軌道と一対一に対応する。従って $Y_0(N)(\mathbb C)$ はそのような組の複素同型類の空間として解釈できる。ここで同型は、複素トーラスの群構造と指定巡回部分群の双方を保つ正則群同型を意味する。
<!-- formal-statement-end -->

### 証明の見取り図

[格子の相似類とモジュラー群の軌道](../MF1/index.md#thm-mf1-lattice-orbit)は $\gamma\tau=(a\tau+b)/(c\tau+d)$ と書けます。格子を $(c\tau+d)$ 倍すると元の格子へ戻ります。その際、指定部分群の生成元がどこへ移るかを計算します。

<!-- proof-start -->
### 証明

$\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z)$ とし、$\tau'=\gamma\tau$ とします。$\Lambda_{\tau'}$ を $c\tau+d$ 倍すると

$$
(c\tau+d)\Lambda_{\tau'}
=\mathbb Z(a\tau+b)+\mathbb Z(c\tau+d)
=\Lambda_\tau
$$

です。最後の等号は行列式1から、二つの右辺の格子基底が可逆な整数基底変換であるためです。従って $z\mapsto(c\tau+d)z$ は $E_{\tau'}\to E_\tau$ の正則群同型を誘導します。

$C_{\tau'}$ の生成元 $1/N$ は、$E_\tau$ 側で $(c\tau+d)/N$ となります。$\gamma\in\Gamma_0(N)$ なら $c=Nc'$ なので、その類は $d/N$ の類に等しいです。さらに $ad-bc=1$ より $ad\equiv1\pmod N$、従って $\gcd(d,N)=1$ です。この生成元が元の $C_\tau$ 全体を生成し、対は同型です。

逆に、複素トーラス間の正則群同型は格子をある非零複素数で移すので、[格子の相似類とモジュラー群の軌道](../MF1/index.md#thm-mf1-lattice-orbit)から何らかの $\gamma\in SL_2(\mathbb Z)$ が生じます。その同型が $C_{\tau'}$ を $C_\tau$ へ送るなら $(c\tau+d)/N$ の類は $r/N$ の類です。すなわち

$$
\frac{c\tau+d-r}{N}=m\tau+n
$$

となる整数 $m,n,r$ があり、$\operatorname{Im}\tau>0$ で $1,\tau$ が実一次独立だから $c=Nm$ が従います。従って $\gamma\in\Gamma_0(N)$。双方の含意が成立します。
<!-- proof-end -->

複素曲線としてのこの解釈から、$\mathbb Q$ 上の代数モデルや $\mathbb Q$ 上で定義された楕円曲線への射がそのまま得られる、と考えてはいけません。算術的な降下とモデルは別の定理を要します。次章MF5では、この複素曲線の「格子と巡回部分群を取り替える対応」から Hecke 作用素へ進みます。

## 8. 演習と詳細解答

**Level A：基本操作を一つずつ確認する**

### A1. 3種類の群を判定する

$N=3$ とし、$T=\begin{pmatrix}1&1\\0&1\end{pmatrix}$、$U=\begin{pmatrix}1&0\\3&1\end{pmatrix}$、$V=\begin{pmatrix}2&1\\3&2\end{pmatrix}$ が、それぞれ $\Gamma(3),\Gamma_1(3),\Gamma_0(3)$ のどれに属するか判定せよ。

- Level: A
- ID: MF4-A1

<!-- solution-start -->
**詳細解答**　全行列の行列式は $1$（$V$ は $4-3=1$）です。$T$ は $c=0,\ a=d=1$ だから $\Gamma_1(3),\Gamma_0(3)$ に入り、$b=1$ なので $\Gamma(3)$ には入りません。$U$ は対角1、左下3、右上0なので $\Gamma(3)$ に入り、包含関係により残る二群にも入ります。$V$ は $c=3$ なので $\Gamma_0(3)$ に入り、$a=d=2\not\equiv1\pmod3$ なので $\Gamma_1(3)$ に入らず、従って $\Gamma(3)$ にも入りません。
<!-- solution-end -->

### A2. 幅を計算する

$\Gamma_0(12)$ の既約カスプ代表 $\infty,0,1/2,1/3,1/4$ の幅を求めよ。各分母 $c$ を明示して計算せよ。

- Level: A
- ID: MF4-A2

<!-- solution-start -->
**詳細解答**　[幅の公式](#prop-mf4-width-formula)に $N=12$ と分母 $c=0,1,2,3,4$ を順に代入します。

$$
\begin{aligned}
h_\infty&=12/\gcd(12,0)=1,\\
h_0&=12/\gcd(12,1)=12,\\
h_{1/2}&=12/\gcd(12,4)=12/4=3,\\
h_{1/3}&=12/\gcd(12,9)=12/3=4,\\
h_{1/4}&=12/\gcd(12,16)=12/4=3.
\end{aligned}
$$

これらは全カスプの完全な代表一覧という主張ではなく、指定された各代表に対する幅の判定です。
<!-- solution-end -->

### A3. 微分の重さを確認する

$\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z)$ とし、$d(\gamma\tau)$ を計算して、$f(\gamma\tau)=(c\tau+d)^2f(\tau)$ のとき $f(\tau)d\tau$ が不変であることを確かめよ。

- Level: A
- ID: MF4-A3

<!-- solution-start -->
**詳細解答**　分子・分母をそれぞれ微分し、商の微分を計算すると

$$
\frac{d}{d\tau}\frac{a\tau+b}{c\tau+d}
=\frac{a(c\tau+d)-c(a\tau+b)}{(c\tau+d)^2}
=\frac{ad-bc}{(c\tau+d)^2}
=\frac1{(c\tau+d)^2}.
$$

よって $f(\gamma\tau)d(\gamma\tau)=(c\tau+d)^2f(\tau)\cdot(c\tau+d)^{-2}d\tau=f(\tau)d\tau$ です。
<!-- solution-end -->

### A4. カスプの定数項と極を区別する

幅 $h=5$ のカスプで $g=f|_2\sigma=3+2q_h+O(q_h^2)$ なら、$g(\tau)d\tau$ を $dq_h$ で書け。正則微分に延長するか述べよ。

- Level: A
- ID: MF4-A4

<!-- solution-start -->
**詳細解答**　$q_h=e^{2\pi i\tau/5}$ なので $dq_h=(2\pi i/5)q_h\,d\tau$、つまり $d\tau=5\,dq_h/(2\pi iq_h)$ です。従って

$$
g(\tau)d\tau
=\frac5{2\pi i}\left(3q_h^{-1}+2+O(q_h)\right)dq_h.
$$

$q_h^{-1}$ の係数が $15/(2\pi i)\ne0$ なので、原点で単純極を持ち、正則微分へは延長できません。
<!-- solution-end -->

**Level B：複数の判定を接続する**

### B1. 素数レベルのカスプを分類する

$\Gamma_0(7)$ について、$2/7$ と $2/5$ がそれぞれ $\infty$ と $0$ のどちらの軌道に属するか、具体的な $\Gamma_0(7)$ の行列を一つずつ作れ。

- Level: B
- ID: MF4-B1

<!-- solution-start -->
**詳細解答**　$2/7$ は分母が7で割れるので $\infty$ の軌道です。$2d-7b=1$ の解 $d=4,b=1$ を取ると

$$
\gamma_1=\begin{pmatrix}2&1\\7&4\end{pmatrix},\qquad
\det\gamma_1=8-7=1,\qquad \gamma_1\in\Gamma_0(7),
$$

であり $\gamma_1\infty=2/7$。

$2/5$ は分母が7で割れないので $0$ の軌道です。$5x-14t=1$ の解 $x=3,t=1$ を取り、

$$
\gamma_2=\begin{pmatrix}3&2\\7&5\end{pmatrix},\qquad
\det\gamma_2=15-14=1,\qquad\gamma_2\in\Gamma_0(7),
$$

から $\gamma_2 0=2/5$。行列式と左下成分を両方確認しました。
<!-- solution-end -->

### B2. $\infty$ で消えてもカスプ形式とは限らない

$F(\tau)=E_4(\tau)-E_4(2\tau)$ が $\Gamma_0(2)$ の重さ4の形式であり、$\infty$ で定数項0だが $0$ では定数項 $15/16$ であることを示せ。

- Level: B
- ID: MF4-B2

<!-- solution-start -->
**詳細解答**　$\Gamma_0(2)$ の元を $\gamma=\begin{pmatrix}a&b\\2c&d\end{pmatrix}$ とすると $2\gamma\tau=(a(2\tau)+2b)/(c(2\tau)+d)$。右辺の整数行列は行列式 $ad-2bc=1$ で、[E4のモジュラー性](../MF2/index.md#thm-mf2-eisenstein-modularity)を $2\tau$ に適用できるので、$E_4(2\gamma\tau)=(2c\tau+d)^4E_4(2\tau)$ です。$E_4(\gamma\tau)$ にも同じ変換則が成り立つため、差 $F$ は重さ4の変換則を満たします。

$\infty$ では $E_4(\tau)=1+240q+O(q^2)$、$E_4(2\tau)=1+240q^2+O(q^4)$ で定数項が相殺されます。$0$ の $\sigma=S$ では

$$
(E_4(2\tau)|_4S)(\tau)
=\tau^{-4}E_4(-2/\tau)
=2^{-4}E_4(\tau/2).
$$

$F|_4S=E_4-2^{-4}E_4(\tau/2)$ は $q_0=e^{\pi i\tau}$ の正則冪級数を持ち、定数項は $1-1/16=15/16$。したがって全カスプで正則ですが、[カスプ形式の定義](#def-mf4-level-form)の条件は満たしません。
<!-- solution-end -->

### B3. 楕円点で正則な微分に降りる

$w\mapsto\zeta w$（$\zeta^3=1,\zeta\ne1$）に不変な正則微分 $A(w)dw$ の係数は $A(w)=w^2B(w^3)$ と書けることを示せ。また $t=w^3$ での表示を求めよ。

- Level: B
- ID: MF4-B3

<!-- solution-start -->
**詳細解答**　$A(w)=\sum_{m\ge0}b_mw^m$ と展開すると、不変性は $A(\zeta w)\zeta=A(w)$ です。比較すると $b_m(\zeta^{m+1}-1)=0$。$\zeta$ の位数は3なので $b_m\ne0$ なら $m+1$ は3の倍数、すなわち $m=2+3\ell$、$\ell\ge0$ です。従って

$$
A(w)=w^2\sum_{\ell\ge0}b_{2+3\ell}(w^3)^\ell=w^2B(w^3).
$$

$t=w^3$ を微分すると $dt=3w^2dw$。よって $A(w)dw=\frac13B(t)dt$ となり、$t=0$ で正則です。
<!-- solution-end -->

### B4. 分岐の和から種数公式を復元する

指数 $\mu$、楕円点数 $e_2,e_3$、カスプ数 $a$ を持つ $\Gamma_0(N)$ について、$i,\rho,\infty$ の上の分岐寄与を別々に求め、種数公式を導け。

- Level: B
- ID: MF4-B4

<!-- solution-start -->
**詳細解答**　[$X_0(N)$ の局所次数](#thm-mf4-compactification)により、$i$ 上は $e_2$ 個が局所次数1、残る $(\mu-e_2)/2$ 個が次数2です。よって寄与は $(\mu-e_2)/2$。$\rho$ 上は $e_3$ 個が次数1、残る $(\mu-e_3)/3$ 個が次数3です。寄与は $2(\mu-e_3)/3$ です。カスプは $\sum_s h_s=\mu$ なので $\sum_s(h_s-1)=\mu-a$ です。

分岐を頂点に取る三角形分割の持ち上げで Euler 標数は次数 $\mu$ 倍から分岐寄与を引いたものとなります。従って

$$
2-2g=2\mu-\frac{\mu-e_2}{2}-\frac{2(\mu-e_3)}3-(\mu-a)
=-\frac{\mu}{6}+\frac{e_2}2+\frac{2e_3}3+a.
$$

移項して $g=1+\mu/12-e_2/4-e_3/3-a/2$ です。数えたものは**固定点の総数ではなく有効位数2,3の点数**であることに注意します。
<!-- solution-end -->

**Level C：幾何・解析・合同算術を結ぶ**

### C1. $X_0(11)$ と重さ2形式

$\Gamma_0(11)$ を考える。(i) カスプ軌道と幅を求めよ。(ii) 指数・楕円点数から種数を求めよ。(iii) [重さ2と正則微分の対応](#thm-mf4-weight-two-differentials)に加え、一般のコンパクト Riemann 面での等式 $\dim H^0(X,\Omega^1)=g(X)$ を外部入力として用いることを明示したうえで、重さ2カスプ形式の空間の次元を求めよ。(iv) 重さ2のモジュラー形式に全カスプでの定数項零を要求する必要性を説明せよ。

- Level: C
- ID: MF4-C1

<!-- solution-start -->
**詳細解答**　(i) [素数レベルのカスプ分類](#prop-mf4-prime-cusps)から、分母が11で割れる点は $\infty$、割れない点は $0$ の軌道です。幅は [幅の公式](#prop-mf4-width-formula)に $c=0,1$ を代入し

$$
h_\infty=11/\gcd(11,0)=1,\qquad h_0=11/\gcd(11,1)=11.
$$

(ii) [指数公式](#thm-mf4-subgroup-index)より $\mu=11(1+1/11)=12$。有効位数2の固定点があれば行列の対角成分の和が0となり、法11で $x^2+1$ に根が必要です。平方剰余集合は $0,1,3,4,5,9$ で $-1\equiv10$ は入っていません。位数3の固定点があれば法11で $x^2+x+1$ に根が必要で、その判別式 $-3\equiv8$ も非平方です。よって $e_2=e_3=0$、カスプ数 $a=2$ です。種数公式で

$$
g=1+\frac{12}{12}-0-0-\frac22=1.
$$

(iii) [重さ2の同型](#thm-mf4-weight-two-differentials)は本章で証明済みです。さらに一般のコンパクト Riemann 面に対する等式 $\dim H^0(X,\Omega^1)=g(X)$ を、ここでは証明せず外部入力として適用すると

$$
\dim_{\mathbb C}S_2(\Gamma_0(11))=1.
$$

ここではカスプ形式の具体的な$q$展開や newform 性はまだ求めていません。

(iv) $f|_2\sigma_s=a_0(s)+a_1(s)q_s+\cdots$ なら

$$
(f|_2\sigma_s)d\tau
=\frac{h_s}{2\pi i}\bigl(a_0(s)q_s^{-1}+a_1(s)+\cdots\bigr)dq_s.
$$

どれか一つのカスプで $a_0(s)\ne0$ なら、その点に単純極が生じ、正則微分になりません。従って正則性は $\infty$ の一カスプだけでなく**全カスプ**に必要です。
<!-- solution-end -->

## 9. 次章への接続

有限指数の合同部分群では、カスプ幅と分岐を数えることで複素モジュラー曲線の幾何が決まります。重さ2の形式を微分として読めることは、曲線の対称性を使って形式に作用素を作る動機にもなります。次章MF5では、格子の有限指数部分格子と二重剰余類から Hecke 作用を導き、Fourier 係数の乗法性へ進みます。
