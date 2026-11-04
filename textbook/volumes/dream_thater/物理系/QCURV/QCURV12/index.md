# QCURV12 Schwarzschild散乱障壁と灰色体因子

<!-- definition-example-audit: strict -->

[QCURV11のHawking温度](../QCURV11/index.md#thm-qcurv11-thermal-ratio)は、崩壊時空の光線が指数的に圧縮されることから得られました。しかし、地平線近くで生まれた出射波は、そのまま遠方へ届くわけではありません。球面上の角運動量と時空の曲率が作る**動径方向の散乱障壁**で、一部は反射されます。

この章では障壁を通り抜ける割合を波の保存流から定め、遠方の粒子数・エネルギー流束へ組み込みます。背景は質量 $M>0$ の非回転・非荷電Schwarzschild外部 $r>2M$、場は質量零の実自由スカラー場、計量符号は $(-,+,+,+)$、単位は $\hbar=c=k_B=G=1$ です。無限遠で規格化した静止時刻を $t$、その正周波数を $\omega>0$ とします。量子状態は崩壊に対応する後期のin真空（入射側に外部からの粒子を加えない状態）を想定し、静的外部における線形散乱を用います。早期過渡や蒸発による背景の変化は無視できる時間尺度に限定します。

## 1. なぜ球面上の波が動径障壁を感じるのか

Schwarzschild計量と、その外部で $0<f(r)<1$ となる関数は

$$
\begin{aligned}
ds^2&=-f(r)\,dt^2+f(r)^{-1}dr^2+r^2d\Omega^2,\\
f(r)&=1-\frac{2M}{r},\qquad
d\Omega^2=d\theta^2+\sin^2\theta\,d\varphi^2
\end{aligned}
$$

です。[QCURV9の遠方時計とtortoise座標](../QCURV9/index.md#prop-qcurv9-arrival)を使い、$dr_*/dr=f^{-1}$ と置くと

$$
r_*=r+2M\log\left(\frac{r}{2M}-1\right),\qquad
\frac{d}{dr_*}=f(r)\frac{d}{dr}.
$$

地平線側 $r\downarrow2M$ は $r_*\to-\infty$、空間無限遠 $r\to\infty$ は $r_*\to+\infty$ に対応します。これは時間を変換したのではなく、波の動径伝播を比較しやすくする空間座標です。

[QCURV1のKlein–Gordon演算子](../QCURV1/index.md#def-qcurv1-kg-operator)は $P_g=-\Box_g+m^2+\xi R_g$ です。ここでは $m=0$ で、Schwarzschild真空解は $R_g=0$ なので、任意の $\xi$ に対して $\Box_g\phi=0$ へ帰着します。球面上の角度依存を表す[PDE11の球面調和関数](../../../解析系/PDE/PDE11/index.md#def-pde11-spherical-harmonic) $Y_{\ell m}$ は

$$
\Delta_{S^2}Y_{\ell m}=-\ell(\ell+1)Y_{\ell m},
\qquad \ell=0,1,\ldots,\quad m=-\ell,\ldots,\ell,
$$

を満たし、$\int_{S^2}|Y_{\ell m}|^2d\Omega=1$ に規格化します。$\Delta_{S^2}$ は単位球面のLaplace作用素です。各固定 $\ell$ で $m$ は $2\ell+1$ 個あり、球対称性のため動径方程式は $m$ に依存しません。$1/r$ の因子を分けるのは、動径一階微分を取り除くためです。

そこで、角度・時間を分離した一つの成分を

$$
\phi_{\omega\ell m}(t,r,\theta,\varphi)
=\frac{e^{-i\omega t}}{r}\psi_{\omega\ell}(r_*)Y_{\ell m}(\theta,\varphi)
$$

と書きます。$\psi$ は半径方向の複素振幅であって、$r$ そのものを表す記号ではありません。$\omega$ は未来無限遠のKilling時間 $t$ に共役な周波数です。

先の分離に現れる、位置によって変化する有効ポテンシャルを**動径散乱ポテンシャル**として導入します。角運動量に由来する項と、$\ell=0$ でも残る曲率由来の項を分けると、障壁の役割が見えてきます。

<a id="def-qcurv12-regge-wheeler-potential"></a>

<!-- formal-statement-start -->
> **定義（質量零スカラー場のSchwarzschild動径ポテンシャル）**
> $M>0$、$r>2M$、$\ell\in\mathbb Z_{\ge0}$ とする。Schwarzschild外部の質量零スカラー場に対し、$f(r)=1-2M/r$ を用いて

$$
\boxed{V_\ell(r)=f(r)\left[\frac{\ell(\ell+1)}{r^2}+\frac{2M}{r^3}\right]}
$$

> を動径散乱ポテンシャルとする。これは時間に依存しない実関数で、$r_*$ を通じて一次元散乱問題のポテンシャルとなる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv12-regge-wheeler-potential -->
### 直接例：角運動量零でも障壁は残る

$\ell=0$ を代入すると角運動量項は消えますが、

$$
V_0(r)=\frac{2M(r-2M)}{r^4}>0 \quad (r>2M)
$$

です。したがって定義の領域 $r>2M$ では有限で実数、地平線側でも無限遠でも零へ近づきます。微分は

$$
\frac{dV_0}{dr}=\frac{2M(8M-3r)}{r^5}
$$

なので $r=8M/3$ に山頂があり、

$$
V_0\left(\frac{8M}{3}\right)=\frac{27}{1024M^2}.
$$

**定義の確認**：$\ell=0$ と $r>2M$ の指定から、正値性・端点極限・有限の山頂まで具体的に確認しました。「角運動量零なら散乱しない」という予想は、$2M/r^3$ を落としてしまった場合の誤りです。
<!-- definition-example-end -->

<a id="thm-qcurv12-radial-equation"></a>

<!-- formal-statement-start -->
> **定理（球面調和分解と一次元動径方程式）**
> $M>0$ のSchwarzschild外部で、$\Box_g\phi=0$ を満たす滑らかな質量零スカラー場の分離成分を上の $\phi_{\omega\ell m}$ とし、$\omega>0$ とする。このとき $\psi_{\omega\ell}$ は

$$
\boxed{\frac{d^2\psi_{\omega\ell}}{dr_*^2}
+\bigl[\omega^2-V_\ell(r)\bigr]\psi_{\omega\ell}=0}
$$

> を満たす。逆に、この方程式を満たす十分滑らかな $\psi$ から作る分離成分は外部領域で波動方程式を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

波動演算子を時間・半径・球面へ分け、$Y_{\ell m}$ の固有値を代入します。$1/r$ の因子を微分した項が $f'(r)/r=2M/r^3$ を作り、$r_*$ への変換が残りの動径一階微分を吸収します。

<!-- proof-start -->
### 証明

上の計量を座標順 $(t,r,\theta,\varphi)$ で行列に表すと、対角成分は $-f,f^{-1},r^2,r^2\sin^2\theta$ です。従って行列式と体積密度は

$$
\det(g_{ab})=(-f)f^{-1}r^2(r^2\sin^2\theta)
=-r^4\sin^2\theta,\qquad
\sqrt{-\det g}=r^2\sin\theta.
$$

ここで $r>2M$ なので $f>0$ であり、通常の球座標範囲 $0<\theta<\pi$ では $\sin\theta>0$ です。[QCURV1の座標表示公式](../QCURV1/index.md#prop-qcurv1-kg-coordinate)をこの計量に適用し、

$$
\Box_g\phi=-f^{-1}\partial_t^2\phi
+\frac1{r^2}\partial_r(r^2f\partial_r\phi)
+\frac1{r^2}\Delta_{S^2}\phi
$$

を得ます。$\psi$ の $r$ 微分を一時的にプライムで表すと、

$$
\partial_r\left(\frac\psi r\right)=\frac{\psi'}r-\frac\psi{r^2},
\quad
\partial_r\left[r^2f\partial_r\left(\frac\psi r\right)\right]
=f'(r\psi'-\psi)+fr\psi''.
$$

これと $\partial_t^2e^{-i\omega t}=-\omega^2e^{-i\omega t}$、$\Delta_{S^2}Y_{\ell m}=-\ell(\ell+1)Y_{\ell m}$ を代入して共通因子 $e^{-i\omega t}Y_{\ell m}/r$ を除くと、

$$
\frac{\omega^2}{f}\psi+f\psi''+f'\psi'
-\frac{f'}r\psi-\frac{\ell(\ell+1)}{r^2}\psi=0.
$$

この式へ $f$ を掛けます。$d/dr_*=f\,d/dr$ から

$$
\frac{d^2\psi}{dr_*^2}=f^2\psi''+ff'\psi',
\qquad f'(r)=\frac{2M}{r^2}
$$

なので、動径二階微分と一次微分がまとまり、

$$
\frac{d^2\psi}{dr_*^2}
+\left[\omega^2-f\left(\frac{f'}r+\frac{\ell(\ell+1)}{r^2}\right)\right]\psi=0.
$$

[動径散乱ポテンシャルの定義](#def-qcurv12-regge-wheeler-potential)を代入すれば結論です。$r>2M$ では $f>0$ であり、$r$ と $r_*$ の微分関係も $1/r$ の掛け外しも可逆なので、逆も成り立ちます。$\square$
<!-- proof-end -->

この形なら、固定 $\ell$ ごとに「左から右へ進む一次元波が、局在した山で反射・透過する」という散乱問題になります。$V_\ell\to0$ は $r_*\to\pm\infty$ の両方で成り立ちます。ただし $\ell$ が大きいほど障壁の高さは上がるので、すべての角運動量を同じ透過率とみなせません。

## 2. 反射率と透過率を何で測るのか

静的な実ポテンシャルは正負の時間周波数を混合しません。しかし出射波の一部を反射するため、[QCURV11の熱的占有数](../QCURV11/index.md#thm-qcurv11-thermal-ratio)と遠方での粒子数の間に一段の計算が必要です。ここで扱うのは各固定 $\omega,\ell$ の定常散乱であり、崩壊が起こすBogoliubov混合そのものではありません。

$x=r_*$ と略記します。以後この節のプライム $\psi'$ と $\psi''$ は、それぞれ $d\psi/dx$ と $d^2\psi/dx^2$ を表します（第1節の $r$ 微分とは異なります）。$e^{-i\omega t}e^{-i\omega x}$ は $x$ の減少方向（地平線へ入る波）、$e^{-i\omega t}e^{+i\omega x}$ は増加方向（無限遠へ出る波）に伝わります。これを区別する保存流として

$$
J[\psi]:=\frac1{2i}
\left(\psi^*\frac{d\psi}{dx}-\psi\frac{d\psi^*}{dx}\right)
$$

を使います。単位振幅の右向き平面波では $J=+\omega$、左向きでは $J=-\omega$ です。異なる方向の重ね合わせでは交差項が相殺されるため、流束はそれぞれの絶対値二乗の差になります。

遠方から入る単位波の一部が反射され、残りが地平線へ吸収される境界条件をまず定めます。その透過確率は、時間反転した「地平線から遠方へ出る波」の透過確率と一致します。この等価性がHawking放射に使う根拠です。

<a id="def-qcurv12-greybody-factor"></a>

<!-- formal-statement-start -->
> **定義（Schwarzschildの灰色体因子）**
> $M>0$、$\omega>0$、$\ell\in\mathbb Z_{\ge0}$ とする。実ポテンシャル $V_\ell$ の動径方程式で、無限遠へ反射する波の振幅を $\mathcal R_\ell(\omega)$、地平線へ透過する波の振幅を $\mathcal T_\ell(\omega)$ と呼ぶ。in散乱解を、以下の漸近境界条件で規格化する。

$$
\begin{aligned}
\psi^{\mathrm{in}}_{\omega\ell}(x)&\sim
e^{-i\omega x}+\mathcal R_\ell(\omega)e^{+i\omega x}
&& (x\to+\infty),\\
\psi^{\mathrm{in}}_{\omega\ell}(x)&\sim
\mathcal T_\ell(\omega)e^{-i\omega x}
&& (x\to-\infty).
\end{aligned}
$$

> 入射**振幅**を1に規格化しており、入射流束の絶対値は $\omega$ である。地平線へ伝わる流束の絶対値は $\omega|\mathcal T_\ell|^2$ だから、その比

$$
\boxed{\Gamma_\ell(\omega):=|\mathcal T_\ell(\omega)|^2}
$$

> をこのモードの**灰色体因子**と定義する。$\Gamma_\ell$ は波の振幅ではなく無次元の透過確率である。
<!-- formal-statement-end -->

漸近記号 $\sim$ はここでは、端点で表示した平面波の和との差、およびその $x$ 微分の差がともに零へ向かうという散乱境界条件を表します。流束を端点で評価するときにも、この微分の条件を使います。

<!-- definition-example-start: def-qcurv12-greybody-factor -->
### 直接例：障壁のない比較模型

$V(x)=0$ を全実線で考え、右側から振幅1の左向き波を入れます。障壁がないので解は全域で

$$
\psi(x)=e^{-i\omega x}
$$

です。定義の両端の境界条件と比較すると

$$
\mathcal R=0,\qquad \mathcal T=1,\qquad
J_{+\infty}=J_{-\infty}=-\omega,\qquad
\Gamma=|\mathcal T|^2=1.
$$

**定義の確認**：入射振幅1、反射振幅零、透過振幅1、両端の流束比1という条件を個別に確認しました。これはSchwarzschildの動径ポテンシャルを零とした**比較模型**であり、実際の灰色体因子が常に1という主張ではありません。
<!-- definition-example-end -->

<a id="thm-qcurv12-flux-unitarity"></a>

<!-- formal-statement-start -->
> **定理（流束保存・相反性・透過確率の範囲）**
> 前の定義の実で時間非依存な $V_\ell$ と、両端で指定した入射・出射境界条件を満たす $\omega>0$ の散乱解について、

$$
\boxed{|\mathcal R_\ell(\omega)|^2
+|\mathcal T_\ell(\omega)|^2=1,\qquad
0\le\Gamma_\ell(\omega)\le1}
$$

> が成り立つ。また地平線側から振幅1の右向き波を入れたup散乱解の透過振幅は $\mathcal T_\ell(\omega)$ と等しい。従って灰色体因子は地平線側から無限遠へ届く出射波にも適用できる。
<!-- formal-statement-end -->

### 証明の見取り図

実ポテンシャルであるため $J$ の導関数が消えます。左右の端点で $J$ を評価すると確率保存が出ます。出射方向を逆にした透過振幅は、二つの散乱解のWronskian（一次独立性を測る $\psi_1\psi_2'-\psi_1'\psi_2$）を左右で評価して一致を示します。

<!-- proof-start -->
### 証明

動径方程式から $\psi''=(V_\ell-\omega^2)\psi$ です。$V_\ell-\omega^2$ は実数なので

$$
\frac{dJ}{dx}=\frac1{2i}(\psi^*\psi''-\psi\psi^{*''})
=\frac{V_\ell-\omega^2}{2i}(|\psi|^2-|\psi|^2)=0.
$$

in解の右端では右向きの反射波と左向きの入射波の流束が差し引かれ、

$$
J_{+\infty}=\omega(|\mathcal R_\ell|^2-1),
\qquad J_{-\infty}=-\omega|\mathcal T_\ell|^2.
$$

両端の等式を $\omega>0$ で割れば $|\mathcal R_\ell|^2+|\mathcal T_\ell|^2=1$ です。絶対値の二乗が非負なので範囲も得ます。

次にup解を

$$
\begin{aligned}
\psi^{\mathrm{up}}(x)&\sim e^{+i\omega x}
+\mathcal R^{\mathrm{up}}e^{-i\omega x}&&(x\to-\infty),\\
\psi^{\mathrm{up}}(x)&\sim \mathcal T^{\mathrm{up}}e^{+i\omega x}
&&(x\to+\infty)
\end{aligned}
$$

と定めます。二解のWronskian $W=\psi^{\rm in}(\psi^{\rm up})'-(\psi^{\rm in})'\psi^{\rm up}$ は、同じ二階方程式の解なので $W'=0$ です。左端では

$$
W_{-\infty}=W\bigl(\mathcal T_\ell e^{-i\omega x},
e^{+i\omega x}+\mathcal R^{\rm up}e^{-i\omega x}\bigr)
=2i\omega\mathcal T_\ell.
$$

右端でも同じ交差項だけが残り、

$$
W_{+\infty}=W\bigl(e^{-i\omega x}+\mathcal R_\ell e^{+i\omega x},
\mathcal T^{\rm up}e^{+i\omega x}\bigr)
=2i\omega\mathcal T^{\rm up}.
$$

ゆえに $\mathcal T^{\rm up}=\mathcal T_\ell$。地平線から出た波の透過率も $|\mathcal T_\ell|^2$ です。$\square$
<!-- proof-end -->

**仮定が効く場所**：ポテンシャルが複素数なら一般に $J'=0$ が破れます。背景が回転して地平線の角速度を持つ場合は、地平線で測る周波数が $\omega-m\Omega_H$ となり、負の地平線流束を伴う超放射があり得ます。したがって $\Gamma\in[0,1]$ の上の証明を回転・荷電場へ無条件には持ち込めません。

## 3. 低周波ではどのくらい透過するか

障壁の高さだけから透過率の数値は決まりません。波動方程式を境界条件付きで解く必要があります。低周波 $M\omega\ll1$ の $\ell=0$ については、地平線近く・中間域・遠方域の解を重ね合わせて先頭係数を導けます。これはすべての周波数に対する厳密解ではありません。

<a id="prop-qcurv12-swave-low-frequency"></a>

<!-- formal-statement-start -->
> **命題（質量零スカラーの低周波s波透過率）**
> Schwarzschild外部の $\ell=0$、$\omega>0$ のin散乱解を前節のように規格化する。$M\omega\downarrow0$ の重なり領域で近地平線解・零周波数解・遠方解を一致させると、先頭漸近係数は

$$
\boxed{\mathcal T_0(\omega)=-4iM\omega+o(M\omega),\qquad
\Gamma_0(\omega)=16M^2\omega^2+o((M\omega)^2)}
$$

> となる。ただし $\mathcal T_0$ の位相は $r_*$ の加法定数の取り方に依存し、透過**確率**の先頭係数 $16$ は依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

$R(r)=\psi(r)/r$ とすると、$\ell=0$ の零周波数方程式は積分できます。地平線側では「入ってゆく波」を小さい $\omega$ で展開し、遠方側では入射・反射波を展開します。共通領域 $2M\ll r\ll\omega^{-1}$ における反射振幅の極限と、$\psi=rR$ の $r$ に比例する先頭係数を照合します。$r_*$ の対数補正を落として $1/r$ の係数まで等置することはしません。

<!-- proof-start -->
### 証明（先頭次数の接続計算）

$R=\psi/r$ として[本章の動径方程式](#thm-qcurv12-radial-equation)の球面一定成分を使うと、$r$ での微分を $R'=dR/dr$ と書いて

$$
\frac{d}{dr}\left(r^2f\frac{dR}{dr}\right)
+\frac{\omega^2r^2}{f}R=0.
$$

$M\omega\ll1$ の中間領域では、先頭次数で第二項を落とした零周波数方程式を積分し、

$$
r^2f R'=K,\quad
R=C+\frac{K}{2M}\log f=:C+D\log f
$$

を得ます。近地平線のin条件 $\psi\sim\mathcal T_0e^{-i\omega r_*}$ と $r\simeq2M$、$r_*=2M\log f+O(M)$ から、加法定数に依存する位相を吸収した規格化では

$$
R\simeq\frac{\mathcal T_0}{2M}
\bigl(1-i\,2M\omega\log f\bigr).
$$

従って中間領域の係数は $C\simeq\mathcal T_0/(2M)$、$D\simeq-i\omega\mathcal T_0$ です。遠方寄りの中間領域では $\log f=-2M/r+O(M^2/r^2)$ なので

$$
R\simeq \frac{\mathcal T_0}{2M}
+\frac{2iM\omega\mathcal T_0}{r}.
$$

ここで $\psi=rR$ に戻すと、零周波数近似の先頭は $\psi\simeq (\mathcal T_0/(2M))r+2iM\omega\mathcal T_0$ です。他方、遠方のin解の平面波部分を $\omega r_*\ll1$ で展開すると

$$
\psi\simeq(1+\mathcal R_0)
+i\omega(\mathcal R_0-1)r_*,\qquad
r_*=r+2M\log\left(\frac r{2M}-1\right).
$$

したがって $\psi$ の遠方展開には、$r$ の項だけでなく $2iM\omega(\mathcal R_0-1)\log(r/(2M)-1)$ もあります。この対数は重なり領域で $\omega M|\log(r/M)|\ll1$ なら $O(1)$ の項に比べて小さくできますが、$1/r$ の係数を求めるときには無条件で捨てられません。また、遠方の平面波近似にはポテンシャルの尾からの補正があります。

まず二つの半径 $r,2r$ がともに重なり領域に入るように選び、両地点の波動関数の差を取ります。中間解と遠方の平面波部分はそれぞれ

$$
\begin{aligned}
\psi_{\rm mid}(2r)-\psi_{\rm mid}(r)&\simeq\frac{\mathcal T_0}{2M}r,\\
\psi_{\rm far}(2r)-\psi_{\rm far}(r)&\simeq
i\omega(\mathcal R_0-1)\{r_*(2r)-r_*(r)\}
\end{aligned}
$$

です。座標差は $r_*(2r)-r_*(r)=r+O(M)$ であり、ポテンシャルの遠方尾の補正も相対的に小さくなるので、先頭次数を照合すると

$$
\frac{\mathcal T_0}{2M}
=i\omega(\mathcal R_0-1)+o(\omega).
$$

[流束保存](#thm-qcurv12-flux-unitarity)から $|\mathcal R_0|\le1$ なので、まず $\mathcal T_0=O(M\omega)$ が従います。これを中間解へ戻すと $\psi=O(\omega r)=o(1)$ です。遠方解の $r$ に比例する項と対数項も重なり領域で零へ向かいます。

従って残る有界項は $1+\mathcal R_0=o(1)$、すなわち $\mathcal R_0\to-1$ でなければなりません。これを先ほどの係数式へ戻し、透過確率の定義を使うと

$$
\mathcal T_0=-4iM\omega+o(M\omega),\qquad
\Gamma_0=16M^2\omega^2+o((M\omega)^2).
$$

この先頭次数の接続は $2M\ll r\ll\omega^{-1}$ と $\omega M|\log(r/M)|\ll1$ を同時に満たす重なり域があることに依存し、反射振幅の次次数を決める主張ではありません。$\square$
<!-- proof-end -->

**この例で何が分かるか**：$V_0$ の山が有限でも、$\omega\to0$ では透過率は零へ落ちます。$\Gamma_0\sim16M^2\omega^2$ は、Hawkingの熱因子をそのまま遠方の強度と同一視してはいけないことを数値的に示します。有限の $\omega M$ や高い $\ell$ の係数を得るには動径方程式を数値的に解くのが自然です。

## 4. 地平線付近の熱因子は遠方でどう変わるか

Hawkingの粒子生成と静的散乱は作用が異なります。前者は正負周波数を混合し、後者は同じ $\omega,\ell,m$ の入射・反射・透過を結びます。遠方へ出る演算子を、地平線近くから出るモードの演算子 $a^{\rm hor}_{\omega\ell m}$ と、外部から入るモードの演算子 $a^{\rm in}_{\omega\ell m}$ で書くと、位相を適切に選んで

$$
b^{\rm out}_{\omega\ell m}
=\mathcal T_\ell a^{\rm hor}_{\omega\ell m}
+\mathcal R_\ell a^{\rm in}_{\omega\ell m}
$$

という単位的な散乱関係を考えられます。後期において入射側が真空で、二つのセクター間の交差期待値が消えるなら

$$
\langle b^{{\rm out}\dagger}b^{\rm out}\rangle
=|\mathcal T_\ell|^2
\langle a^{{\rm hor}\dagger}a^{\rm hor}\rangle.
$$

これは時間依存崩壊全体の厳密な演算子恒等式ではなく、静的外部の散乱と後期のHawking占有数を接続する近似です。

<a id="thm-qcurv12-greybody-flux"></a>

<!-- formal-statement-start -->
> **定理（灰色体因子付き遠方粒子数・エネルギー流束）**
> $M>0$ の非回転Schwarzschildブラックホールにおける質量零・自由スカラー場を考える。無限遠で規格化した後期出射波束について、(i) [QCURV11の後期Planck占有数](../QCURV11/index.md#prop-qcurv11-late-packet-planck)が成り立つ狭帯域・後期近似、(ii) 外部動径ポテンシャルによる定常・弾性散乱、(iii) 無限遠からの入射粒子がなく交差期待値が消える状態を仮定する。このとき $T_H=1/(8\pi M)$、$\omega>0$ に対して遠方の期待粒子数スペクトルは

$$
\boxed{\frac{d^2N}{dt\,d\omega}
=\frac1{2\pi}\sum_{\ell=0}^\infty
\frac{(2\ell+1)\Gamma_\ell(\omega)}
{e^{\omega/T_H}-1}}
$$

> であり、同じ近似で外向きの期待エネルギー流束は

$$
\boxed{\frac{d^2E}{dt\,d\omega}
=\frac{\omega}{2\pi}\sum_{\ell=0}^\infty
\frac{(2\ell+1)\Gamma_\ell(\omega)}
{e^{\omega/T_H}-1}.}
$$

> 十分な収束条件の下で $\omega$ 積分を行えば総遠方パワーを得る。この式は早期過渡、相互作用場、回転・荷電、フェルミ場、背景が大きく変わる蒸発終期までの普遍公式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

各 $(\omega,\ell,m)$ の熱的占有数に、[流束保存と相反性](#thm-qcurv12-flux-unitarity)で得た $\Gamma_\ell$ を掛けます。次に、波束一つ当たりの時間間隔 $2\pi/\epsilon$ と帯域幅 $\epsilon$ から、単位時間・単位角周波数当たりの波束密度 $1/(2\pi)$ を得ます。$m$ を足すと $2\ell+1$ 倍、エネルギーは一量子当たり $\omega$ です。

<!-- proof-start -->
### 証明

固定 $(\omega,\ell,m)$ について、静的散乱の式を展開すると

$$
\begin{aligned}
\langle b^\dagger b\rangle
={}&|\mathcal T_\ell|^2\langle a^{{\rm hor}\dagger}a^{\rm hor}\rangle
+|\mathcal R_\ell|^2\langle a^{{\rm in}\dagger}a^{\rm in}\rangle\\
&+\mathcal T_\ell^*\mathcal R_\ell
\langle a^{{\rm hor}\dagger}a^{\rm in}\rangle
+\mathcal R_\ell^*\mathcal T_\ell
\langle a^{{\rm in}\dagger}a^{\rm hor}\rangle.
\end{aligned}
$$

仮定 (iii) で後ろの三項が零です。[QCURV11の狭帯域・後期波束](../QCURV11/index.md#prop-qcurv11-late-packet-planck)について $\langle a^{{\rm hor}\dagger}a^{\rm hor}\rangle\simeq(e^{\omega/T_H}-1)^{-1}$ を使うと

$$
\langle b^\dagger b\rangle\simeq
\frac{\Gamma_\ell(\omega)}{e^{\omega/T_H}-1}.
$$

[QCURV11の後期波束](../QCURV11/index.md#prop-qcurv11-late-packet-planck)では、中心の出射零時刻は $u_n=2\pi n/\epsilon$ です。[QCURV9の出射零時刻](../QCURV9/index.md#prop-qcurv9-arrival)を遠方の一定半径 $R$ で使うと

$$
u=t-r_*(R),\qquad t_n=u_n+r_*(R).
$$

したがって到着時刻の中心間隔も $2\pi/\epsilon$ のままです。帯域幅 $\epsilon$ の波束をこの間隔で数えると、長い定常観測時間 $\Delta t$ に含まれる中心は約 $\Delta t\,\epsilon/(2\pi)$ 個です。単位時間・帯域幅当たりの個数は

$$
\frac{\Delta t\,\epsilon/(2\pi)}{\Delta t\,\epsilon}
=\frac1{2\pi}.
$$

固定 $\ell$ に対する $m=-\ell,\ldots,\ell$ の $2\ell+1$ モードは同じ $\Gamma_\ell$ と占有数を持つため足し合わせられます。最後に各量子の遠方Killingエネルギーを $\omega$ として掛けると二式を得ます。$T_H=\kappa/(2\pi)$ と [QCURV9の $\kappa=1/(4M)$](../QCURV9/index.md#prop-qcurv9-kappa)から $T_H=1/(8\pi M)$ です。$\square$
<!-- proof-end -->

### 直接検算：低周波の遠方スペクトル

最小角運動量 $\ell=0$ の寄与だけを取ります。[低周波のs波透過率](#prop-qcurv12-swave-low-frequency)と $e^{8\pi M\omega}-1=8\pi M\omega+O((M\omega)^2)$ より

$$
\begin{aligned}
\left.\frac{d^2N}{dt\,d\omega}\right|_{\ell=0}
&=\frac1{2\pi}\frac{\Gamma_0(\omega)}{e^{8\pi M\omega}-1}\\
&\sim\frac1{2\pi}\frac{16M^2\omega^2}{8\pi M\omega}
=\frac{M\omega}{\pi^2}\quad(\omega\downarrow0).
\end{aligned}
$$

熱分母単体は低周波で発散しますが、この部分波の遠方数スペクトルは零に向かいます。全角運動量和では、高 $\ell$ の透過抑制も考慮します。$d^2E/(dt\,d\omega)=\omega\,d^2N/(dt\,d\omega)$ なので、少なくともs波のエネルギースペクトルは $M\omega^2/\pi^2$ に比例します。式の $dt$ は遠方の時間 $t$ であり、地平線近くの静止観測者の固有時間ではありません。

## 5. どこまでがこの式の射程か

- **灰色体因子は熱因子の代用品ではない**：$T_H$ は指数光線写像の正負周波数混合に由来し、$\Gamma_\ell$ は外部の実ポテンシャルにおける透過確率です。通常は $\Gamma_\ell$ が $\omega$ に依存するため、遠方で完全な黒体スペクトルにはなりません。
- **状態を指定する必要がある**：無限遠から熱的な入射もあるHartle–Hawking平衡状態では、前節の「入射真空」という仮定が破れます。同じ外部障壁でも、遠方の正味流束は別の結果になります。
- **対象はスカラー・非回転です**：角運動量の足し上げは $(2\ell+1)$ ですが、スピンや偏極の自由度を勝手に掛けられません。Kerr背景の超放射、荷電場の化学ポテンシャル、フェルミ統計は別途導出が必要です。
- **背景は固定近似です**：放射による質量減少を入れるには半古典的逆作用が必要です。この章の静的散乱だけで蒸発終期や情報問題を説明したことにはなりません。

## 演習

### Level A：座標・障壁・保存流・縮退度

<a id="ex-qcurv12-a01"></a>
#### QCURV12-A01 tortoise座標と二つの端点
- Level: A
- 問題: $M>0$、$r>2M$、$f=1-2M/r$ とする。$dr_*/dr=f^{-1}$ を積分し、$d/dr_*=f\,d/dr$ を示せ。$r\downarrow2M$ と $r\to\infty$ で $r_*$ がどちらへ向かうか説明せよ。

<!-- solution-start -->
**詳細解答**：$f^{-1}=r/(r-2M)=1+2M/(r-2M)$ です。積分定数を $-2M\log(2M)$ に合わせると

$$
r_*=r+2M\log\left(\frac{r}{2M}-1\right).
$$

$dr/dr_*=f$ なので連鎖律から $d/dr_*=f\,d/dr$。地平線側は対数の引数が $0^+$ へ向かうので $r_*\to-\infty$、遠方は $r$ の一次項が対数より速く増えるので $r_*\to+\infty$ です。
<!-- solution-end -->

<a id="ex-qcurv12-a02"></a>
#### QCURV12-A02 s波ポテンシャルの山
- Level: A
- 問題: $M>0$、$r>2M$ で $V_0=2M(r-2M)/r^4$ の正値性、両端の極限、極大位置と最大値を求めよ。

<!-- solution-start -->
**詳細解答**：$r-2M>0$ だから $V_0>0$。$r\downarrow2M$ では分子が零に、$r\to\infty$ では $V_0\sim2M/r^3\to0$ になります。微分は

$$
V_0'=2M\left(-3r^{-4}+8Mr^{-5}\right)
=\frac{2M(8M-3r)}{r^5}.
$$

外部領域で符号は $r=8M/3$ の前で正、後で負です。そこへ代入すると $f=1/4$、$2M/r^3=27/(256M^2)$ なので $V_0=27/(1024M^2)$ です。
<!-- solution-end -->

<a id="ex-qcurv12-a03"></a>
#### QCURV12-A03 平面波の流束と符号
- Level: A
- 問題: $\omega>0$、$\psi=Ae^{-i\omega x}+Be^{+i\omega x}$ とする。ここでプライムは $d/dx$ とする。$J=(\psi^*\psi'-\psi\psi^{*'})/(2i)$ を直接計算し、$J=\omega(|B|^2-|A|^2)$ を示せ。

<!-- solution-start -->
**詳細解答**：$\psi'=-i\omega Ae^{-i\omega x}+i\omega Be^{i\omega x}$ です。$\psi^*\psi'$ の自己項は $-i\omega|A|^2+i\omega|B|^2$、交差項は $i\omega A^*Be^{2i\omega x}-i\omega B^*Ae^{-2i\omega x}$。$\psi\psi^{*'}$ にも同じ交差項が現れて差では消えます。自己項の差は $-2i\omega|A|^2+2i\omega|B|^2$ なので、$2i$ で割れば結論です。負号が「左向き」を意味します。
<!-- solution-end -->

<a id="ex-qcurv12-a04"></a>
#### QCURV12-A04 球面上の縮退度と部分和
- Level: A
- 問題: 球対称なスカラー場の固定 $\ell$ について、$m=-\ell,\ldots,\ell$ は何個あるか。ある $\omega>0$ で $\Gamma_0=1/2,\ \Gamma_1=1/4,\ \Gamma_2=0$ とし、それ以外の部分波の寄与を零と仮定したとき、$\sum_\ell(2\ell+1)\Gamma_\ell$ と遠方粒子数スペクトルを $T_H>0$ で表せ。

<!-- solution-start -->
**詳細解答**：整数を両端含めて数えると $\ell-(-\ell)+1=2\ell+1$ 個です。指定された部分和は

$$
1\cdot\frac12+3\cdot\frac14+5\cdot0
=\frac12+\frac34=\frac54.
$$

したがって [本章の流束公式](#thm-qcurv12-greybody-flux)に入れると

$$
\frac{d^2N}{dt\,d\omega}
=\frac5{8\pi}\frac1{e^{\omega/T_H}-1}.
$$

一モードの平均粒子数に単純に $3$ を掛けるのは $\ell=1$ の寄与だけに対して正しく、全 $\ell$ に同じ縮退度を使ってはいけません。
<!-- solution-end -->

### Level B：微分方程式から散乱を再構成する

<a id="ex-qcurv12-b01"></a>
#### QCURV12-B01 波動演算子から動径方程式へ
- Level: B
- 問題: Schwarzschild外部 $f=1-2M/r$ で $\Box_g\phi=0$ とする。$\phi=e^{-i\omega t}Y_{\ell m}\psi(r)/r$、$\Delta_{S^2}Y_{\ell m}=-\ell(\ell+1)Y_{\ell m}$ を用いて、$d^2\psi/dr_*^2+[\omega^2-f(\ell(\ell+1)/r^2+2M/r^3)]\psi=0$ を導け。$d/dr_*=f\,d/dr$ とする。

<!-- solution-start -->
**詳細解答**：[QCURV1の座標演算子](../QCURV1/index.md#prop-qcurv1-kg-coordinate)をこの計量に適用すると

$$
\Box_g=-f^{-1}\partial_t^2+r^{-2}\partial_r(r^2f\partial_r)
+r^{-2}\Delta_{S^2}.
$$

ここで $r^2f\partial_r(\psi/r)=f(r\psi'-\psi)$ なので、さらに微分すると

$$
\partial_r\{f(r\psi'-\psi)\}=f'(r\psi'-\psi)+fr\psi''.
$$

時間・角度成分を代入して共通因子を除き、$f$ を掛けると

$$
\omega^2\psi+f^2\psi''+ff'\psi'
-f\left(\frac{f'}r+\frac{\ell(\ell+1)}{r^2}\right)\psi=0.
$$

$f^2\psi''+ff'\psi'=d^2\psi/dr_*^2$ と $f'=2M/r^2$ を使えば指定式です。周波数は固定パラメータであり、$1/r$ の微分が曲率項を作ることを確認します。
<!-- solution-end -->

<a id="ex-qcurv12-b02"></a>
#### QCURV12-B02 散乱の相反性をWronskianで示す
- Level: B
- 問題: 実関数 $V(x)\to0$（$x\to\pm\infty$）に対し $\psi''+(\omega^2-V)\psi=0$、$\omega>0$ とする。プライムは $d/dx$ とする。右からのin解を $\psi^{\rm in}\sim e^{-i\omega x}+R e^{i\omega x}$（右端）、$T e^{-i\omega x}$（左端）、左からのup解を $\psi^{\rm up}\sim e^{i\omega x}+R_u e^{-i\omega x}$（左端）、$T_u e^{i\omega x}$（右端）と規格化する。$W=\psi^{\rm in}(\psi^{\rm up})'-(\psi^{\rm in})'\psi^{\rm up}$ により $T=T_u$ を示せ。

<!-- solution-start -->
**詳細解答**：二つの解は共に $\psi''=(V-\omega^2)\psi$ を満たします。したがって

$$
W'=\psi^{\rm in}(\psi^{\rm up})''
-(\psi^{\rm in})''\psi^{\rm up}=0.
$$

左端では $R_u e^{-i\omega x}$ はin解と同じ進行方向なのでWronskianへの寄与は零です。一方、逆向きの二波について

$$
W(Te^{-i\omega x},e^{i\omega x})=2i\omega T.
$$

右端でも反射項の寄与が零になり、$W(e^{-i\omega x},T_ue^{i\omega x})=2i\omega T_u$ を得ます。保存されたWronskianの両端の値を比較すると $2i\omega T=2i\omega T_u$。$\omega>0$ なので $T=T_u$ です。
<!-- solution-end -->

<a id="ex-qcurv12-b03"></a>
#### QCURV12-B03 低周波s波の係数接続
- Level: B
- 問題: $M\omega\ll1$、$\ell=0$ で、中間領域の零周波数解が $R=C+D\log(1-2M/r)$（$R=\psi/r$）となることを示せ。地平線では $R\sim(\mathcal T/(2M))(1-i2M\omega\log f)$、遠方では $\psi\sim e^{-i\omega r_*}+\mathcal R_s e^{i\omega r_*}$ とする。$\mathcal R_s$ は反射振幅、$\mathcal T$ は透過振幅である。$r_*-r$ の対数補正に注意し、重なり領域で $\mathcal R_s\to-1$ と $\mathcal T\sim-4iM\omega$ を導き、$\Gamma_0\sim16M^2\omega^2$ を得よ。

<!-- solution-start -->
**詳細解答**：静的な方程式は $(r^2 f R')'=0$ です。$r^2f=r(r-2M)$ なので $R'=K/[r(r-2M)]$ を部分分数にすると

$$
R'=\frac{K}{2M}\left(\frac1{r-2M}-\frac1r\right),\qquad
R=C+\frac K{2M}\log f.
$$

地平線の形から $C\simeq\mathcal T/(2M)$、$D\simeq-i\omega\mathcal T$。遠方寄りの重なり領域では $\log f=-2M/r+O(M^2/r^2)$ なので

$$
\psi=rR\simeq\frac{\mathcal T}{2M}r+2iM\omega\mathcal T.
$$

遠方の入射・反射波を $\omega r_*\ll1$ で展開すると $\psi\simeq(1+\mathcal R_s)+i\omega(\mathcal R_s-1)r_*$。二つの重なり半径 $r,2r$ の差を取れば、$r_*(2r)-r_*(r)=r+O(M)$ なので、$r$ に比例する先頭項は

$$
\frac{\mathcal T}{2M}=i\omega(\mathcal R_s-1)+o(\omega).
$$

[流束保存](#thm-qcurv12-flux-unitarity)から $|\mathcal R_s|\le1$ だから $\mathcal T=O(M\omega)$ です。これを中間解へ戻すと $\psi=O(\omega r)=o(1)$、遠方展開の $i\omega(\mathcal R_s-1)r_*$ も $o(1)$ なので、$1+\mathcal R_s=o(1)$。ゆえに

$$
\mathcal T\sim-4iM\omega,
\qquad \Gamma_0=|\mathcal T|^2\sim16M^2\omega^2.
$$

$r_*/r\to1$ だけから $1/r$ の係数を等置することはできません。$2M\ll r\ll\omega^{-1}$ の重なり域で、先頭次数だけを照合しました。
<!-- solution-end -->

<a id="ex-qcurv12-b04"></a>
#### QCURV12-B04 赤外極限とエネルギーの重み
- Level: B
- 問題: $M>0$、$T_H=1/(8\pi M)$ で、s波に $\Gamma_0=16M^2\omega^2+o(\omega^2)$ を用いる。$\omega\downarrow0$ で $d^2N_0/(dt\,d\omega)$ と $d^2E_0/(dt\,d\omega)$ の先頭項を計算し、熱分母だけを使う場合との違いを説明せよ。

<!-- solution-start -->
**詳細解答**：$e^{8\pi M\omega}-1=8\pi M\omega+O(\omega^2)$ だから

$$
\frac{d^2N_0}{dt\,d\omega}
=\frac1{2\pi}\frac{16M^2\omega^2+o(\omega^2)}
{8\pi M\omega+O(\omega^2)}
=\frac{M\omega}{\pi^2}+o(\omega).
$$

一量子のエネルギー $\omega$ を掛ければ

$$
\frac{d^2E_0}{dt\,d\omega}
=\frac{M\omega^2}{\pi^2}+o(\omega^2).
$$

熱因子だけは $1/(8\pi M\omega)$ に発散しますが、s波の透過率が $\omega^2$ で零へ向かうので遠方の数・エネルギーのスペクトルはそれぞれ $\omega,\omega^2$ で零へ向かいます。
<!-- solution-end -->

### Level C：Hawking生成と散乱の二段階をつなぐ

<a id="ex-qcurv12-c01"></a>
#### QCURV12-C01 後期波束・透過率・遠方パワー
- Level: C
- 問題: $M>0$ のSchwarzschild外部で、質量零の実自由スカラー場と無限遠からの入射真空を仮定する。後期狭帯域波束の幅を $\epsilon>0$、帯域を $[j\epsilon,(j+1)\epsilon]$、中心間隔を $2\pi/\epsilon$ とする。地平線付近の平均占有数と、各部分波の透過率は次で与えられる。

$$
n_H(\omega)=\frac1{e^{8\pi M\omega}-1},
\qquad
\Gamma_\ell(\omega)=|\mathcal T_\ell(\omega)|^2.
$$

  角度依存は球面調和関数で分離し、各固定 $\ell$ の動径ポテンシャルは実・時間非依存とする。$\mathcal R_\ell$ は入射振幅を1とした反射振幅とする。

  1. 保存流から $\Gamma_\ell=1-|\mathcal R_\ell|^2$ を示し、反射が生成温度を変えるわけではない理由を述べよ。
  2. $m$ の縮退度と波束密度を数え、遠方の粒子数とエネルギーのスペクトルを導け。
  3. $\Gamma_0(\omega)\sim16M^2\omega^2$ を用いて低周波s波の二つのスペクトルを求め、$\Gamma_\ell=1$ と置く近似の問題点を説明せよ。
  4. 遠方から熱的入射がある場合、また背景が回転する場合に、どの仮定を再検討する必要があるか述べよ。

<!-- solution-start -->
**詳細解答**：

**（1）** $J=\operatorname{Im}(\psi^*\psi')$ のプライムは $d/dx$、$x=r_*$ です。[動径方程式](#thm-qcurv12-radial-equation)から $J'=\operatorname{Im}[(V_\ell-\omega^2)|\psi|^2]=0$。右端は $J=\omega(|\mathcal R_\ell|^2-1)$、左端は $J=-\omega|\mathcal T_\ell|^2$ です。従って $\Gamma_\ell=|\mathcal T_\ell|^2=1-|\mathcal R_\ell|^2$。これは同じ周波数での弾性散乱で、[Hawkingの熱因子](../QCURV11/index.md#thm-qcurv11-thermal-ratio)を生む正負周波数混合とは異なります。

**（2）** 固定 $\ell$ の $m$ は $2\ell+1$ 個です。帯域 $\epsilon$、中心間隔 $2\pi/\epsilon$ だから、単位時刻・単位角周波数幅の波束数は

$$
\frac1\epsilon\frac{\epsilon}{2\pi}=\frac1{2\pi}.
$$

[散乱の相反性](#thm-qcurv12-flux-unitarity)で地平線側からの透過率も $\Gamma_\ell$ です。入射真空なら一波束の遠方占有数は $\Gamma_\ell n_H$。従って

$$
\frac{d^2N}{dt\,d\omega}
=\frac1{2\pi}\sum_{\ell\ge0}
\frac{(2\ell+1)\Gamma_\ell(\omega)}{e^{8\pi M\omega}-1},
\quad
\frac{d^2E}{dt\,d\omega}=\omega\frac{d^2N}{dt\,d\omega}.
$$

**（3）** $\ell=0$ に限り分母を $8\pi M\omega+O(\omega^2)$ と展開すると

$$
\frac{d^2N_0}{dt\,d\omega}\sim\frac{M\omega}{\pi^2},
\qquad
\frac{d^2E_0}{dt\,d\omega}\sim\frac{M\omega^2}{\pi^2}.
$$

$\Gamma_\ell=1$ では低周波s波の抑制が失われます。さらに高 $\ell$ を無制限に足すと収束しないので、実際の障壁を無視した全部分波和は物理的なスペクトルになりません。

**（4）** 熱的入射があると $\langle a^{{\rm in}\dagger}a^{\rm in}\rangle=0$ という仮定が消え、反射した入射成分と正味の外向き流束を合わせて計算し直します。回転する背景では、地平線を通るモードのエネルギーが $\omega-m\Omega_H$ に変わるため、ここでの単純な非負流束比・正の占有数分母をそのまま使えません。
<!-- solution-end -->

ここまでで、地平線近傍のHawking生成と遠方の強度を分けて計算できました。次にブラックホールの代表的量子状態を比較すると、**同じ幾何・同じ障壁でも、どのモードを真空とするかで遠方流束と地平線正則性が変わる**ことが見えてきます。
