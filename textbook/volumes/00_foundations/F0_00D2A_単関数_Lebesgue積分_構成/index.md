# F0-00D2A 補講：単関数からLebesgue積分を構成する

D2では、測度空間と可測関数を定義しました。この講義では、その上で **Lebesgue積分そのものを定義**します。

中心となる発想は

```text
指示関数
 ↓
単関数
 ↓
非負可測関数
 ↓
正負を持つ可積分関数
```

です。

Riemann積分が「定義域を細かく切る」のに対し、Lebesgue積分は「関数値の高さごとに集合の大きさを測る」方向から作ります。

## 0. まず段状関数で「下から面積を作る」を見る

$[0,1]$ 上の

$$
f(x)=x
$$

を考えます。幅 $1/4$ ごとに高さを下側へ丸めると、たとえば

$$
\phi(x)
=
0\,1_{[0,1/4)}
+\frac14 1_{[1/4,1/2)}
+\frac12 1_{[1/2,3/4)}
+\frac34 1_{[3/4,1]}
$$

という段状関数を作れます。

この $\phi$ は $0\le\phi\le f$ で、積分は長方形の面積の和

$$
\int_0^1\phi(x)\,dx
=
\frac14\left(0+\frac14+\frac12+\frac34\right)
=
\frac38.
$$

刻みを細かくすれば、下側の段状関数は $f$ へ近づき、面積も $1/2$ へ近づきます。

Lebesgue積分の構成は、この小学校的な「長方形の面積の和」を一般の測度空間まで押し広げたものです。

```text
集合の大きさ μ(A)
 ↓ 高さ1を乗せる
指示関数 1_A の積分
 ↓ 有限個足す
単関数の積分
 ↓ 下から細かく近似
非負可測関数の積分
 ↓ 正負に分解
一般の可積分関数
```

この順番を持っていれば、後の定義が突然のものに見えません。

---

## 1. 指示関数から始める

測度空間 $(\Omega,\mathcal F,\mu)$ と可測集合 $A\in\mathcal F$ に対して、指示関数 $1_A$ はD2で可測であることを示しました。

まず

$$
\boxed{
\int_\Omega 1_A\,d\mu:=\mu(A)
}
$$

と定めるのが自然です。

集合の「大きさ」を、その集合上で高さ1の関数の「面積」として読み替えています。

---

## 2. 単関数

指示関数 $1_A$ だけなら「高さ1の長方形」に相当する面積しか表せません。次に必要なのは、場所ごとに高さが違う関数でも、まだ有限個の長方形へ分解して計算できるクラスです。

そこで、値の種類を有限個に限定し、それぞれの値を取る場所が可測になる対象を考えます。このクラスなら、各高さを取る集合の測度を調べて「高さ×測度」を有限個足すだけで積分できます。

<a id="def-f0-00d2a-01"></a>
 
<!-- formal-statement-start -->
### 定義（非負単関数）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の可測関数 $\phi:\Omega\to[0,\infty)$ が有限個の値しか取らないとき、$\phi$ を **非負単関数** という。

$\phi$ が取る **正の値** を

$$
a_1,\ldots,a_m
$$

とし、

$$
A_k=\{\omega\in\Omega:\phi(\omega)=a_k\}
$$

と置けば、$A_1,\ldots,A_m$ は互いに素な可測集合で

$$
\phi
=
\sum_{k=1}^m a_k1_{A_k}
$$

と書ける。$\phi=0$ となる点はこの和の外側に残してよい。したがって、積分表示では係数0の集合をわざわざ含める必要はありません。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d2a-01 -->
### 2.1 例：値を取る集合から単関数表示を作る

**定義の確認**

$\Omega=[0,3]$ とし、

$$
\phi
=
2\,1_{[0,1)}
+
5\,1_{[2,3]}
$$

とします。$\phi$ が取る正の値は $2,5$ で、

$$
A_1=[0,1),
\qquad
A_2=[2,3]
$$

は互いに素な可測集合です。区間 $[1,2)$ では $\phi=0$ なので表示の外側に残っています。したがって定義どおり $\phi$ は非負単関数です。
<!-- definition-example-end -->

非負単関数を導入した目的は、有限個の高さごとに面積を足すことでした。そこで、値 $a_k$ を取る集合 $A_k$ の「高さ $a_k$ × 大きさ $\mu(A_k)$」を全て加えた量を積分とします。この値が表示の仕方に依存しないことは、この直後に証明します。

