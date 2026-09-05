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

---

## 1. 増加する情報列

<a id="def-f0-00p3c-increasing-sigma-fields"></a>

<!-- formal-statement-start -->
> **定義（増加する部分$\sigma$代数列）**  
> 確率空間 $(\Omega,\mathcal F,P)$ の部分 $\sigma$ 代数列 $(\mathcal G_n)_{n\ge1}$ が

$$
\mathcal G_n\subseteq\mathcal G_{n+1}
\qquad(\forall n\ge1)
$$

> を満たすとき、$(\mathcal G_n)$ を増加する情報列と呼びます。また

$$
\mathcal G_\infty
:=\sigma\left(\bigcup_{n=1}^\infty\mathcal G_n\right)
$$

> を極限で得られる情報とします。
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

を考えます。$A,B\in\mathcal A$ なら十分大きい $N$ で $A,B\in\mathcal G_N$ です。従って補集合・有限和・有限積を取っても $\mathcal G_N$ に残り、$\mathcal A$ は代数です。

<a id="lem-f0-00p3c-algebra-approximation"></a>

<!-- formal-statement-start -->
> **補題（増加情報の代数による集合近似）**  
> $\mathcal G_\infty=\sigma(\mathcal A)$ とします。任意の $B\in\mathcal G_\infty$ と $\varepsilon>0$ に対し、ある $A\in\mathcal A$ が存在して

$$
\boxed{P(A\triangle B)<\varepsilon}
$$

> となります。
<!-- formal-statement-end -->

<!-- proof-start -->
### 2.1 証明

次の集合族を考えます。

$$
\mathcal D
=\{B\in\mathcal G_\infty:
\forall\varepsilon>0,\ \exists A\in\mathcal A,
\ P(A\triangle B)<\varepsilon\}.
$$

明らかに $\mathcal A\subseteq\mathcal D$ です。補集合について

$$
P(A\triangle B)=P(A^c\triangle B^c)
$$

なので $B\in\mathcal D$ なら $B^c\in\mathcal D$ です。

次に $B_i\in\mathcal D$ とし $B=\bigcup_{i=1}^\infty B_i$ とします。連続性より

$$
P\left(B\setminus\bigcup_{i=1}^N B_i\right)\to0.
$$

この量が $<\varepsilon/2$ となる $N$ を選び、各 $i\le N$ について $A_i\in\mathcal A$ を

$$
P(A_i\triangle B_i)<\frac{\varepsilon}{2N}
$$

となるように取ります。$\mathcal A$ は代数なので $A=\bigcup_{i=1}^N A_i\in\mathcal A$ であり

$$
P(A\triangle B)
\le P\left(B\setminus\bigcup_{i=1}^N B_i\right)
+\sum_{i=1}^NP(A_i\triangle B_i)
<\varepsilon.
$$

従って $\mathcal D$ は $\sigma$ 代数です。$\mathcal A\subseteq\mathcal D$ なので

$$
\mathcal G_\infty=\sigma(\mathcal A)\subseteq\mathcal D,
$$

補題が示されました。
<!-- proof-end -->

この集合近似から、任意の $Y\in L^1(\mathcal G_\infty)$ と $\varepsilon>0$ に対し、ある $N$ と $\mathcal G_N$-可測単関数 $Z$ が存在して

$$
\boxed{\|Y-Z\|_1<\varepsilon}
$$

とできます。可積分関数を有界単関数で近似し、その有限個の可測集合を上の補題で近似すればよいです。

---

## 3. 上向き横断

<a id="def-f0-00p3c-upcrossing"></a>

<!-- formal-statement-start -->
> **定義（上向き横断）**  
> 実数列 $x_1,\dots,x_N$ と $a<b$ に対し、添字

$$
s_1<t_1<s_2<t_2<\cdots<s_r<t_r\le N
$$

> を選んで

$$
x_{s_j}\le a,
\qquad
x_{t_j}\ge b
\qquad(j=1,\dots,r)
$$

> とできる最大の $r$ を、区間 $[a,b]$ の**上向き横断回数**と呼び、$U_N(a,b)$ と書きます。
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

を選べば

$$
x_{s_1}=x_{s_2}=0\le\frac12,
\qquad
x_{t_1}=x_{t_2}=2\ge\frac32.
$$

従って少なくとも2回です。一方、3回の上向き横断には6個の添字

$$
s_1<t_1<s_2<t_2<s_3<t_3
$$

が必要ですが、列は5項しかありません。よって

$$
\boxed{U_5(1/2,3/2)=2}.
$$
<!-- definition-example-end -->

---

## 4. Lévy上昇定理

