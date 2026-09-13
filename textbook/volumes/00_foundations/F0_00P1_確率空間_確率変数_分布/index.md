# F0-00P1 確率空間・確率変数・分布：分布はどこから来た？

<!-- definition-example-audit: strict -->

[F0-00D2](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md) までで、測度空間・可測関数・Lebesgue積分を準備しました。確率論では、その一般論に

$$
P(\Omega)=1
$$

という正規化を加えます。

この章では

$$
\text{確率空間}
\longrightarrow
\text{確率変数}
\longrightarrow
\text{押し出し測度}
\longrightarrow
\text{分布}
\longrightarrow
\text{累積分布関数}
$$

という一本の流れを作ります。

---

## 1. 確率空間

<a id="def-f0-00p1-probability-space"></a>

<!-- formal-statement-start -->
> **定義（確率空間）**  
> 集合 $\Omega$、$\Omega$ 上の $\sigma$ 代数 $\mathcal F$、$\mathcal F$ 上の測度 $P$ の三つ組 $(\Omega,\mathcal F,P)$ が

$$
P(\Omega)=1
$$

> を満たすとき、これを**確率空間**と呼びます。$\Omega$ を標本空間、$\mathcal F$ の元を事象、$P$ を確率測度と呼びます。
<!-- formal-statement-end -->

有限標本空間では、しばしば $\mathcal F=2^\Omega$ として全ての部分集合を事象にします。

無限集合でも冪集合全体に確率測度を定義できる場合はあります。問題は、例えば「区間の長さと一致する」「平行移動で長さが変わらない」といった望ましい性質を持つ測度を、全ての部分集合へ拡張できるとは限らないことです。そのため一般論では、最初から測りたい集合族を $\sigma$ 代数として指定します。

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

1. $\mathcal F=2^\Omega$ は $\varnothing$ を含み、補集合と可算和に閉じるので $\sigma$ 代数です。
2. $P(A)\ge0$ です。
3. 互いに素な $A_1,A_2,\ldots\in\mathcal F$ に対して、有限集合 $\Omega$ の中で非空な $A_n$ は有限個しかないので

$$
P\left(\bigcup_{n=1}^{\infty}A_n\right)
=\frac{\left|\bigcup_nA_n\right|}{6}
=\sum_{n=1}^{\infty}\frac{|A_n|}{6}
=\sum_{n=1}^{\infty}P(A_n).
$$

4. $P(\Omega)=6/6=1$ です。

従って $(\Omega,\mathcal F,P)$ は確率空間です。
<!-- definition-example-end -->

---

## 2. 無限回コイン投げでは何が増えるか

コインを無限回投げる結果を

$$
\omega=(\omega_1,\omega_2,\ldots),
\qquad
\omega_i\in\{0,1\}
$$

と書くと、自然な標本空間は

$$
\Omega=\{0,1\}^{\mathbb N}
$$

です。「最初の3回が $1,0,1$」という集合は

$$
A=\{\omega:\omega_1=1,\omega_2=0,\omega_3=1\}
$$

です。有限個の座標だけを指定するこの種の集合を円柱集合と呼びます。

公平で独立なコイン投げを表す確率測度が構成されていれば

$$
P(A)=2^{-3}
$$

です。

ただし「無限個の確率変数を同時に置く」とき、対応する確率空間の存在は自動ではありません。有限個の座標に関する分布を互いに矛盾しないよう指定したとき、無限列上の確率測度の存在を保証する一般結果がKolmogorov拡張定理です。この章ではその定理を使用せず、無限列の背後にも測度の構成問題があることだけ確認します。

---

## 3. 確率変数は可測関数

<a id="def-f0-00p1-random-variable"></a>

<!-- formal-statement-start -->
> **定義（実数値確率変数）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の写像 $X:\Omega\to\mathbb R$ が、任意のBorel集合 $B\in\mathcal B(\mathbb R)$ に対して

$$
X^{-1}(B)\in\mathcal F
$$

> を満たすとき、$X$ を**実数値確率変数**と呼びます。
<!-- formal-statement-end -->

なぜ可測性を要求するのでしょうか。例えば

$$
\{X\le x\}=X^{-1}(( -\infty,x])
$$

です。この集合が $\mathcal F$ に入って初めて

$$
P(X\le x)
$$

を定義できます。可測性は「値に関する問いを、確率を付けられる事象へ戻せる」ための条件です。

### 3.1 例：サイコロを0と1へまとめる

1.1節のサイコロ確率空間上で

$$
X(\omega)=\boldsymbol{1}_{\{5,6\}}(\omega)
$$

