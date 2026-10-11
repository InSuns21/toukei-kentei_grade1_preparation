# CDYN14 結合振動子格子と空間モード

[CDYN12の有限Kuramoto系の散逸恒等式](../CDYN12/index.md#thm-cdyn12-gradient-dissipation)では、多数の位相が互いに結合するときに減少する量を見つけました。ただし全員が全員に結合する模型では、**隣の振動子から伝わるずれ**が、格子全体にどのような速さで広がるかを区別しにくくなります。[CDYN13の初期層の評価](../CDYN13/index.md#thm-cdyn13-initial-layer-tracking)は速さの異なる変数を扱いましたが、そこには空間的な位置の区別がありませんでした。

そこで振動子を輪状に並べ、左右の隣同士だけを結びます。細かい凹凸は早く消え、緩やかな凹凸は長く残るのでしょうか。その答えは、有限個の数列を波に分解する**空間モード**から得られます。

本章では、まず線形の最近接結合を完全に解きます。次に、元の正弦結合振動子でも条件を明示すれば同期を直接証明できます。有限格子の結果を、そのままセル・オートマトンや連続空間の拡散模型へ移してよいわけではないことも検算します。

## 1. 円環格子上の最近接結合

整数 $N\ge3$ を固定し、添字 $j$ は $0,1,\ldots,N-1$ を取り、$N$ を法として読みます。すなわち $u_N=u_0$、$u_{-1}=u_{N-1}$ です。$u_j(t)\in\mathbb R$ を、第 $j$ 振動子の平衡位置または同期位相からの小さなずれとみなします。

左右の隣との差を足すと、$(u_{j+1}-u_j)+(u_{j-1}-u_j)$ になります。この操作を一つの作用素として定めます。

<a id="def-cdyn14-ring-laplacian"></a>

<!-- formal-statement-start -->
### 定義（有限周期格子の離散Laplace作用素）

整数 $N\ge3$ に対して、$u=(u_j)_{j\in\mathbb Z/N\mathbb Z}\in\mathbb R^N$ の**離散Laplace作用素** $L$ を

$$
(Lu)_j=u_{j+1}-2u_j+u_{j-1}
$$

で定める。$D>0$ を拡散結合係数、$\rho\in\mathbb R$ を線形反応係数とするとき、**線形結合格子**は

$$
u_j'=\rho u_j+D(Lu)_j
$$

である。とくに $\rho=0$ を純粋な拡散結合と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn14-ring-laplacian -->
**定義の確認**　$N=4$、$u=(1,0,-1,0)$ とします。添字を周期的に読んで各成分を調べると、

$$
\begin{aligned}
(Lu)_0&=0-2\cdot1+0=-2,\\
(Lu)_1&=-1-2\cdot0+1=0,\\
(Lu)_2&=0-2(-1)+0=2,\\
(Lu)_3&=1-2\cdot0-1=0.
\end{aligned}
$$

従って $Lu=-2u$ です。四点を一つおきに上下させるこの形は、作用素 $L$ で形を変えず倍率だけが変わる例です。
<!-- definition-example-end -->

$D$ が大きいほど隣との差を埋める作用が強くなります。一方 $\rho>0$ は各点のずれを自身で増幅させます。どちらが勝つかは、ずれの空間的な形によって異なります。

## 2. 結合で平均は変わるのか

まず波への分解を使わずに、結合の符号を調べます。線形結合における隣接辺は各々を同時に動かすため、全体の和では差が打ち消し合います。ここで使う内積は $\sum_j u_jv_j$ です。

<a id="prop-cdyn14-energy-identity"></a>

<!-- formal-statement-start -->
### 命題（平均と離散エネルギー恒等式）

$N\ge3$、$D>0$、$\rho\in\mathbb R$ の線形結合格子において

$$
\bar u(t)=\frac1N\sum_{j=0}^{N-1}u_j(t)
$$

と置くと、

$$
\bar u'=\rho\bar u
$$

が成り立つ。また任意の実ベクトル $u$ について

$$
\sum_j u_j(Lu)_j=-\sum_j(u_{j+1}-u_j)^2
$$

であり、解のエネルギー $Q(t)=\frac12\sum_j u_j(t)^2$ は

$$
Q'=\rho\sum_j u_j^2-D\sum_j(u_{j+1}-u_j)^2
$$

を満たす。
<!-- formal-statement-end -->

**証明の見取り図**　周期添字なので、$j$ を $j+1$ にずらして足しても総和は変わりません。隣同士を引いた量を二乗して展開すると、$L$ の符号が現れます。

<!-- proof-start -->
### 証明

周期添字の置換により

$$
\begin{aligned}
\sum_j(Lu)_j
&=\sum_j u_{j+1}-2\sum_j u_j+\sum_j u_{j-1}\\
&=\sum_j u_j-2\sum_j u_j+\sum_j u_j=0.
\end{aligned}
$$

各運動方程式を $j$ について加算して $N$ で割ると、

$$
\bar u'=\frac1N\sum_j(\rho u_j+D(Lu)_j)=\rho\bar u.
$$

次に平方差を展開します。周期添字なので $\sum_j u_{j+1}^2=\sum_j u_j^2$ です。

$$
\begin{aligned}
\sum_j(u_{j+1}-u_j)^2
&=\sum_j(u_{j+1}^2+u_j^2-2u_ju_{j+1})\\
&=2\sum_j u_j^2-2\sum_j u_ju_{j+1}.
\end{aligned}
$$

一方、添字の置換により $\sum_j u_ju_{j-1}=\sum_j u_ju_{j+1}$ だから、

$$
\begin{aligned}
\sum_j u_j(Lu)_j
&=\sum_j(u_ju_{j+1}-2u_j^2+u_ju_{j-1})\\
&=2\sum_j u_ju_{j+1}-2\sum_j u_j^2\\
&=-\sum_j(u_{j+1}-u_j)^2.
\end{aligned}
$$

最後に連鎖律で

$$
\begin{aligned}
Q'&=\sum_j u_ju_j'\\
&=\rho\sum_j u_j^2+D\sum_j u_j(Lu)_j\\
&=\rho\sum_j u_j^2-D\sum_j(u_{j+1}-u_j)^2.
\end{aligned}
$$

が従います。$\square$
<!-- proof-end -->

$\rho=0$ なら平均は一定で、$Q$ は増加しません。しかしこの恒等式だけでは、**どの模様がどれだけ速く消えるか**までは分かりません。次に有限次元の波の基底を作ります。

## 3. 格子を一周する波：離散Fourier基底

複素数は実ベクトルの解を簡潔に分解するための計算道具です。$k=0,\ldots,N-1$ について

$$
\zeta=e^{2\pi\mathrm i/N},\qquad
v^{(k)}_j=\zeta^{kj}=e^{2\pi\mathrm i kj/N}
$$

と定めます。$v^{(k)}$ は格子を一周すると元の値へ戻り、$k$ は周回中の振動回数を表します。$k=0$ は全点が同じ定数の**零モード**です。

<a id="thm-cdyn14-fourier-modes"></a>

<!-- formal-statement-start -->
### 定理（有限Fourier直交性と格子モードの固有値）

整数 $N\ge3$ と前節の $L$ に対し、$k=0,\ldots,N-1$ の波 $v^{(k)}$ は

$$
Lv^{(k)}=\mu_kv^{(k)},\qquad
\mu_k=-4\sin^2\left(\frac{\pi k}{N}\right)
$$

を満たす。さらに $k,\ell\in\{0,\ldots,N-1\}$ について

$$
\sum_{j=0}^{N-1}v^{(k)}_j\overline{v^{(\ell)}_j}
=\begin{cases}N&k=\ell,\\0&k\ne\ell.\end{cases}
$$

従って任意の $u\in\mathbb C^N$ は一意に

$$
\widehat u_k=\frac1N\sum_{j=0}^{N-1}
u_j e^{-2\pi\mathrm i kj/N},
\qquad
u_j=\sum_{k=0}^{N-1}\widehat u_k e^{2\pi\mathrm i kj/N}
$$

と展開でき、

$$
\sum_j|u_j|^2=N\sum_k|\widehat u_k|^2
$$

が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　まず隣の点へ進むことが波に $\zeta^k$ を掛けることだと確かめます。次に一周する等比数列を足して直交性を得ます。直交性を二度使えば展開と二乗和も紙上で導けます。

<!-- proof-start -->
### 証明

隣接成分には

$$
v^{(k)}_{j+1}=\zeta^k v^{(k)}_j,
\qquad
v^{(k)}_{j-1}=\zeta^{-k} v^{(k)}_j
$$

が成立します。ゆえに

$$
\begin{aligned}
(Lv^{(k)})_j
&=(\zeta^k-2+\zeta^{-k})v^{(k)}_j\\
&=(2\cos(2\pi k/N)-2)v^{(k)}_j\\
&=-4\sin^2(\pi k/N)v^{(k)}_j.
\end{aligned}
$$

$k=\ell$ のとき直交和の各項は1なので総和は $N$ です。$k\ne\ell$ なら $r=\zeta^{k-\ell}$ は $r^N=1$ かつ $r\ne1$ を満たします。有限等比和に $(1-r)$ を掛けると

$$
\begin{aligned}
(1-r)\sum_{j=0}^{N-1}r^j
&=(1+r+\cdots+r^{N-1})\\
&\quad-(r+r^2+\cdots+r^N)\\
&=1-r^N=0.
\end{aligned}
$$

$r\ne1$ なので和は0です。これは上の複素共役を含む内積そのものです。

定義した係数を戻すと、

$$
\begin{aligned}
\sum_k\widehat u_k\zeta^{kj}
&=\frac1N\sum_\ell u_\ell\sum_k\zeta^{k(j-\ell)}\\
&=\frac1N\sum_\ell u_\ell
\begin{cases}N&j=\ell,\\0&j\ne\ell\end{cases}\\
&=u_j.
\end{aligned}
$$

ここで $j,\ell$ は $0,\ldots,N-1$ にあるので、$j-\ell$ が $N$ の倍数となるのは $j=\ell$ の場合だけです。逆変換があるため展開は一意です。

最後に展開を二回代入して、

$$
\begin{aligned}
\sum_j|u_j|^2
&=\sum_j\left(\sum_k\widehat u_kv^{(k)}_j\right)
\left(\sum_\ell\overline{\widehat u_\ell}\,
\overline{v^{(\ell)}_j}\right)\\
&=\sum_{k,\ell}\widehat u_k\overline{\widehat u_\ell}
\sum_jv^{(k)}_j\overline{v^{(\ell)}_j}\\
&=N\sum_k|\widehat u_k|^2.
\end{aligned}
$$

有限和だけなので和の順序交換に収束の問題はありません。$\square$
<!-- proof-end -->

実数のずれ $u_j$ では、係数が独立に複素数になるわけではありません。共役を取ると、

$$
\overline{\widehat u_k}
=\frac1N\sum_j u_j e^{2\pi\mathrm i kj/N}
=\widehat u_{N-k}
$$

です（添字は $N$ を法とする）。$k$ と $N-k$ の波が組になって実数の正弦波・余弦波を作ります。

例えば $N=4$ の固有値は $0,-2,-4,-2$ です。零モードは同じ向きに全体を動かし、$k=2$ の交互に符号が変わる波は最も急速に平滑化されます。

## 4. どのモードが安定か：反応と拡散の競争

Fourier分解を実際の時間発展へ代入します。固有モードごとに一次線形常微分方程式が現れるので、ここでは一般のスペクトル定理を前提にしません。

<a id="thm-cdyn14-modal-decay"></a>

<!-- formal-statement-start -->
### 定理（線形格子の明示解・減衰率・安定性）

$N\ge3$、$D>0$、$\rho\in\mathbb R$ とし、実初期値 $u(0)\in\mathbb R^N$ に対する線形結合格子を考える。各Fourier係数の時間変化は

$$
\widehat u_k(t)
=e^{\lambda_k t}\widehat u_k(0),
\qquad
\lambda_k=\rho-4D\sin^2(\pi k/N)
$$

である。原点の安定性は次のとおりである。

- $\rho<0$ ならすべての初期値に対して指数減衰する。
- $\rho=0$ なら $\bar u(0)$ を保ち、零モード以外は指数減衰する。特に

$$
\sum_j|u_j(t)-\bar u(0)|^2
\le e^{-8D\sin^2(\pi/N)t}
\sum_j|u_j(0)-\bar u(0)|^2.
$$

- $\rho>0$ なら零モードが $e^{\rho t}$ で増幅されるため、原点は不安定である。

さらに平均零部分空間に制限すれば、すべての非零モードが指数減衰するための必要十分条件は

$$
\rho<4D\sin^2(\pi/N)
$$

である。等号では最も遅い非零モードは減衰せず、これを超えると増幅する。
<!-- formal-statement-end -->

**証明の見取り図**　線形方程式の両辺を波の直交基底で射影し、各係数の微分方程式を解きます。非零波の最小の減衰量は $k=1,N-1$ で現れることを、正弦の対称性と単調性から確かめます。

<!-- proof-start -->
### 証明

[有限Fourier基底の定理](#thm-cdyn14-fourier-modes)による係数を時間に依存させると、

$$
\begin{aligned}
\widehat u_k'
&=\frac1N\sum_j(\rho u_j+D(Lu)_j)\overline{v^{(k)}_j}\\
&=\rho\widehat u_k+\frac D N\sum_j(Lu)_j\overline{v^{(k)}_j}.
\end{aligned}
$$

$u=\sum_\ell\widehat u_\ell v^{(\ell)}$ と $Lv^{(\ell)}=\mu_\ell v^{(\ell)}$ を順番に代入すると、

$$
\begin{aligned}
\frac1N\sum_j(Lu)_j\overline{v^{(k)}_j}
&=\sum_\ell\mu_\ell\widehat u_\ell
\frac1N\sum_jv^{(\ell)}_j\overline{v^{(k)}_j}\\
&=\mu_k\widehat u_k.
\end{aligned}
$$

従って $\widehat u_k'=(\rho+D\mu_k)\widehat u_k=\lambda_k\widehat u_k$ となり、積分して明示解を得ます。

$\mu_0=0$ なので零モードは $\widehat u_0=\bar u$、$\lambda_0=\rho$ です。また $1\le k\le N-1$ では $\sin^2(\pi k/N)>0$ であり、$k$ と $N-k$ が同じ値を持ちます。$k$ を $1$ から $\lfloor N/2\rfloor$ に限ると $\sin(\pi k/N)$ は増加するため、

$$
\min_{1\le k\le N-1}\sin^2(\pi k/N)
=\sin^2(\pi/N).
$$

$\rho=0$ では平均を引いたベクトルの零モードは0です。[二乗和の恒等式](#thm-cdyn14-fourier-modes)を適用して、

$$
\begin{aligned}
\sum_j|u_j(t)-\bar u(0)|^2
&=N\sum_{k=1}^{N-1}
|\widehat u_k(0)|^2e^{-8D\sin^2(\pi k/N)t}\\
&\le e^{-8D\sin^2(\pi/N)t}
N\sum_{k=1}^{N-1}|\widehat u_k(0)|^2\\
&=e^{-8D\sin^2(\pi/N)t}
\sum_j|u_j(0)-\bar u(0)|^2.
\end{aligned}
$$

$\rho<0$ ではすべての $\lambda_k\le\rho<0$ です。$\rho>0$ では定数ベクトル $u(0)=c(1,\ldots,1)$、$c\ne0$ を入れると $u(t)=ce^{\rho t}(1,\ldots,1)$ で増大し、原点は不安定です。

平均零部分空間では $k=0$ の係数がなく、最大の固有値は

$$
\lambda_{\max}=\rho-4D\sin^2(\pi/N)
$$

です。$\lambda_{\max}<0$ なら全モードが減衰します。$\lambda_{\max}=0$ なら $k=1$ の実余弦モードが一定で、正なら同じモードが増幅します。これで必要十分条件と境界の挙動も示されました。$\square$
<!-- proof-end -->

純粋な拡散で $N=6$ を考えます。最も遅い非零モードでは $\sin^2(\pi/6)=1/4$ なので、平均零部分の二乗和は

$$
\sum_j|u_j(t)-\bar u(0)|^2
\le e^{-2Dt}\sum_j|u_j(0)-\bar u(0)|^2
$$

と減衰します。一方、$N$ を増やすと長波長の最小減衰率は小さくなります。**結合が強い**ことと、**大きな格子の長波長がゆっくり緩和する**ことは両立します。

## 5. 位相振動子では何が線形化されているか

$u_j$ はもともと「振動子のずれ」という言葉で導入しました。実際に位相振動子の模型とつなぎます。角度は $2\pi$ を法として同一視しますが、同期の近くでは連続的な実数の位相の代表を使えます。

$K>0$、$\omega\in\mathbb R$ に対し、輪上の正弦結合を

$$
\theta_j'=\omega+K\bigl[
\sin(\theta_{j+1}-\theta_j)+\sin(\theta_{j-1}-\theta_j)
\bigr]
$$

とします。$\theta_j(t)=\omega t+\alpha$ は全ての $j$ で同じ方向へ進む**完全同期解**です。[CDYN12の全対全Kuramoto模型](../CDYN12/index.md#thm-cdyn12-gradient-dissipation)とは、結合する相手の集合が異なります。

<a id="prop-cdyn14-phase-linearization"></a>

<!-- formal-statement-start -->
### 命題（最近接正弦結合の同期解と線形化）

上の $N\ge3$、$K>0$ の最近接正弦結合系で、同期解のまわりに

$$
\psi_j(t)=\theta_j(t)-\omega t-\alpha
$$

を導入すると、正確なずれの方程式は

$$
\psi_j'=K[
\sin(\psi_{j+1}-\psi_j)+\sin(\psi_{j-1}-\psi_j)
]
$$

である。その $\psi=0$ におけるJacobianは $KL$ であり、線形変分方程式は

$$
u'=KLu
$$

である。これは有限時間の一次近似であり、線形化だけでは任意の大きさの位相差からの同期を結論しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\theta_j=\omega t+\alpha+\psi_j$ と代入すると、

$$
\theta_{j+1}-\theta_j
=(\omega t+\alpha+\psi_{j+1})
-(\omega t+\alpha+\psi_j)
=\psi_{j+1}-\psi_j.
$$

また $\theta_j'=\omega+\psi_j'$ なので、両辺の $\omega$ が消えて正確な式が出ます。微小変位を $\psi=su$ と置いて $s=0$ で微分すると、

$$
\begin{aligned}
\left.\frac d{ds}\sin(s(u_{j+1}-u_j))\right|_{s=0}
&=u_{j+1}-u_j,\\
\left.\frac d{ds}\sin(s(u_{j-1}-u_j))\right|_{s=0}
&=u_{j-1}-u_j.
\end{aligned}
$$

従ってJacobianの作用は $K(u_{j+1}-2u_j+u_{j-1})=K(Lu)_j$ です。局所的な線形化であって、離れた位相では $\sin z=z$ と置けないことが重要です。$\square$
<!-- proof-end -->

それでも近くでの同期を確かめたければ、非線形の正確な式そのものへ戻って散逸を計算できます。これなら線形近似の誤差を無条件に無視する必要はありません。

<a id="thm-cdyn14-local-sync"></a>

<!-- formal-statement-start -->
### 定理（狭い位相幅からの格子同期）

上記の最近接正弦結合系で、初期の実数位相代表 $\psi_j(0)$ が

$$
W_0:=\max_j\psi_j(0)-\min_j\psi_j(0)<\frac\pi2
$$

を満たすとする。算術平均 $\bar\psi_0=N^{-1}\sum_j\psi_j(0)$ と

$$
E(t)=\frac12\sum_j(\psi_j(t)-\bar\psi_0)^2
$$

を定めると、すべての $t\ge0$ で

$$
W(t)\le W_0,\qquad
E(t)\le E(0)\exp\left(
-\frac{16K}{\pi}\sin^2(\pi/N)t
\right).
$$

従って各 $\psi_j(t)\to\bar\psi_0$ となり、元の位相は一つの同期運動に収束する。
<!-- formal-statement-end -->

**証明の見取り図**　小さな位相幅の中では、最大位相の隣はそれ以下、最小位相の隣はそれ以上です。幅が広がらないことを先に示し、隣接差の正弦の符号を全時刻で確保します。その後、[有限Fourierモードの直交性と固有値](#thm-cdyn14-fourier-modes)から得られる二乗和の下界を使い、散逸量から指数減衰を導きます。

<!-- proof-start -->
### 証明

正確なずれの式の右辺は有界かつ滑らかなので、解は全時刻に存在します。各成分を加えると、辺 $(j,j+1)$ に対応する

$$
\sin(\psi_{j+1}-\psi_j)
+\sin(\psi_j-\psi_{j+1})=0
$$

が打ち消し合い、$\sum_j\psi_j'=0$ です。ゆえに $\bar\psi(t)=\bar\psi_0$ です。

まず $W(t)<\pi/2$ となる時間区間で考えます。最大成分を $M=\psi_a$ とします。隣の位相との差は $[-W,0]$ にあり、この区間で $\sin z\le0$ なので

$$
\psi_a'=K\bigl[\sin(\psi_{a+1}-M)+\sin(\psi_{a-1}-M)\bigr]\le0
$$

です。最小成分 $m=\psi_b$ については、隣との差が $[0,W]$ に入るので $\psi_b'\ge0$ です。

最大・最小を与える添字が切り替わっても、有限個の滑らかな成分の最大・最小は局所Lipschitzであり、ほとんど至る所で上記の符号を満たします。従って $W'\le0$ がほとんど至る所で成り立ち、連続性により $W(t)\le W_0<\pi/2$ が全時刻で維持されます。

$z_j=\psi_{j+1}-\psi_j$ と置くと、平均が一定なことを用いたエネルギーの微分は

$$
\begin{aligned}
E'&=\sum_j(\psi_j-\bar\psi_0)\psi_j'\\
&=K\sum_j(\psi_j-\bar\psi_0)\sin z_j\\
&\quad+K\sum_j(\psi_j-\bar\psi_0)
\sin(\psi_{j-1}-\psi_j).
\end{aligned}
$$

後半の和で $j$ を $j+1$ へずらすと、

$$
\begin{aligned}
E'
&=K\sum_j\bigl[(\psi_j-\bar\psi_0)
-(\psi_{j+1}-\bar\psi_0)\bigr]\sin z_j\\
&=-K\sum_j z_j\sin z_j.
\end{aligned}
$$

$|z|\le W_0<\pi/2$ の範囲では、$\sin x$ の $[0,\pi/2]$ 上の凹性から $\sin x\ge2x/\pi$、負の $x$ には奇関数性を使うので、

$$
z\sin z\ge\frac2\pi z^2
\quad (|z|\le\pi/2).
$$

ゆえに

$$
E'\le-\frac{2K}{\pi}\sum_j(\psi_{j+1}-\psi_j)^2.
$$

平均を引いたベクトル $w_j=\psi_j-\bar\psi_0$ は $\widehat w_0=0$ です。[格子モード固有値と直交性](#thm-cdyn14-fourier-modes)および[離散エネルギー恒等式](#prop-cdyn14-energy-identity)を順に使い、

$$
\begin{aligned}
\sum_j(w_{j+1}-w_j)^2
&=-\sum_jw_j(Lw)_j\\
&=N\sum_{k=1}^{N-1}
4\sin^2(\pi k/N)|\widehat w_k|^2\\
&\ge4\sin^2(\pi/N)\sum_jw_j^2\\
&=8\sin^2(\pi/N)E.
\end{aligned}
$$

したがって

$$
E'\le-\frac{16K}{\pi}\sin^2(\pi/N)E.
$$

この不等式へ正の積分因子 $e^{ct}$、$c=16K\sin^2(\pi/N)/\pi$ を掛けると

$$
\frac d{dt}(e^{ct}E(t))
=e^{ct}(E'+cE)\le0,
$$

よって $E(t)\le E(0)e^{-ct}$ です。各二乗差は $2E(t)$ 以下なので、各 $\psi_j(t)-\bar\psi_0$ は0へ収束します。$\square$
<!-- proof-end -->

**条件を外すと何が壊れるか**　隣の位相差が $\pi$ を超えると、$z\sin z$ は負になり得ます。このときエネルギー微分の符号を上の方法では確定できません。したがって小さな位相幅という仮定を省き、任意の初期位相からの完全同期と読み替えてはいけません。

## 6. 左右の結合を変えたら何が変わるか

右隣と左隣の影響が等しいとは限りません。実際、同じ波で計算しても、非対称な結合では固有値に虚部が現れます。

<a id="prop-cdyn14-directed-coupling"></a>

<!-- formal-statement-start -->
### 命題（方向付き最近接結合の固有値）

実数 $K_+,K_-$ に対して

$$
(Au)_j=K_+(u_{j+1}-u_j)
+K_-(u_{j-1}-u_j)
$$

とする。$q_k=2\pi k/N$ と置くと、Fourier波 $v^{(k)}$ の固有値は

$$
\nu_k=(K_++K_-)(\cos q_k-1)
+\mathrm i(K_+-K_-)\sin q_k
$$

である。$K_+,K_-\ge0$ かつ $K_++K_->0$ なら非零モードの実部は負だが、$K_+\ne K_-$ の場合は一般に虚部を持つ。片側の係数を負にすると、不安定な非零モードが生じ得る。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

波の隣接関係をそのまま代入します。

$$
\begin{aligned}
(Av^{(k)})_j
&=\{K_+(\zeta^k-1)+K_-(\zeta^{-k}-1)\}v^{(k)}_j\\
&=\{(K_++K_-)(\cos q_k-1)\\
&\qquad+\mathrm i(K_+-K_-)\sin q_k\}v^{(k)}_j.
\end{aligned}
$$

$k\ne0$ なら $\cos q_k-1<0$ なので、非負の結合係数の和が正なら実部は負です。一方 $K_+=1,K_-=-2$ とすると $K_++K_-=-1$ より、

$$
\operatorname{Re}\nu_k=1-\cos q_k>0
\quad (k\ne0).
$$

この場合、任意の非零波から作った実部・虚部の実解の包絡線は成長し、安定性が壊れます。$\square$
<!-- proof-end -->

非対称だから必ず不安定、というわけではありません。非負の一方向結合では減衰とともに波が格子上を移動する効果が現れます。左右対称のときと同じ実固有値だけを使う議論ができない、というのが障害です。

## 7. セル・オートマトン、離散時間、PDEとは別の問題

[CELL5の有限周期格子の保存則](../CELL5/index.md#thm-cell5-ring-conservation) は、有限状態を離散時間に更新する規則から示した結果でした。本章の状態 $u_j(t)$ は実数で、時刻 $t$ は連続です。形が似た添字 $j\pm1$ を含んでいても、解の生成方法は違います。

例えば純粋な拡散結合 $u'=DLu$ を刻み $\Delta t>0$ で**前進Euler法**にすると、

$$
u_j^{n+1}
=u_j^n+\Delta tD(u_{j+1}^n-2u_j^n+u_{j-1}^n).
$$

この離散時間の更新は、各波を

$$
g_k=1-4\Delta tD\sin^2(\pi k/N)
$$

倍にします。元の連続時間の倍率は

$$
e^{-4Dt\sin^2(\pi k/N)}
$$

であり、各時刻で正の減衰です。しかし偶数 $N$ の交互モードでは

$$
g_{N/2}=1-4\Delta tD.
$$

$\Delta tD>1/2$ なら $g_{N/2}<-1$、したがって $|g_{N/2}|>1$ で、**安定なODEを離散化した更新が発散**します。このため離散化の安定性には別の証明が必要です。

格子の間隔を $h=1/N$ とし、$D=\kappa/h^2=\kappa N^2$ と拡大すると、滑らかな空間変化を近似できそうです。しかし、有限格子で各波を解けることと、無限個の格子点を含むPDE極限が成立することは同じではありません。

<a id="prop-cdyn14-fixed-mode-limit"></a>

<!-- formal-statement-start -->
### 命題（固定モードの形式的連続極限）

$\kappa>0$ と固定整数 $k\ge0$ に対し、$N>k$ として $D_N=\kappa N^2$ を用いる。$N$ 点周期格子上の第 $k$ モードの拡散固有値は

$$
\lambda_{k,N}=-4\kappa N^2\sin^2(\pi k/N)
$$

であり、

$$
\lim_{N\to\infty}\lambda_{k,N}=-4\pi^2\kappa k^2.
$$

この主張は $k$ 固定の固有値についてのみ成り立ち、格子上の任意の初期値に対するPDEへの収束を主張しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$k=0$ なら両辺が0です。$k\ge1$ に対して $z_N=\pi k/N$ と置くと $z_N\to0$ です。

$$
\begin{aligned}
\lambda_{k,N}
&=-4\kappa N^2 z_N^2
\left(\frac{\sin z_N}{z_N}\right)^2\\
&=-4\pi^2\kappa k^2
\left(\frac{\sin z_N}{z_N}\right)^2.
\end{aligned}
$$

$\lim_{z\to0}\sin z/z=1$ を代入すると結論です。$k$ 自体が $N$ とともに増大する場合には $z_N\to0$ を使用できません。$\square$
<!-- proof-end -->

例えば偶数 $N$ で $k=N/2$ とすると $z_N=\pi/2$ は0へ近づかず、上の固定モード近似は適用できません。任意の初期値のPDE極限には、初期データの対応、時間・空間で一様な評価、高周波成分の制御、収束する解がPDEを満たすことの確認が必要です。本章は**有限次元の常微分方程式としての計算**までを証明しています。

## 8. 演習と詳細解答

### A1. 四点格子を直接計算する

$N=4$ で $u=(1,2,0,-1)$ とする。$Lu$ を求め、成分和が0であることを確かめよ。

- Level: A
- ID: CDYN14-A1

<!-- solution-start -->
**詳細解答**　[離散Laplace作用素](#def-cdyn14-ring-laplacian)に周期添字を使って、

$$
\begin{aligned}
(Lu)_0&=u_1-2u_0+u_3=2-2-1=-1,\\
(Lu)_1&=u_2-2u_1+u_0=0-4+1=-3,\\
(Lu)_2&=u_3-2u_2+u_1=-1+2=1,\\
(Lu)_3&=u_0-2u_3+u_2=1+2=3.
\end{aligned}
$$

従って $Lu=(-1,-3,1,3)$、成分の和は $-1-3+1+3=0$ です。これは[平均の恒等式](#prop-cdyn14-energy-identity)の直接確認です。
<!-- solution-end -->

### A2. 交互モードの固有値

偶数 $N\ge4$ で $u_j=(-1)^j$ とする。$Lu$ を求め、$k=N/2$ の固有値と照合せよ。

- Level: A
- ID: CDYN14-A2

<!-- solution-start -->
**詳細解答**　隣の二点はどちらも $-u_j$ なので、

$$
(Lu)_j=-u_j-2u_j-u_j=-4u_j.
$$

また $k=N/2$ を[モードの固有値公式](#thm-cdyn14-fourier-modes)へ代入すると、

$$
-4\sin^2\left(\frac{\pi(N/2)}{N}\right)
=-4\sin^2(\pi/2)=-4
$$

であり、一致します。
<!-- solution-end -->

### A3. 三乗根の直交和

$N=3$、$\zeta=e^{2\pi\mathrm i/3}$ とする。$1+\zeta+\zeta^2=0$ を証明し、$v^{(0)}$ と $v^{(1)}$ の内積を求めよ。

- Level: A
- ID: CDYN14-A3

<!-- solution-start -->
**詳細解答**　$\zeta^3=1$、$\zeta\ne1$ なので、

$$
(1-\zeta)(1+\zeta+\zeta^2)=1-\zeta^3=0.
$$

$1-\zeta\ne0$ から和は0です。内積は複素共役を用いて

$$
\begin{aligned}
\sum_{j=0}^2v^{(0)}_j\overline{v^{(1)}_j}
&=1+\overline\zeta+\overline{\zeta^2}\\
&=1+\zeta^2+\zeta=0.
\end{aligned}
$$

従って二つの波は直交します。
<!-- solution-end -->

### A4. 平均モードの解

$N=5$、$D=3$、$\rho=0$、$u_j(0)=2$ とする。解を求め、隣接差のエネルギーが0である理由を述べよ。

- Level: A
- ID: CDYN14-A4

<!-- solution-start -->
**詳細解答**　各 $j$ で $u_{j+1}-u_j=0$ だから $Lu(0)=0$ です。定数ベクトルには $L$ が0を与えるため、$u_j(t)=2$ を方程式へ代入すると左辺も右辺も0です。線形方程式の解の一意性によりこれが解です。

平均は常に2で、すべての辺で

$$
(u_{j+1}(t)-u_j(t))^2=(2-2)^2=0
$$

なので、[エネルギー恒等式](#prop-cdyn14-energy-identity)でも $Q'=0$ です。拡散は零モードを消せません。
<!-- solution-end -->

### A5. 正弦結合から線形作用素へ

$N=4$ の正弦結合系で $\theta_j=\omega t+\alpha+s u_j$ と置き、右辺の $s=0$ における導関数を求めよ。

- Level: A
- ID: CDYN14-A5

<!-- solution-start -->
**詳細解答**　角度差は $\theta_{j+1}-\theta_j=s(u_{j+1}-u_j)$ です。連鎖律と $\cos0=1$ から、

$$
\left.\frac d{ds}\sin(s(u_{j+1}-u_j))\right|_{s=0}
=u_{j+1}-u_j.
$$

左隣にも同じ計算をすると、

$$
K\{(u_{j+1}-u_j)+(u_{j-1}-u_j)\}
=K(Lu)_j.
$$

従って[同期解の線形化命題](#prop-cdyn14-phase-linearization)のJacobianは $KL$ です。これは正確な非線形式を線形方程式へ**全位相差で**置き換えられるという意味ではありません。
<!-- solution-end -->

### B1. 散逸恒等式を別の方法で検算する

実ベクトル $u$ に対し、$\sum_ju_j(Lu)_j=-\sum_j(u_{j+1}-u_j)^2$ を直接証明せよ。また $Lu=0$ なら全成分が等しいことを示せ。

- Level: B
- ID: CDYN14-B1

<!-- solution-start -->
**詳細解答**　$\sum_j u_ju_{j-1}=\sum_j u_{j+1}u_j$ を添字を一つずらして確かめると、

$$
\begin{aligned}
\sum_j u_j(Lu)_j
&=2\sum_j u_ju_{j+1}-2\sum_j u_j^2\\
&=-\sum_j(u_{j+1}^2+u_j^2-2u_ju_{j+1})\\
&=-\sum_j(u_{j+1}-u_j)^2.
\end{aligned}
$$

$Lu=0$ なら左辺は0なので、非負の平方和の各項はすべて0です。ゆえに $u_{j+1}=u_j$ が全ての辺で成立し、環が連結であることから $u_0=\cdots=u_{N-1}$ です。逆に定数ベクトルなら $Lu=0$ です。
<!-- solution-end -->

### B2. 反応係数の境界

$N=6$、$D=2$ の線形結合格子について、各固有値を求めよ。平均零部分空間では $\rho$ のどの範囲で指数安定か。また $\rho=1$ なら原点全体は安定か。

- Level: B
- ID: CDYN14-B2

<!-- solution-start -->
**詳細解答**　$N=6$ では

$$
\sin^2(\pi k/6)
=\left(0,\frac14,\frac34,1,\frac34,\frac14\right)_k.
$$

$4D=8$ なので[各モードの増減率](#thm-cdyn14-modal-decay)は

$$
(\lambda_0,\ldots,\lambda_5)
=(\rho,\rho-2,\rho-6,\rho-8,\rho-6,\rho-2).
$$

平均零部分には $k=0$ がないので最大の固有値は $\rho-2$ です。すべてが負である条件は $\rho<2$ となります。$\rho=1$ なら非零モードは減りますが、$\lambda_0=1>0$ のため、非零平均を持つ初期値は増幅され、原点全体は不安定です。
<!-- solution-end -->

### B3. 非対称結合の虚部

$N=4$、$K_+=2$、$K_-=1$ の方向付き結合について、$k=1$ の固有値を求めよ。また $K_+=1$、$K_-=-2$ ではどうなるか。

- Level: B
- ID: CDYN14-B3

<!-- solution-start -->
**詳細解答**　$k=1$ では $q_1=\pi/2$、$\cos q_1=0$、$\sin q_1=1$ です。[方向付き結合の固有値](#prop-cdyn14-directed-coupling)へ代入すると、

$$
\nu_1=(2+1)(0-1)+\mathrm i(2-1)\cdot1
=-3+\mathrm i.
$$

実部が負なので振幅は減衰しますが、虚部が1なので進む波には回転が現れます。次に $K_+=1,K_-=-2$ なら

$$
\nu_1=(1-2)(-1)+\mathrm i(1+2)
=1+3\mathrm i
$$

です。実部が正になり、このモードは増幅します。左右の係数を無条件に正と扱えない例です。
<!-- solution-end -->

### B4. 安定なODEと不安定な時間刻み

偶数 $N$ の純粋な拡散格子 $u'=DLu$ を前進Euler法で刻み $\Delta t>0$ により更新する。交互モードが減衰するための条件を求め、$\Delta tD=3/4$ での一回の倍率を計算せよ。

- Level: B
- ID: CDYN14-B4

<!-- solution-start -->
**詳細解答**　更新式は $u^{n+1}=(I+\Delta tDL)u^n$ です。交互モードでは $Lu=-4u$ だから、

$$
u^{n+1}=(1-4\Delta tD)u^n.
$$

厳密に減衰するためには

$$
|1-4\Delta tD|<1
\quad\Longleftrightarrow\quad
-1<1-4\Delta tD<1.
$$

$\Delta tD>0$ のもとでこれは $0<\Delta tD<1/2$ です。$\Delta tD=3/4$ なら倍率は $1-4(3/4)=-2$ で、振幅は毎回2倍になります。連続時間の同じモードでは $e^{-4Dt}$ と減ることと対照的です。
<!-- solution-end -->

### C1. 六点格子の反応・拡散・モード・離散化

$N=6$、$D=2$、$\rho=1$ とし、

$$
u_j' =u_j+2(u_{j+1}-2u_j+u_{j-1})
$$

の初期値を

$$
u_j(0)=1+2\cos\left(\frac{2\pi j}{6}\right)-(-1)^j
$$

とする。

1. 初期値を零モード、第1余弦モード、交互モードに分け、それぞれの増減率を求めよ。
2. 全成分の正確な解と平均の時間発展を求めよ。
3. 初期値から平均を除いた成分の二乗和が、どのような指数率で減るか評価せよ。
4. 原点全体が不安定なのに平均零部分が安定な理由を説明せよ。
5. この系の拡散項だけを前進Euler法で $\Delta t=3/10$ として計算すると、交互モードは一刻みで何倍になるか。元の連続時間の安定性と矛盾するか。

- Level: C
- ID: CDYN14-C1

<!-- solution-start -->
**詳細解答**

**(1)**　最初の1は $k=0$、余弦は $k=1,5$ の実数の組、$(-1)^j=e^{\mathrm i\pi j}$ は $k=3$ です。$N=6$ での正弦値は

$$
\sin^2(0)=0,\qquad
\sin^2(\pi/6)=\frac14,\qquad
\sin^2(\pi/2)=1.
$$

よって $\lambda_k=\rho-4D\sin^2(\pi k/6)$ に $D=2,\rho=1$ を入れ、

$$
\lambda_0=1,\qquad
\lambda_1=\lambda_5=1-8\cdot\frac14=-1,\qquad
\lambda_3=1-8=-7.
$$

**(2)**　各波に対応する指数因子を掛けて足し戻すと、

$$
\boxed{\;
u_j(t)=e^t+2e^{-t}\cos(2\pi j/6)
-e^{-7t}(-1)^j.
\;}
$$

この式を微分すると各項へ順に $1,-1,-7$ が掛かり、$L$ の固有値 $0,-1,-4$ と $\rho=1,D=2$ に一致します。環上の余弦和と交互和はともに0なので、

$$
\bar u(t)=\frac16\sum_ju_j(t)=e^t.
$$

**(3)**　中心化した成分は

$$
w_j(t)=u_j(t)-\bar u(t)
=2e^{-t}\cos(2\pi j/6)-e^{-7t}(-1)^j.
$$

異なるFourierモードは直交するため交差項は0です。$j=0,\ldots,5$ について余弦の二乗和が3、$(-1)^{2j}=1$ の和が6であることから、

$$
\begin{aligned}
\sum_jw_j(t)^2
&=4e^{-2t}\sum_j\cos^2(2\pi j/6)
+e^{-14t}\sum_j1\\
&=12e^{-2t}+6e^{-14t}\\
&\le18e^{-2t}.
\end{aligned}
$$

$t=0$ の二乗和は18で、最も遅い非零モードの二乗減衰率2と一致します。

**(4)**　$\lambda_0=1>0$ なので、全点が等しい初期微小変位は $e^t$ 倍になり、原点は不安定です。しかし平均零なら $\widehat u_0(0)=0$ が保たれ、残る固有値は $-1,-5,-7,-5,-1$ と全て負です。どの部分空間に限定した結論かが重要です。

**(5)**　純粋な拡散項 $2Lu$ の交互波は固有値 $2(-4)=-8$ です。前進Eulerの一刻みの倍率は

$$
1+\Delta t(-8)
=1-\frac3{10}\cdot8
=-\frac75.
$$

絶対値 $7/5>1$ なので離散化では増幅します。一方、連続時間の拡散だけなら $e^{-8t}$ で減衰します。時間刻みが大きくて生じた数値的不安定性であり、元のODEの定理とは矛盾しません。
<!-- solution-end -->

本章で、有限格子の平均モード、非零波の減衰、非線形位相同期の十分条件を区別して導きました。次のCDYN15では、周期・分岐・同期・速遅・空間モードについて、どこまでが証明された結論で、どこから先に追加条件が要るかを横断的に整理します。
