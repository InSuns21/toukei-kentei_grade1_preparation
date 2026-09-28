# MICRO10 Afriat の定理

<!-- definition-example-audit: strict -->

MICRO9 では、有限個の価格・需要観測が一つの局所非飽和な選好で合理化されるなら、観測データは GARP を満たさなければならないことを示しました。

ここでは逆向きを問います。

$$
\boxed{
\text{GARP を満たす有限データ}
\quad\Longrightarrow\quad
\text{実際に効用関数を作れるか}
}
$$

Afriat の定理は、この問いに非常に強い形で答えます。

有限個の観測については、GARP を満たすことと、

- Afriat 不等式と呼ばれる有限線形不等式系が解を持つこと
- 連続で狭義単調かつ凹な効用関数が観測を合理化すること

が同値です。

しかも効用関数は抽象的な存在ではありません。Afriat 不等式の解から、

$$
u(x)
=
\min_t
\left\{
u_t+\lambda_t p^t\cdot(x-x^t)
\right\}
$$

と区分線形関数をその場で構成できます。

本章では、

$$
\text{GARP}
\Longrightarrow
\text{Afriat 不等式}
\Longrightarrow
\text{区分線形効用}
\Longrightarrow
\text{合理化}
$$

を核心論証まで閉じます。

---

## 1. 観測を支出差だけに圧縮する

有限需要観測を

$$
\mathcal D
=
\{(p^t,x^t)\}_{t=1}^T
$$

とします。

各価格は

$$
p^t\in\mathbb R_{++}^L
$$

であり、観測支出

$$
m^t=p^t\cdot x^t
$$

を所得とみなします。

観測 $t$ の価格で、別の観測束 $x^s$ が選択束 $x^t$ よりいくら高いかを

$$
p^t\cdot x^s-p^t\cdot x^t
$$

で測ります。

<a id="def-micro10-expenditure-difference"></a>

<!-- formal-statement-start -->
> **定義（支出差行列）**  
> 有限需要観測
>
$$
\mathcal D
=
\{(p^t,x^t)\}_{t=1}^T
$$
>
> に対し、
>
$$
a_{ts}
=
p^t\cdot(x^s-x^t)
$$
>
> と置く。
>
> 行列
>
$$
A=(a_{ts})_{t,s=1}^T
$$
>
> を **支出差行列**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro10-expenditure-difference -->
**定義の確認**：符号が直接顕示選好を表す

二財二観測で、

$$
p^1=(1,1),
\qquad
x^1=(1,1),
$$

$$
p^2=(2,1),
\qquad
x^2=(0,1)
$$

とします。

すると

$$
a_{12}
=
(1,1)\cdot\bigl((0,1)-(1,1)\bigr)
=
-1,
$$

$$
a_{21}
=
(2,1)\cdot\bigl((1,1)-(0,1)\bigr)
=
2.
$$

従って、

$$
A
=
\begin{pmatrix}
0 & -1\\
2 & 0
\end{pmatrix}.
$$

$a_{12}\le0$ なので、観測1では $x^2$ も買えました。従って

$$
x^1R^Dx^2.
$$

一方 $a_{21}>0$ なので、観測2では $x^1$ は買えず、

$$
x^2R^Dx^1
$$

ではありません。
<!-- definition-example-end -->

支出差行列を使えば、

$$
x^tR^Dx^s
\iff
a_{ts}\le0,
$$

$$
x^tP^Dx^s
\iff
a_{ts}<0
$$

です。

顕示選好の判定を、有限行列の符号だけに落とせました。

---

## 2. 効用水準と「所得の限界価値」を未知数にする

観測点 $x^t$ における効用水準を $u_t$ とします。

さらに各観測に正の係数

$$
\lambda_t>0
$$

を置きます。

$\lambda_t$ は後で構成する効用の支持平面の傾きを価格ベクトルに合わせる係数です。経済学的には、その観測における所得の限界価値に対応する量と読めます。

<a id="def-micro10-afriat-inequalities"></a>

<!-- formal-statement-start -->
> **定義（Afriat 不等式）**  
> 有限需要観測
>
$$
\mathcal D
=
\{(p^t,x^t)\}_{t=1}^T
$$
>
> に対し、未知数
>
$$
u_t\in\mathbb R,
\qquad
\lambda_t>0
\qquad
(t=1,\dots,T)
$$
>
> が、全ての $t,s$ について
>
$$
u_s
\le
u_t
+
\lambda_t p^t\cdot(x^s-x^t)
$$
>
> を満たすとき、この不等式系を **Afriat 不等式**という。
>
> 支出差行列を使えば、
>
$$
u_s
\le
u_t+\lambda_t a_{ts}
$$
>
> と書ける。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro10-afriat-inequalities -->
**定義の確認**：二観測なら四本の不等式になる

先ほどの

$$
A
=
\begin{pmatrix}
0 & -1\\
2 & 0
\end{pmatrix}
$$

に対して、

$$
u_1=1,
\qquad
u_2=0,
\qquad
\lambda_1=\lambda_2=1
$$

と置きます。

非自明な二本は、

$$
u_2
\le
u_1+\lambda_1a_{12}
=
1-1
=
0,
$$

$$
u_1
\le
u_2+\lambda_2a_{21}
=
0+2
=
2.
$$

実際、

$$
0\le0,
\qquad
1\le2
$$

なので成立します。

$t=s$ の二本は

$$
u_t\le u_t
$$

で自動的に成立します。

従ってこのデータの Afriat 不等式は実行可能です。
<!-- definition-example-end -->

### 2.1 直接顕示選好が効用比較へ変わる

もし

$$
a_{ts}\le0
$$

なら Afriat 不等式から、

$$
u_s
\le
u_t+\lambda_ta_{ts}
\le
u_t.
$$

従って、

$$
x^tR^Dx^s
\Longrightarrow
u_t\ge u_s.
$$

さらに

$$
a_{ts}<0
$$

なら $\lambda_t>0$ なので、

$$
u_s<u_t.
$$

従って、

$$
x^tP^Dx^s
\Longrightarrow
u_t>u_s.
$$

Afriat 不等式は、顕示選好の矢印に数値的な効用水準を矛盾なく割り当てる仕組みになっています。

---

## 3. GARP は「非正閉路に負の辺がない」と言い換えられる

GARP を帰納証明へ使いやすい形に直します。

<a id="lem-micro10-garp-cycle"></a>

