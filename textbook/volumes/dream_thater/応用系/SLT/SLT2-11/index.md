# SLT2-11 NNGPとNTKの違い

[前章の有限時間NTK近似](../SLT2-10/index.md#thm-slt2-10-finite-time-flow)では、幅を大きくするとニューラルネットの**訓練中の変化**を一定の核で近似できた。一方、ランダム初期化したネットの**出力そのもの**も、幅を増やすとGaussian分布へ近づく。この二つは同じ核だろうか。

答えは一般に**違う**。出力の揺らぎを測る共分散が **NNGP**（neural network Gaussian process）の核であり、パラメータを動かしたときの予測の感度を測るのが **NTK**（neural tangent kernel）である。同じ初期化から生まれるが、測っている対象が違う。さらに、学習後の予測がGaussianになっても、それは直ちに[Gaussian process回帰の事後分布](../../ML/ML2-12/index.md#thm-ml2-12-posterior)ではない。

本章でできるようになることは次の五つである。

1. 同じ二層網から初期出力共分散とNTKを別々に導き、差の正半定値性を確認する。
2. 固定した有限個の入力における初期Gaussian極限を、特性関数の計算から示す。
3. 多層網のNNGP再帰とNTK再帰で、どの項が異なるか説明する。
4. 固定した有限時間の学習後の平均・共分散を計算する。
5. 学習によるGaussian分布と、観測データで条件付けたGP事後分布を区別する。

## 1. 同じ網の二種類の行列

固定した入力 $x_1,\ldots,x_n\in\mathbb R^d$ に、バイアス用の1を付けた $\xi_i=(x_i^{\mathsf T},1)^{\mathsf T}\in\mathbb R^{d+1}$ を用いる。前章と同じ二層網を、幅 $m$ に対して

$$
f_m(x)=\frac1{\sqrt m}\sum_{r=1}^m a_r\sigma(q_r^{\mathsf T}\xi(x))
$$

とする。以下の有限幅の計算では $\sigma\in C^2(\mathbb R)$、$|\sigma|\le M_0$、$|\sigma'|\le M_1$、$|\sigma''|\le M_2$ を全実数で仮定する。ニューロンごとの $q_r$ は同一分布 $\nu$ から独立に採り、$a_r$ は独立な等確率符号 $\pm1$ とする。二つの系列は独立とする。固定した入力集合では $\max_i\|\xi_i\|_2<\infty$ である。

初期出力 $F_m(0)=(f_m(x_i))_{i=1}^n$ の平均は零である。各ニューロンの関数値ベクトルを $v(q)=(\sigma(q^{\mathsf T}\xi_i))_{i=1}^n$ と書くと

$$
F_m(0)=\frac1{\sqrt m}\sum_{r=1}^m a_rv(q_r).
$$

係数 $a_r$ の平均零と分散1から、異なるニューロン間の交差項は期待値で消える。従って幅 $m$ に**依存しない**初期共分散が現れる。

<a id="def-slt2-11-nngp"></a>

<!-- formal-statement-start -->
> **定義（初期NNGP共分散）**  上記の二層網と初期化に対し、有限入力集合 $X=(x_1,\ldots,x_n)$ 上のNNGP共分散行列を

$$
\Sigma_{ij}=\mathbb E_{q\sim\nu}\bigl[\sigma(q^{\mathsf T}\xi_i)\sigma(q^{\mathsf T}\xi_j)\bigr]
$$

> と定める。初期出力の共分散はすべての $m\ge1$ で $\operatorname{Cov}(F_m(0))=\Sigma$ である。退化した $\Sigma$ も許す。
<!-- formal-statement-end -->

この定義では学習していない。$\Sigma$ は出力をもう一度ランダム初期化したときの共変動である。[正半定値核の有限次元Gaussian分布](../../ML/ML2-12/index.md#thm-ml2-12-consistency)の共分散になれることを、次の直接計算で確かめる。

<!-- definition-example-start: def-slt2-11-nngp -->
**定義の確認**。$d=1$、$x_1=-1,x_2=1$、$\sigma=\tanh$、$q=(u,0)^{\mathsf T}$ とし、$u=\pm c$ を等確率で採る。$c=\tfrac12\log 3$ とすると $\tanh c=1/2$ だから、いずれの符号でも $v(q)=\pm(-1/2,1/2)^{\mathsf T}$ となる。よって

$$
\Sigma=\mathbb E[v(q)v(q)^{\mathsf T}]
=\frac14\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

任意の $z=(z_1,z_2)^{\mathsf T}$ で $z^{\mathsf T}\Sigma z=(z_1-z_2)^2/4\ge0$。従って対称・正半定値という共分散の条件を満たす。ただし $z=(1,1)^{\mathsf T}$ で零になるため正定値ではない。
<!-- definition-example-end -->

## 2. なぜ初期出力はGaussianになるか

有限幅の各 $a_rv(q_r)$ は通常Gaussianではない。だが平均零の独立ベクトルを $1/\sqrt m$ 倍して加えると、固定した有限個の点ではGaussian極限が得られる。ここで「固定した有限個」は重要で、幅とともに入力点数を増やす主張は含めない。

<a id="thm-slt2-11-initial-gp"></a>

<!-- formal-statement-start -->
> **定理（初期出力の有限次元Gaussian極限）**  第1節の独立初期化と有界な活性化を仮定する。固定 $n$、固定入力 $x_1,\ldots,x_n$ に対し、$m\to\infty$ で

$$
F_m(0)\ \xrightarrow{\mathrm d}\ G_X,\qquad G_X\sim N_n(0,\Sigma)
$$

> が成立する。$\Sigma$ は[初期NNGP共分散](#def-slt2-11-nngp)であり、特異でもよい。入力の有限部分集合どうしで共分散は整合するため、得られた有限次元分布は平均零のGaussian processを定める。
<!-- formal-statement-end -->

### 証明の見取り図

ベクトルの任意の一方向 $h$ への射影を取る。その射影は有界な独立同分布確率変数の和なので、特性関数を二次まで展開できる。方向を全て動かせばGaussianベクトルが決まり、入力の部分集合を取っても同じ共分散が残る。

<!-- proof-start -->
### 証明

$h\in\mathbb R^n$ を固定し、$U_r=a_r\sum_i h_i\sigma(q_r^{\mathsf T}\xi_i)$ とする。$U_r$ は独立同分布、$\mathbb EU_r=0$、$|U_r|\le M_0\sum_i|h_i|$ なので三次絶対モーメントも有限である。分散を直接展開すると

$$
\begin{aligned}
\mathbb EU_r^2
&=\sum_{i,j}h_ih_j\mathbb E[a_r^2\sigma(q_r^{\mathsf T}\xi_i)\sigma(q_r^{\mathsf T}\xi_j)]\\
&=h^{\mathsf T}\Sigma h=:v_h\ge0.
\end{aligned}
$$

固定 $t\in\mathbb R$ に対し、$e^{iz}=1+iz-z^2/2+O(|z|^3)$ を $z=tU_1/\sqrt m$ に適用して期待値を取る。剰余の絶対値は $C_{h,t}m^{-3/2}$ 以下だから

$$
\mathbb E e^{itU_1/\sqrt m}
=1-\frac{t^2v_h}{2m}+O(m^{-3/2}).
$$

各 $U_r$ の独立性から、射影 $h^{\mathsf T}F_m(0)$ の特性関数はこの $m$ 乗である。$m\log(1+z_m)\to-t^2v_h/2$ を使うと

$$
\mathbb E e^{it h^{\mathsf T}F_m(0)}
=\left(1-\frac{t^2v_h}{2m}+O(m^{-3/2})\right)^m
\longrightarrow e^{-t^2v_h/2}.
$$

右辺は平均零・分散 $v_h$ の正規分布の特性関数である。$v_h=0$ ならその射影は各幅でも分散零で、確率1で零に等しい。

$h$ は任意なので、上の計算は初期出力ベクトルの**同時特性関数**について

$$
\varphi_{F_m(0)}(h)\longrightarrow
\exp\left(-\frac12h^{\mathsf T}\Sigma h\right)
$$

を示している。右辺は平均零・共分散 $\Sigma$ のGaussianベクトルの同時特性関数である。[確率ベクトルの特性関数収束定理](../../../解析系/F0/F0-00P6/index.md#thm-f0-00p6-levy-continuity-vector)から $F_m(0)\Rightarrow G_X$ が従う。

最後に、入力の一部を抜き出すと $\Sigma$ の対応する行・列を抜き出すだけであり、Gaussianベクトルの周辺分布もその共分散を持つ。[有限次元分布の整合構成](../../ML/ML2-12/index.md#thm-ml2-12-consistency)を適用できる。これは関数の各有限点における分布を定めるのであって、連続な標本路を自動保証するものではない。$\square$
<!-- proof-end -->

## 3. NNGPは出力、NTKは感度を測る

同じ初期化で、今度は出力係数 $a_r$ だけでなく $q_r$ も学習可能とする。訓練点の勾配を一つずつ計算すると

$$
\partial_{a_r}f_m(x_i)=\frac{\sigma(q_r^{\mathsf T}\xi_i)}{\sqrt m},\qquad
\nabla_{q_r}f_m(x_i)=\frac{a_r\sigma'(q_r^{\mathsf T}\xi_i)}{\sqrt m}\xi_i.
$$

従って同じニューロンのパラメータブロックについて勾配内積を取り、$r$ で和を取った $K_m(0)=J_mJ_m^{\mathsf T}$ は、関数値の積と微分の積の**二項**からできる。[前章の接線核公式](../SLT2-10/index.md#def-slt2-10-infinite-width-ntk)で定めた極限を、NNGPと並べて書き直す。

<a id="def-slt2-11-contrast"></a>

<!-- formal-statement-start -->
> **定義（初期NNGPとNTKの対照）**  第1節の二層網と独立初期化の下で、初期NNGP共分散 $\Sigma$ と、両パラメータ群を学習する初期NTK極限 $\Theta$ を

$$
\begin{aligned}
\Sigma_{ij}&=\mathbb E_q[\sigma(q^{\mathsf T}\xi_i)\sigma(q^{\mathsf T}\xi_j)],\\
\Theta_{ij}&=\Sigma_{ij}+(\xi_i^{\mathsf T}\xi_j)
\mathbb E_q[\sigma'(q^{\mathsf T}\xi_i)\sigma'(q^{\mathsf T}\xi_j)]
\end{aligned}
$$

> とする。$\Sigma$ はランダム出力の**共分散**、$\Theta$ は全パラメータ勾配の**Gram行列**の幅極限であり、定義上同一ではない。
<!-- formal-statement-end -->

<a id="thm-slt2-11-difference"></a>

<!-- formal-statement-start -->
> **定理（二層網のNNGPとNTKの差）**  [初期NNGPとNTKの対照](#def-slt2-11-contrast)の条件の下で、$\Sigma$、$\Theta$ は対称正半定値であり、$\Theta-\Sigma$ も正半定値である。従って任意の $h\in\mathbb R^n$ に対し

$$
h^{\mathsf T}\Theta h\ge h^{\mathsf T}\Sigma h\ge0.
$$

> ただし両者の固有ベクトルや固有値が一般に等しいとは主張しない。出力係数 $a_r$ **だけ**を学習する模型では初期接線核の極限は $\Sigma$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

どの行列も列ベクトルとその転置の積の期待値として書く。差の行列は隠れパラメータの勾配だけを集めたGram行列であり、負にならない。

<!-- proof-start -->
### 証明

$v(q)=(\sigma(q^{\mathsf T}\xi_i))_i$ および $w_k(q)=(\sigma'(q^{\mathsf T}\xi_i)\xi_{ik})_i$（$1\le k\le d+1$）を使うと

$$
\Sigma=\mathbb E_q[v(q)v(q)^{\mathsf T}],\qquad
\Theta-\Sigma=\sum_{k=1}^{d+1}\mathbb E_q[w_k(q)w_k(q)^{\mathsf T}].
$$

任意の $h$ に対して、$h^{\mathsf T}\Sigma h=\mathbb E(h^{\mathsf T}v)^2\ge0$、また

$$
h^{\mathsf T}(\Theta-\Sigma)h
=\sum_{k=1}^{d+1}\mathbb E(h^{\mathsf T}w_k)^2\ge0.
$$

従って各行列は対称正半定値で、所定の不等式が得られる。$a_r$ しか学習しない場合は $\partial_{q_r}f_m$ をJacobianから除くので $K_m^{(a)}=(1/m)\sum_r v(q_r)v(q_r)^{\mathsf T}$ となり、独立平均の収束で $\Sigma$ が現れる。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-slt2-11-contrast -->
**定義の確認**。第1節の二点 $x_1=-1,x_2=1$ を使う。$\tanh'(\pm c)=1-\tanh^2c=3/4$ だから $\xi_1=(-1,1)^{\mathsf T}$、$\xi_2=(1,1)^{\mathsf T}$ の内積は対角が2、非対角が0。従って

$$
\Theta=\Sigma+\frac9{16}\begin{pmatrix}2&0\\0&2\end{pmatrix}
=\begin{pmatrix}11/8&-1/4\\-1/4&11/8\end{pmatrix}.
$$

和方向 $u_+=(1,1)^{\mathsf T}/\sqrt2$ と差方向 $u_-=(1,-1)^{\mathsf T}/\sqrt2$ で検算すると

$$
\begin{array}{c|cc}
&u_+&u_-\\\hline
\Sigma&0&1/2\\
\Theta&9/8&13/8
\end{array}
$$

となる。NNGPでは和方向への初期変動が全くない一方、NTKではその方向にも学習感度がある。$\Theta-\Sigma=(9/8)I_2$ も正定値である。逆に $\sigma\equiv1$ なら $\sigma'\equiv0$ なので $\Theta=\Sigma=\mathbf1\mathbf1^{\mathsf T}$ と一致するが、二点以上では特異である。核の一致も正定値性も自動ではない。
<!-- definition-example-end -->

## 4. 層を増やしたときの二つの再帰

二層網では差が「隠れ重みの勾配項」だった。多層網ではこの勾配が各層を逆向きに伝わるため、NNGPの共分散再帰に感度の累積を加えた別の再帰が生まれる。ここでは固定した入力集合と有限の深さ $L$ に限定し、**行列の各成分**ごとに比較する。

バイアスなしの全結合網を考え、入力の内積Gram行列を $Q^{(0)}_{ij}=d^{-1}x_i^{\mathsf T}x_j$ とする。各隠れ層の重みは独立な平均零・分散1のGaussianで、前の層の幅の平方根で割り、全隠れ層と最後の読み出し層を学習可能とする。第 $\ell$ 層に入る二つの前活性値のGaussian共分散を $Q^{(\ell-1)}$ としたときの非線形化後の期待値を使う。

<a id="def-slt2-11-recursion"></a>

<!-- formal-statement-start -->
> **定義（層ごとのNNGP・NTK再帰）**  有限の入力集合 $x_1,\ldots,x_n$、正半定値行列 $Q^{(0)}$、微分可能で期待値が存在する活性化 $\sigma$ を固定する。$\ell=1,\ldots,L$ に対し、$(U_i,U_j)$ を共分散 $Q^{(\ell-1)}$ の中心Gaussianベクトルの $(i,j)$ 成分とし、

$$
\begin{aligned}
Q^{(\ell)}_{ij}&=\mathbb E[\sigma(U_i)\sigma(U_j)],\\
D^{(\ell)}_{ij}&=\mathbb E[\sigma'(U_i)\sigma'(U_j)],\\
\Theta^{(0)}_{ij}&=Q^{(0)}_{ij},\\
\Theta^{(\ell)}_{ij}&=Q^{(\ell)}_{ij}
+\Theta^{(\ell-1)}_{ij}D^{(\ell)}_{ij}
\end{aligned}
$$

> を定める。$Q^{(\ell)}$ をNNGP共分散再帰、$\Theta^{(\ell)}$ を標準NTKパラメータ化の感度再帰と呼ぶ。最後の積は行列積ではなく**成分ごとの積**である。
<!-- formal-statement-end -->

一層目では $\Theta^{(1)}=Q^{(1)}+Q^{(0)}\odot D^{(1)}$。これは先ほどの二層網の式の、バイアスなし・Gaussian隠れ重み版に一致する。読み出し層への勾配が $Q^{(1)}$、第一層の重みへの勾配が $Q^{(0)}\odot D^{(1)}$ を作る。二層目では

$$
\Theta^{(2)}=Q^{(2)}+Q^{(1)}\odot D^{(2)}
+Q^{(0)}\odot D^{(1)}\odot D^{(2)}.
$$

最初の項は読み出し層、次は第二隠れ層、最後は第一隠れ層の勾配寄与に対応する。積の順序を追うと「ある層の重みを変えたとき、その後の層を通過して出力が変わる」連鎖律の構造が見える。[二層網のJacobian](../SLT2-08/index.md#thm-slt2-08-parameter-jacobian)を多層に延長する見取り図である。

この再帰式は**有限層・無限幅の初期化極限を記述する候補式**である。前向きのNNGP再帰は、独立Gaussian重みを条件付けた大数の法則で層ごとに説明できる。一方、深い網で全層を同時に微分したNTKがこの再帰に収束するには、逆伝播に現れる重みと前向きの活性値の依存を制御する追加の極限論証が要る。ここでは一層目のNTK公式を上で証明し、任意深さについてこの記号式を書いただけで厳密な収束定理や有限時間の学習保証を証明したとはしない。[前章の有限時間定理](../SLT2-10/index.md#thm-slt2-10-finite-time-flow)もそのまま任意深さへ延長しない。

<!-- definition-example-start: def-slt2-11-recursion -->
**定義の確認**

簡単な再帰の手計算をしておこう。$\sigma(u)=u$（この段落だけの代数的な例であり、前節の有界活性化仮定から外れる）では $Q^{(\ell)}=Q^{(0)}$、$D^{(\ell)}_{ij}=1$ なので

$$
\Theta^{(1)}=2Q^{(0)},\qquad
\Theta^{(2)}=3Q^{(0)},\qquad
\Theta^{(L)}=(L+1)Q^{(0)}.
$$

出力共分散は深さとともに増えないのに、学習可能なパラメータ群が増えると接線核は変わる。これは**再帰の算術検証**であり、深い線形網の訓練の大域定理ではない。
<!-- definition-example-end -->

## 5. 学習後に残るGaussian分布は何か

ここから再び第1節の有界活性化・二層網・独立な符号初期化へ戻る。訓練点を $X=(x_1,\ldots,x_n)$、固定した教師を $y\in\mathbb R^n$ とし、二乗損失 $\|F_m-y\|_2^2/2$ の**全パラメータ**連続勾配流を用いる。$1/n$ の因子は付けない。核は[初期NNGP共分散](#def-slt2-11-nngp) $\Sigma$ と[初期NTK](#def-slt2-11-contrast) $\Theta$ である。

初期化の確率分布が時間とともにどう変わるかを考える。前章の[有限時間NTK近似](../SLT2-10/index.md#thm-slt2-10-finite-time-flow)によれば、毎回の幅で得た**同じランダム初期出力**から始める固定核学習が実網を近似する。固定した有限時間を先に選んでから幅を大きくする順序である。

<a id="thm-slt2-11-trained-gp"></a>

<!-- formal-statement-start -->
> **定理（有限時間の学習後Gaussian極限）**  第1節の有界 $C^2$ 活性化・独立な符号初期化、固定した有限個の入力 $X$ と教師 $y$、両パラメータ群のEuclid勾配流を仮定する。任意の固定 $t\ge0$ で、幅 $m\to\infty$ の訓練予測は分布収束し、

$$
F_m(t)\xrightarrow{\mathrm d}H_X(t)
:=y+E_t(G_X-y),\qquad
E_t=e^{-t\Theta},\quad G_X\sim N_n(0,\Sigma).
$$

> 従って $H_X(t)$ の平均ベクトル $\mu_t$ と共分散行列 $V_t$ は

$$
\mu_t=(I-E_t)y,\qquad V_t=E_t\Sigma E_t^{\mathsf T}.
$$

> $\Theta$ は正半定値で足り、逆行列は不要である。この結論は固定 $t$ の有限入力分布であり、$t\to\infty$ や入力数の増大との極限交換を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

幅の大きい実網を同じ初期値の固定核曲線へ近づけ、その初期値が[初期Gaussian極限定理](#thm-slt2-11-initial-gp)でGaussianへ近づくことを使う。固定行列の指数とベクトルの和は連続写像なので、平均と共分散は最後に直接計算できる。

<!-- proof-start -->
### 証明

$e_m(0)=F_m(0)-y$ と書く。第1節の仮定は[前章の有限時間近似定理](../SLT2-10/index.md#thm-slt2-10-finite-time-flow)の仮定に含まれる。従って各固定 $t$ に対し

$$
\Delta_m(t):=F_m(t)-\{y+e^{-t\Theta}(F_m(0)-y)\}
\xrightarrow{\mathbb P}0.
$$

初期値は[初期出力の有限次元Gaussian極限](#thm-slt2-11-initial-gp)により $F_m(0)\Rightarrow G_X$。固定した $y$ と $E_t$ に対する写像 $z\mapsto y+E_t(z-y)$ は連続であるから

$$
y+E_t(F_m(0)-y)\xrightarrow{\mathrm d}
y+E_t(G_X-y).
$$

これに確率収束する誤差 $\Delta_m(t)$ を加えても分布極限は変わらない。実際、有界Lipschitz関数 $\phi$ の期待値の差は任意の $\varepsilon>0$ について $\operatorname{Lip}(\phi)\varepsilon+2\|\phi\|_\infty\mathbb P(\|\Delta_m(t)\|>\varepsilon)$ 以下だからである。まず $m\to\infty$、次に $\varepsilon\downarrow0$ とすれば分布収束の判定に戻る。最後に $\mathbb EG_X=0$、$\operatorname{Cov}(G_X)=\Sigma$ を代入すると

$$
\begin{aligned}
\mathbb EH_X(t)&=y+E_t(0-y)=(I-E_t)y,\\
H_X(t)-\mathbb EH_X(t)&=E_tG_X,\\
\operatorname{Cov}(H_X(t))
&=\mathbb E[E_tG_XG_X^{\mathsf T}E_t^{\mathsf T}]
=E_t\Sigma E_t^{\mathsf T}.
\end{aligned}
$$

$\Theta$ が特異でも指数行列は定義できる。[固定核のスペクトル解](../SLT2-09/index.md#thm-slt2-09-continuous-spectrum)では零固有値方向の指数係数は1のままであり、そこでは教師への近づき方を保証しない。$\square$
<!-- proof-end -->

例として第3節の二点模型では、$u_+$ 方向の初期共分散は零だがNTK固有値は $9/8$ である。教師 $y=(1,1)^{\mathsf T}$ を選ぶと、初期平均零から時刻 $t$ の平均は

$$
\mu_t=(1-e^{-9t/8})\begin{pmatrix}1\\1\end{pmatrix}.
$$

他方、初期に揺らぐ $u_-$ 方向の分散 $1/2$ は $e^{-13t/4}/2$ へ減衰する。**平均の動きはNTKが、初期乱数の分散の出発値はNNGPが決める**ことを、固有方向ごとに確認できる。

## 6. 訓練点以外とGP事後の違い

訓練点だけでなく、別の固定した評価点 $Z=(z_1,\ldots,z_k)$ の出力を調べる。これらも含めた有限点集合における初期Gaussianベクトルを $(G_X,G_Z)$ とし、その共分散を $\Sigma_{XX}$、$\Sigma_{ZX}$、$\Sigma_{ZZ}$ のブロックで表す。同様に、勾配内積の期待値を $\Theta_{XX}$、$\Theta_{ZX}$ と書く。以下、各記号は第1節・第3節の式へ訓練点または評価点を代入して定義する。$\Theta_{ZX}$ は $k\times n$ 行列である。

<a id="prop-slt2-11-test-covariance"></a>

<!-- formal-statement-start -->
> **命題（訓練点と評価点での学習後共分散）**  第5節の仮定の下で、固定した有限個の評価点 $Z$ と有限時間 $t$ に対し、評価出力の幅極限は次のGaussianベクトルである。

$$
H_Z(t)=G_Z-B_t(G_X-y),\qquad
B_t=\Theta_{ZX}\int_0^t e^{-s\Theta_{XX}}\,ds.
$$

> その平均・共分散は、$\Sigma_{XZ}=\Sigma_{ZX}^{\mathsf T}$ として

$$
\begin{aligned}
\mathbb EH_Z(t)&=B_ty,\\
\operatorname{Cov}(H_Z(t))
&=\Sigma_{ZZ}-B_t\Sigma_{XZ}-\Sigma_{ZX}B_t^{\mathsf T}
+B_t\Sigma_{XX}B_t^{\mathsf T}.
\end{aligned}
$$

> 特に $\Theta_{XX}$ が可逆なら $B_t=\Theta_{ZX}\Theta_{XX}^{-1}(I-e^{-t\Theta_{XX}})$ である。可逆でない場合にも積分式は定義できる。
<!-- formal-statement-end -->

### 証明の見取り図

評価点の出力変化は、評価点と訓練点のJacobian内積と訓練残差の積で決まる。固定核なら残差を行列指数で解いて時間積分する。初期のGaussianベクトルへの線形写像なので、共分散は積の展開で得られる。

<!-- proof-start -->
### 証明

有限幅で $Z$ の予測を $F_m^Z$、訓練残差を $e_m^X=F_m^X-y$ と書く。連鎖律により、訓練の勾配 $\dot\theta=-J_X^{\mathsf T}e_m^X$ を評価点の $J_Z$ に代入して

$$
\frac{dF_m^Z}{dt}=J_Z\dot\theta
=-J_ZJ_X^{\mathsf T}e_m^X
=-K_m^{ZX}(t)e_m^X(t).
$$

訓練点では[有限時間近似定理](../SLT2-10/index.md#thm-slt2-10-finite-time-flow)により $e_m^X(s)$ を $e^{-s\Theta_{XX}}e_m^X(0)$ に確率的に一様近似できる。評価点を含む**固定した有限集合**でも、前章の[核変動の証明](../SLT2-10/index.md#thm-slt2-10-finite-time-drift)のニューロン移動界を使える。実際、評価点でも $\|\xi(z_j)\|$ が有限で、$K_m^{ZX}$ の各積項に同じ有界性・Lipschitz性を適用できる。各時刻に対し移動量は $O_{\mathbb P}(m^{-1/2})$、初期交差核は独立平均だから $\Theta_{ZX}$ へ確率収束する。固定 $k,n,T$ で成分数は有限なので

$$
\sup_{0\le s\le T}\|K_m^{ZX}(s)-\Theta_{ZX}\|_{\mathrm{op}}
\xrightarrow{\mathbb P}0.
$$

また $\sup_{s\le T}\|e_m^X(s)\|\le\|e_m^X(0)\|=O_{\mathbb P}(1)$ は正半定値核による残差エネルギー減少から従う。上の微分方程式を $0$ から $t$ まで積分し、固定区間で両曲線の差を抑えると

$$
F_m^Z(t)=F_m^Z(0)
-\Theta_{ZX}\int_0^t e^{-s\Theta_{XX}}\,ds\,(F_m^X(0)-y)
+o_{\mathbb P}(1).
$$

[初期Gaussian極限定理](#thm-slt2-11-initial-gp)を結合入力 $(X,Z)$ に適用し、連続な線形写像で極限を取ると $H_Z=G_Z-B_t(G_X-y)$ を得る。平均は $\mathbb EG_X=\mathbb EG_Z=0$ より $B_ty$。中心化した変数 $G_Z-B_tG_X$ とその転置の積を展開すれば

$$
\begin{aligned}
\mathbb E[(G_Z-B_tG_X)(G_Z-B_tG_X)^{\mathsf T}]
&=\mathbb E[G_ZG_Z^{\mathsf T}]
-B_t\mathbb E[G_XG_Z^{\mathsf T}]\\
&\quad-\mathbb E[G_ZG_X^{\mathsf T}]B_t^{\mathsf T}
+B_t\mathbb E[G_XG_X^{\mathsf T}]B_t^{\mathsf T},
\end{aligned}
$$

すなわち所定の共分散式となる。$\Theta_{XX}$ が可逆なら、微分 $\frac d{ds}e^{-s\Theta_{XX}}=-\Theta_{XX}e^{-s\Theta_{XX}}$ を積分して $\int_0^t e^{-s\Theta_{XX}}ds=\Theta_{XX}^{-1}(I-e^{-t\Theta_{XX}})$ を得る。$\square$
<!-- proof-end -->

GP回帰での「事後」は、[回帰のGaussian process事前モデル](../../ML/ML2-12/index.md#def-ml2-12-gp-prior)を観測模型と結び、観測値を条件として確率を更新する操作である。一方、この章の $H_Z(t)$ は、ランダム初期化したネットを**確定した教師 $y$ へ向けて勾配流で動かした分布**である。前者は[GP事後公式](../../ML/ML2-12/index.md#thm-ml2-12-posterior)で $\Sigma$ と観測雑音の分散が決め、後者は $\Sigma$ に加えて $\Theta$、学習時間、学習対象パラメータが決める。観測モデルを後付けするだけで両者が一致するわけではない。

**一訓練点での反例。** 初期GP分散を $s^2>0$、NTK値を $\theta>0$、教師を $y\ne0$ とする。時刻 $t$ での勾配流の分布は第5節より

$$
N\bigl((1-e^{-\theta t})y,\ s^2e^{-2\theta t}\bigr).
$$

一方、潜在値 $G\sim N(0,s^2)$ を雑音分散 $\tau^2>0$ で $Y=G+\varepsilon$ と観測したGP回帰の事後分布は

$$
G\mid(Y=y)\sim N\left(
\frac{s^2}{s^2+\tau^2}y,\ 
\frac{s^2\tau^2}{s^2+\tau^2}\right).
$$

平均を一致させる時間を選ぶと $e^{-\theta t}=\tau^2/(s^2+\tau^2)$ だが、そのとき学習後分散は $s^2\tau^4/(s^2+\tau^2)^2$ であり、事後分散 $s^2\tau^2/(s^2+\tau^2)$ とは異なる。正の $s^2,\tau^2$ で両者の比は $\tau^2/(s^2+\tau^2)<1$ である。**平均を合わせても分散は一致しない。**

特別に、訓練点で雑音零かつ $\Theta$ が正定値の場合、固定核の $t\to\infty$ の形式的な到達値は教師 $y$ であり、雑音零GP事後も観測点で分散零になる。しかしこれは固定核模型における一致であって、有限幅の無限時間極限や標本外の事後分布まで等しいという証明ではない。

## 演習

### SLT2-11-A01 NNGP共分散を独立平均から計算する
- Level: A
- 目安時間: 12分

$d=1$、$x_1=0,x_2=1$、$\sigma=\tanh$、$q_r=(u_r,0)^{\mathsf T}$、$u_r=\pm\tfrac12\log3$ は独立等確率、$a_r=\pm1$ も独立等確率とする。$\mathbb EF_m(0)$ と $\operatorname{Cov}(F_m(0))$ を、任意の幅 $m$ で求めよ。得られた共分散の固有値を調べよ。

<!-- solution-start -->
#### 詳細解答

$\tanh0=0$、$\tanh(\pm\tfrac12\log3)=\pm1/2$ なので、$v(q_r)=(0,\pm1/2)^{\mathsf T}$。$\mathbb Ea_r=0$ より $\mathbb EF_m(0)=0$ である。二乗の期待値では $r\ne s$ の項は $\mathbb E(a_ra_s)=0$ で消え、

$$
\begin{aligned}
\operatorname{Cov}(F_m(0))
&=\frac1m\sum_{r=1}^m\mathbb E[a_r^2v(q_r)v(q_r)^{\mathsf T}]\\
&=\mathbb E[v(q)v(q)^{\mathsf T}]
=\begin{pmatrix}0&0\\0&1/4\end{pmatrix}.
\end{aligned}
$$

固有値は $0,1/4$。入力0の初期出力はどの幅でも零であり、Gaussian極限でも揺らぎがない。幅の増加が分散を零にするのではなく、有限幅で既に共分散は幅に依存しない。
<!-- solution-end -->

### SLT2-11-A02 JacobianからNTKを作る
- Level: A
- 目安時間: 14分

前問の二点模型で、出力係数 $a_r$ と隠れパラメータ $q_r\in\mathbb R^2$ の全成分を学習するとする。初期NTK極限 $\Theta$ を求め、$\Theta-\Sigma$ の正半定値性を、行列式・対角成分から検算せよ。

<!-- solution-start -->
#### 詳細解答

$\xi_1=(0,1)^{\mathsf T}$、$\xi_2=(1,1)^{\mathsf T}$ だから、内積行列は

$$
(\xi_i^{\mathsf T}\xi_j)_{ij}
=\begin{pmatrix}1&1\\1&2\end{pmatrix}.
$$

$\sigma'(0)=1$、$\sigma'(\pm c)=3/4$、$a_r^2=1$ を[接線核の定義](#def-slt2-11-contrast)に代入すると、

$$
\Theta-\Sigma
=\begin{pmatrix}1&3/4\\3/4&9/8\end{pmatrix},\qquad
\Theta=\begin{pmatrix}1&3/4\\3/4&11/8\end{pmatrix}.
$$

差の行列は対角成分 $1,9/8$ が非負で、行列式が $9/8-9/16=9/16>0$。従って正定値であり、もちろん正半定値。出力係数だけ学習した場合の核は前問の $\Sigma$ であって、この $\Theta$ ではない。
<!-- solution-end -->

### SLT2-11-A03 退化したGaussian極限
- Level: A
- 目安時間: 12分

独立な等確率符号 $\varepsilon_r=\pm1$ を使い、$F_m=m^{-1/2}\sum_{r=1}^m\varepsilon_r(1,-1)^{\mathsf T}$ とする。$F_m$ の平均・共分散を求め、任意の $h=(h_1,h_2)^{\mathsf T}$ について $h^{\mathsf T}F_m$ が極限でどんな正規分布になるか答えよ。

<!-- solution-start -->
#### 詳細解答

$\mathbb E\varepsilon_r=0$、$\mathbb E\varepsilon_r^2=1$ と異なる符号の独立性から

$$
\mathbb EF_m=0,\qquad
\operatorname{Cov}(F_m)=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

$h^{\mathsf T}F_m=(h_1-h_2)m^{-1/2}\sum_r\varepsilon_r$。符号和の特性関数は $(\cos(t/\sqrt m))^m\to e^{-t^2/2}$ なので、$h^{\mathsf T}F_m\Rightarrow N(0,(h_1-h_2)^2)$。$h_1=h_2$ なら射影は全幅で厳密に0。退化したGaussianベクトルとは、このような零分散方向を持つベクトルである。
<!-- solution-end -->

### SLT2-11-A04 一致する二つの核
- Level: A
- 目安時間: 10分

$\sigma(z)\equiv c$（$c\ne0$）の二層網について、固定した $n\ge2$ の入力における $\Sigma$ と $\Theta$ を求めよ。なぜ両者の一致から「良い学習ができる」とは言えないか。

<!-- solution-start -->
#### 詳細解答

$v(q)=c\mathbf1_n$ なので $\Sigma=c^2\mathbf1_n\mathbf1_n^{\mathsf T}$。また $\sigma'=0$ なので[差の定理](#thm-slt2-11-difference)の隠れ重み項はすべて零となり、$\Theta=\Sigma$。

$\mathbf1_n$ に直交する非零ベクトル $h$ では $h^{\mathsf T}\Theta h=c^2(h^{\mathsf T}\mathbf1_n)^2=0$ であり、核は特異。$\mathbf1_n$ に沿う固有値は $nc^2$、残り $n-1$ 個の固有値は零。異なる二つの教師ラベルの差方向には固定核の勾配流が作用しない。二つの核が同一でも全教師を学習できるわけではない。
<!-- solution-end -->

### SLT2-11-A05 層再帰で何が足されるか
- Level: A
- 目安時間: 10分

[層ごとの再帰](#def-slt2-11-recursion)で $Q^{(0)}=\begin{pmatrix}1&\rho\\\rho&1\end{pmatrix}$（$|\rho|\le1$）、$\sigma(u)=u$ とする。$Q^{(1)}$、$Q^{(2)}$、$\Theta^{(1)}$、$\Theta^{(2)}$ を求めよ。この計算の結論を有界活性化の有限時間定理として引用してよいか。

<!-- solution-start -->
#### 詳細解答

中心Gaussian変数では $\mathbb E U_iU_j=Q^{(0)}_{ij}$ だから $Q^{(1)}=Q^{(0)}$。微分が恒等的に1なので $D^{(1)}=D^{(2)}=\mathbf1\mathbf1^{\mathsf T}$、二層目も $Q^{(2)}=Q^{(0)}$。従って成分ごとの再帰から

$$
\Theta^{(1)}=Q^{(0)}+Q^{(0)}=2Q^{(0)},\qquad
\Theta^{(2)}=Q^{(0)}+2Q^{(0)}=3Q^{(0)}.
$$

線形活性化は全実数で有界でなく、前章の有界活性化・有限時間近似の証明の仮定を満たさない。この計算は再帰式の代数例であり、学習中の核が固定されるという主張の証明にはならない。
<!-- solution-end -->

### SLT2-11-B01 二点模型の固有モードを分ける
- Level: B
- 目安時間: 20分

第1節の二点模型に対して、$\Sigma=\frac14\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$、$\Theta=\begin{pmatrix}11/8&-1/4\\-1/4&11/8\end{pmatrix}$ を出発点から確認し、和・差方向の両核の固有値を求めよ。$\Theta-\Sigma$ が正定値であることを示せ。

<!-- solution-start -->
#### 詳細解答

$u=\pm c$、$\tanh c=1/2$ から $v(q)=\pm(-1/2,1/2)^{\mathsf T}$ なので $\mathbb E[v(q)v(q)^{\mathsf T}]$ が与えられた $\Sigma$ となる。$\sigma'=3/4$、$\xi_1\cdot\xi_2=0$、$\|\xi_i\|^2=2$ だから微分項は $(3/4)^2(2I)=9I/8$。ゆえに $\Theta=\Sigma+9I/8$。

和方向 $u_+=(1,1)^{\mathsf T}/\sqrt2$ に対して $\Sigma u_+=0$、差方向 $u_-=(1,-1)^{\mathsf T}/\sqrt2$ に対して $\Sigma u_-=(1/2)u_-$。両ベクトルは直交規格化されるので、$\Theta$ の固有値はそれぞれ $9/8$ と $1/2+9/8=13/8$。さらに任意の $h\ne0$ で $h^{\mathsf T}(\Theta-\Sigma)h=9\|h\|^2/8>0$。これで正定値性も確かめた。
<!-- solution-end -->

### SLT2-11-B02 学習時間で平均と分散が違って動く
- Level: B
- 目安時間: 20分

一つの訓練点で $G\sim N(0,1)$、$\Theta=2$、$y=2$ とする。[有限時間の学習後Gaussian極限](#thm-slt2-11-trained-gp)を使い、$t=(\log2)/2$ の学習後分布とその平均・分散を求めよ。初期GPと同じ分布か。

<!-- solution-start -->
#### 詳細解答

$E_t=e^{-2t}=e^{-\log2}=1/2$。学習後の確率変数は

$$
H(t)=2+\tfrac12(G-2)=1+\tfrac12G.
$$

従って $H(t)\sim N(1,1/4)$。初期分布は $N(0,1)$ で、平均も分散も異なる。教師値が分散の式へ直接足されるわけではない。教師値は平均 $(1-E_t)y$ を動かし、初期の揺らぎは係数 $E_t^2$ 倍に縮小される。
<!-- solution-end -->

### SLT2-11-B03 訓練点と評価点の交差核
- Level: B
- 目安時間: 25分

訓練点1個と評価点1個の初期共分散・接線核のGram行列を、それぞれ

$$
\Sigma=\begin{pmatrix}2&1\\1&3\end{pmatrix},\qquad
\Theta=\begin{pmatrix}3&2\\2&4\end{pmatrix}
$$

とする（各行列の順序は訓練点・評価点）。両者が正半定値で、$\Theta-\Sigma$ も正半定値と確認し、$t=(\log2)/3$、教師 $y$ での評価出力の平均・分散を求めよ。

<!-- solution-start -->
#### 詳細解答

$\Sigma$ の先頭主小行列式は2、行列式は $6-1=5$ で正。$\Theta$ は先頭が3、行列式が $12-4=8$ で正。差の行列は $\begin{pmatrix}1&1\\1&1\end{pmatrix}$ で $h^{\mathsf T}(\Theta-\Sigma)h=(h_1+h_2)^2\ge0$。従っていずれも必要な正半定値性を満たす。

$\Theta_{XX}=3$、$\Theta_{ZX}=2$ なので、[評価点の式](#prop-slt2-11-test-covariance)から

$$
B_t=2\int_0^{(\log2)/3}e^{-3s}\,ds
=\frac23(1-e^{-\log2})=\frac13.
$$

平均は $B_ty=y/3$。分散は $\Sigma_{ZZ}=3$、$\Sigma_{ZX}=\Sigma_{XZ}=1$、$\Sigma_{XX}=2$ を代入して

$$
3-\frac13\cdot1-1\cdot\frac13
+\frac19\cdot2=\frac{23}{9}.
$$

この結果は、評価点の初期値と訓練初期値の交差共分散を落とすと得られない。
<!-- solution-end -->

### SLT2-11-B04 GP事後と平均だけ合わせてみる
- Level: B
- 目安時間: 22分

一訓練点で初期NNGP分散 $s^2=1$、NTK値 $\theta=2$、観測雑音分散 $\tau^2=1$ とする。時刻 $t=(\log2)/2$ の勾配流分布と、同じ初期GPを使い $Y=G+\varepsilon$、$\varepsilon\sim N(0,1)$ を観測したGP事後分布を求めよ。教師値 $y\ne0$ を固定して比較せよ。

<!-- solution-start -->
#### 詳細解答

$e^{-\theta t}=1/2$ なので、[学習後分布](#thm-slt2-11-trained-gp)は $N(y/2,1/4)$。一方、[GP事後公式](../../ML/ML2-12/index.md#thm-ml2-12-posterior)に $s^2=\tau^2=1$ を代入すると、事後平均は $s^2y/(s^2+\tau^2)=y/2$、事後分散は

$$
s^2-\frac{s^4}{s^2+\tau^2}
=1-\frac12=\frac12.
$$

従ってGP事後は $N(y/2,1/2)$。平均が同じでも分散は $1/4$ と $1/2$ で一致しない。条件付き確率と勾配流の押し出し分布は別の操作である。
<!-- solution-end -->

### SLT2-11-C01 NNGP、NTK、学習後分布を一続きで導く
- Level: C
- 目安時間: 40分

$d=1$、$x_1=-1,x_2=1$、$\xi_i=(x_i,1)^{\mathsf T}$、$\sigma=\tanh$、$q_r=(u_r,0)^{\mathsf T}$、$u_r=\pm\tfrac12\log3$ は独立等確率とする。$a_r$ も独立等確率の $\pm1$ とし、$f_m(x)=m^{-1/2}\sum_ra_r\sigma(q_r^{\mathsf T}\xi(x))$ の全パラメータを $\|F_m-y\|_2^2/2$ の勾配流で学習する。教師は $y=(1,1)^{\mathsf T}$ である。

1. 初期NNGP共分散 $\Sigma$ とNTK極限 $\Theta$ を独立に計算し、それぞれの固有値・固有ベクトルを示せ。
2. $F_m(0)$ のGaussian極限を、一つの独立符号和へ書き直して確認せよ。
3. 任意の固定有限時間 $t\ge0$ での学習後分布の平均と共分散を求め、$t=0$ で初期値に戻ることを確かめよ。
4. なぜこの計算から有限幅網の $t\to\infty$ の挙動と、初期GPの事後分布との一致を結論できないか述べよ。

<!-- solution-start -->
#### 詳細解答

**1. 初期の二つの核。** $c=\tfrac12\log3$ と置く。$\tanh(\pm c)=\pm1/2$ なので、$v(q_r)=\pm(-1/2,1/2)^{\mathsf T}$。出力の共分散を $\mathbb E[v(q_r)v(q_r)^{\mathsf T}]$ で計算すると

$$
\Sigma=\frac14\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

隠れ重みの微分では $\tanh'(\pm c)=3/4$、$a_r^2=1$、$\xi_1\cdot\xi_2=0$、$\|\xi_1\|^2=\|\xi_2\|^2=2$ を使い

$$
\Theta=\Sigma+\frac9{16}(2I_2)
=\begin{pmatrix}11/8&-1/4\\-1/4&11/8\end{pmatrix}.
$$

$u_+=(1,1)^{\mathsf T}/\sqrt2$、$u_-=(1,-1)^{\mathsf T}/\sqrt2$ は正規直交基底であり、行列を掛けると $\Sigma u_+=0$、$\Sigma u_-=(1/2)u_-$、$\Theta u_+=(9/8)u_+$、$\Theta u_-=(13/8)u_-$。従って $\Sigma$ は特異だが $\Theta$ は正定値である。

**2. 初期出力の極限。** $\eta_r=\operatorname{sgn}(u_r)\in\{\pm1\}$ とすると、$a_r\eta_r$ は独立な等確率符号。従って

$$
F_m(0)=\frac1{2\sqrt m}\sum_{r=1}^m a_r\eta_r
\begin{pmatrix}-1\\1\end{pmatrix}
=-\frac{S_m}{\sqrt2}u_-,\qquad
S_m=\frac1{\sqrt m}\sum_{r=1}^m a_r\eta_r.
$$

$\mathbb ES_m=0$、$\operatorname{Var}(S_m)=1$、かつ $\mathbb Ee^{itS_m}=(\cos(t/\sqrt m))^m\to e^{-t^2/2}$。よって $S_m\Rightarrow N(0,1)$ となり、$F_m(0)\Rightarrow G_X=-Zu_-/\sqrt2$（$Z\sim N(0,1)$）。その共分散は $\tfrac12u_-u_-^{\mathsf T}=\Sigma$ と一致する。

**3. 学習後の平均と共分散。** $y=\sqrt2u_+$ なので、$e^{-t\Theta}u_+=e^{-9t/8}u_+$、$e^{-t\Theta}u_-=e^{-13t/8}u_-$。[学習後Gaussian極限定理](#thm-slt2-11-trained-gp)へ代入し、直交成分を分けると

$$
\begin{aligned}
H_X(t)
&=y+e^{-t\Theta}(G_X-y)\\
&=(1-e^{-9t/8})\begin{pmatrix}1\\1\end{pmatrix}
-\frac{e^{-13t/8}Z}{\sqrt2}u_-.
\end{aligned}
$$

従って

$$
\begin{aligned}
\mathbb EH_X(t)&=(1-e^{-9t/8})\begin{pmatrix}1\\1\end{pmatrix},\\
\operatorname{Cov}(H_X(t))
&=\frac{e^{-13t/4}}2u_-u_-^{\mathsf T}
=\frac{e^{-13t/4}}4
\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
\end{aligned}
$$

$t=0$ なら平均零、共分散 $\Sigma$ に戻る。また和方向は初期に変動しなくても、学習によって平均が教師方向へ動くことが分かる。

**4. 論理の範囲。** ここで使った[有限時間近似](../SLT2-10/index.md#thm-slt2-10-finite-time-flow)は $T$ を固定してから $m\to\infty$ とする結果であり、$T$ を幅とともに増やす一様な誤差評価はない。従って、極限模型で $t\to\infty$ としたときの $H_X(t)\to y$ を有限幅網に逆移植できない。さらに、初期GPは和方向の分散が零で、教師 $y=(1,1)^{\mathsf T}$ は初期GPの取り得る値の支持上にない。零雑音で $G_X=y$ に条件付けることは通常の条件付き密度公式の仮定を満たさず、学習後のGaussian分布を「このGPの事後」と同一視できない。正の観測雑音を加えた場合も、第6節の反例が示す通り平均・共分散は一般に一致しない。
<!-- solution-end -->

## 章末チェック

- 幅の極限でGaussianになるのは初期出力のどの確率量か。初期出力が確定的に零へ向かうわけではない理由は何か。
- $\Theta-\Sigma$ に加わる勾配項は、どのパラメータ群を学習するときに現れるか。
- 多層再帰の成分ごとの積を通常の行列積と取り違えると、どの計算が破綻するか。
- 学習後Gaussianの**平均**には $\Theta$、**共分散**には $\Theta$ と $\Sigma$ がどう現れるか。
- 学習の押し出し分布とGaussian processの観測条件付き事後分布を、式と仮定の両方から区別できるか。


