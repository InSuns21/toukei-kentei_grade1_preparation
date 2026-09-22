# NA1 数値解析 I：浮動小数点・誤差・条件数・安定性

数値計算では、数学的に同じ式でも計算結果が同じとは限りません。有限桁で計算する以上、問題そのものが誤差に敏感なのか、それとも計算法が余計な誤差を増幅しているのかを分けて考える必要があります。

本章では

~~~text
有限精度
  ↓
丸め誤差
  ↓
桁落ち
  ↓
条件数
  ↓
前方誤差 / 後方誤差
  ↓
後方安定性
~~~

を一つの流れとして整理します。

直接の前提は [RA3 微分法](../RA3/index.md) と [F0-00F2 特異値分解・作用素ノルム](../F0_00F2_SVD_特異値_作用素ノルム/index.md) です。行列の 2-作用素ノルムと特異値は F0-00F2 を正本とします。

<!-- definition-example-audit: strict -->

---

## 0. まず「どの誤差か」を分ける

計算結果が真値と違う原因は一つではありません。今後の Encore V では、少なくとも次を区別します。

- **入力誤差**：観測値・係数・初期値そのものが真値からずれている。
- **離散化誤差**：連続問題や無限過程を有限個の自由度へ置き換える。
- **代数誤差**：反復法を有限回で止める。
- **丸め誤差**：有限桁の浮動小数点演算で生じる。
- **標本誤差**：Monte Carlo 法で有限個の標本しか使わない。

NA1 の主役は入力誤差と丸め誤差です。離散化誤差は NA4 以降、代数誤差は NA9、標本誤差は MC 系列で本格的に扱います。

---

## 1. 絶対誤差と相対誤差

<a id="def-na1-absolute-relative-error"></a>
<!-- formal-statement-start -->
### 定義（絶対誤差・相対誤差）

真値を $x$、近似値を $\widetilde x$ とする。

- **絶対誤差**を
  $$
  |x-\widetilde x|
  $$
  とする。
- $x\neq0$ のとき **相対誤差**を
  $$
  \frac{|x-\widetilde x|}{|x|}
  $$
  とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na1-absolute-relative-error -->
**定義の確認**。$x=1000$ を $\widetilde x=999$ で近似すると、絶対誤差は $1$、相対誤差は $10^{-3}$ です。一方 $x=0.01$ を $\widetilde x=0.011$ で近似すると絶対誤差は $10^{-3}$ ですが、相対誤差は $0.1$ です。

同じ「1だけ違う」「0.001だけ違う」では桁の信頼度を比較できません。非零量の有効桁を見るときは相対誤差が自然です。
<!-- definition-example-end -->

ただし $x=0$ では相対誤差は定義できません。ゼロ近傍では絶対誤差を使う必要があります。

---

## 2. 浮動小数点数は実数全体ではない

<a id="def-na1-floating-point-system"></a>
<!-- formal-statement-start -->
### 定義（正規化浮動小数点数）

基数 $\beta\ge2$、精度 $p\ge1$ を固定する。正規化された非零の浮動小数点数を

$$
\pm(d_0.d_1\cdots d_{p-1})_\beta\,\beta^e,
$$

$$
d_0\in\{1,\dots,\beta-1\},
\qquad
d_j\in\{0,\dots,\beta-1\}
$$

の形の数とする。ここでは理論を明瞭にするため、指数範囲は十分広く、オーバーフロー・アンダーフローが起きない範囲だけを考える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na1-floating-point-system -->
**定義の確認**。十進3桁の模型 $\beta=10,\ p=3$ では

$$
1.23\times10^4,\qquad -9.87\times10^{-2}
$$

は表現できますが、

$$
1.234\times10^4
$$

は4桁必要なのでそのままでは表現できません。最近接丸めなら $1.23\times10^4$ へ丸められます。
<!-- definition-example-end -->

実際の IEEE 754 binary64 は基数2、仮数精度53 bit を使います。十進の $0.1$ は二進有限小数ではないため、binary64 上では近い別の数として保存されます。

---

## 3. 単位丸め誤差と標準丸めモデル

<a id="def-na1-unit-roundoff"></a>
<!-- formal-statement-start -->
### 定義（単位丸め誤差）

基数 $\beta$、精度 $p$ の正規化浮動小数点系で最近接丸めを行うとき、

$$
u:=\frac12\beta^{1-p}
$$

を **単位丸め誤差（unit roundoff）** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na1-unit-roundoff -->
**定義の確認**。binary64 では $\beta=2, p=53$ なので

$$
u
=
\frac12 2^{1-53}
=
2^{-53}.
$$

一方、binary64 で $1$ の次の浮動小数点数との差は $2^{-52}$ です。文献によって machine epsilon が $u$ とこの間隔のどちらを指すか揺れるため、以後は解析に使う量を **単位丸め誤差 $u$** と表記します。
<!-- definition-example-end -->

<a id="thm-na1-rounding-model"></a>
<!-- formal-statement-start -->
### 定理（最近接丸めの相対誤差モデル）

