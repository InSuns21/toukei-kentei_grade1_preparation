# LORG7 push-up補題とI±の開性

<!-- definition-example-audit: strict -->

## 1. 光速で進んだあとに少しだけ時計を進める

[LORG6の因果集合](../LORG6/index.md#def-lorg6-chronological-causal-future)では、$p\le q$ は光的曲線による到達も許し、$p\ll q$ は時間的曲線による到達に限りました。平坦時空なら端点差の不等式で区別できます。しかし、曲がった時空で因果曲線と時間的曲線をつないだとき、曲線の一部が光的なら、連結しただけでは「全体が時間的」とは言えません。

ここで解決したいのは、光速以下で進んだ区間のあとに少しでも時間的な余裕があれば、**経路全体を時間的な経路に置き換えられるか**という問いです。局所的に因果曲線を未来へ押し上げると、その答えは肯定的になります。これが押し上げの原理です。その結果、時間的未来は時空のどの点でも開集合になり、一方、因果的未来は閉集合とは限らないことが明確になります。

$(M,g)$ は滑らかな連結・Hausdorff・第二可算・境界なしの時間向き付きLorentz多様体、次元 $n+1$（$n\ge1$）、符号 $(-,+,\ldots,+)$ とします。[LORG3の因果曲線](../LORG3/index.md#def-lorg3-causal-curve)は未来向き区分的 $C^1$ 曲線とし、因果曲線には零速度を許します。曲線を変形する場面では滑らかな未来時間的ベクトル場と、その局所流れを用います。以下の結果に、強因果性や大域双曲性は仮定しません。

## 2. 時間的な経路の端点は少し動かせる

最初に、時間的曲線の終点をわずかに動かしても時間的に到達できる、という**局所的な安定性**を確かめます。Minkowski時空で $(0,0)$ から $(2,1)$ への直線は時間的です。終点を $(2+\varepsilon,1+\eta)$ に動かしても $2+\varepsilon>|1+\eta|$ である限り時間的な直線が残ります。一般時空でも、短い座標区間では計量の連続性によって同じ仕組みが働きます。

<a id="lem-lorg7-timelike-endpoints"></a>

<!-- formal-statement-start -->
> **補題（時間的関係の端点安定性）**  
> 上記の滑らかな時間向き付きLorentz多様体において $p\ll q$ とする。このとき、$p$ の開近傍 $U$ と $q$ の開近傍 $V$ が存在し、任意の $p'\in U$ と $q'\in V$ に対し $p'\ll q'$ が成り立つ。特に時間的到達関係は $M\times M$ の開部分集合である。
<!-- formal-statement-end -->

### 証明の見取り図

時間的曲線の最初と最後のごく短い部分を、座標内の時間的な直線に置き換えます。未来時間的ベクトル全体は接空間で開錐なので、短い直線の端点を微小に変えても速度は未来時間的なままです。中央の元の曲線を接続すれば、端点を両方動かせます。

<!-- proof-start -->
### 証明

$p$ から $q$ への区分的 $C^1$ 未来時間的曲線 $\gamma:[0,1]\to M$ を取ります。始点の直後の滑らかな片に座標 $x$ を選び、$a=\gamma(s_0)$（$s_0>0$ は十分小）を取ります。未来時間的な速度 $\dot\gamma(0)$ の近くでは $g(v,v)<0$ と未来性がともに開条件です。座標で

$$
\frac{x(a)-x(p)}{s_0}
=\frac1{s_0}\int_0^{s_0}\frac{d}{ds}x(\gamma(s))\,ds
\longrightarrow (dx)_p\dot\gamma(0)
$$

となるので、$s_0$ を小さくすると、$x(p)$ と $x(a)$ を結ぶ座標直線の速度は未来時間的になります。この直線の通るコンパクトな短い区間上では、計量係数と時間向きが連続なので、直線の始点を $p'$ へ微小に動かしても全点で未来時間的なままです。したがって $p$ のある近傍 $U$ のすべての $p'$ について $p'\ll a$ です。

終点側でも、最後の滑らかな片の $b=\gamma(s_1)$（$s_1<1$ を十分 $1$ に近く取る）から $q$ への座標直線は未来時間的であり、$q$ の近傍 $V$ のすべての $q'$ へ $b\ll q'$ が成り立ちます。$s_0<s_1$ となるように取れば、元の曲線の中間部分から $a\ll b$ です。[時間的関係の推移性](../LORG6/index.md#prop-lorg6-transitivity)を二度適用し、

$$
p'\ll a,\qquad a\ll b,\qquad b\ll q'
\quad\Longrightarrow\quad p'\ll q'
$$

が任意の $(p',q')\in U\times V$ に成立します。$\square$
<!-- proof-end -->

ここでは $p\ll q$ を初めから仮定しています。光的な曲線だけがある場合、その曲線の終点を**固定したまま**同じ議論をすると失敗します。次に終点をほんの少し未来へ動かして、曲線自体を時間的にします。

## 3. 因果曲線を時間方向へ押す局所変形

Minkowski平面の光的曲線 $\gamma(s)=(s,s)$（$0\le s\le1$）を考えます。時刻成分だけ少し増やした $\gamma_\varepsilon(s)=((1+\varepsilon)s,s)$ は、始点を保ったまま終点を $(1+\varepsilon,1)$ に動かし、

$$
g(\dot\gamma_\varepsilon,\dot\gamma_\varepsilon)
=-(1+\varepsilon)^2+1
=-2\varepsilon-\varepsilon^2<0
$$

を満たします。これなら時間的曲線です。

一般の曲がった時空では時刻方向の平行移動によって計量自体も変わります。その変化を、速度へ追加する時間的成分が上回るように調整します。以下がこの章の核心となる変形です。

<a id="lem-lorg7-causal-push"></a>

<!-- formal-statement-start -->
> **補題（因果曲線の未来・過去への時間的変形）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ 上で、$p$ から $q$ への未来向き区分的 $C^1$ 因果曲線 $\gamma$ が存在するとする。任意の十分小さい $\varepsilon>0$ に対して、$q$ に収束する点 $q_\varepsilon\in I^+(q)$ と、$p$ から $q_\varepsilon$ への未来時間的区分的 $C^1$ 曲線を構成できる。また $p$ に収束する点 $p_\varepsilon\in I^-(p)$ と、$p_\varepsilon$ から $q$ への未来時間的区分的 $C^1$ 曲線も構成できる。
<!-- formal-statement-end -->

### 証明の見取り図

時間向きを指定した滑らかな時空では、未来時間的な滑らかなベクトル場 $T$ を選べます。因果曲線の各点を $T$ の流れで少し未来へずらすのですが、ずらす量を始点で零、終点で正にすることで始点を固定します。計量が位置により変わる誤差はずらし量の一次、時間的な速度の増分はその**微分**に比例します。指数関数型のずらし方で後者を優勢にします。

<!-- proof-start -->
### 証明

時間向きの定義により局所的な未来時間的場を選べます。そのような場を時間的錐の凸性を保ったまま分割の一で貼り合わせれば、全体で滑らかな未来時間的場 $T$ が得られます（[未来錐の凸性](../LORG1/index.md#prop-lorg1-cone-convex)）。$T$ の局所流れを $\Phi_u$ とします。曲線像はコンパクトなので、十分小さい一様な $|u|$ ではすべての $\Phi_u(\gamma(s))$ が存在します。

補助的なRiemann計量 $h$ を一つ選びます。区分的 $C^1$ 性から、滑らかな各片で $\|\dot\gamma(s)\|_h\le K$ となる有限定数 $K$ が存在します。未来因果ベクトル $v$ と未来時間的 $T$ には、コンパクトな曲線像上で、ある $c_0>0$ について

$$
g(v,T)\le-c_0\|v\|_h
$$

が成り立ちます。これは各接空間で単位未来因果ベクトルと $T$ の内積が厳密に負であり、単位因果ベクトル全体を曲線像上で集めた集合がコンパクトだからです。零ベクトルでもこの不等式は成立します。

$A>0$ を後で選び、$f(s)=e^{As}-1$ と置きます。$\delta>0$ に対して

$$
u(s)=\delta f(s),\qquad
\gamma_\delta(s)=\Phi_{u(s)}(\gamma(s))
$$

と定めます。$f(0)=0$ なので $\gamma_\delta(0)=p$、$f(1)>0$ なので $\gamma_\delta(1)=\Phi_{\delta f(1)}(q)$ は $q$ の時間的未来にあります。合成関数を各滑らかな片で微分すると

$$
\dot\gamma_\delta
=w+\delta f'(s)T(\gamma_\delta(s)),\qquad
w=(d\Phi_{u(s)})_{\gamma(s)}\dot\gamma(s).
$$

位置と計量が滑らかに変わること、$g(\dot\gamma,\dot\gamma)\le0$、および上の一様負性から、十分小さい $\delta$ に対して（$A$ を固定した後で選ぶ）、曲線像の近傍に共通の $C,c,m>0$ を取り、

$$
\begin{aligned}
g(w,w)&\le C\delta f(s)\|\dot\gamma\|_h^2,\\
g(w,T)&\le-c\|\dot\gamma\|_h,\\
g(T,T)&\le-m<0
\end{aligned}
$$

とできます。第一式は $u=0$ での非正性からの滑らかな変化率の評価です。第二式は $u=0$ での厳密な負性を $c_0/2$ などへ弱めた評価です。したがって

$$
\begin{aligned}
g(\dot\gamma_\delta,\dot\gamma_\delta)
&=g(w,w)+2\delta f'g(w,T)+\delta^2(f')^2g(T,T)\\
&\le \delta f C K\|\dot\gamma\|_h
 -2c\delta f'\|\dot\gamma\|_h
 -m\delta^2(f')^2.
\end{aligned}
$$

$f'(s)=Ae^{As}\ge Af(s)$ です。$A>CK/(2c)$ を選ぶと右辺は厳密に負になります。$\dot\gamma=0$ の部分でも、最後の項が厳密に負です。また

$$
g(\dot\gamma_\delta,T)
=g(w,T)+\delta f'g(T,T)<0
$$

なので、新しい速度は未来向きです。ゆえに $\gamma_\delta$ は未来時間的です。

過去側の構成は、同じ因果曲線に対して

$$
\widehat\gamma_\delta(s)
=\Phi_{-\delta(e^{A(1-s)}-1)}(\gamma(s))
$$

と置きます。始点は $p_\delta=\Phi_{-\delta(e^A-1)}(p)\in I^-(p)$、終点は $q$ のままです。流れの微分で現れる追加項は

$$
\frac{d}{ds}\big[-\delta(e^{A(1-s)}-1)\big]T
=\delta Ae^{A(1-s)}T
$$

とやはり未来時間的です。先ほどの評価では $\delta f(s)$ を負のずれの絶対値に置き換えるだけで、$A$ を大きくして全体を未来時間的にできます。$\delta\downarrow0$ で $p_\delta\to p$、$q_\delta\to q$ です。$\square$
<!-- proof-end -->

**どこで滑らかさを使ったか。** 上の第一評価は、流れに沿った計量の変化率を一様に抑えられることに依存します。単に連続な計量へこの証明を移すと、ずれ $u$ に対する誤差が $O(u)$ とは限りません。この章のpush-upは、滑らかな計量のもとで証明された結果です。

## 4. push-up補題：因果的な区間と時間的な区間をまとめる

<a id="thm-lorg7-push-up"></a>

<!-- formal-statement-start -->
> **定理（push-up補題）**  
> 滑らかな時間向き付きLorentz多様体の点 $p,q,r$ について、次の二つが成り立つ。
>
> 1. $p\le q$ かつ $q\ll r$ ならば $p\ll r$。
> 2. $p\ll q$ かつ $q\le r$ ならば $p\ll r$。
>
> したがって、どの $p$ についても

$$
I^+(J^+(p))=I^+(p),\qquad
J^+(I^+(p))=I^+(p)
$$

> が成り立つ。過去向きにも対応する等式が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

最初の含意では $p$ から $q$ の因果曲線を少し未来へ押し、$p\ll q_\varepsilon$ とします。$q_\varepsilon$ は $q$ に近いので $q\ll r$ が保持され、時間的曲線を連結できます。二番目は $q$ から $r$ の因果曲線の始点を少し過去へ押す方法です。集合の等式では、両方の包含を量化条件に戻します。

<!-- proof-start -->
### 証明

$p\le q\ll r$ とします。[因果曲線の時間的変形](#lem-lorg7-causal-push)により $p\ll q_\varepsilon$、$q_\varepsilon\to q$ である点を取れます。[時間的関係の端点安定性](#lem-lorg7-timelike-endpoints)を $(q,r)$ に適用すると、十分小さい $\varepsilon$ で $q_\varepsilon\ll r$ です。[推移性](../LORG6/index.md#prop-lorg6-transitivity)から

$$
p\ll q_\varepsilon\ll r
\quad\Longrightarrow\quad p\ll r.
$$

$p\ll q\le r$ の場合は、$q$ から $r$ の因果曲線に[過去への変形](#lem-lorg7-causal-push)を用い、$q_\varepsilon^-\to q$、$q_\varepsilon^-\ll r$ を得ます。$(p,q)$ での端点安定性から $p\ll q_\varepsilon^-$、したがって $p\ll r$ です。

次に $z\in I^+(J^+(p))$ とすると、ある $q\in J^+(p)$ が存在し $q\ll z$、つまり $p\le q\ll z$ です。第一の含意より $p\ll z$、ゆえに左辺は $I^+(p)$ に含まれます。逆包含は $p\in J^+(p)$（[反射性](../LORG6/index.md#prop-lorg6-transitivity)）を使い、$p\ll z$ のとき中間点を $q=p$ に選べば成立します。

同様に $z\in J^+(I^+(p))$ は、ある $q$ が $p\ll q\le z$ を満たすということなので、第二の含意から $z\in I^+(p)$ です。逆包含では中間点を $q=z$ とし $z\le z$ を使います。過去向きの結果は時間向きを逆にして同じ論証で得られます。$\square$
<!-- proof-end -->

**直接の確認**。$\mathbb R^{1+1}$ の $p=(0,0)$、$q=(1,1)$、$r=(3,1)$ に対し、$p\le q$ は光的な直線で、$q\ll r$ は変位 $(2,0)$ の時間的直線で確認できます。結論 $p\ll r$ は変位 $(3,1)$ の直線の自己内積 $-9+1=-8<0$ から直接確かめられます。**曲線の単なる連結には光的な片が残る**ので、最後の時間的直線そのものではなく、全体を時間的に変形できるという点が定理の内容です。

## 5. 任意の時空で時間的未来・過去は開く

Minkowskiでの開性は[LORG6の座標計算](../LORG6/index.md#prop-lorg6-minkowski-boundary)から分かりました。しかし一般時空の $I^\pm$ は数値的不等式で表せません。時間的曲線の終端を微小に動かせる、という第2節の局所性だけで、任意の時空で開集合と分かります。

<a id="thm-lorg7-chronological-open"></a>

<!-- formal-statement-start -->
> **定理（時間的未来・過去の開性）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ の任意の点 $p$ と任意の部分集合 $S\subset M$ に対し、$I^+(p)$、$I^-(p)$、$I^+(S)$、$I^-(S)$ はいずれも $M$ の開集合である。$S=\varnothing$ の場合も含む。
<!-- formal-statement-end -->

### 証明の見取り図

点の時間的未来に属する $q$ を一つ取れば、$p\ll q$ です。端点安定性が与える $q$ の近傍の全点も $p$ から時間的に到達できます。集合については点ごとの開集合の合併に戻します。過去向きも始点側を動かせばよいわけです。

<!-- proof-start -->
### 証明

$q\in I^+(p)$ を任意に取ります。[時間的関係の端点安定性](#lem-lorg7-timelike-endpoints)を $p\ll q$ に用いると、$q$ の近傍 $V$ が存在し、$p$ を固定したまま、すべての $q'\in V$ について $p\ll q'$ です。ゆえに $V\subset I^+(p)$。どの $q$ も内点なので $I^+(p)$ は開です。

$q\in I^-(p)$ の場合は $q\ll p$ です。同じ端点安定性の $q$ 側の近傍 $U$ に対し $q'\ll p$（$q'\in U$）となるので $U\subset I^-(p)$ です。最後に[点ごとの集合の合併](../LORG6/index.md#prop-lorg6-set-unions)を使えば

$$
I^\pm(S)=\bigcup_{p\in S}I^\pm(p)
$$

であり、開集合の任意合併は開集合です。空集合は開集合です。$\square$
<!-- proof-end -->

この定理には閉時間的曲線が存在しないという仮定も不要です。時間的未来の開性は**局所的な円錐の安定性**だけで決まります。

## 6. $I^\pm$ と $J^\pm$ の内部・閉包

「$I^+$ は開集合で $J^+$ はそれを含む」というだけで「$J^+$ は $I^+$ の閉包」と結論するのは誤りです。正しくは、$J^+$ と $I^+$ は**閉包を共有**し、$J^+$ の内部は $I^+$ と一致します。ここでpush-upが効きます。

<a id="prop-lorg7-interior-closure"></a>

<!-- formal-statement-start -->
> **命題（時間的未来と因果的未来の内部・閉包）**  
> 滑らかな時間向き付きLorentz多様体の任意の点 $p$ と任意の部分集合 $S\subset M$ に対して、

$$
\operatorname{int}J^\pm(S)=I^\pm(S),
\qquad
\overline{J^\pm(S)}=\overline{I^\pm(S)}
$$

> が成り立つ。ただし一般には $J^\pm(S)=\overline{I^\pm(S)}$ とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

$J^+$ の内点 $q$ のすぐ過去に $J^+$ の点 $z$ を取り、$z\ll q$ とpush-upを使います。逆に $J^+$ の点 $q$ を少し未来へ動かせば、動かした点は $I^+$ に入ります。過去方向も同様です。集合 $S$ では、到達の起点を一つ選べばよい点に注意します。

<!-- proof-start -->
### 証明

まず $I^+(S)\subset J^+(S)$ は[定義と包含](../LORG6/index.md#prop-lorg6-transitivity)から成立し、[開性](#thm-lorg7-chronological-open)から $I^+(S)\subset\operatorname{int}J^+(S)$ です。

逆に $q\in\operatorname{int}J^+(S)$ を取ります。$q$ の開近傍 $V$ で $V\subset J^+(S)$ となるものがあります。$q$ の滑らかな未来時間的ベクトル $T_q$ を一つ取り、十分小さい $\delta>0$ に対して $z=\exp_q(-\delta T_q)$ を考えます。[放射測地線の因果型保存](../LORG5/index.md#prop-lorg5-normal-coordinate-cone)により、$\delta$ を小さくすると $z\in V$ かつ $z\ll q$ です。$z\in J^+(S)$ なので、ある $s\in S$ に対して $s\le z$。ここで[push-up補題](#thm-lorg7-push-up)を $s\le z\ll q$ に適用すると $s\ll q$、よって $q\in I^+(S)$ です。したがって内部の等式が成立します。

次に $q\in J^+(S)$ とします。ある $s\in S$ に対し $s\le q$ です。未来時間的ベクトル $T_q$ に沿って $q_\delta=\exp_q(\delta T_q)$ を取ると $q\ll q_\delta$、かつ $q_\delta\to q$ です。[push-up補題](#thm-lorg7-push-up)から $s\ll q_\delta$、従って $q_\delta\in I^+(S)$ です。よって

$$
J^+(S)\subset\overline{I^+(S)}.
$$

逆に $I^+(S)\subset J^+(S)$ だから $\overline{I^+(S)}\subset\overline{J^+(S)}$。両包含を合わせて閉包の等式です。過去向きでは未来・過去を交換して同じ議論を行います。$S=\varnothing$ は両辺とも空集合です。$\square$
<!-- proof-end -->

特に、$J^+(p)$ が閉である**追加仮定**があれば $J^+(p)=\overline{I^+(p)}$ となります。しかし閉性を仮定していない時空では、閉包に現れる極限点が実際の因果曲線で到達可能とは限りません。

## 7. 点を一つ取り除くと $J^+$ が閉でなくなる

$\mathbb R^{1+1}$ の時空図から原点を除きます。未来光的直線が原点を通る場合、その端点を結ぶ因果曲線は、欠けた点の周囲を光速以下で迂回することができません。一方、終点を少し未来へ動かせば時間的な余裕が生じ、欠けた点を避けられます。ここに、到達可能な点列の極限が到達不能になる仕組みがあります。

<a id="prop-lorg7-punctured-nonclosed"></a>

<!-- formal-statement-start -->
> **命題（点除去Minkowski時空での因果的未来の非閉性）**  
> $U=\mathbb R^{1+1}\setminus\{(0,0)\}$ に $g=-dt^2+dx^2$ を制限し、未来向きを $dt>0$ とする。$p=(-1,-1)$、$q=(1,1)$ と置けば、$q\notin J_U^+(p)$ であるが、

$$
q\in\overline{I_U^+(p)}
=\overline{J_U^+(p)}.
$$

> 従って $J_U^+(p)$ は $U$ の閉集合でない。添字 $U$ は曲線全体を $U$ 内に取ることを示す。
<!-- formal-statement-end -->

### 証明の見取り図

$p$ から $q$ への変位はちょうど光的なので、もし因果曲線があれば速度は全区間で $\dot t=\dot x$ を満たす必要があります。したがって $t-x$ が一定、曲線は除去点を通過してしまいます。一方、終点を $q_k=(1+1/k,1)$ へ動かせば直線が時間的になり、原点を避けます。

<!-- proof-start -->
### 証明

$U$ 内に未来因果的区分的 $C^1$ 曲線 $\gamma(s)=(t(s),x(s))$ が $p$ と $q$ を結ぶと仮定します。各滑らかな片で $\dot t\ge|\dot x|\ge\dot x$ です。端点差はともに $2$ なので、

$$
0=(t(1)-t(0))-(x(1)-x(0))
=\int_0^1(\dot t-\dot x)\,ds.
$$

被積分関数は非負で各片上連続です。したがって各片で $\dot t-\dot x=0$、連続な曲線上で $t(s)-x(s)$ は定数になります。始点では $t(0)-x(0)=0$、ゆえに全区間で $t(s)=x(s)$ です。$t$ は $-1$ から $1$ まで連続に変化するので、ある $s_0$ に対して $t(s_0)=0$。すると $x(s_0)=0$ で、曲線は除去点を通り矛盾します。よって $q\notin J_U^+(p)$ です。

一方、$k\ge1$ について $q_k=(1+1/k,1)$ とし、$p$ から $q_k$ への直線

$$
\sigma_k(s)=(-1+(2+1/k)s,\,-1+2s),
\qquad 0\le s\le1
$$

を取ります。その速度と自己内積は

$$
\dot\sigma_k=(2+1/k,2),\qquad
g(\dot\sigma_k,\dot\sigma_k)
=-(2+1/k)^2+4
=-4/k-1/k^2<0.
$$

速度の時間成分は正なので未来時間的です。$x(s)=0$ となるのは $s=1/2$ だけですが、そのとき $t(1/2)=1/(2k)>0$ なので原点は通りません。ゆえに曲線全体が $U$ に含まれ、$q_k\in I_U^+(p)$ です。$q_k\to q\in U$ から $q\in\overline{I_U^+(p)}$。第6節の[閉包の一致](#prop-lorg7-interior-closure)を合わせて主張を得ます。$\square$
<!-- proof-end -->

この反例で失ったのは「因果曲線の極限も時空の中に残る」という性質です。近づく曲線 $\sigma_k$ の極限は光的直線 $(-1+2s,-1+2s)$ ですが、$s=1/2$ で原点を通るため $U$ 内の曲線になりません。**開性と閉性は異なる現象**であり、前者を局所円錐から示せても後者には別の大域的条件が必要です。

## 8. 演習

ここでは定理の記号操作だけでなく、曲線の変形、端点のずらし方、閉包と実際の到達関係の違いを独立に確認します。

### Level A

<a id="ex-lorg7-a01"></a>
#### LORG7-A01 光的経路を時間的経路へ変える
- Level: A

Minkowski平面の $\gamma(s)=(2s,2s)$（$0\le s\le1$）について、$\gamma_\varepsilon(s)=((2+\varepsilon)s,2s)$ が $\varepsilon>0$ で未来時間的であることを、計量と時間成分で確認せよ。始点・終点を記せ。

<!-- solution-start -->
**詳細解答**。速度は $(2+\varepsilon,2)$ なので

$$
g(\dot\gamma_\varepsilon,\dot\gamma_\varepsilon)
=-(2+\varepsilon)^2+2^2
=-4\varepsilon-\varepsilon^2<0.
$$

時間成分は $2+\varepsilon>0$ ですから未来時間的です。始点は $(0,0)$ のまま、終点は $(2+\varepsilon,2)$ です。元の終点 $(2,2)$ より時間方向に $\varepsilon$ 進んでおり、始点を固定した未来側の[曲線変形](#lem-lorg7-causal-push)を平坦時空で具体化しています。
<!-- solution-end -->

<a id="ex-lorg7-a02"></a>
#### LORG7-A02 時間的到達の端点安定性
- Level: A

$\mathbb R^{1+1}$ で $p=(0,0)$、$q=(3,1)$ とする。$p'=(a,b)$、$q'=(3+c,1+d)$ が $|a|,|b|,|c|,|d|<1/4$ を満たすなら、$p'\ll q'$ を直線で示せ。

<!-- solution-start -->
**詳細解答**。時間差は $\Delta t=3+c-a>3-1/4-1/4=5/2$ です。空間差は $\Delta x=1+d-b$ で、三角不等式から $|\Delta x|\le1+|d|+|b|<3/2$。従って $\Delta t>|\Delta x|$ かつ $\Delta t>0$。[Minkowski時空の時間的未来公式](../LORG6/index.md#thm-lorg6-minkowski-futures)の逆向きの構成を用いれば、$p'$ と $q'$ を結ぶ直線の速度は未来時間的です。端点を両方動かせる[安定性](#lem-lorg7-timelike-endpoints)の数値確認になっています。
<!-- solution-end -->

<a id="ex-lorg7-a03"></a>
#### LORG7-A03 因果のあとに時間を足す
- Level: A

Minkowski平面で $p=(0,0)$、$q=(1,1)$、$r=(2,1)$ とする。$p\le q$ と $q\ll r$ を別々に確認し、$p\ll r$ を直接示せ。

<!-- solution-start -->
**詳細解答**。$q-p=(1,1)$ の自己内積は $-1+1=0$ で、時間成分が正なので $p\le q$ です。$r-q=(1,0)$ の自己内積は $-1<0$ で、時間成分が正なので $q\ll r$ です。[push-up補題](#thm-lorg7-push-up)から $p\ll r$。直接にも、$r-p=(2,1)$ の自己内積は $-4+1=-3<0$、時間成分 $2>0$ なので、直線で未来時間的に到達できます。
<!-- solution-end -->

<a id="ex-lorg7-a04"></a>
#### LORG7-A04 空集合と無限集合
- Level: A

時間向き付きLorentz多様体 $M$ で $S=\{p_j:j\in\mathbb N\}$ とする。$I^+(S)$ が開集合であることを示せ。$S=\varnothing$ の場合も述べよ。

<!-- solution-start -->
**詳細解答**。[集合の未来の合併](../LORG6/index.md#prop-lorg6-set-unions)より

$$
I^+(S)=\bigcup_{j=1}^{\infty}I^+(p_j).
$$

各 $I^+(p_j)$ は[時間的未来・過去の開性](#thm-lorg7-chronological-open)により開です。位相の定義から開集合は個数を問わず合併しても開なので $I^+(S)$ も開です。$S=\varnothing$ なら合併は空集合で、空集合も開です。有限集合に限定する必要はありません。
<!-- solution-end -->

<a id="ex-lorg7-a05"></a>
#### LORG7-A05 内部と閉包は違う
- Level: A

標準Minkowski平面で $p=(0,0)$、$q=(1,1)$ とする。$q$ が $I^+(p)$、$J^+(p)$、$\operatorname{int}J^+(p)$、$\overline{I^+(p)}$ のどれに属するか判定せよ。

<!-- solution-start -->
**詳細解答**。[Minkowski時空の時間的・因果的未来と過去](../LORG6/index.md#thm-lorg6-minkowski-futures)によれば、$q$ の時間差と空間差はともに $1$ です。厳密不等式 $1>1$ は偽なので $q\notin I^+(p)$、非厳密不等式 $1\ge1$ は真なので $q\in J^+(p)$。また[時間的未来と因果的未来の内部・閉包](#prop-lorg7-interior-closure)から $\operatorname{int}J^+(p)=I^+(p)$ であり $q$ は内部に入りません。同じ命題とMinkowskiでの $J^+$ の閉性から $\overline{I^+(p)}=J^+(p)$、ゆえに $q\in\overline{I^+(p)}$ です。
<!-- solution-end -->

### Level B

<a id="ex-lorg7-b01"></a>
#### LORG7-B01 push-upの集合等式を逆向きから証明する
- Level: B

$p$ を固定した滑らかな時間向き付き時空で、$J^+(I^+(p))=I^+(p)$ の両包含を、関係記号 $\ll,\le$ と中間点の選び方を明示して証明せよ。

<!-- solution-start -->
**詳細解答**。$z\in J^+(I^+(p))$ とすると、[時間的未来・過去と因果的未来・過去](../LORG6/index.md#def-lorg6-chronological-causal-future)からある $q\in I^+(p)$ が存在して $q\le z$ です。$q\in I^+(p)$ は $p\ll q$ と同値なので

$$
p\ll q\le z.
$$

[push-up補題の第二の含意](#thm-lorg7-push-up)から $p\ll z$、つまり $z\in I^+(p)$ です。逆に $z\in I^+(p)$ なら $p\ll z$。中間点を $q=z$ と選べば、[因果関係の反射性](../LORG6/index.md#prop-lorg6-transitivity)から $q\le z$ です。よって $z\in J^+(I^+(p))$。両包含が成立します。逆包含で中間点を勝手に $p$ と取ると $p\in I^+(p)$ は一般に成り立たないので、$q=z$ が重要です。
<!-- solution-end -->

<a id="ex-lorg7-b02"></a>
#### LORG7-B02 内点が時間的未来に入る理由
- Level: B

滑らかな時間向き付きLorentz多様体で、$q\in\operatorname{int}J^+(p)$ を仮定する。$q$ の直前に点 $z$ を選ぶ方法を述べ、$p\ll q$ を証明せよ。

<!-- solution-start -->
**詳細解答**。$q$ は内点なので $q$ を含む開集合 $V\subset J^+(p)$ が存在します。$q$ で未来時間的ベクトル $T_q$ を取り、十分小さい $\delta>0$ に対して

$$
z=\exp_q(-\delta T_q)
$$

とします。[放射測地線の因果型保存](../LORG5/index.md#prop-lorg5-normal-coordinate-cone)によって $z\ll q$、また $z\to q$ だから小さい $\delta$ では $z\in V$ です。$z\in J^+(p)$ は $p\le z$ と同値であり、[push-up補題](#thm-lorg7-push-up)を $p\le z\ll q$ に適用して $p\ll q$ を得ます。従って内点は $I^+(p)$ に入ります。開集合性だけでなく、内点の**過去側に因果的に到達済みの点を取った**のが核心です。
<!-- solution-end -->

<a id="ex-lorg7-b03"></a>
#### LORG7-B03 反転した因果・時間的順序
- Level: B

Minkowski平面で $p=(0,0)$、$q=(2,0)$、$r=(3,1)$ とする。$p\ll q\le r$ からpush-upを適用し、終点を固定する過去側の変形がなぜ必要かを説明せよ。さらに $p$ と $r$ を結ぶ時間的直線を求めよ。

<!-- solution-start -->
**詳細解答**。$q-p=(2,0)$ は自己内積 $-4<0$ の未来時間的変位です。$r-q=(1,1)$ は自己内積零の未来光的変位です。したがって $p\ll q\le r$ です。第二の[push-up補題](#thm-lorg7-push-up)では、$q$ から $r$ の因果区間の始点を少し過去の $q_\varepsilon^-$ に動かし、$q_\varepsilon^-\ll r$ とします。$p\ll q$ の[端点安定性](#lem-lorg7-timelike-endpoints)によって $p\ll q_\varepsilon^-$ も成り立ち、連結すれば $p\ll r$ です。直接の時間的直線は $\sigma(s)=(3s,s)$ で、速度 $(3,1)$ の自己内積は $-9+1=-8<0$、時間成分は正です。終点 $r$ を保つ構成が第一の向きとの違いです。
<!-- solution-end -->

<a id="ex-lorg7-b04"></a>
#### LORG7-B04 時間的余裕のない到達と余裕のある到達
- Level: B

$U=\mathbb R^{1+1}\setminus\{(0,0)\}$、$p=(-1,-1)$ とする。$q=(1,1)$ への因果曲線が $U$ 内に存在しないことを示し、$r=(2,1)$ へは時間的直線で到達できることを直接確かめよ。

<!-- solution-start -->
**詳細解答**。$q-p=(2,2)$ で時間差と空間差が等しいため、もし未来因果曲線 $(t(s),x(s))$ があれば $\dot t\ge|\dot x|\ge\dot x$ です。端点差より

$$
\int_0^1(\dot t-\dot x)\,ds=2-2=0.
$$

非負で各片上連続な被積分関数は各片で零なので $t-x$ は全区間で定数です。始点から定数は零です。時間座標が $-1$ から $1$ まで変わる途中で $(t,x)=(0,0)$ を通らざるをえず、$U$ 内には曲線がありません。

$r-p=(3,2)$ ですから直線 $\sigma(s)=(-1+3s,-1+2s)$ の速度は $(3,2)$ で、自己内積は $-9+4=-5<0$、時間成分は $3>0$ です。$x=0$ となる $s=1/2$ では $t=1/2\ne0$ なので除去点を通らず、$p\ll_U r$ です。光的等号では経路が強制されるのに対し、時間的な余裕があれば迂回できます。
<!-- solution-end -->

### Level C

<a id="ex-lorg7-c01"></a>
#### LORG7-C01 非閉な因果未来と開な時間的未来の整合
- Level: C

$U=\mathbb R^{1+1}\setminus\{(0,0)\}$、$p=(-1,-1)$、$q=(1,1)$ とする。

1. $q\notin J_U^+(p)$ を因果速度の積分で証明せよ。
2. $q_k=(1+1/k,1)$ の各点が $I_U^+(p)$ に属することを、直線の時間的条件と原点回避を両方確認して示せ。
3. $q$ の $I_U^+(p)$、$J_U^+(p)$、$\operatorname{int}J_U^+(p)$、$\overline{I_U^+(p)}$ への所属をすべて決定せよ。
4. $I_U^+(p)$ の開性と $J_U^+(p)$ の非閉性が矛盾しない理由を、必要な仮定と極限曲線の失敗を区別して説明せよ。

<!-- solution-start -->
**詳細解答**。まず $p$ から $q$ への因果曲線 $\gamma(s)=(t(s),x(s))$ が $U$ 内にあると仮定します。未来因果性から $\dot t\ge|\dot x|\ge\dot x$ が各滑らかな片で成立し、

$$
0=(1-(-1))-(1-(-1))
=\int_0^1(\dot t-\dot x)\,ds
$$

です。非負の積分が零だから各片で $\dot t=\dot x$、全曲線で $t-x=0$。連続性から時刻 $t=0$ の点を必ず通り、そのとき $x=0$ なので原点を通ってしまいます。したがって $q\notin J_U^+(p)$ です。

次に $q_k$ への直線は

$$
\sigma_k(s)=(-1+(2+1/k)s,-1+2s).
$$

速度 $(2+1/k,2)$ の自己内積は $-4/k-1/k^2<0$、時間成分は正なので未来時間的です。空間座標が零になるのは $s=1/2$ で、この時刻の時間座標は $1/(2k)\ne0$。よって $\sigma_k$ は $U$ の中にあり、$q_k\in I_U^+(p)$ です。

$q_k\to q$ なので $q\in\overline{I_U^+(p)}$ です。一方 $q\notin J_U^+(p)$ であり、$I_U^+(p)\subset J_U^+(p)$ から $q\notin I_U^+(p)$ でもあります。また[内部と時間的未来の一致](#prop-lorg7-interior-closure)より

$$
\operatorname{int}J_U^+(p)=I_U^+(p),
$$

したがって $q$ はその内部にも入りません。以上で四集合への所属が決まります。

最後に、[時間的未来の開性](#thm-lorg7-chronological-open)は各時間的曲線の末端を局所的に動かせることから従い、時空全体で曲線列の極限が残ることを要求しません。他方 $J_U^+(p)$ の閉性には、到達可能な $q_k$ が極限 $q$ に近づいたときも $U$ 内の因果曲線で到達できる必要があります。$\sigma_k$ は平坦な全時空では光的直線 $\sigma(s)=(-1+2s,-1+2s)$ に収束しますが、$\sigma(1/2)=(0,0)\notin U$ です。したがって閉性に必要な極限曲線が $U$ から脱落します。二つの性質は論理的に矛盾しません。
<!-- solution-end -->

## 9. この先の因果階層への入口

[push-up補題](#thm-lorg7-push-up)によって、途中に光的な区間があっても時間的な余裕が残れば全体を時間的にできます。[開性](#thm-lorg7-chronological-open)と[内部・閉包の一致](#prop-lorg7-interior-closure)は、以後の因果階層を比較する基本道具です。しかし[点除去時空の反例](#prop-lorg7-punctured-nonclosed)が示す通り、因果未来そのものは一般に閉じません。

次のLORG8では、同じ因果関係が共形再尺度で保たれることと、因果曲線が局所的にどの近傍へ閉じ込められるかを扱います。ここで得た局所変形と大域的な閉性の区別が、そのための出発点です。
