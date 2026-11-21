# BHI22 JTと非重力浴の接合

<!-- definition-example-audit: strict -->

## 1. 境界のエネルギーを、浴の流束と結び付ける

[BHI21のLorentz境界エネルギー](../BHI21/index.md#prop-bhi21-lorentz-energy)は、Schwarzian結合 $C>0$ と境界時計 $F$ から $E=-C\{F,u\}$ と求まりました。しかし、時計だけでは放射が浴に通るか、浴から戻るかは決まりません。[BHI17の接合模型](../BHI17/index.md#def-bhi17-regulated-coupling)は重力領域と浴を区別し、[BHI18の物質エントロピー](../BHI18/index.md#def-bhi18-cft-ledger)は浴の状態・領域・cutoffを固定しました。本講では、この三つを一つの模型として動かします。

具体的には、重力側の正則化境界と浴の時計を合わせ、自由場の透過・反射を検算し、二次元CFTの量子流束を境界エネルギーの変化へ入力します。最後に、入射のない浴での冷却と、熱い浴からの入射で保たれる平衡を同じ方程式から計算します。

以下、長さの単位を $\ell>0$、二次元Newton定数を $G_2>0$ とし、$\hbar=k_{\rm B}=1$、Lorentz計量符号を $(-,+)$ とします。$u$ は**繰り込まれた境界時間**（長さの次元）、$C=\ell\Phi_r/(8\pi G_2)$ は長さ、$E$ は $u$ に共役なエネルギー（逆長さ）です。自由スカラーの古典的計算と、中心電荷 $c_{\rm m}>0$ の量子CFTの計算は別に行います。$C$ と $c_{\rm m}$ を同じ量と取り違えないでください。

## 2. JT側と浴側で、同じ時計を読む

Lorentz AdS$_2$ のPoincaréパッチ $z>0$ に

$$
ds_G^2=\frac{\ell^2}{z^2}(-dT^2+dz^2)
$$

を置きます。[BHI21の正則化境界](../BHI21/index.md#def-bhi21-regulated-boundary)のLorentz版として、重力側の接合曲線を $u\mapsto(T,z)=(F(u),Z(u))$ と書き、この曲線を $\Sigma_G$ と呼びます。ここで $F'=dF/du$、$Z'=dZ/du$ とし、二階・三階のプライムも同じ変数 $u$ に関する常微分を表します。接線は $(dT/du,dz/du)=(F',Z')$ です。$F'>0$、$Z>0$、$F'^2>Z'^2$ として時間的曲線を選びます。$i_G^*g_G$ はこの接線へ計量を引き戻した誘導計量であり、$dT=F'du$、$dz=Z'du$ を代入すると、

$$
i_G^*g_G=-\frac{\ell^2}{Z^2}(F'^2-Z'^2)\,du^2.
$$

一方、非重力浴を $x\ge0$ とし、固定cutoff $\varepsilon>0$ で

$$
ds_B^2=\varepsilon^{-2}(-du^2+dx^2),
\qquad \Sigma_B=\{x=0\}
$$

と取ります。浴の埋め込み $i_B(u)=(u,0)$ で $dx=0$ を代入すると $i_B^*g_B=-du^2/\varepsilon^2$。従って誘導計量を合わせる条件は

$$
\frac{\ell^2}{Z^2}(F'^2-Z'^2)=\varepsilon^{-2},
\qquad
\Phi|_{\Sigma_G}=\Phi_r/\varepsilon.
$$

この浴は平坦です。定数の共形係数は接合時計の規格化を示すために書いています。浴の**固有時間**は $\tau=u/\varepsilon$ ですが、以後の有効エネルギーと流束は一貫して $u$ に共役な値で扱います。$\tau$ に移したときの係数は演習で検算します。

<a id="def-bhi22-cutoff-gluing"></a>

<!-- formal-statement-start -->
> **定義（JT正則化境界と平坦浴の時計接合）**
>
> $\ell,G_2,\Phi_r,\varepsilon>0$ を取り、重力側計量を $ds_G^2=\ell^2(-dT^2+dz^2)/z^2$、浴側計量を $ds_B^2=\varepsilon^{-2}(-du^2+dx^2)$ とする。$C^3$ 級の曲線 $(F(u),Z(u))$ が $F'>0$、$Z>0$、$F'^2>Z'^2$ を満たし、誘導計量と境界dilatonが
>
$$
\frac{\ell^2(F'^2-Z'^2)}{Z^2}=\varepsilon^{-2},
\qquad \Phi|_{\Sigma_G}=\Phi_r/\varepsilon
$$
>
> を満たすとき、曲線 $\Sigma_G$ と浴の $x=0$ を同一の境界時刻 $u$ で接合したものを**時計接合**とする。物質場の境界条件と量子状態は別途指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi22-cutoff-gluing -->
**定義の確認**：$F(u)=u$、$Z(u)=\ell\varepsilon$ と取ります。$F'=1>0$、$Z'=0$、$F'^2-Z'^2=1>0$、$Z>0$ であり、

$$
\frac{\ell^2(F'^2-Z'^2)}{Z^2}
=\frac{\ell^2}{\ell^2\varepsilon^2}=\varepsilon^{-2}.
$$

重力側と浴側はともに $-du^2/\varepsilon^2$ を誘導します。dilatonの条件も具体的に確かめます。[BHI19の真空Hessian方程式](../BHI19/index.md#prop-bhi19-trace-hessian)を満たすPoincaré型の解 $\Phi(T,z)=\alpha/z$ に $\alpha=\ell\Phi_r>0$ を選べば、接合曲線上で

$$
\Phi(F(u),Z(u))
=\frac{\ell\Phi_r}{\ell\varepsilon}
=\frac{\Phi_r}{\varepsilon}.
$$

これは既習の真空解について、誘導計量と境界dilatonの二条件を別々に満たす直接例です。時計条件だけから浴の透過性や量子状態が決まるわけではありません。
<!-- definition-example-end -->

**動く曲線のcutoff展開。** 上の一致条件を $Z>0$ について解けば

$$
Z=\ell\varepsilon\sqrt{F'^2-Z'^2}.
$$

$F'$ が零から離れ、$Z$ とその導関数の漸近展開が一様に制御される有限区間で $Z=O(\varepsilon)$、$Z'=O(\varepsilon)$ とします。まず平方根の中身が $1+O(\varepsilon^2)$ なので $Z=\ell\varepsilon F'+O(\varepsilon^3)$ です。この余剰項も $u$ で微分して $O(\varepsilon^3)$ に保たれると仮定すれば、$Z'=\ell\varepsilon F''+O(\varepsilon^3)$。これを右辺へ代入すると

$$
\begin{aligned}
Z&=\ell\varepsilon F'
\sqrt{1-\frac{Z'^2}{F'^2}}\\
&=\ell\varepsilon F'
\left[1-\frac{\ell^2\varepsilon^2}{2}
\left(\frac{F''}{F'}\right)^2+O(\varepsilon^4)\right]\\
&=\ell\varepsilon F'
-\frac{\ell^3\varepsilon^3F''^2}{2F'}+O(\varepsilon^5).
\end{aligned}
$$

Euclidでの[BHI21の境界展開](../BHI21/index.md#prop-bhi21-extrinsic-schwarzian)では $F'^2+Z'^2$ ですが、ここはLorentz時間なので**符号はマイナス**です。このcutoff展開は一般の動く境界に対する接合の局所存在を保証するものではなく、滑らかな解がある場合の必要な漸近形です。

## 3. 物質場は透過するのか、反射するのか

幾何が接合しても、左右の場の値と法線方向の変化が一致しなければ、放射は浴に連続して流れません。ここでは接合面上に独立の蓄積自由度を置かず、両側に同じ質量零実スカラー場を置きます。まず境界近傍で共通の共形座標 $(u,x)$ を使い、境界を $x=0$、重力側を $x<0$、浴を $x>0$ と表します。場の自由作用に係数 $\lambda_G,\lambda_B>0$ を許すと、

$$
I_{\rm m}=-\frac12\sum_{s=G,B}\lambda_s
\int_s d^2x\sqrt{-g_s}\,g_s^{ab}
\partial_a\phi_s\partial_b\phi_s.
$$

添字 $a,b$ は座標 $(u,x)$ を走り、$\partial_u$ は $x$ を固定した微分、$\partial_x$ は $u$ を固定した微分です。各側の正の共形因子を $\Omega_s(u,x)>0$ とすると、計量成分の行列はこの座標基底で $g_{s,ab}=\Omega_s^2\operatorname{diag}(-1,1)$ です。その行列式は $-\Omega_s^4$、逆行列は $\Omega_s^{-2}\operatorname{diag}(-1,1)$ です。従って

$$
\sqrt{-g_s}=\Omega_s^2,\qquad
\sqrt{-g_s}\,g_s^{ab}=\operatorname{diag}(-1,1)
$$

となり、二次元では共形係数が自由場の作用から打ち消されます。[BHI17の自由場の変分](../BHI17/index.md#def-bhi17-transparent-interface)と同じ部分積分を適用すると、場の方程式は両側とも $\partial_u^2\phi_s-\partial_x^2\phi_s=0$ です。

接合面で変分 $\delta\phi_G=\delta\phi_B$ を許し、場の値を連続に取ると、[BHI17の透過接合](../BHI17/index.md#def-bhi17-transparent-interface)と同じ積分境界項の相殺が、係数付きで

$$
\phi_G(u,0^-)=\phi_B(u,0^+),\qquad
\lambda_G\partial_x\phi_G(u,0^-)
=\lambda_B\partial_x\phi_B(u,0^+)
$$

を与えます。ここで左右の $x$ は**同じ右向き**に測ります。一般の曲がった境界では、各側の共通方向に向けた単位法線を $n_s$ として $\lambda_G n_G^a\partial_a\phi_G=\lambda_B n_B^a\partial_a\phi_B$ と読む必要があります。時間微分も境界値の微分として一致します。

<a id="def-bhi22-transmission"></a>

<!-- formal-statement-start -->
> **定義（重力浴の透過接合と反射接合）**
>
> 共通の時間 $u$ を持つ二つの共形半直線に、正の作用係数 $\lambda_G,\lambda_B$ の質量零実スカラー場を置く。各場が内部で二階連続微分可能、界面まで一階連続微分可能であるとする。**透過接合**は次の二条件である。
>
$$
\phi_G(u,0^-)=\phi_B(u,0^+),\qquad
\lambda_G\partial_x\phi_G(u,0^-)
=\lambda_B\partial_x\phi_B(u,0^+).
$$
>
> **完全反射接合**の例は、浴に場を通さず重力側へ次の条件を課すものである。
>
$$
\partial_x\phi_G(u,0)=0.
$$
>
> 動く境界では、双方を同じ右向きに揃えた法線微分で条件を表す。
<!-- formal-statement-end -->

この定義例で使う $f'(\xi)=df(\xi)/d\xi$ は波形の一変数の導関数です。例えば $f(u-x)$ なら、連鎖律により $\partial_u f(u-x)=f'(u-x)$、$\partial_x f(u-x)=-f'(u-x)$ となります。

<!-- definition-example-start: def-bhi22-transmission -->
**定義の確認**：$\lambda_G=\lambda_B=1$、$f\in C^2$ に対して両側で $\phi_s(u,x)=f(u-x)$ を取ります。$\phi_s(u,0)=f(u)$、$\partial_x\phi_s(u,0)=-f'(u)$ が一致し、波動方程式も $\partial_u^2\phi_s=\partial_x^2\phi_s=f''(u)$ なので透過条件の全項を満たします。境界までの $C^1$ 性も $f\in C^2$ から従います。一方、$\phi_G=f(u-x)+f(u+x)$ なら界面で $\partial_x\phi_G=-f'(u)+f'(u)=0$ となり、重力側だけで反射が完結します。
<!-- definition-example-end -->

透過率が1になる条件を波束から導いてみましょう。左から入る同じ滑らかな波形 $f$ に対して

$$
\phi_G=f(u-x)+r\,f(u+x),\qquad
\phi_B=t\,f(u-x)
$$

と置きます。$r$ は反射の振幅、$t$ は透過の振幅です。界面で場の値と係数付き導関数を合わせると

$$
1+r=t,\qquad
\lambda_G(1-r)=\lambda_Bt.
$$

<a id="prop-bhi22-wave-transmission"></a>

<!-- formal-statement-start -->
> **命題（自由スカラーの反射率・透過率）**
>
> $\lambda_G,\lambda_B>0$、滑らかで有限エネルギーの入射波束 $f(u-x)$ を上の二半直線模型へ入れ、透過接合を課す。反射・透過の振幅は
>
$$
r=\frac{\lambda_G-\lambda_B}{\lambda_G+\lambda_B},
\qquad t=\frac{2\lambda_G}{\lambda_G+\lambda_B}
$$
>
> であり、入射エネルギーに対する反射率と透過率は
>
$$
\mathcal R=r^2,\qquad
\mathcal T=\frac{\lambda_B}{\lambda_G}t^2
=\frac{4\lambda_G\lambda_B}{(\lambda_G+\lambda_B)^2},
\qquad \mathcal R+\mathcal T=1.
$$
>
> 特に $\lambda_G=\lambda_B$ なら $\mathcal R=0$、$\mathcal T=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

境界で二本の線形方程式を解いたあと、波の**向き**に注意してエネルギー流束の符号を計算します。透過振幅 $t$ そのものはエネルギー透過率ではありません。

<!-- proof-start -->
### 証明

$1+r=t$ を第2式へ代入すると

$$
\lambda_G-\lambda_Gr=\lambda_B+\lambda_Br,
\qquad(\lambda_G+\lambda_B)r=\lambda_G-\lambda_B.
$$

分母は正なので $r$ が得られ、$t=1+r=2\lambda_G/(\lambda_G+\lambda_B)$。係数付きエネルギー密度・右向き流束は

$$
e_s=\frac{\lambda_s}{2}\left[(\partial_u\phi_s)^2+
(\partial_x\phi_s)^2\right],
\qquad j_s=-\lambda_s(\partial_u\phi_s)(\partial_x\phi_s).
$$

重力側の右向き・左向き微分を $f'_-:=f'(u-x)$、$f'_+:=f'(u+x)$ と区別します。連鎖律で $\partial_u\phi_G=f'_-+rf'_+$、$\partial_x\phi_G=-f'_-+rf'_+$ となるため、流束の交差項は相殺され、

$$
\begin{aligned}
j_G&=-\lambda_G(f'_-+rf'_+)(-f'_-+rf'_+)\\
&=\lambda_G(f'_-)^2-\lambda_Gr^2(f'_+)^2.
\end{aligned}
$$

同じ時刻の界面 $x=0$ で $f'_-=f'_+=f'(u)$。従って入射 $j_{\rm in}=\lambda_G[f'(u)]^2$、反射 $j_{\rm refl}=-\lambda_Gr^2[f'(u)]^2$、透過 $j_{\rm tr}=\lambda_Bt^2[f'(u)]^2$ です。$f'$ が零でない点で入射で割ると、主張した比率を得ます。最後に

$$
\mathcal R+\mathcal T
=\frac{(\lambda_G-\lambda_B)^2+4\lambda_G\lambda_B}
{(\lambda_G+\lambda_B)^2}=1.
$$

$\lambda_G=\lambda_B$ の場合は $r=0,t=1$。$\square$
<!-- proof-end -->

この自由場の計算は**界面の規格化が異なる場合の教材用反例**です。以下の量子CFTの公式には同じ場が完全透過する $\lambda_G=\lambda_B$ の模型を用い、任意の相互作用CFTにこの $\mathcal T$ を無条件に掛けることはしません。

## 4. 浴で観測する量子流束を計算する

古典場の波束を通すことと、量子場の「どの真空にいるか」を指定することは別です。浴の平坦計量に沿う右向き・左向きのnull座標を

$$
w=u-x,\qquad v=u+x
$$

と置きます。以下、浴の右向き流束は $\langle T_{ww}\rangle$、左向き入射は $\langle T_{vv}\rangle$ です。[QCURV16のnull流束の定義](../../QCURV/QCURV16/index.md#def-qcurv16-null-flux)に従い、正味の右向き流束は

$$
P(u)=\langle T_{ww}\rangle_{\Sigma_B}
-\langle T_{vv}\rangle_{\Sigma_B}.
$$

右向きの出射成分について、単調な真空座標 $U=p(w)$ を使い、$U$ に正周波数を取った状態を浴へ延長できると仮定します。これは浴の**量子状態を選ぶ追加条件**です。ここで $p'=dp/dw$、$p''=d^2p/dw^2$、$p'''=d^3p/dw^3$ は光線ラベル $w$ に関する常微分です。$p\in C^3$、$p'>0$ とし、短距離規格化を固定します。接合面 $x=0$ では $w=u$ なので、その面上で $p(w)$ を $p(u)$ と書き換えたときの導関数は $u$ 微分と一致します。

<a id="def-bhi22-outgoing-state"></a>

<!-- formal-statement-start -->
> **定義（透過浴の出射真空写像）**
>
> 完全透過する質量零二次元CFT（左右の中心電荷が等しく $c_{\rm m}>0$）の浴において、右向きnull座標 $w=u-x$ と、向きを保つ $C^3$ 写像 $U=p(w)$、$p'(w)>0$ を固定する。$U$ の正周波数真空を浴の出射成分の状態として指定し、入射成分の状態は独立に指定する。境界時計 $F$ と $p$ は一般には別の変数であり、$p=F$ は後で明示的に採用する特別な接合条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi22-outgoing-state -->
**定義の確認**：$p(w)=w$ は $C^3$、$p'=1>0$ です。この状態の右向き成分を浴の平坦真空とし、入射成分も平坦真空に取れば左右とも流束は0です。一方、$p(w)=w_H-Ae^{-\kappa w}$（$A,\kappa>0$）は $p'=A\kappa e^{-\kappa w}>0$、三階微分も存在します。同じ平坦浴でも異なる出射状態を指定できることが分かります。
<!-- definition-example-end -->

[QCURV16の状態関数変換定理](../../QCURV/QCURV16/index.md#thm-qcurv16-state-transformation)で、同定 $U=p(w)$、基準真空の状態関数 $t_U=0$、浴の共形因子を定数に取ります。このとき幾何由来の $\partial_w\rho$ 項は零なので、

$$
\langle T_{ww}\rangle_{\rm out}
=(p')^2\underbrace{\langle T_{UU}\rangle_{\rm vac}}_{0}
-\frac{c_{\rm m}}{24\pi}\{p,w\}
=-\frac{c_{\rm m}}{24\pi}\{p,w\}.
$$

$a>0$ の正則化で短距離処方を固定した上での**繰り込まれた応力テンソル期待値**であり、[BHI18の区間エントロピー](../BHI18/index.md#prop-bhi18-conformal-bath)とは観測量が違います。

<a id="prop-bhi22-anomalous-flux"></a>

<!-- formal-statement-start -->
> **命題（透過浴のSchwarzian出射流束）**
>
> 上の出射真空写像 $p$ と完全透過・平坦浴の状態を取り、QCURV16と同じ局所共変くりこみで平坦真空の流束を零とする。入射成分を $v$ 真空に取ると、接合面の正味流束は
>
$$
P(u)=-\frac{c_{\rm m}}{24\pi}\{p,u\}.
$$
>
> 特に $p(u)=u_H-Ae^{-\kappa u}$（$A,\kappa>0$）では
>
$$
P=\frac{c_{\rm m}\kappa^2}{48\pi}
=\frac{\pi c_{\rm m}}{12}T_H^2,\qquad
T_H:=\frac{\kappa}{2\pi}.
$$
>
> 入射が真空でない場合は、指定した $\langle T_{vv}\rangle$ を差し引く。
<!-- formal-statement-end -->

### 証明の見取り図

出射成分には上のQCURV16の変換則を使い、入射真空は $T_{vv}=0$ とします。指数写像では、振幅 $A$ が導関数の比で消え、温度だけが残ります。

<!-- proof-start -->
### 証明

$x=0$ で $w=u$、入射を $v$ 真空としたので $\langle T_{vv}\rangle=0$ です。よって変換定理から $P=-c_{\rm m}\{p,u\}/(24\pi)$。指数写像の導関数は

$$
p'=A\kappa e^{-\kappa u},\quad
p''=-A\kappa^2 e^{-\kappa u},\quad
p'''=A\kappa^3 e^{-\kappa u}.
$$

従って $p''/p'=-\kappa$、$p'''/p'=\kappa^2$ であり、

$$
\{p,u\}=\kappa^2-\frac32\kappa^2=-\frac{\kappa^2}{2}.
$$

これを代入して $P=c_{\rm m}\kappa^2/(48\pi)$。$\kappa=2\pi T_H$ を代入すると $P=c_{\rm m}(4\pi^2T_H^2)/(48\pi)=\pi c_{\rm m}T_H^2/12$ です。$\square$
<!-- proof-end -->

ここでの $\kappa$ はこの特別な状態の正のパラメータです。実際のJTブラックホールの温度と同一視するには、[BHI20の地平線温度](../BHI20/index.md#prop-bhi20-temperature)と境界時刻の規格化を合わせる追加条件が必要です。

## 5. 流束が境界エネルギーを減らす

接合面を通って出ていくエネルギーを重力側が失い、界面にエネルギーを貯蔵する別の自由度や外部仕事がないとします。古典場では[BHI17の流束保存命題](../BHI17/index.md#prop-bhi17-interface-flux)で界面項が相殺されました。量子場の繰り込まれた流束を重力の境界へ反作用として入れる場合も、**同じ規格化のエネルギー**を使う保存条件を置きます。

特に、出射真空の写像 $p(u)$ を[BHI21のLorentz境界時計](../BHI21/index.md#prop-bhi21-lorentz-energy) $F(u)$ と同定する $p=F$ を採用します。真空の浴からの入射は0とし、$F\in C^4$、$F'>0$ の局所区間に制限します。$E=-C\{F,u\}$ なので、出射流束とエネルギーの比が定数になります。

<a id="prop-bhi22-energy-decay"></a>

<!-- formal-statement-start -->
> **命題（真空浴へ完全透過するJTのエネルギー減衰）**
>
> $C>0$、$c_{\rm m}>0$ とし、透過浴の出射真空写像が $p=F$、入射真空流束が0、界面に蓄積エネルギーや仕事がなく、正規化した境界エネルギーが $E=-C\{F,u\}$ であると仮定する。繰り込まれた出射流束を上のSchwarzian公式で与え、$\dot E=-P$ を反作用方程式として課す。このとき
>
$$
\frac{dE}{du}=-\gamma E,\qquad
\gamma:=\frac{c_{\rm m}}{24\pi C}>0,
\qquad E(u)=E_0e^{-\gamma(u-u_0)}.
$$
>
> ここで $E(u_0)=E_0>0$ とし、式は指定した半古典・完全透過模型の適用区間で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギーと出射流束はともに**同一の** $\{F,u\}$ に比例します。係数の比を取り、一次常微分方程式を初期値から積分します。

<!-- proof-start -->
### 証明

$E=-C\{F,u\}$ から $\{F,u\}=-E/C$ です。[出射流束命題](#prop-bhi22-anomalous-flux)へ $p=F$ を入れると、

$$
P=-\frac{c_{\rm m}}{24\pi}\{F,u\}
=\frac{c_{\rm m}}{24\pi C}E=\gamma E.
$$

ここで $[C]=L$、$[E]=L^{-1}$、$[P]=L^{-2}$、$[\gamma]=L^{-1}$ なので次元も一致します。保存条件 $\dot E=-P$ に代入すると $\dot E=dE/du=-\gamma E$。$E_0>0$ なので、少なくとも初期点 $u_0$ の近傍では $E(u)>0$ です。その区間で対数の連鎖律を使うと

$$
\frac{d}{du}\ln E(u)=\frac{1}{E(u)}\frac{dE}{du}=-\gamma.
$$

両辺を $u_0$ から $u$ まで積分すると、

$$
\ln E(u)-\ln E_0=-\gamma(u-u_0),
\qquad E(u)=E_0e^{-\gamma(u-u_0)}.
$$

変数分離の略記 $dE/E=-\gamma\,du$ はこの連鎖律と定積分を表します。得られた指数解は全時刻で正なので、この正値区間から連続的に延長でき、線形方程式の一意性により適用区間の解に一致します。$\square$
<!-- proof-end -->

準静的に[BHI21の熱的エネルギー](../BHI21/index.md#prop-bhi21-thermal-thermodynamics) $E=2\pi^2CT_{\rm eff}^2$ を各時刻に適用できるなら、

$$
T_{\rm eff}(u)=T_0e^{-\gamma(u-u_0)/2},
\qquad T_0:=\sqrt{\frac{E_0}{2\pi^2C}}.
$$

これは境界の冷却を表す**準静的な解釈**です。時間依存中の量子状態が各瞬間に厳密な熱平衡であるという証明ではありません。また式は低エネルギーでの半古典近似と結合条件が成り立つ範囲の結果であり、蒸発終期の完全な解を与えません。

### このエネルギー曲線に対応する時計は作れるか

$E(u)$ の式だけを出して $F$ が存在するかを放置せず、境界時計の局所構成も確認します。以下で $y'$、$y''$ は $u$ を変数とする一階・二階の常微分で、$F'$ と同じ微分変数ですが、関数は $y$ と $F$ で異なります。

<a id="prop-bhi22-local-clock"></a>

<!-- formal-statement-start -->
> **命題（指定エネルギーからの局所境界時計）**
>
> $C>0$、$E(u)$ は開区間 $J$ 上で連続であるとする。常微分方程式
>
$$
y''-\frac{E(u)}{2C}\,y=0
$$
>
> の二つの実解 $y_1,y_2$ を取り、$y_2\ne0$ かつ $W:=y_1'y_2-y_1y_2'>0$ の部分区間では、$F=y_1/y_2$ は $F'>0$ を満たし、
>
$$
\{F,u\}=-\frac{E(u)}C
$$
>
> となる。任意の初期点で $y_2\ne0,W>0$ となる初期値を選べるので、この構成は少なくとも局所的に可能である。
<!-- formal-statement-end -->

### 証明の見取り図

二階線形方程式の二解の比を微分します。保存されるWronskianを使うと、Schwarzianの三階微分が $y_2''/y_2$ へまとめられます。

<!-- proof-start -->
### 証明

$y_i''=E(u)y_i/(2C)$ なので、

$$
W'=y_1''y_2-y_1y_2''
=\frac{E}{2C}(y_1y_2-y_1y_2)=0.
$$

従って $W$ は正の定数です。$y_2\ne0$ の区間で

$$
F'=\frac{y_1'y_2-y_1y_2'}{y_2^2}
=\frac{W}{y_2^2}>0,\qquad
\frac{F''}{F'}=-2\frac{y_2'}{y_2}.
$$

$q=F''/F'$ と置き、[Schwarzianの定義](../../QCURV/QCURV16/index.md#def-qcurv16-schwarzian)の同値形 $\{F,u\}=q'-q^2/2$ を使うと、

$$
\begin{aligned}
\{F,u\}
&=-2\left(\frac{y_2''}{y_2}
-\frac{y_2'^2}{y_2^2}\right)
-\frac12\left(-2\frac{y_2'}{y_2}\right)^2\\
&=-2\frac{y_2''}{y_2}=-\frac{E(u)}C.
\end{aligned}
$$

初期点 $u_*$ で $y_1(u_*)=0,y_1'(u_*)=1,y_2(u_*)=1,y_2'(u_*)=0$ とすれば $W=1$ で、連続係数の線形常微分方程式の局所解が存在し、連続性から十分小さな近傍で $y_2\ne0$ です。$\square$
<!-- proof-end -->

例えば一定の $E=Ck^2/2$（$k>0$、$[k]=L^{-1}$）では、基準長さ $L_*>0$ を取り $y_1=L_*e^{ku/2}$、$y_2=e^{-ku/2}$ と選べます。どちらも $y''-k^2y/4=0$ を満たし、Wronskianは $W=L_*k>0$。比 $F=L_*e^{ku}$ は境界時間座標と同じ長さの次元を持ち、$\{F,u\}=-k^2/2$ です。ただし**真空浴へ出射する場合**には $P=\gamma E>0$ なので、一定の正の $E$ は保存式と両立しません。この例は時計構成の確認であり、エネルギーを真空浴へ放出し続ける定常解ではありません。

## 6. 熱い浴からの入射を加える

浴の入射成分に、温度 $T_B\ge0$ の一定の熱流束を指定します。二次元CFTの一方向の平衡流束は、出射と同じ正規化で $P_{\rm in}=\pi c_{\rm m}T_B^2/12$ です。入射成分をこの定数に取ること、出射では引き続き $p=F$ とすること、界面に蓄積がないことを仮定します。

<a id="prop-bhi22-thermal-balance"></a>

<!-- formal-statement-start -->
> **命題（一定温度の浴との熱収支）**
>
> [真空浴の減衰命題](#prop-bhi22-energy-decay)と同じ $C,c_{\rm m}>0$、完全透過・出射条件を採用し、入射の左向き成分を $P_{\rm in}=\pi c_{\rm m}T_B^2/12$（$T_B\ge0$）と固定する。$E(u_0)=E_0>0$ に対して、エネルギー保存を
>
$$
\dot E=-P_{\rm out}+P_{\rm in},\qquad
P_{\rm out}=\frac{c_{\rm m}}{24\pi C}E
$$
>
> と課すと、$E_B:=2\pi^2CT_B^2$、$\gamma:=c_{\rm m}/(24\pi C)$ として
>
$$
E(u)=E_B+(E_0-E_B)e^{-\gamma(u-u_0)}.
$$
>
> 特に $E_0=E_B$ なら正味流束は零で、出射・入射はともに非零でも定常となる。
<!-- formal-statement-end -->

### 証明の見取り図

温度から定まる平衡エネルギー $E_B$ を出射係数へ代入し、$P_{\rm in}=\gamma E_B$ を確かめます。$E-E_B$ の減衰方程式へ帰着させます。

<!-- proof-start -->
### 証明

二つの係数の比は

$$
\gamma E_B
=\frac{c_{\rm m}}{24\pi C}\,2\pi^2CT_B^2
=\frac{\pi c_{\rm m}}{12}T_B^2=P_{\rm in}.
$$

従って保存式は $\dot E=-\gamma E+\gamma E_B=-\gamma(E-E_B)$。$Y=E-E_B$ と置くと $\dot Y=-\gamma Y$ なので、

$$
Y(u)=Y(u_0)e^{-\gamma(u-u_0)}
=(E_0-E_B)e^{-\gamma(u-u_0)}.
$$

これを $E=E_B+Y$ に戻します。$u\ge u_0$ では $e^{-\gamma(u-u_0)}\in(0,1]$ なので $E$ は正の $E_0$ と非負の $E_B$ の間に保たれます。$E_0=E_B$ なら $P_{\rm out}=\gamma E_B=P_{\rm in}$ で $\dot E=0$ です。$\square$
<!-- proof-end -->

準静的な温度 $T_{\rm eff}^2=E/(2\pi^2C)$ を使えば、

$$
T_{\rm eff}(u)^2=T_B^2+
(T_0^2-T_B^2)e^{-\gamma(u-u_0)}.
$$

冷たい浴では冷却し、熱い浴では加熱されます。この区別は入射と出射の差から出ており、**放射があることと蒸発していることは同義ではありません**。

## 7. 何が分かり、まだ何を決めていないか

| 入力・観測量 | 今回求めたもの | 必要な条件 |
|---|---|---|
| 重力側の境界時計 | $i_G^*g_G=i_B^*g_B=-du^2/\varepsilon^2$ | timelikeな曲線、dilaton境界値、共通 $u$ |
| 自由場の通過 | $\mathcal R+\mathcal T=1$ | 同じ場の連続と係数付き法線微分の一致 |
| 量子CFTの出射 | $P_{\rm out}=-c_{\rm m}\{p,u\}/(24\pi)$ | 出射真空座標、透過、くりこみ規約 |
| 境界の反作用 | $\dot E=-P_{\rm out}+P_{\rm in}$ | $p=F$、エネルギー規格化、界面蓄積なし |
| 真空浴の冷却 | $E=E_0e^{-\gamma(u-u_0)}$ | 入射なし、$E>0$、半古典模型の適用域 |
| 熱浴の定常状態 | $E=2\pi^2CT_B^2$ | 出射と入射が釣り合う |

これらは**エネルギー流束と境界応答**の計算です。浴の状態はまだ、時刻ごとに観測する放射領域 $R$ の全相関を計算したものではありません。[BHI18の二端点のエントロピー](../BHI18/index.md#prop-bhi18-conformal-bath)へ接合後の状態・光線写像・cutoffを入れる作業は次のBHI23で行います。エネルギーの単調減少だけから精細エントロピーのPage曲線は導けません。

参考：[Maldacena–Stanford–YangによるSchwarzian作用](https://doi.org/10.1093/ptep/ptw124)、[JT重力の可解模型レビュー](https://doi.org/10.1007/s41114-023-00046-1)、[JTブラックホール蒸発の模型](https://doi.org/10.1007/JHEP07%282019%29097)。

## 8. 演習：接合条件・流束・エネルギーを一続きに検算する

以下では $u,x,\ell$ は長さ、$\varepsilon>0$ は無次元、$\lambda_G,\lambda_B,C,c_{\rm m}>0$ とします。設問ごとに状態・境界条件が異なる場合は、明記した条件だけを使ってください。

### Level A：接合と方向を見分ける

<a id="ex-bhi22-a01"></a>

#### BHI22-A01 二つの誘導計量

- Level: A
- 問題: $\ell=2$、$\varepsilon=1/10$、$F(u)=u$、$Z(u)=\ell\varepsilon$ のJT境界と、浴 $ds_B^2=\varepsilon^{-2}(-du^2+dx^2)$ の $x=0$ を比べよ。$i_G^*g_G$、$i_B^*g_B$、固有時間 $d\tau$ を求めよ。

<!-- solution-start -->
**詳細解答。** $Z=2/10=1/5$、$F'=1$、$Z'=0$ です。重力側の接線への計量制限は $-\ell^2(F'^2-Z'^2)du^2/Z^2=-4du^2/(1/25)=-100du^2$。浴側は $dx=0$ なので $i_B^*g_B=-\varepsilon^{-2}du^2=-100du^2$。よって両者は一致します。未来向きに $d\tau=\sqrt{100}\,du=10du=du/\varepsilon$ です。
<!-- solution-end -->

<a id="ex-bhi22-a02"></a>

#### BHI22-A02 同じ場の完全透過

- Level: A
- 問題: $\lambda_G=\lambda_B=2$ で、$\phi_G=f(u-x)$、$\phi_B=f(u-x)$ とする。$f\in C^2$ の下で界面の二条件と流束の連続を確かめよ。

<!-- solution-start -->
**詳細解答。** 界面では両側の値が $f(u)$、空間導関数が $-f'(u)$ です。係数を掛けても両側は $-2f'(u)$ で等しい。波動方程式は $\partial_u^2\phi=\partial_x^2\phi=f''(u)$ を満たします。右向き流束は $j_s=-\lambda_s(\partial_u\phi_s)(\partial_x\phi_s)=-2f'(u)(-f'(u))=2[f'(u)]^2$。ゆえに界面の両側で一致します。
<!-- solution-end -->

<a id="ex-bhi22-a03"></a>

#### BHI22-A03 異なる場の規格化

- Level: A
- 問題: 自由スカラーの界面で $\lambda_G=3,\lambda_B=1$ とする。振幅 $r,t$、エネルギー比 $\mathcal R,\mathcal T$ を求めよ。$t$ と $\mathcal T$ が違う理由を述べよ。

<!-- solution-start -->
**詳細解答。** [透過率命題](#prop-bhi22-wave-transmission)へ代入すると $r=(3-1)/(3+1)=1/2$、$t=2\cdot3/(3+1)=3/2$。$\mathcal R=r^2=1/4$、$\mathcal T=(\lambda_B/\lambda_G)t^2=(1/3)(9/4)=3/4$ で総和は1です。$t$ は場の振幅比、$\mathcal T$ は係数 $\lambda$ を含む流束比なので、$t>1$ でもエネルギーが増えたことにはなりません。
<!-- solution-end -->

<a id="ex-bhi22-a04"></a>

#### BHI22-A04 放射しない出射真空

- Level: A
- 問題: $p(u)=au+b$（$a>0$）で定めた出射真空について $p'$ の符号、Schwarzianと右向き流束を求めよ。入射真空を仮定する。

<!-- solution-start -->
**詳細解答。** $p'=a>0$、$p''=p'''=0$ なので [Schwarzianの定義](../../QCURV/QCURV16/index.md#def-qcurv16-schwarzian)から $\{p,u\}=0/a-(3/2)(0/a)^2=0$。[出射流束命題](#prop-bhi22-anomalous-flux)へ代入して $P=-c_{\rm m}\cdot0/(24\pi)=0$。入射も真空で0なので正味流束は0です。
<!-- solution-end -->

<a id="ex-bhi22-a05"></a>

#### BHI22-A05 指数光線の出射

- Level: A
- 問題: $p(u)=u_H-Ae^{-\kappa u}$（$A,\kappa>0$）について、$\{p,u\}$ と $P$ を計算し、$T_H=\kappa/(2\pi)$ を用いて書き直せ。

<!-- solution-start -->
**詳細解答。** $p'=A\kappa e^{-\kappa u}>0$、$p''/p'=-\kappa$、$p'''/p'=\kappa^2$ です。従って $\{p,u\}=\kappa^2-(3/2)\kappa^2=-\kappa^2/2$。入射真空では $P=-c_{\rm m}\{p,u\}/(24\pi)=c_{\rm m}\kappa^2/(48\pi)$。$\kappa=2\pi T_H$ から $P=c_{\rm m}4\pi^2T_H^2/(48\pi)=\pi c_{\rm m}T_H^2/12$ です。振幅 $A$ は微分比で消えます。
<!-- solution-end -->

### Level B：複数の条件をつなげる

<a id="ex-bhi22-b01"></a>

#### BHI22-B01 界面変分から保存則まで

- Level: B
- 問題: 左右の自由場作用の係数を $\lambda_G,\lambda_B>0$、共通の界面変分を $\delta\phi_G(0)=\delta\phi_B(0)$ とする。境界項を計算して導関数の一致を導き、界面流束の保存を示せ。

<!-- solution-start -->
**詳細解答。** 二次元の共形計量では、$\sqrt{-g_s}g_s^{ab}$ から共形因子が消えます。各半直線の空間微分を含む作用密度は

$$
\mathcal L_{s,x}=-\frac{\lambda_s}{2}(\partial_x\phi_s)^2
$$

です。空間部分を変分・部分積分すると、重力側の積分区間 $(-A,0)$ からは右端の負の項が出ます。浴側の $(0,A)$ では左端の符号が反転します。したがって接合面での寄与を合わせると

$$
\delta I_{\rm m}\big|_\Sigma
=\int du\,\left[-\lambda_G\partial_x\phi_G(u,0^-)
+\lambda_B\partial_x\phi_B(u,0^+)\right]\delta\phi(u,0).
$$

共通の界面変分は任意なので、括弧内が零となり、

$$
\lambda_G\partial_x\phi_G(u,0^-)
=\lambda_B\partial_x\phi_B(u,0^+).
$$

場の値も連続で境界まで $C^1$ なので、共通の境界値を $h(u)$ と置けば

$$
\partial_u\phi_G(u,0^-)=h'(u)=\partial_u\phi_B(u,0^+).
$$

右向き流束 $j_s=-\lambda_s\partial_u\phi_s\partial_x\phi_s$ に二条件を入れると

$$
\begin{aligned}
j_G(u,0^-)&=-h'(u)\lambda_G\partial_x\phi_G(u,0^-)\\
&=-h'(u)\lambda_B\partial_x\phi_B(u,0^+)
=j_B(u,0^+).
\end{aligned}
$$

[BHI17の保存式](../BHI17/index.md#prop-bhi17-interface-flux)と同じく左右のエネルギー収支を加えれば、界面項は $-j_G(u,0^-)+j_B(u,0^+)=0$ と相殺されます。
<!-- solution-end -->

<a id="ex-bhi22-b02"></a>

#### BHI22-B02 熱い浴での釣合い

- Level: B
- 問題: 出射が $P_{\rm out}=\pi c_{\rm m}T_H^2/12$、入射が $P_{\rm in}=\pi c_{\rm m}T_B^2/12$ と指定される。$T_H=2T_B$、$T_B>0$ のとき正味流束とエネルギーの増減を求め、$T_H=T_B$ の場合と比較せよ。

<!-- solution-start -->
**詳細解答。** 右向きを正にして $P=P_{\rm out}-P_{\rm in}=\pi c_{\rm m}(T_H^2-T_B^2)/12$。$T_H=2T_B$ なら $T_H^2-T_B^2=4T_B^2-T_B^2=3T_B^2$ なので $P=\pi c_{\rm m}T_B^2/4>0$、$\dot E=-P<0$。$T_H=T_B$ なら平方差は零なので $P=0,\dot E=0$ ですが、二つの片向き流束は各々 $\pi c_{\rm m}T_B^2/12>0$ です。流束そのものが消えるわけではありません。
<!-- solution-end -->

<a id="ex-bhi22-b03"></a>

#### BHI22-B03 二つの時間での流束

- Level: B
- 問題: 接合浴の固有時を $\tau=u/\varepsilon$（定数 $\varepsilon>0$）とし、$u$ に共役なエネルギーが $E_u(u)$、流束が $P_u=-dE_u/du$ とする。固有時のエネルギー $E_\tau$ と流束 $P_\tau$ を求め、保存式を確認せよ。

<!-- solution-start -->
**詳細解答。** 同じ位相の時間発展で $E_u\,du=E_\tau\,d\tau$ とするので、$u=\varepsilon\tau$、$du=\varepsilon d\tau$ を用いて $E_\tau=\varepsilon E_u$。連鎖律は $dE_\tau/d\tau=\varepsilon(dE_u/du)(du/d\tau)=\varepsilon^2 dE_u/du$。従って $P_\tau:=-dE_\tau/d\tau=\varepsilon^2P_u$ です。$\tau$ に移しても $dE_\tau/d\tau=-P_\tau$ となり、一方の時間だけ切り替えて係数を落とすのは誤りです。一定Weyl因子の浴で成分 $T_{\tau\tau}$ を計算しても、$du/d\tau=\varepsilon$ による二階テンソルの変換から同じ $\varepsilon^2$ が出ます。
<!-- solution-end -->

<a id="ex-bhi22-b04"></a>

#### BHI22-B04 エネルギーと時計の両立

- Level: B
- 問題: $C,k>0$、$[C]=L$、$[k]=L^{-1}$ として $E=Ck^2/2$ を指定する。基準長さ $L_*>0$ を用い、二階方程式 $y''-Ey/(2C)=0$ の二解を与え、その比を長さの次元の時計 $F$ としてSchwarzianを検算せよ。また、入射のない完全透過浴でこれが定常蒸発解になるか述べよ。

<!-- solution-start -->
**詳細解答。** $E/(2C)=k^2/4$ なので $y''-(k^2/4)y=0$。[局所境界時計の構成命題](#prop-bhi22-local-clock)に従い $y_1=L_*e^{ku/2}$、$y_2=e^{-ku/2}$ を取ると、二回微分で各々 $(k^2/4)y_i$ に戻り、$W=L_*k>0$ です。比 $F=L_*e^{ku}$ は長さの次元を持ち、$F'=L_*ke^{ku}>0$、$F''/F'=k$、$F'''/F'=k^2$。よって $\{F,u\}=k^2-\frac32k^2=-k^2/2=-E/C$。ただし[真空浴の減衰命題](#prop-bhi22-energy-decay)では $P=\gamma E>0$ と $\dot E=-P$ が必要です。今回の定数 $E>0$ は $\dot E=0$ なので両立しません。時計の幾何学的構成と放射付きの力学方程式は別です。
<!-- solution-end -->

### Level C：模型を作り、どの結論まで出せるか確かめる

<a id="ex-bhi22-c01"></a>

#### BHI22-C01 接合から冷却・浴の平衡まで

- Level: C
- 問題: $\ell,G_2,\Phi_r,\varepsilon,c_{\rm m}>0$ とする。接合面の正則化境界は $F(u)=u,Z(u)=\ell\varepsilon$ を基準とし、自由場の界面係数は $\lambda_G=\lambda_B$、量子状態は完全透過CFTの $p=F$ 出射真空とする（動力学に応じて $F$ は変化してよい）。境界エネルギー $E=-C\{F,u\}$、$C=\ell\Phi_r/(8\pi G_2)$、初期値 $E_0>0$ を与える。
  1. 基準境界の誘導計量、自由場の反射率と透過率を求めよ。
  2. 入射真空での出射流束 $P_{\rm out}$ と $\gamma$ を $C,c_{\rm m}$ から求め、$E(u)$ と準静的 $T_{\rm eff}(u)$ を計算せよ。
  3. 入射を一定温度 $T_B>0$ に変えた場合の $E(u)$ と平衡エネルギーを導け。
  4. 上の結果だけで $S_{\rm matter}(R,u)$ が時間とともに増え続ける、またはPage曲線を作ると結論してよいか。観測対象と追加データを明示して説明せよ。

<!-- solution-start -->
**詳細解答。** (1) 基準時計では $F'=1,Z'=0,Z=\ell\varepsilon>0$ で、接合面は時間的です。誘導計量は $i_G^*g_G=-\ell^2du^2/Z^2=-du^2/\varepsilon^2$、浴の $x=0$ 上も $i_B^*g_B=-du^2/\varepsilon^2$。$\lambda_G=\lambda_B$ を[透過率命題](#prop-bhi22-wave-transmission)に入れると $r=0,t=1$、$\mathcal R=0,\mathcal T=1$。基準の $F=u$ は $E=0$ の参照時計であり、$E_0>0$ の初期状態では境界時計を別の $F$ に変える必要があります。

(2) 出射状態は $p=F$ を満たします。[QCURV16の状態関数の座標変換と真空流束](../../QCURV/QCURV16/index.md#thm-qcurv16-state-transformation)を、基準真空の状態関数 $t_U=0$ と浴の定数共形因子に適用すると

$$
P_{\rm out}=-\frac{c_{\rm m}}{24\pi}\{F,u\}
=\frac{c_{\rm m}}{24\pi C}E.
$$

$\gamma=c_{\rm m}/(24\pi C)>0$ と置き、$\dot E=-P_{\rm out}$ を解くと $dE/E=-\gamma du$、よって $E(u)=E_0e^{-\gamma(u-u_0)}$。準静的に[BHI21の熱的エネルギー公式](../BHI21/index.md#prop-bhi21-thermal-thermodynamics) $E=2\pi^2CT_{\rm eff}^2$ を用いる場合に限って

$$
T_{\rm eff}(u)=\sqrt{\frac{E_0}{2\pi^2C}}\,
e^{-\gamma(u-u_0)/2}.
$$

$[C]=L$、$[\gamma]=L^{-1}$、$[P]=L^{-2}$ で整合します。

(3) 入射 $P_{\rm in}=\pi c_{\rm m}T_B^2/12$ を加えると、

$$
\dot E=-\gamma E+\frac{\pi c_{\rm m}}{12}T_B^2.
$$

$E_B=2\pi^2CT_B^2$ なら $\gamma E_B=P_{\rm in}$。差 $Y=E-E_B$ について $\dot Y=-\gamma Y$ だから、

$$
E(u)=E_B+(E_0-E_B)e^{-\gamma(u-u_0)}.
$$

$E_0=E_B$ のとき出射・入射が釣り合い、エネルギーは一定です。

(4) 今回計算したのは接合面の応力テンソルの一成分と、境界に共役なエネルギーの収支です。精細エントロピーは[BHI17の放射台帳](../BHI17/index.md#def-bhi17-radiation-ledger)のように**浴の観測領域 $R=[b,L]$、時刻、量子状態 $\rho_R^{(a)}(u)$、cutoff $a$、赤外条件**を指定して計算します。出射の局所流束だけでは $R$ の全相関関数は確定せず、放射を収集する領域の時刻依存や重力側のisland候補も未指定です。従って流束の正値性から $S_{\rm matter}(R,u)$ の単調性やPage転移を断定できません。
<!-- solution-end -->