実数 $x\neq0$ が正規化範囲にあり、最近接丸め $\operatorname{fl}(x)$ でオーバーフロー・アンダーフローが起きないとする。このとき、ある $\delta$ が存在して

$$
\boxed{
\operatorname{fl}(x)=x(1+\delta),
\qquad
|\delta|\le u
}
$$

と書ける。
<!-- formal-statement-end -->

### 証明の見取り図

同じ指数を持つ隣接浮動小数点数の間隔を調べると、最近接丸めの絶対誤差はその半分以下です。正規化されているので $|x|$ はその指数区間の左端以上であり、絶対誤差を $|x|$ で割れば $u$ が出ます。

<!-- proof-start -->
### 証明

符号は相対誤差の大きさに影響しないので $x>0$ とします。ある整数 $e$ に対して

$$
\beta^e\le x<\beta^{e+1}
$$

とします。この区間で精度 $p$ の隣接浮動小数点数の間隔は

$$
\beta^{e-p+1}
$$

です。最近接丸めなので

$$
|\operatorname{fl}(x)-x|
\le
\frac12\beta^{e-p+1}.
$$

一方 $x\ge\beta^e$ なので

$$
\frac{|\operatorname{fl}(x)-x|}{|x|}
\le
\frac{\frac12\beta^{e-p+1}}{\beta^e}
=
\frac12\beta^{1-p}
=
u.
$$

そこで

$$
\delta
=
\frac{\operatorname{fl}(x)-x}{x}
$$

と置けば

$$
\operatorname{fl}(x)=x(1+\delta),
\qquad
|\delta|\le u.
$$

$\square$
<!-- proof-end -->

この定理は **正規化範囲** を仮定しています。極端に0へ近い非正規化数・アンダーフロー領域では、相対誤差だけで一様に記述できません。ここを無視して「浮動小数点なら常に相対誤差 $u$ 以下」と言うのは誤りです。

---

## 4. 一回の演算と複数回の演算

四則演算 $\circ\in\{+,-,\times,/\}$ について、厳密な結果 $x\circ y$ が正規化範囲にあるとき、前節を演算結果へ適用して

$$
\operatorname{fl}(x\circ y)
=
(x\circ y)(1+\delta),
\qquad
|\delta|\le u
$$

とモデル化できます。

ただし、これは **演算の入力 $x,y$ が厳密値である** ときの一回分の式です。実際には前段の丸め誤差を含んだ値が次の演算へ入り、誤差が連鎖します。

<a id="lem-na1-gamma-n"></a>
<!-- formal-statement-start -->
### 補題（丸め因子の積）

$|\delta_i|\le u$ $(i=1,\dots,n)$ とし、$nu<1$ とする。このとき

$$
\prod_{i=1}^n(1+\delta_i)
=
1+\theta_n
$$

と書けて、

