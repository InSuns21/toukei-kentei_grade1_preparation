# F0-02C1 Banach・Hilbert

関数解析の最初の一歩は、関数を「式」ではなく **ベクトル空間の点** として扱うことです。

有限次元では

$$
x=(x_1,\dots,x_p)\in\mathbb R^p
$$

を未知量にしました。

関数解析では

$$
u:[0,1]\to\mathbb R
$$

そのものを未知量にします。

すると線形代数で使っていた

$$
\text{足し算},\quad
\text{スカラー倍},\quad
\text{長さ},\quad
\text{角度},\quad
\text{直交},\quad
\text{射影}
$$

を、関数全体の空間へ拡張したくなります。

---

## 1. 関数全体もベクトル空間になる

例えば

$$
C([0,1])
=\{f:[0,1]\to\mathbb R\mid f\text{ は連続}\}
$$

を考えます。

$f,g\in C([0,1])$、$a,b\in\mathbb R$ に対して

$$
(af+bg)(t)=af(t)+bg(t)
$$

と定義すれば、$af+bg$ も連続関数です。

したがって $C([0,1])$ はベクトル空間です。

有限次元との違いは、一般の関数を有限個の座標だけでは表せないことです。

---

## 2. ノルム：長さを与える

関数をベクトルとして足したりスカラー倍したりできても、それだけでは「二つの関数が近い」という言葉はまだ使えません。前章ではベクトル空間にノルムを入れると距離が得られることを学びました。ここではその道具を関数空間へ持ち込み、**近さ・収束・Cauchy性を一つの物差しで扱う**ことを狙います。

<a id="def-f0-02c1-norm-normed-space"></a>

<!-- formal-statement-start -->
> **定義（ノルム・ノルム空間）**  
> ベクトル空間 $X$ 上の関数 $\|\cdot\|:X\to[0,\infty)$ が任意の $x,y\in X$ とスカラー $a$ に対して
>
> 1. $\|x\|\ge0$ かつ $\|x\|=0\iff x=0$
> 2. $\|ax\|=|a|\|x\|$
> 3. $\|x+y\|\le\|x\|+\|y\|$
>
> を満たすとき、$\|\cdot\|$ を **ノルム** といいます。ノルムを備えたベクトル空間を **ノルム空間** といいます。
<!-- formal-statement-end -->

ノルムから

$$
d(x,y)=\|x-y\|
$$

と置けば距離が定まるので、F0-00B〜Dの収束・Cauchy列・完備性をそのまま使えます。

### 2.1 ノルム写像は連続である

<a id="lem-f0-02c1-norm-continuity"></a>

<!-- formal-statement-start -->
> **補題（ノルム写像の連続性）**  
> 任意のノルム空間 $X$ と任意の $x,y\in X$ に対して

$$
\boxed{
\bigl|\|x\|-\|y\|\bigr|\le\|x-y\|
}
$$

> が成り立ちます。したがって $x_n\to x$ なら $\|x_n\|\to\|x\|$ です。
<!-- formal-statement-end -->

<!-- proof-start -->
#### 証明

三角不等式より

$$
\|x\|=\|(x-y)+y\|\le\|x-y\|+\|y\|
$$

なので

$$
\|x\|-\|y\|\le\|x-y\|.
$$

$x,y$ を入れ替えると

$$
\|y\|-\|x\|\le\|x-y\|
$$

も得られます。二つを合わせれば

$$
\bigl|\|x\|-\|y\|\bigr|\le\|x-y\|.
$$

特に $x_n\to x$ なら

$$
\bigl|\|x_n\|-\|x\|\bigr|\le\|x_n-x\|\to0,
$$

したがって $\|x_n\|\to\|x\|$ です。
<!-- proof-end -->

この補題は後の射影定理で、最小化列の極限を取った後に距離の極限を通すために使います。

---

## 3. 同じベクトル空間にも複数のノルムがある

$\mathbb R^p$ では代表的に

$$
\|x\|_1=\sum_{j=1}^p|x_j|,
$$

$$
\|x\|_2=\left(\sum_{j=1}^p x_j^2\right)^{1/2},
$$

$$
\|x\|_\infty=\max_j|x_j|
$$

があります。

有限次元ではこれらのノルムは同値です。例えば

$$
\|x\|_\infty
\le\|x\|_2
\le\sqrt p\,\|x\|_\infty.
$$

