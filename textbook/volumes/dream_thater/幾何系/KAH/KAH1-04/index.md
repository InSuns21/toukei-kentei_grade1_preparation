# KAH1-04 局所Kählerポテンシャル

<!-- definition-example-audit: strict -->

## 1. 閉じた形式を一つの関数から作れるか

これまで[基本2形式の閉性](../KAH1-02/index.md#thm-kah1-02-local-closedness)を、Hermite係数の一階微分の対称性として調べた。前章では、その対称性が[Chern接続の捩率零](../KAH1-03/index.md#thm-kah1-03-closed-torsion)とも同値であることを示した。しかし、係数 $g_{i\bar j}$ を一つずつ指定する方法では、閉性を確認するたびに多くの偏微分を比較する必要がある。

むしろ一つの**実数値関数**を先に指定し、二階微分を並べて係数行列を作れないだろうか。もし

$$
g_{i\bar j}=\frac{\partial^2\varphi}
{\partial z^i\partial\bar z^j}
$$

と表せれば、混合偏微分を交換するだけで閉性が従う。前章まででは、この作り方で確かにKähler形式が得られることを示した。本章の第一の問いは、その逆、すなわち**あらゆるKähler形式が点の近くではこの形に戻るか**である。

以下 $X$ は複素次元 $n\ge1$ の複素多様体とし、実 $(1,1)$ 形式はすべて滑らかとする。正則座標 $z^j=x^j+iy^j$ 上で [Wirtinger微分](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)を使う。添字の反復は $1,\ldots,n$ にわたる総和を表し、基本形式の係数の約束は

$$
\omega=i\,g_{i\bar j}\,dz^i\wedge d\bar z^j
$$

とする。このとき実Euclid計量の係数は $g_{i\bar j}=\delta_{ij}/2$ である。

ここで「正」は[正の実(1,1)形式の定義](../KAH1-02/index.md#def-kah1-02-positive-form)の $-i\omega(v,\bar v)>0$ を指し、「閉」は $d\omega=0$ を指す。二つは別々に確認する条件である。

関数から作る形を先に定める。[型別外微分の局所公式](../../CM/CM2-02/index.md#thm-cm2-02-local-formula)によると、滑らかな関数 $\varphi$ に対して

$$
\bar\partial\varphi
=\sum_j\varphi_{\bar j}\,d\bar z^j,
\qquad
\partial\bar\partial\varphi
=\sum_{i,j}\varphi_{i\bar j}\,dz^i\wedge d\bar z^j.
$$

ここで $\varphi_{i\bar j}=\partial_i(\partial_{\bar j}\varphi)$ である。一方、$\bar\partial\partial\varphi=-\partial\bar\partial\varphi$ であり、演算子の順序を入れ替えると外積の符号が変わる。

<a id="def-kah1-04-local-potential"></a>

<!-- formal-statement-start -->
> **定義（局所Kählerポテンシャル）**  
> 複素多様体 $X$ の開集合 $U$ 上の滑らかな実 $(1,1)$ 形式 $\omega$ に対し、滑らかな実数値関数 $\varphi\in C^\infty(U,\mathbb R)$ が

$$
\omega=i\partial\bar\partial\varphi
$$

> を満たすとき、$\varphi$ を $U$ 上の $\omega$ の**ポテンシャル**という。$\omega$ が正の閉実 $(1,1)$ 形式であれば、これを**局所Kählerポテンシャル**という。ある点の近傍で定義したポテンシャルについても同じ名称を使う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-04-local-potential -->
**定義の確認**。$U=\mathbb C^n$ で

$$
\varphi_0(z)=\frac12\sum_{j=1}^n|z^j|^2
=\frac12\sum_jz^j\bar z^j
$$

を取る。$\partial_{\bar j}\varphi_0=z^j/2$、さらに $\partial_i(z^j/2)=\delta_{ij}/2$ だから

$$
i\partial\bar\partial\varphi_0
=\frac i2\sum_jdz^j\wedge d\bar z^j
=\sum_jdx^j\wedge dy^j.
$$

係数行列は $I_n/2$ なので任意の $v\ne0$ に対して $\sum g_{i\bar j}v^i\overline{v^j}=\lVert v\rVert^2/2>0$。[正の実(1,1)形式の判定](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)より正値である。また[型別外微分の三つの恒等式](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)を用いると

$$
\partial(i\partial\bar\partial\varphi_0)=0,
\qquad
\bar\partial(i\partial\bar\partial\varphi_0)=0
$$

となるので $d\omega=0$。実性、型、正値性、閉性をそれぞれ確認した。
<!-- definition-example-end -->

## 2. 閉形式から実ポテンシャルへ：二段階の局所解法

通常の[Poincaré補題](../../GEO/GEO9/index.md#thm-geo9-poincare-lemma)は、閉じた実2形式から局所的な実1形式 $\alpha$ を作り、$\omega=d\alpha$ と表す。しかし、欲しいのは「1形式の外微分」ではなく「**一つの実関数への二種類の微分**」である。この段差を埋めるのに、形式の $(1,0)+(0,1)$ 分解と[局所bar∂-Poincaré補題](../../CM/CM2-03/index.md#thm-cm2-03-local-dbar-poincare)を使う。

複素多様体上の閉じた実 $(1,1)$ 形式を考えよう。通常の補題で $\alpha$ を得たら

$$
\alpha=\alpha^{1,0}+\alpha^{0,1},
\qquad
\alpha^{1,0}=\overline{\alpha^{0,1}}
$$

と分ける。$\omega$ に $(0,2)$ 成分がないので、$\bar\partial\alpha^{0,1}=0$ である。この等式こそ $\bar\partial f=\alpha^{0,1}$ を解くための適合条件になる。

<a id="thm-kah1-04-local-existence"></a>

<!-- formal-statement-start -->
> **定理（閉実(1,1)形式の局所ポテンシャル定理）**  
> 複素多様体 $X$ 上の滑らかな実 $(1,1)$ 形式 $\omega$ が $d\omega=0$ を満たすとする。任意の点 $p\in X$ に対し、$p$ の正則座標近傍 $V$ と滑らかな実数値関数 $\varphi$ が存在して、

$$
\omega|_V=i\partial\bar\partial\varphi
$$

> と書ける。逆に、滑らかな実関数 $\varphi$ からこの式で作った形式は実 $(1,1)$ 型で閉じている。ここでは正値性を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

まず普通のPoincaré補題で「2形式を1形式へ」戻す。次に型の成分を分け、$\bar\partial$-Poincaré補題で「$(0,1)$ 形式を関数へ」戻す。最後に実性を使い、関数とその複素共役の差から**実ポテンシャル**を取り出す。二つの補題の役割は異なり、通常の $d$-Poincaré補題だけで $\bar\partial$ 方程式の可解性を済ませてはいけない。

<!-- proof-start -->
### 証明

$p$ の正則座標チャートを取り、その中に $p$ を含む小さな実凸開球 $B$ を選ぶ。$d\omega=0$ なので[微分形式のPoincaré補題](../../GEO/GEO9/index.md#thm-geo9-poincare-lemma)を実2形式 $\omega|_B$ に適用でき、実1形式 $\alpha$ が存在して

$$
d\alpha=\omega|_B
$$

となる。実性により $\alpha^{1,0}=\overline{\alpha^{0,1}}$ である。$\beta=\alpha^{0,1}$ と置くと、型分解によって

$$
\begin{aligned}
d\alpha
&=(\partial+\bar\partial)
  (\alpha^{1,0}+\beta)\\
&=\underbrace{\partial\alpha^{1,0}}_{(2,0)}
 +\underbrace{\partial\beta+\bar\partial\alpha^{1,0}}_{(1,1)}
 +\underbrace{\bar\partial\beta}_{(0,2)}.
\end{aligned}
$$

左辺は $(1,1)$ 型だから、型の一意性から $\bar\partial\beta=0$。ここで[局所bar∂-Poincaré補題](../../CM/CM2-03/index.md#thm-cm2-03-local-dbar-poincare)を $p=0,q=1$ の滑らかな $(0,1)$ 形式 $\beta$ に適用する。必要に応じて $p$ の近傍を $V\subset B$ へ縮めれば、複素数値の滑らかな関数 $f$ が得られ、

$$
\beta|_V=\bar\partial f
$$

となる。実性から $\alpha^{1,0}|_V=\partial\bar f$ でもある。したがって先ほどの $(1,1)$ 成分は

$$
\begin{aligned}
\omega|_V
&=\partial\beta+\bar\partial\alpha^{1,0}\\
&=\partial\bar\partial f+\bar\partial\partial\bar f\\
&=\partial\bar\partial f-\partial\bar\partial\bar f\\
&=\partial\bar\partial(f-\bar f).
\end{aligned}
$$

$f-\bar f=2i\,\operatorname{Im}f$ なので、実関数 $\varphi=2\,\operatorname{Im}f$ と置けば $\omega|_V=i\partial\bar\partial\varphi$ となる。

逆向きは、関数の二階微分により $(1,1)$ 型である。$\varphi$ が実なら $\overline{\partial\bar\partial\varphi}=\bar\partial\partial\varphi=-\partial\bar\partial\varphi$ だから $i\partial\bar\partial\varphi$ は実である。また[三つの恒等式](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)より

$$
d(i\partial\bar\partial\varphi)
=i\partial^2\bar\partial\varphi
+i\bar\partial\partial\bar\partial\varphi
=0.
$$

最後の第二項は $\bar\partial\partial=-\partial\bar\partial$ と $\bar\partial^2=0$ で消える。$\square$
<!-- proof-end -->

この定理によって、閉実 $(1,1)$ 形式であることと、各点の近くで実ポテンシャルを持つことが同値だと分かった。正値性はまだ別問題で、得られた関数の複素Hessianを調べなければならない。例えば $\varphi=-|z|^2$ も閉実 $(1,1)$ 形式を作るが、正値ではない。

## 3. ポテンシャルは一意ではない

一つの計量に複数の関数が対応する。$\varphi$ がポテンシャルなら、正則関数 $h$ を加えて

$$
\psi=\varphi+\operatorname{Re}h
$$

としても、$\partial\bar\partial\operatorname{Re}h=0$ だから同じ形式が得られる。実際、$h$ と $\bar h$ はそれぞれ一方の型の微分が零になり、混合二階微分が消える。この性質を一般の関数として整理する。

<a id="def-kah1-04-pluriharmonic"></a>

<!-- formal-statement-start -->
> **定義（多重調和関数）**  
> 複素多様体 $X$ の開集合 $U$ 上の滑らかな実数値関数 $u$ が

$$
\partial\bar\partial u=0
$$

> を満たすとき、$u$ を**多重調和関数**（pluriharmonic function）という。条件は各点の近くの任意の正則座標で判定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-04-pluriharmonic -->
**定義の確認**。$\mathbb C^2$ で

$$
u(z^1,z^2)=\operatorname{Re}((z^1)^2+iz^2)
=\frac{(z^1)^2+(\bar z^1)^2+iz^2-i\bar z^2}{2}
$$

と置く。$\partial_{\bar1}u=\bar z^1$、$\partial_{\bar2}u=-i/2$ であるから、それらをどの $z^i$ で微分しても零となり、

$$
u_{i\bar j}=0\quad(i,j=1,2),
\qquad
\partial\bar\partial u=0.
$$

実数値であること、各混合二階微分が零であることを確かめた。単に実部だからと名称で判定したのではない。
<!-- definition-example-end -->

定義の「多重」は重要である。複素次元2で $u=|z^1|^2-|z^2|^2$ は実EuclidのLaplacianに関して調和的だが、$u_{1\bar1}=1$、$u_{2\bar2}=-1$ なので多重調和ではない。普通の調和性は対角成分の**和**が零でよく、多重調和性は**すべて**の成分が零であることを要求する。

<a id="thm-kah1-04-gauge"></a>

<!-- formal-statement-start -->
> **定理（ポテンシャルの差と正則関数の実部）**  
> 連結な複素座標開集合 $U$ 上の滑らかな実関数 $\varphi,\psi$ について、次は同値である。
>
> 1. $i\partial\bar\partial\varphi=i\partial\bar\partial\psi$ が $U$ 上で成立する。
> 2. $\varphi-\psi$ は $U$ 上で多重調和である。
>
> さらにこれらが成立する場合、任意の点 $p\in U$ の十分小さな連結近傍 $V$ に正則関数 $h$ が存在し、

$$
(\varphi-\psi)|_V=\operatorname{Re}h
$$

> と書ける。逆に、正則関数の実部を加える操作はポテンシャルを変えない。大域的な一つの $h$ の存在までは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

二つの関数の混合二階微分が等しければ、その差の $\partial\bar\partial$ が零となる。そこから $\partial u$ が $d$-閉1形式になるため、普通のPoincaré補題を**複素数値1形式**へ適用できる。その原始関数の $\bar\partial$ 成分は零だから正則関数となり、実部を復元できる。

<!-- proof-start -->
### 証明

$u=\varphi-\psi$ とする。演算子の線形性により、最初の二条件はともに $\partial\bar\partial u=0$ と同値である。

$p$ を固定し、$U$ 内の小さい凸座標球 $V$ を取る。$\theta=\partial u$ は滑らかな複素数値1形式であり、[型別外微分の三つの恒等式](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)を使えば

$$
\begin{aligned}
d\theta
&=(\partial+\bar\partial)(\partial u)\\
&=\partial^2u+\bar\partial\partial u\\
&=-\partial\bar\partial u=0.
\end{aligned}
$$

よって[普通のPoincaré補題](../../GEO/GEO9/index.md#thm-geo9-poincare-lemma)を $\theta$ の実部・虚部それぞれへ適用して、滑らかな複素関数 $F$ で $dF=\theta$ を満たすものが得られる。左辺を型分解すると

$$
\partial F=\partial u,\qquad
\bar\partial F=0.
$$

[正則関数の判定](../../CM/CM2-02/index.md#prop-cm2-02-holomorphic-function)より $F$ は正則である。$u$ が実なので $\overline{\partial u}=\bar\partial u$、従って $d\bar F=\bar\partial u$。両式を足すと

$$
d(F+\bar F)=\partial u+\bar\partial u=du.
$$

$V$ は連結だから $u-(F+\bar F)$ は実定数 $c$ である。そこで $h=2F+c$ とすれば正則かつ $u=\operatorname{Re}h$。

逆向きには $h$ が正則なら $\bar\partial h=0$、$\partial\bar h=0$ であり、$\partial\bar\partial(h+\bar h)=0$。よって $\operatorname{Re}h$ を加えても形式は不変である。$\square$
<!-- proof-end -->

局所座標の重なり $U_a\cap U_b$ では、ポテンシャル $\varphi_a,\varphi_b$ の差は必ず多重調和となる。したがってポテンシャルそのものが一致しなくても、**二階微分で作った形式は一致できる**。この事実が後の射影空間における形式の貼り合わせで働く。

## 4. 正値性を関数の二階微分で判定する

閉形式を作れるだけではKähler計量にならない。[正の実(1,1)形式](../KAH1-02/index.md#def-kah1-02-positive-form)は、任意の零でない $(1,0)$ ベクトルに対して正の値を取る必要がある。なぜ二階微分の行列でこれを判定できるのか、座標基底で確認しよう。

正則座標の接ベクトルを $v=\sum_i v^i\partial/\partial z^i$ と書けば、$dz^i(v)=v^i$、$d\bar z^j(\bar v)=\overline{v^j}$、交差する二つの評価は零となる。[型別外微分の局所公式](../../CM/CM2-02/index.md#thm-cm2-02-local-formula)を用いて $\omega_\varphi=i\partial\bar\partial\varphi$ と置くと

$$
\begin{aligned}
\omega_\varphi
&=i\sum_{i,j}\varphi_{i\bar j}\,dz^i\wedge d\bar z^j,\\
-i\omega_\varphi(v,\bar v)
&=\sum_{i,j}\varphi_{i\bar j}v^i\overline{v^j}.
\end{aligned}
$$

したがって、この二階微分の配列は形式の係数行列そのものである。$\varphi$ が実関数なら、混合偏微分の交換と複素共役から $\varphi_{i\bar j}=\overline{\varphi_{j\bar i}}$ が成立する。[Hermite行列の正値性判定](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)により、**全ての**零でない $v$ で上式が正であることと形式の正値性が同値になる。この関数側の条件を強多重劣調和性と呼ぶ。

<a id="def-kah1-04-strict-psh"></a>

<!-- formal-statement-start -->
> **定義（強多重劣調和関数）**  
> 複素多様体 $X$ の開集合 $U$ 上の滑らかな実関数 $\varphi$ が**強多重劣調和**（strictly plurisubharmonic）であるとは、各点 $p\in U$ の正則座標で、任意の零でない $v=(v^1,\ldots,v^n)\in\mathbb C^n$ に対し

$$
\sum_{i,j=1}^n\varphi_{i\bar j}(p)\,
v^i\overline{v^j}>0
$$

> が成立することをいう。右辺の係数行列を $\varphi$ の**複素Hessian**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-04-strict-psh -->
**定義の確認**。$a\ge0$ に対して $\mathbb C^n$ 上の

$$
\varphi_a=\sum_{j=1}^n|z^j|^2+a|z^1|^4
$$

を考える。$|z^1|^4=((z^1)^2(\bar z^1)^2)$ なので、$\partial_{\bar1}|z^1|^4=2(z^1)^2\bar z^1$、さらに $\partial_1\partial_{\bar1}|z^1|^4=4|z^1|^2$。ほかの混合成分は零となる。よって

$$
(\varphi_{a,i\bar j})
=\operatorname{diag}(1+4a|z^1|^2,1,\ldots,1).
$$

任意の $v\ne0$ で

$$
\sum_{i,j}\varphi_{a,i\bar j}v^i\overline{v^j}
=(1+4a|z^1|^2)|v^1|^2
+\sum_{j=2}^n|v^j|^2>0
$$

である。特に $a>0$ では非定数の正値係数を持つKähler形式になる。二階微分の全成分と正値性を直接確認した。
<!-- definition-example-end -->

この判定が正則座標の選び方に依存しない理由も確かめる。$z=z(w)$ が正則な座標変換なら、$\partial_{\bar w^b}z^i=0$、$\partial_{w^a}\bar z^j=0$ なので、連鎖律は

$$
\frac{\partial^2\varphi}{\partial w^a\partial\bar w^b}
=\sum_{i,j}
\frac{\partial z^i}{\partial w^a}
\frac{\partial\bar z^j}{\partial\bar w^b}
\frac{\partial^2\varphi}{\partial z^i\partial\bar z^j}.
$$

$J^i{}_a=\partial z^i/\partial w^a$ とし、$w$ 座標での任意のベクトル $v=(v^a)$ に対して $u^i=\sum_aJ^i{}_av^a$ と置く。直前の変換式を二次形式へ代入すると

$$
\sum_{a,b}\varphi_{a\bar b}^{(w)}v^a\overline{v^b}
=\sum_{i,j}\varphi_{i\bar j}^{(z)}u^i\overline{u^j}.
$$

$J$ は正則座標変換の複素Jacobianで可逆なので、$v\ne0$ と $u\ne0$ は同値である。よってどちらの正則座標でも正値性の真偽は一致する。

<a id="prop-kah1-04-positive-equivalence"></a>

<!-- formal-statement-start -->
> **命題（強多重劣調和性と局所Kähler形式）**  
> 複素多様体 $X$ の開集合 $U$ 上の滑らかな実関数 $\varphi$ に対し、$\varphi$ が強多重劣調和である必要十分条件は、$\omega=i\partial\bar\partial\varphi$ が $U$ 上で正の実 $(1,1)$ 形式であることである。このとき $\omega$ は自動的に閉じ、$U$ 上のKähler形式となる。
<!-- formal-statement-end -->

### 証明の見取り図

実性と閉性は第2節で証明したので、残るのは正値性だけである。係数行列 $g_{i\bar j}$ と複素Hessianを同一視し、零でないベクトルでの値を比較する。

<!-- proof-start -->
### 証明

[局所公式](../../CM/CM2-02/index.md#thm-cm2-02-local-formula)から

$$
\omega=i\sum_{i,j}\varphi_{i\bar j}
\,dz^i\wedge d\bar z^j
$$

となる。従って $g_{i\bar j}=\varphi_{i\bar j}$ である。[Hermite行列による正値性判定](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)を適用すると、$\omega$ の正値性は

$$
-i\omega(v,\bar v)
=\sum_{i,j}\varphi_{i\bar j}v^i\overline{v^j}>0
$$

と同値であり、これは定義そのものである。実性と $d\omega=0$ は[局所ポテンシャル定理](#thm-kah1-04-local-existence)の逆方向で既に示した。$\square$
<!-- proof-end -->

強多重劣調和性と単なる閉性は違う。例えば $\mathbb C^2$ の $\varphi=|z^1|^2$ は $i\partial\bar\partial\varphi=i\,dz^1\wedge d\bar z^1$ を与えるが、$v=(0,1)$ では $-i\omega(v,\bar v)=0$ である。閉形式ではあるものの、計量としての正値性（非退化性）が失われている。

## 5. 局所で作れても大域で一つにはならない

局所ポテンシャルの存在から、複素多様体全体に単一の実関数が存在するとは言えない。具体的に、[格子商の正則アトラス](../../CM/CM1-09/index.md#thm-cm1-09-quotient-atlas)を持つ複素トーラス

$$
T=\mathbb C/(\mathbb Z+i\mathbb Z)
$$

を考える。$\mathbb C$ 上の平行移動不変な形式

$$
\omega=\frac i2\,dz\wedge d\bar z=dx\wedge dy
$$

は $T$ に降りる。実際、格子平行移動 $\tau_\lambda(z)=z+\lambda$ の下で $\tau_\lambda^*dz=dz$、$\tau_\lambda^*d\bar z=d\bar z$ なので、形式の係数と外積は変わらない。$\varphi_0(z)=|z|^2/2$ は被覆空間上のポテンシャルだが、格子ベクトル $\lambda$ に対して

$$
\begin{aligned}
\varphi_0(z+\lambda)-\varphi_0(z)
&=\frac{|z+\lambda|^2-|z|^2}{2}\\
&=\operatorname{Re}(\bar\lambda z)+\frac{|\lambda|^2}{2}
\end{aligned}
$$

なので、$\varphi_0$ 自身は格子周期関数ではない。一方この差は正則関数 $\bar\lambda z+|\lambda|^2/2$ の実部で、混合二階微分が消える。**形式は貼り合うが、関数は貼り合わない**例である。

<a id="prop-kah1-04-torus-obstruction"></a>

<!-- formal-statement-start -->
> **命題（平坦複素トーラスに大域ポテンシャルはない）**  
> 次の平坦複素トーラス $T$ と、その上のKähler形式 $\omega$ を考える。

$$
T=\mathbb C/(\mathbb Z+i\mathbb Z),
\qquad \omega=dx\wedge dy.
$$

> $T$ 全体で定義された滑らかな実関数 $\varphi$ で、次の等式を満たすものは存在しない。

$$
\omega=i\partial\bar\partial\varphi.
$$
<!-- formal-statement-end -->

### 証明の見取り図

大域ポテンシャルがあれば、$\omega$ は実1形式の外微分になる。しかしトーラスの面積は正である。境界のないコンパクト多様体上の完全2形式の積分は[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で零になるため矛盾する。

<!-- proof-start -->
### 証明

大域的な $\varphi$ が存在すると仮定する。実1形式

$$
\eta=\frac i2(\bar\partial\varphi-\partial\varphi)
$$

を $T$ 上に定められる。$\varphi$ が実であるため、$\bar\eta=\eta$ である。また

$$
\begin{aligned}
d\eta
&=\frac i2\bigl((\partial+\bar\partial)
  (\bar\partial\varphi-\partial\varphi)\bigr)\\
&=\frac i2(\partial\bar\partial\varphi
 -\bar\partial\partial\varphi)\\
&=i\partial\bar\partial\varphi=\omega.
\end{aligned}
$$

[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)は、向き付けられたコンパクトで境界のない $T$ に対して $\int_Td\eta=0$ を与える。ところが辺長1の正方形 $[0,1]\times[0,1]$ で

$$
\int_T\omega
=\int_0^1\int_0^1dx\,dy=1>0.
$$

したがって $0=\int_Td\eta=\int_T\omega=1$ となり矛盾する。$\square$
<!-- proof-end -->

局所性と大域性の区別は、ポテンシャルの差が**局所的**に正則関数の実部になるという前節の定理にも現れていた。後で射影空間や大域Kähler類を扱う際も、この区別を保つ。

## 6. 演習：局所微分・自由度・正値性・大域障害

### Level A

<a id="ex-kah1-04-a01"></a>
#### KAH1-04-A01 混合二階微分と正値性
- Level: A

$\mathbb C^2$ 上で $\varphi=2|z^1|^2+3|z^2|^2+z^1\bar z^2+\bar z^1z^2$ とする。複素Hessianを求め、$i\partial\bar\partial\varphi$ がKähler形式であることを確かめよ。

<!-- solution-start -->
**詳細解答**。$\partial_{\bar1}\varphi=2z^1+z^2$、$\partial_{\bar2}\varphi=3z^2+z^1$ だから、それぞれを $z^1,z^2$ で微分すると

$$
(\varphi_{i\bar j})=
\begin{pmatrix}2&1\\1&3\end{pmatrix}.
$$

$v=(v^1,v^2)$ に対して

$$
\begin{aligned}
\sum_{i,j}\varphi_{i\bar j}v^i\overline{v^j}
&=2|v^1|^2+2\operatorname{Re}(v^1\overline{v^2})+3|v^2|^2\\
&=|v^1+v^2|^2+|v^1|^2+2|v^2|^2>0
\end{aligned}
$$

が $v\ne0$ で成立する。よって[強多重劣調和性と局所Kähler形式](#prop-kah1-04-positive-equivalence)よりKähler形式である。閉性も同命題に含まれ、混合微分から作ったことが理由である。
<!-- solution-end -->

<a id="ex-kah1-04-a02"></a>
#### KAH1-04-A02 正則関数を加えたときの不変性
- Level: A

$\mathbb C^2$ 上で $\psi=\varphi+2\operatorname{Re}((z^1)^2+iz^2)$ とする。$\varphi$ が任意の滑らかな実関数であるとき、$i\partial\bar\partial\psi=i\partial\bar\partial\varphi$ を直接示せ。

<!-- solution-start -->
**詳細解答**。$h=(z^1)^2+iz^2$ は正則である。加えた実関数を

$$
u=h+\bar h=(z^1)^2+(\bar z^1)^2+iz^2-i\bar z^2
$$

と書く。$\partial_{\bar1}u=2\bar z^1$、$\partial_{\bar2}u=-i$ だから、どちらを $z^1,z^2$ で微分しても零。従って $\partial\bar\partial u=0$ であり、

$$
i\partial\bar\partial\psi
=i\partial\bar\partial\varphi+i\partial\bar\partial u
=i\partial\bar\partial\varphi.
$$

[ポテンシャルの差の定理](#thm-kah1-04-gauge)を具体的に検算した。
<!-- solution-end -->

<a id="ex-kah1-04-a03"></a>
#### KAH1-04-A03 調和性と多重調和性を区別する
- Level: A

$u(z^1,z^2)=|z^1|^2-|z^2|^2$ について、実EuclidのLaplacian $\Delta$ は零だが $\partial\bar\partial u\ne0$ であることを示せ。

<!-- solution-start -->
**詳細解答**。$z^j=x^j+iy^j$ なので

$$
u=(x^1)^2+(y^1)^2-(x^2)^2-(y^2)^2.
$$

四つの実二階微分は順に $2,2,-2,-2$ となり、和は $\Delta u=0$。一方

$$
\partial_{\bar1}u=z^1,\qquad
\partial_{\bar2}u=-z^2
$$

より、$\partial_1\partial_{\bar1}u=1$、$\partial_2\partial_{\bar2}u=-1$。したがって

$$
\partial\bar\partial u
=dz^1\wedge d\bar z^1-dz^2\wedge d\bar z^2\ne0.
$$

調和性は二階微分の和の消滅、多重調和性は各混合成分の消滅であり、後者のほうが強い。
<!-- solution-end -->

<a id="ex-kah1-04-a04"></a>
#### KAH1-04-A04 強多重劣調和性の成立範囲
- Level: A

$\mathbb C$ 上の実関数 $\varphi_a(z)=|z|^2+a|z|^4$（$a\in\mathbb R$）について、強多重劣調和となる点の集合を求めよ。

<!-- solution-start -->
**詳細解答**。$\partial_{\bar z}|z|^2=z$、$\partial_{\bar z}|z|^4=2z^2\bar z$ なので

$$
\partial_z\partial_{\bar z}\varphi_a
=1+4a|z|^2.
$$

複素次元1では、零でないベクトル $v\in\mathbb C$ の評価は $(1+4a|z|^2)|v|^2$ となる。従って $a\ge0$ なら全平面で正、$a<0$ なら

$$
|z|^2<-\frac1{4a}
$$

の開円板上でのみ正である。境界は係数が零になり非退化性を失い、その外では負になる。$a<0$ で「局所的にはKähler」でも「全平面でKähler」とはならない。
<!-- solution-end -->

### Level B

<a id="ex-kah1-04-b01"></a>
#### KAH1-04-B01 二つの補題による実ポテンシャルの復元
- Level: B

$\mathbb C$ で $\omega=(i/2)\,dz\wedge d\bar z$ を考える。実1形式 $\alpha=(i/4)(z\,d\bar z-\bar z\,dz)$ について、$d\alpha=\omega$ を確かめ、$\beta=\alpha^{0,1}$ の $\bar\partial$ 原始関数 $f$ を一つ求めよ。さらに $\varphi=2\operatorname{Im}f$ が $\omega$ のポテンシャルとなることを示せ。

<!-- solution-start -->
**詳細解答**。$d(z\,d\bar z)=dz\wedge d\bar z$、$d(\bar z\,dz)=d\bar z\wedge dz=-dz\wedge d\bar z$ だから

$$
d\alpha=\frac i4(2\,dz\wedge d\bar z)
=\frac i2\,dz\wedge d\bar z=\omega.
$$

$\beta=(i/4)z\,d\bar z$ は $(0,1)$ 形式である。$f=(i/4)z\bar z$ と置けば、[関数に作用する偏微分作用素](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)を用い、$z$ を固定して $\bar z$ で微分すれば

$$
\bar\partial f=\frac i4 z\,d\bar z=\beta.
$$

$|z|^2$ は実数だから $\operatorname{Im}f=|z|^2/4$、ゆえに $\varphi=|z|^2/2$。最終確認として

$$
i\partial\bar\partial\varphi
=i\partial\left(\frac z2\,d\bar z\right)
=\frac i2dz\wedge d\bar z=\omega.
$$

[局所存在定理](#thm-kah1-04-local-existence)の構成で、1形式→複素関数→実関数という三段を実行できた。
<!-- solution-end -->

<a id="ex-kah1-04-b02"></a>
#### KAH1-04-B02 多重調和なら局所的に正則関数の実部
- Level: B

凸な正則座標球 $B\subset\mathbb C^n$ 上の滑らかな実関数 $u$ が $\partial\bar\partial u=0$ を満たすとする。$\theta=\partial u$ が閉1形式であることを示し、その原始関数から $u=\operatorname{Re}h$ となる正則関数 $h$ を構成せよ。

<!-- solution-start -->
**詳細解答**。型別外微分の関係式より

$$
d\theta=(\partial+\bar\partial)\partial u
=\partial^2u+\bar\partial\partial u
=-\partial\bar\partial u=0.
$$

凸球上なので[微分形式のPoincaré補題](../../GEO/GEO9/index.md#thm-geo9-poincare-lemma)を $\operatorname{Re}\theta,\operatorname{Im}\theta$ へ個別に使える。滑らかな複素関数 $F$ を得て $dF=\theta$ とできる。$\theta$ は $(1,0)$ 型だから $\bar\partial F=0$、従って $F$ は正則である。さらに

$$
d(F+\bar F)=dF+d\bar F
=\partial u+\overline{\partial u}
=\partial u+\bar\partial u=du.
$$

$B$ は連結であり、$u=F+\bar F+c$（$c\in\mathbb R$）。$h=2F+c$ と置けば $\operatorname{Re}h=u$。この証明は「$u$ が普通の調和関数」という弱い条件からは出せない。
<!-- solution-end -->

<a id="ex-kah1-04-b03"></a>
#### KAH1-04-B03 局所的な正則実部が大域では存在しない例
- Level: B

$U=\mathbb C\setminus\{0\}$ 上の $u(z)=\log|z|^2$ が多重調和であることを示せ。また $u=\operatorname{Re}h$ を $U$ 全体で満たす一価正則関数 $h$ は存在しないことを示せ。

<!-- solution-start -->
**詳細解答**。$z\ne0$ なら $u=\log(z\bar z)$ で、

$$
\partial_{\bar z}u=\frac1{\bar z},
\qquad
\partial_z\partial_{\bar z}u=0.
$$

従って $u$ は多重調和である。仮に $u=\operatorname{Re}h=(h+\bar h)/2$ を $U$ 全体で満たす正則 $h$ があれば、$\partial u=dz/z$ かつ $\partial\bar h=0$ なので

$$
\frac{h'(z)}2\,dz=\partial u=\frac{dz}{z},
\qquad
h'(z)=\frac2z.
$$

単位円 $\gamma(t)=e^{it}$（$0\le t\le2\pi$）に沿って積分すると、左辺は $h$ が一価の原始関数であるため $\int_\gamma h'(z)\,dz=0$。右辺は

$$
\int_\gamma\frac2z\,dz
=\int_0^{2\pi}2i\,dt=4\pi i\ne0
$$

で矛盾する。各点の小円板には正則対数の枝があるが、大域にはない。[差の定理](#thm-kah1-04-gauge)は**局所**での正則関数を主張していることが確認できる。
<!-- solution-end -->

### Level C

<a id="ex-kah1-04-c01"></a>
#### KAH1-04-C01 放射対称ポテンシャルの分類
- Level: C

$n\ge2$ とし、$\mathbb C^n$ の原点中心の開球 $B_R$（$0<R\le\infty$）で $s=\sum_j|z^j|^2$ と置く。$F:[0,R^2)\to\mathbb R$ は滑らかで、$\varphi(z)=F(s)$ も滑らかとする。

1. 複素Hessianの成分を求め、$z\ne0$ における半径方向とその直交方向の固有値を計算せよ。
2. $\varphi$ が強多重劣調和である必要十分条件を、$F',F''$ で述べよ。原点の条件も含めよ。
3. $F(s)=\log(1+s)$ の場合を判定し、任意の正則関数 $h$ に対して $\varphi+\operatorname{Re}h$ が同じKähler形式を与えることを確認せよ。

<!-- solution-start -->
**詳細解答**。最初に $s=\sum_jz^j\bar z^j$ から $\partial_{\bar j}s=z^j$、$\partial_i s=\bar z^i$ を求める。連鎖律を二回用いると

$$
\partial_{\bar j}\varphi=F'(s)z^j,
\qquad
\varphi_{i\bar j}
=\partial_i(F'(s)z^j)
=F''(s)\bar z^i z^j+F'(s)\delta_{ij}.
$$

任意の $v\in\mathbb C^n$ に対する二次形式は

$$
\begin{aligned}
Q_z(v)
&=\sum_{i,j}\varphi_{i\bar j}v^i\overline{v^j}\\
&=F'(s)\lVert v\rVert^2
+F''(s)\left|\sum_i\bar z^i v^i\right|^2.
\end{aligned}
$$

$z\ne0$ の場合、$\sum_i\bar z^i v^i=0$ となる複素次元 $n-1$ の直交方向には固有値 $F'(s)$ が現れる。半径方向 $v=z$ では $\sum_i\bar z^i z^i=s$、$\lVert z\rVert^2=s$ なので

$$
Q_z(z)=sF'(s)+s^2F''(s)
=s\{F'(s)+sF''(s)\}.
$$

従って半径方向の固有値は $F'(s)+sF''(s)$ となる。$n\ge2$ としたのは直交方向にも零でないベクトルが存在するためである。原点では $(\varphi_{i\bar j})(0)=F'(0)I_n$。ゆえに必要十分条件は

$$
F'(0)>0,\quad
F'(s)>0,\quad
F'(s)+sF''(s)>0
\qquad(0<s<R^2).
$$

$F(s)=\log(1+s)$ について実際に微分すると

$$
F'(s)=\frac1{1+s},\qquad
F''(s)=-\frac1{(1+s)^2},\qquad
F'(s)+sF''(s)=\frac1{(1+s)^2}>0.
$$

従って全 $\mathbb C^n$ 上で強多重劣調和である。[強多重劣調和性と局所Kähler形式](#prop-kah1-04-positive-equivalence)から $i\partial\bar\partial\varphi$ はKähler形式になる。最後に、正則 $h$ について

$$
\partial\bar\partial(\varphi+\operatorname{Re}h)
=\partial\bar\partial\varphi+\frac12
(\partial\bar\partial h+\partial\bar\partial\bar h)
=\partial\bar\partial\varphi
$$

であり、[ポテンシャル差の定理](#thm-kah1-04-gauge)とも一致する。この例が後の射影空間上の局所構成につながる。$\square$
<!-- solution-end -->

## 7. 本章で得た見通し

Kähler条件 $d\omega=0$ は、局所的には一つの実関数の混合二階微分へ還元できる。その存在には**通常のPoincaré補題**と**局所bar∂-Poincaré補題**の両方が必要だった。また、ポテンシャルは一意ではなく、差は多重調和関数となる。正値性はそれとは独立で、複素Hessianが正定値かどうかで判定する。

平坦複素トーラスは、局所ポテンシャルがすべて存在しても、大域的に一つのポテンシャルを選べないことを示した。次章では、こうした局所模型を積・部分多様体・格子商でどのように組み合わせられるかを扱う。
