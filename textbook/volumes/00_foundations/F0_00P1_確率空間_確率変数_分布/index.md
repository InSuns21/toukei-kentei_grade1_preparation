# F0-00P1 確率空間・確率変数・分布：分布はどこから来た？

<!-- definition-example-audit: strict -->

[F0-00D2](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md) では、測度空間と可測関数を導入しました。

確率論は、その特別な場合です。

$$
\boxed{
\text{測度空間}
+\text{全体の測度が1}
=\text{確率空間}
}
$$

この章では、標本空間・確率変数・分布・累積分布関数を一つの構造として作ります。

---

## 1. 確率空間

<a id="def-f0-00p1-probability-space"></a>

<!-- formal-statement-start -->
> **定義（確率空間）**  
> 集合 $\Omega$、$\Omega$ 上の $\sigma$ 代数 $\mathcal F$、$\mathcal F$ 上の測度 $P$ の三つ組
>
> $$
> (\Omega,\mathcal F,P)
> $$
>
> が $P(\Omega)=1$ を満たすとき、これを**確率空間**と呼びます。$\Omega$ を標本空間、$\mathcal F$ の元を事象、$P$ を確率測度と呼びます。
<!-- formal-statement-end -->

有限標本空間では、しばしば $\mathcal F=2^\Omega$ として全ての部分集合を事象にします。

一方、無限集合でも冪集合全体に確率測度を定義できる場合はあります。問題は、Lebesgue測度のように「平行移動に自然に振る舞う」「区間の長さと一致する」といった望ましい性質を保ったまま、全ての部分集合へ測度を拡張できるとは限らないことです。そのため、一般論では最初から測りたい集合だけを $\sigma$ 代数として指定します。

### 1.1 例：公平なサイコロ

$$
\Omega=\{1,2,3,4,5,6\},
\qquad
\mathcal F=2^\Omega,
\qquad
P(A)=\frac{|A|}{6}
$$

とします。

<!-- definition-example-start: def-f0-00p1-probability-space -->
**定義の確認**

1. $\mathcal F=2^\Omega$ は空集合を含み、補集合と可算和に閉じているので $\sigma$ 代数です。
2. $P(A)\ge0$ です。
3. 互いに素な $A_1,A_2,\ldots\in\mathcal F$ に対して、有限集合 $\Omega$ の中で非空なものは有限個しかないため

$$
P\left(\bigcup_{n=1}^\infty A_n\right)
=\frac{\left|\bigcup_n A_n\right|}{6}
=\sum_{n=1}^\infty\frac{|A_n|}{6}
=\sum_{n=1}^\infty P(A_n).
$$

4. $P(\Omega)=6/6=1$ です。

従って $(\Omega,\mathcal F,P)$ は確率空間です。
<!-- definition-example-end -->

---

## 2. 例：無限回コインを投げる標本空間

コインを無限回投げる結果を

$$
\omega=(\omega_1,\omega_2,\dots),
\qquad
\omega_i\in\{0,1\}
$$

と書くと、自然な標本空間は

$$
\Omega=\{0,1\}^{\mathbb N}
$$

です。

例えば「最初の3回が $1,0,1$」という集合は

$$
A=\{\omega:\omega_1=1,\omega_2=0,\omega_3=1\}
$$

です。有限個の座標だけを指定するこの種の集合を円柱集合と呼びます。

公平で独立なコイン投げを表す確率測度が構成されていれば

$$
P(A)=2^{-3}.
$$

無限列上の確率測度そのものの存在は自明ではありません。有限次元分布を整合的に指定したときに確率測度の存在を保証する一般定理がKolmogorov拡張定理です。この章ではその定理を使用せず、「無限個の確率変数を同時に置く」ときには確率空間の構成問題が背後にある、という点だけ確認します。

---

## 3. 確率変数は可測関数

<a id="def-f0-00p1-random-variable"></a>

