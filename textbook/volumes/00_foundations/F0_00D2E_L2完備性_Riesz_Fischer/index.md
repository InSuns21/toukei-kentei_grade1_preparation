# F0-00D2E 補講：$L^2$完備性・Riesz--Fischer・Hilbert空間への橋

D2Dで $L^2$ にノルム

$$
\|f\|_2
=
\left(\int|f|^2d\mu\right)^{1/2}
$$

を入れました。

この講義の問いは一つです。

> **$L^2$ のCauchy列は、$L^2$ の外へ逃げずに必ず $L^2$ の関数へ収束するか。**

答えはYesです。これが $L^2$ をHilbert空間として使える理由です。

## 0. まず「$L^2$で近い」を具体例で見る

$[0,1]$ 上で

$$
f_n=1_{[0,1/n]}
$$

とします。各 $f_n$ は高さ1ですが、非零な区間が縮むので

$$
\|f_n\|_2^2
=
\int_0^1|f_n|^2dx
=
\frac1n,
$$

したがって

$$
\|f_n\|_2=\frac1{\sqrt n}\to0.
$$

つまり $L^2$ では「各点でどれくらい違うか」ではなく、**差の二乗を全体で積分した平均的な大きさ**で近さを測ります。

有限次元の $\mathbb R^p$ ならCauchy列が座標ごとに収束して極限ベクトルを作れますが、$L^2$ は無限次元です。そこで本章では

> **関数のCauchy列から、同じ $L^2$ の中に極限関数を本当に作れるか**

を証明します。

---

## 1. Cauchy列と完備性の復習

$L^2$ の極限を最初から点ごとに当てるのではなく、「列の後ろ同士が互いに近い」ことだけから極限の存在を引き出したい。そのために使うのが Cauchy 列と完備性です。

まず一般のノルム空間で、この二つの言葉を固定します。

<a id="def-f0-00d2e-01"></a>
 
<!-- formal-statement-start -->
### 定義（ノルム空間のCauchy列）

ノルム空間 $(V,\|\cdot\|)$ の点列 $(x_n)$ が **Cauchy列** であるとは、任意の $\varepsilon>0$ に対してある $N$ が存在し、$m,n\ge N$ なら

$$
\|x_n-x_m\|<\varepsilon
$$

となることをいう。
<!-- formal-statement-end -->

Cauchy 列であることは「極限候補をまだ知らなくても、列内部の距離だけで収束らしさを判定できる」という条件です。これを実際の収束へ変換できる空間を完備と呼びます。

<a id="def-f0-00d2e-02"></a>
 
<!-- formal-statement-start -->
### 定義（Banach空間）

ノルム空間 $(V,\|\cdot\|)$ が **Banach空間** であるとは、その任意のCauchy列が $V$ のある元へノルム収束することをいう。

D2Eでは $V=L^2(\mu)$ についてこれを証明します。
<!-- formal-statement-end -->

---

## 2. $L^2$の内積

D2D で $L^2$ ノルムは得ました。しかし $p=2$ には、長さだけでなく「二つの関数がどれだけ同じ方向を向くか」を測る内積まで入ります。

有限次元で $x\cdot y$ が成分積の和だったのに対し、$L^2$ ではその和を積分へ置き換えます。Hölder の $p=q=2$ が、この積分を有限に保つ役割を担います。

<a id="def-f0-00d2e-03"></a>
 
<!-- formal-statement-start -->
### 定義（L2内積）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の実数値 $L^2$ 関数 $f,g$ に対して

$$
\boxed{
\langle f,g\rangle
:=
\int_\Omega f g\,d\mu
}
$$

と定める。

D2DのHölderを $p=q=2$ に適用すると

$$
\int|fg|d\mu
\le
\|f\|_2\|g\|_2<\infty
$$

なので、この積分は有限です。
<!-- formal-statement-end -->

<a id="prop-f0-00d2e-01"></a>
 
<!-- formal-statement-start -->
### 命題（内積が誘導するノルム）

$L^2(\mu)$ 上で

$$
\langle f,f\rangle
=
\int|f|^2d\mu
=
\|f\|_2^2.
$$

したがって

$$
\|f\|_2=\sqrt{\langle f,f\rangle}.
$$
<!-- formal-statement-end -->

---

## 3. Hilbert空間

内積があれば直交や射影を語れますが、Cauchy 列の極限が空間の外へ逃げるなら、近似列から射影や極限を作る議論が途中で壊れます。

