# F0-00P3A 条件付き期待値：部分σ代数上のRadon–Nikodym構成

<!-- definition-example-audit: strict -->

条件付き期待値は「条件を固定した平均」という公式から始めるのではなく、**今ある情報で測れること**と**その情報で区別できる各事象上の平均を保存すること**で定義します。

```text
条件付き期待値の定義
 ↓
有限分割で定義条件を検算
 ↓
Radon--Nikodym定理で存在
 ↓
a.s.一意性
 ↓
線形性・正値性・take-out・tower
 ↓
Doob--Dynkin：sigma(Y)-可測なら m(Y) と書ける
```

---

## 1. 条件付き期待値の定義

<a id="def-f0-00p3a-conditional-expectation"></a>

<!-- formal-statement-start -->
> **定義（条件付き期待値）**  
> 確率空間 $(\Omega,\mathcal F,P)$、部分 $\sigma$ 代数 $\mathcal G\subseteq\mathcal F$、$X\in L^1(P)$ を取ります。確率変数 $Y$ が次の3条件を満たすとき、$Y$ を $X$ の $\mathcal G$ に関する条件付き期待値と呼び、

$$
Y=E[X\mid\mathcal G]
$$

> と書きます。
>
> 1. $Y$ は $\mathcal G$-可測である。
> 2. $Y\in L^1(P)$ である。
> 3. 任意の $A\in\mathcal G$ に対して

$$
\int_A Y\,dP=\int_A X\,dP
$$

> が成り立つ。
<!-- formal-statement-end -->

第1条件は「$Y$ は現在の情報 $\mathcal G$ だけで決まる」、第3条件は「$\mathcal G$ で見えるどの領域でも平均量を保存する」という意味です。

---

## 2. 例：有限分割なら何になるか

$A_1,\dots,A_m$ が $\Omega$ の可測な分割で、各 $P(A_j)>0$ とします。

$$
\mathcal G=\sigma(A_1,\dots,A_m)
$$

とし、

$$
Y=\sum_{j=1}^m
\frac{E[X\mathbf1_{A_j}]}{P(A_j)}\mathbf1_{A_j}
$$

と置きます。

<!-- definition-example-start: def-f0-00p3a-conditional-expectation -->
**定義の確認**

**(1) $\mathcal G$-可測性**  
$Y$ は各 $A_j$ 上で定数であり、各 $A_j\in\mathcal G$ なので $\mathcal G$-可測です。

**(2) 可積分性**  

$$
\begin{aligned}
E|Y|
&=\sum_{j=1}^m
\left|\frac{E[X\mathbf1_{A_j}]}{P(A_j)}\right|P(A_j)\\
&=\sum_{j=1}^m|E[X\mathbf1_{A_j}]|\\
&\le\sum_{j=1}^mE[|X|\mathbf1_{A_j}]\\
&=E|X|<\infty.
\end{aligned}
$$

**(3) 各 $B\in\mathcal G$ 上の積分一致**  
有限分割が生成する $\mathcal G$ の各元 $B$ は、ある添字集合 $J$ を用いて

$$
B=\bigcup_{j\in J}A_j
$$

と書けます。従って

$$
\begin{aligned}
\int_B Y\,dP
&=\sum_{j\in J}\frac{E[X\mathbf1_{A_j}]}{P(A_j)}P(A_j)\\
&=\sum_{j\in J}E[X\mathbf1_{A_j}]\\
&=E[X\mathbf1_B]\\
&=\int_BX\,dP.
\end{aligned}
$$

3条件をすべて満たすので、確かに

$$
\boxed{Y=E[X\mid\mathcal G]}
$$

です。
<!-- definition-example-end -->

---

## 3. 存在：符号付き測度へ直接RNを使わない

<a id="thm-f0-00p3a-existence-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（条件付き期待値の存在とa.s.一意性）**  
> $X\in L^1(P)$、$\mathcal G\subseteq\mathcal F$ を部分 $\sigma$ 代数とします。このとき $E[X\mid\mathcal G]$ は存在し、$P$-a.s. の意味で一意です。
<!-- formal-statement-end -->

現行のRN定理は**非負測度**に対する定理です。$X$ が符号を持つと $A\mapsto\int_AX\,dP$ は符号付き測度なので、そのまま適用せず正負部分へ分けます。

<!-- proof-start -->
### 3.1 証明：存在

$$
X=X^+-X^-,
\qquad
|X|=X^++X^-
$$

