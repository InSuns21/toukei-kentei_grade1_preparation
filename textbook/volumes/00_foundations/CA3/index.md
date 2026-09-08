# CA3 標準複素解析 III：Cauchy積分公式・Taylor展開・Liouville・最大値原理

<!-- definition-example-audit: strict -->

CA2 では、正則関数の閉曲線積分がどのような幾何の下で0になるかを証明しました。本章では、その消滅を「関数値を境界から復元する公式」へ変換します。中心になる流れは

```text
Cauchy–Goursat・ホモトピー不変性
  ↓ 穿孔円板の外周と小円の積分を比較
Cauchy積分公式
  ↓ 積分核の差商を円周上一様に制御
任意階の複素微分
  ↓ Cauchy核の有限幾何級数展開と剰余評価
Taylor展開（正則 ⇒ 解析的）
  ↓ ML評価
Cauchy評価
  ↓
Liouville ⇒ 代数学の基本定理
  ↓ Taylorの最初の非零係数
零点の孤立性・恒等定理
  ↓ Cauchy平均値公式の等号条件
最大値原理
  ↓ 逆数へ適用
複素解析の開写像定理
```

です。

既知とするのは [CA2 の複素線積分・Cauchy–Goursat・ホモトピー不変性](../CA2/index.md) までです。Laurent展開、可除特異点定理、留数定理、偏角原理、Rouchéの定理は使いません。とくに Cauchy積分公式の証明で $\zeta=z$ の特異点を「可除だから埋める」と処理すると CA4 の理論を先取りしやすいため、本章では **小円を実際に除き、外周積分と内周積分を比較してから小円半径を0へ送ります**。

---

## 1. 穿孔円板の境界積分

Cauchy積分公式では

$$
G_z(\zeta)=\frac{f(\zeta)}{\zeta-z}
$$

を積分します。$G_z$ は $\zeta=z$ で定義できないので、最初からその点を含む領域へ Cauchy の定理を適用してはいけません。

<a id="lem-ca3-punctured-disk-transfer"></a>
<!-- formal-statement-start -->
### 補題（穿孔円板の境界積分移送）

開集合 $U\subset\mathbb C$ が閉円板 $\overline{D(a,R)}$ を含み、$z\in D(a,R)$ とする。$G$ が $U\setminus\{z\}$ 上正則なら、

$$
0<\rho<R-|z-a|
$$

に対して、正向き円周

$$
C_R(t)=a+Re^{it},
\qquad
C_\rho(t)=z+\rho e^{it},
\qquad 0\le t\le2\pi
$$

の間に

$$
\int_{C_R}G(\zeta)\,d\zeta
-
\int_{C_\rho}G(\zeta)\,d\zeta
=0
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

外周から小円へ、円の中心と半径を同時に動かす

$$
H(s,t)
=(1-s)a+sz+\bigl((1-s)R+s\rho\bigr)e^{it}
$$

を考えます。$s=0$ で $C_R$、$s=1$ で $C_\rho$ です。

まずこの変形が $z$ を通らないことを確認します。$r_s=(1-s)R+s\rho$ と書くと

$$
H(s,t)-z
=(1-s)(a-z)+r_se^{it}.
$$

従って逆三角不等式から

$$
\begin{aligned}
|H(s,t)-z|
&\ge r_s-(1-s)|a-z|\\
&=(1-s)(R-|a-z|)+s\rho\\
&>0.
\end{aligned}
$$

よって変形中に特異点 $z$ は踏みません。

次に変形が大円板から出ないことを確認します。

$$
H(s,t)-a
=s(z-a)+r_se^{it}
$$

なので

$$
\begin{aligned}
|H(s,t)-a|
&\le s|z-a|+(1-s)R+s\rho\\
&=R+s\bigl(|z-a|+\rho-R\bigr)\\
&\le R,
\end{aligned}
$$

ここで $\rho<R-|z-a|$ を使いました。従って $H([0,1]\times[0,2\pi])$ は $\overline{D(a,R)}\setminus\{z\}$ に含まれます。

