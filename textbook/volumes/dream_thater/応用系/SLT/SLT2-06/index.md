# SLT2-06 勾配流とearly stopping

特異値の小さい方向では、最小二乗解が観測雑音を大きく増幅する。[前章の高次元 Gram 行列の評価](../SLT2-05/index.md#lem-slt2-05-spectral-bridge)は、どの方向で逆行列が不安定になるかを教えてくれた。一方、[ridge のスペクトルフィルタ](../SLT2-03/index.md#def-slt2-03-spectral-filter)は、係数に罰則を掛けて弱い方向を抑えた。

実は、罰則を追加しなくても、**勾配流を途中で止める**だけで弱い方向の増幅を抑えられる。速く学習する方向と遅く学習する方向があるからである。[ML2-15で学んだ早期停止（early stopping）](../../ML/ML2-15/index.md#def-ml2-15-early-stopping)は、検証標本を使って学習を打ち切る反復を選ぶ方法だった。本章はその選び方の前段階として、**打ち切る時間をあらかじめ固定した場合の作用**を有限行列・平方損失で厳密に調べる。これ自体は未知データへの保証ではない。

この章でできるようになることは次の五つである。

1. 勾配流の時刻 $t$ における解を特異値ごとに出す。
2. 弱い特異方向に対する増幅上界を計算する。
3. 早期停止を ridge に対応付け、同じ点と違う点を証明する。
4. 固定設計の偏り・分散を分け、停止時刻による変化を数値で確かめる。
5. 最適な停止時刻を決めるには、信号・雑音・データ利用の追加情報が必要だと理解する。

## 1. 時間はどの方向の係数を先に学ぶか

まず、$n$ 個の観測を $p$ 個の特徴量で近似する[設計行列](../../ML/ML1-04/index.md#def-ml1-04-design-matrix) $X\in\mathbb R^{n\times p}$ と応答 $y\in\mathbb R^n$ を固定する。損失は

$$
L(\beta)=\frac12\|X\beta-y\|_2^2,\qquad \beta\in\mathbb R^p
$$

とする。[SLT2-02 の最小二乗勾配流](../SLT2-02/index.md#def-slt2-02-gradient-flow)は、時間 $t\ge0$ に関する常微分方程式

$$
\dot\beta(t)=-X^{\mathsf T}(X\beta(t)-y),\qquad \beta(0)=0
$$

である。この損失は $1/(2n)$ で正規化していないので、時間の単位に余分な $n$ は含まれない。ここで $\dot\beta(t)=d\beta(t)/dt$ は学習時間 $t$ による微分であり、$X,y$ は微分中に固定する。以下の $\beta_j(t)$ は標準基底での第 $j$ 係数成分である。

例えば $X=\operatorname{diag}(2,1/2)$、$y=(2,1/2)^{\mathsf T}$ なら、真の係数 $(1,1)^{\mathsf T}$ の二方向の変化速度は大きく違う。成分ごとに微分方程式を解くと

$$
\beta_1(t)=1-e^{-4t},\qquad
\beta_2(t)=1-e^{-t/4}.
$$

時刻 $t=1$ では第1成分は約 $0.982$ まで進むのに対し、第2成分は約 $0.221$ にとどまる。「途中で止める」とは、全係数に同じ割合を掛けることではない。

この現象を任意の行列に拡張しよう。[特異値分解による最小ノルム解](../SLT2-02/index.md#thm-slt2-02-minimum-norm)と同様、$X$ の階数を $r$、正の特異値を $s_1,\ldots,s_r$ とする。対応する左・右の単位特異ベクトルを $u_j\in\mathbb R^n$、$v_j\in\mathbb R^p$ とすれば

$$
Xv_j=s_ju_j,\qquad X^{\mathsf T}u_j=s_jv_j.
$$

左の $u_j$ は観測の方向、右の $v_j$ は係数の方向を表す。$s_j^2$ が、勾配流のその方向の収束速度を決める。

<a id="def-slt2-06-early-stopping-filter"></a>

<!-- formal-statement-start -->
> **定義（早期停止のスペクトルフィルタ）**
> $n,p\ge1$、$X\in\mathbb R^{n\times p}$、停止時刻 $t\ge0$ とする。正の特異値 $s>0$ に対して観測の特異方向成分から係数成分への倍率を $g_t(s)$、観測空間での通過率を $h_t(s)$ として

$$
g_t(s)=\frac{1-e^{-ts^2}}s,\qquad
h_t(s)=1-e^{-ts^2}
$$

> と定める。$s=0$ では $g_t(0)=h_t(0)=0$、$t=0$ でもともに零とする。あらかじめ決めた時刻 $t$ に勾配流を停止して得た係数を **固定時刻の早期停止推定量** $\widehat\beta_t$ と呼び、その訓練点予測を $\widehat f_t=X\widehat\beta_t$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-06-early-stopping-filter -->
**定義の確認**。上の対角行列 $X=\operatorname{diag}(2,1/2)$ では、標準基底 $e_1,e_2$ が左右の特異ベクトルで、$Xe_j=s_je_j$、$s_1=2$、$s_2=1/2$ である。係数の第 $j$ 成分の方程式は $\dot\beta_j=-s_j^2\beta_j+s_jy_j$ となる。零初期値から積分因子 $e^{s_j^2t}$ を掛けて解くと

$$
\beta_j(t)=\frac{1-e^{-ts_j^2}}{s_j}y_j=g_t(s_j)y_j,
\qquad (j=1,2).
$$

したがってこの対角行列での係数倍率は

$$
g_t(2)=\frac{1-e^{-4t}}2,\qquad
g_t(1/2)=2(1-e^{-t/4}).
$$

応答 $y=(2,1/2)^{\mathsf T}$ に掛けると、上で直接解いた係数 $(1-e^{-4t},1-e^{-t/4})^{\mathsf T}$ となる。さらに予測の第 $j$ 成分は $s_j\beta_j(t)=h_t(s_j)y_j$ だから、

$$
h_t(2)=1-e^{-4t},\qquad h_t(1/2)=1-e^{-t/4}
$$

はいずれも $[0,1]$ に入る。$t=0$ では両倍率が零で、初期値の係数・予測が零であることにも一致する。

$s=0$ の定義は零で割る操作ではない。例えば $X=\operatorname{diag}(2,0)$ なら第2係数は $\dot\beta_2=0$、$\beta_2(0)=0$ から常に零で、観測から分からない方向は学習されない。
<!-- definition-example-end -->

## 2. 有限時刻の解と雑音増幅の上界

小さい特異値では擬似逆係数 $1/s$ は発散するが、固定した有限時刻なら $g_t(s)$ は発散しない。これが早期停止の正則化効果である。

<a id="thm-slt2-06-finite-flow"></a>

<!-- formal-statement-start -->
> **定理（有限時刻勾配流のフィルタと安定性）**
> $X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$ を固定し、上の零初期値・損失 $L(\beta)=\|X\beta-y\|_2^2/2$ の勾配流を考える。$X$ の階数が $r$、正の特異値と単位特異ベクトルが $(s_j,u_j,v_j)$ であるとき、任意の $t\ge0$ について

$$
\widehat\beta_t=\sum_{j=1}^r g_t(s_j)(u_j^{\mathsf T}y)v_j,\qquad
\widehat f_t=\sum_{j=1}^r h_t(s_j)(u_j^{\mathsf T}y)u_j.
$$

> $t>0$ なら各 $s>0$ について

$$
0\le g_t(s)\le\min\{ts,\ 1/s,\ \sqrt t\},\qquad
0\le h_t(s)\le\min\{ts^2,\ 1\}.
$$

> したがって、$y$ を $y+\Delta y$ に変えたときの係数と訓練点予測の差は

$$
\|\widehat\beta_t(y+\Delta y)-\widehat\beta_t(y)\|_2
\le\sqrt t\,\|\Delta y\|_2,
$$

$$
\|\widehat f_t(y+\Delta y)-\widehat f_t(y)\|_2
\le\|\Delta y\|_2.
$$

> さらに $t\to\infty$ で $\widehat\beta_t\to X^\dagger y$、$\widehat f_t\to P_{\operatorname{col}(X)}y$ が成立する。ここで $P_{\operatorname{col}(X)}$ は $X$ の列空間への直交射影である。
<!-- formal-statement-end -->

### 証明の見取り図

右特異ベクトルへ勾配流を射影すると一次元の線形方程式になる。指数関数の解を求めたあと、$1-e^{-a}\le\min\{a,1\}$ を $a=ts^2$ に使う。摂動の上界は、直交する特異方向の係数二乗和で評価する。

<!-- proof-start -->
### 証明

$X^{\mathsf T}y$ は $v_1,\ldots,v_r$ の張る行空間にあり、$\beta(0)=0$ も同じ空間に属する。零特異値に沿う核成分の微分は零である。[SLT2-02 の特異モード勾配流](../SLT2-02/index.md#thm-slt2-02-gradient-flow-limit)の導出を有限時刻で書き直す。

$b_j(t)=v_j^{\mathsf T}\beta(t)$ は右特異ベクトル基底での係数で、先の対角例の $\beta_j(t)$ を一般化したもの。$\dot b_j=db_j/dt$ は学習時間による微分である。展開

$$
\beta(t)=\sum_{j=1}^r b_j(t)v_j
$$

を代入し、両辺を $v_j$ へ射影すると

$$
\begin{aligned}
\dot b_j(t)
&=v_j^{\mathsf T}[-X^{\mathsf T}(X\beta(t)-y)]\\
&=-s_j^2b_j(t)+s_ju_j^{\mathsf T}y,\qquad b_j(0)=0.
\end{aligned}
$$

両辺に $e^{s_j^2t}$ を掛けて積の微分を取ると

$$
\frac{d}{dt}\{e^{s_j^2t}b_j(t)\}
=s_je^{s_j^2t}u_j^{\mathsf T}y.
$$

$0$ から $t$ まで積分して初期値を使うと

$$
e^{s_j^2t}b_j(t)
=\frac{e^{s_j^2t}-1}{s_j}u_j^{\mathsf T}y,
\quad
b_j(t)=g_t(s_j)u_j^{\mathsf T}y.
$$

これに $Xv_j=s_ju_j$ を掛ければ、$X\widehat\beta_t=\sum_jh_t(s_j)(u_j^{\mathsf T}y)u_j$ が得られる。一意性についても、同じ初期値を持つ二解の差 $d(t)$ は $\dot d=-X^{\mathsf T}Xd$、$d(0)=0$ を満たす。よって

$$
\frac{d}{dt}\|d(t)\|_2^2
=2d(t)^{\mathsf T}\dot d(t)
=-2\|Xd(t)\|_2^2\le0
$$

であり、非負の $\|d(t)\|_2^2$ は零から増えられず $d(t)=0$ である。

$a\ge0$ に対して $1-e^{-a}=\int_0^a e^{-u}\,du$ だから $0\le1-e^{-a}\le a$。また $e^{-a}\ge0$ より $1-e^{-a}\le1$。よって

$$
g_t(s)\le\min\{ts,1/s\},\qquad h_t(s)\le\min\{ts^2,1\}.
$$

$ts\le1/s$ の場合は $s\le t^{-1/2}$ なので $ts\le\sqrt t$。逆の場合には $s\ge t^{-1/2}$ なので $1/s\le\sqrt t$。二場合を合わせて $g_t(s)\le\sqrt t$ となる。

応答の差 $\Delta y$ を各 $u_j$ に分解すると

$$
\begin{aligned}
\|\widehat\beta_t(y+\Delta y)-\widehat\beta_t(y)\|_2^2
&=\sum_{j=1}^r g_t(s_j)^2(u_j^{\mathsf T}\Delta y)^2\\
&\le t\sum_{j=1}^r(u_j^{\mathsf T}\Delta y)^2
\le t\|\Delta y\|_2^2.
\end{aligned}
$$

同様に予測の差では $h_t(s_j)\le1$ を用い、

$$
\|\widehat f_t(y+\Delta y)-\widehat f_t(y)\|_2^2
=\sum_{j=1}^r h_t(s_j)^2(u_j^{\mathsf T}\Delta y)^2
\le\|\Delta y\|_2^2.
$$

最後に正の $s_j$ ごとに $e^{-ts_j^2}\to0$ を用いると、有限和なので極限が取れ、[擬似逆の公式](../SLT2-02/index.md#thm-slt2-02-minimum-norm)に一致する。$\square$
<!-- proof-end -->

この定理の $\sqrt t$ は全ての有限行列・全ての特異値に対する上界である。階数が正の行列 $X$ を一つに固定すれば最大増幅は実際には $\max_{1\le j\le r}g_t(s_j)$ であり、その値は一般に $\sqrt t$ より小さい。階数0なら係数への増幅は零である。反対に $t\to\infty$ とすると、小さな正の特異値に対する係数増幅は $1/s_j$ に近づく。

### 2.1 訓練残差は減るが、すべてが回復するとは限らない

列空間への射影を $P_X=\sum_{j=1}^ru_ju_j^{\mathsf T}$ と書くと、残差は

$$
y-\widehat f_t
=\sum_{j=1}^r e^{-ts_j^2}(u_j^{\mathsf T}y)u_j+(I-P_X)y.
$$

したがって

$$
\|y-\widehat f_t\|_2^2
=\sum_{j=1}^r e^{-2ts_j^2}(u_j^{\mathsf T}y)^2
+\|(I-P_X)y\|_2^2.
$$

各指数因子は時間とともに減り、$X$ の列空間に入らない応答部分だけが残る。これは**訓練残差の二乗が単調非増加**という結論であり、雑音を含まない真の信号への誤差が単調に減るという意味ではない。

## 3. 時間で動く有効次元

[ridge の有効次元](../SLT2-03/index.md#def-slt2-03-effective-dimension)は、予測の平滑化行列の固有値を足して測った。早期停止でも、[有限時刻勾配流のフィルタと安定性](#thm-slt2-06-finite-flow)の予測式から

$$
\widehat f_t=\sum_{j=1}^r h_t(s_j)(u_j^{\mathsf T}y)u_j
=\left(\sum_{j=1}^r h_t(s_j)u_ju_j^{\mathsf T}\right)y
$$

となる。すなわち括弧内が $y\mapsto\widehat f_t$ の行列表現であり、$u_j$ が単位ベクトルなので $\operatorname{tr}(u_ju_j^{\mathsf T})=u_j^{\mathsf T}u_j=1$ である。こうして各方向の通過率を足す量を定義できる。

<a id="def-slt2-06-effective-dimension"></a>

<!-- formal-statement-start -->
> **定義（勾配流の有効次元）**
> $X\in\mathbb R^{n\times p}$ の正の特異値が $s_1,\ldots,s_r$ であるとき、零初期値の最小二乗勾配流の時刻 $t\ge0$ における平滑化行列と有効次元を

$$
H_t=\sum_{j=1}^r(1-e^{-ts_j^2})u_ju_j^{\mathsf T},\qquad
d_{\mathrm{eff}}(t)=\operatorname{tr}(H_t)
=\sum_{j=1}^r(1-e^{-ts_j^2})
$$

> と定める。$H_ty$ が訓練点の予測であり、$d_{\mathrm{eff}}(t)$ は各方向の通過率の合計である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-06-effective-dimension -->
**定義の確認**。$X=\operatorname{diag}(2,1/2)$ なら $u_1=(1,0)^{\mathsf T}$、$u_2=(0,1)^{\mathsf T}$ である。この二つは直交単位ベクトルで、$u_1u_1^{\mathsf T}=\operatorname{diag}(1,0)$、$u_2u_2^{\mathsf T}=\operatorname{diag}(0,1)$。従って上の平滑化行列の定義に代入すると

$$
H_t=\operatorname{diag}(1-e^{-4t},1-e^{-t/4}),
\quad
d_{\mathrm{eff}}(t)=2-e^{-4t}-e^{-t/4}.
$$

$t=0$ では $H_0=0$ なので有効次元は0、$t\to\infty$ で2になる。例えば $t=\log2$ では $1-e^{-4t}=15/16$ だが、第2方向は $1-2^{-1/4}$ にすぎない。各方向の重みを足すので、実際の行列の階数が2でも有効次元は途中で2未満となる。
<!-- definition-example-end -->

$t$ を増やすと各 $1-e^{-ts_j^2}$ は増えるから、$d_{\mathrm{eff}}(t)$ は単調非減少で $0\le d_{\mathrm{eff}}(t)\le r$。$t>0$ では

$$
\frac{d}{dt}d_{\mathrm{eff}}(t)
=\sum_{j=1}^r s_j^2e^{-ts_j^2}\ge0.
$$

有効次元は**通過率の和**である。雑音分散の評価で出てくる $\operatorname{tr}(H_t^2)=\sum_j(1-e^{-ts_j^2})^2$ とは異なる。$0\le h_t\le1$ だから $\operatorname{tr}(H_t^2)\le d_{\mathrm{eff}}(t)$ という関係はある。

## 4. ridge とどこまで同じか

[ridge のスペクトルフィルタ](../SLT2-03/index.md#def-slt2-03-spectral-filter)は、$L(\beta)+\mu\|\beta\|_2^2/2$（$\mu>0$）に対し

$$
g_\mu^{\mathrm{ridge}}(s)=\frac{s}{s^2+\mu},
\qquad
h_\mu^{\mathrm{ridge}}(s)=\frac{s^2}{s^2+\mu}.
$$

時間 $t>0$ に対して $\mu=1/t$ を対応させると、両者の通過率は $z=ts^2$ という同じ無次元量で比較できる。しかし式は一致しない。

<a id="thm-slt2-06-ridge-comparison"></a>

<!-- formal-statement-start -->
> **定理（早期停止とridgeのスペクトル比較）**
> $X\in\mathbb R^{n\times p}$ を固定し、上記の平方損失の零初期値勾配流と、罰則係数 $\mu=1/t$ の ridge（$t>0$）を比較する。任意の $s>0$ について、係数フィルタと予測フィルタは

$$
g_{1/t}^{\mathrm{ridge}}(s)
\le g_t(s)\le2g_{1/t}^{\mathrm{ridge}}(s),
$$

$$
h_{1/t}^{\mathrm{ridge}}(s)
\le h_t(s)\le2h_{1/t}^{\mathrm{ridge}}(s)
$$

> を満たす。$s=0$ でも全て零である。$s>0$、$t>0$ では左側の不等号は厳密である。
<!-- formal-statement-end -->

### 証明の見取り図

$z=ts^2$ と書き、指数減衰で残る割合 $e^{-z}$ と、ridge で残る割合 $1/(1+z)$ を比較する。係数フィルタは予測通過率を $s$ で割ったものなので、同じ不等式が使える。

<!-- proof-start -->
### 証明

$z=ts^2>0$ と置く。$e^z\ge1+z$ より $e^{-z}\le(1+z)^{-1}$。従って

$$
1-e^{-z}\ge1-\frac1{1+z}=\frac z{1+z}.
$$

上側を示す。$0<z\le1$ なら $1-e^{-z}\le z$ かつ $1+z\le2$ なので

$$
1-e^{-z}\le z\le\frac{2z}{1+z}.
$$

$z\ge1$ なら $1-e^{-z}\le1$ かつ $2z/(1+z)\ge1$ である。二場合を合わせ

$$
\frac z{1+z}\le1-e^{-z}\le\frac{2z}{1+z}.
$$

$z/(1+z)=s^2/(s^2+1/t)$ だから予測フィルタの不等式になる。両辺を正の $s$ で割れば係数フィルタも得られる。$e^z>1+z$ は $z>0$ で厳密だから左側も厳密である。$\square$
<!-- proof-end -->

この定理は二つの方法が**同程度の大きさで固有方向を通す**ことを言う。しかし同じ推定量であるとは言わない。例えば $s=1$、$t=\log2$ では早期停止の予測通過率は $1/2$。これに一致する ridge 係数は $\mu=1$ である。ところが同じ時刻の $s=2$ では

$$
h_{\log2}(2)=\frac{15}{16},\qquad
h_1^{\mathrm{ridge}}(2)=\frac45
$$

となり一致しない。

そもそも正の $s$ に対して早期停止の通過率に一致する ridge の罰則係数を逆算すると

$$
\frac{s^2}{s^2+\mu}=1-e^{-ts^2}
\quad\Longleftrightarrow\quad
\mu=\frac{s^2}{e^{ts^2}-1}.
$$

実際、$a=s^2>0$ と置いて右辺を $m(a)=a/(e^{ta}-1)$ と書く。以下の $m'(a)$ と $F'(z)$ は $t$ を固定し、それぞれ $a$ と $z$ で微分したもので、先の学習時間による $\dot\beta$ とは異なる。

$$
m'(a)=\frac{e^{ta}(1-ta)-1}{(e^{ta}-1)^2}<0.
$$

不等号の理由は、分子を $z=ta>0$ の関数 $F(z)=e^z(1-z)-1$ と見れば、

$$
F(0)=0,\qquad F'(z)=-ze^z<0\quad(z>0)
$$

だからである。よって $m$ は厳密に減少し、**異なる正の特異値を二つ持つ設計では一つの $\mu$ で両方の通過率を一致させられない**。早期停止は ridge と似たスペクトル正則化だが、ridge そのものではない。

## 5. 停止時刻と偏り・分散

訓練損失が時間とともに下がることは分かった。しかし小さい特異値の方向には、真の信号だけでなく観測雑音もある。長く学習すれば両方をより強く通すため、真の信号への誤差は途中で最小になる可能性がある。

まず**設計行列を固定**し、観測のモデルを

$$
y=X\beta_\star+\varepsilon
$$

と置く。真の係数 $\beta_\star\in\mathbb R^p$ は固定し、雑音ベクトル $\varepsilon\in\mathbb R^n$ は

$$
E\varepsilon=0,\qquad
\operatorname{Cov}(\varepsilon)=\tau^2I_n\quad(\tau^2\ge0)
$$

を満たす。雑音の正規性・成分独立性は必要ない。停止時刻 $t\ge0$ は、**この雑音の実現値を見ずに事前に固定する数**とする。以下の $E_\varepsilon$ は、$X,\beta_\star,t$ を固定して雑音のみについて取る期待値である。

<a id="thm-slt2-06-fixed-design-risk"></a>

<!-- formal-statement-start -->
> **定理（早期停止の固定設計偏り分散分解）**
> 固定した $X\in\mathbb R^{n\times p}$、$\beta_\star\in\mathbb R^p$ と $y=X\beta_\star+\varepsilon$ に対し、$E\varepsilon=0$、$\operatorname{Cov}(\varepsilon)=\tau^2I_n$、$\tau^2\ge0$ とする。停止時刻 $t\ge0$ は雑音と独立に固定する。$X$ の正の特異値を $s_j$、対応する右特異ベクトルを $v_j$、$\theta_j=v_j^{\mathsf T}\beta_\star$、$P_{\ker X}$ を $\ker X$ への直交射影とする。このとき係数二乗誤差の期待値は

$$
\begin{aligned}
E_\varepsilon\|\widehat\beta_t-\beta_\star\|_2^2
={}&\|P_{\ker X}\beta_\star\|_2^2
+\sum_{j=1}^r e^{-2ts_j^2}\theta_j^2\\
&+\tau^2\sum_{j=1}^r\frac{(1-e^{-ts_j^2})^2}{s_j^2}.
\end{aligned}
$$

> また、訓練点における**雑音を含まない信号** $X\beta_\star$ に対する予測二乗誤差は

$$
E_\varepsilon\|\widehat f_t-X\beta_\star\|_2^2
=\sum_{j=1}^r s_j^2e^{-2ts_j^2}\theta_j^2
+\tau^2\sum_{j=1}^r(1-e^{-ts_j^2})^2.
$$

> 最初の式の核項と各指数項は二乗偏り、$\tau^2$ を掛けた和は分散である。いずれも固定設計と固定停止時刻についての**雑音の期待値**であり、一般の新規入力に対する汎化リスクを直接表すものではない。
<!-- formal-statement-end -->

### 証明の見取り図

[有限時刻フィルタ](#thm-slt2-06-finite-flow)に $y=X\beta_\star+\varepsilon$ を代入する。各特異方向における真の係数と雑音の寄与を分離してから二乗する。雑音は平均零なので交差項の期待値が消え、直交性により異なる方向の二乗和となる。

<!-- proof-start -->
### 証明

$X\beta_\star=\sum_{j=1}^rs_j\theta_ju_j$ である。[有限時刻の係数表示](#thm-slt2-06-finite-flow)に代入すると

$$
\begin{aligned}
\widehat\beta_t
&=\sum_{j=1}^r\frac{1-e^{-ts_j^2}}{s_j}
\bigl(s_j\theta_j+u_j^{\mathsf T}\varepsilon\bigr)v_j\\
&=\sum_{j=1}^r
\left[(1-e^{-ts_j^2})\theta_j
+\frac{1-e^{-ts_j^2}}{s_j}u_j^{\mathsf T}\varepsilon\right]v_j.
\end{aligned}
$$

[行空間と核の直交性](../SLT2-01/index.md#thm-slt2-01-row-null-prediction)により、$\beta_\star=\sum_{j=1}^r\theta_jv_j+P_{\ker X}\beta_\star$ と直交分解できるので

$$
\widehat\beta_t-\beta_\star
=-P_{\ker X}\beta_\star
+\sum_{j=1}^r
\left[-e^{-ts_j^2}\theta_j
+\frac{1-e^{-ts_j^2}}{s_j}u_j^{\mathsf T}\varepsilon\right]v_j.
$$

$E(u_j^{\mathsf T}\varepsilon)=0$、また

$$
E(u_j^{\mathsf T}\varepsilon)^2
=u_j^{\mathsf T}(\tau^2I_n)u_j=\tau^2
$$

である。各方向の括弧を二乗して期待値を取ると、信号と雑音の交差項は零になる。$v_j$ と核方向は互いに直交するため、その二乗和は定理の第一式となる。

さらに左から $X$ を掛けると $XP_{\ker X}\beta_\star=0$、$Xv_j=s_ju_j$ より

$$
\widehat f_t-X\beta_\star
=\sum_{j=1}^r
\left[-s_je^{-ts_j^2}\theta_j
+(1-e^{-ts_j^2})u_j^{\mathsf T}\varepsilon\right]u_j.
$$

$u_j$ の直交性、平均零、分散 $\tau^2$ をもう一度用いれば第二式を得る。$\square$
<!-- proof-end -->

比較として $t=0$ では $\widehat\beta_0=0$ なので係数リスクは $\|\beta_\star\|_2^2$、分散は零である。一方、$\widehat\beta_\infty\coloneqq\lim_{t\to\infty}\widehat\beta_t$ と書くと、有限個の特異方向について極限を取れるので

$$
E_\varepsilon\|\widehat\beta_\infty-\beta_\star\|_2^2
=\|P_{\ker X}\beta_\star\|_2^2
+\tau^2\sum_{j=1}^r\frac1{s_j^2}.
$$

訓練点の信号予測リスクは $\tau^2r$ になる。特異値の小さい方向では、長時間の勾配流が係数雑音を $1/s_j$ 倍に増幅する。いずれも有限階数 $r$ の固定行列における極限であり、[比例高次元漸近](../SLT2-05/index.md#def-slt2-05-proportional-regime)と混同しない。

### 5.1 一つの方向では最適な時刻を厳密に求められる

係数方向が一つだけで、特異値が $s>0$、真の係数が $\theta$、雑音分散が $\tau^2>0$ としよう。上のリスクのその方向の寄与は

$$
\mathcal R_s(t)=e^{-2ts^2}\theta^2
+\frac{\tau^2}{s^2}(1-e^{-ts^2})^2.
$$

小さな $t$ は雑音を遮断するが信号にも偏りを残す。どこで二つの効果が釣り合うだろうか。

<a id="prop-slt2-06-one-mode-optimum"></a>

<!-- formal-statement-start -->
> **命題（一モードの最適停止時刻）**
> 特異値 $s>0$、固定信号係数 $\theta\in\mathbb R$、雑音分散 $\tau^2>0$ について、上の一モード係数リスク $\mathcal R_s(t)$ を $t\ge0$ で最小にする時刻は

$$
t^\star=\frac1{s^2}\log\left(1+\frac{s^2\theta^2}{\tau^2}\right).
$$

> $\theta=0$ では $t^\star=0$、$\theta\ne0$ では $0<t^\star<\infty$ であり、最小リスクは

$$
\min_{t\ge0}\mathcal R_s(t)
=\frac{\theta^2\tau^2}{s^2\theta^2+\tau^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$q=e^{-s^2t}$ と変数を替えると、$q$ は $1$ から $0$ へ単調に動き、リスクは $q$ の二次式になる。平方完成で最小点を取り、その点から時間へ戻す。

<!-- proof-start -->
### 証明

$A=\theta^2\ge0$、$B=\tau^2/s^2>0$、$q=e^{-s^2t}\in(0,1]$ と置くと

$$
\begin{aligned}
\mathcal R_s(t)&=Aq^2+B(1-q)^2\\
&=(A+B)\left(q-\frac{B}{A+B}\right)^2
+\frac{AB}{A+B}.
\end{aligned}
$$

$q^\star=B/(A+B)$ は $0<q^\star\le1$ を満たす。したがって許された範囲で一意の最小点である。$q^\star=e^{-s^2t^\star}$ から

$$
t^\star=-\frac1{s^2}\log\frac{B}{A+B}
=\frac1{s^2}\log\left(1+\frac AB\right)
$$

となり、$A/B=s^2\theta^2/\tau^2$ を代入する。最小リスク $AB/(A+B)$ も同じ代入で定理の式となる。$\theta=0$ では $A=0$、$q^\star=1$ なので $t^\star=0$ である。$\square$
<!-- proof-end -->

例えば $s=1$、$\theta=1$、$\tau^2=1$ のとき $t^\star=\log2$、最小リスクは $1/2$。開始時刻のリスク $1$、無限時間のリスク $1$ より小さい。$\theta=2$ に変われば $t^\star=\log5$ となり、信号が大きいのでより長く学ぶ方がよい。

ただしこの時刻は**未知の真の係数 $\theta$ と雑音分散 $\tau^2$ を知っている**という理想化の下で計算した。実際の複数モードでは停止時刻 $t$ は共通で、各方向の個別の $t^\star$ を同時には選べない。

## 6. 早期停止にできること・できないこと

| 問い | ここで成立する結果 | 条件・注意 |
| --- | --- | --- |
| 弱い特異方向の雑音増幅を抑えられるか | [係数フィルタ上界](#thm-slt2-06-finite-flow) $g_t(s)\le\sqrt t$（$s>0$）。階数0の場合も成り立つ | 零初期値、平方損失、固定した有限時刻 |
| ridge と同じ学習をするか | [通過率の二側比較](#thm-slt2-06-ridge-comparison) | $\mu=1/t$ で係数・予測通過率が同程度。一般に値は一致しない |
| 長く学習するほど真の信号に近づくか | [偏り・分散の分解](#thm-slt2-06-fixed-design-risk) | 偏りは下がるが雑音分散は上がる。訓練損失とは違う |
| 停止時刻を自動的に最適化できるか | [一モードの理想的最適時刻](#prop-slt2-06-one-mode-optimum) | 真の信号と雑音分散を知らなければ直接計算できない |
| 同じデータを見て時刻を選んでもよいか | 本章の固定時刻リスク公式はそのまま適用できない | 停止時刻 $T(y)$ は雑音と依存し、交差項の期待値が消える保証がない |
| 新規の入力について保証できるか | 本章の第二式は訓練点の**信号**予測誤差 | 新規入力の分布・評価する損失・時刻選択の方法が必要 |

実際の early stopping では、訓練標本と分離した検証標本で時刻を選ぶ場合がある。しかし検証標本を繰り返し見て選ぶことには選択バイアスが生じ得る。時刻を選ぶ方法込みの保証は、別途確率的な評価が要る。本章の固定時刻公式を「検証で選んだ停止時刻の無条件な汎化保証」と読み替えてはいけない。

次章では、有限行列の固有値を kernel の Gram 行列へ移して、補間・正則化と有効次元を調べる。

## 演習

### SLT2-06-A01 二方向の有限時刻フィルタ
- Level: A
- 目安時間: 12分

$X=\operatorname{diag}(2,1)$、$y=(2,3)^{\mathsf T}$、$\beta(0)=0$ とする。$L(\beta)=\|X\beta-y\|_2^2/2$ の勾配流を $t=\log2$ で止めた係数と訓練残差を求めよ。

<!-- solution-start -->
#### 詳細解答

特異値は $2,1$、左右特異ベクトルは標準基底である。[有限時刻の係数表示](#thm-slt2-06-finite-flow)から

$$
\widehat\beta_t
=\begin{pmatrix}(1-e^{-4t})y_1/2\\(1-e^{-t})y_2\end{pmatrix}.
$$

$e^{-4\log2}=1/16$、$e^{-\log2}=1/2$ を代入すると

$$
\widehat\beta_{\log2}=(15/16,3/2)^{\mathsf T}.
$$

予測と訓練残差はそれぞれ

$$
X\widehat\beta_{\log2}=(15/8,3/2)^{\mathsf T},\qquad
y-X\widehat\beta_{\log2}=(1/8,3/2)^{\mathsf T}.
$$

第1方向の減衰因子 $1/16$ に対して、第2方向は $1/2$ である。
<!-- solution-end -->

### SLT2-06-A02 見えない係数方向
- Level: A
- 目安時間: 10分

$X=(1\ \ 0)\in\mathbb R^{1\times2}$、$y=(4)$ とする。零初期値からの早期停止推定量を求め、$t\to\infty$ で第2係数が回復しないことを示せ。

<!-- solution-start -->
#### 詳細解答

階数は1、正の特異値は $s_1=1$、右特異ベクトルは $v_1=(1,0)^{\mathsf T}$、左特異ベクトルは $u_1=(1)$。したがって

$$
\widehat\beta_t=(4(1-e^{-t}),0)^{\mathsf T}.
$$

$t\to\infty$ で $(4,0)^{\mathsf T}$ に収束する。$(0,1)^{\mathsf T}\in\ker X$ だから第2係数をどの値に変えても $X\beta$ は変わらず、零初期値の勾配はその方向に成分を持たない。補間できることと第2係数を識別できることは違う。
<!-- solution-end -->

### SLT2-06-A03 ridge と通過率を比べる
- Level: A
- 目安時間: 10分

$s=1$、$t=\log2$ とし、早期停止の予測通過率と、$\mu=1/t$ の ridge の予測通過率を求め、大小関係を確認せよ。

<!-- solution-start -->
#### 詳細解答

早期停止では $h_t(1)=1-e^{-\log2}=1/2$。ridgeでは $\mu=1/\log2$ なので

$$
h_{1/t}^{\mathrm{ridge}}(1)
=\frac1{1+1/\log2}
=\frac{\log2}{1+\log2}.
$$

$0<\log2<1$ だから $\log2/(1+\log2)<1/2$。一方 $2\log2/(1+\log2)>1/2$ は $3\log2>1$ から従う。よって[二側比較](#thm-slt2-06-ridge-comparison)がこの例でも成立する。$\mu=1/t$ と置いても両者は等しくない。
<!-- solution-end -->

### SLT2-06-A04 雑音感度の一様上界
- Level: A
- 目安時間: 10分

$X=(s)$、$s>0$、時刻 $t>0$ で応答 $y$ を $y+\delta$ に変えたとする。係数差を計算し、その絶対値が $\sqrt t|\delta|$ 以下となることを示せ。

<!-- solution-start -->
#### 詳細解答

一次元の[係数フィルタ](#def-slt2-06-early-stopping-filter)から、差は

$$
\widehat\beta_t(y+\delta)-\widehat\beta_t(y)
=\frac{1-e^{-ts^2}}s\,\delta.
$$

$1-e^{-a}\le\min\{a,1\}$ を $a=ts^2$ に適用して

$$
\left|\widehat\beta_t(y+\delta)-\widehat\beta_t(y)\right|
\le\min\{ts,1/s\}|\delta|\le\sqrt t|\delta|.
$$

最後の不等号は $s\le1/\sqrt t$ と $s\ge1/\sqrt t$ に分けて確認できる。無限時刻では上界が時間に依存して増え、係数差は $|\delta|/s$ へ近づく。
<!-- solution-end -->

### SLT2-06-A05 有効次元と分散の違い
- Level: A
- 目安時間: 12分

$X=I_2$、$t=\log2$ とする。$H_t$、$d_{\mathrm{eff}}(t)$、$\operatorname{tr}(H_t^2)$ を求め、最後の二つが同じ量ではないことを確認せよ。

<!-- solution-start -->
#### 詳細解答

二つの特異値はいずれも1なので、通過率は $1-e^{-t}=1/2$ となる。よって

$$
H_t=\frac12I_2,\quad
d_{\mathrm{eff}}(t)=\operatorname{tr}(H_t)=1,
\quad
\operatorname{tr}(H_t^2)=\operatorname{tr}(I_2/4)=1/2.
$$

有効次元は通過率を足すのに対し、信号予測リスクの雑音分散には通過率の**二乗**を足す。$1/2$ の二乗は $1/4$ だから同じにはならない。
<!-- solution-end -->

### SLT2-06-B01 スペクトル比較を自力で証明する
- Level: B
- 目安時間: 20分

$t>0$、$s>0$ とし、$z=ts^2$ と置く。$z/(1+z)\le1-e^{-z}\le2z/(1+z)$ を証明し、係数フィルタと予測フィルタの ridge 比較に戻せ。等号が成立し得る範囲も説明せよ。

<!-- solution-start -->
#### 詳細解答

$e^z\ge1+z$ は $e^z=1+\int_0^ze^u\,du$ と $e^u\ge1$ から従い、$z>0$ では厳密である。逆数を取って $e^{-z}\le1/(1+z)$、従って

$$
1-e^{-z}\ge1-\frac1{1+z}=\frac z{1+z}.
$$

上側は $0<z\le1$ と $z\ge1$ に分け、

$$
\begin{aligned}
0<z\le1:\quad &1-e^{-z}\le z\le\frac{2z}{1+z},\\
z\ge1:\quad &1-e^{-z}\le1\le\frac{2z}{1+z}.
\end{aligned}
$$

これで二側が成立する。$z=ts^2$ と戻せば $z/(1+z)=s^2/(s^2+1/t)$ なので予測通過率を比較できる。係数通過率はどちらも予測通過率を正の $s$ で割ったものなので同じ不等式が従う。$t,s>0$ では左側は厳密で、$z=0$ まで含めれば両通過率が0の等号の場合がある。
<!-- solution-end -->

### SLT2-06-B02 固定設計で偏りと分散を計算する
- Level: B
- 目安時間: 20分

$X=\operatorname{diag}(2,1)$、真の係数 $\beta_\star=(1,1)^{\mathsf T}$、観測 $y=X\beta_\star+\varepsilon$ とする。$E\varepsilon=0$、$\operatorname{Cov}(\varepsilon)=I_2$ で、時刻 $t=\log2$ を事前に固定する。係数リスクの偏り二乗、分散、合計を求めよ。

<!-- solution-start -->
#### 詳細解答

$s_1=2$、$s_2=1$、$\theta_1=\theta_2=1$ で核は零である。$e^{-4t}=1/16$、$e^{-t}=1/2$ を[固定設計リスク公式](#thm-slt2-06-fixed-design-risk)に代入すると、偏り二乗は

$$
\left(\frac1{16}\right)^2+\left(\frac12\right)^2
=\frac1{256}+\frac14=\frac{65}{256}.
$$

分散は特異値の二乗で割るので

$$
\frac{(1-1/16)^2}{4}+\frac{(1-1/2)^2}{1}
=\frac{225}{1024}+\frac14
=\frac{481}{1024}.
$$

偏り二乗を共通分母に直すと $65/256=260/1024$。合計は $741/1024$ である。雑音を正規分布とする必要はなく、平均と共分散だけでこの期待二乗誤差を求められる。
<!-- solution-end -->

### SLT2-06-B03 一方向の最適停止時刻を導く
- Level: B
- 目安時間: 18分

一モード $s=2$、真の係数 $\theta=1$、雑音分散 $\tau^2=4$ とする。係数リスクの時間依存式から最適時刻と最小リスクを導け。無限時間まで学習したときのリスクとも比較せよ。

<!-- solution-start -->
#### 詳細解答

[偏り・分散分解](#thm-slt2-06-fixed-design-risk)の当該方向を使うと、$s^2=4$、$\tau^2/s^2=1$ なので

$$
\mathcal R_2(t)=e^{-8t}+(1-e^{-4t})^2.
$$

$q=e^{-4t}\in(0,1]$ と置けば

$$
\mathcal R_2=q^2+(1-q)^2
=2(q-1/2)^2+1/2.
$$

従って $q^\star=1/2$、$t^\star=(\log2)/4$、最小リスクは $1/2$。一方 $t\to\infty$ なら $q\to0$ なのでリスクは $1$。信号の偏りを消すだけでは雑音分散が残るため、有限時刻の方がよい。
<!-- solution-end -->

### SLT2-06-B04 一つのridgeで二つの方向に一致できるか
- Level: B
- 目安時間: 20分

$X=\operatorname{diag}(1,2)$、$t=\log2$ とする。$s=1$ における早期停止の予測通過率に一致する ridge の $\mu>0$ を求めよ。同じ $\mu$ が $s=2$ にも一致するか確認し、その違いが訓練点の応答に及ぼす影響を述べよ。

<!-- solution-start -->
#### 詳細解答

$s=1$ では $h_t(1)=1/2$。ridge で $1/(1+\mu)=1/2$ だから $\mu=1$。しかし $s=2$ の早期停止通過率は $1-e^{-4\log2}=15/16$、ridge は $4/(4+1)=4/5$。差は

$$
\frac{15}{16}-\frac45=\frac{75-64}{80}=\frac{11}{80}>0.
$$

したがって $y=(0,1)^{\mathsf T}$ の訓練点予測は早期停止が $(0,15/16)^{\mathsf T}$、ridge が $(0,4/5)^{\mathsf T}$ であり一致しない。二つの特異方向が異なる速さで通過するため、一つの ridge 罰則係数では全方向を厳密には再現できない。
<!-- solution-end -->

### SLT2-06-C01 早期停止・核方向・リスクを統合する
- Level: C
- 目安時間: 35分

固定設計 $X=\begin{pmatrix}2&0&0\\0&1&0\end{pmatrix}\in\mathbb R^{2\times3}$、真の係数 $\beta_\star=(1,1,3)^{\mathsf T}$、応答 $y=X\beta_\star+\varepsilon$ を考える。$E\varepsilon=0$、$\operatorname{Cov}(\varepsilon)=I_2$ とし、停止時刻は雑音を見ずに $t=\log2$ と固定する。

1. 任意の応答 $y$ に対する $\widehat\beta_t$ と $H_t$ を求めよ。
2. 係数リスクを核方向の偏り、観測できる方向の偏り、雑音分散に分解して厳密値を出せ。
3. 雑音を含まない訓練点信号 $X\beta_\star$ に対する期待二乗誤差を求めよ。
4. $t\to\infty$ の係数リスクを求め、なぜ無限時間が必ずしも最良でないか説明せよ。
5. $\mu=1/t$ の ridge へ置き換えたとき同一推定量であると言えるか、理由を示せ。

<!-- solution-start -->
#### 詳細解答

**1.** 正の特異値は $s_1=2$、$s_2=1$、右特異ベクトルは $e_1,e_2$、左特異ベクトルは $\mathbb R^2$ の標準基底。$e_3$ は $X$ の核に属する。[有限時刻公式](#thm-slt2-06-finite-flow)から

$$
\widehat\beta_t=\begin{pmatrix}
(1-e^{-4t})y_1/2\\
(1-e^{-t})y_2\\
0
\end{pmatrix},\qquad
H_t=\operatorname{diag}(1-e^{-4t},1-e^{-t}).
$$

$t=\log2$ を代入すると

$$
\widehat\beta_{\log2}=(15y_1/32,y_2/2,0)^{\mathsf T},
\qquad H_{\log2}=\operatorname{diag}(15/16,1/2).
$$

**2.** 観測可能な係数方向の信号は $\theta_1=\theta_2=1$、核方向の真の係数は3である。[固定設計リスク](#thm-slt2-06-fixed-design-risk)の核項は $3^2=9$。観測可能方向の偏り二乗は $(1/16)^2+(1/2)^2=65/256$。雑音分散の寄与は

$$
\frac{(15/16)^2}{2^2}+\frac{(1/2)^2}{1^2}
=\frac{225}{1024}+\frac{256}{1024}
=\frac{481}{1024}.
$$

従って総係数リスクは

$$
9+\frac{260}{1024}+\frac{481}{1024}
=9+\frac{741}{1024}.
$$

**3.** 訓練点の信号は $(2,1)^{\mathsf T}$ で、核方向の係数3はこれに影響しない。信号の二乗偏りは

$$
4\left(\frac1{16}\right)^2+1\left(\frac12\right)^2
=\frac1{64}+\frac14=\frac{68}{256}.
$$

予測の雑音分散は

$$
\left(\frac{15}{16}\right)^2+\left(\frac12\right)^2
=\frac{225}{256}+\frac{64}{256}
=\frac{289}{256}.
$$

合計は $(68+289)/256=357/256$。係数リスクと予測リスクでは、核方向と特異値の重みが異なる。

**4.** 無限時間の零初期値勾配流は最小ノルム解に収束する。観測可能な方向の二乗偏りは零となるが、核の偏りと雑音分散が残り、係数リスクは

$$
9+\frac14+1=\frac{41}{4}.
$$

有限時刻の $9+741/1024$ の方が小さい。これは雑音のある弱い方向を完全に学習しない効果による。

**5.** $\mu=1/\log2$ の ridge の予測通過率は、特異値2と1に対しそれぞれ

$$
\frac4{4+1/\log2},\qquad
\frac1{1+1/\log2}=\frac{\log2}{1+\log2}\ne\frac12.
$$

[二側比較](#thm-slt2-06-ridge-comparison)は成立するが、第二方向だけでも早期停止の通過率と異なるため同じ平滑化行列にはならない。両者を同じ推定量と呼ぶことはできない。
<!-- solution-end -->
