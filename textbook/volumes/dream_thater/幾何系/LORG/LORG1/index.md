# LORG1 Lorentz内積と未来錐

<!-- definition-example-audit: strict -->

## 1. なぜ「内積」なのに長さの二乗が負になるのか

[LA6 の Sylvester の慣性法則](../../../基礎科目/LA/LA6/index.md#thm-la6-inertia)によれば、実対称双線形形式の行列を適切な座標系へ取り替えて対角化したとき、正・負・零の方向の本数は変わりません。Euclid幾何では負方向が0本なので、非零ベクトルの長さの二乗は正でした。ここでは**負方向がちょうど1本**ある場合を調べます。

この小さな変更で、長さの最小化、三角不等式、直交の意味は大きく変わります。特に、ある方向へ時間を進めるベクトルだけを選ぶと、通常のCauchy–Schwarz不等式とは**逆向き**の不等式が成立します。その逆向き不等式が、因果曲線の固有時や時間分離を学ぶための代数的な土台です。

本章は有限次元の実ベクトル空間だけを対象とします。滑らかな多様体上で、点ごとに未来を連続的に選べるかは次章で扱います。

## 2. 不定値形式と標準Minkowski座標

実ベクトル空間 $V$ の対称双線形形式は、二つのベクトルから実数を得る写像です。正定値性を要求しなければ、同じ非零ベクトルを二回入れても正、負、零のいずれも起こります。零であることは、そのベクトルが零であることとは異なります。

<a id="def-lorg1-lorentz-inner-product"></a>

<!-- formal-statement-start -->
> **定義（Lorentz内積）**  
> $n\ge1$ とし、$V$ を実 $(n+1)$ 次元ベクトル空間とする。対称双線形形式 $g:V\times V\to\mathbb R$ が非退化で、その慣性指数が「負1本、正$n$本、零0本」であるとき、$g$ を符号規約 $(-,+,\ldots,+)$ の **Lorentz内積** と呼ぶ。組 $(V,g)$ をLorentzベクトル空間という。
>
> ある基底で $u=(t,x_1,\ldots,x_n)$、$v=(s,y_1,\ldots,y_n)$ と表したとき、標準形は
>
$$
g(u,v)=-ts+\sum_{j=1}^{n}x_jy_j
$$
>
> である。この座標をMinkowski座標と呼び、以下では $u=(t,\mathbf x)$ と略記する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg1-lorentz-inner-product -->
**定義の確認**。$\mathbb R^2$ 上で $g((t,x),(s,y))=-4ts+9xy$ と置く。行列は $\operatorname{diag}(-4,9)$ で行列式は $-36\ne0$、負方向と正方向が1本ずつです。$T=2t,\ X=3x$ と置けば

$$
g((t,x),(t,x))=-T^2+X^2
$$

となります。したがって $g((1,0),(1,0))=-4$、$g((0,1),(0,1))=9$、$g((3/2,1),(3/2,1))=0$ です。最後のベクトルは非零なのに二乗が零です。
<!-- definition-example-end -->

[慣性法則](../../../基礎科目/LA/LA6/index.md#thm-la6-inertia)を実対称行列に適用すると、どのLorentz内積も、適切な可逆線形座標変換後にはこの標準形になります。したがって、以下の代数的命題を標準座標で証明しても、元の双線形形式についての主張になります。ただし、**時間軸の二方向のうち、どちらを未来とするかは、この座標化だけでは決まりません**。

非退化性と正定値性も区別しましょう。非退化とは、すべての $v$ に対して $g(u,v)=0$ なら $u=0$、という意味です。一方、$g(u,u)=0$ を満たす非零 $u$ が存在しても非退化性には反しません。例えば $u=(1,1)$ は自己二乗0ですが、$v=(1,0)$ を取ると $g(u,v)=-1$ です。

## 3. 光円錐から未来を選ぶ

標準座標の二次形式は

$$
g(u,u)=-t^2+\|\mathbf x\|^2
$$

です。$g(u,u)$ の符号を使えば、正定値空間にはなかった三種類の方向を区別できます。ここで $\|\mathbf x\|$ は空間の通常のEuclidノルムです。

<a id="def-lorg1-causal-type"></a>

<!-- formal-statement-start -->
> **定義（Lorentz因果型）**  
> Lorentzベクトル空間 $(V,g)$ の非零ベクトル $u$ を、$g(u,u)<0$ なら時間的、$g(u,u)=0$ なら光的、$g(u,u)>0$ なら空間的という。時間的または光的な非零ベクトルを因果的という。零ベクトルはこれら三種類のいずれにも分類しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg1-causal-type -->
**定義の確認**。$1+1$ 次元で $(2,0)$ は $-4<0$ なので時間的、$(1,1)$ は $-1+1=0$ なので光的、$(0,1)$ は $1>0$ なので空間的です。$(0,0)$ も自己二乗は零ですが、零ベクトルを光的と呼ぶ定義ではありません。
<!-- definition-example-end -->
時間的ベクトルについては $|t|>\|\mathbf x\|$ が必要なので、$t$ の符号で二つの領域に分かれます。

どちらを未来と呼んでも代数的には同じです。以下では $t>0$ の側を選びます。原点も加えた集合を扱うと、和や極限についての性質を簡潔に述べられます。

<a id="def-lorg1-future-cone"></a>

<!-- formal-statement-start -->
> **定義（閉未来錐と時間的未来錐）**  
> 標準Lorentz空間 $(\mathbb R^{n+1},g)$ において、閉未来錐と時間的未来錐をそれぞれ
>
$$
C_+=\{(t,\mathbf x):t\ge\|\mathbf x\|\},
\qquad
C_+^\circ=\{(t,\mathbf x):t>\|\mathbf x\|\}
$$
>
> と定める。$C_+\setminus\{0\}$ の要素を未来向き因果ベクトル、$C_+^\circ$ の要素を未来向き時間的ベクトルという。境界上の非零ベクトルを未来向き光的ベクトルという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg1-future-cone -->
**定義の確認**。$n=2$ では $u=(3,2,1)$ は $3>\sqrt5$ なので時間的未来向き、$v=(\sqrt5,2,1)$ は $\sqrt5=\sqrt{2^2+1^2}$ なので光的未来向きです。一方 $(3,4,0)$ は $3<4$ なので空間的であり、$(-3,2,1)$ は時間的ですが過去向きです。未来錐は「自己二乗が非正」の集合の半分だけを選んでいます。
<!-- definition-example-end -->

この集合は空間のEuclidノルムで明示されるので、閉性も調べられます。写像 $(t,\mathbf x)\mapsto t-\|\mathbf x\|$ は連続です。その非負領域 $C_+$ は閉集合で、正領域 $C_+^\circ$ は開集合です。$C_+$ の内部は正確に $C_+^\circ$ です。等号を満たす点では時間成分を少し減らせば錐の外へ出るため、そこは内部点ではありません。特に零ベクトルは閉未来錐に含まれますが、時間的でも光的でもありません。

## 4. 未来錐の凸性――未来を足しても未来になる

通常のベクトルの和なら時間成分が打ち消し合う可能性があります。しかし未来向き同士では、どちらの時間成分も空間部分の大きさ以上です。空間部分では $\|\mathbf x+\mathbf y\|\le\|\mathbf x\|+\|\mathbf y\|$ を使うことができます。

<a id="prop-lorg1-cone-convex"></a>

<!-- formal-statement-start -->
> **命題（未来錐の凸性と正のスカラー倍）**  
> 標準Lorentz空間で $u,v\in C_+$、$a,b\ge0$ なら $au+bv\in C_+$ である。さらに $u\in C_+^\circ$、$v\in C_+$、$a>0$、$b\ge0$ なら $au+bv\in C_+^\circ$ である。従って $C_+$ は非負係数の線形結合に関して閉じており、線分も含む凸な錐である。また $C_+^\circ$ も凸である。
<!-- formal-statement-end -->

### 証明の見取り図

時間成分は加算し、空間成分のノルムはEuclid三角不等式で上から評価します。「時間成分が空間ノルム以上」という定義条件が保たれることを直接確かめます。

<!-- proof-start -->
### 証明

$u=(t,\mathbf x)$、$v=(s,\mathbf y)$ と書くと、$t\ge\|\mathbf x\|$、$s\ge\|\mathbf y\|$ です。$a,b\ge0$ に対し

$$
\|a\mathbf x+b\mathbf y\|
\le a\|\mathbf x\|+b\|\mathbf y\|
\le at+bs.
$$

左辺は $au+bv$ の空間成分のノルム、右辺はその時間成分なので $au+bv\in C_+$ です。

さらに $u\in C_+^\circ$ と $a>0$ なら $a\|\mathbf x\|<at$ です。従って

$$
\|a\mathbf x+b\mathbf y\|
\le a\|\mathbf x\|+b\|\mathbf y\|
<at+bs,
$$

よって $au+bv\in C_+^\circ$ です。$C_+^\circ$ の二点を結ぶ線分上の点では $a=\lambda$、$b=1-\lambda$、$0<\lambda<1$ と置けばよく、端点も元から含まれます。$\square$
<!-- proof-end -->

**具体例**。$1+1$ 次元で $u=(1,1)$ と $v=(1,-1)$ はともに未来向き光的ですが、その和は $(2,0)$ となり、$g(u+v,u+v)=-4<0$ の時間的未来向きです。**二つの異なる光の方向を合成すると、時間的な方向を作れる**ことが分かります。

一方 $u=(1,1)$ と $v=(-1,1)$ を加えると $(0,2)$ となり、未来向き因果ではありません。後者は未来錐の要素ではなく過去向き光的ベクトルなので、落とした仮定は「両方が未来向き」という条件です。証明中の $s\ge\|\mathbf y\|$ がここでは成立しません。

## 5. 逆Cauchy–Schwarz不等式

Euclid内積では、二つのベクトルのなす角の余弦の絶対値は1以下です。一方、未来向き時間的ベクトルでは、Lorentz内積の負号を外した値は**両者の固有時ノルムの積以上**になります。

未来向き因果ベクトルでは自己二乗が非正なので、負号を付けて平方根を取れます。光的方向も含めて扱えるよう、この量を定義します。

<a id="def-lorg1-proper-time-norm"></a>

<!-- formal-statement-start -->
> **定義（未来因果ベクトルの固有時ノルム）**  
> 標準Lorentz空間の閉未来錐 $C_+$ 上の関数 $\ell:C_+\to[0,\infty)$ を
>
$$
\ell(u)=\sqrt{-g(u,u)}
$$
>
> と定める。$\ell(0)=0$ であり、非零の光的ベクトルでも $\ell(u)=0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg1-proper-time-norm -->
**定義の確認**。$1+1$ 次元の $u=(\sqrt5,1)$ は $\sqrt5>1$ で未来向き時間的なので

$$
\ell(u)=\sqrt{5-1}=2.
$$

一方、未来向き光的な $v=(1,1)$ では $\ell(v)=\sqrt{1-1}=0$ です。非零でも値が零になるため、$\ell$ はEuclidの正定値ノルムではありません。
<!-- definition-example-end -->

<a id="thm-lorg1-reverse-cauchy-schwarz"></a>

<!-- formal-statement-start -->
> **定理（Lorentz型逆Cauchy–Schwarz不等式）**  
> $(\mathbb R^{n+1},g)$ を標準Lorentz空間、$u,v\in C_+$ を未来向き因果（零ベクトルを含む）とする。このとき
>
$$
-g(u,v)\ge\ell(u)\ell(v)
=\sqrt{-g(u,u)}\,\sqrt{-g(v,v)}
$$
>
> が成立する。特に $-g(u,v)\ge0$ である。$u,v$ がともに非零のとき等号が成立する必要十分条件は、ある $c>0$ によって $v=cu$ と書けることである。
<!-- formal-statement-end -->

### 証明の見取り図

空間ベクトルの通常のCauchy–Schwarz不等式で $\mathbf x\cdot\mathbf y$ を上から押さえます。その後、二つの時間成分 $t,s$ と空間ノルム $r,q$ を使い、平方の差が完全平方になることを確認します。等号には二段階の等号が同時に必要です。

<!-- proof-start -->
### 証明

$u=(t,\mathbf x)$、$v=(s,\mathbf y)$ とし、$r=\|\mathbf x\|$、$q=\|\mathbf y\|$ と置く。$t\ge r\ge0$、$s\ge q\ge0$ である。空間部分では通常のEuclidのCauchy–Schwarz不等式 $\mathbf x\cdot\mathbf y\le rq$ が成り立つ。$r,q>0$ なら $\|\mathbf x/r-\mathbf y/q\|^2\ge0$ を展開して従い、どちらかが零なら直接成り立つ。これを適用すると

$$
-g(u,v)=ts-\mathbf x\cdot\mathbf y\ge ts-rq\ge0.
$$

二つの非負量の平方を比較すると

$$
\begin{aligned}
(ts-rq)^2-(t^2-r^2)(s^2-q^2)
&=t^2s^2-2tsrq+r^2q^2\\
&\quad-(t^2s^2-t^2q^2-r^2s^2+r^2q^2)\\
&=t^2q^2-2tsrq+r^2s^2\\
&=(tq-sr)^2\ge0.
\end{aligned}
$$

したがって非負平方根を取って

$$
ts-rq\ge\sqrt{t^2-r^2}\sqrt{s^2-q^2}
=\ell(u)\ell(v).
$$

前の不等式とつないで主張を得る。

等号が成立するには $\mathbf x\cdot\mathbf y=rq$ と $tq=sr$ の両方が必要十分である。$u,v\ne0$ だから $t,s>0$。$tq=sr$ から $q=(s/t)r$。もし $r=0$ なら $q=0$ で、$u=(t,0)$、$v=(s,0)$ は正比例する。$r>0$ ならEuclidのCauchy–Schwarzの等号条件から $\mathbf y=(q/r)\mathbf x=(s/t)\mathbf x$ となり、時間成分も $s=(s/t)t$ なので $v=(s/t)u$。逆に $v=cu$、$c>0$ なら $g(u,v)=c\,g(u,u)$、$\ell(v)=c\ell(u)$ で等号が成立する。$\square$
<!-- proof-end -->

**時間的な直接例**。$1+1$ 次元の $u=(\cosh a,\sinh a)$、$v=(\cosh b,\sinh b)$ は $\ell(u)=\ell(v)=1$ です。双曲線関数を $\cosh a=(e^a+e^{-a})/2$、$\sinh a=(e^a-e^{-a})/2$ で表すと、積の展開から

$$
-g(u,v)=\cosh a\cosh b-\sinh a\sinh b
=\cosh(a-b)\ge1.
$$

等号は $a=b$ の場合だけです。Euclidの「角度」の代わりに、ここでは二つの時間的方向のずれを双曲角で測ることになります。

**光的な端点の注意**。両方が光的なら右辺は0ですが、左辺まで必ず0になるわけではありません。$u=(1,1)$、$v=(1,-1)$ では $-g(u,v)=2>0$ です。光的同士でも、未来の向きが異なると不等式は真に厳密になります。

## 6. 逆三角不等式と未来向きの折れ線

Euclid空間では長さの三角不等式が「直線は最短」という事実に通じます。未来向き因果ベクトルの和では、反対に

$$
\ell(u+v)\ge\ell(u)+\ell(v)
$$

となります。これが曲がった時空の局所的な時間的測地線の最大化を考える際の出発点です。ただし今は**一つの接ベクトル空間内での代数的命題**です。一般の曲線の最大化は後続の講義で別途仮定と証明を要します。

<a id="cor-lorg1-reverse-triangle"></a>

<!-- formal-statement-start -->
> **系（未来錐上の逆三角不等式）**  
> 標準Lorentz空間の任意の $u,v\in C_+$ に対して
>
$$
\ell(u+v)\ge\ell(u)+\ell(v)
$$
>
> が成立する。$u,v$ がともに非零の場合、等号が成立するのは正比例するとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

[未来錐の凸性](#prop-lorg1-cone-convex)から和が未来向きであることを確かめ、二次形式を展開します。交差項には[逆Cauchy–Schwarz不等式](#thm-lorg1-reverse-cauchy-schwarz)を適用します。

<!-- proof-start -->
### 証明

[未来錐の凸性](#prop-lorg1-cone-convex)より $u+v\in C_+$。よって次のすべての平方根は実数である。[逆Cauchy–Schwarz不等式](#thm-lorg1-reverse-cauchy-schwarz)をこの $u,v$ に適用すると

$$
\begin{aligned}
\ell(u+v)^2
&=-g(u+v,u+v)\\
&=-g(u,u)-2g(u,v)-g(v,v)\\
&=\ell(u)^2+2[-g(u,v)]+\ell(v)^2\\
&\ge\ell(u)^2+2\ell(u)\ell(v)+\ell(v)^2\\
&=(\ell(u)+\ell(v))^2.
\end{aligned}
$$

両辺が非負なので平方根を取り結論を得る。非零の二ベクトルについて等号が成立する条件は、交差項に用いた逆Cauchy–Schwarz不等式の等号条件と一致し、正比例である。$\square$
<!-- proof-end -->

**折れ線の検算**。$u=(1,1)$、$v=(1,-1)$ とすると $\ell(u)=\ell(v)=0$ ですが、和は $(2,0)$ で $\ell(u+v)=2$ です。光に沿う二本の区間を別方向につなぐと、始点と終点を結ぶ時間的直線の固有時の方が長くなります。ここで使ったのはベクトルの和だけなので、始点を任意に取って平坦時空へ配置しても同じ計算になります。

一般の未来向き折れ線では、各辺の増分が $C_+$ にある限り、上の系を繰り返して全増分の $\ell$ が各辺の $\ell$ の和以上になることが分かります。

## 7. 時間的ベクトルに直交する方向は空間的

Euclid幾何では非零ベクトルの直交補空間も正定値です。Lorentz幾何でも、**時間的な方向を一本固定してそれに直交させた部分空間**では正定値性が回復します。この結果が、時空を時間方向と空間方向に分ける基礎です。

<a id="lem-lorg1-timelike-orthogonal"></a>

<!-- formal-statement-start -->
> **補題（時間的ベクトルの直交補空間は正定値）**  
> $(V,g)$ を符号数 $(1,n)$ のLorentzベクトル空間、$u\in V$ を $g(u,u)<0$ の時間的ベクトルとする。このとき
>
$$
u^\perp=\{w\in V:g(u,w)=0\}
$$
>
> は次元 $n$ であり、$g$ の $u^\perp$ への制限は正定値である。
<!-- formal-statement-end -->

### 証明の見取り図

$u$ の方向と直交補を直和に分けます。$u$ が非零の負方向1本を占めるため、残りに負方向も零方向も残せないことを[慣性法則](../../../基礎科目/LA/LA6/index.md#thm-la6-inertia)で示します。

<!-- proof-start -->
### 証明

$g(u,u)\ne0$ なので、任意の $v\in V$ に対して

$$
v_\parallel=\frac{g(v,u)}{g(u,u)}u,\qquad
v_\perp=v-v_\parallel
$$

と置ける。すると

$$
g(v_\perp,u)
=g(v,u)-\frac{g(v,u)}{g(u,u)}g(u,u)=0.
$$

従って $V=\mathbb Ru+u^\perp$。また $au\in u^\perp$ なら $0=g(au,u)=a\,g(u,u)$ より $a=0$ だから直和である。よって $\dim u^\perp=n$。

次に $g$ の $u^\perp$ への制限が非退化であることを確認する。$w\in u^\perp$ が $u^\perp$ の全ベクトルに直交するなら、$w$ は $u$ にも直交しているので、直和 $V=\mathbb Ru\oplus u^\perp$ により $V$ の全ベクトルに直交する。$g$ が非退化だから $w=0$ である。

$u$ と $u^\perp$ の基底を連結すると $g$ の行列は負の1次ブロック $[g(u,u)]$ と、非退化な $n$ 次ブロックに分かれる。[Sylvesterの慣性法則](../../../基礎科目/LA/LA6/index.md#thm-la6-inertia)によれば全体の負方向は1本、零方向は0本である。前者を $u$ がすでに占めたため後者のブロックは正方向 $n$ 本を持つ。したがって制限形式は正定値である。$\square$
<!-- proof-end -->

**具体的な直交方向**。$1+1$ 次元で $u=(\sqrt2,1)$ とすると $g(u,u)=-1$。$w=(1,\sqrt2)$ は

$$
g(u,w)=-\sqrt2+\sqrt2=0,\qquad
g(w,w)=-1+2=1>0
$$

なので、直交方向は空間的です。逆に、光的ベクトル $k=(1,1)$ では $g(k,k)=0$ かつ $k\in k^\perp$ です。その直交補への制限は正定値にはなれません。補題で**時間的**を仮定する必要がある理由がここにあります。

## 8. Lorentz変換は二次形式を保つが、未来の向きも保つとは限らない

$1+1$ 次元の実数 $\theta$ に対し、次の写像を考えます。

$$
B_\theta=
\begin{pmatrix}
\cosh\theta&-\sinh\theta\\
-\sinh\theta&\cosh\theta
\end{pmatrix}.
$$

$t'=\cosh\theta\,t-\sinh\theta\,x$、$x'=-\sinh\theta\,t+\cosh\theta\,x$ なので

$$
\begin{aligned}
-t'^2+x'^2
&=-(\cosh\theta\,t-\sinh\theta\,x)^2\\
&\quad+(-\sinh\theta\,t+\cosh\theta\,x)^2\\
&=-(\cosh^2\theta-\sinh^2\theta)t^2\\
&\quad+(\cosh^2\theta-\sinh^2\theta)x^2\\
&=-t^2+x^2.
\end{aligned}
$$

ここまでで二次形式 $q(u)=g(u,u)$ の保存を確かめました。対称双線形形式そのものについては、任意の $u,v$ に対する偏極恒等式

$
2g(u,v)=q(u+v)-q(u)-q(v)
$

を使います。$B_\theta$ は線形で、上の計算によりすべての $w$ について $q(B_\theta w)=q(w)$ です。従って

$
\begin{aligned}
2g(B_\theta u,B_\theta v)
&=q(B_\theta(u+v))-q(B_\theta u)-q(B_\theta v)\\
&=q(u+v)-q(u)-q(v)\\
&=2g(u,v).
\end{aligned}
$

したがって $B_\theta$ は、二次形式だけでなくLorentz内積 $g$ 自体を保ちます。

さらに[閉未来錐の定義](#def-lorg1-future-cone)から $u=(t,x)\in C_+$ なら $t\ge|x|$ です。$t\ge0$ と $\cosh\theta>0$ を使って

$
t'=\cosh\theta\,t-\sinh\theta\,x
\ge(\cosh\theta-|\sinh\theta|)t
=e^{-|\theta|}t\ge0.
$

計量保存から $-t'^2+x'^2=-t^2+x^2\le0$ も成り立つため、$|x'|\le t'$、すなわち $B_\theta u\in C_+$ です。$t=0$ なら錐の条件から $x=0$ なので、非零の未来因果ベクトルについては $t'>0$ です。

ただし $R(t,x)=(-t,x)$ も $-t^2+x^2$ を保つ一方、$R(1,0)=(-1,0)$ です。**計量を保つことと未来を保つことは別条件**です。これは一般のLorentz多様体で時間向きを指定する必要性につながります。

## 9. 演習

以下では指定がなければ $g((t,\mathbf x),(s,\mathbf y))=-ts+\mathbf x\cdot\mathbf y$、$C_+=\{t\ge\|\mathbf x\|\}$、$\ell(u)=\sqrt{-g(u,u)}$（$u\in C_+$）とします。座標の先頭成分は時間です。

### Level A

<a id="ex-lorg1-a01"></a>
#### LORG1-A01 不定値と非退化性
- Level: A

$\mathbb R^2$ の双線形形式 $g((t,x),(s,y))=-2ts+8xy$ の慣性指数を求め、非零の光的ベクトルを一つ挙げよ。また非退化性を確かめよ。

<!-- solution-start -->
**詳細解答**。表現行列は $A=\operatorname{diag}(-2,8)$ で、固有値は $-2,8$。負方向1本、正方向1本、零方向0本なのでLorentz内積です。行列式は $(-2)\cdot8=-16\ne0$ で非退化です。$g((t,x),(t,x))=-2t^2+8x^2=0$ から $t^2=4x^2$、例えば $(2,1)\ne0$ が光的です。非零でも自己二乗が零であることは非退化性と矛盾しません。
<!-- solution-end -->

<a id="ex-lorg1-a02"></a>
#### LORG1-A02 因果型と向きの判定
- Level: A

$1+2$ 次元で $u=(3,2,1)$、$v=(\sqrt5,2,1)$、$w=(2,3,0)$、$z=(-3,2,1)$ の因果型と未来錐への所属を分類せよ。

<!-- solution-start -->
**詳細解答**。各自己二乗は

$$
\begin{aligned}
g(u,u)&=-9+4+1=-4<0,\\
g(v,v)&=-5+4+1=0,\\
g(w,w)&=-4+9+0=5>0,\\
g(z,z)&=-9+4+1=-4<0.
\end{aligned}
$$

$u$ は $3>\sqrt5$ なので未来向き時間的、$v$ は $\sqrt5=\|(2,1)\|$ なので未来向き光的です。$w$ は空間的で錐に属しません。$z$ は時間的ですが時間成分が負なので過去向き、$C_+$ に属しません。
<!-- solution-end -->

<a id="ex-lorg1-a03"></a>
#### LORG1-A03 二つの光的方向の和
- Level: A

$1+1$ 次元で $u=(2,2)$、$v=(3,-3)$ が未来向き光的であることを確認し、$u+v$ の因果型と $\ell(u+v)$ を求めよ。

<!-- solution-start -->
**詳細解答**。$u$ は $2=|2|$、$v$ は $3=|-3|$ なので両方とも未来向き光的です。和は $(5,-1)$ となり $5>|-1|$ なので未来向き時間的です。二乗と長さは

$$
g(u+v,u+v)=-5^2+(-1)^2=-24,\qquad
\ell(u+v)=\sqrt{24}=2\sqrt6.
$$

各辺の $\ell$ は零でも、向きが異なるため和の $\ell$ は正になります。
<!-- solution-end -->

<a id="ex-lorg1-a04"></a>
#### LORG1-A04 時間的ベクトルの直交補
- Level: A

$1+1$ 次元の $u=(\sqrt5,2)$ の直交補 $u^\perp$ を求め、その上で $g$ が正定値であることを直接計算せよ。

<!-- solution-start -->
**詳細解答**。$w=(a,b)$ に対して直交条件は $-\sqrt5a+2b=0$、従って $b=\sqrt5a/2$ です。$a=2c$ と置くと $w=c(2,\sqrt5)$ と表されます。従って

$$
g(w,w)=c^2(-2^2+(\sqrt5)^2)=c^2.
$$

$w\ne0$ は $c\ne0$ に対応し、そのとき $g(w,w)>0$。よって $u^\perp$ への制限は正定値です。ここでは $g(u,u)=-5+4=-1<0$ を用いました。
<!-- solution-end -->

<a id="ex-lorg1-a05"></a>
#### LORG1-A05 逆Cauchy–Schwarzの数値検算
- Level: A

$1+1$ 次元で $u=(5,3)$、$v=(\sqrt5,1)$ について $\ell(u)$、$\ell(v)$、$-g(u,v)$ を計算し、[逆Cauchy–Schwarz不等式](#thm-lorg1-reverse-cauchy-schwarz)を検算せよ。

<!-- solution-start -->
**詳細解答**。$5>3$、$\sqrt5>1$ で両方未来向き時間的です。

$$
\ell(u)=\sqrt{25-9}=4,\qquad
\ell(v)=\sqrt{5-1}=2.
$$

また

$$
-g(u,v)=5\sqrt5-3.
$$

これが $8$ 以上であることは $5\sqrt5\ge11$ と同値です。両辺が非負なので二乗して $125\ge121$ を確認できます。したがって $5\sqrt5-3>8=\ell(u)\ell(v)$。二ベクトルは正比例していないため、厳密不等号も[等号条件](#thm-lorg1-reverse-cauchy-schwarz)と整合します。
<!-- solution-end -->

### Level B

<a id="ex-lorg1-b01"></a>
#### LORG1-B01 逆三角不等式の証明と検算
- Level: B

未来向き因果ベクトル $u,v\in C_+$ に対し、[逆Cauchy–Schwarz不等式](#thm-lorg1-reverse-cauchy-schwarz)を使って逆三角不等式を導け。さらに $1+1$ 次元の $u=(2,1)$、$v=(3,-1)$ で値を比較せよ。

<!-- solution-start -->
**詳細解答**。[未来錐の凸性](#prop-lorg1-cone-convex)から $u+v\in C_+$。[逆Cauchy–Schwarz不等式](#thm-lorg1-reverse-cauchy-schwarz)より $-g(u,v)\ge\ell(u)\ell(v)$。従って

$$
\begin{aligned}
\ell(u+v)^2
&=-g(u+v,u+v)\\
&=\ell(u)^2-2g(u,v)+\ell(v)^2\\
&\ge(\ell(u)+\ell(v))^2.
\end{aligned}
$$

両辺非負なので平方根を取って $\ell(u+v)\ge\ell(u)+\ell(v)$ です。例では

$$
\ell(u)=\sqrt{4-1}=\sqrt3,\quad
\ell(v)=\sqrt{9-1}=2\sqrt2,\quad
\ell(u+v)=\ell(5,0)=5.
$$

$\sqrt3+2\sqrt2<5$ です。実際、平方した値 $11+4\sqrt6$ は $25$ より小さいです（$\sqrt6<7/2$）。$u,v$ が正比例しないため厳密になる点も検算できています。
<!-- solution-end -->

<a id="ex-lorg1-b02"></a>
#### LORG1-B02 非対角のLorentz形式と未来錐
- Level: B

$\mathbb R^2$ 上の $g((x,y),(a,b))=-xb-ya$ を考える。$T=(x+y)/\sqrt2,\ X=(x-y)/\sqrt2$ で標準形になることを確かめ、$T\ge|X|$ に対応する $(x,y)$ の領域を求めよ。

<!-- solution-start -->
**詳細解答**。自己二乗は $g((x,y),(x,y))=-2xy$。逆変換は $x=(T+X)/\sqrt2$、$y=(T-X)/\sqrt2$ なので

$$
-2xy=-(T+X)(T-X)=-T^2+X^2.
$$

表現行列は $\begin{pmatrix}0&-1\\-1&0\end{pmatrix}$ で固有値は $-1,1$、よって非退化なLorentz形式です。$T\ge|X|$ は $T+X\ge0$ かつ $T-X\ge0$ と同値です。逆変換からこれは $x\ge0,\ y\ge0$ に一致します。境界の $x=0$ または $y=0$ は $g(u,u)=-2xy=0$ の光的半直線、内部の $x>0,y>0$ は時間的です。時間の正向きは標準座標で $T\ge0$ と選んだものです。
<!-- solution-end -->

<a id="ex-lorg1-b03"></a>
#### LORG1-B03 計量保存と時間反転の違い
- Level: B

$1+1$ 次元の $B_\theta$ と $R(t,x)=(-t,x)$ について、どちらもLorentz内積を保つことを計算し、未来錐を保つのはどちらか調べよ。

<!-- solution-start -->
**詳細解答**。$c=\cosh\theta$、$s=\sinh\theta$ と置くと $c^2-s^2=1$ です。$B_\theta(t,x)=(ct-sx,-st+cx)$ から

$$
\begin{aligned}
g(B_\theta u,B_\theta u)
&=-(ct-sx)^2+(-st+cx)^2\\
&=-(c^2-s^2)t^2+(c^2-s^2)x^2\\
&=-t^2+x^2=g(u,u).
\end{aligned}
$$

対称双線形形式は $2g(u,v)=g(u+v,u+v)-g(u,u)-g(v,v)$ で復元できるので、自己二乗の保存からすべての内積が保存されます。$u\in C_+$ なら

$$
(B_\theta u)_t=ct-sx\ge(c-|s|)t=e^{-|\theta|}t\ge0,
$$

かつ二乗が非正のままなので $B_\theta u\in C_+$。一方 $g(Ru,Ru)=-(-t)^2+x^2=g(u,u)$ ですが、$R(1,0)=(-1,0)\notin C_+$ です。失われるのは計量保存ではなく未来向きの保存です。
<!-- solution-end -->

### Level C

<a id="ex-lorg1-c01"></a>
#### LORG1-C01 因果折れ線の上界と等号条件
- Level: C

標準Lorentz空間で $m\ge2$ とし、非零の未来向き因果ベクトル $v_1,\ldots,v_m\in C_+\setminus\{0\}$ を取る。$V=\sum_{j=1}^m v_j$ とするとき

$$
\sum_{j=1}^m\ell(v_j)\le\ell(V)
$$

を証明し、等号成立条件を求めよ。さらに $1+1$ 次元で $v_1=(1,1)$、$v_2=(2,0)$、$v_3=(1,-1)$ を代入し、すべての固有時を計算せよ。

<!-- solution-start -->
**詳細解答**。まず[未来錐の凸性](#prop-lorg1-cone-convex)を繰り返すと、任意の部分和 $S_k=\sum_{j=1}^k v_j$ は $C_+$ に属します。各 $v_j$ は非零で時間成分が正だから $S_k$ も非零です。[逆三角不等式](#cor-lorg1-reverse-triangle)を $S_k$ と $v_{k+1}$ に適用すると

$$
\ell(S_{k+1})\ge\ell(S_k)+\ell(v_{k+1}).
$$

$k=1$ から $m-1$ まで帰納すれば

$$
\ell(S_m)\ge\ell(v_1)+\cdots+\ell(v_m)
$$

が得られます。等号なら、この連鎖の各段が等号でなければなりません。最初の段で[逆三角不等式の等号条件](#cor-lorg1-reverse-triangle)から $v_2=c_2v_1$、$c_2>0$。次の段では $S_2=(1+c_2)v_1$ と $v_3$ が正比例するので $v_3=c_3v_1$、$c_3>0$。同じ帰納を続けると、すべての $v_j$ が同一の非零未来因果ベクトルに正比例します。逆に $v_j=c_jw$、$c_j>0$ なら $\ell(v_j)=c_j\ell(w)$ かつ $\ell(V)=(\sum_jc_j)\ell(w)$ となり等号です。

数値例は $\ell(v_1)=0$、$\ell(v_2)=2$、$\ell(v_3)=0$ です。合計は $V=(4,0)$ だから

$$
\sum_{j=1}^3\ell(v_j)=2,\qquad \ell(V)=4.
$$

厳密不等号になるのは三本の方向が正比例していないためです。時間成分がどれも正であること、零でないという仮定が等号条件の帰納に使われたことも確認できました。
<!-- solution-end -->

## 10. 次に何を考えるか

ここまでで分かったことは次の三点です。負方向が一本ある非退化形式は標準Minkowski形へ還元できること、時間向きを一つ選ぶと未来錐は凸になること、そして未来錐内では逆Cauchy–Schwarzと逆三角不等式が成立することです。

ただし、一つのベクトル空間で未来を選んだだけでは、曲がった多様体の各接空間で選択を滑らかにつなげられるとは限りません。次章では、Lorentz計量を多様体上のテンソル場として定義し、時間向きの選択が大域的に可能かを調べます。
