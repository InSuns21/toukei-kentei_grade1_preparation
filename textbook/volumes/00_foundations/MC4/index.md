# MC4 Monte Carlo IV：粗い近似を再利用する Multilevel Monte Carlo

MC1 では Monte Carlo 推定量の標本分散が標本数に反比例すること、さらに離散近似 $Q_h$ を使うと

$$
\text{二乗平均誤差}
=
\text{離散化バイアスの二乗}
+
\text{標本分散}
$$

へ分かれることを確認しました。MC3 では、期待値を変えずに確率変数の作り方を変えて分散を下げる方法を学びました。

ここで、離散化を伴う数値モデルのように「細かい近似ほど1標本が高価」という状況を考えます。最も細かい近似だけを何万回も計算するのは、精度は高くても費用が重い設計です。

Multilevel Monte Carlo 法（以下 MLMC）は、最も細かい近似の期待値を

$$
\boxed{
\text{粗い近似}
+
\text{隣接レベル間の小さな補正の和}
}
$$

へ分解します。

粗い近似は安いので多く標本を取り、細かい補正は高い代わりに分散が小さくなるように**結合**して少数だけ標本を取ります。

本章の核心は三つです。

1. 期待値を望遠鏡和で分解する。
2. 隣接レベルを強く結合し、差の分散を小さくする。
3. 各レベルの「分散」と「1標本費用」を見て標本数を配る。

単に「複数の解像度を使う」だけでは MLMC にはなりません。細かいレベルと粗いレベルの差が小さくなる同時分布を設計できることが、MC3 の分散減少法から引き継ぐ本質です。

---

## 0. 最も細かい近似だけを平均するとなぜ高いのか

真に知りたい量を $E[Q]$ とし、レベル $\ell$ の近似を

$$
Q_0,Q_1,\ldots,Q_L
$$

とします。$\ell$ が大きいほど近似は細かく、一般に

$$
|E[Q-Q_\ell]|
\longrightarrow
0
$$

ですが、1標本を計算する費用は増えます。

最も細かい $Q_L$ だけを $N$ 回独立に計算する単一レベル Monte Carlo では、

$$
\widehat Q_L^{\mathrm{SL}}
=
\frac1N\sum_{i=1}^NQ_L^{(i)}
$$

を使います。

$Q_L$ の分散がレベルによらず定数程度なら、標本分散を $\varepsilon^2$ 程度へ下げるためには

$$
N
\asymp
\varepsilon^{-2}
$$

個の標本が必要です。

一方、バイアスを $\varepsilon$ 程度へ下げるために非常に細かい $L$ が必要なら、その高価な計算を $\varepsilon^{-2}$ 回繰り返すことになります。

MLMC はここを変えます。

---

## 1. 望遠鏡和：細かい期待値を補正の和へ分解する

どんな確率変数列でも、期待値が存在すれば

$$
E[Q_L]
=
E[Q_0]
+
\sum_{\ell=1}^L
\left(
E[Q_\ell]-E[Q_{\ell-1}]
\right)
$$

です。

期待値の線形性から

$$
E[Q_\ell]-E[Q_{\ell-1}]
=
E[Q_\ell-Q_{\ell-1}]
$$

なので、

$$
\boxed{
E[Q_L]
=
E[Q_0]
+
\sum_{\ell=1}^L
E[Q_\ell-Q_{\ell-1}]
}
$$

と書けます。

この恒等式自体は単なる望遠鏡和です。MLMC の数値的な価値は、各差

$$
Q_\ell-Q_{\ell-1}
$$

を**小さな分散で生成する**ところにあります。

---

## 2. 隣接レベルを同時に作って差を小さくする

同じ $Q_\ell$ と $Q_{\ell-1}$ でも、別々の乱数で独立に生成するか、同じ基礎乱数から一緒に生成するかで、差の分散は大きく変わります。

<a id="def-mc4-level-coupling"></a>
<!-- formal-statement-start -->
### 定義（レベル間結合）

レベル $\ell\ge1$ について、確率変数の組

$$
\left(
Q_\ell^{(c)},
Q_{\ell-1}^{(c)}
\right)
$$

を考える。

それぞれの周辺分布が、本来の $Q_\ell$ と $Q_{\ell-1}$ の分布に一致するように同時分布を選ぶことを**レベル間結合**という。

MLMC では特に、

$$
Y_\ell
=
Q_\ell^{(c)}-Q_{\ell-1}^{(c)}
$$

の分散

$$
V_\ell
=
\operatorname{Var}(Y_\ell)
$$

が小さくなる結合を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mc4-level-coupling -->
**定義の確認：同じ一様乱数を二つの解像度で量子化する**

$U\sim\operatorname{Unif}(0,1)$ とし、

$$
\delta_\ell
=
2^{-(\ell+1)},
\qquad
Q_\ell(U)
=
\delta_\ell
\left\lfloor
\frac{U}{\delta_\ell}
\right\rfloor
$$

とします。

$Q_\ell$ は $U$ を幅 $\delta_\ell$ の区間の左端へ丸めた近似です。

同じ $U$ を使って

$$
\left(
Q_\ell(U),
Q_{\ell-1}(U)
\right)
$$

を作れば、それぞれの周辺分布は正しいままです。

しかも、一つの粗い区間を二つの細かい区間へ分けると、

$$
Q_\ell(U)-Q_{\ell-1}(U)
=
\begin{cases}
0, & U\text{ が粗い区間の前半にあるとき},\\
\delta_\ell, & U\text{ が粗い区間の後半にあるとき}.
\end{cases}
$$

二つの場合はそれぞれ確率 $1/2$ なので、差は細かいレベルほど小さくなります。
<!-- definition-example-end -->

この例を少し計算しておきます。

$m_\ell=2^{\ell+1}$ とすると、$Q_\ell$ は

$$
0,\frac1{m_\ell},\ldots,\frac{m_\ell-1}{m_\ell}
$$

をそれぞれ確率 $1/m_\ell$ で取ります。

したがって

$$
E[Q_\ell]
=
\frac1{m_\ell}
\sum_{k=0}^{m_\ell-1}\frac{k}{m_\ell}
=
\frac{m_\ell-1}{2m_\ell}
=
\frac12-2^{-(\ell+2)}.
$$

真の量を $Q=U$ とすれば

$$
E[Q]=\frac12
$$

なので、バイアスは

$$
E[Q_\ell-Q]
=
-2^{-(\ell+2)}.
$$

一方、結合したレベル補正は $\ell\ge1$ で

$$
Y_\ell
=
Q_\ell(U)-Q_{\ell-1}(U)
$$

とすると、

$$
P(Y_\ell=0)=P(Y_\ell=\delta_\ell)=\frac12.
$$

よって

