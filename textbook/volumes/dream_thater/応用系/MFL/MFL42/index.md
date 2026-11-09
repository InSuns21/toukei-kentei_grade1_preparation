# MFL42 Mesh離散化・幾何数値安定性

<!-- definition-example-audit: strict -->

## 1. 正しいフレーム変更だけで正しい数値近似になるか

[MFL41の輸送付き等変層](../MFL41/index.md#thm-mfl41-layer-composition)は、有限個の頂点で局所フレームを独立に変更しても出力が正しく変換する。しかし、その層が**滑らかな曲面上のどの作用素に近づくか**、時間発展を反復しても数値が暴走しないかは、別の問いである。

例えば、輸送行列をすべて $2I_2$ に置いても、各フレームの変更に合わせて両端を変換すれば代数的な等変性は保てる。ところが、長さを二倍にする行列は平行移動ではない。距離やエネルギーを保つという数値的な根拠を失ってしまう。

本章では、一般の三角形メッシュの収束を先取りせず、**球面上の一本の緯線を等間隔に分割した周期メッシュ**に絞る。曲面上の接ベクトルが二成分を持つので、[MFL40の辺輸送](../MFL40/index.md#def-mfl40-edge-transport)を直接使える。学ぶのは次の三つの異なる判定である。

1. **等変性**：同じ有限メッシュでフレームの取り方を変え、出力が対応するか。
2. **整合性**：メッシュ幅を小さくしたとき、離散作用素が連続作用素に近づくか。これは[NA6の時間離散化で導入した整合性](../../../計算系/NA/NA6/index.md#def-na6-consistency)と同じ「刻みを縮めた際の式の一致」を問う発想である。ただし本章の空間差分では、連続作用素へ代入した差を直接評価する。
3. **安定性**：反復計算が入力の誤差を増幅しないか。

この三つは相互に代用できない。最後に、輸送行列を近似して作った場合の誤差も別に測る。

## 2. 緯線を周期メッシュにする

単位球面の余緯度 $\theta_0\in(0,\pi)$ の緯線を、経度 $t\in\mathbb R/(2\pi\mathbb Z)$ で表す。[MFL40のmoving frame](../MFL40/index.md#def-mfl40-connection-matrix)の正規直交基底 $E(t)=(e_\theta,e_\varphi)$ では、経度 $t$ に関する接続行列が $kJ$ となる。ただし $k=\cos\theta_0$、$J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ である。したがって成分列 $c(t)\in\mathbb R^2$ の経度方向の共変微分は

$$
D_tc=c'(t)+kJc(t).
$$

ここで $c'$ は経度による通常の微分である。$t$ は**弧長ではなく経度**なので、$-D_t^2$ はこの曲線に沿う共変二階作用素であり、球面全体のLaplace–Beltrami作用素とは異なる。緯線の弧長は $s=(\sin\theta_0)t$ だから、弧長の二階作用素に直すなら $(\sin\theta_0)^{-2}$ が必要になる。

頂点数 $N\ge3$ を固定し、$h=2\pi/N$、$t_i=ih$（$i=0,\ldots,N-1$）とする。添字は $N$ を法として解釈し、例えば $c_N=c_0$ とする。辺 $i+1\to i$ は経度を $-h$、辺 $i-1\to i$ は $+h$ だけ進む短い緯線弧を選び、端の継ぎ目でも同じ向きの弧を使う。

二つの隣接点の接平面からの成分を、中心点 $i$ のフレームへ輸送してから差を取る。この手順を次に定義する。$R(\alpha)=\cos\alpha I_2+\sin\alpha J$ は平面回転であり、$R(\alpha)^{-1}=R(-\alpha)$ である。

<a id="def-mfl42-covariant-mesh"></a>
<!-- formal-statement-start -->
> **定義（周期メッシュの輸送付き差分作用素）**  
> 単位球面の余緯度 $\theta_0\in(0,\pi)$ の緯線を $N\ge3$ 等分し、$k=\cos\theta_0$、$h=2\pi/N$ とする。各頂点の正規直交フレームで表した周期的二成分列 $c=(c_i)$ に対し、隣接輸送行列を

$$
T_{i,i+1}=R(kh),\qquad T_{i,i-1}=R(-kh)
$$

> と置き、正の符号の離散二階作用素を次で定める。

$$
(L_hc)_i=\frac{2c_i-T_{i,i+1}c_{i+1}-T_{i,i-1}c_{i-1}}{h^2}.
$$

> $i$ は周期的に解釈し、$T_{i+1,i}=T_{i,i+1}^{\mathsf T}$ を満たすものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl42-covariant-mesh -->
**定義の確認**：赤道では $\theta_0=\pi/2$、$k=0$ となり、両輸送が $I_2$ で、普通の周期中心差分に戻る。一方 $\theta_0=\pi/3$ では $k=1/2$。$N=4$、$h=\pi/2$、$c_{i+1}=(1,0)^{\mathsf T}$、$c_i=c_{i-1}=0$ なら、$T_{i,i+1}=R(\pi/4)$ は正規直交行列で、

$$
(L_hc)_i=-\frac{R(\pi/4)(1,0)^{\mathsf T}}{(\pi/2)^2}
=-\frac{2\sqrt2}{\pi^2}(1,1)^{\mathsf T}.
$$

> 特に近傍の値をそのまま引くのではなく、接ベクトルを到着フレームへ合わせてから引く。
<!-- definition-example-end -->

なぜ輸送の符号がこうなるのか。[MFL40の接続行列の平行移動方程式](../MFL40/index.md#thm-mfl40-connection-gauge)とその緯線計算により、$c'=-kJc$ を経度差 $\Delta t$ だけ解くと $R(-k\Delta t)$ となる。$i+1$ から $i$ への $\Delta t=-h$ を代入すると $R(kh)$、逆側は $R(-kh)$ である。

## 3. フレーム変更は誤差の大きさを変えない

次に、頂点ごとに全く独立な $S_i\in O(2)$ を選んで、同じ物理ベクトルの新成分 $\widehat c_i=S_i^{\mathsf T}c_i$ を作る。輸送も [MFL40の両端変換則](../MFL40/index.md#thm-mfl40-transport-gauge)に従い $\widehat T_{ij}=S_i^{\mathsf T}T_{ij}S_j$ とする。$S_i$ は回転でも鏡映でもよい。

<a id="thm-mfl42-discrete-gauge"></a>
<!-- formal-statement-start -->
> **定理（離散共変差分の厳密なゲージ等変性）**  
> 上の周期メッシュの $L_h$ と任意の二成分列 $c$ を取る。各頂点の $S_i\in O(2)$ に対し、入力と全辺輸送をそれぞれ $\widehat c_i=S_i^{\mathsf T}c_i$、$\widehat T_{ij}=S_i^{\mathsf T}T_{ij}S_j$ で変更して作った離散作用素を $\widehat L_h$ とすると、どの $N\ge3$、どの $i$ でも

$$
(\widehat L_h\widehat c)_i=S_i^{\mathsf T}(L_hc)_i
$$

> が正確に成立する。この結論は $h\to0$ の極限を取らずに成立する。
<!-- formal-statement-end -->

### 証明の見取り図

二つの辺で別々の $S_j$ が入るが、輸送行列の右端と入力の左端で $S_jS_j^{\mathsf T}=I_2$ が消える。残った到着側の $S_i^{\mathsf T}$ を分子の三項すべてに共通にくくり出す。

<!-- proof-start -->
### 証明

$j=i\pm1$ の各辺について、まず

$$
\widehat T_{ij}\widehat c_j
=(S_i^{\mathsf T}T_{ij}S_j)(S_j^{\mathsf T}c_j)
=S_i^{\mathsf T}T_{ij}c_j
$$

を得る。$S_jS_j^{\mathsf T}=I_2$ は直交性から従う。これを二つの近傍と中心に代入すると

$$
\begin{aligned}
(\widehat L_h\widehat c)_i
&=\frac{2S_i^{\mathsf T}c_i-S_i^{\mathsf T}T_{i,i+1}c_{i+1}-S_i^{\mathsf T}T_{i,i-1}c_{i-1}}{h^2}\\
&=S_i^{\mathsf T}(L_hc)_i.
\end{aligned}
$$

各 $i$ で成り立ち、$N$ と $h$ を動かしていない。$\square$
<!-- proof-end -->

この定理は**任意の直交した輸送行列**を正しく両端変換した場合にも成立する。したがって等変性がゼロ誤差で確認できても、その輸送行列が真の平行移動に近いとはまだ分からない。

## 4. メッシュ細分化で連続の何へ近づくか

滑らかな周期場 $c(t)$ の標本 $c_i=c(t_i)$ を考える。離散作用素の目標を $\mathcal Lc=-D_t^2c$ と定める。$D_t$ は第2節の共変微分で、連続二階作用素は次のように計算される。

$$
D_t^2c=c''+2kJc'-k^2c,
\qquad \mathcal Lc=-c''-2kJc'+k^2c.
$$

ここで $J^2=-I_2$ を用いた。輸送付きでなければ $2kJc'$ と $k^2c$ を失う。

<a id="thm-mfl42-consistency"></a>
<!-- formal-statement-start -->
> **定理（緯線の輸送付き中心差分の二次整合性）**  
> $k=\cos\theta_0$ を固定し、$c:\mathbb R\to\mathbb R^2$ を $2\pi$ 周期で四回連続微分可能とする。$L_h$ は上記の正確な緯線輸送から作り、$c_i=c(t_i)$ とする。すると各 $N\ge3$ と各頂点で

$$
\left\|(L_hc)_i-(\mathcal Lc)(t_i)\right\|
\le\frac{h^2}{12}\max_{t\in[0,2\pi]}\|D_t^4c(t)\|.
$$

> 右辺の定数は $N$ に依存しない。ここで $D_t^4$ は $D_t$ の四回合成を意味する。
<!-- formal-statement-end -->

### 証明の見取り図

近傍の値を単にTaylor展開せず、いったん**中心点へ輸送した関数**として展開する。その二階導関数が $D_t^2c$、四階導関数が $D_t^4c$ になる。左右の奇数次項が相殺する。

<!-- proof-start -->
### 証明

各中心 $t_i$ を固定して補助関数 $f_i(s)=R(ks)c(t_i+s)$（$-h\le s\le h$）を作る。$f_i(0)=c(t_i)$、$f_i(\pm h)=T_{i,i\pm1}c(t_i\pm h)$ である。ここで右端の $i-1$ は $s=-h$ と解釈する。周期性によって継ぎ目でも関数が滑らかに延長される。

積の微分で $R'(ks)$ に対応する $kJR(ks)$ が出るため、

$$
f_i'(s)=R(ks)\{c'(t_i+s)+kJc(t_i+s)\}=R(ks)D_tc(t_i+s).
$$

$J$ と $R(ks)$ は可換なので帰納的に $f_i^{(r)}(s)=R(ks)D_t^rc(t_i+s)$（$r\le4$）。特に $f_i''(0)=D_t^2c(t_i)$ で、$R(ks)$ は直交だから四階導関数のノルムは $\|D_t^4c(t_i+s)\|$ に等しい。

$s=0$ のまわりで次数3までTaylorの積分余剰を使う。$f_i(h)+f_i(-h)-2f_i(0)-h^2f_i''(0)$ の次数1と3は打ち消し合い、両側の四階剰余はそれぞれノルムが $h^4M/24$ 以下となる。ただし $M=\max_t\|D_t^4c(t)\|$。従って

$$
\left\|\frac{2f_i(0)-f_i(h)-f_i(-h)}{h^2}+f_i''(0)\right\|
\le \frac{2h^4M}{24h^2}=\frac{h^2M}{12}.
$$

左辺は定義により所望の差である。$\square$
<!-- proof-end -->

**手で分かる固有モード。** 整数 $m$ と固定 $u\in\mathbb R^2$ に対し、周期場 $c(t)=R(mt)u$ とする。$m$ が整数なので $c(t+2\pi)=c(t)$ であり、$D_tc=(m+k)Jc$ となる。

<a id="prop-mfl42-mode-error"></a>
<!-- formal-statement-start -->
> **命題（回転モードの離散固有値と誤差）**  
> $N\ge3$、$h=2\pi/N$、$k=\cos\theta_0$、$m\in\mathbb Z$、$c_i=R(mt_i)u$（$u\in\mathbb R^2$）とする。このとき $c$ は $L_h$ の固有列で、連続作用素 $\mathcal L=-D_t^2$ と比較した固有値は

$$
\lambda_h=\frac{4\sin^2((m+k)h/2)}{h^2},
\qquad \lambda=(m+k)^2
$$

> であり、すべての $h>0$ について次の誤差界を満たす。

$$
0\le\lambda-\lambda_h\le\frac{(m+k)^4h^2}{12}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

左右の輸送後の値は、それぞれ $R(\pm(m+k)h)c_i$ となる。回転行列の和が $2\cos((m+k)h)I_2$ なので、二次元の計算がスカラーの正弦二乗に帰着する。

<!-- proof-start -->
### 証明

$a=m+k$ と置くと、回転の加法則から

$$
T_{i,i+1}c_{i+1}=R(kh)R(m(t_i+h))u=R(ah)c_i,
$$

$$
T_{i,i-1}c_{i-1}=R(-kh)R(m(t_i-h))u=R(-ah)c_i.
$$

両者の和は $2\cos(ah)c_i$ だから $L_hc_i=(2-2\cos(ah))c_i/h^2$。$2-2\cos x=4\sin^2(x/2)$ が離散固有値を与える。連続側では $D_tc=aJc$、$D_t^2c=a^2J^2c=-a^2c$ なので $\mathcal Lc=a^2c$。

次に $x=|a|h/2$ とすれば $|\sin x|\le x$、$0\le x-|\sin x|\le x^3/6$（Taylorの積分余剰、または $x-\sin x=\int_0^x(1-\cos s)\,ds$ と $1-\cos s\le s^2/2$）である。したがって

$$
\begin{aligned}
\lambda-\lambda_h
&=\frac4{h^2}(x^2-\sin^2x)\\
&\le\frac4{h^2}(x-|\sin x|)(x+|\sin x|)\\
&\le\frac4{h^2}\frac{x^3}{6}(2x)
=\frac{a^4h^2}{12}.
\end{aligned}
$$

$\square$
<!-- proof-end -->

例えば $k=1/2$、$m=1$ では $\lambda=9/4$。$N$ を倍にすると、この固定モードの誤差は概ね四分の一になる。一方 $m$ を $N$ に比例して増やすと $|m+k|^4h^2$ は一様に小さくならない。低周波の整合性は、全周波数・全スペクトルの一様収束を自動的に意味しない。

## 5. 輸送を近似したときの誤差増幅

現実のメッシュでは、曲率や接続を数値積分して辺輸送を近似する。$T_{ij}$ の代わりに $\widetilde T_{ij}$ を使った作用素を $\widetilde L_h$ と呼ぶ。各辺の行列差を、長さ1の二成分に作用させた最大の出力長で測る。これを行列の作用素ノルム $\|\cdot\|_{\mathrm{op}}$ と呼ぶ。この最大差を次に定義する。

<a id="def-mfl42-transport-error"></a>
<!-- formal-statement-start -->
> **定義（辺輸送近似誤差）**  
> 上の同一周期メッシュ上の真の直交輸送行列 $T_{ij}$ と数値近似 $\widetilde T_{ij}\in\mathbb R^{2\times2}$ に対し、辺集合 $j=i\pm1$ で

$$
\delta_h=\max_{i,\,j=i\pm1}\|\widetilde T_{ij}-T_{ij}\|_{\mathrm{op}}
$$

> を定める。すべての行列が同一の始点・終点フレームで表示されているものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl42-transport-error -->
**定義の確認**：ある辺で真の輸送が $I_2$、近似輸送が $R(\varepsilon)$ なら $R(\varepsilon)^{\mathsf T}R(\varepsilon)=I_2$ で近似も長さを保つ。しかし行列差は

$$
\|R(\varepsilon)-I_2\|_{\mathrm{op}}
=2|\sin(\varepsilon/2)|.
$$

実際 $(R-I_2)^{\mathsf T}(R-I_2)=2(1-\cos\varepsilon)I_2$ だから、すべての単位ベクトルに同じ長さの差を与える。$\varepsilon\ne0$ なら正確な輸送とは異なり、等変性が保たれていてもこの差は消えない。
<!-- definition-example-end -->

<a id="thm-mfl42-transport-amplification"></a>
<!-- formal-statement-start -->
> **定理（輸送近似の離散作用素への影響）**  
> $N\ge3$ の同じ周期メッシュで作った $L_h$ と $\widetilde L_h$ が中心係数 $2I_2$ と分母 $h^2$ を共有し、辺輸送だけが上記の $\delta_h$ だけ異なるとする。任意の二成分列 $c$ について

$$
\max_i\|(\widetilde L_h-L_h)c_i\|
\le\frac{2\delta_h}{h^2}\max_j\|c_j\|.
$$

> 特に $\delta_h=O(h^p)$ なら、追加の作用素誤差は最悪で $O(h^{p-2})$ まで増幅され得る。
<!-- formal-statement-end -->

### 証明の見取り図

差を取ると中心項が消え、左右二本の辺誤差だけが残る。それぞれの行列の誤差を入力ベクトルのノルムで抑えると、分母 $h^2$ が効いてくる。

<!-- proof-start -->
### 証明

$i$ を固定して二作用素の差を分子で展開すると

$$
(\widetilde L_h-L_h)c_i
=-\frac{(\widetilde T_{i,i+1}-T_{i,i+1})c_{i+1}}{h^2}
-\frac{(\widetilde T_{i,i-1}-T_{i,i-1})c_{i-1}}{h^2}.
$$

三角不等式と $\|Av\|\le\|A\|_{\mathrm{op}}\|v\|$ を各項へ適用すると

$$
\|(\widetilde L_h-L_h)c_i\|
\le\frac{\delta_h}{h^2}(\|c_{i+1}\|+\|c_{i-1}\|)
\le\frac{2\delta_h}{h^2}\max_j\|c_j\|.
$$

最後に全 $i$ の最大を取る。$\square$
<!-- proof-end -->

この上界は左右の誤差の相殺を使わない**安全側の上界**である。特別な対称性があれば実測の収束次数はもっと高くなるが、単一の実験から一般定理と断定できない。

### 滑らかなフレーム回転を中点だけで積分すると

第2節の球面フレームを、$\psi(t)=a\sin t$（$a\in\mathbb R$）だけ回して $\widehat E(t)=E(t)R(\psi(t))$ とする。[MFL40の接続のゲージ変換則](../MFL40/index.md#thm-mfl40-connection-gauge)から、新フレームの接続行列は $\widehat A(t)=(k+a\cos t)J$ になる。辺の経度差を $\Delta=t_i-t_j$（継ぎ目では $\Delta=\pm h$ として連続延長）とすれば、正確な新輸送と、中点で接続を評価して作る輸送はそれぞれ

$$
\widehat T_{ij}=R(-k\Delta-a(\sin t_i-\sin t_j)),
$$

$$
\widehat T^{\mathrm{mid}}_{ij}
=R(-(k+a\cos((t_i+t_j)/2))\Delta).
$$

この中点近似は一辺の接続積分を中点値×幅で置き換えるものである。$\Delta=\pm h$ のとき、三角恒等式と $|\sin x-x|\le |x|^3/6$ から角度差は

$$
\begin{aligned}
|a|\,|\sin t_i-\sin t_j-\Delta\cos((t_i+t_j)/2)|
&=|a\cos((t_i+t_j)/2)|\,|2\sin(\Delta/2)-\Delta|\\
&\le\frac{|a|h^3}{24}.
\end{aligned}
$$

$\|R(\alpha)-R(\beta)\|_{\mathrm{op}}\le|\alpha-\beta|$ なので $\delta_h\le|a|h^3/24$。[輸送近似の離散作用素への影響](#thm-mfl42-transport-amplification)を適用すると、$\widehat L_h^{\mathrm{mid}}$ と**正確にフレーム変換した** $L_h$ の出力差は、入力の最大ノルムを $M_0$ として高々 $|a|hM_0/12$ である。

ここで重要な違いがある。

- すでに計算した $T_{ij}$ や $\widetilde T_{ij}$ を、[MFL40の輸送の両端変換則](../MFL40/index.md#thm-mfl40-transport-gauge)どおり $S_i^{\mathsf T}(\cdot)S_j$ と表し直すなら、その近似の精度に関係なく[離散等変性定理](#thm-mfl42-discrete-gauge)が厳密に成立する。
- 変更後の接続を別途**中点法で再積分**すると、一般に二つの計算は一致せず、$h$ を固定したままの等変性には上記の近似差が出る。

どちらも入力を回しただけなのに、算法の「辺データを共変変換する」操作と「別のフレームで数値再計算する」操作を混同してはならない。

## 6. 安定性は時間刻みの条件を要する

最後に、作用素 $L_h$ を使い、$c^{n+1}=c^n-\tau L_hc^n$ を反復して場を平滑化する。$\tau\ge0$ は時間刻みであり、$n$ は反復回数である。頂点の重み付き長さを

$$
\|c\|_h^2=h\sum_{i=0}^{N-1}\|c_i\|^2
$$

と定める。この量が各ステップで増えなければ、少なくとも入力摂動は同じ反復で増幅されない。

<a id="thm-mfl42-explicit-stability"></a>
<!-- formal-statement-start -->
> **定理（直交輸送による陽的平滑化の安定性）**  
> $N\ge3$ の周期メッシュで、各 $T_{i,i\pm1}\in O(2)$ と $T_{i+1,i}=T_{i,i+1}^{\mathsf T}$ を仮定し、$L_h$ を第2節の式で定める。$0\le\tau\le h^2/2$ なら、反復

$$
c^{n+1}=c^n-\tau L_hc^n
$$

> は任意の初期二成分列 $c^0$ について次を満たす。

$$
\|c^{n+1}\|_h\le\|c^n\|_h.
$$

> 同じ行列による二つの解の差にも同じ評価が成り立つ。$\tau>h^2/2$ では、赤道 $k=0$、偶数 $N$ に不安定な初期列が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$r=\tau/h^2$ とすると、新しい値は中心・右・左の三つの輸送済みベクトルの非負な重み付き平均になる。二乗長の凸性で一頂点ずつ評価し、直交輸送が長さを保つことを使って全頂点へ足し上げる。

<!-- proof-start -->
### 証明

$0\le r\le1/2$ と置くと

$$
c_i^{n+1}=(1-2r)c_i^n+rT_{i,i+1}c_{i+1}^n+rT_{i,i-1}c_{i-1}^n.
$$

三つの非負係数は和が1である。任意のベクトル $v_0,v_1,v_2$ と非負で総和1の係数 $p_\ell$ について

$$
\left\|\sum_{\ell=0}^2p_\ell v_\ell\right\|^2
\le\sum_{\ell=0}^2p_\ell\|v_\ell\|^2
$$

が成り立つ。実際、右辺と左辺の差は $\frac12\sum_{\ell,m}p_\ell p_m\|v_\ell-v_m\|^2\ge0$ である。これを各 $i$ に適用し、輸送の直交性 $\|T_{ij}v\|=\|v\|$ を使えば

$$
\|c_i^{n+1}\|^2\le(1-2r)\|c_i^n\|^2
+r\|c_{i+1}^n\|^2+r\|c_{i-1}^n\|^2.
$$

$i$ で和を取り、周期シフトで $\sum_i\|c_{i\pm1}^n\|^2=\sum_i\|c_i^n\|^2$ となるので、$h$ を掛けて結論を得る。二解の差は線形性により同じ反復式を満たす。

最後に赤道で偶数 $N$ の交互列 $c_i=(-1)^iu$（$u\ne0$）を取ると、隣接列はともに $-c_i$ なので $(L_hc)_i=4c_i/h^2$。一歩で $c_i^{n+1}=(1-4r)c_i^n$ となり、$r>1/2$ なら $|1-4r|>1$ で長さが増す。$\square$
<!-- proof-end -->

**直交性を失う反例。** 赤道で $T_{i,i\pm1}=2I_2$ と置き、どの頂点でも同じ $c_i=u$ とすると $(L_hc)_i=-2u/h^2$。したがって $\tau>0$ の一歩で $(1+2\tau/h^2)u$ へ増幅する。失った仮定は辺輸送の等長性であり、証明中の $\|T_{ij}v\|=\|v\|$ が使えない。ただし、この誤った辺行列ですら両端変換すれば代数的な等変性は維持できる。

## 7. 再現可能な誤差の比較

下のラボは標準Pythonのみで実行できる。$\theta_0=\pi/3$、$m=1$ の回転モードについて $N=8,16,32,64$ を倍々にし、正確な輸送の二次整合誤差、独立な回転・鏡映の等変残差、滑らかな追加フレーム回転で中点積分し直したときの差を**別々**に出力する。対照として $\tau/h^2=0.6$ の偶数赤道メッシュが不安定なことも検算する。

~~~python
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL42/mesh_transport_lab.py
# timeout-ms: 60000
# lab-preset: 誤差と等変性を比較 | --self-test
# lab-preset: 別のフレーム振幅 | --amplitude 0.5
~~~

浮動小数点で「等変残差がほぼ零」と観測することは、前節の代数的証明とは異なる証拠である。ラボの既定値以外の $m$ や $N$ によっては、丸め誤差や高周波の折り返しが支配的になる。

## 8. 演習

### Level A：定義を式に戻す

<a id="ex-mfl42-a01"></a>
**A01（赤道メッシュ）。** $\theta_0=\pi/2$、$N=4$、$h=\pi/2$ とし、$c_0=(1,0)^{\mathsf T}$、$c_1=(0,1)^{\mathsf T}$、$c_2=c_3=0$ とする。$(L_hc)_0$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $k=\cos(\pi/2)=0$ なので隣接輸送は $I_2$。添字の周期性で $c_{-1}=c_3=0$ だから

$$
(L_hc)_0=\frac{2(1,0)^{\mathsf T}-(0,1)^{\mathsf T}-0}{(\pi/2)^2}
=\frac4{\pi^2}(2,-1)^{\mathsf T}.
$$

両隣の添字と、経度刻みの二乗が分母にあることを確認した。
<!-- solution-end -->

<a id="ex-mfl42-a02"></a>
**A02（成分変換）。** 一辺の $T_{01}=I_2$、$c_1=(1,2)^{\mathsf T}$、頂点0で $S_0=R(\pi/2)$、頂点1で $S_1=I_2$ とする。$\widehat T_{01}\widehat c_1$ と $S_0^{\mathsf T}T_{01}c_1$ を計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [MFL40の両端変換則](../MFL40/index.md#thm-mfl40-transport-gauge)で $\widehat T_{01}=S_0^{\mathsf T}T_{01}S_1=R(-\pi/2)$、$\widehat c_1=(1,2)^{\mathsf T}$。よって

$$
\widehat T_{01}\widehat c_1
=\begin{pmatrix}0&1\\-1&0\end{pmatrix}\binom12
=\binom{2}{-1}=S_0^{\mathsf T}T_{01}c_1.
$$

到着側の回転だけで出力成分が変わったことを確認した。
<!-- solution-end -->

<a id="ex-mfl42-a03"></a>
**A03（固定回転モード）。** $\theta_0=\pi/3$、$m=1$、$N=8$ とする。連続の固有値と離散の固有値を三角関数で表せ。

- Level: A

<!-- solution-start -->
**詳細解答。** $k=1/2$、$h=2\pi/8=\pi/4$、$m+k=3/2$ を[回転モードの公式](#prop-mfl42-mode-error)へ代入する。

$$
\lambda=(3/2)^2=9/4,
\qquad\lambda_h=\frac{4\sin^2(3\pi/16)}{(\pi/4)^2}
=\frac{64}{\pi^2}\sin^2(3\pi/16).
$$

分母は $h^2=\pi^2/16$ なので係数は $64/\pi^2$ である。
<!-- solution-end -->

<a id="ex-mfl42-a04"></a>
**A04（安定な刻み）。** $h=1/4$ の周期メッシュで直交輸送を用いる。$\tau=1/64$ と $\tau=1/16$ のうち、[安定性定理](#thm-mfl42-explicit-stability)が非増幅を保証するのはどちらか。値を比較せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $h^2/2=(1/16)/2=1/32$ が上限である。$1/64\le1/32$ だから前者は保証範囲内。$1/16>1/32$ なので後者は保証されない。後者がすべての初期値で必ず増幅するのではなく、定理の条件を外れるという結論である。
<!-- solution-end -->

### Level B：異なる誤差を区別する

<a id="ex-mfl42-b01"></a>
**B01（輸送誤差が残る場合）。** 各辺の輸送行列のずれが $\delta_h\le Ch^3$、$\max_i\|c_i\|\le M$ と分かっている。$\widetilde L_h-L_h$ の出力誤差を評価し、$C,M$ を $h$ に依存しない定数としたときの次数を述べよ。$\delta_h\le Ch$ しかなければどうなるか。

- Level: B

<!-- solution-start -->
**詳細解答。** [輸送近似誤差の定理](#thm-mfl42-transport-amplification)に $\delta_h\le Ch^3$ を代入すれば

$$
\max_i\|(\widetilde L_h-L_h)c_i\|
\le\frac{2Ch^3}{h^2}M=2CMh=O(h).
$$

$\delta_h\le Ch$ だけなら同じ計算は $2CM/h$ という上界を与え、$h\to0$ で零に近づく保証はない。辺だけの一次精度では中心差分の $h^{-2}$ に負ける。
<!-- solution-end -->

<a id="ex-mfl42-b02"></a>
**B02（中点角度の計算）。** $\psi(t)=a\sin t$、$t_i=t_j+h$（継ぎ目は連続延長）、$h>0$ とする。$\psi(t_i)-\psi(t_j)$ と中点近似 $a h\cos((t_i+t_j)/2)$ の差を導き、その絶対値を $|a|h^3/24$ で抑えよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $b=(t_i+t_j)/2$ と置くと $t_i=b+h/2$、$t_j=b-h/2$。和差公式で

$$
\psi(t_i)-\psi(t_j)
=a\{\sin(b+h/2)-\sin(b-h/2)\}
=2a\cos b\sin(h/2).
$$

中点の式を引いた差は $a\cos b(2\sin(h/2)-h)$。$|\sin x-x|\le|x|^3/6$ に $x=h/2$ を適用すると

$$
|2\sin(h/2)-h|\le2\frac{(h/2)^3}{6}=\frac{h^3}{24},
$$

さらに $|\cos b|\le1$ なので所望の上界となる。この評価は経度差を短辺 $h$ として取ることが条件である。
<!-- solution-end -->

<a id="ex-mfl42-b03"></a>
**B03（非等長輸送の失敗）。** 赤道の周期メッシュで $T_{i,i\pm1}=2I_2$、全頂点で $c_i=u\ne0$ とし、陽的反復を一歩進めよ。なぜ第6節の安定性定理を使えないか、証明中の具体的な不等式を特定せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $2c_i-2c_{i+1}-2c_{i-1}=-2u$ であり $(L_hc)_i=-2u/h^2$。したがって

$$
c_i^{1}=u-\tau(-2u/h^2)=(1+2\tau/h^2)u.
$$

$\tau>0$ なら倍率は1より大きい。定理は $T_{ij}\in O(2)$ を要求するが、ここでは $\|(2I_2)u\|=2\|u\|$。証明で近傍を足す際に使った $\|T_{ij}v\|^2=\|v\|^2$ が破れ、三頂点の重み付き二乗和を元のノルムで抑えられない。
<!-- solution-end -->

<a id="ex-mfl42-b04"></a>
**B04（高周波と二次整合性）。** $k=0$、偶数 $N$、$m=N/2$ を取る。$c_i=R(mt_i)u=(-1)^iu$ に対する離散固有値と連続固有値の比を求め、「固定した $m$ に対して二次整合」の意味を説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $h=2\pi/N$ なので $mh=\pi$。[回転モードの式](#prop-mfl42-mode-error)より

$$
\lambda_h=\frac{4\sin^2(\pi/2)}{h^2}=\frac4{h^2},
\quad\lambda=m^2=\frac{\pi^2}{h^2},
\quad\frac{\lambda_h}{\lambda}=\frac4{\pi^2}.
$$

比は $N$ を増やしても1にならない。二次整合性定理では、同じ四回微分可能な場 $c(t)$ を保って $h\to0$ とする。今は $m=N/2$ とともに入力場を変え、その四階微分の大きさ $m^4\|u\|$ も増やしているため、固定場への評価から一様収束は言えない。
<!-- solution-end -->

### Level C：作用素・等変性・時間発展を統合

<a id="ex-mfl42-c01"></a>
**C01（一本の緯線から三種類の保証を再構成）。** $\theta_0=\pi/3$、$N\ge4$、$h=2\pi/N$、$k=1/2$ とし、周期場 $c(t)=R(t)u$（$\|u\|=1$）を標本化する。各頂点で独立な $S_i\in O(2)$ に取り替えるとき、次を示せ。

1. 正確な輸送 $T_{i,i\pm1}=R(\pm kh)$ を両端変換した $\widehat L_h$ の等変残差は零。
2. $\|(L_hc)_i-(\mathcal Lc)(t_i)\|$ の上界と、$N$ を二倍にしたときの上界の比。
3. 各辺の輸送を $\delta_h\le h^3/24$ で近似した作用素 $\widetilde L_h$ では、連続作用素からの差を三角不等式で評価せよ。
4. $\tau=h^2/4$ の陽的反復で入力摂動が増幅しない理由を述べよ。ただし第4問は近似輸送でなく正確な直交輸送を用いる。

- Level: C

<!-- solution-start -->
**詳細解答。** 第1問では [離散等変性定理](#thm-mfl42-discrete-gauge)の前提を確かめる。$S_i$ は直交、輸送は $\widehat T_{ij}=S_i^{\mathsf T}T_{ij}S_j$、入力は $\widehat c_j=S_j^{\mathsf T}c_j$ なので、各辺で $\widehat T_{ij}\widehat c_j=S_i^{\mathsf T}T_{ij}c_j$。中心項を含めて差分を取れば $\widehat L_h\widehat c_i-S_i^{\mathsf T}L_hc_i=0$。

第2問では $m+k=3/2$、$\lambda=9/4$、$\|c_i\|=1$。したがって [回転モード誤差](#prop-mfl42-mode-error)は

$$
\|(L_hc)_i-(\mathcal Lc)(t_i)\|
=|\lambda_h-\lambda|\le\frac{(3/2)^4h^2}{12}=\frac{27h^2}{64}.
$$

メッシュを二倍に細かくすると $h$ は半分なので、**この上界**は $1/4$ になる（実測誤差が厳密に四分の一とは限らない）。

第3問では [輸送近似誤差の定理](#thm-mfl42-transport-amplification)から

$$
\|(\widetilde L_h-L_h)c_i\|
\le\frac{2(h^3/24)}{h^2}\max_j\|c_j\|=\frac h{12}.
$$

よって $\widetilde L_hc_i-\mathcal Lc(t_i)=(\widetilde L_h-L_h)c_i+(L_hc_i-\mathcal Lc(t_i))$ と分解し、

$$
\max_i\|(\widetilde L_hc)_i-(\mathcal Lc)(t_i)\|
\le\frac h{12}+\frac{27h^2}{64}.
$$

この上界では輸送近似が一次項を追加するため、正確な輸送だけの二次界をそのまま主張できない。

第4問では $\tau/h^2=1/4\le1/2$。真の緯線輸送は回転で直交し、逆向き辺は転置である。[陽的平滑化の安定性定理](#thm-mfl42-explicit-stability)を二解の差に適用すれば $\|e^{n+1}\|_h\le\|e^n\|_h$。この保証は等変性の検算とも、第3問の近似作用素の精度とも異なる。
<!-- solution-end -->

## 9. ここから一般のメッシュと学習へ

緯線の周期格子では、正確な輸送付き差分の二次整合性、任意の頂点フレーム変更への厳密な等変性、陽的反復の刻み制約をそれぞれ証明できた。数値輸送の誤差は $h^{-2}$ によって増幅され得るが、計算法を両端共変に組み立てれば**近似精度と等変性を別々に管理できる**。

一般の曲面三角形メッシュでは、要素形状、面積重み、境界条件、曲率に沿った離散輸送の構成など追加仮定が必要になる。[MFL19の固有空間収束の議論](../MFL19/index.md#thm-mfl19-eigenspaces)と同様、局所差分の一致だけで固有空間や学習精度までは結論できない。次のMFL43では、分子・物理・点群の実験で「対称性」「離散化」「予測」を分けて評価する。
