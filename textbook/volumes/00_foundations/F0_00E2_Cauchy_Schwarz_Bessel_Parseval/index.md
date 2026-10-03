# F0-00E2 Cauchy–Schwarz・Bessel・Parseval

[F0-00E1](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md) では、内積から正規直交基底・Gram--Schmidt・射影・QRまでを構成しました。その途中で

$$
\|x\|=\sqrt{\langle x,x\rangle}
$$

を「長さ」として使いましたが、まだこの量が本当に長さらしく振る舞うこと、特に三角不等式を満たすことは証明していません。

また、正規直交系に対して係数 $\langle x,q_i\rangle$ を読めることは分かりましたが、その係数の平方和が元のベクトルの長さとどう関係するかも未解決です。この講義では、この2つの問いを Cauchy--Schwarz、Bessel、Parseval でつなぎます。

```text
Cauchy--Schwarz
      ↓
三角不等式
      ↓
直交射影
      ↓
Bessel不等式
      ↓
Parseval等式
```

後の無限次元の内積空間でも同じ考え方を使うため、有限次元で一度証明を閉じます。

---

## 1. Cauchy--Schwarz不等式

$\|x+y\|^2$ を展開すると交差項 $2\langle x,y\rangle$ が現れます。三角不等式を示すには、この交差項が $\|x\|$ と $\|y\|$ に比べて大きくなりすぎないことを保証したいところです。

そこでまず、内積そのものを2本のベクトルの長さで上から抑える不等式を証明します。これが Cauchy--Schwarz の不等式です。

<a id="thm-f0-00e2-cauchy-schwarz"></a>

<!-- formal-statement-start -->
> **定理（Cauchy--Schwarz不等式）**  
> 内積空間の任意の $x,y$ に対して

$$
\boxed{
|\langle x,y\rangle|
\le
\|x\|\,\|y\|
}
$$

> が成り立ちます。等号が成り立つのは $x,y$ が一次従属であるとき、かつそのときに限ります。
<!-- formal-statement-end -->

---

<!-- round3-hidden-proof-fixed -->
## 2. 証明の見取り図：射影残差を最小にする

$y\ne0$ のとき、$x$ を $y$ の方向へ射影した残差

$$
\|x-ty\|^2
$$

は必ず非負です。これを $t$ の二次式として最小化すると、最良係数

$$
t_*=\frac{\langle x,y\rangle}{\|y\|^2}
$$

が出て、その最小値が0以上であることがCauchy--Schwarzそのものになります。等号は残差が本当に0、すなわち一次従属のときです。

<!-- proof-start -->
## 2. 証明：残差の長さの平方は負にならない

$y=0$ なら自明なので $y\ne0$ とします。

任意の $t\in\mathbb R$ に対して

$$
\|x-ty\|^2\ge0.
$$

展開すると

$$
\|x-ty\|^2
=
\|x\|^2
-2t\langle x,y\rangle
+t^2\|y\|^2.
$$

右辺を $t$ の二次式として見ると、$\|y\|^2>0$ なので平方完成できます。

$$
\begin{aligned}
\|x-ty\|^2
&=
\|y\|^2t^2
-2\langle x,y\rangle t
+\|x\|^2\\
&=
\|y\|^2
\left(
t-\frac{\langle x,y\rangle}{\|y\|^2}
\right)^2
+
\|x\|^2
-
\frac{\langle x,y\rangle^2}{\|y\|^2}.
\end{aligned}
$$

最初の平方項が0になる

$$
t_*
=
\frac{\langle x,y\rangle}{\|y\|^2}
$$

で最小値を取ります。したがって $t=t_*$ を代入すると

$$
0
\le
\|x-t_*y\|^2
=
\|x\|^2
-
\frac{|\langle x,y\rangle|^2}{\|y\|^2}.
$$

したがって

$$
|\langle x,y\rangle|^2
\le
\|x\|^2\|y\|^2.
$$

平方根を取れば

$$
\boxed{
|\langle x,y\rangle|
\le
\|x\|\|y\|
}
$$

です。

---

## 3. 等号条件

まず $y=0$ なら

$$
|\langle x,y\rangle|=0=\|x\|\|y\|
$$

で等号が成り立ち、$x,y$ は一次従属です。

以下 $y\ne0$ とします。上の証明で等号が成り立つのは、最小値が0、すなわち