$$
E[Y_\ell]
=
\frac{\delta_\ell}{2}
=
2^{-(\ell+2)}
$$

で、

$$
\begin{aligned}
V_\ell
&=
\operatorname{Var}(Y_\ell)
\\
&=
\delta_\ell^2
\operatorname{Var}
\left(
\boldsymbol1_{\{\text{粗い区間の後半}\}}
\right)
\\
&=
\frac{\delta_\ell^2}{4}
\\
&=
\boxed{
2^{-2\ell-4}
}.
\end{aligned}
$$

$\ell=0$ では $Y_0=Q_0$ とすれば、

$$
Q_0
=
\begin{cases}
0, & U<1/2,\\
1/2, & U\ge1/2,
\end{cases}
$$

なので

$$
V_0=\frac1{16},
$$

これも $2^{-2\ell-4}$ の式に一致します。

この例ではレベルを1つ細かくするたび、補正分散は $1/4$ になります。

---

## 3. MLMC 推定量

レベル補正を

$$
Y_0=Q_0,
\qquad
Y_\ell
=
Q_\ell^{(c)}-Q_{\ell-1}^{(c)}
\quad(\ell\ge1)
$$

とします。

各レベルで標本数を変えられることが MLMC の重要な自由度です。

<a id="def-mc4-mlmc-estimator"></a>
<!-- formal-statement-start -->
### 定義（Multilevel Monte Carlo 推定量）

各レベル $\ell=0,\ldots,L$ で、

$$
Y_\ell^{(1)},\ldots,Y_\ell^{(N_\ell)}
$$

を $Y_\ell$ の独立同分布な標本とする。

さらに異なるレベルで使う標本集合も互いに独立とする。

レベル平均を

$$
\widehat Y_\ell
=
\frac1{N_\ell}
\sum_{i=1}^{N_\ell}
Y_\ell^{(i)}
$$

とし、

$$
\boxed{
\widehat Q_L^{\mathrm{ML}}
=
\sum_{\ell=0}^L
\widehat Y_\ell
}
$$

を **Multilevel Monte Carlo 推定量**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mc4-mlmc-estimator -->
**定義の確認**

$L=2$ なら、

$$
\widehat Q_2^{\mathrm{ML}}
=
\frac1{N_0}\sum_{i=1}^{N_0}Q_0^{(i)}
+
\frac1{N_1}\sum_{i=1}^{N_1}
\left(
Q_1^{(i)}-Q_0^{(i)}
\right)
+
\frac1{N_2}\sum_{i=1}^{N_2}
\left(
Q_2^{(i)}-Q_1^{(i)}
\right).
$$

ここで各括弧内の二つは結合して生成しますが、異なる $i$ や異なるレベルの標本集合は独立にします。

期待値だけを見ると中間レベルが消えて $E[Q_2]$ が残ります。しかし標本数は $N_0,N_1,N_2$ と別々に選べます。
<!-- definition-example-end -->

<a id="thm-mc4-mlmc-expectation-variance"></a>
<!-- formal-statement-start -->
### 定理（MLMC 推定量の期待値と分散）

各 $Y_\ell$ が二乗可積分で、

$$
V_\ell
=
\operatorname{Var}(Y_\ell)
$$

とする。

上の定義どおり、各レベル内の標本が独立同分布であり、異なるレベルの標本集合も独立なら、

$$
\boxed{
E[
\widehat Q_L^{\mathrm{ML}}
]
=
E[Q_L]
}
$$

であり、

$$
\boxed{
\operatorname{Var}
(
\widehat Q_L^{\mathrm{ML}}
)
=
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

期待値では各レベル平均を元の $E[Y_\ell]$ へ戻し、望遠鏡和を使います。分散では、異なるレベルが独立だから共分散項が消えることが核心です。

<!-- proof-start -->
### 証明

各レベル平均について

$$
E[\widehat Y_\ell]
=
E[Y_\ell].
$$

したがって

$$
\begin{aligned}
E[
\widehat Q_L^{\mathrm{ML}}
]
&=
\sum_{\ell=0}^L
E[Y_\ell]
\\
&=
E[Q_0]
+
\sum_{\ell=1}^L
\left(
E[Q_\ell]-E[Q_{\ell-1}]
\right)
\\
&=
E[Q_L].
\end{aligned}
$$

次に各レベル内では独立同分布なので、

$$
\operatorname{Var}(\widehat Y_\ell)
=
\frac{V_\ell}{N_\ell}.
$$

さらに異なるレベルの標本集合は独立だから、

$$
\operatorname{Cov}
(
\widehat Y_\ell,\widehat Y_k
)
=
0
\qquad
(\ell\ne k).
$$

従って和の分散は

$$
\begin{aligned}
\operatorname{Var}
(
\widehat Q_L^{\mathrm{ML}}
)
&=
\sum_{\ell=0}^L
\operatorname{Var}(\widehat Y_\ell)
\\
&=
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}.
\end{aligned}
$$

これで結論が得られます。$\square$
<!-- proof-end -->

ここで重要なのは、**レベル内の二つの近似は強く依存させ、レベル平均どうしは独立にする**という二種類の依存関係を混同しないことです。

- $Q_\ell^{(c)}$ と $Q_{\ell-1}^{(c)}$：差の分散を下げるため依存させる。
- $\widehat Y_\ell$ と $\widehat Y_k$：分散を単純加算できるよう独立な標本集合で作る。

---

## 4. 結合を外すと何が壊れるか

前節の量子化例で、今度は独立な

$$
U,V\sim\operatorname{Unif}(0,1)
$$

を使い、

$$
\widetilde Y_\ell
=
Q_\ell(U)-Q_{\ell-1}(V)
$$

とします。

期待値は

$$
E[\widetilde Y_\ell]
=
E[Q_\ell]-E[Q_{\ell-1}]
$$

なので、望遠鏡和の正しさ自体は壊れません。

しかし独立性から

$$
\operatorname{Var}(\widetilde Y_\ell)
=
\operatorname{Var}(Q_\ell)
+
\operatorname{Var}(Q_{\ell-1}).
$$

$m$ 個の等間隔値

$$
0,\frac1m,\ldots,\frac{m-1}{m}
$$

を一様に取る確率変数の分散は

$$
\frac{m^2-1}{12m^2}
$$

なので、

$$
\operatorname{Var}(Q_\ell)
=
\frac{
1-2^{-2\ell-2}
}{12}.
$$

従って

$$
\operatorname{Var}(\widetilde Y_\ell)
=
\frac{
2-2^{-2\ell-2}-2^{-2\ell}
}{12}
\longrightarrow
\frac16.
$$

同じ $U$ を使った結合では

$$
V_\ell
=
2^{-2\ell-4}
\longrightarrow0
$$

だったのに、独立にすると差の分散は0へ近づきません。

