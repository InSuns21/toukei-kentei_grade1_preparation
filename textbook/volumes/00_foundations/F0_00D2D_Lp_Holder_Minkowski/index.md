# F0-00D2D 補講：$L^p$空間・Hölderの不等式・Minkowskiの不等式

Lebesgue積分を使うと、関数の「大きさ」を積分で測れます。この講義では、その大きさをノルムにして関数空間を作ります。

中心線は

```text
a.e.同値類
 ↓
L^p
 ↓
Youngの不等式
 ↓
Hölderの不等式
 ↓
Minkowskiの不等式
 ↓
L^pがノルム空間になる
```

です。

## 0. まず有限個の値で見る：$L^p$ はベクトルのノルムの連続版

### 0.1 具体例：二点空間なら普通の $\ell^p$ と同じ

$\Omega=\{1,2\}$ に数え上げ測度を入れ、

$$
f(1)=3,
\qquad
f(2)=4
$$

とします。このとき

$$
\|f\|_1=|3|+|4|=7,
$$

$$
\|f\|_2=\sqrt{3^2+4^2}=5,
$$

$$
\|f\|_\infty=4.
$$

つまり $L^p$ は、有限次元ベクトル

$$
(3,4)
$$

の $\ell^p$ ノルムで「成分の和」をしていたところを、一般の測度空間で「積分」に置き換えたものです。

### 0.2 意味：$p$ によって何を重く見るか

| ノルム | ざっくりした見方 | 統計・解析での典型 |
|---|---|---|
| $L^1$ | 絶対量をそのまま足す | 絶対誤差、可積分性 |
| $L^2$ | 大きい誤差を二乗で強く罰する | 分散、最小二乗、Hilbert空間 |
| $L^\infty$ | 最悪点だけを見る | 一様誤差、本質的上限 |

この章でHölderやMinkowskiを証明する理由は、不等式を増やすためではありません。

- **Hölder**：積 $fg$ を積分してよいことを保証する。
- **Minkowski**：$\|f+g\|_p\le\|f\|_p+\|g\|_p$ を保証し、$L^p$ を本当にノルム空間にする。

という役割があります。

---

## 1. なぜ関数をa.e.で同一視するのか

D2Aで、可積分関数 $f,g$ が

$$
f=g\quad\text{a.e.}
$$

なら積分値が同じになることを示しました。

さらに

$$
\int |f-g|^p\,d\mu=0
$$

なら $f=g$ a.e. です。したがって、積分で関数の距離を測るなら、測度0集合上だけ違う関数を別物として扱う理由がありません。

<!-- formal-statement-start -->
### 定義（a.e.同値関係）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の可測関数 $f,g$ に対して

$$
f\sim g
\quad\Longleftrightarrow\quad
f=g\ \text{a.e.}
$$

と定める。この同値関係による同値類を $[f]$ と書く。

以後、通常は同値類 $[f]$ を単に $f$ と書きます。
<!-- formal-statement-end -->

---

## 2. $L^p$空間

<!-- formal-statement-start -->
### 定義（$L^p$空間、$1\le p<\infty$）

測度空間 $(\Omega,\mathcal F,\mu)$ と $1\le p<\infty$ に対して、

$$
L^p(\mu)
:=
\left\{
[f]:f\text{ は可測で }\int_\Omega|f|^p\,d\mu<\infty
\right\}
$$

と定義する。

$f\in L^p(\mu)$ に対して

$$
\boxed{
\|f\|_p
:=
\left(\int_\Omega|f|^p\,d\mu\right)^{1/p}
}
$$

と置く。
<!-- formal-statement-end -->

<!-- formal-statement-start -->
### 定義（$L^\infty$と本質的上限）

可測関数 $f$ に対して

$$
\|f\|_\infty
:=
\inf\{M\ge0:|f|\le M\ \text{a.e.}\}
$$

を **本質的上限** といい、$\|f\|_\infty<\infty$ となるa.e.同値類全体を $L^\infty(\mu)$ という。

