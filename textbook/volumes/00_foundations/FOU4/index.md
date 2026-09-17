# FOU4 Plancherel：$L^2$ へ Fourier 変換を延長する

FOU3 では

$$
\widehat f(\xi)=\int_{\mathbb R}f(x)e^{-i\xi x}\,dx
$$

を $f\in L^1(\mathbb R)$ に対して定義し、Gaussian 正則化から Fourier 反転まで証明しました。しかし $L^2$ 関数は一般には $L^1$ ではありません。例えば

$$
f(x)=\frac1{(1+|x|)^{3/4}}
$$

は $f\in L^2(\mathbb R)$ ですが $f\notin L^1(\mathbb R)$ です。このとき各 $\xi$ で積分

$$
\int f(x)e^{-i\xi x}dx
$$

が絶対収束するとは限りません。

それでも Fourier 変換は $L^2$ 全体で定義できます。鍵は「各点で積分を定義する」ことではなく、まず良い関数で

$$
\|\widehat f\|_2^2=2\pi\|f\|_2^2
$$

を証明し、その等式を使って完備空間 $L^2$ へ延長することです。

本章の流れは

```text
Cc 稠密性
  ↓
L2 平行移動連続性
  ↓
Gaussian approximate identity in L2
  ↓
Gaussian Fourier core が L2 に稠密
  ↓
core 上の Plancherel
  ↓
L2 完備性で Fourier 変換を延長
  ↓
Parseval・反転・unitary
  ↓
L2 の平行移動・変調・L1-L2 畳み込み
```

です。

直接の Fourier 理論の前提は [FOU3](../FOU3/index.md) です。解析基盤として [$C_c$ の $L^p$ 稠密性と $L^p$ 完備性](../MT7/index.md)、関数解析の言葉として [ノルム空間・Banach空間・Hilbert空間](../F0_02C1_ノルム空間_Banach_Hilbert/index.md) を使います。

> **この章で使う関数解析は限定的です。** 使うのは $L^2$ の完備性、Hilbert 空間の内積、稠密部分空間、連続延長です。Hahn--Banach、Riesz 表現定理、スペクトル定理は使いません。
>
> **複素解析は前提ではありません。** 留数定理は特定の Fourier 積分を計算する便利な別ルートですが、Plancherel、$L^2$ 延長、反転、unitary 性の証明には使いません。

FOU3 と同じく

$$
\widehat f(\xi)=\int_{\mathbb R}f(x)e^{-i\xi x}\,dx,
\qquad
f(x)=\frac1{2\pi}\int_{\mathbb R}\widehat f(\xi)e^{i\xi x}\,d\xi
$$

を規約とします。この規約では Fourier 変換そのものは $L^2$ ノルムを $\sqrt{2\pi}$ 倍します。unitary にしたいときは $1/\sqrt{2\pi}$ を掛けます。

---

## 1. 複素 $L^2$ を Hilbert 空間として使う

Fourier 変換は複素数値になるので、実数値 $L^2$ だけでは足りません。

<a id="def-fou4-complex-l2"></a>
<!-- formal-statement-start -->
> **定義（複素L2内積）**  
> 複素数値可測関数 $f,g\in L^2(\mathbb R;\mathbb C)$ に対し
>
$$
\langle f,g\rangle
:=\int_{\mathbb R}f(x)\overline{g(x)}\,dx,
\qquad
\|f\|_2=\sqrt{\langle f,f\rangle}
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou4-complex-l2 -->
**定義の確認。** $f=1_{[0,1]}$、$g=e^{ix}1_{[0,1]}$ なら

$$
\langle f,g\rangle
=\int_0^1e^{-ix}dx
=\frac{1-e^{-i}}{i}.
$$

一方

$$
\|f\|_2=1,
\qquad
\|g\|_2^2=\int_0^1|e^{ix}|^2dx=1.
$$

位相因子 $e^{ix}$ は $L^2$ ノルムを変えません。
<!-- definition-example-end -->

複素 $L^2$ の完備性は新しい難所ではありません。$f_n=u_n+iv_n$ が複素 $L^2$ で Cauchy なら

$$
\|u_n-u_m\|_2\le\|f_n-f_m\|_2,
\qquad
\|v_n-v_m\|_2\le\|f_n-f_m\|_2.
$$

したがって実 $L^2$ の完備性から $u_n\to u$、$v_n\to v$ が得られ、$f_n\to u+iv$ です。以後はこの完備性を使います。

---

## 2. $L^2$ でも平行移動は連続である

Gaussian 核で近似するには、FOU3 の $L^1$ 平行移動連続性の $L^2$ 版が必要です。

$a\in\mathbb R$ に対し

$$
(\tau_af)(x):=f(x-a)
$$

と書きます。変数変換から

$$
\|\tau_af\|_2=\|f\|_2
$$

です。

<a id="lem-fou4-l2-translation"></a>
<!-- formal-statement-start -->
> **補題（L2平行移動連続性）**  
> 任意の $f\in L^2(\mathbb R)$ に対して
>
$$
\|\tau_af-f\|_2\to0
\qquad(a\to0)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

一般の $L^2$ 関数を直接点wiseに扱いません。まず $C_c$ 関数で一様連続性を使い、その後 $C_c$ の $L^2$ 稠密性で一般の $f$ へ移します。

<!-- proof-start -->
### 証明

まず $g\in C_c(\mathbb R)$ とし、$\operatorname{supp}g\subset[-R,R]$ とします。$|a|\le1$ なら $\tau_ag-g$ の台は $[-R-1,R+1]$ に含まれます。従って

$$
\|\tau_ag-g\|_2^2
\le(2R+2)\sup_x|g(x-a)-g(x)|^2.
$$

$g$ は一様連続なので右辺は $a\to0$ で $0$ へ行きます。

