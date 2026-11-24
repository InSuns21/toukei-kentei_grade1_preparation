# AFR23 RH・Dirichlet GRH：零点から平滑化素数冪和、主不等式(M)への解析的還元

<!-- definition-example-audit: strict -->

[持ち上げの内積展開](../AFR22/index.md#thm-afr22-kernel-pairing)では保型表現から得る関数の大きさを測りました。ではその大きさを素数の分布の評価へ変換できたとき、どうして複素平面上の零点の位置が決まるのでしょうか。

[十分鋭い誤差評価はRHを導く](../../ANT/ANT8/index.md#cor-ant8-strong-error-rh)では、全ての十分大きな点での誤差評価を使いました。今回の入力はもっと弱く、任意に遠くへ行った先のある区間での上側の評価だけです。零点の情報を取り出すため、積分変換の高階微分を使います。

本講は2026年11月21日付の [Rubinsteinらによる解説稿](https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/zeta-paper.pdf)（以下 R、Part II §§1,3–5、Part I §10）と、11月22日付の [Robin Zhangの予備ノート](https://www.ihes.fr/~rzhang/files/GRH%20note.pdf)（以下 Z、§2）を読むための講義です。Rの自然言語による証明はζの場合に特化しています。形式的証明の認証と、そのすべてを人間が読める形で再構成することは区別します。本講では解析的な還元を証明し、保型的な入力は出典を明記して用います。

## 1. 素数冪の重みを積分変換へ移す

$x\ge1$ は実数、$s=\sigma+it$ は複素数とします。自然対数を用います。$n$ は正整数、素数冪 $p^h$ の指数 $h$ は正整数です。

[von Mangoldt関数](../../NT/NT8/index.md#def-nt8-von-mangoldt) $\Lambda(n)$ は素数冪 $n=p^h$ に $\log p$、それ以外に0を与えます。

[Dirichlet文字](../../ANT/ANT3/index.md#def-ant3-character) $\chi$ は既約剰余類の乗法的な文字を非単元で0とした関数です。ここでは[原始Dirichlet文字](../../ANT/ANT3/index.md#def-ant3-primitive)を使います。[Dirichlet L関数](../../ANT/ANT3/index.md#def-ant3-l-function) $L(s,\chi)$ は実部 $\sigma>1$ で $\sum_{n\ge1}\chi(n)n^{-s}$ と表され、法1の定数文字 $1$ に対しては $L(s,1)=\zeta(s)$ です。$L'(s,\chi)=dL(s,\chi)/ds$ は文字 $\chi$ を固定した複素変数 $s$ の微分を表します。

[一次平滑化したChebyshev和](../../ANT/ANT7/index.md#def-ant7-smoothed-psi)で使った重み $1-n/x$ を今回は $x/n$ 倍します。これは積分変換に $s-1$ という分母を作ります。例えば $x=3$ では $n=2$ の項に $1/2$、$n=3$ の項に0を掛けます。$v_+=\max(v,0)$ と書きます。

<a id="def-afr23-smoothed-sum"></a>

<!-- formal-statement-start -->
> **定義（文字付き平滑化素数冪和）**
>
> 原始Dirichlet文字 $\chi$（法1も含む）と実数 $x\ge1$ に対し

$$
S_\chi(x)=\sum_{n\le x}\Lambda(n)\chi(n)(x/n-1)
$$

> と置く。法1のとき $S_1$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr23-smoothed-sum -->
**定義の確認**

法4で奇数の剰余類1,3にそれぞれ $1,-1$ を与え、偶数に0を与える文字 $\chi_4$ を取ります。単元群は $\{1,3\}$ で $3^2=1$ なので乗法性が成立します。法1,2では奇数1と3の像を区別できず、この二つの整数に異なる文字値を与える $\chi_4$ はどちらの法からも誘導されません。[原始Dirichlet文字の定義](../../ANT/ANT3/index.md#def-ant3-primitive)より原始です。$x=6$ では素数冪 $2,3,4,5$ のうち2,4の係数が0です。

$$
S_{\chi_4}(6)=-\log3+\frac15\log5.
$$

一方 $S_1(6)=\frac52\log2+\log3+\frac15\log5$ です。2と4の重みはそれぞれ2と $1/2$ なので、同じ素数の冪を別々に数えています。
<!-- definition-example-end -->

ここで積分によって関数を複素変数の関数に移す操作を導入します。複素冪は $x^{-s}=\exp(-s\log x)$ とします。

<a id="def-afr23-mellin-transform"></a>

<!-- formal-statement-start -->
> **定義（Mellin変換）**
>
> 局所可積分な関数 $f:[1,\infty)\to\mathbb C$ に対し、積分が絶対収束する複素数 $s$ で

$$
\mathcal M f(s)=\int_1^\infty f(x)x^{-s-1}dx
$$

> と置く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr23-mellin-transform -->
**定義の確認**

$f(x)=1$ は局所可積分で、$\operatorname{Re}s>0$ なら $\int_1^\infty x^{-\operatorname{Re}s-1}dx=1/\operatorname{Re}s$ だから絶対収束します。原始関数 $-x^{-s}/s$ を用いて $\mathcal M f(s)=1/s$ となります。
<!-- definition-example-end -->

通常の $\int_0^\infty f(x)x^{z-1}dx$ という規約とは、$0<x<1$ で関数を0に延長して $z=-s$ と置く関係にあります。

<a id="thm-afr23-mellin"></a>

<!-- formal-statement-start -->
> **定理（平滑化和のMellin変換）**
>
> 原始Dirichlet文字 $\chi$（法1も含む）と $\operatorname{Re}s>1$ に対し、絶対収束する等式

$$
\int_1^\infty S_\chi(x)x^{-s-1}dx
=-\frac{L'(s,\chi)}{s(s-1)L(s,\chi)}
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

各整数の重みの積分を計算し、[文字付きvon Mangoldt級数](../../ANT/ANT8/index.md#prop-ant8-character-log-derivative)を用います。実部が1より大きいことが積分と級数の両方に必要です。

<!-- proof-start -->
### 証明

$n$ を固定すると、$\sigma>1$ で

$$
\begin{aligned}
\int_n^\infty (x/n-1)x^{-s-1}dx
&=\frac1n\int_n^\infty x^{-s}dx-\int_n^\infty x^{-s-1}dx\\
&=\frac{n^{-s}}{s-1}-\frac{n^{-s}}s\\
&=\frac{n^{-s}}{s(s-1)}.
\end{aligned}
$$

$\Lambda(n)\le\log n$、$|\chi(n)|\le1$ より絶対値の積分の和は

$$
\sum_{n\ge1}\Lambda(n)|\chi(n)|
\frac{n^{-\sigma}}{\sigma(\sigma-1)}
\le\frac{\sum_{n\ge2}(\log n)n^{-\sigma}}{\sigma(\sigma-1)}<\infty.
$$

最後の級数は積分判定で収束します。[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)で積分と和を交換できます。法1なら[ζの対数微分とvon Mangoldt級数](../../ANT/ANT5/index.md#thm-ant5-logarithmic-derivative)、それ以外なら[文字付きvon Mangoldt級数](../../ANT/ANT8/index.md#prop-ant8-character-log-derivative)を代入します。
<!-- proof-end -->

## 2. 主項を引き、零点を極として残す

$s=1$ はζの極です。零点を検出するのにこの既知の特異点は邪魔になるので、積分変換がそこで正則になるように $S_\chi$ を補正します。Euler定数を $\gamma=\lim_{N\to\infty}(\sum_{n=1}^N1/n-\log N)$ とします。非主文字では[非主Dirichlet L関数の境界非零性](../../ANT/ANT4/index.md#thm-ant4-l-one-nonzero)により $L(1,\chi)\ne0$ です。

<a id="def-afr23-centered-sum"></a>

<!-- formal-statement-start -->
> **定義（中心化平滑和）**
>
> 原始Dirichlet文字 $\chi$ と $x\ge1$ に対し、法1なら

$$
G(x)=S_1(x)-x\log x+(1+\gamma)x,
$$

> 非主文字なら $c_\chi=L'(1,\chi)/L(1,\chi)$ として

$$
G_\chi(x)=S_\chi(x)+c_\chi x
$$

> と置く。法1では $G_1=G$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr23-centered-sum -->
**定義の確認**

$x=2$ では $S_1(2)=0$ なので $G(2)=2(1+\gamma-\log2)$ です。法4の上の原始文字では $S_{\chi_4}(2)=0$、従って $G_{\chi_4}(2)=2c_{\chi_4}$ です。非主文字の $c_{\chi_4}$ は境界非零性で有限であり、実文字なので実数です。ζにだけ $x\log x$ が現れる理由を次の計算で確かめます。
<!-- definition-example-end -->

$a=s-1$ と置くと、$\operatorname{Re}a>0$ で

$$
\int_1^\infty x\,x^{-s-1}dx=1/a,\qquad
\int_1^\infty x\log x\,x^{-s-1}dx=1/a^2.
$$

後者は $u=\log x$、$x=e^u$、$dx=e^u du$ と置くと $\int_0^\infty u e^{-au}du$ になります。$\operatorname{Re}a>0$ なので境界項 $-ue^{-au}/a$ は両端で0となり、部分積分で $(1/a)\int_0^\infty e^{-au}du=1/a^2$ を得ます。

<a id="thm-afr23-centered-transform"></a>

<!-- formal-statement-start -->
> **定理（中心化変換の極と留数）**
>
> 原始Dirichlet文字 $\chi$ に対し $F_\chi(s)=\int_1^\infty G_\chi(x)x^{-s-1}dx$ を $\operatorname{Re}s>1$ で定める。これは $\operatorname{Re}s>0$ に有理型に延長され、$s=1$ で正則である。右半平面 $\operatorname{Re}\rho>0$ にある $L(s,\chi)$ の零点（$\rho\ne1$） $\rho$ の重複度を $\nu$ とすると $F_\chi$ は $\rho$ に単純極を持ち、

$$
\operatorname{Res}_{s=\rho}F_\chi(s)=\frac{\nu}{\rho(1-\rho)}
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

法1では二重極と単純極を両方取り除きます。非主文字では分母 $s-1$ が作る単純極を取り除きます。零点での対数微分は重複度を留数に持つので、中心化によって零点由来の極は消えません。

<!-- proof-start -->
### 証明

[平滑化和のMellin変換](#thm-afr23-mellin)と直前の二つの積分から

$$
F_1(s)=-\frac{\zeta'(s)}{s(s-1)\zeta(s)}
-\frac1{(s-1)^2}+\frac{1+\gamma}{s-1},
$$

$$
F_\chi(s)=-\frac{L'(s,\chi)}{s(s-1)L(s,\chi)}+\frac{c_\chi}{s-1}
\quad(\chi\ne1).
$$

ζの $s=1$ におけるLaurent展開 $\zeta(1+a)=a^{-1}+\gamma+O(a)$（Rの式(II.1)）より

$$
\frac{\zeta'(1+a)}{\zeta(1+a)}
=-a^{-1}+\gamma+O(a).
$$

実際、分子は $-a^{-2}+O(1)$、分母の逆数は $a(1-\gamma a+O(a^2))$ です。さらに $1/(s(s-1))=a^{-1}-1+O(a)$ なので、負の対数微分との積は

$$
a^{-2}-(1+\gamma)a^{-1}+O(1).
$$

従って $F_1$ の負べき項は全て消えます。非主文字の場合は $L'/L=c_\chi+O(a)$ なので $-c_\chi/a$ が補正項と相殺します。[非主L関数の正則延長と主L関数の極](../../ANT/ANT3/index.md#thm-ant3-l-continuation)によって式の右辺は右半平面に有理型です。

零点 $\rho$ では $L(s,\chi)=(s-\rho)^\nu H(s)$、$H$ は $\rho$ の近傍で正則かつ $H(\rho)\ne0$ です。対数微分を取ると

$$
\frac{L'(s,\chi)}{L(s,\chi)}
=\frac{\nu}{s-\rho}+\frac{H'(s)}{H(s)}.
$$

$\rho\ne0,1$ なので残りの因子を $\rho$ で評価して $-\nu/(\rho(\rho-1))$ を得ます。補正項は $\rho$ で正則です。
<!-- proof-end -->

例えば実零点 $\rho=3/4$ を仮定すると留数は $16\nu/3$ と正になります。複素零点で留数が実数になるとは限りません。

非原始文字を扱う場合は[誘導文字による有限Euler因子](../../ANT/ANT8/index.md#prop-ant8-induced-l-factor)を用います。原始文字の導手を $f$、誘導先の法を $q$ とすれば余分な因子は $1-\chi^\ast(p)p^{-s}$（$p\mid q,\ p\nmid f$）です。$\sigma>0$ なら $|\chi^\ast(p)p^{-s}|\le p^{-\sigma}<1$ なのでその因子は零になりません。従って右半平面の零点を調べるには原始文字で十分です。法 $q>1$ の主文字に法1と同じ線形補正を無条件に適用してはいけません。

## 3. 片側上界が零点を排除する仕組み

変換の微分を何度も取ると $u=\log x$ の大きな値に積分の重みが集中します。例えば $u^j e^{-ru}$ の対数を微分すれば $j/u-r$ なので最大は $u=j/r$ です。$j$ を選ぶことで、上界が分かっている区間を狙えます。反対に極が近いほどTaylor係数は大きくなります。この二つを比較します。

まず実関数に限定します。複素文字を含む有限集合 $\mathcal X$（法1を許す）と正の実数 $a_\chi$ に対し

$$
g(u)=\sum_{\chi\in\mathcal X}a_\chi\operatorname{Re}G_\chi(e^u),\qquad u\ge0
$$

とします。$G_{\bar\chi}(x)=\overline{G_\chi(x)}$ なので変換は

$$
F(s)=\frac12\sum_{\chi\in\mathcal X}a_\chi(F_\chi(s)+F_{\bar\chi}(s)).
$$

ここで $\operatorname{Re}F_\chi(s)$ としてはいけません。それは一般には正則でないからです。[中心化変換の極と留数](#thm-afr23-centered-transform)より共通の零点 $\rho$ での留数は

$$
\frac{\sum_{\chi\in\mathcal X}a_\chi(\nu_\chi+\nu_{\bar\chi})/2}{\rho(1-\rho)}.
$$

$\nu_\chi$ はその文字の零点の重複度（零点でなければ0）です。分子は正なので零点の情報は相殺されません。例えば二つの実文字の重複度が2,1、重みが1,3なら分子は5です。重みを1,-2に変えると分子が0になり得ます。ここで正にするのは文字ごとの線形結合の係数であり、$G_\chi$ の値が常に正という意味ではありません。

<a id="thm-afr23-interval"></a>

<!-- formal-statement-start -->
> **定理（区間上の片側上界による零点検出）**
>
> $\mathcal X$ を有限な原始Dirichlet文字の集合（法1も許す）とし、各 $a_\chi>0$ を固定する。$0<\theta<1$ とする。任意の $Y_0>1$ に対しある $Y\ge Y_0$ が存在し、区間 $[Y,Y^{3/2}]$ の全ての実数 $x$ で

$$
\sum_{\chi\in\mathcal X}a_\chi\operatorname{Re}G_\chi(x)\le x^\theta
$$

> が成り立つなら、これらの $L(s,\chi)$ は $\operatorname{Re}s>\theta$ に零点を持たない。
<!-- formal-statement-end -->

### 証明の見取り図

1. 高階微分を、対数座標の集中する積分で表す。
2. 区間外の指数的に小さい重みと、区間内の上界を組み合わせる。
3. 近い単純極が作るTaylor係数と比較する。非実極の場合は展開中心を垂直に移動し、実極の場合は留数の正符号を使う。

R Part II §1およびZ §2の議論を、積分の集中を直接評価して導きます。

<!-- proof-start -->
### 証明

$\Lambda(n)\le\log n$ と調和級数の評価から

$$
|S_\chi(x)|\le x\sum_{2\le n\le x}\frac{\log n}{n}
=O(x(1+\log x)^2).
$$

補正項もこの範囲内であり、固定した文字と係数について $|g(u)|\le C_0e^{2u}$ とできます。$x=e^u$、$dx=e^u du$ により $F(s)=\int_0^\infty g(u)e^{-su}du$ です。$F^{(j)}$ は複素変数 $s$ に関する $j$ 階微分を表し、$j$ は非負整数です。$u$ を固定して $s$ で微分すると $d^j e^{-su}/ds^j=(-u)^j e^{-su}$ となります。$\operatorname{Re}s>2$ の任意のコンパクト集合上で $\operatorname{Re}s\ge2+\eta$ となる $\eta>0$ を取れば、微分後の絶対値は $C_0u^je^{-\eta u}$ に支配されます。この関数は可積分なので積分内微分が可能です。従って

$$
A_j(s)=\frac{(-1)^jF^{(j)}(s)}{j!}
=\int_0^\infty g(u)\frac{u^j e^{-su}}{j!}du.
$$

実数 $\sigma>2$、$r=\sigma-2$ とします。$K_j(u)=u^j e^{-\sigma u}/j!$ は非負です。三角不等式と $g+|g|=2g_+$ から任意の $t\in\mathbb R$ で

$$
|A_j(\sigma+it)|+A_j(\sigma)
\le2\int_0^\infty g_+(u)K_j(u)du.
$$

条件を満たす $Y$ ごとに $U=\log Y$、$j$ を $5rU/4$ に最も近い整数とします。$U\to\infty$ とともに $j\to\infty$ です。区間 $[U,3U/2]$ では $g_+(u)\le e^{\theta u}$ なので、そこでの積分は全区間に拡げて $(\sigma-\theta)^{-j-1}$ 以下です。

区間外の評価を示します。$v=ru$ と置き、密度 $v^je^{-v}/j!$ を $v\ge0$ 上に置きます。部分積分を繰り返せばその積分は1です。$rU/(j+1)\to4/5$、$3rU/(2(j+1))\to6/5$ なので、十分大きい $j$ に対する区間外は $v\le0.9(j+1)$ または $v\ge1.1(j+1)$ に含まれます。$a>1$、$0<\lambda<1$ なら

$$
\int_{a(j+1)}^\infty\frac{v^je^{-v}}{j!}dv
\le e^{-\lambda a(j+1)}(1-\lambda)^{-j-1}.
$$

$\lambda=1-1/a$ とすれば右辺は $\exp(-(j+1)(a-1-\log a))$ です。$0<a<1$ では $\lambda=1-1/a<0$ として $v\le a(j+1)$ の範囲に同じ操作を行うと同じ指数を得ます（この範囲で $e^{\lambda v}\ge e^{\lambda a(j+1)}$）。$a=0.9,1.1$ で $a-1-\log a>0$ ですから、ある絶対定数 $c>0$ で両側を $2e^{-cj}$ と評価できます。

従って区間外の元の積分は $2C_0e^{-cj}r^{-j-1}$ 以下です。$\sigma$ を十分大きく固定して $\log((\sigma-\theta)/r)<c$ とすれば

$$
|A_j(\sigma+it)|+A_j(\sigma)
\le C_1(\sigma-\theta)^{-j-1}
$$

が選んだ整数列 $j\to\infty$ に沿って $t$ に一様に成立します。

ここで $\operatorname{Re}\rho>\theta$ の零点があると仮定します。$F$ の極は上で計算した単純極であり、実軸上の極は $0<\rho<1$ にあって留数が正です。これは法1の極補正、非主文字の1での非零性、$\operatorname{Re}s>1$ のEuler積の非零性によります。$R$ を $\sigma-\theta$ と $\sigma$ から最も近い右半平面の極までの距離の小さい方とします。後者がなければ無限大とします。$R>0$ です。半径 $R$ の円板は右半平面内にあります。

$R=\sigma-\theta$ なら仮定した極 $\rho$ の水平距離 $\sigma-\operatorname{Re}\rho$ は $R$ より小さいです。

$R<\sigma-\theta$ で最も近い極が非実なら、その極への水平距離は斜めの距離 $R$ より小さいです。いずれの場合も中心を $z=\sigma+it$ へ垂直に動かすと距離 $R$ 未満の極を持つようにできます。

近い極の個数は局所有限なので、$t$ を微小に変え、最も近い極 $\rho_0$ をただ一つにできます。実際、二つの異なる極への距離が等しくなる $t$ は、虚部が異なれば高々一つ、虚部が等しければ実部が異なるため存在しません（全ての極は線 $\operatorname{Re}s=\sigma$ より左にあります）。

$d=|z-\rho_0|<R$ とし、$d<h<R$ で半径 $h$ の円板が他の極を含まないように取ります。留数を $b_0\ne0$ とし、$F(s)-b_0/(s-\rho_0)$ に [Cauchyの評価](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-estimate)を用いると

$$
A_j(z)=\frac{b_0}{(z-\rho_0)^{j+1}}+O(h^{-j}).
$$

実中心 $\sigma$ では半径 $h<R$ の円板に極がないので $A_j(\sigma)=O(h^{-j})$ です。従って左辺は $|b_0|d^{-j-1}-O(h^{-j})$ 以上で、上界 $C_1(\sigma-\theta)^{-j-1}$ と矛盾します。なぜなら $d<h$ かつ $d<\sigma-\theta$ なので、$d^{j+1}$ を掛けたとき誤差も上界も0に収束するからです。

残るのは $R<\sigma-\theta$ で最も近い極が実数だけの場合です。実極は全て $\sigma$ より左にあるので距離 $R$ の実極 $\beta$ はただ一つです。留数 $b>0$ を引いた後、$R<h<\sigma-\theta$ を他の極が入らないように選びます。上と同じ評価で

$$
A_j(\sigma)=b R^{-j-1}+O(h^{-j}).
$$

これは十分大きい $j$ で正です。$t=0$ とした上界の左辺は $2A_j(\sigma)$ となり、$R<\sigma-\theta$ と矛盾します。以上で全ての場合が排除されました。
<!-- proof-end -->

例えば $g(u)=-e^{3u/4}$ は任意の区間で $g(u)\le e^{u/2}$ ですが、変換 $-1/(s-3/4)$ は $3/4$ に極を持ちます。実極で留数が正という条件がない一般の関数にはこの定理は使えません。

## 4. 表の評価からζの片側上界を導く

### 4.1 補助文字と剰余類

奇素数 $D$ に対して [Legendre記号](../../NT/NT3/index.md#def-nt3-legendre-symbol)で与えられる二次文字 $\chi_D$ は $D$ の倍数で0、非零平方剰余で1、それ以外で $-1$ です。二次文字は非零平方全体が単元群の指数2の部分群であることから乗法的です。相異なる奇素数 $q,d$ の文字の積 $\eta=\chi_q\chi_d$ は法 $qd$ の原始文字です。中国剰余定理により、どちらかの素数を導手から除くとその素数側の非自明な文字値を再現できないからです。

R Part II §3 に合わせ、次の有限和と中心化した量を使います。

$$
S_{q,d}(x)=\sum_{n\le x}\Lambda(n)(1+\chi_q(n))(1-\chi_d(n))(x/n-1),
$$

$$
R_{q,d}(x)=S_{q,d}(x)-x\log x+
(1+\gamma+c_{\chi_q}-c_{\chi_d}-c_\eta)x.
$$

積を展開し[中心化平滑和](#def-afr23-centered-sum)を代入すると

$$
R_{q,d}=G+G_{\chi_q}-G_{\chi_d}-G_\eta.
$$

この和でζの係数が正となることが重要です。ただし補助文字の係数には負もあるので、ここで直接[区間上の片側上界による零点検出](#thm-afr23-interval)を使うのではなく、補助文字を別の評価で取り除きます。

### 4.2 二種類の打切り上限と(M)

以下は R Part II §3–4 の設定です。小さい $0<\varepsilon<1/52$ を固定し、同一の区間 $Y\le x\le Y^{3/2}$ に対し、次の条件を満たす素数を選びます。

$$
q\equiv3\pmod8,\qquad d\equiv7\pmod{16},\qquad q\mid d+1.
$$

補助パラメータ $m,k,n$ は正整数で、$n$ は2の冪、$x^{2+8\varepsilon}\le n\le2x^{2+8\varepsilon}$ とします。$N=4n$ とし、

$$
H=(\mathbb Z/N\mathbb Z)^\times/\{\pm1\}
$$

は奇数剰余類を符号で同一視した群です。$N=4n$ は4以上の2の冪であり、単元は奇数の $2n$ 個です。$1$ と $-1$ は異なるので各符号同一視の類には2元あり、$|H|=n$ です。奇素数冪 $r=p^h$（$p\ne q$）を次の行と列に分類します。

$$
v(r)=\frac{1+\chi_q(r)}2\in\{0,1\},\qquad t[r]\in H.
$$

$t\in H$ は列を移すための元、$[r]$ は符号を同一視した剰余類です。

各素数冪の係数は $c(r)=(1-\chi_d(r))\log p$ です。$p=d$ でも $\chi_d(d^h)=0$ なので係数は $\log d$。他方 $p=2,q$ では $\chi_d(p)=1$ となり、係数が0なので除外できます。

ここで [2の補充法則](../../NT/NT3/index.md#thm-nt3-supplement-two)より $\chi_d(2)=(-1)^{(d^2-1)/8}=1$ です。また $q,d$ はともに4を法として3と合同なので、[二次相互法則](../../NT/NT3/index.md#thm-nt3-quadratic-reciprocity)と [−1の補充法則](../../NT/NT3/index.md#thm-nt3-supplement-minus-one)より

$$
\chi_d(q)=-\chi_q(d)=-\chi_q(-1)=1.
$$

$d\equiv-1\pmod q$ を二つ目の等号で使いました。乗法性により素数冪でも文字値は1です。

$b=\exp(x^\varepsilon)$ とし、空でない $T,T_2\subset H$ を取ります。$\delta=|T_2|/n$、$a_t$ は正整数で $|a_t/b-x|\le1$。

$u\in H,t\in T,1\le j\le m$ に対し正の重み $w_{u,j}(v,s)$ を2行 $n$ 列の各セルに与えます。行1かつ列 $s\in uT_2$ のセルを特別に選び、その重みを

$$
b\le w_{u,j}(1,s)\le b+O(b/(nx^2))
$$

とします。他のセルの打切り上限 $a_t/w_{u,j}(v,s)$ は $\exp(x^{\varepsilon/3})/3$ 以上とします。

各表で測る量と引くべき主項は

$$
P_{u,t,j}=\sum_{\substack{r=p^h\\p\ {\rm odd},\,p\ne q}}
c(r)(a_t/r-w_{u,j}(v(r),t[r]))_+,
$$

$$
M_{u,t,j}=a_t\left(\log a_t-1-\gamma+c_{\chi_d}
-\frac1{2n}\sum_{v,s}\log w_{u,j}(v,s)\right).
$$

重み $w$ の一項は $w(a_t/(rw)-1)_+$ です。重みを小さくすると打切り上限が遠くへ移ります。例えば $a_t=24,r=3,w=2$ では $(8-2)_+=6=2(4-1)$。$w=10$ に変えると同じ素数冪の寄与は0です。両方とも正の重みですが測っている範囲が違います。

<a id="input-afr23-main-inequality"></a>

**外部入力(M)**（R Part II §4.3）。選ばれた区間で、上のデータを $\delta\ge x^{-\varepsilon}$、$|T|/n\ge x^{-\varepsilon/8}/2$ となるよう構成できる。$B=|T|mb\delta/2$ とすると、非負の誤差 $\mathcal E$ について

$$
\frac1n\sum_{u\in H}\sum_{t\in T}\sum_{j=1}^m(P_{u,t,j}-M_{u,t,j})\le\mathcal E,
$$

$$
\frac{\mathcal E}{B}\le x^{C\varepsilon}
\left(\frac xm+\frac{xm}{k}+m+\frac{k}{n^2}\right)
$$

が $x\ge x_0(\varepsilon)$ で成り立つ。$C$ は絶対定数で、$m=x^{1/2+O(\varepsilon)},\ k=x^{9/2+O(\varepsilon)},\ n=x^{2+O(\varepsilon)}$ となる選択を用いる。ここで指数の $O(\varepsilon)$ は絶対定数倍で抑えられるという意味です。

この不等式は R がLeanの結果を引用する箇所です。表の実在と誤差評価を任意の重みで成立する一般不等式とみなしてはいけません。$P$ は非負の整除性から生じる量、$M$ は大きさの主項です。なぜこの形になるかは次講で扱います。

### 4.3 表を一つの素数冪和へ戻す

固定した $t$ の各セル $i=(v,s)$ に分類された素数冪について

$$
S_i(y)=\sum_{r\in i}c(r)(y/r-1)_+,\qquad
\Psi_i(z)=\sum_{r\in i,\ r\le z}c(r)
$$

とします。$y\ge1$ を固定すると積分区間内の素数冪は有限個です。$r\le y$ の項について

$$
\int_r^y z^{-2}dz=\frac1r-\frac1y.
$$

これを $c(r)$ 倍して足すと $S_i(y)/y=\int_1^y\Psi_i(z)z^{-2}dz$ を得ます。固定法の算術級数の素数定理（R §5.1が引用）では各セルの主項は $\mu z$、$\mu=1/(2n)$ です。理由は、$p\nmid2qd$ で二つの二次文字の符号条件と符号付き剰余類条件が独立なので密度 $1/(4n)$、係数は $2\log p$ だからです。固定法での誤差 $O_A(z/(\log z)^A)$（任意の $A>1$、定数は法にも依存）を用いると

$$
C_i=\int_1^\infty(\Psi_i(z)-\mu z)z^{-2}dz
$$

は収束し、$R_i(y)=-y\int_y^\infty(\Psi_i(z)-\mu z)z^{-2}dz$ として

$$
S_i(y)=\mu y\log y+C_i y+R_i(y),\qquad R_i(y)=o(y).
$$

全セルを足すと $S_1(y)-S_{\chi_d}(y)$ です。従ってこの差は $y\log y+C_*y+o(y)$、ただし $C_*=\sum_i C_i$ です。この係数を積分変換で確定します。実数 $a=s-1>0$ に対し

$$
a\int_1^\infty (S_1(y)-S_{\chi_d}(y)-y\log y)y^{-s-1}dy\longrightarrow C_*\quad(a\downarrow0).
$$

実際、線形項は

$$
a\int_1^\infty C_*y^{-1-a}dy=C_*
$$

です。余りを $yE(y)$ と置くと $E(y)\to0$ なので、任意の $\epsilon'>0$ に対し十分大きい $Y'$ 以降の積分の絶対値は

$$
a\epsilon'\int_{Y'}^\infty y^{-1-a}dy\le\epsilon'
$$

です。有限区間の積分は $a\downarrow0$ で0になります。

一方、[平滑化和のMellin変換](#thm-afr23-mellin)と[中心化変換の極と留数](#thm-afr23-centered-transform)の展開より、同じ極限は $-1-\gamma+c_{\chi_d}$ です。

従って $C_*=-1-\gamma+c_{\chi_d}$（R §5.1）。この線形係数まで一致させる必要があります。ここで $P_{u,t,j}=\sum_i w_i S_i(a_t/w_i)$ に展開を代入すれば

$$
\begin{aligned}
\sum_i w_i(\mu(a_t/w_i)\log(a_t/w_i)+C_i a_t/w_i)
&=a_t\log a_t-\mu a_t\sum_i\log w_i+a_t\sum_i C_i\\
&=M_{u,t,j}.
\end{aligned}
$$

従って $P_{u,t,j}-M_{u,t,j}=\sum_i w_iR_i(a_t/w_i)$ です。$y=a_t/w_i$ はここで全て1以上です。

次に特別なセルの重みをいったん $b$ とします。ある列 $s\in H$ を $uT_2$ が含む条件は $u=sz^{-1}$ を満たす $z\in T_2$ が存在することなので、$u$ の選択肢はちょうど $|T_2|$ 個。行1のセルの平均はそのセルに $\delta$ を掛けることと同じです。行の指示関数は $(1+\chi_q(r))/2$ なので、$y=a_t/b$ で

$$
\frac1n\sum_u\sum_{i:\ v=1,\ s\in uT_2}b S_i(y)
=\frac{\delta b}{2}S_{q,d}(y).
$$

この式は除外した素数冪の係数が0であることも使っています。$p=d$ は除外していません。右辺の $S_{q,d}$ の主項も確認します。固定した法について先ほどのセル展開を行1の全列に足せば、$S_{q,d}(y)=y\log y+C_{q,d}y+o(y)$ という展開が得られます（行1は $n$ セル、係数は $2n\mu=1$）。[中心化変換の極と留数](#thm-afr23-centered-transform)の $F_\chi$ の式と、前述の $a\downarrow0$ の極限を使えば

$$
C_{q,d}=-1-\gamma-c_{\chi_q}+c_{\chi_d}+c_\eta.
$$

実際、$S_{q,d}=S_1+S_{\chi_q}-S_{\chi_d}-S_\eta$ のMellin変換では、二重極を除いた $a^{-1}$ の係数がこの値です。従って $R_{q,d}$ はちょうどこの展開の余りです。$y\log y$ と $y$ の係数は $o(y)$ の余りを持つ展開から一意に決まるので、両辺から主項を引いた後にも

$$
\frac1n\sum_u\sum_{i:\ v=1,\ s\in uT_2}b R_i(y)
=\frac{\delta b}{2}R_{q,d}(y)
$$

が成立します。

具体的に $H$ が位数4の巡回群で $T_2=\{1\}$ なら、ある列は四つの平行移動のうち一つで選ばれます。$\delta=1/4$ です。行1の指示関数を文字で書いた係数 $1/2$ と合わせて $b/8$ になります。

### 4.4 補助評価(B),(C)と誤差の制御

固定法の $o(y)$ は法が $x$ とともに変わる今回の議論では不十分です。そこで次の二つを R から引用します。大きい $Y$ ごとに同じ $q,d$ が区間全体で使えることが鍵です。

- **評価(B)**（R Part II §3、Part III §III.1）：$\chi=\chi_q,\chi_d,\eta$ の三つについて $|G_\chi(x)|\le x^{1/2+\varepsilon}$ が $Y\le x\le Y^{3/2}$ の全域で成り立つように補助素数を選べる。
- **評価(C)**（R 式(5.6)、Part III §III.2）：同じ補助素数と上の法のセル展開に現れる各原始文字 $\xi$（自明な場合はζ）に対し、$y\ge\exp(x^{\varepsilon/3})/3$ なら、絶対的な $\kappa>0$ で $|G_\xi(y)|\le y\exp(-\kappa x^{\varepsilon/8})$。下限 $x_0$ は $\varepsilon,\kappa$ に依存する。

(B)は平均二乗評価などを用いた補助素数の選択であり、固定した任意の文字のGRHを仮定してはいません。(C)は大きい打切り上限で使う一様評価です。R Part IIIでは文献の零点密度評価・素数定理等からこれらを導いています。本講はそれらの外部定理の証明を再構成せず、(B),(C)から先を確認します。

各セルの係数は二つの符号条件と有限群の文字による列の指示関数の積です。[Dirichlet文字の直交関係](../../ANT/ANT3/index.md#thm-ant3-orthogonality)を法 $N$ の単元群に適用します。$\widehat H$ を $H$ の複素文字全体とします。その元は、法 $N$ の文字のうち $\xi(-1)=1$ を満たすものに対応します。法 $N$ の単元 $a_0,b_0$ を固定します。$\mathbf 1$ は条件が成立すると1、それ以外で0となる指示関数です。全文字の直交和に $(1+\xi(-1))/2$ を掛けて足すと、符号同一視後の列の指示関数が得られます。すなわち

$$
\begin{aligned}
\frac1n\sum_{\xi\in\widehat H}\overline{\xi([b_0])}\xi([a_0])
&=\mathbf 1_{\{a_0\equiv b_0\pmod N\}}
+\mathbf 1_{\{a_0\equiv-b_0\pmod N\}}\\
&=\mathbf 1_{\{[a_0]=[b_0]\}}.
\end{aligned}
$$

二つの合同条件は同時には成立しません。単元 $b_0$ に対し $2b_0$ は $N$ の倍数でないためです。行の係数 $1/2$ と $1-\chi_d$ を展開します。$\xi\in\widehat H$ として、$p\nmid2qd$ では、$r=p^h$ に掛ける $\log p$ 以外の重みは

$$
\frac1{2n}\sum_{e,l\in\{0,1\}}\sum_{\xi\in\widehat H}
(2v-1)^e(-1)^l\overline{\xi(s)}\xi(t)
\chi_q(r)^e\chi_d(r)^l\xi([r]).
$$

これは行の指示関数、列の指示関数、重みの次の三因子の積です。

$$
\frac{1+(2v-1)\chi_q(r)}2,\quad
\frac1n\sum_\xi\overline{\xi(s)}\xi(t[r]),\quad
1-\chi_d(r).
$$

合計 $4n$ 項で各係数の絶対値は $1/(2n)$ です。各積は法 $Nqd$ の単元上の文字であり、これを誘導する原始文字で置き換えます。因子の法は互いに素なので、導手は各因子の導手の積です。原始文字の値を使うと、法を割る素数でも自明因子まで誤って0にすることがありません。

例えば $p=d$ では $1-\chi_d(p^h)=1$ であり、$\chi_d$ を因子に持つ項だけが0になります。$p=2,q$ では $\chi_d(p)=1$ なので相殺されます。詳細は R §5.2 の式(II.21)です。

この展開の各原始文字を $\chi_\alpha$、対応する複素係数を $b_\alpha$ と書きます。固定した法では各非主文字の平滑和は $-c_{\chi_\alpha}y+o(y)$、法1の平滑和は $y\log y-(1+\gamma)y+o(y)$ です。これは先ほどと同じ固定法の素数定理による積分表示と、[中心化変換の極と留数](#thm-afr23-centered-transform)による線形係数の確定から従います。従って $S_i=\sum_\alpha b_\alpha S_{\chi_\alpha}$ の主項と線形項を引けば、余りの一意性から

$$
R_i(y)=\sum_\alpha b_\alpha G_{\chi_\alpha}(y)
$$

です。係数の絶対値和が2であることから、特別でないセルで

$$
|w_iR_i(a_t/w_i)|\le2a_t e^{-\kappa x^{\varepsilon/8}}.
$$

$\upsilon=e^{-\kappa x^{\varepsilon/8}}$ と置くと、表は $n|T|m$ 個、各表のセルは高々 $2n$ 個です。$a_t\le b(x+1)$ を代入して全体を $nB$ で割った誤差は

$$
\frac{n|T|m\cdot2n\cdot2b(x+1)\upsilon}{nB}
=\frac{8n(x+1)\upsilon}{\delta}=o(1).
$$

$n$ と $\delta^{-1}$ は $x$ の冪程度であり、$\upsilon$ はどの負の冪よりも速く0になります。

特別なセルでは $w_i=b+\Delta_i$、$0\le\Delta_i=O(b/(nx^2))$ です。$(a_t/r-w)_+$ は $w$ に関してLipschitz定数1なので、重みの変更で有限和が変わる量は

$$
\Delta_i\sum_{r\le a_t/b}c(r)=O(x\Delta_i)
$$

以下です。ここでは[Chebyshevのψ関数の素数定理](../../ANT/ANT6/index.md#thm-ant6-psi-asymptotic)から $\sum_{r\le z}c(r)\le2\psi(z)=O(z)$ を使いました。

主項の変更の絶対値は $\mu a_t\log(1+\Delta_i/b)\le\mu a_t\Delta_i/b=O(x\Delta_i)$ で、$a_tC_i$ は変わりません。各表に $\delta n$ 個の特別なセルがあり、各変更は $O(b/(nx))$ なので、全表について $u$ の平均を取った誤差は

$$
|T|m\cdot\delta n\cdot O(b/(nx))
=O(|T|m\delta b/x)=O(B/x).
$$

従って $B$ で割ると $O(1/x)$ です。

最後に $|a_t/b-x|\le1$ です。$S_{q,d}$ の変化は $4\sum_{n\le x+1}\Lambda(n)/n=O(1+\log x)$ 以下です。ここで $\psi(z)=\sum_{n\le z}\Lambda(n)$ は [Chebyshevのψ関数](../../NT/NT8/index.md#def-nt8-chebyshev-psi) です。$\psi(z)=O(z)$ を用い、有限和の各項を積分することで

$$
\sum_{n\le z}\frac{\Lambda(n)}n
=\frac{\psi(z)}z+\int_1^z\psi(v)v^{-2}dv
=O(1+\log z)
$$

を得ます。主項の $y\log y$ の変化も $O(1+\log x)$。また R Part III Theorem III.1.1(d) は選択された文字の $|c_\chi|\le4\log x$ を与えます。従って $R_{q,d}(a_t/b)=R_{q,d}(x)+O(1+\log x)$ です。

以上を合わせると、R 式(5.7) に対応する

$$
\frac1n\sum_{u,t,j}(P_{u,t,j}-M_{u,t,j})
=B R_{q,d}(x)+O_\varepsilon(B(1+\log x))
$$

が得られます。[外部入力(M)](#input-afr23-main-inequality) の上界を代入し $B>0$ で割ると

$$
R_{q,d}(x)\le x^{C\varepsilon}
\left(\frac xm+\frac{xm}{k}+m+\frac{k}{n^2}\right)
+O_\varepsilon(1+\log x).
$$

これが評価(A)の内容です。絶対値の評価ではありません。

## 5. 平方根の指数と量化順

$m=x^{1/2+O(\varepsilon)}, k=x^{9/2+O(\varepsilon)}, n=x^{2+O(\varepsilon)}$ を代入します。各項の指数は順に

$$
\frac12+O(\varepsilon),\quad -3+O(\varepsilon),
\quad\frac12+O(\varepsilon),\quad\frac12+O(\varepsilon).
$$

例えば $xm/k$ の指数は $1+1/2-9/2=-3$ です。$x/m+m\ge2\sqrt{x}$ は $(m-\sqrt{x})^2/m\ge0$ と同じです。反復回数を増やすと一回だけ生じる誤差は小さくなる一方、各回で累積する誤差は増えるため、平方根で釣り合います。

<a id="thm-afr23-reduction"></a>

<!-- formal-statement-start -->
> **定理（主不等式からRHへの条件付き還元）**
>
> 各 $0<\varepsilon<1/52$ について任意に大きい $Y$ が取れ、区間 $[Y,Y^{3/2}]$ 全域で前節の同じ補助素数 $q,d$ に対する(M),(B),(C)とその付帯条件が成立すると仮定する。特に

$$
|c_\chi|\le4\log x\qquad(\chi=\chi_q,\chi_d,\eta)
$$

> が成り立つとする。このときζの全ての非自明零点の実部は $1/2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

(M) と (C) で表の誤差を評価(A)に変換し、(B)で三つの補助文字を消す。次に指数を固定した $\theta>1/2$ より小さくして、区間上の零点検出を使います。

<!-- proof-start -->
### 証明

第4節の導出と指数の計算により、ある絶対定数 $C_2>0$、$\varepsilon$ に依存する $C_\varepsilon$ について区間全域で

$$
R_{q,d}(x)\le C_\varepsilon x^{1/2+C_2\varepsilon}.
$$

恒等式から $G=R_{q,d}-G_{\chi_q}+G_{\chi_d}+G_\eta$ です。(B)で三つの絶対値をそれぞれ評価して

$$
G(x)\le C_\varepsilon x^{1/2+C_2\varepsilon}
+3x^{1/2+\varepsilon}.
$$

$1/2<\theta<1$ を先に固定し、$1/2+\max(C_2,1)\varepsilon<\theta$ となるよう $\varepsilon$ を選びます。十分大きい $Y$ では定数倍を $x^{\theta-(1/2+\max(C_2,1)\varepsilon)}$ に吸収できるので $G(x)\le x^\theta$ が区間全体で成立します。[区間上の片側上界による零点検出](#thm-afr23-interval)を $\mathcal X=\{1\},a_1=1$ に適用して $\operatorname{Re}s>\theta$ の零点を排除します。

任意の $\operatorname{Re}\rho>1/2$ に対し $1/2<\theta<\min(1,\operatorname{Re}\rho)$ を取れば矛盾します。[非自明零点の位置と対称性](../../ANT/ANT7/index.md#thm-ant7-zero-symmetry)によって実部が $1/2$ 未満の非自明零点も排除され、結論を得ます。
<!-- proof-end -->

量化順は $\forall\theta>1/2$ に対し $\varepsilon$ を選び、任意に遠い区間で上界を得る、です。一つの有限区間で何桁も検算することや、各 $x$ ごとに別の文字を選んで得る評価だけではこの入力を確立できません。

## 6. Dirichlet GRHに向けた正係数の組合せ

この節では $\psi$ をChebyshev関数ではなく固定した原始Dirichlet文字の記号に使います。原始文字 $\psi$ の位数 $o$ とは、単元群上で $\psi^o=1$ となる最小の正整数です。$1\le j<o$ で $\psi^j$ を誘導する原始文字を $\psi_j$ と書きます。R §I.10 はζの $G$ を

$$
G^\psi(x)=G(x)+\frac1{3o+1}\sum_{j=1}^{o-1}\operatorname{Re}G_{\psi_j}(x)
$$

に置き換えると説明しています。$o=1$ なら空和で $G^\psi=G$ です。

法と互いに素な $n$ では $\psi_j(n)=\psi(n)^j$。$\psi(n)=1$ なら和は $o-1$、そうでなければ $1+\sum_{j=1}^{o-1}\psi(n)^j=0$ という等比和から実部の和は $-1$ です。従って平滑化の前の係数はそれぞれ $4o/(3o+1)$ と $3o/(3o+1)$ になります。法と互いに素でない場合も各 $|\psi_j(n)|\le1$ なので、係数は $1-(o-1)/(3o+1)$ 以上であり、この下界は正です（誘導先で0だから原始文字も0とは限らない）。この算術側の正値性と、第3節の留数の非相殺は区別します。

例えば位数4の文字で $\psi(n)=i$ なら $i-1-i=-1$、係数は $12/13$ です。$\psi(n)=1$ なら $16/13$ です。

<a id="cor-afr23-grh-criterion"></a>

<!-- formal-statement-start -->
> **系（固定文字に対するGRHの区間判定）**
>
> 原始Dirichlet文字 $\psi$ を固定する。任意の $\varepsilon>0$ に対し任意に大きい $Y$ が取れ、

$$
G^\psi(x)\le x^{1/2+\varepsilon}\qquad(Y\le x\le Y^{3/2})
$$

> が成立するなら、$L(s,\psi)$ の臨界帯の零点は全て実部 $1/2$ にある。
<!-- formal-statement-end -->

### 証明の見取り図

正の係数の和から一つの文字の零点を見失うことはないので、第3節の定理を使えます。さらに原始文字の関数等式で左側も排除します。

<!-- proof-start -->
### 証明

$o>1$ なら $\psi_1=\psi$ です。重複する文字があれば重みを加算し、法1の重み1と他の正の重み $1/(3o+1)$ で[区間上の片側上界による零点検出](#thm-afr23-interval)を適用します。$0<\varepsilon<1/2$ として $\theta=1/2+\varepsilon$ を任意に1/2へ近づけると $L(s,\psi)$ と $L(s,\bar\psi)$ の実部 $1/2$ より右の零点が排除されます。$o=1$ の場合はζと同じ議論です。

原始文字の関数等式は [ANT8の一般L関数の節](../../ANT/ANT8/index.md#def-ant8-grh) に掲げたものを標準定理として使います（証明は例えば [DLMF §25.15](https://dlmf.nist.gov/25.15)）。$\psi(-1)=(-1)^a$、導手 $f$ とすると完成関数は

$$
(f/\pi)^{(s+a)/2}\Gamma((s+a)/2)L(s,\psi)
$$

であり、$1-s$ と共役文字の完成関数に非零定数を掛けたものに等しいです。臨界帯内ではGamma因子は正則で非零です。もし $\rho$ が左側の零点なら $1-\rho$ は共役文字の右側の零点となり矛盾します。
<!-- proof-end -->

固定文字を含む大きい群での表の構成、重みの選択、対応する(B),(C)の拡張は R §I.10 が説明する形式的証明の入力です。ζ版の(M)だけから任意の文字の上界が出るわけではありません。固定文字を一つ選ぶたびに拡張された評価を確立して上の系を使う必要があります。

## 7. 何を証明し、何を借りたか

| 論証 | 出典・範囲 |
| --- | --- |
| 平滑化和の変換、極補正、非相殺、区間での零点排除 | 本講で導出。R Part II §1、Z §2に対応 |
| (M)の表の存在、整除性と大きさの上界 | R Part II §4.3がLeanから引用。R Part III §§4–9は構成の一部を説明するが(M)全体は証明していない |
| (B)と(C) | R Part III §§1–2の文献に基づく証明を引用 |
| (M),(B),(C)から(A)、RHへの解析的帰結 | 本講第4–5節。R Part II §§3–5 |
| 固定文字の正係数の和から零点の排除 | 本講第6節。R §I.10。拡張された表・補助評価そのものは引用の範囲 |
| 形式的なRH・Dirichlet GRHの検証 | [Lean/Mathlib共同声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) と [Sutherlandの検証記録](https://math.mit.edu/~drew/grh/)。一般の保型L関数についての予想とは区別する |

次講では(M)を支えるtheta持ち上げ、整除性、ノルム、射影、Galoisコホモロジーの依存関係を調べます。[有限群の相対跡展開](../AFR22/index.md#thm-afr22-relative-expansion)で行った平均の計算は、そのうち周期を扱う仕組みの小模型です。

## 8. 演習と詳細解答

<a id="ex-afr23-a1"></a>

### A1. 素数冪の重み

法4の原始文字 $\chi_4$ について $S_{\chi_4}(10)$ を計算せよ。

- Level: A
- ID: AFR23-A1

<!-- solution-start -->
**詳細解答**

$10$ 以下の素数冪は $2,3,4,5,7,8,9$ です。偶数の係数は0、奇数3,5,7,9の文字値は順に $-1,1,-1,1$。従って[文字付き平滑化素数冪和](#def-afr23-smoothed-sum)より

$$
S_{\chi_4}(10)=-\tfrac73\log3+\log5-\tfrac37\log7+\tfrac19\log3
=-\tfrac{20}{9}\log3+\log5-\tfrac37\log7.
$$

9は素数冪なので重みの対数は $\log9$ ではなく $\log3$ です。
<!-- solution-end -->

<a id="ex-afr23-a2"></a>

### A2. 重みの違い

$n\ge1$、$\operatorname{Re}s>1$ とする。重み $1-n/x$（$x\ge n$）のMellin変換を求め、本文の重みの変換と比べよ。

- Level: A
- ID: AFR23-A2

<!-- solution-start -->
**詳細解答**

$$
\begin{aligned}
\int_n^\infty (1-n/x)x^{-s-1}dx
&=\frac{n^{-s}}s-\frac{n\cdot n^{-s-1}}{s+1}\\
&=\frac{n^{-s}}{s(s+1)}.
\end{aligned}
$$

各積分は実部が正なので収束します。本文の $x/n-1$ の分母は $s(s-1)$。重みが $x/n$ 倍されると分母の位置が変わります。
<!-- solution-end -->

<a id="ex-afr23-a3"></a>

### A3. 零点での留数

$L(s)=(s-3/5)^2e^s$ とする。$-L'(s)/(s(s-1)L(s))$ の $s=3/5$ での留数を求めよ。

- Level: A
- ID: AFR23-A3

<!-- solution-start -->
**詳細解答**

$L'/L=2/(s-3/5)+1$ です。$s(s-1)$ は $s=3/5$ で $-6/25$。従って留数は $-2/(-6/25)=25/3$ です。実零点で正になる仕組みは[中心化変換の極と留数](#thm-afr23-centered-transform)と同じです。
<!-- solution-end -->

<a id="ex-afr23-a4"></a>

### A4. 位数3の文字

位数3の文字 $\psi$ について、単元 $n$ で $\psi(n)=1$ の場合と $\psi(n)\ne1$ の場合に、第6節の平滑化前の係数を求めよ。

- Level: A
- ID: AFR23-A4

<!-- solution-start -->
**詳細解答**

$o=3$ なので重みは $1/(3\cdot3+1)=1/10$。文字値1なら実部の和は2で係数は $1+2/10=6/5$。非自明な3乗根 $z$ では $1+z+z^2=0$ より $\operatorname{Re}(z+z^2)=-1$ なので $1-1/10=9/10$。どちらも正です。
<!-- solution-end -->

<a id="ex-afr23-b1"></a>

### B1. Laurent展開の補正

$\zeta(1+a)=a^{-1}+\gamma+d a+O(a^2)$ とする。$-\zeta'/(\zeta s(s-1))$ の $a^{-2},a^{-1},a^0$ の係数を求めよ。

- Level: B
- ID: AFR23-B1

<!-- solution-start -->
**詳細解答**

分母の逆数を作ると

$$
\zeta(1+a)^{-1}=a(1-\gamma a+(\gamma^2-d)a^2+O(a^3)).
$$

微分 $\zeta'(1+a)=-a^{-2}+d+O(a)$ を掛けると

$$
\zeta'/\zeta=-a^{-1}+\gamma+(2d-\gamma^2)a+O(a^2).
$$

$1/(s(s-1))=a^{-1}-1+a+O(a^2)$ を代入するので

$$
-\frac{\zeta'}{s(s-1)\zeta}
=a^{-2}-(1+\gamma)a^{-1}
+1+\gamma+\gamma^2-2d+O(a).
$$

従って二重極だけを除くのでは不十分です。両方の負べき項を除いた後の値は $1+\gamma+\gamma^2-2d$ です。
<!-- solution-end -->

<a id="ex-afr23-b2"></a>

### B2. 高階微分の集中と極

$g(u)=e^{\beta u}$、$0<\beta<1$ とする。第3節の記法で $F(s)=\int_0^\infty g(u)e^{-su}du$、$A_j(s)=(-1)^jF^{(j)}(s)/j!$ とする。実数 $\sigma>2$ で $A_j(\sigma)$ を積分と極の両方から求めよ。$\beta>\theta$ なら $(\sigma-\theta)^{j+1}A_j(\sigma)$ はどうなるか。

- Level: B
- ID: AFR23-B2

<!-- solution-start -->
**詳細解答**

変換は $F(s)=\int_0^\infty e^{-(s-\beta)u}du=1/(s-\beta)$。$j$ 階微分すると $(-1)^j j!/(s-\beta)^{j+1}$ なので $A_j(\sigma)=(\sigma-\beta)^{-j-1}$ です。積分でも $v=(\sigma-\beta)u$ と置けば

$$
\frac1{j!}\int_0^\infty u^je^{-(\sigma-\beta)u}du
=\frac{\int_0^\infty v^je^{-v}dv}{j!(\sigma-\beta)^{j+1}}
=(\sigma-\beta)^{-j-1}.
$$

$\beta>\theta$ なら比 $(\sigma-\theta)/(\sigma-\beta)>1$ なので、その $j+1$ 乗は無限大に発散します。留数が負の場合は実中心での符号が逆になり、片側上界でこの矛盾を作れないことに注意します。
<!-- solution-end -->

<a id="ex-afr23-b3"></a>

### B3. 平行移動でセルを選ぶ

加法群 $\mathbb Z/6\mathbb Z$ で $T_2=\{0,2\}$ とする。列4を含む平行移動 $u+T_2$ の $u$ を列挙せよ。行1のセルの値が順に $1,2,3,4,5,6$ で重み $b=3$ のとき、選ばれた値の和を $u$ について平均せよ。

- Level: B
- ID: AFR23-B3

<!-- solution-start -->
**詳細解答**

$4=u+0$ または $4=u+2$ なので $u=4,2$ です。各列が6回中2回選ばれ、各列の寄与の平均係数は $\delta=2/6=1/3$。重みも掛けると

$$
3\cdot\frac13(1+2+3+4+5+6)=21.
$$

直接にも各平行移動の2列の和は $4,6,8,10,6,8$（$u=0,\ldots,5$）で、合計42、重みを掛け6で割ると21です。行を選ぶ指示関数まで文字で表せば第4節の $\delta b/2$ が生じます。
<!-- solution-end -->

<a id="ex-afr23-b4"></a>

### B4. 共通零点の非相殺

二つの実原始文字の $L$ 関数が同じ $\rho\ne0,1$ にそれぞれ重複度3,2の零点を持つと仮定する。$2F_{\chi_1}+5F_{\chi_2}$ の留数を求め、重みが負も許される場合の相殺例を作れ。

- Level: B
- ID: AFR23-B4

<!-- solution-start -->
**詳細解答**

[中心化変換の極と留数](#thm-afr23-centered-transform)により、留数は

$$
\frac{2\cdot3+5\cdot2}{\rho(1-\rho)}
=\frac{16}{\rho(1-\rho)}.
$$

分母は非零なので消えません。重みを2,-3とすると分子は $2\cdot3-3\cdot2=0$。両方とも単純極しかないためこの点では極が消えてしまいます。
<!-- solution-end -->

<a id="ex-afr23-c1"></a>

### C1. 上界からRHまでを再構成する

$\varepsilon$ ごとに区間によらない定数 $K>0$ があり、区間全体で $R_{q,d}(x)\le K x^{1/2+4\varepsilon}$、三つの補助文字の中心化平滑和の絶対値が $x^{1/2+\varepsilon}$ 以下とする。各 $0<\varepsilon<1/52$ でこの条件を満たす $Y$ は任意に大きく取れるとする。$\theta=0.55$ に対して具体的な $\varepsilon$ を選び、ζの実部 $\theta$ より右の零点を排除せよ。さらに全ての $\theta>1/2$ に拡張するにはどうするか。

- Level: C
- ID: AFR23-C1

<!-- solution-start -->
**詳細解答**

第4節の恒等式を変形すると $G=R_{q,d}-G_{\chi_q}+G_{\chi_d}+G_\eta$ です。符号を考慮しながら各絶対値を評価して

$$
G(x)\le K x^{1/2+4\varepsilon}+3x^{1/2+\varepsilon}.
$$

$\varepsilon=1/100$ とすれば $0.01<1/52$、$1/2+4\varepsilon=0.54$ です。$x\ge1$ で右辺は $(K+3)x^{0.54}$ 以下。$Y\ge\max(1,(K+3)^{100})$ とすれば $x^{0.01}\ge K+3$ なので全域で $G(x)\le x^{0.55}$ です。[区間上の片側上界による零点検出](#thm-afr23-interval)により実部 $0.55$ より右に零点はありません。

一般の $1/2<\theta<1$ なら $0<\varepsilon<\min(1/52,(\theta-1/2)/4)$ を先に選び、$Y$ を定数倍を吸収できるほど大きくします。これを任意の $\theta$ に対して行うことで右半分を排除し、[非自明零点の位置と対称性](../../ANT/ANT7/index.md#thm-ant7-zero-symmetry)で左半分も排除できます。有限の一つの $Y$ でしか成立しないなら、$j\to\infty$ の列を選べないため第3節の矛盾は導けません。
<!-- solution-end -->
