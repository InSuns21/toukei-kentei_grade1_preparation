<!-- definition-example-audit: strict -->

# I4-01 ベイズ推定・事後分布・予測分布

これまでの推定では、母数 $\theta$ は「値は未知だが固定された量」として扱ってきました。ベイズ推測では、データを観測する前の $\theta$ に関する不確実性を**事前分布**で表し、観測データを使って**事後分布**へ更新します。

本章の流れは一つです。

$$
\boxed{
\text{事前分布}
\times
\text{尤度}
\longrightarrow
\text{事後分布}
\longrightarrow
\begin{cases}
\text{推定},\\
\text{予測},\\
\text{意思決定}
\end{cases}
}
$$

「ベイズ推定量は何か」を先に暗記するのではなく、**事後分布を作り、損失関数を決め、その事後期待損失を最小にする**という順序で理解します。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

関連する正本:

- [P1-02 条件付き確率・独立・ベイズの定理](../../01_probability/P1_02_条件付き確率_独立_bayesの定理/index.md)
- [P3-04 混合分布・潜在変数](../../02_distributions/P3_04_混合分布_潜在変数/index.md)
- [I1-01 尤度・最尤推定](../I1_01_尤度_最尤推定/index.md)
- [I2-02 区間推定](../I2_02_区間推定/index.md)

## この章で解けるようになる問題

- 事前分布と尤度から事後分布を導く。
- 周辺尤度を積分または和で求め、事後分布を正規化する。
- ベータ・二項、ガンマ・ポアソン、正規・正規の共役更新を計算する。
- 二乗損失・絶対損失・0–1損失でベイズ推定量を使い分ける。
- 事後最頻値と最尤推定量の違いを説明する。
- 事後予測分布を母数について積分して求める。
- 事前予測分布と事後予測分布を区別する。
- 信用区間と頻度論的信頼区間の確率解釈を区別する。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 事前分布・事後分布 | ベイズ更新、周辺尤度 |
| 共役事前分布 | ベータ・二項、ガンマ・ポアソン、正規・正規 |
| ベイズ推定量 | 事後期待損失の最小化 |
| 事後最頻値 | 事後密度最大化、最尤推定量との比較 |
| 予測分布 | 事前予測、事後予測 |
| 損失関数 | 二乗損失、絶対損失、0–1損失 |

---

## 1. ベイズ更新の出発点

観測データを $x$、母数を $\theta$ とします。尤度は I1-01 と同じく

$$
L(\theta;x)=f(x\mid\theta)
$$

です。ベイズ推測では、これにデータ観測前の $\theta$ の分布を追加します。

<a id="def-i4-01-prior"></a>

<!-- formal-statement-start -->
> **定義（事前分布）**  
> データ $X=x$ を観測する前の母数 $\theta$ に関する不確実性を表す確率分布を事前分布という。密度を持つ場合、その密度を $\pi(\theta)$ と書く。
<!-- formal-statement-end -->

<a id="def-i4-01-posterior"></a>

<!-- formal-statement-start -->
> **定義（事後分布）**  
> データ $X=x$ を観測した後の母数 $\theta$ の条件付き分布を事後分布という。密度を持つ場合、その密度を $\pi(\theta\mid x)$ と書く。
<!-- formal-statement-end -->

<a id="def-i4-01-marginal-likelihood"></a>

<!-- formal-statement-start -->
> **定義（周辺尤度）**  
> 連続母数の場合

$$
m(x)
=
\int f(x\mid\theta)\pi(\theta)\,d\theta
$$

> を周辺尤度という。離散母数なら積分を和に置き換える。これは事前分布の下での観測データ $X=x$ の周辺確率または周辺密度である。
<!-- formal-statement-end -->

<a id="thm-i4-01-bayes-posterior"></a>

<!-- formal-statement-start -->
> **定理（ベイズの定理による事後分布）**  
> $0<m(x)<\infty$ とする。このとき

$$
\boxed{
\pi(\theta\mid x)
=
\frac{f(x\mid\theta)\pi(\theta)}{m(x)}
}
$$

> であり、したがって $\theta$ に依存しない比例定数を省略すれば

$$
\boxed{
\pi(\theta\mid x)
\propto
L(\theta;x)\pi(\theta)
}
$$

> と書ける。
<!-- formal-statement-end -->

<!-- proof-start -->

### 証明

条件付き密度の定義から

$$
\pi(\theta\mid x)
=
\frac{f(x,\theta)}{m(x)}.
$$

同時密度は

$$
f(x,\theta)
=f(x\mid\theta)\pi(\theta)
$$

と分解できるので、代入すれば結論を得ます。

<!-- proof-end -->

<!-- definition-example-start: def-i4-01-prior, def-i4-01-posterior, def-i4-01-marginal-likelihood -->

**定義の確認**  
母数が $\theta\in\{0.2,0.8\}$ の2点だけを取り、事前確率が各 $1/2$ とします。ベルヌーイ観測 $X=1$ を1回得たとき

$$
P(X=1)
=0.2\cdot\frac12+0.8\cdot\frac12
=0.5
$$

が周辺尤度です。したがって

$$
P(\theta=0.8\mid X=1)
=
\frac{0.8\cdot(1/2)}{0.5}
=0.8.
$$

観測前の $P(\theta=0.8)=0.5$ が、観測後には $0.8$ へ更新されています。

<!-- definition-example-end -->

### 1.1 分母は「最後に正規化」でよい

共役計算では、まず

$$
\pi(\theta\mid x)
\propto
L(\theta;x)\pi(\theta)
$$

として $\theta$ に依存する部分だけを整理します。既知の確率分布の核が見つかれば、その分布の正規化定数を使えばよいため、毎回 $m(x)$ を直接積分する必要はありません。

