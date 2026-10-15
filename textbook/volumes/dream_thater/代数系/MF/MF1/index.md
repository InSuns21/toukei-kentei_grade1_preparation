# MF1 上半平面・格子・モジュラー群

[複素格子](../../../解析系/CA/CA8/index.md#def-ca8-lattice)は二つの実線形独立な周期で作られ、[複素トーラス](../../../解析系/CA/CA8/index.md#thm-ca8-complex-torus)を定めます。ところが格子を記述する基底は一組とは限りません。たとえば $\mathbb Z+i\mathbb Z$ は $1,i$ でも $1,1+i$ でも張れます。**基底の取り替えだけで同じ幾何を何度も数えないには、何を同一視すべきでしょうか。**

本章では、向きをそろえて格子を複素数 $\tau$ 一つで記述し、整数行列が $\tau$ を分数式で動かす理由を導きます。そして変換の代表を選ぶ基本領域を構成します。後のモジュラー形式は「基底を取り替えたとき関数がどのように変わるか」を調べるため、まず**どの変換が本当に基底の取り替えなのか**を証明しておく必要があります。

使うのは [群作用の定義](../../GRP/GRP3/index.md#def-grp3-group-action)、[Euclid の互除法・Bézout 等式](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm)、[複素格子](../../../解析系/CA/CA8/index.md#def-ca8-lattice)です。複素解析の関数論的結果は後続章で利用します。

<!-- definition-example-audit: strict -->

## 1. 上半平面はなぜ格子のパラメータになるか

二つの複素数 $\omega_1,\omega_2$ が実線形独立である条件は $\operatorname{Im}(\overline{\omega_1}\omega_2)\ne0$ です。$\omega_1\ne0$ なので、$\omega_2/\omega_1$ の虚部の符号を見れば、基底の向きが分かります。基底の順序を必要なら入れ替え、虚部を正にします。

<a id="def-mf1-upper-half-plane"></a>
<!-- formal-statement-start -->
> **定義（上半平面）**  
> 複素数の虚部が正である領域を上半平面といい、
>
$$
\mathbb H=\{\tau=x+iy\in\mathbb C:y>0\}
$$
>
> と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf1-upper-half-plane -->
**定義の確認**。 $\tau=i$ では $\operatorname{Im}\tau=1>0$ です。一方 $\tau=-i$ は虚部が負なので $\mathbb H$ に入りません。境界の実軸も含めません。
<!-- definition-example-end -->

基底の向きを正にした後、第一の周期 $\omega_1$ で全体を割れば、基底は $(1,\tau)$ の形になります。$\tau$ は単なる座標ではなく、格子の二つの周期の比率です。

<a id="def-mf1-oriented-parameter"></a>
<!-- formal-statement-start -->
> **定義（正向き格子パラメータ）**  
> 複素格子 $\Lambda=\mathbb Z\omega_1+\mathbb Z\omega_2$ の基底 $(\omega_1,\omega_2)$ が
>
$$
\operatorname{Im}(\overline{\omega_1}\omega_2)>0
$$
>
> を満たすとき正向きと呼び、その格子パラメータを $\tau=\omega_2/\omega_1\in\mathbb H$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf1-oriented-parameter -->
**定義の確認**。 $\omega_1=1,\omega_2=i$ なら $\operatorname{Im}(\overline1 i)=1>0$ で、$\tau=i$ です。$\omega_1=i,\omega_2=1$ の順では $\operatorname{Im}(\overline i\,1)=-1$ となり正向きではありません。実線形独立性だけでなく向きまで調べる点が重要です。
<!-- definition-example-end -->

ここで $\mathbb Z+\tau\mathbb Z$ を $\Lambda_\tau$ と記します。同じ複素格子の異なる基底を正規化すると $\tau$ の値が変わり得ます。その変化を次で正確に求めます。

## 2. 整数行列と一次分数変換

格子の二つの基底が張る整数係数の集合が一致するには、基底の変換と逆変換の係数がともに整数でなければなりません。これは基底変換行列の行列式が $\pm1$ であることと同値です。正向き基底同士なら行列式は $+1$ に限られます。

<a id="def-mf1-modular-group"></a>
<!-- formal-statement-start -->
> **定義（整数モジュラー群と射影モジュラー群）**  
> 整数成分を持ち行列式が $1$ の $2\times2$ 行列全体
>
$$
SL_2(\mathbb Z)=
\left\{\begin{pmatrix}a&b\\c&d\end{pmatrix}:
a,b,c,d\in\mathbb Z,\ ad-bc=1\right\}
$$
>
> を整数モジュラー群という。中心部分群 $\{I,-I\}$ による商群を
>
$$
PSL_2(\mathbb Z)=SL_2(\mathbb Z)/\{I,-I\}
$$
>
> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf1-modular-group -->
**定義の確認**。 $S=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ と $T=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ は整数成分で行列式がそれぞれ $0-(-1)=1$ と $1-0=1$ です。逆行列も整数成分であり、$S,T\in SL_2(\mathbb Z)$ です。一方 $\begin{pmatrix}2&0\\0&1\end{pmatrix}$ の行列式は $2$ なので入りません。
<!-- definition-example-end -->

向きと周期比の関係を計算します。$\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z)$ に対応して

$$
\omega_1'=d\omega_1+c\omega_2,\qquad
\omega_2'=b\omega_1+a\omega_2
$$

と置きます。整数係数の逆行列も存在するので、両組が張る格子は同一です。さらに

$$
\frac{\omega_2'}{\omega_1'}
=\frac{b+a\tau}{d+c\tau}
=\frac{a\tau+b}{c\tau+d}
$$

です。分母が零でないことと、得られる比の虚部が正であることを次で確認します。

<a id="def-mf1-fractional-action"></a>
<!-- formal-statement-start -->
> **定義（一次分数変換）**  
> $\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z)$ と $\tau\in\mathbb H$ に対し、
>
$$
\gamma\cdot\tau=\frac{a\tau+b}{c\tau+d}
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf1-fractional-action -->
**定義の確認**。 $T\cdot i=i+1$、$S\cdot i=-1/i=i$ です。$T$ は周期 $1$ を他方の周期へ加える操作、$S$ は二周期の入れ替えと符号変更に対応します。どちらも $\mathbb H$ に値を持ちます。
<!-- definition-example-end -->

