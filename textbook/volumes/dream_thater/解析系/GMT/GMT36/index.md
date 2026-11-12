# GMT36 Fourier restrictionとwave packetのtube幾何

[HA11の球面Fourier拡張](../../HA/HA11/index.md#def-ha11-extension)では、曲面の小領域（cap）に集中した周波数が、細長い空間領域（tube）に波を集中させることを[Knapp型必要条件](../../HA/HA11/index.md#prop-ha11-knapp)から学びました。また[GMT35のKakeya最大作用素](../GMT35/index.md#def-gmt35-kakeya-maximal)は、全方向のtubeの重なりを集合の次元へ結び付けました。

両者は似た管を使いますが、**波は複素振幅を持って干渉する**一方、Kakeyaの管の指示関数は非負です。ここではその差を曖昧な類推にせず、曲率を持つ最小モデル「放物線」で周波数から管への式を導出します。その後、直交性で処理できる部分と、管の幾何に追加の評価を要する部分を区別します。

学習の道筋は、(1) 曲面拡張とcap、(2) 明示的なwave packet、(3) 直交性と二tube重なり、(4) Kakeyaとの接続、(5) 研究問題への読み方、です。空間変数を $x$、時間に似た第2座標を $t$ とします。両者は $\mathbb R^2$ の通常の座標であり、時間発展方程式の初期値問題を前提としません。

## 1. 曲面の拡張を計算できるモデルにする

球面では曲率のため局所的な位相は二次式になります。そこで周波数軸の点 $\xi$ を、平面内の放物線上の点 $(\xi,\xi^2)$ に写します。周波数データ $f$ の波を重ねると、位相は $x\xi+t\xi^2$ です。以下では固定した単位的正規化 $(2\pi)^{-1/2}$ を使うので、[HA11の球面拡張](../../HA/HA11/index.md#def-ha11-extension)の定数とは異なりますが、tubeの尺度と指数には影響しません。

<a id="def-gmt36-parabolic-extension"></a>

<!-- formal-statement-start -->
> **定義（放物線Fourier拡張）**  
> $f\in L^1(\mathbb R)\cap L^2(\mathbb R)$ と $(x,t)\in\mathbb R^2$ に対し、放物線Fourier拡張を次で定義する。

$$
\mathcal E f(x,t)=(2\pi)^{-1/2}\int_{\mathbb R}e^{i(x\xi+t\xi^2)}f(\xi)\,d\xi.
$$

> 各点の積分は絶対収束する。特に、コンパクト台を持つ滑らかな $f$ に対して考える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt36-parabolic-extension -->
**定義の確認。** $f=\boldsymbol1_{[0,1]}$ は $L^1\cap L^2$ に属し、$(x,t)=(0,0)$ なら $\mathcal E f(0,0)=(2\pi)^{-1/2}$。ここでは位相が1なので、積分区間の長さがそのまま出ます。反対に $f$ を零集合上だけ変えても積分は変わりません。つまりこの拡張は点ごとに周波数関数の値を読んでいるのではなく、積分によって定まります。
<!-- definition-example-end -->

初等的な[HA11のcap/tube対応](../../HA/HA11/index.md#def-ha11-cap-tube)を、この放物線でも検算します。中心周波数を $\theta$、幅を $r$ とし、$\xi=\theta+ru$ と代入すると

$$
x\xi+t\xi^2=x\theta+t\theta^2
+r(x+2\theta t)u+tr^2u^2.
$$

$|u|\le1$ の範囲で積分を考えると、$r|x+2\theta t|\lesssim1$、$r^2|t|\lesssim1$ では位相の変化が小さい。これが **幅 $r^{-1}$・長さ $r^{-2}$** の管を生む理由です。$r=R^{-1/2}$ とすれば、観測長さ $R$ に対して管の幅は $R^{1/2}$ になります。

## 2. capからwave packetを一つ実際に構成する

波をtube内に集めるため、単なるcapの指示関数ではなく、滑らかな振幅を使います。具体的には $\varphi\in C_c^\infty((-1/4,1/4))$、$\varphi\ge0$、$\|\varphi\|_2=1$、$\int\varphi(u)\,du>0$ を一つ固定します。周波数の中心 $\theta\in[-1,1]$、初期位置 $x_0\in\mathbb R$、スケール $R\ge16$ を選び、$r=R^{-1/2}$ とします。$e^{-ix_0\xi}$ は波の初期位置を $x_0$ へ移すための因子です。

<a id="def-gmt36-packet"></a>

<!-- formal-statement-start -->
> **定義（放物線の単一wave packet）**  
> 上記の $\varphi,\theta,x_0,R,r$ に対し、周波数capに支えられたデータ $f_{\theta,x_0}$ とそのwave packet $F_{\theta,x_0}$ を定める。

$$
f_{\theta,x_0}(\xi)
=r^{-1/2}\varphi\!\left(\frac{\xi-\theta}{r}\right)e^{-ix_0\xi},
\qquad
F_{\theta,x_0}=\mathcal E f_{\theta,x_0}.
$$

> capは $[\theta-r/4,\theta+r/4]$ とし、$|t|\le R$ を観測領域とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt36-packet -->
**定義の確認。** $R=100$、$\theta=0$、$x_0=3$ なら $r=1/10$ で、周波数台は $[-1/40,1/40]$。変数変換 $\xi=ru$ により

$$
\|f_{0,3}\|_2^2
=\int r^{-1}\left|\varphi(\xi/r)\right|^2d\xi
=\int|\varphi(u)|^2du=1.
$$

$t=0$ では $F_{0,3}(x,0)=r^{1/2}\Phi(r(x-3),0)$ となり、波は $x=3$ の周囲に幅10で集まります。ここで $\Phi$ は次の命題で具体的に計算します。
<!-- definition-example-end -->

<a id="prop-gmt36-packet-formula"></a>

<!-- formal-statement-start -->
> **命題（wave packetの厳密式と管への集中）**  
> [単一wave packet](#def-gmt36-packet)について、次の滑らかな関数を置く。

$$
\Phi(y,s)=(2\pi)^{-1/2}\int e^{i(yu+su^2)}\varphi(u)\,du.
$$

> そのとき、すべての $(x,t)\in\mathbb R^2$ で

$$
F_{\theta,x_0}(x,t)
=r^{1/2}e^{i((x-x_0)\theta+t\theta^2)}
\Phi\!\left(r(x-x_0+2\theta t),\,r^2t\right).
$$

> さらに、各整数 $N\ge0$ に対し $C_N$ が存在して、$|t|\le R$ なら

$$
|F_{\theta,x_0}(x,t)|
\le C_N r^{1/2}(1+r|x-x_0+2\theta t|)^{-N}.
$$

> 定数は $\varphi,N$ のみに依存し、$\theta,x_0,R$ には依存しない。また、ある $c>0$ について $|t|\le cR$ かつ $|x-x_0+2\theta t|\le cR^{1/2}$ なら $|F_{\theta,x_0}(x,t)|\ge c r^{1/2}$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

周波数を $\xi=\theta+ru$ に移すだけで位相の定数項・一次項・二次項が分かれます。横方向の急減少は、有限区間内の滑らかな振幅に対する部分積分から得ます。下界は非負な $\varphi$ の積分が正であることと $\Phi$ の連続性を使います。

<!-- proof-start -->
### 証明

定義へ $\xi=\theta+ru$、$d\xi=r\,du$ を代入します。$e^{-ix_0\xi}$ を合わせて指数を展開すると

$$
\begin{aligned}
(x-x_0)(\theta+ru)+t(\theta+ru)^2
&=(x-x_0)\theta+t\theta^2\\
&\quad+r(x-x_0+2t\theta)u+tr^2u^2.
\end{aligned}
$$

前の振幅係数 $r^{-1/2}$ とJacobian $r$ の積は $r^{1/2}$ なので、表示式が得られます。

次に $s=r^2t$ と置くと $|t|\le R=r^{-2}$ では $|s|\le1$。$a_s(u)=e^{isu^2}\varphi(u)$ と書けば、$a_s$ は固定コンパクト区間に台を持ち、$\sup_{|s|\le1}\|(1-\partial_u^2)^Na_s\|_1<\infty$ です。境界項は台の滑らかさにより零なので部分積分を $2N$ 回行えて、

$$
(1+y^2)^N\Phi(y,s)
=(2\pi)^{-1/2}\int e^{iyu}(1-\partial_u^2)^Na_s(u)\,du.
$$

従って $|\Phi(y,s)|\le C_N(1+y^2)^{-N}\le C'_N(1+|y|)^{-N}$（最後の $N$ は適宜取り直す）です。$y=r(x-x_0+2\theta t)$ を代入すれば上界を得ます。

最後に $\Phi(0,0)=(2\pi)^{-1/2}\int\varphi>0$。被積分関数は固定コンパクト台上で連続に変化し優収束で $\Phi$ は $(0,0)$ の近傍で連続です。よって十分小さい $c_0>0$ で $|y|,|s|\le c_0$ なら $|\Phi(y,s)|\ge\Phi(0,0)/2$。$|t|\le c_0R$ と $|x-x_0+2\theta t|\le c_0/r$ を選べばよいです。係数も含めて $c$ を小さく調整すると結論です。
<!-- proof-end -->

管の中心線 $x=x_0-2\theta t$ は、位相を $\xi$ で微分した条件 $(x-x_0)+2t\theta=0$ と一致します。つまり管の向きは任意に選んだものではなく、**位相の一次変化を打ち消す方向**です。$R$ を増すとcapは細くなり、横幅と縦の長さの比は $R^{-1/2}$ へ小さくなります。

## 3. wave packetを足すと何が起こるか

周波数が互いに交わらないcapの波は、各時刻の空間積分では直交します。しかし波の値そのものが点ごとに直交するわけではありません。この二つを混同すると、Kakeya幾何への橋が消えてしまいます。

<a id="prop-gmt36-slice-orthogonality"></a>

<!-- formal-statement-start -->
> **命題（空間断面でのPlancherel直交性）**  
> 有限個の $f_j\in C_c^\infty(\mathbb R)$ が互いに交わらない周波数台を持つとする。$F_j=\mathcal E f_j$ とすれば、各 $t\in\mathbb R$ について

$$
\int_{\mathbb R}\left|\sum_jF_j(x,t)\right|^2dx
=\sum_j\|f_j\|_{L^2(\mathbb R)}^2.
$$

> 特に $r$ 以上離れた中心 $\theta_j$ を持つ[単一wave packet](#def-gmt36-packet)には右辺が波の本数となる。
<!-- formal-statement-end -->

### 証明の見取り図

$t$ を固定すると $e^{it\xi^2}$ は絶対値1の乗数です。[FOU3のFourier変換](../../FOU/FOU3/index.md#def-fou3-fourier-transform)の逆変換と同様に、空間変数だけでPlancherelを適用し、交わらない台の積が零であることを使います。

<!-- proof-start -->
### 証明

$g_t(\xi)=e^{it\xi^2}\sum_j f_j(\xi)$ と置けば、定義から $\sum_jF_j(x,t)=(2\pi)^{-1/2}\int e^{ix\xi}g_t(\xi)d\xi$。[FOU4の$L^2$ Fourier変換の一意な拡張](../../FOU/FOU4/index.md#thm-fou4-l2-extension)で得られるPlancherel等式を、$(2\pi)^{-1/2}$ を付けた単位的反転に適用すると

$$
\int_{\mathbb R}\left|\sum_jF_j(x,t)\right|^2dx
=\int_{\mathbb R}|g_t(\xi)|^2d\xi
=\int_{\mathbb R}\left|\sum_j f_j(\xi)\right|^2d\xi.
$$

台の交わりが零測度なので $\int f_i\overline f_j=0$（$i\ne j$）。和の二乗を展開し、対角項だけを残すと所望の等式です。$f_j=f_{\theta_j,x_j}$ なら先の変数変換で各 $\|f_j\|_2^2=1$ と確認済みで、$\theta_i,\theta_j$ が $r$ 以上離れていれば幅 $r/2$ のcapは交わりません。
<!-- proof-end -->

直交性から $\sum_jF_j(0,0)$ の絶対値が小さいとは限りません。例えば $x_j=0$、非負な同じ $\varphi$ を用いると $F_j(0,0)=r^{1/2}\Phi(0,0)>0$ が同位相で足されます。一方、空間全体で積分すれば交差項が相殺されます。**空間断面の二乗積分と、局所的な空間時間ノルムは違う**のです。

## 4. tubeの重なりを数える側の計算

wave packetの上界は急減少であり、厳密な管の指示関数ではありません。まず幾何比較のため、各中心 $(\theta,x_0)$ に対応する硬い管を導入します。$R=r^{-2}$ として

<a id="def-gmt36-spacetime-tube"></a>

<!-- formal-statement-start -->
> **定義（放物線の時空間tube）**  
> $R\ge16$、$r=R^{-1/2}$、$\theta\in[-1,1]$、$x_0\in\mathbb R$ に対し、次の平行四辺形状の領域を考える。

$$
T_R(\theta,x_0)
=\{(x,t):|t|\le R,\ |x-x_0+2\theta t|\le R^{1/2}\}.
$$

> この管の横幅は $2R^{1/2}$、縦座標の長さは $2R$ であり、面積は $4R^{3/2}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt36-spacetime-tube -->
**定義の確認。** $\theta=0$ なら $|x-x_0|\le R^{1/2}$ という縦長の長方形です。$\theta=1/2$ なら中心線は $x=x_0-t$。どちらも各 $t$ の切片長が $2R^{1/2}$ であるため、Fubini積分により面積 $2R\cdot2R^{1/2}=4R^{3/2}$ を得ます。$t$ の範囲と横切片は管の定義のすべての条件を直接満たします。
<!-- definition-example-end -->

<a id="lem-gmt36-two-packets"></a>

<!-- formal-statement-start -->
> **補題（異なる方向の時空間tube交差）**  
> $\theta_1,\theta_2\in[-1,1]$、$x_1,x_2\in\mathbb R$、$R\ge16$、$r=R^{-1/2}$、$\alpha=|\theta_1-\theta_2|$ とする。位置 $x_1,x_2$ に依存しない定数 $C$ について

$$
|T_R(\theta_1,x_1)\cap T_R(\theta_2,x_2)|
\le C\,\frac{r^{-2}}{r+\alpha}.
$$

> 空間時間を一様に $(x,t)\mapsto(x/R,t/R)$ で縮小した管の半径は $\asymp r$、長さは $\asymp1$、交差面積の上界は $Cr^2/(r+\alpha)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

二本の中心線間の横方向距離は、$t$ の一次関数です。切片が交わる時間はその距離が管幅以下のときに限られます。その時間の長さと横切片の長さを掛けます。

<!-- proof-start -->
### 証明

時刻 $t$ における中心は $x_j-2\theta_jt$ です。二つの区間（半幅 $r^{-1}$）が交わるなら

$$
|(x_1-x_2)-2(\theta_1-\theta_2)t|\le2r^{-1}.
$$

$\alpha>0$ なら、この一次式が条件を満たす $t$ の集合は長さ高々 $2r^{-1}/\alpha$ の区間です（一次式の係数の絶対値は $2\alpha$、許容値の全幅は $4r^{-1}$）。さらに $|t|\le R$ なので時間長は高々 $\min(2R,2r^{-1}/\alpha)$。各時刻の共通横切片の長さは高々 $2r^{-1}$。よってFubiniから

$$
|T_1\cap T_2|
\le 4r^{-1}\min(R,r^{-1}/\alpha)
=4r^{-2}\min(r^{-1},\alpha^{-1})
\le 8\frac{r^{-2}}{r+\alpha}.
$$

最後は $\max(r,\alpha)\ge(r+\alpha)/2$ から従います。$\alpha=0$ の場合も共通部分は一本の管以下で、$|T_1\cap T_2|\le4r^{-3}$ は右辺の形に一致します。座標の一様縮小は2次元面積を $R^{-2}=r^4$ 倍するため、$r^4\cdot Cr^{-2}/(r+\alpha)=Cr^2/(r+\alpha)$。一方、横幅 $2r^{-1}/R=2r$、縦長 $2R/R=2$ です。
<!-- proof-end -->

この最後の式は[GMT33の二tube交差評価](../GMT33/index.md#lem-gmt33-two-tubes)と同じ尺度を持ちます。ここでは向きが $( -2\theta,1)$ に制限されますが、$\theta\in[-1,1]$ 上では方向角と $\theta$ の差は定数倍で比較できます。つまりcap中心の差が管のなす角に対応します。ただし、今証明したのは**幾何学的な管**の交差であり、振動する波の四乗積分の評価ではありません。

## 5. 直交性と重複度をつなぐ際に必要な一段

単一packetは厳密な硬い管に台を持たないので、指示関数の和へ無条件に置換できません。しかし急減少から**重み付きの重複度**なら正確に作れます。有限集合 $J$ と、それぞれ異なる $\theta_j\in[-1,1]$、初期位置 $x_j$、係数 $c_j\in\mathbb C$ を用意します。$N\ge2$ を固定し、

$$
w_j(x,t)=(1+r|x-x_j+2\theta_j t|)^{-N},
\qquad M_N(x,t)=\sum_{j\in J}w_j(x,t)
$$

とします。$M_N$ は非負の重み付き重複度です。

<a id="prop-gmt36-weighted-overlap"></a>

<!-- formal-statement-start -->
> **命題（重み付きtube重複度による点ごとの評価）**  
> 上記の有限packet族について、$|t|\le R$ の各点で

$$
\left|\sum_{j\in J}c_jF_{\theta_j,x_j}(x,t)\right|^2
\le C_Nr\,M_N(x,t)
\sum_{j\in J}|c_j|^2w_j(x,t).
$$

> 定数 $C_N$ は固定振幅 $\varphi,N$ のみに依存する。これは上界であり、逆向きの下界や一般のrestriction予想を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

packetの急減少上界を係数付きで足し、$w_j^{1/2}$ を両側に配ってCauchy–Schwarzを適用します。位相を落とすのは**上から評価する段階**だけです。

<!-- proof-start -->
### 証明

[wave packetの厳密式と管への集中](#prop-gmt36-packet-formula)により、$|F_{\theta_j,x_j}|\le C_Nr^{1/2}w_j$。三角不等式で

$$
\left|\sum_jc_jF_j\right|
\le C_Nr^{1/2}\sum_j|c_j|w_j
=C_Nr^{1/2}\sum_j(|c_j|w_j^{1/2})w_j^{1/2}.
$$

有限和にCauchy–Schwarzを適用すると

$$
\left(\sum_j|c_j|w_j\right)^2
\le\left(\sum_j|c_j|^2w_j\right)
\left(\sum_jw_j\right).
$$

最後の括弧が $M_N$ なので、係数を二乗して定理の形になります。$w_j>0$ かつ有限であるため、零除算や可算和の収束問題はありません。
<!-- proof-end -->

この上界には $M_N$ が残ります。たとえば相異なる方向から多数の管が交わる場所では $M_N$ が大きく、直交性だけでは取り除けません。逆に、$M_N$ の大きさだけを知っても振動の相殺を正確に表すわけではありません。実際、[空間断面でのPlancherel直交性](#prop-gmt36-slice-orthogonality)では局所的な重複が存在しても積分した交差項は零でした。

ここで二種類の問題が分岐します。[GMT35の最大作用素から次元への含意](../GMT35/index.md#thm-gmt35-maximal-to-hausdorff)では、非負のtube平均に対する全尺度評価からKakeya集合の次元を下から押さえました。一方、制限作用素について望ましい $L^q$ 評価を導くには、重なりに加えて位相相関、周波数分離、場合によっては別の解析的手段が要ります。**最大作用素の評価があれば、それだけで任意のrestriction評価が成立する**という逆向きの主張は、この章の証明からは出ません。

## 6. Knapp型の尺度条件をもう一度、今度は放物線で

<a id="prop-gmt36-parabolic-knapp"></a>

<!-- formal-statement-start -->
> **命題（放物線拡張のKnapp必要条件）**  
> $1<p\le\infty$、$1\le q<\infty$ とし、すべての $f\in C_c^\infty(\mathbb R)$ に同じ定数 $C$ で

$$
\|\mathcal Ef\|_{L^q(\mathbb R^2)}
\le C\|f\|_{L^p(\mathbb R)}
$$

> が成り立つと仮定する。このとき必要条件は $q\ge3p'$（$1/p+1/p'=1$）である。特に $p=2$ なら $q\ge6$ である。
<!-- formal-statement-end -->

### 証明の見取り図

幅 $r$ のcapに非負な滑らかな振幅を置くと、幅 $r^{-1}$、長さ $r^{-2}$ の領域で位相はほぼ一定です。そこでの波の大きさと領域面積を掛け、入力ノルムとの冪を比較します。

<!-- proof-start -->
### 証明

非負 $\psi\in C_c^\infty((0,1))$、$\int\psi>0$ を固定し、$0<r<1/10$ として $f_r(\xi)=\psi(\xi/r)$ と置きます。変数変換から

$$
\|f_r\|_p=r^{1/p}\|\psi\|_p
$$

です（$p=\infty$ のとき $r^{1/p}=1$）。矩形 $Q_r=\{(x,t):|x|\le c/r,\ |t|\le c/r^2\}$ を取り、$u=\xi/r\in(0,1)$ とすると $|x\xi+t\xi^2|\le2c$。$c<1/10$ とすれば実部の評価によって

$$
|\mathcal Ef_r(x,t)|
\ge(2\pi)^{-1/2}r\cos(2c)\int\psi(u)\,du
\ge c_\psi r\quad ((x,t)\in Q_r).
$$

$|Q_r|=4c^2r^{-3}$ なので

$$
\|\mathcal Ef_r\|_q\ge c_{\psi,q}r\,|Q_r|^{1/q}
=c'_{\psi,q}r^{1-3/q}.
$$

仮定の上界と組み合わせると $r^{1-3/q}\lesssim r^{1/p}$ がすべての小さい $r$ で必要です。$0<r<1$ の冪比較から $1-3/q\ge1/p$、すなわち $3/q\le1-1/p=1/p'$、ゆえに $q\ge3p'$。$p=2$ なら $p'=2$ で $q\ge6$ です。
<!-- proof-end -->

これは**必要条件だけ**で、$q=6$ における拡張評価の十分性をここから証明したわけではありません。[HA11の球面Stein–Tomas定理](../../HA/HA11/index.md#thm-ha11-stein-tomas)は別の曲面と解析族を用いて成立を証明した例です。曲面と正規化・定義域を入れ替えたのに、その結論を放物線へ無条件に移すことはできません。

## 7. どの主張が証明済みで、どこから研究問題になるか

ここまでの確定事項は、幅 $R^{-1/2}$ の周波数capから幅 $R^{1/2}$・長さ $R$ のpacketが得られること、capの分離に空間断面の直交性が対応すること、幾何管を $R$ で縮小すると半径 $\delta=R^{-1/2}$ のKakeya型tubeになること、そして重なりが追加の解析的課題として残ることです。

これに対し、一般の高次元曲面に関する最良のrestriction指数、sharpなKakeya最大作用素評価、最新の個別成果の正確な次元・仮定・endpointは、本章の単一packetモデルの結論ではありません。研究の記述では少なくとも、対象（集合・作用素・restrictionのどれか）、次元、有限尺度か極限か、指数損失、定数依存、証明済みか条件付きかを別々に確認する必要があります。

**EOM074へ進むための問い。** 個別成果を読む際は、次の順序で確認すると議論の飛躍を見付けやすくなります。(a) Fourier曲面・capの尺度を確定する。(b) どのtube幾何を使うか確認する。(c) 位相の直交性を使う段階と重複度を制御する段階を分ける。(d) 局所・多尺度・endpointの区別を明記する。(e) 結論がKakeya集合の次元、最大作用素ノルム、restrictionノルムのどれかを確認する。特に、2026年の特定研究に関するexact claimや検証状態は当該研究の原著・EOM074の個別資料で確定すべきであり、ここでは未検証の研究上の主張を定理として採用しません。

## 8. 演習：式から幾何を再構成する

### Level A：定義と尺度

<a id="ex-gmt36-a01"></a>

**問題 A01：packetの正規化。** $\|\varphi\|_2=1$、$f_{\theta,x_0}(\xi)=r^{-1/2}\varphi((\xi-\theta)/r)e^{-ix_0\xi}$ について $\|f_{\theta,x_0}\|_2=1$ を証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$|e^{-ix_0\xi}|=1$ なので $\|f_{\theta,x_0}\|_2^2=\int r^{-1}|\varphi((\xi-\theta)/r)|^2d\xi$。$u=(\xi-\theta)/r$、$d\xi=r\,du$ とすると、前の $r^{-1}$ とJacobian $r$ が打ち消され、$\int|\varphi(u)|^2du=1$。非負平方根を取れば結論です。
<!-- solution-end -->

<a id="ex-gmt36-a02"></a>

**問題 A02：中心線。** $\theta=1/2$、$x_0=3$、$R=100$ とする。packetの中心線と、$t=20$ における中心の $x$ 座標を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$r=R^{-1/2}=1/10$ です。[packet公式](#prop-gmt36-packet-formula)の横方向引数は $r(x-x_0+2\theta t)$。これを0に置くと $x=3-t$。$t=20$ では $x=-17$ です。中心を $x=3$ に固定したままにすると位相の一次項が $t$ に伴い増加するため誤りです。
<!-- solution-end -->

<a id="ex-gmt36-a03"></a>

**問題 A03：二次位相の尺度。** $R=400$、$r=R^{-1/2}$ とする。$|t|\le R$ で $|tr^2|\le1$ を検算し、波の幅と観測長さを記せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$r=1/20$、$r^2=1/400$。$|tr^2|\le400/400=1$ です。横方向の無次元量は $r(x-x_0+2\theta t)$ だから幅は $r^{-1}=20$、観測長さは $R=400$。どちらも同じ長さ400とはなりません。
<!-- solution-end -->

<a id="ex-gmt36-a04"></a>

**問題 A04：必要指数。** $\|\mathcal Ef\|_q\le C\|f\|_2$ の仮定で、幅 $r$ のcapから $q\ge6$ が必要になる計算を再現せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

非負なcap振幅 $f_r(\xi)=\psi(\xi/r)$ では $\|f_r\|_2=r^{1/2}\|\psi\|_2$。位相が小さい矩形は幅 $r^{-1}$ と縦長 $r^{-2}$ で、面積は $\asymp r^{-3}$、その内部で $|\mathcal Ef_r|\gtrsim r$。従って $\|\mathcal Ef_r\|_q\gtrsim r^{1-3/q}$。上界と比べ $1-3/q\ge1/2$、よって $3/q\le1/2$、$q\ge6$。必要性だけで十分性にはなりません。
<!-- solution-end -->

<a id="ex-gmt36-a05"></a>

**問題 A05：巨大tubeを単位tubeへ。** $R=10^4$ とする。$T_R$ を $(x,t)\mapsto(x/R,t/R)$ で縮小したときの縦方向長さと横方向全幅、面積を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$R^{1/2}=100$。元の縦方向長さは $2R=20000$、横方向全幅は $2R^{1/2}=200$、面積は $4R^{3/2}=4\cdot10^6$。それぞれ $R$、$R$、$R^2$ で割るので、縮小後は縦長2、横幅 $200/10000=0.02$、面積 $4\cdot10^6/10^8=0.04$。半径相当の尺度は $R^{-1/2}=0.01$ です。
<!-- solution-end -->

### Level B：直交性と重なりの違い

<a id="ex-gmt36-b01"></a>

**問題 B01：非定常位相による横方向減衰。** $\varphi\in C_c^\infty((-1/4,1/4))$、$|s|\le1$ のとき、$\Phi(y,s)=\int e^{iyu}e^{isu^2}\varphi(u)\,du$ が $|\Phi(y,s)|\le C(1+|y|)^{-2}$ を満たすことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$a_s(u)=e^{isu^2}\varphi(u)$ と置きます。固定コンパクト台上、$|s|\le1$ のため $a_s,a_s''$ の $L^1$ ノルムは一様に有限です。境界項は零なので二回部分積分して $-y^2\Phi(y,s)=\int e^{iyu}a_s''(u)\,du$。一方 $|\Phi|\le\|a_s\|_1$。よって $(1+y^2)|\Phi(y,s)|\le\|a_s-a_s''\|_1\le C$。$1+y^2\ge(1+|y|)^2/2$ を使い、所望の上界です。定数 $(2\pi)^{-1/2}$ を掛けても同じ結論です。
<!-- solution-end -->

<a id="ex-gmt36-b02"></a>

**問題 B02：cap分離と直交性。** 幅 $r/2$ のcapを持つ $f_1,f_2$ の中心差が $r$ 以上なら、各 $t$ に対し $\int F_1(x,t)\overline{F_2(x,t)}\,dx=0$ を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

各 $f_j$ の周波数台は中心 $\theta_j$ の左右 $r/4$ 内です。中心距離 $r$ なら二台の端点間には少なくとも $r-r/2=r/2>0$ の隙間があります。固定 $t$ でPlancherelを使えば $\int F_1\overline{F_2}\,dx=\int e^{it\xi^2}f_1(\xi)\overline{e^{it\xi^2}f_2(\xi)}\,d\xi=\int f_1\overline{f_2}\,d\xi=0$。位相因子は内積で打ち消されます。
<!-- solution-end -->

<a id="ex-gmt36-b03"></a>

**問題 B03：二本のtubeの交差面積。** $R=r^{-2}$、$\theta_1\ne\theta_2$ とする。$|T_R(\theta_1,x_1)\cap T_R(\theta_2,x_2)|\lesssim r^{-2}/(r+|\theta_1-\theta_2|)$ を示し、$\alpha=r$ と $\alpha=1$ の指数を比較せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

中心差は $(x_1-x_2)-2(\theta_1-\theta_2)t$。両切片が交わるにはその絶対値が $2r^{-1}$ 以下であり、$\alpha>0$ なら該当する $t$ の長さは高々 $2r^{-1}/\alpha$。観測窓からは長さ $2r^{-2}$ 以下なので、交差面積は $2r^{-1}$ と時間長の積以下、すなわち $Cr^{-2}/(r+\alpha)$。$\alpha=r$ なら上界 $\asymp r^{-3}$、$\alpha=1$ なら上界 $\asymp r^{-2}$。近い方向ほど長く重なります。
<!-- solution-end -->

<a id="ex-gmt36-b04"></a>

**問題 B04：点ごとの直交性という誤解。** 二つの分離capのpacketについて、各時刻の空間内積は零でも、$(0,0)$ における二つの波が同時に正の実数となり得る具体例を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

同一の非負 $\varphi$ を用いて、$x_1=x_2=0$、$\theta_1=-r$、$\theta_2=r$ と選びます。cap間の距離は $2r$ なので[直交性命題](#prop-gmt36-slice-orthogonality)の仮定を満たします。しかし[packet公式](#prop-gmt36-packet-formula)で $(x,t)=(0,0)$ とすると、両方とも $F_j(0,0)=r^{1/2}(2\pi)^{-1/2}\int\varphi(u)du>0$。従ってその点で積は正です。$x$ に関する積分では位相が変わり、交差項が相殺されます。
<!-- solution-end -->

### Level C：複数の道具をつなぐ

<a id="ex-gmt36-c01"></a>

**問題 C01：capからKakeya型tubeまで。** $R\ge16$、$r=R^{-1/2}$、互いに $r$ 以上離れた有限個の $\theta_j\in[-1,1]$ と位置 $x_j$ を考える。(1) 各packetの中心と尺度、(2) 同時刻の空間直交性、(3) 二tube交差のスケール、(4) 単位tubeへの縮小後の交差上界を一つの議論として導出せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) [packet公式](#prop-gmt36-packet-formula)に $\xi=\theta_j+ru$ を代入すると、一次位相は $r(x-x_j+2\theta_jt)u$、二次位相は $tr^2u^2$。$|t|\le R$ なら二次項は有界で、中心線 $x=x_j-2\theta_jt$、幅 $r^{-1}$ を得ます。

(2) capの幅は $r/2$、中心距離は $r$ 以上なので周波数台は交わりません。[空間断面でのPlancherel直交性](#prop-gmt36-slice-orthogonality)から各 $t$ で $\int|\sum_jF_j|^2dx=\sum_j\|f_j\|_2^2=\#J$ です。これは空間全体に関する主張です。

(3) 各管は $|x-x_j+2\theta_jt|\le r^{-1}$。二中心の差が $2r^{-1}$ 以下になる時間の長さは高々 $2r^{-1}/\alpha$、かつ観測幅 $2r^{-2}$ 以下。横切片は高々 $2r^{-1}$ なので面積は $Cr^{-2}/(r+\alpha)$ です。

(4) $(x,t)$ の両座標を $R=r^{-2}$ で割ると面積は $R^{-2}=r^4$ 倍され、上界は $Cr^2/(r+\alpha)$。横幅は $2r$、縦長は2となるため[GMT33の二tube交差](../GMT33/index.md#lem-gmt33-two-tubes)と同じ尺度です。ここから任意のrestriction評価までは結論できません。
<!-- solution-end -->

<a id="ex-gmt36-c02"></a>

**問題 C02：重複度評価の限界を説明する。** $w_j=(1+r|x-x_j+2\theta_jt|)^{-N}$、$M_N=\sum_jw_j$ とし、$\bigl|\sum_jc_jF_j\bigr|^2\le C_NrM_N\sum_j|c_j|^2w_j$ を導出せよ。次に、この式とGMT35の最大作用素からHausdorff次元への含意を比較し、結論できることと結論できないことを明確に述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

[packetの減衰評価](#prop-gmt36-packet-formula)で $|F_j|\le C_Nr^{1/2}w_j$。従って三角不等式とCauchy–Schwarzより

$$
\begin{aligned}
\left|\sum_jc_jF_j\right|^2
&\le C_Nr\left(\sum_j|c_j|w_j\right)^2\\
&=C_Nr\left(\sum_j|c_j|w_j^{1/2}w_j^{1/2}\right)^2\\
&\le C_Nr\left(\sum_j|c_j|^2w_j\right)\left(\sum_jw_j\right).
\end{aligned}
$$

最後の因子が $M_N$ です。これは複素位相を絶対値で捨てて得る**上界**なので、特別な相殺を生かす改善には別の解析が必要です。

一方、[GMT35のHausdorff次元定理](../GMT35/index.md#thm-gmt35-maximal-to-hausdorff)は、一様なKakeya最大作用素評価を**仮定**したとき、多尺度の球被覆を使って集合のHausdorff次元下界を導きます。今回の式は単一packetの振幅上界に $M_N$ を掛けたもので、全関数・全尺度についての最大作用素の有界性も、restriction不等式の十分性も証明していません。従って「packetが管状に集中する」から「sharpなrestriction評価」への飛躍はできません。確定したのはcap/tubeの尺度、分離時の空間直交性、および重なりが残る機構です。
<!-- solution-end -->

## まとめ

周波数capの幅が $R^{-1/2}$ なら、曲率の二次位相から空間のtubeは幅 $R^{1/2}$・長さ $R$ になります。capを分離すると空間断面ではPlancherel直交性が成り立ちますが、局所的にはtubeの重なりと波の干渉が残ります。Kakeya型tube評価はこの幾何を調べる道具であり、restrictionのsharpな評価と自動的に同値になるわけではありません。個別の最新結果を読む際も、関数の評価・集合の次元・条件付き含意を切り分けてください。