そこで「内積による幾何」と「完備性」を同時に持つ空間を Hilbert 空間と呼びます。

<a id="def-f0-00d2e-04"></a>
 
<!-- formal-statement-start -->
### 定義（Hilbert空間）

内積空間 $(H,\langle\cdot,\cdot\rangle)$ が **Hilbert空間** であるとは、内積が誘導するノルム

$$
\|x\|=\sqrt{\langle x,x\rangle}
$$

について完備であることをいう。

したがって、$L^2$ が完備であることを示せば

$$
\boxed{L^2(\mu)\text{ はHilbert空間}}
$$

が従います。
<!-- formal-statement-end -->

---

## 4. なぜ普通の点wise収束だけでは足りないのか

$L^2$ のCauchy性は

$$
\int|f_n-f_m|^2d\mu\to0
$$

という「平均二乗の近さ」です。

これは各点 $\omega$ で $(f_n(\omega))$ がCauchyであることを直接意味しません。

そこで、元のCauchy列から **非常に速く近づく部分列** を選び、差分の絶対値和がa.e.で有限になることを示します。

この「速い部分列 → ほとんど至る所での収束 → $L^2$収束」が証明の核心です。

---

## 5. Riesz--Fischer型の完備性証明

<a id="thm-f0-00d2e-01"></a>
 
<!-- formal-statement-start -->
### 定理（L2の完備性）

任意の測度空間 $(\Omega,\mathcal F,\mu)$ に対して、$L^2(\mu)$ はノルム $\|\cdot\|_2$ について完備である。
<!-- formal-statement-end -->

### 5.1 証明の見取り図

長い完全証明に入る前に、役割だけ五段階で追います。

```text
L2-Cauchy列 (f_n)
 ↓
差が 2^{-k} 以下になる速い部分列を取る
 ↓
差分の絶対値級数が a.e. で有限になる
 ↓
各点で部分列の極限 f を作る
 ↓
尾部評価で f_{n_k} → f in L2
 ↓
元のCauchy列全体も f へ収束
```

難所は「$L^2$-Cauchyだから点wise Cauchy」と直接は言えない点です。そこで速い部分列と差分級数を橋にします。

完全証明の各Stepは、この矢印を一つずつ正当化しています。

<!-- proof-start -->
### 証明

$(f_n)$ を $L^2(\mu)$ のCauchy列とします。

#### Step 1：速く近づく部分列を取る

各 $k\ge1$ について、Cauchy 性を $\varepsilon=2^{-k}$ に適用し、

$$
m,n\ge N_k
\quad\Longrightarrow\quad
\|f_m-f_n\|_2\le2^{-k}
$$

となる $N_k$ を取ります。必要なら

$$
N_k\leftarrow\max\{N_1,\ldots,N_k\}
$$

と置き換えて、$N_1\le N_2\le\cdots$ としてよいです。

$n_1\ge N_1$ を選び、$k\ge1$ について帰納的に

$$
n_{k+1}\ge\max\{N_{k+1},n_k+1\}
$$

となるように選びます。すると $n_k\ge N_k$ かつ $n_{k+1}\ge N_k$ なので

$$
\boxed{
\|f_{n_{k+1}}-f_{n_k}\|_2
\le
2^{-k}
}
$$

が従います。

差分の絶対値を

$$
g_k
:=
|f_{n_{k+1}}-f_{n_k}|
$$

と置きます。

#### Step 2：差分級数の有限和を評価する

$$
G_N
:=
\sum_{k=1}^N g_k
$$

と置きます。[Minkowskiの不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-02)より

$$
\|G_N\|_2
\le
\sum_{k=1}^N\|g_k\|_2
\le
\sum_{k=1}^N2^{-k}
<1.
$$

$G_N$ は非負で単調増加なので

$$
G(\omega)
:=
\lim_{N\to\infty}G_N(\omega)
\in[0,\infty]
$$

と定められます。

$G_N^2\uparrow G^2$ なので、D2Bの[MCT](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)より

$$
\int G^2d\mu
=
\lim_{N\to\infty}\int G_N^2d\mu
=
\lim_{N\to\infty}\|G_N\|_2^2
\le1.
$$

したがって

$$
G\in L^2(\mu).
$$

特に $G(\omega)<\infty$ がa.e.で成り立ちます。

#### Step 3：部分列がa.e.で収束する

$G(\omega)<\infty$ となる点では