<a id="def-f0-00d2a-02"></a>
 
<!-- formal-statement-start -->
### 定義（非負単関数の積分）

非負単関数

$$
\phi
=
\sum_{k=1}^m a_k1_{A_k}
$$

に対して

$$
\boxed{
\int_\Omega\phi\,d\mu
:=
\sum_{k=1}^m a_k\mu(A_k)
}
$$

と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d2a-02 -->
### 2.2 例：高さ×測度を有限個足す

**定義の確認**

上の

$$
\phi
=
2\,1_{[0,1)}
+
5\,1_{[2,3]}
$$

を Lebesgue 測度 $m$ で積分すると、

$$
\int_{[0,3]}\phi\,dm
=
2m([0,1))+5m([2,3])
=
2\cdot1+5\cdot1
=
7.
$$

値0の部分 $[1,2)$ は積分へ寄与しません。
<!-- definition-example-end -->

<a id="prop-f0-00d2a-01"></a>
 
<!-- formal-statement-start -->
### 命題（表現に依存しない）

同じ非負単関数 $\phi$ を異なる可測分割で表しても、上の積分値は同じである。
<!-- formal-statement-end -->

### 証明の見取り図：異なる分割を共通の細分へ落とす

同じ段状関数を違う区間分割で書いても、両方の分割を交差させた共通細分

$$
A_i\cap B_j
$$

まで細かくすれば、各小片の上では二つの表現の高さは同じです。

あとは同じ小片の「高さ×測度」を足し直すだけなので積分値は変わりません。

<!-- proof-start -->
#### 証明

2つの表現を

$$
\phi=\sum_{i=1}^m a_i1_{A_i}
=
\sum_{j=1}^n b_j1_{B_j}
$$

とします。ここでは前の定義に合わせて $a_i,b_j>0$ とし、各 $A_i,B_j$ は $\phi$ がその正の値を取る集合だけを並べたものとします。

固定した $i$ を考えます。$x\in A_i$ なら

$$
\phi(x)=a_i>0.
$$

したがって第2表示でも $x$ はどれか一つの $B_j$ に入り、その $B_j$ 上の値は

$$
b_j=\phi(x)=a_i
$$

です。よって

$$
A_i
=
\bigsqcup_{j=1}^n(A_i\cap B_j).
$$

同じ理由で

$$
B_j
=
\bigsqcup_{i=1}^m(A_i\cap B_j).
$$

各共通部分 $A_i\cap B_j$ が非空なら、その上で二つの表示は同じ関数値を与えるので

$$
a_i=b_j.
$$

測度の有限加法性を使うと

$$
\begin{aligned}
\sum_{i=1}^m a_i\mu(A_i)
&=
\sum_{i=1}^m
a_i
\sum_{j=1}^n\mu(A_i\cap B_j)\\
&=
\sum_{i=1}^m\sum_{j=1}^n
a_i\mu(A_i\cap B_j)\\
&=
\sum_{i=1}^m\sum_{j=1}^n
b_j\mu(A_i\cap B_j)\\
&=
\sum_{j=1}^n b_j\mu(B_j).
\end{aligned}
$$

したがって積分値は表現に依存しません。$\square$
<!-- proof-end -->

### 例1：三段の単関数

$[0,3]$ 上のLebesgue測度 $m$ に対し

$$
\phi(x)
=
1_{[0,1)}(x)+2\,1_{[1,2)}(x)+4\,1_{[2,3]}(x)
$$

なら

$$
\int_0^3\phi(x)\,dx
=1\cdot1+2\cdot1+4\cdot1
=7.
$$

---

## 3. 非負可測関数を単関数で下から近似する

Lebesgue積分の核心は「一般の非負可測関数を、単関数で下から近似する」ことです。

### 3.1 直感：一般関数をいきなり積分せず、「有限段の下側近似」へ戻す

一般の可測関数は無限に多くの値を取るため、そのままでは「高さ×測度」の有限和にできません。

そこで

1. 高さを細かい刻みで下へ丸める。
2. 高すぎる部分は一度有限の高さで切る。
3. 刻みを細かくし、切断高さを上げる。

とすれば、単関数 $\phi_n$ が単調に $f$ へ迫ります。

この構成が、後のMCTで「単関数で分かることを一般非負関数へ持ち上げる」ためのエンジンになります。

<a id="thm-simple-function-approximation"></a>

