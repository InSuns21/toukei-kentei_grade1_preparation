# FOU5 Fourier解析の橋：確率・離散信号・サンプリング

FOU1～FOU4 では、周期関数の Fourier 級数から始めて、実数直線上の Fourier 変換、反転、Plancherel、$L^2$ Fourier 解析まで進みました。本章では、その構造を確率分布と有限離散信号へ接続します。

```text
連続Fourier解析
      │
      ├── 確率分布 ── 特性関数 ── 独立和・中心極限定理
      │
      └── 標本列 ── 離散Fourier変換 ── 巡回畳み込み・高速計算・エイリアシング
```

確率側では、すでに [特性関数](../F0_00P6_特性関数_中心極限定理/index.md#def-f0-00p6-characteristic-function) と [独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) が正本として証明済みです。本章ではそれらを重複証明せず、特性関数を確率測度の Fourier 変換として読み直し、独立和・畳み込み・Fourier 積の対応を閉じます。

信号処理側では、離散 Fourier 変換を定義だけで済ませません。$1$ の $N$ 乗根の直交性から反転公式と Parseval 等式を導き、巡回畳み込みが周波数ごとの積へ変わることを証明します。そのうえで高速 Fourier 変換が「別の変換」ではなく同じ変換を速く計算するアルゴリズムであること、等間隔標本化では異なる連続周波数が同じ標本列へ潰れることを式で確認します。

> **証明境界**  
> Shannon の標本化定理、Poisson 和公式、Schwartz 空間、緩増加超関数は本章の証明依存には入れません。エイリアシングは「純粋な複素指数波を等間隔で標本化すると何が区別不能になるか」という有限計算で閉じます。

---

## 1. 確率分布そのものを Fourier 変換する

FOU3 では $f\in L^1(\mathbb R)$ に対し

$$
\widehat f(\xi)=\int_{\mathbb R}f(x)e^{-i\xi x}\,dx
$$

と定義しました。しかし確率分布は密度を持つとは限りません。そこで関数ではなく有限測度を直接変換します。

<a id="def-fou5-measure-transform"></a>
<!-- formal-statement-start -->
> **定義（有限測度の Fourier 変換）**  
> $\mu$ を $\mathbb R$ 上の有限 Borel 測度、すなわち $\mu(\mathbb R)<\infty$ とする。$\mu$ の Fourier 変換を
>
$$
\boxed{\widehat\mu(\xi):=\int_{\mathbb R}e^{-i\xi x}\,d\mu(x)}
\qquad(\xi\in\mathbb R)
$$
>
> と定める。
<!-- formal-statement-end -->

$|e^{-i\xi x}|=1$ なので

$$
\int_{\mathbb R}|e^{-i\xi x}|\,d\mu(x)=\mu(\mathbb R)<\infty.
$$

したがって全ての $\xi$ で積分が存在します。確率測度なら全質量は1です。

<!-- definition-example-start: def-fou5-measure-transform -->
**定義の確認**

**二点分布**

$a,b\in\mathbb R$、$0\le p\le1$ とし、$\mu(\{a\})=p$、$\mu(\{b\})=1-p$、それ以外に質量を持たないとします。有限和として

$$
\widehat\mu(\xi)=pe^{-i\xi a}+(1-p)e^{-i\xi b}.
$$

密度関数を書けない離散分布でも、測度としてなら同じ Fourier 積分で扱えます。
<!-- definition-example-end -->

---

## 2. 特性関数は確率測度の Fourier 変換である

実確率変数 $X$ の分布を $\mu_X$ とします。確率論側の特性関数は

$$
\varphi_X(t)=E[e^{itX}]
$$

です。一方、本系列の Fourier 変換は指数に $e^{-i\xi x}$ を使うため、符号を合わせる必要があります。

<a id="prop-fou5-characteristic-measure-transform"></a>
<!-- formal-statement-start -->
> **命題（確率分布の Fourier 変換と特性関数の対応）**  
> 実確率変数 $X$ の分布を $\mu_X$ とする。このとき全ての $t\in\mathbb R$ について
>
$$
\boxed{\varphi_X(t)=\widehat{\mu_X}(-t)}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

分布に関する積分を、押し出し積分公式で $X$ の関数の期待値へ移します。複素値関数そのものを黒箱で使わず、実部と虚部へ分けます。

<!-- proof-start -->
### 証明

[押し出し積分公式](../F0_00P3D_pushforward_LOTUS_Doob_Dynkin/index.md#thm-f0-00p3d-pushforward-integration)を $g(x)=\cos(tx)$ と $g(x)=\sin(tx)$ にそれぞれ適用し、実部と虚部を合わせると

$$
\int_{\mathbb R}e^{itx}\,d\mu_X(x)=E[e^{itX}].
$$

従って

$$
\begin{aligned}
\widehat{\mu_X}(-t)
&=\int_{\mathbb R}e^{-i(-t)x}\,d\mu_X(x)\\
&=\int_{\mathbb R}e^{itx}\,d\mu_X(x)\\
&=E[e^{itX}]\\
&=\varphi_X(t).
\end{aligned}
$$
<!-- proof-end -->

### Bernoulli 分布で符号を確かめる

$P(X=1)=p$、$P(X=0)=1-p$ なら

$$
\widehat{\mu_X}(\xi)=1-p+pe^{-i\xi},
$$

したがって

$$
\widehat{\mu_X}(-t)=1-p+pe^{it}=\varphi_X(t).
$$

文献が $e^{+i\xi x}$ を Fourier 変換の規約に採る場合は符号反転なしで一致します。本教材では FOU3 から $e^{-i\xi x}$ を固定しているため、$\varphi_X(t)=\widehat{\mu_X}(-t)$ です。

---

## 3. 独立和・畳み込み・中心極限定理を Fourier の言葉で読む

密度の存在を仮定せず、確率測度どうしを直接畳み込みます。

<a id="def-fou5-probability-convolution"></a>
<!-- formal-statement-start -->
> **定義（確率測度の畳み込み）**  
> $\mu,\nu$ を $\mathbb R$ 上の確率測度とする。Borel 集合 $A\subset\mathbb R$ に対して
>
$$
\boxed{
(\mu*\nu)(A)
:=
(\mu\otimes\nu)\bigl(\{(x,y)\in\mathbb R^2:x+y\in A\}\bigr)
}
$$
>
> と定め、この確率測度 $\mu*\nu$ を $\mu$ と $\nu$ の **畳み込み** という。これは積測度 $\mu\otimes\nu$ を加法写像 $S(x,y)=x+y$ で押し出した測度である。
<!-- formal-statement-end -->

$S$ は連続なので Borel 可測であり、

$$
(\mu*\nu)(\mathbb R)=(\mu\otimes\nu)(\mathbb R^2)=1.
$$

<!-- definition-example-start: def-fou5-probability-convolution -->
**定義の確認**

**二つの Bernoulli 分布**

$\mu$ が $0,1$ に質量 $1-p,p$、$\nu$ が $0,1$ に質量 $1-q,q$ を持つとします。積測度で和の値ごとの質量を数えると

$$
\begin{aligned}
(\mu*\nu)(\{0\})&=(1-p)(1-q),\\
(\mu*\nu)(\{1\})&=p(1-q)+(1-p)q,\\
(\mu*\nu)(\{2\})&=pq.
\end{aligned}
$$

三つの和は1で、独立な Bernoulli 変数の和の分布そのものです。
<!-- definition-example-end -->

<a id="prop-fou5-independent-sum-convolution"></a>
<!-- formal-statement-start -->
> **命題（独立和・畳み込み・Fourier積）**  
> 実確率変数 $X,Y$ が独立で、その分布を $\mu_X,\mu_Y$ とする。このとき
>
$$
\boxed{\mu_{X+Y}=\mu_X*\mu_Y}
$$
>
> であり、全ての $\xi\in\mathbb R$ について
>
$$
\boxed{
\widehat{\mu_{X+Y}}(\xi)
=\widehat{\mu_X}(\xi)\widehat{\mu_Y}(\xi)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

独立性により $(X,Y)$ の同時分布は積測度です。加法写像で押し出せば和の分布になり、指数関数は $e^{-i\xi(x+y)}=e^{-i\xi x}e^{-i\xi y}$ と分離します。

<!-- proof-start -->
### 証明

[独立性と積測度の同値](../F0_00P3_独立_積測度_条件付き期待値/index.md#thm-f0-00p3-independence-product-law)から

$$
\mu_{X,Y}=\mu_X\otimes\mu_Y.
$$

任意の Borel 集合 $A$ に対して

$$
\begin{aligned}
\mu_{X+Y}(A)
&=P(X+Y\in A)\\
&=\mu_{X,Y}(\{(x,y):x+y\in A\})\\
&=(\mu_X\otimes\mu_Y)(\{(x,y):x+y\in A\})\\
&=(\mu_X*\mu_Y)(A).
\end{aligned}
$$

従って $\mu_{X+Y}=\mu_X*\mu_Y$ です。

次に [押し出し積分公式](../F0_00P3D_pushforward_LOTUS_Doob_Dynkin/index.md#thm-f0-00p3d-pushforward-integration)を実部 $\cos(\xi s)$ と虚部 $-\sin(\xi s)$ に適用して合わせると

$$
\widehat{\mu_{X+Y}}(\xi)
=
\int_{\mathbb R^2}e^{-i\xi(x+y)}\,d(\mu_X\otimes\mu_Y)(x,y).
$$

被積分関数の絶対値は1で、積測度は有限です。したがって実部・虚部にそれぞれ [Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)を適用でき、

$$
\begin{aligned}
\widehat{\mu_{X+Y}}(\xi)
&=
\int\!\int e^{-i\xi x}e^{-i\xi y}\,d\mu_Y(y)\,d\mu_X(x)\\
&=
\left(\int e^{-i\xi x}\,d\mu_X(x)\right)
\left(\int e^{-i\xi y}\,d\mu_Y(y)\right)\\
&=\widehat{\mu_X}(\xi)\widehat{\mu_Y}(\xi).
\end{aligned}
$$
<!-- proof-end -->

$\xi=-t$ とすれば、確率論側の

$$
\varphi_{X+Y}(t)=\varphi_X(t)\varphi_Y(t)
$$

が戻ります。[特性関数の基本性質](../F0_00P6_特性関数_中心極限定理/index.md#prop-f0-00p6-basic-properties) と同じ結論ですが、ここでは「独立和 → 測度の畳み込み → Fourier積」という機構が見えます。

### 3.1 中心極限定理では何が起きていたか

[独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) で、平均0・分散1へ標準化した独立同分布（independent and identically distributed; iid）変数 $Y_j$ と

$$
Z_n=\frac1{\sqrt n}\sum_{j=1}^nY_j
$$

を考えると、$Y_1$ の特性関数 $\varphi$ に対して

$$
\varphi_{Z_n}(t)=\left[\varphi\left(\frac t{\sqrt n}\right)\right]^n.
$$

ここでは

1. 独立和：畳み込みが Fourier 側で積になる。
2. $1/\sqrt n$ 倍：周波数変数が $t/\sqrt n$ へ尺度変換される。
3. 原点近傍：有限分散から $\varphi(u)=1-u^2/2+o(u^2)$ が効く。

という三つが組み合わさり、$n$ 乗後に $e^{-t^2/2}$ が残ります。Lévy 連続性定理や特性関数の一意性は確率論側の正本を使い、本章では重複証明しません。

---

## 4. 有限個の標本を周波数へ分解する：離散 Fourier 変換

$N$ 個の複素数列 $x=(x_0,\dots,x_{N-1})$ を考えます。

<a id="def-fou5-dft"></a>
<!-- formal-statement-start -->
> **定義（離散 Fourier 変換）**  
> 整数 $N\ge1$ と $x\in\mathbb C^N$ に対し
>
$$
\boxed{
X_k:=\sum_{n=0}^{N-1}x_ne^{-2\pi i kn/N}
}
\qquad(k=0,\dots,N-1)
$$
>
> を $x$ の離散 Fourier 変換という。
<!-- formal-statement-end -->

ここで $X_k$ は確率変数ではなく周波数係数です。

<!-- definition-example-start: def-fou5-dft -->
**定義の確認**

**一点だけ1の列**

$$
x=(1,0,\dots,0)
$$

なら全ての $k$ で $X_k=1$、すなわち

$$
X=(1,1,\dots,1).
$$

時間側で一点に集中した列は、全ての離散周波数を同じ大きさで含みます。
<!-- definition-example-end -->

---

## 5. 核心は $1$ の $N$ 乗根の直交性

<a id="lem-fou5-root-orthogonality"></a>
<!-- formal-statement-start -->
> **補題（$1$ の $N$ 乗根の直交性）**  
> 整数 $N\ge1$ と整数 $r$ に対し
>
$$
\boxed{
\sum_{k=0}^{N-1}e^{2\pi i kr/N}
=
\begin{cases}
N,&N\mid r,\\
0,&N\nmid r
\end{cases}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$N\mid r$ なら全項が1です。そうでなければ公比 $q=e^{2\pi ir/N}$ は $q^N=1$ かつ $q\ne1$ なので有限等比級数が消えます。

<!-- proof-start -->
### 証明

$N\mid r$ なら $r=Nm$ と書け、各項は $e^{2\pi ikm}=1$ なので和は $N$ です。

$N\nmid r$ なら $q=e^{2\pi ir/N}$ と置くと $q\ne1$、$q^N=1$ だから

$$
\sum_{k=0}^{N-1}e^{2\pi i kr/N}
=
\sum_{k=0}^{N-1}q^k
=
\frac{1-q^N}{1-q}=0.
$$
<!-- proof-end -->

---

## 6. 離散 Fourier 反転公式

<a id="thm-fou5-dft-inversion"></a>
<!-- formal-statement-start -->
> **定理（離散 Fourier 反転公式）**  
> $x\in\mathbb C^N$ の離散 Fourier 変換を $X_k$ とする。このとき
>
$$
\boxed{
x_n=\frac1N\sum_{k=0}^{N-1}X_ke^{2\pi i kn/N}
}
\qquad(n=0,\dots,N-1)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$X_k$ を代入し、有限和の順序を交換すると根の直交性が現れます。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
\frac1N\sum_{k=0}^{N-1}X_ke^{2\pi i kn/N}
&=
\frac1N\sum_{k=0}^{N-1}
\left(\sum_{m=0}^{N-1}x_me^{-2\pi ikm/N}\right)e^{2\pi ikn/N}\\
&=
\frac1N\sum_{m=0}^{N-1}x_m
\sum_{k=0}^{N-1}e^{2\pi ik(n-m)/N}.
\end{aligned}
$$

全て有限和なので順序交換に収束問題はありません。$0\le n,m\le N-1$ では $N\mid(n-m)$ は $n=m$ と同値です。[根の直交性](#lem-fou5-root-orthogonality)により $m=n$ の項だけが $N$ を残すため、全体は $x_n$ です。
<!-- proof-end -->

### 4点の具体例

$N=4$、$x=(1,0,-1,0)$ なら

$$
X_k=1-e^{-\pi ik}=1-(-1)^k,
$$

したがって

$$
X=(0,2,0,2).
$$

---

## 7. 離散 Parseval 等式

<a id="thm-fou5-dft-parseval"></a>
<!-- formal-statement-start -->
> **定理（離散 Parseval 等式）**  
> $x\in\mathbb C^N$ の離散 Fourier 変換を $X_k$ とする。このとき
>
$$
\boxed{
\sum_{n=0}^{N-1}|x_n|^2
=
\frac1N\sum_{k=0}^{N-1}|X_k|^2
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$|X_k|^2$ を二重和へ展開すると、異なる添字の交差項は根の直交性で消えます。

<!-- proof-start -->
### 証明

$$
X_k=\sum_{n=0}^{N-1}x_ne^{-2\pi ikn/N},
\qquad
\overline{X_k}=\sum_{m=0}^{N-1}\overline{x_m}e^{2\pi ikm/N}.
$$

従って

$$
\begin{aligned}
\sum_{k=0}^{N-1}|X_k|^2
&=
\sum_{n=0}^{N-1}\sum_{m=0}^{N-1}
 x_n\overline{x_m}
 \sum_{k=0}^{N-1}e^{2\pi ik(m-n)/N}\\
&=N\sum_{n=0}^{N-1}|x_n|^2.
\end{aligned}
$$

最後の等号で根の直交性を使いました。両辺を $N$ で割れば主張を得ます。
<!-- proof-end -->

離散 Fourier 変換を $1/\sqrt N$ 倍して正規化すれば、$\mathbb C^N$ の標準内積を保つユニタリ変換になります。FOU4 の正規化 Fourier 作用素と同じ構図です。

---

## 8. 巡回畳み込みは離散 Fourier 変換で積になる

<a id="def-fou5-circular-convolution"></a>
<!-- formal-statement-start -->
> **定義（巡回畳み込み）**  
> $x,y\in\mathbb C^N$ に対し、巡回畳み込み $z=x*_Ny$ を
>
$$
\boxed{
z_n:=\sum_{m=0}^{N-1}x_my_{(n-m)\bmod N}
}
\qquad(n=0,\dots,N-1)
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou5-circular-convolution -->
**定義の確認**

**$N=4$**

$$
x=(1,2,0,0),\qquad y=(1,1,0,0)
$$

なら

$$
\begin{aligned}
z_0&=1,\\
z_1&=1+2=3,\\
z_2&=2,\\
z_3&=0,
\end{aligned}
$$

したがって

$$
x*_4y=(1,3,2,0).
$$

添字は端で切れず、$4$ を法として回り込みます。
<!-- definition-example-end -->

<a id="thm-fou5-circular-convolution"></a>
<!-- formal-statement-start -->
> **定理（巡回畳み込み定理）**  
> $x,y\in\mathbb C^N$、$z=x*_Ny$ とし、$X_k,Y_k,Z_k$ をそれぞれの離散 Fourier 変換とする。このとき
>
$$
\boxed{Z_k=X_kY_k}
\qquad(k=0,\dots,N-1)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$n-m$ を法 $N$ の新しい添字へ置き換えると、有限和が二つの積へ分離します。

<!-- proof-start -->
### 証明

定義から

$$
Z_k
=
\sum_{n=0}^{N-1}\sum_{m=0}^{N-1}
 x_my_{(n-m)\bmod N}e^{-2\pi ikn/N}.
$$

$m$ を固定し $r\equiv n-m\pmod N$ と置きます。$n$ が一周すると $r$ も $0,\dots,N-1$ を一度ずつ走り、$n\equiv m+r\pmod N$ なので

$$
\begin{aligned}
Z_k
&=
\sum_{m=0}^{N-1}\sum_{r=0}^{N-1}
 x_my_re^{-2\pi ik(m+r)/N}\\
&=
\left(\sum_{m=0}^{N-1}x_me^{-2\pi ikm/N}\right)
\left(\sum_{r=0}^{N-1}y_re^{-2\pi ikr/N}\right)\\
&=X_kY_k.
\end{aligned}
$$
<!-- proof-end -->

---

## 9. 高速 Fourier 変換は「別の変換」ではない

定義通りの DFT は $N$ 個の出力それぞれに $N$ 項の和を作るため $O(N^2)$ の計算を要します。$N=2M$ とし

$$
X_k=\sum_{n=0}^{2M-1}x_ne^{-2\pi ikn/(2M)}
$$

を偶数番と奇数番に分けると

$$
\begin{aligned}
X_k
&=
\sum_{r=0}^{M-1}x_{2r}e^{-2\pi ikr/M}\\
&\quad+
e^{-2\pi ik/(2M)}
\sum_{r=0}^{M-1}x_{2r+1}e^{-2\pi ikr/M}.
\end{aligned}
$$

偶数番列の $M$ 点 DFT を $E_k$、奇数番列を $O_k$ とし、$\omega_{2M}=e^{-2\pi i/(2M)}$ と書けば

$$
X_k=E_k+\omega_{2M}^kO_k.
$$

さらに $k=0,\dots,M-1$ では

$$
X_{k+M}=E_k-\omega_{2M}^kO_k.
$$

したがって一度計算した $E_k,O_k$ から二つの出力を同時に作れます。$N=2^m$ でこの分割を再帰すると

$$
T(N)=2T(N/2)+O(N),
$$

分割段数は $\log_2N$ なので

$$
\boxed{T(N)=O(N\log N)}.
$$

> **重要な区別**  
> 離散 Fourier 変換は数学的な写像です。高速 Fourier 変換は、その写像を効率よく計算するアルゴリズムです。「高速 Fourier 変換という別の周波数変換」があるわけではありません。

---

## 10. 標本化すると、周波数は完全には区別できない

連続時間の複素指数波 $f_\omega(t)=e^{i\omega t}$ を、間隔 $\Delta>0$ の時刻 $t_n=n\Delta$ で観測すると

$$
x_n=e^{i\omega n\Delta}
$$

です。

<a id="def-fou5-aliasing"></a>
<!-- formal-statement-start -->
> **定義（等間隔標本化におけるエイリアシング同値）**  
> 標本間隔 $\Delta>0$ を固定する。二つの角周波数 $\omega,\omega'$ が
>
$$
\omega'-\omega\in\frac{2\pi}{\Delta}\mathbb Z
$$
>
> を満たすとき、$\omega$ と $\omega'$ はこの標本化に関してエイリアシングで同値であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou5-aliasing -->
**定義の確認**

$\Delta=1/1000$ 秒とします。$100$ Hz と $1100$ Hz の角周波数差は

$$
2\pi(1100-100)=2\pi(1000)=\frac{2\pi}{\Delta}.
$$

実際

$$
e^{2\pi i(1100)n/1000}
=
e^{2\pi i(100)n/1000}e^{2\pi in}
=
e^{2\pi i(100)n/1000}.
$$
<!-- definition-example-end -->

<a id="prop-fou5-sampling-aliasing"></a>
<!-- formal-statement-start -->
> **命題（等間隔標本化のエイリアシング）**  
> $\Delta>0$、$\omega\in\mathbb R$、$\ell\in\mathbb Z$ とし
>
$$
\omega'=\omega+\frac{2\pi\ell}{\Delta}
$$
>
> と置く。このとき全ての整数 $n$ について
>
$$
\boxed{e^{i\omega'n\Delta}=e^{i\omega n\Delta}}
$$
>
> が成り立つ。従って間隔 $\Delta$ の等間隔標本だけから $\omega$ と $\omega'$ を区別できない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
\begin{aligned}
e^{i\omega'n\Delta}
&=
\exp\left[i\left(\omega+\frac{2\pi\ell}{\Delta}\right)n\Delta\right]\\
&=e^{i\omega n\Delta}e^{2\pi i\ell n}\\
&=e^{i\omega n\Delta},
\end{aligned}
$$

です。最後に $\ell n\in\mathbb Z$ を使いました。
<!-- proof-end -->

代表区間を一つ選ぶなら角周波数では

$$
\left[-\frac{\pi}{\Delta},\frac{\pi}{\Delta}\right),
$$

通常周波数 $\nu=\omega/(2\pi)$ では

$$
\left[-\frac1{2\Delta},\frac1{2\Delta}\right)
$$

が自然です。

### 10.1 900 Hz が 100 Hz に見える

毎秒1000回、すなわち $\Delta=1/1000$ 秒で

$$
\cos(2\pi\cdot900\,t)
$$

を標本化すると、整数 $n$ に対して

$$
\begin{aligned}
\cos\left(2\pi\cdot900\frac n{1000}\right)
&=\cos(1.8\pi n)\\
&=\cos(2\pi n-0.2\pi n)\\
&=\cos(0.2\pi n)\\
&=\cos\left(2\pi\cdot100\frac n{1000}\right).
\end{aligned}
$$

したがって標本列だけから両者を区別できません。失われたのは DFT の精度ではなく、連続信号から標本列への写像の単射性です。

### 10.2 $N$ 点 DFT の周波数格子

標本間隔を $\Delta$、標本数を $N$ とすると DFT の指数

$$
e^{-2\pi ikn/N}
$$

を $e^{-i\omega_kn\Delta}$ と比べて

$$
\boxed{\omega_k=\frac{2\pi k}{N\Delta}}.
$$

ただし大きい $k$ は負周波数として読めます。例えば

$$
\frac{2\pi(N-1)}{N\Delta}
=
-\frac{2\pi}{N\Delta}+\frac{2\pi}{\Delta},
$$

したがって $k=N-1$ は標本化後には $-2\pi/(N\Delta)$ と同じ周波数クラスです。

---

## 11. 三つの Fourier 変換を一枚に置く

| 対象 | 変換 | 周波数側 | 復元・一意性の機構 |
|---|---|---|---|
| $f\in L^1(\mathbb R)$ や $L^2(\mathbb R)$ | 連続 Fourier 変換 | 連続変数 $\xi$ | FOU3 の反転、FOU4 の Plancherel |
| 確率分布 $\mu$ | 有限測度の Fourier 変換 / 特性関数 | 連続変数 $t$ | 特性関数一意性・Lévy連続性定理 |
| 有限列 $x\in\mathbb C^N$ | 離散 Fourier 変換 | $k=0,\dots,N-1$ | $1$ の $N$ 乗根の直交性 |

共通しているのは

$$
\boxed{
\text{和・畳み込み・平行移動の構造}
\longrightarrow
\text{周波数ごとの単純な演算}
}
$$

です。一方、$L^1$ では点ごとの反転に追加条件が要り、$L^2$ では $L^2$ 収束として反転し、確率測度では特性関数の一意性が分布を識別し、有限列では有限次元の直交性だけで反転します。標本化前の連続信号まで復元するには、さらにエイリアシングを防ぐ仮定が必要です。

---

## 演習

## FOU5-A01 Bernoulli 分布を測度として Fourier 変換する

- Level: A
- 目安時間: 10分

$P(X=1)=p$、$P(X=0)=1-p$ を満たす Bernoulli 変数 $X$ の分布を $\mu_X$ とする。

1. $\widehat{\mu_X}(\xi)$ を定義から求めよ。
2. $\varphi_X(t)=\widehat{\mu_X}(-t)$ を直接確認せよ。

<!-- solution-start -->
### 詳細解答

分布は $0,1$ にだけ質量を持つので

$$
\begin{aligned}
\widehat{\mu_X}(\xi)
&=(1-p)e^{-i\xi\cdot0}+pe^{-i\xi\cdot1}\\
&=1-p+pe^{-i\xi}.
\end{aligned}
$$

従って

$$
\widehat{\mu_X}(-t)=1-p+pe^{it}.
$$

一方

$$
\varphi_X(t)=E[e^{itX}]=(1-p)+pe^{it},
$$

よって両者は一致します。
<!-- solution-end -->

## FOU5-A02 一点列の離散 Fourier 変換と反転

- Level: A
- 目安時間: 10分

$N=4$、$x=(1,0,0,0)$ とする。DFT を求め、反転公式から $x$ を復元せよ。

<!-- solution-start -->
### 詳細解答

$x_0=1$ 以外は0なので全ての $k$ で

$$
X_k=1,
$$

従って $X=(1,1,1,1)$ です。反転公式の右辺は

$$
x_n=\frac14\sum_{k=0}^3e^{2\pi ikn/4}.
$$

$n=0$ では和が4、$n=1,2,3$ では [根の直交性](#lem-fou5-root-orthogonality) により0です。従って

$$
(x_0,x_1,x_2,x_3)=(1,0,0,0).
$$
<!-- solution-end -->

## FOU5-A03 4点余弦型列の周波数成分

- Level: A
- 目安時間: 12分

$N=4$、$x=(1,0,-1,0)$ とする。DFT を求め、離散 Parseval 等式を数値で確認せよ。

<!-- solution-start -->
### 詳細解答

$$
X_k=1-e^{-\pi ik}=1-(-1)^k,
$$

よって

$$
X=(0,2,0,2).
$$

時間側は

$$
\sum_{n=0}^3|x_n|^2=2,
$$

周波数側は

$$
\frac14\sum_{k=0}^3|X_k|^2
=\frac14(0+4+0+4)=2.
$$

一致しました。
<!-- solution-end -->

## FOU5-A04 エイリアシングを式で判定する

- Level: A
- 目安時間: 10分

毎秒 $800$ 回、すなわち $\Delta=1/800$ 秒で標本化する。

1. $100$ Hz と $900$ Hz の複素指数波が同じ標本列を生むことを示せ。
2. $100$ Hz と $700$ Hz の実余弦波が同じ標本列を生むことを示せ。

<!-- solution-start -->
### 詳細解答

1. 差は標本化周波数 $800$ Hz なので

$$
e^{2\pi i(900)n/800}
=e^{2\pi i(100)n/800}e^{2\pi in}
=e^{2\pi i(100)n/800}.
$$

2. $700=800-100$ だから

$$
\begin{aligned}
\cos\left(2\pi\frac{700n}{800}\right)
&=\cos\left(2\pi n-2\pi\frac{100n}{800}\right)\\
&=\cos\left(2\pi\frac{100n}{800}\right).
\end{aligned}
$$

$700$ Hz は標本化後には $-100$ Hz と同じ複素周波数クラスで、余弦ではさらに符号反転した周波数も同じ値を持ちます。
<!-- solution-end -->

## FOU5-B01 巡回畳み込みを時間側と周波数側で計算する

- Level: B
- 目安時間: 18分

$N=4$、

$$
x=(1,1,0,0),\qquad y=(1,-1,0,0)
$$

とする。

1. $z=x*_4y$ を直接計算せよ。
2. $X_k,Y_k$ を求め、$Z_k=X_kY_k$ を計算せよ。
3. 逆変換して 1. と一致することを確認せよ。

<!-- solution-start -->
### 詳細解答

時間側では

$$
\begin{aligned}
z_0&=x_0y_0+x_1y_3=1,\\
z_1&=x_0y_1+x_1y_0=0,\\
z_2&=x_0y_2+x_1y_1=-1,\\
z_3&=0,
\end{aligned}
$$

よって $z=(1,0,-1,0)$ です。

周波数側では

$$
X_k=1+e^{-2\pi ik/4},
\qquad
Y_k=1-e^{-2\pi ik/4},
$$

したがって

$$
Z_k=X_kY_k=1-e^{-\pi ik}=1-(-1)^k.
$$

よって $Z=(0,2,0,2)$。逆変換は

$$
z_n=\frac14\left(2e^{2\pi in/4}+2e^{2\pi i3n/4}\right),
$$

$n=0,1,2,3$ を代入すると $1,0,-1,0$ となり、直接計算と一致します。
<!-- solution-end -->

## FOU5-B02 偶奇分割から高速 Fourier 変換の再帰式を作る

- Level: B
- 目安時間: 18分

$N=8$ とし、偶数番列 $(x_0,x_2,x_4,x_6)$ の4点 DFT を $E_k$、奇数番列 $(x_1,x_3,x_5,x_7)$ の4点 DFT を $O_k$ とする。

1. $k=0,1,2,3$ について $X_k=E_k+e^{-2\pi ik/8}O_k$ を導け。
2. $X_{k+4}=E_k-e^{-2\pi ik/8}O_k$ を導け。
3. $N=2^m$ で再帰すると $O(N\log N)$ になる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

8点変換を偶奇へ分けると

$$
\begin{aligned}
X_k
&=\sum_{r=0}^3x_{2r}e^{-2\pi ikr/4}
+e^{-2\pi ik/8}\sum_{r=0}^3x_{2r+1}e^{-2\pi ikr/4}\\
&=E_k+e^{-2\pi ik/8}O_k.
\end{aligned}
$$

$k+4$ を代入すると $e^{-2\pi i(k+4)/8}=-e^{-2\pi ik/8}$ なので

$$
X_{k+4}=E_k-e^{-2\pi ik/8}O_k.
$$

長さ $N$ を長さ $N/2$ の二問題へ分け、各段の結合が $O(N)$ だから

$$
T(N)=2T(N/2)+O(N).
$$

$N=2^m$ では段数が $m=\log_2N$ なので、各段 $O(N)$ を合計して $T(N)=O(N\log N)$ です。
<!-- solution-end -->

## FOU5-B03 独立 Bernoulli 和を Fourier 側で読む

- Level: B
- 目安時間: 18分

$X_1,\dots,X_n$ を互いに独立で $P(X_j=1)=p$、$P(X_j=0)=1-p$ とし、$S_n=\sum_{j=1}^nX_j$ とする。

1. $S_n$ の特性関数を求めよ。
2. 同じ Bernoulli 分布を $n$ 回畳み込むと Fourier 側で $n$ 乗になることを説明せよ。
3. 二項定理を使って $P(S_n=r)$ を復元せよ。

<!-- solution-start -->
### 詳細解答

Bernoulli 変数1個の特性関数は

$$
\varphi_X(t)=1-p+pe^{it}.
$$

独立性と [特性関数の基本性質](../F0_00P6_特性関数_中心極限定理/index.md#prop-f0-00p6-basic-properties) から

$$
\boxed{\varphi_{S_n}(t)=(1-p+pe^{it})^n}.
$$

分布側では $S_n$ の分布は Bernoulli 分布の $n$ 回畳み込みであり、Fourier 変換が畳み込みを積へ変えるため $n$ 乗が現れます。

二項定理で

$$
(1-p+pe^{it})^n
=
\sum_{r=0}^n\binom nr(1-p)^{n-r}p^re^{itr}.
$$

一方

$$
\varphi_{S_n}(t)=\sum_{r=0}^nP(S_n=r)e^{itr}.
$$

$z=e^{it}$ と置けば両辺は $z$ の多項式です。単位円上の無限個の $z$ で一致するため差は恒等的に0で、各係数が一致します。従って

$$
\boxed{P(S_n=r)=\binom nrp^r(1-p)^{n-r}}.
$$
<!-- solution-end -->

## FOU5-C01 巡回群上のランダムウォークを離散 Fourier 変換で解く

- Level: C
- 目安時間: 30分

状態空間を $\{0,1,2,3\}$ とし、添字は4を法とする。各時刻に独立に、確率 $1/2$ で留まり、確率 $1/2$ で $+1$ 進むランダムウォークを考える。1ステップ増分分布を

$$
q=(1/2,1/2,0,0),
$$

初期分布を $p^{(0)}=(1,0,0,0)$ とする。

1. $p^{(1)}$ と $p^{(2)}$ を巡回畳み込みで求めよ。
2. $q$ の4点 DFT $Q_k$ を求めよ。
3. $r$ ステップ後の分布の DFT が $P_k^{(r)}=Q_k^r$ となることを示せ。
4. $r=2$ で逆変換し、1. と一致することを確認せよ。
5. 特性関数による独立和の方法の有限巡回群版であることを説明せよ。

<!-- solution-start -->
### 詳細解答

1ステップ後は $p^{(1)}=q$ です。2ステップ後は

$$
p^{(2)}=q*_4q.
$$

各成分は

$$
\begin{aligned}
p^{(2)}_0&=q_0q_0+q_1q_3+q_2q_2+q_3q_1=\frac14,\\
p^{(2)}_1&=q_0q_1+q_1q_0+q_2q_3+q_3q_2=\frac12,\\
p^{(2)}_2&=q_0q_2+q_1q_1+q_2q_0+q_3q_3=\frac14,\\
p^{(2)}_3&=0.
\end{aligned}
$$

従って

$$
p^{(2)}=\left(\frac14,\frac12,\frac14,0\right).
$$

次に

$$
Q_k=\frac12+\frac12e^{-2\pi ik/4},
$$

よって

$$
Q_0=1,\qquad
Q_1=\frac12-\frac i2,\qquad
Q_2=0,\qquad
Q_3=\frac12+\frac i2.
$$

各ステップで分布は $q$ と巡回畳み込みされ、$p^{(0)}$ の DFT は全成分1なので、[巡回畳み込み定理](#thm-fou5-circular-convolution) を繰り返すと

$$
P_k^{(r)}=Q_k^r.
$$

$r=2$ では

$$
Q_0^2=1,\quad
Q_1^2=-\frac i2,\quad
Q_2^2=0,\quad
Q_3^2=\frac i2.
$$

逆変換

$$
p_n^{(2)}
=
\frac14\sum_{k=0}^3Q_k^2e^{2\pi ikn/4}
$$

へ $n=0,1,2,3$ を代入すると順に

$$
\frac14,\qquad\frac12,\qquad\frac14,\qquad0
$$

となり、直接の巡回畳み込みと一致します。

実数直線上では独立和の分布の畳み込みを特性関数が積へ変えます。ここでは状態空間が4点の巡回群なので、通常の畳み込みが巡回畳み込みへ、連続周波数の特性関数が4点 DFT へ置き換わっています。核心は

$$
\boxed{
\text{独立な増分の和}
\longrightarrow
\text{分布の畳み込み}
\longrightarrow
\text{Fourier側で積}
}
$$

で同じです。
<!-- solution-end -->

---

## 章末チェック

- 有限 Borel 測度の Fourier 変換が密度の有無に関係なく定義できる理由を説明できる。
- 本教材の符号規約で $\varphi_X(t)=\widehat{\mu_X}(-t)$ になることを導ける。
- 確率測度の畳み込みを押し出しとして定義し、独立和の分布と Fourier 積の対応を証明できる。
- 独立同分布中心極限定理の特性関数証明を「畳み込み・尺度変換・原点近傍の二次展開」として説明できる。
- $1$ の $N$ 乗根の直交性から DFT 反転公式と Parseval 等式を証明できる。
- 巡回畳み込み定理を添字変換から証明できる。
- 高速 Fourier 変換が DFT の計算アルゴリズムであり、偶奇分割から $O(N\log N)$ が現れることを説明できる。
- 標本間隔 $\Delta$ で角周波数が $2\pi/\Delta$ 周期に同一視されることを示せる。
- エイリアシングが DFT の誤差ではなく標本化写像の非一意性であることを説明できる。

次章からは標準偏微分方程式コアへ入り、Fourier 変換・Fourier 級数・Sturm--Liouville が熱方程式・波動方程式・Laplace 方程式でどう使い分けられるかを統合していきます。