と分解します。$X\in L^1$ なので $E[X^+],E[X^-]<\infty$ です。$A\in\mathcal G$ に対して

$$
\nu_+(A)=\int_AX^+\,dP,
\qquad
\nu_-(A)=\int_AX^-\,dP
$$

と置きます。$\nu_+,\nu_-$ は $(\Omega,\mathcal G)$ 上の有限な非負測度で

$$
\nu_+\ll P|_{\mathcal G},
\qquad
\nu_-\ll P|_{\mathcal G}.
$$

[P2のRadon--Nikodym定理](../F0_00P2_密度_期待値_Radon_Nikodym/index.md#thm-f0-00p2-radon-nikodym)をそれぞれに適用すると、非負 $\mathcal G$-可測関数 $f_+,f_-$ が存在して

$$
\nu_\pm(A)=\int_Af_\pm\,dP
\qquad(\forall A\in\mathcal G)
$$

となります。$A=\Omega$ とすれば $E[f_+]=E[X^+]$、$E[f_-]=E[X^-]$ なので

$$
Y=f_+-f_-
$$

は $\mathcal G$-可測かつ可積分です。さらに任意の $A\in\mathcal G$ で

$$
\int_AY\,dP
=\nu_+(A)-\nu_-(A)
=\int_AX\,dP.
$$

従って $Y$ は条件付き期待値です。

### 3.2 証明：一意性

$Y,Z$ がともに定義の3条件を満たすとします。$D=Y-Z$ は $\mathcal G$-可測で、任意の $A\in\mathcal G$ に対して

$$
\int_AD\,dP=0.
$$

$n\ge1$ に対し $A_n=\{D\ge1/n\}\in\mathcal G$ と置きます。もし $P(A_n)>0$ なら

$$
0=\int_{A_n}D\,dP
\ge\frac1nP(A_n)>0
$$

となり矛盾します。従って $P(D>0)=0$。同様に $P(D<0)=0$ なので

$$
\boxed{Y=Z\quad P\text{-a.s.}}
$$

です。
<!-- proof-end -->

---

## 4. 基本性質

<a id="thm-f0-00p3a-basic-properties"></a>

<!-- formal-statement-start -->
> **定理（条件付き期待値の基本性質）**  
> $X,Y\in L^1(P)$、$a,b\in\mathbb R$ とします。
>
> 1. **線形性**

$$
E[aX+bY\mid\mathcal G]
=aE[X\mid\mathcal G]+bE[Y\mid\mathcal G].
$$

> 2. **正値性**：$X\ge0$ a.s. なら $E[X\mid\mathcal G]\ge0$ a.s.
> 3. **単調性**：$X\le Y$ a.s. なら $E[X\mid\mathcal G]\le E[Y\mid\mathcal G]$ a.s.
> 4. **$L^1$縮小性**

$$
\boxed{\|E[X\mid\mathcal G]\|_1\le\|X\|_1}.
$$

> 5. **take-out-what-is-known**：有界な $\mathcal G$-可測確率変数 $Z$ に対して

$$
E[ZX\mid\mathcal G]=ZE[X\mid\mathcal G].
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 4.1 証明：線形性

右辺は $\mathcal G$-可測かつ可積分で、任意の $A\in\mathcal G$ について

$$
\int_A\{aE[X\mid\mathcal G]+bE[Y\mid\mathcal G]\}\,dP
=\int_A(aX+bY)\,dP.
$$

一意性から線形性が従います。

### 4.2 証明：正値性と単調性

$X\ge0$ とし $M=E[X\mid\mathcal G]$ とします。$B_n=\{M\le-1/n\}\in\mathcal G$ とすると

$$
\int_{B_n}M\,dP=\int_{B_n}X\,dP\ge0.
$$

一方、$P(B_n)>0$ なら左辺は $\le-P(B_n)/n<0$ となり矛盾します。従って $M\ge0$ a.s. です。単調性は $Y-X\ge0$ に正値性と線形性を適用すれば従います。

### 4.3 証明：$L^1$縮小性

$$
-|X|\le X\le|X|
$$

に単調性を適用すると

$$
|E[X\mid\mathcal G]|\le E[|X|\mid\mathcal G].
$$

期待値を取れば

$$
\|E[X\mid\mathcal G]\|_1
\le E[E[|X|\mid\mathcal G]]
=E|X|.
$$

### 4.4 証明：既知の有界量を外へ出す

まず $Z=\mathbf1_B$、$B\in\mathcal G$ とします。任意の $A\in\mathcal G$ に対して

$$
\begin{aligned}
\int_A\mathbf1_BE[X\mid\mathcal G]\,dP
&=\int_{A\cap B}E[X\mid\mathcal G]\,dP\\
&=\int_{A\cap B}X\,dP\\
&=\int_A\mathbf1_BX\,dP.
\end{aligned}
$$

一意性から指示関数の場合が成り立ちます。$\mathcal G$-可測単関数へ線形性で拡張し、有界 $Z$ へは単関数近似と優収束で極限を取ります。
<!-- proof-end -->

---

## 5. tower property

<a id="thm-f0-00p3a-tower"></a>

<!-- formal-statement-start -->
> **定理（tower property）**  
> $\mathcal H\subseteq\mathcal G\subseteq\mathcal F$ なら

$$
\boxed{E[E[X\mid\mathcal G]\mid\mathcal H]=E[X\mid\mathcal H]}
$$

> がa.s.で成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 5.1 証明

左辺は $\mathcal H$-可測です。任意の $A\in\mathcal H$ は $A\in\mathcal G$ でもあるので

$$
\begin{aligned}
\int_AE[E[X\mid\mathcal G]\mid\mathcal H]\,dP
&=\int_AE[X\mid\mathcal G]\,dP\\
&=\int_AX\,dP.
\end{aligned}
$$

従って左辺は $X$ の $\mathcal H$ に関する条件付き期待値の定義を満たし、一意性から結論が従います。
<!-- proof-end -->

自明な $\sigma$ 代数 $\{\varnothing,\Omega\}$ を $\mathcal H$ に取れば

$$
E[E[X\mid\mathcal G]]=E[X]
$$

です。

---

## 6. Doob--Dynkin補題：$\sigma(Y)$-可測なら $Y$ の関数

記号

$$
E[X\mid Y]
$$

は

$$
\boxed{E[X\mid\sigma(Y)]}
$$

の略記です。これを $m(Y)$ と書ける根拠が Doob--Dynkin 補題です。

<a id="thm-f0-00p3a-doob-dynkin"></a>

<!-- formal-statement-start -->
> **定理（Doob--Dynkin補題・実数値版）**  
> $Y:\Omega\to\mathbb R$、$Z:\Omega\to\mathbb R$ を実数値関数とします。$Y$ は可測とし、$Z$ が $\sigma(Y)$-可測であるとします。このときBorel可測関数 $m:\mathbb R\to\mathbb R$ が存在して

$$
\boxed{Z=m(Y)}
$$

> が点ごとに成り立ちます。逆に $m$ がBorel可測なら $m(Y)$ は $\sigma(Y)$-可測です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：有限値単関数で近似して各レベル集合を $Y^{-1}(B)$ と書く

逆向きは可測関数の合成から直ちに従います。非自明な向きを示します。

$Z$ は実数値なので、例えば

$$
Z_n
:=
\max\left\{-n,
\min\left(n,\ 2^{-n}\lfloor2^nZ\rfloor\right)
\right\}
$$

と置くと、$Z_n$ は有限個の値しか取らない $\sigma(Y)$-可測単関数で

$$
Z_n(\omega)\to Z(\omega)
\qquad(\forall\omega\in\Omega)
$$

です。

$Z_n$ の有限個の値を $c_{n,1},\dots,c_{n,r_n}$ とし

$$
A_{n,j}=\{Z_n=c_{n,j}\}\in\sigma(Y)
$$

と置きます。ところで

$$
\sigma(Y)
=\{Y^{-1}(B):B\in\mathcal B(\mathbb R)\}
$$

です。実際、右辺は $\sigma$ 代数であり、$Y$ を可測にする最小の $\sigma$ 代数そのものです。従って各 $A_{n,j}$ に対しBorel集合 $B_{n,j}$ を選んで

$$
A_{n,j}=Y^{-1}(B_{n,j})
$$

と書けます。

そこで

$$
m_n(y)=\sum_{j=1}^{r_n}c_{n,j}\mathbf1_{B_{n,j}}(y)
$$

と置きます。$m_n$ はBorel可測で、各 $\omega$ に対して

$$
m_n(Y(\omega))=Z_n(\omega).
$$

最後に

$$
m(y)=\limsup_{n\to\infty}m_n(y)
$$

と置けば、可測関数列の $\limsup$ なので $m$ はBorel可測です。そして

$$
m(Y(\omega))
=\lim_{n\to\infty}Z_n(\omega)
=Z(\omega).
$$

よって $Z=m(Y)$ です。$\square$
<!-- proof-end -->

条件付き期待値 $E[X\mid\sigma(Y)]$ は定義により $\sigma(Y)$-可測です。従ってDoob--Dynkin補題から、あるBorel可測関数 $m$ が存在して

$$
\boxed{E[X\mid Y]=m(Y)}
$$

と書けます。通常の記号 $E[X\mid Y=y]$ は、この関数 $m(y)$ を表します。

連続分布では一般に $P(Y=y)=0$ なので、$E[X\mathbf1_{\{Y=y\}}]/P(Y=y)$ を定義として使うことはできません。

---

## 7. 独立なら条件付けしても平均は変わらない

$X$ が $\mathcal G$ と独立で $X\in L^1$ なら

$$
\boxed{E[X\mid\mathcal G]=E[X]\quad\text{a.s.}}
$$

です。定数 $E[X]$ は $\mathcal G$-可測かつ可積分で、任意の $A\in\mathcal G$ について

$$
\int_AX\,dP
=E[X\mathbf1_A]
=E[X]P(A)
=\int_AE[X]\,dP.
$$

従って定義3条件を満たします。

---

## 演習

### F0-00P3A-A01 有限分割への条件付き期待値

- Level: A
- 目安時間: 12分

$\mathcal G=\sigma(A)$、$0<P(A)<1$ とする。$X\in L^1$ に対する $E[X\mid\mathcal G]$ を $A,A^c$ 上の定数として書き、定義3条件を確認せよ。

<!-- solution-start -->
#### 詳細解答

$$
Y=\frac{E[X\mathbf1_A]}{P(A)}\mathbf1_A
+\frac{E[X\mathbf1_{A^c}]}{P(A^c)}\mathbf1_{A^c}.
$$

$A,A^c$ 上で定数なので $\mathcal G$-可測。また $E|Y|\le E|X|<\infty$。$\mathcal G=\{\varnothing,A,A^c,\Omega\}$ の4事象で積分一致が成立するので条件付き期待値である。

#### 本番答案
上の $Y$ を置き、$\mathcal G$-可測性、$E|Y|\le E|X|$、$A,A^c$ 上の積分一致を確認する。

#### 採点基準（20点）
- 候補の式: 6点
- 可測性: 4点
- 可積分性: 4点
- 積分一致: 6点
<!-- solution-end -->

### F0-00P3A-B01 存在証明で正負部分へ分ける理由

- Level: B
- 目安時間: 15分

$X\in L^1$ が正負の値を取るとする。$A\mapsto\int_AX\,dP$ にP2の非負測度版Radon--Nikodym定理を直接適用できない理由を述べ、$X^+,X^-$ を使って存在証明を完成させよ。

<!-- solution-start -->
#### 詳細解答
$\nu(A)=\int_AX\,dP$ は一般に負の値を取るため非負測度ではない。そこで

$$
\nu_\pm(A)=\int_AX^\pm\,dP
$$

を作る。両者は有限非負測度で $\nu_\pm\ll P|_{\mathcal G}$。RN定理により $f_\pm=d\nu_\pm/dP$ が存在する。$Y=f_+-f_-$ は $\mathcal G$-可測・可積分で、全 $A\in\mathcal G$ に対し $\int_AYdP=\int_AXdP$。従って $Y=E[X\mid\mathcal G]$。

#### 本番答案
符号付き量へ非負測度版RNを直接使えない。$X=X^+-X^-$ とし、$\nu_\pm(A)=\int_AX^\pm dP$ にRNを適用して $E[X\mid\mathcal G]=d\nu_+/dP-d\nu_-/dP$ と構成する。

#### 採点基準（20点）
- 直接適用できない理由: 5点
- 正負部分の測度: 5点
- RN適用: 5点
- 差による構成と定義確認: 5点
<!-- solution-end -->

---

## 次に進む

二乗可積分な場合の幾何を見るなら [F0-00P3B L2射影・最良予測](../F0_00P3B_L2射影_最良予測/index.md) へ進みます。その次のP3Cでは、情報 $\mathcal G_n$ が増えると $E[X\mid\mathcal G_n]$ がどこへ収束するかを証明します。
