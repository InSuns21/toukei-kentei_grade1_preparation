# MFL2 内在幾何と外在幾何・接空間と埋め込み

<!-- definition-example-audit: strict -->

## 1. 「近い」とは、どこを通れるという意味か

前章では、高次元の点群が低次元多様体から生まれる確率模型を定めた。しかし二点が空間内で近いことと、多様体に沿って近いことは別である。紙を丸めれば、紙面上では遠い二点を空間内では近くできる。この違いを曖昧にすると、近傍点から接空間を復元する前提が崩れる。

これまでの[三つの次元](../MFL1/index.md#def-mfl1-01-dimensions)のうち、観測次元 $D$ の空間で直接測れる距離を**外在的**な距離、多様体 $M$ 自身に沿って移動するときの距離を**内在的**な距離と呼ぶ。$M\subset\mathbb R^D$ は連結な滑らかな埋め込み部分多様体とし、周囲の標準内積を $M$ の接空間へ制限した**誘導 Riemann 計量**を使う。[Riemann 計量](../../../幾何系/GEO/GEO12/index.md#def-geo12-riemannian-metric)、[曲線の Riemann 長](../../../幾何系/GEO/GEO12/index.md#def-geo12-length-energy)、[長さの下限による距離の定義](../../../幾何系/GEO/GEO12/index.md#def-geo12-distance)は既習である。

<a id="def-mfl2-distances"></a>

<!-- formal-statement-start -->
> **定義（外在距離と内在距離）**
> $M\subset\mathbb R^D$ を連結で滑らかな埋め込み部分多様体とする。$x,y\in M$ に対し、外在距離（弦距離）と誘導計量による内在距離を

$$
d_{\mathrm{ext}}(x,y)=\|x-y\|_{\mathbb R^D},\qquad
d_M(x,y)=\inf_{\gamma} L_g(\gamma)
$$

> と定める。下限は $M$ 内で $x$ から $y$ へ至る区分的 $C^1$ 曲線 $\gamma:[0,1]\to M$ すべてについてとり、

$$
L_g(\gamma)=\int_0^1\|\gamma'(t)\|_{\mathbb R^D}\,dt
$$

> とする。$M$ の連結性と多様体の局所的な弧状連結性から二点間の区分的滑らかな道は存在する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl2-distances -->
**定義の確認**（単位円の対蹠点）。$x=(1,0)$ と $y=(-1,0)$ の外在距離は $2$。単位円を上半周に沿って $\gamma(t)=(\cos\pi t,\sin\pi t)$、$0\le t\le1$ と進めば速度 $\|\gamma'(t)\|=\pi$ なので長さは $\pi$。逆に任意の円周上の道は少なくとも半周の角度変化を要することを第2節で示す。よって $d_{S^1}(x,y)=\pi$ であり、同じ二点にも $2\ne\pi$ という二つの距離がある。
<!-- definition-example-end -->

<a id="prop-mfl2-chord-bound"></a>

<!-- formal-statement-start -->
> **命題（外在距離は内在距離以下）**
> [外在距離と内在距離](#def-mfl2-distances)の仮定の下で、すべての $x,y\in M$ に対し

$$
\|x-y\|\le d_M(x,y)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

周囲の空間の直線は最短だが、多様体上の道はその直線を通れるとは限らない。任意の多様体内曲線に三角不等式を適用し、最後に曲線について下限をとる。

<!-- proof-start -->
### 証明

許される区分的 $C^1$ 曲線 $\gamma$ に対し、微積分学の基本定理を各区分に使い、端点差を加えると

$$
y-x=\gamma(1)-\gamma(0)=\int_0^1\gamma'(t)\,dt.
$$

各区分の積分を有限和で近似する。このとき $\|v_1+\cdots+v_N\|\le\|v_1\|+\cdots+\|v_N\|$ であり、分割幅を0にすると

$$
\|y-x\|=\left\|\int_0^1\gamma'(t)\,dt\right\|
\le\int_0^1\|\gamma'(t)\|\,dt=L_g(\gamma).
$$

左辺は曲線に依存しないので、すべての $\gamma$ にわたり右辺の下限をとって主張を得る。$\square$
<!-- proof-end -->

この不等式は片側だけである。とりわけ「観測空間で近いから多様体に沿っても近い」とは結論できない。

## 2. 円では弦と円弧がどう食い違うか

半径 $R>0$ の円は $F(\theta)=(R\cos\theta,R\sin\theta)$ と表せる。異なる角度が同じ点を表すので、二点の角度差は $2\pi$ の整数倍を除いて比較する。二点間の**短い中心角**を $\alpha\in[0,\pi]$ と置く。

<a id="prop-mfl2-circle"></a>

<!-- formal-statement-start -->
> **命題（円周の内在距離と弦長）**
> $R>0$ とし、$x=F(\theta)$、$y=F(\phi)$ を半径 $R$ の円周上の二点とする。$\alpha=\min_{k\in\mathbb Z}|\phi-\theta+2\pi k|\in[0,\pi]$ と定めると

$$
d_{\mathrm{ext}}(x,y)=2R\sin(\alpha/2),\qquad d_{S_R^1}(x,y)=R\alpha.
$$
<!-- formal-statement-end -->

### 証明の見取り図

弦は余弦定理に相当する内積展開で求まる。円周内の任意の道は角度の連続な持ち上げで書けるため、その道の長さは角度変化の絶対値以上である。

<!-- proof-start -->
### 証明

円上の差の二乗は

$$
\begin{aligned}
\|F(\phi)-F(\theta)\|^2
&=R^2[(\cos\phi-\cos\theta)^2+(\sin\phi-\sin\theta)^2]\\
&=2R^2\{1-\cos(\phi-\theta)\}
=4R^2\sin^2((\phi-\theta)/2).
\end{aligned}
$$

$\alpha\in[0,\pi]$ を使えば $\sin(\alpha/2)\ge0$ なので弦長の式を得る。

次に $\gamma:[0,1]\to S_R^1$ を区分的 $C^1$ な道とする。角度は一度に全周で選ぶ必要はない。$\gamma$ の一様連続性によって区間を細分し、各区分の像を半円未満の弧に入れれば、その弧ごとに連続な角度を選べる。隣り合う区分の端点で $2\pi$ の整数倍を加えてつなぎ、$\gamma(t)=F(\vartheta(t))$ という連続な角度表示を得る。$\vartheta$ は各滑らかな区分で微分可能で、両端の角度差は $\vartheta(1)-\vartheta(0)=\phi-\theta+2\pi k$（ある $k\in\mathbb Z$）となる。

$$
\|\gamma'(t)\|=R|\vartheta'(t)|,\quad
L_g(\gamma)=R\int_0^1|\vartheta'(t)|\,dt
\ge R|\phi-\theta+2\pi k|\ge R\alpha.
$$

一方、角度を長さ $\alpha$ だけ一定速度で動かす短い円弧は長さ $R\alpha$ なので、下界は実現する。$\square$
<!-- proof-end -->

$\alpha\to0$ では二つの距離は近いが、大きな角度で違いが広がる。$\sin z=z-z^3/6+O(z^5)$ を代入すると

$$
R\alpha-2R\sin(\alpha/2)
=\frac{R\alpha^3}{24}+O(R\alpha^5).
$$

ここで $O(R\alpha^5)$ は $R$ を固定した $\alpha\to0$ の評価である。**局所的に近いこと**は、円の反対側まで同じ距離で測れることを意味しない。

## 3. 螺旋では隣の巻きが近すぎる

円は一周すると同じ点へ戻る。これに対して、縦方向へ少しずつ進む螺旋は周囲の空間内で二本の巻きが接近しても、曲線に沿って進む距離は大きい。半径 $R>0$、上昇率 $a>0$ とし、

$$
H(t)=(R\cos t,R\sin t,at),\qquad t\in\mathbb R
$$

を考える。第三座標から $t=z/a$ を一意に復元でき、逆写像は螺旋上で連続である。また $H'(t)=(-R\sin t,R\cos t,a)\ne0$。したがって $H$ は $\mathbb R$ の滑らかな埋め込みであり、その像 $M_{R,a}$ は一次元埋め込み部分多様体である。$a=0$ ではこの議論は成立せず、$\mathbb R$ から円への写像は単射でなくなる。

<a id="prop-mfl2-helix"></a>

<!-- formal-statement-start -->
> **命題（螺旋の内在距離と弦長）**
> $R,a>0$、$s,t\in\mathbb R$ とする。$M_{R,a}=H(\mathbb R)$ 上で

$$
d_{M_{R,a}}(H(s),H(t))=\sqrt{R^2+a^2}\,|t-s|,
$$

$$
d_{\mathrm{ext}}(H(s),H(t))
=\sqrt{4R^2\sin^2((t-s)/2)+a^2(t-s)^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

速度が一定なので、そのままパラメータ区間を進んだ長さが候補となる。逆写像があるため、任意の道のパラメータは $s$ から $t$ まで変化しなければならず、より短い迂回は存在しない。

<!-- proof-start -->
### 証明

微分と内積で

$$
\|H'(u)\|^2=R^2(\sin^2u+\cos^2u)+a^2=R^2+a^2.
$$

パラメータを直線的に $s$ から $t$ に動かす道の長さは $\sqrt{R^2+a^2}|t-s|$ である。他の区分的滑らかな道 $\gamma$ は、螺旋の逆表示により $\gamma(v)=H(u(v))$ と書け、$u(0)=s,u(1)=t$。したがって

$$
L_g(\gamma)=\sqrt{R^2+a^2}\int_0^1|u'(v)|\,dv
\ge\sqrt{R^2+a^2}|u(1)-u(0)|.
$$

これで内在距離の式が確定する。外在距離は第三座標の差 $a(t-s)$ と最初の二座標の円周弦の二乗を足し、

$$
\|H(t)-H(s)\|^2=4R^2\sin^2((t-s)/2)+a^2(t-s)^2
$$

から平方根を取ればよい。$\square$
<!-- proof-end -->

**定義の対照例**。$t=s+2\pi$ とすると弦長は $2\pi a$ だが、内在距離は $2\pi\sqrt{R^2+a^2}$。$R$ を固定して $a\downarrow0$ とすれば、弦長は0へ、内在距離は $2\pi R$ へ近づく。ただし各 $a>0$ では点は異なる。**一巻き先の点を近傍点と誤認する**ことが、局所幾何の推定にも影響し得る。

## 4. 近傍点から接空間を読む

曲線の二点間の距離は大域的な量だが、点の近くでどちらへ動けるかは局所的な量である。[埋め込み部分多様体](../../../幾何系/GEO/GEO3/index.md#def-geo3-embedded-submanifold)の局所パラメータ表示 $F:U\subset\mathbb R^d\to M\subset\mathbb R^D$ をとり、$F$ が $u_0$ の近くで $C^2$、微分の階数が $d$ とする。

$F$ の Jacobian $J=DF(u_0)$ は $D\times d$ 行列であり、その第 $j$ 列は $u^j$ だけを動かした偏微分 $\partial F/\partial u^j(u_0)$ である。パラメータの速度 $h=(h^1,\ldots,h^d)^{\mathsf T}$ に対し、連鎖律は

$$
\left.\frac{d}{dt}F(u_0+th)\right|_{t=0}
=DF(u_0)h=Jh=\sum_{j=1}^d h^j\frac{\partial F}{\partial u^j}(u_0)
$$

を与える。$t$ は曲線の一変数パラメータであり、$\partial/\partial u^j$ は他の座標を固定する偏微分である。[正則レベル集合の接空間表示](../../../幾何系/GEO/GEO3/index.md#thm-geo3-level-tangent-kernel)では制約式の微分の核として接空間を求めたが、パラメータ表示ではこの速度の全体、すなわち $J$ の像で求める（[はめ込みの局所標準形](../../../幾何系/GEO/GEO3/index.md#cor-geo3-immersion-normal-form)）。

周囲の Euclid 内積を誘導計量にすると、二つの接方向 $Jh,Jk$ の内積は

$$
g_x(Jh,Jk)=(Jh)\cdot(Jk)=h^{\mathsf T}(J^{\mathsf T}J)k.
$$

よって $J^{\mathsf T}J$ は、列 $\partial F/\partial u^j$ を接空間の基底としたときの計量係数行列である。階数 $d$ なら $Jh=0$ となるのは $h=0$ のときだけなので、$h\ne0$ に対して $h^{\mathsf T}J^{\mathsf T}Jh=\|Jh\|^2>0$ となる。

<a id="def-mfl2-tangent-gram"></a>

<!-- formal-statement-start -->
> **定義（局所接空間とGram行列）**
> $U\subset\mathbb R^d$ を開集合、$u_0\in U$、$F:U\to\mathbb R^D$ を $u_0$ の近傍で $C^1$ とする。$J=DF(u_0)$ の階数が $d$ で、$u_0$ の十分小さい近傍 $V\subset U$ 上の $F$ が埋め込みであるとし、$M=F(V)$、$x=F(u_0)$ と置く。この局所パッチで

$$
T_xM=\operatorname{im}J
=\{Jh:h\in\mathbb R^d\},\qquad G=J^{\mathsf T}J
$$

> と置く。$T_xM$ は $x$ での接空間、$G$ はそのパラメータ基底での誘導計量の Gram 行列である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl2-tangent-gram -->
**定義の確認**（円）。$R>0$ とし、$F(\theta)=(R\cos\theta,R\sin\theta)$ を $\theta=0$ を含む長さ $2\pi$ 未満の開区間に制限する。$F$ は滑らかで、その区間上で単射、局所逆写像も角度によって連続なので埋め込みである。$\theta=0$ とすると $x=(R,0)$、偏微分が一変数の導関数 $F'(0)$ となり、$J=(0,R)^{\mathsf T}$。したがって

$$
T_xM=\{(0,Rh):h\in\mathbb R\}=\{(0,z):z\in\mathbb R\},
\qquad G=(R^2).
$$

$R>0$ なので $\operatorname{rank}J=1$。任意の $h\ne0$ に対して $g_x(Jh,Jh)=R^2h^2>0$ であり、$G=(R^2)$ は誘導計量の正定値性も確認する。接空間は縦方向、中心を向く半径方向は接空間に含まれない。**接空間は原点を通るベクトル空間**であり、実際の接線は $x+T_xM$ である。
<!-- definition-example-end -->

階数条件がないと Gram 行列の正定値性が崩れ、次の射影公式で逆行列を使えない。

### 射影は接方向だけを取り出す

周囲のベクトル $v\in\mathbb R^D$ を接方向と垂直な方向へ分けたい。例えば点群の近傍差から接空間成分を取り出す操作である。射影先は座標基底の取り方によらず $T_xM$ で決まる。

<a id="def-mfl2-projection"></a>

<!-- formal-statement-start -->
> **定義（接空間への直交射影）**
> [局所接空間](#def-mfl2-tangent-gram) $T_xM\subset\mathbb R^D$ に対し、各 $v\in\mathbb R^D$ を一意に $v=v_T+v_N$、$v_T\in T_xM$、$v_N\perp T_xM$ と分解したとき、$P_xv=v_T$ と定める線形写像 $P_x:\mathbb R^D\to T_xM$ を直交射影と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl2-projection -->
**定義の確認**。円の $x=(R,0)$ で $v=(3,4)$ とする。上で接空間は縦方向と分かったから $v_T=(0,4)$、$v_N=(3,0)$。$v_N\cdot(0,z)=0$ が任意の $z$ について成立し、二成分の和は確かに $(3,4)$ である。従って $P_x(3,4)=(0,4)$。
<!-- definition-example-end -->

<a id="prop-mfl2-projection-matrix"></a>

<!-- formal-statement-start -->
> **命題（接空間への射影公式）**
> [局所接空間と Gram 行列](#def-mfl2-tangent-gram)の条件の下で、[直交射影](#def-mfl2-projection)の行列は

$$
P_x=J(J^{\mathsf T}J)^{-1}J^{\mathsf T}.
$$

> また $P_x^{\mathsf T}=P_x$、$P_x^2=P_x$、$\operatorname{im}P_x=\operatorname{im}J$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$Jh$ という接方向への近似の残差をすべての接方向と直交させる。そこで得られる正規方程式は $Gh=J^{\mathsf T}v$ である。

<!-- proof-start -->
### 証明

$G=J^{\mathsf T}J$ は上で示したように正定値なので逆行列がある。$v\in\mathbb R^D$ に対し

$$
h=G^{-1}J^{\mathsf T}v,\qquad v_T=Jh=JG^{-1}J^{\mathsf T}v
$$

と置けば $v_T\in\operatorname{im}J$。さらに

$$
J^{\mathsf T}(v-v_T)
=J^{\mathsf T}v-J^{\mathsf T}JG^{-1}J^{\mathsf T}v
=J^{\mathsf T}v-GG^{-1}J^{\mathsf T}v=0.
$$

よって残差は $J$ のすべての列に垂直であり、[直交射影の定義](#def-mfl2-projection)を満たす。一意性は、二つの分解の接成分の差が接空間に属し同時に直交するため、ノルム二乗が0になることから従う。

転置すると $(G^{-1})^{\mathsf T}=G^{-1}$ により $P_x^{\mathsf T}=P_x$。また

$$
P_x^2=JG^{-1}J^{\mathsf T}JG^{-1}J^{\mathsf T}
=JG^{-1}GG^{-1}J^{\mathsf T}=P_x.
$$

$P_xv$ は常に $\operatorname{im}J$ に属し、$v=Jh$ なら $P_xJh=JG^{-1}Gh=Jh$。従って像はちょうど $\operatorname{im}J$。$\square$
<!-- proof-end -->

## 5. 接平面からどこまでずれるか

接空間は点 $x=F(u_0)$ の近くでの**一次の動き**を記述する。しかし曲面は曲がるので、実際の点 $F(u_0+h)$ は厳密には接平面上にない。このずれを数式の余項として評価する。以下の $D^2F(u)[h,h]$ は、二階微分を二つの方向ベクトル $h$ に適用した $\mathbb R^D$ 値であり、$t\mapsto F(u+th)$ を二回 $t$ で微分した $t=0$ の値に等しい。

<a id="prop-mfl2-second-order"></a>

<!-- formal-statement-start -->
> **命題（接平面の二次局所近似）**
> $U\subset\mathbb R^d$ を開集合、$F:U\to\mathbb R^D$ を $C^2$ とする。$u_0\in U$ とし、半径 $r>0$ の閉球 $\overline{B_r(u_0)}\subset U$ と定数 $K\ge0$ が存在して、

$$
\|D^2F(u)[h,h]\|\le K\|h\|^2
$$

> がすべての $u\in\overline{B_r(u_0)}$ と $h\in\mathbb R^d$ に対して成り立つとする。$\|h\|\le r$ のとき、$J=DF(u_0)$ と置けば

$$
\|F(u_0+h)-F(u_0)-Jh\|\le\frac K2\|h\|^2.
$$

> さらに $\operatorname{rank}J=d$ なら、$x=F(u_0)$ の接アフィン平面 $x+T_xM$ までの Euclid 距離は高々 $K\|h\|^2/2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$t\mapsto F(u_0+th)$ を一変数の曲線として二度積分する。接平面に入る $Jh$ を引いた残りは二階微分を重み $1-t$ で積分したものになる。

<!-- proof-start -->
### 証明

$f(t)=F(u_0+th)$ と置くと連鎖律から $f'(t)=DF(u_0+th)h$、$f''(t)=D^2F(u_0+th)[h,h]$。一変数の微積分学の基本定理を二度用いると

$$
\begin{aligned}
f(1)-f(0)-f'(0)
&=\int_0^1(f'(t)-f'(0))\,dt\\
&=\int_0^1\int_0^t f''(s)\,ds\,dt
=\int_0^1(1-s)f''(s)\,ds.
\end{aligned}
$$

閉球は線分 $u_0+sh$ を含むので仮定の上界が適用でき、

$$
\|f(1)-f(0)-f'(0)\|
\le\int_0^1(1-s)K\|h\|^2\,ds
=\frac K2\|h\|^2.
$$

また $f'(0)=Jh\in T_xM$ だから $x+Jh$ は接アフィン平面上の具体的な候補点である。点と集合の距離は任意の候補点までの距離以下なので、最後の評価を得る。$\square$
<!-- proof-end -->

**定義・命題の具体例**（放物面）。$\kappa\in\mathbb R$ とし

$$
F(u,v)=\left(u,v,\frac{\kappa}{2}(u^2+v^2)\right).
$$

第一・第二座標を見れば単射で逆写像も連続であり、Jacobian の列は独立である。従って $\mathbb R^2$ の埋め込みグラフになる。偏微分と [Gram 行列](#def-mfl2-tangent-gram)は

$$
J(u,v)=\begin{pmatrix}1&0\\0&1\\\kappa u&\kappa v\end{pmatrix},
\qquad
G(u,v)=\begin{pmatrix}
1+\kappa^2u^2&\kappa^2uv\\
\kappa^2uv&1+\kappa^2v^2
\end{pmatrix}.
$$

原点では $J(0,0)=\begin{pmatrix}1&0\\0&1\\0&0\end{pmatrix}$、$G(0,0)=I_2$、接平面は $z=0$、[射影公式](#prop-mfl2-projection-matrix)から $P_0=\operatorname{diag}(1,1,0)$。$F(u,v)$ とこの接平面の距離は、垂直座標の絶対値

$$
\operatorname{dist}(F(u,v),\{z=0\})=\frac{|\kappa|}{2}(u^2+v^2)
$$

である。$D^2F[h,h]=(0,0,\kappa\|h\|^2)$ だから前命題で $K=|\kappa|$ と置いた評価は、この例では等号を取る。

**範囲の区別**：二次近似は座標差 $h$ が小さいときの局所結果である。螺旋の別の巻きのように、観測空間で近くても座標値の差が大きい点を同じ局所座標の小球に入れてよいとは限らない。逆に接平面が精度よく一致しても、全周の内在距離まで弦長で置き換えられるわけではない。

## 6. 推定へ向けた次の問い

- 接空間は局所座標表示の Jacobian の像である。観測点だけから $J$ を知るには、近傍が**同じ局所パッチ**から来たと判定する条件が要る。
- 円と螺旋は、外在距離が内在距離を過小評価し得ることを示した。その差を管理するには、曲率や異なる部分の接近度を別に見なければならない。
- 局所の二次誤差が小さいことと、有限標本・ノイズを含む推定誤差が小さいことは別問題である。

次章では、この隙間を埋めるために reach・曲率・近傍の識別可能性を扱う。

## 演習

### MFL2-A01 円の弦長と円弧
- Level: A
- 目安時間: 12分

半径 $R=3$ の円周で中心角 $\alpha=\pi/3$ の二点をとる。外在距離、内在距離、両者の差を求め、[円周の距離公式](#prop-mfl2-circle)の適用条件を確認せよ。

<!-- solution-start -->
#### 詳細解答

$R=3>0$、$0\le\pi/3\le\pi$ なので短い中心角として適用できる。[円周の距離公式](#prop-mfl2-circle)に $R=3,\alpha=\pi/3$ を代入すると

$$
d_{\mathrm{ext}}=2\cdot3\sin(\pi/6)=3,\qquad
d_M=3\cdot\pi/3=\pi.
$$

従って差は $\pi-3>0$。周囲の直線で結ぶ長さ3は円周上の移動経路ではないため、内在距離より短くなる。
<!-- solution-end -->

### MFL2-A02 螺旋の一巻き
- Level: A
- 目安時間: 15分

$H(t)=(2\cos t,2\sin t,t/10)$ に対し $H(0)$ と $H(2\pi)$ の外在距離と内在距離を求めよ。$t\mapsto H(t)$ が埋め込みとなる理由も述べよ。

<!-- solution-start -->
#### 詳細解答

$R=2,a=1/10>0$。[螺旋の距離公式](#prop-mfl2-helix)で $s=0,t=2\pi$ とすると $\sin\pi=0$ だから

$$
d_{\mathrm{ext}}=a(2\pi)=\frac{\pi}{5},\qquad
d_M=\sqrt{4+\frac1{100}}\,(2\pi)=\frac{\pi\sqrt{401}}5.
$$

第三成分 $z=t/10$ が一対一で $t=10z$ と復元でき、逆写像は連続。また $H'(t)=(-2\sin t,2\cos t,1/10)$ のノルムは $\sqrt{401}/10>0$ なので局所的な階数も1。従って全体として埋め込みである。
<!-- solution-end -->

### MFL2-A03 円周の接空間と射影
- Level: A
- 目安時間: 15分

$F(\theta)=(5\cos\theta,5\sin\theta)$ の $\theta=\pi/2$ で $J,G,P$ を求め、$v=(3,4)$ を接成分・法成分に分解せよ。

<!-- solution-start -->
#### 詳細解答

$J=F'(\pi/2)=(-5,0)^{\mathsf T}$、$G=J^{\mathsf T}J=(25)$ で階数1かつ正定値。よって[射影公式](#prop-mfl2-projection-matrix)から

$$
P=J(25)^{-1}J^{\mathsf T}
=\begin{pmatrix}-5\\0\end{pmatrix}\frac1{25}\begin{pmatrix}-5&0\end{pmatrix}
=\begin{pmatrix}1&0\\0&0\end{pmatrix}.
$$

従って $v_T=Pv=(3,0)$、$v_N=(I-P)v=(0,4)$。接方向は水平で、$v_N$ はそれと直交する。
<!-- solution-end -->

### MFL2-A04 放物面の接平面
- Level: A
- 目安時間: 16分

$F(u,v)=(u,v,(u^2+v^2)/2)$ の $(0,0)$ で接平面、射影行列、$F(h,0)$ から接平面までの距離を求めよ。$h\to0$ の誤差次数を答えよ。

<!-- solution-start -->
#### 詳細解答

$DF(u,v)=\begin{pmatrix}1&0\\0&1\\u&v\end{pmatrix}$ なので、原点で列は $e_1,e_2$。従って接アフィン平面は $z=0$、Gram 行列は $I_2$。[射影公式](#prop-mfl2-projection-matrix)へ代入して

$$
P=\begin{pmatrix}1&0&0\\0&1&0\\0&0&0\end{pmatrix}.
$$

$F(h,0)=(h,0,h^2/2)$。平面 $z=0$ への最短距離は高さの絶対値 $h^2/2$。$h\to0$ でこれは $O(h^2)$ だが、一般には $O(h^3)$ ではない（$|h|^2/2$ を $|h|^3$ で割ると発散する）。
<!-- solution-end -->

### MFL2-B01 接空間の基底を替えても射影は同じか
- Level: B
- 目安時間: 22分

$D\times d$ の列フルランク行列 $J$ と可逆 $d\times d$ 行列 $A$ に対し、$J'=JA$ で定めた
$P'=J'(J'^{\mathsf T}J')^{-1}J'^{\mathsf T}$ が $P=J(J^{\mathsf T}J)^{-1}J^{\mathsf T}$ に等しいことを、逆行列の積を計算して示せ。

<!-- solution-start -->
#### 詳細解答

$G=J^{\mathsf T}J$ は正定値だから可逆で、$A$ も可逆である。まず $J'^{\mathsf T}J'=A^{\mathsf T}GA$。逆行列は掛け算によって

$$
(A^{\mathsf T}GA)^{-1}=A^{-1}G^{-1}(A^{\mathsf T})^{-1}
$$

となる（右辺を $A^{\mathsf T}GA$ の右から掛けると $I_d$）。従って

$$
\begin{aligned}
P'&=JA\,[A^{-1}G^{-1}(A^{\mathsf T})^{-1}]\,A^{\mathsf T}J^{\mathsf T}\\
&=J(AA^{-1})G^{-1}((A^{\mathsf T})^{-1}A^{\mathsf T})J^{\mathsf T}\\
&=JG^{-1}J^{\mathsf T}=P.
\end{aligned}
$$

可逆な $A$ は接空間の基底を取り替える係数行列なので、$\operatorname{im}(JA)=\operatorname{im}J$ である。同じ部分空間への射影は[接空間への直交射影の定義](#def-mfl2-projection)により一意である。上では行列積を直接計算して確かめた。
<!-- solution-end -->

### MFL2-B02 円の距離差を五次まで調べる
- Level: B
- 目安時間: 25分

半径 $R$ を固定し $\alpha\downarrow0$ とする。

1. 弦長を $\alpha^5$ の項まで展開せよ。
2. $\lim_{\alpha\downarrow0}(d_M-d_{\mathrm{ext}})/\alpha^3$ を求めよ。
3. $d_{\mathrm{ext}}/d_M\to1$ は全周で距離が等しいことを意味するか。

<!-- solution-start -->
#### 詳細解答

1. $\sin z=z-z^3/6+z^5/120+O(z^7)$ に $z=\alpha/2$ を入れる。[円周の距離公式](#prop-mfl2-circle)の弦長は

$$
2R\sin(\alpha/2)
=2R\left(\frac\alpha2-\frac{\alpha^3}{48}+\frac{\alpha^5}{3840}+O(\alpha^7)\right)
=R\alpha-\frac{R\alpha^3}{24}+\frac{R\alpha^5}{1920}+O(R\alpha^7).
$$

2. $d_M=R\alpha$ より差は

   $$
   d_M-d_{\mathrm{ext}}=\frac{R\alpha^3}{24}-\frac{R\alpha^5}{1920}+O(R\alpha^7).
   $$

   $\alpha^3$ で割ると $R/24-R\alpha^2/1920+O(R\alpha^4)$ となるため、極限は $R/24$。

3. 距離の比は

   $$
   \frac{d_{\mathrm{ext}}}{d_M}=\frac{2\sin(\alpha/2)}{\alpha}\longrightarrow1
   \qquad(\alpha\downarrow0)
   $$

   だが、例えば $\alpha=\pi$ なら弦長は $2R$、内在距離は $\pi R$。この極限は局所主張であり、大域の等距離を意味しない。
<!-- solution-end -->

### MFL2-B03 二次誤差の仮定を使う
- Level: B
- 目安時間: 25分

$F(u,v)=(u,v,\kappa uv)$、$\kappa\in\mathbb R\setminus\{0\}$ とする。

1. 原点での接平面と $G$ を求めよ。
2. 任意の $h=(h_1,h_2)$ に対して二階微分の上界 $\|D^2F[h,h]\|\le|\kappa|\|h\|^2$ を証明せよ。
3. 原点からの接平面距離の上界を示し、どの方向で等号になるか調べよ。

<!-- solution-start -->
#### 詳細解答

1. 各列を $u,v$ で偏微分して

   $$
   DF(u,v)=\begin{pmatrix}1&0\\0&1\\\kappa v&\kappa u\end{pmatrix}.
   $$

   原点では $J=(e_1,e_2)$ で、$Jh=(h_1,h_2,0)$。従って接平面は $z=0$、$G=J^{\mathsf T}J=I_2$。

2. 方向 $h=(h_1,h_2)$ に沿って $F(th_1,th_2)$ を二回微分すると、

   $$
   \left.\frac{d^2}{dt^2}F(th_1,th_2)\right|_{t=0}
   =D^2F(0)[h,h]=(0,0,2\kappa h_1h_2).
   $$

   この二階微分は基点に依存しない。$(|h_1|-|h_2|)^2\ge0$ より $2|h_1h_2|\le h_1^2+h_2^2=\|h\|^2$ なので、全基点で $\|D^2F(u,v)[h,h]\|\le|\kappa|\|h\|^2$。

3. [二次局所近似の命題](#prop-mfl2-second-order)では全基点の上界が成り立つため $K=|\kappa|$ と置け、距離は $|\kappa|\|h\|^2/2$ 以下である。実際に $F(h_1,h_2)$ と平面 $z=0$ の距離は $|\kappa h_1h_2|$。第2問の不等式が等号となる $|h_1|=|h_2|$ の方向（および $h=0$）で上界は達成される。
<!-- solution-end -->

### MFL2-C01 大域的近接が局所近接を保証しない
- Level: C
- 目安時間: 40分

$R=1$ を固定し、$a_n=1/n$、$H_n(t)=(\cos t,\sin t,a_nt)$、$M_n=H_n(\mathbb R)$ とする。

1. $x_n=H_n(0)$、$y_n=H_n(2\pi)$ の外在距離と内在距離をそれぞれ求め、$n\to\infty$ の極限を調べよ。
2. $x_n$ と $y_n$ の単位接ベクトルの内積を求めよ。
3. 点同士が空間内で近く、接方向まで一致するのに、内在距離は近くならない理由を幾何学的に説明せよ。
4. この例だけで各固定 $M_n$ 上の十分小さい局所パッチにおける[二次近似](#prop-mfl2-second-order)を否定できるか。

<!-- solution-start -->
#### 詳細解答

1. $a_n=1/n>0$ なので[螺旋の公式](#prop-mfl2-helix)が使える。$t-s=2\pi$ で

   $$
   d_{\mathrm{ext}}(x_n,y_n)=\frac{2\pi}{n}\longrightarrow0,\qquad
   d_{M_n}(x_n,y_n)=2\pi\sqrt{1+\frac1{n^2}}\longrightarrow2\pi.
   $$

   二点は各 $n$ では異なるが、外在距離が0へ近づいても内在距離は0へ近づかない。

2. 曲線パラメータ $t$ で微分すると

   $$
   H_n'(t)=(-\sin t,\cos t,1/n),\qquad
   H_n'(0)=H_n'(2\pi)=(0,1,1/n).
   $$

   両方の単位接ベクトルは $(0,1,1/n)/\sqrt{1+1/n^2}$。分子のノルム二乗が $1+1/n^2$ なので、内積は厳密に1。

3. 接方向は各点での**一次の情報**しか表さない。二点を結ぶ短い直線は螺旋の外を通る。実際に曲線上を進むにはパラメータを $0$ から $2\pi$ へ一巻き変化させなければならない。外在空間で重なりそうな別の巻きと、同じ局所パッチの隣接点は区別する必要がある。

4. 否定できない。[二次近似](#prop-mfl2-second-order)は $u_0$ を固定し、$h$ が同じ局所座標領域の小さいベクトルであるときの評価である。ここで二点のパラメータ差は常に $2\pi$ であり、小さい $h$ の範囲に入らない。例えば $H_n''(t)=(-\cos t,-\sin t,0)$ はノルム1なので、どの固定 $n$ でも

   $$
   \|H_n(t+h)-H_n(t)-H_n'(t)h\|\le\frac12|h|^2
   $$

   が成り立つ。失敗するのは「空間で近い点ならパラメータも近い」と推測した段階である。
<!-- solution-end -->