<!-- formal-statement-start -->
> **定義（実数値確率変数）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の写像
>
> $$
> X:\Omega\to\mathbb R
> $$
>
> が、任意のBorel集合 $B\in\mathcal B(\mathbb R)$ に対して
>
> $$
> X^{-1}(B)\in\mathcal F
> $$
>
> を満たすとき、$X$ を実数値確率変数と呼びます。
<!-- formal-statement-end -->

可測性が必要なのは、値に関する事象へ確率を付けたいからです。

例えば

$$
\{X\le x\}
=X^{-1}(( -\infty,x])
$$

であり、この逆像が $\mathcal F$ に入って初めて $P(X\le x)$ を定義できます。

### 3.1 例：サイコロからBernoulli型の変数を作る

1.1節のサイコロ確率空間上で

$$
X(\omega)=\boldsymbol{1}_{\{5,6\}}(\omega)
$$

とします。

<!-- definition-example-start: def-f0-00p1-random-variable -->
**定義の確認**

$X$ が取る値は $0,1$ だけです。任意のBorel集合 $B$ に対して、逆像は

$$
X^{-1}(B)\in\{\varnothing,\{1,2,3,4\},\{5,6\},\Omega\}
$$

のいずれかです。これらは全て $\mathcal F=2^\Omega$ に属します。従って $X$ は確率変数です。
<!-- definition-example-end -->

---

## 4. 押し出し測度

<a id="def-f0-00p1-pushforward"></a>

<!-- formal-statement-start -->
> **定義（押し出し測度）**  
> 測度空間 $(\Omega,\mathcal F,P)$ と可測空間 $(S,\mathcal S)$、可測写像 $X:\Omega\to S$ に対して
>
> $$
> X_*P(B):=P(X^{-1}(B)),
> \qquad B\in\mathcal S
> $$
>
> と定めます。$X_*P$ を $P$ の $X$ による押し出し測度と呼びます。
<!-- formal-statement-end -->

### 4.1 例：3.1節の写像による押し出し

<!-- definition-example-start: def-f0-00p1-pushforward -->
**定義の確認**

$X^{-1}(\{1\})=\{5,6\}$、$X^{-1}(\{0\})=\{1,2,3,4\}$ なので

$$
X_*P(\{1\})=\frac13,
\qquad
X_*P(\{0\})=\frac23.
$$

確率は「値の集合 $B$」を直接測るのではなく、その集合へ写る元の事象 $X^{-1}(B)$ を測って決まります。
<!-- definition-example-end -->

<a id="thm-f0-00p1-pushforward-probability"></a>

<!-- formal-statement-start -->
> **定理（押し出しによる確率測度の構成）**  
> 確率空間 $(\Omega,\mathcal F,P)$、可測空間 $(S,\mathcal S)$、可測写像 $X:\Omega\to S$ に対して
>
> $$
> P_X(B):=P(X^{-1}(B)),
> \qquad B\in\mathcal S
> $$
>
> と定めると、$P_X$ は $(S,\mathcal S)$ 上の確率測度です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

確率測度であることを、非負性・空集合・可算加法性・全体の測度の順に確認します。

まず $P_X(B)=P(X^{-1}(B))\ge0$ です。また

$$
X^{-1}(\varnothing)=\varnothing
$$

なので $P_X(\varnothing)=0$ です。

次に $B_1,B_2,\ldots\in\mathcal S$ が互いに素だとします。逆像は和を保つので

$$
X^{-1}\left(\bigcup_{n=1}^\infty B_n\right)
=
\bigcup_{n=1}^\infty X^{-1}(B_n).
$$

さらに $m\ne n$ なら

$$
X^{-1}(B_m)\cap X^{-1}(B_n)
=
X^{-1}(B_m\cap B_n)
=X^{-1}(\varnothing)
=\varnothing,
$$

だから逆像も互いに素です。従って $P$ の可算加法性から

$$
\begin{aligned}
P_X\left(\bigcup_{n=1}^\infty B_n\right)
&=P\left(X^{-1}\left(\bigcup_{n=1}^\infty B_n\right)\right)\\
&=P\left(\bigcup_{n=1}^\infty X^{-1}(B_n)\right)\\
&=\sum_{n=1}^\infty P(X^{-1}(B_n))\\
&=\sum_{n=1}^\infty P_X(B_n).
\end{aligned}
$$

