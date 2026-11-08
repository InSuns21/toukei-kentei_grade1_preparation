# MFL21 near-manifold・stratified data・横断実験

<!-- definition-example-audit: strict -->

## 1. 同じ点群に四つの質問をする

これまで、主成分分析（Principal Component Analysis; PCA）を用いた[局所的な接空間推定](../MFL5/index.md#def-mfl5-local-pca)、[近傍グラフ](../MFL7/index.md#def-mfl7-radius-graph)、[Isomapの最短路](../MFL9/index.md#def-mfl9-isomap)、[Laplacian Eigenmapsの固有値問題](../MFL11/index.md#thm-mfl11-spectral)を個別に調べた。しかし同じ点群で、接線は合っているのにグラフが短絡する、グラフは連結でも最短路が大きく歪む、ということが起こり得る。さらに[可視化の二島](../MFL20/index.md#prop-mfl20-disconnected)は真の連結成分の証拠ではなかった。

本章の中心の問いは「**観測から何を復元したつもりなのか、それを何と比較すれば失敗を判定できるのか**」である。円、U字、交差する二直線、平行な近接枝の四模型を使い、一つの数値実験で局所方向、辺、測地距離、有限グラフスペクトルを分けて測る。幾何学的な真値を知っているのは**合成データを生成する側だけ**で、算法へは観測座標のみを渡す。

ここで $D=2$、各曲線の滑らかな部分の次元は $d=1$ とする。一般の高次元多様体の統計的回復を新たに保証する章ではない。むしろ、[MFL3のreach](../MFL3/index.md#def-mfl3-reach)、[MFL4の被覆](../MFL4/index.md#prop-mfl4-covering)などの仮定を失ったとき、どの結論を停止すべきかを実際に計算する。

## 2. 真の曲線と観測値を分ける

観測 $Y_i$ が曲線上に厳密にある場合と、近くに散らばる場合は同じではない。真の点 $X_i$ に雑音を足すという[MFL1の観測模型](../MFL1/index.md#def-mfl1-01-noisy-observation)を出発点にし、雑音の大きさを変える。

<a id="def-mfl21-near-manifold"></a>

<!-- formal-statement-start -->
> **定義（near-manifoldの有限観測模型）**
> $M\subset\mathbb R^2$ を曲線の集合、$X_i\in M$ を潜在点、$\xi_i\in\mathbb R^2$ を摂動とする。$n\ge2$ 個の観測を

$$
Y_i=X_i+\xi_i\quad(1\le i\le n)
$$

> と置く。決定論的な誤差を論じる場合は $\|\xi_i\|\le\eta$ を全 $i$ に仮定する。確率的実験では独立な $\xi_i\sim N(0,\sigma^2I_2)$ を生成するが、このとき固定の $\eta$ 上界は自動的には成り立たない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl21-near-manifold -->
**定義の確認**。半径 $R>0$ の円で $n=2$ とし、潜在点と摂動を次のように選ぶ。

$$
X_1=(R,0),\quad X_2=(-R,0),\quad
\xi_1=(0,\varepsilon),\quad \xi_2=(0,0),
\qquad Y_1=(R,\varepsilon),\quad Y_2=(-R,0).
$$

二つの $X_i$ はともに円上にあり、$\|Y_1-X_1\|=|\varepsilon|$、$\|Y_2-X_2\|=0$。$\eta\ge|\varepsilon|$ と選べば全 $i$ に対して有界摂動である。逆に $\varepsilon\ne0$ では

$$
\|Y_1\|=\sqrt{R^2+\varepsilon^2}\ne R
$$

なので、**観測点が円上にある**とは言えない。Gaussian雑音の下では[MFL1のsupportの命題](../MFL1/index.md#prop-mfl1-01-gaussian-support)により、観測分布の支持を元の円と同一視することもできない。
<!-- definition-example-end -->

滑らかな一本の曲線では接線が一意である。[MFL2の接空間の定義](../MFL2/index.md#def-mfl2-tangent-gram)に従えば、$C^1$ パラメータ曲線 $c(t)$ の速度 $dc/dt$ が零でない点では、その速度が張る直線が接線である。しかし二本の直線が交差すると、一方の直線に沿って近づいた接線と、もう一方に沿って近づいた接線が異なる。これは単なる大きな曲率ではなく、**滑らかな単一曲線という模型自体の破綻**である。以下で「層」は最小限の有限模型で定義し、一般のWhitney層状空間の定理は前提にしない。

<a id="def-mfl21-strata"></a>

<!-- formal-statement-start -->
> **定義（層別曲線模型と特異点）**
> 有限個の $C^1$ 曲線片 $M_b$（層の番号 $b$）の和集合を扱う。

$$
S=\bigcup_{b=1}^q M_b\subset\mathbb R^2.
$$

> 生成時に各潜在点 $X_i$ の層番号 $b_i$ を保持する。互いに異なる接線を持つ曲線片が同一点 $p$ で交わるとき、$p$ は本章の**交差特異点**であり、$S$ 全体の一次元接線 $T_pS$ を一意に割り当てない。各層の接線 $T_pM_b$ は別々に扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl21-strata -->
**定義の確認**。二つの曲線片を次のパラメータ表示で与える（$-1\le t\le1$）。

$$
c_1(t)=(t,0),\qquad c_2(t)=(0,t),\qquad M_b=\{c_b(t):-1\le t\le1\}\quad(b=1,2).
$$

各曲線は $C^1$ で、速度は

$$
\frac{dc_1}{dt}=(1,0),\qquad \frac{dc_2}{dt}=(0,1).
$$

両速度は全区間で非零なので、[接空間の判定](../MFL2/index.md#def-mfl2-tangent-gram)により各層の接線を定める（端点では片側からの接方向）。原点で交わっても接方向が異なるため、和集合に単一の一次元接線を割り当てることはできない。

層番号は生成時の正解ラベルであり、**局所PCAへ入力してよい説明変数ではない**。同じ場所に二つの層ラベル付き潜在点が現れても、観測上は区別できない。
<!-- definition-example-end -->

## 3. 四つの真値――円、U字、交差線、近接枝

測地距離を測るには、まず何を「真の距離」とするかを固定しなければならない。[MFL2の内在距離](../MFL2/index.md#def-mfl2-distances)に従い、各曲線に沿って進む長さの最小値を用いる。円周長 $L=2\pi R$、その弧長座標を $s\in[0,L)$ とし、U字は左上端から右上端までの弧長 $s\in[0,L_U]$ を使う。

U字は長さ $2R$ の左垂直線、半径 $g/2$ の下半円、長さ $2R$ の右垂直線を滑らかな接線で連結する。従って全長は $L_U=4R+\pi g/2$。角のない結合で接線は一意だが、結合点で曲率は連続とは限らない。交差線と異なり、U字は全体として一本の曲線である。円の半径 $R$ を小さくすると曲率 $1/R$ が大きくなり、U字と近接枝の $g$ を小さくすると両枝が外在的に近づく。

<a id="def-mfl21-oracle"></a>

<!-- formal-statement-start -->
> **定義（四模型の潜在距離）**
> 次の有限潜在点と、その間の距離 $d_*(i,j)$ を定める。円では半径 $R>0$、U字では一つの連結な曲線に沿う弧長 $s_i$、交差線では水平・垂直二層上の符号付き原点距離 $s_i$、近接枝では距離 $g>0$ だけ離れた二本の平行線分の層番号 $b_i\in\{0,1\}$ を持つものとする。

$$
d_*(i,j)=
\begin{cases}
\min(|s_i-s_j|,L-|s_i-s_j|)&\text{円},\\
|s_i-s_j|&\text{U字},\\
|s_i-s_j|&\text{交差線・同じ層},\\
|s_i|+|s_j|&\text{交差線・異なる層},\\
|s_i-s_j|&\text{近接枝・同じ層},\\
+\infty&\text{近接枝・異なる層}.
\end{cases}
$$

> 交差線は原点で二層が結合している経路空間、近接枝は二つの非連結な線分の和として距離を定める。$+\infty$ は経路が存在しないことを表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl21-oracle -->
**定義の確認**。半径1の円で弧長座標を $s_1=0,s_2=3\pi/2$ とすれば、二方向の弧長を比較して

$$
d_*(1,2)=\min(3\pi/2,2\pi-3\pi/2)=\pi/2.
$$

U字では $R=g=1$ とし、両端から弧長1だけ内側の二点を選ぶ。同じ一本の曲線の弧長座標差は $L_U-2=2+\pi/2$ である。交差線で $X_1=(a,0),X_2=(0,b)$、$a,b>0$ なら、原点まで水平に $a$、垂直に $b$ 進むから $d_*=a+b$ となる。

近接枝の二点は Euclid 距離が有限でも異なる連結成分にあり、$d_*=+\infty$ である。この違いをグラフ算法の出力だけから決めてはならない。
<!-- definition-example-end -->

## 4. 雑音が辺を変える余裕幅

観測距離 $\widehat d_{ij}=\|Y_i-Y_j\|$ で[MFL7の半径グラフ](../MFL7/index.md#def-mfl7-radius-graph)を作る。潜在距離の真値ではなく、潜在点の**Euclid距離** $d^E_{ij}=\|X_i-X_j\|$ と比較して、同じ辺を保つ条件を先に調べる。

<a id="prop-mfl21-noise-margin"></a>

<!-- formal-statement-start -->
> **命題（有界雑音による辺の安定余裕）**
> $Y_i=X_i+\xi_i\in\mathbb R^D$、すべての $i$ で $\|\xi_i\|\le\eta$ とする。任意の二頂点について

$$
|\widehat d_{ij}-d^E_{ij}|\le2\eta.
$$

> 半径 $r>0$ の厳密閾値グラフでは、$d^E_{ij}<r-2\eta$ なら観測でも辺があり、$d^E_{ij}\ge r+2\eta$ なら観測でも辺がない。中間帯では有無を一律には保証できない。
<!-- formal-statement-end -->

### 証明の見取り図

二点間の差ベクトルに加わる雑音は $\xi_i-\xi_j$ であり、その大きさは最大 $2\eta$。三角不等式を往復して距離差を評価する。

<!-- proof-start -->
### 証明

$a=X_i-X_j$、$e=\xi_i-\xi_j$ と置く。三角不等式から $\|a+e\|\le\|a\|+\|e\|$、また $\|a\|=\|(a+e)-e\|\le\|a+e\|+\|e\|$。二式を合わせて

$$
|\|a+e\|-\|a\||\le\|e\|
\le\|\xi_i\|+\|\xi_j\|\le2\eta.
$$

従って $d^E_{ij}<r-2\eta$ なら $\widehat d_{ij}\le d^E_{ij}+2\eta<r$ で辺がある。一方 $d^E_{ij}\ge r+2\eta$ なら $\widehat d_{ij}\ge d^E_{ij}-2\eta\ge r$ で辺がない。等号側は厳密閾値の非辺である。$\square$
<!-- proof-end -->

この命題は雑音の**実現値**が有界な場合の決定論的な保証である。Gaussian模型で $\sigma=\eta$ と置くだけでは使用できない。確率的な保証にするには最大雑音の確率評価を別に与える必要がある。

## 5. 近接枝の偽連結性と交差点の近道

近接枝は、各枝に沿った標本間隔を $h$、枝間距離を $g$ とする。元の二本は非連結だが、半径を少し大きくするだけで横断辺が張られる。

<a id="prop-mfl21-parallel-branches"></a>

<!-- formal-statement-start -->
> **命題（平行二枝の連結性と安全な半径）**
> 各枝に $m\ge2$ 個の点 $X_{b,j}=(jh,bg)$（$b=0,1$、$j=0,\ldots,m-1$）、$h,g>0$ を置く。無雑音の半径 $r$ グラフで $h<r\le g$ なら成分はちょうど二つで、$r>\max(h,g)$ なら一つになる。さらに全観測誤差が $\eta$ 以下なら

$$
h+2\eta<r\le g-2\eta
$$

> を満たす半径は、各枝の連続する点を結び、枝間辺を作らず、ちょうど二成分を保つ。この区間が存在する十分かつ必要な条件は $g>h+4\eta$ である。
<!-- formal-statement-end -->

### 証明の見取り図

枝内の隣接点は距離 $h$、枝間の最短距離は $g$。前節の雑音余裕をこれらの距離へ代入する。

<!-- proof-start -->
### 証明

無雑音なら同じ枝の連続する頂点の距離は $h<r$ なので各枝は連結する。異なる枝では距離 $\sqrt{(j-k)^2h^2+g^2}\ge g\ge r$ なので辺がない。一方 $r>\max(h,g)$ なら各枝の隣接辺と $(X_{0,j},X_{1,j})$ の横断辺が存在し、全頂点は一つの連結成分に入る。

有界雑音では、枝内隣接辺の観測距離は前命題から $\widehat d\le h+2\eta<r$。任意の枝間点は $d^E\ge g$ なので $\widehat d\ge g-2\eta\ge r$、従って枝間辺はない。この二つの条件を満たす実数 $r$ の存在は $h+2\eta<g-2\eta$、すなわち $g>h+4\eta$ と同値である。$\square$
<!-- proof-end -->

**失敗機構**。$r>g$ では真の異なる連結成分を「観測Euclid距離が近いから」という理由で結んでしまう。これは[MFL3の近傍尺度](../MFL3/index.md#prop-mfl3-two-scales)を選べなかった失敗である。$g\le h+4\eta$ の場合も、上の**一様保証が使えない**というだけで、特定の雑音実現値で正しいグラフが絶対に得られないとまでは言っていない。

交差線では別の落とし穴がある。交点を通る経路自体は許されるが、交点を飛ばして斜めの辺で進めば、曲線上の最短路より短くなる。

<a id="prop-mfl21-crossing-shortcut"></a>

<!-- formal-statement-start -->
> **命題（交差線の対角近道）**
> $a,b>0$ とし、水平・垂直の二線分が原点で交差する集合 $S$ 上の $P=(a,0)$、$Q=(0,b)$ を考える。$S$ 上の経路距離は $a+b$、直線距離は $\sqrt{a^2+b^2}$ であり、

$$
1<\frac{a+b}{\sqrt{a^2+b^2}}\le\sqrt2.
$$

> 等号 $\sqrt2$ は $a=b$ のときに成立する。各辺をEuclid長で重み付けし、$P,Q$ 間の直線辺を採用したグラフの最短路は $\sqrt{a^2+b^2}$ となり、真の経路距離を過小評価する。
<!-- formal-statement-end -->

### 証明の見取り図

曲線内で水平枝から垂直枝へ移るには原点を通る。一方、平面の斜辺は二辺の和より短い。

<!-- proof-start -->
### 証明

二枝の共通点は原点のみなので、連続な経路は水平枝の $P$ から原点へ長さ少なくとも $a$、原点から $Q$ へ長さ少なくとも $b$ だけ進む。二線分を順にたどれば長さ $a+b$ を達成する。一方、直線距離は $\|P-Q\|=\sqrt{a^2+b^2}$。

両者の比の下界と上界は、正数 $a,b$ についての次の二式から得られる。

$$
(a+b)^2-(a^2+b^2)=2ab>0,\qquad
2(a^2+b^2)-(a+b)^2=(a-b)^2\ge0.
$$

平方根を取って正の $\sqrt{a^2+b^2}$ で割れば、命題の範囲を得る。直線辺があるグラフの最短路はその一辺を選べるので、上界は直線距離である。

逆にどのグラフ経路も各Euclid辺長の和であり、三角不等式から長さは $\|P-Q\|$ 以上。従って最短路は直線距離に等しい。$\square$
<!-- proof-end -->

交点の直後の点をいくら密に観測しても、「各点に一意の接線がある」という前提は**交点そのもの**では回復しない。逆に交点を除く各層内では接線を定義できる。ここを「一律の誤差が大きい」とだけ報告せず、接線の真値が一意でない箇所と、推定対象が定義できる箇所を分離する。

## 6. 円では近傍を正しく選べば距離誤差を計算できる

失敗例だけでなく、正しい尺度の有効性も確かめる。半径 $R$ の円に等間隔 $N\ge5$ 点を置き、隣接点だけが結ばれる半径を選ぶ。円の弦は弧より短いが、その誤差は明示的に計算できる。

<a id="prop-mfl21-circle-error"></a>

<!-- formal-statement-start -->
> **命題（等間隔円の有限グラフ測地誤差）**
> 半径 $R>0$ の円に $N\ge5$ 点 $X_j=(R\cos(2\pi j/N),R\sin(2\pi j/N))$ を置く。観測雑音はなく、閾値 $r$ は

$$
2R\sin(\pi/N)<r\le2R\sin(2\pi/N)
$$

> を満たすとする。半径グラフは $N$ 頂点のサイクルとなる。任意の二頂点 $i\ne j$ について、各辺にEuclid長を持つグラフ最短路と真の円周距離の比は

$$
\frac{d_G(i,j)}{d_*(i,j)}
=\frac{\sin(\pi/N)}{\pi/N},\qquad
0\le1-\frac{d_G(i,j)}{d_*(i,j)}\le\frac{\pi^2}{6N^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

両方向の辺数の少ない方を数える。真の弧長と弦長には同じ辺数が掛かり、比が消える。

<!-- proof-start -->
### 証明

角度差 $2\pi/N$ の隣接弦長は $c=2R\sin(\pi/N)$。異なる非隣接点の最短角度差は $4\pi/N$ なので弦長は少なくとも $2R\sin(2\pi/N)\ge r$。従って隣接辺だけのサイクルとなる。$k=\min(|i-j|,N-|i-j|)$ とすると、グラフ経路は $k$ 辺、円弧は角度 $2\pi k/N$ に対応するため

$$
d_G=2kR\sin(\pi/N),\qquad d_*=2\pi kR/N.
$$

比の式を得る。$x\ge0$ では $\sin x\le x$。さらに $x-\sin x=\int_0^x(1-\cos t)\,dt$、$1-\cos t=2\sin^2(t/2)\le t^2/2$ なので $0\le x-\sin x\le x^3/6$。$x=\pi/N>0$ で $x$ により割って上界を得る。$\square$
<!-- proof-end -->

この式は**等間隔・無雑音・正しい隣接辺**という条件付きである。枝の近道や非連結、雑音を含むグラフへ $O(N^{-2})$ をそのまま移すことはできない。

## 7. 四つの誤差は別の列で報告する

第一に接空間。滑らかな層の潜在接方向を単位ベクトル $t_i$ とし、局所PCAの推定単位方向を $u_i$ とする。[MFL5の射影距離](../MFL5/index.md#def-mfl5-projection-distance)は、$D=2,d=1$ で次の形になる。

$$
\|u_iu_i^{\mathsf T}-t_it_i^{\mathsf T}\|_{\rm op}
=|\det(u_i,t_i)|.
$$

ここで $\det(u_i,t_i)$ は二つの単位列ベクトルを並べた $2\times2$ 行列の行列式であり、成分で書けば $u_{i1}t_{i2}-u_{i2}t_{i1}$ である。

基底を回転して $t_i=(1,0)$、$u_i=(\cos\theta,\sin\theta)$ と書けば、[MFL5の定義例](../MFL5/index.md#def-mfl5-projection-distance)により射影距離も行列式の絶対値も $|\sin\theta|$ となる。直交基底の回転でこの絶対値は変わらない。固有値が重なって方向を選べない点は未評価として数え、交点では層ごとの接方向だけと比較し、単一の $T_pS$ を捏造しない。

第二に近傍の辺。真の曲線上で大きく離れた点や、異なる非連結枝を結ぶことを検出したい。第三に最短路。第四にスペクトル。指標そのものの意味を固定する。

<a id="def-mfl21-diagnostics"></a>

<!-- formal-statement-start -->
> **定義（横断幾何診断）**
> 有限潜在点 $X_1,\ldots,X_n$、観測グラフ $G$、正の真距離が有限である組の集合 $F=\{(i,j):i<j,0<d_*(i,j)<\infty\}$ を固定する。$d_G$ は観測辺に $\|Y_i-Y_j\|$ を付けた[MFL9の最短路距離](../MFL9/index.md#def-mfl9-shortest-path)（到達不能なら $+\infty$）とする。$F_0=\{(i,j)\in F:d_G(i,j)<\infty\}$ に対して

$$
E_{\mathrm{geo}}=\frac1{|F_0|}\sum_{(i,j)\in F_0}
\frac{|d_G(i,j)-d_*(i,j)|}{d_*(i,j)},\qquad
N_{\rm miss}=|F\setminus F_0|
$$

> と置く（$F_0=\varnothing$ なら $E_{\rm geo}$ は未定義と報告）。接線方向が定義・推定できた点での射影距離の平均を $E_{\rm tan}$ とする。また本章の数値ラボに限り、観測辺のうち $d_*=+\infty$ または $d_*>1.25\|Y_i-Y_j\|$ のものを**短絡候補辺**と数える。倍率 $1.25$ は診断用の明示的な閾値であって普遍定数ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl21-diagnostics -->
**定義の確認**。真距離が $(d_*(1,2),d_*(1,3),d_*(2,3))=(1,2,1)$、観測グラフが辺 $\{1,2\}$ だけ（長さ1）の場合、$F_0=\{(1,2)\}$、$N_{\rm miss}=2$、$E_{\rm geo}=|1-1|/1=0$。**平均誤差0でも、二組は到達不能**である。従って $N_{\rm miss}$ を一緒に表示しなければ結果を誤読する。交差線で $a=b=1$ の斜辺は $d_*=2$、観測弦長 $\sqrt2$ なので $2>1.25\sqrt2$ を満たし短絡候補となる。
<!-- definition-example-end -->

スペクトルを別の列にするのは、距離の誤差と固有空間の誤差を一つの数に潰せないからである。[MFL19のスペクトル収束](../MFL19/index.md#thm-mfl19-eigenspaces)はエネルギーのコンパクト性や固有値ギャップ等を要した。ここでは比較対象を**同じ頂点集合の有限グラフ**に限定する。

<a id="def-mfl21-finite-spectrum"></a>

<!-- formal-statement-start -->
> **定義（有限グラフスペクトル診断）**
> $n$ 頂点の無向単純グラフの隣接行列を $A=(A_{ij})$（辺があるとき1、それ以外は0）とする。次数 $d_i=\sum_jA_{ij}$ から次数対角行列 $D_{\rm deg}=\operatorname{diag}(d_1,\ldots,d_n)$ を作る。正次数の頂点集合 $V_+=\{i:d_i>0\}$ 上では、$D_{\rm deg}^{-1/2}$ を対角成分 $1/\sqrt{d_i}$ の行列として

$$
L_{\rm sym}=I-D_{\rm deg}^{-1/2}AD_{\rm deg}^{-1/2}\quad\text{（正次数部分）}
$$

> と定め、孤立頂点の行・列は零とする。$D_{\rm deg}$ は冒頭の空間次元 $D=2$ とは別物である。同じ頂点で真の枝に沿う隣接点だけを結ぶ参照グラフ $G_*$ を固定し、両グラフの固有値を非減少に $\lambda_0\le\cdots\le\lambda_{n-1}$、$\lambda^*_0\le\cdots\le\lambda^*_{n-1}$ と並べる。最初の整数 $1\le q\le n$ について

$$
E_{\mathrm{spec},q}=\left(\sum_{j=0}^{q-1}(\lambda_j-\lambda_j^*)^2\right)^{1/2}
$$

> を有限グラフスペクトル診断とする。**連続Laplace–Beltrami作用素との固有値・固有空間誤差ではない**。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl21-finite-spectrum -->
**定義の確認**。二つの孤立した辺 $\{1,2\}$、$\{3,4\}$ からなる参照グラフ $G_*$ では全次数が1。標準基底の各座標に対し、隣接行列の非零成分 $A_{12}=A_{21}=A_{34}=A_{43}=1$ と $D_{\rm deg}=I_4$ を代入すると、各辺の $L_{\rm sym}$ は $\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$ となる。固有ベクトル $(1,1)$ と $(1,-1)$ の固有値は0と2なので、参照固有値は $(0,0,2,2)$。

観測側に横断辺 $\{2,3\}$ を追加すると4頂点の道となり、次数は $(1,2,2,1)$。このとき正規化隣接行列 $B=D_{\rm deg}^{-1/2}AD_{\rm deg}^{-1/2}$ の非零成分は $B_{12}=B_{34}=1/\sqrt2$、$B_{23}=1/2$（対称な位置も同様）である。左右反転に対する対称ベクトル $(a,b,b,a)$、反対称ベクトル $(a,b,-b,-a)$ の係数 $(a,b)$ 上では、それぞれ

$$
B_+=\begin{pmatrix}0&1/\sqrt2\\1/\sqrt2&1/2\end{pmatrix},\qquad
B_-=\begin{pmatrix}0&1/\sqrt2\\1/\sqrt2&-1/2\end{pmatrix}.
$$

それぞれの特性多項式は $\lambda^2-\lambda/2-1/2=(\lambda-1)(\lambda+1/2)$ と $\lambda^2+\lambda/2-1/2=(\lambda-1/2)(\lambda+1)$。従って $B$ の固有値は $1,-1/2,1/2,-1$、$L_{\rm sym}=I-B$ の固有値は $(0,1/2,3/2,2)$。$q=4$ なら

$$
E_{\mathrm{spec},4}=\sqrt{(1/2-0)^2+(3/2-2)^2}=\frac1{\sqrt2}.
$$

零固有値の個数も2から1へ変わる。横断辺を足しても元の固有値をそのまま使うことはできない。
<!-- definition-example-end -->

<a id="prop-mfl21-zero-eigenvalues"></a>

<!-- formal-statement-start -->
> **命題（正規化グラフLaplacianの零固有値）**
> 前定義の有限無向単純グラフの $L_{\rm sym}$ は半正定値で、固有値0の重複度は孤立点も含めた連結成分数に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

正次数頂点では $v_i=u_i/\sqrt{d_i}$ と変数変換すると、二次形式は辺の両端の差の平方和になる。零となるのは各成分で $v_i$ が一定のときに限る。

<!-- proof-start -->
### 証明

正次数集合を $V_+$、孤立頂点を $V_0$ とする。$i\in V_+$ で $v_i=u_i/\sqrt{d_i}$ と置けば

$$
\begin{aligned}
u^{\mathsf T}L_{\rm sym}u
&=\sum_{i\in V_+}u_i^2-\sum_{i,j\in V_+}A_{ij}v_iv_j\\
&=\sum_{i\in V_+}d_iv_i^2-\sum_{i,j\in V_+}A_{ij}v_iv_j\\
&=\sum_{\{i,j\}\in E}(v_i-v_j)^2\ge0.
\end{aligned}
$$

二行目では $\sum_jA_{ij}=d_i$、三行目では無向辺の両向きが一回ずつ数えられることを使った。零なら各辺で $v_i=v_j$ だから、各正次数連結成分で $v_i$ は一定である。逆に各成分で一定なら二次形式は0で、半正定値対称行列の固有分解により $L_{\rm sym}u=0$。一つの正次数成分ごとに一つの自由な定数があり、孤立頂点では定義上その行・列が零で $u_i$ は自由である。従って核の次元は連結成分数に等しい。$\square$
<!-- proof-end -->

重要な限界は、**スペクトルの零の個数は作ったグラフの成分を表すだけ**ということ。真の曲線の成分を復元した証明にはならない。さらに固有値の近さだけで固有ベクトルの近さは保証されず、[MFL19の固有空間比較](../MFL19/index.md#def-mfl19-projection)のような射影やギャップの議論が別に必要である。

## 8. 再現可能な実験と、独立な再評価

乱数種は[MC2のシードの定義](../../../計算系/MC/MC2/index.md#def-mc2-seed)に従い、同じ実装と設定をもう一度実行できるよう保存する。異なるシードが必ず統計的に独立な乱数ストリームを生むという意味ではない。

付属の[標準Pythonラボ](geometry_cross_lab.py)は外部パッケージなしで四模型を生成する。`--density` は弧長パラメータの分布を単調に歪める決定論的な標本密度変化、`--noise` は各座標への独立な正規雑音の標準偏差、`--seed` はその乱数種である。`--method radius` は厳密閾値の辺、`--method knn` は同距離時に添字の小さい候補を優先するunion kNNであり、接線PCAの窓だけはどちらの場合も `--threshold` を用いる。円の半径・U字の長さには `--radius`、U字の枝間隔と近接平行枝の距離には `--gap` を使う。

```bash
python textbook/volumes/dream_thater/応用系/MFL/MFL21/geometry_cross_lab.py --preset circle --points 24 --radius 1 --threshold 0.35 --seed 7
python textbook/volumes/dream_thater/応用系/MFL/MFL21/geometry_cross_lab.py --preset u --gap 0.35 --threshold 0.6 --noise 0.01 --seed 7
python textbook/volumes/dream_thater/応用系/MFL/MFL21/geometry_cross_lab.py --preset cross --threshold 0.65 --method knn --neighbors 2
python textbook/volumes/dream_thater/応用系/MFL/MFL21/geometry_cross_lab.py --preset branches --gap 0.35 --threshold 0.65
python textbook/volumes/dream_thater/応用系/MFL/MFL21/geometry_cross_lab.py --self-test
```

```python-file-lab
# lab-id: MFL21-GEOMETRY-CROSS
# lab-title: 円・U字・交差線・近接枝
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL21/geometry_cross_lab.py
# timeout-ms: 60000
# lab-preset: 円周の正しい辺 | --preset circle --points 24 --radius 1 --threshold 0.35 --seed 7
# lab-preset: U字の短絡候補 | --preset u --gap 0.35 --threshold 0.6 --noise 0.01 --seed 7
# lab-preset: 交差線の層混合 | --preset cross --threshold 0.65 --method knn --neighbors 2
# lab-preset: 平行枝の偽連結 | --preset branches --gap 0.35 --threshold 0.65
```

JSONには接線の射影距離平均、層混合窓数、横断辺数、短絡候補数、到達不能な潜在点対数、到達可能な点対の測地誤差、最初の5固有値と有限参照グラフとの差を**別々に**出す。零固有値数は計算誤差を含む数値なので、表示値の丸めで比較する。参照グラフは各層の生成順に沿って隣接点を結び、円だけは端を閉じ、交差線だけは原点最近傍を横断接続する有限模型である。したがって参照グラフのスペクトルは**潜在連続作用素のスペクトルではない**。特に交差線で交点をサンプリングしていないとき、この有限参照グラフと理想的な交点を通る距離は別に定めた診断対象である。

### 追加の三次元ストレステスト

交差・近接という失敗が二次元だけの偶然ではないかも確認する。追加の[三次元Pythonラボ](stress_3d_lab.py)は、**二重螺旋、Swiss roll、外れ値**の三種を同じ有限グラフ指標で比較する。三次元局所共分散の最大固有方向（一次元螺旋）または最小固有方向に直交する平面（二次元Swiss roll）を局所PCAとし、真の接方向・法方向との射影距離を測る。固有値ギャップがなく推定方向を選べない窓は未評価として数える。

二重螺旋の第 $b\in\{0,1\}$ 層を、半径 $R>0$ とピッチ $p>0$ で

$$
H_b(t)=(R\cos(t+b\pi),R\sin(t+b\pi),pt),\quad 0\le t\le2\pi
$$

と定める。$H_b'(t)$ は層番号 $b$ を固定し、パラメータ $t$ で微分した $dH_b/dt$ の略記である。速度は

$$
H_b'(t)=(-R\sin(t+b\pi),R\cos(t+b\pi),p),\qquad
\|H_b'(t)\|^2=R^2(\sin^2(t+b\pi)+\cos^2(t+b\pi))+p^2=R^2+p^2.
$$

速度は一定だから、$t_i$ から $t_j$ までの弧長積分は $\int_{\min(t_i,t_j)}^{\max(t_i,t_j)}\|H_b'(t)\|\,dt=\sqrt{R^2+p^2}|t_i-t_j|$。これを**同じ層内**の真の距離とし、異なる層は非連結なので $+\infty$ とする。異なる層の点がEuclid空間で近づくと誤った横断辺が生じ得る。

Swiss rollでは $t\in[3\pi/2,9\pi/2]$、$z\in[-g,g]$ とし、

$$
F(t,z)=(Rt\cos t,Rt\sin t,z).
$$

$F_t$ は $z$ を固定した偏導関数 $\partial F/\partial t$、$F_z$ は $t$ を固定した $\partial F/\partial z$ を表す。$H_b'(t)$ と違って $F$ は二変数の写像である。[積の微分公式](../../../基礎科目/RA/RA3/index.md#prop-ra3-product-rule)より

$$
F_t=(R(\cos t-t\sin t),R(\sin t+t\cos t),0),\qquad F_z=(0,0,1).
$$

表面上の微小変位は $dF=F_t\,dt+F_z\,dz$ だから、Euclid内積から

$$
\langle F_t,F_t\rangle=R^2(1+t^2),\quad
\langle F_t,F_z\rangle=0,\quad
\langle F_z,F_z\rangle=1.
$$

従って誘導計量による線素の二乗は、交差項が消えて

$$
d\ell^2=\|dF\|^2=R^2(1+t^2)\,dt^2+dz^2.
$$

そこで $\operatorname{arsinh}t=\log(t+\sqrt{1+t^2})$（逆双曲線正弦）を用い、

$$
u(t)=\frac R2\left(t\sqrt{1+t^2}+\operatorname{arsinh}t\right),
\qquad du=R\sqrt{1+t^2}\,dt
$$

と置く。ここで $du=u'(t)\,dt$ は全微分（他の独立変数 $z$ を固定）を表す。実際、$d(\operatorname{arsinh}t)/dt=1/\sqrt{1+t^2}$ だから、[積の微分公式](../../../基礎科目/RA/RA3/index.md#prop-ra3-product-rule)を実行すると

$$
u'(t)=\frac R2\left(\sqrt{1+t^2}+\frac{t^2}{\sqrt{1+t^2}}+\frac1{\sqrt{1+t^2}}\right)
=R\sqrt{1+t^2}>0.
$$

従って $du^2=R^2(1+t^2)\,dt^2$、線素は $du^2+dz^2$ となる。$u(t)$ は単調増加する。また $t>0$ では $F(t,z)$ の水平成分の原点からの距離が $Rt$、第三成分が $z$ なので、曲面のパラメータは一意に復元できる。

パラメータの範囲は直積だから、展開先は長方形 $[u(3\pi/2),u(9\pi/2)]\times[-g,g]$ である。長方形内の直線分は全て領域内にあるので、線素の一致と直線の最短性から真の表面内距離を

$$
d_*=\sqrt{(u(t_i)-u(t_j))^2+(z_i-z_j)^2}
$$

と計算できる。**巻かれた表面の異なる巻きの外在的な近さ**を、この展開座標の距離と混同しない。表面の真の法方向は $F_t$ と $F_z$ の両方に直交する方向である。

外れ値模型は円周点群のほかに、曲線上の真値を**指定しない**二点を追加する。この二点を局所PCAの学習窓やグラフの頂点に入れる一方、外れ値を端点とする真の測地距離・接線誤差の平均からは除外する。「真値不明」を零誤差扱いしない。有限参照グラフでは二点を孤立頂点とする**比較用規約**だけを置き、外れ値の連続幾何を定義したことにはしない。

~~~bash
python textbook/volumes/dream_thater/応用系/MFL/MFL21/stress_3d_lab.py --preset double-helix --points 24 --pitch 0.2 --threshold 0.8
python textbook/volumes/dream_thater/応用系/MFL/MFL21/stress_3d_lab.py --preset swiss-roll --points 32 --radius 0.2 --threshold 1.5
python textbook/volumes/dream_thater/応用系/MFL/MFL21/stress_3d_lab.py --preset outliers --points 24 --gap 0.2 --threshold 0.8
python textbook/volumes/dream_thater/応用系/MFL/MFL21/stress_3d_lab.py --self-test
~~~

```python-file-lab
# lab-id: MFL21-GEOMETRY-3D
# lab-title: 二重螺旋・Swiss roll・外れ値
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL21/stress_3d_lab.py
# lab-dependency: textbook/volumes/dream_thater/応用系/MFL/MFL21/geometry_cross_lab.py
# timeout-ms: 60000
# lab-preset: 二重螺旋の近接 | --preset double-helix --points 24 --pitch 0.2 --threshold 0.8
# lab-preset: Swiss rollの展開距離 | --preset swiss-roll --points 32 --radius 0.2 --threshold 1.5
# lab-preset: 外れ値と近傍混入 | --preset outliers --points 24 --gap 0.2 --threshold 0.8
```

以下の表は変更パラメータと、起きるはずの変化を区別するための事前予想である。必ずしもすべての乱数種で単調に変わるとは言わない。

| 模型 | 動かす量 | 主な事前予想 | 停止すべき結論 |
|---|---|---|---|
| 円 | $R,n,r,\sigma$ | 正しいサイクルなら弧長誤差の厳密式、雑音で辺が変動 | 有界誤差の仮定なしの一様保証 |
| U字 | $g,r,\sigma$ | 狭い腕間の斜め辺で測地距離を過小評価 | Euclid近傍なら必ず測地近傍という断定 |
| 交差線 | $r,k,\sigma$ | 層混合PCAと斜めの短絡、交点では接線真値が一意でない | 単一の滑らかな多様体の摂動定理 |
| 近接枝 | $g,r,k$ | $r>g$ で偽連結、零固有値の個数が変わる | 観測グラフの連結性＝潜在連結性 |
| 二重螺旋 | $p,r,k$ | 異なる巻きの横断辺、層内の弧長過小評価 | 二つの層を一つの連結曲線とする仮定 |
| Swiss roll | $R,g,r,k$ | 巻きの近接が展開距離の近さを意味しない | 外在距離を表面測地距離とする仮定 |
| 外れ値 | 外れ点位置・$r,k$ | PCA窓・辺・スペクトルに外れ値が影響 | 外れ値にも接線・真の測地距離があるという仮定 |

ハイパーパラメータ $r,k$ や密度設定を試して**一番良く見える乱数種**だけを残すと、比較は無効になる。[ML1-12の検証選択](../../ML/ML1-12/index.md#def-ml1-12-validation-selection)にならい、たとえば seed 7 の実験を探索用、seed 101 と seed 202 を設定選択に使わない再評価用と事前に決め、**再評価を見てから設定を選び直さない**。別々のseedで擬似乱数列を生成することと、数学的に独立な乱数ストリームが保証されることは区別する。このラボの潜在配置は同じで雑音だけを再抽選するため、別の標本密度や別の母集団への一般化を測ったことにはならない。複数seedの平均・ばらつきを別途記録し、一回の成功を確率保証に格上げしない。

## 9. 演習と詳細解答

<a id="ex-mfl21-a01"></a>

### MFL21-A01 円の弦と弧

- Level: A
- 問題: 半径2、等間隔8点の円で、隣接二点の弦長 $c$ と弧長 $h$、その比を求めよ。最短路を作る半径 $r$ の範囲も示せ。

**詳細解答。** 角度差は $2\pi/8=\pi/4$。半径2の円の弦と弧はそれぞれ

$$
c=2\cdot2\sin(\pi/8)=4\sin(\pi/8),\qquad
h=2\cdot\pi\cdot2/8=\pi/2,
\qquad \frac ch=\frac{8\sin(\pi/8)}\pi.
$$

次近傍は角度差 $\pi/2$ で弦長が $4\sin(\pi/4)=2\sqrt2$。厳密閾値のため、隣接辺だけを残す範囲は

$$
4\sin(\pi/8)<r\le2\sqrt2.
$$

<a id="ex-mfl21-a02"></a>

### MFL21-A02 摂動の二点間余裕

- Level: A
- 問題: $\|\xi_i\|\le0.02$、潜在二点間距離 $0.14$、半径閾値 $r=0.20$ の場合、辺は必ず残るか。潜在距離が $0.26$ の場合はどうか。

**詳細解答。** [雑音余裕命題](#prop-mfl21-noise-margin)で観測距離と潜在Euclid距離の差は高々 $2\eta=0.04$。従って

$$
\widehat d_{12}\le0.14+0.04=0.18<0.20\quad\text{（前者は必ず辺）},
$$

$$
\widehat d_{12}\ge0.26-0.04=0.22\ge0.20\quad\text{（後者は必ず非辺）}.
$$

これは経路距離の比較ではなく、一辺のEuclid距離の判定である（両場合の二点を別の実験として扱う）。

<a id="ex-mfl21-a03"></a>

### MFL21-A03 二枝の閾値

- Level: A
- 問題: 枝内の隣接間隔 $h=0.15$、枝間距離 $g=0.35$、無雑音で $r=0.20$ と $r=0.40$ の連結成分数を求めよ。

**詳細解答。** [二枝の命題](#prop-mfl21-parallel-branches)の距離条件へ代入する。

$$
h=0.15<r=0.20\le g=0.35
$$

なので各枝の隣接点をつなぐが横断辺を作らず、二成分。一方

$$
r=0.40>\max(h,g)=0.35
$$

では枝内隣接辺と同じ横位置の横断辺を作り、一成分となる。

<a id="ex-mfl21-a04"></a>

### MFL21-A04 正規化Laplacianの零

- Level: A
- 問題: $n=3$、辺 $\{1,2\}$ のみの無向グラフについて $L_{\rm sym}$ と全固有値を求めよ。孤立頂点の対角を1としてよいか。

**詳細解答。** 次数は $(1,1,0)$ なので定義により

$$
L_{\rm sym}=\begin{pmatrix}1&-1&0\\-1&1&0\\0&0&0\end{pmatrix}.
$$

最初の二次ブロックは $(1,1)$ に固有値0、$(1,-1)$ に固有値2、第三座標に固有値0を与える。従って $(0,0,2)$。孤立頂点の対角は本章の**明示規約で零**なので1にしてはならない。

<a id="ex-mfl21-b01"></a>

### MFL21-B01 交差する枝の短絡

- Level: B
- 問題: 原点で交わる水平・垂直枝の $P=(0.3,0)$、$Q=(0,0.4)$ について潜在経路距離と直線距離、直線辺を採用したときの相対過小評価を計算せよ。

**詳細解答。** [四模型の潜在距離](#def-mfl21-oracle)から、経路は原点を通るので

$$
d_*=0.3+0.4=0.7,\qquad \|P-Q\|=\sqrt{0.3^2+0.4^2}=0.5.
$$

直線辺を採用すれば長さ $0.5$ の経路があり、三角不等式から他のグラフ経路もこれより短くならない。従って $d_G=0.5$ で、真値に対する相対過小評価は

$$
\frac{d_*-d_G}{d_*}=\frac{0.7-0.5}{0.7}=\frac27.
$$

交点を通る経路の長さとEuclid弦を混同しない。

<a id="ex-mfl21-b02"></a>

### MFL21-B02 層混合PCAの固有値ギャップ

- Level: B
- 問題: 交差点の局所窓に $(a,0),(-a,0),(0,a),(0,-a)$（$a>0$）が入るとする。分母4の共分散行列と推定接線の一意性を判定せよ。

**詳細解答。** 四点の平均は $(0,0)$。偏差の外積は水平二点で合計 $\operatorname{diag}(2a^2,0)$、垂直二点で合計 $\operatorname{diag}(0,2a^2)$、従って

$$
\widehat C=\frac14\begin{pmatrix}2a^2&0\\0&2a^2\end{pmatrix}=\frac{a^2}{2}I_2.
$$

両固有値が $a^2/2$ で一致し、上位1次元固有空間は一意でない。これは[MFL5のLocal PCA定義](../MFL5/index.md#def-mfl5-local-pca)にある固有値ギャップの欠落である。二層の各接線は別々に存在するが、混合窓の共分散から一本に選ぶ理由がない。

<a id="ex-mfl21-b03"></a>

### MFL21-B03 有界雑音での安全半径が存在するか

- Level: B
- 問題: 二枝で $h=0.15$、$g=0.35$、$\eta=0.02$ のとき安全な半径を一つ選べ。$g=0.18$ に変更したとき、同じ一様保証を満たす半径は存在するか。

**詳細解答。** [平行二枝の連結性と安全な半径](#prop-mfl21-parallel-branches)より、安全条件は

$$
0.15+0.04<r\le0.35-0.04,
\quad\text{すなわち}\quad 0.19<r\le0.31.
$$

例えば $r=0.25$ は、枝内隣接距離を最大 $0.19$ と見積もっても辺を張り、枝間距離を最小 $0.31$ と見積もっても辺を張らない。

$g=0.18$ なら上限は $0.14$、下限は $0.19$ より大きくなければならないので共通の半径はない。これは**全ての有界摂動への一様な保証の不成立**であって、すべての実験で必ず失敗するという意味ではない。

<a id="ex-mfl21-b04"></a>

### MFL21-B04 円サイクルと有限グラフスペクトル

- Level: B
- 問題: 等間隔円の近傍グラフが $N=6$ のサイクルになったとする。正規化Laplacianの固有値 $\lambda_k=1-\cos(2\pi k/N)$ を、離散Fourierベクトルに作用させて導き、零固有値の個数を説明せよ。

**詳細解答。** 各頂点次数は2なので $(L_{\rm sym}v)_j=v_j-(v_{j-1}+v_{j+1})/2$。[MFL18の離散Fourier基底](../MFL18/index.md#def-mfl18-fourier)に従い $v_j=e^{2\pi ikj/6}$ と置くと $v_{j\pm1}=v_je^{\pm2\pi ik/6}$ だから

$$
(L_{\rm sym}v)_j=\left[1-\frac{e^{-2\pi ik/6}+e^{2\pi ik/6}}2\right]v_j
=\bigl(1-\cos(2\pi k/6)\bigr)v_j.
$$

$k=0,1,2,3,4,5$ で固有値は順に $0,1/2,3/2,2,3/2,1/2$。零は $k=0$ のみで、サイクルが連結であることと[零固有値命題](#prop-mfl21-zero-eigenvalues)が一致する。

<a id="ex-mfl21-c01"></a>

### MFL21-C01 幾何推定の一枚の検証表を設計する

- Level: C
- 問題: 円、U字、交差線、近接枝を同じ $n$ で生成する横断実験を設計せよ。各模型で $r,k,\sigma$ を変えて局所PCA・近傍辺・測地距離・有限スペクトルを評価する指標を明示せよ。また (i) 交点、(ii) 偽の連結、(iii) 到達不能点対、(iv) テストseedの再利用、の四失敗を、どの指標だけでは見落とすか説明せよ。

**詳細解答。** まず各模型の潜在座標 $X_i$、層番号、弧長 $s_i$ と[四模型の潜在距離](#def-mfl21-oracle)を記録する。同じ生成規則の下で観測を $Y_i=X_i+\xi_i$ と作り、閾値 $r$ またはunion kNNの $k$ を固定して近傍グラフを作る。

比較する列は次の四種類である。すべて同じ点群と辺で計算し、可視化の見かけだけでは成功としない。

- 接空間：定義できる潜在接線に対する[PCA射影距離](../MFL5/index.md#def-mfl5-projection-distance)の平均、未評価点数、層混合窓数。
- 近傍：横断辺・短絡候補の数、真の成分数と観測グラフの成分数。
- 測地距離：到達可能な対の $E_{\rm geo}$ と、到達不能な対の $N_{\rm miss}$。
- スペクトル：零固有値数と有限グラフの $E_{\rm spec,5}$。

四つの失敗は、次のように分離して診断する。

- **交点**：一本の接線真値がなく、PCA平均だけでは推定対象がそもそも定義されないことを見落とす。層混合窓と未評価点を併記する。
- **偽の連結**：近接枝で $r>g$ なら真の二成分が一つになる。有限グラフの零固有値数だけでは真の成分数との食い違いを判断できない。
- **到達不能点対**：到達可能な対の $E_{\rm geo}$ だけでは見落とすので $N_{\rm miss}$ を併記する。
- **テスト用乱数種の再利用**：設定をテスト用乱数種で選んで同じ標本の最小誤差を報告すると、[ML1-12の選択楽観性](../../ML/ML1-12/index.md#thm-ml1-12-selection-optimism)と同種の問題になる。探索用と再評価用を事前固定し、選択後に変えない。

最後にGaussian雑音では $\eta$ の一様上界がなく、交差特異点には通常の単一接空間の定理を適用できないことを各行の仮定欄に記録する。

## 10. 何を確認できたか

同じ点群の「接線」「辺」「最短路」「固有値」は、別々の正解と失敗条件を持つ。正しい円サイクルでは距離誤差が明示的に小さくなる一方、近接枝は真の成分が結ばれ、交差線は接線が一意でない場所を含む。近傍グラフの成分数や固有値だけを、多様体の回復保証と取り違えない。次の MFL22 からは、観測の形だけでなく**変換に対して保持すべき構造**を定義する。
