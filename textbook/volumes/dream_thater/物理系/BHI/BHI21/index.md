# BHI21 境界モードとSchwarzian力学

<!-- definition-example-audit: strict -->

## 1. 境界の時計が動くと何が変わるか

[BHI19のJT作用](../BHI19/index.md#def-bhi19-jt-action)は、二次元の曲率を一定の負値に固定する一方、境界にdilatonと外部曲率の積を持ちます。[BHI20の静的ブラックホール](../BHI20/index.md#def-bhi20-static-patch)では地平線半径を変えるだけで温度とエネルギーが変わりました。今回は**境界の時計を再パラメータ化したとき、境界作用がどのような一次元力学を生むか**を調べます。

浴への放射を計算する際には、重力領域の境界が浴の時刻に対してどう動くかを記述する変数が必要です。その変数を境界曲線の時間座標 $F(u)$ として導入します。本講では真空JTの境界力学を導出し、熱的解のエネルギーを求めます。その値は[JTブラックホール族の第一法則と比熱](../BHI20/index.md#prop-bhi20-first-law)から得たエネルギーと係数まで照合します。浴の透過境界条件と具体的な放射流束は次講で固定します。

計算は $\hbar=k_{\rm B}=1$、$\ell,G_2>0$、$(-,+)$ のLorentz符号で行い、境界の計算時だけEuclid化します。$G_2$ とdilaton $\Phi$ は無次元です。長さの次元を持つ固有時刻座標を $u$、無次元の小さなcutoffを $\varepsilon>0$ とします。Euclid作用には上付き $E$、Lorentz時間には $t$ を付け、両者を混同しません。

## 2. 正則化したAdS境界を曲線として動かす

曲率が $-2/\ell^2$ のEuclid AdS$_2$ のPoincaréパッチを、$z>0$ で

$$
ds_E^2=\frac{\ell^2}{z^2}(dx^2+dz^2)
$$

とします。境界の候補は $u\mapsto(x,z)=(F(u),Z(u))$ で、$F'(u)>0$、$Z(u)>0$ の滑らかな曲線です。プライムはこの節では $u$ 微分を表します。固定する境界データは**誘導線素**と**dilatonの値**です。

<a id="def-bhi21-regulated-boundary"></a>

<!-- formal-statement-start -->
> **定義（JTの正則化境界と再パラメータ化）**
>
> $\ell,G_2,\Phi_r>0$ とする。$u$ の有限区間または滑らかに貼り合わせた円周上で、$F\in C^4$、$F'>0$ の局所座標表示と $Z>0$ を取り、$z\ge Z(u)$ 側を重力領域とする。正則化境界は、$\varepsilon\downarrow0$ において誘導線素と境界dilatonが
>
$$
h_{uu}=\frac{\ell^2}{Z^2}(F'^2+Z'^2)
=\frac{1}{\varepsilon^2},
\qquad
\Phi\big|_{\partial M}=\frac{\Phi_r}{\varepsilon}
$$
>
> となるように指定した曲線である。$F$ を境界時間の再パラメータ化変数、$\Phi_r$ を固定した繰り込まれた境界dilatonとする。
<!-- formal-statement-end -->

この正規化では $u$ は長さ、$F,Z$ も長さ、$\Phi_r$ は無次元です。$ds=du/\varepsilon$ は境界の**固有長**であり、$dF$ と同じものではありません。$F$ が変わると $Z$ も変わらなければ誘導計量を固定できません。

<!-- definition-example-start: def-bhi21-regulated-boundary -->
**定義の確認**：最初に $F(u)=u$、$Z(u)=\ell\varepsilon$ と取ります。$F'=1$、$Z'=0$ であり、$\ell^2(F'^2+Z'^2)/Z^2=1/\varepsilon^2$ が**厳密に**成り立ちます。曲線の内側は $z\ge\ell\varepsilon$、外側は $z<\ell\varepsilon$ です。境界dilatonを $\Phi_r/\varepsilon$ に固定すると、計量の条件とdilatonの条件は別々に満たされています。たとえば $\Phi_r=2$、$\varepsilon=1/100$ なら境界値は200です。
<!-- definition-example-end -->

一般の $F$ では誘導計量の等式から

$$
Z^2=\ell^2\varepsilon^2(F'^2+Z'^2)
$$

を得ます。$F'>0$、各導関数がcutoff極限で一様に有界であり、境界が滑らかな漸近展開を許すと仮定します。$Z=O(\varepsilon)$ とおくと $Z'=O(\varepsilon)$ です。まず $Z=\ell\varepsilon F'+O(\varepsilon^3)$、次にこれを右辺の $Z'^2$ に代入すると

$$
\begin{aligned}
Z&=\ell\varepsilon F'\sqrt{1+\frac{Z'^2}{F'^2}}\\
&=\ell\varepsilon F'\left[1+\frac{\ell^2\varepsilon^2}{2}
\left(\frac{F''}{F'}\right)^2+O(\varepsilon^4)\right]\\
&=\ell\varepsilon F'+\frac{\ell^3\varepsilon^3}{2}
\frac{F''^2}{F'}+O(\varepsilon^5).
\end{aligned}
$$

この展開は $F'$ が0から離れた滑らかな区間で成り立ちます。$F'$ が0になる曲線に適用してはいけません。

## 3. Schwarzian微分と境界の曲がり方

曲線の外部曲率を展開すると、$F$ の三階微分までを含む特別な組合せが現れます。これは[QCURV16で定義したSchwarzian微分](../../QCURV/QCURV16/index.md#def-qcurv16-schwarzian)です。そこでの光線座標 $p(u)$ を、今度は**JT重力の境界座標** $F(u)$ に置き換えて使用します。

$$
\{F,u\}=\frac{F'''(u)}{F'(u)}
-\frac32\left(\frac{F''(u)}{F'(u)}\right)^2.
$$

$F\in C^3$ かつ $F'>0$ の区間で定義できます。物理的な役割は異なりますが、微分の組合せ自体は既習のものと同じです。

**直接計算**：$F(u)=u$ なら $F'=1,F''=F'''=0$ なので $\{F,u\}=0$。$F(u)=e^{ku}$（$k>0$）なら $F'=ke^{ku}>0$、$F''/F'=k$、$F'''/F'=k^2$ より $\{F,u\}=-k^2/2$ です。導関数の非零条件と三階微分の存在をともに確かめました。

### 曲線の外部曲率を計算する

$u$ 方向のEuclid接ベクトルは $(F',Z')$、そのEuclid座標上の長さを $v=\sqrt{F'^2+Z'^2}$ と書きます。重力領域を $z\ge Z$ と取ったので、外向きの単位法線は

$$
n^x=\frac{Z Z'}{\ell v},\qquad
n^z=-\frac{Z F'}{\ell v}.
$$

実際、$g_{\mu\nu}n^\mu n^\nu=(\ell^2/Z^2)(Z^2v^2/\ell^2v^2)=1$、接ベクトルとの内積は $0$、$F'>0$ なら $n^z<0$ です。[BHI19で採用した外向き曲率の規約](../BHI19/index.md#def-bhi19-jt-action) $K=\nabla_\mu n^\mu$ に従い、単位接ベクトルの共変加速度の法線射影を取ると

$$
K=\frac{F'(F'^2+Z'^2)+Z(F'Z''-Z'F'')}
{\ell(F'^2+Z'^2)^{3/2}}
$$

となります。水平線 $F=u,Z=\ell\varepsilon$ では $K=1/\ell$ です。

<a id="prop-bhi21-extrinsic-schwarzian"></a>

<!-- formal-statement-start -->
> **命題（正則化境界の外部曲率展開）**
>
> Euclid AdS$_2$ の計量 $\ell^2(dx^2+dz^2)/z^2$（$\ell>0$）上で、[正則化境界](#def-bhi21-regulated-boundary)を取る。$F\in C^4$、$F'>0$ が0から離れ、滑らかな一様cutoff展開が成り立つ区間では、外向き外部曲率が
>
$$
K=\frac1\ell+\ell\varepsilon^2\{F,u\}+O(\varepsilon^4)
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

誘導計量の固定条件から $Z=\ell\varepsilon F'+O(\varepsilon^3)$ を得て、$K$ の分子と分母をそれぞれ $\varepsilon^2$ まで展開します。分子の $F'Z'^2$ と $-ZZ'F''$ が相殺し、三階微分と二階微分の二乗がSchwarzianの係数で残ります。

<!-- proof-start -->
### 証明

$Z=\ell\varepsilon F'+O(\varepsilon^3)$ だから

$$
Z'=\ell\varepsilon F''+O(\varepsilon^3),\qquad
Z''=\ell\varepsilon F'''+O(\varepsilon^3).
$$

外部曲率の分子を $N$、分母の $\ell$ を除いた部分を $D$ とすると

$$
\begin{aligned}
N&=F'^3+F'Z'^2+ZF'Z''-ZZ'F''\\
&=F'^3+\ell^2\varepsilon^2F'F''^2
+\ell^2\varepsilon^2F'^2F'''
-\ell^2\varepsilon^2F'F''^2+O(\varepsilon^4)\\
&=F'^3+\ell^2\varepsilon^2F'^2F'''+O(\varepsilon^4).
\end{aligned}
$$

$F'>0$ を使って $D$ を正のべきで展開すると

$$
\begin{aligned}
D&=(F'^2+Z'^2)^{3/2}
=F'^3\left[1+\frac{\ell^2\varepsilon^2F''^2}{F'^2}+O(\varepsilon^4)\right]^{3/2}\\
&=F'^3\left[1+\frac{3\ell^2\varepsilon^2}{2}
\frac{F''^2}{F'^2}+O(\varepsilon^4)\right].
\end{aligned}
$$

したがって $K=N/(\ell D)$ の比を展開し

$$
\begin{aligned}
K&=\frac1\ell\left[1+\ell^2\varepsilon^2\frac{F'''}{F'}
-\frac{3\ell^2\varepsilon^2}{2}\left(\frac{F''}{F'}\right)^2
+O(\varepsilon^4)\right]\\
&=\frac1\ell+\ell\varepsilon^2\{F,u\}+O(\varepsilon^4)
\end{aligned}
$$

を得ます。ここでは $F'$ の下界があるので、逆数とTaylor展開が一様に使えます。$\square$
<!-- proof-end -->

直接の非定常例として、有限区間で $F(u)=u+qu^3$（$q>0$、単位は長さの逆二乗）を選びます。$F'=1+3qu^2>0$ です。$u=0$ において $F''=0,F'''=6q$ なので $\{F,0\}=6q$、したがって $K(0)=1/\ell+6q\ell\varepsilon^2+O(\varepsilon^4)$。境界時計の曲がりが外部曲率の有限部分を変えることが見えます。

## 4. Schwarzian作用がJTの境界から出る

Euclid化した[BHI19の動的作用と反項](../BHI19/index.md#def-bhi19-jt-action)を考えます。真空で[BHI19の曲率方程式](../BHI19/index.md#prop-bhi19-curvature-eom) $R=-2/\ell^2$ を満たす幾何ではbulkの $\Phi(R+2/\ell^2)$ が消えます。残る動的な境界部分は

$$
I_{\partial}^{E}
=-\frac1{8\pi G_2}\int_{\partial M}ds\,
\Phi\left(K-\frac1\ell\right).
$$

第2節の境界データ $ds=du/\varepsilon$ と $\Phi=\Phi_r/\varepsilon$、および[外部曲率展開](#prop-bhi21-extrinsic-schwarzian)を代入します。

<a id="prop-bhi21-effective-action"></a>

<!-- formal-statement-start -->
> **命題（真空JTのSchwarzian有効作用）**
>
> $\ell,G_2,\Phi_r>0$ とし、Euclid AdS$_2$ の正則化境界が $h_{uu}=\varepsilon^{-2}$、$\Phi_b=\Phi_r/\varepsilon$ を満たすとする。bulkの真空JT方程式を課し、上記の標準反項と固定境界データを使う。境界再パラメータ化 $F$ のcutoff極限で、動的作用の有限部分は
>
$$
I_{\rm Sch}^{E}[F]=-C\int du\,\{F,u\},
\qquad C:=\frac{\ell\Phi_r}{8\pi G_2}>0
$$
>
> となる。位相がEuclid円板の場合の全古典鞍点作用には別に $-S_0$（$S_0=\Phi_0/(4G_2)$）が加わる。
<!-- formal-statement-end -->

### 証明の見取り図

bulk作用が場の方程式上で0になること、境界の $K-1/\ell$ が $\varepsilon^2$ の大きさであることを使います。境界の固有長とdilatonはそれぞれ $\varepsilon^{-1}$ なので、二つを掛けると有限のSchwarzian項だけが残ります。

<!-- proof-start -->
### 証明

曲率方程式により、動的bulk被積分因子は $\Phi(R+2/\ell^2)=0$ です。境界では

$$
ds\,\Phi\left(K-\frac1\ell\right)
=\frac{du}{\varepsilon}\frac{\Phi_r}{\varepsilon}
\left[\ell\varepsilon^2\{F,u\}+O(\varepsilon^4)\right]
=\ell\Phi_r\{F,u\}\,du+O(\varepsilon^2)\,du.
$$

区間長と $F$ の導関数が一様に制御される場合、積分した余項も $O(\varepsilon^2)$ で消えます。よって動的境界項の極限は $-(\ell\Phi_r/(8\pi G_2))\int du\{F,u\}$ です。位相項は[BHI19のEuclid位相作用](../BHI19/index.md#prop-bhi19-topology)から $-S_0\chi$ であり、円板では $\chi=1$ です。$\square$
<!-- proof-end -->

ここでの $C$ は長さの次元を持ちます。$[C][du][\{F,u\}]=L\cdot L\cdot L^{-2}=1$ で作用は無次元です。$C>0$ は固定した正の境界dilatonに対応します。

### 先行する静的解との係数の接続

[BHI20の静的パッチ](../BHI20/index.md#def-bhi20-static-patch)は大きな半径で $\Phi=ar/\ell$ です。$r\sim\ell^2/z$ の漸近座標と $z=\ell\varepsilon$ の水平境界を使うと

$$
\Phi_b\sim\frac{a\ell}{z}=\frac{a}{\varepsilon}.
$$

したがって同じ漸近dilaton傾きの規格化では $\Phi_r=a$、すなわち

$$
C=\frac{a\ell}{8\pi G_2}.
$$

この対応は境界時刻を固定する解の族に関するもので、有限cutoffで任意の座標変換をしてもエネルギーが変わらないという主張ではありません。

## 5. なぜ三つの変換が同じ境界幾何を表すか

[QCURV16のSchwarzian合成則](../../QCURV/QCURV16/index.md#prop-qcurv16-schwarzian-chain)では、分数線形写像を合成した場合の微分を既に計算しました。今回はこの写像を、AdS$_2$ の境界座標 $F$ の貼り替えとして使います。作用する座標と向きを限定して定義します。

<a id="def-bhi21-projective-boundary-transform"></a>

<!-- formal-statement-start -->
> **定義（JT境界の射影変換）**
>
> 区間 $J$ 上の局所境界座標 $F\in C^3(J)$ が $F'>0$ を満たすとする。実係数 $a,b,c,d$ が各点で次の条件を満たすものを選ぶ。
>
$$
ad-bc>0,\qquad cF(u)+d\ne0\quad(u\in J).
$$
>
> このとき、$F$ に作用する**JT境界の射影変換**を次で定める。
>
$$
M(y)=\frac{ay+b}{cy+d},\qquad \widetilde F(u)=M(F(u)).
$$
>
> ここで係数の単位は $M(F)$ が境界座標と同じ長さの次元を持つよう選ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi21-projective-boundary-transform -->
**定義の確認**：長さ定数 $L>0$ に対し $u>0$、$F(u)=u$、$M(y)=L(y+L)/(y+2L)$ とします。係数は $a=L,b=L^2,c=1,d=2L$ なので $ad-bc=2L^2-L^2=L^2>0$、分母は $F(u)+2L=u+2L>0$。さらに $\widetilde F'(u)=L^2/(u+2L)^2>0$ です。新旧座標はいずれも長さの次元を持ち、写像は指定した区間で滑らかで向きも保ちます。
<!-- definition-example-end -->

この境界座標の取り換えが、Schwarzian作用を変えないことを示します。

<a id="prop-bhi21-projective-action"></a>

<!-- formal-statement-start -->
> **命題（JT境界Schwarzian作用の射影変換不変性）**
>
> $C>0$、局所Poincaré座標 $F\in C^3(J)$、$F'>0$ とし、開区間 $J$ 上の境界作用を
>
$$
I^E_{\rm Sch}[F]=-C\int_J \{F,u\}\,du
$$
>
> とする。実係数 $a,b,c,d$ に対して、区間の全点 $u\in J$ で
>
$$
ad-bc>0,\qquad cF(u)+d\ne0
$$
>
> とする。[JT境界の射影変換](#def-bhi21-projective-boundary-transform)による新しい座標を
>
$$
M(y)=\frac{ay+b}{cy+d},\qquad \widetilde F=M\circ F
$$
>
> と定める。このとき $\widetilde F'>0$、$\{\widetilde F,u\}=\{F,u\}$ であり、作用は $I^E_{\rm Sch}[\widetilde F]=I^E_{\rm Sch}[F]$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[QCURV16のSchwarzian合成則](../../QCURV/QCURV16/index.md#prop-qcurv16-schwarzian-chain)を、外側の関数 $M$、内側の関数 $F$ として使います。$M$ の導関数を三階まで計算すると $\{M,y\}=0$ になり、作用の積分値が変わらないと分かります。

<!-- proof-start -->
### 証明

[Schwarzian合成則](../../QCURV/QCURV16/index.md#prop-qcurv16-schwarzian-chain)の $q$ に $M$、$p$ に $F$ を代入すると

$$
\{M\circ F,u\}=F'^2\{M,F(u)\}+\{F,u\}
$$

です。$M(y)=(ay+b)/(cy+d)$ の $D_0=ad-bc>0$ に対して

$$
M'=\frac{D_0}{(cy+d)^2},\quad
\frac{M''}{M'}=-\frac{2c}{cy+d},\quad
\frac{M'''}{M'}=\frac{6c^2}{(cy+d)^2}.
$$

よって $\{M,y\}=6c^2/(cy+d)^2-(3/2)4c^2/(cy+d)^2=0$ です。さらに $\widetilde F'=D_0 F'/(cF+d)^2>0$ であるため同じ境界方向を保ちます。合成則へ代入して $\{\widetilde F,u\}=\{F,u\}$ を得ます。積分区間と $C$ が同じなので $I_{\rm Sch}^{E}[\widetilde F]=I_{\rm Sch}^{E}[F]$ です。$\square$
<!-- proof-end -->

$ad-bc>0$ の変換は向きを保ちます。重力の境界力学ではこれら三パラメータの $PSL(2,\mathbb R)$ 変換で同値とみなし、独立の物理的揺らぎと二重に数えません。たとえば $F=e^{ku}$ と $(aF+b)/(cF+d)$ は、定義される区間で同じSchwarzian $-k^2/2$ を持ちます。$F'$ が0になったり変換の分母が消えたりする点をまたいで、単一のPoincaré座標式を使用することはできません。

## 6. 境界の運動方程式

外部からエネルギーが供給されない真空模型では、Schwarzianの値が一定になることが境界の運動方程式です。この主張は変分から導けます。

<a id="prop-bhi21-equation"></a>

<!-- formal-statement-start -->
> **命題（真空Schwarzian境界運動方程式）**
>
> $C>0$、$F\in C^4$、$F'>0$ とし、変分は端点で消えるか周期境界条件を満たし、$PSL(2,\mathbb R)$ の冗長性を除く。真空Schwarzian作用 $I^E_{\rm Sch}=-C\int du\,\{F,u\}$ の停留条件は
>
$$
\frac{d}{du}\{F,u\}=0.
$$
>
> 従って各連結区間でSchwarzianは一定である。
<!-- formal-statement-end -->

### 証明の見取り図

変分を $\delta F=F'\eta$ と書くと、$\eta$ は境界座標の微小変更です。[QCURV16のSchwarzian合成則](../../QCURV/QCURV16/index.md#prop-qcurv16-schwarzian-chain)を $u\mapsto u+\eta$ に適用し、$\delta\{F,u\}=\eta'''+2\{F,u\}\eta'+\{F,u\}'\eta$ を出します。部分積分により停留条件はSchwarzianの微分が零になることです。

<!-- proof-start -->
### 証明

$F'>0$ なので任意の微小変分に対して $\eta=\delta F/F'$ と置けます。$\widetilde u=u+\eta(u)$ に対する合成則を一次まで展開して

$$
\delta\{F,u\}
=\eta''' +2\{F,u\}\eta'+\{F,u\}'\eta.
$$

$S(u)=\{F,u\}$ と略せば

$$
\begin{aligned}
\delta I^E_{\rm Sch}
&=-C\int du\,(\eta'''+2S\eta'+S'\eta)\\
&=-C[\,\eta''+2S\eta\,]_{\partial}
+C\int du\,S'\eta.
\end{aligned}
$$

変分と必要な導関数が端点で零、または周期条件で境界項が相殺されます。内部の任意の $\eta$ に対し $\delta I=0$ なら $C>0$ より $S'=0$。逆に $S'=0$ なら上の境界条件で $\delta I=0$ です。$\square$
<!-- proof-end -->

真空の境界時計は全く動かないわけではありません。$F$ の非自明な変化のうち、Schwarzianを一定に保つ軌道が許されます。次節の熱的な再パラメータ化がその例です。

## 7. 熱円周とエネルギー・エントロピー

Euclid時刻が周期 $\beta>0$ の円周である熱的な状態では、Poincaré直線座標 $F$ 一枚で円全体を覆えません。円上の向きを保つ座標 $f(u)$ を $f(u+\beta)=f(u)+\beta$、$f'>0$ として、局所Poincaré座標を

$$
F(u)=\tan\left(\frac{\pi f(u)}{\beta}\right)
$$

で表します。$\tan$ の極では別の射影変換の座標へ貼り替えます。[射影変換不変性](#prop-bhi21-projective-action)によりSchwarzianと作用はその貼り替えで一意です。これが「境界は円だが $F$ は実直線の一枚の座標でない」という違いです。

<a id="def-bhi21-thermal-clock"></a>

<!-- formal-statement-start -->
> **定義（熱的境界時計）**
>
> 周期 $\beta>0$ と $f\in C^4(\mathbb R)$ を選び、次の条件を課す。
>
$$
f'(u)>0,\qquad f(u+\beta)=f(u)+\beta.
$$
>
> 局所Poincaré座標を
>
$$
F(u)=\tan\left(\frac{\pi f(u)}{\beta}\right)
$$
>
> とし、極を射影変換で貼り合わせたEuclid円周上の境界時計を**熱的境界時計**とする。基準時計は $f(u)=u$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi21-thermal-clock -->
**定義の確認**：$f(u)=u$ を取ります。$f'=1>0$ かつ $f(u+\beta)=u+\beta=f(u)+\beta$ なので、周期と向きの条件を満たします。

局所座標 $F=\tan(\pi u/\beta)$ は $u=\beta/2$ で発散します。ここでは別の局所座標を

$$
\widetilde F(u)=-\frac{1}{F(u)}=-\cot\left(\frac{\pi u}{\beta}\right)
$$

と選べば、$\widetilde F$ はその点で滑らかです。両座標は $M(y)=-1/y$ で結ばれ、その行列式を正に選べるので、[JT境界の射影変換](#def-bhi21-projective-boundary-transform)の貼り替えです。[射影変換不変性](#prop-bhi21-projective-action)によりSchwarzianが一致します。発散は物理境界の特異点ではなく、座標表示の切替えを表します。
<!-- definition-example-end -->

[QCURV16のSchwarzian合成則](../../QCURV/QCURV16/index.md#prop-qcurv16-schwarzian-chain)で $H(y)=\tan(\pi y/\beta)$ を選ぶと、$\{H,y\}=2\pi^2/\beta^2$ なので

$$
\left\{\tan\left(\frac{\pi f}{\beta}\right),u\right\}
=\{f,u\}+\frac{2\pi^2}{\beta^2}f'^2.
$$

<a id="prop-bhi21-thermal-thermodynamics"></a>

<!-- formal-statement-start -->
> **命題（熱的Schwarzian鞍点の熱力学）**
>
> $C>0,S_0\in\mathbb R,\beta>0$ とし、Euclid円板型の真空JTの古典的境界作用を $I_E=-S_0-C\int_0^\beta du\,\{\tan(\pi f/\beta),u\}$ とする。熱的基準時計 $f(u)=u$ の鞍点では
>
$$
I_E^{\rm on\,shell}=-S_0-\frac{2\pi^2C}{\beta},
\qquad E=\frac{2\pi^2 C}{\beta^2},
\qquad S=S_0+\frac{4\pi^2C}{\beta}.
$$
>
> ここで $E=-\partial_\beta\log Z_{\rm cl}$、$S=(1-\beta\partial_\beta)\log Z_{\rm cl}$、$\log Z_{\rm cl}=-I_E^{\rm on\,shell}$ と定める。式は**古典鞍点**の寄与に対するもので、Schwarzian量子揺らぎの測度・ループ補正を含まない。
<!-- formal-statement-end -->

### 証明の見取り図

$\tan$ のSchwarzianを直接微分で計算し、$f=u$ では定数になるので周期 $\beta$ で積分します。熱力学的な微分では、係数 $C,S_0$ を固定し、$\beta$ だけを動かします。

<!-- proof-start -->
### 証明

$\alpha=\pi/\beta$ として $H(y)=\tan(\alpha y)$ を取ります。$H'=\alpha(1+H^2)$、$H''/H'=2\alpha H$、従って

$$
\frac{H'''}{H'}=\frac{d}{dy}\left(\frac{H''}{H'}\right)
+\left(\frac{H''}{H'}\right)^2
=2\alpha^2(1+H^2)+4\alpha^2H^2.
$$

ゆえに

$$
\{H,y\}=2\alpha^2+6\alpha^2H^2
-\frac32(2\alpha H)^2=2\alpha^2.
$$

$f(u)=u$ のとき $\{f,u\}=0$、$f'=1$ ですから $\{F,u\}=2\pi^2/\beta^2$。積分して

$$
I_E=-S_0-C\int_0^\beta\frac{2\pi^2}{\beta^2}\,du
=-S_0-\frac{2\pi^2C}{\beta}.
$$

$\log Z_{\rm cl}=S_0+2\pi^2C/\beta$ を $\beta$ で微分すると

$$
E=-\partial_\beta\log Z_{\rm cl}
=\frac{2\pi^2C}{\beta^2}.
$$

最後に $S=\log Z_{\rm cl}+\beta E$ なので $S=S_0+4\pi^2C/\beta$ です。$\square$
<!-- proof-end -->

$T=\beta^{-1}$ とし、$\Phi_r=a$ の同一規格化を代入すると

$$
E=2\pi^2CT^2=\frac{\pi a\ell}{4G_2}T^2,\qquad
S-S_0=4\pi^2CT=\frac{\pi a\ell}{2G_2}T.
$$

これは[BHI20のエネルギー・熱力学的エントロピー](../BHI20/index.md#prop-bhi20-first-law)に**係数まで**一致します。さらに[BHI20の温度式](../BHI20/index.md#prop-bhi20-temperature) $T=r_h/(2\pi\ell^2)$ と組み合わせると、$S-S_0=ar_h/(4G_2\ell)=\Phi_h/(4G_2)$ です。境界作用で得たエネルギーが第一法則による規格化と接続されました。

熱的鞍点の比熱は

$$
C_V=\frac{dE}{dT}=4\pi^2CT>0
$$

です。係数 $C$ はSchwarzian作用の係数であり、比熱 $C_V$ と記号を区別します。

## 8. Lorentz境界エネルギーと浴への受け渡し

Euclid円周上のSchwarzianと、Lorentz時間に沿うエネルギーは同じ符号の量ではありません。LorentzのPoincaré境界時刻を $F_L(t)$ と書き、$F_L'(t)>0$ の局所区間を考えます。時間並進の保存エネルギーを

$$
E_L(t):=-C\{F_L,t\}
$$

とします。これはLorentz境界の高階微分作用から得るNoetherエネルギーであり、真空の運動方程式は $dE_L/dt=0$ です。

<a id="prop-bhi21-lorentz-energy"></a>

<!-- formal-statement-start -->
> **命題（Lorentz境界の保存エネルギーと熱的解）**
>
> $C>0$、$F_L\in C^4$、$F_L'>0$ とし、Lorentz境界のSchwarzian力学で時間並進対称性と真空の変分方程式を仮定する。Noetherエネルギーは $E_L=-C\{F_L,t\}$、真空では $\dot E_L=0$ となる。また $\beta>0$ として
>
$$
F_L(t)=\tanh\left(\frac{\pi t}{\beta}\right)
$$
>
> を取ると
>
$$
\{F_L,t\}=-\frac{2\pi^2}{\beta^2},
\qquad E_L=\frac{2\pi^2C}{\beta^2}>0
$$
>
> であり、Euclid熱的鞍点のエネルギーと一致する。
<!-- formal-statement-end -->

### 証明の見取り図

微分比 $q=F_L''/F_L'$ を取ると $\{F_L,t\}=q'-q^2/2$。作用 $-C\int dt\,\{F_L,t\}$ は全微分を除いて $(C/2)\int dt\,q^2$ です。この高階微分Lagrange関数の時間並進Noether量を計算します。熱的な軌道には $\tanh$ の合成則を使います。

<!-- proof-start -->
### 証明

$F=F_L$ と略します。$q'=F'''/F'-(F''/F')^2$ より

$$
-C\{F,t\}=-Cq'+\frac C2q^2.
$$

第一項は全微分です。従って同じ運動方程式を持つ $L_{\rm eff}=(C/2)F''^2/F'^2$ について、高階微分の時間並進エネルギー

$$
H=F'\left(\frac{\partial L}{\partial F'}-\frac{d}{dt}\frac{\partial L}{\partial F''}\right)
+F''\frac{\partial L}{\partial F''}-L
$$

を求めます。導関数は

$$
\frac{\partial L}{\partial F'}=-C\frac{F''^2}{F'^3},
\qquad
\frac{\partial L}{\partial F''}=C\frac{F''}{F'^2},
\qquad
\frac{d}{dt}\frac{\partial L}{\partial F''}
=C\left(\frac{F'''}{F'^2}-\frac{2F''^2}{F'^3}\right).
$$

これらを $H$ に代入すると

$$
H=-C\frac{F'''}{F'}+\frac{3C}{2}
\left(\frac{F''}{F'}\right)^2=-C\{F,t\}=E_L.
$$

$L$ は明示的な $t$ 依存を持たないので、Euler–Lagrange方程式を満たす軌道では時間並進のNoether量が保存され、$\dot H=0$ です。

次に $H_1(y)=\tanh y$ と置きます。$H_1'=1-H_1^2$、$H_1''/H_1'=-2H_1$ を上のSchwarzianの定義に代入して

$$
\{H_1,y\}=-2
$$

を得ます。[QCURV16のSchwarzian合成則](../../QCURV/QCURV16/index.md#prop-qcurv16-schwarzian-chain)を $F(t)=H_1(\pi t/\beta)$ に適用します。内側の一次関数のSchwarzianは0、導関数は $\pi/\beta$ なので、

$$
\{F,t\}=-2\left(\frac{\pi}{\beta}\right)^2
$$

です。$\square$
<!-- proof-end -->

浴と接合した模型では、境界から外へ出る正味のエネルギー流束を $P(t)$（正なら境界がエネルギーを失う、単位は時間当たりのエネルギー）と定めます。**境界と浴を合わせてエネルギーが保存されるという接合条件を採用した場合**、収支は

$$
\frac{dE_L}{dt}=-P(t),\qquad
-C\frac{d}{dt}\{F_L,t\}=-P(t)
$$

となります。この式だけでは $P(t)$ は決まりません。どの場が透過し、浴にどの状態を選ぶか、どの時刻を照合するかを指定して初めて放射の方程式になります。

たとえば短い時間区間で $P(t)=P_0>0$ が外から指定される玩具模型なら $E_L(t)=E_0-P_0t$。準静的熱的関係 $E=2\pi^2CT^2$ も別途仮定すれば

$$
T(t)=\sqrt{\frac{E_0-P_0t}{2\pi^2C}}
$$

です。適用域は $E_0-P_0t>0$、変化が熱緩和より十分遅い領域に限ります。**流束の値・蒸発終期・islandの有無をSchwarzian作用だけで決めたわけではありません。**

## 9. ここまでで使える結果

| 計算対象 | 結果 | 使う仮定 |
|---|---|---|
| 正則化境界 | $Z=\ell\varepsilon F'+O(\varepsilon^3)$ | $F'>0$、滑らかなcutoff展開 |
| 外部曲率 | $K=\ell^{-1}+\ell\varepsilon^2\{F,u\}+O(\varepsilon^4)$ | Euclid AdS$_2$、外向き法線 |
| 境界作用 | $I^E_{\rm Sch}=-C\int\{F,u\}\,du$ | 真空JT、標準反項、$C=\ell\Phi_r/(8\pi G_2)$ |
| 真空境界の方程式 | $\partial_u\{F,u\}=0$ | 境界変分の端点条件 |
| 熱的古典鞍点 | $E=2\pi^2CT^2$、$S=S_0+4\pi^2CT$ | Euclid円板、熱周期、古典鞍点 |
| 浴との収支 | $\dot E_L=-P$ | 接合を通じた全エネルギー保存を**追加仮定** |

次講では、この最後の条件を実際のJT領域と非重力浴の時刻・場のmatchingへ落とし込みます。Schwarzianは「浴の状態を決める公式」ではなく、**境界の応答を表す自由度**です。

参考：Maldacena–Stanford–Yang, [*Conformal Symmetry and Its Breaking in Two Dimensional Nearly Anti-de-Sitter Space*](https://doi.org/10.1093/ptep/ptw124)；Almheiriほか, [*The Entropy of Hawking Radiation*](https://doi.org/10.1103/RevModPhys.93.035002)。

## 10. 演習：境界の時計を自力で動かす

各問では $\ell,G_2,\Phi_r,C,\beta>0$ とし、必要なら $C=\ell\Phi_r/(8\pi G_2)$、$S_0=\Phi_0/(4G_2)$ とします。Schwarzianを計算する区間で導関数が0にならないこと、熱的な計算で何を固定するかを確認してください。

### Level A：基本の判定と係数

<a id="ex-bhi21-a01"></a>

#### BHI21-A01 境界誘導計量の直接検査

- Level: A
- 問題: Euclid AdS$_2$ の計量 $ds^2=\ell^2(dx^2+dz^2)/z^2$ 上で $F(u)=u$、$Z(u)=\ell\varepsilon$ とする。$\varepsilon,\ell>0$ として $h_{uu}$ と外部曲率 $K$ を求め、$ds=du/\varepsilon$ を確認せよ。

<!-- solution-start -->
**詳細解答。** 接ベクトルは $(F',Z')=(1,0)$ なので $h_{uu}=\ell^2(1+0)/(\ell^2\varepsilon^2)=\varepsilon^{-2}$。従って固有長要素は $\sqrt{h_{uu}}\,du=du/\varepsilon$ です。外向き法線は $n^z=-z/\ell$ で、二次元計量の $\sqrt g=\ell^2/z^2$ を使うと $K=(1/\sqrt g)\partial_z(\sqrt g\,n^z)=(z^2/\ell^2)\partial_z(-\ell/z)=1/\ell$。$K-1/\ell=0$ です。
<!-- solution-end -->

<a id="ex-bhi21-a02"></a>

#### BHI21-A02 指数時計のSchwarzian

- Level: A
- 問題: $F(u)=e^{ku}$（$k>0$）について、$\{F,u\}$ を定義から求め、$F'>0$ を確認せよ。

<!-- solution-start -->
**詳細解答。** $F'=ke^{ku}>0$、$F''=k^2e^{ku}$、$F'''=k^3e^{ku}$ です。従って $F'''/F'=k^2$、$(F''/F')^2=k^2$。定義に入れると $\{F,u\}=k^2-(3/2)k^2=-k^2/2$。すべての実 $u$ で分母は正です。
<!-- solution-end -->

<a id="ex-bhi21-a03"></a>

#### BHI21-A03 局所的に曲がった時計

- Level: A
- 問題: $F(u)=u+qu^3$（$q>0$）について $\{F,0\}$ を求め、$K(0)$ の $\varepsilon^2$ 項を示せ。境界は第2節の規格化を満たすものとする。

<!-- solution-start -->
**詳細解答。** $F'=1+3qu^2>0$、$F''=6qu$、$F'''=6q$。$u=0$ で $(F',F'',F''')=(1,0,6q)$ なので $\{F,0\}=6q-3(0)^2/2=6q$。[外部曲率展開](#prop-bhi21-extrinsic-schwarzian)へ代入して $K(0)=\ell^{-1}+6q\ell\varepsilon^2+O(\varepsilon^4)$。$q$ の次元は $L^{-2}$ です。
<!-- solution-end -->

<a id="ex-bhi21-a04"></a>

#### BHI21-A04 Schwarzian係数の次元

- Level: A
- 問題: $\Phi_r,G_2$ が無次元、$\ell,u$ が長さを持つとする。$C=\ell\Phi_r/(8\pi G_2)$ と $\{F,u\}$ の次元を求め、$\int du\,C\{F,u\}$ が無次元であることを検算せよ。

<!-- solution-start -->
**詳細解答。** $F$ と $u$ はともに長さなので $F'$ は無次元、$F''/F'$ は $L^{-1}$、$F'''/F'$ は $L^{-2}$。従ってSchwarzianも $L^{-2}$。$C$ は $\ell$ に無次元因子を掛けたものなので $L$。積分の次元は $[du][C][\{F,u\}]=L\cdot L\cdot L^{-2}=1$ です。
<!-- solution-end -->

<a id="ex-bhi21-a05"></a>

#### BHI21-A05 熱的エネルギーと比熱

- Level: A
- 問題: $E(T)=2\pi^2CT^2$（$C>0,T>0$）について $C_V=dE/dT$ を求め、$T=1/(2\pi)$ で $E$ と $C_V$ を $C$ で表せ。

<!-- solution-start -->
**詳細解答。** $C$ を固定して微分すると $C_V=4\pi^2CT$ です。$T=1/(2\pi)$ で $E=2\pi^2C/(4\pi^2)=C/2$、$C_V=4\pi^2C/(2\pi)=2\pi C$。$C_V>0$ で、係数 $C$ と比熱は別の量です。
<!-- solution-end -->

### Level B：複数の計算を結ぶ

<a id="ex-bhi21-b01"></a>

#### BHI21-B01 射影変換の不変性

- Level: B
- 問題: $F(u)=e^{ku}$（$k>0$）および $M(y)=y/(1+y)$ を考える。(1) $M'(y)$ と $\{M,y\}$ を求めよ。(2) $u\in\mathbb R$ において $G(u)=M(F(u))$ のSchwarzianを[QCURV16のSchwarzian合成則](../../QCURV/QCURV16/index.md#prop-qcurv16-schwarzian-chain)で求めよ。(3) 変換の定義域を説明せよ。

<!-- solution-start -->
**詳細解答。**

**(1)** $M'=1/(1+y)^2$、$M''=-2/(1+y)^3$、$M'''=6/(1+y)^4$ です。Schwarzianの二つの項をそれぞれ求めると

$$
\frac{M'''}{M'}=\frac6{(1+y)^2},\qquad
\left(\frac{M''}{M'}\right)^2=\frac4{(1+y)^2}.
$$

したがって $\{M,y\}=6/(1+y)^2-6/(1+y)^2=0$ です。

**(2)** $F'=ke^{ku}>0$、$\{F,u\}=-k^2/2$ です。[QCURV16のSchwarzian合成則](../../QCURV/QCURV16/index.md#prop-qcurv16-schwarzian-chain)から

$$
\{M\circ F,u\}=F'^2\{M,F\}+\{F,u\}
=F'^2\cdot0-\frac{k^2}{2}=-\frac{k^2}{2}.
$$

**(3)** $M$ の分母は $1+y\ne0$ を要します。$F(u)=e^{ku}>0$ なので、すべての実 $u$ で $1+F(u)>1$。この区間では $G$ は滑らかに定義され、$G'=F'/(1+F)^2>0$ です。
<!-- solution-end -->

<a id="ex-bhi21-b02"></a>

#### BHI21-B02 外部曲率の $\varepsilon^2$ 係数

- Level: B
- 問題: $F\in C^4$、$F'>0$ が0から離れ、$Z=\ell\varepsilon F'+O(\varepsilon^3)$ が滑らかに成り立つとする。
$$
K=\frac{F'(F'^2+Z'^2)+Z(F'Z''-Z'F'')}{\ell(F'^2+Z'^2)^{3/2}}
$$
から、$K-1/\ell$ の $\varepsilon^2$ 係数を計算せよ。分子で相殺される二項を示せ。

<!-- solution-start -->
**詳細解答。** $Z'=\ell\varepsilon F''+O(\varepsilon^3)$、$Z''=\ell\varepsilon F'''+O(\varepsilon^3)$ と微分できます（余項が滑らかに制御される仮定を使用）。分子は
$$
F'^3+\ell^2\varepsilon^2F'F''^2
+\ell^2\varepsilon^2F'^2F'''
-\ell^2\varepsilon^2F'F''^2+O(\varepsilon^4)
=F'^3+\ell^2\varepsilon^2F'^2F'''+O(\varepsilon^4).
$$
分母は $\ell F'^3[1+(3/2)\ell^2\varepsilon^2F''^2/F'^2+O(\varepsilon^4)]$。$F'^3>0$ で割り、$(1+x)^{-1}=1-x+O(x^2)$ を $x=O(\varepsilon^2)$ に適用すると
$$
K=\ell^{-1}+\ell\varepsilon^2
\left[\frac{F'''}{F'}-\frac32\left(\frac{F''}{F'}\right)^2\right]+O(\varepsilon^4).
$$
相殺されるのは $F'Z'^2$ と $-ZZ'F''$ の $\varepsilon^2$ 項です。
<!-- solution-end -->

<a id="ex-bhi21-b03"></a>

#### BHI21-B03 境界の変分と運動方程式

- Level: B
- 問題: $S(u)=\{F,u\}$、$\eta=\delta F/F'$ とし、周期境界条件の下で $\delta S=\eta'''+2S\eta'+S'\eta$ が成り立つとする。$I=-C\int_0^\beta S\,du$ の停留条件を求めよ。また $F=e^{ku}$、$k>0$ が局所的に条件を満たすことを確認せよ。

<!-- solution-start -->
**詳細解答。** $\delta I=-C\int_0^\beta(\eta'''+2S\eta'+S'\eta)du$。周期条件で $\int\eta'''=0$、部分積分で $\int2S\eta'=-\int2S'\eta$ なので $\delta I=C\int_0^\beta S'\eta\,du$。任意の周期的で滑らかな $\eta$ について停留するには $S'=0$ が必要十分です。$F=e^{ku}$ のSchwarzianは $-k^2/2$ で定数なので、方程式を局所的に満たします。ただし $e^{ku}$ は一般に熱円周上の $F(u+\beta)=F(u)$ という単一座標条件を満たすわけではなく、局所解と熱円周の貼り合わせ条件は別です。
<!-- solution-end -->

<a id="ex-bhi21-b04"></a>

#### BHI21-B04 指定流束に対する準静的温度

- Level: B
- 問題: $C>0$、$E_0>0$、$P_0>0$ とし、境界と浴のエネルギー保存条件 $\dot E=-P_0$、初期値 $E(0)=E_0$ を仮定する。さらに準静的関係 $E=2\pi^2CT^2$ を仮定する。(1) $E(t)$、(2) $T(t)$、(3) $\dot T(t)$ を求め、成立する時間域を述べよ。

<!-- solution-start -->
**詳細解答。** (1) $\dot E=-P_0$ を $0$ から $t$ まで積分すると $E(t)-E_0=-\int_0^tP_0\,ds=-P_0t$、すなわち $E(t)=E_0-P_0t$。(2) $T>0$ の枝を選んで、$T(t)=\sqrt{(E_0-P_0t)/(2\pi^2C)}$。(3) $4\pi^2CT\dot T=\dot E=-P_0$ と時間微分すると、$\dot T=-P_0/(4\pi^2CT)$。正の温度を保つ $0\le t<E_0/P_0$ で代数的に成立します。実際の準静的近似には、浴との熱緩和時間に比べて温度変化が十分遅い追加条件が必要で、端点 $t=E_0/P_0$ まで正当化されません。
<!-- solution-end -->

### Level C：境界作用から熱力学を再構成する

<a id="ex-bhi21-c01"></a>

#### BHI21-C01 境界SchwarzianとJTブラックホールの一致

- Level: C
- 問題: $G_2,\ell,a,\beta>0$、$S_0\in\mathbb R$、Euclid円板を仮定する。境界における固有長・dilaton・曲率・動的作用は、次の正規化で与えられている。

$$
\begin{aligned}
ds&=\frac{du}{\varepsilon},\qquad
\Phi_b=\frac{a}{\varepsilon},\\
K&=\frac1\ell+\ell\varepsilon^2\{F,u\}+O(\varepsilon^4),\\
I_\partial^E&=-\frac{1}{8\pi G_2}
\int ds\,\Phi_b\left(K-\frac1\ell\right).
\end{aligned}
$$

**小問1**：cutoff極限でSchwarzian係数 $C$ を求めよ。

**小問2**：$F(u)=\tan(\pi u/\beta)$（射影座標の貼り替えを許す）のSchwarzianを求め、位相項 $-S_0$ を加えた古典作用 $I_E$ を求めよ。

**小問3**：$\log Z_{\rm cl}=-I_E$ から、熱的エネルギー $E$ とエントロピー $S$ を求めよ。

**小問4**：$T=1/\beta=r_h/(2\pi\ell^2)$ を用い、[BHI20の静的結果](../BHI20/index.md#prop-bhi20-first-law)と比較せよ。微分では $\ell,G_2,a,S_0$ を固定する。

<!-- solution-start -->
**詳細解答。**

(1) 境界積分の被積分測度と曲率差を掛けると
$$
ds\,\Phi_b\left(K-\ell^{-1}\right)
=\frac{du}{\varepsilon}\frac{a}{\varepsilon}
\left[\ell\varepsilon^2\{F,u\}+O(\varepsilon^4)\right]
=a\ell\{F,u\}\,du+O(\varepsilon^2)\,du.
$$
有限区間で余項の積分が消えるから、$I_\partial^E\to-C\int\{F,u\}\,du$、$C=a\ell/(8\pi G_2)$。

(2) $H(u)=\tan(\alpha u)$、$\alpha=\pi/\beta$ について $H'=\alpha(1+H^2)$、$H''/H'=2\alpha H$、$H'''/H'=2\alpha^2(1+H^2)+4\alpha^2H^2$ なので、二次項が消えて $\{H,u\}=2\alpha^2=2\pi^2/\beta^2$。極では $1/H$ 等の局所座標へ移り、[射影変換不変性](#prop-bhi21-projective-action)で値をつなぎます。円周長 $\beta$ で積分して $I_E=-S_0-2\pi^2 C/\beta$。

(3) $\log Z_{\rm cl}=S_0+2\pi^2 C/\beta$ です。$\beta$ 微分は $-\partial_\beta\log Z_{\rm cl}=2\pi^2C/\beta^2$、$\log Z_{\rm cl}+\beta E=S_0+4\pi^2C/\beta$。従って $E=2\pi^2CT^2$、$S=S_0+4\pi^2CT$。

(4) $C=a\ell/(8\pi G_2)$ を代入すると $E=\pi a\ell T^2/(4G_2)$、$S-S_0=\pi a\ell T/(2G_2)$。さらに $T=r_h/(2\pi\ell^2)$ を代入して
$$
E=\frac{\pi a\ell}{4G_2}\frac{r_h^2}{4\pi^2\ell^4}
=\frac{ar_h^2}{16\pi G_2\ell^3},
\qquad
S-S_0=\frac{\pi a\ell}{2G_2}\frac{r_h}{2\pi\ell^2}
=\frac{ar_h}{4G_2\ell}.
$$
これは[BHI20の第一法則・地平線エントロピー](../BHI20/index.md#prop-bhi20-first-law)の係数と一致します。この同定には同一の境界dilaton傾き $a$ と時刻規格化を使い、量子揺らぎの補正は含めません。
<!-- solution-end -->
