# OTR3 最適結合はいつ存在するか

<!-- definition-example-audit: strict -->

## 1. 「下限がある」と「最小値を取る」は違う

[Kantorovichの最適輸送問題](../OTR2/index.md#def-otr2-kantorovich)では、出発分布 $\mu$ と到着分布 $\nu$ を固定し、[結合測度](../OTR2/index.md#def-otr2-coupling) $\pi$ の費用を最小化します。[結合の非空性](../OTR2/index.md#prop-otr2-nonempty)のおかげで、費用を比較する相手は必ずあります。しかし、下限へ近づく結合の列があっても、その**極限が許容結合であり、かつ費用を増やさない**と確認しない限り、最小値が実現するとは言えません。

有限空間なら結合は有限個の非負数からなる行列なので、この問題は比較的見通しが立ちます。一般の空間では、列の質量が遠方へ逃げる可能性、極限で周辺分布が変わる可能性、費用が極限で跳び上がる可能性を順に排除する必要があります。

まずコンパクトな距離空間で議論し、その後、実数空間などを含む非コンパクトな場合へ進みます。今回の証明の流れは次のとおりです。

1. 結合の列から、適切な意味で収束する部分列を取り出す。
2. その極限も指定された二つの周辺分布を持つことを示す。
3. 極限の費用が、元の費用の下極限以下であることを示す。

## 2. どの収束とコンパクト性を使うか

### 距離空間を固定する

[距離空間の完備性](../../../基礎科目/F0/F0-00D/index.md#def-f0-00d-02)は Cauchy 列の極限がその空間内に残る条件で、[可分性](../../../基礎科目/TOP/TOP4/index.md#def-top4-separable)は可算稠密集合が存在する条件です。両方を満たす距離空間では、確率測度の収束に適したコンパクト性定理を利用できます。

<a id="def-otr3-polish"></a>

<!-- formal-statement-start -->
> **定義（Polish空間）**
> 距離空間 $(Z,d)$ が完備かつ可分であるとき、$(Z,d)$ を **Polish空間**（ここでは完備可分距離空間の意味）という。すなわち、すべての Cauchy 列が $Z$ の点に収束し、ある可算集合 $D\subset Z$ が $Z$ で稠密である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr3-polish -->
### 定義の確認：実数と有限集合

**定義の確認**：完備性と可分性をそれぞれ確かめます。

通常の距離 $|x-y|$ を入れた $\mathbb R$ は、Cauchy 列の収束先が実数内にあるので完備で、各開区間が有理数を含むので $\mathbb Q$ が可算稠密集合です。一方、有限集合に異なる点間の距離を $1$ とする離散距離を入れた場合、Cauchy 列は最後には一定となるので完備であり、全点からなる有限集合自身が稠密です。どちらも定義の二つの条件を満たします。

対照的に、通常距離の $\mathbb Q$ は可分ですが、$\sqrt 2$ に近づく有理数の Cauchy 列が $\mathbb Q$ 内へ収束しないため、ここで採用した距離では完備ではありません。
<!-- definition-example-end -->

二つの Polish 空間 $(X,d_X)$、$(Y,d_Y)$ の直積には

$$
d((x,y),(x',y'))=d_X(x,x')+d_Y(y,y')
$$

を入れます。直積の Cauchy 列は各成分で Cauchy なので完備です。また、可算稠密集合 $D_X,D_Y$ の直積は可算かつ稠密です。従って $X\times Y$ も Polish 空間です。

### 測度にとっての弱い収束

点が近いことと、確率測度が近いことは別です。測度の値をすべての可測集合で直接比べる代わりに、**有界連続関数で平均した値**を比べます。以下 $\mathcal P(Z)$ は $Z$ 上の Borel 確率測度全体です。

<a id="def-otr3-narrow"></a>

<!-- formal-statement-start -->
> **定義（確率測度の狭義収束）**
> 距離空間 $Z$ 上の Borel 確率測度 $\lambda_n,\lambda\in\mathcal P(Z)$ について、すべての有界連続関数 $f:Z\to\mathbb R$ に対し

$$
\lim_{n\to\infty}\int_Z f\,d\lambda_n
=\int_Z f\,d\lambda
$$

> が成立するとき、$\lambda_n$ は $\lambda$ に**狭義収束**（確率測度の弱収束）するといい、$\lambda_n\Rightarrow\lambda$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr3-narrow -->
### 定義の確認：動く点質量

**定義の確認**：一つの集合の確率ではなく、任意の有界連続関数の積分を検査します。

$Z=[0,1]$ 上の $\lambda_n=\delta_{1/n}$、$\lambda=\delta_0$ を考えます。任意の有界連続関数 $f$ に対して

$$
\int f\,d\delta_{1/n}=f(1/n)\longrightarrow f(0)
=\int f\,d\delta_0
$$

なので $\lambda_n\Rightarrow\delta_0$ です。ただし集合 $\{0\}$ の測度は全ての $n$ について $0$、極限では $1$ です。**狭義収束は各可測集合の確率の収束を意味しません。**
<!-- definition-example-end -->

### 質量を遠方へ逃がさない

一つのコンパクト集合の中に、確率を $1$ にいくらでも近く閉じ込められることが、次のコンパクト性原理の鍵になります。空間全体がコンパクトなら問題ありませんが、$\mathbb R$ では集合を選ぶ必要があります。

<a id="def-otr3-tight"></a>

<!-- formal-statement-start -->
> **定義（一様緊密性）**
> 距離空間 $Z$ 上の Borel 確率測度の族 $\mathcal F\subset\mathcal P(Z)$ が**一様tight**（一様緊密）であるとは、任意の $\varepsilon>0$ に対して、あるコンパクト集合 $K_\varepsilon\subset Z$ が存在し、

$$
\inf_{\lambda\in\mathcal F}\lambda(K_\varepsilon)\ge 1-\varepsilon
$$

> を満たすことをいう。族が一つの測度だけなら、その測度が tight であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr3-tight -->
### 定義の確認：無限個の点があっても逃げない場合

**定義の確認**：$\varepsilon$ を任意に小さくしても使える有限集合を構成し、単一測度と測度族を区別します。

非負整数 $\mathbb N_0$ に離散距離を入れ、$\rho(\{k\})=2^{-k-1}$（$k=0,1,\ldots$）とします。$K_m=\{0,\ldots,m\}$ は有限なのでコンパクトで、

$$
\rho(K_m)=\sum_{k=0}^{m}2^{-k-1}
=1-2^{-m-1}\longrightarrow1.
$$

可算な離散空間 $\mathbb N_0$ は、Cauchy 列が最後には一定となることから完備で、全点自身が可算稠密集合なので Polish です。従って族 $\{\rho\}$ は tight です。一方 $\{\delta_n:n\ge0\}$ は一様tightではありません。離散空間のコンパクト集合は有限で、どの有限集合 $K$ に対しても $n\notin K$ を選ぶと $\delta_n(K)=0$ だからです。**一つずつ tight**であることと**族全体で同じ $K$ を選べる**ことは異なります。
<!-- definition-example-end -->

### 費用が極限で跳び上がらない条件

点列 $z_n\to z$ に沿って関数値が急に上へ跳ぶと、近似結合では費用が安くても極限で高くなることがあります。以下、費用は負にならず、値 $+\infty$ も許すものとします。

<a id="def-otr3-lsc"></a>

<!-- formal-statement-start -->
> **定義（下半連続費用）**
> 距離空間 $X,Y$ の直積上の関数 $c:X\times Y\to[0,\infty]$ が**下半連続**であるとは、任意の収束列 $(x_n,y_n)\to(x,y)$ について

$$
c(x,y)\le\liminf_{n\to\infty}c(x_n,y_n)
$$

> が成立することをいう。このとき $c$ は Borel 可測であり、どの結合 $\pi$ に対しても非負積分 $\int c\,d\pi\in[0,\infty]$ が定義される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr3-lsc -->
### 定義の確認：連続費用と境界での跳び

**定義の確認**：任意の収束列の liminf 不等式と、その反例になる一つの列を確かめます。

$X=Y=\mathbb R$ で $c(x,y)=|x-y|^2$ とすれば、$(x_n,y_n)\to(x,y)$ のとき $c(x_n,y_n)\to c(x,y)$ なので下半連続です。

一方 $Z=[0,1]$ 上で $h(0)=1$、$h(t)=0$（$t>0$）とすると、$t_n=1/n\to0$ に対し

$$
h(0)=1>0=\liminf_{n\to\infty}h(t_n).
$$

この関数は下半連続ではありません。これと同じ跳びを費用へ入れると、後で見るように最小値が失われることがあります。
<!-- definition-example-end -->

## 3. 固定された周辺分布から一様緊密性を得る

有限集合なら、どの質量も有限個のセルに収まります。Polish 空間でも、一つの確率測度についてはほぼ全質量をコンパクト集合へ収められます。ここは完備性と可分性が実際に使われるところなので、証明します。

<a id="lem-otr3-polish-tight"></a>

<!-- formal-statement-start -->
> **補題（Polish空間上の確率測度の緊密性）**
> 完備可分距離空間 $(Z,d)$ 上の Borel 確率測度 $\lambda$ は tight である。すなわち、任意の $\varepsilon>0$ に対してコンパクト集合 $K\subset Z$ を選び、$\lambda(K)\ge1-\varepsilon$ とできる。
<!-- formal-statement-end -->

### 証明の見取り図

可算稠密集合を中心とした半径が小さい閉球で空間を覆い、各半径について測度のほぼ全量を含む**有限個**を選びます。それらの有限和集合をすべての半径で交差させれば、質量を大きく保ちつつ、完全かつ全有界な集合ができます。

<!-- proof-start -->
### 証明

可算稠密集合を $D=\{z_1,z_2,\ldots\}$ とします（有限のときは点を繰り返しても構いません）。各整数 $m\ge1$ について、半径 $2^{-m}$ の閉球

$$
\overline B(z_j,2^{-m}),\qquad j=1,2,\ldots
$$

は $Z$ を覆います。実際、任意の $z\in Z$ に対し稠密性から $d(z,z_j)<2^{-m}$ を満たす $j$ が存在します。[測度の下からの連続性](../../F0/F0-00D2/index.md#thm-f0-00d2-01)により、有限個の閉球の和集合

$$
F_m=\bigcup_{j=1}^{N_m}\overline B(z_j,2^{-m})
$$

を、$\lambda(F_m^c)<\varepsilon 2^{-m}$ となるように選べます。$K=\bigcap_{m=1}^{\infty}F_m$ とすれば $K$ は閉集合であり、可算劣加法性から

$$
\lambda(K^c)
=\lambda\left(\bigcup_{m=1}^{\infty}F_m^c\right)
\le\sum_{m=1}^{\infty}\lambda(F_m^c)
<\varepsilon\sum_{m=1}^{\infty}2^{-m}
=\varepsilon.
$$

また、任意の半径 $r>0$ に対し $2^{1-m}<r$ となる $m$ を選べます。$K\subset F_m$ なので、$K$ は有限個の半径 $2^{-m}$ の球に覆われます。$K$ と交わる球から点を一つずつ選び直せば、$K$ 自身の点を中心とする半径 $2^{1-m}<r$ の有限被覆が得られます。従って $K$ は全有界です。

全有界性からコンパクト性へ移る理由も確認します。$K$ の任意の点列を取り、半径 $2^{-1}$ の有限被覆のうち無限個の項が入る球を一つ選びます。その無限部分列に対し、半径 $2^{-2}$ の有限被覆から再び無限個が入る球を選びます。

半径を $2^{-m}$ まで小さくしながらこの操作を続け、各段階で一つずつ項を選ぶ対角化をすると Cauchy 部分列が得られます。$K$ は完備な $Z$ の閉集合なので完備であり、この部分列は $K$ 内の点へ収束します。

よって $K$ は逐次コンパクトです。距離空間では逐次コンパクト性とコンパクト性が同値なので、$K$ はコンパクトです。求める集合ができました。$\square$
<!-- proof-end -->

出発空間 $X$ と到着空間 $Y$ でそれぞれ大部分の質量を捕まえれば、その直積で結合の大部分を捕まえられます。ここで[周辺分布の条件](../OTR2/index.md#def-otr2-coupling)を直接使います。

<a id="prop-otr3-fixed-marginal-tight"></a>

<!-- formal-statement-start -->
> **命題（固定周辺分布の結合族の一様緊密性）**
> Polish 空間 $X,Y$ 上の Borel 確率測度 $\mu,\nu$ に対して、すべての結合からなる族 $\Pi(\mu,\nu)$ は $X\times Y$ 上で一様tightである。
<!-- formal-statement-end -->

### 証明の見取り図

$X$ 側と $Y$ 側でそれぞれ失う質量を $\varepsilon/2$ 以下にすれば、積集合の外へ逃げる確率は二つの周辺確率の和以下です。

<!-- proof-start -->
### 証明

[Polish空間上の確率測度の緊密性](#lem-otr3-polish-tight)を $\mu,\nu$ にそれぞれ適用し、コンパクト集合 $K_X\subset X$、$K_Y\subset Y$ を

$$
\mu(K_X^c)<\frac{\varepsilon}{2},\qquad
\nu(K_Y^c)<\frac{\varepsilon}{2}
$$

となるように選びます。$K_X\times K_Y$ はコンパクトです。任意の $\pi\in\Pi(\mu,\nu)$ について

$$
(K_X\times K_Y)^c
\subset (K_X^c\times Y)\cup(X\times K_Y^c)
$$

であるため、測度の劣加法性と二つの周辺条件から

$$
\begin{aligned}
\pi((K_X\times K_Y)^c)
&\le \pi(K_X^c\times Y)+\pi(X\times K_Y^c)\\
&=\mu(K_X^c)+\nu(K_Y^c)<\varepsilon.
\end{aligned}
$$

同じ $K_X\times K_Y$ が**すべての** $\pi$ に対して働くので、一様緊密性が示されました。$\square$
<!-- proof-end -->

## 4. 部分列の極限は結合のままか

一様緊密性から極限を取り出すため、次の結果を使います。これは任意の Polish 空間に及ぶ一般定理で、証明には測度の弱収束の表現・近似の理論が必要です。ここでは**利用する外部のコンパクト性定理**として正確に主張し、OTR3の最適輸送に固有の残りの論証はすべて証明します。

<a id="thm-otr3-prokhorov"></a>

<!-- formal-statement-start -->
> **定理（Prokhorovのコンパクト性定理：利用形）**
> Polish 空間 $Z$ 上の Borel 確率測度の一様tightな族 $\mathcal F\subset\mathcal P(Z)$ から任意の列 $(\lambda_n)$ を取ると、ある部分列 $(\lambda_{n_k})$ と Borel 確率測度 $\lambda\in\mathcal P(Z)$ が存在し、

$$
\lambda_{n_k}\Rightarrow\lambda
$$

> が成立する。
<!-- formal-statement-end -->

コンパクト空間なら $K_\varepsilon=Z$ を取れるので仮定は自動的に満たされます。非コンパクト空間でこそ、前節の一様緊密性が効きます。

では、取り出した極限が勝手に別の周辺分布を持ってしまわないでしょうか。ここでは[周辺分布の積分恒等式](../OTR2/index.md#prop-otr2-marginal-integration)と、[狭義収束の定義](#def-otr3-narrow)を使って直接答えられます。

<a id="prop-otr3-closed"></a>

<!-- formal-statement-start -->
> **命題（結合族の狭義閉性）**
> 距離空間 $X,Y$ 上の Borel 確率測度 $\mu,\nu$ を固定する。$\pi_n\in\Pi(\mu,\nu)$ が $X\times Y$ 上で Borel 確率測度 $\pi$ に狭義収束するなら、$\pi\in\Pi(\mu,\nu)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$X$ 上の有界連続関数 $f$ を射影 $p_X$ と合成すれば、$f\circ p_X$ も積空間上の有界連続関数です。積空間の狭義収束から第1周辺の積分が保存され、同じことが第2周辺にも成立します。

<!-- proof-start -->
### 証明

任意の有界連続関数 $f:X\to\mathbb R$ に対して、[周辺分布の積分恒等式](../OTR2/index.md#prop-otr2-marginal-integration)と[狭義収束の定義](#def-otr3-narrow)を順に用いると

$$
\begin{aligned}
\int_X f\,d(p_X)_{\#}\pi
&=\int_{X\times Y} f(p_X(x,y))\,d\pi(x,y)\\
&=\lim_{n\to\infty}
  \int_{X\times Y} f(p_X(x,y))\,d\pi_n(x,y)\\
&=\lim_{n\to\infty}\int_X f\,d\mu
=\int_X f\,d\mu.
\end{aligned}
$$

これだけで二つの Borel 確率測度が一致すると言える理由も確かめます。距離空間上の閉集合 $F$ を固定し、

$$
f_m(x)=\max\{0,\,1-m\,d(x,F)\}
$$

と置きます。$F=\varnothing$ の場合は自明なので、空でない $F$ を考えます。各 $f_m$ は有界連続で、$f_m\downarrow\boldsymbol{1}_F$ です。上の積分等式へ $f_m$ を代入して有界収束定理を用いると、$(p_X)_{\#}\pi(F)=\mu(F)$ を得ます。閉集合は有限交差で閉じ、全体集合も含み、Borel $\sigma$ 代数を生成するので、二つの確率測度は一致します。

第2射影に対しても $g\circ p_Y$（$g:Y\to\mathbb R$ は有界連続）で同じ議論を行い、$(p_Y)_{\#}\pi=\nu$ となります。従って [結合測度の定義](../OTR2/index.md#def-otr2-coupling)により $\pi\in\Pi(\mu,\nu)$ です。$\square$
<!-- proof-end -->

## 5. 費用を極限へ運ぶ：下半連続な費用

結合の極限が許容でも、費用がそこで跳び上がれば最適性は示せません。必要なのは、極限の費用が近似列の費用の下極限を超えない不等式です。単に「連続関数だから積分を交換する」という説明は、費用が非有界だったり $+\infty$ を取ったりする場合に使えません。

<a id="lem-otr3-lsc-integral"></a>

<!-- formal-statement-start -->
> **補題（下半連続費用のliminf不等式）**
> 距離空間 $Z$ 上で Borel 確率測度 $\lambda_n\Rightarrow\lambda$ とする。$c:Z\to[0,\infty]$ が下半連続なら、

$$
\int_Z c\,d\lambda
\le \liminf_{n\to\infty}\int_Z c\,d\lambda_n
$$

> が拡張実数値の不等式として成立する。
<!-- formal-statement-end -->

### 証明の見取り図

費用 $c$ をまず高さ $N$ で切り、さらに下から有界連続関数で近似します。この関数についてだけ狭義収束を使い、最後に二回の単調収束で元の費用へ戻します。

<!-- proof-start -->
### 証明

正整数 $N$ に対して $c_N(z)=\min\{c(z),N\}$ と置きます。$c_N$ は $0\le c_N\le N$ を満たす下半連続関数です。正整数 $m$ に対して

$$
g_{N,m}(z)=\inf_{w\in Z}\{c_N(w)+m\,d(z,w)\}
$$

を定めます。$w=z$ を代入すれば $0\le g_{N,m}(z)\le c_N(z)\le N$ です。任意の $w,z,z'$ に対して $d(z,w)\le d(z,z')+d(z',w)$ なので、$w$ に関する下限を取ると

$$
g_{N,m}(z)\le g_{N,m}(z')+m\,d(z,z')
$$

であり、$z,z'$ を交換して

$$
|g_{N,m}(z)-g_{N,m}(z')|\le m\,d(z,z')
$$

が従います。従って $g_{N,m}$ は有界連続です。また $m$ とともに単調に増加します。

この近似が $c_N(z)$ へ達することを確かめます。仮にある $z$ で $\sup_mg_{N,m}(z)<c_N(z)$ なら、正数 $\eta$ を選び、すべての $m$ について $g_{N,m}(z)\le c_N(z)-2\eta$ とできます。下限の定義から点 $w_m$ を

$$
c_N(w_m)+m\,d(z,w_m)\le c_N(z)-\eta
$$

となるように選べます。非負性と $c_N(z)\le N$ より $d(z,w_m)\le N/m$ なので $w_m\to z$ ですが、同時に $c_N(w_m)\le c_N(z)-\eta$ となり、$c_N$ が下半連続であることに反します。ゆえに

$$
g_{N,m}(z)\uparrow c_N(z)
\qquad(m\to\infty).
$$

[狭義収束の定義](#def-otr3-narrow)を有界連続な $g_{N,m}$ に適用すると

$$
\int_Z g_{N,m}\,d\lambda
=\lim_{n\to\infty}\int_Z g_{N,m}\,d\lambda_n
\le\liminf_{n\to\infty}\int_Z c\,d\lambda_n.
$$

右辺は $N,m$ に依存しません。まず $m\to\infty$、次に $N\to\infty$ とし、それぞれ非負関数の[単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)を適用すると左辺は $\int c\,d\lambda$ へ増加します。これで不等式を得ます。$\square$
<!-- proof-end -->

この補題では費用の**上からの有界性も、有限モーメントも仮定していません**。ただし最小費用が有限になるかどうかは別問題です。

## 6. コンパクト空間で最適結合を作る

ここまでの結果をつなげます。コンパクト空間では 緊密性 の確認が一行で済むので、最初にこの場合を完全に証明します。

<a id="thm-otr3-compact"></a>

<!-- formal-statement-start -->
> **定理（コンパクト空間上の最適結合の存在）**
> $X,Y$ をコンパクト距離空間、$\mu\in\mathcal P(X)$、$\nu\in\mathcal P(Y)$ を Borel 確率測度とする。費用 $c:X\times Y\to[0,\infty]$ が下半連続なら、ある $\pi^*\in\Pi(\mu,\nu)$ が存在して

$$
\int c\,d\pi^*
=\inf_{\pi\in\Pi(\mu,\nu)}\int c\,d\pi
$$

> を満たす。特に $\int c\,d\pi_0<\infty$ となる結合 $\pi_0$ が一つでもあれば、最適費用は有限である。
<!-- formal-statement-end -->

### 証明の見取り図

結合の列は、直積のコンパクト性と [Prokhorovの定理](#thm-otr3-prokhorov)で収束部分列を持ちます。極限は [結合族の狭義閉性](#prop-otr3-closed)で許容、費用は[下半連続費用のliminf不等式](#lem-otr3-lsc-integral)で下から制御されます。

<!-- proof-start -->
### 証明

[結合の非空性](../OTR2/index.md#prop-otr2-nonempty)より $\Pi(\mu,\nu)\ne\varnothing$ です。下限値を $I\in[0,\infty]$ とします。

$I=\infty$ の場合、すべての許容結合の費用が $\infty$ なので、任意の許容結合が拡張実数の意味で下限を達成します。

$I<\infty$ の場合、下限の定義から結合 $\pi_n$ を選んで

$$
I\le\int c\,d\pi_n\le I+\frac1n
$$

とできます。$X\times Y$ はコンパクト距離空間なので Polish 空間であり、測度族 $\{\pi_n:n\ge1\}$ は $K_\varepsilon=X\times Y$ によって一様tightです。[Prokhorovのコンパクト性定理](#thm-otr3-prokhorov)により部分列 $\pi_{n_k}\Rightarrow\pi^*$ を取れます。[結合族の狭義閉性](#prop-otr3-closed)から $\pi^*\in\Pi(\mu,\nu)$ です。さらに[費用のliminf不等式](#lem-otr3-lsc-integral)を $Z=X\times Y$ に適用して

$$
I\le\int c\,d\pi^*
\le\liminf_{k\to\infty}\int c\,d\pi_{n_k}
=I.
$$

従って等号が成立します。有限費用の許容結合 $\pi_0$ があれば $I\le\int c\,d\pi_0<\infty$ なので、後半の場合が適用されます。$\square$
<!-- proof-end -->

### 具体例：二点の結合

$X=Y=\{0,1\}$、$\mu=\nu=(\delta_0+\delta_1)/2$、費用 $c(x,y)=|x-y|$ とします。行和と列和がそれぞれ $1/2$ となる結合は、[有限原子での結合判定](../OTR2/index.md#prop-otr2-finite-criterion)から

$$
\pi_t=
\begin{pmatrix}
t&\tfrac12-t\\
\tfrac12-t&t
\end{pmatrix},
\qquad 0\le t\le\tfrac12
$$

と書けます。費用は

$$
\int c\,d\pi_t
=\left(\frac12-t\right)+\left(\frac12-t\right)
=1-2t.
$$

従って $t=1/2$ で最小費用 $0$ を達成します。これは定理の存在主張だけでなく、この例では最適結合が一意であることも分かります。しかし**一般定理は一意性まで主張していません**。

## 7. 非コンパクトなPolish空間へ広げる

$X=\mathbb R$ なら空間全体はコンパクトではありません。それでも結合の周辺分布が固定されているので、[固定周辺分布の一様緊密性](#prop-otr3-fixed-marginal-tight)が使えます。これが有限空間・コンパクト空間からの本質的な一歩です。

<a id="thm-otr3-polish"></a>

<!-- formal-statement-start -->
> **定理（Polish空間上の最適結合の存在）**
> $X,Y$ を Polish 空間、$\mu\in\mathcal P(X)$、$\nu\in\mathcal P(Y)$ を Borel 確率測度とする。費用 $c:X\times Y\to[0,\infty]$ が下半連続なら、少なくとも一つの結合 $\pi^*\in\Pi(\mu,\nu)$ が存在し、

$$
\int c\,d\pi^*
=\inf_{\pi\in\Pi(\mu,\nu)}\int c\,d\pi
$$

> を満たす。最適費用が有限であるための十分条件は、費用が有限な結合 $\pi_0\in\Pi(\mu,\nu)$ が一つ存在することである。たとえば $\int c\,d(\mu\times\nu)<\infty$ ならこの条件を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

コンパクト空間版との違いは部分列を取る段階だけです。[各周辺測度の緊密性](#lem-otr3-polish-tight)と[固定周辺分布の一様緊密性](#prop-otr3-fixed-marginal-tight)で、結合全体に一様なコンパクト集合を用意します。その後は同じ直接法です。

<!-- proof-start -->
### 証明

直積 $X\times Y$ が Polish 空間であることは第2節で確認しました。[結合の非空性](../OTR2/index.md#prop-otr2-nonempty)から許容集合は空ではありません。下限値を $I=\inf_{\pi\in\Pi(\mu,\nu)}\int c\,d\pi$ とします。

$I=\infty$ なら、非空な許容集合のどの元も拡張実数の意味で下限を達成します。$I<\infty$ なら、下限を近似する結合 $\pi_n$ を

$$
I\le\int c\,d\pi_n<I+\frac1n
$$

となるように選べます。[固定周辺分布の結合族の一様緊密性](#prop-otr3-fixed-marginal-tight)より $\{\pi_n\}$ は一様tightです。[Prokhorovのコンパクト性定理](#thm-otr3-prokhorov)を Polish 空間 $X\times Y$ のこの列へ適用し、$\pi_{n_k}\Rightarrow\pi^*$ となる部分列を取ります。

[結合族の狭義閉性](#prop-otr3-closed)により $\pi^*\in\Pi(\mu,\nu)$ です。[下半連続費用のliminf不等式](#lem-otr3-lsc-integral)により

$$
I\le\int c\,d\pi^*
\le\liminf_{k\to\infty}\int c\,d\pi_{n_k}
=I.
$$

従って $\pi^*$ は最適結合です。最後の有限性の条件は、許容結合 $\pi_0$ の費用を上界として

$$
0\le I\le\int c\,d\pi_0<\infty
$$

と評価したものです。特に[積測度による結合](../OTR2/index.md#prop-otr2-nonempty)を $\pi_0=\mu\times\nu$ と選べます。$\square$
<!-- proof-end -->

例えば $\mathbb N_0$ 上の幾何分布 $\rho$ と費用 $c(i,j)=|i-j|$ を考えると、対角結合 $\pi=\sum_{k\ge0}2^{-k-1}\delta_{(k,k)}$ は周辺分布がともに $\rho$ で費用が $0$ です。空間は非コンパクトですが、最適結合は存在します。コンパクト性が必要なのは**空間全体**ではなく、固定周辺を持つ結合族が質量を失わず極限を取れることです。

### 仮定を外すと何が壊れるか

費用が下半連続でないと、実際に最小値が消えることがあります。円周 $\mathbb T=\mathbb R/\mathbb Z$ を、円周上の最短距離 $d_{\mathbb T}(x,y)=\min_{k\in\mathbb Z}|x-y-k|$ を持つコンパクト距離空間とし、$\mu=\nu$ を一様確率測度とします。費用を

$$
c(x,y)=
\begin{cases}
1,&x=y,\\
d_{\mathbb T}(x,y),&x\ne y
\end{cases}
$$

とします。$x\ne y$ では距離が正であり、$x=y$ でも費用は $1$ なので、$c(x,y)>0$ がどの組でも成立します。回転 $R_n(x)=x+1/n\pmod1$（$n\ge3$）は一様測度を保つので、[グラフ結合](../OTR2/index.md#prop-otr2-graph) $\pi_n=(\mathrm{id},R_n)_{\#}\mu$ は許容結合です。しかも

$$
\int c\,d\pi_n=\frac1n\longrightarrow0.
$$

従って下限は $0$ ですが、各点で $c>0$ なので費用 $0$ の結合はありません。さらに $\pi_n$ は対角結合へ狭義収束するのに、その極限費用は $1$ です。対角点 $(x,x)$ へ $(x,R_n(x))$ が近づくのに費用は $1/n\to0$ なので、ちょうど[下半連続費用の条件](#def-otr3-lsc)が破れ、[liminf不等式](#lem-otr3-lsc-integral)を使えなくなります。

最後に、存在・有限性・一意性は別々です。たとえば $X=Y=[0,1]$、$\mu$ を一様測度、$\nu=\delta_0$ とし、

$$
c(x,y)=
\begin{cases}
1/x,&x>0,\\
\infty,&x=0
\end{cases}
$$

とすれば $c$ は非負下半連続ですが、どの結合でも費用は $\int_0^1 dx/x=\infty$ です。「拡張実数として最小値を取る」と「有限の最適費用を持つ」は区別しなければなりません。また $c\equiv0$ ならどの結合も最適で、一般には一意ではありません。

## 8. この直接法が後の理論で担う役割

結合を一つ構成できるというだけなら[積測度](../OTR2/index.md#prop-otr2-nonempty)で十分でした。今回得たのは、下限へ近づく**列から本当に最適な結合を取り出せる**という結論です。必要だった三つの働きを、条件とともに整理します。

1. Polish 空間と固定周辺分布：一様緊密性、[Prokhorovの定理](#thm-otr3-prokhorov)による収束部分列。
2. [結合族の狭義閉性](#prop-otr3-closed)：極限が二つの周辺分布を保つ。
3. 非負下半連続費用と[liminf不等式](#lem-otr3-lsc-integral)：極限で最小化の不等式が失われない。

次講では、結合が有限個の点の間の行列になる場合に、最適化を具体的に計算する方法へ進みます。

## 演習

### OTR3-A01 狭義収束と集合の確率
- Level: A

$Z=[0,1]$ とし、$\lambda_n=\delta_{1/n}$、$\lambda=\delta_0$ を Borel 確率測度とする。

1. すべての有界連続関数を試験関数にして $\lambda_n\Rightarrow\lambda$ を確認せよ。
2. 集合 $\{0\}$ の確率は収束するか。両者を矛盾なく説明せよ。

<!-- solution-start -->
#### 詳細解答

任意の有界連続関数 $f:[0,1]\to\mathbb R$ を取る。Dirac 測度の積分より

$$
\int f\,d\lambda_n=f(1/n),\qquad
\int f\,d\lambda=f(0).
$$

$1/n\to0$ と $f$ の $0$ における連続性から $f(1/n)\to f(0)$ なので、[狭義収束の定義](#def-otr3-narrow)が成立する。

一方 $\lambda_n(\{0\})=0$（$1/n\ne0$）、$\lambda(\{0\})=1$ であり、集合の確率は収束しない。狭義収束が検査するのは有界**連続**関数であり、$\boldsymbol{1}_{\{0\}}$ は $0$ で不連続なので試験関数の条件を満たさない。$\square$
<!-- solution-end -->

### OTR3-A02 非コンパクト離散空間での緊密性
- Level: A

$Z=\mathbb N_0$ に離散距離を入れ、$\rho(\{k\})=2^{-k-1}$ とする。$K_m=\{0,\ldots,m\}$ がコンパクトであることを示し、$\rho(K_m)$ を計算せよ。また、族 $\{\delta_n:n\in\mathbb N_0\}$ が一様tightでないことを証明せよ。

<!-- solution-start -->
#### 詳細解答

離散距離空間の有限集合 $K_m$ は任意の開被覆から各点を覆う開集合を一つずつ選べるので、有限部分被覆を持ちコンパクトである。等比級数より

$$
\rho(K_m)=\sum_{k=0}^{m}\frac1{2^{k+1}}
=\frac12\frac{1-(1/2)^{m+1}}{1-1/2}
=1-2^{-m-1}.
$$

任意の $\varepsilon>0$ に対し $2^{-m-1}<\varepsilon$ となる $m$ を選べるので $\rho$ は tight である。

離散距離空間のコンパクト集合は有限である。実際、各点の一元集合からなる開被覆が有限部分被覆を持つなら、その集合の点数は有限である。任意の有限集合 $K$ には $n\notin K$ が存在し、$\delta_n(K)=0$ となるから、

$$
\inf_{n\ge0}\delta_n(K)=0<\frac12.
$$

$\varepsilon=1/2$ の[一様緊密性の条件](#def-otr3-tight)を満たす $K$ は存在しない。$\square$
<!-- solution-end -->

### OTR3-A03 下半連続条件を点列で判定する
- Level: A

$Z=[0,1]$ とする。$h(t)=t^2$、$q(t)=\boldsymbol{1}_{\{0\}}(t)$ のうち下半連続なものを判定せよ。判定では任意の収束列または具体的な反例となる列を示せ。

<!-- solution-start -->
#### 詳細解答

$t_n\to t$ なら連続性から $t_n^2\to t^2$ である。従って

$$
h(t)=\liminf_{n\to\infty}h(t_n)
$$

なので $h$ は下半連続である。一方 $t_n=1/n\to0$ と置くと

$$
q(0)=1,\qquad q(t_n)=0,\qquad
\liminf_{n\to\infty}q(t_n)=0.
$$

[下半連続費用の定義](#def-otr3-lsc)に必要な $1\le0$ が偽なので $q$ は下半連続でない。$\square$
<!-- solution-end -->

### OTR3-A04 固定周辺分布の逃げる質量を評価する
- Level: A

$X=Y=\mathbb N_0$ に離散距離を入れ、$\mu(\{k\})=\nu(\{k\})=2^{-k-1}$ とする。任意の結合 $\pi\in\Pi(\mu,\nu)$ に対し、$K_m=\{0,\ldots,m\}$ を用いて

$$
\pi((K_m\times K_m)^c)\le 2^{-m}
$$

を証明せよ。結合の独立性は仮定しない。

<!-- solution-start -->
#### 詳細解答

$\pi\in\Pi(\mu,\nu)$ の二つの周辺分布は $\mu,\nu$ に固定されている。[結合測度の定義](../OTR2/index.md#def-otr2-coupling)と集合の包含から

$$
\begin{aligned}
\pi((K_m\times K_m)^c)
&\le\pi(K_m^c\times Y)+\pi(X\times K_m^c)\\
&=\mu(K_m^c)+\nu(K_m^c).
\end{aligned}
$$

等比級数の尾部は

$$
\mu(K_m^c)=\sum_{k=m+1}^{\infty}2^{-k-1}
=2^{-m-1}
=\nu(K_m^c).
$$

よって求める上界 $2^{-m}$ が従う。独立性は一度も使わず、周辺条件だけを使った。$\square$
<!-- solution-end -->

### OTR3-B01 二点の輸送で最小化を実行する
- Level: B

$X=Y=\{0,1\}$、$\mu=\nu=(\delta_0+\delta_1)/2$、$c(x,y)=|x-y|$ とする。

1. 許容結合を一つの実数パラメータで全て表せ。
2. 費用をそのパラメータで表し、最適費用と最適結合、最適結合の一意性を調べよ。

<!-- solution-start -->
#### 詳細解答

結合行列を $(p_{ij})_{i,j=0,1}$ と置く。非負性と行・列和制約は

$$
p_{00}+p_{01}=p_{10}+p_{11}
=p_{00}+p_{10}=p_{01}+p_{11}=\frac12
$$

である。$t=p_{00}$ と置くと、第1行から $p_{01}=1/2-t$、第1列から $p_{10}=1/2-t$、第2行から $p_{11}=t$ と求まる。従って

$$
(p_{ij})=
\begin{pmatrix}
t&\frac12-t\\
\frac12-t&t
\end{pmatrix}.
$$

全成分が非負である条件は $0\le t\le1/2$ であり、逆にこの区間のどの $t$ も行・列和制約を満たすので許容結合を尽くしている。費用は対角成分で $0$、非対角成分で $1$ だから

$$
J(t)=0\cdot p_{00}+1\cdot p_{01}
+1\cdot p_{10}+0\cdot p_{11}=1-2t.
$$

$J$ は区間 $[0,1/2]$ で狭義単調減少するので、唯一の最小化点は $t=1/2$、最適費用は $0$、最適結合は

$$
\pi^*=\frac12\delta_{(0,0)}+\frac12\delta_{(1,1)}
$$

である。$\square$
<!-- solution-end -->

### OTR3-B02 開集合の費用はliminfを満たす
- Level: B

距離空間 $(Z,d)$ の開集合 $O$ と Borel 確率測度 $\lambda_n\Rightarrow\lambda$ に対し、

$$
\lambda(O)\le\liminf_{n\to\infty}\lambda_n(O)
$$

を証明せよ。$O=\varnothing$ または $O=Z$ の場合は別に処理し、その他の場合は $Z\setminus O$ からの距離を使った有界連続関数を構成せよ。

<!-- solution-start -->
#### 詳細解答

$O=\varnothing$ の場合は両辺 $0$、$O=Z$ の場合は両辺 $1$ である。以下、$O$ は非空かつ真部分集合とする。閉集合 $F=Z\setminus O$ からの距離を用い

$$
f_m(z)=\min\{1,\,m\,d(z,F)\}
$$

とする。距離関数は $1$-Lipschitz なので $f_m$ は $0\le f_m\le1$ の有界連続関数であり、$F$ 上で $0$ である。$z\in O$ なら開性から $d(z,F)>0$ なので $f_m(z)\uparrow1$、$z\in F$ なら恒等的に $0$ である。従って $f_m\uparrow\boldsymbol{1}_O$ である。

[狭義収束の定義](#def-otr3-narrow)により各 $m$ で $\int f_m\,d\lambda_n\to\int f_m\,d\lambda$ が成立する。さらに $f_m\le\boldsymbol{1}_O$ なので

$$
\int f_m\,d\lambda
=\lim_{n\to\infty}\int f_m\,d\lambda_n
\le\liminf_{n\to\infty}\lambda_n(O).
$$

$m\to\infty$ に単調収束定理を適用し、左辺を $\lambda(O)$ に戻せば示された。$\square$
<!-- solution-end -->

### OTR3-B03 費用が下半連続でない非達成例
- Level: B

円周 $\mathbb T=\mathbb R/\mathbb Z$ 上の一様確率測度を $\mu$ とし、距離を $d_{\mathbb T}(x,y)=\min_{k\in\mathbb Z}|x-y-k|$ とする。費用 $c$ を $x=y$ では $1$、$x\ne y$ では $d_{\mathbb T}(x,y)$ と定める。

1. $R_n(x)=x+1/n\pmod1$（$n\ge3$）によるグラフ結合 $\pi_n$ の二つの周辺分布と費用を求めよ。
2. 最小費用の下限が達成されないことを示し、下半連続条件の破れと結び付けよ。

<!-- solution-start -->
#### 詳細解答

回転 $R_n$ は円周の一様測度を保つので、[Monge写像のグラフ結合への埋め込み](../OTR2/index.md#prop-otr2-graph)により $\pi_n=(\mathrm{id},R_n)_{\#}\mu$ の周辺は $\mu,(R_n)_{\#}\mu=\mu$ である。$n\ge3$ では $R_n(x)\ne x$、$d_{\mathbb T}(x,R_n(x))=1/n$ が全ての $x$ で成立する。従って

$$
\int c\,d\pi_n
=\int_{\mathbb T}c(x,R_n(x))\,d\mu(x)
=\int_{\mathbb T}\frac1n\,d\mu(x)=\frac1n.
$$

非負費用なので下限は $0$ 以上であり、$\pi_n$ の費用が $0$ に近づくので下限は $0$ である。しかし全ての組について $c(x,y)>0$ だから、もし $\int c\,d\pi=0$ なら非負積分の性質より $c=0$ が $\pi$-ほとんど至る所で必要となり、矛盾する。下限は達成されない。

$n\to\infty$ で $(x,R_n(x))\to(x,x)$ だが

$$
c(x,x)=1>\liminf_{n\to\infty}c(x,R_n(x))=0
$$

である。従って[下半連続費用の条件](#def-otr3-lsc)が欠け、極限で費用が跳び上がる。$\square$
<!-- solution-end -->

### OTR3-C01 非コンパクト空間の存在と非一意性・一意性
- Level: C

$X=\{-1,-2,\ldots\}$、$Y=\{1,2,\ldots\}$ に整数間の通常距離を入れ、確率測度を

$$
\mu(\{-k\})=\nu(\{k\})=2^{-k},
\qquad k=1,2,\ldots
$$

とする。$K_M^X=\{-1,\ldots,-M\}$、$K_M^Y=\{1,\ldots,M\}$ とする。

1. $X,Y$ が非コンパクトな Polish 空間であることを確認し、任意の $\pi\in\Pi(\mu,\nu)$ が $(K_M^X\times K_M^Y)^c$ に置く質量を評価せよ。
2. 費用 $c_1(x,y)=|x-y|$ では全ての結合が同じ有限費用を持つことを証明せよ。少なくとも異なる二つの最適結合を挙げよ。
3. 費用 $c_2(-j,k)=(j-k)^2$ では、最適費用が $0$ で最適結合が一意であることを証明せよ。

<!-- solution-start -->
#### 詳細解答

整数部分集合 $X,Y$ では異なる二点間の距離が $1$ 以上なので、Cauchy 列は最後には一定であり完備である。いずれも可算集合自身が稠密であるから Polish 空間である。ただし各点を一元集合で覆う開被覆は有限部分被覆を持たず、どちらも非コンパクトである。

等比級数から

$$
\mu((K_M^X)^c)
=\nu((K_M^Y)^c)
=\sum_{k=M+1}^\infty2^{-k}=2^{-M}.
$$

任意の結合について周辺条件を使うと

$$
\begin{aligned}
\pi((K_M^X\times K_M^Y)^c)
&\le\pi((K_M^X)^c\times Y)+\pi(X\times(K_M^Y)^c)\\
&=\mu((K_M^X)^c)+\nu((K_M^Y)^c)
=2^{1-M}.
\end{aligned}
$$

これで一様緊密性も直接確かめられた。

次に $x=-j<0$、$y=k>0$ なら $|x-y|=j+k$ である。[周辺分布の積分恒等式](../OTR2/index.md#prop-otr2-marginal-integration)を非負関数 $j,k$ に適用すると、どの結合 $\pi$ でも

$$
\begin{aligned}
\int c_1\,d\pi
&=\sum_{j,k\ge1}(j+k)\pi(\{(-j,k)\})\\
&=\sum_{j\ge1}j\,2^{-j}+\sum_{k\ge1}k\,2^{-k}\\
&=2+2=4.
\end{aligned}
$$

最後の和は $\sum_{k\ge1}kt^k=t/(1-t)^2$ に $t=1/2$ を入れた値である。独立結合 $\mu\times\nu$ と対角対応結合

$$
\pi_{\mathrm{diag}}=\sum_{k\ge1}2^{-k}\delta_{(-k,k)}
$$

は異なる（前者は $(-1,2)$ に正の質量 $1/8$ を置き、後者は置かない）が、ともに費用 $4$ で最適である。

最後に $c_2(-j,k)=(j-k)^2\ge0$ であり、$\pi_{\mathrm{diag}}$ は $j=k$ だけに質量を置くため費用 $0$ である。従って最適費用は $0$。費用 $0$ の任意の結合は、非負積分が $0$ であることから $c_2=0$ の集合、すなわち $j=k$ の組だけに集中しなければならない。そのとき第1周辺の条件から各 $(-k,k)$ の質量は必ず $2^{-k}$ で、結合は $\pi_{\mathrm{diag}}$ に一致する。よって最適結合は一意である。$\square$
<!-- solution-end -->