とします。

<!-- definition-example-start: def-f0-00p1-random-variable -->
**定義の確認**

$X$ が取る値は $0,1$ だけです。任意のBorel集合 $B$ に対し、逆像は

$$
X^{-1}(B)\in
\{\varnothing,\{1,2,3,4\},\{5,6\},\Omega\}
$$

のいずれかです。これらは全て $\mathcal F=2^\Omega$ に属するので、$X$ は可測です。
<!-- definition-example-end -->

---

## 4. 押し出し測度

<a id="def-f0-00p1-pushforward"></a>

<!-- formal-statement-start -->
> **定義（押し出し測度）**  
> 測度空間 $(\Omega,\mathcal F,P)$、可測空間 $(S,\mathcal S)$、可測写像 $X:\Omega\to S$ に対し

$$
X_*P(B):=P(X^{-1}(B)),
\qquad B\in\mathcal S
$$

> と定めます。$X_*P$ を $P$ の $X$ による**押し出し測度**と呼びます。
<!-- formal-statement-end -->

### 4.1 例：サイコロの確率を $\{0,1\}$ へ運ぶ

<!-- definition-example-start: def-f0-00p1-pushforward -->
**定義の確認**

3.1節の $X$ では

$$
X^{-1}(\{1\})=\{5,6\},
\qquad
X^{-1}(\{0\})=\{1,2,3,4\}.
$$

したがって

$$
X_*P(\{1\})=\frac13,
\qquad
X_*P(\{0\})=\frac23.
$$

値の集合を直接測るのではなく、その集合へ写る元の事象を測っていることが分かります。
<!-- definition-example-end -->

<a id="thm-f0-00p1-pushforward-probability"></a>

<!-- formal-statement-start -->
> **定理（押し出しによる確率測度の構成）**  
> 確率空間 $(\Omega,\mathcal F,P)$、可測空間 $(S,\mathcal S)$、可測写像 $X:\Omega\to S$ に対して

$$
P_X(B):=P(X^{-1}(B)),
\qquad B\in\mathcal S
$$

> と定めると、$P_X$ は $(S,\mathcal S)$ 上の確率測度です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
P_X(B)=P(X^{-1}(B))\ge0,
\qquad
P_X(\varnothing)=P(\varnothing)=0.
$$

次に $B_1,B_2,\ldots\in\mathcal S$ が互いに素だとします。逆像は和集合を保つので

$$
X^{-1}\left(\bigcup_{n=1}^{\infty}B_n\right)
=
\bigcup_{n=1}^{\infty}X^{-1}(B_n).
$$

また $m\ne n$ なら

$$
X^{-1}(B_m)\cap X^{-1}(B_n)
=X^{-1}(B_m\cap B_n)
=\varnothing,
$$

したがって逆像も互いに素です。$P$ の可算加法性から

$$
\begin{aligned}
P_X\left(\bigcup_{n=1}^{\infty}B_n\right)
&=P\left(\bigcup_{n=1}^{\infty}X^{-1}(B_n)\right)\\
&=\sum_{n=1}^{\infty}P(X^{-1}(B_n))\\
&=\sum_{n=1}^{\infty}P_X(B_n).
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

以上で $P_X$ は確率測度です。
<!-- proof-end -->

---

## 5. 確率変数の分布

<a id="def-f0-00p1-law"></a>

<!-- formal-statement-start -->
> **定義（確率変数の分布）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の実数値確率変数 $X$ に対して

$$
P_X(B):=P(X\in B)=P(X^{-1}(B)),
\qquad B\in\mathcal B(\mathbb R)
$$

> で定まる $\mathbb R$ 上の確率測度 $P_X$ を、$X$ の**分布**またはlawと呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p1-law -->
### 5.1 例：違う確率変数が同じ分布を持つ

**定義の確認**

公平なサイコロ $D$ に対して

$$
X=\boldsymbol{1}_{\{D\ge5\}}
$$

とします。別の標本空間 $\{a,b,c\}$ で各点の確率を $1/3$ とし

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

$X$ と $Y$ は別の標本空間上の別の関数ですが、同じ分布を持ちます。
<!-- definition-example-end -->

この区別は重要です。確率変数は標本空間上の関数であり、分布は値空間上の確率測度です。

---

## 6. 累積分布関数

<a id="def-f0-00p1-cdf"></a>

<!-- formal-statement-start -->
> **定義（累積分布関数）**  
> 実数値確率変数 $X$ の分布を $P_X$ とします。関数

$$
F_X(x):=P(X\le x)=P_X(( -\infty,x])
$$

