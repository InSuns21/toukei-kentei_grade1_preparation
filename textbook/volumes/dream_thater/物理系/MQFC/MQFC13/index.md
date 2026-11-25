# MQFC13 cutoff・体積・極限の構成

[MQFC6の自由場の構成](../MQFC6/index.md#thm-mqfc6-free-measure) では無限個の測定を同時に確率変数として実現し、[MQFC7のSchwinger関数](../MQFC7/index.md#def-mqfc7-schwinger) では測定の積の平均を扱った。相互作用を入れると、まず有限個の自由度で確率測度を作り、近似の制限を外す方法が有効になる。しかし各近似で積分が有限であることだけでは、極限の測度も相関も得られない。今回はこの二つの極限問題を分け、自由場で実際に計算する。

直接の前提は [MQFC5](../MQFC5/index.md)、[MQFC6](../MQFC6/index.md)、[MQFC7](../MQFC7/index.md)、[F0-00P4A](../../../解析系/F0/F0-00P4A/index.md)、[OTR3](../../../解析系/OTR/OTR3/index.md) とする。以下 $d\ge1$、質量 $m>0$、実試験関数 $f\in S=\mathcal S(\mathbb R^d)$ を用いる。

## 1. 二種類の制限

一辺 $L>0$ の立方体で周期境界条件を課すと、許される周波数は $p_k=2\pi k/L$（$k\in\mathbb Z^d$）になる。周期条件は $e^{ip_k\cdot(x+Le_j)}=e^{ip_k\cdot x}$ から確認できる。有限体積でも周波数の個数は無限である。高周波を除くとき初めて有限個のモードになる。これを紫外（UV）正則化という。

<a id="def-mqfc13-cutoff"></a>

<!-- formal-statement-start -->
> **定義（有限体積・周波数切断）**
> $L>0$、$\Lambda>0$ とする。周期箱 $Q_L=[-L/2,L/2)^d$ 上の実場について、許す周波数を

$$
K_{L,\Lambda}=\{k\in\mathbb Z^d:\ |2\pi k/L|_\infty\le\Lambda\}
$$

> に限定する。ここで $|p|_\infty=\max_j|p_j|$。この有限モード模型の体積制限は $L$、周波数切断（cutoff）は $\Lambda$ で指定される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc13-cutoff -->
### 直接例

$d=1$、$L=2\pi$、$\Lambda=2$ なら $p_k=k$ で $K_{L,\Lambda}=\{-2,-1,0,1,2\}$。**定義の確認**：箱の長さは正であり、切断値も正である。全ての許容モードが周期 $2\pi$ を持ち、絶対周波数は2以下である。逆に $|k|\ge3$ の整数モードは切断条件を満たさない。実場は定数と $\cos x,\sin x,\cos2x,\sin2x$ の実線形結合になる。負周波数と正周波数を独立な実自由度として二重計数するのではなく、一対から余弦と正弦の二自由度を得る。
<!-- definition-example-end -->

$L\to\infty$ は体積制限を外す操作であり、$\Lambda\to\infty$ は短距離の変動を戻す操作である。例えば $L$ を固定して $\Lambda$ だけ増やしても境界条件は変わらない。質量ゼロに伴う赤外発散も別の問題である。本講では $m>0$ を固定する。

<a id="ref-mqfc13-mode-construction"></a>

## 2. 有限モードGaussian自由場を作る

$K_{L,\Lambda}\setminus\{0\}$ の各対 $\{k,-k\}$ から代表を一つ選んだ集合を $K^+$ とする。実係数 $A_0,A_k,B_k$ を独立な中心化正規確率変数とし、分散をそれぞれ $m^{-2}$、$(|p_k|^2+m^2)^{-1}$、$(|p_k|^2+m^2)^{-1}$ とする。$|p|$ は Euclid ノルムである。場を

$$
\begin{aligned}
\phi_{L,\Lambda}(x)
&=L^{-d/2}A_0\\
&\quad+\sqrt{2}L^{-d/2}\sum_{k\in K^+}
(A_k\cos(p_k\cdot x)+B_k\sin(p_k\cdot x))
\end{aligned}
$$

と置く。基底の係数は周期箱上で各基底関数の積分二乗が1になるように選んだ。例えば非零 $k$ の余弦の二乗積分は $\cos^2 u=(1+\cos2u)/2$ により $L^d/2$ となる。

[有限次元Gaussian積分と特性関数](../MQFC6/index.md#thm-mqfc6-finite-gaussian) により、各係数の密度は正の分散で正規化できる。例えば零モードの密度は $m(2\pi)^{-1/2}e^{-m^2a^2/2}$ である。係数の有限直積測度が場の確率法則を与える。

箱上だけで積分すると $f$ が箱を越える場合に測定の定義が変わる。そこで場を周期的に全空間へ延長し、$\Phi_{L,\Lambda}(f)=\int_{\mathbb R^d}\phi_{L,\Lambda}(x)f(x)\,dx$ とする。これは有限和と可積分な $f$ の積分なので存在する。Fourier規約は [MQFC1](../MQFC1/index.md#thm-mqfc1-fourier) の $\widehat f(p)=\int e^{-ip\cdot x}f(x)\,dx$ に従う。

<a id="prop-mqfc13-box-covariance"></a>

<!-- formal-statement-start -->
> **命題（有限モード自由場の共分散）**
> $d\ge1$、$L,\Lambda,m>0$ とする。[有限モード場の構成](#ref-mqfc13-mode-construction) に従い、各実正規直交三角基底の係数を独立な中心化Gaussianとし、その分散を対応する周波数 $p_k$ に対して $(|p_k|^2+m^2)^{-1}$ とする。実Schwartz関数 $f,g$ に対する全空間の積分測定の共分散は

$$
C_{L,\Lambda}(f,g)=
\frac1{L^d}\sum_{k\in K_{L,\Lambda}}
\frac{\overline{\widehat f(p_k)}\widehat g(p_k)}
{|p_k|^2+m^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

測定を係数の線形結合に書き、独立性で異なる係数の交差項を消す。余弦と正弦の二項を一組にすると、正負の周波数の和に戻る。

<!-- proof-start -->
### 証明

$f$ が実なので $\int f\cos(p_k\cdot x)=\operatorname{Re}\widehat f(p_k)$、$\int f\sin(p_k\cdot x)=-\operatorname{Im}\widehat f(p_k)$ となる。零モードの係数は $L^{-d/2}\widehat f(0)$ である。したがって測定は有限個の独立Gaussianの実線形結合であり、[有限次元Gaussian積分と特性関数](../MQFC6/index.md#thm-mqfc6-finite-gaussian) から中心化Gaussianとなる。

平均は零なので共分散は積の期待値である。非零モードの寄与は

$$
\frac{2}{L^d}\sum_{k\in K^+}
\frac{\operatorname{Re}\widehat f(p_k)\operatorname{Re}\widehat g(p_k)
+\operatorname{Im}\widehat f(p_k)\operatorname{Im}\widehat g(p_k)}
{|p_k|^2+m^2}.
$$

分子の和は $\operatorname{Re}(\overline{\widehat f(p_k)}\widehat g(p_k))$ である。実関数のFourier変換では $\widehat f(-p)=\overline{\widehat f(p)}$ だから、二倍の実部は $k$ と $-k$ の寄与の和に等しい。零モードの寄与 $L^{-d}m^{-2}\widehat f(0)\widehat g(0)$ を加えると結論を得る。
<!-- proof-end -->

例えば $d=1$、$\Lambda<2\pi/L$ では零モードだけである。このとき $C_{L,\Lambda}(f,f)=|\int f|^2/(Lm^2)$。試験関数の積分が零であれば、その測定は確率1で零になる。

## 3. 自由場では制限を外す計算ができる

次に体積を無限大にしたときの和を積分へ移す。各固定の周波数で有限になるだけでなく、周波数全域から来る寄与を制御する必要がある。

<a id="thm-mqfc13-free-limit"></a>

<!-- formal-statement-start -->
> **定理（有限モード共分散の二重極限）**
> $d\ge1$、$m>0$、$f,g\in\mathcal S(\mathbb R^d)$ は実関数とする。[有限モード自由場の共分散](#prop-mqfc13-box-covariance) について任意の列 $L_n\to\infty$、$\Lambda_n\to\infty$ に対して

$$
\lim_{n\to\infty} C_{L_n,\Lambda_n}(f,g)
=\frac1{(2\pi)^d}\int_{\mathbb R^d}
\frac{\overline{\widehat f(p)}\widehat g(p)}{|p|^2+m^2}\,dp.
$$

> 任意の有限個の試験関数で作る測定ベクトルの法則は、右辺を共分散とする自由場の対応する測定ベクトルの法則へ狭義収束する。
<!-- formal-statement-end -->

### 証明の見取り図

固定した周波数箱では格子幅を小さくしてRiemann和を取る。箱の外は急減少性から、格子幅によらない可積分な上界を作る。最後にGaussianの特性関数を比較する。

<!-- proof-start -->
### 証明

$h=2\pi/L$、$F(p)=\overline{\widehat f(p)}\widehat g(p)/(|p|^2+m^2)$ と置く。共分散は $(2\pi)^{-d}h^d\sum_{|hk|_\infty\le\Lambda}F(hk)$ である。[Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier) と $m>0$ により、任意の整数 $N>d$ についてある有限な $M$ が存在し、

$$
|F(p)|\le M(1+|p|_\infty)^{-N}.
$$

十分大きな $n$ では $h\le1$ としてよい。各格子点 $hk$ の周りに立方体 $D_k=hk+[-h/2,h/2)^d$ を置く。これらは全空間を重なりなく覆い、各体積は $h^d$。$q\in D_k$ なら $|q|_\infty\le |hk|_\infty+1/2$ だから、

$$
(1+|hk|_\infty)^{-N}
\le (3/2)^N(1+|q|_\infty)^{-N}.
$$

さらに $|hk|_\infty>R$ なら $|q|_\infty>R-1/2$ である。従って $R>1$ に対して

$$
h^d\sum_{|hk|_\infty>R}|F(hk)|
\le M(3/2)^N
\int_{|q|_\infty>R-1/2}(1+|q|_\infty)^{-N}\,dq.
$$

右辺は $h$ に依存せず $R\to\infty$ で零になる。実際、整数 $j\ge1$ の殻 $j\le |q|_\infty<j+1$ の体積は $(2j+2)^d-(2j)^d$ であり、二項展開から定数倍の $(j+1)^{d-1}$ 以下である。したがって殻ごとの上界の和は $\sum_{j\ge1}(j+1)^{d-1-N}$ に定数を掛けたもので収束する。

固定した $R$ に対して、$\Lambda_n\ge R$ となれば $|h_nk|_\infty\le R$ の項はすべて含まれる。その和は $F$ が連続であり箱の境界が体積零なので、Riemann和として $\int_{[-R,R]^d}F$ に収束する。全体の誤差はこの箱内の誤差、上で評価した箱外の和、箱外の積分の三項で抑えられる。まず $R$ を大きくして後二項を任意に小さくし、その $R$ で $n\to\infty$ とすると積分への収束が従う。

試験関数 $f_1,\ldots,f_r$ に対し、測定ベクトルの共分散行列を $\Sigma_n=(C_{L_n,\Lambda_n}(f_i,f_j))_{i,j=1}^r$ とする。各要素が [Euclid自由場の試験関数共分散](../MQFC5/index.md#def-mqfc5-covariance-form) の行列 $\Sigma$ に収束する。[Gaussian型特性汎関数の有限次元整合性](../MQFC6/index.md#thm-mqfc6-gaussian-characteristic) の式に $t\in\mathbb R^r$ を代入すると特性関数は

$$
e^{-t^{\mathsf T}\Sigma_n t/2}\longrightarrow
e^{-t^{\mathsf T}\Sigma t/2}.
$$

右辺は [自由場のGaussian測度の構成](../MQFC6/index.md#thm-mqfc6-free-measure) による測定ベクトルの特性関数である。[確率ベクトルの特性関数収束定理](../../../解析系/F0/F0-00P6/index.md#thm-f0-00p6-levy-continuity-vector) をこの既知の極限法則に適用できる。従って有界Lipschitz関数の期待値が収束する。一般の有界連続関数 $g$ へ移すため、測定ベクトルを $V_n$、極限ベクトルを $V$ と書く。共分散の対角和は有界なので、ある $M$ で $E|V_n|^2,E|V|^2\le M$。従って $P(|V_n|>R),P(|V|>R)\le M/R^2$ である。

$B=\|g\|_\infty$ とし、整数 $l\ge1$ に対して $g_l(x)=\inf_y(g(y)+l|x-y|)$ と置く。$-B\le g_l\le g\le B$。三角不等式により $g_l(x)\le g_l(z)+l|x-z|$、逆向きも成立するから $g_l$ は有界Lipschitz関数である。固定した閉球の少し外まで含めれば、$g$ はコンパクト集合上で一様連続である。詳しくは、任意の $\eta>0$ に対し $0<\delta<1$ を選び、$|x-y|<\delta$ なら $|g(x)-g(y)|<\eta$ とする（$x,y$ は半径 $R+1$ の閉球内）。$|x-y|\ge\delta$ なら $l\delta\ge2B$ と選べば $g(y)+l|x-y|\ge B\ge g(x)$。近い $y$ では $g(y)+l|x-y|\ge g(x)-\eta$ である。従って球内で $0\le g-g_l\le\eta$。

$$
|E[g(V_n)]-E[g(V)]|
\le 2\eta+4BM/R^2+|E[g_l(V_n)]-E[g_l(V)]|.
$$

まず $R$ を大きくし、$\eta$ を小さく選び、それに対応する $l$ を固定して $n\to\infty$ とすれば、右辺を任意に小さくできる。従って [確率測度の狭義収束](../../../解析系/OTR/OTR3/index.md#def-otr3-narrow) が成立する。
<!-- proof-end -->

この結果は試験関数で測った量についてである。場の一点の値は同じ評価を受けない。例えば体積極限を先に取った場合、$d=2$ の点での分散は周波数円板 $|p|\le\Lambda$ に限っても

$$
\frac1{(2\pi)^2}\int_{|p|\le\Lambda}\frac{dp}{|p|^2+m^2}
=\frac1{4\pi}\log(1+\Lambda^2/m^2)
$$

である。極座標で角度積分を $2\pi$、動径積分を $\int_0^\Lambda r/(r^2+m^2)\,dr$ として計算した。円板は周波数箱に含まれるので箱の積分も発散する。点での測定と試験関数による測定の違いが、次講の自己収縮の問題につながる。

## 4. 確率測度の極限をどう取り出すか

自由場では極限の特性関数を既に知っていた。相互作用場では極限候補が分からないことが多い。そのときは測定ベクトルの法則が遠くへ逃げないことを先に示す。

[一様緊密性](../../../解析系/OTR/OTR3/index.md#def-otr3-tight) とは、確率測度族に対し任意の $\varepsilon>0$ で共通のコンパクト集合 $K$ が存在し、全測度が $K$ の外に置く確率が $\varepsilon$ 以下になる性質である。$\mathbb R^r$ なら閉有界集合はコンパクトである。例えば $\delta_{1/n}$ は $K=[0,1]$ に全質量が入る一方、$\delta_n$ はどの有界集合にも全てを入れられない。

[確率測度の狭義収束](../../../解析系/OTR/OTR3/index.md#def-otr3-narrow) はすべての有界連続関数の積分の収束である。[Prokhorovのコンパクト性定理](../../../解析系/OTR/OTR3/index.md#thm-otr3-prokhorov) により、完備可分距離空間上で一様緊密な確率測度列は狭義収束する部分列を持つ。ここではこの既習定理を用いて、場の測定に必要な評価を証明する。

<a id="thm-mqfc13-moment-tight"></a>

<!-- formal-statement-start -->
> **定理（測定ベクトルの二次評価による部分列抽出）**
> $X_n=(X_{n,1},\ldots,X_{n,r})$ は実確率ベクトルとし、各 $j$ について

$$
\sup_n E|X_{n,j}|^2\le M_j<\infty
$$

> とする。このとき法則の族は一様緊密であり、狭義収束する部分列が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

座標ごとの二次モーメントは大きな測定値の確率を抑える。各座標の範囲を同時に選べば、共通の閉立方体を得られる。

<!-- proof-start -->
### 証明

$R>0$ とする。$|X_{n,j}|>R$ 上では $|X_{n,j}|^2/R^2>1$ だから、指示関数をこの比で上から抑え、期待値を取ると $P(|X_{n,j}|>R)\le M_j/R^2$ となる。

$X_n$ が $[-R,R]^r$ の外にあることは、少なくとも一座標が範囲を越えることと同値である。和集合の確率の上界から

$$
P(X_n\notin[-R,R]^r)
\le \frac{\sum_{j=1}^r M_j}{R^2}.
$$

任意の $\varepsilon>0$ に対して $R>\sqrt{(\sum_j M_j)/\varepsilon}$ を取れば、この上界は全ての $n$ で $\varepsilon$ 以下である。閉立方体はコンパクトなので [一様緊密性](../../../解析系/OTR/OTR3/index.md#def-otr3-tight) を満たす。$\mathbb R^r$ は通常の距離で完備かつ可分であり、[Prokhorovのコンパクト性定理](../../../解析系/OTR/OTR3/index.md#thm-otr3-prokhorov) の仮定を満たす。よって収束部分列が存在する。
<!-- proof-end -->

一つの部分列が得られても全列が収束するとは限らない。例えば $X_{2n}=0$、$X_{2n+1}=1$ なら全体は $[0,1]$ にあるが、偶数列と奇数列の極限が異なる。有界連続関数 $g(x)=x/(1+|x|)$ の期待値はそれぞれ0と $1/2$ である。

### 可算個の測定を同じ部分列で扱う

試験関数列 $f_1,f_2,\ldots$ を固定する。各 $j$ について $E|\Phi_n(f_j)|^2\le M_j$ が一様に成り立つとする。第1座標の法則で収束部分列を取り、その中から最初の2座標の同時法則が収束する部分列を取り、以下繰り返す。第 $r$ 段階の部分列を昇順に並べ、その第 $r$ 要素を $n_r$ とすれば $n_{r+1}>n_r$ であり、固定した $k$ に対して $r\ge k$ の $n_r$ は第 $k$ 段階の部分列に含まれる。

従ってこの一つの列上で全ての有限先頭ブロックの法則が収束する。座標を忘れる射影 $\pi:\mathbb R^{k+1}\to\mathbb R^k$ と有界連続関数 $g$ に対し $g\circ\pi$ も有界連続だから、極限の射影は短いブロックの極限と一致する。任意の有限座標集合はある先頭ブロックに入るので整合的である。[Kolmogorov拡張定理](../../../解析系/STO/STO3/index.md#thm-sto3-kolmogorov-extension) によって可算座標の確率法則を得る。

ただし、ここで構成したのは可算座標の法則である。全試験関数に連続線形に作用する緩増加分布が確率1で得られるとはまだ示していない。線形関係の保存、試験関数位相での連続性、あるいは [Bochner–Minlosの定理](../MQFC6/index.md#thm-mqfc6-minlos) を適用する特性汎関数の連続性などが別途必要である。例えば独立な標準Gaussianを任意の二つの同一試験関数に別々に割り当てれば、その二測定が等しいという線形関係さえ失う。整合性の対象を明確にしておく必要がある。

## 5. 法則が収束しても相関が収束するとは限らない

Schwinger関数は測定の積の期待値であり、積は一般には有界関数ではない。$X_n$ が確率 $1/n^2$ で $n$、残りで0を取る場合を考える。任意の有界連続 $g$ について

$$
E[g(X_n)]-g(0)=\frac{g(n)-g(0)}{n^2}\to0
$$

だが $E[X_n^2]=1$ であり極限の二次モーメント0へ収束しない。法則は収束し、一様緊密で、二次モーメントも一様有界なのに、二次の相関は保存されない。

必要なのは確率の尾だけでなく、積分の尾を小さくする条件である。[一様可積分性](../../../解析系/F0/F0-00P4A/index.md#def-f0-00p4a-ui) はその条件を与える。確率空間が近似ごとに異なっても、尾部期待値だけを用いる条件はそのまま意味を持つ。

<a id="thm-mqfc13-ui-limit"></a>

<!-- formal-statement-start -->
> **定理（狭義極限への非有界観測量の移行）**
> $\mathbb R^r$ 上の確率測度列 $\mu_n$ が $\mu$ に狭義収束するとする。連続関数 $G:\mathbb R^r\to\mathbb R$ が各 $\mu_n$ で可積分であり、

$$
\lim_{K\to\infty}\sup_n
\int_{\{|G|>K\}}|G|\,d\mu_n=0
$$

> を満たすなら、$G$ は $\mu$ でも可積分であり、

$$
\lim_{n\to\infty}\int G\,d\mu_n=\int G\,d\mu.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$G$ の値を上下から切って有界連続関数にする。切った関数の期待値は狭義収束で移せる。近似測度だけでなく極限測度の切り落とした部分も制御する。

<!-- proof-start -->
### 証明

$K>0$ で $G_K=\max(-K,\min(K,G))$ と置く。$G_K$ は有界連続であり、

$$
|G-G_K|=(|G|-K)_+\le |G|\mathbf1_{\{|G|>K\}},
$$

ただし $a_+=\max(a,0)$ と書く。右辺の積分の全 $n$ に関する上限を $a(K)$ とすると $a(K)\to0$ である。

極限測度での可積分性を先に示す。ある $K_0$ で $a(K_0)\le1$ とでき、$\int |G|\,d\mu_n\le K_0+1$ である。任意の $M>0$ について $\min(|G|,M)$ は有界連続だから

$$
\int\min(|G|,M)\,d\mu
=\lim_n\int\min(|G|,M)\,d\mu_n
\le K_0+1.
$$

$M\to\infty$ で[単調収束定理](../../../解析系/F0/F0-00D2B/index.md#ref-limit-integral-exchange) を用いれば $\int |G|\,d\mu\le K_0+1$。同様に有界連続関数 $\min((|G|-K)_+,M)$ の積分は極限でも $a(K)$ 以下であり、$M\to\infty$ で

$$
\int (|G|-K)_+\,d\mu\le a(K).
$$

よって三角不等式から

$$
\begin{aligned}
\left|\int G\,d\mu_n-\int G\,d\mu\right|
&\le 2a(K)+
\left|\int G_K\,d\mu_n-\int G_K\,d\mu\right|.
\end{aligned}
$$

固定した $K$ で最後の項は零に収束する。上極限は $2a(K)$ 以下であり、$K\to\infty$ で結論を得る。
<!-- proof-end -->

実際に必要な一様可積分性は高次モーメントで確認できる。例えば $G(x)=x_1\cdots x_r$ なら、$q>1$ について $|G(x)|^q\le\|x\|^{rq}$ なので、$\sup_n E\|X_n\|^{rq}<\infty$ があれば

$$
E[|G(X_n)|\mathbf1_{\{|G(X_n)|>K\}}]
\le K^{1-q} E|G(X_n)|^q.
$$

右辺は $K\to\infty$ で一様に零となる（[高次モーメントの一様有界性から一様可積分性](../../../解析系/F0/F0-00P4A/index.md#thm-f0-00p4a-lp-ui)）。従って多点相関を法則の極限へ移せる。

自由場では各固定試験関数の分散が第3節の定理により収束し、有界である。[Gaussian Schwinger関数のWick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) による $E|X|^{2s}=(2s-1)!!(EX^2)^s$ は、$2s$ 個の同一測定の対分割が $(2s-1)(2s-3)\cdots1$ 通りあることから得られる。有限測定ベクトルの $2r$ 次ノルムは $(\sum_j X_j^2)^r\le r^{r-1}\sum_j |X_j|^{2r}$ で抑えられる。これは凸関数 $u^r$ の等重み平均への不等式である。よって $q=2$ を上の評価へ入れ、すべての固定次数の混合モーメントの収束を得る。相互作用場ではGaussian対分割に頼れないため、対応する一様評価を別に証明する必要がある。

## 6. 演習

### 演習 MQFC13-A1：自由度を数える

- Level: A

$d=2,L=2\pi,\Lambda=1.8$ とする。許容モード数と独立な実係数の数を求めよ。

<!-- solution-start -->
$p_k=k$ なので $|k_j|\le1.8$ を満たす整数は各座標で $-1,0,1$ の3個。よって $3^2=9$ モード。零モードが1個、残り8個は正負の4対である。各対に余弦・正弦係数を一つずつ割り当てるため、実係数は $1+2\cdot4=9$ 個となる。
<!-- solution-end -->

### 演習 MQFC13-A2：零モードの測定

- Level: A

$d=1,L=4,m=2,\Lambda=1$ とし、$\int f=3$、$\int g=-2$ である実試験関数を考える。共分散と $f$ の測定の分散を求めよ。

<!-- solution-start -->
最小非零周波数は $2\pi/4=\pi/2>1$ なので零モードのみである。[有限モード自由場の共分散](#prop-mqfc13-box-covariance) に $p_0=0$ を代入すると $C(f,g)=3(-2)/(4\cdot4)=-3/8$、$C(f,f)=9/16$。二測定は同じ実係数の反対向きの倍数なので負の共分散も可能である。
<!-- solution-end -->

### 演習 MQFC13-A3：共通の箱

- Level: A

全 $n$ で $EX_{n,1}^2\le2$、$EX_{n,2}^2\le3$ とする。確率 $0.99$ 以上が入る共通の閉立方体を求めよ。

<!-- solution-start -->
[測定ベクトルの二次評価](#thm-mqfc13-moment-tight) の証明の上界は $P(X_n\notin[-R,R]^2)\le5/R^2$。$5/R^2\le0.01$ には $R^2\ge500$ が必要なので、例えば $R=23$ とすれば $5/529<0.01$。閉立方体 $[-23,23]^2$ が全 $n$ で要求を満たす。
<!-- solution-end -->

### 演習 MQFC13-A4：逃げる点質量

- Level: A

$\mu_n=\delta_{n}$ は一様緊密か。$\nu_n=\delta_{1/n}$ はどうか。後者の狭義極限を求めよ。

<!-- solution-start -->
任意のコンパクト集合 $K\subset\mathbb R$ はある $R$ に対して $[-R,R]$ に含まれる。$n>R$ なら $\mu_n(K^c)=1$ なので $\varepsilon=1/2$ に対する共通集合が存在しない。

一方 $\nu_n$ は $[0,1]$ に全質量を置くので [一様緊密性](../../../解析系/OTR/OTR3/index.md#def-otr3-tight) を満たす。任意の有界連続関数 $g$ について

$$
\int g\,d\nu_n=g(1/n)\to g(0)=\int g\,d\delta_0.
$$

従って [狭義収束](../../../解析系/OTR/OTR3/index.md#def-otr3-narrow) の極限は $\delta_0$。
<!-- solution-end -->

### 演習 MQFC13-B1：点分散の次元依存

- Level: B

周波数円板・区間で切断した無限体積自由場の点分散を $d=1,2$ で求め、$\Lambda\to\infty$ を比較せよ。

<!-- solution-start -->
$d=1$ では偶関数の積分により

$$
\frac1{2\pi}\int_{-\Lambda}^{\Lambda}\frac{dp}{p^2+m^2}
=\frac1{\pi m}\arctan(\Lambda/m).
$$

ここで $p=mu$ と置くと $dp=m\,du$ であり $\int du/(1+u^2)=\arctan u$。極限は $1/(2m)$。

$d=2$ では極座標の面積要素は $r\,dr\,d\theta$。角度を積分し $u=r^2+m^2$、$du=2r\,dr$ と置くと

$$
\frac1{2\pi}\int_0^\Lambda\frac{r\,dr}{r^2+m^2}
=\frac1{4\pi}[\log u]_{m^2}^{\Lambda^2+m^2}.
$$

従って $\log(1+\Lambda^2/m^2)/(4\pi)$ は発散する。低次元で有限だった一点の分散が高次元でも有限とは限らない。
<!-- solution-end -->

### 演習 MQFC13-B2：有界な二次評価の落とし穴

- Level: B

$Y_n$ は確率 $1/(2n^2)$ ずつで $n$ と $-n$、残りで0を取る。法則の狭義極限、平均、分散を求め、$\{|Y_n|^2\}$ の一様可積分性を判定せよ。

<!-- solution-start -->
有界連続 $g$ について

$$
E[g(Y_n)]=g(0)+\frac{g(n)+g(-n)-2g(0)}{2n^2}.
$$

絶対誤差は $2\|g\|_\infty/n^2$ 以下なので極限法則は $\delta_0$。対称性から $EY_n=0$、$EY_n^2=2n^2/(2n^2)=1$。従って分散は1である。任意の $K>0$ で $n>\sqrt K$ を取れば $E[Y_n^2\mathbf1_{\{Y_n^2>K\}}]=1$。全 $n$ の上限は1なので [一様可積分性](../../../解析系/F0/F0-00P4A/index.md#def-f0-00p4a-ui) が成立せず、二次モーメントが極限で失われる。
<!-- solution-end -->

### 演習 MQFC13-B3：混合相関に必要な次数

- Level: B

$(X_n,Y_n)$ の法則が $(X,Y)$ の法則へ狭義収束し、$\sup_n E(|X_n|^6+|Y_n|^6)\le M$ とする。$E[X_n^2Y_n]$ が $E[X^2Y]$ に収束することを証明せよ。

<!-- solution-start -->
$G(x,y)=x^2y$ は連続で、重み $2/3,1/3$ の相加相乗平均から

$$
|G|^2=|x|^4|y|^2
\le \frac23|x|^6+\frac13|y|^6.
$$

よって $E|G(X_n,Y_n)|^2\le M$。$|G|>K$ 上では $|G|\le |G|^2/K$ なので、尾部積分は $M/K$ 以下となる。これは $n$ によらず零へ行く。[狭義極限への非有界観測量の移行](#thm-mqfc13-ui-limit) により極限の $G$ も可積分で、求める期待値の収束を得る。
<!-- solution-end -->

### 演習 MQFC13-B4：一意性を別に示す

- Level: B

$\mathbb R^r$ 上の一様緊密な確率測度列について、全ての狭義収束部分列の極限が同じ $\mu$ であると仮定する。全列が $\mu$ に狭義収束することを示せ。

<!-- solution-start -->
収束しないと仮定する。[狭義収束の定義](../../../解析系/OTR/OTR3/index.md#def-otr3-narrow) より有界連続 $g$ と $\varepsilon>0$ が存在し、ある部分列の全項で $|\int g\,d\mu_{n_j}-\int g\,d\mu|\ge\varepsilon$ となる。この部分列も同じコンパクト集合で一様緊密である。[Prokhorovのコンパクト性定理](../../../解析系/OTR/OTR3/index.md#thm-otr3-prokhorov) によりさらに収束する部分列を選べる。仮定により極限は $\mu$ だから $g$ の積分の差は零に収束する。これは下界 $\varepsilon$ に矛盾する。
<!-- solution-end -->

### 演習 MQFC13-B5：同じ測定の線形関係を保存する

- Level: B

全 $n$ で $Z_n=X_n+2Y_n$ が確率1で成り立ち、$(X_n,Y_n,Z_n)$ の法則が $(X,Y,Z)$ の法則へ狭義収束するとする。極限でも $Z=X+2Y$ が確率1で成り立つことを、非有界な二次モーメントを仮定せずに示せ。

<!-- solution-start -->
$h(x,y,z)=\min(1,|z-x-2y|)$ は有界連続で非負である。仮定から全 $n$ で $E[h(X_n,Y_n,Z_n)]=0$。[狭義収束](../../../解析系/OTR/OTR3/index.md#def-otr3-narrow) を適用すると $E[h(X,Y,Z)]=0$。各整数 $k\ge1$ について $P(h\ge1/k)\le kE[h]=0$ なので、$\{h>0\}=\bigcup_{k\ge1}\{h\ge1/k\}$ も確率零である。従って $Z-X-2Y=0$ が確率1で成立する。可算個の線形関係は零集合の可算和により同時に保存できるが、全試験関数への連続な拡張にはさらに評価が必要である。
<!-- solution-end -->

### 演習 MQFC13-C1：自由場の四点相関の極限

- Level: C

$L_n,\Lambda_n\to\infty$ とし、実試験関数 $f,g$ に対する自由場の測定を $X_n=\Phi_{L_n,\Lambda_n}(f)$、$Y_n=\Phi_{L_n,\Lambda_n}(g)$ とする。分散を $a_n,b_n$、共分散を $c_n$ とし、極限を $a,b,c$ と書く。四点相関 $E[X_n^2Y_n^2]$ の極限を求めよ。また狭義収束からこの結果を得るための一様可積分性を具体的に確認せよ。

<!-- solution-start -->
[有限モード共分散の二重極限](#thm-mqfc13-free-limit) により $a_n\to a,b_n\to b,c_n\to c$ であり、測定ベクトルは極限自由場の対応するベクトル $(X,Y)$ へ狭義収束する。

[Gaussian Schwinger関数のWick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) に $X_n,X_n,Y_n,Y_n$ の四測定を代入する。添字1,2,3,4の三対分割の寄与は $(12)(34)$ が $a_nb_n$、$(13)(24)$ と $(14)(23)$ が各 $c_n^2$。従って

$$
E[X_n^2Y_n^2]=a_nb_n+2c_n^2\to ab+2c^2.
$$

積分の尾からも同じ結論を得られる。$G(x,y)=x^2y^2$ と置き、$A=\sup_n a_n$、$B=\sup_n b_n$ は有限とする。対分割の数は $7\cdot5\cdot3\cdot1=105$ だから $EX_n^8=105a_n^4$、$EY_n^8=105b_n^4$。Cauchy–Schwarzの不等式に $|X_n|^4,|Y_n|^4$ を入れると

$$
\begin{aligned}
E|G(X_n,Y_n)|^2
&=E[X_n^4Y_n^4]\\
&\le(105a_n^4\cdot105b_n^4)^{1/2}\\
&\le105 A^2 B^2.
\end{aligned}
$$

したがって $|G|>K$ 上の積分は $105 A^2B^2/K$ 以下である。[狭義極限への非有界観測量の移行](#thm-mqfc13-ui-limit) が適用でき、$E[X_n^2Y_n^2]\to E[X^2Y^2]$。極限ベクトルも中心化Gaussianなので同じ三対分割を使えば $E[X^2Y^2]=ab+2c^2$ であり、二通りの計算が一致する。分散が零の退化した場合も式は成立する。
<!-- solution-end -->

## 7. 次の講義

有限体積・周波数切断によって有限次元の積分ができる。一様緊密性は極限候補の存在、一意性は全列の収束、一様可積分性は相関の収束を支える。無限次元の場としての実現やOS条件の保存もそれぞれ確認する必要がある。自由場では試験関数の急減少性とGaussian構造がこれらの評価の出発点になる。

次講では、二次元以上で発散し得る同一点の分散を差し引き、場の積を扱うためのWick多項式を構成する。
