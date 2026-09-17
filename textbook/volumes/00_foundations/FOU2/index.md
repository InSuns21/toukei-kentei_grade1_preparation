# FOU2 Fourier級数の収束・Fejér・Parseval

FOU1 では、周期関数から Fourier 係数を取り出し、有限次数の Fourier 和 $S_Nf$ が固定次数の三角多項式の中で二乗誤差を最小にするところまでを、有限和と Riemann 積分だけで閉じました。

ここから先には三つの別々の問いがあります。

- 各点 $x$ で $S_Nf(x)$ は何へ近づくのか。
- 波形全体として最大誤差まで小さくなるのか。
- 各点の値ではなく、一周期の二乗誤差を測るとどうなるのか。

この三つを同じ「収束」で済ませると、跳躍点・Gibbs 現象・係数の二乗和と元の二乗積分を結ぶ等式の役割が見えなくなります。本章ではまず収束概念を分け、その後

```text
Dirichlet核
  ↓
各点収束と跳躍点の平均
  ↓
Gibbs現象

Fejér核
  ↓
連続関数への一様収束
  ↓
三角多項式の一様稠密性
  ↓
区分的連続関数への二乗平均近似
  ↓
FOU1の固定次数最小二乗性
  ↓
Fourier有限和の二乗平均収束
  ↓
Parseval等式・完全性
```

という二本の流れを最後に合流させます。

直接の前提は [FOU1 Fourier級数・係数計算](../FOU1/index.md) です。旧 `F0_00FA1_Fourier級数_直交展開` は証明依存先にしません。Lebesgue 積分や Hilbert 空間の一般論も本章の証明には使わず、区分的連続関数と Riemann 積分の範囲で閉じます。

---

## 1. 「収束」を三種類に分ける

$2\pi$ 周期関数列 $(f_N)$ と $2\pi$ 周期関数 $f$ を考えます。

<a id="def-fou2-convergence-modes"></a>
<!-- formal-statement-start -->
> **定義（各点収束・一様収束・二乗平均収束）**  
> 次の三つを区別する。
>
> 1. すべての実数 $x$ について $f_N(x)\to f(x)$ が成り立つとき、$f_N$ は $f$ へ **各点収束** するという。
> 2. 任意の $\varepsilon>0$ に対し、ある $N_0$ が存在して、$N\ge N_0$ ならすべての実数 $x$ で

$$
|f_N(x)-f(x)|<\varepsilon
$$

> が成り立つとき、$f_N$ は $f$ へ **一様収束** するという。
> 3. 各 $f_N,f$ の二乗が $[-\pi,\pi]$ 上 Riemann 積分可能で

$$
\int_{-\pi}^{\pi}|f_N(x)-f(x)|^2\,dx\longrightarrow0
$$

> が成り立つとき、$f_N$ は $f$ へ **二乗平均収束** するという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou2-convergence-modes -->
**定義の確認**：

$$
f_N(x)=\frac{\sin x}{N},\qquad f(x)=0
$$

とします。すべての $x$ で $f_N(x)\to0$ なので各点収束します。さらに

$$
\sup_x|f_N(x)|\le\frac1N\to0
$$

なので一様収束します。また

$$
\int_{-\pi}^{\pi}|f_N(x)|^2\,dx
=\frac1{N^2}\int_{-\pi}^{\pi}\sin^2x\,dx
=\frac{\pi}{N^2}\to0
$$

だから二乗平均収束もします。一つの列が三つすべてを満たすことはありますが、三つの定義は同じではありません。
<!-- definition-example-end -->

一様収束は二乗平均収束を導きます。実際、$\sup_x|f_N-f|\le\delta_N$ なら

$$
\int_{-\pi}^{\pi}|f_N-f|^2\,dx
\le2\pi\delta_N^2.
$$

一方、二乗平均収束では有限個の点の値は見えません。積分に影響しないからです。この違いが、Fourier 級数の跳躍点で重要になります。

---

## 2. Fourier有限和を一つの積分へまとめる

FOU1 の実 Fourier 係数を使い

$$
S_Nf(x)=\frac{a_0}{2}+\sum_{n=1}^{N}\bigl(a_n\cos nx+b_n\sin nx\bigr)
$$

とします。この有限和を、$N$ に依存する一つの核との積分へ書き直します。

<a id="def-fou2-dirichlet-kernel"></a>
<!-- formal-statement-start -->
> **定義（Dirichlet核）**  
> 非負整数 $N$ に対して

$$
D_N(t):=1+2\sum_{n=1}^{N}\cos nt
$$

> を **Dirichlet 核** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou2-dirichlet-kernel -->
**定義の確認**：$N=2$ なら

$$
D_2(t)=1+2\cos t+2\cos2t.
$$

とくに

$$
D_2(0)=1+2+2=5=2N+1.
$$

また余弦だけの有限和なので $D_N(-t)=D_N(t)$ です。
<!-- definition-example-end -->

<a id="thm-fou2-dirichlet-kernel-formula"></a>
<!-- formal-statement-start -->
> **定理（Dirichlet核の閉形式とFourier有限和の積分表示）**  
> 非負整数 $N$ に対し、$t\notin2\pi\mathbb Z$ なら

$$
D_N(t)=\frac{\sin\bigl((N+\tfrac12)t\bigr)}{\sin(t/2)}.
$$

> また、$f$ を実数値 $2\pi$ 周期関数とし、$[-\pi,\pi]$ 上で Riemann 積分可能とする。このとき FOU1 の Fourier 有限和は

$$
\boxed{
S_Nf(x)=\frac1{2\pi}\int_{-\pi}^{\pi}f(x-t)D_N(t)\,dt
}
$$

> と表せる。さらに

$$
\int_{-\pi}^{\pi}D_N(t)\,dt=2\pi.
$$
<!-- formal-statement-end -->

### 証明の見取り図

閉形式は有限等比級数から出ます。積分表示では $D_N$ を余弦和へ戻し、$f(x-t)\cos nt$ を一周期積分すると、FOU1 の $a_n,b_n$ がちょうど現れます。

<!-- proof-start -->
### 証明

まず

$$
\sum_{n=-N}^{N}e^{int}
=e^{-iNt}\frac{1-e^{i(2N+1)t}}{1-e^{it}}
$$

です。分子・分母へ半角を出すと

$$
1-e^{i(2N+1)t}
=-2ie^{i(N+1/2)t}\sin\bigl((N+\tfrac12)t\bigr),
$$

$$
1-e^{it}=-2ie^{it/2}\sin(t/2).
$$

指数因子は相殺されるため

$$
\sum_{n=-N}^{N}e^{int}
=\frac{\sin\bigl((N+\tfrac12)t\bigr)}{\sin(t/2)}.
$$

左辺は

$$
1+\sum_{n=1}^{N}(e^{int}+e^{-int})
=1+2\sum_{n=1}^{N}\cos nt
=D_N(t)
$$

なので閉形式を得ます。

次に

$$
\frac1{2\pi}\int_{-\pi}^{\pi}f(x-t)D_N(t)\,dt
$$

で $D_N$ を有限和へ戻します。定数項は変数変換 $y=x-t$ と周期性から

$$
\frac1{2\pi}\int_{-\pi}^{\pi}f(x-t)\,dt
=\frac{a_0}{2}.
$$

$n\ge1$ では

$$
\cos(nt)=\cos(n(x-y))
=\cos nx\cos ny+\sin nx\sin ny
$$

なので、一周期積分区間を周期性で $[-\pi,\pi]$ へ戻すと

