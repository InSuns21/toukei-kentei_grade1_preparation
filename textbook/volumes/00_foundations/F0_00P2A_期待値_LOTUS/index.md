# F0-00P2A 期待値・LOTUS：確率空間から分布上の積分へ

<!-- definition-example-audit: strict -->

[P2](../F0_00P2_密度_期待値_Radon_Nikodym/index.md) では、分布の密度を基準測度に対するRadon--Nikodym微分として統一しました。次に期待値をLebesgue積分として定義し、

$$
\int_\Omega g(X(\omega))\,dP(\omega)
=
\int_{\mathbb R}g(x)\,dP_X(x)
$$

という**押し出し積分公式**を証明します。離散和と連続積分は、この一つの公式の特殊形です。

---

## 1. 期待値は確率測度に関する積分

<a id="def-f0-00p2a-expectation"></a>

<!-- formal-statement-start -->
> **定義（期待値）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の実数値確率変数 $X$ が可積分、すなわち
>
> $$
> \int_\Omega|X|\,dP<\infty
> $$
>
> を満たすとき、$X$ の期待値を
>
> $$
> E[X]:=\int_\Omega X\,dP
> $$
>
> と定義します。$X\ge0$ の場合は、積分値が $+\infty$ でも拡張実数値として $E[X]=\int X\,dP$ と書きます。
<!-- formal-statement-end -->

### 1.1 例：Bernoulli変数の期待値

$P(X=1)=p$, $P(X=0)=1-p$ とします。

<!-- definition-example-start: def-f0-00p2a-expectation -->
**定義の確認**

$|X|\le1$ なので

$$
E[|X|]\le1<\infty,
$$

従って $X$ は可積分です。分布は

$$
P_X=(1-p)\delta_0+p\delta_1
$$

なので、標本空間上の積分としても

$$
E[X]
=0\cdot P(X=0)+1\cdot P(X=1)
=p
$$

となります。
<!-- definition-example-end -->

より一般に、Borel可測関数 $g:\mathbb R\to\mathbb R$ に対して $g(X)$ が可積分なら

$$
E[g(X)]:=\int_\Omega g(X(\omega))\,dP(\omega)
$$

と定義します。$g(X)\ge0$ なら $+\infty$ を許して同じ記法を使います。

---

## 2. 押し出し積分公式（LOTUS）

<a id="thm-f0-00p2a-lotus"></a>

