# MFL6 内在次元・曲率の推定

<!-- definition-example-audit: strict -->

## 1. 次元を知らずに接平面を選べるか

[MFL5の局所主成分分析](../MFL5/index.md#def-mfl5-local-pca)では「上位 $d$ 方向」を接空間として選んだ。しかし観測点群から $d$ 自体を知りたい場合は、何本の方向を選べばよいかが未解決である。さらに、接線の方向が分かっても、その接線がどれほど速く曲がるかは別の量である。

この章では、まず半径を半分にしたときに近傍の**確率質量**がどう変化するかから次元を読む。次に主成分分析（Principal Component Analysis; PCA）の局所版や近傍距離比と照合する。最後に曲線上の三点から**曲率**を計算する。次元は局所的に動ける方向の数、曲率は方向の変化であり、別々に推定する。

標準模型は [MFL1の真の標本模型](../MFL1/index.md#def-mfl1-01-clean-sample)に従う。$M\subset\mathbb R^D$ は $d$ 次元埋め込み多様体、真の点 $X_1,\ldots,X_n$ は $M$ 上の体積測度に関する密度 $p$ から独立同分布とする。以下では、固定された真の中心 $x\in M$ と、周囲の Euclid 空間の開球 $B_r(x)$ を用いる。観測ノイズを加えた $Y_i$ で近傍を選ぶ場合は別に検討する。

## 2. 小球の確率質量はなぜ $r^d$ に比例するか

線分の中心から半径 $r$ を取れば長さは $2r$、平面の円板なら面積は $\pi r^2$ である。この違いが、近傍の小ささを変えたときの点数の増え方に現れる。密度を含めた確率は

$$
q_x(r)=P(\|X-x\|<r)=\int_{M\cap B_r(x)}p(z)\,dV_g(z)
$$

と書く。[MFL4の最小小球確率](../MFL4/index.md#def-mfl4-small-ball)ではこの量の下界を標本被覆に使った。今度は二つの半径を比べ、未知の定数 $p(x)$ を消したい。

<a id="def-mfl6-mass-log-slope"></a>

<!-- formal-statement-start -->
> **定義（二半径の小球質量傾き）**
> $x\in M$、$a>1$、$r>0$ とし、$0<q_x(r),q_x(ar)<1$ とする。二半径間の対数傾きを

$$
S_x(r,a)=\frac{\log q_x(ar)-\log q_x(r)}{\log a}
$$

> と定める。もしその半径範囲で $q_x(t)=ct^d$（$c>0$）なら $S_x(r,a)=d$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl6-mass-log-slope -->
**定義の確認**。長さ $L$ の線分の内部点 $x$ を固定し、$ar$ が両端までの距離より小さいとする。一様標本なら $q_x(r)=2r/L$、$q_x(ar)=2ar/L$ で、

$$
S_x(r,a)=\frac{\log(2ar/L)-\log(2r/L)}{\log a}=1.
$$

一様な面積分布を持つ十分大きな平面領域の内部では、全体面積を $A$ として $q_x(r)=\pi r^2/A$。同じ計算で $S_x(r,a)=2$。いずれも周囲の空間をさらに高次元へ埋め込んでも変わらない。
<!-- definition-example-end -->

一般の多様体でこの計算が成立するには、滑らかな局所座標と**中心で $p(x)>0$** という条件が必要である。$v_d$ を $\mathbb R^d$ の単位球の体積とする。

<a id="prop-mfl6-smooth-ball-mass"></a>

<!-- formal-statement-start -->
> **命題（滑らかな小球の質量次数）**
> $M\subset\mathbb R^D$ を $C^2$ の埋め込み $d$ 次元多様体、$x\in M$ を境界でない点とする。$x$ の近傍で $p$ は体積測度に関する Lipschitz 連続密度であり $p(x)>0$ とする。十分小さい $r>0$ について

$$
q_x(r)=p(x)v_dr^d+O(r^{d+1}).
$$

> したがって任意の固定 $a>1$ に対し $S_x(r,a)=d+O(r)$、特に $\lim_{r\downarrow0}S_x(r,a)=d$ である。$O(\cdot)$ の定数は固定した $x,M,p,a$ に依存してよい。
<!-- formal-statement-end -->

### 証明の見取り図

[MFL2の接空間](../MFL2/index.md#def-mfl2-tangent-gram)を座標平面に取ると、多様体は接平面上の小領域から法線へ二次だけずれたグラフになる。小球の底面半径のずれは高々三次で、体積の Jacobian は $1+O(r^2)$。密度の変化は $O(r)$ なので、全体で相対 $O(r)$ に抑えられる。

<!-- proof-start -->
### 証明

平行移動と直交座標変換で $x=0$、$T_xM=\mathbb R^d\times\{0\}$ とする。[埋め込み多様体の局所グラフ表示](../MFL2/index.md#prop-mfl2-second-order)により、十分小さい領域で

$$
F(u)=(u,\varphi(u))
$$

と書ける。ここで $u\in\mathbb R^d$ は接平面の座標、$\varphi(u)\in\mathbb R^{D-d}$ は法線方向のずれである。$\varphi(0)=0$、$D\varphi(0)=0$ で、$\varphi$ は $C^2$ だから、定数 $C$ を選べば

$$
\|\varphi(u)\|\le C\|u\|^2,\qquad \|D\varphi(u)\|\le C\|u\|.
$$

接座標の標準基底 $e_i$ に対し $\partial_iF=(e_i,\partial_i\varphi)$ だから、グラフの誘導計量の成分は

$$
G_{ij}(u)=\partial_iF\cdot\partial_jF
=\delta_{ij}+\partial_i\varphi\cdot\partial_j\varphi.
$$

すなわち $G(u)=I_d+D\varphi(u)^{\mathsf T}D\varphi(u)$ で、体積要素の係数は $J(u)=\sqrt{\det G(u)}=1+O(\|u\|^2)$ である。ここでは $D\varphi^{\mathsf T}D\varphi$ の成分が $O(\|u\|^2)$ で、行列式と平方根が単位行列の近くで滑らかなことを使った。

小球へ写る底面領域を $A_r=\{u:\|u\|^2+\|\varphi(u)\|^2<r^2\}$ とする。$\|u\|<r$ は必要であり、上の二次上界から十分小さい $r$ には、ある定数 $C_1>0$ について

$$
B^{d}_{r(1-C_1r^2)}(0)\subset A_r\subset B^{d}_r(0).
$$

実際、内側の球では $\|u\|^2+\|\varphi(u)\|^2\le \|u\|^2+C^2\|u\|^4<r^2$ を $C_1$ を大きく取ることで満たせる。したがって $\operatorname{vol}_d(A_r)=v_dr^d+O(r^{d+2})$。一方、$p$ の Lipschitz 性から $p(F(u))=p(x)+O(\|F(u)-x\|)=p(x)+O(r)$ が $A_r$ 上で一様に成立する。よって

$$
\begin{aligned}
q_x(r)&=\int_{A_r}p(F(u))J(u)\,du\\
&=\bigl(p(x)+O(r)\bigr)\bigl(v_dr^d+O(r^{d+2})\bigr)\\
&=p(x)v_dr^d+O(r^{d+1}).
\end{aligned}
$$

$p(x)v_d>0$ なので $q_x(r)=p(x)v_dr^d(1+O(r))$。$\log(1+t)=O(t)$ を $t=O(r)$ に適用し、$r$ と $ar$ の対数を引けば $S_x(r,a)=d+O(r)$。$\square$
<!-- proof-end -->

この命題は**漸近的**な主張であり、有限の $r$ で傾きが厳密に整数になるとは言わない。さらに、密度が中心で零なら先頭係数は消え、別のべき乗が現れうる。

## 3. 標本点数から傾きを計算すると何が増えるか

実際には $q_x(r)$ は未知なので、固定中心 $x$ と同じ独立標本 $X_i$ から二つの半径の個数を数える。

<a id="def-mfl6-empirical-log-slope"></a>

<!-- formal-statement-start -->
> **定義（標本対数傾き推定量）**
> 固定された $x\in M$、$a>1$、$n\ge1$、$r>0$ に対し

$$
N_r=\sum_{i=1}^n\mathbf1_{\{\|X_i-x\|<r\}},
\qquad
\widehat q_x(r)=N_r/n
$$

> とする。$N_r>0$、$N_{ar}>0$ のとき

$$
\widehat d_{n}(x;r,a)=
\frac{\log\widehat q_x(ar)-\log\widehat q_x(r)}{\log a}
$$

> と定める。どちらかが零なら、この推定量は未定義とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl6-empirical-log-slope -->
**定義の確認**。$n=100$ 個のうち半径 $r$ に10個、半径 $2r$ に20個あるとき、入れ子の開球なので $N_{2r}\ge N_r$ が成立し、

$$
\widehat d_n(x;r,2)=\frac{\log(20/100)-\log(10/100)}{\log2}=1.
$$

仮に $N_r=0$ なら $0$ の対数は取れない。「対数に小定数を足す」操作は別の推定量を作り、その偏りの検討が必要である。
<!-- definition-example-end -->

二つの個数は同じ標本を使うため独立ではない。しかし各半径についての集中評価を同時に成立させるには、**二つの個数同士の独立性は不要**である。

<a id="prop-mfl6-empirical-log-bound"></a>

<!-- formal-statement-start -->
> **命題（二半径の有限標本対数傾き誤差）**
> 固定中心 $x$、固定 $r>0,a>1$ と独立同分布標本 $X_1,\ldots,X_n$ を考える。$q_{\min}=\min\{q_x(r),q_x(ar)\}>0$、$0<\delta<1$ とし、

$$
\varepsilon=\sqrt{\frac{\log(4/\delta)}{2n}}
<\frac{q_{\min}}2
$$

> を仮定する。このとき確率 $1-\delta$ 以上で推定量は定義され、次を満たす。

$$
|\widehat d_n(x;r,a)-S_x(r,a)|
\le\frac{4\varepsilon}{q_{\min}\log a}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各半径の指示変数は独立な $[0,1]$ 変数である。平均の集中から分母が零でないことを保証し、対数の差を平均値の定理で制御する。

<!-- proof-start -->
### 証明

固定半径 $t\in\{r,ar\}$ について $H_i(t)=\mathbf1_{\{\|X_i-x\|<t\}}$ は独立で $EH_i(t)=q_x(t)$。[Hoeffdingの両側不等式](../../../解析系/HDP/HDP1/index.md#cor-hdp1-two-sided)を $H_i(t)\in[0,1]$ へ適用すれば

$$
P(|\widehat q_x(t)-q_x(t)|>\varepsilon)\le2e^{-2n\varepsilon^2}=\delta/2.
$$

二つの半径に[和事象評価](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)を適用すると、確率 $1-\delta$ 以上で両方の誤差は $\varepsilon$ 以下となる。この事象では $\widehat q_x(t)\ge q_{\min}-\varepsilon>q_{\min}/2>0$。

正の $s,t$ について $\log s-\log t=\int_t^s du/u$ だから、$s=\widehat q_x(t)$ と真値 $q_x(t)$ の間で $u\ge q_{\min}/2$ を使うと

$$
|\log\widehat q_x(t)-\log q_x(t)|
\le\frac{|\widehat q_x(t)-q_x(t)|}{q_{\min}/2}
\le\frac{2\varepsilon}{q_{\min}}.
$$

二つの対数の差を引いて三角不等式を使い、$\log a>0$ で割ると結論を得る。$\square$
<!-- proof-end -->

誤差は「幾何・密度による $S_x(r,a)-d$」と「標本による $\widehat d_n-S_x$」に分ける。命題の上界が小さいには概ね $nq_{\min}^2$ を大きくする必要があり、これは最適な標本条件を主張するものではない。半径 $r$ を小さくすると幾何の偏りは下がるが、$q_{\min}\asymp r^d$ も小さくなる。これが半径選択の基本的な競合である。

## 4. 円周・境界・密度で傾きはどう歪むか

円周は次元1だが、外在 Euclid 球で切り取った弧は直線区間と同じ長さではない。[円周の内在距離と弦長](../MFL2/index.md#prop-mfl2-circle)の公式を使って実際に差を計算する。

<a id="prop-mfl6-circle-mass-bias"></a>

<!-- formal-statement-start -->
> **命題（円周における小球傾きの曲率バイアス）**
> 半径 $R>0$ の円周上で弧長に比例する確率分布を取り、$x$ を円周上に固定する。$0<r<2R$ なら

$$
q_x(r)=\frac2\pi\arcsin\left(\frac r{2R}\right).
$$

> 固定 $a>1$ で $ar<2R$ のとき、$r\downarrow0$ に対し

$$
S_x(r,a)=1+\frac{a^2-1}{24\log a}\frac{r^2}{R^2}+O(r^4/R^4).
$$
<!-- formal-statement-end -->

### 証明の見取り図

点 $x$ から中心角 $\theta$ だけ離れた点までの弦は $2R|\sin(\theta/2)|$。小球に含まれる中心角の長さを全周 $2\pi$ で割り、$\arcsin$ を展開する。

<!-- proof-start -->
### 証明

$x$ を角度0とし、$\theta\in(-\pi,\pi]$ を一様とする。[弦長公式](../MFL2/index.md#prop-mfl2-circle)から $\|X-x\|=2R|\sin(\theta/2)|$。$0<r<2R$ なら条件は $|\theta|<2\arcsin(r/(2R))$ と同値であり、角度の全長は $4\arcsin(r/(2R))$。これを $2\pi$ で割ると最初の式を得る。

$z=r/(2R)$ とおくと $\arcsin z=z+z^3/6+O(z^5)$ だから

$$
q_x(r)=\frac r{\pi R}\left(1+\frac{r^2}{24R^2}+O(r^4/R^4)\right).
$$

従って $\log q_x(r)=\log(r/(\pi R))+r^2/(24R^2)+O(r^4/R^4)$。$r$ を $ar$ に替えた式との差を $\log a$ で割ると第二式を得る。$\square$
<!-- proof-end -->

有限半径の傾きは1より大きい。この正の補正は円の曲率 $1/R$ の二乗に比例するが、一般の点群で対数傾きだけから曲率が一意に復元できるわけではない。密度の変化や境界でも同じように傾きが動く。

**境界の反例**。一様な $[0,1]$ 上で $x=b$ を取り、$0<r<b<2r<1-b$ とする。小半径では左右を含むので $q_x(r)=2r$。大半径では左端0で切られるので $q_x(2r)=b+2r$。したがって

$$
S_x(r,2)=\log_2\left(\frac{b+2r}{2r}\right)<1.
$$

一方、中心を厳密な端点 $x=0$ に固定すれば、小さい半径では $q_0(r)=r$、$q_0(2r)=2r$ で傾きは**正確に1**。境界は必ず傾きを変えるのではなく、中心と半径の相対位置で変える。

**密度が消える反例**。同じ $[0,1]$ の一次元空間で密度 $p(t)=2t$ とし、$x=0$ とすると、$r<1$ で

$$
q_0(r)=\int_0^r2t\,dt=r^2,\qquad S_0(r,2)=2
$$

（$2r<1$）。内在次元は1でも傾きは2である。これは[小球質量次数の命題](#prop-mfl6-smooth-ball-mass)の「$p(x)>0$」を失っており、先頭の一次項が消えるためである。

**観測ノイズ**。$Y=X+\xi$ を使うと真の中心と観測中心の距離に最大 $2\eta$ のずれが出る。[MFL5の近傍包含命題](../MFL5/index.md#prop-mfl5-neighborhood-sandwich)によって点数の上下は真の半径 $r\pm2\eta$ で比較できるが、$\eta/r$ が無視できなければ二半径の傾きを同じものと見なせない。特に固定ノイズの下で $r\downarrow0$ としても、真の $d$ が得られるとは限らない。

## 5. 近傍半径比と局所 PCA は次元を教えるか

半径を先に固定して点数を数える代わりに、[ML1-11の $k$ 近傍集合](../../ML/ML1-11/index.md#def-ml1-11-neighborhood)のように、近い順に $k$ 個選んで半径を読む方法もある。ここではまず確率質量の逆関数を使い、なぜ半径比が次元に関係するかを確かめる。逆関数を使うには、比較したい二つの確率水準が小球質量関数の値域に入っていなければならない。

<a id="def-mfl6-knn-radius"></a>

<!-- formal-statement-start -->
> **定義（近傍半径比による次元指標）**
> 固定中心 $x$ で $q_x(t)$ がある正の半径区間 $I$ 上連続かつ狭義増加とする。$0<u<1/2$ を取り、$u,2u$ がともに $q_x(I)$ に含まれると仮定する。このとき一意な $\rho(u),\rho(2u)\in I$ が存在し、$q_x(\rho(v))=v$（$v=u,2u$）と定義できる。母集団の半径比次元指標を

$$
d_{\mathrm{rad}}(u)=\frac{\log2}{\log\{\rho(2u)/\rho(u)\}}
$$

> と定める（$\rho(2u)>\rho(u)>0$）。有限標本では整数 $1\le k$、$2k\le n$ を選び、同順位の距離がなく $0<R_k<R_{2k}$ のとき、$k$ 番目と $2k$ 番目の距離 $R_k,R_{2k}$ を $\rho(k/n),\rho(2k/n)$ の代わりにして同じ式を計算する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl6-knn-radius -->
**定義の確認**。$q_x(r)=cr^d$ が厳密に成り立てば $\rho(u)=(u/c)^{1/d}$ であり、

$$
\frac{\rho(2u)}{\rho(u)}=2^{1/d},\qquad
d_{\mathrm{rad}}(u)=\frac{\log2}{\log2^{1/d}}=d.
$$

例えば母集団半径比が $\sqrt2$ なら指標は2。半径比が1に近い場合は分母の $\log$ が小さく、標本による距離の微小なずれが大きく増幅する。
<!-- definition-example-end -->

実際の $R_k$ は**ランダム**である。開球を使う経験分布では、距離の同点がない場合でも半径ちょうど $R_k$ の点は数えない。従って

$$
\widehat q_x(R_k)=\frac{k-1}{n}
$$

であり、$R_k$ を母集団の $k/n$ 分位半径の代用とするのは近似的な約束であって厳密な逆関数の恒等式ではない。

同じ $k$ を持つ点群の標本半径比がいつも $2^{1/d}$ とは言えない。$k$ を固定したまま $n$ だけ増やしても局所点数の揺らぎは残る。母集団のべき乗則、$k\to\infty$ と $k/n\to0$ の両立、近傍選択の偏りなどを確かめずに一致性を主張しない。

もう一つの手掛かりは[局所 PCA の固有値](../MFL5/index.md#def-mfl5-local-pca)である。二次法線偏差が $O(r^2)$ のとき、接方向の共分散は通常 $O(r^2)$、法方向は $O(r^4)$ となる。しかし固有値の「大きさ」が $d$ を区切る閾値は、密度の非退化性とノイズの規模を必要とする。[MFL5の有限標本接空間誤差](../MFL5/index.md#prop-mfl5-local-pca-bound)も接方向分散の下界を仮定している。

直線 $Y=(U,V)$ で $U\sim\mathrm{Uniform}[-r,r]$、$V\sim\mathrm{Uniform}[-\eta,\eta]$ を独立に取ると、固有値は $r^2/3,\eta^2/3$ である。$\eta$ が $r$ と同程度なら小さい法線固有値は消えず、**見かけ上の二次元**と真の一次元を固有値だけで区別できない。質量傾きと PCA の両方に失敗条件があるからこそ、二つを照合する価値がある。

## 6. 三点から曲率を測る

[MFL3の弧長パラメータ曲線の曲率](../MFL3/index.md#def-mfl3-curvature)は、単位速度曲線 $\gamma(s)$ の加速度の大きさ $\kappa(s)=\|\gamma''(s)\|$ で定義された。点群には連続な曲線の微分がない。三点を通る円の半径の逆数を使えば、座標回転や平行移動に依存しない指標を作れる。

三点 $P,Q,R\in\mathbb R^D$ の距離を $a=\|Q-R\|$、$b=\|R-P\|$、$c=\|P-Q\|$ と書く。三角形の面積 $\Delta$ は、$u=Q-P$、$v=R-P$ を使い

$$
2\Delta=\sqrt{\|u\|^2\|v\|^2-(u\cdot v)^2}
$$

で計算できる。これは $u,v$ が張る平面で「底辺×高さ」に等しく、周囲の次元 $D$ に依存しない。

<a id="def-mfl6-menger"></a>

<!-- formal-statement-start -->
> **定義（三点の外接円曲率）**
> 三点 $P,Q,R\in\mathbb R^D$ が互いに異なるとき、上記の距離と三角形の面積を用いて

$$
\kappa_{\triangle}(P,Q,R)=\frac{4\Delta}{abc}
$$

> と定める。三点が非共線ならその外接円半径の逆数であり、共線なら0である。重複点がある場合は分母が0なので定義しない。
<!-- formal-statement-end -->

非共線三角形で辺 $a$ に向かい合う角を $A$、外接円半径を $\rho$ とすれば、三角形の面積は $\Delta=bc\sin A/2$、正弦定理から $a=2\rho\sin A$。この二つを順に代入すると $4\Delta/(abc)=2\sin A/a=1/\rho$ となる。単に面積を割る式ではなく、実際に円の曲がりを測る理由はここにある。

<!-- definition-example-start: def-mfl6-menger -->
**定義の確認**。$P=(R,0)$、$Q=(0,R)$、$R_*=(-R,0)$（ここでは半径も $R>0$ と書く）なら、二辺の長さは $\sqrt2R$、残りは $2R$、面積は $R^2$。したがって

$$
\kappa_\triangle(P,Q,R_*)=
\frac{4R^2}{(\sqrt2R)(\sqrt2R)(2R)}=\frac1R.
$$

三点が同一直線上で相異なれば $\Delta=0$ なので曲率0。直線と円を区別する最小例である。
<!-- definition-example-end -->

円に限らず、曲線に沿った三点を縮めると真の曲率へ収束する。ただしこれは任意の三つの近傍点についての一様保証ではない。

<a id="prop-mfl6-menger-limit"></a>

<!-- formal-statement-start -->
> **命題（対称三点の外接円曲率の極限）**
> $\gamma:(-\epsilon,\epsilon)\to\mathbb R^D$ は $C^3$、$\|\gamma'(s)\|=1$ とする。$h>0$ が十分小さいとき $\gamma(-h),\gamma(0),\gamma(h)$ が相異なるとして、

$$
\lim_{h\downarrow0}\kappa_\triangle
(\gamma(-h),\gamma(0),\gamma(h))=\|\gamma''(0)\|.
$$
<!-- formal-statement-end -->

### 証明の見取り図

弧長 $s=0$ を展開点として三次まで Taylor 展開し、二本の弦の作る平行四辺形の面積の主項を調べる。分母は $2h^3$、分子の主項は $2h^3\|\gamma''(0)\|$ となる。

<!-- proof-start -->
### 証明

$T=\gamma'(0)$、$A=\gamma''(0)$ と置く。$\|\gamma'(s)\|^2=1$ を微分すると $2\gamma'(s)\cdot\gamma''(s)=0$ なので $\|T\|=1$、$T\cdot A=0$。$u=\gamma(h)-\gamma(0)$、$v=\gamma(-h)-\gamma(0)$ とし、展開点0・次数2の Taylor 式を使うと

$$
u=hT+\tfrac12h^2A+O(h^3),\qquad
v=-hT+\tfrac12h^2A+O(h^3).
$$

面積を求めるため、$u$ への射影を $v$ から引いた垂直成分を $w=v-(u\cdot v)u/\|u\|^2$ と置く。$u\cdot w=0$ で、底辺を $\|u\|$、高さを $\|w\|$ と取れば $2\Delta=\|u\|\|w\|$ である。$T\cdot A=0$ と上の展開から

$$
\|u\|^2=h^2+O(h^4),\qquad
u\cdot v=-h^2+O(h^4),\qquad
\frac{u\cdot v}{\|u\|^2}=-1+O(h^2).
$$

従って $w=v+u+O(h^3)=h^2A+O(h^3)$ となり、$A=0$ の場合も含めて

$$
2\Delta=\|u\|\|w\|=(h+O(h^3))(h^2\|A\|+O(h^3))
=h^3\|A\|+O(h^4).
$$

弧長パラメータなので $\|v\|=h+O(h^3)$、また $u-v=2hT+O(h^3)$ より $\|u-v\|=2h+O(h^3)$。従って $abc=2h^3(1+O(h^2))$ である。最後に

$$
\kappa_\triangle=\frac{4\Delta}{abc}
=\frac{2h^3\|A\|+O(h^4)}{2h^3(1+O(h))}
=\|A\|+O(h)
$$

となり、結論。$\square$
<!-- proof-end -->

三点を選ぶ弧長間隔 $h$ が不均一であったり、三点がほぼ同一点になったりすると数値的安定性は変わる。次に弧長間隔が既知の理想模型で、観測誤差が曲率へどう増幅されるかを定量化する。

## 7. 二次差分の誤差は半径とともにどう動くか

中心とその両側の差を足すと一次の接線成分が打ち消され、二次の曲がりが残る。この性質から二次差分を用いる。ただし三点の**弧長上の位置** $\{-h,0,h\}$ が分かることが前提であり、座標のない点群にそのまま使えるアルゴリズムではない。

<a id="def-mfl6-second-difference"></a>

<!-- formal-statement-start -->
> **定義（弧長対称二次差分曲率）**
> 単位速度の曲線 $\gamma$ と $h>0$ について

$$
D_h^2\gamma(0)=
\frac{\gamma(h)-2\gamma(0)+\gamma(-h)}{h^2},
\qquad
\kappa_h=\|D_h^2\gamma(0)\|
$$

> と定義する。観測点 $Y_+,Y_0,Y_-$ を使う場合は、観測差分とそのノルムを
>
$$
\widehat D_h^2=\frac{Y_+-2Y_0+Y_-}{h^2},\qquad
\widehat\kappa_h=\|\widehat D_h^2\|
$$
>
> と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl6-second-difference -->
**定義の確認**。$\gamma(s)=(R\cos(s/R),R\sin(s/R))$ は $\gamma'(s)=(-\sin(s/R),\cos(s/R))$ なので全ての $s$ で $\|\gamma'(s)\|=1$ を満たす。$s=0$ では

$$
D_h^2\gamma(0)=\left(\frac{2R(\cos(h/R)-1)}{h^2},0\right),
\quad
\kappa_h=\frac{4R\sin^2(h/(2R))}{h^2}\to\frac1R.
$$

真の曲率 $1/R$ と一致するのは極限であり、有限 $h$ では一般に小さい。
<!-- definition-example-end -->

<a id="prop-mfl6-second-difference-error"></a>

<!-- formal-statement-start -->
> **命題（二次差分曲率の打切り誤差とノイズ）**
> $\gamma:[-h,h]\to\mathbb R^D$ は $C^4$ の単位速度曲線とし、$\sup_{|s|\le h}\|\gamma^{(4)}(s)\|\le B$ とする。観測点 $Y_j=\gamma(jh)+\xi_j$（$j=-1,0,1$）で $\|\xi_j\|\le\eta$ とする。このとき

$$
|\widehat\kappa_h-\|\gamma''(0)\||
\le\frac{Bh^2}{12}+\frac{4\eta}{h^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

中央二次差分の Taylor 余りを左右で足すと三次項が消える。ノイズは $\xi_+-2\xi_0+\xi_-$ に入るので、$h^2$ で割ると強く増幅される。

<!-- proof-start -->
### 証明

積分型 Taylor 式を $s=0$・次数3で $\gamma(h)$ と $\gamma(-h)$ に適用すると、

$$
\begin{aligned}
\gamma(h)&=\gamma(0)+h\gamma'(0)+\tfrac{h^2}2\gamma''(0)+\tfrac{h^3}6\gamma'''(0)+R_+,\\
\gamma(-h)&=\gamma(0)-h\gamma'(0)+\tfrac{h^2}2\gamma''(0)-\tfrac{h^3}6\gamma'''(0)+R_-,
\end{aligned}
$$

ただし $\|R_+\|,\|R_-\|\le Bh^4/24$ である。これらを足し、$2\gamma(0)$ を引くと

$$
D_h^2\gamma(0)=\gamma''(0)+\frac{R_++R_-}{h^2},
\quad
\|D_h^2\gamma(0)-\gamma''(0)\|\le\frac{Bh^2}{12}.
$$

観測との差は

$$
\widehat D_h^2-D_h^2\gamma(0)
=\frac{\xi_+-2\xi_0+\xi_-}{h^2},
\quad
\|\widehat D_h^2-D_h^2\gamma(0)\|
\le\frac{\eta+2\eta+\eta}{h^2}.
$$

逆三角不等式 $|\|v\|-\|w\||\le\|v-w\|$ を二回使えば結論。$\square$
<!-- proof-end -->

ノイズの上界が一定なら $h\downarrow0$ で右辺の $\eta/h^2$ が発散し、推定精度は保証できない。$B,\eta>0$ の場合、上界 $Bh^2/12+4\eta/h^2$ の最小値を与える目安は $h^4=48\eta/B$ である。これは点群から等弧長三点を選ぶ誤差までは考慮しない。

## 8. PCA の法線固有値からも曲率は分かるか

弧長三点がなくても共分散は計算できる。[MFL5の放物線模型](../MFL5/index.md#prop-mfl5-curvature-covariance)では曲率によって小さな法線分散が現れた。放物線 $z(u)=(u,\kappa u^2/2)$ の原点では $z'(0)=(1,0)$ が接方向、$(0,1)$ が法方向である。この二方向の基底で共分散の交差成分が0と分かれば、対角成分はそれぞれの固有値になる。以下では対称な一様分布によって交差成分が消えることを確かめ、法線分散から曲率の絶対値を復元する。一般の密度では同じ公式は成立しない。

<a id="prop-mfl6-parabola-pca"></a>

<!-- formal-statement-start -->
> **命題（対称放物線の共分散による曲率復元）**
> $r>0$、$U\sim\mathrm{Uniform}[-r,r]$、$Z=(U,\kappa U^2/2)$（$\kappa\in\mathbb R$）とする。$C=\operatorname{Cov}(Z)$ の接座標・法座標に対応する対角成分を $\lambda_{\mathrm t},\lambda_{\mathrm n}$ と呼ぶと

$$
\lambda_{\mathrm t}=\frac{r^2}3,\qquad
\lambda_{\mathrm n}=\frac{\kappa^2r^4}{45},
\qquad
|\kappa|=\frac{\sqrt{5\lambda_{\mathrm n}}}{\lambda_{\mathrm t}}.
$$

> $\kappa^2r^2<15$ のとき $\lambda_{\mathrm t}>\lambda_{\mathrm n}$ なので、接・法の成分は大・小の固有値として識別できる。放物線の原点での真の曲率は $|\kappa|$ である。
<!-- formal-statement-end -->

### 証明の見取り図

対称性から奇数モーメントが消える。接成分の分散と二次法成分の分散を別々に積分する。

<!-- proof-start -->
### 証明

$EU=EU^3=0$、$EU^2=r^2/3$、$EU^4=r^4/5$ である。$EZ=(0,\kappa r^2/6)$ だから交差共分散は $\kappa(EU^3-EU\,EU^2)/2=0$。よって

$$
C=\begin{pmatrix}
EU^2&0\\
0&\frac{\kappa^2}{4}\{EU^4-(EU^2)^2\}
\end{pmatrix}
=\operatorname{diag}\left(\frac{r^2}3,\frac{\kappa^2r^4}{45}\right).
$$

ここから $\sqrt{5\lambda_{\mathrm n}}=|\kappa|r^2/3$、$\lambda_{\mathrm t}=r^2/3>0$ を割って復元式を得る。接方向が上位となる条件は $r^2/3>\kappa^2r^4/45$、すなわち $\kappa^2r^2<15$。

[弧長曲率の定義](../MFL3/index.md#def-mfl3-curvature)と照合するため、$z(u)=(u,\kappa u^2/2)$ の速度長を計算する。

$$
\|z'(u)\|=\sqrt{1+\kappa^2u^2},\qquad
\left.\frac{d}{du}\|z'(u)\|\right|_{u=0}=0.
$$

原点では速度 $(1,0)$、加速度 $(0,\kappa)$ だから、弧長 $s$ に取り直しても原点の二階微分は $(0,\kappa)$ であり、真の曲率は $|\kappa|$。$\square$
<!-- proof-end -->

この公式では**法線方向を識別済み**であること、パラメータ $U$ が一様かつ対称であること、観測ノイズを含まないことが重要である。$\kappa$ と $-\kappa$ は共分散の固有値から区別できず、符号を持つ曲率は得られない。密度や観測誤差が変われば $\lambda_{\mathrm n}$ も変わる。曲率の大きさと [reach](../MFL3/index.md#def-mfl3-reach) は別であり、局所の三点だけで遠くの枝の接近を検出することもできない。

## 9. 演習

### MFL6-A01 小球のべき乗と次元

- Level: A
- 問題: 周囲の $\mathbb R^5$ に埋め込まれた一様な二次元円板の内部点で、$q_x(r)=cr^2$ が $r,3r$ に成立するとする。$S_x(r,3)$ を計算し、周囲の次元と区別せよ。

**詳細解答**。[二半径の傾き](#def-mfl6-mass-log-slope)に $q_x(3r)=9cr^2$、$q_x(r)=cr^2$ を代入すると

$$
S_x(r,3)=\frac{\log(9cr^2)-\log(cr^2)}{\log3}
=\frac{\log9}{\log3}=2.
$$

埋め込み先の次元 $D=5$ は計算に現れず、内在次元 $d=2$ が現れる。

### MFL6-A02 境界と密度の二つの誤差

- Level: A
- 問題: $[0,1]$ 上で密度 $p(t)=1$ とし、$x=b=3r/2$、$0<r<1/7$ とする。$q_x(r),q_x(2r),S_x(r,2)$ を求めよ。密度 $p(t)=2t$ と中心 $x=0$ の場合も求め、原因の違いを述べよ。

**詳細解答**。$r<b<2r$、また $b+2r=7r/2<1$。小球は $(b-r,b+r)$ の長さ $2r$、大球は $[0,b+2r)$ の長さ $7r/2$。従って

$$
q_x(r)=2r,\quad q_x(2r)=7r/2,\quad
S_x(r,2)=\log_2(7/4)<1.
$$

後半は $q_0(r)=\int_0^r2t\,dt=r^2$、$q_0(2r)=4r^2$ （$2r<1$）だから傾き2。前半は大球だけが境界で切られるため、後半は $p(0)=0$ で一次の質量係数が消えるためである。

### MFL6-A03 距離比で読む次元

- Level: A
- 問題: 半径比 $\rho(2u)/\rho(u)=2^{1/3}$ のとき $d_{\mathrm{rad}}(u)$ を計算せよ。比が1ならどうなるか。

**詳細解答**。[半径比の定義](#def-mfl6-knn-radius)より

$$
d_{\mathrm{rad}}(u)=\frac{\log2}{\log(2^{1/3})}
=\frac{\log2}{(\log2)/3}=3.
$$

比が1なら分母は $\log1=0$ で定義不能。標本から近い半径比が出ると不安定になる。

### MFL6-A04 直角三角形の外接円曲率

- Level: A
- 問題: $P=(0,0)$、$Q=(2,0)$、$R=(0,2)$ の外接円曲率を、三辺の長さと面積から求めよ。

**詳細解答**。辺は $\|P-Q\|=2$、$\|P-R\|=2$、$\|Q-R\|=\sqrt8=2\sqrt2$。直角を挟む二辺は長さ2だから面積 $\Delta=(2\cdot2)/2=2$。従って

$$
\kappa_\triangle=\frac{4\Delta}{abc}
=\frac8{2\cdot2\cdot2\sqrt2}=\frac1{\sqrt2}.
$$

斜辺を直径とする円の半径 $\sqrt2$ の逆数と一致する。

### MFL6-B01 標本誤差と半径の競合

- Level: B
- 問題: $q_x(r)=cr^d$ が対象半径で成り立ち、$q_x(2r)=2^dq_x(r)<1$ とする。$0<\delta<1$ を固定したとき、[有限標本傾き誤差](#prop-mfl6-empirical-log-bound)が $o(1)$ となる十分条件を $n,r$ で書け。また $r_n=n^{-\alpha}$ としたときの $\alpha$ の条件を求めよ。

**詳細解答**。$q_x(r)<q_x(2r)$ だから $q_{\min}=cr^d$。命題の $\varepsilon$ は $\delta$ 固定で $O(n^{-1/2})$ なので、誤差上界は

$$
\frac{4}{cr^d\log2}\sqrt{\frac{\log(4/\delta)}{2n}}
=O\left(\frac1{\sqrt n\,r^d}\right).
$$

従って $\sqrt n\,r^d\to\infty$、すなわち $nr^{2d}\to\infty$ なら、十分大きな $n$ で $\varepsilon<q_{\min}/2$ も成立し上界は0へ向かう。$r_n=n^{-\alpha}$ を入れると $\sqrt n\,r_n^d=n^{1/2-\alpha d}$ だから $0<\alpha<1/(2d)$ が十分。これは命題の保守的評価であり、必要条件ではない。

### MFL6-B02 一様円周の有限半径の偏り

- Level: B
- 問題: 半径 $R$ の一様円周で $a=2$ とする。$r/R$ が小さいとき $S_x(r,2)-1$ の主項を計算し、曲率を2倍にしたら同じ $r$ で主項がどう変わるか述べよ。ただし $2r<2R$ とする。

**詳細解答**。[円周質量の命題](#prop-mfl6-circle-mass-bias)に $a=2$ を代入すると

$$
S_x(r,2)-1
=\frac{4-1}{24\log2}\frac{r^2}{R^2}+O(r^4/R^4)
=\frac{r^2}{8R^2\log2}+O(r^4/R^4).
$$

円周曲率は $1/R$ なので、同じ半径 $r$ で曲率を2倍（円半径を $R/2$）にすると主項は4倍になる。ただし両模型とも $r/R$ が十分小さい範囲での比較であり、残差まで厳密に4倍とは言えない。

### MFL6-B03 放物線からの曲率復元

- Level: B
- 問題: $U\sim\mathrm{Uniform}[-r,r]$、$Z=(U,3U^2/2)$ とする。$\lambda_{\mathrm t},\lambda_{\mathrm n}$ を求め、$\sqrt{5\lambda_{\mathrm n}}/\lambda_{\mathrm t}$ と上位固有方向が接方向となる $r$ の範囲を求めよ。

**詳細解答**。[対称放物線命題](#prop-mfl6-parabola-pca)に $\kappa=3$ を代入し、

$$
\lambda_{\mathrm t}=r^2/3,\quad
\lambda_{\mathrm n}=9r^4/45=r^4/5.
$$

分子は $\sqrt{5r^4/5}=r^2$、分母は $r^2/3$ だから比は3。上位方向が接方向となるのは $9r^2<15$、すなわち $0<r<\sqrt{5/3}$。これを超えると固有値を単純に「大＝接」と識別できなくなる。

### MFL6-B04 二次差分のノイズ増幅

- Level: B
- 問題: 真の直線 $\gamma(s)=(s,0)$ の三点 $s=-h,0,h$ を考える。観測ノイズを $\xi_-=(0,\eta)$、$\xi_0=(0,-\eta)$、$\xi_+=(0,\eta)$ と選んだ場合、観測曲率 $\widehat\kappa_h$ を求め、ノイズ上界 $4\eta/h^2$ が改善できない意味を述べよ。

**詳細解答**。真の差分は $\gamma(h)-2\gamma(0)+\gamma(-h)=(0,0)$。ノイズの差分は

$$
\xi_+-2\xi_0+\xi_-=(0,\eta)-2(0,-\eta)+(0,\eta)=(0,4\eta).
$$

従って $\widehat\kappa_h=\|(0,4\eta/h^2)\|=4\eta/h^2$。真の曲率は0であり、[二次差分誤差命題](#prop-mfl6-second-difference-error)のノイズ項がこの例では等号となる。追加のノイズ構造なしには定数4を一律に減らせない。

### MFL6-C01 同時に半径を縮め標本を増やす

- Level: C
- 問題: [小球質量次数](#prop-mfl6-smooth-ball-mass)が $q_x(r)=cr^d(1+O(r))$、$c>0$ を与えるとする。$a=2$、固定 $\delta\in(0,1)$ で $r_n=n^{-\alpha}$ と置いた場合、$|\widehat d_n(x;r_n,2)-d|\to0$ を確率少なくとも $1-\delta$ の同時評価上界から示す十分な $\alpha$ の範囲を導け。中心は標本とは独立に固定されているものとする。

**詳細解答**。まず $q_x(r_n)=cr_n^d(1+O(r_n))$、$q_x(2r_n)=c(2r_n)^d(1+O(r_n))$ で、十分大きい $n$ では $q_{\min}\ge(c/2)r_n^d$。[滑らかな小球の質量次数](#prop-mfl6-smooth-ball-mass)から

$$
|S_x(r_n,2)-d|=O(r_n)=O(n^{-\alpha}).
$$

[有限標本の傾き誤差](#prop-mfl6-empirical-log-bound)では $\varepsilon=\sqrt{\log(4/\delta)/(2n)}$。$q_{\min}\ge(c/2)n^{-\alpha d}$ を代入すると、$\varepsilon<q_{\min}/2$ は $\alpha d<1/2$ のとき十分大きな $n$ で成立し、確率 $1-\delta$ 以上で

$$
|\widehat d_n-d|
\le|\widehat d_n-S_x|+|S_x-d|
=O(n^{\alpha d-1/2})+O(n^{-\alpha}).
$$

両方が0へ向かうのは $0<\alpha<1/(2d)$。これは各 $n$ で失敗確率を $\delta$ 以下にする保証であって、同じ無限標本列の上での概収束をこの計算だけから主張したものではない。固定ノイズや $p(x)=0$ では最初の小球展開自体が使えない。

### MFL6-C02 次元と曲率は同時に識別できるか

- Level: C
- 問題: 真の曲線が (i) 単位速度の直線、(ii) 半径 $R$ の円周の短い弧である二模型を考える。曲線上の弧長対称三点を観測できる理想設定で、$h\downarrow0$ の外接円曲率の極限をそれぞれ求めよ。さらに、各点にノルム $\eta>0$ 以下の任意ノイズを許す場合、$\eta$ を固定したまま二次差分を細かくするだけでは成功保証できない理由と、次元の質量傾きと曲率を混同してはならない理由を説明せよ。

**詳細解答**。直線では三点は共線だから[外接円曲率](#def-mfl6-menger)はすべて0。円周では相異なる三点が同じ半径 $R$ の円上にあり、外接円はその円自体だから曲率は各 $h$ ですでに $1/R$、極限も $1/R$。両模型は局所内在次元1なので、中心で $p(x)>0$ の Lipschitz 連続密度の下では[小球の傾き](#prop-mfl6-smooth-ball-mass)の極限はどちらも1であり、その極限だけから曲率を決められない。

観測ノイズでは[二次差分誤差命題](#prop-mfl6-second-difference-error)の右辺に $4\eta/h^2$ が現れる。B04のノイズ配置と同じ符号配置を直線へ加えれば、真の曲率0でも観測曲率 $4\eta/h^2$ を実現する。$\eta$ 固定で $h\to0$ にすれば値は発散する。したがって標本間隔、ノイズと局所幾何の条件を別々に管理しなければ、次元1という情報だけでも曲率の有限標本復元は保証されない。

## 10. 次章へ

半径を縮めると局所の次元と曲率が見える一方、近傍の標本数が不足したり、固定ノイズが増幅されたりする。次の MFL7 では、**半径近傍、$k$ 近傍、相互 $k$ 近傍**を有限のグラフへ変えるとき、どの辺が幾何を保存し、どの辺が遠隔部分を誤接続するかを検討する。
