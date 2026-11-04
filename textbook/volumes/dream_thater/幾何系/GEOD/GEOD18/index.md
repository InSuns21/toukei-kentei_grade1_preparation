# GEOD18 Krüger 逆級数・縮尺・子午線収差

[GEOD17の順変換](../GEOD17/index.md#def-geod17-forward-map)は、測地緯度・経度を平面の東座標 $E$ と北座標 $N_p$ へ写しました。現場では逆に、地図の座標値から測地緯度・経度を復元したり、地図上の北が真北から何度傾き、1 m の地表距離が何 m に伸縮するかを求めたりします。

ここで、逆変換に単に順変換の補正項の符号を変えて代入しても正しくありません。補正した値を再び正弦関数へ入れるため、二次以降に余分な項が出るからです。縮尺・方位の計算にも座標値そのものではなく**微分**が必要になります。

本章の目標は次のとおりです。

1. 順級数を合成して逆係数 $\beta_j$ を二次まで導出し、四次の逆級数を使う。
2. 平面座標から球面横メルカトルを戻し、等角緯度 $\chi$ から測地緯度 $\phi$ を一意に復元する。
3. 有限次数の往復誤差と、原点・偽座標・軸の順序を検算する。
4. 格子北と真北の角度差 $\gamma$、微小距離の点縮尺 $k$ を導関数から求める。
5. 打切り・丸め・定義域・独立検算を分けて評価する。

長半径 $a\ge b>0$、扁平率 $f=(a-b)/a$、第三扁平率 $n=(a-b)/(a+b)$、第一離心率 $e=\sqrt{1-b^2/a^2}\in[0,1)$ とします。測地緯度 $-\pi/2<\phi<\pi/2$、中央経度からの差 $\delta=\lambda-\lambda_0$ はラジアンです。極を除き、まず $\cos\chi\cos\delta>0$ の中央子午線を含む局所枝で考えます。$E$ は東、$N_p$ は北を正とし、日本の平面直角座標系の $X,Y$ という表示順はここでは採用しません。

---

## 1. 順級数を逆にするには

### 1.1 入力するのは地図座標から戻した無次元量

[子午線平均半径](../GEOD17/index.md#def-geod17-meridian-a)を $A>0$、中央縮尺を $k_0>0$ とします。$\xi_0$ は原点緯度 $\phi_0$ の中央子午線上で順級数を評価した値です。[順級数の複素座標](../GEOD17/index.md#def-geod17-kruger-series)は、北を実部、東を虚部とし、

$$
\begin{aligned}
\zeta'&=\xi'+i\eta',\\
\zeta&=\xi+i\eta
=\zeta'+\sum_{j\ge1}\alpha_j\sin(2j\zeta'),\\
E&=E_0+k_0A\eta,\qquad
N_p=N_0+k_0A(\xi-\xi_0)
\end{aligned}
$$

でした。偽座標 $(E_0,N_0)$ は長さの単位を持ちます。逆向きに進むときは、最初にこの平行移動と縮尺を外します。

$$
\boxed{\xi=\xi_0+\frac{N_p-N_0}{k_0A},\qquad
\eta=\frac{E-E_0}{k_0A}.}
$$

特に、北座標に原点の $\xi_0$ を足し忘れると、原点緯度 $\phi_0\ne0$ の系で復元位置がずれます。有限次数 $p$ では $A_p,\alpha_j^{[p]},\xi_0^{[p]}$ を**すべて同じ次数**で使います。

### 1.2 逆補正を別の正弦級数で表す

ここでいう逆級数とは、複素補正 $\zeta'\mapsto\zeta$ の局所逆関数を、補正後の変数 $\zeta$ の正弦項で表したものです。$\alpha_j$ と $\beta_j$ は別の係数です。符号と周波数を定義に含めます。

<a id="def-geod18-inverse-series"></a>
<!-- formal-statement-start -->
> **定義（Krüger 逆級数と有限次数近似）**
> $a\ge b>0$ の回転楕円体について、[Krüger 順級数](../GEOD17/index.md#def-geod17-kruger-series)が局所的に正則かつ導関数非零である領域で、その逆関数を

$$
\boxed{\zeta'=\zeta-\sum_{j\ge1}\beta_j(n)\sin(2j\zeta)}
$$

> と表す。$p$ 次近似では $j\le p$ を残し、各 $\beta_j$ を $n^p$ までで打ち切る。$\beta_j$ は実係数で、$\beta_j=O(n^j)$、$\beta_j(0)=0$ とする。この式が使えるのは選んだ逆関数の局所枝と、そこで級数が収束する範囲である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod18-inverse-series -->
**定義の確認**（球面）。 $a=b$ なら $n=0$、$\alpha_j=\beta_j=0$ です。順変換は $\zeta=\zeta'$、逆変換は $\zeta'=\zeta$ になり、互いに恒等写像です。正弦補正がなくても局所逆関数の条件を満たします。
<!-- definition-example-end -->

二次でどの係数が必要か、実際に合成しましょう。以後この節の $O(n^r)$ は、$\zeta$ が中央子午線近くの固定されたコンパクト領域にあり、各正弦項が有界なもとでの次数を表します。

<a id="thm-geod18-inverse-coefficients"></a>
<!-- formal-statement-start -->
> **定理（Krüger 逆級数の二次係数）**
> $n$ が十分小さく、順・逆の複素正弦級数が同じ局所枝で正則関数として合成できるとする。[GEOD17の二次順係数](../GEOD17/index.md#thm-geod17-low-order-coefficients)を用いると、逆級数の低次係数は

$$
\boxed{\beta_1=\frac12n-\frac23n^2+O(n^3),\qquad
\beta_2=\frac1{48}n^2+O(n^3).}
$$

> 特に $\beta_2$ は順係数 $\alpha_2=13n^2/48+O(n^3)$ とは異なる。
<!-- formal-statement-end -->

**証明の見取り図。** 順変換を $\zeta=\zeta'+a_1\sin2\zeta'+a_2\sin4\zeta'$、逆変換を $\zeta'=\zeta-b_1\sin2\zeta-b_2\sin4\zeta$ と仮置きして合成します。$\sin(2\zeta)$ の引数にある一次補正を Taylor 展開すると、二次の $\sin4\zeta'$ が新たに現れます。

<!-- proof-start -->
### 証明

$a_1=\alpha_1= n/2-2n^2/3+O(n^3)$、$a_2=\alpha_2=13n^2/48+O(n^3)$ とします。$\zeta=\zeta'+\Delta$、$\Delta=a_1\sin2\zeta'+a_2\sin4\zeta'+O(n^3)$ なので、Taylor 展開から

$$
\begin{aligned}
\sin2\zeta
&=\sin(2\zeta'+2\Delta)\\
&=\sin2\zeta'+2\Delta\cos2\zeta'+O(n^2)\\
&=\sin2\zeta'+2a_1\sin2\zeta'\cos2\zeta'+O(n^2)\\
&=\sin2\zeta'+a_1\sin4\zeta'+O(n^2).
\end{aligned}
$$

$b_1=O(n)$ を掛けるので、この式の残り $O(n^2)$ は合成では $O(n^3)$ です。同様に $b_2=O(n^2)$ が掛かる $\sin4\zeta=\sin4\zeta'+O(n)$ は零次だけで十分です。これらを逆変換へ代入すると

$$
\begin{aligned}
\zeta'_{\mathrm{back}}
&=\zeta-b_1\sin2\zeta-b_2\sin4\zeta+O(n^3)\\
&=\zeta'+(a_1-b_1)\sin2\zeta'
 +(a_2-b_2-a_1b_1)\sin4\zeta'+O(n^3).
\end{aligned}
$$

二つの独立な正弦係数を零にするには $b_1=a_1+O(n^3)$、$b_2=a_2-a_1b_1+O(n^3)$ が必要です。$a_1b_1=n^2/4+O(n^3)$ を代入して

$$
b_2=\left(\frac{13}{48}-\frac14\right)n^2+O(n^3)
=\frac1{48}n^2+O(n^3)
$$

を得ます。従って $b_j=\beta_j$ は主張の係数です。
<!-- proof-end -->

四次までの逆係数は、同じ係数比較を四次へ延長した次の式で計算します。[PROJ の楕円体横メルカトルの逆変換係数表](https://proj.org/en/stable/operations/projections/tmerc.html#ellipsoidal-form)とも符号を照合できます。PROJ は負の係数行列で $\zeta'=\zeta+\cdots$ と書き、本章は正の $\beta_j$ を外側の負号とともに使います。

$$
\begin{aligned}
\beta_1^{[4]}&=\frac12n-\frac23n^2+\frac{37}{96}n^3-\frac1{360}n^4,\\
\beta_2^{[4]}&=\frac1{48}n^2+\frac1{15}n^3-\frac{437}{1440}n^4,\\
\beta_3^{[4]}&=\frac{17}{480}n^3-\frac{37}{840}n^4,\\
\beta_4^{[4]}&=\frac{4397}{161280}n^4.
\end{aligned}
$$

実数計算では $\zeta=\xi+i\eta$ として

$$
\boxed{\begin{aligned}
\xi'&=\xi-\sum_{j=1}^{p}\beta_j^{[p]}
\sin(2j\xi)\cosh(2j\eta),\\
\eta'&=\eta-\sum_{j=1}^{p}\beta_j^{[p]}
\cos(2j\xi)\sinh(2j\eta).
\end{aligned}}
$$

この実部・虚部の分離は、[GEOD17の複素正弦公式](../GEOD17/index.md#def-geod17-kruger-series)に従います。$\xi$ は無次元の北向き、$\eta$ は無次元の東向きです。

### 1.3 なぜ有限次数の往復は完全には戻らないか

有限の計算手順同士が厳密な逆関数なら、すべての入力で合成が恒等写像になるはずです。一番短い近似で反例を作ると、次数の役割がはっきりします。

<a id="prop-geod18-roundtrip"></a>
<!-- formal-statement-start -->
> **命題（有限級数往復の非恒等性）**
> $n\ne0$ を小さく取り、一次係数 $t=n/2$ だけを採用した有限順変換 $w=z+t\sin2z$ と有限逆変換 $\widehat z=w-t\sin2w$ を考える。固定された有限な複素 $z$ の近傍で

$$
\boxed{\widehat z-z=-\frac{n^2}{4}\sin4z+O(n^3).}
$$

> よって一般には完全な恒等写像でない。二次・四次のように係数を整合して上げれば、固定された安全な領域で相殺する次数は増えるが、有限次数というだけで厳密な逆を保証しない。
<!-- formal-statement-end -->

**証明の見取り図。** 逆変換の正弦関数の中に、順変換で生じた $t\sin2z$ を入れて再展開します。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
\widehat z-z
&=t\sin2z-t\sin(2z+2t\sin2z)\\
&=t\sin2z-t\{\sin2z+2t\sin2z\cos2z+O(t^2)\}\\
&=-2t^2\sin2z\cos2z+O(t^3)\\
&=-t^2\sin4z+O(t^3)
=-\frac{n^2}{4}\sin4z+O(n^3).
\end{aligned}
$$

例えば $z=\pi/8$ では $\sin4z=1$ なので、十分小さい非零の $n$ で主項は消えません。$z=0$ のような対称点で往復が一致しても、一般点の誤差ゼロを意味しません。
<!-- proof-end -->

---

## 2. 東北座標から緯度・経度まで戻す

### 2.1 二つの「逆」をつなぐ

逆の処理は、平面座標を無次元の $\zeta$ に戻す、Krüger 補正を外して $\zeta'$ を得る、球面横メルカトルを解く、等角緯度から測地緯度を復元する、という順序です。最後の段階には楕円体の非線形な関係が残ります。

<a id="def-geod18-inverse-map"></a>
<!-- formal-statement-start -->
> **定義（Krüger 逆変換の復元手順）**
> $a\ge b>0$、$k_0>0$、中央経度 $\lambda_0$、原点緯度 $\phi_0$、偽座標 $(E_0,N_0)$ を固定する。順変換と同じ $p$ 次の $A_p,\alpha_j^{[p]}$ から

$$
\xi_0^{[p]}=\chi(\phi_0)+\sum_{j=1}^p
\alpha_j^{[p]}\sin(2j\chi(\phi_0))
$$

> を求める。次に

$$
\zeta=\xi_0^{[p]}+\frac{N_p-N_0}{k_0A_p}
+i\frac{E-E_0}{k_0A_p}
$$

> を作り、[逆級数](#def-geod18-inverse-series)で $\zeta'=\xi'+i\eta'$ に戻す。続いてこの章の[球面逆式](#thm-geod18-spherical-inverse)で $(\chi,\delta)$ を得て、[等角緯度の関係](../GEOD14/index.md#def-geod14-conformal-latitude)を解き $\phi$ を復元し、$\lambda=\lambda_0+\delta$ とする。各段階では同一の局所枝を選び、角度単位・残差・有限値を確認する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod18-inverse-map -->
**定義の確認**（球面と原点）。 球面なら $A=a$、$\alpha_j=\beta_j=0$、$\xi_0=\phi_0$、$\chi=\phi$ です。原点の入力 $(E,N_p)=(E_0,N_0)$ では $\zeta=\phi_0$、$\zeta'=\phi_0$、後述の球面逆式から $(\chi,\delta)=(\phi_0,0)$ を得るので、緯度・経度は $(\phi_0,\lambda_0)$ に戻ります。どの量を足し戻すかを含め、全条件を確認できます。
<!-- definition-example-end -->

### 2.2 球面の逆式と楕円体緯度の方程式

球面横メルカトルの $\xi',\eta'$ は[GEOD15の定義](../GEOD15/index.md#def-geod15-transverse)を使用します。$\operatorname{atan2}$ は点の象限を保つ二引数逆正接です。等角緯度の逆では、まず実数の残差方程式を定義してから反復します。
以下、$r'(\phi)$ は $\phi$ に関する通常の導関数 $dr/d\phi$ を表します。

<a id="thm-geod18-spherical-inverse"></a>
<!-- formal-statement-start -->
> **定理（球面横メルカトルの逆式と等角緯度復元）**
> $-\pi/2<\chi<\pi/2$、$\cos\chi\cos\delta>0$ の枝で、[球面横メルカトル](../GEOD15/index.md#def-geod15-transverse)の $\zeta'=\xi'+i\eta'$ が与えられたとする。この枝で

$$
\boxed{\begin{aligned}
\chi&=\arcsin\left(\frac{\sin\xi'}{\cosh\eta'}\right),\\
\delta&=\operatorname{atan2}(\sinh\eta',\cos\xi').
\end{aligned}}
$$

> さらに $e\in[0,1)$ なら、$\chi$ に対応する測地緯度 $\phi\in(-\pi/2,\pi/2)$ は次の実方程式のただ一つの解である。

$$
\boxed{r(\phi)=\operatorname{asinh}(\tan\phi)
-e\operatorname{atanh}(e\sin\phi)
-\operatorname{asinh}(\tan\chi)=0.}
$$

> $\phi$ の反復計算には $r'(\phi)>0$ を利用できる。
<!-- formal-statement-end -->

**証明の見取り図。** 球面側では $\sin\xi'$ と $\sinh\eta'$ を元の $\chi,\delta$ へ代入して消去します。楕円体側では $r$ が厳密に増加し、両極へ向かって $-\infty,+\infty$ となるため、解は存在して一意です。

<!-- proof-start -->
### 証明

$u=\sin\chi$、$v=\cos\chi\cos\delta>0$、$w=\cos\chi\sin\delta$ と置きます。$u^2+v^2=1-w^2=:D>0$ なので、[球面横メルカトル](../GEOD15/index.md#def-geod15-transverse)から

$$
\sin\xi'=\frac{u}{\sqrt D},\quad
\cos\xi'=\frac{v}{\sqrt D},\quad
\tanh\eta'=w,\quad
\cosh\eta'=\frac1{\sqrt D},\quad
\sinh\eta'=\frac{w}{\sqrt D}.
$$

従って $\sin\xi'/\cosh\eta'=u=\sin\chi$ です。$\chi\in(-\pi/2,\pi/2)$ だから逆正弦で元の $\chi$ が戻ります。また

$$
\operatorname{atan2}(\sinh\eta',\cos\xi')
=\operatorname{atan2}(w,v)
=\operatorname{atan2}(\cos\chi\sin\delta,\cos\chi\cos\delta)
=\delta
$$

が選んだ枝で成り立ちます。

[GEOD14の等角緯度の定義](../GEOD14/index.md#def-geod14-conformal-latitude)から、$\operatorname{asinh}(\tan\chi)=\operatorname{asinh}(\tan\phi)-e\operatorname{atanh}(e\sin\phi)$ なので残差 $r(\phi)$ が得られます。$-\pi/2<\phi<\pi/2$ では $\cos\phi>0$、$1-e^2\sin^2\phi>0$ で、

$$
\begin{aligned}
r'(\phi)
&=\frac1{\cos\phi}
-\frac{e^2\cos\phi}{1-e^2\sin^2\phi}\\
&=\frac{1-e^2(\sin^2\phi+\cos^2\phi)}
{\cos\phi(1-e^2\sin^2\phi)}\\
&=\frac{1-e^2}{\cos\phi(1-e^2\sin^2\phi)}>0.
\end{aligned}
$$

第2項 $e\operatorname{atanh}(e\sin\phi)$ は $e<1$ で有限のまま、第一項は $\phi\to\pm\pi/2$ で $\pm\infty$ となります。従って中間値の定理から根が存在し、厳密増加性から一意です。
<!-- proof-end -->

具体的な反復は $\phi^{(0)}=\chi$ を初期値として

$$
\boxed{\phi^{(m+1)}
=\phi^{(m)}-\frac{r(\phi^{(m)})}{r'(\phi^{(m)})}}
$$

という Newton 法を使えます。これは[GEOD5の楕円体逆変換](../GEOD5/index.md#thm-geod5-exterior-inverse)と同じく、**更新幅だけでなく残差と再投影**も確かめる数値手順です。反復が区間外へ飛び出す、残差が減らない、非有限値になる場合は、$r$ の単調性を利用して $(-\pi/2,\pi/2)$ 内の符号の異なる二点を保った二分法へ切り替えます。両極そのものは経度座標が特異なので、この局所逆変換の対象ではありません。

---

## 3. 地図上の北はどれだけ傾き、距離はどれだけ伸びるか

### 3.1 真北と格子北の違い

同じ点でも、楕円体上の子午線に沿う真北と、投影平面で北座標 $N_p$ が増える格子北は一般には一致しません。小さい北向き地表変位 $M(\phi)d\phi$ が平面で $(dE,dN_p)$ に写る角度を調べれば、その差が分かります。

本章では**真北から格子北へ時計回り（東回り）に測った角度を正**とします。北半球で中央子午線より東の近傍では、真北を表す地図上の矢印が格子北より西へ傾くので、収差は正です。この符号を最初に固定しておかないと、方位角の補正を逆にしてしまいます。

<a id="def-geod18-grid-convergence"></a>
<!-- formal-statement-start -->
> **定義（子午線収差）**
> 東・北向きに軸を取った向きを保つ滑らかな地図投影 $(\phi,\lambda)\mapsto(E,N_p)$ を、非極点で考える。測地緯度が増す真北方向の微小変位の平面像が $(E_\phi,N_{p,\phi})\ne(0,0)$ のとき、**子午線収差** $\gamma$ を、真北から格子北へ時計回りを正として

$$
\boxed{\gamma=-\operatorname{atan2}(E_\phi,N_{p,\phi})}
$$

> と定義する。ただし右辺は指定した局所枝で連続に選ぶ角度であり、$E_\phi=\partial E/\partial\phi$、$N_{p,\phi}=\partial N_p/\partial\phi$ は経度を固定した偏微分である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod18-grid-convergence -->
**定義の確認**（中央子午線）。 [GEOD17の中央子午線の対称性](../GEOD17/index.md#prop-geod17-axis-symmetry)により、$\delta=0$ では任意の $\phi$ で $E=E_0$、よって $E_\phi=0$ です。中央で北座標は北へ増加する局所枝を取るため $N_{p,\phi}>0$ であり、$\gamma=-\operatorname{atan2}(0,N_{p,\phi})=0$ です。実際に定義が要求する非零性と方向を確認しました。
<!-- definition-example-end -->

真北基準の方位角を $\theta_{\mathrm{true}}$、格子北基準の方位角を $\theta_{\mathrm{grid}}$ として、いずれも北から時計回りの角度で表せば、この符号規約では局所的に

$$
\boxed{\theta_{\mathrm{grid}}=\theta_{\mathrm{true}}-\gamma\pmod{2\pi}.}
$$

方位角の変換には経路・測地線の曲がりも関わるため、これは**同じ点における方向**の対応です。離れた二点の方位を単に一つの $\gamma$ で補正する公式ではありません。

### 3.2 点縮尺は「同じ点の微小長さ」の比

[GEOD13の投影の局所縮尺](../GEOD13/index.md#def-geod13-scales)では、平面の微小長さと楕円体の微小長さを比較しました。今回は等角投影なので、ある非零接ベクトルで計算した比がすべての方向に共通です。

<a id="def-geod18-point-scale"></a>
<!-- formal-statement-start -->
> **定義（投影点縮尺）**
> 楕円体の第一基本形式

$$
ds^2=M(\phi)^2d\phi^2+N(\phi)^2\cos^2\phi\,d\lambda^2
$$

> を備えた非極点の近傍で、向きを保つ局所等角投影 $F=(E,N_p)$ の微分 $dF$ が任意の接ベクトル $v\ne0$ を同じ正の比で伸縮するとき、その比

$$
\boxed{k=\frac{\sqrt{dE(v)^2+dN_p(v)^2}}{\sqrt{ds^2(v,v)}}>0}
$$

> を**投影点縮尺**と呼ぶ。微小な楕円体距離 $ds$ に対応する平面長さは $k\,ds$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod18-point-scale -->
**定義の確認**（球面・中央子午線）。 $a=b=R$、$\delta=0$ では[球面横メルカトル](../GEOD15/index.md#thm-geod15-transverse-distortion)は $dE=k_0R\cos\phi\,d\delta$、$dN_p=k_0R\,d\phi$ です。球面の長さ $ds^2=R^2d\phi^2+R^2\cos^2\phi\,d\delta^2$ と比較すると、どの非零変位でも分子は $k_0$ 倍となります。$k=k_0>0$ で、方向によらない条件も検証できます。
<!-- definition-example-end -->

### 3.3 複素導関数が収差と縮尺を同時に決める

$\zeta'=\xi'+i\eta'$、$\zeta=\zeta'+\sum_j\alpha_j\sin(2j\zeta')$ でした。この複素補正写像を $F(\zeta')=\zeta$ と書きます。正則級数が項別微分できる領域で、$\zeta'$ に関する複素導関数は

$$
F'(\zeta')=1+\sum_{j\ge1}2j\alpha_j\cos(2j\zeta')
$$

となります。数値計算では $p$ 次の有限写像 $F_p(\zeta')=\zeta'+\sum_{j=1}^p\alpha_j^{[p]}\sin(2j\zeta')$ を先に固定し、$F_p'$ の実部を $P$、虚部の負号を取った量を $Q$ とします。ここでのプライムは **$\zeta'$ での複素微分**であり、測地緯度での偏微分 $E_\phi,N_{p,\phi}$ とは異なります。

$$
\boxed{\begin{aligned}
P&=1+\sum_{j=1}^{p}2j\alpha_j^{[p]}
\cos(2j\xi')\cosh(2j\eta'),\\
Q&=\sum_{j=1}^{p}2j\alpha_j^{[p]}
\sin(2j\xi')\sinh(2j\eta'),\\
F_p'(\zeta')&=P-iQ.
\end{aligned}}
$$

この $P,Q$ は地図の座標値ではなく、補正の局所的な回転と伸縮を記述します。以下の $N(\phi)$ は[GEOD4の卯酉線曲率半径](../GEOD4/index.md#def-geod4-curvature-radii)であり、平面の北座標 $N_p$ とは異なります。等角緯度 $\chi(\phi)$ に対して、長さの次元を持つ係数

$$
h(\phi)=\frac{N(\phi)\cos\phi}{\cos\chi},\qquad
D=1-\cos^2\chi\sin^2\delta>0
$$

を使います。$h$ の意味と $d\chi/d\phi=M/h>0$ は[等角球面計量](../GEOD14/index.md#thm-geod14-conformal-sphere-metric)で確かめました。

中央子午線 $\delta=0$ では[球面横メルカトルの順式](../GEOD15/index.md#def-geod15-transverse)により $\xi'=\chi,\eta'=0$、従って $Q=0$ です。以下の $P(\chi,0)$ は $P$ を $(\xi',\eta')=(\chi,0)$ で評価した値を表します。北向きの微分は

$$
\frac{\partial N_p}{\partial\phi}
=k_0A_p\frac{M(\phi)}{h(\phi)}P(\chi,0).
$$

$k_0,A_p,M,h$ は正なので、中央子午線で真北が平面の北向きへ写る条件は **$P(\chi,0)>0$** と同値です。$F_p'\ne0$ は局所可逆性を保証しますが、この北向き条件までは保証しません。以下の収差の零基準は $P>0$ となる中央子午線上の基準点から、導関数の零を横切らずに続く局所枝で取ります。

<a id="thm-geod18-convergence-scale"></a>
<!-- formal-statement-start -->
> **定理（子午線収差と縮尺の微分公式）**
> $a\ge b>0$ の楕円体、非極点、$\cos\chi\cos\delta>0$ の局所枝を考える。$k_0>0$、次数 $p\ge1$ とし、[Krüger 順級数](../GEOD17/index.md#def-geod17-kruger-series)の $p$ 次有限写像 $F_p$ の導関数が非零の場所で、$A=A_p>0$ と $P,Q$ を上式で定義する。中央子午線上の基準点 $\chi_\ast$ では $P(\chi_\ast,0)>0$ とし、その点から導関数の零を横切らない局所枝を取る。この有限投影の子午線収差 $\gamma_p$ と点縮尺 $k_p$（次式では $\gamma,k$ と略記）は

$$
\boxed{\begin{aligned}
\gamma&=\operatorname{atan2}(\sin\chi\sin\delta,\cos\delta)
+\operatorname{atan2}(Q,P),\\
k&=\frac{k_0A}{h(\phi)\sqrt D}\sqrt{P^2+Q^2}\\
&=\frac{k_0A\cos\chi}{N(\phi)\cos\phi\sqrt D}
\sqrt{P^2+Q^2}.
\end{aligned}}
$$

> $\gamma$ の枝は基準点 $\chi_\ast$ で零に取る。ここで得る $\gamma_p,k_p$ は有限写像自体を厳密に微分した値であり、厳密な楕円体横メルカトルの収差・縮尺に完全に一致するとは限らない。正則級数と導関数が収束する領域では、無限級数の $P,Q,A$ を用いた同形の式が成立する。
<!-- formal-statement-end -->

**証明の見取り図。** 球面横メルカトルの緯度方向微分は $D^{-1}(\cos\delta-i\sin\chi\sin\delta)$ です。補正の微分 $P-iQ$ を掛けると、平面上の北向きベクトルがどれだけ回転するかが分かります。絶対値を取れば長さの比になり、楕円体計量の $h$ で割ると点縮尺です。

<!-- proof-start -->
### 証明

[球面横メルカトル](../GEOD15/index.md#def-geod15-transverse)から

$$
\xi'=\operatorname{atan2}(\sin\chi,\cos\chi\cos\delta),
\qquad\eta'=\operatorname{atanh}(\cos\chi\sin\delta).
$$

$D=\sin^2\chi+\cos^2\chi\cos^2\delta$ を用い、経度差 $\delta$ を固定して $\chi$ で微分します。$\xi'$ の $\operatorname{atan2}(y,x)$ の微分は $(x\,dy-y\,dx)/(x^2+y^2)$ なので

$$
\begin{aligned}
\frac{\partial\xi'}{\partial\chi}
&=\frac{\cos\chi\cos\delta\cos\chi
-\sin\chi(-\sin\chi\cos\delta)}{D}
=\frac{\cos\delta}{D},\\
\frac{\partial\eta'}{\partial\chi}
&=\frac{-\sin\chi\sin\delta}
{1-\cos^2\chi\sin^2\delta}
=-\frac{\sin\chi\sin\delta}{D}.
\end{aligned}
$$

従って

$$
\frac{\partial\zeta'}{\partial\chi}
=\frac{\cos\delta-i\sin\chi\sin\delta}{D},\qquad
\left|\frac{\partial\zeta'}{\partial\chi}\right|
=\frac1{\sqrt D}.
$$

最後の式は $\cos^2\delta+\sin^2\chi\sin^2\delta=D$ から従います。$\chi_\phi=M/h>0$ なので、真北へ動く平面ベクトルの向きは複素数

$$
\frac{\partial\zeta}{\partial\phi}
=(P-iQ)\frac{\cos\delta-i\sin\chi\sin\delta}{D}
\frac{M}{h}
$$

の偏角です。平面の北成分を実部、東成分を虚部としているため、[収差の定義](#def-geod18-grid-convergence)により $\gamma=-\arg(\partial\zeta/\partial\phi)$ です。各因子の偏角を加え、符号を反転すると

$$
\gamma=\operatorname{atan2}(Q,P)
+\operatorname{atan2}(\sin\chi\sin\delta,\cos\delta)
$$

となります。

長さは $|d\zeta|=|F'|\,|d\zeta'|$ なので、緯度方向の微小平面長さは $k_0A\sqrt{P^2+Q^2}\,(M/h)\,|d\phi|/\sqrt D$ です。[楕円体計量](../GEOD4/index.md#thm-geod4-ellipsoid-metric)により同じ地表方向は $M|d\phi|$ だから、その比は

$$
k=\frac{k_0A\sqrt{P^2+Q^2}}{h\sqrt D}.
$$

等角性は[GEOD16の正則補正の計量証明](../GEOD16/index.md#thm-geod16-metric-scale)を、正の定数 $a$ の代わりに $A$、正則補正を $F$ として適用できるため、他の接方向でも同じ比です。$h=N\cos\phi/\cos\chi$ を代入して第二式も出ます。
<!-- proof-end -->

**符号と極限の検算。** 球面では $\alpha_j=0$、$P=1,Q=0,A=a=h$ なので

$$
\boxed{\gamma=\operatorname{atan2}(\sin\phi\sin\delta,\cos\delta),
\qquad k=\frac{k_0}{\sqrt{1-\cos^2\phi\sin^2\delta}}.}
$$

中央子午線 $\delta=0$ なら $Q=0,D=1$、収差 $\gamma=0$ です。ただし有限次数での $k$ は $k_0A_p P/h$ となり、一般には $k_0$ に高次の微小残差を持ちます。厳密写像なら[GEOD16の中央縮尺定理](../GEOD16/index.md#thm-geod16-metric-scale)によりちょうど $k_0$ です。

ここでの $\gamma=0$ と $k=k_0A_pP/h>0$ は、上で指定した **$P>0$ の中央枝**での主張です。この条件が必要なことは極端に扁平な楕円体の有限近似で確かめられます。$n=0.99$、$p=2$、$\chi=\pi/4$、$\delta=0$ とすると

$$
P=1+2\alpha_1^{[2]}\cos\frac\pi2
+4\alpha_2^{[2]}\cos\pi
=1-\frac{13}{12}(0.99)^2=-0.061775.
$$

この点では $F_p'=P\ne0$ で局所可逆ですが、$N_{p,\phi}<0$ となり、真北は平面の南へ写ります。したがって[収差の定義](#def-geod18-grid-convergence)では $\gamma=\pi$（$2\pi$ を法として同値な角度）であって零ではありません。これは実務的な楕円体の推奨条件ではなく、**導関数非零と北向き保持が別条件である**ことを示す反例です。

---

## 4. 数値評価・実用上の制約と検算

### 4.1 WGS84 の中央から東3度の例

[GEOD17の四次順変換例](../GEOD17/index.md#ex-geod17-c01)の入力 $a=6378137\ \mathrm m$、$f=1/298.257223563$、$\phi=35^\circ$、$\delta=3^\circ$、$\phi_0=0$、$k_0=0.9996$、$(E_0,N_0)=(500000,0)\ \mathrm m$ を使います。結果の $(E,N_p)$ は $(773798.096340,\ 3877156.691645)\ \mathrm m$ でした。すべての角度をラジアンで評価します。

| 中間量 | 四次式での値 |
| --- | ---: |
| $n$ | $0.00167922038638$ |
| $A_4$ (m) | $6367449.145823$ |
| $\xi,\eta$ | $0.609146313710,\ 0.043016858577$ |
| 逆級数後 $\xi',\eta'$ | $0.608357142368,\ 0.042991952507$ |
| 逆球面後 $\chi,\delta$ (rad) | $0.607714130286,\ 0.052359877560$ |
| 復元した $\phi,\delta$ (deg) | $35.000000000,\ 3.000000000$ |
| $P,Q$ | $1.000580729083,\ 0.000135633734$ |
| $\gamma$ (deg)、$k$ | $1.7217994253,\ 1.0005240245$ |

この例では $\gamma>0$ なので、格子北は真北から東へ約 $1.72^\circ$ 回った向きです。北向きの真方位 $0^\circ$ は格子方位で約 $-1.72^\circ$ と表されます。地表上の十分短い $100\ \mathrm m$ はこの点の接線近似で約 $100.0524\ \mathrm m$ の平面長さになります。ただし**点縮尺だけで離れた二地点の測地線長を一様に換算することはできません**。

数表の逆変換・収差・縮尺は、本章の式を同一実装で評価した内部検算です。別に PROJ 9.8.1 の横メルカトル実装（pyproj 3.8.0 経由）を使い、同じ WGS84・中央経度・縮尺・偽座標を指定しました。得られた東北座標、収差、子午線方向の点縮尺は

$$
\begin{aligned}
(E,N_p)_{\mathrm{PROJ}}&=(773798.096339603,\ 3877156.691644674)\ \mathrm m,\\
\gamma_{\mathrm{PROJ}}&=1.721799425505^\circ,\\
k_{\mathrm{PROJ}}&=1.000524024542.
\end{aligned}
$$

本章の四次式との差は、座標で $0.1\ \mu\mathrm m$ 未満、収差で $2\times10^{-10}$ 度未満、縮尺で $3\times10^{-11}$ 未満です。これは**中央から東3度の一点での別実装との照合**であり、全球の精度保証ではありません。

さらに中央子午線では[GEOD11の子午線弧長積分](../GEOD11/index.md#def-geod11-meridian-arc)と、$k_0=1$ の北距離を比較できます。[PROJ の投影仕様](https://proj.org/en/stable/operations/projections/tmerc.html)や [GeographicLib の横メルカトル実装](https://geographiclib.sourceforge.io/tm.html)を使う別の点でも、楕円体・原点・軸順序・座標帯をそろえて検算します。往復誤差が小さいことだけで絶対精度を保証しません。

### 4.2 小さな $n$ と大きな経度差は別問題

$p$ 次係数の $O(n^{p+1})$ という記号は、中央近くの固定された安全な領域で意味を持ちます。たとえば

$$
\sin(2j(\xi+i\eta))
=\sin(2j\xi)\cosh(2j\eta)
+i\cos(2j\xi)\sinh(2j\eta)
$$

の双曲線関数は $|\eta|$ とともに急速に増えるため、$|n|$ が小さいことだけでは全球の誤差上界になりません。特に赤道で $\delta\to\pi/2$ では $\eta'=\operatorname{atanh}(\sin\delta)\to+\infty$ です。ここでは元の球面横メルカトル座標自体が発散し、$p$ を上げるだけでは救えません。

実装では、少なくとも次を別々に判定します。

1. **入力と枝**：角度の単位、$a>0$、$0\le e<1$、$k_0>0$、$D>0$、非極点、中央子午線を含む対象領域を確認する。逆では $\cos\xi'>0$ になる枝を明示し、他の枝へ無断で外挿しない。
2. **打切り**：同一の入力で四次と六次を比較する。ただし共通の係数・実装バグは検出できない。
3. **丸めと安定性**：大きな $\cosh(2j\eta)$・$\sinh(2j\eta)$、$N_p-N_0$ の桁落ち、Newton 法の残差、極付近の $\tan\phi$ を監視する。非有限値なら停止する。
4. **独立検算**：別実装、中央子午線の弧長積分、東西反転の対称性、球面極限、順逆往復を組み合わせる。datum と epoch の相違を級数誤差に混ぜない。

係数多項式は例えば

$$
\beta_1^{[4]}
=n\left[\frac12+n\left(-\frac23
+n\left(\frac{37}{96}-\frac{n}{360}\right)\right)\right]
$$

のように入れ子に評価できます。これは **Horner 法**で、$n^j$ の独立計算を減らします。正弦和そのものには **Clenshaw 型の漸化式**も使えます。$z$ を複素引数、$c_j$ を $\alpha_j$ または $-\beta_j$ とし、$u=\cos(2z)$、$b_{p+1}=b_{p+2}=0$ から

$$
b_j=c_j+2u\,b_{j+1}-b_{j+2}\quad(j=p,\ldots,1),
\qquad
\sum_{j=1}^p c_j\sin(2jz)=b_1\sin(2z)
$$

とします。これは三角関数の恒等式

$$
\sin(mt)-2\cos t\sin((m-1)t)+\sin((m-2)t)=0
\qquad(m\ge2)
$$

から導けます。実際、$t=2z$ とし、漸化式を逆にして $c_j=b_j-2u b_{j+1}+b_{j+2}$ を和へ代入すると、$b_2,\ldots,b_p$ の係数は上の恒等式で零となり、$b_1\sin t$ だけが残ります。例えば二項なら $b_2=c_2$、$b_1=c_1+2uc_2$ で、

$$
b_1\sin2z=c_1\sin2z+c_2\sin4z
$$

を再現します。ただし複素 $|u|$ が大きい領域でのオーバーフローまで消す保証はありません。四次の短い式では直接和と Clenshaw 和を照合するのも有効です。

### 4.3 厳密投影と級数近似を取り違えない

[GEOD16の局所正則構成](../GEOD16/index.md#thm-geod16-analytic-correction)は、中央の距離条件から厳密な局所写像を定めます。Krüger 級数は、その写像を $n$ と正弦項によって近似する計算方式です。厳密投影に使える解析接続領域、級数の収束領域、指定精度を満たす実装領域は同一ではありません。全球の枝・分岐点を扱う完全理論はここでは導入せず、地域投影の計算で安全性を個別に確認します。

---

## 5. 演習

### Level A：逆式・軸・符号を確認する

<a id="ex-geod18-a01"></a>
**A1　二次の逆係数は順係数と同じか**（Level A）
- Level: A

$\alpha_1=n/2+O(n^2)$、$\alpha_2=13n^2/48+O(n^3)$ とする。$\beta_2$ の二次係数を求めよ。

<!-- solution-start -->
**詳細解答。** [逆係数定理](#thm-geod18-inverse-coefficients)の合成式で $\beta_2=\alpha_2-\alpha_1\beta_1+O(n^3)$、$\beta_1=\alpha_1+O(n^2)$ です。積は $n^2/4+O(n^3)$ なので

$$
\beta_2=\left(\frac{13}{48}-\frac{12}{48}\right)n^2+O(n^3)
=\frac1{48}n^2+O(n^3).
$$

単に順係数の符号を変えるだけでは、正弦関数の引数の補正 $n^2/4$ を取り落とします。
<!-- solution-end -->

<a id="ex-geod18-a02"></a>
**A2　球面逆変換を一往復**（Level A）
- Level: A

球面で $\xi'=0$、$\eta'=\tfrac12\log3$ とする。$\chi,\delta$ を求め、順式で元の $\xi',\eta'$ に戻ることを確かめよ。

<!-- solution-start -->
**詳細解答。** $\sinh(\tfrac12\log3)=1/\sqrt3$、$\cosh(\tfrac12\log3)=2/\sqrt3$ です。[球面逆式](#thm-geod18-spherical-inverse)から

$$
\chi=\arcsin(0)=0,\qquad
\delta=\operatorname{atan2}(1/\sqrt3,1)=\frac\pi6.
$$

[球面順式](../GEOD15/index.md#def-geod15-transverse)へ代入すると $\xi'=\operatorname{atan2}(0,\cos(\pi/6))=0$、$\eta'=\operatorname{atanh}(\sin(\pi/6))=\operatorname{atanh}(1/2)=\tfrac12\log3$ です。
<!-- solution-end -->

<a id="ex-geod18-a03"></a>
**A3　緯度原点の足し忘れ**（Level A）
- Level: A

球面の原点緯度を $\phi_0=\pi/6$、$k_0=1$、偽座標を $(E_0,N_0)$ とする。地図原点 $(E_0,N_0)$ の逆算時、誤って $\xi_0$ を足さないと何度に戻るか。

<!-- solution-start -->
**詳細解答。** [逆変換の定義](#def-geod18-inverse-map)では $\xi=\xi_0+(N_p-N_0)/(k_0A)$、球面では $\xi_0=\phi_0$ です。省くと $\xi=0,\eta=0$ になり、球面逆式から $\chi=0,\delta=0$、従って $\phi=0$ に戻ります。正しくは $\phi=\pi/6$ です。偽座標を引くことと緯度原点を足すことは別です。
<!-- solution-end -->

<a id="ex-geod18-a04"></a>
**A4　反復の分母の符号**（Level A）
- Level: A

$e^2=1/4$ とする。$\phi=0$ で $r'(\phi)$ を求め、Newton 法の分母の符号を判定せよ。

<!-- solution-start -->
**詳細解答。** [復元定理](#thm-geod18-spherical-inverse)の微分から、$\cos0=1,\sin0=0$ より

$$
r'(0)=\frac{1-1/4}{1\cdot(1-0)}=\frac34>0.
$$

一般の非極点でも分子 $1-e^2>0$、分母 $\cos\phi(1-e^2\sin^2\phi)>0$ です。従って増加性が保たれます。
<!-- solution-end -->

<a id="ex-geod18-a05"></a>
**A5　球面での収差の符号**（Level A）
- Level: A

球面で $\phi=30^\circ$、$\delta=3^\circ$ の子午線収差の符号を求め、$\delta=0$ および $\phi=0$ と比較せよ。

<!-- solution-start -->
**詳細解答。** [微分公式](#thm-geod18-convergence-scale)の球面極限は $\gamma=\operatorname{atan2}(\sin\phi\sin\delta,\cos\delta)$ です。$30^\circ,3^\circ$ では分子・分母とも正なので $\gamma>0$。$\delta=0$ なら分子0、分母1なので $\gamma=0$。$\phi=0$ でも分子0で、選んだ枝では $\gamma=0$ です。北半球・中央から東では格子北が真北より東回りです。
<!-- solution-end -->

### Level B：複数の式を接続する

<a id="ex-geod18-b01"></a>
**B1　一次往復のずれ**（Level B）
- Level: B

$w=z+t\sin2z$、$z_{\mathrm{back}}=w-t\sin2w$、$t=n/2$ とする。$z=\pi/8$ での往復残差を二次まで求め、$n=0.01$ の主項を数値化せよ。

<!-- solution-start -->
**詳細解答。** [有限往復の命題](#prop-geod18-roundtrip)から $\widehat z-z=-t^2\sin4z+O(t^3)$ です。$4z=\pi/2$ なので $\sin4z=1$、従って

$$
z_{\mathrm{back}}-z=-\frac{n^2}{4}+O(n^3).
$$

$n=0.01$ の二次主項は $-0.0001/4=-0.000025$ です。これは無次元複素座標の残差で、長さに換算するには $k_0A$ を掛けます。$O(n^3)$ を無視した数値を厳密な誤差とは呼べません。
<!-- solution-end -->

<a id="ex-geod18-b02"></a>
**B2　等角緯度の Newton 更新**（Level B）
- Level: B

$e=1/2$、与えられた $\chi\in(-\pi/2,\pi/2)$ に対し、$\phi^{(0)}=\chi$ から第一回の更新式を明示せよ。$\chi=0$ で停止すること、更新が緯度範囲外へ出た場合の代替法も示せ。

<!-- solution-start -->
**詳細解答。** [残差の定義](#thm-geod18-spherical-inverse)へ $e=1/2$ を代入すると

$$
r(\chi)=-\frac12\operatorname{atanh}(\tfrac12\sin\chi),\quad
r'(\chi)=\frac{3/4}{\cos\chi(1-\tfrac14\sin^2\chi)}.
$$

よって

$$
\phi^{(1)}=\chi+
\frac{\frac12\operatorname{atanh}(\tfrac12\sin\chi)
\cos\chi(1-\tfrac14\sin^2\chi)}{3/4}.
$$

$\chi=0$ なら $r(0)=0$、更新幅も0で、解 $\phi=0$ です。一般点では $|r(\phi^{(m)})|$ と再投影の残差も確認し、必要なら $r'>0$ と両端の極限に基づいて、区間内で根を挟む二分法に切り替えます。
<!-- solution-end -->

<a id="ex-geod18-b03"></a>
**B3　収差と縮尺を微分量から計算**（Level B）
- Level: B

$\chi=0.607714130286$、$\delta=3^\circ$、$A=6367449.145823\ \mathrm m$、$h=6371146.343889\ \mathrm m$、$k_0=0.9996$、$P=1.000580729083$、$Q=0.000135633734$ とする。$\gamma,k$ とその符号・単位を求めよ。

<!-- solution-start -->
**詳細解答。** $\delta=3\pi/180$ へ直します。[微分公式](#thm-geod18-convergence-scale)へ代入する $D$ は

$$
D=1-\cos^2(0.607714130286)\sin^2(3\pi/180)
\simeq0.998153967131.
$$

したがって

$$
\begin{aligned}
\gamma&=\operatorname{atan2}(\sin\chi\sin\delta,\cos\delta)
+\operatorname{atan2}(Q,P)\simeq1.7217994253^\circ,\\
k&=\frac{0.9996(6367449.145823)}
{6371146.343889\sqrt{0.998153967131}}
\sqrt{(1.000580729083)^2+(0.000135633734)^2}\\
&\simeq1.0005240245.
\end{aligned}
$$

両 $\operatorname{atan2}$ が正なので $\gamma>0$。$A/h$ は長さ同士の比、ほかの因子は無次元なので $k$ も無次元です。
<!-- solution-end -->

<a id="ex-geod18-b04"></a>
**B4　Clenshaw 二項和と経度差の限界**（Level B）
- Level: B

$S=c_1\sin2z+c_2\sin4z$ を第4節の Clenshaw 漸化式で再現せよ。また $\phi=0$、$\delta\to\pi/2$ で、たとえ $|n|$ が小さくても安全な一様誤差保証が失われる理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $p=2$ として $b_4=b_3=0$ から $b_2=c_2$、$b_1=c_1+2\cos2z\,c_2$ です。従って

$$
b_1\sin2z=c_1\sin2z+2c_2\cos2z\sin2z
=c_1\sin2z+c_2\sin4z=S.
$$

一方 $\phi=0$ では $\chi=0$ なので、[球面座標の式](../GEOD15/index.md#def-geod15-transverse)から $\eta'=\operatorname{atanh}(\sin\delta)\to+\infty$ です。$\cosh(2j\eta')$ が増大し、$n^j$ の小ささを上回り得ます。分岐境界と浮動小数点オーバーフローも近づき、次数を増やすだけでは解決しません。
<!-- solution-end -->

### Level C：逆座標・方位・距離の総合検算

<a id="ex-geod18-c01"></a>
**C1　WGS84 四次逆変換から点縮尺まで**（Level C）
- Level: C

$a=6378137\ \mathrm m$、$f=1/298.257223563$、$k_0=0.9996$、$\phi_0=\lambda_0=0$、$(E_0,N_0)=(500000,0)\ \mathrm m$ とする。[GEOD17の四次順変換](../GEOD17/index.md#ex-geod17-c01)で得た $E=773798.0963396085\ \mathrm m$、$N_p=3877156.6916446225\ \mathrm m$ を入力する。四次逆級数で $\phi,\lambda$ を求め、$\gamma,k$ を計算し、独立検算を提案せよ。

<!-- solution-start -->
**詳細解答。** [形状パラメータ](../GEOD3/index.md#def-geod3-shape-parameters)から $n=f/(2-f)\simeq0.0016792203863837$、$e^2=f(2-f)$ です。[子午線平均半径](../GEOD17/index.md#def-geod17-meridian-a)の四次式で $A_4\simeq6367449.145823415\ \mathrm m$。$\phi_0=0$ なら $\chi_0=0$ で各正弦項も0なので $\xi_0=0$ です。

[Krüger 逆変換の復元手順](#def-geod18-inverse-map)から

$$
\begin{aligned}
\xi&=\frac{3877156.6916446225}{0.9996 A_4}
\simeq0.6091463137100576,\\
\eta&=\frac{773798.0963396085-500000}{0.9996 A_4}
\simeq0.0430168585771955.
\end{aligned}
$$

四次の $\beta_j$ を代入し、実部・虚部ごとに $\sin(2j\xi)\cosh(2j\eta)$、$\cos(2j\xi)\sinh(2j\eta)$ を引くと

$$
\xi'\simeq0.608357142368043,\qquad
\eta'\simeq0.0429919525066654.
$$

[球面逆式](#thm-geod18-spherical-inverse)で

$$
\begin{aligned}
\chi&=\arcsin(\sin\xi'/\cosh\eta')\simeq0.6077141302858065,\\
\delta&=\operatorname{atan2}(\sinh\eta',\cos\xi')
\simeq0.0523598775598302\ \mathrm{rad}.
\end{aligned}
$$

残差 $r(\phi)=0$ を Newton 法で解くと $\phi\simeq0.6108652381980094\ \mathrm{rad}$。従って

$$
\boxed{\phi\simeq35^\circ,\qquad\lambda=\lambda_0+\delta\simeq3^\circ.}
$$

丸め前の四次計算で元の角度との差は緯度約 $1.2\times10^{-9}$ 秒角、経度約 $6\times10^{-11}$ 秒角です。これは**内部往復残差**で、測位精度や外部検証結果ではありません。

$\gamma,k$ は[子午線収差と縮尺の微分公式](#thm-geod18-convergence-scale)で評価します。逆係数は使いません。復元点の四次順式では $P\simeq1.000580729083$、$Q\simeq0.000135633734$、$D\simeq0.998153967131$、$h\simeq6371146.343889\ \mathrm m$ なので

$$
\boxed{\gamma\simeq1.7217994253^\circ,\qquad k\simeq1.0005240245.}
$$

再投影、$\delta\mapsto-\delta$ の対称性、球面極限は内部検算です。独立の精度評価では楕円体・原点・縮尺・偽座標・軸順序をそろえた [PROJ](https://proj.org/en/stable/operations/projections/tmerc.html) または [GeographicLib](https://geographiclib.sourceforge.io/tm.html) の別実装と比較し、中央子午線の別点で[子午線弧長の数値積分](../GEOD11/index.md#def-geod11-meridian-arc)も照合します。
<!-- solution-end -->

---

## 6. 次章へ

Krüger の順逆変換、格子北と真北、局所距離の縮尺を一緒に確かめられるようになりました。次の GEOD19 では、面積を保つ投影のために何を変更するか、楕円体の面積要素から調べます。
