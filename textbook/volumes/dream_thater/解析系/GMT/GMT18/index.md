# GMT18 Besicovitch--Federer射影判定 II

<!-- definition-example-audit: strict -->

[整流可能部分はほとんど全方向で正面積に射影される定理](../GMT17/index.md#thm-gmt17-rectifiable-positive-projection)によれば、正の $m$ 次元面積を持つ整流可能部分は、ほとんどすべての $m$ 平面へ正の面積を残します。逆に[零射影から純非整流性への含意](../GMT17/index.md#cor-gmt17-ae-zero-implies-pure)も既に証明しました。残る問いは、**純非整流な集合の面積が典型的な射影で本当に消えるか**です。

これは[Marstrandの次元定理](../GMT7/index.md#thm-gmt7-grassmann-dimension)とは別問題です。次元が $m$ のままでも $m$ 次元面積は零になり得ます。また[GMT17の臨界対数上界](../GMT17/index.md#prop-gmt17-critical-concentration)は線分にも成り立つため、零射影を直接導けません。必要なのは「ほぼ核方向にある点が、各点の周囲にどんな密度で現れるか」を調べる補題です。

この講義では、細円錐の質量を **0・無限大・同一繊維上の別点** に分け、それぞれを処理して判定定理の両方向を閉じます。証明に使う被覆・密度・回転平均を順に組み立てます。

以下、$d\ge2$、$1\le m<d$ とし、$G(d,m)$、$\gamma_{d,m}$、$\pi_V$ は[GMT7のGrassmann射影](../GMT7/index.md#def-gmt7-grassmann-projection)に従います。$\mathcal H^m$ は[MT8のHausdorff測度](../../MT/MT8/index.md#def-mt8-hausdorff-measure)です。この規約では $m$ 平面内の半径 $t$ の球の $\mathcal H^m$ 測度は $(2t)^m$ です。

## 1. 射影核へ向かう細円錐

$m$ 平面 $V$ へ射影したとき点 $y$ が点 $x$ に近付くのは、差 $y-x$ が核 $W=V^\perp$ に近いときです。核は $(d-m)$ 平面ですから、$W\in G(d,d-m)$ を固定して $P=\pi_{W^\perp}$ と書きます。$P$ が射影先への写像です。

$0<s<1$ を円錐の細さ、$r>0$ を観察半径とし、$x$ を頂点に持つ **細円錐** を

$$
X(x,r,W,s)=\{y\in B(x,r):|P(y-x)|<s|y-x|\}
$$

とします。射影先に近いというだけでなく、元の点間距離に比べて射影距離が小さいことを要求しています。円錐の中に入る $E$ の $m$ 次元面積を $(rs)^m$ で割って、投影先の半径 $rs$ の球面積と同じ尺度で比較します。

<a id="def-gmt18-cone-concentration"></a>

<!-- formal-statement-start -->
> **定義（射影核方向の細円錐と正規化集中量）**
> $E\subset\mathbb R^d$ を $\mathcal H^m(E)<\infty$ のBorel集合、$W\in G(d,d-m)$、$\delta>0$ とする。$x\in E$、$0<s<1$ に対して

$$
D_{E,W,\delta}(x,s)
=\sup_{0<r<\delta}\frac{\mathcal H^m(E\cap X(x,r,W,s))}{(rs)^m},
\qquad
L_{E,W,\delta}(x)=\limsup_{s\downarrow0}D_{E,W,\delta}(x,s)
$$

> と定める。値域は $[0,\infty]$ であり、$L=0$ を疎な円錐、$L=\infty$ を発散する円錐質量と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt18-cone-concentration -->
### 直接例：直線分を平行・垂直に見る

**定義の確認**：円錐条件・測度・上限・上極限を両方向で一つずつ判定します。

$d=2,m=1$、$E=[-1,1]\times\{0\}$、$x=(0,0)$ とします。$W$ を水平軸に取ると $P$ は垂直軸への射影で、$y\ne x$ なら $|P(y-x)|=0<s|y-x|$ です。$0<r<1$ なら $E\cap X(x,r,W,s)$ の長さは $2r$ で

$$
D_{E,W,1}(x,s)\ge\frac{2r}{rs}=\frac2s\longrightarrow\infty.
$$

一方、$W$ が垂直軸で $P$ が水平射影なら、$y\ne x$ に対し $|P(y-x)|=|y-x|$ なので $s<1$ の円錐には $x$ しか入りません。$\mathcal H^1(\{x\})=0$ から $D=0$ です。**同じ整流可能集合でも一つの方向だけの円錐量で分類できない**ことが分かります。
<!-- definition-example-end -->

## 2. 疎な円錐と発散する円錐はどう処理するか

まず疎な円錐は純非整流集合のほとんどの点には起こらないことを示します。ここで[GMT12の純非整流性](../GMT12/index.md#def-gmt12-purely-unrectifiable)を使います。重要なのは、円錐の「中の点がない」だけでなく、**面積が小さくても**同じ結論へ運べることです。

<a id="lem-gmt18-sparse-cone"></a>

<!-- formal-statement-start -->
> **補題（疎な細円錐の零測度補題）**
> $E\subset\mathbb R^d$ は純 $m$-非整流なBorel集合で $\mathcal H^m(E)<\infty$ とする。$W\in G(d,d-m)$ と $\delta>0$ を任意に固定する。このとき

$$
\mathcal H^m\{x\in E:L_{E,W,\delta}(x)=0\}=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

円錐量が小さい点を一度一様に切り出します。射影後の小球でVitali型の被覆を作り、各小球に対応する元の集合の面積を円錐量で抑えます。細円錐に近い点がまったくない部分だけは射影の逆写像がLipschitzになり、純非整流性で零面積です。

<!-- proof-start -->
### 証明

$\mu=\mathcal H^m\llcorner E$、$P=\pi_{W^\perp}$ とし、$\lambda>0$、$0<s_0<1$ に対して

$$
F_{\lambda,s_0}
=\left\{x\in E:\mu(E\cap X(x,r,W,s))\le\lambda(rs)^m
\ \text{for all }0<r<\delta,\ 0<s<s_0\right\}
$$

とします。まず $\operatorname{diam}F<\delta/4$ を満たす部分 $F\subset F_{\lambda,s_0}$ について

$$
\mu(F)\le C_m\lambda\delta^m
$$

という評価を示します。$0<s<s_0$ を一つ固定し、$x\in F$ について

$$
h(x)=\sup\{|x-y|:y\in F,\ y\ne x,
\ |P(y-x)|<(s/8)|y-x|\}
$$

と置き、該当する点がなければ $h(x)=0$ とします。$0\le h(x)<\delta/4$ です。$h=0$ の点全体は、どの二点 $x,y$ についても $|Px-Py|\ge(s/8)|x-y|$ となる部分集合へ、直径 $<\delta/4$ の可算片として分けられます。そこで $P$ の逆はLipschitz定数 $8/s$ 以下となります。平面上の部分集合からのLipschitz像は可算整流可能なので、$E$ の純非整流性からこの部分の $\mu$ 測度は0です。

$h(x)>0$ の点について、上限の定義から $y\in F$ を

$$
\frac34h(x)<|y-x|\le h(x),\qquad
|P(y-x)|<\frac s8|y-x|
$$

となるように選びます。射影先の球に対応する円柱

$$
C_x=\{z\in F:|P(z-x)|<sh(x)/16\}
$$

を考えます。$z\in C_x$ で $|z-x|>h(x)$ なら、$|P(z-x)|<(s/8)|z-x|$ となり $h$ の上限に矛盾するので $|z-x|\le h(x)$ です。もし $z\notin X(y,2h(x),W,s)$ なら

$$
s|z-y|\le|P(z-y)|
\le|P(z-x)|+|P(x-y)|
<\frac{sh(x)}{16}+\frac{sh(x)}8
=\frac{3sh(x)}{16}.
$$

ゆえに $|z-y|<3h(x)/16$、従って

$$
|z-x|\ge|y-x|-|z-y|>\frac{9h(x)}{16}
>\frac{|P(z-x)|}{s}.
$$

つまり $z\in X(x,2h(x),W,s)$ です。どちらの場合も円錐に入るため

$$
C_x\subset
X(x,2h(x),W,s)\cup X(y,2h(x),W,s),
\quad
\mu(C_x)\le2\lambda(2h(x)s)^m.
$$

ここで $x,y\in F\subset F_{\lambda,s_0}$、$2h(x)<\delta$ を使用しました。$P(F)$ の各中心 $Px$ に半径 $sh(x)/80$ の小球を置き、半径5倍の被覆を選ぶ標準的な5倍球被覆法で、互いに交わらない小球 $B(Px_i,sh(x_i)/80)$ を選べます。5倍球が $P(F\cap\{h>0\})$ を覆い、その逆像は $C_{x_i}$ に含まれます。よって

$$
\begin{aligned}
\mu(F)
&\le\sum_i\mu(C_{x_i})
\le2^{m+1}\lambda\sum_i(sh(x_i))^m\\
&=2^{m+1}\lambda\frac{80^m}{2^m}
\sum_i\mathcal H^m(B(Px_i,sh(x_i)/80))\\
&\le 2\cdot80^m\lambda\,(2\delta)^m.
\end{aligned}
$$

最後の不等式は中心を一つの直径 $<\delta/4$ の集合へ局所化したため、互いに素な小球すべてが射影先の半径 $\delta$ の球に含まれることを用いたものです。従ってこの局所評価は $C_m=2\cdot160^m$ として成立します。$E$ を直径 $<\delta/4$ の可算な球で覆えば、各球内の $F$ について同じ評価が使えます。

いま $Z=\{x\in E:L_{E,W,\delta}(x)=0\}$ とします。任意の $\lambda>0$ に対し

$$
Z\subset\bigcup_{j\ge2}F_{\lambda,1/j},
\qquad F_{\lambda,1/j}\subset F_{\lambda,1/(j+1)}.
$$

上の各局所球で右辺の測度は単調収束により $C_m\lambda\delta^m$ 以下です。$\lambda\downarrow0$ として $\mu(Z)$ が各局所球で0と分かり、可算被覆を合わせて結論を得ます。$\square$
<!-- proof-end -->

次は円錐質量が大きすぎる場合です。ここでは純非整流性すら不要です。

<a id="lem-gmt18-divergent-projection"></a>

<!-- formal-statement-start -->
> **補題（発散する円錐質量の零射影補題）**
> $E\subset\mathbb R^d$ は $\mathcal H^m(E)<\infty$ のBorel集合、$W\in G(d,d-m)$、$\delta>0$ とする。$P=\pi_{W^\perp}$ として

$$
A_\infty=\{x\in E:L_{E,W,\delta}(x)=\infty\}
$$

> と置くと、$\mathcal H^m(PA_\infty)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

各 $x\in A_\infty$ には、投影先の小球に比べて質量が $M$ 倍以上ある円錐がいくらでも細く取れます。投影先で互いに素な球を選ぶと、対応する円錐も互いに素になります。

<!-- proof-start -->
### 証明

$M>0$、$\varepsilon>0$ を固定します。$L=\infty$ なので各 $x\in A_\infty$ に対し、$0<s<\min\{1,\varepsilon/\delta\}$ と $0<r<\delta$ を選んで

$$
\mathcal H^m(E\cap X(x,r,W,s))>M(rs)^m
$$

とできます。$P(X(x,r,W,s))\subset B(Px,rs)$ であり、この射影先の球は半径 $rs<\varepsilon$ です。$\varepsilon$ をいくらでも小さくできるので、$PA_\infty$ への細密な球族になっています。平面のVitali被覆定理（[GMT1の球被覆の導入](../GMT1/index.md#lem-gmt1-besicovitch-balls)を参照）を適用すると、互いに素な射影球 $B(Px_i,r_is_i)$ を選べ、残りの $PA_\infty$ は $\mathcal H^m$ 零集合になります。

射影球が交わらないので元の円錐 $X_i=X(x_i,r_i,W,s_i)$ も互いに素です。従って

$$
\begin{aligned}
\mathcal H^m(PA_\infty)
&\le\sum_i\mathcal H^m(B(Px_i,r_is_i))\\
&=2^m\sum_i(r_is_i)^m
\le\frac{2^m}{M}\sum_i\mathcal H^m(E\cap X_i)\\
&\le\frac{2^m}{M}\mathcal H^m(E).
\end{aligned}
$$

$M\to\infty$ で右辺は0となります。$\square$
<!-- proof-end -->

### もう一つの逃げ道：射影後に同じ点へ重なる繊維

射影後に同じ点へ重なる元の点を調べるには、射影写像の逆像を見ます。

<a id="def-gmt18-projection-fiber"></a>

<!-- formal-statement-start -->
> **定義（射影の繊維）**
> $P:\mathbb R^d\to V$ を直交射影、$V\in G(d,m)$ とする。$z\in V$ 上の**繊維**とは、$z$ へ射影される元の点全体

$$
P^{-1}\{z\}=\{x\in\mathbb R^d:Px=z\}
$$

> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt18-projection-fiber -->
**定義の確認**：$\mathbb R^2$ から水平軸への射影 $P(x,y)=(x,0)$ では、$z=(1,0)$ の繊維は $\{(1,t):t\in\mathbb R\}$ です。実際 $P(1,t)=z$ はすべての $t$ で成立し、逆に $P(x,y)=z$ は $x=1$ を意味するため、ほかの点は入りません。
<!-- definition-example-end -->

典型的な繊維に無限個の元の点がある場合も、面積有限性によって投影先が零集合になります。可算整流性を仮定せず、被覆だけで説明します。

<a id="lem-gmt18-infinite-fibers"></a>

<!-- formal-statement-start -->
> **補題（無限繊維の零射影補題）**
> $E\subset\mathbb R^d$ を $\mathcal H^m(E)<\infty$ のBorel集合、$P:\mathbb R^d\to\mathbb R^m$ を1-Lipschitzな直交射影とする。このとき

$$
\mathcal H^m\{z\in\mathbb R^m:\#(E\cap P^{-1}\{z\})=\infty\}=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

同じ射影点の上に互いに離れた点が $k$ 個あれば、十分細かい被覆の別々の集合を少なくとも $k$ 個使います。これを射影先で積分して、多重度の積分を元の面積で抑えます。

<!-- proof-start -->
### 証明

$N_t(z)$ を繊維中で任意の二点間距離が $>t$ となる点の最大個数（存在しないとき0）とします。$E$ が有界でない場合は先に $E\cap\overline B(0,j)$ を考え、最後に $j\to\infty$ とします。有限 $\mathcal H^m$ の集合を直径 $<t$ の可算集合 $U_i$ で覆うと、$t$ より離れた点は一つの $U_i$ に二個入れません。よって

$$
N_t(z)\le\sum_i\mathbf1_{P(U_i)}(z).
$$

各 $P(U_i)$ は直径 $<t$ なので、その $m$ 次元測度は高々 $(\operatorname{diam}U_i)^m$ です。可測な球状被覆に取り替えても上界を任意に近付けられます。従って（必要なら外積分で）

$$
\int N_t(z)\,d\mathcal H^m(z)
\le\sum_i(\operatorname{diam}U_i)^m.
$$

被覆の下限と $t\downarrow0$ を取ると、$N_t(z)\uparrow N(z)=\#(E\cap P^{-1}\{z\})$ なので単調収束より

$$
\int N(z)\,d\mathcal H^m(z)\le\mathcal H^m(E)<\infty.
$$

左辺が有限だから $N(z)=\infty$ の点の集合は測度0です。$\square$
<!-- proof-end -->

## 3. ほとんど全方向で「0か無限大か」を得る

ここが証明の核心です。固定方向では、正規化集中量が有限で正になる可能性を排除できません。しかし**ほとんどすべての方向**を対象にすると、円錐内質量が0へ縮むか、無限大へ発散するか、または核と平行な繊維に別の点があるかの三択になります。

### 3.1 非加法的な方向の内容にも使える密度二分法

集合関数 $\Psi$ が**外測度**であるとは、空集合で0、単調、可算劣加法的であることです。普通の測度のような加法性は要求しません。$S^m$ は $\mathbb R^{m+1}$ の単位球面、$\sigma_m$ はその表面積測度です。球面上の小球はEuclid距離で切ります。

<a id="lem-gmt18-density-dichotomy"></a>

<!-- formal-statement-start -->
> **補題（零内容集合上の密度二分法）**
> $m\ge1$、$\Psi$ を $S^m$ 上の外測度とし、$\Psi(B(\theta,t))$ は $\theta,t$ についてBorel可測とする。$D\subset S^m$ はBorel集合で $\Psi(D)=0$ とする。このとき $\sigma_m$ ほとんどすべての $\theta\in D$ で

$$
\limsup_{t\downarrow0}\frac{\Psi(B(\theta,t))}{t^m}
\in\{0,\infty\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

上密度が有限の点を局所的に取り出します。そこから離れた小球を5倍球被覆で数えると、その集合のLebesgue密度点では外測度の寄与が消えます。外測度の加法性は不要です。

<!-- proof-start -->
### 証明

各自然数 $j\ge1$ に対して

$$
F_j=\left\{\theta\in D:
\Psi(B(\theta,t))\le jt^m\quad(0<t<1/j)\right\}
$$

と置きます。上極限が有限の点は、ある $F_j$ に入ります。$F_j$ はBorelなので、球面の表面積測度の内側正則性により、$F_j$ の中にあるコンパクト集合 $K$ を選んで $\sigma_m(F_j\setminus K)$ を任意に小さくできます。$\Psi(K)=0$ です。

球面上の局所座標を一つ固定します。$B(\theta,t)$ が $K$ に当たる場合、$\eta\in K\cap B(\theta,t)$ を取ると

$$
\Psi(B(\theta,t))\le\Psi(B(\eta,2t))\le j(2t)^m
\qquad(2t<1/j).
$$

$\theta\in K$、$t$ が十分小さいとします。$B(\theta,t)\setminus K$ の各 $y$ に $u_y=\operatorname{dist}(y,K)/2$ を対応させます。5倍球被覆で互いに素な $B(y_i,u_i)$ を選べば、差集合は5倍球で覆われ、各球は $B(\theta,3t)\setminus K$ の中に収まります。さらに $B(y_i,5u_i)$ は $K$ から距離 $O(u_i)$ にあるため、直前の評価を使って

$$
\begin{aligned}
\Psi(B(\theta,t)\setminus K)
&\le\sum_i\Psi(B(y_i,5u_i))\\
&\le C_mj\sum_i u_i^m
\le C'_mj\,\sigma_m(B(\theta,3t)\setminus K).
\end{aligned}
$$

最後は小球の表面積が $u_i^m$ と比較可能であることと、その球の互いの素性です。$K$ の表面積密度点では通常のLebesgue密度定理の被覆証明によって

$$
t^{-m}\sigma_m(B(\theta,3t)\setminus K)\longrightarrow0.
$$

$\Psi(K)=0$ なので $\Psi(B(\theta,t))=\Psi(B(\theta,t)\setminus K)$ です。これにより上密度が0となります。コンパクト集合で $F_j$ を表面積ほとんど至る所覆い、さらに $j$ の可算和を取ると、上密度が有限なら0という主張が得られます。$\square$
<!-- proof-end -->

### 3.2 球面の方向から円錐へ戻す

固定した点 $a$ を中心に、他の点 $y$ が作る方向 $(y-a)/|y-a|$ を球面上に記録します。$K$ をコンパクト集合、$\mu=\mathcal H^m\llcorner K$ とします。初めは余次元1、すなわち $d=m+1$ を考えます。

固定点 $a$、半径上限 $\delta$ について、球面の部分集合 $B$ が指す方向の錐全体を $L(B)=\{t\theta:t>0,\theta\in B\}$ と書き、

$$
\Psi_a(B)=\sup_{0<r<\delta}r^{-m}
\mu\bigl(B(a,r)\cap(a+L(B))\bigr)
$$

と置きます。上限を取ったものは加法的とは限りませんが、各半径の測度が可算劣加法的なので $\Psi_a$ は外測度です。$C_a$ を、$K\cap B(a,\delta)\setminus\{a\}$ に向かう実在方向の集合とします。$D_a=S^m\setminus C_a$ に向かう点は存在せず、$\Psi_a(D_a)=0$ です。[密度二分法](#lem-gmt18-density-dichotomy)を $D_a$ に適用します。

線形代数的には、単位軸 $\theta$ の周りの角半径 $t$ の球面キャップと、$|\pi_{\theta^\perp}(y-a)|<s|y-a|$ の円錐は $t\asymp s$ で一致します。実際、角 $\varphi$ が $0\le\varphi\le\pi/2$ なら

$$
\operatorname{dist}\left(\frac{y-a}{|y-a|},\theta\right)
=2\sin(\varphi/2),\qquad
\frac{|\pi_{\theta^\perp}(y-a)|}{|y-a|}=\sin\varphi,
$$

なので、$0<s<1/4$ では $s$ の円錐を幅 $2s$ の球面キャップで挟めます。軸の正負両側を合わせて考えれば、正規化円錐量の $s\downarrow0$ 上極限は0か無限大、またはその軸に沿う別点が実在するという結論になります。

一般の余次元 $q=d-m>1$ では、この余次元1の球面論法を、$m+1$ 個の座標の方向に適用して合成します。次の補題でこの合成を確認します。

<a id="lem-gmt18-three-alternatives"></a>

<!-- formal-statement-start -->
> **補題（ほとんど全方向の幾何的三択補題）**
> $K\subset\mathbb R^d$ を $\mathcal H^m(K)<\infty$ のコンパクト集合とし、$\delta>0$ とする。$\gamma_{d,d-m}$ ほとんどすべての $W\in G(d,d-m)$ に対し、$\mathcal H^m$ ほとんどすべての $a\in K$ は次の少なくとも一つを満たす。
>
> - **（0）** $L_{K,W,\delta}(a)=0$。
> - **（∞）** $L_{K,W,\delta}(a)=\infty$。
> - **（繊維）** $(K\setminus\{a\})\cap(a+W)\cap B(a,\delta)\ne\varnothing$。
<!-- formal-statement-end -->

### 証明の見取り図

固定点 $a$ に対して球面の[密度二分法](#lem-gmt18-density-dichotomy)を適用し、まず余次元1の三択を得ます。余次元が大きい場合、核方向の円錐を「一つの核座標が支配的な円錐」の有限和で挟み、回転不変な確率で平均します。最後に $a$ について[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を使います。

<!-- proof-start -->
### 証明

**余次元1。** $d=m+1$ では直前の球面構成により、固定した $a\in K$ についてほとんどすべての直線 $W=\mathbb R\theta$ に三択が成り立ちます。実在方向 $C_a$ は、$K\setminus\{a\}$ を $|y-a|\ge1/j$ で切ったコンパクト部分の方向像の可算和なのでBorelです。円錐の測度も半径・角度の可算な稠密値で近似できるため、三択が破れる点集合は測度可能です。

**一般次元の座標比較。** $q=d-m$ とおき、座標を $z=(u,w)\in\mathbb R^m\oplus\mathbb R^q$ に分けます。基準核 $W_0=\{0\}\oplus\mathbb R^q$ を取り、$\alpha(s)=s^2/(1-s^2)$ とします。条件 $|u|<s|z|$ の両辺を二乗して $|u|^2<s^2(|u|^2+|w|^2)$ と移項すると

$$
|u|^2<\alpha(s)\sum_{j=1}^{q}w_j^2.
$$

そこで $Z_j(s)=\{z:|u|^2<\alpha(s)w_j^2\}$ と定めます。$\alpha(s_*)=q\alpha(s)$ と定めると、正の項の和の最大項が平均以上であることから

$$
\bigcup_{j=1}^{q}Z_j(s)
\subset\{z:|u|<s|z|\}
\subset\bigcup_{j=1}^{q}Z_j(s_*).
$$

しかも $s\downarrow0$ で $s_*/s\to\sqrt q$ です。各 $Z_j$ は、$u$ と一つの座標 $w_j$ が張る $\mathbb R^{m+1}$ の軸円錐を、残りの $q-1$ 座標方向へ延ばしたものです。

**回転平均。** $O(d)$ を $\mathbb R^d$ の直交変換全体の集合とし、その上で左・右から直交変換を合成しても変わらない確率（Haar確率）に従って $g$ を選びます。一つの $j$ を固定し、まず $u,w_j$ の $m+1$ 次元部分だけを回す $k\in O(m+1)$ を選びます。残りの座標を固定したまま方向内容の上の構成を適用すると、ほとんど全 $k$ について、$gkZ_j(s)$ 内の質量の正規化上極限は0か無限大、または $a+gkW_0$ に別点が実在します。

ここで $g$ が任意でも、$g^{-1}(K-a)$ は同じ有限面積条件を満たします。従って任意の固定 $g$ について、例外的な $k$ のHaar測度は0です。三択の失敗の指示関数を $\chi_j$ とすれば

$$
\int_{O(m+1)}\chi_j(gk)\,dk=0
\qquad\text{for every }g\in O(d).
$$

Haar確率の右不変性と[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)により

$$
\int_{O(d)}\chi_j(h)\,dh
=\int_{O(d)}\int_{O(m+1)}\chi_j(hk)\,dk\,dh
=0.
$$

有限個の $j=1,\ldots,q$ について例外集合を除きます。もしどれかの座標円錐に無限大側があれば、左の包含で核円錐にも無限大側があります。すべて0側なら、右の包含と $s_*/s$ の有界性から核円錐も0側です。繊維側があれば、その点の差は $gW_0$ に属するため核の繊維側が成り立ちます。これで固定 $a$ についてHaarほとんど全 $g$ に三択が得られました。

最後に $(a,g)$ の例外集合の指示関数を $d\mathcal H^m\llcorner K(a)\,dg$ で積分します。各 $a$ に対する積分が0なので[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)により、ほとんど全 $g$ でほとんど全 $a\in K$ が三択を満たします。$gW_0$ の分布が $G(d,d-m)$ 上の $\gamma_{d,d-m}$ であることから結論です。$\square$
<!-- proof-end -->

[GMT17の平均評価](../GMT17/index.md#lem-gmt17-small-projection-tail)が各点の二体相互作用の**上界**だったのに対し、ここでは各方向の実在点の集合を用いて上密度が中途半端な値を取れないことを示しました。これは単なる対数評価の定数改善ではありません。

## 4. Besicovitch--Federer射影判定

<a id="thm-gmt18-besicovitch-federer"></a>

<!-- formal-statement-start -->
> **定理（Besicovitch--Federer射影判定）**
> 整数 $d\ge2$、$1\le m<d$ とし、$E\subset\mathbb R^d$ は $0\le\mathcal H^m(E)<\infty$ のBorel集合とする。このとき、次の二条件は同値である。
>
> 1. $E$ は純 $m$-非整流可能である。
> 2. $\gamma_{d,m}$ ほとんどすべての $V\in G(d,m)$ について $\mathcal H^m(\pi_V E)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

**2から1** は[GMT17の系](../GMT17/index.md#cor-gmt17-ae-zero-implies-pure)です。**1から2** はまずコンパクト集合で証明します。三択補題の0側は純非整流性で零測度、無限大側と無限繊維は射影零測度です。最後にコンパクト近似と射影のLipschitz性で一般Borel集合へ戻します。

<!-- proof-start -->
### 証明

**2から1。** [GMT16の整流可能・純非整流分解](../GMT16/index.md#thm-gmt16-decomposition)で $E=R\mathbin{\dot\cup}P$ と書きます。もし $\mathcal H^m(R)>0$ なら[GMT17の正射影定理](../GMT17/index.md#thm-gmt17-rectifiable-positive-projection)からほとんど全方向で $\mathcal H^m(\pi_VR)>0$、従って $\mathcal H^m(\pi_VE)>0$ となり矛盾します。よって $\mathcal H^m(R)=0$、$E$ は純非整流です。

**1から2：コンパクトな場合。** まず $E=K$ をコンパクト・純非整流とします。$\delta_j=1/j$ と置き、すべての $j$ について[三択補題](#lem-gmt18-three-alternatives)を満たす $W\in G(d,d-m)$ を固定します。可算個の例外集合の和を除いただけなので、こうした $W$ はほとんど全方向を占めます。$P=\pi_{W^\perp}$ と書きます。

各 $j$ で

$$
A_{0,j}=\{x\in K:L_{K,W,\delta_j}(x)=0\},\qquad
A_{\infty,j}=\{x\in K:L_{K,W,\delta_j}(x)=\infty\}
$$

とします。[疎な細円錐の零測度補題](#lem-gmt18-sparse-cone)から $\mathcal H^m(A_{0,j})=0$、[発散する円錐質量の零射影補題](#lem-gmt18-divergent-projection)から $\mathcal H^m(PA_{\infty,j})=0$ です。三択のうち残る集合を

$$
A_{3,j}=\{x\in K:(K\setminus\{x\})\cap(x+W)\cap B(x,\delta_j)\ne\varnothing\}
$$

と書くと

$$
\mathcal H^m\bigl(K\setminus(A_{\infty,j}\cup A_{3,j})\bigr)=0
$$

です。ここでは $A_{0,j}$ を含む零面積集合と三択例外集合を除きました。この零面積集合の射影は[GMT17のLipschitz上界](../GMT17/index.md#lem-gmt17-projection-lipschitz)で零面積です。

$A_3^\infty=\bigcap_jA_{3,j}$ とすると、その各点 $x$ には同じ繊維内に $x$ と異なる点が任意の半径 $\delta_j$ 内にあるので、$K\cap(x+W)$ には無限個の点があります。[無限繊維補題](#lem-gmt18-infinite-fibers)で $\mathcal H^m(PA_3^\infty)=0$ です。一方、

$$
K\setminus\left(\bigcup_jA_{\infty,j}\cup A_3^\infty\right)
\subset\bigcup_j\bigl(K\setminus(A_{\infty,j}\cup A_{3,j})\bigr)
$$

だから、この左辺も射影して測度0です。右辺の各集合の射影は零であり、$\bigcup_jA_{\infty,j}$ と $A_3^\infty$ の射影も零なので、結局 $\mathcal H^m(PK)=0$ を得ます。

**一般のBorel集合。** 有限Borel測度 $\mu=\mathcal H^m\llcorner E$ の内側正則性により、コンパクト集合 $K_1,K_2,\ldots\subset E$ を取り

$$
\mathcal H^m\left(E\setminus\bigcup_{j=1}^{\infty}K_j\right)=0
$$

とできます。各 $K_j$ も純非整流なので、コンパクトの場合からそれぞれほとんど全方向で $\mathcal H^m(\pi_VK_j)=0$ です。可算個の方向例外集合を除けば、[射影のLipschitz上界](../GMT17/index.md#lem-gmt17-projection-lipschitz)と可算劣加法性で

$$
\mathcal H^m(\pi_VE)
\le\sum_j\mathcal H^m(\pi_VK_j)
+\mathcal H^m\left(\pi_V\left(E\setminus\bigcup_jK_j\right)\right)
=0.
$$

$W\mapsto W^\perp$ はGrassmann上の回転不変確率を対応させるので、核方向のほとんど全 $W$ は射影先のほとんど全 $V$ と同じ主張です。以上で同値が示されました。$\square$
<!-- proof-end -->

<a id="cor-gmt18-rectifiable-part"></a>

<!-- formal-statement-start -->
> **系（射影測度による整流可能成分の検出）**
> $E\subset\mathbb R^d$ を有限 $\mathcal H^m$ 測度のBorel集合とし、[GMT16の分解](../GMT16/index.md#thm-gmt16-decomposition)を $E=R\mathbin{\dot\cup}P$ とする。ほとんどすべての $V\in G(d,m)$ について

$$
\mathcal H^m(\pi_VP)=0
$$

> であり、次が成り立つ。
>
> - $\mathcal H^m(R)=0$ なら $\mathcal H^m(\pi_VE)=0$。
> - $\mathcal H^m(R)>0$ なら $\mathcal H^m(\pi_VE)>0$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$P$ は純非整流なので[判定定理](#thm-gmt18-besicovitch-federer)から $\pi_VP$ はほとんど全方向で零面積です。$R$ が零面積なら[射影上界](../GMT17/index.md#lem-gmt17-projection-lipschitz)で $\pi_VR$ も全方向で零面積です。$R$ が正面積なら[GMT17の正射影定理](../GMT17/index.md#thm-gmt17-rectifiable-positive-projection)でほとんど全方向について $\mathcal H^m(\pi_VR)>0$。$\pi_VR\subset\pi_VE$ の単調性を使えば結論です。$\square$
<!-- proof-end -->

### 直接例：特定の方向は例外になり得る

**水平線分。** $S=[0,1]\times\{0\}$ では $\mathcal H^1(\pi_{V_\theta}S)=|\cos\theta|$ です。$\theta=\pi/2$ の一方向だけ零ですが、ほかの方向では正です。したがって $S$ は純非整流ではありません。

**四隅Cantor集合。** [四隅Cantor dustの純非整流性](../GMT12/index.md#thm-gmt12-corner-pure)と有限正長性は既に示しました。これに[判定定理](#thm-gmt18-besicovitch-federer)を適用すると、四隅集合 $K$ はほとんど全方向で $\mathcal H^1(\pi_VK)=0$ です。他方[GMT16の射影例](../GMT16/index.md#prop-gmt16-projection-contrast)では特定の斜め方向の射影が区間になります。「ほとんどすべて」と「すべて」は取り違えられません。

**混合集合。** 平行移動した $K$ と水平線分を離して和集合 $E=S\cup(K+(2,2))$ を作ると、$K$ 側の射影面積はほとんど全方向で消えますが、$S$ 側の正面積が残るので、$E$ 全体の射影面積はほとんど全方向で正です。これは$E$ 自体の純非整流性ではなく、分解成分によって決まります。

## 5. 演習：量化順序と円錐・繊維の計算

### GMT18-A01 水平線分の円錐集中量
- Level: A
- 目安時間: 15分

$E=[-2,2]\times\{0\}\subset\mathbb R^2$、$a=(0,0)$、$\delta=1$ とする。$W$ が水平軸の場合と垂直軸の場合、それぞれ $D_{E,W,1}(a,s)$ と $L_{E,W,1}(a)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$W=\mathbb Re_1$ なら $P$ は垂直射影であり、すべての $y\in E$ に対し $|P(y-a)|=0$ です。$0<r<1$ では円錐と $E$ の交差の長さは $2r$、従って

$$
D_{E,W,1}(a,s)=\sup_{0<r<1}\frac{2r}{rs}=\frac2s,
\qquad L_{E,W,1}(a)=\infty.
$$

$W=\mathbb Re_2$ なら $P$ は水平射影で、$y\ne a$ に対し $|P(y-a)|=|y-a|$。$s<1$ の不等式を満たすのは $a$ のみです。単点の $\mathcal H^1$ 測度は0なので $D=0$、$L=0$ です。どちらの方向でも線分が純非整流になるわけではありません。
<!-- solution-end -->

### GMT18-A02 二つの核座標で円錐を挟む
- Level: A
- 目安時間: 18分

$d=4,m=2$、$q=2$、$s=1/2$ とする。$\alpha(s)$ と $s_*$ を求め、$|u|^2<\alpha(s)(w_1^2+w_2^2)$ から、少なくとも一つの $j$ について $|u|^2<\alpha(s_*)w_j^2$ が従う理由を述べよ。

<!-- solution-start -->
#### 詳細解答

定義から $\alpha(1/2)=(1/4)/(3/4)=1/3$ です。$\alpha(s_*)=2/3$ より

$$
\frac{s_*^2}{1-s_*^2}=\frac23
\quad\Longleftrightarrow\quad
3s_*^2=2-2s_*^2
\quad\Longleftrightarrow\quad
s_*=\sqrt{\frac25}.
$$

$w_1^2+w_2^2\le2\max\{w_1^2,w_2^2\}$ なので、仮定を代入すると

$$
|u|^2<\frac13(w_1^2+w_2^2)
\le\frac23\max\{w_1^2,w_2^2\}
=\alpha(s_*)\max\{w_1^2,w_2^2\}.
$$

最大値を実現する添字 $j$ を選べば結論です。$s_*=s$ としてしまうと係数2が欠けます。
<!-- solution-end -->

### GMT18-A03 同じ繊維に三点がある場合
- Level: A
- 目安時間: 15分

$E=\bigcup_{j=0}^2([0,1]\times\{j\})$、$P(x,y)=x$ とする。$z\in(0,1)$ の繊維の点数 $N(z)$、$\int N(z)\,d\mathcal H^1(z)$、$\mathcal H^1(E)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$P^{-1}\{z\}$ は垂直直線 $x=z$ です。$0<z<1$ では交点が $(z,0),(z,1),(z,2)$ の三点なので $N(z)=3$。$z$ が区間外なら0で、端点は積分に影響しません。従って

$$
\int_{\mathbb R}N(z)\,d\mathcal H^1(z)
=\int_0^1 3\,dz=3.
$$

各線分の長さは1、三線分は交わらないため $\mathcal H^1(E)=1+1+1=3$。無限繊維の零射影補題の積分上界は、この例で等号になります。
<!-- solution-end -->

### GMT18-A04 「ある方向」と「ほとんど全方向」
- Level: A
- 目安時間: 15分

水平線分 $S=[0,1]\times\{0\}$ に対して「零射影となる方向が存在する」と「ほとんど全方向で零射影」の真偽を、角度表示 $V_\theta=\mathbb R(\cos\theta,\sin\theta)$ で説明せよ。

<!-- solution-start -->
#### 詳細解答

$S$ 上の点 $(x,0)$ の $V_\theta$ 成分は $x\cos\theta$ です。$x$ が0から1へ動くと射影像の長さは $|\cos\theta|$ なので

$$
\mathcal H^1(\pi_{V_\theta}S)=|\cos\theta|.
$$

$\theta=\pi/2$ では0なので第一の命題は真です。しかし $[0,\pi)$ 上ではこの角度以外すべて長さが正であり、零となる角度集合はLebesgue測度0です。従って第二の命題は偽です。この区別が[判定定理](#thm-gmt18-besicovitch-federer)の量化の要点です。
<!-- solution-end -->

### GMT18-B01 疎な円錐から双Lipschitz性へ
- Level: B
- 目安時間: 25分

$F\subset\mathbb R^d$、$\operatorname{diam}F<\delta$、$W\in G(d,d-m)$、$0<s<1$ とする。任意の $x\in F$ に対し $F\cap X(x,\delta,W,s)\subset\{x\}$ と仮定する。$P=\pi_{W^\perp}$ の $F$ への制限が単射で、逆写像が $1/s$-Lipschitzであることを証明せよ。純非整流な $E$ に $F\subset E$ なら何が従うか。

<!-- solution-start -->
#### 詳細解答

相異なる $x,y\in F$ に対し $|x-y|<\delta$ です。仮定から $y$ は円錐に入らず

$$
|P(y-x)|\ge s|y-x|>0.
$$

従って $Px=Py$ は起こらず $P|_F$ は単射です。$u=Px,v=Py\in P(F)$ として逆写像 $f$ を定義すると

$$
|f(u)-f(v)|=|x-y|\le s^{-1}|Px-Py|=s^{-1}|u-v|.
$$

これにより $F=f(PF)$ は $m$ 平面上の集合のLipschitz像です。[純非整流の定義](../GMT12/index.md#def-gmt12-purely-unrectifiable)を満たす $E$ と交わる $m$ 整流可能集合は零面積なので、$\mathcal H^m(F)=0$ です。
<!-- solution-end -->

### GMT18-B02 発散円錐のVitali評価
- Level: B
- 目安時間: 28分

$m=1$、$\mathcal H^1(E)=5$ とし、ある $W$ において $A_\infty$ を[発散円錐補題](#lem-gmt18-divergent-projection)の集合とする。$M=20$ を用いたVitali被覆で $\mathcal H^1(PA_\infty)$ にどのような上界が得られるか。さらに $M$ を任意にできる理由と結論を説明せよ。

<!-- solution-start -->
#### 詳細解答

各円錐の面積が $M(rs)$ より大きく、射影球の長さは $2rs$ です。互いに素な射影球を選べば元の円錐も互いに素で、$\sum_i\mathcal H^1(E\cap X_i)\le5$ です。従って

$$
\mathcal H^1(PA_\infty)\le
2\sum_i r_is_i\le\frac2{20}\sum_i\mathcal H^1(E\cap X_i)
\le\frac12.
$$

これは $M=20$ のときの数値上界であり、零であることはまだ示していません。$L(x)=\infty$ は**任意の** $M>0$ に対し細い円錐があるという意味なので、同じ被覆論法を $M$ を大きくして反復できます。$\mathcal H^1(PA_\infty)\le10/M$ に $M\to\infty$ を適用し、零を得ます。
<!-- solution-end -->

### GMT18-B03 外測度の非加法性を確かめる
- Level: B
- 目安時間: 25分

二点集合 $X=\{p,q\}$ 上の二つの測度を $\nu_1=\delta_p$、$\nu_2=\delta_q$ とし、$\Psi(B)=\sup\{\nu_1(B),\nu_2(B)\}$ とする。$\Psi$ の単調性・劣加法性を示し、加法性が失われる具体例を与えよ。またなぜ通常の測度微分定理をそのまま $\Psi$ に適用できないか説明せよ。

<!-- solution-start -->
#### 詳細解答

$B\subset C$ なら各 $i$ で $\nu_i(B)\le\nu_i(C)$ なので、上限を取って $\Psi(B)\le\Psi(C)$。可算個の $B_j$ について

$$
\Psi\left(\bigcup_j B_j\right)
=\sup_i\nu_i\left(\bigcup_jB_j\right)
\le\sup_i\sum_j\nu_i(B_j)
\le\sum_j\sup_i\nu_i(B_j)=\sum_j\Psi(B_j).
$$

しかし $\Psi(\{p\})=\Psi(\{q\})=1$ に対し $\Psi(X)=1$ なので、互いに素な集合への加法性は成り立ちません。円錐の方向内容 $\Psi_a$ も半径ごとの測度の上限で作るため同種の非加法性があります。したがって[零内容集合の密度二分法](#lem-gmt18-density-dichotomy)では外測度だけで動く5倍球被覆を用いました。
<!-- solution-end -->

### GMT18-B04 四隅集合と混合集合
- Level: B
- 目安時間: 30分

[GMT12の四隅Cantor集合](../GMT12/index.md#thm-gmt12-corner-pure)を $K$ とし、$S=[0,1]\times\{0\}$、$E=S\cup(K+(2,2))$ とする。$K$ と $E$ について典型的な方向の射影面積を判定し、特定方向の正射影がなぜ反例でないか説明せよ。

<!-- solution-start -->
#### 詳細解答

$K$ は純1非整流かつ $0<\mathcal H^1(K)<\infty$ なので[判定定理](#thm-gmt18-besicovitch-federer)から

$$
\mathcal H^1(\pi_V K)=0\quad\text{for }\gamma_{2,1}\text{-a.e. }V.
$$

平行移動は投影像の長さを変えません。一方、線分の射影は $\theta\ne\pi/2$ で長さ $|\cos\theta|>0$ なので

$$
\mathcal H^1(\pi_{V_\theta}E)\ge
\mathcal H^1(\pi_{V_\theta}S)=|\cos\theta|>0
\quad(\theta\ne\pi/2).
$$

従って $E$ の射影はほとんど全方向で正面積です。[GMT16の四隅集合の具体例](../GMT16/index.md#prop-gmt16-projection-contrast)に現れる特定方向の正射影は、例外方向一つの情報であり「a.e.で零」とは両立します。
<!-- solution-end -->

### GMT18-C01 任意の正面積部分集合を使った整流可能性判定
- Level: C
- 目安時間: 45分

$E\subset\mathbb R^d$ を有限 $\mathcal H^m$ 測度のBorel集合とする。次の性質を考える。

> 任意のBorel部分集合 $B\subset E$ で $\mathcal H^m(B)>0$ を満たすものについて、ほとんど全 $V\in G(d,m)$ で $\mathcal H^m(\pi_VB)>0$。

この性質が「$E$ は可算 $m$-整流可能」と同値であることを証明せよ。$\mathcal H^m(E)=0$ の場合も扱い、純非整流部分が残る場合の反例を構成せよ。

<!-- solution-start -->
#### 詳細解答

**整流可能なら性質が成り立つ。** $E$ が可算 $m$ 整流可能なら、その部分集合 $B$ も同じ可算Lipschitz像の和から外れた零集合を除いて覆われるため、整流可能です。$0<\mathcal H^m(B)\le\mathcal H^m(E)<\infty$ を[GMT17の正射影定理](../GMT17/index.md#thm-gmt17-rectifiable-positive-projection)へ代入すれば、ほとんど全 $V$ で射影面積が正となります。

**逆向き。** [有限Hausdorff面積集合の整流可能・純非整流分解](../GMT16/index.md#thm-gmt16-decomposition)により $E=R\mathbin{\dot\cup}P$、$R$ は可算整流可能、$P$ は純非整流です。もし $\mathcal H^m(P)>0$ なら、問題の性質で $B=P$ と選ぶとその射影がほとんど全方向で正でなければなりません。しかし[Besicovitch--Federer判定](#thm-gmt18-besicovitch-federer)は $\mathcal H^m(\pi_VP)=0$ がほとんど全方向で成り立つと示すので矛盾します。従って $\mathcal H^m(P)=0$、ゆえに $E$ は可算整流可能です。

**端点と反例。** $\mathcal H^m(E)=0$ なら正面積部分集合 $B$ は存在せず、性質は空虚に真です。同時に零集合は可算整流可能の定義で零例外集合として扱えるので同値は壊れません。正面積の純非整流部分を残した反例として $E=S\cup(K+(2,2))$、$B=K+(2,2)$ を取れば、$E$ 自体はほとんど全方向で正射影ですが、$B$ の射影はほとんど全方向で零となります。全体 $E$ だけの正射影を条件にしてはいけないことが分かります。
<!-- solution-end -->

## まとめ

- [疎な円錐の補題](#lem-gmt18-sparse-cone)は純非整流性から円錐内質量の0側を排除します。
- [発散円錐の零射影](#lem-gmt18-divergent-projection)と[無限繊維の零射影](#lem-gmt18-infinite-fibers)は有限面積と被覆から従います。
- [方向内容の密度二分法](#lem-gmt18-density-dichotomy)と[三択補題](#lem-gmt18-three-alternatives)で、典型的な核方向について上の三場合のどれかがほとんど全点で起きます。
- [Besicovitch--Federer射影判定](#thm-gmt18-besicovitch-federer)は、有限Hausdorff面積のBorel集合について純非整流性と典型方向の零射影を同値にします。一方向の射影だけでは判定できません。

次のGMT19では小球を拡大して測度の局所形を取り出す **blow-upと接測度** を導入します。
