# U3-38 Fourier／特性関数による価格付け

[前講の手法横断比較](../U3-37/index.md#def-u3-37-benchmark)では、同じ欧州型 call を解析式・二項木・PDE・Monte Carlo で価格付けしました。今回は**価格の確率分布の密度を直接積分しなくても、特性関数があれば価格を計算できるか**を考えます。

指数関数の期待値は、あるモデルでは密度より簡単に求まります。しかし call の支払額 $(S_T-K)_+$ は無限遠で増大し、行使価格 $K$ をそのまま Fourier 変換しても一般に積分が収束しません。そこで対数行使価格方向に**減衰を掛けてから変換する**のが今回の道具です。Fourier 反転の解析的根拠は既習の[FOU3 Fourier反転定理](../../../解析系/FOU/FOU3/index.md#thm-fou3-inversion)を用い、金融固有の変換と誤差の評価はこの講義で導きます。

## 1. 市場設定と特性関数

現在を時点0、満期を $T>0$ 年とし、$S_0=s>0$ 円、行使価格 $K>0$ 円とします。無リスク金利 $r$ と連続配当利回り $q$ はともに年率です。

年率変動率 $\sigma>0$（年$^{-1/2}$）も定数とします。$Q$ は[リスク中立測度](../U3-15/index.md#thm-u3-15-risk-neutral-measure)です。[GBM の明示解](../U3-14/index.md#thm-u3-14-explicit-gbm)による対数満期価格 $X=\log S_T$ は

$$
X=m+\sqrt v\,Z,\quad Z\sim N(0,1)\ (Q\text{ の下}),\qquad
m=\log s+(r-q-\sigma^2/2)T,\quad v=\sigma^2T>0
$$

を満たします。$S_T$ の単位を円で固定したうえで、$\log S_T$ は「円を価格の基準単位として数値化した値」の対数と解釈します。指数関数 $e^{iuX}$ の期待値を使うと、価格の分布を一つの関数として保持できます。これを**特性関数**といい、後で指数モーメントが存在する場合には複素数の引数まで拡張します。

<a id="def-u3-38-characteristic"></a>

<!-- formal-statement-start -->
> **定義（対数満期価格の特性関数と複素延長）**  
> 実確率変数 $X$ に対し、実数 $u$ と虚数単位 $i^2=-1$ で、特性関数を

$$
\varphi_X(u)=E_Q[e^{iuX}]
$$

> と定める。複素引数 $z=u-ib$（$u\in\mathbb R,b\ge0$）に対して指数モーメント $E_Q[e^{bX}]<\infty$ が成り立つなら、同じ期待値を

$$
\varphi_X(z)=E_Q[e^{izX}]
$$

> により定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-38-characteristic -->
**定義の確認**：$X=x_0$ が定数なら $e^{izX}=e^{izx_0}$ は絶対可積分であり $\varphi_X(z)=e^{izx_0}$ です。特に $\varphi_X(0)=1$、実数 $u$ では $|\varphi_X(u)|=1$ です。正規分布の $X$ では任意の $b\ge0$ に対し $E_Q[e^{bX}]=e^{bm+b^2v/2}<\infty$ ですから、必要な複素引数がすべて使えます。
<!-- definition-example-end -->

<a id="prop-u3-38-gbm-phi"></a>

<!-- formal-statement-start -->
> **命題（GBM の対数価格の複素特性関数）**  
> 上記の $m\in\mathbb R,v>0$ で $X=m+\sqrt v Z$、$Z\sim N(0,1)$ とすると、任意の $z\in\mathbb C$ に対し次の式が成立する。

$$
\varphi_X(z)=\exp(izm-vz^2/2).
$$
<!-- formal-statement-end -->

### 証明の見取り図

正規乱数の指数モーメントを実パラメータから複素引数へ延長すると、Fourier 積分の周波数をずらすときにも同じ式が使えます。

<!-- proof-start -->
### 証明

実数 $a$ に対して正規密度の平方完成により

$$
E[e^{aZ}]
=\frac1{\sqrt{2\pi}}\int_{\mathbb R}
e^{-x^2/2+ax}\,dx
=e^{a^2/2}\frac1{\sqrt{2\pi}}
\int_{\mathbb R}e^{-(x-a)^2/2}\,dx=e^{a^2/2}.
$$

複素数 $w$ に対して $F(w)=E[e^{wZ}]$ と置きます。$w$ がコンパクト集合に動いても $|e^{wx-x^2/2}|\le e^{B|x|-x^2/2}$ という共通の可積分上界を取れます。$x$ 倍した導関数にも同じ種類の上界があるので、積分の中を複素微分でき、

$$
F'(w)=\frac1{\sqrt{2\pi}}\int_{\mathbb R}x e^{wx-x^2/2}\,dx
$$

です。一方、$x$ に関する導関数を積分すると、端点では Gaussian の減衰により境界項は消えて

$$
0=\int_{\mathbb R}\frac d{dx}e^{wx-x^2/2}\,dx
=\int_{\mathbb R}(w-x)e^{wx-x^2/2}\,dx.
$$

従って $F'(w)=wF(w)$ です。積の微分から

$$
\frac d{dw}\bigl(e^{-w^2/2}F(w)\bigr)=0
$$

が得られ、$F(0)=1$ より $F(w)=e^{w^2/2}$ です。これは[Gaussian Fourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform)とも整合します。$w=iz\sqrt v$ を代入して

$$
E[e^{izX}]=e^{izm}E[e^{iz\sqrt v Z}]
=e^{izm-vz^2/2}.
$$

です。また $z=u-ib$ なら絶対値が $e^{bX}$ となり、正規分布の指数モーメントで期待値は存在します。
<!-- proof-end -->

ここまでの式は特性関数だけであり、まだオプション価格ではありません。次に strike を動かして支払額の変換を作ります。

## 2. なぜ減衰が必要なのか

$k=\log K\in\mathbb R$、$D=e^{-rT}$ と置くと[リスク中立評価の定義](../U3-17/index.md#def-u3-17-valuation)は

$$
C(e^k)=D E_Q[(e^X-e^k)_+].
$$

$k\to-\infty$ で $C(e^k)$ は通常 $D E_Q[e^X]>0$ に近づきます。そのまま $\int_{\mathbb R}C(e^k)e^{iuk}dk$ を作ると左端で積分できません。正の係数 $\alpha$ を選び、左端の定数的な振る舞いを $e^{\alpha k}$ で減らします。右端まで可積分になるには、株価の十分高い指数モーメントも要ります。

<a id="def-u3-38-damped-call"></a>

<!-- formal-statement-start -->
> **定義（減衰した対数行使価格 call）**  
> $X$ は実確率変数、$D=e^{-rT}>0$ とし、$E_Q[e^{(\alpha+1)X}]<\infty$ を満たす $\alpha>0$ を一つ固定する。$k\in\mathbb R$ に対し

$$
c_\alpha(k)=e^{\alpha k}D E_Q[(e^X-e^k)_+]
$$

> と定義する。正の指数 $\alpha$ は減衰係数であり、$e^{\alpha k}$ 自体は割引係数ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-38-damped-call -->
**定義の確認**：$X=\log100$ が確定しているモデルを考えます。$E[e^{(\alpha+1)X}]=100^{\alpha+1}<\infty$ で、$k<\log100$ では $c_\alpha(k)=De^{\alpha k}(100-e^k)$、$k\ge\log100$ では0です。左端で $e^{\alpha k}\to0$ となり、右端では支払額そのものが0です。さらに

$$
\int_{\mathbb R}c_\alpha(k)\,dk
=D\int_{-\infty}^{\log100}(100e^{\alpha k}-e^{(\alpha+1)k})dk
=\frac{D100^{\alpha+1}}{\alpha(\alpha+1)}.
$$

これで**減衰後に可積分になる**という条件を実際に確認できました。
<!-- definition-example-end -->

## 3. 価格を周波数積分で表す

変換の符号規約に注意します。既習の[FOU3 の Fourier変換](../../../解析系/FOU/FOU3/index.md#def-fou3-fourier-transform)は $e^{-iuk}$ を使いますが、ここでは計算の便宜から 指数に $+iuk$ を用いて $\Psi_\alpha(u)=\int_{\mathbb R}e^{iuk}c_\alpha(k)\,dk$ と置きます。これは FOU3 の Fourier 変換の周波数を $-u$ と置いたもので、反転時には $e^{-iuk}$ を使います。

<a id="prop-u3-38-payoff-transform"></a>

<!-- formal-statement-start -->
> **命題（減衰 call の Fourier 変換）**  
> $\alpha>0$、$E_Q[e^{(\alpha+1)X}]<\infty$、$D>0$ とする。$c_\alpha$ は $\mathbb R$ 上連続かつ可積分で、すべての実数 $u$ に対して

$$
\Psi_\alpha(u)
=\int_{\mathbb R}e^{iuk}c_\alpha(k)\,dk
=\frac{D\varphi_X(u-i(\alpha+1))}
{(\alpha+iu)(\alpha+1+iu)}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$X=x$ に固定すると call が正になるのは $k<x$ です。**まず strike を積分してから、$X$ の期待値を取る**順で計算します。順序交換に必要な絶対可積分性は $u=0$ の積分で見積もれます。

<!-- proof-start -->
### 証明

非負支払額の積分順序は [Tonelli の定理](../../../解析系/F0/F0-00D2C/index.md#thm-tonelli) で交換でき、

$$
\begin{aligned}
\int_{\mathbb R}|c_\alpha(k)|\,dk
&=D E_Q\left[\int_{-\infty}^{X}
e^{\alpha k}(e^X-e^k)\,dk\right]\\
&=D E_Q\left[
e^X\frac{e^{\alpha X}}{\alpha}
-\frac{e^{(\alpha+1)X}}{\alpha+1}\right]\\
&=\frac{D E_Q[e^{(\alpha+1)X}]}{\alpha(\alpha+1)}<\infty.
\end{aligned}
$$

$|e^{iuk}|=1$ なので、この評価は複素被積分関数の二重積分の絶対可積分性も与えます。絶対可積分なので [Fubini の定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02) により積分と期待値を交換します。固定した $x$ に対し $p=\alpha+iu$ と置けば $\operatorname{Re}p=\alpha>0$ であり、

$$
\begin{aligned}
\int_{-\infty}^x e^{pk}(e^x-e^k)\,dk
&=e^x\frac{e^{px}}p-\frac{e^{(p+1)x}}{p+1}\\
&=e^{(p+1)x}\left(\frac1p-\frac1{p+1}\right)\\
&=\frac{e^{(\alpha+1+iu)x}}
{(\alpha+iu)(\alpha+1+iu)}.
\end{aligned}
$$

$E_Q[e^{(\alpha+1+iu)X}]=\varphi_X(u-i(\alpha+1))$ を代入すると主張の変換公式です。

連続性も確認します。$k_n\to k$ として支払額 $(e^X-e^{k_n})_+\to(e^X-e^k)_+$ は各標本で連続です。$k_n$ を有界区間に制限すれば支払額は $e^X+e^{\sup k_n}$ 以下、これは $E[e^X]<\infty$ によって可積分です。[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)と $e^{\alpha k_n}\to e^{\alpha k}$ から $c_\alpha(k_n)\to c_\alpha(k)$ です。
<!-- proof-end -->

<a id="thm-u3-38-fourier-price"></a>

<!-- formal-statement-start -->
> **定理（特性関数からの欧州型 call 価格公式）**  
> $D=e^{-rT}>0$、$X=\log S_T$、$K=e^k>0$ とする。$\alpha>0$、$E_Q[e^{(\alpha+1)X}]<\infty$ なら、$C(K)=D E_Q[(S_T-K)_+]$ は

$$
C(e^k)=\frac{De^{-\alpha k}}{\pi}
\int_0^\infty
\operatorname{Re}\left[
\frac{e^{-iuk}\varphi_X(u-i(\alpha+1))}
{(\alpha+iu)(\alpha+1+iu)}
\right]du
$$

> と表せる。積分は絶対収束する。
<!-- formal-statement-end -->

### 証明の見取り図

前命題の変換は $1/u^2$ で減衰するので、[FOU3 Fourier反転](../../../解析系/FOU/FOU3/index.md#thm-fou3-inversion)の「元の関数も変換も $L^1$、元は連続」という三条件を満たします。負周波数を複素共役で正周波数へ折り返せば実数積分になります。

<!-- proof-start -->
### 証明

$b=\alpha+1$、$M=E_Q[e^{bX}]<\infty$ とします。[対数満期価格の特性関数と複素延長](#def-u3-38-characteristic)へ $z=u-ib$ を代入すれば、$\varphi_X(u-ib)=E_Q[e^{bX}e^{iuX}]$ です。

$|e^{iuX}|=1$ です。期待値の絶対値は、絶対値を期待値の中へ移すことで次のように抑えられます。

$$
|\varphi_X(u-ib)|
=\left|E_Q[e^{bX}e^{iuX}]\right|
\le E_Q[e^{bX}]=M.
$$

従って

$$
|\Psi_\alpha(u)|
\le\frac{DM}
{\sqrt{\alpha^2+u^2}\sqrt{(\alpha+1)^2+u^2}}.
$$

$|u|\ge1$ で右辺は $DM/u^2$ 以下であり、$|u|\le1$ では $DM/[\alpha(\alpha+1)]$ 以下です。よって $\Psi_\alpha\in L^1(\mathbb R)$ です。前命題より $c_\alpha$ は連続かつ $L^1$。そこで[Fourier反転定理](../../../解析系/FOU/FOU3/index.md#thm-fou3-inversion)を正符号変換へ周波数変数を反転して適用すると

$$
c_\alpha(k)=\frac1{2\pi}\int_{\mathbb R}
e^{-iuk}\Psi_\alpha(u)\,du.
$$

実数値 $c_\alpha$ の変換は $\Psi_\alpha(-u)=\overline{\Psi_\alpha(u)}$ です。従って $e^{-iuk}\Psi_\alpha(u)$ の $u$ と $-u$ の和は、その実部の2倍となり

$$
c_\alpha(k)=\frac1\pi\int_0^\infty
\operatorname{Re}[e^{-iuk}\Psi_\alpha(u)]du.
$$

最後に $C(e^k)=e^{-\alpha k}c_\alpha(k)$ と前命題の $\Psi_\alpha$ を代入します。絶対収束は示した $L^1$ 評価から従います。
<!-- proof-end -->

**どのモデルで使えるか**：価格を一つに確定するのは $Q$ と適切な割引が与えられている場合です。実確率 $P$ の特性関数をそのまま代入すると一般に無裁定価格ではありません。特性関数だけを差し替えれば多様なモデルに適用できる一方、指数モーメントが存在しないモデルには、この $\alpha>0$ の公式を無条件に適用できません。

## 4. 積分をどこで切り、どの幅で計算するか

実装では上限 $U>0$ までの積分しか計算できません。ここで

$$
H(u;k,\alpha)=
\frac{e^{-iuk}\varphi_X(u-i(\alpha+1))}
{(\alpha+iu)(\alpha+1+iu)},\qquad
g(u)=\operatorname{Re}H(u;k,\alpha)
$$

と記し、$A=De^{-\alpha k}/\pi$ とします。理想的な $C(K)=A\int_0^\infty g(u)du$ に対し、$U$ で切れば「尾部打切り」、$[0,U]$ を格子にすれば「求積離散化」の二つの誤差が生じます。

<a id="prop-u3-38-tail"></a>

<!-- formal-statement-start -->
> **命題（Fourier 積分の打切り誤差）**  
> 価格定理の条件の下で $M=E_Q[e^{(\alpha+1)X}]$ と置く。$U>0$ 以降を捨てた価格 $C_U=A\int_0^U g(u)du$ は

$$
|C(K)-C_U|
\le\frac{De^{-\alpha k}M}{\pi U}.
$$

> と評価できる。さらに $X\sim N(m,v)$、$v>0$ なら

$$
|C(K)-C_U|
\le\frac{De^{-\alpha k}M}{\pi vU^3}
e^{-vU^2/2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一般の場合は $|\varphi_X(u-i(\alpha+1))|\le M$、正規分布ならそれに Gaussian の $e^{-vu^2/2}$ が追加されます。積分の絶対値を尾部積分で上から抑えます。

<!-- proof-start -->
### 証明

$u\ge U>0$ では $|\alpha+iu|\ge u$ と $|\alpha+1+iu|\ge u$ より

$$
|H(u;k,\alpha)|\le M/u^2.
$$

従って $|g(u)|\le|H(u)|$ を使って

$$
|C-C_U|
\le A\int_U^\infty |g(u)|du
\le AM\int_U^\infty u^{-2}du=AM/U.
$$

正規分布では[GBM 特性関数](#prop-u3-38-gbm-phi)へ $z=u-i(\alpha+1)$ を代入します。$b=\alpha+1$ とおくと

$$
|\varphi_X(u-ib)|
=e^{bm+vb^2/2}e^{-vu^2/2}=M e^{-vu^2/2}.
$$

また $u\ge U$ では $u^{-2}\le U^{-2}$ です。$t\ge U>0$ のとき $t/U\ge1$ を用いて

$$
\begin{aligned}
\int_U^\infty\frac{e^{-vu^2/2}}{u^2}du
&\le\frac1{U^2}\int_U^\infty e^{-vu^2/2}du\\
&\le\frac1{U^3}\int_U^\infty u e^{-vu^2/2}du\\
&=\frac{e^{-vU^2/2}}{vU^3}.
\end{aligned}
$$

従って $AMe^{-vU^2/2}/(vU^3)$ が得られます。
<!-- proof-end -->

<a id="def-u3-38-trapezoid"></a>

<!-- formal-statement-start -->
> **定義（有限区間の複合台形価格）**  
> $U>0$、整数 $N\ge1$、$h=U/N$ とし、前節の $g$ を使って

$$
C_{U,h}=
A h\left[\frac{g(0)+g(U)}2+\sum_{j=1}^{N-1}g(jh)\right]
$$

> と定義する。$U$ は打切り上限、$h$ は周波数刻みである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-38-trapezoid -->
**定義の確認**：$U=2$、$N=2$ なら $h=1$、節点は $0,1,2$ で

$$
C_{2,1}=A\left[g(0)/2+g(1)+g(2)/2\right].
$$

端点の重みが $1/2$、中間節点の重みが1であることを確認します。$U$ だけ倍にし $N$ を据え置くと $h$ も倍になるので、打切り改善と離散化改善を混同してはいけません。
<!-- definition-example-end -->

<a id="prop-u3-38-trapezoid-bound"></a>

<!-- formal-statement-start -->
> **命題（台形価格の誤差分離）**  
> 上記の価格定理の条件に加え、$g\in C^2([0,U])$ とする。$B_U=\max_{0\le u\le U}|g''(u)|<\infty$ と置けば

$$
|C(K)-C_{U,h}|
\le |C(K)-C_U|+A\,\frac{Uh^2}{12}B_U.
$$

> 第一項には前節の打切り評価を使える。これは**固定した $U$** での $O(h^2)$ 求積評価である。
<!-- formal-statement-end -->

### 証明の見取り図

台形則の誤差は各小区間での関数の曲がり方に依存します。小区間の誤差を $N$ 個足し、無限区間からの尾部は別に残します。

<!-- proof-start -->
### 証明

$u_j=jh$ とし、$[u_j,u_{j+1}]$ で $g$ と両端を結ぶ一次補間の差を積分します。二回の部分積分により

$$
\int_{u_j}^{u_{j+1}}g(u)du
-\frac h2[g(u_j)+g(u_{j+1})]
=-\frac12\int_{u_j}^{u_{j+1}}
(u-u_j)(u_{j+1}-u)g''(u)\,du.
$$

右辺の絶対値は $B_U$ を外へ出して

$$
\frac{B_U}{2}\int_0^h t(h-t)dt
=\frac{B_U}{2}\left(\frac{h^3}2-\frac{h^3}3\right)
=\frac{B_Uh^3}{12}
$$

以下です。$N$ 区間を足すと $NB_Uh^3/12=UB_Uh^2/12$。最後に

$$
C-C_{U,h}=(C-C_U)+(C_U-C_{U,h})
$$

と分け三角不等式を使います。
<!-- proof-end -->

固定 $U$ の下では刻み $h$ を半分にすると台形誤差上界は4分の1ですが、**打切り誤差は減りません**。また $\alpha$ を大きくすれば必ず数値的に有利になるわけではありません。指数モーメント $M$ と係数 $e^{-\alpha k}$ が変わり、絶対値の大きな複素値を引き算するための丸め誤差も増え得ます。

## 5. Black–Scholes との独立検算

[配当付き Black–Scholes 公式](../U3-19/index.md#thm-u3-19-bsm-dividend)では $s=K=100$ 円、$r=0.05$ 年$^{-1}$、$q=0.02$ 年$^{-1}$、$\sigma=0.20$ 年$^{-1/2}$、$T=1$ 年なら

$$
d_1=\frac{\log(s/K)+(r-q+\sigma^2/2)T}{\sigma\sqrt T}=0.25,
\qquad d_2=0.05,
$$

$$
C_{\rm BS}=se^{-qT}\Phi(d_1)-Ke^{-rT}\Phi(d_2)
\approx9.227005508154\ \text{円}.
$$

これを Fourier 法で**独立に**計算します。$\alpha=1.5$ とすると $b=2.5$、$m=\log100+0.01$、$v=0.04$ で、[GBM 特性関数](#prop-u3-38-gbm-phi)を定理の被積分関数へ代入します。次の表は正の周波数だけに複合台形則を適用した例です（端点半重みを含みます）。

| 上限 $U$ | 刻み $h$ | Fourier 価格（円） | 閉形式との差（円） |
| ---: | ---: | ---: | ---: |
| 10 | 0.05 | 9.224027241 | 約 $-0.0029783$ |
| 20 | 0.05 | 9.226980580 | 約 $-0.0000249$ |
| 30 | 0.05 | 9.227005508 | 約 $-4.3\times10^{-10}$ |
| 40 | 0.20 | 9.227005508 | 丸め誤差程度 |

検算用の [fourier_pricing.py](assets/fourier_pricing.py) は **Python 3 標準ライブラリのみ**を使用します。$U$・$h$・$\alpha$ を変えた価格、独立な解析式との誤差を表示し、ゼロ配当・異なる行使価格・刻み幅を含む回帰テストを実行します。

ブラウザでも、次の実行欄から**同じ Python ファイル**を実行できます。上限ごとの価格と符号付き誤差を表として読み、$U$ を固定して刻みを変えた行と、刻みを固定して上限を変えた行を区別します。今回は単一銘柄・単一行使価格のスカラー価格誤差の比較なので、数値表で離散化と打切りを直接照合します。

~~~python-file-lab
# lab-id: U3-38-FOURIER-CALL
# lab-title: Fourier 積分と配当付き Black–Scholes 閉形式の照合
# lab-file: textbook/volumes/dream_thater/応用系/U/U3-38/assets/fourier_pricing.py
# timeout-ms: 15000
# lab-preset: 積分上限と台形刻みを変え、独立解析式と照合 |
~~~

ローカルの Python 3 環境では、同じファイルを次のように実行します。

~~~bash
python textbook/volumes/dream_thater/応用系/U/U3-38/assets/fourier_pricing.py
~~~

この方法の計算量は、一つの $K$ と一つの $(U,h)$ に対して特性関数評価が $N+1$ 回で $O(N)$ です。複数の行使価格を大量に同時評価するときは FFT も候補ですが、FFT ではさらに strike 格子幅と周期折返し（エイリアシング）が入ります。**この講義の直接台形則には FFT のエイリアシングはありません**。FFT と直接積分の誤差を同一視せず、実行時間の比較には複素指数計算の費用も含めます。

## 6. 演習と詳細解答

### Level A：定義・積分・数値の意味を確認する

<a id="ex-u3-38-a1"></a>
### U3-38-A1：確定対数価格の特性関数

- Level: A

$X=\log80$ が確定値のとき $\varphi_X(u)$ と $\varphi_X(u-2i)$ を求め、後者が存在することを確認せよ。

<!-- solution-start -->
**詳細解答**：[特性関数の定義](#def-u3-38-characteristic)へ代入すると、実数 $u$ に対して

$$
\varphi_X(u)=E[e^{iu\log80}]=80^{iu}.
$$

同様に $z=u-2i$ では $iz=iu+2$ で

$$
\varphi_X(u-2i)=E[e^{(iu+2)\log80}]=80^2\,80^{iu}.
$$

絶対値は $80^2$ で有限であり $E[e^{2X}]=80^2<\infty$ なので定義条件を満たします。
<!-- solution-end -->

<a id="ex-u3-38-a2"></a>
### U3-38-A2：減衰係数はなぜ正か

- Level: A

$X=\log100$、割引係数 $D=0.95$ とする。$\alpha=1$ で $\int_{\mathbb R}c_\alpha(k)dk$ を計算せよ。また $\alpha=0$ だと何が失敗するか。

<!-- solution-start -->
**詳細解答**：[減衰した call](#def-u3-38-damped-call)より $\alpha=1$ では

$$
\int c_1(k)dk=\frac{0.95\cdot100^2}{1(1+1)}=4750.
$$

$\alpha=0$ なら $k\to-\infty$ で $C(e^k)\to0.95\cdot100=95$ であり、左側の無限区間上で積分が発散します。$e^{\alpha k}$ による左端の減衰が失われるためです。
<!-- solution-end -->

<a id="ex-u3-38-a3"></a>
### U3-38-A3：複素周波数の引数

- Level: A

$\alpha=1.5$、$u=2$ とする。変換公式で評価すべき複素引数と分母の二因子を求めよ。

<!-- solution-start -->
**詳細解答**：[変換公式](#prop-u3-38-payoff-transform)から $\alpha+1=2.5$ であり、複素引数は $2-2.5i$ です。分母は

$$
(\alpha+iu)(\alpha+1+iu)=(1.5+2i)(2.5+2i).
$$

$i$ の前の符号を取り違えると指数モーメント $E[e^{2.5X}]$ でなく $E[e^{-2.5X}]$ を評価してしまいます。
<!-- solution-end -->

<a id="ex-u3-38-a4"></a>
### U3-38-A4：台形格子の重み

- Level: A

$U=4$、$N=4$、$A=0.01$、$g(0)=10,g(1)=6,g(2)=3,g(3)=1,g(4)=0$ とする。複合台形価格を計算せよ。

<!-- solution-start -->
**詳細解答**：[台形価格の定義](#def-u3-38-trapezoid)で $h=4/4=1$ です。従って

$$
C_{4,1}=0.01\left[\frac{10+0}{2}+6+3+1\right]
=0.01(15)=0.15.
$$

端点 $g(0)$ を10のまま加えると0.05だけ過大に評価します。
<!-- solution-end -->

<a id="ex-u3-38-a5"></a>
### U3-38-A5：誤差源を区別する

- Level: A

$U$ を固定して $N$ を100から200へ増やすとどの誤差上界がどう変わるか。また $N$ 固定で $U$ を倍にすると、両方の誤差を必ず改善すると言えるか。

<!-- solution-start -->
**詳細解答**：[台形誤差命題](#prop-u3-38-trapezoid-bound)の固定 $U$、固定 $B_U$ の条件で $h=U/N$ は半分、台形誤差上界 $AUh^2B_U/12$ は4分の1です。一方 [打切り誤差](#prop-u3-38-tail)は同じ $U$ なので変わりません。$N$ 固定で $U$ を倍にすると $h$ も倍になり、かつ $B_U$ の評価区間も広がるため、打切りは改善し得ても台形誤差は悪化し得ます。
<!-- solution-end -->

### Level B：証明条件と誤差機構を計算する

<a id="ex-u3-38-b1"></a>
### U3-38-B1：変換の分母を自力導出

- Level: B

$\alpha>0$、実数 $u$、固定値 $X=x$ とする。$\int_{-\infty}^{x}e^{(\alpha+iu)k}(e^x-e^k)dk$ を直接積分し、変換分母を導け。

<!-- solution-start -->
**詳細解答**：$p=\alpha+iu$ とおけば $\operatorname{Re}p>0$ なので $e^{pk},e^{(p+1)k}$ は $k\to-\infty$ で0になります。従って

$$
\begin{aligned}
\int_{-\infty}^{x}e^{pk}(e^x-e^k)dk
&=e^x\left[\frac{e^{pk}}p\right]_{-\infty}^x
-\left[\frac{e^{(p+1)k}}{p+1}\right]_{-\infty}^x\\
&=e^{(p+1)x}\left(\frac1p-\frac1{p+1}\right)\\
&=\frac{e^{(p+1)x}}{p(p+1)}.
\end{aligned}
$$

最後の分母は $(\alpha+iu)(\alpha+1+iu)$ であり、$1/p-1/(p+1)$ の差を一段飛ばさず評価した結果です。
<!-- solution-end -->

<a id="ex-u3-38-b2"></a>
### U3-38-B2：有限モーメントの必要性

- Level: B

$Y=e^X$ が $y\ge1$ で密度 $f_Y(y)=\gamma y^{-\gamma-1}$、$y<1$ で0、$\gamma=1.5$ とする（$D=1$）。call の期待支払額は有限であることを示し、$\alpha=1$ の減衰変換が適用できるか判定せよ。

<!-- solution-start -->
**詳細解答**：$f_Y$ は

$$
\int_1^\infty1.5y^{-2.5}dy
=1.5\left[\frac{y^{-1.5}}{-1.5}\right]_1^\infty=1
$$

で密度です。$E[Y]=1.5\int_1^\infty y^{-1.5}dy=1.5(2)=3<\infty$ なので、$(Y-K)_+\le Y$ からどの $K>0$ でも call 価格は有限です。一方

$$
E[Y^2]=1.5\int_1^\infty y^{-0.5}dy=\infty.
$$

$\alpha=1$ では必要な $E[e^{2X}]=E[Y^2]$ が無限大です。[減衰の定義](#def-u3-38-damped-call)の条件を満たさず、本講の Fourier 価格定理を適用できません。なお $\alpha$ を $0<\alpha<0.5$ と選べば $E[Y^{\alpha+1}]<\infty$ となり、同じ方法を適用できます。
<!-- solution-end -->

<a id="ex-u3-38-b3"></a>
### U3-38-B3：正規特性関数の絶対値

- Level: B

$X\sim N(m,v)$、$v>0$、$b>0$ とする。$|\varphi_X(u-ib)|$ を導き、なぜ価格公式の尾部が一般的な $1/U$ 評価より速く減るのか説明せよ。

<!-- solution-start -->
**詳細解答**：[GBM の特性関数](#prop-u3-38-gbm-phi)で $z=u-ib$ とすると $z^2=u^2-2iub-b^2$ です。指数の実部は

$$
\operatorname{Re}(izm-vz^2/2)
=bm-vu^2/2+vb^2/2.
$$

ゆえに

$$
|\varphi_X(u-ib)|=e^{bm+vb^2/2}e^{-vu^2/2}.
$$

前半は $E[e^{bX}]$、後半は周波数方向の Gaussian 減衰です。[打切り誤差命題](#prop-u3-38-tail)では一般の $M/u^2$ より強い $M e^{-vu^2/2}/u^2$ を積分できるため、$e^{-vU^2/2}/(vU^3)$ の上界を得ます。
<!-- solution-end -->

<a id="ex-u3-38-b4"></a>
### U3-38-B4：台形誤差の係数

- Level: B

$g(u)=u^2$、$U=2$、$N=2$、$A=1$ とする。積分値、台形値、誤差を求め、[台形誤差命題](#prop-u3-38-trapezoid-bound)の $1/12$ 係数を検算せよ。

<!-- solution-start -->
**詳細解答**：積分値は

$$
\int_0^2u^2du=\left[\frac{u^3}{3}\right]_0^2=\frac83.
$$

$h=1$、節点 $0,1,2$ なので台形値は

$$
1\left[\frac{0^2+2^2}{2}+1^2\right]=2+1=3.
$$

差の絶対値は $3-8/3=1/3$ です。$g''(u)=2$ から命題の右辺の有限区間部分は

$$
\frac{Uh^2}{12}\max|g''|=\frac{2\cdot1^2\cdot2}{12}=\frac13,
$$

で一致します。この問題では無限区間積分を対象にせず、台形誤差部分のみを検算しています。
<!-- solution-end -->

### Level C：導出・検証を一貫させる

<a id="ex-u3-38-c1"></a>
### U3-38-C1：Black–Scholes 価格の Fourier 検算設計

- Level: C

$s=K=100$ 円、$r=0.05$ 年$^{-1}$、$q=0.02$ 年$^{-1}$、$\sigma=0.20$ 年$^{-1/2}$、$T=1$ 年、$\alpha=1.5$ の欧州型 call を考える。

1. $m,v,b$ を明示し、変換公式へ代入した被積分関数を示せ。
2. $U=10,20,40$、$h=0.05$ で直接台形則を実行する手順と比較すべき解析式を示せ。
3. 積分上限と刻みをそれぞれ変更して、打切り・離散化・丸めのどれが疑われるか判別する実験計画を示せ。$\alpha=0$ にした場合の失敗も説明せよ。

<!-- solution-start -->
**詳細解答**：

**1. パラメータと複素引数**：$\sigma^2/2=0.02$ ですから

$$
m=\log100+(0.05-0.02-0.02)\cdot1=\log100+0.01,\quad
v=0.20^2\cdot1=0.04,\quad b=1.5+1=2.5.
$$

[GBM の対数価格の複素特性関数](#prop-u3-38-gbm-phi)より

$$
\varphi_X(u-2.5i)
=\exp\left(i(u-2.5i)(\log100+0.01)
-0.02(u-2.5i)^2\right).
$$

従って被積分関数は

$$
g(u)=\operatorname{Re}\left[
\frac{e^{-iu\log100}
\exp(i(u-2.5i)(\log100+0.01)-0.02(u-2.5i)^2)}
{(1.5+iu)(2.5+iu)}
\right].
$$

係数は $A=e^{-0.05}100^{-1.5}/\pi$ です。

**2. 台形計算と独立照合**：各 $U$ で整数 $N=U/0.05$ とし、$u_j=jU/N$ に対して $g(u_j)$ を計算します。[複合台形価格](#def-u3-38-trapezoid)の両端 $j=0,N$ に半重みを掛けて総和へ $A$ を掛けます。比較値は[配当付き閉形式](../U3-19/index.md#thm-u3-19-bsm-dividend)から

$$
d_1=\frac{0+(0.05-0.02+0.02)}{0.20}=0.25,\quad
d_2=0.25-0.20=0.05,
$$

$$
C_{\rm BS}=100e^{-0.02}\Phi(0.25)-100e^{-0.05}\Phi(0.05)
=9.227005508154\ldots\ \text{円}.
$$

$U=10$ では約 $9.22402724$ 円、$U=20$ では約 $9.22698058$ 円、$U=40$ では $9.227005508154$ 円に近づくことを確認します。

**3. 誤差の切り分け**：同じ $h$ で上限 $U$ を10→20→40と増やした際の価格変化は、主に積分尾部の影響を調べる指標になります。

次に $U=20$ を固定し、刻みを $h=0.2,0.1,0.05$ と減らして台形求積の $O(h^2)$ 誤差を調べます。ただし総誤差が打切りに支配されると変化は見えません。十分小さい刻みで値が機械精度程度しか変化しなければ、精度向上を根拠なく約束しません。

また $\alpha=0$ では $k\to-\infty$ の call は減衰せず、$c_0$ は $L^1$ になりません。このため[価格定理](#thm-u3-38-fourier-price)の前提を失います。
<!-- solution-end -->

## この講義で得たこと

正の減衰係数 $\alpha$ と有限な指数モーメントが、増大する call 支払額を Fourier 変換可能にします。特性関数の複素引数で期待値を評価し、Fourier 反転で strike ごとの価格へ戻せます。数値計算では上限 $U$ と刻み $h$ を独立に動かし、モデルの誤差と数値の誤差を分けます。次講 U3-39 では観測されたオプション価格から変動率を逆算する、インプライド・ボラティリティと校正へ進みます。
