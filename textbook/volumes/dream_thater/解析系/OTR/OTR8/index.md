# OTR8 輸送費用は距離になるか

<!-- definition-example-audit: strict -->

## 1. 安く運べることと「近い」ことは同じか

[OTR7 の支持集合による最適性判定](../OTR7/index.md#thm-otr7-support-optimality)で、どの結合が最も安いかを判定できるようになりました。しかし費用の最小値が二つの確率分布の「距離」になるには、別の問題があります。点の距離なら、A から C へ直接行く距離は、B を経由する距離を超えません。**分布の輸送にも三角不等式があるでしょうか。**

まず実数直線の点 $a,b$ にそれぞれ全質量がある二つの確率測度 $\delta_a,\delta_b$ を考えます。[結合測度](../OTR2/index.md#def-otr2-coupling)は $\delta_{(a,b)}$ に限られるので、費用 $|x-y|^p$ の最小値は $|a-b|^p$ です。ここから $p$ 乗根を取れば元の点の距離 $|a-b|$ に戻ります。

この章では $p\ge1$ を固定し、非空の **Polish空間**（完備可分距離空間）$(X,d)$ を基本仮定とします。[Polish空間の定義](../OTR3/index.md#def-otr3-polish)と[狭義収束の定義](../OTR3/index.md#def-otr3-narrow)は既習です。輸送費用そのものと、その $p$ 乗根を区別します。

## 2. どの分布同士でも有限の距離になるわけではない

確率測度 $\mu$ が無限遠へ少量の質量を広げていると、$d(x,y)^p$ の積分が発散する可能性があります。そこで、基準点 $o$ からの距離の $p$ 乗が積分可能な確率測度に対象を限定します。これが有限 $p$ 次モーメントという条件です。基準点は計算のために選ぶだけで、本来はどの点を選んでも同じクラスになってほしいところです。

<a id="def-otr8-p-moment"></a>

<!-- formal-statement-start -->
> **定義（有限p次モーメントとP_p(X)）**
> $(X,d)$ を非空の距離空間、$p\ge1$、$o\in X$ とする。Borel 確率測度 $\mu$ が基準点 $o$ に関して有限 $p$ 次モーメントを持つとは、次の積分が有限であることをいう。

$$
\int_X d(x,o)^p\,d\mu(x)<\infty.
$$

> この条件を満たす Borel 確率測度の全体を $\mathcal P_p(X)$ と書く。基準点を変えても集合は変わらないことを次の命題で示す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr8-p-moment -->
### 定義の確認：原子測度と基準点

**定義の確認**：確率測度であることと、基準点からの $p$ 次距離の積分が有限であることを直接確かめます。

$X=\mathbb R$、$d(x,y)=|x-y|$ とします。$\mu=\frac14\delta_{-2}+\frac34\delta_2$ の基準点 $o=0$ に関する積分は

$$
\int |x|^p\,d\mu(x)=\tfrac14\,2^p+\tfrac34\,2^p=2^p<\infty.
$$

従って $\mu\in\mathcal P_p(\mathbb R)$ です。基準点を $o=1$ に替えると

$$
\int |x-1|^p\,d\mu(x)=\tfrac14\,3^p+\tfrac34\,1^p<\infty
$$

となり、値は変わっても有限性は保たれます。確率測度であること、台が実数上の二点にあること、積分の有限性という各条件を確認しました。
<!-- definition-example-end -->

基準点を替えた場合の不変性は、距離の三角不等式と次の初等評価で証明できます。非負数 $a,b$ に対し $a+b\le2\max(a,b)$ からも粗い上界は得られますが、ここでは標準の係数を示します。

<a id="prop-otr8-basepoint"></a>

<!-- formal-statement-start -->
> **命題（モーメント基準点の不変性）**
> $(X,d)$ を非空の距離空間、$p\ge1$、$o,o'\in X$ とする。任意の Borel 確率測度 $\mu$ について次の二条件は同値である。
>
> 1. $\int d(x,o)^p\,d\mu(x)<\infty$。
> 2. $\int d(x,o')^p\,d\mu(x)<\infty$。
<!-- formal-statement-end -->

### 証明の見取り図

点の三角不等式で $d(x,o')$ を $d(x,o)$ と定数 $d(o,o')$ で抑え、$p$ 乗して積分します。逆向きには二つの基準点を入れ替えます。

<!-- proof-start -->
### 証明

$a,b\ge0$ に対し、$t\mapsto t^p$ の凸性から

$$
(a+b)^p=2^p\left(\frac{a+b}{2}\right)^p
\le 2^{p-1}(a^p+b^p).
$$

$d(x,o')\le d(x,o)+d(o,o')$ にこの評価を適用すると

$$
d(x,o')^p\le
2^{p-1}d(x,o)^p+2^{p-1}d(o,o')^p.
$$

両辺を $\mu$ で積分します。$\mu(X)=1$ なので

$$
\int d(x,o')^p\,d\mu
\le 2^{p-1}\int d(x,o)^p\,d\mu
+2^{p-1}d(o,o')^p.
$$

右辺が有限なら左辺も有限です。$o$ と $o'$ を交換すれば逆も成立します。$\square$
<!-- proof-end -->

この条件のおかげで、$\mathcal P_p(X)$ には原子分布だけでなく、十分速く尾が減衰する連続分布も入ります。一方、すべての確率測度が入るとは限りません。後の反例でその境界を確認します。

## 3. $p$ 乗根を取って輸送費用を距離の候補にする

二つの確率測度 $\mu,\nu$ を結ぶ[許容結合](../OTR2/index.md#def-otr2-coupling) $\pi$ は、$X\times X$ 上の確率測度で、第一・第二周辺がそれぞれ $\mu,\nu$ のものです。その全体を $\Pi(\mu,\nu)$ と書きます。このうち $d(x,y)^p$ の平均を最小化し、その $p$ 乗根を取ります。

<a id="def-otr8-wasserstein"></a>

<!-- formal-statement-start -->
> **定義（p-Wasserstein距離）**
> $(X,d)$ を非空の Polish 空間、$p\ge1$、$\mu,\nu\in\mathcal P_p(X)$ とする。このとき **$p$-Wasserstein距離** の候補を次の式で定める。

$$
W_p(\mu,\nu)=
\left(\inf_{\pi\in\Pi(\mu,\nu)}
\int_{X\times X}d(x,y)^p\,d\pi(x,y)\right)^{1/p}.
$$

> 最小値を与える結合を最適結合という。これが有限な実数であり、距離公理を満たすことは後で証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr8-wasserstein -->
### 定義の確認：一つの到着点に全質量を集める

**定義の確認**：両測度が $\mathcal P_p$ に属すること、結合が正しい周辺を持つこと、費用の下限を実現することを順に確かめます。

$X=\mathbb R$ とし、$\mu=\frac12\delta_0+\frac12\delta_2$、$\nu=\delta_0$ とします。両者は有限個の点に集中するため、[有限p次モーメントの定義](#def-otr8-p-moment)から $\mathcal P_p(\mathbb R)$ に属します。第二周辺が $\delta_0$ である結合は必ず

$$
\pi=\tfrac12\delta_{(0,0)}+\tfrac12\delta_{(2,0)}
$$

です。第一周辺も $\mu$ なので $\pi\in\Pi(\mu,\nu)$ が確認できます。ほかに許容結合はなく、よって

$$
W_p(\mu,\nu)^p
=\tfrac12|0-0|^p+\tfrac12|2-0|^p=2^{p-1}.
$$

特に $W_1(\mu,\nu)=1$、$W_2(\mu,\nu)=\sqrt2$ です。同じ分布の組でも $p$ によって距離の値は変わります。**根号を取る前の最小費用 $W_p^p$ と距離 $W_p$ を混同しない**ことが重要です。
<!-- definition-example-end -->

なお [積結合の存在](../OTR2/index.md#prop-otr2-nonempty)によって $\Pi(\mu,\nu)$ は空ではありません。$o\in X$ に対して $d(x,y)\le d(x,o)+d(o,y)$ なので、前節で用いた $p$ 乗評価を積分すると

$$
\int d(x,y)^p\,d(\mu\otimes\nu)
\le2^{p-1}\left(\int d(x,o)^p\,d\mu
+\int d(y,o)^p\,d\nu\right)<\infty.
$$

よって定義式の下限は $0$ 以上の有限値です。さらに $d^p$ は連続かつ非負であり、$X$ は Polish なので、[OTR3 の最適結合存在定理](../OTR3/index.md#thm-otr3-polish)を費用 $c=d^p$ に適用できます。ここで有限値は積結合が保証しているため、**最適結合は実際に存在します**。

## 4. 二段階の輸送を一つの確率実験にできるか

$\mu$ から $\nu$ への結合と、$\nu$ から $\eta$ への結合が与えられたとします。$\mu$ の点を $x$、途中の $\nu$ の点を $y$、最後の $\eta$ の点を $z$ とすれば、点の距離には

$$
d(x,z)\le d(x,y)+d(y,z)
$$

があります。しかし二つの結合は別々の確率測度なので、そのままでは同じ標本 $(x,y,z)$ に対する不等式として積分できません。途中の分布が一致することを使い、二つの結合を一つの三変数の確率測度へまとめる必要があります。これが結合の**貼り合わせ**です。

まず有限集合上で仕組みを確かめます。$\nu$ の点 $y$ に質量 $b_y>0$ があるとき、前段の結合 $\pi(x,y)$ と後段の結合 $\sigma(y,z)$ から

$$
\lambda(x,y,z)=\frac{\pi(x,y)\sigma(y,z)}{b_y}
$$

と置けばよさそうです。$y$ が共通なので、分子に二度数えられた $b_y$ を一度取り除きます。実際、後段を全 $z$ で和を取れば $\sum_z\sigma(y,z)=b_y$ なので $\sum_z\lambda(x,y,z)=\pi(x,y)$ となります。同様に $\sum_x\lambda(x,y,z)=\sigma(y,z)$ です。$b_y=0$ の項は両結合でも質量ゼロなので省きます。

### 有限二点の直接例

$X=Y=Z=\{0,1\}$、$\mu=\nu=\eta=(\delta_0+\delta_1)/2$ とします。第一段では $x=y$、第二段では $z=1-y$ にそれぞれ質量を $1/2$ ずつ置きます。有限集合上の上の式では $b_0=b_1=1/2$ で、

$$
\lambda=\tfrac12\delta_{(0,0,1)}
+\tfrac12\delta_{(1,1,0)}.
$$

$(x,y)$ だけを見ると元の対角結合、$(y,z)$ だけを見ると元の反転結合に戻ります。三変数全体の和は $1$ です。

一般の Polish 空間では、途中の点 $y$ は連続的に動き、単一の点の質量は $0$ かもしれません。そこで $y$ の空間を小さな Borel 集合へ分割し、上の有限式を各集合で行ってから分割を細かくします。条件付き確率の存在を別途仮定する必要はありません。

<a id="lem-otr8-gluing"></a>

<!-- formal-statement-start -->
> **補題（結合の貼り合わせ補題）**
> $X,Y,Z$ を非空の Polish 空間とし、それぞれの Borel 確率測度を $\mu,\nu,\eta$ とする。$\pi\in\Pi(\mu,\nu)$ は $X\times Y$ 上、$\sigma\in\Pi(\nu,\eta)$ は $Y\times Z$ 上の結合とする。このとき $X\times Y\times Z$ 上の Borel 確率測度 $\gamma$ が存在し、$(x,y)$ 周辺は $\pi$、$(y,z)$ 周辺は $\sigma$ である。
<!-- formal-statement-end -->

### 証明の見取り図

1. 中間空間 $Y$ を、ほとんどの質量を含む直径の小さい有限個の集合と小質量の残余集合に分けます。
2. 各集合内で二つの結合の制限を掛け、共通する集合の $\nu$ 質量で割ります。これで中間点 $y,y'$ を二つ持つ四変数の確率測度を作ります。
3. 二つの中間点の距離が確率的に $0$ へ近づくことと、[Prokhorovのコンパクト性定理](../OTR3/index.md#thm-otr3-prokhorov)で得られる極限から $y=y'$ を実現します。

<!-- proof-start -->
### 証明

**（1）直径の小さい分割。** $n\ge1$ を固定します。[Polish空間上の確率測度の緊密性](../OTR3/index.md#lem-otr3-polish-tight)により、コンパクト集合 $K_n\subset Y$ で $\nu(K_n)>1-1/n$ となるものが取れます（$n=1$ は任意の非空コンパクトでよい）。$K_n$ を半径 $1/(3n)$ の開球で覆い、コンパクト性により有限部分被覆を選びます。

その開球を順に差し引いて、互いに交わらない Borel 集合 $B_{n,1},\ldots,B_{n,m_n}$ を作ります。各集合は一つの開球に含まれるので直径は $2/(3n)<1/n$ です。残余 $B_{n,0}$ を $Y$ の残りとすると、$K_n$ が有限個の集合の合併に含まれるため

$$
\nu(B_{n,0})\le\nu(Y\setminus K_n)<\frac1n.
$$

空集合は除き、各セルの重みを $w_{n,i}=\nu(B_{n,i})$ とします。

**（2）四変数の結合。** 座標順を $(x,y,y',z)\in X\times Y\times Y\times Z$ とします。$w_{n,i}>0$ のセルについて、二つの結合を中間座標がそのセルにある部分へ制限し、次の有限和で確率測度 $\lambda_n$ を作ります。

$$
\lambda_n(dx,dy,dy',dz)
=\sum_{i:\,w_{n,i}>0}
\frac{\mathbf{1}_{B_{n,i}}(y)\mathbf{1}_{B_{n,i}}(y')}
{w_{n,i}}\,\pi(dx,dy)\,\sigma(dy',dz).
$$

各項の全質量は $w_{n,i}^2/w_{n,i}=w_{n,i}$、その和は $\sum_iw_{n,i}=1$ です。$w_{n,i}=0$ のセルでは両結合の中間周辺が $0$ なので、項を省いても問題ありません。

$y',z$ を積分すると $\sigma(Y\cap B_{n,i},Z)=w_{n,i}$ が分母を打ち消します。従って

$$
(\mathrm{pr}_{x,y})_{\#}\lambda_n
=\sum_i \mathbf{1}_{B_{n,i}}(y)\,\pi(dx,dy)=\pi.
$$

同じ理由で $(\mathrm{pr}_{y',z})_{\#}\lambda_n=\sigma$ です。特に四座標それぞれの周辺は常に $\mu,\nu,\nu,\eta$ であり、$n$ に依存しません。

**（3）極限で中間点を一致させる。** 四つの固定周辺はそれぞれ緊密です。任意の $\varepsilon>0$ に対して各周辺で質量が $1-\varepsilon/4$ より大きいコンパクト集合を選ぶと、その四つの直積の外側の $\lambda_n$ 質量は高々 $\varepsilon$ です。よって $(\lambda_n)$ は一様緊密です。有限個の Polish 空間の直積も Polish なので、[Prokhorovのコンパクト性定理](../OTR3/index.md#thm-otr3-prokhorov)から部分列 $\lambda_{n_k}$ が Borel 確率測度 $\lambda$ に狭義収束します。

残余以外では $y,y'$ は同じ直径 $1/n$ 未満のセルに属するため、

$$
\lambda_n\{d_Y(y,y')>1/n\}\le\nu(B_{n,0})<1/n.
$$

任意の $r>0$ を固定すると、十分大きい $k$ では $1/n_k<r$ なので $\lambda_{n_k}\{d_Y(y,y')>r\}\le1/n_k\to0$ です。$d_Y$ は連続で $O_r=\{d_Y(y,y')>r\}$ は開集合です。

ここで狭義収束の開集合評価を確認します。一般に確率測度 $\rho_k\Rightarrow\rho$ と開集合 $O$ に対し、$O$ の補集合への距離から作った有界連続関数

$$
f_m(s)=\min\{1,m\,d(s,O^c)\}
$$

は $0\le f_m\le\mathbf{1}_O$、$f_m\uparrow\mathbf{1}_O$ を満たします（$O$ が全空間なら $f_m=1$ とします）。従って狭義収束と単調収束により

$$
\rho(O)=\lim_{m\to\infty}\int f_m\,d\rho
\le\liminf_{k\to\infty}\rho_k(O).
$$

これを $O=O_r$ に適用すると

$$
\lambda\{d_Y(y,y')>r\}
\le\liminf_{k\to\infty}
\lambda_{n_k}\{d_Y(y,y')>r\}=0.
$$

$r=1,1/2,1/3,\ldots$ とすれば $\lambda(y=y')=1$ です。射影写像は連続なので狭義極限に対して周辺を取る操作も保たれ、$(x,y)$ 周辺は $\pi$、$(y',z)$ 周辺は $\sigma$ のままです。最後に $\lambda$ を $(x,y,y',z)\mapsto(x,y,z)$ で押し出して $\gamma$ とします。$y=y'$ が $\lambda$-ほとんど確実に成立するため、$\gamma$ の $(y,z)$ 周辺も $\sigma$ です。$\square$
<!-- proof-end -->

この補題は最適結合に限りません。**同じ中間周辺 $\nu$ を持つ任意の二つの結合**をつなげます。また $\gamma$ は必ずしも一意ではありません。三つの変数の相関の自由度が残るからです。

## 5. 三角不等式を得るための $L^p$ の計算

貼り合わせた三変数の上で点の三角不等式を積分するとき、$p$ 乗根が外にあります。したがって単に両辺を $p$ 乗して積分するだけでは足りず、二つの非負関数の和の $p$ 次平均を、それぞれの $p$ 次平均の和で抑える必要があります。次の補題がその評価を与えます。

<a id="lem-otr8-minkowski"></a>

<!-- formal-statement-start -->
> **補題（積分のMinkowski不等式）**
> $(\Omega,\mathcal F,P)$ を確率空間、$p\ge1$ とする。可測な実数値関数 $A,B$ が $\int|A|^p\,dP<\infty$、$\int|B|^p\,dP<\infty$ を満たすなら、次が成り立つ。

$$
\left(\int|A+B|^p\,dP\right)^{1/p}
\le \left(\int|A|^p\,dP\right)^{1/p}
+\left(\int|B|^p\,dP\right)^{1/p}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$p=1$ は点ごとの三角不等式です。$p>1$ では $|A+B|^p$ を二項へ分け、Hölder 不等式をそれぞれへ適用します。Hölder の根拠も以下で確認します。

<!-- proof-start -->
### 証明

$p=1$ の場合は $|A+B|\le|A|+|B|$ を積分して終わりです。以下 $p>1$、$q=p/(p-1)$ と置くと $1/p+1/q=1$ です。

まず Young の不等式 $uv\le u^p/p+v^q/q$（$u,v\ge0$）を確認します。$v$ を固定した関数 $u\mapsto u^p/p-uv+v^q/q$ は凸で、導関数 $u^{p-1}-v$ が $0$ となる $u=v^{1/(p-1)}$ で最小値 $0$ になります。したがって不等式が成立します。

可測関数 $F,G$ のノルムが非零有限なら、$u=|F|/\|F\|_p$、$v=|G|/\|G\|_q$ に Young の不等式を適用し積分すると

$$
\int\frac{|FG|}{\|F\|_p\|G\|_q}\,dP
\le\frac1p\int u^p\,dP+\frac1q\int v^q\,dP
=\frac1p+\frac1q=1.
$$

これが Hölder 不等式です。ノルムが $0$ の場合は対応する関数が $0$ ほとんど確実なので同様です。

$S=\bigl(\int|A+B|^p\,dP\bigr)^{1/p}$ と置きます。$|A+B|^p\le(|A|+|B|)|A+B|^{p-1}$ を積分し、Hölder を $F=|A|$ と $G=|A+B|^{p-1}$、さらに $F=|B|$ と同じ $G$ に適用すると

$$
\begin{aligned}
S^p
&\le\int|A||A+B|^{p-1}\,dP
+\int|B||A+B|^{p-1}\,dP\\
&\le(\|A\|_p+\|B\|_p)
\left(\int|A+B|^{(p-1)q}\,dP\right)^{1/q}\\
&=(\|A\|_p+\|B\|_p)S^{p-1}.
\end{aligned}
$$

ここで $(p-1)q=p$ を使いました。$S$ は $|A+B|\le|A|+|B|$ と $p$ 乗評価から有限です。$S=0$ なら主張は自明、$S>0$ なら $S^{p-1}$ で割り、目的の評価を得ます。$\square$
<!-- proof-end -->

## 6. 最小輸送費用は本当に距離になる

いよいよ、$\mathcal P_p(X)$ で距離の四条件（非負性、同一性、対称性、三角不等式）を検証します。最も大きな壁は三角不等式で、[貼り合わせ補題](#lem-otr8-gluing)で同じ $y$ を持つ三変数を作り、[Minkowski不等式](#lem-otr8-minkowski)をそこで適用します。

<a id="thm-otr8-metric"></a>

<!-- formal-statement-start -->
> **定理（p-Wasserstein距離の距離公理）**
> $(X,d)$ を非空の Polish 空間、$p\ge1$ とする。集合 $\mathcal P_p(X)$ 上の $W_p$ は有限値の距離である。すなわち任意の $\mu,\nu,\eta\in\mathcal P_p(X)$ について、次の四条件が成り立つ。
>
> 1. $W_p(\mu,\nu)\ge0$。
> 2. $W_p(\mu,\nu)=0$ であることと $\mu=\nu$ は同値。
> 3. $W_p(\mu,\nu)=W_p(\nu,\mu)$。
> 4. $W_p(\mu,\eta)\le W_p(\mu,\nu)+W_p(\nu,\eta)$。
<!-- formal-statement-end -->

### 証明の見取り図

前半三条件では費用の非負性、対角結合、座標入替えを使います。零費用から測度の一致を導く方向では、[OTR3 の最適結合存在定理](../OTR3/index.md#thm-otr3-polish)が重要です。最後は二つの最適結合を貼り合わせ、点の三角不等式を Minkowski によって $p$ 乗根の外へ出します。

<!-- proof-start -->
### 証明

**有限性と非負性。** 第3節で、積結合によって $0\le W_p(\mu,\nu)<\infty$ であることを既に確認しました。

**零距離の特徴付け。** $\mu=\nu$ とします。対角写像 $x\mapsto(x,x)$ による[グラフ結合](../OTR2/index.md#prop-otr2-graph) $\pi=(\mathrm{id},\mathrm{id})_{\#}\mu$ は費用 $0$ です。従って $W_p(\mu,\mu)=0$ です。

逆に $W_p(\mu,\nu)=0$ とします。連続非負費用 $d^p$ について[最適結合が存在](../OTR3/index.md#thm-otr3-polish)し、その結合 $\pi$ の積分は $0$ です。非負関数の積分が $0$ なら関数はほとんど確実に $0$ なので

$$
\pi\{(x,y):d(x,y)=0\}=1.
$$

$d$ は距離ゆえ $d(x,y)=0$ と $x=y$ は同値です。従って任意の Borel 集合 $A\subset X$ に対し、[周辺積分の性質](../OTR2/index.md#prop-otr2-marginal-integration)から

$$
\mu(A)=\pi(A\times X)
=\pi\{(x,y):x\in A,\ x=y\}
=\pi(X\times A)=\nu(A).
$$

全 Borel 集合で一致するので $\mu=\nu$ です。

**対称性。** $\pi\in\Pi(\mu,\nu)$ を $(x,y)\mapsto(y,x)$ で押し出すと $\pi^\top\in\Pi(\nu,\mu)$ になります。$d(x,y)=d(y,x)$ なので費用も同じです。この対応はもう一度座標を交換すれば元へ戻る全単射です。従って両方向の下限は等しくなります。

**三角不等式。** $\mu$ から $\nu$ への最適結合 $\pi$ と、$\nu$ から $\eta$ への最適結合 $\sigma$ を取ります。どちらも第3節の存在議論から取れます。[結合の貼り合わせ補題](#lem-otr8-gluing)によって $(x,y)$ 周辺が $\pi$、$(y,z)$ 周辺が $\sigma$ の三変数測度 $\gamma$ を取ります。

$(x,z)$ 周辺は $\mu$ と $\eta$ を持つ許容結合です。従って定義から

$$
W_p(\mu,\eta)
\le\left(\int d(x,z)^p\,d\gamma\right)^{1/p}.
$$

点の三角不等式 $d(x,z)\le d(x,y)+d(y,z)$ の後に、[積分のMinkowski不等式](#lem-otr8-minkowski)を $A=d(x,y)$、$B=d(y,z)$ に適用します。これらは非負可測で、$\pi,\sigma$ が有限費用の最適結合であるため $p$ 乗可積分です。すると

$$
\begin{aligned}
W_p(\mu,\eta)
&\le\left(\int[d(x,y)+d(y,z)]^p\,d\gamma\right)^{1/p}\\
&\le\left(\int d(x,y)^p\,d\gamma\right)^{1/p}
+\left(\int d(y,z)^p\,d\gamma\right)^{1/p}\\
&=\left(\int d(x,y)^p\,d\pi\right)^{1/p}
+\left(\int d(y,z)^p\,d\sigma\right)^{1/p}\\
&=W_p(\mu,\nu)+W_p(\nu,\eta).
\end{aligned}
$$

最後から二行目で $\gamma$ の指定された周辺を使い、最後の行で $\pi,\sigma$ の最適性を使いました。これで四条件をすべて確認しました。$\square$
<!-- proof-end -->

**距離空間 $(\mathcal P_p(X),W_p)$ が得られた**というのがこの章の結論です。ただし、その位相で何が収束するか、完備か可分かはまだこの証明だけでは分かりません。それらは OTR9 で調べます。

## 7. 次数 $p$ を変えると何が起きるか

同じ分布の組でも $W_1$ と $W_2$ は違いました。$p$ を大きくすると、遠くへの少量の輸送に高い重みを与えます。モーメントが有限な範囲では、この違いを一つの不等式にまとめられます。

<a id="prop-otr8-order"></a>

<!-- formal-statement-start -->
> **命題（Wasserstein距離の次数比較）**
> $(X,d)$ を非空の Polish 空間とし、$1\le p<q$ とする。$\mu,\nu\in\mathcal P_q(X)$ なら $\mu,\nu\in\mathcal P_p(X)$ であり、

$$
W_p(\mu,\nu)\le W_q(\mu,\nu)
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

確率測度の下では、$q$ 次平均は $p$ 次平均以上です。これをどの結合にも適用し、特に $q$ 次費用の最適結合で評価します。

<!-- proof-start -->
### 証明

$t\ge0$ と $p<q$ に対して $t^p\le1+t^q$ です。よって $\mu,\nu\in\mathcal P_q(X)$ なら $\mathcal P_p(X)$ にも属します。

$\sigma$ を $W_q(\mu,\nu)$ の最適結合とします。[Polish空間上の最適結合の存在](../OTR3/index.md#thm-otr3-polish)により存在します。$\sigma$ は確率測度なので、[積分のMinkowski不等式](#lem-otr8-minkowski)の証明で導いた Hölder 不等式を指数 $r=q/p>1$、$r'=q/(q-p)>1$ で使うと

$$
\int d(x,y)^p\,d\sigma
=\int d(x,y)^p\cdot1\,d\sigma
\le\left(\int d(x,y)^q\,d\sigma\right)^{p/q}
\left(\int1^{r'}\,d\sigma\right)^{1/r'}
=\left(\int d(x,y)^q\,d\sigma\right)^{p/q}.
$$

両辺の $1/p$ 乗を取り、$W_p$ の定義の下限は任意の結合での値以下であることを使えば

$$
W_p(\mu,\nu)
\le\left(\int d^p\,d\sigma\right)^{1/p}
\le\left(\int d^q\,d\sigma\right)^{1/q}
=W_q(\mu,\nu).
$$

$\square$
<!-- proof-end -->

### $p<1$ では何が壊れるか

形式的に同じ式を $0<p<1$ にも書くことはできます。しかし根を取る指数 $1/p>1$ が、三角不等式を壊します。$X=\{0,1\}$、$d(0,1)=1$、$\mu=\delta_0$、$\nu=(\delta_0+\delta_1)/2$、$\eta=\delta_1$ とします。各端点から中間分布への結合は一意なので

$$
W_p(\mu,\nu)=W_p(\nu,\eta)=2^{-1/p},
\qquad W_p(\mu,\eta)=1.
$$

三角不等式があれば $1\le2^{1-1/p}$ のはずですが、$0<p<1$ なら $1-1/p<0$ で右辺は $1$ より小さいのです。これは **Minkowski 不等式が $p<1$ で使えない**ことの具体的な現れです。一般の $p<1$ では費用 $d^p$ 自身の最小値と、そこから $1/p$ 乗した量の区別が重要になります。

### 有限モーメントを外すとどうなるか

$X=\{0,1,2,\ldots\}$ を通常の距離を持つ離散的な Polish 空間とし、$\mu$ に自然数 $n\ge1$ で質量 $c/n^2$ を置きます。ただし $c=(\sum_{n\ge1}n^{-2})^{-1}$ は正規化定数です。$p\ge1$ なら

$$
\int d(x,0)^p\,d\mu(x)
=c\sum_{n=1}^\infty n^{p-2}=\infty.
$$

よって $\mu\notin\mathcal P_p(X)$ です。$\delta_0$ への結合は一意で、費用は無限大となります。一方 $\mu$ 自身への対角結合の費用は $0$ です。有限モーメントの条件は「すべての分布を排除するため」ではなく、**任意の二つの元の間で有限値の距離を得るため**に必要な制限です。

## 8. 演習：結合から距離公理を再構成する

### OTR8-A01 基準点を替えたモーメント
- Level: A

$X=\mathbb R$、$\mu=\frac13\delta_{-1}+\frac23\delta_2$、$p\ge1$ とする。基準点 $o=0$ と $o'=1$ について $p$ 次モーメントをそれぞれ計算し、$\mu\in\mathcal P_p(\mathbb R)$ を確認せよ。また[基準点不変性の命題](#prop-otr8-basepoint)の適用条件を述べよ。

<!-- solution-start -->
**詳細解答**

両原子への距離を別々に計算すると、$o=0$ では $d(-1,0)=1$、$d(2,0)=2$ なので

$$
\int|x|^p\,d\mu=\frac13\,1^p+\frac23\,2^p<\infty.
$$

$o'=1$ では $d(-1,1)=2$、$d(2,1)=1$ より

$$
\int|x-1|^p\,d\mu=\frac13\,2^p+\frac23\,1^p<\infty.
$$

$\mu$ は非負質量 $1/3,2/3$ の和が $1$ の Borel 確率測度で、両積分は任意の有限 $p\ge1$ で有限です。命題には非空距離空間、$p\ge1$、二つの基準点という仮定が必要で、ここではすべて満たします。計算上の数値は基準点ごとに異なりますが、$\mathcal P_p$ に入るかどうかは同じです。
<!-- solution-end -->

### OTR8-A02 二つのDirac測度の距離
- Level: A

$(X,d)$ を非空の Polish 空間、$a,b\in X$、$p\ge1$ とする。$\delta_a,\delta_b\in\mathcal P_p(X)$ を確認し、許容結合が一意であることから $W_p(\delta_a,\delta_b)=d(a,b)$ を導け。

<!-- solution-start -->
**詳細解答**

任意の基準点 $o$ について、$\int d(x,o)^p\,d\delta_a=d(a,o)^p<\infty$ です。$\delta_b$ も同じ理由で有限モーメントを持ちます。第一周辺が $\delta_a$ なら $x=a$ がほとんど確実、第二周辺が $\delta_b$ なら $y=b$ がほとんど確実なので、唯一の許容結合は $\pi=\delta_{(a,b)}$ です。

従って[定義](#def-otr8-wasserstein)に代入すると

$$
W_p(\delta_a,\delta_b)
=\left(\int d(x,y)^p\,d\delta_{(a,b)}\right)^{1/p}
=(d(a,b)^p)^{1/p}=d(a,b).
$$

輸送費用は $d(a,b)^p$、距離はその $p$ 乗根である点を区別しました。
<!-- solution-end -->

### OTR8-A03 少量の遠距離輸送
- Level: A

$X=\mathbb R$、$\mu=(\delta_0+\delta_2)/2$、$\nu=\delta_0$ とする。$W_1(\mu,\nu)$ と $W_2(\mu,\nu)$ を、結合の一意性を示してから計算せよ。

<!-- solution-start -->
**詳細解答**

$\mu,\nu$ は有限個の原子に集中しており、すべての有限次数のモーメントを持ちます。第二周辺が $\delta_0$ なので $y=0$ 以外への輸送はできず、第一周辺から

$$
\pi=\tfrac12\delta_{(0,0)}+\tfrac12\delta_{(2,0)}
$$

が唯一の許容結合です。$p=1$ の費用は $\tfrac12\cdot0+\tfrac12\cdot2=1$、$p=2$ の費用は $\tfrac12\cdot0^2+\tfrac12\cdot2^2=2$ です。よって

$$
W_1(\mu,\nu)=1,\qquad W_2(\mu,\nu)=\sqrt2.
$$

次数が高いほど長い移動への重みが増えるため、値が異なります。
<!-- solution-end -->

### OTR8-A04 二点の貼り合わせを計算する
- Level: A

$X=Y=Z=\{0,1\}$、$\mu=\nu=\eta=(\delta_0+\delta_1)/2$ とする。$\pi$ は $(0,0),(1,1)$ に質量 $1/2$、$\sigma$ は $(0,1),(1,0)$ に質量 $1/2$ を置く結合とする。三変数の結合を明示し、二つの指定周辺を直接検算せよ。

<!-- solution-start -->
**詳細解答**

中間周辺の各質量は $b_0=b_1=1/2$ です。有限版の[貼り合わせ構成](#lem-otr8-gluing)で、$y=0$ には $(x,z)=(0,1)$、$y=1$ には $(x,z)=(1,0)$ しか現れません。各三点の質量は $(1/2)(1/2)/(1/2)=1/2$ なので

$$
\gamma=\tfrac12\delta_{(0,0,1)}
+\tfrac12\delta_{(1,1,0)}.
$$

総質量は $1$ です。$z$ を消去した $(x,y)$ 周辺は $(0,0),(1,1)$ に各 $1/2$ で $\pi$ と一致し、$x$ を消去した $(y,z)$ 周辺は $(0,1),(1,0)$ に各 $1/2$ で $\sigma$ と一致します。三つの一変数周辺もすべて $(\delta_0+\delta_1)/2$ です。
<!-- solution-end -->

### OTR8-B01 二点分布の一般公式と三角不等式
- Level: B

$X=\{0,1\}$、$d(0,1)=1$、$p\ge1$ とする。$0\le a,b,c\le1$ に対し $\mu_a=a\delta_0+(1-a)\delta_1$ とおく。次を示せ。

1. $W_p(\mu_a,\mu_b)=|a-b|^{1/p}$。
2. この公式から直接 $W_p(\mu_a,\mu_c)\le W_p(\mu_a,\mu_b)+W_p(\mu_b,\mu_c)$ を導け。

<!-- solution-start -->
**詳細解答**

第一周辺が $\mu_a$、第二周辺が $\mu_b$ の結合を行列 $(\pi_{ij})_{i,j=0,1}$ で表します。行和・列和の制約は

$$
\pi_{00}+\pi_{01}=a,\quad
\pi_{00}+\pi_{10}=b,\quad
\pi_{10}+\pi_{11}=1-a,\quad
\pi_{01}+\pi_{11}=1-b.
$$

最初の二式を引くと $\pi_{01}-\pi_{10}=a-b$ です。距離の $p$ 乗は異なる点の組で $1$、同じ点の組で $0$ なので、費用は $\pi_{01}+\pi_{10}\ge|\pi_{01}-\pi_{10}|=|a-b|$ です。$\pi_{00}=\min(a,b)$、$\pi_{01}=(a-b)_+$、$\pi_{10}=(b-a)_+$、$\pi_{11}=\min(1-a,1-b)$ とすれば、各値は非負で行・列和を満たし、費用が $|a-b|$ になります。従って

$$
W_p(\mu_a,\mu_b)=|a-b|^{1/p}.
$$

次に $r=1/p\in(0,1]$ とおきます。$u,v\ge0$ に対して $(u+v)^r\le u^r+v^r$ です。$u>0$ なら $t=v/u$ として、$h(t)=(1+t)^r-1-t^r$ は $h(0)=0$、$h'(t)=r((1+t)^{r-1}-t^{r-1})\le0$ なので確認できます（$u=0$ は等号）。実数の三角不等式 $|a-c|\le|a-b|+|b-c|$ と合わせて

$$
|a-c|^r\le(|a-b|+|b-c|)^r
\le |a-b|^r+|b-c|^r
$$

を得ます。上の公式を三度適用すると求める不等式です。
<!-- solution-end -->

### OTR8-B02 モーメント条件の失敗と零費用
- Level: B

$X=\{0,1,2,\ldots\}$ に距離 $d(m,n)=|m-n|$ を入れ、$c=(\sum_{n=1}^\infty n^{-2})^{-1}$、$\mu=\sum_{n=1}^\infty cn^{-2}\delta_n$ とする。$p\ge1$ について次を確認せよ。

1. $\mu$ は Borel 確率測度だが $\mathcal P_p(X)$ に属さない。
2. $\mu$ から $\delta_0$ への輸送費用 $\inf_\pi\int d(x,y)^p\,d\pi$ は無限大である。
3. $\mu$ から $\mu$ への費用には $0$ の結合がある。これらが矛盾しない理由を述べよ。

<!-- solution-start -->
**詳細解答**

$c>0$ で各原子質量は非負、全質量は $c\sum_{n\ge1}n^{-2}=1$ なので $\mu$ は Borel 確率測度です。基準点 $0$ の $p$ 次モーメントは

$$
\int d(x,0)^p\,d\mu=c\sum_{n=1}^{\infty}n^{p-2}.
$$

$p=1$ で調和級数 $\sum1/n$、$p>1$ なら指数 $p-2>-1$ の級数となり、どちらも発散します。[基準点不変性](#prop-otr8-basepoint)により、他の基準点を使っても有限にはなりません。よって $\mu\notin\mathcal P_p(X)$ です。

$\delta_0$ を第二周辺に持つ結合は $\pi=\sum_{n\ge1}cn^{-2}\delta_{(n,0)}$ に限られ、その費用は上の発散級数に等しいので無限大です。一方、$\gamma=\sum_{n\ge1}cn^{-2}\delta_{(n,n)}$ は両周辺が $\mu$ で、各経路の距離が $0$ なので費用は $0$ です。

[Wasserstein距離の定義](#def-otr8-wasserstein)は、すべての二点間の値が有限である距離を得るため $\mathcal P_p(X)$ に制限しています。自己結合の費用だけは有限でも、他の確率測度との費用が有限とは限らないため、両者は矛盾しません。
<!-- solution-end -->

### OTR8-B03 次数比較の適用範囲と等号
- Level: B

$X=\mathbb R$、$\mu=\frac14\delta_0+\frac34\delta_4$、$\nu=\delta_0$ とする。$W_1,W_2$ を計算し、[次数比較命題](#prop-otr8-order)の仮定を確認せよ。また一般の $1\le p<q$ に対して、任意の $\mu,\nu\in\mathcal P_q(X)$ で $W_p\le W_q$ となる導出の要点を述べよ。

<!-- solution-start -->
**詳細解答**

両測度は有限原子測度で、$p,q$ を有限の正数に取る限り全モーメントは有限です。$\nu$ は一点測度なので許容結合は

$$
\pi=\tfrac14\delta_{(0,0)}+\tfrac34\delta_{(4,0)}
$$

に限られます。従って

$$
W_1=\tfrac34\cdot4=3,\qquad
W_2=\left(\tfrac34\cdot16\right)^{1/2}=\sqrt{12}=2\sqrt3.
$$

$3<2\sqrt3$ なので次数比較と一致します。一般の場合、[Polish空間上の最適結合の存在](../OTR3/index.md#thm-otr3-polish)から $q$ 次費用の最適結合 $\sigma$ を取れます。$\sigma$ は確率測度です。指数を $r=q/p$、$r'=q/(q-p)$ と置くと $1/r+1/r'=1$ なので、[積分のMinkowski不等式](#lem-otr8-minkowski)の証明にある Hölder 不等式を $d^p$ と $1$ に適用できます。

$$
\left(\int d^p\,d\sigma\right)^{1/p}
\le\left(\int d^q\,d\sigma\right)^{1/q}.
$$

左の $W_p$ は、$\sigma$ を含むすべての許容結合について下限を取ったものです。ゆえに $W_p$ はこの左辺以下、右辺は $\sigma$ の最適性から $W_q$ と一致します。$\mathcal P_q\subset\mathcal P_p$ は $d^p\le1+d^q$ の積分で確認できます。
<!-- solution-end -->

### OTR8-C01 貼り合わせから距離公理を証明し直す
- Level: C

$X$ を非空の Polish 空間、$p\ge1$、$\mu,\nu,\eta\in\mathcal P_p(X)$ とし、$\pi\in\Pi(\mu,\nu)$、$\sigma\in\Pi(\nu,\eta)$ はそれぞれ最小費用を達成するとする。以下を定義・仮定から再構成せよ。

1. 中間空間の有限 Borel 分割 $(B_i)$ と共通質量 $w_i=\nu(B_i)$ を用い、二つの結合から $(x,y,y',z)$ の確率測度を作り、$(x,y)$ と $(y',z)$ の周辺が保たれることを確認する。
2. 細かい分割と緊密性から $y=y'$ を満たす極限結合が取れる理由を示す。
3. その結合と Minkowski 不等式で $W_p(\mu,\eta)\le W_p(\mu,\nu)+W_p(\nu,\eta)$ を導く。
4. 同じ定義式を $0<p<1$ へ形式的に拡張した場合、$X=\{0,1\}$、$\mu=\delta_0$、$\nu=(\delta_0+\delta_1)/2$、$\eta=\delta_1$ で何が破れるかを示す。

<!-- solution-start -->
**詳細解答**

**（1）有限分割。** $\nu$ に対する Borel 分割 $B_0,\ldots,B_m$ を取り、質量ゼロのセルは除きます。$(x,y,y',z)$ 上に

$$
\lambda(dx,dy,dy',dz)
=\sum_{i:\,w_i>0}
\frac{\mathbf{1}_{B_i}(y)\pi(dx,dy)
\,\mathbf{1}_{B_i}(y')\sigma(dy',dz)}{w_i}
$$

を定めます。一項の総質量は $w_i^2/w_i=w_i$ なので、全質量は $\sum_iw_i=1$ です。$(y',z)$ の積分を各項で先に行うと $w_i$ が分母を打ち消し、$(x,y)$ 周辺は $\sum_i\mathbf{1}_{B_i}(y)\pi(dx,dy)=\pi$ です。逆も同じ計算で $(y',z)$ 周辺は $\sigma$ です。

**（2）極限。** [Polish空間上の確率測度の緊密性](../OTR3/index.md#lem-otr3-polish-tight)により、各 $n$ で質量 $1-1/n$ より大きいコンパクト集合を有限個の直径 $1/n$ 未満の Borel セルで覆います。残余セルの質量を $1/n$ 未満にでき、（1）の構成では

$$
\lambda_n\{d(y,y')>1/n\}<1/n.
$$

四座標の周辺は $\mu,\nu,\nu,\eta$ で固定されています。各周辺の大質量コンパクト集合の直積を取れば $(\lambda_n)$ は一様緊密です。直積空間は Polish なので、[Prokhorovのコンパクト性定理](../OTR3/index.md#thm-otr3-prokhorov)から狭義収束する部分列 $\lambda_{n_k}\Rightarrow\lambda$ を取れます。

固定した $r>0$ に対し、開集合 $\{d(y,y')>r\}$ の $\lambda_{n_k}$ 質量は $0$ に近づきます。第4節で有界連続近似から導いた開集合評価により $\lambda\{d(y,y')>r\}=0$ です。$r=1/j$ をすべて使えば $\lambda(y=y')=1$ です。

$(x,y,z)$ への射影を $\gamma$ とすると、$(x,y)$ 周辺が $\pi$、$(y,z)$ 周辺が $\sigma$ となります。

**（3）距離の三角不等式。** $(x,z)$ 周辺は $\mu,\eta$ の結合なので

$$
W_p(\mu,\eta)\le\left(\int d(x,z)^p\,d\gamma\right)^{1/p}.
$$

点の三角不等式の後、[Minkowski不等式](#lem-otr8-minkowski)を $d(x,y)$、$d(y,z)$ に適用します。両関数の $p$ 次積分は、最適結合の有限費用に等しいので適用可能です。よって

$$
\begin{aligned}
W_p(\mu,\eta)
&\le\left(\int[d(x,y)+d(y,z)]^p\,d\gamma\right)^{1/p}\\
&\le\left(\int d(x,y)^p\,d\pi\right)^{1/p}
+\left(\int d(y,z)^p\,d\sigma\right)^{1/p}\\
&=W_p(\mu,\nu)+W_p(\nu,\eta).
\end{aligned}
$$

**（4）$p<1$ の反例。** $X=\{0,1\}$ の点間距離を $1$ とします。$\mu$ から $\nu$ は質量 $1/2$ だけ距離 $1$ を運び、残りの $1/2$ は距離 $0$ です。$\nu$ から $\eta$ も同じです。$\mu$ から $\eta$ は質量 $1$ を距離 $1$ 運びます。従って形式的な値は

$$
W_p(\mu,\nu)=W_p(\nu,\eta)=2^{-1/p},\qquad
W_p(\mu,\eta)=1.
$$

$0<p<1$ では $2\cdot2^{-1/p}=2^{1-1/p}<1$ となり、三角不等式に反します。貼り合わせの構成自体は成立しますが、（3）で使った $L^p$ の Minkowski 不等式がこの指数では成立しないことが破綻箇所です。
<!-- solution-end -->

## 9. この章で得たもの

- $p\ge1$ で有限 $p$ 次モーメントを持つ確率測度の集合 $\mathcal P_p(X)$ は、基準点の選び方に依存しません。
- 非空の Polish 空間では $W_p$ の最適結合が存在します。[貼り合わせ補題](#lem-otr8-gluing)と[積分のMinkowski不等式](#lem-otr8-minkowski)によって[距離公理](#thm-otr8-metric)が成立します。
- $p$ を大きくすると遠距離の輸送に敏感になり、$W_p\le W_q$（$p<q$、両測度が $\mathcal P_q$ に属する場合）です。$p<1$ では一般に三角不等式が壊れます。

次の OTR9 では、この距離の収束が通常の確率測度の狭義収束とどう関係するかを調べます。
