# GR45 Killing地平線の表面重力

<!-- definition-example-audit: strict -->

[GR29のKilling地平線](../GR29/index.md#def-gr29-killing-horizon)は、あるKilling場が零超曲面の法線となる場所でした。しかし地平線の**場所**だけからは、その生成方向に沿うパラメータがどれほど非アフィンなのか、あるいは遠方の時間基準で見た重力の強さがどれほどかは読み取れません。[GR32の回転Kerr地平線](../GR32/index.md#prop-gr32-horizon)では、時間並進だけでなく回転を加えた生成場を選ぶ必要もありました。

本章では、地平線を生成するKillingベクトル場が自分自身に沿ってどう変わるかを測り、**表面重力**を定義します。その値を正則な座標で計算し、生成場の規格化・符号・物理単位の注意を明らかにします。ブラックホールの温度・エントロピーとの関係は、後続のブラックホール熱力学講座（BHT）で扱います。ここで示すのは古典的一般相対論の幾何学です。

計量符号は $(-,+,+,+)$、時空は4次元とし、本文ではまず $G=c=1$ を用います。$\nabla$ は[LORG4で定義されたLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)です。

時間・動径座標 $t,v,u,r$ とパラメータ $M,a,Q$ は長さの次元を持ちます。後で使う $u$ は**出射零時刻の座標**であり、静止観測者の四元速度は $u_{\rm stat}$ と区別します。

Killing場 $\chi$ はある滑らかな零超曲面の正則な部分で零ベクトルではないと仮定します。以下の $\kappa$ はその生成場の**選び方込み**で定まる量です。

## 1. 地平線の零生成曲線は、いつアフィン媒介か

[GR14のKilling場の定義](../GR14/index.md#def-gr14-killing-field)によると、$\chi$ は

$$
\nabla_\mu\chi_\nu+\nabla_\nu\chi_\mu=0
$$

を満たします。地平線上では $\chi$ 自身が零法線に接し、積分曲線は光的です。ただしその流れのパラメータ $s$（$dx^\mu/ds=\chi^\mu$）が測地線のアフィンパラメータであるとは限りません。[GR14の非アフィンパラメータの議論](../GR14/index.md#prop-gr14-force-nonaffine)のように、接ベクトルの共変加速度が接ベクトル自身に比例するとき、その比例係数が非アフィン性を表します。

<a id="def-gr45-surface-gravity"></a>

<!-- formal-statement-start -->
> **定義（Killing地平線の表面重力）**
> Lorentz時空 $(\mathcal M,g)$ のKilling場 $\chi$ に対し、滑らかな零超曲面 $\mathcal K$ が[GR29の意味で](../GR29/index.md#def-gr29-killing-horizon) $\chi$ のKilling地平線であるとする。$\chi\ne0$ である各地平線点において

$$
\boxed{\chi^\nu\nabla_\nu\chi^\mu=\kappa_\chi\,\chi^\mu\quad\text{on }\mathcal K}
$$

> を満たす実数 $\kappa_\chi$ を、その生成場 $\chi$ に関する**表面重力**という。$\kappa_\chi$ は一般には地平線上の関数である。$\chi$ が消える分岐面ではこの式だけでは値を定めず、正則部分で得た値が延長する場合にその極限を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr45-surface-gravity -->
**定義の確認**として、以下では零超曲面と比例係数を両方計算します。

**定義の直接確認**：平坦時空の光的座標 $U,V$ で $ds^2=-2\,dU\,dV+dy^2+dz^2$ とし、逆長さの次元を持つ定数 $\alpha>0$ に対して $\chi=\alpha(V\partial_V-U\partial_U)$ を取ります。この場は $U\mapsto e^{-\alpha s}U$、$V\mapsto e^{\alpha s}V$ の変換を生成し、$dU\,dV$ を保つのでKilling場です。

面 $U=0,V>0$ では $\chi=\alpha V\partial_V\ne0$ です。計量の交差項 $-2\,dU\,dV$ は $g_{UV}=g_{VU}=-1$ を意味するので、添字を下げると

$$
\chi^\flat=g_{\mu\nu}\chi^\nu dx^\mu
=-\alpha V\,dU+\alpha U\,dV
\ \xrightarrow{U=0}\ -\alpha V\,dU.
$$

この共変ベクトルは面の法線 $dU$ に比例し、逆計量の $g^{UU}=0$ から $g^{-1}(dU,dU)=0$ も従います。すなわち、[Killing地平線の定義](../GR29/index.md#def-gr29-killing-horizon)の非零生成場・零法線・法線方向という条件をそれぞれ確かめました。計量成分が一定ゆえこの座標のChristoffel記号は零であり、

$$
\chi^\nu\nabla_\nu\chi^V
=\alpha V\partial_V(\alpha V)
=\alpha^2V=\alpha\chi^V,
\qquad \chi^\nu\nabla_\nu\chi^U=0.
$$

従って $\kappa_\chi=\alpha$ です。この例は曲率が零でも、選んだ加速型Killing時間に関して表面重力が非零となることを示します。$U=V=0$ の分岐面は $\chi=0$ なので、定義では別扱いです。
<!-- definition-example-end -->

値の存在を確認します。Killing方程式から

$$
\chi^\nu\nabla_\nu\chi_\mu
=-\chi^\nu\nabla_\mu\chi_\nu
=-\frac12\nabla_\mu(\chi^\nu\chi_\nu).
$$

地平線上の関数 $\chi^2=g(\chi,\chi)$ は恒等的に零なので、その勾配は地平線の接方向をすべて消し、法線共変ベクトルになります。さらに $\chi^\flat$ 自身が零でない法線なので、両者は比例します。従って上の定義の $\kappa_\chi$ は正則部分の各点で一意に存在します。

<a id="prop-gr45-gradient"></a>

<!-- formal-statement-start -->
> **命題（表面重力とKillingノルムの勾配）**
> 上の定義の仮定の下で、Killing地平線 $\mathcal K$ の $\chi\ne0$ の部分では

$$
\boxed{\nabla_\mu(\chi^2)=-2\kappa_\chi\chi_\mu}
$$

> が成り立ち、逆にこの等式から表面重力の定義式が従う。$\chi^2$ の値を零としただけでは $\kappa_\chi=0$ とはいえない。
<!-- formal-statement-end -->

### 証明の見取り図

Killing方程式で $\chi$ の微分の二つの添字を交換し、ノルムの微分を取ります。地平線上に式を制限する**前に**微分することが重要です。

<!-- proof-start -->
### 証明

計量両立性 $\nabla g=0$ により

$$
\begin{aligned}
\nabla_\mu(\chi^2)
&=\nabla_\mu(g_{\alpha\beta}\chi^\alpha\chi^\beta)
=2\chi^\nu\nabla_\mu\chi_\nu\\
&=-2\chi^\nu\nabla_\nu\chi_\mu
=-2\kappa_\chi\chi_\mu.
\end{aligned}
$$

最後の等号は表面重力の定義です。逆向きには、この等式の両辺を $-1/2$ 倍し、証明の第一行で使ったKilling方程式による変形を逆にたどります。得られるのは $\chi^\nu\nabla_\nu\chi_\mu=\kappa_\chi\chi_\mu$ であり、計量で添字を上げれば定義式です。$\square$
<!-- proof-end -->

## 2. 規格化を変えると数値が変わる

Killing場は定数倍してもKilling場です。例えば時刻座標を $t'=bt$ と変えれば、座標ベクトルは $\partial_{t'}=b^{-1}\partial_t$ となります。定義に入れる生成場そのものが変われば、その非アフィン係数も変わります。

<a id="prop-gr45-scaling"></a>

<!-- formal-statement-start -->
> **命題（Killing場の規格化と表面重力）**
> Killing地平線の正則部分で $\chi'=A\chi$ と定数 $A\ne0$ を選ぶと、同じ地平線について

$$
\boxed{\kappa_{\chi'}=A\kappa_\chi}
$$

> となる。$A>0$ なら生成場の時間向きは保たれ、$A<0$ なら反転する。場所ごとに異なる $A(x)$ を掛けた一般の場はKilling場とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

共変微分の両側に出る生成場の個数を数え、定数であることを使います。

<!-- proof-start -->
### 証明

$A$ は定数なので $\nabla_\nu(A\chi^\mu)=A\nabla_\nu\chi^\mu$ です。従って

$$
\chi'^\nu\nabla_\nu\chi'^\mu
=A^2\chi^\nu\nabla_\nu\chi^\mu
=A^2\kappa_\chi\chi^\mu
=(A\kappa_\chi)\chi'^\mu.
$$

$\chi'\ne0$ なので比例係数の一意性から結論します。$\square$
<!-- proof-end -->

漸近平坦なSchwarzschildやKerrでは、無限遠で時間並進Killing場のノルムを $-1$ にする規格化が自然です。Kerrなら地平線の生成場は $\partial_t+\Omega_H\partial_\varphi$ であり、$\partial_t$ の無限遠規格化に合わせて全体の係数を選びます。一方、[GR44のde Sitter静的パッチ](../GR44/index.md#thm-gr44-static-patch)には同じ漸近平坦な無限遠はなく、中心の観測者で $\chi^2=-1$ となる規格化が自然です。「表面重力の数値」には、**どの時間基準を固定したか**を必ず添えます。

## 3. 静的球対称計量で係数を最後まで計算する

地平線を横切って滑らかに扱うため、[GR26のEddington–Finkelstein座標](../GR26/index.md#prop-gr26-ef-metric-domain)を利用します。まず静的外部 $f(r)>0$ における

$$
ds^2=-f(r)dt^2+\frac{dr^2}{f(r)}+r^2d\Omega^2
$$

を考えます。以下で $f'(r)=df/dr$ とし、プライムは動径 $r$ による常微分です。$f(r_h)=0$ の地点ではこの対角座標が退化します。外部の $f>0$ で基準半径 $r_0$ を固定し、$v=t+\int_{r_0}^{r}d\rho/f(\rho)$ と定めます。積分上端の増分を $h$ とすると、連続な関数 $1/f$ について

$$
\frac{1}{h}\int_r^{r+h}\frac{d\rho}{f(\rho)}
\ \xrightarrow{h\to0}\ \frac1{f(r)}
$$

なので、$\partial v/\partial t=1$、$\partial v/\partial r=1/f(r)$、すなわち $dv=dt+dr/f(r)$ です。これを代入すると

$$
ds^2=-f(r)dv^2+2\,dv\,dr+r^2d\Omega^2
$$

です。元の $t$ と $v$ の変換は $f=0$ で使えませんが、$f$ が $r_h>0$ の近傍で滑らかなら、**変換後の計量**は $r_h$ へ正則に延長します。$\chi=\partial_v$ は計量成分が $v$ に依存しないので[座標によるKilling判定](../GR14/index.md#prop-gr14-killing-coordinate-test)を満たし、$r=r_h$ では

$$
\chi^2=-f(r_h)=0,\qquad
\chi^\flat=-f\,dv+dr\ \longrightarrow\ dr,
\qquad g^{-1}(dr,dr)=f(r_h)=0.
$$

このため[GR29の定義](../GR29/index.md#def-gr29-killing-horizon)の零超曲面・法線・非零生成場という全条件が満たされます。零になるのは $\chi$ ではなく $\chi^2$ です。

<a id="thm-gr45-static"></a>

<!-- formal-statement-start -->
> **定理（静的球対称地平線の表面重力）**
> $r_h>0$ の近傍で $f$ が $C^1$ 級であり、次の表示が滑らかなLorentz計量を定め、$f(r_h)=0$ とする。

$$
ds^2=-f(r)dv^2+2\,dv\,dr+r^2d\Omega^2.
$$

> $\chi=\partial_v$ による $r=r_h$ のKilling地平線について

$$
\boxed{\kappa_\chi=\frac12 f'(r_h)}
$$

> である。これは入射EF表示での向き付き係数であり、$f'(r_h)<0$ の場合に無条件で正と置き直してよいわけではない。
<!-- formal-statement-end -->

### 証明の見取り図

地平線に到達する前から $\chi^2=-f(r)$ を微分します。地平線での $\chi^\flat=dr$ と[ノルム勾配恒等式](#prop-gr45-gradient)を比較すれば、Christoffel記号をすべて求める必要はありません。

<!-- proof-start -->
### 証明

正則な $(v,r)$ 表示で、座標基底 $(\partial_v,\partial_r)$ の内積 $g_{ab}=g(\partial_a,\partial_b)$ を並べたブロック行列と逆行列は

$$
(g_{ab})=\begin{pmatrix}-f&1\\1&0\end{pmatrix},
\qquad (g^{ab})=\begin{pmatrix}0&1\\1&f\end{pmatrix}
$$

です。行列式が $-1$ なので、$f=0$ でも二次元部分は非退化です。$\chi^2=g_{vv}=-f$ から

$$
\left.\nabla_\mu(\chi^2)\,dx^\mu\right|_{r_h}
=-f'(r_h)\,dr,
\qquad
\left.\chi_\mu dx^\mu\right|_{r_h}=dr.
$$

[ノルム勾配恒等式](#prop-gr45-gradient)へ代入すると $-f'(r_h)dr=-2\kappa_\chi dr$ です。$dr\ne0$ なので結論を得ます。$\square$
<!-- proof-end -->

**Schwarzschildの直接例。** [GR16の計量](../GR16/index.md#thm-gr16-schwarzschild)では、$r_s=2M$ として

$$
f(r)=1-\frac{r_s}{r},\quad
f'(r)=\frac{r_s}{r^2},\quad
f'(r_s)=\frac1{r_s}.
$$

従って、無限遠で規格化した未来地平線生成場 $\chi=\partial_v$ に対して

$$
\boxed{\kappa_{\rm Schw}=\frac1{2r_s}=\frac1{4M}}.
$$

ここで $\kappa$ は幾何単位では長さの逆数です。SI単位では $r_s=2GM_{\rm SI}/c^2$ を用い、**加速度としての表面重力** $g_H=c^2\kappa$ を定義すると

$$
\boxed{g_H=\frac{c^2}{2r_s}=\frac{c^4}{4GM_{\rm SI}}}
\qquad [g_H]={\rm m\,s^{-2}}.
$$

$M$ を幾何単位の長さとして使う式と、$M_{\rm SI}$ をkgとして使う式を混ぜないようにします。この値は地平線に留まる静止観測者の**局所固有加速度**が有限という意味ではありません。

## 4. 静止観測者の加速度は発散してもよい

静的外部で $r,\vartheta,\varphi$ を固定する観測者は $u_{\rm stat}=f^{-1/2}\partial_t$ を四元速度に持ちます。ここでの $u_{\rm stat}$ は後の出射零時刻 $u$ とは別のベクトル場であり、$g(u_{\rm stat},u_{\rm stat})=-1$ です。四元加速度には、Kerrの回転パラメータ $a$ と区別して $a_{\rm stat}$ を使います。$f\to0^+$ では静止を保つこと自体が困難になりますが、表面重力には時間の規格化に伴う赤方偏移が組み込まれています。

<a id="prop-gr45-redshift"></a>

<!-- formal-statement-start -->
> **命題（静止観測者の赤方偏移加速度）**
> $f>0$ の外部で静的計量 $-fdt^2+f^{-1}dr^2+r^2d\Omega^2$ を持ち、$r\downarrow r_h$ で $f(r_h)=0$、$f'(r_h)>0$、$f'$ が連続であるとする。静止観測者の四元速度を $u_{\rm stat}=f^{-1/2}\partial_t$、四元加速度を $a_{\rm stat}=\nabla_{u_{\rm stat}}u_{\rm stat}$ と定める。その大きさ $|a_{\rm stat}|$ は

$$
|a_{\rm stat}|=\frac{|f'|}{2\sqrt f},\qquad
\boxed{\lim_{r\downarrow r_h}\sqrt f\,|a_{\rm stat}|=\kappa_\chi=\frac{f'(r_h)}2}
$$

> となる。ただし $\chi=\partial_t$ は外部の静的時間で規格化し、地平線へはその正則延長を用いる。
<!-- formal-statement-end -->

### 証明の見取り図

$u_{\rm stat}^t=1/\sqrt f$ をChristoffel記号 $\Gamma^r_{tt}$ に代入して $a_{\rm stat}^r$ を計算し、逆に動径計量の $g_{rr}$ でノルムを測ります。

<!-- proof-start -->
### 証明

$u_{\rm stat}^\mu=(f^{-1/2},0,0,0)$ なので、世界線に沿って $f$ は一定であり、$u_{\rm stat}^\nu\partial_\nu u_{\rm stat}^\mu=0$ です。唯一の非零成分は

$$
\Gamma^r_{tt}=-\frac12g^{rr}\partial_rg_{tt}
=\frac12ff',\qquad
a_{\rm stat}^r=\Gamma^r_{tt}(u_{\rm stat}^t)^2=\frac12f'.
$$

従って $g_{rr}=f^{-1}$ から

$$
|a_{\rm stat}|^2=g_{rr}(a_{\rm stat}^r)^2=\frac{f'^2}{4f},
\qquad \sqrt f\,|a_{\rm stat}|=\frac{|f'|}2.
$$

$f'(r_h)>0$ と連続性により地平線付近で $f'>0$ だから極限は $f'(r_h)/2$ です。[静的球対称地平線の定理](#thm-gr45-static)に一致します。$\square$
<!-- proof-end -->

Schwarzschildでは $f'(r_s)>0$ なので、$|a_{\rm stat}|\sim(2r_s\sqrt f)^{-1}$ と発散する一方、赤方偏移因子 $\sqrt f$ を掛けた値は $1/(2r_s)$ に収束します。「表面重力が有限」から「地平線に静止できる」を導いてはいけません。

## 5. 電荷と回転で表面重力はどう変わるか

### Reissner–Nordström：重根になると零になる

[GR31のRN地平線半径](../GR31/index.md#def-gr31-rn-horizon-radii)では、$M>0$、$0\le |Q|\le M$ とし

$$
f(r)=1-\frac{2M}{r}+\frac{Q^2}{r^2}
=\frac{(r-r_+)(r-r_-)}{r^2},
\qquad r_\pm=M\pm\sqrt{M^2-Q^2}
$$

です。外側の未来Killing地平線は入射EF座標で正則です。微分すると

$$
f'(r)=\frac{2M}{r^2}-\frac{2Q^2}{r^3}
=\frac{(r-r_-)+(r-r_+)}{r^2}
-\frac{2(r-r_+)(r-r_-)}{r^3}.
$$

外側根 $r=r_+>0$ を代入し、[静的球対称地平線の表面重力](#thm-gr45-static)を使えば

$$
\boxed{\kappa_{\rm RN,+}=\frac{r_+-r_-}{2r_+^2}}.
$$

$Q=0$ では $r_+=2M,r_-=0$ でSchwarzschildへ戻ります。$|Q|=M$ では二つの根が一致し、$f=(1-M/r)^2$ で $f'(M)=0$、従って $\kappa=0$ です。これは**極限（extremal）地平線**という幾何学的な退化であって、定義式の $\chi$ 自体が消えるという意味ではありません。極限解に対して、非極限解の分岐面の構造をそのまま前提にしないことも重要です。

### Kerr：地平線は回転する生成場を持つ

回転解では $\partial_t$ のノルム零集合は一般に静止極限面であり、地平線の生成場ではありません。[GR32のKerr地平線の証明](../GR32/index.md#prop-gr32-horizon)にある

$$
\chi=\partial_v+\Omega_H\partial_\psi,\qquad
\Omega_H=\frac a{r_+^2+a^2}
$$

を用います。[GR32の入射座標変換](../GR32/index.md#prop-gr32-horizon)は $dv=dt+(r^2+a^2)dr/\Delta$、$d\psi=d\varphi+a\,dr/\Delta$ です。$\Delta\ne0$ の重なり領域で、$r,\vartheta$ を固定した座標微分は $\partial_v=\partial_t$、$\partial_\psi=\partial_\varphi$ となるため、同じ生成場を二つの座標系で表示できます。以下で $\kappa$ が極角に依存しないことを**直接**示します。一般の定常ブラックホールの零法則を、追加仮定なしで引用するわけではありません。

<a id="thm-gr45-kerr"></a>

<!-- formal-statement-start -->
> **定理（Kerr外側地平線の表面重力）**
> $M>0$、$|a|\le M$ のKerr計量について、$r_\pm=M\pm\sqrt{M^2-a^2}$、$R_+=r_+^2+a^2=2Mr_+$ と置く。無限遠の時間並進を係数1に規格化した $\chi=\partial_v+(a/R_+)\partial_\psi$ が外側地平線を生成するとき、その表面重力は

$$
\boxed{\kappa_{\rm Kerr,+}
=\frac{r_+-r_-}{2(r_+^2+a^2)}
=\frac{\sqrt{M^2-a^2}}{2Mr_+}}
$$

> であり、地平線上の極角によらない。$|a|=M$ の極限では $\kappa=0$、$a=0$ では $\kappa=1/(4M)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

計量の $(t,\varphi)$ 部分を平方の差にまとめ、$\chi^2$ の動径微分を地平線で計算します。生成場の計量双対 $\chi^\flat$ は入射座標で正則に計算でき、[ノルム勾配恒等式](#prop-gr45-gradient)の両辺に現れる角度依存の因子が相殺されます。

<!-- proof-start -->
### 証明

[GR32のBoyer–Lindquist計量](../GR32/index.md#def-gr32-kerr-metric)に従い、$\Sigma=r^2+a^2\cos^2\vartheta$、$\Delta=(r-r_+)(r-r_-)$、$s=\sin\vartheta$ とします。計量の時間・方位部分は

$$
ds^2_{t\varphi}
=-\frac\Delta\Sigma(dt-as^2d\varphi)^2
+\frac{s^2}\Sigma((r^2+a^2)d\varphi-a\,dt)^2
$$

なので、$\Omega=a/R_+$ を一定に保って $\chi=\partial_t+\Omega\partial_\varphi$ のノルムを計算すると

$$
\chi^2
=-\frac\Delta\Sigma(1-a\Omega s^2)^2
+\frac{s^2}\Sigma((r^2+a^2)\Omega-a)^2.
$$

$r=r_+$ では $\Delta=0$、$(r_+^2+a^2)\Omega-a=0$ です。従って第二項は地平線で値だけでなく一階動径微分も零です。また $1-a\Omega s^2=\Sigma_+/R_+$、$\Sigma_+=r_+^2+a^2\cos^2\vartheta$ だから

$$
\left.\partial_r\chi^2\right|_{r_+}
=-\frac{\Delta'(r_+)}{\Sigma_+}
\left(\frac{\Sigma_+}{R_+}\right)^2
=-\frac{\Delta'(r_+)\Sigma_+}{R_+^2}.
$$

この $\partial_r$ は $t,\varphi,\vartheta$ を固定した微分ですが、$\chi^2$ は $t,\varphi$ に依存しないスカラーなので、$v,\psi,\vartheta$ を固定した入射座標の動径微分とも一致します。計量自体はBoyer–Lindquist座標で特異に見えても、ノルムは地平線へ滑らかに延長できます。[GR32で確認した入射Kerr表示](../GR32/index.md#prop-gr32-horizon)では $\chi^\flat|_{r_+}=(\Sigma_+/R_+)dr$ です。よって[ノルム勾配恒等式](#prop-gr45-gradient)の $dr$ 成分は

$$
-\frac{\Delta'(r_+)\Sigma_+}{R_+^2}
=-2\kappa_\chi\frac{\Sigma_+}{R_+}.
$$

$R_+>0$、$\Sigma_+>0$（軸は滑らかな極限）だから、$\kappa_\chi=\Delta'(r_+)/(2R_+)$ です。$\Delta'=2r-2M$、$r_++r_-=2M$ より $\Delta'(r_+)=r_+-r_-$。$R_+=2Mr_+$ を代入すると定理の表示を得ます。極角の $\Sigma_+$ は完全に相殺されます。$a=0$、$|a|=M$ の値はこの明示式へ直接代入できます。$\square$
<!-- proof-end -->

この計算はKerrという具体的な解で表面重力が一定であることを示しました。**任意のKilling地平線で自動的に一定**だと主張しているのではありません。より一般の一定性には追加の幾何学的・場の方程式上の仮定が必要です。

### 宇宙論的地平線では向きを指定する

[GR44の静的de Sitterパッチ](../GR44/index.md#thm-gr44-static-patch)では $f(R)=1-H_*^2R^2$、$R_h=H_*^{-1}$ です。静的パッチ内の $f>0$ で $u=T-\int_{R_0}^{R}d\rho/f(\rho)$ と定めると、$du=dT-dR/f$ です。以下の $u$ はこの**出射零時刻**であり、四元速度 $u_{\rm stat}$ ではありません。未来側の宇宙論的地平線まで変換後の計量を延長すると

$$
ds^2=-f(R)du^2-2\,du\,dR+R^2d\Omega^2,
\qquad \chi=\partial_u.
$$

ここでは $\chi^\flat=-f\,du-dR\to-dR$、$\nabla(\chi^2)=-f'\,dR$ ですから、[ノルム勾配恒等式](#prop-gr45-gradient)は $-f'(R_h)dR=2\kappa_\chi dR$ を与えます。つまり

$$
\kappa_{\rm dS,future}=-\frac12f'(R_h)=H_*>0.
$$

これに対し入射型 $dv=dT+dR/f$ は逆の符号 $\kappa=f'(R_h)/2=-H_*$ を与え、別の地平線分枝の向きに対応します。したがって「$|f'|/2$ を常に代入する」だけでは、定義で固定した生成場の向きが失われます。de Sitterでは中心 $R=0$ で $g(\partial_T,\partial_T)=-1$ という規格化を使用しています。

## 6. 演習：定義・規格化・座標域を区別する

### Level A：一つの条件を確実に計算する

<a id="ex-gr45-a01"></a>

#### GR45-A01 生成場を二倍したら

- Level: A

あるKilling地平線で $\chi$ の表面重力が $3/L$（$L>0$ は長さ）とする。$\chi'=2\chi$ と $\widehat\chi=-\chi$ のそれぞれの表面重力と時間向きの変化を求めよ。

<!-- solution-start -->
**詳細解答。** [規格化の命題](#prop-gr45-scaling)の定数 $A$ をそれぞれ $2,-1$ に取ります。

$$
\kappa_{\chi'}=2\frac3L=\frac6L,\qquad
\kappa_{\widehat\chi}=-\frac3L.
$$

前者は正の倍数なので時間向きは不変、後者は負の倍数なので反転します。地平線の位置と $g(\chi,\chi)=0$ という条件は変わりません。
<!-- solution-end -->

<a id="ex-gr45-a02"></a>

#### GR45-A02 Schwarzschild半径を使う

- Level: A

$r_s=8L$ のSchwarzschild計量について、$f(r_s)$、$f'(r_s)$、$\kappa$ を求めよ。$L>0$ とする。

<!-- solution-start -->
**詳細解答。** $f(r)=1-8L/r$ を半径で微分してから $r_s=8L$ を代入します。

$$
f(8L)=0,\qquad f'(r)=\frac{8L}{r^2},\qquad
f'(8L)=\frac1{8L}.
$$

[静的球対称地平線の表面重力](#thm-gr45-static)から

$$
\kappa=\frac{f'(r_s)}2=\frac1{16L}.
$$

$f$ は無次元、$f'$ と $\kappa$ の単位は $L^{-1}$ です。
<!-- solution-end -->

<a id="ex-gr45-a03"></a>

#### GR45-A03 零ノルムと零ベクトルを取り違えない

- Level: A

入射EF計量 $ds^2=-f(r)dv^2+2dvdr+r^2d\Omega^2$ の $r=r_h$、$f(r_h)=0$ において $\chi=\partial_v$ は零ベクトルか。計量双対と法線を用いて答えよ。

<!-- solution-start -->
**詳細解答。** $\chi$ の座標成分は $\chi^v=1,\chi^r=0$ なので零ベクトルではありません。零なのはノルム $\chi^2=g_{vv}=-f(r_h)=0$ です。さらに座標基底の計量成分を使うと

$$
\chi^\flat=g_{v\mu}dx^\mu=-f\,dv+dr
\ \xrightarrow{r=r_h}\ dr,
\qquad dF=d(r-r_h)=dr.
$$

面の法線も $dr$ であり、逆計量の $rr$ 成分によって $g^{-1}(dr,dr)=g^{rr}=f(r_h)=0$ です。これで[Killing地平線の定義](../GR29/index.md#def-gr29-killing-horizon)の非零性・法線性・零性がそれぞれ満たされます。
<!-- solution-end -->

<a id="ex-gr45-a04"></a>

#### GR45-A04 加速度への単位復元

- Level: A

質量 $M_{\rm SI}$ kg のSchwarzschild地平線の表面重力を、$G,c$ と $M_{\rm SI}$ で表せ。長さの逆数から加速度への変換係数も説明せよ。

<!-- solution-start -->
**詳細解答。** $r_s=2GM_{\rm SI}/c^2$ は長さです。幾何単位の値は $\kappa=1/(2r_s)$ なので、長さの逆数 $\mathrm{m}^{-1}$ から加速度 $\mathrm{m\,s^{-2}}$ へ変換するには $c^2$ を掛けます。

$$
g_H=c^2\kappa=\frac{c^2}{2r_s}=\frac{c^4}{4GM_{\rm SI}},
\qquad
\left[\frac{c^4}{GM_{\rm SI}}\right]
=\frac{\mathrm{m}^4\mathrm{s}^{-4}}{\mathrm{m}^3\mathrm{s}^{-2}}
=\mathrm{m\,s}^{-2}.
$$

したがって加速度としての単位に一致します。
<!-- solution-end -->

<a id="ex-gr45-a05"></a>

#### GR45-A05 RNの極限

- Level: A

$M=5L,Q=3L$ のRN解の $r_+,r_-$ と外側地平線の $\kappa$ を求め、$Q\to M$ の極限と比較せよ。

<!-- solution-start -->
**詳細解答。** 二根の式に $M=5L,Q=3L$ を代入すると

$$
r_\pm=5L\pm\sqrt{25-9}L=(5\pm4)L,
\qquad r_+=9L,\quad r_-=L.
$$

[静的球対称地平線の表面重力](#thm-gr45-static)をRNの $f(r)$ に適用すると

$$
\kappa=\frac{r_+-r_-}{2r_+^2}
=\frac{8L}{2\cdot81L^2}=\frac4{81L}.
$$

$Q\to M$ では $r_+-r_-=2\sqrt{M^2-Q^2}\to0$、分母は $2r_+^2\to2M^2>0$ なので $\kappa\to0$ となります。
<!-- solution-end -->

### Level B：勾配・座標・観測者をつなぐ

<a id="ex-gr45-b01"></a>

#### GR45-B01 光的座標の定義へ戻る

- Level: B

$ds^2=-2dU\,dV+dy^2+dz^2$、$\chi=\alpha(V\partial_V-U\partial_U)$、$\alpha>0$ とする。$U=0,V>0$ で $\chi^2$ と $\chi^\flat$ を求め、勾配恒等式から表面重力を独立に再計算せよ。

<!-- solution-start -->
**詳細解答。** $g_{UV}=g_{VU}=-1$、他の $U,V$ 成分は零なので

$$
\chi^2=2g_{UV}\chi^U\chi^V
=-2(-\alpha U)(\alpha V)=2\alpha^2UV.
$$

従って $\nabla(\chi^2)=2\alpha^2(VdU+UdV)$ で、$U=0$ では $2\alpha^2VdU$ です。一方、$\chi_U=-\chi^V=-\alpha V$、$\chi_V=-\chi^U=\alpha U$ なので、地平線では $\chi^\flat=-\alpha VdU$ です。[ノルム勾配恒等式](#prop-gr45-gradient)は $2\alpha^2VdU=-2\kappa(-\alpha VdU)$ となります。$\alpha V>0$ だから $\kappa=\alpha$。本文の非アフィン加速度による計算と一致します。
<!-- solution-end -->

<a id="ex-gr45-b02"></a>

#### GR45-B02 局所加速度と赤方偏移

- Level: B

$f(r)=1-r_s/r$、$r>r_s$ の静止観測者について、$r=4r_s$ での $|a_{\rm stat}|$ と $\sqrt f|a_{\rm stat}|$ を求め、$r\downarrow r_s$ の極限を示せ。

<!-- solution-start -->
**詳細解答。** $r=4r_s$ で $f=3/4$、$\sqrt f=\sqrt3/2$、$f'=r_s/(16r_s^2)=1/(16r_s)$ です。[静止観測者の赤方偏移加速度](#prop-gr45-redshift)により

$$
|a_{\rm stat}|=\frac{1/(16r_s)}{2(\sqrt3/2)}
=\frac1{16\sqrt3\,r_s},\qquad
\sqrt f\,|a_{\rm stat}|=\frac1{32r_s}.
$$

$r\downarrow r_s$ では $f'\to1/r_s$、$f\to0^+$ だから $|a_{\rm stat}|\to+\infty$ ですが、$\sqrt f|a_{\rm stat}|=f'/2\to1/(2r_s)=\kappa_{\rm Schw}$ です。$r=4r_s$ での赤方偏移加速度と地平線極限が異なるのは $f'$ が $r$ に依存するためです。
<!-- solution-end -->

<a id="ex-gr45-b03"></a>

#### GR45-B03 Kerrの角度因子が消える理由

- Level: B

$M=5L,a=3L$ とする。$r_+$ と $R_+$ を求め、Kerr地平線上で赤道 $\vartheta=\pi/2$ と軸への極限 $\vartheta\to0$ における $\Sigma_+/R_+$ を比較せよ。その違いにもかかわらず $\kappa$ が一定となることを式で確かめよ。

<!-- solution-start -->
**詳細解答。** $r_+=5L+\sqrt{25-9}L=9L$、$r_-=L$、$R_+=r_+^2+a^2=90L^2$ です。赤道では $\Sigma_+=81L^2$ なので $\Sigma_+/R_+=9/10$、軸への極限では $\Sigma_+=90L^2$ なので比は $1$ です。ところが[定理の証明](#thm-gr45-kerr)にある

$$
\partial_r\chi^2\big|_{r_+}
=-\frac{(r_+-r_-)\Sigma_+}{R_+^2},
\qquad \chi^\flat\big|_{r_+}=\frac{\Sigma_+}{R_+}dr
$$

を勾配恒等式へ代入すると両辺の $\Sigma_+$ が消えます。$\kappa=(8L)/(2\cdot90L^2)=2/(45L)$ で、赤道と軸極限で同一です。軸の方位座標の退化を使って新たな物理的特異性を結論しません。
<!-- solution-end -->

<a id="ex-gr45-b04"></a>

#### GR45-B04 de Sitterでの符号と正則座標

- Level: B

$f(R)=1-H^2R^2$、$H>0$ の静的de Sitterパッチについて、$du=dT-dR/f$ と $dv=dT+dR/f$ の各正則表示で $\chi=\partial_u$、$\partial_v$ の表面重力を計算し、なぜ符号だけで計算ミスを判定できないか説明せよ。

<!-- solution-start -->
**詳細解答。** $R_h=1/H$、$f'(R)=-2H^2R$ より $f'(R_h)=-2H$ です。出射表示は $ds^2=-fdu^2-2du\,dR+R^2d\Omega^2$ で、地平線では $\chi^\flat=-dR$、$\nabla(\chi^2)=-f'\,dR=2H\,dR$。[勾配恒等式](#prop-gr45-gradient)から $2H\,dR=-2\kappa(-dR)$、従って $\kappa=H$ です。入射表示は $ds^2=-fdv^2+2dv\,dR+R^2d\Omega^2$ で、地平線では $\chi^\flat=dR$。$2H\,dR=-2\kappa dR$ なので $\kappa=-H$ です。二つの表示が正則に覆う未来・過去の地平線分枝と生成場の向きが違います。$f'(R_h)$ に絶対値を付けるだけでは向きの情報が失われます。
<!-- solution-end -->

### Level C：規格化・極限・回転を総合する

<a id="ex-gr45-c01"></a>

#### GR45-C01 Schwarzschild・帯電・回転の横断検算

- Level: C

幾何単位 $G=c=1$、$M>0$ とし、各解で無限遠の時間並進を係数1に規格化する。次を順に示せ。

1. Schwarzschildの $\kappa_S$ を $M$ で表す。
2. RN解では $Q=M/2$ とし、$r_\pm$、$\kappa_{RN}$、$\kappa_{RN}/\kappa_S$ を正確に求める。
3. Kerr解では $a=M/2$ とし、地平線生成場に必要な $\Omega_H$、$\kappa_K$、$\kappa_K/\kappa_S$ を求める。
4. RNの $|Q|\to M$、Kerrの $|a|\to M$ では何が零になるか述べ、$\chi\mapsto2\chi$ としたとき比 $\kappa/\kappa_S$ を比較するには**同じ時間基準を選ぶ必要**がある理由を説明せよ。

<!-- solution-start -->
**詳細解答。**

**（1）** $r_s=2M$、$f=1-2M/r$ より $f'(r_s)=2M/(2M)^2=1/(2M)$ です。[静的球対称地平線の表面重力](#thm-gr45-static)から $\kappa_S=1/(4M)$ です。

**（2）** $Q=M/2$ なら

$$
r_\pm=M\pm\sqrt{M^2-M^2/4}
=M\left(1\pm\frac{\sqrt3}{2}\right).
$$

従って $r_+-r_-=\sqrt3M$、$r_+^2=M^2(1+\sqrt3/2)^2$ で、

$$
\kappa_{RN}=\frac{\sqrt3}{2M(1+\sqrt3/2)^2},
\qquad \frac{\kappa_{RN}}{\kappa_S}
=\frac{2\sqrt3}{(1+\sqrt3/2)^2}.
$$

分母は正で、$Q=0$ の比1から減少する値です（概算 $0.995$）。

**（3）** $a=M/2$ でも $r_\pm=M(1\pm\sqrt3/2)$ ですが、回転では $R_+=r_+^2+a^2=2Mr_+=2M^2(1+\sqrt3/2)$ です。生成場は[GR32のKilling地平線の式](../GR32/index.md#prop-gr32-horizon)による $\chi=\partial_t+\Omega_H\partial_\varphi$ で、

$$
\Omega_H=\frac a{R_+}=\frac{1}{4M(1+\sqrt3/2)},
$$

$$
\kappa_K=\frac{\sqrt3M}{2R_+}
=\frac{\sqrt3}{4M(1+\sqrt3/2)},
\qquad \frac{\kappa_K}{\kappa_S}
=\frac{\sqrt3}{1+\sqrt3/2}.
$$

こちらの比はおよそ $0.928$ です。帯電と回転で根が同形でも分母の幾何学的意味が異なります。

**（4）** RNは $r_+-r_-\to0$ かつ $r_+\to M>0$、Kerrも $r_+-r_-\to0$ かつ $R_+\to2M^2>0$ なので、それぞれ $\kappa\to0$ です。消えるのは生成場そのものではなく、選んだ時間基準における非アフィン係数です。[規格化の命題](#prop-gr45-scaling)から同じ解の $\chi$ を $2\chi$ にすると $\kappa$ も二倍になります。従って別解の比を論じる前に、全解で同一の無限遠時間規格化を固定しなければ比較が恣意的になります。
<!-- solution-end -->

## 7. 何を得て、何をまだ得ていないか

- Killing地平線での表面重力は、零生成場の非アフィン性 $\nabla_\chi\chi=\kappa\chi$ と、ノルム勾配 $\nabla(\chi^2)=-2\kappa\chi^\flat$ で表せます。
- Schwarzschildでは $\kappa=1/(4M)$、RNでは $(r_+-r_-)/(2r_+^2)$、Kerrでは $(r_+-r_-)/(2(r_+^2+a^2))$ と計算でき、後二者は極限で零になります。
- 生成場の定数倍は $\kappa$ を変えます。さらに地平線分枝・向き・時間規格化を指定しなければ符号や数値を比較できません。
- 本章は古典的な幾何学的量と静止観測者の加速度の関係までです。地平線の温度、エントロピー、ブラックホール熱力学の法則は追加の物理的議論を要するため、ここから自動的には従いません。