したがって、どのノルムで収束を定義しても同じ収束列が得られます。

この「有限次元ではノルムをあまり気にしなくてよい」という経験は、無限次元では通用しません。

---

## 4. 関数空間の代表的なノルム

### 4.1 supノルム

$C([0,1])$ に

$$
\boxed{
\|f\|_\infty
=\max_{0\le t\le1}|f(t)|
}
$$

を入れられます。

$f_n\to f$ がこのノルムで成り立つとは

$$
\sup_{t\in[0,1]}|f_n(t)-f(t)|\to0
$$

ということです。

これは、区間全体で誤差の上限が0へ行くsupノルムでの収束です。

### 4.2 $L^2$ 型のノルム

関数の差を平均二乗で測りたいなら

$$
\boxed{
\|f\|_2
=\left(\int_0^1|f(t)|^2\,dt\right)^{1/2}
}
$$

を使います。

supノルムでは一点でも大きく外れると強く効きますが、$L^2$ ノルムでは区間全体での二乗誤差を積分します。

したがって「近い関数」の意味が変わります。

---

## 5. Banach空間：極限で穴が開かないノルム空間

ノルムを入れればCauchy列を語れますが、極限が同じ空間に残るとは限りません。前章では、多項式のCauchy列がsupノルムで有理関数へ収束し、多項式全体の外へ出る例を見ました。近似・極限を関数解析の道具として使うには、こうした「極限の穴」がないことを別条件として要求する必要があります。

<a id="def-f0-02c1-banach-space"></a>

<!-- formal-statement-start -->
> **定義（Banach空間）**  
> ノルム空間 $X$ のすべてのCauchy列が $X$ 内で収束するとき、$X$ を **Banach空間** といいます。
<!-- formal-statement-end -->

$$
\boxed{
\text{Banach空間}
=\text{完備なノルム空間}
}
$$

です。

### 5.1 $C([0,1])$ とsupノルム

$C([0,1])$ は $\|\cdot\|_\infty$ についてBanach空間です。

理由を概略で確認します。

$f_n$ をsupノルムについてCauchy列とすると、各 $t$ を固定した実数列 $f_n(t)$ もCauchy列です。

$\mathbb R$ は完備なので

$$
f(t)=\lim_{n\to\infty}f_n(t)
$$

を定義できます。

さらにsupノルムのCauchy性から、同じsupノルムで極限 $f$ へ収束することを確認します。この一段を省略せず追います。

$\varepsilon>0$ を固定します。Cauchy性より、ある $N$ が存在して $m,n\ge N$ なら

$$
\|f_n-f_m\|_\infty<\frac{\varepsilon}{2}
$$

です。$n\ge N$ を固定し、各 $t\in[0,1]$ で $m\to\infty$ とすると $f_m(t)\to f(t)$ なので

$$
|f_n(t)-f(t)|
\le
\frac{\varepsilon}{2}.
$$

この評価は全ての $t$ に対して成り立つため

$$
\|f_n-f\|_\infty
=
\sup_{t\in[0,1]}|f_n(t)-f(t)|
\le
\frac{\varepsilon}{2}
<
\varepsilon.
$$

従って $f_n\to f$ はsupノルムでの収束です。

ここで、supノルムで収束する連続関数列の極限が連続であることを直接確認します。

$t_0\in[0,1]$ と $\varepsilon>0$ を固定します。supノルム収束より、十分大きい $N$ を取れば

$$
\|f-f_N\|_\infty<\frac{\varepsilon}{3}.
$$

$f_N$ は連続なので、ある $\delta>0$ が存在して $|t-t_0|<\delta$ なら

$$
|f_N(t)-f_N(t_0)|<\frac{\varepsilon}{3}.
$$

したがって三角不等式から

$$
\begin{aligned}
|f(t)-f(t_0)|
&\le |f(t)-f_N(t)|+|f_N(t)-f_N(t_0)|+|f_N(t_0)-f(t_0)|\\
&<\varepsilon.
\end{aligned}
$$

よって $f$ は $t_0$ で連続であり、$t_0$ は任意だったので $f\in C([0,1])$ です。つまり極限が空間の外へ逃げません。

---

## 6. $L^2$ 空間

厳密な $L^2([0,1])$ は

$$
\int_0^1|f(t)|^2\,dt<\infty
$$

