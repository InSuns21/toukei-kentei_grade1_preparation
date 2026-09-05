# F0-00FA1 Encore II：Fourier級数・直交展開

周期関数を sin・cos へ分解する Fourier 級数を、単なる係数公式ではなく **Hilbert 空間の正規直交展開**として読みます。

この章の主題は一つです。

> なぜ三角関数を並べるだけで、任意の $L^2$ 周期関数を近似できるのか。

直交性だけでは Bessel 不等式までしか出ません。Parseval 等式と $L^2$ 収束には、三角関数系が **complete** であることが必要です。ここでは Fejér kernel を使って、その床板まで証明します。

---

## 1. 複素 Fourier 係数

$2\pi$ 周期関数を $(-\pi,\pi)$ 上で考えます。有限区間なので $L^2(-\pi,\pi)\subset L^1(-\pi,\pi)$ であり、Fourier 係数の積分は定義できます。

<a id="def-f0-00fa1-fourier-coefficient"></a>

<!-- formal-statement-start -->
> **定義（複素 Fourier 係数）**  
> $f\in L^2(-\pi,\pi)$ に対し、$n\in\mathbb Z$ 番目の複素 Fourier 係数を
>
> $$
> c_n(f)
> :=\frac1{2\pi}\int_{-\pi}^{\pi}f(x)e^{-inx}\,dx
> $$
>
> と定義します。
<!-- formal-statement-end -->

### 1.1 例：$1+2\cos x$

$f(x)=1+2\cos x=1+e^{ix}+e^{-ix}$ とします。

<!-- definition-example-start: def-f0-00fa1-fourier-coefficient -->
**定義の確認**  
指数関数の直交性

$$
\int_{-\pi}^{\pi}e^{i(k-n)x}\,dx
=
\begin{cases}
2\pi,&k=n,\\
0,&k\ne n
\end{cases}
$$

から

$$
c_0=1,\qquad c_1=c_{-1}=1,\qquad c_n=0\ (|n|\ge2).
$$

実際に定義積分へ代入して、各周波数の係数が一つずつ取り出されています。
<!-- definition-example-end -->

実係数との関係は

$$
f(x)\sim \frac{a_0}{2}+\sum_{n\ge1}(a_n\cos nx+b_n\sin nx)
$$

に対して

$$
c_0=\frac{a_0}{2},\qquad
c_n=\frac{a_n-ib_n}{2},\qquad
c_{-n}=\frac{a_n+ib_n}{2}.
$$

です。

---

## 2. Fourier 部分和

<a id="def-f0-00fa1-partial-sum"></a>

<!-- formal-statement-start -->
> **定義（Fourier 部分和）**  
> $f\in L^2(-\pi,\pi)$ の複素 Fourier 係数を $c_n(f)$ とするとき、$N$ 次 Fourier 部分和を
>
> $$
> S_Nf(x):=\sum_{|n|\le N}c_n(f)e^{inx}
> $$
>
> と定義します。
<!-- formal-statement-end -->

### 2.1 例：有限 Fourier 多項式なら途中で完全に戻る

先ほどの $f(x)=1+2\cos x$ では $c_n=0$ for $|n|\ge2$ です。

<!-- definition-example-start: def-f0-00fa1-partial-sum -->
**定義の確認**  
$N=1$ とすると

$$
S_1f(x)=1+e^{ix}+e^{-ix}=1+2\cos x=f(x).
$$

したがって有限個の周波数しか持たない関数では、十分大きい部分和が元の関数そのものになります。
<!-- definition-example-end -->

---

## 3. まず直交性：Bessel 不等式まではすぐ出る

正規化した指数関数

$$
e_n(x):=\frac{e^{inx}}{\sqrt{2\pi}},\qquad n\in\mathbb Z
$$

は $L^2(-\pi,\pi)$ の正規直交系です。

<a id="thm-f0-00fa1-bessel"></a>