$$
\|x-t_*y\|=0
$$

のときです。内積から作った長さが0ならベクトル自体が0なので

$$
x-t_*y=0,
\qquad
x=t_*y.
$$

従って $x,y$ は一次従属です。

逆に $x,y$ が一次従属なら、どちらかが0の場合はすでに等号を確認しました。両方が0でない場合は $x=cy$ と書けます。このとき

$$
|\langle x,y\rangle|
=
|c|\langle y,y\rangle
=
|c|\|y\|^2.
$$

また

$$
\begin{aligned}
\|x\|^2
&=
\langle cy,cy\rangle\\
&=
c^2\langle y,y\rangle\\
&=
c^2\|y\|^2,
\end{aligned}
$$

なので、非負平方根を取って

$$
\|x\|=|c|\|y\|.
$$

従って

$$
|\langle x,y\rangle|
=
\|x\|\|y\|
$$

となります。
<!-- proof-end -->

---

## 4. Cauchy--Schwarzから三角不等式を導く

<a id="thm-f0-00e2-triangle-inequality"></a>

<!-- formal-statement-start -->
> **定理（三角不等式）**  
> 内積空間で $\|x\|:=\sqrt{\langle x,x\rangle}$ と置く。このとき任意の $x,y$ に対して

$$
\boxed{
\|x+y\|\le\|x\|+\|y\|
}
$$

> を満たします。
<!-- formal-statement-end -->

