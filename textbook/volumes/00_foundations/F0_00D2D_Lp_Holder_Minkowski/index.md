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

### 定義（a.e.同値関係）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の可測関数 $f,g$ に対して

$$
f\sim g
\quad\Longleftrightarrow\quad
f=g\ \text{a.e.}
$$

と定める。この同値関係による同値類を $[f]$ と書く。

以後、通常は同値類 $[f]$ を単に $f$ と書きます。

---

## 2. $L^p$空間

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

### 定義（$L^\infty$と本質的上限）

可測関数 $f$ に対して

$$
\|f\|_\infty
:=
\inf\{M\ge0:|f|\le M\ \text{a.e.}\}
$$

を **本質的上限** といい、$\|f\|_\infty<\infty$ となるa.e.同値類全体を $L^\infty(\mu)$ という。

通常のsupremumと違い、測度0集合上の巨大な値を無視します。

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

Hölderの証明に使うスカラー不等式を先に証明します。

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

---

## 5. Minkowskiの不等式

これで$\|\cdot\|_p$の三角不等式を証明できます。

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

## 6. $L^p$はノルム空間になる

### 定理（$L^p$ノルム）

測度空間 $(\Omega,\mathcal F,\mu)$ と $1\le p<\infty$ に対して、a.e.同値類上で

$$
\|f\|_p
=
\left(\int|f|^p\,d\mu\right)^{1/p}
$$

はノルムである。

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