最後に

$$
X^{-1}(S)=\Omega
$$

なので

$$
P_X(S)=P(\Omega)=1.
$$

以上から $P_X$ は確率測度です。
<!-- proof-end -->

---

## 5. 分布は確率測度の押し出し

<a id="def-f0-00p1-law"></a>

<!-- formal-statement-start -->
> **定義（確率変数の分布）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の実数値確率変数 $X$ に対して
>
> $$
> P_X(B)=P(X\in B)=P(X^{-1}(B)),
> \qquad B\in\mathcal B(\mathbb R)
> $$
>
> で定まる $\mathbb R$ 上の確率測度 $P_X$ を $X$ の**分布**と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p1-law -->
### 5.1 例：異なる確率変数が同じ分布を持つ

**定義の確認**

公平なサイコロ $\Omega_1=\{1,\ldots,6\}$ 上で

$$
X=\boldsymbol{1}_{\{5,6\}}
$$

とし、別の標本空間 $\Omega_2=\{a,b,c\}$ 上で各点を確率 $1/3$ として

$$
Y(a)=Y(b)=0,
\qquad
Y(c)=1
$$

とします。すると

$$
P_X(\{0\})=P_Y(\{0\})=\frac23,
\qquad
P_X(\{1\})=P_Y(\{1\})=\frac13.
$$

両者は異なる確率空間上の異なる写像ですが、分布は同じです。
<!-- definition-example-end -->

この区別は重要です。確率変数は標本空間上の関数、分布は値空間上の確率測度です。

---

## 6. 累積分布関数は分布を半直線で読む

<a id="def-f0-00p1-cdf"></a>

<!-- formal-statement-start -->
> **定義（累積分布関数）**  
> 実数値確率変数 $X$ の分布を $P_X$ とします。関数
>
> $$
> F_X(x):=P(X\le x)=P_X(( -\infty,x])
> $$
>
> を $X$ の累積分布関数と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p1-cdf -->
### 6.1 例：Bernoulli型分布の累積分布関数

**定義の確認**

5.1節の $X$ では $P(X=0)=2/3$, $P(X=1)=1/3$ なので

$$
F_X(x)=
\begin{cases}
0, & x<0,\\
2/3, & 0\le x<1,\\
1, & x\ge1.
\end{cases}
$$

各 $x$ で実際に $P_X(( -\infty,x])$ を評価したものになっています。
<!-- definition-example-end -->

<a id="thm-f0-00p1-cdf-properties"></a>

<!-- formal-statement-start -->
> **定理（累積分布関数の基本性質）**  
> 実数値確率変数 $X$ の累積分布関数 $F_X$ は、単調非減少かつ右連続であり、
>
> $$
> \lim_{x\to-\infty}F_X(x)=0,
> \qquad
> \lim_{x\to\infty}F_X(x)=1
> $$
>
> を満たします。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x\le y$ なら

$$
(-\infty,x]\subset(-\infty,y]
$$

なので、確率測度の単調性から $F_X(x)\le F_X(y)$ です。

右連続性を示します。$x_n\downarrow x$ とすると

$$
(-\infty,x_n]\downarrow(-\infty,x].
$$

確率測度は有限測度なので上から連続であり、

$$
F_X(x_n)=P_X(( -\infty,x_n])\downarrow P_X(( -\infty,x])=F_X(x).
$$

次に $n\to\infty$ で

$$
(-\infty,n]\uparrow\mathbb R
$$

だから、測度の下からの連続性より

$$
F_X(n)\uparrow P_X(\mathbb R)=1.
$$

また

$$
(-\infty,-n]\downarrow\varnothing
$$

なので上からの連続性より

$$
F_X(-n)\downarrow0.
$$

単調性を合わせれば、実数 $x\to\pm\infty$ についても所望の極限が従います。
<!-- proof-end -->

