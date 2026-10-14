# LORG9 因果階層 I：chronologyとcausality

<!-- definition-example-audit: strict -->

## 1. 光円錐の局所情報から「閉じた時間旅行」は除けるか

[LORG6の時間的・因果的到達関係](../LORG6/index.md#def-lorg6-chronological-causal-future)を使うと、ある点から時間的・因果的な曲線でどこへ行けるかが分かります。[LORG8の共形不変性](../LORG8/index.md#thm-lorg8-conformal-causality)により、光円錐を正の関数倍で変えても到達関係は変わりません。しかし、どの点でも光円錐が普通のMinkowski時空に似ていることは、**遠回りして自分の位置へ戻れない**ことを保証しません。

例えば時間座標を周期化すると、時計の針を未来へ進め続けたまま出発点へ戻れます。一方、時間的な周回は禁止できても、光線に沿った周回は残ることがあります。今回は「時間的な閉路がない」「因果的な閉路がない」「未来・過去の集合が点を識別する」を別々の条件として定義し、どこまでが含意として証明できるかを調べます。

以下、$(M,g)$ は滑らかな連結・Hausdorff・第二可算・境界なしの時間向き付きLorentz多様体、次元 $n+1$（$n\ge1$）、符号 $(-,+,\ldots,+)$ とします。未来向き因果曲線と時間的曲線は[LORG3の区分的 $C^1$ の定義](../LORG3/index.md#def-lorg3-causal-curve)を用います。因果曲線には定数曲線を許し、**閉因果曲線**と呼ぶときは非定数で、始点と終点が一致するものだけを指します。曲線の結合で角ができても区分的 $C^1$ の範囲内です。

## 2. chronology：未来へ時間的に進んで出発点へ戻らない

[LORG6で定めた](../LORG6/index.md#def-lorg6-chronological-causal-future) $p\ll q$ は「未来向き時間的曲線で $p$ から $q$ に到達する」を意味します。点 $p$ の時間的未来 $I^+(p)$ に $p$ 自身が含まれる場合、未来時間的曲線をたどるだけで一周してしまいます。この可能性を除く条件を chronology（時間的閉路の禁止）といいます。

<a id="def-lorg9-chronological"></a>

<!-- formal-statement-start -->
> **定義（chronological時空）**  
> 時間向き付きLorentz多様体 $(M,g)$ が **chronological（時間的因果条件を満たす）** とは、任意の $p\in M$ について
>
$$
> p\notin I^+(p)
$$
>
> が成り立つことをいう。同値に、非定数の閉じた未来向き時間的な区分的 $C^1$ 曲線が存在しないことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg9-chronological -->
**定義の確認**。平坦なMinkowski時空 $\mathbb R^{1+1}$、$g=-dt^2+dx^2$、未来向き $dt>0$ を考えます。未来時間的速度 $(\dot t,\dot x)$ は $\dot t>|\dot x|$ を満たすので、非定数の未来時間的曲線 $\gamma$ では各滑らかな片で $\dot t>0$ です。積分すると $t(\gamma(1))-t(\gamma(0))=\int_0^1\dot t\,ds>0$ であり、端点は一致できません。従ってMinkowski時空はchronologicalです。
<!-- definition-example-end -->

**反例：周期的な時間座標**。$(t,x)\in(\mathbb R/T\mathbb Z)\times\mathbb R$（$T>0$）上の $g=-dt^2+dx^2$ を考えます。$t$ は局所座標として使い、曲線を覆い空間 $\mathbb R^2$ へ持ち上げて計算します。$\gamma(s)=([Ts],0)$（$0\le s\le1$）は速度 $(T,0)$ の未来時間的曲線で、

$$
g(\dot\gamma,\dot\gamma)=-T^2<0,\qquad
\gamma(0)=\gamma(1)=([0],0).
$$

よってchronologicalではありません。各点の十分小さい近傍では $g=-dt^2+dx^2$ という平坦な局所表示を持つのに、大域的には閉時間的曲線があります。ここで失われたのは局所的な錐の性質でなく、時間座標の大域的な非周期性です。

## 3. causality：光的な閉路も許さない

chronologyは**時間的**な閉路だけを禁じ、光的な閉路までは禁じません。そこで[LORG6の因果到達](../LORG6/index.md#def-lorg6-chronological-causal-future) $p\le q$ に対して、「互いに因果的に到達できるのは同一点だけ」という反対称性を要求します。

<a id="def-lorg9-causal"></a>

<!-- formal-statement-start -->
> **定義（causal時空）**  
> 時間向き付きLorentz多様体 $(M,g)$ が **causal（因果条件を満たす）** とは、任意の $p,q\in M$ に対して
>
$$
> (p\le q\ \text{かつ}\ q\le p)\ \Longrightarrow\ p=q
$$
>
> が成り立つことをいう。これは非定数の閉じた未来向き因果曲線が存在しないことと同値である。$p\le p$ 自体は定数曲線により常に成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg9-causal -->
**定義の確認**。Minkowski時空の未来因果速度は $\dot t\ge|\dot x|\ge0$ を満たします。$p\le q$ と $q\le p$ なら、二本の曲線を連結して得た閉路上で $\int\dot t\,ds=0$ です。非負の $\dot t$ は各滑らかな片で零、従って $|\dot x|=0$ となり、曲線は定数です。よって $p=q$ であり、Minkowski時空はcausalです。
<!-- definition-example-end -->

<a id="prop-lorg9-causal-equivalence"></a>

<!-- formal-statement-start -->
> **命題（反対称性と閉因果曲線の同値）**  
> 上の正則性を持つ時間向き付きLorentz多様体では、因果到達関係 $\le$ の反対称性と、非定数の閉未来因果曲線が存在しないことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

異なる二点の相互到達は二本の曲線を結ぶことで閉路になります。逆向きには、非定数の閉路から異なる二点を取り、その間の二つの部分曲線を使います。

<!-- proof-start -->
### 証明

反対称性を仮定します。非定数の閉未来因果曲線 $\gamma:[0,1]\to M$ があると仮定すると、$\gamma(s)\ne\gamma(0)$ となる $s\in(0,1)$ を選べます。$p=\gamma(0)$、$q=\gamma(s)$ と置けば、前半をたどって $p\le q$、後半をたどって $q\le p$ です。反対称性から $p=q$ となり矛盾します。

逆に閉じた非定数の未来因果曲線がないと仮定し、$p\le q$、$q\le p$ を満たす点を考えます。$p\ne q$ なら $p$ から $q$ への未来因果曲線と $q$ から $p$ への未来因果曲線を、[到達関係の連結規則](../LORG6/index.md#prop-lorg6-transitivity)と同じ線形再パラメータ化で連結できます。この曲線は非定数で始点と終点が $p$ だから仮定に反します。従って $p=q$ です。
<!-- proof-end -->

<a id="thm-lorg9-causal-implies-chronological"></a>

<!-- formal-statement-start -->
> **定理（causalならchronological）**  
> 任意の時間向き付きLorentz多様体 $(M,g)$ において、causalならchronologicalである。
<!-- formal-statement-end -->

### 証明の見取り図

時間的曲線の速度は因果的でもあるため、閉時間的曲線は閉因果曲線の特別な場合です。逆方向には光的な閉路が障害になります。

<!-- proof-start -->
### 証明

causalなら[定義](#def-lorg9-causal)により非定数の閉未来因果曲線が存在しません。未来時間的な区分的 $C^1$ 曲線は各非停留片で未来因果的でもあり、[LORG6の包含](../LORG6/index.md#prop-lorg6-transitivity) $p\ll q\Rightarrow p\le q$ も満たします。もし非定数の閉未来時間的曲線が存在すれば、同じ曲線が禁止された閉因果曲線になるので矛盾します。従って[chronologyの定義](#def-lorg9-chronological)が成り立ちます。
<!-- proof-end -->

## 4. 光的な閉路だけが残る円筒時空

chronologyからcausalityへの逆含意が失敗する例を、計量から検証します。座標 $u\in(-1,1)$ と周期 $1$ の角度 $\theta\in\mathbb R/\mathbb Z$ を持つ円筒

$$
C=(-1,1)\times(\mathbb R/\mathbb Z)
$$

に計量と時間向きを

$$
g=-2\,du\,d\theta+u^2d\theta^2,\qquad
T=\partial_u+\partial_\theta
$$

で指定します。$-2\,du\,d\theta$ は対称テンソル $-(du\otimes d\theta+d\theta\otimes du)$ を意味します。角度の座標変換は平行移動なので、$d\theta$ と計量は円筒上で矛盾なく定まります。

行列表現を使う前に、各係数が接ベクトルの二次形式を表すことを確かめます。$v=a\partial_u+b\partial_\theta$ に対して

$$
g(v,v)=-2ab+u^2b^2,\qquad
[g]_{(\partial_u,\partial_\theta)}
=\begin{pmatrix}0&-1\\-1&u^2\end{pmatrix},\quad
\det[g]=-1<0.
$$

行列式の負号は二つの固有値が異符号であることを表し、$g$ は滑らかなLorentz計量です。また

$$
g(T,T)=-2+u^2<0
$$

なので、$T$ は大域的な時間的ベクトル場であり、$g(v,T)<0$ の錐を未来と選べます。

<a id="lem-lorg9-cylinder-future"></a>

<!-- formal-statement-start -->
> **補題（円筒模型での未来因果速度）**  
> 上記の円筒 $(C,g,T)$ では、非零の未来因果ベクトル $v=a\partial_u+b\partial_\theta$ は
>
$$
> b\ge0,\qquad a\ge\frac{u^2}{2}b\ge0
$$
>
> を満たす。未来時間的ベクトルでは $b>0$ かつ $a>\frac{u^2}{2}b$ である。$a=0$ の非零の未来因果ベクトルは $u=0$ 上の正の $\partial_\theta$ 方向に限られる。
<!-- formal-statement-end -->

### 証明の見取り図

二次形式を $b(u^2b-2a)$ と因数分解して二つの錐の枝を分け、$g(v,T)<0$ によって未来の枝を選びます。$u$ が未来方向に減る枝を除外するのが要点です。

<!-- proof-start -->
### 証明

$g(v,v)=b(u^2b-2a)\le0$ とします。$b>0$ の場合は $a\ge u^2b/2$ が必要です。$|u|<1$ だから

$$
g(v,T)=-a+(u^2-1)b<0
$$

となり、これは未来の枝です。$b<0$ なら $a\le u^2b/2\le0$ であり、

$$
g(v,T)=-a+(u^2-1)b>0
$$

となるので過去の枝です。$b=0$ の場合は $g(v,v)=0$、$g(v,T)=-a$ だから、非零で未来となる条件は $a>0$ です。時間的な場合は $g(v,v)<0$ なので $b=0$ を除外でき、上の不等式が厳密になります。

最後に $a=0$ とすると $0\ge u^2b/2$ です。非零未来因果性から $b>0$ であり、$u=0$ を得ます。逆に $u=0$ で $a=0,b>0$ の場合は $g(v,v)=0$、$g(v,T)=-b<0$ です。
<!-- proof-end -->

<a id="prop-lorg9-cylinder-chronological-not-causal"></a>

<!-- formal-statement-start -->
> **命題（chronologicalだがcausalでない円筒）**  
> 上の円筒 $C$ はchronologicalだが、causalではない。$u=0$ の円周は閉未来光的曲線であり、閉未来時間的曲線は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

未来時間的曲線では $u$ が厳密に増加するため周回できません。ただし $u=0$ に限り、未来光的ベクトル $\partial_\theta$ のみで円周を一周できます。

<!-- proof-start -->
### 証明

未来時間的曲線の各滑らかな片では[未来速度の補題](#lem-lorg9-cylinder-future)から $\dot u>0$ です。区分的 $C^1$ の非定数未来時間的曲線では $u$ の増分は正となるので、始点と終点は同じになれません。よって[chronologyの定義](#def-lorg9-chronological)を満たします。

一方、$\gamma(s)=(0,[s])$（$0\le s\le1$）を取ると、

$$
\dot\gamma=\partial_\theta,\quad
g(\dot\gamma,\dot\gamma)=0,\quad
g(\dot\gamma,T)=-1<0,\quad
\gamma(0)=\gamma(1).
$$

従って $\gamma$ は非定数の閉未来光的曲線です。[causalityの定義](#def-lorg9-causal)に反します。chronologyで排除したのは時間的な閉路であり、光的な境界上の周回は残るのです。
<!-- proof-end -->

## 5. distinguishing：点は未来と過去で区別できるか

今度は閉因果曲線をすべて禁止したとしても、**異なる点から見える時間的未来がまったく同じ**ことがありえないか、を問います。点からの未来集合をその点の「未来の指紋」と見れば、これが異なる点を識別できるかという問題です。未来側と過去側は別々に定義します。

<a id="def-lorg9-distinguishing"></a>

<!-- formal-statement-start -->
> **定義（future / past distinguishing）**  
> 時間向き付きLorentz多様体 $(M,g)$ が **future distinguishing（未来識別的）** であるとは、任意の $p,q\in M$ について
>
$$
> I^+(p)=I^+(q)\ \Longrightarrow\ p=q
$$
>
> が成り立つことをいう。**past distinguishing（過去識別的）** とは、同様に
>
$$
> I^-(p)=I^-(q)\ \Longrightarrow\ p=q
$$
>
> が成り立つことをいう。両方を満たす時空を **distinguishing（識別的）** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg9-distinguishing -->
**定義の確認**。Minkowski時空 $\mathbb R^{1+1}$ の基点 $p=(t_p,x_p)$ に対し、[未来錐の公式](../LORG6/index.md#thm-lorg6-minkowski-futures)から

$$
I^+(p)=\{(t,x):t>t_p+|x-x_p|\}.
$$

この集合の時刻の下限は $t_p$ なので、二点 $p,q$ の未来が等しいならまず $t_p=t_q$ です。もし $x_p\ne x_q$ なら $0<\varepsilon<|x_p-x_q|/2$ と置き、時刻 $t_p+\varepsilon$ の断面はそれぞれ中心 $x_p,x_q$、半径 $\varepsilon$ の異なる開区間になります。従って $x_p=x_q$ でもあり、未来識別的です。同じ議論を過去錐 $t<t_p-|x-x_p|$ に適用すると過去識別的でもあります。つまりMinkowski時空はdistinguishingです。
<!-- definition-example-end -->

<a id="thm-lorg9-distinguishing-implies-causal"></a>

<!-- formal-statement-start -->
> **定理（片側の識別性だけでcausalityが従う）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ が未来識別的、または過去識別的ならcausalである。特にdistinguishingならcausalである。
<!-- formal-statement-end -->

### 証明の見取り図

もし異なる $p,q$ が相互に因果的に到達できれば、いずれの点からの時間的未来も同じになります。[push-up補題](../LORG7/index.md#thm-lorg7-push-up)を使う箇所で、どの点間の因果区間と時間区間を結ぶかを明示します。

<!-- proof-start -->
### 証明

$p\le q$ かつ $q\le p$ と仮定します。任意の $r\in I^+(p)$ を取ると $p\ll r$ です。ここで $q\le p$ と $p\ll r$ に[LORG7のpush-up補題](../LORG7/index.md#thm-lorg7-push-up)を適用すると $q\ll r$ なので $r\in I^+(q)$。従って $I^+(p)\subset I^+(q)$ です。

逆向きは $p\le q$、$q\ll r$ に同じ[push-up補題](../LORG7/index.md#thm-lorg7-push-up)を適用し、$I^+(q)\subset I^+(p)$ を得ます。従って

$$
I^+(p)=I^+(q).
$$

未来識別的なら[定義](#def-lorg9-distinguishing)によって $p=q$ です。

過去側の場合、任意の $r\in I^-(p)$ について $r\ll p\le q$ に[push-up補題](../LORG7/index.md#thm-lorg7-push-up)を適用して $r\ll q$、よって $I^-(p)\subset I^-(q)$ です。$r\ll q\le p$ を使えば逆包含も従います。過去識別的なら再び $p=q$。いずれの場合も[causalityの反対称性](#def-lorg9-causal)が成立します。
<!-- proof-end -->

## 6. 因果的でも点を識別できない：一点を除いた円筒

第4節の円筒 $C$ には閉光的曲線がありました。$u=0$ の円周から一点 $o=(0,[0])$ だけ取り除き、

$$
C^\ast=C\setminus\{o\}
$$

とします。計量 $g$、時間向き $T$ は制限します。$C^\ast$ は連結で滑らかな境界なしの時間向き付きLorentz多様体です。一点を消すと閉光的曲線が切れますが、因果錐の「ほぼ光的な方向へ何度も回れる」性質は残ります。

<a id="prop-lorg9-punctured-causal-nondistinguishing"></a>

<!-- formal-statement-start -->
> **命題（causalだがdistinguishingでない時空）**  
> 上記の点除去円筒 $C^\ast$ はcausalである。しかし、$u=0$ に残った異なる二点 $p,q$ は
>
$$
> I^+(p)=I^+(q)=\{u>0\},\qquad
> I^-(p)=I^-(q)=\{u<0\}
$$
>
> を満たす（集合は $C^\ast$ の部分集合）。従って未来識別的でも過去識別的でもない。
<!-- formal-statement-end -->

### 証明の見取り図

因果速度の $u$ 成分は非負なので、閉曲線が存在すれば $u$ は一定です。非定数で一定にできるのは $u=0$ の正の角度方向だけですが、その円周には穴が空いています。一方 $u>0$ の任意の点へは、$u$ をわずかに増やす間に角度を好きなだけ進める**時間的**経路を作れます。この二点を別々に証明します。

<!-- proof-start -->
### 証明

**(1) causalであること**。任意の未来因果曲線では[未来速度の補題](#lem-lorg9-cylinder-future)から、各滑らかな片で $\dot u\ge0$ です。閉曲線なら始点と終点の $u$ 座標は一致するので、

$$
0=u(1)-u(0)=\int_0^1\dot u(s)\,ds.
$$

非負の連続な被積分関数の積分が零なので、各片で $\dot u=0$ です。[未来速度の補題](#lem-lorg9-cylinder-future)より、非零速度が残るのは $u=0$ 上の正の $\partial_\theta$ 方向に限られます。従って非定数閉因果曲線は、$u=0$ 上の円周だけをたどる必要があります。

しかし $C^\ast$ のこの部分は円周から一点を除いた開区間に同相です。角度をその開区間の実数座標で表せば、未来に進む非定数曲線の角度増分は正となり、出発点へ戻れません。よって非定数閉因果曲線は存在せず、[causalityの定義](#def-lorg9-causal)が成立します。

**(2) 未来集合の計算**。$p=(0,[\theta_0])$ とします。未来時間的曲線上では $\dot u>0$ だから、

$$
I^+(p)\subset\{u>0\}.
$$

逆包含を示します。$q=(a,[\theta_1])$ を $0<a<1$ の任意の点とします。$p$ と $q$ の角度を実数へ持ち上げ、終点の代表を $\theta_1+k$（$k\in\mathbb Z$）として

$$
D=\theta_1+k-\theta_0>0
$$

となるよう $k$ を選びます。任意の小さな $\varepsilon>0$ に対して

$$
H_\varepsilon(a)
=\int_0^a\frac{ds}{(s+\varepsilon)^2}
=\frac1\varepsilon-\frac1{a+\varepsilon}
$$

です。$\varepsilon\downarrow0$ で $H_\varepsilon(a)\to\infty$ なので、$H_\varepsilon(a)>D$ を満たす $\varepsilon$ を取れます。$c=D/H_\varepsilon(a)\in(0,1)$ と置き、曲線を $u\in[0,a]$ で

$$
\gamma(u)=\left(u,\left[\theta_0+
c\int_0^u\frac{ds}{(s+\varepsilon)^2}\right]\right)
$$

と定めます。始点は $p$、終点は角度差が $cH_\varepsilon(a)=D$ なので $q$ です。速度の角度成分は $b(u)=c/(u+\varepsilon)^2>0$。$u\ge0$ では

$$
0<u^2b(u)=c\frac{u^2}{(u+\varepsilon)^2}<1<2,
$$

よって

$$
g(\dot\gamma,\dot\gamma)
=-2b(u)+u^2b(u)^2
=b(u)\bigl(-2+u^2b(u)\bigr)<0.
$$

[未来速度の補題](#lem-lorg9-cylinder-future)の未来の枝にも属します。曲線は $u>0$ で穴 $o$ を避け、$u=0$ での唯一の点は $p\ne o$ です。従って $p\ll q$ であり、

$$
I^+(p)=\{u>0\}.
$$

右辺は $\theta_0$ に依存しません。

**(3) 過去集合の計算**。同じ $p$ に対して未来時間的曲線上の $u$ は厳密増加なので、$I^-(p)\subset\{u<0\}$ です。$q=(a,[\theta_1])$（$-1<a<0$）を任意に取り、$p$ の角度代表を $\theta_0+k$ と選んで $D=\theta_0+k-\theta_1>0$ とします。今回は

$$
H_\varepsilon^-=\int_a^0\frac{ds}{(\varepsilon-s)^2}
=\frac1\varepsilon-\frac1{\varepsilon-a}\to\infty
\quad(\varepsilon\downarrow0)
$$

を用います。$H_\varepsilon^->D$ となる $\varepsilon$ と $c=D/H_\varepsilon^-\in(0,1)$ を選び、

$$
\lambda(u)=\left(u,\left[\theta_1+
c\int_a^u\frac{ds}{(\varepsilon-s)^2}\right]\right)
\quad(a\le u\le0)
$$

とします。$u$ が $a$ から $0$ へ増える未来向きの曲線であり、角度の増分は $D$ です。角度速度 $b(u)=c/(\varepsilon-u)^2>0$ に対して、$u\le0$ でも $u^2b(u)<1<2$ なので、先ほどと同じ二次形式の計算で $g(\dot\lambda,\dot\lambda)<0$ です。$\lambda$ は終点 $p$ 以外で $u<0$ にあるため穴を避けます。よって $q\ll p$ であり、

$$
I^-(p)=\{u<0\}.
$$

**(4) 識別性の失敗**。$u=0$ 上には穴以外の異なる二点 $p,q$ が存在します。計算した未来・過去集合は両方とも点に依存しないので、[識別性の定義](#def-lorg9-distinguishing)に反します。これは閉因果曲線を取り除いても、すべての点の未来・過去を互いに区別できるとは限らないという反例です。
<!-- proof-end -->

**何が壊れているか**。$u=0$ では $\partial_\theta$ が光的であり、すぐ隣の $u>0$ に移動すれば、光に非常に近い速度で角度を何度も回してから目標点へ到達できます。点除去は**完全な閉路**を切断しますが、光的方向へ近づく曲線の角度の進み方に上限を付けません。そのため別々の出発点が同一の未来集合を持ちます。causalityからdistinguishingを証明しようとすると、まさに「閉路がないなら未来集合は異なるはず」という不当な一歩が必要になってしまいます。

## 7. ここまでで確定する因果階層

<a id="thm-lorg9-hierarchy"></a>

<!-- formal-statement-start -->
> **定理（因果階層の最初の三段階）**  
> 滑らかな時間向き付きLorentz多様体に対して、次の含意が成り立つ。
>
$$
> \text{distinguishing}
> \Longrightarrow\text{causal}
> \Longrightarrow\text{chronological}.
$$
>
> いずれの逆含意も、一般には成立しない。またfuture distinguishing、past distinguishingのいずれか一方だけでもcausalが従う。
<!-- formal-statement-end -->

この含意の前半は[片側識別性の定理](#thm-lorg9-distinguishing-implies-causal)、後半は[causalならchronologicalの定理](#thm-lorg9-causal-implies-chronological)で証明しました。逆含意の失敗は[点除去円筒](#prop-lorg9-punctured-causal-nondistinguishing)と[穴なし円筒](#prop-lorg9-cylinder-chronological-not-causal)でそれぞれ確かめました。これは三条件を別々に検証しなければならない、という実用上の注意でもあります。

[LORG8の共形不変性](../LORG8/index.md#thm-lorg8-conformal-causality)と同じ理由で、ここで使った三条件は計量を正の滑らかな関数倍 $\widetilde g=\Omega^2g$ に取り替えても変わりません。定義に現れる時間的・因果的曲線と $I^\pm$、$J^\pm$ が変わらないためです。光円錐を保持する共形変更だけでは、今回の閉路や識別性の失敗を修復できません。

## 8. 演習：閉路・反対称性・識別性を自力で判定する

### Level A

<a id="ex-lorg9-a01"></a>
#### LORG9-A01 周期時刻の閉時間的曲線
- Level: A

$M=(\mathbb R/3\mathbb Z)\times\mathbb R$ に $g=-dt^2+dx^2$、時間向き $dt>0$ を入れる。$\gamma(s)=([3s],2)$（$0\le s\le1$）について速度の因果型・向き・閉性を個別に調べ、chronologyとcausalityを判定せよ。

<!-- solution-start -->
**詳細解答**。覆い空間で速度は $(3,0)$ であるから

$$
g(\dot\gamma,\dot\gamma)=-3^2+0^2=-9<0,\qquad\dot t=3>0.
$$

未来時間的です。始点と終点は $\gamma(0)=([0],2)=([3],2)=\gamma(1)$ で、途中で $t$ が変わるので非定数です。従って閉未来時間的曲線が存在し、[chronologyの定義](#def-lorg9-chronological)に反します。時間的曲線は因果曲線でもあるため、[causalityの定義](#def-lorg9-causal)にも反します。
<!-- solution-end -->

<a id="ex-lorg9-a02"></a>
#### LORG9-A02 未来錐の断面で二点を識別する
- Level: A

$\mathbb R^{1+1}$ の $p=(0,0)$、$q=(0,2)$、$g=-dt^2+dx^2$ について、$t=1$ での $I^+(p)$ と $I^+(q)$ の断面を計算せよ。この計算が $p\ne q$ を未来集合で区別する根拠を説明せよ。

<!-- solution-start -->
**詳細解答**。[Minkowskiの未来錐公式](../LORG6/index.md#thm-lorg6-minkowski-futures)に $p,q$ を代入すると

$$
I^+(p)=\{t>|x|\},\qquad I^+(q)=\{t>|x-2|\}.
$$

$t=1$ と置けば一つ目は $-1<x<1$、二つ目は $1<x<3$ です。例えば $(1,0)$ は前者に入り後者には入りません。従って $I^+(p)\ne I^+(q)$ であり、この二点を未来集合が識別します。一般の二点についての結論は本文第5節の時刻下限と小断面の議論が必要で、この計算一例だけで全時空の識別性を証明したことにはなりません。
<!-- solution-end -->

<a id="ex-lorg9-a03"></a>
#### LORG9-A03 円筒計量がLorentz型であること
- Level: A

$g=-2\,du\,d\theta+u^2d\theta^2$、$|u|<1$ について、基底 $(\partial_u,\partial_\theta)$ で行列を求め、Lorentz符号数と $T=\partial_u+\partial_\theta$ の時間的性質を確かめよ。

<!-- solution-start -->
**詳細解答**。対称双線形形式として $g(\partial_u,\partial_u)=0$、$g(\partial_u,\partial_\theta)=-1$、$g(\partial_\theta,\partial_\theta)=u^2$ なので

$$
[g]=\begin{pmatrix}0&-1\\-1&u^2\end{pmatrix},\qquad
\det[g]=0\cdot u^2-(-1)(-1)=-1.
$$

対称実 $2\times2$ 行列の固有値の積が負なので正負一つずつあり、符号数は $(1,1)$ です。また

$$
g(T,T)=g(\partial_u,\partial_u)+2g(\partial_u,\partial_\theta)+g(\partial_\theta,\partial_\theta)
=u^2-2<-1<0.
$$

よって $T$ は各点で非零の時間的ベクトル場となり、未来向きを指定できます。
<!-- solution-end -->

<a id="ex-lorg9-a04"></a>
#### LORG9-A04 光的な円周と時間的な増加
- Level: A

上記の円筒 $C$ において $\gamma(s)=(0,[s])$ が閉未来光的であることを確かめよ。また未来時間的曲線について $\dot u>0$ を補題から確認し、なぜ $\gamma$ の存在がchronologyと矛盾しないか説明せよ。

<!-- solution-start -->
**詳細解答**。$\dot\gamma=\partial_\theta$ なので $u=0$ で

$$
g(\dot\gamma,\dot\gamma)=0,\qquad
g(\dot\gamma,T)=-1<0.
$$

従って未来光的です。角度は $1$ を周期とするので $\gamma(0)=(0,[0])=\gamma(1)$ で、非定数です。一方、[未来速度の補題](#lem-lorg9-cylinder-future)は未来時間的速度に対して $a=\dot u>u^2b/2\ge0$ を与え、厳密に $\dot u>0$ です。未来時間的な閉路は作れません。[chronology](#def-lorg9-chronological)が禁じるのは閉時間的曲線だけであり、$\gamma$ は光的なので矛盾しません。
<!-- solution-end -->

### Level B

<a id="ex-lorg9-b01"></a>
#### LORG9-B01 相互到達と閉路の同値を再構成する
- Level: B

区分的 $C^1$ の因果曲線を使う時空で、(i) 互いに因果到達可能な相異なる二点が存在すれば非定数閉未来因果曲線が存在する、(ii) 逆に非定数閉未来因果曲線からそのような二点が得られる、を曲線の再パラメータ化まで書いて示せ。

<!-- solution-start -->
**詳細解答**。(i) $p\ne q$、$p\le q$、$q\le p$ とします。曲線 $\alpha:[0,1]\to M$ が $p$ から $q$、$\beta:[0,1]\to M$ が $q$ から $p$ への未来因果曲線だとします。

$$
\gamma(s)=
\begin{cases}
\alpha(2s)&0\le s\le1/2,\\
\beta(2s-1)&1/2\le s\le1
\end{cases}
$$

と置きます。$\alpha(1)=q=\beta(0)$ なので連続で、折れ点以外は各片で速度が元の速度の正の $2$ 倍です。未来因果性を保ち、区分的 $C^1$ です。$\gamma(0)=p=\gamma(1)$、途中で $q\ne p$ を通るので非定数です。

(ii) 非定数閉未来因果曲線 $\gamma:[0,1]\to M$ があれば、ある $s_0\in(0,1)$ で $q=\gamma(s_0)\ne p=\gamma(0)$ です。制限 $\gamma|_{[0,s_0]}$ は $p\le q$ を、$\gamma|_{[s_0,1]}$ は $q\le p$ を与えます。従って[causalityの反対称性](#def-lorg9-causal)が破れます。
<!-- solution-end -->

<a id="ex-lorg9-b02"></a>
#### LORG9-B02 識別性から因果性へ進む中間式
- Level: B

$p\le q\le p$ を仮定し、未来識別性だけで $p=q$ を示せ。$I^+(p)\subset I^+(q)$ と逆包含で[LORG7のpush-up補題](../LORG7/index.md#thm-lorg7-push-up)に入力する三点をそれぞれ明示せよ。過去識別性の場合も示せ。

<!-- solution-start -->
**詳細解答**。任意の $r\in I^+(p)$ を取ると $p\ll r$ です。三点を $(q,p,r)$ の順に選べば

$$
q\le p\ll r\quad\Longrightarrow\quad q\ll r
$$

となります。含意は[LORG7のpush-up補題](../LORG7/index.md#thm-lorg7-push-up)です。従って $I^+(p)\subset I^+(q)$ です。

逆に任意の $r\in I^+(q)$ を取り、三点 $(p,q,r)$ に対して同じ[push-up補題](../LORG7/index.md#thm-lorg7-push-up)を使うと、

$$
p\le q\ll r\quad\Longrightarrow\quad p\ll r.
$$

よって $I^+(q)\subset I^+(p)$ も成立します。二つの包含から未来集合が一致し、[未来識別性](#def-lorg9-distinguishing)によって $p=q$ が従います。

過去側は任意の $r\ll p$ について $(r,p,q)$ に[push-up補題](../LORG7/index.md#thm-lorg7-push-up)を適用して $r\ll q$、逆には $r\ll q\le p$ に適用して $r\ll p$ を得ます。これで $I^-(p)=I^-(q)$ となり、過去識別性から $p=q$ です。いずれも二方向の包含が必要です。
<!-- solution-end -->

<a id="ex-lorg9-b03"></a>
#### LORG9-B03 点除去円筒の閉曲線を排除する
- Level: B

$C^\ast=C\setminus\{(0,[0])\}$ において、非定数閉未来因果曲線が存在すると仮定して矛盾を導け。$\dot u\ge0$ の積分、$u=0$ への制限、穴のある円周上の単調な角度という三段階を使え。

<!-- solution-start -->
**詳細解答**。閉未来因果曲線 $\gamma$ の $u$ 座標を $u(s)$ とします。[未来速度の補題](#lem-lorg9-cylinder-future)で各滑らかな片の $\dot u\ge0$ なので

$$
0=u(1)-u(0)=\int_0^1\dot u(s)\,ds.
$$

非負の連続な片ごとの関数の積分が零だから、各片で $\dot u=0$ です。曲線が非定数ならどこかで速度が非零となるので、同補題によってその点は $u=0$、かつ $\dot\theta>0$ です。$u$ は全曲線で一定なので、全体が $u=0$ 上にあります。しかし $u=0$ の円周から角度 $[0]$ を除くと、角度を一意に $(0,1)$ の値で表せます。未来因果速度はこの座標で $\dot\theta\ge0$、非定数なら

$$
\theta(1)-\theta(0)=\int_0^1\dot\theta(s)\,ds>0.
$$

同じ点へは戻れず、閉性に矛盾します。従って$C^\ast$はcausalです。
<!-- solution-end -->

<a id="ex-lorg9-b04"></a>
#### LORG9-B04 未来集合の「指紋」が消える計算
- Level: B

点除去円筒 $C^\ast$ 上の $p=(0,[1/4])$ と $q=(0,[3/4])$ を取る。任意の $r=(a,[\theta])$（$0<a<1$）に対し、$p$ から $r$ への未来時間的曲線を $u$ の関数として構成せよ。係数と計量の符号を確認し、$I^+(p)=I^+(q)$ を結論せよ。

<!-- solution-start -->
**詳細解答**。始点の角度代表を $\theta_0=1/4$ とし、整数 $k$ を十分大きく選んで $D=\theta+k-\theta_0>0$ にします。$H_\varepsilon(a)=1/\varepsilon-1/(a+\varepsilon)$ は $\varepsilon\downarrow0$ で発散するので、$H_\varepsilon(a)>D$ を満たす $\varepsilon>0$ を選び、$c=D/H_\varepsilon(a)\in(0,1)$ とします。曲線

$$
\gamma(u)=\left(u,\left[\theta_0+
c\left(\frac1\varepsilon-\frac1{u+\varepsilon}\right)\right]\right)
\quad(0\le u\le a)
$$

は始点 $p$ と終点 $r$ を結びます。速度は $(1,b)$、$b=c/(u+\varepsilon)^2>0$、$u^2b<c<1$ です。従って

$$
g(\dot\gamma,\dot\gamma)=b(-2+u^2b)<-b<0.
$$

$g(\dot\gamma,T)<0$ でもあり未来時間的です。途中では $u>0$ なので穴を通りません。任意の $r$ について $p\ll r$ が成り立つ一方、$\dot u>0$ から $I^+(p)$ は $u>0$ にしかありません。よって $I^+(p)=\{u>0\}$ です。始点の角度を $\theta_0=3/4$ に替えても同じ整数 $k$ と $\varepsilon$ の選択が可能なので、$I^+(q)=\{u>0\}$ です。$p\ne q$ なのに未来集合が同じため、未来識別性は成立しません。
<!-- solution-end -->

### Level C

<a id="ex-lorg9-c01"></a>
#### LORG9-C01 三つの時空を分類し共形変換の限界を述べる
- Level: C

次の三時空をそれぞれchronological、causal、future distinguishing、past distinguishingの四条件で分類せよ。

1. 時間周期円筒 $(\mathbb R/2\mathbb Z)\times\mathbb R$ に計量 $-dt^2+dx^2$ を入れたもの。
2. 円筒 $C=(-1,1)\times(\mathbb R/\mathbb Z)$ に計量 $g=-2\,du\,d\theta+u^2d\theta^2$ と時間向き $T=\partial_u+\partial_\theta$ を入れたもの。
3. 2から一点 $(0,[0])$ を除いた時空 $C^\ast$。

閉路、未来・過去の集合、含意の根拠を明示せよ。また、任意の正の滑らかな関数 $\Omega$ による共形再尺度 $\Omega^2g$ で分類が変わるか述べよ。

<!-- solution-start -->
**詳細解答**。(i) 速度 $(2,0)$ の曲線 $s\mapsto([2s],0)$ は未来時間的な閉路なのでchronologicalでもcausalでもありません。任意の二点 $p,q$ について、覆い空間上で終点の時刻代表を十分未来へずらせば、その時刻差を空間差の絶対値より大きくできます。従って $p\ll q$ であり、$I^+(p)=M$、同様に $I^-(p)=M$ です。二点以上あるので両方向の識別性もありません。

(ii) [未来速度の補題](#lem-lorg9-cylinder-future)から未来時間的曲線では $\dot u>0$ なので閉時間的曲線はありません。従ってchronologicalです。ただし $u=0$ の $s\mapsto(0,[s])$ は $g(\dot\gamma,\dot\gamma)=0$、$g(\dot\gamma,T)=-1$ の閉未来光的曲線だからcausalではありません。[片側識別性ならcausalの定理](#thm-lorg9-distinguishing-implies-causal)の対偶により、未来識別的でも過去識別的でもありません。

(iii) 任意の閉未来因果曲線の $u$ 増分は非負かつ一周で零だから、もし非定数なら $u=0$ 上の正の角度方向だけを進む必要があります。しかし一周に必要な点が除去されているのでそのような閉路は存在せず、causalです。[causalならchronological](#thm-lorg9-causal-implies-chronological)からchronologicalでもあります。一方 $u=0$ 上の異なる二点 $p,q$ を取ると、[点除去円筒の計算](#prop-lorg9-punctured-causal-nondistinguishing)で $I^+(p)=I^+(q)=\{u>0\}$、$I^-(p)=I^-(q)=\{u<0\}$ です。従ってどちらの識別性もありません。

最後に $\Omega>0$ なら $g(v,v)$ と $\Omega^2g(v,v)$ の符号が同じで、指定した時間向きの未来錐も同じです。[共形因果不変性](../LORG8/index.md#thm-lorg8-conformal-causality)によって未来・過去の曲線の存在、$I^\pm,J^\pm$ が変わりません。閉時間的・閉因果曲線の有無も変わらないので、(i)〜(iii)の四条件の分類はすべて不変です。
<!-- solution-end -->

## 9. 次の段階：局所的な因果曲線のふるまい

今回は、閉路の不在と未来集合・過去集合による識別が異なる条件であることを、[三段階の因果階層](#thm-lorg9-hierarchy)として整理しました。特に点除去円筒では、すべての非定数閉因果曲線が禁止されていても、ほぼ光的な経路が小さい近傍を何度も通ることが識別性を破ります。

次のLORG10では、曲線が小さい近傍を出た後にそこへ戻ることまで禁止する**強因果性**と、光円錐のわずかな拡大に対しても閉因果曲線を防ぐ**安定因果性**を扱います。閉路を単純に数えるだけでは検出できなかった現象を、局所の曲線と計量の摂動によって調べることになります。
