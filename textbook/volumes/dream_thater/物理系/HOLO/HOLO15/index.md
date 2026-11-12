# HOLO15 境界の熱状態とAdSブラックホール

[HOLO14の繰り込み済み応答](../HOLO14/index.md#def-holo14-renormalized-responses)では、境界源を変分してCFTの期待値を取り出しました。今度は源を加えず、**境界理論を温度 $T$ の熱平衡に置くと、重力側ではどの幾何が寄与するか**を考えます。局所的な場の応答だけでは、熱的AdSとブラックホールのどちらが統計的に優勢かは決まりません。

[ブラックホール熱力学のHawking–Page転移](../../BHT/BHT16/index.md#thm-bht16-hawking-page)では、同じ境界温度における二つのEuclid幾何の**相対作用**まで計算しました。本講はその重力計算を重複させず、熱的跡・分配関数・CFTの自由エネルギーへ翻訳します。中心にあるのは「重力の鞍点の入れ替わり」と「有限温度の量子場理論の熱的状態」の条件付きの対応です。

## 0. 比較する系・境界条件・近似を固定する

4次元の純Einstein重力に負の宇宙定数 $\Lambda=-3/L^2$ を入れ、$G=G_N>0$、$L>0$、$c=\hbar=k_B=1$ を固定します。Lorentz計量は $(-,+,+,+)$、Euclid計量は正定値とします。回転・電荷・化学ポテンシャルを零とし、境界代表計量を

$$
ds_{\partial,E}^2=d\tau^2+L^2d\Omega_2^2,\qquad
\tau\sim\tau+\beta,\qquad \beta=T^{-1}>0
$$

に選びます。すなわち境界空間は半径 $L$ の二球 $S_L^2$、Euclid時間は長さ $\beta$ の円です。同じ空間のLorentz時間は $ds_{\partial,L}^2=-dt^2+L^2d\Omega_2^2$ です。CFT側では、この円筒上に定義された**重力双対を持つと仮定した**3次元CFTを扱います。任意のCFTがこの単純なEinstein重力に双対であるとは仮定しません。

重力は $L^2/G\gg1$ の半古典領域に制限し、無限体積極限を取らず、**有限の球面体積** $V_2=4\pi L^2$ で比較します。[HOLO6の制御された重力近似](../HOLO6/index.md#def-holo6-controlled-window)が必要とする大きな有効自由度や重い高スピン励起の条件を、単に「温度が高い」ことから導いたとは考えません。相対作用は同一境界データで評価し、熱的AdSの古典作用を零とする共通の差引き規約を用います。量子揺らぎの行列式、熱気体の $O(G^0)$ 寄与、その他のサドルは先頭の指数比較から分けます。

## 1. 熱的跡はなぜEuclid時間の円になるか

境界理論のHilbert空間を $\mathcal H$、自己共役なHamiltonianを $H$ とします。$e^{-\beta H}$ が跡クラスとなる温度域を仮定すれば、エネルギー固有状態を和で数える熱分配関数が定義できます。これを重力の作用と比べるには、まず**同じ温度で比較する量**を作る必要があります。

<a id="def-holo15-thermal-state"></a>

<!-- formal-statement-start -->
> **定義（境界の正準熱状態と自由エネルギー）**  
> 半径 $L$ の二球上の境界量子理論で、$H$ を下に有界な自己共役Hamiltonian、$\beta>0$ を固定する。$e^{-\beta H}$ が跡クラスで $0<Z(\beta)<\infty$ のとき、正準分配関数 $Z$、熱状態 $\rho_\beta$、自由エネルギー $F$ を

$$
Z(\beta)=\operatorname{Tr}_{\mathcal H}e^{-\beta H},
\qquad
\rho_\beta=\frac{e^{-\beta H}}{Z(\beta)},
\qquad
F(\beta)=-\frac1\beta\log Z(\beta)
$$

> とする。エネルギーやエントロピーの微分が許される温度域では、$E=-\partial_\beta\log Z$、$S=\beta(E-F)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo15-thermal-state -->
**定義の確認**：熱重みの仕組みを有限次元に切り出します。二次元Hilbert空間の正規直交なエネルギー固有基底を $|0\rangle,|1\rangle$ とし、$H|0\rangle=0$、$H|1\rangle=\varepsilon|1\rangle$（$\varepsilon>0$）とします。この基底に関するHamiltonianの行列表現が $H=\operatorname{diag}(0,\varepsilon)$ です。固有値が実数のため $H$ は自己共役で、$H\ge0$ です。指数作用素 $e^{-\beta H}$ は同じ基底で対角化され、固有値が $1$ と $q=e^{-\beta\varepsilon}\in(0,1)$ です。従って有限次元で跡クラスの条件を満たし、

$$
Z=1+q,\qquad \rho_\beta=\frac1{1+q}
\begin{pmatrix}1&0\\0&q\end{pmatrix},\qquad
\operatorname{Tr}\rho_\beta=\frac{1+q}{1+q}=1.
$$

$\rho_\beta$ の固有値は $1/(1+q)$ と $q/(1+q)$ で、ともに非負です。従ってこの行列は正の密度作用素で、上の跡計算と併せて熱状態の条件を満たします。また $E=\varepsilon q/(1+q)$、$F=-\beta^{-1}\log(1+q)$ です。これはCFTそのもののスペクトルではなく、定義の跡・正値性・規格化を直接検査する有限次元例です。境界CFTでは $H$ は $S_L^2$ 上の時間並進を生成し、$\beta$ は上で固定した**境界代表計量の時間長**を指します。
<!-- definition-example-end -->

熱的跡からEuclid円を得る理由を確かめます。完全直交系 $\{|n\rangle\}$ を取ると

$$
Z(\beta)=\sum_n\langle n|e^{-\beta H}|n\rangle.
$$

波動汎関数の表示では、初期の場配置と終期の場配置を同じにして和（積分）を取るため、Euclid時間方向の端点が同一視されます。ボソン場は周期的、フェルミオン場は熱的な反周期的境界条件を取り、幾何学的な底空間は $S^1_\beta\times S_L^2$ です。したがって重力のEuclid境界をこれと合わせることが、熱的分配関数の比較の出発点です。これは量子力学の跡表示に基づく説明であり、**重力とCFTの分配関数の等号そのものは別の双対性の入力**です。

## 2. 同じ境界を埋める二つの幾何

[AdS正準境界と熱的AdS参照サドル](../../BHT/BHT16/index.md#def-bht16-ads-canonical)により、熱的AdSとSchwarzschild–AdSは同じ $S^1_\beta\times S_L^2$ を境界に持てます。ただし内部は異なります。熱的AdSには地平線がなく、BHでは時間円が地平線で滑らかに縮みます。この違いは境界の局所温度だけでは読み取れません。

Schwarzschild–AdSのLorentz計量は

$$
ds^2=-f(r)\,dt^2+\frac{dr^2}{f(r)}+r^2d\Omega_2^2,\qquad
f(r)=1-\frac{2GM}{r}+\frac{r^2}{L^2}.
$$

正の地平線半径 $r_+$ で $f(r_+)=0$。時間をEuclid化した正則なBHの周期は[BHT16の状態量命題](../../BHT/BHT16/index.md#prop-bht16-ads-state)より

$$
T(r_+)=\frac{1+3r_+^2/L^2}{4\pi r_+},\qquad
M(r_+)=\frac{r_+}{2G}(1+r_+^2/L^2),\qquad
S_{\rm BH}=\frac{\pi r_+^2}{G}.
$$

これは独立な $r_+$ ごとに異なる温度であり、**固定した $\beta$ に任意の半径を代入してよいわけではありません**。熱的AdSでは内部に正則性から定まる時間周期の制限はなく、境界で同じ $\beta$ を選べます。

実際、有限半径 $R>r_+$ で共通の周期1の角座標 $u$ を用いると、二つの誘導計量の時間成分は $\beta^2f(R)du^2$ と $\beta_0^2f_0(R)du^2$、$f_0=1+R^2/L^2$ です。従って

$$
\beta_0=\beta\sqrt{\frac{f(R)}{f_0(R)}}
$$

とすれば時間・二球の全成分が一致します。この手順を経た[BHT16の相対作用](../../BHT/BHT16/index.md#prop-bht16-ads-action)が

$$
\Delta I_E(r_+)
=I_E[\mathrm{BH}]-I_E[\mathrm{thermal\ AdS}]
=\beta\,\Delta F_{\rm cl}(r_+),\qquad
\Delta F_{\rm cl}(r_+)=\frac{r_+}{4G}\left(1-\frac{r_+^2}{L^2}\right)
$$

です。二つの**個別の発散する裸作用**を先に極限に送るのではなく、整合境界・共通反項で差を取ります。[HOLO14の局所反項](../HOLO14/index.md#def-holo14-local-counterterm)と同じく、同じ境界計量だけからなる共通局所項は作用差では相殺されますが、絶対自由エネルギーの零点は規約に依存します。

具体例として $\beta=\pi L$ を選ぶと、$r_+=L$ と $r_+=L/3$ はともに $T=1/(\pi L)$ を満たします。しかし前者の $\Delta F_{\rm cl}=0$ に対して、後者の値は $2L/(27G)>0$ です。熱的AdSも同じ境界を持ち、同じ温度に**三つの候補**があることが分かります。ただし小BHは半径方向で不安定なので、次節の安定な二鞍点模型からは除きます。

## 3. 重力サドルの重みをCFT自由エネルギーへ渡す

[GKPWの木レベル辞書](../HOLO9/index.md#def-holo9-gkpw)は源付き生成汎関数と繰り込み済みバルク作用を対応させました。熱問題では源の代わりにEuclid時間の周期を境界データに含め、**その境界を埋める全ての適切な重力配置**を積分するという拡張を仮定します。これは任意のCFTについて本講で証明する等式ではありません。

[Euclidサドルの指数重み](../../BHT/BHT14/index.md#def-bht14-saddle-weight)では、作用 $I_E$ のサドル寄与の先頭は $e^{-I_E}$ です。熱的AdSを作用零に取れば、局所安定な大BHとの**相対重み**だけを抜き出した模型が作れます。

<a id="def-holo15-two-saddle"></a>

<!-- formal-statement-start -->
> **定義（相対二鞍点の熱分配模型）**  
> 第0節の固定境界 $S^1_\beta\times S_L^2$、$G,L>0$ で、$T=1/\beta>T_{\min}=\sqrt3/(2\pi L)$ とする。[BHT16の二分岐](../../BHT/BHT16/index.md#thm-bht16-ads-branches)の大半径の正則解 $r_l(T)>L/\sqrt3$ を選び、熱的AdSの先頭作用を零としたとき、指数だけの相対二鞍点模型を

$$
Z_{\rm rel}^{(2)}(\beta)
=1+\exp\{-\beta\Delta F_{\rm cl}[r_l(T)]\},
\qquad
F_{\rm rel}^{(2)}=-\beta^{-1}\log Z_{\rm rel}^{(2)}
$$

> と定める。ここで $\Delta F_{\rm cl}(r)=r(1-r^2/L^2)/(4G)$。小BH、揺らぎの行列式とその他の幾何は含めず、CFTの厳密な $Z$ とは同一視しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo15-two-saddle -->
**定義の確認**：$\beta=\pi L$ では大枝は $r_l=L$、従って $\Delta F_{\rm cl}(L)=0$、$Z_{\rm rel}^{(2)}=1+1=2$ となります。この模型の相対BH重みは $1$ で熱的AdSの $1$ と同じです。$\beta=\pi L$ に対して小枝 $L/3$ も存在しますが、模型に入れていません。$Z_{\rm rel}^{(2)}=2$ は、揺らぎの係数も等しいというCFTの**厳密な**主張ではありません。
<!-- definition-example-end -->

<a id="prop-holo15-free-energy-dictionary"></a>

<!-- formal-statement-start -->
> **命題（条件付きの熱的AdS/CFT自由エネルギー辞書）**  
> 第0節の境界を持つCFTに対して、同じ周期・幾何を固定した重力の繰り込み済み熱分配関数とのAdS/CFT対応を仮定する。さらに $L^2/G\gg1$ で熱的AdSと大BHが先頭古典指数の支配候補であり、両者の前因子の対数は $O(G^0)$ 以下とする。大BHが存在する $T>T_{\min}$ で、前因子を1に置いた相対二鞍点模型の自由エネルギーは

$$
F_{\rm rel}^{(2)}
=-\frac1\beta\log\bigl(1+e^{-\beta\Delta F_{\rm cl}}\bigr)
=\min(0,\Delta F_{\rm cl})
-\frac1\beta\log\bigl(1+e^{-\beta|\Delta F_{\rm cl}|}\bigr).
$$

> 従って $\beta|\Delta F_{\rm cl}|\gg1$ の支配領域では、境界CFTの古典次数の相対自由エネルギーは $\min(0,\Delta F_{\rm cl})$ に対応する。両指数が競る狭い領域や $O(G^0)$ の量は、この先頭等式だけでは決められない。
<!-- formal-statement-end -->

### 証明の見取り図

境界の分配関数は熱的跡、重力側の分配関数はサドル寄与の和です。共通の熱的AdS寄与を括り出すと、相対的な指数の差だけが残ります。重要なのは **「分配関数を足す」のであって「自由エネルギーを足す」のではない** という点です。

<!-- proof-start -->
### 証明

二つのサドルの重みを、まずそれぞれ $e^{-I_0}$、$e^{-I_1}$ とします。$I_1-I_0=\beta\Delta F_{\rm cl}$ なので

$$
Z_{\rm grav}^{(2)}
=e^{-I_0}+e^{-I_1}
=e^{-I_0}\left(1+e^{-\beta\Delta F_{\rm cl}}\right).
$$

$F_0=I_0/\beta$ を引くと

$$
F_{\rm grav}^{(2)}-F_0
=-\frac1\beta\log Z_{\rm grav}^{(2)}-\frac{I_0}{\beta}
=-\frac1\beta\log(1+e^{-\beta\Delta F_{\rm cl}}).
$$

$z=\beta\Delta F_{\rm cl}$ とおくと、$z\ge0$ では
$\log(1+e^{-z})=\log(1+e^{-|z|})$、$z<0$ では
$1+e^{-z}=e^{-z}(1+e^{z})$ だから
$\log(1+e^{-z})=-z+\log(1+e^{-|z|})$ です。これらを一式にまとめて表示式を得ます。

さらに $0<\log(1+e^{-\beta|\Delta F_{\rm cl}|})\le\log2$ です。$|\beta\Delta F_{\rm cl}|\gg1$ なら補正は指数的に小さくなり、主項は小さい方の自由エネルギーです。AdS/CFTの分配関数等号を仮定しているので、これは**等号を証明する議論ではなく**、仮定した辞書の下でのサドル評価です。$\square$
<!-- proof-end -->

たとえば $\Delta F_{\rm cl}>0$ なら $Z_{\rm rel}^{(2)}=1+\text{小さい数}$ で、境界の相対自由エネルギーの先頭は零です。$\Delta F_{\rm cl}<0$ ならBHの指数が大きく、境界の相対自由エネルギーは $\Delta F_{\rm cl}$ に近づきます。**サドルの優勢はその幾何の「確率が厳密に1」と言うことではありません**。

## 4. 相境界・有限体積・熱力学量の飛び

大BHの温度は $T(r)=(1/r+3r/L^2)/(4\pi)$ です。[Schwarzschild–AdSの二分岐と局所符号](../../BHT/BHT16/index.md#thm-bht16-ads-branches)により $T_{\min}=\sqrt3/(2\pi L)$ で大枝が現れます。しかし現れるだけでは重力作用が最小とは限りません。相境界は [BHT16のHawking–Page定理](../../BHT/BHT16/index.md#thm-bht16-hawking-page)が決める $T_{\rm HP}=1/(\pi L)$ です。

<a id="prop-holo15-boundary-phase"></a>

<!-- formal-statement-start -->
> **命題（境界自由エネルギーの先頭Hawking–Page相境界）**  
> 第0節の4次元純Einstein重力／3次元境界CFT対応を仮定し、$L^2/G\to\infty$ の先頭古典指数で熱的AdSと大Schwarzschild–AdSを比較する。共通境界 $S^1_\beta\times S_L^2$、固定 $L,G$、無電荷・無回転の場合、優勢サドルは $T<T_{\rm HP}=1/(\pi L)$ で熱的AdS、$T>T_{\rm HP}$ で大BHに切り替わる。$T=T_{\rm HP}$ では両古典作用が等しい。境界のエントロピー差・エネルギー差の先頭の値はそれぞれ

$$
\Delta S_{\rm CFT}^{\rm(cl)}=\frac{\pi L^2}{G},\qquad
\Delta E_{\rm CFT}^{\rm(cl)}=\frac{L}{G}
=T_{\rm HP}\Delta S_{\rm CFT}^{\rm(cl)}.
$$

> これは半古典・大自由度の極限における一次転移型の折れ目を記述し、有限の $L^2/G$ における厳密な非解析性を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

温度の折返し $T_{\min}$ と作用差の零点 $T_{\rm HP}$ を混同しません。まず自由エネルギー差の符号を大枝上で判断し、交差点での重力エネルギーとエントロピーを境界の先頭熱力学量へ対応させます。

<!-- proof-start -->
### 証明

[BHT16の相対作用](../../BHT/BHT16/index.md#prop-bht16-ads-action)に $G,L,r>0$ を代入すると

$$
\operatorname{sgn}\Delta F_{\rm cl}(r)
=\operatorname{sgn}(1-r^2/L^2).
$$

[二分岐](../../BHT/BHT16/index.md#thm-bht16-ads-branches)の大枝は $r>L/\sqrt3$ で温度が増加し、$r=L$ において

$$
T(L)=\frac{1+3}{4\pi L}=\frac1{\pi L}
$$

です。よって $T_{\min}<T<T_{\rm HP}$ では $r_l<L$ なので $\Delta F_{\rm cl}>0$、$T>T_{\rm HP}$ では $r_l>L$ なので $\Delta F_{\rm cl}<0$ です。$T<T_{\min}$ には正則BH枝そのものがありません。前節の $\min(0,\Delta F_{\rm cl})$ から主張した支配枝を得ます。

交差点 $r=L$ で[BHT16の状態量](../../BHT/BHT16/index.md#prop-bht16-ads-state)は

$$
M(L)=\frac L{2G}(1+1)=\frac LG,\quad
S_{\rm BH}(L)=\frac{\pi L^2}G,\quad
T_{\rm HP}S_{\rm BH}(L)=\frac LG.
$$

熱的AdSの古典的な相対エネルギーと地平線エントロピーはこの差引き規約で零です。[BHT16の潜熱命題](../../BHT/BHT16/index.md#prop-bht16-latent-heat)とも一致します。境界熱力学へ渡すと $\Delta E=T_{\rm HP}\Delta S$、自由エネルギー差は零となります。$F_{\rm leading}$ の温度微分 $S=-\partial F/\partial T$ は支配枝の切替点で異なる一方、固定した有限の二鞍点和は対数が滑らかなため、非解析な極限と有限パラメータを区別します。$\square$
<!-- proof-end -->

ここで「一次転移」を**有限体積なのに当然生じる厳密な相転移**と読んではいけません。空間は $S_L^2$ なので有限体積です。大きな有効自由度（$L^2/G$）を無限へ送る特異な極限で初めて、先頭自由エネルギーの折れ目が現れます。有限の量子理論が熱的跡を持ち、通常の解析性条件が満たされるなら、鋭い転移は滑らかなクロスオーバーへ丸まります。

## 5. 高温のブラックホールからCFTの温度次数を読む

ここまでの相境界は有限の境界球面で起きる現象です。では $TL\gg1$ とすると、境界理論の**空間2次元の熱的スケーリング**を重力から読み取れるでしょうか。大BHでは球面の曲率半径より地平線がずっと大きくなります。これはHawking–Pageの相境界とは別の極限です。

<a id="prop-holo15-high-temperature"></a>

<!-- formal-statement-start -->
> **命題（大BHの高温CFT熱力学）**  
> 第0節の固定した半径 $L$ の二球境界、$G,L>0$、無電荷・無回転で、温度 $TL\gg1$ に対応する大Schwarzschild–AdS枝を考える。古典重力が有効で、境界の相対熱力学量をそのサドルで近似できるとき、

$$
F_{\rm CFT}^{\rm(cl)}
=-\frac{16\pi^3L^4}{27G}T^3+O(T),\qquad
S_{\rm CFT}^{\rm(cl)}
=\frac{16\pi^3L^4}{9G}T^2+O(1),
$$

$$
E_{\rm CFT}^{\rm(cl)}
=\frac{32\pi^3L^4}{27G}T^3+O(T).
$$

> ここで $O(T)$ などの係数は固定した $L,G$ に依存し、先頭の $T^3$ は空間2次元CFTの自由エネルギーの温度次数と一致する。絶対真空エネルギーや量子補正は含めない。
<!-- formal-statement-end -->

### 証明の見取り図

大半径の方程式を先に解き、$r_l(T)$ を $T$ で表してから自由エネルギーへ代入します。エントロピーは自由エネルギーの微分と地平線面積の**二経路**で確かめます。$V_2=4\pi L^2$ で割れば、熱力学密度の温度次数も読めます。

<!-- proof-start -->
### 証明

$T=(1+3r^2/L^2)/(4\pi r)$ を $r$ の二次式にすると

$$
3r^2/L^2-4\pi Tr+1=0.
$$

解の公式から大枝は

$$
r_l(T)=\frac{L^2}{6}
\left(4\pi T+\sqrt{16\pi^2T^2-\frac{12}{L^2}}\right).
$$

$TL\gg1$ で平方根の内部から $4\pi T$ を括り出し、$\sqrt{1-x}=1-x/2+O(x^2)$ に $x=3/(4\pi^2L^2T^2)$ を適用します。従って

$$
\sqrt{16\pi^2T^2-\frac{12}{L^2}}
=4\pi T-\frac{3}{2\pi L^2T}+O(T^{-3}),\qquad
r_l(T)=\frac{4\pi L^2T}{3}-\frac1{4\pi T}+O(T^{-3}).
$$

[BHT16の相対自由エネルギー](../../BHT/BHT16/index.md#prop-bht16-ads-action)へ代入すると

$$
\begin{aligned}
F_{\rm CFT}^{\rm(cl)}
&\simeq\Delta F_{\rm cl}(r_l)
=\frac{r_l}{4G}-\frac{r_l^3}{4GL^2}\\
&=-\frac1{4GL^2}\left(\frac{4\pi L^2T}{3}\right)^3+O(T)
=-\frac{16\pi^3L^4}{27G}T^3+O(T).
\end{aligned}
$$

ここで $r_l=aT+bT^{-1}+O(T^{-3})$、$a=4\pi L^2/3$、$b=-1/(4\pi)$ と置くと、三乗の展開 $r_l^3=a^3T^3+3a^2bT+O(T^{-1})$ により、次の次数まで

$
\begin{aligned}
\Delta F_{\rm cl}(r_l)
&=-\frac{a^3}{4GL^2}T^3
+\left(\frac{a}{4G}-\frac{3a^2b}{4GL^2}\right)T+O(T^{-1})\\
&=-\frac{16\pi^3L^4}{27G}T^3
+\frac{2\pi L^2}{3G}T+O(T^{-1})
\end{aligned}
$

と確認できます。大枝の明示的な根は $T>T_{\min}$ で滑らかなので、固定 $G,L$ のこの高温展開は項別微分できます。[Euclidサドルの熱力学微分](../../BHT/BHT14/index.md#def-bht14-saddle-weight)を用いて

$
S=-\frac{\partial F}{\partial T}
=\frac{16\pi^3L^4}{9G}T^2-\frac{2\pi L^2}{3G}+O(T^{-2}).
$

一方、面積からも $r_l^2=a^2T^2+2ab+O(T^{-2})$ なので

$
S_{\rm BH}=\frac{\pi r_l^2}{G}
=\frac{16\pi^3L^4}{9G}T^2-\frac{2\pi L^2}{3G}+O(T^{-2})
$

となり、先頭項だけでなく定数項まで一致します。さらに

$$
E=F+TS=
\left(-\frac{16}{27}+\frac{16}{9}\right)
\frac{\pi^3L^4}{G}T^3+O(T)
=\frac{32\pi^3L^4}{27G}T^3+O(T).
$$

体積 $V_2=4\pi L^2$ で割ると

$$
\frac F{V_2}
=-\frac{4\pi^2L^2}{27G}T^3+O(T/V_2).
$$

$L^2/G$ が境界の有効自由度数の役割を担います。ただし、$L^2/G$ が必ず $N^2$ と等しいわけではありません。実際の$N$依存は双対な模型と次元によります。$\square$
<!-- proof-end -->

ここでの温度極限は**固定した $L$ に対する $TL\gg1$** です。球面の半径を無限へ送る平面境界の熱極限や、$N\to\infty$ の順序と無条件に同一視しません。高温係数の一致も、双対性を独立に証明するものではなく、仮定した辞書の内部整合性です。

## 6. 何を境界の相転移と呼べるか、呼べないか

適切な大$N$ゲージ理論を境界に持つ特定の模型では、低温で $O(N^0)$、高温で $O(N^2)$ という自由エネルギーの次数変化が、閉じ込め／非閉じ込めの熱的指標になります。

しかし今回の4次元バルクで対応する重力係数は $L^2/G$ です。[HOLO6の大$N$数え上げ](../HOLO6/index.md#prop-holo6-ribbon-count)は特定の行列模型に限られます。一般のAdS$_4$/CFT$_3$の自由エネルギーが必ず $N^2$ に比例するわけではなく、**あらゆるCFTに色の閉じ込め順序変数があるわけでもありません**。

| 判定すること | 本講から言える範囲 | 無条件には言えないこと |
| --- | --- | --- |
| 同じ熱境界 | $\beta$ と球面半径 $L$ とアンサンブルを一致させる | 壁の局所固有温度をそのまま境界温度にする |
| 幾何の優勢 | 半古典・指定サドル群の $e^{-I_E}$ の先頭次数を比較する | 小BHの不安定モードや未知のサドルを消した厳密な分配関数 |
| 低温と高温 | 熱的AdSと大BHの自由エネルギー差の符号を比較する | すべてのCFTで同じ閉じ込め転移が存在する |
| 相転移 | 大きな有効自由度の極限で一次転移型の折れ目を得る | 有限球面・有限自由度の厳密な非解析性 |
| アンサンブル | 固定 $\beta$、無電荷・無回転の正準分配関数 | 固定エネルギーの微正準系や固定電位の大正準系へ同じ結果を流用する |

反例となる**前提の失敗**を一つ考えます。境界で電荷 $Q$ を固定せず化学ポテンシャル $\mu$ を固定した系で、$e^{-\beta(H-\mu Q)}$ が跡クラスとなるなら、熱的跡は $\operatorname{Tr}e^{-\beta(H-\mu Q)}$ です。電荷を持つBHを単に $E-TS$ で比較すると $-\mu Q$ の項を落とします。指数に使う熱力学ポテンシャルは $E-TS-\mu Q$ となり、今回の $\Delta I_E=\beta(E-TS)$ をそのまま使った**作用と跡の対応**が壊れます。この区別の重力側は[BHT17のアンサンブル](../../BHT/BHT17/index.md)を参照してください。

本講の方法で分かるのは、適切なAdS/CFT模型において境界の**熱的情報**を重力の**どの古典幾何が優勢か**へ写す条件です。地平線の二側構造や熱場二重状態、個々の微視的状態や蒸発情報の回収まで証明したわけではありません。

## 7. 演習と詳細解答

以下は $\hbar=k_B=c=1$、$G,L>0$ とし、特に断らない限り第0節の無回転・無電荷の正準境界で考えます。演習の定理・公式は上の使用位置から引用します。

<a id="ex-holo15-a1"></a>

### A1. 熱分配関数から確率を直接検査する
- Level: A

**問題**：二準位Hamiltonian $H=\operatorname{diag}(0,\varepsilon)$、$\varepsilon>0$、$\beta>0$ について、$Z$、各準位の確率、$E=-\partial_\beta\log Z$ を計算し、確率和と期待値が一致することを示せ。

<!-- solution-start -->
**詳細解答**：[正準熱状態](#def-holo15-thermal-state)に従い $q=e^{-\beta\varepsilon}$ と置くと $Z=1+q$ です。確率は $p_0=1/(1+q)$、$p_1=q/(1+q)$ なので $p_0+p_1=1$。また $dq/d\beta=-\varepsilon q$ から

$$
-\partial_\beta\log Z=-\frac1{1+q}(-\varepsilon q)
=\frac{\varepsilon q}{1+q}.
$$

直接の平均 $0p_0+\varepsilon p_1$ と等しくなります。$\beta\to\infty$ では $p_0\to1$ でエネルギーが零の準位が優勢です。
<!-- solution-end -->

<a id="ex-holo15-a2"></a>

### A2. 境界の時間円を揃える
- Level: A

**問題**：$f(R)=f_0(R)-2GM/R$、$f_0(R)=1+R^2/L^2$、$R>r_+$ とする。BHの周期が $\beta$ のとき、熱的AdSの周期 $\beta_0$ を選んで切断面の時間成分と二球成分を一致させよ。$M>0$ なら $\beta_0<\beta$ を示せ。

<!-- solution-start -->
**詳細解答**：[共通境界の条件](../../BHT/BHT16/index.md#def-bht16-ads-canonical)に従い $u\in[0,1)$ とおくと、時間成分は $h_{uu}^{\rm BH}=\beta^2f(R)$、$h_{uu}^{\rm AdS}=\beta_0^2f_0(R)$ です。$R>r_+$ で $f(R)>0$ なので正の平方根を取り

$$
\beta_0=\beta\sqrt{f(R)/f_0(R)}
$$

を得ます。両者の二球成分は共通の $R^2d\Omega_2^2$ で一致します。$M>0$ なら $f(R)=f_0(R)-2GM/R<f_0(R)$ だから $0<\beta_0/\beta<1$ です。同じ周期を一方的に置くと有限 $R$ のDirichlet境界条件を壊します。
<!-- solution-end -->

<a id="ex-holo15-a3"></a>

### A3. 分配関数の和と自由エネルギーの和を区別する
- Level: A

**問題**：二つのEuclidサドルの作用を $I_0=0$、$I_1=a$ とする。指数だけの分配関数と相対自由エネルギーを求め、$a>0$ と $a<0$ でどちらが優勢か示せ。

<!-- solution-start -->
**詳細解答**：[サドルの指数重み](../../BHT/BHT14/index.md#def-bht14-saddle-weight)に従って $Z=e^{-I_0}+e^{-I_1}=1+e^{-a}$ です。[境界の正準熱状態と自由エネルギー](#def-holo15-thermal-state)より $F=-\beta^{-1}\log(1+e^{-a})$。$a>0$ なら $e^{-a}<1$ でサドル0が優勢、$a<0$ なら $e^{-a}>1$ でサドル1が優勢です。自由エネルギーを $0+a/\beta$ と加えることは、対数の位置を間違えています。
<!-- solution-end -->

<a id="ex-holo15-a4"></a>

### A4. 同じ温度に現れる二つの地平線
- Level: A

**問題**：$T=1/(\pi L)$ を満たすSchwarzschild–AdS地平線半径をすべて求め、その相対自由エネルギー $\Delta F_{\rm cl}$ を計算せよ。

<!-- solution-start -->
**詳細解答**：[温度式](../../BHT/BHT16/index.md#prop-bht16-ads-state)に代入して

$$
\frac{1+3r^2/L^2}{4\pi r}=\frac1{\pi L}
\ \Longleftrightarrow\
3(r/L)^2-4(r/L)+1=0
\ \Longleftrightarrow\
(3r/L-1)(r/L-1)=0.
$$

従って $r=L/3,L$ の二つです。[相対作用](../../BHT/BHT16/index.md#prop-bht16-ads-action)から

$$
\Delta F_{\rm cl}(L)=0,\qquad
\Delta F_{\rm cl}(L/3)=\frac{L}{12G}\left(1-\frac19\right)=\frac{2L}{27G}.
$$

大枝 $r=L$ が熱的AdSと同じ古典作用、小枝はより大きい作用を持ちます。
<!-- solution-end -->

<a id="ex-holo15-a5"></a>

### A5. 球面体積を正しく読む
- Level: A

**問題**：境界代表計量が $ds^2_{\partial,E}=d\tau^2+L^2(d\theta^2+\sin^2\theta\,d\phi^2)$ のとき、空間体積 $V_2$ を積分し、自由エネルギー密度が $F/V_2$ であることを確認せよ。

<!-- solution-start -->
**詳細解答**：固定した $\tau$ の二球計量は $\gamma_{\theta\theta}=L^2$、$\gamma_{\phi\phi}=L^2\sin^2\theta$ なので $\sqrt{\det\gamma}=L^2\sin\theta$。従って

$$
V_2=\int_0^{2\pi}d\phi\int_0^\pi L^2\sin\theta\,d\theta
=2\pi L^2[-\cos\theta]_0^\pi=4\pi L^2.
$$

$\beta$ は時間方向の長さであり、空間体積の計算に含めません。$F/V_2$ はエネルギー/面積の次元を持ちます。
<!-- solution-end -->

<a id="ex-holo15-b1"></a>

### B1. 二鞍点の対数和と漸近
- Level: B

**問題**：$x=\beta\Delta F_{\rm cl}\in\mathbb R$ について、$-\beta^{-1}\log(1+e^{-x})$ を $\min(0,\Delta F_{\rm cl})$ と補正項に分解し、補正の絶対値の上界を導け。

<!-- solution-start -->
**詳細解答**：$x\ge0$ なら $1+e^{-x}=1+e^{-|x|}$。$x<0$ なら $1+e^{-x}=e^{-x}(1+e^x)=e^{-x}(1+e^{-|x|})$。従って両場合で

$$
-\frac1\beta\log(1+e^{-x})
=\min(0,x/\beta)-\frac1\beta\log(1+e^{-|x|}).
$$

$0<e^{-|x|}\le1$ だから $0<\log(1+e^{-|x|})\le\log2$。よって補正の絶対値は $(\log2)/\beta$ 以下です。$|x|\gg1$ なら $\log(1+e^{-|x|})=e^{-|x|}+O(e^{-2|x|})$ となり、支配サドル以外の寄与は指数的に抑制されます。
<!-- solution-end -->

<a id="ex-holo15-b2"></a>

### B2. 局所安定と優勢を区別する
- Level: B

**問題**：$T_{\min}<T<T_{\rm HP}$ にある大BH枝で、熱容量の符号と熱的AdSに対する $\Delta F_{\rm cl}$ の符号をそれぞれ求めよ。二つの符号の意味を説明せよ。

<!-- solution-start -->
**詳細解答**：[二分岐と熱容量](../../BHT/BHT16/index.md#thm-bht16-ads-branches)より大枝は $r>L/\sqrt3$ なので

$$
C_L=\frac{2\pi r^2}{G}\frac{1+3r^2/L^2}{3r^2/L^2-1}>0.
$$

一方、大枝上で $T$ は $r$ に対して増加し、$T<T_{\rm HP}$ は $r<L$ に対応するため

$$
\Delta F_{\rm cl}=\frac r{4G}(1-r^2/L^2)>0.
$$

$C_L>0$ はこの一変数方向の局所的な応答の符号ですが、$\Delta F_{\rm cl}>0$ なので熱的AdSの方が小さい作用を持ちます。局所安定性から大域的優勢は導けません。
<!-- solution-end -->

<a id="ex-holo15-b3"></a>

### B3. CFTの高温次数を二経路で検証する
- Level: B

**問題**：$TL\gg1$ における大枝の $r_l\sim4\pi L^2T/3$ を用い、自由エネルギー $F$、面積エントロピー $S$、$F+TS$ を先頭次数で求めよ。さらに $S=-\partial_TF$ でも係数が一致することを確かめよ。

<!-- solution-start -->
**詳細解答**：[高温命題](#prop-holo15-high-temperature)の仮定下で

$$
F\sim-\frac{r_l^3}{4GL^2}
=-\frac1{4GL^2}\frac{64\pi^3L^6T^3}{27}
=-\frac{16\pi^3L^4T^3}{27G}.
$$

[BHT16の面積式](../../BHT/BHT16/index.md#prop-bht16-ads-state)より

$$
S=\frac{\pi r_l^2}G
\sim\frac\pi G\frac{16\pi^2L^4T^2}{9}
=\frac{16\pi^3L^4T^2}{9G}.
$$

自由エネルギーを微分した $-\partial_TF=3(16\pi^3L^4/(27G))T^2$ も同じです。最後に

$$
E=F+TS\sim
\left(-\frac{16}{27}+\frac{16}{9}\right)
\frac{\pi^3L^4T^3}{G}
=\frac{32\pi^3L^4T^3}{27G}.
$$

$F\propto-T^3$、$S\propto T^2$ が空間2次元の温度次数に合います。
<!-- solution-end -->

<a id="ex-holo15-b4"></a>

### B4. アンサンブルを変えると何が壊れるか
- Level: B

**問題**：境界に自己共役な保存電荷演算子 $Q$ があり、$[H,Q]=0$ とする。$H,Q$ には正規直交な同時固有基底があり、指定した $\beta>0,\mu\in\mathbb R$ で $e^{-\beta(H-\mu Q)}$ が跡クラスであると仮定する。化学ポテンシャル $\mu$ を固定した熱的跡を書き、固有状態 $(E_n,q_n)$ の重みから対応する熱力学ポテンシャルを説明せよ。正準の $\beta(E-TS)$ をそのまま使えない理由を述べよ。

<!-- solution-start -->
**詳細解答**：同時固有基底で $H|n\rangle=E_n|n\rangle$、$Q|n\rangle=q_n|n\rangle$ とすると、化学ポテンシャル固定の分配関数は

$$
Z_{\rm gc}(\beta,\mu)=\operatorname{Tr}e^{-\beta(H-\mu Q)}
=\sum_n e^{-\beta(E_n-\mu q_n)}.
$$

この跡は正で有限なので $\rho_{\rm gc}=Z_{\rm gc}^{-1}e^{-\beta(H-\mu Q)}$ を規格化できます。$E=\operatorname{Tr}(\rho_{\rm gc}H)$、$\langle Q\rangle=\operatorname{Tr}(\rho_{\rm gc}Q)$ を有限とする温度域では、$\log\rho_{\rm gc}=-\beta(H-\mu Q)-\log Z_{\rm gc}$ より

$
\begin{aligned}
S&=-\operatorname{Tr}(\rho_{\rm gc}\log\rho_{\rm gc})\\
&=\beta(E-\mu\langle Q\rangle)+\log Z_{\rm gc}.
\end{aligned}
$

ここで $\Omega=-\beta^{-1}\log Z_{\rm gc}$ と定めて変形すると、$\Omega=E-TS-\mu\langle Q\rangle$ です。$-\mu Q$ を落とした $e^{-\beta(E-TS)}$ は最初の熱的跡に対応しないので、同じ作用差から相境界を計算できません。重力側でも固定電位の境界項と許すサドルを再選択する必要があります。
<!-- solution-end -->

<a id="ex-holo15-c1"></a>

### C1. 具体温度で境界熱状態と三候補の幾何を統合する
- Level: C

**問題**：固定境界 $S^1_\beta\times S_L^2$ で $T=13/(8\pi L)$ とする。4次元Schwarzschild–AdSについて、以下を求めよ。

- 二つの正の正則地平線半径
- 各BHの熱容量の符号
- 熱的AdSを零にした二つの相対自由エネルギー $\Delta F_{\rm cl}$ と優勢サドル
- 大枝の質量 $M$、エントロピー $S$ および $M-TS$ の一致
- 大枝と熱的AdSの先頭相対指数重み

$L^2/G\gg1$ を仮定し、何が厳密なCFT主張でないかも述べよ。

<!-- solution-start -->
**詳細解答**：

**(1) 正則性**：[BHT16の温度式](../../BHT/BHT16/index.md#prop-bht16-ads-state)を $T=13/(8\pi L)$ に等置し、$x=r/L>0$ とすると

$$
\frac{1+3x^2}{4\pi Lx}=\frac{13}{8\pi L}
\ \Longleftrightarrow\
2(1+3x^2)=13x
\ \Longleftrightarrow\
6x^2-13x+2=(6x-1)(x-2)=0.
$$

したがって $r_s=L/6$、$r_l=2L$ です。$L/6<L/\sqrt3<2L$ なので小枝・大枝に分かれます。

**(2) 熱容量**：[BHT16の二分岐](../../BHT/BHT16/index.md#thm-bht16-ads-branches)の式

$$
C_L(r)=\frac{2\pi r^2}{G}
\frac{1+3r^2/L^2}{3r^2/L^2-1}
$$

に代入します。$r=L/6$ では分母 $3/36-1=-11/12<0$、$r=2L$ では分母 $12-1=11>0$ なので、$C_L(r_s)<0<C_L(r_l)$ です。符号は半径方向の局所判定です。

**(3) 作用差と優勢**：[相対作用](../../BHT/BHT16/index.md#prop-bht16-ads-action)に代入すると

$$
\begin{aligned}
\Delta F_{\rm cl}(r_s)
&=\frac{L}{24G}\left(1-\frac1{36}\right)
=\frac{35L}{864G}>0,\\
\Delta F_{\rm cl}(r_l)
&=\frac{2L}{4G}(1-4)
=-\frac{3L}{2G}<0.
\end{aligned}
$$

熱的AdSの差は零です。$T=13/(8\pi L)>1/(\pi L)=T_{\rm HP}$ なので、[相境界命題](#prop-holo15-boundary-phase)に従い大BHが先頭指数で優勢です。

**(4) エネルギーとエントロピー**：[状態量](../../BHT/BHT16/index.md#prop-bht16-ads-state)で $r_l=2L$ とすると

$$
M_l=\frac{2L}{2G}(1+4)=\frac{5L}G,\qquad
S_l=\frac{\pi(2L)^2}G=\frac{4\pi L^2}G.
$$

さらに

$$
T S_l=\frac{13}{8\pi L}\frac{4\pi L^2}G
=\frac{13L}{2G},\qquad
M_l-T S_l=\frac{5L}G-\frac{13L}{2G}
=-\frac{3L}{2G}.
$$

これは (3) の $\Delta F_{\rm cl}(r_l)$ に一致し、作用と熱力学の経路を相互検算しています。

**(5) 指数比と限界**：$\beta=8\pi L/13$ だから

$$
\Delta I_E(r_l)=\beta\Delta F_{\rm cl}(r_l)
=\frac{8\pi L}{13}\left(-\frac{3L}{2G}\right)
=-\frac{12\pi L^2}{13G}.
$$

従って大BH対熱的AdSの相対指数重みは

$$
\frac{e^{-I_{\rm BH}}}{e^{-I_{\rm AdS}}}
=\exp\left(\frac{12\pi L^2}{13G}\right)\gg1
$$

です。ただしこれは二サドルの**古典指数の比**であり、前因子、負モード、その他のサドル、有限自由度のCFT分配関数の厳密な値までは決めていません。特に小枝を厳密な正の確率として足すことはできません。
<!-- solution-end -->

## 8. まとめと次講

境界CFTの正準熱状態は $Z=\operatorname{Tr}e^{-\beta H}$ と $F=-T\log Z$ から始まります。境界の $S^1_\beta\times S_L^2$ を固定して初めて、熱的AdSとBHの相対Euclid作用を比べられます。重力熱力学から受け取った $\Delta F_{\rm cl}$ をサドル重み $e^{-\beta\Delta F_{\rm cl}}$ へ移すと、境界の大自由度極限の自由エネルギーとHawking–Page転移、高温 $F\propto-V_2T^3$ が条件付きで再現されます。

次のHOLO16では、**片側の熱状態を、二つの境界の純粋な状態からどう得るか**へ進みます。ここで扱った一つの熱分配関数と、二境界を持つ幾何や熱場二重状態の区別が次の中心問題です。
