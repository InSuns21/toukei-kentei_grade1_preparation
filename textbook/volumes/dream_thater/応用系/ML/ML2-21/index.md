# ML2-21 正規化flow・密度変換

[ML2-01の密度予測と対数損失](../ML2-01/index.md#def-ml2-01-density-log-loss)では、観測 $x$ における密度 $p(x)$ を直接評価してきた。[ML2-20のVAE](../ML2-20/index.md#def-ml2-20-vae)では、潜在変数を積分して観測密度を作るため、周辺尤度を厳密に計算できないことがある。

もし標準正規分布のような**既知の密度**から出発して、標本を**一対一で元へ戻せる変換**で複雑な形に曲げられたらどうだろう。そのときは逆変換で元の点を復元できる。ただし、面積・体積が変化するので、元の密度をそのまま値として使うと確率の総量が壊れる。この体積補正が **Jacobian行列式** である。

この講義では、可逆性・正規化・対数密度を一つの式で結び、逆写像を計算しやすい層を合成する。非可逆な生成写像と、密度を厳密に計算できる正規化flowとの違いも確認する。

## 1. 標本を運ぶ方向と密度を評価する方向

まず同じ次元 $d$ の二つの空間を考える。$Z\in\mathbb R^d$ の既知の**基底密度**（base density）を $p_0(z)$ とする。連続で各点正、$\int_{\mathbb R^d}p_0(z)\,dz=1$ を仮定する。可逆写像 $f:\mathbb R^d\to\mathbb R^d$ によって $X=f(Z)$ を作る。

確率の観点からは、任意の可測集合 $B$ に対して

$$
P(X\in B)=P(Z\in f^{-1}(B))
=\int_{f^{-1}(B)}p_0(z)\,dz.
$$

このように分布を写像で運ぶ操作は既習の[押し出し測度](../../../解析系/F0/F0-00P1/index.md#def-f0-00p1-pushforward)（pushforward）の構成である。標本を生成するには $z$ を引いて $f$ を適用する。一方、観測 $x$ の密度評価には $z=f^{-1}(x)$ を計算する必要がある。

「可逆」と言うだけでは微分を使えない。ここで扱う $f$ は、$f$ と逆写像 $f^{-1}$ の双方が連続微分可能な**$C^1$ 滑らかな可逆変換**とする。この仮定なら[多変数変数変換定理](../../../基礎科目/RA/RA7/index.md#thm-ra7-change-of-variables)が適用でき、微分の連鎖律により $Df(z)$ は常に可逆である。

<a id="def-ml2-21-flow"></a>

<!-- formal-statement-start -->
> **定義（pushforward密度と正規化flow）**
> $p_0$ を $\mathbb R^d$ 上の連続な確率密度、$f:\mathbb R^d\to\mathbb R^d$ を $C^1$ の滑らかな可逆変換とする。$Z$ が $p_0$ に従うときの $X=f(Z)$ の分布は $f$ による[押し出し測度](../../../解析系/F0/F0-00P1/index.md#def-f0-00p1-pushforward)である。この押し出しを密度計算可能な可逆写像 $f$ でパラメータ化した生成模型を**正規化flow（normalizing flow）**という。
>
> $Df(z)=(\partial f_i/\partial z_j)_{i,j=1}^d$ をJacobian行列、$\det Df(z)$ をその行列式とする。生成方向は $z\mapsto x=f(z)$、密度評価方向は $x\mapsto z=f^{-1}(x)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-21-flow -->
**定義の確認**。$d=1$、$p_0(z)=e^{-z^2/2}/\sqrt{2\pi}$、$f(z)=2z+1$ とする。$f'(z)=2$、$f^{-1}(x)=(x-1)/2$ で逆関数も $C^1$。従って $X=2Z+1$ は定義どおりのpushforwardである。$Z$ を標準正規から生成すれば $X$ の平均は1、分散は4となる。次節で、その密度を正規化を保ったまま導く。
<!-- definition-example-end -->

## 2. 密度変換：なぜ行列式で割るのか

一次元では、狭い区間の長さ $dz$ が変換後におよそ $|f'(z)|\,dz$ になる。変換前後でその区間に載る確率質量は同じなので

$$
p_X(f(z))\,|f'(z)|\,dz \simeq p_0(z)\,dz.
$$

多次元では微分 $Df(z)$ が小さい体積を $|\det Df(z)|$ 倍する。この補正を厳密に表したのが次の定理である。

<a id="thm-ml2-21-density"></a>

<!-- formal-statement-start -->
> **定理（可逆変換の密度公式）**
> $p_0:\mathbb R^d\to(0,\infty)$ を連続かつ積分1の密度、$f:\mathbb R^d\to\mathbb R^d$ を $C^1$ 滑らかな可逆変換とする。$Z\sim p_0$、$X=f(Z)$ とおくと、$X$ の連続な確率密度は次式で与えられ、積分は1である。

$$
\boxed{p_X(x)=p_0(f^{-1}(x))
\left|\det Df^{-1}(x)\right|
=\frac{p_0(z)}{|\det Df(z)|},\quad z=f^{-1}(x).}
$$

> 特に対数密度は

$$
\boxed{\log p_X(x)=\log p_0(z)-\log|\det Df(z)|.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

確率は座標変換の前後で不変であり、体積だけがJacobian行列式の絶対値に従って変わる。密度に**逆**の補正を施す理由はそこにある。ここで行列式が0にならないのは、逆写像まで $C^1$ という仮定を置いたためである。

<!-- proof-start -->
### 証明

$g=f^{-1}$ とする。任意の $x$ で $f(g(x))=x$ だから、[多変数の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)を $g(x)$ で適用すると

$$
Df(g(x))Dg(x)=I_d.
$$

従って $Dg(x)=[Df(g(x))]^{-1}$ であり、

$$
|\det Dg(x)|=\frac1{|\det Df(g(x))|}>0.
$$

有界なJordan可測集合 $A$ の閉包が定義域内にある場合、[RA7の変数変換定理](../../../基礎科目/RA/RA7/index.md#thm-ra7-change-of-variables)を $f$ と非負の連続関数 $p_0(g(x))|\det Dg(x)|$ に適用する。$x=f(z)$ とおけば

$$
\begin{aligned}
\int_{f(A)}p_0(g(x))|\det Dg(x)|\,dx
&=\int_A p_0(g(f(z)))|\det Dg(f(z))|
  |\det Df(z)|\,dz\\
&=\int_A p_0(z)\,dz.
\end{aligned}
$$

第二行では $g(f(z))=z$ と逆行列の行列式を代入した。$A=[-n,n]^d$ を増大させると、$f(A)$ も $\mathbb R^d$ を尽くす。両辺は非負なので[単調収束定理](../../../解析系/F0/F0-00D2B/index.md#ref-limit-integral-exchange)により

$$
\int_{\mathbb R^d}p_0(g(x))|\det Dg(x)|\,dx
=\int_{\mathbb R^d}p_0(z)\,dz=1.
$$

次に確率分布そのものを照合する。非負連続でコンパクトな台を持つ任意の関数 $h$ を取る。$g(\operatorname{supp}h)$ は有界なので、十分大きい $n$ では $f([-n,n]^d)$ が $h$ の台を含む。上の変数変換に $h(x)$ を掛けると

$$
\int_{\mathbb R^d}h(x)p_0(g(x))|\det Dg(x)|\,dx
=\int_{\mathbb R^d}h(f(z))p_0(z)\,dz.
$$

特に有界な開矩形 $Q$ に対し、$h_m(x)=\min(1,m\,\operatorname{dist}(x,Q^c))$ と置くと、各 $h_m$ は非負連続で台は $\overline Q$ に含まれ、$h_m\uparrow\mathbf1_Q$ となる。両辺に[単調収束定理](../../../解析系/F0/F0-00D2B/index.md#ref-limit-integral-exchange)を適用すれば、$Q$ の確率について候補密度の積分と $P(f(Z)\in Q)$ が一致する。開矩形が生成するBorel集合上で確率測度は一意に定まるので、この密度は確かに $f(Z)$ の分布を与える。式の対数を取れば、$p_0>0$ かつ行列式が0でないため、対数式も得られる。$\square$
<!-- proof-end -->

**一次元の全計算**。第1節の $f(z)=2z+1$ では

$$
p_X(x)=\frac1{2\sqrt{2\pi}}
\exp\!\left[-\frac{(x-1)^2}{8}\right].
$$

$u=(x-1)/2$ と置くと $dx=2\,du$ だから、$\int p_X(x)\,dx=\int p_0(u)\,du=1$。特に $x=1$ で $p_X(1)=p_0(0)/2$ となる。$p_0(0)$ をそのまま使うと、密度の高さだけでなく積分値も2倍になってしまう。

**符号の注意**。$f(z)=1-3z$ は向きを反転するが、確率は負にならない。$f'(z)=-3$ でも補正は $1/3$ である。行列式そのものではなく**絶対値**を使う。

## 3. 層を積み重ねると対数Jacobianは足し算になる

単純な可逆変換だけでは表現できる密度が限られる。そこで $f_1,\ldots,f_K$ を合成し、$h_0=z$、$h_k=f_k(h_{k-1})$、$x=h_K$ とする。各層は同じ次元の $C^1$ 滑らかな可逆変換とする。

<a id="thm-ml2-21-composition"></a>

<!-- formal-statement-start -->
> **定理（flow合成のlog Jacobian公式）**
> $p_0$ を連続な正の確率密度とし、$f_1,\ldots,f_K:\mathbb R^d\to\mathbb R^d$ を $C^1$ 滑らかな可逆変換とする。$f=f_K\circ\cdots\circ f_1$、$h_0=f^{-1}(x)$、$h_k=f_k(h_{k-1})$ とすると

$$
\boxed{\log p_X(x)=\log p_0(h_0)
-\sum_{k=1}^{K}\log|\det Df_k(h_{k-1})|.}
$$

> $h_K=x$。すべての行列式は0でなく、$p_X$ は積分1の密度である。
<!-- formal-statement-end -->

### 証明の見取り図

[ML2-14の層のJacobian積](../ML2-14/index.md#thm-ml2-14-layer-jacobian)を、行列式の乗法性と対数の積和変換に接続する。

<!-- proof-start -->
### 証明

各 $f_k$ とその逆写像の合成も $C^1$ 滑らかな可逆変換となる。$h_0=z$ とし、[層のJacobian積](../ML2-14/index.md#thm-ml2-14-layer-jacobian)より

$$
Df(z)=Df_K(h_{K-1})Df_{K-1}(h_{K-2})\cdots Df_1(h_0).
$$

[行列式の乗法性](../../../基礎科目/LA/LA3C/index.md#thm-la3c-det-multiplicative)から

$$
|\det Df(z)|=\prod_{k=1}^K|\det Df_k(h_{k-1})|.
$$

各因子は正である。よって対数を取れば積が和になり、[可逆変換の密度公式](#thm-ml2-21-density)に代入して結論が出る。正規化は合成写像に同定理を適用すれば従う。$\square$
<!-- proof-end -->

**二層の確認**。$f_1(z)=2z$、$f_2(h)=h+3$ とすれば $f(z)=2z+3$ である。第一層のlog絶対Jacobianは $\log2$、第二層は $\log1=0$。従って

$$
\log p_X(x)=\log p_0((x-3)/2)-\log2.
$$

途中の状態 $h_k$ でそれぞれのJacobianを評価する点が重要である。非線形層では全層を同じ $z$ で評価してはならない。

## 4. affine coupling：逆も行列式も安く計算する

一般の $d\times d$ 行列式は計算量が大きく、非線形な逆写像も容易には求まらない。そこで入力を二つの成分群へ分け、片方を保持し、その値で他方の**スケールと移動量**を決める。

$z=(z_A,z_B)$、$z_A\in\mathbb R^a$、$z_B\in\mathbb R^b$、$a,b\ge1$、$a+b=d$ とする。$s,t:\mathbb R^a\to\mathbb R^b$ は $C^1$ 写像とし、$s$ は各点で有限とする。$\odot$ は成分ごとの積を表す。

<a id="def-ml2-21-coupling"></a>

<!-- formal-statement-start -->
> **定義（affine coupling層）**
> 上記の分割と $C^1$ 写像 $s,t$ に対して、次の写像を**affine coupling層**という。

$$
\boxed{f(z_A,z_B)=
\bigl(z_A,\ z_B\odot e^{s(z_A)}+t(z_A)\bigr).}
$$

> 指数と積は成分ごとに取る。$s$ が有限であるため各スケール因子は正である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-21-coupling -->
**定義の確認**。$a=b=1$、$s(u)=u$、$t(u)=2u$ とすると $f(z_1,z_2)=(z_1,e^{z_1}z_2+2z_1)$。例えば $z=(0,3)$ は $x=(0,3)$ に、$z=(\log2,3)$ は $x=(\log2,6+2\log2)$ に移る。第一成分を保持しているので、$x_1$ からスケール $e^{x_1}$ と移動量 $2x_1$ を再現でき、$z_2=(x_2-2x_1)e^{-x_1}$ と逆算できる。
<!-- definition-example-end -->

<a id="prop-ml2-21-coupling-inverse"></a>

<!-- formal-statement-start -->
> **命題（affine coupling層の可逆性とJacobian）**
> [affine coupling層](#def-ml2-21-coupling)は $\mathbb R^d$ 上の $C^1$ 滑らかな可逆変換であり、逆写像は

$$
z_A=x_A,\qquad
z_B=(x_B-t(x_A))\odot e^{-s(x_A)}
$$

> である。生成方向の行列式とlog絶対行列式はそれぞれ

$$
\det Df(z)=\exp\!\left(\sum_{j=1}^b s_j(z_A)\right),
\qquad
\log|\det Df(z)|=\sum_{j=1}^b s_j(z_A).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$x_A=z_A$ を先に戻せるので、$z_B$ は成分ごとに割り算するだけでよい。Jacobianは対角ブロックが単位行列と対角スケール行列の**ブロック下三角**行列となる。

<!-- proof-start -->
### 証明

$x_A=z_A$ と $x_B=z_B\odot e^{s(z_A)}+t(z_A)$ より、$x_A$ を固定して各 $j$ について

$$
x_{B,j}-t_j(x_A)=z_{B,j}e^{s_j(x_A)}
$$

と書ける。$e^{s_j(x_A)}>0$ を割れば表示した逆式を得る。この式はすべての $x$ に定義され、$s,t$ が $C^1$ なので逆写像も $C^1$ である。

一方、行列の成分を $z_A,z_B$ の順に並べれば

$$
Df(z)=\begin{pmatrix}
I_a&0\\
*&\operatorname{diag}(e^{s_1(z_A)},\ldots,e^{s_b(z_A)})
\end{pmatrix}.
$$

$*$ に $Ds,Dt$ の値が入るが、ブロック三角行列の行列式には影響しない。よって

$$
\det Df(z)=\det I_a\prod_{j=1}^b e^{s_j(z_A)}
=e^{\sum_j s_j(z_A)}>0.
$$

対数を取れば最後の式が得られる。$\square$
<!-- proof-end -->

**二次元の密度評価**。$Z_1,Z_2$ を独立な標準正規変数とし、$f(z_1,z_2)=(z_1,e^{az_1}z_2+bz_1)$ とする。$a,b\in\mathbb R$ は固定定数である。観測 $x=(x_1,x_2)$ に対して

$$
z_1=x_1,\qquad z_2=(x_2-bx_1)e^{-ax_1}.
$$

基底密度は $(2\pi)^{-1}\exp[-(z_1^2+z_2^2)/2]$。従って

$$
\boxed{\log p_X(x_1,x_2)=
-\log(2\pi)-\frac12\left[x_1^2+
(x_2-bx_1)^2e^{-2ax_1}\right]-ax_1.}
$$

この式の $-ax_1$ が欠けると正規化されない。例えば $a=\log2,b=1,x=(1,3)$ なら $z=(1,1)$、密度は $e^{-1}/(4\pi)$ となる。

各層で保持する側と変換する側を入れ替えれば、両方の成分を変換する多層模型を構成できる。ただし「任意の有限個の層であらゆる密度を厳密に表せる」といった保証は、この構成からは出ない。

## 5. 対数尤度の学習と生成は逆向きの計算

観測標本 $x_1,\ldots,x_n$ からflowのパラメータ $\theta$ を学習する場合、各 $f_\theta$ が可逆で微分可能な範囲では、経験負の対数尤度

$$
\widehat R(\theta)
=-\frac1n\sum_{i=1}^n \log p_\theta(x_i)
=\frac1n\sum_{i=1}^n\left[
-\log p_0(f_\theta^{-1}(x_i))
+\log|\det Df_\theta(f_\theta^{-1}(x_i))|\right]
$$

を最小化する。これは[ML2-01の密度に対する対数損失](../ML2-01/index.md#def-ml2-01-density-log-loss)を具体的な確率模型へ適用したものだ。逆変換で基底側の点を求め、各層のlog絶対Jacobianを足す。最適化に必要なパラメータ勾配は、可微分な層について[逆伝播](../ML2-14/index.md#thm-ml2-14-backprop)で計算できる。ただし尤度の計算可能性と、最適化が大域最適へ収束することは別の問題である。

| 操作 | 入力 | 順序 | 出力 |
| --- | --- | --- | --- |
| 標本生成 | $z\sim p_0$ | $f_1,f_2,\ldots,f_K$ | $x$ |
| 観測の密度評価 | $x$ | $f_K^{-1},\ldots,f_1^{-1}$ | $z$ と $\log p_X(x)$ |

例えば前節のaffine couplingでは、対数密度の補正は $-\sum_j s_j(z_A)$ である。ここで安定性のために **大きい行列式を数値的に作ってから対数を取る必要はない**。各層の $s_j$ を直接加算すればよい。有限精度計算では巨大な $e^{s_j}$ のオーバーフロー、極端に小さいスケールによる条件悪化に注意する。実装で $s_j$ を有界に制限することは、数学的定義の条件とは別の数値設計である。

## 6. 何ができないか：可逆性・support・次元

前節までの密度公式は **$f$ が同次元で一対一、かつ各点で微分が可逆** という条件に依存していた。ここを落とすと、次のように計算機構そのものが変わる。

<a id="prop-ml2-21-support"></a>

<!-- formal-statement-start -->
> **命題（全空間正密度のflowによるsupport制約）**
> $p_0(z)>0$ がすべての $z\in\mathbb R^d$ で成り立ち、$f:\mathbb R^d\to\mathbb R^d$ が $C^1$ 滑らかな可逆変換なら、pushforward密度はすべての $x\in\mathbb R^d$ で $p_X(x)>0$ である。従ってこの模型は、非空の開集合で密度が厳密に0となる分布、特に有界領域の外で0となる密度を**厳密には**表現できない。
<!-- formal-statement-end -->

### 証明の見取り図

すべての $x$ で逆像 $z=f^{-1}(x)$ が存在し、基底密度もJacobianの絶対値も正なので、その商は正のままである。

<!-- proof-start -->
### 証明

任意の $x\in\mathbb R^d$ を取る。全単射性から $z=f^{-1}(x)$ がただ一つ存在する。[可逆変換の密度公式](#thm-ml2-21-density)を適用すると

$$
p_X(x)=\frac{p_0(z)}{|\det Df(z)|}.
$$

分子は仮定により正、分母は滑らかな可逆変換の連鎖律により有限で正である。従って $p_X(x)>0$。0密度が要求される非空開集合があれば、いずれかの点でこの結論と矛盾する。$\square$
<!-- proof-end -->

この制約は **厳密な表現** に関するものだ。全空間で正の密度でも、特定領域で確率質量を極めて小さくする近似は可能である。また、写像の値域を $\mathbb R^d$ 全体ではなく $(0,1)^d$ などに変更するなら、上の命題の仮定から外れる。閉包を含むsupportの議論と、密度が個々の点で0になるかの議論を混同しない。

**多対一の失敗例**。一次元の $f(z)=z^2$ は $z$ と $-z$ が同じ $x>0$ に移る。標準正規 $p_0=\varphi$ なら、二つの逆像を足して

$$
p_X(x)=\frac{\varphi(\sqrt{x})}{2\sqrt{x}}
+\frac{\varphi(-\sqrt{x})}{2\sqrt{x}}
=\frac{\varphi(\sqrt{x})}{\sqrt{x}},\qquad x>0
$$

となる。$x<0$ では密度0。$z=0$ では微分が0になり、単一逆像の公式を適用できない。原点の密度値は積分に影響しないが、$x\downarrow0$ で密度は発散する（それでも可積分）。

**次元を下げる例**。$(z_1,z_2)\mapsto(z_1,0)$ は二次元の連続密度を直線上へ運び、二次元Lebesgue測度に関する密度を持たない。単にJacobianに0を代入して割る操作には意味がない。一方 $(z_1,z_2)\mapsto z_1$ は一次元の周辺密度を持つことがあるが、やはり同次元の行列式公式ではなく**積分による周辺化**が必要だ。[VAE](../ML2-20/index.md#def-ml2-20-vae)は観測分布にノイズを加えるなど、そもそも異なる生成構成を採用する。

## 7. 再計算ラボ：正規化と生成を両側から確認

第4節の二次元couplingで $a=0.3,b=0.4$ とする。次のPythonコードは標準ライブラリだけで動き、乱数の初期値を固定した標本から逆変換を検算し、変換後の密度を数値積分する。

```python
import math
import random

rng = random.Random(20261027)
a, b = 0.3, 0.4
def log_base(z1, z2):
    return -math.log(2 * math.pi) - 0.5 * (z1*z1 + z2*z2)

def forward(z1, z2):
    return z1, math.exp(a*z1)*z2 + b*z1

def inverse(x1, x2):
    return x1, (x2 - b*x1)*math.exp(-a*x1)

def log_density(x1, x2):
    z1, z2 = inverse(x1, x2)
    return log_base(z1, z2) - a*z1

z = (rng.gauss(0, 1), rng.gauss(0, 1))
x = forward(*z)
z_back = inverse(*x)
print("reconstruction error:", max(abs(u-v) for u,v in zip(z, z_back)))
print("log density:", log_density(*x))
print("base minus log Jacobian:", log_base(*z)-a*z[0])

# 有限範囲の中点求積。裾を切るため厳密な1ではない。
n1, n2 = 160, 320
lo1, hi1 = -8.0, 8.0
lo2, hi2 = -24.0, 24.0
dx1, dx2 = (hi1-lo1)/n1, (hi2-lo2)/n2
mass = sum(
    math.exp(log_density(lo1+(i+0.5)*dx1, lo2+(j+0.5)*dx2))
    for i in range(n1) for j in range(n2)
) * dx1 * dx2
print("rectangular integral:", mass)
```

逆変換の再構成誤差と二つの対数密度は丸め誤差程度で一致し、矩形積分は1に近づく。これは数値での検算であり、**数学的な正規化の証明は第2節**にある。裾を広げ、刻みを細かくして結果がどう変わるか確かめよう。

さらに、$x_1$ を固定して $x_2$ の積分だけを先に行えば、$u=(x_2-bx_1)e^{-ax_1}$、$dx_2=e^{ax_1}\,du$ により

$$
\int_{\mathbb R}p_X(x_1,x_2)\,dx_2
=\varphi(x_1)\int_{\mathbb R}\varphi(u)\,du
=\varphi(x_1).
$$

次に $\int_{\mathbb R}\varphi(x_1)\,dx_1=1$ なので、数値実験とは独立に積分1を再確認できる。

## 8. 演習

### Level A

**ML2-21-A01（一次元の密度変換）**
- Level: A
- 問題: $Z\sim N(0,1)$、$X=3Z-2$ とする。$X$ の密度、$\log p_X(-2)$ と $\int_{\mathbb R}p_X(x)\,dx$ を求めよ。
<!-- solution-start -->
**詳細解答**。$f(z)=3z-2$ の逆写像は $z=(x+2)/3$、導関数は3である。[密度公式](#thm-ml2-21-density)から

$$
p_X(x)=\frac{1}{3\sqrt{2\pi}}
\exp\left[-\frac{(x+2)^2}{18}\right].
$$

$x=-2$ では $z=0$ より $\log p_X(-2)=-\tfrac12\log(2\pi)-\log3$。積分は $u=(x+2)/3$ とすれば $dx=3\,du$ となり、$\int p_X=\int\varphi(u)\,du=1$。Jacobianを掛ける方向を逆にしない。
<!-- solution-end -->

**ML2-21-A02（向きの反転と絶対値）**
- Level: A
- 問題: $Z$ の密度が $(0,1)$ 上で1、それ以外で0で、$X=1-2Z$ とする。$X$ の密度とsupport、正規化を求めよ。$f'(z)=-2$ をそのまま分母に使うと何が起きるか。
<!-- solution-start -->
**詳細解答**。$z=(1-x)/2$ は $-1<x<1$ と同値である。$|f'|=2$ を使うので

$$
p_X(x)=\begin{cases}\frac12,&-1<x<1,\\0,&\text{それ以外}.\end{cases}
$$

確率1のsupportの閉包は $[-1,1]$。積分は $(1-(-1))/2=1$ である。$-2$ で割ると密度が負となり、積分は$-1$になってしまう。なおこの例の基底密度は全空間で正でないので、第6節のsupport命題の仮定には含まれない。
<!-- solution-end -->

**ML2-21-A03（couplingの逆計算）**
- Level: A
- 問題: $f(z_1,z_2)=(z_1,2^{z_1}z_2+z_1)$ とし、基底を二次元標準正規とする。$x=(1,3)$ の逆像と $\log p_X(1,3)$ を求めよ。
<!-- solution-start -->
**詳細解答**。$z_1=x_1=1$、$z_2=(3-1)/2^1=1$。$s(z_1)=z_1\log2$ だからJacobian行列式は $2^{z_1}$。従って

$$
\log p_X(1,3)=\log\varphi(1)+\log\varphi(1)-\log2
=-\log(2\pi)-1-\log2.
$$

ここで $p_X(1,3)=e^{-1}/(4\pi)$ であり、$z_2$ の値のみを補正項と取り違えない。
<!-- solution-end -->

**ML2-21-A04（定数線形層）**
- Level: A
- 問題: $f(z_1,z_2)=(z_1+3,4z_2)$ とする。Jacobianとlog絶対Jacobian、$x=(3,0)$ の逆像、二次元標準正規を基底とする対数密度を計算せよ。
<!-- solution-start -->
**詳細解答**。$Df=\operatorname{diag}(1,4)$、$\det Df=4$、$\log|\det Df|=\log4$。逆写像は $z=(x_1-3,x_2/4)$ なので $x=(3,0)$ では $z=(0,0)$。

$$
\log p_X(3,0)=-\log(2\pi)-\log4.
$$

平行移動のJacobianは1であり、スケーリングの4だけが体積を増やす。
<!-- solution-end -->

### Level B

**ML2-21-B01（非線形な二層合成）**
- Level: B
- 問題: $Z\sim N(0,1)$、$f_1(z)=2z$、$f_2(h)=h+h^3$ とし、$X=f_2(f_1(Z))$ とする。$z=1$ から得られる $x$ と、その点での密度を求めよ。各層が $C^1$ 滑らかな可逆変換である理由も述べよ。
<!-- solution-start -->
**詳細解答**。$h=f_1(1)=2$、$x=f_2(2)=2+8=10$。$f_1'=2$、$f_2'(h)=1+3h^2\ge1$ なので $f_2$ は厳密単調で両端の極限は $\pm\infty$。[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により逆写像は各点で $C^1$ である。よって両層とも滑らかな可逆変換。

$$
f'(1)=f_2'(2)f_1'(1)=(1+3\cdot4)\cdot2=26.
$$

[合成公式](#thm-ml2-21-composition)から

$$
p_X(10)=\frac{\varphi(1)}{26}
=\frac{e^{-1/2}}{26\sqrt{2\pi}}.
$$

第二層の導関数を $h=1$ でなく $h=2$ で評価する必要がある。
<!-- solution-end -->

**ML2-21-B02（値域の違う滑らかな可逆変換）**
- Level: B
- 問題: $Z\sim N(0,1)$、$X=(1+e^{-Z})^{-1}$ とする。値域、逆写像、$(0,1)$ 内の密度と正規化を導き、第6節のsupport命題に矛盾しない理由を述べよ。
<!-- solution-start -->
**詳細解答**。$f:\mathbb R\to(0,1)$ は一対一・全射で $C^1$ 逆を持つが、$\mathbb R\to\mathbb R$ の全射ではない。$z=\log(x/(1-x))$、逆導関数は

$$
\frac{dz}{dx}=\frac1x+\frac1{1-x}=\frac1{x(1-x)}.
$$

従って $0<x<1$ で

$$
p_X(x)=\frac{\varphi(\log(x/(1-x)))}{x(1-x)},
$$

その他では密度0である。$x=f(z)$ と置けば $dx=x(1-x)\,dz$ で、$\int_0^1p_X(x)\,dx=\int_{\mathbb R}\varphi(z)\,dz=1$。命題は**全空間への**滑らかな可逆変換を仮定するため、値域が $(0,1)$ のこの例へは適用できない。
<!-- solution-end -->

**ML2-21-B03（多対一写像での枝の和）**
- Level: B
- 問題: $Z\sim N(0,1)$、$X=Z^2$ とする。$x>0$ の密度を二つの逆像から導き、積分が1であることを確認せよ。単一逆像公式が使えない理由も述べよ。
<!-- solution-start -->
**詳細解答**。$z=\sqrt{x}$ と $z=-\sqrt{x}$ が同じ $x>0$ に対応し、それぞれ $|2z|=2\sqrt{x}$ である。二枝の確率を足して

$$
p_X(x)=\frac{\varphi(\sqrt{x})+\varphi(-\sqrt{x})}{2\sqrt{x}}
=\frac{\varphi(\sqrt{x})}{\sqrt{x}}\quad(x>0).
$$

$u=\sqrt{x}$ にすると $dx=2u\,du$ なので

$$
\int_0^\infty p_X(x)\,dx
=2\int_0^\infty\varphi(u)\,du=1.
$$

$f$ は単射でなく、原点では $f'(0)=0$。どちらも可逆変換定理の仮定に反する。
<!-- solution-end -->

**ML2-21-B04（条件付き正規化とモーメント）**
- Level: B
- 問題: 独立な標準正規 $Z_1,Z_2$ を $X_1=Z_1$、$X_2=e^{aZ_1}Z_2+bZ_1$ で変換する。$X_2\mid X_1=x_1$ の分布、$\operatorname{Cov}(X_1,X_2)$、$\operatorname{Var}(X_2)$ を求めよ。$a,b\in\mathbb R$ とする。
<!-- solution-start -->
**詳細解答**。$X_1=x_1$ を固定すると $Z_2$ は独立な標準正規のままで、$X_2=e^{ax_1}Z_2+bx_1$。従って

$$
X_2\mid X_1=x_1\sim N(bx_1,e^{2ax_1}).
$$

平均 $EX_2=E[e^{aZ_1}]EZ_2+bEZ_1=0$。また独立性より $E[Z_1e^{aZ_1}Z_2]=E[Z_1e^{aZ_1}]EZ_2=0$ なので

$$
\operatorname{Cov}(X_1,X_2)=bE[Z_1^2]=b.
$$

交差項も平均0であり

$$
\begin{aligned}
\operatorname{Var}(X_2)
&=E[e^{2aZ_1}Z_2^2]+b^2E[Z_1^2]\\
&=E[e^{2aZ_1}]+b^2
=e^{2a^2}+b^2.
\end{aligned}
$$

最後は標準正規の指数モーメント $E[e^{tZ}]=e^{t^2/2}$ に $t=2a$ を代入した。$a\ne0$ では条件付き分散が $x_1$ で変わるため、同時分布が二次元正規になるとは限らない。
<!-- solution-end -->

### Level C

**ML2-21-C01（二層flowの完全検算）**
- Level: C
- 問題: $Z=(Z_1,Z_2)$ を二次元標準正規とし、第一層 $f_1(z_1,z_2)=(z_1,z_1+2z_2)$、第二層 $f_2(h_1,h_2)=(3h_1+h_2,h_2)$ とする。次を出発点から求めよ。

  1. 各層と合成のJacobian行列式、および合成が全空間の滑らかな可逆変換であること。
  2. $x=(8,5)$ の逆像と $\log p_X(8,5)$。
  3. $p_X$ の積分が1であること。Jacobian補正を削ると積分はいくつになるか。
  4. この例が「正規化flow」でも非正規の同時密度を学習したとは限らない理由。
<!-- solution-start -->
**詳細解答**。(1) 行列表示は

$$
A_1=\begin{pmatrix}1&0\\1&2\end{pmatrix},\qquad
A_2=\begin{pmatrix}3&1\\0&1\end{pmatrix}.
$$

各行列式は $2,3$ でともに非零。線形逆写像が存在し、どちらも全空間上の滑らかな可逆変換である。合成行列は

$$
A=A_2A_1=\begin{pmatrix}4&2\\1&2\end{pmatrix},
\qquad \det A=8-2=6=3\cdot2.
$$

(2) $h_2=x_2=5$、$h_1=(x_1-h_2)/3=1$。第一層を戻せば $z_1=h_1=1$、$z_2=(h_2-z_1)/2=2$。従って

$$
\log p_X(8,5)=-\log(2\pi)
-\frac{1^2+2^2}{2}-\log6
=-\log(2\pi)-\frac52-\log6.
$$

(3) [密度公式](#thm-ml2-21-density)から $p_X(x)=p_0(A^{-1}x)/6$。$x=Az$ と置くと $dx=6\,dz$ で

$$
\int_{\mathbb R^2}p_X(x)\,dx
=\int_{\mathbb R^2}\frac{p_0(z)}6\,6\,dz=1.
$$

補正を削ると $\int p_0(A^{-1}x)\,dx=6$ となり、確率密度でなくなる。

(4) $AZ$ は多変量正規である。逆変換は線形なので、密度は中心0で共分散 $AA^T$ のGaussianに留まる。「複数の可逆な層」というだけでは、複雑な非Gaussian分布を必ず作れるわけではない。例えば非線形coupling層を設計する必要がある。
<!-- solution-end -->

## まとめ

- 同次元の滑らかな可逆変換によるpushforwardでは、観測を逆写像で基底点へ戻し、**生成方向の絶対Jacobianで割る**。
- 層を合成すればJacobian行列式が積になり、log絶対Jacobianは和になる。
- affine couplingは、逆写像と三角Jacobianにより対数密度を計算しやすい。
- 全空間で正の基底密度と全空間の滑らかな可逆変換からは、全空間で正の密度しか厳密に得られない。多対一・低次元の写像では単一逆像の式は使えない。
- 厳密な尤度評価ができることと、模型の表現力・最適化の成功・数値精度は別の主張である。

次講では、密度の厳密計算を前提にしない敵対的生成モデルと、二つの分布の比較へ進む。
