# GR33 Ergoregion・Penrose過程・超放射

[GR32のKerr計量](../GR32/index.md#def-gr32-kerr-metric)では、外側地平線 $r_+$ と静止極限面 $r_{\rm stat}(\vartheta)$ が一致しないことが分かりました。その二つに挟まれた領域では、無限遠に対して方位角を一定に保つことができません。それでも局所的には時間的な観測者も光線も存在します。この違いを使うと、回転するブラックホールからエネルギーを取り出せます。

その際の落とし穴は、「負のエネルギー」を観測者が実験室で測る負の値と誤解することです。保存する量は無限遠で規格化された時間並進Killing場に関するもので、局所観測者の測定量とは異なります。この章では、粒子の分裂を使うPenrose過程と、波の散乱で反射振幅が増える超放射を区別し、どの仮定から増幅条件が出るのかを計算します。

以後、$G=c=1$、計量符号 $(-,+,+,+)$、$M>0$、$0<a<M$ の漸近平坦な非極限Kerrブラックホールを考えます。$a<0$ の場合は方位角の向きを逆にすればよく、$a=0$ は回転を持たない対照例です。Boyer–Lindquist座標 $(t,r,\vartheta,\varphi)$ の外側 $r>r_+$、$0<\vartheta<\pi$ を用い、

$$
\Sigma=r^2+a^2\cos^2\vartheta,\quad
\Delta=r^2-2Mr+a^2,\quad
r_+=M+\sqrt{M^2-a^2},\quad
\Omega_H=\frac{a}{r_+^2+a^2}
$$

とします。時間並進 $\xi=\partial_t$、軸回転 $\eta=\partial_\varphi$、地平線生成場 $\chi=\xi+\Omega_H\eta$ は[GR32の地平線命題](../GR32/index.md#prop-gr32-horizon)で導入したものです。$\xi$ は無限遠で未来向きに規格化します。

## 1. 局所では正なのに無限遠の保存エネルギーは負になりうる

[GR14のKilling保存量](../GR14/index.md#thm-gr14-killing-charge)から、自由粒子の未来向き四元運動量 $p$ に対して $E=-p\cdot\xi$、$L=p\cdot\eta$ は測地線上で一定です。質量粒子には $p=mu$、$m>0$、$g(u,u)=-1$ を使います。局所の未来向き単位観測者 $u_{\rm obs}$ が測るエネルギーは $-p\cdot u_{\rm obs}>0$ です。一方、$\xi$ 自身が時間的でなくなれば、$-p\cdot\xi$ の符号はこの局所的正値性だけから決まりません。

まず二つの面の間に名前を付けましょう。

<a id="def-gr33-ergoregion"></a>

<!-- formal-statement-start -->
> **定義（Kerrのergoregion）**
> $M>0$、$0<a<M$ のKerr外部で、無限遠に規格化された定常Killing場 $\xi=\partial_t$ が空間的になる開領域を *ergoregion*（エルゴ領域）という。Boyer–Lindquist座標では

$$
\mathcal E=\{(r,\vartheta):r_+<r<r_{\rm stat}(\vartheta),\ 0<\vartheta<\pi\},
\qquad r_{\rm stat}=M+\sqrt{M^2-a^2\cos^2\vartheta}.
$$

> 境界の外側静止極限面では $g(\xi,\xi)=0$ であり、$r=r_+$ はその外部にある別の零面である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr33-ergoregion -->
**定義の確認**。[GR32の静止極限面の式](../GR32/index.md#prop-gr32-static-order)を使い、$M=5,a=3$ の赤道で $r_+=9$、$r_{\rm stat}=10$ を得ます。$r=19/2$ では $\Sigma=r^2=361/4$、$2Mr=95$ だから

$$
g(\xi,\xi)=g_{tt}=-1+\frac{95}{361/4}=\frac{19}{361}>0.
$$

よって $9<19/2<10$ のこの点は、定義の半径条件と $\xi$ が空間的という条件の両方を満たします。$a\to0$ なら静止極限面は地平線へ重なり、外部のergoregionは消えます。
<!-- definition-example-end -->

負のKillingエネルギーを作れる理由を、座標計算でなくまず接空間のLorentz幾何から証明します。ここで正規直交枠とは、未来向き単位時間ベクトル $e_0$ と空間単位ベクトル $e_1$ が $g(e_0,e_0)=-1$、$g(e_1,e_1)=1$、$g(e_0,e_1)=0$ を満たすものです。

<a id="prop-gr33-negative-energy"></a>

<!-- formal-statement-start -->
> **命題（負のKillingエネルギーが可能な場所）**
> Kerr外部の一点で $\xi=\partial_t$ を考える。未来向き時間的四元運動量 $p$ で $E=-p\cdot\xi<0$ となるものが存在するための必要十分条件は、$\xi$ がその点で空間的であることである。ただし静止極限面で $\xi$ が零ではない未来向き零ベクトルの場合は、時間的 $p$ には $E>0$ である。ergoregion外で $\xi$ が未来向き時間的なら常に $E>0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

未来向き因果ベクトルどうしの内積は非正です。$\xi$ が空間的な場合には、局所正規直交枠でその時間成分より大きい空間成分があり、そこへ十分速く動く未来向き粒子を選ぶと内積の符号が逆転します。

<!-- proof-start -->
### 証明

$\xi$ が未来向き時間的または未来向き零なら、未来向き時間的 $p$ と $\xi$ の内積は厳密に負です。実際、$p=m e_0$ となる局所正規直交枠を取り、未来向き因果 $\xi=\alpha e_0+\vec\beta$ を書くと $\alpha>0$ なので $E=-p\cdot\xi=m\alpha>0$ です。

逆に $\xi$ が空間的なら、適当な空間単位方向 $e_1$ を選んで $\xi=\alpha e_0+\beta e_1$、$\beta>0$、$\beta^2>\alpha^2$ とできます。$v\in(-1,1)$、$\gamma=(1-v^2)^{-1/2}$ で

$$
p=m\gamma(e_0+ve_1),\qquad
E=-g(p,\xi)=m\gamma(\alpha-\beta v).
$$

$\alpha/\beta<1$ だから $\max(-1,\alpha/\beta)<v<1$ を選べば $E<0$ です。$g(p,p)=-m^2$ かつ $e_0$ 成分は正なので、この $p$ は未来向き時間的です。ergoregion外の外部 $r>r_+$ では $\xi$ が未来向き時間的、静止極限面では未来向き零であることから必要性も従います。
<!-- proof-end -->

この命題は一点で許される運動量方向の話です。「その運動量から出発した軌道が地平線へ入り、別の粒子が無限遠へ脱出できる」という大域的な軌道条件までは示していません。局所の粒子分裂と脱出条件を分離しておくのが重要です。

## 2. 地平線を横切る粒子に課される符号条件

ergoregionのどこでも勝手にエネルギーを負にできるわけではありません。地平線に入る未来向き粒子には、そこで未来向き零となる $\chi=\xi+\Omega_H\eta$ との内積から制約が生じます。[GR32の地平線生成場](../GR32/index.md#prop-gr32-horizon)は、入射Kerr座標で正則に定義されます。

<a id="prop-gr33-horizon-bound"></a>

<!-- formal-statement-start -->
> **命題（地平線を通過する粒子のエネルギー下限）**
> $0<a<M$ のKerr外側未来地平線を、未来向きの時間的または零の四元運動量 $p$ が通過するとする。このとき $E=-p\cdot\xi$ と $L=p\cdot\eta$ には

$$
E-\Omega_H L=-p\cdot\chi\ge0
$$

> が成り立つ。特に $E<0$ で地平線へ落ち込む粒子には $L<0$ が必要である。時間的粒子なら不等号は厳密である。
<!-- formal-statement-end -->

### 証明の見取り図

地平線上で $\chi$ は未来向き零です。Lorentz計量の符号 $(-,+,+,+)$ を使い、未来向き因果運動量との内積を評価します。負エネルギーの粒子が回転と反対向きの角運動量を持つことも、その一行後に分かります。

<!-- proof-start -->
### 証明

地平線上で $\chi$ は未来向き零のKilling生成場です。局所正規直交枠で $\chi=q(e_0+e_1)$（$q>0$）、未来向き因果 $p=p^0 e_0+\vec p$（$p^0\ge|\vec p|$）と書くと

$$
-p\cdot\chi=q(p^0-p^1)\ge q(p^0-|\vec p|)\ge0.
$$

$p$ が時間的なら $p^0>|\vec p|$ なので正です。一方、$-p\cdot\chi=-p\cdot\xi-\Omega_H p\cdot\eta=E-\Omega_H L$ です。$\Omega_H>0$ なので、$E<0$ かつ $E-\Omega_H L\ge0$ なら $\Omega_H L\le E<0$、従って $L<0$ です。
<!-- proof-end -->

境界条件の効き方を確かめましょう。例えば $M=5,a=3$ なら $\Omega_H=3/(9^2+3^2)=1/30$ です。地平線に入る粒子が $E=-1$ なら、$-1-L/30\ge0$、すなわち $L\le-30$ が必要です。$L=-15$ では不等式が破れるので、その $E,L$ を持つ未来向き粒子は未来地平線を横切れません。ただし $L\le-30$ だけで、外から地平線まで到達する測地線の存在が保証されたわけでもありません。

## 3. Penrose過程：分裂した二粒子の保存則

考える装置は単純です。ergoregion内の一つの事象で、入射粒子が二つの娘粒子に分裂します。分裂の前後では**その事象での四元運動量**が保存し、背景の二つのKilling場との内積を取れば $E$ と $L$ も加法的に保存します。

<a id="def-gr33-penrose-process"></a>

<!-- formal-statement-start -->
> **定義（粒子のPenrose過程）**
> Kerrのergoregion内の分裂事象で、未来向き四元運動量が $p_0=p_1+p_2$ を満たし、娘粒子2が $E_2=-p_2\cdot\xi<0$ で未来地平線へ落ち、娘粒子1が無限遠へ脱出する配置を粒子のPenrose過程という。各粒子の $E_i=-p_i\cdot\xi$、$L_i=p_i\cdot\eta$ は自由伝播中の保存量とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr33-penrose-process -->
**定義の確認**。分裂点で $p_0=p_1+p_2$ としてKilling場 $\xi$ との内積を取れば $E_0=E_1+E_2$ です。例えば $E_0=10$、$E_2=-2$ なら $E_1=12>10$ です。同様に $L_0=L_1+L_2$ が必要です。数値だけでは未来向き性、局所運動量保存、娘粒子の軌道と脱出は確認されないため、これは**エネルギー帳簿の確認**であって実現する分裂の完全な指定ではありません。
<!-- definition-example-end -->

分裂の瞬間に負エネルギーと増加した正エネルギーを両立できることを、局所正規直交枠で実際に構成します。

<a id="prop-gr33-local-split"></a>

<!-- formal-statement-start -->
> **命題（ergoregion内の局所分裂模型）**
> ergoregion内の一点で、未来向き単位時間ベクトル $e_0$、空間単位ベクトル $e_1$ を選び、$\xi=\alpha e_0+\beta e_1$、$\beta>\alpha>0$ と書く。質量 $m_0>0$ の静止親粒子 $p_0=m_0e_0$ は、未来向き零運動量

$$
p_1=\frac{m_0}{2}(e_0-e_1),\qquad
p_2=\frac{m_0}{2}(e_0+e_1)
$$

> へ局所的に分裂できる。このとき $E_2<0$、$E_1>E_0>0$ で、四元運動量は保存する。ただしこの局所模型だけでは、粒子1の脱出と粒子2の地平線到達は主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

反対方向に進む二本の光的ベクトルは、空間運動量を相殺して親粒子の静止運動量を再現します。$\xi$ の空間成分が時間成分より大きいため、二本のKillingエネルギーには異符号が現れます。

<!-- proof-start -->
### 証明

$g(e_0\pm e_1,e_0\pm e_1)=-1+1=0$、時間成分 $m_0/2>0$ なので両娘粒子は未来向き零です。和は

$$
p_1+p_2=\frac{m_0}{2}(2e_0)=m_0e_0=p_0.
$$

エネルギーを定義から計算すると

$$
\begin{aligned}
E_0&=-g(m_0e_0,\alpha e_0+\beta e_1)=m_0\alpha,\\
E_1&=-\frac{m_0}{2}g(e_0-e_1,\alpha e_0+\beta e_1)=\frac{m_0}{2}(\alpha+\beta),\\
E_2&=-\frac{m_0}{2}g(e_0+e_1,\alpha e_0+\beta e_1)=\frac{m_0}{2}(\alpha-\beta).
\end{aligned}
$$

$\beta>\alpha>0$ より $E_2<0$ かつ $E_1-E_0=m_0(\beta-\alpha)/2=-E_2>0$ です。
<!-- proof-end -->

この模型では娘粒子を光として構成しました。実際のPenrose過程では、分裂の質量条件や相互作用、軌道の有効ポテンシャル、外へ出る光線の脱出円錐まで点検します。また固定Kerr背景のテスト粒子近似では、ブラックホール自身の質量や角運動量の変化を厳密な時間発展として解いてはいません。$E_2<0$ が未来地平線を通過すれば、無限遠基準のエネルギー帳簿で外へ $E_1>E_0$ を運べるというのが、この機構の論理です。

## 4. 波の超放射では何が増幅されるか

粒子の分裂に対応する別のエネルギー抽出は、回転Kerr背景へ波を入射させる散乱です。ここでは荷電も質量も持たない**複素スカラー場の線形波動方程式** $\Box_g\Phi=0$ を考えます。物理的な実スカラー場は実部を取って表せます。重力波や電磁波の摂動方程式まで同時に証明したことにはしません。

時間振動数 $\omega>0$、方位モード数 $m\in\mathbb Z$ を用いて

$$
\Phi=e^{-i\omega t}e^{im\varphi}S(\vartheta)R(r)
$$

と変数分離します。$e^{im\varphi}$ が一周して同じ値へ戻る条件が $m\in\mathbb Z$ です。$\omega$ は無限遠の時間 $t$ に対する振動数です。地平線を横切る波の位相では、[GR32の地平線生成場](../GR32/index.md#prop-gr32-horizon)に沿う周波数

$$
k=\omega-m\Omega_H
$$

が現れます。実際 $\chi(e^{-i\omega t+im\varphi})=-i(\omega-m\Omega_H)e^{-i\omega t+im\varphi}$ です。粒子の $E-\Omega_HL$ に対応しますが、粒子の世界線と波の振幅は別の方程式に従います。

<a id="def-gr33-superradiance"></a>

<!-- formal-statement-start -->
> **定義（スカラー波の超放射散乱）**
> $0<a<M$ のKerr外部で、$\omega>0$ の質量零スカラー波モードを無限遠から入射し、未来地平線では入射波のみという境界条件を課す。無限遠で入射振幅 $\mathcal I\ne0$ と反射振幅 $\mathcal R$ を比較して、$|\mathcal R|^2>|\mathcal I|^2$ となる散乱を超放射散乱と呼ぶ。振幅は同一の動径波動関数の漸近規格化で定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr33-superradiance -->
**定義の確認**。入射振幅を $\mathcal I=1$ と規格化したとき、$|\mathcal R|=1.1$ なら反射の振幅二乗は $1.21>1$ で、定義上の増幅率は $0.21$ です。ただし波動方程式を解かずに反射係数を任意に $1.1$ と置けるわけではありません。次の保存流束式で許される条件を導きます。
<!-- definition-example-end -->

### 波動方程式から動径の保存量を得る

波の散乱流束は、反射波と透過波の係数を一つの等式で結ぶものです。[GR32の逆計量と行列式](../GR32/index.md#prop-gr32-inverse)から $\sqrt{-g}=\Sigma\sin\vartheta$、$g^{rr}=\Delta/\Sigma$ です。これらを

$$
\Box_g\Phi=\frac{1}{\sqrt{-g}}\partial_\mu
\big(\sqrt{-g}\,g^{\mu\nu}\partial_\nu\Phi\big)=0
$$

へ代入します。$\partial_t\Phi=-i\omega\Phi$、$\partial_\varphi\Phi=im\Phi$ と置いて $\Phi$ の共通因子を消すと、時間・方位方向の項を含む式は

$$
\frac1R\frac{d}{dr}\left(\Delta\frac{dR}{dr}\right)
+\frac1{S\sin\vartheta}\frac{d}{d\vartheta}
\left(\sin\vartheta\frac{dS}{d\vartheta}\right)
+\frac{K^2}{\Delta}+2am\omega-a^2\omega^2\sin^2\vartheta
-\frac{m^2}{\sin^2\vartheta}=0,
$$

となります。ただし $K=(r^2+a^2)\omega-am$ です。例えば $t,\varphi$ に関する部分では

$$
\begin{aligned}
\Sigma(-\omega^2g^{tt}+2\omega m g^{t\varphi}-m^2g^{\varphi\varphi})
&=\frac{\omega^2 A-4Mar\omega m+a^2m^2}{\Delta}-\frac{m^2}{\sin^2\vartheta}\\
&=\frac{K^2}{\Delta}+2am\omega-a^2\omega^2\sin^2\vartheta
-\frac{m^2}{\sin^2\vartheta}
\end{aligned}
$$

と変形します。$\sin^2\vartheta=1-\cos^2\vartheta$ で変数を分離し、軸で正則な角関数に対する実固有値を $\Lambda_{\ell m}(a\omega)$ と置くと

$$
\frac1{\sin\vartheta}\frac{d}{d\vartheta}
\left(\sin\vartheta\frac{dS}{d\vartheta}\right)
+\left(a^2\omega^2\cos^2\vartheta-\frac{m^2}{\sin^2\vartheta}
+\Lambda_{\ell m}\right)S=0,
$$

$$
\frac{d}{dr}\left(\Delta\frac{dR}{dr}\right)
+\left[\frac{K^2}{\Delta}+2am\omega-a^2\omega^2
-\Lambda_{\ell m}\right]R=0.
$$

$\ell\ge|m|$ は角方向のモード番号です。$a\omega=0$ なら[PDE11の球面調和関数の定義](../../../解析系/PDE/PDE11/index.md#def-pde11-spherical-harmonic)に対応する角方程式に戻り、[球面固有モードの固有値](../../../解析系/PDE/PDE11/index.md#prop-pde11-spherical-eigenmode)は $\Lambda_{\ell m}=\ell(\ell+1)$ です。実 $\omega$ で角方程式は実係数・適切な正則境界条件のSturm–Liouville問題なので、固有値は実数です。この実数性が動径の保存流束を作る鍵です。

外側地平線の「亀座標」 $r_*$ を、$r>r_+$ で

$$
\frac{dr_*}{dr}=\frac{r^2+a^2}{\Delta}>0
$$

により定めます。$r\to r_+$ で $r_*\to-\infty$、$r\to\infty$ で $r_*\to+\infty$ です。$r_+\ne r_-$ なので $\Delta=(r-r_+)(r-r_-)$、地平線近傍では

$$
r_*=\frac{r_+^2+a^2}{r_+-r_-}\log(r-r_+)+O(1).
$$

動径の入射・反射・地平線への透過という境界条件を、この $r_*$ に関する平面波の漸近形で指定できます。無限遠では $R$ の自然な振幅が $1/r$ で減衰することにも注意してください。

<a id="thm-gr33-wronskian"></a>

<!-- formal-statement-start -->
> **定理（スカラー散乱の流束恒等式と超放射条件）**
> $0<a<M$、$\omega>0$、$m\in\mathbb Z$ とする。実固有値 $\Lambda_{\ell m}$ を持つ質量零スカラー場の分離動径方程式の解 $R(r)$ が、無限遠では入射・反射、未来地平線では入射だけの境界条件

$$
\begin{aligned}
R(r)&\sim\frac{\mathcal I e^{-i\omega r_*}+\mathcal R e^{i\omega r_*}}{r}
&& (r_*\to+\infty),\\
R(r)&\sim\mathcal T e^{-i(\omega-m\Omega_H)r_*}
&& (r_*\to-\infty)
\end{aligned}
$$

> を満たすとする。$\mathcal I\ne0$ とし、微分の漸近形も上式から得られるものとする。このとき

$$
\omega(|\mathcal R|^2-|\mathcal I|^2)
=-(r_+^2+a^2)(\omega-m\Omega_H)|\mathcal T|^2.
$$

> 特に透過係数 $\mathcal T\ne0$ なら、超放射散乱 $|\mathcal R|^2>|\mathcal I|^2$ が起こるための必要十分条件は

$$
0<\omega<m\Omega_H
$$

> である。$m\le0$ や $a=0$ では $\omega>0$ の超放射増幅は起こらない。
<!-- formal-statement-end -->

### 証明の見取り図

動径方程式は実ポテンシャルを持つ二階線形方程式です。複素共役した式と引き算すると、あるWronskianが半径によらず一定になります。同じ保存量を無限遠と地平線で計算し、反射振幅の符号条件を得ます。

<!-- proof-start -->
### 証明

動径方程式を $(\Delta R')'+V(r)R=0$ と書きます。$\omega,a,M,m,\Lambda_{\ell m}$ は実数だから

$$
V(r)=\frac{K^2}{\Delta}+2am\omega-a^2\omega^2-\Lambda_{\ell m}
$$

は $r>r_+$ で実です。複素共役した方程式に $R$、元の方程式に $R^*$ を掛けて差を取ると、$V R^*R$ は相殺されます。従って

$$
\frac{d}{dr}\left[\Delta(R^*R'-RR^{*\prime})\right]=0,
\qquad
\mathcal J=\frac{\Delta}{2i}(R^*R'-RR^{*\prime})
$$

は一定です。ここでプライムは $r$ 微分です。

無限遠では $\Delta/r^2\to1$、$dr_*/dr\to1$。$R\sim(\mathcal I e^{-i\omega r_*}+\mathcal R e^{i\omega r_*})/r$ を代入すると、振幅の交差項は共役差で打ち消し合い、$1/r$ の微分からの寄与は極限で消えるので

$$
\mathcal J_\infty=\omega(|\mathcal R|^2-|\mathcal I|^2).
$$

未来地平線では $k=\omega-m\Omega_H$、$R\sim\mathcal T e^{-ikr_*}$ です。$\Delta R'\sim-ik(r^2+a^2)R$ より

$$
\begin{aligned}
\mathcal J_H
&=\lim_{r\downarrow r_+}\frac{1}{2i}
\left[R^*(-ik(r^2+a^2)R)-R(ik(r^2+a^2)R^*)\right]\\
&=-(r_+^2+a^2)k|\mathcal T|^2.
\end{aligned}
$$

$\mathcal J_\infty=\mathcal J_H$ とおいて定理の恒等式を得ます。$\omega>0$、$r_+^2+a^2>0$、$|\mathcal T|^2>0$ だから、右辺が正であることと $k<0$ は同値です。従って $0<\omega<m\Omega_H$ が必要十分です。$a=0$ なら $\Omega_H=0$ なのでこの不等式は満たされません。
<!-- proof-end -->

ここで採用した地平線境界条件は、未来地平線へ**入る**波だけを認めるものです。入射Kerr座標への変換では、位相 $e^{-i\omega t+im\varphi-ikr_*}$ は地平線の近くで $e^{-i\omega v+im\psi}$ と滑らかな非零因子の積になります。外へ出る $e^{+ikr_*}$ を同じ境界条件で無断に加えることはできません。無限遠では波が入射・反射してよいのに、未来地平線では一方向だけという散乱問題の非対称性が増幅の源です。

反射振幅比を明示するため、$\mathcal I\ne0$ で両辺を $\omega|\mathcal I|^2$ で割ると

$$
\frac{|\mathcal R|^2}{|\mathcal I|^2}-1
=-\frac{(r_+^2+a^2)(\omega-m\Omega_H)}{\omega}
\frac{|\mathcal T|^2}{|\mathcal I|^2}.
$$

この式は反射の**増幅可能な周波数帯**を定めますが、$\mathcal T$ の大きさ自体を計算するものではありません。実際の増幅率には、角方程式と動径方程式を境界条件付きで解く必要があります。$k=0$ は反射と入射の振幅二乗が一致する閾値で、$\mathcal T=0$ の場合も増幅しません。

### 二つの機構の共通点と相違点

| 項目 | Penrose過程（粒子） | 超放射（ここでは質量零スカラー波） |
|---|---|---|
| 保存する量 | 分裂点の $p_0=p_1+p_2$、$E_0=E_1+E_2$ | 動径方程式のWronskian $\mathcal J$ |
| 回転との結合 | $E-\Omega_HL$ | $\omega-m\Omega_H$ |
| エネルギー抽出 | 負の $E_2$ を地平線へ送り、$E_1>E_0$ が脱出 | $0<\omega<m\Omega_H$ と非零透過で反射増幅 |
| 追加で必要なこと | 局所分裂の実現可能性・二本の軌道 | 正則な未来地平線境界条件・散乱解 |

特に、振幅二乗の増加と「波のエネルギーが負だから局所観測者が負を測る」という説明を混同しないでください。超放射では地平線へ入るモードが時間並進Killingエネルギーについて負の流束を持てる一方、地平線生成場 $\chi$ に関する適切な流束の符号条件は別です。詳細な波束・応力テンソルの解釈には、実際の散乱境界条件と正規化が必要です。

## 5. 演習

### Level A：境界・符号・局所の内積

<a id="ex-gr33-a01"></a>
#### GR33-A01 赤道のergoregion
- Level: A

$M=5,a=3$ の赤道で $r_+$、$r_{\rm stat}$ を求め、$r=19/2$ における $g_{tt}$ の符号を直接計算せよ。

<!-- solution-start -->
**詳細解答。** [GR32の地平線式](../GR32/index.md#prop-gr32-horizon)から $r_+=5+\sqrt{25-9}=9$ です。赤道 $\cos\vartheta=0$ なので[静止極限面の式](../GR32/index.md#prop-gr32-static-order)は $r_{\rm stat}=5+\sqrt{25}=10$ です。$r=19/2$ は $9<19/2<10$ に入ります。赤道で $\Sigma=r^2=361/4$、$2Mr=95$ だから $g_{tt}=-(1-95/(361/4))=-1+380/361=19/361>0$。定常Killing場は空間的です。
<!-- solution-end -->

<a id="ex-gr33-a02"></a>
#### GR33-A02 局所エネルギーとKillingエネルギー
- Level: A

ある点の正規直交枠で $\xi=e_0+2e_1$ とし、質量 $m$ の未来向き運動量 $p=m\gamma(e_0+ve_1)$ の $E=-p\cdot\xi$ を求めよ。$v=3/4$ と $v=0$ を比較せよ。

<!-- solution-start -->
**詳細解答。** $g(e_0,e_0)=-1$、$g(e_1,e_1)=1$ から $p\cdot\xi=m\gamma(-1+2v)$、従って $E=m\gamma(1-2v)$ です。$v=3/4$ では $\gamma=1/\sqrt{1-9/16}=4/\sqrt7$、$E=-2m/\sqrt7<0$。$v=0$ なら $\gamma=1$、$E=m>0$。いずれも $-p\cdot e_0=m\gamma>0$ なので、局所測定エネルギーは正です。
<!-- solution-end -->

<a id="ex-gr33-a03"></a>
#### GR33-A03 地平線へ入る角運動量
- Level: A

$M=5,a=3$ で未来地平線へ入る粒子の $E=-1$ を指定する。$L$ に課される必要条件を求め、$L=-40$ と $L=-20$ のどちらがこの条件を満たすか述べよ。

<!-- solution-start -->
**詳細解答。** $r_+=9$、$r_+^2+a^2=90$ より $\Omega_H=3/90=1/30$。[地平線のエネルギー下限](#prop-gr33-horizon-bound)を代入すると $-1-L/30\ge0$、従って $L\le-30$。$L=-40$ なら $-1+40/30=1/3>0$ で必要条件を満たします。$L=-20$ なら $-1+20/30=-1/3<0$ で不可能です。$L=-40$ の軌道の存在まで証明したことにはなりません。
<!-- solution-end -->

<a id="ex-gr33-a04"></a>
#### GR33-A04 超放射の周波数帯
- Level: A

$M=5,a=3$ で $m=2$ とする。$\omega=1/20$ と $\omega=1/10$ の $k=\omega-m\Omega_H$ を計算し、どちらに超放射の必要条件があるか判定せよ。

<!-- solution-start -->
**詳細解答。** $\Omega_H=1/30$ なので $m\Omega_H=1/15$ です。$\omega=1/20$ なら $k=1/20-1/15=(3-4)/60=-1/60<0$。$\omega=1/10$ なら $k=1/10-1/15=(3-2)/30=1/30>0$。よって前者だけが $0<\omega<m\Omega_H$ に入り、非零透過なら[スカラー散乱の流束恒等式と超放射条件](#thm-gr33-wronskian)により反射増幅します。後者では増幅しません。
<!-- solution-end -->

<a id="ex-gr33-a05"></a>
#### GR33-A05 非回転極限と逆回転モード
- Level: A

$a\to0$ と $a>0,m=-1$ の二つの場合について、不等式 $0<\omega<m\Omega_H$ の右辺の符号を調べ、正の $\omega$ が条件を満たせない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $a\to0$ では $\Omega_H\to0$ です。従って条件 $0<\omega<m\Omega_H$ は $0<\omega<0$ となり矛盾します。$a>0$ なら $\Omega_H>0$ です。$m=-1$ では $m\Omega_H=-\Omega_H<0$ となり、正の $\omega$ が負の数より小さくなることはありません。いずれも入射モードに超放射の周波数帯がありません。
<!-- solution-end -->

### Level B：運動量保存と散乱流束を検算する

<a id="ex-gr33-b01"></a>
#### GR33-B01 分裂の四元運動量とエネルギー
- Level: B

局所正規直交枠で $\xi=e_0+2e_1$、$p_0=4e_0$、$p_1=2(e_0-e_1)$、$p_2=2(e_0+e_1)$ とする。両娘粒子の未来向き性・光的条件、四元運動量保存、三本のKillingエネルギーを検算せよ。この計算だけでPenrose過程の実現を結論できるか。

<!-- solution-start -->
**詳細解答。** $g(e_0\pm e_1,e_0\pm e_1)=-1+1=0$ で、$p_1,p_2$ の $e_0$ 係数は $2>0$ なので両方未来向き零です。和は $p_1+p_2=2(e_0-e_1)+2(e_0+e_1)=4e_0=p_0$ です。

$$
\begin{aligned}
E_0&=-g(4e_0,e_0+2e_1)=4,\\
E_1&=-g(2e_0-2e_1,e_0+2e_1)=6,\\
E_2&=-g(2e_0+2e_1,e_0+2e_1)=-2.
\end{aligned}
$$

$6+(-2)=4$ なのでKillingエネルギーも保存します。$\xi$ は $g(\xi,\xi)=-1+4=3>0$ で空間的です。しかし娘粒子の軌道を解いておらず、$p_1$ の無限遠脱出と $p_2$ の地平線到達を判定していません。従って局所分裂の可能性だけを示します。
<!-- solution-end -->

<a id="ex-gr33-b02"></a>
#### GR33-B02 Wronskianを両端で評価する
- Level: B

$\mathcal J=\Delta(R^*R'-RR^{*\prime})/(2i)$ について、次の二つの漸近形から保存流束をそれぞれ導け。$k=\omega-m\Omega_H$ とする。

- 無限遠の $R=(\mathcal I e^{-i\omega r_*}+\mathcal R e^{i\omega r_*})/r$ から $\mathcal J_\infty$。
- 未来地平線の $R=\mathcal T e^{-ikr_*}$ から $\mathcal J_H$。

<!-- solution-start -->
**詳細解答。** (1) $F=\mathcal I e^{-i\omega r_*}+\mathcal R e^{i\omega r_*}$ と置くと $R=F/r$。$\Delta\sim r^2$、$dr_*/dr\to1$ により

$$
\mathcal J_\infty
=\lim_{r\to\infty}\frac{1}{2i}(F^*\partial_{r_*}F-F\partial_{r_*}F^*).
$$

$\partial_{r_*}F=-i\omega\mathcal I e^{-i\omega r_*}+i\omega\mathcal R e^{i\omega r_*}$ です。$\mathcal I^*\mathcal R$ 型の交差項は引き算で打ち消し、対角項が $-\omega|\mathcal I|^2+\omega|\mathcal R|^2$ を残すので $\mathcal J_\infty=\omega(|\mathcal R|^2-|\mathcal I|^2)$ です。

(2) $R'=-ik(dr_*/dr)R=-ik(r^2+a^2)R/\Delta$ です。従って $\Delta R'=-ik(r^2+a^2)R$、$\Delta R^{*\prime}=+ik(r^2+a^2)R^*$。共役差を取れば

$$
\mathcal J_H=\lim_{r\downarrow r_+}\frac{-2ik(r^2+a^2)|R|^2}{2i}
=-(r_+^2+a^2)k|\mathcal T|^2.
$$

両極限が同じ保存量であるため、[流束恒等式](#thm-gr33-wronskian)が導かれます。
<!-- solution-end -->

<a id="ex-gr33-b03"></a>
#### GR33-B03 反射増幅率を係数で計算する
- Level: B

$M=5,a=3,m=2,\omega=1/20$ の質量零スカラー波を考える。入射振幅 $\mathcal I=1$、地平線での振幅 $|\mathcal T|=1/20$ という値が実際の散乱計算から得られたと**仮定**し、保存流束から $|\mathcal R|^2$ と増幅率を求めよ。

<!-- solution-start -->
**詳細解答。** $r_+=9$、$r_+^2+a^2=90$、$\Omega_H=1/30$ です。$k=1/20-2/30=-1/60$ なので、[流束恒等式](#thm-gr33-wronskian)は

$$
\frac1{20}(|\mathcal R|^2-1)
=-90\left(-\frac1{60}\right)\frac1{400}
=\frac3{800}.
$$

両辺に $20$ を掛け、$|\mathcal R|^2-1=3/40$、すなわち $|\mathcal R|^2=43/40=1.075$ です。振幅二乗の増幅率は $7.5\%$。指定した $|\mathcal T|$ は波動方程式から導出した値ではないため、この問題は流束の**条件付き検算**です。
<!-- solution-end -->

<a id="ex-gr33-b04"></a>
#### GR33-B04 地平線に沿う位相を確認する
- Level: B

$r_+>r_-$ に対し $dv=dt+(r^2+a^2)dr/\Delta$、$d\psi=d\varphi+a\,dr/\Delta$ を使う。$e^{-i\omega t+im\varphi-ikr_*}$ が地平線の近くで $e^{-i\omega v+im\psi}$ と滑らかな因子の積になることを、$k=\omega-m\Omega_H$ を代入して示せ。

<!-- solution-start -->
**詳細解答。** $r_*$ の定義により $v=t+r_*$（積分定数は位相へ吸収）です。また $\psi=\varphi+\int^r a\,ds/\Delta(s)$ です。従って

$$
\begin{aligned}
-i\omega t+im\varphi-ikr_*
&=-i\omega(v-r_*)+im\left(\psi-\int^r\frac{a\,ds}{\Delta(s)}\right)-ikr_*\\
&=-i\omega v+im\psi+im\left(\Omega_H r_*-\int^r\frac{a\,ds}{\Delta(s)}\right).
\end{aligned}
$$

最後の括弧の微分は $[\Omega_H(r^2+a^2)-a]/\Delta$ です。分子は $r=r_+$ で $\Omega_H(r_+^2+a^2)-a=0$ です。非極限Kerrでは $\Delta=(r-r_+)(r-r_-)$、分子は $r-r_+$ を因子に持つのでこの比は $r_+$ で有限・滑らかです。よって位相の残余も滑らかに延長でき、未来地平線を横切る入射境界条件と整合します。
<!-- solution-end -->

### Level C：粒子と波の条件を一つのKerr時空で比較する

<a id="ex-gr33-c01"></a>
#### GR33-C01 Kerrからエネルギーを取り出す条件の総合
- Level: C

$G=c=1$、$M=5,a=3$、$0<\vartheta<\pi$ のKerr外部を考える。

1. 地平線半径、赤道の静止極限面、地平線角速度を求める。赤道 $r=19/2$ がergoregion内であることを確かめる。
2. 地平線へ落ちる未来向き粒子で $E_2=-2$ となるには、$L_2$ はどの不等式を満たす必要があるか。$L_2=-70$ の場合はその必要条件を満たすか。
3. 分裂点で $E_0=8$、$E_2=-2$ とすれば脱出する粒子の $E_1$ はいくらか。この保存則だけで脱出が証明されるか。
4. 質量零スカラー波で $m=2$、$\omega=1/20$ のとき $k$ を求める。無限遠の入射振幅を $\mathcal I=1$、地平線の透過振幅の絶対値を $|\mathcal T|=1/10$ と**仮定**して、$|\mathcal R|^2$ を求める。
5. $a=0$ で同じ抽出機構が成り立つか。粒子と波の条件をそれぞれ説明する。

<!-- solution-start -->
**詳細解答。**

**（1）** $\Delta=r^2-10r+9=(r-9)(r-1)$ より $r_+=9$。赤道の静止極限は $r_{\rm stat}=2M=10$ です。$r=19/2$ は $9<r<10$、さらに $g_{tt}=19/361>0$ なのでergoregion内です。$\Omega_H=a/(r_+^2+a^2)=3/90=1/30$ です。

**（2）** [未来地平線の下限](#prop-gr33-horizon-bound)により $E_2-\Omega_H L_2\ge0$ なので

$$
-2-\frac{L_2}{30}\ge0\quad\Longleftrightarrow\quad L_2\le-60.
$$

$L_2=-70$ なら $-2+70/30=1/3>0$ で必要条件を満たします。しかし軌道の有効ポテンシャルを確認しない限り、到達可能性は確定しません。

**（3）** 局所の四元運動量保存 $p_0=p_1+p_2$ に $-\xi\cdot$ を作用させると $E_0=E_1+E_2$。よって $E_1=E_0-E_2=8-(-2)=10$ です。この一式は粒子1の未来向き性、動径速度、脱出円錐を確定しません。

**（4）** $m\Omega_H=2/30=1/15$、$k=1/20-1/15=-1/60$。$r_+^2+a^2=90$ と[スカラー散乱の流束恒等式と超放射条件](#thm-gr33-wronskian)から

$$
\begin{aligned}
\frac1{20}(|\mathcal R|^2-1)
&=-90\left(-\frac1{60}\right)\left(\frac1{10}\right)^2
=\frac3{200},\\
|\mathcal R|^2-1&=\frac3{10},\qquad |\mathcal R|^2=\frac{13}{10}.
\end{aligned}
$$

この増幅率 $30\%$ は仮定した透過振幅と保存則との整合条件であって、実際のKerr散乱の解から予測した数値ではありません。

**（5）** $a=0$ なら[Schwarzschild極限](../GR32/index.md#def-gr32-kerr-metric)で $r_+=r_{\rm stat}=2M$ となり、外側にergoregionがありません。従って未来向き粒子の負のKillingエネルギーを利用する通常のPenrose過程は成立しません。また $\Omega_H=0$ で $k=\omega>0$。流束恒等式は $|\mathcal R|^2-|\mathcal I|^2=-(r_+^2/\omega)\omega|\mathcal T|^2\le0$ となり、超放射も起きません。
<!-- solution-end -->

## 6. 次の問い

Kerrの回転は、粒子には $E-\Omega_HL\ge0$、スカラー波には $\omega-m\Omega_H$ の符号という形で現れました。これは回転する地平線がエネルギー抽出と関わることを示しますが、**地平線の面積がどう変わるか**、また**重力が光線束をどのように集束させるか**は、まだ証明していません。次章ではRaychaudhuri方程式を導き、膨張率・せん断・回転と曲率の関係を調べます。

古典的超放射の散乱条件については [Brito–Cardoso–Pani, *Superradiance*](https://arxiv.org/abs/1501.06570) も参照できます。温度・Hawking放射・量子場の粒子生成とは区別してください。