<!-- formal-statement-start -->
### 定理（単関数近似）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の非負可測関数 $f:\Omega\to[0,\infty]$ に対して、非負単関数列 $(\phi_n)$ が存在し、

$$
0\le\phi_1\le\phi_2\le\cdots\le f
$$

かつ各 $\omega\in\Omega$ について

$$
\phi_n(\omega)\uparrow f(\omega)
$$

となる。
<!-- formal-statement-end -->

### 証明の見取り図

各 $n$ で関数値を幅 $2^{-n}$ の階段へ下向きに丸め、さらに高さ $2^n$ で切断します。

- 区切り幅 $2^{-n}$ は0へ行くので丸め誤差が消える。
- 切断高さ $2^n$ は無限大へ行くので有限値の点では切断の影響が消える。
- 前の近似より細かく・高くするため $\phi_n\le\phi_{n+1}$。

この三点で $\phi_n\uparrow f$ を作ります。

<!-- proof-start -->
#### 証明

$n\ge1$ に対して、$[0,2^n)$ を幅 $2^{-n}$ で刻み、

$$
\phi_n(\omega)
=
\begin{cases}
\dfrac{k}{2^n},&\dfrac{k}{2^n}\le f(\omega)<\dfrac{k+1}{2^n},\quad k=0,\ldots,2^{2n}-1,\\
2^n,&f(\omega)\ge2^n
\end{cases}
$$

と定めます。

まず各段の集合が可測であることを確認します。任意の $t\in\mathbb R$ について

$$
\{f<t\}
=
\bigcup_{r=1}^{\infty}
\left\{
f\le t-\frac1r
\right\}
$$