<!-- formal-statement-start -->
> **補題（GARP の閉路特徴付け）**  
> 支出差行列
>
$$
a_{ts}=p^t\cdot(x^s-x^t)
$$
>
> を考える。
>
> データが GARP を満たすことと、任意の閉路
>
$$
t_0,t_1,\dots,t_k=t_0
$$
>
> について、
>
$$
a_{t_0t_1}\le0,
\quad
a_{t_1t_2}\le0,
\quad
\dots,
\quad
a_{t_{k-1}t_k}\le0
$$
>
> なら、実は全て
>
$$
a_{t_rt_{r+1}}=0
$$
>
> であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a_{ts}\le0$ は

$$
x^tR^Dx^s
$$

と同値です。

従って閉路の全辺が非正であることは、

$$
x^{t_0}R^Dx^{t_1}R^D\cdots R^Dx^{t_0}
$$

という直接顕示選好の閉路があることを意味します。

もしその中に一つでも

$$
a_{t_rt_{r+1}}<0
$$

があれば、

$$
x^{t_r}P^Dx^{t_{r+1}}
$$

です。

閉路の残りの辺をたどれば、

$$
x^{t_{r+1}}Rx^{t_r}
$$

でもあります。

これは GARP が禁じる

$$
x^{t_{r+1}}Rx^{t_r}
\quad\text{かつ}\quad
x^{t_r}P^Dx^{t_{r+1}}
$$

そのものです。

逆に GARP 違反があれば、

$$
x^sRx^t
$$

かつ

$$
x^tP^Dx^s
$$

となる $s,t$ があります。

$x^sRx^t$ を作る直接顕示選好の鎖に、最後の狭義直接顕示選好

$$
x^tP^Dx^s
$$

を加えれば、全辺が非正で少なくとも一辺が負の閉路ができます。

従って両条件は同値です。$\square$
<!-- proof-end -->

この補題により、GARP は「負の辺を含む非正閉路がない」という有限グラフ条件になります。

---

## 4. Afriat の定理

<a id="thm-micro10-afriat"></a>

<!-- formal-statement-start -->
> **定理（Afriat の定理）**  
> 有限需要観測
>
$$
\mathcal D
=
\{(p^t,x^t)\}_{t=1}^T,
\qquad
p^t\in\mathbb R_{++}^L
$$
>
> を考え、各観測の予算集合を
>
$$
B^t
=
\{x\in\mathbb R_+^L:
p^t\cdot x
\le
p^t\cdot x^t
\}
$$
>
> とする。
>
> 次は同値である。
>
> 1. 局所非飽和な効用関数がデータを合理化する。
> 2. データは GARP を満たす。
> 3. 全ての $t,s$ について
>
$$
u_s
\le
u_t
+
\lambda_t p^t\cdot(x^s-x^t),
\qquad
\lambda_t>0
$$
>
> を満たす実数 $u_t$ と正数 $\lambda_t$ が存在する。
> 4. 連続・狭義単調・凹な効用関数がデータを合理化する。
>
> さらに 3 の解から、
>
$$
u(x)
=
\min_{t=1,\dots,T}
\left\{
u_t
+
\lambda_t p^t\cdot(x-x^t)
\right\}
$$
>
> と置けば、4 を満たす区分線形効用関数を構成できる。
<!-- formal-statement-end -->

この定理の驚くべき点は、有限データについては、

$$
\boxed{
\text{局所非飽和な何らかの合理化}
}
$$

と

$$
\boxed{
\text{連続・狭義単調・凹な合理化}
}
$$

の観測上の制約が同じだということです。

有限個の選択だけからは、GARP を通過したデータに対して「凹効用では合理化できない」と追加で排除することはできません。

---

## 5. 1 ⇒ 2 は MICRO9 で証明済み

MICRO9 では、完備・推移的で局所非飽和な選好による合理化があるなら GARP を満たすことを証明しました。

効用関数で合理化できるなら、その効用が表す選好は完備・推移的です。

従って、

$$
1\Longrightarrow2
$$

です。

本章の本当の難所は、

$$
2\Longrightarrow3
$$

です。

---

## 6. GARP から Afriat 不等式を作る

### 6.1 帰納命題を少し強くしておく

元の支出差行列は、

$$
A=(a_{ij}),
\qquad
a_{ij}=p^i\cdot(x^j-x^i)
$$

です。

ただし帰納途中では、$A$ の一部を修正した行列を使います。その修正行列が再び何らかの価格・需要観測から生じるとは限りません。

そこで、需要データに限らない次の少し強い命題を帰納法で示します。

> **帰納命題**  
> $n\times n$ 実行列 $A=(a_{ij})$ が
>
> 1. $a_{ii}=0$ を全ての $i$ で満たし、
> 2. 全辺が非正の任意の閉路では全ての辺が 0 である
>
> とする。このとき、
>
> $$
> \phi_j
> \le
> \phi_i+\lambda_i a_{ij},
> \qquad
> \lambda_i>0
> $$
>
> を全ての $i,j$ について満たす実数 $\phi_i$ と正数 $\lambda_i$ が存在する。

GARP を満たす支出差行列は、前節の閉路特徴付けによりこの二条件を満たします。従ってこの強い命題を証明すれば、元の需要データに対する Afriat 不等式の可解性が従います。

ここでは定理の $u_i$ を $\phi_i$ と書きます。

$n=1$ なら、

$$
\phi_1=0,
\qquad
\lambda_1=1
$$

でよいので自明です。

以下、サイズ $n-1$ の任意の行列について帰納命題が成立すると仮定し、サイズ $n$ の行列 $A$ を考えます。

### 6.2 非負の行を一つ見つける

まず、ある観測 $n$ を取り直して、

$$
a_{nj}\ge0
\qquad
(\forall j)
$$

となるようにできます。

なぜでしょうか。

もし全ての行に負の成分があるなら、任意の行 $i$ から

$$
a_{ij}<0
$$

となる列 $j$ を一つ選び、その $j$ 行へ移ります。

同じ操作を続けると、観測数は有限なので、いつか既に現れた添字へ戻ります。

すると、

$$
a_{i_0i_1}<0,
\quad
a_{i_1i_2}<0,
\quad
\dots,
\quad
a_{i_ki_0}<0
$$

という閉路ができます。

これは GARP の閉路特徴付けに反します。

従って少なくとも一つ、

$$
a_{nj}\ge0
\qquad
(\forall j)
$$

となる行が存在します。

添字を付け替えて、それを第 $n$ 行とします。

### 6.3 零の成分が難所になる

もし全ての $j<n$ について

$$
a_{nj}>0
$$

なら、第 $n$ 観測を追加するのは比較的簡単です。

ところが

$$
a_{nj}=0
$$

があると、後で $\lambda_n$ をどれだけ大きくしても、

$$
\lambda_n a_{nj}=0
$$

のままです。

したがって零の支出差を雑に無視すると、無差別を含む一般の GARP を扱えません。

そこで $n$ 番目を一旦取り除いた $n-1$ 次行列を、少しだけ修正します。

