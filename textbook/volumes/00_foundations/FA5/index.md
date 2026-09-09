# FA5 標準関数解析 V：spectrum・resolvent

<!-- definition-example-audit: strict -->

FA4 までで Banach 空間、双対空間、Hahn–Banach、弱位相・弱*位相とコンパクト性を準備しました。本章では一つの有界作用素 $T$ を固定し、

```text
Neumann級数
  ↓
可逆作用素の摂動安定性
  ↓
resolvent集合は開・resolventは正則
  ↓
大きな |λ| では λI-T が可逆
  ↓
spectrum は有界閉集合
  ↓ Liouville + Hahn–Banach
spectrum は空でない
  ↓
多項式 spectral mapping
  ↓ Cauchy積分評価
spectral radius formula
```

を一続きに証明します。

全章を通じて $X\ne\{0\}$ を **複素 Banach 空間**、$T\in\mathcal B(X)$ を有界線形作用素とします。複素数体を仮定する理由は spectrum 非空性で Liouville と代数学の基本定理を使うからです。実 Banach 空間上の作用素を実数だけで調べると spectrum が空になる例があります。

既知とする主な結果は [FA2 の有界逆定理](../FA2/index.md#thm-fa2-bounded-inverse)、[Hahn–Banach のノルム保存拡張](../F0_02C6_Hahn_Banach_分離定理/index.md#ref-hahn-banach-norm-preserving-extension)、[CA3 の Cauchy積分公式](../CA3/index.md#thm-ca3-cauchy-integral-formula)、[Liouvilleの定理](../CA3/index.md#thm-ca3-liouville)、[代数学の基本定理](../CA3/index.md#cor-ca3-fta) です。FA6 の compact operator、Fredholm 理論、FA7 の自己共役 compact operator の spectral theorem は使いません。

---

## 1. spectrum は「固有値集合」の無限次元版ではあるが、同じものではない

有限次元では行列 $A$ に対して

$$
\det(\lambda I-A)=0
$$

と「$\lambda I-A$ が可逆でない」は同値です。さらに有限次元線形写像では単射・全射・可逆が同値なので、非可逆性は固有ベクトルの存在で検出できます。

無限次元では事情が違います。有界作用素 $S:X\to X$ が単射でも全射とは限らず、代数的に全単射でも Banach 空間でなければ逆写像の有界性が自動とは限りません。そこで「固有ベクトルがあるか」ではなく、**$\lambda I-T$ が Banach 空間の有界作用素として可逆か**を調べます。

<a id="def-fa5-resolvent-spectrum"></a>
<!-- formal-statement-start -->
### 定義（resolvent集合・spectrum）

$T\in\mathcal B(X)$ に対して

$$
\rho(T)
:=
\{\lambda\in\mathbb C:\lambda I-T\text{ が }\mathcal B(X)\text{ で可逆}\}
$$

を **resolvent集合** といい、

$$
\sigma(T):=\mathbb C\setminus\rho(T)
$$

を **spectrum（スペクトル）** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa5-resolvent-spectrum -->
**定義の確認：有限次元では固有値集合へ戻る。**

$X=\mathbb C^n$、$T$ を行列 $A$ で表すとします。$\lambda I-A$ が非可逆であることと、その核に $0$ でないベクトルがあることは同値です。従って

$$
\sigma(A)=\{\lambda:\exists x\ne0,\ Ax=\lambda x\}.
$$

ここだけを見ると spectrum は単なる固有値集合に見えますが、後で unilateral shift が **固有値を一つも持たないのに閉単位円板全体を spectrum に持つ**ことを示します。
<!-- definition-example-end -->

Banach 性のおかげで、$\lambda I-T$ が有界線形写像として全単射なら [有界逆定理](../FA2/index.md#thm-fa2-bounded-inverse) により逆写像も自動的に有界です。従って本章では「$\lambda I-T$ が全単射」と「$\lambda\in\rho(T)$」を同値に扱えます。ただし、この同値に Banach 性が入っていることは忘れないでください。

<a id="def-fa5-resolvent-operator"></a>
<!-- formal-statement-start -->
### 定義（resolvent作用素）

$\lambda\in\rho(T)$ に対して

$$
R(\lambda,T):=(\lambda I-T)^{-1}\in\mathcal B(X)
$$

を **resolvent作用素** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa5-resolvent-operator -->
**定義の確認：スカラー作用素。**

$T=aI$ とすると

$$
\lambda I-T=(\lambda-a)I.
$$

従って $\rho(T)=\mathbb C\setminus\{a\}$、$\sigma(T)=\{a\}$ であり、

$$
R(\lambda,T)=\frac1{\lambda-a}I.
$$

一般の resolvent は、このスカラー関数 $1/(\lambda-a)$ を作用素値へ持ち上げたものと考えられます。
<!-- definition-example-end -->

---

## 2. Neumann級数：$1/(1-z)$ を作用素へ持ち上げる

<a id="lem-fa5-neumann-series"></a>
<!-- formal-statement-start -->
### 補題（Neumann級数）

$S\in\mathcal B(X)$ が $\|S\|<1$ を満たすなら $I-S$ は可逆で、

$$
(I-S)^{-1}
=
\sum_{n=0}^{\infty}S^n
$$

が作用素ノルムで成り立つ。また

$$
\|(I-S)^{-1}\|
\le
\frac1{1-\|S\|}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\mathcal B(X)$ は作用素ノルムで Banach 空間なので、

$$
\sum_{n=0}^{\infty}\|S^n\|
\le
\sum_{n=0}^{\infty}\|S\|^n
=
\frac1{1-\|S\|}<\infty
$$

から級数

$$
A:=\sum_{n=0}^{\infty}S^n
$$

は作用素ノルムで収束します。

有限和 $A_N=I+S+\cdots+S^N$ については

$$
(I-S)A_N=A_N(I-S)=I-S^{N+1}.
$$

$\|S^{N+1}\|\le\|S\|^{N+1}\to0$ だから、作用素ノルムで $N\to\infty$ とすると

$$
(I-S)A=A(I-S)=I.
$$

従って $A=(I-S)^{-1}$ です。さらに三角不等式から

$$
\|A\|
\le
\sum_{n=0}^{\infty}\|S\|^n
=
\frac1{1-\|S\|}.
$$

$\square$
<!-- proof-end -->

重要なのは $S^n x$ を各 $x$ ごとに収束させただけではなく、**作用素ノルムで級数を収束させた**ことです。これにより得られた極限自身が有界作用素になり、積との極限交換も正当化できます。

---

## 3. resolvent集合は開いている

$\lambda_0\in\rho(T)$ を一つ知っていると、その近くの $\lambda$ も可逆であることが Neumann級数から従います。

<a id="thm-fa5-resolvent-open"></a>
<!-- formal-statement-start -->
### 定理（resolvent集合の開性と局所級数表示）

$\lambda_0\in\rho(T)$ とする。もし

$$
|\lambda-\lambda_0|\,\|R(\lambda_0,T)\|<1
$$

なら $\lambda\in\rho(T)$ であり、

$$
R(\lambda,T)
=
\sum_{n=0}^{\infty}
(-1)^n(\lambda-\lambda_0)^nR(\lambda_0,T)^{n+1}
$$

が作用素ノルムで成り立つ。従って $\rho(T)$ は開集合で、$\lambda\mapsto R(\lambda,T)$ は $\rho(T)$ 上で作用素ノルム値の正則関数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$R_0=R(\lambda_0,T)$ と書きます。まず

$$
\lambda I-T
=(\lambda_0 I-T)
\bigl[I+(\lambda-\lambda_0)R_0\bigr]
$$

です。実際、右辺を展開すると

$$
(\lambda_0I-T)+(\lambda-\lambda_0)I
=\lambda I-T.
$$

仮定より

$$
\|-(\lambda-\lambda_0)R_0\|<1,
$$

なので [Neumann級数](#lem-fa5-neumann-series) を $S=-(\lambda-\lambda_0)R_0$ に適用できます。従って角括弧は可逆で、

$$
\begin{aligned}
R(\lambda,T)
&=
\bigl[I+(\lambda-\lambda_0)R_0\bigr]^{-1}R_0\\
&=
\sum_{n=0}^{\infty}
(-1)^n(\lambda-\lambda_0)^nR_0^{n+1}.
\end{aligned}
$$

特に中心 $\lambda_0$、半径 $1/\|R_0\|$ の開円板は $\rho(T)$ に含まれるので $\rho(T)$ は開です。

最後の級数は $|\lambda-\lambda_0|<1/\|R_0\|$ 上で作用素ノルム絶対収束する冪級数です。従って resolvent は局所的に作用素ノルム値冪級数で表され、正則です。さらに一次係数を読むと

$$
\frac{d}{d\lambda}R(\lambda,T)
=-R(\lambda,T)^2.
$$

$\square$
<!-- proof-end -->

この証明は「逆行列は連続である」を既知として使っていません。逆写像の安定性そのものを Neumann級数から作っています。

<a id="thm-fa5-resolvent-identity"></a>
<!-- formal-statement-start -->
### 定理（resolvent恒等式）

$\lambda,\mu\in\rho(T)$ に対して

$$
R(\lambda,T)-R(\mu,T)
=(\mu-\lambda)R(\lambda,T)R(\mu,T)
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

可逆作用素 $A,B$ について

$$
A^{-1}-B^{-1}=A^{-1}(B-A)B^{-1}
$$

です。$A=\lambda I-T$、$B=\mu I-T$ と置けば

$$
B-A=(\mu-\lambda)I
$$

なので

$$
R(\lambda,T)-R(\mu,T)
=(\mu-\lambda)R(\lambda,T)R(\mu,T).
$$

また右辺を $\lambda,\mu$ を交換して比較すると resolvent 同士が可換であることも分かります。$\square$
<!-- proof-end -->

---

## 4. 大きな $|\lambda|$ では必ず可逆

$|\lambda|>\|T\|$ なら

$$
\lambda I-T
=
\lambda\left(I-\frac{T}{\lambda}\right)
$$

で、$\|T/\lambda\|<1$ です。従って Neumann級数から

$$
R(\lambda,T)
=
\frac1\lambda
\sum_{n=0}^{\infty}\frac{T^n}{\lambda^n}.
$$

さらに

$$
\begin{aligned}
\|R(\lambda,T)\|
&\le
\frac1{|\lambda|}
\sum_{n=0}^{\infty}
\left(\frac{\|T\|}{|\lambda|}\right)^n\\
&=
\frac1{|\lambda|-\|T\|}.
\end{aligned}
$$

この一行が spectrum の有界性と、後の Liouville 証明での無限遠評価を同時に与えます。

<a id="thm-fa5-spectrum-compact"></a>
<!-- formal-statement-start -->
### 定理（spectrumのcompact性とノルム円板評価）

$T\in\mathcal B(X)$ に対して

$$
\sigma(T)
\subset
\{\lambda\in\mathbb C:|\lambda|\le\|T\|\}.
$$

また $\sigma(T)$ は閉集合である。従って $\sigma(T)$ はコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上の Neumann級数から $|\lambda|>\|T\|$ なら $\lambda\in\rho(T)$ です。従って

$$
\sigma(T)\subset\{|\lambda|\le\|T\|\}.
$$

一方、[resolvent集合の開性](#thm-fa5-resolvent-open)により $\rho(T)$ は開なので、その補集合 $\sigma(T)$ は閉です。複素平面で有界閉集合はコンパクトだから結論を得ます。$\square$
<!-- proof-end -->

ここまででは spectrum が **空である可能性** はまだ排除していません。空集合も有界閉集合だからです。非空性には複素解析が本質的に入ります。

---

## 5. spectrum は空にならない

<a id="thm-fa5-spectrum-nonempty"></a>
<!-- formal-statement-start -->
### 定理（複素Banach空間上のspectrum非空性）

$X\ne\{0\}$ を複素 Banach 空間、$T\in\mathcal B(X)$ とする。このとき

$$
\sigma(T)\ne\varnothing.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

背理法で $\sigma(T)=\varnothing$ と仮定します。このとき $\rho(T)=\mathbb C$ なので $R(\lambda,T)$ は全平面で定義されます。

$0\ne x\in X$ と $f\in X^*$ を任意に取り、スカラー値関数

$$
g_{x,f}(\lambda)
:=
f(R(\lambda,T)x)
$$

を考えます。[resolventの局所級数表示](#thm-fa5-resolvent-open)を有界線形汎関数 $f$ に通せば、$g_{x,f}$ は整関数です。

$|\lambda|>\|T\|$ では

$$
|g_{x,f}(\lambda)|
\le
\|f\|\,\|R(\lambda,T)\|\,\|x\|
\le
\frac{\|f\|\,\|x\|}{|\lambda|-\|T\|},
$$

従って $|\lambda|\to\infty$ で $g_{x,f}(\lambda)\to0$ です。たとえば $|\lambda|\ge\|T\|+1$ なら右辺は $\|f\|\|x\|$ 以下です。

残る閉円板 $|\lambda|\le\|T\|+1$ 上では $g_{x,f}$ は連続なのでコンパクト性から有界です。従って $g_{x,f}$ は全平面で有界な整関数です。[Liouvilleの定理](../CA3/index.md#thm-ca3-liouville)により $g_{x,f}$ は定数であり、無限遠で0へ行くので

$$
g_{x,f}\equiv0.
$$

これは任意の $f\in X^*$ について成り立ちます。任意の $\lambda\in\mathbb C$ を固定すると

$$
f(R(\lambda,T)x)=0
\qquad(\forall f\in X^*).
$$

[Hahn–Banach のノルム保存拡張](../F0_02C6_Hahn_Banach_分離定理/index.md#ref-hahn-banach-norm-preserving-extension)により、$y\ne0$ なら $f(y)\ne0$ となる $f\in X^*$ が存在します。従って

$$
R(\lambda,T)x=0.
$$

しかし $R(\lambda,T)$ は可逆作用素なので単射であり、$x\ne0$ に矛盾します。よって $\sigma(T)$ は空ではありません。$\square$
<!-- proof-end -->

### 5.1 仮定はどこで使ったか

- **Banach 性**：全単射有界作用素の逆が有界であること、$\mathcal B(X)$ で Neumann級数を収束させることに使う。
- **複素数体**：$g_{x,f}$ に Liouville を適用する。実数体のままでは同じ議論はできない。
- **$X\ne\{0\}$**：矛盾に使う非零ベクトル $x$ を取るため。
- **Hahn–Banach**：作用素値 resolvent が0かどうかを、全てのスカラー観測 $f(R(\lambda,T)x)$ から判定するため。

特に Hahn–Banach は飾りではありません。「全ての連続線形汎関数が $y$ を0と見るなら $y=0$」という点分離を使う場所が、証明末尾に一箇所あります。

### 5.2 実数体では何が壊れるか

$X=\mathbb R^2$ 上の90度回転

$$
T=
\begin{pmatrix}
0&-1\\
1&0
\end{pmatrix}
$$

を実数 $\lambda$ だけで調べると

$$
\det(\lambda I-T)=\lambda^2+1>0
$$

なので全ての $\lambda\in\mathbb R$ で可逆です。したがって「実 spectrum」を同じ定義で作れば空になります。複素化すると $\pm i$ が現れ、複素 spectrum は非空になります。

---

## 6. 多項式は spectrum をそのまま写す

<a id="thm-fa5-polynomial-spectral-mapping"></a>
<!-- formal-statement-start -->
### 定理（多項式spectral mapping theorem）

複素多項式 $p$ と $T\in\mathcal B(X)$ に対して

$$
\sigma(p(T))
=
p(\sigma(T)).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $\mu\in\mathbb C$ を固定します。$p$ が定数なら主張は直接確認できるので、非定数とします。[代数学の基本定理](../CA3/index.md#cor-ca3-fta)により

$$
p(z)-\mu
=c\prod_{j=1}^{m}(z-\alpha_j),
\qquad c\ne0
$$

と因数分解できます。従って

$$
p(T)-\mu I
=c\prod_{j=1}^{m}(T-\alpha_j I).
$$

各因子は $T$ の多項式なので互いに可換です。

まず $\mu\notin p(\sigma(T))$ とします。このとき全ての根 $\alpha_j$ は $\sigma(T)$ の外、すなわち $\alpha_j\in\rho(T)$ です。従って各 $T-\alpha_jI$ は可逆で、その積 $p(T)-\mu I$ も可逆です。よって $\mu\notin\sigma(p(T))$ です。

逆に $\mu\notin\sigma(p(T))$ とします。すると積

$$
P=c\prod_{j=1}^{m}(T-\alpha_jI)
$$

は可逆です。固定した $j$ に対し

$$
Q_j
:=
c\prod_{k\ne j}(T-\alpha_kI)
$$

と置けば $P=(T-\alpha_jI)Q_j=Q_j(T-\alpha_jI)$ です。全ての因子が可換なので $P^{-1}$ も各因子と可換し、

$$
(T-\alpha_jI)(Q_jP^{-1})=I,
\qquad
(Q_jP^{-1})(T-\alpha_jI)=I.
$$

従って $T-\alpha_jI$ は可逆です。全ての $j$ について $\alpha_j\notin\sigma(T)$ なので、$p(z)=\mu$ を満たす spectrum 上の点は存在せず

$$
\mu\notin p(\sigma(T)).
$$

両方向の補集合が一致するため主張を得ます。$\square$
<!-- proof-end -->

「可換な因子の積が可逆なら各因子も可逆」という部分を省略しないことがポイントです。一般の非可換環では片側逆の扱いに注意が必要ですが、ここでは全てが同じ $T$ の多項式なので可換性を明示的に使えます。

---

## 7. spectral radius

<a id="def-fa5-spectral-radius"></a>
<!-- formal-statement-start -->
### 定義（spectral radius）

$T\in\mathcal B(X)$ に対し

$$
r(T)
:=
\max\{|\lambda|:\lambda\in\sigma(T)\}
$$

を **spectral radius（スペクトル半径）** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa5-spectral-radius -->
**定義の確認：冪零作用素。**

$T^m=0$ なら多項式 spectral mapping theorem から

$$
\sigma(T)^m
=
\sigma(T^m)
=
\sigma(0)
=
\{0\}.
$$

従って $\sigma(T)=\{0\}$、$r(T)=0$ です。$T\ne0$ でも $r(T)=0$ は起こり得るので、spectral radius は作用素ノルムそのものではありません。
<!-- definition-example-end -->

[spectrum の非空性](#thm-fa5-spectrum-nonempty)と compact 性により最大値は実際に存在します。またノルム円板評価から

$$
r(T)\le\|T\|.
$$

多項式 spectral mapping theorem を $p(z)=z^n$ に適用すると

$$
\sigma(T^n)=\{\lambda^n:\lambda\in\sigma(T)\},
$$

従って

$$
r(T^n)=r(T)^n.
$$

これと $r(T^n)\le\|T^n\|$ を合わせると

$$
r(T)
\le
\|T^n\|^{1/n}
\qquad(n\ge1).
$$

つまり作用素の高冪の成長率は spectrum の半径より小さくなれません。実は極限でちょうど一致します。

<a id="thm-fa5-spectral-radius-formula"></a>
<!-- formal-statement-start -->
### 定理（spectral radius formula）

$T\in\mathcal B(X)$ に対して

$$
r(T)
=
\lim_{n\to\infty}\|T^n\|^{1/n}
=
\inf_{n\ge1}\|T^n\|^{1/n}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### Step 1：$\|T^n\|^{1/n}$ の極限が存在する

$a_n=\|T^n\|$ と置くと

$$
a_{m+n}\le a_ma_n
$$

です。ある $m$ で $a_m=0$ なら $T^m=0$ なので以後 $a_n=0$ となり、主張は明らかです。以下 $a_n>0$ とします。

$$
L:=\inf_{m\ge1}a_m^{1/m}
$$

と置きます。固定した $m$ に対し $n=qm+r$、$0\le r<m$ と書けば

$$
a_n
\le
a_m^q a_r.
$$

$C_m:=\max(1,a_0,a_1,\dots,a_{m-1})$ とすれば

$$
a_n^{1/n}
\le
a_m^{q/n}C_m^{1/n}.
$$

$n\to\infty$ で $q/n\to1/m$、$C_m^{1/n}\to1$ なので

$$
\limsup_{n\to\infty}a_n^{1/n}
\le
a_m^{1/m}.
$$

$m$ は任意だから

$$
\limsup a_n^{1/n}\le L.
$$

一方 $L\le a_n^{1/n}$ は全ての $n$ で成り立つので

$$
L\le\liminf a_n^{1/n}.
$$

従って極限が存在し、その値は $L$ です。

#### Step 2：$r(T)\le L$

上で示した

$$
r(T)\le\|T^n\|^{1/n}
$$

を全ての $n$ について使えば

$$
r(T)\le L.
$$

#### Step 3：Cauchy積分で $L\le r(T)$ を示す

任意の $R>r(T)$ を固定します。円 $|\lambda|=R$ は spectrum と交わらないので resolvent 集合に含まれます。compact 円周上で resolvent は連続だから

$$
M_R
:=
\max_{|\lambda|=R}\|R(\lambda,T)\|<\infty.
$$

さらに $R_0>\max(R,\|T\|)$ を取ります。$|\lambda|=R_0$ では Neumann 展開

$$
R(\lambda,T)
=
\sum_{k=0}^{\infty}\frac{T^k}{\lambda^{k+1}}
$$

が円周上一様に作用素ノルム収束します。

$x\in X$、$f\in X^*$ を固定します。項別積分ができるので

$$
\frac1{2\pi i}
\int_{|\lambda|=R_0}
\lambda^n f(R(\lambda,T)x)\,d\lambda
=
f(T^n x).
$$

なぜなら展開後の $k$ 番目の項は

$$
f(T^kx)\lambda^{n-k-1}
$$

であり、円周積分が0でないのは $k=n$ のときだけだからです。

$R<|\lambda|<R_0$ には spectrum がありません。従ってスカラー関数

$$
\lambda\longmapsto
\lambda^n f(R(\lambda,T)x)
$$

はこの閉環状領域を含む開集合で正則です。Cauchy–Goursat による境界積分の相殺で外円を内円へ移せるので

$$
f(T^nx)
=
\frac1{2\pi i}
\int_{|\lambda|=R}
\lambda^n f(R(\lambda,T)x)\,d\lambda.
$$

ML評価から

$$
\begin{aligned}
|f(T^nx)|
&\le
\frac1{2\pi}(2\pi R)
R^n
M_R\|f\|\|x\|\\
&=
M_RR^{n+1}\|f\|\|x\|.
\end{aligned}
$$

[Hahn–Banach のノルム保存拡張](../F0_02C6_Hahn_Banach_分離定理/index.md#ref-hahn-banach-norm-preserving-extension)から

$$
\|y\|
=
\sup_{\|f\|\le1}|f(y)|
$$

なので、$\|x\|\le1$、$\|f\|\le1$ について上の評価を取れば

$$
\|T^n\|
\le
M_RR^{n+1}.
$$

従って

$$
L
=
\lim_{n\to\infty}\|T^n\|^{1/n}
\le
\lim_{n\to\infty}
M_R^{1/n}R^{1+1/n}
=R.
$$

これは全ての $R>r(T)$ で成り立つので $R\downarrow r(T)$ として

$$
L\le r(T).
$$

Step 2 と合わせて $L=r(T)$ です。Step 1 で $L=\inf_n\|T^n\|^{1/n}$ も示しているので全ての等式が従います。$\square$
<!-- proof-end -->

この証明では Banach 値 Cauchy積分公式を新しく仮定していません。$f(R(\lambda,T)x)$ と **スカラー化してから**通常の複素線積分を使い、最後に Hahn–Banach で作用素ノルムへ戻しました。

---

## 8. 例：有限次元から無限次元へ

### 例1：Jordan block は非対角化可能でも spectrum は一点

$$
T=
\begin{pmatrix}
2&1\\
0&2
\end{pmatrix}
$$

とします。このとき

$$
\lambda I-T
=
\begin{pmatrix}
\lambda-2&-1\\
0&\lambda-2
\end{pmatrix}
$$

なので $\lambda\ne2$ なら

$$
R(\lambda,T)
=
\begin{pmatrix}
(\lambda-2)^{-1}&(\lambda-2)^{-2}\\
0&(\lambda-2)^{-1}
\end{pmatrix}.
$$

従って $\sigma(T)=\{2\}$ です。非対角化可能性は resolvent に二次の極として見えますが、spectrum の集合そのものは固有値2だけです。

### 例2：unilateral shift は固有値なしで閉単位円板を spectrum に持つ

$X=\ell^2(\mathbb N)$ 上で

$$
S(x_1,x_2,x_3,\dots)
=(0,x_1,x_2,\dots)
$$

と置きます。$\|S\|=1$ です。

まず $|\lambda|>1$ なら Neumann級数により $\lambda\in\rho(S)$ です。

次に $0<|\lambda|<1$ とします。もし

$$
(\lambda I-S)x=e_1
$$

を満たす $x\in\ell^2$ があれば、座標ごとに

$$
\lambda x_1=1,
\qquad
\lambda x_{n+1}-x_n=0
$$

だから

$$
x_n=\lambda^{-n}.
$$

これは $|\lambda|<1$ では $\ell^2$ に属しません。従って $\lambda I-S$ は全射でなく、$\lambda\in\sigma(S)$ です。$\lambda=0$ でも $-Sx$ の第1成分は常に0なので $e_1$ を像に持たず、$0\in\sigma(S)$ です。

最後に $|\lambda|=1$ とします。

$$
x^{(N)}
=
\frac1{\sqrt N}
(1,\lambda^{-1},\dots,\lambda^{-(N-1)},0,\dots)
$$

と置くと $\|x^{(N)}\|=1$ で、内部座標は相殺して

$$
\|(S-\lambda I)x^{(N)}\|
=
\sqrt{\frac2N}
\longrightarrow0.
$$

もし $S-\lambda I$ が可逆なら

$$
\|x\|
\le
\|(S-\lambda I)^{-1}\|\,\|(S-\lambda I)x\|
$$

が全ての $x$ で成り立つので、この列は矛盾です。従って $|\lambda|=1$ も spectrum に入ります。

以上から

$$
\sigma(S)=\{\lambda:|\lambda|\le1\}.
$$

一方 $Sx=\lambda x$ を解くと、$\lambda\ne0$ なら第1成分から $x_1=0$、帰納的に全成分0です。$\lambda=0$ でも $S$ は単射なので $x=0$。従って **$S$ は固有値を一つも持ちません**。

ここが有限次元との決定的な違いです。spectrum は「固有ベクトルの集合」ではなく、「$\lambda I-T$ の有界可逆性が壊れる場所」です。

### 例3：乗算作用素の spectrum は値域そのもの

$X=C([0,1])$ に一様ノルムを入れ、

$$
(Mf)(t)=t f(t)
$$

とします。

$\lambda\notin[0,1]$ なら連続関数

$$
\frac1{\lambda-t}
$$

は $[0,1]$ 上有界なので、

$$
((\lambda I-M)^{-1}g)(t)
=
\frac{g(t)}{\lambda-t}
$$

が有界逆作用素を与えます。

一方 $\lambda\in[0,1]$ なら

$$
(\lambda I-M)f=1
$$

は $t=\lambda$ で左辺0、右辺1となるので解を持ちません。従って

$$
\sigma(M)=[0,1].
$$

しかも $(M-\lambda I)f=0$ なら $t\ne\lambda$ で $f(t)=0$、連続性から $f(\lambda)=0$ でもあるため $f=0$ です。つまりこの例でも spectrum の各点は固有値ではありません。

---

## 9. 章末演習

### Level A

<a id="ex-fa5-a01"></a>
#### FA5-A01 Neumann級数の逆作用素評価
- Level: A

$S\in\mathcal B(X)$、$\|S\|\le q<1$ とする。

1. $I-S$ が可逆であることを示せ。
2. $\|(I-S)^{-1}-I\|\le q/(1-q)$ を示せ。

<!-- solution-start -->
### 解答

Neumann級数から

$$
(I-S)^{-1}=I+S+S^2+\cdots.
$$

従って

$$
\begin{aligned}
\|(I-S)^{-1}-I\|
&\le
\sum_{n=1}^{\infty}\|S\|^n\\
&\le
\sum_{n=1}^{\infty}q^n
=
\frac{q}{1-q}.
\end{aligned}
$$

逆が存在するだけでなく、$S$ が0に近いほど逆作用素が $I$ に近いことを定量化しています。
<!-- solution-end -->

<a id="ex-fa5-a02"></a>
#### FA5-A02 resolvent恒等式から局所評価
- Level: A

$\lambda,\mu\in\rho(T)$ とする。resolvent恒等式から

$$
\|R(\lambda,T)-R(\mu,T)\|
\le
|\lambda-\mu|\,\|R(\lambda,T)\|\,\|R(\mu,T)\|
$$

を示せ。

<!-- solution-start -->
### 解答

resolvent恒等式

$$
R(\lambda,T)-R(\mu,T)
=(\mu-\lambda)R(\lambda,T)R(\mu,T)
$$

に作用素ノルムの劣乗法性を適用すれば

$$
\begin{aligned}
\|R(\lambda,T)-R(\mu,T)\|
&\le
|\mu-\lambda|
\|R(\lambda,T)\|
\|R(\mu,T)\|.
\end{aligned}
$$

これにより resolvent の連続性も直接見えます。
<!-- solution-end -->

<a id="ex-fa5-a03"></a>
#### FA5-A03 2次Jordan blockのresolvent
- Level: A

$$
T=
\begin{pmatrix}
a&1\\
0&a
\end{pmatrix}
$$

について $\sigma(T)$ と $R(\lambda,T)$ を求めよ。

<!-- solution-start -->
### 解答

$$
\lambda I-T
=
\begin{pmatrix}
\lambda-a&-1\\
0&\lambda-a
\end{pmatrix}.
$$

$\lambda\ne a$ なら逆行列は

$$
R(\lambda,T)
=
\begin{pmatrix}
(\lambda-a)^{-1}&(\lambda-a)^{-2}\\
0&(\lambda-a)^{-1}
\end{pmatrix}.
$$

$\lambda=a$ では非可逆なので

$$
\sigma(T)=\{a\}.
$$

固有値の集合は一点ですが、非自明な Jordan 部分が resolvent の $(\lambda-a)^{-2}$ に現れています。
<!-- solution-end -->

<a id="ex-fa5-a04"></a>
#### FA5-A04 平行移動とスカラー倍
- Level: A

$c\in\mathbb C$、$a\in\mathbb C\setminus\{0\}$ とする。定義から

$$
\sigma(T+cI)=\sigma(T)+c,
\qquad
\sigma(aT)=a\,\sigma(T)
$$

を示せ。

<!-- solution-start -->
### 解答

まず

$$
\lambda I-(T+cI)
=(\lambda-c)I-T.
$$

従って左辺が可逆であることと $\lambda-c\in\rho(T)$ は同値です。補集合を取れば

$$
\lambda\in\sigma(T+cI)
\iff
\lambda-c\in\sigma(T),
$$

すなわち $\sigma(T+cI)=\sigma(T)+c$ です。

次に

$$
\lambda I-aT
=a\left(\frac\lambda a I-T\right).
$$

$a\ne0$ なのでスカラー $a$ は可逆性を変えません。よって

$$
\lambda\in\sigma(aT)
\iff
\lambda/a\in\sigma(T),
$$

従って $\sigma(aT)=a\sigma(T)$ です。
<!-- solution-end -->

### Level B

<a id="ex-fa5-b01"></a>
#### FA5-B01 spectrumまでの距離とresolvent norm
- Level: B

$\lambda\in\rho(T)$ とする。resolvent の局所級数表示から

$$
\operatorname{dist}(\lambda,\sigma(T))
\ge
\frac1{\|R(\lambda,T)\|}
$$

を示し、同値な形

$$
\|R(\lambda,T)\|
\ge
\frac1{\operatorname{dist}(\lambda,\sigma(T))}
$$

を得よ。

<!-- solution-start -->
### 解答

局所級数表示の定理によれば

$$
|\mu-\lambda|\,\|R(\lambda,T)\|<1
$$

なら $\mu\in\rho(T)$ です。従って中心 $\lambda$、半径

$$
\frac1{\|R(\lambda,T)\|}
$$

の開円板は spectrum と交わりません。よって $\lambda$ から spectrum までの距離は少なくともこの半径で、

$$
\operatorname{dist}(\lambda,\sigma(T))
\ge
\frac1{\|R(\lambda,T)\|}.
$$

両辺が正なので逆数を取れば第二式です。resolvent norm は spectrum に近づくと少なくとも距離の逆数ほど大きくなることが分かります。
<!-- solution-end -->

<a id="ex-fa5-b02"></a>
#### FA5-B02 unilateral shiftのspectrumを再構成する
- Level: B

$S:\ell^2(\mathbb N)\to\ell^2(\mathbb N)$ を

$$
S(x_1,x_2,\dots)=(0,x_1,x_2,\dots)
$$

とする。本文を参照せず、次を順に示せ。

1. $\|S\|=1$。
2. $|\lambda|>1$ なら $\lambda\in\rho(S)$。
3. $|\lambda|<1$ なら $\lambda I-S$ は全射でない。
4. $|\lambda|=1$ なら単位ベクトル列 $x^{(N)}$ で $\|(S-\lambda I)x^{(N)}\|\to0$ を構成できる。
5. $S$ は固有値を持たないが $\sigma(S)=\{|\lambda|\le1\}$。

<!-- solution-start -->
### 解答

$S$ は座標を一つ右へずらすだけなので

$$
\|Sx\|_2^2
=\sum_{n\ge1}|x_n|^2
=\|x\|_2^2,
$$

従って $\|S\|=1$ です。

$|\lambda|>1$ では $\|S/\lambda\|<1$ だから

$$
(\lambda I-S)^{-1}
=
\frac1\lambda
\sum_{n=0}^{\infty}\left(\frac S\lambda\right)^n.
$$

$0<|\lambda|<1$ で $(\lambda I-S)x=e_1$ と仮定すると

$$
x_n=\lambda^{-n},
$$

となり $\ell^2$ に入らないため全射でありません。$\lambda=0$ では $Sx$ の第1成分が常に0なのでやはり全射でありません。

$|\lambda|=1$ では

$$
x^{(N)}
=
N^{-1/2}(1,\lambda^{-1},\dots,\lambda^{-(N-1)},0,\dots)
$$

と置けば

$$
\|x^{(N)}\|=1,
\qquad
\|(S-\lambda I)x^{(N)}\|=\sqrt{2/N}\to0.
$$

可逆なら有界逆作用素により $\|(S-\lambda I)x\|$ は $\|x\|$ を下から正の定数倍で抑えるので矛盾です。

最後に $Sx=\lambda x$ は $\lambda\ne0$ なら第1成分から順に全成分0、$\lambda=0$ でも $S$ の単射性から $x=0$。従って固有値はありません。以上から spectrum は閉単位円板全体です。
<!-- solution-end -->

<a id="ex-fa5-b03"></a>
#### FA5-B03 射影作用素のspectrum
- Level: B

$P\in\mathcal B(X)$ が $P^2=P$ を満たすとする。

1. 多項式 spectral mapping theorem から $\sigma(P)\subset\{0,1\}$ を示せ。
2. $P=0$、$P=I$、$P\ne0,I$ の三場合で $\sigma(P)$ を決定せよ。

<!-- solution-start -->
### 解答

$p(z)=z^2-z$ とすると $p(P)=0$ です。spectral mapping theorem から

$$
p(\sigma(P))
=
\sigma(p(P))
=\sigma(0)
=\{0\}.
$$

従って spectrum の各 $\lambda$ は

$$
\lambda^2-\lambda=0
$$

を満たし、$\lambda\in\{0,1\}$ です。

$P=0$ なら $\sigma(P)=\{0\}$、$P=I$ なら $\sigma(P)=\{1\}$ です。

$P\ne0,I$ とします。$P\ne I$ なので $I-P$ は零でなく、ある $x$ について $(I-P)x\ne0$。しかも

$$
P(I-P)x=Px-P^2x=0,
$$

だから $0$ は固有値です。また $P\ne0$ なのである $x$ で $Px\ne0$、

$$
P(Px)=P^2x=Px
$$

より $1$ も固有値です。従って

$$
\sigma(P)=\{0,1\}.
$$
<!-- solution-end -->

### Level C

<a id="ex-fa5-c01"></a>
#### FA5-C01 spectrum非空性とspectral radius formulaの依存を監査する
- Level: C

$X\ne\{0\}$ を複素 Banach 空間、$T\in\mathcal B(X)$ とする。次を一つの論証として再構成せよ。

1. $|\lambda|>\|T\|$ での Neumann 展開。
2. $\sigma(T)$ の compact 性。
3. $\sigma(T)=\varnothing$ と仮定したとき $f(R(\lambda,T)x)$ に Liouville を適用して矛盾を得ること。
4. $r(T)\le\|T^n\|^{1/n}$。
5. 任意の $R>r(T)$ に対して Cauchy積分評価から $\|T^n\|\le M_RR^{n+1}$ を得ること。
6. どこで複素数体、Banach 性、Hahn–Banach を使ったかを列挙すること。

<!-- solution-start -->
### 解答

$|\lambda|>\|T\|$ なら

$$
R(\lambda,T)
=
\frac1\lambda
\sum_{n=0}^{\infty}\frac{T^n}{\lambda^n},
\qquad
\|R(\lambda,T)\|
\le
\frac1{|\lambda|-\|T\|}.
$$

よって spectrum は $\{|\lambda|\le\|T\|\}$ に含まれます。resolvent集合は Neumann 摂動で開なので spectrum は閉、従って compact です。

もし spectrum が空なら resolvent は全平面で正則です。固定した $0\ne x\in X$ と $f\in X^*$ に対して

$$
g(\lambda)=f(R(\lambda,T)x)
$$

は整関数で、上の無限遠評価と閉円板上の連続性から全平面で有界です。Liouville により定数、しかも無限遠で0なので $g\equiv0$。全ての $f$ が $R(\lambda,T)x$ を0と見るので Hahn–Banach の点分離から $R(\lambda,T)x=0$ となり、可逆性に反します。従って spectrum は非空です。

多項式 spectral mapping theorem から

$$
r(T^n)=r(T)^n
$$

で、$r(T^n)\le\|T^n\|$ より

$$
r(T)\le\|T^n\|^{1/n}.
$$

逆向きには $R>r(T)$ を固定し

$$
M_R=\max_{|\lambda|=R}\|R(\lambda,T)\|
$$

とします。大円上の Neumann 展開から $f(T^nx)$ を resolvent の円周積分で取り出し、spectrum の外側で円周を半径 $R$ まで縮めると

$$
f(T^nx)
=
\frac1{2\pi i}
\int_{|\lambda|=R}
\lambda^n f(R(\lambda,T)x)\,d\lambda.
$$

ML評価と Hahn–Banach のノルム双対表示により

$$
\|T^n\|\le M_RR^{n+1}.
$$

$n$ 乗根を取り $n\to\infty$、さらに $R\downarrow r(T)$ として

$$
\limsup\|T^n\|^{1/n}\le r(T).
$$

一方は既に逆向き不等式を得ているので等号です。

依存は次の通りです。

- Banach 性：$\mathcal B(X)$ で Neumann級数を収束させ、有界逆定理を使う。
- 複素数体：Liouville、代数学の基本定理、Cauchy積分を使う。
- Hahn–Banach：双対が点を分離すること、および $\|y\|=\sup_{\|f\|\le1}|f(y)|$ でスカラー評価をノルム評価へ戻すこと。

この三つを曖昧に「標準的議論」とまとめないことが本問の要点です。
<!-- solution-end -->

---

## 10. まとめと次章との境界

- spectrum は $\lambda I-T$ の **有界可逆性が壊れる場所**であり、無限次元では固有値集合より広い。
- Neumann級数は可逆性の局所安定性を直接与え、resolvent集合の開性と作用素値正則性を生む。
- $|\lambda|>\|T\|$ の Neumann 展開から spectrum はノルム円板内の閉集合になる。
- spectrum 非空性は Liouville だけでは完結せず、作用素値 resolvent をスカラー化し、最後に Hahn–Banach の点分離で戻す。
- 多項式 spectral mapping theorem は複素多項式の因数分解と、$T$ の多項式同士の可換性から得られる。
- spectral radius formula は高冪のノルム成長率と spectrum の幾何を結び、逆向き評価では resolvent の Cauchy積分が働く。
- 本章では compact operator、Fredholm alternative、自己共役 compact operator の固有展開は使っていない。これらは FA6・FA7 で初めて扱う。

次章 FA6 では compact operator を定義し、有限ランク近似・Riesz lemma を経て、非零 spectrum の各点が固有値として現れ有限重複度を持つという Riesz–Fredholm 構造へ進みます。
