# SG4 replica対称性・対称性の破れ

[SG3のSK模型](../SG3/index.md#def-sg3-sk)では、有限サイズの圧力と熱力学極限の存在を証明した。しかし、極限の**値**は分からなかった。圧力の微分は[overlap](../SG3/index.md#def-sg3-overlap)の二乗平均を含むため、エネルギーの平均だけでなく、同じ無秩序を使って取り出した二つの配置の関係を調べる必要がある。

本章では、まずレプリカ対称性（RS）が何を仮定するのかを、有限系のGibbs分布と区別する。次に[Gaussian補間](../SG2/index.md#thm-sg2-interpolation)で**厳密なRS試行上界**を証明し、その停留条件から自己整合方程式を導く。外場ゼロの高温領域では圧力の値まで証明する。一方、AT条件とレプリカ対称性の破れ（RSB）は、どこまでが近似模型の安定性計算で、どこからが未証明の物理的推論かを分けて学ぶ。

## 1. レプリカはコピーだが、無秩序は共有する

整数 $N\ge1$、逆温度 $\beta\ge0$、無次元の一様外場 $h\in\mathbb R$ を固定する。SG3の対角項付きGaussian場を用いる。

$$
X_N(\sigma)=\frac1{\sqrt{2N}}\sum_{i,j=1}^N G_{ij}\sigma_i\sigma_j,
\quad
Z_N=\sum_{\sigma\in\{-1,1\}^N}\exp\left(\beta X_N(\sigma)+h\sum_i\sigma_i\right).
$$

ここで $G_{ij}$ は互いに独立な標準正規変数である。[標準SK表示との同値性](../SG3/index.md#prop-sg3-representation)により、$N^{-1}\mathbb E\log Z_N$ は通常のSK模型と同じである。

無秩序 $G$ を固定したまま、Gibbs分布から独立に $\sigma^1,\ldots,\sigma^k$ を取り出す。これを $k$ 個の**レプリカ**と呼ぶ。レプリカ同士は条件付き独立だが、共有する $G$ を平均すると一般には独立にならない。

<a id="def-sg4-overlap-law"></a>

<!-- formal-statement-start -->
> **定義（レプリカoverlap分布）**  
> $N\ge1$、$\beta\ge0$、$h\in\mathbb R$ のSK模型について、二つの条件付き独立なGibbs標本 $\sigma^1,\sigma^2$ の重なり
>
$$
R_{12}=\frac1N\sum_{i=1}^N\sigma_i^1\sigma_i^2
$$
>
> を考える。$[-1,1]$ 上の確率測度 $\nu_N$ を、任意のBorel集合 $A$ に対して
>
$$
\nu_N(A)=\mathbb E\left\langle\mathbf1_{\{R_{12}\in A\}}\right\rangle
$$
>
> と置く。ここで $\langle\cdot\rangle$ は無秩序を固定した二レプリカGibbs平均、$\mathbb E$ は無秩序の平均である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg4-overlap-law -->
### 二配置だけの直接例

$N=1$、$\beta=0$ とするとスピン一個の確率は

$$
\mathbb P(\sigma=+1)=\frac{e^h}{2\cosh h}=:a,
\qquad
\mathbb P(\sigma=-1)=1-a.
$$

二回の標本が一致する確率は $a^2+(1-a)^2$、異なる確率は $2a(1-a)$。一致すれば $R_{12}=1$、異なれば $R_{12}=-1$ なので

$$
\nu_1=\{a^2+(1-a)^2\}\delta_1+2a(1-a)\delta_{-1}.
$$

**定義の確認**：$a\in[0,1]$ なので両原子の係数は非負であり、$a^2+(1-a)^2+2a(1-a)=(a+1-a)^2=1$。したがって定義どおり $[-1,1]$ 上の確率測度になっている。**有限系でoverlapが二値を取るだけでは、熱力学極限でのRSBを証明したことにならない。**
<!-- definition-example-end -->

外場 $h=0$ の場合、相互作用は $\sigma\mapsto-\sigma$ で不変である。固定した無秩序の下でも二番目のレプリカを一斉反転すると $R_{12}\mapsto-R_{12}$ で重みは変わらない。従って $\nu_N(A)=\nu_N(-A)$ となる。この**全反転対称性**と、「純粋状態の対称性が破れる」というRSBの言葉は同義ではない。符号の問題が邪魔なときは $|R_{12}|$ の分布を用いる。

### 「レプリカ法」と実際のレプリカ標本

統計物理でよく使う形式的操作は

$$
\mathbb E\log Z_N
=\left.\frac{d}{dn}\mathbb E Z_N^n\right|_{n=0}
$$

である。実際に $n$ を0の近傍の実数として微分でき、期待値と微分を交換できる条件を確認して初めて等式になる。**正の整数 $n$ で $\mathbb E Z_N^n$ を計算しただけでは、$n=0$ の周囲の非整数への延長も極限交換も正当化されない。** 以下ではこの形式操作に依存せず、実数パラメータを持つGaussian補間を直接用いる。

## 2. RS試行式を上界として導く

平均場近似では、各サイトが多数の結合の総和で作られる有効Gaussian場を見る、と考える。二つのレプリカの典型的な重なりを一つの数 $q\in[0,1]$ で表すのがRSの発想である。ただし、この時点では**極限overlapが一点へ集中するとも、圧力が試行式に等しいとも仮定しない**。

定数 $q\in[0,1]$、独立な標準正規変数 $z_1,\ldots,z_N$ を導入し、$G$ とも独立に取る。補間の指数を

$$
Y_t(\sigma)=\beta\sqrt t\,X_N(\sigma)
+\beta\sqrt{1-t}\sqrt q\sum_{i=1}^Nz_i\sigma_i
+h\sum_{i=1}^N\sigma_i,\quad 0\le t\le1
$$

とし、$\phi_N(t)=N^{-1}\mathbb E\log\sum_\sigma e^{Y_t(\sigma)}$ と置く。共分散を全て書くと

$$
C_t(\sigma,\tau)
=t\frac{\beta^2N}{2}R(\sigma,\tau)^2
+(1-t)\beta^2NqR(\sigma,\tau).
$$

対角では $R(\sigma,\sigma)=1$ であり、$t=0$ では各サイトの和へ因数分解できる。これらが計算の二つの入口である。

<a id="def-sg4-rs-functional"></a>

<!-- formal-statement-start -->
> **定義（RS試行圧力）**  
> $\beta\ge0$、$h\in\mathbb R$、$q\in[0,1]$、$Z\sim N(0,1)$ とし、次の有限な関数をRS試行圧力とする。
>
$$
\mathcal P_{\mathrm{RS}}(q;\beta,h)
=\log2+\mathbb E_Z\log\cosh(\beta\sqrt q\,Z+h)
+\frac{\beta^2}{4}(1-q)^2.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg4-rs-functional -->
### 高温端点を試す

$q=0$ なら $\mathbb E_Z\log\cosh h=\log\cosh h$ である。従って

$$
\mathcal P_{\mathrm{RS}}(0;\beta,h)
=\log(2\cosh h)+\frac{\beta^2}{4}.
$$

$\beta=0$ では $q$ に依存せず $\log(2\cosh h)$ となり、相互作用が消えた分配関数 $Z_N=(2\cosh h)^N$ と一致する。**定義の確認**：試行式の三項を個別に代入したもので、$q=0$ では補正項が $\beta^2/4$、$\beta=0$ ではGaussian場の項も補正項も消える。
<!-- definition-example-end -->

<a id="thm-sg4-rs-bound"></a>

<!-- formal-statement-start -->
> **定理（有限サイズRS補間恒等式と上界）**  
> $N\ge1$、$\beta\ge0$、$h\in\mathbb R$、$q\in[0,1]$ に対し、上記の補間の二レプリカGibbs平均を $\langle\cdot\rangle_t$ とすると
>
$$
p_N(\beta,h)
=\mathcal P_{\mathrm{RS}}(q;\beta,h)
-\frac{\beta^2}{4}\int_0^1
\mathbb E\left\langle(R_{12}-q)^2\right\rangle_t\,dt.
$$
>
> 特に全ての $N$ で $p_N(\beta,h)\le\mathcal P_{\mathrm{RS}}(q;\beta,h)$。従って[SG3で存在を証明した極限](../SG3/index.md#thm-sg3-pressure-limit)は
>
$$
p(\beta,h)\le\inf_{0\le q\le1}\mathcal P_{\mathrm{RS}}(q;\beta,h)
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$X_N$ の共分散が $NR^2/2$、サイトごとの有効場の共分散が $NqR$ であることを使う。二つの共分散の差を**対角と二レプリカ部分の両方に代入**すると平方 $(R-q)^2$ が現れる。積分項が非負であることが厳密な上界を与える。

<!-- proof-start -->
### 証明

[Gaussian補間の微分公式](../SG2/index.md#thm-sg2-interpolation)を、重みのランダム部分を $Y_t-h\sum_i\sigma_i$ として適用する。導出済みの共分散から

$$
\partial_tC_t(\sigma,\tau)
=\frac{\beta^2N}{2}R(\sigma,\tau)^2-\beta^2NqR(\sigma,\tau).
$$

一配置では $R(\sigma,\sigma)=1$ なので

$$
\frac1{2N}\partial_tC_t(\sigma,\sigma)
=\frac{\beta^2}{4}(1-2q).
$$

二レプリカには

$$
\frac1{2N}\mathbb E\langle
\partial_tC_t(\sigma^1,\sigma^2)\rangle_t
=\frac{\beta^2}{4}\mathbb E\langle R_{12}^2-2qR_{12}\rangle_t.
$$

よって二式の差を取ると

$$
\begin{aligned}
\phi_N'(t)
&=\frac{\beta^2}{4}
\left(1-2q-\mathbb E\langle R_{12}^2-2qR_{12}\rangle_t\right)\\
&=\frac{\beta^2}{4}
\left((1-q)^2-\mathbb E\langle(R_{12}-q)^2\rangle_t\right).
\end{aligned}
$$

$t=0$ ではスピンの和を各サイトで先に実行し、

$$
\sum_{\sigma}e^{Y_0(\sigma)}
=\prod_{i=1}^N2\cosh(\beta\sqrt q\,z_i+h),
\quad
\phi_N(0)=\log2+\mathbb E_Z\log\cosh(\beta\sqrt q\,Z+h).
$$

$t=1$ では $Y_1=\beta X_N+h\sum_i\sigma_i$ なので $\phi_N(1)=p_N(\beta,h)$。$\phi_N(1)-\phi_N(0)=\int_0^1\phi_N'(t)\,dt$ に代入して恒等式を得る。有限和とGaussian積分では微分を正当化できる（導関数はGaussian変数の可積分な多項式で抑えられる）。最後の項は非負であり、$N$ に依存しない上界を得る。$\mathcal P_{\mathrm{RS}}$ は $[0,1]$ 上連続なので、その下限は実現される。
<!-- proof-end -->

**重要な区別**：この定理はRS試行式が上界であることを証明したのであって、一般の $(\beta,h)$ で等号を証明していない。等号なら補間全体にわたりoverlapの二乗誤差が消える必要がある。反対に、補正項が残る領域ではRS試行圧力をそのまま自由エネルギーと同一視できない。

## 3. 停留条件と自己整合方程式はどう生まれるか

試行式を最小化するには $q$ で微分する。ここで熱力学極限の微分ではなく、**すでに具体式で与えた $q$ の関数**を微分しているだけである。$q>0$ として、$u=\beta\sqrt q\,Z+h$ なら

$$
\frac{d}{dq}\mathbb E_Z\log\cosh u
=\frac{\beta}{2\sqrt q}\mathbb E_Z[Z\tanh u].
$$

標準正規変数に対する[Gaussian部分積分](../SG2/index.md#prop-sg2-correlated-ibp)を $f(z)=\tanh(\beta\sqrt q\,z+h)$ へ適用する。導関数は $f'(z)=\beta\sqrt q\,\operatorname{sech}^2(\beta\sqrt q\,z+h)$ なので

$$
\mathbb E_Z[Z\tanh u]
=\beta\sqrt q\,\mathbb E_Z\operatorname{sech}^2u.
$$

したがって、$\operatorname{sech}^2u=1-\tanh^2u$ を使い

$$
\begin{aligned}
\mathcal P_{\mathrm{RS}}'(q)
&=\frac{\beta^2}{2}\mathbb E_Z\operatorname{sech}^2u
-\frac{\beta^2}{2}(1-q)\\
&=\frac{\beta^2}{2}\left(q-\mathbb E_Z\tanh^2(\beta\sqrt q\,Z+h)\right).
\end{aligned}
$$

$q=0$ でも右微分として同じ式が成立する。$\beta=0$ では試行式が一定であり、以下の停留条件による選択はできない。

<a id="prop-sg4-self-consistency"></a>

<!-- formal-statement-start -->
> **命題（RS試行式の停留条件）**  
> $\beta>0$、$h\in\mathbb R$ とし、$q\in(0,1)$ が $\mathcal P_{\mathrm{RS}}(\,\cdot\,;\beta,h)$ の内部停留点ならば
>
$$
q=\mathbb E_Z\tanh^2(\beta\sqrt q\,Z+h).
$$
>
> また右辺を $T_{\beta,h}(q)$ と書くと、$T_{\beta,h}$ は $[0,1]$ 上連続で、$h\ne0$ の場合には少なくとも一つの固定点が $(0,1)$ に存在する。$h=0$ の場合、$q=0$ は常に固定点である。$\beta>1,h=0$ なら正の固定点も存在する。
<!-- formal-statement-end -->

### 証明の見取り図

前半は微分公式で直ちに従う。後半は固定点写像の両端での符号を調べ、[中間値定理](../../../基礎科目/RA/RA2/index.md#thm-ra2-ivt)を用いる。**固定点の存在は、その点で真のSK圧力とRS試行圧力が一致することを意味しない。**

<!-- proof-start -->
### 証明

$T_{\beta,h}$ の連続性は $\tanh^2$ の連続性と上界1による優収束から従う。$h\ne0$ なら

$$
T_{\beta,h}(0)=\tanh^2h>0.
$$

一方、有限の $\beta,h$ では全ての実数 $u$ に対し $\tanh^2u<1$ なので $T_{\beta,h}(1)<1$。従って連続関数 $T(q)-q$ は $q=0$ で正、$q=1$ で負となり、内部に零点を持つ。

$h=0$ なら $T_{\beta,0}(0)=0$ である。$\beta>1$ のとき正規変数 $Z$ について

$$
\frac{T_{\beta,0}(q)}q
=\mathbb E_Z\left[
\beta^2Z^2
\left\{\frac{\tanh(\beta\sqrt q\,Z)}
{\beta\sqrt q\,Z}\right\}^{\!2}\right]
\longrightarrow\beta^2>1
\quad(q\downarrow0).
$$

$Z=0$ では波括弧を1と定める。$\lvert\tanh x\rvert\le\lvert x\rvert$ のため積分関数は $\beta^2Z^2$ で抑えられる。よって十分小さい正の $q$ では $T(q)>q$。一方 $T(1)<1$ なので、同じ[中間値定理](../../../基礎科目/RA/RA2/index.md#thm-ra2-ivt)を区間 $[q,1]$ へ適用して、その内部に固定点がある。内部停留点については直前に導いた $\mathcal P_{\mathrm{RS}}'$ の式へ0を代入すればよい。
<!-- proof-end -->

### $q=0$ の近くで何が起きるか

$h=0$、$q\downarrow0$ において $\tanh x=x+O(x^3)$ を正規平均へ入れると

$$
T_{\beta,0}(q)=\beta^2q+O(q^2),
\qquad
\mathcal P_{\mathrm{RS}}'(q)
=\frac{\beta^2}{2}(1-\beta^2)q+O(q^2).
$$

従って $\beta>1$ では $q=0$ はRS試行式の片側局所最大であり、正の固定点へ向かう動機が現れる。$\beta<1$ なら $q=0$ は片側局所最小である。$\beta=1$ はこの一次判定の境界である。ここでの「安定」は試行式の局所的な形の話であり、真のGibbs状態の安定性とは分ける。

## 4. RS上界が実際に等号になる高温領域

上界が得られただけでは試行式の正しさは保証されない。だが外場ゼロ、$\beta\le1$ なら、二次モーメントと集中を組み合わせて一致を証明できる。これは近似ではない。

<a id="thm-sg4-high-temperature"></a>

<!-- formal-statement-start -->
> **定理（外場ゼロのSK高温圧力）**  
> 標準SK模型またはその対角項付きfull表示について、$h=0$、$0\le\beta\le1$ なら
>
$$
\lim_{N\to\infty}\frac1N\mathbb E\log Z_N
=\log2+\frac{\beta^2}{4}
=\mathcal P_{\mathrm{RS}}(0;\beta,0).
$$
>
> さらに $0<\beta<1$ では
>
$$
\lim_{N\to\infty}\mathbb E\langle R_{12}^2\rangle_{\beta,0}=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず $\mathbb EZ_N$ はGaussian指数の期待値として厳密に計算できる。$\mathbb EZ_N^2/(\mathbb EZ_N)^2$ を一様に抑えると、$Z_N$ が平均の一定割合以上になる確率が $N$ によらず正に抑えられる。[Gaussian集中](../SG2/index.md#cor-sg2-pressure-concentration)で $N^{-1}\log Z_N$ は期待値の近くへ集まるので、その期待値はannealed値に近づく。最後に[quenched圧力の微分とoverlap](../SG3/index.md#prop-sg3-pressure-derivative)を適用し、overlapの二乗平均が0へ行くことを導く。

<!-- proof-start -->
### 証明

計算のしやすいfull表示を使う。各配置で $\operatorname{Var}(X_N(\sigma))=N/2$ なので、標準正規の指数モーメントから

$$
\mathbb EZ_N
=\sum_{\sigma}\exp\left(\frac{\beta^2}{2}\frac N2\right)
=2^Ne^{\beta^2N/4}.
$$

二配置の共分散は[SK Gaussian場の共分散とoverlap](../SG3/index.md#prop-sg3-covariance)により $N R(\sigma,\tau)^2/2$。したがって

$$
\begin{aligned}
\mathbb EZ_N^2
&=\sum_{\sigma,\tau}
\exp\left(\frac{\beta^2}{2}
\operatorname{Var}(X_N(\sigma)+X_N(\tau))\right)\\
&=e^{\beta^2N/2}\sum_{\sigma,\tau}
\exp\left(\frac{\beta^2N}{2}R(\sigma,\tau)^2\right).
\end{aligned}
$$

$\sigma,\tau$ を一様独立に取ると $S_N=NR(\sigma,\tau)$ は独立なRademacher変数 $U_i$ の和 $\sum_iU_i$ と同分布になる。従って

$$
\frac{\mathbb EZ_N^2}{(\mathbb EZ_N)^2}
=\mathbb E_U\exp\left(\frac{\beta^2S_N^2}{2N}\right).
$$

新しい標準正規 $z$ を独立に取って指数モーメントを使うと

$$
\begin{aligned}
\mathbb E_U e^{\beta^2S_N^2/(2N)}
&=\mathbb E_{U,z}e^{(\beta/\sqrt N)zS_N}\\
&=\mathbb E_z\left[\cosh\left(\frac{\beta z}{\sqrt N}\right)\right]^N\\
&\le\mathbb E_ze^{\beta^2z^2/2}
=\frac1{\sqrt{1-\beta^2}},
\end{aligned}
$$

ここでは $x\ge0$ で $(x^2/2-\log\cosh x)'=x-\tanh x\ge0$、両関数は偶関数であるため $\cosh x\le e^{x^2/2}$ を使った。最後のGaussian積分は標準正規密度へ $e^{\beta^2z^2/2}$ を掛け、$(1-\beta^2)$ 倍の二次係数を持つGaussian積分へ帰着させたもので、$0\le\beta<1$ に限り有限となる。$W_N=Z_N/\mathbb EZ_N$ は非負で $\mathbb EW_N=1$。Cauchy–Schwarz不等式を事象 $A_N=\{W_N\ge1/2\}$ に適用すると

$$
1=\mathbb E[W_N\mathbf1_{A_N}]
+\mathbb E[W_N\mathbf1_{A_N^c}]
\le\sqrt{\mathbb EW_N^2\,\mathbb P(A_N)}+\frac12.
$$

したがって

$$
\mathbb P(A_N)\ge\frac1{4\mathbb EW_N^2}
\ge\frac{\sqrt{1-\beta^2}}4=:c_\beta>0.
$$

一方、$F_N=N^{-1}\log Z_N$ はfull表示の $N^2$ 個の $G_{ij}$ に対して

$$
\frac{\partial F_N}{\partial G_{ij}}
=\frac{\beta}{N\sqrt{2N}}\langle\sigma_i\sigma_j\rangle,
\qquad
\sum_{i,j}\left(\frac{\partial F_N}{\partial G_{ij}}\right)^2
\le\frac{\beta^2}{2N}.
$$

よって[Gaussian集中の評価](../SG2/index.md#cor-sg2-pressure-concentration)を代入すると、$\beta>0$ で

$$
\mathbb P(|F_N-p_N|\ge\varepsilon)
\le2\exp\left(-\frac{N\varepsilon^2}{\beta^2}\right).
$$

ここで $a_\beta=\log2+\beta^2/4$ と置けば、事象 $A_N$ 上で

$$
F_N=\frac1N\log Z_N\ge
\frac1N\log\mathbb EZ_N-\frac{\log2}N
=a_\beta-\frac{\log2}N.
$$

[annealed圧力とquenched圧力の比較](../SG1/index.md#prop-sg1-jensen)から $p_N\le a_\beta$。もしある $\varepsilon>0$ と部分列で $p_N\le a_\beta-2\varepsilon$ なら、十分大きい $N$ に対し $A_N$ 上で $F_N-p_N\ge\varepsilon$ となる。したがって確率は $c_\beta$ 以上だが、上の集中評価では0へ収束する。矛盾するので $p_N\to a_\beta$。$\beta=0$ は $Z_N=2^N$ で直接成立する。

端点 $\beta=1$ は二次モーメント評価を直接使えない。[quenched圧力の微分とoverlap](../SG3/index.md#prop-sg3-pressure-derivative)から、$h=0$ において

$$
p_N'(\beta,0)
=\frac{\beta}{2}\left(1-\mathbb E\langle R_{12}^2\rangle\right)
\ge0.
$$

従って $0<\beta_0<1$ なら $p_N(1,0)\ge p_N(\beta_0,0)$ であり、$N\to\infty$ の後 $\beta_0\uparrow1$ とすると下界 $\log2+1/4$ が得られる。上界は[RS補間上界](#thm-sg4-rs-bound)を $q=0$ として適用すれば同じ値なので一致する。

最後に $0<\beta<1$ を固定する。有限和の対数を二回微分すると、同じ無秩序のGibbs平均で

$
p_N''(\beta,0)=\frac1N\mathbb E\left[
\langle X_N^2\rangle_\beta-\langle X_N\rangle_\beta^2
\right]\ge0
$

となる（括弧内は確率重み付き分散）。従って $p_N'$ は非減少である。任意の小さい $\delta>0$ に対し導関数の単調性は

$$
\frac{p_N(\beta,0)-p_N(\beta-\delta,0)}{\delta}
\le p_N'(\beta,0)
\le\frac{p_N(\beta+\delta,0)-p_N(\beta,0)}{\delta}
$$

を与える。$\beta\pm\delta\in(0,1)$ に取り、$N\to\infty$ で既に証明した $p_N\to\log2+\beta^2/4$ を代入し、その後 $\delta\downarrow0$ とすれば $p_N'(\beta,0)\to\beta/2$。微分公式の両辺を比較して $\mathbb E\langle R_{12}^2\rangle\to0$ を得る。
<!-- proof-end -->

**ここでの結論**は、外場ゼロ・$0<\beta<1$ において二レプリカのoverlapが二乗平均で0へ収束すること、したがって $R_{12}$ が確率でも0へ近づくことである。$\beta>1$ や外場ありの場合には、この証明の二次モーメント評価はそのまま使えない。評価が発散するというだけで、RSBの成立まで証明されたわけではない。

## 5. AT条件：自己整合解を揺らしたらどうなるか

RS自己整合方程式は一つの数 $q$ を決める候補だが、**候補解が微小な摂動に耐えるか**は別の問いである。物理的には、多数の弱い結合から有効場を作り、応答を別のサイトへ伝えるcavity型の近似を使う。この近似を有限$N$のSK模型の厳密恒等式と混同しない。

有効場 $u=\beta\sqrt q\,Z+h$ に対し、サイト磁化の近似を $m=\tanh u$ とする。ここに小さい追加場 $\eta$ を入れると一階の応答は

$$
\tanh(u+\eta)-\tanh u
=\operatorname{sech}^2(u)\eta+O(\eta^2)
$$

となる。仮に、独立な微小摂動が各結合を介して $N$ 本足し合わされ、次の場の摂動が

$$
\eta_i^{\mathrm{new}}
=\frac{\beta}{\sqrt N}\sum_{j=1}^N J_{ij}
\operatorname{sech}^2(u_j)\eta_j
$$

で近似できるとする。ここで $J_{ij}$ は平均0、分散1で、摂動と独立な結合として**近似的に扱う**。$\eta_j$ が独立で平均0・分散 $v$、$u_j$ が同一の有効場分布を持つと仮定すると、交差項の平均が消え、

$$
\begin{aligned}
\mathbb E(\eta_i^{\mathrm{new}})^2
&=\frac{\beta^2}{N}\sum_j
\mathbb EJ_{ij}^2\,
\mathbb E\operatorname{sech}^4(u_j)\,\mathbb E\eta_j^2\\
&=\beta^2\mathbb E_Z\operatorname{sech}^4(\beta\sqrt q\,Z+h)\,v.
\end{aligned}
$$

つまり、分散が一段で何倍になるかを計算できる。厳密なSK模型では場・結合・摂動の依存がこの単純な独立性を必ずしも満たさない。ここでの計算は**指定した線形応答近似の下での結論**である。

<a id="def-sg4-at-parameter"></a>

<!-- formal-statement-start -->
> **定義（RS線形応答のATパラメータ）**  
> $\beta\ge0$、$h\in\mathbb R$、$q\in[0,1]$ に対し
>
$$
\lambda_{\mathrm{AT}}(q;\beta,h)
=\beta^2\mathbb E_Z\operatorname{sech}^4(\beta\sqrt q\,Z+h)
$$
>
> と置く。上記の独立摂動・線形応答近似では、分散増幅率は $\lambda_{\mathrm{AT}}$ である。$\lambda_{\mathrm{AT}}<1$ はこの近似の減衰条件、$\lambda_{\mathrm{AT}}>1$ は増幅条件、$\lambda_{\mathrm{AT}}=1$ は一次判定の境界である。これをAT（de Almeida–Thouless）判定と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg4-at-parameter -->
### 判定の最小例

$h=0,q=0$ では $u=0$、$\operatorname{sech}^4(0)=1$ だから $\lambda_{\mathrm{AT}}=\beta^2$。$\beta=1/2$ なら $1/4<1$、$\beta=2$ なら $4>1$ である。**定義の確認**：$q=h=0$ を定義式へ代入した結果は $\beta^2\mathbb E_Z[1]=\beta^2$ であり、$0\le\lambda_{\mathrm{AT}}\le\beta^2$ の上端を実現する。これは零解に対する近似的な判定であり、$\beta=2$ の**非零の自己整合解のAT値を計算したことにはならない**。
<!-- definition-example-end -->

AT条件を物理学で「repliconの安定性条件」と解釈するには、RS鞍点に対する適切な揺らぎ方向を定義し、二次変分を評価する必要がある。本章の分散増幅の計算はその動機を再現するが、真のSK圧力がRS値と異なること、あるいは特定の領域でRSBが成立することの**厳密証明ではない**。その区別はSG5・SG6のoverlap恒等式と変分理論を学ぶ際に重要になる。

## 6. RSBは「同じoverlap値」という単純化を超える

RSの描像では、状態を記述するための重なりパラメータを一つの典型値で代表させる。一方、多数の巨視的状態の間では、同じ状態から引いた二つの標本と異なる状態から引いた二つの標本でoverlapが変わり得る。そのような**複数のoverlap尺度**を残す描像がRSBの出発点となる。

説明のため、有限個の巨視的状態をラベル $\alpha\in\{1,\ldots,K\}$ で表し、選択重み $w_\alpha>0$、$\sum_\alpha w_\alpha=1$ とする。同じラベル同士の重なりを $q_1$、異なるラベル同士を $q_0$ と近似する。これはSK模型の有限$N$から自動的に導かれる構造ではなく、overlap階層の**模型例**である。

<a id="def-sg4-two-level-rsb"></a>

<!-- formal-statement-start -->
> **定義（二水準のoverlap混合模型）**  
> $K\ge2$、$w_\alpha>0$、$\sum_{\alpha=1}^K w_\alpha=1$、$-1\le q_0<q_1\le1$ とする。独立に選んだ二つの状態ラベルが一致したら重なり $q_1$、異なれば $q_0$ とする。このとき重なり分布は
>
$$
\nu^{(2)}
=\left(\sum_{\alpha=1}^K w_\alpha^2\right)\delta_{q_1}
+\left(1-\sum_{\alpha=1}^K w_\alpha^2\right)\delta_{q_0}
$$
>
> である。このような複数の重なり水準を持つ模型は、一段階RSB（1RSB）描像の最小の代数的例となる。ただしこれだけでParisiの1RSB解を定義したことにはならない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg4-two-level-rsb -->
### 重みを代入して直接確認する

$K=2$、$w_1=1/3$、$w_2=2/3$、$q_0=0$、$q_1=3/4$ とすると、ラベル一致確率は

$$
w_1^2+w_2^2=\frac19+\frac49=\frac59,
$$

異なる確率は $2w_1w_2=4/9$。従って

$$
\nu^{(2)}=\frac59\delta_{3/4}+\frac49\delta_0,
\qquad
\int r^2\,\nu^{(2)}(dr)=\frac59\left(\frac34\right)^2=\frac5{16}.
$$

**定義の確認**：$5/9+4/9=1$ かつ両係数は正なので $\nu^{(2)}$ は確率測度であり、二乗平均も定義式から $5/16$ と一致する。$q_0<q_1$ なので二水準は区別できる。有限系にこのような混合分布が一度現れただけでは、無限サイズでRSB相が成立するとはいえない。
<!-- definition-example-end -->

多段階の描像では、状態をさらに下位集団へ分けることを繰り返す。どの三つの状態も階層的な重なりを満たすか、無限系でどの分布が実現するかは、次章のGhirlanda–Guerra恒等式・ultrametricityと、その後のParisi変分原理の問題となる。

ここまでで証明したのは**RS試行式の上界と高温での等号**であり、ATの式は指定した近似における増幅率、二水準模型はRSBの幾何的イメージを数え上げる例である。三者の証明の強さが異なることを押さえてから演習へ進む。

## 演習問題

### Level A：式の意味を確認する

**SG4-A1（無相互作用のoverlapは一点分布か）**
- Level: A

$N=2$、$\beta=h=0$ とする。二つの独立な一様配置について $R_{12}$ の取り得る値と確率をすべて求めよ。$\mathbb ER_{12}$ と $\mathbb ER_{12}^2$ を計算し、[overlap分布](#def-sg4-overlap-law)を明記せよ。

<!-- solution-start -->
**詳細解答**

各サイトの積 $U_i=\sigma_i^1\sigma_i^2$ は独立なRademacher変数であり、$R_{12}=(U_1+U_2)/2$。$U_1=U_2=1$ の確率は $1/4$、$U_1=U_2=-1$ も $1/4$、異符号が $1/2$ なので

$$
\nu_2=\frac14\delta_{-1}+\frac12\delta_0+\frac14\delta_1.
$$

従って $\mathbb ER_{12}=(-1)/4+1/4=0$、

$$
\mathbb ER_{12}^2=\frac14\cdot1+\frac12\cdot0+\frac14\cdot1=\frac12.
$$

有限$N$で多点分布でも、高温極限で二乗平均が0へ収束することと矛盾しない。
<!-- solution-end -->

**SG4-A2（RS試行圧力の端点と符号）**
- Level: A

任意の $\beta\ge0,h\in\mathbb R$ について[RS試行圧力](#def-sg4-rs-functional)の $q=0,1$ の値を書け。$h=0$ で両者の差を簡単化せよ。$q=0$ で得る上界がannealed圧力に一致する理由を述べよ。

<!-- solution-start -->
**詳細解答**

定義に代入すると

$$
\mathcal P_{\mathrm{RS}}(0)=\log(2\cosh h)+\frac{\beta^2}{4},
\qquad
\mathcal P_{\mathrm{RS}}(1)=\log2+\mathbb E_Z\log\cosh(\beta Z+h).
$$

$h=0$ では $\mathcal P_{\mathrm{RS}}(0)-\mathcal P_{\mathrm{RS}}(1)=\beta^2/4-\mathbb E_Z\log\cosh(\beta Z)$ となる。$\mathcal P_{\mathrm{RS}}(0)$ は $\log\mathbb EZ_N/N$ と同じである。なぜなら $h$ の寄与は $\sum_\sigma e^{h\sum_i\sigma_i}=(2\cosh h)^N$ へ因数分解され、$\operatorname{Var}(X_N(\sigma))=N/2$ より各配置のGaussian指数平均は $e^{\beta^2N/4}$ だからである。
<!-- solution-end -->

**SG4-A3（共分散差の平方完成）**
- Level: A

[RS補間](#thm-sg4-rs-bound)で $\partial_tC_t(\sigma,\tau)/N=\beta^2(R^2/2-qR)$ を用いる。対角項と二レプリカ項の差を計算し、$\phi_N'(t)$ を $(R_{12}-q)^2$ で表せ。$q=1$ の場合も符号の結論は変わるか。

<!-- solution-start -->
**詳細解答**

対角 $R(\sigma,\sigma)=1$ を入れると $\partial_tC_t(\sigma,\sigma)/N=\beta^2(1/2-q)$。二レプリカでは $\partial_tC_t(\sigma^1,\sigma^2)/N=\beta^2(R_{12}^2/2-qR_{12})$。従って[Gaussian補間の微分公式](../SG2/index.md#thm-sg2-interpolation)の $1/2$ 倍を掛けて

$$
\begin{aligned}
\phi_N'(t)
&=\frac{\beta^2}{4}\left(1-2q-\mathbb E\langle R_{12}^2-2qR_{12}\rangle_t\right)\\
&=\frac{\beta^2}{4}\left((1-q)^2-\mathbb E\langle(R_{12}-q)^2\rangle_t\right).
\end{aligned}
$$

$q=1$ なら第一項は0だから $\phi_N'(t)=-(\beta^2/4)\mathbb E\langle(R_{12}-1)^2\rangle_t\le0$。一般には微分の符号自体は固定されないが、**積分したときのRS上界**は全ての $q$ で成立する。
<!-- solution-end -->

**SG4-A4（自己整合方程式と境界点）**
- Level: A

$h=0$ で $T_{\beta,0}(0)$、$\lim_{q\downarrow0}T_{\beta,0}(q)/q$ を計算せよ。$\beta>1$ なら正の固定点がある理由を示し、$\beta=0$ のとき停留方程式から試行式の最小点を一意に決められるか答えよ。

<!-- solution-start -->
**詳細解答**

$\tanh0=0$ から $T_{\beta,0}(0)=0$。$q>0$ では $T(q)/q=\mathbb E_Z[\beta^2Z^2(\tanh(\beta\sqrt q Z)/(\beta\sqrt q Z))^2]$。$\lvert\tanh x\rvert\le\lvert x\rvert$ で抑え、$q\downarrow0$ の極限を取ると $\beta^2\mathbb EZ^2=\beta^2$。$\beta>1$ なら小さい $q>0$ で $T(q)>q$、$T(1)<1$ なので[中間値定理](../../../基礎科目/RA/RA2/index.md#thm-ra2-ivt)で正の固定点がある。

$\beta=0$ では $\mathcal P_{\mathrm{RS}}(q;0,h)=\log(2\cosh h)$ が全ての $q$ で一定である。微分公式は恒等的に0で、$\beta^2$ で割って固定点条件を導いてはならない。
<!-- solution-end -->

### Level B：上界・二次モーメント・安定性を接続する

**SG4-B1（full表示の二次モーメント：一サイトで検算）**
- Level: B

$N=1,h=0$ のfull表示では $X_1(\sigma)=G_{11}/\sqrt2$ が配置に依存しない。$\mathbb EZ_1$ と $\mathbb EZ_1^2$ から比を計算し、第4節の $S_N$ 表示と照合せよ。$0<\beta<1$ における二次モーメント上界とも比較せよ。

<!-- solution-start -->
**詳細解答**

$Z_1=2e^{\beta G_{11}/\sqrt2}$ だから標準正規の指数モーメントを用いて

$$
\mathbb EZ_1=2e^{\beta^2/4},
\qquad
\mathbb EZ_1^2=4e^{\beta^2}.
$$

従って比は $4e^{\beta^2}/(4e^{\beta^2/2})=e^{\beta^2/2}$。一サイトでは $S_1=U_1=\pm1$ なので

$$
\mathbb E_Ue^{\beta^2S_1^2/2}=e^{\beta^2/2}
$$

と一致する。$0<\beta<1$ なら第4節の $\cosh x\le e^{x^2/2}$ から $e^{\beta^2/2}\le(1-\beta^2)^{-1/2}$。実際、対数を取れば $\beta^2/2\le-\tfrac12\log(1-\beta^2)$ で、$-\log(1-x)\ge x$ により従う。
<!-- solution-end -->

**SG4-B2（固定確率の下界からquenched圧力へ）**
- Level: B

$0<\beta<1$ とし $\mathbb EZ_N^2/(\mathbb EZ_N)^2\le C_\beta$、かつ $\mathbb P(|F_N-p_N|>\varepsilon)\to0$ とする。$\mathbb EZ_N=e^{Na_\beta}$ を使い、$p_N\to a_\beta$ を示せ。なぜ二次モーメント上界だけから直ちに結論できないのか説明せよ。

<!-- solution-start -->
**詳細解答**

$W_N=Z_N/\mathbb EZ_N$ と置く。$A_N=\{W_N\ge1/2\}$ に対して

$$
1\le\sqrt{\mathbb EW_N^2\,\mathbb P(A_N)}+\frac12
$$

なので $\mathbb P(A_N)\ge1/(4C_\beta)$。$A_N$ 上で $F_N\ge a_\beta-(\log2)/N$ である。[quenchedとannealed圧力の比較](../SG1/index.md#prop-sg1-jensen)により $p_N\le a_\beta$。もし部分列で $p_N\le a_\beta-2\varepsilon$ なら、大きな $N$ で $A_N\subset\{F_N-p_N\ge\varepsilon\}$ となり、右辺の確率が0へ行くという集中の仮定と矛盾する。従って $\liminf p_N\ge a_\beta$、上界と合わせて収束が従う。

二次モーメント上界が直接保証するのは「平均と同程度の $Z_N$ が固定の正確率で現れる」ことであり、「典型的な $\log Z_N$ が平均に近い」ことではない。後者を繋ぐ集中の条件が必要である。
<!-- solution-end -->

**SG4-B3（AT増幅と二水準overlapは違う）**
- Level: B

AT線形応答近似の分散増幅率 $\lambda_{\mathrm{AT}}$ が $0\le\lambda_{\mathrm{AT}}\le\beta^2$ を満たすことを示せ。$\beta<1$ で近似摂動の分散が減ることを示し、それだけから「任意の外場でSK模型にRSBがない」と結論してよいか述べよ。

<!-- solution-start -->
**詳細解答**

任意の実数 $u$ に対して $0<\operatorname{sech}^2u\le1$ だから $0<\operatorname{sech}^4u\le1$。正規平均に $\beta^2$ を掛ければ

$$
0\le\lambda_{\mathrm{AT}}(q;\beta,h)
=\beta^2\mathbb E_Z\operatorname{sech}^4(\beta\sqrt q\,Z+h)
\le\beta^2.
$$

$\beta<1$ なら $\lambda_{\mathrm{AT}}<1$。本文の独立摂動近似に限り $v_{\mathrm{new}}=\lambda_{\mathrm{AT}}v$ なので、繰り返せば $v_k=\lambda_{\mathrm{AT}}^kv_0\to0$。

ただし、摂動独立性・有効場分布・近似の線形化は有限$N$のSK Gibbs測度から証明した条件ではない。この不等式は指定した近似の分散についてのものであり、任意の外場での熱力学的RSBの不存在を単独では保証しない。
<!-- solution-end -->

### Level C：厳密な結果と物理的な予想の境界

**SG4-C1（RS補間と1RSB描像を分離する）**
- Level: C

$N\ge1$、$\beta\ge0$、$h=0$ のfull SK模型を考える。(a) $q\in[0,1]$ のRS補間端点と微分を導き、圧力上界を証明せよ。(b) $q=0$ の上界を明示し、$0\le\beta<1$ でこれが極限の真値になる論拠を述べよ。(c) 重み $w_1=a,w_2=1-a$、overlap水準 $q_0<q_1$ の二状態模型について分布と平均二乗overlapを計算せよ。(d) (a)〜(c)だけから $\beta>1$ のSK模型にRSBがあると証明できるか判断せよ。

<!-- solution-start -->
**詳細解答**

(a) [SK Gaussian場の共分散](../SG3/index.md#prop-sg3-covariance)は $NR^2/2$、独立な一体Gaussian場の共分散は $NqR$。補間の共分散を微分して

$$
\partial_tC_t(\sigma,\tau)
=\frac{\beta^2N}{2}R(\sigma,\tau)^2-\beta^2NqR(\sigma,\tau).
$$

[Gaussian補間の微分公式](../SG2/index.md#thm-sg2-interpolation)を規格化 $1/N$ で適用し、対角 $R(\sigma,\sigma)=1$ を使うと

$$
\phi_N'(t)=\frac{\beta^2}{4}
\left((1-q)^2-\mathbb E\langle(R_{12}-q)^2\rangle_t\right).
$$

$t=0$ では $Z_{N,0}=\prod_i2\cosh(\beta\sqrt q\,z_i)$ より $\phi_N(0)=\log2+\mathbb E_Z\log\cosh(\beta\sqrt q Z)$。$t=1$ では $\phi_N(1)=p_N(\beta,0)$。両端を積分して

$$
p_N(\beta,0)
=\log2+\mathbb E_Z\log\cosh(\beta\sqrt qZ)
+\frac{\beta^2}{4}(1-q)^2
-\frac{\beta^2}{4}\int_0^1\mathbb E\langle(R_{12}-q)^2\rangle_t\,dt.
$$

最後の項が非正なのでRS試行式が上界である。

(b) $q=0$ で上界は $\log2+\beta^2/4$。full表示では $\mathbb EZ_N=2^Ne^{\beta^2N/4}$、独立一様配置の積 $U_i=\sigma_i\tau_i$ を使うと

$$
\frac{\mathbb EZ_N^2}{(\mathbb EZ_N)^2}
=\mathbb E_Ue^{\beta^2(\sum_iU_i)^2/(2N)}
\le(1-\beta^2)^{-1/2}
$$

となる。右辺が $\beta<1$ で $N$ に依存しないことからCauchy–Schwarzで $\mathbb P(Z_N\ge\mathbb EZ_N/2)\ge\sqrt{1-\beta^2}/4$。一方[Gaussian集中](../SG2/index.md#cor-sg2-pressure-concentration)により $F_N-p_N\to0$ は確率収束する。従ってこの固定正確率事象が存在するには $p_N\to\log2+\beta^2/4$ が必要である（第4節の背理法）。$\beta=0$ では分配関数を直接計算する。

(c) 同じ状態を二回選ぶ確率は $a^2+(1-a)^2$、異なる状態を選ぶ確率は $2a(1-a)$。従って

$$
\nu^{(2)}=\{a^2+(1-a)^2\}\delta_{q_1}
+2a(1-a)\delta_{q_0}.
$$

二乗overlap平均は $\{a^2+(1-a)^2\}q_1^2+2a(1-a)q_0^2$ である。$a\in(0,1),q_0<q_1$ なら二水準が正確率で出現する。

(d) **証明できない**。(a) は上界だけであり、(b) の二次モーメント評価は $\beta>1$ では有限上界を与えない。(c) は別途定義した混合模型の数え上げであり、SK極限のoverlap分布がそれに従うことを示していない。厳密なoverlap恒等式、熱力学極限での構造、正しい変分原理への接続は後続章で扱う。
<!-- solution-end -->