### 6.4 修正行列を作る

$i,j<n$ に対して、

$$
a'_{ij}
=
\begin{cases}
a_{ij},
&
a_{nj}>0,\\
\min\{a_{ij},a_{in}\},
&
a_{nj}=0
\end{cases}
$$

と定めます。

### 修正行列も GARP 型の閉路条件を満たす

まず対角成分を確認します。

$a_{nj}=0$ なら、もし

$$
a_{jn}<0
$$

なら、

$$
n\to j\to n
$$

が一辺厳密な非正閉路になって GARP に反します。

従って、

$$
a_{jn}\ge0.
$$

よって

$$
a'_{jj}
=
\min\{a_{jj},a_{jn}\}
=
\min\{0,a_{jn}\}
=
0.
$$

次に、$A'$ に全辺非正で少なくとも一辺が負の閉路があると仮定します。

$A$ 自身は GARP を満たすので、その閉路には少なくとも一つ、

$$
a'_{pq}\ne a_{pq}
$$

となる辺が必要です。

この変更が起こるのは、

$$
a_{nq}=0,
\qquad
a'_{pq}=a_{pn}<a_{pq}
$$

の場合です。

その辺

$$
p\to q
$$

を、

$$
p\to n\to q
$$

へ置き換えます。

新しい二辺は、

$$
a_{pn}=a'_{pq}\le0,
\qquad
a_{nq}=0.
$$

従って非正性は保たれます。

変更された辺を全てこのように置き換えると、元の行列 $A$ の辺だけからなる閉じた歩道が得られます。

もとの閉路には厳密負の辺が一つ以上ありました。

その厳密性は、変更されなかった負の辺か、置換後の

$$
a_{pn}<0
$$

のどちらかとして残ります。

従ってこの閉じた歩道には、全辺が非正で少なくとも一辺が負の閉路が含まれます。

これは $A$ の GARP 条件に反します。

従って $A'$ も GARP 型の閉路条件を満たします。

### 6.5 帰納仮定を $A'$ に使う

帰納仮定により、$i,j<n$ について、

$$
\phi_j
\le
\phi_i+\lambda_i a'_{ij},
\qquad
\lambda_i>0
$$

となる $\phi_i,\lambda_i$ が存在します。

定義から、

$$
a'_{ij}\le a_{ij}.
$$

$\lambda_i>0$ なので、

$$
\phi_i+\lambda_i a'_{ij}
\le
\phi_i+\lambda_i a_{ij}.
$$

従って、

$$
\phi_j
\le
\phi_i+\lambda_i a_{ij}
$$

も成立します。

これで最初の $n-1$ 観測同士の Afriat 不等式は確保できました。

### 6.6 第 $n$ 観測の効用水準を決める

次に、

$$
\phi_n
=
\min_{i<n}
\{\phi_i+\lambda_i a_{in}\}
$$

と置きます。

すると全ての $i<n$ について、

$$
\phi_n
\le
\phi_i+\lambda_i a_{in}.
$$

これは、

$$
i<n,
\qquad
j=n
$$

に対する Afriat 不等式です。

### 6.7 第 $n$ 観測の正係数を決める

最後に、

$$
\lambda_n
=
\max
\left\{
1,\;
\max_{\substack{j<n\\a_{nj}>0}}
\frac{\phi_j-\phi_n}{a_{nj}}
\right\}
$$

と置きます。

$a_{nj}>0$ なら、

$$
\lambda_n
\ge
\frac{\phi_j-\phi_n}{a_{nj}}
$$

なので、

$$
\phi_j
\le
\phi_n+\lambda_na_{nj}.
$$

残るのは、

$$
a_{nj}=0
$$

の場合です。

このとき帰納仮定から、任意の $i<n$ について、

$$
\phi_j
\le
\phi_i+\lambda_i a'_{ij}.
$$

従って、