ここから積分の相殺を有限問題へ落とします。[CA2 のホモトピーの相対区分線形化](../CA2/index.md#lem-ca2-relative-pl-homotopy) と同じコンパクト性・一様連続性の議論で、長方形 $[0,1]\times[0,2\pi]$ を十分細かい有限三角形へ分け、各三角形の像が $U\setminus\{z\}$ 内の小さな凸円板に入るようにできます。各像三角形上で $G$ は正則なので [三角形版 Cauchy–Goursat](../CA2/index.md#thm-ca2-goursat-triangle) により境界積分は0です。

全三角形の境界積分を足すと内部辺は逆向きに二回現れて消えます。$t=0$ と $t=2\pi$ の辺については

$$
H(s,0)=H(s,2\pi)
$$

なので同じ曲線を逆向きにたどる二辺となり、ここも相殺します。残るのは $s=0$ の外周と $s=1$ の内周だけで、長方形境界の向きから内周は逆符号です。従って

$$
\int_{C_R}G\,d\zeta-
\int_{C_\rho}G\,d\zeta=0.
$$

これは「小円を除いた領域の正向き境界では、外周が正向き、内周が負向きになる」ことを有限三角形の相殺として書いたものです。$\square$
<!-- proof-end -->

この補題で重要なのは、特異点を消したことにしていない点です。$G$ が正則なのはあくまで $z$ を除いた場所であり、積分の比較もその穿孔領域だけで行っています。

---

## 2. Cauchy積分公式

<a id="thm-ca3-cauchy-integral-formula"></a>
<!-- formal-statement-start -->
### 定理（Cauchy積分公式）

$f$ を $\overline{D(a,R)}$ を含む開集合上で正則とする。$z\in D(a,R)$ なら

$$
f(z)
=
\frac{1}{2\pi i}
\int_{|\zeta-a|=R}
\frac{f(\zeta)}{\zeta-z}\,d\zeta,
$$

ここで円周は反時計回りを正向きとする。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定した $z\in D(a,R)$ に対し

$$
G_z(\zeta)=\frac{f(\zeta)}{\zeta-z}
$$

と置きます。これは $z$ を除けば正則です。$0<\rho<R-|z-a|$ に対して [穿孔円板の境界積分移送](#lem-ca3-punctured-disk-transfer) を使うと

$$
\int_{|\zeta-a|=R}
\frac{f(\zeta)}{\zeta-z}\,d\zeta
=
\int_{|\zeta-z|=\rho}
\frac{f(\zeta)}{\zeta-z}\,d\zeta.
$$

右辺を $\zeta=z+\rho e^{it}$、$0\le t\le2\pi$ とパラメータ表示します。このとき

$$
d\zeta=i\rho e^{it}\,dt,
\qquad
\zeta-z=\rho e^{it},
$$

よって

$$
\int_{|\zeta-z|=\rho}
\frac{f(\zeta)}{\zeta-z}\,d\zeta
=
i\int_0^{2\pi}f(z+\rho e^{it})\,dt.
$$

ここで $\rho\downarrow0$ の極限を省略せず評価します。$f$ は $z$ で連続なので

$$
\omega(\rho)
:=
\max_{|\eta-z|=\rho}|f(\eta)-f(z)|
\longrightarrow0.
$$

したがって

$$
\begin{aligned}
\left|
i\int_0^{2\pi}f(z+\rho e^{it})\,dt
-2\pi i f(z)
\right|
&\le
\int_0^{2\pi}|f(z+\rho e^{it})-f(z)|\,dt\\
&\le2\pi\omega(\rho)\\
&\longrightarrow0.
\end{aligned}
$$

一方、左辺の外周積分は $\rho$ に依存しません。従って

$$
\int_{|\zeta-a|=R}
\frac{f(\zeta)}{\zeta-z}\,d\zeta
=2\pi i f(z),
$$

すなわち主張を得ます。$\square$
<!-- proof-end -->

ここで使った正則性は二箇所に分かれます。$f$ の正則性により $G_z$ は穿孔領域で正則となり境界積分を移送でき、正則性から従う連続性により小円上の $f$ を中心値 $f(z)$ へ一様に近づけられます。

<a id="cor-ca3-cauchy-mean-value"></a>
<!-- formal-statement-start -->
### 系（Cauchy平均値公式）

$\overline{D(a,r)}$ を含む開集合で $f$ が正則なら

$$
f(a)
=
\frac1{2\pi}
\int_0^{2\pi}f(a+re^{it})\,dt.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Cauchy積分公式](#thm-ca3-cauchy-integral-formula) で $z=a$ とし、$\zeta=a+re^{it}$ と置けば

$$
\frac{d\zeta}{\zeta-a}
=
\frac{ire^{it}\,dt}{re^{it}}
=i\,dt.
$$

従って

$$
f(a)
=
\frac1{2\pi i}
\int_0^{2\pi}f(a+re^{it})i\,dt
=
\frac1{2\pi}\int_0^{2\pi}f(a+re^{it})\,dt.
\quad\square
$$
<!-- proof-end -->

### 例：Cauchy公式で円周積分を一行にする

$|\zeta|=2$ を正向きに回るとき、$e^z$ は閉円板上で正則なので

$$
\int_{|\zeta|=2}\frac{e^\zeta}{\zeta}\,d\zeta
=2\pi i e^0
=2\pi i.
$$

ただし「公式に代入した」だけで終えず、公式自体の証明では特異点0を含む円板へ直接 Cauchy の定理を使っていないことを区別してください。

---

## 3. 高階微分は境界積分から生まれる

Cauchy積分公式の右辺では、$z$ は積分曲線上を動かず分母だけに現れます。この距離の余裕が、微分と積分の交換を可能にします。

<a id="thm-ca3-cauchy-derivatives"></a>
<!-- formal-statement-start -->
### 定理（Cauchy高階導関数公式）

$f$ を $\overline{D(a,R)}$ を含む開集合上で正則とする。任意の $z\in D(a,R)$ と整数 $n\ge0$ に対して $f^{(n)}(z)$ が存在し、

$$
f^{(n)}(z)
=
\frac{n!}{2\pi i}
\int_{|\zeta-a|=R}
\frac{f(\zeta)}{(\zeta-z)^{n+1}}\,d\zeta
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$n=0$ は [Cauchy積分公式](#thm-ca3-cauchy-integral-formula) です。まず一回の微分交換を差商から確認します。

$z\in D(a,R)$ を固定し

$$
\delta=R-|z-a|>0
$$

とします。$|h|<\delta/2$ なら、円周 $|\zeta-a|=R$ 上で

$$
|\zeta-z|\ge\delta,
\qquad
|\zeta-z-h|\ge\frac\delta2.
$$

Cauchy公式の差商は

$$
\begin{aligned}
\frac{f(z+h)-f(z)}h
&=
\frac1{2\pi i}
\int_{|\zeta-a|=R}
f(\zeta)
\frac1h
\left(
\frac1{\zeta-z-h}-\frac1{\zeta-z}
\right)d\zeta\\
&=
\frac1{2\pi i}
\int_{|\zeta-a|=R}
\frac{f(\zeta)}{(\zeta-z-h)(\zeta-z)}\,d\zeta.
\end{aligned}
$$

極限候補との差は

$$
\frac1{(\zeta-z-h)(\zeta-z)}-
\frac1{(\zeta-z)^2}
=
\frac{h}{(\zeta-z-h)(\zeta-z)^2}.
$$

従って円周上一様に

$$
\left|
\frac1{(\zeta-z-h)(\zeta-z)}-
\frac1{(\zeta-z)^2}
\right|
\le
\frac{2|h|}{\delta^3}
\longrightarrow0.
$$

$f$ は円周上で有界で、曲線長は $2\pi R$ ですから [ML評価](../CA2/index.md#thm-ca2-reparam-ml) により積分全体の誤差も0へ行きます。よって

$$
f'(z)
=
\frac1{2\pi i}
\int_{|\zeta-a|=R}
\frac{f(\zeta)}{(\zeta-z)^2}\,d\zeta.
$$

高階も同じ機構です。整数 $m\ge1$ について

$$
K_m(w,\zeta)=\frac1{(\zeta-w)^m}
$$

とすると、$A=\zeta-w-h$, $B=\zeta-w$ と置いた代数恒等式

$$
\frac{A^{-m}-B^{-m}}h
=
\frac{B^{m-1}+B^{m-2}A+\cdots+A^{m-1}}{A^mB^m}
$$

から、$h\to0$ のとき

$$
\frac{K_m(w+h,\zeta)-K_m(w,\zeta)}h
\longrightarrow
\frac{m}{(\zeta-w)^{m+1}}
$$

となります。$w$ を固定し、円周までの距離の半分より $|h|$ を小さくすれば、上の分母は一様に正の下界を持つので、この収束も円周上一様です。従って同じ ML 評価で積分と差商極限を交換できます。

これを帰納的に繰り返すと、微分のたびに係数 $1,2,\ldots,n$ が掛かり、

$$
f^{(n)}(z)
=
\frac{n!}{2\pi i}
\int_{|\zeta-a|=R}
\frac{f(\zeta)}{(\zeta-z)^{n+1}}\,d\zeta
$$

を得ます。特に、正則関数は一回微分できるだけでなく任意回複素微分可能です。$\square$
<!-- proof-end -->

### 例：三階ではなく二階導関数を読む

$|\zeta|=2$ 上で

$$
I=\int_{|\zeta|=2}\frac{e^\zeta}{(\zeta-1)^3}\,d\zeta
$$

を考えます。高階公式で $n=2$ なので

$$
I=\frac{2\pi i}{2!}(e^z)''\big|_{z=1}\cdot2!
=\frac{2\pi i}{2!}\,2!e
=2\pi i e
$$

と書くのは係数の整理を誤りやすい書き方です。正しくは

$$
(e^z)''\big|_{z=1}
=
\frac{2!}{2\pi i}I,
$$

したがって

$$
I=\frac{2\pi i}{2!}e=\pi i e.
$$

分母の冪 $3$ は「二階導関数」に対応します。

---

## 4. 正則なら解析的

<a id="def-ca3-analytic-function"></a>
<!-- formal-statement-start -->
### 定義（解析的関数）

関数 $f$ が点 $a$ で **解析的** であるとは、ある $r>0$ と複素数列 $(c_n)_{n\ge0}$ が存在して

$$
f(z)=\sum_{n=0}^{\infty}c_n(z-a)^n
\qquad(|z-a|<r)
$$

と表せることをいう。領域の各点で解析的なら、その領域上で解析的という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca3-analytic-function -->
**定義の確認**：複素指数関数は

$$
e^z=\sum_{n=0}^{\infty}\frac{z^n}{n!}
$$

と表されるので0で解析的です。CA1で得た正則性だけから一般の正則関数にもこのような局所べき級数表示が必ず存在することを、次の定理で証明します。
<!-- definition-example-end -->

<a id="thm-ca3-taylor"></a>
<!-- formal-statement-start -->
### 定理（正則関数のTaylor展開）

$f$ が円板 $D(a,R)$ 上正則なら、任意の $z$ で $|z-a|<R$ に対して

$$
f(z)
=
\sum_{n=0}^{\infty}
\frac{f^{(n)}(a)}{n!}(z-a)^n.
$$

従って正則関数は解析的である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$z$ を $|z-a|<R$ の範囲で固定します。半径 $r$ を

$$
|z-a|<r<R
$$

となるように取れば、閉円板 $\overline{D(a,r)}$ は $D(a,R)$ に含まれます。[Cauchy積分公式](#thm-ca3-cauchy-integral-formula) により

$$
f(z)
=
\frac1{2\pi i}
\int_{|\zeta-a|=r}
\frac{f(\zeta)}{\zeta-z}\,d\zeta.
$$

円周上では

$$
q:=\left|\frac{z-a}{\zeta-a}\right|
=\frac{|z-a|}{r}<1.
$$

有限幾何級数の恒等式を使うと

$$
\frac1{\zeta-z}
=
\sum_{n=0}^{N}
\frac{(z-a)^n}{(\zeta-a)^{n+1}}
+
\frac{(z-a)^{N+1}}
{(\zeta-a)^{N+1}(\zeta-z)}.
$$

これは無限級数との交換をまだしていない、有限和と厳密な剰余の等式です。これを積分すると

$$
\begin{aligned}
f(z)
&=
\sum_{n=0}^{N}
\left[
\frac1{2\pi i}
\int_{|\zeta-a|=r}
\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta
\right](z-a)^n
+E_N(z).
\end{aligned}
$$

[Cauchy高階導関数公式](#thm-ca3-cauchy-derivatives) から角括弧は $f^{(n)}(a)/n!$ です。

残るのは $E_N(z)\to0$ の確認です。$M_r=\max_{|\zeta-a|=r}|f(\zeta)|$ とすると、円周上で

$$
|\zeta-z|
\ge r-|z-a|>0
$$

なので、剰余核は

$$
\left|
\frac{(z-a)^{N+1}}
{(\zeta-a)^{N+1}(\zeta-z)}
\right|
\le
\frac{q^{N+1}}{r-|z-a|}.
$$

従って ML 評価から

$$
\begin{aligned}
|E_N(z)|
&\le
\frac1{2\pi}
(2\pi r)M_r
\frac{q^{N+1}}{r-|z-a|}\\
&=
\frac{rM_r}{r-|z-a|}q^{N+1}
\longrightarrow0.
\end{aligned}
$$

よって

$$
f(z)
=
\sum_{n=0}^{\infty}
\frac{f^{(n)}(a)}{n!}(z-a)^n.
$$

$z$ は $D(a,R)$ 内で任意だったので、円板全体で Taylor 展開が得られました。ここで本質なのは、Cauchy核の幾何級数を「形式的に展開した」のではなく、有限剰余を一様に0へ抑えたことです。$\square$
<!-- proof-end -->

**注意**：実変数では $C^\infty$ 級でも Taylor 級数と元の関数が一致しない場合があります。複素解析では正則性だけで任意階微分可能性だけでなく、Taylor級数への一致まで強制されます。

---

## 5. Cauchy評価と Liouville

<a id="thm-ca3-cauchy-estimate"></a>
<!-- formal-statement-start -->
### 定理（Cauchy評価）

$f$ が $\overline{D(a,R)}$ を含む開集合上で正則で、

$$
M_R=\max_{|\zeta-a|=R}|f(\zeta)|
$$

とする。整数 $n\ge0$ に対し

$$
|f^{(n)}(a)|
\le
\frac{n!M_R}{R^n}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Cauchy高階導関数公式](#thm-ca3-cauchy-derivatives) を中心 $a$ で使うと

$$
f^{(n)}(a)
=
\frac{n!}{2\pi i}
\int_{|\zeta-a|=R}
\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta.
$$

円周上では

$$
\left|
\frac{f(\zeta)}{(\zeta-a)^{n+1}}
\right|
\le
\frac{M_R}{R^{n+1}},
$$

円周長は $2\pi R$ です。従って [ML評価](../CA2/index.md#thm-ca2-reparam-ml) により

$$
\begin{aligned}
|f^{(n)}(a)|
&\le
\frac{n!}{2\pi}
(2\pi R)
\frac{M_R}{R^{n+1}}\\
&=
\frac{n!M_R}{R^n}.
\end{aligned}
$$

半径 $R$ が分母へ $R^n$ として現れるのは、核が $R^{-(n+1)}$、曲線長が $R$ を一つ戻すからです。$\square$
<!-- proof-end -->

<a id="thm-ca3-liouville"></a>
<!-- formal-statement-start -->
### 定理（Liouvilleの定理）

$f$ が整関数で、ある $M<\infty$ に対し

$$
|f(z)|\le M
\qquad(z\in\mathbb C)
$$

なら、$f$ は定数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $a\in\mathbb C$ を固定します。整関数なので任意の $R>0$ に対して閉円板 $\overline{D(a,R)}$ 上で Cauchy 評価を使えます。$n=1$ とすると

$$
|f'(a)|
\le
\frac{M}{R}.
$$

左辺は $R$ に依存しないので、$R\to\infty$ とすれば

$$
f'(a)=0.
$$

$a$ は任意だから $f'\equiv0$ です。$\mathbb C$ は連結なので [CA1 の「導関数0なら定数」](../CA1/index.md#lem-ca1-zero-derivative-constant) により $f$ は定数です。$\square$
<!-- proof-end -->

<a id="cor-ca3-fta"></a>
<!-- formal-statement-start -->
### 系（代数学の基本定理）

非定数複素多項式

$$
p(z)=a_mz^m+a_{m-1}z^{m-1}+\cdots+a_0,
\qquad a_m\ne0,
\quad m\ge1
$$

は少なくとも一つ複素零点を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

零点を持たないと仮定します。このとき

$$
g(z)=\frac1{p(z)}
$$

は整関数です。Liouvilleを使うため、$g$ が有界であることを実際に示します。

$|z|\ge1$ では

$$
\sum_{k=0}^{m-1}|a_k||z|^k
\le
\left(\sum_{k=0}^{m-1}|a_k|\right)|z|^{m-1}.
$$

従って十分大きい $R$ を取り

$$
\left(\sum_{k=0}^{m-1}|a_k|\right)R^{m-1}
\le
\frac{|a_m|}{2}R^m
$$

とできます。$|z|\ge R$ なら同じ評価から

$$
\begin{aligned}
|p(z)|
&\ge
|a_m||z|^m-
\sum_{k=0}^{m-1}|a_k||z|^k\\
&\ge
\frac{|a_m|}{2}|z|^m.
\end{aligned}
$$

よって外側では

$$
|g(z)|
\le
\frac{2}{|a_m||z|^m}
\le
\frac{2}{|a_m|R^m}.
$$

内側の閉円板 $|z|\le R$ では、零点なしという仮定により $g$ は連続なのでコンパクト性から最大値を持ちます。従って $g$ は平面全体で有界です。

[Liouvilleの定理](#thm-ca3-liouville) から $g$ は定数となり、すると $p=1/g$ も定数です。これは $m\ge1$ に矛盾します。従って $p$ は零点を持ちます。$\square$
<!-- proof-end -->

ここで Liouville が効くのは「多項式が無限遠で大きくなる」だけではありません。零点なしなら逆数が **平面全体で正則** になり、外側の減衰と内側のコンパクト性を合わせて **平面全体で有界** にできるためです。

---

## 6. 零点の局所構造と恒等定理

<a id="thm-ca3-isolated-zeros-identity"></a>
<!-- formal-statement-start -->
### 定理（零点の孤立性・恒等定理）

$\Omega$ を領域、$f$ を $\Omega$ 上正則とする。

1. $a\in\Omega$ で $f(a)=0$ とする。このとき、ある近傍で $f\equiv0$ であるか、ある整数 $m\ge1$ と $a$ の近傍で正則な $g$ が存在して
   $$
   f(z)=(z-a)^m g(z),
   \qquad g(a)\ne0
   $$
   と書ける。後者では $a$ は孤立零点である。
2. $f$ の零点集合が $\Omega$ 内に集積点を持つなら $f\equiv0$ である。
3. $f,g$ が $\Omega$ 上正則で、一致集合
   $$
   \{z\in\Omega:f(z)=g(z)\}
   $$
   が $\Omega$ 内に集積点を持つなら $f\equiv g$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず1を示します。$a$ のまわりに閉包が $\Omega$ に入る円板を取り、[正則関数のTaylor展開](#thm-ca3-taylor) を使うと

$$
f(z)=\sum_{n=0}^{\infty}c_n(z-a)^n,
\qquad
c_n=\frac{f^{(n)}(a)}{n!}.
$$

$f(a)=0$ なので $c_0=0$ です。

すべての $c_n$ が0なら、この円板で $f\equiv0$ です。そうでなければ最小の $m\ge1$ で $c_m\ne0$ を取れます。このとき

$$
\begin{aligned}
f(z)
&=(z-a)^m
\left(
c_m+c_{m+1}(z-a)+c_{m+2}(z-a)^2+\cdots
\right)\\
&=(z-a)^m g(z).
\end{aligned}
$$

括弧内は同じ収束円板内で正則で、$g(a)=c_m\ne0$ です。連続性から十分小さい $r>0$ で $|z-a|<r$ なら $g(z)\ne0$ とできます。従ってこの近傍の零点は $a$ だけです。

次に2を示します。零点が $a\in\Omega$ へ集積しているとします。1の二分法で、もし $f$ が $a$ の近傍で恒等的に0でなければ $a$ は孤立零点になるはずで、集積性に反します。従って $f$ は $a$ のある近傍で0です。

$$
E=
\{x\in\Omega:\text{$x$ のある近傍で }f\equiv0\}
$$

と置きます。$E$ は定義から開で、今示したことから空でありません。$x_k\in E$ が $x_k\to x\in\Omega$ とします。$x_k$ が $x$ と異なる点を無限に含むなら、それらは $f$ の零点で $x$ に集積するので、同じ二分法から $x\in E$ です。もし十分先で $x_k=x$ ならもちろん $x\in E$ です。従って $E$ は $\Omega$ で閉でもあります。

$\Omega$ は連結で、$E$ は空でない開閉集合なので $E=\Omega$、すなわち $f\equiv0$ です。

3は $h=f-g$ に2を適用すれば従います。$\square$
<!-- proof-end -->

### 例：零点が一本の曲線上に並ぶことはできるか

領域内部で零点が一本の曲線上に連続的に並べば、曲線上の各点が零点の集積点になります。従って正則関数は領域全体で0です。非零正則関数の零点は、実二変数関数の零点集合よりはるかに剛直です。

---

## 7. 最大値原理

<a id="thm-ca3-maximum-modulus"></a>
<!-- formal-statement-start -->
### 定理（最大値原理）

$\Omega$ を領域、$f$ を $\Omega$ 上正則とする。ある $a\in\Omega$ が $|f|$ の局所最大点、すなわちある $r_0>0$ が存在して

$$
|f(z)|\le|f(a)|
\qquad(|z-a|<r_0)
$$

を満たすなら、$f$ は $\Omega$ 上定数である。

従って非定数正則関数の絶対値は領域内部で局所最大値を取らない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $f(a)=0$ なら、局所最大性から近傍で

$$
0\le|f(z)|\le0
$$

なので $f$ はその近傍で0です。[零点の孤立性・恒等定理](#thm-ca3-isolated-zeros-identity) により $f\equiv0$ です。

以下 $M=|f(a)|>0$ とします。$\overline{D(a,r)}\subset\Omega$ かつこの閉円板上で $|f|\le M$ となるよう $0<r<r_0$ を取ります。

位相を回転して中心値を正の実数にします。

$$
\lambda=\frac{\overline{f(a)}}{|f(a)|},
\qquad
h(z)=\lambda f(z).
$$

すると

$$
h(a)=M,
\qquad
|h(z)|=|f(z)|\le M.
$$

[Cauchy平均値公式](#cor-ca3-cauchy-mean-value) の実部を取ると

$$
M
=
\operatorname{Re}h(a)
=
\frac1{2\pi}
\int_0^{2\pi}
\operatorname{Re}h(a+re^{it})\,dt.
$$

各 $t$ について

$$
\operatorname{Re}h(a+re^{it})
\le
|h(a+re^{it})|
\le M.
$$

従って非負連続関数

$$
M-\operatorname{Re}h(a+re^{it})
$$

の積分が0です。もしどこかで正なら連続性によりその近傍でも正になって積分が正になるので、すべての $t$ で

$$
\operatorname{Re}h(a+re^{it})=M
$$

でなければなりません。

さらに $|h|\le M$ なので

$$
M^2+\bigl(\operatorname{Im}h(a+re^{it})\bigr)^2
=|h(a+re^{it})|^2
\le M^2.
$$

従って虚部も0で、円周全体で

$$
h(a+re^{it})=M,
$$

すなわち

$$
f(a+re^{it})=f(a)
$$

です。正則関数 $f-f(a)$ は円周上に無限個の零点を持ち、そのどの点も $\Omega$ 内の零点集積点です。[恒等定理](#thm-ca3-isolated-zeros-identity) から $f\equiv f(a)$ となります。$\square$
<!-- proof-end -->

この証明では「平均が最大値に等しい」からただちに定数とはしていません。実部を使って非負連続関数の積分が0であることへ落とし、円周上での等号を一点ずつ回収しています。

<a id="cor-ca3-boundary-maximum"></a>
<!-- formal-statement-start -->
### 系（円板上の境界最大値評価）

$f$ が $\overline{D(a,R)}$ を含む開集合上で正則なら

$$
\max_{|z-a|\le R}|f(z)|
=
\max_{|z-a|=R}|f(z)|.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$|f|$ はコンパクトな閉円板上で最大値を持ちます。最大点が内部にあるなら [最大値原理](#thm-ca3-maximum-modulus) により $f$ は定数で、その場合は境界でも同じ最大値を取ります。非定数なら内部最大は不可能なので最大点は境界にあります。$\square$
<!-- proof-end -->

---

## 8. 複素解析の開写像定理

関数解析の [FA2 の開写像定理](../FA2/index.md) は「Banach空間間の全射有界線形作用素」に関する定理です。ここで扱うのは非線形でもよい一変数正則関数で、仮定も証明機構も別です。

<a id="thm-ca3-open-mapping"></a>
<!-- formal-statement-start -->
### 定理（複素解析の開写像定理）

$\Omega$ を領域、$f:\Omega\to\mathbb C$ を非定数正則関数とする。このとき $f$ は開写像、すなわち任意の開集合 $V\subset\Omega$ に対して $f(V)$ は $\mathbb C$ で開である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$V\subset\Omega$ を開、$z_0\in V$ を任意に取り

$$
w_0=f(z_0)
$$

とします。$w_0$ のある円板が $f(V)$ に入ることを示せば十分です。

$f-w_0$ は正則で $z_0$ を零点に持ちます。$f$ は非定数なので [恒等定理](#thm-ca3-isolated-zeros-identity) から $f-w_0$ は恒等的に0ではありません。従って零点の孤立性により、十分小さい $r>0$ を選んで

$$
\overline{D(z_0,r)}\subset V
$$

かつ円周 $|z-z_0|=r$ 上で $f(z)\ne w_0$ とできます。コンパクト性から

$$
\delta
:=
\min_{|z-z_0|=r}|f(z)-w_0|
>0.
$$

$w$ が

$$
0<|w-w_0|<\frac\delta2
$$

を満たすとします。もし $w\notin f(D(z_0,r))$ なら

$$
h(z)=\frac1{f(z)-w}
$$

は閉円板の近傍で正則です。実際、内部には仮定により零点がなく、境界では

$$
|f(z)-w|
\ge
|f(z)-w_0|-|w-w_0|
\ge
\delta-|w-w_0|
>\frac\delta2
$$

なので零点がありません。

[円板上の境界最大値評価](#cor-ca3-boundary-maximum) を $h$ に使うと

$$
|h(z_0)|
\le
\max_{|z-z_0|=r}|h(z)|.
$$

ところが中心では

$$
|h(z_0)|
=
\frac1{|w_0-w|}
>
\frac2\delta,
$$

一方境界では

$$
|h(z)|
\le
\frac1{\delta-|w-w_0|}
<
\frac2\delta.
$$

これは矛盾です。従ってそのような $w$ は必ず $f(D(z_0,r))$ に入ります。$w=w_0$ は $z_0$ の像なので、結局

$$
D\left(w_0,\frac\delta2\right)
\subset f(V).
$$

$z_0$ は任意だったから $f(V)$ は開です。$\square$
<!-- proof-end -->

ここでは Rouché の定理も偏角原理も使っていません。零点の孤立性で境界上の正の距離 $\delta$ を作り、もし近い値 $w$ が像から抜けるなら逆数 $1/(f-w)$ が中心で境界より大きくなって最大値原理に反する、という機構だけです。

---

## 9. 典型例で依存関係を確認する

### 例1：積分値は境界上の情報だけで決まる

$f$ が $|z|\le3$ の近傍で正則なら

$$
f(1)
=
\frac1{2\pi i}
\int_{|\zeta|=3}
\frac{f(\zeta)}{\zeta-1}\,d\zeta.
$$

左辺は内部の一点値ですが、右辺は半径3の円周上の値だけです。正則性が内部自由度を強く制限していることが見えます。

### 例2：導関数も境界から読める

同じ仮定なら

$$
f^{(4)}(0)
=
\frac{4!}{2\pi i}
\int_{|\zeta|=3}
\frac{f(\zeta)}{\zeta^5}\,d\zeta.
$$

したがって境界上で $|f|\le M$ なら

$$
|f^{(4)}(0)|
\le
\frac{4!M}{3^4}.
$$

### 例3：有界整関数の「自由度」は0

$e^z$、$\sin z$、多項式はいずれも非定数整関数ですが、複素平面全体では必ず非有界です。Liouville は「有界な整関数を探す」という条件が非定数性と両立しないことを述べています。

### 例4：最大値原理は実部の最大値定理ではない

$f(z)=z$ を単位円板で考えると $|f(z)|=|z|$ は内部で最大値1を取らず、境界で初めて1になります。一方、局所最小については $z=0$ で $|f|=0$ を取れます。最大値原理は絶対値の **最大** に関する非対称な主張です。

---

## 10. 演習

### Level A

<a id="ex-ca3-a01"></a>
#### CA3-A01 Cauchy公式による円周積分
- Level: A

正向き円周 $|\zeta|=2$ に対して

$$
\int_{|\zeta|=2}\frac{e^\zeta}{\zeta}\,d\zeta
$$

を求めよ。

<!-- solution-start -->
**解答**：$e^z$ は閉円板 $|z|\le2$ の近傍で正則で、特異核の点は $z=0$ です。[Cauchy積分公式](#thm-ca3-cauchy-integral-formula) から

$$
\frac1{2\pi i}
\int_{|\zeta|=2}\frac{e^\zeta}{\zeta-0}\,d\zeta
=e^0=1.
$$

従って

$$
\boxed{
\int_{|\zeta|=2}\frac{e^\zeta}{\zeta}\,d\zeta
=2\pi i
}.
$$

機構は「$1/\zeta$ の原始関数を円板全体で作る」ことではありません。特異点0を小円で除いた境界積分を比較した Cauchy公式が、内部値 $e^0$ を回収しています。
<!-- solution-end -->

<a id="ex-ca3-a02"></a>
#### CA3-A02 高階導関数公式の係数
- Level: A

正向き円周 $|\zeta|=2$ に対して

$$
I=
\int_{|\zeta|=2}
\frac{e^\zeta}{(\zeta-1)^3}\,d\zeta
$$

を求めよ。

<!-- solution-start -->
**解答**：分母が $(\zeta-1)^{n+1}$ なので $n+1=3$、すなわち $n=2$ です。[Cauchy高階導関数公式](#thm-ca3-cauchy-derivatives) より

$$
(e^z)''\big|_{z=1}
=
\frac{2!}{2\pi i}I.
$$

左辺は $e$ なので

$$
I
=
\frac{2\pi i}{2!}e
=
\boxed{\pi i e}.
$$

$2!$ を分子へ残したままにしないことが計算上の要点です。
<!-- solution-end -->

<a id="ex-ca3-a03"></a>
#### CA3-A03 Cauchy評価
- Level: A

$f$ が $|z|\le3$ の近傍で正則で、円周 $|z|=3$ 上で $|f(z)|\le5$ とする。$|f^{(3)}(0)|$ を上から評価せよ。

<!-- solution-start -->
**解答**：[Cauchy評価](#thm-ca3-cauchy-estimate) で

$$
n=3,
\qquad
R=3,
\qquad
M_R\le5
$$

と置きます。従って

$$
|f^{(3)}(0)|
\le
\frac{3!\cdot5}{3^3}
=
\frac{30}{27}
=
\boxed{\frac{10}{9}}.
$$

核は $R^{-4}$ ですが円周長が $R$ を一つ戻すため、最終的に $R^{-3}$ になります。
<!-- solution-end -->

<a id="ex-ca3-a04"></a>
#### CA3-A04 Cauchy評価からLiouvilleを再構成する
- Level: A

$f$ が整関数で $|f(z)|\le7$ が全平面で成り立つとする。任意の $a\in\mathbb C$ について $f'(a)=0$ を Cauchy評価から示せ。

<!-- solution-start -->
**解答**：任意の $R>0$ について $f$ は $\overline{D(a,R)}$ の近傍で正則で、円周上でも $|f|\le7$ です。従って

$$
|f'(a)|
\le
\frac7R.
$$

この不等式はすべての $R>0$ で成り立ちます。$R\to\infty$ とすると右辺は0へ行くので

$$
|f'(a)|=0,
\qquad
f'(a)=0.
$$

$a$ は任意なので $f'\equiv0$、連結性から $f$ は定数です。Liouvilleで本当に使うのは「巨大な円を取っても同じ有界定数7が使える」ことです。
<!-- solution-end -->

### Level B

<a id="ex-ca3-b01"></a>
#### CA3-B01 Taylor係数の積分表示
- Level: B

$f$ が $D(a,R)$ 上正則とする。$0<r<R$ に対し、Taylor係数

$$
c_n=\frac{f^{(n)}(a)}{n!}
$$

が

$$
c_n
=
\frac1{2\pi i}
\int_{|\zeta-a|=r}
\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta
$$

と書けることを示し、この値が $r$ に依存しない理由を説明せよ。

<!-- solution-start -->
**解答**：[Cauchy高階導関数公式](#thm-ca3-cauchy-derivatives) を半径 $r$ の円へ適用すると

$$
f^{(n)}(a)
=
\frac{n!}{2\pi i}
\int_{|\zeta-a|=r}
\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta.
$$

両辺を $n!$ で割れば

$$
\boxed{
c_n
=
\frac1{2\pi i}
\int_{|\zeta-a|=r}
\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta
}.
$$

左辺は点 $a$ での導関数だけで決まり $r$ を含みません。従って、異なる半径を選んでも右辺は同じ値です。幾何的には、二つの同心円の間で被積分関数が正則なので、CA3冒頭の穿孔円板と同じ境界相殺が働いています。
<!-- solution-end -->

<a id="ex-ca3-b02"></a>
#### CA3-B02 Liouvilleから代数学の基本定理
- Level: B

非定数多項式

$$
p(z)=a_mz^m+\cdots+a_0,
\qquad a_m\ne0
$$

が零点を持たないと仮定し、$1/p$ が有界整関数になることを、外側と内側に分けて示して矛盾を導け。

<!-- solution-start -->
**解答**：零点なしなら

$$
g(z)=\frac1{p(z)}
$$

は整関数です。十分大きい $R$ では主要項が下位項を支配し、$|z|\ge R$ で

$$
\sum_{k=0}^{m-1}|a_k||z|^k
\le
\frac{|a_m|}{2}|z|^m
$$

となるようにできます。従って

$$
|p(z)|
\ge
\frac{|a_m|}{2}|z|^m,
$$

よって

$$
|g(z)|
\le
\frac{2}{|a_m||z|^m}
\le
\frac{2}{|a_m|R^m}
\qquad(|z|\ge R).
$$

一方、$|z|\le R$ はコンパクトで $g$ は連続なので

$$
M_0=\max_{|z|\le R}|g(z)|<\infty.
$$

従って平面全体で

$$
|g(z)|
\le
\max\left\{M_0,\frac{2}{|a_m|R^m}\right\}.
$$

[Liouvilleの定理](#thm-ca3-liouville) により $g$ は定数、従って $p$ も定数となり仮定に反します。よって非定数複素多項式は零点を持ちます。
<!-- solution-end -->

<a id="ex-ca3-b03"></a>
#### CA3-B03 零点が集積すれば恒等的に0
- Level: B

$\Omega$ を領域、$f$ を $\Omega$ 上正則とする。相異なる零点列 $z_n$ が

$$
z_n\to a\in\Omega
$$

を満たすなら $f\equiv0$ を示せ。Taylor展開の「最初の非零係数」がなぜ存在できないかを明示せよ。

<!-- solution-start -->
**解答**：まず連続性から

$$
f(a)=\lim_{n\to\infty}f(z_n)=0.
$$

$a$ のまわりの Taylor 展開を

$$
f(z)=\sum_{k=0}^{\infty}c_k(z-a)^k
$$

とします。もし非零係数が存在すれば、$f(a)=0$ なので最小の $m\ge1$ で $c_m\ne0$ が取れ、

$$
f(z)=(z-a)^m g(z),
\qquad g(a)=c_m\ne0
$$

と因数分解できます。連続性から $a$ の十分小さい近傍で $g(z)\ne0$ なので、その近傍の零点は $a$ だけになります。しかし $z_n\ne a$ がいくらでも $a$ に近づくので矛盾です。

従って $a$ での Taylor 係数はすべて0で、$f$ は $a$ の近傍で0です。その後は

$$
E=\{x\in\Omega: f\text{ が }x\text{ の近傍で0}\}
$$

を考えると、同じ零点孤立性により $E$ は開かつ閉で、非空です。$\Omega$ の連結性から $E=\Omega$、よって

$$
\boxed{f\equiv0}.
$$

集積点が領域の内部にあることが重要で、境界上の集積だけではこの議論は使えません。
<!-- solution-end -->

### Level C

<a id="ex-ca3-c01"></a>
#### CA3-C01 多項式成長する整関数
- Level: C

$f$ を整関数とし、ある $C>0$ と整数 $m\ge0$ に対して

$$
|f(z)|
\le
C(1+|z|^m)
\qquad(z\in\mathbb C)
$$

が成り立つとする。$f$ が次数高々 $m$ の多項式であることを示せ。

<!-- solution-start -->
**解答**：$f$ は整関数なので原点を中心とする任意半径 $R>0$ で Cauchy評価を使えます。円周 $|z|=R$ 上では

$$
M_R
\le
C(1+R^m).
$$

整数 $n>m$ を固定すると

$$
|f^{(n)}(0)|
\le
\frac{n!C(1+R^m)}{R^n}
=
n!C\left(R^{-n}+R^{m-n}\right).
$$

$n>m$ なので $R\to\infty$ で両項とも0へ行きます。従って

$$
f^{(n)}(0)=0
\qquad(n>m).
$$

一方、[正則関数のTaylor展開](#thm-ca3-taylor) を任意の有限半径で適用できるため、整関数 $f$ は全平面で

$$
f(z)
=
\sum_{n=0}^{\infty}
\frac{f^{(n)}(0)}{n!}z^n
$$

と表されます。$n>m$ の係数はすべて0なので

$$
\boxed{
f(z)
=
\sum_{n=0}^{m}
\frac{f^{(n)}(0)}{n!}z^n
}
$$

となり、次数高々 $m$ の多項式です。

この問題は Liouville の「有界なら次数0」を多項式成長へ拡張したものです。Cauchy評価で半径 $R$ を無限大へ送ると、高すぎる階数の導関数だけが消えます。
<!-- solution-end -->

---

## 11. まとめと次章との境界

- Cauchy積分公式は、特異点を可除と宣言して得るのではなく、小円を除いた領域で外周積分と内周積分を相殺し、小円上の積分を連続性で $2\pi i f(z)$ へ収束させて得た。
- 積分核は評価曲線から正の距離を持つため、差商が円周上一様に収束し、ML評価によって微分と線積分を交換できる。これが任意階複素微分を生む。
- Taylor展開は Cauchy核の有限幾何級数と明示的剰余評価から得られ、正則関数が解析的であることが分かる。
- Cauchy評価は境界上の大きさから内部の全高階導関数を制御し、半径を無限大へ送ることで Liouville と代数学の基本定理を導く。
- Taylor展開の最初の非零係数は零点の有限位数を与え、零点の孤立性と恒等定理へつながる。
- Cauchy平均値公式で三角不等式が等号になる条件を追うと最大値原理が得られ、その境界版を逆数 $1/(f-w)$ へ適用すると複素解析の開写像定理が従う。

次章 CA4 では Taylor 級数では表せない環状領域で Laurent 展開を構成し、孤立特異点と留数へ進みます。本章では Laurent 展開、留数、偏角原理、Rouché の定理を一度も使っていません。