<a id="thm-mf1-imaginary-action"></a>
<!-- formal-statement-start -->
> **定理（上半平面への群作用と虚部公式）**  
> 任意の $\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z)$ と $\tau\in\mathbb H$ に対し、$c\tau+d\ne0$ で
>
$$
\operatorname{Im}(\gamma\cdot\tau)
=\frac{\operatorname{Im}\tau}{|c\tau+d|^2}>0.
$$
>
> またこの一次分数変換は $SL_2(\mathbb Z)$ の $\mathbb H$ への群作用であり、その作用の核は $\{I,-I\}$ である。したがって $PSL_2(\mathbb Z)$ は $\mathbb H$ に忠実に作用する。
<!-- formal-statement-end -->

### 証明の見取り図

分母が零なら $\tau$ が実数になってしまうことをまず排除します。虚部公式は分母の共役を掛けて分子の虚部を取り、行列式 $ad-bc=1$ を代入すれば出ます。合成が行列積に一致することを分数の通分で確かめ、最後に恒等変換となる係数を調べます。

<!-- proof-start -->
### 証明

$c=0$ なら $ad=1$ なので $d=\pm1$ で分母は非零です。$c\ne0$ で $c\tau+d=0$ なら $\tau=-d/c\in\mathbb R$ となり $\tau\in\mathbb H$ に反します。

$\tau=x+iy$、$y>0$ とすると、分子分母へ $c\overline\tau+d$ を掛けて

$$
\frac{a\tau+b}{c\tau+d}
=\frac{(a\tau+b)(c\overline\tau+d)}{|c\tau+d|^2}.
$$

分子を展開した際、$ac|\tau|^2+bd$ は実数です。残りの虚部は

$$
\operatorname{Im}(ad\tau+bc\overline\tau)
=(ad-bc)y=y
$$

です。よって公式が従い、作用は $\mathbb H$ を保ちます。

合成について $\eta=\begin{pmatrix}e&f\\g&h\end{pmatrix}$ と置けば

$$
\begin{aligned}
\gamma\cdot(\eta\cdot\tau)
&=\frac{a(e\tau+f)+b(g\tau+h)}
        {c(e\tau+f)+d(g\tau+h)}\\
