# QMC2 準 Monte Carlo II：RKHS・単位球上の求積誤差・重み付き空間

QMC1 では、Hardy--Krause 変動とスター・ディスクレパンシーを使って

$$
|Q_N(f)-I(f)|
\le
V_{\mathrm{HK}}(f)D_N^\ast(P_N)
$$

という決定論的誤差評価を得ました。

この評価は「関数側の複雑さ」と「点集合側の偏り」を分離する強力な道具です。一方で、ある関数クラス全体に対して点集合を設計したいときには、別の見方も便利です。

本章では、既存の [Sobolev 空間](../GPDE3/index.md#def-gpde3-sobolev-space) と [再生核 Hilbert 空間](../F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md#def-f0-02c7-rkhs) と [再生核](../F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md#def-f0-02c7-reproducing-kernel) を正本として使い、

$$
\boxed{
\text{積分誤差}
=
\text{Hilbert 空間内の一つのベクトルとの内積}
}
$$

という形へ移します。

すると、単位球上で取り得る最大の求積誤差はそのベクトルのノルムそのものになり、

$$
\boxed{
e(Q_N;\mathcal H)
=
\|h_{Q_N}-h_I\|_{\mathcal H}
}
$$

と完全に計算できます。

後半では、一次元の アンカー型 Sobolev 空間を多次元へ組み上げ、座標ごとの重要度を表す重みを入れます。重みが十分速く減衰すれば、名目上の次元 $s$ が大きくても高い座標の影響を小さくできることを、核と単位球上の誤差評価から確認します。

---

## 0. 本章で再定義しないもの

RKHS の一般論は F0-02C7 が canonical dependency です。

特に本章では、次を既知として使います。

- [再生核 Hilbert 空間](../F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md#def-f0-02c7-rkhs)
- [再生性](../F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md#def-f0-02c7-reproducing-property)
- [再生核](../F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md#def-f0-02c7-reproducing-kernel)
- [Moore--Aronszajn の定理](../F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md#thm-f0-02c7-moore-aronszajn)

ここでは一般論を重複再証明せず、積分汎関数と準 Monte Carlo 求積へ適用します。

---

## 1. 積分汎関数を RKHS のベクトルへ変える

$\mathcal H$ を $[0,1]^s$ 上の実数値 RKHS、$K$ をその再生核とします。

再生性から

$$
f(\boldsymbol x)
=
\langle f,K_{\boldsymbol x}\rangle_{\mathcal H},
\qquad
K_{\boldsymbol x}(\cdot)
=
K(\cdot,\boldsymbol x)
$$

です。

また F0-02C7 で示した

$$
\|K_{\boldsymbol x}\|_{\mathcal H}^2
=
K(\boldsymbol x,\boldsymbol x)
$$

を使うと、

$$
|f(\boldsymbol x)|
\le
\|f\|_{\mathcal H}
\sqrt{K(\boldsymbol x,\boldsymbol x)}
$$

です。

<a id="def-qmc2-integration-functional"></a>
<!-- formal-statement-start -->
### 定義（RKHS 上の積分汎関数）

$\mathcal H$ を $[0,1]^s$ 上の RKHS とし、その再生核を $K$ とする。

$$
\int_{[0,1]^s}
\sqrt{K(\boldsymbol x,\boldsymbol x)}
\,d\boldsymbol x
<
\infty
$$

を仮定する。

このとき

$$
I:\mathcal H\to\mathbb R,
\qquad
I(f)
=
\int_{[0,1]^s}
f(\boldsymbol x)\,d\boldsymbol x
$$

を本章の積分汎関数とする。
<!-- formal-statement-end -->

この仮定の役割は明確です。上の点評価評価から

$$
|I(f)|
\le
\int
|f(\boldsymbol x)|\,d\boldsymbol x
\le
\|f\|_{\mathcal H}
\int
\sqrt{K(\boldsymbol x,\boldsymbol x)}
\,d\boldsymbol x
$$

なので、$I$ は連続線形汎関数です。

従って [Riesz表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)を使えます。

<a id="thm-qmc2-integration-representer"></a>
<!-- formal-statement-start -->
### 定理（積分汎関数の表現元）

上の仮定の下で、ただ一つの $h_I\in\mathcal H$ が存在して

$$
I(f)
=
\langle f,h_I\rangle_{\mathcal H}
\qquad
(\forall f\in\mathcal H)
$$

を満たす。

さらに各 $\boldsymbol x\in[0,1]^s$ について

$$
\boxed{
h_I(\boldsymbol x)
=
\int_{[0,1]^s}
K(\boldsymbol x,\boldsymbol y)
\,d\boldsymbol y
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

連続性を確認したので [Riesz表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)から $h_I$ の存在一意性が得られます。

残る式は、$h_I$ 自身を点 $\boldsymbol x$ で評価し、再生性を使えば出ます。Hilbert 空間値積分を新たに導入する必要はありません。

<!-- proof-start -->
### 証明

積分汎関数 $I$ は連続線形汎関数なので、[Riesz表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)から一意な $h_I\in\mathcal H$ が存在して

$$
I(f)
=
\langle f,h_I\rangle_{\mathcal H}
$$

を満たします。

各 $\boldsymbol x$ について再生性を $f=h_I$ に適用すると

$$
h_I(\boldsymbol x)
=
\langle h_I,K_{\boldsymbol x}\rangle_{\mathcal H}.
$$

実 Hilbert 空間なので内積の対称性から

$$
\langle h_I,K_{\boldsymbol x}\rangle_{\mathcal H}
=
\langle K_{\boldsymbol x},h_I\rangle_{\mathcal H}.
$$

$h_I$ は $I$ の Riesz 表現元なので

$$
\langle K_{\boldsymbol x},h_I\rangle_{\mathcal H}
=
I(K_{\boldsymbol x})
=
\int
K_{\boldsymbol x}(\boldsymbol y)
\,d\boldsymbol y.
$$

再生核の対称性から

$$
K_{\boldsymbol x}(\boldsymbol y)
=
K(\boldsymbol y,\boldsymbol x)
=
K(\boldsymbol x,\boldsymbol y).
$$

従って

$$
h_I(\boldsymbol x)
=
\int
K(\boldsymbol x,\boldsymbol y)
\,d\boldsymbol y.
$$

以上で示されました。
<!-- proof-end -->

<!-- definition-example-start: def-qmc2-integration-functional -->
**定義の確認**：$K(x,y)=1+\min(x,y)$

一次元で

$$
K(x,y)
=
1+\min(x,y)
$$

とします。

対角成分は

$$
K(x,x)
=
1+x
\le
2
$$

なので

$$
\int_0^1
\sqrt{K(x,x)}
\,dx
\le
\sqrt2
<
\infty.
$$

従って積分汎関数は連続です。

また

$$
h_I(x)
=
\int_0^1
\{1+\min(x,y)\}\,dy.
$$

$0\le y\le x$ と $x<y\le1$ に分けると

$$
\begin{aligned}
h_I(x)
&=
1+
\int_0^x y\,dy
+
\int_x^1 x\,dy
\\
&=
1+\frac{x^2}{2}+x(1-x)
\\
&=
\boxed{
1+x-\frac{x^2}{2}
}.
\end{aligned}
$$
<!-- definition-example-end -->

---

## 2. 求積誤差にも表現元がある

点

$$
P_N
=
\{
\boldsymbol x_1,\ldots,\boldsymbol x_N
\}
$$

と実数重み $w_1,\ldots,w_N$ を取ります。

<a id="def-qmc2-quadrature-error-representer"></a>
<!-- formal-statement-start -->
### 定義（求積則と誤差表現元）

RKHS $\mathcal H$ 上の求積則を

$$
Q_N(f)
=
\sum_{n=1}^N
w_nf(\boldsymbol x_n)
$$

とする。

誤差汎関数を

$$
E_N(f)
=
Q_N(f)-I(f)
$$

とおく。

このとき

$$
\boxed{
h_{E_N}
=
\sum_{n=1}^N
w_nK_{\boldsymbol x_n}
-
h_I
}
$$

を誤差表現元とする。
<!-- formal-statement-end -->

再生性から

$$
\begin{aligned}
E_N(f)
&=
\sum_{n=1}^N
w_n
\langle f,K_{\boldsymbol x_n}\rangle_{\mathcal H}
-
\langle f,h_I\rangle_{\mathcal H}
\\
&=
\left\langle
f,
\sum_{n=1}^N
w_nK_{\boldsymbol x_n}
-h_I
\right\rangle_{\mathcal H}.
\end{aligned}
$$

従って

$$
\boxed{
E_N(f)
=
\langle f,h_{E_N}\rangle_{\mathcal H}
}
$$

です。

ここで準 Monte Carlo 法にとって重要な量を導入します。

<a id="def-qmc2-worst-case-error"></a>
<!-- formal-statement-start -->
### 定義（最悪誤差）

RKHS $\mathcal H$ の単位球

$$
B_{\mathcal H}
=
\{
f\in\mathcal H:
\|f\|_{\mathcal H}\le1
\}
$$

に対して、

$$
\boxed{
e(Q_N;\mathcal H)
=
\sup_{\|f\|_{\mathcal H}\le1}
|Q_N(f)-I(f)|
}
$$

を $\mathcal H$ 上の最悪誤差とする。
<!-- formal-statement-end -->

「最悪」とは、点集合が悪いという意味ではありません。

同じ関数クラスの単位球の中で、現在の求積則にとって最も厳しい関数を取る、という意味です。

<a id="thm-qmc2-worst-case-error"></a>
<!-- formal-statement-start -->
### 定理（RKHS 最悪誤差の表現公式）

積分汎関数が連続である RKHS $\mathcal H$ と求積則 $Q_N$ に対して

$$
\boxed{
e(Q_N;\mathcal H)
=
\|h_{E_N}\|_{\mathcal H}
}
$$

が成り立つ。

従って

$$
\boxed{
\begin{aligned}
e(Q_N;\mathcal H)^2
&=
\iint
K(\boldsymbol x,\boldsymbol y)
\,d\boldsymbol x\,d\boldsymbol y
\\
&\quad
-
2
\sum_{n=1}^N
w_n
\int
K(\boldsymbol x_n,\boldsymbol y)
\,d\boldsymbol y
\\
&\quad
+
\sum_{m=1}^N
\sum_{n=1}^N
w_mw_n
K(\boldsymbol x_m,\boldsymbol x_n).
\end{aligned}
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

誤差は

$$
E_N(f)
=
\langle f,h_{E_N}\rangle
$$

です。

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)は単位球上での上界を与えます。その上界は $h_{E_N}$ と同方向の関数を選ぶと等号になるため、最悪誤差はちょうど $\|h_{E_N}\|$ です。

<!-- proof-start -->
### 証明

任意の $\|f\|_{\mathcal H}\le1$ に対し、

$$
|E_N(f)|
=
|\langle f,h_{E_N}\rangle_{\mathcal H}|
\le
\|f\|_{\mathcal H}
\|h_{E_N}\|_{\mathcal H}
\le
\|h_{E_N}\|_{\mathcal H}.
$$

従って

$$
e(Q_N;\mathcal H)
\le
\|h_{E_N}\|_{\mathcal H}.
$$

$h_{E_N}=0$ なら両辺とも $0$ です。

$h_{E_N}\ne0$ なら

$$
f_\ast
=
\frac{h_{E_N}}
{\|h_{E_N}\|_{\mathcal H}}
$$

と取れます。

このとき $\|f_\ast\|_{\mathcal H}=1$ であり、

$$
|E_N(f_\ast)|
=
\left|
\left\langle
\frac{h_{E_N}}{\|h_{E_N}\|},
h_{E_N}
\right\rangle
\right|
=
\|h_{E_N}\|_{\mathcal H}.
$$

従って逆向きの不等式も成立し、

$$
e(Q_N;\mathcal H)
=
\|h_{E_N}\|_{\mathcal H}.
$$

次に二乗ノルムを展開します。

$$
h_{E_N}
=
\sum_nw_nK_{\boldsymbol x_n}
-h_I
$$

なので

$$
\begin{aligned}
\|h_{E_N}\|^2
&=
\langle h_I,h_I\rangle
-
2\sum_nw_n
\langle K_{\boldsymbol x_n},h_I\rangle
\\
&\quad
+
\sum_{m,n}
w_mw_n
\langle
K_{\boldsymbol x_m},
K_{\boldsymbol x_n}
\rangle.
\end{aligned}
$$

積分表現元の性質から

$$
\langle K_{\boldsymbol x_n},h_I\rangle
=
I(K_{\boldsymbol x_n})
=
\int
K(\boldsymbol x_n,\boldsymbol y)
\,d\boldsymbol y.
$$

また

$$
\langle h_I,h_I\rangle
=
I(h_I)
=
\iint
K(\boldsymbol x,\boldsymbol y)
\,d\boldsymbol x\,d\boldsymbol y.
$$

再生性から

$$
\langle
K_{\boldsymbol x_m},
K_{\boldsymbol x_n}
\rangle
=
K(\boldsymbol x_m,\boldsymbol x_n).
$$

これらを代入すれば表示公式を得ます。
<!-- proof-end -->

<!-- definition-example-start: def-qmc2-quadrature-error-representer, def-qmc2-worst-case-error -->
**定義の確認**：$K(x,y)=1+\min(x,y)$ で一点求積

一点

$$
x_1=\frac12,
\qquad
w_1=1
$$

を使います。

前節から

$$
\iint_0^1
K(x,y)\,dx\,dy
=
1+\iint_0^1\min(x,y)\,dx\,dy
=
1+\frac13
=
\frac43.
$$

また

$$
\int_0^1
K\left(\frac12,y\right)dy
=
1+
\int_0^{1/2}y\,dy
+
\int_{1/2}^1\frac12\,dy
=
1+\frac18+\frac14
=
\frac{11}{8}.
$$

さらに

$$
K\left(\frac12,\frac12\right)
=
\frac32.
$$

従って

$$
\begin{aligned}
e(Q_1;\mathcal H)^2
&=
\frac43
-
2\cdot\frac{11}{8}
+
\frac32
\\
&=
\frac{16}{12}
-
\frac{15}{12}
\\
&=
\frac1{12}.
\end{aligned}
$$

よって

$$
\boxed{
e(Q_1;\mathcal H)
=
\frac1{\sqrt{12}}
}.
$$

しかも最悪関数は抽象的にしか存在するのではなく、

$$
f_\ast
=
\frac{h_{E_1}}
{\|h_{E_1}\|}
$$

と具体的に誤差表現元の方向へ取れます。
<!-- definition-example-end -->

---

## 3. QMC1 の誤差評価との違い

QMC1 の Koksma--Hlawka の不等式は

$$
|Q_N(f)-I(f)|
\le
V_{\mathrm{HK}}(f)
D_N^\ast(P_N)
$$

でした。

これは

$$
\text{関数側の変動}
\times
\text{点集合側の一様性}
$$

という分離を与えます。

一方 RKHS では、関数クラスを単位球

$$
\|f\|_{\mathcal H}\le1
$$

として固定すると、

$$
e(Q_N;\mathcal H)^2
$$

を核 $K$ と点集合だけから直接計算できます。

したがって点集合設計の目標は

$$
\boxed{
\sum_{n=1}^Nw_nK_{\boldsymbol x_n}
\approx
h_I
}
$$

とすること、すなわち積分表現元を核関数 $K_{\boldsymbol x_n}$ の有限和で近似することだと読めます。

この見方は QMC3 の格子則や、その後のデジタル構成で「どの点集合が関数空間に合っているか」を考える土台になります。

---

## 4. 一次元の重み付き Sobolev 構造

GPDE3 で [Sobolev 空間 $W^{k,p}$](../GPDE3/index.md#def-gpde3-sobolev-space) を導入しました。ここではその一次元・一階・$p=2$ の考え方を QMC 向けに変形し、0 での関数値と導関数に座標重みを入れた空間を作ります。

高次元 QMC で重みが必要になる理由を見るため、まず一次元から始めます。

$\gamma>0$ とします。

<a id="def-qmc2-weighted-anchored-sobolev"></a>
<!-- formal-statement-start -->
### 定義（一次元重み付きアンカー型 Sobolev 空間）

$\gamma>0$ とする。

関数 $f:[0,1]\to\mathbb R$ で、ある $v\in L^2(0,1)$ が存在して

$$
f(x)
=
f(0)
+
\int_0^x v(t)\,dt
$$

と書けるもの全体を $\mathcal H_\gamma$ とする。この $v$ を $f'$ と書く。

内積を

$$
\boxed{
\langle f,h\rangle_{\mathcal H_\gamma}
=
f(0)h(0)
+
\frac1\gamma
\int_0^1
f'(t)h'(t)\,dt
}
$$

で与える。
<!-- formal-statement-end -->

ここで $v\in L^2(0,1)$ なら [Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\int_0^1|v(t)|\,dt
\le
\|v\|_2
$$

なので、上の不定積分は各 $x$ で有限です。

ここで一つだけ、本章の射程外の解析結果を意図的に使います。

> **意図的黒箱（Lebesgue 積分の微積分基本定理）**  
> $v\in L^1(0,1)$ に対して
> $F(x)=\int_0^xv(t)\,dt$ と置くと、$F$ は絶対連続であり、
> $F'(x)=v(x)$ がほとんど至る所成り立つ。
>
> この結果の証明には Lebesgue 微分定理など、本章の QMC 主線を大きく外れる実解析が必要になるため、ここでは標準結果として使う。本章で必要なのは「不定積分から作った関数のほとんど至る所（almost everywhere; a.e.）の導関数を元の $L^2$ 関数として回収できる」という部分だけである。

$L^2(0,1)\subset L^1(0,1)$ なのでこの結果を適用でき、$f'$ は $L^2$ の元として一意です。

<a id="thm-qmc2-weighted-sobolev-kernel"></a>
<!-- formal-statement-start -->
### 定理（一次元重み付きアンカー型 Sobolev 空間の再生核）

$\mathcal H_\gamma$ は Hilbert 空間であり、

$$
\boxed{
K_\gamma(x,y)
=
1+\gamma\min(x,y)
}
$$

を再生核とする再生核 Hilbert 空間である。
<!-- formal-statement-end -->

### 証明の見取り図

まず

$$
T:
\mathcal H_\gamma
\to
\mathbb R\times L^2(0,1),
\qquad
Tf
=
\left(
f(0),
\frac{f'}{\sqrt\gamma}
\right)
$$

を考えます。

この写像は内積を保ち、任意の $(a,w)\in\mathbb R\times L^2$ から

$$
f(x)
=
a+\sqrt\gamma\int_0^xw(t)\,dt
$$

を作れるので全射です。従って $\mathcal H_\gamma$ は [L^2 の完備性](../F0_00D2E_L2完備性_Riesz_Fischer/index.md#thm-f0-00d2e-01)を引き継ぎます。

その後、$K_{\gamma,y}$ の導関数を直接計算して再生性を確認します。

<!-- proof-start -->
### 証明

写像

$$
T:
\mathcal H_\gamma
\to
\mathbb R\times L^2(0,1),
\qquad
Tf
=
\left(
f(0),
\frac{f'}{\sqrt\gamma}
\right)
$$

を考えます。

$f,h\in\mathcal H_\gamma$ に対し、

$$
\begin{aligned}
\langle Tf,Th\rangle_{\mathbb R\times L^2}
&=
f(0)h(0)
+
\int_0^1
\frac{f'(t)}{\sqrt\gamma}
\frac{h'(t)}{\sqrt\gamma}
\,dt
\\
&=
\langle f,h\rangle_{\mathcal H_\gamma}.
\end{aligned}
$$

従って $T$ は等長線形写像です。

次に任意の

$$
(a,w)
\in
\mathbb R\times L^2(0,1)
$$

を取ります。

$$
f(x)
=
a
+
\sqrt\gamma
\int_0^xw(t)\,dt
$$

と置けば、$f\in\mathcal H_\gamma$ で

$$
f(0)=a,
\qquad
f'=\sqrt\gamma\,w
$$

がほとんど至る所成り立ちます。

従って

$$
Tf=(a,w),
$$

なので $T$ は全射です。

$\mathbb R$ は完備であり、[L^2 の完備性](../F0_00D2E_L2完備性_Riesz_Fischer/index.md#thm-f0-00d2e-01)から $L^2(0,1)$ も完備です。有限直積 $\mathbb R\times L^2(0,1)$ は積内積について Hilbert 空間なので、それと等長同型な $\mathcal H_\gamma$ も Hilbert 空間です。

次に固定した $y\in[0,1]$ に対し

$$
K_{\gamma,y}(x)
=
1+\gamma\min(x,y)
$$

と置きます。

$$
K_{\gamma,y}(0)=1
$$

であり、ほとんど至る所

$$
K_{\gamma,y}'(x)
=
\gamma\boldsymbol1_{[0,y)}(x).
$$

この導関数は $L^2(0,1)$ に属するので

$$
K_{\gamma,y}
\in
\mathcal H_\gamma.
$$

任意の $f\in\mathcal H_\gamma$ に対して

$$
\begin{aligned}
\langle
f,K_{\gamma,y}
\rangle_{\mathcal H_\gamma}
&=
f(0)
+
\frac1\gamma
\int_0^1
f'(x)
\gamma\boldsymbol1_{[0,y)}(x)
\,dx
\\
&=
f(0)
+
\int_0^y
f'(x)\,dx
\\
&=
f(y).
\end{aligned}
$$

最後の等号は $\mathcal H_\gamma$ の定義そのものから従います。

従って点評価は $K_{\gamma,y}$ との内積で再現されるので、

$$
K_\gamma(x,y)
=
1+\gamma\min(x,y)
$$

は $\mathcal H_\gamma$ の再生核です。
<!-- proof-end -->

ここで重み $\gamma$ の意味も見えます。

ノルムには

$$
\frac1\gamma
\int|f'|^2
$$

が入るため、$\gamma$ が小さいほど、同じ大きさの導関数を持つ関数は単位球へ入りにくくなります。

つまり小さい重みは

$$
\boxed{
\text{その座標方向へ大きく変化する関数を強く罰する}
}
$$

役割を持ちます。

<!-- definition-example-start: def-qmc2-weighted-anchored-sobolev -->
**定義の確認**：線形関数 $f(x)=ax+b$

$$
f(0)=b,
\qquad
f'(x)=a
$$

なので

$$
\|f\|_{\mathcal H_\gamma}^2
=
b^2+\frac{a^2}{\gamma}.
$$

例えば $a=1,b=0$ なら

$$
\|f\|_{\mathcal H_\gamma}
=
\frac1{\sqrt\gamma}.
$$

$\gamma=1$ ではノルムは $1$、$\gamma=10^{-2}$ ではノルムは $10$ です。

従って小さい $\gamma$ は、この方向へ傾く関数を単位球から強く押し出します。
<!-- definition-example-end -->

---

## 5. 多次元では座標ごとに重みを持たせる

$S=\{1,\ldots,s\}$ とします。

各部分集合 $u\subseteq S$ に非負重み $\gamma_u$ を与え、$\gamma_\emptyset=1$ とします。

次の核を考えます。

$$
K_{s,\gamma}
(\boldsymbol x,\boldsymbol y)
=
\sum_{u\subseteq S}
\gamma_u
\prod_{j\in u}
\min(x_j,y_j).
$$

空積は $1$ とします。

この核が半正定値であることは直接確認できます。

実係数 $c_1,\ldots,c_M$ と点 $\boldsymbol x_1,\ldots,\boldsymbol x_M$ を取ります。

各 $u$ について

$$
\prod_{j\in u}
\min(x_{m,j},x_{n,j})
=
\int_{[0,1]^{|u|}}
\prod_{j\in u}
\boldsymbol1_{\{t_j\le x_{m,j}\}}
\boldsymbol1_{\{t_j\le x_{n,j}\}}
\,d\boldsymbol t_u.
$$

従って

$$
\begin{aligned}
&\sum_{m,n=1}^M
c_mc_n
K_{s,\gamma}
(\boldsymbol x_m,\boldsymbol x_n)
\\
&=
\sum_{u\subseteq S}
\gamma_u
\int
\left(
\sum_{m=1}^M
c_m
\prod_{j\in u}
\boldsymbol1_{\{t_j\le x_{m,j}\}}
\right)^2
d\boldsymbol t_u
\\
&\ge0.
\end{aligned}
$$

従って [Moore--Aronszajn の定理](../F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md#thm-f0-02c7-moore-aronszajn)から、この核を再生核とする RKHS が存在します。

<a id="def-qmc2-product-weights"></a>
<!-- formal-statement-start -->
### 定義（積型重み）

正数列

$$
\gamma_1,\ldots,\gamma_s
$$

に対して、部分集合重みが

$$
\boxed{
\gamma_u
=
\prod_{j\in u}
\gamma_j
}
$$

で与えられるとき、これを積型重みとする。
<!-- formal-statement-end -->

積型重みなら有限積の展開から

$$
\boxed{
K_{s,\gamma}
(\boldsymbol x,\boldsymbol y)
=
\prod_{j=1}^s
\left(
1+\gamma_j\min(x_j,y_j)
\right)
}
$$

です。

これは一次元の

$$
1+\gamma_j\min(x_j,y_j)
$$

を座標ごとに組み合わせた重み付き Sobolev 型 RKHS です。

<!-- definition-example-start: def-qmc2-product-weights -->
**定義の確認**：二次元

$s=2$ では

$$
\begin{aligned}
K_{2,\gamma}(\boldsymbol x,\boldsymbol y)
&=
1
+
\gamma_1\min(x_1,y_1)
+
\gamma_2\min(x_2,y_2)
\\
&\quad
+
\gamma_1\gamma_2
\min(x_1,y_1)
\min(x_2,y_2).
\end{aligned}
$$

一方、

$$
\begin{aligned}
&
\left(
1+\gamma_1\min(x_1,y_1)
\right)
\left(
1+\gamma_2\min(x_2,y_2)
\right)
\\
&=
1
+
\gamma_1\min(x_1,y_1)
+
\gamma_2\min(x_2,y_2)
\\
&\quad
+
\gamma_1\gamma_2
\min(x_1,y_1)\min(x_2,y_2),
\end{aligned}
$$

なので確かに一致します。
<!-- definition-example-end -->

---

## 6. 積型重みでは最悪誤差を閉じた式で書ける

以下では等重み

$$
w_n=\frac1N
$$

を使います。

まず一次元で必要な積分を計算します。

固定した $x\in[0,1]$ に対して

$$
\int_0^1
\min(x,y)\,dy
=
\int_0^x y\,dy
+
\int_x^1 x\,dy
=
x-\frac{x^2}{2}.
$$

また

$$
\int_0^1\int_0^1
\min(x,y)\,dx\,dy
=
\int_0^1
\left(
x-\frac{x^2}{2}
\right)dx
=
\frac13.
$$

対角では

$$
\min(x,x)=x,
\qquad
\int_0^1x\,dx=\frac12.
$$

積型核では各座標の積分が分離します。

<a id="thm-qmc2-product-weight-wce"></a>
<!-- formal-statement-start -->
### 定理（積型重み Sobolev 核の最悪誤差公式）

積型核

$$
K_{s,\gamma}
(\boldsymbol x,\boldsymbol y)
=
\prod_{j=1}^s
\left(
1+\gamma_j\min(x_j,y_j)
\right)
$$

と等重み求積則

$$
Q_N(f)
=
\frac1N
\sum_{n=1}^N
f(\boldsymbol x_n)
$$

を考える。

このとき

$$
\boxed{
\begin{aligned}
e(Q_N;\mathcal H_{s,\gamma})^2
&=
\prod_{j=1}^s
\left(
1+\frac{\gamma_j}{3}
\right)
\\
&\quad
-
\frac2N
\sum_{n=1}^N
\prod_{j=1}^s
\left[
1+\gamma_j
\left(
x_{n,j}-\frac{x_{n,j}^2}{2}
\right)
\right]
\\
&\quad
+
\frac1{N^2}
\sum_{m=1}^N
\sum_{n=1}^N
\prod_{j=1}^s
\left[
1+\gamma_j
\min(x_{m,j},x_{n,j})
\right].
\end{aligned}
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

一般の最悪誤差公式へ、今計算した三種類の一次元積分を代入するだけです。

積型核なので、多次元積分は座標ごとの積へ分解できます。

<!-- proof-start -->
### 証明

第一項は

$$
\begin{aligned}
A_s
&=
\int_{[0,1]^s}
\int_{[0,1]^s}
K_{s,\gamma}
(\boldsymbol x,\boldsymbol y)
\,d\boldsymbol x\,d\boldsymbol y
\\
&=
\prod_{j=1}^s
\int_0^1\int_0^1
\left(
1+\gamma_j\min(x_j,y_j)
\right)
dx_j\,dy_j
\\
&=
\prod_{j=1}^s
\left(
1+\frac{\gamma_j}{3}
\right).
\end{aligned}
$$

第二項で固定点 $\boldsymbol x_n$ に対し、

$$
\begin{aligned}
b(\boldsymbol x_n)
&=
\int
K_{s,\gamma}
(\boldsymbol x_n,\boldsymbol y)
\,d\boldsymbol y
\\
&=
\prod_{j=1}^s
\int_0^1
\left(
1+\gamma_j\min(x_{n,j},y_j)
\right)
dy_j
\\
&=
\prod_{j=1}^s
\left[
1+\gamma_j
\left(
x_{n,j}
-\frac{x_{n,j}^2}{2}
\right)
\right].
\end{aligned}
$$

第三項は核をそのまま点対へ評価して

$$
K_{s,\gamma}
(\boldsymbol x_m,\boldsymbol x_n)
=
\prod_{j=1}^s
\left[
1+\gamma_j
\min(x_{m,j},x_{n,j})
\right].
$$

一般公式

$$
e^2
=
A_s
-
\frac2N\sum_nb(\boldsymbol x_n)
+
\frac1{N^2}
\sum_{m,n}
K(\boldsymbol x_m,\boldsymbol x_n)
$$

へ代入すれば結論を得ます。
<!-- proof-end -->

この公式は、点集合を作ったあとに「この関数空間に対する誤差保証がどれくらいか」を直接計算する目的関数になります。

---

## 7. 重みの減衰と実効次元

名目上の次元が $s=1000$ でも、1000 座標が同じ重要度とは限りません。

積型重みで

$$
\gamma_1\ge\gamma_2\ge\cdots>0
$$

と減衰していれば、高い座標は核へ弱くしか入らなくなります。

本章では、その効果を測るため次の量を使います。

<a id="def-qmc2-weight-tail-effective-dimension"></a>
<!-- formal-statement-start -->
### 定義（重み尾による実効切断次元）

無限列 $(\gamma_j)_{j\ge1}$ が

$$
\sum_{j=1}^\infty\gamma_j<\infty
$$

を満たすとする。

$\eta>0$ に対して

$$
\boxed{
d_\eta
=
\min
\left\{
d\ge0:
\sum_{j>d}\gamma_j
\le\eta
\right\}
}
$$

を本章での重み尾による実効切断次元とする。
<!-- formal-statement-end -->

これは後続の randomized QMC で扱う 分散分析の分解に基づく実効次元とは別物です。

ここでは「重み付き RKHS の幾何が何次元まででほぼ決まるか」を見るための、核側の指標として使います。

$d<s$ とし、

$$
K_s(\boldsymbol x,\boldsymbol y)
=
\prod_{j=1}^s
\left(
1+\gamma_j\min(x_j,y_j)
\right)
$$

と

$$
K_d(\boldsymbol x,\boldsymbol y)
=
\prod_{j=1}^d
\left(
1+\gamma_j\min(x_j,y_j)
\right)
$$

を比較します。

$0\le\min(x_j,y_j)\le1$ なので

$$
1
\le
\prod_{j>d}
\left(
1+\gamma_j\min(x_j,y_j)
\right)
\le
\exp
\left(
\sum_{j>d}\gamma_j
\right).
$$

従って

$$
0
\le
K_s-K_d
\le
K_d
\left[
\exp
\left(
\sum_{j>d}\gamma_j
\right)-1
\right].
$$

さらに

$$
K_d
\le
\exp
\left(
\sum_{j=1}^d\gamma_j
\right)
$$

だから、$G=\sum_{j=1}^\infty\gamma_j$ とおけば

$$
\boxed{
0
\le
K_s-K_d
\le
e^G
\left(
e^{\sum_{j>d}\gamma_j}-1
\right)
}
$$

です。

つまり重みの尾和が小さければ、核そのものが高次元版と切断版で一様に近くなります。

<!-- definition-example-start: def-qmc2-weight-tail-effective-dimension -->
**定義の確認**：$\gamma_j=2^{-j}$

$$
\sum_{j>d}2^{-j}
=
2^{-d}.
$$

従って

$$
d_\eta
=
\min
\{
d:
2^{-d}\le\eta
\}.
$$

例えば $\eta=2^{-10}$ なら

$$
\boxed{
d_\eta=10
}.
$$

名目上の次元が $s=100$ でも $s=10000$ でも、この重み尾基準では最初の10座標までで尾和を $2^{-10}$ 以下にできます。
<!-- definition-example-end -->

---

## 8. tractability：次元が増えたとき必要点数はどう増えるか

誤差率だけを見ると

$$
e_N
\sim
N^{-\alpha}
$$

の指数に目が向きます。

高次元積分では、次元 $s$ に対して必要点数がどう増えるかも同じくらい重要です。

<a id="def-qmc2-information-complexity"></a>
<!-- formal-statement-start -->
### 定義（最悪誤差そのものを基準とする情報複雑度）

次元 $s$ の RKHS $\mathcal H_s$ に対し、精度 $\varepsilon>0$ を達成するための等重み求積点数を

$$
\boxed{
n(\varepsilon,s)
=
\min
\left\{
N:
\exists P_N\subset[0,1]^s,\ 
e(Q_N;\mathcal H_s)\le\varepsilon
\right\}
}
$$

とする。ただし条件を満たす有限の $N$ が存在しないときは $n(\varepsilon,s)=\infty$ とする。
<!-- formal-statement-end -->

本章では以下、初期誤差などで規格化せず、この最悪誤差そのものを基準として tractability を論じます。

<a id="def-qmc2-polynomial-tractability"></a>
<!-- formal-statement-start -->
### 定義（多項式 tractability）

ある定数 $C,p,q>0$ が存在して、すべての $s\ge1$ と $0<\varepsilon<1$ に対して

$$
\boxed{
n(\varepsilon,s)
\le
C\varepsilon^{-p}s^q
}
$$

が成り立つとき、この積分問題族は多項式 tractability を持つとする。
<!-- formal-statement-end -->

<a id="def-qmc2-strong-polynomial-tractability"></a>
<!-- formal-statement-start -->
### 定義（強多項式 tractability）

ある定数 $C,p>0$ が存在して、すべての $s\ge1$ と $0<\varepsilon<1$ に対して

$$
\boxed{
n(\varepsilon,s)
\le
C\varepsilon^{-p}
}
$$

が成り立つとき、この積分問題族は強多項式 tractability を持つとする。
<!-- formal-statement-end -->

強多項式 tractability では、誤差保証に必要な点数の上界から次元 $s$ が消えます。

<!-- definition-example-start: def-qmc2-information-complexity, def-qmc2-polynomial-tractability, def-qmc2-strong-polynomial-tractability -->
**定義の確認**：次元に依らない $N^{-1/2}$ 上界

もしすべての $s$ について

$$
e(Q_N;\mathcal H_s)
\le
\frac{C_0}{\sqrt N}
$$

を満たす点集合が存在するなら、

$$
\frac{C_0}{\sqrt N}
\le
\varepsilon
$$

には

$$
N
\ge
C_0^2\varepsilon^{-2}
$$

で十分です。

従って

$$
n(\varepsilon,s)
\le
\left\lceil
C_0^2\varepsilon^{-2}
\right\rceil.
$$

右辺は $s$ に依存しないので、これは強多項式 tractability の具体例です。
<!-- definition-example-end -->

---

## 9. 乱数点を使うと「よい決定論的点集合の存在」を証明できる

ここで MC1 の考え方を一度だけ借ります。

独立一様乱数点

$$
\boldsymbol X_1,\ldots,\boldsymbol X_N
$$

を取り、それらを単なるランダムな候補点集合とみなします。

ランダム点で平均した最悪誤差が小さいなら、少なくとも一つはその平均以下の決定論的実現が存在します。

積型核について

$$
A_s
=
\iint
K_{s,\gamma}
(\boldsymbol x,\boldsymbol y)
\,d\boldsymbol x\,d\boldsymbol y
=
\prod_{j=1}^s
\left(
1+\frac{\gamma_j}{3}
\right)
$$

とおきます。

対角平均は

$$
D_s
=
\int
K_{s,\gamma}
(\boldsymbol x,\boldsymbol x)
\,d\boldsymbol x
=
\prod_{j=1}^s
\left(
1+\frac{\gamma_j}{2}
\right)
$$

です。

<a id="thm-qmc2-random-point-existence"></a>
<!-- formal-statement-start -->
### 定理（乱数点平均から得る最悪誤差の存在上界）

$\boldsymbol X_1,\ldots,\boldsymbol X_N$ を $[0,1]^s$ 上の独立一様乱数点とする。

等重み求積則の最悪誤差について

$$
\boxed{
\mathbb E
\left[
e(Q_N;\mathcal H_{s,\gamma})^2
\right]
=
\frac{D_s-A_s}{N}
}
$$

が成り立つ。

従って少なくとも一つの決定論的点集合 $P_N$ が存在して

$$
\boxed{
e(Q_N;\mathcal H_{s,\gamma})^2
\le
\frac{D_s-A_s}{N}
}
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

最悪誤差公式の三項を期待値に入れます。

線形項の期待値は $A_s$ です。二重和では $m\ne n$ の項も $A_s$ ですが、対角項だけは $D_s$ になります。この差が最後に $1/N$ だけ残ります。

<!-- proof-start -->
### 証明

ランダム点集合に対する最悪誤差平方は

$$
e^2
=
A_s
-
\frac2N
\sum_{n=1}^N
b(\boldsymbol X_n)
+
\frac1{N^2}
\sum_{m,n=1}^N
K(\boldsymbol X_m,\boldsymbol X_n),
$$

ただし

$$
b(\boldsymbol x)
=
\int
K(\boldsymbol x,\boldsymbol y)
\,d\boldsymbol y
$$

です。

まず

$$
\mathbb E[b(\boldsymbol X_n)]
=
\int
b(\boldsymbol x)\,d\boldsymbol x
=
A_s.
$$

従って第二項の期待値は

$$
-\frac2N
\sum_{n=1}^N
A_s
=
-2A_s.
$$

第三項を対角と非対角に分けます。

$m=n$ なら

$$
\mathbb E[
K(\boldsymbol X_n,\boldsymbol X_n)
]
=
D_s.
$$

$m\ne n$ なら独立性から

$$
\mathbb E[
K(\boldsymbol X_m,\boldsymbol X_n)
]
=
\iint
K(\boldsymbol x,\boldsymbol y)
\,d\boldsymbol x\,d\boldsymbol y
=
A_s.
$$

対角項は $N$ 個、非対角項は $N(N-1)$ 個なので

$$
\begin{aligned}
\mathbb E[e^2]
&=
A_s
-
2A_s
+
\frac1{N^2}
\left[
ND_s
+
N(N-1)A_s
\right]
\\
&=
-A_s
+
\frac{D_s}{N}
+
\frac{N-1}{N}A_s
\\
&=
\frac{D_s-A_s}{N}.
\end{aligned}
$$

非負確率変数 $e^2$ のすべての実現が平均より大きいことはあり得ません。

従って少なくとも一つの実現で

$$
e^2
\le
\frac{D_s-A_s}{N}
$$

が成立します。
<!-- proof-end -->

これは「乱数点をそのまま QMC として推奨する」定理ではありません。

確率論を使って、良い決定論的点集合が少なくとも存在することを示す確率的方法です。

---

## 10. 重みが可算和可能なら強多項式 tractability が得られる

ここで重みの減衰が計算量へ直接効きます。

<a id="thm-qmc2-summable-weights-tractability"></a>
<!-- formal-statement-start -->
### 定理（可算和可能な積型重みによる強多項式 tractability）

正数列 $(\gamma_j)_{j\ge1}$ が

$$
\boxed{
\sum_{j=1}^\infty
\gamma_j
=
G
<
\infty
}
$$

を満たすとする。

各次元 $s$ で、積型核

$$
K_{s,\gamma}
(\boldsymbol x,\boldsymbol y)
=
\prod_{j=1}^s
\left(
1+\gamma_j\min(x_j,y_j)
\right)
$$

に対応する RKHS を考える。

このとき任意の $s,N$ に対して、ある等重み $N$ 点求積則が存在し、

$$
\boxed{
e(Q_N;\mathcal H_{s,\gamma})
\le
e^{G/4}N^{-1/2}
}
$$

を満たす。

従って

$$
\boxed{
n(\varepsilon,s)
\le
\left\lceil
e^{G/2}\varepsilon^{-2}
\right\rceil
}
$$

であり、この積分問題族は強多項式 tractability を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

前定理では

$$
e^2
\le
\frac{D_s-A_s}{N}
\le
\frac{D_s}{N}
$$

を満たす点集合が存在しました。

残る問題は $D_s$ が次元とともに爆発しないことです。

可算和可能性から

$$
\prod_{j=1}^s
\left(
1+\frac{\gamma_j}{2}
\right)
$$

を指数関数で一様に抑えられます。

<!-- proof-start -->
### 証明

前定理から、ある点集合について

$$
e(Q_N;\mathcal H_{s,\gamma})^2
\le
\frac{D_s-A_s}{N}
\le
\frac{D_s}{N}.
$$

ここで

$$
D_s
=
\prod_{j=1}^s
\left(
1+\frac{\gamma_j}{2}
\right).
$$

$x\ge0$ に対して

$$
1+x\le e^x
$$

なので

$$
D_s
\le
\prod_{j=1}^s
e^{\gamma_j/2}
=
\exp
\left(
\frac12
\sum_{j=1}^s\gamma_j
\right)
\le
e^{G/2}.
$$

従って

$$
e(Q_N;\mathcal H_{s,\gamma})^2
\le
\frac{e^{G/2}}{N}.
$$

平方根を取って

$$
e(Q_N;\mathcal H_{s,\gamma})
\le
e^{G/4}N^{-1/2}.
$$

この右辺を $\varepsilon$ 以下にするには

$$
N
\ge
e^{G/2}\varepsilon^{-2}
$$

で十分です。

従って

$$
n(\varepsilon,s)
\le
\left\lceil
e^{G/2}\varepsilon^{-2}
\right\rceil.
$$

さらに $0<\varepsilon<1$ では

$$
\left\lceil
e^{G/2}\varepsilon^{-2}
\right\rceil
\le
\left(
e^{G/2}+1
\right)
\varepsilon^{-2}.
$$

したがって強多項式 tractability の定義で

$$
C=e^{G/2}+1,
\qquad
p=2
$$

と取れます。
<!-- proof-end -->

### 仮定を落とすと何が壊れるか

例えば

$$
\gamma_j=\gamma>0
$$

を全座標で固定すると、

$$
D_s
=
\left(
1+\frac{\gamma}{2}
\right)^s
$$

です。

従って上の存在証明から得られる上界は

$$
e^2
\le
\frac1N
\left(
1+\frac{\gamma}{2}
\right)^s
$$

程度まで悪化し、次元に依らない定数を取り出せません。

重要なのは、

$$
\boxed{
\text{この議論が壊れる}
\not\Rightarrow
\text{直ちに問題が非 tractable}
}
$$

という点です。

失われたのは「重み和の有限性から対角平均 $D_s$ を一様に抑える」という証明機構です。非 tractability を結論するには別の下界が必要です。

---

## 11. この章から得られる設計の見方

QMC1 では

$$
\text{低ディスクレパンシー}
\Longrightarrow
\text{有界変動関数で小さい誤差}
$$

という設計原理を得ました。

QMC2 では

$$
\boxed{
\text{よい点集合}
\Longleftrightarrow
\left\|
\frac1N
\sum_{n=1}^N
K_{\boldsymbol x_n}
-h_I
\right\|_{\mathcal H}
\text{ が小さい}
}
$$

という別の設計原理を得ました。

さらに重み付き空間では、

$$
\gamma_j\downarrow0
$$

によって高い座標の重要度を弱められます。

その結果、

$$
\sum_j\gamma_j<\infty
$$

なら、少なくとも存在論的には名目次元に依らない点数上界が得られました。

ただし、ここまでの議論は

$$
\boxed{
\text{よい点集合が存在する}
}
$$

ところまでです。

実際にその点集合をどう作るかはまだ答えていません。

QMC3 では rank-1 格子則へ進み、周期構造と双対格子を使って、最悪誤差を小さくする点集合を構成する側へ移ります。

---

# 演習

## Level A

### QMC2-A01 積分表現元を直接計算する

一次元核

$$
K(x,y)
=
1+\min(x,y)
$$

について、積分表現元

$$
h_I(x)
=
\int_0^1K(x,y)\,dy
$$

を計算せよ。

また

$$
h_I(0),\qquad h_I(1)
$$

を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

固定した $x\in[0,1]$ に対し、

$$
\min(x,y)
=
\begin{cases}
y,&0\le y\le x,\\
x,&x<y\le1.
\end{cases}
$$

従って

$$
\begin{aligned}
h_I(x)
&=
\int_0^1
\{1+\min(x,y)\}\,dy
\\
&=
1
+
\int_0^xy\,dy
+
\int_x^1x\,dy
\\
&=
1+\frac{x^2}{2}+x(1-x)
\\
&=
\boxed{
1+x-\frac{x^2}{2}
}.
\end{aligned}
$$

端点では

$$
h_I(0)=1,
$$

$$
h_I(1)
=
1+1-\frac12
=
\boxed{\frac32}.
$$
<!-- solution-end -->

### QMC2-A02 一点求積の最悪誤差

同じ核

$$
K(x,y)=1+\min(x,y)
$$

で

$$
Q_1(f)
=
f\left(\frac12\right)
$$

とする。

最悪誤差平方を一般公式から計算し、

$$
e(Q_1;\mathcal H)
=
\frac1{\sqrt{12}}
$$

を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

一般公式は

$$
e^2
=
\iint K
-
2\int K\left(\frac12,y\right)dy
+
K\left(\frac12,\frac12\right)
$$

です。

第一項は

$$
\iint K
=
1+\iint\min(x,y)\,dx\,dy
=
1+\frac13
=
\frac43.
$$

第二項の積分は

$$
\begin{aligned}
\int_0^1
K\left(\frac12,y\right)dy
&=
1+
\int_0^{1/2}y\,dy
+
\int_{1/2}^1\frac12\,dy
\\
&=
1+\frac18+\frac14
\\
&=
\frac{11}{8}.
\end{aligned}
$$

第三項は

$$
K\left(\frac12,\frac12\right)
=
1+\frac12
=
\frac32.
$$

従って

$$
\begin{aligned}
e^2
&=
\frac43
-
2\cdot\frac{11}{8}
+
\frac32
\\
&=
\frac{16}{12}
-
\frac{33}{12}
+
\frac{18}{12}
\\
&=
\frac1{12}.
\end{aligned}
$$

よって

$$
\boxed{
e=\frac1{\sqrt{12}}
}.
$$
<!-- solution-end -->

### QMC2-A03 積型重みの因数分解

$s=3$ とし、

$$
\gamma_u
=
\prod_{j\in u}\gamma_j
$$

とする。

$$
\sum_{u\subseteq\{1,2,3\}}
\gamma_u
\prod_{j\in u}
\min(x_j,y_j)
$$

を展開し、

$$
\prod_{j=1}^3
\left(
1+\gamma_j\min(x_j,y_j)
\right)
$$

と一致することを確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$m_j=\min(x_j,y_j)$ と略記します。

部分集合は

$$
\emptyset,
\{1\},
\{2\},
\{3\},
\{1,2\},
\{1,3\},
\{2,3\},
\{1,2,3\}
$$

の8個です。

従って和は

$$
\begin{aligned}
1
&+
\gamma_1m_1
+
\gamma_2m_2
+
\gamma_3m_3
\\
&+
\gamma_1\gamma_2m_1m_2
+
\gamma_1\gamma_3m_1m_3
+
\gamma_2\gamma_3m_2m_3
\\
&+
\gamma_1\gamma_2\gamma_3m_1m_2m_3.
\end{aligned}
$$

一方、

$$
(1+\gamma_1m_1)
(1+\gamma_2m_2)
(1+\gamma_3m_3)
$$

を分配法則で展開すると、各 $j$ について $1$ を選ぶか $\gamma_jm_j$ を選ぶかの8通りが現れます。

従って全く同じ8項となり、

$$
\boxed{
\sum_{u}
\gamma_u
\prod_{j\in u}m_j
=
\prod_{j=1}^3(1+\gamma_jm_j)
}
$$

です。
<!-- solution-end -->

### QMC2-A04 初期積分量と対角平均

積型核

$$
K_{s,\gamma}
(\boldsymbol x,\boldsymbol y)
=
\prod_{j=1}^s
\left(
1+\gamma_j\min(x_j,y_j)
\right)
$$

について

$$
A_s
=
\iint
K_{s,\gamma}
(\boldsymbol x,\boldsymbol y)
\,d\boldsymbol x\,d\boldsymbol y
$$

と

$$
D_s
=
\int
K_{s,\gamma}
(\boldsymbol x,\boldsymbol x)
\,d\boldsymbol x
$$

を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

積型なので各座標へ分離できます。

まず

$$
\int_0^1\int_0^1
\min(x,y)\,dx\,dy
=
\frac13.
$$

従って

$$
\begin{aligned}
A_s
&=
\prod_{j=1}^s
\int_0^1\int_0^1
\left(
1+\gamma_j\min(x_j,y_j)
\right)
dx_j\,dy_j
\\
&=
\boxed{
\prod_{j=1}^s
\left(
1+\frac{\gamma_j}{3}
\right)
}.
\end{aligned}
$$

対角では

$$
K_{s,\gamma}
(\boldsymbol x,\boldsymbol x)
=
\prod_{j=1}^s
(1+\gamma_jx_j).
$$

従って

$$
\begin{aligned}
D_s
&=
\prod_{j=1}^s
\int_0^1
(1+\gamma_jx_j)\,dx_j
\\
&=
\boxed{
\prod_{j=1}^s
\left(
1+\frac{\gamma_j}{2}
\right)
}.
\end{aligned}
$$
<!-- solution-end -->

## Level B

### QMC2-B01 誤差表現元から最悪誤差公式を導く

一般の実数重み $w_1,\ldots,w_N$ に対して

$$
h_{E_N}
=
\sum_{n=1}^N
w_nK_{\boldsymbol x_n}
-h_I
$$

とする。

1. $e(Q_N;\mathcal H)=\|h_{E_N}\|_{\mathcal H}$ を示せ。
2. 二乗ノルムを展開して核だけからなる最悪誤差公式を導け。
3. $h_{E_N}\ne0$ のとき、最悪誤差を実現する単位ノルム関数を一つ書け。

- Level: B

<!-- solution-start -->
#### 詳細解答

1. 任意の $\|f\|\le1$ に対して

$$
|Q_N(f)-I(f)|
=
|\langle f,h_{E_N}\rangle|
\le
\|f\|\|h_{E_N}\|
\le
\|h_{E_N}\|.
$$

従って

$$
e(Q_N;\mathcal H)
\le
\|h_{E_N}\|.
$$

$h_{E_N}\ne0$ なら

$$
f_\ast
=
\frac{h_{E_N}}{\|h_{E_N}\|}
$$

と取れます。

すると $\|f_\ast\|=1$ で

$$
|E_N(f_\ast)|
=
\|h_{E_N}\|.
$$

$h_{E_N}=0$ の場合は両辺 $0$ です。

よって

$$
\boxed{
e(Q_N;\mathcal H)=\|h_{E_N}\|
}.
$$

2. 二乗すると

$$
\begin{aligned}
e^2
&=
\left\|
\sum_nw_nK_{\boldsymbol x_n}
-h_I
\right\|^2
\\
&=
\|h_I\|^2
-
2\sum_nw_n
\langle K_{\boldsymbol x_n},h_I\rangle
\\
&\quad
+
\sum_{m,n}
w_mw_n
\langle K_{\boldsymbol x_m},K_{\boldsymbol x_n}\rangle.
\end{aligned}
$$

各項は

$$
\|h_I\|^2
=
\iint K(\boldsymbol x,\boldsymbol y)
\,d\boldsymbol x\,d\boldsymbol y,
$$

$$
\langle K_{\boldsymbol x_n},h_I\rangle
=
\int
K(\boldsymbol x_n,\boldsymbol y)\,d\boldsymbol y,
$$

$$
\langle K_{\boldsymbol x_m},K_{\boldsymbol x_n}\rangle
=
K(\boldsymbol x_m,\boldsymbol x_n)
$$

です。

従って

$$
\boxed{
\begin{aligned}
e^2
&=
\iint K
-
2\sum_nw_n\int K(\boldsymbol x_n,\boldsymbol y)d\boldsymbol y
\\
&\quad
+
\sum_{m,n}
w_mw_nK(\boldsymbol x_m,\boldsymbol x_n)
\end{aligned}
}
$$

3. 最悪誤差を実現する一つの関数は

$$
\boxed{
f_\ast
=
\frac{h_{E_N}}{\|h_{E_N}\|}
}
$$

です。
<!-- solution-end -->

### QMC2-B02 乱数点平均の最悪誤差平方

$\boldsymbol X_1,\ldots,\boldsymbol X_N$ を独立一様乱数点とする。

$$
A_s
=
\iint K,
\qquad
D_s
=
\int K(\boldsymbol x,\boldsymbol x)d\boldsymbol x
$$

とおく。

等重み求積則について

$$
\mathbb E[e^2]
=
\frac{D_s-A_s}{N}
$$

を導け。

特に二重和で対角項と非対角項を分ける理由を明示せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

等重み最悪誤差は

$$
e^2
=
A_s
-
\frac2N
\sum_n
b(\boldsymbol X_n)
+
\frac1{N^2}
\sum_{m,n}
K(\boldsymbol X_m,\boldsymbol X_n),
$$

ただし

$$
b(\boldsymbol x)
=
\int K(\boldsymbol x,\boldsymbol y)d\boldsymbol y
$$

です。

まず

$$
\mathbb E[b(\boldsymbol X_n)]
=
\int b(\boldsymbol x)d\boldsymbol x
=
A_s.
$$

従って線形項は

$$
-\frac2N
\sum_nA_s
=
-2A_s.
$$

二重和では $m=n$ と $m\ne n$ で分布が異なります。

$m=n$ なら同じ乱数点を2回入れるので

$$
\mathbb E[
K(\boldsymbol X_n,\boldsymbol X_n)
]
=
D_s.
$$

一方 $m\ne n$ なら独立性から

$$
\mathbb E[
K(\boldsymbol X_m,\boldsymbol X_n)
]
=
A_s.
$$

対角は $N$ 項、非対角は $N(N-1)$ 項です。

従って

$$
\begin{aligned}
\mathbb E[e^2]
&=
A_s
-
2A_s
+
\frac1{N^2}
\left[
ND_s+N(N-1)A_s
\right]
\\
&=
-A_s
+\frac{D_s}{N}
+\frac{N-1}{N}A_s
\\
&=
\boxed{
\frac{D_s-A_s}{N}
}.
\end{aligned}
$$

対角項を非対角項と同じ $A_s$ として扱うと、同一乱数点を独立な2点と誤認することになります。ここが分離の必要な箇所です。
<!-- solution-end -->

### QMC2-B03 幾何級数重みの実効切断次元

$$
\gamma_j=2^{-j}
$$

とする。

1. $\sum_{j>d}\gamma_j$ を求めよ。
2. $d_\eta$ を $\eta$ から求める条件を書け。
3. $G=\sum_{j=1}^\infty\gamma_j$ を求め、核切断誤差の上界

$$
0
\le
K_s-K_d
\le
e^G
\left(
e^{\sum_{j>d}\gamma_j}-1
\right)
$$

へ代入せよ。
4. $\eta=2^{-10}$ のとき $d_\eta$ を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

1. 幾何級数から

$$
\sum_{j=d+1}^\infty2^{-j}
=
\frac{2^{-(d+1)}}{1-\frac12}
=
\boxed{2^{-d}}.
$$

2. 定義から

$$
d_\eta
=
\min\{d:2^{-d}\le\eta\}.
$$

従って同値に

$$
d
\ge
\log_2\frac1\eta
$$

を満たす最小整数です。

3. 全重み和は

$$
G
=
\sum_{j=1}^\infty2^{-j}
=
1.
$$

従って

$$
0
\le
K_s-K_d
\le
\boxed{
e\left(e^{2^{-d}}-1\right)
}.
$$

$d$ が大きいほど右辺は $0$ へ下がります。

4. $\eta=2^{-10}$ なら

$$
2^{-d}\le2^{-10}
$$

には $d\ge10$ が必要です。

最小値は

$$
\boxed{d_\eta=10}.
$$
<!-- solution-end -->

## Level C

### QMC2-C01 可算和可能重みと強多項式 tractability

積型重み $(\gamma_j)_{j\ge1}$ が

$$
\sum_{j=1}^\infty\gamma_j
=
G
<
\infty
$$

を満たすとする。

1. 乱数点平均の存在上界から、ある決定論的 $N$ 点集合について

$$
e^2
\le
\frac{D_s}{N}
$$

を得よ。
2.

$$
D_s
=
\prod_{j=1}^s
\left(
1+\frac{\gamma_j}{2}
\right)
$$

に $1+x\le e^x$ を使い、

$$
D_s\le e^{G/2}
$$

を示せ。
3. 強多項式 tractability の点数上界を導け。
4. $\gamma_j=\gamma>0$ を全座標で固定した場合、同じ証明のどこが壊れるか説明せよ。
5. 4 から直ちに「非 tractable」と結論してはいけない理由を説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

1. 乱数点について

$$
\mathbb E[e^2]
=
\frac{D_s-A_s}{N}
$$

でした。

従って少なくとも一つの実現で

$$
e^2
\le
\frac{D_s-A_s}{N}.
$$

$A_s\ge0$ なので

$$
\boxed{
e^2
\le
\frac{D_s}{N}
}
$$

です。

2. 各 $\gamma_j\ge0$ に対して

$$
1+\frac{\gamma_j}{2}
\le
e^{\gamma_j/2}.
$$

よって

$$
\begin{aligned}
D_s
&=
\prod_{j=1}^s
\left(
1+\frac{\gamma_j}{2}
\right)
\\
&\le
\prod_{j=1}^s
e^{\gamma_j/2}
\\
&=
\exp
\left(
\frac12
\sum_{j=1}^s\gamma_j
\right)
\\
&\le
\boxed{e^{G/2}}.
\end{aligned}
$$

3. 1 と 2 から

$$
e^2
\le
\frac{e^{G/2}}{N}
$$

なので

$$
e
\le
e^{G/4}N^{-1/2}.
$$

これを $\varepsilon$ 以下にするには

$$
N
\ge
e^{G/2}\varepsilon^{-2}
$$

で十分です。

従って

$$
\boxed{
n(\varepsilon,s)
\le
\left\lceil
e^{G/2}\varepsilon^{-2}
\right\rceil
}.
$$

右辺に $s$ が現れないので強多項式 tractability です。

4. $\gamma_j=\gamma>0$ なら

$$
\sum_{j=1}^\infty\gamma_j
=
\infty
$$

で、可算和可能性を失います。

実際、

$$
D_s
=
\left(
1+\frac{\gamma}{2}
\right)^s
$$

なので $s$ とともに指数的に増えます。

従って

$$
D_s\le C
$$

という次元一様上界を作れず、

$$
e^2\le\frac{C}{N}
$$

の $C$ を次元に依らず固定する証明機構が壊れます。

5. ここで示したのは、特定の存在上界を作る方法が次元一様でなくなることだけです。

非 tractability を示すには、

$$
n(\varepsilon,s)
$$

がどんな点集合を選んでも速く増えることを示す下界が必要です。

上界証明の失敗だけでは、そのような下界は得られません。

従って

$$
\boxed{
\text{この証明が失敗する}
\not\Rightarrow
\text{非 tractable}
}
$$

です。
<!-- solution-end -->

---

## 12. まとめ

本章では、QMC1 のディスクレパンシー型評価とは別に、RKHS を使う準 Monte Carlo 誤差解析の骨格を作りました。

積分汎関数は連続なら Riesz 表現を持ち、

$$
I(f)
=
\langle f,h_I\rangle_{\mathcal H}.
$$

点評価も再生核で表されるので、求積誤差全体は

$$
Q_N(f)-I(f)
=
\langle f,h_{E_N}\rangle_{\mathcal H}
$$

となります。

従って単位球上の最悪誤差は

$$
\boxed{
e(Q_N;\mathcal H)
=
\|h_{E_N}\|_{\mathcal H}
}
$$

です。

積型重み付き Sobolev 核

$$
K_{s,\gamma}
(\boldsymbol x,\boldsymbol y)
=
\prod_{j=1}^s
\left(
1+\gamma_j\min(x_j,y_j)
\right)
$$

では、最悪誤差を点座標と重みだけの閉じた式にできます。

さらに

$$
\sum_{j=1}^\infty\gamma_j<\infty
$$

なら

$$
D_s
=
\prod_{j=1}^s
\left(
1+\frac{\gamma_j}{2}
\right)
$$

が次元一様に抑えられ、確率的方法から

$$
e(Q_N)
\le
e^{G/4}N^{-1/2}
$$

を満たす決定論的点集合の存在が得られます。

これにより、重みが高次元 QMC の「実質的に重要な座標」を制御し、tractability と結びつく仕組みが見えました。

次の QMC3 では、存在だけでなく構成へ進みます。rank-1 格子則、双対格子、周波数側の積分誤差、CBC 構成の思想を扱います。
