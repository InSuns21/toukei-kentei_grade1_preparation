# LORG10 因果階層 II：strongとstable

<!-- definition-example-audit: strict -->

## 1. 閉路がないのに、なぜ局所の因果構造は壊れるのか

[LORG9のcausal時空](../LORG9/index.md#def-lorg9-causal)では、非定数の閉未来因果曲線を排除しました。それでも、一点を除いた円筒では異なる点の時間的未来が一致しました。曲線が実際に閉じなくても、**小さな近傍を出て長く回り込み、ほぼ同じ場所へ戻る**ことは起こり得るのです。

今回は、この再侵入を近傍ごとに排除する条件を定義します。さらに、光円錐を少し広げても閉因果曲線が発生しない条件を調べます。後者は「時空全体に通用する時計」が存在するか、という問題と結び付きます。滑らかな時計の勾配を使えば、光円錐を広げたときにも時間が必ず増えることを計算で証明できます。

以下 $(M,g)$ は滑らかな連結・Hausdorff・第二可算・境界なしの時間向き付きLorentz多様体、次元 $n+1$（$n\ge1$）、符号 $(-,+,\ldots,+)$ とします。曲線は[LORG3の未来向き区分的 $C^1$ 因果曲線](../LORG3/index.md#def-lorg3-causal-curve)で、停留片を許します。$I^\pm,J^\pm$ は[LORG6の定義](../LORG6/index.md#def-lorg6-chronological-causal-future)に従います。

## 2. 強因果性：一度出た近傍に戻れない

開集合 $V\subset M$ が**因果的凸**とは、両端点が $V$ にある任意の未来因果曲線が、途中でもずっと $V$ にあることです。[LORG8の因果的凸性](../LORG8/index.md#def-lorg8-causal-convex)は、曲線を $V$ 内に限定する「相対的」主張と、時空 $M$ 全体の曲線に対する主張を区別しました。ここでは後者を使います。

ある点 $p$ の周りで、望むほど小さい *大域的に因果的凸な* 開集合を選べるなら、$p$ のそばから出発して外側を回り込み、再びその集合に入る曲線を防げます。

<a id="def-lorg10-strong-causality"></a>

<!-- formal-statement-start -->
> **定義（強因果性）**  
> 時間向き付きLorentz多様体 $(M,g)$ が点 $p$ で**強因果的**であるとは、任意の $p$ の開近傍 $O$ に対し、$p\in V\subset O$ を満たし、$M$ の任意の未来因果曲線について因果的凸である開集合 $V$ が存在することをいう。すべての点でこの条件を満たすとき、$(M,g)$ は**強因果的時空（strongly causal spacetime）**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg10-strong-causality -->

**定義の確認**（Minkowski時空）。$g=-dt^2+d\mathbf x^2$、$p=(t_0,\mathbf x_0)$ とします。$a=(t_0-\varepsilon,\mathbf x_0)$、$b=(t_0+\varepsilon,\mathbf x_0)$ の[Alexandrovダイヤモンド](../LORG8/index.md#def-lorg8-alexandrov-diamond)は

$$
D_M(a,b)=\{(t,\mathbf x):|t-t_0|+|\mathbf x-\mathbf x_0|<\varepsilon\}.
$$

これは $p$ を含み、[ダイヤモンドの開性・大域的因果的凸性](../LORG8/index.md#thm-lorg8-diamond-convex)を満たします。任意の $O\ni p$ は小さなEuclid球を含むため、$\varepsilon$ を十分小さくすれば $D_M(a,b)\subset O$ です。ゆえにMinkowski時空はすべての点で強因果的です。単に局所座標で錐を描いたのでなく、**$M$ の曲線に対する凸性**を確認した点が重要です。

<!-- definition-example-end -->

局所的なダイヤモンドが必ず存在することは[LORG8の局所補題](../LORG8/index.md#lem-lorg8-local-diamonds)で確かめました。ただし、それらは当初、局所時空 $N$ の曲線についてだけ凸でした。強因果性は、この不足を埋める条件です。

## 3. Alexandrov近傍と強因果性の同値

[LORG8のAlexandrovダイヤモンド](../LORG8/index.md#def-lorg8-alexandrov-diamond)を、時空全体で端点を選び直しながら作ります。そのような開集合の合併によって得る「到達関係由来の位相」を、元の多様体位相と比較します。

<a id="def-lorg10-alexandrov-topology"></a>

<!-- formal-statement-start -->
> **定義（Alexandrov位相）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ において、大域的ダイヤモンド $D_M(a,b)=I_M^+(a)\cap I_M^-(b)$（$a,b\in M$）の任意の合併全体で定まる位相を **Alexandrov位相** という。空の合併を空集合とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg10-alexandrov-topology -->

**定義の確認**。Minkowski時空で $a=(t_0-\varepsilon,\mathbf x_0)$、$b=(t_0+\varepsilon,\mathbf x_0)$ とすると、前節で計算した $D_M(a,b)$ は $p=(t_0,\mathbf x_0)$ を含みます。しかも任意の多様体開近傍 $O\ni p$ に対して $\varepsilon>0$ を十分小さく取れば $D_M(a,b)\subset O$ です。ダイヤモンドは元の位相で開だから、ここでは二つの位相が一致します。

<!-- definition-example-end -->

なぜこれらの合併だけで位相になるかも確かめます。任意の二つのダイヤモンド $D_M(a,b)$、$D_M(c,d)$ の共通部分に $p$ があれば、$a,c\ll p\ll b,d$ です。

[時間的到達関係の端点安定性](../LORG7/index.md#lem-lorg7-timelike-endpoints)により $p$ のごく近くに $r\ll p\ll s$ を選んで $a,c\ll r$、$s\ll b,d$ とできます。

すると $p\in D_M(r,s)$ で、[時間的関係の推移性](../LORG6/index.md#prop-lorg6-transitivity)から $D_M(r,s)\subset D_M(a,b)\cap D_M(c,d)$ です。よって二つのダイヤモンドの交わりはダイヤモンドの合併で表せます。

任意の合併と有限交差で閉じ、全体 $M$ も各点を含む小ダイヤモンドの合併なので、これは位相です。

各ダイヤモンドは開かつ因果的凸なので、それらが多様体の任意の小さい近傍に収まれば、強因果性を具体的に確認できます。逆向きも成り立ちます。

<a id="thm-lorg10-alexandrov-basis"></a>

<!-- formal-statement-start -->
> **定理（強因果性とAlexandrov近傍基底）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ について、次は同値である。
>
> 1. $(M,g)$ は強因果的である。
> 2. どの $p\in M$ と開近傍 $O\ni p$ に対しても、$a,b\in M$ を適当に選んで

$$
p\in D_M(a,b)=I_M^+(a)\cap I_M^-(b)\subset O
$$

> とできる。すなわち大域的Alexandrov位相は多様体位相と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

条件2のダイヤモンドは既に因果的凸なので、条件1に必要な $V$ として使えます。逆は強因果性で得た因果的凸集合 $V$ の中に $a\ll p\ll b$ を選び、$a$ から $b$ へ向かう**どんな曲線も** $V$ から出ないことを使います。

<!-- proof-start -->
### 証明

2を仮定し、任意の $p\in O$ を取ります。$D_M(a,b)$ は[LORG8の定理](../LORG8/index.md#thm-lorg8-diamond-convex)で $M$ に関して開かつ因果的凸です。$V=D_M(a,b)$ とすれば $p\in V\subset O$ ですから、強因果性を得ます。

次に1を仮定します。任意の開集合 $O\ni p$ に対し、定義から $p\in V\subset O$ で $M$-因果的凸な開集合 $V$ を取れます。$p$ での未来時間的ベクトルを局所時間的ベクトル場へ延長し、その積分曲線の短い前後の点を選べば、$a,b\in V$ で $a\ll p\ll b$ が成り立ちます。従って $p\in D_M(a,b)$ です。

任意の $z\in D_M(a,b)$ について $a\ll z\ll b$ ですから、$a$ から $z$ を通り $b$ へ至る未来時間的な区分的 $C^1$ 曲線を結べます。その両端 $a,b$ は $V$ に属するので、$V$ の **$M$-因果的凸性**から $z\in V$ です。つまり

$$
p\in D_M(a,b)\subset V\subset O.
$$

ダイヤモンドはもともと開なので、任意の開近傍を細分する開近傍基底になります。$\square$
<!-- proof-end -->

<a id="prop-lorg10-strong-implies-causal"></a>

<!-- formal-statement-start -->
> **命題（強因果的時空はcausal）**  
> 強因果的な時間向き付きLorentz多様体には非定数の閉未来因果曲線が存在しない。従って[LORG9のcausality](../LORG9/index.md#def-lorg9-causal)を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

閉曲線があれば、その曲線上の一点を含みながら曲線全体は含まない小さい開集合を取れます。強因果性で縮めた因果的凸近傍に、閉曲線の出発点と終点を置けば矛盾します。

<!-- proof-start -->
### 証明

非定数の閉未来因果曲線 $\gamma:[0,1]\to M$ があると仮定します。$p=\gamma(0)=\gamma(1)$ とし、非定数なのである $s_0\in(0,1)$ で $q=\gamma(s_0)\ne p$ です。Hausdorff性から $q$ を含まない $p$ の開近傍 $O$ を選びます。強因果性により $p\in V\subset O$ で因果的凸な $V$ があります。しかし $\gamma$ の両端点は $p\in V$、途中点 $q$ は $V$ の外です。これは因果的凸性に反します。よって閉未来因果曲線はなく、causalです。$\square$
<!-- proof-end -->

## 4. 強因果性は未来・過去の識別も保証する

閉路だけの排除より強い理由は、$p$ に向かって戻る**開いた**曲線も阻止するからです。ここで[LORG9の未来・過去識別性](../LORG9/index.md#def-lorg9-distinguishing)との関係を確かめます。

<a id="thm-lorg10-strong-implies-distinguishing"></a>

<!-- formal-statement-start -->
> **定理（強因果性から未来・過去識別性へ）**  
> 滑らかな時間向き付きLorentz多様体が強因果的なら、異なる $p,q\in M$ について $I^+(p)\ne I^+(q)$ かつ $I^-(p)\ne I^-(q)$ である。従って強因果的時空はdistinguishingである。
<!-- formal-statement-end -->

### 証明の見取り図

同じ未来を持つ二点を仮定し、$p$ の十分小さな因果的凸近傍 $V$ を $q$ と離します。$q$ から $p$ 直後の点へ至る時間的曲線が $V$ の境界から進入するとき、境界近くの点は仮定により $p$ からも到達可能です。局所的な未来錐の速度上限により、$p$ から境界までの正の時間と、境界から $p$ 直後までの時間が両立しなくなります。

<!-- proof-start -->
### 証明

未来側を示します。$p\ne q$ で $I^+(p)=I^+(q)$ と仮定します。$p$ を含み $q$ を含まない座標領域 $W$ を取り、[LORG8の局所錐速度評価](../LORG8/index.md#lem-lorg8-local-diamonds)と同様に、$W$ を縮めて局所座標 $(t,\mathbf x)$、$p=(0,\mathbf0)$ を選びます。$W$ 内の非零未来因果速度は

$$
\dot t>0,\qquad |\dot{\mathbf x}|\le C\dot t
$$

を満たします。強因果性より $p\in V$ で、閉包が $W$ 内に含まれ、かつ $M$-因果的凸な開集合 $V$ を取れます。

$p$ から $V$ の境界までは座標Euclid距離で正の距離 $d>0$ があります。もし $p$ から $x\in V$ への未来時間的曲線が $V$ 内を進み、$x$ が境界に近づくなら、座標速度評価を積分して

$$
|\mathbf x_x|\le Ct(x),\qquad
\sqrt{t(x)^2+|\mathbf x_x|^2}\le\sqrt{1+C^2}\,t(x)
$$

を得ます。従ってそのような $x$ では $t(x)$ は最終的に $d/\sqrt{1+C^2}$ 以上です。

$p\ll r_k$ で $r_k\in V$、$r_k\to p$ となる点列を、$p$ を通る短い未来時間的積分曲線上に取ります。未来集合の一致から $q\ll r_k$ なので、$q$ から $r_k$ への未来時間的曲線 $\gamma_k$ が存在します。$q\notin\overline V$ となるよう $V$ を選んでおき、$\gamma_k$ が最後に $\partial V$ を通った後の $V$ 内の点 $x_k$ を境界に十分近く取ります。この曲線の後半より $x_k\ll r_k$、また前半より $q\ll x_k$ です。後者と $I^+(q)=I^+(p)$ から $p\ll x_k$ です。

$p,x_k\in V$ なので、$p$ から $x_k$ への曲線は $V$ の因果的凸性によりすべて $V$ に含まれます。前述の評価により、$x_k$ を境界に近づける選択のもとで

$$
t(x_k)\ge\frac{d}{2\sqrt{1+C^2}}>0
$$

です。一方、$x_k\ll r_k$ の曲線も両端が $V$ にあるため $V$ に収まり、$\dot t>0$ より $t(x_k)<t(r_k)$ です。$t(r_k)\to0$ なので、十分大きい $k$ では矛盾します。よって未来識別的です。

過去側は時間向きを逆転し、$I^-$ と未来時間的曲線を逆向きに読み替える同じ議論により従います。$\square$
<!-- proof-end -->

## 5. 閉曲線がなくても強因果性が失敗する具体例

[LORG9の一点除去円筒](../LORG9/index.md#prop-lorg9-punctured-causal-nondistinguishing)をもう一度使いましょう。$C^\ast=((-1,1)\times\mathbb R/\mathbb Z)\setminus\{(0,[0])\}$、計量は

$$
g=-2\,du\,d\theta+u^2d\theta^2,\qquad T=\partial_u+\partial_\theta
$$

です。この時空はcausalでした。ところが $p=(0,[1/4])$ の周りでは、限りなく小さい正の $u$ 増分を使って角度を一周できます。

<a id="prop-lorg10-punctured-not-strong"></a>

<!-- formal-statement-start -->
> **命題（一点除去円筒はcausalだが強因果的でない）**  
> 上の $(C^\ast,g,T)$ はcausalであるが、$p=(0,[1/4])$ で強因果的でない。
<!-- formal-statement-end -->

### 証明の見取り図

$u=-\varepsilon$ から $u=\varepsilon$ まで、角度を一周進める曲線を明示します。速度の二次形式は、$\varepsilon\downarrow0$ でも未来時間的となります。両端は $p$ に近づく一方、中途では $p$ から離れた角度を通ります。

<!-- proof-start -->
### 証明

causalityは[LORG9の既証命題](../LORG9/index.md#prop-lorg9-punctured-causal-nondistinguishing)から従います。$0<\varepsilon<1/2$ に対し $-\varepsilon\le u\le\varepsilon$ で

$$
\gamma_\varepsilon(u)=
\left(u,\left[\frac14+\frac{u+\varepsilon}{2\varepsilon}\right]\right)
$$

とします。始点は $(-\varepsilon,[1/4])$、終点は $(\varepsilon,[1/4])$ で、いずれも $p$ に収束します。速度は $v=\partial_u+b\partial_\theta$、$b=1/(2\varepsilon)>0$ です。$|u|\le\varepsilon$ において

$$
g(v,v)=b(-2+u^2b),\qquad
0\le u^2b\le\frac{\varepsilon}{2}<2
$$

なので時間的です。さらに

$$
g(v,T)=-1+(u^2-1)b<0
$$

で未来向きです。$u=0$ となるのは中点のみで、そのとき角度は $[3/4]$ ですから、除去点 $(0,[0])$ を通りません。

一方、$\gamma_\varepsilon(0)=(0,[3/4])$ は $p$ から離れた固定点です。例えば $p$ の開近傍 $O$ をこの点が入らないように選べます。どんな $p$ の開近傍 $V\subset O$ でも、$\varepsilon$ を十分小さくすれば $\gamma_\varepsilon$ の両端が $V$ に入りますが、中点は $O$ の外です。よって $V$ は $M$-因果的凸ではなく、強因果性は $p$ で失敗します。$\square$
<!-- proof-end -->

causal条件だけでは**実際に閉じた曲線**しか禁止できません。ここでは毎回 $\Delta u=2\varepsilon>0$ なので閉曲線ではないのに、$\varepsilon$ を小さくすれば近接両端点の間で任意に大きく回り込めます。因果的凸性が破れる原因はここにあります。

## 6. 安定因果性：光円錐を広げても因果条件が残る

閉路を消したまま計量を少し変えられるでしょうか。各点の光円錐が広がれば、それまで空間的だった方向が因果的になる場合があります。そこで、元の未来因果ベクトルすべてを**新しい計量では未来時間的**にする広がりを考えます。

二つの同じ時間向きのLorentz計量について $g\prec\widehat g$ を「各点の非零未来 $g$-因果ベクトルがすべて未来 $\widehat g$-時間的である」と表します。これは単なる共形変換とは違い、光円錐の**境界そのものを外側へ**動かす条件です。

<a id="def-lorg10-stable-causality"></a>

<!-- formal-statement-start -->
> **定義（安定因果性）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ が**安定因果的（stably causal）**であるとは、$M$ 上の滑らかな時間向き付きLorentz計量 $\widehat g$ が存在して、$g\prec\widehat g$ であり、かつ $(M,\widehat g)$ が[LORG9の意味でcausal](../LORG9/index.md#def-lorg9-causal)であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg10-stable-causality -->

**定義の確認**（Minkowski時空）。$g=-dt^2+d\mathbf x^2$ に対し $\widehat g=-2dt^2+d\mathbf x^2$ とします。$g$-因果な非零の未来ベクトル $v=(a,\mathbf b)$ は $a\ge|\mathbf b|$、$a>0$ です。よって

$$
\widehat g(v,v)=-2a^2+|\mathbf b|^2\le-a^2<0
$$

で、$\widehat g$ でも未来向き（$a>0$）です。また $\widehat g$-未来因果速度では $a\ge|\mathbf b|/\sqrt2$ かつ $a>0$ なので、任意の非定数曲線に沿って $t$ は増え、閉未来因果曲線はありません。従って $\widehat g$ はcausalで、Minkowski時空は安定因果的です。符号数 $(1,n)$ も各対角成分から直接確認できます。

<!-- definition-example-end -->

## 7. 時間関数とtemporal function：連続と滑らかを区別する

因果曲線に沿って厳密に増える実数値の「時計」があれば、出発点と同じ時刻へ戻る閉路は不可能です。ただし単に微分可能な関数が増加するだけでは、勾配が光的・零となる点を排除できません。次の二段階を区別します。

<a id="def-lorg10-time-function"></a>

<!-- formal-statement-start -->
> **定義（時間関数とtemporal function）**  
> 時間向き付きLorentz多様体 $(M,g)$ の**時間関数（time function）**とは、連続写像 $\tau:M\to\mathbb R$ であって、相異なる $p,q$ の間に未来因果曲線があるとき、必ず $\tau(p)<\tau(q)$ となるものをいう。
>
> **temporal function（時間的勾配を持つ滑らかな時間関数）**とは、滑らかな関数 $\tau:M\to\mathbb R$ で、その勾配 $\nabla^g\tau$（$g(\nabla^g\tau,v)=d\tau(v)$ で定める）が各点で過去向き時間的であるものをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg10-time-function -->

**定義の確認**。Minkowski時空で $\tau(t,\mathbf x)=t$ とします。未来因果速度 $v=(a,\mathbf b)\ne0$ は $a>0$ なので、未来因果曲線の非定数区間に沿って

$$
\tau(\gamma(b))-\tau(\gamma(a))
=\int_a^b\dot t(s)\,ds>0.
$$

さらに勾配を定義から計算します。任意の接ベクトル $v=a\partial_t+\sum_{i=1}^{n}b_i\partial_{x^i}$ に対し、計量の時間・空間成分を代入すると

$$
g(-\partial_t,v)=a=d\tau(v).
$$

したがって、すべての $v$ で $g(\nabla^g\tau,v)=d\tau(v)$ を満たす勾配は $\nabla^g\tau=-\partial_t$ です。その自己内積は $g(\nabla^g\tau,\nabla^g\tau)=-1<0$ です。$-\partial_t$ は過去向きなのでtemporal functionの条件も満たします。**時間関数は連続性だけが必要**であり、temporal functionの方が強い正則性と勾配条件を要求します。

<!-- definition-example-end -->

<a id="lem-lorg10-temporal-monotone"></a>

<!-- formal-statement-start -->
> **補題（temporal functionの厳密単調性）**  
> $\tau$ が滑らかな時間向き付き時空 $(M,g)$ のtemporal functionなら、任意の非零未来因果接ベクトル $v$ で $d\tau(v)>0$ である。従って $\tau$ は時間関数であり、$(M,g)$ はcausalである。
<!-- formal-statement-end -->

### 証明の見取り図

時間勾配が過去時間的であれば、未来因果ベクトルとのLorentz内積は厳密に正です。曲線に沿った導関数はこの内積なので、停留片を除いて正となります。

<!-- proof-start -->
### 証明

$U=-\nabla^g\tau$ は未来時間的です。$v$ を非零未来因果ベクトルとすると、[未来錐の内積の符号](../LORG1/index.md#thm-lorg1-reverse-cauchy-schwarz)により $g(U,v)<0$ です。よって

$$
d\tau(v)=g(\nabla^g\tau,v)=-g(U,v)>0.
$$

区分的 $C^1$ 未来因果曲線 $\gamma:[a,b]\to M$ について、連鎖律から $(\tau\circ\gamma)'=d\tau(\dot\gamma)\ge0$ です。端点が異なるなら曲線は非定数で、どこかの滑らかな片の開区間では $\dot\gamma\ne0$ なので、その区間で導関数は厳密に正です。積分すると $\tau(\gamma(b))>\tau(\gamma(a))$ です。閉因果曲線なら端点の $\tau$ 値が等しくなり矛盾するため、causalです。$\square$
<!-- proof-end -->

## 8. 滑らかな時計から安定因果性を構成する

temporal functionがあると、時間に直交する空間方向で $g$ が正定値です。この分解によって計量の時間成分をもっと負にすれば、元の未来錐を**厳密に**広げられます。

<a id="thm-lorg10-temporal-implies-stable"></a>

<!-- formal-statement-start -->
> **定理（temporal functionの存在は安定因果性を保証する）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ にtemporal function $\tau$ が存在すれば、$(M,g)$ は安定因果的である。具体的に任意の滑らかな関数 $\varepsilon:M\to(0,\infty)$ に対し、
>
$$
\widehat g=g-\varepsilon\,d\tau\otimes d\tau
$$
>
> は $g\prec\widehat g$ となるLorentz計量であり、$\tau$ は $\widehat g$ のtemporal functionでもある。
<!-- formal-statement-end -->

### 証明の見取り図

$T$ を $d\tau(T)=1$ の未来時間的ベクトル場として選び、$v=aT+w$（$d\tau(w)=0$）と分解します。$g$ は時間方向に負、$w$ 方向に正であり、$\widehat g$ は時間方向をさらに負にするだけです。$g$-因果ベクトルは $\widehat g$-時間的になり、$\tau$ は $\widehat g$-因果曲線でも単調です。

<!-- proof-start -->
### 証明

$A=-g(\nabla^g\tau,\nabla^g\tau)>0$ と置き、$T=-\nabla^g\tau/A$ とすると、$T$ は未来時間的で

$$
d\tau(T)=g(\nabla^g\tau,-\nabla^g\tau/A)=1,\qquad
g(T,T)=-1/A.
$$

各接ベクトル $v$ について $a=d\tau(v)$、$w=v-aT$ とすれば $d\tau(w)=a-a=0$ です。従って $g(T,w)=-d\tau(w)/A=0$ となり、

$$
g(v,v)=-\frac{a^2}{A}+g(w,w),\qquad
\widehat g(v,v)=-\left(\frac1A+\varepsilon\right)a^2+g(w,w).
$$

$T$ の直交補空間 $\ker d\tau$ 上では、[Lorentz内積の正定値直交補空間](../LORG1/index.md#lem-lorg1-timelike-orthogonal)により $g(w,w)>0$（$w\ne0$）です。従って $\widehat g$ は負方向1本と正方向 $n$ 本を持つ滑らかな非退化Lorentz計量です。

$g$-因果な非零 $v$ に $a=0$ を仮定すると、$g(v,v)=g(w,w)>0$ となって矛盾するので $a\ne0$。未来なら $a>0$ は[単調性の補題](#lem-lorg10-temporal-monotone)で分かります。従って

$$
\widehat g(v,v)=g(v,v)-\varepsilon a^2<0
$$

となり、同じ未来錐の向きで $g\prec\widehat g$ です。

今度は非零の $\widehat g$-因果ベクトルについて、上式と $g(w,w)>0$ からやはり $a\ne0$ です。

$T$ は $\widehat g(T,T)<0$ を満たし、$\widehat g(T,v)=-(1/A+\varepsilon)a$ より、未来向きの枝は $a>0$ です。従ってすべての未来 $\widehat g$-因果ベクトルについて $d\tau(v)>0$。

さらに $\widehat g(T,T)=-(A^{-1}+\varepsilon)$、$\widehat g(T,w)=0$ です。任意の $v=aT+w$ に対して

$$
\widehat g\left(-\frac{T}{A^{-1}+\varepsilon},v\right)
=a=d\tau(v)
$$

なので、勾配の定義と計量の非退化性から $\nabla^{\widehat g}\tau=-T/(A^{-1}+\varepsilon)$ と分かり、このベクトルは過去時間的です。従って $\tau$ の勾配は $\widehat g$ に関しても過去時間的となり、[単調性の補題](#lem-lorg10-temporal-monotone)を $\widehat g$ へ適用して $(M,\widehat g)$ はcausalです。安定因果性の定義が満たされます。 $\square$
<!-- proof-end -->

## 9. 滑らかな時間関数があれば強因果的になる

「時間が増える」だけでなく、**局所の空間速度を時間の増分で抑えられる**ことが強因果性を証明する鍵です。temporal functionの勾配は時間的なので、前節の $T$ の積分曲線を使い、各点の周囲で $\tau$ 自身を時間座標とする $(\tau,\mathbf x)$ を取れます。

<a id="thm-lorg10-temporal-implies-strong"></a>

<!-- formal-statement-start -->
> **定理（temporal functionがあれば強因果的）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ にtemporal functionが存在すれば、$(M,g)$ は強因果的である。
<!-- formal-statement-end -->

### 証明の見取り図

局所座標 $(\tau,\mathbf x)$ の未来錐は $\tau$ 方向に傾いているので、コンパクトな小領域で一様に $|d\mathbf x/d\tau|\le C$ となります。短い $\tau$ の間には座標球の外まで行けません。これにより、**$M$ の外側を回る曲線も含めて**、短い時間幅のダイヤモンドが小領域に閉じ込められます。

<!-- proof-start -->
### 証明

任意の $p$ と開近傍 $O\ni p$ を取ります。前節の $T$ は未来時間的で $d\tau(T)=1$ ですから、$T$ の局所流れに沿う座標 $(s,\mathbf x)$ を $p=(0,\mathbf0)$、$s=\tau-\tau(p)$、$T=\partial_s$ となるよう作れます。点 $p$ の光円錐と、$ds$ が非零未来因果ベクトルで正となること、計量の連続性から、十分小さな座標域 $W\Subset O$ に一様定数 $C>0$ が存在して

$$
\dot s>0,\qquad |\dot{\mathbf x}|\le C\dot s
$$

がすべての非零未来因果速度について成立します。これは[LORG8の速度評価](../LORG8/index.md#lem-lorg8-local-diamonds)と同じ単位ベクトルコンパクト性の議論で、$ds$ を局所時間座標に替えたものです。

$W$ に閉包の含まれる小座標箱 $B=\{|s|<h,\ |\mathbf x|<R\}$ を選び、$\delta=\min(h/2,R/(2C))>0$ とします。$0<\eta<\delta/2$ で $a=(-\eta,\mathbf0)$、$b=(\eta,\mathbf0)$ を取ります。$\partial_s=T$ は未来時間的なので $a\ll p\ll b$ です。

もし $z\in D_M(a,b)$ が $B$ の外にあれば、$a\ll z\ll b$ をつないだ未来時間的曲線は $a$ を出て $B$ の境界に初めて達します。その最初の到達点を $y$ とすると、$a$ から $y$ までは $B\subset W$ を走るので速度評価を積分でき、

$$
s(y)+\eta>0,\qquad
|\mathbf x_y|\le C(s(y)+\eta)
$$

です。$y$ が時間境界 $s=h$ にあれば $s(y)+\eta=h+\eta>2\delta$、空間境界 $|\mathbf x|=R$ にあれば $s(y)+\eta\ge R/C\ge2\delta$ です。負の時間境界 $s=-h$ には未来曲線で達しません。従っていずれも $s(y)+\eta\ge2\delta$ です。座標としての $s$ は $W$ 内だけで使いましたが、実数値関数 $s(z)=\tau(z)-\tau(p)$ は $M$ 全体で定義されています。[temporal functionの単調性](#lem-lorg10-temporal-monotone)を曲線全体へ適用すると、終点 $b$ では $s(b)=\eta$ だから

$$
s(y)+\eta\le s(b)+\eta=2\eta<\delta
$$

となって矛盾します。ゆえに $D_M(a,b)\subset B\subset O$ です。[Alexandrov近傍基底との同値](#thm-lorg10-alexandrov-basis)から強因果的です。$\square$
<!-- proof-end -->

## 10. 安定因果性と時間関数の完全な関係

一般の**連続**時間関数から滑らかな時間的勾配を持つ関数を作ることや、光円錐の拡大だけから大域的な時計を構成することは非自明です。連続関数を単に微分したり、局所座標の時刻を貼り合わせたりするだけでは成立しません。

<a id="thm-lorg10-stable-time-equivalence"></a>

<!-- formal-statement-start -->
> **定理（Hawking–Bernal–Sánchezの時間関数による安定因果性の特徴付け）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ について、次は同値である。
>
> 1. $(M,g)$ は安定因果的である。
> 2. $(M,g)$ に連続な時間関数が存在する。
> 3. $(M,g)$ に滑らかなtemporal functionが存在する。
>
> これらの条件が成り立つとき、$(M,g)$ は強因果的である。
<!-- formal-statement-end -->

ここまでで、**3→1** は[計量の明示構成](#thm-lorg10-temporal-implies-stable)、**3→2** は[単調性の補題](#lem-lorg10-temporal-monotone)、**3→強因果性**は[局所速度評価](#thm-lorg10-temporal-implies-strong)によって証明しました。未証明の **1→2** はHawkingの時間関数構成を要し、**2→3** は時間関数の滑らか化定理を要します。両者はこの講の前提だけでは閉じない高度な大域定理であるため、ここでは**外部定理を正確な仮定で掲げ、核心証明の代用とはしません**。一般の場合に単に「安定だから滑らかな時間関数がある」と書いてこの二方向を証明したことにはしません。

Hawkingの構成では、計量の拡大を連続的に取り替えた族 $g_a$ と、全体で有限な正の測度 $\mu$ を使い、過去集合の体積 $\mu(I_{g_a}^-(p))$ をパラメータ $a$ で平均します。未来因果曲線に沿った厳密増加を、単一の体積関数が持たない不連続性を平均で抑えながら得ます。滑らか化の段階では時間的勾配という**勾配が時間的であるという厳密不等式**を保ったまま局所関数を調整する必要があります。どちらも局所の単なる貼り合わせでは済みません。

一般定理の根拠と証明範囲の確認先：
- E. Minguzzi, [Lorentzian causality theory](https://link.springer.com/article/10.1007/s41114-019-0019-x), 安定因果性と時間関数の特徴付け。
- M. Sánchez, [Elements of the theory of causality, Theorem 3.59](https://gigda.ugr.es/sanchezm/pdf/B_Libro%20Apuntes%20Lorentz.pdf), 三条件の同値と光円錐の拡大による定義。

ここで扱ったのは**時間関数の存在**であり、「すべての非延長因果曲線がその各レベル集合を一度通る」というCauchy条件ではありません。この違いはLORG15・LORG19で改めて扱います。

<a id="thm-lorg10-causal-ladder"></a>

<!-- formal-statement-start -->
> **定理（因果階層：strong / stableの位置）**  
> 滑らかな時間向き付きLorentz多様体において
>
$$
\text{stably causal}\ \Longrightarrow\
\text{strongly causal}\ \Longrightarrow\
\text{distinguishing}\ \Longrightarrow\
\text{causal}\ \Longrightarrow\
\text{chronological}.
$$
>
> 最初の含意は上の時間関数特徴付け定理を使う。後続の含意は本章およびLORG9の定理による。一般には逆向き含意を追加できない。
<!-- formal-statement-end -->

最初の矢印は[特徴付け定理](#thm-lorg10-stable-time-equivalence)と[temporal functionから強因果性への定理](#thm-lorg10-temporal-implies-strong)を結びます。二つ目は[本章の識別性定理](#thm-lorg10-strong-implies-distinguishing)、その先は[LORG9の因果階層](../LORG9/index.md#thm-lorg9-hierarchy)です。[一点除去円筒](#prop-lorg10-punctured-not-strong)は「causalなら強因果的」の誤りを実際に示します。強因果性から安定因果性への逆含意も一般には偽ですが、そのための別の大域反例を点除去円筒だけから結論してはいけません。

[LORG8の共形不変性](../LORG8/index.md#thm-lorg8-conformal-causality)から、強因果性は因果曲線の集合が変わらないため共形不変です。安定因果性も同値な時間関数の存在で判定でき、共形再尺度によって変わりません。ただし「共形再尺度」と「光円錐の拡大」を混同しないでください。

## 11. 演習：局所の再侵入と錐の拡大を検算する

### Level A

<a id="ex-lorg10-a01"></a>
#### LORG10-A01 Minkowskiの小ダイヤモンド
- Level: A

$\mathbb R^{1+1}$ で $p=(3,2)$、$a=(3-\varepsilon,2)$、$b=(3+\varepsilon,2)$（$\varepsilon>0$）とする。$D_M(a,b)$ を不等式で求め、$p$ が内部にあることと、$\varepsilon\downarrow0$ で近傍が縮むことを示せ。

<!-- solution-start -->
**詳細解答**。[Minkowskiの錐公式](../LORG6/index.md#thm-lorg6-minkowski-futures)を $a,b$ に適用して

$$
(t,x)\in I^+(a)\Longleftrightarrow t-3+\varepsilon>|x-2|,\quad
(t,x)\in I^-(b)\Longleftrightarrow 3+\varepsilon-t>|x-2|.
$$

二条件の共通部分は $|t-3|+|x-2|<\varepsilon$ です。$p$ では左辺0なので内部にあります。任意の半径 $r>0$ のEuclid球に入れるには $\varepsilon<r$ と選べば、$|t-3|^2+|x-2|^2\le(|t-3|+|x-2|)^2<r^2$ です。[ダイヤモンドの因果的凸性](../LORG8/index.md#thm-lorg8-diamond-convex)も満たし、強因果性を確認できます。
<!-- solution-end -->

<a id="ex-lorg10-a02"></a>
#### LORG10-A02 局所の錐と大域の因果的凸性
- Level: A

時間周期円筒 $M=(\mathbb R/2\mathbb Z)\times\mathbb R$、$g=-dt^2+dx^2$ で、十分小さい座標近傍 $N$ に局所ダイヤモンドを取る。(i) $N$ 内の曲線に関して因果的凸である理由、(ii) $M$ 全体の曲線に関して同じ近傍が因果的凸とは限らない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。(i) [相対的なAlexandrov近傍の局所基底](../LORG8/index.md#lem-lorg8-local-diamonds)により $D_N(a,b)$ は $N$ 内の任意の未来因果曲線に対し因果的凸です。

(ii) $p=([0],0)$ から $t$ を未来へ2だけ増やす曲線 $\gamma(s)=([2s],0)$ は $g(\dot\gamma,\dot\gamma)=-4<0$ で始点と終点が $p$ です。この曲線は小さい $D_N(a,b)\ni p$ の外へ出ます。[大域的因果的凸性](#def-lorg10-strong-causality)なら始点・終点がその中にある曲線は出られず矛盾するので、局所相対性を大域へ読み替えられません。
<!-- solution-end -->

<a id="ex-lorg10-a03"></a>
#### LORG10-A03 光円錐の厳密な拡大
- Level: A

$g=-dt^2+dx^2$、$\widehat g=-\lambda dt^2+dx^2$（定数 $\lambda>1$）とする。未来 $g$-因果な非零ベクトル $v=(a,b)$ が未来 $\widehat g$-時間的となることを証明し、$\widehat g$ のcausalityを示せ。

<!-- solution-start -->
**詳細解答**。$a\ge|b|$、$a>0$ なので

$$
\widehat g(v,v)=-\lambda a^2+b^2\le-(\lambda-1)a^2<0.
$$

未来向きは $a>0$ 側を選びます。$\widehat g$-因果な非零未来ベクトルも $a\ge|b|/\sqrt{\lambda}$ かつ $a>0$ ですから、未来因果曲線に沿って $t$ は厳密に増えます。閉未来因果曲線が存在しないので $\widehat g$ はcausal、従って $g$ は[安定因果的](#def-lorg10-stable-causality)です。
<!-- solution-end -->

<a id="ex-lorg10-a04"></a>
#### LORG10-A04 temporal functionの勾配
- Level: A

$g=-dt^2+dx^2$ において $\tau(t,x)=2t$ の勾配を計算し、$\tau$ がtemporal functionであることを確認せよ。$\sigma(t,x)=t^3$ について、時間関数であってもtemporal functionではない理由を示せ。

<!-- solution-start -->
**詳細解答**。任意の $v=a\partial_t+b\partial_x$ に $d\tau(v)=2a$ です。$g(-2\partial_t,v)=2a$ より $\nabla^g\tau=-2\partial_t$。その自己内積は $-4<0$ で過去向きなのでtemporal functionです。$\sigma=t^3$ は $t$ の厳密単調な連続関数で、非定数未来因果曲線で $t$ が厳密に増えるため時間関数です。一方

$$
d\sigma=3t^2dt,\qquad\nabla^g\sigma=-3t^2\partial_t.
$$

$t=0$ で勾配が零となり、時間的ではありません。従って $\sigma$ はtemporal functionではありません。この違いだけから時間関数の存在とtemporal functionの存在が非同値とはいえません。同一の時空に別のtemporal function $t$ があるためです。
<!-- solution-end -->

### Level B

<a id="ex-lorg10-b01"></a>
#### LORG10-B01 強因果性とダイヤモンドの同値
- Level: B

任意に小さい大域的因果的凸開近傍 $V$ が存在すると仮定し、$a\ll p\ll b$ を $V$ 内で選んで $D_M(a,b)\subset V$ を示せ。逆方向も述べよ。

<!-- solution-start -->
**詳細解答**。$V$ は開なので、$p$ を通る局所未来時間的ベクトル場の短い積分曲線上に $a,b\in V$ を取れます。

任意の $z\in I^+(a)\cap I^-(b)$ を取れば、未来時間的曲線 $a\to z$ と $z\to b$ をつなげた区分的 $C^1$ 曲線の両端は $V$ 内です。

$V$ の **$M$ における**因果的凸性より、その中間点 $z$ も $V$ に属します。従って $D_M(a,b)\subset V$ です。逆には[LORG8のダイヤモンドの大域的因果的凸性](../LORG8/index.md#thm-lorg8-diamond-convex)を使い、任意の小さいダイヤモンドをそのまま $V$ とします。

これが[同値定理](#thm-lorg10-alexandrov-basis)の両方向です。
<!-- solution-end -->

<a id="ex-lorg10-b02"></a>
#### LORG10-B02 点除去円筒の再侵入曲線
- Level: B

$C^\ast$ 上で $p=(0,[1/4])$、$\gamma_\varepsilon(u)=(u,[1/4+(u+\varepsilon)/(2\varepsilon)])$、$-\varepsilon\le u\le\varepsilon$ とする。$0<\varepsilon<1/2$ で未来時間的、除去点を通らず、両端は $p$ に収束するが、中間点は $p$ に収束しないことを示せ。

<!-- solution-start -->
**詳細解答**。$b=d\theta/du=1/(2\varepsilon)$ とすると

$$
g(\dot\gamma_\varepsilon,\dot\gamma_\varepsilon)
=-2b+u^2b^2=b(-2+u^2b),\quad
u^2b\le\varepsilon/2<1/4<2.
$$

よって厳密に負です。未来向きの条件も $g(\dot\gamma_\varepsilon,T)=-1+(u^2-1)b<0$ です。$u=0$ では角度 $[3/4]\ne[0]$ なので除去点は通りません。両端は $(-\varepsilon,[1/4])$ と $(\varepsilon,[1/4])$ で共に $p$ に収束しますが、中点は $(0,[3/4])$ に固定されます。$p$ を含み $(0,[3/4])$ を除く $O$ を選ぶと、任意の $V\subset O$ の両端に $\gamma_\varepsilon$ が入っても途中は $O$ の外にあるため、因果的凸性は破れます。
<!-- solution-end -->

<a id="ex-lorg10-b03"></a>
#### LORG10-B03 一般のtemporal functionによる計量拡大
- Level: B

temporal function $\tau$ に対し $A=-g(\nabla\tau,\nabla\tau)>0$、$T=-\nabla\tau/A$ と置く。任意の $v$ を $v=aT+w$、$d\tau(w)=0$ と分解し、$g-\varepsilon d\tau^2$ がLorentz型で、元の非零因果ベクトルを時間的にする理由を示せ。

<!-- solution-start -->
**詳細解答**。$a=d\tau(v)$、$w=v-aT$ と選び、$d\tau(T)=1$ を計算すると $d\tau(w)=0$ です。$g(T,w)=-d\tau(w)/A=0$、$g(T,T)=-1/A$。ゆえに

$$
(g-\varepsilon d\tau^2)(v,v)
=-\left(A^{-1}+\varepsilon\right)a^2+g(w,w).
$$

時間的 $T$ の直交補空間では[LORG1の正定値性](../LORG1/index.md#lem-lorg1-timelike-orthogonal)により $g(w,w)$ が正定値です。従って新計量の符号数は $(1,n)$ で非退化です。

元の非零因果 $v$ では $a=0$ なら $g(v,v)=g(w,w)>0$ と矛盾するので $a\ne0$。新しい二次形式は $g(v,v)-\varepsilon a^2<0$ で、確かに錐が厳密に広がっています。[計量構成の定理](#thm-lorg10-temporal-implies-stable)によりこの錐でも $\tau$ は増え、causalです。
<!-- solution-end -->

<a id="ex-lorg10-b04"></a>
#### LORG10-B04 光円錐を保つ操作と広げる操作
- Level: B

$g=-dt^2+dx^2$ に対して (i) $\widetilde g=9g$、(ii) $\widehat g=-3dt^2+dx^2$ を比較せよ。$v=(1,1)$ の因果型を両方で調べ、強因果性・安定因果性への影響を説明せよ。

<!-- solution-start -->
**詳細解答**。$g(v,v)=0$ です。(i) は $\widetilde g(v,v)=9g(v,v)=0$ のままで光的です。正の共形再尺度だから[LORG8の因果不変性](../LORG8/index.md#thm-lorg8-conformal-causality)により到達関係も、従って強因果性も変わりません。

安定因果性も[時間関数の特徴付け](#thm-lorg10-stable-time-equivalence)により不変です。(ii) は $\widehat g(v,v)=-3+1=-2<0$ で未来時間的です。$g$-因果な非零 $(a,b)$ 全体について $\widehat g(a,b)\le-2a^2<0$ となります。

$\widehat g$ は $t$ が未来で増えるためcausalで、$g$ の安定因果性の直接の証人になります。両操作は錐の境界への作用が異なります。
<!-- solution-end -->

### Level C

<a id="ex-lorg10-c01"></a>
#### LORG10-C01 三つの因果条件を二種類の模型で総合判定する
- Level: C

(i) Minkowski平面、(ii) $C^\ast=((-1,1)\times\mathbb R/\mathbb Z)\setminus\{(0,[0])\}$、$g=-2du\,d\theta+u^2d\theta^2$、$T=\partial_u+\partial_\theta$ について、causal・強因果的・安定因果的を分類せよ。Minkowskiでは具体的な開近傍と拡大計量を提示し、$C^\ast$ では未来時間的再侵入曲線を構成して、失敗する含意とその機構を説明せよ。

<!-- solution-start -->
**詳細解答**。(i) $g=-dt^2+dx^2$ と未来向き $dt>0$ を取ります。$a=(t_0-\varepsilon,x_0)$、$b=(t_0+\varepsilon,x_0)$ の $D_M(a,b)=\{|t-t_0|+|x-x_0|<\varepsilon\}$ は任意に小さく、[大域的に因果的凸](../LORG8/index.md#thm-lorg8-diamond-convex)ですから強因果的です。

$\widehat g=-2dt^2+dx^2$ で、非零未来 $g$-因果ベクトル $v=(a,b)$ は $a\ge|b|$、$a>0$。

従って $\widehat g(v,v)\le-a^2<0$ で厳密に広がり、$\widehat g$-未来因果曲線では $t$ が増えるので $\widehat g$ はcausalです。従って安定因果的であり、[強因果的時空はcausal](#prop-lorg10-strong-implies-causal)によりcausalでもあります。

(ii) [LORG9の点除去円筒の命題](../LORG9/index.md#prop-lorg9-punctured-causal-nondistinguishing)で $C^\ast$ はcausalです。一方 $p=(0,[1/4])$、$-\varepsilon\le u\le\varepsilon$ において

$$
\gamma_\varepsilon(u)=
\left(u,\left[\frac14+\frac{u+\varepsilon}{2\varepsilon}\right]\right)
$$

を取ると、$b=d\theta/du=1/(2\varepsilon)$ で $g(\dot\gamma,\dot\gamma)=b(-2+u^2b)<0$、$g(\dot\gamma,T)=-1+(u^2-1)b<0$ です。$u=0$ の角度は $[3/4]$ なので穴を通りません。

両端は $p$ に収束し、中点 $(0,[3/4])$ は固定なので、$p$ の任意の十分小さい近傍で因果的凸性が失敗します。[強因果性の定義](#def-lorg10-strong-causality)に反します。

もし安定因果的なら[因果階層定理](#thm-lorg10-causal-ladder)で強因果的となり矛盾するので、安定因果的でもありません。したがってこの模型は「causalなら強因果的」も「causalなら安定因果的」も偽であることを示します。

壊れたのは閉路の禁止そのものではなく、閉じなくても局所へ戻れる曲線の制御です。
<!-- solution-end -->

## 12. 次は因果集合の連続性と閉性

強因果性は曲線の局所的な再侵入を排除し、安定因果性は錐の拡大に耐える条件でした。しかしそれでも $J^+(p)$ が閉集合とは限りません。次のLORG11では、時間的未来・過去の連続性と、因果的未来・過去の閉性をさらに別の仮定として区別します。