&=\frac{(ae+bg)\tau+(af+bh)}
        {(ce+dg)\tau+(cf+dh)}
=(\gamma\eta)\cdot\tau.
\end{aligned}
$$

恒等行列は各 $\tau$ を固定するので [群作用の二条件](../../GRP/GRP3/index.md#def-grp3-group-action)が成立します。もし $\gamma\cdot\tau=\tau$ が**全て**の $\tau\in\mathbb H$ に成立するなら

$$
c\tau^2+(d-a)\tau-b=0
$$

です。左辺が開集合上で恒等的に零となる多項式なので $c=0,\ d=a,\ b=0$ です。$ad-bc=a^2=1$ より $\gamma=\pm I$。逆に $\pm I$ は恒等変換なので核はちょうど $\{\pm I\}$ です。
<!-- proof-end -->

この定理は「群の作用」の抽象論と、実際の格子の座標変換を結びます。行列が違っても $\gamma$ と $-\gamma$ は全く同じ変換なので、幾何上の変換群は $PSL_2(\mathbb Z)$ です。

## 3. 二つの行列だけで全ての変換を作れるか

格子基底を取り替える整数行列は無限個あります。しかし Euclid の互除法によって、二つの基本操作へ帰着できます。

<a id="thm-mf1-generators"></a>
<!-- formal-statement-start -->
> **定理（モジュラー群の生成元）**  
> $SL_2(\mathbb Z)$ は次の二行列で生成される。
>
$$
S=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad
T=\begin{pmatrix}1&1\\0&1\end{pmatrix}.
$$
>
> 対応する上半平面の変換は $S\cdot\tau=-1/\tau$ と $T\cdot\tau=\tau+1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の行列の第一列 $(a,c)^t$ は互いに素な整数の組です。二行の交換と整数倍の加減によって $(\pm1,0)^t$ に直せます。その行操作は $S,T$ から構成でき、残った上三角行列も $T$ と $S^2=-I$ で表せます。

<!-- proof-start -->
### 証明

$\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ の行列式が $1$ なので、$a,c$ をともに割る正整数は $ad-bc=1$ も割ります。したがって $\gcd(a,c)=1$ です。

行の基本操作を左からの積で表すと

$$
E_{12}(n)=\begin{pmatrix}1&n\\0&1\end{pmatrix}=T^n,
$$

$$
E_{21}(n)=\begin{pmatrix}1&0\\n&1\end{pmatrix}
=ST^{-n}S^{-1}
$$

です。後者は実際に三行列を掛けると右の形になります。これらは第一列の片方から他方の整数倍を引く操作を実行します。[整数の Euclid の互除法](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm)で、非零の成分を他方で割った余りへ変える操作を繰り返すと、非零の絶対値が真に減少し、有限回で $(\pm1,0)^t$ になります。必要な行の入れ替えは $S$ または $S^{-1}$ で行えます。$c=0$ の場合は初めから第一列は $(\pm1,0)^t$ です。

よって $S,T$ の積 $U$ が存在して $U\gamma=\begin{pmatrix}\varepsilon&k\\0&\varepsilon\end{pmatrix}$、$\varepsilon\in\{1,-1\}$ となります。ここで

$$
\begin{pmatrix}\varepsilon&k\\0&\varepsilon\end{pmatrix}
=\varepsilon I\,T^{\varepsilon k},\qquad
-I=S^2
$$

です。したがって $U\gamma$ も $S,T$ の積で書け、$U^{-1}$ も同じ生成元の逆元の積なので $\gamma$ も $S,T$ によって生成されます。
<!-- proof-end -->

行列を複数の操作へ分解できることが分かったので、基本領域を作る際にも「整数だけ平行移動」と「円の内外を反転」という二操作を中心に考えられます。

## 4. 格子の相似類と基本領域

同じ複素格子の正向き基底が異なる場合を調べました。格子全体を非零複素数で拡大縮小・回転させても、周期の比率は変わらないため、モジュラー群の軌道が自然な分類対象になります。ここでの「相似」は格子 $\Lambda'$ がある $\alpha\in\mathbb C^\times$ により $\Lambda'=\alpha\Lambda$ となる意味です。

<a id="thm-mf1-lattice-orbit"></a>
<!-- formal-statement-start -->
> **定理（格子の相似類とモジュラー群の軌道）**  
> $\tau,\tau'\in\mathbb H$ とする。正規化格子 $\Lambda_\tau=\mathbb Z+\tau\mathbb Z$ と $\Lambda_{\tau'}=\mathbb Z+\tau'\mathbb Z$ が非零複素数倍によって一致するための必要十分条件は、ある $\gamma\in SL_2(\mathbb Z)$ が存在して
>
$$
\tau'=\gamma\cdot\tau
$$
>
> となることである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とし $\tau'=(a\tau+b)/(c\tau+d)$ とする。$c\tau+d\ne0$ は[虚部公式](#thm-mf1-imaginary-action)から従います。