ただし、**周辺尤度そのものが不要という意味ではありません**。事後分布を確率分布にする正規化定数であり、予測やモデル比較でも重要になります。

---

## 2. 共役事前分布

<a id="def-i4-01-conjugate"></a>

<!-- formal-statement-start -->
> **定義（共役事前分布）**  
> ある標本分布族に対して、事前分布がある分布族に属するとき、観測後の事後分布も同じ分布族に属するなら、その事前分布族を共役事前分布族という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i4-01-conjugate -->

**定義の確認**  
ベルヌーイ母数 $p$ に対して事前分布を $\operatorname{Beta}(a,b)$ とすると、成功 $x$ 回、失敗 $n-x$ 回の観測後は

$$
p\mid x
\sim
\operatorname{Beta}(a+x,b+n-x)
$$

となります。事前も事後もベータ分布族なので、ベータ分布はベルヌーイ・二項尤度に対する共役事前分布です。

<!-- definition-example-end -->

共役性の利点は「事後分布の形が分かる」ことです。更新は分布族を変えず、母数だけを書き換える操作になります。

---

## 3. ベータ事前分布と二項分布

$$
X\mid p\sim\operatorname{Bin}(n,p)
$$

とし、事前分布を

$$
p\sim\operatorname{Beta}(a,b),
\qquad a>0,\ b>0
$$

とします。事前密度の核は

$$
\pi(p)
\propto
p^{a-1}(1-p)^{b-1},
\qquad 0<p<1.
$$

尤度の核は

$$
L(p;x)
\propto
p^x(1-p)^{n-x}.
$$

したがって

$$
\pi(p\mid x)
\propto
p^{a+x-1}(1-p)^{b+n-x-1}.
$$

<a id="thm-i4-01-beta-binomial"></a>

<!-- formal-statement-start -->
> **定理（ベータ・二項共役更新）**  
> $X\mid p\sim\operatorname{Bin}(n,p)$、$p\sim\operatorname{Beta}(a,b)$ なら

$$
\boxed{
p\mid X=x
\sim
\operatorname{Beta}(a+x,b+n-x)
}
$$

> である。
<!-- formal-statement-end -->

<!-- proof-start -->

### 証明

尤度と事前密度を掛けると

$$
\begin{aligned}
L(p;x)\pi(p)
&\propto
p^x(1-p)^{n-x}
\,p^{a-1}(1-p)^{b-1}\\
&=
p^{a+x-1}(1-p)^{b+n-x-1}.
\end{aligned}
$$

これは $\operatorname{Beta}(a+x,b+n-x)$ の密度の核です。

<!-- proof-end -->

### 3.1 事後平均と擬似度数

ベータ分布の平均から

$$
E[p\mid x]
=
\frac{a+x}{a+b+n}.
$$

これは

$$
\frac{a+b}{a+b+n}\frac{a}{a+b}
+
\frac{n}{a+b+n}\frac{x}{n}
$$

と書けます。つまり、**事前平均** $a/(a+b)$ と **標本比率** $x/n$ の加重平均です。

$a$ と $b$ は厳密には単なる観測度数ではありませんが、更新式だけを見れば成功側に $a$、失敗側に $b$ の擬似度数があるように働きます。事前分布が強いほど $a+b$ が大きく、少数データでは事前平均側へ強く縮みます。

### 3.2 事後最頻値

$a+x>1$ かつ $b+n-x>1$ なら、ベータ事後密度の内部の最頻値は

$$
\hat p_{\mathrm{post.mode}}
=
\frac{a+x-1}{a+b+n-2}.
$$

一方、最尤推定量は

$$
\hat p_{\mathrm{MLE}}=\frac{x}{n}.
$$

事前分布が一様な $\operatorname{Beta}(1,1)$ なら、内部解が存在する場合には両者は一致します。

---

## 3A. 階層ベイズモデルとギブスサンプリング

### 3A.1 階層ベイズモデル：群ごとの母数も母集団から来ると考える

<a id="def-i4-01-hierarchical-bayes"></a>

<!-- formal-statement-start -->
> **定義（階層ベイズモデル）**  
> 群 $j=1,\ldots,J$ の観測 $Y_j$ と群固有母数 $\theta_j$ に対して
>
> $Y_j\mid\theta_j\sim p(y_j\mid\theta_j)$、
> $\theta_j\mid\eta\sim p(\theta_j\mid\eta)$、
> $\eta\sim\pi(\eta)$
>
> のように、母数自身の分布とその超母数の事前分布まで階層的に置くベイズモデルを階層ベイズモデルという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i4-01-hierarchical-bayes -->
**定義の確認**  
$Y_j\mid\theta_j\sim N(\theta_j,\sigma^2)$、$\theta_j\mid\mu,\tau^2\sim N(\mu,\tau^2)$ とし、$\mu,\tau^2$ を固定すると
$$
\theta_j\mid Y_j
\sim
N\!\left(
\frac{\sigma^{-2}Y_j+\tau^{-2}\mu}{\sigma^{-2}+\tau^{-2}},
\frac{1}{\sigma^{-2}+\tau^{-2}}
\right).
$$
事後平均が各群の観測値 $Y_j$ と全体中心 $\mu$ の加重平均になるため、小標本群ほど全体中心へ縮約されます。
<!-- definition-example-end -->

一般には
$$
\pi(\theta_{1:J},\eta\mid y)
\propto
\left\{
\prod_{j=1}^J
p(y_j\mid\theta_j)p(\theta_j\mid\eta)
\right\}\pi(\eta).
$$
独立に群ごとを推定するモデルと違い、$\eta$ を介して群間で情報を共有するのがポイントです。