通常のsupremumと違い、測度0集合上の巨大な値を無視します。
<!-- formal-statement-end -->

### 例1：一点だけ変更しても$L^p$では同じ

$[0,1]$ 上で

$$
f(x)=0,
\qquad
g(x)=
\begin{cases}
10^9,&x=1/2,\\
0,&x\ne1/2
\end{cases}
$$

なら $f=g$ a.e. なので、全ての $1\le p\le\infty$ について同じ $L^p$ の元です。

---

## 3. Youngの不等式

### 3.1 なぜYoungの不等式を先に置くのか

Hölderでは積 $|fg|$ を扱いたいのですが、$f$ と $g$ は別々の $L^p,L^q$ 情報しか持っていません。そこでYoungの不等式を使い、**積を $p$ 乗と $q$ 乗の和へ分解**します。

<pre>
積 ab
  ↓ Young
p乗の項 + q乗の項
  ↓ 積分
L^p ノルム + L^q ノルム
</pre>

Youngは、Hölderを作るための「積を分離する部品」と読めば位置付けが明確です。

### 3.2 具体例：$p=q=2$ なら平方完成の不等式

$p=q=2$ では

$$
ab\le\frac{a^2}{2}+\frac{b^2}{2}
$$

です。これは

$$
0\le(a-b)^2
$$

を展開したものと同値です。一般のYoungは、この二乗の場合を共役指数 $p,q$ へ広げた形だと考えられます。

Hölderの証明に使うスカラー不等式を先に証明します。

<!-- formal-statement-start -->
### 補題（Youngの不等式）

実数 $p,q>1$ が

$$
\frac1p+\frac1q=1
$$

を満たすとする。このとき任意の $a,b\ge0$ に対して

