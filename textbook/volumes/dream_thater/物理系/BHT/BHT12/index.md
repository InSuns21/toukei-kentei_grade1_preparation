# BHT12 Euclid周期性と円錐正則性

<!-- definition-example-audit: strict -->

[BHT11の非極限・極限Euclid幾何の比較](../BHT11/index.md#prop-bht11-euclidean-order)では、非極限の地平線は有限距離の円板の中心になり、厳密な極限RNでは地平線が無限遠の「のど」の先に退くと分かりました。しかし、非極限の**どの静的ブラックホールでも**、なぜ時間に特定の周期を与えなければならないのでしょうか。

ここでは地平線近傍を平面の極座標として読み直します。まず平坦な加速座標で周期と欠損角の意味を見てから、一般の静的・球対称計量を固有距離で展開します。その後SchwarzschildとReissner–Nordström（RN）へ代入し、固定された壁での時間の測り方と量子場の熱的性質を区別します。

以下は4次元、Lorentz計量符号 $(-,+,+,+)$、$G=c=\hbar=k_B=1$ です。基本模型は、静的領域 $r>r_h>0$ の

$$
ds_L^2=-f(r)\,dt^2+\frac{dr^2}{f(r)}+r^2d\Omega_2^2
$$

です。$d\Omega_2^2$ は単位二球面の計量、$t$ は静的Killing場 $\partial_t$ のパラメータです。$f'(r_h)$ は計量関数 $f(r)$ を座標 $r$ で微分し、$r=r_h$ で評価した値を表します。地平線 $r=r_h>0$ の近くで $f$ が滑らかであり、次の条件を課します。

$$
f(r_h)=0,\qquad f'(r_h)>0,\qquad f(r)>0\quad(r>r_h).
$$

この**単純零点**が非極限性に対応します。$t$ の規格化を定めなければ表面重力や温度の数値は定まりません。漸近平坦なSchwarzschild・RNでは無限遠で $\partial_t$ を単位規格化します。

[GR45の静的球対称表面重力公式](../../GR/GR45/index.md#thm-gr45-static)をこの計量と正則な地平線へ適用すると

$$
\kappa=\frac{f'(r_h)}{2}>0
$$

です。ここでの形式的なEuclid化とは、静的領域の計量式で $t=-i\tau$ と置き、**実の正定値計量**

$$
ds_E^2=f(r)\,d\tau^2+\frac{dr^2}{f(r)}+r^2d\Omega_2^2
$$

を調べる操作です。これだけで量子状態や経路積分の収束を構成したことにはなりません。

## 1. 周期が自由なら何が困るか

### 1.1 具体例：平坦なRindler模型を円板に戻す

地平線近傍の時間・動径2次元を考える準備として、$\rho>0$、$\kappa_0>0$ の平坦なRindler模型

$$
ds_L^2=-\kappa_0^2\rho^2dt^2+d\rho^2
$$

を見ます。ここで $\rho$ は $\rho=0$ からの固有動径距離で、$\kappa_0$ は時間座標の規格化を表す正の定数です。$t=-i\tau$ とすると

$$
ds_E^2=d\rho^2+\kappa_0^2\rho^2d\tau^2.
$$

もし $\theta=\kappa_0\tau$ が $2\pi$ 周期なら

$$
X=\rho\cos\theta,\qquad Y=\rho\sin\theta,\qquad
dX^2+dY^2=d\rho^2+\rho^2d\theta^2
$$

なので、$\rho=0$ を通常の平面の原点として加えられます。逆に $\tau$ の周期を違えると、同じ計量表示でも円周の長さが変わり、原点へ滑らかにつながりません。この差を数量化します。

### 1.2 円周と半径から欠損角を定義する

時間を周期 $\beta>0$ で同一視するとは、$\tau$ と $\tau+\beta$ を同じ点とすることです。$\rho=\text{const.}$ の円周を一周すると、角変数 $\theta=\kappa_0\tau$ は $\kappa_0\beta$ だけ変化します。平面の標準角 $2\pi$ に不足する角度を**円錐欠損角**、過剰なら負の欠損角と扱います。

<a id="def-bht12-cone-deficit"></a>

<!-- formal-statement-start -->
> **定義（Euclid時間の円錐欠損角）**
> $\rho>0$、$\kappa_0>0$、$\beta>0$ に対し、2次元計量 $d\rho^2+\kappa_0^2\rho^2d\tau^2$ の $\tau$ を周期 $\beta$ で同一視する。円錐の角度比 $\alpha$、全角 $\Theta$、欠損角 $\delta$ を

$$
\alpha=\frac{\kappa_0\beta}{2\pi},\qquad
\Theta=\kappa_0\beta,\qquad
\delta=2\pi-\Theta=2\pi(1-\alpha)
$$

> と定義する。$\delta>0$ は欠損、$\delta<0$ は過剰角を表す。$\rho=\text{const.}$ の一周の長さは $C(\rho)=\kappa_0\beta\rho$ である。**円錐正則**とは、$\rho=0$ を通常の滑らかな2次元円板の中心として加えられることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht12-cone-deficit -->
**定義の確認**：$\kappa_0=2$、$\beta=\pi$ なら、$\rho$ を固定した円周は $C=2\pi\rho$、$\alpha=1$、$\delta=0$ です。$\theta=2\tau$ は一周で $2\pi$ 進み、上の $(X,Y)$ が原点を含む一価な直交座標になります。

一方 $\beta=\pi/2$ では

$$
C=\pi\rho,\qquad\alpha=\frac12,\qquad\delta=\pi.
$$

同じ半径に対して平面の半分の円周しかなく、座標の名前を変えるだけで通常の円板にはできません。
<!-- definition-example-end -->

## 2. 一般の非極限静的地平線で周期を導く

### 2.1 座標半径ではなく固有距離を使う

$x=r-r_h>0$ を地平線からの座標差とします。滑らかさと単純零点の仮定から、$x\downarrow0$ で

$$
f(r_h+x)=f'(r_h)x+O(x^2)=2\kappa x+O(x^2).
$$

しかし $g_{rr}=1/f$ は座標上で発散するため、$x$ を極座標の半径とするのは誤りです。代わりに、一定 $\tau$ と球面角に沿う**Euclid計量の固有動径距離**

$$
\rho(r)=\int_{r_h}^{r}\frac{du}{\sqrt{f(u)}}
$$

を導入します。単純零点なので $f(u)^{-1/2}$ の特異性は $(u-r_h)^{-1/2}$ 型で可積分です。$f=2\kappa x(1+O(x))$ を代入すると

$$
\begin{aligned}
\rho&=\int_0^x\frac{ds}{\sqrt{2\kappa s}}\bigl(1+O(s)\bigr)
=\sqrt{\frac{2x}{\kappa}}\bigl(1+O(x)\bigr),\\
x&=\frac{\kappa\rho^2}{2}+O(\rho^4),\\
f(r(\rho))&=\kappa^2\rho^2+O(\rho^4).
\end{aligned}
$$

第一式の $O(x)$ は積分の先頭項に対する相対的な高次補正です。$\rho$ の定義から $d\rho=dr/\sqrt f$ なので、動径項は近似でなく**厳密に** $d\rho^2$ になります。時間・動径部分は

$$
ds_{E,2}^2=d\rho^2+\bigl(\kappa^2\rho^2+O(\rho^4)\bigr)d\tau^2.
$$

最初の $d\rho^2+\kappa^2\rho^2d\tau^2$ が円錐の角度を決め、$O(\rho^4)$ は原点の円周／半径比の極限を変えません。

<a id="thm-bht12-nonextremal-period"></a>

<!-- formal-statement-start -->
> **定理（非極限静的地平線のEuclid正則周期）**
> 4次元の静的・球対称Lorentz計量を次の形で与える。

$$
ds_L^2=-f(r)dt^2+f(r)^{-1}dr^2+r^2d\Omega_2^2.
$$

> $r_h>0$ の近傍で $f$ は滑らか、$f(r_h)=0$、$f'(r_h)=2\kappa>0$、$r>r_h$ で $f(r)>0$ とする。$t=-i\tau$ で得た実のEuclid計量の $\tau$ を周期 $\beta>0$ で同一視する。
>
> $r=r_h$ を余次元2の滑らかな固定点集合（球面）として補完できる必要十分条件は、局所的には

$$
\boxed{\kappa\beta=2\pi,\qquad \beta_{\mathrm{reg}}=\frac{2\pi}{\kappa}=\frac{4\pi}{f'(r_h)}.}
$$

> $\beta\ne\beta_{\mathrm{reg}}$ では時間・動径断面に欠損角 $\delta=2\pi-\kappa\beta$ が残り、通常の滑らかな円板中心にはならない。この条件は局所的な**計量の滑らかな補完**に関するものであり、量子場の熱的状態や大域的なEuclid解の存在を単独で証明しない。
<!-- formal-statement-end -->

### 証明の見取り図

原点へ向かう小円の長さを固有半径で割ると $\kappa\beta$ に近づきます。滑らかな円板ならその極限は $2\pi$ です。逆向きには、正しい周期で直交座標へ移し、残りの高次項も滑らかであることを確認します。

<!-- proof-start -->
### 証明

上の固有距離 $\rho$ と $x=r-r_h$ は、$\rho\downarrow0$ で

$$
x=\frac{\kappa\rho^2}{2}+O(\rho^4),\quad
ds_E^2=d\rho^2+\bigl(\kappa^2\rho^2+O(\rho^4)\bigr)d\tau^2
+r(\rho)^2d\Omega_2^2.
$$

時間円周の固有長は、$\rho$ を固定して $0\le\tau<\beta$ を一周するので

$$
C(\rho)=\int_0^\beta\sqrt{f(r(\rho))}\,d\tau
=\beta\bigl(\kappa\rho+O(\rho^3)\bigr).
$$

よって $\lim_{\rho\downarrow0}C(\rho)/\rho=\kappa\beta$。滑らかな2次元Riemann計量の点の周囲では小円の円周／測地半径は $2\pi$ に近づくため、$\kappa\beta=2\pi$ は必要です。

十分性では $\theta=\kappa\tau$ を標準の $2\pi$ 周期角とします。$x=r-r_h$ に対し $h(x)=f(r_h+x)/x$（$x>0$）を置きます。$f(r_h)=0$ と滑らかさから $h$ は $x=0$ に滑らかに延長し、$h(0)=f'(r_h)=2\kappa>0$ です。$y=\sqrt{x}$ に変数を換えると固有距離は

$$
\rho(y)=\int_0^y\frac{2\,ds}{\sqrt{h(s^2)}},
\qquad \frac{d\rho}{dy}=\frac2{\sqrt{h(y^2)}}>0
$$

となります。被積分関数は $y$ の滑らかな偶関数なので、$\rho(y)$ は滑らかな奇関数です。その導関数は $y=0$ で正だから、局所逆 $y(\rho)$ も滑らかな奇関数になります。したがって $x=y(\rho)^2$ と $f(r(\rho))/\rho^2$ は $\rho^2$ の滑らかな関数です。

先頭係数が $f(r(\rho))/\rho^2\to\kappa^2$ であることから、滑らかな $q$ を使って $f(r(\rho))/\kappa^2=\rho^2[1+\rho^2q(\rho^2)]$ と書けます。特に $f(r_h+x)=ax+bx^2+O(x^3)$（$a=2\kappa$、$b=f''(r_h)/2$）を代入して $\rho^4$ まで計算すると $q(0)=b/3=f''(r_h)/6$ であり、一般には零ではありません。これにより

$$
ds_{E,2}^2=d\rho^2+\rho^2[1+\rho^2q(\rho^2)]d\theta^2.
$$

$X=\rho\cos\theta$、$Y=\rho\sin\theta$ と置けば

$$
d\rho^2+\rho^2d\theta^2=dX^2+dY^2,\qquad
\rho^4d\theta^2=(X\,dY-Y\,dX)^2.
$$

よって残差 $\rho^4q(\rho^2)d\theta^2=q(X^2+Y^2)(X\,dY-Y\,dX)^2$ も $(X,Y)=(0,0)$ で滑らかです。球面部分 $r(\rho)^2d\Omega_2^2$ も $\rho^2=X^2+Y^2$ の滑らかな関数で係数が $r_h^2>0$ に近づきます。従って円板中心とその上の球面を滑らかに補完できます。
<!-- proof-end -->

これは**時間周期を好きに選んだ後で温度を定義する**という話ではありません。非極限の幾何と時間の規格化を与えると、局所的な滑らかさが周期を選びます。一方、周期に合わない幾何は $\rho>0$ では通常の滑らかな計量でも、原点を加えると円錐特異点を持ちます。

### 2.2 欠損角を持つ模型の何が破綻するか

固定した非極限背景で $\beta\ne\beta_{\mathrm{reg}}$ を選ぶと、$\rho=0$ 以外は局所的に同じ計量ですが

$$
\alpha=\frac{\beta}{\beta_{\mathrm{reg}}},\qquad
\delta=2\pi\left(1-\frac{\beta}{\beta_{\mathrm{reg}}}\right)
$$

です。$\beta=\beta_{\mathrm{reg}}/2$ は角度 $\pi$ の円錐、$\beta=3\beta_{\mathrm{reg}}/2$ は全角 $3\pi$ の過剰円錐です。後者も欠損角が負になるだけで、滑らかな通常の円板ではありません。

**どの仮定を失ったか**：$\rho>0$ の局所計量が滑らかなことと、固定点集合を含む全域で滑らかであることは別です。前者が成立しても、$C(\rho)/\rho\to2\pi$ という後者の必要条件は破れます。周期を「座標変換で $2\pi$ に直す」と、境界で同一視する点と時間の規格化も変わるため、元の幾何の欠損は消えません。円錐を許すオフシェル計算は追加の扱いが必要であり、ここでそのまま滑らかな真空重力サドルとはみなしません。

## 3. SchwarzschildとRNで係数を最後まで検算する

### 3.1 具体例：Schwarzschildの $8\pi M$

漸近平坦Schwarzschildの計量関数は、[BHT1の地平線データ](../BHT1/index.md#prop-bht1-schwarzschild-data)にあるように $f(r)=1-2M/r$、$M>0$ です。$r_h=2M$、$f'(r)=2M/r^2$ を用いると

$$
f'(2M)=\frac1{2M},\qquad
\kappa=\frac1{4M},\qquad
\boxed{\beta_{\mathrm{reg}}=8\pi M}.
$$

また $x=r-2M$、$\rho^2=8Mx+O(x^2)$ なので、$\kappa^2\rho^2d\tau^2=\rho^2d\tau^2/(16M^2)$ が極角の項です。角度 $\tau/(4M)$ の周期が $2\pi$ であることと $\beta=8\pi M$ は同じ条件です。

### 3.2 具体例：非極限RNの周期

[BHT4のRN地平線データ](../BHT4/index.md#prop-bht4-rn-data)では、$M>|Q|>0$ に対し

$$
f(r)=\left(1-\frac{r_+}{r}\right)\left(1-\frac{r_-}{r}\right),
\qquad r_\pm=M\pm\sqrt{M^2-Q^2}.
$$

$f(r)=1-(r_++r_-)/r+r_+r_-/r^2$ を微分して $r_+>r_-$ を代入すると

$$
\begin{aligned}
f'(r_+)&=\frac{r_++r_-}{r_+^2}-\frac{2r_+r_-}{r_+^3}
=\frac{r_+-r_-}{r_+^2},\\
\kappa&=\frac{r_+-r_-}{2r_+^2},\qquad
\boxed{\beta_{\mathrm{reg}}=\frac{4\pi r_+^2}{r_+-r_-}.}
\end{aligned}
$$

<a id="prop-bht12-static-examples"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschildと非極限RNの正則周期）**
> 4次元、漸近平坦、自然単位の静的球対称解で、時間Killing場を無限遠で単位規格化する。$M>0$ のSchwarzschildでは $\beta_{\mathrm{reg}}=8\pi M$、$M>|Q|>0$ の非極限RNでは

$$
\beta_{\mathrm{reg}}=\frac{4\pi r_+^2}{r_+-r_-},
\qquad r_\pm=M\pm\sqrt{M^2-Q^2}.
$$

> いずれもその外部の単純零点を用いた局所Euclid正則周期である。RNの $M\downarrow|Q|$ では非極限族に沿う周期が発散するが、厳密な極限RNの幾何が同じ円板中心を持つとは結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

二つとも [本講の一般定理](#thm-bht12-nonextremal-period)へ地平線での $f'$ を入力します。非極限RNで分母の根差が正であることが適用条件です。

<!-- proof-start -->
### 証明

Schwarzschildでは $r_h=2M$、$f'(r_h)=1/(2M)>0$ で、[正則周期定理](#thm-bht12-nonextremal-period)から $\beta=4\pi/[1/(2M)]=8\pi M$ です。RNでは $r_h=r_+$、$f'(r_+)=(r_+-r_-)/r_+^2>0$ なので

$$
\beta=\frac{4\pi}{f'(r_+)}
=\frac{4\pi r_+^2}{r_+-r_-}.
$$

$M\downarrow|Q|$ かつ $Q\ne0$ 固定では $r_+\to|Q|>0$、$r_+-r_-=2\sqrt{M^2-Q^2}\to0^+$ なので $\beta\to+\infty$ です。ただし等号 $M=|Q|$ で単純零点の仮定 $f'(r_+)>0$ が失われ、この定理は適用できません。
<!-- proof-end -->

**数値で確認**：$M=5,Q=3$ なら $r_+=9,r_-=1$、$f'(r_+)=8/81$、$\kappa=4/81$、$\beta_{\mathrm{reg}}=81\pi/2$。$\beta=81\pi/4$ へ半減すると $\alpha=1/2$、$\delta=\pi$ になり、地平線の円板中心が欠損角を持ちます。

## 4. 境界の時計・量子温度・極限を混同しない

### 4.1 壁で測る周期は $\beta$ ではない

同じ静的解の $r=R>r_h$ に静止した壁を置くと、時間円周に沿った線素は $ds_E=\sqrt{f(R)}\,d\tau$ です。壁の固有時計が一周する長さ（自然単位の固有Euclid時間）を $\beta_{\mathrm{wall}}$ と書きます。無限遠基準の $\beta$ をそのまま壁の局所逆温度と呼ばないための換算です。

<a id="prop-bht12-wall-period"></a>

<!-- formal-statement-start -->
> **命題（静止壁でのEuclid周期とTolman換算）**
> 非極限・静的球対称計量を次の形で与える。

$$
ds_L^2=-f(r)dt^2+f(r)^{-1}dr^2+r^2d\Omega_2^2.
$$

> $f(r_h)=0$、$f'(r_h)=2\kappa>0$、$R>r_h$、$f(R)>0$ とし、$f$ は地平線近傍で滑らかとする。Euclid時間 $\tau$ の座標周期を $\beta>0$ としたとき、固定半径 $R$ の壁に沿う固有周期は

$$
\boxed{\beta_{\mathrm{wall}}=\sqrt{f(R)}\,\beta.}
$$

> 特に地平線の正則周期 $\beta=2\pi/\kappa$ を取り、熱平衡状態のEuclid周期を逆温度と同定する追加の物理的仮定を置くなら

$$
\boxed{T_{\mathrm{wall}}=\frac{1}{\beta_{\mathrm{wall}}}
=\frac{\kappa}{2\pi\sqrt{f(R)}}.}
$$

> これは壁の時計への変換であって、幾何だけから量子場の平衡状態が存在するとする主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

同じ円周の座標周期を、壁に沿った計量で実際に積分します。逆温度との同定を行う段階だけが、Euclid幾何そのものを超えます。

<!-- proof-start -->
### 証明

$r=R$、球面角を固定して $0\le\tau<\beta$ を積分すると

$$
\beta_{\mathrm{wall}}
=\int_0^\beta\sqrt{g_{\tau\tau}(R)}\,d\tau
=\int_0^\beta\sqrt{f(R)}\,d\tau
=\sqrt{f(R)}\,\beta.
$$

正則性定理の $\beta=2\pi/\kappa$ を代入すれば $\beta_{\mathrm{wall}}=2\pi\sqrt{f(R)}/\kappa$。熱平衡の解釈を採る場合に限り $T_{\mathrm{wall}}=\beta_{\mathrm{wall}}^{-1}$ となります。これは[BHT8の静止熱浴に対するTolman整合](../BHT8/index.md#prop-bht8-tolman-bath)の $N(R)=\sqrt{f(R)}$ を用いた式と一致します。
<!-- proof-end -->

壁を地平線へ近づけると $\sqrt{f(R)}\to0$ なので、有限の正則 $\beta$ に対して $\beta_{\mathrm{wall}}\to0$、形式的な $T_{\mathrm{wall}}\to\infty$ です。これは無限遠で規格化した温度が発散するという意味ではなく、**地平線上で静止し続ける時計が存在しない**という問題と合わせて読む必要があります。実際の有限空洞の熱力学・境界条件はBHT15で扱います。

### 4.2 Euclid正則性が言うこと・言わないこと

計量をEuclid化し円板を滑らかに補完することから得たのは、$\beta_{\mathrm{reg}}\kappa=2\pi$ という**地平線近傍の滑らかさに由来する条件**です。正則なEuclid相関関数を適切なLorentz量子状態へ解析接続でき、KMS条件などの熱平衡の条件を満たすときには $\beta_{\mathrm{reg}}$ が逆温度として現れます。しかし、KMS条件は単なる虚時間関数の周期性ではなく演算子順序を入れ替えた境界値関係です。[QCURV13の熱的二点関数の命題](../../QCURV/QCURV13/index.md#prop-qcurv13-kruskal-thermal-correlator)と[BHT8のHawking熱因子の規格化](../BHT8/index.md#prop-bht8-normalization)がその量子論側の入力です。

特に次を区別します。

| 設定 | 局所Euclid幾何からの結論 | 追加で必要なもの |
| --- | --- | --- |
| 非極限・静的、単純零点、滑らかな円板補完 | $\beta=2\pi/\kappa$ | 状態・境界条件を与えた熱的解釈 |
| 同じ背景で $\beta\ne2\pi/\kappa$ | 欠損角または過剰角を持つ | 特異な配置を扱う別の作用・境界の処方 |
| 厳密な極限RNの二重零点 | 有限距離の円板中心がなく、同じ周期固定ができない | 量子状態・境界値問題の別途指定 |
| 回転するKerrなど | 本講の実の静的計量の仮定外 | 共回転周期・回転パラメータと複素化の吟味 |

例えば厳密な極限RNでは、[BHT11の距離積分](../BHT11/index.md#prop-bht11-euclidean-order)のとおり $f(r)=(1-Q/r)^2$、$Q>0$ に対して

$$
\int_{Q+\epsilon}^{r_1}\frac{dr}{\sqrt{f(r)}}
=(r_1-Q-\epsilon)+Q\log\frac{r_1-Q}{\epsilon}\longrightarrow+\infty.
$$

非極限RNの $\beta_{\mathrm{reg}}\to\infty$ という**系列の極限**と、厳密な極限解の幾何で**円板正則性からは周期を決められない**という主張は両立します。「任意の正の周期が物理的な熱平衡状態を与える」とも「面積エントロピーが零」とも、この幾何だけからは言えません。

## 5. 演習――固有半径・円錐角・境界の時計

### Level A：定義と係数を一つずつ検算する

<a id="ex-bht12-a01"></a>

#### BHT12-A01 Rindler模型の周期と欠損

- Level: A
- 問題: $\rho>0$ のEuclid計量 $ds^2=d\rho^2+9\rho^2d\tau^2$ で $\tau$ を周期 $\beta>0$ とする。正則周期を求め、$\beta=\pi/3$ のとき全角 $\Theta$、角度比 $\alpha$、欠損角 $\delta$ と小円周の長さ $C(\rho)$ を求めよ。

<!-- solution-start -->
**詳細解答**：角度は $\theta=3\tau$ なので正則には $3\beta=2\pi$、すなわち $\beta_{\rm reg}=2\pi/3$ が必要です。与えられた $\beta=\pi/3$ では

$$
\Theta=3\cdot\frac\pi3=\pi,\quad
\alpha=\frac{\Theta}{2\pi}=\frac12,\quad
\delta=2\pi-\Theta=\pi.
$$

固有半径は $\rho$ なので、円周は

$$
C(\rho)=\int_0^{\pi/3}3\rho\,d\tau=\pi\rho.
$$

$C/\rho=\pi\ne2\pi$ により滑らかな平面の中心にはなりません。
<!-- solution-end -->

<a id="ex-bht12-a02"></a>

#### BHT12-A02 Schwarzschildの局所座標

- Level: A
- 問題: $M=2$ のSchwarzschild計量 $f(r)=1-4/r$、$r>4$ とする。地平線 $r_h$、$f'(r_h)$、$\kappa$、正則周期 $\beta$ を求め、$x=r-4\downarrow0$ に対する固有距離の先頭関係 $\rho^2$ を書け。

<!-- solution-start -->
**詳細解答**：$f(4)=0$、$f'(r)=4/r^2$ なので

$$
r_h=4,\quad f'(4)=\frac14,\quad
\kappa=\frac{f'(4)}2=\frac18,\quad
\beta=\frac{4\pi}{f'(4)}=16\pi.
$$

$f(4+x)=x/4+O(x^2)$ より

$$
\rho=\int_0^x\frac{ds}{\sqrt{s/4+O(s^2)}}
=4\sqrt{x}\,[1+O(x)],\quad
\rho^2=16x+O(x^2).
$$

したがって先頭の角度は $\kappa\tau=\tau/8$、周期 $16\pi$ で一周 $2\pi$ です。
<!-- solution-end -->

<a id="ex-bht12-a03"></a>

#### BHT12-A03 高次項は周期を変えるか

- Level: A
- 問題: $x=r-r_h>0$ の近くで $f(r)=6x+9x^2$ とする。地平線の単純零点を確認し、$\kappa$ と正則周期を求めよ。また $O(x^2)$ の項が周期の先頭値を変えない理由を述べよ。

<!-- solution-start -->
**詳細解答**：$f(r_h)=0$、$f'(r_h)=6>0$、$x>0$ で $f>0$ なので[非極限正則周期定理](#thm-bht12-nonextremal-period)を適用できます。

$$
\kappa=\frac62=3,\qquad \beta_{\rm reg}=\frac{4\pi}{6}=\frac{2\pi}{3}.
$$

固有半径は $\rho=\sqrt{2x/3}\,[1+O(x)]$、従って $x=3\rho^2/2+O(\rho^4)$ です。$f=6x+9x^2=9\rho^2+O(\rho^4)$ となり、円周／半径比の極限を決める $9\rho^2d\tau^2$ の係数には二次項が入らないため、周期は変わりません。
<!-- solution-end -->

<a id="ex-bht12-a04"></a>

#### BHT12-A04 RNの根差と周期

- Level: A
- 問題: 非極限RNの $M=5,Q=3$ に対し $r_\pm$、$\kappa$、正則周期 $\beta_{\rm reg}$ を求めよ。$\beta_{\rm reg}/2$ を選ぶと欠損角はいくつになるか。

<!-- solution-start -->
**詳細解答**：[RN地平線データ](../BHT4/index.md#prop-bht4-rn-data)より $\sqrt{M^2-Q^2}=4$ なので $r_+=9,r_-=1$。従って

$$
\kappa=\frac{9-1}{2\cdot9^2}=\frac4{81},\quad
\beta_{\rm reg}=\frac{2\pi}{4/81}=\frac{81\pi}{2}.
$$

半周期では $\Theta=\kappa(\beta_{\rm reg}/2)=\pi$ なので $\delta=2\pi-\pi=\pi$。半周期は別の滑らかなEuclid解ではなく、円錐欠損を残します。
<!-- solution-end -->

<a id="ex-bht12-a05"></a>

#### BHT12-A05 静止壁の時計で測る

- Level: A
- 問題: $M=2$ のSchwarzschildで $r=6$ に静止壁を置く。正則座標周期 $\beta=16\pi$ を用いて、$f(6)$、壁の固有Euclid周期 $\beta_{\rm wall}$ と熱平衡を仮定した局所温度 $T_{\rm wall}$ を求めよ。

<!-- solution-start -->
**詳細解答**：$f(6)=1-4/6=1/3>0$ で、壁は外部静的領域にあります。[本講の壁周期命題](#prop-bht12-wall-period)で $N(6)=\sqrt{f(6)}=1/\sqrt3$ を代入すると

$$
\beta_{\rm wall}=\frac1{\sqrt3}\,16\pi=\frac{16\pi}{\sqrt3},
\qquad T_{\rm wall}=\frac{\sqrt3}{16\pi}.
$$

無限遠での温度 $1/(16\pi)$ より壁の局所温度が大きいのは赤方偏移による換算です。熱的状態の存在自体は別の仮定です。
<!-- solution-end -->

### Level B：計算の仕組みと適用範囲をつなぐ

<a id="ex-bht12-b01"></a>

#### BHT12-B01 固有半径を次の次数まで作る

- Level: B
- 問題: $x=r-r_h>0$ で滑らかな $f(r)=ax+bx^2+O(x^3)$（$a>0$、$b\in\mathbb R$）とする。$\rho(x)=\int_0^x f(r_h+s)^{-1/2}ds$ を $x^{3/2}$ まで展開し、逆に $x$ を $\rho^4$ まで求めよ。それを $f$ へ代入し、時間項の $\rho^2$ 係数が $\kappa^2=(a/2)^2$ であることを確認せよ。

<!-- solution-start -->
**詳細解答**：$x>0$ では

$$
\frac1{\sqrt{f}}=\frac1{\sqrt{ax}}\left(1+\frac ba x+O(x^2)\right)^{-1/2}
=\frac1{\sqrt{ax}}\left(1-\frac{b}{2a}x+O(x^2)\right).
$$

$\int_0^x s^{-1/2}ds=2\sqrt x$、$\int_0^x s^{1/2}ds=2x^{3/2}/3$ を使うと

$$
\rho=\frac{2\sqrt x}{\sqrt a}\left(1-\frac{b}{6a}x+O(x^2)\right).
$$

$y=\sqrt x$ と置き、$z=\sqrt a\,\rho/2$ とすると $z=y-b y^3/(6a)+O(y^5)$ です。逆に $y=z+bz^3/(6a)+O(z^5)$ だから

$$
x=y^2=z^2+\frac{b}{3a}z^4+O(z^6)
=\frac a4\rho^2+\frac{ab}{48}\rho^4+O(\rho^6).
$$

この式を $f=ax+bx^2+O(x^3)$ に代入して

$$
\begin{aligned}
f(r(\rho))
&=\frac{a^2}{4}\rho^2+
\left(\frac{a^2b}{48}+\frac{a^2b}{16}\right)\rho^4+O(\rho^6)\\
&=\frac{a^2}{4}\rho^2+\frac{a^2b}{12}\rho^4+O(\rho^6).
\end{aligned}
$$

よって先頭係数は $(a/2)^2=\kappa^2$ で、$b$ は次の次数からしか現れません。
<!-- solution-end -->

<a id="ex-bht12-b02"></a>

#### BHT12-B02 過剰角でも滑らかではない

- Level: B
- 問題: $ds^2=d\rho^2+\rho^2d\tau^2$（$\rho>0$）の $\tau$ を周期 $\beta=3\pi$ で同一視する。$\alpha$、$\delta$、$C(\rho)/\rho$ を求め、局所曲率が $\rho>0$ で零でも滑らかな円板でない理由を、座標周期を勝手に変えずに述べよ。

<!-- solution-start -->
**詳細解答**：$\kappa_0=1$ なので

$$
\alpha=\frac{3\pi}{2\pi}=\frac32,\quad
\delta=2\pi-3\pi=-\pi,\quad
\frac{C(\rho)}{\rho}=\int_0^{3\pi}d\tau=3\pi.
$$

原点を除く各小領域は $X=\rho\cos\tau,Y=\rho\sin\tau$ の平坦表示を持ちますが、$\tau$ が $3\pi$ 進んで初めて同じ点なので、この式は円周全体の一価な通常の原点近傍座標になりません。滑らかな円板なら円周／半径比は $2\pi$ に近づく必要があるのに $3\pi$ です。$\tau$ の同一視を $2\pi$ に変更するのは**別の商空間を選ぶ操作**であって元の特異点を除去する座標変換ではありません。
<!-- solution-end -->

<a id="ex-bht12-b03"></a>

#### BHT12-B03 Killing場の規格化変更

- Level: B
- 問題: 非極限静的計量の時間Killing場を $\chi=\partial_t$、表面重力を $\kappa>0$ とする。$a>0$ に対して $\chi'=a\chi=\partial_{t'}$ となる座標 $t'$ を選び、Euclid時間の周期 $\beta'$ と表面重力 $\kappa'$、静止壁の $N'=\sqrt{-g(\chi',\chi')}$ を元の値で表せ。地平線の円板が滑らかになる条件と局所温度が変わらないことを示せ。

<!-- solution-start -->
**詳細解答**：$\partial_{t'}=(dt/dt')\partial_t=a\partial_t$ には $t'=t/a$ を取ればよく、$\tau'=\tau/a$ です。従って同じ幾何の円周を表す座標周期は $\beta'=\beta/a$ になります。[Hawking熱因子のKilling規格化不変性](../BHT8/index.md#prop-bht8-normalization)から $\kappa'=a\kappa$。壁では

$$
N'=\sqrt{-g(a\chi,a\chi)}=aN.
$$

よって

$$
\kappa'\beta'=(a\kappa)(\beta/a)=\kappa\beta,\quad
\frac{\kappa'}{2\pi N'}=\frac{a\kappa}{2\pi aN}
=\frac{\kappa}{2\pi N}.
$$

正則性 $\kappa\beta=2\pi$ も、熱平衡解釈をした局所温度も不変です。ただし $\beta$ を固定したまま $\kappa$ だけを倍率変更するのは同じ座標同一視の変換ではありません。
<!-- solution-end -->

<a id="ex-bht12-b04"></a>

#### BHT12-B04 厳密な極限は定理の仮定外

- Level: B
- 問題: $Q=2$ の厳密な極限RNの外部計量で $f(r)=(1-2/r)^2$、$r>2$ とする。$f'(2)$ を求め、$2+\epsilon$ から $3$ への固有距離を積分せよ。非極限での正則周期定理を $\kappa=0$ へ形式代入して任意の周期の物理的意味まで決められない理由を述べよ。

<!-- solution-start -->
**詳細解答**：$f(r)=1-4/r+4/r^2$ だから $f'(r)=4/r^2-8/r^3$、$f'(2)=1-1=0$。単純零点の仮定は成立しません。$r>2$ では $\sqrt f=(r-2)/r$ なので

$$
\begin{aligned}
\rho(2+\epsilon,3)
&=\int_{2+\epsilon}^{3}\frac{r}{r-2}\,dr
=\int_{2+\epsilon}^{3}\left(1+\frac2{r-2}\right)dr\\
&=1-\epsilon+2\log\frac1\epsilon
\longrightarrow+\infty.
\end{aligned}
$$

地平線は有限距離の円板中心ではなく、[非極限正則周期定理](#thm-bht12-nonextremal-period)の必要条件を適用する対象ではありません。非極限族の $\beta\to\infty$ は別の極限操作であり、厳密な極限計量で許す量子状態や境界条件はこの積分からは決まりません。
<!-- solution-end -->

### Level C：正則性・赤方偏移・極限順序を一つの系で照合する

<a id="ex-bht12-c01"></a>

#### BHT12-C01 RNのEuclid境界値を設計する

- Level: C
- 問題: $r>4$ の静的計量 $ds_L^2=-f(r)dt^2+f(r)^{-1}dr^2+r^2d\Omega_2^2$ を

$$
f(r)=\left(1-\frac4r\right)\left(1-\frac1r\right)
$$

  とし、時間を無限遠で規格化する。自然単位で次を求めよ。
  1. 地平線半径、RNとしての $M,Q^2$、$f'(4)$、$\kappa$ と正則Euclid周期 $\beta_{\rm reg}$。
  2. $x=r-4$ と地平線からの固有半径 $\rho$ の先頭関係、および正則な極角。
  3. 壁 $R=5$ の固有周期と、適切な熱平衡の仮定下での局所温度。
  4. 周期を $\beta=3\beta_{\rm reg}/4$ とした場合の欠損角と、滑らかな重力サドルと同一視できない理由。
  5. 同じ電荷の厳密な極限RNへ移ると、どの仮定が失われるか。

<!-- solution-start -->
**詳細解答**：

**1.** 最大の根は $r_h=4$。RNの因数分解と根の和・積から $2M=4+1=5$、$Q^2=4\cdot1=4$ です。$f(r)=1-5/r+4/r^2$ なので

$$
f'(r)=\frac5{r^2}-\frac8{r^3},\quad
f'(4)=\frac5{16}-\frac8{64}=\frac3{16}.
$$

$f'(4)>0$ で単純零点です。[正則周期定理](#thm-bht12-nonextremal-period)を適用して

$$
\kappa=\frac3{32},\qquad
\beta_{\rm reg}=\frac{2\pi}{3/32}=\frac{64\pi}{3}.
$$

**2.** $f(4+x)=3x/16+O(x^2)=2\kappa x+O(x^2)$ なので

$$
\rho=\sqrt{\frac{2x}{\kappa}}\,[1+O(x)]
=\sqrt{\frac{64x}{3}}\,[1+O(x)],\qquad
x=\frac3{64}\rho^2+O(\rho^4).
$$

従って先頭の2次元計量は $d\rho^2+(3\rho/32)^2d\tau^2$、極角は $\theta=(3/32)\tau$ です。$\tau=64\pi/3$ の一周で $\theta$ は $2\pi$ 進みます。

**3.** 壁では $f(5)=(1/5)(4/5)=4/25>0$ です。[壁周期命題](#prop-bht12-wall-period)を $R=5$ に適用して

$$
\beta_{\rm wall}=\frac25\cdot\frac{64\pi}{3}
=\frac{128\pi}{15},\qquad
T_{\rm wall}=\frac{15}{128\pi}.
$$

**4.** 周期を $3/4$ 倍すると

$$
\alpha=\frac{\kappa\beta}{2\pi}=\frac34,\qquad
\delta=2\pi(1-\alpha)=\frac\pi2.
$$

$C/\rho\to 3\pi/2\ne2\pi$ で円板中心を滑らかに加えられません。壁の周期を別に固定したオフシェル計算をすることは可能でも、欠損角を処理せず正則真空サドルとは呼べません。

**5.** 電荷の大きさ $|Q|=2$ を固定して厳密な極限RNへ移ると $M=2$、$r_+=r_-=2$ です。$f(r)=(1-2/r)^2$ は二重零点で $f'(2)=0$、$\kappa>0$ の定理の仮定を失います。地平線への固有距離も[極限RNの無限のど](../BHT11/index.md#prop-bht11-euclidean-order)により発散するので、有限距離の円板中心という機構がありません。
<!-- solution-end -->

## 6. 次の講義へ

非極限静的地平線では、**計量の単純零点 → 固有半径 → 円錐の全角 → 正則周期**という流れで $\beta=2\pi/\kappa$ を再構成できました。ここでは作用の値や自由エネルギーはまだ計算していません。次の **BHT13「重力作用と境界値問題」** では、どの境界条件でEuclid重力の作用を変分するか、Einstein–Hilbert作用と境界項の役割を確定します。