[この定理はCauchy--Schwarz不等式](#thm-f0-00e2-cauchy-schwarz)から次のように従います。

$$
\begin{aligned}
\|x+y\|^2
&=
\langle x+y,x+y\rangle\\
&=
\|x\|^2
+2\langle x,y\rangle
+\|y\|^2\\
&\le
\|x\|^2
+2|\langle x,y\rangle|
+\|y\|^2\\
&\le
\|x\|^2
+2\|x\|\|y\|
+\|y\|^2\\
&=
(\|x\|+\|y\|)^2.
\end{aligned}
$$

したがって

$$
\boxed{
\|x+y\|
\le
\|x\|+\|y\|
}
$$

です。

残るノルムの公理も確認しておきます。内積の正定値性から

$$
\|x\|\ge0,
\qquad
\|x\|=0\Longleftrightarrow x=0
$$

です。また任意の $a\in\mathbb R$ に対して

$$
\begin{aligned}
\|ax\|^2
&=
\langle ax,ax\rangle\\
&=
a^2\langle x,x\rangle\\
&=
a^2\|x\|^2,
\end{aligned}
$$

なので、両辺の非負平方根を取って

$$
\|ax\|=|a|\|x\|.
$$

これと、いま示した三角不等式を合わせると、$\|x\|=\sqrt{\langle x,x\rangle}$ は確かにノルムの公理を満たします。E1で使ってきた「長さ」が、ここで正式にノルムとして確定しました。

---

## 5. 逆三角不等式

<a id="thm-f0-00e2-reverse-triangle-inequality"></a>

<!-- formal-statement-start -->
> **定理（逆三角不等式）**  
> 任意の $x,y$ に対して

$$
\boxed{
|\|x\|-\|y\||
\le
\|x-y\|
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

三角不等式から

$$
x=(x-y)+y
$$

と書けば

$$
\|x\|
\le
\|x-y\|+\|y\|.
$$

したがって

$$
\|x\|-\|y\|
\le
\|x-y\|.
$$

$x,y$ を入れ替えると

$$
\|y\|-\|x\|
\le
\|x-y\|.
$$

よって

$$
\boxed{
|\|x\|-\|y\||
\le
\|x-y\|
}
$$

です。

この式は、入力を $\|x-y\|$ だけ動かしたとき、長さの値の変化がそれを超えないことを表しています。

---

## 6. 正規直交座標の係数と展開

E1では、正規直交系 $q_1,\dots,q_k$ に沿う係数が内積 $\langle x,q_i\rangle$ で読めることを示しました。ここからは、その係数を名前を付けて追跡し、「係数をどれだけ集めれば元のベクトルの長さを回収できるか」を調べます。

正規直交系がまだ空間全体の基底でない場合と、基底になっている場合を同じ記法で比較できるよう、まず Fourier 係数と正規直交展開を定義します。

<a id="def-f0-00e2-fourier-coefficient"></a>

<!-- formal-statement-start -->
> **定義（Fourier係数）**  
> 内積空間の正規直交系 $q_1,\dots,q_k$ とベクトル $x$ に対し

$$
c_i=\langle x,q_i\rangle
$$

> を $x$ の $q_i$ に関する **Fourier係数** といいます。
<!-- formal-statement-end -->

<a id="def-f0-00e2-orthonormal-expansion"></a>

<!-- formal-statement-start -->
> **定義（正規直交展開）**  
> $q_1,\dots,q_n$ が有限次元内積空間 $V$ の正規直交基底であるとき、任意の $x\in V$ を

$$
x=\sum_{i=1}^n\langle x,q_i\rangle q_i
$$

> と表すことを、$x$ のこの基底に関する **正規直交展開** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e2-fourier-coefficient, def-f0-00e2-orthonormal-expansion -->
### 6.1 例：標準基底で係数を直接読む

**定義の確認**：上の定義条件をこの具体例で直接確認します。


$\mathbb R^2$ の正規直交基底 $e_1,e_2$ と $x=(3,-1)^{\mathsf T}$ に対して

$$
\langle x,e_1\rangle=3,
\qquad
\langle x,e_2\rangle=-1.
$$

従ってFourier係数は $3,-1$ で、

$$
x=3e_1-e_2
$$

と正規直交展開できます。
<!-- definition-example-end -->

<a id="prop-f0-00e2-orthogonal-projection-coefficients"></a>

<!-- formal-statement-start -->
> **命題（正規直交系への射影係数）**  
> $q_1,\dots,q_k$ を正規直交系とし、$p$ を $x$ の $\operatorname{span}(q_1,\dots,q_k)$ への直交射影とする。このとき

$$
p=\sum_{i=1}^k\langle x,q_i\rangle q_i
$$

> である。
<!-- formal-statement-end -->

$p=\sum_i c_iq_i$ と書きます。直交射影なので $x-p\perp q_j$ であり、

$$
0
=
\langle x-p,q_j\rangle
=
\langle x,q_j\rangle
-c_j.
$$

従って

$$
\boxed{c_j=\langle x,q_j\rangle}
$$

であり、射影公式が得られます。

---

## 7. Bessel不等式

正規直交基底なら全ての座標を使って $x$ を復元できます。しかし、$q_1,\dots,q_k$ が正規直交**系**にすぎず、空間全体を張っていないときは、係数から作った射影に残差が残ります。

それでも、取り出した係数の平方和が元の長さを超えないことは保証できます。その上限を与えるのが Bessel の不等式です。

<a id="thm-f0-00e2-bessel-inequality"></a>

<!-- formal-statement-start -->
> **定理（Bessel不等式）**  
> $q_1,\dots,q_k$ を内積空間の正規直交系とする。このとき任意の $x$ に対して

$$
\sum_{i=1}^k|\langle x,q_i\rangle|^2
\le
\|x\|^2
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

正規直交系が張る部分空間への射影 $p$ と残差 $r=x-p$ は直交します。従って $\|x\|^2$ は「射影成分の平方和」と「残差の平方」に分かれ、後者を捨てれば不等式になります。

<!-- proof-start -->
### 証明

$$
p=
\sum_{i=1}^k\langle x,q_i\rangle q_i,
\qquad
r=x-p
$$

と置きます。射影の性質から $p\perp r$ なので

$$
\|x\|^2=\|p\|^2+\|r\|^2.
$$

正規直交性より、$c_i=\langle x,q_i\rangle$ と書けば

$$
\begin{aligned}
\|p\|^2
&=
\left\langle
\sum_i c_iq_i,
\sum_j c_jq_j
\right\rangle\\
&=
\sum_{i,j}c_ic_j\langle q_i,q_j\rangle\\
&=
\sum_{i,j}c_ic_j\,\delta_{ij}\\
&=
\sum_i c_i^2\\
&=
\sum_i|\langle x,q_i\rangle|^2.
\end{aligned}
$$

ここで $\delta_{ij}$ は $i=j$ のとき1、$i\ne j$ のとき0であり、交差項が全て消えることを表しています。

従って

$$
\|x\|^2
=
\sum_{i=1}^k|\langle x,q_i\rangle|^2
+
\|r\|^2
\ge
\sum_{i=1}^k|\langle x,q_i\rangle|^2.
$$
<!-- proof-end -->

---

## 8. Bessel不等式の不足分は何か

上の証明から

$$
\boxed{
\|x\|^2
-
\sum_{i=1}^k
|\langle x,q_i\rangle|^2
=
\left\|
x-
\sum_{i=1}^k
\langle x,q_i\rangle q_i
\right\|^2
}
$$

です。

つまり不足分は、正規直交系が張る部分空間で表現できなかった **射影残差のノルム平方** です。

この形は回帰・主成分分析・Fourier展開でもそのまま現れます。

---

## 9. Parseval等式

<a id="thm-f0-00e2-parseval-identity"></a>

<!-- formal-statement-start -->
> **定理（有限次元Parseval等式）**  
> $q_1,\dots,q_n$ が有限次元内積空間 $V$ の正規直交基底なら、任意の $x\in V$ に対して

$$
\|x\|^2
=
\sum_{i=1}^n|\langle x,q_i\rangle|^2
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の核心

Bessel不等式との違いは、正規直交系が $V$ 全体を張るため射影残差が0になることだけです。

<!-- proof-start -->
### 証明

正規直交基底なので

$$
x=
\sum_{i=1}^n\langle x,q_i\rangle q_i.
$$

Besselの恒等式

$$
\|x\|^2
-
\sum_{i=1}^n|\langle x,q_i\rangle|^2
=
\left\|
x-
\sum_{i=1}^n\langle x,q_i\rangle q_i
\right\|^2
$$

の右辺は0です。従ってParseval等式が得られます。
<!-- proof-end -->

---

## 10. 行列で見るParseval

正規直交基底を列に並べて

$$
Q
=
\begin{pmatrix}
q_1&\cdots&q_n
\end{pmatrix}
$$

とします。

正規直交性は

$$
Q^{\mathsf T}Q=I
$$

です。

ここで $Q$ は $n\times n$ の正方行列です。$Q^{\mathsf T}Q=I$ は $Q^{\mathsf T}$ が $Q$ の左逆行列であることを意味します。正方行列が左逆行列を持てば $Q$ は可逆で、その逆行列は一意なので

$$
Q^{-1}=Q^{\mathsf T}.
$$

従って右から見ても

$$
QQ^{\mathsf T}
=
QQ^{-1}
=
I
$$

です。

座標は

$$
Q^{\mathsf T}x
$$

で、そのノルムは

$$
\|Q^{\mathsf T}x\|^2
=x^{\mathsf T}QQ^{\mathsf T}x
=\|x\|^2.
$$

つまり正規直交基底への座標変換は長さを保存します。

---

## 11. 無限次元で何が変わるか

有限次元では、基底を有限本並べれば終わります。

無限次元へ進むと、正規直交系

$$
q_1,q_2,\dots
$$

について

$$
\sum_{i=1}^{\infty}
|\langle x,q_i\rangle|^2
\le
\|x\|^2
$$

というBessel不等式が現れます。

しかし

$$
\|x\|^2
=
\sum_{i=1}^{\infty}
|\langle x,q_i\rangle|^2
$$

となるには、その正規直交系が空間を十分に張っている必要があります。

無限個の「線形結合」は有限和ではなく極限を伴うため、「部分和の列が近づいていくとき、その極限が同じ空間の中に存在するか」という新しい問題が生じます。

後続の関数解析では、この極限を空間内に保てる性質を **完備性** として定義し、Bessel 不等式や Parseval 等式の無限次元版をそこで整理します。ここでは、その用語や定理を前提には使いません。

---

## 12. 演習

### F0-00E2-A01 Cauchy--Schwarzの数値確認

- Level: A
- 目安時間: 8分

$x=(1,2)^{\mathsf T}$、$y=(2,-1)^{\mathsf T}$ についてCauchy--Schwarz不等式を数値で確認せよ。

<!-- solution-start -->
#### 詳細解答

$$
\langle x,y\rangle=1\cdot2+2\cdot(-1)=0.
$$

また

$$
\|x\|=\|y\|=\sqrt5.
$$

従って

$$
|\langle x,y\rangle|
=0
\le
5
=
\|x\|\|y\|.
$$
<!-- solution-end -->

### F0-00E2-A02

- Level: A
- 目安時間: 8分

$x=(2,-4)^{\mathsf T}$、$y=(-1,2)^{\mathsf T}$ についてCauchy--Schwarz不等式で等号が成り立つことを確認し、一次従属の係数を求めよ。

<!-- solution-start -->
#### 詳細解答

$x=-2y$ なので2本は一次従属です。直接計算すると

$$
\langle x,y\rangle=-10,
\qquad
\|x\|=2\sqrt5,
\qquad
\|y\|=\sqrt5.
$$

従って

$$
|\langle x,y\rangle|=10
=
(2\sqrt5)(\sqrt5)
=
\|x\|\|y\|.
$$

等号条件と一致します。
<!-- solution-end -->

### F0-00E2-A03

- Level: A
- 目安時間: 8分

$x=(3,0)^{\mathsf T}$、$y=(0,4)^{\mathsf T}$ について三角不等式を確認せよ。また、この例で等号にならない理由を内積から説明せよ。

<!-- solution-start -->
#### 詳細解答

$$
\|x+y\|=\|(3,4)\|=5,
\qquad
\|x\|+\|y\|=3+4=7.
$$

従って $5<7$ です。

三角不等式の証明では

$$
\langle x,y\rangle
\le
|\langle x,y\rangle|
\le
\|x\|\|y\|
$$

を使いました。等号になるには、特に

$$
\langle x,y\rangle
=
\|x\|\|y\|
$$

が必要です。この例では

$$
\langle x,y\rangle=0
<
3\cdot4
=
\|x\|\|y\|
$$

なので、この段階ですでに不等号が厳密になり、三角不等式でも等号にはなりません。
<!-- solution-end -->

### F0-00E2-A04 Fourier係数

- Level: A
- 目安時間: 10分

$$
q_1=\frac1{\sqrt2}(1,1)^{\mathsf T},
\qquad
q_2=\frac1{\sqrt2}(1,-1)^{\mathsf T},
\qquad
x=(3,1)^{\mathsf T}
$$

とする。Fourier係数を求め、$x$ を正規直交展開せよ。

<!-- solution-start -->
#### 詳細解答

$$
c_1=\langle x,q_1\rangle=\frac4{\sqrt2}=2\sqrt2,
\qquad
c_2=\langle x,q_2\rangle=\frac2{\sqrt2}=\sqrt2.
$$

従って

$$
x=c_1q_1+c_2q_2
=2\sqrt2q_1+\sqrt2q_2.
$$

右辺を標準座標へ戻すと $(2,2)^{\mathsf T}+(1,-1)^{\mathsf T}=(3,1)^{\mathsf T}$ です。
<!-- solution-end -->

### F0-00E2-B01 Besselの不足分

- Level: B
- 目安時間: 12分

正規直交系 $q_1,\dots,q_k$ と

$$
p=\sum_i\langle x,q_i\rangle q_i
$$

に対し

$$
\|x\|^2
-
\sum_i|\langle x,q_i\rangle|^2
=
\|x-p\|^2
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$p$ は正規直交系が張る部分空間への射影なので $p\perp(x-p)$ です。従って

$$
\|x\|^2=\|p\|^2+\|x-p\|^2.
$$

一方、$c_i=\langle x,q_i\rangle$ と置くと、正規直交性から

$$
\begin{aligned}
\|p\|^2
&=
\left\langle
\sum_i c_iq_i,
\sum_j c_jq_j
\right\rangle\\
&=
\sum_{i,j}c_ic_j\langle q_i,q_j\rangle\\
&=
\sum_i c_i^2\\
&=
\sum_i|\langle x,q_i\rangle|^2.
\end{aligned}
$$

これを

$$
\|x\|^2=\|p\|^2+\|x-p\|^2
$$

へ代入して $\|p\|^2$ を左辺へ移せば、所望の恒等式です。
<!-- solution-end -->

### F0-00E2-B02 Parsevalと座標変換

- Level: B
- 目安時間: 12分

$q_1,\dots,q_n$ を $V$ の正規直交基底とする。$x=\sum_i c_iq_i$ なら $c_i=\langle x,q_i\rangle$ であり、

$$
\|x\|^2=\sum_i c_i^2
$$

となることを、内積の計算から示せ。

<!-- solution-start -->
#### 詳細解答

両辺と $q_j$ の内積を取ると

$$
\langle x,q_j\rangle
=
\sum_i c_i\langle q_i,q_j\rangle
=c_j.
$$

次に

$$
\begin{aligned}
\|x\|^2
&=
\left\langle\sum_i c_iq_i,\sum_j c_jq_j\right\rangle\\
&=
\sum_{i,j}c_ic_j\langle q_i,q_j\rangle\\
&=
\sum_i c_i^2.
\end{aligned}
$$

ここで交差項が消える理由が正規直交性です。
<!-- solution-end -->

### F0-00E2-B03 Besselで等号になる条件

- Level: B
- 目安時間: 15分

$q_1,\dots,q_k$ を正規直交系とする。Bessel不等式

$$
\sum_{i=1}^k|\langle x,q_i\rangle|^2\le\|x\|^2
$$

で等号が成り立つことと、

$$
x\in\operatorname{span}(q_1,\dots,q_k)
$$

が同値であることを示せ。

<!-- solution-start -->
#### 詳細解答

射影

$$
p=\sum_i\langle x,q_i\rangle q_i
$$

を使うとBesselの不足分は

$$
\|x\|^2-\sum_i|\langle x,q_i\rangle|^2
=
\|x-p\|^2.
$$

従って等号成立は $\|x-p\|^2=0$ と同値で、これは $x-p=0$、すなわち $x=p$ と同値です。$p$ は $q_i$ の線形結合なので、これは

$$
x\in\operatorname{span}(q_1,\dots,q_k)
$$

と同値です。
<!-- solution-end -->

### F0-00E2-C01 BesselからParsevalへ

- Level: C
- 目安時間: 25分

$$
q_1=\frac1{\sqrt2}(1,1,0)^{\mathsf T},
\qquad
q_2=\frac1{\sqrt6}(1,-1,2)^{\mathsf T},
\qquad
x=(2,0,1)^{\mathsf T}
$$

とする。

1. $q_1,q_2$ が正規直交系であることを確認し、Fourier係数と射影 $p$ を求めよ。
2. Bessel不等式の両辺と不足分 $\|x-p\|^2$ を計算せよ。
3. $q_1,q_2$ に直交する単位ベクトル $q_3$ を1本選び、$q_1,q_2,q_3$ に対するParseval等式を数値で確認せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
\|q_1\|=\|q_2\|=1,
\qquad
\langle q_1,q_2\rangle=0.
$$

Fourier係数は

$$
c_1=\langle x,q_1\rangle=\sqrt2,
\qquad
c_2=\langle x,q_2\rangle=\frac4{\sqrt6}.
$$

従って

$$
p=c_1q_1+c_2q_2
=
\begin{pmatrix}
5/3\\
1/3\\
4/3
\end{pmatrix}.
$$

また

$$
\|x\|^2=5,
$$

一方

$$
c_1^2+c_2^2
=
2+\frac{16}{6}
=
\frac{14}{3}.
$$

従ってBessel不等式は $14/3\le5$ で、不足分は

$$
5-\frac{14}{3}=\frac13.
$$

実際

$$
x-p=
\begin{pmatrix}
1/3\\
-1/3\\
-1/3
\end{pmatrix},
\qquad
\|x-p\|^2=\frac13.
$$

この残差方向

$$
r=x-p
=
\frac13(1,-1,-1)^{\mathsf T}
$$

の長さは

$$
\|r\|
=
\sqrt{\frac13}
=
\frac1{\sqrt3}
$$

です。従って

$$
q_3
=
\frac{r}{\|r\|}
=
\frac1{\sqrt3}(1,-1,-1)^{\mathsf T}
$$

と正規化できます。すると

$$
c_3=\langle x,q_3\rangle=\frac1{\sqrt3},
\qquad
c_3^2=\frac13.
$$

従って

$$
c_1^2+c_2^2+c_3^2
=
\frac{14}{3}+\frac13
=5
=
\|x\|^2.
$$

正規直交系を基底まで補うと、Besselの不足分が最後の座標成分として回収され、Parseval等式になります。
<!-- solution-end -->
---

## 13. 次に進む

ここまでで正規直交座標の基本不等式と展開公式が揃いました。

次は、一般の固有方向の理論とここで準備した直交性を合流させ、実対称行列を正規直交基底で対角化します。

**次：[F0-00F1 実対称行列の直交対角化](../F0_00F1_固有空間_スペクトル定理_PSD/index.md)**