$$
\sum_{k=1}^{\infty}
|f_{n_{k+1}}(\omega)-f_{n_k}(\omega)|
<\infty.
$$

$m>k$ に対して

$$
f_{n_m}(\omega)-f_{n_k}(\omega)
=
\sum_{j=k}^{m-1}
\bigl(f_{n_{j+1}}(\omega)-f_{n_j}(\omega)\bigr),
$$

したがって

$$
|f_{n_m}(\omega)-f_{n_k}(\omega)|
\le
\sum_{j=k}^{m-1}g_j(\omega).
$$

右辺は収束級数の尾なので $k\to\infty$ で0へ行きます。よって $(f_{n_k}(\omega))$ は Cauchy 列であり、実数の完備性からある値へ収束します。

可測集合

$$
A:=\{\omega:G(\omega)<\infty\}
$$

ではこの極限を

$$
f(\omega):=\lim_{k\to\infty}f_{n_k}(\omega)
$$

と定め、$A^c$ では $f(\omega)=0$ と置きます。各 $f_{n_k}$ は可測なので $\limsup_k f_{n_k}$ も可測です。$A$ は可測で、$A$ 上では極限が存在して $\limsup_k f_{n_k}$ に一致します。したがって「$A$ 上ではこの可測関数、$A^c$ 上では定数0」という可測集合による貼り合わせとして $f$ は可測です。なお $\mu(A^c)=0$ です。

#### Step 4：部分列は$L^2$でも$f$へ収束する

まず有限尾部

$$
H_{k,M}
:=
\sum_{j=k}^{M}g_j
$$

を考えます。Minkowski の不等式をこの有限和へ繰り返し適用すると

$$
\|H_{k,M}\|_2
\le
\sum_{j=k}^{M}\|g_j\|_2
\le
\sum_{j=k}^{M}2^{-j}.
$$

$M\to\infty$ とすると $H_{k,M}\uparrow H_k$ ただし

$$
H_k
:=
\sum_{j=k}^{\infty}g_j.
$$

したがって $H_{k,M}^2\uparrow H_k^2$ であり、MCT により

$$
\|H_k\|_2^2
=
\int H_k^2d\mu
=
\lim_{M\to\infty}\int H_{k,M}^2d\mu
=
\lim_{M\to\infty}\|H_{k,M}\|_2^2.
$$

上の有限和評価を極限へ移すと

$$
\|H_k\|_2
\le
\sum_{j=k}^{\infty}\|g_j\|_2
\le
\sum_{j=k}^{\infty}2^{-j}
=2^{1-k}.
$$

また $A$ 上で $f_{n_m}\to f$ なので、$m>k$ に対する 望遠和 表示から $m\to\infty$ として

$$
|f_{n_k}-f|
\le
\sum_{j=k}^{\infty}g_j
=
H_k
$$

が a.e. で従います。

したがって

$$
\|f_{n_k}-f\|_2
\le
\|H_k\|_2
\le2^{1-k}
\to0.
$$

これにより $f\in L^2$ でもあることが分かります。例えば

$$
\|f\|_2
\le
\|f-f_{n_k}\|_2+
\|f_{n_k}\|_2<\infty
$$

となる $k$ を取ればよいからです。

#### Step 5：元の列全体も$f$へ収束する

$(f_n)$ はCauchy列なので、任意の $\varepsilon>0$ に対してある $N$ が存在し、$m,n\ge N$ なら

$$
\|f_n-f_m\|_2<\varepsilon/2.
$$

十分大きい $k$ を取り、$n_k\ge N$ かつ

$$
\|f_{n_k}-f\|_2<\varepsilon/2
$$

とします。

$n\ge N$ なら三角不等式から

$$
\|f_n-f\|_2
\le
\|f_n-f_{n_k}\|_2+
\|f_{n_k}-f\|_2
<\varepsilon.
$$

したがって

$$
f_n\to f\quad\text{in }L^2.
$$

任意のCauchy列が $L^2$ 内で収束したので $L^2$ は完備です。$\square$
<!-- proof-end -->

---

## 6. $L^2$はHilbert空間

<a id="cor-f0-00d2e-01"></a>

<!-- formal-statement-start -->
### 系（L2のHilbert性）

任意の測度空間 $(\Omega,\mathcal F,\mu)$ に対して、内積

$$
\langle f,g\rangle=\int fg\,d\mu
$$

を備えた $L^2(\mu)$ はHilbert空間である。
<!-- formal-statement-end -->