なので、[D2 の可測関数の定義](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#def-f0-00d2-07)から $\{f<t\}$ も可測です。従って

$$
\left\{
\frac{k}{2^n}\le f<\frac{k+1}{2^n}
\right\}
=
\left\{f\ge\frac{k}{2^n}\right\}
\cap
\left\{f<\frac{k+1}{2^n}\right\}
$$

は可測であり、$\{f\ge2^n\}$ も可測です。よって $\phi_n$ は非負単関数です。

定義から常に

$$
0\le\phi_n\le f.
$$

次に単調性を確認します。固定した $\omega$ について $y=f(\omega)$ と置きます。

- $y\ge2^{n+1}$ なら
  $$
  \phi_n(\omega)=2^n
  \le
  2^{n+1}
  =
  \phi_{n+1}(\omega).
  $$
- $2^n\le y<2^{n+1}$ なら $\phi_n(\omega)=2^n$ で、$\phi_{n+1}$ は $y$ を幅 $2^{-(n+1)}$ で下へ丸めた値だから
  $$
  \phi_{n+1}(\omega)\ge2^n=\phi_n(\omega).
  $$
- $0\le y<2^n$ なら
  $$
  \phi_n(\omega)
  =
  2^{-n}\lfloor2^ny\rfloor,
  $$
  $$
  \phi_{n+1}(\omega)
  =
  2^{-(n+1)}\lfloor2^{n+1}y\rfloor.
  $$
  $\lfloor2u\rfloor\ge2\lfloor u\rfloor$ を $u=2^ny$ に適用すると
  $$
  \phi_{n+1}(\omega)
  \ge
  \phi_n(\omega).
  $$

従って全ての $\omega$ で

$$
\phi_n(\omega)\le\phi_{n+1}(\omega).
$$

$f(\omega)<\infty$ なら十分大きい $n$ で切断の影響がなくなり、

$$
0\le f(\omega)-\phi_n(\omega)<2^{-n}.
$$

$f(\omega)=\infty$ なら $\phi_n(\omega)=2^n$ となるため発散します。よって $\phi_n\uparrow f$。$\square$
<!-- proof-end -->

---

## 4. 非負可測関数のLebesgue積分

### 4.1 なぜ 上限 で定義するのか

非負関数 $f$ の下に入る単関数は一つではありません。粗い近似も細かい近似もあります。

そこで「下から作れる面積のうち最大限どこまで行けるか」を

$$
\sup\left\{\int\phi:0\le\phi\le f\right\}
$$

で取ります。

この定義なら、特定の近似手順に依存せず、**全ての下側階段近似を使った最良の面積**として積分が決まります。

<a id="def-f0-00d2a-03"></a>
 
<!-- formal-statement-start -->
### 定義（非負可測関数のLebesgue積分）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の非負可測関数 $f:\Omega\to[0,\infty]$ に対して

$$
\boxed{
\int_\Omega f\,d\mu
:=
\sup\left\{
\int_\Omega\phi\,d\mu:
0\le\phi\le f,\ \phi\text{ は非負単関数}
\right\}
}
$$

と定義する。

積分値は $[0,\infty]$ を取り得ます。つまり非負関数については、積分が $\infty$ でも定義自体はされています。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d2a-03 -->
### 4.2 この定義は単関数の積分を本当に拡張している

**定義の確認**

非負単関数 $\phi$ を一つ固定します。新しい定義では

$$
\int\phi\,d\mu
=
\sup\left\{
\int\psi\,d\mu:
0\le\psi\le\phi,\psi\text{ は非負単関数}
\right\}.
$$

右辺の候補には $\psi=\phi$ 自身が入るので、新しい値は従来の単関数積分以上です。

逆に $0\le\psi\le\phi$ を満たす非負単関数 $\psi$ を取ります。$\psi$ と $\phi$ の値を取る集合を共通細分すると、各小片上で

$$
0\le\psi\text{ の高さ}\le\phi\text{ の高さ}
$$

です。各小片の測度を掛けて有限個足せば

$$
\int\psi\,d\mu
\le
\int\phi\,d\mu.
$$

従って候補全体の上限も $\int\phi\,d\mu$ 以下です。両向きを合わせて、新しい定義は前節の単関数積分と一致します。
<!-- definition-example-end -->

<a id="prop-f0-00d2a-02"></a>
 
<!-- formal-statement-start -->
### 命題（単調性）

非負可測関数 $f,g$ が $f\le g$ を満たすなら

$$
\int f\,d\mu\le\int g\,d\mu.
$$
<!-- formal-statement-end -->

#### 証明の見取り図

$f\le g$ なら、$f$ の下に入る単関数は自動的に $g$ の下にも入ります。

したがって 上限 を取る候補集合が包含され、積分の大小もそのまま従います。

<!-- proof-start -->
#### 証明

$f$ 以下の非負単関数はすべて $g$ 以下でもあります。したがって上限を取る集合が包含されるため不等式が成立します。$\square$
<!-- proof-end -->

### 例2：Dirichlet関数

$[0,1]$ 上で

$$
f(x)=1_{\mathbb Q\cap[0,1]}(x)
$$

とします。有理数集合はLebesgue測度0なので

$$
\int_0^1f(x)\,dx
=m(\mathbb Q\cap[0,1])
=0.
$$

Riemann積分は存在しませんが、Lebesgue積分は0です。

---

## 5. 正負を持つ関数

ここまでは非負関数だけを積分しました。しかし一般の実数値関数には正の部分と負の部分があります。単に「正の面積−負の面積」と書くと、両方が無限大の場合に $\infty-\infty$ となって意味を持ちません。

そこでまず、関数を **正の寄与と負の寄与に二つの非負関数として分解**します。この分解により、前節までに構成した非負Lebesgue積分をそのまま利用できます。

<a id="def-f0-00d2a-04"></a>
 
<!-- formal-statement-start -->
### 定義（正部分・負部分）

実数値可測関数 $f:\Omega\to\mathbb R$ に対して

$$
f^+=\max(f,0),
\qquad
f^-=\max(-f,0)
$$

をそれぞれ **正部分**、**負部分** という。

このとき

$$
f=f^+-f^-,
\qquad
|f|=f^++f^-.
$$
<!-- formal-statement-end -->

この二つが可測であることも、しきい値集合から直接確認できます。$a<0$ では $\{f^+\le a\}=\varnothing$ です。$a\ge0$ では

$$
\{f^+\le a\}
=
\{f\le a\},
$$

なので可測です。

同じく $a<0$ では $\{f^-\le a\}=\varnothing$。$a\ge0$ では

$$
\{f^-\le a\}
=
\{f\ge-a\}.
$$

右辺は

$$
\{f\ge-a\}
=
\Omega\setminus\{f<-a\}
$$

で、$\{f<-a\}$ は可測関数のしきい値集合から可測です。従って $f^+,f^-$ はともに非負可測関数であり、前節の非負積分を適用できます。

<!-- definition-example-start: def-f0-00d2a-04 -->
### 5.1 例：符号を正部分と負部分へ分ける

**定義の確認**

互いに素な可測集合 $A,B$ に対して

$$
f=-2\,1_A+3\,1_B
$$

とします。このとき

$$
f^+=3\,1_B,
\qquad
f^-=2\,1_A,
$$

なので

$$
f^+-f^-
=
3\,1_B-2\,1_A
=
f,
$$

$$
f^++f^-
=
3\,1_B+2\,1_A
=
|f|.
$$
<!-- definition-example-end -->

正部分と負部分を積分できても、両方が無限大なら差は定まりません。そこで一般の符号付き関数については、まず $|f|$ の積分が有限であることを要求します。この条件なら正部分・負部分の積分も有限になり、差として積分を安全に定義できます。

<a id="def-f0-00d2a-05"></a>
 
<!-- formal-statement-start -->
### 定義（Lebesgue可積分関数）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の実数値可測関数 $f$ が **Lebesgue可積分** であるとは

$$
\int_\Omega |f|\,d\mu<\infty
$$

を満たすことをいう。

このとき

$$
\boxed{
\int_\Omega f\,d\mu
:=
\int_\Omega f^+\,d\mu
-
\int_\Omega f^-\,d\mu
}
$$

と定義する。

可積分なら

$$
0\le f^+\le|f|,
\qquad
0\le f^-\le|f|
$$

なので、[Lebesgue積分の単調性](#prop-f0-00d2a-02)から $\int f^+$ と $\int f^-$ はともに有限です。従って $\infty-\infty$ の不定形は起こりません。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d2a-05 -->
### 5.2 例：有限測度の二集合上の符号付き単関数

**定義の確認**

上の

$$
f=-2\,1_A+3\,1_B
$$

で $\mu(A),\mu(B)<\infty$ とします。すると

$$
|f|
=
2\,1_A+3\,1_B
$$

だから

$$
\int|f|\,d\mu
=
2\mu(A)+3\mu(B)
<
\infty.
$$

従って $f$ は Lebesgue 可積分です。また

$$
\int f\,d\mu
=
\int f^+\,d\mu
-
\int f^-\,d\mu
=
3\mu(B)-2\mu(A).
$$
<!-- definition-example-end -->

---

## 6. a.e.で等しい関数は同じ積分を持つ

まず非負関数で、「測度0集合の上だけ値を変えても積分は変わらない」ことを積分の定義から閉じます。符号付き可積分関数の場合は、その結果を正部分・負部分へ適用します。

<a id="prop-f0-00d2a-nonnegative-ae-invariance"></a>

<!-- formal-statement-start -->
### 命題（非負可測関数のa.e.変更による積分不変性）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の非負可測関数 $u,v$ が

$$
u=v\quad\text{a.e.}
$$

を満たすなら、積分値が無限大の場合も含めて

$$
\boxed{
\int u\,d\mu
=
\int v\,d\mu
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$u$ の下にある任意の単関数 $\phi$ から、零集合 $N=\{u\ne v\}$ 上の部分だけを捨てた

$$
\widetilde\phi=\phi1_{N^c}
$$

を作ります。$N^c$ では $u=v$ なので $\widetilde\phi\le v$ です。一方、捨てた部分の測度は0なので単関数積分は変わりません。従って $u$ の全ての下側近似を $v$ の下側近似へ移せます。

<!-- proof-start -->
### 証明

$$
N=\{u\ne v\}
$$

と置けば $\mu(N)=0$ です。任意の非負単関数 $\phi$ で

$$
0\le\phi\le u
$$

を満たすものを取ります。

$$
\widetilde\phi
=
\phi1_{N^c}
$$

と置くと、$\widetilde\phi$ も非負単関数です。$N^c$ では $u=v$ だから

$$
0\le\widetilde\phi\le v.
$$

$\phi$ の正の値を $a_1,\ldots,a_m$、対応する値集合を $A_1,\ldots,A_m$ とします。$\widetilde\phi$ は各 $A_k$ から $A_k\cap N$ を除いただけです。各 $k$ について

$$
A_k
=
(A_k\cap N^c)\sqcup(A_k\cap N),
$$

かつ $\mu(A_k\cap N)=0$ なので

$$
\mu(A_k)
=
\mu(A_k\cap N^c).
$$

この等式は $\mu(A_k)=\infty$ の場合にも問題なく成り立ちます。従って単関数積分の定義から

$$
\int\phi\,d\mu
=
\sum_{k=1}^m a_k\mu(A_k)
=
\sum_{k=1}^m a_k\mu(A_k\cap N^c)
=
\int\widetilde\phi\,d\mu
\le
\int v\,d\mu.
$$

$0\le\phi\le u$ を満たすすべての非負単関数について上限を取ると

$$
\int u\,d\mu
\le
\int v\,d\mu.
$$

$u,v$ の役割を交換すれば

$$
\int v\,d\mu
\le
\int u\,d\mu
$$

も得られるので等号です。$\square$
<!-- proof-end -->

<a id="thm-f0-00d2a-01"></a>
 
<!-- formal-statement-start -->
### 定理（零集合上の変更は積分を変えない）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の可積分関数 $f,g$ が

$$
f=g\quad\text{a.e.}
$$

を満たすなら

$$
\int f\,d\mu=\int g\,d\mu.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$f=g$ a.e. なら正部分と負部分もそれぞれ a.e. で一致します。直前の非負関数の命題を $f^+,g^+$ と $f^-,g^-$ に適用し、可積分関数の定義へ戻します。

<!-- proof-start -->
### 証明

$f=g$ a.e. だから

$$
f^+=g^+\quad\text{a.e.},
\qquad
f^-=g^-\quad\text{a.e.}
$$

です。[非負可測関数のa.e.変更による積分不変性](#prop-f0-00d2a-nonnegative-ae-invariance)をそれぞれ適用すると

$$
\int f^+\,d\mu
=
\int g^+\,d\mu,
\qquad
\int f^-\,d\mu
=
\int g^-\,d\mu.
$$

可積分性によりこれら四つの積分は有限なので、

$$
\begin{aligned}
\int f\,d\mu
&=
\int f^+\,d\mu-\int f^-\,d\mu\\
&=
\int g^+\,d\mu-\int g^-\,d\mu\\
&=
\int g\,d\mu.
\end{aligned}
$$

よって積分値は等しい。$\square$
<!-- proof-end -->

---

## 7. Riemann積分との関係

有界閉区間 $[a,b]$ 上の連続関数はRiemann積分可能であり、Lebesgue積分可能でもあり、両者は一致します。

この事実の完全証明には「Riemann可積分性のLebesgue判定」などを使うため、ここでは橋として位置付けます。重要なのは、Lebesgue積分が通常の積分を捨てるのではなく **包含して拡張する** ことです。

## 7.1 何を構成したのか

Lebesgue積分は最初から謎の公式として置いたのではなく、

$$
\boxed{
\mu(A)
\to
\int 1_A
\to
\int\phi
\to
\int f\ (f\ge0)
\to
\int f\ (\text{符号あり})
}
$$

と、既知の「集合の大きさ」から一段ずつ作りました。

次講 [D2Bの極限と積分の交換定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange) では、この構成が単調極限と非常に相性がよいことを使って証明を進めます。

---

# 8. 演習

## F0-00D2A-A01 単関数の積分

- Level: A
- 目安時間: 8分

$[0,4]$ 上で

$$
\phi=2\,1_{[0,1)}+3\,1_{[1,3)}+1_{[3,4]}
$$

とする。Lebesgue積分を求めよ。

<!-- solution-start -->
### 詳細解答

各区間の長さは1,2,1なので

$$
\int_0^4\phi\,dx
=2\cdot1+3\cdot2+1\cdot1=9.
$$

<!-- solution-end -->

## F0-00D2A-A02 正負部分

- Level: A
- 目安時間: 8分

$f(x)=x-1$ $(0\le x\le2)$ の $f^+,f^-$ を求め、$f=f^+-f^-$ を確認せよ。

<!-- solution-start -->
### 詳細解答

$$
f^+(x)=\max(x-1,0),
\qquad
f^-(x)=\max(1-x,0).
$$

$x\le1$ では $f^+=0,f^-=1-x$、$x\ge1$ では $f^+=x-1,f^-=0$。どちらの場合も $f^+-f^-=x-1$。

<!-- solution-end -->

## F0-00D2A-B01 Dirichlet関数

- Level: B
- 目安時間: 12分

$[0,1]$ 上の $f=1_{\mathbb Q}$ がLebesgue積分可能で積分0であることを示し、Riemann積分との違いを説明せよ。

<!-- solution-start -->
### 詳細解答

$\mathbb Q\cap[0,1]$ は可算なのでLebesgue測度0。したがって

$$
\int_0^1f\,dx=m(\mathbb Q\cap[0,1])=0.
$$

また $|f|=f$ なので可積分。一方、任意の小区間に有理数と無理数があるため、Riemann上和は1、下和は0で一致せずRiemann積分不能。

<!-- solution-end -->

## F0-00D2A-B02 a.e.変更

- Level: B
- 目安時間: 12分

可積分関数 $f$ と、測度0集合 $N$ に対して

$$
g=f+100\,1_N
$$

と置く。$g$ も可積分で $\int g=\int f$ を示せ。

<!-- solution-start -->
### 詳細解答

$N$ の外では $1_N=0$ なので

$$
g=f
\quad\text{a.e.}
$$

です。従って

$$
|g|=|f|
\quad\text{a.e.}
$$

でもあります。本文で証明した非負関数の a.e. 不変性を $|f|,|g|$ に適用すると

$$
\int|g|\,d\mu
=
\int|f|\,d\mu
<
\infty.
$$

よって $g$ は可積分です。さらに可積分関数 $f,g$ は a.e. で一致するので、本文の定理から

$$
\int g\,d\mu
=
\int f\,d\mu.
$$

<!-- solution-end -->

## F0-00D2A-B03 単関数近似

- Level: B
- 目安時間: 15分

$f(x)=x$ $(0\le x\le1)$ に対し

$$
\phi_n(x)=2^{-n}\lfloor 2^n x\rfloor
$$

（ただし $x=1$ では $\phi_n(1)=1$）とする。$0\le\phi_n\le f$、$\phi_n\uparrow f$ を示せ。

<!-- solution-start -->
### 詳細解答

床関数の性質より

$$
\lfloor2^nx\rfloor\le2^nx<\lfloor2^nx\rfloor+1.
$$

したがって

$$
0\le\phi_n(x)\le x<\phi_n(x)+2^{-n}.
$$

よって $\phi_n(x)\to x$。また二進刻みは細分化されるので、$\phi_{n+1}$ は $\phi_n$ 以上の最大の格子点を選び、$\phi_n\le\phi_{n+1}$。

<!-- solution-end -->


## F0-00D2A-A03 分割を細かくして値を比較する

- Level: A
- 目安時間: 10分

$[0,2]$ 上で

$$
\phi
=
1_{[0,1)}
+
2\,1_{[1,2]}
$$

とする。さらに

$$
[0,1)
=
[0,1/2)\sqcup[1/2,1),
$$

$$
[1,2]
=
[1,3/2)\sqcup[3/2,2]
$$

と細分して $\phi$ を4集合の和として書き直し、どちらの表示でも積分値が同じになることを確認せよ。

<!-- solution-start -->
### 詳細解答

もとの表示では

$$
\int_0^2\phi\,dx
=
1\cdot m([0,1))
+
2\cdot m([1,2])
=
1+2
=
3.
$$

細分した表示は

$$
\phi
=
1\,1_{[0,1/2)}
+
1\,1_{[1/2,1)}
+
2\,1_{[1,3/2)}
+
2\,1_{[3/2,2]}.
$$

各区間の長さは $1/2$ だから

$$
\begin{aligned}
\int_0^2\phi\,dx
&=
1\cdot\frac12
+
1\cdot\frac12
+
2\cdot\frac12
+
2\cdot\frac12\\
&=
3.
\end{aligned}
$$

細分前後で同じ値になりました。これは、各元の集合の測度が細分した集合の測度の和へ分かれるだけで、「高さ×測度」の総和が変わらないためです。
<!-- solution-end -->

## F0-00D2A-A04 例外集合上だけ値を変える

- Level: A
- 目安時間: 10分

$u\ge0$ を可測関数、$N$ を測度0の可測集合とし、

$$
v=u+5\,1_N
$$

とする。Lebesgue積分の定義から

$$
\int v\,d\mu
=
\int u\,d\mu
$$

を説明せよ。

<!-- solution-start -->
### 詳細解答

$u=v$ が成り立たない可能性があるのは $N$ 上だけで、

$$
\mu(N)=0.
$$

$0\le\phi\le u$ を満たす非負単関数を任意に取ると、$u\le v$ なので同じ $\phi$ は $v$ の下側近似でもあります。従って

$$
\int u\,d\mu
\le
\int v\,d\mu.
$$

逆向きには、$0\le\psi\le v$ を満たす非負単関数を任意に取り、

$$
\widetilde\psi
=
\psi1_{N^c}
$$

と置きます。$N^c$ 上では $u=v$ だから

$$
0\le\widetilde\psi\le u.
$$

また $\psi$ と $\widetilde\psi$ の差は測度0集合 $N$ 上だけなので、単関数積分の定義から

$$
\int\psi\,d\mu
=
\int\widetilde\psi\,d\mu.
$$

従って

$$
\int\psi\,d\mu
\le
\int u\,d\mu.
$$

すべての $\psi\le v$ について上限を取れば

$$
\int v\,d\mu
\le
\int u\,d\mu.
$$

両向きを合わせて等号です。
<!-- solution-end -->

## F0-00D2A-C01 具体的な下側近似列から積分値へ進む

- Level: C
- 目安時間: 30分

非負可測関数 $f$ に対し、本文の単関数近似定理で構成した列 $(\phi_n)$ を用いる。

$$
0\le\phi_n\uparrow f
$$

であることに加えて、単調収束定理をまだ使わず、Lebesgue積分の定義だけから

$$
\boxed{
\int f\,d\mu
=
\lim_{n\to\infty}
\int\phi_n\,d\mu
}
$$

を示せ。

<!-- solution-start -->
### 詳細解答

$\phi_n\le f$ なので Lebesgue積分の定義から

$$
\int\phi_n\,d\mu
\le
\int f\,d\mu.
$$

また $\phi_n\le\phi_{n+1}$ なので左辺の数列は単調増加です。そこで

$$
L
=
\lim_{n\to\infty}
\int\phi_n\,d\mu
$$

と置けば

$$
L\le\int f\,d\mu.
$$

逆向きを示します。任意の非負単関数 $\psi$ で

$$
0\le\psi\le f
$$

を満たすものを固定します。$\psi\equiv0$ なら $\int\psi\,d\mu=0$ なので $L\ge0=\int\psi\,d\mu$ で終わります。以下では $\psi$ が正の値を少なくとも一つ取るとします。その正の値を

$$
a_1,\ldots,a_m
$$

とし、

$$
a_*:=\min_{1\le j\le m}a_j>0
$$

と置きます。さらに $0<\alpha<1$ を固定します。

$\psi$ の最大値を $A=\max_j a_j$ とします。$n$ を十分大きく取り、

$$
2^n>A,
\qquad
2^{-n}<(1-\alpha)a_*
$$

とします。

$\psi(x)=a_j>0$ である点 $x$ では

$$
f(x)\ge\psi(x)=a_j.
$$

この $n$ では切断高さ $2^n$ が $a_j$ より上にあります。ここで二場合に分けます。

もし $f(x)\ge2^n$ なら

$$
\phi_n(x)
=
2^n
>
A
\ge
a_j
>
\alpha a_j.
$$

もし $f(x)<2^n$ なら、$\phi_n(x)$ は $f(x)$ を幅 $2^{-n}$ で下へ丸めた値なので

$$
\phi_n(x)
>
f(x)-2^{-n}
\ge
a_j-2^{-n}
>
\alpha a_j
=
\alpha\psi(x).
$$

従ってどちらの場合も $\phi_n(x)>\alpha\psi(x)$ です。

$\psi(x)=0$ の点では自動的に $\phi_n(x)\ge0=\alpha\psi(x)$ です。従って全ての $x$ で

$$
\phi_n\ge\alpha\psi.
$$

共通細分上で $\phi_n$ と $\alpha\psi$ の高さを比較すると

$$
\int\phi_n\,d\mu
\ge
\alpha\int\psi\,d\mu.
$$

よって

$$
L
\ge
\alpha\int\psi\,d\mu.
$$

$\alpha\uparrow1$ とすると

$$
L
\ge
\int\psi\,d\mu.
$$

これは任意の $0\le\psi\le f$ なる非負単関数について成り立つので、Lebesgue積分の定義で上限を取れば

$$
L
\ge
\int f\,d\mu.
$$

最初の逆向きと合わせて

$$
L
=
\int f\,d\mu.
$$

この問題で、本文の具体的な単関数近似列が Lebesgue積分の定義に対して十分細かい下側近似になっていることを確認できました。
<!-- solution-end -->

---

## 9. 次に進む

Lebesgue積分を定義できました。次の問題は、関数列 $f_n$ が $f$ に近づくとき

$$
\int f_n\,d\mu\to\int f\,d\mu
$$

としてよいのはいつか、です。

**次：F0-00D2B 単調収束定理・Fatouの補題・優収束定理**