逆に、単調非減少・右連続・両端極限 $0,1$ を満たす関数から確率測度を構成する定理もあります。これはLebesgue--Stieltjes測度の構成を使うため、この章では証明なしに使用しません。

---

## 7. 離散分布と連続分布

$X$ が可算個の値 $x_1,x_2,\dots$ だけを取り

$$
p_k=P(X=x_k)
$$

とすると

$$
P_X(B)=\sum_{k:x_k\in B}p_k.
$$

Dirac測度 $\delta_x$ を使えば

$$
P_X=\sum_kp_k\delta_{x_k}.
$$

このとき

$$
p_X(x)=P(X=x)
$$

を確率質量関数と呼びます。

一方、分布 $P_X$ がLebesgue測度 $\lambda$ に関して絶対連続なら、次章で扱うRadon--Nikodym定理により

$$
P_X(B)=\int_Bf_X(x)\,dx
$$

と書ける非負関数 $f_X$ が存在します。$f_X$ が確率密度関数です。

すべての分布が確率質量関数またはLebesgue密度を持つわけではありませんが、分布そのものと累積分布関数は常に定義できます。

---

## 8. 混合分布

例えば

$$
P_X=p\delta_0+(1-p)N(0,1),
\qquad 0<p<1
$$

とすれば、0に点質量を持つ部分と連続部分を同時に持つ分布になります。

この分布をLebesgue測度だけに対する一つの確率密度関数で表すことはできません。測度として書けば、離散部分と連続部分を同じ式の中で自然に扱えます。

---

## 9. 確率変数の関数も押し出しで考える

$Y=g(X)$ とします。$g:\mathbb R\to\mathbb R$ がBorel可測なら $Y$ も確率変数であり、任意の $B\in\mathcal B(\mathbb R)$ について

$$
\begin{aligned}
P_Y(B)
&=P(g(X)\in B)\\
&=P(X\in g^{-1}(B))\\
&=P_X(g^{-1}(B)).
\end{aligned}
$$

従って

$$
\boxed{P_Y=g_*P_X}.
$$

通常の変数変換公式や累積分布関数法は、この押し出し測度を具体的に計算する方法です。

---

## 10. 多変量確率変数

$d$ 次元確率ベクトル

$$
X=(X_1,\dots,X_d):\Omega\to\mathbb R^d
$$

は、$\mathbb R^d$ のBorel $\sigma$ 代数 $\mathcal B(\mathbb R^d)$ に関して可測な写像です。その同時分布は

$$
P_X(B)=P(X\in B),
\qquad
B\in\mathcal B(\mathbb R^d)
$$

で定まります。

各成分 $X_j$ の周辺分布は座標射影

$$
\pi_j(x_1,\dots,x_d)=x_j
$$

による押し出し

$$
P_{X_j}=(\pi_j)_*P_X
$$

です。

---

## 11. この章の全体像

$$
\boxed{
(\Omega,\mathcal F,P)
\xrightarrow{\text{可測写像 }X}
(\mathbb R,\mathcal B(\mathbb R),P_X)
}
$$

確率変数は標本空間上の関数であり、分布はその関数を通して確率測度を値空間へ押し出したものです。この区別を押さえると、累積分布関数・離散分布・連続分布・変数変換・周辺分布が同じ構造の中に収まります。

---

## 演習

### F0-00P1-A01 サイコロの押し出し分布

- Level: A
- 目安時間: 10分

公平なサイコロ1回の確率空間で $X(\omega)=\boldsymbol{1}_{\{5,6\}}(\omega)$ とする。$X^{-1}(\{0\})$, $X^{-1}(\{1\})$ を求め、$P_X$ を書け。

<!-- solution-start -->
#### 詳細解答

$$
X^{-1}(\{1\})=\{5,6\},
\qquad
X^{-1}(\{0\})=\{1,2,3,4\}.
$$

従って押し出しの定義から

$$
P_X(\{1\})=\frac26=\frac13,
\qquad
P_X(\{0\})=\frac46=\frac23.
$$

