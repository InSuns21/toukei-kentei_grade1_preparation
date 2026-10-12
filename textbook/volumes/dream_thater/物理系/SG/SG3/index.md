# SG3 Sherrington–Kirkpatrick模型・overlap・自由エネルギー

[SG1のRandom Energy Model](../SG1/index.md#def-sg1-rem)では配置ごとのエネルギーを独立にしました。[SG2のGaussian場と補間](../SG2/index.md#thm-sg2-interpolation)では、独立性を捨てても共分散が分かればquenched圧力を比較できると学びました。では、**同じランダム結合を全てのスピン配置が共有する**場合、共分散を何で記述すればよいでしょうか。

Sherrington–Kirkpatrick（SK）模型では、二配置が各サイトでどれだけ一致するかを測る **overlap（重なり）** がその役目を果たします。ここでは有限系の定義と計算から始め、Gaussian部分積分で圧力の微分を導き、二つの系へ分割する補間で熱力学極限の存在を証明します。極限の**値を求める**問題は、後続のレプリカ対称性・Parisi理論に残します。

## 1. スピン配置と共有されるGaussian結合

配置集合を $\Sigma_N=\{-1,+1\}^N$ とし、整数 $N\ge1$、逆温度 $\beta\ge0$、無次元の一様外場 $h\in\mathbb R$ を固定します。異なる配置 $\sigma,\tau$ は同じ相互作用係数を利用します。結合が共通であることが、REMとの違いです。

まず $1\le i<j\le N$ ごとに互いに独立な標準正規変数 $J_{ij}$ を置き、Boltzmann指数の中の相互作用を $\beta N^{-1/2}\sum_{i<j}J_{ij}\sigma_i\sigma_j$ とします。物理でエネルギーを $H_N$ と呼ぶときは、この相互作用に負号を付けて $\exp(-\beta H_N)$ とする流儀もあります。本章では、**指数に入る量**を $B_N$ と記して符号を固定します。

<a id="def-sg3-sk"></a>

<!-- formal-statement-start -->
> **定義（Sherrington–Kirkpatrick模型）**  
> $N\ge1$、$\beta\ge0$、$h\in\mathbb R$ とし、$J_{ij}$（$1\le i<j\le N$）を独立な $N(0,1)$ 変数とする。各 $\sigma\in\Sigma_N$ に対し
>
> $$
> B_N^{\mathrm{SK}}(\sigma)
> =\frac{\beta}{\sqrt N}\sum_{1\le i<j\le N}J_{ij}\sigma_i\sigma_j
> +h\sum_{i=1}^N\sigma_i,
> \qquad
> Z_N^{\mathrm{SK}}=\sum_{\sigma\in\Sigma_N}e^{B_N^{\mathrm{SK}}(\sigma)}
> $$
>
> と定める。無秩序 $J$ を固定したGibbs平均、ランダム圧力、quenched圧力をそれぞれ

$
\langle f\rangle_J
=\frac{\sum_{\sigma\in\Sigma_N}f(\sigma)e^{B_N^{\mathrm{SK}}(\sigma)}}{Z_N^{\mathrm{SK}}},
$

$
F_N=\frac1N\log Z_N^{\mathrm{SK}},\qquad
p_N(\beta,h)=\mathbb EF_N
$

> とする。$\mathbb E$ は結合に関する期待値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg3-sk -->
### 二スピンで定義を確認する

**定義の確認**：$N=2$、$h=0$ とすると、一つの結合 $J_{12}=J$ のみが現れます。$\sigma_1\sigma_2=+1$ の配置が二つ、$-1$ の配置も二つあるので

$$
Z_2^{\mathrm{SK}}
=2e^{\beta J/\sqrt2}+2e^{-\beta J/\sqrt2}
=4\cosh(\beta J/\sqrt2).
$$

この例は、**配置が四つあっても独立な無秩序は一つ**しかないことを直接示します。$\beta=0$ なら $Z_N=(2\cosh h)^N$ です。
<!-- definition-example-end -->

全配置で分散をそろえた補間を行うため、もう一つの表示を導入します。$G_{ij}$（$1\le i,j\le N$）を全て独立な標準正規変数として

$$
X_N(\sigma)=\frac1{\sqrt{2N}}\sum_{i,j=1}^N G_{ij}\sigma_i\sigma_j,\qquad
B_N^{\mathrm{full}}(\sigma)=\beta X_N(\sigma)+h\sum_i\sigma_i
$$

と置きます。「full」は対角 $i=j$ も含む表示であり、別の物理模型を仮定するものではありません。

<a id="prop-sg3-representation"></a>

<!-- formal-statement-start -->
> **命題（対角項を含むGaussian表示の同値性）**  
> 上記の標準SK模型とfull表示の間で、$N\ge1$、$\beta\ge0$、$h\in\mathbb R$ の全てについて
>
> $$
> Z_N^{\mathrm{full}}\ \stackrel{d}{=}\ e^{\beta D_N}Z_N^{\mathrm{SK}},
> \qquad D_N\sim N(0,1/2),
> $$
>
> かつ右辺の $D_N$ は $Z_N^{\mathrm{SK}}$ と独立に選べる。このため $\mathbb E\log Z_N^{\mathrm{full}}=\mathbb E\log Z_N^{\mathrm{SK}}$ であり、両表示の $p_N(\beta,h)$ は等しい。
<!-- formal-statement-end -->

### 証明の見取り図

対角結合は $\sigma_i^2=1$ なので全配置で同じ加算項になります。非対角結合は $G_{ij}+G_{ji}$ を一つの標準正規変数へまとめます。

<!-- proof-start -->
### 証明

有限和を対角項と非対角項に分離します。

$$
X_N(\sigma)
=\frac1{\sqrt{2N}}\sum_iG_{ii}
+\frac1{\sqrt{2N}}\sum_{i<j}(G_{ij}+G_{ji})\sigma_i\sigma_j.
$$

$D_N=(2N)^{-1/2}\sum_iG_{ii}$ は平均0、分散 $N/(2N)=1/2$ の正規変数です。$J_{ij}'=(G_{ij}+G_{ji})/\sqrt2$ は互いに独立な標準正規で、対角変数とも独立です。従って

$$
X_N(\sigma)=D_N+\frac1{\sqrt N}\sum_{i<j}J_{ij}'\sigma_i\sigma_j.
$$

全配置で共通の $e^{\beta D_N}$ を分配関数の外へ出すと主張する分布同値性を得ます。$\mathbb ED_N=0$ なので、対数の期待値からこの項は消えます。共通項は試料圧力には $\beta D_N/N$ だけ影響しますが、その差も $N\to\infty$ で消えます。
<!-- proof-end -->

## 2. Overlap：二つの配置の類似を数値にする

SG2では[二レプリカ平均](../SG2/index.md#def-sg2-replica)を使いました。SK模型では二回引いた配置が各サイトで一致するかを記録します。同じ無秩序を固定してから二つの配置を**条件付き独立に**取り出す点を変えてはいけません。

<a id="def-sg3-overlap"></a>

<!-- formal-statement-start -->
> **定義（SK模型のoverlap）**  
> $N\ge1$、$\sigma,\tau\in\Sigma_N$ に対し
>
> $$
> q_N(\sigma,\tau)=\frac1N\sum_{i=1}^N\sigma_i\tau_i
> $$
>
> をoverlap（重なり）と呼ぶ。無秩序を固定して独立な二レプリカ $\sigma^1,\sigma^2$ をGibbs分布から取るとき、$q_{12}=q_N(\sigma^1,\sigma^2)$ と書き、$\langle q_{12}^k\rangle$ の後に必要に応じて $\mathbb E$ を取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg3-overlap -->
### 一致数からoverlapを計算する

**定義の確認**：例えば $N=4$ で $\sigma=(+,+,-,-)$、$\tau=(+,-,-,+)$ なら、積は $(+,-,+,-)$ なので $q_N=0$ です。四箇所全て一致なら $q_N=1$、全て反転なら $q_N=-1$。一般に不一致箇所が $d$ 個なら

$$
q_N=\frac{(N-d)-d}{N}=1-\frac{2d}{N},\qquad -1\le q_N\le1.
$$

これは配置同士の決定論的な値です。$\mathbb E\langle q_{12}^2\rangle$ は二レプリカ抽出と無秩序の平均を含む、別の量です。
<!-- definition-example-end -->

<a id="prop-sg3-covariance"></a>

<!-- formal-statement-start -->
> **命題（SK Gaussian場の共分散とoverlap）**  
> 定義した $X_N$ は平均0の有限Gaussian場であり、任意の $\sigma,\tau\in\Sigma_N$ に対し
>
> $$
> \mathbb E[X_N(\sigma)X_N(\tau)]
> =\frac N2 q_N(\sigma,\tau)^2.
> $$
>
> 標準表示の相互作用 $Y_N(\sigma)=N^{-1/2}\sum_{i<j}J_{ij}\sigma_i\sigma_j$ では共分散は $(Nq_N(\sigma,\tau)^2-1)/2$ である。特に両表示の配置間の共分散は同じ $q_N^2$ に依存する。
<!-- formal-statement-end -->

### 証明の見取り図

独立な結合を平均すると、添字が一致する項だけが残ります。四つのスピンの積を二つの和に分けるとoverlapの二乗が現れます。

<!-- proof-start -->
### 証明

$\mathbb E[G_{ij}G_{k\ell}]=\mathbf1_{\{i=k,j=\ell\}}$ なので

$$
\begin{aligned}
\mathbb E[X_N(\sigma)X_N(\tau)]
&=\frac1{2N}\sum_{i,j,k,\ell}
 \mathbb E[G_{ij}G_{k\ell}]
 \sigma_i\sigma_j\tau_k\tau_\ell\\
&=\frac1{2N}\sum_{i,j}(\sigma_i\tau_i)(\sigma_j\tau_j)\\
&=\frac1{2N}\left(\sum_i\sigma_i\tau_i\right)^2
=\frac N2q_N(\sigma,\tau)^2.
\end{aligned}
$$

標準表示では $i<j$ だけを残し、$a_i=\sigma_i\tau_i\in\{-1,1\}$ と置くと

$$
\sum_{i<j}a_ia_j
=\frac12\left[\left(\sum_i a_i\right)^2-\sum_i a_i^2\right]
=\frac12(N^2q_N^2-N).
$$

これを $1/N$ 倍して $(Nq_N^2-1)/2$ を得ます。
<!-- proof-end -->

**なぜ二乗なのか**：$\tau$ を全スピン反転しても $X_N(\tau)=X_N(-\tau)$ です。相互作用はスピンの積 $\tau_i\tau_j$ しか見ないためです。$q_N(\sigma,-\tau)=-q_N(\sigma,\tau)$ でも共分散は同じなので、$q_N$ そのものではなく $q_N^2$ が現れるのは自然です。

## 3. overlapで表す圧力の微分

ランダム圧力の平均だけを知っても、結合に対するGibbs状態の反応は読み取れません。しかし $\beta$ による微分はoverlapの二乗平均へ変換できます。これが有限系で確実に成立する関係であり、極限の圧力を勝手に微分した式ではありません。

<a id="prop-sg3-pressure-derivative"></a>

<!-- formal-statement-start -->
> **命題（quenched圧力の微分とoverlap）**  
> $N\ge1$、$\beta\ge0$、$h\in\mathbb R$ に対し、SKのquenched圧力 $p_N(\beta,h)$ は $\beta$ に関して右微分（$\beta>0$ では通常の微分）が存在し、
>
> $$
> \partial_\beta p_N(\beta,h)
> =\frac\beta2\left(1-\mathbb E\langle q_{12}^2\rangle\right).
> $$
>
> さらに
>
> $$
> 0\le\partial_\beta p_N\le\frac\beta2,\qquad
> \log(2\cosh h)\le p_N(\beta,h)
> \le\log(2\cosh h)+\frac{\beta^2}{4}.
> $$
>
> この微分公式はfull表示・標準表示に共通である。
<!-- formal-statement-end -->

### 証明の見取り図

full表示の $X_N$ は $\beta$ に依存しません。分配関数を微分して $\langle X_N\rangle$ を作り、[SG2のGaussian部分積分](../SG2/index.md#prop-sg2-correlated-ibp)と[重みの微分](../SG2/index.md#prop-sg2-gibbs-derivatives)を適用して、「対角分散−二レプリカ共分散」に変えます。

<!-- proof-start -->
### 証明

有限配置の和を微分できるので、full表示について

$$
\partial_\beta p_N
=\frac1N\mathbb E\left[
 \frac{\sum_\sigma X_N(\sigma)e^{\beta X_N(\sigma)+h\sum_i\sigma_i}}
 {\sum_\rho e^{\beta X_N(\rho)+h\sum_i\rho_i}}
\right]
=\frac1N\sum_\sigma\mathbb E[X_N(\sigma)w(\sigma)].
$$

期待値と微分の交換は、有限個のGaussian変数に対して導関数が $\max_\sigma|X_N(\sigma)|/N$ 以下であることから従います。$C_{\sigma\tau}=\mathbb E[X_N(\sigma)X_N(\tau)]$ とすると、[部分積分](../SG2/index.md#prop-sg2-correlated-ibp)の適用で

$$
\begin{aligned}
\mathbb E[X_N(\sigma)w(\sigma)]
&=\sum_\tau C_{\sigma\tau}
 \mathbb E[\partial_{X_N(\tau)}w(\sigma)]\\
&=\beta\sum_\tau C_{\sigma\tau}
 \mathbb E[w(\sigma)(\mathbf1_{\{\sigma=\tau\}}-w(\tau))].
\end{aligned}
$$

これを $\sigma$ で和を取り、対角と二レプリカに分けます。

$$
\begin{aligned}
\partial_\beta p_N
&=\frac\beta N\mathbb E
 \left[\sum_\sigma w(\sigma)C_{\sigma\sigma}
 -\sum_{\sigma,\tau}w(\sigma)w(\tau)C_{\sigma\tau}\right]\\
&=\frac\beta N\left[\frac N2
 -\frac N2\mathbb E\langle q_{12}^2\rangle\right]
=\frac\beta2(1-\mathbb E\langle q_{12}^2\rangle).
\end{aligned}
$$

ここで[共分散公式](#prop-sg3-covariance)と $\sum_\sigma w(\sigma)=1$ を用いました。$0\le q_{12}^2\le1$ から微分の上下界を得ます。$\beta=0$ では $Z_N=(2\cosh h)^N$ ですから、微分の上下界を $0$ から $\beta$ まで積分して圧力の両側評価を得ます。[表示の同値性](#prop-sg3-representation)により標準表示にも同じ結論が成立します。
<!-- proof-end -->

**二スピンの検算**：$h=0$、$a=\beta J/\sqrt2$ と置くと[二スピンの分配関数](#def-sg3-sk)から

$$
p_2(\beta,0)=\frac12\mathbb E\log(4\cosh a),\qquad
\partial_\beta p_2=\frac1{2\sqrt2}\mathbb E[J\tanh a].
$$

標準正規の[部分積分](../SG2/index.md#prop-sg2-correlated-ibp)を $J$ に適用すると $\mathbb E[J\tanh a]=(\beta/\sqrt2)\mathbb E(1-\tanh^2a)$ です。一方、後述の演習で直接求める値は $\langle q_{12}^2\rangle=\frac12(1+\tanh^2a)$ です。両方とも $\beta\mathbb E(1-\tanh^2a)/4$ となり一致します。

## 4. 熱力学極限の存在：一つの系を二つへ分ける

[SG2のGaussian集中](../SG2/index.md#cor-sg2-pressure-concentration)は、ランダムな $F_N$ が平均 $p_N$ の近くにいることを保証します。しかし $p_N$ 自身が収束する保証にはなりません。そこで $N=N_1+N_2$ と分割し、**大きな一系の平均対数分配関数は、独立な二系の和より小さくない**ことを証明します。

$a_N=Np_N=\mathbb E\log Z_N$ を比較の対象にします。各ブロックにも元の模型と同じ $\beta,h$ を使用します。第1ブロックの配置を $\sigma^{(1)}$、第2ブロックを $\sigma^{(2)}$ とし、分割したGaussian場を $Y(\sigma)=\beta X_{N_1}^{(1)}(\sigma^{(1)})+\beta X_{N_2}^{(2)}(\sigma^{(2)})$、全系の場を $V(\sigma)=\beta X_N(\sigma)$ とします。両場は独立に作り、外場 $h\sum_i\sigma_i$ は共通に足します。

<a id="thm-sg3-superadditivity"></a>

<!-- formal-statement-start -->
> **定理（Guerra–Toninelli型の超加法性）**  
> $\beta\ge0$、$h\in\mathbb R$ を固定し、SK模型の $a_N=\mathbb E\log Z_N^{\mathrm{SK}}$ と置く。任意の整数 $N_1,N_2\ge1$ について
>
> $$
> a_{N_1+N_2}\ge a_{N_1}+a_{N_2}.
> $$
>
> 具体的に、上記の独立なfull Gaussian場を $\sqrt t\,V+\sqrt{1-t}\,Y$ と補間し、その分配関数に対する $\Psi(t)=\mathbb E\log Z_t$ とすると、$N=N_1+N_2$、$0<t<1$ について
>
> $$
> \Psi'(t)=\frac{\beta^2}{4}\frac{N_1N_2}{N}\,
> \mathbb E\left\langle(q_{12}^{(1)}-q_{12}^{(2)})^2\right\rangle_t\ge0.
> $$
>
> $q_{12}^{(j)}$ はブロック $j$ 内の二レプリカoverlapである。
<!-- formal-statement-end -->

### 証明の見取り図

二つの共分散は全配置で分散が等しく、差はブロックoverlapの重み付き平均の二乗と、各ブロックで先に二乗してから重み付き平均した値との差です。この差を平方完成すると符号が確定します。補間の端点では、一方が全系、一方が二系の独立積になります。

<!-- proof-start -->
### 証明

$u=q_{N_1}(\sigma^{(1)},\tau^{(1)})$、$v=q_{N_2}(\sigma^{(2)},\tau^{(2)})$ と置きます。定義から全系のoverlapは

$$
q_N(\sigma,\tau)
=\frac{N_1}{N}u+\frac{N_2}{N}v.
$$

[共分散公式](#prop-sg3-covariance)を、互いに独立なfull Gaussian場 $V,Y$ に使うと

$$
C^V_{\sigma\tau}=\frac{\beta^2N}{2}q_N^2,\qquad
C^Y_{\sigma\tau}=\frac{\beta^2}{2}(N_1u^2+N_2v^2).
$$

ここで $N=N_1+N_2$ を代入して平方を展開します。

$$
\begin{aligned}
Nq_N^2-N_1u^2-N_2v^2
&=\frac{(N_1u+N_2v)^2}{N}-N_1u^2-N_2v^2\\
&=\frac{N_1^2u^2+2N_1N_2uv+N_2^2v^2
 -NN_1u^2-NN_2v^2}{N}\\
&=-\frac{N_1N_2}{N}(u-v)^2.
\end{aligned}
$$

したがって共分散差は

$$
C^V_{\sigma\tau}-C^Y_{\sigma\tau}
=-\frac{\beta^2N_1N_2}{2N}(u-v)^2\le0.
$$

$\sigma=\tau$ なら両ブロックで $u=v=1$ なので対角差は0です。[SG2のGaussian補間微分公式](../SG2/index.md#thm-sg2-interpolation)を、正規場 $V,Y$ に対して外側の逆温度パラメータを $1$、規格化係数を $N$ として適用します。今回は $\Psi=N\Phi$ なので

$$
\begin{aligned}
\Psi'(t)
&=\frac12\sum_\sigma\mathbb Ew_t(\sigma)(C^V_{\sigma\sigma}-C^Y_{\sigma\sigma})
-\frac12\sum_{\sigma,\tau}\mathbb Ew_t(\sigma)w_t(\tau)
 (C^V_{\sigma\tau}-C^Y_{\sigma\tau})\\
&=\frac{\beta^2N_1N_2}{4N}
\mathbb E\langle(u-v)^2\rangle_t\ge0.
\end{aligned}
$$

$|u|,|v|\le1$ なので微分は $0\le\Psi'(t)\le\beta^2N_1N_2/N$ に抑えられ、端点へ積分を延長できます。$t=1$ では全系のfull表示、$t=0$ では

$$
Z_0=\sum_{\sigma^{(1)},\sigma^{(2)}}
e^{\beta X_{N_1}^{(1)}+h\sum_{i\in1}\sigma_i}
e^{\beta X_{N_2}^{(2)}+h\sum_{i\in2}\sigma_i}
=Z_{N_1}^{(1)}Z_{N_2}^{(2)}.
$$

よって $\Psi(0)=a_{N_1}+a_{N_2}$、$\Psi(1)=a_N$ です。[full表示の同値性](#prop-sg3-representation)を双方の端点に用いると、標準SK模型に対しても不等式が成立します。
<!-- proof-end -->

「共分散が小さいから圧力が大きい」とだけ覚えると、対角分散をそろえる条件を落としがちです。ここでは**対角差が0**であり、残る差が負の平方であることを計算して初めて符号が定まります。

<a id="thm-sg3-pressure-limit"></a>

<!-- formal-statement-start -->
> **定理（SK模型のquenched圧力の熱力学極限）**  
> 独立な標準正規結合を持つSK模型で $\beta\ge0$、$h\in\mathbb R$ を固定する。$p_N(\beta,h)=N^{-1}\mathbb E\log Z_N^{\mathrm{SK}}$ は有限な極限を持ち、
>
> $$
> p(\beta,h):=\lim_{N\to\infty}p_N(\beta,h)
> =\sup_{N\ge1}p_N(\beta,h),
> \qquad
> \log(2\cosh h)\le p(\beta,h)\le
> \log(2\cosh h)+\frac{\beta^2}{4}.
> $$
>
> 同じ結合空間上に各 $N$ の模型を定めれば、ランダム圧力 $F_N=N^{-1}\log Z_N^{\mathrm{SK}}$ も $p(\beta,h)$ へ確率収束し、かつ概収束する。ここで $N$ が異なる模型の結合に独立性は要求しない。
<!-- formal-statement-end -->

### 証明の見取り図

超加法性は平均値列の極限を作ります。そのうえでGaussian集中によって試料ごとの差を抑えます。**平均値の収束と自己平均化の二段階**を混同しないようにします。

<!-- proof-start -->
### 証明

[超加法性](#thm-sg3-superadditivity)により $a_{m+n}\ge a_m+a_n$ です。[圧力の両側評価](#prop-sg3-pressure-derivative)から

$$
N\log(2\cosh h)\le a_N
\le N\left(\log(2\cosh h)+\frac{\beta^2}{4}\right).
$$

極限を直接証明します。任意の固定整数 $m\ge1$ に対し $n=km+r$（$0\le r<m$）とし、$a_0=0$ と約束します。超加法性を $k$ 回繰り返すと

$$
a_n\ge k a_m+a_r\ge k a_m+r\log(2\cosh h).
$$

$n\to\infty$ で $km/n\to1$、$r/n\to0$ なので

$$
\liminf_{n\to\infty}\frac{a_n}{n}
\ge\frac{a_m}{m}.
$$

$m$ は任意だから左辺は $\sup_m a_m/m$ 以上です。他方、全ての $n$ について $a_n/n\le\sup_m a_m/m$。従って極限が存在して上限に等しく、先の上界によって有限です。

次に試料ごとの差を制御します。標準表示の独立結合 $J_{ij}$ を座標とすると、有限和の微分より

$$
\frac{\partial F_N}{\partial J_{ij}}
=\frac{\beta}{N\sqrt N}\langle\sigma_i\sigma_j\rangle_J,\qquad
\|\nabla_J F_N\|_2^2
=\frac{\beta^2}{N^3}\sum_{i<j}\langle\sigma_i\sigma_j\rangle_J^2
\le\frac{\beta^2(N-1)}{2N^2}
\le\frac{\beta^2}{2N}.
$$

$\beta>0$ では $F_N$ は $L=\beta/\sqrt{2N}$-Lipschitz なので、[正規無秩序圧力の集中](../SG2/index.md#cor-sg2-pressure-concentration)から、任意の $\varepsilon>0$ について

$$
\mathbb P(|F_N-p_N|\ge\varepsilon)
\le2\exp\left(-\frac{N\varepsilon^2}{\beta^2}\right).
$$

右辺は $N$ について総和可能です。よって確率収束し、さらに和事象への上界

$$
\mathbb P\left(\bigcup_{N\ge M}\{|F_N-p_N|\ge\varepsilon\}\right)
\le\sum_{N\ge M}2e^{-N\varepsilon^2/\beta^2}
\longrightarrow0
$$

から、固定した $\varepsilon$ 以上のずれは確率1で有限回しか起こりません。$\varepsilon=1,1/2,1/3,\ldots$ を順に適用すると $F_N-p_N\to0$ が確率1で成立します。既に $p_N\to p$ を示したので $F_N\to p$ が確率収束かつ概収束します。$\beta=0$ では $F_N=\log(2\cosh h)$ が常に確定しており、同じ結論です。
<!-- proof-end -->

この定理が証明するのは **極限が存在すること** であり、その値の閉形式ではありません。特に有限 $N$ の[overlap微分公式](#prop-sg3-pressure-derivative)から、極限の微分可能性や $\mathbb E\langle q_{12}^2\rangle$ の極限を自動的に結論してはいけません。その問題を次のSG4以降で扱います。

## 5. 何がREMと違い、何を次に調べるか

REMは異なる配置間の共分散が0でした。SKでは[SK Gaussian場の共分散とoverlap](#prop-sg3-covariance)により $q_N(\sigma,\tau)^2$ で相関が決まります。これにより、独立エネルギーの帯計数をそのまま流用できません。しかし、二レプリカのoverlapを追えば、相関構造をGaussian補間の式へ直接入れられます。

$h=0$ では全スピン反転でGibbs重みが変わらず、有限 $N$ の $\langle\sigma_i\rangle_J=0$ です。二レプリカは条件付き独立なので

$$
\langle q_{12}\rangle_J
=\frac1N\sum_i\langle\sigma_i\rangle_J^2=0.
$$

他方、二乗すると対角項が残り、

$$
\begin{aligned}
\langle q_{12}^2\rangle_J
&=\frac1{N^2}\sum_{i,j}
 \langle\sigma_i^1\sigma_j^1\sigma_i^2\sigma_j^2\rangle_J\\
&=\frac1{N^2}\sum_{i,j}\langle\sigma_i\sigma_j\rangle_J^2
\ge\frac1N.
\end{aligned}
$$

最後に $i=j$ の各項が1であることを使いました。従って $\langle q_{12}\rangle=0$ だけで「overlapが消えている」と判定できません。二乗平均や分布全体を見る必要があります。

次のSG4では、これらの量をどのように近似して自由エネルギーを計算しようとするのか、レプリカ対称性の仮定がどこで破れるのかを扱います。

## 演習問題

### Level A：定義を手で確かめる

**SG3-A1（配置間のSK共分散）**
- Level: A

$N=3$ の標準表示 $Y_3=3^{-1/2}\sum_{i<j}J_{ij}\sigma_i\sigma_j$ について、$\sigma=(+,+,+)$ と $\tau=(+,+,-)$ の $q_3$ を求め、$\mathbb E Y_3(\sigma)Y_3(\tau)$ を直接和から計算して[共分散公式](#prop-sg3-covariance)と照合せよ。

<!-- solution-start -->
**詳細解答**

三つのサイト積は $(+,+,-)$ なので $q_3=(1+1-1)/3=1/3$。結合ごとの積は $(1,2)$ が $+1$、$(1,3)$ と $(2,3)$ は $-1$ です。独立な標準正規変数の共分散は同じ添字だけ1となるので

$$
\mathbb E Y_3(\sigma)Y_3(\tau)
=\frac13(1-1-1)=-\frac13.
$$

公式でも $(3(1/3)^2-1)/2=(1/3-1)/2=-1/3$ です。共分散は負でもかまわず、full表示では同じ組の共分散は $3(1/3)^2/2=1/6$ となります。この違いは対角に加えた共通正規項の分散 $1/2$ です。
<!-- solution-end -->

**SG3-A2（overlapと不一致数）**
- Level: A

$\sigma,\tau\in\Sigma_6$ がちょうど二箇所で不一致のとき $q_6$ を求めよ。$\tau=-\sigma$ と $\tau=\sigma$ ではそれぞれどうなるか。$q_6^2$ だけでは区別できない組を述べよ。

<!-- solution-start -->
**詳細解答**

一致が4箇所、不一致が2箇所なので

$$
q_6=\frac{4-2}{6}=\frac13.
$$

$\tau=-\sigma$ なら全6箇所が不一致で $q_6=-1$、$\tau=\sigma$ なら全て一致して $q_6=1$。したがって後二者はいずれも $q_6^2=1$ です。二体相互作用は全スピン反転に不変なので、$q^2$ を使う共分散では区別できません。
<!-- solution-end -->

**SG3-A3（二スピンのGibbs平均）**
- Level: A

$N=2$、$h=0$、$a=\beta J/\sqrt2$ とし、$J$ を固定する。$\langle\sigma_1\sigma_2\rangle_J$ と $\langle q_{12}^2\rangle_J$ を求めよ。

<!-- solution-start -->
**詳細解答**

$\sigma_1\sigma_2=+1,-1$ のそれぞれに二配置あり、[分配関数](#def-sg3-sk)は $4\cosh a$ です。したがって

$$
\langle\sigma_1\sigma_2\rangle_J
=\frac{2e^a-2e^{-a}}{2e^a+2e^{-a}}=\tanh a.
$$

$q_{12}=(\sigma_1^1\sigma_1^2+\sigma_2^1\sigma_2^2)/2$ を二乗すると

$$
q_{12}^2=\frac14(1+1+
2\sigma_1^1\sigma_2^1\sigma_1^2\sigma_2^2).
$$

条件付き独立な二レプリカのため、積のGibbs平均は $\langle\sigma_1\sigma_2\rangle_J^2=\tanh^2 a$ です。従って

$$
\langle q_{12}^2\rangle_J=\frac12(1+\tanh^2a).
$$
<!-- solution-end -->

**SG3-A4（高温端点と圧力評価）**
- Level: A

任意の $N\ge1$、$h\in\mathbb R$ について $\beta=0$ の $Z_N,p_N$ を求めよ。[圧力評価](#prop-sg3-pressure-derivative)を $\beta=2$ へ代入して $p_N(2,h)$ の両側評価を示せ。

<!-- solution-start -->
**詳細解答**

$\beta=0$ ではサイトごとの外場だけが残るので

$$
Z_N(0,h)=\prod_{i=1}^N\sum_{s_i=\pm1}e^{hs_i}
=(e^h+e^{-h})^N=(2\cosh h)^N.
$$

従って $p_N(0,h)=\log(2\cosh h)$ です。[微分の上下界](#prop-sg3-pressure-derivative)を積分すると $\int_0^2 0\,d\gamma=0$、$\int_0^2\gamma/2\,d\gamma=1$ なので

$$
\log(2\cosh h)\le p_N(2,h)\le\log(2\cosh h)+1.
$$
<!-- solution-end -->

### Level B：仕組みを再導出する

**SG3-B1（部分積分と圧力微分）**
- Level: B

full表示 $X_N$ の共分散が $C_{\sigma\tau}=Nq_N^2/2$ であるとする。[SG2の重みの微分](../SG2/index.md#prop-sg2-gibbs-derivatives)と部分積分から $\partial_\beta p_N$ を再導出し、なぜ $0\le\partial_\beta p_N\le\beta/2$ か説明せよ。

<!-- solution-start -->
**詳細解答**

$w(\sigma)=e^{\beta X_N(\sigma)+h\sum_i\sigma_i}/Z_N$ と置くと

$$
\partial_\beta p_N=\frac1N\sum_\sigma\mathbb E[X_N(\sigma)w(\sigma)],\quad
\partial_{X_N(\tau)}w(\sigma)
=\beta w(\sigma)(\mathbf1_{\{\sigma=\tau\}}-w(\tau)).
$$

[共分散付き部分積分](../SG2/index.md#prop-sg2-correlated-ibp)で

$$
\begin{aligned}
\partial_\beta p_N
&=\frac\beta N\sum_{\sigma,\tau}C_{\sigma\tau}
\mathbb E[w(\sigma)(\mathbf1_{\{\sigma=\tau\}}-w(\tau))]\\
&=\frac\beta N\left(
\frac N2\sum_\sigma\mathbb Ew(\sigma)
-\frac N2\mathbb E\sum_{\sigma,\tau}w(\sigma)w(\tau)q_N(\sigma,\tau)^2
\right)\\
&=\frac\beta2(1-\mathbb E\langle q_{12}^2\rangle).
\end{aligned}
$$

全ての配置対で $0\le q_N^2\le1$、二レプリカの重みは非負で和1なので二乗の平均も $[0,1]$ に入り、両側の不等式が従います。
<!-- solution-end -->

**SG3-B2（ブロック補間の平方）**
- Level: B

$N_1,N_2\ge1$、$N=N_1+N_2$ とする。ブロックoverlap $u,v$ に対し、$Nq_N^2-N_1u^2-N_2v^2$ を平方で表し、等分散のGaussian補間の微分の符号と端点での意味を説明せよ。

<!-- solution-start -->
**詳細解答**

全系のoverlapは $q_N=(N_1u+N_2v)/N$。したがって

$$
\begin{aligned}
Nq_N^2-N_1u^2-N_2v^2
&=\frac{N_1^2u^2+2N_1N_2uv+N_2^2v^2}{N}
-N_1u^2-N_2v^2\\
&=-\frac{N_1N_2}{N}(u^2-2uv+v^2)
=-\frac{N_1N_2}{N}(u-v)^2.
\end{aligned}
$$

全系と分割系の共分散差は $\beta^2/2$ 倍で非正です。対角では $u=v=1$ なので差0。[補間微分公式](../SG2/index.md#thm-sg2-interpolation)に入れると

$$
\Psi'(t)=\frac{\beta^2N_1N_2}{4N}
\mathbb E\langle(u-v)^2\rangle_t\ge0.
$$

$t=0$ では分配関数が $Z_{N_1}Z_{N_2}$ に分解し、$t=1$ では全系の分配関数となります。積分すれば $\mathbb E\log Z_N\ge\mathbb E\log Z_{N_1}+\mathbb E\log Z_{N_2}$ です。
<!-- solution-end -->

**SG3-B3（集中から概収束まで）**
- Level: B

$N\ge2$ の標準SK模型で結合 $J_{ij}$ を変数とし、$\beta>0$ とする。圧力 $F_N$ の勾配ノルムを抑え、任意の $\varepsilon>0$ について尾確率の上界を与えよ。平均 $p_N$ が収束することを既知として、概収束へ至る手順を説明せよ。

<!-- solution-start -->
**詳細解答**

有限和の微分により

$$
\partial_{J_{ij}}F_N
=\frac{\beta}{N\sqrt N}\langle\sigma_i\sigma_j\rangle_J.
$$

$|\langle\sigma_i\sigma_j\rangle_J|\le1$ と結合数 $N(N-1)/2$ を使い

$$
\|\nabla F_N\|_2^2
\le\frac{\beta^2}{N^3}\frac{N(N-1)}2
=\frac{\beta^2(N-1)}{2N^2}\le\frac{\beta^2}{2N}.
$$

[Gaussian集中](../SG2/index.md#cor-sg2-pressure-concentration)を使うと

$$
\mathbb P(|F_N-p_N|\ge\varepsilon)
\le2e^{-N\varepsilon^2/\beta^2}.
$$

$N\ge M$ のうち一度でもずれる確率は和事象の上界で $\sum_{N\ge M}2e^{-N\varepsilon^2/\beta^2}$ 以下で、$M\to\infty$ で0です。従って各固定 $\varepsilon$ に対し十分大きい $N$ ではずれない事象の確率が1です。$\varepsilon=1/k$（$k\in\mathbb N$）の可算個について共通に成立させると $F_N-p_N\to0$ が概収束し、仮定した $p_N\to p$ と合わせて $F_N\to p$ です。異なる $N$ の結合の独立性は不要です。
<!-- solution-end -->

### Level C：定義・熱力学極限・有限系の検算を統合する

**SG3-C1（標準表示から熱力学極限へ）**
- Level: C

標準SK模型 $Z_N^{\mathrm{SK}}$ と、独立な $G_{ij}$ 全てを使った $X_N=(2N)^{-1/2}\sum_{i,j}G_{ij}\sigma_i\sigma_j$ を考え、$\beta\ge0$、$h\in\mathbb R$ とする。(a)両表示の関係を導け。(b)full表示の共分散をoverlapで示せ。(c)二ブロック補間を使って $a_N=\mathbb E\log Z_N$ の超加法性を導け。(d)圧力極限と試料圧力の確率収束を示し、(e) $\beta,h$ を固定した極限値の明示式を本章だけから計算したといえるか述べよ。

<!-- solution-start -->
**詳細解答**

(a) 対角と非対角を分けて

$$
X_N(\sigma)=\underbrace{\frac1{\sqrt{2N}}\sum_iG_{ii}}_{D_N}
+\frac1{\sqrt N}\sum_{i<j}\underbrace{\frac{G_{ij}+G_{ji}}{\sqrt2}}_{J'_{ij}}\sigma_i\sigma_j.
$$

$D_N\sim N(0,1/2)$ は $J'_{ij}\sim N(0,1)$ と独立です。従って $Z_N^{\mathrm{full}}=e^{\beta D_N}Z_N^{\mathrm{SK}}(J')$、$\mathbb E\log Z_N^{\mathrm{full}}=\mathbb E\log Z_N^{\mathrm{SK}}$ です。

(b) 各 $G_{ij}$ の独立性から

$$
\mathbb E[X_N(\sigma)X_N(\tau)]
=\frac1{2N}\sum_{i,j}\sigma_i\tau_i\sigma_j\tau_j
=\frac1{2N}(Nq_N)^2=\frac N2q_N^2.
$$

(c) $N=N_1+N_2$ とし、全系の $V=\beta X_N$ と、独立ブロックの和 $Y=\beta(X_{N_1}^{(1)}+X_{N_2}^{(2)})$ を補間します。$u=q_{12}^{(1)}$、$v=q_{12}^{(2)}$ とすると

$$
C^V_{\sigma\tau}-C^Y_{\sigma\tau}
=\frac{\beta^2}{2}\left[
\frac{(N_1u+N_2v)^2}{N}-N_1u^2-N_2v^2
\right]
=-\frac{\beta^2N_1N_2}{2N}(u-v)^2.
$$

対角では0なので、[Gaussian補間の微分公式](../SG2/index.md#thm-sg2-interpolation)から $\Psi'(t)=\beta^2N_1N_2(4N)^{-1}\mathbb E\langle(u-v)^2\rangle_t\ge0$。$t=1$ と $t=0$ の期待対数分配関数はそれぞれ $a_N$ と $a_{N_1}+a_{N_2}$ ですから、積分して $a_N\ge a_{N_1}+a_{N_2}$ です。

(d) [圧力の一様評価](#prop-sg3-pressure-derivative)によって $a_N/N$ は上から抑えられます。固定した $m$ について $n=km+r$（$0\le r<m$）とすると超加法性から $a_n\ge k a_m+a_r$。$a_r\ge r\log(2\cosh h)$ を使い $\liminf_n a_n/n\ge a_m/m$、$m$ で上限を取れば $\lim_n p_n=\sup_m p_m=:p$ です。さらに $F_N$ の結合に関する勾配の二乗は

$$
\sum_{i<j}\left(\frac\beta{N\sqrt N}
\langle\sigma_i\sigma_j\rangle\right)^2
\le\frac{\beta^2}{2N}.
$$

$\beta>0$ なら[Gaussian集中](../SG2/index.md#cor-sg2-pressure-concentration)により $\mathbb P(|F_N-p_N|\ge\varepsilon)\le2e^{-N\varepsilon^2/\beta^2}\to0$。$p_N\to p$ と三角不等式を組み合わせて $F_N\to p$ が確率収束します。$\beta=0$ は確定値です。

(e) **いえません**。極限の存在と $\log(2\cosh h)\le p\le\log(2\cosh h)+\beta^2/4$ は証明しましたが、一般の $\beta,h$ での値を決める等式はまだありません。[有限系の微分公式](#prop-sg3-pressure-derivative)の極限交換も未証明です。SG4以降ではoverlap分布の構造と変分原理を調べます。
<!-- solution-end -->