$$
\begin{aligned}
\frac1\pi\int_{-\pi}^{\pi}f(x-t)\cos(nt)\,dt
&=\frac1\pi\int_{-\pi}^{\pi}f(y)\cos(n(x-y))\,dy\\
&=a_n\cos nx+b_n\sin nx.
\end{aligned}
$$

これを $n=1,\ldots,N$ で足せば $S_Nf(x)$ になります。

最後に、Dirichlet 核の定義から

$$
\int_{-\pi}^{\pi}D_N(t)\,dt
=2\pi+2\sum_{n=1}^{N}\int_{-\pi}^{\pi}\cos nt\,dt
=2\pi.
$$

以上で三つの主張が示されました。
<!-- proof-end -->

Dirichlet 核の積分は常に $2\pi$ ですが、$D_N$ は正負に激しく振動します。「全質量が正しい」だけでは、平均化が安定するとは限りません。この符号変化が Gibbs 現象とつながります。

---

## 3. 高周波を積分すると消える

Dirichlet 核の閉形式を使うと、$S_Nf(x)$ の誤差は高周波の正弦との積分へ変形できます。その最後の一押しを先に証明します。

<a id="thm-fou2-riemann-lebesgue"></a>
<!-- formal-statement-start -->
> **定理（高周波振動積分の消去補題）**  
> $g$ を有限区間 $[a,b]$ 上の Riemann 積分可能な実数値関数とする。このとき実数 $\lambda$ に対し

$$
\int_a^b g(t)\sin(\lambda t)\,dt\longrightarrow0,
\qquad
\int_a^b g(t)\cos(\lambda t)\,dt\longrightarrow0
$$

> が $|\lambda|\to\infty$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Riemann 積分可能性から $g$ を階段関数で積分誤差小さく近似します。階段関数なら各区間の正弦積分は $1/|\lambda|$ の大きさなので、高周波になるほど消えます。

<!-- proof-start -->
### 証明

$\varepsilon>0$ を固定します。$g$ は Riemann 積分可能なので、分割

$$
a=x_0<x_1<\cdots<x_m=b
$$

を、上和と下和の差が $\varepsilon$ 未満になるように取れます。各区間 $[x_{j-1},x_j]$ から一点 $\xi_j$ を選び

$$
s(t)=g(\xi_j)\qquad (x_{j-1}<t<x_j)
$$

と置きます。区間上の上限を $M_j$、下限を $m_j$ とすれば

$$
|g(t)-s(t)|\le M_j-m_j
$$

なので

$$
\int_a^b|g(t)-s(t)|\,dt
\le\sum_{j=1}^{m}(M_j-m_j)(x_j-x_{j-1})
<\varepsilon.
$$

したがって

$$
\left|
\int_a^b(g-s)(t)\sin(\lambda t)\,dt
\right|<\varepsilon.
$$

一方、$c_j:=g(\xi_j)$ と置けば

$$
\begin{aligned}
\left|\int_a^b s(t)\sin(\lambda t)\,dt\right|
&\le\sum_{j=1}^{m}|c_j|
\left|\int_{x_{j-1}}^{x_j}\sin(\lambda t)\,dt\right|\\
&\le\frac{2}{|\lambda|}\sum_{j=1}^{m}|c_j|.
\end{aligned}
$$

右辺は $|\lambda|\to\infty$ で0へ行きます。よって十分大きい $|\lambda|$ では

$$
\left|\int_a^b g(t)\sin(\lambda t)\,dt\right|<2\varepsilon.
$$

$\varepsilon$ は任意なので正弦側の極限は0です。余弦側も

$$
\left|\int_{x_{j-1}}^{x_j}\cos(\lambda t)\,dt\right|
\le\frac{2}{|\lambda|}
$$

を用いる同じ階段関数近似で0へ収束します。
<!-- proof-end -->

ここでは Lebesgue 積分を使っていません。Riemann 積分可能性そのものが与える「有限個の区間での近似」を使っています。

---

## 4. 跳びでは左右の平均へ行く

区分的 $C^1$ とは、一周期を有限個の区間に分けると各区間の内部で連続微分可能で、各区分点で関数と導関数の片側極限が有限に存在する状況を考えます。周期端点 $-\pi,\pi$ は同じ点として左右を読みます。

<a id="thm-fou2-dirichlet-convergence"></a>
<!-- formal-statement-start -->
> **定理（Dirichletの各点収束定理）**  
> $f$ を実数値 $2\pi$ 周期関数とし、一周期上で区分的 $C^1$ とする。任意の実数 $x$ で左右極限

$$
f(x+):=\lim_{h\downarrow0}f(x+h),
\qquad
f(x-):=\lim_{h\downarrow0}f(x-h)
$$

> が存在し、FOU1 の Fourier 有限和 $S_Nf$ は

$$
\boxed{
S_Nf(x)\longrightarrow\frac{f(x+)+f(x-)}2
}
$$

> を満たす。とくに $f$ が $x$ で連続なら $S_Nf(x)\to f(x)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