つまり

$$
\boxed{
\text{望遠鏡和だけでは不十分で、差を小さくする結合が必要}
}
$$

です。

---

## 5. 真の期待値に対する誤差：バイアスと標本分散

MLMC 推定量は $E[Q_L]$ には不偏ですが、一般には真の $E[Q]$ には不偏ではありません。

<a id="prop-mc4-mlmc-mse"></a>
<!-- formal-statement-start -->
### 命題（MLMC の二乗平均誤差分解）

真の対象 $E[Q]$ に対して、MLMC 推定量が

$$
E[
\widehat Q_L^{\mathrm{ML}}
]
=
E[Q_L]
$$

を満たすとする。

このとき

$$
\boxed{
E\left[
\left(
\widehat Q_L^{\mathrm{ML}}-E[Q]
\right)^2
\right]
=
\left(
E[Q_L-Q]
\right)^2
+
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

MC1 のバイアス・分散分解をそのまま使い、MLMC 推定量の分散へ前節の公式を代入します。

<!-- proof-start -->
### 証明

一般に確率変数 $Z$ と定数 $\theta$ について

$$
E[(Z-\theta)^2]
=
\operatorname{Var}(Z)
+
(E[Z]-\theta)^2
$$

です。

ここで

$$
Z=\widehat Q_L^{\mathrm{ML}},
\qquad
\theta=E[Q]
$$

とすると、

$$
E[Z]-\theta
=
E[Q_L]-E[Q]
=
E[Q_L-Q].
$$

また前定理から

$$
\operatorname{Var}(Z)
=
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}.
$$

二つを代入すれば結論です。$\square$
<!-- proof-end -->

この分解から設計手順が明確になります。

目標を

$$
E\left[
\left(
\widehat Q_L^{\mathrm{ML}}-E[Q]
\right)^2
\right]
\le
\varepsilon^2
$$

とするなら、例えば

$$
\left|
E[Q_L-Q]
\right|
\le
\frac{\varepsilon}{\sqrt2}
$$

と

$$
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
\le
\frac{\varepsilon^2}{2}
$$

を別々に満たせば十分です。

前者は最終レベル $L$ の選択、後者は各レベル標本数 $N_\ell$ の選択です。

---

## 6. どのレベルに何標本置くか

レベル $\ell$ の補正 $Y_\ell$ を1標本生成する平均費用を

$$
C_\ell>0
$$

とします。

総費用は

$$
\mathcal C
=
\sum_{\ell=0}^L
N_\ell C_\ell.
$$

標本分散の許容値を $\eta^2$ とし、

$$
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
\le
\eta^2
$$

の下で総費用を最小にしたいとします。

<a id="thm-mc4-optimal-allocation"></a>
<!-- formal-statement-start -->
### 定理（費用最小化のための最適標本配分）

$V_\ell>0$、$C_\ell>0$ とし、まず $N_\ell$ を正の実数として連続緩和する。

$$
S_L
=
\sum_{\ell=0}^L
\sqrt{V_\ell C_\ell}
$$

とおく。

分散制約

$$
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
\le
\eta^2
$$

の下で総費用

$$
\sum_{\ell=0}^L
N_\ell C_\ell
$$

を最小にする配分は

$$
\boxed{
N_\ell^\ast
=
\frac{S_L}{\eta^2}
\sqrt{
\frac{V_\ell}{C_\ell}
}
}
$$

であり、最小費用は

$$
\boxed{
\mathcal C_{\min}
=
\frac{S_L^2}{\eta^2}
}.
$$

整数標本数が必要なら

$$
N_\ell
=
\left\lceil N_\ell^\ast\right\rceil
$$

とすれば、分散制約は保たれる。
<!-- formal-statement-end -->

### 証明の見取り図

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)を、

$$
\sqrt{\frac{V_\ell}{N_\ell}}
\quad\text{と}\quad
\sqrt{N_\ell C_\ell}
$$

へ適用します。等号条件がそのまま最適標本配分を与えます。

<!-- proof-start -->
### 証明

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)より、

$$
\begin{aligned}
S_L^2
&=
\left(
\sum_{\ell=0}^L
\sqrt{
\frac{V_\ell}{N_\ell}
}
\sqrt{
N_\ell C_\ell
}
\right)^2
\\
&\le
\left(
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
\right)
\left(
\sum_{\ell=0}^L
N_\ell C_\ell
\right).
\end{aligned}
$$

分散制約を使うと

$$
S_L^2
\le
\eta^2\mathcal C,
$$

従って

$$
\mathcal C
\ge
\frac{S_L^2}{\eta^2}.
$$

等号が成り立つには、上の不等式の等号条件から、ある定数 $a>0$ が存在して

$$
\sqrt{
\frac{V_\ell}{N_\ell}
}
=
a
\sqrt{
N_\ell C_\ell
}
$$

となればよいです。

両辺を二乗すると

$$
\frac{V_\ell}{N_\ell}
=
a^2N_\ell C_\ell,
$$

したがって

$$
N_\ell
=
\frac1a
\sqrt{
\frac{V_\ell}{C_\ell}
}.
$$

分散制約を等号で満たすように定数を決めます。

$$
\begin{aligned}
\eta^2
&=
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
\\
&=
a
\sum_{\ell=0}^L
\sqrt{V_\ell C_\ell}
\\
&=
aS_L.
\end{aligned}
$$

よって

$$
a=\frac{\eta^2}{S_L},
$$

したがって

$$
N_\ell^\ast
=
\frac{S_L}{\eta^2}
\sqrt{
\frac{V_\ell}{C_\ell}
}.
$$

これを総費用へ代入すると

$$
\begin{aligned}
\mathcal C
&=
\sum_{\ell=0}^L
\frac{S_L}{\eta^2}
\sqrt{
\frac{V_\ell}{C_\ell}
}
C_\ell
\\
&=
\frac{S_L}{\eta^2}
\sum_{\ell=0}^L
\sqrt{V_\ell C_\ell}
\\
&=
\frac{S_L^2}{\eta^2}.
\end{aligned}
$$

最後に $N_\ell^\ast$ を切り上げると各 $N_\ell$ は小さくならないため、

$$
\frac{V_\ell}{N_\ell}
\le
\frac{V_\ell}{N_\ell^\ast}
$$

です。従って分散制約は保たれます。$\square$
<!-- proof-end -->

最適配分の形

$$
N_\ell^\ast
\propto
\sqrt{\frac{V_\ell}{C_\ell}}
$$

は直感的です。

- 分散 $V_\ell$ が大きいレベルには多く標本を置く。
- 1標本費用 $C_\ell$ が高いレベルには少なく標本を置く。

MLMC では通常、粗いレベルは安いが分散が大きく、細かいレベルは高いが補正分散が小さくなります。その釣り合いをこの式が自動的に取ります。

