# LORG6 因果的未来と過去の集合

<!-- definition-example-audit: strict -->

## 1. 光円錐の内側に「到達できる」とはどういうことか

[LORG5の放射光円錐](../LORG5/index.md#prop-lorg5-normal-coordinate-cone)は、一点から出る測地線の初速度を分類しました。しかし二点を結ぶ経路は測地線とは限らず、曲がった時空では「接空間の錐の内側」という一つの式で遠くの点への到達可能性を決められません。ここからは各点の未来・過去を、**その二点を結ぶ曲線が存在するか**で捉えます。

時間的に進める点と、光速以下で進める点では、光円錐の境界の扱いが違います。さらに「どの曲線を通ってよいか」を指定しなければ、障害物のある領域と全時空を同じものとして扱ってしまいます。まず定義を置き、平坦な時空で境界・開閉・端点を一つずつ計算します。

以下、$(M,g)$ は滑らかな連結・Hausdorff・第二可算・境界なしの時間向き付きLorentz多様体、次元は $n+1$（$n\ge1$）、符号は $(-,+,\ldots,+)$ とします。曲線は[LORG3の因果曲線](../LORG3/index.md#def-lorg3-causal-curve)と同じ区分的 $C^1$ の未来向き曲線です。因果曲線には定数曲線も認め、時間的曲線の各滑らかな片の速度は非零で未来時間的とします。$p\ne q$ を結ぶ時間的曲線は必ず非定数です。

## 2. 曲線の存在から定める $I^\pm$ と $J^\pm$

未来向き時間的曲線だけで到達できる範囲を $I^+(p)$、未来向き因果曲線（光的なものも含む）で到達できる範囲を $J^+(p)$ とします。過去は到達する向きを逆にしたものです。「$I$ は厳密な時間方向」「$J$ は光の方向まで含む」と読むと覚えやすいですが、最終的な定義は座標不等式でなく曲線の存在です。

<a id="def-lorg6-chronological-causal-future"></a>

<!-- formal-statement-start -->
> **定義（時間的未来・過去と因果的未来・過去）**  
> 時間向き付きLorentz多様体 $(M,g)$ の $p\in M$ に対し、$p$ から $q$ への未来向き時間的な区分的 $C^1$ 曲線が存在するとき $p\ll q$、未来向き因果的な区分的 $C^1$ 曲線（定数曲線も許す）が存在するとき $p\le q$ と記す。これを使い、点の**時間的未来・過去**と**因果的未来・過去**を

$$
\begin{aligned}
I^+(p)&=\{q\in M:p\ll q\},&
I^-(p)&=\{q\in M:q\ll p\},\\
J^+(p)&=\{q\in M:p\le q\},&
J^-(p)&=\{q\in M:q\le p\}
\end{aligned}
$$

> で定める。部分集合 $S\subset M$ に対しては、対応する点ごとの集合の合併を $I^\pm(S)$、$J^\pm(S)$ とする。特に $S=\varnothing$ の場合は四集合とも空集合とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg6-chronological-causal-future -->
**定義の確認**。$\mathbb R^{1+1}$、$g=-dt^2+dx^2$、未来向きを $dt>0$ とし、$p=(0,0)$、$q=(2,1)$ とします。$\gamma(s)=(2s,s)$（$0\le s\le1$）の速度は $(2,1)$ で、$g(\dot\gamma,\dot\gamma)=-4+1=-3<0$、時間成分は正です。よって $p\ll q$ であり $q\in I^+(p)\subset J^+(p)$ です。一方 $r=(2,2)$ について $\lambda(s)=(2s,2s)$ は $g(\dot\lambda,\dot\lambda)=0$ の未来光的曲線なので $p\le r$ です。$r\notin I^+(p)$ という判定は、第4節の[Minkowski時空の時間的・因果的未来と過去](#thm-lorg6-minkowski-futures)で確認します。定数曲線 $s\mapsto p$ により $p\in J^+(p)\cap J^-(p)$ です。
<!-- definition-example-end -->

ここで二種類の「厳密さ」を区別します。$p\ll p$ が不可能だと**まだ仮定していません**。閉時間的曲線のある時空では $p\in I^+(p)$ もありえます。逆に $p\le p$ は定数曲線だけで常に成立します。したがって $I^\pm$ が必ず自分自身を除く、という集合論的規則ではありません。

境界の候補も「未来の端まで届くが、時間的には届かない」集合として記述できます。

<a id="def-lorg6-horismos"></a>

<!-- formal-statement-start -->
> **定義（horismos：時間的未来を除いた因果的未来）**  
> 任意の $S\subset M$ に対し、未来および過去の **horismos** を

$$
E^+(S)=J^+(S)\setminus I^+(S),\qquad
E^-(S)=J^-(S)\setminus I^-(S)
$$

> と定める。点 $p$ に対する記法は $S=\{p\}$ の場合を意味する。この定義だけから、$E^\pm(S)$ が位相的な境界 $\partial J^\pm(S)$ と等しいとは主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg6-horismos -->
**定義の確認**。上の平坦時空で $q=(2,1)$ は $I^+(p)$ に入るので $E^+(p)$ には入りません。$r=(2,2)$ は $J^+(p)$ に入り、時間的曲線では到達できないことを第4節で示すので $E^+(p)$ に入ります。$p$ 自身も $J^+(p)$ に属し、平坦時空では非自明な閉時間的曲線がないので $p\notin I^+(p)$、従って $p\in E^+(p)$ です。**光円錐の頂点も含む**ことに注意してください。
<!-- definition-example-end -->

## 3. 連結できる曲線は到達関係をつなげる

定義が座標に依存しないことの利点は、二つの曲線を端点で連結するだけで到達関係を証明できる点です。ただし「途中を因果的、最後だけ時間的にすれば全体を時間的にできる」というpush-upの議論はまだ使いません。それは次のLORG7で局所変形から証明します。

<a id="prop-lorg6-transitivity"></a>

<!-- formal-statement-start -->
> **命題（因果到達関係の推移性と反射性）**  
> 任意の時間向き付きLorentz多様体の点 $p,q,r$ について、以下が成り立つ。
>
> 1. $p\ll q$ かつ $q\ll r$ ならば $p\ll r$。
> 2. $p\le q$ かつ $q\le r$ ならば $p\le r$。
> 3. $p\ll q$ ならば $p\le q$。また常に $p\le p$。
>
> 従って $I^\pm(p)\subset J^\pm(p)$。ただし $p\le q$ と $q\le p$ から $p=q$ は一般には導けない。
<!-- formal-statement-end -->

### 証明の見取り図

前半の曲線を半分のパラメータ区間へ、後半の曲線を残り半分へ線形再パラメータ化して連結します。端点で折れても区分的 $C^1$ であり、各滑らかな片で未来性と因果型は保たれます。

<!-- proof-start -->
### 証明

$p\ll q$、$q\ll r$ のとき、$\alpha:[0,1]\to M$ と $\beta:[0,1]\to M$ を対応する未来時間的曲線とします。

$$
\gamma(s)=
\begin{cases}
\alpha(2s),&0\le s\le1/2,\\
\beta(2s-1),&1/2\le s\le1.
\end{cases}
$$

$\alpha(1)=q=\beta(0)$ だから $\gamma$ は連続で、各区間では速度が $2\dot\alpha$ または $2\dot\beta$ です。正のスカラー倍で未来時間的という条件は変わらないため、$\gamma$ は未来時間的な区分的 $C^1$ 曲線です。従って $p\ll r$ です。

因果曲線の場合も同じ連結を使います。未来因果ベクトルの正倍は未来因果のままなので $p\le r$ です。また時間的な速度は因果的でもあるため $p\ll q\Rightarrow p\le q$。定数曲線を選べば $p\le p$ です。定義集合へ戻して $I^\pm(p)\subset J^\pm(p)$ を得ます。

最後の一意性はこの命題からは従いません。例えば $S^1_\theta\times\mathbb R_x$ に $g=-d\theta^2+dx^2$ を入れ、$\theta$ の増加方向を未来にします。$p=(0,0)$、$q=(\pi,0)$（角度は $2\pi$ を法として読む）について、

$$
\alpha(s)=(\pi s,0),\qquad
\beta(s)=(\pi+\pi s,0),\qquad 0\le s\le1
$$

を円周上の曲線と見れば、$\alpha$ は $p$ から $q$ へ、$\beta$ は $q$ から $p$ へ進みます。どちらも速度の自己内積は $-\pi^2<0$ で未来向きです。従って $p\ne q$ でも $p\ll q$ かつ $q\ll p$ が成立し、因果到達は反対称とは限りません。$\square$
<!-- proof-end -->

集合に対する記号でも、**全称条件ではなく存在条件**であることが重要です。

<a id="prop-lorg6-set-unions"></a>

<!-- formal-statement-start -->
> **命題（集合の未来・過去は点ごとの合併）**  
> 時間向き付きLorentz多様体の任意の $S\subset M$ に対して、

$$
\begin{aligned}
I^\pm(S)&=\bigcup_{p\in S}I^\pm(p),\\
J^\pm(S)&=\bigcup_{p\in S}J^\pm(p)
\end{aligned}
$$

> が成り立つ。$S\subset T$ なら $I^\pm(S)\subset I^\pm(T)$、$J^\pm(S)\subset J^\pm(T)$ である。一方、$E^\pm(S)$ は一般に $\bigcup_{p\in S}E^\pm(p)$ と一致しない。
<!-- formal-statement-end -->

### 証明の見取り図

最初の二式は定義の「ある $p\in S$」を合併へ翻訳するだけです。$E^\pm$ では合併を取ってから差集合を作るため、同じ点が別の基点からの時間的未来に入る可能性が効きます。

<!-- proof-start -->
### 証明

$q\in I^+(S)$ は、定義によりある $p\in S$ が存在して $p\ll q$ となることと同値です。これはある $p\in S$ について $q\in I^+(p)$、すなわち $q\in\bigcup_{p\in S}I^+(p)$ という条件です。$J^+$ と逆向きの二集合も同じ量化順序で従います。$S\subset T$ のとき $S$ で許された始点は全て $T$ でも許されるので単調性が成立します。

最後について、Minkowski平面の $S=\{(0,0),(1,0)\}$、$q=(2,1)$ とします。$(1,0)$ から $q$ への変位は $(1,1)$ なので $q\in E^+((1,0))$、一方 $(0,0)$ からの変位は $(2,1)$ で時間的なので $q\in I^+((0,0))\subset I^+(S)$ です。従って $q\in\bigcup_{p\in S}E^+(p)$ であるのに $q\notin E^+(S)$ です。ここで用いた平坦時空の判定は次の定理で確認します。$\square$
<!-- proof-end -->

## 4. Minkowski時空で集合を最後まで計算する

$\mathbb R^{1+n}$ に $g=-dt^2+\sum_{i=1}^n (dx^i)^2$ を置き、未来向きを時間成分の増加で定めます。$p=(t_0,\mathbf x_0)$、$q=(t,\mathbf x)$ とし、

$$
\Delta t=t-t_0,\qquad
\Delta\mathbf x=\mathbf x-\mathbf x_0,\qquad
\rho=|\Delta\mathbf x|
$$

を用います。$\rho$ は**空間成分だけ**のEuclidノルムです。

<a id="thm-lorg6-minkowski-futures"></a>

<!-- formal-statement-start -->
> **定理（Minkowski時空の時間的・因果的未来と過去）**  
> $\mathbb R^{1+n}$（$n\ge1$）に標準Minkowski計量と $t$ 増加の時間向きを与える。任意の $p=(t_0,\mathbf x_0)$ に対して、

$$
\begin{aligned}
I^+(p)&=\{(t,\mathbf x):t-t_0>|\mathbf x-\mathbf x_0|\},\\
J^+(p)&=\{(t,\mathbf x):t-t_0\ge|\mathbf x-\mathbf x_0|\},\\
I^-(p)&=\{(t,\mathbf x):t_0-t>|\mathbf x-\mathbf x_0|\},\\
J^-(p)&=\{(t,\mathbf x):t_0-t\ge|\mathbf x-\mathbf x_0|\}
\end{aligned}
$$

> が成立する。等号を許す $J^\pm$ には頂点 $p$ が含まれ、不等号が厳密な $I^\pm$ には含まれない。
<!-- formal-statement-end -->

### 証明の見取り図

「曲線が存在するなら端点の時間差が空間移動量以上」という必要条件は、速度の光円錐不等式を区間ごとに積分し、三角不等式を使います。逆向きは、端点を結ぶ一本の**直線**が未来時間的・未来因果的であることを計算すれば足ります。端点差がちょうど光的な場合、途中で時間的に寄り道できないことまでこの計算で分かります。

<!-- proof-start -->
### 証明

未来因果曲線 $\gamma(s)=(t(s),\mathbf x(s))$ を $p$ から $q$ まで取ります。各滑らかな片で速度が[LORG1の未来錐の条件](../LORG1/index.md#def-lorg1-future-cone)を満たすので、

$$
\dot t(s)\ge|\dot{\mathbf x}(s)|\ge0
$$

が成立します（定数部分では両辺零）。積分区間を全ての片に分けて加えると、

$$
\begin{aligned}
\Delta t
&=\int_0^1\dot t(s)\,ds\\
&\ge\int_0^1|\dot{\mathbf x}(s)|\,ds\\
&\ge\left|\int_0^1\dot{\mathbf x}(s)\,ds\right|
=|\Delta\mathbf x|=\rho.
\end{aligned}
$$

最後の不等号はEuclidノルムの積分三角不等式です。従って $q\in J^+(p)$ なら $\Delta t\ge\rho$ です。

時間的曲線では少なくとも一つの非定数な滑らかな片で $\dot t>|\dot{\mathbf x}|$ が成り立ちます。連続な差 $\dot t-|\dot{\mathbf x}|$ はその片の内部で正だから、その積分は正です。ゆえに $\Delta t>\rho$ であり、$q\in I^+(p)$ の必要条件も得られます。

逆に $\Delta t\ge\rho$ とすると、端点を結ぶ直線

$$
\sigma(s)=(t_0+s\Delta t,\mathbf x_0+s\Delta\mathbf x),
\qquad 0\le s\le1
$$

の速度は一定であり、

$$
g(\dot\sigma,\dot\sigma)=-(\Delta t)^2+\rho^2\le0,\qquad
\Delta t\ge\rho\ge0.
$$

$\Delta t>0$ なら未来因果曲線です。$\Delta t=0$ なら $\rho=0$ なので $q=p$、定数曲線を選べます。従って $\Delta t\ge\rho$ は $q\in J^+(p)$ の十分条件です。$\Delta t>\rho$ のとき同じ直線の速度は非零未来時間的なので $q\in I^+(p)$ です。

過去の二式は $q\to p$ への未来向き曲線へ同じ議論を適用し、$\Delta t$ の符号を逆にして得ます。$\square$
<!-- proof-end -->

具体例として $p=(1,-2)$、$q=(4,0)$ の差は $\Delta t=3$、$\rho=2$ なので $q\in I^+(p)$。一方 $r=(4,1)$ なら $\Delta t=3=\rho$ で、$r\in J^+(p)\setminus I^+(p)$ です。$u=(2,1)$ なら $\Delta t=1<3=\rho$ で、$u\notin J^+(p)$ です。曲線の形を推測する前に、この**端点不等式を両向きに証明した**ことが使えます。

## 5. horismosと位相的な境界はどこまで一致するか

平坦時空では、未来錐の側面と頂点を含む集合がちょうど $E^+(p)$ になります。しかしこれをすべての曲がった時空に無条件で持ち込んではいけません。ここでは**Minkowski時空に限って**開集合・閉集合・境界を確定します。

<a id="prop-lorg6-minkowski-boundary"></a>

<!-- formal-statement-start -->
> **命題（平坦時空での開性・閉性・horismosの境界表示）**  
> 標準Minkowski時空において、任意の $p$ に対し $I^\pm(p)$ は開集合、$J^\pm(p)$ は閉集合であり、

$$
\begin{aligned}
\overline{I^\pm(p)}&=J^\pm(p),&
\operatorname{int}J^\pm(p)&=I^\pm(p),\\
E^\pm(p)&=J^\pm(p)\setminus I^\pm(p)
=\partial I^\pm(p)=\partial J^\pm(p)
\end{aligned}
$$

> が成り立つ。特に

$$
E^+(p)=\{(t,\mathbf x):t-t_0=|\mathbf x-\mathbf x_0|\}
$$

> であり、$E^-(p)$ も時間差の符号を逆にした等号集合である。
<!-- formal-statement-end -->

### 証明の見取り図

距離に相当する連続関数 $F_+(t,\mathbf x)=t-t_0-|\mathbf x-\mathbf x_0|$ を一つ定めれば、正の集合が $I^+$、非負の集合が $J^+$ です。等号点は時間をほんの少し進めた点・戻した点で挟めるので、内点でなく境界点だと分かります。

<!-- proof-start -->
### 証明

$F_+(t,\mathbf x)=t-t_0-|\mathbf x-\mathbf x_0|$ は連続です。[Minkowski時空の時間的・因果的未来と過去](#thm-lorg6-minkowski-futures)から

$$
I^+(p)=F_+^{-1}((0,\infty)),\qquad
J^+(p)=F_+^{-1}([0,\infty))
$$

です。連続写像の開集合・閉集合の逆像はそれぞれ開・閉だから、$I^+(p)$ は開、$J^+(p)$ は閉です。

$F_+(q)=0$ の任意の点 $q=(t,\mathbf x)$ を取り、$\varepsilon>0$ とします。$q_\varepsilon^+=(t+\varepsilon,\mathbf x)$ と $q_\varepsilon^-=(t-\varepsilon,\mathbf x)$ について

$$
F_+(q_\varepsilon^+)=\varepsilon>0,\qquad
F_+(q_\varepsilon^-)=-\varepsilon<0.
$$

従って $q$ は $I^+(p)$ の閉包に含まれ、かつ $J^+(p)$ の内点ではありません。逆に $F_+>0$ の点は $I^+(p)$ の内点であり、$F_+<0$ の点は $J^+(p)$ の外部に開近傍を持ちます。よって

$$
\overline{I^+(p)}=\{F_+\ge0\}=J^+(p),\qquad
\operatorname{int}J^+(p)=\{F_+>0\}=I^+(p).
$$

境界の定義 $\partial A=\overline A\setminus\operatorname{int}A$ を代入すると $\partial I^+(p)=\partial J^+(p)=\{F_+=0\}=E^+(p)$ です。$F_-(t,\mathbf x)=t_0-t-|\mathbf x-\mathbf x_0|$ に入れ替えれば過去側にも全く同じ段階が適用できます。$\square$
<!-- proof-end -->

頂点 $p$ は $\rho=0$、$\Delta t=0$ なので $E^+(p)$ に入ります。一方、$\rho>0$ の等号点を $q$ とすると、$p$ と $q$ を結ぶ直線は光的です。等号を**含む**ことと、光円錐の側面を単に「開いた境界」として捨てないことが重要です。

なお、ここで証明したのは**平坦な全Minkowski時空**での関係です。一般のLorentz多様体で $I^\pm$ が開であることはLORG7で局所曲線変形から証明します。$J^\pm$ の閉性についてはさらに別の大域条件が関係するので、図の印象だけで断言しません。

## 6. 集合からの未来と、計算する時空の範囲

$I^\pm(S)$ と $J^\pm(S)$ では始点または終点を $S$ から**一つ選べばよい**ので、時空図では点ごとの錐を重ねます。例えば Minkowski平面の二点集合 $S=\{(0,0),(0,2)\}$ に対し、$q=(2,1)$ は両点から時間的に到達可能です。実際、両方の空間差が $1$、時間差が $2$ だからです。$r=(1,1)$ は両点から光的に到達するため $E^+(S)$ に入ります。

ただし [集合の未来の命題](#prop-lorg6-set-unions)の通り、$E^+(S)$ を点ごとの $E^+(p)$ の合併と取り違えてはいけません。$E^+(S)$ は集合全体の $J^+(S)$ から集合全体の $I^+(S)$ を引きます。

もう一つ重要なのは、**途中の曲線がどこを通ってよいか**です。$U\subset M$ が開部分時空なら、$J^+_U(p)$ は曲線の全像を $U$ に含めて定義します。全時空で使える光的曲線が $U$ から削除された点を通ると、その曲線は $J_U$ の存在証明にはなりません。

具体的に $M=\mathbb R^{1+1}$、$U=M\setminus\{(0,0)\}$、$p=(-1,-1)$、$q=(1,1)$ とします。全時空では $\Delta t=\Delta x=2$ で $q\in J_M^+(p)$。ところが $U$ では $q\notin J_U^+(p)$ です。理由は、もし $p$ から $q$ への未来因果曲線 $(t(s),x(s))$ があれば、

$$
2=\Delta t\ge\int_0^1|\dot x(s)|\,ds
\ge\left|\int_0^1\dot x(s)\,ds\right|=2
$$

で両不等号が等号です。さらに $\dot t\ge|\dot x|\ge\dot x$ で、$\int(\dot t-\dot x)=\Delta t-\Delta x=0$ なので、各滑らかな片で $\dot t=\dot x$ が成立します。積分すると $t(s)-x(s)=-1-(-1)=0$、したがって曲線の像は必ず直線 $t=x$ に含まれます。連続な関数 $t(s)$ は $t(0)=-1$ から $t(1)=1$ まで動くため、途中で $t=0$ の点を通り、その点は $(0,0)\notin U$。これは矛盾です。

この例が示すのは「平坦な計量でも、時空を切り取ると到達関係が変わる」という点です。LORG7で一般時空の開性や $J^\pm$ の非閉性を調べる際、**どの時空の中で曲線を探しているか**が重要になります。

## 7. 演習：未来・過去の不等式を自分で導く

各問題で平坦時空の時間向きは $t$ の増加方向です。問題文に指定がない限り全Minkowski時空で考えます。解答では、$I$ と $J$、時間差の正負、等号点、集合の始点を混同しないようにしてください。

### Level A

<a id="ex-lorg6-a01"></a>
#### LORG6-A01 三点の到達関係
- Level: A

$\mathbb R^{1+1}$ で $p=(1,-1)$ とし、$q=(4,1)$、$r=(4,2)$、$s=(2,3)$ がそれぞれ $I^+(p)$、$E^+(p)$、$J^+(p)$ のどれに入るかを判定せよ。

<!-- solution-start -->
**詳細解答**。[Minkowski時空の時間的・因果的未来と過去](#thm-lorg6-minkowski-futures)により、$\Delta t=t-t_p$ と $\rho=|x-x_p|$ を比較します。各点の値は

$$
\begin{array}{c|cc|c}
 & \Delta t & \rho & \text{判定}\\ \hline
q=(4,1)&3&2&3>2\\
r=(4,2)&3&3&3=3\\
s=(2,3)&1&4&1<4
\end{array}
$$

です。従って $q\in I^+(p)\subset J^+(p)$ で $q\notin E^+(p)$、$r\in E^+(p)\subset J^+(p)$ で $r\notin I^+(p)$ です。$s$ は $J^+(p)$ に入らず、従って $I^+(p)$ と $E^+(p)$ にも入りません。
<!-- solution-end -->

<a id="ex-lorg6-a02"></a>
#### LORG6-A02 過去錐の符号
- Level: A

$\mathbb R^{1+2}$ の $p=(3,0,0)$ に対し、$a=(1,1,0)$ と $b=(1,2,0)$ の $I^-(p)$、$E^-(p)$、$J^-(p)$ への所属を決めよ。

<!-- solution-start -->
**詳細解答**。[Minkowski時空の時間的・因果的未来と過去](#thm-lorg6-minkowski-futures)では時間差 $t_p-t$ と空間距離 $|\mathbf x_p-\mathbf x|$ を比較します。二点について

$$
\begin{aligned}
a:\quad&t_p-t_a=2>1=|\mathbf x_p-\mathbf x_a|,\\
b:\quad&t_p-t_b=2=2=|\mathbf x_p-\mathbf x_b|
\end{aligned}
$$

です。よって $a\in I^-(p)\subset J^-(p)$ かつ $a\notin E^-(p)$、$b\in E^-(p)\subset J^-(p)$ かつ $b\notin I^-(p)$ です。過去側では $t-t_p$ でなく $t_p-t$ を使うことが判定の要点です。
<!-- solution-end -->

<a id="ex-lorg6-a03"></a>
#### LORG6-A03 頂点を捨てない
- Level: A

Minkowski時空の任意の点 $p$ について、$p\in J^+(p)$、$p\notin I^+(p)$、$p\in E^+(p)$ をそれぞれ別の理由で確認せよ。

<!-- solution-start -->
**詳細解答**。まず $p$ に留まる定数曲線は未来因果曲線として許されるので、[定義](#def-lorg6-chronological-causal-future)から $p\in J^+(p)$。次に $p$ から $p$ への時間差・空間差はいずれも零で、[Minkowski時空の時間的・因果的未来と過去](#thm-lorg6-minkowski-futures)の厳密不等式 $0>0$ は偽です。ゆえに $p\notin I^+(p)$。最後に[horismosの定義](#def-lorg6-horismos)へ代入して $p\in J^+(p)\setminus I^+(p)=E^+(p)$ です。
<!-- solution-end -->

<a id="ex-lorg6-a04"></a>
#### LORG6-A04 直線の因果型
- Level: A

Minkowski平面で $p=(-2,0)$ から $q=(1,3)$ への直線 $\gamma(s)=(-2+3s,3s)$（$0\le s\le1$）について、速度の自己内積を計算し、$q$ が $E^+(p)$ に入る理由を説明せよ。

<!-- solution-start -->
**詳細解答**。速度は $\dot\gamma=(3,3)$、自己内積は $-3^2+3^2=0$、時間成分 $3>0$ なので未来光的曲線です。よって $q\in J^+(p)$。端点差は $\Delta t=3$、$\rho=3$ です。[Minkowski時空の時間的・因果的未来と過去](#thm-lorg6-minkowski-futures)から $q\notin I^+(p)$。従って $q\in E^+(p)$ です。光的な一本の曲線があるという事実だけでは $I^+$ に入らないことまで言えないので、端点不等式も必要です。
<!-- solution-end -->

<a id="ex-lorg6-a05"></a>
#### LORG6-A05 二点集合の未来
- Level: A

Minkowski平面で $S=\{(0,0),(0,4)\}$、$q=(3,2)$、$r=(2,2)$ とする。$q,r$ の $I^+(S)$、$J^+(S)$、$E^+(S)$ への所属を判定せよ。

<!-- solution-start -->
**詳細解答**。[Minkowski時空の時間的・因果的未来と過去](#thm-lorg6-minkowski-futures)を二つの始点に適用すると、空間差はどちらからも $2$ であり、

$$
\begin{aligned}
q=(3,2):\quad&\Delta t=3>2=\rho,\\
r=(2,2):\quad&\Delta t=2=2=\rho
\end{aligned}
$$

となります。従って $q$ は両始点から時間的に到達可能で、$q\in I^+(S)\subset J^+(S)$、$q\notin E^+(S)$ です。一方 $r$ は両始点から因果的に到達できますが、いずれからも時間的には到達できません。[集合の未来の合併](#prop-lorg6-set-unions)より $r\in J^+(S)\setminus I^+(S)=E^+(S)$ です。
<!-- solution-end -->

### Level B

<a id="ex-lorg6-b01"></a>
#### LORG6-B01 積分から未来因果の端点条件
- Level: B

$\mathbb R^{1+2}$ の未来因果的区分的 $C^1$ 曲線 $\gamma(s)=(t(s),x(s),y(s))$ が $p$ と $q$ を結ぶとする。速度条件から $\Delta t\ge\sqrt{(\Delta x)^2+(\Delta y)^2}$ を、少なくとも二段階の不等式を明示して導け。

<!-- solution-start -->
**詳細解答**。[LORG1の未来錐の条件](../LORG1/index.md#def-lorg1-future-cone)から滑らかな各片で $\dot t\ge\sqrt{\dot x^2+\dot y^2}$ です。まず全ての片で積分して加えます。

$$
\Delta t=\int_0^1\dot t\,ds
\ge\int_0^1\sqrt{\dot x^2+\dot y^2}\,ds.
$$

次に $\mathbf v(s)=(\dot x(s),\dot y(s))$、$\mathbf w=\int_0^1\mathbf v(s)\,ds$ と置きます。$\mathbf w\ne0$ なら単位ベクトル $\mathbf u=\mathbf w/|\mathbf w|$ に対して $\mathbf u\cdot\mathbf v(s)\le|\mathbf v(s)|$ です。積分すると $|\mathbf w|\le\int_0^1|\mathbf v(s)|\,ds$ となり、$\mathbf w=0$ の場合もこの不等式は成立するので、

$$
\int_0^1|\mathbf v(s)|\,ds
\ge\left|\int_0^1\mathbf v(s)\,ds\right|
=\sqrt{(x(1)-x(0))^2+(y(1)-y(0))^2}.
$$

従って $\Delta t\ge\sqrt{(\Delta x)^2+(\Delta y)^2}$。これに逆向きの直線構成を加えると[Minkowski時空の時間的・因果的未来と過去](#thm-lorg6-minkowski-futures)の $J^+$ が得られます。
<!-- solution-end -->

<a id="ex-lorg6-b02"></a>
#### LORG6-B02 horismosは合併と交換できない
- Level: B

Minkowski平面で $S=\{(0,0),(1,0)\}$、$q=(2,1)$ とする。$q\in E^+((1,0))$ だが $q\notin E^+(S)$ を直接計算し、なぜ $\bigcup_{p\in S}E^+(p)$ が $E^+(S)$ と一致しないのか説明せよ。

<!-- solution-start -->
**詳細解答**。始点 $(1,0)$ から $q=(2,1)$ への変位は $(1,1)$ なので、時間差と空間差はいずれも $1$ です。[平坦時空での開性・閉性・horismosの境界表示](#prop-lorg6-minkowski-boundary)を適用すると

$$
q\in E^+((1,0)).
$$

一方、始点 $(0,0)$ からの時間差は $2$、空間差は $1$ です。$2>1$ なので $q\in I^+((0,0))$。[集合の未来・過去は点ごとの合併](#prop-lorg6-set-unions)から

$$
q\in I^+(S).
$$

[horismosの定義](#def-lorg6-horismos)で集合差を取れば、$q\notin E^+(S)$ となります。異なる始点から時間的に到達できる点まで、点ごとの光円錐境界を合併すると誤って含めてしまうのが失敗の原因です。
<!-- solution-end -->

<a id="ex-lorg6-b03"></a>
#### LORG6-B03 $J^+$の閉性を証明する材料
- Level: B

Minkowski時空で $p$ を固定し、$q_k\in J^+(p)$、$q_k\to q$ とする。$q\in J^+(p)$ を座標不等式から示し、同じ手順で $I^+(p)$ が閉集合だと主張できない理由も述べよ。

<!-- solution-start -->
**詳細解答**。$q_k=(t_k,\mathbf x_k)$、$p=(t_0,\mathbf x_0)$ と書きます。[Minkowski時空の時間的・因果的未来と過去](#thm-lorg6-minkowski-futures)を各 $q_k$ に適用すると、

$$
t_k-t_0\ge|\mathbf x_k-\mathbf x_0|
$$

です。$q_k\to q=(t,\mathbf x)$ なら $t_k\to t$、$\mathbf x_k\to\mathbf x$ です。ノルムの連続性により

$$
\begin{aligned}
t-t_0&=\lim_{k\to\infty}(t_k-t_0)\\
&\ge\lim_{k\to\infty}|\mathbf x_k-\mathbf x_0|\\
&=|\mathbf x-\mathbf x_0|.
\end{aligned}
$$

よって $q\in J^+(p)$ です。一方 $I^+(p)$ の厳密不等式は極限で等号に変わりえます。実際、$p=(0,0)$、$q_k=(1+1/k,1)$ では

$$
1+\frac1k>1,\qquad
q_k\longrightarrow(1,1),\qquad 1=|1|
$$

となるため、全ての $q_k$ が $I^+(p)$ に属するのに、極限 $(1,1)$ は $E^+(p)$ に属し $I^+(p)$ には入りません。
<!-- solution-end -->

<a id="ex-lorg6-b04"></a>
#### LORG6-B04 点を取り除くと光路はどうなるか
- Level: B

$U=\mathbb R^{1+1}\setminus\{(0,0)\}$ とし、$p=(-2,-2)$、$q=(2,2)$ とする。全時空では $p\le q$ だが、$U$ での未来因果曲線は存在しないことを証明せよ。単に直線が欠けているという観察だけで終えないこと。

<!-- solution-start -->
**詳細解答**。全時空では直線 $\gamma(s)=(-2+4s,-2+4s)$ が未来光的なので $p\le q$ です。仮に $U$ 内の未来因果曲線 $(t(s),x(s))$ が存在すると、[LORG1の未来錐の条件](../LORG1/index.md#def-lorg1-future-cone)により各片で $\dot t\ge|\dot x|\ge\dot x$ が成り立ちます。両端の差は $\Delta t=\Delta x=4$ なので

$$
0=\Delta t-\Delta x
=\int_0^1(\dot t-\dot x)\,ds.
$$

連続で非負な被積分関数は各滑らかな片で零です。従って $\dot t=\dot x$、すなわち $t(s)-x(s)$ は一定で、始点からその値は零です。曲線の全点で $t=x$ になります。$t(0)=-2$、$t(1)=2$ なので連続性からある $s_0$ で $t(s_0)=0$、従って $x(s_0)=0$。曲線は除去点を通るため $U$ 内には存在しません。この矛盾は、任意の因果曲線について等号が成立すると**すべての速度が光的な同一直線方向に強制される**ことに由来します。
<!-- solution-end -->

### Level C

<a id="ex-lorg6-c01"></a>
#### LORG6-C01 二つの未来錐の合併と境界
- Level: C

Minkowski平面で $S=\{(0,-1),(0,1)\}$ とする。

1. $I^+(S)$、$J^+(S)$ を $t$ と $x$ の不等式でそれぞれ一つずつ表示せよ。
2. $E^+(S)$ を等号で表示し、$t=0$ と $t=2$ の水平断面に含まれる点を求めよ。
3. $q=(2,1)$ が $E^+((0,-1))$ と $E^+(S)$ のどちらに属するかを計算し、点ごとの光円錐の合併が誤る仕組みを説明せよ。
4. $I^+(S)$ が開、$J^+(S)$ が閉であることを示せ。ただし有限集合であることを使ってよい。

<!-- solution-start -->
**詳細解答**。各基点からの空間距離は $|x+1|$、$|x-1|$ です。[集合の未来の合併](#prop-lorg6-set-unions)と[Minkowski時空の時間的・因果的未来と過去](#thm-lorg6-minkowski-futures)から、「どちらか一方の距離より時間が大きい」ことをまとめると

$$
\begin{aligned}
I^+(S)
&=\{(t,x):t>|x+1|\text{ または }t>|x-1|\}\\
&=\{(t,x):t>m(x)\},\\
J^+(S)
&=\{(t,x):t\ge|x+1|\text{ または }t\ge|x-1|\}\\
&=\{(t,x):t\ge m(x)\},
\end{aligned}
$$

ただし $m(x)=\min(|x+1|,|x-1|)$ と置きました。最小値を使える理由は二点のうち距離が短いほうを始点として選べるからです。

差集合の[horismos定義](#def-lorg6-horismos)から

$$
E^+(S)=\{(t,x):t=m(x)\}.
$$

$t=0$ では $m(x)=0$ が必要で、$x=-1,1$ の二点です。$t=2$ では $m(x)=2$ を解きます。$x\ge0$ なら $|x-1|\le|x+1|$ なので $m(x)=|x-1|$。この領域で $|x-1|=2$ の解は $x=3$（$x=-1$ は範囲外）。$x\le0$ なら $m(x)=|x+1|$、解は $x=-3$ です。従って断面は $(2,-3),(2,3)$ です。

$q=(2,1)$ は $(0,-1)$ からの差 $(2,2)$ により $E^+((0,-1))$ に属します。一方 $(0,1)$ からは差 $(2,0)$ なので時間的に到達可能、$q\in I^+(S)$ です。したがって $q\notin E^+(S)$。点ごとの境界を合併すると、もう一つの基点から時間的に到達できる点を余分に含めます。

最後に $m(x)$ は二つの連続関数の最小値なので連続です。$F(t,x)=t-m(x)$ も連続で、$I^+(S)=F^{-1}((0,\infty))$ は開、$J^+(S)=F^{-1}([0,\infty))$ は閉です。これは二点という**有限集合**から得た直接証明であり、任意の無限集合 $S$ へ同じ閉性を無条件に延長してはいけません。
<!-- solution-end -->

## 8. ここまでと次への接続

この章では、**曲線による到達可能性**を定義の正本としたうえで、Minkowski時空に限り $I^\pm$、$J^\pm$、$E^\pm$ を不等式で完全に記述しました。[平坦時空の未来・過去公式](#thm-lorg6-minkowski-futures)は光円錐の側面と頂点を $J^\pm$ に含み、[境界の命題](#prop-lorg6-minkowski-boundary)は同じ平坦時空でのみ $E^\pm=\partial J^\pm$ を導きます。

また[推移性](#prop-lorg6-transitivity)は曲線の連結から、[集合の合併](#prop-lorg6-set-unions)は存在量化から従いました。ここまでの議論には、一般時空での開性も閉性も先取りしていません。次のLORG7では曲線の局所変形を導入し、時間的未来がなぜ一般時空でも開くのか、そして因果的未来に同じ閉性を期待できないのはなぜかを検討します。
