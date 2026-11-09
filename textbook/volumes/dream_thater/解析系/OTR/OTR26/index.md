# OTR26 理論と数値解はどこまで一致するか

[OTR25のエントロピー正則化とSinkhorn反復](../OTR25/index.md#thm-otr25-sinkhorn-convergence)は、輸送結合を実際に数値計算する方法を与えました。しかし、プログラムが一つの数字を返しただけでは、それが真の最適費用に近いか、質量が保存されたか、正則化による偏りが何かは分かりません。とりわけ**反復が収束したこと**と**正則化していないOTを解いたこと**は異なります。

本章では既習の理論を「仮定 → 手計算の基準値 → 数値計算 → 残差・誤差の判定」の順で検証します。扱う対象は、有限行列、一次元の具体例、二次元Gaussian、周期境界の熱方程式です。最後に拡散過程の対数密度勾配とflow matchingを輸送・勾配流に接続しますが、これらを同じ算法だとは考えません。

到達点は次の五つです。

1. 有限OTの実行可能な主問題解と双対ポテンシャルを用いて、最適性の証明書を作れる。
2. [一次元の分位点公式](../OTR11/index.md#thm-otr11-quantile-formula)と[Gaussianの公式](../OTR14/index.md#thm-otr14-gaussian-w2-spd)を数値計算と照合できる。
3. 保存型差分法の質量・非負性・自由エネルギー減少を、丸め誤差とは独立に証明できる。
4. Sinkhornの周辺残差、双対差、正則化費用誤差を別々に報告できる。
5. 対数密度勾配・逆時間拡散・flow matching・OT測地線・JKOの対象と時間発展を、反例で区別できる。

## 1. 数値結果の何を検証するのか

有限の出発確率ベクトル $a=(a_i)_{i=1}^n$、到着確率ベクトル $b=(b_j)_{j=1}^m$、有限費用行列 $C=(C_{ij})$ を固定します。$a_i,b_j>0$、それぞれの和を1とします。各成分が0以上の行列 $P=(P_{ij})$ の行和 $r_i=\sum_jP_{ij}$、列和 $c_j=\sum_iP_{ij}$ は、実際に各点から出て各点へ到着した質量です。

[OTR4の輸送多面体](../OTR4/index.md#def-otr4-transport-polytope)では $r=a,c=b$ が実行可能性を表します。[OTR5の有限双対](../OTR5/index.md#thm-otr5-strong-duality)では、$f_i+g_j\le C_{ij}$ を満たすポテンシャル $f,g$ が下界を与えます。この二つを同時に検査することを、ここでは証明書と呼びます。

<a id="def-otr26-numeric-certificate"></a>

<!-- formal-statement-start -->
> **定義（有限輸送の数値的証明書と残差）**  
> $n,m\ge1$、$a\in(0,1]^n,b\in(0,1]^m$ は各成分の和が1、$C\in\mathbb R^{n\times m}$ とする。非負の $P\in\mathbb R^{n\times m}$ と、実数ベクトル $f\in\mathbb R^n,g\in\mathbb R^m$ に対し、**周辺残差**を

$$
R_\infty(P)=\max\{\max_i|r_i-a_i|,\max_j|c_j-b_j|\}
$$

> とする。$f_i+g_j\le C_{ij}$ を全セルで満たすとき、**双対実行可能**という。$P$ が両周辺を満たすとき、**主実行可能**という。任意の上記 $P,f,g$ について、主費用と双対値の差を

$$
G(P;f,g)=\sum_{ij}C_{ij}P_{ij}
-\sum_i a_if_i-\sum_jb_jg_j
$$

> と定める。$P$ が主実行可能で $f,g$ が双対実行可能、さらに $G=0$ なら、この組を**厳密な最適性証明書**と呼ぶ。有限精度の報告では $R_\infty$、双対制約違反最大値、$G$ を別々に示す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr26-numeric-certificate -->
**定義の確認**。$a=b=(1/2,1/2)$、$C=\left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$、$P=\left(\begin{smallmatrix}1/2&0\\0&1/2\end{smallmatrix}\right)$、$f=g=(0,0)$ とします。$P\ge0$、行・列和はいずれも $(1/2,1/2)$ だから $R_\infty=0$ です。すべての $C_{ij}\ge0=f_i+g_j$ なので双対制約を満たし、主費用と双対値はともに0、すなわち $G=0$ です。
<!-- definition-example-end -->

なぜこの数字で最適性が分かるのでしょうか。単に差を取るだけでなく、各項が非負になるための仮定を見ます。

<a id="thm-otr26-gap-identity"></a>

<!-- formal-statement-start -->
> **定理（有限主双対差の恒等式と最適性判定）**  
> 上の $n,m,a,b,C$、各成分が0以上の行列 $P$、任意の $f,g$ に対して、次の恒等式が成立する。

$$
\begin{aligned}
G(P;f,g)
={}&\sum_{ij}P_{ij}(C_{ij}-f_i-g_j)\\
&+\sum_i(r_i-a_i)f_i+\sum_j(c_j-b_j)g_j.
\end{aligned}
$$

> もし $P$ が主実行可能で $f,g$ が双対実行可能なら $G\ge0$。さらに $G=0$ なら $P$ は最適な輸送結合、$f,g$ は最適な双対ポテンシャルである。$R_\infty(P)>0$ の場合、$G$ だけを最適性の証明書とは呼べない。
<!-- formal-statement-end -->

### 証明の見取り図

ポテンシャルの項を $P$ の行和・列和で分配し、目標周辺との差を取り出します。正しい周辺と双対制約が揃って初めて、残るセルごとの積が非負になります。

<!-- proof-start -->
### 証明

行和の定義から $\sum_{ij}P_{ij}f_i=\sum_i r_if_i$、列和について $\sum_{ij}P_{ij}g_j=\sum_jc_jg_j$ です。まず主費用に二つの和を足して引くと

$$
\begin{aligned}
\sum_{ij}C_{ij}P_{ij}
={}&\sum_{ij}P_{ij}(C_{ij}-f_i-g_j)
+\sum_i r_if_i+\sum_jc_jg_j.
\end{aligned}
$$

ここから $\sum_i a_if_i+\sum_j b_jg_j$ を引くと所望の恒等式です。実行可能なら後ろの二つの和は0、最初の各積は $P_{ij}\ge0$ と $C_{ij}-f_i-g_j\ge0$ から非負です。[弱双対](../OTR5/index.md#thm-otr5-weak-duality)により、任意の主実行可能解の費用は任意の双対実行可能値以上です。ここで $G=0$ なら双方の値が一致するので、他の主実行可能解はこれより安くできず、双対もこれより大きくできません。$R_\infty>0$ なら残差項が一般には消えず、そもそも $P$ は許容結合でないため、この比較を適用できません。$\square$
<!-- proof-end -->

$R_\infty\le\delta$ なら残差項の絶対値は高々

$$
\delta\left(\sum_i|f_i|+\sum_j|g_j|\right)
$$

と評価できます。しかしこれは**実行可能な主上界を自動で作るものではありません**。$P$ を許容集合へ修正し、その修正費用を評価する仕事が別途必要です。特に[OTR25の正則化双対](../OTR25/index.md#thm-otr25-duality)の $F_\varepsilon-D_\varepsilon$ を、元の非正則化双対差 $G$ と混同しないでください。

## 2. 分位点とGaussianの計算を再現する

### 2.1 一次元：質量を小さい座標から順に割り当てる

出発分布と到着分布を

$$
\mu=\tfrac14\delta_0+\tfrac34\delta_2,\qquad
\nu=\tfrac12\delta_1+\tfrac12\delta_3
$$

とします。[分位点による単調結合](../OTR11/index.md#def-otr11-monotone-coupling)では、$u\in(0,1)$ を $(0,1/4],(1/4,1/2],(1/2,1)$ に分けると、質量がそれぞれ $(0,1),(2,1),(2,3)$ に割り当てられます。したがって

$$
P^\uparrow=
\begin{pmatrix}
1/4&0\\
1/4&1/2
\end{pmatrix},\quad
C=
\begin{pmatrix}
1&9\\
1&1
\end{pmatrix},\quad
W_2^2(\mu,\nu)=\frac14+\frac14+\frac12=1.
$$

これは $|x-y|^2$ を費用とした値です。**$W_2$ 自体は1**、その平方もこの例ではたまたま1です。[分位点公式](../OTR11/index.md#thm-otr11-quantile-formula)が適用できるのは両分布が有限二次モーメントを持ち、実数直線上の二次費用を使うからです。

この例では双対 $f=(1,1),g=(0,0)$ も構成できます。各セルで $f_i+g_j=1\le C_{ij}$、双対値は $1$。従って[主双対差の定理](#thm-otr26-gap-identity)から、この単調結合は有限LPとしても最適です。

同じ行列に[Sinkhorn反復](../OTR25/index.md#thm-otr25-sinkhorn-convergence)を $\varepsilon=0.5$ で20回適用すると、周辺残差は約 $3.6\times10^{-11}$、通常費用は約 $1.00000045014$ となります。分位点による厳密値1との差は約 $4.50\times10^{-7}$ です。理論の正則化上界 $0.5\log4\approx0.693147$ はこれより大きいですが、有限反復の残差を別に報告している点に注意してください。

### 2.2 非可換な2次元Gaussian

次は一次元の分位点では解けない例です。出発・到着分布を

$$
\mu=\mathcal N_2\left(\begin{pmatrix}0\\1\end{pmatrix},
A\right),\quad
\nu=\mathcal N_2\left(\begin{pmatrix}2\\-1\end{pmatrix},
B\right),\quad
A=\begin{pmatrix}1&0\\0&4\end{pmatrix},\quad
B=\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$

とします。$A$ の固有値は $1,4$、$B$ は $1,3$ なので両者は正定値です。また $AB=\left(\begin{smallmatrix}2&1\\4&8\end{smallmatrix}\right)$ と $BA=\left(\begin{smallmatrix}2&4\\1&8\end{smallmatrix}\right)$ は異なり、座標ごとの標準偏差の差だけでは計算できません。

ここで利用する行列の平方根が、何を意味するかを確認します。対称正定値行列 $H$ の正定値平方根は、[LA6の平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)で存在・一意性が保証されます。二次元に限れば行列式・跡だけで計算できます。

<a id="lem-otr26-square-root-2x2"></a>

<!-- formal-statement-start -->
> **補題（正定値2次行列の平方根）**  
> $H\in\mathbb R^{2\times2}$ を実対称正定値とし、$q=\sqrt{\det H}>0$ とする。このとき $H$ の正定値平方根は

$$
H^{1/2}=\frac{H+qI_2}{\sqrt{\operatorname{tr}H+2q}}
$$

> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

二次行列の特性方程式を $H$ に代入して二乗式を作り、得られた行列が正定値であることを確認します。

<!-- proof-start -->
### 証明

$2\times2$ 行列のCayley–Hamilton関係を成分または[LAの特性多項式](../../../基礎科目/LA/LA4/index.md#thm-la4-cayley-hamilton)から確認すると

$$
H^2-(\operatorname{tr}H)H+(\det H)I_2=0.
$$

これより

$$
(H+qI_2)^2
=H^2+2qH+q^2I_2
=(\operatorname{tr}H+2q)H
$$

です。右辺の係数は正です。$H+qI_2$ の固有値は各正の固有値に $q$ を足した値なので正であり、表示した行列は対称正定値です。二乗が $H$ になることを上式で検証したので、正定値平方根の一意性から主張が従います。$\square$
<!-- proof-end -->

**補題の計算例**。$H=\operatorname{diag}(4,9)$ では $q=6$、分母は $\sqrt{4+9+12}=5$ です。分子は $\operatorname{diag}(10,15)$、よって $H^{1/2}=\operatorname{diag}(2,3)$ と得られ、二乗と正値性を直接検査できます。

[OTR14のGaussian最適写像](../OTR14/index.md#lem-otr14-positive-transport-matrix)を用いると、$S=(A^{1/2}BA^{1/2})^{1/2}$、$M=A^{-1/2}SA^{-1/2}$ で $MAM=B$ です。この例では

$$
A^{1/2}BA^{1/2}=\begin{pmatrix}2&2\\2&8\end{pmatrix},
\quad \operatorname{tr}=10,\quad\det=12.
$$

従って[正定値2次行列の平方根](#lem-otr26-square-root-2x2)より $\operatorname{tr}S=\sqrt{10+4\sqrt3}$ です。[非退化Gaussian分布間の最適写像とWasserstein距離](../OTR14/index.md#thm-otr14-gaussian-w2-spd)へ平均差の二乗 $8$、$\operatorname{tr}A=5$、$\operatorname{tr}B=4$ を入れると

$$
W_2^2(\mu,\nu)=8+5+4-2\sqrt{10+4\sqrt3}
=17-2\sqrt{10+4\sqrt3}\approx8.77122044765434.
$$

実装で得る $M\approx\left(\begin{smallmatrix}1.32804666&0.24304941\\0.24304941&0.69658578\end{smallmatrix}\right)$ は正定値かつ対称です。$MAM$ の4成分を計算すると $B$ と $10^{-12}$ 未満の差で一致します。また最適写像 $T(x)=m_1+M(x-m_0)$ に対して

$$
\mathbb E|X-T(X)|^2
=|m_0-m_1|^2+\operatorname{tr}((I_2-M)A(I_2-M))
$$

を独立に計算すると同じ約 $8.77122044765434$ になります。これは数値近似誤差の照合であり、最適性そのものの根拠は[OTR14の理論](../OTR14/index.md#thm-otr14-gaussian-w2-spd)です。

## 3. 密度の数値時間発展に保存則は残るか

[連続の方程式](../OTR17/index.md#def-otr17-measure-weak)と[自由エネルギー散逸](../OTR21/index.md#thm-otr21-dissipation)を数値化するとき、格子ごとの質量を独立に増減させてはいけません。隣接セルの間で同じ流束を逆符号で使うと、総和で内部流束が相殺します。

本節では扱う境界条件を明示するため、長さ1の**周期区間** $[0,1)$ 上の熱方程式 $\partial_t\rho=\partial_{xx}\rho$ を取り、外場・相互作用は置きません。これは[OTR24の全空間上の二次外場付きFokker–Planck模型](../OTR24/index.md#thm-otr24-weak-limit)とは異なります。従ってこの実験だけでJKO収束や全空間の境界項を検証したとは言えません。

<a id="def-otr26-periodic-heat-scheme"></a>

<!-- formal-statement-start -->
> **定義（周期熱方程式の保存型差分法）**  
> 整数 $N\ge4$、格子幅 $h=1/N$、時間刻み $\Delta t>0$ とし、セル密度 $\rho_i^k$ は $i=0,\ldots,N-1$、$k\ge0$ で定義する。添字は周期的に読み、$\rho_{-1}^k=\rho_{N-1}^k$、$\rho_N^k=\rho_0^k$ とする。$\lambda=\Delta t/h^2$ として

$$
\rho_i^{k+1}=\rho_i^k+\lambda(\rho_{i-1}^k-2\rho_i^k+\rho_{i+1}^k)
$$

> を用いる。離散質量は $M_h(\rho)=h\sum_i\rho_i$、各セル値が正のときの離散自由エネルギーは

$$
\mathcal H_h(\rho)=h\sum_i\rho_i\log\rho_i
$$

> とする。セル境界 $i+1/2$ の右向き流束を $J_{i+1/2}^k=-(\rho_{i+1}^k-\rho_i^k)/h$ と呼ぶ。
<!-- formal-statement-end -->

これは $\rho_i^{k+1}-\rho_i^k=-(\Delta t/h)(J_{i+1/2}^k-J_{i-1/2}^k)$ という保存則そのものです。

<!-- definition-example-start: def-otr26-periodic-heat-scheme -->
**定義の確認**。$N=4$、$\lambda=1/4$、$\rho^0=(1.2,1,0.8,1)$ とします。最初のセルは $1.2+(1/4)(1-2.4+1)=1.1$、第三セルは $0.8+(1/4)(1-1.6+1)=0.9$。他の二セルは1のままです。従って $\rho^1=(1.1,1,0.9,1)$ で、$M_h(\rho^0)=M_h(\rho^1)=(1/4)\cdot4=1$。各更新値は正です。
<!-- definition-example-end -->

<a id="thm-otr26-heat-invariants"></a>

<!-- formal-statement-start -->
> **定理（保存型熱差分の質量・正値性・エネルギー減少）**  
> $N\ge4$、$h=1/N$、$0<\lambda\le1/2$ とする。[周期熱差分法](#def-otr26-periodic-heat-scheme)の初期データは各 $\rho_i^0>0$、$h\sum_i\rho_i^0=1$ とする。このとき、すべての $k\ge0$ で

$$
M_h(\rho^k)=1,\qquad
\min_i\rho_i^k>0,\qquad
\mathcal H_h(\rho^{k+1})\le\mathcal H_h(\rho^k).
$$

> さらに $\rho_i^0=1+\alpha\cos(2\pi i/N)$、$|\alpha|<1$ なら、振幅は各段階で $\alpha q^k$ となる。ただし

$$
q=1-4\lambda\sin^2(\pi/N).
$$
<!-- formal-statement-end -->

### 証明の見取り図

更新式は三つの正値なセル密度の凸結合です。質量は周期和で隣接項が相殺し、エントロピーは凸関数 $s\log s$ へのJensen不等式で減ります。余弦波には差分作用素を直接作用させます。

<!-- proof-start -->
### 証明

更新式を

$$
\rho_i^{k+1}=\lambda\rho_{i-1}^k+(1-2\lambda)\rho_i^k+\lambda\rho_{i+1}^k
$$

と書くと、三係数は非負で和は1です。初期値がすべて正なので、少なくともいずれかの正の係数が掛かった正値の和として次時刻も正です。周期和では $\sum_i\rho_{i-1}=\sum_i\rho_{i+1}=\sum_i\rho_i$ だから

$$
h\sum_i\rho_i^{k+1}
=h[\lambda+(1-2\lambda)+\lambda]\sum_i\rho_i^k
=M_h(\rho^k)=1.
$$

$\phi(s)=s\log s$ は $s>0$ で $\phi''(s)=1/s>0$ です。凸性から各セルで

$$
\phi(\rho_i^{k+1})\le
\lambda\phi(\rho_{i-1}^k)+(1-2\lambda)\phi(\rho_i^k)
+\lambda\phi(\rho_{i+1}^k).
$$

両辺を $h$ 倍して全セルで足し、再び周期和を使うと $\mathcal H_h(\rho^{k+1})\le\mathcal H_h(\rho^k)$ が従います。

余弦波について $\theta=2\pi/N$ と置き、加法定理

$$
\cos((i-1)\theta)+\cos((i+1)\theta)
=2\cos(i\theta)\cos\theta
$$

を代入します。定数成分には差分が0で、余弦成分の倍率は

$$
1+\lambda(2\cos\theta-2)
=1-4\lambda\sin^2(\theta/2)=q
$$

です。帰納的に $\rho_i^k=1+\alpha q^k\cos(2\pi i/N)$ となります。$\square$
<!-- proof-end -->

$N=64$、$\lambda=0.2$、$\alpha=1/4$、100ステップでは $h=1/64$、$\Delta t=0.2/64^2=0.000048828125$、時刻 $t=0.0048828125$ です。理論的な離散振幅 $0.25q^{100}$ とコードから余弦係数を取り直した値は、いずれも約 $0.206162409$。連続方程式の同じ初期値から得る振幅 $0.25e^{-4\pi^2t}\approx0.206168791$ との差は約 $6.38\times10^{-6}$ です。

初期と終端の離散自由エネルギーは、それぞれ約 $0.015749691$、$0.010683004$。全ステップで質量の $1$ からのずれは $10^{-12}$ 未満、最小密度は正、エネルギーは非増加でした。これは**有限格子・指定刻みでの観測値**です。一方、質量保存・正値性・散逸が数学的に成り立つ理由は上の定理で、表示した小さな誤差値それ自体ではありません。

## 4. Sinkhornが収束しても、正則化の偏りは残る

第1節の対称 $2\times2$ 費用で、[OTR25の正則化結合](../OTR25/index.md#def-otr25-entropic-primal)を取り、正則化係数を $\varepsilon>0$ とします。周辺が両方 $(1/2,1/2)$ なので、結合は $P(x)=\left(\begin{smallmatrix}x&1/2-x\\1/2-x&x\end{smallmatrix}\right)$ と書けます。費用は $1-2x$、正則化目的は

$$
F_\varepsilon(P(x))
=1-2x+\varepsilon[2x(\log x-1)
+2(1/2-x)(\log(1/2-x)-1)].
$$

微分すると $-2+2\varepsilon\log(x/(1/2-x))=0$。二階微分は $2\varepsilon(1/x+1/(1/2-x))>0$ なので最小解は唯一です。停留式から

$$
x_\varepsilon=\frac{1}{2(1+e^{-1/\varepsilon})},
\qquad
\langle C,P^\varepsilon\rangle
=1-2x_\varepsilon=\frac{1}{1+e^{1/\varepsilon}}.
$$

ここで通常OT費用は $L_0=0$ です。$P^\varepsilon$ は周辺を満たし正則化問題を正確に解いても、$\varepsilon>0$ のとき非対角成分が正で**通常OT費用は0になりません**。[OTR25の正則化誤差上界](../OTR25/index.md#prop-otr25-zero-limit)は $0\le\langle C,P^\varepsilon\rangle-L_0\le\varepsilon\log4$ です。

| $\varepsilon$ | 実測通常費用 | 周辺残差 | 理論上界 $\varepsilon\log4$ |
|---:|---:|---:|---:|
| 0.20 | 0.006692850924 | $1.2\times10^{-16}$ 未満 | 0.277258872224 |
| 0.10 | 0.000045397869 | $10^{-16}$ 未満 | 0.138629436112 |
| 0.05 | 0.000000002061 | $10^{-16}$ 未満 | 0.069314718056 |

この対称例では各行・列が最初の反復ですでに揃い、どれも1回で停止します。従って表から一般の反復速度が速いとは結論できません。$R_\infty$ は丸め誤差の近くですが、**正則化バイアスは別に残っています**。一般問題で有限反復の $P$ が未実行可能な場合は、[数値的証明書](#def-otr26-numeric-certificate)を確認せず $F_\varepsilon-D_\varepsilon\approx0$ だけで最適だと言えません。

## 5. 対数密度勾配・逆時間拡散・flow matchingは何が違うか

OTの[変位補間](../OTR15/index.md#thm-otr15-displacement-geodesic)は、最適結合 $(X_0,X_1)$ から $X_t=(1-t)X_0+tX_1$ を作るものです。一方、[JKO一歩](../OTR22/index.md#def-otr22-jko-step)は次の測度を自由エネルギーと移動費用の和で最小化します。両者は同じ $W_2$ を使いますが、前者は端点間の最短路、後者はエネルギーを下げる時間発展の離散化です。

生成モデルの用語を比べるには、まず各々が何を未知量とするかを定義する必要があります。以下の拡散過程は**一次元・滑らかで厳密に正値な確率密度**に限り、学習器の最適化目的や高次元の一般定理は使いません。

最初に、確率密度が空間のどちらへどれほど急に変化するかを測ります。ここで微分するのは確率密度の引数である**空間変数 $x$** です。[母数について微分する統計のスコア関数](../../../解析系/F0/F0-00P7/index.md#def-f0-00p7-score)とは微分変数が異なり、そちらの理論は本章での推論の前提には使いません。

<a id="def-otr26-density-score"></a>

<!-- formal-statement-start -->
> **定義（密度score）**
> $I\subset\mathbb R$ を時間区間とする。$t\in I$ ごとに $p_t:\mathbb R\to(0,\infty)$ を空間方向に微分可能な確率密度とし、その**密度score**を

$$
s_t(x)=\partial_x\log p_t(x)=\frac{\partial_xp_t(x)}{p_t(x)}
$$

> と定める。分母が正であることを仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr26-density-score -->
**定義の確認**。$p_t$ が $N(0,1+2t)$ の密度（$t\ge0$）なら、分散 $1+2t>0$ なので全実数上で密度は正で微分可能です。$\log p_t(x)$ の $x$ 微分を取ると $s_t(x)=-x/(1+2t)$ です。例えば $x=0$ で0、$x>0$ では負になり、密度の山へ向かう向きを表します。
<!-- definition-example-end -->

次に、同じ密度の推移を逆方向の確率過程として表す場合と、指定した端点結合から速度を作る場合を比べます。

<a id="def-otr26-generative-fields"></a>

<!-- formal-statement-start -->
> **定義（逆時間拡散とflow matchingの速度）**
> $T>0$、$0\le t\le T$ とする。前向き拡散 $dX_t=\sqrt2\,dB_t$ の密度が滑らかで厳密に正の $p_t$ であるとき、[密度score](#def-otr26-density-score)を用い、逆時刻 $u=T-t$ に対応するドリフト候補を $b_u^{\rm rev}(x)=2s_{T-u}(x)$ と定める。逆時間拡散の表現ではこのドリフトと拡散係数 $\sqrt2$ を使う。**flow matching**では、可積分な端点差 $\mathbb E|X_1-X_0|<\infty$ を持つ結合 $(X_0,X_1)$ を選び、$0\le t\le1$、$X_t=(1-t)X_0+tX_1$ とする。速度場 $v_t$ を次の条件付き期待値の版として定める。

$$
v_t(X_t)=\mathbb E[X_1-X_0\mid X_t]
$$

> 端点結合をOT最適結合に限定しない。速度の版は $X_t$ の分布でほとんど至る所までで決まる。
<!-- formal-statement-end -->

scoreは密度の対数微分であり、粒子の移動速度ではありません。前向き熱方程式 $\partial_tp=\partial_{xx}p$ は

$$
\partial_tp+\partial_x(pv_t)=0,\qquad
v_t=-\partial_x\log p_t=-s_t
$$

と書けます。これは密度の**確率流ODE**による表現です。同じ密度を持つ確率微分方程式の標本軌道と、この決定論的なODEの軌道を同一視してはいけません。逆時間拡散では時間方向も拡散項も変わり、逆時刻 $u$ の密度 $q_u=p_{T-u}$ が満たす

$$
\partial_uq_u=-\partial_{xx}q_u
=-\partial_x(2s_{T-u}q_u)+\partial_{xx}q_u
$$

から、逆向きのドリフト係数が2倍になることを確認できます。ここで $s_{T-u}q_u=\partial_xq_u$ を使いました。$s_{T-u}$ は密度score、$u$ は逆時刻を表します。

<!-- definition-example-start: def-otr26-generative-fields -->
**定義の確認**。$X_0\sim N(0,1)$ とし、前向きBrownian熱発展を $X_t=X_0+\sqrt2 B_t$（独立な $B$）で作ります。$X_t\sim N(0,1+2t)$ なので、密度を微分すると $s_t(x)=-x/(1+2t)$、前向きの確率流速度は $v_t(x)=x/(1+2t)$ です。例えば $t=1/2$ でscoreは $-x/2$、確率流速度は $x/2$ となり符号が反対です。
<!-- definition-example-end -->

### 同じ端点でも経路は一致しない

前向き熱発展は $t=0$ で $N(0,1)$、$t=1$ で $N(0,3)$ です。中間 $t=1/2$ の分散は $2$。一方、[Gaussian間の最適写像](../OTR14/index.md#thm-otr14-gaussian-w2-spd)は $x\mapsto\sqrt3\,x$ なので、[OT測地線](../OTR15/index.md#thm-otr15-displacement-geodesic)上の分散は

$$
\operatorname{Var}((1-t)X_0+t\sqrt3 X_0)
=((1-t)+t\sqrt3)^2.
$$

$t=1/2$ では $(1+\sqrt3)^2/4=1+\sqrt3/2\approx1.866025404$ となり、熱発展の $2$ と異なります。**熱方程式は適切な自由エネルギーのWasserstein勾配流になり得ますが、それでも一般に二端点間のOT測地線ではありません**。

flow matching側でも端点を $X_0,X_1\sim N(0,1)$ の**独立な**二変数として選ぶと、$X_t=(1-t)X_0+tX_1$ の分散は $(1-t)^2+t^2$ で、中間では $1/2$ です。しかし同じ分布間のOT最適結合は $X_1=X_0$ で、測地線は全時刻で $N(0,1)$ のままです。flow matchingに**どの結合を指定するか**が重要であり、独立結合から作った補間はOT測地線である必要がありません。

次の整理は、モデルの優劣ではなく数学的な対象の違いです。

| 方法 | 指定するもの | 解く対象 |
|---|---|---|
| OT測地線 | 最適な端点結合 | 端点間で $W_2$ 距離を最短にする測度曲線 |
| JKO | 自由エネルギー $\mathcal F$ と時間刻み $\tau$ | 最小化で求める次時刻の測度 |
| score-based diffusion | ノイズ過程と各時刻のscore | 逆時間確率過程など |
| flow matching | 端点結合・補間と条件付き速度 | 密度曲線を運ぶ決定論的速度場 |

JKOが熱方程式を近似し、その熱方程式に対応するscoreで確率流を表せる**特殊な接点**はあります。しかし $\tau\downarrow0$（JKOの時間刻み）と $\varepsilon\downarrow0$（Sinkhornの正則化）は別の極限であり、scoreの学習誤差やflow matchingの端点結合の選択を消してくれるものではありません。

## 6. コードを動かして数値を検算する

実験は追加パッケージを必要としないNode.jsプログラムで、[OTR25のlog-domain実装](../OTR25/sinkhorn.js)を再利用します。

~~~bash
node textbook/volumes/dream_thater/解析系/OTR/OTR26/experiments.js
node --test textbook/volumes/dream_thater/解析系/OTR/OTR26/experiments.test.js
~~~

コードは有限主双対の厳密例、原子分布の分位点、非可換Gaussianの2次行列平方根、周期熱差分100ステップ、$\varepsilon=0.2,0.1,0.05$ のSinkhorn、拡散・flow matchingの反例を計算します。結果は丸められた参考値だけでなくJSONの数値として出力されます。

検証する基準は、有限主双対差 $0$、分位点 $W_2^2=1$、Gaussianの2通りの費用差と共分散差 $10^{-12}$ 以下、各時刻の質量差 $10^{-12}$ 以下・正値なセル密度・非増加エネルギー、余弦波の離散理論値との振幅差 $10^{-12}$ 以下、Sinkhornの残差と閉形式費用差 $10^{-10}$ 以下です。失敗時にはテストが停止し、許容範囲外の結果を「一致」と表示しません。

有限精度計算では非常に小さいセルが0へ丸められる可能性があり、機械精度以下の誤差は保証しません。またGaussianの実験は厳密な最適写像の公式を数値評価したもので、一般の高次元OTソルバーの正しさを証明するものではありません。熱実験は周期境界の線形問題に限ります。

## 7. 演習：何を根拠に「一致」と言えるか

### OTR26-A01 有限LPの厳密な証明書
- Level: A

$a=b=(1/2,1/2)$、$C=\left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$ とする。対角結合 $P$ とポテンシャル $f=g=0$ について、両周辺・双対全セル・費用差を検査せよ。

<!-- solution-start -->
**詳細解答**。$P_{11}=P_{22}=1/2$、$P_{12}=P_{21}=0$ と置く。各行和・列和は $1/2$ で $P\ge0$、よって主実行可能である。全 $f_i+g_j=0$、$C_{ij}\in\{0,1\}$ だから双対実行可能。主費用は $(1/2)0+(1/2)0=0$、双対値は $\sum a_i0+\sum b_j0=0$。ゆえに $G=0$ であり、[最適性判定](#thm-otr26-gap-identity)から両方とも最適である。
<!-- solution-end -->

### OTR26-A02 分位点の質量の切り分け
- Level: A

$\mu=\tfrac14\delta_0+\tfrac34\delta_2$、$\nu=\tfrac12\delta_1+\tfrac12\delta_3$ の単調結合と $W_2^2$ を求め、各周辺を確認せよ。

<!-- solution-start -->
**詳細解答**。共通分位点 $u$ を $(0,1/4],(1/4,1/2],(1/2,1)$ に分けると組は $(0,1),(2,1),(2,3)$、質量は $1/4,1/4,1/2$。行和は $1/4$ と $1/4+1/2=3/4$、列和は $1/4+1/4=1/2$ と $1/2$。二乗距離は順に $1,1,1$ だから積分は $1/4+1/4+1/2=1$。[分位点公式](../OTR11/index.md#thm-otr11-quantile-formula)の条件は有限支持により満たされるので、この値は最小費用である。
<!-- solution-end -->

### OTR26-A03 行列平方根を直接検算する
- Level: A

$H=\operatorname{diag}(4,9)$ に対して[2次行列の平方根公式](#lem-otr26-square-root-2x2)を適用し、二乗と正定値性を確認せよ。

<!-- solution-start -->
**詳細解答**。$\det H=36$、$\operatorname{tr}H=13$、$q=6$。分母は $\sqrt{13+12}=5$、分子は $\operatorname{diag}(10,15)$ だから $H^{1/2}=\operatorname{diag}(2,3)$。固有値 $2,3$ は正であり、二乗は $\operatorname{diag}(4,9)=H$。従って主平方根である。
<!-- solution-end -->

### OTR26-A04 四セルの保存型更新
- Level: A

$N=4$、$\lambda=1/4$、$\rho^0=(1.2,1,0.8,1)$ の[周期熱差分](#def-otr26-periodic-heat-scheme)を一歩進め、質量と正値性を調べよ。

<!-- solution-start -->
**詳細解答**。各セルで左右の隣接値を用いる。$i=0$ では $1.2+(1/4)(1-2.4+1)=1.1$、$i=1$ では $1+(1/4)(1.2-2+0.8)=1$、$i=2$ では $0.8+(1/4)(1-1.6+1)=0.9$、$i=3$ では $1+(1/4)(0.8-2+1.2)=1$。和は4のままで $h=1/4$ より質量1、最小値は $0.9>0$。$\lambda\le1/2$ なので[保存・散逸定理](#thm-otr26-heat-invariants)の仮定も満たす。
<!-- solution-end -->

### OTR26-A05 scoreと速度の符号
- Level: A

$p_t=N(0,1+2t)$ の密度について $s_t=\partial_x\log p_t$ を求め、$t=1/2$ のscoreと前向き確率流速度 $v_t=-s_t$ を書け。

<!-- solution-start -->
**詳細解答**。$\log p_t(x)=-\tfrac12\log(2\pi(1+2t))-x^2/[2(1+2t)]$ なので $x$ で微分して $s_t(x)=-x/(1+2t)$。$t=1/2$ では分母が2、従って $s_{1/2}(x)=-x/2$、$v_{1/2}(x)=x/2$。scoreそのものを粒子速度として入れると、連続の方程式の流束の符号を誤る。
<!-- solution-end -->

### OTR26-B01 未収束の結合では何が欠けるか
- Level: B

各成分が0以上の行列 $P$ の行和 $r$、列和 $c$、双対実行可能な $f,g$ について、$G(P;f,g)$ をセル余剰と周辺誤差に分解せよ。$R_\infty\le\delta$ でも厳密な主上界とは言えない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$\sum_{ij}P_{ij}f_i=\sum_ir_if_i$、$\sum_{ij}P_{ij}g_j=\sum_jc_jg_j$ を利用して

$$
G=\sum_{ij}P_{ij}(C_{ij}-f_i-g_j)
+\sum_i(r_i-a_i)f_i+\sum_j(c_j-b_j)g_j
$$

を得る。双対実行可能なら第一項は非負だが、後二項は符号を持つ。絶対値は $|r_i-a_i|,|c_j-b_j|\le\delta$ を各項へ掛けて、全体で $\delta(\sum_i|f_i|+\sum_j|g_j|)$ 以下となる。しかし $r\ne a$ または $c\ne b$ なら $P$ は許容集合外であり、その費用を許容解の上界として使えない。質量修正後の費用の上昇を別に評価する必要がある。
<!-- solution-end -->

### OTR26-B02 非可換Gaussianの公式
- Level: B

$A=\operatorname{diag}(1,4)$、$B=\left(\begin{smallmatrix}2&1\\1&2\end{smallmatrix}\right)$、平均差が $(2,-2)$ である二つのGaussianの $W_2^2$ を求めよ。単に対角成分の平方根を引けない理由も示せ。

<!-- solution-start -->
**詳細解答**。$A^{1/2}=\operatorname{diag}(1,2)$ より $H=A^{1/2}BA^{1/2}=\left(\begin{smallmatrix}2&2\\2&8\end{smallmatrix}\right)$。$\operatorname{tr}H=10,\det H=16-4=12$ だから[正定値2次行列の平方根](#lem-otr26-square-root-2x2)で $\operatorname{tr}H^{1/2}=\sqrt{10+4\sqrt3}$。平均差の二乗は $4+4=8$、跡は $5,4$。よって[非退化Gaussian分布間の最適写像とWasserstein距離](../OTR14/index.md#thm-otr14-gaussian-w2-spd)から $W_2^2=17-2\sqrt{10+4\sqrt3}$。$AB$ の右上は1だが $BA$ の右上は4で、両行列は可換でなく同じ直交基底で同時対角化できない。
<!-- solution-end -->

### OTR26-B03 余弦振幅の時間刻み依存
- Level: B

周期熱差分の $\rho_i^0=1+\alpha\cos(2\pi i/N)$ について、離散振幅の倍率を導け。$N=64,\lambda=0.2,100$ ステップの振幅を連続解と照合する式を書け。

<!-- solution-start -->
**詳細解答**。左右の余弦を足すと $2\cos(2\pi i/N)\cos(2\pi/N)$。従って更新の余弦係数は $1+\lambda[2\cos(2\pi/N)-2]=1-4\lambda\sin^2(\pi/N)=q$。100ステップで $\alpha q^{100}$。$h=1/64$、$t=100(0.2/64^2)$ なので、連続熱方程式の振幅は $\alpha e^{-4\pi^2t}$。$\alpha=1/4$ とすると前者約 $0.206162409$、後者約 $0.206168791$。この差は格子と時間刻みに起因し、質量損失を意味しない。
<!-- solution-end -->

### OTR26-B04 正則化費用と周辺残差を分ける
- Level: B

$a=b=(1/2,1/2)$、$C=\left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$ について、正則化解の非対角質量と通常費用を $\varepsilon$ で表し、$\varepsilon=0.2$ の上界と比べよ。

<!-- solution-start -->
**詳細解答**。実行可能結合を $P(x)=\left(\begin{smallmatrix}x&1/2-x\\1/2-x&x\end{smallmatrix}\right)$ と置く。正則化目的の微分は $-2+2\varepsilon\log(x/(1/2-x))$、二階微分は正なので一意に $x=1/[2(1+e^{-1/\varepsilon})]$。非対角は $(1/2-x)=1/[2(1+e^{1/\varepsilon})]$ で、二セルの費用和は $1/(1+e^{1/\varepsilon})$。$\varepsilon=0.2$ では約 $0.00669285$、[ゼロ極限上界](../OTR25/index.md#prop-otr25-zero-limit)の $0.2\log4\approx0.27725887$ より小さい。行・列和は構成上正確だが、通常OT最適費用0との差は正則化による偏りである。
<!-- solution-end -->

### OTR26-C01 離散最適性と分位点の一致を証明する
- Level: C

$\mu=\tfrac14\delta_0+\tfrac34\delta_2$、$\nu=\tfrac12\delta_1+\tfrac12\delta_3$、$C_{ij}=|x_i-y_j|^2$ とする。分位点結合を求め、それが有限LPの主双対証明書にもなっていることを自力で証明せよ。さらに正の $\varepsilon$ でSinkhornを適用した場合に、何を報告すれば「通常OTを近似した」と言えるか述べよ。

<!-- solution-start -->
**詳細解答**。共通順位 $u$ の区間 $(0,1/4],(1/4,1/2],(1/2,1)$ を用いると

$$
P^\uparrow=\begin{pmatrix}1/4&0\\1/4&1/2\end{pmatrix},
\quad C=\begin{pmatrix}1&9\\1&1\end{pmatrix}.
$$

行和は $(1/4,3/4)$、列和は $(1/2,1/2)$ であり、費用は $1/4+1/4+1/2=1$ である。$f=(1,1)$、$g=(0,0)$ とすると $f_i+g_j=1$ がすべての $C_{ij}\ge1$ を満たし、双対値は $\sum_i a_i=1$ である。従って[有限主双対差](#thm-otr26-gap-identity)は0で、分位点公式の結論と独立な有限LPの証明書を得た。

Sinkhornが返す結合 $P^\varepsilon$ については、まず $R_\infty(P^\varepsilon)$ と反復の停止判定を確認する。正確な正則化最適結合では[費用誤差の上界](../OTR25/index.md#prop-otr25-zero-limit)より $0\le\langle C,P^\varepsilon\rangle-1\le\varepsilon\log4$ であるが、有限反復なら停止誤差と周辺残差を別に記す。$F_\varepsilon-D_\varepsilon$ は正則化問題の双対差で、周辺が不正確なら主上界とは限らない。$\varepsilon$ を複数値で減らし、費用・残差・上界を並べることで誤差源を分離できる。
<!-- solution-end -->

### OTR26-C02 二つの生成経路の反例
- Level: C

(i) $N(0,1)$ から $N(0,3)$ へのBrownian熱発展とOT測地線の中間分散を比較せよ。(ii) 独立な $X_0,X_1\sim N(0,1)$ を結ぶ直線補間が、同一分布間のOT測地線でないことを示せ。(iii) これらをJKO一歩・scoreの定義と混同しないための条件を整理せよ。

<!-- solution-start -->
**詳細解答**。(i) $X_t=X_0+\sqrt2B_t$、$X_0$ と $B$ は独立、$\operatorname{Var}(X_t)=1+2t$。$t=1/2$ で2。一方、Gaussian間の最適輸送写像は $T(x)=\sqrt3 x$ なので変位補間は $((1-t)+t\sqrt3)X_0$。分散は $((1-t)+t\sqrt3)^2$、中間では $1+\sqrt3/2\approx1.8660$。端点は一致しても中間密度は一致しない。

(ii) 独立性によって $\operatorname{Cov}(X_0,X_1)=0$ なので $\operatorname{Var}((1-t)X_0+tX_1)=(1-t)^2+t^2$、中間は $1/2$。対して同一分布間の最適費用は0で、非負な二乗費用が0になるには $X_1=X_0$ がほとんど確実に必要である。最適結合なら全時刻同じ $N(0,1)$ で分散1となる。

(iii) [JKO一歩](../OTR22/index.md#def-otr22-jko-step)は $\mathcal F(\mu)+W_2^2(\mu,\mu^k)/(2\tau)$ の**次の測度**の最小化で、端点補間の任意の指定ではない。scoreは $s_t=\partial_x\log p_t$ で、熱の場合には $s_t=-x/(1+2t)$。確率流速度は $-s_t$、逆時間拡散のドリフトは逆時刻で $2s_{T-u}$ となり、同じ「速度」と見なせない。flow matchingも指定した端点結合から条件付き速度を作るため、結合が独立かOT最適かを明記しないと曲線を決定できない。
<!-- solution-end -->

## 8. 次に使うときの判断表

- **最適性を確かめたい**：有限LPなら主・双対両制約、費用差、相補性を確認する。数値誤差の下界と上界を分ける。
- **数値が理論に近いか確かめたい**：分位点やGaussianのような独立計算可能な基準値を用いる。基準値に必要な次元・モーメント・正定値性を確認する。
- **PDEが保存則を守るか確かめたい**：内部流束の打消し、正値性条件、境界条件、離散エネルギーを個別に検査する。
- **学習した速度場をOTと比べたい**：scoreなのか輸送速度なのか、端点結合、確率過程か決定論的流れか、自由エネルギーと時間パラメータを区別する。

理論と数値が一致するのは、「同じ対象・同じ仮定・同じ費用」を比較し、誤差の種類を区別したときです。一致しない場合も、正則化、離散化、端点結合、境界条件のどこを変えたかを特定できれば、その差自体が数学を学ぶ手掛かりになります。