---

## 7. 三つの率が計算量を決める

MLMC の漸近的な効率は、バイアス・レベル分散・費用の三つの率で整理できます。

<a id="def-mc4-rate-exponents"></a>
<!-- formal-statement-start -->
### 定義（MLMC の率指数）

定数 $c_1,c_2,c_3>0$ と指数

$$
\alpha>0,
\qquad
\beta\ge0,
\qquad
\gamma>0
$$

があり、全レベル $\ell$ で

$$
|E[Q-Q_\ell]|
\le
c_1 2^{-\alpha\ell},
$$

$$
V_\ell
\le
c_2 2^{-\beta\ell},
$$

$$
C_\ell
\le
c_3 2^{\gamma\ell}
$$

が成り立つとする。

このとき $\alpha$ を**バイアス率**、$\beta$ を**レベル分散減衰率**、$\gamma$ を**レベル費用増加率**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mc4-rate-exponents -->
**定義の確認：量子化例**

前の量子化近似では

$$
|E[U-Q_\ell]|
=
2^{-(\ell+2)}
=
\frac14\,2^{-\ell},
$$

なので $\alpha=1$ と取れます。

また

$$
V_\ell
=
2^{-2\ell-4}
=
\frac1{16}\,2^{-2\ell}
$$

なので $\beta=2$ です。

ここで実際の床関数計算の費用ではなく、「解像度を2倍にすると仕事量も2倍になる数値計算」を模した費用モデルとして

$$
C_\ell=2^\ell
$$

を置けば $\gamma=1$ です。

したがってこの教材用モデルは

$$
(\alpha,\beta,\gamma)
=
(1,2,1)
$$

です。
<!-- definition-example-end -->

$\beta$ が大きいほど結合した差の分散は速く小さくなります。$\gamma$ が大きいほど細かいレベルは速く高価になります。

両者の大小が MLMC の計算量を決めます。

<a id="thm-mc4-complexity"></a>
<!-- formal-statement-start -->
### 定理（MLMC の計算量評価）

上の率指数の仮定を満たし、

$$
\alpha
\ge
\frac12
\min(\beta,\gamma)
$$

とする。

任意の十分小さい $\varepsilon>0$ に対し、最終レベル $L$ と整数標本数 $N_0,\ldots,N_L$ を適切に選べば、

$$
E\left[
\left(
\widehat Q_L^{\mathrm{ML}}-E[Q]
\right)^2
\right]
\le
\varepsilon^2
$$

を満たし、総費用は次の次数で抑えられる。