Dirichlet 核が偶関数であることを使い、$x$ の右側と左側を組にします。左右平均を引くと、分子は $t$ の一次の大きさで0へ行きます。これを $\sin(t/2)$ で割った関数は $t=0$ でも有限値を持ち、最後は [高周波振動積分の消去補題](#thm-fou2-riemann-lebesgue) で高周波を消します。

<!-- proof-start -->
### 証明

[Dirichlet核の積分表示](#thm-fou2-dirichlet-kernel-formula)と $D_N(-t)=D_N(t)$ から

$$
S_Nf(x)
=\frac1{2\pi}\int_0^\pi
\{f(x+t)+f(x-t)\}D_N(t)\,dt.
$$

左右平均を

$$
m_x:=\frac{f(x+)+f(x-)}2
$$

と置きます。また

$$
\frac1{2\pi}\int_0^\pi 2m_xD_N(t)\,dt=m_x
$$

です。したがって

$$
\begin{aligned}
S_Nf(x)-m_x
&=\frac1{2\pi}\int_0^\pi
\{f(x+t)+f(x-t)-f(x+)-f(x-)\}D_N(t)\,dt.
\end{aligned}
$$

$t>0$ に対して

$$
g_x(t):=
\frac{f(x+t)+f(x-t)-f(x+)-f(x-)}{2\sin(t/2)}
$$

と置きます。区分的 $C^1$ 性により、$x$ の右微分と左微分を $f'_+(x),f'_-(x)$ と書けば

$$
f(x+t)-f(x+)=f'_+(x)t+o(t),
$$

$$
f(x-t)-f(x-)=-f'_-(x)t+o(t).
$$

一方

$$
2\sin(t/2)=t+o(t).
$$

よって

$$
\lim_{t\downarrow0}g_x(t)=f'_+(x)-f'_-(x)
$$

は有限です。この値を $g_x(0)$ とすれば、$g_x$ は $[0,\pi]$ 上で有限個の区分点しか持たない Riemann 積分可能な関数になります。

Dirichlet 核の閉形式を代入すると

$$
S_Nf(x)-m_x
=\frac1\pi\int_0^\pi
g_x(t)\sin\bigl((N+\tfrac12)t\bigr)\,dt.
$$

[高周波振動積分の消去補題](#thm-fou2-riemann-lebesgue)を

$$
\lambda=N+\frac12
$$

へ適用すれば右辺は0へ収束します。したがって

$$
S_Nf(x)\to m_x
=\frac{f(x+)+f(x-)}2.
$$

$f$ が $x$ で連続なら $f(x+)=f(x-)=f(x)$ なので結論は $S_Nf(x)\to f(x)$ になります。
<!-- proof-end -->

### 例：矩形波の跳び

FOU1 の矩形波

$$
q(x)=
\begin{cases}
-1,&-\pi<x<0,\\
1,&0<x<\pi
\end{cases}
$$

を $2\pi$ 周期に延長します。$x=0$ では

$$
q(0-)=-1,\qquad q(0+)=1
$$

なので

$$
S_Nq(0)\to0.
$$

$q(0)$ 自体を $-1,0,1$ のどれに定義しても Fourier 係数は変わりません。一点の値は積分へ影響しないためです。一方、$0<x<\pi$ では連続なので $S_Nq(x)\to1$ です。

### 例：周期鋸歯状波 $f(x)=x$

$-\pi<x<\pi$ で $f(x)=x$ とし周期延長します。内部では連続なので

$$
S_Nf(x)\to x\qquad(-\pi<x<\pi).
$$

周期端点では

$$
f(\pi-)=\pi,\qquad f(\pi+)=-\pi
$$

なので

$$
S_Nf(\pi)\to0.
$$

「元の区間で $f(\pi)=\pi$ と書いた」ことより、周期延長したときの左右極限が支配します。

---

## 5. Gibbs現象：振動は狭くなるが高さは消えない

Dirichlet の定理は各固定点の極限を教えます。しかし、跳躍点へ $N$ とともに近づく点を選ぶと別の現象が見えます。

<a id="prop-fou2-gibbs-square-wave"></a>
<!-- formal-statement-start -->
> **命題（標準矩形波のGibbs現象）**  
> $q$ を直前の矩形波とし、$q(0)=0$ とする。非負整数 $M$ に対して $N=2M+1$ と置き、FOU1 の係数から

$$
S_{2M+1}q(x)
=\frac4\pi\sum_{k=0}^{M}\frac{\sin((2k+1)x)}{2k+1}
$$

> とする。さらに

$$
x_M:=\frac{\pi}{2(M+1)}
$$

> と置く。このとき $x_M\downarrow0$ で、$x_M$ は $0$ の右側にある最初の局所極大点であり

$$
\lim_{M\to\infty}S_{2M+1}q(x_M)
=\frac2\pi\int_0^\pi\frac{\sin u}{u}\,du
\approx1.17898.
$$

> したがって右側極限1に対する超過量は約 $0.17898$、跳躍幅2に対して約 $8.949\%$ であり、$M\to\infty$ でも0にならない。
<!-- formal-statement-end -->

### 証明の見取り図

微分すると分母 $2k+1$ が消え、奇数周波数の余弦和になります。その最初の零点が $x_M$ です。極大値の極限は、中点 Riemann 和として $\int_0^\pi(\sin u)/u\,du$ へ収束します。

<!-- proof-start -->
### 証明

微分すると

$$
\frac{d}{dx}S_{2M+1}q(x)
=\frac4\pi\sum_{k=0}^{M}\cos((2k+1)x).
$$

有限等比級数または積和公式から

$$
\sum_{k=0}^{M}\cos((2k+1)x)
=\frac{\sin(2(M+1)x)}{2\sin x}
$$

なので

$$
(S_{2M+1}q)'(x)
=\frac2\pi\frac{\sin(2(M+1)x)}{\sin x}.
$$

$0<x<x_M$ では分子・分母とも正で、$x=x_M$ で分子が初めて0になります。その直後では分子が負になるため $x_M$ は最初の局所極大点です。

次に

$$
\Delta u:=\frac{\pi}{M+1}=2x_M,
\qquad
u_k:=(2k+1)x_M=(k+\tfrac12)\Delta u
$$

と置きます。すると

$$
\frac{\sin((2k+1)x_M)}{2k+1}
=x_M\frac{\sin u_k}{u_k}
=\frac{\Delta u}{2}\frac{\sin u_k}{u_k}.
$$

よって

$$
S_{2M+1}q(x_M)
=\frac2\pi\sum_{k=0}^{M}
\frac{\sin u_k}{u_k}\Delta u.
$$

右辺は $[0,\pi]$ に対する中点 Riemann 和です。$u=0$ で $(\sin u)/u$ を1と連続延長すれば

$$
S_{2M+1}q(x_M)
\longrightarrow
\frac2\pi\int_0^\pi\frac{\sin u}{u}\,du.
$$

数値は約 $1.17898$ です。右側の目標値1との差は約 $0.17898$、跳躍幅は2なので割合は

$$
\frac{0.17898}{2}\approx0.08949.
$$

したがって振動の位置 $x_M$ は0へ近づいても、相対的な最大超過量は消えません。
<!-- proof-end -->

「各固定点では正しい値へ行く」と「最大誤差が0へ行く」は別です。Gibbs 現象はこの違いを最も目に見える形で示します。

---

## 6. Fourier有限和そのものではなく、有限和を平均する

Dirichlet 核は符号を変えます。そこで $S_0f,S_1f,\ldots,S_Nf$ を平均します。

<a id="def-fou2-fejer-mean"></a>
<!-- formal-statement-start -->
> **定義（Fejér平均）**  
> $f$ の Fourier 有限和を $S_0f,S_1f,\ldots$ とする。非負整数 $N$ に対し

$$
\sigma_Nf(x):=\frac1{N+1}\sum_{k=0}^{N}S_kf(x)
$$

> を $N$ 次 **Fejér 平均** という。これは Fourier 有限和列の Cesàro 平均である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou2-fejer-mean -->
**定義の確認**：

$$
S_0f=\frac{a_0}{2},
$$

$$
S_1f=\frac{a_0}{2}+a_1\cos x+b_1\sin x,
$$

$$
S_2f=S_1f+a_2\cos2x+b_2\sin2x
$$

なら

$$
\sigma_2f
=\frac{S_0f+S_1f+S_2f}{3}
=\frac{a_0}{2}
+\frac23(a_1\cos x+b_1\sin x)
+\frac13(a_2\cos2x+b_2\sin2x).
$$

高い周波数ほど小さい重みになります。
<!-- definition-example-end -->

<a id="def-fou2-fejer-kernel"></a>
<!-- formal-statement-start -->
> **定義（Fejér核）**  
> Dirichlet 核 $D_0,\ldots,D_N$ に対して

$$
K_N(t):=\frac1{N+1}\sum_{k=0}^{N}D_k(t)
$$

> を $N$ 次 **Fejér 核** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou2-fejer-kernel -->
**定義の確認**：$N=1$ では

$$
K_1(t)=\frac{D_0(t)+D_1(t)}2
=\frac{1+(1+2\cos t)}2
=1+\cos t
=2\cos^2(t/2)\ge0.
$$

Dirichlet 核には負の部分がありますが、この最初の Fejér 核はすでに非負です。
<!-- definition-example-end -->

<a id="thm-fou2-fejer-kernel-properties"></a>
<!-- formal-statement-start -->
> **定理（Fejér核の基本性質）**  
> 非負整数 $N$ に対し、$t\notin2\pi\mathbb Z$ で

$$
\boxed{
K_N(t)=\frac1{N+1}
\left(\frac{\sin((N+1)t/2)}{\sin(t/2)}\right)^2
}
$$

> が成り立ち、$K_N(0)=N+1$ と連続延長できる。また

$$
K_N(t)\ge0,
\qquad
\int_{-\pi}^{\pi}K_N(t)\,dt=2\pi.
$$

> さらに任意の $0<\delta<\pi$ に対して

$$
\sup_{\delta\le|t|\le\pi}K_N(t)
\le
\frac1{(N+1)\sin^2(\delta/2)}
\longrightarrow0.
$$

> Fejér平均は

$$
\boxed{
\sigma_Nf(x)=\frac1{2\pi}\int_{-\pi}^{\pi}f(x-t)K_N(t)\,dt
}
$$

> と表せる。
<!-- formal-statement-end -->

### 証明の見取り図

$K_N$ は有限幾何級数の絶対値二乗です。この形が非負性を自動的に与えます。積分2πは Dirichlet 核の平均から直ちに出ます。原点から離れれば分母が0から離れ、前にある $1/(N+1)$ が効きます。

<!-- proof-start -->
### 証明

まず

$$
\sum_{j=0}^{N}e^{ijt}
=e^{iNt/2}\frac{\sin((N+1)t/2)}{\sin(t/2)}.
$$

したがって

$$
\frac1{N+1}\left|\sum_{j=0}^{N}e^{ijt}\right|^2
=\frac1{N+1}
\left(\frac{\sin((N+1)t/2)}{\sin(t/2)}\right)^2.
$$

左辺を展開すると

$$
\frac1{N+1}\sum_{j=0}^{N}\sum_{\ell=0}^{N}e^{i(j-\ell)t}
$$

です。差 $m=j-\ell$ が固定された項は $N+1-|m|$ 個あるため

$$
\frac1{N+1}\left|\sum_{j=0}^{N}e^{ijt}\right|^2
=1+2\sum_{m=1}^{N}\left(1-\frac{m}{N+1}\right)\cos mt.
$$

一方

$$
\frac1{N+1}\sum_{k=0}^{N}D_k(t)
$$

でも $\cos mt$ は $D_m,D_{m+1},\ldots,D_N$ の $N+1-m$ 個に現れるので、係数は同じです。よってこれが $K_N$ の閉形式です。絶対値二乗表示から $K_N\ge0$ も従います。

各 Dirichlet 核の積分が $2\pi$ なので

$$
\int_{-\pi}^{\pi}K_N(t)\,dt
=\frac1{N+1}\sum_{k=0}^{N}2\pi
=2\pi.
$$

$\delta\le|t|\le\pi$ なら

$$
|\sin(t/2)|\ge\sin(\delta/2)>0
$$

かつ分子の絶対値は1以下です。したがって

$$
K_N(t)
\le\frac1{(N+1)\sin^2(\delta/2)}.
$$

最後に上で定義した平均 $\sigma_Nf$ へ各 $S_kf$ の Dirichlet 核表示を代入し、有限和と積分を交換すると

$$
\begin{aligned}
\sigma_Nf(x)
&=\frac1{N+1}\sum_{k=0}^{N}\frac1{2\pi}
\int_{-\pi}^{\pi}f(x-t)D_k(t)\,dt\\
&=\frac1{2\pi}\int_{-\pi}^{\pi}f(x-t)
\left\{\frac1{N+1}\sum_{k=0}^{N}D_k(t)\right\}\,dt\\
&=\frac1{2\pi}\int_{-\pi}^{\pi}f(x-t)K_N(t)\,dt.
\end{aligned}
$$

以上です。
<!-- proof-end -->

Fejér 核の三つの性質

$$
K_N\ge0,
\qquad
\frac1{2\pi}\int K_N=1,
\qquad
\text{原点から離れた質量が0へ行く}
$$

は、「近くの値を正の重みで平均する核」になっていることを意味します。

---

## 7. 連続ならFejér平均は一様に戻る

<a id="thm-fou2-fejer-uniform"></a>
<!-- formal-statement-start -->
> **定理（Fejérの一様収束定理）**  
> $f$ を実数値の連続 $2\pi$ 周期関数とする。このとき Fejér 平均 $\sigma_Nf$ は $f$ へ一様収束する。すなわち

$$
\sup_{x\in\mathbb R}|\sigma_Nf(x)-f(x)|\longrightarrow0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

Fejér 核の積分が $2\pi$ なので $f(x)$ も同じ核で平均した形に書けます。差を「$|t|<\delta$」と「$|t|\ge\delta$」へ分けます。近い部分は $f$ の一様連続性、遠い部分は Fejér 核の質量集中で一様に小さくなります。

<!-- proof-start -->
### 証明

連続周期関数 $f$ はコンパクトな一周期上で有界かつ一様連続です。$M>0$ を

$$
|f(x)|\le M
$$

がすべての $x$ で成り立つ数とします。

Fejér 核の正規化から

$$
f(x)=\frac1{2\pi}\int_{-\pi}^{\pi}f(x)K_N(t)\,dt.
$$

したがって

$$
\sigma_Nf(x)-f(x)
=\frac1{2\pi}\int_{-\pi}^{\pi}
\{f(x-t)-f(x)\}K_N(t)\,dt.
$$

$\varepsilon>0$ を固定します。一様連続性から、ある $0<\delta<\pi$ が存在し

$$
|t|<\delta
\quad\Longrightarrow\quad
|f(x-t)-f(x)|<\frac{\varepsilon}{2}
$$

がすべての $x$ で成り立ちます。

近い部分では $K_N\ge0$ と積分2πを使って

$$
\begin{aligned}
\frac1{2\pi}
\int_{|t|<\delta}|f(x-t)-f(x)|K_N(t)\,dt
&\le\frac{\varepsilon}{2}\frac1{2\pi}
\int_{-\pi}^{\pi}K_N(t)\,dt\\
&=\frac{\varepsilon}{2}.
\end{aligned}
$$

遠い部分では $|f(x-t)-f(x)|\le2M$ なので

$$
\begin{aligned}
&\frac1{2\pi}
\int_{\delta\le|t|\le\pi}|f(x-t)-f(x)|K_N(t)\,dt\\
&\le\frac{2M}{2\pi}\cdot2\pi
\sup_{\delta\le|t|\le\pi}K_N(t)\\
&\le\frac{2M}{(N+1)\sin^2(\delta/2)}.
\end{aligned}
$$

最後の量は $x$ に依らず0へ行きます。したがって十分大きい $N$ でこれも $\varepsilon/2$ 未満です。よってすべての $x$ で

$$
|\sigma_Nf(x)-f(x)|<\varepsilon.
$$

これは一様収束そのものです。
<!-- proof-end -->

### 矩形波では何が変わるか

矩形波 $q$ は連続ではないので、この定理を全体へそのまま適用できません。しかし Fejér 核が非負で正規化されていることから、$|q|\le1$ なら

$$
|\sigma_Nq(x)|
\le\frac1{2\pi}\int_{-\pi}^{\pi}|q(x-t)|K_N(t)\,dt
\le1.
$$

したがって通常の Fourier有限和のように $1$ を越える Gibbs 超過は起こりません。さらに $q$ は奇関数なので $\sigma_Nq(0)=0$ です。連続点 $x$ を固定すれば、上の証明で一様連続性を「その点の近傍での連続性」に置き換えることで $\sigma_Nq(x)\to q(x)$ が従います。

平均化は「跳びを消す」のではなく、正負に振動する Dirichlet 核を正の近似核へ作り直しています。

---

## 8. 三角多項式は連続周期関数を一様に近似できる

Fejér 平均そのものが三角多項式です。したがって Fejér の定理は存在定理を一つ与えます。

<a id="thm-fou2-trigonometric-density"></a>
<!-- formal-statement-start -->
> **定理（連続周期関数に対する三角多項式の一様稠密性）**  
> $f$ を実数値の連続 $2\pi$ 周期関数とする。任意の $\varepsilon>0$ に対し、ある三角多項式 $T$ が存在して

$$
\sup_{x\in\mathbb R}|f(x)-T(x)|<\varepsilon
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

抽象的に近似多項式の存在を探す必要はありません。十分大きい $N$ の Fejér 平均 $T=\sigma_Nf$ をそのまま取ります。

<!-- proof-start -->
### 証明

[Fejérの一様収束定理](#thm-fou2-fejer-uniform)から

$$
\sup_x|\sigma_Nf(x)-f(x)|\to0.
$$

したがって与えられた $\varepsilon>0$ に対し、十分大きい $N$ で

$$
\sup_x|\sigma_Nf(x)-f(x)|<\varepsilon.
$$

Fejér 平均は

$$
\sigma_Nf(x)
=\frac{a_0}{2}
+\sum_{n=1}^{N}\left(1-\frac{n}{N+1}\right)
(a_n\cos nx+b_n\sin nx)
$$

という $N$ 次以下の三角多項式です。よって $T=\sigma_Nf$ と取ればよいことが分かります。
<!-- proof-end -->

この定理が次節の橋です。区分的連続関数をまず連続関数へ二乗平均で近似し、その連続関数を Fejér 平均で三角多項式へ近似します。

---

## 9. 区分的連続でもFourier有限和は二乗平均で戻る

FOU1 では、$S_Nf$ が $N$ 次以下の三角多項式の中で二乗誤差を最小にすることを証明しました。ただし、その時点では「$N$ を増やせば最小誤差が0へ行く」ことは未証明でした。

<a id="thm-fou2-mean-square-convergence"></a>
<!-- formal-statement-start -->
> **定理（Fourier有限和の二乗平均収束）**  
> $f$ を実数値 $2\pi$ 周期関数とし、一周期上で有限個の不連続点しか持たず、各連続区間で連続で、すべての片側極限が有限であるとする。FOU1 の Fourier 有限和 $S_Nf$ に対して

$$
\boxed{
\int_{-\pi}^{\pi}|f(x)-S_Nf(x)|^2\,dx\longrightarrow0
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

核心は二段階です。

1. 跳びの周囲だけ短い区間で直線につなぎ、$f$ を連続周期関数 $g$ へ二乗平均で近づける。
2. $g$ を Fejér により三角多項式 $T$ へ一様近似する。

すると $T$ は $f$ に二乗平均でいくらでも近づけます。最後に FOU1 の固定次数最小二乗性を使えば、同じ次数以上の $S_Nf$ は $T$ より悪くありません。

<!-- proof-start -->
### 証明

$\varepsilon>0$ を固定します。$f$ は一周期上で区分的連続なので有界です。$|f(x)|\le M$ とします。$M=0$ なら主張は自明なので $M>0$ とします。

不連続点は有限個です。周期端点 $-\pi$ と $\pi$ を同一視し、それぞれの不連続点の周囲に互いに重ならない短い区間を取り、その全長を $\eta$ とします。$\eta$ は後で任意に小さくできます。

これらの短区間の外では $g=f$ とし、各短区間の内部では両端の $f$ の値を直線で結びます。周期端点をまたぐ区間も円周上で同じようにつなぎます。こうして連続 $2\pi$ 周期関数 $g$ が得られ、線形補間なので $|g|\le M$ とできます。

$f-g$ は短区間の外で0であり、短区間内では

$$
|f-g|\le|f|+|g|\le2M.
$$

よって

$$
\int_{-\pi}^{\pi}|f-g|^2\,dx
\le4M^2\eta.
$$

$\eta$ を十分小さく選び

$$
\int_{-\pi}^{\pi}|f-g|^2\,dx<\frac{\varepsilon}{4}
$$

とします。

次に[三角多項式の一様稠密性](#thm-fou2-trigonometric-density)から、ある三角多項式 $T$ が存在して

$$
\sup_x|g(x)-T(x)|<\sqrt{\frac{\varepsilon}{8\pi}}
$$

とできます。したがって

$$
\int_{-\pi}^{\pi}|g-T|^2\,dx
<2\pi\frac{\varepsilon}{8\pi}
=\frac{\varepsilon}{4}.
$$

点ごとの不等式

$$
|f-T|^2
=|(f-g)+(g-T)|^2
\le2|f-g|^2+2|g-T|^2
$$

を積分すると

$$
\int_{-\pi}^{\pi}|f-T|^2\,dx<\varepsilon.
$$

$T$ の次数を $m$ とします。$N\ge m$ なら $T$ は $N$ 次以下の三角多項式でもあります。FOU1 の [Fourier有限和の固定次数最小二乗性](../FOU1/index.md#thm-fou1-least-squares)から

$$
\int_{-\pi}^{\pi}|f-S_Nf|^2\,dx
\le
\int_{-\pi}^{\pi}|f-T|^2\,dx
<\varepsilon.
$$

任意の $\varepsilon>0$ に対して、十分大きい $N$ ではこの評価が成り立つので

$$
\int_{-\pi}^{\pi}|f-S_Nf|^2\,dx\to0.
$$
<!-- proof-end -->

ここで Dirichlet の各点収束定理は使っていません。二乗平均収束は、Fejér による近似可能性と「同じ次数なら Fourier 有限和が最良」という FOU1 の有限次数の事実から出ています。

---

## 10. Parseval等式：有限エネルギー不等式が等号になる

FOU1 では有限 $N$ に対して

$$
\frac{a_0^2}{2}+\sum_{n=1}^{N}(a_n^2+b_n^2)
\le
\frac1\pi\int_{-\pi}^{\pi}|f(x)|^2\,dx
$$

までを証明しました。残っていたのは、$N\to\infty$ で残差が0になることだけです。

<a id="thm-fou2-parseval"></a>
<!-- formal-statement-start -->
> **定理（Fourier係数のエネルギー等式と三角系の完全性）**  
> $f$ を実数値 $2\pi$ 周期関数とし、一周期上で有限個の不連続点しか持たず、各連続区間で連続で、すべての片側極限が有限であるとする。実 Fourier 係数を $a_0,a_n,b_n$ とする。このとき

$$
\boxed{
\frac1\pi\int_{-\pi}^{\pi}|f(x)|^2\,dx
=
\frac{a_0^2}{2}+\sum_{n=1}^{\infty}(a_n^2+b_n^2)
}
$$

> が成り立つ。
>
> とくに全 Fourier 係数が0なら、$f$ はすべての連続点で0である。したがって $f$ が連続なら $f\equiv0$ である。この意味で三角系はこの関数クラスに対して完全である。
<!-- formal-statement-end -->

### 証明の見取り図

FOU1 の一周期積分消去則により、元の二乗積分は「$S_Nf$ の二乗積分＋残差の二乗積分」へ正確に分解できます。前節で残差が0へ行くと分かったので、有限係数二乗和を極限へ送れば等号になります。

<!-- proof-start -->
### 証明

FOU1 の係数定義と一周期積分消去則から

$$
\int_{-\pi}^{\pi}(f-S_Nf)S_Nf\,dx=0.
$$

したがって

$$
\begin{aligned}
\int_{-\pi}^{\pi}|f|^2\,dx
&=\int_{-\pi}^{\pi}|S_Nf+(f-S_Nf)|^2\,dx\\
&=\int_{-\pi}^{\pi}|S_Nf|^2\,dx
+\int_{-\pi}^{\pi}|f-S_Nf|^2\,dx.
\end{aligned}
$$

さらに FOU1 の一周期積分消去則による計算から

$$
\frac1\pi\int_{-\pi}^{\pi}|S_Nf|^2\,dx
=\frac{a_0^2}{2}+\sum_{n=1}^{N}(a_n^2+b_n^2).
$$

よって

$$
\frac1\pi\int_{-\pi}^{\pi}|f|^2\,dx
=\frac{a_0^2}{2}+\sum_{n=1}^{N}(a_n^2+b_n^2)
+\frac1\pi\int_{-\pi}^{\pi}|f-S_Nf|^2\,dx.
$$

[Fourier有限和の二乗平均収束](#thm-fou2-mean-square-convergence)により最後の項は0へ行きます。したがって

$$
\frac1\pi\int_{-\pi}^{\pi}|f|^2\,dx
=\frac{a_0^2}{2}+\sum_{n=1}^{\infty}(a_n^2+b_n^2).
$$

次に全 Fourier 係数が0とします。[係数エネルギー等式](#thm-fou2-parseval)から

$$
\int_{-\pi}^{\pi}|f(x)|^2\,dx=0.
$$

もし $x_0$ が $f$ の連続点で $f(x_0)\ne0$ なら、連続性により $x_0$ の十分小さい近傍で

$$
|f(x)|\ge\frac{|f(x_0)|}{2}>0
$$

となります。その近傍上の $|f|^2$ の積分は正になり矛盾します。よってすべての連続点で $f=0$ です。$f$ が連続なら全点が連続点なので $f\equiv0$ です。
<!-- proof-end -->

### 例：$\sum 1/n^2$ を求める

FOU1 で $f(x)=x$、$-\pi<x<\pi$ の係数を

$$
a_0=a_n=0,
\qquad
b_n=\frac{2(-1)^{n+1}}n
$$

と求めました。[係数エネルギー等式](#thm-fou2-parseval)の左辺は

$$
\frac1\pi\int_{-\pi}^{\pi}x^2\,dx
=\frac{2\pi^2}{3}.
$$

右辺は

$$
\sum_{n=1}^{\infty}\frac4{n^2}.
$$

したがって

$$
\frac{2\pi^2}{3}=4\sum_{n=1}^{\infty}\frac1{n^2},
$$

すなわち

$$
\boxed{
\sum_{n=1}^{\infty}\frac1{n^2}=\frac{\pi^2}{6}
}
$$

を得ます。FOU1 では不等式まででしたが、二乗平均収束を証明したことで等号へ到達しました。

---

## 11. 三つの収束を同じ箱へ入れない

ここまでの結果を同じ関数で比べます。

矩形波 $q$ では、Dirichlet の定理により固定した連続点で $S_Nq(x)\to q(x)$、跳躍点では左右平均0へ収束します。しかし [Gibbs現象](#prop-fou2-gibbs-square-wave) により跳躍点近くの最大超過量は消えないので、一様収束はしません。

一方、[Fourier有限和の二乗平均収束](#thm-fou2-mean-square-convergence)は矩形波にも適用できるため

$$
\int_{-\pi}^{\pi}|q-S_Nq|^2\,dx\to0
$$

です。跳躍点近くで振動が残っても、その振動が存在する区間が狭くなるため、面積として測る二乗誤差は消えます。

さらに Fejér 平均は正の核による平均なので $|\sigma_Nq|\le1$ です。通常の Fourier有限和と、それらを平均した Fejér 平均では、同じ Fourier 係数を使っていても挙動が変わります。

連続周期関数 $f$ については Fejér 平均 $\sigma_Nf$ が一様収束します。本章では元の Fourier有限和 $S_Nf$ が連続関数に対して常に一様収束するとは主張していません。Fejér 平均を導入する理由は、まさに一様近似を確実に作るためです。

---

## 12. 演習

### Level A

#### A1. 三つの収束概念を計算で確認する

$2\pi$ 周期関数

$$
f_N(x)=\frac{\cos x}{\sqrt N}
$$

と $f(x)=0$ を考えます。

1. 各点収束を確認してください。
2. 一様収束を確認してください。
3. 二乗平均誤差を積分し、二乗平均収束を確認してください。
4. 一様収束から二乗平均収束が従う一般の評価を書いてください。

- Level: A

<!-- solution-start -->
**詳細解答**

1. 固定した $x$ に対し $|\cos x|\le1$ なので

$$
|f_N(x)|\le\frac1{\sqrt N}\to0.
$$

よって各点収束します。

2. $\cos0=1$ なので

$$
\sup_x|f_N(x)|=\frac1{\sqrt N}\to0.
$$

したがって一様収束します。

3. 二乗平均誤差は

$$
\begin{aligned}
\int_{-\pi}^{\pi}|f_N(x)|^2\,dx
&=\frac1N\int_{-\pi}^{\pi}\cos^2x\,dx\\
&=\frac{\pi}{N}\to0.
\end{aligned}
$$

よって二乗平均収束します。

4. 一般に

$$
\delta_N:=\sup_x|f_N(x)-f(x)|
$$

と置けば

$$
\int_{-\pi}^{\pi}|f_N-f|^2\,dx
\le2\pi\delta_N^2.
$$

一様収束なら $\delta_N\to0$ なので右辺も0へ行きます。
<!-- solution-end -->

#### A2. Dirichlet核を手で作る

$N=2$ について次を行ってください。

1. $D_2(t)$ を余弦和で書いてください。
2. $D_2(t)=\sin(5t/2)/\sin(t/2)$ を有限等比級数から確認してください。
3. $\int_{-\pi}^{\pi}D_2(t)\,dt=2\pi$ を確認してください。

- Level: A

<!-- solution-start -->
**詳細解答**

1. 定義から

$$
D_2(t)=1+2\cos t+2\cos2t.
$$

2. 複素指数を使うと

$$
D_2(t)=\sum_{n=-2}^{2}e^{int}
=e^{-2it}\frac{1-e^{5it}}{1-e^{it}}.
$$

分子・分母へ

$$
1-e^{i\alpha}=-2ie^{i\alpha/2}\sin(\alpha/2)
$$

を使うと指数因子が相殺され

$$
D_2(t)=\frac{\sin(5t/2)}{\sin(t/2)}.
$$

3. 余弦和表示を積分すると

$$
\begin{aligned}
\int_{-\pi}^{\pi}D_2(t)\,dt
&=\int_{-\pi}^{\pi}1\,dt
+2\int_{-\pi}^{\pi}\cos t\,dt
+2\int_{-\pi}^{\pi}\cos2t\,dt\\
&=2\pi.
\end{aligned}
$$
<!-- solution-end -->

#### A3. 跳躍点の値を決める

矩形波

$$
q(x)=
\begin{cases}
-1,&-\pi<x<0,\\
1,&0<x<\pi
\end{cases}
$$

を $2\pi$ 周期に延長します。[Dirichletの各点収束定理](#thm-fou2-dirichlet-convergence)を使い、次の極限を求めてください。

1. $\lim_{N\to\infty}S_Nq(\pi/2)$
2. $\lim_{N\to\infty}S_Nq(0)$
3. $\lim_{N\to\infty}S_Nq(\pi)$
4. $q(0)$ や $q(\pi)$ をどの値に定義しても上の極限が変わらない理由を説明してください。

- Level: A

<!-- solution-start -->
**詳細解答**

1. $x=\pi/2$ では $q$ は連続で値は1です。したがって

$$
S_Nq(\pi/2)\to1.
$$

2. $x=0$ では

$$
q(0-)=-1,\qquad q(0+)=1
$$

なので

$$
S_Nq(0)\to\frac{-1+1}{2}=0.
$$

3. 周期端点 $x=\pi$ の左側では1、右側は周期性により $-\pi$ の右側へ戻るため $-1$ です。よって

$$
S_Nq(\pi)\to\frac{1+(-1)}2=0.
$$

4. Fourier 係数は一周期積分で定まります。有限個の点の値を変更しても Riemann 積分値は変わらないため、係数も $S_Nq$ も変わりません。極限は左右からの波形で決まり、跳躍点そのものへ代入した値では決まりません。
<!-- solution-end -->

#### A4. Fejér核が原点へ集中することを確認する

$0<\delta<\pi$ を固定します。

1. Fejér 核の閉形式から $K_N(t)\ge0$ を示してください。
2. $\delta\le|t|\le\pi$ で

$$
K_N(t)\le\frac1{(N+1)\sin^2(\delta/2)}
$$

を示してください。
3. したがって

$$
\int_{\delta\le|t|\le\pi}K_N(t)\,dt\to0
$$

を示してください。

- Level: A

<!-- solution-start -->
**詳細解答**

1. 閉形式は

$$
K_N(t)=\frac1{N+1}
\left(\frac{\sin((N+1)t/2)}{\sin(t/2)}\right)^2
$$

です。実数の平方なので $t\notin2\pi\mathbb Z$ で非負です。$t=0$ でも連続延長値 $K_N(0)=N+1>0$ なので全点で非負です。

2. $\delta\le|t|\le\pi$ では

$$
|\sin(t/2)|\ge\sin(\delta/2),
$$

一方

$$
|\sin((N+1)t/2)|\le1.
$$

したがって

$$
K_N(t)
\le\frac1{(N+1)\sin^2(\delta/2)}.
$$

3. 積分区間の長さは高々 $2\pi$ なので

$$
0\le
\int_{\delta\le|t|\le\pi}K_N(t)\,dt
\le
\frac{2\pi}{(N+1)\sin^2(\delta/2)}
\to0.
$$

これが「原点から離れた質量が消える」の具体的な評価です。
<!-- solution-end -->

### Level B

#### B1. 高周波振動積分の消去補題を階段関数で再構成する

$g$ を $[a,b]$ 上の Riemann 積分可能な関数とします。次の順で

$$
\int_a^b g(t)\sin(\lambda t)\,dt\to0
\qquad(|\lambda|\to\infty)
$$

を証明してください。

1. Riemann 積分可能性から、有限個の区間で一定な階段関数 $s$ を

$$
\int_a^b|g-s|<\varepsilon
$$

となるように作る。
2. $s$ に対する振動積分が $O(1/|\lambda|)$ であることを示す。
3. 二つを合わせる。

- Level: B

<!-- solution-start -->
**詳細解答**

$\varepsilon>0$ を固定します。Riemann 積分可能性から、分割

$$
a=x_0<x_1<\cdots<x_m=b
$$

を上和と下和の差が $\varepsilon$ 未満になるように選べます。各区間から $\xi_j$ を取り

$$
s(t)=g(\xi_j)\qquad(x_{j-1}<t<x_j)
$$

とします。

第 $j$ 区間の上限・下限を $M_j,m_j$ とすれば

$$
|g(t)-s(t)|\le M_j-m_j.
$$

したがって

$$
\int_a^b|g-s|\,dt
\le\sum_{j=1}^{m}(M_j-m_j)(x_j-x_{j-1})
<\varepsilon.
$$

$c_j=g(\xi_j)$ と置くと

$$
\begin{aligned}
\left|\int_a^b s(t)\sin(\lambda t)\,dt\right|
&\le\sum_{j=1}^{m}|c_j|
\left|\frac{\cos(\lambda x_{j-1})-\cos(\lambda x_j)}{\lambda}\right|\\
&\le\frac2{|\lambda|}\sum_{j=1}^{m}|c_j|.
\end{aligned}
$$

有限和 $\sum|c_j|$ は $\lambda$ に依らないため、この項は0へ行きます。また

$$
\left|\int_a^b(g-s)(t)\sin(\lambda t)\,dt\right|
\le\int_a^b|g-s|\,dt<\varepsilon.
$$

十分大きい $|\lambda|$ では階段関数側も $\varepsilon$ 未満なので

$$
\left|\int_a^b g(t)\sin(\lambda t)\,dt\right|<2\varepsilon.
$$

$\varepsilon$ は任意ですから極限は0です。
<!-- solution-end -->

#### B2. Fejérの一様収束を誤差分割から証明する

$f$ を連続 $2\pi$ 周期関数、$|f|\le M$ とします。$\varepsilon>0$ に対し、次の順で

$$
\sup_x|\sigma_Nf(x)-f(x)|\to0
$$

を導いてください。

1. 一様連続性から $|t|<\delta$ で $|f(x-t)-f(x)|<\varepsilon/2$ とする。
2. $|t|<\delta$ の積分を評価する。
3. $|t|\ge\delta$ の積分を Fejér 核の上界で評価する。

- Level: B

<!-- solution-start -->
**詳細解答**

Fejér 核の正規化から

$$
\sigma_Nf(x)-f(x)
=\frac1{2\pi}\int_{-\pi}^{\pi}
\{f(x-t)-f(x)\}K_N(t)\,dt.
$$

$f$ は連続周期関数なので一周期上で一様連続です。したがって $\delta>0$ を、$|t|<\delta$ ならすべての $x$ で

$$
|f(x-t)-f(x)|<\frac{\varepsilon}{2}
$$

となるように選べます。

近い部分では $K_N\ge0$ を使って

$$
\begin{aligned}
\frac1{2\pi}\int_{|t|<\delta}|f(x-t)-f(x)|K_N(t)\,dt
&\le\frac{\varepsilon}{2}\frac1{2\pi}\int K_N(t)\,dt\\
&=\frac{\varepsilon}{2}.
\end{aligned}
$$

遠い部分では $|f(x-t)-f(x)|\le2M$ なので

$$
\begin{aligned}
\frac1{2\pi}\int_{|t|\ge\delta}|f(x-t)-f(x)|K_N(t)\,dt
&\le\frac{2M}{2\pi}
\int_{|t|\ge\delta}K_N(t)\,dt\\
&\le\frac{2M}{(N+1)\sin^2(\delta/2)}.
\end{aligned}
$$

最後の上界は $x$ に依らず0へ行きます。十分大きい $N$ では $\varepsilon/2$ 未満なので

$$
|\sigma_Nf(x)-f(x)|<\varepsilon
$$

が全 $x$ で同時に成り立ちます。したがって一様収束です。
<!-- solution-end -->

#### B3. Parseval等式から逆二乗和を求める

周期鋸歯状波 $f(x)=x$、$-\pi<x<\pi$ の Fourier 係数

$$
a_0=a_n=0,
\qquad
b_n=\frac{2(-1)^{n+1}}n
$$

を使います。

1. [係数エネルギー等式](#thm-fou2-parseval)の左辺を計算してください。
2. 右辺を係数で書いてください。
3. $\sum_{n=1}^{\infty}1/n^2=\pi^2/6$ を導いてください。
4. [Dirichletの各点収束定理](#thm-fou2-dirichlet-convergence)から $x=\pi$ での Fourier有限和の極限を求め、係数エネルギー等式の結論と各点値の結論が別物であることを説明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

1. 左辺は

$$
\frac1\pi\int_{-\pi}^{\pi}x^2\,dx
=\frac2\pi\left[\frac{x^3}{3}\right]_0^\pi
=\frac{2\pi^2}{3}.
$$

2. $a_0=a_n=0$ なので Parseval の右辺は

$$
\sum_{n=1}^{\infty}b_n^2
=4\sum_{n=1}^{\infty}\frac1{n^2}.
$$

3. 等号を合わせると

$$
\frac{2\pi^2}{3}
=4\sum_{n=1}^{\infty}\frac1{n^2}.
$$

したがって

$$
\boxed{
\sum_{n=1}^{\infty}\frac1{n^2}=\frac{\pi^2}{6}
}.
$$

4. 周期延長した鋸歯状波では $x=\pi$ が跳躍点です。左右極限は

$$
f(\pi-)=\pi,
\qquad
f(\pi+)=-\pi
$$

なので Dirichlet の定理から

$$
S_Nf(\pi)\to0.
$$

[係数エネルギー等式](#thm-fou2-parseval)は一周期全体の二乗積分と係数二乗和の等式であり、一点 $x=\pi$ の値を主張していません。一方 Dirichlet の定理は固定した点での極限を主張します。同じ Fourier 係数から出る結果でも、測っている収束の意味が違います。
<!-- solution-end -->

### Level C

#### C1. 矩形波で各点収束・Gibbs・Fejér・Parsevalを一本につなぐ

矩形波

$$
q(x)=
\begin{cases}
-1,&-\pi<x<0,\\
1,&0<x<\pi
\end{cases}
$$

を $2\pi$ 周期に延長し、跳躍点では $q=0$ とします。FOU1 から

$$
a_0=a_n=0,
\qquad
b_n=
\begin{cases}
4/(\pi n),&n\text{ が奇数},\\
0,&n\text{ が偶数}
\end{cases}
$$

です。

1. Dirichlet の定理から、$0<x<\pi$、$x=0$、$x=\pi$ での $S_Nq(x)$ の極限をそれぞれ求めてください。
2. $N=2M+1$ とし、$x_M=\pi/(2(M+1))$ が0の右側の最初の局所極大点であることを微分から示してください。
3. その極大値が

$$
\frac2\pi\int_0^\pi\frac{\sin u}{u}\,du
$$

へ収束することを中点 Riemann 和として導いてください。
4. Fejér 平均では $|\sigma_Nq(x)|\le1$ がすべての $x$ で成り立つことを示し、Gibbs の超過との違いを説明してください。
5. [係数エネルギー等式](#thm-fou2-parseval)から

$$
\sum_{k=0}^{\infty}\frac1{(2k+1)^2}=\frac{\pi^2}{8}
$$

を導いてください。
6. $S_Nq$ は $q$ へ二乗平均収束する一方、一様収束しない理由を説明してください。

- Level: C

<!-- solution-start -->
**詳細解答**

1. $0<x<\pi$ では $q$ は連続で値1なので

$$
S_Nq(x)\to1.
$$

$x=0$ では左右極限が $-1,1$ なので

$$
S_Nq(0)\to0.
$$

$x=\pi$ でも周期端点の左右極限は $1,-1$ なので

$$
S_Nq(\pi)\to0.
$$

2. 奇数次だけが残るため

$$
S_{2M+1}q(x)
=\frac4\pi\sum_{k=0}^{M}\frac{\sin((2k+1)x)}{2k+1}.
$$

微分すると

$$
(S_{2M+1}q)'(x)
=\frac4\pi\sum_{k=0}^{M}\cos((2k+1)x).
$$

余弦和を計算すると

$$
\sum_{k=0}^{M}\cos((2k+1)x)
=\frac{\sin(2(M+1)x)}{2\sin x}.
$$

したがって

$$
(S_{2M+1}q)'(x)
=\frac2\pi\frac{\sin(2(M+1)x)}{\sin x}.
$$

$0<x<\pi/(2(M+1))$ では正、$x_M=\pi/(2(M+1))$ で0、その直後では負なので、$x_M$ は最初の局所極大点です。

3. 

$$
\Delta u=\frac\pi{M+1},
\qquad
u_k=(k+\tfrac12)\Delta u=(2k+1)x_M
$$

と置きます。このとき

$$
\frac{\sin((2k+1)x_M)}{2k+1}
=\frac{\Delta u}{2}\frac{\sin u_k}{u_k}.
$$

よって

$$
S_{2M+1}q(x_M)
=\frac2\pi\sum_{k=0}^{M}
\frac{\sin u_k}{u_k}\Delta u.
$$

これは $[0,\pi]$ 上の中点 Riemann 和なので

$$
S_{2M+1}q(x_M)
\to\frac2\pi\int_0^\pi\frac{\sin u}{u}\,du
\approx1.17898.
$$

右側の値1を約0.17898だけ越え、跳躍幅2に対して約8.949%の超過が残ります。

4. Fejér 核は非負で積分が $2\pi$ です。したがって $|q|\le1$ から

$$
\begin{aligned}
|\sigma_Nq(x)|
&=\left|\frac1{2\pi}\int_{-\pi}^{\pi}q(x-t)K_N(t)\,dt\right|\\
&\le\frac1{2\pi}\int_{-\pi}^{\pi}|q(x-t)|K_N(t)\,dt\\
&\le\frac1{2\pi}\int_{-\pi}^{\pi}K_N(t)\,dt=1.
\end{aligned}
$$

よって Fejér 平均は値域 $[-1,1]$ を越えません。通常の Fourier有限和では Dirichlet 核が符号を変えるため、跳躍近傍で正負の重みが作る超過が残ります。

5. $q^2(x)=1$ が跳躍点以外で成り立つので

$$
\frac1\pi\int_{-\pi}^{\pi}q(x)^2\,dx
=\frac1\pi(2\pi)=2.
$$

[係数エネルギー等式](#thm-fou2-parseval)の右辺は奇数次の正弦係数だけなので

$$
2
=\sum_{k=0}^{\infty}
\left(\frac{4}{\pi(2k+1)}\right)^2
=\frac{16}{\pi^2}
\sum_{k=0}^{\infty}\frac1{(2k+1)^2}.
$$

したがって

$$
\boxed{
\sum_{k=0}^{\infty}\frac1{(2k+1)^2}=\frac{\pi^2}{8}
}.
$$

6. 本章の二乗平均収束定理は区分的連続な $q$ に適用できるため

$$
\int_{-\pi}^{\pi}|q-S_Nq|^2\,dx\to0.
$$

一方、Gibbs の計算で $x_M\to0+$ なのに

$$
S_{2M+1}q(x_M)\to1.17898\ldots
$$

となりました。$q(x_M)=1$ なので、その点での誤差は約0.17898から0へ行きません。したがって最大誤差は0へ行かず、一様収束ではありません。

二乗平均では振動が残る領域の幅が縮むことが効きます。一様収束では一番悪い一点を見続けるので、この Gibbs 超過を無視できません。
<!-- solution-end -->

---

## 13. まとめ

本章では、旧 Fourier 教材を証明依存先にせず、FOU1 と Riemann 積分の範囲から Fourier 級数の無限段階を構成しました。

- 各点収束・一様収束・二乗平均収束を分離した。
- Dirichlet 核の閉形式と Fourier 有限和の積分表示を有限和から導いた。
- Riemann 積分可能関数の振動積分が高周波で消えることを階段関数近似から証明した。
- 区分的 $C^1$ 関数の Fourier有限和が、跳躍点では左右極限の平均へ収束することを証明した。
- 矩形波で Gibbs 現象の約8.949%の持続する超過量を Riemann 和から導いた。
- Fejér 核が非負・正規化・原点集中を満たすことを証明し、連続周期関数への一様収束を示した。
- Fejér 平均を使って三角多項式の一様稠密性を得た。
- 区分的連続関数を連続関数へ局所補間し、三角多項式近似と FOU1 の最小二乗性をつないで Fourier 有限和の二乗平均収束を証明した。
- 二乗平均収束から Parseval 等式と三角系の完全性を導いた。
- Parseval 等式を $x$ と矩形波へ適用し、逆二乗和を具体的に計算した。

次の FOU3 では、周期離散周波数から実直線上の連続周波数へ移り、Fourier 変換・関数をずらして積分する合成演算・反転を扱います。
