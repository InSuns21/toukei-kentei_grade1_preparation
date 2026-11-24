# FCG13 広い海の波を高速に合成するには

前講では浅い水槽の水深を時間発展させた。遠洋では広い領域に細かな波が同時に存在する。小振幅の波を対象にすれば、全ての水粒子を追う代わりに、波長と方向の異なる成分を足して水面の形を作れる。ここでは規則正しい単一波から出発し、海面の変位・傾き・空の反射を同じ波から計算する。

## 1. 波長ごとに異なる時計を持つ

水平位置を $r=(x,y)$ [m]、平均水面から上向きの高さを $\eta$ [m] とする。時刻を $t$ [s]、方向を含む波数ベクトルを $q=(q_x,q_y)$ [rad/m]、その長さを $k=|q|=\sqrt{q_x^2+q_y^2}>0$ とする。角周波数を $\omega>0$ [rad/s] とし、内積は $q\cdot r=q_x x+q_y y$ とする。

進行方向の座標 $\xi=(q/k)\cdot r$ を取ると $q\cdot r=k\xi$ となる。[波数・角周波数・周期](../../../物理系/FLUID/FLUID27/index.md#def-fluid27-wavenumber) より波長は $2\pi/k$、周期は $2\pi/\omega$ である。

一定密度 $\rho>0$、水深 $h>0$、重力加速度 $g>0$ の非粘性・非圧縮・非回転の小振幅重力波を考える。一定気圧の下、進行方向 $\xi$ と鉛直方向の平面内で [線形自由表面条件](../../../物理系/FLUID/FLUID27/index.md#prop-fluid27-linear-boundary) を使う。振幅（平均水面からの最大変位）を $a$ [m] とすると $ka\ll1$、有限水深では $a/h\ll1$ が線形化の目安である。

表面張力を $\gamma$ とすると、[有限水深の重力・毛管波の分散関係](../../../物理系/FLUID/FLUID27/index.md#thm-fluid27-dispersion) は

$$
\omega^2=(gk+(\gamma/\rho)k^3)\tanh(kh).
$$

$\gamma=0$ と置き、$k>0$ を固定した [深水極限](../../../物理系/FLUID/FLUID27/index.md#prop-fluid27-depth-limits) $h\to\infty$ で $\tanh(kh)\to1$ を用いる。以下ではこの極限の式を模型として採用する。

$$
\omega^2=gk,\qquad \omega=\sqrt{gk}.
$$

初期位相を $\phi$ [rad] とし、波の位相を $\theta=q\cdot r-\omega t+\phi$ とすると、一成分の高さは $a\cos\theta$ となる。山を追うには $\theta=k\xi(t)-\omega t+\phi$ を一定に保つ。$k,\omega,\phi$ を固定して $t$ で微分すると

$$
0=k\frac{d\xi}{dt}-\omega.
$$

$k>0$ なので $q/k$ の方向に [位相速度](../../../物理系/FLUID/FLUID27/index.md#def-fluid27-phase-speed) $c_p=\omega/k=\sqrt{g/k}$ で進む。[群速度](../../../物理系/FLUID/FLUID28/index.md#def-fluid28-group-velocity) は同方向で近い波数を持つ波の包絡が進む速さである。ここでは $g$ を固定して正の変数 $k$ で常微分する。

$$
c_g=\frac{d\omega}{dk}=\frac{g}{2\sqrt{gk}}=\frac{c_p}{2}.
$$

例えば $g=10$ m/s²、$k=0.4$ rad/m なら $\omega=2$ rad/s、$c_p=5$ m/s、$c_g=2.5$ m/s となる。山と包絡は同じ速度で進まない。

## 2. 周期的な海面を作る

一辺 $L>0$ [m] の正方形を繰り返して描くと、波数の各成分を $2\pi/L$ の整数倍に選べる。整数対を $m=(m_x,m_y)$ とすると $q=2\pi m/L$ である。

$x$ を $L$ だけ増やした位相差は $q_x L=2\pi m_x$、$y$ を $L$ だけ増やした差は $2\pi m_y$ となる。余弦と正弦の周期が $2\pi$ なので境界で高さも傾きもつながる。異なる方向の波を同時に動かすと、山が重なったり打ち消し合ったりする。

<a id="def-fcg13-periodic-synthesis"></a>

<!-- formal-statement-start -->
> **定義（周期海面の波の合成）**
> $g,L>0$、正整数 $M$ と $j=1,\ldots,M$ に対する非零整数対 $m_j\in\mathbb Z^2$、振幅 $a_j\ge0$、初期位相 $\phi_j\in\mathbb R$ を与える。$q_j=2\pi m_j/L$、$\omega_j=\sqrt{g|q_j|}$ として、深水重力波の高さを

$$
\eta(r,t)=\sum_{j=1}^{M}a_j\cos(q_j\cdot r-\omega_jt+\phi_j)
$$

> と定める。水平位置 $r\in\mathbb R^2$、時刻 $t\in\mathbb R$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg13-periodic-synthesis -->
**直接例。** $L=20$ m、$m_1=(1,0),m_2=(0,2)$、$a_1=0.2,a_2=0.1$ m、両初期位相0とする。

**定義の確認**。任意の $g>0$ に対して $M=2$、$L>0$、整数対はいずれも非零、振幅は非負、初期位相は実数である。波数は

$$
q_1=(\pi/10,0),\qquad q_2=(0,\pi/5)
$$

となり、長さは $\pi/10,\pi/5$。従って角周波数はそれぞれ $\sqrt{g\pi/10},\sqrt{g\pi/5}$。時刻0、原点では両位相が0なので $\eta(0,0)=0.2+0.1=0.3$ m（ここでは第一引数が水平位置の原点）。$x$ を20 m増やすと第一波の位相が $2\pi$、第二波は0だけ増え、余弦は不変である。$y$ を20 m増やすと第二波の位相が $4\pi$ 増えるので同様に不変となる。
<!-- definition-example-end -->

[線形自由表面条件](../../../物理系/FLUID/FLUID27/index.md#prop-fluid27-linear-boundary) を進行方向ごとに適用して個々の波を作る。水平二方向の場合も内部の Laplace 方程式と水面条件は線形であり、解の有限和も解になる。第 $j$ 波の高さを $\eta_j$、速度ポテンシャルを $\Phi_j$ と書く。位相 $\phi_j$ と速度ポテンシャル $\Phi_j$ は別の量であり、$\partial_t$ は空間座標を固定した時刻の偏微分である。水面の力学条件（表面張力なし）は

$$
\partial_t\sum_j\Phi_j+g\sum_j\eta_j
=\sum_j(\partial_t\Phi_j+g\eta_j)=0.
$$

物理模型としては合成後も水面勾配が十分小さいことが必要である。実海面で波が砕けたり強く相互作用したりする場合はこの仮定から外れる。周期化は外洋の一部分を反復する便法で、遠方まで同じ模様が続く実海洋を意味しない。

## 3. 格子の全点をFFTでまとめて計算する

一方向の標本数を正整数 $N$ とし、格子点を $r_{uv}=L(u,v)/N$、$u,v=0,\ldots,N-1$ とする。$i$ は虚数単位で、複素指数を $e^{i\theta}=\cos\theta+i\sin\theta$ と表す。角度 $-\theta$ では正弦だけが符号を変えるので、二つの指数を足して2で割ると

$$
\cos\theta=\frac{e^{i\theta}+e^{-i\theta}}{2}
$$

となる。時刻を固定して位相 $\alpha_j=\phi_j-\omega_j t$ を使う。

波の高さを複素指数の和で表すため、整数波数ごとの複素係数を格納する $N\times N$ のスペクトル配列 $C=(C_{ps})$ を用いる。$p,s$ はそれぞれ $x,y$ 方向の波数添字で $0,\ldots,N-1$ を取る。

この配列に $a_j e^{i\alpha_j}/2$ を添字 $m_j$、その複素共役を $-m_j$ に加える。添字は各方向について $N$ で割った余りを用いる。複数成分の添字が一致したら加算する。余りは負の添字についても $0,\ldots,N-1$ の範囲で取る。

本講でいう逆離散フーリエ変換は、長さ $N$ の係数列 $(c_p)$ から標本列 $(f_u)$ を得る写像

$$
f_u=\frac1N\sum_{p=0}^{N-1}c_p e^{2\pi i pu/N}
$$

である。二方向に適用すると正規化係数は $1/N^2$ となる。ラボではこの係数を初めから省いた逆変換を実装する。

<a id="prop-fcg13-spectrum"></a>

<!-- formal-statement-start -->
> **命題（周期海面の離散スペクトル合成）**
> [周期海面の波の合成](#def-fcg13-periodic-synthesis) の有限和について、$N$ を正整数とし、時刻 $t$ を固定して $\alpha_j=\phi_j-\omega_jt$ とし、$u,v=0,\ldots,N-1$ に対して $r_{uv}=L(u,v)/N$ とする。零で初期化した $N\times N$ の複素配列 $C$ に $a_j e^{i\alpha_j}/2$ を添字 $m_j\bmod N$ へ、$a_j e^{-i\alpha_j}/2$ を $-m_j\bmod N$ へ加える（剰余は各成分について取り、同じ添字への寄与も加算する）。このとき全格子点で

$$
\eta(r_{uv},t)=
\sum_{p,s=0}^{N-1}C_{ps}\exp(2\pi i(pu+sv)/N).
$$

> 右辺は実数であり、各方向に通常の逆離散フーリエ変換（各方向 $1/N$ の正規化）を適用した結果に $N^2$ を掛ければ求まる。
<!-- formal-statement-end -->

**証明の見取り図。** 一つの余弦を二つの複素指数に分け、添字の剰余が格子上の指数を変えないことを確認する。

<!-- proof-start -->
### 証明

一成分に対し添字 $j$ を省いて $\theta=2\pi(m_x u+m_y v)/N+\alpha$ と置く。

$$
a\cos\theta=\frac a2 e^{i\alpha}e^{2\pi i(m_xu+m_yv)/N}
+\frac a2 e^{-i\alpha}e^{-2\pi i(m_xu+m_yv)/N}.
$$

$m_x=p+\ell N,\ m_y=s+bN$（$\ell,b\in\mathbb Z$）と書くと、$u,v$ が整数なので

$$
e^{2\pi i(m_xu+m_yv)/N}
=e^{2\pi i(pu+sv)/N}e^{2\pi i(\ell u+bv)}
=e^{2\pi i(pu+sv)/N}.
$$

負の波数についても同じ剰余の議論が成立する。全成分を足し、同じ剰余の項をまとめると主張の式となる。各一成分の二項は互いに複素共役なので和は実数。まず $p$ について逆変換し、続いて $s$ について逆変換すると

$$
\frac1N\sum_s
\left(\frac1N\sum_p C_{ps}e^{2\pi i pu/N}\right)
e^{2\pi i sv/N}
=\frac{\eta(r_{uv},t)}{N^2}.
$$

この正規化を打ち消す $N^2$ を掛ければ高さが得られる。
<!-- proof-end -->

例えば $N=8,m=(1,0),a=2,\alpha=0$ なら $C_{1,0}=C_{7,0}=1$。$u=0,2,4,6$ で合成値は順に2,0,-2,0 m となる。

<a id="fcg13-fft-butterfly"></a>

### 偶数・奇数に分ける高速化

$N=2^d$（$d$ は正整数、長さ1を再帰の終端とする）とし、長さ $N$ の逆変換の非正規化和 $X_u=\sum_{p=0}^{N-1}c_p e^{2\pi i pu/N}$ を考える。偶数 $p=2b$ と奇数 $p=2b+1$ に分けると、

$$
X_u=E_u+e^{2\pi i u/N}O_u,
\qquad X_{u+N/2}=E_u-e^{2\pi i u/N}O_u
$$

となる。ここで $0\le u<N/2$ とし、

$$
E_u=\sum_{b=0}^{N/2-1}c_{2b}e^{2\pi i bu/(N/2)},
\qquad
O_u=\sum_{b=0}^{N/2-1}c_{2b+1}e^{2\pi i bu/(N/2)}.
$$

奇数項の指数を分けると $e^{2\pi i(2b+1)u/N}=e^{2\pi i bu/(N/2)}e^{2\pi i u/N}$ となる。$u$ を $u+N/2$ に変えると前者は $e^{2\pi i b}=1$ 倍、後者は $e^{\pi i}=-1$ 倍になる。したがって二つの式で同じ $E_u,O_u$ を使える。

二つの長さ $N/2$ の計算を共有し、長さ1まで分割する高速フーリエ変換（FFT）である。第 $\ell$ 段には長さ $N/2^\ell$ の問題が $2^\ell$ 個あり、結合処理は各問題の長さに比例する。従って各段の全処理数は $O(N)$、段数は $\log_2 N$。ここで $O$ は入力数に対する計算量の増加の尺度を表す。

行を $N$ 本、列を $N$ 本処理すると $O(N^2\log N)$ となる。係数を配置する $O(M)$ の処理も必要である。$M$ 個の波を全点で直接足す方法は $O(MN^2)$ なので、成分が少なければ直接和も有用である。

<a id="fcg13-aliasing"></a>

### 標本化と折り返し

格子間隔は $L/N$。整数波数 $m_x$ と $m_x+N$ の指数は格子上で一致する。この区別不能を折り返し（aliasing）と呼ぶ。

実装では各整数成分の絶対値を $N/2$ 未満に制限する。この範囲の二つの整数の差は絶対値が $N$ 未満なので、剰余が一致するなら同じ整数である。偶数 $N$ では境界の $N/2$ と $-N/2$ も区別できない。

例えば $N=8$ の $m_x=5$ は $m_x=-3$ と同じ空間標本になるが、物理的な角周波数まで同じになるわけではない。短い波を表現するには格子を細かくする必要がある。

<a id="fcg13-slope-normal"></a>

## 4. 高さから法線と反射を作る

各波の位相を $\theta_j=q_j\cdot r-\omega_jt+\phi_j$ と書く。$\eta_x=\partial\eta/\partial x$ は $y,t$ を固定した偏微分、$\eta_y=\partial\eta/\partial y$ は $x,t$ を固定した偏微分である。例えば $\partial\theta_j/\partial x=q_{jx}$ なので連鎖律から

$$
\frac{\partial}{\partial x}(a_j\cos\theta_j)
=-a_j\sin\theta_j\frac{\partial\theta_j}{\partial x}
=-a_j q_{jx}\sin\theta_j.
$$

$y$ についても $\partial\theta_j/\partial y=q_{jy}$ を用いる。有限和の項別微分により、[周期海面の波の合成](#def-fcg13-periodic-synthesis) の傾きは

$$
\eta_x=-\sum_j a_j q_{jx}\sin\theta_j,\qquad
\eta_y=-\sum_j a_j q_{jy}\sin\theta_j.
$$

連続的な複素指数の $x$ 偏微分は $\partial_x e^{iq\cdot r}=iq_xe^{iq\cdot r}$ である。従って正負の波数の係数にそれぞれ $iq_{jx}$、$-iq_{jx}$ を掛けてから剰余添字へ加算し、[離散スペクトル合成](#prop-fcg13-spectrum) と同じ逆FFTを行えば $x$ 傾きが得られる。$y$ 傾きでは $q_{jy}$ を用いる。

[折り返し](#fcg13-aliasing) がある場合、既に合算した高さ配列の添字から元の波数を復元することはできない。例えば $N=8$ で $m_x=5,-3$ は同じ剰余だが、微分の倍率はそれぞれ $i10\pi/L,-i6\pi/L$ で異なる。高さの標本が一致しても傾きは一致するとは限らない。ラボは折り返しのない帯域を使い、元の符号付き波数で係数を微分してから加算する。

面 $(x,y,\eta)$ の二つの接ベクトルは $(1,0,\eta_x)$、$(0,1,\eta_y)$ である。ベクトル $(-\eta_x,-\eta_y,1)$ と第一の接ベクトルとの内積は $-\eta_x+\eta_x=0$、第二との内積は $-\eta_y+\eta_y=0$。両接ベクトルは最初の二成分が $(1,0),(0,1)$ なので独立である。第三成分が正であるため、このベクトルは上向きの法線である。長さで割って上向き単位法線を得る。

$$
n=\frac{(-\eta_x,-\eta_y,1)}{\sqrt{1+\eta_x^2+\eta_y^2}}.
$$

例えば $\eta_x=0.75,\eta_y=0$ なら $n=(-0.6,0,0.8)$。高さだけでなく傾きも変わるため、同じ光源・視点でも水面に映る空の方向が変化する。[鏡面反射ベクトル](../../WGL/WGL13/index.md#def-wgl13-reflection) を用い、眼へ向かう単位方向 $V$（格子添字 $v$ とは別）に対し、面へ向かう入射方向を $I=-V$ と置く。反射式への代入で空を参照する方向は

$$
R=I-2(I\cdot n)n=-V+2(V\cdot n)n
$$

となる。水面反射の強さについては [Fresnel反射率](../FCG10/index.md#def-fcg10-fresnel) を参照する。小振幅の高さ場は一つの水平点に一つの高さしか持たず、巻き込む砕波や飛沫の生成は再現しない。

## 5. JS・GLSL編集ラボ：長いうねりと短い波を重ねる

<iframe src="simulation/wgl-lab.html?lesson=FCG13" title="FCG13 周期海面の波の合成と反射" loading="lazy" style="width:100%;height:1250px;border:1px solid #64748b;" allow="fullscreen"></iframe>

64 m四方を64×64点（1 m間隔）で標本化する。左は標本ごとの高さを色で示し、−1 mで濃青、+1 mで明青、範囲外は端の色にする。右は同じ高さを拡大して三角形の海面にし、同じ逆変換で求めた傾きから空の反射を描く。格子線は8 mごとに引くので、色だけでなく形の変化も読める。右の色は高さの凡例ではない。

[JavaScript](ocean.js) はスペクトルの配置・逆FFT・頂点の生成を、[頂点GLSL](ocean.vert) は投影を、[断片GLSL](ocean.frag) は簡易的な空の反射を担当する。空の色は反射方向から決めた人工的な環境で、実測の空ではない。断片GLSLは $c=\max(n\cdot V,0)$ として $f=0.02+0.98(1-c)^5$ を混合係数に使う。これは厳密な Fresnel 式の代わりの簡易近似であり、人工的な太陽光のハイライトも加える。

| 条件 | 初期値・範囲・刻み | 観察 |
|---|---|---|
| time | 2 s、0〜20 s、0.5 s | 波の位相の進み方 |
| amplitude | 0.35 m、0〜0.5 m、0.05 m | 第一波の振幅、残りは番号に反比例 |
| modeCount | 6、1〜8、1 | 合成する波の本数 |
| wavelengthScale | 1、1〜3、1 | 整数波数を倍率倍にし、波長を短くする |
| direction | 0、0〜3、1（90°単位） | 全波の方向を反時計回りに回す |

本数を1、3、8と増やす。数値詳細には個々の波長と角周波数が表示される。例えば第一波の波長64 mは倍率3なら64/3 mとなり、方向を1にすればx方向からy方向に変わる。時刻0、2、4 sで再実行し、山と反射の模様の移動を観察する。振幅0なら高さも傾きも0で平らになる。描画バッファを拡大しても物理標本数64×64は変わらない。

結果欄の「再生」は物理時刻を0.1 sずつ進める。実際の描画間隔は端末性能にも依存するため、物理時刻の増分とは別である。「一時停止」「1ステップ」「設定時刻へ戻す」で同じ波形を比較できる。自動再生は行わず、20 sで停止する。各時刻の平均高さ・最大傾斜と逆FFTと直接和との差も表示する。

WebGL2を利用できないときは、単一波・時刻0・波長64 m・振幅0.35 m・方向0について、手計算による次の標本で高さの変化を確認できる。

| x [m] | 0 | 16 | 32 | 48 | 64 |
|---|---:|---:|---:|---:|---:|
| 高さ [m] | 0.35 | 0 | −0.35 | 0 | 0.35 |
| x方向の傾き | 0 | −0.03436 | 0 | 0.03436 | 0 |

最大の倍率3でもラボで用いる整数波数の各成分の絶対値は最大15で、折り返しを避ける条件 $15<32$ を満たす。数値詳細の最大傾斜から小勾配の物理近似として読める範囲かも確認しよう。この教材は数値検算のため直接和も計算するので、実行全体の時間を逆FFT単体の速度とみなさない。

参考：[GPU Gems, Effective Water Simulation from Physical Models](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-1-effective-water-simulation-physical-models) は複数の波から形状と法線を得る実装例。[WebGL FFT Ocean](https://github.com/jbouny/fft-ocean) は周波数成分を用いるブラウザ海面描画例である。ここでは波数と周波数の対応を手計算できる決定論的な波を選ぶ。

## 6. 演習と詳細解答

### Level A

<a id="ex-fcg13-a1"></a>
**A1. 波速。** $g=10,k=0.4$ の深水重力波の角周波数、周期、位相速度、群速度を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [深水極限](../../../物理系/FLUID/FLUID27/index.md#prop-fluid27-depth-limits) で表面張力0として $\omega=\sqrt{10\cdot0.4}=2$ rad/s、[周期](../../../物理系/FLUID/FLUID27/index.md#def-fluid27-wavenumber) は $2\pi/2=\pi$ s。[位相速度](../../../物理系/FLUID/FLUID27/index.md#def-fluid27-phase-speed) は $2/0.4=5$ m/s、[群速度](../../../物理系/FLUID/FLUID28/index.md#def-fluid28-group-velocity) は $10/(2\cdot2)=2.5$ m/s。
<!-- solution-end -->

<a id="ex-fcg13-a2"></a>
**A2. 方向。** $L=20$ m、整数波数 $(3,4)$ の波数の長さ、方向、波長を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [周期海面の波の合成](#def-fcg13-periodic-synthesis) で $q=2\pi m/L$ だから

$$
q=(3\pi/10,4\pi/10),\qquad
k=\frac{\pi}{10}\sqrt{3^2+4^2}=\frac{\pi}{2}.
$$

波数の単位は rad/m。方向は $q/k=(3/5,4/5)$。[波長](../../../物理系/FLUID/FLUID27/index.md#def-fluid27-wavenumber) は $2\pi/(\pi/2)=4$ m。
<!-- solution-end -->

<a id="ex-fcg13-a3"></a>
**A3. 周期境界。** $L=12$ m、$m=(2,-1)$ で $y$ を12 m増やすと位相はどれだけ変わるか。

- Level: A

<!-- solution-start -->
**詳細解答。** [周期海面の波の合成](#def-fcg13-periodic-synthesis) で $q_y=-2\pi/12$ なので $\Delta\theta=q_y\cdot12=-2\pi$。余弦・正弦とも不変で、高さと傾きがつながる。
<!-- solution-end -->

<a id="ex-fcg13-a4"></a>
**A4. 法線。** $\eta_x=0,\eta_y=-3/4$ の上向き単位法線を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [高さ場の法線](#fcg13-slope-normal) により上向きベクトルは $(0,3/4,1)$、長さは $\sqrt{9/16+1}=5/4$。従って $n=(0,3/5,4/5)$。
<!-- solution-end -->

### Level B

<a id="ex-fcg13-b1"></a>
**B1. 二波の合成。** $L=8$ m、時刻0、初期位相0、波数整数対 $(1,0),(0,1)$、振幅0.2 mと0.1 mで、$(x,y)=(2,0)$ の高さと傾きを求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 波数は $q_1=(\pi/4,0),q_2=(0,\pi/4)$ であり、時刻0では $\theta_1=(\pi/4)\cdot2=\pi/2$、$\theta_2=(\pi/4)\cdot0=0$。[周期海面の波の合成](#def-fcg13-periodic-synthesis) から $\eta=0.2\cdot0+0.1\cdot1=0.1$ m。[傾きの式](#fcg13-slope-normal) に各成分を代入すると

$$
\eta_x=-0.2(\pi/4)\cdot1-0.1\cdot0\cdot0=-\pi/20,
$$

$$
\eta_y=-0.2\cdot0\cdot1-0.1(\pi/4)\cdot0=0.
$$
<!-- solution-end -->

<a id="ex-fcg13-b2"></a>
**B2. スペクトル。** $N=8,m=(1,0),a=2,\alpha=\pi/2$ の非零係数と $u=2$ の高さを求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [周期海面の離散スペクトル合成](#prop-fcg13-spectrum) により $C_{1,0}=i,C_{7,0}=-i$。$u=2$ では指数因子は $e^{2\pi i(1)(2)/8}=i$ と $e^{2\pi i(7)(2)/8}=e^{7\pi i/2}=-i$。従って和は $i\cdot i+(-i)(-i)=-2$ m。直接計算でも $2\cos(\pi/2+\pi/2)=-2$ m。
<!-- solution-end -->

<a id="ex-fcg13-b3"></a>
**B3. 折り返し。** $N=16$ で整数波数 $m_x=11$ と同じ空間標本になる $-8<m_x<8$ の整数を求めよ。両波を時刻発展まで同一と扱えるか。

- Level: B

<!-- solution-start -->
**詳細解答。** [折り返し](#fcg13-aliasing) により $11-16=-5$。同一の振幅・初期位相・$y$ 方向波数を仮定して比較する。格子指数の比は $e^{2\pi i16u/16}=1$。しかし $y$ 成分0なら波数の長さは $22\pi/L$ と $10\pi/L$ で異なり、$\sqrt{gk}$ も異なる。時刻0の標本が一致しても時間発展は一致しない。
<!-- solution-end -->

<a id="ex-fcg13-b4"></a>
**B4. 編集実験。** 第一波だけを選んで時刻0、振幅0.35 m、倍率1、方向0で実行する。directionを1へ変更すると原点と $(16,0)$ の高さはどうなるか。次に断片GLSLの反射の混合係数を固定すると、何が変わり何が不変か。

- Level: B

<!-- solution-start -->
**詳細解答。** [周期海面の波の合成](#def-fcg13-periodic-synthesis) から初期の波数は $(2\pi/64,0)$ なので原点で $0.35$ m、$(16,0)$ では位相 $\pi/2$ から高さ0 m。directionを1にすると波数は $(0,2\pi/64)$。両点の位相は0であり高さは共に0.35 m。高さ標本の模様も90度回転する。GLSLで `float f=0.5;` として反射の混合係数を固定すると、右側の反射と水色の配分が変わるが、左の高さ標本、頂点の高さ、逆FFTで求めた傾きは変わらない。反射だけの変更と数値状態の変更を区別できる。
<!-- solution-end -->

### Level C

<a id="ex-fcg13-c1"></a>
**C1. 合成と計算量。** $L=64$ m、$N=64$、$m=(4,0)$、振幅0.5 m、初期位相0とする。波長、角周波数、時刻0における $u=4$ の高さと $x$ 傾きを求めよ。さらに同じ格子に1024成分を直接合成する方法と逆FFTを使う方法の計算量の尺度を比較せよ。

- Level: C

<!-- solution-start -->
**詳細解答。** [周期海面の波の合成](#def-fcg13-periodic-synthesis) で波数と角周波数を求める。[波長の定義](../../../物理系/FLUID/FLUID27/index.md#def-fluid27-wavenumber) に従い $\lambda=2\pi/k$ を使う。

$$
k=2\pi\cdot4/64=\pi/8,\qquad \lambda=16\ \mathrm{m},\qquad \omega=\sqrt{g\pi/8}.
$$

$u=4$ は $x=4$ m に対応する。位相は $kx=\pi/2$ なので、高さと [傾き](#fcg13-slope-normal) は

$$
\eta=0.5\cos(\pi/2)=0,\qquad \eta_x=-0.5(\pi/8)\sin(\pi/2)=-\pi/16.
$$

$4<32$ なので [折り返しを避ける帯域](#fcg13-aliasing) に含まれる。[離散スペクトル合成](#prop-fcg13-spectrum) の係数は時刻0では $C_{4,0}=C_{60,0}=0.25$。

[FFTの段ごとの計算量](#fcg13-fft-butterfly) により直接和の項数とFFTの二方向の段処理尺度を比較すると、

$$
1024\cdot64^2=4194304,\qquad 2\cdot64^2\cdot6=49152.
$$

FFT側にはさらに1024成分を係数配列へ配置する処理 $O(1024)$ がある。実際の速度比は複素演算、メモリ転送、描画の時間にも依存するので、この数を実測速度比とはしない。
<!-- solution-end -->

## 7. 次の講義

次は水面ではなく空気中の煙を考え、温度による浮力と濃度の移流を連成する。