<a id="thm-f0-00p3c-levy-upward"></a>

<!-- formal-statement-start -->
> **定理（Lévy上昇定理）**  
> $(\mathcal G_n)$ を増加する部分 $\sigma$ 代数列とし

$$
\mathcal G_\infty
=\sigma\left(\bigcup_{n=1}^\infty\mathcal G_n\right)
$$

> とします。$X\in L^1(P)$ に対して

$$
M_n=E[X\mid\mathcal G_n],
\qquad
Y=E[X\mid\mathcal G_\infty]
$$

> と置くと

$$
\boxed{M_n\to Y\quad\text{in }L^1}
$$

> かつ

$$
\boxed{M_n\to Y\quad\text{a.s.}}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 4.1 証明：まず $L^1$ 収束

$\mathcal G_n\subseteq\mathcal G_\infty$ なのでtower propertyから

$$
E[Y\mid\mathcal G_n]
=E[E[X\mid\mathcal G_\infty]\mid\mathcal G_n]
=M_n.
$$

$\varepsilon>0$ を任意に取ります。前節の稠密性から、ある $N$ と $\mathcal G_N$-可測単関数 $Z$ が存在して

$$
\|Y-Z\|_1<\varepsilon.
$$

$n\ge N$ なら $E[Z\mid\mathcal G_n]=Z$ なので、P3Aの $L^1$ 縮小性から

$$
\begin{aligned}
\|M_n-Y\|_1
&\le\|E[Y-Z\mid\mathcal G_n]\|_1+\|Z-Y\|_1\\
&\le2\|Y-Z\|_1\\
&<2\varepsilon.
\end{aligned}
$$

従って

$$
\boxed{M_n\to Y\quad\text{in }L^1}.
$$

### 4.2 証明：条件付き平均の増分は予測不能

$n\ge2$ に対しtower propertyから

$$
E[M_n\mid\mathcal G_{n-1}]=M_{n-1}.
$$

また $L^1$ 縮小性から

$$
\sup_nE|M_n|\le E|X|<\infty.
$$

### 4.3 証明：上向き横断回数を抑える

有理数 $a<b$ を固定します。経路を見ながら、$M_k\le a$ になったら1単位買い、その後 $M_k\ge b$ になったら売る戦略を考えます。時刻 $k-1$ までの情報だけで次の区間で保有するかを決めるので、保有量 $H_{k-1}\in\{0,1\}$ は $\mathcal G_{k-1}$-可測です。

時刻 $N$ までの損益を

$$
G_N=\sum_{k=2}^N H_{k-1}(M_k-M_{k-1})
$$

とします。各項について

$$
\begin{aligned}
E[H_{k-1}(M_k-M_{k-1})]
&=E\left[H_{k-1}E[M_k-M_{k-1}\mid\mathcal G_{k-1}]\right]\\
&=0,
\end{aligned}
$$

従って $E[G_N]=0$ です。

完了した上向き横断1回につき少なくとも $b-a$ の利益があります。最後に買ったまま終わる場合の未実現損失は高々 $(M_N-a)^-$ なので、経路ごとに

$$
G_N\ge(b-a)U_N(a,b)-(M_N-a)^-.
$$

期待値を取ると

$$
(b-a)E[U_N(a,b)]\le E[(M_N-a)^-].
$$

さらに $(M_N-a)^-\le|M_N|+|a|$ なので

$$
\boxed{E[U_N(a,b)]\le\frac{E|X|+|a|}{b-a}}.
$$

$U_N(a,b)$ は $N$ とともに増加するので単調収束定理より

$$
E[U_\infty(a,b)]<\infty,
$$

従って $U_\infty(a,b)<\infty$ a.s. です。

### 4.4 証明：振動を排除する

もしある経路で

$$
\liminf_{n\to\infty}M_n<\limsup_{n\to\infty}M_n
$$

なら、その間に有理数 $a<b$ を取れます。その経路は $a$ 以下と $b$ 以上を無限回行き来するので $U_\infty(a,b)=\infty$ です。

有理数対 $(a,b)$ は可算個なので、確率1ですべての有理数対について上向き横断回数が有限です。従って確率1で $M_n$ の拡張実数値極限が存在します。

さらにFatouの補題から

$$
E\left[\liminf_{n\to\infty}|M_n|\right]
\le\liminf_{n\to\infty}E|M_n|
\le E|X|<\infty.
$$

極限が $+\infty$ または $-\infty$ になる集合が正の確率を持てば左辺が無限大になるので矛盾です。従って有限確率変数 $M_\infty$ が存在して

$$
M_n\to M_\infty\quad\text{a.s.}
$$

です。