<!-- proof-start -->
#### 証明

内積が誘導するノルムは $\|f\|_2$。上の定理でこのノルムについて完備であることを示したので、Hilbert空間の定義を満たします。$\square$
<!-- proof-end -->

## 6.1 完備性が何を買っているか

$L^2$ が完備であることで、近似計算や射影法から得た

$$
f_1,f_2,\ldots
$$

について「互いにどんどん近づく」ことを $L^2$ ノルムで示せば、極限候補を先に知っていなくても

$$
\exists f\in L^2:\quad \|f_n-f\|_2\to0
$$

を保証できます。

これはF0-00Dで見た

> **Cauchy + complete = 極限の存在**

を関数空間で実現したものです。

---

## 7. なぜ統計学で重要なのか

確率空間 $(\Omega,\mathcal F,P)$ 上では

$$
L^2(P)
=
\{X:E[X^2]<\infty\}/\text{a.s. equality}
$$

です。

内積は

$$
\langle X,Y\rangle
=E[XY].
$$

平均0なら

$$
\|X\|_2^2=E[X^2]=\operatorname{Var}(X).
$$

したがって

- 最小二乗法
- 条件付き期待値
- 最良線形予測
- Wold分解
- Fourier展開
- RKHSへ向かうHilbert空間の考え方

が同じ「射影」の言葉で扱えるようになります。

---

## 8. 一般の$L^p$について

実は $1\le p\le\infty$ の全てについて $L^p$ はBanach空間です。

この講義では後続で最重要な $p=2$ を完全証明しました。一般 $p$ の完備性も同様の部分列法で示せますが、$p=2$ だけが内積

$$
\langle f,g\rangle=\int fg
$$

を自然に持つため、Hilbert空間になる点が特別です。

---

# 9. 演習

## F0-00D2E-A01 内積とノルム

- Level: A
- 目安時間: 8分

$[0,1]$ 上で $f(x)=x$ とする。$\langle f,f\rangle$ と $\|f\|_2$ を求め、

$$
\|f\|_2^2=\langle f,f\rangle
$$

を確認せよ。

<!-- solution-start -->
### 詳細解答

$$
\langle f,f\rangle
=
\int_0^1x^2dx
=
\frac13.
$$

したがって

$$
\|f\|_2=\frac1{\sqrt3},
$$

よって $\|f\|_2^2=1/3=\langle f,f\rangle$。

<!-- solution-end -->

## F0-00D2E-A02 速い部分列

- Level: A
- 目安時間: 8分

$L^2$のCauchy列 $(f_n)$ から

$$
\|f_{n_{k+1}}-f_{n_k}\|_2\le2^{-k}
$$

となる部分列を選べる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

Cauchy性より、各 $k$ に対してある $N_k$ が存在し、$m,n\ge N_k$ なら距離が $2^{-k}$ 以下になります。$N_k$ は累積最大値で置き換えて単調増加としてよいです。

そこで $n_k\ge N_k$ を満たすよう帰納的に選び、さらに $n_{k+1}>n_k$ とします。すると $n_k,n_{k+1}\ge N_k$ なので

$$
\|f_{n_{k+1}}-f_{n_k}\|_2\le2^{-k}
$$

が成り立ちます。

<!-- solution-end -->

## F0-00D2E-B01 差分級数の意味

- Level: B
- 目安時間: 12分

完備性証明で

$$
\sum_k|f_{n_{k+1}}-f_{n_k}|<\infty
$$

a.e. が得られると、なぜ $(f_{n_k})$ がa.e.で収束するか説明せよ。

<!-- solution-start -->
### 詳細解答

各固定点 $\omega$ で差分絶対値級数が収束すれば

$$
f_{n_m}(\omega)-f_{n_k}(\omega)
=
\sum_{j=k}^{m-1}
(f_{n_{j+1}}(\omega)-f_{n_j}(\omega))
$$

なので

$$
|f_{n_m}(\omega)-f_{n_k}(\omega)|
\le
\sum_{j=k}^{m-1}g_j(\omega).
$$

収束級数の尾部は0へ行くから点wise Cauchy。実数の完備性により収束する。

<!-- solution-end -->

## F0-00D2E-B02 部分列から全列へ

- Level: B
- 目安時間: 12分

ノルム空間のCauchy列 $(x_n)$ が部分列 $x_{n_k}\to x$ を持つとき、$x_n\to x$ を示せ。

<!-- solution-start -->
### 詳細解答

