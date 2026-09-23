# MC3 Monte Carlo III：期待値を保ってばらつきを減らす

MC1 では、独立同分布な標本から作る Monte Carlo 推定量の分散が

$$
\operatorname{Var}(\widehat I_N)
=
\frac{\sigma^2}{N}
$$

となり、二乗平均平方根誤差が $N^{-1/2}$ でしか減らないことを確認しました。MC2 では、その標本を疑似乱数から再現可能に生成する方法を扱いました。

ここで次の問いが生じます。

> 標本数を増やす以外に、同じ期待値を推定しながら分散そのものを小さくできないか。

本章ではこの問いに対する四つの標準的な答えを扱います。

- 同じ一様乱数から反対向きに動く標本を組にする。
- 平均が既知の補助変数で変動を差し引く。
- 標本空間を部分領域へ分け、それぞれから必ず標本を取る。
- 標本を引く密度そのものを変え、密度比で補正する。

共通する考え方は、

$$
\boxed{
\text{推定対象の期待値は保つ}
\quad+\quad
\text{確率変数の作り方を変えて分散を下げる}
}
$$

です。

ただし「分散が下がる」という言葉だけでは不十分です。追加計算が必要な方法では、同じ関数評価回数・同じ計算時間で比較しなければなりません。本章では各手法について、どの量が不偏性を保証し、どの共分散・条件付き分散・重みが分散を決めるのかを式で追います。

---

## 0. 期待値を保ったまま分散を下げる

<a id="def-mc3-variance-reduction"></a>
<!-- formal-statement-start -->
### 定義（分散減少法）

$E[Y]=I$ を推定したいとする。

同じ $I$ を期待値に持つ別の確率変数または推定量 $Z$ を構成し、

$$
E[Z]=I
$$

を保ちながら、

$$
\operatorname{Var}(Z)
<
\operatorname{Var}(Y)
$$

または同じ計算予算で得られる推定量の分散を小さくする方法を、**分散減少法**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mc3-variance-reduction -->
**定義の確認**

$U\sim\operatorname{Unif}(0,1)$ とし、$Y=U$ とします。すると

$$
E[Y]=\frac12,
\qquad
\operatorname{Var}(Y)=\frac1{12}.
$$

一方、

$$
Z
=
\frac{U+(1-U)}2
=
\frac12
$$

とすれば

$$
E[Z]=\frac12=E[Y],
\qquad
\operatorname{Var}(Z)=0<\operatorname{Var}(Y).
$$

したがって $Z$ は、期待値を保ったまま分散を小さくした最小の分散減少例です。
<!-- definition-example-end -->

この定義で重要なのは、推定対象 $I$ を勝手に変えないことです。

たとえば $Y$ を単純に $Y/10$ にすれば分散は $1/100$ になりますが、期待値まで $I/10$ に変わるので分散減少法ではありません。

また、1回の推定に必要な計算量が変わる場合には、1標本あたりの分散だけでなく計算費用も比較します。

1回の独立な複製に費用 $c$、分散 $v$ がかかるとします。総予算を $B$ とすれば、おおよそ $B/c$ 回の複製を平均できるので、その分散は

$$
\frac{v}{B/c}
=
\frac{cv}{B}
$$

です。

したがって同じ予算で比較するときの基本量は

$$
\boxed{cv}
$$

です。分散を半分にしても費用が3倍なら、総予算一定では改善とは限りません。

---

## 1. 反対向きに動く二標本を組にする

$U\sim\operatorname{Unif}(0,1)$ とし、

$$
I=E[h(U)]
$$

を推定したいとします。

$1-U$ も同じ一様分布に従います。そこで $h(U)$ と $h(1-U)$ を組にします。

<a id="def-mc3-antithetic-variates"></a>
<!-- formal-statement-start -->
### 定義（対称変量法）

$U_1,\ldots,U_N$ を独立な $\operatorname{Unif}(0,1)$ とする。

$$
A_i
=
\frac{
h(U_i)+h(1-U_i)
}{2}
$$

を作り、

$$
\widehat I_N^{\mathrm{anti}}
=
\frac1N
\sum_{i=1}^N A_i
$$

で $I=E[h(U)]$ を推定する方法を**対称変量法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mc3-antithetic-variates -->
**定義の確認**

$h(u)=u$ とすると、

$$
A_i
=
\frac{U_i+(1-U_i)}2
=
\frac12.
$$

$U_i$ と $1-U_i$ はどちらも一様分布に従いますが、同じ $U_i$ から作るため独立ではありません。この組では二つの変動が完全に打ち消され、

$$
E[A_i]=\frac12,
\qquad
\operatorname{Var}(A_i)=0
$$

となります。
<!-- definition-example-end -->

一つの組は関数評価を2回使います。したがって比較相手は、同じ $2N$ 回の関数評価を使う通常 Monte Carlo

$$
\widehat I_{2N}^{\mathrm{ind}}
=
\frac1{2N}
\sum_{j=1}^{2N}h(V_j)
$$

です。

<a id="prop-mc3-antithetic-variance"></a>
<!-- formal-statement-start -->
### 命題（対称変量推定量の不偏性と分散）

$E[h(U)^2]<\infty$ とし、

$$
\sigma^2
=
\operatorname{Var}(h(U)),
\qquad
\gamma
=
\operatorname{Cov}(h(U),h(1-U))
$$

とする。

このとき

$$
E[\widehat I_N^{\mathrm{anti}}]
=
I
$$

であり、

$$
\operatorname{Var}
(\widehat I_N^{\mathrm{anti}})
=
\frac{\sigma^2+\gamma}{2N}.
$$

同じ $2N$ 回の関数評価を使う独立標本平均の分散は

$$
\operatorname{Var}
(\widehat I_{2N}^{\mathrm{ind}})
=
\frac{\sigma^2}{2N}
$$

だから、対称変量法が改善するための条件は

$$
\boxed{\gamma<0}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

不偏性は $U$ と $1-U$ が同じ一様分布に従うことから出ます。分散は和の分散公式を展開し、共分散 $\gamma$ が独立二標本との差を作ることを確認します。

<!-- proof-start -->
### 証明

$1-U$ も $\operatorname{Unif}(0,1)$ に従うため、

$$
E[h(1-U)]
=
E[h(U)]
=
I.
$$

従って

$$
E[A_i]
=
\frac{I+I}{2}
=
I.
$$

よって平均を取って

$$
E[\widehat I_N^{\mathrm{anti}}]
=
I.
$$

次に、

$$
\begin{aligned}
\operatorname{Var}(A_i)
&=
\frac14
\operatorname{Var}
\left(
h(U_i)+h(1-U_i)
\right)
\\
&=
\frac14
\left(
\sigma^2+\sigma^2+2\gamma
\right)
\\
&=
\frac{\sigma^2+\gamma}{2}.
\end{aligned}
$$

異なる $i$ の組は独立なので、

$$
\operatorname{Var}
(\widehat I_N^{\mathrm{anti}})
=
\frac1N
\operatorname{Var}(A_1)
=
\frac{\sigma^2+\gamma}{2N}.
$$