### 4.5 証明：極限を同定する

すでに $M_n\to Y$ in $L^1$ なので $M_n\to Y$ in probability です。一方a.s.収束から $M_n\to M_\infty$ in probability でもあります。確率収束の極限はa.s.一意なので

$$
M_\infty=Y\quad\text{a.s.}
$$

従って

$$
\boxed{E[X\mid\mathcal G_n]\longrightarrow E[X\mid\mathcal G_\infty]
\quad L^1\text{ and a.s.}}
$$

が示されました。
<!-- proof-end -->

---

## 5. 二進分割の例で何が起きるか

第1節の二進分割を使い

$$
X(t)=t
$$

とします。$t\in I_{k,n}$ なら有限分割の公式から

$$
E[X\mid\mathcal G_n](t)
=\frac{1}{|I_{k,n}|}\int_{I_{k,n}}s\,ds
=\frac{2k+1}{2^{n+1}}.
$$

これは $I_{k,n}$ の中点であり

$$
|E[X\mid\mathcal G_n](t)-t|\le2^{-n}\to0.
$$

情報を細かくすると、条件付き平均が極限情報に対する条件付き期待値へ戻ることが見えます。

---

## 6. martingaleとの接続

列 $M_n=E[X\mid\mathcal G_n]$ は

$$
E[M_n\mid\mathcal G_{n-1}]=M_{n-1}
$$

を満たします。これは後のEncore IVで定義するmartingaleです。この講義では一般のmartingale収束定理を先に仮定せず、条件付き期待値から作られる特別なmartingaleについて必要なupcrossing議論をここで証明しました。

---

## 演習

### F0-00P3C-A01 二進分割で条件付き期待値を計算する

- Level: A
- 目安時間: 12分

$([0,1),\mathcal B,\lambda)$ 上で $X(t)=t$、$\mathcal G_n=\sigma(I_{0,n},\dots,I_{2^n-1,n})$ とする。$t\in I_{k,n}$ に対する $E[X\mid\mathcal G_n](t)$ を求め、$X(t)$ への収束を直接示せ。

<!-- solution-start -->
#### 詳細解答
各セル上では条件付き期待値はセル平均なので

$$
E[X\mid\mathcal G_n](t)
=2^n\int_{k/2^n}^{(k+1)/2^n}s\,ds
=\frac{2k+1}{2^{n+1}}.
$$

$t$ と同じ長さ $2^{-n}$ のセル内にあるため $|E[X\mid\mathcal G_n](t)-t|\le2^{-n}\to0$。

#### 本番答案
セル平均を計算して $(2k+1)/2^{n+1}$。セル幅が $2^{-n}$ なので誤差は $2^{-n}$ 以下で0へ収束する。

#### 採点基準（20点）
- セル上で定数になる理由: 4点
- 積分計算: 8点
- 誤差評価: 5点
- 収束結論: 3点
<!-- solution-end -->

### F0-00P3C-B01 upcrossing評価を導く

- Level: B
- 目安時間: 20分

$M_n=E[X\mid\mathcal G_n]$、$a<b$ とする。$a$ 以下で買い $b$ 以上で売る戦略を用いて

$$
(b-a)E[U_N(a,b)]\le E[(M_N-a)^-]
$$

を示し、$U_\infty(a,b)<\infty$ a.s. を導け。

<!-- solution-start -->
#### 詳細解答
過去情報だけで決まる保有量を $H_{k-1}\in\{0,1\}$ とし

$$
G_N=\sum_{k=2}^NH_{k-1}(M_k-M_{k-1})
$$

と置く。tower propertyから各増分の条件付き平均が0なので $E[G_N]=0$。経路ごとに

$$
G_N\ge(b-a)U_N(a,b)-(M_N-a)^-.
$$

期待値を取って主張を得る。さらに

$$
E[(M_N-a)^-]\le E|M_N|+|a|\le E|X|+|a|
$$

なので $E[U_N]$ は一様有界。単調収束定理から $E[U_\infty]<\infty$、従って $U_\infty<\infty$ a.s.。

#### 本番答案
予測可能な0/1保有戦略の期待損益が0であることと、経路ごとの利益下界を組み合わせる。最後に $L^1$縮小性で右辺を $N$ に一様に抑える。

#### 採点基準（20点）
- 保有戦略の構成: 4点
- 期待損益0: 5点
- 経路ごとの不等式: 5点
- 一様上界と単調収束: 6点
<!-- solution-end -->

---

## 次に進む

条件付き期待値の収束まで閉じました。次は [F0-00P4 収束・Borel--Cantelli](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md) で、確率変数列一般の収束概念とa.s.収束を扱います。