$$
\boxed{
|\theta_n|
\le
\gamma_n
:=
\frac{nu}{1-nu}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上側は

$$
\prod_{i=1}^n(1+\delta_i)
\le
(1+u)^n.
$$

$$
(1+u)^n
=
1+nu+\binom n2u^2+\cdots+u^n.
$$

各 $k\ge1$ について

$$
\binom nk
\le n^k
$$

だから

$$
(1+u)^n
\le
1+\sum_{k=1}^{\infty}(nu)^k
=
1+\frac{nu}{1-nu}
=
1+\gamma_n.
$$

したがって

$$
\prod_{i=1}^n(1+\delta_i)-1
\le
\gamma_n.
$$

下側は Bernoulli の不等式から

$$
\prod_{i=1}^n(1+\delta_i)
\ge
(1-u)^n
\ge
1-nu.
$$

よって

$$
1-\prod_{i=1}^n(1+\delta_i)
\le
nu
\le
\gamma_n.
$$

両側を合わせると

$$
|\theta_n|\le\gamma_n.
$$

$\square$
<!-- proof-end -->

$nu\ll1$ なら

$$
\gamma_n
=
\frac{nu}{1-nu}
\approx nu
$$

です。「丸め誤差がだいたい演算回数に比例する」という経験則の一つの厳密な形です。

---

## 5. 桁落ちは「減算そのものが悪い」のではない

<a id="def-na1-cancellation"></a>
<!-- formal-statement-start -->
### 定義（桁落ち）

近い二つの近似値を減算したとき、各入力に含まれていた小さな絶対誤差が、差の大きさに対して相対的に大きくなり、有効桁が失われる現象を **桁落ち** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na1-cancellation -->
**定義の確認**。十進5桁で

$$
x=1.2345,\qquad y=1.2344
$$

なら

$$
x-y=0.0001.
$$

ところが真の値が

$$
x_\ast=1.23454,\qquad y_\ast=1.23436
$$

だったとすると真の差は

$$
x_\ast-y_\ast=0.00018.
$$

各入力は5桁程度合っていても、差の相対誤差は

$$
\frac{|0.00018-0.0001|}{0.00018}
\approx0.44
$$

まで増えます。
<!-- definition-example-end -->

重要なのは、IEEE の減算器が突然「悪い計算」をしたわけではないことです。近い値の差そのものが小さいため、**減算前に各項へ入っていた誤差**が差に対して大きく見えるのです。

### 例：数学的に同じ式でも安定性が違う

$x>0$ に対して

$$
f(x)=\sqrt{x+1}-\sqrt{x}
$$

を考えます。直接式は大きい $x$ で近い二数の差になります。

有理化すると

$$
\boxed{
f(x)
=
\frac1{\sqrt{x+1}+\sqrt{x}}
}
$$

です。右辺には近い量の減算がありません。

例えば $x=10^{16}$ では

$$
\sqrt{x+1}
$$

と

$$
\sqrt{x}
$$

が有限精度では同じ数に丸められることがあり、直接差は0になり得ます。しかし有理化した式はおよそ

$$
5\times10^{-9}
$$

を返せます。

「式変形は数学では同値、数値計算では非同値」が NA1 の中心メッセージです。

---

## 6. 条件数は問題そのものの感度を測る

<a id="def-na1-relative-condition-number"></a>
<!-- formal-statement-start -->
### 定義（相対条件数）

$f:\mathbb R\to\mathbb R$ が $x$ で微分可能で、$x\neq0$ かつ $f(x)\neq0$ とする。入力の小さな相対摂動に対する出力の相対変化の一次増幅率

$$
\boxed{
\kappa_f(x)
=
\left|
\frac{x f'(x)}{f(x)}
\right|
}
$$

を $f$ の $x$ における **相対条件数** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na1-relative-condition-number -->
**定義の確認**。$f(x)=x^m$、$x\neq0$ なら

$$
f'(x)=mx^{m-1}
$$

なので

$$
\kappa_f(x)
=
\left|
\frac{x\cdot mx^{m-1}}{x^m}
\right|
=
|m|.
$$

したがって $x^m$ の相対誤差は、一次近似では入力の相対誤差の約 $|m|$ 倍です。
<!-- definition-example-end -->

<a id="thm-na1-condition-number-derivation"></a>
<!-- formal-statement-start -->
### 定理（相対条件数の微分による導出）

$f$ が $x\neq0$ で微分可能かつ $f(x)\neq0$ なら、$\Delta x\to0$ に対して

$$
\frac{|f(x+\Delta x)-f(x)|}{|f(x)|}
=
\left(
\kappa_f(x)+o(1)
\right)
\frac{|\Delta x|}{|x|}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

微分可能性より

$$
f(x+\Delta x)-f(x)
=
f'(x)\Delta x+r(\Delta x),
$$

ただし

$$
\frac{r(\Delta x)}{\Delta x}\to0.
$$

従って

$$
\frac{|f(x+\Delta x)-f(x)|}{|f(x)|}
=
\frac{|f'(x)\Delta x+r(\Delta x)|}{|f(x)|}.
$$

右辺から $|\Delta x|/|x|$ をくくると

$$
\frac{|f(x+\Delta x)-f(x)|}{|f(x)|}
=
\left(
\left|\frac{x f'(x)}{f(x)}\right|
+o(1)
\right)
\frac{|\Delta x|}{|x|}.
$$

定義により括弧内の主項は $\kappa_f(x)$ です。$\square$
<!-- proof-end -->

条件数が大きい問題は、入力の小さな誤差を問題自身が増幅します。これはアルゴリズムを改善しても消せません。

---

## 7. 桁落ちの例は、問題そのものは悪条件なのか

先ほどの

$$
f(x)=\sqrt{x+1}-\sqrt{x}
$$

を調べます。有理化した形

$$
f(x)=\frac1{\sqrt{x+1}+\sqrt{x}}
$$

を微分すると、

$$
\frac{f'(x)}{f(x)}
=
-
\frac{
\frac1{2\sqrt{x+1}}+\frac1{2\sqrt{x}}
}{
\sqrt{x+1}+\sqrt{x}
}.
$$

分子の和を通分すると

$$
\frac1{2\sqrt{x+1}}+\frac1{2\sqrt{x}}
=
\frac{\sqrt{x+1}+\sqrt{x}}
{2\sqrt{x}\sqrt{x+1}}.
$$

したがって

$$
\boxed{
\kappa_f(x)
=
\frac12\sqrt{\frac{x}{x+1}}
<
\frac12
}
$$

です。

つまり $x\to\infty$ でもこの問題は良条件です。それなのに直接式では大きな誤差が出ます。原因は問題ではなく **計算法** です。

この例が「条件数」と「安定性」を分ける必要性を最も短く示します。

---

## 8. 行列条件数と線形方程式の感度

[F0-00F2 の 2-作用素ノルム](../F0_00F2_SVD_特異値_作用素ノルム/index.md#def-f0-00f2-operator-norm)を使います。

<a id="def-na1-matrix-condition-number"></a>
<!-- formal-statement-start -->
### 定義（2-ノルム行列条件数）

可逆行列 $A\in\mathbb R^{n\times n}$ に対して、F0-00F2 で定義した 2-作用素ノルムを用い

$$
\boxed{
\kappa_2(A)
=
\|A\|_2\|A^{-1}\|_2
}
$$

を **2-ノルム条件数** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na1-matrix-condition-number -->
**定義の確認**。対角行列

$$
A=
\begin{pmatrix}
1&0\\
0&10^{-4}
\end{pmatrix}
$$

では最大特異値が $1$、最小特異値が $10^{-4}$ なので

$$
\|A\|_2=1,
\qquad
\|A^{-1}\|_2=10^4,
$$

従って

$$
\kappa_2(A)=10^4.
$$
<!-- definition-example-end -->

<a id="prop-na1-condition-singular-values"></a>
<!-- formal-statement-start -->
### 命題（2-ノルム条件数と特異値）

可逆行列 $A$ の最大・最小特異値を $\sigma_{\max},\sigma_{\min}$ とすると

$$
\boxed{
\kappa_2(A)
=
\frac{\sigma_{\max}}{\sigma_{\min}}
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[F0-00F2 の定理](../F0_00F2_SVD_特異値_作用素ノルム/index.md#thm-f0-00f2-operator-norm-largest-singular)より

$$
\|A\|_2=\sigma_{\max}.
$$

$A^{-1}$ の特異値は $A$ の特異値の逆数なので

$$
\|A^{-1}\|_2
=
\frac1{\sigma_{\min}}.
$$

従って

$$
\kappa_2(A)
=
\|A\|_2\|A^{-1}\|_2
=
\frac{\sigma_{\max}}{\sigma_{\min}}.
$$

$\square$
<!-- proof-end -->

<a id="thm-na1-linear-system-perturbation"></a>
<!-- formal-statement-start -->
### 定理（右辺摂動に対する線形方程式の感度）

$A$ を可逆行列とし、

$$
Ax=b,
\qquad
A(x+\Delta x)=b+\Delta b
$$

とする。$b\neq0$ なら

$$
\boxed{
\frac{\|\Delta x\|_2}{\|x\|_2}
\le
\kappa_2(A)
\frac{\|\Delta b\|_2}{\|b\|_2}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二式を引くと

$$
A\Delta x=\Delta b,
$$

従って

$$
\Delta x=A^{-1}\Delta b.
$$

2-作用素ノルムの定義から

$$
\|\Delta x\|_2
\le
\|A^{-1}\|_2\|\Delta b\|_2.
$$

また

$$
\|b\|_2
=
\|Ax\|_2
\le
\|A\|_2\|x\|_2
$$

なので

$$
\frac1{\|x\|_2}
\le
\frac{\|A\|_2}{\|b\|_2}.
$$

二つを掛けると

$$
\frac{\|\Delta x\|_2}{\|x\|_2}
\le
\|A^{-1}\|_2\|A\|_2
\frac{\|\Delta b\|_2}{\|b\|_2}
=
\kappa_2(A)
\frac{\|\Delta b\|_2}{\|b\|_2}.
$$

$\square$
<!-- proof-end -->

この 2-作用素ノルムによる上界は本質的に鋭いです。最大特異値方向に元の解を置き、最小特異値方向へ右辺を摂動すると、相対誤差の増幅率を $\kappa_2(A)$ まで達成できます。

---

## 9. 前方誤差と後方誤差

<a id="def-na1-forward-backward-error"></a>
<!-- formal-statement-start -->
### 定義（前方誤差・後方誤差）

問題を写像

$$
y=F(d)
$$

と書き、入力 $d$ に対する計算結果を $\widetilde y$ とする。

- **前方誤差**は、真の出力 $F(d)$ と計算結果 $\widetilde y$ の差である。
- **後方誤差**は、$\widetilde y$ が厳密解になるような摂動入力 $d+\Delta d$ のうち、必要な入力摂動 $\Delta d$ の大きさで測る。すなわち
  $$
  \widetilde y=F(d+\Delta d)
  $$
  を満たす $\Delta d$ を調べる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na1-forward-backward-error -->
**定義の確認**。$F(d)=\sqrt d$、$d=4$ に対して計算結果が $\widetilde y=2.0001$ だったとします。

前方誤差は

$$
|2.0001-2|=10^{-4}.
$$

一方 $\widetilde y$ を厳密な平方根とする入力は

$$
d+\Delta d=(2.0001)^2
$$

なので

$$
\Delta d=(2.0001)^2-4.
$$

これが後方誤差です。
<!-- definition-example-end -->

後方誤差の利点は、「計算結果が、少しだけ違う入力に対しては完全に正しい」と解釈できることです。

---

## 10. 線形方程式では残差が後方誤差になる

<a id="def-na1-residual"></a>
<!-- formal-statement-start -->
### 定義（残差）

線形方程式

$$
Ax=b
$$

に対する近似解を $\widetilde x$ とする。このとき

$$
\boxed{
r:=b-A\widetilde x
}
$$

を **残差** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na1-residual -->
**定義の確認**。$A=I_2$、

$$
b=
\begin{pmatrix}
1\\
2
\end{pmatrix},
\qquad
\widetilde x=
\begin{pmatrix}
1\\
1.9
\end{pmatrix}
$$

なら

$$
r
=
b-A\widetilde x
=
\begin{pmatrix}
0\\
0.1
\end{pmatrix}.
$$

残差は「近似解を方程式へ戻したときに右辺がどれだけ合わないか」を直接測る。
<!-- definition-example-end -->

<a id="prop-na1-residual-backward-error"></a>
<!-- formal-statement-start -->
### 命題（右辺だけを摂動するときの後方誤差）

$A$ を固定し、右辺 $b$ だけを摂動して $\widetilde x$ を厳密解にすることを考える。このとき必要な摂動は

$$
\Delta b=-r
$$

であり、$b\neq0$ なら相対後方誤差は

$$
\boxed{
\eta_b
=
\frac{\|r\|_2}{\|b\|_2}
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\widetilde x$ が摂動問題

$$
A\widetilde x=b+\Delta b
$$

の厳密解である条件は

$$
\Delta b=A\widetilde x-b.
$$

残差 $r=b-A\widetilde x$ なので

$$
\Delta b=-r.
$$

従って必要な摂動の大きさは $\|r\|_2$ であり、$b$ に対する相対量は $\|r\|_2/\|b\|_2$ です。$\square$
<!-- proof-end -->

<a id="cor-na1-forward-backward-condition"></a>
<!-- formal-statement-start -->
### 系（前方誤差＝条件数×後方誤差の上界）

$A$ を可逆とし、$x$ を $Ax=b$ の厳密解、$\widetilde x$ を近似解とする。$b\neq0$ なら

$$
\boxed{
\frac{\|\widetilde x-x\|_2}{\|x\|_2}
\le
\kappa_2(A)
\frac{\|b-A\widetilde x\|}{\|b\|_2}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前命題より $\widetilde x$ は右辺を

$$
\Delta b=-r
$$

だけ摂動した問題の厳密解です。従って [右辺摂動に対する感度定理](#thm-na1-linear-system-perturbation)を適用して

$$
\frac{\|\widetilde x-x\|_2}{\|x\|_2}
\le
\kappa_2(A)
\frac{\|\Delta b\|_2}{\|b\|_2}
=
\kappa_2(A)
\frac{\|r\|_2}{\|b\|_2}.
$$

$\square$
<!-- proof-end -->

この式は重要です。残差が小さいだけでは前方誤差が小さいとは限りません。$\kappa_2(A)$ が巨大なら、小さい残差が大きい解誤差へ増幅され得ます。

---

## 11. 後方安定性はアルゴリズムの性質

<a id="def-na1-backward-stability"></a>
<!-- formal-statement-start -->
### 定義（後方安定性）

$d\neq0$ とする。問題 $F(d)$ に対するアルゴリズムが返す値 $\widetilde y$ が

$$
\widetilde y=F(d+\Delta d)
$$

と書け、かつ入力摂動が

$$
\frac{\|\Delta d\|}{\|d\|}
\le
C u
$$

のように単位丸め誤差 $u$ と同程度で抑えられるとき、そのアルゴリズムを **後方安定** という。定数 $C$ は問題サイズなどに依存してよいが、$u^{-1}$ のような巨大因子を含まないことを想定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na1-backward-stability -->
**定義の確認**。ある線形方程式ソルバが計算結果 $\widetilde x$ に対して

$$
(A+\Delta A)\widetilde x=b,
\qquad
\frac{\|\Delta A\|}{\|A\|_2}
\le100u
$$

を保証するなら、元の行列から相対 $100u$ だけ摂動した問題を厳密に解いたと解釈できます。この意味でアルゴリズムは後方安定です。
<!-- definition-example-end -->

後方安定性は「必ず高精度」という意味ではありません。

~~~text
良条件な問題 + 後方安定なアルゴリズム
        ↓
前方誤差も小さい

悪条件な問題 + 後方安定なアルゴリズム
        ↓
入力摂動を問題自身が増幅し得る
~~~

条件数は **問題の性質**、安定性は **アルゴリズムの性質** です。

---

## 12. 小さい残差なのに解が大きく間違う例

$$
A=
\begin{pmatrix}
1&0\\
0&10^{-8}
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\
10^{-8}
\end{pmatrix}
$$

を考えます。厳密解は

$$
x=
\begin{pmatrix}
1\\
1
\end{pmatrix}.
$$

近似解として

$$
\widetilde x=
\begin{pmatrix}
1\\
0
\end{pmatrix}
$$

を取ると、残差は

$$
r=b-A\widetilde x
=
\begin{pmatrix}
0\\
10^{-8}
\end{pmatrix}.
$$

したがって

$$
\frac{\|r\|_2_2}{\|b\|_2}
\approx10^{-8}
$$

と非常に小さい一方、

$$
\frac{\|\widetilde x-x\|_2_2}{\|x\|_2}
=
\frac1{\sqrt2}
\approx0.707.
$$

しかも

$$
\kappa_2(A)=10^8.
$$

前節の上界

$$
\frac{\|\widetilde x-x\|_2_2}{\|x\|_2}
\le
10^8\times10^{-8}
\approx1
$$

と整合します。

「残差が小さいから解も正しい」は、条件数を見なければ成立しません。

---

## 13. 失敗例をどこで診断するか

数値結果が不自然なとき、次の順で切り分けます。

1. **問題の条件数は大きいか。**
2. **計算式に桁落ちがあるか。**
3. **後方誤差・残差は小さいか。**
4. **丸め誤差だけで説明できるか。**
5. **離散化誤差・反復停止誤差・標本誤差が混ざっていないか。**

ここまで区別できると、「精度が悪いから刻み幅を小さくする」「反復回数を増やす」といった対処を闇雲に行わずに済みます。丸め誤差が支配的なら刻み幅を小さくしても改善しないことがあります。

---

## 14. 演習

### Level A

<a id="ex-na1-a1"></a>
#### NA1-A01 十進3桁の丸め
- Level: A

基数10、精度3桁、最近接丸めを考える。

1. $x=1.2345$ の丸め値を求めよ。
2. 絶対誤差と相対誤差を求めよ。
3. この系の単位丸め誤差 $u$ を求め、相対誤差が $u$ 以下であることを確認せよ。

<a id="ex-na1-a2"></a>
#### NA1-A02 有理化で桁落ちを避ける
- Level: A

$$
f(x)=\sqrt{x+1}-\sqrt{x}
$$

を有理化し、$x>0$ で同値な式を導け。さらに $x$ が大きいと直接式が桁落ちしやすい理由を説明せよ。

<a id="ex-na1-a3"></a>
#### NA1-A03 相対条件数
- Level: A

次の関数の相対条件数を求めよ。

1. $f(x)=x^3$、$x\neq0$
2. $g(x)=1/x$、$x\neq0$
3. $h(x)=e^x$、$x\neq0$

どの関数で条件数が入力 $x$ に依存するかを述べよ。

<a id="ex-na1-a4"></a>
#### NA1-A04 対角行列の条件数
- Level: A

$$
A=
\begin{pmatrix}
4&0\\
0&1/100
\end{pmatrix}
$$

について $\kappa_2(A)$ を求めよ。

### Level B

<a id="ex-na1-b1"></a>
#### NA1-B01 丸め因子の積
- Level: B

$|\delta_i|\le u$、$nu<1$ とする。本文の補題を使って

$$
\prod_{i=1}^n(1+\delta_i)
=
1+\theta_n,
\qquad
|\theta_n|\le\gamma_n
$$

を再構成せよ。また $u=10^{-16}$、$n=10^6$ のとき $\gamma_n$ を概算せよ。

<a id="ex-na1-b2"></a>
#### NA1-B02 二次方程式の小さい根
- Level: B

$b>1$ とし、

$$
x^2-2bx+1=0
$$

の小さい方の根を考える。

1. 通常の解の公式から小さい根を書け。
2. 桁落ちを避ける等価な式へ変形せよ。
3. $b\gg1$ で、なぜ後者が数値的に有利か説明せよ。

<a id="ex-na1-b3"></a>
#### NA1-B03 小さい残差と大きい前方誤差
- Level: B

$$
A=
\begin{pmatrix}
1&0\\
0&\varepsilon
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\
\varepsilon
\end{pmatrix},
\qquad
0<\varepsilon\ll1
$$

とする。

1. 厳密解 $x$ を求めよ。
2. $\widetilde x=(1,0)^{\mathsf T}$ の相対残差を求めよ。
3. 相対前方誤差を求めよ。
4. $\kappa_2(A)$ を求め、本文の上界と整合することを確認せよ。

### Level C

<a id="ex-na1-c1"></a>
#### NA1-C01 良条件問題を不安定な式が壊す
- Level: C

$$
f(x)=\sqrt{x+1}-\sqrt{x},
\qquad x>0
$$

について次を示せ。

1. 相対条件数が
   $$
   \kappa_f(x)
   =
   \frac12\sqrt{\frac{x}{x+1}}
   $$
   であり、常に $1/2$ 未満である。
2. 各平方根の計算値に相対誤差 $O(u)$ が入ると仮定し、直接差では $x\gg1$ のとき相対誤差が概ね $O(xu)$ まで増幅され得ることを説明せよ。
3. 有理化した
   $$
   \frac1{\sqrt{x+1}+\sqrt{x}}
   $$
   では近い量の減算がなく、相対誤差が $O(u)$ に留まる理由を説明せよ。
4. この例から「条件数」と「アルゴリズムの安定性」の違いを述べよ。

---

## 15. 詳細解答

### A1 解答

最近接3桁では

$$
1.2345
\longmapsto
1.23.
$$

絶対誤差は

$$
|1.2345-1.23|
=
0.0045.
$$

相対誤差は

$$
\frac{0.0045}{1.2345}
\approx
3.65\times10^{-3}.
$$

この系の単位丸め誤差は

$$
u
=
\frac12 10^{1-3}
=
0.005.
$$

従って

$$
3.65\times10^{-3}
<
5\times10^{-3}
=
u.
$$

標準丸めモデルの上界と整合する。

### A2 解答

分子・分母に共役を掛ける。

$$
\sqrt{x+1}-\sqrt{x}
=
\frac{(\sqrt{x+1}-\sqrt{x})(\sqrt{x+1}+\sqrt{x})}
{\sqrt{x+1}+\sqrt{x}}.
$$

分子は

$$
(x+1)-x=1
$$

なので

$$
\boxed{
\sqrt{x+1}-\sqrt{x}
=
\frac1{\sqrt{x+1}+\sqrt{x}}
}.
$$

$x$ が大きいと

$$
\sqrt{x+1}\approx\sqrt{x}
$$

であり、直接式は近い二数の減算になる。各平方根が有限精度で少しずれていると、その絶対誤差が小さい差に対して大きな相対誤差になる。

一方、有理化した式の分母は同符号の加算なので桁落ちしない。

### A3 解答

相対条件数は

$$
\kappa_f(x)
=
\left|
\frac{x f'(x)}{f(x)}
\right|.
$$

1. $f(x)=x^3$ では
   $$
   f'(x)=3x^2
   $$
   なので
   $$
   \kappa_f(x)
   =
   \left|
   \frac{x\cdot3x^2}{x^3}
   \right|
   =3.
   $$

2. $g(x)=x^{-1}$ では
   $$
   g'(x)=-x^{-2},
   $$
   よって
   $$
   \kappa_g(x)
   =
   \left|
   \frac{x(-x^{-2})}{x^{-1}}
   \right|
   =1.
   $$

3. $h(x)=e^x$ では
   $$
   h'(x)=e^x,
   $$
   したがって
   $$
   \kappa_h(x)
   =
   \left|
   \frac{x e^x}{e^x}
   \right|
   =
   |x|.
   $$

最初の二つは一定で、指数関数だけが入力 $x$ に依存する。

### A4 解答

対角行列の特異値は対角成分の絶対値なので

$$
\sigma_{\max}=4,
\qquad
\sigma_{\min}=\frac1{100}.
$$

従って

$$
\kappa_2(A)
=
\frac{\sigma_{\max}}{\sigma_{\min}}
=
\frac4{1/100}
=
400.
$$

### B1 解答

本文の補題より

$$
\prod_{i=1}^n(1+\delta_i)
=
1+\theta_n,
$$

$$
|\theta_n|
\le
\gamma_n
=
\frac{nu}{1-nu}.
$$

$u=10^{-16}$、$n=10^6$ では

$$
nu=10^{-10}.
$$

したがって

$$
\gamma_n
=
\frac{10^{-10}}{1-10^{-10}}
\approx
10^{-10}.
$$

つまり百万回程度の丸め因子が連鎖しても、この単純モデルでは総相対誤差上界はおおよそ $10^{-10}$ である。

### B2 解答

方程式

$$
x^2-2bx+1=0
$$

の根は

$$
x=b\pm\sqrt{b^2-1}.
$$

小さい根は

$$
x_-
=
b-\sqrt{b^2-1}.
$$

$b\gg1$ では

$$
\sqrt{b^2-1}\approx b
$$

なので近い二数の減算になり、桁落ちしやすい。

共役を掛けると

$$
x_-
=
\frac{(b-\sqrt{b^2-1})(b+\sqrt{b^2-1})}
{b+\sqrt{b^2-1}}.
$$

分子は

$$
b^2-(b^2-1)=1
$$

なので

$$
\boxed{
x_-
=
\frac1{b+\sqrt{b^2-1}}
}.
$$

後者の分母は正の同程度の量の加算であり、近い二数の減算がない。したがって入力値に含まれる小さな相対誤差が桁落ちによって増幅されにくい。

### B3 解答

1. 方程式
   $$
   A x=b
   $$
   は成分ごとに
   $$
   x_1=1,\qquad
   \varepsilon x_2=\varepsilon
   $$
   なので
   $$
   x=
   \begin{pmatrix}
   1\\
   1
   \end{pmatrix}.
   $$

2. $\widetilde x=(1,0)^{\mathsf T}$ なら
   $$
   A\widetilde x
   =
   \begin{pmatrix}
   1\\
   0
   \end{pmatrix},
   $$
   よって
   $$
   r=b-A\widetilde x
   =
   \begin{pmatrix}
   0\\
   \varepsilon
   \end{pmatrix}.
   $$
   従って
   $$
   \frac{\|r\|_2_2}{\|b\|_2}
   =
   \frac{\varepsilon}{\sqrt{1+\varepsilon^2}}
   \approx\varepsilon.
   $$

3. 前方誤差は
   $$
   \widetilde x-x
   =
   \begin{pmatrix}
   0\\
   -1
   \end{pmatrix},
   $$
   なので
   $$
   \frac{\|\widetilde x-x\|_2_2}{\|x\|_2}
   =
   \frac1{\sqrt2}.
   $$

4. 特異値は $1,\varepsilon$ なので
   $$
   \kappa_2(A)=\frac1{\varepsilon}.
   $$
   本文の上界右辺は
   $$
   \kappa_2(A)
   \frac{\|r\|_2_2}{\|b\|_2}
   =
   \frac1{\varepsilon}
   \frac{\varepsilon}{\sqrt{1+\varepsilon^2}}
   =
   \frac1{\sqrt{1+\varepsilon^2}}
   \approx1.
   $$
   左辺 $1/\sqrt2$ は確かにこれ以下である。

小さい残差が大きい前方誤差と両立する原因は、条件数 $1/\varepsilon$ が大きいことにある。

### C1 解答

**1. 問題の条件数。**

有理化して

$$
f(x)
=
\frac1{\sqrt{x+1}+\sqrt{x}}
$$

と書く。この表示を直接微分すると

$$
\frac{f'(x)}{f(x)}
=
-
\frac{
\frac1{2\sqrt{x+1}}
+
\frac1{2\sqrt{x}}
}{
\sqrt{x+1}+\sqrt{x}
}.
$$

分子を通分すると

$$
\frac1{2\sqrt{x+1}}
+
\frac1{2\sqrt{x}}
=
\frac{\sqrt{x+1}+\sqrt{x}}
{2\sqrt{x}\sqrt{x+1}}.
$$

よって

$$
\left|
\frac{x f'(x)}{f(x)}
\right|
=
\frac{x}{2\sqrt{x}\sqrt{x+1}}
=
\frac12\sqrt{\frac{x}{x+1}}.
$$

従って

$$
\boxed{
\kappa_f(x)
=
\frac12\sqrt{\frac{x}{x+1}}
<
\frac12
}.
$$

$x$ が大きくても問題そのものは良条件である。

**2. 直接差の誤差増幅。**

平方根の計算値を

$$
\widetilde a
=
\sqrt{x+1}(1+\delta_1),
\qquad
\widetilde b
=
\sqrt{x}(1+\delta_2),
$$

$$
|\delta_1|,|\delta_2|
\le
C u
$$

とする。

減算前の誤差は

$$
\widetilde a-\widetilde b
-
\left(
\sqrt{x+1}-\sqrt{x}
\right)
=
\sqrt{x+1}\delta_1-\sqrt{x}\delta_2.
$$

したがって絶対値は最悪で

$$
O(u\sqrt{x})
$$

である。

一方、真の差は

$$
f(x)
=
\frac1{\sqrt{x+1}+\sqrt{x}}
\sim
\frac1{2\sqrt{x}}
$$

だから、相対誤差は

$$
\frac{O(u\sqrt{x})}{O(x^{-1/2})}
=
O(xu)
$$

まで増え得る。

**3. 有理化した式。**

$$
g(x)
=
\frac1{\sqrt{x+1}+\sqrt{x}}
$$

では、二つの平方根を足す。両者は正で同程度なので

$$
\sqrt{x+1}+\sqrt{x}
$$

は各項より小さくならず、差のような相対誤差増幅が起きない。

平方根、加算、逆数の各段階で相対誤差が $O(u)$ なら、丸め因子の積の補題により、固定個数の演算全体でも相対誤差は

$$
O(u)
$$

に留まる。

**4. 条件数と安定性。**

この問題では

$$
\kappa_f(x)<1/2
$$

なので、入力摂動に対して問題そのものは安定である。

それでも直接式は、内部で近い二数を引くため、有限精度で $O(xu)$ の誤差増幅を起こし得る。これはアルゴリズム側の不安定性である。

有理化した式は同じ数学的関数 $f$ を計算するが、桁落ちを避けるため $O(u)$ の精度を保ちやすい。

したがって

- **条件数**：問題 $f$ 自身の感度
- **安定性**：その問題を解く具体的な計算手順の誤差増幅

であり、両者は別物である。

---

## 16. まとめ

本章では次を一つの依存鎖として閉じました。

- 最近接丸めから
  $$
  \operatorname{fl}(x)=x(1+\delta),
  \qquad |\delta|\le u
  $$
  を導いた。
- 複数の丸め因子を
  $$
  |\theta_n|\le\gamma_n
  $$
  でまとめられることを証明した。
- 桁落ちは減算器の故障ではなく、近い近似値の差で既存誤差が相対的に増幅される現象だと確認した。
- 微分から相対条件数
  $$
  \kappa_f(x)=\left|\frac{x f'(x)}{f(x)}\right|
  $$
  を導いた。
- 2-ノルム行列条件数を特異値比へ接続し、右辺摂動に対する線形方程式の感度を証明した。
- 線形方程式では残差が右辺に関する後方誤差そのものであることを示した。
- 前方誤差が
  $$
  \text{条件数}\times\text{後方誤差}
  $$
  で支配される構造を厳密に確認した。
- 条件数は問題の性質、後方安定性はアルゴリズムの性質であることを分離した。
- $f(x)=\sqrt{x+1}-\sqrt{x}$ を通じて、良条件問題でも不安定な式は精度を壊し、有理化で改善できることを確認した。

次の NA2「非線形方程式・不動点反復・Newton 法」では、この「条件数と安定性を分ける」という見方を非線形方程式へ持ち込みます。