$$
\phi_j
\le
\min_{i<n}
\{\phi_i+\lambda_i a'_{ij}\}.
$$

$a_{nj}=0$ のとき、

$$
a'_{ij}
=
\min\{a_{ij},a_{in}\}
\le
a_{in}.
$$

従って、

$$
\min_{i<n}
\{\phi_i+\lambda_i a'_{ij}\}
\le
\min_{i<n}
\{\phi_i+\lambda_i a_{in}\}
=
\phi_n.
$$

よって、

$$
\phi_j\le\phi_n.
$$

$a_{nj}=0$ なので、

$$
\phi_j
\le
\phi_n
=
\phi_n+\lambda_na_{nj}.
$$

これで第 $n$ 行の Afriat 不等式も全て成立しました。

したがって帰納法により、GARP を満たす任意の有限データについて Afriat 不等式の解が存在します。

すなわち、

$$
2\Longrightarrow3
$$

です。

---

## 7. Afriat 不等式から効用関数を実際に作る

<a id="def-micro10-afriat-utility"></a>

<!-- formal-statement-start -->
> **定義（Afriat 効用関数）**  
> Afriat 不等式の解
>
$$
(u_t,\lambda_t)_{t=1}^T,
\qquad
\lambda_t>0
$$
>
> が与えられたとする。
>
> 各 $t$ に対してアフィン関数
>
$$
\ell_t(x)
=
u_t+\lambda_t p^t\cdot(x-x^t)
$$
>
> を定め、
>
$$
u(x)
=
\min_{t=1,\dots,T}\ell_t(x)
$$
>
> と置く。
>
> この $u$ を **Afriat 効用関数**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro10-afriat-utility -->
**定義の確認**：二本の支持平面の下包絡を作る

二財二観測で、

$$
p^1=(1,2),
\qquad
x^1=(2,1),
$$

$$
p^2=(2,1),
\qquad
x^2=(1,2)
$$

とします。

各観測支出は、

$$
p^1\cdot x^1=4,
\qquad
p^2\cdot x^2=4.
$$

さらに交差支出は、

$$
p^1\cdot x^2=5,
\qquad
p^2\cdot x^1=5.
$$

従ってオフ対角支出差は両方 $1$ です。

$$
u_1=u_2=4,
\qquad
\lambda_1=\lambda_2=1
$$

は Afriat 不等式を満たします。

このとき、

$$
\ell_1(x)
=
4+(1,2)\cdot(x-(2,1))
=
x_1+2x_2,
$$

$$
\ell_2(x)
=
4+(2,1)\cdot(x-(1,2))
=
2x_1+x_2.
$$

従って、

$$
\boxed{
u(x)
=
\min\{x_1+2x_2,\;2x_1+x_2\}
}
$$

です。

二本の平面の低い方を取るので、境界

$$
x_1=x_2
$$

で折れ曲がる区分線形効用になります。
<!-- definition-example-end -->

### 7.1 観測点では指定した効用水準に一致する

観測 $x^s$ を代入します。

Afriat 不等式から全ての $t$ について、

$$
u_s
\le
u_t+\lambda_t p^t\cdot(x^s-x^t)
=
\ell_t(x^s).
$$

従って、

$$
u_s
\le
\min_t\ell_t(x^s)
=
u(x^s).
$$

一方 $t=s$ を選べば、

$$
\ell_s(x^s)
=
u_s.
$$

最小値はこの項以下なので、

$$
u(x^s)\le u_s.
$$

両方合わせて、

$$
\boxed{
u(x^s)=u_s
}
$$

です。

### 7.2 各観測束が予算集合上で最大化点になる

観測 $s$ の予算内の任意の $x$ を取ります。

$$
p^s\cdot x
\le
p^s\cdot x^s.
$$

Afriat 効用関数は全ての支持平面の最小値なので、特に $s$ 番目の平面以下です。

$$
u(x)
\le
u_s+\lambda_s p^s\cdot(x-x^s).
$$

予算制約と $\lambda_s>0$ から、

$$
\lambda_s p^s\cdot(x-x^s)\le0.
$$

従って、

$$
u(x)
\le
u_s
=
u(x^s).
$$

つまり、

$$
x^s
\in
\operatorname*{arg\,max}_{x\in B^s}u(x).
$$

全ての観測 $s$ で成立するので、$u$ はデータを合理化します。

### 7.3 凹性

任意の $x,y$ と

$$
0\le\theta\le1
$$

について、

$$
\ell_t(\theta x+(1-\theta)y)
=
\theta\ell_t(x)+(1-\theta)\ell_t(y)
$$

です。

従って、

$$
u(\theta x+(1-\theta)y)
=
\min_t
\{
\theta\ell_t(x)+(1-\theta)\ell_t(y)
\}.
$$

各 $t$ について、

$$
\ell_t(x)\ge u(x),
\qquad
\ell_t(y)\ge u(y)
$$

なので、

$$
\theta\ell_t(x)+(1-\theta)\ell_t(y)
\ge
\theta u(x)+(1-\theta)u(y).
$$

全ての $t$ について成立するため、最小値を取っても、

$$
u(\theta x+(1-\theta)y)
\ge
\theta u(x)+(1-\theta)u(y).
$$

従って $u$ は凹です。

### 7.4 連続性

各 $\ell_t$ はアフィン関数なので連続です。

有限個の連続関数の点ごとの最小値は連続です。

従って $u$ は連続です。

### 7.5 狭義単調性

$$
x\ge y,
\qquad
x\ne y
$$

とします。

各価格は

$$
p^t\in\mathbb R_{++}^L
$$

で $\lambda_t>0$ なので、

$$
\delta_t
=
\lambda_t p^t\cdot(x-y)
>
0.
$$

観測数は有限なので、

$$
\delta
=
\min_t\delta_t
>
0.
$$

各 $t$ について、

$$
\ell_t(x)
=
\ell_t(y)+\delta_t
\ge
\ell_t(y)+\delta.
$$

従って、

$$
u(x)
=
\min_t\ell_t(x)
\ge
\min_t\ell_t(y)+\delta
=
u(y)+\delta
>
u(y).
$$

よって $u$ は狭義単調です。

これで、

$$
3\Longrightarrow4
$$

が示されました。

連続・狭義単調な効用は局所非飽和なので、

$$
4\Longrightarrow1
$$

です。

以上で Afriat の定理の全ての同値性が閉じました。

---

## 8. Afriat 不等式そのものが GARP を強制する

定理の流れだけなら不要ですが、Afriat 不等式と GARP の関係を直接見ると構造が明確になります。

直接顕示選好の鎖

$$
x^{t_0}R^Dx^{t_1}R^D\cdots R^Dx^{t_k}
$$

があるとします。

各辺で

$$
a_{t_rt_{r+1}}\le0
$$

なので、

$$
u_{t_{r+1}}
\le
u_{t_r}
+
\lambda_{t_r}a_{t_rt_{r+1}}
\le
u_{t_r}.
$$

従って、

$$
u_{t_k}\le u_{t_0}.
$$

もし逆向きに

$$
x^{t_k}P^Dx^{t_0}
$$

なら、

$$
a_{t_kt_0}<0.
$$

Afriat 不等式から、

$$
u_{t_0}
\le
u_{t_k}
+
\lambda_{t_k}a_{t_kt_0}
<
u_{t_k}.
$$

これは

$$
u_{t_k}\le u_{t_0}
$$

と矛盾します。

従って Afriat 不等式に解があるなら GARP を満たします。

つまり数値的な効用水準を割り当てること自体が、厳密な顕示選好循環を排除しています。

---

## 9. 合理化可能性は線形計画の実行可能性問題になる

Afriat 不等式は、

$$
u_s-u_t-\lambda_ta_{ts}\le0
$$

という未知数に関する線形不等式です。

唯一気になるのは、

$$
\lambda_t>0
$$

が狭義不等式であることです。

しかし有限個の $\lambda_t$ が全て正なら、

$$
\lambda_{\min}
=
\min_t\lambda_t
>
0
$$

です。

Afriat 不等式の全ての $u_t,\lambda_t$ を同じ正数倍しても不等式は保たれるので、

$$
\frac{1}{\lambda_{\min}}
$$

倍すれば、

$$
\lambda_t\ge1
$$

と正規化できます。

また全ての $u_t$ に同じ定数を加えても不等式は変わりません。

従って、

$$
u_1=0
$$

と正規化してよいです。

<a id="prop-micro10-lp-feasibility"></a>

<!-- formal-statement-start -->
> **命題（Afriat 不等式の線形計画実行可能性表示）**  
> Afriat 不等式が正の $\lambda_t$ を持つ解を持つことと、
>
$$
u_s-u_t-\lambda_ta_{ts}\le0
\qquad
(\forall t,s),
$$
>
$$
\lambda_t\ge1
\qquad
(\forall t),
$$
>
$$
u_1=0
$$
>
> からなる有限線形制約系が実行可能であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

後者が実行可能なら $\lambda_t\ge1>0$ なので、そのまま Afriat 不等式の解です。

逆に Afriat 不等式の解で全て $\lambda_t>0$ とします。

$$
c
=
\frac{1}{\min_t\lambda_t}
>0
$$

と置き、

$$
\tilde u_t=cu_t,
\qquad
\tilde\lambda_t=c\lambda_t
$$

とすれば、

$$
\tilde\lambda_t\ge1
$$

であり、Afriat 不等式も保たれます。

さらに全ての効用水準から $\tilde u_1$ を引いて、

$$
\hat u_t=\tilde u_t-\tilde u_1
$$

とすれば、

$$
\hat u_1=0
$$

であり、差

$$
\hat u_s-\hat u_t
=
\tilde u_s-\tilde u_t
$$

は変わりません。

従って後者の制約系が実行可能です。$\square$
<!-- proof-end -->

OPT10 の言葉では、

$$
\boxed{
\text{GARP 検査}
\quad\Longleftrightarrow\quad
\text{線形不等式系の実行可能性検査}
}
$$

です。

目的関数は不要で、例えば

$$
\min 0
$$

として実行可能点を一つ求めれば十分です。

得られた $(u_t,\lambda_t)$ をそのまま Afriat 効用関数へ代入すれば、合理化する効用まで復元できます。

---

## 10. 厳密な循環があると不等式を足すだけで矛盾する

MICRO9 の三観測例では、

$$
x^1P^Dx^2,
\qquad
x^2P^Dx^3,
\qquad
x^3P^Dx^1
$$

でした。

支出差は、

$$
a_{12}=-4,
\qquad
a_{23}=-3,
\qquad
a_{31}=-3.
$$

Afriat 不等式が解を持つと仮定すると、

$$
u_2
\le
u_1-4\lambda_1,
$$

$$
u_3
\le
u_2-3\lambda_2,
$$

$$
u_1
\le
u_3-3\lambda_3.
$$

三本を足すと、

$$
u_1+u_2+u_3
\le
u_1+u_2+u_3
-
4\lambda_1
-
3\lambda_2
-
3\lambda_3.
$$

従って、

$$
0
\le
-
4\lambda_1
-
3\lambda_2
-
3\lambda_3.
$$

しかし全て $\lambda_t>0$ なので右辺は負です。

矛盾です。

GARP 違反は、Afriat 不等式では「効用を一周下げ続けて元の効用より低くしなければならない」という不可能な要求として現れます。

---

## 11. 支出効率指数は「どれだけ予算を縮めれば整合するか」を測る

実データでは GARP が完全には成立しないことがあります。

そこで、各観測の支出を共通比率

$$
e\in(0,1]
$$

だけ縮めてから顕示選好を判定します。

<a id="def-micro10-ccei"></a>

<!-- formal-statement-start -->
> **定義（共通支出効率指数）**  
> $e\in(0,1]$ に対し、
>
$$
x^tR_e^Dx^s
$$
>
> を
>
$$
p^t\cdot x^s
\le
e\,p^t\cdot x^t
$$
>
> で定める。
>
> また、
>
$$
x^tP_e^Dx^s
$$
>
> を
>
$$
p^t\cdot x^s
<
e\,p^t\cdot x^t
$$
>
> で定める。
>
> $R_e$ を $R_e^D$ の推移閉包とし、
>
$$
x^tR_ex^s
\Longrightarrow
\neg(x^sP_e^Dx^t)
$$
>
> が成り立つとき、データは **$e$-GARP** を満たすという。
>
> $e$-GARP を満たす最大の $e$ を **共通支出効率指数**
> （Critical Cost Efficiency Index; CCEI）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro10-ccei -->
**定義の確認**：相互に厳密顕示選好する二観測

$$
p^1=(2,1),
\qquad
x^1=(1,0),
$$

$$
p^2=(1,2),
\qquad
x^2=(0,1)
$$

とします。

各選択束の支出は、

$$
p^1\cdot x^1=2,
\qquad
p^2\cdot x^2=2.
$$

交差支出は、

$$
p^1\cdot x^2=1,
\qquad
p^2\cdot x^1=1.
$$

$e$-直接顕示選好が両向きに成立する条件は、

$$
1\le2e.
$$

従って、

$$
e\ge\frac12
$$

で両向きの弱い矢印が現れます。

ただし

$$
e=\frac12
$$

では両方とも等号なので、狭義の逆転はありません。

一方、

$$
e>\frac12
$$

では両向きとも厳密になり、$e$-GARP に違反します。

従って、

$$
\boxed{
\mathrm{CCEI}
=
\frac12
}
$$

です。
<!-- definition-example-end -->

$e=1$ なら通常の GARP です。

CCEI が $1$ に近いほど、GARP を回復するために縮める必要のある予算が小さいと読めます。

本章では入口にとどめ、統計的検定や測定誤差モデルまでは扱いません。

---

## 12. Afriat の定理が何を言っていて、何を言っていないか

### 12.1 有限データでは「凹性を追加したらもっと厳しい」とは限らない

通常、仮定を増やせばモデルは厳しくなるように見えます。

しかし Afriat の定理では、有限需要データについて、

$$
\text{局所非飽和な合理化可能性}
$$

と

$$
\text{連続・狭義単調・凹な合理化可能性}
$$

が同じ GARP で特徴付けられます。

したがって有限データだけからは、GARP を満たした後に凹性を理由として追加で排除することはできません。

### 12.2 構成された効用は「真の心理的効用」ではない

Afriat 効用関数は、観測データを合理化する一つの証明書です。

同じ有限データを合理化する効用関数は一般に多数あります。

従って、

$$
u_t,
\qquad
\lambda_t
$$

や区分線形効用の形を、そのまま観測者の唯一の「真の効用」と解釈してはいけません。

### 12.3 正の価格が狭義単調性を担う

Afriat 効用関数の狭義単調性では、

$$
p^t\in\mathbb R_{++}^L
$$

と

$$
\lambda_t>0
$$

を使いました。

ある財の価格成分が常に $0$ なら、その財を増やしても各支持平面の値が増えない可能性があります。

従って「価格の全成分が正」という仮定は、構成効用の狭義単調性に直接使われています。

---

# 演習

## Level A

<a id="ex-micro10-a01"></a>

### MICRO10-A01 支出差行列と Afriat 不等式

- Level: A
- 目安時間: 15分

二財二観測で、

$$
p^1=(1,1),
\qquad
x^1=(1,1),
$$

$$
p^2=(2,1),
\qquad
x^2=(0,1)
$$

とする。

1. 支出差行列 $A=(a_{ts})$ を求めよ。
2. 直接顕示選好を全て求めよ。
3.
$$
u_1=1,\quad u_2=0,\quad \lambda_1=\lambda_2=1
$$
が Afriat 不等式を満たすことを確認せよ。

<!-- solution-start -->
#### 詳細解答

まず、

$$
a_{11}=a_{22}=0.
$$

次に、

$$
a_{12}
=
p^1\cdot(x^2-x^1)
=
(1,1)\cdot(-1,0)
=
-1.
$$

また、

$$
a_{21}
=
p^2\cdot(x^1-x^2)
=
(2,1)\cdot(1,0)
=
2.
$$

従って、

$$
\boxed{
A=
\begin{pmatrix}
0 & -1\\
2 & 0
\end{pmatrix}
}
$$

です。

$a_{12}\le0$ なので、

$$
x^1R^Dx^2.
$$

しかも $a_{12}<0$ なので、

$$
x^1P^Dx^2.
$$

一方、

$$
a_{21}=2>0
$$

なので、

$$
x^2R^Dx^1
$$

ではありません。

次に Afriat 不等式を確認します。

$t=1,s=2$ では、

$$
u_2
\le
u_1+\lambda_1a_{12}
$$

すなわち、

$$
0
\le
1-1
=
0.
$$

成立します。

$t=2,s=1$ では、

$$
u_1
\le
u_2+\lambda_2a_{21},
$$

すなわち、

$$
1
\le
0+2
=
2.
$$

成立します。

$t=s$ は恒等的に成立するので、候補は Afriat 不等式の実行可能解です。
<!-- solution-end -->

<a id="ex-micro10-a02"></a>

### MICRO10-A02 区分線形効用を構成する

- Level: A
- 目安時間: 20分

$$
p^1=(1,2),
\qquad
x^1=(2,1),
$$

$$
p^2=(2,1),
\qquad
x^2=(1,2)
$$

とし、

$$
u_1=u_2=4,
\qquad
\lambda_1=\lambda_2=1
$$

とする。

1. Afriat 効用関数を求めよ。
2. $u(x^1)=u(x^2)=4$ を確認せよ。
3. 各観測束が対応する予算集合上の最大化点であることを示せ。

<!-- solution-start -->
#### 詳細解答

第1平面は、

$$
\ell_1(x)
=
4+(1,2)\cdot(x-(2,1)).
$$

内積を展開すると、

$$
\ell_1(x)
=
4+x_1-2+2x_2-2
=
x_1+2x_2.
$$

第2平面は、

$$
\ell_2(x)
=
4+(2,1)\cdot(x-(1,2))
=
2x_1+x_2.
$$

従って、

$$
\boxed{
u(x)
=
\min
\{
x_1+2x_2,\;
2x_1+x_2
\}
}
$$

です。

$x^1=(2,1)$ では、

$$
x_1+2x_2
=
2+2
=
4,
$$

$$
2x_1+x_2
=
4+1
=
5.
$$

従って、

$$
u(x^1)=4.
$$

$x^2=(1,2)$ では、

$$
x_1+2x_2
=
1+4
=
5,
$$

$$
2x_1+x_2
=
2+2
=
4.
$$

従って、

$$
u(x^2)=4.
$$

観測1の予算集合は、

$$
B^1
=
\{x\ge0:x_1+2x_2\le4\}.
$$

任意の $x\in B^1$ について、

$$
u(x)
\le
x_1+2x_2
\le4
=
u(x^1).
$$

従って $x^1$ は $B^1$ 上の最大化点です。

同様に観測2では、

$$
B^2
=
\{x\ge0:2x_1+x_2\le4\}.
$$

任意の $x\in B^2$ について、

$$
u(x)
\le
2x_1+x_2
\le4
=
u(x^2).
$$

従って $x^2$ も最大化点です。
<!-- solution-end -->

<a id="ex-micro10-a03"></a>

### MICRO10-A03 有限個の支持平面の最小値

- Level: A
- 目安時間: 20分

$$
u(x)
=
\min_{t=1,\dots,T}
\{b_t+c_t\cdot x\}
$$

とし、全ての $c_t$ の各成分が正であるとする。

1. $u$ が凹であることを証明せよ。
2. $u$ が連続であることを説明せよ。
3. $x\ge y,\ x\ne y$ なら $u(x)>u(y)$ であることを証明せよ。

<!-- solution-start -->
#### 詳細解答

各アフィン関数を、

$$
\ell_t(x)=b_t+c_t\cdot x
$$

と書きます。

任意の $0\le\theta\le1$ について、

$$
\ell_t(\theta x+(1-\theta)y)
=
\theta\ell_t(x)+(1-\theta)\ell_t(y).
$$

また、

$$
\ell_t(x)\ge u(x),
\qquad
\ell_t(y)\ge u(y).
$$

従って、

$$
\ell_t(\theta x+(1-\theta)y)
\ge
\theta u(x)+(1-\theta)u(y).
$$

全ての $t$ で成立するので最小値を取って、

$$
u(\theta x+(1-\theta)y)
\ge
\theta u(x)+(1-\theta)u(y).
$$

従って $u$ は凹です。

各 $\ell_t$ は連続であり、個数は有限です。

有限個の連続関数の点ごとの最小値は連続なので、$u$ は連続です。

最後に、

$$
x\ge y,
\qquad
x\ne y
$$

とします。

$c_t$ の全成分が正なので、

$$
d_t
=
c_t\cdot(x-y)
>
0.
$$

有限個なので、

$$
d=\min_td_t>0.
$$

従って全ての $t$ について、

$$
\ell_t(x)
=
\ell_t(y)+d_t
\ge
\ell_t(y)+d.
$$

最小値を取ると、

$$
u(x)
\ge
u(y)+d
>
u(y).
$$

従って $u$ は狭義単調です。
<!-- solution-end -->

<a id="ex-micro10-a04"></a>

### MICRO10-A04 線形計画の実行可能性へ正規化する

- Level: A
- 目安時間: 15分

Afriat 不等式の解 $(u_t,\lambda_t)$ があり、

$$
\lambda_t>0
$$

とする。

1. 全ての $\lambda_t$ を $1$ 以上に正規化できることを示せ。
2. さらに $u_1=0$ としてよいことを示せ。
3. 以上から Afriat 不等式が有限線形制約系の実行可能性問題になることを説明せよ。

<!-- solution-start -->
#### 詳細解答

有限個の正数 $\lambda_t$ について、

$$
\lambda_{\min}
=
\min_t\lambda_t
>
0.
$$

そこで、

$$
c=\frac1{\lambda_{\min}}
$$

と置きます。

Afriat 不等式

$$
u_s
\le
u_t+\lambda_ta_{ts}
$$

の両辺を $c>0$ 倍すると、

$$
cu_s
\le
cu_t+c\lambda_ta_{ts}.
$$

従って、

$$
\tilde u_t=cu_t,
\qquad
\tilde\lambda_t=c\lambda_t
$$

も解です。

しかも、

$$
\tilde\lambda_t
=
\frac{\lambda_t}{\lambda_{\min}}
\ge1.
$$

次に全ての効用水準へ同じ定数を加減しても、

$$
u_s-u_t
$$

は変わりません。

従って、

$$
\hat u_t
=
\tilde u_t-\tilde u_1
$$

とすれば、

$$
\hat u_1=0
$$

であり、Afriat 不等式も保たれます。

よって未知数 $(u_t,\lambda_t)$ に対し、

$$
u_s-u_t-\lambda_ta_{ts}\le0,
$$

$$
\lambda_t\ge1,
$$

$$
u_1=0
$$

という全て線形な制約だけを解けばよいことになります。

目的関数を

$$
0
$$

とする線形計画の実行可能性問題として扱えます。
<!-- solution-end -->

## Level B

<a id="ex-micro10-b01"></a>

### MICRO10-B01 厳密循環は Afriat 不等式を不可能にする

- Level: B
- 目安時間: 20分

三観測について、

$$
a_{12}=-4,
\qquad
a_{23}=-3,
\qquad
a_{31}=-3
$$

とする。

Afriat 不等式に $\lambda_1,\lambda_2,\lambda_3>0$ を持つ解が存在しないことを、不等式を加えることで示せ。

<!-- solution-start -->
#### 詳細解答

Afriat 不等式から、

$$
u_2
\le
u_1+\lambda_1a_{12}
=
u_1-4\lambda_1,
$$

$$
u_3
\le
u_2+\lambda_2a_{23}
=
u_2-3\lambda_2,
$$

$$
u_1
\le
u_3+\lambda_3a_{31}
=
u_3-3\lambda_3.
$$

三本を加えると、

$$
u_1+u_2+u_3
\le
u_1+u_2+u_3
-
4\lambda_1
-
3\lambda_2
-
3\lambda_3.
$$

両辺から同じ効用和を引けば、

$$
0
\le
-
4\lambda_1
-
3\lambda_2
-
3\lambda_3.
$$

しかし、

$$
\lambda_1,\lambda_2,\lambda_3>0
$$

なので右辺は厳密に負です。

矛盾です。

従って Afriat 不等式は実行不可能です。

これは

$$
1\to2\to3\to1
$$

の全辺が厳密な直接顕示選好であるため、効用が

$$
u_1>u_2>u_3>u_1
$$

を同時に要求されることに対応します。
<!-- solution-end -->

<a id="ex-micro10-b02"></a>

### MICRO10-B02 Afriat 不等式から GARP を直接導く

- Level: B
- 目安時間: 25分

Afriat 不等式に解があるとする。

$$
x^{t_0}R^Dx^{t_1}R^D\cdots R^Dx^{t_k}
$$

なら、

$$
u_{t_k}\le u_{t_0}
$$

であることを示し、さらに逆向きに

$$
x^{t_k}P^Dx^{t_0}
$$

は不可能であることを証明せよ。

<!-- solution-start -->
#### 詳細解答

各直接顕示選好

$$
x^{t_r}R^Dx^{t_{r+1}}
$$

について、

$$
a_{t_rt_{r+1}}\le0.
$$

Afriat 不等式から、

$$
u_{t_{r+1}}
\le
u_{t_r}
+
\lambda_{t_r}a_{t_rt_{r+1}}.
$$

$\lambda_{t_r}>0$ と

$$
a_{t_rt_{r+1}}\le0
$$

から、

$$
u_{t_{r+1}}
\le
u_{t_r}.
$$

これを鎖に沿って繰り返すと、

$$
u_{t_k}
\le
u_{t_{k-1}}
\le
\cdots
\le
u_{t_0}.
$$

従って、

$$
u_{t_k}\le u_{t_0}.
$$

ここで逆向きに、

$$
x^{t_k}P^Dx^{t_0}
$$

と仮定します。

すると、

$$
a_{t_kt_0}<0.
$$

Afriat 不等式から、

$$
u_{t_0}
\le
u_{t_k}
+
\lambda_{t_k}a_{t_kt_0}.
$$

$\lambda_{t_k}>0$ かつ $a_{t_kt_0}<0$ なので、

$$
u_{t_0}<u_{t_k}.
$$

これは先ほどの

$$
u_{t_k}\le u_{t_0}
$$

と矛盾します。

従って逆向きの狭義直接顕示選好は存在できず、GARP が成立します。
<!-- solution-end -->

<a id="ex-micro10-b03"></a>

### MICRO10-B03 共通支出効率指数を求める

- Level: B
- 目安時間: 25分

$$
p^1=(2,1),
\qquad
x^1=(1,0),
$$

$$
p^2=(1,2),
\qquad
x^2=(0,1)
$$

とする。

1. 通常の GARP に違反することを示せ。
2. $e$-GARP を満たす最大の $e$ を求めよ。
3. その値が $e=1$ の GARP 違反より何を弱めているか説明せよ。

<!-- solution-start -->
#### 詳細解答

各観測の選択束の支出は、

$$
p^1\cdot x^1=2,
\qquad
p^2\cdot x^2=2.
$$

交差支出は、

$$
p^1\cdot x^2=1,
\qquad
p^2\cdot x^1=1.
$$

従って通常の $e=1$ では、

$$
1<2
$$

なので、

$$
x^1P^Dx^2,
\qquad
x^2P^Dx^1.
$$

両向きに狭義直接顕示選好があり、GARP に違反します。

効率水準 $e$ では、

$$
x^1R_e^Dx^2
$$

となる条件は、

$$
1
\le
2e.
$$

同様に逆向きも、

$$
1
\le
2e.
$$

従って両向きの弱い直接顕示選好が現れるのは、

$$
e\ge\frac12
$$

です。

$$
e>\frac12
$$

なら、

$$
1<2e
$$

なので両向きとも狭義となり、$e$-GARP に違反します。

一方、

$$
e=\frac12
$$

では、

$$
1=2e
$$

で両向きとも等号です。

弱い循環はありますが狭義逆転がないため、$e$-GARP は満たされます。

従って最大値は、

$$
\boxed{
e^*=\frac12
}
$$

です。

通常の GARP は、実際の観測支出

$$
p^t\cdot x^t
$$

を全て比較対象に使います。

$e$-GARP はそれを

$$
e\,p^t\cdot x^t
$$

まで縮め、十分安い代替束だけを「買えた」とみなします。

この例では予算を半分まで縮めれば、厳密な相互逆転が消えます。
<!-- solution-end -->

## Level C

<a id="ex-micro10-c01"></a>

### MICRO10-C01 GARP から区分線形効用まで一気に構成する

- Level: C
- 目安時間: 45分

三財ではなく二財について、三観測

$$
p^1=(1,3),
\qquad
x^1=(3,0),
$$

$$
p^2=(2,2),
\qquad
x^2=(1,1),
$$

$$
p^3=(3,1),
\qquad
x^3=(0,3)
$$

を考える。

1. 支出差行列 $A=(a_{ts})$ を求め、GARP を満たすことを示せ。
2.
$$
u_1=3,
\qquad
u_2=4,
\qquad
u_3=3,
$$
$$
\lambda_1=\lambda_2=\lambda_3=1
$$
が Afriat 不等式を満たすことを確認せよ。
3. Afriat 効用関数を具体的に求めよ。
4. 各観測点で指定した効用水準を取ることを確認せよ。
5. 各観測束が対応する予算集合上の最大化点になることを直接示せ。
6. この例で効用関数が凹・連続・狭義単調である理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

まず各観測支出を計算します。

観測1では、

$$
p^1\cdot x^1
=
(1,3)\cdot(3,0)
=
3.
$$

観測2では、

$$
p^2\cdot x^2
=
(2,2)\cdot(1,1)
=
4.
$$

観測3では、

$$
p^3\cdot x^3
=
(3,1)\cdot(0,3)
=
3.
$$

交差支出を計算します。

第1価格では、

$$
p^1\cdot x^2
=
1+3
=
4,
$$

$$
p^1\cdot x^3
=
9.
$$

従って、

$$
a_{12}=4-3=1,
\qquad
a_{13}=9-3=6.
$$

第2価格では、

$$
p^2\cdot x^1
=
6,
$$

$$
p^2\cdot x^3
=
6.
$$

従って、

$$
a_{21}=6-4=2,
\qquad
a_{23}=6-4=2.
$$

第3価格では、

$$
p^3\cdot x^1
=
9,
$$

$$
p^3\cdot x^2
=
4.
$$

従って、

$$
a_{31}=9-3=6,
\qquad
a_{32}=4-3=1.
$$

よって、

$$
\boxed{
A
=
\begin{pmatrix}
0&1&6\\
2&0&2\\
6&1&0
\end{pmatrix}
}
$$

です。

オフ対角成分は全て正なので、異なる観測束の間に直接顕示選好はありません。

従って非自明な顕示選好の鎖もなく、GARP を満たします。

次に Afriat 不等式を確認します。

$\lambda_t=1$ なので、

$$
u_s
\le
u_t+a_{ts}
$$

を確認すれば十分です。

$t=1$ では、

$$
u_2=4
\le
u_1+a_{12}
=
3+1
=
4,
$$

$$
u_3=3
\le
u_1+a_{13}
=
3+6
=
9.
$$

$t=2$ では、

$$
u_1=3
\le
u_2+a_{21}
=
4+2
=
6,
$$

$$
u_3=3
\le
u_2+a_{23}
=
4+2
=
6.
$$

$t=3$ では、

$$
u_1=3
\le
u_3+a_{31}
=
3+6
=
9,
$$

$$
u_2=4
\le
u_3+a_{32}
=
3+1
=
4.
$$

全て成立します。

次に支持平面を作ります。

第1平面は、

$$
\ell_1(x)
=
3+(1,3)\cdot(x-(3,0)).
$$

展開すると、

$$
\ell_1(x)
=
x_1+3x_2.
$$

第2平面は、

$$
\ell_2(x)
=
4+(2,2)\cdot(x-(1,1))
=
2x_1+2x_2.
$$

第3平面は、

$$
\ell_3(x)
=
3+(3,1)\cdot(x-(0,3))
=
3x_1+x_2.
$$

従って Afriat 効用関数は、

$$
\boxed{
u(x)
=
\min
\{
x_1+3x_2,\;
2x_1+2x_2,\;
3x_1+x_2
\}
}
$$

です。

各観測点で確認します。

$x^1=(3,0)$ では、

$$
\ell_1(x^1)=3,
\qquad
\ell_2(x^1)=6,
\qquad
\ell_3(x^1)=9.
$$

従って、

$$
u(x^1)=3=u_1.
$$

$x^2=(1,1)$ では、

$$
\ell_1(x^2)=4,
\qquad
\ell_2(x^2)=4,
\qquad
\ell_3(x^2)=4.
$$

従って、

$$
u(x^2)=4=u_2.
$$

$x^3=(0,3)$ では、

$$
\ell_1(x^3)=9,
\qquad
\ell_2(x^3)=6,
\qquad
\ell_3(x^3)=3.
$$

従って、

$$
u(x^3)=3=u_3.
$$

次に合理化を直接確認します。

観測1の予算集合は、

$$
B^1
=
\{x\ge0:x_1+3x_2\le3\}.
$$

任意の $x\in B^1$ について、

$$
u(x)
\le
\ell_1(x)
=
x_1+3x_2
\le3
=
u(x^1).
$$

従って $x^1$ は最大化点です。

観測2では、

$$
B^2
=
\{x\ge0:2x_1+2x_2\le4\}.
$$

任意の $x\in B^2$ について、

$$
u(x)
\le
\ell_2(x)
=
2x_1+2x_2
\le4
=
u(x^2).
$$

従って $x^2$ は最大化点です。

観測3でも、

$$
B^3
=
\{x\ge0:3x_1+x_2\le3\}
$$

に対して、

$$
u(x)
\le
\ell_3(x)
=
3x_1+x_2
\le3
=
u(x^3).
$$

従って $x^3$ は最大化点です。

最後に形状を確認します。

各 $\ell_t$ は連続なアフィン関数です。

有限個のアフィン関数の最小値なので $u$ は連続かつ凹です。

さらに各傾きは、

$$
(1,3),
\qquad
(2,2),
\qquad
(3,1)
$$

であり、全成分が正です。

従って $x\ge y,\ x\ne y$ なら全ての平面が厳密に上昇し、その有限最小値も厳密に上昇します。

よって $u$ は狭義単調です。

以上により、

$$
\boxed{
\text{GARP}
\to
\text{Afriat 不等式}
\to
\text{区分線形効用}
\to
\text{合理化}
}
$$

をこの具体例で最後まで確認できました。
<!-- solution-end -->

---

## まとめ

有限需要データに対する Afriat の定理は、

$$
\boxed{
\text{局所非飽和な合理化}
\iff
\text{GARP}
\iff
\text{Afriat 不等式の可解性}
\iff
\text{連続・狭義単調・凹な合理化}
}
$$

を与えます。

Afriat 不等式

$$
u_s
\le
u_t+\lambda_t p^t\cdot(x^s-x^t)
$$

は、観測された顕示選好を有限個の効用水準へ整合的に埋め込む線形制約です。

GARP からその解を帰納的に構成でき、解が得られれば、

$$
u(x)
=
\min_t
\left\{
u_t+\lambda_t p^t\cdot(x-x^t)
\right\}
$$

によって合理化する区分線形効用を明示的に作れます。

さらに正の $\lambda_t$ は

$$
\lambda_t\ge1
$$

へ正規化できるので、有限データの合理化可能性は線形計画の実行可能性問題として計算できます。

MICRO9 で観測データの整合性を GARP というグラフ条件へ落とし、本章でそれを線形不等式と具体的な効用関数へ戻しました。
