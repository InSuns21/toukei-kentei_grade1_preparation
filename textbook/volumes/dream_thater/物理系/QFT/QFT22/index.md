# QFT22 φ⁴模型の1ループ二点・四点関数と運動量カットオフ

[QFT21の1PI有効作用](../QFT21/index.md#def-qft21-effective-action)は、連結相関を一つの基本頂点へ整理する道具でした。そこでは零次元の四次模型や有限次元の行列式を扱いましたが、場の運動量を積分すると何が起きるのでしょうか。木レベルでは有限だった予測が、ループを一つ増やしただけでカットオフに依存します。

**中心問いは、四次元の実スカラーφ⁴模型について、二点・四点の一ループ補正を符号と対称因子ごと導き、発散がどこから生じるかを数値まで確定すること**です。まず有限体積・有限モードなら普通の多変数積分として定義します。その後で無限体積極限を取り、紫外（UV）カットオフを大きくしたときの挙動を調べます。無限カットオフで構成済みの相互作用的量子場を仮定しません。

## 1. 有限個のFourierモードから始める

ここではEuclid型の四次元トーラス $T_L^4=(\mathbb R/L\mathbb Z)^4$ を用い、体積を $V=L^4$ とします。Fourier運動量は $k=2\pi n/L$（$n\in\mathbb Z^4$）です。$m^2>0$ は自由場の質量二乗、$\lambda\ge0$ は四次結合、$\Lambda>0$ は運動量の大きさの上限とします。質量が正なので零運動量でも分母 $k^2+m^2$ は消えません。

無限個のモードを一度に積分する代わりに、$|k|\le\Lambda$ だけを残す方法から始めます。この有限モード模型とカットオフの定義を、次に明示します。先に[QFT19の有限格子生成関数](../QFT19/index.md#def-qft19-lattice-functional)を学んだときと同じく、最初は実変数の有限次元積分です。

<a id="def-qft22-sharp-cutoff"></a>

<!-- formal-statement-start -->
> **定義（有限モードφ⁴模型と鋭い運動量カットオフ）**
> $L,\Lambda,m>0$、$\lambda\ge0$ とし、$K_\Lambda=\{2\pi n/L:|2\pi n/L|\le\Lambda\}$ とする。実Fourier係数 $\phi_{-k}=\overline{\phi_k}$ を持つ有限モード場

$$
\phi(x)=V^{-1/2}\sum_{k\in K_\Lambda}\phi_k e^{ik\cdot x}
$$

> に対し、Euclid作用と自由伝播核を次で定める。

$$
S_\Lambda[\phi]=\int_{T_L^4}
\left\{\frac12|\nabla\phi|^2+\frac{m^2}{2}\phi^2
+\frac{\lambda}{4!}\phi^4\right\}d^4x,\qquad
C_\Lambda(x-y)=\frac1V\sum_{k\in K_\Lambda}
\frac{e^{ik\cdot(x-y)}}{k^2+m^2}.
$$

> 場の積分は独立な実Fourier成分についての有限次元Lebesgue積分とする。$C_\Lambda$ は自由二次作用の逆行列の核である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft22-sharp-cutoff -->
### 例：どの自由度を実際に積分するか

**定義の確認**：$\Lambda=2\pi/L$ なら $n=0$ と、四つの座標方向の $\pm e_j$ の計9モードだけが残ります。$0$ の係数は実数で、$\phi_{-k}=\overline{\phi_k}$ が各 $\pm k$ を結び付けるので、独立な実変数は $1+2\cdot4=9$ 個です。二次作用は

$$
S_{\Lambda,0}=\frac12\sum_{k\in K_\Lambda}
(k^2+m^2)|\phi_k|^2.
$$

各 $\pm k$ の対から実数座標を作るときは、正規化を確かめる必要があります。$K_\Lambda^+$ を零以外の各対から一つずつ選んだ集合とし、$k\in K_\Lambda^+$ に対して

$$
q_{k,c}=\sqrt2\operatorname{Re}\phi_k,\qquad
q_{k,s}=-\sqrt2\operatorname{Im}\phi_k
$$

と置きます。実場は正規直交関数 $V^{-1/2}$、$\sqrt{2/V}\cos(k\cdot x)$、$\sqrt{2/V}\sin(k\cdot x)$ を、それぞれ $\phi_0,q_{k,c},q_{k,s}$ 倍した和になります。$\pm k$ の二項をまとめると

$$
S_{\Lambda,0}=\frac12m^2\phi_0^2
+\frac12\sum_{k\in K_\Lambda^+}(k^2+m^2)
(q_{k,c}^2+q_{k,s}^2).
$$

従ってこの正規直交な実座標ではHessianの固有値が $k^2+m^2>0$ となり、全9方向で正定値です。逆Hessianを基底関数で核に戻すと、各対の寄与は

$$
\frac{2\cos(k\cdot x)\cos(k\cdot y)+2\sin(k\cdot x)\sin(k\cdot y)}{V(k^2+m^2)}
=\frac{e^{ik\cdot(x-y)}+e^{-ik\cdot(x-y)}}{V(k^2+m^2)}.
$$

零モードも合わせれば定義の $C_\Lambda(x-y)$ です。未正規化の $\operatorname{Re}\phi_k,\operatorname{Im}\phi_k$ ではHessianの対角係数が二倍になる点に注意してください。四次項も $\lambda\ge0$ なので作用は下に有界で、有限次元積分が収束します。
<!-- definition-example-end -->

以下のループ計算では、まず $L,\Lambda$ を固定し摂動展開します。次に $L\to\infty$ を固定 $\Lambda$ で取り、$V^{-1}\sum_k$ を $\int_{|k|\le\Lambda}d^4k/(2\pi)^4$ に置き換えます。最後に $\Lambda\to\infty$ を検査する順です。[QFT20のEuclid化](../QFT20/index.md#def-qft20-euclidean-action)に対応する正の重みを用いていますが、実時間の散乱振幅と無条件に同一視しません。

## 2. 有効作用の行列式を四次まで展開する

自由場の逆伝播作用素を $K=-\Delta+m^2$ とします。$P_\Lambda$ はFourier展開のうち $k\in K_\Lambda$ の成分だけを残す直交射影です。背景 $\varphi$ の周りの作用の二階微分は

$$
H_\varphi=P_\Lambda\left(K+\frac{\lambda}{2}\varphi^2\right)P_\Lambda
=K_\Lambda+M_\varphi,\qquad
M_\varphi=P_\Lambda\frac{\lambda\varphi^2}{2}P_\Lambda.
$$

$\lambda\varphi^2/2$ が現れる理由は $(\lambda\phi^4/4!)''=\lambda\phi^2/2$ だからです。任意の実有限モード変分 $h$ に対して

$$
\langle h,H_\varphi h\rangle
=\int_{T_L^4}\left(|\nabla h|^2+m^2h^2
+\frac\lambda2\varphi^2h^2\right)d^4x
\ge m^2\|h\|_{L^2}^2.
$$

従ってHessianは一様に正定値で、作用から線形ソース項を引いても強凸かつ強制的に無限大へ増大し、一意の極小点を持ちます。これが[QFT21の有限次元一ループ行列式](../QFT21/index.md#prop-qft21-one-loop-saddle)を、この有限モード作用へ適用する際の主要仮定です。

<a id="thm-qft22-loop-determinant"></a>

<!-- formal-statement-start -->
> **定理（有限モードの一ループ行列式展開）**
> 上記の有限モードφ⁴模型で $m^2>0,\lambda\ge0$ とする。$\hbar$ をループ次数の記録に用い、背景独立な定数を除いて有効作用を正規化する。$\hbar$ の一次までで

$$
\Gamma_\Lambda[\varphi]
=S_\Lambda[\varphi]+\frac{\hbar}{2}
\operatorname{Tr}\log(1+C_\Lambda M_\varphi)+O(\hbar^2).
$$

> $\varphi$ の四次まで展開すると、その一ループ部分は

$$
\Gamma_{\Lambda,1}[\varphi]
=\frac{\lambda}{4}C_\Lambda(0)\int\varphi(x)^2\,d^4x
-\frac{\lambda^2}{16}\int\varphi(x)^2
C_\Lambda(x-y)^2\varphi(y)^2\,d^4x\,d^4y
+O(\varphi^6).
$$

> 第二式では $\hbar=1$ とし、積分はトーラス上、$C_\Lambda^2$ は核の普通の積とする。$O(\varphi^6)$ は背景場次数の表示で、$O(\hbar^2)$ は別のループ次数である。
<!-- formal-statement-end -->

### 証明の見取り図

$\Gamma$ の一ループ項はHessianの行列式から生じます。$\log(1+X)=X-X^2/2+\cdots$ を $X=C_\Lambda M_\varphi$ に使い、$M_\varphi$ が $\varphi^2$ に比例することから、一次項が二点、二次項が四点になると分かります。

<!-- proof-start -->
### 証明

有限次元なので、正のHessianの周りでGaussian積分と鞍点展開を行えます。ソース $J$ に対する鞍点を $q_J$ とし、$W[J]=\hbar\log Z[J]$ の $\hbar$ 一次係数を $W_1[J]$ と書くと

$$
W_1[J]=-\frac12\operatorname{Tr}\log H_{q_J}
$$

です。[Legendre双対](../QFT21/index.md#thm-qft21-legendre-hessian)で平均場へ変数を替える際、鞍点の一次の移動による寄与は木レベルの停留条件により相殺されます。このため

$$
\Gamma_\Lambda[\varphi]=S_\Lambda[\varphi]
+\frac{\hbar}{2}\operatorname{Tr}\log H_\varphi+O(\hbar^2)
$$

を得ます。後でHessianの自由部分の行列式だけを背景独立な定数として差し引きます。

$H_\varphi=K_\Lambda(1+C_\Lambda M_\varphi)$ と分解し、$\operatorname{Tr}\log K_\Lambda$ を背景独立な定数として差し引きます。有限次元の解析的な $\log\det$ 展開を $\varphi=0$ の近傍で行うと

$$
\frac12\operatorname{Tr}\log(1+C_\Lambda M_\varphi)
=\frac12\operatorname{Tr}(C_\Lambda M_\varphi)
-\frac14\operatorname{Tr}(C_\Lambda M_\varphi C_\Lambda M_\varphi)
+O(\varphi^6).
$$

第一項の核の対角は $\lambda C_\Lambda(0)\varphi(x)^2/2$ だから、係数 $1/2$ を掛けて $\lambda C_\Lambda(0)\int\varphi^2/4$ です。第二項は核の積を順にたどって

$$
\operatorname{Tr}(C_\Lambda M_\varphi C_\Lambda M_\varphi)
=\frac{\lambda^2}{4}\int
\varphi(x)^2 C_\Lambda(x-y)\varphi(y)^2 C_\Lambda(y-x)\,d^4x\,d^4y.
$$

実自由場の核は $C_\Lambda(y-x)=C_\Lambda(x-y)$ なので、前の係数 $-1/4$ を掛けて $-\lambda^2/16$ になります。
<!-- proof-end -->

定数背景 $\varphi(x)=v$ では $M_\varphi=\lambda v^2/2$ は運動量を混ぜません。一ループ有効ポテンシャル $U_1$ は $\Gamma_{\Lambda,1}[v]/V$ と定め、背景独立定数を差し引くと

$$
U_1(v)-U_1(0)=\frac1{2V}\sum_{k\in K_\Lambda}
\log\left(1+\frac{\lambda v^2}{2(k^2+m^2)}\right).
$$

有限体積の和を、$j=1,2$ に対し

$$
A_{j,L}(\Lambda,m)=\frac1V\sum_{k\in K_\Lambda}(k^2+m^2)^{-j}
$$

と置きます。対数を二次まで展開すると、$v^2$ と $v^4$ の係数はそれぞれ

$$
\frac{\lambda}{4}A_{1,L},\qquad -\frac{\lambda^2}{16}A_{2,L}
$$

です。これらの無限体積極限を次節で $I_1,I_2$ と定義します。この小さな例が一般の二点・四点計算の符号検査に使えます。

## 3. 二点のtadpoleと四点の三チャネルbubble

1PI頂点とは、[QFT21で定義した固有頂点](../QFT21/index.md#def-qft21-proper-vertex)を場の運動量についてFourier変換したものです。二階微分は逆完全伝播関数、四階微分は四つの外線を持つ固有相互作用を測ります。Euclid規約では木レベル値が $p^2+m^2$ と $+\lambda$ となるようにします。

<a id="def-qft22-proper-vertices"></a>

<!-- formal-statement-start -->
> **定義（一ループ1PI二点・四点頂点）**
> 有限モード模型の $\Gamma_\Lambda[\varphi]$ を零背景で二回・四回微分し、Fourier変換して外部運動量保存のdelta因子（有限体積ではKronecker因子）を取り除いた係数を $\Gamma_\Lambda^{(2)}(p)$、$\Gamma_\Lambda^{(4)}(p_1,p_2,p_3,p_4)$ とする。$p_1+\cdots+p_4=0$ とし、それぞれの木レベル値を

$$
\Gamma_{\Lambda,0}^{(2)}(p)=p^2+m^2,\qquad
\Gamma_{\Lambda,0}^{(4)}(p_1,p_2,p_3,p_4)=\lambda
$$

> と規格化する。以下の連続積分表示は $L\to\infty$ を取った固定 $\Lambda$ での一ループ係数を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft22-proper-vertices -->
### 例：定数背景の四次係数から頂点を読む

**定義の確認**：自由二次作用は

$$
S_{\Lambda,0}=\frac12\sum_{p\in K_\Lambda}(p^2+m^2)|\varphi_p|^2
$$

です。実場の独立な座標で求めた二階微分の核を運動量表示へ戻すと、$p,-p$ の組に $p^2+m^2$ が掛かるため、運動量保存因子を除いた二点頂点は $p^2+m^2$ となります。四次項ではFourier展開と直交性により

$$
\frac{\lambda}{4!}\int_{T_L^4}\varphi(x)^4d^4x
=\frac{\lambda}{4!V}
\sum_{p_1,\ldots,p_4\in K_\Lambda}
\varphi_{p_1}\cdots\varphi_{p_4}
\,\boldsymbol{1}_{\{p_1+\cdots+p_4=0\}}.
$$

ここではFourier直交性

$$
\frac1V\int_{T_L^4}e^{i(p_1+\cdots+p_4)\cdot x}d^4x
=\boldsymbol{1}_{\{p_1+\cdots+p_4=0\}}
$$

を使いました。四回微分で $4!$ 通りの割当てが現れ、Fourier正規化と運動量保存因子を除くと四点係数は $\lambda$ です。

定数背景 $\varphi(x)=v$ では作用密度の四次項が $\lambda v^4/24$ なので、$v$ に関する四階微分で $\lambda$ を再確認できます。一ループの $-\lambda^2 A_{2,L}v^4/16$ を四回微分すると

$$
-\frac{4!\lambda^2}{16}A_{2,L}=-\frac{3\lambda^2}{2}A_{2,L}
$$

です。無限体積では $A_{2,L}\to I_2$ です。単に $v^4$ の係数を四点頂点と呼ぶと $4!$ を落としてしまいます。
<!-- definition-example-end -->

まず次の二種類のカットオフ積分を置きます。$P$ は二つの外線運動量の和で、bubbleの二本の内部線は $k$ と $k+P$ の運動量を持ちます。

$$
I_1(\Lambda,m)=\int_{|k|\le\Lambda}\frac{d^4k}{(2\pi)^4}
\frac1{k^2+m^2},\qquad
B_\Lambda(P;m)=\int_{\substack{|k|\le\Lambda\\|k+P|\le\Lambda}}
\frac{d^4k}{(2\pi)^4}
\frac1{(k^2+m^2)((k+P)^2+m^2)}.
$$

$I_2(\Lambda,m)=B_\Lambda(0;m)$ と記します。両方の内部線に同じカットオフを課すので、$P\ne0$ の積分領域は二つの四次元球の共通部分です。

<a id="thm-qft22-one-loop-vertices"></a>

<!-- formal-statement-start -->
> **定理（二点tadpoleと三チャネル四点bubble）**
> 四次元Euclid型の単一実スカラーφ⁴模型、$m^2>0$、$\lambda\ge0$、上記の鋭いカットオフを用いる。固定カットオフ・固定外部運動量の摂動展開において、零背景での一ループまでの1PI頂点は

$$
\Gamma_\Lambda^{(2)}(p)
=p^2+m^2+\frac{\lambda}{2}I_1(\Lambda,m)+O(\lambda^2),
$$

$$
\begin{aligned}
\Gamma_\Lambda^{(4)}(p_1,p_2,p_3,p_4)
=\lambda-\frac{\lambda^2}{2}\big\{&
B_\Lambda(p_1+p_2;m)\\
&+B_\Lambda(p_1+p_3;m)
+B_\Lambda(p_1+p_4;m)\big\}+O(\lambda^3).
\end{aligned}
$$

> とくに全外部運動量が零なら

$$
\Gamma_\Lambda^{(4)}(0,0,0,0)
=\lambda-\frac{3\lambda^2}{2}I_2(\Lambda,m)+O(\lambda^3).
$$

> $O(\lambda^j)$ は固定有限カットオフでの形式的摂動次数を示す。一ループ二点補正には $p^2$ 依存がなく、同次数での波動関数係数の補正は零である。
<!-- formal-statement-end -->

### 証明の見取り図

[一ループ行列式](#thm-qft22-loop-determinant)の二次項を二回微分すると同じ背景場を並べ替える $2!$ が、四次項を四回微分すると外線を二つずつ二組へ分ける三通りが生じます。三通りは $(12|34),(13|24),(14|23)$ であり、それぞれ対称因子 $1/2$ を残します。

<!-- proof-start -->
### 証明

二次項は $\lambda C_\Lambda(0)\int\varphi(x)^2/4$ です。二回の汎関数微分で $2!$ が出るため、二点頂点への寄与は $\lambda C_\Lambda(0)/2$ です。無限体積極限で $C_\Lambda(0)\to I_1$ となり、これが一本の内部線を自分へ戻すtadpoleです。背景に微分が掛かっても核には外線運動量が残らないので $p$ に依存しません。

四次項を

$$
Q=-\frac{\lambda^2}{16}\int\varphi(x)^2
C_\Lambda(x-y)^2\varphi(y)^2\,d^4x\,d^4y
$$

と記します。四つの外線を $x$ の二つと $y$ の二つへ割り当てる方法は $\binom42=6$ 通りです。外線の順序を区別した一割当てについて、各点の二階微分に対応する $2!\,2!=4$ 通りがあるため、全体では $6\cdot4=24$ 通りです。ただし $(x,y)$ の交換は同じ運動量の組分けを二回数えるので、独立なのは三チャネルで各チャネル八通りです。したがって一チャネルの係数は

$$
-\frac{\lambda^2}{16}\cdot8=-\frac{\lambda^2}{2}.
$$

たとえば $(12|34)$ では、$x$ に入る外線運動量の和が $P=p_1+p_2$ です。$C_\Lambda(x-y)^2$ の二本のFourier和には運動量 $k,k+P$ が入り、両方のカットオフを残すため積分領域は $|k|,|k+P|\le\Lambda$ です。他の二組も同じ議論で、表示の三つのbubbleが得られます。

$P=0$ なら三つの積分はすべて $I_2$ になります。二点に $p^2$ に比例するループ項がないことは、二次式の核が $\delta(x-y)$ に比例しFourier変換後も一定であることから従います。
<!-- proof-end -->

ここでの符号はEuclid型**1PI有効作用の微分**の符号です。散乱のMinkowski頂点の $-i\lambda$ という因子と直接比較すると符号を誤ります。木レベルの頂点規則と対称因子は[QFT10の頂点係数定理](../QFT10/index.md#thm-qft10-vertex-factor)でも導きました。ただしQFT10では正規順序相互作用を採用しましたが、今回のEuclid作用の $\phi^4$ は**正規順序していません**。したがって今回のtadpoleを、QFT10の正規順序で消える自己収縮と混同しないでください。

## 4. 四次元の発散を厳密に積分する

四次元の球面積を $S_3$ とします。[QFT19の有限次元Gaussian積分](../QFT19/index.md#thm-qft19-gaussian)を各座標に用いると

$$
\pi^2=\int_{\mathbb R^4}e^{-|k|^2}d^4k
=S_3\int_0^\infty r^3e^{-r^2}dr=\frac{S_3}{2}.
$$

ここで $u=r^2$ と置けば最後の積分は $\tfrac12\int_0^\infty ue^{-u}du=1/2$ です。従って球面積は $S_3=2\pi^2$ で、回転不変な積分には $d^4k=2\pi^2r^3dr$ を使えます。これにより二次補正と四点補正を、少なくとも外部運動量零の場合には初等関数で求められます。

<a id="thm-qft22-cutoff-integrals"></a>

<!-- formal-statement-start -->
> **定理（四次元カットオフ積分の厳密評価）**
> $m,\Lambda>0$ のとき、上で定義した積分は

$$
I_1(\Lambda,m)=\frac1{16\pi^2}
\left[\Lambda^2-m^2\log\left(1+\frac{\Lambda^2}{m^2}\right)\right],
$$

$$
I_2(\Lambda,m)=\frac1{16\pi^2}
\left[\log\left(1+\frac{\Lambda^2}{m^2}\right)
-\frac{\Lambda^2}{\Lambda^2+m^2}\right].
$$

> $m$ を固定し $\Lambda\to\infty$ とすると

$$
I_1=\frac{\Lambda^2-m^2\log(\Lambda^2/m^2)}{16\pi^2}
+O\left(\frac{m^4}{\Lambda^2}\right),\qquad
I_2=\frac{\log(\Lambda^2/m^2)-1}{16\pi^2}
+O\left(\frac{m^2}{\Lambda^2}\right).
$$

> とくに二点tadpoleは二次発散、四点bubbleは対数発散を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

半径 $r$ の球殻へ分ければ四次元積分が一次元になります。$u=r^2$ へ置換することで、二つとも分母に $u+m^2$ が現れ、微分関係 $I_2=-\partial_{m^2}I_1$ も確認できます。

<!-- proof-start -->
### 証明

球面積の係数は $2\pi^2/(2\pi)^4=1/(8\pi^2)$ です。$u=r^2$ なら $r^3dr=u\,du/2$ だから

$$
I_1=\frac1{16\pi^2}\int_0^{\Lambda^2}\frac{u}{u+m^2}\,du
=\frac1{16\pi^2}\int_0^{\Lambda^2}
\left(1-\frac{m^2}{u+m^2}\right)du.
$$

端点を代入すれば第一式です。同様に

$$
\begin{aligned}
I_2&=\frac1{16\pi^2}\int_0^{\Lambda^2}
\frac{u}{(u+m^2)^2}\,du\\
&=\frac1{16\pi^2}\int_0^{\Lambda^2}
\left(\frac1{u+m^2}-\frac{m^2}{(u+m^2)^2}\right)du\\
&=\frac1{16\pi^2}
\left[\log(u+m^2)+\frac{m^2}{u+m^2}\right]_{0}^{\Lambda^2}.
\end{aligned}
$$

$m^2/(\Lambda^2+m^2)-1=-\Lambda^2/(\Lambda^2+m^2)$ により第二式になります。$z=m^2/\Lambda^2\to0$ で $\log(1+z)=z+O(z^2)$ と $1/(1+z)=1-z+O(z^2)$ を用いると、表示した剰余まで得られます。
<!-- proof-end -->

### 例：$\Lambda=m$ で係数を検算する

$$
I_1(m,m)=\frac{m^2}{16\pi^2}(1-\log2),\qquad
I_2(m,m)=\frac1{16\pi^2}\left(\log2-\frac12\right).
$$

どちらも正です。特に四点の一ループ補正は負で、正の結合を持つEuclid作用の四階微分を小さくする方向です。ただし有限次数の結果から任意の結合での完全な有効ポテンシャルの形までは決められません。

## 5. なぜ二点と四点が重要か：発散次数

ここでは[QFT10の収縮図](../QFT10/index.md#def-qft10-contraction-graph)の半辺・内線・外線を使いますが、正規順序を課さないため、同一頂点の二つの半辺を結ぶ自己収縮も許します。ある図にループ積分が $L$ 個、内部伝播線が $I$ 本あるとき、各ループは四次元の $d^4k$、各内部線は大運動量で $k^{-2}$ を与えます。全内部運動量を一斉に大きくしたときの形式的なべきが、発散候補を絞る手掛かりになります。このべきを次で定義します。部分グラフの発散まで調べる検査ではありません。

<a id="def-qft22-superficial-degree"></a>

<!-- formal-statement-start -->
> **定義（表面的発散次数）**
> 四次元Euclid型で、微分を含まない四価頂点と大運動量で $k^{-2}$ の内部線だけからなる連結Feynman図について、独立ループ運動量の個数を $L$、内部線数を $I$ とし

$$
\omega=4L-2I
$$

> を表面的発散次数と呼ぶ。$\omega>0$ をべき発散候補、$\omega=0$ を対数発散候補と呼ぶが、対称性による相殺や部分グラフの効果を除外した判定である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft22-superficial-degree -->
### 例：tadpoleとbubbleを数える

**定義の確認**：四点bubbleは二つの四価頂点を二本の内部線で接続した連結図で、$I=2,V_{\!g}=2$ です。一方の内部線の運動量を $k$ と決めると、頂点での運動量保存によりもう一方は $k+P$ と決まるため、独立ループ運動量は一個、$L=1$ です。したがって $\omega=4-4=0$。tadpoleは四価頂点一つの残る二本を自分へつなぎ、独立な内部運動量を一つ積分するので $I=L=1$、$\omega=4-2=2$ です。[積分の厳密値](#thm-qft22-cutoff-integrals)でもそれぞれ対数と二次の先頭項が現れました。一般の閉路数公式は次の定理で証明します。
<!-- definition-example-end -->

<a id="thm-qft22-power-count"></a>

<!-- formal-statement-start -->
> **定理（φ⁴グラフの表面的発散次数）**
> 四次元の連結φ⁴図で全頂点が四価、外線数を $E$、頂点数を $V_{\!g}$、内部線数を $I$、独立ループ数を $L$ とする。このとき

$$
4V_{\!g}=2I+E,\qquad
L=I-V_{\!g}+1,\qquad
\omega=4-E.
$$

> したがって $E=2$ は $\omega=2$、$E=4$ は $\omega=0$ である。$E\ge6$ では図全体の一様拡大による表面的次数は負となるが、部分グラフの発散の不在までは保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

第一式は各頂点の四つの半辺を、内部線の両端と外線の端へ振り分ける数え上げです。第二式は連結図の全頂点を結ぶ木の $V_{\!g}-1$ 本を除いた内部線が独立閉路になることから従います。

<!-- proof-start -->
### 証明

四価の頂点が $V_{\!g}$ 個あるため半辺は $4V_{\!g}$ 本です。内部線は二つの半辺、外線は一つの半辺を使うので $4V_{\!g}=2I+E$ です。連結図の全域木は $V_{\!g}-1$ 本の内部線を持ち、残る内部線を一本ずつ加えると閉路が一つずつ増えるため $L=I-(V_{\!g}-1)$ です。これらを定義に代入すると

$$
\omega=4(I-V_{\!g}+1)-2I
=2I-4V_{\!g}+4=4-E.
$$

> この算術はすべての内部運動量を同時に伸ばしたときの数え上げだけであり、部分集合の運動量だけが大きくなる領域には別の検査が必要です。
<!-- proof-end -->

## 6. 正則化は物理的な予測そのものではない

ここまでの $\Lambda$ は計算を有限にする**正則化のパラメータ**です。[一ループ頂点](#thm-qft22-one-loop-vertices)では、カットオフを外したまま裸の $m^2,\lambda$ を固定すると補正は発散します。したがって「大きな $\Lambda$ を代入すれば物理的に正しい」とはまだ言えません。

特に鋭いカットオフでは、分母をFeynmanパラメータでまとめて $k\mapsto k+xP$ と平行移動すると、積分領域も移動します。有限 $\Lambda$ で領域を元の球に戻す操作は不正確です。一方、固定外部運動量で紫外の発散を決める対数係数は変わりません。

<a id="prop-qft22-bubble-difference"></a>

<!-- formal-statement-start -->
> **命題（固定外部運動量での対数発散係数の普遍性）**
> $m>0$ と $P\in\mathbb R^4$ を固定し、双方の内部線に鋭い球カットオフを課した $B_\Lambda(P;m)$ を用いる。$\Lambda\to\infty$ で差

$$
B_\Lambda(P;m)-B_\Lambda(0;m)
$$

> は有限な極限を持つ。従って任意の固定 $P$ の $B_\Lambda(P;m)$ の対数発散係数は、零運動量の $I_2$ と同じ $1/(16\pi^2)$（$\log(\Lambda^2/m^2)$ の係数）である。
<!-- formal-statement-end -->

### 証明の見取り図

積分領域の共通部分を球全体と比較し、境界の薄い殻による誤差を見積もります。領域内部では二つの分母の差を共通分母へ直すと、高運動量で $k^{-5}$ になり、四次元でも積分可能です。

<!-- proof-start -->
### 証明

$f(k)=(k^2+m^2)^{-1}$ と置きます。$B_\Lambda(P)-I_2$ は次の二つの寄与に分けられます。

$$
\int_{\substack{|k|\le\Lambda\\|k+P|\le\Lambda}}
\frac{d^4k}{(2\pi)^4}f(k)\{f(k+P)-f(k)\}
-\int_{\substack{|k|\le\Lambda\\|k+P|>\Lambda}}
\frac{d^4k}{(2\pi)^4}f(k)^2.
$$

第一項の絶対値は、$|k|\ge2|P|+1$ では平均値の定理と

$$
|\nabla f(q)|=\frac{2|q|}{(q^2+m^2)^2}
\le\frac{C_{m,P}}{|k|^3}
$$

（$q=k+tP$, $0\le t\le1$）より $C|P||k|^{-5}$ で抑えられます。四次元球殻の体積因子は $r^3dr$ なので、尾部積分は $\int_R^\infty r^{-2}dr=1/R$ です。有限な小領域は $m>0$ によって分母が下から抑えられ、よって第一項は極限を持ちます。

第二項の領域は $\Lambda-|P|<|k|\le\Lambda$ の殻に含まれます。$\Lambda>2|P|$ なら殻の体積は $O(|P|\Lambda^3)$、その中の $f(k)^2$ は $O(\Lambda^{-4})$ なので積分は $O(|P|/\Lambda)\to0$ です。従って差が収束し、$I_2$ の対数係数だけが残ります。
<!-- proof-end -->

発散を吸収するため、裸の係数を $\Lambda$ に依存させ、指定した外部運動量での二点・四点の値を固定する方法を次に導入します。零運動量で質量を $m_R^2$、四点を $\lambda_R$ に合わせる一ループの形式計算では

$$
m_B^2=m_R^2+\delta m^2,\quad
\lambda_B=\lambda_R+\delta\lambda,\quad
\delta m^2=-\frac{\lambda_R}{2}I_1(\Lambda,m_R)+O(\lambda_R^2),\quad
\delta\lambda=\frac{3\lambda_R^2}{2}I_2(\Lambda,m_R)+O(\lambda_R^3).
$$

これは**固定有限カットオフでの次数ごとの一致条件**です。$\delta m^2$ を入れた裸のGaussian作用が任意に大きいカットオフでも正定値だとか、$\Lambda\to\infty$ の厳密な相互作用模型が存在すると主張するものではありません。二点の一ループ項に $p^2$ がないため、この次数の $\delta Z$ は零ですが、より高次の議論は別に必要です。

## 7. 演習：係数・発散・正則化領域

以下、特記しない限り四次元Euclid型、$m>0$、$\lambda\ge0$、鋭い球カットオフ、$\hbar=1$ とします。各演習は有限 $\Lambda$ で式を確定してから極限を議論してください。

### 演習 QFT22-A1：有限モードの数え方

- Level: A
- 問題：$T_L^4$ で $\Lambda=2\pi/L$ とする。許容されるFourierモード $k$ を列挙し、実場の独立な実変数の数と自由二次作用の正定値性を示せ。

<!-- solution-start -->
**詳細解答**

$k=2\pi n/L$ で $|n|\le1$ です。整数ベクトルは零ベクトル一つと、各座標方向の $\pm e_1,\ldots,\pm e_4$ の八つ、計九つです。実場では零係数が実数一つ、非零の四組の対の各組が複素数一つなので $1+4\cdot2=9$ 実自由度です。自由二次作用は

$$
S_0=\frac{m^2}{2}|\phi_0|^2
+\frac12\sum_{j=1}^{4}\left(m^2+\frac{4\pi^2}{L^2}\right)
\bigl(|\phi_{2\pi e_j/L}|^2+|\phi_{-2\pi e_j/L}|^2\bigr).
$$

$m^2>0$ より各実座標の二次形式は正定値です。
<!-- solution-end -->

### 演習 QFT22-A2：tadpoleを一変数積分へ

- Level: A
- 問題：四次元の $I_1$ を球殻積分へ変換し、$\Lambda=m$ での値と符号を求めよ。

<!-- solution-start -->
**詳細解答**

球面積 $2\pi^2$ より

$$
I_1=\frac1{8\pi^2}\int_0^\Lambda\frac{r^3}{r^2+m^2}dr
=\frac1{16\pi^2}\int_0^{m^2}\frac{u}{u+m^2}du
$$

（最後は $\Lambda=m,\ u=r^2$）。被積分関数を $1-m^2/(u+m^2)$ と書いて積分すると

$$
I_1(m,m)=\frac{m^2-m^2\log2}{16\pi^2}>0,
$$

$\log2<1$ なので正です。
<!-- solution-end -->

### 演習 QFT22-A3：bubbleを直接積分する

- Level: A
- 問題：$I_2=B_\Lambda(0;m)$ を球殻積分から計算し、$\Lambda=m$ の値を求めよ。

<!-- solution-start -->
**詳細解答**

$$
I_2=\frac1{8\pi^2}\int_0^\Lambda\frac{r^3}{(r^2+m^2)^2}dr
=\frac1{16\pi^2}\int_0^{\Lambda^2}\frac{u}{(u+m^2)^2}du.
$$

$u/(u+m^2)^2=(u+m^2)^{-1}-m^2(u+m^2)^{-2}$ だから、原始関数は $\log(u+m^2)+m^2/(u+m^2)$ です。端点の差から

$$
I_2(m,m)=\frac{\log2-1/2}{16\pi^2}>0.
$$

$\log2>1/2$ なので符号も被積分関数の正値性と一致します。
<!-- solution-end -->

### 演習 QFT22-A4：四点の三チャネル

- Level: A
- 問題：外線運動量 $(p_1,p_2,p_3,p_4)=(q,-q,q,-q)$ のとき、bubbleの引数三つと一ループ四点頂点を書け。$\Lambda>|q|$ とする。

<!-- solution-start -->
**詳細解答**

$p_1+p_2=0$、$p_1+p_3=2q$、$p_1+p_4=0$ です。従って[三チャネル公式](#thm-qft22-one-loop-vertices)に各引数を代入すると

$$
\Gamma_\Lambda^{(4)}(q,-q,q,-q)
=\lambda-\frac{\lambda^2}{2}\{2I_2(\Lambda,m)+B_\Lambda(2q;m)\}
+O(\lambda^3).
$$

$|2q|$ が $\Lambda$ を超えても共通領域が空になるわけではありません。二つの半径 $\Lambda$ の球は中心間距離が $2\Lambda$ を超えたとき初めて交わらなくなります。この問題の $\Lambda>|q|$ では $|2q|<2\Lambda$ なので、共通領域は空ではありません。
<!-- solution-end -->

### 演習 QFT22-A5：質量二乗による微分

- Level: A
- 問題：有限 $\Lambda$、$m^2>0$ で $-\partial I_1/\partial(m^2)=I_2$ を積分の内側から示せ。

<!-- solution-start -->
**詳細解答**

領域は $m^2$ と独立なコンパクト球で、分母は $m^2>0$ により零になりません。微分を積分の中へ入れられ、

$$
-\frac{\partial I_1}{\partial(m^2)}
=-\int_{|k|\le\Lambda}\frac{d^4k}{(2\pi)^4}
\frac{\partial}{\partial(m^2)}(k^2+m^2)^{-1}
=\int_{|k|\le\Lambda}\frac{d^4k}{(2\pi)^4}
\frac1{(k^2+m^2)^2}=I_2.
$$

最後は $P=0$ なら二本の内部線のカットオフ条件が同じになることを使っています。
<!-- solution-end -->

### 演習 QFT22-B1：対数行列式から対称因子

- Level: B
- 問題：定数背景 $v$ について $U_1(v)-U_1(0)$ を $v^4$ まで展開し、零運動量の $\Gamma^{(2)}$ と $\Gamma^{(4)}$ の一ループ補正を求めよ。$v$ の展開は有限体積で行うこと。

<!-- solution-start -->
**詳細解答**

有限体積で正の固有値 $k^2+m^2$ を持つため、$|v|$ を十分小さくすると[本章の一ループ行列式](#thm-qft22-loop-determinant)の対数をTaylor展開できます。

$$
\begin{aligned}
U_1(v)-U_1(0)
&=\frac1{2V}\sum_{k\in K_\Lambda}
\log\left(1+\frac{\lambda v^2}{2(k^2+m^2)}\right)\\
&=\frac{\lambda v^2}{4V}\sum_k\frac1{k^2+m^2}
-\frac{\lambda^2v^4}{16V}\sum_k\frac1{(k^2+m^2)^2}
+O(v^6).
\end{aligned}
$$

$U''(0)$ は $v^2$ 係数の二倍なので、有限体積では $\Delta\Gamma^{(2)}(0)=\lambda A_{1,L}/2$、$U^{(4)}(0)$ は $v^4$ 係数の $24$ 倍なので $\Delta\Gamma^{(4)}(0)=-24\lambda^2A_{2,L}/16=-3\lambda^2A_{2,L}/2$ です。ここで $A_{j,L}$ は第2節で定義した有限和であり、$L\to\infty$ として $A_{1,L}\to I_1$、$A_{2,L}\to I_2$ を得ます。
<!-- solution-end -->

### 演習 QFT22-B2：内部線から表面的次数を得る

- Level: B
- 問題：四価頂点二つの連結図で、外線が四本の場合と二本の場合の $I,L,\omega$ を求めよ。二本の場合は三本の内部線を持つsunset型とし、これが一ループかどうかも判定せよ。

<!-- solution-start -->
**詳細解答**

$V_{\!g}=2$、半辺は八本です。[φ⁴グラフの表面的発散次数](#thm-qft22-power-count)を適用すると、外線四本では $2I=8-4=4$ より $I=2$。連結なので $L=I-V_{\!g}+1=1$、$\omega=4L-2I=4-4=0$ です。

外線二本では $2I=8-2=6$ から $I=3$、$L=3-2+1=2$、$\omega=8-6=2$ です。したがってsunsetは**二ループ**であり、二点の一ループ補正に混ぜてはいけません。両者とも $\omega=4-E$ と一致します。
<!-- solution-end -->

### 演習 QFT22-B3：積分変数の平行移動は領域も動かす

- Level: B
- 問題：一次元の簡単な類比として、$\Lambda=P=1$ の

$$
J=\int_{-1}^{1}\frac{dk}{1+(k+1)^2}
$$

を正確に求めよ。$u=k+1$ と置いたとき領域を $[-1,1]$ のままにするとどの値を誤って得るか説明せよ。

<!-- solution-start -->
**詳細解答**

$u=k+1$ なら下端 $k=-1$ は $u=0$、上端 $k=1$ は $u=2$ です。よって

$$
J=\int_0^2\frac{du}{1+u^2}
=\arctan2-\arctan0=\arctan2.
$$

領域を誤って $[-1,1]$ に戻すと $\arctan1-\arctan(-1)=\pi/2$ となり、異なる値です。四次元の鋭い球カットオフでも、$k$ を移せば球の中心と共通部分の条件を移さなければなりません。
<!-- solution-end -->

### 演習 QFT22-B4：零運動量の一致条件

- Level: B
- 問題：固定有限 $\Lambda$ で $\Gamma^{(2)}(0)=m_R^2$、$\Gamma^{(4)}(0,0,0,0)=\lambda_R$ を一次のループ補正まで満たしたい。$m_B^2=m_R^2+\delta m^2$ と $\lambda_B=\lambda_R+\delta\lambda$ を置いて必要な反項の先頭を求めよ。厳密なカットオフ除去の結論を導けるかも述べよ。

<!-- solution-start -->
**詳細解答**

[二点tadpoleと三チャネル四点bubble](#thm-qft22-one-loop-vertices)の公式を使います。計算の同じ次数では積分中の裸パラメータを $m_R,\lambda_R$ に置き換えられます。二点零運動量を一致させるには

$$
m_R^2=m_R^2+\delta m^2+\frac{\lambda_R}{2}I_1(\Lambda,m_R)
+O(\lambda_R^2)
$$

なので $\delta m^2=-\lambda_R I_1/2+O(\lambda_R^2)$ です。四点では

$$
\lambda_R=\lambda_R+\delta\lambda-\frac{3\lambda_R^2}{2}
I_2(\Lambda,m_R)+O(\lambda_R^3)
$$

より $\delta\lambda=3\lambda_R^2 I_2/2+O(\lambda_R^3)$ です。これらは有限カットオフでの次数ごとの相殺であり、全次数の収束、裸作用の正定値性、四次元相互作用φ⁴模型の連続極限を証明しません。
<!-- solution-end -->

### 演習 QFT22-C1：二点・四点・発散を一続きに再導出

- Level: C
- 問題：有限モードEuclid φ⁴作用から $H_\varphi$ を計算し、$\tfrac12\operatorname{Tr}\log H_\varphi$ の背景場四次までを展開せよ。そこから無限体積で $\Gamma^{(2)}(p)$ と $\Gamma^{(4)}(0,0,0,0)$ を一ループまで求め、$I_1,I_2$ を球殻積分で評価し発散次数を判定せよ。最後に同じ次数の波動関数反項の必要性と、$\Lambda\to\infty$ に関して未証明の点を説明せよ。

<!-- solution-start -->
**詳細解答**

**1. Hessianを求める。** 作用 $S$ の勾配項と質量項を二回変分すると $K=-\Delta+m^2$ が現れます。四次項の二階微分は $\lambda\varphi^2/2$ です。有限モードでは両側へ射影を入れ、

$$
H_\varphi=K_\Lambda+P_\Lambda\frac{\lambda\varphi^2}{2}P_\Lambda
$$

となります。

**2. 一ループを展開する。** [本章の行列式展開](#thm-qft22-loop-determinant)を使い、$C_\Lambda=K_\Lambda^{-1}$、$M_\varphi=P_\Lambda(\lambda\varphi^2/2)P_\Lambda$ と置きます。背景独立定数を落とすと

$$
\frac12\operatorname{Tr}\log(1+C_\Lambda M_\varphi)
=\frac12\operatorname{Tr}(C_\Lambda M_\varphi)
-\frac14\operatorname{Tr}(C_\Lambda M_\varphi C_\Lambda M_\varphi)
+O(\varphi^6).
$$

第一項は $\lambda C_\Lambda(0)\int\varphi^2/4$ です。第二項は

$$
-\frac{\lambda^2}{16}\int\varphi(x)^2C_\Lambda(x-y)^2
\varphi(y)^2\,d^4x\,d^4y
$$

です。

**3. 1PI頂点を取る。** 第一項に二回微分を行うと $2\cdot\lambda/4=\lambda/2$ です。第二項は四つの外線を二つずつ配る $6$ 通りと、それぞれ二階微分の $2!2!$ 通りから24通りを作ります。$x,y$ を交換した同一組分けを合わせると、三チャネルの各八通りです。よって一チャネルの係数は $-8\lambda^2/16=-\lambda^2/2$ です。零外線では三チャネルが一致します。従って

$$
\Gamma^{(2)}(p)=p^2+m^2+\frac{\lambda}{2}I_1+O(\lambda^2),\qquad
\Gamma^{(4)}(0,0,0,0)=\lambda-\frac{3\lambda^2}{2}I_2+O(\lambda^3).
$$

**4. 積分を評価する。** $d^4k/(2\pi)^4=r^3dr/(8\pi^2)$ の球殻公式と $u=r^2$ により

$$
I_1=\frac1{16\pi^2}\int_0^{\Lambda^2}
\left(1-\frac{m^2}{u+m^2}\right)du
=\frac{\Lambda^2-m^2\log(1+\Lambda^2/m^2)}{16\pi^2},
$$

$$
I_2=\frac1{16\pi^2}\int_0^{\Lambda^2}
\left(\frac1{u+m^2}-\frac{m^2}{(u+m^2)^2}\right)du
=\frac{\log(1+\Lambda^2/m^2)-\Lambda^2/(\Lambda^2+m^2)}{16\pi^2}.
$$

固定 $m$ で、$I_1$ は $\Lambda^2/(16\pi^2)$、$I_2$ は $\log(\Lambda^2/m^2)/(16\pi^2)$ が先頭です。図の数え上げでも $E=2$ なら $\omega=2$、$E=4$ なら $\omega=0$ と一致します。

**5. 範囲を判定する。** 二点の補正は $p$ に依存せず、$p^2$ の係数をこの次数で変える必要はありません。質量と結合の反項は零運動量の一致条件で次数ごとに定められますが、それは全次数での有限性、カットオフの除去後の構成、反射陽性や実時間理論の復元を保証しません。[QFT20の反射陽性条件](../QFT20/index.md#def-qft20-reflection-positivity)も別の問題として残ります。
<!-- solution-end -->

## 8. まとめと次の問い

- 二点一ループは $+\lambda I_1/2$ で、運動量に依存しないtadpoleです。
- 四点一ループは三チャネルの $-\lambda^2B_\Lambda/2$ の和で、零外線では $-3\lambda^2I_2/2$ です。
- 四次元で $I_1$ は二次、$I_2$ は対数のUV発散を持ちます。$4-E$ は図全体の表面的な判定で、部分グラフの監査までは代行しません。
- 鋭いカットオフの下で積分変数をずらすと領域も変わります。零運動量で読める対数係数と、外部運動量に依存する有限部分を区別します。

次は、計算で現れた $\Lambda$ 依存をくりこみ条件と反項で管理し、別の正則化法と比較します。有限カットオフの項別計算から、厳密な連続極限の存在を飛躍して主張しないことが重要です。
