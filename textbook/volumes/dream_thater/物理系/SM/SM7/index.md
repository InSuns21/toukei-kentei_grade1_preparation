# SM7 Ising模型とCurie–Weiss平均場

[SM3の正準アンサンブル](../SM3/index.md#def-sm3-canonical)では、有限系の各状態へGibbs重みを付け、分配関数から平均と揺らぎを求めました。相互作用するスピンでは隣のスピンの向きがエネルギーを変えるため、独立系のような積への分解はできません。では、全体が同じ向きを選ぶ現象をどう計算できるでしょうか。

有限Ising模型から始め、全スピンが弱く結び付くCurie–Weiss模型では磁化ごとに配置を数え、熱力学極限を厳密に導出します。有限系で外場ゼロの平均磁化が必ずゼロであるのに、無限系で非零の秩序磁化が現れる理由を、**極限の順序**で説明することが目標です。

## 1. 有限Ising模型とスピン反転

グラフの各頂点に $+1$ または $-1$ のスピンを置きます。強磁性結合は隣り合う二点の向きが一致するとエネルギーを下げます。

<a id="def-sm7-ising"></a>

<!-- formal-statement-start -->
> **定義（有限強磁性Ising模型）**  
> 有限非空単純無向グラフ $G=(V,E)$、辺ごとの結合 $J_{ij}\ge0$、外場 $h\in\mathbb R$、逆温度 $\beta=(k_{\mathrm B}T)^{-1}>0$ を固定する。配置空間は $\Omega=\{-1,+1\}^{V}$、全磁化は $M(\sigma)=\sum_{i\in V}\sigma_i$、一スピン当たり磁化は $m=M/|V|$ である。Hamiltonian、分配関数、正準確率を次で定義する。

$$
H_G(\sigma)=-\sum_{\{i,j\}\in E}J_{ij}\sigma_i\sigma_j-hM(\sigma),
$$

$$
Z_G(\beta,h)=\sum_{\sigma\in\Omega}e^{-\beta H_G(\sigma)},
\qquad \mathbb P_{\beta,h}(\sigma)=\frac{e^{-\beta H_G(\sigma)}}{Z_G(\beta,h)}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm7-ising -->
### 直接例：辺一本の二スピン

$V=\{1,2\}$、$E=\{\{1,2\}\}$、$J_{12}=J>0$、$h=0$ とします。$(+,+),(-,-)$ は $H=-J$、$(+,-),(-,+)$ は $H=+J$ なので

$$
Z_G=2e^{\beta J}+2e^{-\beta J}=4\cosh(\beta J).
$$

同方向の一配置は反対方向の一配置より $e^{2\beta J}$ 倍の重みを持つことを直接確認できます。
<!-- definition-example-end -->

<a id="prop-sm7-spin-flip"></a>

<!-- formal-statement-start -->
> **命題（有限零外場の反転対称性）**  
> [有限強磁性Ising模型](#def-sm7-ising)で $h=0$ とする。全反転 $R\sigma=(-\sigma_i)$ は正準確率を保つ。従って

$
\mathbb E_{\beta,0}M=0.
$

> また任意の $h\in\mathbb R$ に対し、

$
Z_G(\beta,h)=Z_G(\beta,-h).
$
<!-- formal-statement-end -->

### 証明の見取り図

辺の積は両端を反転しても不変ですが、磁化の符号は変わります。配置空間の全単射で有限和の変数を置き換えます。

<!-- proof-start -->
### 証明

$(-\sigma_i)(-\sigma_j)=\sigma_i\sigma_j$、$M(R\sigma)=-M(\sigma)$ なので

$$
H_G(R\sigma;h)=H_G(\sigma;-h).
$$

$R$ は全単射ですから正準和の変数を反転すれば $Z_G(\beta,h)=Z_G(\beta,-h)$。$h=0$ では $\mathbb P(R\sigma)=\mathbb P(\sigma)$ より

$$
\mathbb EM=\sum_{\sigma}M(R\sigma)\mathbb P(R\sigma)
=-\sum_{\sigma}M(\sigma)\mathbb P(\sigma)=-\mathbb EM.
$$

したがって $\mathbb EM=0$ です。
<!-- proof-end -->

これは各配置の磁化がゼロという主張ではありません。磁化の正負が等しい確率で現れ、平均で相殺されるだけです。

## 2. 比較例：一次元開放鎖を解く

局所Ising模型でも特殊なグラフでは積への分離ができます。零外場の一次元開放鎖では隣同士の積を新変数にします。

<a id="prop-sm7-chain"></a>

<!-- formal-statement-start -->
> **命題（一次元開放鎖の分配関数と相関）**  
> $N\ge2$、$J>0$、$h=0$ で隣接頂点だけを結ぶ[Ising模型](#def-sm7-ising)を考える。このとき

$$
Z_N=2(2\cosh(\beta J))^{N-1},
$$

> また $1\le i<j\le N$ について

$$
\mathbb E_{\beta,0}(\sigma_i\sigma_j)
=(\tanh(\beta J))^{j-i}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

最初のスピンと $\tau_i=\sigma_i\sigma_{i+1}$ を指定すれば全スピンを復元でき、エネルギーが $\tau_i$ の和になります。

<!-- proof-start -->
### 証明

$\sigma_{i+1}=\sigma_i\tau_i$ なので、$\sigma_1,\tau_1,\ldots,\tau_{N-1}$ と元の配置は一対一です。$H_N=-J\sum_{i=1}^{N-1}\tau_i$ より

$$
Z_N=\sum_{\sigma_1=\pm1}\prod_{i=1}^{N-1}
\left(\sum_{\tau_i=\pm1}e^{\beta J\tau_i}\right)
=2(2\cosh(\beta J))^{N-1}.
$$

規格化後の $\tau_i$ は独立で

$$
\mathbb E\tau_i
=\frac{e^{\beta J}-e^{-\beta J}}{e^{\beta J}+e^{-\beta J}}
=\tanh(\beta J).
$$

中間スピンの二乗が1となるため

$$
\sigma_i\sigma_j=\prod_{r=i}^{j-1}(\sigma_r\sigma_{r+1})
=\prod_{r=i}^{j-1}\tau_r.
$$

期待値は独立な各因子の平均の積なので、相関の式を得ます。
<!-- proof-end -->

有限温度では $\tanh(\beta J)<1$ なので零外場相関は距離とともに減少します。ただしこの計算だけで他の次元・外場での相転移を論証したことにはなりません。

## 3. Curie–Weiss模型：磁化のみに依存するエネルギー

全てのスピン対を結ぶ場合、辺数が $N^2$ の規模になるので結合を $1/N$ に弱めます。これによりエネルギーは全磁化だけで決まります。

<a id="def-sm7-cw"></a>

<!-- formal-statement-start -->
> **定義（Curie–Weiss平均場模型）**  
> $N\ge1$、$J,\beta>0$、$h\in\mathbb R$ とする。$\Omega_N=\{-1,+1\}^N$、$M_N=\sum_i\sigma_i$、$m_N=M_N/N$ と置き、Hamiltonianと分配関数を定める。

$$
H_N=-\frac J{2N}M_N^2-hM_N,
\qquad
Z_N=\sum_{\sigma\in\Omega_N}e^{-\beta H_N}.
$$

> 無次元圧力は $p_N=N^{-1}\log Z_N$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm7-cw -->
### 直接例：三スピンの重複度

上向きスピンが $k=0,1,2,3$ 個のとき、$M_3=2k-3$ は $-3,-1,1,3$、配置数は $1,3,3,1$ です。$k=2$ の三配置はすべて $H_3=-J/6-h$ であり、重みを三回数える必要があります。
<!-- definition-example-end -->

平方型の自己相互作用を明示します。$\sigma_i^2=1$ より

$$
M_N^2=N+2\sum_{i<j}\sigma_i\sigma_j,
\qquad
H_N=-\frac JN\sum_{i<j}\sigma_i\sigma_j-\frac J2-hM_N.
$$

異なるスピン間の結合だけの場合とは定数 $-J/2$ の差で、無次元圧力の極限では消えます。

<a id="prop-sm7-multiplicity"></a>

<!-- formal-statement-start -->
> **命題（磁化階級別のCurie–Weiss分配関数）**  
> [Curie–Weiss模型](#def-sm7-cw)で上向きの個数が $k$ のとき $m_k=2k/N-1$ とすれば、

$$
Z_N=\sum_{k=0}^N\binom{N}{k}
\exp\left[N\left(\frac{\beta J}{2}m_k^2+\beta hm_k\right)\right].
$$
<!-- formal-statement-end -->

### 証明の見取り図

$k$ 個の上向き位置を選ぶ組合せ数が $\binom{N}{k}$ であることを使います。

<!-- proof-start -->
### 証明

$M_N=k-(N-k)=Nm_k$ なので[Hamiltonian](#def-sm7-cw)に代入すると

$$
-\beta H_N=N\left(\frac{\beta J}{2}m_k^2+\beta hm_k\right).
$$

同じ磁化の配置数は $\binom{N}{k}$ です。$k=0,\ldots,N$ が全配置を重複なく分類するので、階級ごとの重みを足すと結論です。
<!-- proof-end -->

## 4. エントロピーとエネルギーの競合を定量化する

磁化ゼロに近い配置は多い一方、全スピンがそろう配置は少数です。相互作用は大きな絶対磁化を有利にするので、配置数の利得とエネルギーの利得を比べる必要があります。$-1\le m\le1$、$q=(1+m)/2$、$0\log0=0$ として

$$
s(m)=-q\log q-(1-q)\log(1-q)
$$

を考えます。これは[SM2の二値配置のエントロピー率](../SM2/index.md#thm-sm2-binary-entropy-density)であり、$s(0)=\log2$、$s(\pm1)=0$ です。

<a id="lem-sm7-binomial"></a>

<!-- formal-statement-start -->
> **補題（二項係数の一様エントロピー評価）**  
> $N\ge1$、$0\le k\le N$、$m_k=2k/N-1$ とすると

$$
\frac{e^{Ns(m_k)}}{N+1}\le\binom{N}{k}\le e^{Ns(m_k)}
$$

> が端点を含めて成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$q=k/N$ の二項分布で第 $k$ 項が最頻値になることを使います。$N+1$ 項の確率の和が1なので、最大の項は $1/(N+1)$ 以上です。

<!-- proof-start -->
### 証明

$0<k<N$ とし、$q=k/N$、$b_j=\binom{N}{j}q^j(1-q)^{N-j}$ とします。隣接比は

$$
\frac{b_{j+1}}{b_j}=\frac{N-j}{j+1}\frac{k}{N-k}.
$$

$j\le k-1$ では比が1以上、$j\ge k$ では1以下となります。従って $b_k$ が最大で

$$
\frac1{N+1}\le b_k\le1.
$$

一方 $q^k(1-q)^{N-k}=e^{-Ns(m_k)}$ です。$b_k=\binom{N}{k}e^{-Ns(m_k)}$ に代入して所望の二側評価を得ます。$k=0,N$ では二項係数が1、$s(m_k)=0$ なので直接成立します。
<!-- proof-end -->

<a id="thm-sm7-pressure"></a>

<!-- formal-statement-start -->
> **定理（Curie–Weiss圧力の変分表示と磁化集中）**  
> $\beta,J>0$、$h\in\mathbb R$ を固定する。[Curie–Weiss模型](#def-sm7-cw)で

$$
\Phi_{\beta,h}(m)=s(m)+\frac{\beta J}{2}m^2+\beta hm,
\qquad -1\le m\le1
$$

> と置くと熱力学極限が存在し、

$$
p(\beta,h)=\lim_{N\to\infty}\frac1N\log Z_N
=\max_{-1\le m\le1}\Phi_{\beta,h}(m).
$$

> $\Phi_{\beta,h}$ の最大点集合を $K$ とすると、任意の $K$ の開近傍 $U$ に対して $\mathbb P_{\beta,h}(m_N\notin U)\to0$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[磁化階級の表示](#prop-sm7-multiplicity)を[二項係数評価](#lem-sm7-binomial)で挟むと、最大項と全項の対数の差が $O(\log N)$ に抑えられます。最大点集合の外側では指数重みの増大率が真に小さくなります。

<!-- proof-start -->
### 証明

格子 $D_N=\{m_k:0\le k\le N\}$、$a_N=\max_{D_N}\Phi_{\beta,h}$ とします。[二項係数評価](#lem-sm7-binomial)を[分配関数の表示](#prop-sm7-multiplicity)へ適用すると

$$
\frac{e^{Na_N}}{N+1}\le Z_N\le(N+1)e^{Na_N}.
$$

したがって

$$
a_N-\frac{\log(N+1)}N\le\frac1N\log Z_N
\le a_N+\frac{\log(N+1)}N.
$$

$\Phi$ はコンパクト区間上で一様連続です。区間の最大点から距離 $1/N$ 以下の格子点を選べるので $a_N\to\max_{[-1,1]}\Phi$。両側の誤差項は0に収束し、圧力の変分表示を得ます。

開近傍 $U$ の補集合 $F=[-1,1]\setminus U$ が空なら集中は自明です。空でなければ $F$ はコンパクトで最大点を含まないため

$$
\delta=\max_{[-1,1]}\Phi-\max_F\Phi>0.
$$

十分大きい $N$ では $a_N\ge\max\Phi-\delta/2$ です。$F$ に属する磁化階級の重みは高々 $e^{N\max_F\Phi}$、階級数は $N+1$ 以下。分母に上の下界を使うと

$$
\mathbb P(m_N\in F)
\le\frac{(N+1)e^{N\max_F\Phi}}{e^{Na_N}/(N+1)}
\le(N+1)^2e^{-N\delta/2}\longrightarrow0.
$$

これで最大点集合への確率集中が証明されました。
<!-- proof-end -->

この定理は最大点を唯一とは仮定していません。最大点が正負二つなら、典型的な磁化の絶対値が正でも、平均磁化はゼロのままであり得ます。

## 5. 自己無撞着方程式と臨界温度

$-1<m<1$ で二値エントロピーを微分すると

$$
s'(m)=\frac12\log\frac{1-m}{1+m}=-\operatorname{arctanh}m,\qquad
s''(m)=-\frac1{1-m^2}.
$$

$\Phi_{\beta,h}$ の内部停留条件は

$$
\operatorname{arctanh}m=\beta(Jm+h)
\quad\Longleftrightarrow\quad m=\tanh[\beta(Jm+h)].
$$

これが自己無撞着方程式です。ただし停留点が常に全域最大点とは限りません。端点 $\pm1$ ではエントロピーの一側微分により内側へ動くと $\Phi$ が増えるため、有限の $\beta,J,h$ の下で最大点は内部にあります。

<a id="thm-sm7-critical"></a>

<!-- formal-statement-start -->
> **定理（Curie–Weiss模型の零外場臨界点）**  
> [変分関数](#thm-sm7-pressure)で $h=0$、$a=\beta J>0$ とする。$a\le1$ なら最大点は $m=0$ だけである。$a>1$ なら一意な $m_*(a)\in(0,1)$ が存在し、

$$
m_*=\tanh(am_*),\qquad K=\{-m_*,m_*\}.
$$

> したがって臨界温度は $T_{\mathrm c}=J/k_{\mathrm B}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

正の停留点は $\operatorname{arctanh}m/m=a$ を満たします。左辺の単調性で解の数を決め、$\Phi'$ の符号で最大点かどうかを検査します。

<!-- proof-start -->
### 証明

$0<m<1$ で

$$
r(m)=\frac{\operatorname{arctanh}m}{m}
=\int_0^1\frac{du}{1-m^2u^2}.
$$

被積分関数は $m$ とともに狭義増加し、$r(0+)=1$、$r(1-)=+\infty$。従って $r(m)=a$ は $a\le1$ では正の解がなく、$a>1$ では唯一の正解 $m_*$ を持ちます。

$\Phi'_{\beta,0}(m)=am-\operatorname{arctanh}m=m(a-r(m))$ です。$a\le1$ では正の領域で負、偶関数性から負の領域で正なので0が唯一の最大点です。$a>1$ では $0<m<m_*$ で正、$m_*<m<1$ で負。従って正側の最大点は $m_*$、対称性から負側の最大点は $-m_*$ です。$a=1$ を $\beta=1/(k_{\mathrm B}T)$ に戻して臨界温度を得ます。
<!-- proof-end -->

高温では多くの配置を持つ $m=0$ のエントロピー利得が優勢ですが、低温では大きな $|m|$ の相互作用エネルギーが優勢になります。これはCurie–Weiss模型に対して厳密であり、局所結合Ising模型へそのまま移してはいけません。

## 6. 自発磁化と極限の順序

[有限系の反転対称性](#prop-sm7-spin-flip)は $h=0$ で $\mathbb Em_N=0$ を保証します。一方、[変分表示と磁化集中](#thm-sm7-pressure)に、[零外場での最大点の分類](#thm-sm7-critical)を合わせると、低温では正負二つの磁化の近傍に確率が集まります。正の秩序状態を指定するには微小な正の外場を使います。

<a id="thm-sm7-spontaneous"></a>

<!-- formal-statement-start -->
> **定理（Curie–Weiss模型の自発磁化と極限の非可換性）**  
> $J,\beta>0$ とする。各 $h>0$ に対して $\Phi_{\beta,h}$ は唯一の最大点 $m(h)\in(0,1)$ を持ち、

$$
\lim_{N\to\infty}\mathbb E_{\beta,h}m_N=m(h).
$$

> $a=\beta J$ とすると

$$
\lim_{h\downarrow0}\lim_{N\to\infty}\mathbb E_{\beta,h}m_N
=\begin{cases}0,&a\le1,\\ m_*(a),&a>1,\end{cases}
$$

> しかし逆順では常に

$$
\lim_{N\to\infty}\lim_{h\downarrow0}\mathbb E_{\beta,h}m_N=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$h>0$ なら $\Phi(m)>\Phi(-m)$ が $m>0$ で成立します。正の最大点の一意性を停留条件から示し、確率集中を平均の極限に変えた後、$h\downarrow0$ を取ります。

<!-- proof-start -->
### 証明

$h>0,m>0$ なら $\Phi(m)-\Phi(-m)=2\beta hm>0$ です。$\Phi'(0)=\beta h>0$ かつ $\Phi'(m)\to-\infty$（$m\uparrow1$）なので最大点は正の内部にあります。$g(m)=\operatorname{arctanh}m-am$ と置けば停留条件と導関数は

$$
g(m)=\beta h,\qquad g'(m)=\frac1{1-m^2}-a.
$$

$g'$ は正の半区間で狭義増加します。$a\le1$ なら $g$ 自身が0から無限大へ増加し、$a>1$ なら初め負へ減少してから一度だけ増加へ転じ、無限大に発散します。いずれも正の値 $\beta h$ と交わるのはただ一度で、最大点 $m(h)$ が一意です。

[磁化集中の定理](#thm-sm7-pressure)で $U=(m(h)-\varepsilon,m(h)+\varepsilon)$ を取ると、任意の $\varepsilon>0$ で $\mathbb P(|m_N-m(h)|>\varepsilon)\to0$ です。$|m_N|\le1$ より任意の $\varepsilon>0$ に対し

$$
\mathbb E|m_N-m(h)|
\le\varepsilon+2\mathbb P(|m_N-m(h)|>\varepsilon).
$$

先に $N\to\infty$、次に $\varepsilon\downarrow0$ として平均の収束も従います。$h\downarrow0$ の任意の集積点は、連続な変分関数の零外場最大点です。$a\le1$ なら0のみ。$a>1$ では $g(m(h))>0$ から $m(h)>m_*$ であり、正の $m_*$ だけが集積点となります。

逆順では、各有限 $N$ の期待値は $h$ に関する有限和の商なので連続です。[反転対称性](#prop-sm7-spin-flip)から $h=0$ で平均は0。従って先に $h\downarrow0$ を取れば各 $N$ で0、次の $N\to\infty$ でも0です。
<!-- proof-end -->

極限の非可換性は有限系の対称性の破綻ではなく、無限系へ移る際の**秩序状態の選択方法の違い**です。有限系の零外場分布は正負を対称に混合しています。

## 7. 磁化揺らぎと外場応答

[SM3の分配関数微分とエネルギー揺らぎ](../SM3/index.md#thm-sm3-energy-variance)と同様に、外場の微分は共役な磁化を与えます。ただし有限系の微分と無限系の微分を根拠なく交換しません。

<a id="prop-sm7-response"></a>

<!-- formal-statement-start -->
> **命題（磁化分散と常磁性相の感受率）**  
> [Curie–Weiss模型](#def-sm7-cw)の有限 $N$ に対して

$$
\frac{\partial}{\partial h}\mathbb E_{\beta,h}m_N
=\frac{\beta}{N}\operatorname{Var}_{\beta,h}(M_N)\ge0.
$$

> $\beta J<1$ における熱力学極限後の磁化 $m(h)$ の感受率は

$$
\chi=\left.\frac{dm(h)}{dh}\right|_{h=0}
=\frac{\beta}{1-\beta J}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

有限和を外場で二回微分すると分散が現れます。無限系については自己無撞着方程式を微分し、分母が正であることを確認します。

<!-- proof-start -->
### 証明

外場に依存する重みは $e^{\beta hM_N}$ なので

$$
\partial_h\log Z_N=\beta\mathbb EM_N,
\qquad
\partial_h^2\log Z_N
=\beta^2(\mathbb EM_N^2-(\mathbb EM_N)^2).
$$

$\mathbb Em_N=(N\beta)^{-1}\partial_h\log Z_N$ をもう一度微分すると有限系の式が従います。

次に[自発磁化の定理](#thm-sm7-spontaneous)の正の外場での解は $m(h)=\tanh(\beta Jm(h)+\beta h)$ です。$\beta J<1$ では零外場の解は $m(0)=0$、解の局所微分可能性を保証する係数 $1-\beta J$ は正です。連鎖律により

$$
m'(h)=(1-m(h)^2)(\beta Jm'(h)+\beta),
$$

$$
[1-\beta J(1-m(h)^2)]m'(h)=\beta(1-m(h)^2).
$$

$h=0$ を代入すると $m'(0)=\beta/(1-\beta J)$ です。有限系の分散の極限と微分の交換は使っていません。
<!-- proof-end -->

$\beta J\uparrow1$ で感受率は増大します。相転移が起こる境界値 $a=1$ で $\operatorname{arctanh}m=m+m^3/3+O(m^5)$ を用いると

$$
\beta h=\operatorname{arctanh}m-m=\frac{m^3}{3}+O(m^5),
\qquad m(h)\sim(3\beta h)^{1/3}.
$$

これは線形応答が成立しなくなる具体例です。自由エネルギーの非解析性、相関長、臨界指数の体系は次章で学びます。

## 8. 演習：有限状態から熱力学極限まで

### Level A：定義と直接計算

#### A1. 二スピンの磁化分散

辺一本の零外場Ising模型（$J>0$）で四配置の確率を示し、$\mathbb EM$ と $\mathbb EM^2$ を求めよ。

- Level: A
- ID: SM7-A1

<!-- solution-start -->
**詳細解答**

[有限強磁性Ising模型](#def-sm7-ising)のHamiltonianから $(+,+),(-,-)$ の重みはそれぞれ $e^{\beta J}$、$(+,-),(-,+)$ はそれぞれ $e^{-\beta J}$ です。各確率は $Z=2(e^{\beta J}+e^{-\beta J})$ で割って得ます。$M=+2,-2,0,0$ なので

$$
\mathbb EM=\frac{2e^{\beta J}-2e^{\beta J}}Z=0,
$$

$$
\mathbb EM^2=\frac{4e^{\beta J}+4e^{\beta J}}Z
=\frac4{1+e^{-2\beta J}}.
$$

高温の $\beta J\to0$ で二乗平均は2、低温の $\beta J\to\infty$ では4です。平均ゼロでも磁化の揺らぎは残ります。
<!-- solution-end -->

#### A2. 三スピンのCurie–Weiss模型

$N=3$、$h=0$ の分配関数を磁化階級ごとに列挙して求めよ。

- Level: A
- ID: SM7-A2

<!-- solution-start -->
**詳細解答**

上向きの個数 $k=0,1,2,3$ に対し $M=2k-3$ は $-3,-1,1,3$、重複度 $\binom3k$ は $1,3,3,1$ です。[磁化別分配関数](#prop-sm7-multiplicity)に $N=3,h=0$ を代入すると

$$
Z_3=e^{3\beta J/2}+3e^{\beta J/6}
+3e^{\beta J/6}+e^{3\beta J/2}
=2e^{3\beta J/2}+6e^{\beta J/6}.
$$

$|M|=1$ の項を一つしか数えない誤りを防ぎます。
<!-- solution-end -->

#### A3. エントロピー評価の数値確認

$N=4$、$k=0,2,4$ の磁化と二値エントロピーを求め、$k=2$ で二項係数の上下界を検算せよ。

- Level: A
- ID: SM7-A3

<!-- solution-start -->
**詳細解答**

$m_k=2k/4-1$ は $-1,0,1$。端点で $s=0$、中央で $s(0)=\log2$ です。[二項係数の一様評価](#lem-sm7-binomial)の $k=2$ での上下界は

$$
\frac{e^{4\log2}}5=\frac{16}{5}
\le\binom42=6\le16=e^{4\log2}.
$$

両端では $\binom40=\binom44=1=e^{4s(\pm1)}$ です。
<!-- solution-end -->

#### A4. 一次元鎖の相関の減衰

零外場の一次元開放鎖で $\beta J=(\log3)/2$ とする。距離1と3の二点相関を計算せよ。

- Level: A
- ID: SM7-A4

<!-- solution-start -->
**詳細解答**

$e^{2\beta J}=3$ なので

$$
\tanh(\beta J)=\frac{e^{2\beta J}-1}{e^{2\beta J}+1}
=\frac{3-1}{3+1}=\frac12.
$$

[一次元開放鎖の相関式](#prop-sm7-chain)で距離 $j-i=1,3$ を代入して

$$
\mathbb E(\sigma_i\sigma_{i+1})=\frac12,\qquad
\mathbb E(\sigma_i\sigma_{i+3})=\frac18.
$$

同じ温度でも遠くのスピン同士の相関は小さくなります。
<!-- solution-end -->

### Level B：停留点・集中・応答

#### B1. 停留点は最大点とは限らない

$\beta J=2$、$h=0$ とする。$m=0$ が自己無撞着方程式の解であること、しかし変分関数の最大点ではないことを示し、非零の停留点の個数を論じよ。

- Level: B
- ID: SM7-B1

<!-- solution-start -->
**詳細解答**

$m=0$ を $m=\tanh(2m)$ に代入すると成立します。しかし[変分関数](#thm-sm7-pressure)の二階導関数は

$$
\Phi''(m)=2-\frac1{1-m^2},\qquad \Phi''(0)=1>0
$$

ですから十分小さな $m\ne0$ で $\Phi(m)>\Phi(0)$ となり、0は最大点ではありません。[零外場の最大点定理](#thm-sm7-critical)で示した $r(m)=\operatorname{arctanh}m/m$ は正の領域で1から無限大へ狭義増加するので、$r(m)=2$ の正解はただ一つ。偶関数性で負解も一つ存在します。最大点はその二つであり、停留点が合計三つ存在しても最大点は二つです。
<!-- solution-end -->

#### B2. 最大点集合への指数集中

[変分定理](#thm-sm7-pressure)の $\Phi$ の最大点集合を $K$ とする。開近傍 $U$ の外側で磁化が取る確率が指数的に減少することを再導出せよ。

- Level: B
- ID: SM7-B2

<!-- solution-start -->
**詳細解答**

$F=[-1,1]\setminus U$ が空なら確率は0です。非空なら最大点を含まないコンパクト集合なので

$$
\delta=\max_{[-1,1]}\Phi-\max_F\Phi>0.
$$

離散格子上の最大値 $a_N$ は $\max\Phi$ へ収束するため、十分大きい $N$ で $a_N\ge\max\Phi-\delta/2$。[二項係数の評価](#lem-sm7-binomial)により分母は $Z_N\ge e^{Na_N}/(N+1)$、$F$ の磁化階級の重みの総和は高々 $(N+1)e^{N\max_F\Phi}$ です。従って

$$
\mathbb P(m_N\in F)
\le(N+1)^2e^{-N\delta/2}\longrightarrow0.
$$

単に最大項が大きいと言うだけでなく、最大点から離れた集合との厳密な指数差を使います。
<!-- solution-end -->

#### B3. 有限系の分散と無限系の感受率

有限のCurie–Weiss模型で $\partial_h\mathbb Em_N$ を求め、$\beta J<1$ で熱力学極限後の $\chi$ を自己無撞着方程式から求めよ。

- Level: B
- ID: SM7-B3

<!-- solution-start -->
**詳細解答**

$Z_N$ の各項の $h$ 依存は $e^{\beta hM_N}$ なので、有限和を微分して

$$
\partial_hZ_N=\beta Z_N\mathbb EM_N,\qquad
\partial_h^2Z_N=\beta^2 Z_N\mathbb EM_N^2.
$$

商の微分から $\partial_h^2\log Z_N=\beta^2\operatorname{Var}(M_N)$。従って

$$
\partial_h\mathbb Em_N=\frac1{N\beta}\partial_h^2\log Z_N
=\frac\beta N\operatorname{Var}(M_N).
$$

一方、[自発磁化定理](#thm-sm7-spontaneous)の熱力学極限後の方程式 $m=\tanh(\beta Jm+\beta h)$ を微分すると

$$
m'=(1-m^2)(\beta Jm'+\beta),
\qquad
[1-\beta J(1-m^2)]m'=\beta(1-m^2).
$$

$h=0$ で $m=0$、かつ $\beta J<1$ なので $\chi=\beta/(1-\beta J)$。ここでは有限系の微分と無限系の極限の交換を仮定していません。
<!-- solution-end -->

### Level C：熱力学極限と対称性の破れ

#### C1. 二つの反復極限を比較する

$J>0$、$\beta J>1$ のCurie–Weiss模型を考える。磁化別分配関数から圧力の変分表示を導き、零外場の最大点を求めよ。さらに $h\downarrow0$ と $N\to\infty$ の順序を入れ替えると平均磁化の極限がどう変わるか論証せよ。

- Level: C
- ID: SM7-C1

<!-- solution-start -->
**詳細解答**

上向きが $k$ 個なら $m_k=2k/N-1$ で、その配置数は $\binom Nk$。[磁化階級表示](#prop-sm7-multiplicity)を再導出すると

$$
Z_N=\sum_{k=0}^N\binom Nk
e^{N(\beta Jm_k^2/2+\beta hm_k)}.
$$

[二項係数の一様評価](#lem-sm7-binomial)で $\Phi=s+\beta Jm^2/2+\beta hm$、格子上の最大値を $a_N$ とすると

$$
a_N-\frac{\log(N+1)}N
\le\frac{\log Z_N}N
\le a_N+\frac{\log(N+1)}N.
$$

$\Phi$ の一様連続性と格子幅 $2/N\to0$ により、$a_N$ は連続区間上の最大値へ収束します。従って圧力の極限は $\max\Phi$ です。$h=0$ での停留条件は $\operatorname{arctanh}m=\beta Jm$。[臨界点定理](#thm-sm7-critical)より $\beta J>1$ の最大点は正負の $\pm m_*$ です。

有限 $N$ では[スピン反転](#prop-sm7-spin-flip)と有限和の連続性により

$$
\lim_{h\downarrow0}\mathbb E_{\beta,h}m_N=0.
$$

従って後で $N\to\infty$ としても0です。一方、固定した $h>0$ では $\Phi(m)-\Phi(-m)=2\beta hm>0$（$m>0$）なので正側が有利です。[自発磁化定理](#thm-sm7-spontaneous)の一意な最大点 $m(h)>0$ へ磁化が集中し、$\lim_{N\to\infty}\mathbb Em_N=m(h)$。その後 $h\downarrow0$ とすると $m(h)\to m_*$。まとめると

$$
\lim_{h\downarrow0}\lim_{N\to\infty}\mathbb Em_N=m_*>0,
\qquad
\lim_{N\to\infty}\lim_{h\downarrow0}\mathbb Em_N=0.
$$

有限系の対称性が破られたのではなく、無限系でどちらの秩序相を選択するかが異なるためです。
<!-- solution-end -->

## 9. 次章への接続

有限Ising模型では分配関数は有限和ですが、熱力学極限の変分問題では最大点が一つから二つへ変わりました。この変化は自由エネルギーの非解析性や臨界的な応答と結び付きます。SM8では、相転移・相関・臨界指数・普遍性を平均場の範囲と区別しながら扱います。
