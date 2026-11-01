# QFT29 Faddeev–Popovゲージ固定・ghostとBRST対称性

[QFT28のYang–Mills作用](../QFT28/index.md#def-qft28-yang-mills-action)は、局所変換で形が変わらない古典理論でした。しかし量子論の経路積分で全ての $A_\mu$ をそのまま積分すると、同じ物理的な場を表す無数のゲージ変換像を重ねて数えてしまいます。さらに作用の二次部分はゲージ方向に零モードを持ち、伝播関数を一意に反転できません。これは[QFT16のMaxwell場の零方向](../QFT16/index.md#prop-qft16-zero-mode)の非可換版です。

この重複を減らすため、各ゲージ軌道から条件を満たす代表を選びます。ただし「条件を一つ課す」だけでは積分の体積要素が変わります。そのJacobianがFaddeev–Popov行列式であり、Grassmann変数で表したものがghostです。最後に、ゲージ固定後にも残る代数的な対称性としてBRSTを導きます。

四次元Minkowski空間で $\eta=\operatorname{diag}(1,-1,-1,-1)$、$g>0$、$SU(N)$（$N\ge2$）を固定し、[QFT28の生成子・共変微分](../QFT28/index.md#def-qft28-covariant-derivative)に従います。

$$
D_\mu=\partial_\mu-igA_\mu,\qquad
A_\mu=A_\mu^aT^a,\qquad
[T^a,T^b]=if^{abc}T^c.
$$

時空添字 $\mu,\nu=0,1,2,3$ と内部添字 $a,b,c=1,\ldots,N^2-1$ は反復時に和を取ります。滑らかな場・コンパクト支持の変分をまず扱い、部分積分の境界項は零とします。無限次元の経路積分・汎関数行列式は、有限格子・モードカットオフに切った有限次元計算から書き起こす**形式的摂動論の記法**です。有限カットオフの除去や物理Hilbert空間の構成が証明済みだとは主張しません。

## 1. ゲージ軌道の積分は何を重複して数えるか

[QFT28の無限小変換則](../QFT28/index.md#thm-qft28-gauge-covariance)で $\alpha^a=g\omega^a$ と書き直すと、

$$
\delta_\omega A_\mu^a
=\partial_\mu\omega^a+g f^{abc}A_\mu^b\omega^c.
$$

ここで $\omega^a$ は滑らかな実関数です。右辺は行列値場に作用する[QFT28の随伴共変微分](../QFT28/index.md#def-qft28-curvature)の成分です。以下では、随伴表現の色添字を持つ実係数関数 $v^a$ に対して

$$
(\mathscr D_\mu v)^a
=\partial_\mu v^a+g f^{abc}A_\mu^b v^c
=\mathscr D_\mu^{ac}v^c,\quad
\mathscr D_\mu^{ac}=\delta^{ac}\partial_\mu+g f^{abc}A_\mu^b
$$

と書きます。$D_\mu$ が物質場の列ベクトルに作用するのに対し、$\mathscr D_\mu$ は色添字を持つ関数に作用します。

一つの $A$ から滑らかなゲージ変換で到達できる場の集合を考えます。その集合上ではYang–Mills作用は一定なので、形式的積分 $\int\mathcal DA\,e^{iS_{\rm YM}[A]}$ は同じ変換族の体積を重複して含みます。ゲージ条件の代表例として、各色成分の発散を零とするLorenz条件 $G^a(A)=\partial^\mu A_\mu^a=0$ を使います。

<a id="def-qft29-gauge-slice"></a>

<!-- formal-statement-start -->
> **定義（ゲージ軌道とLorenzゲージ条件）**  
> 滑らかな $SU(N)$ ポテンシャル $A_\mu$ のゲージ軌道を、局所変換 $A_\mu\mapsto A_\mu^U$ で得られる場の集合とする。Lorenzゲージ条件は各内部成分の発散

$$
G^a(A)=\partial^\mu A_\mu^a=0
$$

> である。条件を満たす場の集合をゲージ条件面（局所的な切断）と呼ぶ。この条件が各軌道から大域的に一意な代表を選ぶとは仮定しない。
<!-- formal-statement-end -->

**直接例。** $A_\mu=0$ は $G^a=0$ を満たします。それにもかかわらず、$A_\mu'=(\partial_\mu\theta)T^3/g$ という[QFT28の純ゲージ例](../QFT28/index.md#thm-qft28-gauge-covariance)では、

$$
G'^3=\frac1g\Box\theta,\qquad G'^{a\ne3}=0.
$$

$\Box\theta=0$ を満たす非定数の $\theta$ が許される境界条件なら、異なるポテンシャルが同じLorenz条件を満たします。よってゲージ固定は境界条件と残余変換の扱いを必要とします。

## 2. ゲージ条件のJacobianからFaddeev–Popov作用素へ

ゲージ群の積分変数を微小に動かしたとき、条件 $G^a$ がどう動くかを測ります。単なる $\delta(G)$ の挿入では変数変換時の体積を補正できないので、この微分の行列式が必要です。

<a id="def-qft29-fp-operator"></a>

<!-- formal-statement-start -->
> **定義（Faddeev–Popov作用素）**  
> 四次元Minkowski空間の滑らかな $SU(N)$ ポテンシャル $A_\mu$ にLorenz条件 $G^a(A)=\partial^\mu A_\mu^a$ を課す。[随伴共変微分](../QFT28/index.md#def-qft28-curvature)を使い、微小ゲージ変換 $\delta_\omega A_\mu^a=(\mathscr D_\mu\omega)^a$ による条件の微分を

$$
\delta_\omega G^a=(\partial^\mu\mathscr D_\mu)^{ac}\omega^c
$$

> とする。符号を含む本講のFaddeev–Popov作用素を

$$
M^{ac}[A]=-(\partial^\mu\mathscr D_\mu)^{ac}
$$

> と定義する。符号は積分の規約であり、一定の符号因子を除けば行列式に本質的な差はない。
<!-- formal-statement-end -->

ここで $\mathscr D_\mu$ は第1節で成分まで定義した作用素です。定義に現れる $\partial^\mu\mathscr D_\mu$ は二つの微分を順に作用させることを表し、$\partial^\mu$ が $A_\mu$ にもかかる点が重要です。

<a id="prop-qft29-fp-expansion"></a>

<!-- formal-statement-start -->
> **命題（Lorenzゲージの作用素展開）**  
> $g>0$、滑らかな $SU(N)$ 場 $A_\mu$、滑らかな随伴成分 $v^a$ に対し、上のFaddeev–Popov作用素は

$$
(Mv)^a=-\Box v^a
-g f^{abc}(\partial^\mu A_\mu^b)v^c
-g f^{abc}A_\mu^b\partial^\mu v^c.
$$

> 特に $G^b(A)=0$ の条件面上では中央の項が消える。
<!-- formal-statement-end -->

### 証明の見取り図

$\partial^\mu$ を積の各因子に作用させるだけですが、ゲージ条件が消すのは $\partial A$ の項だけで、$A\partial v$ は残ります。

<!-- proof-start -->
### 証明

[随伴共変微分の成分](../QFT28/index.md#def-qft28-curvature)を代入すると

$$
\begin{aligned}
\partial^\mu(\mathscr D_\mu v)^a
&=\partial^\mu(\partial_\mu v^a+g f^{abc}A_\mu^b v^c)\\
&=\Box v^a
+g f^{abc}(\partial^\mu A_\mu^b)v^c
+g f^{abc}A_\mu^b\partial^\mu v^c.
\end{aligned}
$$

定義の負号を掛けます。$G^b=\partial^\mu A_\mu^b=0$ の場では第二項のみが消えます。
<!-- proof-end -->

**直接例。** $A=0$ なら $M=-\Box I$ です。Euclid空間へ移った正則化で $-\partial_E^2$ を周期箱の非零Fourierモード $e^{ikx}$ に作用させれば、固有値 $|k|^2>0$ が得られます。定数モードは固有値零であり、これは大域的な残余ゲージ変換に対応します。行列式を使う場合は、その零モードを除去するか境界条件で固定する必要があります。Lorentz時空の $\Box$ とEuclid空間の $\partial_E^2$ の符号を混同しないでください。

### 有限次元の模型でJacobianを確かめる

$(x,y)\in\mathbb R^2\setminus\{0\}$ に平面回転を作用させ、条件 $G(x,y)=y=0$ とします。回転角 $\vartheta$ に対し

$$
y(\vartheta)=x\sin\vartheta+y\cos\vartheta,\qquad
\left.\frac{dG}{d\vartheta}\right|_{\vartheta=0}=x.
$$

条件面の点 $(r,0)$ では絶対Jacobianは $r$ です。実際、極座標の体積要素 $dx\,dy=r\,dr\,d\vartheta$ は、条件を課した際に半径 $r$ の重みを持ちます。ただし $x=\pm r$ の二点が同じ円軌道と条件面の交点です。この単純な二重交差は、「非零Jacobianなら大域的に一意」とは言えない警告にもなります。

<a id="thm-qft29-fp-identity"></a>

<!-- formal-statement-start -->
> **定理（局所的Faddeev–Popov恒等式）**  
> 有限次元に正則化したゲージ群と場の積分を考え、調べる領域では各ゲージ軌道がゲージ条件面とちょうど一度だけ横断的に交わり、ゲージ条件のJacobianが可逆で一定符号を持つと仮定する。このときゲージ群変数 $\omega$ に関し、積分測度を不変なものに取れば局所的に

$$
1=C\int\mathcal D\omega\,
\delta\bigl(G(A^\omega)\bigr)\,
\det M[A^\omega]
$$

> が成り立つ。$C$ は場に依存しない定数で、$M=-\delta G/\delta\omega$ の符号と測度規約を吸収する。これをゲージ不変な積分に挿入し、ゲージ群の体積を除けば、ゲージ固定条件とFaddeev–Popov行列式を含む積分が得られる。
<!-- formal-statement-end -->

### 証明の見取り図

横断的な交差ではゲージ条件を局所座標にできます。多変数のデルタ関数を変数変換すると、逆Jacobianが出るので行列式を掛けて相殺します。交差が複数、またはJacobianが零ならこの論証は使えません。

<!-- proof-start -->
### 証明

有限次元の群座標を $\omega^1,\ldots,\omega^m$ とし、固定した $A$ について $H(\omega)=G(A^\omega)$ と置きます。唯一の根 $\omega_*$ の近くで $J_{ab}=\partial H^a/\partial\omega^b$ が可逆なら、逆関数定理によって $u=H(\omega)$ を局所座標にできます。従って

$$
\int d^m\omega\,
\delta^{(m)}(H(\omega))\,|\det J(\omega)|
=\int d^m u\,\delta^{(m)}(u)=1.
$$

$M=-J$ なので $\det M=(-1)^m\det J$ です。Jacobianの符号が領域内で一定なら、$\det M$ と $|\det J|$ の違いは全体定数に吸収できます。ゲージ不変な作用と測度にこの恒等式を挿入し、積分順序を入れ替え、変数をゲージ変換すると、軌道積分が一定の群体積因子になり、条件面の積分が残ります。無限次元での測度と積分交換はここからは証明されず、有限化した摂動論からの形式的記法です。
<!-- proof-end -->

**注意。** 適切なゲージ群の局所領域を離れると、同じ軌道が条件面を複数回横切るGribovコピーや、$M$ の零モードが起こりえます。このとき上の「各軌道に一度」の仮定は破れ、符号付き行列式を形式的に挿入しても大域的な一意性は回復しません。

## 3. 行列式を反交換するスカラー場で表す

[QFT19のGrassmann代数](../QFT19/index.md#def-qft19-grassmann)では生成子同士が反交換し、[Berezin積分の行列式公式](../QFT19/index.md#thm-qft19-berezin-det)は有限行列の行列式を反交換変数のGaussian積分として表しました。ここではこの計算を、色添字を持つLorentzスカラーの場へ適用します。スカラーでありながら反交換する点が通常の粒子場と異なります。

<a id="def-qft29-ghost-action"></a>

<!-- formal-statement-start -->
> **定義（Faddeev–Popov ghost作用）**  
> LorenzゲージのFaddeev–Popov作用素 $M^{ac}[A]=-\partial^\mu\mathscr D_\mu^{ac}$ に対し、独立なGrassmann奇のLorentzスカラー場 $c^a(x)$（ghost）と $\bar c^a(x)$（反ghost）を導入する。ghost作用を

$$
S_{\rm gh}[A,\bar c,c]
=\int d^4x\,\bar c^aM^{ac}[A]c^c
=-\int d^4x\,\bar c^a\partial^\mu(\mathscr D_\mu c)^a
$$

> とする。$c,\bar c$ は互いに独立な積分変数であって、通常の複素共役関係は仮定しない。
<!-- formal-statement-end -->

**直接例。** $A=0$ では $S_{\rm gh}=-\int\bar c^a\Box c^a$ です。境界項を捨てて一度部分積分すれば $\int(\partial^\mu\bar c^a)(\partial_\mu c^a)$ となり、二次作用素 $M=-\Box$ を取り出せます。$SU(N)$ の場合、$g f^{abc}A_\mu^b c^c$ の分だけ相互作用が加わります。

<a id="prop-qft29-ghost-determinant"></a>

<!-- formal-statement-start -->
> **命題（ghost積分と三点相互作用）**  
> 有限個のモードに切り、$M[A]$ が可逆な行列であるとする。[QFT19の積分順序規約](../QFT19/index.md#def-qft19-berezin)を固定すれば、場に依存しない符号・正規化定数 $C'$ を除いて

$$
\int\mathcal D\bar c\,\mathcal Dc\,
e^{\,iS_{\rm gh}}=C'\det M[A].
$$

> また、境界項が零なら作用密度を次の形に書ける。

$$
\mathcal L_{\rm gh}
=(\partial^\mu\bar c^a)(\partial_\mu c^a)
+g f^{abc}(\partial^\mu\bar c^a)A_\mu^b c^c.
$$

> 従ってこのゲージでは自由ghost二次項と、反ghost–ゲージ場–ghostの三点相互作用が現れる。
<!-- formal-statement-end -->

### 証明の見取り図

有限次元行列 $M$ の積分は行列式です。位置空間で部分積分すると、反ghostの微分と随伴共変微分が掛かり、$A$ に一次の相互作用が出ます。

<!-- proof-start -->
### 証明

有限モードの $c_i,\bar c_i$ に対して、指数は $e^{i\bar c_iM_{ij}c_j}$ です。[Berezin Gaussianの行列式公式](../QFT19/index.md#thm-qft19-berezin-det)に行列 $iM$ を入力すると、積分は $\det(iM)=i^m\det M$（$m$ はモード数）に等しくなります。$i^m$ と積分順序の固定符号は $A$ に依存しない $C'$ に入れます。

一方、

$$
\begin{aligned}
S_{\rm gh}
&=-\int d^4x\,\bar c^a\partial^\mu(\mathscr D_\mu c)^a\\
&=\int d^4x\,(\partial^\mu\bar c^a)(\mathscr D_\mu c)^a\\
&=\int d^4x\,\bigl[
(\partial^\mu\bar c^a)(\partial_\mu c^a)
+g f^{abc}(\partial^\mu\bar c^a)A_\mu^b c^c\bigr].
\end{aligned}
$$

微分はGrassmann偶の演算子であり、この部分積分では変数の積の順番を交換していないため追加の負号はありません。
<!-- proof-end -->

Abel群 $U(1)$ では構造定数が零なので $M=-\Box$ は $A$ に依存せず、ghostの積分は相互作用から切り離された一定因子です。非可換な $SU(N)$ では $f^{abc}$ による相互作用が残り、閉じたghostループも摂動展開に寄与します。ghostは外部の物理的粒子状態として観測する場ではありません。

## 4. ゲージ固定項と補助場

経路積分では厳密な $\delta(G)$ の代わりに、幅を持つ共変ゲージ条件を用いるのが便利です。[QFT16のMaxwell共変ゲージ固定](../QFT16/index.md#def-qft16-gauge-fixed-action)を非可換の場合にも拡張します。後で変換が二回適用すると零になるように、可換な補助場 $B^a$ を導入します。この場は独立の物理的伝播粒子ではなく、代数的な運動方程式で消去できる変数です。

<a id="def-qft29-gauge-fixed-action"></a>

<!-- formal-statement-start -->
> **定義（補助場を用いたゲージ固定作用）**  
> 四次元Minkowski空間、$g>0$、$SU(N)$ ゲージ場 $A_\mu^a$、Grassmann奇の $c^a,\bar c^a$、Grassmann偶の実補助場 $B^a$ と実数 $\xi>0$ に対し、Lorenzゲージ固定・ghost作用を

$$
S_{\rm gf+gh}
=\int d^4x\,\left[
B^aG^a(A)+\frac{\xi}{2}B^aB^a
-\bar c^a\partial^\mu(\mathscr D_\mu c)^a
\right]
$$

> と定義する。全作用は $S_{\rm YM}+S_{\rm gf+gh}$ とする。ここで $G^a=\partial^\mu A_\mu^a$、$M=-\partial^\mu\mathscr D_\mu$ である。
<!-- formal-statement-end -->

**直接確認。** 固定した $A,c,\bar c$ に対して $B$ で変分すると、各成分ごとに

$$
G^a+\xi B^a=0,\qquad B^a=-\frac{G^a}{\xi}.
$$

これを元の作用へ戻し、平方完成すると

$$
B^aG^a+\frac{\xi}{2}B^aB^a
=\frac{\xi}{2}\left(B^a+\frac{G^a}{\xi}\right)^2
-\frac{(G^a)^2}{2\xi}.
$$

従って $B$ を形式的にGaussian積分、または代数的に消去した後のMinkowski作用は

$$
S_{\rm gf+gh}
=\int d^4x\,\left[
-\frac{(\partial^\mu A_\mu^a)^2}{2\xi}
-\bar c^a\partial^\mu(\mathscr D_\mu c)^a
\right]
$$

です。$B$ のGaussian積分で出る定数は $A,c,\bar c$ に依存しません。実時間の振動積分には $i\varepsilon$ や積分路の処方が必要であり、Euclid形式では $B$ の積分路を含めた符号規約を改めて選びます。

## 5. BRST：ゲージ固定後の作用を保つ奇の変換

通常の局所ゲージ変換のパラメータ $\omega$ は可換な実関数でした。ここでghost $c$ をその位置に置くと、変換パラメータ自体がGrassmann奇になります。$c$ にも適切な変換則を与えると、同じ変換を二度施した結果が零となります。これがBRST冪零性の核心です。

Grassmann変数にはパリティ（偶数次数なら偶、奇数次数なら奇）を付け、ghost数を $\operatorname{gh}(A)=\operatorname{gh}(B)=0$、$\operatorname{gh}(c)=1$、$\operatorname{gh}(\bar c)=-1$ とします。BRST演算子 $s$ はghost数を1増やすGrassmann奇の導分であり、斉次な積について

$$
s(XY)=(sX)Y+(-1)^{|X|}X(sY)
$$

という符号付きLeibniz則を満たします。$|X|=0,1$ はGrassmann偶奇を表します。

<a id="def-qft29-brst"></a>

<!-- formal-statement-start -->
> **定義（非可換ゲージ理論のBRST変換）**  
> 上記の滑らかな $SU(N)$ 場とghost・反ghost・補助場に対して、Grassmann奇の導分 $s$ を

$$
\begin{aligned}
sA_\mu^a&=(\mathscr D_\mu c)^a
=\partial_\mu c^a+g f^{abc}A_\mu^b c^c,\\
sc^a&=-\frac g2f^{abc}c^bc^c,\\
s\bar c^a&=B^a,\qquad sB^a=0
\end{aligned}
$$

> と定義する。$s$ は時空微分と交換し、積には上記の符号付きLeibniz則を適用する。
<!-- formal-statement-end -->

**直接例：$SU(2)$ のghost。** $f^{abc}=\varepsilon^{abc}$ では

$$
sc^1=-\frac g2(\varepsilon^{123}c^2c^3
+\varepsilon^{132}c^3c^2)=-g c^2c^3.
$$

$c^3c^2=-c^2c^3$ であることが係数2の理由です。同様に $sc^2=-gc^3c^1$、$sc^3=-gc^1c^2$。一成分だけを取り出して $c^2=0$ と置くと $sc^1=0$ となり、可換部分ではghostの非線形項が消えることも分かります。

<a id="thm-qft29-brst-nilpotent"></a>

<!-- formal-statement-start -->
> **定理（古典BRST変換のoff-shell冪零性）**  
> $SU(N)$ の完全反対称構造定数 $f^{abc}$ がJacobi恒等式を満たし、場の積をGrassmann代数として扱うとき、[上で定義したBRST変換](#def-qft29-brst)は各場について

$$
s^2A_\mu^a=s^2c^a=s^2\bar c^a=s^2B^a=0
$$

> を満たす。運動方程式は使わず、補助場 $B$ を独立に保ったまま成立する。
<!-- formal-statement-end -->

### 証明の見取り図

非可換ゲージ代数のJacobi恒等式と、Grassmann変数の交換で生じる符号が組になって消えます。$\bar c$ には補助場 $B$ を対応させたので二回目の変換が直ちに零です。

<!-- proof-start -->
### 証明

色添字を持つ斉次なGrassmann係数 $u,v$ に対して $[u,v]^a=f^{abc}u^bv^c$ と書きます。偶奇が $|u|,|v|$ のとき、$[u,v]=-(-1)^{|u||v|}[v,u]$ です。$\mathscr D_\mu$ は偶の導分なので

$$
\mathscr D_\mu[u,v]
=[\mathscr D_\mu u,v]+[u,\mathscr D_\mu v].
$$

特に $c$ と $\mathscr D_\mu c$ は奇であるため

$$
\mathscr D_\mu[c,c]=2[\mathscr D_\mu c,c].
$$

BRST定義は $sA_\mu=\mathscr D_\mu c$、$sc=-g[c,c]/2$ です。$\mathscr D_\mu c=\partial_\mu c+g[A_\mu,c]$ に $s$ を作用させると、$A_\mu$ は偶なので

$$
\begin{aligned}
s^2A_\mu
&=\mathscr D_\mu(sc)+g[sA_\mu,c]\\
&=-\frac g2\mathscr D_\mu[c,c]
+g[\mathscr D_\mu c,c]=0.
\end{aligned}
$$

次に $c$ は奇なので $s[c,c]=[sc,c]-[c,sc]$ です。$sc$ は偶であり $[c,sc]=-[sc,c]$ だから

$$
s^2c=-\frac g2s[c,c]
=-g[sc,c]=\frac{g^2}{2}[[c,c],c].
$$

右端は、Grassmann係数を含む[交換子のJacobi恒等式](../../../幾何系/GEO/GEO5/index.md#thm-geo5-bracket-identities)（結合的な行列代数でも同じ展開で成立）を三つの奇元 $c,c,c$ に適用した式で零です。成分表示で確認しても、$f^{ade}f^{dbc}c^bc^cc^e$ の完全反対称部分がJacobi恒等式で消えます。最後に

$$
s^2\bar c^a=sB^a=0,\qquad s^2B^a=0.
$$

従って全場について、運動方程式を使わず $s^2=0$ が成立します。
<!-- proof-end -->

この変換を使うと、ゲージ固定作用がなぜ自然な形なのか分かります。反ghost $\bar c$ と補助場 $B$ を組み合わせ、ghost数が $-1$ のGrassmann奇の汎関数を作ります。ここでいう「フェルミオン」は力学的なフェルミ粒子を追加する意味ではありません。

<a id="def-qft29-gauge-fermion"></a>

<!-- formal-statement-start -->
> **定義（ゲージ固定フェルミオン）**  
> Lorenz条件 $G^a=\partial^\mu A_\mu^a$、実数 $\xi>0$、反ghost $\bar c^a$、偶の補助場 $B^a$ に対して、Grassmann奇・ghost数 $-1$ の汎関数を

$$
\Psi=\int d^4x\,\bar c^a\left(G^a+\frac{\xi}{2}B^a\right)
$$

> と定義する。
<!-- formal-statement-end -->

<a id="thm-qft29-brst-action"></a>

<!-- formal-statement-start -->
> **定理（ゲージ固定作用のBRST完全性と不変性）**  
> 滑らかな $SU(N)$ 場で部分積分の境界項が零、かつ[BRST変換](#def-qft29-brst)が上記の代数として定義されるとする。このとき[ゲージ固定フェルミオン](#def-qft29-gauge-fermion)について

$$
s\Psi=S_{\rm gf+gh},\qquad
s(S_{\rm YM}+s\Psi)=0.
$$

> ここで $S_{\rm gf+gh}$ は[補助場入りの作用](#def-qft29-gauge-fixed-action)、$S_{\rm YM}$ は[QFT28のYang–Mills作用](../QFT28/index.md#def-qft28-yang-mills-action)である。
<!-- formal-statement-end -->

### 証明の見取り図

$s$ は奇の演算子で $\bar c$ も奇なので、$s(\bar c\,G)$ の第二項には負号が付きます。これがちょうどghost作用です。全作用の不変性は曲率の共変変換と $s^2=0$ から従います。

<!-- proof-start -->
### 証明

$s\bar c=B$、$sB=0$、$sG^a=\partial^\mu(\mathscr D_\mu c)^a$ を[BRST変換](#def-qft29-brst)から代入し、奇元 $\bar c$ の符号に注意すると

$$
\begin{aligned}
s\Psi
&=\int d^4x\,\left[
(s\bar c^a)\left(G^a+\frac{\xi}{2}B^a\right)
-\bar c^a\left(sG^a+\frac{\xi}{2}sB^a\right)\right]\\
&=\int d^4x\,\left[
B^aG^a+\frac{\xi}{2}B^aB^a
-\bar c^a\partial^\mu(\mathscr D_\mu c)^a\right].
\end{aligned}
$$

一方、[曲率の共変変換](../QFT28/index.md#thm-qft28-curvature-bianchi)の微小版に奇のパラメータ $gc$ を代入すると $sF_{\mu\nu}^a=g f^{abc}F_{\mu\nu}^b c^c$ です。従って

$$
s(F_{\mu\nu}^aF^{a\mu\nu})
=2g f^{abc}F_{\mu\nu}^aF^{b\mu\nu}c^c=0,
$$

対称な $F^aF^b$ と反対称な $f^{abc}$ が縮約して消えます。よって $sS_{\rm YM}=0$。また[off-shell冪零性](#thm-qft29-brst-nilpotent)から $s(s\Psi)=s^2\Psi=0$ なので主張が従います。
<!-- proof-end -->

**補助場を先に消すと何が違うか。** $B^a=-G^a/\xi$ を代入して $s\bar c^a=-G^a/\xi$ とすると、

$$
s^2\bar c^a=-\frac1\xi\partial^\mu(\mathscr D_\mu c)^a
$$

となり、一般の場で零ではありません。ghostの運動方程式を使えば零になる場合もありますが、上で証明した**off-shell**冪零性とは別です。$B$ を残した理由はここにあります。

## 6. BRSTの閉じた状態・正確な状態と物理状態

$s^2=0$ なら、$s$ で得られた量は自動的に $s$ で消えます。しかし逆に $sX=0$ だから $X=sY$ と書けるわけではありません。ここにゲージ冗長性を代数的に整理する仕組みがあります。

<a id="def-qft29-brst-cohomology"></a>

<!-- formal-statement-start -->
> **定義（BRSTコホモロジー）**  
> ghost数で次数付けられたベクトル空間 $V=\bigoplus_nV^n$ と、次数を1上げ $s^2=0$ を満たす線形写像 $s:V^n\to V^{n+1}$ に対して、

$$
H^n(s)=\ker(s:V^n\to V^{n+1})
\,/\,\operatorname{im}(s:V^{n-1}\to V^n)
$$

> を次数 $n$ のBRSTコホモロジーとする。量子化後に冪零なBRST電荷 $Q$ が状態空間で定義され、適切な定義域・内積・ghost数条件が満たされる場合には、物理状態の候補を通常 $H^0(Q)$ として捉える。
<!-- formal-statement-end -->

**直接例。** $s\bar c^a=B^a$、$sB^a=0$ なので $B^a$ は閉じていると同時に正確（$s$ の像）です。したがって $B^a$ が表すコホモロジー類は零です。一方、[曲率の変換則](../QFT28/index.md#thm-qft28-curvature-bianchi)から $s\operatorname{tr}(F_{\mu\nu}F^{\mu\nu})=0$。これは閉じたゲージ不変量の例ですが、「正確でない」ことまでこの計算だけで証明したわけではありません。

**何がまだ必要か。** ここで証明したのは古典的な局所多項式のBRST代数です。量子論での $Q$ の存在と冪零性、負ノルム状態の除去、物理的な内積の正値性、ゲージ固定パラメータへの観測量の非依存性には、正則化・測度・Ward／Slavnov–Taylor恒等式と異常の不在を別途確認する必要があります。非摂動的なGribovコピーがある領域では、局所的なFaddeev–Popov論証をそのまま大域的な構成へ拡張できません。

## 7. 演習

各問では $D_\mu=\partial_\mu-igA_\mu$、$\mathscr D_\mu v=\partial_\mu v+g[A_\mu,v]$（成分の実Lie括弧 $[u,v]^a=f^{abc}u^bv^c$）、$\eta=\operatorname{diag}(1,-1,-1,-1)$ とします。$SU(2)$ は $f^{abc}=\varepsilon^{abc}$、$g>0$ です。Berezin積分の順序を使う問題では[QFT19の定義](../QFT19/index.md#def-qft19-berezin)に従います。

### 演習 QFT29-A1：微小変換と随伴微分

- Level: A
- 問題：$SU(2)$ で $A_0=aT^3$（$a$ は定数）、$A_j=0$ とします。$\omega^1=u(t),\omega^2=v(t),\omega^3=0$ の微小変換に対し、$\delta A_0^1,\delta A_0^2,\delta A_0^3$ を求めてください。

<!-- solution-start -->
**詳細解答**

[QFT28の微小ゲージ変換](../QFT28/index.md#thm-qft28-gauge-covariance)を $\alpha=g\omega$ として書けば、$\delta A_0^a=\partial_0\omega^a+g\varepsilon^{a3c}a\omega^c$ です。従って

$$
\delta A_0^1=u'-gav,\qquad
\delta A_0^2=v'+gau,\qquad
\delta A_0^3=0.
$$

$\varepsilon^{132}=-1$ と $\varepsilon^{231}=1$ に注意します。$\omega^3=0$ で、$A_0^b$ は $b=3$ しか非零でないため、$a=3$ の交換子項も零です。
<!-- solution-end -->

### 演習 QFT29-A2：条件の変分からFP作用素へ

- Level: A
- 問題：演習A1の場と変換について、$G^a=\partial^\mu A_\mu^a$ の変分を求め、$(M\omega)^1,(M\omega)^2$ を書いてください。$a$ は時空一定とします。

<!-- solution-start -->
**詳細解答**

時間成分だけが変化し、$\partial^0=\partial_0=d/dt$ です。A1の結果を微分すると

$$
\delta G^1=u''-gav',\qquad
\delta G^2=v''+gau'.
$$

[FP作用素の定義](#def-qft29-fp-operator)で $M\omega=-\delta G$ なので

$$
(M\omega)^1=-u''+gav',\qquad
(M\omega)^2=-v''-gau'.
$$

背景の $G^a=0$ は、$A_0^3$ が一定であることから別途確認できます。$G=0$ でも $A\partial\omega$ の項は消えません。
<!-- solution-end -->

### 演習 QFT29-A3：二組のghost積分

- Level: A
- 問題：有限次元で $M=\operatorname{diag}(\lambda,\mu)$（$\lambda\mu\ne0$）とし、二組の独立Grassmann変数により $\exp(\bar c_iM_{ij}c_j)$ を展開してください。最高次数の係数が $\lambda\mu$ となることを確かめてください。

<!-- solution-start -->
**詳細解答**

$x=\lambda\bar c_1c_1$、$y=\mu\bar c_2c_2$ はGrassmann偶で、$x^2=y^2=0$、$xy=yx$ です。従って

$$
e^{x+y}=(1+x)(1+y)
=1+\lambda\bar c_1c_1+\mu\bar c_2c_2
+\lambda\mu\,\bar c_1c_1\bar c_2c_2.
$$

[Berezin積分の順序](../QFT19/index.md#def-qft19-berezin)を最高次数単項式の積分が $1$ になるよう固定すると、積分結果は $\lambda\mu=\det M$ です。指数に $i$ を掛けたMinkowski表現では $(i\lambda)(i\mu)=-\lambda\mu$ となり、全体の場に依存しない位相が残るだけです。
<!-- solution-end -->

### 演習 QFT29-A4：補助場の平方完成

- Level: A
- 問題：実数 $G$、$\xi>0$ と可換変数 $B$ について、$BG+\xi B^2/2$ を平方完成し、停留点を代入した値を求めてください。$G=\partial^\mu A_\mu^a$ への適用を述べてください。

<!-- solution-start -->
**詳細解答**

$$
\begin{aligned}
BG+\frac\xi2B^2
&=\frac\xi2\left(B^2+2B\frac G\xi\right)\\
&=\frac\xi2\left(B+\frac G\xi\right)^2-\frac{G^2}{2\xi}.
\end{aligned}
$$

$\partial/\partial B$ は $G+\xi B$ なので停留点は $B=-G/\xi$。その代入値は $-G^2/(2\xi)$ です。色成分ごとにこれを行えば、[補助場入り作用](#def-qft29-gauge-fixed-action)はMinkowskiの共変ゲージ固定項 $-(\partial^\mu A_\mu^a)^2/(2\xi)$ を与えます。
<!-- solution-end -->

### 演習 QFT29-A5：ghost数と正確な量

- Level: A
- 問題：$\operatorname{gh}(c)=1,\operatorname{gh}(\bar c)=-1,\operatorname{gh}(B)=0$、$s\bar c=B,sB=0$ とします。$\bar c^aB^b$ と $\bar c^ac^b$ のghost数を求め、$B^a$ が閉じていて正確であることを確認してください。

<!-- solution-start -->
**詳細解答**

積のghost数は各因子の和だから

$$
\operatorname{gh}(\bar c^aB^b)=-1+0=-1,\qquad
\operatorname{gh}(\bar c^ac^b)=-1+1=0.
$$

$sB^a=0$ なので $B^a\in\ker s$ です。同時に $B^a=s\bar c^a$ なので $B^a\in\operatorname{im}s$。よって[BRSTコホモロジーの定義](#def-qft29-brst-cohomology)では $B^a$ の類は零です。
<!-- solution-end -->

### 演習 QFT29-B1：ゲージ条件面と二重交差

- Level: B
- 問題：$\mathbb R^2\setminus\{0\}$ の回転軌道に条件 $G(x,y)=y=0$ を課します。半径 $r>0$ の軌道が条件面と交わる点を全て求め、それぞれの $\partial_\vartheta G$ の符号を計算してください。また符号なしJacobianを用いる局所恒等式を一交差で導いてください。

<!-- solution-start -->
**詳細解答**

半径 $r$ の点を $(r\cos\vartheta,r\sin\vartheta)$ と書きます。$G=r\sin\vartheta=0$ は $\vartheta=0,\pi$（$0\le\vartheta<2\pi$）で成立するので、交点は $(r,0)$ と $(-r,0)$ の二つです。

$$
\frac{dG}{d\vartheta}=r\cos\vartheta,\qquad
\left.\frac{dG}{d\vartheta}\right|_0=r,\quad
\left.\frac{dG}{d\vartheta}\right|_\pi=-r.
$$

第一交点の近くに限定すると $u=G=r\sin\vartheta$ は単調で、$du=r\cos\vartheta\,d\vartheta$ です。従って

$$
\int_{\text{第一交点の近く}}d\vartheta\,
\delta(r\sin\vartheta)\,|r\cos\vartheta|
=\int_{\text{零の近く}}du\,\delta(u)=1.
$$

同じ絶対Jacobianで円全体を積分すると交点ごとに1ずつ寄与し、結果は2です。これが[局所Faddeev–Popov恒等式](#thm-qft29-fp-identity)を大域へ無条件に延ばせない例になります。
<!-- solution-end -->

### 演習 QFT29-B2：SU(2)でのghostの冪零性

- Level: B
- 問題：$SU(2)$ のGrassmann奇変数 $c^1,c^2,c^3$ に $sc^1=-gc^2c^3$、$sc^2=-gc^3c^1$、$sc^3=-gc^1c^2$ と定めます。符号付きLeibniz則から $s^2c^1=0$ を直接計算してください。$c$ を可換変数とした場合に、そもそもこの導出が使えない理由も述べてください。

<!-- solution-start -->
**詳細解答**

$c^2$ は奇なので $s(c^2c^3)=(sc^2)c^3-c^2(sc^3)$ です。よって

$$
\begin{aligned}
s^2c^1
&=-g\bigl((sc^2)c^3-c^2(sc^3)\bigr)\\
&=g^2c^3c^1c^3-g^2c^2c^1c^2\\
&=0.
\end{aligned}
$$

Grassmann代数では $(c^2)^2=(c^3)^2=0$ であり、非隣接の同じ生成子も反交換で隣り合わせにできるため両項が消えます。可換な通常変数では $c^3c^1c^3$ や $c^2c^1c^2$ は一般に零でなく、また奇のLeibniz則を適用する仮定自体が失われます。この計算は[一般の冪零性定理](#thm-qft29-brst-nilpotent)の具体例です。
<!-- solution-end -->

### 演習 QFT29-B3：ghost–ゲージ場三点項

- Level: B
- 問題：$SU(2)$ で $A_\mu^3=a_\mu$、他の $A_\mu^a=0$ とします。境界項が零のとき、ghost作用の相互作用部分を $c^1,c^2$ だけで表示してください。背景が非零でも $U(1)$ と同じようにghostが完全に切り離されるか、理由を付けて判定してください。

<!-- solution-start -->
**詳細解答**

[ghost作用の三点項](#prop-qft29-ghost-determinant)は $g\varepsilon^{abc}(\partial^\mu\bar c^a)A_\mu^bc^c$ です。$b=3$ だけが非零なので、寄与する組は $(a,b,c)=(1,3,2)$ と $(2,3,1)$ だけです。

$$
\mathcal L_{\rm int}
=ga_\mu\left[
-(\partial^\mu\bar c^1)c^2
+(\partial^\mu\bar c^2)c^1
\right].
$$

一つの生成子方向の背景を選んでも、残る二つのghost成分は内部回転で混ざります。$f^{132}=-1,f^{231}=1$ が非零だからです。純粋な $U(1)$ 理論では全構造定数が零であり三点相互作用がありません。「背景が可換方向にある」ことと「理論のゲージ群がAbelである」ことを混同してはいけません。
<!-- solution-end -->

### 演習 QFT29-B4：BRST完全な作用の符号

- Level: B
- 問題：$G^a=\partial^\mu A_\mu^a$、$sA_\mu^a=(\mathscr D_\mu c)^a$、$s\bar c^a=B^a$、$sB^a=0$ とします。$\Psi=\int\bar c^a(G^a+\xi B^a/2)$ に $s$ を作用させ、ghost項の負号と $s(s\Psi)=0$ を説明してください。

<!-- solution-start -->
**詳細解答**

$\bar c^a$ が奇、$G^a,B^a$ が偶なので

$$
s(\bar c^aG^a)=(s\bar c^a)G^a-\bar c^a(sG^a)
=B^aG^a-\bar c^a\partial^\mu(\mathscr D_\mu c)^a.
$$

また $s(\bar c^aB^a)=B^aB^a-\bar c^a(sB^a)=B^aB^a$。従って

$$
s\Psi=\int d^4x\,\left[
B^aG^a+\frac\xi2B^aB^a
-\bar c^a\partial^\mu(\mathscr D_\mu c)^a\right].
$$

これは[ゲージ固定作用](#def-qft29-gauge-fixed-action)です。[off-shell冪零性](#thm-qft29-brst-nilpotent)は各場で成立し、$s$ は導分であるため積や積分で作る $\Psi$ にも $s^2\Psi=0$ が及びます。ghost項の負号を正号に変えると、同じBRST規約ではこの等式が成立しません。
<!-- solution-end -->

### 演習 QFT29-C1：一定SU(2)背景での一連のゲージ固定

- Level: C
- 問題：四次元Minkowski空間で $A_0^3=a$（非零の実定数）、他の $A_\mu^b=0$ とします。時間の滑らかな関数だけからなる微小パラメータ $\omega=(u(t),v(t),w(t))$ を考えます。
  1. $G(A)$ と $\delta_\omega G$ を三成分で計算し、$M=-\delta G/\delta\omega$ の作用を示してください。
  2. 同じ背景で $c^a(t),\bar c^a(t)$ に対するghost作用密度を、二階微分の形と部分積分後の形で示してください。
  3. 補助場入りの作用に $\xi>0$ を固定し、$B$ の代数的消去が何を与えるか述べてください。
  4. $sc^1=-gc^2c^3$ の下で $s^2c^1$ を直接検算し、$s^2\bar c^1$ と対比してください。
  5. この計算だけで、ゲージ条件が全軌道で一意、あるいは量子論の物理Hilbert空間が構成済みと結論できるか判断してください。

<!-- solution-start -->
**詳細解答**

**（1）条件とJacobian。** 一定場なので $G^3=\partial^0a=0$、他成分も零です。[随伴共変微分](../QFT28/index.md#def-qft28-curvature)で $A_0^3=a$ とすると

$$
\begin{aligned}
(\mathscr D_0\omega)^1&=u'-gav,\\
(\mathscr D_0\omega)^2&=v'+gau,\\
(\mathscr D_0\omega)^3&=w'.
\end{aligned}
$$

この背景では時空成分の和は $\mu=0$ だけなので

$$
\delta_\omega G=(u''-gav',\ v''+gau',\ w'').
$$

従って

$$
M\omega=(-u''+gav',\ -v''-gau',\ -w'').
$$

零背景での $-\Box I$ と違い、第一・第二色成分は $ga\,d/dt$ で混ざります。

**（2）ghost作用。** $\omega$ の代わりに独立なGrassmann奇関数 $c^a$ を代入し、

$$
\mathcal L_{\rm gh}
=-\bar c^1(\ddot c^1-ga\dot c^2)
-\bar c^2(\ddot c^2+ga\dot c^1)
-\bar c^3\ddot c^3.
$$

時間境界項が零なら $\int-\bar c\,\ddot c=\int\dot{\bar c}\dot c$、$\int \bar c^1ga\dot c^2=\int-ga\dot{\bar c}^1c^2$、$\int-\bar c^2ga\dot c^1=\int ga\dot{\bar c}^2c^1$ です。ゆえに

$$
\mathcal L_{\rm gh}
=\dot{\bar c}^a\dot c^a
+ga\bigl(-\dot{\bar c}^1c^2+\dot{\bar c}^2c^1\bigr).
$$

ここでもghost同士を交換しないので追加符号はありません。

**（3）補助場。** 与えられた背景では $G=0$ なので $B^a=-G^a/\xi=0$ です。一般の変動する場を含む作用で消去すると、[平方完成](#def-qft29-gauge-fixed-action)により $-G^aG^a/(2\xi)$ を得ます。背景だけでその項を恒等的に消去できるわけではありません。

**（4）冪零性。** Grassmann奇の積にLeibniz則を適用すると

$$
\begin{aligned}
s^2c^1&=-g\bigl((sc^2)c^3-c^2(sc^3)\bigr)\\
&=g^2c^3c^1c^3-g^2c^2c^1c^2=0.
\end{aligned}
$$

また $s^2\bar c^1=sB^1=0$ です。後者は補助場を残すから運動方程式なしで成立します。$B=-G/\xi$ の後では $s^2\bar c^1=-\partial^\mu(\mathscr D_\mu c)^1/\xi$ となり、一般には零ではありません。

**（5）適用条件。** $G=0$ でも $M$ に零モードがありうるため、軌道とゲージ条件面の大域的一意交差は示していません。[Faddeev–Popov恒等式](#thm-qft29-fp-identity)には局所可逆性と一意交差が必要です。また[BRSTコホモロジー](#def-qft29-brst-cohomology)を物理状態へ移すには量子電荷の構成と量子異常の検査が必要です。今回の有限・形式的計算だけでそれらは結論できません。
<!-- solution-end -->

## 8. まとめと次の入口

- Faddeev–Popov行列式はゲージ条件の変分 $\delta G/\delta\omega$ のJacobianであり、非可換理論ではゲージ場に依存します。
- ghostはこの行列式をBerezin積分に直すための反交換するLorentzスカラー場であり、$f^{abc}$ を含む三点相互作用を持ちます。
- 補助場を残したBRST変換は $s^2=0$ を運動方程式なしで満たし、ゲージ固定・ghost作用は $s\Psi$ と表せます。
- BRSTコホモロジーは物理状態を理解する入口ですが、量子電荷の存在、異常の不在、非摂動的な大域ゲージ固定までを証明したわけではありません。

次はこの非可換ゲージ場・ghostのループ計算から、$SU(N)$ の結合が高エネルギーでどのように変わるかを調べます。