<!-- formal-statement-start -->
> **定理（押し出し積分公式）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の実数値確率変数 $X$ の分布を
>
> $$
> P_X(B)=P(X\in B),
> \qquad B\in\mathcal B(\mathbb R)
> $$
>
> とします。Borel可測関数 $g:\mathbb R\to\mathbb R$ が非負、または $g(X)$ が可積分なら
>
> $$
> \boxed{
> \int_\Omega g(X(\omega))\,dP(\omega)
> =
> \int_{\mathbb R}g(x)\,dP_X(x)
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

この公式をLOTUS（law of the unconscious statistician）と呼ぶことがあります。名前は独特ですが、内容は「$g(X)$ の分布を先に求めなくても、$X$ の分布に対して $g$ を積分すればよい」というものです。

<!-- proof-start -->
### 2.1 証明：指示関数から一般の可測関数へ

証明はLebesgue積分の構成と同じ順序で進めます。

#### Step 1：指示関数

Borel集合 $B\in\mathcal B(\mathbb R)$ に対して

$$
g=\boldsymbol{1}_B
$$

とします。すると

$$
\boldsymbol{1}_B(X(\omega))
=
\boldsymbol{1}_{X^{-1}(B)}(\omega)
$$

なので

$$
\begin{aligned}
\int_\Omega\boldsymbol{1}_B(X(\omega))\,dP(\omega)
&=P(X^{-1}(B))\\
&=P_X(B)\\
&=\int_{\mathbb R}\boldsymbol{1}_B(x)\,dP_X(x).
\end{aligned}
$$

ここは押し出し測度の定義そのものです。

#### Step 2：非負単関数

非負単関数

$$
s(x)=\sum_{j=1}^m a_j\boldsymbol{1}_{B_j}(x),
\qquad a_j\ge0
$$

を取ります。積分の有限線形性とStep 1から

$$
\begin{aligned}
\int_\Omega s(X)\,dP
&=\sum_{j=1}^ma_j\int_\Omega\boldsymbol{1}_{B_j}(X)\,dP\\
&=\sum_{j=1}^ma_jP_X(B_j)\\
&=\int_{\mathbb R}s\,dP_X.
\end{aligned}
$$

#### Step 3：非負Borel可測関数

$g\ge0$ をBorel可測とします。Lebesgue積分の構成から、非負単関数列 $(s_n)$ で

$$
0\le s_n\uparrow g
$$

となるものを取れます。合成して

$$
0\le s_n(X)\uparrow g(X).
$$

単調収束定理を $P$ と $P_X$ の両方に適用すると

$$
\begin{aligned}
\int_\Omega g(X)\,dP
&=\lim_{n\to\infty}\int_\Omega s_n(X)\,dP\\
&=\lim_{n\to\infty}\int_{\mathbb R}s_n\,dP_X\\
&=\int_{\mathbb R}g\,dP_X.
\end{aligned}
$$

#### Step 4：可積分な実数値関数

一般の実数値 $g$ について

$$
g=g^+-g^-,
\qquad
|g|=g^++g^-
$$

と分解します。まずStep 3を $|g|$ に適用すると

$$
\int_{\mathbb R}|g|\,dP_X
=
\int_\Omega|g(X)|\,dP.
$$

したがって $g(X)$ が可積分なら、右辺が有限なので $g$ も $P_X$ に関して可積分です。Step 3を $g^+$ と $g^-$ に適用して

$$
\begin{aligned}
\int_\Omega g(X)\,dP
&=\int_\Omega g^+(X)\,dP-\int_\Omega g^-(X)\,dP\\
&=\int_{\mathbb R}g^+\,dP_X-\int_{\mathbb R}g^-\,dP_X\\
&=\int_{\mathbb R}g\,dP_X.
\end{aligned}
$$

これで証明が完了しました。
<!-- proof-end -->

---

## 3. 離散・連続の期待値公式は同じ式

押し出し積分公式により

$$
E[g(X)]=\int g\,dP_X.
$$

離散分布で

$$
P_X=\sum_xp_X(x)\delta_x
$$

なら

$$
E[g(X)]=\sum_xg(x)p_X(x).
$$

一方、$P_X\ll\lambda$ で確率密度関数 $f_X=dP_X/d\lambda$ を持つなら

$$
E[g(X)]=\int_{\mathbb R}g(x)f_X(x)\,dx.
$$

和と積分という見た目の違いは、基準となる分布測度 $P_X$ の形の違いです。

---

## 4. モーメントと分散

<a id="def-f0-00p2a-moment"></a>

<!-- formal-statement-start -->
> **定義（モーメント）**  
> 実数値確率変数 $X$ と整数 $k\ge1$ に対して $E[|X|^k]<\infty$ が成り立つとき
>
> $$
> E[X^k]
> $$
>
> を $X$ の $k$ 次モーメントと呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p2a-moment -->
### 4.1 例：Bernoulli変数のモーメント

**定義の確認**

$X\in\{0,1\}$ なら $X^k=X$ が全ての $k\ge1$ で成り立つので

$$
E[|X|^k]=E[X]=p<\infty.
$$

従って全ての正整数 $k$ についてモーメントが存在し、

$$
E[X^k]=p
$$

です。
<!-- definition-example-end -->

平均

$$
\mu:=E[X]
$$

が存在し、さらに $E[X^2]<\infty$ なら

$$
\operatorname{Var}(X):=E[(X-\mu)^2]
$$

と定義します。

可積分性は

$$
X\in L^1(P)
$$

と同値で、有限二次モーメントは

$$
X\in L^2(P)
$$

と同値です。

---

## 5. 期待値の基本性質は積分の性質

可積分な $X,Y$ と実数 $a,b$ に対して

$$
E[aX+bY]=aE[X]+bE[Y].
$$

また $X\le Y$ がa.s.成り立つ可積分確率変数なら

$$
E[X]\le E[Y].
$$

これらは確率固有の追加公理ではなく、Lebesgue積分の線形性と単調性を確率測度 $P$ に適用したものです。

特に事象 $A$ の指示関数について

$$
E[\boldsymbol{1}_A]=P(A)
$$

です。この等式が、期待値から確率を評価する不等式の出発点になります。

---

## 6. 可算劣加法性

<a id="thm-f0-00p2a-union-bound"></a>

<!-- formal-statement-start -->
> **定理（可算劣加法性）**  
> 同一の確率空間上の事象列 $A_1,A_2,\ldots$ に対して
>
> $$
> \boxed{
> P\left(\bigcup_{n=1}^{\infty}A_n\right)
> \le
> \sum_{n=1}^{\infty}P(A_n)
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：重なりを除いて互いに素にする

$$
B_1:=A_1,
\qquad
B_n:=A_n\setminus\bigcup_{k<n}A_k
\quad(n\ge2)
$$

と置きます。構成から $B_n$ は互いに素で、$B_n\subseteq A_n$ です。また各点は「最初に現れた $A_n$」に対応する $B_n$ に入るので

$$
\bigcup_{n=1}^{\infty}B_n
=
\bigcup_{n=1}^{\infty}A_n.
$$

従って可算加法性と単調性から

$$
\begin{aligned}
P\left(\bigcup_{n=1}^{\infty}A_n\right)
&=P\left(\bigcup_{n=1}^{\infty}B_n\right)\\
&=\sum_{n=1}^{\infty}P(B_n)\\
&\le\sum_{n=1}^{\infty}P(A_n).
\end{aligned}
$$
<!-- proof-end -->

---

## 7. 確率測度の上からの連続性

<a id="thm-f0-00p2a-continuity-from-above"></a>

<!-- formal-statement-start -->
> **定理（確率測度の上からの連続性）**  
> 事象列が
>
> $$
> A_1\supset A_2\supset\cdots
> $$
>
> と単調減少し、$A:=\bigcap_{n=1}^{\infty}A_n$ とします。このとき
>
> $$
> \boxed{P(A_n)\downarrow P(A)}
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：増加列へ戻す

$$
B_n:=A_1\setminus A_n
$$

と置くと

$$
B_n\uparrow A_1\setminus A.
$$

測度の[下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)から

$$
P(B_n)\uparrow P(A_1\setminus A).
$$

確率測度では

$$
P(A_1)\le1<\infty
$$

なので差を取ることができ、

$$
P(A_n)=P(A_1)-P(B_n).
$$

極限を取ると

$$
P(A_n)\downarrow P(A_1)-P(A_1\setminus A)=P(A).
$$
<!-- proof-end -->

一般の測度では最初の集合の測度が有限であることが必要ですが、確率測度では自動的に満たされます。

---

## 8. Markovの不等式

<a id="thm-f0-00p2a-markov"></a>

<!-- formal-statement-start -->
> **定理（Markovの不等式）**  
> 非負確率変数 $Y\ge0$ が $E[Y]<\infty$ を満たすとします。このとき任意の $a>0$ に対して
>
> $$
> \boxed{
> P(Y\ge a)\le\frac{E[Y]}{a}
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

事象 $\{Y\ge a\}$ 上では $Y\ge a$ なので、全ての $\omega\in\Omega$ に対して

$$
a\boldsymbol{1}_{\{Y\ge a\}}(\omega)\le Y(\omega)
$$

が成り立ちます。期待値の単調性から

$$
aE[\boldsymbol{1}_{\{Y\ge a\}}]
\le E[Y].
$$

左辺は

$$
aP(Y\ge a)
$$

なので、$a>0$ で割って

$$
P(Y\ge a)\le\frac{E[Y]}a
$$

を得ます。
<!-- proof-end -->

$p>0$ とし $Y=|X|^p$, $a=\varepsilon^p$ と置けば

$$
\boxed{
P(|X|\ge\varepsilon)
\le
\frac{E|X|^p}{\varepsilon^p}
}
$$

です。

---

## 9. Chebyshevの不等式

<a id="thm-f0-00p2a-chebyshev"></a>

<!-- formal-statement-start -->
> **定理（Chebyshevの不等式）**  
> 確率変数 $X$ が有限平均 $\mu=E[X]$ と有限分散 $\sigma^2=\operatorname{Var}(X)$ を持つとします。このとき任意の $\varepsilon>0$ に対して
>
> $$
> \boxed{
> P(|X-\mu|\ge\varepsilon)
> \le
> \frac{\sigma^2}{\varepsilon^2}
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：Markovの不等式へ戻す

非負確率変数

$$
Y:=(X-\mu)^2
$$

を考えます。有限分散の仮定から

$$
E[Y]=\sigma^2<\infty
$$

なのでMarkovの不等式を適用できます。また

$$
|X-\mu|\ge\varepsilon
\Longleftrightarrow
Y\ge\varepsilon^2.
$$

従って

$$
\begin{aligned}
P(|X-\mu|\ge\varepsilon)
&=P(Y\ge\varepsilon^2)\\
&\le\frac{E[Y]}{\varepsilon^2}\\
&=\frac{\sigma^2}{\varepsilon^2}.
\end{aligned}
$$
<!-- proof-end -->

---

## 10. 期待値と極限の交換

$a.s.$ 収束

$$
X_n\to X
$$

だけでは、一般に

$$
E[X_n]\to E[X]
$$

とは限りません。

しかし

$$
|X_n|\le Y
\quad\text{a.s.},
\qquad
E[Y]<\infty
$$

なら[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)の仮定を満たし、

$$
E[X_n]\to E[X]
$$

です。

また

$$
0\le X_n\uparrow X
$$

なら単調収束定理により

$$
E[X_n]\uparrow E[X]
$$

です。

ここで重要なのは「極限と期待値を交換した」のではなく、**どの収束定理のどの仮定を満たしたから交換できたか**を確認することです。

---

## 11. 確率密度関数はa.e.一意

Radon--Nikodym微分は基準測度に関してa.e.一意です。従ってLebesgue測度に対する確率密度関数 $f_X$ も、一点やLebesgue零集合上で値を変えても同じ分布を表します。

例えば連続分布では

$$
P(X=x)=0
$$

でも

$$
f_X(x)>0
$$

であり得ます。確率密度関数の一点での値そのものが、その点の確率ではありません。

---

## 演習

### F0-00P2A-A01 押し出し積分公式で期待値を計算する

- Level: A
- 目安時間: 10分

$X\sim\mathrm{Unif}(0,1)$ とする。$g(x)=x^2$ と置き、押し出し積分公式を使って $E[X^2]$ を求めよ。

<!-- solution-start -->
#### 詳細解答

一様分布の確率密度関数は

$$
f_X(x)=\boldsymbol{1}_{(0,1)}(x)
$$

です。押し出し積分公式から

$$
\begin{aligned}
E[X^2]
&=E[g(X)]\\
&=\int_{\mathbb R}g(x)\,dP_X(x)\\
&=\int_0^1x^2\,dx\\
&=\left[\frac{x^3}{3}\right]_0^1\\
&=\frac13.
\end{aligned}
$$
<!-- solution-end -->

### F0-00P2A-A02 離散分布で変換後の期待値を求める

- Level: A
- 目安時間: 10分

$P(X=-1)=1/4$, $P(X=2)=3/4$ とする。$g(x)=x^2+1$ に対して $E[g(X)]$ を求めよ。

<!-- solution-start -->
#### 詳細解答

押し出し積分公式の離散形から

$$
E[g(X)]
=\sum_xg(x)P(X=x).
$$

従って

$$
\begin{aligned}
E[g(X)]
&=(({-1})^2+1)\frac14+(2^2+1)\frac34\\
&=2\cdot\frac14+5\cdot\frac34\\
&=\frac12+\frac{15}{4}\\
&=\frac{17}{4}.
\end{aligned}
$$
<!-- solution-end -->

### F0-00P2A-A03 Markovの不等式を使う

- Level: A
- 目安時間: 10分

非負確率変数 $Y$ が $E[Y]=6$ を満たすとする。$P(Y\ge15)$ のMarkov上界を求めよ。

<!-- solution-start -->
#### 詳細解答

Markovの不等式に $a=15$ を代入すると

$$
P(Y\ge15)
\le\frac{E[Y]}{15}
=\frac6{15}
=\frac25.
$$
<!-- solution-end -->

### F0-00P2A-A04 Chebyshevの不等式を使う

- Level: A
- 目安時間: 10分

$E[X]=10$, $\operatorname{Var}(X)=9$ とする。$P(|X-10|\ge6)$ のChebyshev上界を求めよ。

<!-- solution-start -->
#### 詳細解答

$\mu=10$, $\sigma^2=9$, $\varepsilon=6$ なので

$$
P(|X-10|\ge6)
\le\frac{9}{6^2}
=\frac14.
$$
<!-- solution-end -->

### F0-00P2A-B01 押し出し積分公式を再構成する

- Level: B
- 目安時間: 15分

$P_X=P\circ X^{-1}$ とする。非負Borel可測関数 $g$ に対して

$$
\int_\Omega g(X)\,dP
=
\int_{\mathbb R}g\,dP_X
$$

が成り立つことを、指示関数、非負単関数、一般の非負可測関数の順に示せ。

<!-- solution-start -->
#### 詳細解答

**指示関数**  
$g=\boldsymbol{1}_B$ なら

$$
\int_\Omega\boldsymbol{1}_B(X)\,dP
=P(X\in B)
=P_X(B)
=\int\boldsymbol{1}_B\,dP_X.
$$

**非負単関数**  

$$
s=\sum_{j=1}^ma_j\boldsymbol{1}_{B_j},
\qquad a_j\ge0
$$

なら線形性から

$$
\int s(X)\,dP
=\sum_ja_jP_X(B_j)
=\int s\,dP_X.
$$

**非負可測関数**  
非負単関数 $s_n$ を

$$
0\le s_n\uparrow g
$$

となるように取ると

$$
s_n(X)\uparrow g(X).
$$

単調収束定理より

$$
\begin{aligned}
\int g(X)\,dP
&=\lim_n\int s_n(X)\,dP\\
&=\lim_n\int s_n\,dP_X\\
&=\int g\,dP_X.
\end{aligned}
$$

これで非負可測関数の場合が示されます。
<!-- solution-end -->

### F0-00P2A-B02 可算劣加法性を数値評価に使う

- Level: B
- 目安時間: 15分

事象 $A_1,A_2,A_3$ が

$$
P(A_1)=0.10,
\qquad
P(A_2)=0.15,
\qquad
P(A_3)=0.08
$$

を満たす。独立性など追加情報はないものとする。

1. $P(A_1\cup A_2\cup A_3)$ の可算劣加法性による上界を求めよ。
2. この上界が等号になるために十分な条件を一つ挙げ、その理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 上界**

$$
P(A_1\cup A_2\cup A_3)
\le P(A_1)+P(A_2)+P(A_3)
=0.33.
$$

**2. 等号の十分条件**  
$A_1,A_2,A_3$ が互いに素なら、確率測度の有限加法性から

$$
P(A_1\cup A_2\cup A_3)
=P(A_1)+P(A_2)+P(A_3)
=0.33
$$

となります。
<!-- solution-end -->

### F0-00P2A-B03 優収束定理で期待値極限を正当化する

- Level: B
- 目安時間: 15分

$X\sim\mathrm{Unif}(0,1)$ とし

$$
Y_n:=\frac{X}{1+X/n}
$$

とする。$E[Y_n]\to E[X]$ を優収束定理で示せ。

<!-- solution-start -->
#### 詳細解答

各 $x\in[0,1]$ について

$$
\frac{x}{1+x/n}\to x
$$

なので

$$
Y_n\to X
\qquad\text{a.s.}
$$

です。また $X\ge0$ なので

$$
0\le Y_n=\frac{X}{1+X/n}\le X\le1.
$$

支配関数として定数確率変数 $1$ を取れ、

$$
E[1]=1<\infty.
$$

従って優収束定理の仮定を満たし、

$$
E[Y_n]\to E[X].
$$

さらに $X\sim\mathrm{Unif}(0,1)$ なので

$$
E[X]=\int_0^1x\,dx=\frac12.
$$

従って $E[Y_n]\to1/2$ です。
<!-- solution-end -->

### F0-00P2A-C01 期待値・Markov・Chebyshevを一続きで使う

- Level: C
- 目安時間: 25分

独立同分布な確率変数 $X_1,\ldots,X_n$ が

$$
E[X_i]=\mu,
\qquad
\operatorname{Var}(X_i)=\sigma^2<\infty
$$

を満たすとする。標本平均を

$$
\overline X_n:=\frac1n\sum_{i=1}^nX_i
$$

とする。

1. 期待値の線形性から $E[\overline X_n]=\mu$ を示せ。
2. 独立性から $\operatorname{Var}(\overline X_n)=\sigma^2/n$ を示せ。
3. Chebyshevの不等式を使って

$$
P(|\overline X_n-\mu|\ge\varepsilon)
\le\frac{\sigma^2}{n\varepsilon^2}
$$

を導け。
4. 任意の $\varepsilon>0$ について右辺が0へ収束することから、$\overline X_n$ が $\mu$ に確率収束することを説明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 平均**

期待値の線形性から

$$
\begin{aligned}
E[\overline X_n]
&=E\left[\frac1n\sum_{i=1}^nX_i\right]\\
&=\frac1n\sum_{i=1}^nE[X_i]\\
&=\frac1n\cdot n\mu\\
&=\mu.
\end{aligned}
$$

**2. 分散**

一般に

$$
\operatorname{Var}\left(\sum_{i=1}^nX_i\right)
=\sum_{i=1}^n\operatorname{Var}(X_i)
+2\sum_{i<j}\operatorname{Cov}(X_i,X_j).
$$

独立性から $i\ne j$ では

$$
E[X_iX_j]=E[X_i]E[X_j]
$$

なので $\operatorname{Cov}(X_i,X_j)=0$。従って

$$
\begin{aligned}
\operatorname{Var}(\overline X_n)
&=\frac1{n^2}\operatorname{Var}\left(\sum_{i=1}^nX_i\right)\\
&=\frac1{n^2}\sum_{i=1}^n\sigma^2\\
&=\frac{\sigma^2}{n}.
\end{aligned}
$$

**3. Chebyshev評価**

$E[\overline X_n]=\mu$、$\operatorname{Var}(\overline X_n)=\sigma^2/n$ なので

$$
P(|\overline X_n-\mu|\ge\varepsilon)
\le
\frac{\operatorname{Var}(\overline X_n)}{\varepsilon^2}
=
\frac{\sigma^2}{n\varepsilon^2}.
$$

**4. 確率収束**

固定した任意の $\varepsilon>0$ に対して

$$
\frac{\sigma^2}{n\varepsilon^2}\to0.
$$

確率は非負なので、はさみうちにより

$$
P(|\overline X_n-\mu|\ge\varepsilon)\to0.
$$

これは $\overline X_n\to\mu$ in probability の定義です。
<!-- solution-end -->

---

## 次に進む

期待値を分布上の積分として移せるようになったら、[F0-00P3](../F0_00P3_独立_積測度_条件付き期待値/index.md) で独立性・積測度・条件付き期待値へ進みます。
