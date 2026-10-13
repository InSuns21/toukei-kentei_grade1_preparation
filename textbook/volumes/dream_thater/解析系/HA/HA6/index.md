# HA6 BMOと端点の見取り図

[HA5のCalderón–Zygmund作用素の強型定理](../HA5/index.md#thm-ha5-stronglp)は $1<p<\infty$ で $L^p$ ノルムを保ちました。しかし $p=\infty$ を代入することはできません。実際、Hilbert変換を有界な区間の指示関数に作用させるだけで、境界付近に対数発散が生じます。

それでも、変換後の関数は「どの立方体で見ても、平均との差は平均的には大きくない」という性質を保ちます。点ごとの最大値を要求する代わりに**局所平均からの振動**を測るのが BMO です。さらに、その平均振動を制御できれば、大きな偏差を示す点は指数的に少ないことを証明します。

## 1. 絶対値ではなく平均からの揺れを見る

例えば $f(x)=7$ は大きい値を取っても、各区間で平均から全く揺れません。一方、$f=\boldsymbol1_{[0,1)}$ は境界をまたぐ区間では揺れますが、その量は常に有限です。平均からのずれを測ると、定数を加えても値が変わらない尺度ができます。

<a id="def-ha6-bmo"></a>
<!-- formal-statement-start -->
> **定義（有界平均振動：BMO）**  
> $d\ge1$ とし、複素数値 $f\in L^1_{\mathrm{loc}}(\mathbb R^d)$ に対して、軸に平行な有界な立方体 $Q$ の平均を
>
$$
f_Q=\frac1{|Q|}\int_Q f(x)\,dx
$$
>
> と書く。BMO半ノルムを
>
$$
\|f\|_{\mathrm{BMO}}
=\sup_Q\frac1{|Q|}\int_Q|f(x)-f_Q|\,dx
$$
>
> と定義する。右辺が有限である関数の集合を $\mathrm{BMO}(\mathbb R^d)$ と呼ぶ。関数はほとんど至る所の一致で同一視する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha6-bmo -->
**定義の確認**　$f=\boldsymbol1_E$（$E$ は可測）とすると、任意の立方体 $Q$ で $\theta=|E\cap Q|/|Q|\in[0,1]$ とおけます。$f_Q=\theta$ であり、

$$
\begin{aligned}
\frac1{|Q|}\int_Q|f-f_Q|
&=\theta|1-\theta|+(1-\theta)|0-\theta|\\
&=2\theta(1-\theta)
=\frac12-2\left(\theta-\frac12\right)^2\le\frac12.
\end{aligned}
$$

したがって指示関数は BMO に属します。特にこれは $\|f\|_\infty=1$ と独立に検算した結果です。
<!-- definition-example-end -->

<a id="prop-ha6-seminorm"></a>
<!-- formal-statement-start -->
> **命題（定数による商と基本評価）**  
> $f,g\in\mathrm{BMO}(\mathbb R^d)$、$a,b\in\mathbb C$ とする。このとき
>
$$
\|af+bg\|_{\mathrm{BMO}}
\le |a|\|f\|_{\mathrm{BMO}}+|b|\|g\|_{\mathrm{BMO}},
\qquad
\|f+c\|_{\mathrm{BMO}}=\|f\|_{\mathrm{BMO}}
$$
>
> が任意の定数 $c\in\mathbb C$ に対して成り立つ。また $\|f\|_{\mathrm{BMO}}=0$ と $f$ がほとんど至る所で定数であることは同値であり、
>
$$
\|f\|_{\mathrm{BMO}}\le2\|f\|_\infty
\quad(f\in L^\infty)
$$
>
> が成立する。したがって BMO は定数関数全体による商でノルム空間として扱う。
<!-- formal-statement-end -->

### 証明の見取り図

平均を取る操作が線形であるため、差 $f-f_Q$ へ三角不等式を適用します。半ノルムが零なら各立方体上で定数となり、それらの定数は包含関係から一致します。

<!-- proof-start -->
### 証明

$(af+bg)_Q=af_Q+bg_Q$ を代入して

$$
\frac1{|Q|}\int_Q|(af+bg)-(af+bg)_Q|
\le |a|\frac1{|Q|}\int_Q|f-f_Q|
+|b|\frac1{|Q|}\int_Q|g-g_Q|.
$$

すべての $Q$ について上限を取ります。$(f+c)_Q=f_Q+c$ なので、定数を加えた場合の振動は変化しません。

$\|f\|_{\mathrm{BMO}}=0$ ならすべての立方体 $Q$ で非負関数 $|f-f_Q|$ の積分が零です。よって $f=f_Q$ が $Q$ 上ほとんど至る所で成立します。整数 $n\ge1$ に対する $Q_n=[-n,n)^d$ は入れ子で $\bigcup_nQ_n=\mathbb R^d$ です。$Q_n\subset Q_{n+1}$ 上の二つの定数値はほとんど至る所で等しいため、すべての $f_{Q_n}$ は同一です。逆向きは定義に代入すれば分かります。

最後に $|f_Q|\le\|f\|_\infty$ だから、ほとんどすべての $x\in Q$ で $|f(x)-f_Q|\le2\|f\|_\infty$ です。平均と上限を取ると不等式を得ます。
<!-- proof-end -->

ここまでから $L^\infty\subset\mathrm{BMO}$ です。逆包含が偽になることを次で直接確認します。

## 2. 対数関数は非有界でも BMO

対数の特異性は点ごとには無限大ですが、立方体の尺度を変えると加法定数しか変わりません。BMO が定数を無視することと噛み合う典型例です。

<a id="prop-ha6-log"></a>
<!-- formal-statement-start -->
> **命題（非有界な BMO 関数）**  
> 任意の $d\ge1$ に対して
>
$$
f(x)=\log|x|\quad(x\ne0)
$$
>
> は $\mathrm{BMO}(\mathbb R^d)$ に属するが、$L^\infty(\mathbb R^d)$ には属さない。原点での値は任意に定めてよい。
<!-- formal-statement-end -->

### 証明の見取り図

立方体が原点から遠ければ、線分上の $\log|x|$ の変化率を距離の逆数で抑えられます。原点に近い立方体では、辺長による変数変換で $\log\ell(Q)$ が定数として消えます。この二場合で立方体に依存しない上界を作ります。

<!-- proof-start -->
### 証明

$\int_{|x|<1}|\log|x||\,dx=|S^{d-1}|\int_0^1r^{d-1}|\log r|\,dr<\infty$ です。最後の積分は $u=-\log r$ とおくと $\int_0^\infty ue^{-du}\,du=d^{-2}$ です。したがって $f\in L^1_{\mathrm{loc}}$ です。

$Q$ の辺長を $\ell$、中心を $c$ とします。まず $\operatorname{dist}(0,Q)\ge2\sqrt d\,\ell$ なら、$x,y\in Q$ を結ぶ線分は $Q$ 内にあり、どの点 $z$ も $|z|\ge2\sqrt d\,\ell$ です。$z(s)=y+s(x-y)$、$\phi(s)=\log|z(s)|$ ($0\le s\le1$) と置きます。すべての $s$ で $z(s)\in Q$ なので $|z(s)|\ge2\sqrt d\,\ell$ です。$|z(s)|^2$ を微分すれば $2z(s)\cdot(x-y)$、さらに対数を微分して

$$
\phi'(s)=\frac{z(s)\cdot(x-y)}{|z(s)|^2},\qquad
|\phi'(s)|\le\frac{|x-y|}{|z(s)|}
\le\frac{\sqrt d\,\ell}{2\sqrt d\,\ell}=\frac12.
$$

[平均値の定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-mvt)を $\phi$ の区間 $[0,1]$ に適用して $|f(x)-f(y)|=|\phi(1)-\phi(0)|\le1/2$ を得ます。

従って $|f(x)-f_Q|\le |Q|^{-1}\int_Q|f(x)-f(y)|\,dy\le1/2$、その平均も $1/2$ 以下です。

残る場合は $\operatorname{dist}(0,Q)<2\sqrt d\,\ell$ です。$Q$ の一点 $z$ が $|z|<2\sqrt d\,\ell$ を満たし、任意の $x\in Q$ について

$$
|x|\le|x-z|+|z|<(3\sqrt d)\ell.
$$

ここで $a=\log\ell$ とおき、任意の定数 $a$ に対して

$$
\frac1{|Q|}\int_Q|f-f_Q|
\le\frac2{|Q|}\int_Q|f-a|
$$

であることを使います。実際 $|f_Q-a|\le|Q|^{-1}\int_Q|f-a|$ と三角不等式を足せばよいのです。$x=\ell y$ で変数変換すると

$$
\frac2{|Q|}\int_Q|\log|x|-\log\ell|\,dx
=2\int_{\ell^{-1}Q}|\log|y||\,dy
\le2\int_{|y|<3\sqrt d}|\log|y||\,dy=:C_d<\infty.
$$

二場合を合わせ $\|f\|_{\mathrm{BMO}}\le\max(1/2,C_d)$ です。一方 $\log|x|\to-\infty$（$|x|\to0$）、$\log|x|\to+\infty$（$|x|\to\infty$）で、それぞれ正測度の集合上で任意に大きな絶対値を取るため、本質的有界ではありません。
<!-- proof-end -->

この例は単に「発散してもよい」と言っているのではありません。**どの尺度で見ても平均からの差が一様に抑えられる**という強い条件を実際に確認しました。

## 3. John–Nirenberg不等式：大きな揺れは指数的に少ない

BMO の定義に書かれたのは一次の平均振動だけです。それなのに極端なずれの割合まで指数関数で抑えられるのは、立方体を繰り返し細分化する構造のおかげです。[HA4の二進立方体の親子関係](../HA4/index.md#def-ha4-dyadic-cubes)を、今度は各立方体の内部に適用します。

<a id="lem-ha6-stopping"></a>
<!-- formal-statement-start -->
> **補題（局所停止立方体）**  
> $d\ge1$、$f\in\mathrm{BMO}(\mathbb R^d)$ とし、$M=\|f\|_{\mathrm{BMO}}>0$ とする。任意の軸平行立方体 $Q$ と $K>1$ に対し、$Q$ を各座標で半分ずつ割る局所二進分割を考える。$g=|f-f_Q|$ の平均が $KM$ を超える包含極大な真の子孫立方体を $\{Q_j\}$ とすると、これらは互いに素で
>
$$
\sum_j|Q_j|\le K^{-1}|Q|,
\qquad
KM<\frac1{|Q_j|}\int_{Q_j}g\le2^dKM.
$$
>
> また $\bigcup_jQ_j$ の外側では $g(x)\le KM$ がほとんど至る所で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

極大立方体の親では閾値を超えないため、子の平均の上界が得られます。体積評価には $\int_Qg\le M|Q|$ を使います。外側の点については、細分した立方体の平均が元の関数値へ収束することを使います。

<!-- proof-start -->
### 証明

$Q$ 自身での $g$ の平均は $\le M<KM$ です。閾値を超える任意の子孫から親を上へたどれば、$Q$ へ到達する前に閾値を超えなくなるので、包含極大な立方体に含まれます。局所二進立方体は入れ子か互いに素であるため、極大族は互いに素です。

$Q_j$ の親 $Q_j^{\mathrm p}$ の平均は $KM$ 以下で、体積は $2^d|Q_j|$ です。非負性を利用し

$$
\int_{Q_j}g
\le\int_{Q_j^{\mathrm p}}g
\le KM\,2^d|Q_j|.
$$

下界は選択条件そのものです。さらに互いに素であることから

$$
KM\sum_j|Q_j|
<\sum_j\int_{Q_j}g
\le\int_Q|f-f_Q|
\le M|Q|.
$$

有限部分和に同じ評価を適用し極限を取ると、主張の非厳密な体積上界を得ます。

選択族の外側の点 $x$ を固定すると、その点を含む局所二進立方体はすべて $g$ の平均が $\le KM$ です。[$\mathbb R^d$ のLebesgue微分定理](../HA1/index.md#thm-ha1-differentiation)をこの縮小立方体列に適用すると、ほとんどすべてのそのような $x$ で $g(x)\le KM$ となります。
<!-- proof-end -->

<a id="thm-ha6-john-nirenberg"></a>
<!-- formal-statement-start -->
> **定理（John–Nirenberg不等式：立方体版）**  
> $d\ge1$、$f\in\mathrm{BMO}(\mathbb R^d)$、$M=\|f\|_{\mathrm{BMO}}$ とする。任意の軸平行立方体 $Q$ と $t>0$ に対し、$M>0$ のとき
>
$$
\bigl|\{x\in Q:|f(x)-f_Q|>t\}\bigr|
\le2|Q|\exp\left(-\frac{(\log2)t}{2^{d+1}M}\right).
$$
>
> $M=0$ の場合、左辺は零である。定数は次元 $d$ のみに依存する。
<!-- formal-statement-end -->

### 証明の見取り図

一回の停止で、危険な立方体の総体積を半分に減らします。残った立方体では平均値の中心を変更しますが、その差は一回当たり $2^{d+1}M$ 以内です。よって、中心からの偏差の閾値を一定量増やすたびに、悪い点の割合は半分以下になります。

<!-- proof-start -->
### 証明

$M=0$ なら[定数による商と基本評価](#prop-ha6-seminorm)から $f$ はほとんど至る所定数なので成立します。以下 $M>0$ とし、[停止立方体補題](#lem-ha6-stopping)で $K=2$ を選びます。$A=2^{d+1}$ とおくと

$$
\sum_j|Q_j|\le\frac12|Q|,
\qquad
|f_{Q_j}-f_Q|
\le\frac1{|Q_j|}\int_{Q_j}|f-f_Q|
\le AM.
$$

選択立方体の外側では $|f-f_Q|\le2M\le AM$ です。したがって任意の $s\ge0$ に対し

$$
\{x\in Q:|f(x)-f_Q|>s+AM\}
\subset\bigcup_j
\{x\in Q_j:|f(x)-f_{Q_j}|>s\}
$$

が零集合を除いて成り立ちます。右辺への包含では、各 $Q_j$ 上の

$$
|f(x)-f_{Q_j}|
\ge|f(x)-f_Q|-|f_Q-f_{Q_j}|
> s+AM-AM=s
$$

を用いました。

各立方体 $P$、$s\ge0$ について割合を

$$
F_P(s)=\frac1{|P|}
\bigl|\{x\in P:|f(x)-f_P|>s\}\bigr|,
\qquad
F(s)=\sup_PF_P(s)
$$

と定めます。上の包含、非交差性、総体積の上界を順に使うと

$$
\begin{aligned}
F_Q(s+AM)
&\le\frac1{|Q|}\sum_j|Q_j|F_{Q_j}(s)\\
&\le\frac{\sum_j|Q_j|}{|Q|}F(s)
\le\frac12F(s).
\end{aligned}
$$

$Q$ を動かして $F(s+AM)\le F(s)/2$ を得ます。$F(0)\le1$ なので帰納法で $F(nAM)\le2^{-n}$（$n=0,1,2,\ldots$）。任意の $t>0$ に $n=\lfloor t/(AM)\rfloor$ を選べば、$F_Q$ は $t$ に関して非増加であり、

$$
F_Q(t)\le F(nAM)\le2^{-n}
\le2\cdot 2^{-t/(AM)}
=2\exp\left(-\frac{(\log2)t}{AM}\right).
$$

$A=2^{d+1}$ を戻して結論です。
<!-- proof-end -->

**どこに BMO を使ったか。**　最初の停止の体積には $\int_Q|f-f_Q|\le M|Q|$ が必要で、同じ上界を各子孫 $Q_j$ でも再利用しました。最初の立方体だけの平均を制御しても、停止後の反復は閉じません。

<a id="cor-ha6-lp-oscillation"></a>
<!-- formal-statement-start -->
> **系（高次の平均振動）**  
> 上の仮定で $1\le p<\infty$ とする。ある次元と $p$ のみに依存する $C_{d,p}$ が存在して、すべての立方体 $Q$ で
>
$$
\left(\frac1{|Q|}\int_Q|f-f_Q|^p\right)^{1/p}
\le C_{d,p}\|f\|_{\mathrm{BMO}}.
$$
>
> 特に BMO 関数は各有界立方体上で任意の有限次数 $p$ に関して可積分である。
<!-- formal-statement-end -->

### 証明の見取り図

偏差の $p$ 乗を、偏差が閾値を超える集合の測度の積分で表します。指数減衰があるので、どの有限次数の重み $t^{p-1}$ を掛けても積分が収束します。

<!-- proof-start -->
### 証明

$M=0$ は自明です。$M>0$ とし $c_d=(\log2)/2^{d+1}$ と置きます。非負関数 $h=|f-f_Q|$ に対して $h(x)^p=\int_0^{h(x)}pt^{p-1}\,dt$ です。$(x,t)$ 上の非負関数 $pt^{p-1}\boldsymbol1_{\{0<t<h(x)\}}$ の積分順序を交換すると

$$
\begin{aligned}
\frac1{|Q|}\int_Qh(x)^p\,dx
&=\int_0^\infty pt^{p-1}\frac{|\{x\in Q:h(x)>t\}|}{|Q|}\,dt\\
&\le2p\int_0^\infty t^{p-1}e^{-c_dt/M}\,dt\\
&=2p\left(\frac M{c_d}\right)^p
\int_0^\infty u^{p-1}e^{-u}\,du\\
&=2\Gamma(p+1)\left(\frac M{c_d}\right)^p.
\end{aligned}
$$

二行目は[John–Nirenberg不等式](#thm-ha6-john-nirenberg)、三行目は $u=c_dt/M$ の置換です。従って $C_{d,p}=(2\Gamma(p+1))^{1/p}/c_d$ を選べます。
<!-- proof-end -->

## 4. Calderón–Zygmund作用素の本当の端点

なぜ「有界関数を入れても像は有界とは限らない」のに、平均振動なら制御できるのでしょうか。立方体 $Q$ に対して、近くの入力は $L^2$ 有界性で処理し、遠くの入力は**二点間の核の差**だけを評価すると、発散しやすい遠方の定数成分を消せます。

<a id="thm-ha6-cz-endpoint"></a>
<!-- formal-statement-start -->
> **定理（標準Calderón–Zygmund作用素の端点）**  
> $d\ge1$、$0<\delta\le1$ とする。$T$ は[HA5の $L^2$ Calderón–Zygmund作用素](../HA5/index.md#def-ha5-cz-operator)で、核のサイズ・**第1変数の滑らかさ**の定数を $A$、$L^2$ 作用素ノルムを $B$ とする。このときコンパクト台を持つ $f\in L^\infty(\mathbb R^d)$ に対して
>
$$
\|Tf\|_{\mathrm{BMO}}\le C_{d,\delta}(A+B)\|f\|_\infty.
$$
>
> さらに $T$ は一般の $L^\infty(\mathbb R^d)$ から $\mathrm{BMO}(\mathbb R^d)$ の定数による商へ線形に延長でき、上の BMO 評価を満たす。後者の像は定数を除いて定まるもので、絶対収束する核積分や点ごとの主値を一般の有界入力に対して主張するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

近くの部分 $f_1$ は $L^2$ に属します。遠くの部分 $f_2$ は $x\in Q$ に対して特異点を持たないので、$K(x,y)$ から $K(c_Q,y)$ を引きます。この差に第1変数の滑らかさを使うと、無限遠でも積分できる減衰が現れます。一般の $L^\infty$ 入力は切断による局所極限を取ります。

<!-- proof-start -->
### 証明

**(1) コンパクト台の入力。**　$Q$ の辺長を $\ell$、中心を $c$ とし、同じ中心で辺長 $4\sqrt d\,\ell$ の立方体を $Q^*$ とします。$f_1=f\boldsymbol1_{Q^*}$、$f_2=f\boldsymbol1_{(Q^*)^c}$ です。$f_1,f_2\in L^2$ で $Tf=Tf_1+Tf_2$。

$x\in Q$ なら $|x-c|\le\sqrt d\,\ell/2$、$y\notin Q^*$ なら $|y-c|\ge2\sqrt d\,\ell$ です。従って $|x-c|\le|y-c|/4$ であり、[標準核の第1変数の滑らかさ](../HA5/index.md#def-ha5-standard-kernel)の適用条件が成立します。

$Q$ と $f_2$ の台は離れているので、対角線外での核表示を使い、

$$
Tf_2(x)-a_Q
=\int_{(Q^*)^c}[K(x,y)-K(c,y)]f(y)\,dy,
\qquad
a_Q=\int_{(Q^*)^c}K(c,y)f(y)\,dy
$$

と書けます（$a_Q$ はコンパクト台の仮定により絶対収束）。滑らかさと極座標による積分から

$$
\begin{aligned}
|Tf_2(x)-a_Q|
&\le A\|f\|_\infty|x-c|^\delta
\int_{|y-c|\ge2\sqrt d\,\ell}|y-c|^{-d-\delta}\,dy\\
&=A\|f\|_\infty|x-c|^\delta
\frac{|S^{d-1}|}{\delta}(2\sqrt d\,\ell)^{-\delta}\\
&\le \frac{|S^{d-1}|}{\delta\,4^\delta}\,A\|f\|_\infty.
\end{aligned}
$$

他方、$Q$ 上の $Tf_1$ の平均絶対値は Cauchy–Schwarz と $L^2$ 有界性を順に使い、

$$
\begin{aligned}
\frac1{|Q|}\int_Q|Tf_1|
&\le |Q|^{-1/2}\|Tf_1\|_2\\
&\le B|Q|^{-1/2}\|f_1\|_2\\
&\le B\left(\frac{|Q^*|}{|Q|}\right)^{1/2}\|f\|_\infty
=B(4\sqrt d)^{d/2}\|f\|_\infty.
\end{aligned}
$$

両者を足して $|Q|^{-1}\int_Q|Tf-a_Q|\le C_{d,\delta}(A+B)\|f\|_\infty$ です。任意の局所定数 $a$ について $|(Tf)_Q-a|\le|Q|^{-1}\int_Q|Tf-a|$ だから、

$$
\frac1{|Q|}\int_Q|Tf-(Tf)_Q|
\le\frac2{|Q|}\int_Q|Tf-a_Q|
\le C'_{d,\delta}(A+B)\|f\|_\infty.
$$

$Q$ に関する上限を取ります。**ここで必要なのは第1変数の滑らかさ**です。第2変数の滑らかさは HA5 の弱型証明で別の役割を担いました。

**(2) 一般の有界入力。**　$R\to\infty$ とともに増大する原点中心の立方体 $D_R=[-R,R)^d$ を用い、$f_R=f\boldsymbol1_{D_R}$ とします。各 $f_R\in L^2\cap L^\infty$ で、(1)の BMO 評価は $R$ に依らず成立します。

固定した立方体 $Q_0=[-1,1)^d$ 上の平均を引き $u_R=Tf_R-(Tf_R)_{Q_0}$ とします。任意の有界立方体 $P$ に対し、$R<S$ が $P\cup Q_0$ を十分大きく含むとします。$h=f_S-f_R$ は遠方の殻 $D_S\setminus D_R$ に台を持ち、任意の $x\in P,z\in Q_0$ に対して核表示で

$$
Th(x)-Th(z)
=\int_{D_S\setminus D_R}[K(x,y)-K(z,y)]f(y)\,dy.
$$

$R$ を十分大きくすると $|x-z|\le|z-y|/2$ なので、第1変数の核条件が使えます。$P\cup Q_0$ の直径を $D$ と書けば

$$
|Th(x)-Th(z)|
\le C_{d,\delta}A D^\delta\|f\|_\infty
\int_{|y|\ge R}|y|^{-d-\delta}\,dy
\le C_{P,d,\delta}A\|f\|_\infty R^{-\delta}.
$$

$z$ について $Q_0$ 平均を取ると、$u_S-u_R$ は $P$ 上ほとんど至る所で右辺以下です。従って $(u_R)$ は各有界立方体上で $L^1$ の Cauchy 列となり、同一の $u\in L^1_{\mathrm{loc}}$ へ収束します。各 $P$ で $(u_R)_P\to u_P$ だから

$$
\frac1{|P|}\int_P|u-u_P|
=\lim_{R\to\infty}\frac1{|P|}\int_P|u_R-(u_R)_P|
\le C'_{d,\delta}(A+B)\|f\|_\infty.
$$

この $u$ の定数による同値類を $Tf$ と定めます。線形性は $f_R$ と平均を引く操作の線形性、切断の選び方によらないことは遠方の核差に同じ評価を使うことで従います。
<!-- proof-end -->

**具体的な端点の失敗。**　[HA3のHilbert変換の主値核](../HA3/index.md#thm-ha3-multiplier)を $f=\boldsymbol1_{(0,1)}$ に作用させると、$x\ne0,1$ で（$0<x<1$ なら主値として）

$$
\begin{aligned}
Hf(x)
&=\frac1\pi\,\operatorname{p.v.}\int_0^1\frac{dy}{x-y}\\
&=\frac1\pi\left(\log|x|-\log|x-1|\right)
=\frac1\pi\log\left|\frac{x}{x-1}\right|.
\end{aligned}
$$

$0<x<1$ では切断 $\varepsilon$ の積分が $\log|x|-\log|x-1|$ に落ちることを、区間 $(0,x-\varepsilon)$ と $(x+\varepsilon,1)$ に分けて確認できます。端点の近傍では対数的に非有界です。従って $H:L^\infty\to L^\infty$ は成り立ちません。一方、$H$ は[HA5で検証した標準CZ作用素](../HA5/index.md#def-ha5-cz-operator)なので、直前の定理から $Hf\in\mathrm{BMO}$ が従います。

なお、$H$ を一般の定数関数に作用させるとき、式の片側を単純に無限区間の絶対収束積分とみなすことはできません。端点で現れる**定数による不定性**は、BMO を商で扱う理由とも整合します。

## 5. 演習と詳細解答

定義の平均、停止立方体の閾値、指数減衰、核の近方・遠方分割を別々に解いた後、最後に実際の特異積分へ結びます。

<a id="ex-ha6-a01"></a>
**演習 HA6-A01（平均と指示関数）**  
- Level: A

$Q=[0,1)$、$E=[0,1/4)$、$f=\boldsymbol1_E$ とする。$f_Q$ と $|Q|^{-1}\int_Q|f-f_Q|$ を求め、全空間の BMO 半ノルムの上界も述べよ。

<!-- solution-start -->
**詳細解答**　$|E\cap Q|/|Q|=1/4$ だから $f_Q=1/4$ です。$E$ 上では差は $3/4$、$Q\setminus E$ では差は $1/4$ なので

$$
\frac1{|Q|}\int_Q|f-f_Q|
=\frac14\cdot\frac34+\frac34\cdot\frac14
=\frac38.
$$

任意の区間 $P$ でも $\theta=|E\cap P|/|P|$ とすれば振動は $2\theta(1-\theta)\le1/2$ です。従って $\|f\|_{\mathrm{BMO}}\le1/2$。この結論は一つの区間 $Q$ の計算だけからではなく、任意の $P$ の計算から得られます。
<!-- solution-end -->

<a id="ex-ha6-a02"></a>
**演習 HA6-A02（対数の平均）**  
- Level: A

$f(x)=\log x$（$x>0$）、$Q=(0,1)$ に対して $f_Q$ と平均振動を計算せよ。

<!-- solution-start -->
**詳細解答**　部分積分で $\int_0^1\log x\,dx=[x\log x-x]_0^1=-1$、従って $f_Q=-1$ です。$\log x+1=0$ の解は $x=e^{-1}$ なので、

$$
\begin{aligned}
\int_0^1|\log x+1|\,dx
&=-\int_0^{e^{-1}}(\log x+1)\,dx
+\int_{e^{-1}}^1(\log x+1)\,dx\\
&=-[x\log x]_0^{e^{-1}}+[x\log x]_{e^{-1}}^1\\
&=e^{-1}+e^{-1}=\frac2e.
\end{aligned}
$$

$Q$ の長さは1なのでこれが平均振動です。一つの区間の計算だけでは全立方体の上限の有限性を証明できない点に注意します。
<!-- solution-end -->

<a id="ex-ha6-a03"></a>
**演習 HA6-A03（定数による商）**  
- Level: A

$f(x)=\boldsymbol1_{[0,1)}(x)$、$g(x)=f(x)+100$ とする。任意の区間 $Q$ で両者の平均振動が等しいことを式で示し、$\|g\|_\infty$ と $\|f\|_\infty$ を比べよ。

<!-- solution-start -->
**詳細解答**　$g_Q=f_Q+100$ なので $g(x)-g_Q=f(x)+100-(f_Q+100)=f(x)-f_Q$。絶対値、区間平均、全区間に関する上限を順に取ると $\|g\|_{\mathrm{BMO}}=\|f\|_{\mathrm{BMO}}$ です。一方 $\|f\|_\infty=1$、$g$ は値100と101をそれぞれ正測度で取るため $\|g\|_\infty=101$。BMOは定数加算を区別しません。
<!-- solution-end -->

<a id="ex-ha6-a04"></a>
**演習 HA6-A04（停止立方体の選択）**  
- Level: A

$Q=[0,1)$、$g=4\boldsymbol1_{[0,1/8)}$ とする。局所二進分割で平均が $1$ を厳密に超える極大な子孫区間を求めよ。親での平均と全長を検算せよ。

<!-- solution-start -->
**詳細解答**　$Q$ での平均は $4/8=1/2$、$[0,1/2)$ での平均は $4(1/8)/(1/2)=1$ です。$[0,1/4)$ では $4(1/8)/(1/4)=2>1$。右半分に $g$ がある子孫は存在せず、$[0,1/4)$ が唯一の極大区間です。その親 $[0,1/2)$ の平均はちょうど1です。選択区間の長さは $1/4$ で、停止体積上界 $\int_Qg/1=1/2$ を満たします。
<!-- solution-end -->

<a id="ex-ha6-a05"></a>
**演習 HA6-A05（指数減衰から二乗平均へ）**  
- Level: A

非負関数 $h$ が有界集合 $Q$ 上で $|\{x\in Q:h(x)>t\}|\le2|Q|e^{-ct/M}$（$t>0$、$c,M>0$）を満たす。二乗平均の上界を求めよ。

<!-- solution-start -->
**詳細解答**　$h(x)^2=\int_0^{h(x)}2t\,dt$ として非負関数の積分順序を入れ替えると

$$
\begin{aligned}
\frac1{|Q|}\int_Qh^2
&=\int_0^\infty2t\,\frac{|\{h>t\}|}{|Q|}\,dt\\
&\le4\int_0^\infty t e^{-ct/M}\,dt.
\end{aligned}
$$

$u=ct/M$ で $dt=(M/c)\,du$ とすれば、最後は $4(M/c)^2\int_0^\infty ue^{-u}\,du=4M^2/c^2$。平方根を取って二乗平均は $2M/c$ 以下です。
<!-- solution-end -->

<a id="ex-ha6-b01"></a>
**演習 HA6-B01（一般の立方体で対数を抑える）**  
- Level: B

$d=2$、$f(x)=\log|x|$ とする。辺長 $\ell$ の立方体 $Q$ が原点からの距離 $\ge2\sqrt2\,\ell$ の場合と、そうでない場合に分け、立方体によらない平均振動の上界を構成せよ。

<!-- solution-start -->
**詳細解答**　遠方では $x,y\in Q$ に対して $z(s)=y+s(x-y)$ と置けば、$|z(s)|\ge2\sqrt2\,\ell$、$|x-y|\le\sqrt2\,\ell$ です。$\phi(s)=\log|z(s)|$ の導関数は $\phi'(s)=z(s)\cdot(x-y)/|z(s)|^2$ だから $|\phi'(s)|\le1/2$。[平均値の定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-mvt)を $[0,1]$ に適用すると $|f(x)-f(y)|\le1/2$。$y$ について平均してから $x$ についても平均すれば振動は $1/2$ 以下です。

近方では $z\in Q$ に $|z|<2\sqrt2\,\ell$ を満たす点を取れます。すべての $x\in Q$ に対し $|x|<3\sqrt2\,\ell$ です。定数 $a=\log\ell$ を使い

$$
\begin{aligned}
\frac1{|Q|}\int_Q|f-f_Q|
&\le\frac2{|Q|}\int_Q|f-\log\ell|\\
&=2\int_{\ell^{-1}Q}|\log|y||\,dy\\
&\le2\int_{|y|<3\sqrt2}|\log|y||\,dy<\infty.
\end{aligned}
$$

最後は極座標の積分 $2\pi\int_0^{3\sqrt2}r|\log r|\,dr$ で、原点での可積分性は $r|\log r|$ により保証されます。両場合の上限で BMO 半ノルムを抑えられます。
<!-- solution-end -->

<a id="ex-ha6-b02"></a>
**演習 HA6-B02（停止を反復する閾値）**  
- Level: B

$d=1$、$M=\|f\|_{\mathrm{BMO}}>0$ とし、停止閾値を $4M$ とする。適切な $A$ を求めて、$F_Q(8nM)\le4^{-n}$ を $n\ge0$ の帰納法で証明せよ。ただし $F_Q$ は[John–Nirenberg証明](#thm-ha6-john-nirenberg)の偏差割合とする。

<!-- solution-start -->
**詳細解答**　[停止補題](#lem-ha6-stopping)で $K=4$、$d=1$ とすれば、選択区間の全長は $|Q|/4$ 以下、各子で $|f_{Q_j}-f_Q|\le2^dKM=8M$ です。非選択部分では $|f-f_Q|\le4M\le8M$ なので、

$$
F_Q(s+8M)\le\frac1{|Q|}\sum_j|Q_j|F_{Q_j}(s)
\le\frac14\sup_PF_P(s).
$$

$F(s)=\sup_PF_P(s)$ と置けば $F(s+8M)\le F(s)/4$。$F(0)\le1$ だから $F(8M)\le1/4$。$F(8nM)\le4^{-n}$ を仮定して $s=8nM$ と置くと $F(8(n+1)M)\le4^{-1}F(8nM)\le4^{-(n+1)}$。任意の $Q$ では $F_Q\le F$ なので結論です。
<!-- solution-end -->

<a id="ex-ha6-b03"></a>
**演習 HA6-B03（近方・遠方の異なる仮定）**  
- Level: B

$d=1$、$T$ は核 $K$ の滑らかさ指数 $\delta=1$、定数 $A$ と $L^2$ ノルム $B$ を持つ標準CZ作用素とする。$Q$ の辺長 $\ell$、$Q^*$ の辺長 $4\ell$ として、$f\in L^\infty_c$ の BMO 評価に必要な近方と遠方の二つの上界を導け。

<!-- solution-start -->
**詳細解答**　$|Q^*|/|Q|=4$ だから $f_1=f\boldsymbol1_{Q^*}$ に対し Cauchy–Schwarz と $L^2$ 有界性で

$$
\frac1{|Q|}\int_Q|Tf_1|
\le B\sqrt{\frac{|Q^*|}{|Q|}}\|f\|_\infty
=2B\|f\|_\infty.
$$

遠方 $f_2=f\boldsymbol1_{(Q^*)^c}$ では $|x-c|\le\ell/2$、$|y-c|\ge2\ell$ なので核差の条件を使えます。$a_Q=\int K(c,y)f_2(y)\,dy$ とおけば

$$
\begin{aligned}
|Tf_2(x)-a_Q|
&\le A\|f\|_\infty\frac\ell2
\int_{|y-c|\ge2\ell}|y-c|^{-2}\,dy\\
&=A\|f\|_\infty\frac\ell2
\left(2\int_{2\ell}^\infty r^{-2}\,dr\right)
=\frac A2\|f\|_\infty.
\end{aligned}
$$

ゆえに

$$
\frac1{|Q|}\int_Q|Tf-(Tf)_Q|
\le2(2B+A/2)\|f\|_\infty=(4B+A)\|f\|_\infty.
$$

近方には $L^2$ 仮定、遠方には**第1変数**の滑らかさを使いました。
<!-- solution-end -->

<a id="ex-ha6-b04"></a>
**演習 HA6-B04（有界入力の切断と定数）**  
- Level: B

$T$ は $d=1$、$\delta=1$ の標準CZ作用素、$f\equiv1$ とする。$f_R=\boldsymbol1_{[-R,R)}$、$u_R=Tf_R-(Tf_R)_{[-1,1)}$ と置く。任意の固定した区間 $P$ 上で $R<S\to\infty$ のとき $u_S-u_R$ が一様に零へ向かう理由を、核差と積分の次数から示せ。

<!-- solution-start -->
**詳細解答**　$h=f_S-f_R$ の台は $[-S,-R)\cup[R,S)$ です。$P$ と $Q_0=[-1,1)$ を含む有界区間の直径を $D$ とすると、$R$ が十分大きいとき、任意の $x\in P,z\in Q_0,y\in\operatorname{supp}h$ について $|x-z|\le|z-y|/2$ です。[標準核の滑らかさ](../HA5/index.md#def-ha5-standard-kernel)から

$$
|K(x,y)-K(z,y)|\le A\frac{|x-z|}{|z-y|^2}
\le C_P A\frac D{|y|^2}.
$$

核表示で $Th(x)-Th(z)$ を積分して、$|y|\ge R$ の領域まで拡大すると

$$
|Th(x)-Th(z)|\le C_PAD\int_{|y|\ge R}|y|^{-2}\,dy
=\frac{2C_PAD}{R}.
$$

$z\in Q_0$ で平均を取れば $u_S(x)-u_R(x)=Th(x)-(Th)_{Q_0}$ の絶対値にも同じ上界が成立します。右辺は $S$ に依存せず $R\to\infty$ で零です。$Tf$ の絶対的な定数値ではなく局所差が収束することが重要です。
<!-- solution-end -->

<a id="ex-ha6-c01"></a>
**演習 HA6-C01（Hilbert変換の真の端点と指数可積分）**  
- Level: C

$H$ を実直線上のHilbert変換、$f=\boldsymbol1_{(0,1)}$ とする。(i) $Hf$ を $x\ne0,1$ で計算し、$L^\infty$ でないことを証明せよ。(ii) $Hf$ が BMO に属する理由と、任意の区間 $Q$ における偏差の指数尾部評価を明示せよ。(iii) $\alpha>0$ が十分小さいとき

$$
\frac1{|Q|}\int_Q
\exp\left(\alpha|Hf-(Hf)_Q|\right)\,dx<\infty
$$

が $Q$ によらない上界を持つことを示せ。

<!-- solution-start -->
**詳細解答**

(i) $x\notin[0,1]$ では特異点を含まないので直接積分し、$0<x<1$ では $\varepsilon<\min(x,1-x)$ として

$$
\begin{aligned}
\pi H_\varepsilon f(x)
&=\int_0^{x-\varepsilon}\frac{dy}{x-y}
+\int_{x+\varepsilon}^1\frac{dy}{x-y}\\
&=(\log x-\log\varepsilon)
+(\log\varepsilon-\log(1-x))
=\log\frac x{1-x}.
\end{aligned}
$$

外側の場合も原始関数 $-\log|x-y|$ を用いると、すべての $x\ne0,1$ で

$$
Hf(x)=\frac1\pi\log\left|\frac x{x-1}\right|.
$$

これは $x\downarrow0$ で $-\infty$ へ、$x\uparrow1$ で $+\infty$ へ発散し、各端点近くの正測度集合で任意に大きな絶対値を取ります。よって本質的有界ではありません。

(ii) [$H$ の $L^2$ 有界性](../HA3/index.md#thm-ha3-multiplier)と[標準核の条件](../HA5/index.md#def-ha5-standard-kernel)が成立するので、[端点定理](#thm-ha6-cz-endpoint)を $\|f\|_\infty=1$ に適用できます。$M=\|Hf\|_{\mathrm{BMO}}$ は次元1の定数 $C$ 以下です。[John–Nirenberg不等式](#thm-ha6-john-nirenberg)で $d=1$ とすると $2^{d+1}=4$ であり、

$$
\frac{|\{x\in Q:|Hf(x)-(Hf)_Q|>t\}|}{|Q|}
\le2\exp\left(-\frac{(\log2)t}{4M}\right)
\le2\exp\left(-\frac{(\log2)t}{4C}\right).
$$

(iii) $h=|Hf-(Hf)_Q|\ge0$ とおき、$e^{\alpha h}=1+\int_0^h\alpha e^{\alpha t}\,dt$ を使います。Tonelliで

$$
\begin{aligned}
\frac1{|Q|}\int_Qe^{\alpha h}
&=1+\int_0^\infty\alpha e^{\alpha t}
\frac{|\{h>t\}|}{|Q|}\,dt\\
&\le1+2\alpha\int_0^\infty
e^{-(c-\alpha)t}\,dt
=1+\frac{2\alpha}{c-\alpha},
\end{aligned}
$$

ただし $c=(\log2)/(4C)>0$ としました。$0<\alpha<c$ なら最後の上界は $Q$ に依存せず有限です。対数特異性があっても偏差の指数モーメントが局所一様に制御されることが分かります。
<!-- solution-end -->

## 6. この端点から次へ

$L^p$ ノルムは関数の絶対的な大きさを測りますが、BMOは定数を無視した**尺度ごとの平均振動**を測ります。[John–Nirenberg不等式](#thm-ha6-john-nirenberg)により、平均振動が有限なら局所的な大偏差が指数的に希少になることも示しました。この二つの結果によって「$p=\infty$ で強型が失敗するので何も言えない」という状況は解消されます。

BMO は Hardy 空間 $H^1$ の双対として現れる重要な関数空間でもあります。ただし、その双対性を定理として使うには $H^1$ の原子的分解など別の証明が必要であり、本章はそれを証明済みとはしません。続く HA7 では、零次の特異積分と異なり、次数 $\alpha>0$ を持つ Riesz ポテンシャルの積分改善と端点を調べます。
