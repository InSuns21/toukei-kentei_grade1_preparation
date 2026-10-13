# LORG8 共形因果構造と局所因果凸性

<!-- definition-example-audit: strict -->

## 1. 光円錐だけを知って何が分かるか

[LORG6の時間的・因果的未来](../LORG6/index.md#def-lorg6-chronological-causal-future)と[LORG7のpush-up補題](../LORG7/index.md#thm-lorg7-push-up)によって、曲線が光速以下でどこへ到達するかを調べられるようになりました。しかし時計の進み方と、光円錐の内外の区別は同じ情報でしょうか。

Minkowski平面で計量を $g=-dt^2+dx^2$ から $4g$ に替えると、ベクトル $(1,1)$ はどちらでも光的です。一方、静止した観測者が時刻 $0$ から $1$ まで進む固有時は $1$ から $2$ に変わります。つまり、**到達可能性を変えずに時計の目盛りを変えられる**のです。この操作を共形再尺度と呼び、次にその一般形を定義します。

もう一つの問いは、因果曲線の途中経過をどの領域に閉じ込められるか、です。両端点が小さい開集合に属することだけでは、曲線の途中もそこに留まるとは限りません。因果的凸性はこの「途中で外へ出ない」を表す条件で、局所と大域を慎重に分ける必要があります。

以下 $(M,g)$ は滑らかな連結・Hausdorff・第二可算・境界なし、次元 $n+1$（$n\ge1$）、符号 $(-,+,\ldots,+)$ の時間向き付きLorentz多様体とします。因果曲線は[LORG3の定義](../LORG3/index.md#def-lorg3-causal-curve)に従う未来向き区分的 $C^1$ 曲線（停留片を許す）です。因果関係 $p\ll q$, $p\le q$ は、それぞれ未来時間的曲線・未来因果曲線の存在を表します。どこにも強因果性をあらかじめ仮定しません。

## 2. 共形再尺度：光円錐はそのままで時計を替える

各点で計量を**正の数の二乗**倍すれば、ベクトルの自己内積の符号は保たれます。この倍率が場所ごとに滑らかに変わっても、符号判定は点ごとに成立します。ただし正でない倍率や零になる倍率は、Lorentz計量の非退化性または時間向きの比較を壊し得るため許しません。

<a id="def-lorg8-conformal-rescaling"></a>

<!-- formal-statement-start -->
> **定義（共形再尺度と共形同値）**  
> 滑らかな関数 $\Omega:M\to(0,\infty)$ に対して
>
> $$
> \widetilde g=\Omega^2g
> $$
>
> と置く操作を共形再尺度という。二つのLorentz計量 $g,\widetilde g$ がこの関係にあるとき共形同値という。両者には同じ未来錐の成分を時間向きとして指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg8-conformal-rescaling -->

**定義の確認**（直接例）。 $M=\mathbb R^{1+1}$、$g=-dt^2+dx^2$、$\Omega(t,x)=2+t^2$ とします。$\Omega$ は全点で滑らか、かつ $\Omega\ge2>0$ です。任意の接ベクトル $v=a\partial_t+b\partial_x$ に対し

$$
\widetilde g(v,v)=(2+t^2)^2(-a^2+b^2).
$$

倍率が厳密に正なので、$-a^2+b^2<0$, $=0$, $>0$ の三条件はそれぞれ変わりません。計量行列は座標基底 $(\partial_t,\partial_x)$ で $\operatorname{diag}(-\Omega^2,\Omega^2)$ となり、その行列式は $-\Omega^4\ne0$ です。対称性・滑らかさも元の計量から引き継ぐため、確かにLorentz計量です。未来向きは従来どおり $a>0$ 側を選べます。

<!-- definition-example-end -->

<a id="thm-lorg8-conformal-causality"></a>

<!-- formal-statement-start -->
> **定理（共形再尺度による因果関係の不変性）**  
> $(M,g)$ を滑らかな時間向き付きLorentz多様体、$\Omega:M\to(0,\infty)$ を滑らかな関数、$\widetilde g=\Omega^2g$ を同じ時間向き付き計量とする。このとき任意の $p,q\in M$ と任意の部分集合 $S\subset M$ に対し、
>
> $$
> \begin{gathered}
> p\ll_g q\ \Longleftrightarrow\ p\ll_{\widetilde g}q,\qquad
> p\le_g q\ \Longleftrightarrow\ p\le_{\widetilde g}q,\\
> I_g^\pm(S)=I_{\widetilde g}^\pm(S),\qquad
> J_g^\pm(S)=J_{\widetilde g}^\pm(S).
> \end{gathered}
> $$
>
> ただし、曲線のLorentz長さは一般には一致しない。
<!-- formal-statement-end -->

### 証明の見取り図

ベクトルの自己内積に正の倍率が掛かるので、時間的・光的・因果的という判定は保存されます。未来向きの判定も同じ錐の成分に関するものです。従って、**許される曲線の集合そのもの**が変わりません。曲線集合から作る $I^\pm,J^\pm$ も同一です。

<!-- proof-start -->
### 証明

任意の $z\in M$ と $v\in T_zM$ に対して

$$
\widetilde g_z(v,v)=\Omega(z)^2g_z(v,v),\qquad \Omega(z)^2>0
$$

ですから、$\widetilde g_z(v,v)\le0$ と $g_z(v,v)\le0$ は同値で、厳密不等式についても同値です。未来向きかどうかは、[時間向きの定義](../LORG2/index.md#def-lorg2-time-orientation)で選んだ同じ錐の連結成分に属するかで決まり、変わりません。

よって区分的 $C^1$ 曲線 $\gamma$ の各滑らかな片について、速度 $\dot\gamma$ が未来時間的（あるいは未来因果的）である条件は $g$ と $\widetilde g$ で同じです。零速度を許す規約も共通です。したがって

$$
\{\gamma:p\longrightarrow q\ \text{未来時間的（$g$）}\}
=
\{\gamma:p\longrightarrow q\ \text{未来時間的（$\widetilde g$）}\}
$$

となり、未来因果曲線でも同じ等式です。曲線が存在することによって定義される $p\ll q$ と $p\le q$ の同値性が従います。最後に[集合の未来・過去の合併公式](../LORG6/index.md#prop-lorg6-set-unions)を双方の計量に適用すると、例えば

$$
I_g^+(S)=\bigcup_{p\in S}I_g^+(p)
=\bigcup_{p\in S}I_{\widetilde g}^+(p)
=I_{\widetilde g}^+(S)
$$

です。残りの符号と $J$ も全く同じ「始点が $S$ に属する曲線の存在」という量化条件から従います。$\square$
<!-- proof-end -->

## 3. 長さは保たれない：同じ曲線の異なる固有時

因果的到達関係に曲線の長さが含まれない点を、式で確かめましょう。[LORG3のLorentz長さ](../LORG3/index.md#def-lorg3-lorentz-length)を同じ未来因果曲線 $\gamma:[a,b]\to M$ に適用すると、$\Omega(\gamma(s))>0$ なので平方根を取り出せます。

<a id="prop-lorg8-length-change"></a>

<!-- formal-statement-start -->
> **命題（共形再尺度でのLorentz長さ）**  
> 上の仮定のもとで、未来因果的区分的 $C^1$ 曲線 $\gamma:[a,b]\to M$ に対し、
>
> $$
> L_{\widetilde g}(\gamma)
> =\int_a^b\Omega(\gamma(s))
> \sqrt{-g_{\gamma(s)}(\dot\gamma(s),\dot\gamma(s))}\,ds.
> $$
>
> 特に、定数倍 $\Omega\equiv c>0$ なら $L_{\widetilde g}(\gamma)=cL_g(\gamma)$ である。任意の未来光的曲線の長さは両計量で零である。
<!-- formal-statement-end -->

### 証明の見取り図

長さを定義する積分の被積分関数に $\widetilde g=\Omega^2g$ を代入します。$\Omega>0$ が平方根の外へ出るため、一般には元の積分から変わります。

<!-- proof-start -->
### 証明

各滑らかな片で $g(\dot\gamma,\dot\gamma)\le0$ ですから

$$
\begin{aligned}
\sqrt{-\widetilde g(\dot\gamma,\dot\gamma)}
&=\sqrt{-\Omega(\gamma(s))^2g(\dot\gamma,\dot\gamma)}\\
&=\Omega(\gamma(s))\sqrt{-g(\dot\gamma,\dot\gamma)}.
\end{aligned}
$$

各片上で積分して足し合わせれば公式を得ます。$\Omega=c$ なら定数を積分外へ出せます。光的曲線ならほとんど至る所で $g(\dot\gamma,\dot\gamma)=0$ なので、両辺の積分は零です。$\square$
<!-- proof-end -->

**数値例。** 上の $\Omega=2+t^2$ と静止曲線 $\gamma(s)=(s,0)$（$0\le s\le1$）を取ります。速度は $(1,0)$ で $g(\dot\gamma,\dot\gamma)=-1$、時間成分は正です。従って未来時間的であり、

$$
L_g(\gamma)=\int_0^1 1\,ds=1,\qquad
L_{\widetilde g}(\gamma)
=\int_0^1(2+s^2)\,ds
=\left[2s+\frac{s^3}{3}\right]_0^1=\frac73.
$$

到達関係が同じでも時計の読みは一致しません。また一般には、$g$ の測地線が同じパラメータのまま $\widetilde g$ の測地線になるとも主張していません。**因果曲線の不変性と測地線・固有時の不変性は別問題**です。

## 4. 曲線の途中が外へ出ない集合

開集合 $U$ に二点 $x,y$ があるとしても、その二点を結ぶ因果曲線が外側を迂回するかもしれません。曲線の端点だけでなく**曲線の像全体**を量化して制限するのが、因果的凸性です。

<a id="def-lorg8-causal-convex"></a>

<!-- formal-statement-start -->
> **定義（因果的凸集合）**  
> 時間向き付き時空 $(M,g)$ の部分集合 $U$ が $M$ において**因果的凸**であるとは、端点がともに $U$ に属する任意の未来因果曲線 $\gamma:[a,b]\to M$ について
>
> $$
> \gamma(a),\gamma(b)\in U
> \quad\Longrightarrow\quad
> \gamma([a,b])\subset U
> $$
>
> が成り立つことをいう。$N\subset M$ が開集合である場合、「$U\subset N$ が $N$ において因果的凸」とは、$N$ 内に全体が含まれる因果曲線だけを量化することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg8-causal-convex -->

**定義の確認**（正例と非例）。Minkowski平面の開領域 $U=(-1,1)\times\mathbb R$ を考えます。未来因果曲線 $\gamma(s)=(t(s),x(s))$ の時間成分は、各滑らかな片で $\dot t\ge|\dot x|\ge0$ を満たすので、全曲線で非減少です。両端点が $U$ 内にあれば、任意の途中点に対して

$$
-1<t(a)\le t(s)\le t(b)<1
$$

となり、$\gamma([a,b])\subset U$ です。従って $U$ は $M=\mathbb R^{1+1}$ において因果的凸であり、「すべての端点・すべての曲線」という定義の量化条件を満たします。

一方、開領域 $V=\big((-2,-1)\cup(1,2)\big)\times\mathbb R$ では $p=(-3/2,0)$ と $q=(3/2,0)$ がともに $V$ にありますが、未来時間的な縦線 $\sigma(s)=(-3/2+3s,0)$（$0\le s\le1$）の速度は $(3,0)$、自己内積は $-9<0$、時間成分は $3>0$ です。ところが $\sigma(1/2)=(0,0)\notin V$ なので $V$ は因果的凸ではありません。失敗するのは端点の所属から曲線全像の所属への含意です。

<!-- definition-example-end -->

## 5. Alexandrov近傍：二つの時間的錐を重ねる

[pからの時間的未来](../LORG6/index.md#def-lorg6-chronological-causal-future)と点 $b$ の時間的過去を交差させれば、$a$ より後で $b$ より前という**二重の時間制約**を持つ領域ができます。この二つの錐が重なる領域を調べます。開性を確認した後、曲線が領域の外へ抜けられないことを証明します。

<a id="def-lorg8-alexandrov-diamond"></a>

<!-- formal-statement-start -->
> **定義（Alexandrovダイヤモンド）**  
> 時間向き付き時空 $(M,g)$ の点 $a,b$ に対し、
>
> $$
> D_M(a,b)=I_M^+(a)\cap I_M^-(b)
> $$
>
> をAlexandrovダイヤモンドという。$a\not\ll b$ なら空集合であり得る。開部分時空 $N\subset M$ では $N$ 内の曲線による $I_N^\pm$ を用いて $D_N(a,b)$ を定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg8-alexandrov-diamond -->

**定義の確認**（Minkowskiでの条件）。 $a=(-T,0)$、$b=(T,0)$、$T>0$ と置き、点 $z=(t,\mathbf x)$ を取ります。[Minkowskiの時間的未来・過去の公式](../LORG6/index.md#thm-lorg6-minkowski-futures)に従って

$$
\begin{aligned}
z\in I^+(a)&\ \Longleftrightarrow\ t+T>|\mathbf x|,\\
z\in I^-(b)&\ \Longleftrightarrow\ T-t>|\mathbf x|.
\end{aligned}
$$

両不等式は $|\mathbf x|<\min(T+t,T-t)=T-|t|$ と同値です。従って

$$
D_M(a,b)=\{(t,\mathbf x):|t|+|\mathbf x|<T\}.
$$

特に $0=(0,\mathbf0)$ は含まれ、$|t|+|\mathbf x|=T$ の境界点と両頂点は含まれません。時間的未来・過去の**厳密な**不等式によることまで確かめました。

<!-- definition-example-end -->

<a id="thm-lorg8-diamond-convex"></a>

<!-- formal-statement-start -->
> **定理（Alexandrovダイヤモンドの開性と因果的凸性）**  
> 任意の滑らかな時間向き付き時空 $(M,g)$ と任意の $a,b\in M$ について $D_M(a,b)$ は開集合であり、$M$ において因果的凸である。同じ主張は開部分時空 $N\subset M$ で定義した $D_N(a,b)$ にも、**$N$ 内の因果曲線に関して**成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

開性は[I±の開性](../LORG7/index.md#thm-lorg7-chronological-open)です。因果曲線 $\gamma$ の両端点が $a$ より未来、$b$ より過去なら、途中の点 $z$ に対して

$$
a\ll x\le z\le y\ll b
$$

と書けます。二度[push-up補題](../LORG7/index.md#thm-lorg7-push-up)を適用すれば、途中のどの点も同じダイヤモンド内です。

<!-- proof-start -->
### 証明

$I_M^+(a)$ と $I_M^-(b)$ は[時間的未来・過去の開性](../LORG7/index.md#thm-lorg7-chronological-open)から開集合です。有限交差の開性より $D_M(a,b)$ は開です。

次に $x,y\in D_M(a,b)$ を端点とする任意の未来因果曲線 $\gamma$ を取り、任意の途中点 $z=\gamma(s)$ を選びます。曲線の前半と後半を制限したものは未来因果曲線なので、[因果関係の反射性・推移性](../LORG6/index.md#prop-lorg6-transitivity)の定義に戻れば

$$
x\le z,\qquad z\le y
$$

です。端点がダイヤモンドにあることから $a\ll x$ と $y\ll b$ が成立します。[push-up補題](../LORG7/index.md#thm-lorg7-push-up)の $p\ll q\le r$ 型を $(a,x,z)$ に使って $a\ll z$ を得ます。次に同補題の $p\le q\ll r$ 型を $(z,y,b)$ に使い $z\ll b$ を得ます。従って

$$
z\in I_M^+(a)\cap I_M^-(b)=D_M(a,b).
$$

$z$ は任意でしたから $\gamma$ の全像が $D_M(a,b)$ に含まれます。これが因果的凸性です。$N$ 版は曲線と因果関係をすべて $N$ 内に制限し、同じ開性とpush-upを開時空 $(N,g|_N)$ へ適用して得られます。$N$ 版だけから $M$ における因果的凸性を推論してはいけません。$\square$
<!-- proof-end -->

## 6. 局所で作る小さなダイヤモンドと「外から戻る」経路

一般の時空でも、十分小さい座標近傍 $N$ の**内部だけを走る**因果曲線を考えるなら、任意に小さなダイヤモンドを作れます。これは将来の強因果性の定義と混同しないためにも重要です。

<a id="lem-lorg8-local-diamonds"></a>

<!-- formal-statement-start -->
> **補題（相対的なAlexandrov近傍の局所基底）**  
> 滑らかな時間向き付き時空 $(M,g)$ の任意の $p$ について、$p$ を含む座標近傍 $N$ を十分小さく選べば、$N$ 内で作る $D_N(a,b)$ で $p$ を含むものが $p$ の近傍基底をなす。各 $D_N(a,b)$ は $N$ において因果的凸である。ただし、この補題は $M$ 全体での因果的凸性を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

点 $p$ で時間方向の座標軸を未来時間的に取り、その近くでも $\partial_t$ が未来時間的で、$t$ が未来因果曲線に沿って増加するように座標を縮めます。光円錐が連続に変化するため、**座標時間1だけ進む間に動ける空間距離には一様上限**があります。その上限からダイヤモンドの直径を制御します。

<!-- proof-start -->
### 証明

まず $T_p$ に未来時間的ベクトルを選び、それを時間方向の基底ベクトルとする局所座標 $(t,\mathbf x)$ を作り、$p=(0,\mathbf0)$ とします。$p$ で残りの空間基底を $T_p$ に直交するように選べば、$g_p$ の行列は符号 $(-,+,\ldots,+)$ の対角形にできます。この点では $dt(v)>0$ が任意の非零未来因果ベクトルに成立します。

計量係数の連続性と、単位球と閉因果錐の交わりのコンパクト性を使い、座標域を縮めて $dt(v)>0$ が全域で成り立つようにします。さらに有限定数 $C>0$ を選んで

$$
|\mathbf v|\le C v^0
\qquad
\text{（任意の未来因果 $v=v^0\partial_t+\sum_i v^i\partial_{x^i}$）}
$$

を一様に満たせます。実際、$v^0=1$ に規格化した未来因果ベクトルの空間成分が無限大になれば、その正規化列の単位極限は $v^0=0$ を持つ非零因果ベクトルとなり、上の厳密な正性に矛盾します。係数を閉包上で一様に選べるように近傍をさらに縮めます。

$p$ を含み、閉包がこの座標域に入る小さい開座標近傍 $N$ を取ります。$\partial_t$ は $N$ 上で未来時間的なので、十分小さい $\varepsilon>0$ に対して

$$
a_\varepsilon=(-\varepsilon,\mathbf0),\qquad
b_\varepsilon=(\varepsilon,\mathbf0)
$$

を $N$ 内に取れます。$a_\varepsilon$ から $p$、$p$ から $b_\varepsilon$ への縦線は $N$ 内にある未来時間的曲線で、従って $p\in D_N(a_\varepsilon,b_\varepsilon)$ です。

$z=(t_z,\mathbf x_z)\in D_N(a_\varepsilon,b_\varepsilon)$ とします。$N$ 内の未来時間的曲線 $a_\varepsilon\to z$ と $z\to b_\varepsilon$ が存在します。$t$ の増加から

$$
-\varepsilon<t_z<\varepsilon.
$$

前半の曲線を片ごとに $t$ で再パラメータ化し、上の錐評価を積分すると

$$
|\mathbf x_z|
\le\int_{-\varepsilon}^{t_z}
\left|\frac{d\mathbf x}{dt}\right|dt
\le C(t_z+\varepsilon)
<2C\varepsilon.
$$

よって

$$
D_N(a_\varepsilon,b_\varepsilon)
\subset\{(t,\mathbf x)\in N:|t|<\varepsilon,\ |\mathbf x|<2C\varepsilon\}.
$$

右辺は $\varepsilon\downarrow0$ で $p$ に縮みます。任意の $p$ の近傍 $O\subset N$ は十分小さい座標長方体を含むので、上の包含から小さい $\varepsilon$ で $p\in D_N(a_\varepsilon,b_\varepsilon)\subset O$ とできます。[ダイヤモンドの開性と相対的因果的凸性](#thm-lorg8-diamond-convex)より、これらは求める開近傍基底です。$\square$
<!-- proof-end -->

重要なのは、上の積分評価が**$N$ 内に留まる曲線**だけに有効なことです。曲線が $N$ から出て別の時刻座標を通って戻れば、この一つの座標での積分評価を適用できません。ここでいきなり「どの時空にも任意に小さい大域的な因果的凸近傍がある」と断定すると誤りになります。

## 7. 時間を周期化すると小さいダイヤモンドが消える

反例として、Minkowski平面を時刻 $t$ の周期 $P>0$ で商にした円筒 $M=(\mathbb R/P\mathbb Z)\times\mathbb R$ を考えます。局所座標で $g=-dt^2+dx^2$ とし、未来向きは $\partial_t$ の方向とします。座標変換は $t\mapsto t+kP$ なので計量と未来向きは商へ降ります。$\partial_t$ の積分曲線は各 $x$ で閉じた未来時間的曲線です。

<a id="prop-lorg8-periodic-counterexample"></a>

<!-- formal-statement-start -->
> **命題（時間周期円筒のAlexandrov集合）**  
> 上の時間向き付きLorentz円筒では任意の二点 $p,q\in M$ に対し $p\ll q$ が成立する。従って
>
> $$
> I^\pm(p)=M,\qquad D_M(a,b)=M
> $$
>
> がすべての点 $a,b,p$ について成り立つ。特に、大域的なAlexandrovダイヤモンドは多様体位相の近傍基底をなさず、各点に任意に小さな $M$-因果的凸開近傍も存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

未来へ十分多く時間周期を回れば、どの二点の空間差より大きな時間差を確保できます。商へ射影したMinkowskiの時間的直線により任意の点へ到達できます。さらに時刻円周を一周する閉時間的曲線が、小さい集合から一度出て戻ります。

<!-- proof-start -->
### 証明

$p=([t_p],x_p)$、$q=([t_q],x_q)$ の実数代表を取り、整数 $k$ を十分大きく選べば

$$
\Delta t=t_q+kP-t_p>|x_q-x_p|
$$

が成立します。被覆空間で

$$
\sigma(s)=(t_p+s\Delta t,\ x_p+s(x_q-x_p)),
\qquad 0\le s\le1
$$

とすると、その速度の時間成分は正で、

$$
g(\dot\sigma,\dot\sigma)
=-(\Delta t)^2+(x_q-x_p)^2<0.
$$

従って $\sigma$ は未来時間的です。商への射影は局所等長写像なので、射影曲線も未来時間的で、始点は $p$、終点は $q$ です。$p,q$ は任意だったため $p\ll q$ が全点で成立します。これにより $I^+(p)=I^-(p)=M$、従って $D_M(a,b)=M$ です。

次に $p$ の任意の十分小さい座標近傍 $O$ を、同じ空間位置 $x_p$ の時刻円周全体を含まないように取ります。仮に $p\in U\subset O$ を満たす $M$-因果的凸な開集合 $U$ があるとします。曲線

$$
\gamma(s)=([t_p+sP],x_p),\qquad0\le s\le1
$$

は未来時間的で、$\gamma(0)=\gamma(1)=p\in U$ ですが、途中で $O$ の外へ出ます。従って $\gamma([0,1])\not\subset U$。これは[因果的凸性の定義](#def-lorg8-causal-convex)に矛盾します。ゆえにそのような $U$ はありません。$\square$
<!-- proof-end -->

[LORG7の開性](../LORG7/index.md#thm-lorg7-chronological-open)とは矛盾しません。この模型では $I^+(p)=M$ 自体が開です。ただし **$I^+$ が開くこと**と、**その交差が任意の小さい近傍を作ること**は異なる主張です。後者を保証する因果条件をLORG9・LORG10で詳しく調べます。

## 8. 演習：共形変換・ダイヤモンド・局所と大域

### Level A

<a id="ex-lorg8-a01"></a>
#### LORG8-A01 共形倍率と錐の符号
- Level: A

$\mathbb R^{1+1}$ の $g=-dt^2+dx^2$ を $\widetilde g=9g$ に替える。$v=(2,1)$、$w=(1,1)$、$u=(1,2)$ の因果型を両計量で判定し、$v$ の未来向きも確かめよ。

<!-- solution-start -->
**詳細解答**。計量を座標速度へ代入すると

$$
g(v,v)=-4+1=-3,\quad
g(w,w)=-1+1=0,\quad
g(u,u)=-1+4=3.
$$

従って $v$ は時間的、$w$ は光的、$u$ は空間的です。$\widetilde g=9g$ では自己内積がそれぞれ $-27,0,27$ となり、符号は保存されます。$v$ の時間成分は $2>0$ なので、未来向きを $dt>0$ と選べば両計量で未来時間的です。倍率 $9$ は正で零にならないため、この判定が可能です。
<!-- solution-end -->

<a id="ex-lorg8-a02"></a>
#### LORG8-A02 固有時の積分
- Level: A

$\Omega(t,x)=1+t$ を開領域 $t>-1$ で用い、$g=-dt^2+dx^2$、$\widetilde g=\Omega^2g$ とする。$\gamma(s)=(s,0)$（$0\le s\le2$）の二つのLorentz長さを求めよ。

<!-- solution-start -->
**詳細解答**。$\Omega=1+t>0$ は開領域 $t>-1$ で滑らかであり、曲線上では $\Omega\ge1$ です。$\dot\gamma=(1,0)$ で $g(\dot\gamma,\dot\gamma)=-1$ です。[共形再尺度での長さ公式](#prop-lorg8-length-change)を、$\Omega(\gamma(s))=1+s$ へ適用すると

$$
L_g(\gamma)=\int_0^2 1\,ds=2,\qquad
L_{\widetilde g}(\gamma)=\int_0^2(1+s)\,ds
=\left[s+\frac{s^2}{2}\right]_0^2=4.
$$

同じ端点と同じ未来時間的曲線でも長さは異なります。
<!-- solution-end -->

<a id="ex-lorg8-a03"></a>
#### LORG8-A03 開ダイヤモンドの境界
- Level: A

標準Minkowski平面で $a=(-2,0)$、$b=(2,0)$ とする。$D(a,b)$ を不等式で表し、$(0,1)$、$(1,1)$、$(2,0)$ の所属を判定せよ。

<!-- solution-start -->
**詳細解答**。[時間的未来・過去のMinkowski公式](../LORG6/index.md#thm-lorg6-minkowski-futures)に $a,b$ を代入すると

$$
D(a,b)=\{(t,x):t+2>|x|,\ 2-t>|x|\}
=\{(t,x):|t|+|x|<2\}.
$$

$(0,1)$ は $0+1<2$ なので属します。$(1,1)$ は $1+1=2$ で厳密不等式を満たさず、$(2,0)$ も $2+0=2$ で属しません。頂点や光的境界が含まれない点が重要です。
<!-- solution-end -->

<a id="ex-lorg8-a04"></a>
#### LORG8-A04 ダイヤモンド内の途中点
- Level: A

任意の時間向き付き時空で $x,y\in D(a,b)$ とし、未来因果曲線が $x$ から $y$ へ進む。途中点 $z$ について $a\ll z\ll b$ を、用いるpush-upの順序を明示して証明せよ。

<!-- solution-start -->
**詳細解答**。端点の所属より $a\ll x$、$y\ll b$ です。途中点の前後の曲線を制限すると $x\le z\le y$ です。まず[push-up補題](../LORG7/index.md#thm-lorg7-push-up)の $p\ll q\le r$ 型を $(a,x,z)$ に代入し $a\ll z$ を得ます。続いて $p\le q\ll r$ 型を $(z,y,b)$ に代入し $z\ll b$ を得ます。よって $z\in I^+(a)\cap I^-(b)$ です。端点の開性だけではなく途中点へpush-upを使うことが核心です。
<!-- solution-end -->

<a id="ex-lorg8-a05"></a>
#### LORG8-A05 相対的な因果的凸性
- Level: A

$N\subset M$ が開部分時空で $U\subset N$ とする。「$U$ は $N$ で因果的凸」と「$U$ は $M$ で因果的凸」のどちらが強いか、定義の量化対象を比較せよ。

<!-- solution-start -->
**詳細解答**。[定義](#def-lorg8-causal-convex)では $M$ での因果的凸性は端点が $U$ にある**すべての $M$ 内の因果曲線**を量化します。その中には $N$ から外へ出る曲線も含まれます。従って $M$ で因果的凸なら、特に $N$ 内に留まる因果曲線についても性質が成立し、$N$ でも因果的凸です。逆は一般に成り立ちません。局所座標内の証明だけで外から戻る曲線まで排除できないからです。
<!-- solution-end -->

### Level B

<a id="ex-lorg8-b01"></a>
#### LORG8-B01 空間依存の共形因子
- Level: B

$g=-dt^2+dx^2$、$\widetilde g=e^{2x}g$ とする。$\gamma(s)=(s,s/2)$（$0\le s\le1$）が両計量で未来時間的であることを示し、長さを計算せよ。

<!-- solution-start -->
**詳細解答**。$\Omega=e^x>0$ は全Minkowski平面で滑らかです。曲線の速度は $(1,1/2)$ ですから

$$
g(\dot\gamma,\dot\gamma)=-1+\frac14=-\frac34<0,
$$

かつ時刻成分は $1>0$ です。[共形因果不変性](#thm-lorg8-conformal-causality)から $\widetilde g$ でも未来時間的です。直接にも自己内積は $-3e^s/4<0$ です。[長さ公式](#prop-lorg8-length-change)へ代入すると

$$
\begin{aligned}
L_g(\gamma)&=\int_0^1\frac{\sqrt3}{2}\,ds=\frac{\sqrt3}{2},\\
L_{\widetilde g}(\gamma)&=\frac{\sqrt3}{2}\int_0^1 e^{s/2}\,ds
=\frac{\sqrt3}{2}\,[2e^{s/2}]_0^1\\
&=\sqrt3(e^{1/2}-1).
\end{aligned}
$$

曲線の因果型を決める符号は不変でも、被積分関数に $e^{s/2}$ が掛かります。
<!-- solution-end -->

<a id="ex-lorg8-b02"></a>
#### LORG8-B02 部分時空での到達関係と共形不変性
- Level: B

$U=\mathbb R^{1+1}\setminus\{(0,0)\}$、$p=(-1,-1)$、$q=(1,1)$ とする。$p\le q$ は全平面では成り立つが $p\le_U q$ は成り立たないことを説明せよ。さらに任意の正の滑らかな $\Omega:U\to(0,\infty)$ でこの不達性が解消しないことを証明せよ。

<!-- solution-start -->
**詳細解答**。全平面で直線 $\sigma(s)=(-1+2s,-1+2s)$ は速度 $(2,2)$ を持ち、自己内積 $-4+4=0$、時刻成分は正なので未来因果的です。従って $p\le q$ です。しかし $\sigma(1/2)=(0,0)\notin U$ です。

別の $U$ 内の未来因果曲線 $(t(s),x(s))$ があると仮定すると、各区分で $\dot t-\dot x\ge0$ である一方

$$
\int_0^1(\dot t-\dot x)\,ds
=(1-(-1))-(1-(-1))=0.
$$

従って各区分で $\dot t-\dot x=0$、全経路で $t=x$ となり、連続性から原点を通るので矛盾します。これは[点除去時空の非閉性](../LORG7/index.md#prop-lorg7-punctured-nonclosed)で扱った障害です。

$\Omega>0$ なら[共形因果不変性](#thm-lorg8-conformal-causality)を**同じ部分時空 $U$ に**適用でき、許される $U$ 内の因果曲線の集合は変わりません。元々存在しない $p$ から $q$ への経路は作れないので $\widetilde g$ でも $p\not\le_U q$ です。
<!-- solution-end -->

<a id="ex-lorg8-b03"></a>
#### LORG8-B03 周期時刻の到達と閉時間的曲線
- Level: B

$M=(\mathbb R/3\mathbb Z)\times\mathbb R$、$g=-dt^2+dx^2$、未来向き $\partial_t$ とする。$p=([0],0)$、$q=([1],5)$ を結ぶ未来時間的曲線を被覆空間の直線から構成し、$D_M(p,q)$ を決定せよ。

<!-- solution-start -->
**詳細解答**。$q$ の時刻を $1+3k$ へ持ち上げます。$k=2$ を選べば $\Delta t=7>|\Delta x|=5$ です。被覆空間で

$$
\sigma(s)=(7s,5s),\quad
g(\dot\sigma,\dot\sigma)=-49+25=-24<0
$$

となり、時刻成分も $7>0$。これを商へ射影すると始点 $p$、終点 $([7],5)=([1],5)=q$ の未来時間的曲線です。

[周期円筒の命題](#prop-lorg8-periodic-counterexample)は任意の始点・終点に同じ持ち上げを適用できることを示します。従って $I^+(p)=I^-(q)=M$ で、定義から

$$
D_M(p,q)=I^+(p)\cap I^-(q)=M
$$

です。平面での $|t|+|x|<T$ 型を周期円筒へそのまま持ち込めません。
<!-- solution-end -->

<a id="ex-lorg8-b04"></a>
#### LORG8-B04 局所の円錐評価から小ささを示す
- Level: B

$p=(0,\mathbf0)$ の座標近傍 $N$ で未来因果速度が $|\mathbf v|\le3v^0$、$v^0\ge0$ を満たすとする。$a_\varepsilon=(-\varepsilon,\mathbf0)$、$b_\varepsilon=(\varepsilon,\mathbf0)$ とし、両点および縦線が $N$ 内にある。$z\in D_N(a_\varepsilon,b_\varepsilon)$ について $|t_z|<\varepsilon$、$|\mathbf x_z|<6\varepsilon$ を導け。

<!-- solution-start -->
**詳細解答**。定義から $a_\varepsilon$ から $z$、$z$ から $b_\varepsilon$ への $N$ 内の未来時間的曲線があります。$dt/ds>0$ なので時刻は増加し、両端から $-\varepsilon<t_z<\varepsilon$ です。最初の曲線を $t$ でパラメータ化すると

$$
\left|\frac{d\mathbf x}{dt}\right|
=\frac{|\mathbf v|}{v^0}\le3.
$$

従って三角不等式と積分から

$$
|\mathbf x_z-\mathbf0|
\le\int_{-\varepsilon}^{t_z}\left|\frac{d\mathbf x}{dt}\right|dt
\le3(t_z+\varepsilon)<6\varepsilon.
$$

この評価は曲線が $N$ 内にあるから使えます。[局所ダイヤモンド補題](#lem-lorg8-local-diamonds)の定数 $C=3$ の場合です。$M$ 内を遠回りして戻る曲線へこの座標評価を当てはめることはできません。
<!-- solution-end -->

### Level C

<a id="ex-lorg8-c01"></a>
#### LORG8-C01 共形変換は大域的な因果障害を修復できるか
- Level: C

時間周期円筒 $M=(\mathbb R/P\mathbb Z)\times\mathbb R$ に $\widetilde g=e^{2f}g$、$g=-dt^2+dx^2$ を置く。$f$ は $M$ 上の任意の滑らかな実数値関数とする。

1. $\widetilde g$ が時間向き付きLorentz計量であることと、任意の二点が時間的到達関係にあることを示せ。
2. $\widetilde g$ の全Alexandrovダイヤモンドを決定し、多様体位相の局所基底にならない理由を証明せよ。
3. $x=x_0$ で時刻円周を一周する未来時間的曲線の $g$ と $\widetilde g$ の長さを比較せよ（$f$ は定数と仮定しない）。
4. 共形変換で保存される情報と保存されない情報を区別せよ。

<!-- solution-start -->
**詳細解答**。まず $\Omega=e^f>0$ は滑らかです。$\widetilde g=\Omega^2g$ の行列式は局所基底で $-\Omega^4<0$ なので非退化で符号数は $(1,1)$、時間向きは同じ $\partial_t$ の錐成分で与えられます。[共形因果不変性](#thm-lorg8-conformal-causality)により $\widetilde g$ と $g$ の未来時間的曲線の集合は同じです。

任意の $p=([t_p],x_p)$、$q=([t_q],x_q)$ について、十分大きな整数 $k$ を取ると

$$
\Delta t=t_q+kP-t_p>|x_q-x_p|.
$$

被覆平面で両点の持ち上げを結ぶ直線の自己内積は $-(\Delta t)^2+(x_q-x_p)^2<0$、時刻成分 $\Delta t>0$ です。射影は未来時間的なので $\widetilde g$ についても $p\ll q$ です。

$p,q$ は任意だったから $I_{\widetilde g}^+(p)=I_{\widetilde g}^-(q)=M$、従って

$$
D_{M,\widetilde g}(p,q)=M.
$$

どのダイヤモンドも $M$ 全体であり、真に小さい座標開近傍の内部には入りません。よって多様体位相の局所基底になりません。また $p$ を通る閉時間的円周が任意の十分小さい座標近傍を出て戻るため、[因果的凸性](#def-lorg8-causal-convex)の意味で任意に小さい大域的因果的凸近傍もありません。

円周を $\gamma(s)=([t_0+Ps],x_0)$（$0\le s\le1$）と書くと、$\dot\gamma=P\partial_t$ です。[長さ公式](#prop-lorg8-length-change)で

$$
L_g(\gamma)=\int_0^1 P\,ds=P,
$$

一方、

$$
\begin{aligned}
L_{\widetilde g}(\gamma)
&=\int_0^1P\,e^{f([t_0+Ps],x_0)}\,ds\\
&=\int_{t_0}^{t_0+P}e^{f([u],x_0)}\,du.
\end{aligned}
$$

となります。これは一般には $P$ に等しくありません（例えば $f\equiv\log2$ なら $2P$ です）。保存されるのは未来錐・時間的/因果的到達可能性・因果的凸性・Alexandrov集合そのものです。変わり得るのはLorentz長さ・固有時です。このように共形倍率で時計を変えても、閉時間的曲線や大域的近傍の欠陥は解消しません。
<!-- solution-end -->

## 9. 次の因果階層へ

[共形因果不変性](#thm-lorg8-conformal-causality)により、時間的・因果的到達の理論は計量の「光円錐を決める部分」に依存し、[Lorentz長さ](#prop-lorg8-length-change)はさらに倍率に依存すると分かりました。[Alexandrovダイヤモンド](#thm-lorg8-diamond-convex)は常に開で因果的凸ですが、[局所補題](#lem-lorg8-local-diamonds)が保証するのは部分時空内での小ささだけです。[周期時刻の反例](#prop-lorg8-periodic-counterexample)では時空全体へ戻る曲線を排除できません。

次のLORG9では閉時間的・閉因果曲線が存在しないという条件から始め、LORG10でさらに強い条件と、任意に小さい大域的因果的凸近傍との関係を調べます。
