# F0-00P2A 期待値・LOTUS：確率空間から分布上の積分へ

<!-- definition-example-audit: strict -->

[P2](../F0_00P2_密度_期待値_Radon_Nikodym/index.md) では、分布の密度を基準測度に対して統一しました。ここでは期待値をLebesgue積分として定義し、確率変数 $X$ の分布 $P_X$ だけを使って $E[g(X)]$ を計算できる理由を証明します。

---

## 1. 期待値

<a id="def-f0-00p2a-expectation"></a>

<!-- formal-statement-start -->
> **定義（期待値）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の実数値確率変数 $X$ が

$$
\int_\Omega|X|\,dP<\infty
$$

> を満たすとき、$X$ は可積分であるといい、期待値を

$$
E[X]:=\int_\Omega X\,dP
$$

> と定義します。$X\ge0$ の場合は、値 $+\infty$ を許して同じ記法を使います。
<!-- formal-statement-end -->

### 1.1 例：Bernoulli変数

$P(X=1)=p$, $P(X=0)=1-p$ とします。

<!-- definition-example-start: def-f0-00p2a-expectation -->
**定義の確認**

$0\le X\le1$ なので

$$
E[|X|]\le1<\infty,
$$

従って $X$ は可積分です。また

$$
E[X]
=0\cdot P(X=0)+1\cdot P(X=1)
=p.
$$
<!-- definition-example-end -->

Borel可測関数 $g:\mathbb R\to\mathbb R$ に対して $g(X)$ が可積分なら

$$
E[g(X)]:=\int_\Omega g(X(\omega))\,dP(\omega)
$$

と書きます。$g(X)\ge0$ なら $+\infty$ を許します。

---

## 2. LOTUS：分布だけで期待値を計算する

<a id="thm-f0-00p2a-lotus"></a>

<!-- formal-statement-start -->
> **定理（LOTUS：分布による期待値計算）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の実数値確率変数 $X$ の分布を $P_X$ とします。Borel可測関数 $g:\mathbb R\to\mathbb R$ が非負、または $g(X)$ が可積分なら

