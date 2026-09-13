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
線形性・正値性・tower・L1縮小性・既知量の取り出し
 ↓
E[X|Y] と Doob--Dynkin
```

---

## 1. 条件付き期待値の定義

<a id="def-f0-00p3a-conditional-expectation"></a>

<!-- formal-statement-start -->
> **定義（条件付き期待値）**  
> 確率空間 $(\Omega,\mathcal F,P)$、部分 $\sigma$ 代数 $\mathcal G\subseteq\mathcal F$、$X\in L^1(P)$ を取ります。確率変数 $Y$ が次の3条件を満たすとき、$Y$ を $X$ の $\mathcal G$ に関する条件付き期待値と呼び、
>
> $$
> Y=E[X\mid\mathcal G]
> $$
>
> と書きます。
>
> 1. $Y$ は $\mathcal G$-可測である。
> 2. $Y\in L^1(P)$ である。
> 3. 任意の $A\in\mathcal G$ に対して
>
> $$
> \int_A Y\,dP=\int_A X\,dP
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

第1条件は「$Y$ は現在の情報 $\mathcal G$ だけで決まる」、第3条件は「$\mathcal G$ で見えるどの領域でも平均量を保存する」という意味です。条件付き期待値は点ごとに一意なのではなく、後で示すように **a.s. の意味で一意に決まります**。

---

## 2. 例：有限分割なら何になるか

$A_1,\dots,A_m$ が $\Omega$ の可測な分割で、各 $P(A_j)>0$ とします。

$$
\mathcal G=\sigma(A_1,\dots,A_m)
$$

とし、

$$
Y
=
\sum_{j=1}^m
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

この公式は「セル $A_j$ にいることだけが分かるなら、そのセル内平均を予測値にする」という意味です。

---

## 3. 存在：符号付き測度へ直接RNを使わない

<a id="thm-f0-00p3a-existence-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（条件付き期待値の存在とa.s.一意性）**  
> $X\in L^1(P)$、$\mathcal G\subseteq\mathcal F$ を部分 $\sigma$ 代数とします。このとき $E[X\mid\mathcal G]$ は存在し、$P$-a.s. の意味で一意です。
<!-- formal-statement-end -->

現行のRN定理は**非負測度**に対する定理です。$X$ が符号を持つと $A\mapsto\int_AX\,dP$ は符号付き測度なので、そのまま適用してはいけません。正負部分へ分けます。

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

と置きます。$\nu_+,\nu_-$ は $(\Omega,\mathcal G)$ 上の有限な非負測度です。また $P(A)=0$ なら測度0集合上の積分は0なので

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

となり矛盾します。従って $P(A_n)=0$ であり、

$$
\{D>0\}=\bigcup_{n=1}^\infty A_n
$$

だから $P(D>0)=0$ です。同じ議論を $-D$ に適用すると $P(D<0)=0$。従って

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
>
> $$
> E[aX+bY\mid\mathcal G]
> =aE[X\mid\mathcal G]+bE[Y\mid\mathcal G].
> $$
>
> 2. **正値性**：$X\ge0$ a.s. なら $E[X\mid\mathcal G]\ge0$ a.s.
> 3. **単調性**：$X\le Y$ a.s. なら $E[X\mid\mathcal G]\le E[Y\mid\mathcal G]$ a.s.
> 4. **$L^1$縮小性**
>
> $$
> \boxed{\|E[X\mid\mathcal G]\|_1\le\|X\|_1}.
> $$
>
> 5. **既知量の取り出し**：有界な $\mathcal G$-可測確率変数 $Z$ に対して
>
> $$
> E[ZX\mid\mathcal G]=ZE[X\mid\mathcal G].
> $$
>
> 6. **既知量は変わらない**：$X$ 自身が $\mathcal G$-可測なら
>
> $$
> E[X\mid\mathcal G]=X\quad\text{a.s.}
> $$
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

一方、$P(B_n)>0$ なら左辺は $\le-P(B_n)/n<0$ となり矛盾します。従って各 $P(B_n)=0$、ゆえに $M\ge0$ a.s. です。単調性は $Y-X\ge0$ に正値性と線形性を適用すれば従います。

### 4.3 証明：$L^1$縮小性

$$
-|X|\le X\le|X|
$$

に単調性を適用すると

$$
|E[X\mid\mathcal G]|
\le E[|X|\mid\mathcal G].
$$

期待値を取れば、定義の積分一致を $A=\Omega$ に使って

$$
\|E[X\mid\mathcal G]\|_1
\le E[E[|X|\mid\mathcal G]]
=E|X|.
$$

### 4.4 証明：既知の有界量を外へ出す

$M=E[X\mid\mathcal G]$ とします。まず $Z=\mathbf1_B$、$B\in\mathcal G$ なら、任意の $A\in\mathcal G$ に対して

$$
\begin{aligned}
\int_A\mathbf1_BM\,dP
&=\int_{A\cap B}M\,dP\\
&=\int_{A\cap B}X\,dP\\
&=\int_A\mathbf1_BX\,dP.
\end{aligned}
$$

よって一意性から

$$
E[\mathbf1_BX\mid\mathcal G]=\mathbf1_BM.
$$

線形性により、$\mathcal G$-可測単関数 $Z$ についても

$$
E[ZX\mid\mathcal G]=ZM
$$

です。

一般の有界 $\mathcal G$-可測 $Z$ には、$\mathcal G$-可測単関数 $Z_n$ を

$$
Z_n\to Z\quad\text{pointwise},
\qquad
|Z_n|\le\|Z\|_\infty
$$

となるように取ります。任意の $A\in\mathcal G$ について単関数の場合から

$$
\int_A Z_nM\,dP=\int_A Z_nX\,dP.
$$

左辺は $|Z_nM|\le\|Z\|_\infty|M|$、右辺は $|Z_nX|\le\|Z\|_\infty|X|$ で支配され、$M,X\in L^1$ です。[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から

$$
\int_A ZM\,dP=\int_A ZX\,dP.
$$

$ZM$ は $\mathcal G$-可測かつ可積分なので、一意性より

$$
\boxed{E[ZX\mid\mathcal G]=ZM}.
$$

### 4.5 証明：既知量は変わらない

$X$ が $\mathcal G$-可測なら、$X$ 自身が定義の3条件を満たします。よって一意性から

$$
E[X\mid\mathcal G]=X\quad\text{a.s.}
$$

です。
<!-- proof-end -->

---

## 5. tower property

<a id="thm-f0-00p3a-tower"></a>

<!-- formal-statement-start -->
> **定理（tower property）**  
> $\mathcal H\subseteq\mathcal G\subseteq\mathcal F$ なら
>
> $$
> \boxed{E[E[X\mid\mathcal G]\mid\mathcal H]=E[X\mid\mathcal H]}
> $$
>
> がa.s.で成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

左辺は $\mathcal H$-可測かつ可積分です。任意の $A\in\mathcal H$ は $A\in\mathcal G$ でもあるので

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

## 6. $E[X\mid Y]$ の意味と version の注意

記号

$$
E[X\mid Y]
$$

は

$$
\boxed{E[X\mid\sigma(Y)]}
$$

の略記です。つまり「$Y$ から読み取れる情報だけを使った $X$ の条件付き平均」です。

$E[X\mid\sigma(Y)]$ の代表元 $W$ は $\sigma(Y)$-可測です。[P3DのDoob--Dynkin lemma](../F0_00P3D_pushforward_LOTUS_Doob_Dynkin/index.md#thm-f0-00p3d-doob-dynkin)により、あるBorel可測関数 $m$ が存在して

$$
W=m(Y)
$$

と書けます。従って

$$
E[X\mid Y]=m(Y)
$$

という表示が得られます。ただしここには **version の自由度**があります。

もし $m_1(Y)=m_2(Y)$ a.s. なら、押し出し測度 $P_Y$ に関して

$$
P_Y(\{y:m_1(y)\ne m_2(y)\})
=P(m_1(Y)\ne m_2(Y))=0.
$$

したがって $m$ は $P_Y$-a.e. にしか一意ではありません。特に連続分布では普通 $P(Y=y)=0$ なので、記号

$$
E[X\mid Y=y]
$$

を $E[X\mathbf1_{\{Y=y\}}]/P(Y=y)$ で定義することはできません。これは通常、選んだversion $m$ の値 $m(y)$ を表す記号です。零確率の点ではversionを変えると値も変えられるため、**各点 $y$ で固有に決まる値ではない**ことに注意してください。

---

## 7. 独立なら条件付けしても平均は変わらない

$X$ が $\mathcal G$ と独立で $X\in L^1$ なら

$$
\boxed{E[X\mid\mathcal G]=E[X]\quad\text{a.s.}}
$$

です。定数 $E[X]$ は $\mathcal G$-可測かつ可積分です。また任意の $A\in\mathcal G$ について、P3で示した独立性による期待値の因数分解を $X$ と $\mathbf1_A$ に適用すると

$$
\int_AX\,dP
=E[X\mathbf1_A]
=E[X]P(A)
=\int_AE[X]\,dP.
$$

従って定義3条件を満たし、一意性から結論が従います。

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
+\frac{E[X\mathbf1_{A^c}]}{P(A^c)}\mathbf1_{A^c}
$$

と置く。$A,A^c$ 上で定数なので $Y$ は $\mathcal G$-可測である。また

$$
E|Y|
\le E[|X|\mathbf1_A]+E[|X|\mathbf1_{A^c}]
=E|X|<\infty.
$$

$\mathcal G=\{\varnothing,A,A^c,\Omega\}$ であり、$A,A^c$ 上では構成から積分一致する。$\varnothing,\Omega$ についても加法性から一致する。従って $Y=E[X\mid\mathcal G]$。
<!-- solution-end -->

### F0-00P3A-A02 自明な情報と完全な情報

- Level: A
- 目安時間: 10分

$X\in L^1$ とする。次を示せ。

1. $E[X\mid\{\varnothing,\Omega\}]=E[X]$ a.s.
2. $E[X\mid\mathcal F]=X$ a.s.

<!-- solution-start -->
#### 詳細解答
1. 定数 $E[X]$ は自明な $\sigma$ 代数に関して可測・可積分である。$\varnothing$ と $\Omega$ 上の積分一致も成り立つので、条件付き期待値の定義を満たす。
2. $X$ 自身が $\mathcal F$-可測・可積分で、任意の $A\in\mathcal F$ に対し $\int_AXdP=\int_AXdP$。一意性より結論。
<!-- solution-end -->

### F0-00P3A-A03 tower property の直接確認

- Level: A
- 目安時間: 10分

$\mathcal H\subseteq\mathcal G\subseteq\mathcal F$ とする。$M=E[X\mid\mathcal G]$ に対して $E[M\mid\mathcal H]=E[X\mid\mathcal H]$ を定義から示せ。

<!-- solution-start -->
#### 詳細解答
$E[M\mid\mathcal H]$ は $\mathcal H$-可測・可積分。任意の $A\in\mathcal H$ は $\mathcal G$ にも属するから

$$
\int_AE[M\mid\mathcal H]dP
=\int_AMdP
=\int_AXdP.
$$

従って $E[M\mid\mathcal H]$ は $X$ の $\mathcal H$ に関する条件付き期待値の3条件を満たす。一意性から結論。
<!-- solution-end -->

### F0-00P3A-A04 独立な情報への条件付け

- Level: A
- 目安時間: 12分

$X\in L^1$ が部分 $\sigma$ 代数 $\mathcal G$ と独立であるとする。$E[X\mid\mathcal G]=E[X]$ a.s. を示せ。

<!-- solution-start -->
#### 詳細解答
候補を定数 $c=E[X]$ とする。定数なので $\mathcal G$-可測で可積分。任意の $A\in\mathcal G$ について独立性から

$$
\int_AXdP=E[X\mathbf1_A]=E[X]E[\mathbf1_A]=cP(A)=\int_Ac\,dP.
$$

従って定義3条件を満たし、一意性より結論。
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

を作る。両者は有限非負測度で $\nu_\pm\ll P|_{\mathcal G}$。[RN定理](../F0_00P2_密度_期待値_Radon_Nikodym/index.md#thm-f0-00p2-radon-nikodym)により非負 $\mathcal G$-可測 $f_\pm=d\nu_\pm/dP$ が存在する。$A=\Omega$ とすれば $f_\pm\in L^1$。したがって $Y=f_+-f_-$ は $\mathcal G$-可測・可積分で、全 $A\in\mathcal G$ に対し

$$
\int_AYdP=\nu_+(A)-\nu_-(A)=\int_AXdP.
$$

よって $Y=E[X\mid\mathcal G]$。
<!-- solution-end -->

### F0-00P3A-B02 既知量を外へ出す

- Level: B
- 目安時間: 20分

$Z$ を有界 $\mathcal G$-可測確率変数とする。指示関数の場合から出発して

$$
E[ZX\mid\mathcal G]=ZE[X\mid\mathcal G]
$$

を証明せよ。

<!-- solution-start -->
#### 詳細解答
$M=E[X\mid\mathcal G]$ とする。$Z=\mathbf1_B$、$B\in\mathcal G$ なら任意の $A\in\mathcal G$ に対し

$$
\int_A\mathbf1_BMdP
=\int_{A\cap B}MdP
=\int_{A\cap B}XdP
=\int_A\mathbf1_BXdP.
$$

線形性で $\mathcal G$-可測単関数へ拡張する。一般の有界 $Z$ に対しては、$|Z_n|\le\|Z\|_\infty$、$Z_n\to Z$ pointwise となる $\mathcal G$-可測単関数列を取る。各 $A\in\mathcal G$ について

$$
\int_AZ_nMdP=\int_AZ_nXdP.
$$

両辺はそれぞれ $\|Z\|_\infty|M|$、$\|Z\|_\infty|X|$ で支配されるのでDCTにより極限を取れる。よって $ZM$ が $ZX$ の条件付き期待値の定義を満たす。
<!-- solution-end -->

### F0-00P3A-B03 $E[X\mid Y]$ を離散表から求める

- Level: B
- 目安時間: 18分

$(X,Y)$ の同時分布が

| | $Y=0$ | $Y=1$ |
|---|---:|---:|
| $X=0$ | $1/4$ | $1/8$ |
| $X=2$ | $1/4$ | $3/8$ |

で与えられるとする。$E[X\mid Y]$ を $m(Y)$ の形で求めよ。

<!-- solution-start -->
#### 詳細解答
まず

$$
P(Y=0)=\frac12,
\qquad
P(Y=1)=\frac12.
$$

従って

$$
E[X\mid Y=0]
=0\cdot\frac{1/4}{1/2}+2\cdot\frac{1/4}{1/2}=1,
$$

$$
E[X\mid Y=1]
=0\cdot\frac{1/8}{1/2}+2\cdot\frac{3/8}{1/2}=\frac32.
$$

したがって $m(0)=1,m(1)=3/2$ と置けば

$$
\boxed{E[X\mid Y]=1\cdot\mathbf1_{\{Y=0\}}+\frac32\mathbf1_{\{Y=1\}}}.
$$

$Y$ が取らない値での $m(y)$ は任意に定めてよい。これはversionの自由度の有限離散版である。
<!-- solution-end -->

### F0-00P3A-C01 入れ子になった有限情報を総合する

- Level: C
- 目安時間: 30分

$\Omega=\{1,2,3,4\}$ に一様分布を入れ、

$$
X=(0,2,4,10),
$$

$$
\mathcal G=\sigma(\{1,2\},\{3,4\}),
\qquad
\mathcal H=\{\varnothing,\Omega\}
$$

とする。

1. $E[X\mid\mathcal G]$ を求めよ。
2. $E[E[X\mid\mathcal G]\mid\mathcal H]$ を求め、$E[X\mid\mathcal H]$ と一致することを確認せよ。
3. $\|E[X\mid\mathcal G]\|_1\le\|X\|_1$ を数値で確認せよ。
4. $Z=\mathbf1_{\{1,2\}}$ として $E[ZX\mid\mathcal G]=ZE[X\mid\mathcal G]$ を確認せよ。

<!-- solution-start -->
#### 詳細解答
1. 各セル平均を取れば

$$
E[X\mid\mathcal G]=(1,1,7,7).
$$

2. その全体平均は

$$
\frac{1+1+7+7}{4}=4.
$$

一方 $E[X]=(0+2+4+10)/4=4$ なので、両方とも定数4でありtower propertyを具体的に確認できる。

3.

$$
\|E[X\mid\mathcal G]\|_1=\frac{1+1+7+7}{4}=4,
\qquad
\|X\|_1=\frac{0+2+4+10}{4}=4.
$$

この例では等号である。

4. $ZX=(0,2,0,0)$。$\mathcal G$ の各セルで平均を取ると

$$
E[ZX\mid\mathcal G]=(1,1,0,0).
$$

一方

$$
ZE[X\mid\mathcal G]
=(1,1,0,0).
$$

よって一致する。
<!-- solution-end -->

---

## 次に進む

二乗可積分な場合の幾何を見るなら [F0-00P3B L2射影・最良予測](../F0_00P3B_L2射影_最良予測/index.md) へ進みます。その次のP3Cでは、情報 $\mathcal G_n$ が増えると $E[X\mid\mathcal G_n]$ がどこへ収束するかを証明します。$E[X\mid Y]=m(Y)$ の可測関数表示そのものの証明は [P3D](../F0_00P3D_pushforward_LOTUS_Doob_Dynkin/index.md#thm-f0-00p3d-doob-dynkin) で閉じます。
