# GEO8 幾何学 VIII

[GEO7](../GEO7/index.md) では、微分形式・引き戻し・外微分を構成し、$d^2=0$ まで証明しました。[GEO4](../GEO4/index.md) では、局所計算を大域化する 1 の分割を構成しています。

本章では、最高次微分形式に「積分」という数を対応させます。ただし、座標を反転すると最高次形式の符号も反転するため、積分にはまず **向き** が必要です。また境界を持つ多様体では、内部の向きから境界の向きを一意に決める符号規約が必要です。

最終目標は、向き付けられた境界付き $n$ 次元多様体 $M$ とコンパクト台を持つ $(n-1)$ 形式 $\omega$ に対する

$$
\int_M d\omega
=
\int_{\partial M}\omega
$$

です。この恒等式を本章後半で定理として証明します。微積分学の基本定理、Green の定理、Gauss--Ostrogradsky の発散定理、Kelvin--Stokes の定理は全てこの一式へ入ります。

---

## 1. 向きは「正の基底」を選ぶこと

$n$ 次元実ベクトル空間 $V$ の二つの順序付き基底

$$
B=(v_1,\dots,v_n),
\qquad
B'=(w_1,\dots,w_n)
$$

を考えます。$B$ から $B'$ への基底変換行列を $A$ とするとき、

$$
\det A>0
$$

であることを「同じ向き」とみなします。

<a id="def-geo8-vector-space-orientation"></a>
<!-- formal-statement-start -->
> **定義（ベクトル空間の向き）**  
> 有限次元実ベクトル空間 $V$ の順序付き基底全体に、基底変換行列の行列式が正であるとき同値とする関係を入れる。この同値類を $V$ の **向き** という。
>
> 一つの向きを選んだとき、その同値類に属する基底を **正の基底**、もう一方を **負の基底**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo8-vector-space-orientation -->
**定義の確認**

$\mathbb R^2$ の標準基底 $(e_1,e_2)$ を正とします。

$$
(e_1+e_2,e_2)
$$

への基底変換行列は

$$
\begin{pmatrix}
1&0\\
1&1
\end{pmatrix}
$$

で行列式は $1>0$ なので同じ向きです。一方

$$
(e_2,e_1)
$$

は交換を1回行っており、行列式は $-1$ なので逆向きです。
<!-- definition-example-end -->

向きは長さや角度を必要としません。必要なのは「基底変換が正の行列式か負の行列式か」だけです。

---

## 2. 多様体では座標変換の符号をそろえる

滑らかな $n$ 次元多様体 $M$ で、二つの座標近傍

$$
(U,x),
\qquad
(V,y)
$$

が重なるとします。重なり上の座標変換

$$
y\circ x^{-1}
$$

の Jacobi 行列式が正なら、二つの座標は同じ向きを定めます。

<a id="def-geo8-oriented-atlas"></a>
<!-- formal-statement-start -->
> **定義（向き付けられたアトラス・多様体の向き）**  
> 滑らかな $n$ 次元多様体 $M$ のアトラス $\{(U_\alpha,x_\alpha)\}$ が、任意の重なり $U_\alpha\cap U_\beta$ 上で
>
> $$
> \det D(x_\beta\circ x_\alpha^{-1})>0
> $$
>
> を満たすとき、これを **向き付けられたアトラス**という。
>
> ある向き付けられたアトラスと向きを保って両立する座標近傍を全て集めた極大アトラスを $M$ の **向き**という。そのような向きを持てる $M$ を **向き付け可能**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo8-oriented-atlas -->
**定義の確認**

$\mathbb R^n$ の標準座標は標準向きを定めます。$\mathbb R^2$ で

$$
y^1=x^1+x^2,
\qquad
y^2=x^2
$$

とすると

$$
\det\frac{\partial(y^1,y^2)}{\partial(x^1,x^2)}=1>0
$$

なので同じ向きです。

一方

$$
y^1=x^2,
\qquad y^2=x^1
$$

では行列式は $-1$ なので向きを反転します。
<!-- definition-example-end -->

連結な向き付け可能多様体では、向きは全体として二通りです。非連結なら各連結成分ごとに選べます。

---

## 3. 消えない最高次形式は向きを記録する

$n$ 次元多様体では、各点で $\Lambda^n(T_p^*M)$ は1次元です。したがって、消えない $n$ 形式は「どちらの向きを正とするか」を点ごとに記録できます。

<a id="def-geo8-orientation-form"></a>
<!-- formal-statement-start -->
> **定義（向き形式）**  
> $M$ を $n$ 次元滑らかな多様体とする。どの点でも消えない滑らかな $n$ 形式
>
> $$
> \mu\in\Omega^n(M),
> \qquad
> \mu_p\ne0\quad(p\in M)
> $$
>
> を **向き形式**という。
>
> 向きが選ばれているとき、任意の正の基底 $(v_1,\dots,v_n)$ に対して
>
> $$
> \mu_p(v_1,\dots,v_n)>0
> $$
>
> なら、$\mu$ はその向きと整合するという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo8-orientation-form -->
**定義の確認**

標準向きの $\mathbb R^n$ では

$$
dx^1\wedge\cdots\wedge dx^n
$$

が向き形式です。標準基底に入れると値は $1$ です。

正の滑らかな関数 $f>0$ に対して

$$
f\,dx^1\wedge\cdots\wedge dx^n
$$

も同じ向きを表します。$f<0$ なら逆向きです。
<!-- definition-example-end -->

<a id="thm-geo8-orientability-form"></a>
<!-- formal-statement-start -->
> **定理（向き付け可能性と向き形式）**  
> 滑らかな $n$ 次元多様体 $M$ について、次は同値である。
>
> 1. $M$ は向き付け可能である。
> 2. $M$ は向き形式を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

