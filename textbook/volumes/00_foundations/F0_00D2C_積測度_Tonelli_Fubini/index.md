# F0-00D2C 補講：積測度・Tonelliの定理・Fubiniの定理

D2Bまでは一つの測度空間上の積分でした。この講義では2つの測度空間を組み合わせ、二重積分・反復積分を正当化します。

中心線は

```text
積σ代数
 ↓
積測度
 ↓
Tonelli（非負）
 ↓
Fubini（絶対可積分）
```

です。

> **証明状態について**  
> 積測度の存在一意性は、長方形上の前測度をCarathéodory拡張定理で延長する結果です。標準ルートではこの定理をここで明示的に受け入れ、完全証明はD4「Lebesgue測度・Borel集合・拡張定理」で行います。これは未表示の黒箱ではなく、監査ID `TODO-P1-D2-07` の証明位置をD4へ固定したものです。

---

## 1. 積σ代数

### 定義（積σ代数）

可測空間 $(X,\mathcal A)$ と $(Y,\mathcal B)$ に対して、可測長方形

$$
A\times B,
\qquad A\in\mathcal A,\ B\in\mathcal B
$$

全体が生成する $X\times Y$ 上のσ代数

$$
\boxed{
\mathcal A\otimes\mathcal B
:=
\sigma\{A\times B:A\in\mathcal A,\ B\in\mathcal B\}
}
$$

を **積σ代数** という。

組

$$
(X\times Y,\mathcal A\otimes\mathcal B)
$$

を積可測空間という。

### 例1：Borel σ代数の積

$\mathbb R^m,\mathbb R^n$ の通常の位相に対して

$$
\mathcal B(\mathbb R^m)\otimes\mathcal B(\mathbb R^n)
=
\mathcal B(\mathbb R^{m+n})
$$

が成り立ちます。

---

## 2. 積測度

### 定理（σ有限測度の積測度）

σ有限測度空間 $(X,\mathcal A,\mu)$ と $(Y,\mathcal B,\nu)$ に対して、積σ代数 $\mathcal A\otimes\mathcal B$ 上に測度 $\mu\times\nu$ が一意に存在し、任意の $A\in\mathcal A,B\in\mathcal B$ について

$$
\boxed{
(\mu\times\nu)(A\times B)
=
\mu(A)\nu(B)
}
$$

を満たす。

ここでσ有限とは、例えば $X$ が可測集合列 $X_n$ で覆われ

$$
X=\bigcup_{n=1}^\infty X_n,
\qquad
\mu(X_n)<\infty
$$

となることです。

### 証明の位置

長方形の有限和からなる半環上に

$$
\pi(A\times B)=\mu(A)\nu(B)
$$

を定め、これを前測度へ拡張し、Carathéodory拡張定理を適用します。一意性にはσ有限性を使います。

**完全証明：D4で実施。**

---

## 3. section

二変数集合・関数を一方の変数だけ固定して見る操作を定義します。

### 定義（集合のsection）

$E\subset X\times Y$ と $x\in X,y\in Y$ に対して

$$
E_x
:=
\{y\in Y:(x,y)\in E\},
$$

$$
E^y
:=
\{x\in X:(x,y)\in E\}
$$

をそれぞれ $x$-section、$y$-sectionという。

### 命題（可測集合のsectionは可測）

可測空間 $(X,\mathcal A)$、$(Y,\mathcal B)$ と $E\in\mathcal A\otimes\mathcal B$ に対して、任意の $x\in X,y\in Y$ について

$$
E_x\in\mathcal B,
\qquad
E^y\in\mathcal A.
$$

#### 証明

固定した $x\in X$ に対して

$$
\mathcal C_x
:=
\{E\subset X\times Y:E_x\in\mathcal B\}
$$

と置きます。sectionは補集合・可算和と可換するため $\mathcal C_x$ はσ代数です。

可測長方形 $A\times B$ のsectionは

$$
(A\times B)_x
=
\begin{cases}
B,&x\in A,\\
\varnothing,&x\notin A,
\end{cases}
$$

なので可測です。よって $\mathcal C_x$ は全ての可測長方形を含み、

$$
\mathcal A\otimes\mathcal B\subset\mathcal C_x.
$$

したがって任意の $E\in\mathcal A\otimes\mathcal B$ の $E_x$ は可測。$E^y$ も同様です。$\square$

---

## 4. Tonelliの定理

### 定理（Tonelli）

σ有限測度空間 $(X,\mathcal A,\mu)$ と $(Y,\mathcal B,\nu)$、積測度 $\mu\times\nu$ を考える。

非負の $(\mathcal A\otimes\mathcal B)$-可測関数

$$
f:X\times Y\to[0,\infty]
$$

に対して、

$$
x\mapsto\int_Y f(x,y)\,d\nu(y),
\qquad
y\mapsto\int_X f(x,y)\,d\mu(x)
$$

は可測であり、

$$
\boxed{
\int_{X\times Y}f\,d(\mu\times\nu)
=
\int_X\left(\int_Yf(x,y)\,d\nu(y)\right)d\mu(x)
}
$$

