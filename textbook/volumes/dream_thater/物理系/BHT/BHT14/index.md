# BHT14 Euclidサドルから自由エネルギーへ

Schwarzschild解の温度と面積はすでに分かっています。しかし、幾何学的な作用から**熱力学の自由エネルギー**を読み取るには、何を境界で固定したかを明らかにしなくてはなりません。温度を決める時間円周は、無限遠の座標周期と有限の壁で測る固有周期とで異なります。さらに、古典解の作用を一つ計算しただけでは、量子重力の分配関数を収束する積分として構成したことにはなりません。

本講では、まず有限壁でEuclid作用を実際に評価し、無限遠極限で $F=M/2$、$E=M$、$S=A/(4G)$ を得ます。次に、壁の温度を固定したまま質量を変える操作と、円錐を許す縮約作用の二階変分を検査します。最後に競合する平坦サドルと負方向を比較し、単一サドル公式の**計算結果**と**適用に必要な仮定**を切り分けます。次講BHT15では、有限空洞の安定枝と熱容量を詳しく扱います。

4次元、自然単位 $c=\hbar=k_B=1$ とし、$G>0$ は残します。Lorentz計量の符号は $(-,+,+,+)$、Euclid計量は正定値で、宇宙項・電荷・回転を本講の計算では零とします。作用は[BHT13のEuclid Einstein–Hilbert–GHY作用](../BHT13/index.md#def-bht13-euclidean-action)の符号を用います。

## 1. まず固定するのは境界の温度である

質量 $M>0$ の正則なEuclid Schwarzschild計量を

$$
ds_E^2=f(r)d\tau^2+\frac{dr^2}{f(r)}+r^2d\Omega_2^2,
\qquad f(r)=1-\frac{2GM}{r}
$$

とします。$r_h=2GM$ は地平線半径、$d\Omega_2^2$ は単位2球の計量で、$f'(r)=df/dr$ は面積半径 $r$ による微分です。[BHT12の非極限正則周期定理](../BHT12/index.md#thm-bht12-nonextremal-period)を $f'(r_h)=1/(2GM)>0$ に適用すると、滑らかな円板中心を持つ条件は

$$
\beta_H=\frac{4\pi}{f'(r_h)}=8\pi GM
$$

です。$r=r_h$ は内側境界ではありません。そこで $R>2GM$ の外側の球面壁を置き、そこに誘導される計量を計算します。

$$
h=f(R)d\tau^2+R^2d\Omega_2^2,
\qquad \beta_B=\int_0^{\beta_H}\sqrt{f(R)}\,d\tau
=\beta_H\sqrt{f(R)}.
$$

ここで $\beta_B$ は壁の時計が測る**固有逆温度**です。[BHT13のDirichlet境界条件](../BHT13/index.md#def-bht13-dirichlet-data)では、壁の半径 $R$ と固有時間円周の長さ $\beta_B$ を同時に指定します。座標の範囲 $\beta_H$ だけを固定しても、同じ境界値問題にはなりません。

**直接例：** $R=4GM$ なら $f(R)=1/2$ です。よって $\beta_H=8\pi GM$ に対して壁の固有周期は $\beta_B=8\pi GM/\sqrt2$。平坦な参照背景 $d\tau_0^2+dr^2+r^2d\Omega_2^2$ の時間周期も $\beta_0=\beta_B$ に取らなければ、二つの境界円周の固有長は一致しません。

## 2. 境界項からSchwarzschildのon-shell作用を求める

Schwarzschildと平坦背景はどちらも $R[g]=0$、$\Lambda=0$ です。したがってバルク積分は零で、正則な円板中心からの内側GHY項もありません。一方、外壁の第二基本形式は平坦背景と異なるため、[BHT13の一致境界での背景差引き](../BHT13/index.md#def-bht13-matched-subtraction)を行います。

<a id="prop-bht14-relative-action"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschildの相対on-shell作用）**  
> $G>0$、$M>0$、$R>2GM$ とし、Euclid Schwarzschild計量の時間周期を $\beta_H=8\pi GM$ に取る。外壁で平坦参照背景と誘導計量を一致させ、$f_R=1-2GM/R$ と書く。Einstein–Hilbert・GHY作用の差は

$$
I_R(M)=\beta_H\left[\frac{R}{G}(\sqrt{f_R}-1)+\frac{3M}{2}\right].
$$

> 同じ正則な解族を $R\to\infty$ に送った相対作用は

$$
I_\infty(M)=\frac{\beta_H M}{2}=4\pi GM^2
=\frac{\beta_H^2}{16\pi G}.
$$

> これは単一の滑らかな解の古典的相対作用であり、経路積分全体の値を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

外向き法線で $K$ を計算して平坦参照の $K_0=2/R$ を引きます。平坦参照の時間周期を $\beta_0=\beta_H\sqrt{f_R}$ に調整するところが肝心です。最後に平方根を大きな $R$ で展開します。

<!-- proof-start -->
### 証明

[BHT13の静的壁の公式](../BHT13/index.md#prop-bht13-static-wall)に $f(R)=1-2GM/R$、$f'(R)=2GM/R^2$ を代入すると、壁の外向き単位法線と外部曲率の跡は

$$
n=\sqrt{f_R}\,\partial_r,
\qquad K=\frac{f'(R)}{2\sqrt{f_R}}+\frac{2\sqrt{f_R}}R
=\frac{GM}{R^2\sqrt{f_R}}+\frac{2\sqrt{f_R}}R.
$$

Schwarzschild壁の体積密度は $\sqrt h=R^2\sqrt{f_R}\sin\theta$ です。したがって $\tau$ を $0$ から $\beta_H$ まで積分して

$$
\begin{aligned}
\int_B K\sqrt h\,d^3y
&=4\pi\beta_H R^2\sqrt{f_R}
\left(\frac{GM}{R^2\sqrt{f_R}}+\frac{2\sqrt{f_R}}R\right)\\
&=4\pi\beta_H(GM+2Rf_R).
\end{aligned}
$$

平坦な半径 $R$ の壁では $K_0=2/R$、周期は $\beta_0=\beta_H\sqrt{f_R}$ なので

$$
\int_{B_0}K_0\sqrt{h_0}\,d^3y
=\frac2R(4\pi R^2)\beta_0
=8\pi\beta_H R\sqrt{f_R}.
$$

Euclid作用の係数 $-1/(8\pi G)$ によって

$$
\begin{aligned}
I_R
&=-\frac1{8\pi G}
\left[4\pi\beta_H(GM+2Rf_R)-8\pi\beta_H R\sqrt{f_R}\right]\\
&=-\frac{\beta_H}{2G}\left[GM+2R-4GM-2R\sqrt{f_R}\right]\\
&=\beta_H\left[\frac R G(\sqrt{f_R}-1)+\frac{3M}2\right].
\end{aligned}
$$

$x=GM/R$ とおくと、$R\to\infty$ では $x\to0$ です。Taylor展開 $\sqrt{1-2x}=1-x-x^2/2+O(x^3)$ より

$$
\frac R G(\sqrt{f_R}-1)
=-M-\frac{GM^2}{2R}+O(R^{-2}).
$$

従って $I_R=\beta_H[M/2-GM^2/(2R)+O(R^{-2})]$ となり、極限では $\beta_HM/2$ です。$\beta_H=8\pi GM$ を代入すると残りの二表示も得られます。
<!-- proof-end -->

この計算は[BHT13のSchwarzschild参照壁の命題](../BHT13/index.md#prop-bht13-schwarzschild-reference)を使っており、同講の統合演習で得た境界差の式とも一致します。新しいのは、ここから熱力学的**微分**と**サドルの安定性検査**へ進むことです。

## 3. 作用を自由エネルギーへ翻訳する条件

通常の正準統計で $Z=\operatorname{Tr}e^{-\beta H}$ なら、$-\log Z$ は無次元の自由エネルギー $\beta F$ に等しくなります。しかし重力で $Z$ を経路積分として書くときには、境界計量を固定し、ゲージ固定と積分経路を選んだ上でサドル展開するという**追加の仮定**が必要です。

<a id="def-bht14-saddle-weight"></a>

<!-- formal-statement-start -->
> **定義（半古典サドル寄与と熱力学微分）**  
> 固定した境界の逆温度 $b>0$ に適合する滑らかなEuclid古典解 $g_*(b)$ の相対作用を $I_*(b)$ とする。量子揺らぎ、測度、負モードと他のサドルをいったん分離した**一つの形式的なサドル寄与**を

$$
Z_*(b):=e^{-I_*(b)}
$$

> と表す。正準熱力学として解釈できると仮定したとき、その指数の先頭次数に対応する量を

$$
F_*(b)=\frac{I_*(b)}{b},\quad
E_*(b)=\frac{dI_*(b)}{db},\quad
S_*(b)=bE_*(b)-I_*(b)
$$

> と定める。微分は境界の他のデータを固定し、滑らかなサドルの族に沿って行う。$Z_*$ は厳密な $Z$ や正の確率測度を定義する記号ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht14-saddle-weight -->
**定義の確認**（有限個の熱力学状態に対する通常の正準統計）：エネルギーが $E_0=0$、$E_1=\epsilon>0$ の二状態を考え、$H$ を各状態のエネルギーを返す関数（ハミルトニアン）、$b>0$ を逆温度とします。各状態の重みを $e^{-bE_j}$ とすれば

$$
Z(b)=\sum_{j=0}^1e^{-bE_j}=1+e^{-b\epsilon},\qquad
\langle H\rangle_b:=\frac{\sum_{j=0}^1 E_j e^{-bE_j}}{Z(b)}
=\frac{\epsilon e^{-b\epsilon}}{1+e^{-b\epsilon}}.
$$

この $\langle H\rangle_b$ は正規化した重みでの平均エネルギーです。$I(b)=-\log Z(b)$ と置き、$b$ で直接微分すると

$$
\frac{dI}{db}=\frac{\epsilon e^{-b\epsilon}}{1+e^{-b\epsilon}}
=\langle H\rangle_b,\qquad
b\frac{dI}{db}-I=b\langle H\rangle_b+\log Z.
$$

従って $F=I/b=-\log Z/b$、$E=\langle H\rangle_b$、$S=b\langle H\rangle_b+\log Z$ と、定義の三量は正準統計の $F,E,S$ と一致します。ただしこの有限次元の $Z$ について成立する性質を、無限次元の重力積分へ無条件には移せません。
<!-- definition-example-end -->

<a id="thm-bht14-thermodynamic-potentials"></a>

<!-- formal-statement-start -->
> **定理（Schwarzschildサドルの自由エネルギー・エネルギー・エントロピー）**  
> 漸近平坦な4次元Euclid Schwarzschild解の正則族 $M>0$ において、$b=\beta_H=8\pi GM$ を無限遠での境界逆温度として固定する。単一サドルの先頭指数に[半古典サドル寄与と熱力学微分](#def-bht14-saddle-weight)の定義を適用すると

$$
F_\infty=\frac M2,\qquad E_\infty=M,\qquad
S_\infty=4\pi GM^2=\frac{A_H}{4G},
\quad A_H=4\pi(2GM)^2.
$$

> 結論はこの形式的なSchwarzschildサドルの熱力学量であり、無限遠の正準分配関数全体の収束・支配を保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

前命題の $I_\infty$ を境界逆温度 $b$ の関数に直します。$M=b/(8\pi G)$ という**正則族の関係**を使って微分すれば、質量を固定した微分と混同せずに済みます。

<!-- proof-start -->
### 証明

[Schwarzschildの相対on-shell作用](#prop-bht14-relative-action)より

$$
I_\infty(b)=\frac{b^2}{16\pi G},\qquad
M(b)=\frac{b}{8\pi G}.
$$

まず自由エネルギーと微分によるエネルギーは

$$
F_\infty(b)=\frac{I_\infty(b)}b=\frac b{16\pi G}=\frac{M(b)}2,
\qquad
E_\infty(b)=\frac{d}{db}\frac{b^2}{16\pi G}
=\frac b{8\pi G}=M(b).
$$

従ってエントロピーは

$$
\begin{aligned}
S_\infty(b)&=bE_\infty(b)-I_\infty(b)\\
&=\frac{b^2}{8\pi G}-\frac{b^2}{16\pi G}
=\frac{b^2}{16\pi G}=4\pi GM^2.
\end{aligned}
$$

最後に $A_H=4\pi r_h^2=16\pi G^2M^2$ と比較して $S_\infty=A_H/(4G)$ です。これは[BHT9の面積エントロピー規格化](../BHT9/index.md#def-bht9-area-normalization)と一致しますが、ここでは温度微分から別の経路で到達しました。
<!-- proof-end -->

**符号・係数の独立検算：** $dS_\infty/dM=8\pi GM=b$ なので $dE_\infty=T_HdS_\infty$ が成立します。また $I_\infty=bM/2>0$ です。後者の正符号は、平坦な参照背景との比較で重要になります。

## 4. 有限壁のまま微分すると何が変わるか

有限の壁では境界温度の逆数は $b=\beta_B$ であり、$\beta_H$ ではありません。$R$ を固定したまま $M$ を変えると、$f_R$ も $b$ も変化します。そこで[BHT13の一致境界条件](../BHT13/index.md#prop-bht13-schwarzschild-reference)に基づいて、壁で測るエネルギーを作用から計算します。

<a id="prop-bht14-wall-thermodynamics"></a>

<!-- formal-statement-start -->
> **命題（有限壁での熱力学微分）**  
> $R>2GM$ を固定し、正則なEuclid Schwarzschild族の固有逆温度 $b(M)=8\pi GM\sqrt{f_R}$ を用いる。$b'(M)\ne0$ の各局所枝では、[相対on-shell作用](#prop-bht14-relative-action)は

$$
I_R=bE_R-S_R,\qquad
E_R=\frac R G(1-\sqrt{f_R}),\quad
S_R=4\pi GM^2
$$

> と書け、他の境界データ $R$ を固定した微分で

$$
\left.\frac{dI_R}{db}\right|_R=E_R,\qquad
\lim_{R\to\infty}E_R=M.
$$

> $R=3GM$ の折り返し点では $b$ を局所座標として使えないため、上の微分をその点で無条件に定義したとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

有限壁の作用を $bE_R-S_R$ に変形したら、$M$ を媒介変数として連鎖律を適用します。$dS_R/dM=b\,dE_R/dM$ という関係を中間式で確認することが要点です。

<!-- proof-start -->
### 証明

$f_R=1-2GM/R$、$b=\beta_H\sqrt{f_R}$ を代入すると

$$
\begin{aligned}
bE_R-S_R
&=\beta_H\sqrt{f_R}\,\frac R G(1-\sqrt{f_R})
-\frac{\beta_HM}{2}\\
&=\beta_H\left[\frac R G(\sqrt{f_R}-f_R)-\frac M2\right]\\
&=\beta_H\left[\frac R G(\sqrt{f_R}-1)+2M-\frac M2\right]
=I_R.
\end{aligned}
$$

ここで $\partial_Mf_R=-2G/R$ より

$$
\frac{dE_R}{dM}=\frac1{\sqrt{f_R}},
\qquad\frac{dS_R}{dM}=8\pi GM
=\frac b{\sqrt{f_R}}=b\frac{dE_R}{dM}.
$$

したがって $b'(M)\ne0$ なら連鎖律で

$$
\begin{aligned}
\left.\frac{dI_R}{db}\right|_R
&=\frac{d}{db}\left[bE_R(M(b))-S_R(M(b))\right]\\
&=E_R+\left(b\frac{dE_R}{dM}-\frac{dS_R}{dM}\right)\frac{dM}{db}
=E_R.
\end{aligned}
$$

一方、周期の微分は

$$
\frac{db}{dM}=8\pi G\left(\sqrt{f_R}-\frac{GM}{R\sqrt{f_R}}\right)
=\frac{8\pi G}{\sqrt{f_R}}\left(1-\frac{3GM}R\right),
$$

よって $R=3GM$ では逆関数として $M(b)$ を局所的に選べません。最後に $\sqrt{1-2GM/R}=1-GM/R+O(R^{-2})$ より

$$
E_R=\frac R G\left(\frac{GM}R+O(R^{-2})\right)
=M+O(R^{-1}).
$$

この極限でも壁半径を先に無限大へ送り、初めから有限壁の微分を $\beta_H$ に取り替えたのではありません。
<!-- proof-end -->

**直接例：** $R=4GM$ の一つの解では $f_R=1/2$、$E_R=4M(1-1/\sqrt2)$ です。この点における $b=8\pi GM/\sqrt2$ と $S_R=4\pi GM^2$ を $bE_R-S_R$ へ代入すると、[有限壁の作用](#prop-bht14-relative-action)の同じ $R=4GM$ の値へ戻ります。なお微分を取る際は $R$ を固定し、$R=4GM$ という数値関係まで一緒に動かしてはいけません。

## 5. 円錐を許す縮約作用で停留性を検査する

ここまでの $I_R$ は**滑らかな**Schwarzschild解の上でだけ評価しました。固定した壁温度 $b$ を保って質量 $M$ を任意にずらすと、一般には時間円周が地平線で正則ではなくなり、[BHT12の円錐欠損角](../BHT12/index.md#def-bht12-cone-deficit)が現れます。したがって、正則解の式 $I_R(M)$ をそのまま $M$ で二回微分して「負モード」を論じるのは誤りです。

固定した $R,b$ の下で、時間の座標周期と円錐の開きの割合を

$$
\beta=\frac b{\sqrt{f_R}},\qquad \alpha=\frac\beta{\beta_H}
$$

と書きます。円周のある二次元断面は、地平線近傍で次の形です。ここで $\vartheta$ の周期は $2\pi$ です。

$$
d\rho^2+\alpha^2\rho^2d\vartheta^2.
$$

この先端を滑らかな小円板で正則化してから半径を零にすると、二次元の曲率スカラーの積分は $4\pi(1-\alpha)$ に収束します。平坦な紙から扇形を除いて辺を貼ると欠損角のある円錐ができ、逆に扇形を付け足すと過剰角のある円錐になります。平坦部分を一周した向きのずれは、符号付きの角 $2\pi(1-\alpha)$ です。

曲率積分への橋渡しを明示します。先端を半径 $\varepsilon$ の滑らかな回転対称の円板で置き換え、その計量を $d\rho^2+a_\varepsilon(\rho)^2d\vartheta^2$ とします。ここだけプライムは $\rho$ 微分です。滑らかな中心と外側の円錐への接続条件は

$$
a_\varepsilon(0)=0,\qquad a_\varepsilon'(0)=1,\qquad
a_\varepsilon'(\varepsilon)=\alpha
$$

です。この計量の接続係数とGauss曲率 $K_2$ は

$$
\Gamma^\rho_{\vartheta\vartheta}=-a_\varepsilon a_\varepsilon',\qquad
\Gamma^\vartheta_{\rho\vartheta}=\frac{a_\varepsilon'}{a_\varepsilon},\qquad
R_{\rho\vartheta\rho\vartheta}=-a_\varepsilon a_\varepsilon'',\qquad
K_2=\frac{R_{\rho\vartheta\rho\vartheta}}{a_\varepsilon^2}
=-\frac{a_\varepsilon''}{a_\varepsilon}.
$$

従って面積要素 $a_\varepsilon\,d\rho\,d\vartheta$ を用いると

$$
\int_{\mathrm{disk}}K_2\,dA
=-2\pi\int_0^\varepsilon a_\varepsilon''(\rho)\,d\rho
=2\pi\bigl(a_\varepsilon'(0)-a_\varepsilon'(\varepsilon)\bigr)
=2\pi(1-\alpha).
$$

二次元のスカラー曲率は $R_2=2K_2$ です。[BHT12の地平線近傍の固有距離表示](../BHT12/index.md#thm-bht12-nonextremal-period)では、直交する2球の面積は先端で $A_H$ に近づき、半径の補正は $O(\rho^2)$ です。従って $\varepsilon\to0$ で四次元の寄与は

$$
\int_{\mathrm{tip}} R[g]\sqrt g\,d^4x
=4\pi(1-\alpha)A_H
$$

です。

<a id="def-bht14-conical-reduction"></a>

<!-- formal-statement-start -->
> **定義（有限壁の縮約円錐作用）**  
> $G>0$、$R>0$、$0<M<R/(2G)$ とし、$R$ と $b>0$ を固定した境界半径・固有逆温度とする。
>
> $f_R=1-2GM/R$、$\beta_H=8\pi GM$、$A_H=16\pi G^2M^2$ と置く。時間周期を $\beta=b/\sqrt{f_R}$、円錐の開きを $\alpha=\beta/\beta_H$ とし、外壁のGHY差と正則化された先端の曲率寄与から得る球対称な**縮約されたoff-shell作用**を

$$
\begin{aligned}
I_{\mathrm{red}}(M;b,R)
&=\beta\left[\frac R G(\sqrt{f_R}-1)+\frac{3M}2\right]
-\frac{(1-\alpha)A_H}{4G}\\
&=b\frac R G(1-\sqrt{f_R})-4\pi GM^2
\end{aligned}
$$

> と定める。$\alpha=1$ のとき滑らかなサドルの $I_R$ に一致する。この円錐族は一般には滑らかな真空解ではなく、完全な重力揺らぎ空間やそのスペクトルを表さない。
<!-- formal-statement-end -->

定義の二つの表示が一致することを確かめます。[BHT13のEuclid Einstein–Hilbert作用](../BHT13/index.md#def-bht13-euclidean-action)の符号と係数を使うと、先端の作用は

$$
I_{\mathrm{tip}}=-\frac1{16\pi G}\left[4\pi(1-\alpha)A_H\right]
=-\frac{(1-\alpha)A_H}{4G}.
$$

$A_H/(4G)=4\pi GM^2=\beta_HM/2$ なので、$\alpha A_H/(4G)=\beta M/2$。よって外壁項と先端項の和は

$$
\begin{aligned}
I_{\mathrm{red}}
&=\beta\left[\frac R G(\sqrt{f_R}-1)+\frac{3M}2+\frac M2\right]-4\pi GM^2\\
&=\beta\left[\frac R G(\sqrt{f_R}-f_R)\right]-4\pi GM^2\\
&=b\frac R G(1-\sqrt{f_R})-4\pi GM^2.
\end{aligned}
$$

<!-- definition-example-start: def-bht14-conical-reduction -->
**定義の確認**（滑らかな場合と円錐の場合）：一つの質量 $M$ に対して $R=4GM$ の壁を取ります。$f_R=1/2$ なので壁の固有周期を次のように選ぶと

$$
b=\frac{8\pi GM}{\sqrt2},\qquad
\beta=\frac b{\sqrt{f_R}}=8\pi GM=\beta_H,\qquad
\alpha=1
$$

となります。先端項は零で、上の縮約作用は[滑らかな相対作用](#prop-bht14-relative-action)に一致します。

同じ質量と壁半径のまま固有周期だけ $b/2$ にすると、開きは $\alpha=1/2$ です。先端の曲率積分は $2\pi A_H$、先端作用は $-A_H/(8G)=-2\pi GM^2$ となります。外壁項も座標周期 $\beta=4\pi GM$ で評価すると

$$
\begin{aligned}
I_{\mathrm{wall}}&=4\pi GM^2\left(2\sqrt2-\frac52\right),\\
I_{\mathrm{wall}}+I_{\mathrm{tip}}&=4\pi GM^2(2\sqrt2-3)\\
&=\frac{b/2}{G}(4GM)\left(1-\frac1{\sqrt2}\right)-4\pi GM^2.
\end{aligned}
$$

これは縮約作用の第二表示へ同じ固定壁データを代入した値で、両表示が円錐の場合にも一致します。この場合は円板の滑らかさを失うので、正則なEinstein解のon-shell作用とは呼びません。
<!-- definition-example-end -->

<a id="prop-bht14-reduced-hessian"></a>

<!-- formal-statement-start -->
> **命題（円錐縮約作用の停留点と二階変分）**  
> [有限壁の縮約円錐作用](#def-bht14-conical-reduction) $I_{\mathrm{red}}(M;b,R)$ を $R,b$ 固定で $M\in(0,R/(2G))$ に関して微分する。停留点は滑らかなSchwarzschild条件

$$
b=8\pi GM\sqrt{f_R}
$$

> と同値である。停留点での二階変分の係数は

$$
\left.\frac{\partial^2I_{\mathrm{red}}}{\partial M^2}\right|_{b,R,\mathrm{saddle}}
=8\pi G\frac{3GM-R}{R-2GM}.
$$

> $R>3GM$ では球対称縮約方向に負、$2GM<R<3GM$ では正、$R=3GM$ では零となる。この符号だけでは完全な重力の負モードの個数・不存在は結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

$\partial_ME_R=1/\sqrt{f_R}$、$\partial_MS_R=8\pi GM$ を用いて $I_{\mathrm{red}}=bE_R-S_R$ を微分します。二階微分は $b$ を固定した後、**停留点の関係を最後に代入**する順番が重要です。

<!-- proof-start -->
### 証明

$\partial_M\sqrt{f_R}=-G/(R\sqrt{f_R})$ なので

$$
\frac{\partial I_{\mathrm{red}}}{\partial M}
=b\frac1{\sqrt{f_R}}-8\pi GM.
$$

これが零であることは $b=8\pi GM\sqrt{f_R}$、すなわち $\alpha=1$ と同値です。二回微分すると

$$
\frac{\partial^2I_{\mathrm{red}}}{\partial M^2}
=\frac{bG}{Rf_R^{3/2}}-8\pi G.
$$

滑らかな停留点に限って $b=8\pi GM\sqrt{f_R}$ を代入すれば

$$
\begin{aligned}
\left.\partial_M^2I_{\mathrm{red}}\right|_*
&=8\pi G\left(\frac{GM}{Rf_R}-1\right)\\
&=8\pi G\frac{GM-(R-2GM)}{R-2GM}
=8\pi G\frac{3GM-R}{R-2GM}.
\end{aligned}
$$

分母は $R>2GM$ により正なので、符号は分子 $3GM-R$ で決まります。
<!-- proof-end -->

**符号の具体例：** 先ほどと同じ $R=4GM$ の停留点では二階微分は $-4\pi G$ で負です。一方、$R=5GM/2$ の別の停留点では $+8\pi G$ で正です。これらは各々の固定壁データに対する縮約方向の比較であって、異なる $R$ の解を同一の正準アンサンブルで直接比較したのではありません。

## 6. 競合サドル・負モード・赤外境界を調べる

### 6.1 熱的平坦背景との相対重み

同じ半径 $R$ と固有周期 $b$ を持つ平坦幾何 $S^1_b\times B_R^3$ も滑らかな真空解です。[BHT13の一致境界での背景差引き](../BHT13/index.md#def-bht13-matched-subtraction)を採れば、平坦参照背景の相対作用は定義により $I_{\mathrm{flat}}=0$ です。二つの**候補サドルの古典的な指数**を比べることはできますが、それは完全な経路積分の位相重みを評価したことではありません。

<a id="prop-bht14-relative-weight"></a>

<!-- formal-statement-start -->
> **命題（有限壁の相対サドル重み）**  
> 正則なSchwarzschild解が境界 $R,b$ と両立し、$x:=\sqrt{1-2GM/R}\in(0,1)$ とする。同じ境界計量を持つ平坦参照背景の相対作用を零に選ぶと

$$
I_R-I_{\mathrm{flat}}
=\frac{\pi R^2}{G}(1-x)^2(1+x)(3x-1).
$$

> 従って古典的指数 $e^{-I}$ の比較では、$x>1/3$ のSchwarzschildは平坦より抑制され、$x<1/3$ では増幅される。$x=1/3$ で指数は同じである。この比較は積分測度・負モード・揺らぎの行列式を含めた支配性の判定ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$GM=R(1-x^2)/2$ とおくと、壁の周期、エネルギー、エントロピーはすべて $x$ の多項式で書けます。$I_R=bE_R-S_R$ に代入して因数分解します。

<!-- proof-start -->
### 証明

定義から $GM=R(1-x^2)/2$、$\beta_H=8\pi GM=4\pi R(1-x^2)$ であり、

$$
b=4\pi R x(1-x^2),\qquad
E_R=\frac R G(1-x),\qquad
S_R=\frac{\pi R^2}G(1-x^2)^2.
$$

[有限壁のLegendre関係](#prop-bht14-wall-thermodynamics)を使い、

$$
\begin{aligned}
I_R
&=\frac{4\pi R^2}G x(1-x^2)(1-x)
-\frac{\pi R^2}G(1-x^2)^2\\
&=\frac{\pi R^2}G(1-x)^2(1+x)
\left[4x-(1+x)\right]\\
&=\frac{\pi R^2}G(1-x)^2(1+x)(3x-1).
\end{aligned}
$$

他の因子は $R>0$、$G>0$、$0<x<1$ で正ですから、符号は $3x-1$ だけで決まります。
<!-- proof-end -->

**同じ境界に複数のサドルがあるか：** $b(M)=8\pi GM\sqrt{1-2GM/R}$ は $M=0$ および $M\uparrow R/(2G)$ で零に近づき、$GM=R/3$ で最大値

$$
b_{\max}=\frac{8\pi R}{3\sqrt3}
$$

を取ります。従って $0<b<b_{\max}$ には原則として二つの正則Schwarzschild質量が対応します。$b>b_{\max}$ にはSchwarzschildサドルは存在しませんが、熱的平坦背景は存在します。境界データから質量が一意に決まると考えるのは誤りです。

### 6.2 何を検査すればサドル近似と呼べるか

次の三つは別の問いです。

1. **停留性：** 与えた境界データでEinstein方程式と正則性を満たすか。正則Schwarzschildについては[Dirichlet変分定理](../BHT13/index.md#thm-bht13-euclidean-dirichlet)と本講の[停留点の式](#prop-bht14-reduced-hessian)が確認を与えます。
2. **局所的な二階変分：** ゲージを除いた物理的揺らぎの作用に負方向がないか。$R>3GM$ で縮約作用の負の二階微分は危険信号ですが、円錐族は滑らかな計量揺らぎでないので、それだけを完全な重力作用の固有モードの構成とは呼べません。漸近平坦Schwarzschildの非共形負モードはGross–Perry–Yaffeの摂動解析で実際に発見されています（[原論文](https://doi.org/10.1103/PhysRevD.25.330)）。この固有値問題の全導出は本講の計算外です。
3. **大域的な支配・積分の定義：** 平坦サドル、その他の幾何と位相、境界での赤外発散、ゲージ固定・共形因子の積分経路、量子揺らぎの行列式を指定しなければ $Z\simeq e^{-I_R}$ が支配項とは言えません。[相対重みの命題](#prop-bht14-relative-weight)は古典指数の比較だけです。

負方向がある場合、実数の安定したGaussian積分の公式を無批判に用いることはできません。共形因子の符号問題はそれとは別の重力特有の問題で、揺らぎの積分経路まで必要です。一般の有限空洞での実際の滑らかな揺らぎのモードと境界条件の関係には、例えば[Allenの解析](https://doi.org/10.1103/PhysRevD.30.1153)があります。縮約された二階微分だけでそのスペクトルを再現したと主張しません。

**赤外極限の反証テスト：** $R\to\infty$ により $E_R\to M$ となっても、全積分の収束は従いません。固定した $b$ に対する円錐縮約式の形式的極限は

$$
I_{\mathrm{red},\infty}(M;b)=bM-4\pi GM^2.
$$

その二階微分は $-8\pi G$ で、$M$ の大きい方向へ形式的に下がり続けます。これはSchwarzschild単一サドルの正準解釈が不安定なことを示す**縮約モデル内の診断**であり、重力の全経路積分についての厳密な発散定理ではありません。有限壁の $M<R/(2G)$ という領域制約を外したときに何を失ったかまで確かめる必要があります。

## 7. 演習――作用の計算と成立条件を自力で判定する

### Level A：境界、微分、円錐の基本操作

<a id="ex-bht14-a01"></a>

#### BHT14-A01 有限壁でのGHY差

- Level: A
- 問題: $G,M>0$、$R>2GM$ とし、$f_R=1-2GM/R$、$\beta_H=8\pi GM$ とする。正則なEuclid Schwarzschildと同じ誘導計量を持つ平坦背景を比較せよ。$K$、$K_0$、参照周期 $\beta_0$、GHY差の作用 $I_R$ を求めよ。

<!-- solution-start -->
**詳細解答**：[静的壁の外部曲率](../BHT13/index.md#prop-bht13-static-wall)から、$f'(R)=2GM/R^2$ を代入して

$$
K=\frac{GM}{R^2\sqrt{f_R}}+\frac{2\sqrt{f_R}}R,
\qquad K_0=\frac2R.
$$

境界の時間円周の長さを一致させるため $\beta_0=\beta_H\sqrt{f_R}$ です。密度 $\sqrt h=R^2\sqrt{f_R}\sin\theta$ と平坦側 $\sqrt{h_0}=R^2\sin\theta$ にそれぞれ固有の時間周期を用いて積分すると

$$
\int K\sqrt h=4\pi\beta_H(GM+2Rf_R),\quad
\int K_0\sqrt{h_0}=8\pi\beta_HR\sqrt{f_R}.
$$

真空ではバルク項は零なのでGHY差に $-1/(8\pi G)$ を掛け、

$$
I_R=\beta_H\left[\frac R G(\sqrt{f_R}-1)+\frac{3M}2\right].
$$

内側地平線は滑らかな円板中心であり、別の境界項はありません。
<!-- solution-end -->

<a id="ex-bht14-a02"></a>

#### BHT14-A02 逆温度微分を省略しない

- Level: A
- 問題: $G>0$、$b=8\pi GM$、$I_\infty(b)=b^2/(16\pi G)$ とする。$F=I/b$、$E=dI/db$、$S=bE-I$ を別々に導出し、$S=A_H/(4G)$ を検算せよ。

<!-- solution-start -->
**詳細解答**：まず $M=b/(8\pi G)$ です。式の定義へそのまま代入して

$$
F=\frac b{16\pi G}=\frac M2,
\qquad E=\frac{2b}{16\pi G}=M.
$$

これをエントロピーに使えば

$$
S=\frac{b^2}{8\pi G}-\frac{b^2}{16\pi G}
=\frac{b^2}{16\pi G}=4\pi GM^2.
$$

半径 $r_h=2GM$ の面積は $A_H=4\pi r_h^2=16\pi G^2M^2$ なので $A_H/(4G)=4\pi GM^2$ です。$M$ を定数として $I_\infty$ を $b$ で微分すると、正則な解族を動かした熱力学微分になりません。
<!-- solution-end -->

<a id="ex-bht14-a03"></a>

#### BHT14-A03 壁のエネルギーと極限

- Level: A
- 問題: $R>2GM$ を固定したとき $E_R=R(1-\sqrt{1-2GM/R})/G$ の $M$ 微分を求めよ。また $R\to\infty$ における $1/R$ 次までの展開を導け。

<!-- solution-start -->
**詳細解答**：$f_R=1-2GM/R$ として $df_R/dM=-2G/R$ です。連鎖律より

$$
\frac{dE_R}{dM}=-\frac R G\frac1{2\sqrt{f_R}}\left(-\frac{2G}R\right)
=\frac1{\sqrt{f_R}}.
$$

$x=GM/R$ に対する $\sqrt{1-2x}=1-x-x^2/2+O(x^3)$ を用いると

$$
E_R=\frac R G\left(\frac{GM}R+\frac{G^2M^2}{2R^2}+O(R^{-3})\right)
=M+\frac{GM^2}{2R}+O(R^{-2}).
$$

従って $E_R\to M$ ですが、有限の壁では一般に $E_R\ne M$ です。
<!-- solution-end -->

<a id="ex-bht14-a04"></a>

#### BHT14-A04 円錐先端の曲率寄与

- Level: A
- 問題: 地平線近傍の二次元計量 $d\rho^2+\alpha^2\rho^2d\vartheta^2$（$\vartheta$ の周期 $2\pi$）と地平線面積 $A_H>0$ を考える。円板正則化した先端の四次元スカラー曲率積分とEuclid Einstein–Hilbert作用の寄与を導け。$\alpha=1/2$ で検算せよ。

<!-- solution-start -->
**詳細解答**：半径 $\rho=\varepsilon$ の円周長は $2\pi\alpha\varepsilon$ です。平面で角度 $2\pi(1-\alpha)$ の扇形を除いて貼り合わせれば、先端以外は局所平坦です。

正則化した円板の計量を $d\rho^2+a(\rho)^2d\vartheta^2$ とし、$a(0)=0$、$a'(0)=1$、$a'(\varepsilon)=\alpha$ を課します。ここでプライムは $\rho$ 微分です。Gauss曲率 $K_2=-a''/a$ と面積要素 $dA=a\,d\rho\,d\vartheta$ を用いると

$$
\int K_2\,dA=-2\pi\int_0^\varepsilon a''(\rho)\,d\rho
=2\pi(1-\alpha)
$$

を得ます。二次元スカラー曲率はその2倍で、直交する2球の面積が先端で $A_H$ に近づくことから

$$
\int_{\mathrm{tip}}R[g]\sqrt g\,d^4x=4\pi(1-\alpha)A_H.
$$

[BHT13のEuclid Einstein–Hilbert作用](../BHT13/index.md#def-bht13-euclidean-action)の係数 $-1/(16\pi G)$ を掛けると

$$
I_{\mathrm{tip}}=-\frac{(1-\alpha)A_H}{4G}.
$$

$\alpha=1/2$ なら曲率積分は $2\pi A_H$、作用は $-A_H/(8G)$。$\alpha=1$ なら先端の分布曲率寄与は零です。
<!-- solution-end -->

<a id="ex-bht14-a05"></a>

#### BHT14-A05 固定する境界温度を間違えない

- Level: A
- 問題: $R=4GM$ の滑らかなEuclid Schwarzschild解で $\beta_H$ と壁固有周期 $b$ を求め、同じ壁に平坦参照背景を置くときの周期を述べよ。さらに $R$ を固定して $M$ を微分する際、等式 $R=4GM$ を微分してよいか説明せよ。

<!-- solution-start -->
**詳細解答**：$f_R=1-2GM/(4GM)=1/2$ なので

$$
\beta_H=8\pi GM,\qquad
b=\beta_H\sqrt{f_R}=\frac{8\pi GM}{\sqrt2}.
$$

平坦背景で誘導計量を一致させるには時間周期 $\beta_0=b$ を選びます。$R=4GM$ は**選んだ一点での数値例**であり、$R$ 固定の変分では $M$ だけを動かすので $R=4GM$ を恒等式として微分できません。そうすると異なる壁半径のアンサンブルを混ぜてしまいます。
<!-- solution-end -->

### Level B：停留条件・負方向・競合背景

<a id="ex-bht14-b01"></a>

#### BHT14-B01 有限壁のLegendre微分

- Level: B
- 問題: $G,R>0$、$0<M<R/(2G)$ の滑らかなSchwarzschild族で $b(M)=8\pi GM\sqrt{f_R}$、$E_R=R(1-\sqrt{f_R})/G$、$S_R=4\pi GM^2$ とする。$b'(M)\ne0$ で $I_R=bE_R-S_R$ の $dI_R/db$ を求め、$b'(M)=0$ となる質量を特定せよ。

<!-- solution-start -->
**詳細解答**：$dE_R/dM=1/\sqrt{f_R}$、$dS_R/dM=8\pi GM$ であり、滑らかな族の条件 $b=8\pi GM\sqrt{f_R}$ を代入すると

$$
b\frac{dE_R}{dM}=8\pi GM=\frac{dS_R}{dM}.
$$

従って $b'(M)\ne0$ の区間で連鎖律を用い、

$$
\frac{dI_R}{db}=E_R+
\left(b\frac{dE_R}{dM}-\frac{dS_R}{dM}\right)\frac1{b'(M)}=E_R.
$$

また

$$
b'(M)=8\pi G\frac{1-3GM/R}{\sqrt{f_R}}
$$

なので、零となるのは $GM=R/3$ です。その点では逆関数定理を使った上記の計算は直接適用できず、枝ごとの片側極限として解釈する必要があります。
<!-- solution-end -->

<a id="ex-bht14-b02"></a>

#### BHT14-B02 縮約作用の二階微分と壁

- Level: B
- 問題: $I_{\mathrm{red}}(M;b,R)=bR(1-\sqrt{1-2GM/R})/G-4\pi GM^2$ とする。固定 $R,b$ で停留条件・停留点のHessianを導け。$R=4GM$ と $R=5GM/2$ の各正則停留点の符号を求め、それぞれ何を意味しないか述べよ。

<!-- solution-start -->
**詳細解答**：$f_R=1-2GM/R$ と置くと

$$
\partial_MI_{\mathrm{red}}=\frac b{\sqrt{f_R}}-8\pi GM,
\qquad
\partial_M^2I_{\mathrm{red}}=\frac{bG}{Rf_R^{3/2}}-8\pi G.
$$

停留条件 $b=8\pi GM\sqrt{f_R}$ を**二階微分後**に入れて

$$
\left.\partial_M^2I_{\mathrm{red}}\right|_*
=8\pi G\left(\frac{GM}{R-2GM}-1\right)
=8\pi G\frac{3GM-R}{R-2GM}.
$$

$R=4GM$ では $8\pi G(-GM)/(2GM)=-4\pi G$ です。$R=5GM/2$ では $8\pi G(GM/2)/(GM/2)=+8\pi G$ です。負符号は円錐族の縮約方向に降下することを意味し、正符号はその方向に局所的に増加することを意味します。しかし円錐を許した1変数族は滑らかなゲージ固定済み重力揺らぎの全空間ではないので、前者だけで物理的負固有モードの存在、後者だけで全モード安定性を証明しません。
<!-- solution-end -->

<a id="ex-bht14-b03"></a>

#### BHT14-B03 平坦サドルとの比較と境界温度

- Level: B
- 問題: $x=\sqrt{1-2GM/R}\in(0,1)$、正則性により $b=4\pi R x(1-x^2)$ とする。平坦背景の相対作用を零に選び、Schwarzschildの $I_R=bR(1-x)/G-\pi R^2(1-x^2)^2/G$ の符号を分類せよ。$x=1/2$ と $x=1/4$ を検算し、作用が小さいだけで正準分配関数を決定できない理由を述べよ。

<!-- solution-start -->
**詳細解答**：$b$ を代入して $\pi R^2/G$ をくくれば

$$
I_R=\frac{\pi R^2}G\left[4x(1-x^2)(1-x)-(1-x^2)^2\right].
$$

$1-x^2=(1-x)(1+x)$ を使って

$$
I_R=\frac{\pi R^2}G(1-x)^2(1+x)(3x-1).
$$

従って $x>1/3$ で正、$x=1/3$ で零、$x<1/3$ で負です。$x=1/2$ なら最後の因子は $+1/2$、$x=1/4$ なら $-1/4$ です。これらは各質量に合わせて決まる境界周期での比較で、互いの二つの数値例を同一の $b$ と取り違えてはいけません。古典指数の大小だけでは負モード、測度、他のサドル、量子揺らぎが未評価で、完全な $Z$ の大小は決まりません。
<!-- solution-end -->

<a id="ex-bht14-b04"></a>

#### BHT14-B04 サドル成立条件の反証テスト

- Level: B
- 問題: 無限遠の形式的縮約式 $I_{\mathrm{red},\infty}(M;b)=bM-4\pi GM^2$ において $b,G>0$ を固定する。停留点、二階微分、$M\to\infty$ の挙動を求め、次の主張をそれぞれ判定せよ。

  1. 「停留点が存在すれば、正則なGaussian積分が得られる」
  2. 「$I_\infty=\beta M/2$ を計算すれば、無限遠正準アンサンブルの $Z$ が確定する」

<!-- solution-start -->
**詳細解答**：まず

$$
\partial_MI_{\mathrm{red},\infty}=b-8\pi GM,
\quad M_*=\frac b{8\pi G},\quad
\partial_M^2I_{\mathrm{red},\infty}=-8\pi G<0.
$$

さらに $M\to\infty$ では負の二次項が優越し、$I_{\mathrm{red},\infty}\to-\infty$ です。主張1は偽です。停留しても縮約された実方向のGaussian近似は下降方向となり、収束する通常の実Gaussian積分を与えません。主張2も偽です。滑らかなSchwarzschild解の指数を求めたにすぎず、他のサドル、非共形負モード、共形因子の積分経路、測度、赤外の扱いが未確定です。この縮約式の大質量方向は警告を与えますが、全経路積分の厳密な発散証明とはしません。
<!-- solution-end -->

### Level C：作用・円錐・温度・支配性を統合する

<a id="ex-bht14-c01"></a>

#### BHT14-C01 固定境界のSchwarzschildサドルを最後まで検査する

- Level: C
- 問題: $G>0$ とし、$R>2GM$ の有限壁を持つEuclid Schwarzschild候補を考える。壁の固有逆温度 $b>0$ を固定した正準境界値問題で次を行え。$f_R=1-2GM/R$、$\beta_H=8\pi GM$、$A_H=16\pi G^2M^2$ とする。

  1. $\beta=b/\sqrt{f_R}$ と $\alpha=\beta/\beta_H$ を用い、外壁GHY差と円錐先端曲率の両方から $I_{\mathrm{red}}(M;b,R)$ を導け。
  2. 停留点が滑らかな条件 $b=\beta_H\sqrt{f_R}$ と一致することを確かめ、その上で $I_R=bE_R-S_R$ の $E_R,S_R$ を特定せよ。
  3. $R$ 固定の枝で $dI_R/db$ を計算し、$R\to\infty$ の滑らかな族について $F_\infty,E_\infty,S_\infty$ を導け。
  4. 固定壁データでの二階微分の符号と熱的平坦背景との指数比較を行い、サドル支配を断言できるか結論せよ。

<!-- solution-start -->
**詳細解答**：**（1）** [静的壁の外部曲率](../BHT13/index.md#prop-bht13-static-wall)を $f_R$ に適用すると、任意の座標周期 $\beta$ の外壁差は

$$
I_{\mathrm{wall}}=\beta\left[\frac R G(\sqrt{f_R}-1)+\frac{3M}2\right].
$$

円錐開き $\alpha=\beta/\beta_H$ の先端を正則化するとスカラー曲率の積分は $4\pi(1-\alpha)A_H$ です。よって $I_{\mathrm{tip}}=-(1-\alpha)A_H/(4G)$。$A_H/(4G)=\beta_HM/2$ を代入すると

$$
\begin{aligned}
I_{\mathrm{wall}}+I_{\mathrm{tip}}
&=\beta\left[\frac R G(\sqrt{f_R}-1)+\frac{3M}2\right]
-\frac{\beta_HM}2+\frac{\beta M}2\\
&=\beta\frac R G(\sqrt{f_R}-f_R)-4\pi GM^2\\
&=b\frac R G(1-\sqrt{f_R})-4\pi GM^2
=I_{\mathrm{red}}.
\end{aligned}
$$

**（2）** $R,b$ を固定して $M$ で微分すると

$$
\partial_MI_{\mathrm{red}}=\frac b{\sqrt{f_R}}-8\pi GM.
$$

停留すれば $b=8\pi GM\sqrt{f_R}$、従って $\alpha=1$ となり、円錐が消えます。停留点上の式から

$$
E_R=\frac R G(1-\sqrt{f_R}),\qquad
S_R=4\pi GM^2=\frac{A_H}{4G},\qquad I_R=bE_R-S_R.
$$

**（3）** 滑らかな解族で $dE_R/dM=1/\sqrt{f_R}$、$dS_R/dM=8\pi GM=b/\sqrt{f_R}$。$db/dM\ne0$ の枝で連鎖律を適用すると

$$
\frac{dI_R}{db}=E_R+
\frac{b(dE_R/dM)-dS_R/dM}{db/dM}=E_R.
$$

$R\to\infty$ で $E_R\to M$、$b\to\beta_H=8\pi GM$、$I_R\to bM/2=b^2/(16\pi G)$ です。従って

$$
F_\infty=\frac{I_\infty}b=\frac M2,
\qquad E_\infty=\frac{dI_\infty}{db}=M,
\qquad S_\infty=bE_\infty-I_\infty=4\pi GM^2.
$$

**（4）** 停留点での二階微分は

$$
\left.\partial_M^2I_{\mathrm{red}}\right|_*
=8\pi G\frac{3GM-R}{R-2GM}.
$$

例えば $R>3GM$ なら縮約方向は負です。平坦背景との作用差は $x=\sqrt{f_R}$ を使って

$$
I_R-I_{\mathrm{flat}}=\frac{\pi R^2}G(1-x)^2(1+x)(3x-1),
$$

ゆえに $x>1/3$ では平坦の古典指数が大きく、$x<1/3$ ではSchwarzschildの古典指数が大きいことだけが分かります。前者では少なくとも単独Schwarzschildが最小の古典指数とは言えず、後者でも他サドルや量子揺らぎ・ゲージ固定・負モードは調べていません。**したがって両場合とも、この計算だけでは厳密な正準分配関数の支配性を断言できません。**
<!-- solution-end -->

---

SchwarzschildのEuclid作用は熱力学量を計算する強力な入口ですが、「滑らかな解の値を知る」「温度微分を正しく行う」「安定なサドルが支配する」の三者は同値ではありません。次講BHT15「負熱容量と有限空洞」では、壁での熱容量と正準・微正準の安定性を区別し、正負二つの枝を詳しく検証します。