$$
\boxed{
\mathcal C_{\mathrm{ML}}
=
\begin{cases}
O(\varepsilon^{-2}),
& \beta>\gamma,\\[4pt]
O\!\left(
\varepsilon^{-2}
(\log \varepsilon^{-1})^2
\right),
& \beta=\gamma,\\[4pt]
O\!\left(
\varepsilon^{-2-(\gamma-\beta)/\alpha}
\right),
& \beta<\gamma.
\end{cases}
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず $L$ を選んでバイアスを $\varepsilon/\sqrt2$ 以下にします。次に標本分散へ $\varepsilon^2/2$ を割り当て、最適標本配分の費用

$$
\frac2{\varepsilon^2}
\left(
\sum_{\ell=0}^L
\sqrt{V_\ell C_\ell}
\right)^2
$$

を評価します。

平方根の積は

$$
\sqrt{V_\ell C_\ell}
\lesssim
2^{(\gamma-\beta)\ell/2}
$$

なので、残るのは有限等比和の三つの場合分けです。

<!-- proof-start -->
### 証明

バイアスについて

$$
|E[Q-Q_L]|
\le
c_1 2^{-\alpha L}
$$

です。

したがって $L$ を

$$
c_1 2^{-\alpha L}
\le
\frac{\varepsilon}{\sqrt2}
$$

を満たす最小の整数に取れば、バイアスの二乗は $\varepsilon^2/2$ 以下です。

この選択から

$$
L
=
O(\log \varepsilon^{-1})
$$

です。

次に標本分散の許容値を

$$
\eta^2
=
\frac{\varepsilon^2}{2}
$$

とします。

連続緩和での最適費用は前定理から

$$
\mathcal C_{\mathrm{cont}}
=
\frac{2}{\varepsilon^2}
S_L^2,
$$

ただし

$$
S_L
=
\sum_{\ell=0}^L
\sqrt{V_\ell C_\ell}.
$$

率の仮定より

$$
\sqrt{V_\ell C_\ell}
\le
\sqrt{c_2c_3}\,
2^{(\gamma-\beta)\ell/2}.
$$

したがって

$$
S_L
\le
\sqrt{c_2c_3}
\sum_{\ell=0}^L
2^{(\gamma-\beta)\ell/2}.
$$

ここで三つに分けます。

#### 1. $\beta>\gamma$

比

$$
2^{(\gamma-\beta)/2}
$$

は1より小さいので、有限等比和は $L$ によらず一定値で抑えられます。

従って

$$
S_L=O(1)
$$

であり、

$$
\mathcal C_{\mathrm{cont}}
=
O(\varepsilon^{-2}).
$$

#### 2. $\beta=\gamma$

各項が定数なので

$$
S_L
=
O(L).
$$

$L=O(\log\varepsilon^{-1})$ より

$$
\mathcal C_{\mathrm{cont}}
=
O\!\left(
\varepsilon^{-2}
(\log\varepsilon^{-1})^2
\right).
$$

#### 3. $\beta<\gamma$

有限等比和は最終項と同じ次数なので

$$
S_L
=
O\!\left(
2^{(\gamma-\beta)L/2}
\right).
$$

よって

$$
\mathcal C_{\mathrm{cont}}
=
O\!\left(
\varepsilon^{-2}
2^{(\gamma-\beta)L}
\right).
$$

バイアス条件から

$$
2^L
=
O(\varepsilon^{-1/\alpha})
$$

なので、

$$
\mathcal C_{\mathrm{cont}}
=
O\!\left(
\varepsilon^{-2-(\gamma-\beta)/\alpha}
\right).
$$

最後に整数化を確認します。

各

$$
N_\ell^\ast
$$

を切り上げると、余分な費用は高々

$$
\sum_{\ell=0}^LC_\ell
=
O(2^{\gamma L})
=
O(\varepsilon^{-\gamma/\alpha})
$$

です。

仮定

$$
\alpha
\ge
\frac12\min(\beta,\gamma)
$$

により、この整数化費用は上の三つの主要評価より高い次数にはなりません。

従って整数標本数でも同じ計算量次数が得られます。

バイアス二乗と標本分散をそれぞれ $\varepsilon^2/2$ 以下にしたので、二乗平均誤差は $\varepsilon^2$ 以下です。$\square$
<!-- proof-end -->

この定理の読み方は単純です。

$$
\boxed{
\beta>\gamma
}
$$

なら、細かいレベルで費用が増える速さより、補正分散が小さくなる速さの方が勝っています。その場合、MLMC は標準的な Monte Carlo の理想的な $\varepsilon^{-2}$ 次数を保てます。

---

## 8. 量子化モデルで単一レベルと MLMC を比較する

量子化例では

$$
(\alpha,\beta,\gamma)
=
(1,2,1).
$$

したがって

$$
\beta>\gamma
$$

なので、MLMC の総費用は

$$
O(\varepsilon^{-2})
$$

です。

一方、単一レベル Monte Carlo では、バイアスを $O(\varepsilon)$ にするため

$$
2^{-L}
\asymp
\varepsilon
$$

とし、

$$
C_L
=
2^L
\asymp
\varepsilon^{-1}
$$

程度の最終レベル費用が必要です。

$Q_L$ の分散は

$$
\operatorname{Var}(Q_L)
=
\frac{
1-2^{-2L-2}
}{12}
$$

で、$L$ を大きくしても0にはなりません。

したがって標本分散を $O(\varepsilon^2)$ にするには

$$
N
=
O(\varepsilon^{-2})
$$

標本が必要で、総費用は

$$
\boxed{
O(\varepsilon^{-3})
}
$$

です。

この教材用モデルでは

$$
\boxed{
\text{単一レベル } \varepsilon^{-3}
\quad\longrightarrow\quad
\text{MLMC } \varepsilon^{-2}
}
$$

と1段階改善します。

ただし、この改善は前節の結合を使った

$$
V_\ell
\asymp
2^{-2\ell}
$$

があって初めて成立します。

独立に差を取ると $V_\ell$ は定数程度で、実質的に $\beta=0$ です。$\gamma=1$、$\alpha=1$ なら計算量は

$$
\varepsilon^{-3}
$$

程度へ戻り、MLMC の利点が失われます。

---

## 9. 実装では何を推定するか

理論では $V_\ell$ と $C_\ell$ が既知のように書きましたが、実際には多くの場合未知です。

典型的には少数の予備標本を各レベルで生成し、

$$
\widehat V_\ell
$$

と平均計算時間

$$
\widehat C_\ell
$$

を見積もります。

その後、

$$
N_\ell
\propto
\sqrt{
\frac{
\widehat V_\ell
}{
\widehat C_\ell
}
}
$$

で追加標本数を配ります。

ここで注意すべき点は三つです。

### 9.1 バイアスは標本分散とは別問題

$N_\ell$ を増やしても

$$
E[Q_L-Q]
$$

は減りません。

バイアスが大きければ、最終レベル $L$ 自体を増やす必要があります。

### 9.2 細かいレベルの分散が本当に下がっているかを見る

理論上よい結合を作ったつもりでも、実装ミスやモデルの不連続性で

$$
V_\ell
$$

が期待ほど下がらないことがあります。

$\ell$ に対する $\log V_\ell$ の傾きを確認することは、MLMC の実装診断そのものです。

### 9.3 費用は「細かい解を1回」の費用だけではない

レベル補正

$$
Q_\ell^{(c)}-Q_{\ell-1}^{(c)}
$$

を作るには、結合した細かい計算と粗い計算の両方が必要です。

したがって $C_\ell$ は**補正1標本全体の費用**として測ります。

---

## 10. MC3 との対応を一枚で整理する

MC3 の分散減少法では、同じ期待値を保ちながら分散を下げました。

MLMC でも同じ視点が使われています。

### 対称変量法

同じ周辺分布を持つ二つを負に相関させ、

$$
\operatorname{Var}
\left(
\frac{Y+Y'}2
\right)
$$

を下げました。

### MLMC

正しい周辺分布を持つ隣接近似を強く結合し、

$$
\operatorname{Var}
(
Q_\ell-Q_{\ell-1}
)
$$

を下げます。

違うのは、MLMC ではさらに望遠鏡和によって

$$
E[Q_L]
$$

そのものをレベル別期待値へ分解し、各レベルに別の標本数を割り当てる点です。

したがって MLMC は

$$
\boxed{
\text{結合による分散減少}
+
\text{望遠鏡和}
+
\text{費用最適化}
}
$$

として理解できます。

---

# 演習

## Level A

### MC4-A01 望遠鏡和と期待値

$Q_0,Q_1,Q_2,Q_3$ が可積分で、

$$
E[Q_0]=1.00,
\qquad
E[Q_1]=1.40,
\qquad
E[Q_2]=1.55,
\qquad
E[Q_3]=1.60
$$

とする。

1. 各レベル補正の期待値
   $$
   E[Y_0],E[Y_1],E[Y_2],E[Y_3]
   $$
   を求めよ。
2. それらの和が $E[Q_3]$ に一致することを確認せよ。
3. 各補正を正しく推定する限り、隣接レベルの結合方法が期待値の望遠鏡和を変えない理由を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1. 定義から

$$
Y_0=Q_0
$$

なので

$$
E[Y_0]
=
\boxed{1.00}.
$$

また $\ell\ge1$ では

$$
E[Y_\ell]
=
E[Q_\ell]-E[Q_{\ell-1}].
$$

従って

$$
E[Y_1]
=
1.40-1.00
=
\boxed{0.40},
$$

$$
E[Y_2]
=
1.55-1.40
=
\boxed{0.15},
$$

$$
E[Y_3]
=
1.60-1.55
=
\boxed{0.05}.
$$

2. 和を取ると

$$
1.00+0.40+0.15+0.05
=
\boxed{1.60}
=
E[Q_3].
$$

3. 結合で変えるのは $Q_\ell$ と $Q_{\ell-1}$ の**同時分布**です。

それぞれの周辺分布を保つ限り、

$$
E[
Q_\ell^{(c)}
]
=
E[Q_\ell],
\qquad
E[
Q_{\ell-1}^{(c)}
]
=
E[Q_{\ell-1}]
$$

です。

したがって

$$
E[
Q_\ell^{(c)}-Q_{\ell-1}^{(c)}
]
=
E[Q_\ell]-E[Q_{\ell-1}]
$$

であり、望遠鏡和の期待値は変わりません。

結合が変える主な量は

$$
\operatorname{Var}
(
Q_\ell^{(c)}-Q_{\ell-1}^{(c)}
)
$$

です。
<!-- solution-end -->

### MC4-A02 二進量子化のバイアスとレベル分散

$U\sim\operatorname{Unif}(0,1)$ とし、

$$
\delta_\ell=2^{-(\ell+1)},
\qquad
Q_\ell
=
\delta_\ell
\left\lfloor
\frac{U}{\delta_\ell}
\right\rfloor.
$$

1. $E[Q_\ell]$ を求めよ。
2. $Q=U$ としてバイアス $E[Q_\ell-Q]$ を求めよ。
3. 同じ $U$ を使って
   $$
   Y_\ell=Q_\ell-Q_{\ell-1}
   $$
   としたとき、$\ell\ge1$ で $Y_\ell$ の分布を求めよ。
4. $V_\ell=\operatorname{Var}(Y_\ell)$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1. $m_\ell=2^{\ell+1}$ と置きます。

$Q_\ell$ は

$$
0,\frac1{m_\ell},\ldots,\frac{m_\ell-1}{m_\ell}
$$

を等確率で取るので、

$$
\begin{aligned}
E[Q_\ell]
&=
\frac1{m_\ell}
\sum_{k=0}^{m_\ell-1}
\frac{k}{m_\ell}
\\
&=
\frac{
m_\ell(m_\ell-1)/2
}{
m_\ell^2
}
\\
&=
\frac12-\frac1{2m_\ell}.
\end{aligned}
$$

$m_\ell=2^{\ell+1}$ を代入して

$$
\boxed{
E[Q_\ell]
=
\frac12-2^{-(\ell+2)}
}.
$$

2.

$$
E[Q]
=
E[U]
=
\frac12
$$

なので、

$$
\boxed{
E[Q_\ell-Q]
=
-2^{-(\ell+2)}
}.
$$

3. 粗い1区間の長さは $2\delta_\ell$ です。

その前半では細かい左端と粗い左端が一致するので

$$
Y_\ell=0.
$$

後半では細かい左端が粗い左端より $\delta_\ell$ だけ大きいので

$$
Y_\ell=\delta_\ell.
$$

一様分布だから二つの場合は等確率で、

$$
\boxed{
P(Y_\ell=0)
=
P(Y_\ell=\delta_\ell)
=
\frac12
}.
$$

4. $Y_\ell=\delta_\ell B$、$B\sim\operatorname{Bernoulli}(1/2)$ と書けます。

したがって

$$
\operatorname{Var}(B)
=
\frac14
$$

より

$$
\begin{aligned}
V_\ell
&=
\delta_\ell^2\frac14
\\
&=
2^{-2(\ell+1)}\frac14
\\
&=
\boxed{
2^{-2\ell-4}
}.
\end{aligned}
$$
<!-- solution-end -->

### MC4-A03 レベル別分散と費用を集計する

3レベル $\ell=0,1,2$ について

$$
(V_0,V_1,V_2)
=
\left(
1,\frac14,\frac1{16}
\right),
$$

$$
(C_0,C_1,C_2)
=
(1,2,4)
$$

とする。

標本数を

$$
(N_0,N_1,N_2)
=
(100,50,25)
$$

とした。

1. MLMC 推定量の標本分散を求めよ。
2. 総費用を求めよ。
3. 各レベルの標本分散への寄与 $V_\ell/N_\ell$ を比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1. MLMC 推定量の標本分散は

$$
\sum_{\ell=0}^2
\frac{V_\ell}{N_\ell}
$$

です。

各項は

$$
\frac{V_0}{N_0}
=
\frac1{100},
$$

$$
\frac{V_1}{N_1}
=
\frac{1/4}{50}
=
\frac1{200},
$$

$$
\frac{V_2}{N_2}
=
\frac{1/16}{25}
=
\frac1{400}.
$$

従って

$$
\operatorname{Var}
(
\widehat Q_2^{\mathrm{ML}}
)
=
\frac4{400}
+
\frac2{400}
+
\frac1{400}
=
\boxed{
\frac7{400}
}.
$$

2. 総費用は

$$
\begin{aligned}
\mathcal C
&=
100\cdot1
+
50\cdot2
+
25\cdot4
\\
&=
100+100+100
\\
&=
\boxed{300}.
\end{aligned}
$$

3. 寄与は

$$
\boxed{
\frac1{100},
\quad
\frac1{200},
\quad
\frac1{400}
}
$$

です。

この配分では各レベルの**費用寄与**は同じ100ですが、分散寄与は粗いレベルほど大きくなっています。最適配分は単に各レベル費用を等しくする規則ではありません。
<!-- solution-end -->

### MC4-A04 バイアス予算から最終レベルを選ぶ

ある近似階層が

$$
|E[Q-Q_L]|
\le
2^{-L}
$$

を満たすとする。

二乗平均誤差の目標を

$$
\varepsilon=0.1
$$

とし、バイアス二乗へ全誤差予算の半分を割り当てる。

1. 必要な条件を $L$ の不等式で書け。
2. その条件を満たす最小の整数 $L$ を求めよ。
3. 残りの標本分散へ許される上限を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1. バイアス二乗へ半分を割り当てるので、

$$
|E[Q-Q_L]|
\le
\frac{\varepsilon}{\sqrt2}
$$

とすれば十分です。

仮定を使うと

$$
2^{-L}
\le
\frac{0.1}{\sqrt2}
\approx
0.07071.
$$

2.

$$
2^{-3}
=
0.125
$$

では大きすぎます。

一方、

$$
2^{-4}
=
0.0625
<
0.07071.
$$

したがって最小の整数は

$$
\boxed{L=4}.
$$

3. 全二乗平均誤差予算は

$$
\varepsilon^2
=
0.01.
$$

その半分を標本分散へ割り当てるので、

$$
\boxed{
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
\le
0.005
}.
$$
<!-- solution-end -->

## Level B

### MC4-B01 MLMC 推定量の期待値と分散を証明する

$Y_0=Q_0$、

$$
Y_\ell
=
Q_\ell^{(c)}-Q_{\ell-1}^{(c)}
\qquad
(\ell\ge1)
$$

とする。

各レベルで $N_\ell$ 個の独立同分布標本を平均し、異なるレベルの標本集合も独立とする。

1. MLMC 推定量の期待値が $E[Q_L]$ になることを証明せよ。
2. 分散が
   $$
   \sum_{\ell=0}^L
   \frac{V_\ell}{N_\ell}
   $$
   になることを証明せよ。
3. 異なるレベルを独立にしない場合、分散公式に何が追加されるか説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

1. レベル平均を

$$
\widehat Y_\ell
=
\frac1{N_\ell}
\sum_{i=1}^{N_\ell}
Y_\ell^{(i)}
$$

とします。

独立性は期待値には不要で、

$$
E[\widehat Y_\ell]
=
E[Y_\ell]
$$

です。

従って

$$
\begin{aligned}
E[
\widehat Q_L^{\mathrm{ML}}
]
&=
\sum_{\ell=0}^L
E[\widehat Y_\ell]
\\
&=
E[Q_0]
+
\sum_{\ell=1}^L
\left(
E[Q_\ell]-E[Q_{\ell-1}]
\right)
\\
&=
\boxed{
E[Q_L]
}.
\end{aligned}
$$

2. 各レベル内では独立同分布なので、

$$
\operatorname{Var}(\widehat Y_\ell)
=
\frac{V_\ell}{N_\ell}.
$$

さらに異なるレベルの標本集合も独立なので、

$$
\operatorname{Cov}
(
\widehat Y_\ell,\widehat Y_k
)
=
0
\qquad(\ell\ne k).
$$

したがって

$$
\begin{aligned}
\operatorname{Var}
(
\widehat Q_L^{\mathrm{ML}}
)
&=
\operatorname{Var}
\left(
\sum_{\ell=0}^L
\widehat Y_\ell
\right)
\\
&=
\sum_{\ell=0}^L
\operatorname{Var}(\widehat Y_\ell)
\\
&=
\boxed{
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
}.
\end{aligned}
$$

3. 独立でなければ、和の分散公式から

$$
2
\sum_{0\le\ell<k\le L}
\operatorname{Cov}
(
\widehat Y_\ell,\widehat Y_k
)
$$

が追加されます。

したがって単純なレベル別分散の加算は使えません。
<!-- solution-end -->

### MC4-B02 Cauchy--Schwarz の不等式から最適標本配分を導く

$V_\ell>0$、$C_\ell>0$ とし、

$$
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
\le
\eta^2
$$

の下で

$$
\sum_{\ell=0}^L
N_\ell C_\ell
$$

を最小化する。

$N_\ell$ は正の実数としてよい。

1. [Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から費用の下限を導け。
2. 等号条件から $N_\ell$ の比例関係を求めよ。
3. 分散制約を等号で満たす定数まで求めよ。
4. 最小費用を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

1.

$$
S_L
=
\sum_{\ell=0}^L
\sqrt{V_\ell C_\ell}
$$

と置きます。

各項を

$$
\sqrt{V_\ell C_\ell}
=
\sqrt{
\frac{V_\ell}{N_\ell}
}
\sqrt{
N_\ell C_\ell
}
$$

と分けます。

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)より、

$$
S_L^2
\le
\left(
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
\right)
\left(
\sum_{\ell=0}^L
N_\ell C_\ell
\right).
$$

分散制約から

$$
S_L^2
\le
\eta^2\mathcal C
$$

なので、

$$
\boxed{
\mathcal C
\ge
\frac{S_L^2}{\eta^2}
}.
$$

2. 上の不等式の等号条件より、ある $a>0$ に対して

$$
\sqrt{
\frac{V_\ell}{N_\ell}
}
=
a
\sqrt{
N_\ell C_\ell
}
$$

となればよいです。

二乗して整理すると

$$
N_\ell
=
\frac1a
\sqrt{
\frac{V_\ell}{C_\ell}
}.
$$

従って

$$
\boxed{
N_\ell
\propto
\sqrt{
\frac{V_\ell}{C_\ell}
}
}.
$$

3. 上の式を分散制約へ代入すると

$$
\begin{aligned}
\eta^2
&=
\sum_{\ell=0}^L
\frac{V_\ell}{
(1/a)\sqrt{V_\ell/C_\ell}
}
\\
&=
a
\sum_{\ell=0}^L
\sqrt{V_\ell C_\ell}
\\
&=
aS_L.
\end{aligned}
$$

したがって

$$
a=\frac{\eta^2}{S_L}.
$$

よって

$$
\boxed{
N_\ell^\ast
=
\frac{S_L}{\eta^2}
\sqrt{
\frac{V_\ell}{C_\ell}
}
}.
$$

4. これを総費用へ代入すると

$$
\begin{aligned}
\mathcal C_{\min}
&=
\sum_{\ell=0}^L
\frac{S_L}{\eta^2}
\sqrt{
\frac{V_\ell}{C_\ell}
}
C_\ell
\\
&=
\frac{S_L}{\eta^2}
\sum_{\ell=0}^L
\sqrt{V_\ell C_\ell}
\\
&=
\boxed{
\frac{S_L^2}{\eta^2}
}.
\end{aligned}
$$
<!-- solution-end -->

### MC4-B03 三つの計算量ケースを導く

次を仮定する。

$$
|E[Q-Q_\ell]|
\le
c_1 2^{-\alpha\ell},
$$

$$
V_\ell
\le
c_2 2^{-\beta\ell},
$$

$$
C_\ell
\le
c_3 2^{\gamma\ell}.
$$

バイアス条件から

$$
L=O(\log\varepsilon^{-1})
$$

が選ばれているとする。

1. 
   $$
   S_L
   =
   \sum_{\ell=0}^L
   \sqrt{V_\ell C_\ell}
   $$
   を有限等比和で上から評価せよ。
2. $\beta>\gamma$、$\beta=\gamma$、$\beta<\gamma$ の各場合に連続緩和した MLMC 費用の次数を導け。
3. $\beta>\gamma$ が何を意味するか、分散減少と費用増加の競争として説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

1. 仮定から

$$
\sqrt{V_\ell C_\ell}
\le
\sqrt{c_2c_3}
2^{(\gamma-\beta)\ell/2}.
$$

従って

$$
S_L
\le
\sqrt{c_2c_3}
\sum_{\ell=0}^L
2^{(\gamma-\beta)\ell/2}.
$$

右辺は公比

$$
r
=
2^{(\gamma-\beta)/2}
$$

の有限等比和です。

2. 標本分散へ $\varepsilon^2/2$ を割り当てると、連続緩和した最適費用は

$$
\mathcal C_{\mathrm{cont}}
=
\frac2{\varepsilon^2}S_L^2.
$$

**$\beta>\gamma$ の場合**

$r<1$ なので $S_L$ は一定値で抑えられ、

$$
\boxed{
\mathcal C_{\mathrm{cont}}
=
O(\varepsilon^{-2})
}.
$$

**$\beta=\gamma$ の場合**

$r=1$ なので

$$
S_L
=
O(L)
=
O(\log\varepsilon^{-1}).
$$

従って

$$
\boxed{
\mathcal C_{\mathrm{cont}}
=
O\!\left(
\varepsilon^{-2}
(\log\varepsilon^{-1})^2
\right)
}.
$$

**$\beta<\gamma$ の場合**

$r>1$ なので和は最終項と同じ次数で、

$$
S_L
=
O\!\left(
2^{(\gamma-\beta)L/2}
\right).
$$

またバイアス条件から

$$
2^L
=
O(\varepsilon^{-1/\alpha})
$$

なので、

$$
S_L^2
=
O\!\left(
\varepsilon^{-(\gamma-\beta)/\alpha}
\right).
$$

従って

$$
\boxed{
\mathcal C_{\mathrm{cont}}
=
O\!\left(
\varepsilon^{-2-(\gamma-\beta)/\alpha}
\right)
}.
$$

3. $\beta>\gamma$ は、レベルを1段細かくしたとき

- 補正分散 $V_\ell$ が減る速さ
- 1標本費用 $C_\ell$ が増える速さ

を比べ、前者の方が速いことを意味します。

そのため

$$
\sqrt{V_\ell C_\ell}
$$

は細かいレベルほど小さくなり、高価な細かいレベルが総費用を支配しません。
<!-- solution-end -->

## Level C

### MC4-C01 結合・率指数・単一レベル比較を一つにまとめる

$U\sim\operatorname{Unif}(0,1)$ とし、

$$
Q=U,
$$

$$
Q_\ell(U)
=
2^{-(\ell+1)}
\left\lfloor
2^{\ell+1}U
\right\rfloor.
$$

レベル補正1標本の費用モデルを

$$
C_\ell=2^\ell
$$

とする。

1. $|E[Q-Q_\ell]|$ から $\alpha$ を求めよ。
2. 同じ $U$ を使って隣接レベルを結合したとき、$V_\ell$ から $\beta$ を求めよ。
3. 費用モデルから $\gamma$ を求め、MLMC の計算量次数を求めよ。
4. 最終レベルだけを使う単一レベル Monte Carlo の計算量次数を求めよ。
5. 独立な $U,V$ を使って
   $$
   \widetilde Y_\ell
   =
   Q_\ell(U)-Q_{\ell-1}(V)
   $$
   としたとき、レベル差の分散が0へ行かないことを示せ。
6. 5の独立結合では、なぜ 3 の MLMC 改善が失われるか説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

1. すでに

$$
E[Q_\ell]
=
\frac12-2^{-(\ell+2)}
$$

であり、

$$
E[Q]
=
\frac12
$$

です。

従って

$$
|E[Q-Q_\ell]|
=
2^{-(\ell+2)}
=
\frac14\,2^{-\ell}.
$$

よって

$$
\boxed{\alpha=1}.
$$

2. 同じ $U$ で結合すると、$\ell\ge1$ で

$$
Y_\ell
=
\begin{cases}
0, & \text{確率 }1/2,\\
2^{-(\ell+1)}, & \text{確率 }1/2.
\end{cases}
$$

です。

したがって

$$
V_\ell
=
\frac14
2^{-2(\ell+1)}
=
\frac1{16}2^{-2\ell}.
$$

よって

$$
\boxed{\beta=2}.
$$

3.

$$
C_\ell
=
2^\ell
$$

なので

$$
\boxed{\gamma=1}.
$$

従って

$$
\beta>\gamma.
$$

MLMC 計算量評価から

$$
\boxed{
\mathcal C_{\mathrm{ML}}
=
O(\varepsilon^{-2})
}.
$$

4. 単一レベルではバイアスを $O(\varepsilon)$ にするため

$$
2^{-L}
\asymp
\varepsilon,
$$

したがって

$$
2^L
\asymp
\varepsilon^{-1}.
$$

1標本費用は

$$
C_L
=
2^L
\asymp
\varepsilon^{-1}.
$$

一方、

$$
\operatorname{Var}(Q_L)
=
\frac{
1-2^{-2L-2}
}{12}
$$

は $L\to\infty$ で $1/12$ へ近づくため、標本分散を $O(\varepsilon^2)$ にするには

$$
N
=
O(\varepsilon^{-2})
$$

標本が必要です。

従って総費用は

$$
\boxed{
\mathcal C_{\mathrm{SL}}
=
O(\varepsilon^{-3})
}.
$$

5. $U,V$ は独立なので、

$$
\operatorname{Var}(\widetilde Y_\ell)
=
\operatorname{Var}(Q_\ell(U))
+
\operatorname{Var}(Q_{\ell-1}(V)).
$$

$m$ 個の等間隔値

$$
0,\frac1m,\ldots,\frac{m-1}{m}
$$

を等確率で取る確率変数の分散は

$$
\frac{m^2-1}{12m^2}.
$$

従って

$$
\operatorname{Var}(Q_\ell)
=
\frac{
1-2^{-2\ell-2}
}{12},
$$

$$
\operatorname{Var}(Q_{\ell-1})
=
\frac{
1-2^{-2\ell}
}{12}.
$$

よって

$$
\operatorname{Var}(\widetilde Y_\ell)
=
\frac{
2-2^{-2\ell-2}-2^{-2\ell}
}{12}
\longrightarrow
\boxed{\frac16}.
$$

したがって差の分散は0へ行きません。

6. 同じ $U$ を使った結合では

$$
V_\ell
\asymp
2^{-2\ell}
$$

で $\beta=2$ でした。

独立にすると

$$
V_\ell
\asymp
1
$$

で、実質的に

$$
\beta=0
$$

です。

一方、$\alpha=1$、$\gamma=1$ は変わりません。

$\beta<\gamma$ の計算量式へ入れると

$$
2+\frac{\gamma-\beta}{\alpha}
=
2+\frac{1-0}{1}
=
3.
$$

したがって

$$
\mathcal C
=
O(\varepsilon^{-3})
$$

となり、単一レベルと同じ次数へ戻ります。

つまり MLMC の改善は「望遠鏡和を使ったから」ではなく、

$$
\boxed{
\text{隣接レベルを結合し、補正分散を速く減衰させたから}
}
$$

得られたものです。
<!-- solution-end -->

---

## 11. まとめ

本章では、最も細かい近似だけを大量に平均する代わりに、

$$
E[Q_L]
=
E[Q_0]
+
\sum_{\ell=1}^L
E[Q_\ell-Q_{\ell-1}]
$$

と分解しました。

さらに、

$$
\operatorname{Var}
(
\widehat Q_L^{\mathrm{ML}}
)
=
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
$$

と

$$
N_\ell^\ast
\propto
\sqrt{
\frac{V_\ell}{C_\ell}
}
$$

を導き、各レベルの分散と費用を同時に見て標本数を配ることを確認しました。

最後に、

$$
|E[Q-Q_\ell]|
\sim
2^{-\alpha\ell},
\qquad
V_\ell
\sim
2^{-\beta\ell},
\qquad
C_\ell
\sim
2^{\gamma\ell}
$$

という三つの率から、MLMC の計算量が決まることを示しました。

特に覚えるべき機構は

$$
\boxed{
\text{細かい近似そのものを安くするのではなく、}
\quad
\text{細かい補正を小さな分散で推定する}
}
$$

ことです。

これで Monte Carlo 系列 MC1–MC4 は一通り閉じます。次の QMC1 からは、独立乱数の標本平均とは別の方向へ進み、点集合の一様性と積分誤差を結び付ける準 Monte Carlo 法を扱います。
