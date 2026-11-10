# BHT16 AdSブラックホールとHawking–Page転移

前講では、[有限空洞の二分岐](../BHT15/index.md#thm-bht15-two-branches)を計算し、「熱容量が正」と「同じ境界温度で最も重みの大きいサドル」は別の判断だと学びました。しかし、空洞壁を取り払った漸近平坦Schwarzschildでは再び負熱容量が現れます。**無限遠に壁を置く代わりに、時空そのものの漸近構造を変えたらどうなるでしょうか。**

負の宇宙定数を持つ反de Sitter時空（anti-de Sitter、AdS）では、大きなブラックホールが正の熱容量を持ちます。さらに、同じ温度・同じ境界幾何を持つ「地平線のない熱的AdS」と「ブラックホール」が競い、温度によって作用の大小が逆転します。これが重力側のHawking–Page転移です。

以下は4次元の真空Einstein重力、$G>0$、$L>0$、宇宙定数 $\Lambda=-3/L^2$、自然単位 $c=\hbar=k_B=1$ です。Lorentz計量の符号は $(-,+,+,+)$ とします。回転・電荷は零、$L$ と $G$ を固定して変分します（宇宙定数を熱力学的圧力として変える理論は使いません）。境界はAdSの共形無限遠で、その時間円周の**代表計量の長さ**を $\beta$ とします。この規格化を固定しない温度比較には意味がありません。

## 1. 無限遠の温度を揃えるために何を固定するか

外部の時間が $t$ で、$d\Omega_2^2=d\theta^2+\sin^2\theta\,d\phi^2$ を単位2球の計量とします。半径 $r$ は面積半径です。Schwarzschild–AdSの静的な計量は

$$
ds_L^2=-f(r)dt^2+\frac{dr^2}{f(r)}+r^2d\Omega_2^2,
\qquad f(r)=1-\frac{2GM}{r}+\frac{r^2}{L^2}.
$$

$M>0$ は、熱的AdSを零点に取る保存質量です。$r=r_+>0$ を $f$ の最大の正の零点（外側の地平線）とします。以下、プライム $f'(r)=df/dr$ は $M,L$ を固定して面積半径 $r$ で微分する記法です。この模型では

$$
f'(r)=\frac{2GM}{r^2}+\frac{2r}{L^2}>0\qquad(r>0)
$$

従って正の零点は一つだけです。$t=-i\tau$ とすると $r\ge r_+$ に正定値Euclid計量が得られます。

地平線なしの比較候補は、$M=0$ とした $f_0(r)=1+r^2/L^2$ を使う**熱的AdS**です。熱的AdSではEuclid時間の円周は中心 $r=0$ まで縮まらず、空間の球面だけが中心で縮みます。

無限遠では $f(R)\to\infty$ だから、切断半径 $R$ での固有円周長は $\beta\sqrt{f(R)}$ と発散します。したがって比較すべきは無限遠の生の固有長ではなく、$R$ を取り払う前に一致させた境界計量です。[BHT13のDirichlet条件](../BHT13/index.md#def-bht13-dirichlet-data)と[背景差引き](../BHT13/index.md#def-bht13-matched-subtraction)を、ここでも使います。

<a id="def-bht16-ads-canonical"></a>

<!-- formal-statement-start -->
> **定義（AdS正準境界と熱的AdS参照サドル）**  
> $G,L>0$ と $\Lambda=-3/L^2$ を固定する4次元Euclid Einstein重力を考える。外側切断面 $r=R$ に誘導される $S^1\times S^2$ の計量を一致させた後で $R\to\infty$ とする。Schwarzschild–AdS側の座標周期を $\beta$、熱的AdS側を $\beta_0$ とすると、同じ切断面の固有円周を指定する条件は

$$
\beta\sqrt{f(R)}=\beta_0\sqrt{f_0(R)},\qquad
\beta_0=\beta\sqrt{\frac{f(R)}{f_0(R)}}.
$$

> $R\to\infty$ で境界代表計量を $d\tau^2+L^2d\Omega_2^2$ に定め、$\tau\sim\tau+\beta$ とする。この $L,G,\beta$ を固定した正準境界値問題で熱的AdSの差引き作用を零とする。サドル寄与は同じ境界データでの相対Euclid作用 $\Delta I_E=I_E[\mathrm{BH}]-I_E[\mathrm{thermal\ AdS}]$ により比較する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht16-ads-canonical -->
**定義の確認**：両者の時間円周を共通の周期1の角座標 $u$ で表し、Schwarzschild–AdS側を $\tau=\beta u$、熱的AdS側を $\tau_0=\beta_0u$ とします。同じ切断半径 $R>r_+$ で誘導計量は

$$
h_{\rm BH}=\beta^2f(R)\,du^2+R^2d\Omega_2^2,\qquad
h_0=\beta_0^2f_0(R)\,du^2+R^2d\Omega_2^2.
$$

2球部分は両者とも面積 $4\pi R^2$ です。時間方向も定義の $\beta_0>0$ を選ぶと $\beta^2f(R)=\beta_0^2f_0(R)$ となるため、円周長だけでなく誘導計量の各成分が一致します。$M>0$ では $0<f(R)<f_0(R)$ なので $0<\beta_0<\beta$ です。**同じ座標周期を無理に置く**と有限 $R$ で誘導計量が一致しません。
<!-- definition-example-end -->

共形境界の形だけを固定するので、$\beta$ はこの代表計量に対する逆温度です。有限半径の局所温度は $1/[\beta\sqrt{f(R)}]$ であり、境界の $1/\beta$ と同一視しません。[BHT12のEuclid正則周期](../BHT12/index.md#thm-bht12-nonextremal-period)が地平線を滑らかにすることで、正則ブラックホール候補の $\beta$ が決まります。

## 2. 地平線の半径から質量・温度・エントロピーを作る

まず $f(r_+)=0$ を質量について解きます。

$$
0=1-\frac{2GM}{r_+}+\frac{r_+^2}{L^2}
\quad\Longleftrightarrow\quad
2GM=r_+\left(1+\frac{r_+^2}{L^2}\right).
$$

質量を独立のパラメータとする代わりに、$r_+>0$ を動かして正則ブラックホールの一変数族を調べられます。ここでの半径微分 $dM/dr_+$ は $L,G$ を固定して**解族に沿って**行うもので、先ほどの固定 $M$ の $f'(r)$ とは区別します。

面積は $A=4\pi r_+^2$ です。[BHT9の面積エントロピー差の定理](../BHT9/index.md#thm-bht9-area-difference)は $\Lambda=0$ の漸近平坦な解族についての主張なので、AdSへ直接適用はできません。代わりに[BHT14の円錐先端の曲率寄与](../BHT14/index.md#def-bht14-conical-reduction)を局所的に使います。地平線でEuclid時間円周の開きを $2\pi\alpha$ としたとき、先端の曲率積分とEinstein–Hilbert作用への寄与は

$$
\int_{\rm tip}R[g]\sqrt g\,d^4x=4\pi(1-\alpha)A,\qquad
I_{\rm tip}=-\frac{(1-\alpha)A}{4G}.
$$

宇宙定数項は滑らかな体積項であり、先端のデルタ状曲率の係数を変えません。従って、このEinstein重力の先頭古典エントロピーは $S=A/(4G)=\pi r_+^2/G$ です。これは $\Lambda=0$ の定理を仮定外へ拡張した結果ではなく、AdSの地平線に対する局所的な面積係数の確認です。

<a id="prop-bht16-ads-state"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild–AdSの状態量と第一法則）**  
> 4次元、$G,L>0$、$\Lambda=-3/L^2$ の静的・球対称・非回転・無電荷Schwarzschild–AdS族で $r_+>0$ を正の地平線半径とする。$c=\hbar=k_B=1$、時間規格化をAdSの境界代表計量に固定すると、保存質量 $M$、Hawking温度 $T$、面積エントロピー $S$ は

$$
M=\frac{r_+}{2G}\left(1+\frac{r_+^2}{L^2}\right),\qquad
T=\frac{1+3r_+^2/L^2}{4\pi r_+},\qquad
S=\frac{\pi r_+^2}{G}.
$$

> $G,L$ 固定のこの解族では $dM=T\,dS$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

地平線方程式で $M$ を消し、[円錐正則性](../BHT12/index.md#thm-bht12-nonextremal-period)に $f'(r_+)$ を入力して $T$ を得ます。最後に半径微分で第一法則の係数を直接突き合わせます。

<!-- proof-start -->
### 証明

上で得た $M(r_+)$ は $f(r_+)=0$ と同値です。$f'(r)=2GM/r^2+2r/L^2$ に代入すると

$$
f'(r_+)=\frac{1+r_+^2/L^2}{r_+}+\frac{2r_+}{L^2}
=\frac{1+3r_+^2/L^2}{r_+}>0.
$$

よって単純零点の地平線であり、$\beta=4\pi/f'(r_+)$、$T=1/\beta=f'(r_+)/(4\pi)$ です。さらに

$$
\frac{dM}{dr_+}=\frac1{2G}\left(1+\frac{3r_+^2}{L^2}\right),\qquad
\frac{dS}{dr_+}=\frac{2\pi r_+}{G}.
$$

従って

$$
T\frac{dS}{dr_+}=\frac{1+3r_+^2/L^2}{4\pi r_+}
\frac{2\pi r_+}{G}
=\frac1{2G}\left(1+\frac{3r_+^2}{L^2}\right)
=\frac{dM}{dr_+}.
$$

これは $L$ を固定した第一法則です。$dL\ne0$ の場合に同じ式だけを使うことはできません。
<!-- proof-end -->

**手計算例**：$r_+=L$ なら $M=L/G$、$T=1/(\pi L)$、$S=\pi L^2/G$ です。$r_+\ll L$ では $T\sim1/(4\pi r_+)$ と漸近平坦Schwarzschildの温度へ近づきますが、$r_+\gg L$ では $T\sim3r_+/(4\pi L^2)$ と**大きいほど熱い**系に変わります。

## 3. 熱的AdSを引いたon-shell作用を境界項まで計算する

温度を固定したとき、質量・エントロピーの値だけから**なぜ熱的AdSと比べられるか**はまだ分かりません。比較対象が同じ境界値問題の解であることを確かめ、[BHT13のEuclid Einstein–Hilbert–GHY作用](../BHT13/index.md#def-bht13-euclidean-action)を、両方の滑らかな幾何で評価します。

<a id="prop-bht16-ads-action"></a>

<!-- formal-statement-start -->
> **命題（熱的AdSとの整合境界での相対作用）**  
> 4次元Euclid Einstein重力、$G,L>0$、$\Lambda=-3/L^2$ において、滑らかな非極限Schwarzschild–AdSサドルの地平線半径を $r_+>0$、正則周期を $\beta=4\pi/f'(r_+)$ とする。熱的AdSとの外側切断面 $r=R>r_+$ の誘導計量を合わせ、$R\to\infty$ を取る。両者のEinstein–Hilbert項とGHY項の差から、熱的AdSを零にした相対作用は

$$
\Delta I_E=\beta\left(\frac M2-\frac{r_+^3}{2GL^2}\right)
=\frac{\beta r_+}{4G}\left(1-\frac{r_+^2}{L^2}\right).
$$

> よって半古典のサドル自由エネルギー差 $\Delta F=\Delta I_E/\beta$ は右辺の $\beta$ を除いた値である。
<!-- formal-statement-end -->

### 証明の見取り図

宇宙定数があるので**体積積分が零ではありません**。切断面で時間円周を一致させてから、内部の体積項と外側のGHY項をそれぞれ引き算します。発散項を無理に個別極限せず、最後にまとめて極限を取ります。

<!-- proof-start -->
### 証明

真空Einstein方程式の跡より $R[g]=4\Lambda=-12/L^2$、従って $R[g]-2\Lambda=-6/L^2$ です。ここで $R[g]$ は計量 $g$ のスカラー曲率、引数のない $R$ は切断半径です。Euclid計量の行列式は $\sqrt g=r^2\sin\theta$ なので、内端 $r_+$ を滑らかな円板の中心とするブラックホールでは

$$
I_{\rm bulk}^{\rm BH}=\frac{3}{8\pi GL^2}\,
\beta\int_{r_+}^{R}4\pi r^2\,dr
=\frac\beta{2GL^2}(R^3-r_+^3).
$$

熱的AdSの内端 $r=0$ は滑らかで境界項を生まず、その体積項は $I_{\rm bulk}^{\rm AdS}=\beta_0R^3/(2GL^2)$ です。

外端では $f(R)>0$ なので単位法線は $n=\sqrt{f(R)}\,\partial_r$ です。[BHT13の静的球対称壁の外部曲率](../BHT13/index.md#prop-bht13-static-wall)を、誘導計量 $h=f(R)d\tau^2+R^2d\Omega_2^2$ に適用します。$h_{\tau\tau}=f(R)$ と球面の二つの対角成分 $R^2,R^2\sin^2\theta$ を法線方向に微分し、$h^{ij}$ で縮約すると

$$
\begin{aligned}
K&=\frac12h^{ij}\mathcal L_nh_{ij}
=\frac{\sqrt{f(R)}}2\left(\frac{f'(R)}{f(R)}+\frac2R+\frac2R\right)\\
&=\frac{f'(R)}{2\sqrt{f(R)}}+\frac{2\sqrt{f(R)}}R,\\
\int_{r=R}\sqrt h\,d^3y&=4\pi\beta R^2\sqrt{f(R)}.
\end{aligned}
$$

ゆえにGHY項は

$$
I_{\rm GHY}^{\rm BH}=-\frac\beta{2G}
\left(\frac{R^2f'(R)}2+2Rf(R)\right)
=-\frac\beta G\left(R-\frac{3GM}{2}+\frac{3R^3}{2L^2}\right).
$$

熱的AdS側では同じ計算で $I_{\rm GHY}^{\rm AdS}=-\beta_0(R+3R^3/(2L^2))/G$ です。従って両作用を先に合計すると

$$
I_{\rm BH}=\beta\left(-\frac{R^3}{GL^2}-\frac RG+\frac{3M}{2}-\frac{r_+^3}{2GL^2}\right),
$$

$$
I_{\rm AdS}=-\beta_0\left(\frac{R^3}{GL^2}+\frac RG\right).
$$

[境界周期の一致条件](#def-bht16-ads-canonical)に $f(R)=f_0(R)-2GM/R$ を入れ、$q_R=2GM/[Rf_0(R)]\to0$ と書くと

$$
\begin{aligned}
(\beta_0-\beta)\left(\frac{R^3}{GL^2}+\frac RG\right)
&=\beta\frac{Rf_0(R)}G\left(\sqrt{1-q_R}-1\right)\\
&=-\beta\frac{2M}{1+\sqrt{1-q_R}}\longrightarrow-\beta M.
\end{aligned}
$$

これを $I_{\rm BH}-I_{\rm AdS}$ に戻せば $\Delta I_E=\beta(M/2-r_+^3/(2GL^2))$ です。さらに地平線条件 $2GM=r_+(1+r_+^2/L^2)$ から

$$
\frac M2-\frac{r_+^3}{2GL^2}
=\frac{r_+}{4G}\left(1+\frac{r_+^2}{L^2}-\frac{2r_+^2}{L^2}\right)
=\frac{r_+}{4G}\left(1-\frac{r_+^2}{L^2}\right).
$$

最後に[BHT14の半古典サドル寄与と熱力学微分](../BHT14/index.md#def-bht14-saddle-weight)より、固定 $\beta$ の先頭指数では $\Delta F=\Delta I_E/\beta$ です。
<!-- proof-end -->

もう一つの独立な検算は[状態量の命題](#prop-bht16-ads-state)を用いることです。

$$
M-TS=\frac{r_+}{2G}\left(1+\frac{r_+^2}{L^2}\right)
-\frac{1+3r_+^2/L^2}{4\pi r_+}\frac{\pi r_+^2}G
=\frac{r_+}{4G}\left(1-\frac{r_+^2}{L^2}\right).
$$

有限切断面での周期のずれを落として作用を引くと、上の極限で必要な $-\beta M$ が消え、誤った自由エネルギーになります。これは「無限遠なら周期の違いは小さいから無視してよい」という**失敗例**です。差は小さくても、掛ける境界項は発散します。

## 4. 同じ温度の二枝と縮約方向の局所安定性

境界温度を $T_B=1/\beta>0$ に固定しても、任意の $r_+$ が滑らかなサドルになるわけではありません。正則性が要求するのは $T_B=T(r_+)$ です。枝を探すために $T(r_+)$ を微分し、熱容量も[境界指定の熱容量の定義](../BHT15/index.md#def-bht15-heat-capacity)で判定します。

また、正則でない $r_+$ を一つの変動方向として扱うため、[BHT14の円錐縮約作用](../BHT14/index.md#def-bht14-conical-reduction)と同じ発想を使います。$\beta$ と $L$ を固定し、地平線で円錐を許す一変数の熱力学的模型に $M(r_+)$ と $S(r_+)$ を入れます。

その理由を先に確認します。ある半径 $r$ の滑らかな周期を $\beta_H(r)=1/T(r)$、固定した境界周期との比を $\alpha=\beta/\beta_H(r)$ とします。地平線を除いたEuclid積分は時間周期に比例するため、整合した背景差引きの後、その寄与は $\alpha I_{\rm regular}=\alpha(\beta_HM-S)$ です。一方、円錐先端の欠損角 $2\pi(1-\alpha)$ は[円錐先端の曲率寄与](../BHT14/index.md#def-bht14-conical-reduction)によって $-S(1-\alpha)$ を作用に足します。両者を合計すると

$$
\alpha(\beta_HM-S)-S(1-\alpha)=\beta M-S.
$$

この縮約は先端近傍と球対称族に沿った形式的変動を使います。重力の全てのoff-shell幾何を積分した作用ではありません。

<a id="def-bht16-ads-reduced"></a>

<!-- formal-statement-start -->
> **定義（AdSの縮約正準作用）**  
> $G,L,\beta>0$ を固定した4次元Schwarzschild–AdSの地平線半径パラメータ $r>0$ に対し、$M(r)=r(1+r^2/L^2)/(2G)$、$S(r)=\pi r^2/G$ を用いて

$$
I_\beta(r)=\beta M(r)-S(r)
=\frac{\beta r}{2G}\left(1+\frac{r^2}{L^2}\right)-\frac{\pi r^2}{G}
$$

> を縮約正準作用と定義する。停留点だけを正則サドル候補とし、$I_\beta''$ はこの$r$方向に限る局所二階変分を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht16-ads-reduced -->
**定義の確認**：$r=L$ かつ $\beta=\pi L$ では $M=L/G$、$S=\pi L^2/G$ なので $I_\beta(L)=\pi L^2/G-\pi L^2/G=0$。一方、$\beta=\pi L$ を保って $r=L/3$ とすると $I_\beta(L/3)=2\pi L^2/(27G)>0$ です。

さらに同じ固定 $\beta=\pi L$ で半径 $r$ だけを動かして微分すると

$$
I_\beta'(r)=\frac{\pi L}{2G}\left(1+\frac{3r^2}{L^2}-\frac{4r}{L}\right)
=\frac{3\pi}{2GL}\left(r-\frac L3\right)(r-L).
$$

よって二つとも定義にいう停留点です。二階微分まで確認すると

$$
I_\beta'(L/3)=I_\beta'(L)=0,\qquad
I_\beta''(L/3)=-\frac\pi G<0,\quad I_\beta''(L)=\frac\pi G>0.
$$

同じ境界温度の二候補でも半径方向の局所符号は異なります。これは全重力モードの安定性判定ではありません。
<!-- definition-example-end -->

<a id="thm-bht16-ads-branches"></a>

<!-- formal-statement-start -->
> **定理（Schwarzschild–AdSの二分岐と局所符号）**  
> 4次元、$G,L>0$、$r_+>0$ のSchwarzschild–AdS正則解族を、固定した $G,L$ と境界温度で比較する。温度の最小値は

$$
T_{\min}=\frac{\sqrt3}{2\pi L},\qquad r_{\min}=\frac L{\sqrt3}.
$$

> $T_B<T_{\min}$ では滑らかなブラックホールは存在しない。$T_B=T_{\min}$ では一つの重根があり、$T_B>T_{\min}$ では $r_s<L/\sqrt3<r_l$ の二つの正則半径がある。熱容量は $r_+\ne L/\sqrt3$ で

$$
C_L=\left(\frac{dM}{dT}\right)_{L,G}
=\frac{2\pi r_+^2}{G}\frac{1+3r_+^2/L^2}{3r_+^2/L^2-1}.
$$

> 小枝では $C_L<0$ で縮約作用の局所極大、大枝では $C_L>0$ で縮約作用の局所極小となる。折返し点では $C_L$ は有限に定義されず、二階変分は零となる。これらは $r$ 方向の判定であり、全重力モードの安定性を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

温度は $1/r$ と $r$ の和です。その微分の零点で二分岐し、$dM/dr>0$ なので熱容量の符号は $dT/dr$ が決めます。縮約作用は最初に一階微分して正則条件を確かめ、次に停留点で二階微分します。

<!-- proof-start -->
### 証明

$T=(1/r+3r/L^2)/(4\pi)$ なので

$$
T'(r)=\frac1{4\pi}\left(\frac3{L^2}-\frac1{r^2}\right),\qquad
T''(r)=\frac1{2\pi r^3}>0.
$$

$T'$ は $r=L/\sqrt3$ の前で負、後で正です。両端 $r\downarrow0$ と $r\to\infty$ で $T\to\infty$ だから、この点の $T=\sqrt3/(2\pi L)$ は唯一の大域最小です。$T_B>T_{\min}$ では単調な左右の各区間にちょうど一解あります。

また[状態量](#prop-bht16-ads-state)より $M'(r)=(1+3r^2/L^2)/(2G)>0$ です。$r\ne L/\sqrt3$ で

$$
\frac{M'(r)}{T'(r)}
=\frac{(1+3r^2/L^2)/(2G)}{(3r^2/L^2-1)/(4\pi r^2)}
=\frac{2\pi r^2}{G}\frac{1+3r^2/L^2}{3r^2/L^2-1}.
$$

[縮約作用](#def-bht16-ads-reduced)を $r$ で微分すると

$$
I_\beta'(r)=\beta M'(r)-S'(r)
=\frac\beta{2G}\left(1+\frac{3r^2}{L^2}\right)-\frac{2\pi r}G.
$$

$I_\beta'(r)=0$ は $\beta=4\pi r/(1+3r^2/L^2)=1/T(r)$ と同値で、正則性と一致します。二階微分は

$$
I_\beta''(r)=\beta\frac{3r}{GL^2}-\frac{2\pi}G.
$$

停留点で $\beta=4\pi r/(1+3r^2/L^2)$ を代入すると

$$
I_\beta''(r_*)=\frac{2\pi}G\frac{3r_*^2/L^2-1}{1+3r_*^2/L^2}.
$$

分母は正なので、半径が折返し点より小さいか大きいかで二階変分の符号が反転します。
<!-- proof-end -->

たとえば $r=L/3$ では $T=1/(\pi L)$、$C_L=-4\pi L^2/(9G)$ です（分子 $2\pi L^2/(9G)\cdot4/3$、分母 $-2/3$）。$r=L$ では同じ $T=1/(\pi L)$ でも $C_L=4\pi L^2/G>0$ です。**同じ温度でも熱容量の符号が違う**ことが分かります。

## 5. Hawking–Page温度は「局所安定の始まり」ではない

大枝が縮約作用の局所極小になっても、その値が熱的AdSより低いとは限りません。[相対作用の命題](#prop-bht16-ads-action)の自由エネルギーを、両者の共通温度で比較します。ブラックホールの自由エネルギー差 $\Delta F(r)=r(1-r^2/L^2)/(4G)$ は、$r=L$ で符号を変えます。

<a id="thm-bht16-hawking-page"></a>

<!-- formal-statement-start -->
> **定理（重力サドルのHawking–Page転移）**  
> 4次元の純Einstein重力で $G,L>0$、$\Lambda=-3/L^2$、非回転・無電荷、共形境界 $S^1_\beta\times S^2_L$ の正準データを固定する。熱的AdSを相対作用零とし、滑らかなSchwarzschild–AdSサドルのみを競合させる半古典近似において、作用差 $\Delta I_E=\beta\,r_+(1-r_+^2/L^2)/(4G)$ は大枝の

$$
r_+=L,\qquad T_{\rm HP}=\frac1{\pi L}
$$

> で零となる。$T_{\min}<T_B<T_{\rm HP}$ では存在する大枝は局所極小でも $\Delta I_E>0$ で熱的AdSより指数的に抑制され、$T_B>T_{\rm HP}$ では大枝の $\Delta I_E<0$ で熱的AdSより大きなサドル重みを持つ。$T_B=T_{\rm HP}$ では二つの古典指数が等しい。$T_B<T_{\min}$ ではブラックホールの正則サドルは存在しない。ここでの優勢は指定したサドル群の先頭半古典指数についてである。
<!-- formal-statement-end -->

### 証明の見取り図

作用差の正負は $1-r^2/L^2$ に尽きます。ただし、小枝の存在、温度と半径の増減、局所安定性を分けて確かめなければ「温度が高い方」と結び付けられません。

<!-- proof-start -->
### 証明

$\beta>0$、$r_+>0$、$G>0$ なので[相対作用式](#prop-bht16-ads-action)の符号は $1-r_+^2/L^2$ の符号です。零となる正の半径は $r_+=L$ だけであり、[温度式](#prop-bht16-ads-state)への代入で

$$
T(L)=\frac{1+3}{4\pi L}=\frac1{\pi L}.
$$

交差点 $r_+=L$ は最小点 $L/\sqrt3$ より大きく、大枝にあります。[二分岐定理](#thm-bht16-ads-branches)から大枝では $T'(r)>0$ です。したがって

$$
\begin{aligned}
T_{\min}<T_B<T_{\rm HP}&\ \Longrightarrow\ r_+<L\ \Longrightarrow\ \Delta I_E>0,\\
T_B>T_{\rm HP}&\ \Longrightarrow\ r_+>L\ \Longrightarrow\ \Delta I_E<0.
\end{aligned}
$$

小枝は常に $r_s<L/\sqrt3<L$ なので作用差は正です。熱的AdSの先頭重みを $e^0$ と選んだから、相対重み $e^{-\Delta I_E}$ の大小がこの符号で決まります。$T_B\le T_{\min}$ の根の個数についても上の二分岐定理によります。
<!-- proof-end -->

温度比は $T_{\rm HP}/T_{\min}=2/\sqrt3>1$ です。**熱容量が正に変わる温度と、熱的AdSを上回る温度は一致しません。** これは有限空洞で[局所極小と平坦背景の優勢がずれた例](../BHT15/index.md#prop-bht15-saddle-crossing)のAdS版です。

### エントロピーの飛びと潜熱

古典的熱的AdSには地平線がなく、相対エネルギー・地平線エントロピーを $0$ と取ります。熱気体のエントロピーや量子補正は次の先頭 $O(1/G)$ の比較には含めません。$r_+=L$ のブラックホールでは $M=L/G$、$S=\pi L^2/G$。これらの値から、共通温度で競う二つのサドルのエントロピー差と熱の授受を求めます。

<a id="prop-bht16-latent-heat"></a>

<!-- formal-statement-start -->
> **命題（転移点のエントロピー差と潜熱）**  
> 上の4次元、$G,L>0$ を固定した熱的AdSとSchwarzschild–AdSの先頭古典サドルの比較で、熱的AdSの地平線エントロピー・相対エネルギーを零とすると、$T_{\rm HP}=1/(\pi L)$ での大枝ブラックホールへのエントロピー差 $\Delta S$ と潜熱 $Q_{\rm latent}$ は

$$
\Delta S=\frac{\pi L^2}G,\qquad
Q_{\rm latent}=T_{\rm HP}\Delta S=\frac LG=\Delta M.
$$

> 従って先頭半古典サドルの大きな $1/G$ の極限では一次転移に対応する。有限 $G$ の厳密な分配関数に非解析性があることまでは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

転移点では自由エネルギー差が零です。エネルギーとエントロピーをそれぞれ $r=L$ で計算し、$\Delta F=\Delta M-T\Delta S=0$ を確認します。

<!-- proof-start -->
### 証明

[状態量の式](#prop-bht16-ads-state)を $r_+=L$ に代入すると $M=L(1+1)/(2G)=L/G$、$S=\pi L^2/G$、$T=1/(\pi L)$ です。熱的AdSの古典的な相対 $M,S$ は零なので差はこの値です。よって

$$
T_{\rm HP}\Delta S=\frac1{\pi L}\frac{\pi L^2}G
=\frac LG=\Delta M,
\qquad \Delta F=\Delta M-T_{\rm HP}\Delta S=0.
$$

熱的AdS側とブラックホール側では、[BHT14の正準熱力学微分](../BHT14/index.md#def-bht14-saddle-weight)から導く $S=-\partial F/\partial T$ の先頭値が異なります。そのため、競合サドルの最小自由エネルギーにはこの近似で傾きの飛びがあります。微分では $G,L$ と境界の他のデータを固定します。
<!-- proof-end -->

## 6. 何が成立し、何をまだ言えないか

| 温度の範囲 | 正則Schwarzschild–AdS | 一変数の局所判定 | 熱的AdSとの先頭指数 |
| --- | --- | --- | --- |
| $0<T_B<T_{\min}$ | なし | 対象なし | 熱的AdSのみ |
| $T_B=T_{\min}$ | 重根1つ | 縮約二階変分が零 | ブラックホールの作用差は正 |
| $T_{\min}<T_B<T_{\rm HP}$ | 小枝・大枝 | 小枝は極大、大枝は極小 | 熱的AdSが優勢 |
| $T_B=T_{\rm HP}$ | 小枝・大枝 | 小枝は極大、大枝は極小 | 熱的AdSと大枝が同じ指数 |
| $T_B>T_{\rm HP}$ | 小枝・大枝 | 小枝は極大、大枝は極小 | 大枝が優勢 |

- 正準の境界温度と固定 $L$ が重要です。固定エネルギーの微正準アンサンブル、境界の半径・共形代表計量の変更、電荷・角運動量を持つ系で、この表をそのまま用いません。
- 重力作用の比較には、同じ境界幾何へ誘導計量を一致させ、同じ差引き規約で評価することが必要です。個々の非コンパクト作用には発散があり、そのまま数値比較できません。
- 局所熱容量と縮約作用のHessianが調べるのは**球対称の半径変動という限られた方向**です。非球対称摂動、物質場、重力の経路積分の測度や負モードを評価していないため、完全な量子分配関数の安定性や厳密な相転移の証明ではありません。
- 転移を大きな $1/G$ で鋭く見ることと、$G$ が有限でもすべての熱的・量子補正を無視できることは異なります。境界の場の理論への対応付けは、その対応を学ぶ際に扱います。

## 7. 演習――境界条件から相転移まで再構成する

### Level A：温度、境界、熱容量、相対作用

<a id="ex-bht16-a01"></a>

#### BHT16-A01 地平線方程式と温度

- Level: A
- 問題: 4次元Schwarzschild–AdSで $G,L>0$、$f(r)=1-2GM/r+r^2/L^2$、地平線を $f(r_+)=0$ の正の根とする。$M(r_+)$ と $f'(r_+)$ を導き、$r_+=L/2$ で $T=f'(r_+)/(4\pi)$ を求めよ。

<!-- solution-start -->
**詳細解答**：地平線方程式を $2GM/r_+=1+r_+^2/L^2$ と書けば

$$
M(r_+)=\frac{r_+}{2G}\left(1+\frac{r_+^2}{L^2}\right).
$$

固定した $M,L$ について $f'(r)=2GM/r^2+2r/L^2$ なので、$2GM=r_+(1+r_+^2/L^2)$ を**微分した式へ代入**すると

$$
f'(r_+)=\frac{1+r_+^2/L^2}{r_+}+\frac{2r_+}{L^2}
=\frac{1+3r_+^2/L^2}{r_+}.
$$

$r_+=L/2$ で $f'= (1+3/4)/(L/2)=7/(2L)$、従って $T=7/(8\pi L)$ です。単純零点なので[正則周期の定理](../BHT12/index.md#thm-bht12-nonextremal-period)の仮定も満たします。
<!-- solution-end -->

<a id="ex-bht16-a02"></a>

#### BHT16-A02 熱的AdSの周期を合わせる

- Level: A
- 問題: $G,L,M>0$、切断半径 $R>r_+$ を固定し、$f(R)=1-2GM/R+R^2/L^2$、$f_0(R)=1+R^2/L^2$ とする。Schwarzschild–AdSのEuclid座標周期が $\beta$ のとき、熱的AdSの座標周期 $\beta_0$ を同じ誘導計量から決め、$\beta_0<\beta$ と $\lim_{R\to\infty}\beta_0/\beta=1$ を示せ。

<!-- solution-start -->
**詳細解答**：両計量の切断球面の半径は $R$ で同じです。時間円周の固有長はブラックホールが $\beta\sqrt{f(R)}$、熱的AdSが $\beta_0\sqrt{f_0(R)}$ なので、[境界円周を一致させる定義](#def-bht16-ads-canonical)の条件から

$$
\beta_0=\beta\sqrt{\frac{f(R)}{f_0(R)}}
=\beta\sqrt{1-\frac{2GM}{R(1+R^2/L^2)}}.
$$

$R>r_+$ で $f(R)>0$、$M>0$ で $f(R)<f_0(R)$ だから平方根は $(0,1)$ に入り、$\beta_0<\beta$。分数の中の補正は $R\to\infty$ で $O(R^{-3})$ なので平方根は1へ収束します。ただし、その差を作用差の計算前に零と置いてはいけません。
<!-- solution-end -->

<a id="ex-bht16-a03"></a>

#### BHT16-A03 最小温度と二枝

- Level: A
- 問題: $L>0$ を固定した $T(r)=(1+3r^2/L^2)/(4\pi r)$、$r>0$ の導関数、最小点、最小温度を求めよ。$T_B=1/(\pi L)$ で $r/L$ の正の解をすべて求めよ。

<!-- solution-start -->
**詳細解答**：$T=(r^{-1}+3r/L^2)/(4\pi)$ と分けると

$$
T'(r)=\frac1{4\pi}\left(-\frac1{r^2}+\frac3{L^2}\right).
$$

零点は $r=L/\sqrt3$ だけで、その左は負、右は正です。両端の温度は無限大だから大域最小です。代入して $T_{\min}=\sqrt3/(2\pi L)$。$x=r/L>0$、$T_B=1/(\pi L)$ とすると

$$
\frac{1+3x^2}{4\pi Lx}=\frac1{\pi L}
\Longleftrightarrow 3x^2-4x+1=(3x-1)(x-1)=0.
$$

よって $x=1/3,1$ の二つです。$1/3<1/\sqrt3<1$ なので、小枝・大枝をそれぞれ一つずつ与えます。
<!-- solution-end -->

<a id="ex-bht16-a04"></a>

#### BHT16-A04 熱容量はどこで符号を変えるか

- Level: A
- 問題: $G,L>0$ を固定して $M(r)=r(1+r^2/L^2)/(2G)$、$T(r)=(1+3r^2/L^2)/(4\pi r)$ とする。$dM/dT$ を求め、$r=L/3$ と $r=L$ における値を計算せよ。

<!-- solution-start -->
**詳細解答**：$M'=(1+3r^2/L^2)/(2G)$、$T'=(3/L^2-1/r^2)/(4\pi)$ で、$r\ne L/\sqrt3$ なら

$$
C_L=\frac{M'}{T'}=\frac{2\pi r^2}{G}
\frac{1+3r^2/L^2}{3r^2/L^2-1}.
$$

$r=L/3$ では $3r^2/L^2=1/3$ だから

$$
C_L=\frac{2\pi L^2}{9G}\frac{4/3}{-2/3}
=-\frac{4\pi L^2}{9G}.
$$

$r=L$ では $3r^2/L^2=3$ なので $C_L=(2\pi L^2/G)(4/2)=4\pi L^2/G$。よって同一温度 $1/(\pi L)$ でも小枝は負、大枝は正です。
<!-- solution-end -->

<a id="ex-bht16-a05"></a>

#### BHT16-A05 作用差の符号と潜熱

- Level: A
- 問題: $G,L>0$、$r>0$ とし、正則Schwarzschild–AdSと熱的AdSの自由エネルギー差が $\Delta F=r(1-r^2/L^2)/(4G)$ であるとする。$r=L/2,L,2L$ で符号と値を求めよ。また転移点 $r=L$ の $S=\pi L^2/G$ と $T=1/(\pi L)$ から潜熱を求めよ。

<!-- solution-start -->
**詳細解答**：[相対自由エネルギー](#prop-bht16-ads-action)へ各半径を代入すると

$$
\Delta F(L/2)=\frac{L}{8G}\left(1-\frac14\right)=\frac{3L}{32G}>0,
$$

$$
\Delta F(L)=0,\qquad
\Delta F(2L)=\frac{L}{2G}(1-4)=-\frac{3L}{2G}<0.
$$

転移では熱的AdSの先頭エントロピーを零と取るので $\Delta S=\pi L^2/G$ です。[潜熱の命題](#prop-bht16-latent-heat)の式を $T\Delta S$ から計算すると $Q_{\rm latent}=(1/\pi L)(\pi L^2/G)=L/G$ です。
<!-- solution-end -->

### Level B：境界作用、微分、有限温度の競合

<a id="ex-bht16-b01"></a>

#### BHT16-B01 EH項とGHY項を別々に足す

- Level: B
- 問題: $G,L>0$、$\Lambda=-3/L^2$ の4次元Euclid Einstein重力を考える。Schwarzschild–AdSの $f(r)=1-2GM/r+r^2/L^2$、正則周期 $\beta$、地平線 $r_+$、切断半径 $R>r_+$ とする。熱的AdSは $f_0=1+r^2/L^2$、周期 $\beta_0=\beta\sqrt{f(R)/f_0(R)}$ とする。$R[g]=-12/L^2$、$K=f'/(2\sqrt f)+2\sqrt f/R$ を用いて、両者の体積項とGHY項を計算し、差の $R\to\infty$ の極限を求めよ。

<!-- solution-start -->
**詳細解答**：[Euclid作用](../BHT13/index.md#def-bht13-euclidean-action)の体積被積分量は $-(R[g]-2\Lambda)/(16\pi G)=3/(8\pi GL^2)$ です。$R[g]$ はスカラー曲率で、切断半径 $R$ とは異なります。$\sqrt g=r^2\sin\theta$ なので

$$
I_{\rm bulk}^{\rm BH}=\frac\beta{2GL^2}(R^3-r_+^3),\qquad
I_{\rm bulk}^{\rm AdS}=\frac{\beta_0R^3}{2GL^2}.
$$

外端の積分では $K\sqrt h=[f'(R)R^2/2+2Rf(R)]\sin\theta$。$f'=2GM/R^2+2R/L^2$ より

$$
\begin{aligned}
\frac{R^2f'}2+2Rf
&=GM+\frac{R^3}{L^2}+2R-4GM+\frac{2R^3}{L^2}\\
&=2R-3GM+\frac{3R^3}{L^2}.
\end{aligned}
$$

従って $I_{\rm GHY}^{\rm BH}=-\beta(R-3GM/2+3R^3/(2L^2))/G$、$I_{\rm GHY}^{\rm AdS}=-\beta_0(R+3R^3/(2L^2))/G$。両者を足して引けば

$$
\Delta I_E(R)=\beta\left(\frac{3M}2-\frac{r_+^3}{2GL^2}\right)
+(\beta_0-\beta)\frac{R(1+R^2/L^2)}G.
$$

$q_R=2GM/[R(1+R^2/L^2)]$ と置くと第二項は $-2\beta M/(1+\sqrt{1-q_R})\to-\beta M$。従って $\Delta I_E=\beta(M/2-r_+^3/(2GL^2))$。最後に $M=r_+(1+r_+^2/L^2)/(2G)$ を代入して[相対作用の式](#prop-bht16-ads-action)を回復します。初めから $\beta_0=\beta$ と置くと $-\beta M$ を失います。
<!-- solution-end -->

<a id="ex-bht16-b02"></a>

#### BHT16-B02 作用の温度微分からエネルギーを戻す

- Level: B
- 問題: $G,L>0$ を固定した正則Schwarzschild–AdS解族で、$T(r)=(1+3r^2/L^2)/(4\pi r)$、$M(r)=r(1+r^2/L^2)/(2G)$、$S(r)=\pi r^2/G$、$F(r)=M(r)-T(r)S(r)$、$\beta(r)=1/T(r)$ とする。$r\ne L/\sqrt3$ の各枝で $d[\beta F]/d\beta=M$、$\beta M-\beta F=S$ を途中式付きで示せ。

<!-- solution-start -->
**詳細解答**：[第一法則](#prop-bht16-ads-state)により $M'=TS'$ が成り立ちます。従って

$$
F'=M'-T'S-TS'= -T'S.
$$

$\beta=1/T$ だから $\beta'=-T'/T^2=-\beta^2T'$。$r\ne L/\sqrt3$ では $T'\ne0$ なので $\beta$ を枝上の局所媒介変数にできます。連鎖律で

$$
\begin{aligned}
\frac{d(\beta F)}{d\beta}
&=F+\beta\frac{dF/dr}{d\beta/dr}
=F+\beta\frac{-T'S}{-\beta^2T'}\\
&=F+\frac S\beta=F+TS=M.
\end{aligned}
$$

また $\beta M-\beta F=\beta(M-F)=\beta TS=S$ です。折返し点では $T'=\beta'=0$ のため、この連鎖律の商をそのまま使えません。
<!-- solution-end -->

<a id="ex-bht16-b03"></a>

#### BHT16-B03 同温二解の縮約作用の曲率

- Level: B
- 問題: $G,L>0$、固定 $\beta=\pi L$ の縮約正準作用を $I_\beta(r)=\beta r(1+r^2/L^2)/(2G)-\pi r^2/G$ とする。停留点をすべて求め、二階微分の符号、熱的AdSとの相対作用の符号をそれぞれ判定せよ。二つの判定がなぜ異なるか説明せよ。

<!-- solution-start -->
**詳細解答**：$I_\beta'=\beta(1+3r^2/L^2)/(2G)-2\pi r/G$。$x=r/L$ と置いて $\beta=\pi L$ を入れると

$$
I_\beta'=\frac{\pi L}{2G}(1+3x^2-4x)
=\frac{\pi L}{2G}(3x-1)(x-1).
$$

従って停留半径は $r=L/3,L$ の二つです。$I_\beta''=3\beta r/(GL^2)-2\pi/G$ から

$$
I_\beta''(L/3)=-\frac\pi G<0,\qquad
I_\beta''(L)=\frac\pi G>0.
$$

一方、[相対作用](#prop-bht16-ads-action)にこの二半径を代入すると

$$
\Delta I_E(L/3)=\frac{\pi L^2}{12G}\left(1-\frac19\right)
=\frac{2\pi L^2}{27G}>0,\qquad \Delta I_E(L)=0.
$$

小枝は縮約方向に局所極大、大枝は局所極小ですが、後者も熱的AdSと**同じ**先頭指数で、熱的AdSより必ず優勢とは言えません。Hessianの符号は一点の近傍の変化、相対作用の符号は別のサドルとの値の比較だからです。
<!-- solution-end -->

<a id="ex-bht16-b04"></a>

#### BHT16-B04 高温の大枝はどう振る舞うか

- Level: B
- 問題: $G,L>0$ を固定し、$r\gg L$ の大枝で $T(r)=(1+3r^2/L^2)/(4\pi r)$、$S(r)=\pi r^2/G$、$F(r)=r(1-r^2/L^2)/(4G)$ とする。$T\to\infty$ での $r(T)$、$S(T)$、$F(T)$ の先頭項を求め、$-dF/dT$ が $S$ の先頭項と一致することを確かめよ。

<!-- solution-start -->
**詳細解答**：$r\gg L$ では $3r/L^2$ が $1/r$ より支配的なので

$$
T(r)=\frac{3r}{4\pi L^2}\left(1+\frac{L^2}{3r^2}\right),
\qquad r(T)\sim\frac{4\pi L^2}{3}T.
$$

これを面積エントロピーへ代入すると

$$
S(T)\sim\frac\pi G\left(\frac{4\pi L^2T}{3}\right)^2
=\frac{16\pi^3L^4}{9G}T^2.
$$

自由エネルギーは $F(r)=r/(4G)-r^3/(4GL^2)$ で、後者が先頭です。従って

$$
F(T)\sim-\frac1{4GL^2}\left(\frac{4\pi L^2T}3\right)^3
=-\frac{16\pi^3L^4}{27G}T^3.
$$

その温度微分の負は $16\pi^3L^4T^2/(9G)$ となり、上の $S(T)$ の先頭係数と一致します。ここでは大枝の高温極限を取っており、小枝へ外挿していません。
<!-- solution-end -->

### Level C：同じ境界温度での完全なサドル比較

<a id="ex-bht16-c01"></a>

#### BHT16-C01 高温側の二枝と熱的AdSを比較する

- Level: C
- 問題: 4次元の無電荷・非回転Schwarzschild–AdSのEinstein重力で $G,L>0$ と $\Lambda=-3/L^2$ を固定する。境界代表計量は $S^1_\beta\times S^2_L$、$\beta=4\pi L/5$ とする。$x=r_+/L>0$ を地平線半径の無次元量とし、$M=Lx(1+x^2)/(2G)$、$T=(1+3x^2)/(4\pi Lx)$、$S=\pi L^2x^2/G$ を与える。熱的AdSの相対作用を零とする。

  1. 円錐正則条件から $x$ の全正根を求め、最小温度と比較して二根が存在する理由を述べよ。
  2. 固定 $\beta$ の縮約作用 $I_\beta=\beta M-S$ を作り、各根の停留性と二階微分の符号を確かめよ。
  3. $\Delta I_E=\beta(M-TS)$ を各根で評価し、熱的AdSを含む三サドルの先頭指数の大小を判定せよ。
  4. $G,L$ を変えずに温度を下げたとき、何が $T_{\rm HP}$ と $T_{\min}$ で起きるか説明し、全重力モードの安定性についての結論の範囲を述べよ。

<!-- solution-start -->
**詳細解答**：**（1）** 正則周期の条件は $T=1/\beta=5/(4\pi L)$ なので

$$
\frac{1+3x^2}{4\pi Lx}=\frac5{4\pi L}
\Longleftrightarrow 3x^2-5x+1=0.
$$

判別式は $25-12=13>0$、二つの正根は

$$
x_s=\frac{5-\sqrt{13}}6,\qquad
x_l=\frac{5+\sqrt{13}}6.
$$

$\sqrt{13}>3$ だから $x_s<1/3<1/\sqrt3$、$x_l>4/3>1$ です。また $T_B/T_{\min}=[5/(4\pi L)]/[\sqrt3/(2\pi L)]=5/(2\sqrt3)>1$ なので、[二分岐定理](#thm-bht16-ads-branches)と一致します。

**（2）** 定義された $M,S$ から

$$
I_\beta(x)=\frac{\beta L}{2G}x(1+x^2)-\frac{\pi L^2}Gx^2
=\frac{2\pi L^2}{5G}x(1+x^2)-\frac{\pi L^2}Gx^2.
$$

$x$ で微分して

$$
\frac{dI_\beta}{dx}=\frac{2\pi L^2}{5G}(1+3x^2-5x),
\qquad
\frac{d^2I_\beta}{dx^2}=\frac{2\pi L^2}{5G}(6x-5).
$$

両根で一階微分は零です。$6x_s-5=-\sqrt{13}<0$、$6x_l-5=+\sqrt{13}>0$ なので小枝は縮約方向の局所極大、大枝は局所極小。$r=Lx$ への変数変換でも二階微分は $L^{-2}$ 倍となるだけで、符号は変わりません。

**（3）** 正則解では[相対作用式](#prop-bht16-ads-action)を使い、$\beta=4\pi L/5$ から

$$
\Delta I_E(x)=\frac{\beta Lx}{4G}(1-x^2)
=\frac{\pi L^2}{5G}x(1-x^2).
$$

$0<x_s<1$ なので $\Delta I_E(x_s)>0$、$x_l>1$ なので $\Delta I_E(x_l)<0$ です。熱的AdSは $I=0$ と取ったので、同じ正準境界での先頭重みは

$$
e^{-I(x_l)}>e^0>e^{-I(x_s)}.
$$

従って比較した三つの古典サドルの中で**大枝の指数が最大**です。小枝にも正則解としての意味はありますが、局所極小ではありません。

**（4）** 現在の $T_B=5/(4\pi L)$ は $T_{\rm HP}=1/(\pi L)$ より高いので、ここから冷やすと $T_{\rm HP}$ で大枝の相対作用が零になり、熱的AdSと先頭指数が等しくなります。$T_{\min}<T_B<T_{\rm HP}$ では大枝自体は存続して局所極小ですが熱的AdSより作用が高いです。さらに $T_{\min}=\sqrt3/(2\pi L)$ で二枝が合体し、それ未満では滑らかなブラックホール枝がなくなります。

これは $S^1\times S^2$ 境界・固定 $G,L$・純Einstein重力の指定サドルに関する半古典比較です。半径以外の重力変動、物質・放射、量子補正の寄与を計算していないため、全重力モードの安定性や有限 $G$ での厳密な非解析性までは導けません。
<!-- solution-end -->

---

有限壁を置いたBHT15と、AdSの共形境界を使った本講では、温度を揃える手段が違います。しかし**境界で何を固定するか → 滑らかなサドルを選ぶ → 局所二階変分を調べる → 競合サドルの作用を引く**という論理の順序は同じです。次講BHT17「電荷・回転とアンサンブル選択」では、固定電荷と固定電位、固定角運動量と固定角速度でこの順序がどう変わるかを調べます。