向き形式があれば、それが正になる座標だけを選べば向き付けられたアトラスが得られます。逆向きには、向き付けられた座標ごとの標準最高次形式を [GEO4 の 1 の分割](../GEO4/index.md#thm-geo4-partition-of-unity) で混ぜます。重なりでは全て同じ向きなので、正の係数の和が0になりません。

<!-- proof-start -->
### 証明

まず向き形式 $\mu$ があるとします。各点 $p$ で局所座標 $(x^1,\dots,x^n)$ を取り、

$$
\mu
=
a\,dx^1\wedge\cdots\wedge dx^n
$$

と書きます。$\mu_p\ne0$ なので、必要なら座標の二成分を交換して $a(p)>0$ とできます。連続性から座標近傍を小さく取れば $a>0$ です。このような座標を全点で選びます。

二つの選んだ座標 $x,y$ が重なると、[GEO7 の引き戻し](../GEO7/index.md#def-geo7-pullback-form) と最高次形式の基底変換から

$$
\mu
=
a\,dx^1\wedge\cdots\wedge dx^n
=
b\,dy^1\wedge\cdots\wedge dy^n
$$

であり、$a,b>0$ です。したがって

$$
\det D(y\circ x^{-1})>0.
$$

よって向き付けられたアトラスが得られます。

逆に向き付けられたアトラス $\{(U_\alpha,x_\alpha)\}$ があるとします。[GEO4 の定理](../GEO4/index.md#thm-geo4-partition-of-unity)により、この被覆に従属する滑らかな 1 の分割 $(\varphi_j)$ を取ります。各 $j$ に対して $\operatorname{supp}\varphi_j\subset U_{\alpha(j)}$ とし、

$$
\mu_j
:=
\varphi_j\,
(dx_{\alpha(j)}^1\wedge\cdots\wedge dx_{\alpha(j)}^n)
$$

を $U_{\alpha(j)}$ の外では0として延長します。局所有限性により

$$
\mu:=\sum_j\mu_j
$$

は滑らかな $n$ 形式です。

点 $p$ を固定し、$p$ を含む一つの向き付けられた座標 $x$ を取ります。各 $\mu_j$ は $p$ の近くで

$$
\mu_j
=
\varphi_j c_j\,
dx^1\wedge\cdots\wedge dx^n
$$

と書けます。座標変換は向きを保つので $c_j>0$ です。また $\sum_j\varphi_j(p)=1$ なので、少なくとも一つは $\varphi_j(p)>0$ です。従って

$$
\sum_j\varphi_j(p)c_j(p)>0.
$$

ゆえに $\mu_p\ne0$ です。したがって $\mu$ は向き形式です。$\square$
<!-- proof-end -->

この証明で 1 の分割が必要なのは、局所的な「正の最高次形式」を大域的に貼り合わせるためです。

---

## 4. 境界付き多様体

本章の大域積分公式では「領域の境界」を多様体自身の構造として扱います。符号計算を見通しよくするため、本章では標準半空間を

$$
\mathbb H_-^n
:=
\{(x^1,\dots,x^n)\in\mathbb R^n:x^1\le0\}
$$

とします。

<a id="def-geo8-manifold-with-boundary"></a>
<!-- formal-statement-start -->
> **定義（境界付き滑らかな多様体）**  
> Hausdorff・第二可算な位相空間 $M$ が $n$ 次元 **境界付き滑らかな多様体**であるとは、各点が $\mathbb H_-^n$ の相対開集合と同相な座標近傍を持ち、座標変換とその逆が境界点の近くで $\mathbb R^n$ 上の滑らかな写像へ延長できる滑らかな構造を持つことをいう。
>
> 次の補題により、ある境界座標で $x^1=0$ に写るか $x^1<0$ に写るかは座標の選択に依らない。前者の点全体を **境界** $\partial M$、後者を **内部** $\operatorname{Int}M$ という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo8-manifold-with-boundary -->
**定義の確認**

閉区間

$$
[0,1]
$$

は1次元境界付き多様体で、

$$
\partial[0,1]=\{0,1\}.
$$

閉円板

$$
D^2=\{(x,y):x^2+y^2\le1\}
$$

は2次元境界付き多様体で、

$$
\partial D^2=S^1.
$$

円周上では、半径方向を一つの座標として用いれば局所的に半平面へ直せます。
<!-- definition-example-end -->
<a id="lem-geo8-boundary-chart-invariance"></a>
<!-- formal-statement-start -->
> **補題（境界座標変換は境界を保つ）**  
> $U,V\subset\mathbb H_-^n$ を相対開集合とし、$F:U\to V$ を上の意味での滑らかな座標変換とする。このとき
>
> $$
> p^1=0\quad\Longleftrightarrow\quad F(p)^1=0.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p^1=0$ なのに $q:=F(p)$ が内部点、すなわち $q^1<0$ だと仮定します。$q$ は $\mathbb R^n$ の通常の内部点なので、小さい Euclid 開球 $B$ を

$$
q\in B\subset V\cap\{x^1<0\}
$$

となるように取れます。逆写像 $G=F^{-1}$ は $q$ の近くで滑らかな写像 $\widetilde G$ へ延長できます。$B$ 上では $G(B)\subset\mathbb H_-^n$ です。

一方、$F$ の滑らかな延長を $\widetilde F$ と書けば、$B$ 上で

$$
\widetilde F\circ\widetilde G=\operatorname{id}
$$

です。従って連鎖律から

$$
D\widetilde F_p\,D\widetilde G_q=I,
$$

ゆえに $D\widetilde G_q$ は可逆です。[RA6A の逆関数定理](../RA6A/index.md)より、$\widetilde G$ は $q$ の十分小さい Euclid 開近傍を $p$ の Euclid 開近傍へ写します。ところがその近傍を $B$ 内に取れば像は $G(B)\subset\mathbb H_-^n$ に含まれます。境界点 $p$ の Euclid 開近傍が半空間だけに含まれることはないので矛盾です。

従って境界点は境界点へ写ります。逆写像にも同じ議論を適用すれば逆向きも従います。$\square$
<!-- proof-end -->


<a id="thm-geo8-boundary-submanifold"></a>
<!-- formal-statement-start -->
> **定理（境界は余次元1の滑らかな多様体）**  
> $M$ を $n$ 次元境界付き滑らかな多様体とする。このとき $\partial M$ は自然に $(n-1)$ 次元の滑らかな多様体になる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

境界座標

$$
x=(x^1,\dots,x^n):U\to W\subset\mathbb H_-^n
$$

を取ります。境界上では $x^1=0$ なので

$$
\bar x=(x^2,\dots,x^n)
$$

を $U\cap\partial M$ の座標とします。

二つの境界座標 $x,y$ が重なるとき、元の座標変換 $y\circ x^{-1}$ は半空間の境界を境界へ写します。従って第2成分以降を境界 $x^1=0$ に制限した写像が $\bar y\circ\bar x^{-1}$ です。これは元の滑らかな座標変換の制限なので滑らかで、逆も同様です。

さらに $\partial M$ は $M$ の部分空間なので Hausdorff 性と第二可算性を受け継ぎます。したがって $(\bar x)$ は $\partial M$ 上の $(n-1)$ 次元滑らかな多様体構造を定めます。$\square$
<!-- proof-end -->

---

## 5. 内部の向きから境界の向きを決める

境界の向きは任意に選ぶのではありません。Stokes の符号を正しくするには、内部の向きから誘導します。

<a id="def-geo8-boundary-orientation"></a>
<!-- formal-statement-start -->
> **定義（境界向き）**  
> $M$ を向き付けられた $n$ 次元境界付き多様体とする。$p\in\partial M$ で、境界座標 $x$ に対して $dx^1_p(\nu)>0$ を満たす $\nu\in T_pM$ を **外向きベクトル**とする。境界座標変換は $x^1=0$ を保ち、内部 $x^1<0$ を内部へ写すので、この「外向き」は座標の選択に依らない。
>
> $T_p\partial M$ の基底 $(v_1,\dots,v_{n-1})$ が **正**であるとは、
>
> $$
> (\nu,v_1,\dots,v_{n-1})
> $$
>
> が $T_pM$ の正の基底になることをいう。これを **外向き先頭規約**による境界向きという。
<!-- formal-statement-end -->

この定義は外向きベクトル $\nu$ 自身の選び方にも依りません。同じ点で二つの外向きベクトル $\nu,\nu'$ を取ると、法線方向の係数は同じ向きなので

$$
\nu'=a\nu+w,
\qquad a>0,\quad w\in T_p\partial M
$$

と書けます。境界接ベクトル $(v_1,\dots,v_{n-1})$ と並べた行列式は正の係数 $a$ だけを受けるため、正負の判定は変わりません。

<!-- definition-example-start: def-geo8-boundary-orientation -->
**定義の確認：円板**

$D^2$ を $dx\wedge dy$ で向き付けます。境界上の

$$
\gamma(\theta)=(\cos\theta,\sin\theta)
$$

で、外向きベクトルを

$$
\nu=(\cos\theta,\sin\theta)
$$

とします。反時計回り接ベクトルは

$$
\gamma'(\theta)=(-\sin\theta,\cos\theta).
$$

行列式は

$$
\det
\begin{pmatrix}
\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta
\end{pmatrix}
=1>0.
$$

したがって円板の標準向きが誘導する $S^1$ の正向きは反時計回りです。
<!-- definition-example-end -->

1次元ではこの規約から、向き付けられた区間 $[a,b]$ の境界は

$$
\partial[a,b]=\{b\}-\{a\}
$$

という符号になります。これは後で微積分学の基本定理の $f(b)-f(a)$ をそのまま生みます。

---

## 6. 一つの向き付けられた座標内で最高次形式を積分する

$M$ を向き付けられた $n$ 次元多様体とします。境界がある場合も許し、境界点では前節の半空間座標を使います。$\omega$ を一つの向き付けられた座標近傍 $(U,x)$ の中にコンパクトな台を持つ $n$ 形式とします。

局所座標では一意に

$$
\omega
=
f\,dx^1\wedge\cdots\wedge dx^n
$$

と書けます。

<a id="def-geo8-local-form-integral"></a>
<!-- formal-statement-start -->
> **定義（座標近傍内の最高次形式の積分）**  
> 上の状況で
>
> $$
> \int_M\omega
> :=
> \int_{x(U)} f\circ x^{-1}(u)\,du^1\cdots du^n
> $$
>
> と定める。台が $U$ の中でコンパクトなので、境界のない座標では被積分関数を $x(U)$ の外で0とした通常の多重積分として扱える。境界座標では $x(U)\subset\mathbb H_-^n$ 上で積分し、境界超平面 $x^1=0$ は $n$ 次元 Jordan 体積0なので積分値には寄与しない。
<!-- formal-statement-end -->

この定義が座標の選び方に依存しないことが最初の核心です。

<a id="thm-geo8-local-integral-invariance"></a>
<!-- formal-statement-start -->
> **定理（最高次形式の局所積分の座標不変性）**  
> 同じ $n$ 形式 $\omega$ の台を含む二つの向き付けられた座標 $(U,x)$、$(V,y)$ で上の積分を計算すると、同じ値を得る。
<!-- formal-statement-end -->

### 証明の見取り図

最高次形式の係数は座標変換の行列式を1個受けます。一方 [RA7 の多変数変数変換定理](../RA7/index.md) でも体積要素が行列式を1個受けます。向きを保つ座標変換では行列式が正なので、絶対値との食い違いがありません。

<!-- proof-start -->
### 証明

重なり上で

$$
y=y(x)
$$

とします。$y$ 座標で

$$
\omega
=
g(y)\,dy^1\wedge\cdots\wedge dy^n
$$

と書けば、[GEO7 の引き戻し](../GEO7/index.md#def-geo7-pullback-form)より

$$
\omega
=
g(y(x))
\det\left(\frac{\partial y}{\partial x}\right)
\,dx^1\wedge\cdots\wedge dx^n.
$$

したがって $x$ 座標での係数は

$$
f(x)
=
g(y(x))
\det\left(\frac{\partial y}{\partial x}\right).
$$

両座標は向きを保つので

$$
\det\left(\frac{\partial y}{\partial x}\right)>0.
$$

境界を持たない場合は [RA7 の多変数変数変換定理](../RA7/index.md) をそのまま適用して

$$
\int f(x)\,dx
=
\int g(y)\,dy
$$

を得ます。境界座標の場合も、座標変換は内部 $x^1<0$ を内部 $y^1<0$ へ写すので、まず内部に制限して同じ変数変換定理を適用します。残る境界超平面は $n$ 次元 Jordan 体積0であり、積分値を変えません。従って同じ等式が境界付きの場合にも成立します。

したがって局所積分は向き付けられた座標の選択に依存しません。$\square$
<!-- proof-end -->

向きを反転した座標を許すと、最高次形式の係数には負符号が出ます。これが「微分形式の積分に向きが必要」な理由です。

---

## 7. 1 の分割で大域積分を定義する

<a id="def-geo8-global-form-integral"></a>
<!-- formal-statement-start -->
> **定義（多様体上の最高次形式の積分）**  
> $M$ を向き付けられた $n$ 次元多様体、$\omega\in\Omega^n(M)$ をコンパクト台を持つ $n$ 形式とする。
>
> 向き付けられた座標近傍による開被覆 $\{U_\alpha\}$ と、それに従属する滑らかな 1 の分割 $(\varphi_j)$ を取り、
>
> $$
> \int_M\omega
> :=
> \sum_j\int_M\varphi_j\omega
> $$
>
> と定める。
<!-- formal-statement-end -->

$\operatorname{supp}\omega$ はコンパクトで、$(\operatorname{supp}\varphi_j)$ は局所有限なので、実際に寄与する $j$ は有限個です。

<a id="prop-geo8-global-integral-well-defined"></a>
<!-- formal-statement-start -->
> **命題（大域積分は 1 の分割に依存しない）**  
> 上の定義で得られる $\int_M\omega$ は、向き付けられた座標被覆と従属する 1 の分割の選択に依存しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二つの 1 の分割 $(\varphi_i)$ と $(\psi_k)$ を取ります。コンパクト台上では全て有限和として扱えます。

$$
\sum_i\int_M\varphi_i\omega
=
\sum_i\int_M\varphi_i
\left(\sum_k\psi_k\right)\omega.
$$

有限和を入れ替えて

$$
=
\sum_{i,k}\int_M\varphi_i\psi_k\omega.
$$

各 $\varphi_i\psi_k\omega$ は二つの座標近傍の重なりに台を持ちます。前節の座標不変性により、どちら側の座標で計算しても同じです。したがって

$$
\sum_{i,k}\int_M\varphi_i\psi_k\omega
=
\sum_k\int_M
\left(\sum_i\varphi_i\right)\psi_k\omega
=
\sum_k\int_M\psi_k\omega.
$$

よって定義は選択に依存しません。$\square$
<!-- proof-end -->

以後、境界上の積分では包含写像

$$
\iota:\partial M\hookrightarrow M
$$

による引き戻し $\iota^*\omega$ を単に $\omega$ と書くことがあります。

---

## 8. 半空間での局所 Stokes

一般 Stokes の証明の本体は、実は半空間上の一変数微積分学の基本定理です。

<a id="lem-geo8-local-stokes-halfspace"></a>
<!-- formal-statement-start -->
> **補題（半空間上の局所 Stokes）**  
> $\mathbb H_-^n=\{x^1\le0\}$ を標準向き
>
> $$
> dx^1\wedge\cdots\wedge dx^n
> $$
>
> で向き付ける。$\eta$ を $\mathbb H_-^n$ 内にコンパクト台を持つ滑らかな $(n-1)$ 形式とする。
>
> 境界 $\{x^1=0\}$ を外向き先頭規約で向き付けると
>
> $$
> \int_{\mathbb H_-^n}d\eta
> =
> \int_{\partial\mathbb H_-^n}\eta.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

$\eta$ を「$dx^i$ を一つずつ抜いた形」に展開します。境界へ引き戻したときに残るのは $dx^1$ を含まない項だけです。内部積分でも、それに対応する $x^1$ 微分だけが境界値を残し、他の座標方向の微分はコンパクト台のおかげで両端0になります。

<!-- proof-start -->
### 証明

一意に

$$
\eta
=
\sum_{i=1}^n
(-1)^{i-1}a_i
\,dx^1\wedge\cdots\wedge\widehat{dx^i}\wedge\cdots\wedge dx^n
$$

と書けます。外微分を取ると、各項で同じ微分形式が重複する偏微分は消え、

$$
d\eta
=
\left(
\sum_{i=1}^n\frac{\partial a_i}{\partial x^i}
\right)
 dx^1\wedge\cdots\wedge dx^n.
$$

$i\ge2$ の項を積分すると、$x^i$ 方向にコンパクト台を持つので一変数の基本定理から

$$
\int_{-\infty}^{\infty}
\frac{\partial a_i}{\partial x^i}
\,dx^i
=0.
$$

一方 $i=1$ では $x^1\le0$ なので

$$
\int_{-\infty}^{0}
\frac{\partial a_1}{\partial x^1}
\,dx^1
=
a_1(0,x^2,\dots,x^n).
$$

従って

$$
\int_{\mathbb H_-^n}d\eta
=
\int_{\mathbb R^{n-1}}
a_1(0,x^2,\dots,x^n)
\,dx^2\cdots dx^n.
$$

境界では外向きベクトルは $+\partial_{x^1}$ です。外向き先頭規約から

$$
(\partial_{x^2},\dots,\partial_{x^n})
$$

が境界の正の基底です。また包含写像で境界へ引き戻すと、$dx^1$ を含む項は全て0になり、

$$
\iota^*\eta
=
a_1(0,x^2,\dots,x^n)
\,dx^2\wedge\cdots\wedge dx^n.
$$

したがって

$$
\int_{\partial\mathbb H_-^n}\eta
=
\int_{\mathbb R^{n-1}}
a_1(0,x^2,\dots,x^n)
\,dx^2\cdots dx^n.
$$

両者が一致します。$\square$
<!-- proof-end -->

境界を持たない $\mathbb R^n$ の開集合内にコンパクト台を持つ $(n-1)$ 形式についても同じ計算を行うと、全方向で端点寄与が0なので

$$
\int d\eta=0
$$

です。

---

## 9. 大域化：外微分と境界積分を結ぶ

<a id="thm-geo8-general-stokes"></a>
<!-- formal-statement-start -->
> **定理（一般 Stokes の定理）**  
> $M$ を向き付けられた $n$ 次元境界付き滑らかな多様体とし、$\partial M$ には外向き先頭規約による境界向きを入れる。
>
> $\omega\in\Omega^{n-1}(M)$ がコンパクト台を持つなら
>
> $$
> \boxed{
> \int_M d\omega
> =
> \int_{\partial M}\omega
> }.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

1. $\operatorname{supp}\omega$ を内部座標と境界座標で覆る。
2. [GEO4 の 1 の分割](../GEO4/index.md#thm-geo4-partition-of-unity) で $\omega$ を各座標内に台を持つ形式へ分解する。
3. 内部座標では積分は0、境界座標では前節の半空間補題になる。
4. 1 の分割を微分した人工的な項は $d(\sum\varphi_j)=d1=0$ により総和で消える。これが内部境界の相殺に相当する。

<!-- proof-start -->
### 証明

$K=\operatorname{supp}\omega$ はコンパクトです。$K$ を、内部点では $\mathbb R^n$ の開集合へ写る向き付けられた座標、境界点では $\mathbb H_-^n$ の相対開集合へ写る向き付けられた境界座標で覆います。さらに $M\setminus K$ を加えて $M$ 全体の開被覆にします。

この被覆に従属する滑らかな 1 の分割 $(\varphi_j)$ を [GEO4](../GEO4/index.md#thm-geo4-partition-of-unity) から取ります。$M\setminus K$ に従属する項を $\omega$ に掛けると0です。また局所有限性と $K$ のコンパクト性から、$K$ と交わって実際に寄与する項は有限個です。従って

$$
\omega
=
\sum_j\varphi_j\omega.
$$

外微分の線形性から

$$
d\omega
=
\sum_j d(\varphi_j\omega).
$$

この等式は、[GEO7 の次数付き Leibniz 則](../GEO7/index.md#thm-geo7-graded-leibniz)で展開しても確認できます。実際

$$
\sum_j d(\varphi_j\omega)
=
\sum_j d\varphi_j\wedge\omega
+
\sum_j\varphi_j d\omega.
$$

第一和は

$$
\left(d\sum_j\varphi_j\right)\wedge\omega
=
d1\wedge\omega
=0,
$$

第二和は $d\omega$ です。したがって、座標パッチどうしに人工的に作った内部境界の寄与は総和では残りません。

各 $\eta_j:=\varphi_j\omega$ は一つの座標内にコンパクト台を持ちます。

内部座標に台を持つ項については、境界なしの局所計算から

$$
\int_M d\eta_j=0,
$$

かつ $\eta_j$ は $\partial M$ 上で0なので

$$
\int_{\partial M}\eta_j=0.
$$

境界座標に台を持つ項については、その座標で半空間の局所 Stokes 補題を適用できます。座標変換が向きを保ち、境界向きも外向き先頭規約で一致するため

$$
\int_M d\eta_j
=
\int_{\partial M}\eta_j.
$$

全ての $j$ について足し合わせると

$$
\int_M d\omega
=
\sum_j\int_Md\eta_j
=
\sum_j\int_{\partial M}\eta_j
=
\int_{\partial M}\omega.
$$

これで一般 Stokes の定理が証明されました。$\square$
<!-- proof-end -->

この証明で各仮定の役割は明確です。

- **向き**：座標変換で局所積分の符号をそろえる。
- **コンパクト台**：有限個の局所積分へ落とし、座標方向の端点寄与を消す。
- **1 の分割**：大域形式を一つの座標で扱える局所形式へ分解する。
- **境界向き**：半空間の外向き方向と境界積分の符号を一致させる。
- **外微分の Leibniz 則**：1 の分割の微分項が総和で消えることを保証する。

---

## 10. 微積分学の基本定理は1次元 Stokes

$M=[a,b]$ を $dx$ で向き付け、$f\in C^\infty([a,b])$ を0形式とします。

$$
df=f'(x)\,dx.
$$

境界向きは

$$
\partial[a,b]=\{b\}-\{a\}
$$

です。0次元の向き付き多様体上の0形式の積分は、正向きの点では値を足し、負向きの点では値を引く符号付き和と解釈します。したがって一般 Stokes は

$$
\int_a^b f'(x)\,dx
=
f(b)-f(a).
$$

微積分学の基本定理そのものです。

---

## 11. Green の定理は2次元 Stokes

標準向きの平面領域 $D\subset\mathbb R^2$ で

$$
\omega=P\,dx+Q\,dy
$$

とすると

$$
d\omega
=
(Q_x-P_y)\,dx\wedge dy.
$$

境界向きは領域を左側に見る反時計回りの向きです。したがって一般 Stokes は

$$
\int_{\partial D}P\,dx+Q\,dy
=
\iint_D(Q_x-P_y)\,dx\,dy,
$$

すなわち [VC4 の Green の定理](../VC4/index.md#thm-vc4-green-circulation) を与えます。

---

## 12. Kelvin--Stokes の定理は1形式の Stokes

$\mathbb R^3$ のベクトル場

$$
F=(P,Q,R)
$$

に対し、Euclid 内積を使って1形式

$$
\omega=P\,dx+Q\,dy+R\,dz
$$

を対応させます。直接計算すると

$$
\begin{aligned}
d\omega
&=(Q_x-P_y)\,dx\wedge dy\\
&\quad +(R_y-Q_z)\,dy\wedge dz\\
&\quad +(P_z-R_x)\,dz\wedge dx.
\end{aligned}
$$

これは回転 $\nabla\times F$ の流束2形式です。したがって向き付けられた曲面 $S$ について一般 Stokes は

$$
\int_{\partial S}F\cdot dr
=
\int_S(\nabla\times F)\cdot n\,dS,
$$

すなわち [VC5 の Kelvin--Stokes の定理](../VC5/index.md#thm-vc5-stokes) を回収します。

VC5 では曲面をパラメータ平面へ戻して Green の定理から証明しました。本章では、それが一般 Stokes の一例であることが分かります。

---

## 13. Gauss--Ostrogradsky の発散定理も Stokes

標準体積形式

$$
\mathrm{vol}
=
dx\wedge dy\wedge dz
$$

とベクトル場

$$
F=P\partial_x+Q\partial_y+R\partial_z
$$

を考えます。[GEO7 の内部積](../GEO7/index.md#def-geo7-interior-product)により

$$
\eta
:=
\iota_F\mathrm{vol}
=
P\,dy\wedge dz
-Q\,dx\wedge dz
+R\,dx\wedge dy.
$$

外微分を取ると

$$
d\eta
=
(P_x+Q_y+R_z)
\,dx\wedge dy\wedge dz
=
(\operatorname{div}F)\,\mathrm{vol}.
$$

境界曲面へ引き戻した $\eta$ は $F\cdot n\,dS$ に一致します。したがって一般 Stokes は

$$
\iiint_\Omega\operatorname{div}F\,dV
=
\iint_{\partial\Omega}F\cdot n\,dS,
$$
すなわち [VC4 の Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence) になります。

この対応では「ベクトル場を体積形式へ差し込む」という操作が、ベクトル解析の流束を微分形式へ翻訳しています。

---

## 14. 演習

### GEO8-A01 向きを保つ座標変換

$\mathbb R^2$ で

$$
y^1=2x^1+x^2,
\qquad
y^2=x^1+x^2
$$

とする。

1. Jacobi 行列式を求めよ。
2. 標準向きを保つか判定せよ。
3. $dy^1\wedge dy^2$ を $dx^1\wedge dx^2$ で表せ。

- Level: A
- 狙い: 向きと最高次形式の変換係数を同じ行列式で確認する

<!-- solution-start -->
**詳細解答**

Jacobi 行列は

$$
\frac{\partial(y^1,y^2)}{\partial(x^1,x^2)}
=
\begin{pmatrix}
2&1\\
1&1
\end{pmatrix}
$$

なので

$$
\det=2\cdot1-1\cdot1=1>0.
$$

従ってこの座標変換は標準向きを保ちます。

また

$$
dy^1=2dx^1+dx^2,
\qquad
dy^2=dx^1+dx^2.
$$

よって

$$
\begin{aligned}
dy^1\wedge dy^2
&=(2dx^1+dx^2)\wedge(dx^1+dx^2)\\
&=2dx^1\wedge dx^2+dx^2\wedge dx^1\\
&=dx^1\wedge dx^2.
\end{aligned}
$$

係数は行列式 $1$ と一致します。
<!-- solution-end -->

### GEO8-A02 区間の境界向き

$[a,b]$ を $dx$ で向き付ける。

1. 点 $a$ で外向きベクトルの符号を答えよ。
2. 点 $b$ で外向きベクトルの符号を答えよ。
3. 0形式 $f$ に Stokes の定理を適用し、微積分学の基本定理を得よ。

- Level: A
- 狙い: 外向き先頭規約が端点の符号を決めることを確認する

<!-- solution-start -->
**詳細解答**

区間の内部で正方向は $+\partial_x$ です。

左端 $a$ で外向きは区間の外へ出る

$$
-\partial_x
$$

なので、$a$ は負の境界点です。

右端 $b$ では外向きが

$$
+\partial_x
$$

なので、$b$ は正の境界点です。したがって

$$
\partial[a,b]=\{b\}-\{a\}.
$$

$f$ に対して

$$
df=f'(x)dx
$$

なので Stokes より

$$
\int_a^b f'(x)dx
=
\int_{\partial[a,b]}f
=
f(b)-f(a).
$$
<!-- solution-end -->

### GEO8-A03 円板の境界向き

単位円板 $D^2$ を $dx\wedge dy$ で向き付ける。

$$
\gamma(\theta)=(\cos\theta,\sin\theta)
$$

について、$\gamma'(\theta)$ が誘導された境界の正向きであることを示せ。

- Level: A
- 狙い: 外向き先頭規約を具体的な行列式で検証する

<!-- solution-start -->
**詳細解答**

境界上の外向きベクトルは

$$
\nu(\theta)=(\cos\theta,\sin\theta)
$$

です。また

$$
\gamma'(\theta)=(-\sin\theta,\cos\theta).
$$

この二本を列に持つ行列の行列式は

$$
\det
\begin{pmatrix}
\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta
\end{pmatrix}
=
\cos^2\theta+\sin^2\theta
=1>0.
$$

従って

$$
(\nu,\gamma')
$$

は平面の正の基底です。外向き先頭規約より $\gamma'$ は境界の正向きです。したがって正向きは反時計回りです。
<!-- solution-end -->

### GEO8-A04 円板で Stokes を直接確認する

単位円板 $D^2$ 上の1形式

$$
\omega=x\,dy
$$

について、

1. $d\omega$ を求めよ。
2. $\int_{D^2}d\omega$ を求めよ。
3. 境界 $S^1$ を正向きにパラメータ表示して $\int_{S^1}\omega$ を求め、一致を確認せよ。

- Level: A
- 狙い: 一般 Stokes を最小の2次元例で計算する

<!-- solution-start -->
**詳細解答**

まず

$$
d\omega=dx\wedge dy.
$$

したがって

$$
\int_{D^2}d\omega
=
\operatorname{area}(D^2)
=
\pi.
$$

境界は反時計回りに

$$
\gamma(\theta)=(\cos\theta,\sin\theta),
\qquad0\le\theta\le2\pi
$$

と取れます。

$$
x\circ\gamma=\cos\theta,
\qquad
\gamma^*dy=d(\sin\theta)=\cos\theta\,d\theta.
$$

従って

$$
\gamma^*\omega
=
\cos^2\theta\,d\theta.
$$

よって

$$
\int_{S^1}\omega
=
\int_0^{2\pi}\cos^2\theta\,d\theta
=
\pi.
$$

従って

$$
\boxed{
\int_{D^2}d\omega
=
\int_{S^1}\omega
=
\pi
}.
$$
<!-- solution-end -->

### GEO8-B01 1 の分割で向き形式が消えない理由

向き付けられた $n$ 次元多様体 $M$ の向き付けられた座標被覆 $(U_i,x_i)$ と、それに従属する 1 の分割 $(\varphi_i)$ を考える。

$$
\mu
=
\sum_i\varphi_i
\,dx_i^1\wedge\cdots\wedge dx_i^n
$$

と局所的に定める構成について、任意の点 $p$ で $\mu_p\ne0$ であることを詳しく示せ。

- Level: B
- 狙い: 向き付け可能性から向き形式を作る証明機構を再構成する

<!-- solution-start -->
**詳細解答**

点 $p$ を固定し、$p$ を含む一つの向き付けられた座標 $(U,x)$ を取ります。

$p$ の近くで各座標最高次形式は

$$
dx_i^1\wedge\cdots\wedge dx_i^n
=
c_i\,dx^1\wedge\cdots\wedge dx^n
$$

と書けます。二つの座標はどちらも選ばれた向きを保つので、座標変換の行列式は正です。従って

$$
c_i>0.
$$

よって

$$
\mu
=
\left(\sum_i\varphi_i c_i\right)
 dx^1\wedge\cdots\wedge dx^n.
$$

1 の分割なので

$$
\varphi_i\ge0,
\qquad
\sum_i\varphi_i(p)=1.
$$

したがって少なくとも一つの $i$ で $\varphi_i(p)>0$ です。その $i$ では $c_i(p)>0$ なので

$$
\sum_i\varphi_i(p)c_i(p)>0.
$$

よって $\mu_p$ の係数は0ではなく、

$$
\boxed{\mu_p\ne0}.
$$

この議論で「全ての局所最高次形式が同じ向き」であることが決定的です。逆向きのものを混ぜれば正負が相殺する可能性があります。
<!-- solution-end -->

### GEO8-B02 円環の内側境界は時計回り

$$
A=\{(x,y):r^2\le x^2+y^2\le R^2\},
\qquad0<r<R
$$

を $dx\wedge dy$ で向き付ける。1形式

$$
\omega
=
\frac12(-y\,dx+x\,dy)
$$

について、

1. $d\omega$ を求めよ。
2. 外側境界の誘導向きが反時計回り、内側境界の誘導向きが時計回りであることを示せ。
3. $\int_A d\omega$ と $\int_{\partial A}\omega$ を別々に計算して一致を確認せよ。

- Level: B
- 狙い: 穴を持つ領域で境界向きの符号を確認する

<!-- solution-start -->
**詳細解答**

外微分は

$$
\begin{aligned}
d\omega
&=\frac12(-dy\wedge dx+dx\wedge dy)\\
&=dx\wedge dy.
\end{aligned}
$$

したがって

$$
\int_A d\omega
=
\pi(R^2-r^2).
$$

外側円では外向き法線が半径外向きなので、外向き先頭規約から反時計回りが正です。

内側円では「領域 $A$ から外へ出る」方向は穴の中心へ向かう半径内向きです。したがって外向き先頭規約を満たす接線方向は時計回りになります。

半径 $\rho$ の反時計回り円

$$
\gamma_\rho(\theta)=(\rho\cos\theta,\rho\sin\theta)
$$

では

$$
\gamma_\rho^*\omega
=
\frac12\rho^2d\theta.
$$

よって外側境界の寄与は

$$
\pi R^2.
$$

内側は時計回りなので符号が反転し

$$
-\pi r^2.
$$

従って

$$
\int_{\partial A}\omega
=
\pi R^2-\pi r^2
=
\pi(R^2-r^2).
$$

よって

$$
\boxed{
\int_A d\omega
=
\int_{\partial A}\omega
}.
$$
<!-- solution-end -->

### GEO8-B03 発散定理を微分形式から導く

$\Omega\subset\mathbb R^3$ を滑らかな境界を持つコンパクト領域とし、

$$
F=P\partial_x+Q\partial_y+R\partial_z
$$

を滑らかなベクトル場とする。

$$
\eta=\iota_F(dx\wedge dy\wedge dz)
$$

として、

1. $\eta$ を成分表示せよ。
2. $d\eta=(\operatorname{div}F)dx\wedge dy\wedge dz$ を示せ。
3. 境界上で $\eta$ が $F\cdot n\,dS$ を表す理由を説明し、Gauss--Ostrogradsky の発散定理を導け。

- Level: B
- 狙い: 内部積・外微分・一般 Stokes から発散定理を再構成する

<!-- solution-start -->
**詳細解答**

内部積の定義から

$$
\iota_{\partial_x}(dx\wedge dy\wedge dz)=dy\wedge dz,
$$

$$
\iota_{\partial_y}(dx\wedge dy\wedge dz)=-dx\wedge dz,
$$

$$
\iota_{\partial_z}(dx\wedge dy\wedge dz)=dx\wedge dy.
$$

従って

$$
\eta
=
P\,dy\wedge dz
-Q\,dx\wedge dz
+R\,dx\wedge dy.
$$

外微分を取ると、重複する微分形式を含む項は消えるので

$$
d(P\,dy\wedge dz)=P_x\,dx\wedge dy\wedge dz,
$$

$$
d(-Q\,dx\wedge dz)=Q_y\,dx\wedge dy\wedge dz,
$$

$$
d(R\,dx\wedge dy)=R_z\,dx\wedge dy\wedge dz.
$$

よって

$$
d\eta
=
(P_x+Q_y+R_z)
\,dx\wedge dy\wedge dz
=
(\operatorname{div}F)\,dV.
$$

境界上で正向き接ベクトル $(v_1,v_2)$ を取り、外向き単位法線を $n$ とします。境界向きの定義から $(n,v_1,v_2)$ は内部の正の基底です。

$$
\eta(v_1,v_2)
=
(dx\wedge dy\wedge dz)(F,v_1,v_2).
$$

$F$ を法線成分と接成分に分けると、接成分は $v_1,v_2$ と一次従属になるため体積形式に入れると0です。従って法線成分だけが残り、

$$
\eta(v_1,v_2)
=
(F\cdot n)
\,dS(v_1,v_2).
$$

すなわち境界上で

$$
\eta=(F\cdot n)dS.
$$

一般 Stokes を適用すると

$$
\iiint_\Omega\operatorname{div}F\,dV
=
\int_\Omega d\eta
=
\int_{\partial\Omega}\eta
=
\iint_{\partial\Omega}F\cdot n\,dS.
$$

これが Gauss--Ostrogradsky の発散定理です。
<!-- solution-end -->

### GEO8-C01 一般 Stokes から三つの古典積分定理を回収する

一般 Stokes の定理

$$
\int_Md\omega
=
\int_{\partial M}\omega
$$

から、次の三式をそれぞれ適切な $M$ と $\omega$ を選んで導け。

1. Green の定理
   $$
   \int_{\partial D}P\,dx+Q\,dy
   =
   \iint_D(Q_x-P_y)\,dx\,dy.
   $$
2. Kelvin--Stokes の定理
   $$
   \int_{\partial S}F\cdot dr
   =
   \iint_S(\nabla\times F)\cdot n\,dS.
   $$
3. Gauss--Ostrogradsky の発散定理
   $$
   \iiint_\Omega\operatorname{div}F\,dV
   =
   \iint_{\partial\Omega}F\cdot n\,dS.
   $$

各場合で、境界向きが古典的な向き規約と一致することも説明せよ。

- Level: C
- 狙い: 一般 Stokes を古典ベクトル解析へ翻訳する辞書を自力で再構成する

<!-- solution-start -->
**詳細解答**

**1. Green の定理**

$$
M=D\subset\mathbb R^2,
\qquad
\omega=P\,dx+Q\,dy
$$

と置きます。

$$
\begin{aligned}
d\omega
&=dP\wedge dx+dQ\wedge dy\\
&=P_y\,dy\wedge dx+Q_x\,dx\wedge dy\\
&=(Q_x-P_y)\,dx\wedge dy.
\end{aligned}
$$

平面の標準向きから誘導される境界向きは、外向き法線を先頭に置いたとき正になる接線方向です。これは領域を左側に見る反時計回り方向です。従って一般 Stokes は Green の定理になります。

**2. Kelvin--Stokes の定理**

$$
M=S,
\qquad
\omega=P\,dx+Q\,dy+R\,dz
$$

とします。計算すると

$$
\begin{aligned}
d\omega
&=(Q_x-P_y)\,dx\wedge dy\\
&\quad +(R_y-Q_z)\,dy\wedge dz\\
&\quad +(P_z-R_x)\,dz\wedge dx.
\end{aligned}
$$

この2形式は向き付けられた曲面上で

$$
(\nabla\times F)\cdot n\,dS
$$

を表します。また境界向きは曲面の選んだ法線向きと右手系をなす接線向きで、VC5 の規約と一致します。よって一般 Stokes から Kelvin--Stokes の定理が得られます。

**3. Gauss--Ostrogradsky の発散定理**

$$
M=\Omega,
\qquad
\omega
=
\iota_F(dx\wedge dy\wedge dz)
$$

と置きます。B03 で計算したように

$$
\omega
=
P\,dy\wedge dz
-Q\,dx\wedge dz
+R\,dx\wedge dy
$$

で、

$$
d\omega
=
(\operatorname{div}F)
\,dx\wedge dy\wedge dz.
$$

境界上では外向き先頭規約により

$$
\omega=(F\cdot n)dS.
$$

従って一般 Stokes は発散定理になります。

三つの定理は、次数と幾何学的な翻訳が違うだけで、全て

$$
\boxed{
\int_Md\omega
=
\int_{\partial M}\omega
}
$$

という同じ構造です。
<!-- solution-end -->

---

## 15. 次章への橋

本章で、微分形式に対する二つの基本操作がつながりました。

$$
\Omega^{n-1}(M)
\xrightarrow{d}
\Omega^n(M)
\xrightarrow{\int_M}
\mathbb R.
$$

一般 Stokes の定理は「外微分したものを内部で積分する」ことと「元の形式を境界で積分する」ことが同じだと述べます。

次の GEO9 では、境界のない状況で

$$
d\omega=0
$$

なのに

$$
\omega=d\eta
$$

とは書けないことがある、という大域的な障害を扱います。局所的には Poincaré の補題で完全形式になるのに、大域的には位相が障害を作る。この差を de Rham コホモロジーとして整理します。