$$
\boxed{
\int_\Omega g(X(\omega))\,dP(\omega)
=
\int_{\mathbb R}g(x)\,dP_X(x)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

この公式をLOTUSと呼びます。内容は、$g(X)$ の分布を先に求めなくても、$X$ の分布 $P_X$ に対して $g$ を積分すればよい、というものです。

<!-- proof-start -->
### 2.1 証明：指示関数から一般の可測関数へ

#### Step 1：指示関数

Borel集合 $B$ に対して $g=\boldsymbol{1}_B$ とします。このとき

$$
\boldsymbol{1}_B(X(\omega))
=\boldsymbol{1}_{X^{-1}(B)}(\omega).
$$

従って

$$
\begin{aligned}
\int_\Omega\boldsymbol{1}_B(X)\,dP
&=P(X^{-1}(B))\\
&=P_X(B)\\
&=\int_{\mathbb R}\boldsymbol{1}_B\,dP_X.
\end{aligned}
$$

これは押し出し測度の定義そのものです。

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

$g\ge0$ をBorel可測とします。非負単関数列 $(s_n)$ を

$$
0\le s_n\uparrow g
$$

となるように取れます。合成して

$$
0\le s_n(X)\uparrow g(X).
$$

[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)を $P$ と $P_X$ の両方に適用すると

$$
\begin{aligned}
\int_\Omega g(X)\,dP
&=\lim_{n\to\infty}\int_\Omega s_n(X)\,dP\\
&=\lim_{n\to\infty}\int_{\mathbb R}s_n\,dP_X\\
&=\int_{\mathbb R}g\,dP_X.
\end{aligned}
$$

#### Step 4：可積分な実数値関数

一般の実数値関数では

$$
g=g^+-g^-,
\qquad
|g|=g^++g^-.
$$

まずStep 3を $|g|$ に適用すると

$$
\int_{\mathbb R}|g|\,dP_X
=
\int_\Omega|g(X)|\,dP.
$$

従って $g(X)$ が可積分なら、$g$ も $P_X$ に関して可積分です。さらにStep 3を $g^+$ と $g^-$ に適用して

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

一般の測度空間と可測写像に対する形は、後続のP3Dで押し出し積分公式として整理します。ここで必要なのは、その確率論版を自力で証明し、期待値計算に使えることです。

---

## 3. 離散和と連続積分は同じ式

[LOTUS](#thm-f0-00p2a-lotus)から

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

一方、$P_X$ が確率密度関数 $f_X$ を持つなら

$$
E[g(X)]=\int_{\mathbb R}g(x)f_X(x)\,dx.
$$

違う公式を暗記しているのではなく、どちらも $P_X$ に対する積分です。

---

## 4. モーメント

<a id="def-f0-00p2a-moment"></a>

<!-- formal-statement-start -->
> **定義（モーメント）**  
> 実数値確率変数 $X$ と整数 $k\ge1$ に対して

$$
E[|X|^k]<\infty
$$

> が成り立つとき、$E[X^k]$ を $X$ の $k$ 次モーメントと呼びます。
<!-- formal-statement-end -->

### 4.1 例：Bernoulli変数

<!-- definition-example-start: def-f0-00p2a-moment -->
**定義の確認**

Bernoulli変数では $X\in\{0,1\}$ なので、任意の $k\ge1$ に対して

$$
X^k=X.
$$

従って

$$
E[|X|^k]=E[X]=p<\infty,
\qquad
E[X^k]=p.
$$
<!-- definition-example-end -->

平均 $\mu=E[X]$ と二次モーメントが有限なら

$$
\operatorname{Var}(X):=E[(X-\mu)^2]
$$

が分散です。

---

## 5. 期待値の基本性質

可積分な $X,Y$ と実数 $a,b$ に対して

$$
E[aX+bY]=aE[X]+bE[Y].
$$

また $X\le Y$ がa.s.成り立つなら

$$
E[X]\le E[Y].
$$

特に事象 $A$ の指示関数について

$$
E[\boldsymbol{1}_A]=P(A).
$$

これらはLebesgue積分の線形性・単調性を確率測度へ適用したものです。

---

## 6. 可算劣加法性（union bound）

<a id="thm-f0-00p2a-union-bound"></a>

<!-- formal-statement-start -->
> **定理（可算劣加法性（union bound））**  
> 同一の確率空間上の事象列 $A_1,A_2,\ldots$ に対して

$$
\boxed{
P\left(\bigcup_{n=1}^{\infty}A_n\right)
\le
\sum_{n=1}^{\infty}P(A_n)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
B_1:=A_1,
\qquad
B_n:=A_n\setminus\bigcup_{k<n}A_k
\quad(n\ge2)
$$

と置きます。$B_n$ は互いに素で $B_n\subseteq A_n$、また

$$
\bigcup_{n=1}^{\infty}B_n
=
\bigcup_{n=1}^{\infty}A_n.
$$

従って可算加法性と単調性から

$$
\begin{aligned}
P\left(\bigcup_nA_n\right)
&=\sum_nP(B_n)\\
&\le\sum_nP(A_n).
\end{aligned}
$$
<!-- proof-end -->

---

## 7. 確率測度の上からの連続性

<a id="thm-f0-00p2a-continuity-from-above"></a>

<!-- formal-statement-start -->
> **定理（確率測度の上からの連続性）**  
> 事象列が $A_1\supset A_2\supset\cdots$ と単調減少し、

$$
A:=\bigcap_{n=1}^{\infty}A_n
$$

> とします。このとき

$$
\boxed{P(A_n)\downarrow P(A)}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
B_n:=A_1\setminus A_n
$$

と置くと

$$
B_n\uparrow A_1\setminus A.
$$

測度の[下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)より

$$
P(B_n)\uparrow P(A_1\setminus A).
$$

確率測度では $P(A_1)\le1<\infty$ なので

$$
P(A_n)=P(A_1)-P(B_n).
$$

従って

$$
P(A_n)
\downarrow
P(A_1)-P(A_1\setminus A)
=P(A).
$$
<!-- proof-end -->

---

## 8. Markovの不等式

<a id="thm-f0-00p2a-markov"></a>

<!-- formal-statement-start -->
> **定理（Markovの不等式）**  
> 非負確率変数 $Y$ が $E[Y]<\infty$ を満たすとします。このとき任意の $a>0$ に対して

$$
\boxed{
P(Y\ge a)\le\frac{E[Y]}a
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

点ごとに

$$
a\boldsymbol{1}_{\{Y\ge a\}}\le Y
$$

が成り立ちます。期待値の単調性から

$$
aP(Y\ge a)
=aE[\boldsymbol{1}_{\{Y\ge a\}}]
\le E[Y].
$$

$a>0$ で割れば結論を得ます。
<!-- proof-end -->

$p>0$ として $Y=|X|^p$, $a=\varepsilon^p$ と置けば

$$
P(|X|\ge\varepsilon)
\le
\frac{E|X|^p}{\varepsilon^p}.
$$

---

## 9. Chebyshevの不等式

<a id="thm-f0-00p2a-chebyshev"></a>

<!-- formal-statement-start -->
> **定理（Chebyshevの不等式）**  
> 確率変数 $X$ が有限平均 $\mu=E[X]$ と有限分散 $\sigma^2=\operatorname{Var}(X)$ を持つとします。このとき任意の $\varepsilon>0$ に対して

$$
\boxed{
P(|X-\mu|\ge\varepsilon)
\le
\frac{\sigma^2}{\varepsilon^2}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

非負確率変数

$$
Y:=(X-\mu)^2
$$

に[Markovの不等式](#thm-f0-00p2a-markov)を適用します。有限分散の仮定から $E[Y]=\sigma^2<\infty$ で、

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

$a.s.$ 収束 $X_n\to X$ だけでは一般に $E[X_n]\to E[X]$ とは限りません。

一方、

$$
|X_n|\le Y\quad\text{a.s.},
\qquad
E[Y]<\infty
$$

で、さらに $X_n\to X$ a.s.なら、[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)により

$$
E[X_n]\to E[X].
$$

また

$$
0\le X_n\uparrow X
$$

なら[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)から

$$
E[X_n]\uparrow E[X].
$$

重要なのは「期待値と極限は交換できる」と覚えるのではなく、使う収束定理の仮定をその場で確認することです。

---

## 演習

### F0-00P2A-A01 LOTUSで期待値を計算する
- Level: A
- 目安時間: 10分

$X\sim\mathrm{Unif}(0,1)$ とする。$g(x)=x^2$ として $E[g(X)]$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$P_X$ の確率密度関数は $f_X(x)=\boldsymbol{1}_{(0,1)}(x)$ です。[LOTUS](#thm-f0-00p2a-lotus)より

$$
\begin{aligned}
E[X^2]
&=\int_{\mathbb R}x^2\,dP_X(x)\\
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

[LOTUS](#thm-f0-00p2a-lotus)の離散形から

$$
\begin{aligned}
E[g(X)]
&=g(-1)\frac14+g(2)\frac34\\
&=2\cdot\frac14+5\cdot\frac34\\
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

$$
P(|X-10|\ge6)
\le\frac{9}{6^2}
=\frac14.
$$
<!-- solution-end -->

### F0-00P2A-B01 LOTUSの非負関数版を再構成する
- Level: B
- 目安時間: 15分

非負Borel可測関数 $g$ に対して

$$
\int_\Omega g(X)\,dP
=
\int_{\mathbb R}g\,dP_X
$$

が成り立つことを、指示関数、非負単関数、一般の非負可測関数の順に示せ。

<!-- solution-start -->
#### 詳細解答

指示関数 $g=\boldsymbol{1}_B$ では

$$
\int\boldsymbol{1}_B(X)\,dP
=P(X\in B)
=P_X(B)
=\int\boldsymbol{1}_B\,dP_X.
$$

非負単関数 $s=\sum_ja_j\boldsymbol{1}_{B_j}$ へは有限線形性で拡張できます。一般の非負可測関数 $g$ について $0\le s_n\uparrow g$ となる単関数列を取り、[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)を両辺へ適用すると

$$
\int g(X)\,dP
=\lim_n\int s_n(X)\,dP
=\lim_n\int s_n\,dP_X
=\int g\,dP_X.
$$
<!-- solution-end -->

### F0-00P2A-B02 可算劣加法性を数値評価に使う
- Level: B
- 目安時間: 15分

$$
P(A_1)=0.10,
\quad
P(A_2)=0.15,
\quad
P(A_3)=0.08
$$

とする。追加情報がないとき $P(A_1\cup A_2\cup A_3)$ の上界を求め、等号となる十分条件を一つ挙げよ。

<!-- solution-start -->
#### 詳細解答

可算劣加法性から

$$
P(A_1\cup A_2\cup A_3)
\le0.10+0.15+0.08
=0.33.
$$

$A_1,A_2,A_3$ が互いに素なら有限加法性により等号になります。
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

各 $x\in[0,1]$ で $x/(1+x/n)\to x$ なので $Y_n\to X$ a.s.です。また

$$
0\le Y_n\le X\le1.
$$

支配関数 $1$ は可積分で $E[1]=1$。従って[Lebesgueの優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)により

$$
E[Y_n]\to E[X].
$$

さらに

$$
E[X]=\int_0^1x\,dx=\frac12.
$$
<!-- solution-end -->

### F0-00P2A-C01 標本平均をChebyshevで評価する
- Level: C
- 目安時間: 25分

独立同分布な確率変数 $X_1,\ldots,X_n$ が

$$
E[X_i]=\mu,
\qquad
\operatorname{Var}(X_i)=\sigma^2<\infty
$$

を満たすとする。

$$
\overline X_n:=\frac1n\sum_{i=1}^nX_i
$$

について、次を示せ。

1. $E[\overline X_n]=\mu$。
2. $\operatorname{Var}(\overline X_n)=\sigma^2/n$。
3. $P(|\overline X_n-\mu|\ge\varepsilon)\le\sigma^2/(n\varepsilon^2)$。
4. $\overline X_n\to\mu$ in probability。

<!-- solution-start -->
#### 詳細解答

**1.** 線形性より

$$
E[\overline X_n]
=\frac1n\sum_{i=1}^nE[X_i]
=\mu.
$$

**2.** 独立性から $i\ne j$ で

$$
\operatorname{Cov}(X_i,X_j)=0.
$$

従って

$$
\begin{aligned}
\operatorname{Var}(\overline X_n)
&=\frac1{n^2}\operatorname{Var}\left(\sum_{i=1}^nX_i\right)\\
&=\frac1{n^2}\sum_{i=1}^n\sigma^2\\
&=\frac{\sigma^2}{n}.
\end{aligned}
$$

**3.** [Chebyshevの不等式](#thm-f0-00p2a-chebyshev)から

$$
P(|\overline X_n-\mu|\ge\varepsilon)
\le
\frac{\operatorname{Var}(\overline X_n)}{\varepsilon^2}
=
\frac{\sigma^2}{n\varepsilon^2}.
$$

**4.** 固定した任意の $\varepsilon>0$ について右辺は $n\to\infty$ で0へ収束するので

$$
P(|\overline X_n-\mu|\ge\varepsilon)\to0.
$$

これは確率収束の定義です。
<!-- solution-end -->

---

## 次に進む

期待値を分布上の積分として扱えるようになったので、次は [F0-00P3](../F0_00P3_独立_積測度_条件付き期待値/index.md) で独立性と積測度へ進みます。