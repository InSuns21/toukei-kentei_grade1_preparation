# F0-00P3C Lévy上昇定理：情報が増えると条件付き期待値はどこへ行くか

<!-- definition-example-audit: strict -->

P3Aで条件付き期待値を定義し、P3Bで $L^2$ の場合には直交射影として読めることを示しました。今度は情報が

$$
\mathcal G_1\subseteq\mathcal G_2\subseteq\cdots
$$

と増えるとき、$E[X\mid\mathcal G_n]$ がどこへ収束するかを調べます。

結論は、極限で使える情報

$$
\mathcal G_\infty
=\sigma\left(\bigcup_{n=1}^\infty\mathcal G_n\right)
$$

に対する条件付き期待値へ、**$L^1$でもa.s.でも収束する**というものです。

```text
増加する情報列
 ↓
有限段階の事象で G∞ の事象を確率近似
 ↓
有限段階可測な単関数で L1(G∞) を近似
 ↓
L1縮小性で L1収束
 ↓
上向き横断評価で経路の無限振動を排除
 ↓
a.s.極限を Fatou で同定
```

---

## 1. 増加する情報列

<a id="def-f0-00p3c-increasing-sigma-fields"></a>

<!-- formal-statement-start -->
> **定義（増加する部分$\sigma$代数列）**  
> 確率空間 $(\Omega,\mathcal F,P)$ の部分 $\sigma$ 代数列 $(\mathcal G_n)_{n\ge1}$ が次を満たすとき、$(\mathcal G_n)$ を増加する情報列と呼びます。

$$
\mathcal G_n\subseteq\mathcal G_{n+1}
\qquad(\forall n\ge1).
$$

> また、極限で得られる情報を次で定めます。

$$
\mathcal G_\infty
:=\sigma\left(\bigcup_{n=1}^\infty\mathcal G_n\right).
$$
<!-- formal-statement-end -->

### 1.1 例：二進分割を細かくしていく

$\Omega=[0,1)$ にLebesgue確率測度を入れ、

$$
I_{k,n}=\left[\frac{k}{2^n},\frac{k+1}{2^n}\right),
\qquad k=0,\dots,2^n-1
$$

として

$$
\mathcal G_n=\sigma(I_{0,n},\dots,I_{2^n-1,n})
$$

と置きます。

<!-- definition-example-start: def-f0-00p3c-increasing-sigma-fields -->
**定義の確認**  
各 $n$ 段階のセルは

$$
I_{k,n}=I_{2k,n+1}\cup I_{2k+1,n+1}
$$

と次段階の二つのセルの和に分解されます。従って各 $I_{k,n}\in\mathcal G_{n+1}$ であり

$$
\mathcal G_n\subseteq\mathcal G_{n+1}.
$$

よって $(\mathcal G_n)$ は増加する情報列です。二進区間全体は $[0,1)$ のBorel $\sigma$ 代数を生成するので

$$
\mathcal G_\infty=\mathcal B([0,1)).
$$
<!-- definition-example-end -->

---

## 2. 増加情報の有限段階で集合を近似する

集合族

$$
\mathcal A:=\bigcup_{n=1}^\infty\mathcal G_n
$$

を考えます。$A,B\in\mathcal A$ なら、ある $m,n$ で $A\in\mathcal G_m$、$B\in\mathcal G_n$ です。$N=\max\{m,n\}$ とすれば $A,B\in\mathcal G_N$。従って補集合・有限和・有限積を取っても $\mathcal G_N$ に残るので、$\mathcal A$ は代数です。ただし一般には可算和に閉じないので、$\mathcal A$ 自身が $\sigma$ 代数とは限りません。

<a id="lem-f0-00p3c-algebra-approximation"></a>

<!-- formal-statement-start -->
> **補題（増加情報の代数による集合近似）**  
> $\mathcal G_\infty=\sigma(\mathcal A)$ とします。任意の $B\in\mathcal G_\infty$ と $\varepsilon>0$ に対し、ある $A\in\mathcal A$ が存在して次を満たします。

$$
\boxed{P(A\triangle B)<\varepsilon}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 2.1 証明