### 3A.2 ギブスサンプリング：完全条件付き分布を順番に引く

<a id="def-i4-01-gibbs"></a>

<!-- formal-statement-start -->
> **定義（ギブスサンプリング）**  
> 同時分布 $\pi(x_1,\ldots,x_d)$ を目標とし、各成分を他成分で条件付けた完全条件付き分布から順番に
>
> $X_j^{(t+1)}\sim\pi(x_j\mid X_1^{(t+1)},\ldots,X_{j-1}^{(t+1)},X_{j+1}^{(t)},\ldots,X_d^{(t)})$
>
> と更新するMCMCをギブスサンプリングという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i4-01-gibbs -->
**定義の確認**  
標準化された2変量正規分布で相関係数を $\rho$ とすると
$$
X\mid Y=y\sim N(\rho y,1-\rho^2),\qquad
Y\mid X=x\sim N(\rho x,1-\rho^2).
$$
この2つから交互に乱数を生成すれば、2変量正規分布を目標分布とするギブスサンプリングになります。
<!-- definition-example-end -->

2変量の場合、目標分布 $\pi(x,y)$ から出発して $X'\sim\pi(x\mid y)$、続いて $Y'\sim\pi(y\mid x')$ と更新すると、
$$
\int\!\!\int
\pi(x,y)\pi(x'\mid y)\pi(y'\mid x')
\,dx\,dy
=
\pi(x',y')
$$
となるので $\pi$ は不変分布です。長期平均を事後期待値として使うには、さらに既約性など連鎖が目標分布へ収束する条件が必要です。

### 3A.3 例：解析積分が閉じないところからMCMCが必要になる

共役事前分布なら事後分布を紙と鉛筆で正規化できることがあります。しかし階層が増えると周辺化積分が閉じない場合が多く、完全条件付き分布だけは簡単ならギブスサンプリングが有力です。P4-03のMCMCは計算手法、本節の階層ベイズは確率モデルであり、役割を区別します。

## 4. ガンマ事前分布とポアソン分布

独立に

$$
X_i\mid\lambda\sim\operatorname{Poisson}(\lambda),
\qquad i=1,\ldots,n
$$

とします。$S=\sum_iX_i$ とすると尤度の核は

$$
L(\lambda;x)
\propto
\lambda^S e^{-n\lambda}.
$$

事前分布は**形状母数 $a$、率母数 $b$** のガンマ分布

$$
\lambda\sim\operatorname{Gamma}(a,b)
$$

とし、密度の核を

$$
\pi(\lambda)
\propto
\lambda^{a-1}e^{-b\lambda}
$$

とします。

<a id="thm-i4-01-gamma-poisson"></a>

<!-- formal-statement-start -->
> **定理（ガンマ・ポアソン共役更新）**  
> 上の設定で

$$
\boxed{
\lambda\mid x_1,\ldots,x_n
\sim
\operatorname{Gamma}(a+S,b+n)
}
$$

> である。
<!-- formal-statement-end -->

<!-- proof-start -->

### 証明

$$
\begin{aligned}
L(\lambda;x)\pi(\lambda)
&\propto
\lambda^S e^{-n\lambda}
\lambda^{a-1}e^{-b\lambda}\\
&=
\lambda^{a+S-1}e^{-(b+n)\lambda}.
\end{aligned}
$$

これは形状母数 $a+S$、率母数 $b+n$ のガンマ分布の核です。

<!-- proof-end -->

事後平均は

$$
E[\lambda\mid x]
=
\frac{a+S}{b+n}.
$$

これも

$$
\frac{b}{b+n}\frac{a}{b}
+
\frac{n}{b+n}\frac{S}{n}
$$

と書けます。率母数 $b$ が「事前の観測時間」、$a$ が「事前のイベント数」に似た役割を持ちます。

---

## 5. 正規事前分布と正規尤度

$$
X_i\mid\mu
\overset{\text{独立同分布}}{\sim}
N(\mu,\sigma^2)
$$

とし、$\sigma^2$ は既知とします。事前分布を

$$
\mu\sim N(\mu_0,\tau_0^2)
$$

とします。

尤度で $\mu$ に依存する部分は

$$
\exp\left\{-\frac{n}{2\sigma^2}(\mu-\bar X)^2\right\},
$$

事前密度は

$$
\exp\left\{-\frac{1}{2\tau_0^2}(\mu-\mu_0)^2\right\}
$$

です。

<a id="thm-i4-01-normal-normal"></a>

<!-- formal-statement-start -->
> **定理（正規・正規共役更新）**  
> 上の設定で、事後分布は

$$
\mu\mid x
\sim
N(\mu_n,\tau_n^2)
$$

> であり、

$$
\boxed{
\frac{1}{\tau_n^2}
=
\frac{1}{\tau_0^2}
+
\frac{n}{\sigma^2}
}
$$

$$
\boxed{
\mu_n
=
\tau_n^2
\left(
\frac{\mu_0}{\tau_0^2}
+
\frac{n\bar X}{\sigma^2}
\right)
}
$$

> である。
<!-- formal-statement-end -->

<!-- proof-start -->

### 証明

事後密度の対数で $\mu$ に依存する部分は

$$
-\frac12
\left[
\frac{n}{\sigma^2}(\mu-\bar X)^2
+
\frac{1}{\tau_0^2}(\mu-\mu_0)^2
\right].
$$

$\mu^2$ の係数は

$$
\frac{n}{\sigma^2}+\frac{1}{\tau_0^2}
=\frac{1}{\tau_n^2},
$$

$\mu$ の一次係数から中心は

$$
\mu_n
=
\tau_n^2
\left(
\frac{n\bar X}{\sigma^2}
+
\frac{\mu_0}{\tau_0^2}
\right)
$$

となります。平方完成すれば正規密度の核になります。

<!-- proof-end -->

### 5.1 精度を足す

分散の逆数を**精度**とみると

$$
\text{事後精度}
=
\text{事前精度}
+
\text{データ精度}
$$

です。事後平均は

$$
\mu_n
=
w\mu_0+(1-w)\bar X,
$$

$$
w
=
\frac{1/\tau_0^2}{1/\tau_0^2+n/\sigma^2}
$$

という精度加重平均です。事前分散 $\tau_0^2$ が小さいほど事前平均を強く信じ、標本サイズ $n$ が大きいほど $\bar X$ 側へ寄ります。

---


## 6. 損失関数からベイズ推定量を決める

同じ事後分布でも、「外したときの痛さ」をどう定義するかで最適な点推定は変わります。

<a id="def-i4-01-posterior-risk-bayes-estimator"></a>

<!-- formal-statement-start -->
> **定義（事後期待損失とベイズ推定量）**  
> 母数が $\theta$、データ $x$ を観測した後に決定値 $a$ を選ぶとする。損失関数を $L(\theta,a)$ とすると

$$
\rho(a\mid x)
=
E[L(\theta,a)\mid x]
$$

> を事後期待損失という。これを最小にする決定値

$$
\delta_B(x)
\in
\operatorname*{arg\,min}_a\rho(a\mid x)
$$

> をベイズ推定量という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i4-01-posterior-risk-bayes-estimator -->

**定義の確認**  
事後分布が

$$
P(\theta=0\mid x)=0.3,
\qquad
P(\theta=1\mid x)=0.7
$$

で、0–1損失

$$
L(\theta,a)=\boldsymbol1\{\theta\ne a\}
$$

を使うとします。$a=0$ の事後期待損失は $0.7$、$a=1$ なら $0.3$ なので、ベイズ推定量は $a=1$ です。

<!-- definition-example-end -->

<a id="thm-i4-01-squared-loss"></a>

<!-- formal-statement-start -->
> **定理（二乗損失下のベイズ推定量）**  
> $E[\theta^2\mid x]<\infty$ とする。二乗損失

$$
L(\theta,a)=(\theta-a)^2
$$

> の下で、ベイズ推定量は事後平均

$$
\boxed{
\delta_B(x)=E[\theta\mid x]
}
$$

> である。
<!-- formal-statement-end -->

<!-- proof-start -->

### 証明

$m=E[\theta\mid x]$ と置きます。

$$
\begin{aligned}
E[(\theta-a)^2\mid x]
&=E[(\theta-m+m-a)^2\mid x]\\
&=E[(\theta-m)^2\mid x]
+2(m-a)E[\theta-m\mid x]
+(m-a)^2\\
&=\operatorname{Var}(\theta\mid x)+(m-a)^2.
\end{aligned}
$$

第1項は $a$ に依存しないため、$a=m$ で最小です。

<!-- proof-end -->

### 6.1 絶対損失なら事後中央値

絶対損失

$$
L(\theta,a)=|\theta-a|
$$

では、ベイズ推定量は事後中央値です。直感的には $a$ を少し右へ動かしたとき、左側にある事後確率は損失を増やし、右側にある事後確率は損失を減らします。両者が釣り合う位置が中央値です。

事後分布が連続で密度 $\pi(\theta\mid x)$ を持つ場合、

$$
g(a)=E[|\theta-a|\mid x]
$$

の微分は

$$
g'(a)
=P(\theta<a\mid x)-P(\theta>a\mid x)
$$

となり、中央値で符号が切り替わります。

### 6.2 離散母数の0–1損失なら事後最頻値

母数空間が離散で

$$
L(\theta,a)=\boldsymbol1\{\theta\ne a\}
$$

なら

$$
E[L(\theta,a)\mid x]
=1-P(\theta=a\mid x).
$$

したがって事後確率が最大の点を選べばよいことになります。

---

## 7. 事後最頻値

<a id="def-i4-01-posterior-mode"></a>

<!-- formal-statement-start -->
> **定義（事後最頻値）**  
> 離散母数では事後確率質量を、連続母数では事後密度を最大にする母数値を事後最頻値という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i4-01-posterior-mode -->

**定義の確認**  
$p\mid x\sim\operatorname{Beta}(7,5)$ なら、両母数が1より大きいので内部の事後最頻値は

$$
\frac{7-1}{7+5-2}
=
0.6.
$$

事後平均は $7/12$ なので、同じ事後分布でも点推定の基準により値は一致しません。

<!-- definition-example-end -->

事後最頻値は

$$
\operatorname*{arg\,max}_\theta
\pi(\theta\mid x)
$$

であり、ベイズの定理から

$$
\operatorname*{arg\,max}_\theta
\{\log L(\theta;x)+\log\pi(\theta)\}
$$

と同じです。最尤推定量は $\log L(\theta;x)$ だけを最大にするので、事前分布の対数が追加された点が違います。

> **連続母数での注意**  
> 普通の点ごとの0–1損失 $\boldsymbol1\{\theta\ne a\}$ を連続母数にそのまま使うと、連続事後分布では $P(\theta=a\mid x)=0$ なので、どの $a$ でも事後期待損失は1です。したがって「事後最頻値は常に0–1損失のベイズ推定量」とは言えません。離散母数では正しく、連続母数では事後密度の最大点として別に定義して扱います。

### 7.1 再母数化への注意

連続分布の密度は座標変換でヤコビアンを受けるため、事後最頻値は一般に再母数化で不変ではありません。事後平均も非線形変換では

$$
E[g(\theta)\mid x]
\ne
g(E[\theta\mid x])
$$

が普通です。何を推定するか、どの損失を使うかを先に決める必要があります。

---

## 8. 予測分布

母数を推定するだけでなく、未来の観測 $\widetilde X$ を予測したいとします。

<a id="def-i4-01-posterior-predictive"></a>

<!-- formal-statement-start -->
> **定義（事後予測分布）**  
> 観測済みデータ $x$ の下で、未来の観測 $\widetilde X$ の分布を

$$
p(\widetilde x\mid x)
=
\int
p(\widetilde x\mid\theta)
\pi(\theta\mid x)
\,d\theta
$$

> で定める。これを事後予測分布という。離散母数なら積分を和に置き換える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i4-01-posterior-predictive -->

**定義の確認**  
ベルヌーイ母数について

$$
p\mid x\sim\operatorname{Beta}(a',b')
$$

なら、次の1回が成功する事後予測確率は

$$
P(\widetilde X=1\mid x)
=
\int_0^1 p\,\pi(p\mid x)\,dp
=
E[p\mid x]
=
\frac{a'}{a'+b'}.
$$

母数を1点推定して代入するのではなく、事後分布全体で平均しています。

<!-- definition-example-end -->

データ観測前なら

$$
p(\widetilde x)
=
\int p(\widetilde x\mid\theta)\pi(\theta)\,d\theta
$$

で、これは**事前予測分布**です。データを見た後なら事前分布を事後分布に置き換えます。

### 8.1 ベータ・二項の事後予測

事後分布が

$$
p\mid x
\sim
\operatorname{Beta}(a',b')
$$

で、未来に $m$ 回試行して成功回数を $Y$ とします。

$$
Y\mid p\sim\operatorname{Bin}(m,p)
$$

なので

$$
\begin{aligned}
P(Y=y\mid x)
&=
\int_0^1
{m\choose y}p^y(1-p)^{m-y}
\frac{p^{a'-1}(1-p)^{b'-1}}{B(a',b')}
\,dp\\
&=
{m\choose y}
\frac{B(a'+y,b'+m-y)}{B(a',b')}.
\end{aligned}
$$

これはベータ二項型の予測分布です。

### 8.2 ガンマ・ポアソンの事後予測

事後分布が

$$
\lambda\mid x
\sim
\operatorname{Gamma}(a',b')
$$

で、次の1期間の件数を $Y\mid\lambda\sim\operatorname{Poisson}(\lambda)$ とします。このとき

$$
\begin{aligned}
P(Y=y\mid x)
&=
\int_0^\infty
\frac{e^{-\lambda}\lambda^y}{y!}
\frac{(b')^{a'}}{\Gamma(a')}
\lambda^{a'-1}e^{-b'\lambda}
\,d\lambda\\
&=
\frac{\Gamma(a'+y)}{\Gamma(a')y!}
\left(\frac{b'}{b'+1}\right)^{a'}
\left(\frac{1}{b'+1}\right)^y.
\end{aligned}
$$

これは負の二項型の分布です。P3-04 のポアソン–ガンマ混合が、ここでは**事後分布を混合分布として使う予測**として現れます。

### 8.3 正規・正規の事後予測

$$
\mu\mid x\sim N(\mu_n,\tau_n^2),
\qquad
\widetilde X\mid\mu\sim N(\mu,\sigma^2)
$$

なら

$$
\boxed{
\widetilde X\mid x
\sim
N(\mu_n,\sigma^2+\tau_n^2)
}
$$

です。未来観測そのもののばらつき $\sigma^2$ に加えて、母数 $\mu$ の事後不確実性 $\tau_n^2$ も入ります。

---

## 9. 信用区間と頻度論的信頼区間

ベイズ推測では、事後分布そのものが母数の確率分布です。例えば区間 $[L(x),U(x)]$ が

$$
P\{L(x)\le\theta\le U(x)\mid x\}=0.95
$$

を満たすなら、95%信用区間と呼べます。

一方、I2-02 の95%信頼区間は、固定された $\theta$ を含むランダム区間の反復被覆率が95%になるよう構成されます。

| | 頻度論的信頼区間 | ベイズ的信用区間 |
|---|---|---|
| 確率を置く対象 | 標本・区間 | 母数の事後分布 |
| 観測後の解釈 | この固定区間が母数を含む確率を95%とは言わない | 事後確率95%と解釈できる |
| 必要なもの | 標本分布 | 尤度 + 事前分布 |

両者が数値的に一致することはありますが、**確率の意味が同じだから一致するのではありません**。

---

## 10. 事前分布をどう読むか

事前分布には少なくとも三つの役割があります。

1. 過去知識や専門知識を表す。
2. 少標本で推定を安定化させる。
3. 事後分布・予測分布を定義するために未知母数の不確実性を明示する。

一方で、事前分布がデータに比べて強すぎると事後分布を大きく左右します。したがって、事前分布の選択と感度確認は重要です。

### 10.1 無情報事前分布という言葉への注意

「平らな事前分布」が常に完全に無情報とは限りません。非線形に再母数化すると平らでなくなる場合があります。また、積分が1にならない**非正規事前分布**を形式的に使うこともありますが、最終的な事後分布が正規化可能かを必ず確認する必要があります。

統計検定1級では、まず正規化された共役事前分布を確実に扱えることを優先します。

---

## 11. ベイズ推定と最尤推定の比較

最尤法は

$$
\hat\theta_{\mathrm{MLE}}
\in
\operatorname*{arg\,max}_\theta L(\theta;x)
$$

です。事後最頻値は

$$
\hat\theta_{\mathrm{post.mode}}
\in
\operatorname*{arg\,max}_\theta
L(\theta;x)\pi(\theta).
$$

対数を取ると

$$
\log L(\theta;x)+\log\pi(\theta).
$$

したがって事前分布は、最適化の観点では尤度に追加される項として働きます。正規事前分布なら二乗距離型、ラプラス型事前分布なら絶対値型の項が現れるなど、正則化との対応も見えてきます。

ただし、**ベイズ推定は事後最頻値だけではありません**。損失関数によって事後平均や事後中央値もベイズ推定量になります。

---

## 12. 演習 Level A

### A01 ベイズ更新の形

事前密度を $\pi(\theta)$、尤度を $L(\theta;x)$ とする。事後密度を比例式で書け。

<details><summary>解答</summary>

$$
\pi(\theta\mid x)
\propto
L(\theta;x)\pi(\theta).
$$

正規化定数は周辺尤度

$$
m(x)=\int L(\theta;x)\pi(\theta)\,d\theta
$$

である。

</details>

### A02 ベータ・二項更新

$$
p\sim\operatorname{Beta}(2,3),
\qquad
X\mid p\sim\operatorname{Bin}(10,p)
$$

で $X=7$ を観測した。事後分布を求めよ。

<details><summary>解答</summary>

$$
p\mid X=7
\sim
\operatorname{Beta}(2+7,3+3)
=
\operatorname{Beta}(9,6).
$$

</details>

### A03 ガンマ・ポアソン更新

$$
\lambda\sim\operatorname{Gamma}(3,2)
$$

を形状・率母数で表す。3期間の件数が $(2,1,4)$ だった。事後分布を求めよ。

<details><summary>解答</summary>

総件数は $S=7$、観測期間数は3なので

$$
\lambda\mid x
\sim
\operatorname{Gamma}(3+7,2+3)
=
\operatorname{Gamma}(10,5).
$$

</details>

### A04 損失関数と点推定

次を対応させよ。

1. 二乗損失
2. 絶対損失
3. 離散母数の0–1損失

選択肢: 事後平均、事後中央値、事後最頻値。

<details><summary>解答</summary>

1. 事後平均。
2. 事後中央値。
3. 事後最頻値。

</details>

---

## 13. 演習 Level B

### B01 ベータ事後平均と事後最頻値

$$
p\mid x\sim\operatorname{Beta}(8,4)
$$

とする。

1. 事後平均を求めよ。
2. 事後最頻値を求めよ。
3. 両者が異なる理由を説明せよ。

<details><summary>解答</summary>

1.

$$
E[p\mid x]=\frac{8}{12}=\frac23.
$$

2.

$$
\frac{8-1}{8+4-2}
=\frac7{10}.
$$

3. 事後平均は二乗損失の最適解で、事後最頻値は事後密度の最大点である。事後分布が非対称なら一般に一致しない。

</details>

### B02 正規・正規更新

$$
X_i\mid\mu\sim N(\mu,4),
\qquad
\mu\sim N(10,9)
$$

とする。$n=4,\bar X=13$ を得た。

1. 事後精度を求めよ。
2. 事後分散を求めよ。
3. 事後平均を求めよ。

<details><summary>解答</summary>

事前精度は $1/9$、データ精度は $4/4=1$ なので

$$
\frac1{\tau_n^2}
=\frac19+1
=\frac{10}{9}.
$$

したがって

$$
\tau_n^2=\frac9{10}.
$$

事後平均は

$$
\mu_n
=\frac9{10}
\left(
\frac{10}{9}+13
\right)
=\frac{127}{10}=12.7.
$$

</details>

### B03 次の1回の成功確率

事後分布が

$$
p\mid x\sim\operatorname{Beta}(12,8)
$$

である。次のベルヌーイ試行が成功する事後予測確率を求めよ。

<details><summary>解答</summary>

$$
P(\widetilde X=1\mid x)
=E[p\mid x]
=\frac{12}{20}=0.6.
$$

</details>

### B04 二乗損失の導出

$E[\theta^2\mid x]<\infty$ とする。二乗損失の事後期待損失を

$$
\operatorname{Var}(\theta\mid x)
+
\{E[\theta\mid x]-a\}^2
$$

と分解し、最適な $a$ を求めよ。

<details><summary>解答</summary>

第1項は $a$ に依存しない。第2項は

$$
a=E[\theta\mid x]
$$

で0となるので、ベイズ推定量は事後平均である。

</details>

---


<a id="ex-i4-01-hierarchical-bayes"></a>
### I401-B05 階層ベイズモデルの縮約

- Level: B
- 目安時間: 15分
- 主題: 階層ベイズモデル

$Y\mid\theta\sim N(\theta,4)$、$\theta\mid\mu\sim N(\mu,1)$ とし、$\mu=10$、$Y=14$ を観測した。

1. $\theta\mid Y$ の事後平均を求めよ。
2. 観測値14より10に近い理由を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

精度は観測側 $1/4$、事前側1なので
$$
E[\theta\mid Y]
=
\frac{(1/4)14+1\cdot10}{1/4+1}
=
\frac{13.5}{1.25}
=
10.8.
$$
群固有の観測情報と上位階層の中心10を精度で加重平均するため、全体中心へ縮約される。

##### 本番答案

事後平均は10.8。上位階層の中心10が事前情報として入り、観測14との精度加重平均になるため。

##### 採点基準

事後平均12点、縮約の説明8点。

<!-- solution-end -->

## 14. 演習 Level C

### C01 ベータ・二項を推定から予測まで

ある製品の不良率を $p$ とし、事前分布を

$$
p\sim\operatorname{Beta}(2,18)
$$

とする。20個検査して4個が不良だった。

1. 事後分布を求めよ。
2. 二乗損失下のベイズ推定量を求めよ。
3. 事後最頻値を求めよ。
4. 次の1個が不良となる事後予測確率を求めよ。
5. 最尤推定量と比較せよ。

<details><summary>解答</summary>

1.

$$
p\mid x
\sim
\operatorname{Beta}(6,34).
$$

2.

$$
E[p\mid x]
=\frac6{40}=0.15.
$$

3.

$$
\frac{6-1}{6+34-2}
=\frac5{38}
\approx0.132.
$$

4.

$$
P(\widetilde X=1\mid x)=0.15.
$$

5. 最尤推定量は $4/20=0.2$。事前平均は $2/20=0.1$ なので、事後平均は0.2から0.1側へ縮んでいる。

</details>

### C02 ガンマ・ポアソンの予測

$$
\lambda\sim\operatorname{Gamma}(2,1)
$$

とし、4期間の件数が $(3,0,2,1)$ だった。

1. 事後分布を求めよ。
2. 事後平均を求めよ。
3. 次の1期間で0件となる事後予測確率を求めよ。
4. 母数を事後平均に固定してポアソン確率を計算する方法との違いを説明せよ。

<details><summary>解答</summary>

総件数は $S=6$ なので

$$
\lambda\mid x
\sim
\operatorname{Gamma}(8,5).
$$

事後平均は

$$
\frac85=1.6.
$$

事後予測分布の式で $y=0$ とすると

$$
P(Y=0\mid x)
=
\left(\frac5{6}\right)^8.
$$

$\lambda=1.6$ と固定して $e^{-1.6}$ とする方法は、$\lambda$ 自体の事後不確実性を無視している。事後予測は $\lambda$ の全事後分布で平均する。

</details>

### C03 正規更新と信用区間

$$
X_i\mid\mu\sim N(\mu,1),
\qquad
\mu\sim N(0,4)
$$

とする。$n=4,\bar X=1$ を観測した。

1. 事後分布を求めよ。
2. 二乗損失下のベイズ推定量を求めよ。
3. 事後分布の中央95%信用区間を書け。
4. この区間の確率解釈を、頻度論的95%信頼区間と比較せよ。

<details><summary>解答</summary>

事前精度は $1/4$、データ精度は4なので

$$
\frac1{\tau_n^2}
=\frac14+4
=\frac{17}{4},
$$

よって

$$
\tau_n^2=\frac4{17}.
$$

事後平均は

$$
\mu_n
=\frac4{17}(0+4)
=\frac{16}{17}.
$$

したがって

$$
\mu\mid x
\sim
N\left(\frac{16}{17},\frac4{17}\right).
$$

二乗損失下のベイズ推定量は $16/17$。中央95%信用区間は

$$
\frac{16}{17}
\pm
z_{0.975}\frac{2}{\sqrt{17}}.
$$

この区間には、指定した事前分布とモデルの下で $\mu$ が入る事後確率が0.95ある。頻度論的信頼区間は、固定された $\mu$ に対する反復被覆率で解釈する。

</details>

### C04 事後最頻値と最尤推定量

ベルヌーイ標本で成功数を $x$、標本サイズを $n$ とする。事前分布を

$$
p\sim\operatorname{Beta}(a,b)
$$

とする。

1. 事後最頻値を求めよ。ただし内部解が存在するとする。
2. 最尤推定量を求めよ。
3. $a=b=1$ のとき比較せよ。
4. 一般の $a,b$ で、事後最頻値が最尤推定量と異なる理由を対数事後密度から説明せよ。

<details><summary>解答</summary>

1.

$$
\hat p_{\mathrm{post.mode}}
=
\frac{a+x-1}{a+b+n-2}.
$$

2.

$$
\hat p_{\mathrm{MLE}}=\frac xn.
$$

3. $a=b=1$ なら

$$
\hat p_{\mathrm{post.mode}}=\frac xn
$$

となり一致する。

4. 事後最頻値は

$$
\log L(p;x)+\log\pi(p)
$$

を最大化する。$a,b$ が一般値なら $\log\pi(p)$ が定数ではないため、尤度だけを最大化する最尤推定量からずれる。

</details>

---



<a id="ex-i4-01-gibbs"></a>
### I401-C05 ギブスサンプリング

- Level: C
- 目安時間: 18分
- 主題: ギブスサンプリング

$(X,Y)$ は平均0、分散1、相関係数 $\rho=1/2$ の2変量正規分布に従う。

1. $X\mid Y=y$ と $Y\mid X=x$ の分布を書け。
2. 現在 $Y^{(t)}=2$ のとき、次の $X^{(t+1)}$ の条件付き平均と分散を求めよ。
3. ギブスサンプリングがメトロポリス・ヘイスティングス法と違って通常は受理・棄却判定を必要としない理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1.
$$
X\mid Y=y\sim N(y/2,3/4),\qquad
Y\mid X=x\sim N(x/2,3/4).
$$
2. 平均1、分散 $3/4$。
3. 各更新で目標同時分布の完全条件付き分布から直接生成するため、その更新値をそのまま受理できる。

##### 本番答案

条件付き分布はそれぞれ $N(y/2,3/4)$、$N(x/2,3/4)$。$Y^{(t)}=2$ なら次の $X$ は平均1、分散 $3/4$。完全条件付き分布から直接引くので通常は受理判定を要しない。

##### 採点基準

条件付き分布10点、数値4点、受理判定の説明6点。

<!-- solution-end -->

## 15. 演習 Level D

### D01 ベータ・二項モデルを意思決定まで閉じる

ベルヌーイ母数 $p$ に対して

$$
p\sim\operatorname{Beta}(a,b)
$$

とし、$n$ 回中 $x$ 回成功を観測した。$a,b>0$ とする。

1. 事後分布を導出せよ。
2. 二乗損失下のベイズ推定量を求め、事前平均と標本比率の加重平均として表せ。
3. $a+x>1$、$b+n-x>1$ のもとで事後最頻値を求めよ。
4. 未来の $m$ 回の成功数 $Y$ の事後予測分布を積分から導出せよ。
5. 特に $m=1$ のときの成功確率が二乗損失下のベイズ推定量と一致することを示せ。
6. 離散化した意思決定として「$p\ge c$ なら行動1、$p<c$ なら行動0」を考える。誤分類損失が対称なら、観測後にどの事後確率を比較すればよいか。

<details><summary>解答</summary>

1. 尤度と事前密度の核を掛けると

$$
\begin{aligned}
\pi(p\mid x)
&\propto
p^x(1-p)^{n-x}
 p^{a-1}(1-p)^{b-1}\\
&=
p^{a+x-1}(1-p)^{b+n-x-1}.
\end{aligned}
$$

したがって

$$
\boxed{
p\mid x
\sim
\operatorname{Beta}(a+x,b+n-x)
}.
$$

2. 二乗損失下では事後平均なので

$$
\delta_B(x)
=
\frac{a+x}{a+b+n}.
$$

これは

$$
\boxed{
\delta_B(x)
=
\frac{a+b}{a+b+n}\frac{a}{a+b}
+
\frac{n}{a+b+n}\frac{x}{n}
}
$$

である。

3.

$$
\boxed{
\hat p_{\mathrm{post.mode}}
=
\frac{a+x-1}{a+b+n-2}
}.
$$

4. $a'=a+x$、$b'=b+n-x$ と置く。

$$
\begin{aligned}
P(Y=y\mid x)
&=
\int_0^1
{m\choose y}p^y(1-p)^{m-y}
\frac{p^{a'-1}(1-p)^{b'-1}}{B(a',b')}
\,dp\\
&=
{m\choose y}
\frac{B(a'+y,b'+m-y)}{B(a',b')}.
\end{aligned}
$$

5. $m=1,y=1$ なら

$$
P(Y=1\mid x)
=
\frac{a'}{a'+b'}
=
\frac{a+x}{a+b+n}
=
\delta_B(x).
$$

これは、次のベルヌーイ成功確率が $E[p\mid x]$ だからである。

6. 行動1が正しい事象は $p\ge c$、行動0が正しい事象は $p<c$。対称な0–1誤分類損失なら

$$
P(p\ge c\mid x)
$$

と

$$
P(p<c\mid x)
$$

を比較し、事後確率が大きい側の行動を選べば事後期待損失が小さい。

</details>

---

## 16. 30分ドリル

### DRILL01 共役更新・推定・予測の総合

次に答えよ。

1. $p\sim\operatorname{Beta}(3,7)$、10回中6回成功した。事後分布を求めよ。
2. 1の二乗損失下のベイズ推定量を求めよ。
3. 1の次の1回の成功事後予測確率を求めよ。
4. $\lambda\sim\operatorname{Gamma}(4,2)$、3期間の総件数が9だった。事後分布を求めよ。
5. 4の次の1期間の事後予測平均を求めよ。
6. $\mu\sim N(0,1)$、$X_i\mid\mu\sim N(\mu,4)$、$n=4,\bar X=2$ のとき事後平均と事後分散を求めよ。
7. 二乗損失・絶対損失・離散母数の0–1損失の最適点をそれぞれ答えよ。
8. 事後最頻値と最尤推定量の違いを一文で述べよ。
9. 95%信用区間と95%信頼区間の確率解釈の違いを述べよ。

<details><summary>解答</summary>

1.

$$
p\mid x
\sim
\operatorname{Beta}(9,11).
$$

2.

$$
E[p\mid x]
=\frac9{20}=0.45.
$$

3. 事後予測確率も $0.45$。

4.

$$
\lambda\mid x
\sim
\operatorname{Gamma}(13,5).
$$

5. ポアソンの次期件数の条件付き平均は $\lambda$ なので、事後予測平均は

$$
E[\lambda\mid x]
=\frac{13}{5}=2.6.
$$

6. 事前精度は1、データ精度は $4/4=1$ なので事後精度は2、事後分散は $1/2$。事後平均は

$$
\frac12(0+2)=1.
$$

7. 事後平均、事後中央値、事後最頻値。

8. 最尤推定量は尤度だけを最大化し、事後最頻値は尤度と事前密度の積を最大化する。

9. 信用区間は観測データの下で母数に事後確率を付ける。信頼区間は固定母数に対するランダム区間の反復被覆率で定義される。

</details>

---

## 17. まとめ

本章の中心式は

$$
\boxed{
\pi(\theta\mid x)
\propto
L(\theta;x)\pi(\theta)
}
$$

です。しかし、ここで終わりではありません。

$$
\boxed{
\text{事後分布}
\longrightarrow
\begin{cases}
\text{損失を最小化して点推定},\\
\text{事後確率から区間推定},\\
\text{母数を積分して未来を予測}
\end{cases}
}
$$

二乗損失なら事後平均、絶対損失なら事後中央値、離散母数の0–1損失なら事後最頻値です。したがって「ベイズ推定量」という一つの固定公式があるのではなく、**事後分布と損失関数の組が意思決定を決める**と理解するのが本質です。

共役分布については、分布名を暗記するだけでなく、尤度と事前分布の核を掛けて指数がどう加わるかを追えるようにしてください。そうすれば、ベータ・二項、ガンマ・ポアソン、正規・正規を同じ更新原理として扱えます。
