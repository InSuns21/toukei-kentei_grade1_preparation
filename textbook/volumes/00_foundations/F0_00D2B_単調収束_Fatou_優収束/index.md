# F0-00D2B 補講：単調収束定理・Fatouの補題・優収束定理

D2AでLebesgue積分を定義しました。次に必要なのは、関数列の極限と積分をどう交換するかです。

この講義の論理線は

```text
単調収束定理（Monotone Convergence Theorem; MCT）
 ↓
Fatouの補題（Fatou's lemma）
 ↓
Lebesgueの優収束定理（Dominated Convergence Theorem; DCT）
```

です。以後、このページでは **MCT**、**DCT** という略称を使います。

「極限と積分を交換してよい」という結論だけ覚えるのではなく、**なぜ各定理の仮定が違うのか**まで理解します。

## 0. まず「点ごとに収束したから積分も収束」は偽だと知る

$[0,1]$ 上で

$$
f_n(x)=n1_{(0,1/n)}(x)
$$

を考えます。各 $x>0$ では十分大きい $n$ で $f_n(x)=0$ なので

$$
f_n\to0\quad\text{a.e.}
$$

です。ここで **a.e.** は *almost everywhere*（ほとんど至る所）の略で、「測度0の例外を除いて成り立つ」という意味です。

しかし面積は高さ $n$ × 幅 $1/n$ なので

$$
\int_0^1 f_n(x)\,dx=1
$$

のままです。したがって

$$
\lim_n\int f_n=1
\ne
0=\int\lim_n f_n.
$$

つまり極限と積分の交換には追加条件が必要です。

この講義の三定理は、その追加条件を別々の形で与えます。

| 定理 | 何を保証に使うか |
|---|---|
| MCT | 非負で下から単調増加 |
| Fatou | 非負性だけを残し、等号ではなく下からの不等式 |
| DCT | 単調性の代わりに一つの可積分な支配関数 |

最初にこの失敗例を持っておくと、仮定が単なる技術条件ではないことが分かります。

---

<a id="ref-limit-integral-exchange"></a>

## 1. 単調収束定理

<!-- formal-statement-start -->
### 定理（単調収束定理 / Monotone Convergence Theorem; MCT）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の非負可測関数列 $(f_n)_{n\ge1}$ が

$$
0\le f_1(\omega)\le f_2(\omega)\le\cdots
$$

を全ての $\omega\in\Omega$ について満たし、

$$
f(\omega)=\lim_{n\to\infty}f_n(\omega)
$$

と定める。このとき $f$ は非負可測であり、

$$
\boxed{
\lim_{n\to\infty}\int_\Omega f_n\,d\mu
=
\int_\Omega f\,d\mu
}
$$

が成り立つ。積分値は $\infty$ でもよい。
<!-- formal-statement-end -->

### 1.1 証明の見取り図

$f_n\le f$ なので

$$
\lim_n\int f_n\le\int f
$$

はすぐ出ます。難しいのは逆向きです。

そこで $f$ の下にある任意の単関数 $\phi$ を固定し、$f_n$ が最終的に $\alpha\phi$ を覆う部分を増やしていきます。測度の下からの連続性で

$$
\int f_n\gtrsim \alpha\int\phi
$$

を得て、最後に $\alpha\uparrow1$、さらに全ての $\phi\le f$ の supremum を取ります。

つまり **一般の $f$ を直接つかまず、Lebesgue積分の定義である単関数近似へ戻る** のが核心です。

<!-- proof-start -->
### 証明

$f_n\le f$ なのでLebesgue積分の単調性より

$$
\int f_n\,d\mu\le\int f\,d\mu.
$$

したがって

$$
L:=\lim_{n\to\infty}\int f_n\,d\mu
$$

は存在し、$L\le\int f$ です。逆向きの不等式を示します。

任意の非負単関数 $\phi$ で

$$
0\le\phi\le f
$$

を満たすものを固定し、$0<\alpha<1$ を取ります。

$$
E_n
:=
\{\omega:f_n(\omega)\ge\alpha\phi(\omega)\}
$$

と置きます。$f_n$ は単調増加なので

$$
E_1\subset E_2\subset\cdots.
$$