独立な $2N$ 標本なら MC1 から

$$
\operatorname{Var}
(\widehat I_{2N}^{\mathrm{ind}})
=
\frac{\sigma^2}{2N}.
$$

したがって対称変量法の分散が小さいことと

$$
\sigma^2+\gamma<\sigma^2
$$

は同値であり、これは $\gamma<0$ と同値です。$\square$
<!-- proof-end -->

ここで「対称にしたから必ず良い」のではありません。改善の本体は負の共分散です。

### 1.1 単調関数ではなぜ負の共分散になるのか

次の恒等式を使います。

$X,X'$ を独立同分布とすると、

$$
\operatorname{Cov}(f(X),g(X))
=
\frac12
E[
(f(X)-f(X'))
(g(X)-g(X'))
].
$$

実際、右辺を展開すると独立性から交差項が積の期待値へ分解され、

$$
\frac12
\left(
2E[f(X)g(X)]
-
2E[f(X)]E[g(X)]
\right)
$$

となります。

<a id="prop-mc3-antithetic-monotone"></a>
<!-- formal-statement-start -->
### 命題（単調関数に対する対称変量の負の共分散）

$h:[0,1]\to\mathbb R$ が単調非減少で $E[h(U)^2]<\infty$ とする。

このとき

$$
\operatorname{Cov}(h(U),h(1-U))
\le0.
$$

従って対称変量法は、同じ関数評価回数の独立 Monte Carlo より分散を大きくしない。
<!-- formal-statement-end -->

### 証明の見取り図

独立コピーを使う共分散恒等式へ、増加関数 $h(u)$ と減少関数 $h(1-u)$ を代入します。二つの差は常に逆符号なので、積の期待値も0以下になります。

<!-- proof-start -->
### 証明

$$
f(u)=h(u),
\qquad
g(u)=h(1-u)
$$

と置きます。

$h$ は単調非減少なので $f$ は単調非減少です。一方、$u$ が増えると $1-u$ は減るため、$g$ は単調非増加です。

従って任意の $u,v$ に対して

$$
(f(u)-f(v))(g(u)-g(v))
\le0.
$$

独立な $U,U'$ を入れて期待値を取れば、

$$
\operatorname{Cov}(h(U),h(1-U))
=
\frac12
E[
(f(U)-f(U'))
(g(U)-g(U'))
]
\le0.
$$

よって結論が従います。$\square$
<!-- proof-end -->

### 1.2 直接例：$E[U^2]$ を推定する

通常の一標本は

$$
Y=U^2
$$

で、

$$
E[Y]
=
\frac13,
\qquad
\operatorname{Var}(Y)
=
\frac4{45}.
$$

対称変量の一組は

$$
A
=
\frac{U^2+(1-U)^2}{2}
=
U^2-U+\frac12.
$$

期待値は

$$
E[A]
=
\frac13.
$$

また

$$
E[(U^2-U)^2]
=
\int_0^1
(x^4-2x^3+x^2)\,dx
=
\frac1{30},
$$

$$
E[U^2-U]
=
-\frac16
$$

だから、

$$
\operatorname{Var}(A)
=
\frac1{30}-\frac1{36}
=
\frac1{180}.
$$

同じ2回の関数評価を独立に使うと分散は

$$
\frac12\operatorname{Var}(U^2)
=
\frac2{45}.
$$

従って比は

$$
\frac{1/180}{2/45}
=
\frac18.
$$

この例では、同じ関数評価回数で分散が $1/8$ まで下がります。

---

## 2. 既知の期待値を持つ補助量で変動を差し引く

次は「一緒に動くが平均は分かっている量」を利用します。

$E[Y]=I$ を推定したいとし、$X$ は $Y$ と相関を持ち、

$$
E[X]=\mu_X
$$

が既知だとします。

<a id="def-mc3-control-variate"></a>
<!-- formal-statement-start -->
### 定義（制御変量法）

定数 $c$ に対して

$$
Z_c
=
Y-c(X-\mu_X)
$$

を作り、独立な複製 $Z_{c,1},\ldots,Z_{c,N}$ の平均で $I$ を推定する方法を**制御変量法**という。

$X$ を**制御変量**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mc3-control-variate -->
**定義の確認**

$U\sim\operatorname{Unif}(0,1)$ に対し

$$
Y=U^2,
\qquad
X=U,
\qquad
\mu_X=\frac12
$$

とします。たとえば $c=1$ を選べば

$$
Z_1
=
U^2-U+\frac12.
$$

このとき

$$
E[Z_1]
=
\frac13-\frac12+\frac12
=
\frac13
=
E[Y].
$$

既知の平均 $E[X]=1/2$ からのずれ $X-1/2$ を差し引いても、推定対象の期待値は変わりません。
<!-- definition-example-end -->

まず期待値を確認します。

$$
E[Z_c]
=
E[Y]-c(E[X]-\mu_X)
=
I.
$$

つまり $c$ をどう選んでも不偏性は保たれます。

では、どの $c$ が最もよいのでしょうか。

<a id="thm-mc3-optimal-control-variate"></a>
<!-- formal-statement-start -->
### 定理（最適制御変量係数）

$Y,X$ が二乗可積分で、

$$
\operatorname{Var}(X)>0
$$

とする。

$$
Z_c
=
Y-c(X-E[X])
$$

の分散は

$$
\operatorname{Var}(Z_c)
=
\operatorname{Var}(Y)
+
c^2\operatorname{Var}(X)
-
2c\operatorname{Cov}(Y,X)
$$

であり、これを最小にする係数は

$$
\boxed{
c^\ast
=
\frac{
\operatorname{Cov}(Y,X)
}{
\operatorname{Var}(X)
}
}.
$$

さらに $\operatorname{Var}(Y)>0$ とし、相関係数を $\rho$ とすると最小分散は

$$
\boxed{
\operatorname{Var}(Z_{c^\ast})
=
\operatorname{Var}(Y)(1-\rho^2)
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず $Z_c$ の分散を $c$ の二次式として展開します。その二次式を平方完成すれば、最小点 $c^\ast$ と最小値が同時に得られます。

<!-- proof-start -->
### 証明

定数 $E[X]$ は分散に影響しないので、

$$
\begin{aligned}
\operatorname{Var}(Z_c)
&=
\operatorname{Var}(Y-cX)
\\
&=
\operatorname{Var}(Y)
+
c^2\operatorname{Var}(X)
-
2c\operatorname{Cov}(Y,X).
\end{aligned}
$$

右辺を $c$ の平方完成で書くと、

$$
\begin{aligned}
\operatorname{Var}(Z_c)
&=
\operatorname{Var}(X)
\left(
c-
\frac{\operatorname{Cov}(Y,X)}
{\operatorname{Var}(X)}
\right)^2
\\
&\quad+
\operatorname{Var}(Y)
-
\frac{
\operatorname{Cov}(Y,X)^2
}{
\operatorname{Var}(X)
}.
\end{aligned}
$$

$\operatorname{Var}(X)>0$ なので第一項は $c=c^\ast$ で0になり、そこで最小です。

また

$$
\rho
=
\frac{
\operatorname{Cov}(Y,X)
}{
\sqrt{\operatorname{Var}(Y)\operatorname{Var}(X)}
}
$$

だから、

$$
\frac{
\operatorname{Cov}(Y,X)^2
}{
\operatorname{Var}(X)
}
=
\rho^2\operatorname{Var}(Y).
$$

従って

$$
\operatorname{Var}(Z_{c^\ast})
=
\operatorname{Var}(Y)(1-\rho^2).
$$

$\square$
<!-- proof-end -->

この式は制御変量法の設計原理をそのまま表しています。

$$
\boxed{
|\rho|\text{ が1に近いほど強い分散減少}
}
$$

です。

符号は問題ではありません。負の相関なら $c^\ast$ 自体が負になります。

### 2.1 直接例：$U^2$ に $U$ を制御変量として使う

$$
Y=U^2,
\qquad
X=U,
\qquad
U\sim\operatorname{Unif}(0,1)
$$

とします。

$$
E[X]
=
\frac12,
\qquad
\operatorname{Var}(X)
=
\frac1{12}.
$$

さらに

$$
\operatorname{Cov}(Y,X)
=
E[U^3]-E[U^2]E[U]
=
\frac14-\frac13\frac12
=
\frac1{12}.
$$

従って

$$
c^\ast
=
1.
$$

最適制御変量は

$$
Z
=
U^2-\left(U-\frac12\right)
=
U^2-U+\frac12.
$$

前節と同じ確率変数が現れ、

$$
E[Z]
=
\frac13,
\qquad
\operatorname{Var}(Z)
=
\frac1{180}.
$$

元の分散 $4/45$ と比べると

$$
\frac{1/180}{4/45}
=
\frac1{16}.
$$

一標本あたりでは $1/16$ まで下がります。

実際には $c^\ast$ が未知なことも多く、予備標本から係数を推定します。その場合、有限標本での厳密な不偏性や係数推定の費用は別途確認が必要です。本章の定理は $c$ を固定した場合の正確な分散公式です。

---

## 3. 母集団を分けて各部分を必ず観測する

通常 Monte Carlo では、標本が偶然ある領域へ偏ることがあります。

そこで標本空間をいくつかの部分へ分け、各部分から標本を取る設計を考えます。

$\Omega$ を互いに素な層

$$
A_1,\ldots,A_K
$$

へ分割し、

$$
p_k=P(X\in A_k)>0,
\qquad
\sum_{k=1}^Kp_k=1
$$

とします。

層 $k$ の条件付き分布から独立に

$$
Y_{k,1},\ldots,Y_{k,n_k}
$$

を生成し、

$$
\mu_k
=
E[Y\mid X\in A_k],
\qquad
\sigma_k^2
=
\operatorname{Var}(Y\mid X\in A_k)
$$

とします。

<a id="def-mc3-stratified-sampling"></a>
<!-- formal-statement-start -->
### 定義（層化抽出推定量）

各層の標本平均を

$$
\overline Y_k
=
\frac1{n_k}
\sum_{j=1}^{n_k}Y_{k,j}
$$

とし、

$$
\widehat I^{\mathrm{str}}
=
\sum_{k=1}^Kp_k\overline Y_k
$$

で

$$
I=E[Y]
$$

を推定する方法を**層化抽出**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mc3-stratified-sampling -->
**定義の確認**

$U\sim\operatorname{Unif}(0,1)$ を

$$
A_1=[0,1/2],
\qquad
A_2=(1/2,1]
$$

の二層へ分けます。各層の確率は

$$
p_1=p_2=\frac12.
$$

各層から1標本ずつ $Y_{1,1},Y_{2,1}$ を取るなら、層化推定量は

$$
\widehat I^{\mathrm{str}}
=
\frac12Y_{1,1}
+
\frac12Y_{2,1}.
$$

つまり各層を必ず観測し、その層が母集団で占める確率で重み付けする、という定義をそのまま実行しています。
<!-- definition-example-end -->

<a id="thm-mc3-stratified-variance"></a>
<!-- formal-statement-start -->
### 定理（層化抽出推定量の不偏性と分散）

異なる層で用いる標本集合が独立で、各層内では独立同分布とする。

このとき

$$
E[\widehat I^{\mathrm{str}}]
=
I
$$

であり、

$$
\boxed{
\operatorname{Var}(\widehat I^{\mathrm{str}})
=
\sum_{k=1}^K
\frac{p_k^2\sigma_k^2}{n_k}
}.
$$

特に比例配分

$$
n_k=Np_k
$$

が整数として可能なら、

$$
\operatorname{Var}(\widehat I^{\mathrm{str}})
=
\frac1N
\sum_{k=1}^Kp_k\sigma_k^2
\le
\frac{\operatorname{Var}(Y)}{N}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

不偏性は全期待値を層ごとに分解して確認します。分散は層間独立性から各層の分散を足し、比例配分の場合は全分散の分解に相当する式から通常 Monte Carlo 以下になることを示します。

<!-- proof-start -->
### 証明

全期待値を層ごとに分けると、

$$
I
=
E[Y]
=
\sum_{k=1}^Kp_k\mu_k.
$$

各層で

$$
E[\overline Y_k]
=
\mu_k
$$

だから、

$$
E[\widehat I^{\mathrm{str}}]
=
\sum_{k=1}^Kp_k\mu_k
=
I.
$$

次に異なる層の標本集合は独立なので、

$$
\begin{aligned}
\operatorname{Var}(\widehat I^{\mathrm{str}})
&=
\sum_{k=1}^K
p_k^2
\operatorname{Var}(\overline Y_k)
\\
&=
\sum_{k=1}^K
p_k^2
\frac{\sigma_k^2}{n_k}.
\end{aligned}
$$

比例配分 $n_k=Np_k$ なら、

$$
\operatorname{Var}(\widehat I^{\mathrm{str}})
=
\frac1N
\sum_{k=1}^Kp_k\sigma_k^2.
$$

一方、

$$
E[Y^2]
=
\sum_{k=1}^K
p_k
E[Y^2\mid A_k]
=
\sum_{k=1}^K
p_k(\sigma_k^2+\mu_k^2).
$$

従って

$$
\begin{aligned}
\operatorname{Var}(Y)
&=
E[Y^2]-I^2
\\
&=
\sum_{k=1}^Kp_k\sigma_k^2
+
\left(
\sum_{k=1}^Kp_k\mu_k^2
-
\left(\sum_{k=1}^Kp_k\mu_k\right)^2
\right).
\end{aligned}
$$

括弧内は、値 $\mu_k$ を確率 $p_k$ で取る確率変数の分散なので0以上です。

したがって

$$
\sum_{k=1}^Kp_k\sigma_k^2
\le
\operatorname{Var}(Y).
$$

よって比例配分した層化抽出は同じ総標本数の通常 Monte Carlo より分散を大きくしません。$\square$
<!-- proof-end -->

層化が効くのは、層ごとの平均 $\mu_k$ がかなり異なり、各層内部では変動が小さいときです。

### 3.1 最適配分

総標本数

$$
\sum_{k=1}^Kn_k=N
$$

を固定したまま

$$
\sum_{k=1}^K
\frac{p_k^2\sigma_k^2}{n_k}
$$

を小さくしたいとします。

正の実数として $n_k$ を扱えば、[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\left(
\sum_{k=1}^Kp_k\sigma_k
\right)^2
=
\left(
\sum_{k=1}^K
\frac{p_k\sigma_k}{\sqrt{n_k}}
\sqrt{n_k}
\right)^2
$$

$$
\le
\left(
\sum_{k=1}^K
\frac{p_k^2\sigma_k^2}{n_k}
\right)
\left(
\sum_{k=1}^Kn_k
\right).
$$

従って

$$
\sum_{k=1}^K
\frac{p_k^2\sigma_k^2}{n_k}
\ge
\frac{
\left(\sum_{k=1}^Kp_k\sigma_k\right)^2
}{N}.
$$

等号条件から

$$
\boxed{
n_k
\propto
p_k\sigma_k
}
$$

が最適です。

これは分散の大きい層へ多くの標本を配る規則です。実際には $\sigma_k$ が未知なことがあるので、予備標本による推定や丸めが必要です。

### 3.2 直接例：$E[U]$ を二層に分ける

$U\sim\operatorname{Unif}(0,1)$ とし、

$$
A_1=[0,1/2],
\qquad
A_2=(1/2,1]
$$

とします。

各層の確率は

$$
p_1=p_2=\frac12.
$$

各層内の一様分布の分散は、区間長が $1/2$ なので

$$
\sigma_1^2
=
\sigma_2^2
=
\frac{(1/2)^2}{12}
=
\frac1{48}.
$$

総標本数 $N$ を半分ずつ配ると、

$$
\operatorname{Var}
(\widehat I^{\mathrm{str}})
=
\frac1N
\left(
\frac12\frac1{48}
+
\frac12\frac1{48}
\right)
=
\frac1{48N}.
$$

通常 Monte Carlo では

$$
\frac{\operatorname{Var}(U)}{N}
=
\frac1{12N}.
$$

従って分散は $1/4$ になります。

---

## 4. よく効く領域を多く引き、密度比で補正する

最後は標本を引く分布そのものを変えます。

密度 $p$ に関する期待値

$$
I
=
\int f(x)p(x)\,dx
$$

を考えます。

別の密度 $q$ から標本を引き、

$$
p(x)
=
\frac{p(x)}{q(x)}q(x)
$$

と書けば、

$$
I
=
\int
f(x)
\frac{p(x)}{q(x)}
q(x)\,dx
$$

です。

ただし分母 $q(x)$ が0になる場所には注意が必要です。

<a id="def-mc3-importance-sampling"></a>
<!-- formal-statement-start -->
### 定義（重点サンプリング）

$f(x)p(x)\ne0$ となるほとんど全ての $x$ で

$$
q(x)>0
$$

となる提案密度 $q$ を取る。

$X_1,\ldots,X_N$ を $q$ から独立に生成し、

$$
W_i
=
f(X_i)
\frac{p(X_i)}{q(X_i)}
$$

として

$$
\widehat I_N^{\mathrm{IS}}
=
\frac1N\sum_{i=1}^NW_i
$$

で $I$ を推定する方法を**重点サンプリング**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mc3-importance-sampling -->
**定義の確認**

$$
I
=
\int_0^1x^2\,dx
$$

を考え、目標密度を $p(x)=1$、提案密度を

$$
q(x)=2x,
\qquad
0<x<1
$$

とします。

$X\sim q$ なら重み付き一標本は

$$
W
=
X^2\frac{p(X)}{q(X)}
=
\frac X2.
$$

さらに

$$
E_q[W]
=
\int_0^1
\frac{x}{2}(2x)\,dx
=
\int_0^1x^2\,dx
=
I.
$$

提案分布を変えても、密度比 $p/q$ が期待値を元へ戻していることを直接確認できます。
<!-- definition-example-end -->

<a id="thm-mc3-importance-sampling"></a>
<!-- formal-statement-start -->
### 定理（重点サンプリング推定量の不偏性と分散）

上の台条件を満たし、

$$
\int
\frac{f(x)^2p(x)^2}{q(x)}\,dx
<
\infty
$$

とする。

このとき

$$
E_q[
\widehat I_N^{\mathrm{IS}}
]
=
I
$$

であり、

$$
\boxed{
\operatorname{Var}_q
(\widehat I_N^{\mathrm{IS}})
=
\frac1N
\left[
\int
\frac{f(x)^2p(x)^2}{q(x)}\,dx
-
I^2
\right]
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

密度 $q$ の下で期待値を積分表示し、密度比 $p/q$ が $q$ を打ち消して元の積分へ戻すことを確認します。二次モーメントも同じ要領で計算すれば分散公式が得られます。

<!-- proof-start -->
### 証明

一標本 $W$ について、

$$
\begin{aligned}
E_q[W]
&=
\int
f(x)\frac{p(x)}{q(x)}q(x)\,dx
\\
&=
\int f(x)p(x)\,dx
\\
&=
I.
\end{aligned}
$$

従って標本平均も不偏です。

また

$$
\begin{aligned}
E_q[W^2]
&=
\int
f(x)^2
\frac{p(x)^2}{q(x)^2}
q(x)\,dx
\\
&=
\int
\frac{f(x)^2p(x)^2}{q(x)}\,dx.
\end{aligned}
$$

よって

$$
\operatorname{Var}_q(W)
=
\int
\frac{f(x)^2p(x)^2}{q(x)}\,dx
-
I^2.
$$

独立な $N$ 標本の平均なので分散を $N$ で割れば結論です。$\square$
<!-- proof-end -->

この公式から設計原理が見えます。

$f(x)^2p(x)^2$ が大きいところで $q(x)$ が小さすぎると、

$$
\frac{f(x)^2p(x)^2}{q(x)}
$$

が大きくなり、分散が悪化します。

したがって重点サンプリングは「珍しいところをたくさん引けばよい」というだけではなく、**重みの二乗モーメントまで制御する問題**です。

### 4.1 非負被積分関数の理想分布

$f\ge0$ かつ $I>0$ とします。

もし

$$
q^\ast(x)
=
\frac{f(x)p(x)}{I}
$$

を使えれば、

$$
f(X)
\frac{p(X)}{q^\ast(X)}
=
I
$$

が常に成り立ちます。

従って分散は0です。

もちろん $q^\ast$ を正規化するには未知の $I$ が必要なので、そのまま実用には使えません。それでも

$$
\boxed{
q(x)\text{ は }f(x)p(x)\text{ が大きい領域へ質量を寄せる}
}
$$

という設計原理を示します。

### 4.2 直接例：まれな事象を多く観測する

$U\sim\operatorname{Unif}(0,1)$ に対して

$$
I
=
P(U>0.99)
=
0.01
$$

を推定します。

通常 Monte Carlo では

$$
Y
=
\boldsymbol1_{\{U>0.99\}}
$$

だから、

$$
\operatorname{Var}(Y)
=
0.01(0.99)
=
0.0099.
$$

提案分布 $q$ を $[0.9,1]$ 上の一様分布とします。

その密度は

$$
q(x)=10,
\qquad
0.9\le x\le1.
$$

目標密度は $p(x)=1$ なので、重み付き一標本は

$$
W
=
\boldsymbol1_{\{X>0.99\}}
\frac1{10}
=
0.1
\boldsymbol1_{\{X>0.99\}}.
$$

$q$ の下では

$$
P_q(X>0.99)
=
\frac{0.01}{0.1}
=
0.1.
$$

従って

$$
E_q[W]
=
0.1\times0.1
=
0.01
$$

で不偏です。

また

$$
E_q[W^2]
=
0.01\times0.1
=
0.001
$$

だから、

$$
\operatorname{Var}_q(W)
=
0.001-0.01^2
=
0.0009.
$$

通常 Monte Carlo の $0.0099$ に対し、

$$
\frac{0.0009}{0.0099}
=
\frac1{11}.
$$

この例では一標本分散が $1/11$ になります。

### 4.3 反例：提案密度の選び方で分散は無限大にもなる

$$
I
=
\int_0^1 1\,dx
=
1
$$

を考えます。

目標密度を

$$
p(x)=1
$$

とし、提案密度を

$$
q(x)=2x,
\qquad
0<x<1
$$

とします。

一標本の重みは

$$
W
=
\frac1{2X}.
$$

期待値は

$$
E_q[W]
=
\int_0^1
\frac1{2x}2x\,dx
=
1
$$

で正しいです。

しかし二次モーメントは

$$
E_q[W^2]
=
\int_0^1
\frac1{4x^2}2x\,dx
=
\frac12
\int_0^1\frac1x\,dx
=
\infty.
$$

従って

$$
\boxed{
\operatorname{Var}_q(W)=\infty
}
$$

です。

失敗したのは不偏性ではありません。$x=0$ 近くで $q(x)$ が速く0へ近づき、重み $p/q$ が大きくなりすぎたため、二次モーメントが存在しなくなりました。

---

## 5. 四つの方法を同じ言葉で整理する

ここまでの方法は見た目が違いますが、分散公式を見ると役割が明確になります。

### 対称変量法

$$
\operatorname{Var}
\left(
\frac{Y+Y'}2
\right)
=
\frac{
\operatorname{Var}(Y)+\operatorname{Var}(Y')
+2\operatorname{Cov}(Y,Y')
}{4}.
$$

設計対象は

$$
\boxed{\operatorname{Cov}(Y,Y')}
$$

です。

### 制御変量法

$$
\operatorname{Var}(Y-cX)
=
\operatorname{Var}(Y)
+c^2\operatorname{Var}(X)
-2c\operatorname{Cov}(Y,X).
$$

設計対象は

$$
\boxed{
\operatorname{Cov}(Y,X)
\text{ と係数 }c
}
$$

です。

### 層化抽出

$$
\operatorname{Var}
(\widehat I^{\mathrm{str}})
=
\sum_k
\frac{p_k^2\sigma_k^2}{n_k}.
$$

設計対象は

$$
\boxed{
\text{層内分散 }\sigma_k^2
\text{ と配分 }n_k
}
$$

です。

### 重点サンプリング

$$
\operatorname{Var}_q(W)
=
\int
\frac{f^2p^2}{q}
-
I^2.
$$

設計対象は

$$
\boxed{
\text{提案密度 }q
}
$$

です。

つまり分散減少法は魔法の公式ではなく、

$$
\boxed{
\text{どの確率構造を設計可能か}
}
$$

を見つける技術です。

---

## 6. MC4 への接続：差を小さくする結合

次の MC4 では、近似レベル $h_0,h_1,\ldots$ に対して

$$
E[Q_{h_L}]
=
E[Q_{h_0}]
+
\sum_{\ell=1}^L
E[
Q_{h_\ell}-Q_{h_{\ell-1}}
]
$$

という望遠鏡和を使います。

そこで重要になるのは、単に $Q_{h_\ell}$ と $Q_{h_{\ell-1}}$ を別々に生成することではありません。同じ基礎乱数を使って二つを**結合**し、

$$
Q_{h_\ell}-Q_{h_{\ell-1}}
$$

の分散を小さくします。

これは本章の対称変量法と同じく、

$$
\boxed{
\text{周辺分布だけでなく、同時分布を設計して分散を下げる}
}
$$

という発想です。

MC3 で「相関を利用して分散を下げる」視点を作っておくと、MC4 の multilevel coupling が自然に読めます。

---

# 演習

## Level A

### MC3-A01 対称変量法の分散を計算する

$U\sim\operatorname{Unif}(0,1)$ とし、

$$
I=E[U^2]
$$

を推定する。

1. 通常の一標本 $Y=U^2$ の分散を求めよ。
2. 対称変量の一組
   $$
   A=\frac{U^2+(1-U)^2}{2}
   $$
   の期待値と分散を求めよ。
3. 同じ2回の関数評価を使う独立標本平均と分散を比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1.

$$
E[U^2]
=
\frac13,
\qquad
E[U^4]
=
\frac15.
$$

従って

$$
\operatorname{Var}(U^2)
=
\frac15-\frac19
=
\boxed{\frac4{45}}.
$$

2.

$$
A
=
U^2-U+\frac12.
$$

期待値は

$$
E[A]
=
\frac13-\frac12+\frac12
=
\boxed{\frac13}.
$$

また

$$
E[(U^2-U)^2]
=
\frac15-\frac12+\frac13
=
\frac1{30}.
$$

$$
E[U^2-U]
=
-\frac16
$$

なので、

$$
\operatorname{Var}(A)
=
\frac1{30}-\frac1{36}
=
\boxed{\frac1{180}}.
$$

3. 独立な $U_1,U_2$ を使う平均

$$
\frac{U_1^2+U_2^2}{2}
$$

の分散は

$$
\frac12\operatorname{Var}(U^2)
=
\boxed{\frac2{45}}.
$$

対称変量法との比は

$$
\frac{1/180}{2/45}
=
\boxed{\frac18}.
$$

従って同じ2回の関数評価で、対称変量法の分散は独立標本平均の $1/8$ です。
<!-- solution-end -->

### MC3-A02 最適制御変量係数を求める

$U\sim\operatorname{Unif}(0,1)$ とし、

$$
Y=U^2,
\qquad
X=U.
$$

$E[X]=1/2$ を既知とする。

1. $\operatorname{Cov}(Y,X)$ を求めよ。
2. 最適係数 $c^\ast$ を求めよ。
3. $Z=Y-c^\ast(X-1/2)$ の分散を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1.

$$
E[YX]
=
E[U^3]
=
\frac14.
$$

また

$$
E[Y]E[X]
=
\frac13\frac12
=
\frac16.
$$

従って

$$
\operatorname{Cov}(Y,X)
=
\frac14-\frac16
=
\boxed{\frac1{12}}.
$$

2.

$$
\operatorname{Var}(X)
=
\operatorname{Var}(U)
=
\frac1{12}.
$$

従って

$$
c^\ast
=
\frac{1/12}{1/12}
=
\boxed{1}.
$$

3.

$$
Z
=
U^2-U+\frac12.
$$

A01 と同じ計算から

$$
\boxed{
\operatorname{Var}(Z)
=
\frac1{180}
}.
$$

元の

$$
\operatorname{Var}(Y)
=
\frac4{45}
$$

に対する比は

$$
\frac{1/180}{4/45}
=
\boxed{\frac1{16}}.
$$
<!-- solution-end -->

### MC3-A03 二層の層化抽出

$U\sim\operatorname{Unif}(0,1)$ の平均 $E[U]$ を推定する。

層を

$$
A_1=[0,1/2],
\qquad
A_2=(1/2,1]
$$

とし、各層へ同数の標本を割り当てる。

総標本数を $N$ とする。

1. 各層の条件付き平均と条件付き分散を求めよ。
2. 層化推定量の分散を求めよ。
3. 通常 Monte Carlo の分散との比を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1. 一様分布 $\operatorname{Unif}(a,b)$ の平均と分散は

$$
\frac{a+b}{2},
\qquad
\frac{(b-a)^2}{12}
$$

です。

従って

$$
\mu_1
=
\frac14,
\qquad
\mu_2
=
\frac34.
$$

各層の区間長は $1/2$ なので、

$$
\sigma_1^2
=
\sigma_2^2
=
\frac{(1/2)^2}{12}
=
\boxed{\frac1{48}}.
$$

2. $p_1=p_2=1/2$ で、各層の標本数は $N/2$ です。

従って

$$
\begin{aligned}
\operatorname{Var}(\widehat I^{\mathrm{str}})
&=
\frac{(1/2)^2(1/48)}{N/2}
+
\frac{(1/2)^2(1/48)}{N/2}
\\
&=
\boxed{\frac1{48N}}.
\end{aligned}
$$

3. 通常 Monte Carlo では

$$
\operatorname{Var}(\overline U_N)
=
\frac{1/12}{N}
=
\frac1{12N}.
$$

したがって比は

$$
\frac{1/(48N)}{1/(12N)}
=
\boxed{\frac14}.
$$
<!-- solution-end -->

### MC3-A04 まれな事象の重点サンプリング

$$
I=P(U>0.99),
\qquad
U\sim\operatorname{Unif}(0,1)
$$

を考える。

提案分布を $[0.9,1]$ 上の一様分布とする。

1. 通常 Monte Carlo の一標本分散を求めよ。
2. 重点サンプリングの重み付き一標本 $W$ を書け。
3. $E_q[W]$ と $\operatorname{Var}_q(W)$ を求めよ。
4. 分散比を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1.

$$
I
=
0.01.
$$

通常の一標本は Bernoulli$(0.01)$ なので、

$$
\operatorname{Var}(Y)
=
0.01(1-0.01)
=
\boxed{0.0099}.
$$

2. 提案密度は

$$
q(x)=10,
\qquad
0.9\le x\le1.
$$

目標密度は $p(x)=1$ なので、

$$
W
=
\boldsymbol1_{\{X>0.99\}}
\frac{1}{10}
=
\boxed{
0.1\boldsymbol1_{\{X>0.99\}}
}.
$$

3. $q$ の下では

$$
P_q(X>0.99)
=
\frac{0.01}{0.1}
=
0.1.
$$

従って

$$
E_q[W]
=
0.1\cdot0.1
=
\boxed{0.01}.
$$

また

$$
E_q[W^2]
=
0.1^2\cdot0.1
=
0.001.
$$

したがって

$$
\operatorname{Var}_q(W)
=
0.001-0.01^2
=
\boxed{0.0009}.
$$

4.

$$
\frac{0.0009}{0.0099}
=
\boxed{\frac1{11}}.
$$
<!-- solution-end -->

## Level B

### MC3-B01 単調性から対称変量の分散減少を証明する

$U,U'$ を独立な $\operatorname{Unif}(0,1)$ とし、$h$ は単調非減少で二乗可積分とする。

1. 一般の二乗可積分な $f,g$ について
   $$
   \operatorname{Cov}(f(U),g(U))
   =
   \frac12
   E[
   (f(U)-f(U'))
   (g(U)-g(U'))
   ]
   $$
   を示せ。
2. $f(u)=h(u)$、$g(u)=h(1-u)$ として共分散が0以下であることを示せ。
3. 対称変量法が同じ関数評価回数の独立 Monte Carlo より分散を大きくしないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

1. 右辺を展開します。

$$
\begin{aligned}
&\frac12
E[
(f(U)-f(U'))
(g(U)-g(U'))
]
\\
&=
\frac12
\{
E[f(U)g(U)]
-E[f(U)g(U')]
\\
&\qquad
-E[f(U')g(U)]
+E[f(U')g(U')]
\}.
\end{aligned}
$$

$U,U'$ は独立同分布なので、

$$
E[f(U)g(U')]
=
E[f(U)]E[g(U)]
$$

であり、同様に

$$
E[f(U')g(U)]
=
E[f(U)]E[g(U)].
$$

また

$$
E[f(U')g(U')]
=
E[f(U)g(U)].
$$

従って右辺は

$$
E[f(U)g(U)]
-
E[f(U)]E[g(U)]
$$

となり、

$$
\boxed{
\operatorname{Cov}(f(U),g(U))
}
$$

に等しいです。

2. $h$ は単調非減少なので $f$ は単調非減少です。

一方、

$$
g(u)=h(1-u)
$$

は単調非増加です。

従って任意の $u,v$ について

$$
(f(u)-f(v))(g(u)-g(v))
\le0.
$$

よって

$$
(f(U)-f(U'))(g(U)-g(U'))
\le0
$$

が各実現値で成り立つため、期待値も0以下です。

1の恒等式から

$$
\boxed{
\operatorname{Cov}(h(U),h(1-U))
\le0
}.
$$

3.

$$
\sigma^2
=
\operatorname{Var}(h(U)),
\qquad
\gamma
=
\operatorname{Cov}(h(U),h(1-U))
\le0
$$

とします。

対称変量一組の平均の分散は

$$
\frac{\sigma^2+\gamma}{2}
\le
\frac{\sigma^2}{2}.
$$

右辺は独立な二標本平均の分散です。

従って同じ2回の関数評価で、

$$
\boxed{
\operatorname{Var}(\text{対称変量})
\le
\operatorname{Var}(\text{独立二標本平均})
}.
$$
<!-- solution-end -->

### MC3-B02 制御変量の最適係数を平方完成で導く

二乗可積分な $Y,X$ について

$$
E[Y]=I,
\qquad
E[X]=\mu,
\qquad
\operatorname{Var}(X)>0
$$

とする。

$$
Z_c
=
Y-c(X-\mu)
$$

について次を示せ。

1. $E[Z_c]=I$。
2. 分散を $c$ の二次式として書け。
3. 平方完成から最適係数 $c^\ast$ を求めよ。
4. 相関係数 $\rho$ を用いて最小分散を表せ。
5. $X$ と $Y$ が無相関なら、この方法から分散減少が得られないことを説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

1.

$$
\begin{aligned}
E[Z_c]
&=
E[Y]-c(E[X]-\mu)
\\
&=
I-c(\mu-\mu)
\\
&=
\boxed I.
\end{aligned}
$$

2. 定数 $\mu$ は分散に影響しないので、

$$
\begin{aligned}
\operatorname{Var}(Z_c)
&=
\operatorname{Var}(Y-cX)
\\
&=
\boxed{
\operatorname{Var}(Y)
+
c^2\operatorname{Var}(X)
-
2c\operatorname{Cov}(Y,X)
}.
\end{aligned}
$$

3. $\sigma_X^2=\operatorname{Var}(X)$ と置くと、

$$
\begin{aligned}
\operatorname{Var}(Z_c)
&=
\sigma_X^2
\left(
c-
\frac{\operatorname{Cov}(Y,X)}{\sigma_X^2}
\right)^2
\\
&\quad+
\operatorname{Var}(Y)
-
\frac{\operatorname{Cov}(Y,X)^2}{\sigma_X^2}.
\end{aligned}
$$

第一項は0以上なので最小点は

$$
\boxed{
c^\ast
=
\frac{\operatorname{Cov}(Y,X)}
{\operatorname{Var}(X)}
}.
$$

4.

$$
\rho^2
=
\frac{
\operatorname{Cov}(Y,X)^2
}{
\operatorname{Var}(Y)\operatorname{Var}(X)
}.
$$

従って

$$
\boxed{
\operatorname{Var}(Z_{c^\ast})
=
\operatorname{Var}(Y)(1-\rho^2)
}.
$$

5. 無相関なら

$$
\operatorname{Cov}(Y,X)=0
$$

なので

$$
c^\ast=0.
$$

すると

$$
Z_{c^\ast}=Y
$$

であり、

$$
\boxed{
\operatorname{Var}(Z_{c^\ast})
=
\operatorname{Var}(Y)
}.
$$

従って、期待値が既知というだけでは不十分で、$Y$ と相関する制御変量を選ぶ必要があります。
<!-- solution-end -->

### MC3-B03 層化の最適配分を導く

$K$ 個の層について

$$
p_k>0,
\qquad
\sigma_k>0
$$

とし、総標本数

$$
\sum_{k=1}^Kn_k=N
$$

を固定する。

層化推定量の分散が

$$
V
=
\sum_{k=1}^K
\frac{p_k^2\sigma_k^2}{n_k}
$$

であるとする。

1. [Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)を用いて
   $$
   V
   \ge
   \frac{
   (\sum_kp_k\sigma_k)^2
   }{N}
   $$
   を示せ。
2. 等号条件から
   $$
   n_k\propto p_k\sigma_k
   $$
   を導け。
3. $p_1=p_2=1/2$、$\sigma_1=1$、$\sigma_2=3$、$N=80$ のときの最適配分を求めよ。
4. 比例配分 $n_1=n_2=40$ と最適配分の分散を比較せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

1.

$$
\sum_{k=1}^Kp_k\sigma_k
=
\sum_{k=1}^K
\frac{p_k\sigma_k}{\sqrt{n_k}}
\sqrt{n_k}.
$$

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)より、

$$
\left(
\sum_{k=1}^Kp_k\sigma_k
\right)^2
\le
\left(
\sum_{k=1}^K
\frac{p_k^2\sigma_k^2}{n_k}
\right)
\left(
\sum_{k=1}^Kn_k
\right).
$$

右辺は $VN$ なので、

$$
\boxed{
V
\ge
\frac{
(\sum_kp_k\sigma_k)^2
}{N}
}.
$$

2. Cauchy--Schwarz の等号条件から、ある定数 $\lambda>0$ があって

$$
\frac{p_k\sigma_k}{\sqrt{n_k}}
=
\lambda\sqrt{n_k}
$$

となればよいので、

$$
n_k
=
\frac1\lambda p_k\sigma_k.
$$

従って

$$
\boxed{
n_k\propto p_k\sigma_k
}.
$$

3.

$$
p_1\sigma_1
=
\frac12,
\qquad
p_2\sigma_2
=
\frac32.
$$

比は

$$
1:3.
$$

総数80だから、

$$
\boxed{
n_1=20,
\qquad
n_2=60
}.
$$

4. 比例配分では

$$
\begin{aligned}
V_{\mathrm{prop}}
&=
\frac{(1/2)^2\cdot1^2}{40}
+
\frac{(1/2)^2\cdot3^2}{40}
\\
&=
\frac{1}{160}
+
\frac{9}{160}
\\
&=
\boxed{\frac1{16}}.
\end{aligned}
$$

最適配分では

$$
\begin{aligned}
V_{\mathrm{opt}}
&=
\frac{1/4}{20}
+
\frac{9/4}{60}
\\
&=
\frac1{80}
+
\frac3{80}
\\
&=
\boxed{\frac1{20}}.
\end{aligned}
$$

従って

$$
\frac{V_{\mathrm{opt}}}{V_{\mathrm{prop}}}
=
\frac{1/20}{1/16}
=
\boxed{\frac45}.
$$

分散の大きい第2層へ多く配分することで、比例配分よりさらに20%分散が下がります。
<!-- solution-end -->

## Level C

### MC3-C01 四つの分散減少法を設計原理から比較する

$U\sim\operatorname{Unif}(0,1)$ とし、

$$
I
=
E[U^2]
=
\frac13
$$

を推定する。次の問いに答えよ。

1. 通常 Monte Carlo の一標本分散を求めよ。
2. 対称変量法
   $$
   A=\frac{U^2+(1-U)^2}{2}
   $$
   の分散を求め、同じ2回の関数評価を使う独立二標本平均と比較せよ。
3. $X=U$、$E[X]=1/2$ を制御変量としたときの最適係数と一標本分散を求めよ。
4. $[0,1/2]$ と $(1/2,1]$ の二層へ等配分する層化抽出について、各層内の $U^2$ の条件付き分散を求め、総標本数 $N$ の層化推定量の分散を求めよ。
5. 重点サンプリングでは、密度
   $$
   q(x)=2x,
   \qquad
   0<x<1
   $$
   から $X$ を生成する。このとき $I=\int_0^1x^2dx$ の重み付き一標本を書き、その分散を求めよ。
6. 1--5の結果から、各方法が何を設計して分散を下げたかを、共分散・既知平均・層内分散・提案密度の言葉を用いて説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

### (1) 通常 Monte Carlo

$$
Y=U^2.
$$

既に

$$
E[Y]
=
\frac13,
\qquad
E[Y^2]
=
E[U^4]
=
\frac15
$$

なので、

$$
\boxed{
\operatorname{Var}(Y)
=
\frac15-\frac19
=
\frac4{45}
}.
$$

### (2) 対称変量法

$$
A
=
U^2-U+\frac12.
$$

計算から

$$
\boxed{
\operatorname{Var}(A)
=
\frac1{180}
}.
$$

独立な二標本平均の分散は

$$
\frac12\frac4{45}
=
\frac2{45}.
$$

従って対称変量法との比は

$$
\boxed{
\frac{1/180}{2/45}
=
\frac18
}.
$$

改善の原因は

$$
U^2
$$

が増加関数である一方、

$$
(1-U)^2
$$

が $U$ の減少関数で、二つの間に負の共分散が生じることです。

### (3) 制御変量法

$$
X=U,
\qquad
E[X]=\frac12.
$$

$$
\operatorname{Cov}(U^2,U)
=
\frac1{12},
\qquad
\operatorname{Var}(U)
=
\frac1{12}
$$

だから、

$$
\boxed{
c^\ast=1
}.
$$

従って

$$
Z
=
U^2-U+\frac12
$$

で、

$$
\boxed{
\operatorname{Var}(Z)
=
\frac1{180}
}.
$$

ここでは既知平均 $E[U]=1/2$ を持ち、$U^2$ と強く相関する $U$ を使って変動を差し引いています。

### (4) 二層の層化抽出

第1層では $U\sim\operatorname{Unif}(0,1/2)$ です。

$$
E[U^2\mid A_1]
=
\frac{(1/2)^2}{3}
=
\frac1{12}.
$$

また

$$
E[U^4\mid A_1]
=
\frac{(1/2)^4}{5}
=
\frac1{80}.
$$

従って

$$
\sigma_1^2
=
\frac1{80}
-
\frac1{144}
=
\boxed{\frac1{180}}.
$$

第2層では $U$ は $(1/2,1)$ 上で一様です。

$$
E[U^2\mid A_2]
=
2\int_{1/2}^1x^2\,dx
=
2
\left[
\frac{x^3}{3}
\right]_{1/2}^1
=
\frac7{12}.
$$

また

$$
E[U^4\mid A_2]
=
2\int_{1/2}^1x^4\,dx
=
2
\left[
\frac{x^5}{5}
\right]_{1/2}^1
=
\frac{31}{80}.
$$

従って

$$
\begin{aligned}
\sigma_2^2
&=
\frac{31}{80}
-
\left(\frac7{12}\right)^2
\\
&=
\frac{279}{720}
-
\frac{245}{720}
\\
&=
\boxed{\frac{17}{360}}.
\end{aligned}
$$

$p_1=p_2=1/2$ で各層へ $N/2$ 標本を配るので、

$$
\begin{aligned}
\operatorname{Var}
(\widehat I_N^{\mathrm{str}})
&=
\frac1N
\left(
\frac12\sigma_1^2
+
\frac12\sigma_2^2
\right)
\\
&=
\frac1N
\left(
\frac1{360}
+
\frac{17}{720}
\right)
\\
&=
\boxed{
\frac{19}{720N}
}.
\end{aligned}
$$

通常 Monte Carlo の分散は

$$
\frac{4}{45N}
=
\frac{64}{720N}
$$

なので、分散比は

$$
\boxed{\frac{19}{64}}.
$$

層を分けることで、層間の平均の違いを偶然の標本構成へ任せず、各層内部の変動だけを残しています。

### (5) 重点サンプリング

目標積分は

$$
I
=
\int_0^1x^2\,dx.
$$

ここでは目標密度を $p(x)=1$、被積分関数を $f(x)=x^2$ と見ます。

提案密度は

$$
q(x)=2x.
$$

従って重み付き一標本は

$$
W
=
X^2
\frac1{2X}
=
\boxed{\frac X2}.
$$

$X\sim q$ だから、

$$
E_q[X]
=
\int_0^1x(2x)\,dx
=
\frac23.
$$

従って

$$
E_q[W]
=
\frac12\frac23
=
\frac13
$$

で不偏です。

また

$$
E_q[X^2]
=
\int_0^1x^2(2x)\,dx
=
\frac12.
$$

よって

$$
\operatorname{Var}_q(X)
=
\frac12-\left(\frac23\right)^2
=
\frac1{18}.
$$

したがって

$$
\boxed{
\operatorname{Var}_q(W)
=
\frac14\frac1{18}
=
\frac1{72}
}.
$$

通常一標本の分散 $4/45$ との比は

$$
\frac{1/72}{4/45}
=
\boxed{\frac5{32}}.
$$

$q(x)=2x$ は $x$ の大きい領域を通常一様分布より多く引きます。そこは $x^2$ の寄与も大きい領域なので、重み補正後の分散が下がっています。

### (6) 設計原理の比較

四つの方法は次の量を設計しています。

- 対称変量法：同じ周辺分布を保ちながら、二つの関数値の**共分散を負にする**。
- 制御変量法：期待値が既知で対象と相関する変数を使い、**既知平均からのずれを差し引く**。
- 層化抽出：空間を分けて各層を必ず観測し、**層内分散だけを標本誤差として残す**。
- 重点サンプリング：寄与の大きい領域を多く引くよう**提案密度を変え、密度比で期待値を補正する**。

したがって分散減少の本質は、

$$
\boxed{
\text{不偏性を保つ恒等式}
+
\text{分散を決める確率構造の設計}
}
$$

です。
<!-- solution-end -->

---

## 7. 章末まとめ

本章では、MC1 の

$$
\operatorname{Var}(\widehat I_N)
=
\frac{\sigma^2}{N}
$$

に対して、$N$ を増やすだけでなく $\sigma^2$ 側を小さくする方法を学びました。

対称変量法では

$$
\boxed{
\text{負の共分散を作る}
}
$$

ことで、同じ関数評価回数の独立標本平均より分散を下げます。

制御変量法では

$$
\boxed{
c^\ast
=
\frac{\operatorname{Cov}(Y,X)}
{\operatorname{Var}(X)}
}
$$

を選び、

$$
\boxed{
\operatorname{Var}(Z_{c^\ast})
=
\operatorname{Var}(Y)(1-\rho^2)
}
$$

を得ました。

層化抽出では

$$
\boxed{
\operatorname{Var}(\widehat I^{\mathrm{str}})
=
\sum_k
\frac{p_k^2\sigma_k^2}{n_k}
}
$$

となり、比例配分なら層間平均の変動を標本誤差から除けます。さらに最適配分は

$$
\boxed{
n_k\propto p_k\sigma_k
}
$$

です。

重点サンプリングでは

$$
\boxed{
\operatorname{Var}_q(W)
=
\int
\frac{f^2p^2}{q}
-
I^2
}
$$

となり、寄与の大きい領域へ提案密度を寄せる一方、$q$ が小さすぎる領域を作ると重みが暴れて分散が無限大になることも確認しました。

四手法に共通する視点は、

$$
\boxed{
\text{平均を保つ}
\quad\text{だけでなく}\quad
\text{同時分布・補助変数・層・提案分布を設計する}
}
$$

ことです。

次の MC4 では、この考え方を複数の離散化レベルへ拡張し、粗い近似と細かい近似を結合して差の分散を下げる Multilevel Monte Carlo 法へ進みます。