$$
\boxed{
=
\int_Y\left(\int_Xf(x,y)\,d\mu(x)\right)d\nu(y)
}
$$

が成り立つ。値は $\infty$ でもよい。

### 証明

証明は「指示関数 → 単関数 → 一般非負関数」の順に行います。

#### Step 1：長方形の指示関数

$f=1_{A\times B}$ なら

$$
\int_Y1_{A\times B}(x,y)d\nu(y)
=1_A(x)\nu(B).
$$

したがって

$$
\int_X\int_Y1_{A\times B}d\nu d\mu
=
\mu(A)\nu(B)
=
(\mu\times\nu)(A\times B).
$$

#### Step 2：一般可測集合の指示関数

可測長方形から生成される集合について上の等式を保つためには、集合列の単調極限に対する閉性が必要です。これはD4で積測度の構成と合わせて証明する「section測度補題」により、任意の $E\in\mathcal A\otimes\mathcal B$ について

$$
x\mapsto\nu(E_x)
$$

が可測で

$$
(\mu\times\nu)(E)
=
\int_X\nu(E_x)d\mu(x)
$$

となることから従います。

この補題の完全証明も、積測度存在定理と同じD4に置きます。

#### Step 3：非負単関数

$$
\phi=\sum_{k=1}^m a_k1_{E_k}
$$

に対してStep 2と有限線形性を使えば

$$
\int_{X\times Y}\phi\,d(\mu\times\nu)
=
\int_X\left(\int_Y\phi(x,y)d\nu(y)\right)d\mu(x).
$$

#### Step 4：一般の非負可測関数

D2Aの単関数近似定理から、非負単関数列 $\phi_n\uparrow f$ を取れます。

各 $x$ についてMCTを $Y$ 側へ適用すると

$$
\int_Y\phi_n(x,y)d\nu(y)
\uparrow
\int_Yf(x,y)d\nu(y).
$$

さらに $X$ 側へMCTを適用し、同時に積空間側でもMCTを使えば

$$
\begin{aligned}
\int_X\int_Yf\,d\nu d\mu
&=
\lim_n\int_X\int_Y\phi_n\,d\nu d\mu\\
&=
\lim_n\int_{X\times Y}\phi_n\,d(\mu\times\nu)\\
&=
\int_{X\times Y}f\,d(\mu\times\nu).
\end{aligned}
$$

変数を逆にした等式も同様です。$\square$

> Tonelliの論理のうち、**積測度構成とsection測度補題だけがD4へ明示的に繰り延べ**られています。それ以外はD2A/D2Bからここで閉じています。

---

## 5. Fubiniの定理

### 定理（Fubini）

σ有限測度空間 $(X,\mathcal A,\mu)$ と $(Y,\mathcal B,\nu)$、積測度 $\mu\times\nu$ を考える。

$(\mathcal A\otimes\mathcal B)$-可測関数 $f:X\times Y\to\mathbb R$ が

$$
\boxed{
\int_{X\times Y}|f|\,d(\mu\times\nu)<\infty
}
$$

を満たすとする。このとき、ほとんど全ての $x$ について $y\mapsto f(x,y)$ は $\nu$-可積分、ほとんど全ての $y$ について $x\mapsto f(x,y)$ は $\mu$-可積分であり、

$$
\boxed{
\int_{X\times Y}f\,d(\mu\times\nu)
=
\int_X\int_Yf(x,y)d\nu(y)d\mu(x)
}
$$

$$
\boxed{
=
\int_Y\int_Xf(x,y)d\mu(x)d\nu(y)
}
$$

が成り立つ。

### 証明

Tonelliを非負関数 $|f|$ に適用すると

$$
\int_X\left(\int_Y|f(x,y)|d\nu(y)\right)d\mu(x)
=
\int_{X\times Y}|f|d(\mu\times\nu)<\infty.
$$

非負関数の積分が有限なので、

$$
\int_Y|f(x,y)|d\nu(y)<\infty
$$

がほとんど全ての $x$ で成り立ちます。したがってsectionはa.e.で可積分です。

$f=f^+-f^-$ と分解します。$f^+,f^-$ は非負可測で

$$
f^++f^-=|f|,
$$

したがって両方とも積分有限。Tonelliを $f^+$ と $f^-$ に適用して差を取れば

$$
\int f
=
\int f^+-\int f^-
=
\int_X\left(\int_Yf^+d\nu-\int_Yf^-d\nu\right)d\mu
=
\int_X\int_Yf\,d\nu d\mu.
$$

逆順も同様です。$\square$

---

## 6. TonelliとFubiniの違い

| | Tonelli | Fubini |
|---|---|---|
| 関数 | $f\ge0$ | 符号あり可 |
| 条件 | 非負可測 | $\int|f|<\infty$ |
| 無限大 | 許す | 絶対可積分なので有限 |
| 主用途 | 非負級数・非負二重積分 | 積分順序交換 |

「符号があるけれど条件を確認せず積分順序を交換」は危険です。

