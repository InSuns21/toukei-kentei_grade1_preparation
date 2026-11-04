# QCURV17 半古典Einstein方程式と蒸発のエネルギー収支

<!-- definition-example-audit: strict -->

[QCURV15の保存的な局所応力テンソル](../QCURV15/index.md#def-qcurv15-observer-measurements)から、量子状態ごとのエネルギー密度と流束を計算できるようになりました。[QCURV16の二次元模型の後期流束](../QCURV16/index.md#thm-qcurv16-hawking-flux)では、幾何と真空選択が出射流束を決める様子まで見ました。ここまでは背景計量を**固定**しています。放射がエネルギーを遠方へ運ぶなら、重力源であるブラックホールの質量はいつ、どの条件で減るのでしょうか。

この章では、量子場のくりこみ済み応力テンソルを重力の方程式へ入れる**半古典近似**を導入します。保存則とくりこみ自由度を確かめた後、灰色体因子付きの遠方光度と準静的な質量減少を導き、高階微分と蒸発終期の限界を検討します。**光度の質量依存を計算すること**と、**時間依存の結合方程式を完全に解くこと**は別の仕事です。

基本の舞台は滑らかな時間向き付き4次元Lorentz時空、計量符号 $(-,+,+,+)$。$\hbar=c=k_B=1$ とし、次元検算のため Newton 定数 $G_N>0$ は残します。この単位で $[G_N]=L^2$、$[M]=L^{-1}$、$[\omega]=L^{-1}$ です。場は自由実スカラーを基本例にし、適切なHadamard状態と保存的なくりこみ処方を選ぶものとします。重力子そのものは量子化しません。

## 1. 量子期待値を重力の右辺へ置く

古典的な[GR7のEinsteinテンソル](../../../物理系/GR/GR7/index.md#def-gr7-einstein-tensor)は $G_{ab}=R_{ab}-\tfrac12Rg_{ab}$ です。$G_{ab}$ の記号と Newton 定数 $G_N$ を混同しないでください。古典場の $T_{ab}$ をそのまま量子場に置き換えると、同一点の場の積が発散します。そこで[MICA15の保存的な点分離応力テンソル](../../../解析系/MICA/MICA15/index.md#def-mica15-renormalized-stress)が必要でした。

さらに[MICA15の局所曲率作用の変分テンソル](../../../解析系/MICA/MICA15/index.md#def-mica15-curvature-variations)は、$R^2$ と $R_{cd}R^{cd}$ の作用から得る $I_{ab}$、$J_{ab}$ です。どちらも計量に依存する局所テンソルで、**応力テンソルの状態依存部分ではありません**。この区別をつけると、有限くりこみ項を重力定数側へ吸収できる理由が分かります。

<a id="def-qcurv17-semiclassical-equation"></a>

<!-- formal-statement-start -->
> **定義（半古典Einstein方程式）**
> 滑らかな4次元Lorentz計量 $g$、定数 $G_N>0,\Lambda,\eta_I,\eta_J$、その計量上の自由場のHadamard状態 $\omega$、保存的で局所共変なくりこみ処方を指定する。重力を古典計量で、物質場を量子期待値で記述する次の連立条件を**半古典Einstein方程式**と呼ぶ。

$$
\boxed{G_{ab}[g]+\Lambda g_{ab}
+\eta_I I_{ab}[g]+\eta_J J_{ab}[g]
=8\pi G_N\langle T_{ab}[g]\rangle_{\omega,\mathrm{ren}}.}
$$

> $I,J$ は[MICA15の定義](../../../解析系/MICA/MICA15/index.md#def-mica15-curvature-variations)で固定した $2/\sqrt{|g|}$ 倍の変分テンソルを指す。$[\Lambda]=L^{-2}$、$[\eta_I]=[\eta_J]=L^2$ とする。量子場の状態、境界条件、くりこみ定数も未知の計量と整合的に選ぶ必要がある。式だけで解の存在・一意性や量子重力の完全な記述を主張しない。
<!-- formal-statement-end -->

**なぜ局所曲率項を残すか。** $R$ は長さの逆二乗、$I,J$ は曲率二乗の変分なので長さの逆四乗です。$\eta_{I,J}$ が $L^2$ を掛けると左辺の $G_{ab}$ と同じ $L^{-2}$ になります。右辺も $G_N\langle T\rangle$ が $L^2L^{-4}=L^{-2}$ です。係数 $\eta_I,\eta_J$ をゼロに固定するのは一般のくりこみ処方から自動的には従いません。

<!-- definition-example-start: def-qcurv17-semiclassical-equation -->
### 直接例：平坦真空はどの条件で解になるか

Minkowski時空の慣性座標を $x^\mu=(t,x,y,z)$ とし、座標基底 $e_\mu=\partial/\partial x^\mu$ における計量の成分 $g_{\mu\nu}=g(e_\mu,e_\nu)$ を並べます。ここで行列は**計量という双線形形式の基底表示**であり、新しい場や条件ではありません。

$
(g_{\mu\nu})=\operatorname{diag}(-1,1,1,1),\qquad
g(v,w)=-v^0w^0+\sum_{i=1}^3v^iw^i.
$

基底での行列式は $-1\ne0$ なので、$g(v,w)=0$ がすべての $w$ で成り立つなら $v=0$ です。時間方向の負符号一つと空間方向の正符号三つも確認でき、滑らかな非退化Lorentz計量という定義の条件を満たします。成分が一定だから接続係数が零となり、曲率は $R_{abcd}=R_{ab}=R=0$、従って $G_{ab}=0$ です。

$m=0$ の自由場のHadamard状態としてMinkowski真空を選び、平坦真空の $\langle T_{ab}\rangle_{\rm ren}=0$ という保存的処方を指定します。[MICA15の曲率変分の直接例](../../../解析系/MICA/MICA15/index.md#def-mica15-curvature-variations)では、曲率二乗作用の**一次変分**にも曲率因子が残るため、ここで $I_{ab}=J_{ab}=0$ と検証できます。よって半古典方程式は $\Lambda g_{ab}=0$ に帰着します。計量が非退化なので **$\Lambda=0$ のとき、かつそのときに限って**この指定の組が解です。計量、状態、処方、曲率変分、右辺、残る方程式をそれぞれ確認しました。
<!-- definition-example-end -->

### 状態の変更とくりこみ定数の変更

[MICA15の有限なくりこみ自由度](../../../解析系/MICA/MICA15/index.md#thm-mica15-finite-freedom)には、背景にだけ依存する $I_{ab},J_{ab}$ などが現れます。例えば同じ状態・計量で処方を $\langle T_{ab}\rangle' =\langle T_{ab}\rangle+cI_{ab}$ と変えたら、同じ物理方程式を保つため $\eta_I'=\eta_I+8\pi G_Nc$ と同時に変えます。実際、右辺の増分は $8\pi G_Nc I_{ab}$、左辺の増分も同じです。$c$ は工学次元を合わせた有限な定数です。これは**状態を変更して放射を増やすこと**とは違います。

## 2. 保存則は方程式の整合条件になる

Einsteinテンソルが何でもよいテンソルを源に取れないのは、[縮約Bianchi恒等式](../../../物理系/GR/GR7/index.md#thm-gr7-contracted-bianchi)で発散が零になるためです。追加した曲率項が保存的でなければ、方程式の両辺の発散が一致しません。

<a id="prop-qcurv17-conservation"></a>

<!-- formal-statement-start -->
> **命題（半古典方程式の保存整合性）**
> 4次元の滑らかなLorentz計量で、$G_N,\Lambda,\eta_I,\eta_J$ が時空上の定数であり、$I,J$ を上の局所曲率作用の変分とする。[半古典Einstein方程式](#def-qcurv17-semiclassical-equation)が成立するなら、その右辺は必ず

$$
\nabla^a\langle T_{ab}\rangle_{\omega,\mathrm{ren}}=0
$$

> を満たす。これは方程式の**必要な整合条件**であり、状態や計量の存在・一意性を保証する条件ではない。
<!-- formal-statement-end -->

### 証明の見取り図

両辺に $\nabla^a$ を作用させます。左辺の四種類の項は、縮約Bianchi恒等式・計量両立性・曲率作用の微分同相不変性によってそれぞれ消えます。$G_N$ は一定の非零数なので右辺の発散も零です。

<!-- proof-start -->
### 証明

[GR7の発散零](../../../物理系/GR/GR7/index.md#thm-gr7-einstein-divergence-free)より $\nabla^aG_{ab}=0$、計量両立性より $\nabla^ag_{ab}=0$。さらに[MICA15の曲率変分テンソルの保存命題](../../../解析系/MICA/MICA15/index.md#prop-mica15-conserved-curvature)の仮定は、滑らかな4次元Lorentz計量と $I,J$ の変分定義なので満たされます。従って

$$
\begin{aligned}
8\pi G_N\nabla^a\langle T_{ab}\rangle_{\omega,\mathrm{ren}}
&=\nabla^aG_{ab}+\Lambda\nabla^ag_{ab}\\
&\quad+\eta_I\nabla^aI_{ab}+\eta_J\nabla^aJ_{ab}\\
&=0+0+0+0=0.
\end{aligned}
$$

$G_N>0$ なので両辺を $8\pi G_N$ で割れます。これで必要性が示されました。逆向きの「保存的な任意の $T_{ab}$ は半古典方程式の解を作る」という主張はしていません。
<!-- proof-end -->

この命題から、**保存されないくりこみ処方を無条件に代入してはいけない**と分かります。反対に、保存則だけでは同じ背景でも[MICA15の状態差](../../../解析系/MICA/MICA15/index.md#thm-mica15-state-difference)が作る多様な応力テンソルを区別できません。どの状態を与えるかは追加の物理入力です。

## 3. 固定背景の光度を、ゆっくり変化する質量へ結び付ける

[QCURV12の灰色体付き遠方流束](../QCURV12/index.md#thm-qcurv12-greybody-flux)は定常Schwarzschild外部の後期波束についての式であり、[QCURV15のKilling光度の保存](../QCURV15/index.md#thm-qcurv15-luminosity-conservation)も**定常外部**での結論です。質量が変わる時空では $\partial_t$ は一般にKilling場ではありません。そこで、光が外へ出る時間より質量の変化が十分遅いと仮定し、短い時間窓で瞬間的なSchwarzschildの値を使います。

単位と記号を読み替えます。QCURV12では $G_N=1$ の幾何単位でSchwarzschildの質量パラメータを長さとして表しました。本章の $M$ はエネルギー次元 $L^{-1}$ の物理質量なので、あちらの半径尺度に対応するのは $M_{\rm geom}=G_NM$ です。したがって地平線半径は $2G_NM$、Hawking温度は $1/(8\pi G_NM)$ です。また第1・2節の $\omega$ は量子**状態**を指しましたが、以下の積分に現れる $\omega>0$ は無限遠の時刻に共役な角**周波数**です。作用対象を区別して読みます。

以下では、漸近平坦な非回転・非荷電の孤立ブラックホール、質量零・自由実スカラー一種類、外部からの入射粒子が無視できる後期のUnruh型状態を考えます。未来零無限遠で正規化した遅延時刻を $u$、そこから測る系全体の重力質量を $M(u)>0$ とします。無限遠の質量の厳密な定義と損失公式の一般証明はここでは前提とし、局所のSchwarzschild質量と無限遠の質量を**準静的近似の精度で同一視**します。[QCURV12の球面調和分解](../QCURV12/index.md#thm-qcurv12-radial-equation)で固定した $\ell$ ごとに磁気量子数は $m=-\ell,\ldots,\ell$ の $2\ell+1$ 通りあり、球対称性によって同じ透過率を持つため、光度式にこの多重度が掛かります。

<a id="def-qcurv17-quasistatic-luminosity"></a>

<!-- formal-statement-start -->
> **定義（準静的なHawking光度）**
> 上の漸近平坦・後期・準静的近似において、時間 $u$ で凍結した質量 $M=M(u)>0$ のSchwarzschild散乱透過率 $0\le\Gamma_\ell(\omega;M)\le1$ を用いる。$\omega>0$ は無限遠時刻に共役な角周波数、$\ell=0,1,\ldots$ は角運動量とし、積分と和が収束すると仮定して、無限遠へ出る正味光度を

$$
\boxed{L(M):=\frac1{2\pi}\sum_{\ell=0}^\infty(2\ell+1)
\int_0^\infty\frac{\omega\,\Gamma_\ell(\omega;M)}
{e^{8\pi G_NM\omega}-1}\,d\omega}
$$

> と定める。温度は $T_H(M)=1/(8\pi G_NM)$、外向きの光度を正とする。これは瞬間的な散乱光度の近似であり、時間依存の量子場を厳密に解いた式ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv17-quasistatic-luminosity -->
### 直接例：単一の仮想透過チャネル

周波数に依らず $\Gamma_0=1$、$\ell\ge1$ をすべて零とする**比較用模型**を置きます。$\Gamma$ の非負性・上界、収束、無限遠への外向き符号を確かめると

$$
L_{\rm toy}=\frac1{2\pi}\int_0^\infty
\frac{\omega}{e^{8\pi G_NM\omega}-1}\,d\omega
=\frac{1}{768\pi G_N^2M^2}>0.
$$

**定義の確認**として、$M>0$、$\omega>0$、$0\le\Gamma_\ell\le1$、収束と外向き光度の正値性を照合しました。積分値は次節で出発点から導きます。この模型は**実際の4次元Schwarzschild散乱の $\Gamma_0$ ではありません**。実際には[低周波s波の透過率](../QCURV12/index.md#prop-qcurv12-swave-low-frequency)が零へ近づきます。
<!-- definition-example-end -->

<a id="thm-qcurv17-luminosity-scaling"></a>

<!-- formal-statement-start -->
> **定理（質量零スカラーの準静的光度の逆二乗則）**
> [準静的なHawking光度](#def-qcurv17-quasistatic-luminosity)の仮定に加え、質量零スカラーのSchwarzschild散乱に他の長さ尺度がなく、各 $\Gamma_\ell(\omega;M)=\gamma_\ell(G_NM\omega)$ となるとする。以下の非負の和・積分が有限なら、定数 $C_s\ge0$ を用いて

$$
\boxed{L(M)=\frac{C_s}{G_N^2M^2}},\qquad
C_s=\frac1{2\pi}\sum_{\ell=0}^\infty(2\ell+1)
\int_0^\infty\frac{x\,\gamma_\ell(x)}{e^{8\pi x}-1}\,dx.
$$

> 少なくとも一つのチャネルが正の測度の周波数集合で透過するなら $C_s>0$。$C_s$ は場の種類と散乱条件に依存し、普遍的な数ではない。
<!-- formal-statement-end -->

### 証明の見取り図

Schwarzschildの半径尺度は $G_NM$ だけです。周波数はその逆数に比例するので、光度積分の $\omega\,d\omega$ から二つの逆長さが現れます。係数は灰色体因子を含む無次元積分として残ります。

<!-- proof-start -->
### 証明

[QCURV12の分離した動径方程式](../QCURV12/index.md#thm-qcurv12-radial-equation)は質量零場について $r/(G_NM)$ と $G_NM\omega$ によって無次元化できるため、仮定の $\gamma_\ell$ という形と整合します。ここではそのスケール形自体を明示的な仮定として用います。$x=G_NM\omega$ と置けば $M>0$、$G_N>0$ なので変換は単調で、端点 $0,\infty$ は保たれます。また

$$
\omega=\frac{x}{G_NM},\qquad
d\omega=\frac{dx}{G_NM},\qquad
\frac\omega{T_H}=8\pi x.
$$

従って各非負項を変数変換して

$$
\begin{aligned}
L(M)
&=\frac1{2\pi}\sum_{\ell\ge0}(2\ell+1)
\int_0^\infty
\frac{(x/G_NM)\,\gamma_\ell(x)}{e^{8\pi x}-1}
\frac{dx}{G_NM}\\
&=\frac1{G_N^2M^2}\left[\frac1{2\pi}
\sum_{\ell\ge0}(2\ell+1)
\int_0^\infty\frac{x\gamma_\ell(x)}{e^{8\pi x}-1}dx\right].
\end{aligned}
$$

非負の項についてTonelli型の単調収束で和・積分を扱え、仮定した有限性により $C_s$ は有限です。透過率が正となる領域があれば被積分関数はそこで正なので $C_s>0$ です。
<!-- proof-end -->

**二次元模型との係数の照合。** 仮想単一チャネルでは $\gamma_0=1$、他は零です。$z=8\pi x$、$1/(e^z-1)=\sum_{n\ge1}e^{-nz}$ を使うと、各項は非負なので積分交換が許されます。

$$
\begin{aligned}
C_{\rm toy}&=\frac1{2\pi(8\pi)^2}
\int_0^\infty\frac{z}{e^z-1}dz\\
&=\frac1{128\pi^3}
\sum_{n=1}^\infty\int_0^\infty ze^{-nz}dz\\
&=\frac1{128\pi^3}\sum_{n=1}^\infty\frac1{n^2}
=\frac1{768\pi}.
\end{aligned}
$$

[QCURV16の指数写像の流束](../QCURV16/index.md#thm-qcurv16-hawking-flux)も $c_{\rm CFT}=1$、$\kappa=1/(4G_NM)$ のとき $\kappa^2/(48\pi)=1/(768\pi G_N^2M^2)$ です。**係数が一致するのはこの透過率1の一方向模型だけ**で、4次元の実際の $C_s$ をこれで求めたことにはなりません。

## 4. 正の放射光度から、負の質量変化へ

無限遠へ正の光度 $L$ が出るという事実だけから、背景を静的Schwarzschildのままにして全時刻の時間発展を定義することはできません。孤立系で、無限遠からの入射や別のエネルギー損失が無視でき、重力波・束縛場エネルギー等の収支を指定しているとき、**無限遠の質量損失を $dM/du=-L$ と置く**のが次の近似です。一般の非定常時空に対するこの関係の導出そのものは、境界条件を含む重力理論の問題です。

この近似が自分自身を壊していないかは、光が地平線近くを横断する長さ尺度 $G_NM$ の間に質量がどれだけ変化するかで調べられます。

<a id="def-qcurv17-adiabatic-parameter"></a>

<!-- formal-statement-start -->
> **定義（断熱質量変化の指標）**
> $M(u)>0$ が微分可能で、無限遠時刻 $u$ に関する質量変化率 $\dot M=dM/du$ が有限であるとき、Schwarzschildの長さ尺度 $G_NM$ に対する相対質量変化の一次近似を

$$
\varepsilon_{\rm ad}(u):=
\frac{|\dot M(u)|\,G_NM(u)}{M(u)}
=G_N|\dot M(u)|
$$

> と定める。$\varepsilon_{\rm ad}\ll1$ を**準静的な質量変化の必要な目安**とする。場の相関時間、地平線近傍の正則性、曲率に対する量子重力補正の小ささまで保証する十分条件ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv17-adiabatic-parameter -->
### 直接例：質量が大きいほど変化は遅い

[前節の逆二乗光度](#thm-qcurv17-luminosity-scaling)と $\dot M=-L$ を仮定すれば

$$
\varepsilon_{\rm ad}=G_N\frac{C_s}{G_N^2M^2}
=\frac{C_s}{G_NM^2}.
$$

分子・分母は無次元で、$G_NM^2\gg C_s$ のとき指標は小さくなります。例えば $M=10^3G_N^{-1/2}$、$C_s=10^{-3}$ なら $\varepsilon_{\rm ad}=10^{-9}$ です。**定義の確認**として、正の質量、有限の変化率、次元、閾値を実際に確認しました。ただし $M\gg G_N^{-1/2}$ という**曲率の低さ**は別途必要です。
<!-- definition-example-end -->

<a id="thm-qcurv17-mass-cubic-law"></a>

<!-- formal-statement-start -->
> **定理（準静的質量減少の三乗則）**
> $G_N>0$、$C_s>0$ を定数とする。時間区間 $[u_0,u_1)$ において $M(u)>0$ が微分可能で、孤立系の無限遠質量損失が $\dot M=-L(M)$、[逆二乗光度](#thm-qcurv17-luminosity-scaling)が $L(M)=C_s/(G_N^2M^2)$ で与えられると仮定する。初期質量 $M(u_0)=M_0>0$ に対して、**近似の成立する間**

$$
\boxed{M(u)^3=M_0^3-
\frac{3C_s}{G_N^2}(u-u_0)}
$$

> が成り立つ。右辺を形式的に零と置く時刻差 $\tau_{\rm formal}=G_N^2M_0^3/(3C_s)$ は**外挿値**であって、質量零までの半古典的な予言ではない。
<!-- formal-statement-end -->

### 証明の見取り図

放射のパワーは $M^{-2}$ に比例するので、時間変化の左辺に $M^2$ を掛けると $M^3$ の微分になります。正の光度のため質量は減りますが、積分の正当性は**正の質量と一定の係数を仮定した区間**に限られます。

<!-- proof-start -->
### 証明

無限遠の収支仮定に[逆二乗光度の定理](#thm-qcurv17-luminosity-scaling)を代入して

$$
\dot M(u)=-\frac{C_s}{G_N^2M(u)^2}<0.
$$

$M(u)>0$ なので $M(u)^2$ を掛けられます。連鎖律を $M(u)^3$ に適用すると

$$
\frac{d}{du}M(u)^3=3M(u)^2\dot M(u)
=-\frac{3C_s}{G_N^2}.
$$

両辺を $u_0$ から $u<u_1$ まで積分すれば

$$
M(u)^3-M(u_0)^3
=\int_{u_0}^u-\frac{3C_s}{G_N^2}\,ds
=-\frac{3C_s}{G_N^2}(u-u_0),
$$

となります。$M(u_0)=M_0$ を代入して結論を得ます。形式的な零点は積分式から得た値ですが、その近傍では前提 $M\gg G_N^{-1/2}$ が失われます。
<!-- proof-end -->

### 収支と地平線の符号は別々に確認する

遠方へ出る $L>0$ は外向きの正エネルギーです。孤立系の質量が減る条件は $\dot M<0$。半古典的なUnruh型状態では、地平線を通る量子応力の**負のエネルギー流入**がこれと対応する、と解釈します。ただし時空全体で一つのKillingエネルギーが保存するわけではなく、正味の遠方放射から局所の全 $\langle T_{ab}\rangle$ 成分を一意に逆算することもできません。

古典的な正エネルギー物質に適用する面積増大の議論と衝突しない理由は、量子のくりこみ応力が点ごとに古典的なnullエネルギー条件を満たすとは限らないためです。単純な準静的Schwarzschild面積 $A=4\pi(2G_NM)^2=16\pi G_N^2M^2$ を微分すると

$$
\frac{dA}{du}=32\pi G_N^2M\dot M
=-\frac{32\pi C_s}{M}<0.
$$

この面積は**瞬間的なSchwarzschild半径から作った近似量**であり、非定常な事象地平線の厳密な面積をこの式だけで確定したわけではありません。[GR29の動的地平線の区別](../../../物理系/GR/GR29/index.md#prop-gr29-vaidya-separation)も参照してください。

## 5. 高階曲率項が「解を増やす」とはどういうことか

$I_{ab},J_{ab}$ は曲率を変分して作ります。曲率は計量の二階微分を含み、その変分にはさらに微分が掛かるため、半古典方程式には一般に**計量の四階微分**が現れます。二階の古典Einstein方程式と比べて追加の初期値や高周波の解がありえます。すべてが物理的な蒸発解だと結論してはいけません。

問題の仕組みを、重力とは独立の一変数線形模型で確かめます。$\ell_*>0$ を短距離尺度、$f(t)$ を与えられた滑らかな外力とし、$y(t)$ を未知関数とします。$\ell_*$ は前節の角運動量番号 $\ell$ とは別の定数です。この節のプライムはすべて変数 $t$ による常微分で、$y''=d^2y/dt^2$、$y^{(4)}=d^4y/dt^4$、$f''=d^2f/dt^2$ を表します。質量変化の $\dot M=dM/du$ とは微分変数も対象も異なります。

<a id="prop-qcurv17-order-reduction"></a>

<!-- formal-statement-start -->
> **命題（高階模型での余分な解と次数低減）**
> $\ell_*>0$ とし、実数直線上で四階常微分方程式

$$
y''-\ell_*^2y^{(4)}=f(t)
$$

> を考える。$f=0$ の解空間には $1,t,e^{t/\ell_*},e^{-t/\ell_*}$ が含まれ、実際この4関数は全斉次解空間の基底となる。$f(t)=\cos(\Omega t)$、$\Omega\ge0$ に対する、指数的斉次成分を含まない振動的な特解は

$$
y_p(t)=-\frac{\cos(\Omega t)}
{\Omega^2(1+\ell_*^2\Omega^2)}\quad(\Omega>0)
$$

> である。$z=y_p''$ に注目すると $\ell_*\Omega\ll1$ の範囲で $z=f+\ell_*^2f''+O((\ell_*\Omega)^4)$ が成り立つ。$\Omega=0$ では振動的な特解の式を用いず、$y_p=t^2/2$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

斉次解に $e^{\lambda t}$ を代入して特性方程式を得ます。外力が余分な短時間尺度を励起しない場合には、未知の $z=y''$ を二階方程式 $z-\ell_*^2z''=f$ と見て低周波展開します。

<!-- proof-start -->
### 証明

$y=e^{\lambda t}$ を斉次方程式へ代入すると

$$
\lambda^2-\ell_*^2\lambda^4
=\lambda^2(1-\ell_*^2\lambda^2)=0.
$$

零根が重複し、残りは $\lambda=\pm1/\ell_*$ です。ここで4本が単なる解の候補でなく全解を張ることも確かめます。斉次解で $z=y''$ と置けば $z-\ell_*^2z''=0$ なので、二階定係数方程式の解は $z=Ae^{t/\ell_*}+Be^{-t/\ell_*}$ です。これを二回積分すると

$
y(t)=a+bt+\ell_*^2Ae^{t/\ell_*}
+\ell_*^2Be^{-t/\ell_*}
$

となります。$a,b,A,B$ が任意だから、$1,t,e^{t/\ell_*},e^{-t/\ell_*}$ が全斉次解空間の基底です。次に $f=\cos(\Omega t)$、$\Omega>0$ とし $y_p=A\cos(\Omega t)$ を代入すると

$$
(-\Omega^2-\ell_*^2\Omega^4)A\cos(\Omega t)
=\cos(\Omega t).
$$

よって $A=-1/[\Omega^2(1+\ell_*^2\Omega^2)]$、$z=y_p''=\cos(\Omega t)/(1+\ell_*^2\Omega^2)$ です。$a=\ell_*^2\Omega^2$ と置けば恒等式 $1/(1+a)=1-a+a^2/(1+a)$ から

$$
z=(1-\ell_*^2\Omega^2)\cos(\Omega t)
+\frac{\ell_*^4\Omega^4}{1+\ell_*^2\Omega^2}\cos(\Omega t)
=f+\ell_*^2f''+O((\ell_*\Omega)^4).
$$

$\Omega=0$ の場合は $y_p=t^2/2$ から $y_p''=1$、$y_p^{(4)}=0$ と直接確かめられます。
<!-- proof-end -->

指数成長する $e^{t/\ell_*}$ があることは、**そのまま重力方程式の全解が不安定という証明ではありません**。作用の符号、境界条件、摂動次数、選ぶ解の枝を区別する必要があります。ここでは短距離尺度に依存する余分な解をそのまま信頼せず、低周波の外力に対する摂動的な**次数低減**が可能な場合を示しました。実際の半古典Einstein方程式では、くりこみ係数・状態の非局所依存・初期値制約がさらに関係します。

## 6. 演習――方程式から近似の限界まで再導出する

### Level A：定義・保存・次元

<a id="ex-qcurv17-a01"></a>
#### QCURV17-A01 方程式の各項の次元
- Level: A
- 問題: $\hbar=c=k_B=1$、$[G_N]=L^2$、$[M]=L^{-1}$ とする。4次元の半古典Einstein方程式の $G_{ab},\Lambda, I_{ab},J_{ab},\langle T_{ab}\rangle,\eta_I$ の長さ次元を求め、左辺と右辺を照合せよ。

<!-- solution-start -->
**詳細解答**：計量成分を無次元とする長さ次元で、共変微分は $L^{-1}$、曲率は二階微分を含むため $[R_{ab}]=[R]=L^{-2}$ です。[Einsteinテンソルの定義](../../../物理系/GR/GR7/index.md#def-gr7-einstein-tensor) $G_{ab}=R_{ab}-Rg_{ab}/2$ と、曲率二乗作用の変分から

$
[G_{ab}]=[\Lambda]=L^{-2},\qquad
[I_{ab}]=[J_{ab}]=L^{-4},
$

$
[\eta_I]=[\eta_J]=L^2,\qquad
[\eta_I I_{ab}]=[\eta_J J_{ab}]=L^{-2}
$

です。応力テンソルはエネルギー密度の次元なので $[\langle T_{ab}\rangle]=L^{-1}/L^3=L^{-4}$。したがって

$
[8\pi G_N\langle T_{ab}\rangle]=L^2L^{-4}=L^{-2}
$

となり、左辺4項と右辺の長さ次元が一致します。
<!-- solution-end -->

<a id="ex-qcurv17-a02"></a>
#### QCURV17-A02 保存則の四項
- Level: A
- 問題: $G_N,\Lambda,\eta_I,\eta_J$ を定数とし、$\nabla^aG_{ab}=\nabla^aI_{ab}=\nabla^aJ_{ab}=0$、$\nabla^ag_{ab}=0$ を使って、半古典方程式から $\nabla^a\langle T_{ab}\rangle=0$ を導け。$\Lambda=\Lambda(x)$ と置くとどこが変わるか。

<!-- solution-start -->
**詳細解答**：[保存整合性の命題](#prop-qcurv17-conservation)に従って両辺を共変微分し、第一添字を計量で縮約します。係数が定数で、各幾何テンソルの発散が零なので

$
8\pi G_N\nabla^a\langle T_{ab}\rangle
=0+\Lambda\cdot0+\eta_I\cdot0+\eta_J\cdot0=0.
$

$G_N>0$ で割って保存則を得ます。一方、$\Lambda(x)$ を時空点 $x$ の関数にすると、スカラーの共変微分は偏微分と一致し、積の微分から

$
\nabla^a(\Lambda g_{ab})
=(\nabla^a\Lambda)g_{ab}+\Lambda\nabla^ag_{ab}
=\partial_b\Lambda
$

が残ります。したがって同じ保存則は一般には従わず、右辺の発散を $\partial_b\Lambda/(8\pi G_N)$ と釣り合わせる追加の力学・条件が必要です。
<!-- solution-end -->

<a id="ex-qcurv17-a03"></a>
#### QCURV17-A03 光度の変数変換
- Level: A
- 問題: $M,G_N>0$、透過率 $\Gamma_\ell(\omega;M)=\gamma_\ell(G_NM\omega)$ のとき、$x=G_NM\omega$ と置いて $\omega\,d\omega$、$\omega/T_H$ を変換せよ。ただし $T_H=1/(8\pi G_NM)$。

<!-- solution-start -->
**詳細解答**：$M$ を固定した積分であり、$dx=G_NM\,d\omega$ です。したがって

$$
\omega\,d\omega=\frac{x}{G_NM}\frac{dx}{G_NM}
=\frac{x\,dx}{G_N^2M^2},\qquad
\frac\omega{T_H}=8\pi G_NM\omega=8\pi x.
$$

これを[光度の定義](#def-qcurv17-quasistatic-luminosity)へ代入すると、質量依存は $1/(G_N^2M^2)$ として積分外へ出ます。$x\in(0,\infty)$ は無次元です。
<!-- solution-end -->

<a id="ex-qcurv17-a04"></a>
#### QCURV17-A04 断熱指標と長さ尺度
- Level: A
- 問題: $\dot M=-C_s/(G_N^2M^2)$、$C_s>0$ とする。時間幅 $\Delta u=G_NM$ における一次近似の相対質量変化を求めよ。$M=10^2G_N^{-1/2}$、$C_s=10^{-2}$ の値も求めよ。

<!-- solution-start -->
**詳細解答**：$|\Delta M|\simeq|\dot M|\Delta u$ を $M$ で割ると

$$
\frac{|\Delta M|}{M}\simeq
\frac{C_s}{G_N^2M^2}\frac{G_NM}{M}
=\frac{C_s}{G_NM^2}=\varepsilon_{\rm ad}.
$$

与えられた値では $G_NM^2=10^4$ なので $\varepsilon_{\rm ad}=10^{-6}$ です。微小変化の近似を使った結果で、任意に長い時間幅に対して $\Delta M\simeq\dot M\Delta u$ を適用できるわけではありません。
<!-- solution-end -->

### Level B：近似の連結と失敗例

<a id="ex-qcurv17-b01"></a>
#### QCURV17-B01 処方を変えても同じ方程式にする
- Level: B
- 問題: $G_{ab}+\Lambda g_{ab}+\eta_I I_{ab}=8\pi G_N T_{ab}$ を考える。保存的な有限くりこみ変更 $T_{ab}'=T_{ab}+cI_{ab}$ を選んだとき、同じ計量を解にするため $\eta_I$ をどう変更するか。$c$ は定数とする。

<!-- solution-start -->
**詳細解答**：新しい右辺は $8\pi G_NT_{ab}'=8\pi G_NT_{ab}+8\pi G_NcI_{ab}$。同じ $G_{ab},g_{ab}$ を保つため新しい係数を $\eta_I'=\eta_I+8\pi G_Nc$ とすれば

$$
G_{ab}+\Lambda g_{ab}+\eta_I'I_{ab}
=8\pi G_NT_{ab}+8\pi G_NcI_{ab}
=8\pi G_NT_{ab}'.
$$

これは[MICA15の有限項](../../../解析系/MICA/MICA15/index.md#thm-mica15-finite-freedom)の再配分であり、同じ計量上の量子状態を別の励起状態に変えたわけではありません。$c$ が時空依存なら保存性の条件も再検討が必要です。
<!-- solution-end -->

<a id="ex-qcurv17-b02"></a>
#### QCURV17-B02 一チャネル光度と二次元模型
- Level: B
- 問題: $\Gamma_0=1$、$\Gamma_{\ell\ge1}=0$ とする仮想モデルで $L$ を計算せよ。$\int_0^\infty z/(e^z-1)\,dz=\pi^2/6$ は使ってよい。$\kappa=1/(4G_NM)$ とする[QCURV16の二次元流束](../QCURV16/index.md#thm-qcurv16-hawking-flux)と比較し、4次元の現実の光度だと言えるか論じよ。

<!-- solution-start -->
**詳細解答**：[光度の定義](#def-qcurv17-quasistatic-luminosity)に単一チャネルを代入し、$z=8\pi G_NM\omega$ と置くと

$$
\begin{aligned}
L&=\frac1{2\pi}\int_0^\infty\frac{\omega}{e^{8\pi G_NM\omega}-1}d\omega\\
&=\frac1{2\pi(8\pi G_NM)^2}\int_0^\infty\frac{z}{e^z-1}dz\\
&=\frac1{2\pi(8\pi G_NM)^2}\frac{\pi^2}{6}
=\frac1{768\pi G_N^2M^2}.
\end{aligned}
$$

一方 $\kappa^2/(48\pi)=1/(16G_N^2M^2\cdot48\pi)$ で同じ値です。しかし実Schwarzschildの[低周波透過率](../QCURV12/index.md#prop-qcurv12-swave-low-frequency)は $\Gamma_0\to0$ であり、高次角運動量も持つため、この係数をそのまま物理的な4次元総光度にはできません。
<!-- solution-end -->

<a id="ex-qcurv17-b03"></a>
#### QCURV17-B03 高階模型の余分な解
- Level: B
- 問題: $y''-\ell_*^2y^{(4)}=\cos(\Omega t)$（$\ell_*,\Omega>0$）を考える。(a) 斉次解の4成分を求めよ。(b) 振動的特解 $y_p=A\cos(\Omega t)$ の $A$ を求めよ。(c) $z=y_p''$ を $\ell_*^2\Omega^2$ の一次まで展開せよ。

<!-- solution-start -->
**詳細解答**：(a) $e^{\lambda t}$ から $\lambda^2(1-\ell_*^2\lambda^2)=0$。零根は二重で、根 $\pm1/\ell_*$ と合わせ $1,t,e^{t/\ell_*},e^{-t/\ell_*}$ が基底です。

(b) $y_p''=-A\Omega^2\cos(\Omega t)$、$y_p^{(4)}=A\Omega^4\cos(\Omega t)$ なので $(-\Omega^2-\ell_*^2\Omega^4)A=1$、従って $A=-1/[\Omega^2(1+\ell_*^2\Omega^2)]$。

(c) $z=\cos(\Omega t)/(1+\ell_*^2\Omega^2)$ です。$a=\ell_*^2\Omega^2$ とすると $1/(1+a)=1-a+a^2/(1+a)$ なので $z=(1-\ell_*^2\Omega^2)\cos(\Omega t)+O((\ell_*\Omega)^4)$。$f''=-\Omega^2f$ だから $z=f+\ell_*^2f''+O((\ell_*\Omega)^4)$ とも書けます。[高階模型の命題](#prop-qcurv17-order-reduction)を別の順序で再導出しました。
<!-- solution-end -->

<a id="ex-qcurv17-b04"></a>
#### QCURV17-B04 独立な場の種類を増やす
- Level: B
- 問題: 同じ $M,G_N$ に対して相互作用しない質量零スカラー $N\in\mathbb N$ 種があり、各種の散乱係数が同じ正定数 $C_s$ とする。入射なし・準静的な独立放射のもとで総光度、質量の三乗則、初期質量 $M_0$ に対する形式的寿命、断熱指標を求めよ。$N$ を増やせばいつでも近似が改善するか。

<!-- solution-start -->
**詳細解答**：独立な場のエネルギー期待値は足し合わせられるので、[逆二乗光度の定理](#thm-qcurv17-luminosity-scaling)を各種に適用すると $L_N=N C_s/(G_N^2M^2)$。質量収支は $\dot M=-N C_s/(G_N^2M^2)$ です。$3M^2$ を掛けて積分し

$$
M(u)^3=M_0^3-\frac{3NC_s}{G_N^2}(u-u_0),
\qquad \tau_{N,\rm formal}=\frac{G_N^2M_0^3}{3NC_s}.
$$

断熱指標は $\varepsilon_{\rm ad}=G_N|\dot M|=NC_s/(G_NM^2)$ です。$N$ を増やすほど光度は増え、形式的寿命は短く、断熱指標は大きくなります。$NC_s\ll G_NM^2$ が失われれば、**種類を増やすほど**むしろ凍結背景近似は悪化します。
<!-- solution-end -->

### Level C：独立した近似を一つの収支へ統合する

<a id="ex-qcurv17-c01"></a>
#### QCURV17-C01 蒸発模型の成立条件を自分で判定する
- Level: C
- 問題: $G_N>0$、$C_s>0$、初期質量 $M_0>0$ とし、質量零自由場の後期準静的なSchwarzschild模型に次の関係を課す。

$$
L=\frac{C_s}{G_N^2M^2},\qquad \dot M=-L.
$$

  - (a) 時刻 $u$ における質量 $M(u)$ を求めよ。
  - (b) $M=M_0/2$ までにかかる時間を求めよ。
  - (c) 近似面積 $A=16\pi G_N^2M^2$ の時間微分と符号を求めよ。
  - (d) 断熱指標と低曲率条件を書き、形式的な質量零時刻を蒸発完了と断言できない理由を二つ以上述べよ。
  - (e) 無限遠への正の光度から地平線近傍の $\langle T_{ab}\rangle$ を一意に得られるか。

<!-- solution-start -->
**詳細解答**：(a) 質量損失と光度から $M^2\dot M=-C_s/G_N^2$。$d(M^3)/du=3M^2\dot M$ なので、初期時刻 $u_0$ について

$$
M(u)=\left[M_0^3-\frac{3C_s}{G_N^2}(u-u_0)\right]^{1/3}
$$

です。角括弧が正で、準静的近似が成立する区間に限ります。

(b) $M^3=M_0^3/8$ と置くと

$$
u_{1/2}-u_0=\frac{G_N^2}{3C_s}
\left(M_0^3-\frac{M_0^3}{8}\right)
=\frac{7G_N^2M_0^3}{24C_s}.
$$

これは形式的寿命 $\tau_{\rm formal}=G_N^2M_0^3/(3C_s)$ の $7/8$ です。

(c) 連鎖律で $\dot A=32\pi G_N^2M\dot M=-32\pi C_s/M<0$。この $A$ はその瞬間のSchwarzschild半径を用いた近似面積であり、真の動的事象地平線との同一視は追加仮定です。

(d) $\varepsilon_{\rm ad}=C_s/(G_NM^2)\ll1$ は時間変化の目安であり、さらに $G_NM^2\gg1$（Planck質量より十分重いこと）を要求します。質量を零へ外挿すると両者が失われうること、後期以外の波束・相互作用・状態の変化・高階曲率項が無視できない可能性があることから、零点は厳密な終期予測ではありません。

(e) 不可。遠方の光度は球面積分した一つの成分の情報であり、地平線近傍の応力テンソル全成分、状態依存の相関、非定常な重力場の応答はこれだけから一意には決まりません。[QCURV15のKilling光度](../QCURV15/index.md#def-qcurv15-killing-luminosity)も定常性を仮定した別の量です。
<!-- solution-end -->

## 7. どこまで導出でき、何がまだ残るか

1. **保存の整合性**：量子期待値を源へ置くには、局所共変で保存的な処方と曲率の有限項が必要です。条件を満たしても、結合した計量と量子状態を自動的に解けるわけではありません。
2. **光度と収支**：固定背景のHawking放射と灰色体散乱を短時間ごとに使えば、限定された模型で $L\propto M^{-2}$ と $M^3$ の減少を得ます。この計算は温度、透過率、無限遠のエネルギー保存、準静的な状態の選択を入力とします。
3. **適用範囲**：$M\gg G_N^{-1/2}$、$\varepsilon_{\rm ad}\ll1$、適切な入射状態と時間尺度という条件は別々に点検します。高階微分の余分な解、時間依存の地平線、量子揺らぎ、蒸発終期はこの計算から確定しません。

この範囲を超える問い――外部の短距離物理がHawking過程をどの程度変えるか、情報がどのように残るか――には、別の仮定と理論が必要です。今得た三乗則だけから情報問題を解決したり、蒸発後の時空を予言したりはできません。
