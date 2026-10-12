# INFO9 微分エントロピーと連続変数の情報量

[INFO1のShannonエントロピー](../INFO1/index.md#def-info1-entropy)は、有限個の記号について確率の対数を平均する量でした。しかし、長さ1の区間から一様に実数を選ぶと、一点が選ばれる確率はすべて0です。一点の確率をそのまま対数に入れたり、区間を無限個の記号として足したりしても意味のある数値にはなりません。

連続値の観測では、確率ではなく**単位長さあたりの確率密度**を使います。この置き換えで得る微分エントロピーは、離散エントロピーと異なり負にもなり、測定単位を変えるだけで数値が変わります。その一方で、二つの変数が共有する情報を測る相互情報量や、二分布を比較する相対エントロピーは、適切に定義すれば座標変換でも保たれます。本章ではこの違いを、まず区間上の一様分布と二次元の具体例から見ます。

対数はすべて底2で、密度の基準は実数上または Euclid 空間上の通常の長さ・面積（Lebesgue測度）とします。密度の積分は確率を与えるものとし、計算に必要な積分の有限性は各定理で確認します。離散変数と連続変数の公式を無条件に同一視しません。

## 1. 記号の個数ではなく密度の対数を平均する

長さ $a>0$ の区間 $[0,a]$ 上の一様分布では密度は $1/a$ です。$a=1/4$ なら密度は4ですが、確率が4という意味ではありません。幅 $dx$ の短い区間に入る確率が、およそ $4\,dx$ という意味です。

密度 $f$ の各点の値を使って $-\log_2 f(x)$ を重み $f(x)\,dx$ で平均することを考えます。密度は1を超え得るため、離散の場合の「各項が非負」という議論が消える点に注意してください。

<a id="def-info9-differential-entropy"></a>

<!-- formal-statement-start -->
> **定義（微分エントロピー）**  
> $X$ を $\mathbb R^d$（$d\ge1$）上の確率密度関数 $f$ を持つ確率変数とする。$f\ge0$、$\int_{\mathbb R^d}f(x)\,dx=1$ であり、
>
$$
\int_{\mathbb R^d}|f(x)\log_2 f(x)|\,dx<\infty
$$
>
> と仮定する。ただし $0\log_2 0=0$ とする。このとき、微分エントロピーを
>
$$
h(X):=-\int_{\mathbb R^d}f(x)\log_2 f(x)\,dx
$$
>
> と定義する。密度は通常の体積に関する密度であり、この定義の下では $h(X)$ は有限の実数である。
<!-- formal-statement-end -->

この定義で最も重要なのは、確率質量ではなく密度を対数に入れていることです。確率0の一点を積分から除くのではなく、密度が0の場所では $f\log f=0$ と扱います。

<!-- definition-example-start: def-info9-differential-entropy -->
### 例：幅によって正にも負にもなる一様分布

**定義の確認**：$a>0$ とし、$f(x)=1/a$（$0\le x\le a$）、それ以外では0と置きます。非負であり、$\int_0^a(1/a)\,dx=1$、さらに

$$
\int_{\mathbb R}|f\log_2 f|\,dx
=\int_0^a\frac1a\left|\log_2\frac1a\right|dx
=|\log_2 a|<\infty
$$

なので定義の全条件を満たします。直接代入すると

$$
h(X)=-a\frac1a\log_2\frac1a=\log_2 a.
$$

したがって $a=4$ なら2ビット、$a=1$ なら0ビット、$a=1/4$ なら **$-2$ ビット** です。負値は計算ミスでも「負の確率」でもありません。
<!-- definition-example-end -->

[有限離散エントロピーの非負性](../INFO1/index.md#thm-info1-entropy-bounds)は $0<p(x)\le1$ を使いました。密度には $f(x)\le1$ の制限がないので、その証明を連続変数へ移せません。また、同じ物理量をメートルからセンチメートルへ変えれば密度の数値も変わります。この違いを定理で追います。

## 2. 座標・単位を変えると何が起きるか

$Y=aX+b$（$a\ne0$）では、変換後の短い区間の幅が $|a|$ 倍になります。したがって密度はその逆数倍です。一般の行列 $A$ でも、体積を何倍にするかを表す $|\det A|$ が同じ役割を担います。

<a id="prop-info9-affine-transform"></a>

<!-- formal-statement-start -->
> **命題（微分エントロピーの可逆アフィン変換則）**  
> $\mathbb R^d$ に密度 $f_X$ を持ち、$h(X)$ の定義の絶対可積分条件を満たす $X$ を考える。$d\times d$ 実正則行列 $A$ と $b\in\mathbb R^d$ について $Y=AX+b$ と置くと $Y$ も密度を持ち、
>
$$
h(Y)=h(X)+\log_2|\det A|
$$
>
> が成り立つ。特に一次元で $a\ne0$ のとき $h(aX+b)=h(X)+\log_2|a|$。
<!-- formal-statement-end -->

### 証明の見取り図

密度変換の Jacobian を書き、$\log$ の中に現れる $|\det A|^{-1}$ を積分の外へ出します。このとき正則性がないと逆写像と密度変換の式が使えません。

<!-- proof-start -->
### 証明

$y=Ax+b$ では $x=A^{-1}(y-b)$、体積要素は $dy=|\det A|\,dx$ です。従って

$$
f_Y(y)=\frac{f_X(A^{-1}(y-b))}{|\det A|}.
$$

まず絶対可積分性は $\log_2 f_Y(Ax+b)=\log_2 f_X(x)-\log_2|\det A|$ を正密度の点で用いて

$$
\begin{aligned}
\int |f_Y(y)\log_2 f_Y(y)|\,dy
&=\int f_X(x)\left|\log_2 f_X(x)-\log_2|\det A|\right|dx\\
&\le\int |f_X(x)\log_2 f_X(x)|\,dx
  +|\log_2|\det A||\int f_X(x)\,dx<\infty
\end{aligned}
$$

から従います。密度0の点は規約によって寄与しません。次に変数変換すると

$$
\begin{aligned}
h(Y)
&=-\int f_X(x)\log_2
  \frac{f_X(x)}{|\det A|}\,dx\\
&=-\int f_X(x)\log_2 f_X(x)\,dx
  +\log_2|\det A|\int f_X(x)\,dx\\
&=h(X)+\log_2|\det A|.
\end{aligned}
$$

最後の等式は $\int f_X=1$ によります。
<!-- proof-end -->

**例：単位を10倍にする。** $X$ が $[0,1]$ 上一様なら $h(X)=0$。$Y=10X$ は $[0,10]$ 上一様で $h(Y)=\log_2 10$ です。物理的な測定を変えなくても、数値の単位を変えただけで微分エントロピーは変化します。

## 3. 細かい量子化では何が発散し、何が残るか

連続量を幅 $1/n$ の升目に区切ると、升目番号は離散確率変数になります。その[Shannonエントロピー](../INFO1/index.md#def-info1-entropy)には「どの升目か」を表すビットも含まれ、区切りを細かくするほど通常は増えていきます。増大する $\log_2 n$ を取り除いた有限部分が、微分エントロピーにつながります。

<a id="thm-info9-quantization"></a>

<!-- formal-statement-start -->
> **定理（区間上の連続密度と等幅量子化）**  
> $X$ は $[0,1]$ 上の連続で非負の密度 $f$ を持ち、$\int_0^1f(x)\,dx=1$ とする。整数 $n\ge1$ に対し $K_n=\lfloor nX\rfloor$（$X=1$ のときは $K_n=n-1$ とする）と置く。このとき
>
$$
\lim_{n\to\infty}\bigl(H(K_n)-\log_2 n\bigr)=h(X).
$$
>
> ここで $H(K_n)$ は有限集合 $\{0,\ldots,n-1\}$ 上の離散エントロピーである。
<!-- formal-statement-end -->

### 証明の見取り図

各升目の平均密度を階段関数 $f_n$ とします。式を展開すると $H(K_n)-\log_2 n$ はちょうど $-\int f_n\log_2 f_n$ です。連続関数 $f$ の一様連続性で $f_n$ が $f$ に近づくことを示し、$t\log t$ の連続性から極限を取ります。

<!-- proof-start -->
### 証明

$I_{k,n}=[k/n,(k+1)/n)$（ただし最後は右端も含む）とし、

$$
p_{k,n}:=P(K_n=k)=\int_{I_{k,n}}f(x)\,dx,\qquad
f_n(x):=np_{k,n}\quad(x\in I_{k,n})
$$

と定めます。$f_n$ は升目における密度の平均値です。確率0の項を零とする規約の下で

$$
\begin{aligned}
-\int_0^1 f_n(x)\log_2 f_n(x)\,dx
&=-\sum_{k=0}^{n-1}\frac1n(np_{k,n})\log_2(np_{k,n})\\
&=-\sum_{k=0}^{n-1}p_{k,n}\log_2p_{k,n}
 -(\log_2n)\sum_{k=0}^{n-1}p_{k,n}\\
&=H(K_n)-\log_2n.
\end{aligned}
$$

連続関数 $f$ はコンパクト区間 $[0,1]$ 上で一様連続です。$\omega_f(\delta):=\sup\{|f(s)-f(t)|:|s-t|\le\delta\}$ と置くと $\omega_f(\delta)\to0$ です。同じ升目内のすべての $s,t$ について $|s-t|\le1/n$ なので

$$
|f_n(x)-f(x)|
=\left|n\int_{I_{k,n}}(f(t)-f(x))\,dt\right|
\le\omega_f(1/n)
$$

です。従って $\|f_n-f\|_\infty\to0$。$M:=\max_{[0,1]}f<\infty$ とすれば $0\le f_n,f\le M$。$g(t):=t\log_2t$（$g(0)=0$）は $[0,M]$ 上連続、したがって一様連続であり、

$$
\sup_{[0,1]}|g(f_n(x))-g(f(x))|\longrightarrow0.
$$

区間の長さは1なので積分の差の絶対値もこの上限以下です。ゆえに $-\int f_n\log_2 f_n\to-\int f\log_2 f=h(X)$。
<!-- proof-end -->

**例：一様分布**。$f\equiv1$ なら各升目は確率 $1/n$ です。従って $H(K_n)=\log_2n$ ですが $h(X)=0$。量子化のエントロピーが発散することと、微分エントロピーが有限であることは両立します。幅 $\Delta=1/n$ を使えば式は $H(K_n)+\log_2\Delta\to h(X)$ です。

連続性や台の条件がなければ上の一様収束の証明は使えません。また、$\int|f\log f|$ が発散する密度に「有限の微分エントロピー」という値を無条件に割り当てないことが重要です。

## 4. 二つの連続分布の差を測る

[INFO2の相対エントロピー](../INFO2/index.md#def-info2-relative-entropy)は、確率質量関数 $p(x),q(x)$ の比を取るものでした。連続分布では、同じ基準体積に関する密度 $p,q$ の比を取ります。密度を混ぜる際に、一方をメートル、もう一方をセンチメートルで表して比べてはいけません。

<a id="def-info9-continuous-kl"></a>

<!-- formal-statement-start -->
> **定義（連続分布の相対エントロピー）**  
> 同じ $\mathbb R^d$ 上の確率密度 $p,q$ を持つ確率分布 $P,Q$ に対し、$q(x)=0$ なのに $p(x)>0$ となる集合の $P$-確率が正なら $D(P\|Q)=+\infty$ とする。それ以外の場合に
>
$$
D(P\|Q):=\int_{\{p>0\}}p(x)\log_2\frac{p(x)}{q(x)}\,dx
$$
>
> と定める。積分値は $[0,+\infty]$ に属する拡張実数として解釈する。$p=0$ の箇所は零とする。$q=0$ の箇所が $P$-零集合である条件を $P\ll Q$ と書く。
<!-- formal-statement-end -->

この定義で積分が $+\infty$ となる場合もあります。負の部分だけが無限大となって定義不能になることはありません。その理由も非負性の証明で確認します。

<!-- definition-example-start: def-info9-continuous-kl -->
### 例：片方の区間が狭い

**定義の確認**：$P$ を $[0,1]$ 上一様、$Q$ を $[0,2]$ 上一様とします。$p=1$（$[0,1]$）、$q=1/2$（$[0,2]$）で双方が正規化され、$P\ll Q$ です。$P$ の台では $p/q=2$ なので

$$
D(P\|Q)=\int_0^1 1\cdot\log_2 2\,dx=1.
$$

逆向きは $x\in(1,2]$ で $q(x)>0$、$p(x)=0$ なので $D(Q\|P)=+\infty$。微分エントロピー同士の単純な差ではありません。
<!-- definition-example-end -->

<a id="thm-info9-continuous-gibbs"></a>

<!-- formal-statement-start -->
> **定理（連続分布のGibbs不等式）**  
> 同じ $\mathbb R^d$ 上の密度を持つ任意の確率分布 $P,Q$ について $D(P\|Q)\ge0$。さらに $D(P\|Q)=0$ となるのは、$p=q$ が体積に関してほとんど至る所で成立する場合、かつその場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

[有限版のGibbs不等式](../INFO2/index.md#thm-info2-gibbs)と同じく $\ln u\le u-1$ を密度の比に使います。ただし積分の負の部分を先に抑え、$q$ が $p$ の台の外へ質量を置く場合も数えます。

<!-- proof-start -->
### 証明

$P\not\ll Q$ なら定義により $D=+\infty$。以下 $P\ll Q$ とし、$S=\{x:p(x)>0\}$ とします。$S$ 上では $p,q>0$ が $P$ に関してほとんど至る所で成立します。

$u=q/p>0$ に対して $\ln u\le u-1$ だから

$$
p(x)\log_2\frac{p(x)}{q(x)}
\ge\frac{p(x)-q(x)}{\ln2}.
$$

さらに $p<q$ の場所では

$$
0\le p\log_2\frac qp
\le\frac{q-p}{\ln2}\le\frac q{\ln2}
$$

となるため、左辺の負の部分は積分可能です。したがって拡張実数の積分を正当に評価して

$$
\begin{aligned}
D(P\|Q)
&\ge\frac1{\ln2}\int_S(p-q)\,dx\\
&=\frac{1-\int_Sq\,dx}{\ln2}
=\frac{\int_{S^c}q\,dx}{\ln2}\ge0.
\end{aligned}
$$

等号の場合、$S$ 上で $p/q$ に対する対数不等式の差が非負であり、その積分が0でなければなりません。この差は $p=q$ のときだけ0なので $p=q$ が $S$ 上でほとんど至る所成り立ち、さらに $\int_{S^c}q=0$ です。よって全体で $p=q$ です。逆方向は密度比が1なので積分が零です。
<!-- proof-end -->

ここで体積に関する「ほとんど至る所」とは、長さ・面積などが0の集合を除くことです。密度はそのような集合上で変更しても分布を変えないため、点ごとの一致は要求しません。

## 5. 連続値同士が共有する情報は座標に依存しない

周辺密度 $p_X,p_Y$ と結合密度 $p_{XY}$ を持つ二変数について、「観測 $X$ で $Y$ の不確実性がどれだけ減ったか」を考えます。ただし、微分エントロピー一つは負にもなり得るため、初めから差を定義にせず、[相対エントロピー表示](../INFO2/index.md#thm-info2-mutual-kl)を連続変数へ拡張します。

<a id="def-info9-continuous-mutual"></a>

<!-- formal-statement-start -->
> **定義（連続変数の相互情報量）**  
> $(X,Y)$ が $\mathbb R^{d+e}$ 上に結合密度 $p_{XY}$ を持ち、周辺密度 $p_X,p_Y$ を持つとする。積密度 $p_X(x)p_Y(y)$ を持つ分布を $P_X\otimes P_Y$ と書き、
>
$$
I(X;Y):=D(P_{XY}\|P_X\otimes P_Y)
$$
>
> と定義する。値は $[0,+\infty]$ に属する。積密度が正のところでは密度比の積分で表せる。
<!-- formal-statement-end -->

周辺密度は結合密度の積分 $p_X(x)=\int p_{XY}(x,y)\,dy$、$p_Y(y)=\int p_{XY}(x,y)\,dx$ です。周辺密度のいずれかが零の場所では結合密度もほとんど至る所で零となり、積密度に対する絶対連続性は自動的に成り立ちます。

<!-- definition-example-start: def-info9-continuous-mutual -->
### 例：それぞれ一様なのに1ビット共有する

$[0,1]^2$ を四つの一辺 $1/2$ の正方形に分け、左下と右上で密度2、ほかで密度0の結合分布を考えます。**定義の確認**：密度は非負、正密度部分の面積は $2(1/2)^2=1/2$ なので積分は1。各 $x$ に対する縦の積分は $2(1/2)=1$ なので $p_X\equiv1$、同様に $p_Y\equiv1$ です。

正密度部分で比 $p_{XY}/(p_Xp_Y)=2$ となるので

$$
I(X;Y)=2\cdot\frac12\log_22=1\ \text{ビット}.
$$

それぞれ単独では $[0,1]$ 上一様ですが、$X$ の左右どちらの半分にいるかを知れば、$Y$ の半分も分かります。実数値の細部は共有していなくても、半分を示す一ビットを共有しています。
<!-- definition-example-end -->

<a id="thm-info9-mutual-entropy"></a>

<!-- formal-statement-start -->
> **定理（連続相互情報量の非負性とエントロピー表示）**  
> $(X,Y)$ に結合密度があるとき $I(X;Y)\ge0$ であり、$I(X;Y)=0$ と $X,Y$ の独立性は同値である。さらに
>
$
\int|p_{XY}\log_2p_{XY}|<\infty,\qquad
\int|p_X\log_2p_X|<\infty,\qquad
\int|p_Y\log_2p_Y|<\infty.
$
>
> が成り立つ場合には相互情報量は有限で、
>
$$
I(X;Y)=h(X)+h(Y)-h(X,Y)
$$
>
> が成立する。積分はそれぞれの定義域全体で行う。
<!-- formal-statement-end -->

### 証明の見取り図

非負性は直前の連続Gibbs不等式です。エントロピー表示では $\log(p_{XY}/(p_Xp_Y))$ を三つに分け、周辺密度の定義で二重積分を一重積分へ戻します。有限性の仮定なしに $+\infty-\infty$ という差を作ってはいけません。

<!-- proof-start -->
### 証明

[連続Gibbs不等式](#thm-info9-continuous-gibbs)を $P_{XY}$ と $P_X\otimes P_Y$ に使い、非負性および等号条件 $p_{XY}=p_Xp_Y$ を得ます。これは結合分布と積分布の一致、すなわち独立性です。

仮定した三つの絶対可積分性の下で、$\log(p_Xp_Y)=\log p_X+\log p_Y$ を結合密度の正のところで展開すると

$$
\begin{aligned}
I(X;Y)
&=\iint p_{XY}\log_2 p_{XY}\,dx\,dy\\
&\quad-\iint p_{XY}\log_2 p_X(x)\,dx\,dy\\
&\quad-\iint p_{XY}\log_2 p_Y(y)\,dx\,dy.
\end{aligned}
$$

二番目の積分について、周辺密度を代入すれば

$$
\begin{aligned}
\iint p_{XY}(x,y)\log_2p_X(x)\,dy\,dx
&=\int\left(\int p_{XY}(x,y)\,dy\right)\log_2p_X(x)\,dx\\
&=\int p_X(x)\log_2p_X(x)\,dx=-h(X).
\end{aligned}
$$

三番目も同様の操作を $y$ 側に施し $-h(Y)$ となります。第一項は $-h(X,Y)$ なので和は $h(X)+h(Y)-h(X,Y)$ です。
<!-- proof-end -->

先ほどの二正方形の例では $h(X)=h(Y)=0$、$h(X,Y)=-1$。従って $I=0+0-(-1)=1$ ビットと一致します。「結合エントロピーが負」という特徴は、相互情報量の非負性を壊しません。

<a id="def-info9-conditional-entropy"></a>

<!-- formal-statement-start -->
> **定義（連続条件付き微分エントロピー）**  
> 結合密度 $p_{XY}$ と周辺密度 $p_X$ があり、$p_X(x)>0$ の点で $p_{Y|X}(y|x):=p_{XY}(x,y)/p_X(x)$ とする。積分 $\iint |p_{XY}\log_2p_{Y|X}|\,dx\,dy$ が有限の場合、
>
$$
h(Y|X):=-\iint p_{XY}(x,y)\log_2p_{Y|X}(y|x)\,dx\,dy
$$
>
> と定める。$p_X=0$ の点の条件付き密度は任意に定めてよく、積分には寄与しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info9-conditional-entropy -->
### 例：条件付きでも負になる

二正方形の分布では、$x$ がどちらかの半区間にあれば $Y|X=x$ は長さ $1/2$ の区間上で密度2を取ります。条件付き密度は正規化され、$\log_22=1$ の絶対積分も有限です。したがって $h(Y|X)=-1$。$h(Y)=0$ なので $h(Y)-h(Y|X)=1$ と相互情報量に一致します。
<!-- definition-example-end -->

<a id="prop-info9-continuous-chain"></a>

<!-- formal-statement-start -->
> **命題（連続結合エントロピーの連鎖律）**  
> 結合密度 $p_{XY}$ を持つ $(X,Y)$ について、$h(X,Y)$ と $h(X)$ の定義の絶対可積分条件が成り立つとき、上の条件付き微分エントロピーも有限に定義され、
>
$$
h(X,Y)=h(X)+h(Y|X)
$$
>
> が成立する。さらに $h(Y)$ も有限なら $I(X;Y)=h(Y)-h(Y|X)$ が成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p_{XY}=p_Xp_{Y|X}$ を正密度の点で対数に入れると

$$
p_{XY}\log_2p_{Y|X}
=p_{XY}\log_2p_{XY}-p_{XY}\log_2p_X.
$$

右の第一項は仮定で絶対可積分です。第二項の絶対積分は周辺化で $\int|p_X\log_2p_X|$ に等しく、これも有限なので $h(Y|X)$ は定義できます。積分して符号を反転すると

$$
\begin{aligned}
h(Y|X)
&=-\iint p_{XY}\log_2p_{XY}
+\iint p_{XY}\log_2p_X\\
&=h(X,Y)-h(X).
\end{aligned}
$$

後半は[相互情報量のエントロピー表示](#thm-info9-mutual-entropy)の右辺をこの式で置き換えます。
<!-- proof-end -->

<a id="prop-info9-mutual-invariance"></a>

<!-- formal-statement-start -->
> **命題（可逆アフィン座標変換での相互情報量の不変性）**  
> $(X,Y)$ が結合密度を持つとし、$U=AX+a$、$V=BY+b$ で $A,B$ はそれぞれ正則行列とする。このとき、$I(X;Y)$ が有限でも無限大でも
>
$$
I(U;V)=I(X;Y)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

相互情報量は結合密度と**積周辺密度の比**です。双方が同じ変数変換で Jacobian を受けるので、それが比の中で消えます。

<!-- proof-start -->
### 証明

$x=A^{-1}(u-a)$、$y=B^{-1}(v-b)$ と置き $J=|\det A||\det B|>0$ とすると

$$
p_{UV}(u,v)=\frac{p_{XY}(x,y)}{J},
\qquad
p_U(u)p_V(v)=\frac{p_X(x)p_Y(y)}{J}.
$$

従って双方が正のところで

$$
\frac{p_{UV}(u,v)}{p_U(u)p_V(v)}
=\frac{p_{XY}(x,y)}{p_X(x)p_Y(y)}.
$$

さらに $du\,dv=J\,dx\,dy$ だから、相対エントロピーの被積分関数を変数変換すると $p_{UV}\,du\,dv=p_{XY}\,dx\,dy$ です。拡張実数の積分が無限大の場合も、同じ非負部分と可積分な負部分の変換で等式が成立します。
<!-- proof-end -->

**重要な境界**：$Y=X$ が確率1で成立し、$X$ が連続密度を持つ場合、組 $(X,Y)$ は平面の対角線に集中し、二次元の結合密度を持ちません。上の結合密度公式は適用できません。一般の確率測度に拡張すれば $P_{XY}$ は積分布に対し特異で相互情報量は $+\infty$ となりますが、「$h(X,Y)$ に密度を代入する」という計算は行えません。

## 6. Gaussian分布はなぜ分散制約の下で最大か

微分エントロピーそのものは負にもなる一方、連続分布の相対エントロピーは非負です。この非負性を、平均と分散を固定した密度のエントロピー比較へ使います。

<a id="prop-info9-gaussian-entropy"></a>

<!-- formal-statement-start -->
> **命題（一次元Gaussian分布の微分エントロピー）**  
> $X$ が平均 $\mu\in\mathbb R$、分散 $\sigma^2>0$ のGaussian密度
>
$$
g(x)=\frac1{\sqrt{2\pi\sigma^2}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$
>
> を持つなら
>
$$
h(X)=\frac12\log_2(2\pi e\sigma^2).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まずGaussian密度の正規化と二次モーメントを確認します。$J=\int_{-\infty}^{\infty}e^{-u^2/2}\,du>0$ とすると、非負関数の二重積分を極座標 $(u,v)=(r\cos\theta,r\sin\theta)$ に変換して

$
\begin{aligned}
J^2
&=\int_{\mathbb R^2}e^{-(u^2+v^2)/2}\,du\,dv\\
&=\int_0^{2\pi}\int_0^\infty e^{-r^2/2}r\,dr\,d\theta\\
&=2\pi\left[-e^{-r^2/2}\right]_{r=0}^{\infty}=2\pi.
\end{aligned}
$

従って $J=\sqrt{2\pi}$。標準化変数 $u=(x-\mu)/\sigma$（$\sigma>0$）を使うと $\int g(x)\,dx=J/\sqrt{2\pi}=1$ です。偶関数の対称性で $\int u e^{-u^2/2}\,du=0$、さらに部分積分で

$
\begin{aligned}
\int_{-\infty}^{\infty}u^2 e^{-u^2/2}\,du
&=\left[-u e^{-u^2/2}\right]_{-\infty}^{\infty}
+\int_{-\infty}^{\infty}e^{-u^2/2}\,du\\
&=0+J=J.
\end{aligned}
$

境界項が零なのは $|u|e^{-u^2/2}\to0$ のためです。これを標準化へ戻して $E[X]=\mu$、$E[(X-\mu)^2]=\sigma^2$ が確かめられます。

以上によりGaussian密度は正規化され、必要な二次モーメントは有限です。対数を取ると

$$
-\log_2g(x)=\frac12\log_2(2\pi\sigma^2)
+\frac{(x-\mu)^2}{2\sigma^2\ln2}.
$$

右辺の絶対値は定数と二乗の和で抑えられるので $\int|g\log_2g|<\infty$ です。従って

$$
\begin{aligned}
h(X)
&=\frac12\log_2(2\pi\sigma^2)\int g(x)\,dx
+\frac{1}{2\sigma^2\ln2}\int(x-\mu)^2g(x)\,dx\\
&=\frac12\log_2(2\pi\sigma^2)+\frac1{2\ln2}\\
&=\frac12\log_2(2\pi e\sigma^2).
\end{aligned}
$$
<!-- proof-end -->

<a id="thm-info9-gaussian-max"></a>

<!-- formal-statement-start -->
> **定理（平均・分散を固定した最大微分エントロピー）**  
> $X$ は $\mathbb R$ 上の密度 $f$ を持ち、$E[X]=\mu$、$E[(X-\mu)^2]=\sigma^2\in(0,\infty)$ とし、$\int|f\log_2f|<\infty$ と仮定する。このとき
>
$$
h(X)\le\frac12\log_2(2\pi e\sigma^2),
$$
>
> 等号が成り立つのは $X$ が平均 $\mu$、分散 $\sigma^2$ のGaussian分布に従う場合、かつその場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

比較相手を同じ平均・分散のGaussian密度 $g$ に固定します。$D(f\|g)$ を展開すると、$E_f[(X-\mu)^2]=\sigma^2$ によって交差項が定数となり、ちょうど $h(g)-h(f)$ が現れます。

<!-- proof-start -->
### 証明

上の[Gaussian密度](#prop-info9-gaussian-entropy)を $g$ とします。$g(x)>0$ がすべての $x$ で成立するので $P_f\ll P_g$ です。また

$$
\log_2g(x)=-\frac12\log_2(2\pi\sigma^2)
-\frac{(x-\mu)^2}{2\sigma^2\ln2}.
$$

仮定 $E_f[(X-\mu)^2]<\infty$ から $\int f|\log_2g|<\infty$。よって相対エントロピーの各項は有限であり、

$$
\begin{aligned}
D(P_f\|P_g)
&=\int f\log_2f-\int f\log_2g\\
&=-h(X)+\frac12\log_2(2\pi\sigma^2)
+\frac{E_f[(X-\mu)^2]}{2\sigma^2\ln2}\\
&=-h(X)+\frac12\log_2(2\pi e\sigma^2).
\end{aligned}
$$

[連続Gibbs不等式](#thm-info9-continuous-gibbs)より左辺は非負なので上界が出ます。等号なら同じ定理の等号条件で $f=g$ がほとんど至る所で成立します。逆に $f=g$ は[Gaussianの微分エントロピー](#prop-info9-gaussian-entropy)の値を達成します。
<!-- proof-end -->

**例：分散が同じ一様分布。** $X$ が $[-a,a]$ 上一様（$a>0$）なら $h(X)=\log_2(2a)$、分散は $a^2/3$ です。対応するGaussianの上界は

$$
\frac12\log_2\left(\frac{2\pi e a^2}{3}\right).
$$

両者の差は $\frac12\log_2(\pi e/6)>0$。ここでは $2\pi e/3>4$、すなわち $\pi e>6$ なので不等号は厳密です。平均分散だけからエントロピーの値は決まりません。

## 7. 演習：密度・座標・共有情報を区別する

### Level A：定義を直接使う

#### A1. 密度4の一様分布

$X$ は $[0,1/4]$ 上一様とする。密度が確率ではない理由を示し、$\int|f\log_2f|$ と $h(X)$ を求めよ。

- Level: A
- ID: INFO9-A1

<!-- solution-start -->
**詳細解答**　$0\le x\le1/4$ の密度は $f(x)=4$、それ以外は0です。面積 $4(1/4)=1$ が確率であり、点 $x$ を取る確率は0です。絶対積分は

$$
\int |f\log_2f|=\int_0^{1/4}4\log_24\,dx
=\frac14\cdot4\cdot2=2.
$$

従って $h(X)=-2$ ビットです。密度4を確率4と読み替えると非負性の議論が破綻します。
<!-- solution-end -->

#### A2. 単位変換

$X$ は $[0,2]$ 上一様とする。$Y=100X+5$ の台・密度・微分エントロピーを求め、[アフィン変換則](#prop-info9-affine-transform)と照合せよ。

- Level: A
- ID: INFO9-A2

<!-- solution-start -->
**詳細解答**　$0\le X\le2$ から $5\le Y\le205$。逆写像は $x=(y-5)/100$、Jacobian は $1/100$ なので

$$
f_Y(y)=\frac12\cdot\frac1{100}=\frac1{200}
\quad(5\le y\le205).
$$

区間の長さ200との積が1です。$h(Y)=\log_2200$。一方 $h(X)=\log_22=1$、変換則の右辺は $1+\log_2100=\log_2200$ で一致します。
<!-- solution-end -->

#### A3. 等幅量子化の離散エントロピー

$X$ が $[0,1]$ 上一様で、$K_8=\lfloor8X\rfloor$ とする。$P(K_8=k)$、$H(K_8)$、$H(K_8)-\log_28$、$h(X)$ を求めよ。

- Level: A
- ID: INFO9-A3

<!-- solution-start -->
**詳細解答**　$k=0,\ldots,7$ の各幅は $1/8$、密度は1なので $P(K_8=k)=\int_{k/8}^{(k+1)/8}1\,dx=1/8$。従って

$$
H(K_8)=-8\cdot\frac18\log_2\frac18=3,\qquad
H(K_8)-\log_28=3-3=0.
$$

また $\int_0^1-1\log_21\,dx=0$ なので $h(X)=0$。この例では極限を取らなくても補正後の値は常に0です。
<!-- solution-end -->

#### A4. 区間の相対エントロピー

$P$ は $[0,1]$ 上一様、$Q$ は $[0,4]$ 上一様とする。$D(P\|Q)$ と $D(Q\|P)$ を台条件から求めよ。

- Level: A
- ID: INFO9-A4

<!-- solution-start -->
**詳細解答**　$P$ の密度は $p=1$（$[0,1]$）、$Q$ の密度は $q=1/4$（$[0,4]$）。$P\ll Q$ なので

$$
D(P\|Q)=\int_0^1 1\log_2\frac1{1/4}\,dx=2.
$$

反対向きは $x\in(1,4)$ の $Q$-確率が $3/4>0$ なのに $p(x)=0$ であり $Q\not\ll P$。定義から $D(Q\|P)=+\infty$ です。
<!-- solution-end -->

### Level B：仮定・途中式・等号を証明する

#### B1. Gaussian分布のエントロピーを再導出する

密度 $g(x)=(2\pi\sigma^2)^{-1/2}\exp(-(x-\mu)^2/(2\sigma^2))$、$\sigma>0$ を持つ $X$ について、$E[(X-\mu)^2]=\sigma^2$ を使い、$\int |g\log_2g|<\infty$ と $h(X)$ を導け。

- Level: B
- ID: INFO9-B1

<!-- solution-start -->
**詳細解答**　まず

$$
\log_2g(x)=-\frac12\log_2(2\pi\sigma^2)
-\frac{(x-\mu)^2}{2\sigma^2\ln2}.
$$

ゆえに

$$
\int g|\log_2g|
\le\frac12|\log_2(2\pi\sigma^2)|\int g
+\frac1{2\sigma^2\ln2}\int(x-\mu)^2g
=\frac12|\log_2(2\pi\sigma^2)|+\frac1{2\ln2}<\infty.
$$

絶対積分が有限なので期待値の線形性を適用でき、

$$
\begin{aligned}
h(X)
&=-E[\log_2g(X)]\\
&=\frac12\log_2(2\pi\sigma^2)+\frac{\sigma^2}{2\sigma^2\ln2}\\
&=\frac12\log_2(2\pi e\sigma^2).
\end{aligned}
$$
<!-- solution-end -->

#### B2. 二正方形の結合密度

$(X,Y)$ は $[0,1]^2$ 上、左下と右上の二つの半辺正方形で密度2、ほかで0とする。周辺密度、$h(X)$、$h(Y)$、$h(X,Y)$、$h(Y|X)$、$I(X;Y)$ を求め、独立か判定せよ。

- Level: B
- ID: INFO9-B2

<!-- solution-start -->
**詳細解答**　密度2の領域面積は $1/2$ なので全積分は1です。$x$ が左半区間なら $y$ は左半区間で密度2、右半区間なら右半区間で密度2です。したがっていずれの場合も

$$
p_X(x)=\int_0^1p_{XY}(x,y)\,dy=2\cdot\frac12=1.
$$

同様に $p_Y(y)=1$。ゆえに $h(X)=h(Y)=0$、また

$$
h(X,Y)=-\iint_{\{p_{XY}=2\}}2\log_22\,dx\,dy
=-2\cdot\frac12=-1.
$$

条件付き密度は各半区間で2なので $h(Y|X)=-1$。相互情報量は [連続エントロピー表示](#thm-info9-mutual-entropy)の有限性条件（各対数の絶対積分は有限）を満たし、

$$
I(X;Y)=0+0-(-1)=1.
$$

また $p_{XY}=2$ の部分は $p_Xp_Y=1$ と異なるため独立ではありません。
<!-- solution-end -->

#### B3. 最大エントロピーの等号条件

平均0、分散4、有限の微分エントロピーを持つ実数値密度 $f$ について $h(f)$ の上界を導け。さらにその上界を達成する密度を書き、$D(f\|g)$ のどの条件から等号が決まるか説明せよ。

- Level: B
- ID: INFO9-B3

<!-- solution-start -->
**詳細解答**　比較密度を

$$
g(x)=\frac1{\sqrt{8\pi}}\exp\left(-\frac{x^2}{8}\right)
$$

と置きます。$g>0$、$\int g=1$、$\int x^2f=4$ です。従って

$$
\begin{aligned}
D(f\|g)
&=\int f\log_2f-\int f\log_2g\\
&=-h(f)+\frac12\log_2(8\pi)
+\frac{\int x^2f(x)\,dx}{8\ln2}\\
&=-h(f)+\frac12\log_2(8\pi e)\ge0.
\end{aligned}
$$

したがって $h(f)\le\frac12\log_2(8\pi e)$。[連続Gibbs不等式](#thm-info9-continuous-gibbs)の等号条件は $f=g$ がほとんど至る所で成立することであり、これが唯一の達成密度です。
<!-- solution-end -->

#### B4. 座標変換後も共有情報は同じか

B2の分布について $U=2X+1$、$V=Y/2$ とする。$h(U)$、$h(V)$、$h(U,V)$、$I(U;V)$ を求め、相互情報量の不変性を密度の Jacobian と結びつけて説明せよ。

- Level: B
- ID: INFO9-B4

<!-- solution-start -->
**詳細解答**　一次元変換の倍率はそれぞれ2、$1/2$、結合変換の Jacobian の絶対値は $2(1/2)=1$ です。[アフィン変換則](#prop-info9-affine-transform)より

$$
h(U)=h(X)+\log_22=1,\quad
h(V)=h(Y)+\log_2(1/2)=-1,\quad
h(U,V)=h(X,Y)+\log_21=-1.
$$

従って $I(U;V)=1+(-1)-(-1)=1$ ビットです。直接確認するなら変換後の結合密度は $p_{UV}=p_{XY}/1$、周辺密度は $p_U=p_X/2$、$p_V=2p_Y$ です。ゆえに $p_U p_V=p_Xp_Y$ で比は変わらず、[不変性命題](#prop-info9-mutual-invariance)とも整合します。
<!-- solution-end -->

### Level C：すべての公式の適用条件をつなぐ

#### C1. 連続情報量の比較と可逆変換

$X$ は $[-a,a]$ 上一様（$a>0$）とし、$G$ は $X$ と同じ平均・分散を持つGaussian分布とする。さらに $(U,V)$ はB2の二正方形結合密度に従い、$S=3U-1$、$T=2V$ とする。

1. $X$ の密度が正規化されていることを確かめ、$h(X)$、$E[X]$、$\operatorname{Var}(X)$ を積分から導け。
2. $h(G)$ と $h(X)$ の差を求め、$D(P_X\|P_G)$ でその差が非負であることを証明せよ。等号は成立するか。
3. $(U,V)$ の周辺密度・結合密度の台から $I(U;V)$ を直接積分で求めよ。
4. $h(S)$、$h(T)$、$h(S,T)$ を求め、$I(S;T)$ を差の公式と密度比の Jacobian の両方から確認せよ。
5. 「$h(Y)\ge0$ は常に成立する」「微分エントロピーが変わったから共有情報も変わる」という二つの主張を、それぞれどの計算が反証するか示せ。

- Level: C
- ID: INFO9-C1

<!-- solution-start -->
**詳細解答**

**(1)** $f_X(x)=1/(2a)$（$-a\le x\le a$）、台外0です。$\int_{-a}^a(1/(2a))\,dx=1$、絶対対数積分は $|\log_2(2a)|<\infty$。従って

$$
h(X)=-\int_{-a}^a\frac1{2a}\log_2\frac1{2a}\,dx=\log_2(2a).
$$

また対称性に頼るだけでなく積分を実行すると

$$
E[X]=\frac1{2a}\left[\frac{x^2}2\right]_{-a}^a=0,\qquad
E[X^2]=\frac1{2a}\left[\frac{x^3}3\right]_{-a}^a
=\frac{a^2}3.
$$

よって $\operatorname{Var}(X)=E[X^2]-E[X]^2=a^2/3$ です。

**(2)** $\sigma^2=a^2/3$ なので[Gaussianの微分エントロピー](#prop-info9-gaussian-entropy)より

$$
h(G)=\frac12\log_2\left(\frac{2\pi e a^2}{3}\right).
$$

従って

$$
\begin{aligned}
h(G)-h(X)
&=\frac12\log_2\left(\frac{2\pi e a^2}{3}\right)
-\log_2(2a)\\
&=\frac12\log_2\left(\frac{2\pi e a^2/3}{4a^2}\right)
=\frac12\log_2\frac{\pi e}{6}.
\end{aligned}
$$

比較Gaussian密度 $g$ は全実数上で正です。$f$ はコンパクト台で $\int|f\log f|<\infty$、二次モーメントは $a^2/3$ なので、[最大エントロピー定理](#thm-info9-gaussian-max)の証明どおり

$$
D(P_X\|P_G)=h(G)-h(X)\ge0.
$$

等号なら $f=g$ がほとんど至る所で必要ですが、一方は $[-a,a]$ の外で0、他方は常に正なので不可能です。従って差は厳密に正です。

**(3)** 左下・右上の各正方形は面積1/4、そこでは $p_{UV}=2$。各周辺密度は $p_U=p_V=1$（$[0,1]$ 上）なので

$$
I(U;V)=\iint_{\{p_{UV}=2\}}2\log_2\frac2{1\cdot1}\,du\,dv
=2\cdot\frac12\cdot1=1.
$$

**(4)** $S=3U-1$ は倍率3、$T=2V$ は倍率2、結合写像は対角行列 $\operatorname{diag}(3,2)$ で行列式6です。[変換則](#prop-info9-affine-transform)から

$$
h(S)=\log_23,\qquad
h(T)=\log_22=1,\qquad
h(S,T)=-1+\log_26.
$$

したがって

$$
I(S;T)=\log_23+1-(-1+\log_26)
=1+\log_26-\log_26=1.
$$

他方 $p_{ST}(s,t)=p_{UV}((s+1)/3,t/2)/6$、$p_S(s)=p_U((s+1)/3)/3$、$p_T(t)=p_V(t/2)/2$ です。比は

$$
\frac{p_{ST}(s,t)}{p_S(s)p_T(t)}
=\frac{p_{UV}(u,v)/6}{(p_U(u)/3)(p_V(v)/2)}
=\frac{p_{UV}(u,v)}{p_U(u)p_V(v)}.
$$

加えて $ds\,dt=6\,du\,dv$ なので $p_{ST}\,ds\,dt=p_{UV}\,du\,dv$、密度比の積分も1を与えます。

**(5)** $h(X)=\log_2(2a)$ は $a<1/2$ で負になり、一番目の主張を反証します。二番目については $h(S)=\log_23$、$h(T)=1$ と元の $h(U)=h(V)=0$ が変わった一方、(3)(4)から $I(S;T)=I(U;V)=1$ なので成立しません。微分エントロピーと座標不変な相互情報量は別の量です。
<!-- solution-end -->

## 8. 本章で区別すべき範囲

微分エントロピーは密度・単位・座標の選び方に依存し、負値を許します。量子化した離散エントロピーはそのまま有限の微分エントロピーに収束するのではなく、升目の幅に応じた補正が必要です。

相対エントロピーと相互情報量は**同じ基準測度での密度比**を比較するため、可逆座標変換で不変です。しかし密度のない結合分布や積分が無限大の模型では、有限値のエントロピー差を無条件に使えません。連続Gibbs不等式とGaussian最大エントロピーの証明は、積分の有限性・分散の条件を満たしたときに限って、数式上の比較を保証します。