したがって

$$
P_X=\frac23\delta_0+\frac13\delta_1.
$$
<!-- solution-end -->

### F0-00P1-A02 指示関数の可測性

- Level: A
- 目安時間: 10分

可測空間 $(\Omega,\mathcal F)$ と $A\in\mathcal F$ に対し、$X=\boldsymbol{1}_A$ が実数値可測関数であることを示せ。

<!-- solution-start -->
#### 詳細解答

$X$ の値は $0,1$ だけなので、任意のBorel集合 $B$ に対する逆像は

$$
X^{-1}(B)\in\{\varnothing,A,A^c,\Omega\}
$$

のいずれかです。$A\in\mathcal F$ かつ $\mathcal F$ は補集合に閉じているので $A^c\in\mathcal F$、また $\varnothing,\Omega\in\mathcal F$ です。従って全てのBorel集合 $B$ について $X^{-1}(B)\in\mathcal F$ であり、$X$ は可測です。
<!-- solution-end -->

### F0-00P1-A03 累積分布関数を作る

- Level: A
- 目安時間: 10分

$P(X=-1)=1/4$, $P(X=2)=3/4$ とする。$F_X(x)$ を場合分けして求めよ。

<!-- solution-start -->
#### 詳細解答

$x<-1$ では $\{X\le x\}=\varnothing$、$-1\le x<2$ では $\{X\le x\}=\{X=-1\}$、$x\ge2$ では全事象です。従って

$$
F_X(x)=
\begin{cases}
0, & x<-1,\\
1/4, & -1\le x<2,\\
1, & x\ge2.
\end{cases}
$$
<!-- solution-end -->

### F0-00P1-A04 同じ分布を持つ別の確率変数

- Level: A
- 目安時間: 10分

公平なサイコロ $D$ に対し $X=\boldsymbol{1}_{\{D\text{ は偶数}\}}$ とする。また公平なコイン $C\in\{0,1\}$ に対し $Y=C$ とする。$X$ と $Y$ が同じ分布を持つことを確認せよ。

<!-- solution-start -->
#### 詳細解答

サイコロでは偶数が3個、奇数が3個なので

$$
P(X=1)=P(X=0)=\frac12.
$$

公平なコインについても

$$
P(Y=1)=P(Y=0)=\frac12.
$$

従って任意のBorel集合 $B$ に対して、$B$ が $0,1$ を含むかどうかだけで $P_X(B)$ と $P_Y(B)$ は同じ値になり、$P_X=P_Y$ です。
<!-- solution-end -->

### F0-00P1-B01 押し出しが確率測度になることを証明する

- Level: B
- 目安時間: 15分

確率空間 $(\Omega,\mathcal F,P)$、可測空間 $(S,\mathcal S)$、可測写像 $X:\Omega\to S$ に対して $P_X(B)=P(X^{-1}(B))$ と定める。$P_X$ が確率測度であることを、可算加法性を含めて示せ。

<!-- solution-start -->
#### 詳細解答

非負性は $P$ の非負性から従います。互いに素な $B_n\in\mathcal S$ に対し

$$
X^{-1}\left(\bigcup_nB_n\right)=\bigcup_nX^{-1}(B_n)
$$

であり、$X^{-1}(B_n)$ も互いに素です。よって

$$
\begin{aligned}
P_X\left(\bigcup_nB_n\right)
&=P\left(\bigcup_nX^{-1}(B_n)\right)\\
&=\sum_nP(X^{-1}(B_n))\\
&=\sum_nP_X(B_n).
\end{aligned}
$$

さらに $X^{-1}(S)=\Omega$ なので $P_X(S)=P(\Omega)=1$。従って $P_X$ は確率測度です。
<!-- solution-end -->

### F0-00P1-B02 累積分布関数の右連続性

- Level: B
- 目安時間: 15分

実数値確率変数 $X$ の累積分布関数 $F_X(x)=P(X\le x)$ が右連続であることを、確率測度の上からの連続性を使って示せ。

<!-- solution-start -->
#### 詳細解答