次に一般の $f\in L^2$ を取ります。[$C_c$ の $L^2$ 稠密性](../MT7/index.md#thm-mt7-cc-dense)から、任意の $\varepsilon>0$ に対して

$$
\|f-g\|_2<\varepsilon
$$

となる $g\in C_c$ を取れます。平行移動はノルムを保つので

$$
\begin{aligned}
\|\tau_af-f\|_2
&\le\|\tau_a(f-g)\|_2
 +\|\tau_ag-g\|_2
 +\|g-f\|_2\\
&<2\varepsilon+\|\tau_ag-g\|_2.
\end{aligned}
$$

$a\to0$ とすると

$$
\limsup_{a\to0}\|\tau_af-f\|_2\le2\varepsilon.
$$

$\varepsilon$ は任意なので極限は $0$ です。
<!-- proof-end -->

ここで $C_c$ 稠密性は単なる便利な近似ではなく、「一般の $L^2$ 関数にはない一様連続性を、稠密な良い関数で代替する」役割を持っています。

---

## 3. Gaussian approximate identity は $L^2$ でも元へ戻る

FOU3 の Gaussian 核

$$
k_\varepsilon(x)
=\frac1{2\sqrt{\pi\varepsilon}}
\exp\!\left(-\frac{x^2}{4\varepsilon}\right),
\qquad
\widehat{k_\varepsilon}(\xi)=e^{-\varepsilon\xi^2}
$$

をそのまま使います。

<a id="thm-fou4-l2-gaussian-approximation"></a>
<!-- formal-statement-start -->
> **定理（Gaussian approximate identity のL2収束）**  
> $f\in L^2(\mathbb R)$ なら $f*k_\varepsilon$ は $L^2$ の元として定義でき、
>
$$
\|f*k_\varepsilon-f\|_2\to0
\qquad(\varepsilon\downarrow0)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

FOU3 の $L^1$ 証明と同じ形ですが、平行移動差を $L^2$ ノルムで測ります。

<!-- proof-start -->
### 証明

Minkowski の積分不等式から

$$
\begin{aligned}
\|f*k_\varepsilon-f\|_2
&=\left\|\int k_\varepsilon(y)
\{\tau_yf-f\}\,dy\right\|_2\\
&\le\int k_\varepsilon(y)
\|\tau_yf-f\|_2dy.
\end{aligned}
$$

任意の $\eta>0$ に対し、前節の平行移動連続性から、ある $\delta>0$ が存在して

$$
|y|<\delta
\quad\Longrightarrow\quad
\|\tau_yf-f\|_2<\eta
$$

となります。一方、全ての $y$ で

$$
\|\tau_yf-f\|_2\le2\|f\|_2.
$$

よって

$$
\|f*k_\varepsilon-f\|_2
\le\eta
+2\|f\|_2
\int_{|y|\ge\delta}k_\varepsilon(y)dy.
$$

Gaussian 核は原点へ質量集中するので、$\varepsilon\downarrow0$ で第二項は $0$ へ行きます。その後 $\eta\downarrow0$ とすれば結論を得ます。
<!-- proof-end -->

この証明で使ったのは positivity、質量 $1$、原点集中と平行移動連続性だけです。Gaussian の具体式は後で Fourier 側の可積分性を保証するために効きます。

---

## 4. Plancherel を証明できる稠密な線形 core を作る

$L^2$ 全体へ線形作用素を延長するため、近似に使う core 自身が和と差に閉じていることが重要です。単に $h*k_\varepsilon$ という形の関数だけを集めると、異なる $\varepsilon$ を持つ二つの関数の和・差が同じ形に戻るとは限りません。そこで有限線形結合まで含めます。

<a id="def-fou4-gaussian-core"></a>
<!-- formal-statement-start -->
> **定義（Gaussian Fourier core）**  
> 次の生成族の有限線形結合全体を $\mathcal G$ と書く。
>
$$
\boxed{
\mathcal G
:=\operatorname{span}\{h*k_\varepsilon:
h\in L^1(\mathbb R)\cap L^2(\mathbb R),\ \varepsilon>0\}
}
$$
>
> 特に $\mathcal G$ は線形空間である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou4-gaussian-core -->
**定義の確認。** $h=1_{[-1,1]}$ とすると

$$
g_\varepsilon=h*k_\varepsilon\in\mathcal G.
$$

FOU3 の畳み込み定理から

$$
\widehat g_\varepsilon(\xi)
=\frac{2\sin\xi}{\xi}e^{-\varepsilon\xi^2}.
$$

$sinc$ 型の $1/|\xi|$ 尾部だけでは $L^1$ になりませんが、Gaussian 因子を掛けると絶対可積分になります。これが正則化を挟む理由です。さらに $g_{\varepsilon_1}-2g_{\varepsilon_2}$ も $\mathcal G$ に属します。後で近似列の差へ Plancherel を適用できるのは、この線形閉性のおかげです。
<!-- definition-example-end -->

生成元 $g=h*k_\varepsilon$ なら Young 型評価から

$$
\|g\|_1\le\|h\|_1\|k_\varepsilon\|_1=\|h\|_1,
$$

$$
\|g\|_2\le\|h\|_2\|k_\varepsilon\|_1=\|h\|_2.
$$

また $h\in L^1$ なので $|\widehat h|\le\|h\|_1$、従って

$$
|\widehat g(\xi)|
=|\widehat h(\xi)|e^{-\varepsilon\xi^2}
\le\|h\|_1e^{-\varepsilon\xi^2}.
$$

よって生成元について

$$
g\in L^1\cap L^2,
\qquad
\widehat g\in L^1\cap L^2.
$$

有限和でもこれらの性質は保たれるので、任意の $g\in\mathcal G$ について同じ結論が成り立ちます。また各生成元は $L^1$ 関数と連続な Gaussian 核の畳み込みなので連続であり、従って $\mathcal G$ の各元も連続です。

<a id="thm-fou4-core-density"></a>
<!-- formal-statement-start -->
> **定理（Gaussian Fourier core のL2稠密性）**  
> Gaussian Fourier core $\mathcal G$ は $L^2(\mathbb R)$ に稠密である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $f\in L^2$ と $\eta>0$ を取ります。$C_c$ の $L^2$ 稠密性から $h\in C_c\subset L^1\cap L^2$ を

$$
\|f-h\|_2<\frac\eta2
$$

となるように取れます。前節の $L^2$ Gaussian approximate identity により、十分小さい $\varepsilon>0$ で

$$
\|h*k_\varepsilon-h\|_2<\frac\eta2.
$$

$g=h*k_\varepsilon\in\mathcal G$ と置けば

$$
\|f-g\|_2
\le\|f-h\|_2+\|h-h*k_\varepsilon\|_2
<\eta.
$$

従って $\mathcal G$ は $L^2$ に稠密です。
<!-- proof-end -->

---

## 5. core 上で Plancherel を証明する

ここが本章の核心です。

$g\in\mathcal G$ に対し

$$
g^\sharp(x):=\overline{g(-x)}
$$

と置きます。直接の変数変換から

$$
\widehat{g^\sharp}(\xi)=\overline{\widehat g(\xi)}.
$$

従って FOU3 の畳み込み定理により

$$
r:=g*g^\sharp
$$

は

$$
\widehat r(\xi)=|\widehat g(\xi)|^2
$$

を満たします。また

$$
r(0)
=\int g(-y)\overline{g(-y)}dy
=\|g\|_2^2.
$$

<a id="thm-fou4-plancherel-core"></a>
<!-- formal-statement-start -->
> **定理（core上のPlancherel等式）**  
> $g\in\mathcal G$ なら
>
$$
\boxed{
\|\widehat g\|_2^2
=2\pi\|g\|_2^2
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$r=g*g^\sharp$ を作ると $r(0)=\|g\|_2^2$、周波数側は $\widehat r=|\widehat g|^2$ になります。あとは FOU3 の Fourier 反転を $r$ の $x=0$ に適用します。

<!-- proof-start -->
### 証明

$g\in\mathcal G$ では $g\in L^1$ かつ $\widehat g\in L^1\cap L^2$ です。従って $r=g*g^\sharp\in L^1$ であり、畳み込みは連続です。また

$$
\widehat r=|\widehat g|^2\in L^1
$$

です。したがって [FOU3 の Fourier 反転](../FOU3/index.md#thm-fou3-inversion)を $r$ に適用でき、$x=0$ で

$$
r(0)
=\frac1{2\pi}\int_{\mathbb R}\widehat r(\xi)d\xi.
$$

左辺と右辺へ上の式を代入すると

$$
\|g\|_2^2
=\frac1{2\pi}
\int|\widehat g(\xi)|^2d\xi.
$$

従って

$$
\boxed{
\|\widehat g\|_2
=\sqrt{2\pi}\,\|g\|_2
}.
$$
<!-- proof-end -->

仮定の役割を確認します。

- $g\in L^1$：FOU3 の古典 Fourier 変換と畳み込み定理を使うため。
- $\widehat g\in L^1$：$r$ に Fourier 反転を適用する入口を作るため。
- $\widehat g\in L^2$：$|\widehat g|^2\in L^1$ とするため。
- $\mathcal G$ の線形閉性：近似列の差にも同じ等式を適用するため。
- Gaussian 正則化：上の三つの可積分性を同時に満たす稠密な生成族を作るため。

Plancherel はここでは「神託」ではなく、FOU3 の反転定理を $g*g^\sharp$ に当てることで出てきました。

---

## 6. 完備性で全 $L^2$ へ延長する

ここから関数解析の「稠密部分空間上で定義して完備化する」という仕組みを使います。

<a id="def-fou4-l2-transform"></a>
<!-- formal-statement-start -->
> **定義（L2 Fourier変換）**  
> $f\in L^2(\mathbb R)$ とする。$\mathcal G$ の稠密性により $g_n\in\mathcal G$ で
>
$$
g_n\to f\quad\text{in }L^2
$$
>
> となる列を取る。$L^2$ Fourier 変換 $\mathcal F_2f$ を
>
$$
\boxed{
\mathcal F_2f
:=L^2\!\!\operatorname{-lim}_{n\to\infty}\widehat g_n
}
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou4-l2-transform -->
**なぜ「各 $\xi$ で積分」と定義しないのか。** 冒頭の

$$
f(x)=(1+|x|)^{-3/4}
$$

は $L^2$ ですが $L^1$ ではありません。古典 Fourier 積分の絶対収束は保証されません。一方、上の定義は $f$ を $L^2$ で近似できればよく、各周波数での絶対収束を要求しません。
<!-- definition-example-end -->

<a id="thm-fou4-l2-extension"></a>
<!-- formal-statement-start -->
> **定理（L2 Fourier変換の一意な拡張）**  
> 上の定義は近似列の選び方に依存せず、線形写像
>
$$
\mathcal F_2:L^2(\mathbb R)\to L^2(\mathbb R)
$$
>
> を与える。さらに任意の $f\in L^2$ で
>
$$
\boxed{
\|\mathcal F_2f\|_2
=\sqrt{2\pi}\,\|f\|_2
}
$$
>
> が成り立つ。この性質を持ち、$\mathcal G$ 上で古典 Fourier 変換と一致する連続線形拡張は一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$g_n\to f$ in $L^2$ とします。$\mathcal G$ は線形空間なので $g_n-g_m\in\mathcal G$ です。従って core 上の Plancherel を差へ適用でき、

$$
\|\widehat g_n-\widehat g_m\|_2
=\sqrt{2\pi}\,\|g_n-g_m\|_2.
$$

従って $(\widehat g_n)$ は $L^2$ Cauchy 列です。$L^2$ の完備性によりある $G\in L^2$ へ収束します。これが存在です。

別の列 $h_n\in\mathcal G$ も $h_n\to f$ とします。このとき $g_n-h_n\in\mathcal G$ なので再び Plancherel を使えて、

$$
\|\widehat g_n-\widehat h_n\|_2
=\sqrt{2\pi}\,\|g_n-h_n\|_2
\le\sqrt{2\pi}
(\|g_n-f\|_2+\|h_n-f\|_2)
\to0.
$$

よって二つの Fourier 側の極限は同じです。従って定義は近似列に依存しません。

線形性は $g_n\to f$、$h_n\to h$ に対して、$\mathcal G$ の線形性から $ag_n+bh_n\in\mathcal G$ かつ $ag_n+bh_n\to af+bh$ であることを使い、core 上の Fourier 変換の線形性を極限へ移せば従います。

最後に Plancherel とノルムの連続性から

$$
\begin{aligned}
\|\mathcal F_2f\|_2
&=\lim_n\|\widehat g_n\|_2\\
&=\sqrt{2\pi}\lim_n\|g_n\|_2\\
&=\sqrt{2\pi}\|f\|_2.
\end{aligned}
$$

一意性も稠密性から従います。二つの連続線形拡張が $\mathcal G$ 上で一致するなら、任意の $f$ を $g_n\in\mathcal G$ で近似して極限を取れば $f$ 上でも一致します。
<!-- proof-end -->

この節が「関数解析をある程度前提にする」部分の本体です。使った一般原理は

```text
稠密な線形部分空間で等長型の評価
          ↓
差にも評価を適用して像が Cauchy
          ↓
値域 L2 の完備性で極限を作る
          ↓
近似列に依存しないことを評価で確認
```

だけです。

---

## 7. $L^1\cap L^2$ では従来の Fourier 変換と一致する

延長を作っただけでは、FOU3 の積分表示との整合性を確認したことになりません。

<a id="thm-fou4-l1-l2-compatibility"></a>
<!-- formal-statement-start -->
> **定理（L1 Fourier変換との整合性）**  
> $f\in L^1(\mathbb R)\cap L^2(\mathbb R)$ とする。このとき FOU3 の積分で定義した $\widehat f$ は $L^2$ に属し、
>
$$
\mathcal F_2f=\widehat f
\qquad\text{ほとんど至る所（almost everywhere; a.e.）}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$g_\varepsilon=f*k_\varepsilon$ とします。$f\in L^1\cap L^2$ なので $g_\varepsilon$ は $\mathcal G$ の生成元、従って $g_\varepsilon\in\mathcal G$ です。

FOU3 の $L^1$ Gaussian approximate identity と本章の $L^2$ 版から

$$
\|g_\varepsilon-f\|_1\to0,
\qquad
\|g_\varepsilon-f\|_2\to0.
$$

FOU3 の基本評価により

$$
\|\widehat g_\varepsilon-\widehat f\|_\infty
\le\|g_\varepsilon-f\|_1\to0.
$$

従って $\widehat g_\varepsilon$ は $\widehat f$ へ一様収束します。

一方、$L^2$ Fourier 変換の連続性から

$$
\widehat g_\varepsilon
=\mathcal F_2g_\varepsilon
\to\mathcal F_2f
\quad\text{in }L^2.
$$

$L^2$ 収束列から a.e. 収束する部分列を取れます。その部分列は一様収束によって各点で $\widehat f$ へも収束するため、

$$
\mathcal F_2f=\widehat f
\quad\text{a.e.}
$$

です。特に $\widehat f\in L^2$ が従います。
<!-- proof-end -->

従って以後、$f\in L^1\cap L^2$ では $\mathcal F_2f$ と $\widehat f$ を同じ記号で扱って構いません。ただし一般の $L^2$ 関数では「積分が各点で存在する」と読み替えてはいけません。

---

## 8. Parseval：ノルムだけでなく内積も保つ

<a id="thm-fou4-parseval"></a>
<!-- formal-statement-start -->
> **定理（Parseval内積等式）**  
> 任意の $f,g\in L^2(\mathbb R)$ に対して
>
$$
\boxed{
\langle\mathcal F_2f,\mathcal F_2g\rangle
=2\pi\langle f,g\rangle
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Plancherel はノルムの等式です。複素内積は $f+g$ と $f+ig$ のノルムから復元できます。

<!-- proof-start -->
### 証明

複素内積の polarization identity

$$
\langle u,v\rangle
=\frac14\Bigl(
\|u+v\|^2-\|u-v\|^2
+i\|u+iv\|^2-i\|u-iv\|^2
\Bigr)
$$

を使います。$\mathcal F_2$ は線形で、各ノルムを $\sqrt{2\pi}$ 倍するので、右辺の四つのノルム二乗は全て $2\pi$ 倍されます。従って

$$
\langle\mathcal F_2f,\mathcal F_2g\rangle
=2\pi\langle f,g\rangle.
$$
<!-- proof-end -->

<a id="def-fou4-unitary-transform"></a>
<!-- formal-statement-start -->
> **定義（正規化Fourier作用素）**  
> $L^2(\mathbb R)$ 上で
>
$$
U:=\frac1{\sqrt{2\pi}}\mathcal F_2
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou4-unitary-transform -->
Parseval から

$$
\langle Uf,Ug\rangle=\langle f,g\rangle,
\qquad
\|Uf\|_2=\|f\|_2.
$$

つまり $U$ は少なくとも等長作用素です。次節で全射性まで示して unitary であることを確定します。
<!-- definition-example-end -->

---

## 9. $L^2$ Fourier 反転と unitary 性

反射作用素

$$
(Jf)(x):=f(-x)
$$

を導入します。$J$ は $L^2$ ノルムを保ち、$J^2=I$ です。

<a id="thm-fou4-l2-inversion"></a>
<!-- formal-statement-start -->
> **定理（L2 Fourier反転とユニタリ性）**  
> $L^2(\mathbb R)$ 上で
>
$$
\boxed{
\mathcal F_2^2=2\pi J
}
$$
>
> が成り立つ。従って
>
$$
U^2=J,
\qquad
U^4=I.
$$
>
> 特に $U$ は全射な等長作用素、すなわち unitary 作用素である。また
>
$$
\boxed{
\mathcal F_2^{-1}
=\frac1{2\pi}J\mathcal F_2
}
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

まず core で FOU3 の反転定理を使って二回 Fourier 変換します。その恒等式を稠密性と連続性で全 $L^2$ へ延長します。

<!-- proof-start -->
### 証明

$g\in\mathcal G$ とします。前節で確認した通り $g$ は連続で、$g\in L^1$、$\widehat g\in L^1$ です。FOU3 の反転公式を $-x$ に適用すると

$$
g(-x)
=\frac1{2\pi}
\int\widehat g(\xi)e^{-i\xi x}d\xi.
$$

右辺の積分は $\widehat{\widehat g}(x)/(2\pi)$ なので

$$
\widehat{\widehat g}(x)=2\pi g(-x).
$$

さらに $\widehat g\in L^1\cap L^2$ ですから、前節の整合性により二回目の Fourier 変換は $\mathcal F_2(\mathcal F_2g)$ と一致します。従って

$$
\mathcal F_2^2g=2\pi Jg
\qquad(g\in\mathcal G).
$$

$\mathcal G$ は $L^2$ に稠密で、$\mathcal F_2^2$ と $2\pi J$ はともに連続です。よって等式は全 $f\in L^2$ へ延長されます。

$U=(2\pi)^{-1/2}\mathcal F_2$ とすれば $U^2=J$、従って $U^4=I$ です。よって任意の $h\in L^2$ に対して

$$
h=U(U^3h)
$$

と書けるので $U$ は全射です。等長性から単射でもあり、既に内積を保つことを示したため $U$ は unitary です。従って $\mathcal F_2$ も全単射です。

最後に

$$
A:=\frac1{2\pi}J\mathcal F_2
$$

と置くと、$\mathcal F_2^2=2\pi J$ と $J^2=I$ から

$$
A\mathcal F_2
=\frac1{2\pi}J\mathcal F_2^2
=J^2
=I.
$$

すでに $\mathcal F_2$ は全単射なので、その左逆 $A$ は逆作用素そのものです。従って

$$
\boxed{
\mathcal F_2^{-1}
=\frac1{2\pi}J\mathcal F_2
}.
$$
<!-- proof-end -->

一般の $L^2$ 関数について、逆変換は pointwise に絶対収束する積分とは限りません。反転は $L^2$ ノルムで成立する等式です。ここを FOU3 の反転定理と混同しないことが重要です。

---

## 10. 平行移動・変調は $L^2$ でもそのまま残る

<a id="thm-fou4-l2-transform-rules"></a>
<!-- formal-statement-start -->
> **定理（L2での平行移動・変調則）**  
> $f\in L^2(\mathbb R)$、$a,b\in\mathbb R$ とする。このとき $L^2$ の等式として
>
$$
\mathcal F_2(\tau_af)(\xi)
=e^{-ia\xi}\mathcal F_2f(\xi),
$$
>
$$
\mathcal F_2(e^{ibx}f(x))(\xi)
=(\mathcal F_2f)(\xi-b)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$g_n\in\mathcal G$ で $g_n\to f$ in $L^2$ とします。平行移動と変調は $L^2$ ノルムを保つので

$$
\tau_ag_n\to\tau_af,
\qquad
e^{ibx}g_n\to e^{ibx}f
$$

です。$g_n$ は $L^1$ でもあるので FOU3 の公式が使え、

$$
\widehat{\tau_ag_n}
=e^{-ia\xi}\widehat g_n,
$$

$$
\widehat{e^{ibx}g_n(x)}(\xi)
=\widehat g_n(\xi-b).
$$

周波数側で位相因子の乗算と平行移動も $L^2$ ノルムを保ちます。従って $n\to\infty$ とすれば所望の二式が得られます。
<!-- proof-end -->

FOU3 の公式を「一般の $L^2$ 関数にも積分計算がそのままできる」と誤解せず、稠密な $L^1$ core で証明して連続性で運ぶのがポイントです。

---

## 11. $L^1$ kernel と $L^2$ signal の畳み込み

PDE や信号処理では、核 $k$ は $L^1$、信号 $f$ は $L^2$ という組合せが自然に現れます。

<a id="thm-fou4-l1-l2-convolution"></a>
<!-- formal-statement-start -->
> **定理（L1-L2畳み込みとFourier乗算）**  
> $k\in L^1(\mathbb R)$、$f\in L^2(\mathbb R)$ とする。このとき $k*f\in L^2$ で
>
$$
\boxed{
\|k*f\|_2\le\|k\|_1\|f\|_2
}
$$
>
> が成り立つ。また
>
$$
\boxed{
\mathcal F_2(k*f)
=\widehat k\,\mathcal F_2f
}
$$
>
> が $L^2$ の等式として成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず Minkowski の積分不等式と平行移動不変性から

$$
\begin{aligned}
\|k*f\|_2
&=\left\|\int k(y)f(\,\cdot-y)dy\right\|_2\\
&\le\int|k(y)|\|\tau_yf\|_2dy\\
&=\|k\|_1\|f\|_2.
\end{aligned}
$$

従って $f\mapsto k*f$ は $L^2$ 上の連続線形作用素です。

次に $g_n\in\mathcal G$、$g_n\to f$ in $L^2$ とします。$g_n\in L^1$ なので $k*g_n\in L^1\cap L^2$ であり、FOU3 の畳み込み定理と本章の $L^1\cap L^2$ 整合性から

$$
\mathcal F_2(k*g_n)
=\widehat k\,\widehat g_n.
$$

左辺では

$$
\|k*g_n-k*f\|_2
\le\|k\|_1\|g_n-f\|_2\to0.
$$

右辺では $|\widehat k|\le\|k\|_1$ だから

$$
\|\widehat k(\widehat g_n-\mathcal F_2f)\|_2
\le\|k\|_1
\|\widehat g_n-\mathcal F_2f\|_2\to0.
$$

よって極限を取れば公式が従います。
<!-- proof-end -->

この定理は熱核による平滑化や線形フィルタを $L^2$ 上で扱う基本形です。

### 微分公式はどこまで延長するか

FOU3 では絶対連続性や可積分性を仮定して

$$
\widehat{f'}(\xi)=i\xi\widehat f(\xi)
$$

を証明しました。$L^2$ だけを仮定した一般の関数に「$f'$」を持ち込むには弱微分・Sobolev 空間が必要です。その理論は Encore III の正本へ送り、本章では逆輸入しません。

従って本章での安全な読み方は、**FOU3 の仮定を満たし、さらに必要な関数が $L^2$ に属する場合には、その等式を $L^2$ の等式としても読める**、までです。

---

## 12. Plancherel で sinc 二乗積分を一行で読む

$f=1_{[-1/2,1/2]}$ とすると

$$
\widehat f(\xi)
=\frac{2\sin(\xi/2)}{\xi}.
$$

Plancherel から

$$
\int_{\mathbb R}
\left|\frac{2\sin(\xi/2)}{\xi}\right|^2d\xi
=2\pi\int_{-1/2}^{1/2}1\,dx
=2\pi.
$$

$u=\xi/2$ と置けば

$$
\boxed{
\int_{-\infty}^{\infty}
\left(\frac{\sin u}{u}\right)^2du=\pi
}.
$$

FOU3 では三角形関数を作って反転定理から同じ積分を求めました。FOU4 では「時間側のエネルギー = 周波数側のエネルギー」が直接同じ答えを与えます。

---

## 13. 複素解析と関数解析は、Fourier解析のどこに入るか

### 13.1 複素解析は全面的な prerequisite ではない

本章までの論理は

```text
実解析・測度論
  +
FOU1–FOU3
  +
L2/Hilbert の最小限
  ↓
Plancherel・L2 Fourier
```

で閉じています。複素解析を知らなくても Fourier 級数、$L^1$ Fourier 変換、反転、Plancherel、$L^2$ 反転まで進めます。

一方、例えば

$$
\int_{\mathbb R}\frac{e^{-i\xi x}}{1+x^2}dx
$$

のような具体的な変換対を留数定理で高速に計算するとき、複素解析は非常に強力です。したがって複素解析は **Fourier 理論の基礎依存ではなく、計算技法・発展接続として横から合流する** と考えるのが自然です。

### 13.2 関数解析は FOU4 から本質的に現れる

FOU1–FOU3 では、Hilbert 空間という一般語を知らなくても各証明を実解析として閉じられます。しかし FOU4 では

- $L^2$ が完備である
- 稠密な線形部分空間で写像を定義する
- ノルム評価から Cauchy 性を得る
- 完備性で像の極限を作る
- 内積保存・unitary 作用素として読む

という構造が本質的です。

ただし「関数解析を全部終えてから Fourier 解析」ではありません。本章に必要なのはこの部分だけです。より深い関数解析が本格的に必要になるのは、スペクトル理論、弱微分、Sobolev 空間、distribution、一般の偏微分作用素へ進む段階です。

---

# 演習

## FOU4-A01 $L^2$ 平行移動連続性

- Level: A
- 目安時間: 12分

$f\in L^2(\mathbb R)$ とする。$C_c(\mathbb R)$ の $L^2$ 稠密性を使い、

$$
\|\tau_af-f\|_2\to0
$$

を証明せよ。$g\in C_c$ のときに一様連続性だけで十分な理由も書け。

<!-- solution-start -->
### 詳細解答

任意の $\varepsilon>0$ に対して $g\in C_c$ を

$$
\|f-g\|_2<\varepsilon
$$

となるよう取ります。$\operatorname{supp}g\subset[-R,R]$ とすれば、$|a|\le1$ で $\tau_ag-g$ の台は $[-R-1,R+1]$ に入ります。よって

$$
\|\tau_ag-g\|_2^2
\le(2R+2)\sup_x|g(x-a)-g(x)|^2.
$$

$g$ は一様連続なので右辺は $a\to0$ で0です。

平行移動は $L^2$ ノルムを保つから

$$
\begin{aligned}
\|\tau_af-f\|_2
&\le\|\tau_a(f-g)\|_2
+\|\tau_ag-g\|_2
+\|g-f\|_2\\
&<2\varepsilon+\|\tau_ag-g\|_2.
\end{aligned}
$$

従って

$$
\limsup_{a\to0}\|\tau_af-f\|_2\le2\varepsilon.
$$

$\varepsilon$ は任意なので極限は0です。
<!-- solution-end -->

## FOU4-A02 Gaussian 核の尺度と Fourier 変換

- Level: A
- 目安時間: 12分

$$
k_\varepsilon(x)
=\frac1{2\sqrt{\pi\varepsilon}}
 e^{-x^2/(4\varepsilon)}
$$

について

1. $\|k_\varepsilon\|_1=1$ を確認せよ。
2. FOU3 の Gaussian 変換公式から $\widehat{k_\varepsilon}(\xi)=e^{-\varepsilon\xi^2}$ を導け。
3. $\varepsilon\downarrow0$ のとき空間側と周波数側の幅がどう変わるか説明せよ。

<!-- solution-start -->
### 詳細解答

$x=2\sqrt\varepsilon\,u$ と置くと

$$
\int k_\varepsilon(x)dx
=\frac1{\sqrt\pi}\int e^{-u^2}du=1.
$$

次に FOU3 の

$$
\widehat{e^{-ax^2}}(\xi)
=\sqrt{\frac\pi a}e^{-\xi^2/(4a)}
$$

へ $a=1/(4\varepsilon)$ を代入します。前の定数 $1/(2\sqrt{\pi\varepsilon})$ も掛けると

$$
\widehat{k_\varepsilon}(\xi)=e^{-\varepsilon\xi^2}.
$$

$\varepsilon\downarrow0$ では $k_\varepsilon$ は原点近くへ狭く集中します。一方 $e^{-\varepsilon\xi^2}$ は周波数側で広がり、固定した $\xi$ では1へ近づきます。空間で狭くなるほど周波数では広くなる対応です。
<!-- solution-end -->

## FOU4-A03 Parseval を polarization から導く

- Level: A
- 目安時間: 15分

Plancherel

$$
\|\mathcal F_2h\|_2^2=2\pi\|h\|_2^2
$$

を全ての $h\in L^2$ に対して既知として、複素 polarization identity から

$$
\langle\mathcal F_2f,\mathcal F_2g\rangle
=2\pi\langle f,g\rangle
$$

を導け。

<!-- solution-start -->
### 詳細解答

複素内積は

$$
\langle u,v\rangle
=\frac14\bigl(
\|u+v\|^2-\|u-v\|^2
+i\|u+iv\|^2-i\|u-iv\|^2
\bigr)
$$

で復元できます。$u=\mathcal F_2f$、$v=\mathcal F_2g$ とします。線形性により

$$
u\pm v=\mathcal F_2(f\pm g),
\qquad
u\pm iv=\mathcal F_2(f\pm ig).
$$

各ノルム二乗へ Plancherel を適用すると全て $2\pi$ 倍されるので、共通因子を外して

$$
\langle\mathcal F_2f,\mathcal F_2g\rangle
=2\pi\langle f,g\rangle
$$

を得ます。
<!-- solution-end -->

## FOU4-A04 平行移動・変調と $L^2$ ノルム

- Level: A
- 目安時間: 12分

$f\in L^2$ とし

$$
g(x)=e^{ibx}f(x-a)
$$

とする。$\mathcal F_2g$ を $\mathcal F_2f$ で表し、$\|g\|_2=\|f\|_2$ と $\|\mathcal F_2g\|_2=\|\mathcal F_2f\|_2$ を確認せよ。

<!-- solution-start -->
### 詳細解答

まず $h=\tau_af$ とすると

$$
\mathcal F_2h(\eta)=e^{-ia\eta}\mathcal F_2f(\eta).
$$

変調則から

$$
\mathcal F_2g(\xi)
=\mathcal F_2h(\xi-b)
=e^{-ia(\xi-b)}\mathcal F_2f(\xi-b).
$$

従って

$$
\boxed{
\mathcal F_2g(\xi)
=e^{-ia(\xi-b)}\mathcal F_2f(\xi-b)
}.
$$

空間側では $|e^{ibx}|=1$ と変数変換から $\|g\|_2=\|f\|_2$ です。周波数側でも位相因子の絶対値は1、平行移動は $L^2$ ノルムを保つので

$$
\|\mathcal F_2g\|_2
=\|\mathcal F_2f\|_2.
$$
<!-- solution-end -->

## FOU4-B01 core 上の Plancherel を再構成する

- Level: B
- 目安時間: 22分

$g\in\mathcal G$ とし $g^\sharp(x)=\overline{g(-x)}$、$r=g*g^\sharp$ と置く。

1. $r(0)=\|g\|_2^2$ を示せ。
2. $\widehat r=|\widehat g|^2$ を示せ。
3. Fourier 反転を $r$ に適用できる条件を一つずつ確認し、Plancherel を導け。

<!-- solution-start -->
### 詳細解答

まず

$$
\begin{aligned}
r(0)
&=\int g(-y)g^\sharp(y)dy\\
&=\int g(-y)\overline{g(-y)}dy\\
&=\|g\|_2^2.
\end{aligned}
$$

次に変数変換から

$$
\widehat{g^\sharp}(\xi)
=\overline{\widehat g(\xi)}.
$$

$g,g^\sharp\in L^1$ なので FOU3 の畳み込み定理が使え、

$$
\widehat r(\xi)
=\widehat g(\xi)\widehat{g^\sharp}(\xi)
=|\widehat g(\xi)|^2.
$$

core の構成から $g\in L^1$、$\widehat g\in L^1\cap L^2$ です。従って $r=g*g^\sharp\in L^1$、畳み込みは連続、さらに

$$
\widehat r=|\widehat g|^2\in L^1.
$$

よって FOU3 の反転定理を $r$ の $x=0$ に適用でき、

$$
\|g\|_2^2
=r(0)
=\frac1{2\pi}\int|\widehat g(\xi)|^2d\xi.
$$

すなわち

$$
\boxed{\|\widehat g\|_2^2=2\pi\|g\|_2^2}.
$$
<!-- solution-end -->

## FOU4-B02 区間指示関数から sinc 二乗積分

- Level: B
- 目安時間: 18分

$f=1_{[-1/2,1/2]}$ とする。FOU3 の変換公式と Plancherel を用いて

$$
\int_{-\infty}^{\infty}
\left(\frac{\sin u}{u}\right)^2du
$$

を求めよ。FOU3-C01 の反転による解法との違いも一文で説明せよ。

<!-- solution-start -->
### 詳細解答

FOU3 から

$$
\widehat f(\xi)
=\frac{2\sin(\xi/2)}{\xi}.
$$

また $\|f\|_2^2=1$ です。Plancherel より

$$
\int_{\mathbb R}
\left(\frac{2\sin(\xi/2)}{\xi}\right)^2d\xi
=2\pi.
$$

$u=\xi/2$ と置くと

$$
2\int_{\mathbb R}
\left(\frac{\sin u}{u}\right)^2du
=2\pi.
$$

従って

$$
\boxed{
\int_{\mathbb R}
\left(\frac{\sin u}{u}\right)^2du=\pi
}.
$$

FOU3 では三角形関数の Fourier 反転を経由しましたが、FOU4 では区間指示関数の $L^2$ エネルギー保存から直接求めています。
<!-- solution-end -->

## FOU4-B03 $L^1$--$L^2$ 畳み込み

- Level: B
- 目安時間: 22分

$k\in L^1$、$f\in L^2$ とする。

1. Minkowski の積分不等式から $\|k*f\|_2\le\|k\|_1\|f\|_2$ を導け。
2. $g_n\in\mathcal G$、$g_n\to f$ in $L^2$ を用い、

$$
\mathcal F_2(k*f)=\widehat k\,\mathcal F_2f
$$

を証明せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
(k*f)(x)=\int k(y)f(x-y)dy
$$

と書き、Minkowski を使うと

$$
\begin{aligned}
\|k*f\|_2
&\le\int|k(y)|
\|f(\,\cdot-y)\|_2dy\\
&=\int|k(y)|\|f\|_2dy\\
&=\|k\|_1\|f\|_2.
\end{aligned}
$$

次に $g_n\to f$ in $L^2$ とします。上の評価から

$$
\|k*g_n-k*f\|_2
\le\|k\|_1\|g_n-f\|_2\to0.
$$

$g_n\in L^1$ なので $k*g_n\in L^1\cap L^2$ です。FOU3 の畳み込み定理と本章の整合性により

$$
\mathcal F_2(k*g_n)
=\widehat k\,\widehat g_n.
$$

また $|\widehat k|\le\|k\|_1$ だから

$$
\|\widehat k(\widehat g_n-\mathcal F_2f)\|_2
\le\|k\|_1
\|\widehat g_n-\mathcal F_2f\|_2\to0.
$$

左辺・右辺をそれぞれ $L^2$ で極限へ送れば

$$
\boxed{
\mathcal F_2(k*f)=\widehat k\,\mathcal F_2f
}
$$

を得ます。
<!-- solution-end -->

## FOU4-C01 $L^2$ 反転を core から再構成する

- Level: C
- 目安時間: 35分

正規化作用素

$$
U=(2\pi)^{-1/2}\mathcal F_2
$$

を考える。次を順に示せ。

1. $g\in\mathcal G$ なら $U^2g=Jg$、ただし $(Jg)(x)=g(-x)$。
2. $\mathcal G$ の稠密性と $U,J$ の連続性から $U^2=J$ を全 $L^2$ へ延長せよ。
3. $U^4=I$ を示し、これから $U$ が全射であることを示せ。
4. Parseval と合わせて $U$ が unitary であることを説明せよ。
5. $\mathcal F_2^{-1}=(2\pi)^{-1}J\mathcal F_2$ を導け。

<!-- solution-start -->
### 詳細解答

$g\in\mathcal G$ なら $g\in L^1$、$\widehat g\in L^1$ で $g$ は連続です。FOU3 の反転公式を $-x$ で書くと

$$
g(-x)
=\frac1{2\pi}
\int\widehat g(\xi)e^{-i\xi x}d\xi
=\frac1{2\pi}\widehat{\widehat g}(x).
$$

従って

$$
\mathcal F_2^2g=2\pi Jg.
$$

$U=(2\pi)^{-1/2}\mathcal F_2$ なので

$$
U^2g=Jg
\qquad(g\in\mathcal G).
$$

次に任意の $f\in L^2$ を取り、$g_n\in\mathcal G$、$g_n\to f$ とします。$U$ は等長、$J$ も等長なので

$$
U^2g_n\to U^2f,
\qquad
Jg_n\to Jf.
$$

各 $n$ で $U^2g_n=Jg_n$ だから極限も等しく、

$$
U^2f=Jf.
$$

従って全 $L^2$ で $U^2=J$ です。$J^2=I$ なので

$$
U^4=J^2=I.
$$

任意の $h\in L^2$ に対し

$$
h=U(U^3h)
$$

と書けるため、$U$ は全射です。等長性から単射でもあります。Parseval から $U$ は内積を保つので、全射等長線形作用素として unitary です。従って $\mathcal F_2$ も全単射です。

最後に

$$
A:=\frac1{2\pi}J\mathcal F_2
$$

と置くと

$$
A\mathcal F_2
=\frac1{2\pi}J\mathcal F_2^2
=J^2
=I.
$$

$\mathcal F_2$ はすでに全単射なので、左逆 $A$ は逆作用素に一致します。従って

$$
\boxed{
\mathcal F_2^{-1}
=\frac1{2\pi}J\mathcal F_2
}.
$$

この証明の核心は、FOU3 の pointwise 反転を稠密な線形 core 上だけで使い、最後は $L^2$ 連続性で全空間へ運ぶことです。
<!-- solution-end -->

---

# 章末チェック

- 一般の $L^2$ 関数で Fourier 積分を各 $\xi$ ごとの絶対収束として定義してはいけない理由を説明できるか。
- $C_c$ 稠密性から $L^2$ 平行移動連続性を証明できるか。
- Gaussian approximate identity の $L^2$ 収束で、近傍と遠方をどう分けるか説明できるか。
- $\mathcal G$ を単なる Gaussian 正則化の集合ではなく、その有限線形結合全体として取る理由を説明できるか。
- Gaussian 正則化が $g,\widehat g$ の双方に必要な可積分性を与える理由を説明できるか。
- $g*g^\sharp$ に FOU3 の反転定理を適用して core 上の Plancherel を再構成できるか。
- Plancherel が近似列の Fourier 側を Cauchy にする仕組みを説明できるか。
- $L^2$ の完備性がどの一行で必要になるか指摘できるか。
- $L^1\cap L^2$ 上で古典 Fourier 変換と $L^2$ Fourier 変換が一致する理由を説明できるか。
- Parseval と正規化 $U=(2\pi)^{-1/2}\mathcal F_2$ の関係を説明できるか。
- $U^2=J$ から全射性と反転公式を導けるか。
- $L^1$--$L^2$ 畳み込みを密度で Fourier 側へ移せるか。
- 複素解析が Fourier 解析の全面的 prerequisite ではなく、関数解析が FOU4 から部分的に本質化する理由を説明できるか。

次の FOU5 では、この Fourier 変換を確率の特性関数、独立和と畳み込み、DFT・信号処理へ接続します。
