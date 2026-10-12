# INT8 KAM定理と可積分性の破れ

[Liouville–Arnoldの定理](../INT2/index.md#thm-int2-liouville-arnold)と[作用角変数](../INT3/index.md#def-int3-action-angle)によれば、可積分Hamilton系の正則でコンパクトな共通レベル集合では、作用が一定で角度だけが直線的に動きます。ところが[近可積分Hamilton系](../INT4/index.md#def-int4-near-integrable)では角度依存の小さい項が混じり、[小分母](../INT4/index.md#def-int4-diophantine)のため通常の一次正規化を無限回続けられるとは限りません。

**小さな摂動で全ての不変トーラスが消えるわけでも、全てが残るわけでもありません。** どの振動数を選び、どの非退化性を課すと存続するのか。KAM（Kolmogorov–Arnold–Moser）理論は、この問いに対して解析的な収束構成を与えます。本章では固定したDiophantine振動数のトーラスについて、正準変換を反復して誤差を二乗する仕組みを証明し、共鳴層では何が違うかを計算します。

## 1. 存続に必要な二種類の条件

作用領域 $D\subset\mathbb R^n$ と角度トーラス $\mathbb T^n=(\mathbb R/2\pi\mathbb Z)^n$ において、$n\ge2$ とします。[正準Hamilton方程式](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)を使う座標では

$$
H_\varepsilon(\theta,I)=K(I)+\varepsilon f(\theta,I),\qquad
\dot\theta=\partial_IH_\varepsilon,\quad
\dot I=-\partial_\theta H_\varepsilon.
$$

非摂動系の振動数は $\Omega(I)=\nabla K(I)$ です。[一次ホモロジー方程式](../INT4/index.md#def-int4-homological)では $k\cdot\Omega$ で除算するため、振動数の算術的性質が問題となりました。一方、平均した振動数のずれを、近くの作用の選び直しで補うには $\Omega$ 自身を局所的に逆写像にできなければなりません。

<a id="def-int8-kolmogorov"></a>

<!-- formal-statement-start -->
> **定義（Kolmogorov非退化性）**  
> $K\in C^2(D)$ とする。点 $I_*\in D$ で
>
$$
\det D^2K(I_*)\ne0
$$
>
> のとき、$K$ は $I_*$ でKolmogorov非退化であるという。領域上の一様非退化性は、対象とするコンパクト部分集合で逆Hessianのノルムが一様有界であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int8-kolmogorov -->
### 直接例：振動数が作用を識別する

**定義の確認**：$K(I)=\omega_*\cdot I+\tfrac12(I_1^2+2I_2^2)$ では $D^2K=\operatorname{diag}(1,2)$、行列式は $2\ne0$ です。$\Omega(I)=(\omega_{*1}+I_1,\omega_{*2}+2I_2)$ だから振動数の微小な変化から作用の変化を一意に復元できます。対照的に $K(I)=\omega_*\cdot I$ は $D^2K=0$ で、この調整機構を欠きます。
<!-- definition-example-end -->

<a id="def-int8-diophantine"></a>

<!-- formal-statement-start -->
> **定義（Diophantine振動数）**  
> $n\ge2$、$\gamma>0$、$\tau>n-1$ とする。$\omega\in\mathbb R^n$ がすべての非零 $k\in\mathbb Z^n$ に対し
>
$$
|k\cdot\omega|\ge\gamma |k|_1^{-\tau},
\qquad |k|_1=\sum_{j=1}^n|k_j|
$$
>
> を満たすとき、$\omega$ は $(\gamma,\tau)$-Diophantine振動数という。
<!-- formal-statement-end -->

これは[INT4のDiophantine条件](../INT4/index.md#def-int4-diophantine)を本章の定数とノルムで書き直したものです。非共鳴というだけでは $|k\cdot\omega|^{-1}$ の大きさを抑えられません。$\tau>n-1$ は後で共鳴帯の体積を足し上げるためにも効きます。

<!-- definition-example-start: def-int8-diophantine -->
### 直接例：$(1,\sqrt2)$ の小分母

**定義の確認**：$k=(a,b)\in\mathbb Z^2\setminus\{0\}$ とし、$b\ne0$ の場合は

$$
|a+b\sqrt2|\,|a-b\sqrt2|
=|a^2-2b^2|\ge1.
$$

$a-b\sqrt2$ の絶対値は $|a|+\sqrt2|b|\le\sqrt2|k|_1$ なので、$|a+b\sqrt2|\ge(\sqrt2|k|_1)^{-1}$ です。$b=0$ でも同じ下界が成り立ちます。従って $\omega=(1,\sqrt2)$ は例えば任意の $\tau>1$ と $0<\gamma\le1/\sqrt2$ について上の条件を満たします。
<!-- definition-example-end -->

## 2. 存続するのは、振動数を指定したトーラス

単なる「近い軌道」ではなく、**不変なトーラス上で全時刻の運動を共役にする**のが結論です。

<a id="thm-int8-kam"></a>

<!-- formal-statement-start -->
> **定理（解析的Kolmogorov型KAM定理：固定振動数版）**  
> $n\ge2$、$D\subset\mathbb R^n$ は開、$I_*\in D$ とする。実数値Hamilton関数 $K(I)$ と $f(\theta,I)$ は、$\mathbb T^n\times D$ の $I_*$ 近傍から複素角度幅 $s>0$・複素作用半径 $r>0$ の近傍へ、実解析的かつ有界に延長されるとする。$D^2K(I_*)$ は可逆であり、
>
$$
\omega_*=\nabla K(I_*),\qquad
|k\cdot\omega_*|\ge\gamma|k|_1^{-\tau}
\quad(k\ne0),\quad \tau>n-1
$$
>
> が成り立つとする。延長領域上の $K$ の導関数、$f$ の解析ノルム、$s,r$、$\gamma,\tau$ および $(D^2K(I_*))^{-1}$ のノルムから決まる $\varepsilon_0>0$ が存在し、$|\varepsilon|<\varepsilon_0$ なら $H_\varepsilon=K+\varepsilon f$ のHamilton流は、$I=I_*$ の近くに実解析的な埋め込み
>
$$
\mathcal K_\varepsilon:\mathbb T^n\longrightarrow
\mathbb T^n\times D
$$
>
> を持ち、
>
$$
\varphi_{H_\varepsilon}^t
\bigl(\mathcal K_\varepsilon(\phi)\bigr)
=\mathcal K_\varepsilon(\phi+\omega_*t)
\quad(t\in\mathbb R)
$$
>
> を満たす。像はLagrange不変トーラスであり、$\varepsilon\to0$ において $\mathcal K_\varepsilon(\phi)\to(\phi,I_*)$ となる。
<!-- formal-statement-end -->

この定理の「$\varepsilon$ が十分小さい」は単に数値として小さいという意味ではなく、**解析幅、非退化性、小分母下界との相対的な小ささ**です。$I_*$ 自体を不変な作用として固定するわけではありません。トーラスが少し移動しても、その上の回転振動数 $\omega_*$ を固定できます。

### 具体例：非退化な二振動子

$$
K(I_1,I_2)=I_1+\sqrt2I_2+\tfrac12(I_1^2+I_2^2),
\qquad f(\theta,I)=\cos(\theta_1-\theta_2)+I_1\cos\theta_2.
$$

$I_*=(0,0)$ で $\omega_*=(1,\sqrt2)$、$D^2K=\begin{pmatrix}1&0\\0&1\end{pmatrix}$ で行列式は1です。$f$ は解析的であり、上の算術的下界も確認済みなので、十分小さい $|\varepsilon|$ に対してこの振動数をもつ不変トーラスが存在します。ただし角度依存摂動があるため、もとの $I=(0,0)$ 自体が不変だと主張しているわけではありません。

## 3. Fourier除算に失われる解析幅を数える

本定理を単なるブラックボックスにしないため、Newton型反復の核心を導きます。複素ストリップ

$$
S_s=\{\theta\in\mathbb C^n/(2\pi\mathbb Z)^n:
|\operatorname{Im}\theta_j|<s\}
$$

上の有界解析的周期関数の上限ノルムを $\|g\|_s$ とします。角度平均を $\langle g\rangle$ とします。

<a id="lem-int8-cohomology"></a>

<!-- formal-statement-start -->
> **補題（解析的ホモロジー方程式の損失評価）**  
> $\omega$ が $(\gamma,\tau)$-Diophantine、$g$ は $S_s$ 上の有界解析的零平均関数とする。$0<\sigma<s$ なら、零平均の一意な解析解 $u$ が
>
$$
\omega\cdot\partial_\theta u=g
$$
>
> を満たし、$p=0,1,2$ に対し
>
$$
\|\partial_\theta^p u\|_{s-\sigma}
\le C_{n,\tau,p}\gamma^{-1}
\sigma^{-(\tau+n+p)}\|g\|_s
$$
>
> が成り立つ。ただし $\partial_\theta^p$ は全ての次数 $p$ の偏導関数の最大ノルムを意味し、$0<\sigma\le1$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

$g_k$ は解析性により指数減衰し、$1/(k\cdot\omega)$ は多項式程度しか増えません。その差を幅 $\sigma$ だけ残したストリップ上で和にします。

<!-- proof-start -->
### 証明

$g=\sum_{k\ne0}g_ke^{ik\cdot\theta}$ と展開します。複素角度を各成分の $-\operatorname{sgn}(k_j)s$ 側へ動かす積分表示（まず $s'<s$ で行い $s'\uparrow s$ とする）から

$$
|g_k|\le\|g\|_s e^{-|k|_1s}.
$$

定数係数を零に定め、

$$
u(\theta)=\sum_{k\ne0}\frac{g_k}{i\,k\cdot\omega}
e^{ik\cdot\theta}
$$

と置きます。Diophantine下界で分母は零でなく、$p$ 階微分後の項は

$$
|k|_1^p\left|\frac{g_k}{k\cdot\omega}\right|
e^{|k|_1(s-\sigma)}
\le \gamma^{-1}|k|_1^{\tau+p}
e^{-|k|_1\sigma}\|g\|_s.
$$

$|k|_1=m$ となる格子点数は $C_nm^{n-1}$ 以下なので、

$$
\sum_{k\ne0}|k|_1^{\tau+p}e^{-|k|_1\sigma}
\le C_n\sum_{m=1}^{\infty}m^{\tau+p+n-1}e^{-m\sigma}
\le C_{n,\tau,p}\sigma^{-(\tau+n+p)}.
$$

最後の不等式は $x^{\tau+p+n-1}e^{-\sigma x}$ の積分と有限個の最初の項を評価すれば得られます。よって項別微分が $S_{s-\sigma}$ 上で一様収束し、方程式を満たします。零平均解が二つあればその差の非零Fourier係数は $(ik\cdot\omega)w_k=0$、零係数も零ですから一意です。
<!-- proof-end -->

この補題だけで一度の変換の大きさが制御できます。しかし一回正規化しただけでは二次の誤差が残ります。次にそれも同じ構造で消します。

## 4. 一段の正準変換でトーラス上の誤差を二乗する

$J=0$ 上で角度依存の定数項も一次項もないHamilton関数

$$
e+\omega\cdot J+O(|J|^2)
$$

なら、$J=0$ は不変で $\dot\theta=\omega$ です。そこで**Hamilton関数の全体を角度非依存にするのでなく、作用に関する0次・1次のjetだけを消す**のが効率的です。

$\|a\|_s+\|b\|_s\le\delta$ として

$$
H(\theta,I)=e+\omega\cdot I+G(\theta,I)+a(\theta)+b(\theta)\cdot I,
\quad G(\theta,0)=\partial_I G(\theta,0)=0
$$

を考えます。$A(\theta)=\partial_I^2G(\theta,0)$、$\bar A=\langle A\rangle$ と置きます。非退化性を $\det\bar A\ne0$ で表します。重要なのは $G$ の二次以上を全て消す必要はない点です。

<a id="lem-int8-newton-step"></a>

<!-- formal-statement-start -->
> **補題（解析的KAM正規化の一段）**  
> $\omega$ は $(\gamma,\tau)$-Diophantine、$H$ は $S_s\times\{|I|<r\}$ で有界解析的、$G$ は作用0次・1次jetが零とする。$\|D_I^2G\|$ と必要な導関数が有界であり、$\bar A=\langle D_I^2G(\cdot,0)\rangle$ が可逆で逆行列ノルムが有界とする。上の分解で $\delta=\|a\|_s+\|b\|_s$ とする。このデータの解析ノルム上界を固定すると、正数 $C,M,\delta_*$ が取れる。$0<\sigma<\min(s/4,1)$、$0<\rho<r/2$ を選び、$\delta\gamma^{-2}(\sigma\rho)^{-M}<\delta_*$ なら、角度幅 $s-2\sigma$、作用半径 $r-\rho$ の縮小領域上で、恒等写像に近い実解析的正準変換により
>
$$
H^+(\Theta,J)=e^++\omega\cdot J+
G^+(\Theta,J)+a^+(\Theta)+b^+(\Theta)\cdot J
$$
>
> とできる。$G^+$ の0次・1次jetは零、$\langle D_J^2G^+(\cdot,0)\rangle$ は可逆のままであり、
>
$$
\|a^+\|_{s-2\sigma}+\|b^+\|_{s-2\sigma}
\le C\gamma^{-4}(\sigma\rho)^{-M}\delta^2.
$$
>
> $C,M,\delta_*$ は、前述の解析ノルムの上界、作用半径の下界、逆Hessianの上界および $n,\tau$ に依存する。変換の恒等写像からのずれ（角度・作用の両成分）にも $C\gamma^{-2}(\sigma\rho)^{-M}\delta$ の上界がある。作用の損失 $\rho$ を明示したのは、反復で作用半径も段階的に縮めるためである。
<!-- formal-statement-end -->

### 証明の見取り図

最初に定数項を消す $u$、次に角度依存一次項を消す $v$、最後に平均振動数を合わせる作用移動 $q$ を同時に決めます。線形化方程式の解で一次の誤差が消え、正準変換へ代入した残差が $\delta^2$ になることを中間式で確かめます。

<!-- proof-start -->
### 証明

求める未知量を、零平均の $u(\theta)$、$v(\theta)\in\mathbb R^n$ と定数 $q\in\mathbb R^n$ とします。まず

$$
\omega\cdot\partial_\theta u=-(a-\langle a\rangle),
\qquad \langle u\rangle=0
$$

を[ホモロジー方程式の評価](#lem-int8-cohomology)で解きます。次に

$$
q=-\bar A^{-1}
\left\langle b+A\,\partial_\theta u\right\rangle,
\quad d(\theta)=b(\theta)+A(\theta)(q+\partial_\theta u(\theta))
$$

と定めます。平均を計算すると

$$
\langle d\rangle=\langle b+A\partial_\theta u\rangle+\bar A q=0.
$$

よって $n$ 本の零平均方程式

$$
\omega\cdot\partial_\theta v=-d,\qquad\langle v\rangle=0
$$

にも同じ補題を適用できます。二回の除算と微分による解析幅の損失をまとめれば

$$
|q|+\|u\|_{C^2(S_{s-2\sigma})}
+\|v\|_{C^2(S_{s-2\sigma})}
\le C\gamma^{-2}\sigma^{-M}\delta
$$

となります（$M$ は有限で十分大きく取る）。右辺が十分小さいとき $\Theta=\theta+v(\theta)$ は複素ストリップの縮小領域で可逆です。

第二種生成関数の微分で与える変換

$$
S(\theta,J)=(\theta+v(\theta))\cdot J+u(\theta)+q\cdot\theta,
$$

$$
\Theta=\partial_J S=\theta+v(\theta),\qquad
I=\partial_\theta S=(\mathrm{Id}+Dv(\theta)^T)J+\partial_\theta u(\theta)+q
$$

を用います。$q\cdot\theta$ はトーラス上で多価ですが、その微分 $q\cdot d\theta$ は一価の閉1形式であり、上式は大域的によく定義されたシンプレクティック変換です。[生成関数の正準性](../INT5/index.md#prop-int5-canonical-map)と同じ微分計算で正準性を確かめられます。

ここで $h=q+\partial_\theta u$ として $J=0$ に代入した定数項は

$$
H(\theta,h)=e+\omega\cdot h+a(\theta)
+b(\theta)\cdot h+\tfrac12h^TA(\theta)h+O(|h|^3).
$$

$\omega\cdot\partial_\theta u+a=\langle a\rangle$ なので、第一行の角度依存は消え、

$$
H(\theta,h)=e+\omega\cdot q+\langle a\rangle+O(\delta^2)
$$

です。また $J$ で微分して $J=0$ とすると

$$
\begin{aligned}
\partial_J(H\circ\Psi)(\Theta,0)
&=(\mathrm{Id}+Dv)\bigl(\omega+b+A h+O(|h|^2)\bigr)\\
&=\omega+\underbrace{(\omega\cdot\partial_\theta)v+b+A(q+\partial_\theta u)}_{=0}
+O(\delta^2).
\end{aligned}
$$

二行目では積 $Dv\,(b+Ah)$ と $|h|^2$ がともに二次残差です。$\Theta\mapsto\theta$ への変数変換も、先頭が定数 $e+\omega\cdot q+\langle a\rangle$、一次係数が定数 $\omega$ なので、零次・一次jetに新たな一次誤差を作りません。

Taylorの積分余剰を $h=q+\partial_\theta u$ に適用すると、$G(\theta,h)-\tfrac12h^TAh$ は $D_I^3G$ の上限の定数倍の $|h|^3$ 以下であり、$\partial_I G(\theta,h)-Ah$ は $D_I^3G$ の上限の定数倍の $|h|^2$ 以下です。

さらに、定数jetの $b\cdot h$ と一次jetの $Dv(b+Ah)$ は各因子が誤差に比例するため、二次の大きさです。

解析関数の積・合成・逆写像・Taylor余剰には、角度方向と作用方向の両方で余白が必要です。[Cauchy評価](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-estimate)を各変数に適用すると、

$
\|\partial_{\theta_j}F\|_{s-\sigma,r-\rho}
\le \sigma^{-1}\|F\|_{s,r},\qquad
\|\partial_{I_j}F\|_{s-\sigma,r-\rho}
\le \rho^{-1}\|F\|_{s,r}
$

となります。正準変換を縮小領域に収めるには、角度変位と作用変位について、それぞれ

$
\|v\|<\sigma,\qquad
|q|+\|\partial_\theta u\|+r\|Dv\|<\rho
$

を十分小さい誤差で確保します。このとき $\|Dv\|<1/2$ も満たすよう選べば、角度の逆写像も存在します。これらの条件は補題に掲げた小ささの仮定から、指数を十分大きくして従います。

したがって相殺後の $a^+,b^+$ は、$b\cdot h$、$h^TAh$、$Dv(b+Ah)$ および上記Taylor余剰からなる二次以上の項です。各々を縮小領域で評価すると、例えば $\|b\cdot h\|\le\|b\|_s\|h\|$、$\|Dv(b+Ah)\|\le\|Dv\|(\|b\|_s+\|A\|\|h\|)$ となり、どちらも $O(\delta^2)$ です。有限回の角度・作用の微分損失を $C(\sigma\rho)^{-M}$ にまとめれば、補題の $\delta^2$ 評価を得ます。ここで $M$ はこれらの微分回数を上から押さえる固定の指数であり、$\sigma,\rho$ を縮めても同じ値を使えます。

二階作用微分の差は、変換の導関数を積の微分公式で展開し、作用方向に必要な余白 $\rho$ を含むCauchy評価を施すと $O(\gamma^{-2}(\sigma\rho)^{-M}\delta)$ で抑えられます。$\bar A$ の逆行列ノルムを上から抑えたままにするには、その変化を $1/(2\|\bar A^{-1}\|)$ より小さく選べば十分です。
<!-- proof-end -->

この補題は「KAMが収束する」と宣言するだけでなく、何を解いて何が二乗されるかを指定しました。残るのは、解析幅を無限回失っても幅が正に残り、誤差がそれより速く減ることです。

<a id="prop-int8-quadratic-convergence"></a>

<!-- formal-statement-start -->
> **命題（損失を伴う二次反復の収束）**  
> $M,C,\gamma,s>0$ を固定し、$\sigma_j=s\,2^{-j-4}$ と置く。非負列 $\delta_j$ が
>
$$
\delta_{j+1}\le C\gamma^{-4}\sigma_j^{-M}\delta_j^2
$$
>
> を満たすなら、十分小さい $\delta_0$ に対して $\sum_{j\ge0}\gamma^{-2}\sigma_j^{-M}\delta_j<\infty$ となり、$\delta_j\to0$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$B=C\gamma^{-4}(16/s)^M$ とすると

$$
\delta_{j+1}\le B2^{Mj}\delta_j^2.
$$

$z_j=B2^{M(j+1)}\delta_j$ と置き換えると

$$
z_{j+1}\le
B2^{M(j+2)}B2^{Mj}
\frac{z_j^2}{B^22^{2M(j+1)}}=z_j^2.
$$

従って $z_0<1/2$ を選べば $z_j\le(1/2)^{2^j}$ です。元に戻せば $\delta_j\le B^{-1}2^{-M(j+1)}2^{-2^j}$ であり、$\gamma^{-2}\sigma_j^{-M}\delta_j$ の和は $\sum2^{-2^j}$ の定数倍以下です。さらに $\sum_{j\ge0}2\sigma_j=s/4$ なので、角度の解析幅は $s$ から少なくとも $3s/4$ 残ります。
<!-- proof-end -->

### 定理の完成：反復極限を不変トーラスに戻す

[一段の正規化](#lem-int8-newton-step)を、各段の角度損失と作用損失を次のように選んで反復します。

$
\sigma_j=s2^{-j-4},\qquad
\rho_j=r2^{-j-3}=\frac{2r}{s}\sigma_j,
\qquad
r_j=r-\sum_{\ell<j}\rho_\ell
=r\left(\frac34+2^{-j-2}\right).
$

このとき、作用方向のCauchy損失は

$
(\sigma_j\rho_j)^{-M_0}
=\left(\frac{s}{2r}\right)^{M_0}\sigma_j^{-2M_0}
$

と書けます。そこで[二次反復命題](#prop-int8-quadratic-convergence)の指数を $M\ge2M_0$ に選び直せば、同じ形式の漸化式が使えます。

初期Hamilton関数を $I=I_*+J$ の周りに展開します。定数項を $e=K(I_*)$、一次項を $\omega=\nabla K(I_*)$ とし、作用二次以上を $G$ に入れ、残りを $a,b$ とします。初期の誤差は $O(|\varepsilon|)$ であり、平均Hessianは

$
\bar A=D^2K(I_*)+O(\varepsilon).
$

従って十分小さい摂動では逆Hessianが有界のままです。ここがKolmogorov非退化性を用いる箇所です。

命題により反復変換の大きさの和は有限です。角度幅を $s_j=s-2\sum_{\ell<j}\sigma_\ell$ と選びます。

$s_j\ge3s/4$、$r_j\ge3r/4$ であり、隣接する作用半径の差は正確に $\rho_j=r2^{-j-3}$ です。二次漸化式から $\delta_j\le C_0 2^{-Mj}2^{-2^j}$ となるため、変換の移動量を $C_1\gamma^{-2}(\sigma_j\rho_j)^{-M_0}\delta_j$ で上から抑えても、$\delta_0$ を十分小さくすれば各段で $\rho_j$ より小さくできます。角度の移動量についても $\sigma_j$ と比較して同様です。よって全段で縮小領域に収まります。したがって全変換は共通の縮小領域で定義され、一様極限 $\Psi_\infty$ を持ちます。

導関数も一段の $C^2$ 評価の和が有限であることにより収束し、極限は角度方向の微分が可逆な正準埋め込みを与えます。極限Hamilton関数は

$$
H_\infty(\Theta,J)=e_\infty+\omega_*\cdot J+G_\infty(\Theta,J),
\qquad G_\infty(\Theta,0)=\partial_JG_\infty(\Theta,0)=0
$$

なので、$J=0$ で $\dot J=0$、$\dot\Theta=\omega_*$ です。[正準変換の正準性](../INT5/index.md#prop-int5-canonical-map)を用いて元の座標へ戻すと

$$
\mathcal K_\varepsilon(\phi)=\Psi_\infty(\phi,0),\qquad
\varphi_{H_\varepsilon}^t(\mathcal K_\varepsilon(\phi))
=\mathcal K_\varepsilon(\phi+\omega_*t)
$$

が得られます。$\Psi_\infty$ がシンプレクティックなので、$J=0$ のLagrange性は像へ移ります。$|\varepsilon|\to0$ で変換の和も零へ向かうため、定理の近接結論も従います。**小分母による有限の解析幅損失を、二次収束で上回る**のがKAM反復の核心です。

## 5. 生き残る振動数集合は薄い穴を持つ

「Diophantine振動数は少数しかない」と誤解しやすいですが、固定した $\gamma$ について共鳴付近の薄い帯を除いた集合は、$\gamma$ が小さければ大きな測度を保ちます。

<a id="prop-int8-cantor-measure"></a>

<!-- formal-statement-start -->
> **命題（有界振動数領域の共鳴帯評価）**  
> $W\subset\mathbb R^n$ は有界可測集合、$\tau>n-1$ とする。$W$ 内で $(\gamma,\tau)$-Diophantine条件を満たさない振動数のLebesgue測度は、$\gamma$ が十分小さいとき $C_{W,n,\tau}\gamma$ 以下である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

非零 $k\in\mathbb Z^n$ に対し、排除する帯は

$$
B_k=\{\omega\in W:|k\cdot\omega|<\gamma |k|_1^{-\tau}\}.
$$

$k/|k|_2$ 方向の座標で測る厚さは $2\gamma|k|_1^{-\tau}/|k|_2$ です。$W$ を含む一つの立方体を固定すれば、その直交方向への射影体積は $k$ によらず有界なので

$$
\operatorname{vol}(B_k)\le C_W\gamma|k|_1^{-(\tau+1)}.
$$

$\ell^1$ ノルムが $m$ の整数ベクトルは高々 $C_nm^{n-1}$ 個です。劣加法性から

$$
\operatorname{vol}\left(W\cap\bigcup_{k\ne0}B_k\right)
\le C\gamma\sum_{m=1}^\infty m^{n-\tau-2}<\infty\cdot\gamma.
$$

最後の級数は $\tau>n-1$ により収束します。
<!-- proof-end -->

Hessianが可逆なら逆写像定理により、振動数空間のこの非共鳴集合を作用空間へ引き戻せます。共鳴帯を無限個除いた残りは一般に滑らかな開領域でなく、**Cantor状の集合**です。各固定振動数トーラスを[解析的KAM定理](#thm-int8-kam)で構成すれば、その集合に対応する多数の不変トーラスが存続します。「ほとんど全部」と言うには $\gamma$ と $|\varepsilon|$ の小ささを連動させる必要があり、固定された任意の摂動について無条件に全測度だとは言えません。

## 6. 共鳴トーラスの崩壊を実際に計算する

Diophantine条件を失った場所では、単に証明が難しいだけでなく、トーラスが壊れる例が作れます。$n=2$ で

$$
H=\omega_1I_1+\omega_2I_2+
\frac12(I_1^2+I_2^2)+\varepsilon\cos(\theta_1-\theta_2),
\qquad\varepsilon>0
$$

を考えます。この非摂動部分のHessianは単位行列で非退化です。それでも共鳴層は守られるとは限りません。

[共鳴角・作用の正準変換](../INT5/index.md#def-int5-resonant-coordinates)と同じ計算で

$$
\psi=\theta_1-\theta_2,\quad
\phi=\theta_2,\quad
J=I_1,\quad L=I_1+I_2
$$

と置けば、$I_1d\theta_1+I_2d\theta_2=Jd\psi+Ld\phi$ で正準です。$L$ は保存され、$J_*=(L-\omega_1+\omega_2)/2$ とすると

$$
H=(J-J_*)^2+\varepsilon\cos\psi
+\omega_2L+\frac12L^2-J_*^2.
$$

従って

$$
\dot\psi=2(J-J_*),\qquad
\dot J=\varepsilon\sin\psi,\qquad \dot L=0.
$$

非摂動系では $J=J_*$ の任意の $\psi,\phi$ が共鳴トーラスを成します。摂動後に $J=J_*$ のままでは $\dot J=\varepsilon\sin\psi$ が一般に零ではなく、**元の共鳴トーラスは不変でなくなります**。

$\psi=0,J=J_*$ は線形化で $\ddot\psi=2\varepsilon\psi$ を満たす双曲型、$\psi=\pi,J=J_*$ では $\ddot{\eta}=-2\varepsilon\eta$ の楕円型です。

その間に分離曲線が現れます。[INT5の振り子正規形](../INT5/index.md#prop-int5-pendulum-width)で扱った機構が、トーラスの存続と破れの境目に現れました。

## 7. 天体力学とArnold拡散へ

制限三体問題では、ある局所作用角領域の非摂動近似に非退化性とDiophantine条件を確認できれば、KAMトーラスは長期間どころか**理想化したHamiltonモデルの全時刻にわたる**準周期軌道を保証します。ただし衝突、分離曲線、共鳴、非退化性の破れ、特異な座標領域へ結論を延長できません。特にKepler問題の作用に関するHessianは退化するため、惑星問題へこの定理をそのまま代入することはできず、簡約や永年平均を伴う別の非退化条件が必要です。

自由度 $n=2$ の固定エネルギー面は3次元でKAMトーラスは2次元、局所的には運動の通過を妨げる壁になり得ます。$n\ge3$ では固定エネルギー面の次元 $2n-1$ に対しトーラスの余次元は $n-1\ge2$ です。隙間を通じた遅い作用移動（Arnold拡散）の余地が生まれますが、**KAMの結論だけで拡散の存在を証明したことにはなりません**。逆KAM理論も、ある候補トーラスの不存在を別の判定法で示す方向であり、KAMの単純な否定ではありません。

## 8. 演習：何が残り、どこで破れるか

### Level A

<a id="ex-int8-a01"></a>
**A1. 非退化性の判定。** $K(I)=3I_1+2I_2+(I_1^2+4I_2^2)/2$ と $L(I)=3I_1+2I_2$ のHessianを求め、Kolmogorov非退化性を判定せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $D^2K=\begin{pmatrix}1&0\\0&4\end{pmatrix}$ で $\det D^2K=4\ne0$ です。$\nabla K=(3+I_1,2+4I_2)$ から作用を逆算できます。$D^2L=0$ で行列式は零、$\nabla L=(3,2)$ は全作用で同じです。[非退化性の定義](#def-int8-kolmogorov)により前者のみ非退化です。
<!-- solution-end -->

<a id="ex-int8-a02"></a>
**A2. 小分母を割る。** $\omega=(1,\sqrt2)$、$g(\theta)=2\cos\theta_1+\sin(\theta_1-\theta_2)$ について、零平均の $\omega\cdot\partial_\theta u=g$ を三角関数で解け。

- Level: A

<!-- solution-start -->
**詳細解答。** $\omega\cdot\partial_\theta\sin\theta_1=\cos\theta_1$ なので第一項は $2\sin\theta_1$ です。$\omega\cdot\partial_\theta\cos(\theta_1-\theta_2)=-(1-\sqrt2)\sin(\theta_1-\theta_2)$ なので第二項には係数 $-1/(1-\sqrt2)$ を掛けます。従って

$$
u(\theta)=2\sin\theta_1-\frac{\cos(\theta_1-\theta_2)}{1-\sqrt2}.
$$

微分すると確かに $g$ が得られ、どちらの項も角度平均が零です。[解析的ホモロジー方程式](#lem-int8-cohomology)の一意性とも一致します。
<!-- solution-end -->

<a id="ex-int8-a03"></a>
**A3. 共鳴の検出。** $\omega=(2,3)$、$k=(3,-2)$ がDiophantine条件を満たさない理由を、任意の $\gamma>0$ に対して示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** $k\cdot\omega=3\cdot2-2\cdot3=0$ です。他方、右辺は $\gamma|k|_1^{-\tau}=\gamma5^{-\tau}>0$ です。従って下界に反します。$\gamma$ をどれだけ小さくしても等式 $0>0$ にはならず、共鳴と「非常に小さいが非零」は異なります。
<!-- solution-end -->

<a id="ex-int8-a04"></a>
**A4. 動かないトーラスを誤認しない。** $H(\theta,I)=\omega\cdot I+\frac12|I|^2+\varepsilon\cos\theta_1$、$\varepsilon\ne0$ とする。$I=0$ が不変集合でないことをHamilton方程式から示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\dot I_1=-\partial_{\theta_1}H=\varepsilon\sin\theta_1$、$\dot I_2=0$ です。$I=0$ 上でも $\theta_1=\pi/2$ の点では $\dot I_1=\varepsilon\ne0$ なので、その点の軌道は $I=0$ から出ます。KAM定理が主張するのは[新しい埋め込みトーラス](#thm-int8-kam)であり、旧座標の $I=0$ の不変性ではありません。
<!-- solution-end -->

<a id="ex-int8-a05"></a>
**A5. 格子点数と測度評価。** $\mathbb Z^2$ で $|k|_1=m$ となる整数対がちょうど $4m$ 個あることを示し、$\tau>1$ のとき $\sum_{k\ne0}|k|_1^{-\tau-1}<\infty$ を確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $(\pm m,0),(0,\pm m)$ が4個、各 $a=1,\ldots,m-1$ に対して $(\pm a,\pm(m-a))$ が4個です。合計 $4+4(m-1)=4m$ 個です。従って

$$
\sum_{k\ne0}|k|_1^{-\tau-1}
=\sum_{m=1}^{\infty}4m\,m^{-\tau-1}
=4\sum_{m=1}^{\infty}m^{-\tau}.
$$

$\tau>1$ のときこの級数は収束し、[共鳴帯評価](#prop-int8-cantor-measure)の二次元の場合を確認できます。
<!-- solution-end -->

### Level B

<a id="ex-int8-b01"></a>
**B1. 一段の定数・線形補正。** $n=2$、$\omega=(1,\sqrt2)$、$G(I)=|I|^2/2$、$a(\theta)=\delta\cos\theta_1$、$b(\theta)=(\delta\cos\theta_2,0)$ とする。[一段の正規化](#lem-int8-newton-step)の $u,q,v$ を一次まで求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $A=\mathrm{Id}$ かつ $\bar A=\mathrm{Id}$ です。$\omega\cdot\partial_\theta u=-\delta\cos\theta_1$ なので $u=-\delta\sin\theta_1$、$\partial_\theta u=(-\delta\cos\theta_1,0)$ です。$b+A\partial_\theta u=(\delta\cos\theta_2-\delta\cos\theta_1,0)$ は平均零、従って $q=0$ です。

$$
d=b+\partial_\theta u=(\delta(\cos\theta_2-\cos\theta_1),0).
$$

第一成分の式は $\omega\cdot\partial_\theta v_1=-\delta\cos\theta_2+\delta\cos\theta_1$、第二成分は零です。$\omega\cdot\partial_\theta\sin\theta_2=\sqrt2\cos\theta_2$ より

$$
v_1=\delta\sin\theta_1-\frac{\delta}{\sqrt2}\sin\theta_2,\qquad v_2=0.
$$

$\omega\cdot\partial_\theta v+d=0$ を再代入で検算できます。
<!-- solution-end -->

<a id="ex-int8-b02"></a>
**B2. 二次収束を数字で確かめる。** $\delta_{j+1}\le16\cdot2^{2j}\delta_j^2$ で $\delta_0=1/128$ とする。$z_j=16\cdot2^{2(j+1)}\delta_j$ の不等式と $\delta_j\to0$ を示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** ここでは $B=16,M=2$ です。定義より $z_0=16\cdot4/128=1/2$ で、

$$
\begin{aligned}
z_{j+1}
&=16\cdot2^{2(j+2)}\delta_{j+1}\\
&\le16\cdot2^{2(j+2)}16\cdot2^{2j}\delta_j^2\\
&=(16\cdot2^{2(j+1)}\delta_j)^2=z_j^2.
\end{aligned}
$$

帰納的に $z_j\le(1/2)^{2^j}$ です。従って $\delta_j= z_j/(16\cdot2^{2(j+1)})\to0$ であり、$\sum_j2^{2j}\delta_j$ も収束します。[二次反復の収束](#prop-int8-quadratic-convergence)が解析幅の損失を上回る仕組みです。
<!-- solution-end -->

<a id="ex-int8-b03"></a>
**B3. 共鳴正準座標と安定型。** 第6節のHamilton関数で新座標 $(\psi,\phi,J,L)$ の正準性を示し、$(\psi,J)=(0,J_*)$ と $(\pi,J_*)$ の線形化固有値を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\theta_1=\psi+\phi$、$\theta_2=\phi$、$I_1=J$、$I_2=L-J$ を代入すると

$$
I_1d\theta_1+I_2d\theta_2
=J(d\psi+d\phi)+(L-J)d\phi=Jd\psi+Ld\phi.
$$

従って正準1形式を保存します。$x=J-J_*$ と置くと $\dot\psi=2x$、$\dot x=\varepsilon\sin\psi$ です。$(0,0)$ の線形化行列は $\begin{pmatrix}0&2\\ \varepsilon&0\end{pmatrix}$ で固有値は $\pm\sqrt{2\varepsilon}$、双曲型です。$(\pi,0)$ では $\sin(\pi+\eta)\simeq-\eta$ なので行列は $\begin{pmatrix}0&2\\-\varepsilon&0\end{pmatrix}$、固有値は $\pm i\sqrt{2\varepsilon}$ で楕円型です。後者の楕円型平衡点の存在だけから周囲全体がKAMトーラスで埋まるとは言えません。
<!-- solution-end -->

### Level C

<a id="ex-int8-c01"></a>
**C1. KAMの存続と共鳴の破れを一つの系で判定する。** $K(I)=\frac12(I_1^2+I_2^2)$、$H_\varepsilon=K+\varepsilon\cos(\theta_1-\theta_2)$、$I\in\mathbb R^2$ とする。(i) $I_*=(1,\sqrt2)$ の周囲で定理を適用できること、(ii) $I_1=I_2$ の非摂動共鳴トーラスが $\varepsilon>0$ で不変でないこと、(iii) この二つが矛盾しない理由を示せ。

- Level: C

<!-- solution-start -->
**詳細解答。** (i) $D^2K=\mathrm{Id}$ なので $\det D^2K=1$、逆行列は単位行列です。$\nabla K(I_*)=(1,\sqrt2)$ であり、[直接例で導いたDiophantine下界](#def-int8-diophantine)を満たします。

$K$ は多項式、$f=\cos(\theta_1-\theta_2)$ は任意の有限幅の複素ストリップで有界解析的です。したがって固定した幅・半径・$\gamma,\tau$ に対し、十分小さい $|\varepsilon|$ なら[解析的KAM定理](#thm-int8-kam)により $(1,\sqrt2)$ の振動数を持つ不変トーラスが $I_*$ の近くに存在します。

(ii) $\dot I_1=\varepsilon\sin(\theta_1-\theta_2)$、$\dot I_2=-\varepsilon\sin(\theta_1-\theta_2)$ なので、

$$
\frac{d}{dt}(I_1-I_2)=2\varepsilon\sin(\theta_1-\theta_2).
$$

$I_1=I_2$ かつ $\theta_1-\theta_2=\pi/2$ の点ではその値が $2\varepsilon\ne0$ であり、非摂動共鳴トーラス $I_1=I_2=c$ の全体は不変ではありません。

(iii) $(1,\sqrt2)$ は $1-\sqrt2\ne0$ の非共鳴であり、$I_1=I_2$ では $k=(1,-1)$ に対して $k\cdot\nabla K=I_1-I_2=0$ です。前者には定理の小分母下界があり、後者にはありません。同一Hamilton系に存続する非共鳴トーラスと崩れる共鳴トーラスが共存しても、仮定の異なる二つの主張に矛盾はありません。
<!-- solution-end -->