また $\phi(\omega)>0$ なら $f_n(\omega)\uparrow f(\omega)\ge\phi(\omega)$ なので、十分大きい $n$ で $f_n(\omega)\ge\alpha\phi(\omega)$ となります。したがって

$$
\bigcup_{n=1}^\infty E_n
\supset
\{\phi>0\}.
$$

$E_n$ 上では $f_n\ge\alpha\phi$ なので

$$
\int f_n\,d\mu
\ge
\alpha\int_{E_n}\phi\,d\mu.
$$

$\phi=\sum_{k=1}^m a_k1_{A_k}$ と書けば

$$
\int_{E_n}\phi\,d\mu
=
\sum_{k=1}^m a_k\mu(A_k\cap E_n).
$$

D2の測度の下からの連続性より、$E_n\uparrow\{\phi>0\}$ 上で

$$
\mu(A_k\cap E_n)\uparrow\mu(A_k),
$$

したがって

$$
\int_{E_n}\phi\,d\mu
\to
\int\phi\,d\mu.
$$

よって

$$
L\ge\alpha\int\phi\,d\mu.
$$

$\alpha\uparrow1$ とすれば

$$
L\ge\int\phi\,d\mu.
$$

これは任意の $0\le\phi\le f$ なる単関数について成り立つため、Lebesgue積分の定義から

$$
L\ge\int f\,d\mu.
$$

すでに逆向き $L\le\int f$ を得ているので等号です。$\square$
<!-- proof-end -->

### 例1：$x^n$ の積分

$[0,1]$ 上で

$$
f_n(x)=1-x^n
$$

とすると $0\le f_n\uparrow1_{[0,1)}$。MCTより

$$
\int_0^1(1-x^n)\,dx
\to
\int_0^1 1\,dx=1.
$$

実際左辺は $1-1/(n+1)$ です。

---

## 2. Fatouの補題

単調でない非負関数列でも、下からの評価は残せます。

<a id="def-f0-00d2b-01"></a>
 
<!-- formal-statement-start -->
### 定義（点ごとのliminf）

実数列 $(a_n)$ に対して

$$
\liminf_{n\to\infty}a_n
:=
\lim_{n\to\infty}\inf_{k\ge n}a_k.
$$

関数列では各 $\omega$ ごとにこの定義を適用します。
<!-- formal-statement-end -->

### 2.1 直感：単調でない列から「単調な下側包絡」を作る

元の $f_n$ が上下に振動していても、

$$
g_n=\inf_{k\ge n}f_k
$$

と置けば

$$
g_1\le g_2\le\cdots
$$

という単調増加列になります。

しかも極限は

$$
g_n\uparrow\liminf f_n.
$$

したがってFatouは「振動する列を liminf という単調な下側近似へ変換し、MCTを使う定理」と読めます。

<a id="lem-f0-00d2b-01"></a>
 
<!-- formal-statement-start -->
### 補題（Fatouの補題 / Fatou's lemma）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の非負可測関数列 $(f_n)$ に対して