$$
(c\tau+d)\Lambda_{\tau'}
=\mathbb Z(c\tau+d)+\mathbb Z(a\tau+b).
$$

右辺の二つの生成元は $(1,\tau)$ の整数係数変換であり、行列式が $ad-bc=1$ なので逆変換も整数係数です。したがって右辺は $\Lambda_\tau$ に等しく、両格子は相似です。

逆に $\Lambda_{\tau'}=\alpha\Lambda_\tau$ とする。両格子で $(1,\tau')$ と $(\alpha,\alpha\tau)$ はいずれも正向き基底です。二つの正向き整数基底の変換行列は整数成分・行列式 $1$ なので、先に示した格子基底の式を使って、一方の周期比 $\tau'$ は他方の周期比 $\tau$ の $\gamma$ による一次分数変換となります。
<!-- proof-end -->

たとえば $\tau=i$ に $\gamma=\begin{pmatrix}1&0\\1&1\end{pmatrix}$ を作用させると

$$
\tau'=\frac{i}{1+i}=\frac{1+i}{2}.
$$

実際、$(1+i)\Lambda_{\tau'}=\mathbb Z(1+i)+\mathbb Zi=\mathbb Z+\mathbb Zi$ なので、二つの形の異なる平行四辺形は同じ相似類を表します。

相似な格子を何度も数えないためには、各軌道から代表点を一つ選びたいのです。ただし境界には複数の代表が現れるので、まず**内部で一意**な領域を指定します。

<a id="def-mf1-standard-domain"></a>
<!-- formal-statement-start -->
> **定義（標準基本領域）**  
> $SL_2(\mathbb Z)$ の $\mathbb H$ への作用に対して、次の閉じた相対領域（ただし $\mathbb H$ の内部）を標準基本領域と呼ぶ。
>
$$
\mathcal F
=\{\tau\in\mathbb H:|\operatorname{Re}\tau|\le\tfrac12,\ |\tau|\ge1\}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf1-standard-domain -->
**定義の確認**。 $2i$ は実部 $0$、絶対値 $2$ なので二条件を満たし、しかも不等号は厳密なので内部に入ります。$i$ は絶対値 $1$ で境界上です。$i/2$ は絶対値 $1/2$ なので入りません。$1/2+i$ は縦辺上です。二つの不等式を別々に検査する必要があります。
<!-- definition-example-end -->

<a id="thm-mf1-fundamental-domain"></a>
<!-- formal-statement-start -->
> **定理（基本領域の存在と内部での一意性）**  
> (i) 全ての $\tau\in\mathbb H$ の $SL_2(\mathbb Z)$ 軌道は $\mathcal F$ と交わる。  
> (ii) $\tau,\tau'\in\mathcal F^\circ$ かつ $\tau'=\gamma\cdot\tau$ なら $\tau'=\tau$ であり、$\gamma=\pm I$ である。ここで $\mathcal F^\circ=\{\tau:|\operatorname{Re}\tau|<1/2,\ |\tau|>1\}$ は $\mathbb H$ 内の内部を表す。
<!-- formal-statement-end -->

### 証明の見取り図

虚部公式によれば、軌道の点の虚部を大きくするには $|c\tau+d|$ を小さくすればよい。整数対 $(c,d)$ のうちこの量を最小にする組を取り、その組を行列の下段へ埋め込みます。虚部が最大の代表を左右に整数移動した点が単位円の内側にあると、$S$ で虚部をさらに増やせて矛盾します。内部の一意性は、単位円の外側で $|c\tau+d|>1$ となることを使います。

<!-- proof-start -->
### 証明

$\tau=x+iy$、$y>0$ を固定します。整数対 $(c,d)\ne(0,0)$ について

$$
|c\tau+d|^2=(cx+d)^2+c^2y^2
$$

です。この二次形式は正定値なので、任意の正の上界より小さい値を持つ整数対は有限個です。また $(c,d)=(0,1)$ で値 $1$ が得られます。したがって正の最小値を達成する整数対が存在します。

最小対 $(c,d)$ が $\gcd(c,d)=g>1$ を持てば、$(c/g,d/g)$ の値は元の値の $1/g^2$ となり最小性に矛盾します。よって $\gcd(c,d)=1$ です。[Bézout 等式](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm)により $ad-bc=1$ を満たす整数 $a,b$ を取れます。$\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とすれば

$$
\tau_0=\gamma\cdot\tau,\qquad
\operatorname{Im}\tau_0=\frac{y}{|c\tau+d|^2}
$$

は同じ軌道の**全ての点**の虚部の最大値です。なぜなら任意の行列の下段も非零整数対なので、先の最小値より小さくならないからです。

整数 $n$ を選んで $\tau_1=T^n\cdot\tau_0=\tau_0+n$ の実部を $[-1/2,1/2]$ に収めます。$\operatorname{Im}\tau_1=\operatorname{Im}\tau_0$ です。もし $|\tau_1|<1$ なら、[虚部公式](#thm-mf1-imaginary-action)を $S$ に適用して

$$
\operatorname{Im}(S\cdot\tau_1)
=\frac{\operatorname{Im}\tau_1}{|\tau_1|^2}
>\operatorname{Im}\tau_1
$$

となり最大性に反します。したがって $|\tau_1|\ge1$ で $\tau_1\in\mathcal F$、(i) が証明されます。

(ii) では $\tau=x+iy\in\mathcal F^\circ$ とし、$\gamma$ の下段を $(c,d)$ とします。$|x|<1/2$ かつ $|\tau|>1$ から $y>\sqrt3/2$ です。$c\ne0$ のとき常に $|c\tau+d|>1$ となることを場合分けします。

* $|c|\ge2$ なら $|c\tau+d|\ge|c|y> \sqrt3>1$。
* $|c|=1$、$d=0$ なら $|c\tau+d|=|\tau|>1$。
* $|c|=1$、$|d|=1$ なら $|c\tau+d|=|\tau\pm1|$ です。$(x\pm1)^2+y^2>(1/2)^2+3/4=1$。
* $|c|=1$、$|d|\ge2$ なら $|cx+d|\ge|d|-|x|>3/2>1$。

よって $c\ne0$ なら $\operatorname{Im}(\gamma\cdot\tau)<\operatorname{Im}\tau$ です。$\tau'=\gamma\cdot\tau$ も $\mathcal F^\circ$ と仮定すれば、逆行列にも同じ議論を適用できます。もし逆行列の下段が非零なら逆向きにも虚部が厳密に小さくなり矛盾するため、両方の下段は $0$ です。実際 $c\ne0$ なら $\gamma^{-1}=\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$ の下段も非零であり、直ちに矛盾します。したがって $c=0$。

$c=0$ かつ行列式 $1$ なら $a=d=\pm1$ で、$\gamma\cdot\tau=\tau+n$（$n\in\mathbb Z$）です。$\tau,\tau'$ の実部はともに $(-1/2,1/2)$ にあるので $n=0$。ゆえに $\tau'=\tau$、$b=0$、$\gamma=\pm I$ です。
<!-- proof-end -->

基本領域の**境界**はこの一意性の対象ではありません。$T$ は縦辺 $-1/2+iy$ と $1/2+iy$ を結び、$S$ は単位円弧上の点 $\tau$ と $-1/\tau$ を結びます。頂点付近では複数の境界表現が重なります。内部の一意性を境界まで誤って拡張しないでください。

## 5. 無限遠に近づく格子とカスプの入口

$\mathcal F$ は上へいくらでも伸びます。たとえば $\tau=iy$、$y\ge1$ は全て $\mathcal F$ にあり、$y\to\infty$ では平行四辺形が縦長になります。有限の高さではなく「無限遠の端」を一つ加えることが、後の q 展開へつながります。

この端は行列の変換で有理数の境界点にも移ります。その対応を記すため、$\mathbb Q\cup\{\infty\}$ を、実軸上の有理点に記号 $\infty$ を付けた集合とし、一次分数変換を分母が零なら $\infty$ となるよう拡張します。

<a id="def-mf1-rational-boundary"></a>
<!-- formal-statement-start -->
> **定義（拡張有理境界）**  
> $\mathbb P^1(\mathbb Q)=\mathbb Q\cup\{\infty\}$ と置き、$SL_2(\mathbb Z)$ の作用を、整数の既約分数 $p/q$（$q\ne0$）には一次分数変換として、$\infty$ には
>
$$
\gamma\cdot\infty=
\begin{cases}a/c,&c\ne0,\\ \infty,&c=0,\end{cases}
\qquad
\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}
$$
>
> と定める。分母が零となる有限点は $\infty$ に送る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf1-rational-boundary -->
**定義の確認**。 $T\cdot\infty=\infty$（$c=0$）、$S\cdot\infty=0$（$a=0,c=1$）です。逆に $S\cdot0=\infty$ です。実軸上の有理点と無限遠が同じ変換群で結び付いていることを具体的に確認できます。
<!-- definition-example-end -->

<a id="thm-mf1-one-cusp-orbit"></a>
<!-- formal-statement-start -->
> **定理（拡張有理境界は一つの軌道）**  
> $SL_2(\mathbb Z)$ の作用による $\mathbb P^1(\mathbb Q)$ の軌道はただ一つである。すなわち全ての有理数 $p/q$（既約、$q>0$）はある $\gamma\in SL_2(\mathbb Z)$ による $\gamma\cdot\infty$ として表せる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p,q$ が互いに素なので、[Bézout 等式](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm)により $ps-qr=1$ を満たす整数 $r,s$ が存在します。したがって

$$
\gamma=\begin{pmatrix}p&r\\q&s\end{pmatrix}
\in SL_2(\mathbb Z),\qquad
\gamma\cdot\infty=p/q.
$$

$\infty$ 自身は単位行列で到達します。従って $\mathbb P^1(\mathbb Q)$ の全点が $\infty$ の軌道に入ります。
<!-- proof-end -->

モジュラー群全体で同一視すると、この境界軌道が**一つのカスプ**になります。後続の MF4 で扱う一般の合同部分群では、同じ有理境界の集合が複数の軌道に分かれ得ます。ここでは「カスプは単に大きな虚部のこと」ではなく、境界点の軌道として理解しておきます。

## 6. 演習と詳細解答

### Level A：定義を手で判定する

#### A1. 上半平面と虚部公式

$\tau=1+2i$、$S=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ に対し $S\cdot\tau$ を計算し、[虚部公式](#thm-mf1-imaginary-action)と一致することを確かめよ。

- Level: A
- ID: MF1-A1

<!-- solution-start -->
**詳細解答**　$S\cdot\tau=-1/(1+2i)$ です。分母の共役 $1-2i$ を掛けると

$$
-\frac1{1+2i}=-\frac{1-2i}{1+4}=-\frac15+\frac25i.
$$

したがって虚部は $2/5>0$ です。一方 $S$ の下段は $(c,d)=(1,0)$ で、$\operatorname{Im}\tau=2$、$|c\tau+d|^2=|1+2i|^2=5$。公式の右辺も $2/5$ で一致します。
<!-- solution-end -->

#### A2. 同じ格子の二つの正向き基底

$\Lambda=\mathbb Z+\mathbb Zi$ の $(1,i)$ と $(1,1+i)$ がいずれも正向き基底であることを検査し、周期比の変換に使う行列を求めよ。

- Level: A
- ID: MF1-A2

<!-- solution-start -->
**詳細解答**　第一組は $\operatorname{Im}(\overline1\,i)=1>0$。第二組も $\operatorname{Im}(\overline1(1+i))=1>0$ です。$1+i=1+i$ なので第二組は $T=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ により $\omega_1'=1,\omega_2'=1+i$ と書けます。周期比は $i$ から $T\cdot i=i+1$ に変わりますが、張る格子は $\mathbb Z+\mathbb Z(1+i)=\mathbb Z+\mathbb Zi$ のままです。
<!-- solution-end -->

#### A3. 行列式と作用

$\gamma=\begin{pmatrix}1&0\\1&1\end{pmatrix}$ が $SL_2(\mathbb Z)$ に属することを確かめ、$\gamma\cdot i$ とその虚部を求めよ。

- Level: A
- ID: MF1-A3

<!-- solution-start -->
**詳細解答**　各成分は整数、行列式は $1\cdot1-0\cdot1=1$ です。したがって $\gamma\in SL_2(\mathbb Z)$。作用は

$$
\gamma\cdot i=\frac{i}{i+1}
=\frac{i(1-i)}{(1+i)(1-i)}
=\frac{1+i}{2}.
$$

虚部は $1/2$ です。[虚部公式](#thm-mf1-imaginary-action)からも $1/|i+1|^2=1/2$ と確認できます。
<!-- solution-end -->

#### A4. 基本領域の境界

$i,\ 2i,\ i/2,\ 1/2+i$ がそれぞれ $\mathcal F$ の内部・境界・外部のどこにあるか判定せよ。

- Level: A
- ID: MF1-A4

<!-- solution-start -->
**詳細解答**　$\mathcal F$ の条件は $|\operatorname{Re}\tau|\le1/2$ と $|\tau|\ge1$ です。$i$ は実部 $0$、絶対値 $1$ なので境界。$2i$ は実部 $0$、絶対値 $2>1$ なので内部。$i/2$ は絶対値 $1/2<1$ なので外部。$1/2+i$ は実部 $1/2$ で等号、絶対値は $\sqrt5/2>1$ なので境界です。
<!-- solution-end -->

### Level B：証明の仕組みを別の例で使う

#### B1. 点 $i$ を固定する行列

$\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z)$ で $\gamma\cdot i=i$ を満たすものを全て求めよ。作用の核 $\{\pm I\}$ と同一視してはならない理由も述べよ。

- Level: B
- ID: MF1-B1

<!-- solution-start -->
**詳細解答**　$(ai+b)/(ci+d)=i$ を両辺に $ci+d$ を掛けて

$$
ai+b=i(ci+d)=-c+di
$$

と書けるので、実部と虚部の比較から $b=-c,\ a=d$ です。行列式条件は $a^2+c^2=1$ です。整数平方の和が $1$ となるのは $(a,c)=(\pm1,0),(0,\pm1)$ のみで、行列は $I,-I,S,-S$ です。これらは確かに $i$ を固定します。一方 [作用の核](#thm-mf1-imaginary-action)は全ての $\tau$ を固定する行列なので $\pm I$ だけです。$S$ は $i$ は固定しますが、たとえば $2i$ を $i/2$ に送るため核ではありません。
<!-- solution-end -->

#### B2. 具体的な点を基本領域へ

$\tau=(2+3i)/10$ にまず $S$、次いで必要な整数平行移動 $T^n$ を適用して $\mathcal F$ に入れよ。式と基本領域の二条件を検査せよ。

- Level: B
- ID: MF1-B2

<!-- solution-start -->
**詳細解答**　$\tau=1/5+3i/10$ なので

$$
S\cdot\tau=-\frac1{(2+3i)/10}
=-\frac{10(2-3i)}{13}
=-\frac{20}{13}+\frac{30}{13}i.
$$

実部 $-20/13$ を $[-1/2,1/2]$ に移すには $n=2$ とすればよく、

$$
T^2S\cdot\tau=\frac6{13}+\frac{30}{13}i.
$$

実部は $6/13<1/2$、絶対値の二乗は $(36+900)/169=936/169>1$ です。したがって基本領域の内部にあります。$T^2S$ は[生成元](#thm-mf1-generators)の積なので正しい群作用です。
<!-- solution-end -->

#### B3. 相似な二格子を見分ける

$\Lambda=\mathbb Z+\mathbb Zi$ と $\Lambda'=\mathbb Z+\mathbb Z(1+i)/2$ が相似であることを、具体的な複素数 $\alpha$ を使って示せ。また $\tau'=(1+i)/2$ への行列を示せ。

- Level: B
- ID: MF1-B3

<!-- solution-start -->
**詳細解答**　$\alpha=1+i$ と取ると

$$
\alpha\Lambda'=\mathbb Z(1+i)+\mathbb Zi.
$$

整数係数の差 $(1+i)-i=1$ を作れるので右辺は $\mathbb Z+\mathbb Zi=\Lambda$ に等しいです。また

$$
\begin{pmatrix}1&0\\1&1\end{pmatrix}\cdot i
=\frac{i}{i+1}=\frac{1+i}{2}.
$$

この行列は行列式 $1$ なので、[格子の相似類と軌道の定理](#thm-mf1-lattice-orbit)の十分性とも一致します。単に $\tau'\ne i$ を理由に別の相似類と判断してはいけません。
<!-- solution-end -->

#### B4. 有理境界の行列を作る

$\infty$ を $2/3$ に送る $SL_2(\mathbb Z)$ の行列を一つ作れ。また $T$ が $\infty$ を固定する理由を答えよ。

- Level: B
- ID: MF1-B4

<!-- solution-start -->
**詳細解答**　$\gamma\cdot\infty=a/c$ なので第一列を $(a,c)=(2,3)$ と選びます。行列式条件 $2d-3b=1$ には $d=2,b=1$ が解です。ゆえに

$$
\gamma=\begin{pmatrix}2&1\\3&2\end{pmatrix},
\quad \det\gamma=4-3=1,
\quad\gamma\cdot\infty=\frac23.
$$

一方 $T$ の下段は $(0,1)$ で $c=0$ だから、[拡張有理境界の定義](#def-mf1-rational-boundary)より $T\cdot\infty=\infty$ です。
<!-- solution-end -->

### Level C：作用・基本領域・境界の接続

#### C1. 格子の周期の取り替えから基本領域とカスプへ

$\tau_0=(1+i)/2$、$\Lambda_{\tau_0}=\mathbb Z+\tau_0\mathbb Z$ とする。(1) $\tau_0$ を $\mathcal F$ に移す $S,T$ の積を一つ作れ。(2) 移した点が内部・境界のどちらか判定し、境界では一意性定理をそのまま使えない理由を具体的に示せ。(3) $\Lambda_{\tau_0}$ と $\Lambda_i$ の相似を示せ。(4) 有理境界 $2/3$ が $\infty$ と同じ軌道にあることを示せ。

- Level: C
- ID: MF1-C1

<!-- solution-start -->
**詳細解答**　(1) $\tau_0$ の絶対値の二乗は $1/2<1$ なので $S$ で反転させます。

$$
S\cdot\tau_0=-\frac{2}{1+i}=-(1-i)=-1+i.
$$

続いて $T$ を作用させると $T S\cdot\tau_0=i$ です。

(2) $i$ は実部 $0$ ですが $|i|=1$ なので $\mathcal F$ の境界上です。[基本領域定理](#thm-mf1-fundamental-domain)の一意性は $\mathcal F^\circ$ にのみ適用されます。実際 $S\cdot i=i$ となり、$\pm I$ 以外の行列も境界点 $i$ を固定します。これは内部での一意性と矛盾しません。

(3) $\alpha=1+i$ とすれば

$$
\alpha\Lambda_{\tau_0}
=\mathbb Z(1+i)+\mathbb Zi
=\mathbb Z+\mathbb Zi=\Lambda_i.
$$

最後の等号は $1=(1+i)-i$ と $1+i=1+i$ が両方向に整数線形結合として表せることから従います。[格子と軌道の定理](#thm-mf1-lattice-orbit)とも合致します。

(4) 互いに素な $2,3$ について $2\cdot2-3\cdot1=1$ です。したがって

$$
\begin{pmatrix}2&1\\3&2\end{pmatrix}\in SL_2(\mathbb Z)
$$

であり、この行列は $\infty$ を $2/3$ に送ります。[有理境界の一軌道性](#thm-mf1-one-cusp-orbit)をこの一例で構成的に確かめました。
<!-- solution-end -->

この章では、複素格子から整数行列と基本領域へ向かう道筋を全て周期の取り替えから導きました。次の MF2 では、$\tau$ の取り替えに対して決まった変換則を満たす正則関数を定義し、$q=e^{2\pi i\tau}$ を使って無限遠での振る舞いを調べます。
