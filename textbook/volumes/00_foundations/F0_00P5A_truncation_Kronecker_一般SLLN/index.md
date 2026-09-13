# F0-00P5A truncation・Kolmogorov収束定理・Kronecker補題：一般独立同分布強大数則

<!-- definition-example-audit: strict -->

[P5](../F0_00P5_大数の強法則/index.md) では、有限4次モーメントなら短い証明が使え、有限分散まで弱めると Kolmogorov 最大不等式が必要になることを見ました。本章ではさらに有限分散を外し、

$$
E|X_1|<\infty
$$

だけから独立同分布な標本平均の概収束を証明します。

有限分散がないと、部分和の分散をそのまま評価する P5 の証明は使えません。そこで役割を三つに分けます。

```text
大きすぎる観測だけを切る
  ↓ Borel--Cantelli
元の列と切断列は eventually 同じ

切断・中心化した揺らぎ
  ↓ Kolmogorov収束定理
重み付き級数 Σ Y_n/n が概収束

重み付き級数の収束
  ↓ Kronecker補題
標本平均 n^{-1}ΣY_n が 0 へ収束
```

最後に、切断でずれた期待値を優収束定理で元へ戻します。

---

## 1. 有限分散を持たない可積分分布でも強大数則は欲しい

まず、P5 の有限分散版では扱えない具体例を見ます。$k=1,2,\ldots$ に対し

$$
P(X=k)=P(X=-k)=\frac{c}{k^3},
\qquad
c:=\left(2\sum_{k=1}^{\infty}\frac1{k^3}\right)^{-1}
$$

とします。全確率は

$$
2c\sum_{k=1}^{\infty}\frac1{k^3}=1
$$

なので、これは確率分布です。さらに

$$
E|X|
=
2c\sum_{k=1}^{\infty}\frac{k}{k^3}
=
2c\sum_{k=1}^{\infty}\frac1{k^2}
<\infty.
$$

分布は0について対称で、しかも絶対可積分なので $E[X]=0$ です。一方、

$$
E[X^2]
=
2c\sum_{k=1}^{\infty}\frac{k^2}{k^3}
=
2c\sum_{k=1}^{\infty}\frac1k
=\infty.
$$

したがってこの分布では P5 の有限分散版を適用できません。それでも平均 $E[X]$ は有限です。本章の一般形は、このような **平均は存在するが分散は無限大** の場合まで含めます。

---

## 2. truncation：大きすぎる観測だけを切る

<a id="def-f0-00p5a-truncation"></a>

<!-- formal-statement-start -->
> **定義（truncation、切断）**  
> 実数値確率変数 $X$ と閾値 $c>0$ に対して

$$
T_c(X):=
X\boldsymbol{1}_{\{|X|\le c\}}
$$

> を、閾値 $c$ で切断した確率変数と呼びます。実数値確率変数列 $X_1,X_2,\ldots$ について本章では

$$
X_n':=T_n(X_n)
=
X_n\boldsymbol{1}_{\{|X_n|\le n\}}
$$

> と置きます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p5a-truncation -->
**定義の確認。**  
$X$ が標本点ごとに $-4,1,5$ という値を取り得るとき、閾値 $c=3$ なら

$$
T_3(-4)=0,\qquad T_3(1)=1,\qquad T_3(5)=0.
$$

条件 $|X|\le3$ を満たす値だけを残し、それを超える値を0へ置き換えています。切断は値を一定値へ「丸める」のではなく、ここでは指示関数を掛けて大きな値を消す操作です。
<!-- definition-example-end -->

切断の狙いは、各 $X_n'$ を有界にすること自体ではありません。閾値を $n$ とともに大きくすることで、最終的には元の $X_n$ とほとんど同じ列にしつつ、二次モーメントを重み付きで総和可能にします。

### 2.1 可積分性からtail確率和を有限にする

<a id="lem-f0-00p5a-tail-sum"></a>

<!-- formal-statement-start -->
> **補題（可積分変数のtail-sum評価）**  
> 実数値確率変数 $X$ が $E|X|<\infty$ を満たすなら

$$
\boxed{
\sum_{n=1}^{\infty}P(|X|>n)
\le E|X|
<\infty
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

固定した実数 $t\ge0$ について、$t>n$ を満たす正整数 $n$ の個数は $t$ 以下です。この点ごとの評価を指示関数で書き、非負項なので Tonelli の定理で和と期待値を交換します。

<!-- proof-start -->
### 証明

各標本点 $\omega$ について $t:=|X(\omega)|$ と置きます。$t>n$ を満たす正整数 $n$ の個数は高々 $t$ なので

$$
\sum_{n=1}^{\infty}
\boldsymbol{1}_{\{|X|>n\}}(\omega)
\le |X(\omega)|.
$$

左辺は非負項の和です。[Tonelliの定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) により期待値と和を交換できるので

$$
\begin{aligned}
\sum_{n=1}^{\infty}P(|X|>n)
&=
\sum_{n=1}^{\infty}
E\left[\boldsymbol{1}_{\{|X|>n\}}\right]\\
&=
E\left[
\sum_{n=1}^{\infty}
\boldsymbol{1}_{\{|X|>n\}}
\right]\\
&\le E|X|
<\infty.
\end{aligned}
$$

これで結論を得ます。
<!-- proof-end -->

独立同分布な $X_n$ に対しては

$$
P(X_n\ne X_n')
=
P(|X_n|>n)
=
P(|X_1|>n).
$$

したがって上の補題から

$$
\sum_{n=1}^{\infty}P(X_n\ne X_n')<\infty.
$$

[Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) より

$$
\boxed{
X_n=X_n'
\quad\text{eventually a.s.}
}
$$

です。ここでは **Borel--Cantelli第1補題そのものに独立性は不要** です。同一分布性は $P(|X_n|>n)$ を $X_1$ のtailへ読み替えるところで使っています。

---

## 3. 切断後の分散を重み付きで総和する

$X_n'$ をそのまま平均するのではなく、

$$
Y_n:=X_n'-E[X_n']
$$

と中心化します。$X_n'$ は $X_n$ だけの可測関数なので、$X_1,X_2,\ldots$ の独立性から $X_1',X_2',\ldots$ も独立です。さらに定数 $E[X_n']$ を引いても独立性は変わらないので、$Y_n$ は独立で

$$
E[Y_n]=0.
$$

また $|X_n'|\le n$ なので $E[(X_n')^2]\le n^2<\infty$ であり、各 $Y_n$ の分散も有限です。