> を $X$ の**累積分布関数**と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p1-cdf -->
### 6.1 例：二点分布

**定義の確認**

$P(X=0)=2/3$, $P(X=1)=1/3$ なら

$$
F_X(x)=
\begin{cases}
0, & x<0,\\
2/3, & 0\le x<1,\\
1, & x\ge1.
\end{cases}
$$

例えば $0\le x<1$ では

$$
(-\infty,x]\cap\{0,1\}=\{0\}
$$

なので $F_X(x)=P(X=0)=2/3$ です。各区間で定義 $P_X(( -\infty,x])$ をそのまま評価しています。
<!-- definition-example-end -->

<a id="thm-f0-00p1-cdf-properties"></a>

<!-- formal-statement-start -->
> **定理（累積分布関数の基本性質）**  
> 実数値確率変数 $X$ の累積分布関数 $F_X$ は単調非減少かつ右連続であり、

$$
\lim_{x\to-\infty}F_X(x)=0,
\qquad
\lim_{x\to\infty}F_X(x)=1
$$

> を満たします。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**単調性。** $x\le y$ なら

$$
(-\infty,x]\subseteq(-\infty,y]
$$

なので、[測度の単調性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#prop-f0-00d2-02)から

$$
F_X(x)\le F_X(y).
$$

**右連続性。** $x_n\downarrow x$ とし

$$
A_n:=(-\infty,x_n],
\qquad
A:=(-\infty,x]
$$

と置きます。$A_n\downarrow A$ です。減少列を、既出の[下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)で扱える増加列へ変えます。

$$
B_n:=A_1\setminus A_n.
$$

すると

$$
B_n\uparrow A_1\setminus A.
$$

[測度の下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)より

$$
P_X(B_n)\uparrow P_X(A_1\setminus A).
$$

また $P_X(A_1)\le1<\infty$ なので

$$
P_X(A_n)=P_X(A_1)-P_X(B_n).
$$

従って

$$
F_X(x_n)=P_X(A_n)
\longrightarrow
P_X(A_1)-P_X(A_1\setminus A)
=P_X(A)=F_X(x).
$$

**$+\infty$ 側。**

$$
(-\infty,n]\uparrow\mathbb R
$$

なので[下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)より

$$
F_X(n)=P_X(( -\infty,n])\uparrow P_X(\mathbb R)=1.
$$

単調性から $x\to\infty$ でも $F_X(x)\to1$ です。

**$-\infty$ 側。** $A_n:=(-\infty,-n]$ と置きます。$A_n\downarrow\varnothing$ です。先ほどと同様に

$$
B_n:=A_1\setminus A_n\uparrow A_1
$$

とすると、[下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)から

$$
P_X(B_n)\uparrow P_X(A_1).
$$

従って

$$
F_X(-n)=P_X(A_n)
=P_X(A_1)-P_X(B_n)
\longrightarrow0.
$$

単調性を合わせて $x\to-\infty$ でも $F_X(x)\to0$ です。
<!-- proof-end -->

逆に、単調非減少・右連続・両端極限 $0,1$ を満たす関数から実数上の確率測度を構成することもできます。その逆向きはLebesgue--Stieltjes測度の構成を必要とするため、この章では使用しません。

---

## 7. 離散・連続・混合を測度として見る

$X$ が可算個の値 $x_1,x_2,\ldots$ だけを取り

$$
p_k:=P(X=x_k)
$$

とすると

$$
P_X=\sum_kp_k\delta_{x_k}.
$$

このとき

$$
p_X(x):=P(X=x)
$$

を確率質量関数と呼びます。

一方、分布 $P_X$ がLebesgue測度 $\lambda$ に関して絶対連続なら、次章の[Radon--Nikodym定理](../F0_00P2_密度_期待値_Radon_Nikodym/index.md#thm-f0-00p2-radon-nikodym)により

$$
P_X(B)=\int_Bf_X(x)\,dx
$$

と書ける非負関数 $f_X$ が存在します。これが確率密度関数です。

例えば

$$
P_X=p\delta_0+(1-p)N(0,1),
\qquad 0<p<1
$$

は、0の点質量と連続部分を同時に持つ混合分布です。Lebesgue測度に対する一つの確率密度関数だけでは全体を表せませんが、測度の和なら自然に表せます。

---

## 8. 確率変数を変換すると分布も押し出される

$Y=g(X)$ とし、$g:\mathbb R\to\mathbb R$ をBorel可測とします。任意の $B\in\mathcal B(\mathbb R)$ について

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
P_Y=g_*P_X.
$$

通常の変数変換公式や累積分布関数法は、この一般原理を具体的に計算する方法です。

---

## 9. 同時分布と周辺分布

$d$ 個の確率変数をまとめた

$$
X=(X_1,\ldots,X_d):\Omega\to\mathbb R^d
$$

がBorel可測なら、その同時分布は

$$
P_X(B)=P(X\in B),
\qquad
B\in\mathcal B(\mathbb R^d)
$$

で定まります。

座標射影

$$
\pi_j(x_1,\ldots,x_d)=x_j
$$

を使えば $j$ 番目の周辺分布は

$$
P_{X_j}=(\pi_j)_*P_X
$$

です。「同時分布から周辺分布を取る」操作も押し出しです。

---

## 10. この章の見取り図

$$
\boxed{
(\Omega,\mathcal F,P)
\xrightarrow{\text{可測写像 }X}
(\mathbb R,\mathcal B(\mathbb R),P_X)
}
$$

確率変数は標本空間上の関数、分布はその関数を通して値空間へ運ばれた確率測度です。この区別を押さえると、累積分布関数・離散分布・連続分布・変数変換・周辺分布が同じ構造の中に収まります。

---

## 演習

### F0-00P1-A01 サイコロの押し出し分布

- Level: A
- 目安時間: 10分

公平なサイコロ $D$ に対して

$$
X=\boldsymbol{1}_{\{D\ge5\}}
$$

とする。$X^{-1}(\{0\})$, $X^{-1}(\{1\})$ を求め、$P_X$ をDirac測度の和で表せ。

<!-- solution-start -->
#### 詳細解答

$$
X^{-1}(\{1\})=\{5,6\},
\qquad
X^{-1}(\{0\})=\{1,2,3,4\}.
$$

従って

$$
P_X(\{1\})=\frac26=\frac13,
\qquad
P_X(\{0\})=\frac46=\frac23.
$$

よって

$$
P_X=\frac23\delta_0+\frac13\delta_1.
$$
<!-- solution-end -->

### F0-00P1-A02 指示関数の可測性

- Level: A
- 目安時間: 10分

可測空間 $(\Omega,\mathcal F)$ と $A\in\mathcal F$ に対して、$X=\boldsymbol{1}_A$ が実数値可測関数であることを示せ。

<!-- solution-start -->
#### 詳細解答

$X$ の値は $0,1$ だけです。任意のBorel集合 $B$ に対して

$$
X^{-1}(B)\in\{\varnothing,A,A^c,\Omega\}
$$

のいずれかです。$A\in\mathcal F$ であり、$\mathcal F$ は補集合に閉じるので $A^c\in\mathcal F$、また $\varnothing,\Omega\in\mathcal F$ です。従って全てのBorel集合 $B$ で $X^{-1}(B)\in\mathcal F$ となり、$X$ は可測です。
<!-- solution-end -->

### F0-00P1-A03 累積分布関数を作る

- Level: A
- 目安時間: 10分

$$
P(X=-1)=\frac14,
\qquad
P(X=2)=\frac34
$$

とする。累積分布関数 $F_X$ を場合分けして求めよ。

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

公平なサイコロ $D$ に対して

$$
X=\boldsymbol{1}_{\{D\text{ は偶数}\}}
$$

とする。また公平なコイン $C\in\{0,1\}$ に対して $Y=C$ とする。$X$ と $Y$ が同じ分布を持つことを確認せよ。

<!-- solution-start -->
#### 詳細解答

サイコロでは偶数が3個、奇数が3個なので

$$
P(X=0)=P(X=1)=\frac12.
$$

公平なコインについても

$$
P(Y=0)=P(Y=1)=\frac12.
$$

$X,Y$ はどちらも $0,1$ 以外を取らないので、任意のBorel集合 $B$ に対する確率は $B$ が $0,1$ を含むかどうかだけで決まり、$P_X(B)=P_Y(B)$ です。従って $P_X=P_Y$ です。
<!-- solution-end -->

### F0-00P1-B01 押し出しが確率測度になることを示す

- Level: B
- 目安時間: 15分

確率空間 $(\Omega,\mathcal F,P)$、可測空間 $(S,\mathcal S)$、可測写像 $X:\Omega\to S$ に対して

$$
P_X(B)=P(X^{-1}(B))
$$

と定める。$P_X$ の可算加法性と $P_X(S)=1$ を示せ。

<!-- solution-start -->
#### 詳細解答

互いに素な $B_n\in\mathcal S$ に対し

$$
X^{-1}\left(\bigcup_nB_n\right)=\bigcup_nX^{-1}(B_n)
$$

であり、$X^{-1}(B_n)$ も互いに素です。従って

$$
\begin{aligned}
P_X\left(\bigcup_nB_n\right)
&=P\left(\bigcup_nX^{-1}(B_n)\right)\\
&=\sum_nP(X^{-1}(B_n))\\
&=\sum_nP_X(B_n).
\end{aligned}
$$

また $X^{-1}(S)=\Omega$ なので

$$
P_X(S)=P(\Omega)=1.
$$

よって $P_X$ は確率測度です。
<!-- solution-end -->

### F0-00P1-B02 累積分布関数の右連続性

- Level: B
- 目安時間: 15分

実数値確率変数 $X$ の累積分布関数 $F_X(x)=P(X\le x)$ が右連続であることを、[測度の下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)を使って示せ。

<!-- solution-start -->
#### 詳細解答

$x_n\downarrow x$ とし

$$
A_n:=\{X\le x_n\},
\qquad
A:=\{X\le x\}
$$

と置きます。$A_n\downarrow A$ です。

$$
B_n:=A_1\setminus A_n
$$

と置けば

$$
B_n\uparrow A_1\setminus A.
$$

[下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)より

$$
P(B_n)\uparrow P(A_1\setminus A).
$$

また $P(A_1)<\infty$ なので

$$
P(A_n)=P(A_1)-P(B_n)
\longrightarrow
P(A_1)-P(A_1\setminus A)=P(A).
$$

従って

$$
F_X(x_n)\to F_X(x),
$$

すなわち $F_X$ は右連続です。
<!-- solution-end -->

### F0-00P1-B03 混合分布を測度で読む

- Level: B
- 目安時間: 15分

$0<p<1$ とし

$$
P_X=p\delta_0+(1-p)N(0,1)
$$

とする。$P(X=0)$ を求め、この分布がLebesgue測度 $\lambda$ に関して絶対連続でないことを示せ。

<!-- solution-start -->
#### 詳細解答

標準正規分布は一点集合に確率0を与えるので

$$
P(X=0)
=p\delta_0(\{0\})+(1-p)N(0,1)(\{0\})
=p.
$$

一方

$$
\lambda(\{0\})=0,
\qquad
P_X(\{0\})=p>0.
$$

したがって

$$
P_X\not\ll\lambda.
$$
<!-- solution-end -->

### F0-00P1-C01 確率空間から変換後の分布まで

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
P(\{4\})=\frac12.
$$

さらに

$$
X(1)=X(2)=0,
\qquad
X(3)=1,
\qquad
X(4)=2
$$

とする。

1. $(\Omega,\mathcal F,P)$ が確率空間であることを確認せよ。
2. $X$ が確率変数であることを示せ。
3. $P_X$ をDirac測度の和で表せ。
4. $F_X$ を求めよ。
5. $Y=\boldsymbol{1}_{\{X\ge1\}}$ の分布を求めよ。

<!-- solution-start -->
#### 詳細解答

**1. 確率空間。** 各点の確率は非負で

$$
\frac18+\frac18+\frac14+\frac12=1.
$$

有限集合上で $P(A)$ を点確率の和として定めれば、互いに素な集合の和に対して点確率が重複なく足されるので可算加法性も成り立ちます。従って確率空間です。

**2. 可測性。** $\mathcal F=2^\Omega$ なので任意の部分集合が可測です。従って任意のBorel集合 $B$ について $X^{-1}(B)\subseteq\Omega$ は $\mathcal F$ に入り、$X$ は可測です。

**3. 分布。**

$$
P(X=0)=\frac14,
\qquad
P(X=1)=\frac14,
\qquad
P(X=2)=\frac12.
$$

よって

$$
P_X=\frac14\delta_0+\frac14\delta_1+\frac12\delta_2.
$$

**4. 累積分布関数。**

$$
F_X(x)=
\begin{cases}
0, & x<0,\\
1/4, & 0\le x<1,\\
1/2, & 1\le x<2,\\
1, & x\ge2.
\end{cases}
$$

**5. 変換後の分布。** $Y=1$ は $X\ge1$ と同値なので

$$
P(Y=1)=\frac14+\frac12=\frac34,
\qquad
P(Y=0)=\frac14.
$$

従って

$$
P_Y=\frac14\delta_0+\frac34\delta_1.
$$
<!-- solution-end -->

---

## 次に進む

分布を確率測度として構成できたので、次は [F0-00P2](../F0_00P2_密度_期待値_Radon_Nikodym/index.md) で、確率質量関数と確率密度関数を基準測度に対する密度として統一します。