---

## 7. 具体例

### 例2：長方形領域

$$
f(x,y)=xy,
\qquad 0\le x\le1,\ 0\le y\le2
$$

なら $|f|$ は可積分なのでFubiniを使えます。

$$
\int_0^1\int_0^2xy\,dy\,dx
=
\int_0^1 2x\,dx
=1.
$$

逆順でも同じです。

### 例3：非負なので先にTonelli

$$
f(x,y)=e^{-(x+y)},
\qquad x,y\ge0
$$

は非負なので、積分可能性を先に知らなくてもTonelliで

$$
\int_0^\infty\int_0^\infty e^{-(x+y)}dy\,dx
=
\left(\int_0^\infty e^{-x}dx\right)^2
=1.
$$

結果として有限であることも分かります。

---

# 8. 演習

## F0-00D2C-A01 長方形の積測度

- Level: A
- 目安時間: 8分

Lebesgue測度 $m$ に対して

$$
(m\times m)([0,2]\times[1,4])
$$

を求めよ。

<!-- solution-start -->
### 詳細解答

積測度の長方形上の定義より

$$
(m\times m)([0,2]\times[1,4])
=m([0,2])m([1,4])=2\cdot3=6.
$$

### 本番答案

$$
(m\times m)([0,2]\times[1,4])=2\times3=6.
$$

### 採点基準（20点）

- 積測度公式: 10点
- 各長さ: 6点
- 結論: 4点
<!-- solution-end -->

## F0-00D2C-A02 TonelliかFubiniか

- Level: A
- 目安時間: 8分

非負可測関数 $f$ について、$\int f$ が有限か不明な段階で反復積分を使いたい。TonelliとFubiniのどちらを先に使うべきか。

<!-- solution-start -->
### 詳細解答

Tonelli。非負可測性だけで使え、積分値が $\infty$ でもよい。Fubiniは絶対可積分性が必要。

### 本番答案

Tonelli。$f\ge0$ なら絶対可積分性を先に確認せず使用できる。

### 採点基準（20点）

- Tonelli選択: 8点
- 非負条件: 6点
- Fubiniとの違い: 6点
<!-- solution-end -->

## F0-00D2C-B01 二重積分

- Level: B
- 目安時間: 12分

$$
I=\int_0^1\int_0^2(x+y)dy\,dx
$$

を計算し、逆順でも一致することを確認せよ。

<!-- solution-start -->
### 詳細解答

内側から

$$
\int_0^2(x+y)dy=2x+2.
$$

したがって

$$
I=\int_0^1(2x+2)dx=3.
$$

逆順では

$$
\int_0^2\left(\int_0^1(x+y)dx\right)dy
=
\int_0^2(1/2+y)dy=3.
$$

### 本番答案

両順序で計算すると3。連続関数を有界長方形上で積分しているので絶対可積分でFubini適用可。

### 採点基準（20点）

- 第1順序: 7点
- 第2順序: 7点
- Fubini条件: 4点
- 結論: 2点
<!-- solution-end -->

## F0-00D2C-B02 非負無限領域

- Level: B
- 目安時間: 12分

$$
\int_0^\infty\int_0^\infty e^{-(2x+3y)}dy\,dx
$$

をTonelliで計算せよ。

<!-- solution-start -->
### 詳細解答

被積分関数は非負可測なのでTonelli。

$$
\int_0^\infty e^{-2x}dx
\int_0^\infty e^{-3y}dy
=
\frac12\cdot\frac13
=
\frac16.
$$

### 本番答案

Tonelliより積に分離して $1/2\times1/3=1/6$。

### 採点基準（20点）

- Tonelli適用: 6点
- 分離: 6点
- 各積分: 6点
- 結論: 2点
<!-- solution-end -->

## F0-00D2C-B03 絶対可積分性からsection可積分性

- Level: B
- 目安時間: 15分

Fubiniの仮定

$$
\int_{X\times Y}|f|d(\mu\times\nu)<\infty
$$

から、ほとんど全ての $x$ について

$$
\int_Y|f(x,y)|d\nu(y)<\infty
$$

が従う理由を説明せよ。

<!-- solution-start -->
### 詳細解答

Tonelliを $|f|\ge0$ に適用すると

$$
\int_X h(x)d\mu(x)<\infty,
\qquad
h(x):=\int_Y|f(x,y)|d\nu(y)\ge0.
$$

非負可測関数 $h$ の積分が有限なら $h=\infty$ となる集合は測度0でなければならない。したがって $h(x)<\infty$ a.e.

### 本番答案

Tonelliより $\int_Xh\,d\mu=\int|f|<\infty$。非負関数の積分が有限なので $h(x)<\infty$ a.e.

### 採点基準（20点）

- $h$定義: 5点
- Tonelli: 7点
- 有限積分からa.e.有限: 6点
- 結論: 2点
<!-- solution-end -->

---

## 9. 次に進む

次は積分可能性そのものをノルムとして扱います。

**次：F0-00D2D $L^p$空間・Hölder・Minkowski**
