# LORG18 最大化因果曲線とAvez–Seifert

<!-- definition-example-audit: strict -->

## 1. 上限へ近づく曲線と、上限を実現する曲線

[LORG17のLorentz時間分離](../LORG17/index.md#def-lorg17-time-separation)は、二点を結ぶ未来因果曲線の長さの**上限**として定義しました。上限を計算できても、その値を実現する曲線があるとは限りません。たとえば原点を除いたMinkowski平面では、直線に近づく折れ線の長さが $2$ に近づきますが、極限の直線は時空から除外されています。

問題は「ほぼ最大の曲線を選んだあと、その曲線列を時空の中で収束させられるか」です。[LORG16の大域双曲性](../LORG16/index.md#def-lorg16-global-hyperbolicity)が曲線の逃避を防ぎ、[LORG17の長さの上半連続性](../LORG17/index.md#thm-lorg17-length-usc)が極限で長さを失わないことを保証します。この二つを組み合わせることで、大域的な上限の達成を証明できます。

この講では $(M,g)$ を境界のない滑らかな時間向き付きLorentz時空、計量符号を $(-,+,\ldots,+)$ とします。未来因果曲線は局所Lipschitz曲線を含め、その長さはほとんど至るところの速度から積分します。因果関係の $p\le q$ と時間的関係の $p\ll q$ は[LORG6の定義](../LORG6/index.md#def-lorg6-chronological-causal-future)に従います。

## 2. 最大化曲線を定義し、Minkowskiで確かめる

二点が因果的に結ばれるとき、ある因果曲線の長さが時間分離そのものに等しいかを調べます。ここで比較するのは局所的な競合曲線だけでなく、端点を固定した**時空全体**の未来因果曲線です。

<a id="def-lorg18-maximizer"></a>

<!-- formal-statement-start -->
> **定義（最大化因果曲線）**  
> $(M,g)$ の二点 $p\le q$ を結ぶ未来因果曲線 $\gamma:[0,1]\to M$ が、Lorentz長さ $L_g(\gamma)$ と時間分離 $d_g(p,q)$ について
>
$$
L_g(\gamma)=d_g(p,q)<+\infty
$$
>
> を満たすとき、$\gamma$ を $p$ から $q$ への**最大化因果曲線**という。$p=q$ の場合は定数曲線を許す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg18-maximizer -->
**定義の確認**。Minkowski平面で $p=(0,0)$、$q=(5,3)$、$\gamma(s)=(5s,3s)$ とします。速度 $(5,3)$ の時間成分は正で、$\eta(\dot\gamma,\dot\gamma)=-25+9=-16<0$ なので未来時間的です。長さは

$$
L_\eta(\gamma)=\int_0^1\sqrt{25-9}\,ds=4.
$$

[LORG17のMinkowski時間分離公式](../LORG17/index.md#thm-lorg17-minkowski-formula)に同じ二点を代入すると $d_\eta(p,q)=\sqrt{(5-0)^2-(3-0)^2}=4$ です。有限性、因果性、等号の三条件を確認できたので $\gamma$ は最大化曲線です。対して折れ線 $p\to(2,0)\to q$ は長さ $2+\sqrt{9-9}=2<4$ であり、未来因果的でも最大化しません。
<!-- definition-example-end -->

最大化の等号は単なる最大値の公式ではありません。このあと任意の部分区間も最大化することを導き、局所的には測地線へつながることを調べます。

## 3. 大域双曲性が上限の達成を保証する

まず定理の仮定を明確にします。大域双曲的とは、強因果性と、二点 $x,y$ に対する因果ダイヤモンド $J^+(x)\cap J^-(y)$ のコンパクト性を満たすことでした。[コンパクトダイヤモンド内の因果曲線の抽出](../LORG16/index.md#prop-lorg16-curves-compact)は、固定端点を結ぶ因果曲線列について、補助Riemann弧長を一様に抑え、極限曲線を取り出せることを保証します。

<a id="thm-lorg18-avez-seifert"></a>

<!-- formal-statement-start -->
> **定理（Avez–Seifert：最大化因果曲線の存在）**  
> $(M,g)$ を滑らかな時間向き付き大域双曲的Lorentz時空とする。任意の二点 $p,q\in M$ が $p\le q$ を満たせば、$p$ から $q$ への未来因果曲線 $\gamma$ で
>
$$
L_g(\gamma)=d_g(p,q)<+\infty
$$
>
> を満たすものが存在する。特に $p\ll q$ なら最大化曲線の長さは正である。$p\le q$ かつ $p\not\ll q$ の場合には長さは零である。
<!-- formal-statement-end -->

### 証明の見取り図

時間分離の上限に $1/k$ 以内まで迫る $\gamma_k$ を取ります。すべての像を同じコンパクトダイヤモンドに入れ、補助計量による弧長を一様に抑えて $[0,1]$ 上の一様Lipschitz曲線に直します。曲線抽出で未来因果的な $\gamma$ を得て、長さの上半連続性で「上限を下回る」可能性を排除します。最後に定義上の $L_g(\gamma)\le d_g(p,q)$ を合わせます。

<!-- proof-start -->
### 証明

$p\le q$ とします。[大域双曲時空での時間分離の有限性](../LORG17/index.md#thm-lorg17-gh-continuity)から $D=d_g(p,q)$ は有限の非負実数です。上限の定義により、各正整数 $k$ に対して未来因果曲線 $\gamma_k:p\to q$ を選べて、

$$
D-\frac1k<L_g(\gamma_k)\le D
$$

とできます。したがって挟み撃ちから $L_g(\gamma_k)\to D$ です。

各 $\gamma_k$ の点 $z$ は $p\le z\le q$ を満たすので、その像は

$$
K=J^+(p)\cap J^-(q)
$$

に含まれます。$K$ は大域双曲性からコンパクトです。[LORG16の強因果性による弧長有界性と曲線抽出](../LORG16/index.md#prop-lorg16-curves-compact)により、完全な補助Riemann計量 $h$ についてこれらの曲線の $h$-弧長には共通上界 $B<\infty$ があります。

各曲線を $[0,1]$ で $h$-定数速に再パラメータ化すると、任意の $s,t\in[0,1]$ に対して

$$
d_h(\gamma_k(s),\gamma_k(t))
\le L_h(\gamma_k|_{[s,t]})
=|s-t|L_h(\gamma_k)
\le B|s-t|.
$$

像は共通コンパクト集合 $K$ にあり、$B$-Lipschitz評価も共通です。[LORG14の限界曲線補題](../LORG14/index.md#thm-lorg14-limit-curve)を適用して、部分列を同じ記号で書けば $\gamma_k\to\gamma$ が一様に成立し、極限は未来因果曲線です。端点は各 $k$ で固定されているため、

$$
\gamma(0)=\lim_k\gamma_k(0)=p,\qquad
\gamma(1)=\lim_k\gamma_k(1)=q.
$$

再パラメータ化によってLorentz長さは変わりません。[LORG17の長さの上半連続性](../LORG17/index.md#thm-lorg17-length-usc)の仮定である共通コンパクト性・一様Lipschitz性・未来因果性を確かめたので、

$$
L_g(\gamma)\ge\limsup_kL_g(\gamma_k)=D.
$$

一方、$\gamma$ 自身が $p$ から $q$ への許された未来因果曲線だから、[時間分離の定義](../LORG17/index.md#def-lorg17-time-separation)より $L_g(\gamma)\le D$ です。両者を挟むと

$$
L_g(\gamma)=D=d_g(p,q).
$$

$p\ll q$ のときは[正の時間分離の特徴付け](../LORG17/index.md#prop-lorg17-positive)から $D>0$ です。逆に $p\le q$ で $p\not\ll q$ なら $D=0$ でなければ同じ特徴付けに矛盾します。$p=q$ では因果性により非自明な閉因果曲線が存在せず、定数曲線で成立します。$\square$
<!-- proof-end -->

大域双曲性を仮定したのは、**任意の因果曲線の存在**を単独で保証するためではありません。$p\le q$ ですでに一本は存在します。必要なのは、長くなる候補曲線を同じ時空内の一本へ収束させる点です。

## 4. 最大化はすべての部分区間へ伝わる

大域で最大なら、途中だけ遠回りしていることはできません。そうした部分をより長い曲線へ取り替えれば、元の全体の長さを更新してしまうからです。

<a id="prop-lorg18-subarc"></a>

<!-- formal-statement-start -->
> **命題（最大化曲線の任意の部分曲線も最大化する）**  
> 時間向き付きLorentz時空において $\gamma:[0,1]\to M$ を最大化因果曲線とする。$0\le a<b\le1$ に対して $x=\gamma(a)$、$y=\gamma(b)$ と置くと、
>
$$
L_g(\gamma|_{[a,b]})=d_g(x,y)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

部分曲線の長さが局所的な端点間の時間分離より小さいと仮定し、もっと長い接続に差し替えて矛盾を作ります。曲線を前・中・後へ分割したときの長さの加法性が決め手です。

<!-- proof-start -->
### 証明

$A=L_g(\gamma|_{[a,b]})$ とします。$x\le y$ だから $A\le d_g(x,y)$ です。もし厳密に $A<d_g(x,y)$ なら、上限の定義から $x\to y$ の未来因果曲線 $\beta$ で $L_g(\beta)>A$ を満たすものが存在します（右辺が無限大でも有限の $A$ を超す候補が存在します）。

$\gamma|_{[0,a]}$、$\beta$、$\gamma|_{[b,1]}$ を順につなぐと、同じ始点 $\gamma(0)$ と終点 $\gamma(1)$ を持つ未来因果曲線 $\widetilde\gamma$ になります。[Lorentz長さの加法性](../LORG3/index.md#prop-lorg3-length-additivity)を各接合点に適用して、

$$
\begin{aligned}
L_g(\widetilde\gamma)
&=L_g(\gamma|_{[0,a]})+L_g(\beta)+L_g(\gamma|_{[b,1]})\\
&>L_g(\gamma|_{[0,a]})+A+L_g(\gamma|_{[b,1]})\\
&=L_g(\gamma)=d_g(\gamma(0),\gamma(1)).
\end{aligned}
$$

これは時間分離が許す上限に反します。よって等号が成立します。$\square$
<!-- proof-end -->

この命題は大域双曲性を必要としません。最大化曲線がすでに与えられた場合の帰結です。逆にすべての**短い**部分曲線が最大でも全区間が最大とは限りません。この差を平坦円筒で確かめます。

## 5. 最大化曲線と測地線の関係

[LORG4の測地線](../LORG4/index.md#prop-lorg4-lorentz-exponential)は接続に対して加速度が零になる曲線です。一方、最大化曲線は長さを端点間のすべての競合曲線と比較して定義しました。定義が違うため、まず最大化から局所情報を得て、その後に微分方程式へ戻ります。

**局所的な規則性の要点**。[平坦円筒で測地線が大域最大とは限らない例](../LORG5/index.md#prop-lorg5-cylinder-nonglobal)と対照的に、点の周りの十分小さい[凸正規近傍](../LORG5/index.md#def-lorg5-convex-normal) $U$ 内では端点を結ぶ測地線片が一意に定まります。ここでは $U$ の**時空全体に対する因果的凸性は仮定しません**。一般の時空で得られるのは、[LORG8の相対的な局所ダイヤモンド](../LORG8/index.md#lem-lorg8-local-diamonds)のような局所領域内の凸性であり、任意に小さい大域的因果的凸近傍が存在するとは限らないからです。以下で比較する曲線は、像が $U$ に入るものに限定します。

$x\ll_U y$ の場合は時間的測地線片が局所時間分離を実現し、[LORG5の局所最大化と等号条件](../LORG5/index.md#thm-lorg5-local-maximization)で像が決まります。同定理の記述は区分的 $C^1$ 曲線ですが、局所Lipschitzな因果曲線でも、Gaussian座標中の速度をほとんど至るところで評価して積分すれば同じ等号判定が使えます。$x\le_U y$ かつ $x\not\ll_U y$ では、端点が局所光錐の境界にあることを使い、[LORG5の正規光錐](../LORG5/index.md#prop-lorg5-normal-coordinate-cone)と因果曲線の局所的な角の短絡から、接続する曲線の像が光的測地線片に限られることを確かめます。長さが零という値だけからの一意性ではありません。

<a id="prop-lorg18-local-geodesic"></a>

<!-- formal-statement-start -->
> **命題（最大化曲線の測地線としての規則性）**  
> 滑らかな時間向き付きLorentz時空の最大化因果曲線は、停止を除く適切な向き保存再パラメータ化の下で、時間的測地線または光的測地線となる。始点と終点が時間的に結ばれれば前者、因果的だが時間的に結ばれなければ後者である。ただし両端が同一点の定数曲線は別扱いとする。
<!-- formal-statement-end -->

### 証明の見取り図

[部分曲線の最大化](#prop-lorg18-subarc)により、どの小区間も近傍内で最大化します。凸正規近傍の局所測地線と比較すれば、曲線の像は各小区間で測地線片になります。隣接する区間で接方向が異なる角があると、その角を含むさらに短い区間の局所測地線で取り替えられて最大性に反するため、同一の測地線が続きます。

<!-- proof-start -->
### 証明

非定数の最大化曲線 $\gamma$ の像上の点 $r$ を取ります。[凸正規近傍の局所存在](../LORG5/index.md#thm-lorg5-convex-normal-existence)により、$r$ を含む十分小さい凸正規近傍 $U$ を選びます。$U$ を時空全体で因果的に凸とする必要はありません。$\gamma$ の連続性から、$r$ の前後の十分短い部分曲線 $\gamma|_{[a,b]}$ は $U$ に収まります。以下では端点を結ぶ競合曲線も $U$ 内だけを走るものとします。

[部分曲線の最大化](#prop-lorg18-subarc)により、その部分の長さは二端点の大域時間分離です。もし $U$ 内の別の因果曲線がこれより長ければ大域最大性に反します。したがってこの部分曲線は $U$ 内でも最大化します。

$x=\gamma(a)$、$y=\gamma(b)$ とおきます。$x\ll_U y$ の場合、局所時間分離を実現する時間的測地線片 $\sigma_{xy}$ が一意にあります。$\gamma|_{[a,b]}$ は大域最大化から $U$ 内でも最大なので、$\sigma_{xy}$ と同じ長さです。[LORG5のGaussian座標による比較](../LORG5/index.md#thm-lorg5-local-maximization)を $\sigma_{xy}$ の周りで行い、局所Lipschitz曲線を $(t(s),z(s))$ と書きます。ここでは短区間と端点を十分縮め、[凸正規近傍の測地線の滑らかな端点依存](../LORG5/index.md#thm-lorg5-convex-normal-existence)および $\gamma$ の連続性により、比較する両曲線を同じGaussian座標領域に収めておきます。その座標ではほとんど至るところで

$$
\sqrt{\dot t^{\,2}-h_{ij}(t,z)\dot z^i\dot z^j}
\le\dot t
$$

です。座標時刻 $t$ は絶対連続なので、$\int_a^b\dot t\,ds=t(b)-t(a)$ です。積分した等号が成り立つには、非負の差の積分が零なので $h_{ij}\dot z^i\dot z^j=0$ がほとんど至るところで必要です。$h_{ij}$ の正定値性から $\dot z=0$ がほとんど至るところで、$z$ の絶対連続性と端点 $z=0$ より $z(s)=0$ が全区間で成立します。従って停止・向き保存再パラメータ化を除いて $\sigma_{xy}$ と同じ像です。

$x\not\ll_U y$ の場合は $x\le_U y$ です。凸正規近傍の[放射光円錐](../LORG5/index.md#prop-lorg5-normal-coordinate-cone)の境界上に $y$ があり、端点を結ぶ測地線は光的です。境界へ向かう因果曲線が途中で時間的に進めば、[push-up補題](../LORG7/index.md#thm-lorg7-push-up)を $U$ 内で適用して $x\ll_U y$ となり矛盾します。従って、許される曲線の途中の方向は局所光錐の同一生成方向に限られ、測地線片の像と一致します。

この光的な一意性の判定では、異なる点の接ベクトルをそのまま足してはいけません。角のある点 $z$ の**同じ接空間 $T_zM$** で、折れの前後の未来光的接方向を $u,v$ として比較します。異なる生成方向なら $u,v$ は正の比例関係にないので、[Lorentz内積と未来錐](../LORG1/index.md#def-lorg1-lorentz-inner-product)から

$$
g_z(u+v,u+v)=2g_z(u,v)<0.
$$

したがって角を小領域内で丸めれば、その小区間の端点を未来時間的に結べます。残りの因果曲線と連結し、[push-up補題](../LORG7/index.md#thm-lorg7-push-up)を使えば $x\ll_U y$ に反します。滑らかでない曲線にも、この局所的な時間的短絡を小区間ごとに適用することで同じ結論を得ます。

各 $r$ をこのような短区間の内部に取れるため、曲線の像は局所的に滑らかな因果測地線です。重なる二つの区間で二本の測地線の接線方向が違うなら、その重なりをまたぐ端点を $U$ 内で選んだとき、両方の片をつなぐ曲線は一意の局所測地線と一致できません。したがって滑らかな接方向がそろい、測地線方程式の初期値一意性により全体が一つの向き付けられた測地線の像となります。

測地線では $g(\dot\gamma,\dot\gamma)$ は[LORG4の因果型保存](../LORG4/index.md#prop-lorg4-geodesic-causal-type)によって一定です。よって非定数測地線が時間的な部分と光的な部分を混在させることはありません。$p\ll q$ なら最大化長さは[正の時間分離の特徴付け](../LORG17/index.md#prop-lorg17-positive)により正なので光的ではありません。$p\le q$ かつ $p\not\ll q$ なら長さ零であり、時間的測地線なら正長かつ $p\ll q$ を与えてしまうので光的です。$\square$
<!-- proof-end -->

**含意の向きに注意**。最大化曲線は測地線ですが、測地線が必ず大域最大とは限りません。局所的な変分方程式を満たすだけでは、遠回りする別の測地線と比較できないためです。

## 6. 共役点と大域最大性、完備性を区別する

初期速度を少し変えた測地線が、後で再び同じ点に集まることがあります。これを検出する道具が**指数写像の微分**です。$\exp_p$ は接空間 $T_pM$ のベクトル $w$ を、その初速度から時刻 $1$ だけ進んだ測地線の終点へ写します。従って $(d\exp_p)_w:T_w(T_pM)\simeq T_pM\to T_{\exp_p(w)}M$ は初速度の微小変化を終点の微小変化へ送る線形写像です。核が非零とは、非零の速度変化に対して終点の一次変化が零となることです。[GEO17の共役点定義](../../GEO/GEO17/index.md#def-geo17-conjugate)は端点で零となるJacobi場で定義し、[指数写像の微分退化との同値](../../GEO/GEO17/index.md#thm-geo17-conjugate-exp)を証明しています。接続の測地線初期値方程式から得られる微分退化の特徴付けはLorentz計量にも適用できます。ただし、Riemann計量での**最短性**の結論をLorentz長さの**最大性**へ無条件に読み替えることはできません。以下では指数写像の微分が非単射となる条件を直接用います。

<a id="def-lorg18-conjugate"></a>

<!-- formal-statement-start -->
> **定義（測地線に沿う共役点）**  
> 滑らかなLorentz時空の非零初速度 $v\in T_pM$ から出るアフィン測地線を $\gamma(s)=\exp_p(sv)$ とする。$s_0>0$ で指数写像が $s_0v$ の近くに定義され、
>
$$
\ker (d\exp_p)_{s_0v}\ne\{0\}
$$
>
> となるとき、$q=\gamma(s_0)$ をこの測地線に沿う $p$ の**共役点**という。単に二本の測地線が同じ終点に達するだけでは共役点とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg18-conjugate -->
**定義の確認**。平坦Minkowski空間では $\exp_p(v)=p+v$ なので、任意の $s_0v$ における微分は恒等線形写像です。

$$
(d\exp_p)_{s_0v}(w)=w,\qquad
\ker(d\exp_p)_{s_0v}=\{0\}.
$$

従ってどの測地線にも共役点はありません。平坦円筒 $\mathbb R\times S^1$ でも、局所座標と被覆 $\mathbb R^2\to\mathbb R\times S^1$ により指数写像は局所的に $(t,\theta)\mapsto(t+v_t,[\theta+v_\theta])$ です。その微分は恒等で核は零です。円周を逆方向に回る測地線が同じ点で出会っても、定義上それだけでは共役点ではありません。
<!-- definition-example-end -->

**共役点が意味する範囲**。時間的測地線の内部に共役点があると、その区間は一般にLorentz長さを最大化できないという変分理論の結果があります。証明には端点で零となる測地線変分の変化ベクトル（Jacobi場）と、長さを二階まで変化させたときの項を調べる議論が必要です。[GEO17のRiemann計量での指数形式](../../GEO/GEO17/index.md#def-geo17-index-form)は関連する先行例ですが、Lorentz計量では定値性が異なるため直接流用しません。これらの計算は本講のAvez–Seifert存在証明の入力ではなく、ここでは共役点による障害を**結果の紹介**にとどめ、その完全証明を済ませたものとして後続の論証へ援用しません。なお終点が共役点である場合は、内部共役点の場合と同じ結論を機械的に述べられません。

**測地完備性**とは、任意のアフィン測地線をそのパラメータの全実数に延長できることです。これは二点間の最大化曲線の存在とは別の性質です。

共役点がなければ大域最大、という**逆は偽**です。次の模型では計量が平坦で共役点がまったくなくても、大域的な空間の巻き付きだけで短い測地線が現れます。

<a id="prop-lorg18-cylinder"></a>

<!-- formal-statement-start -->
> **命題（共役点がなくても最大化しない測地線）**  
> 平坦円筒
>
$$
M=\mathbb R_t\times(\mathbb R/2\pi\mathbb Z)_\theta,
\qquad g=-dt^2+d\theta^2
$$
>
> で $T>2\pi$ とする。端点 $p=(0,[0])$、$q=(T,[0])$ を結ぶ時間的測地線のうち、一周するものは最大化しない。$M$ は大域双曲的で測地完備、かつ共役点を持たない。
<!-- formal-statement-end -->

### 証明の見取り図

直進経路と一周経路の長さを比較します。因果性の大域仮定も曲率も同じでも、大域最大化には経路の巻き付きが影響します。

<!-- proof-start -->
### 証明

$\gamma_0(s)=(Ts,[0])$ と $\gamma_1(s)=(Ts,[2\pi s])$（$0\le s\le1$）はいずれも端点 $p,q$ を結びます。局所的なChristoffel記号が零なので両者はアフィン測地線です。速度について

$$
g(\dot\gamma_0,\dot\gamma_0)=-T^2,\qquad
g(\dot\gamma_1,\dot\gamma_1)=-T^2+4\pi^2<0
$$

だからどちらも未来時間的です。積分から

$$
L_g(\gamma_0)=T,\qquad
L_g(\gamma_1)=\sqrt{T^2-4\pi^2}<T.
$$

従って $\gamma_1$ は最大化しません。一方、任意の未来因果曲線の空間角 $\theta$ は被覆上に持ち上げられ、ほとんど至るところ $|\dot\theta|\le\dot t$ です。よって

$$
L_g(\alpha)=\int\sqrt{\dot t^2-\dot\theta^2}\,ds
\le\int\dot t\,ds=T.
$$

したがって $\gamma_0$ は最大化し、実際 $d_g(p,q)=T$ です。

各因果ダイヤモンドは時間座標が二端点の間にあり、空間方向はコンパクトな $S^1$ です。因果関係の閉性を被覆の光錐条件で確かめると、ダイヤモンドは閉集合として閉帯 $[t_p,t_q]\times S^1$ に入るのでコンパクトです。$t$ は厳密増加の時間関数なので強因果性があり、時空は大域双曲的です。測地線は被覆上で $(t(s),\theta(s))=(t_0+as,\theta_0+bs)$ と書け、任意の実数 $s$ まで延長できます。指数写像の微分は上の定義例どおり可逆なので共役点もありません。$\square$
<!-- proof-end -->

逆方向を示す簡単な模型として $(-1,1)\times\mathbb R$ に制限した平坦計量を取ると、内部の任意の因果ダイヤモンドはMinkowskiのコンパクトダイヤモンドそのものなので大域双曲的ですが、$\gamma(s)=(s,0)$ は $s\uparrow1$ で時空から出てしまい、全実数へ延長できません。それでもAvez–Seifertにより、**この時空内の**因果的な二点を結ぶ最大化曲線は存在します。

## 7. 何が壊れると最大化が消えるか

[LORG17の原点除去の例](../LORG17/index.md#ex-lorg17-b02)では $p=(-1,0)$、$q=(1,0)$ で時間分離 $2$ を達成する直線が除外されています。$r_\varepsilon=(0,\varepsilon)$ を経由する折れ線の長さは

$$
L_\eta(p\to r_\varepsilon\to q)=2\sqrt{1-\varepsilon^2}\longrightarrow2
$$

ですが、極限は除去点を通り、もはや時空の曲線ではありません。大域双曲性のダイヤモンドのコンパクト性が失われ、存在証明第3段の共通コンパクト集合 $K$ が作れないのです。

別の失敗は時間の周期同一視です。[LORG17の周期時間模型](../LORG17/index.md#ex-lorg17-a05)では長さが周回数に比例して無限大になり、有限の最大化曲線を考える出発点さえありません。二つを混同しないでください。前者では**有限の上限が達成されない**、後者では**上限が無限大**です。

## 8. 演習と詳細解答

断らなければ未来向きは $t$ 増加方向、計量は $\eta=-dt^2+dx^2$ とします。適用する定理の仮定と、時間分離の値を確認してから「最大化」と答えてください。

<a id="ex-lorg18-a01"></a>
### LORG18-A01 直線による上限達成
- Level: A

Minkowski平面で $p=(1,-1)$、$q=(6,2)$ とする。直線 $\gamma(s)=(1+5s,-1+3s)$（$0\le s\le1$）が最大化因果曲線であることを定義の全条件で検算せよ。

<!-- solution-start -->
**詳細解答**。端点は与えた $p,q$ に一致します。速度は $(5,3)$、時間成分は正、$\eta(\dot\gamma,\dot\gamma)=-25+9=-16<0$ なので未来時間的です。長さは $L_\eta(\gamma)=\int_0^1\sqrt{16}\,ds=4$。[Minkowski時間分離公式](../LORG17/index.md#thm-lorg17-minkowski-formula)で $q-p=(5,3)$ を代入すると $d_\eta(p,q)=\sqrt{25-9}=4<\infty$。よって[最大化曲線の定義](#def-lorg18-maximizer)の有限性・因果性・等号をすべて満たします。
<!-- solution-end -->

<a id="ex-lorg18-a02"></a>
### LORG18-A02 光的曲線も最大化する
- Level: A

$p=(0,0)$、$q=(2,2)$ に対する $\gamma(s)=(2s,2s)$ を調べ、長さが零でも最大化と呼べる理由を述べよ。

<!-- solution-start -->
**詳細解答**。速度 $(2,2)$ は未来向きで自己内積 $-4+4=0$ なので未来光的です。$L_\eta(\gamma)=\int_0^1\sqrt0\,ds=0$。[Minkowski時間分離公式](../LORG17/index.md#thm-lorg17-minkowski-formula)は $d_\eta(p,q)=\sqrt{4-4}=0$ を与えます。したがって等号 $L_\eta(\gamma)=d_\eta(p,q)$ が成立し、最大化です。最大化の定義は長さが正であることを仮定しません。
<!-- solution-end -->

<a id="ex-lorg18-a03"></a>
### LORG18-A03 時間的測地線だが短い道
- Level: A

$M=\mathbb R_t\times S^1_\theta$ で $T=4\pi$ とする。一周する $\gamma_1(s)=(4\pi s,[2\pi s])$ と静止する $\gamma_0(s)=(4\pi s,[0])$ の長さを比較せよ。

<!-- solution-start -->
**詳細解答**。両者は同じ端点を結び、平坦計量 $g=-dt^2+d\theta^2$ の下でアフィン測地線です。各速度の自己内積は $-16\pi^2+4\pi^2=-12\pi^2<0$ と $-16\pi^2<0$ なので未来時間的です。

$$
L_g(\gamma_1)=\sqrt{12\pi^2}=2\pi\sqrt3,\qquad
L_g(\gamma_0)=\sqrt{16\pi^2}=4\pi.
$$

$2\pi\sqrt3<4\pi$ なので $\gamma_1$ は最大化しません。[円筒の命題](#prop-lorg18-cylinder)と一致します。
<!-- solution-end -->

<a id="ex-lorg18-a04"></a>
### LORG18-A04 指数写像の核
- Level: A

平坦Minkowski平面で $\exp_p(v)=p+v$ とする。任意の初速度 $v$ と $s_0>0$ で共役点がないことを、微分の核によって示せ。

<!-- solution-start -->
**詳細解答**。任意の方向 $w\in T_pM$ について

$$
(d\exp_p)_{s_0v}(w)
=\left.\frac{d}{d\varepsilon}\right|_{\varepsilon=0}
\exp_p(s_0v+\varepsilon w)
=\left.\frac{d}{d\varepsilon}\right|_{\varepsilon=0}
(p+s_0v+\varepsilon w)=w.
$$

従って $(d\exp_p)_{s_0v}$ は恒等写像で、その核は $\{0\}$ です。[共役点の定義](#def-lorg18-conjugate)に必要な非零核は存在しません。
<!-- solution-end -->

<a id="ex-lorg18-a05"></a>
### LORG18-A05 大域双曲性と完備性
- Level: A

時間帯 $M=(-1,1)\times\mathbb R$、$g=-dt^2+dx^2$ における $\gamma(s)=(s,0)$（$0\le s<1$）が全実数パラメータへ延長できないことと、この事実がAvez–Seifert定理に矛盾しない理由を示せ。

<!-- solution-start -->
**詳細解答**。平坦計量なので測地線方程式と初期条件は

$$
\ddot t=\ddot x=0,\qquad
(t(0),x(0))=(0,0),\qquad
(\dot t(0),\dot x(0))=(1,0).
$$

二回積分した唯一の解は $\gamma(s)=(s,0)$ です。$s\uparrow1$ で $t(s)\to1$ となりますが、この終点は時空 $M$ の外にあるため、同じ初期条件の測地線を $s=1$ まで延長できません。

一方、固定した任意の二点 $p,q\in M$ の因果ダイヤモンドでは、時刻は両端点の時刻の間にあります。両端点が内部にある以上、ダイヤモンドは時刻境界 $t=\pm1$ に触れません。Minkowski時空の因果ダイヤモンドとの一致からコンパクト性が、時刻関数の厳密増加から強因果性が確認できます。

したがってこの時空は大域双曲的です。[Avez–Seifert定理](#thm-lorg18-avez-seifert)が保証するのは**固定された二点間**の最大化曲線であり、アフィン測地線の全実数延長ではありません。
<!-- solution-end -->

<a id="ex-lorg18-b01"></a>
### LORG18-B01 部分曲線を置換する論証
- Level: B

$p\le q$ の最大化曲線 $\gamma$ 上で $x=\gamma(a)$、$y=\gamma(b)$、$a<b$ とする。もし $L_g(\gamma|_{[a,b]})<d_g(x,y)$ なら何が矛盾するか、連結した曲線の長さの式を明記せよ。

<!-- solution-start -->
**詳細解答**。[Lorentz時間分離](../LORG17/index.md#def-lorg17-time-separation)から $x\to y$ の未来因果曲線 $\beta$ を $L_g(\beta)>L_g(\gamma|_{[a,b]})$ となるように選びます。前後に元の $\gamma$ を付けると、[長さの加法性](../LORG3/index.md#prop-lorg3-length-additivity)より

$$
\begin{aligned}
L_g(\widetilde\gamma)
&=L_g(\gamma|_{[0,a]})+L_g(\beta)+L_g(\gamma|_{[b,1]})\\
&>L_g(\gamma|_{[0,a]})+L_g(\gamma|_{[a,b]})+L_g(\gamma|_{[b,1]})\\
&=L_g(\gamma)=d_g(p,q).
\end{aligned}
$$

右辺は $p\to q$ の未来因果曲線の長さの上限なので矛盾です。従って[部分曲線の最大化命題](#prop-lorg18-subarc)を再構成できました。
<!-- solution-end -->

<a id="ex-lorg18-b02"></a>
### LORG18-B02 存在証明の三つの収束
- Level: B

大域双曲的時空で $p\le q$ とする。長さが時間分離へ近づく列 $\gamma_k$ について、(i) 時間分離の有限性、(ii) 曲線の一様収束、(iii) Lorentz長さの上半連続性が、それぞれ証明のどこで必要かを数式で説明せよ。

<!-- solution-start -->
**詳細解答**。(i) [有限性の定理](../LORG17/index.md#thm-lorg17-gh-continuity)で $D=d_g(p,q)<\infty$ が定まり、$D-1/k<L_g(\gamma_k)\le D$ を満たす列を作れます。(ii) [コンパクトダイヤモンド内の因果曲線の抽出](../LORG16/index.md#prop-lorg16-curves-compact)から補助弧長を $B$ で抑え、再パラメータ化後の評価

$$
d_h(\gamma_k(s),\gamma_k(t))\le B|s-t|
$$

によって部分列の一様収束 $\gamma_k\to\gamma$ と端点保存を得ます。(iii) [LORG17の上半連続性](../LORG17/index.md#thm-lorg17-length-usc)により

$$
D=\lim_kL_g(\gamma_k)\le L_g(\gamma)\le d_g(p,q)=D.
$$

従って等号となり、$\gamma$ は最大化します。一様収束だけから長さの極限**等号**は言えない点が重要です。
<!-- solution-end -->

<a id="ex-lorg18-b03"></a>
### LORG18-B03 最大曲線が消える点除去時空
- Level: B

$M_*=\mathbb R^{1,1}\setminus\{(0,0)\}$、$p=(-1,0)$、$q=(1,0)$ とする。時間分離は有限で $2$ だが最大化曲線は存在しないことを説明し、Avez–Seifertの証明で使えなくなる条件を指摘せよ。

<!-- solution-start -->
**詳細解答**。$r_\varepsilon=(0,\varepsilon)$（$0<\varepsilon<1$）を通る未来時間的折れ線の長さは

$$
2\sqrt{1-\varepsilon^2}\to2.
$$

一方、[Minkowski時空における端点とLorentz長さ](../LORG3/index.md#thm-lorg3-minkowski-length-bound)から任意の因果曲線の長さは2以下なので $d_{M_*}(p,q)=2$。等号には $t$ をパラメータとして $\int_{-1}^{1}\sqrt{1-(dx/dt)^2}\,dt=2$ が必要です。被積分関数は1以下であり、等号なら $dx/dt=0$ がほとんど至るところ、ゆえに $x(t)\equiv0$。この直線は除去点を通るため許されません。極限曲線を含むコンパクトな因果ダイヤモンドがなく、[曲線抽出](../LORG16/index.md#prop-lorg16-curves-compact)を使えません。
<!-- solution-end -->

<a id="ex-lorg18-b04"></a>
### LORG18-B04 測地線・最大性・共役点
- Level: B

平坦円筒で $T>2\pi$ の一周時間的測地線について、(i) 測地線、(ii) 共役点の有無、(iii) 大域最大性、(iv) 測地完備性をそれぞれ別に判定せよ。

<!-- solution-start -->
**詳細解答**。(i) 局所Christoffel記号が零で、持ち上げが $(Ts,2\pi s)$ という一次式なので測地線です。(ii) $\exp_p(v)=(p_t+v_t,[p_\theta+v_\theta])$ の微分は恒等なので、核は零で共役点はありません。(iii) 長さは $\sqrt{T^2-4\pi^2}$ であり、静止曲線の長さ $T$ より小さいので最大化しません。(iv) 任意の初速度の解が $(t_0+as,[\theta_0+bs])$ と全実数 $s$ で定義されるため、時空は測地完備です。(ii) と (iv) がともに真でも (iii) は偽になります。
<!-- solution-end -->

<a id="ex-lorg18-c01"></a>
### LORG18-C01 コンパクト性から最大化と規則性まで
- Level: C

大域双曲的な滑らかな時空で $p\ll q$ とする。次の三点を示せ。

1. 上限を実現する曲線の存在を、必要な定理と主要中間不等式を明記して証明する。
2. その部分曲線も最大化することを示す。
3. 曲線が時間的測地線になる理由と、測地完備性が必要でない理由を述べる。

<!-- solution-start -->
**詳細解答**。

(1) [時間分離の有限性](../LORG17/index.md#thm-lorg17-gh-continuity)から $D=d_g(p,q)$ は正の有限値です。上限に近づく曲線列を

$$
D-\frac1k<L_g(\gamma_k)\le D
$$

となるように選びます。

[コンパクトダイヤモンド内の因果曲線の抽出](../LORG16/index.md#prop-lorg16-curves-compact)で、各曲線の像を $K(p,q)$ に収めて補助弧長の共通上界 $B$ を確保します。$[0,1]$ へ定数速で再表示すると

$$
d_h(\gamma_k(s),\gamma_k(t))\le B|s-t|.
$$

この共通評価と[限界曲線補題](../LORG14/index.md#thm-lorg14-limit-curve)から、未来因果的な $\gamma:p\to q$ へ一様収束する部分列を得ます。そこで[Lorentz長さの上半連続性](../LORG17/index.md#thm-lorg17-length-usc)を適用すると、

$$
D=\lim_kL_g(\gamma_k)\le L_g(\gamma)\le d_g(p,q)=D
$$

と挟むので $\gamma$ は最大化です。

(2) 部分曲線 $\gamma|_{[a,b]}$ より長い未来因果接続 $\beta$ が存在すると、前後を残して $\beta$ に差し替えた全曲線は $L_g(\widetilde\gamma)>L_g(\gamma)=D$ になり矛盾です。[部分曲線命題](#prop-lorg18-subarc)が成立します。

(3) 各小部分を因果的に凸な凸正規近傍へ入れ、[局所測地線の規則性](#prop-lorg18-local-geodesic)を適用します。$p\ll q$ から $D>0$ なので、光的測地線ではなく時間的測地線です。証明で必要なのは有限区間上の曲線抽出と局所測地線への一致であり、アフィンパラメータを全実数へ延長する仮定は一度も使っていません。実際 $(-1,1)\times\mathbb R$ は大域双曲的でも測地不完備です。
<!-- solution-end -->

## 9. この結果でできるようになったこと

[LORG17の時間分離](../LORG17/index.md#def-lorg17-time-separation)は「長さの上限」という数だけを与えました。[Avez–Seifert定理](#thm-lorg18-avez-seifert)によって、大域双曲的時空ではその数を実現する因果曲線が実際に存在すると分かりました。[部分曲線の最大性](#prop-lorg18-subarc)を介して局所測地線との接続も得られます。

共役点の有無、測地線の全実数への延長可能性、二点間の大域最大化は異なる問いです。次のLORG19では、曲線の存在から一歩進んで、すべての未来因果曲線に沿って増加するCauchy時間関数の存在を扱います。