<!-- formal-statement-start -->
> **定理（Fourier 係数に対する Bessel 不等式）**  
> $f\in L^2(-\pi,\pi)$ に対して
>
> $$
> \boxed{
> 2\pi\sum_{n\in\mathbb Z}|c_n(f)|^2
> \le \|f\|_2^2
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：有限個の直交射影を引く

任意の $N$ について $S_Nf$ は $\operatorname{span}\{e_n:|n|\le N\}$ への直交射影です。したがって

$$
f=S_Nf+(f-S_Nf),
\qquad
S_Nf\perp(f-S_Nf).
$$

Pythagoras より

$$
\|f\|_2^2
=\|S_Nf\|_2^2+\|f-S_Nf\|_2^2
\ge \|S_Nf\|_2^2.
$$

直交性から

$$
\|S_Nf\|_2^2
=2\pi\sum_{|n|\le N}|c_n(f)|^2.
$$

$N\to\infty$ とすれば主張を得ます。
<!-- proof-end -->

しかし、ここではまだ等号とは限りません。正規直交系の張る閉部分空間の外側に、見えない成分が残っている可能性があるからです。

---

## 4. Fejér kernel

完全性を示すため、Fourier 部分和そのものではなく **Cesàro 平均**を使います。

<a id="def-f0-00fa1-fejer-kernel"></a>

<!-- formal-statement-start -->
> **定義（Fejér kernel）**  
> $N\ge0$ に対し
>
> $$
> K_N(t)
> :=\frac1{N+1}\left|\sum_{k=0}^{N}e^{ikt}\right|^2
> $$
>
> を Fejér kernel と呼びます。
<!-- formal-statement-end -->

有限等比級数を整理すると

$$
K_N(t)
=\frac1{N+1}
\left(\frac{\sin((N+1)t/2)}{\sin(t/2)}\right)^2
$$

であり、また

$$
K_N(t)
=\sum_{|n|\le N}
\left(1-\frac{|n|}{N+1}\right)e^{int}.
$$

特に

$$
K_N(t)\ge0,
\qquad
\frac1{2\pi}\int_{-\pi}^{\pi}K_N(t)dt=1.
$$

### 4.1 例：$N=1$

<!-- definition-example-start: def-f0-00fa1-fejer-kernel -->
**定義の確認**  
$N=1$ なら

$$
K_1(t)=\frac12|1+e^{it}|^2=1+\cos t.
$$

確かに $K_1(t)\ge0$ で

$$
\frac1{2\pi}\int_{-\pi}^{\pi}(1+\cos t)dt=1.
$$

したがって $K_N/(2\pi)$ は「原点付近へ質量を集める確率密度」のように振る舞います。
<!-- definition-example-end -->

---

## 5. 平行移動は $L^2$ で連続

$2\pi$ 周期延長を用い

$$
(\tau_tf)(x):=f(x-t)
$$

と書きます。

<a id="lem-f0-00fa1-translation-continuity"></a>

<!-- formal-statement-start -->
> **補題（$L^2$ の平行移動連続性）**  
> 任意の $f\in L^2(-\pi,\pi)$ について
>
> $$
> \boxed{\|\tau_tf-f\|_2\to0\qquad(t\to0)}
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：まず指示関数、次に単関数、最後に一般の $L^2$

可測集合 $E\subset(-\pi,\pi)$ を考えます。Lebesgue 外測度の定義から、任意の $\varepsilon>0$ に対して $E$ を含む開集合 $O$ を

$$
\lambda(O\setminus E)<\varepsilon
$$

となるよう取れます。開集合 $O$ は可算個の互いに素な開区間の和です。有限測度なので、そのうち有限個の和 $U$ を選んで

$$
\lambda(O\setminus U)<\varepsilon
$$

とできます。従って

$$
\lambda(E\triangle U)<2\varepsilon.
$$

$U$ が $m$ 個の区間の有限和なら、端点を $t$ だけ動かすことで

$$
\lambda((U+t)\triangle U)\le2m|t|.
$$

また平行移動不変性から

$$
\lambda((E+t)\triangle E)
\le2\lambda(E\triangle U)+\lambda((U+t)\triangle U).
$$

よって $t\to0$ として

$$
\lambda((E+t)\triangle E)\to0.
$$

ところが

$$
\|\tau_t1_E-1_E\|_2^2
=\lambda((E+t)\triangle E),
$$

なので指示関数では主張が従います。有限線形結合である単関数にも従います。

最後に任意の $f\in L^2$ を単関数 $s$ で $\|f-s\|_2<\varepsilon$ と近似します。平行移動は $L^2$ ノルムを保存するので

$$
\|\tau_tf-f\|_2
\le2\|f-s\|_2+\|\tau_ts-s\|_2.
$$

$t\to0$ の後 $\varepsilon\downarrow0$ とすれば主張を得ます。
<!-- proof-end -->

---

## 6. Fejér 平均は任意の $L^2$ 関数へ戻る

Fejér 平均を

$$
\sigma_Nf(x)
:=\frac1{2\pi}\int_{-\pi}^{\pi}K_N(t)f(x-t)dt
$$

と置きます。$K_N$ の有限 Fourier 展開から

$$
\sigma_Nf(x)
=
\sum_{|n|\le N}
\left(1-\frac{|n|}{N+1}\right)c_n(f)e^{inx}
$$

であり、これは三角多項式です。

<a id="thm-f0-00fa1-fejer-l2"></a>

<!-- formal-statement-start -->
> **定理（Fejér 平均の $L^2$ 収束）**  
> 任意の $f\in L^2(-\pi,\pi)$ について
>
> $$
> \boxed{\|\sigma_Nf-f\|_2\to0}
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：近い平行移動と遠い平行移動を分ける

$k_N(t)=K_N(t)/(2\pi)$ と置くと $k_N\ge0$ かつ $\int k_N=1$ です。Cauchy--Schwarz により各 $x$ で

$$
\left|\int k_N(t)(f(x-t)-f(x))dt\right|^2
\le
\int k_N(t)|f(x-t)-f(x)|^2dt.
$$

非負関数の積分順序を交換して

$$
\|\sigma_Nf-f\|_2^2
\le
\int_{-\pi}^{\pi}k_N(t)\|\tau_tf-f\|_2^2dt.
$$

任意の $\varepsilon>0$ に対し、前節の補題から $|t|<\delta$ なら

$$
\|\tau_tf-f\|_2^2<\varepsilon
$$

となる $\delta>0$ を取れます。

一方 $\delta\le|t|\le\pi$ では $|\sin(t/2)|$ が正の下限を持つため

$$
K_N(t)
\le\frac{C_\delta}{N+1}.
$$

従って

$$
\int_{|t|\ge\delta}k_N(t)dt\to0.
$$

また常に $\|\tau_tf-f\|_2\le2\|f\|_2$ です。よって

$$
\begin{aligned}
\|\sigma_Nf-f\|_2^2
&\le
\varepsilon\int_{|t|<\delta}k_N(t)dt
+4\|f\|_2^2\int_{|t|\ge\delta}k_N(t)dt\\
&\longrightarrow \varepsilon.
\end{aligned}
$$

$\varepsilon$ は任意なので極限は0です。
<!-- proof-end -->

---

## 7. 三角関数系の完全性

<a id="thm-f0-00fa1-completeness"></a>

<!-- formal-statement-start -->
> **定理（三角関数系の $L^2$ 完全性）**  
> $\{e^{inx}:n\in\mathbb Z\}$ の線形包の $L^2(-\pi,\pi)$ における閉包は $L^2(-\pi,\pi)$ 全体です。すなわち三角多項式は $L^2$ に稠密です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：Fejér 平均そのものが三角多項式近似

任意の $f\in L^2(-\pi,\pi)$ に対し、$\sigma_Nf$ は有限個の $e^{inx}$ の線形結合です。しかも前節から

$$
\|\sigma_Nf-f\|_2\to0.
$$

従って任意の $f$ が三角多項式の $L^2$ 極限として表され、閉包は $L^2$ 全体です。
<!-- proof-end -->

これで「三角関数系は直交している」から「三角関数系は基底として十分である」へ進みました。

---

## 8. Parseval 等式と Fourier 部分和の $L^2$ 収束

<a id="cor-f0-00fa1-parseval"></a>

<!-- formal-statement-start -->
> **系（Parseval 等式）**  
> 任意の $f\in L^2(-\pi,\pi)$ について
>
> $$
> \boxed{
> \|f\|_2^2
> =2\pi\sum_{n\in\mathbb Z}|c_n(f)|^2
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：完全な正規直交系では Bessel の不足分が消える

$S_Nf$ は $|n|\le N$ の指数関数が張る部分空間への直交射影です。完全性から、その部分空間の増大列の和集合は $L^2$ に稠密なので

$$
\|f-S_Nf\|_2\to0.
$$

Pythagoras の恒等式

$$
\|f\|_2^2
=2\pi\sum_{|n|\le N}|c_n(f)|^2+\|f-S_Nf\|_2^2
$$

で $N\to\infty$ とすれば Parseval 等式を得ます。
<!-- proof-end -->

<a id="cor-f0-00fa1-l2-convergence"></a>

<!-- formal-statement-start -->
> **系（Fourier 部分和の $L^2$ 収束）**  
> 任意の $f\in L^2(-\pi,\pi)$ について
>
> $$
> \boxed{\|S_Nf-f\|_2\to0}
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

これは **各点収束とは別物**です。不連続点での値や Gibbs 現象を論じるには、別の収束理論が必要です。ここで保証したのは平均二乗誤差の収束です。

---

## 9. 例：$f(x)=x$ と Basel 和

$f(x)=x$ を $(-\pi,\pi)$ 上で考え、$2\pi$ 周期に延長します。奇関数なので cosine 係数は0で、部分積分から

$$
b_n=2\frac{(-1)^{n+1}}n.
$$

したがって

$$
x\sim2\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}n\sin(nx)
$$

です。

Parseval 等式を実形式で使うと

$$
\frac1\pi\int_{-\pi}^{\pi}x^2dx
=\sum_{n=1}^{\infty}b_n^2.
$$

左辺は $2\pi^2/3$、右辺は $4\sum_{n\ge1}n^{-2}$ なので

$$
\boxed{\sum_{n=1}^{\infty}\frac1{n^2}=\frac{\pi^2}{6}}.
$$

完全性を証明したことで、この計算の Parseval 使用も論理的に閉じました。

---

## 10. 微分作用素との接続

$$
-\frac{d^2}{dx^2}e^{inx}=n^2e^{inx}.
$$

したがって Fourier 級数は、周期境界条件の下で微分作用素を固有関数展開していると読めます。後の Sturm--Liouville 理論では、この構造を一般の固有関数系へ拡張します。

---

# 演習

## F0-00FA1-A01 Fourier 係数を直接読む

- Level: A
- 目安時間: 8分

$$
f(x)=2+3\cos2x-4\sin3x
$$

の実 Fourier 係数を求めよ。

<!-- solution-start -->
### 詳細解答

定数項 $a_0/2=2$ より $a_0=4$。また cosine の2次係数が3、sine の3次係数が $-4$ なので

$$
a_2=3,\qquad b_3=-4,
$$

その他は0です。

### 本番答案

$$
a_0=4,\quad a_2=3,\quad b_3=-4,
$$

その他は0。

### 採点基準（20点）

- 定数項: 6点
- cosine 項: 7点
- sine 項: 7点
<!-- solution-end -->

## F0-00FA1-A02 $K_1$ を確認する

- Level: A
- 目安時間: 8分

Fejér kernel の定義から $K_1(t)$ を求め、非負性と積分が $2\pi$ であることを確認せよ。

<!-- solution-start -->
### 詳細解答

$$
K_1(t)=\frac12|1+e^{it}|^2=1+\cos t=2\cos^2(t/2)\ge0.
$$

また

$$
\int_{-\pi}^{\pi}K_1(t)dt=2\pi.
$$

### 本番答案

$K_1=1+\cos t=2\cos^2(t/2)\ge0$、積分は $2\pi$。

### 採点基準（20点）

- 展開: 8点
- 非負性: 6点
- 積分: 6点
<!-- solution-end -->

## F0-00FA1-B01 Fourier 係数が全部0なら関数は0か

- Level: B
- 目安時間: 12分

$f\in L^2(-\pi,\pi)$ が $c_n(f)=0$ for all $n\in\mathbb Z$ を満たすとする。$f=0$ a.e. を示せ。

<!-- solution-start -->
### 詳細解答

全係数が0なら全ての Fourier 部分和は $S_Nf=0$。一方、完全性から $\|S_Nf-f\|_2\to0$。従って $\|f\|_2=0$ であり $f=0$ a.e. です。

### 本番答案

完全性より $S_Nf\to f$ in $L^2$。しかし $c_n=0$ なので $S_Nf\equiv0$。よって $\|f\|_2=0$。

### 採点基準（20点）

- $S_Nf=0$: 6点
- 完全性の使用: 8点
- a.e. 結論: 6点
<!-- solution-end -->

## F0-00FA1-B02 Parseval から Basel 和

- Level: B
- 目安時間: 18分

$f(x)=x$ の Fourier 係数を使って $\sum_{n\ge1}n^{-2}=\pi^2/6$ を導け。

<!-- solution-start -->
### 詳細解答

$b_n=2(-1)^{n+1}/n$、$a_n=0$。Parseval より

$$
\frac1\pi\int_{-\pi}^{\pi}x^2dx
=4\sum_{n=1}^{\infty}\frac1{n^2}.
$$

左辺は $2\pi^2/3$ なので

$$
\sum_{n=1}^{\infty}\frac1{n^2}=\frac{\pi^2}{6}.
$$

### 本番答案

$b_n=2(-1)^{n+1}/n$ を Parseval に代入し、$2\pi^2/3=4\sum n^{-2}$。

### 採点基準（20点）

- 係数: 7点
- Parseval: 8点
- 整理: 5点
<!-- solution-end -->

## F0-00FA1-B03 部分和誤差を係数の尾で表す

- Level: B
- 目安時間: 12分

$f\in L^2(-\pi,\pi)$ に対し

$$
\|f-S_Nf\|_2^2
=2\pi\sum_{|n|>N}|c_n(f)|^2
$$

を示せ。

<!-- solution-start -->
### 詳細解答

Parseval から

$$
\|f\|_2^2=2\pi\sum_{n\in\mathbb Z}|c_n|^2.
$$

一方 $S_Nf$ は直交射影なので

$$
\|f-S_Nf\|_2^2
=\|f\|_2^2-\|S_Nf\|_2^2
$$

であり

$$
\|S_Nf\|_2^2=2\pi\sum_{|n|\le N}|c_n|^2.
$$

差を取ればよいです。

### 本番答案

Pythagoras と Parseval を組み合わせて係数二乗和の有限部分を引く。

### 採点基準（20点）

- 直交射影: 7点
- Parseval: 7点
- 尾和への整理: 6点
<!-- solution-end -->

---

## 章末チェック

- Fourier 係数を内積として定義できる。
- Bessel 不等式と Parseval 等式の違いを「完全性の有無」で説明できる。
- Fejér kernel が非負・積分1の近似恒等作用素を作ることを説明できる。
- 三角多項式が $L^2(-\pi,\pi)$ に稠密であることを証明できる。
- Fourier 部分和の $L^2$ 収束を完全性から導ける。

次は [F0-00FA2 Fourier変換・畳み込み・反転](../F0_00FA2_Fourier変換_畳み込み_反転/index.md) で、離散周波数 $n\in\mathbb Z$ を連続周波数 $\xi\in\mathbb R$ へ広げます。