任意の $\varepsilon>0$ に対しCauchy性から $m,n\ge N$ なら $\|x_n-x_m\|<\varepsilon/2$。部分列収束から十分大きい $k$ で $n_k\ge N$ かつ $\|x_{n_k}-x\|<\varepsilon/2$。$n\ge N$ なら

$$
\|x_n-x\|
\le
\|x_n-x_{n_k}\|+
\|x_{n_k}-x\|
<\varepsilon.
$$

<!-- solution-end -->

## F0-00D2E-B03 確率変数の$L^2$

- Level: B
- 目安時間: 15分

確率変数 $X,Y\in L^2(P)$ について

$$
\langle X,Y\rangle=E[XY]
$$

が有限であることを示せ。また $E[X]=0$ のとき $\|X\|_2^2=\operatorname{Var}(X)$ を示せ。

<!-- solution-start -->
### 詳細解答

Cauchy--Schwarzより

$$
E|XY|
\le
(E[X^2])^{1/2}(E[Y^2])^{1/2}<\infty.
$$

したがって内積は有限。さらに $E[X]=0$ なら

$$
\operatorname{Var}(X)
=E[(X-E[X])^2]
=E[X^2]
=\|X\|_2^2.
$$

<!-- solution-end -->

## F0-00D2E-A03 内積が有限になることを Hölder で確認する

- Level: A
- 目安時間: 10分

$[0,1]$ 上で $f(x)=x$、$g(x)=1-x$ とする。$f,g\in L^2$ を確認し、Hölder の不等式を使って $fg\in L^1$ であることを示せ。その上で $\langle f,g\rangle$ を計算せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\int_0^1|f|^2dx
=
\int_0^1x^2dx
=
\frac13<\infty,
$$

また

$$
\int_0^1|g|^2dx
=
\int_0^1(1-x)^2dx
=
\frac13<\infty,
$$

なので $f,g\in L^2$ である。

Hölder を $p=q=2$ で適用すると

$$
\int_0^1|fg|dx
\le
\|f\|_2\|g\|_2
=
\frac1{\sqrt3}\frac1{\sqrt3}
=
\frac13<\infty.
$$

したがって内積は有限に定義できる。実際、

$$
\langle f,g\rangle
=
\int_0^1x(1-x)dx
=
\frac12-\frac13
=
\frac16.
$$
<!-- solution-end -->

## F0-00D2E-A04 $L^2$収束からCauchy性を確認する

- Level: A
- 目安時間: 10分

$[0,1]$ 上で $f_n=1_{[0,1/n]}$ とする。$f_n\to0$ in $L^2$ を確認し、そこから $(f_n)$ が $L^2$-Cauchy であることを示せ。

<!-- solution-start -->
### 詳細解答

まず

$$
\|f_n\|_2^2
=
\int_0^1 1_{[0,1/n]}dx
=
\frac1n,
$$

したがって

$$
\|f_n-0\|_2=\frac1{\sqrt n}\to0.
$$

よって $f_n\to0$ in $L^2$ である。

任意の $m,n$ に対して三角不等式から

$$
\|f_n-f_m\|_2
\le
\|f_n\|_2+\|f_m\|_2.
$$

任意の $\varepsilon>0$ に対し、$n,m\ge N$ なら $1/\sqrt n<\varepsilon/2$、$1/\sqrt m<\varepsilon/2$ となるよう $N$ を取れば

$$
\|f_n-f_m\|_2<\varepsilon.
$$

したがって $(f_n)$ は $L^2$-Cauchy である。
<!-- solution-end -->

## F0-00D2E-C01 Riesz--Fischer の完備性証明を再構成する

- Level: C
- 目安時間: 30分

$L^2(\mu)$ の Cauchy 列 $(f_n)$ から、次の順序で $L^2$ 極限 $f$ を構成せよ。

1. $\|f_{n_{k+1}}-f_{n_k}\|_2\le2^{-k}$ となる部分列を選ぶ。
2. $g_k=|f_{n_{k+1}}-f_{n_k}|$、$G_N=\sum_{k=1}^N g_k$ と置き、$G:=\sum_{k\ge1}g_k\in L^2$ を示す。
3. $f_{n_k}$ が a.e. で収束する可測関数 $f$ を作る。
4. $\|f_{n_k}-f\|_2\to0$ を示す。
5. 元の列全体 $f_n$ も $f$ へ $L^2$ 収束することを示す。

<!-- solution-start -->
### 詳細解答