$$
\boxed{
\int_\Omega \liminf_{n\to\infty}f_n\,d\mu
\le
\liminf_{n\to\infty}
\int_\Omega f_n\,d\mu
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 2.2 証明の見取り図

1. $g_n=\inf_{k\ge n}f_k$ を作る。
2. $g_n\uparrow\liminf f_n$ なのでMCT。
3. $g_n\le f_k$ $(k\ge n)$ から積分も下から抑える。
4. $n\to\infty$ で liminf が現れる。

Fatouは独立の巨大定理というより、MCTを使える形へ列を加工した結果です。

<!-- proof-start -->
### 証明

$$
g_n(\omega)
:=
\inf_{k\ge n}f_k(\omega)
$$

と置きます。$g_n$ は非負可測で

$$
g_1\le g_2\le\cdots,
\qquad
g_n\uparrow\liminf_{n\to\infty}f_n.
$$

MCTより

$$
\int\liminf f_n\,d\mu
=
\lim_{n\to\infty}\int g_n\,d\mu.
$$

一方、任意の $k\ge n$ について $g_n\le f_k$ なので

$$
\int g_n\,d\mu
\le
\inf_{k\ge n}\int f_k\,d\mu.
$$

$n\to\infty$ とすれば

$$
\int\liminf f_n\,d\mu
\le
\lim_{n\to\infty}\inf_{k\ge n}\int f_k\,d\mu
=
\liminf_{n\to\infty}\int f_n\,d\mu.
$$

$\square$
<!-- proof-end -->

### 例2：等号にならないFatou

$[0,1]$ 上で

$$
f_n(x)=n\,1_{(0,1/n)}(x)
$$

とします。各 $n$ で

$$
\int_0^1f_n(x)\,dx=1.
$$

しかし各 $x>0$ について十分大きい $n$ では $x\notin(0,1/n)$ なので $f_n(x)=0$。したがって $f_n\to0$ a.e. で

$$
\int\liminf f_n=0
<1=\liminf\int f_n.
$$

Fatouは一般には等号ではありません。

---

## 3. 優収束定理

単調性を失っても、「全てを一つの可積分関数が支配する」なら積分と極限を交換できます。

### 3.1 直感：支配関数は「質量が細い場所へ逃げて集中する」のを防ぐ

冒頭の反例 $n1_{(0,1/n)}$ は、高さがどんどん大きくなるため、一つの可積分関数では全てを支配できません。

DCTの条件

$$
|f_n|\le g,\qquad \int g<\infty
$$

は、関数列の質量が無限に高いスパイクとして逃げるのを一つの積分可能な天井で抑えます。

単調性がなくてもこの天井があれば、点ごとの収束を $L^1$ 収束まで強められます。ここで **$L^1$ 収束**とは、$\int|f_n-f|\,d\mu\to0$ となる収束です。

<a id="thm-f0-00d2b-01"></a>
 
<!-- formal-statement-start -->
### 定理（Lebesgueの優収束定理 / Dominated Convergence Theorem; DCT）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の可測関数列 $(f_n)$ と可測関数 $f$ が

$$
f_n\to f\quad\text{a.e.}
$$

を満たすとする。さらに、ある可積分関数 $g:\Omega\to[0,\infty)$ が存在し、全ての $n$ について

$$
|f_n|\le g\quad\text{a.e.}
$$

が成り立つとする。このとき $f$ は可積分で

$$
\boxed{
\int_\Omega |f_n-f|\,d\mu\to0
}
$$

したがって

$$
\boxed{
\int_\Omega f_n\,d\mu
\to
\int_\Omega f\,d\mu
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 3.2 証明の見取り図

$|f_n-f|\to0$ を示したいので、それを直接DCTに使うのではなくFatouへ戻します。

$$
0\le 2g-|f_n-f|
$$

という非負関数を作ると、Fatouの不等式を整理するだけで

$$
\limsup_n\int|f_n-f|\le0
$$

が出ます。

つまり証明の依存関係は

```text
MCT
 ↓
Fatou
 ↓
DCT
```

そのものです。

<!-- proof-start -->
### 証明

$f_n\to f$ a.e. かつ $|f_n|\le g$ a.e. なので、極限を取って

$$
|f|\le g\quad\text{a.e.}
$$

したがって $f$ は可積分です。

また

$$
|f_n-f|\le |f_n|+|f|\le2g
$$

a.e. なので

$$
2g-|f_n-f|\ge0.
$$

Fatouの補題を非負関数列 $2g-|f_n-f|$ に適用すると

$$
\int\liminf_{n\to\infty}\left(2g-|f_n-f|\right)d\mu
\le
\liminf_{n\to\infty}\int\left(2g-|f_n-f|\right)d\mu.
$$

$f_n\to f$ a.e. より左辺は $2\int g$。右辺は

$$
2\int g
-
\limsup_{n\to\infty}\int|f_n-f|\,d\mu.
$$

したがって

$$
2\int g
\le
2\int g
-
\limsup_{n\to\infty}\int|f_n-f|\,d\mu,
$$

よって

$$
\limsup_{n\to\infty}\int|f_n-f|\,d\mu\le0.
$$

積分は非負なので

$$
\int|f_n-f|\,d\mu\to0.
$$

最後に

$$
\left|\int f_n\,d\mu-\int f\,d\mu\right|
\le
\int|f_n-f|\,d\mu\to0.
$$

$\square$
<!-- proof-end -->

### 例3：$x^n$ にDCTを使う

$[0,1]$ 上で $f_n(x)=x^n$ とします。$x\in[0,1)$ では $x^n\to0$、$x=1$ では1ですが、一点集合は測度0なので

$$
f_n\to0\quad\text{a.e.}
$$

また $0\le x^n\le1$ で、$g=1$ は可積分。DCTより

$$
\int_0^1x^n\,dx\to0.
$$

---

## 4. どの定理を使うか

| 状況 | まず考える定理 |
|---|---|
| $0\le f_n\uparrow f$ | MCT |
| 非負だが単調性なし、下から評価したい | Fatou |
| $f_n\to f$ a.e. で一つの可積分 $g$ が支配 | DCT |

DCTは便利ですが、「支配関数 $g$ がある」という条件は本質的です。

---

## 4.1 三定理を一つの絵で覚える

```text
非負 + 単調増加
   └─ MCT: 等号で極限交換

非負だけ
   └─ Fatou: 下からの不等式だけ残る

符号あり・単調でない
   + 可積分な共通上界
   └─ DCT: L1収束まで得る
```

「どの定理名だったか」より、**何が極限交換を安全にしているか**を先に見ます。

## 5. DCTの仮定がないと何が起きるか

再び

$$
f_n(x)=n1_{(0,1/n)}(x)
$$

を考えます。$f_n\to0$ a.e. ですが

$$
\int_0^1f_n=1
$$

なので積分は0へ収束しません。

この列を一つの可積分関数 $g$ で支配することはできません。もし $g\ge f_n$ なら、$x\in(1/(n+1),1/n)$ 付近で $g(x)$ は少なくとも $n$ 程度必要となり、0近傍で積分不能になります。

---

# 6. 演習

## F0-00D2B-A01 MCTの適用

- Level: A
- 目安時間: 8分

$[0,1]$ 上で $f_n=1-x^n$ とする。MCTの仮定を確認し、積分の極限を求めよ。

<!-- solution-start -->
### 詳細解答

$0\le1-x^n\le1-x^{n+1}$ なので単調増加。$x\in[0,1)$ で $x^n\to0$、$x=1$ でも $f_n(1)=0$ なので極限は $1_{[0,1)}$。MCTより

$$
\lim_n\int_0^1(1-x^n)dx
=
\int_0^11_{[0,1)}dx=1.
$$

### 本番答案

$f_n\uparrow1_{[0,1)}$ かつ非負なのでMCTより積分極限は1。

### 採点基準（20点）

- 非負: 4点
- 単調性: 6点
- 点wise極限: 5点
- MCT適用と結論: 5点
<!-- solution-end -->

## F0-00D2B-A02 Fatouの不等式

- Level: A
- 目安時間: 8分

$f_n=n1_{(0,1/n)}$ についてFatouの補題の両辺を計算せよ。

<!-- solution-start -->
### 詳細解答

$f_n\to0$ a.e. なので左辺は0。各 $n$ で $\int f_n=1$ なので右辺は1。したがって

$$
0\le1.
$$

### 本番答案

$\liminf f_n=0$ a.e. より左辺0。$\int f_n=1$ より右辺1。

### 採点基準（20点）

- a.e.極限: 8点
- 左辺: 4点
- 右辺: 4点
- 結論: 4点
<!-- solution-end -->

## F0-00D2B-B01 DCTで極限交換

- Level: B
- 目安時間: 12分

$$
f_n(x)=\frac{x}{1+nx}
\qquad(0\le x\le1)
$$

について、DCTを用いて $\lim_n\int_0^1f_n(x)dx$ を求めよ。

<!-- solution-start -->
### 詳細解答

$x>0$ では $f_n(x)\to0$、$x=0$ でも0。さらに

$$
0\le f_n(x)\le x\le1.
$$

$g(x)=x$ は $[0,1]$ 上可積分なのでDCTより

$$
\lim_n\int_0^1f_n(x)dx
=
\int_0^10dx=0.
$$

### 本番答案

$f_n\to0$ pointwise、$|f_n|\le x$ で $x\in L^1([0,1])$。DCTより極限は0。

### 採点基準（20点）

- 点wise極限: 5点
- 支配関数: 7点
- 可積分性: 4点
- DCTと結論: 4点
<!-- solution-end -->

## F0-00D2B-B02 MCTかDCTか

- Level: B
- 目安時間: 15分

$[0,1]$ 上で次の2列について、MCTとDCTのどちらが自然か理由とともに答えよ。

1. $f_n(x)=1-e^{-nx}$
2. $g_n(x)=x^n$

<!-- solution-start -->
### 詳細解答

1. $f_n$ は非負で $n$ とともに増加し、$x>0$ で1へ収束するのでMCTが自然。
2. $g_n$ は非負だが $n$ とともに減少するためMCTの形ではない。$0\le g_n\le1$、$g_n\to0$ a.e. なのでDCTが自然。

### 本番答案

$f_n$: 非負単調増加なのでMCT。$g_n$: 単調減少だが $|g_n|\le1\in L^1$ かつa.e.で0へ収束するのでDCT。

### 採点基準（20点）

- 1の単調性: 5点
- MCT選択: 4点
- 2の支配: 5点
- DCT選択: 4点
- 説明: 2点
<!-- solution-end -->

## F0-00D2B-B03 $L^1$収束まで示す

- Level: B
- 目安時間: 15分

DCTの仮定の下で、単に $\int f_n\to\int f$ だけでなく

$$
\int|f_n-f|\,d\mu\to0
$$

が成り立つ理由を説明せよ。

<!-- solution-start -->
### 詳細解答

$f_n\to f$ a.e. かつ $|f_n|\le g$ なら $|f|\le g$ a.e.。したがって

$$
|f_n-f|\le2g,
$$

かつ $|f_n-f|\to0$ a.e.。$2g$ は可積分なのでDCTを $|f_n-f|$ に適用して結論を得る。

### 本番答案

$|f|\le g$ a.e. より $|f_n-f|\le2g\in L^1$、かつ $|f_n-f|\to0$ a.e.。DCTより $\int|f_n-f|\to0$。

### 採点基準（20点）

- $|f|\le g$: 5点
- $2g$支配: 6点
- a.e.収束: 4点
- DCT適用: 5点
<!-- solution-end -->

## F0-00D2B-C01 極限交換が失敗する列

- Level: C
- 目安時間: 20分

$[0,1]$ 上で $f_n\to0$ a.e. だが

$$
\int_0^1f_n\,dx=1
$$

となる非負関数列を構成し、なぜDCTを適用できないか説明せよ。

<!-- solution-start -->
### 詳細解答

$$
f_n(x)=n1_{(0,1/n)}(x)
$$

とすればよい。各 $x>0$ では十分大きい $n$ で $x\ge1/n$ なので $f_n(x)=0$。$x=0$ も区間に含めなければ0。したがってa.e.で0へ収束。

一方

$$
\int_0^1f_n=n\cdot\frac1n=1.
$$

もし一つの可積分 $g$ が全ての $f_n$ を支配したなら、0近傍で任意に大きな値を必要とする。実際 $x\in(1/(n+1),1/n)$ では $f_n(x)=n$ なので $g(x)\ge n$。この下界は0近傍で概ね $1/x$ 型となり可積分でない。よってDCTの支配条件を満たせない。

### 本番答案

$f_n=n1_{(0,1/n)}$ とすれば $f_n\to0$ a.e. だが $\int f_n=1$。DCTが成立すれば積分も0へ行くはずなので、可積分な共通支配関数は存在しない。実際0近傍で $g\gtrsim1/x$ が必要となる。

### 採点基準（20点）

- 構成: 6点
- a.e.収束: 5点
- 積分1: 4点
- DCT不適用理由: 5点
<!-- solution-end -->

---

## 7. 次に進む

ここまでは一つの測度空間上の積分でした。次は2つの測度空間を組み合わせ、

$$
\int_X\int_Y f(x,y)\,d\nu(y)d\mu(x)
$$

を正当化します。

**次：F0-00D2C 積測度・Tonelli・Fubini**
