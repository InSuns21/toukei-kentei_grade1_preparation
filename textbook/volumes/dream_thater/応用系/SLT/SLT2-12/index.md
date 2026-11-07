# SLT2-12 幅極限と学習時間の極限

[前章の学習後Gaussian極限](../SLT2-11/index.md#thm-slt2-11-trained-gp)は、学習時刻 $t$ を**固定してから**幅 $m$ を無限大にした。一方、実際に補間へ到達するかを問うときは、学習時間を際限なく延ばしたい。二つの操作を逆順にしても同じ答えになるだろうか。

ここには落とし穴がある。[二層網の有限時間NTK近似](../SLT2-10/index.md#thm-slt2-10-finite-time-flow)の誤差定数は、許した時間窓 $T$ に依存する。「任意の固定 $T$ で小さい」は「すべての $t\ge0$ で一様に小さい」と同じではない。長時間まで保証するには、残差が減衰する速さと、それに伴って**ニューロンが動かなくなる速さ**を同時に評価する必要がある。

本章の到達目標は次の五つである。

1. 固定時間収束、時間一様収束、反復極限を異なる主張として定式化する。
2. 核の誤差が予測の誤差へ伝わる積分式を導く。
3. 正のNTK固有値下界を使い、学習時間に依存しない核変動界を証明する。
4. 訓練残差の単調性だけで言える長時間の確率評価を見分ける。
5. 固有値が零へ近づく反例と、NNGP分布の長時間極限を計算する。

## 1. 何の順序を交換したいのか

訓練点の個数 $n$ と教師 $y\in\mathbb R^n$ を固定する。幅 $m\ge1$ の学習曲線を $F_m(t)\in\mathbb R^n$、残差を $e_m(t)=F_m(t)-y$ とする。対応する固定核を $K_\infty\in\mathbb R^{n\times n}$ とし、**同じ幅のランダム初期残差**から出発する比較曲線を

$$
e_{\infty,m}(t)=e^{-tK_\infty}e_m(0)
$$

と置く。ここで $K_\infty$ は[有限入力の無限幅NTK](../SLT2-10/index.md#def-slt2-10-infinite-width-ntk)で定義した初期接線Gram行列の期待値であり、$e^{-tK_\infty}$ はその行列指数である。$e_m(0)$ は一般に幅とともに確定値へ収束しない。[NNGPの初期Gaussian極限](../SLT2-11/index.md#thm-slt2-11-initial-gp)が教えるのは通常、**分布収束**である。したがって比較では初期値を勝手に零へ置き換えない。

固定した各時刻についての近似と、全時刻をまとめた近似は違う。また二重極限を議論するには、それぞれの反復極限が存在するかも確認する必要がある。

<a id="def-slt2-12-limit-orders"></a>

<!-- formal-statement-start -->
> **定義（幅・時間の反復極限と時間一様近似）**
> ノルム空間内の確定的な曲線 $g_m:[0,\infty)\to V$ に対し、幅を先に取る反復極限と時間を先に取る反復極限とは、存在するときそれぞれ

$$
L_{m\to\infty,\,t\to\infty}
=\lim_{t\to\infty}\left(\lim_{m\to\infty}g_m(t)\right),
\qquad
L_{t\to\infty,\,m\to\infty}
=\lim_{m\to\infty}\left(\lim_{t\to\infty}g_m(t)\right)
$$

> を指す。これらは一般に異なる。二曲線 $e_m,e_{\infty,m}$ に対し、各固定 $T<\infty$ で

$$
\sup_{0\le t\le T}\|e_m(t)-e_{\infty,m}(t)\|\to0
$$

> を**有限時間一様近似**、これを $T$ に依存しない全時間の上限

$$
\sup_{t\ge0}\|e_m(t)-e_{\infty,m}(t)\|\to0
$$

> へ強めたものを**時間一様近似**と呼ぶ。確率的な曲線では、上記の収束をどの確率収束様式で主張するかを別途指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-12-limit-orders -->
**定義の確認**。$g_m(t)=e^{-t/m}\in\mathbb R$ とする。各有限 $m$ では $\lim_{t\to\infty}g_m(t)=0$ だが、各固定 $t$ では $\lim_{m\to\infty}g_m(t)=1$。したがって

$$
L_{m\to\infty,\,t\to\infty}=1,
\qquad L_{t\to\infty,\,m\to\infty}=0.
$$

さらに比較曲線を $g_\infty(t)=1$ とすると、$0\le t\le T$ では

$$
0\le1-e^{-t/m}\le t/m\le T/m\to0,
$$

なのに $\sup_{t\ge0}|g_m(t)-g_\infty(t)|=1$ である。有限時間一様近似の条件を直接満たし、時間一様近似の条件を直接破る例になっている。
<!-- definition-example-end -->

この一変数の例は固定核の勾配流 $\dot g_m=-(1/m)g_m$ でもある。幅が増すほど最小固有値が零へ近づき、緩やかなモードが長く残る。後で二点の模型にして確認する。

## 2. 誤差を時間積分で測る

[接線Gram行列](../SLT2-08/index.md#def-slt2-08-ntk)は $K_m(t)=J_m(t)J_m(t)^{\mathsf T}$ である。$J_m(t)=D_\theta F_m(\theta(t))$ は、各訓練点の予測を全パラメータで偏微分したJacobianである。任意の $v\in\mathbb R^n$ について

$
v^{\mathsf T}K_m(t)v
=v^{\mathsf T}J_m(t)J_m(t)^{\mathsf T}v
=\|J_m(t)^{\mathsf T}v\|_2^2\ge0
$

だから $K_m(t)\succeq0$ と判定できる。[前章までの固定核スペクトル解](../SLT2-09/index.md#thm-slt2-09-continuous-spectrum)では、この行列を固有基底で対角化して減衰率を読む。$\dot e_m=de_m/dt$ は学習時刻 $t$ に関する全微分であり、$D_\theta$ はパラメータに関する微分なので区別する。全パラメータのEuclid勾配流・二乗損失 $\|F_m-y\|_2^2/2$ では、[固定核と動く核の比較式](../SLT2-10/index.md#thm-slt2-10-finite-time-flow)の出発点として

$$
\dot e_m(t)=-K_m(t)e_m(t),\qquad
\frac{d}{dt}\frac12\|e_m(t)\|_2^2
=-e_m(t)^{\mathsf T}K_m(t)e_m(t)\le0
$$

が成立する。ここでは損失を $n$ で割らない。$K_m(t)$ は対称正半定値で時間について連続、$K_\infty$ も対称正半定値とする。

核のずれを $\varepsilon_T=\sup_{0\le s\le T}\|K_m(s)-K_\infty\|_{\mathrm{op}}$ と測ろう。$K_\infty$ の最小固有値に正の下界があれば、過去の核のずれは指数的に忘れられる。これが単純な $T\varepsilon_T$ 評価を改善する理由である。

<a id="thm-slt2-12-finite-horizon"></a>

<!-- formal-statement-start -->
> **定理（有限時間のスペクトル付き核誤差界）**
> $T>0$、$B\ge0$ とする。$K_\infty\in\mathbb R^{n\times n}$ は対称正半定値、$K_m:[0,T]\to\mathbb R^{n\times n}$ は連続な対称正半定値行列値関数で、$\dot e_m=-K_m e_m$、$\|e_m(0)\|_2\le B$ とする。比較残差を $e_{\infty,m}(t)=e^{-tK_\infty}e_m(0)$、核誤差を $\varepsilon_T=\sup_{s\le T}\|K_m(s)-K_\infty\|_{\mathrm{op}}$ とすると、すべての $0\le t\le T$ で

$$
\|e_m(t)-e_{\infty,m}(t)\|_2\le B\varepsilon_T t.
$$

> さらに最小固有値が $\lambda_{\min}(K_\infty)\ge\lambda>0$ なら、より強く

$$
\|e_m(t)-e_{\infty,m}(t)\|_2
\le\frac{B\varepsilon_T}{\lambda}(1-e^{-\lambda t})
\le\frac{B\varepsilon_T}{\lambda}.
$$

> 後者にも $\varepsilon_T$ 自体が $T$ に依存しうることに注意する。
<!-- formal-statement-end -->

### 証明の見取り図

二曲線の差は、核の摂動を固定核の行列指数で運ぶ変分定数公式に従う。正の最小固有値は、その運搬作用素のノルムを $e^{-\lambda(t-s)}$ で抑える。

<!-- proof-start -->
### 証明

$d(t)=e_m(t)-e_{\infty,m}(t)$ と置く。$e_{\infty,m}'=-K_\infty e_{\infty,m}$ より

$$
\dot d(t)=-K_\infty d(t)
-(K_m(t)-K_\infty)e_m(t),\qquad d(0)=0.
$$

$K_\infty$ は時間に依存しないので、左から $e^{tK_\infty}$ を掛けた積の微分で $-K_\infty d$ の項が相殺される。$0$ から $t$ へ積分し、左から $e^{-tK_\infty}$ を掛け直せば

$$
d(t)=-\int_0^t e^{-(t-s)K_\infty}
(K_m(s)-K_\infty)e_m(s)\,ds.
$$

$K_m\succeq0$ なので $\|e_m(s)\|_2\le B$。対称行列の[固定核スペクトル解](../SLT2-09/index.md#thm-slt2-09-continuous-spectrum)を $K_\infty$ に適用すると、指数行列の作用素ノルムは最小固有値を $\lambda_0$ として $e^{-\lambda_0(t-s)}$。$\lambda_0\ge0$ なら高々1、$\lambda_0\ge\lambda>0$ なら高々 $e^{-\lambda(t-s)}$ である。従って

$$
\begin{aligned}
\|d(t)\|_2
&\le\varepsilon_T B\int_0^t
\|e^{-(t-s)K_\infty}\|_{\mathrm{op}}\,ds\\
&\le\varepsilon_T Bt,
\end{aligned}
$$

かつ $\lambda>0$ の場合は $\int_0^t e^{-\lambda(t-s)}ds=(1-e^{-\lambda t})/\lambda$ である。$\square$
<!-- proof-end -->

例えば $K_\infty=(2)$、$K_m=(2+1/m)$、$e_m(0)=1$ なら差は $e^{-2t}(1-e^{-t/m})$。実際に $0\le1-e^{-t/m}\le t/m$ だから差は有限時間で $O(T/m)$ となる。定理はさらに全ての時間窓で $\varepsilon_T=1/m$ と分かる場合、$1/(2m)$ の一様上界を与える。

[前章の有限時間核固定界](../SLT2-10/index.md#thm-slt2-10-finite-time-drift)は $\varepsilon_T\le\|K_m(0)-K_\infty\|_{\mathrm{op}}+C_{K,T}(B)/\sqrt m$ を与える。しかし $C_{K,T}(B)$ は $T$ とともに増えうる。したがって、今の定理の右辺に固定した $T$ を代入しただけでは $T\to\infty$ を通せない。

## 3. 正のギャップがニューロンの移動を止める

ここで前々章の[二層網模型](../SLT2-10/index.md#def-slt2-10-infinite-width-ntk)に戻る。固定訓練入力 $x_1,\ldots,x_n\in\mathbb R^d$ に対して、バイアスを含めた入力を $\xi(x)=(x^{\mathsf T},1)^{\mathsf T}\in\mathbb R^{d+1}$、$\xi_i=\xi(x_i)$、$R=\max_i\|\xi_i\|_2$ とする。各ニューロンの出力係数を $a_r\in\mathbb R$、重みとバイアスをまとめたベクトルを $q_r\in\mathbb R^{d+1}$ とし、

$$
f_m(x;\theta)=\frac1{\sqrt m}\sum_{r=1}^m
a_r\sigma(q_r^{\mathsf T}\xi(x))
$$

を全ての $a_r,q_r$ について勾配流で学習する。仮定を具体的に固定する。

- $\sigma\in C^2(\mathbb R)$ で全実数上 $|\sigma|\le M_0$、$|\sigma'|\le M_1$、$|\sigma''|\le M_2$。
- 初期出力係数は $|a_r(0)|\le A$。初期組 $(a_r(0),q_r(0))$ はニューロン間で独立同分布、$a_r(0)$ と $q_r(0)$ は独立、$\mathbb Ea_r(0)=0$。
- 訓練点数・入力・教師は幅から独立。$K_\infty=\mathbb E K_m(0)$ の最小固有値は $\lambda>0$ 以上。

最後の条件は非常に強い。**固定した有限個の訓練点について**、どの残差方向にも極限接線核が正の感度を持つという条件である。正半定値だけでは不足する。

残差が $e^{-\lambda t/2}$ の速さで減ると仮定すれば、その時間積分は $2/\lambda$ 以下になる。各ニューロンの速度には $1/\sqrt m$ が付いているため、移動総量を時間に依存せず $O(m^{-1/2})$ で抑えられる。その移動から核がほとんど変わらないことを示して、最初に仮定した残差減衰を正当化する。これが **bootstrap（仮の下界からより強い下界を得る議論）** である。

<a id="thm-slt2-12-uniform-time"></a>

<!-- formal-statement-start -->
> **定理（正ギャップ下の時間一様NTK近似）**
> 上記の固定有限入力・有界 $C^2$ 活性化・$1/\sqrt m$ 二層網・全パラメータEuclid勾配流・二乗損失の仮定を満たし、$K_\infty\succeq\lambda I_n$（$\lambda>0$）とする。初期化の一つの実現値について

$$
\|e_m(0)\|_2\le B,\qquad
\|K_m(0)-K_\infty\|_{\mathrm{op}}\le\delta
$$

> が成り立つとする（$B\ge0$、$\delta\ge0$）。次の定数を、この順に幅と時間には依存せず定める。

$$
\begin{aligned}
U_a&=\frac{2\sqrt n M_0B}{\lambda},
& A_*&=A+U_a,\\
U_q&=\frac{2\sqrt n A_*M_1RB}{\lambda},\\
C_*&=n\left[
(2M_0M_1R+2A_*^2M_1M_2R^3)U_q
+2A_*M_1^2R^2U_a
\right].
\end{aligned}
$$

> さらに $m\ge1$ が $\delta\le\lambda/8$、$C_*/\sqrt m\le\lambda/8$ を満たすなら、勾配流はすべての $t\ge0$ で存在し、次が成立する。

$$
\begin{aligned}
K_m(t)&\succeq\frac{\lambda}{2}I_n,\\
\|e_m(t)\|_2&\le B e^{-\lambda t/2},\\
\sup_{t\ge0}\|K_m(t)-K_\infty\|_{\mathrm{op}}
&\le\varepsilon_m:=\delta+C_*/\sqrt m.
\end{aligned}
$$

> 初期残差を共有する固定核曲線 $e_{\infty,m}(t)=e^{-tK_\infty}e_m(0)$ との誤差は、全 $t\ge0$ に対して

$$
\begin{aligned}
\|e_m(t)-e_{\infty,m}(t)\|_2
&\le\frac{2B\varepsilon_m}{\lambda}
\left(e^{-\lambda t/2}-e^{-\lambda t}\right),\\
\sup_{t\ge0}\|e_m(t)-e_{\infty,m}(t)\|_2
&\le\frac{B\varepsilon_m}{2\lambda}.
\end{aligned}
$$

> とくにこの初期化事象上では $F_m(t)\to y$、$y+e_{\infty,m}(t)\to y$ が $t\to\infty$ で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

正ギャップの半分 $\lambda/2$ を暫定的な核の下界として残差を指数減衰させる。残差の**全時間積分**が有限になるので、各ニューロンの係数と重みの総移動量が有限になり、核の初期値からのずれも小さい。その結果、核の下界は半分より実際には大きい $3\lambda/4$ へ改善する。最後に[有限時間のスペクトル付き核誤差界](#thm-slt2-12-finite-horizon)の積分を、減衰する残差でもう一度評価する。

<!-- proof-start -->
### 証明

初期核は $\lambda_{\min}(K_m(0))\ge\lambda-\delta\ge7\lambda/8$。パラメータについて $C^1$ な勾配流の右辺は局所Lipschitzなので、有限次元の常微分方程式には局所解が存在する。まず $K_m(s)\succeq(\lambda/2)I_n$ が $0\le s\le t$ で成立する区間を考える。残差方程式へこの下界を適用して

$$
\frac d{ds}\|e_m(s)\|_2^2
=-2e_m(s)^{\mathsf T}K_m(s)e_m(s)
\le-\lambda\|e_m(s)\|_2^2.
$$

$e_m=0$ の時刻以降は残差方程式の一意性で零のままである。それ以外では両辺を積分して

$$
\|e_m(s)\|_2\le B e^{-\lambda s/2},
\qquad
\int_0^t\|e_m(s)\|_2\,ds\le\frac{2B}{\lambda}.
$$

ニューロンごとの[勾配式](../SLT2-10/index.md#thm-slt2-10-finite-time-drift)にCauchy–Schwarzを使うと

$$
|\dot a_r(s)|\le\frac{\sqrt n M_0}{\sqrt m}\|e_m(s)\|_2,
\qquad
\|\dot q_r(s)\|_2
\le\frac{\sqrt n |a_r(s)|M_1R}{\sqrt m}\|e_m(s)\|_2.
$$

一番目を積分して $|a_r(t)-a_r(0)|\le U_a/\sqrt m$。$m\ge1$ より $|a_r(t)|\le A+U_a=A_*$ が全区間で成立する。これを二番目へ代入し、もう一度残差積分を使えば

$$
\|q_r(t)-q_r(0)\|_2
\le\frac{\sqrt n A_*M_1R}{\sqrt m}
\int_0^t\|e_m(s)\|_2ds
\le\frac{U_q}{\sqrt m}.
$$

核の各成分は $K_{m,ij}(t)=m^{-1}\sum_r h_{ij}(a_r(t),q_r(t))$ である。[初期NTKの定義](../SLT2-10/index.md#def-slt2-10-infinite-width-ntk)から、$z_i=q^{\mathsf T}\xi_i$ と書けば

$
h_{ij}(a,q)=\sigma(z_i)\sigma(z_j)
+a^2\sigma'(z_i)\sigma'(z_j)\xi_i^{\mathsf T}\xi_j
$

となる。これはJacobianの出力係数方向と重み方向の内積を足した成分表示である。時刻 $t$ と初期時刻 $0$ で $z_i$ の差は $|z_i(t)-z_i(0)|\le R\|q_r(t)-q_r(0)\|_2$。そこで積の差を $uv-\widetilde u\widetilde v=(u-\widetilde u)v+\widetilde u(v-\widetilde v)$ と分け、$|\sigma'|\le M_1$、$|\sigma''|\le M_2$ を使って各因子へ平均値の定理を適用する。[有限時間核固定界の証明](../SLT2-10/index.md#thm-slt2-10-finite-time-drift)と同じ計算を、今得た時間非依存の $A_*,U_a,U_q$ に適用すると、任意の $i,j$ で

$$
\begin{aligned}
|h_{ij}(a_r(t),q_r(t))-h_{ij}(a_r(0),q_r(0))|
&\le(2M_0M_1R+2A_*^2M_1M_2R^3)\frac{U_q}{\sqrt m}\\
&\quad+2A_*M_1^2R^2\frac{U_a}{\sqrt m}.
\end{aligned}
$$

ここでは $|q_r(t)^{\mathsf T}\xi_i-q_r(0)^{\mathsf T}\xi_i|\le R U_q/\sqrt m$ と $|a_r(t)^2-a_r(0)^2|\le2A_*U_a/\sqrt m$ をそれぞれ使った。$r$ の平均を取り、$n^2$ 成分のFrobeniusノルムを作用素ノルムの上界にすると

$$
\|K_m(t)-K_m(0)\|_{\mathrm{op}}\le C_*/\sqrt m.
$$

したがって、上の暫定区間の全時刻で

$$
\lambda_{\min}(K_m(t))
\ge\lambda-\delta-C_*/\sqrt m
\ge\frac{3\lambda}{4}>\frac{\lambda}{2}.
$$

初期の $7\lambda/8$ から連続に変化する最小固有値が、初めて $\lambda/2$ に達する時刻は存在できない。ゆえに暫定区間はすべての存在時間へ延長できる。

有限時刻で最大解が終了する可能性もない。上で各 $|a_r(t)|\le A_*$、$\|q_r(t)-q_r(0)\|_2\le U_q/\sqrt m$ を得たため、有限個の全パラメータは初期値のまわりの有界閉集合に留まる。[ODE8の最大解延長判定](../../../解析系/ODE/ODE8/index.md#thm-ode8-continuation)をこの有限次元の滑らかな勾配ベクトル場へ適用すると、有限時刻での爆発は不可能である。したがって解は $[0,\infty)$ に存在し、核下界と残差減衰・核誤差界が全時刻で成立する。

最後に[差の積分表示](#thm-slt2-12-finite-horizon)へ $\|K_m(s)-K_\infty\|\le\varepsilon_m$、$\|e_m(s)\|\le B e^{-\lambda s/2}$、$\|e^{-(t-s)K_\infty}\|\le e^{-\lambda(t-s)}$ を代入する。

$$
\begin{aligned}
\|e_m(t)-e_{\infty,m}(t)\|_2
&\le B\varepsilon_m\int_0^t
e^{-\lambda(t-s)}e^{-\lambda s/2}\,ds\\
&=B\varepsilon_m e^{-\lambda t}
\int_0^t e^{\lambda s/2}\,ds\\
&=\frac{2B\varepsilon_m}{\lambda}
(e^{-\lambda t/2}-e^{-\lambda t}).
\end{aligned}
$$

$u=e^{-\lambda t/2}\in[0,1]$ とすれば $u-u^2=1/4-(u-1/2)^2\le1/4$。上限は $B\varepsilon_m/(2\lambda)$、かつ両残差は $t\to\infty$ で零となる。$\square$
<!-- proof-end -->

**何が改善されたか。** 有限時間の $C_{K,T}(B)$ の代わりに、固有値下界 $\lambda$ を用いた**時間に依存しない $C_*$** が現れた。$\lambda$ が小さいと $U_a,U_q,C_*$ が大きくなり、要求する幅は急増する。この定理は「任意の深層網が無限時間までNTK的」という主張ではない。固定有限入力・有界な二階微分・二層網・十分大きい幅・正ギャップに限定している。

### 初期化乱数について何が言えるか

$H=M_0^2+A^2M_1^2R^2$、$Q=nA^2M_0^2+\|y\|_2^2$ と置く。[初期NTK集中](../SLT2-10/index.md#thm-slt2-10-initial-concentration)および同章の初期残差二乗モーメントから

$$
\mathbb P(\|e_m(0)\|_2>B)\le Q/B^2,
\qquad
\mathbb P(\|K_m(0)-K_\infty\|_{\mathrm{op}}>\delta)
\le\frac{n^2H^2}{m\delta^2}.
$$

任意の固定 $B>0$ を選ぶと、$C_*(B)$ は幅に依存しない。$\delta_m=m^{-1/4}$ を選べば、十分大きい幅で $\delta_m\le\lambda/8$、$C_*(B)/\sqrt m\le\lambda/8$ となる。このとき少なくとも

$$
1-\frac{Q}{B^2}-\frac{n^2H^2}{\sqrt m}
$$

の確率で、全時間の誤差は $B(\delta_m+C_*(B)/\sqrt m)/(2\lambda)$ 以下になる。まず $B$ を大きくして $Q/B^2$ を小さくし、次に幅を増やせば、**全時間における同一初期値の固定核近似が確率収束する**。この順序を逆にして、$B$ を幅と無関係な有限値に固定したまま確率1を主張してはいけない。

## 4. 残差の単調性だけでも言えること

時間一様な核近似のためには前節の細かい移動評価が要る。しかし**訓練残差が長時間で小さくなる**ことだけなら、[有限時間NTK近似](../SLT2-10/index.md#thm-slt2-10-finite-time-flow)と残差ノルムの単調性で、もっと短く証明できる。前節の強い結論と区別する。

<a id="prop-slt2-12-residual-tail"></a>

<!-- formal-statement-start -->
> **命題（単調な残差による長時間の確率評価）**
> 固定した $n$ と訓練入力について、各幅 $m$ の連続勾配流の残差が $\dot e_m=-K_m(t)e_m$、$K_m(t)\succeq0$ を満たすとする。$\sup_m\mathbb E\|e_m(0)\|_2^2\le Q<\infty$ とし、決定論的な $K_\infty\succeq\lambda I_n$（$\lambda>0$）について、任意の固定 $t$ で

$$
\|e_m(t)-e^{-tK_\infty}e_m(0)\|_2
\xrightarrow{p}0
$$

> と仮定する。すると任意の $\eta>0$ に対して

$$
\lim_{t\to\infty}\limsup_{m\to\infty}
\mathbb P\!\left(\sup_{s\ge t}\|e_m(s)\|_2>\eta\right)=0.
$$

> この主張は $\sup_{s\ge0}\|K_m(s)-K_\infty\|\to0$ を含まず、各有限幅で必ず $e_m(t)\to0$ という断言でもない。
<!-- formal-statement-end -->

### 証明の見取り図

残差ノルムは増えないので、遅い時刻の残差は時刻 $t$ だけを調べればよい。固定 $t$ の幅極限を先に評価し、最後に $e^{-\lambda t}$ を零へ近づける。

<!-- proof-start -->
### 証明

$K_m(t)\succeq0$ だから残差エネルギーの微分は非正であり、全 $s\ge t$ で $\|e_m(s)\|_2\le\|e_m(t)\|_2$ となる。三角不等式により、$\|e_m(t)\|_2>\eta$ が起きるなら

$$
\|e_m(t)-e^{-tK_\infty}e_m(0)\|_2>\eta/2
$$

または $\|e^{-tK_\infty}e_m(0)\|_2>\eta/2$ の少なくとも一方が起きる。後者では $\|e^{-tK_\infty}\|_{\mathrm{op}}\le e^{-\lambda t}$ なので、[Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を初期残差の二乗へ適用し

$$
\begin{aligned}
\mathbb P\left(\sup_{s\ge t}\|e_m(s)\|_2>\eta\right)
&\le\mathbb P\left(
\|e_m(t)-e^{-tK_\infty}e_m(0)\|_2>\eta/2\right)\\
&\quad+\mathbb P\left(\|e_m(0)\|_2>\eta e^{\lambda t}/2\right)\\
&\le\mathbb P\left(
\|e_m(t)-e^{-tK_\infty}e_m(0)\|_2>\eta/2\right)
+\frac{4Q e^{-2\lambda t}}{\eta^2}.
\end{aligned}
$$

固定 $t$ で $m\to\infty$ とすれば仮定により第一項は零へ向かう。残る上界を $t\to\infty$ とすれば零になる。$\square$
<!-- proof-end -->

この命題は、固定核曲線とのずれそのものを時間全域で小さくしたわけではない。単調性という**目的量に固有の構造**で、遅い時刻の訓練残差だけを評価したものである。予測を評価する点が訓練集合の外なら、同じ単調性は自動では得られない。

## 5. 小さい固有値が極限の順序を壊す

次は核が**最初から時間に依存しない**例である。それでも極限交換に失敗するため、原因を「訓練で核が動くから」とだけ考えるのは誤りである。

訓練点二個の対角Gram行列と初期残差を

$$
K_m=\begin{pmatrix}1&0\\0&1/m\end{pmatrix},
\quad K_\infty=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\quad e_m(0)=\begin{pmatrix}1\\1\end{pmatrix}
$$

とする。どの $m$ でも $K_m$ は正定値であり、$K_m\to K_\infty$ は作用素ノルムで成立する。しかし[固定核のスペクトル解](../SLT2-09/index.md#thm-slt2-09-continuous-spectrum)を二つの標準基底に適用すると

$$
e_m(t)=\begin{pmatrix}e^{-t}\\e^{-t/m}\end{pmatrix},
\qquad
e_\infty(t)=\begin{pmatrix}e^{-t}\\1\end{pmatrix}.
$$

したがって

$$
\begin{aligned}
\lim_{t\to\infty}\lim_{m\to\infty}e_m(t)
&=\begin{pmatrix}0\\1\end{pmatrix},\\
\lim_{m\to\infty}\lim_{t\to\infty}e_m(t)
&=\begin{pmatrix}0\\0\end{pmatrix}.
\end{aligned}
$$

各固定 $T$ では二曲線の差は $1-e^{-t/m}\le T/m$ だが、$\sup_{t\ge0}\|e_m(t)-e_\infty(t)\|_2=1$。時間を幅に合わせて $t=cm$（$c>0$）と選べば第二成分は常に $e^{-c}$ である。**時間尺度 $m$ が、固定時間の収束では見えない。**

この二点模型は対称正半定値の**固定核勾配流**としての反例であり、前節の正ギャップ条件を破る。これだけから、同じ行列族が前節の独立初期化された二層網の学習中NTKとして実現できると主張しない。大切なのは論理的な違いである。

## 6. 長時間のGaussian分布には何が残るか

最後に[SLT2-11の学習後Gaussian極限](../SLT2-11/index.md#thm-slt2-11-trained-gp)へ戻る。無限幅を先に取ったとき、$H_X(t)=y+e^{-t\Theta}(G_X-y)$ であり、$G_X$ の共分散はNNGP核 $\Sigma$、減衰率はNTK核 $\Theta$ が決める。$\Theta$ が特異なら、零固有値方向では指数が減衰しない。

<a id="prop-slt2-12-gaussian-projection"></a>

<!-- formal-statement-start -->
> **命題（学習後Gaussian極限の零固有空間への射影）**
> 固定有限入力上の平均零Gaussianベクトル $G_X\sim N_n(0,\Sigma)$、対称正半定値NTK行列 $\Theta\in\mathbb R^{n\times n}$、教師 $y\in\mathbb R^n$ を考える。$P_0$ を $\ker\Theta$ への直交射影とする。有限時間のGaussian学習曲線

$$
H_X(t)=y+e^{-t\Theta}(G_X-y)
$$

> は、同じ $G_X$ 上でほとんど確実に、したがって分布でも次へ収束する。

$$
H_X(\infty)=(I-P_0)y+P_0G_X.
$$

> 極限の平均と共分散はそれぞれ

$$
\mathbb EH_X(\infty)=(I-P_0)y,
\qquad
\operatorname{Cov}(H_X(\infty))=P_0\Sigma P_0.
$$

> 特に $\Theta$ が正定値なら $P_0=0$ で極限は確定値 $y$。これ自体は有限幅の $t\to\infty$ との交換を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

NTKの固有方向ごとに、固有値が正なら指数は零へ、固有値が零なら指数は1に留まる。その残る部分が直交射影 $P_0$ である。

<!-- proof-start -->
### 証明

対称正半定値行列の直交対角化により $\Theta=U\operatorname{diag}(\theta_1,\ldots,\theta_n)U^{\mathsf T}$、$\theta_j\ge0$。従って

$$
e^{-t\Theta}
=U\operatorname{diag}(e^{-t\theta_1},\ldots,e^{-t\theta_n})U^{\mathsf T}
\xrightarrow[t\to\infty]{\mathrm{op}}
U\operatorname{diag}(\boldsymbol{1}_{\{\theta_j=0\}})U^{\mathsf T}
=P_0.
$$

有限次元で作用素ノルム収束するので、$G_X$ の各有限な実現値について $(e^{-t\Theta}-P_0)(G_X-y)\to0$ である。よって

$$
H_X(t)\longrightarrow y+P_0(G_X-y)
=(I-P_0)y+P_0G_X.
$$

期待値は $\mathbb EG_X=0$ から得られ、中心化した極限 $P_0G_X$ の共分散は $P_0\mathbb E(G_XG_X^{\mathsf T})P_0^{\mathsf T}=P_0\Sigma P_0$。射影は対称なので $P_0^{\mathsf T}=P_0$。$\square$
<!-- proof-end -->

**二点の直接計算。** $\Theta=\operatorname{diag}(2,0)$、$\Sigma=\operatorname{diag}(1,4)$、$y=(1,3)^{\mathsf T}$ とする。標準基底で $\Theta(v_1,v_2)^{\mathsf T}=(2v_1,0)^{\mathsf T}$ だから、$\ker\Theta=\{(0,v_2)^{\mathsf T}:v_2\in\mathbb R\}$。この部分空間への直交射影は $(v_1,v_2)^{\mathsf T}\mapsto(0,v_2)^{\mathsf T}$、すなわち $P_0=\operatorname{diag}(0,1)$ なので長時間の学習後分布は $(1,G_2)^{\mathsf T}$（$G_2\sim N(0,4)$）である。第一成分は教師1に固定され、第二成分は初期の揺らぎを分散4のまま保持する。NNGP共分散が正定値でも、NTKの零方向があれば学習で揺らぎを消せない。

---

## 演習

### SLT2-12-A01 一次元で二つの極限を計算する
- Level: A
- 目安時間: 12分

$m\ge1$、$\kappa\ge0$ とし、$g_m(t)=\exp[-(\kappa+1/m)t]$（$t\ge0$）とする。$\kappa>0$ と $\kappa=0$ の場合に分け、$\lim_{t\to\infty}\lim_{m\to\infty}g_m(t)$ と $\lim_{m\to\infty}\lim_{t\to\infty}g_m(t)$ を求めよ。違いの原因を固有値下界で説明せよ。

<!-- solution-start -->
#### 詳細解答

固定 $t$ で $m\to\infty$ とすると $g_m(t)\to e^{-\kappa t}$。よって $\kappa>0$ ならその $t\to\infty$ 極限は0、$\kappa=0$ なら1である。一方、どの $m$ でも $\kappa+1/m>0$ なので、時間を先に無限大にすると $g_m(t)\to0$、その後の幅極限も0。まとめると

$$
\begin{array}{c|cc}
&\lim_t\lim_m g_m(t)&\lim_m\lim_t g_m(t)\\\hline
\kappa>0&0&0\\
\kappa=0&1&0
\end{array}
$$

である。$\kappa>0$ ならすべての幅に共通な正の減衰率下界 $\kappa$ がある。$\kappa=0$ では減衰率が $1/m\to0$ となり、固定時間では減衰を観測できない。
<!-- solution-end -->

### SLT2-12-A02 時間窓の増大と評価式
- Level: A
- 目安時間: 14分

核誤差の評価 $\varepsilon_T\le3(1+T)/\sqrt m$ と初期残差上界 $B=2$ が与えられたとする。$T_m=m^\alpha$（$\alpha>0$）に対し、[有限時間誤差界](#thm-slt2-12-finite-horizon)から保証できる誤差が零へ向かう $\alpha$ の範囲を、(a) $K_\infty\succeq0$ のみ、(b) $K_\infty\succeq I_n$ の場合に求めよ。これは必要条件か。

<!-- solution-start -->
#### 詳細解答

(a) では $BT\varepsilon_T$ に $B=2$、$T=T_m$ を代入して

$$
BT_m\varepsilon_{T_m}
\le\frac{6(m^\alpha+m^{2\alpha})}{\sqrt m}.
$$

最大次数 $m^{2\alpha-1/2}$ が零へ向かうための十分条件は $0<\alpha<1/4$。(b) では $\lambda=1$ を使い

$$
\frac{B\varepsilon_{T_m}}\lambda
\le\frac{6(1+m^\alpha)}{\sqrt m},
$$

なので $0<\alpha<1/2$ なら保証される。両者とも**この上界から導ける十分条件**であり、それ以外の $\alpha$ で実際の誤差が零へ向かわないと証明したわけではない。
<!-- solution-end -->

### SLT2-12-A03 一点模型の予測差
- Level: A
- 目安時間: 12分

一訓練点で固定核 $K_\infty=(2)$、有限幅の固定核 $K_m=(2+1/m)$、初期残差 $e_m(0)=1$ とする。二曲線を解き、差の絶対値を求めよ。差が $t/m$ 以下であり、またすべての $t\ge0$ で $1/(2m)$ 以下であることを別々に示せ。

<!-- solution-start -->
#### 詳細解答

方程式 $\dot e=-Ke$ の解を初期値1で書くと

$$
e_m(t)=e^{-(2+1/m)t},
\qquad e_{\infty,m}(t)=e^{-2t}.
$$

従って差の絶対値は $D_m(t)=e^{-2t}(1-e^{-t/m})$。$1-e^{-u}=\int_0^u e^{-v}dv\le u$（$u\ge0$）より $D_m(t)\le t/m$。別に[スペクトル付き核誤差界](#thm-slt2-12-finite-horizon)へ $B=1,\varepsilon_T=1/m,\lambda=2$ を代入すれば

$$
D_m(t)\le\frac{1-e^{-2t}}{2m}\le\frac1{2m}
$$

となる。二つの上界は、有限時間と全時間という使い分けを持つ。
<!-- solution-end -->

### SLT2-12-A04 Gaussian極限で残る成分
- Level: A
- 目安時間: 14分

$G\sim N_2(0,\operatorname{diag}(1,9))$、$\Theta=\operatorname{diag}(3,0)$、$y=(2,5)^{\mathsf T}$ とする。$H(t)=y+e^{-t\Theta}(G-y)$ の平均と共分散を時刻 $t$ で求め、$t\to\infty$ の分布を求めよ。

<!-- solution-start -->
#### 詳細解答

$e^{-t\Theta}=\operatorname{diag}(e^{-3t},1)$ だから

$$
H(t)=\begin{pmatrix}
2+e^{-3t}(G_1-2)\\
G_2
\end{pmatrix}.
$$

二成分の初期共分散は零なので、線形変換した後も共分散の非対角成分は零である。よって

$$
\mathbb EH(t)=\begin{pmatrix}2(1-e^{-3t})\\0\end{pmatrix},
\quad
\operatorname{Cov}(H(t))
=\begin{pmatrix}e^{-6t}&0\\0&9\end{pmatrix}.
$$

$t\to\infty$ では第一成分が確定値2、第二成分が $N(0,9)$ のまま残る。教師の第二成分5が実現しないのは、零固有方向に勾配が働かないためである。
<!-- solution-end -->

### SLT2-12-A05 bootstrapの数値条件
- Level: A
- 目安時間: 13分

[時間一様NTK定理](#thm-slt2-12-uniform-time)で $n=1$、$R=M_0=M_1=M_2=A=B=1$、$\lambda=2$ とする。$U_a,A_*,U_q,C_*$ を順に求め、$\delta\le1/4$ の場合に $C_*/\sqrt m\le1/4$ を保証する最小の整数幅を求めよ。

<!-- solution-start -->
#### 詳細解答

定理の定義式に順に数値を代入する。

$$
U_a=\frac{2\cdot1\cdot1\cdot1}{2}=1,
\quad A_*=1+1=2,
\quad U_q=\frac{2\cdot1\cdot2\cdot1\cdot1\cdot1}{2}=2.
$$

したがって

$$
C_*=(2+2\cdot 2^2)\cdot2+2\cdot2\cdot1
=10\cdot2+4=24.
$$

$24/\sqrt m\le1/4$ は $\sqrt m\ge96$、すなわち $m\ge9216$ と同値。$\lambda/8=1/4$ だから初期誤差条件と合わせて定理の仮定を満たし、その事象では $\|e_m(t)\|\le e^{-t}$ が保証される。これは十分な幅の上界であって実際に必要な最小幅とは限らない。
<!-- solution-end -->

### SLT2-12-B01 確率界から全時間近似へ
- Level: B
- 目安時間: 23分

幅 $m$ の独立初期化について $\mathbb E\|e_m(0)\|_2^2\le Q$、$\mathbb E\|K_m(0)-K_\infty\|_{\mathrm F}^2\le D/m$ が成立するとする。$K_\infty\succeq\lambda I_n$（$\lambda>0$）、また[時間一様NTK定理](#thm-slt2-12-uniform-time)の他の仮定を満たす。$\delta_m=m^{-1/4}$ を選んだとき、任意の固定 $B>0$ でよい初期化事象の下限確率と、全時間近似誤差の上界を導け。最後に全時間近似誤差が確率収束で零になる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

二乗非負変数へ[Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を適用すると

$$
\begin{aligned}
\mathbb P(\|e_m(0)\|_2>B)&\le Q/B^2,\\
\mathbb P(\|K_m(0)-K_\infty\|_{\mathrm{op}}>m^{-1/4})
&\le\frac{D/m}{m^{-1/2}}=D/\sqrt m.
\end{aligned}
$$

よって両条件を同時に満たす確率は少なくとも $1-Q/B^2-D/\sqrt m$。固定 $B$ に対して $C_*(B)$ は定数であり、大きい幅では $m^{-1/4}\le\lambda/8$、$C_*(B)/\sqrt m\le\lambda/8$。したがって良い事象上では

$$
\sup_{t\ge0}\|e_m(t)-e_{\infty,m}(t)\|_2
\le\frac{B}{2\lambda}
\left(m^{-1/4}+\frac{C_*(B)}{\sqrt m}\right)\to0.
$$

任意の誤差閾値 $\eta>0$ と確率閾値 $\rho>0$ を先に決める。$Q/B^2<\rho/2$ となる**固定した** $B$ を選び、その後に $m$ を大きくして $D/\sqrt m<\rho/2$ かつ上の決定論的誤差上界を $\eta$ 未満にする。この順序で、誤差が $\eta$ を超える確率は $\rho$ 未満になる。したがって全時間の差は確率収束で零となる。
<!-- solution-end -->

### SLT2-12-B02 二つの固有モードと時間尺度
- Level: B
- 目安時間: 20分

$m\ge1$ に対して $K_m=\operatorname{diag}(4,1/m)$、$e_m(0)=(3,2)^{\mathsf T}$ とし、$\dot e_m=-K_me_m$ を解く。固定時間の幅極限、二つの反復極限、および $t=cm$（$c>0$）での幅極限を求めよ。失われる仮定を明示せよ。

<!-- solution-start -->
#### 詳細解答

各座標の方程式は $\dot e_1=-4e_1$、$\dot e_2=-(1/m)e_2$ なので

$$
e_m(t)=\begin{pmatrix}3e^{-4t}\\2e^{-t/m}\end{pmatrix}.
$$

固定 $t$ で幅を無限にすると $(3e^{-4t},2)^{\mathsf T}$、その時間極限は $(0,2)^{\mathsf T}$。逆順では各 $m$ の二座標が零へ減衰するため $(0,0)^{\mathsf T}$。一方 $t=cm$ とすれば

$$
e_m(cm)=\begin{pmatrix}3e^{-4cm}\\2e^{-c}\end{pmatrix}
\longrightarrow\begin{pmatrix}0\\2e^{-c}\end{pmatrix}.
$$

$K_\infty=\operatorname{diag}(4,0)$ は零固有値を持つ。したがって $K_\infty\succeq\lambda I_2$ とする**幅に依存しない正の $\lambda$** が存在しないことが、正ギャップ定理との違いである。
<!-- solution-end -->

### SLT2-12-B03 bootstrapを自分で閉じる
- Level: B
- 目安時間: 24分

連続な対称正半定値行列 $K_m(t)$ による残差方程式 $\dot e_m(t)=-K_m(t)e_m(t)$ を考え、初期残差は $\|e_m(0)\|_2\le B$ とする。$K_\infty\succeq I_n$、初期摂動は $\|K_m(0)-K_\infty\|_{\mathrm{op}}\le\delta=0.1$、暫定的に $K_m(s)\succeq I_n/2$ と仮定した区間では $\|K_m(t)-K_m(0)\|_{\mathrm{op}}\le C/\sqrt m$（$C=0.2$）と証明済みだとする。$m=64$ のとき、暫定下界を全存在時間へ延長できることを示せ。残差が $\|e_m(t)\|\le B e^{-t/2}$ を満たすことと、固定核曲線との差の全時間上界を導け。解の存在延長には有界なパラメータという仮定も必要な理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$\sqrt m=8$ なので $C/\sqrt m=0.025$。初期時刻に $\lambda_{\min}(K_m(0))\ge1-0.1=0.9$ であり、暫定区間内では

$$
\lambda_{\min}(K_m(t))
\ge1-0.1-0.025=0.875>0.5.
$$

連続な最小固有値が最初に $0.5$ に落ちることはない。残差エネルギーは $d\|e\|^2/dt=-2e^{\mathsf T}K_me\le-\|e\|^2$ より $\|e_m(t)\|\le B e^{-t/2}$。全時間の核誤差は $\varepsilon=0.125$ 以下だから、[時間一様誤差の積分評価](#thm-slt2-12-uniform-time)で $\lambda=1$ として

$$
\sup_{t\ge0}\|e_m(t)-e^{-tK_\infty}e_m(0)\|
\le\frac{B\cdot0.125}{2}=0.0625B.
$$

固有値の連続性は**解が存在する間**の主張でしかない。例えば有限時刻にパラメータが発散すれば、その先に残差方程式を継続できない。実際の二層網ではパラメータ移動の一様上界と[ODE8の解延長判定](../../../解析系/ODE/ODE8/index.md#thm-ode8-continuation)を併用して、この可能性を除く。
<!-- solution-end -->

### SLT2-12-B04 近似核を追わずに長時間残差を抑える
- Level: B
- 目安時間: 23分

固定入力の残差 $e_m(t)$ が $\dot e_m=-K_m(t)e_m$、$K_m(t)\succeq0$ を満たすとし、$K_\infty\succeq2I_n$、$\sup_m\mathbb E\|e_m(0)\|^2\le Q$ とする。各固定 $t$ で $e_m(t)-e^{-tK_\infty}e_m(0)\to0$ が確率収束で成り立つ。任意の $\eta>0$ について、$\limsup_{m\to\infty}\mathbb P(\sup_{s\ge t}\|e_m(s)\|>\eta)$ の上界を求め、$t\to\infty$ の結論を導け。この議論が標本外の予測誤差へそのまま移らない理由も説明せよ。

<!-- solution-start -->
#### 詳細解答

残差ノルムの二乗を学習時刻 $s$ で微分すると $\frac d{ds}\|e_m(s)\|^2=-2e_m(s)^{\mathsf T}K_m(s)e_m(s)\le0$。よって $s\ge t$ での上限は時刻 $t$ の値で抑えられる。三角不等式で固定核からの差と固定核自身へ分けると

$$
\begin{aligned}
\mathbb P(\sup_{s\ge t}\|e_m(s)\|>\eta)
&\le\mathbb P(\|e_m(t)-e^{-tK_\infty}e_m(0)\|>\eta/2)\\
&\quad+\mathbb P(e^{-2t}\|e_m(0)\|>\eta/2)\\
&\le\mathbb P(\|e_m(t)-e^{-tK_\infty}e_m(0)\|>\eta/2)
+4Q e^{-4t}/\eta^2.
\end{aligned}
$$

固定 $t$ で $m\to\infty$ とすると第一項は零へ向かう。したがって上極限は高々 $4Qe^{-4t}/\eta^2$ で、$t\to\infty$ に零となる。標本外の予測 $F_m^Z$ の微分は $-K_m^{ZX}e_m^X$ であり、一般には $-K_m^{ZZ}(F_m^Z-y_Z)$ ではない。[評価点の交差核方程式](../SLT2-11/index.md#prop-slt2-11-test-covariance)を見れば、同じ二次エネルギーの単調性を仮定できないと分かる。
<!-- solution-end -->

### SLT2-12-C01 有限幅・長時間・Gaussianの三層を比較する
- Level: C
- 目安時間: 40分

固定された二訓練点上で二層網の初期化を考え、$K_\infty=\operatorname{diag}(2,1)$、$\Sigma=\operatorname{diag}(1,1/4)$、教師 $y=(1,-1)^{\mathsf T}$ とする。活性化・初期化・勾配流は[正ギャップ下の時間一様NTK定理](#thm-slt2-12-uniform-time)の仮定を満たし、$\mathbb E\|e_m(0)\|_2^2\le Q$、$\mathbb E\|K_m(0)-K_\infty\|_{\mathrm F}^2\le D/m$ を満たすものとする。

1. $B>0$ を固定して $\delta_m=m^{-1/4}$ と置き、幅を十分大きくしたときの良い事象の確率と全時間の予測差を明示せよ。
2. 無限幅を先に取った有限時間の学習後Gaussian分布 $H_X(t)$ の平均・共分散を計算し、$t\to\infty$ の分布を求めよ。
3. 最小固有値の仮定を落として $K_m=\operatorname{diag}(2,1/m)$ へ置き換える固定核模型では、初期残差を $(0,1)^{\mathsf T}$ とした二つの反復極限を計算せよ。上記1.の結論と矛盾しない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

**1. 初期化事象と時間一様誤差。** 最小固有値は $\lambda=1$ である。問題で仮定した二つの初期化二乗モーメント評価と[Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)から、$\|e_m(0)\|\le B$ かつ $\|K_m(0)-K_\infty\|_{\mathrm{op}}\le m^{-1/4}$ の確率は少なくとも

$$
1-\frac{Q}{B^2}-\frac{D}{\sqrt m}.
$$

この $B$ に対する $C_*(B)$ は固定値である。十分大きい $m$ では $m^{-1/4}\le1/8$、$C_*(B)/\sqrt m\le1/8$ が成り立つ。よって定理より

$$
\sup_{t\ge0}\|F_m(t)-\{y+e^{-tK_\infty}(F_m(0)-y)\}\|_2
\le\frac B2\left(m^{-1/4}+\frac{C_*(B)}{\sqrt m}\right).
$$

固定 $B$ の下で右辺は零へ向かう。さらに任意の失敗確率を与えてから $B$ を十分大きく取り、その後に幅を大きくすれば、時間一様な確率収束が得られる。

**2. 無限幅の学習後Gaussian分布。** [学習後Gaussian極限定理](../SLT2-11/index.md#thm-slt2-11-trained-gp)を固定 $t$ で適用する。指数行列は

$$
E_t=e^{-tK_\infty}=\operatorname{diag}(e^{-2t},e^{-t}).
$$

したがって平均と共分散は

$$
\begin{aligned}
\mu_t&=(I-E_t)y
=\begin{pmatrix}1-e^{-2t}\\-1+e^{-t}\end{pmatrix},\\
V_t&=E_t\Sigma E_t^{\mathsf T}
=\begin{pmatrix}e^{-4t}&0\\0&e^{-2t}/4\end{pmatrix}.
\end{aligned}
$$

両固有値が正であるため $E_t\to0$、$\mu_t\to y$、$V_t\to0$。従ってGaussian分布は確定値 $y=(1,-1)^{\mathsf T}$ へ弱収束する。1.の定理は、さらに同じランダム初期値での**有限幅曲線との全時間比較**を保証している。

**3. 小固有値の反例。** 固定核モデルで $e_m(0)=(0,1)^{\mathsf T}$ とすると

$$
e_m(t)=\begin{pmatrix}0\\e^{-t/m}\end{pmatrix}.
$$

固定 $t$ で幅を先に無限大にすると $(0,1)^{\mathsf T}$、それを時間無限大へ送っても変わらない。一方、時間を先に無限大へ送れば各 $m$ で $(0,0)^{\mathsf T}$ になり、後から幅を増やしても零である。置換後の極限核は $\operatorname{diag}(2,0)$ で $\lambda=1$ という前提を失っている。したがって1.の正ギャップ付き二層網定理との矛盾はない。
<!-- solution-end -->

## まとめ

- 固定した有限時間でのNTK近似は、時間無限大との交換をそれだけで正当化しない。
- 正のNTK最小固有値と有界で滑らかな二層網の仮定があれば、残差減衰とニューロン移動を相互に支えるbootstrapにより**全時間の核・予測誤差**を抑えられる。
- 核の全時間近似を証明しなくても、訓練残差に限れば単調性から長時間の確率評価を導ける。
- 最小固有値が幅とともに零へ落ちる模型では、時間尺度が増大し、二つの反復極限が異なり得る。
- 初期出力分布はNNGP共分散、学習による減衰はNTKが支配する。零固有空間には初期Gaussianの揺らぎが残り得る。
