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

---

## 1. Cauchy列と完備性の復習

### 定義（ノルム空間のCauchy列）

ノルム空間 $(V,\|\cdot\|)$ の点列 $(x_n)$ が **Cauchy列** であるとは、任意の $\varepsilon>0$ に対してある $N$ が存在し、$m,n\ge N$ なら

$$
\|x_n-x_m\|<\varepsilon
$$

となることをいう。

### 定義（Banach空間）

ノルム空間 $(V,\|\cdot\|)$ が **Banach空間** であるとは、その任意のCauchy列が $V$ のある元へノルム収束することをいう。

D2Eでは $V=L^2(\mu)$ についてこれを証明します。

---

## 2. $L^2$の内積

### 定義（$L^2$内積）

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

---

## 3. Hilbert空間

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

---

## 4. なぜ普通の点wise収束だけでは足りないのか

$L^2$ のCauchy性は

$$
\int|f_n-f_m|^2d\mu\to0
$$

という「平均二乗の近さ」です。

これは各点 $\omega$ で $(f_n(\omega))$ がCauchyであることを直接意味しません。

そこで、元のCauchy列から **非常に速く近づく部分列** を選び、差分の絶対値和がa.e.で有限になることを示します。

この「速い部分列 → a.e.収束 → $L^2$収束」が証明の核心です。

---

## 5. Riesz--Fischer型の完備性証明

### 定理（$L^2$の完備性）

任意の測度空間 $(\Omega,\mathcal F,\mu)$ に対して、$L^2(\mu)$ はノルム $\|\cdot\|_2$ について完備である。

<!-- proof-start -->
### 証明

$(f_n)$ を $L^2(\mu)$ のCauchy列とします。

#### Step 1：速く近づく部分列を取る

Cauchy性から、帰納的に部分列 $(f_{n_k})$ を選んで

$$
\boxed{
\|f_{n_{k+1}}-f_{n_k}\|_2
\le
2^{-k}
}
$$

とできます。

差分の絶対値を

$$
g_k
:=
|f_{n_{k+1}}-f_{n_k}|
$$

と置きます。

#### Step 2：差分級数の部分和を評価する

$$
G_N
:=
\sum_{k=1}^N g_k
$$

と置きます。Minkowskiの不等式より

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

$G_N^2\uparrow G^2$ なので、D2BのMCTより

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

したがって数列 $(f_{n_k}(\omega))$ は絶対収束する差分級数を持つのでCauchy、よって実数の完備性からある値 $f(\omega)$ へ収束します。

零集合上では例えば $f(\omega)=0$ と定めます。すると $f$ は可測関数です。

#### Step 4：部分列は$L^2$でも$f$へ収束する

尾部を

$$
H_k
:=
\sum_{j=k}^{\infty}g_j
$$

と置きます。a.e.で

$$
|f_{n_k}-f|
\le
H_k.
$$

有限部分和にMinkowskiを使って極限を取れば

$$
\|H_k\|_2
\le
\sum_{j=k}^{\infty}\|g_j\|_2
\le
\sum_{j=k}^{\infty}2^{-j}
=2^{1-k}.
$$

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

## 6. 系：$L^2$はHilbert空間

### 系（$L^2$のHilbert性）

任意の測度空間 $(\Omega,\mathcal F,\mu)$ に対して、内積

$$
\langle f,g\rangle=\int fg\,d\mu
$$

を備えた $L^2(\mu)$ はHilbert空間である。

<!-- proof-start -->
#### 証明

内積が誘導するノルムは $\|f\|_2$。上の定理でこのノルムについて完備であることを示したので、Hilbert空間の定義を満たします。$\square$
<!-- proof-end -->

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

### 本番答案

$\langle f,f\rangle=1/3$、$\|f\|_2=1/\sqrt3$。

### 採点基準（20点）

- 内積: 8点
- ノルム: 8点
- 恒等式: 4点
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

Cauchy性より、各 $k$ に対してある $N_k$ が存在し、$m,n\ge N_k$ なら距離が $2^{-k}$ 以下になります。$n_{k+1}>n_k$ かつ $n_k,n_{k+1}\ge N_k$ となるよう帰納的に選べばよい。

### 本番答案

Cauchy性を $\varepsilon=2^{-k}$ に適用し、各段階で十分後ろの添字を帰納的に選ぶ。

### 採点基準（20点）

- Cauchy性利用: 8点
- $\varepsilon=2^{-k}$: 5点
- 帰納的選択: 7点
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

収束級数のtailは0へ行くから点wise Cauchy。実数の完備性により収束する。

### 本番答案

差分級数が絶対収束する点では、そのtailが $|f_{n_m}-f_{n_k}|$ を支配するので点wise Cauchy。$\mathbb R$ の完備性から収束。

### 採点基準（20点）

- telescoping: 6点
- tail評価: 7点
- Cauchy: 4点
- 実数完備性: 3点
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

### 本番答案

Cauchy性と収束部分列を三角不等式で接続すれば全列も同じ極限へ収束する。

### 採点基準（20点）

- Cauchy評価: 6点
- 部分列収束: 5点
- 三角不等式: 6点
- 結論: 3点
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

### 本番答案

Cauchy--Schwarzで $E|XY|\le\|X\|_2\|Y\|_2<\infty$。平均0なら $\operatorname{Var}(X)=E[X^2]=\|X\|_2^2$。

### 採点基準（20点）

- Cauchy--Schwarz: 8点
- 内積有限: 4点
- 分散式: 6点
- 結論: 2点
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
