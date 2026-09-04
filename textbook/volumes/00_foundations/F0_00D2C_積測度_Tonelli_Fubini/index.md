# F0-00D2C 補講：積測度・Tonelliの定理・Fubiniの定理

D2Bまでは一つの測度空間上の積分でした。この講義では2つの測度空間を組み合わせ、二重積分・反復積分を正当化します。

中心線は

```text
積σ代数
 ↓
積測度
 ↓
section測度公式
 ↓
Tonelli（非負）
 ↓
Fubini（絶対可積分）
```

です。

> **証明依存**  
> 積測度の存在・一意性には Carathéodory 拡張定理を使います。標準ルートではこの定理を受け入れて先へ進んで構いません。DREAM THEATER ルートでは [D3](../F0_00D3_外測度_Caratheodory可測性/index.md) → [D4](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#thm-caratheodory-extension) で拡張定理そのものを証明します。本章では、それ以外の section → Tonelli → Fubini の論理を黒箱なしで閉じます。

---

## 0. まず普通の二重積分から「順序交換の条件」を考える

長方形上の

$$
f(x,y)=xy,
\qquad 0\le x\le1,\ 0\le y\le2
$$

では

$$
\int_0^1\int_0^2xy\,dy\,dx
=
\int_0^2\int_0^1xy\,dx\,dy
=1.
$$

しかし測度論では、積分順序の交換は無条件ではありません。

- $f\ge0$ なら **Tonelli**：値が $+\infty$ でもよい。
- 符号があるなら **Fubini**：$\int|f|<\infty$ を要求する。

この違いを証明から理解するのが本章の目的です。

---

## 1. 積σ代数

<a id="def-f0-00d2c-01"></a>

<!-- formal-statement-start -->
### 定義（積σ代数）

可測空間 $(X,\mathcal A)$ と $(Y,\mathcal B)$ に対して

$$
\boxed{
\mathcal A\otimes\mathcal B
:=
\sigma\{A\times B:A\in\mathcal A,\ B\in\mathcal B\}
}
$$

を **積σ代数** という。
<!-- formal-statement-end -->

### 例1：Euclid空間

通常の Borel σ代数について

$$
\mathcal B(\mathbb R^m)\otimes\mathcal B(\mathbb R^n)
=
\mathcal B(\mathbb R^{m+n})
$$

が成り立ちます。したがって通常の二変数連続関数は積σ代数に関して可測です。

---

## 2. 積測度

<a id="thm-f0-00d2c-01"></a>

<!-- formal-statement-start -->
### 定理（σ有限測度の積測度）

σ有限測度空間 $(X,\mathcal A,\mu)$ と $(Y,\mathcal B,\nu)$ に対して、積σ代数 $\mathcal A\otimes\mathcal B$ 上に一意な測度 $\mu\times\nu$ が存在し、

$$
\boxed{
(\mu\times\nu)(A\times B)=\mu(A)\nu(B)
}
$$

を全ての $A\in\mathcal A,B\in\mathcal B$ について満たす。
<!-- formal-statement-end -->

### 2.1 なぜ長方形上の積が premeasure になるのか

まず可測長方形の有限互いに素和からなる algebra を $\mathcal R$ とします。長方形について

$$
\pi(A\times B):=\mu(A)\nu(B)
$$

と置き、互いに素な有限和には加法的に延長します。

重要なのは、この定義が可算分割にも整合することです。例えば

$$
A\times B=\bigsqcup_{n=1}^\infty(A_n\times B_n)
$$

なら各 $(x,y)$ について

$$
1_A(x)1_B(y)
=
\sum_{n=1}^\infty1_{A_n}(x)1_{B_n}(y).
$$

固定した $x$ で $y$ について積分し、非負級数に MCT を使うと

$$
1_A(x)\nu(B)
=
\sum_{n=1}^\infty1_{A_n}(x)\nu(B_n).
$$

さらに $x$ について MCT を使えば

$$
\mu(A)\nu(B)
=
\sum_{n=1}^\infty\mu(A_n)\nu(B_n).
$$

有限互いに素和に分解した一般の $R\in\mathcal R$ でも同じ議論を各成分へ適用できるため、$\pi$ は $\mathcal R$ 上の premeasure になります。

### 2.2 Carathéodory 拡張定理を適用する

D4 の Carathéodory 拡張定理により $\pi$ は

$$
\sigma(\mathcal R)=\mathcal A\otimes\mathcal B
$$

上の測度へ拡張されます。これが $\mu\times\nu$ です。

$\mu,\nu$ がσ有限なら、有限測度の長方形で $X\times Y$ を可算に覆えるため、premeasure $\pi$ もσ有限です。したがって拡張の一意性も D4 の一意性部分から従います。$\square$

> ここで積測度の存在・一意性は **D4の拡張定理に依存することを明示した上で完全に閉じています**。以後は積測度を使います。

---

## 3. section

<a id="def-f0-00d2c-02"></a>

<!-- formal-statement-start -->
### 定義（集合の section）

$E\subset X\times Y$ と $x\in X,y\in Y$ に対して

$$
E_x:=\{y\in Y:(x,y)\in E\},
\qquad
E^y:=\{x\in X:(x,y)\in E\}
$$

をそれぞれ $x$-section、$y$-sectionという。
<!-- formal-statement-end -->

### 例2：長方形を縦に切る

$E=[0,1]\times[0,2]$ なら

$$
E_x=
\begin{cases}
[0,2],&x\in[0,1],\\
\varnothing,&x\notin[0,1].
\end{cases}
$$

したがって

$$
\nu(E_x)=2\,1_{[0,1]}(x).
$$

section は「二次元集合を一方向に切り、その断面の大きさをもう一方で積分する」操作です。

<a id="prop-f0-00d2c-01"></a>

<!-- formal-statement-start -->
### 命題（可測集合の section は可測）

$E\in\mathcal A\otimes\mathcal B$ なら、任意の $x,y$ について

$$
E_x\in\mathcal B,
\qquad
E^y\in\mathcal A.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
#### 証明

固定した $x\in X$ に対して

$$
\mathcal C_x:=\{E\subset X\times Y:E_x\in\mathcal B\}
$$

と置きます。section は補集合と可算和に可換するので $\mathcal C_x$ はσ代数です。

長方形について

$$
(A\times B)_x=
\begin{cases}
B,&x\in A,\\
\varnothing,&x\notin A
\end{cases}
$$

だから全ての可測長方形が $\mathcal C_x$ に入ります。従って

$$
\mathcal A\otimes\mathcal B\subset\mathcal C_x.
$$

$E^y$ も同様です。$\square$
<!-- proof-end -->

---

## 4. section 測度公式

Tonelli の証明で本当に必要なのは、単に section が可測集合になることだけではありません。

<a id="lem-section-measure"></a>

<!-- formal-statement-start -->
### 補題（section 測度公式）

$(X,\mathcal A,\mu),(Y,\mathcal B,\nu)$ をσ有限測度空間とし、$E\in\mathcal A\otimes\mathcal B$ とする。このとき

$$
x\longmapsto\nu(E_x)
$$

は $\mathcal A$-可測で、

$$
\boxed{
(\mu\times\nu)(E)=\int_X\nu(E_x)\,d\mu(x)
}
$$

が成り立つ。変数を逆にした

$$
(\mu\times\nu)(E)=\int_Y\mu(E^y)\,d\nu(y)
$$

も成り立つ。
<!-- formal-statement-end -->

### 4.1 まず有限測度の場合

$\mu(X)<\infty,\nu(Y)<\infty$ とします。次の性質を満たす集合族を

$$
\mathcal D
:=
\left\{
E\in\mathcal A\otimes\mathcal B:
 x\mapsto\nu(E_x)\text{ が可測かつ }
(\mu\times\nu)(E)=\int_X\nu(E_x)d\mu
\right\}
$$

と置きます。

#### 長方形は $\mathcal D$ に入る

$E=A\times B$ なら

$$
\nu(E_x)=1_A(x)\nu(B)
$$

なので可測で、

$$
\int_X\nu(E_x)d\mu
=
\mu(A)\nu(B)
=
(\mu\times\nu)(A\times B).
$$

#### 補集合で閉じる

$E\in\mathcal D$ なら有限測度性により

$$
\nu((E^c)_x)=\nu(Y)-\nu(E_x)
$$

で可測です。また

$$
\begin{aligned}
\int_X\nu((E^c)_x)d\mu
&=\mu(X)\nu(Y)-\int_X\nu(E_x)d\mu\\
&=(\mu\times\nu)(X\times Y)-(\mu\times\nu)(E)\\
&=(\mu\times\nu)(E^c).
\end{aligned}
$$

#### 互いに素な可算和で閉じる

$E_n\in\mathcal D$ が互いに素なら、各 $x$ で $(E_n)_x$ も互いに素だから

$$
\nu\left(\left(\bigcup_nE_n\right)_x\right)
=
\sum_n\nu((E_n)_x).
$$

右辺は非負可測関数の極限なので可測です。MCT と積測度の可算加法性から

$$
\begin{aligned}
\int_X\nu\left(\left(\bigcup_nE_n\right)_x\right)d\mu
&=\sum_n\int_X\nu((E_n)_x)d\mu\\
&=\sum_n(\mu\times\nu)(E_n)\\
&=(\mu\times\nu)\left(\bigcup_nE_n\right).
\end{aligned}
$$

従って $\mathcal D$ は Dynkin 族です。可測長方形全体は交わりで閉じる π-system であり、それを含むので π–λ 定理から

$$
\mathcal D=\mathcal A\otimes\mathcal B.
$$

有限測度の場合が示されました。

### 4.2 σ有限の場合へ局所化する

σ有限性から

$$
X_n\uparrow X,
\qquad Y_n\uparrow Y,
\qquad
\mu(X_n)<\infty,
\quad
\nu(Y_n)<\infty
$$

となる可測集合列を取れます。

$$
E_n:=E\cap(X_n\times Y_n)
$$

と置けば、有限測度の場合の結果より

$$
x\mapsto1_{X_n}(x)\nu(E_x\cap Y_n)
$$

は可測で、

$$
(\mu\times\nu)(E_n)
=
\int_X1_{X_n}(x)\nu(E_x\cap Y_n)d\mu(x).
$$

左辺では $E_n\uparrow E$。右辺の被積分関数も各点で

$$
1_{X_n}(x)\nu(E_x\cap Y_n)\uparrow\nu(E_x).
$$

したがって測度の下からの連続性と MCT により

$$
\begin{aligned}
(\mu\times\nu)(E)
&=\lim_n(\mu\times\nu)(E_n)\\
&=\lim_n\int_X1_{X_n}\nu(E_x\cap Y_n)d\mu\\
&=\int_X\nu(E_x)d\mu.
\end{aligned}
$$

同時に $x\mapsto\nu(E_x)$ の可測性も、可測関数の単調極限として従います。$y$ 側も同様です。$\square$

---

## 5. Tonelli の定理

<a id="thm-tonelli"></a>

<!-- formal-statement-start -->
### 定理（Tonelli）

σ有限測度空間 $(X,\mathcal A,\mu)$ と $(Y,\mathcal B,\nu)$ 上の非負可測関数

$$
f:X\times Y\to[0,\infty]
$$

に対して

$$
x\mapsto\int_Y f(x,y)d\nu(y),
\qquad
y\mapsto\int_X f(x,y)d\mu(x)
$$

は可測であり、

$$
\boxed{
\int_{X\times Y}f\,d(\mu\times\nu)
=
\int_X\left(\int_Yf(x,y)d\nu(y)\right)d\mu(x)
}
$$

$$
\boxed{
=
\int_Y\left(\int_Xf(x,y)d\mu(x)\right)d\nu(y)
}
$$

が成り立つ。値は $+\infty$ でもよい。
<!-- formal-statement-end -->

### 証明の見取り図

```text
可測集合の指示関数
 ↓ section測度公式
非負単関数
 ↓ 有限線形性
一般の非負可測関数
 ↓ 単関数近似 + MCT
Tonelli
```

<!-- proof-start -->
### 証明

#### Step 1：指示関数

$f=1_E$、$E\in\mathcal A\otimes\mathcal B$ とします。section 測度公式から

$$
\int_Y1_E(x,y)d\nu(y)=\nu(E_x)
$$

は $x$ の可測関数で、

$$
\int_X\int_Y1_E(x,y)d\nu d\mu
=(\mu\times\nu)(E)
=
\int_{X\times Y}1_Ed(\mu\times\nu).
$$

#### Step 2：非負単関数

$$
\phi=\sum_{k=1}^m a_k1_{E_k},
\qquad a_k\ge0
$$

なら有限線形性により

$$
\int_X\int_Y\phi\,d\nu d\mu
=
\int_{X\times Y}\phi\,d(\mu\times\nu).
$$

内側積分の可測性も有限和から従います。

#### Step 3：一般の非負可測関数

単関数近似定理により非負単関数 $\phi_n$ を

$$
0\le\phi_n\uparrow f
$$

となるよう取れます。各 $x$ で MCT を使うと

$$
\int_Y\phi_n(x,y)d\nu(y)
\uparrow
\int_Yf(x,y)d\nu(y).
$$

よって内側積分は可測関数の単調極限なので可測です。さらに $X$ 側と積空間側へ MCT を使って

$$
\begin{aligned}
\int_X\int_Yf\,d\nu d\mu
&=\lim_n\int_X\int_Y\phi_n\,d\nu d\mu\\
&=\lim_n\int_{X\times Y}\phi_n\,d(\mu\times\nu)\\
&=\int_{X\times Y}f\,d(\mu\times\nu).
\end{aligned}
$$

逆順も同じです。$\square$
<!-- proof-end -->

---

## 6. Fubini の定理

<a id="thm-f0-00d2c-02"></a>

<!-- formal-statement-start -->
### 定理（Fubini）

$(\mathcal A\otimes\mathcal B)$-可測関数 $f:X\times Y\to\mathbb R$ が

$$
\boxed{
\int_{X\times Y}|f|d(\mu\times\nu)<\infty
}
$$

を満たすとする。このとき、ほとんど全ての $x$ で $f(x,\cdot)$ は $\nu$-可積分、ほとんど全ての $y$ で $f(\cdot,y)$ は $\mu$-可積分で、

$$
\boxed{
\int_{X\times Y}f\,d(\mu\times\nu)
=
\int_X\int_Yf(x,y)d\nu(y)d\mu(x)
=
\int_Y\int_Xf(x,y)d\mu(x)d\nu(y)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Tonelli を $|f|\ge0$ に適用すると

$$
\int_X\left(\int_Y|f(x,y)|d\nu(y)\right)d\mu(x)
=
\int_{X\times Y}|f|d(\mu\times\nu)<\infty.
$$

従って

$$
\int_Y|f(x,y)|d\nu(y)<\infty
$$

が a.e. $x$ で成り立ちます。$y$ 側も同様です。

次に

$$
f=f^+-f^-,
\qquad
|f|=f^++f^-.
$$

絶対可積分性から $f^+,f^-$ はともに積分有限です。Tonelli をそれぞれへ適用して差を取れば

$$
\int_{X\times Y}f
=
\int_X\left(\int_Yf(x,y)d\nu(y)\right)d\mu(x).
$$

逆順も同様です。$\square$
<!-- proof-end -->

---

## 7. Tonelli と Fubini の使い分け

| | Tonelli | Fubini |
|---|---|---|
| 関数 | $f\ge0$ | 符号あり可 |
| 仮定 | 非負可測 | $\int|f|<\infty$ |
| 値 $+\infty$ | 許す | 許さない |
| 主用途 | 非負級数・非負二重積分 | 積分順序交換 |

判定は

```text
f >= 0 ?
 ├─ Yes → Tonelli
 └─ No
      ↓
   ∫|f| < ∞ ?
      ├─ Yes → Fubini
      └─ No  → 順序交換は自動ではない
```

です。

### 例3：非負なら先に Tonelli

$$
f(x,y)=e^{-(2x+3y)},\qquad x,y\ge0
$$

は非負なので

$$
\int_0^\infty\int_0^\infty e^{-(2x+3y)}dy\,dx
=
\left(\int_0^\infty e^{-2x}dx\right)
\left(\int_0^\infty e^{-3y}dy\right)
=
\frac16.
$$

### 例4：確率論での独立性

独立な確率変数 $X,Y$ の結合分布が積測度 $P_X\times P_Y$ で、$g,h\ge0$ なら Tonelli により

$$
E[g(X)h(Y)]
=
\int g(x)h(y)d(P_X\times P_Y)
=E[g(X)]E[h(Y)].
$$

絶対可積分なら Fubini で符号付き関数にも同じ分離が使えます。

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

積測度の定義から

$$
(m\times m)([0,2]\times[1,4])
=m([0,2])m([1,4])=2\cdot3=6.
$$
<!-- solution-end -->

## F0-00D2C-A02 section を求める

- Level: A
- 目安時間: 10分

$$
E=\{(x,y)\in[0,1]^2:y\le x\}
$$

について $E_x$ と $m(E_x)$ を求め、$m_2(E)$ を section 測度公式から計算せよ。

<!-- solution-start -->
### 詳細解答

$x\in[0,1]$ では $E_x=[0,x]$ だから $m(E_x)=x$。従って

$$
m_2(E)=\int_0^1x\,dx=\frac12.
$$
<!-- solution-end -->

## F0-00D2C-A03 Tonelli か Fubini か

- Level: A
- 目安時間: 8分

非負可測関数 $f$ について $\int f$ が有限か分からない段階で反復積分を使いたい。どちらを使うべきか。

<!-- solution-start -->
### 詳細解答

Tonelli。非負可測性だけで使え、積分値が $+\infty$ でもよい。Fubini は絶対可積分性を要求する。
<!-- solution-end -->

## F0-00D2C-B01 section 測度補題の有限測度版

- Level: B
- 目安時間: 20分

有限測度空間で、section 測度公式を満たす集合族 $\mathcal D$ が Dynkin 族になることを示し、π–λ 定理で全ての積可測集合へ拡張せよ。

<!-- solution-start -->
### 詳細解答

長方形では直接成立する。有限測度性により補集合では

$$
\nu((E^c)_x)=\nu(Y)-\nu(E_x)
$$

を使える。互いに素な可算和では section も互いに素で、測度の可算加法性と MCT から公式を保つ。従って $\mathcal D$ は長方形 π-system を含む Dynkin 族なので

$$
\mathcal A\otimes\mathcal B\subset\mathcal D.
$$
<!-- solution-end -->

## F0-00D2C-B02 Tonelli の証明を再構成する

- Level: B
- 目安時間: 20分

section 測度公式を既知として、Tonelli を

$$
1_E\to\text{非負単関数}\to\text{一般非負可測関数}
$$

の順に証明せよ。

<!-- solution-start -->
### 詳細解答

$1_E$ では section 測度公式そのもの。非負単関数では有限線形性で拡張する。一般の $f\ge0$ には単関数列 $\phi_n\uparrow f$ を取り、内側積分・外側積分・積空間積分の三箇所で MCT を用いる。
<!-- solution-end -->

## F0-00D2C-B03 Fubini の section 可積分性

- Level: B
- 目安時間: 15分

$$
\int_{X\times Y}|f|d(\mu\times\nu)<\infty
$$

から a.e. $x$ について

$$
\int_Y|f(x,y)|d\nu(y)<\infty
$$

が従う理由を説明せよ。

<!-- solution-start -->
### 詳細解答

Tonelli により

$$
h(x):=\int_Y|f(x,y)|d\nu(y)
$$

は非負可測で

$$
\int_Xh(x)d\mu(x)=\int_{X\times Y}|f|d(\mu\times\nu)<\infty.
$$

非負可測関数の積分が有限なら $h=+\infty$ となる集合の測度は0なので $h<\infty$ a.e.
<!-- solution-end -->

## F0-00D2C-B04 なぜ絶対可積分性が必要か

- Level: B
- 目安時間: 20分

条件収束級数 $\sum_{n\ge1}a_n$ を正方形格子上の関数へ埋め込むと、積分順序の交換が級数の並べ替えに対応し得る。この事実を踏まえ、Fubini が $\int|f|<\infty$ を要求する意味を説明せよ。

<!-- solution-start -->
### 詳細解答

絶対可積分性がない場合、正部分と負部分が別々に無限大となり得て、反復積分の途中で $+\infty-\infty$ 型の不定形や条件収束級数の並べ替えと同じ現象が起こり得る。$\int|f|<\infty$ は $f^+,f^-$ をともに有限積分へ押さえ、Tonelli を両者へ安全に適用できる条件である。
<!-- solution-end -->

---

## 9. 章末チェック

- 積σ代数と積測度を定義できる。
- 積測度が Carathéodory 拡張から存在する論理を説明できる。
- section の可測性を証明できる。
- section 測度公式を有限測度→σ有限局所化で証明できる。
- Tonelli を指示関数→単関数→MCTで証明できる。
- Fubini を $|f|$ への Tonelli と正負分解から証明できる。
- Tonelli と Fubini の仮定を使い分けられる。

## 10. 次に進む

次は積分可能性そのものをノルムとして扱います。

**次：F0-00D2D $L^p$空間・Hölder・Minkowski**
