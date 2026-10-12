# SG4 レプリカ対称性・対称性の破れ

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

係数は非負で和が1である。**有限系でoverlapが二値を取るだけでは、熱力学極限でのRSBを証明したことにならない。**
<!-- definition-example-end -->

外場 $h=0$ の場合、相互作用は $\sigma\mapsto-\sigma$ で不変である。固定した無秩序の下でも二番目のレプリカを一斉反転すると $R_{12}\mapsto-R_{12}$ で重みは変わらない。従って $\nu_N(A)=\nu_N(-A)$ となる。この**全反転対称性**と、「純粋状態の対称性が破れる」というRSBの言葉は同義ではない。符号の問題が邪魔なときは $|R_{12}|$ の分布を用いる。

### 「レプリカ法」と実際のレプリカ標本

統計物理でよく使う形式的操作は

$$
\mathbb E\log Z_N
=\left.\frac{d}{dn}\mathbb E Z_N^n\right|_{n=0}
$$

である。実際に $n$ を0の近傍の実数として微分でき、期待値と微分を交換できる条件を確認して初めて等式になる。**正の整数 $n$ で $\mathbb E Z_N^n$ を計算しただけでは、$n=0$ への解析接続も極限交換も正当化されない。** 以下ではこの形式操作に依存せず、実数パラメータを持つGaussian補間を直接用いる。

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

$\beta=0$ では $q$ に依存せず $\log(2\cosh h)$ となり、相互作用が消えた分配関数 $Z_N=(2\cosh h)^N$ と一致する。
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