次の集合族を考えます。

$$
\mathcal D
=\left\{B\in\mathcal G_\infty:
\forall\varepsilon>0,\ \exists A\in\mathcal A,
\ P(A\triangle B)<\varepsilon\right\}.
$$

明らかに $\mathcal A\subseteq\mathcal D$ です。

**補集合に閉じること。**  
$A\triangle B=A^c\triangle B^c$ なので、$B\in\mathcal D$ なら $B^c\in\mathcal D$ です。

**可算和に閉じること。**  
$B_i\in\mathcal D$ とし

$$
B=\bigcup_{i=1}^\infty B_i
$$

とします。有限和

$$
B^{(N)}=\bigcup_{i=1}^N B_i
$$

は $B^{(N)}\uparrow B$ なので、[測度の下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)から

$$
P(B\setminus B^{(N)})\to0.
$$

従って $P(B\setminus B^{(N)})<\varepsilon/2$ となる $N$ を取れます。各 $i\le N$ について $B_i\in\mathcal D$ だから、$A_i\in\mathcal A$ を

$$
P(A_i\triangle B_i)<\frac{\varepsilon}{2N}
$$

となるように選べます。$\mathcal A$ は代数なので

$$
A=\bigcup_{i=1}^N A_i\in\mathcal A.
$$

さらに

$$
A\triangle B
\subseteq
(B\setminus B^{(N)})
\cup
\bigcup_{i=1}^N(A_i\triangle B_i),
$$

よって[union bound](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound)から

$$
P(A\triangle B)
\le P(B\setminus B^{(N)})
+\sum_{i=1}^NP(A_i\triangle B_i)
<\varepsilon.
$$

したがって $\mathcal D$ は $\sigma$ 代数です。$\mathcal A\subseteq\mathcal D$ なので

$$
\mathcal G_\infty=\sigma(\mathcal A)\subseteq\mathcal D.
$$

補題が示されました。
<!-- proof-end -->

### 2.2 集合近似から $L^1$ 関数近似へ

<a id="lem-f0-00p3c-l1-finite-stage-density"></a>

<!-- formal-statement-start -->
> **補題（有限段階可測単関数の稠密性）**  
> 任意の $Y\in L^1(\mathcal G_\infty)$ と $\varepsilon>0$ に対して、ある $N$ と $\mathcal G_N$-可測単関数 $Z$ が存在し、次を満たします。

$$
\boxed{\|Y-Z\|_1<\varepsilon}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 2.3 証明

