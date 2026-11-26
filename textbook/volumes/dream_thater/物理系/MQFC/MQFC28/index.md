# MQFC28 多重尺度くりこみと大場領域

[一ループ格子尺度の軌道](../MQFC27/index.md#thm-mqfc27-lattice-trajectory)は格子間隔を縮めるための結合の候補を与えた。しかし細かい格子の自由度をすべて積分するとき、結合の先頭項だけを追っても測度全体は決まらない。高周波の自由度を一層ずつ消去し、残った作用と誤差を追う方法を学ぶ。

本講では有限次元の実Gaussian模型で積分と評価を完結させる。その後、四次元の純ゲージ格子理論に移るとどの評価を追加する必要があるかを整理する。模型の等式はゲージ場の積分にそのまま適用できるとは限らない。

## 1. 一つの場を尺度に分ける

有限個の実変数からなる場を考える。中心化したGaussianベクトルの共分散は二次モーメントの行列である。共分散を足し合わせられれば、場を独立な揺らぎの和として実現し、一成分ずつ積分できる。尺度の分割は固有値の範囲や空間ブロックなど、問題に応じて設計する。

<a id="def-mqfc28-covariance-split"></a>

<!-- formal-statement-start -->
> **定義（尺度別共分散分解）**
> $n,J$ を正整数、$C$ を実対称な半正定値 $n\times n$ 行列とする。実対称半正定値行列 $C_j$ による表示

$$
C=\sum_{j=1}^J C_j
$$

> を尺度別共分散分解とする。各 $C_j$ はその尺度で積分する独立な中心化Gaussian揺らぎの共分散に用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc28-covariance-split -->
**定義の確認**：二点の場を平均方向と差分方向に分ける。$u=(1,1)^\top/\sqrt2$、$v=(1,-1)^\top/\sqrt2$ とし、$C_1=2uu^\top$、$C_2=vv^\top$ とする。任意の $w\in\mathbb R^2$ に対し $w^\top C_1w=2(u^\top w)^2\ge0$、$w^\top C_2w=(v^\top w)^2\ge0$ であり、両行列は対称である。

$$
C_1+C_2=\frac12
\begin{pmatrix}3&1\\1&3\end{pmatrix}.
$$

和は与えられた二点共分散を再現する。$C_1$ の揺らぎは二点を同時に動かし、$C_2$ の揺らぎは二点の差を動かす。各成分が特異行列でも分解できる。
<!-- definition-example-end -->

<a id="thm-mqfc28-gaussian-integration"></a>

<!-- formal-statement-start -->
> **定理（尺度別Gaussian積分の合成）**
> $C,D$ を実対称半正定値 $n\times n$ 行列、$\gamma_C,\gamma_D$ を対応する中心化Gaussian確率測度とする。非負Borel関数 $F:\mathbb R^n\to[0,\infty]$ に対し

$$
(T_CF)(x)=\int F(x+z)\,d\gamma_C(z)
$$

> とおくと、任意の $x\in\mathbb R^n$ について

$$
T_CT_DF(x)=T_{C+D}F(x).
$$

> 有限個の尺度についても合成は共分散の和に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

独立Gaussianの和の分布を確定し、その分布に対する積分へ書き直す。共分散の足し算が、積分の順序を変えてよい理由になる。

<!-- proof-start -->
### 証明

[有限次元Gaussian積分と特性関数](../MQFC6/index.md#thm-mqfc6-finite-gaussian)の標準Gaussianの場合を用い、独立な標準Gaussianベクトル $G,H\in\mathbb R^n$ をとる。実対称半正定値行列には半正定値平方根がある。

その平方根を用いて、$X=C^{1/2}G$、$Y=D^{1/2}H$ は中心化Gaussianである。例えば $X$ の共分散は

$$
\mathbb E[XX^\top]=C^{1/2}I C^{1/2}=C.
$$

任意の $t\in\mathbb R^n$ に対し $t^\top(X+Y)$ は独立な実Gaussianの和で、平均零、分散

$$
\mathbb E[(t^\top X+t^\top Y)^2]
=t^\top Ct+t^\top Dt
$$

を持つ。交差項は独立性と零平均から零になる。従って $X+Y$ は中心化Gaussianで共分散 $C+D$ を持つ。Gaussianの分布は平均と共分散で定まるので、その法則は $\gamma_{C+D}$ である。

非負性からTonelliの定理を適用できる。

$$
T_CT_DF(x)
=\int\int F(x+z+w)\,d\gamma_D(w)\,d\gamma_C(z)
=\mathbb E F(x+X+Y).
$$

最後の期待値は $T_{C+D}F(x)$ に等しい。有限個の場合は二成分の合成を繰り返す。
<!-- proof-end -->

先ほどの二点例なら $X=\sqrt2 Gu+Hv$（$G,H$ は独立な標準実Gaussian）である。差の方向 $H$ を先に積分してから平均方向 $G$ を積分してもよい。ここでは二点積分を正確に分割しただけで、重みの切り捨てや作用の近似は行っていない。

## 2. ブロック平均に作用を残す

二点を一つのブロックにまとめるとき、平均 $x=(\phi_1+\phi_2)/2$ と差 $z=(\phi_1-\phi_2)/2$ を使えば $\phi_1=x+z,\phi_2=x-z$ となる。ここでは差 $z$ を分散 $c>0$ のGaussianとして積分し、平均 $x$ に対する重みを得る。

作用 $V$ が残りの場と揺らぎの両方に依存するとき、積分した正の重みの負の対数を取ることで新しい作用を得る。この形なら定数項も追跡できる。

<a id="def-mqfc28-effective-action"></a>

<!-- formal-statement-start -->
> **定義（Gaussian消去後の有効作用）**
> $C$ を半正定値共分散、$V:\mathbb R^n\to\mathbb R$ をBorel関数とする。対象の $x$ で $0<T_C(e^{-V})(x)<\infty$ のとき

$$
V_C(x)=-\log T_C(e^{-V})(x)
$$

> をGaussian消去後の有効作用とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc28-effective-action -->
**定義の確認**：$n=1$、$C=c>0$、$V(y)=0$ とすると、確率測度に対する定数1の積分は1なので、有限かつ正である。よって全ての $x$ で $V_C(x)=0$。また $V(y)=d$（$d$ は実定数）なら積分は $e^{-d}>0$ で、$V_C(x)=d$。定数項は勝手に消えない。
<!-- definition-example-end -->

<a id="thm-mqfc28-quadratic-block"></a>

<!-- formal-statement-start -->
> **定理（二次作用の一変数Gaussian消去）**
> $c>0$、$m\ge0$ とし、$V(y)=my^2/2$、$Z$ を分散 $c$ の中心化実Gaussianとする。このとき全ての $x\in\mathbb R$ について

$$
-\log\mathbb E e^{-m(x+Z)^2/2}
=\frac12\log(1+cm)+\frac{mx^2}{2(1+cm)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

指数に現れる $z^2$ と $xz$ を一つの平方へまとめる。積分の規格化因子と残りの二次係数は別々に生まれる。

<!-- proof-start -->
### 証明

$A=m+c^{-1}>0$ と置く。指数の二倍に負号を付けた二次式は

$$
m(x+z)^2+c^{-1}z^2
=Az^2+2mxz+mx^2
$$

である。平方完成すると

$$
A(z+mx/A)^2+(m-m^2/A)x^2.
$$

ここで $m-m^2/A=m/(1+cm)$。従ってGaussian密度を代入すると

$$
\mathbb E e^{-m(x+Z)^2/2}
=\frac{e^{-mx^2/(2(1+cm))}}{\sqrt{2\pi c}}
\int_{\mathbb R}e^{-A(z+mx/A)^2/2}\,dz.
$$

変数を $w=\sqrt A(z+mx/A)$ に替えると積分は $\sqrt{2\pi/A}$。全体は

$$
(1+cm)^{-1/2}e^{-mx^2/(2(1+cm))}
$$

となる。正かつ有限なので負の対数を取って結論を得る。
<!-- proof-end -->

例えば $m=2,c=1$ なら新しい二次係数は $2/3$、定数項は $\log3/2$ である。次の尺度で分散 $d=2$ を積分すると係数は $(2/3)/(1+4/3)=2/7$。定数項の合計は $\log3/2+\log(7/3)/2=\log7/2$ となる。これは分散 $c+d=3$ を一度に積分した結果に一致する。

二点ブロックで元の作用が $m(\phi_1^2+\phi_2^2)/2$ なら代入によって $m x^2+m z^2$ に分かれる。差 $z$ の積分は $(1+2cm)^{-1/2}$ を与え、残った作用は $m x^2+\log(1+2cm)/2$ である。平均の規格化を変える場合は二次係数も対応して変える必要がある。

## 3. 局所項を残し、残差を測る

四次の相互作用を含む場合、Gaussian平均だけでも元の次数より低い項が生じる。$V(y)=\lambda y^4$、$\lambda\ge0$ とし、$Z$ は分散 $c>0$ の中心化実Gaussianとする。[Gaussian Schwinger関数のWick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing)を一変数に適用すると、奇数次モーメントは零である。

偶数次では $\mathbb E Z^2=c$、$\mathbb E Z^4=3c^2$ である。二項展開すると

$$
\mathbb E V(x+Z)=\lambda(x^4+6cx^2+3c^2).
$$

定数項・二次項・四次項を明示して残す必要がある。実際に必要な有効作用は平均そのものではなく負の対数である。平均を近似として使う誤差を調べる。

<a id="prop-mqfc28-local-remainder"></a>

<!-- formal-statement-start -->
> **命題（非負相互作用の一次近似誤差）**
> 確率空間上の非負実確率変数 $W$ が有限な二次モーメントを持つとする。$a=\mathbb EW<1$、$b=\mathbb EW^2$、$L=-\log\mathbb E e^{-W}$ と置くと

$$
0\le a-L\le\frac b2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

指数を一次まで近似したときの余りを二次モーメントで押さえる。対数の上界と下界を使い、有効作用との差を求める。

<!-- proof-start -->
### 証明

$W$ は有限で非負だから $0<\mathbb E e^{-W}\le1$。Jensenの不等式を凸関数 $s\mapsto e^{-s}$ に適用すると $\mathbb E e^{-W}\ge e^{-a}$、従って $L\le a$ となる。

$s\ge0$ に対し、積分形のTaylor展開

$$
e^{-s}=1-s+\int_0^s(s-t)e^{-t}\,dt
$$

から $e^{-s}\le1-s+s^2/2$。期待値を取って $\mathbb E e^{-W}\le1-a+b/2$ を得る。右辺は $a<1$ なので正である。$u=-a+b/2>-1$ と置き、$\log(1+u)\le u$ を使うと

$$
\log\mathbb E e^{-W}\le\log(1-a+b/2)\le-a+b/2.
$$

符号を反転して $L\ge a-b/2$。二つの不等式を合わせる。
<!-- proof-end -->

例えば $x=0$、$W=\lambda Z^4$ なら $a=3\lambda c^2$、$b=105\lambda^2c^4$ である。分散 $c$ の密度 $p_c$ は $zp_c(z)=-cp_c'(z)$ を満たす。$z^{2k-1}p_c(z)$ は両端で零に向かうので、部分積分により
$$
\mathbb EZ^{2k}=-c\int_{\mathbb R} z^{2k-1}p_c'(z)\,dz
=(2k-1)c\,\mathbb EZ^{2k-2}.
$$
初期値 $\mathbb E Z^0=1$ から、八次モーメントの係数は $7\cdot5\cdot3\cdot1=105$ である。$3\lambda c^2<1$ なら誤差は $105\lambda^2c^4/2$ 以下である。

一般の $x$ では $a=\lambda(x^4+6cx^2+3c^2)$ なので、大きな $|x|$ まで一律に $a<1$ とすることはできない。ここに場の大きさによって積分領域を分ける動機がある。

## 4. 小場と大場を分ける

Gaussian揺らぎ $Z$ の大きさを標準偏差 $\sigma>0$ と比較する。閾値 $R>0$ 以下を小場領域、超える部分を大場領域とする。多点なら少なくとも一点で閾値を超えることがある。これを無視すると、体積や尺度数が増えたとき誤差が蓄積する。

<a id="def-mqfc28-field-split"></a>

<!-- formal-statement-start -->
> **定義（閾値による小場・大場分解）**
> 実ベクトル $z=(z_1,\ldots,z_n)$、閾値 $R>0$ に対し

$$
S_R=\{z:\max_i|z_i|\le R\},\qquad
B_R=\mathbb R^n\setminus S_R
$$

> をそれぞれ小場領域、大場領域とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc28-field-split -->
**定義の確認**：$n=2,R=2$ なら $(2,-1)$ の最大絶対値は2なので小場、$(0,3)$ は3なので大場である。任意の点で最大値が2以下か2より大きいかの一方だけが成立し、二領域は重ならず全空間を覆う。境界は小場側に含める。
<!-- definition-example-end -->

<a id="thm-mqfc28-large-field-bound"></a>

<!-- formal-statement-start -->
> **定理（Gaussian大場の確率と積分の評価）**
> $Z=(Z_1,\ldots,Z_n)$ を中心化Gaussianベクトルとし、全成分の分散が $\sigma^2>0$ 以下とする。任意の $R>0$ に対し

$$
\mathbb P(Z\in B_R)\le 2n e^{-R^2/(2\sigma^2)}.
$$

> さらに $V\ge0$ が可測で有限なら、大場からの重みの寄与は

$$
0\le \mathbb E[e^{-V(Z)}1_{B_R}(Z)]
\le 2n e^{-R^2/(2\sigma^2)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一成分の片側確率を指数モーメントで抑え、負側も加える。最後に大場が少なくとも一成分で生じることを使う。成分間の独立性は不要である。

<!-- proof-start -->
### 証明

$s>0$ とする。分散 $\sigma_i^2$ の成分の指数モーメントは $\mathbb E e^{sZ_i}=e^{s^2\sigma_i^2/2}$ である。分散 $\sigma_i^2>0$ の場合、指数を平方完成する。
$$
sz-\frac{z^2}{2\sigma_i^2}
=-\frac{(z-s\sigma_i^2)^2}{2\sigma_i^2}+\frac{s^2\sigma_i^2}{2}.
$$
平行移動したGaussian密度の積分は1なので公式が従う。分散零なら両辺とも1になる。[Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)から

$$
\mathbb P(Z_i>R)\le e^{-sR}\mathbb E e^{sZ_i}
\le e^{-sR+s^2\sigma^2/2}.
$$

$s=R/\sigma^2$ とすると指数は $-R^2/(2\sigma^2)$。$-Z_i$ にも同じ評価を使い、二つの事象の和を取る。さらに $B_R=\bigcup_i\{|Z_i|>R\}$ なので和集合の確率は各確率の和以下である。

最後に $V\ge0$ から $0<e^{-V}\le1$、従って大場上の積分は大場の確率以下となる。
<!-- proof-end -->

重みを確率測度に規格化した後は別の評価になる。$q=\mathbb E e^{-V}>0$ とすれば大場の規格化確率は上の積分を $q$ で割ったものなので、$q$ の下界が必要である。例えば小場上で $0\le V\le M$、大場確率が $\delta<1$ 以下なら

$$
q\ge e^{-M}\mathbb P(S_R)\ge e^{-M}(1-\delta).
$$

従って規格化後の大場確率は $e^M\delta/(1-\delta)$ 以下となる。小場での作用制御と大場の抑制の両方が必要である。

## 5. 尺度を重ねても誤差を増やさない

ある尺度で局所的な主要項を取り出した後の作用を $U_j$、近似作用を $\widetilde U_j$ とする。各尺度で誤差があるとき、それを有限個の積分で繰り返しても制御できる条件を考える。ここで扱う一様ノルムは全ての場に対する絶対誤差の上限であり、本格的な場の理論ではこれより細かな重み付き評価が必要になる。

<a id="thm-mqfc28-error-accumulation"></a>

<!-- formal-statement-start -->
> **定理（有効作用の一様誤差の累積）**
> $n,J$ を正整数、$C_j$ を実対称半正定値 $n\times n$ 行列、$\gamma_j=\gamma_{C_j}$ を対応する中心化Gaussian確率測度とする。ここで $j=1,\ldots,J$ である。$U_0=\widetilde U_0$ を有限実数値のBorel関数とし、

$$
U_j=-\log T_{C_j}(e^{-U_{j-1}})
$$

> とする。全積分が各点で正かつ有限であり、有限実数値のBorel関数である近似作用が全ての $x\in\mathbb R^n$ で

$$
|\widetilde U_j(x)+\log T_{C_j}(e^{-\widetilde U_{j-1}})(x)|\le\epsilon_j
$$

> を満たすと仮定する。$\epsilon_j\ge0$ なら

$$
\sup_x|\widetilde U_J(x)-U_J(x)|\le\sum_{j=1}^J\epsilon_j.
$$
<!-- formal-statement-end -->

### 証明の見取り図

作用の差が $\eta$ 以下なら重みの比は $e^{-\eta}$ と $e^\eta$ の間にある。積分はこの順序を保つので、負の対数を取ると差が再び $\eta$ 以下になる。

<!-- proof-start -->
### 証明

$|\widetilde U_{j-1}(y)-U_{j-1}(y)|\le E_{j-1}$ が全ての $y$ で成立するとする。指数化して

$$
e^{-E_{j-1}}e^{-U_{j-1}(y)}
\le e^{-\widetilde U_{j-1}(y)}
\le e^{E_{j-1}}e^{-U_{j-1}(y)}.
$$

$y=x+z$ を代入し、$\gamma_j$ で積分する。積分は正で有限なので負の対数を取り、不等号を反転する。すると

$$
|-\log T_{C_j}(e^{-\widetilde U_{j-1}})(x)-U_j(x)|
\le E_{j-1}.
$$

近似作用とこの中間量との差は仮定から $\epsilon_j$ 以下である。三角不等式により $|\widetilde U_j-U_j|\le E_{j-1}+\epsilon_j$。初期値の一致で $E_0=0$ とできるので、帰納法から $E_J=\sum_{j=1}^J\epsilon_j$ を得る。
<!-- proof-end -->

例えば $\epsilon_j=A2^{-j}$、$A>0$ とできれば、全尺度の誤差は $A(1-2^{-J})<A$ で抑えられる。毎回の誤差が $A$ なら上界は $JA$ となる。各段で小さいというだけでは、段数が無限に増える極限に一様な評価を与えない。

ここでの定理は全場についての誤差を仮定しており、小場だけで得たTaylor評価を代入することはできない。[Gaussian大場の確率と積分の評価](#thm-mqfc28-large-field-bound)を使うにも、作用の重み、規格化、空間のブロック数を考慮する必要がある。

## 6. Balaban型くりこみの証明地図

実際の格子理論では、[Wilson格子作用](../MQFC21/index.md#def-mqfc21-action)に対して群値のリンクを積分する。小場を判定するとき、個々のリンクが単位元に近いという条件はゲージ変換で保たれない。例えば初期リンクが全て単位元でも、異なる頂点のゲージ変換によりリンクの値は大きく動く。そこでplaquetteの曲率や局所的なゲージ固定を使って場の大きさを制御する。小さな曲率の領域では群の指数座標で揺らぎを記述し、二次形式の逆行列を利用してGaussian型の積分を設計する。

多重尺度での構成の道筋は次の通りである。

1. 粗視化した群値の場を固定し、微細な場のうちどれを積分するか定める。ゲージの自由度による退化を除き、境界条件を含め二次形式の下界を得る。
2. 小場領域で局所作用を取り出す。定数項は規格化へ、結合に対応する項は次尺度の作用へ移し、その他を残差とする。空間的に離れたブロック間の影響を小さくできる共分散評価が必要である。
3. 大場領域は捨てず、領域ごとの重みを評価する。作用による抑制が領域の数の増加に勝つ必要がある。[小活動度での体積一様な展開](../MQFC17/index.md#thm-mqfc17-convergence)で学んだ連結領域の数え上げが、この役割を理解するための模型になる。ただし群値の相互作用で同じ評価を得たわけではない。
4. 大場の寄与と小場の残差を合わせて次の有効密度が同じ型に属することを示し、尺度数によらない定数で帰納法を閉じる。[Wick相互作用の負の尾の一様評価](../MQFC16/index.md#thm-mqfc16-negative-tail)で見たように、重みを増大させる領域の制御が積分の安定性に不可欠である。
5. 結合の軌道がこの帰納法の適用域に残ることを確認する。最後に観測量の挿入を伴う評価、無限体積、物理単位でのスペクトル下界を別々に調べる。

Balabanの論文 [Large field renormalization I (1989)](https://doi.org/10.1007/BF01257412) は大場に対するくりこみ操作の基本段階を構成し、[II (1989)](https://doi.org/10.1007/BF01238433) の Theorem 1 は四次元純ゲージ格子理論で全尺度の有効結合が十分小さな固定区間 $(0,\gamma]$ に入るという条件の下、有効密度の帰納的な表示と評価を維持する。そこから論文で定式化された紫外安定性評価が導かれる。これはカットオフを変えても、規格化した分配関数の対数が物理体積に応じた範囲で制御される種類の結果である。小結合の全尺度条件は仮定であり、[一ループ尺度の不変性](../MQFC27/index.md#thm-mqfc27-scale-invariance)だけから実際の帰納法について成立するとは言えない。

本講の有限次元計算で証明したのは、Gaussian消去とその誤差評価の仕組みである。Balabanの定理で用いる群値ブロック写像、ゲージ固定の一様評価、残差の局所化、大場の連結領域評価と帰納法の閉包は原論文に委ねる。分配関数の安定性は観測量の収束そのものでも、正の質量ギャップの証明でもない。次講では観測量の極限を得るための条件を区別する。

## 7. 演習

### 演習 MQFC28-A1：二点の共分散
- Level: A

独立な標準実Gaussian $G,H$ に対して $X=(G+H,G-H)^\top$ とする。平均方向と差方向の共分散をそれぞれ求め、和を確認せよ。

<!-- solution-start -->
**詳細解答**

$X=G(1,1)^\top+H(1,-1)^\top$ なので、各共分散は

$$
C_1=\begin{pmatrix}1&1\\1&1\end{pmatrix},
\qquad C_2=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

各々 $w^\top C_1w=(w_1+w_2)^2$、$w^\top C_2w=(w_1-w_2)^2$ で半正定値かつ対称である。独立性から交差共分散は零で、和は $2I$ となる。[尺度別共分散分解](#def-mqfc28-covariance-split)の条件を満たす。
<!-- solution-end -->

### 演習 MQFC28-A2：二次作用
- Level: A

$m=3,c=2$ として二次作用 $my^2/2$ の消去後の作用を求めよ。

<!-- solution-start -->
**詳細解答**

$m\ge0,c>0$ なので[二次作用の一変数Gaussian消去](#thm-mqfc28-quadratic-block)を適用できる。$1+cm=7$ より

$$
V_c(x)=\frac12\log7+\frac{3x^2}{14}.
$$

新しい二次係数は $3/7$ で、定数項も生じる。
<!-- solution-end -->

### 演習 MQFC28-A3：四次相互作用の平均
- Level: A

$Z$ を分散2の中心化実Gaussianとし、$\mathbb E(x+Z)^4$ を求めよ。

<!-- solution-start -->
**詳細解答**

二項展開すると $x^4+4x^3Z+6x^2Z^2+4xZ^3+Z^4$ である。対称性から奇数次の期待値は零。二次は2、四次は $3\cdot2^2=12$ なので

$$
\mathbb E(x+Z)^4=x^4+12x^2+12.
$$

元の四次相互作用から二次と定数の局所項が生じる。
<!-- solution-end -->

### 演習 MQFC28-A4：多点大場の評価
- Level: A

中心化Gaussianベクトルの成分数を $n=10$、分散上界を $\sigma^2=1$ とする。大場確率を $1/100$ 以下と保証する閾値 $R$ を一つ求めよ。

<!-- solution-start -->
**詳細解答**

[Gaussian大場の確率と積分の評価](#thm-mqfc28-large-field-bound)より $20e^{-R^2/2}\le1/100$ とすればよい。従って $e^{-R^2/2}\le1/2000$。対数を取ると $R^2/2\ge\log2000$ なので $R=\sqrt{2\log2000}>0$ が一つの答えである。
<!-- solution-end -->

### 演習 MQFC28-B1：二段消去
- Level: B

初期作用を $my^2/2$、$m>0$ とする。分散 $c,d>0$ の二段のGaussian消去を行い、定数項を含めて分散 $c+d$ の一段消去に等しいことを式で確認せよ。

<!-- solution-start -->
**詳細解答**

[二次作用の一変数Gaussian消去](#thm-mqfc28-quadratic-block)で一段目の係数は $m_1=m/(1+cm)$、定数は $h_1=\log(1+cm)/2$。定数は指数の外に出せるので二段目は

$$
m_2=\frac{m_1}{1+dm_1}
=\frac{m}{1+cm+dm}.
$$

定数項は

$$
h_2=\frac12\log(1+cm)+\frac12\log(1+dm_1)
=\frac12\log(1+(c+d)m).
$$

よって $h_2+m_2x^2/2$ は分散 $c+d$ で直接求めた式に等しい。[尺度別Gaussian積分の合成](#thm-mqfc28-gaussian-integration)の具体例でもある。
<!-- solution-end -->

### 演習 MQFC28-B2：一次近似の有効域
- Level: B

$Z$ を標準実Gaussian、$W=\lambda Z^4$、$\lambda=1/100$ とする。$-\log\mathbb E e^{-W}$ の一次近似と誤差上界を求めよ。

<!-- solution-start -->
**詳細解答**

$W\ge0$、$a=3/100<1$、$b=105/10000$ である。八次モーメントは部分積分の漸化式で $7\cdot5\cdot3=105$。従って[非負相互作用の一次近似誤差](#prop-mqfc28-local-remainder)から

$$
0\le \frac3{100}+\log\mathbb E e^{-W}
\le\frac{105}{20000}.
$$

一次近似は $0.03$、誤差は $0.00525$ 以下で、真の作用は $0.02475$ 以上 $0.03$ 以下である。
<!-- solution-end -->

### 演習 MQFC28-B3：規格化の重要性
- Level: B

小場の確率が $0.99$ 以上、大場で $V\ge0$、小場で $0\le V\le\log2$ とする。重み $e^{-V}$ で規格化した大場確率の上界を求めよ。また小場での上界がないと何が壊れるか述べよ。

<!-- solution-start -->
**詳細解答**

大場で $e^{-V}\le1$ なので分子は $0.01$ 以下。小場では $e^{-V}\ge1/2$ なので分母は

$$
q=\mathbb E e^{-V}\ge0.99/2=0.495.
$$

従って大場確率は $0.01/0.495=2/99$ 以下。反例として元の大場確率をちょうど $0.01$、大場で $V=0$、小場で $V=M>0$ とすると、規格化後の大場確率は

$$
\frac{0.01}{0.01+0.99e^{-M}}\longrightarrow1
$$

となる。分母の一様下界を失うと、元の大場の小ささが規格化後に保たれない。
<!-- solution-end -->

### 演習 MQFC28-B4：尺度ごとの誤差
- Level: B

一様作用誤差が各尺度で $\epsilon_j=3\cdot4^{-j}$ 以下である。$J$ 段後の上界を求めよ。また $\epsilon_j=1/j$ としたとき同じ方法が一様上界を与えるか。

<!-- solution-start -->
**詳細解答**

[有効作用の一様誤差の累積](#thm-mqfc28-error-accumulation)より $E_J\le\sum_{j=1}^J3\cdot4^{-j}$。有限等比和は

$$
\sum_{j=1}^J3\cdot4^{-j}
=3\frac{(1/4)(1-4^{-J})}{1-1/4}
=1-4^{-J}<1.
$$

一方 $\sum_{j=1}^J1/j\ge\int_1^{J+1}dt/t=\log(J+1)$ は発散する。この誤差上界からは一様評価を得られない。実際の誤差が必ず発散するという主張ではない。
<!-- solution-end -->

### 演習 MQFC28-C1：小場と大場を同時に制御する
- Level: C

尺度 $j=1,\ldots,J$ で成分数 $n_j\le2^j$、各成分の分散が1以下の中心化Gaussianベクトルを考える。$R_j^2=2(3j+2)\log2$ とする。各尺度の作用は非負で小場上で $\log2$ 以下と仮定する。

1. 各尺度の規格化した大場確率を評価せよ。
2. 全尺度のうち一度でも大場が出る確率の一様上界を求めよ（尺度間の独立性は仮定しない）。
3. この結果だけで四次元Yang–Millsの質量ギャップを証明できるか。

<!-- solution-start -->
**詳細解答**

(1) [Gaussian大場の確率と積分の評価](#thm-mqfc28-large-field-bound)では $\sigma^2=1$ として

$$
\delta_j=2\cdot2^j e^{-(3j+2)\log2}
=2^{-2j-1}.
$$

$j\ge1$ なので $\delta_j\le1/8$。規格化の分母は小場上の重みが $1/2$ 以上であることから $(1-\delta_j)/2$ 以上である。従って規格化後の大場確率は

$$
\frac{2\delta_j}{1-\delta_j}
\le\frac{16}{7}\delta_j
=\frac87\,4^{-j}.
$$

(2) これらを周辺分布とする任意の同時分布で、和集合の確率は各確率の和以下である。

$$
\mathbb P\left(\bigcup_{j=1}^J B_{R_j}\right)
\le \frac87\sum_{j=1}^J4^{-j}
=\frac8{21}(1-4^{-J})<\frac8{21}.
$$

独立性を使わずに尺度数に一様な評価が得られた。各尺度で閾値が増えるため、小さな尾が成分数の増加を上回っている。

(3) この評価は指定されたGaussian周辺分布と重みの仮定の下で成立する。実際の群値格子測度に対して同種の評価が成立すること、局所作用と残差の帰納法が閉じること、観測量の極限が存在することは別途必要である。さらに[尺度固定後の質量比の判定](../MQFC27/index.md#prop-mqfc27-mass-ratio)に必要な正の質量尺度の情報を得ていない。従って質量ギャップの証明にはならない。
<!-- solution-end -->

## 8. 直接前提講座

- [MQFC16 P(φ)₂のUV除去を支える評価](../MQFC16/index.md)
- [MQFC17 熱力学極限・クラスター展開・低次元ギャップ](../MQFC17/index.md)
- [MQFC21 Wilson格子ゲージ測度](../MQFC21/index.md)
- [MQFC27 漸近自由性と尺度をどう固定するか](../MQFC27/index.md)