$$
\boxed{
ab
\le
\frac{a^p}{p}+
\frac{b^q}{q}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定した $b\ge0$ に対して

$$
\varphi(a)=\frac{a^p}{p}-ab+\frac{b^q}{q}
$$

と置きます。

$$
\varphi'(a)=a^{p-1}-b.
$$

最小点は

$$
a=b^{1/(p-1)}=b^{q-1}
$$

です。この点で

$$
a^p=b^q,
\qquad
ab=b^q,
$$

なので

$$
\varphi(a)
=b^q\left(\frac1p-1+\frac1q\right)=0.
$$

したがって $\varphi(a)\ge0$ で、Youngの不等式が従います。$\square$
<!-- proof-end -->

---

## 4. Hölderの不等式

<!-- formal-statement-start -->
### 定理（Hölderの不等式）

測度空間 $(\Omega,\mathcal F,\mu)$ と $p,q>1$ が

$$
\frac1p+\frac1q=1
$$

を満たすとする。$f\in L^p(\mu)$、$g\in L^q(\mu)$ なら $fg\in L^1(\mu)$ であり、

$$
\boxed{
\int_\Omega|fg|\,d\mu
\le
\|f\|_p\|g\|_q
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 4.1 証明の見取り図

Hölderの証明は正規化が核心です。

1. $F=|f|/\|f\|_p$、$G=|g|/\|g\|_q$ として、それぞれの $p$ 乗・$q$ 乗積分を1にする。
2. 各点でYoungを使い、$FG\le F^p/p+G^q/q$ とする。
3. 積分すると右辺は $1/p+1/q=1$。
4. 最後にノルムを掛け戻す。

つまり **正規化 → 点wise不等式 → 積分 → 元へ戻す** という一つの型です。

<!-- proof-start -->
### 証明

$\|f\|_p=0$ または $\|g\|_q=0$ なら一方がa.e.で0なので自明です。両方正とします。

$$
F=\frac{|f|}{\|f\|_p},
\qquad
G=\frac{|g|}{\|g\|_q}
$$

と置けば

$$
\int F^p\,d\mu=1,
\qquad
\int G^q\,d\mu=1.
$$

Youngの不等式から各点で

$$
FG
\le
\frac{F^p}{p}+\frac{G^q}{q}.
$$

積分して

$$
\int FG\,d\mu
\le
\frac1p\int F^p\,d\mu+\frac1q\int G^q\,d\mu
=
\frac1p+\frac1q=1.
$$

両辺に $\|f\|_p\|g\|_q$ を掛ければ結論です。$\square$
<!-- proof-end -->

### 4.2 具体例：$[0,1]$ 上で本当に積が抑えられる

$[0,1]$ 上で $p=q=2$、$f(x)=1$、$g(x)=x$ とすると

$$
\int_0^1|f(x)g(x)|\,dx
=\frac12.
$$

一方

$$
\|f\|_2=1,
\qquad
\|g\|_2=\frac1{\sqrt3},
$$

なのでHölder（この場合はCauchy--Schwarz）は

$$
\frac12
\le
\frac1{\sqrt3}
$$

を与えます。

重要なのは数値評価そのものより、$f\in L^2$ と $g\in L^2$ から **積 $fg$ が $L^1$ に入る**ことまで保証される点です。

<!-- formal-statement-start -->
### 系（Cauchy--Schwarz）

$p=q=2$ とすれば

$$
\boxed{
\int|fg|\,d\mu
\le
\|f\|_2\|g\|_2
}
$$

を得ます。

後続のHilbert空間では、これを内積に対するCauchy--Schwarzとして読み直します。
<!-- formal-statement-end -->

---

## 5. Minkowskiの不等式

これで$\|\cdot\|_p$の三角不等式を証明できます。

<!-- formal-statement-start -->
### 定理（Minkowskiの不等式）

測度空間 $(\Omega,\mathcal F,\mu)$、$1\le p<\infty$、$f,g\in L^p(\mu)$ に対して

$$
\boxed{
\|f+g\|_p
\le
\|f\|_p+\|g\|_p
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 5.1 証明の見取り図

Minkowskiは「$L^p$ ノルムの三角不等式」そのものです。$p>1$ では

$$
|f+g|^p
=
|f+g|\,|f+g|^{p-1}
$$

を

$$
|f|\,|f+g|^{p-1}
+
|g|\,|f+g|^{p-1}
$$

で抑え、二つの積へHölderを使います。共役指数 $q=p/(p-1)$ を選ぶと

$$
(p-1)q=p
$$

となるため、残った項がちょうど $\|f+g\|_p^{p-1}$ に戻ります。

> **Hölderを一度使って、三角不等式を作る。**

これが証明の一行要約です。

<!-- proof-start -->
### 証明

$p=1$ では

$$
|f+g|\le|f|+|g|
$$

を積分すればよい。

$p>1$ とし、共役指数を

$$
q=\frac{p}{p-1}
$$

とします。$\|f+g\|_p=0$ なら自明なので正とします。

点wiseに

$$
|f+g|^p
\le
|f|\,|f+g|^{p-1}
+
|g|\,|f+g|^{p-1}.
$$

積分し、それぞれにHölderを使います。

$$
\int|f|\,|f+g|^{p-1}d\mu
\le
\|f\|_p
\left(
\int |f+g|^{(p-1)q}d\mu
\right)^{1/q}.
$$

$(p-1)q=p$ なので

$$
\left(
\int |f+g|^{(p-1)q}d\mu
\right)^{1/q}
=
\|f+g\|_p^{p-1}.
$$

同様に $g$ の項も評価すると

$$
\|f+g\|_p^p
\le
(\|f\|_p+\|g\|_p)
\|f+g\|_p^{p-1}.
$$

正の $\|f+g\|_p^{p-1}$ で割れば結論です。$\square$
<!-- proof-end -->

---

### 5.2 意味：なぜ $p\ge1$ なのか

Minkowskiが成り立つから、$\|\cdot\|_p$ は三角不等式を満たします。$0<p<1$ では一般に三角不等式が壊れるため、同じ式は通常の意味のノルムにはなりません。

したがって $1\le p$ という範囲は単なる慣習ではなく、**関数の大きさを距離・幾何として扱うための境界**です。

### 5.3 三つの不等式の役割を一枚で整理する

| 結果 | 何をする道具か | 次に何を作るか |
|---|---|---|
| Young | 点wiseの積を二つの冪へ分ける | Hölder |
| Hölder | $L^p$ と $L^q$ の積を $L^1$ で制御する | 内積・積分の正当化 |
| Minkowski | 和の $L^p$ 大きさを制御する | $L^p$ の三角不等式 |

この依存関係を見失わなければ、証明を折りたたんでも章全体の論理線は追えます。

---

## 6. $L^p$はノルム空間になる

<!-- formal-statement-start -->
### 定理（$L^p$ノルム）

測度空間 $(\Omega,\mathcal F,\mu)$ と $1\le p<\infty$ に対して、a.e.同値類上で

$$
\|f\|_p
=
\left(\int|f|^p\,d\mu\right)^{1/p}
$$

はノルムである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

非負性は明らか。$\|f\|_p=0$ なら $|f|^p=0$ a.e. なので $f=0$ a.e.、すなわち同値類として0です。

スカラー $c$ に対して

$$
\|cf\|_p
=|c|\|f\|_p.
$$

三角不等式はMinkowskiそのものです。したがってノルムの3条件を満たします。$\square$
<!-- proof-end -->

完備性はまだ示していません。D2Eで $L^2$ がこのノルムについて完備であることを証明します。

---

## 7. $x^{-a}$ で所属を判定する

$0<x<1$ で

$$
f(x)=x^{-a},
\qquad a>0
$$

とします。

$f\in L^p(0,1)$ である条件は

$$
\int_0^1x^{-ap}dx<\infty
$$

なので

$$
\boxed{ap<1}
$$

です。

例えば $a=1/3$ なら

- $f\in L^1$：$1/3<1$
- $f\in L^2$：$2/3<1$
- $f\notin L^4$：$4/3>1$

です。

---

## 8. 有限測度空間では高い$p$ほど強い

<!-- formal-statement-start -->
### 命題（有限測度空間上の包含）

測度空間 $(\Omega,\mathcal F,\mu)$ が $\mu(\Omega)<\infty$ を満たし、$1\le p<q<\infty$ とする。このとき

$$
L^q(\mu)\subset L^p(\mu)
$$

であり、任意の $f\in L^q$ に対して

$$
\boxed{
\|f\|_p
\le
\mu(\Omega)^{1/p-1/q}
\|f\|_q
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$r=q/p>1$ とし、その共役指数を $s$ とします。Hölderより

$$
\int|f|^p
=
\int |f|^p\cdot1
\le
\left(\int|f|^{pr}\right)^{1/r}
\left(\int1^s\right)^{1/s}.
$$

$pr=q$ なので

$$
\|f\|_p^p
\le
\|f\|_q^p
\mu(\Omega)^{1-p/q}.
$$

$p$乗根を取れば結論です。$\square$
<!-- proof-end -->

無限測度空間では単純な包含関係は一般にありません。

---

# 9. 演習

## F0-00D2D-A01 $L^p$所属判定

- Level: A
- 目安時間: 8分

$f(x)=x^{-1/4}$ $(0<x<1)$ は $L^1,L^2,L^4$ のどれに属するか。

<!-- solution-start -->
### 詳細解答

$x^{-a}\in L^p(0,1)$ iff $ap<1$。$a=1/4$ なので

- $p=1$: $1/4<1$、所属。
- $p=2$: $1/2<1$、所属。
- $p=4$: $1<1$ は偽。$\int_0^1x^{-1}dx=\infty$ なので非所属。

### 本番答案

条件 $p/4<1$ より $L^1,L^2$ に属し、$L^4$ には属さない。

### 採点基準（20点）

- 判定条件: 8点
- L1: 3点
- L2: 3点
- L4: 4点
- 結論: 2点
<!-- solution-end -->

## F0-00D2D-A02 共役指数

- Level: A
- 目安時間: 8分

$p=3$ の共役指数 $q$ を求め、Youngの不等式を書け。

<!-- solution-start -->
### 詳細解答

$$
\frac13+\frac1q=1
$$

より $q=3/2$。したがって

$$
ab\le\frac{a^3}{3}+\frac{b^{3/2}}{3/2}
=
\frac{a^3}{3}+\frac23b^{3/2}.
$$

### 本番答案

$q=3/2$、よって $ab\le a^3/3+2b^{3/2}/3$。

### 採点基準（20点）

- 共役指数: 8点
- Young適用: 8点
- 整理: 4点
<!-- solution-end -->

## F0-00D2D-B01 Hölderの具体計算

- Level: B
- 目安時間: 12分

$[0,1]$ 上で $f(x)=x$、$g(x)=x^2$ とする。$p=2,q=2$ のHölderにより $\int_0^1x^3dx$ を上から評価せよ。

<!-- solution-start -->
### 詳細解答

Cauchy--Schwarzより

$$
\int_0^1x^3dx
\le
\left(\int_0^1x^2dx\right)^{1/2}
\left(\int_0^1x^4dx\right)^{1/2}
=
\frac1{\sqrt3\sqrt5}
=
\frac1{\sqrt{15}}.
$$

実際の値は $1/4$ で、$1/4<1/\sqrt{15}$。

### 本番答案

Cauchy--Schwarzより $\int x^3\le\|x\|_2\|x^2\|_2=1/\sqrt{15}$。

### 採点基準（20点）

- 不等式選択: 5点
- 各ノルム: 8点
- 上界: 5点
- 結論: 2点
<!-- solution-end -->

## F0-00D2D-B02 Minkowskiの意味

- Level: B
- 目安時間: 12分

$L^p$で

$$
d(f,g)=\|f-g\|_p
$$

と置くと三角不等式

$$
d(f,h)\le d(f,g)+d(g,h)
$$

がMinkowskiから従うことを示せ。

<!-- solution-start -->
### 詳細解答

$$
f-h=(f-g)+(g-h).
$$

Minkowskiより

$$
\|f-h\|_p
\le
\|f-g\|_p+\|g-h\|_p.
$$

これは距離の三角不等式そのもの。

### 本番答案

$f-h=(f-g)+(g-h)$ にMinkowskiを適用すれば直ちに従う。

### 採点基準（20点）

- 分解: 6点
- Minkowski適用: 9点
- 距離との対応: 5点
<!-- solution-end -->

## F0-00D2D-B03 有限測度での包含

- Level: B
- 目安時間: 15分

$[0,1]$ 上で $f\in L^2$ なら $f\in L^1$ で

$$
\|f\|_1\le\|f\|_2
$$

を示せ。

<!-- solution-start -->
### 詳細解答

Cauchy--Schwarzを $|f|$ と1に適用すると

$$
\int_0^1|f|dx
\le
\left(\int_0^1|f|^2dx\right)^{1/2}
\left(\int_0^11^2dx\right)^{1/2}
=
\|f\|_2.
$$

### 本番答案

Cauchy--Schwarzより $\|f\|_1=\int|f|\cdot1\le\|f\|_2\|1\|_2=\|f\|_2$。

### 採点基準（20点）

- Cauchy--Schwarz: 8点
- $\|1\|_2=1$: 5点
- 包含: 5点
- 結論: 2点
<!-- solution-end -->

---

## 10. 次に進む

$L^2$ はノルム空間になりました。しかしコーシー列が必ず $L^2$ 内で収束するかはまだ分かりません。

次講で

$$
\boxed{L^2\text{ は完備}}
$$

を証明し、Hilbert空間への橋を完成させます。

**次：F0-00D2E $L^2$完備性・Riesz--Fischer**