[可積分関数の単関数近似](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#thm-simple-function-approximation)により、$\mathcal G_\infty$-可測な有界単関数

$$
S=\sum_{j=1}^r c_j\mathbf1_{B_j},
\qquad B_j\in\mathcal G_\infty,
$$

を

$$
\|Y-S\|_1<\frac\varepsilon2
$$

となるように取れます。$c_j=0$ の項は捨ててよいので、以下 $c_j\ne0$ とします。

[増加情報の代数による集合近似](#lem-f0-00p3c-algebra-approximation)から、各 $j$ について $A_j\in\mathcal A$ を

$$
P(A_j\triangle B_j)
<
\frac{\varepsilon}{2r|c_j|}
$$

となるように選びます。各 $A_j$ はある $\mathcal G_{n_j}$ に属します。有限個しかないので

$$
N=\max_{1\le j\le r}n_j
$$

とすれば全て $A_j\in\mathcal G_N$ です。そこで

$$
Z=\sum_{j=1}^r c_j\mathbf1_{A_j}
$$

と置くと $Z$ は $\mathcal G_N$-可測単関数です。また

$$
|S-Z|
\le
\sum_{j=1}^r|c_j|\mathbf1_{A_j\triangle B_j},
$$

従って

$$
\begin{aligned}
\|S-Z\|_1
&\le\sum_{j=1}^r|c_j|P(A_j\triangle B_j)\\
&<\sum_{j=1}^r\frac\varepsilon{2r}
=\frac\varepsilon2.
\end{aligned}
$$

三角不等式から

$$
\|Y-Z\|_1
\le\|Y-S\|_1+\|S-Z\|_1
<\varepsilon.
$$
<!-- proof-end -->

この補題が、Lévy上昇定理の $L^1$ 収束を作る核心です。「極限情報で測れる関数は、有限段階の情報だけで作れる単関数で $L^1$ 近似できる」という意味です。

---

## 3. 上向き横断

<a id="def-f0-00p3c-upcrossing"></a>

<!-- formal-statement-start -->
> **定義（上向き横断）**  
> 実数列 $x_1,\dots,x_N$ と $a<b$ に対し、次の条件を満たす添字を選べる最大の $r$ を、区間 $[a,b]$ の**上向き横断回数**と呼び、$U_N(a,b)$ と書きます。

$$
s_1<t_1<s_2<t_2<\cdots<s_r<t_r\le N,
$$

$$
x_{s_j}\le a,
\qquad
x_{t_j}\ge b
\qquad(j=1,\dots,r).
$$
<!-- formal-statement-end -->

### 3.1 例：0と2を往復する数列

$$
(x_1,x_2,x_3,x_4,x_5)=(0,2,0,2,0),
\qquad a=\frac12,\ b=\frac32
$$

とします。

<!-- definition-example-start: def-f0-00p3c-upcrossing -->
**定義の確認**  

$$
(s_1,t_1,s_2,t_2)=(1,2,3,4)
$$

を選べば2回の上向き横断があります。一方、3回なら6個の添字

$$
s_1<t_1<s_2<t_2<s_3<t_3
$$

が必要ですが列は5項しかありません。従って

$$
\boxed{U_5(1/2,3/2)=2}.
$$
<!-- definition-example-end -->

---

## 4. Lévy上昇定理

<a id="thm-f0-00p3c-levy-upward"></a>

<!-- formal-statement-start -->
> **定理（Lévy上昇定理）**  
> $(\mathcal G_n)$ を増加する部分 $\sigma$ 代数列とし、次で $\mathcal G_\infty$、$M_n$、$Y$ を定めます。

$$
\mathcal G_\infty
=\sigma\left(\bigcup_{n=1}^\infty\mathcal G_n\right),
$$

$$
M_n=E[X\mid\mathcal G_n],
\qquad
Y=E[X\mid\mathcal G_\infty],
\qquad X\in L^1(P).
$$

> このとき次の二つが成り立ちます。

$$
\boxed{M_n\to Y\quad\text{in }L^1},
$$

$$
\boxed{M_n\to Y\quad\text{a.s.}}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 4.1 証明：まず $L^1$ 収束

$\mathcal G_n\subseteq\mathcal G_\infty$ なので[tower property](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-tower)から

$$
E[Y\mid\mathcal G_n]
=E[E[X\mid\mathcal G_\infty]\mid\mathcal G_n]
=M_n.
$$

$\varepsilon>0$ を任意に取ります。[有限段階可測単関数のL1稠密性](#lem-f0-00p3c-l1-finite-stage-density)から、ある $N$ と $\mathcal G_N$-可測単関数 $Z$ が存在して

$$
\|Y-Z\|_1<\varepsilon.
$$

$n\ge N$ なら $\mathcal G_N\subseteq\mathcal G_n$ なので $Z$ は $\mathcal G_n$-可測です。P3Aの「既知量は変わらない」性質から

$$
E[Z\mid\mathcal G_n]=Z.
$$

従って線形性と $L^1$ 縮小性より

$$
\begin{aligned}
\|M_n-Y\|_1
&=\|E[Y\mid\mathcal G_n]-Y\|_1\\
&\le
\|E[Y-Z\mid\mathcal G_n]\|_1+\|Z-Y\|_1\\
&\le2\|Y-Z\|_1\\
&<2\varepsilon.
\end{aligned}
$$

$\varepsilon$ は任意なので

$$
\boxed{M_n\to Y\quad\text{in }L^1}.
$$

### 4.2 証明：条件付き平均の増分は予測不能

$n\ge2$ に対し[tower property](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-tower)から

$$
E[M_n\mid\mathcal G_{n-1}]=M_{n-1}.
$$

また $L^1$ 縮小性から

$$
\sup_nE|M_n|\le E|X|<\infty.
$$

この二つだけを使って経路の無限振動を抑えます。

### 4.3 証明：上向き横断戦略を厳密に作る

有理数 $a<b$ を固定します。時刻 $k-1$ までの値 $M_1,\dots,M_{k-1}$ だけを見て、区間 $(k-1,k]$ で1単位保有するかを決めます。

- まだ保有しておらず $M_{k-1}\le a$ なら買って $H_{k-1}=1$。
- 保有中で $M_{k-1}\ge b$ なら売った後なので $H_{k-1}=0$。
- それ以外では直前の保有状態を維持する。

この規則は過去と現在の情報だけで決まるので

$$
H_{k-1}\in\{0,1\}
$$

は $\mathcal G_{k-1}$-可測です。時刻 $N$ までの損益を

$$
G_N=\sum_{k=2}^N H_{k-1}(M_k-M_{k-1})
$$

とします。

各項は可積分で、条件付き期待値の既知量取り出しと[tower property](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-tower)から

$$
\begin{aligned}
E[H_{k-1}(M_k-M_{k-1})]
&=E\left[E[H_{k-1}(M_k-M_{k-1})\mid\mathcal G_{k-1}]\right]\\
&=E\left[H_{k-1}E[M_k-M_{k-1}\mid\mathcal G_{k-1}]\right]\\
&=0.
\end{aligned}
$$

従って

$$
E[G_N]=0.
$$

このgreedy戦略は、経路ごとに可能な上向き横断を順に完成させるので、時刻 $N$ までに完成した売買回数は $U_N(a,b)$ です。完成した1回の売買では買値が $\le a$、売値が $\ge b$ なので利益は少なくとも $b-a$。

最後に未決済の買いが残っていなければ

$$
G_N\ge(b-a)U_N(a,b).
$$

未決済の買いが残っている場合、最後の買値を $q\le a$ とするとその部分の損益は

$$
M_N-q\ge M_N-a\ge-(M_N-a)^-.
$$

従ってどちらの場合にも経路ごとに

$$
\boxed{
G_N\ge(b-a)U_N(a,b)-(M_N-a)^-
}.
$$

期待値を取って $E[G_N]=0$ を使うと

$$
(b-a)E[U_N(a,b)]
\le E[(M_N-a)^-].
$$

さらに

$$
(M_N-a)^-\le|M_N|+|a|
$$

なので

$$
\boxed{
E[U_N(a,b)]
\le
\frac{E|X|+|a|}{b-a}
}.
$$

### 4.4 証明：振動を排除する

$U_N(a,b)$ は $N$ とともに増加するので[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)より

$$
E[U_\infty(a,b)]
=\lim_NE[U_N(a,b)]
\le\frac{E|X|+|a|}{b-a}<\infty.
$$

非負拡張実数値確率変数が有限期待値を持つなら無限大になる集合の確率は0なので

$$
U_\infty(a,b)<\infty\quad\text{a.s.}
$$

です。

もしある経路で

$$
\liminf_{n\to\infty}M_n
<
\limsup_{n\to\infty}M_n
$$

なら、実数の稠密性によりその間に有理数 $a<b$ を取れます。その経路では $a$ 以下と $b$ 以上を無限回行き来するため

$$
U_\infty(a,b)=\infty.
$$

有理数対 $(a,b)$ は可算個なので、それぞれの例外零集合の可算和も零集合です。従って確率1で

$$
\liminf_nM_n=\limsup_nM_n,
$$

すなわち $M_n$ は拡張実数値極限を持ちます。

さらに[Fatouの補題](../F0_00D2B_単調収束_Fatou_優収束/index.md#lem-f0-00d2b-01)から

$$
E\left[\liminf_{n\to\infty}|M_n|\right]
\le\liminf_{n\to\infty}E|M_n|
\le E|X|<\infty.
$$

極限が $+\infty$ または $-\infty$ になる集合が正の確率を持てば左辺が無限大になるので矛盾です。従って有限実数値確率変数 $M_\infty$ が存在して

$$
M_n\to M_\infty\quad\text{a.s.}
$$

です。

### 4.5 証明：a.s.極限を $Y$ と同定する

ここでは次章で導入する一般の収束概念を使う必要はありません。すでに

$$
M_n\to M_\infty\quad\text{a.s.}
$$

かつ

$$
\|M_n-Y\|_1\to0
$$

が分かっています。従って

$$
|M_n-Y|\to|M_\infty-Y|\quad\text{a.s.}
$$

であり、[Fatouの補題](../F0_00D2B_単調収束_Fatou_優収束/index.md#lem-f0-00d2b-01)から

$$
E|M_\infty-Y|
\le\liminf_{n\to\infty}E|M_n-Y|
=0.
$$

非負確率変数の期待値が0ならa.s.で0なので

$$
M_\infty=Y\quad\text{a.s.}
$$

です。従って

$$
\boxed{
E[X\mid\mathcal G_n]
\longrightarrow
E[X\mid\mathcal G_\infty]
\quad L^1\text{ and a.s.}
}
$$

が示されました。
<!-- proof-end -->

---

## 5. 二進分割の例で何が起きるか

第1節の二進分割を使い

$$
X(t)=t,
\qquad
M_n=E[X\mid\mathcal G_n]
$$

とします。$t\in I_{k,n}$ なら有限分割の公式から

$$
M_n(t)
=\frac{1}{|I_{k,n}|}\int_{I_{k,n}}s\,ds
=\frac{2k+1}{2^{n+1}}.
$$

これは $I_{k,n}$ の中点であり

$$
|M_n(t)-t|\le2^{-n}\to0.
$$

極限情報がBorel情報全体まで増えるので、条件付き平均が元の $X(t)=t$ へ戻る様子が具体的に見えます。

---

## 6. martingaleとの接続

列 $M_n=E[X\mid\mathcal G_n]$ は

$$
E[M_n\mid\mathcal G_{n-1}]=M_{n-1}
$$

を満たします。これは後のEncore IVで定義するmartingaleです。この講義では一般のmartingale収束定理を先に仮定せず、条件付き期待値から作られる特別なmartingaleについて、必要な上向き横断の議論をここで直接証明しました。

---

## 演習

### F0-00P3C-A01 二進分割で条件付き期待値を計算する

- Level: A
- 目安時間: 12分

$([0,1),\mathcal B,\lambda)$ 上で

$$
X(t)=t,
\qquad
M_n=E[X\mid\mathcal G_n]
$$

とする。$t\in I_{k,n}$ に対する $M_n(t)$ を求め、$X(t)$ への収束を直接示せ。

<!-- solution-start -->
#### 詳細解答
各セル上では条件付き期待値はセル平均なので

$$
M_n(t)
=2^n\int_{k/2^n}^{(k+1)/2^n}s\,ds
=\frac{2k+1}{2^{n+1}}.
$$

$t$ と同じ長さ $2^{-n}$ のセル内にあるため

$$
|M_n(t)-t|\le2^{-n}\to0.
$$
<!-- solution-end -->

### F0-00P3C-A02 増加σ代数の和集合は代数

- Level: A
- 目安時間: 10分

$\mathcal G_1\subseteq\mathcal G_2\subseteq\cdots$ とし $\mathcal A=\bigcup_n\mathcal G_n$ とする。$\mathcal A$ が補集合と有限和に閉じることを示せ。

<!-- solution-start -->
#### 詳細解答
$A\in\mathcal A$ ならある $m$ で $A\in\mathcal G_m$。$\mathcal G_m$ はσ代数なので $A^c\in\mathcal G_m\subseteq\mathcal A$。

$A\in\mathcal G_m$、$B\in\mathcal G_n$ なら $N=\max\{m,n\}$ とすると、増加性から $A,B\in\mathcal G_N$。従って $A\cup B\in\mathcal G_N\subseteq\mathcal A$。よって $\mathcal A$ は代数。
<!-- solution-end -->

### F0-00P3C-A03 上向き横断回数を数える

- Level: A
- 目安時間: 10分

列

$$
(0,3,1,4,2,5,0)
$$

について $a=1$、$b=3$ とする。$U_7(1,3)$ を求め、対応する添字対を一つ示せ。

<!-- solution-start -->
#### 詳細解答
例えば

$$
(s_1,t_1)=(1,2),
\qquad
(s_2,t_2)=(3,4)
$$

で2回。第2回を終えた後、$x_5=2>1$ なのでそこでは新たに買えず、$x_7=0\le1$ で買えてもその後の売り時刻がない。従って

$$
\boxed{U_7(1,3)=2}.
$$
<!-- solution-end -->

### F0-00P3C-A04 有限段階ですでに見えている量

- Level: A
- 目安時間: 10分

$Z\in L^1$ が $\mathcal G_N$-可測であるとする。$n\ge N$ なら

$$
E[Z\mid\mathcal G_n]=Z
$$

a.s. を示せ。

<!-- solution-start -->
#### 詳細解答
増加性から $\mathcal G_N\subseteq\mathcal G_n$ なので $Z$ は $\mathcal G_n$-可測。$Z$ 自身は可積分で、任意の $A\in\mathcal G_n$ に対し当然

$$
\int_AZdP=\int_AZdP.
$$

従って条件付き期待値の定義3条件を満たし、一意性から結論。
<!-- solution-end -->

### F0-00P3C-B01 上向き横断評価を導く

- Level: B
- 目安時間: 22分

$M_n=E[X\mid\mathcal G_n]$、$a<b$ とする。本文のgreedyな0/1保有戦略を明示し

$$
(b-a)E[U_N(a,b)]\le E[(M_N-a)^-]
$$

を示し、$U_\infty(a,b)<\infty$ a.s. を導け。

<!-- solution-start -->
#### 詳細解答
保有していない状態で $M_{k-1}\le a$ なら次の区間を保有し、保有中に $M_{k-1}\ge b$ へ到達したら売却済みとして次区間は保有しない。この規則で得る $H_{k-1}\in\{0,1\}$ は $\mathcal G_{k-1}$-可測。

$$
G_N=\sum_{k=2}^NH_{k-1}(M_k-M_{k-1})
$$

と置くと[tower property](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-tower)により $E[G_N]=0$ である。完成した各横断から少なくとも $b-a$ を得る。最後に未決済なら買値 $q\le a$ なので残り損益は

$$
M_N-q\ge-(M_N-a)^-.
$$

従って

$$
G_N\ge(b-a)U_N(a,b)-(M_N-a)^-.
$$

期待値を取り、$E|M_N|\le E|X|$ を使うと

$$
E[U_N(a,b)]\le\frac{E|X|+|a|}{b-a}.
$$

$U_N\uparrow U_\infty$ なので[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)から $E[U_\infty]<\infty$。ゆえに $U_\infty<\infty$ a.s.。
<!-- solution-end -->

### F0-00P3C-B02 集合近似から関数近似へ

- Level: B
- 目安時間: 20分

任意の $B\in\mathcal G_\infty$ が $\mathcal A=\bigcup_n\mathcal G_n$ の集合で対称差確率近似できると仮定する。任意の $Y\in L^1(\mathcal G_\infty)$ と $\varepsilon>0$ に対し、ある $N$ と $\mathcal G_N$-可測単関数 $Z$ が存在して $\|Y-Z\|_1<\varepsilon$ となることを証明せよ。

<!-- solution-start -->
#### 詳細解答
[可積分関数の単関数近似](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#thm-simple-function-approximation)により $\mathcal G_\infty$-可測有界単関数

$$
S=\sum_{j=1}^r c_j\mathbf1_{B_j}
$$

を $\|Y-S\|_1<\varepsilon/2$ となるように取る。各非零係数について

$$
P(A_j\triangle B_j)<\frac{\varepsilon}{2r|c_j|}
$$

となる $A_j\in\mathcal A$ を選ぶ。有限個なので全てが一つの $\mathcal G_N$ に入る $N$ を取れる。

$$
Z=\sum_jc_j\mathbf1_{A_j}
$$

とすれば

$$
\|S-Z\|_1
\le\sum_j|c_j|P(A_j\triangle B_j)
<\frac\varepsilon2.
$$

三角不等式で $\|Y-Z\|_1<\varepsilon$。
<!-- solution-end -->

### F0-00P3C-B03 $L^1$収束部分だけを独立に証明する

- Level: B
- 目安時間: 18分

$Y=E[X\mid\mathcal G_\infty]$ とし、B02の稠密性を使って

$$
\|E[X\mid\mathcal G_n]-Y\|_1\to0
$$

を証明せよ。

<!-- solution-start -->
#### 詳細解答
まず[tower property](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-tower)から

$$
E[X\mid\mathcal G_n]=E[Y\mid\mathcal G_n].
$$

$\varepsilon>0$ に対し、[有限段階可測単関数のL1稠密性](#lem-f0-00p3c-l1-finite-stage-density)から、ある $N$ と $\mathcal G_N$-可測単関数 $Z$ を $\|Y-Z\|_1<\varepsilon$ となるように取る。$n\ge N$ なら $E[Z\mid\mathcal G_n]=Z$。従って

$$
\begin{aligned}
\|E[Y\mid\mathcal G_n]-Y\|_1
&\le\|E[Y-Z\mid\mathcal G_n]\|_1+\|Z-Y\|_1\\
&\le2\|Y-Z\|_1<2\varepsilon.
\end{aligned}
$$

よって収束する。
<!-- solution-end -->

### F0-00P3C-C01 Lévy上昇定理の証明を再構成する

- Level: C
- 目安時間: 35分

$M_n=E[X\mid\mathcal G_n]$、$Y=E[X\mid\mathcal G_\infty]$ とする。次の順にLévy上昇定理を再構成せよ。

1. [有限段階可測単関数のL1稠密性](#lem-f0-00p3c-l1-finite-stage-density)から $M_n\to Y$ in $L^1$ を示す。
2. 任意の有理数 $a<b$ について $U_\infty(a,b)<\infty$ a.s. を示す。
3. 有理数の可算性から $M_n$ がa.s.で拡張実数値極限を持つことを示す。
4. [Fatouの補題](../F0_00D2B_単調収束_Fatou_優収束/index.md#lem-f0-00d2b-01)と $\sup_nE|M_n|<\infty$ から極限が有限であることを示す。
5. 後続章の一般の収束概念を使わず、[Fatouの補題](../F0_00D2B_単調収束_Fatou_優収束/index.md#lem-f0-00d2b-01)だけでその極限が $Y$ とa.s.一致することを示す。

<!-- solution-start -->
#### 詳細解答
1. B03の議論で $\|M_n-Y\|_1\to0$。
2. B01のupcrossing評価から各有理 $a<b$ について $E[U_\infty(a,b)]<\infty$、従って $U_\infty(a,b)<\infty$ a.s.
3. もし $\liminf M_n<\limsup M_n$ なら、その間に有理 $a<b$ があり、その区間を無限回横断する。これは2に矛盾。有理数対は可算なので全対について同時に成立する確率1の集合を取れる。
4. [Fatouの補題](../F0_00D2B_単調収束_Fatou_優収束/index.md#lem-f0-00d2b-01)から

$$
E[\liminf|M_n|]
\le\liminf E|M_n|
\le E|X|<\infty.
$$

従って極限が無限大となる集合は零集合。
5. 有限極限を $M_\infty$ とすると $|M_n-Y|\to|M_\infty-Y|$ a.s.。再び[Fatouの補題](../F0_00D2B_単調収束_Fatou_優収束/index.md#lem-f0-00d2b-01)を使って

$$
E|M_\infty-Y|
\le\liminf E|M_n-Y|=0.
$$

従って $M_\infty=Y$ a.s.。以上で $L^1$ とa.s.の両収束が示された。
<!-- solution-end -->

---

## 次に進む

条件付き期待値の収束まで、後続章の一般論を先取りせずに閉じました。次は [F0-00P4 収束・Borel--Cantelli](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md) で、確率変数列一般の収束概念とa.s.収束を体系的に扱います。