ただし閾値が $n$ に依存するため、$Y_n$ は一般には同一分布ではありません。Kolmogorov収束定理に必要なのは、この段階では独立性・中心化・分散和の有限性です。

<a id="lem-f0-00p5a-truncated-second-moment"></a>

<!-- formal-statement-start -->
> **補題（切断二次モーメントの重み付き総和）**  
> 実数値確率変数 $X$ が $E|X|<\infty$ を満たし、

$$
W_n:=X\boldsymbol{1}_{\{|X|\le n\}}
\qquad(n\ge1)
$$

> と置くと

$$
\boxed{
\sum_{n=1}^{\infty}
\frac{E[W_n^2]}{n^2}
\le 2E|X|
<\infty
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

Tonelli の定理で期待値の外へ和を出すと、固定した値 $|X|=t$ に対して

$$
t^2\sum_{n\ge \max(1,\lceil t\rceil)}\frac1{n^2}
$$

を評価すればよくなります。$t<1$ では $t^2\le t$、$t\ge1$ では逆二乗和のtailが $O(1/t)$ なので、どちらも定数倍の $t$ で抑えられます。

<!-- proof-start -->
### 証明

非負項なので [Tonelliの定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) を使えます。$N(t):=\max(1,\lceil t\rceil)$ と置くと

$$
\begin{aligned}
\sum_{n=1}^{\infty}
\frac{E[W_n^2]}{n^2}
&=
\sum_{n=1}^{\infty}
\frac1{n^2}
E\left[
X^2\boldsymbol{1}_{\{|X|\le n\}}
\right]\\
&=
E\left[
|X|^2
\sum_{n=N(|X|)}^{\infty}\frac1{n^2}
\right].
\end{aligned}
$$

まず $0\le t<1$ なら $N(t)=1$ であり、

$$
t^2\sum_{n=1}^{\infty}\frac1{n^2}
\le 2t^2
\le 2t.
$$

ここでは

$$
\sum_{n=1}^{\infty}\frac1{n^2}
\le
1+\int_1^\infty\frac{dx}{x^2}
=2
$$

を使いました。

次に $t\ge1$ とします。$N:=N(t)\ge t$ なので

$$
\begin{aligned}
\sum_{n=N}^{\infty}\frac1{n^2}
&\le
\frac1{N^2}
+\int_N^\infty\frac{dx}{x^2}\\
&=
\frac1{N^2}+\frac1N\\
&\le
\frac2N
\le
\frac2t.
\end{aligned}
$$

従って

$$
t^2
\sum_{n=N(t)}^{\infty}\frac1{n^2}
\le2t.
$$

両場合を合わせると、点ごとに被積分関数は $2|X|$ 以下です。よって

$$
\sum_{n=1}^{\infty}
\frac{E[W_n^2]}{n^2}
\le
2E|X|
<\infty.
$$
<!-- proof-end -->

同一分布性から

$$
E[(X_n')^2]
=
E\left[
X_1^2\boldsymbol{1}_{\{|X_1|\le n\}}
\right].
$$

また

$$
\operatorname{Var}(Y_n)
=
\operatorname{Var}(X_n')
\le E[(X_n')^2].
$$

したがって補題を $X=X_1$ に適用して

$$
\boxed{
\sum_{n=1}^{\infty}
\frac{\operatorname{Var}(Y_n)}{n^2}
<\infty
}
$$

を得ます。

---

## 4. Kolmogorov収束定理：分散和から級数の概収束へ

<a id="thm-kolmogorov-convergence"></a>

<!-- formal-statement-start -->
> **定理（Kolmogorov収束定理）**  
> $Z_1,Z_2,\ldots$ を独立な実数値確率変数とし、各 $n$ について

$$
E[Z_n]=0,
\qquad
\operatorname{Var}(Z_n)<\infty
$$

> とします。さらに

$$
\sum_{n=1}^{\infty}\operatorname{Var}(Z_n)<\infty
$$

> なら、確率1で実数級数 $\sum_{n=1}^{\infty}Z_n$ は収束します。
<!-- formal-statement-end -->

この定理の役割は、**分散の総量が有限なら、独立な中心化揺らぎのtailが最終的に一様に小さくなる**と保証することです。証明の道具は [P5のKolmogorov最大不等式](../F0_00P5_大数の強法則/index.md#thm-kolmogorov-maximal) です。

### 証明の見取り図

分散級数のtailは0へ行くので、$r$ ごとに十分後ろの添字 $m_r$ を選び、その先の分散総量を $2^{-3r}$ 以下にします。最大不等式で「$m_r$ 以後の部分和がどこかで $2^{-r}$ を超える」確率を $2^{-r}$ 以下にし、Borel--Cantelli第1補題でその逸脱が有限回しか起こらないことを示します。最後に、同じ基準点 $m_r$ から測った二つのtail部分和の差を取れば Cauchy 条件が出ます。

<!-- proof-start -->
### 証明

部分和を

$$
S_n:=\sum_{j=1}^nZ_j
$$

と置きます。仮定より分散級数は収束するので、そのtailは0へ行きます。従って各 $r\ge1$ について、$m_r$ を十分大きく、必要なら $m_1<m_2<\cdots$ となるように選んで

$$
\sum_{j=m_r}^{\infty}\operatorname{Var}(Z_j)
\le2^{-3r}
$$

とできます。

$N\ge m_r$ に対し、独立な中心化確率変数

$$
Z_{m_r},Z_{m_r+1},\ldots,Z_N
$$

へ [Kolmogorov最大不等式](../F0_00P5_大数の強法則/index.md#thm-kolmogorov-maximal) を適用します。閾値を $2^{-r}$ とすると

$$
\begin{aligned}
&P\left(
\max_{m_r\le k\le N}
\left|
\sum_{j=m_r}^{k}Z_j
\right|
>2^{-r}
\right)\\
&\qquad\le
2^{2r}
\sum_{j=m_r}^{N}\operatorname{Var}(Z_j)
\le
2^{2r}2^{-3r}
=
2^{-r}.
\end{aligned}
$$

$N$ を増やすと左辺の事象は単調に増えます。[[確率の下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)により $N\to\infty$ とすると

$$
P(A_r)\le2^{-r},
$$

ただし

$$
A_r:=
\left\{
\sup_{k\ge m_r}
\left|
\sum_{j=m_r}^{k}Z_j
\right|
>2^{-r}
\right\}
$$

です。

$$
\sum_{r=1}^{\infty}P(A_r)
\le
\sum_{r=1}^{\infty}2^{-r}
<\infty
$$

なので、[Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) より、確率1で $A_r$ は有限回しか起こりません。

その確率1の事象上で標本点 $\omega$ を一つ固定します。ある $r_0(\omega)$ が存在して、全ての $r\ge r_0(\omega)$ について

$$
\sup_{k\ge m_r}
\left|
\sum_{j=m_r}^{k}Z_j(\omega)
\right|
\le2^{-r}.
$$

任意の $\varepsilon>0$ に対し、$r\ge r_0(\omega)$ かつ

$$
2^{1-r}<\varepsilon
$$

となる $r$ を取ります。$p>q\ge m_r$ なら

$$
\begin{aligned}
|S_p(\omega)-S_q(\omega)|
&=
\left|
\sum_{j=q+1}^{p}Z_j(\omega)
\right|\\
&\le
\left|
\sum_{j=m_r}^{p}Z_j(\omega)
\right|
+
\left|
\sum_{j=m_r}^{q}Z_j(\omega)
\right|\\
&\le
2^{1-r}
<\varepsilon.
\end{aligned}
$$

従って $(S_n(\omega))$ は Cauchy 列です。実数の完備性より $S_n(\omega)$ は収束します。これは確率1の事象上で成り立つので、$\sum_n Z_n$ は概収束します。
<!-- proof-end -->

本章では

$$
Z_n:=\frac{Y_n}{n}
$$

と置きます。前節で $Y_n$ は独立かつ $E[Y_n]=0$ と確認済みで、

$$
\sum_{n=1}^{\infty}\operatorname{Var}(Z_n)
=
\sum_{n=1}^{\infty}
\frac{\operatorname{Var}(Y_n)}{n^2}
<\infty.
$$

従って

$$
\boxed{
\sum_{n=1}^{\infty}\frac{Y_n}{n}
\quad\text{はa.s.収束する}
}
$$

と結論できます。

---

## 5. Kronecker補題：級数の収束を平均の収束へ変える

<a id="thm-kronecker"></a>

<!-- formal-statement-start -->
> **補題（Kronecker補題）**  
> 実数列 $a_1,a_2,\ldots$ について

$$
\sum_{n=1}^{\infty}\frac{a_n}{n}
$$

> が実数として収束するなら

$$
\boxed{
\frac1n\sum_{k=1}^na_k\to0
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

Kolmogorov収束定理が与えるのは $\sum Y_n/n$ の収束であり、欲しいのは $n^{-1}\sum Y_n$ の収束です。Kronecker補題は、まさにこの「重み付き級数 → 通常の平均」をつなぎます。

### 証明の見取り図

$B_n:=\sum_{k=1}^na_k/k$ と置くと $B_n$ は収束します。差 $B_k-B_{k-1}=a_k/k$ から $a_k=k(B_k-B_{k-1})$ と戻し、有限和を整理すると、求める平均は「$B_n$ と $B_k$ のCesàro平均の差」になります。

この有限和変形は **summation by parts（部分和変換）** の最も単純な形です。

<!-- proof-start -->
### 証明

$$
B_n:=\sum_{k=1}^n\frac{a_k}{k},
\qquad
B_0:=0
$$

と置きます。仮定からある $B\in\mathbb R$ が存在して $B_n\to B$ です。また

$$
\frac{a_k}{k}=B_k-B_{k-1}
$$

なので

$$
a_k=k(B_k-B_{k-1}).
$$

従って有限和について

$$
\begin{aligned}
\sum_{k=1}^na_k
&=
\sum_{k=1}^nkB_k
-
\sum_{k=1}^nkB_{k-1}\\
&=
\sum_{k=1}^nkB_k
-
\sum_{j=0}^{n-1}(j+1)B_j\\
&=
nB_n-\sum_{k=1}^{n-1}B_k.
\end{aligned}
$$

よって

$$
\frac1n\sum_{k=1}^na_k
=
B_n-\frac1n\sum_{k=1}^{n-1}B_k.
$$

残るのは第2項が $B$ へ収束することです。$\varepsilon>0$ を固定し、$K$ を十分大きく取って $k\ge K$ なら $|B_k-B|<\varepsilon$ とします。すると

$$
\begin{aligned}
\left|
\frac1n\sum_{k=1}^{n-1}(B_k-B)
\right|
&\le
\frac1n\sum_{k=1}^{K-1}|B_k-B|
+
\frac1n\sum_{k=K}^{n-1}|B_k-B|\\
&\le
\frac1n\sum_{k=1}^{K-1}|B_k-B|
+\varepsilon.
\end{aligned}
$$

$n$ をさらに十分大きくすれば第1項も $\varepsilon$ 未満になるので、左辺は $2\varepsilon$ 未満です。$\varepsilon>0$ は任意だから

$$
\frac1n\sum_{k=1}^{n-1}B_k\to B.
$$

従って

$$
B_n-\frac1n\sum_{k=1}^{n-1}B_k\to B-B=0,
$$

すなわち

$$
\frac1n\sum_{k=1}^na_k\to0.
$$
<!-- proof-end -->

$\sum Y_n/n$ が収束する確率1の事象上で、各標本点ごとに実数列 $a_n=Y_n(\omega)$ へこの補題を適用できます。従って

$$
\boxed{
\frac1n\sum_{k=1}^nY_k\to0
\quad\text{a.s.}
}
$$

です。

---

<a id="ref-general-slln-proof"></a>
<a id="thm-iid-integrable-slln"></a>

## 6. 一般の独立同分布強大数則

<!-- formal-statement-start -->
> **定理（独立同分布・有限平均版の強大数則）**  
> $X_1,X_2,\ldots$ を独立同分布な実数値確率変数とし、

$$
E|X_1|<\infty
$$

> とします。$\mu:=E[X_1]$ と置くと

$$
\boxed{
\frac1n\sum_{k=1}^nX_k
\to\mu
\quad\text{a.s.}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

ここまで作った道具を一本につなぎます。

1. 可積分性から $\sum_nP(|X_n|>n)<\infty$ を得て、元の列と切断列が eventually 一致する。
2. 切断中心化列 $Y_n$ について $\sum_n\operatorname{Var}(Y_n)/n^2<\infty$ を得る。
3. [Kolmogorov収束定理](#thm-kolmogorov-convergence)と[Kronecker補題](#thm-kronecker)から $n^{-1}\sum_{k\le n}Y_k\to0$ a.s.
4. 切断期待値 $E[X_n']$ は $\mu$ へ収束するので、そのCesàro平均も $\mu$ へ収束する。
5. 切断列から元の列へ戻す。

独立性・同一分布性・可積分性を使う場所はそれぞれ異なります。

<!-- proof-start -->
### 証明

**Step 1：元の列と切断列は最終的に一致する。**  
第2節で

$$
X_n':=
X_n\boldsymbol{1}_{\{|X_n|\le n\}}
$$

と置きました。独立同分布性のうち同一分布性を使うと

$$
P(X_n\ne X_n')
=
P(|X_n|>n)
=
P(|X_1|>n).
$$

[可積分変数のtail-sum評価](#lem-f0-00p5a-tail-sum)から

$$
\sum_{n=1}^{\infty}P(X_n\ne X_n')
<\infty.
$$

従って [Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) より

$$
X_n=X_n'
\quad\text{eventually a.s.}
$$

です。

**Step 2：切断中心化列の重み付き分散和は有限である。**  
$Y_n:=X_n'-E[X_n']$ と置きます。各 $X_n'$ は $X_n$ だけの可測関数なので独立性が保たれ、$Y_n$ も独立です。また $E[Y_n]=0$ です。

同一分布性と[切断二次モーメントの重み付き総和](#lem-f0-00p5a-truncated-second-moment)から

$$
\begin{aligned}
\sum_{n=1}^{\infty}
\frac{\operatorname{Var}(Y_n)}{n^2}
&\le
\sum_{n=1}^{\infty}
\frac{E[(X_n')^2]}{n^2}\\
&=
\sum_{n=1}^{\infty}
\frac{
E\left[
X_1^2\boldsymbol{1}_{\{|X_1|\le n\}}
\right]
}{n^2}\\
&<\infty.
\end{aligned}
$$

**Step 3：中心化部分の標本平均は0へ収束する。**  
$Z_n:=Y_n/n$ と置くと、$Z_n$ は独立、中心化、有限分散で

$$
\sum_{n=1}^{\infty}\operatorname{Var}(Z_n)
=
\sum_{n=1}^{\infty}
\frac{\operatorname{Var}(Y_n)}{n^2}
<\infty.
$$

従って [Kolmogorov収束定理](#thm-kolmogorov-convergence) より

$$
\sum_{n=1}^{\infty}\frac{Y_n}{n}
$$

は概収束します。その確率1の事象上で [Kronecker補題](#thm-kronecker) を適用すると

$$
\frac1n\sum_{k=1}^nY_k\to0
\quad\text{a.s.}
$$

です。

**Step 4：切断期待値を元の平均へ戻す。**  
同一分布性から

$$
E[X_n']
=
E\left[
X_1\boldsymbol{1}_{\{|X_1|\le n\}}
\right].
$$

点ごとに

$$
X_1\boldsymbol{1}_{\{|X_1|\le n\}}
\to X_1
$$

であり、

$$
\left|
X_1\boldsymbol{1}_{\{|X_1|\le n\}}
\right|
\le |X_1|.
$$

仮定 $E|X_1|<\infty$ により $|X_1|$ は可積分なので、[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01) から

$$
E[X_n']\to E[X_1]=\mu.
$$

収束数列のCesàro平均も同じ極限へ収束するので

$$
\frac1n\sum_{k=1}^nE[X_k']
\to\mu.
$$

従って

$$
\begin{aligned}
\frac1n\sum_{k=1}^nX_k'
&=
\frac1n\sum_{k=1}^n
\left(Y_k+E[X_k']\right)\\
&=
\frac1n\sum_{k=1}^nY_k
+
\frac1n\sum_{k=1}^nE[X_k']\\
&\to0+\mu
=
\mu
\quad\text{a.s.}
\end{aligned}
$$

です。

**Step 5：切断列から元の列へ戻す。**  
Step 1 の確率1の事象上で標本点 $\omega$ を固定します。ある有限な $N(\omega)$ が存在して、$k\ge N(\omega)$ なら

$$
X_k(\omega)=X_k'(\omega).
$$

従って $n\ge N(\omega)$ では

$$
\frac1n\sum_{k=1}^n
\left(X_k(\omega)-X_k'(\omega)\right)
=
\frac1n
\sum_{k=1}^{N(\omega)-1}
\left(X_k(\omega)-X_k'(\omega)\right).
$$

右辺の分子は $\omega$ を固定すれば有限個の実数の和で、$n$ に依存しません。従って右辺は0へ収束します。切断平均の概収束と合わせて

$$
\frac1n\sum_{k=1}^nX_k
\to\mu
\quad\text{a.s.}
$$

を得ます。
<!-- proof-end -->

---

## 7. 仮定はどこで働いたか

この証明では、三つの仮定が別々の仕事をしています。

| 仮定 | 使う場所 | 可能になること |
|---|---|---|
| $E|X_1|<\infty$ | tail-sum、切断二次モーメント、優収束定理 | 大きな値の出現を有限回へ押し込み、重み付き分散和を有限にし、切断期待値を元へ戻す |
| 独立性 | 切断・中心化後の列、Kolmogorov収束定理 | tail部分和を最大不等式で制御する |
| 同一分布性 | $P(|X_n|>n)$、$E[(X_n')^2]$、$E[X_n']$ の読み替え | 全てを1個の分布 $X_1$ の可積分性で評価する |

とくに、Borel--Cantelli第1補題を使う箇所では独立性は不要です。独立性が決定的に働くのは Kolmogorov 最大不等式から収束定理へ進む側です。

また有限分散を失うと P5 の

$$
\operatorname{Var}(S_n)=n\sigma^2
$$

という直接ルートは使えません。切断法は「分散が無限大でもそのまま押し切る」のではなく、**大きい観測値を有限回の例外へ追い出し、残った部分だけ二次モーメントで制御する**仕組みです。

### 7.1 証明の地下鉄図

```text
E|X_1|<∞
  ↓ tail-sum
Σ P(|X_1|>n)<∞
  ↓ 同一分布 + Borel--Cantelli I
X_n = X_n' eventually a.s.
  ↓
Σ Var(Y_n)/n²<∞
  ↓ 独立性 + Kolmogorov収束定理
Σ Y_n/n converges a.s.
  ↓ Kronecker補題
n^{-1}ΣY_n → 0 a.s.

E|X_1|<∞
  ↓ DCT
E[X_n']→E[X_1]
  ↓ Cesàro
n^{-1}ΣE[X_k']→E[X_1]

二つを合流
  ↓ eventual equality
n^{-1}ΣX_k→E[X_1] a.s.
```

---

## 8. 演習A

### F0-00P5A-A01 可積分性からtail確率和を出す

- Level: A
- 目安時間: 10分

実数値確率変数 $X$ が $E|X|<\infty$ を満たすとする。

$$
\sum_{n=1}^{\infty}P(|X|>n)
\le E|X|
$$

を、指示関数と [Tonelli の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) から示せ。

<!-- solution-start -->
#### 詳細解答

固定した標本点 $\omega$ について $t=|X(\omega)|$ と置きます。$t>n$ となる正整数 $n$ の個数は高々 $t$ なので

$$
\sum_{n=1}^{\infty}
\boldsymbol{1}_{\{|X|>n\}}(\omega)
\le |X(\omega)|.
$$

各項は非負です。従って [Tonelliの定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) を適用でき、

$$
\begin{aligned}
\sum_{n=1}^{\infty}P(|X|>n)
&=
\sum_{n=1}^{\infty}
E\left[\boldsymbol{1}_{\{|X|>n\}}\right]\\
&=
E\left[
\sum_{n=1}^{\infty}
\boldsymbol{1}_{\{|X|>n\}}
\right]\\
&\le E|X|.
\end{aligned}
$$

仮定 $E|X|<\infty$ から右辺は有限です。
<!-- solution-end -->

### F0-00P5A-A02 切断二次モーメントの級数を抑える

- Level: A
- 目安時間: 15分

$E|X|<\infty$ とし、

$$
W_n:=X\boldsymbol{1}_{\{|X|\le n\}}
$$

と置く。次を示せ。

$$
\sum_{n=1}^{\infty}\frac{E[W_n^2]}{n^2}<\infty.
$$

<!-- solution-start -->
#### 詳細解答

非負項なので Tonelli の定理で和と期待値を交換します。$N(t)=\max(1,\lceil t\rceil)$ と置けば

$$
\begin{aligned}
\sum_{n=1}^{\infty}\frac{E[W_n^2]}{n^2}
&=
E\left[
|X|^2
\sum_{n=N(|X|)}^{\infty}\frac1{n^2}
\right].
\end{aligned}
$$

$t=|X|$ とします。$0\le t<1$ なら

$$
t^2\sum_{n=1}^{\infty}\frac1{n^2}
\le2t^2\le2t.
$$

$t\ge1$ なら $N=N(t)\ge t$ で

$$
\sum_{n=N}^{\infty}\frac1{n^2}
\le
\frac1{N^2}
+\int_N^\infty x^{-2}\,dx
\le\frac2N
\le\frac2t.
$$

従ってこの場合も

$$
t^2\sum_{n=N(t)}^{\infty}\frac1{n^2}
\le2t.
$$

よって全ての $t\ge0$ で被積分関数は $2|X|$ 以下です。したがって

$$
\sum_{n=1}^{\infty}\frac{E[W_n^2]}{n^2}
\le2E|X|
<\infty.
$$
<!-- solution-end -->

### F0-00P5A-A03 切断後も独立であることを確認する

- Level: A
- 目安時間: 12分

$X_1,X_2,\ldots$ を独立な実数値確率変数とし、各 $n$ について可測関数 $g_n:\mathbb R\to\mathbb R$ を取る。

1. $g_1(X_1),g_2(X_2),\ldots$ が独立であることを、有限個のBorel集合の逆像を使って示せ。
2. $g_n(x)=x\boldsymbol{1}_{\{|x|\le n\}}$ として、本章の $X_n'$ が独立であることを確認せよ。
3. $Y_n=X_n'-E[X_n']$ も独立で $E[Y_n]=0$ であることを確認せよ。

<!-- solution-start -->
#### 詳細解答

1. 任意の異なる添字 $n_1,\ldots,n_m$ とBorel集合 $B_1,\ldots,B_m$ を取ります。可測性から各 $g_{n_i}^{-1}(B_i)$ はBorel集合です。また

$$
\{g_{n_i}(X_{n_i})\in B_i\}
=
\{X_{n_i}\in g_{n_i}^{-1}(B_i)\}.
$$

$X_{n_1},\ldots,X_{n_m}$ は独立なので

$$
\begin{aligned}
&P\left(
\bigcap_{i=1}^m
\{g_{n_i}(X_{n_i})\in B_i\}
\right)\\
&=
P\left(
\bigcap_{i=1}^m
\{X_{n_i}\in g_{n_i}^{-1}(B_i)\}
\right)\\
&=
\prod_{i=1}^m
P\left(
X_{n_i}\in g_{n_i}^{-1}(B_i)
\right)\\
&=
\prod_{i=1}^m
P(g_{n_i}(X_{n_i})\in B_i).
\end{aligned}
$$

従って変換後の列も独立です。

2. $g_n(x)=x\boldsymbol{1}_{\{|x|\le n\}}$ はBorel可測であり、$X_n'=g_n(X_n)$ です。従って1より $X_n'$ は独立です。

3. $E[X_n']$ は確率変数ではなく定数です。$h_n(x)=x-E[X_n']$ と置けば $Y_n=h_n(X_n')$ なので、同じ議論から $Y_n$ も独立です。また期待値の線形性より

$$
E[Y_n]
=
E[X_n']-E[X_n']
=
0.
$$

これで Kolmogorov 収束定理の「独立・中心化」という二つの仮定を確認できました。
<!-- solution-end -->

### F0-00P5A-A04 Kronecker補題を有限和変形から証明する

- Level: A
- 目安時間: 15分

実数列 $(a_n)$ について $\sum_{n\ge1}a_n/n$ が収束するとする。$B_n:=\sum_{k=1}^na_k/k$ と置き、

$$
\sum_{k=1}^na_k
=
nB_n-\sum_{k=1}^{n-1}B_k
$$

を導いてから

$$
\frac1n\sum_{k=1}^na_k\to0
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$B_0=0$ と置くと

$$
\frac{a_k}{k}=B_k-B_{k-1},
\qquad
a_k=k(B_k-B_{k-1}).
$$

従って

$$
\begin{aligned}
\sum_{k=1}^na_k
&=
\sum_{k=1}^nkB_k-\sum_{k=1}^nkB_{k-1}\\
&=
\sum_{k=1}^nkB_k-\sum_{j=0}^{n-1}(j+1)B_j\\
&=
nB_n-\sum_{k=1}^{n-1}B_k.
\end{aligned}
$$

級数の収束から $B_n\to B$ となる $B\in\mathbb R$ が存在します。収束数列のCesàro平均も同じ極限へ収束するので

$$
\frac1n\sum_{k=1}^{n-1}B_k\to B.
$$

したがって

$$
\frac1n\sum_{k=1}^na_k
=
B_n-\frac1n\sum_{k=1}^{n-1}B_k
\to B-B=0.
$$
<!-- solution-end -->

---

## 9. 演習B

### F0-00P5A-B01 最大不等式から収束を再構成する

- Level: B
- 目安時間: 25分

独立な実数値確率変数 $Z_n$ が $E[Z_n]=0$、$\operatorname{Var}(Z_n)<\infty$ を満たし、

$$
\sum_{n=1}^{\infty}\operatorname{Var}(Z_n)<\infty
$$

とする。[Kolmogorov最大不等式](../F0_00P5_大数の強法則/index.md#thm-kolmogorov-maximal) と [Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) を使い、$\sum_nZ_n$ が概収束することを示せ。有限区間の最大値評価から無限tailのsupへ移る箇所と、最後の Cauchy 条件まで書くこと。

<!-- solution-start -->
#### 詳細解答

分散級数のtailは0へ行くので、増加する整数列 $(m_r)$ を

$$
\sum_{j=m_r}^{\infty}\operatorname{Var}(Z_j)
\le2^{-3r}
$$

となるように選べます。

$N\ge m_r$ に対し最大不等式を $Z_{m_r},\ldots,Z_N$ と閾値 $2^{-r}$ に適用すると

$$
P\left(
\max_{m_r\le k\le N}
\left|
\sum_{j=m_r}^kZ_j
\right|
>2^{-r}
\right)
\le2^{-r}.
$$

$N$ を増やすと左辺の事象は単調増加するので、[[確率の下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)により

$$
P\left(
\sup_{k\ge m_r}
\left|
\sum_{j=m_r}^kZ_j
\right|
>2^{-r}
\right)
\le2^{-r}.
$$

右辺は $r$ について総和可能です。[Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1)から、確率1で十分大きい全ての $r$ について

$$
\sup_{k\ge m_r}
\left|
\sum_{j=m_r}^kZ_j
\right|
\le2^{-r}.
$$

部分和 $S_n=\sum_{j=1}^nZ_j$ とします。任意の $\varepsilon>0$ に対し、上の評価が成立し、かつ $2^{1-r}<\varepsilon$ となる $r$ を取ります。$p>q\ge m_r$ なら

$$
\begin{aligned}
|S_p-S_q|
&\le
\left|
\sum_{j=m_r}^pZ_j
\right|
+
\left|
\sum_{j=m_r}^qZ_j
\right|\\
&\le2^{1-r}
<\varepsilon.
\end{aligned}
$$

従って部分和列は確率1で Cauchy 列です。実数の完備性により部分和は収束し、$\sum_nZ_n$ は概収束します。
<!-- solution-end -->

### F0-00P5A-B02 有限平均・無限分散の具体例を検証する

- Level: B
- 目安時間: 18分

$k=1,2,\ldots$ に対して

$$
P(X=k)=P(X=-k)=\frac{c}{k^3},
\qquad
c:=\left(2\sum_{k=1}^{\infty}k^{-3}\right)^{-1}
$$

とする。

1. これが確率分布であることを確認せよ。
2. $E|X|<\infty$、$E[X]=0$、$E[X^2]=\infty$ を示せ。
3. この分布の独立同分布列には P5 の有限分散版を直接適用できないが、本章の強大数則を適用できる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. $c>0$ で、

$$
\sum_{k=1}^{\infty}
\{P(X=k)+P(X=-k)\}
=
2c\sum_{k=1}^{\infty}\frac1{k^3}
=1.
$$

従って全確率は1です。

2. 絶対値の期待値は

$$
E|X|
=
2c\sum_{k=1}^{\infty}
\frac{k}{k^3}
=
2c\sum_{k=1}^{\infty}\frac1{k^2}
<\infty.
$$

従って $X$ は可積分です。さらに対称性から正部分・負部分の期待値はともに

$$
E[X^+]=E[X^-]=c\sum_{k=1}^{\infty}\frac1{k^2}<\infty
$$

なので

$$
E[X]=E[X^+]-E[X^-]=0.
$$

一方、

$$
E[X^2]
=
2c\sum_{k=1}^{\infty}
\frac{k^2}{k^3}
=
2c\sum_{k=1}^{\infty}\frac1k
=\infty.
$$

3. P5 の有限分散版は $\operatorname{Var}(X)<\infty$ を仮定するため、この $X$ には適用できません。本章の定理のモーメント仮定は $E|X|<\infty$ だけです。独立同分布なコピー $X_1,X_2,\ldots$ を取れば他の仮定も満たすので、

$$
\frac1n\sum_{k=1}^nX_k\to E[X]=0
\quad\text{a.s.}
$$

と結論できます。この例は、切断法が有限分散版より真に広い範囲を扱うことを示します。
<!-- solution-end -->

### F0-00P5A-B03 一般iid強大数則の5段階を自力でつなぐ

- Level: B
- 目安時間: 30分

$X_1,X_2,\ldots$ を独立同分布な実数値確率変数とし $E|X_1|<\infty$ とする。

$$
X_n':=X_n\boldsymbol{1}_{\{|X_n|\le n\}},
\qquad
Y_n:=X_n'-E[X_n']
$$

と置く。次の順に

$$
\frac1n\sum_{k=1}^nX_k\to E[X_1]
\quad\text{a.s.}
$$

を示せ。

1. $X_n=X_n'$ eventually a.s.
2. $\sum_n\operatorname{Var}(Y_n)/n^2<\infty$.
3. $\sum_nY_n/n$ が概収束し、$n^{-1}\sum_{k\le n}Y_k\to0$ a.s.
4. $n^{-1}\sum_{k\le n}E[X_k']\to E[X_1]$.
5. 元の平均へ戻す。

<!-- solution-start -->
#### 詳細解答

1. 同一分布性から

$$
P(X_n\ne X_n')
=
P(|X_1|>n).
$$

[可積分変数のtail-sum評価](#lem-f0-00p5a-tail-sum)によりこの確率の和は有限です。従って [Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1)から $X_n=X_n'$ eventually a.s. です。

2. $Y_n$ は独立で中心化されています。また

$$
\operatorname{Var}(Y_n)
=
\operatorname{Var}(X_n')
\le E[(X_n')^2].
$$

同一分布性から

$$
E[(X_n')^2]
=
E\left[
X_1^2\boldsymbol{1}_{\{|X_1|\le n\}}
\right].
$$

A02 を $X_1$ に適用して

$$
\sum_{n=1}^{\infty}
\frac{\operatorname{Var}(Y_n)}{n^2}
<\infty
$$

を得ます。

3. $Z_n=Y_n/n$ と置けば $Z_n$ は独立・中心化・有限分散で、

$$
\sum_n\operatorname{Var}(Z_n)<\infty.
$$

従って [Kolmogorov収束定理](#thm-kolmogorov-convergence)から $\sum_nY_n/n$ は概収束します。その確率1の事象上で [Kronecker補題](#thm-kronecker)を $a_n=Y_n(\omega)$ に適用し、

$$
\frac1n\sum_{k=1}^nY_k\to0
\quad\text{a.s.}
$$

を得ます。

4. 同一分布性から

$$
E[X_n']
=
E\left[
X_1\boldsymbol{1}_{\{|X_1|\le n\}}
\right].
$$

被積分関数は $X_1$ へ各標本点で収束し、絶対値は可積分関数 $|X_1|$ 以下です。[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)より

$$
E[X_n']\to E[X_1].
$$

従ってそのCesàro平均も

$$
\frac1n\sum_{k=1}^nE[X_k']
\to E[X_1].
$$

中心化部分と合わせて

$$
\frac1n\sum_{k=1}^nX_k'
\to E[X_1]
\quad\text{a.s.}
$$

です。

5. 1の確率1の事象上では、ある有限な $N(\omega)$ 以後 $X_k=X_k'$ です。従って

$$
\frac1n\sum_{k=1}^n(X_k-X_k')
=
\frac1n\sum_{k=1}^{N(\omega)-1}(X_k-X_k')
\to0.
$$

切断平均の極限と合わせて元の標本平均も $E[X_1]$ へ概収束します。
<!-- solution-end -->

---

## 10. 演習C

### F0-00P5A-C01 一般形のKronecker補題

- Level: C
- 目安時間: 30分

$(b_n)$ を正の単調増加数列で $b_n\to\infty$ とし、実数列 $(a_n)$ について

$$
\sum_{n=1}^{\infty}\frac{a_n}{b_n}
$$

が収束するとする。このとき

$$
\boxed{
\frac1{b_n}\sum_{k=1}^na_k\to0
}
$$

を示せ。特に $b_n=n$ とすれば本章の Kronecker補題が得られる。

<!-- solution-start -->
#### 詳細解答

部分和を

$$
s_n:=\sum_{k=1}^n\frac{a_k}{b_k},
\qquad
s_0:=0
$$

と置きます。仮定から $s_n\to s$ となる $s\in\mathbb R$ が存在します。

差を取ると

$$
\frac{a_k}{b_k}=s_k-s_{k-1},
\qquad
a_k=b_k(s_k-s_{k-1}).
$$

従って有限和を整理して

$$
\begin{aligned}
\sum_{k=1}^na_k
&=
\sum_{k=1}^nb_ks_k
-
\sum_{k=1}^nb_ks_{k-1}\\
&=
b_ns_n
-
\sum_{k=1}^{n-1}(b_{k+1}-b_k)s_k.
\end{aligned}
$$

よって

$$
\frac1{b_n}\sum_{k=1}^na_k
=
s_n
-
\frac1{b_n}
\sum_{k=1}^{n-1}(b_{k+1}-b_k)s_k.
$$

第2項が $s$ へ収束することを示します。重み

$$
w_{n,k}:=\frac{b_{k+1}-b_k}{b_n}\ge0
$$

と置くと

$$
\sum_{k=1}^{n-1}w_{n,k}
=
\frac{b_n-b_1}{b_n}
\to1.
$$

さらに固定した $K$ について

$$
\sum_{k=1}^{K-1}w_{n,k}|s_k-s|
=
\frac1{b_n}
\sum_{k=1}^{K-1}(b_{k+1}-b_k)|s_k-s|
\to0
$$

です。

$\varepsilon>0$ を固定し、$K$ を十分大きく取って $k\ge K$ なら $|s_k-s|<\varepsilon$ とします。すると

$$
\begin{aligned}
\left|
\sum_{k=1}^{n-1}w_{n,k}s_k
-
s\sum_{k=1}^{n-1}w_{n,k}
\right|
&\le
\sum_{k=1}^{K-1}w_{n,k}|s_k-s|
+
\sum_{k=K}^{n-1}w_{n,k}|s_k-s|\\
&\le
\sum_{k=1}^{K-1}w_{n,k}|s_k-s|
+\varepsilon\sum_{k=K}^{n-1}w_{n,k}.
\end{aligned}
$$

$n$ をさらに十分大きくすれば第1項も $\varepsilon$ 未満になり、重みの総和は1以下なので左辺は $2\varepsilon$ 未満です。$\varepsilon$ は任意だから

$$
\frac1{b_n}
\sum_{k=1}^{n-1}(b_{k+1}-b_k)s_k
\to s.
$$

一方 $s_n\to s$ なので

$$
\frac1{b_n}\sum_{k=1}^na_k
\to s-s=0.
$$

$b_n=n$ とすると $b_{k+1}-b_k=1$ となり、本章の Kronecker補題がそのまま得られます。
<!-- solution-end -->

---

## 次に進む

有限4次モーメント、有限分散、有限平均という三つの強大数則ルートがつながりました。次は分布収束と特性関数を扱う [F0-00P6 特性関数・分布収束](../F0_00P6_特性関数_中心極限定理/index.md) へ進みます。