Cauchy 性を $\varepsilon=2^{-k}$ に適用し、単調増加な閾値 $N_k$ を取る。$n_k\ge N_k$ かつ $n_{k+1}>n_k$ となるよう部分列を選べば

$$
\|f_{n_{k+1}}-f_{n_k}\|_2\le2^{-k}.
$$

$$
g_k:=|f_{n_{k+1}}-f_{n_k}|,
\qquad
G_N:=\sum_{k=1}^N g_k
$$

と置く。Minkowski により

$$
\|G_N\|_2
\le
\sum_{k=1}^N\|g_k\|_2
\le
\sum_{k=1}^N2^{-k}
<1.
$$

$G_N\uparrow G:=\sum_{k\ge1}g_k$ なので $G_N^2\uparrow G^2$。MCT から

$$
\int G^2d\mu
=
\lim_N\int G_N^2d\mu
\le1.
$$

したがって $G\in L^2$ であり、$G<\infty$ a.e. である。

その点では、$m>k$ に対して

$$
|f_{n_m}-f_{n_k}|
\le
\sum_{j=k}^{m-1}g_j,
$$

右辺は収束級数の尾だから0へ行く。よって $(f_{n_k})$ は各点で Cauchy となり、実数の完備性から a.e. で極限を持つ。$A=\{G<\infty\}$ 上でその極限を $f$ とし、$A^c$ で0と置く。$A$ は可測であり、$A$ 上の極限は可測関数列の $\limsup$ に一致する。したがって $A$ と $A^c$ 上で可測関数を貼り合わせた $f$ は可測である。

次に

$$
H_k:=\sum_{j=k}^{\infty}g_j
$$

と置く。有限尾部 $H_{k,M}=\sum_{j=k}^M g_j$ へ Minkowski を適用し、MCT で $M\to\infty$ とすれば

$$
\|H_k\|_2
\le
\sum_{j=k}^{\infty}\|g_j\|_2
\le
2^{1-k}.
$$

また a.e. で

$$
|f_{n_k}-f|\le H_k,
$$

したがって

$$
\|f_{n_k}-f\|_2
\le
\|H_k\|_2
\le
2^{1-k}\to0.
$$

この評価と $f_{n_k}\in L^2$ から三角不等式で $f\in L^2$ も従う。

最後に任意の $\varepsilon>0$ を取る。Cauchy 性から、$m,n\ge N$ なら

$$
\|f_n-f_m\|_2<\varepsilon/2
$$

となる $N$ がある。十分大きい $k$ を選び、$n_k\ge N$ かつ

$$
\|f_{n_k}-f\|_2<\varepsilon/2
$$

とする。すると $n\ge N$ に対して

$$
\|f_n-f\|_2
\le
\|f_n-f_{n_k}\|_2
+
\|f_{n_k}-f\|_2
<
\varepsilon.
$$

よって元の列全体も $f$ へ $L^2$ 収束する。これで $L^2$ の完備性が示された。
<!-- solution-end -->

---

## 10. この系列の到達点

D2系列で

```text
測度・可測関数
 ↓
Lebesgue積分
 ↓
収束定理
 ↓
積測度・反復積分
 ↓
Lpノルム
 ↓
L2完備性
```

まで床がつながりました。

ここから標準ルートはベクトル空間・直交・スペクトル理論へ進めます。確率論へ進む読者は、期待値をLebesgue積分、確率変数を可測関数として読み直せます。

---

## 定義の確認：有限次元Hilbert空間で4定義を一周する

<!-- definition-example-start: def-f0-00d2e-01, def-f0-00d2e-02, def-f0-00d2e-03, def-f0-00d2e-04 -->
**定義の確認**

$V=\mathbb R^2$、$x_n=(1/n,0)$ とします。$m,n\ge N$ なら

$$
\|x_m-x_n\|_2=|1/m-1/n|\le1/N,
$$

なので $(x_n)$ はCauchy列です。$\mathbb R^2$ はEuclidノルムについて完備なのでBanach空間です。

標準内積

$$
\langle x,y\rangle=x_1y_1+x_2y_2
$$

は $\|x\|_2=\sqrt{\langle x,x\rangle}$ を誘導し、このノルムについて $\mathbb R^2$ は完備です。したがって同じ例で、内積とHilbert空間の定義も確認できます。$L^2$ では有限和が積分へ置き換わるだけで、定義の構造は同じです。
<!-- definition-example-end -->