任意の $x\in\mathbb R$ と $x_n\downarrow x$ を取ります。このとき

$$
A_n:=\{X\le x_n\}
$$

は単調減少し、

$$
\bigcap_{n=1}^\infty A_n=\{X\le x\}
$$

です。確率測度では $P(A_1)\le1<\infty$ なので上からの連続性を使えて

$$
F_X(x_n)=P(A_n)\downarrow P\left(\bigcap_nA_n\right)=P(X\le x)=F_X(x).
$$

従って $F_X$ は右連続です。
<!-- solution-end -->

### F0-00P1-B03 混合分布を測度で読む

- Level: B
- 目安時間: 15分

$0<p<1$ とし

$$
P_X=p\delta_0+(1-p)N(0,1)
$$

とする。$P(X=0)$ を求め、この分布がLebesgue測度に関して絶対連続でないことを示せ。

<!-- solution-start -->
#### 詳細解答

標準正規分布は一点集合に確率0を与えるので

$$
P(X=0)=p\delta_0(\{0\})+(1-p)N(0,1)(\{0\})=p.
$$

一方、Lebesgue測度 $\lambda$ について $\lambda(\{0\})=0$ ですが $P_X(\{0\})=p>0$ です。したがって

$$
P_X\not\ll\lambda.
$$

よってLebesgue測度に関する一つの確率密度関数だけではこの分布全体を表せません。
<!-- solution-end -->

### F0-00P1-C01 確率空間・可測性・分布を一続きで確認する

- Level: C
- 目安時間: 25分

$\Omega=\{1,2,3,4\}$、$\mathcal F=2^\Omega$ とし

$$
P(\{1\})=\frac18,
\quad
P(\{2\})=\frac18,
\quad
P(\{3\})=\frac14,
\quad
P(\{4\})=\frac12
$$

とする。$X:\Omega\to\mathbb R$ を

$$
X(1)=X(2)=0,
\qquad
X(3)=1,
\qquad
X(4)=2
$$

で定める。

1. $(\Omega,\mathcal F,P)$ が確率空間であることを確認せよ。
2. $X$ が確率変数であることを示せ。
3. 分布 $P_X$ をDirac測度の和で表せ。
4. 累積分布関数 $F_X$ を求めよ。
5. $Y=\boldsymbol{1}_{\{X\ge1\}}$ の分布を求めよ。

<!-- solution-start -->
#### 詳細解答

**1. 確率空間**  
各点の確率は非負で、全確率は

$$
\frac18+\frac18+\frac14+\frac12=1.
$$

有限集合上で $P(A)$ を点確率の和として定めれば可算加法性も成り立つので、これは確率空間です。

**2. 可測性**  
$\mathcal F=2^\Omega$ なので任意の部分集合が可測です。従って任意のBorel集合 $B$ に対して $X^{-1}(B)\subseteq\Omega$ は自動的に $\mathcal F$ に入り、$X$ は可測です。

**3. 分布**  

$$
P(X=0)=\frac14,
\qquad
P(X=1)=\frac14,
\qquad
P(X=2)=\frac12.
$$

従って

$$
P_X=\frac14\delta_0+\frac14\delta_1+\frac12\delta_2.
$$

**4. 累積分布関数**

$$
F_X(x)=
\begin{cases}
0, & x<0,\\
1/4, & 0\le x<1,\\
1/2, & 1\le x<2,\\
1, & x\ge2.
\end{cases}
$$

**5. $Y$ の分布**  
$Y=1$ は $X\ge1$ と同値なので

$$
P(Y=1)=P(X=1)+P(X=2)=\frac14+\frac12=\frac34.
$$

従って

$$
P_Y=\frac14\delta_0+\frac34\delta_1.
$$
<!-- solution-end -->

---

## 次に進む

分布を確率測度として構成できたので、次は [F0-00P2](../F0_00P2_密度_期待値_Radon_Nikodym/index.md) で、確率質量関数と確率密度関数を基準測度に対するRadon--Nikodym微分として統一します。