となる可測関数を、**ほとんど至る所等しい関数を同一視して**作る空間です。

なぜ同一視するのでしょうか。

一点だけ値が違う関数 $f,g$ なら

$$
\int_0^1|f(t)-g(t)|^2\,dt=0
$$

となり、$L^2$ ノルムでは距離0になってしまうからです。

ノルムの条件

$$
\|f-g\|_2=0\Longrightarrow f=g
$$

を成立させるため、「測度0の集合上だけ異なる関数」は同じ元として扱います。

この事実は後のRKHSで重要です。$L^2$ の元に対して一点 $x$ の値 $f(x)$ を取り出す操作は、一般には空間の元だけからは決まりません。

また、$L^2$ が本当に完備であることは前提章の[$L^2$ の完備性](../F0_00D2E_L2完備性_Riesz_Fischer/index.md#thm-f0-00d2e-01)で証明済みです。この章では「$L^2$ はHilbert空間として使える」という結論を再利用し、完備性の長い証明は繰り返しません。

---

## 7. 内積：長さだけでなく角度を与える

ノルムが分かると長さと距離は測れます。しかし、次章で「残差が部分空間に直交する」「最近点を射影として表す」と言うには、方向どうしの角度に相当する情報が必要です。そこで、長さだけでなく二つのベクトルの向きの関係まで記録する内積を使います。

<a id="def-f0-02c1-inner-product"></a>

<!-- formal-statement-start -->
> **定義（実内積）**  
> 実ベクトル空間 $H$ 上の二変数関数 $\langle\cdot,\cdot\rangle:H\times H\to\mathbb R$ が、任意の $x,y,z\in H$ と $a,b\in\mathbb R$ に対して次を満たすとき **内積** といいます。

$$
\begin{aligned}
\langle x,x\rangle &\ge 0,\\
\langle x,x\rangle=0 &\iff x=0,\\
\langle x,y\rangle &= \langle y,x\rangle,\\
\langle ax+by,z\rangle
&=a\langle x,z\rangle+b\langle y,z\rangle.
\end{aligned}
$$

> これらはそれぞれ正定値性、対称性、線形性を表します。
<!-- formal-statement-end -->

内積から

$$
\boxed{
\|x\|=\sqrt{\langle x,x\rangle}
}
$$

とノルムが得られます。

### 7.1 内積の基本評価（Cauchy--Schwarzの復習）

$$
\boxed{
|\langle x,y\rangle|
\le\|x\|\,\|y\|
}
$$

です。有限次元での証明と等号条件は [F0-00E2 のCauchy--Schwarz不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz) を正本とします。

特に $y$ を固定すると

$$
|\langle x_n,y\rangle-\langle x,y\rangle|
=
|\langle x_n-x,y\rangle|
\le
\|x_n-x\|\,\|y\|.
$$

従って $x_n\to x$ なら右辺は0へ行き、$\langle x_n,y\rangle\to\langle x,y\rangle$ です。後で内積で定めた集合の閉性を確認するときも、この形で使えます。

---

## 8. Hilbert空間

内積だけあっても、Cauchy列の極限が空間の外へ逃げれば射影や極限操作を安定して使えません。そこで「角度を測れる内積構造」と「極限が空間内に残る完備性」を同時に要求します。それがHilbert空間です。

<a id="def-f0-02c1-hilbert-space"></a>

<!-- formal-statement-start -->
> **定義（Hilbert空間）**  
> 内積から定まるノルムについて完備な内積空間を **Hilbert空間** といいます。
<!-- formal-statement-end -->

$$
\boxed{
\text{Hilbert空間}
=\text{完備な内積空間}
}
$$

です。

したがって

$$
\text{Hilbert空間}
\subset
\text{Banach空間}
$$

ですが、逆は一般に成り立ちません。

### 8.1 $\ell^2$

$$
\ell^2
=\left\{x=(x_1,x_2,\dots):\sum_{j=1}^{\infty}|x_j|^2<\infty\right\}
$$

に

$$
\langle x,y\rangle
=\sum_{j=1}^{\infty}x_jy_j
$$

を入れます。これは $\mathbb N$ 上の数え上げ測度に対する $L^2$ とみなせるので、前提章の[$L^2$ の完備性](../F0_00D2E_L2完備性_Riesz_Fischer/index.md#thm-f0-00d2e-01)を適用すると、この内積が誘導するノルムについて完備です。従って $\ell^2$ はHilbert空間です。

### 8.2 $L^2([0,1])$

$$
\langle f,g\rangle
=\int_0^1f(t)g(t)\,dt
$$

を入れると、内積が誘導するノルムは本文第4節の $L^2$ ノルムです。[$L^2$ の完備性](../F0_00D2E_L2完備性_Riesz_Fischer/index.md#thm-f0-00d2e-01)によりこのノルムで完備なので、$L^2([0,1])$ はHilbert空間です。

---

<a id="ref-parallelogram-identity"></a>

## 9. すべてのノルムが内積から来るわけではない

Banach空間だからといって、ノルムの背後に内積があるとは限りません。では、与えられたノルムに「角度を復元できるだけの構造」があるかをどう見分ければよいでしょうか。まず必要条件として、内積由来のノルムなら必ず満たす恒等式を導きます。

<!-- formal-statement-start -->
> **命題（平行四辺形恒等式）**  
> 内積から誘導されるノルムでは、任意の $x,y$ に対して

$$
\boxed{
\|x+y\|^2+\|x-y\|^2
=2\|x\|^2+2\|y\|^2
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
#### 証明

内積の双線形性と対称性から

$$
\begin{aligned}
\|x+y\|^2
&=\langle x+y,x+y\rangle\\
&=\|x\|^2+2\langle x,y\rangle+\|y\|^2,
\end{aligned}
$$

$$
\begin{aligned}
\|x-y\|^2
&=\langle x-y,x-y\rangle\\
&=\|x\|^2-2\langle x,y\rangle+\|y\|^2.
\end{aligned}
$$

二式を足すと交差項が消えて

$$
\|x+y\|^2+\|x-y\|^2
=2\|x\|^2+2\|y\|^2
$$

を得ます。
<!-- proof-end -->

したがって、あるノルムがこの恒等式を満たさないことを一組の $x,y$ で示せれば、そのノルムは内積から誘導されたものではありません。

例えば $\mathbb R^2$ の $\|\cdot\|_1$ はこの恒等式を満たさないため、通常の意味の内積から誘導されたノルムではありません。

したがってBanach空間一般では、角度・直交・直交射影を自動的には使えません。

---

## 10. 直交

Hilbert空間で

$$
\langle x,y\rangle=0
$$

なら $x$ と $y$ は **直交** するといいます。

閉線形部分空間 $M\subset H$ に対し

$$
M^\perp
=\{z\in H:\langle z,m\rangle=0\ \forall m\in M\}
$$

を直交補空間といいます。

有限次元の

$$
\mathbb R^p=M\oplus M^\perp
$$

という直交分解は、Hilbert空間でも閉部分空間なら成立します。

その基礎になるのが射影定理です。

---

## 演習

### F0-02C1-A01 有限次元ノルムの比較

- Level: A
- 目安時間: 10分

$x=(x_1,x_2)\in\mathbb R^2$ に対して

$$
\|x\|_\infty\le\|x\|_2\le\sqrt2\,\|x\|_\infty
$$

を示せ。

<!-- solution-start -->
#### 詳細解答
$\max(|x_1|,|x_2|)^2\le x_1^2+x_2^2$ から左辺。各 $|x_i|\le\|x\|_\infty$ なので $x_1^2+x_2^2\le2\|x\|_\infty^2$ から右辺。

<!-- solution-end -->

### F0-02C1-A02 ノルム写像の連続性

- Level: A
- 目安時間: 10分

ノルム空間 $X$ で、三角不等式から

$$
\bigl|\|x\|-\|y\|\bigr|\le\|x-y\|
$$

を導き、$x_n\to x$ なら $\|x_n\|\to\|x\|$ であることを示せ。

<!-- solution-start -->
#### 詳細解答
三角不等式より $\|x\|\le\|x-y\|+\|y\|$ なので $\|x\|-\|y\|\le\|x-y\|$。$x,y$ を交換して逆向きの差も評価すれば絶対値の不等式を得る。そこへ $x=x_n$, $y=x$ を代入すると右辺が0へ行くので $\|x_n\|\to\|x\|$。

<!-- solution-end -->

### F0-02C1-A03 supノルムと $L^2$ ノルムでは近さが違う

- Level: A
- 目安時間: 10分

$[0,1]$ 上で

$$
f_n(t)=\max(1-nt,0)
$$

とする。$\|f_n\|_\infty$ と $\|f_n\|_2$ を求め、$f_n$ が $L^2$ ノルムでは0へ収束するがsupノルムでは0へ収束しないことを示せ。

<!-- solution-start -->
#### 詳細解答

$f_n(0)=1$ で、全ての $t$ について $0\le f_n(t)\le1$ なので

$$
\|f_n\|_\infty=1.
$$

従ってsupノルムでは0へ収束しません。

一方 $f_n(t)=1-nt$ となるのは $0\le t\le1/n$ で、それ以外では0です。従って

$$
\begin{aligned}
\|f_n\|_2^2
&=
\int_0^{1/n}(1-nt)^2\,dt.
\end{aligned}
$$

$s=nt$ と置くと $dt=ds/n$ なので

$$
\|f_n\|_2^2
=
\frac1n\int_0^1(1-s)^2\,ds
=
\frac1{3n}.
$$

従って

$$
\|f_n\|_2=\frac1{\sqrt{3n}}\to0.
$$

同じ関数列でも、どのノルムを選ぶかによって「0へ近づく」の意味が変わることが分かります。
<!-- solution-end -->

### F0-02C1-A04 直交からPythagorasの等式を導く

- Level: A
- 目安時間: 8分

内積空間で $\langle x,y\rangle=0$ とする。このとき

$$
\|x+y\|^2=\|x\|^2+\|y\|^2
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$\|v\|^2=\langle v,v\rangle$ を $v=x+y$ に使うと

$$
\begin{aligned}
\|x+y\|^2
&=
\langle x+y,x+y\rangle\\
&=
\langle x,x\rangle
+\langle x,y\rangle
+\langle y,x\rangle
+\langle y,y\rangle.
\end{aligned}
$$

実内積では対称性から $\langle y,x\rangle=\langle x,y\rangle=0$ なので

$$
\|x+y\|^2
=
\|x\|^2+\|y\|^2.
$$
<!-- solution-end -->

### F0-02C1-B01 l1ノルムは内積由来ではない

- Level: B
- 目安時間: 12分

$\mathbb R^2$ の $\|x\|_1=|x_1|+|x_2|$ が内積由来のノルムではないことを、[平行四辺形恒等式](#ref-parallelogram-identity)を使って示せ。

<!-- solution-start -->
#### 詳細解答
$x=(1,0)$, $y=(0,1)$ とする。$\|x+y\|_1^2+\|x-y\|_1^2=2^2+2^2=8$。一方 $2\|x\|_1^2+2\|y\|_1^2=4$。平行四辺形恒等式に反するので内積由来ではない。

<!-- solution-end -->

### F0-02C1-B02 supノルムCauchy列の極限を作る

- Level: B
- 目安時間: 18分

$(f_n)$ を $C([0,1])$ のsupノルムに関するCauchy列とし、各 $t$ について

$$
f(t)=\lim_{m\to\infty}f_m(t)
$$

と定める。$f_n\to f$ がsupノルムで成り立つことを、Cauchy条件から直接示せ。

<!-- solution-start -->
#### 詳細解答

$\varepsilon>0$ を取ります。Cauchy性より、ある $N$ が存在して $m,n\ge N$ なら

$$
\|f_n-f_m\|_\infty<\frac{\varepsilon}{2}.
$$

$n\ge N$ を固定します。この不等式から各 $t\in[0,1]$ について

$$
|f_n(t)-f_m(t)|<\frac{\varepsilon}{2}
$$

です。ここで $m\to\infty$ とすると $f_m(t)\to f(t)$ なので

$$
|f_n(t)-f(t)|\le\frac{\varepsilon}{2}.
$$

この評価は全ての $t$ で成り立つため

$$
\|f_n-f\|_\infty
=
\sup_{t\in[0,1]}|f_n(t)-f(t)|
\le\frac{\varepsilon}{2}
<
\varepsilon.
$$

従って $n\ge N$ なら $\|f_n-f\|_\infty<\varepsilon$ であり、$f_n\to f$ はsupノルムでの収束です。
<!-- solution-end -->

### F0-02C1-B03 $L^2$ の一点評価が元から決まらないことを確認する

- Level: B
- 目安時間: 12分

$[0,1]$ 上で

$$
f(t)=0,
\qquad
g(t)=
\begin{cases}
1,&t=0,\\
0,&t\ne0
\end{cases}
$$

とする。$f$ と $g$ が $L^2([0,1])$ では同じ元を表す一方、$f(0)\ne g(0)$ であることを示し、「$L^2$ の元の一点値」が一般には定義できない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$f$ と $g$ が異なるのは一点集合 $\{0\}$ 上だけです。一点集合のLebesgue測度は0なので

$$
\|f-g\|_2^2
=
\int_0^1|f(t)-g(t)|^2\,dt
=
0.
$$

従って $L^2$ では $f$ と $g$ は同じ元を表します。

しかし代表関数としての値は

$$
f(0)=0,
\qquad
g(0)=1
$$

で異なります。同じ $L^2$ の元を別の代表関数で書いたとき一点値が変わるため、一点評価 $h\mapsto h(0)$ は $L^2$ の元だけからは一意に定まりません。
<!-- solution-end -->

### F0-02C1-C01 BanachだがHilbertではない空間を有限次元で作る

- Level: C
- 目安時間: 18分

$X=(\mathbb R^2,\|\cdot\|_1)$ とする。

1. $X$ がBanach空間であることを示せ。
2. $X$ がHilbert空間ではないことを、[平行四辺形恒等式](#ref-parallelogram-identity)を使って示せ。
3. 「Banach空間」と「Hilbert空間」の違いを、この例に即して説明せよ。

<!-- solution-start -->
#### 詳細解答

$\mathbb R^2$ は有限次元なので、前章の[有限次元ノルム空間の完備性](../F0_00D1_ノルム_Banach_有限次元_無限次元/index.md#thm-f0-00d1-02)を $\|\cdot\|_1$ に適用できます。従って $X$ は完備なノルム空間、すなわちBanach空間です。

次に

$$
x=(1,0),
\qquad
y=(0,1)
$$

とすると

$$
\|x+y\|_1=2,
\qquad
\|x-y\|_1=2,
\qquad
\|x\|_1=\|y\|_1=1.
$$

従って[平行四辺形恒等式](#ref-parallelogram-identity)の左辺は

$$
2^2+2^2=8,
$$

右辺は

$$
2\cdot1^2+2\cdot1^2=4
$$

で一致しません。内積から誘導されるノルムならこの恒等式を満たす必要があるため、$\|\cdot\|_1$ はどの内積からも誘導されません。従って $X$ はHilbert空間ではありません。

この例では「Cauchy列の極限が空間内に残る」という完備性はありますが、「ノルムが内積から来て角度・直交を使える」という構造はありません。これがBanachとHilbertの差です。
<!-- solution-end -->


---

## 次に進む

**次：[F0-02C1A Hilbert射影定理・直交分解](../F0_02C1A_Hilbert射影定理_直交分解/index.md)**

---

## 章末チェック

- ノルム空間とBanach空間を区別できる。
- Banach空間とHilbert空間を区別できる。
- supノルムと $L^2$ ノルムの違いを説明できる。
- ノルム写像がノルムに関して連続であることを示せる。
- $L^2$ で一点評価が一般には決まらない理由を説明できる。
- 平行四辺形恒等式を内積の展開から示し、内積由来でないノルムの判定に使える。

---

## 定義の確認：Euclid空間はBanachかつHilbert

<!-- definition-example-start: def-f0-02c1-norm-normed-space, def-f0-02c1-banach-space, def-f0-02c1-inner-product, def-f0-02c1-hilbert-space -->
**定義の確認**

$X=\mathbb R^2$ に

$$
\langle x,y\rangle=x_1y_1+x_2y_2,
\qquad
\|x\|_2=\sqrt{x_1^2+x_2^2}
$$

を入れます。標準内積は正定値性・対称性・線形性を満たし、そこから誘導される $\|\cdot\|_2$ は正定値性・絶対斉次性・三角不等式を満たすのでノルムです。

さらに $\mathbb R^2$ のEuclidノルムに関するCauchy列は各座標が $\mathbb R$ のCauchy列になり、各座標極限をまとめた点へ収束します。従って $\mathbb R^2$ はBanach空間であり、しかもこの完備ノルムが内積から来ているのでHilbert空間です。
<!-- definition-example-end -->
