# MFL3 Reach・曲率・近傍の識別可能性

<!-- definition-example-audit: strict -->

## 1. 接空間が分かっても「同じ近傍」とは限らない

[前章の接平面の二次近似](../MFL2/index.md#prop-mfl2-second-order)は、一つの局所パラメータ表示の中で座標差を小さくしたときの結論だった。しかし点群から近傍を取るときにはパラメータ座標を知らず、観測空間の Euclid 距離だけを使う。折り畳んだ曲線の別の部分が近づいていれば、接平面の近似がよくても誤った近傍点を選ぶ。

そこで二つの障害を区別する。

- **局所的な曲がり**：一つの枝が曲がるため、接線から離れる。
- **大域的な自己接近**：異なる枝が観測空間内で近づき、Euclid 近傍が枝をまたぐ。

周囲の点から多様体へ戻る**最近点**が一意である領域の幅を測りたい。[OPT2の最近点射影](../../OPT/OPT2/index.md#def-opt2-nearest-point-projection)では凸集合に対する一意性を扱った。ここでは凸でない集合も扱うため、まず閉集合 $M\subset\mathbb R^D$ を考える。点と集合の距離は

$$
\operatorname{dist}(z,M)=\inf_{x\in M}\|z-x\|
$$

である。$M$ が空でない閉集合なら、この下限は達成される。実際、$x_0\in M$ を固定して $\|z-x_n\|\to\operatorname{dist}(z,M)$ とする。十分後の $x_n$ は閉球 $\overline{B_{\|z-x_0\|+1}(z)}$ 内にあり、有限次元の閉有界集合のコンパクト性から収束部分列を持つ。極限は $M$ に属し、距離の下限を達成する。ただし達成点が一つとは限らない。

<a id="def-mfl3-nearest"></a>

<!-- formal-statement-start -->
> **定義（最近点集合と最近点射影）**  
> $M\subset\mathbb R^D$ を空でない閉集合とする。$z\in\mathbb R^D$ に対して最近点集合を

$$
\Pi_M(z)=\{x\in M:\|z-x\|=\operatorname{dist}(z,M)\}
$$

> とする。$\Pi_M(z)$ が一元集合 $\{x\}$ であるとき、その唯一の点を $\pi_M(z)=x$ と書く。$\pi_M$ は一意な最近点を持つ点でのみ定義される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl3-nearest -->
**定義の確認**。半径 $R>0$ の円周 $S_R^1$ と $z=(R+s,0)$（$s>0$）を取る。候補 $x=(R,0)$ までの距離は $s$ である。任意の $y=(R\cos\theta,R\sin\theta)$ について

$$
\|z-y\|^2=(R+s)^2+R^2-2R(R+s)\cos\theta\ge s^2,
$$

等号は $\cos\theta=1$、すなわち $y=x$ のときだけ成立する。従って $\Pi_{S_R^1}(z)=\{(R,0)\}$ である。一方、中心 $z=0$ からは円周上の全点が距離 $R$ にあり、最近点射影は定義できない。
<!-- definition-example-end -->

## 2. 最近点の一意性が保たれる幅

最近点が一意であるという性質は、点が多様体から離れすぎると壊れ得る。どれだけ近ければ**すべての**点について一意であるかを距離で表す。$r$-管状近傍とは $\operatorname{dist}(z,M)<r$ を満たす周囲の点全体である。境界の等号を含めないことが重要である。

<a id="def-mfl3-reach"></a>

<!-- formal-statement-start -->
> **定義（reach）**  
> $M\subset\mathbb R^D$ を空でない閉集合とする。reach を

$$
\operatorname{reach}(M)=
\sup\bigl\{r>0:
\text{すべての }z\text{ with }\operatorname{dist}(z,M)<r
\text{ に対し }|\Pi_M(z)|=1\bigr\}
$$

> とする。条件を満たす正の $r$ がなければ値を $0$ とし、上限がない場合は $+\infty$ とする。正の reach は、ある幅の開管状近傍で[最近点射影](#def-mfl3-nearest)が一意に定義できるという条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl3-reach -->
**定義の確認**（円周）。中心を除くすべての点では、方向 $z/\|z\|$ に沿う円周上の点が最近点になる。中心だけは全円周が最近点集合になる。中心と円周の距離は $R$ なので、距離が $R$ *未満* の点の最近点は一意であり、幅を $R$ より大きくすると中心が含まれる。従って $\operatorname{reach}(S_R^1)=R$。次の命題で候補が真に最短かを計算する。
<!-- definition-example-end -->

<a id="prop-mfl3-circle-reach"></a>

<!-- formal-statement-start -->
> **命題（円周の最近点とreach）**  
> $R>0$、$M=S_R^1=\{x\in\mathbb R^2:\|x\|=R\}$ とする。$z\ne0$ に対して

$$
\pi_M(z)=R\frac{z}{\|z\|},\qquad
\operatorname{dist}(z,M)=\bigl|\|z\|-R\bigr|.
$$

> また $\Pi_M(0)=M$ であり、$\operatorname{reach}(M)=R$ である。
<!-- formal-statement-end -->

### 証明の見取り図

円周上のどの点も長さは $R$。二点の距離二乗を内積で展開すると、$z$ と同じ方向の点が唯一の最小点になる。中心では方向そのものが決まらない。

<!-- proof-start -->
### 証明

$z\ne0$ と $x\in M$ に対し

$$
\|z-x\|^2=\|z\|^2+R^2-2z\cdot x
\ge\|z\|^2+R^2-2R\|z\|
=\bigl(\|z\|-R\bigr)^2.
$$

[Cauchy–Schwarz の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)の等号条件より、$z\cdot x=R\|z\|$ を満たすのは $x=Rz/\|z\|$ のみである。

中心 $z=0$ では、$\|0-x\|=R$ がすべての $x\in M$ で成立する。よって最近点が一意でない周囲の点は中心だけで、その距離は $R$。

reach の定義の不等号は厳密であるため、$r=R$ は許され、$r>R$ は許されない。$\square$
<!-- proof-end -->

注意：reach が正であることは「管内の任意の観測点から真の生成点を復元できる」という意味ではない。最近点が唯一でも、ノイズの方向によって最近点は真の点と異なり得る。

## 3. 曲率は局所的な曲がり、reachは大域的な接近も見る

前章ではパラメータ表示の二階微分で接線からのずれを測った。しかしパラメータの進み方を変えると二階微分そのものは変化する。[GEO10の弧長パラメータ](../../../幾何系/GEO/GEO10/index.md#def-geo10-arc-length-parameter)に従い、曲線を**弧長 $s$** で表して速度のノルムを $1$ にそろえると、曲率という幾何的な量になる。ここでは同じ定義を $\mathbb R^D$ 内の $C^2$ 曲線について明記する。

<a id="def-mfl3-curvature"></a>

<!-- formal-statement-start -->
> **定義（弧長パラメータ曲線の曲率）**  
> $I\subset\mathbb R$ を区間、$\gamma:I\to\mathbb R^D$ を $C^2$ 曲線で、すべての $s\in I$ で $\|\gamma'(s)\|=1$ とする。曲率を

$$
\kappa(s)=\|\gamma''(s)\|
$$

> と定める。$\kappa(s)>0$ なら $1/\kappa(s)$ をその点の曲率半径と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl3-curvature -->
**定義の確認**。半径 $R>0$ の円を $\gamma(s)=(R\cos(s/R),R\sin(s/R))$ と書くと

$$
\gamma'(s)=(-\sin(s/R),\cos(s/R)),\qquad
\gamma''(s)=-\frac1R(\cos(s/R),\sin(s/R)).
$$

ゆえに速度は $1$、曲率は一定で $\kappa=1/R$、曲率半径は $R$。[円周のreach](#prop-mfl3-circle-reach)も $R$ だが、**一般の曲線でreachと最小曲率半径が一致するわけではない**。
<!-- definition-example-end -->

同じ点で $\gamma'\cdot\gamma'=1$ を微分すると $2\gamma'\cdot\gamma''=0$ である。従って加速度は接線に垂直で、曲率は本当に接線の方向変化を測る。曲面では複数の接方向に応じて曲がり方が異なるが、本章の反例は曲線だけで十分に現れる。

### 二重円：最大曲率を固定してreachだけを小さくできる

一つの円の局所曲率は一定でも、近くに別の円を置くと最近点の一意性は壊れる。この最小模型はコンパクトな滑らかな埋め込み多様体（連結とは限らない）である。

<a id="prop-mfl3-double-circle"></a>

<!-- formal-statement-start -->
> **命題（二重円のreachと曲率の分離）**  
> $R>0$、$\delta>0$ とし、同心円の和集合

$$
M=S_R^1\cup S_{R+\delta}^1\subset\mathbb R^2
$$

> を考える。この集合は二つの連結成分からなる滑らかなコンパクト埋め込み一次元多様体である。各成分の曲率は $1/R$ と $1/(R+\delta)$ であり、

$$
\operatorname{reach}(M)=\min\left\{R,\frac{\delta}{2}\right\}.
$$

<!-- formal-statement-end -->

### 証明の見取り図

一つの円への最近点は半径方向で決まる。二つの円への距離を比べ、内外の距離が等しくなる中間円と、方向が定まらない原点を調べる。

<!-- proof-start -->
### 証明

$z\ne0$、$s=\|z\|$ とする。[円周の最近点公式](#prop-mfl3-circle-reach)を半径 $R$ と $R+\delta$ に適用すると、各円での唯一の候補はそれぞれ $Rz/s$ と $(R+\delta)z/s$、距離は $|s-R|$ と $|s-(R+\delta)|$ である。両距離の二乗の差は

$$
(s-R)^2-(s-R-\delta)^2
=\delta(2s-2R-\delta).
$$

従って二つの候補が同じ最短距離になるのは $s=R+\delta/2$ の場合だけで、その最近点距離は $\delta/2$。原点では内側の円の全点が最近点で、距離は $R$。ほかに最近点の非一意性はない。非一意点までの最小距離が $\min\{R,\delta/2\}$ なので reach の式を得る。各円の曲率は[弧長定義](#def-mfl3-curvature)の直接計算から従う。$\square$
<!-- proof-end -->

$R$ を固定して $\delta\downarrow0$ としても最大曲率は $1/R$ のままだが、reach は $\delta/2\to0$ になる。**曲率の上界だけから観測空間の安全な近傍半径を選ぶことはできない**。この例では二つの成分の間の内在距離は有限でないので、次には連結な曲線でも問題が起こることを確認する。

## 4. Euclid近傍が作る偽の近道

観測点 $x$ と $y$ を「近傍」として結ぶ際、しばしば $\|x-y\|<r$ という半径規則を使う。しかし曲線上の移動距離との関係を見なければ、別の枝へ辺を張ってしまう。

<a id="def-mfl3-euclid-neighbor"></a>

<!-- formal-statement-start -->
> **定義（Euclid半径近傍）**  
> $M\subset\mathbb R^D$、$x\in M$、$r>0$ に対し

$$
N_r^{\mathrm{E}}(x)
=\{y\in M:y\ne x,\ \|x-y\|<r\}
$$

> を $x$ の Euclid 半径 $r$ 近傍と呼ぶ。これは周囲の距離だけで選ぶ集合であり、[内在距離](../MFL2/index.md#def-mfl2-distances)が小さいと定義したものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl3-euclid-neighbor -->
**定義の確認**。二重円で $x=(R,0)$、$y=(R+\delta,0)$ とすれば $\|x-y\|=\delta$ だから、$r>\delta$ のとき $y\in N_r^{\mathrm E}(x)$ であり、$r\le\delta$ のとき $y$ は入らない。半径条件が厳密不等号であることも確認できる。
<!-- definition-example-end -->

<a id="prop-mfl3-two-scales"></a>

<!-- formal-statement-start -->
> **命題（二重円の成分間近傍と螺旋の近道）**  
> (i) $M=S_R^1\cup S_{R+\delta}^1$、$R,\delta>0$ とする。異なる成分の点を結ぶ Euclid 半径 $r$ の辺は、$r\le\delta$ なら存在せず、$r>\delta$ なら存在する。  
> (ii) $H(t)=(R\cos t,R\sin t,at)$、$R,a>0$ の連結な螺旋 $M_{R,a}$ について、$x=H(0)$、$y=H(2\pi)$ は

$$
\|x-y\|=2\pi a,\qquad
d_{M_{R,a}}(x,y)=2\pi\sqrt{R^2+a^2}.
$$

> 従って $r>2\pi a$ なら $y\in N_r^{\mathrm E}(x)$ だが、$a\downarrow0$ のとき外在距離は $0$ へ、内在距離は $2\pi R$ へ近づく。
<!-- formal-statement-end -->

### 証明の見取り図

同心円では[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)が二つの半径の差を下から押さえる。螺旋では前章の内在・外在距離の公式に一周分のパラメータ差を代入する。

<!-- proof-start -->
### 証明

(i) $\|x\|=R$、$\|y\|=R+\delta$ なら

$$
\|x-y\|\ge\bigl|\|y\|-\|x\|\bigr|=\delta.
$$

従って $r\le\delta$ で成分間辺はない。一方、同じ半径方向の $x=(R,0)$、$y=(R+\delta,0)$ は距離がちょうど $\delta$ なので、$r>\delta$ で辺になる。

(ii) [螺旋の距離公式](../MFL2/index.md#prop-mfl2-helix)で $s=0,t=2\pi$ を代入すると $\sin\pi=0$ となり上の二式を得る。$R>0$ を固定すれば $\sqrt{R^2+a^2}\to R$。定義により $r>2\pi a$ では近傍辺が作られる。$\square$
<!-- proof-end -->

この螺旋は一つの連結な曲線である。Euclid 近傍グラフの最短路では $x,y$ を一辺の長さ $2\pi a$ で行けるが、真の曲線上の道の長さは約 $2\pi R$ ある。これが Isomap 等の近傍グラフで問題になる **shortcut** の最も簡単な機構である。

### 正のreachがあれば何が言えるのか

正の reach は多様体*外側の点*からの最近点一意性を保証する。一方、半径 $r$ を指定するだけで、有限標本中のすべての辺が局所幾何を忠実に表すとは保証しない。標本間隔・ノイズ・複数の枝の分離なども併せて調べる必要がある。

円だけなら半径に依存する定量的な比較ができる。

<a id="prop-mfl3-circle-local"></a>

<!-- formal-statement-start -->
> **命題（円周の短い弦と内在距離の比較）**  
> $R>0$、$0<r<2R$ とする。半径 $R$ の同一円周上の任意の二点 $x,y$ が $q=\|x-y\|\le r$ を満たすとき、

$$
q\le d_{S_R^1}(x,y)
\le\frac{q}{\sqrt{1-(r/(2R))^2}}.
$$

<!-- formal-statement-end -->

### 証明の見取り図

前章の[円周の内在距離と弦長](../MFL2/index.md#prop-mfl2-circle)から短い中心角を $q$ で解く。$\arcsin$ の導関数を積分して上界を得る。

<!-- proof-start -->
### 証明

[円周の内在距離と弦長](../MFL2/index.md#prop-mfl2-circle)で短い中心角を $\alpha\in[0,\pi]$ とすると、$q=2R\sin(\alpha/2)$、$d_{S_R^1}=R\alpha$。$u=q/(2R)\le r/(2R)<1$ より

$$
d_{S_R^1}=2R\arcsin u,\qquad
\arcsin u=\int_0^u\frac{dt}{\sqrt{1-t^2}}
\le\frac{u}{\sqrt{1-u^2}}.
$$

ここで $0\le t\le u<1$ なら $1/\sqrt{1-t^2}\le1/\sqrt{1-u^2}$ を使った。したがって

$$
d_{S_R^1}\le\frac{2Ru}{\sqrt{1-u^2}}
=\frac{q}{\sqrt{1-(q/(2R))^2}}
\le\frac{q}{\sqrt{1-(r/(2R))^2}}.
$$

左側の不等式は[外在距離が内在距離以下](../MFL2/index.md#prop-mfl2-chord-bound)から従う。$\square$
<!-- proof-end -->

この比較は**同じ円周上の二点**に対してだけ証明した。二重円や螺旋の異なる枝、あるいは一般の埋め込み多様体へ、同じ係数を無条件に移すことはできない。また $r$ を $2R$ に近づけると証明に用いた上界は粗くなる。

## 5. ノイズ下の「射影できる」と「真の点が分かる」

最近点射影を知っても、観測値 $Y=X+\xi$ の $X$ をそのまま返せるわけではない。ここは標本論へ進む前に、決定論的な誤差だけで区別しておく。

<a id="prop-mfl3-distance-stability"></a>

<!-- formal-statement-start -->
> **命題（集合までの距離の安定性と射影可能範囲）**  
> $M\subset\mathbb R^D$ を空でない閉集合とする。任意の $z,w\in\mathbb R^D$ について

$$
\bigl|\operatorname{dist}(z,M)-\operatorname{dist}(w,M)\bigr|
\le\|z-w\|.
$$

> さらに $\operatorname{reach}(M)=\tau>0$、$X\in M$、$Y=X+\xi$、$\|\xi\|<\tau$ なら $\pi_M(Y)$ は一意に定義される。ただし一般に $\pi_M(Y)=X$ とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

三角不等式を任意の $x\in M$ に適用すると、距離関数は観測点の変化以上には変わらない。ノイズの大きさは真の点 $X$ を候補にすれば距離の上界になる。

<!-- proof-start -->
### 証明

任意の $x\in M$ に対し $\|z-x\|\le\|z-w\|+\|w-x\|$。右辺第二項について $x$ の下限をとり、続いて左辺の下限をとると

$$
\operatorname{dist}(z,M)\le\|z-w\|+\operatorname{dist}(w,M).
$$

$z,w$ を交換した不等式を合わせれば絶対値の評価になる。$Y=X+\xi$ では $X\in M$ なので $\operatorname{dist}(Y,M)\le\|Y-X\|=\|\xi\|<\tau$。reach の定義から最近点は一意である。

最後に $M=S_R^1$、$X=(R,0)$、$\xi=(0,\varepsilon)$（$0<|\varepsilon|<R$）とすると、[円周の最近点とreach](#prop-mfl3-circle-reach)により

$$
\pi_M(Y)=\frac{R(R,\varepsilon)}{\sqrt{R^2+\varepsilon^2}}
\ne(R,0)=X.
$$

したがって射影の一意性と潜在点の識別は別である。$\square$
<!-- proof-end -->

**さらに注意**：円周で $z_\pm=(\pm\varepsilon,0)$、$0<\varepsilon<R$ とすると、いずれも円から距離 $R-\varepsilon<R$ で射影は一意だが、

$$
\|\pi_M(z_+)-\pi_M(z_-)\|=2R,\qquad
\|z_+-z_-\|=2\varepsilon.
$$

従ってreach以内であっても、管状近傍の境界に近づくと最近点射影が一様に良い条件数を持つとは限らない。この差は数値的な推定でも重要になる。

## 6. 次章への橋

今回は「有限標本が十分密かどうか」をまだ扱っていない。reach は決定論的な幾何の条件であり、標本が局所領域を取りこぼす確率や、ノイズが許容範囲を越える確率は別に計算する必要がある。

- 円ではreach $R$ と短弦距離の関係を式で把握できた。
- 二重円では小さいreachが曲率だけでは検出できないと分かった。
- 螺旋では連結であってもEuclid近傍が内在距離を大幅に過小評価した。
- 正のreachは最近点の一意性を保証するが、真の生成点の復元や標本グラフの正しさを自動保証しない。

次の MFL4 で、有限被覆・標本密度・観測ノイズを導入して、近傍を実際に見つけられる条件へ進む。

## 演習

### MFL3-A01 円への最近点
- Level: A
- 目安時間: 12分

半径 $R=2$ の円周と $z=(3,4)$ に対し、最近点、距離、reach を求めよ。中心で射影が一意でないことも説明せよ。

<!-- solution-start -->
#### 詳細解答

$\|z\|=5>0$ なので[円周の最近点とreach](#prop-mfl3-circle-reach)から

$$
\pi_M(z)=\frac25(3,4)=\left(\frac65,\frac85\right),\qquad
\operatorname{dist}(z,M)=|5-2|=3.
$$

円周上の候補点のノルムはすべて2であり、距離二乗の最小化は $z\cdot x$ の最大化と同じだから、この候補は一意である。中心ではどの円周上の点も距離2となるので非一意であり、最初の非一意点までの距離から $\operatorname{reach}(M)=2$。
<!-- solution-end -->

### MFL3-A02 円の曲率と短弦
- Level: A
- 目安時間: 15分

半径4の円を弧長表示し、曲率を求めよ。弦長 $q=4$ の二点の内在距離を求め、$r=4$ とした[短弦比較](#prop-mfl3-circle-local)の上界も数値で比較せよ。

<!-- solution-start -->
#### 詳細解答

$\gamma(s)=(4\cos(s/4),4\sin(s/4))$ は $\|\gamma'(s)\|=1$ を満たし、$\gamma''(s)=-(\cos(s/4),\sin(s/4))/4$ より曲率は $1/4$。弦長は $q=2R\sin(\alpha/2)$ なので $4=8\sin(\alpha/2)$、$0\le\alpha\le\pi$ から $\alpha=\pi/3$。従って内在距離は

$$
d_M=R\alpha=\frac{4\pi}{3}\approx4.189.
$$

上界は $q/\sqrt{1-(r/(2R))^2}=4/\sqrt{1-1/4}=8/\sqrt3\approx4.619$。実際に $4\le4\pi/3\le8/\sqrt3$ である。
<!-- solution-end -->

### MFL3-A03 二重円の中間点
- Level: A
- 目安時間: 12分

$M=S_3^1\cup S_{3.2}^1$ のreachと最大曲率を求める。$z=(3.1,0)$ に最近点が何個あるか、具体的な点と距離で示せ。

<!-- solution-start -->
#### 詳細解答

$R=3,\delta=0.2$ なので[二重円の命題](#prop-mfl3-double-circle)から $\operatorname{reach}(M)=\min(3,0.1)=0.1$。曲率は内円 $1/3$、外円 $1/3.2$ だから最大は $1/3$。$z=(3.1,0)$ からの候補は $(3,0)$ と $(3.2,0)$ で、両者までの距離は $0.1$。各円上では半径方向の候補が唯一であり、全体では二つの最近点が存在する。距離がreachと**等しい**点は、一意性を保証する開管状近傍の外側にある。
<!-- solution-end -->

### MFL3-A04 螺旋のEuclid近傍
- Level: A
- 目安時間: 12分

$H(t)=(2\cos t,2\sin t,t/100)$ の $H(0),H(2\pi)$ の外在距離と内在距離を求め、$r=1/10$ の Euclid 半径近傍で結ばれるか判定せよ。

<!-- solution-start -->
#### 詳細解答

$R=2,a=1/100$ で、[螺旋の公式](#prop-mfl3-two-scales)を用いると

$$
\|H(0)-H(2\pi)\|=\frac{\pi}{50}\approx0.0628,\qquad
d_M=2\pi\sqrt{4+10^{-4}}>4\pi.
$$

$\pi/50<0.1$ なので半径 $r=0.1$ の近傍辺ができる。曲線上では一周分（約12.57）の道が必要なのに、観測空間では約0.063の辺で結ばれてしまう。
<!-- solution-end -->

### MFL3-B01 円の射影の条件数
- Level: B
- 目安時間: 22分

半径 $R>0$ の円周について、$\|z\|,\|w\|\ge\rho>0$ なら、最近点射影の差が

$$
\|\pi_M(z)-\pi_M(w)\|\le\frac{2R}{\rho}\|z-w\|
$$

を満たすことを示せ。また射影の一意性だけでは管内で一様な条件数を保証できない例を示せ。

<!-- solution-start -->
#### 詳細解答

$z,w\ne0$ なので[円周の最近点とreach](#prop-mfl3-circle-reach)を使える。三角不等式と[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)から

$$
\begin{aligned}
\left\|\frac z{\|z\|}-\frac w{\|w\|}\right\|
&\le\left\|\frac{z-w}{\|z\|}\right\|
+\|w\|\left|\frac1{\|z\|}-\frac1{\|w\|}\right|\\
&=\frac{\|z-w\|}{\|z\|}
+\frac{|\|w\|-\|z\||}{\|z\|}
\le\frac{2\|z-w\|}{\rho}.
\end{aligned}
$$

両辺に $R$ を掛けると上界を得る。一方 $z_\pm=(\pm\varepsilon,0)$、$0<\varepsilon<R$ では射影像の距離は $2R$、観測点距離は $2\varepsilon$、比は $R/\varepsilon\to\infty$。両点は $\operatorname{dist}(z_\pm,M)=R-\varepsilon<R$ を満たすので、reach以内の一意性は保たれている。
<!-- solution-end -->

### MFL3-B02 ノイズ後の最近点は生成点か
- Level: B
- 目安時間: 20分

閉集合 $M$ について距離関数が1-Lipschitzであることを証明せよ。$\operatorname{reach}(M)=\tau>0$、$X\in M$、$\|\xi\|<\tau$ の下で $Y=X+\xi$ の射影は一意であるが、$X$ と必ず一致しないことを円の例で示せ。

<!-- solution-start -->
#### 詳細解答

任意の $x\in M$ に対する $\|z-x\|\le\|z-w\|+\|w-x\|$ から $x$ の下限をとると $\operatorname{dist}(z,M)\le\|z-w\|+\operatorname{dist}(w,M)$。$z,w$ を交換して二不等式を合わせると

$$
|\operatorname{dist}(z,M)-\operatorname{dist}(w,M)|\le\|z-w\|.
$$

$X$ が候補だから $\operatorname{dist}(Y,M)\le\|Y-X\|=\|\xi\|<\tau$ であり、[reachの定義](#def-mfl3-reach)より射影は一意。円 $M=S_2^1$、$X=(2,0)$、$\xi=(0,1)$ は $\|\xi\|=1<\tau=2$ だが、$Y=(2,1)$ に対し

$$
\pi_M(Y)=2(2,1)/\sqrt5=(4/\sqrt5,2/\sqrt5)\ne(2,0).
$$

射影先は観測値に最も近い点であり、ノイズを発生させた真の点と同じである必要はない。
<!-- solution-end -->

### MFL3-B03 曲率ゼロでもreachは小さい
- Level: B
- 目安時間: 22分

$\delta>0$ とし、平面内の平行二直線 $M=(\mathbb R\times\{0\})\cup(\mathbb R\times\{\delta\})$ を考える。各成分の曲率と $M$ のreachを求めよ。最近点が非一意となる点の全体を示せ。

<!-- solution-start -->
#### 詳細解答

各直線は $\gamma(s)=(s,0)$ または $\gamma(s)=(s,\delta)$ と弧長表示でき、二階微分は0なので曲率は0。$z=(u,v)$ から下側・上側の直線までの距離は $|v|$、$|v-\delta|$、それぞれの唯一の最近点候補は $(u,0)$、$(u,\delta)$ である。

$$
v^2-(v-\delta)^2=\delta(2v-\delta)
$$

より候補が同距離になるのは $v=\delta/2$ の水平直線上だけ。このとき距離は $\delta/2$、それ以外では全体の最近点は一意。従って $\operatorname{reach}(M)=\delta/2$。曲率が全点で0であっても、異なる枝が近ければreachは任意に小さくなる。
<!-- solution-end -->

### MFL3-C01 螺旋の曲率と偽の近道の同時評価
- Level: C
- 目安時間: 35分

$R>0,a>0$ の螺旋 $H(t)=(R\cos t,R\sin t,at)$ を考える。以下を一続きで示せ。

1. 弧長パラメータを与え、その曲率が $\kappa=R/(R^2+a^2)$ であること。
2. $H(0)$ と $H(2\pi)$ が半径 $r$ の Euclid近傍で結ばれる条件、および真の内在距離。
3. $R$ を固定して $a\downarrow0$ とするとき、曲率・外在距離・内在距離がどう変わるか。なぜ曲率の上界だけでは近傍グラフの偽辺を防げないか。

<!-- solution-start -->
#### 詳細解答

$H'(t)=(-R\sin t,R\cos t,a)$ だから速度の大きさは定数 $v=\sqrt{R^2+a^2}>0$。弧長 $s=vt$ として $\gamma(s)=H(s/v)$ と置けば $\gamma'(s)=H'(s/v)/v$ より $\|\gamma'\|=1$。さらに連鎖律をもう一度適用して

$$
\gamma''(s)=\frac1{v^2}H''(s/v)
=-\frac R{R^2+a^2}(\cos(s/v),\sin(s/v),0).
$$

従って[曲率の定義](#def-mfl3-curvature)から $\kappa=R/(R^2+a^2)$。次に[螺旋の距離公式](../MFL2/index.md#prop-mfl2-helix)で $t-s=2\pi$ とすれば

$$
q=\|H(2\pi)-H(0)\|=2\pi a,\qquad
d_M(H(0),H(2\pi))=2\pi\sqrt{R^2+a^2}.
$$

近傍条件は厳密な $q<r$ だから $r>2\pi a$ に限り偽の近道ができる。$a\downarrow0$ では

$$
\kappa\to\frac1R,\qquad q\to0,\qquad d_M\to2\pi R.
$$

しかも各 $a>0$ で螺旋は第三座標からパラメータを復元できる連結な埋め込み曲線である。曲率は $\kappa\le1/R$ に抑えられたままでも、異なる一周の枝を結ぶ辺の長さは0へ近づく。局所的な曲率と大域的な自己接近は別の障害である。
<!-- solution-end -->
