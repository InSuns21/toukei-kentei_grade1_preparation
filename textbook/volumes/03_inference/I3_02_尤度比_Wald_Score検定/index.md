<!-- definition-example-audit: strict -->

# I3-02 尤度比・ワルド・スコア検定

I3-01 では、第一種過誤を制御しながら検出力を高めるという検定の基本原理を学びました。本章では一般の尤度モデルで広く使われる3つの大標本検定、**尤度比検定・ワルド型検定・スコア型検定**を扱います。

この章では、冒頭だけ数値例を出して後から記号だけに戻る構成を避けます。中心となる

> **コイン100回中60回表、$H_0:p=0.5$**

という同じデータを、尤度比・ワルド型・スコア型の各節で繰り返し使います。

3つの直観は

$$
\boxed{
\begin{array}{c}
\text{尤度比検定}:\ \text{山の高さの差}\\[1mm]
\text{ワルド型検定}:\ \text{推定値と帰無値の距離}\\[1mm]
\text{スコア型検定}:\ \text{帰無仮説点での傾き}
\end{array}
}
$$

です。

関連する正本:

- [I1-01 尤度・最尤推定](../I1_01_尤度_最尤推定/index.md)
- [I1-02 推定法と推定量の評価](../I1_02_推定法と推定量の評価/index.md)
- [I2-01 漸近推測・デルタ法](../I2_01_漸近推測_Delta法/index.md)
- [I3-01 検定の基礎とネイマン・ピアソン理論](../I3_01_検定の基礎とネイマン_ピアソン理論/index.md)

## この章で解けるようになる問題

- 制約なし最尤推定量と帰無仮説下の制約付き最尤推定量を区別する。
- 尤度比統計量 $-2\log\Lambda$ を数値から計算する。
- Wilksの定理からカイ二乗近似と自由度を読む。
- ワルド型統計量を推定値と推定標準誤差から作る。
- スコア型統計量を帰無仮説点のスコアとフィッシャー情報量から作る。
- ベルヌーイ・ポアソンで3統計量を具体的に比較する。
- 迷惑母数は帰無仮説下でも再推定することを数値で確認する。
- 尤度比の再母数化不変性と、ワルド型の有限標本での非不変性を数値で確認する。
- 正則条件が壊れる境界・非正則問題で、通常のカイ二乗近似を機械適用しない。

---

## 0. まず同じコインで3つを並べる

コインを100回投げて60回表だったとします。

$$
X\sim\operatorname{Bin}(100,p),
\qquad
H_0:p=0.5,
\qquad
\hat p=0.6.
$$

3つの統計量は後で導きますが、先に結果を並べると

$$
G^2\approx4.027,
\qquad
W\approx4.167,
\qquad
S=4.000.
$$

5%水準の自由度1のカイ二乗分布の臨界値は

$$
\chi^2_{1,0.95}\approx3.84
$$

なので、3検定とも $H_0:p=0.5$ を棄却します。

ただし値は完全には一致していません。その理由を本章全体で追います。

---

## 1. 3検定は何を見ているのか

| 検定 | 見る場所 | コイン例での意味 |
|---|---|---|
| 尤度比 | 帰無仮説下と制約なしの最大尤度 | $p=0.5$ の山と $p=0.6$ の山の高さを比較 |
| ワルド型 | 制約なし推定値 | $0.6$ が $0.5$ から標準誤差何個分離れたか |
| スコア型 | 帰無仮説点 | $p=0.5$ に立ったとき尤度がどれだけ右へ上がりたがるか |

ここで最も大事なのは、**評価する場所が違う**ことです。

- ワルド型は推定値 $\hat p=0.6$ 側でばらつきを測る。
- スコア型は帰無値 $p_0=0.5$ 側でばらつきを測る。
- 尤度比は2点の尤度そのものを比べる。

有限標本ではこの違いが統計量の差になります。

---

## 2. 尤度比検定：山の高さを比べる

帰無仮説を

$$
H_0:\theta\in\Theta_0
$$

とします。制約なし最尤推定量を $\hat\theta$、帰無仮説の制約下の最尤推定量を $\tilde\theta$ とします。

<a id="def-i3-02-likelihood-ratio"></a>

<!-- formal-statement-start -->
> **定義（尤度比検定・尤度比・尤度比統計量）**  
> 尤度比を
>
> $$
> \Lambda
> =\frac{\sup_{\theta\in\Theta_0}L(\theta)}
> {\sup_{\theta\in\Theta}L(\theta)}
> =\frac{L(\tilde\theta)}{L(\hat\theta)}
> $$
>
> と定める。通常
>
> $$
> \boxed{
> G^2=-2\log\Lambda
> =2\{\ell(\hat\theta)-\ell(\tilde\theta)\}
> }
> $$
>
> を尤度比統計量とし、$G^2$ が大きい側を棄却側とする。
<!-- formal-statement-end -->

### 2.1 コイン100回・60表で実際に計算する

二項尤度の定数を除く部分は

$$
L(p)\propto p^{60}(1-p)^{40}.
$$

制約なしでは

$$
\hat p=60/100=0.6.
$$

帰無仮説では $p=0.5$ に固定されるので

$$
\tilde p=0.5.
$$

したがって

$$
\begin{aligned}
G^2
&=2\{\ell(0.6)-\ell(0.5)\}\\
&=2\left[
60\log\frac{0.6}{0.5}
+40\log\frac{0.4}{0.5}
\right]\\
&\approx4.027.
\end{aligned}
$$

$$
4.027>3.84
$$

なので5%水準で棄却です。

<!-- definition-example-start: def-i3-02-likelihood-ratio -->
**定義の確認**  
この例では「データに最も合う $p=0.6$」と「帰無仮説が強制する $p=0.5$」で最大尤度を比較しています。帰無仮説を課したことで尤度の山がどれだけ低くなるかを測るのが尤度比統計量です。
<!-- definition-example-end -->

### 2.2 正規母平均では式が特に簡単になる

$X_i\sim N(\mu,\sigma^2)$、$\sigma$ 既知、$H_0:\mu=\mu_0$ なら

$$
\boxed{
G^2
=\frac{n(\bar X-\mu_0)^2}{\sigma^2}
}.
$$

これは後で見るワルド型・スコア型と**有限標本でも完全に一致**します。理由は正規平均の対数尤度が $\mu$ について厳密な二次関数だからです。この正規式は具体例というより、3検定が一致する特別な基準例です。

---

## 3. Wilksの定理：なぜカイ二乗分布と比較するのか

<a id="thm-i3-02-wilks"></a>

<!-- formal-statement-start -->
> **定理（Wilksの定理）**  
> 真の母数が帰無仮説集合の正則な点にあり、モデルが識別可能で、対数尤度が十分滑らかであるなど通常の正則条件を満たすとする。帰無仮説によって独立な自由方向を $r$ 個失うとき、$H_0$ の下で
>
> $$
> \boxed{-2\log\Lambda\xrightarrow{d}\chi_r^2}
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

コイン例では母数は $p$ の1個で、$H_0:p=0.5$ によってその1方向を固定するので $r=1$ です。したがって

$$
G^2\approx4.027
$$

を $\chi^2_1$ と比較しました。

2母数 $(p,q)$ に制約 $p=q$ を1本課す場合も、失う独立な方向は1本なので自由度1です。

### 3.1 Wilksの定理を機械適用してはいけない場合

通常のカイ二乗極限は、例えば次で壊れることがあります。

- 真値が母数空間の境界にある。
- 帰無仮説下で一部の母数が識別不能になる。
- 情報量が退化する。
- 一様分布の端点推定のように支持が母数に依存する。

---

## 4. ワルド型検定：推定値は帰無値から標準誤差何個分離れたか

<a id="def-i3-02-wald"></a>

<!-- formal-statement-start -->
> **定義（ワルド型検定・1母数のワルド型統計量）**  
> $H_0:\theta=\theta_0$ に対し、推定標準誤差を $\widehat{\operatorname{se}}(\hat\theta)$ とすると
>
> $$
> \boxed{
> W
> =\frac{(\hat\theta-\theta_0)^2}
> {\widehat{\operatorname{se}}(\hat\theta)^2}
> }
> $$
>
> をワルド型統計量とする。正則条件の下で $W\xrightarrow{d}\chi_1^2$ である。
<!-- formal-statement-end -->

### 4.1 同じコインで計算する

$\hat p=0.6$ なので、推定値側で評価した標準誤差は

$$
\widehat{\operatorname{se}}(\hat p)
=\sqrt{\frac{0.6(1-0.6)}{100}}
=\sqrt{0.0024}
\approx0.0490.
$$

帰無値との差は

$$
0.6-0.5=0.1.
$$

標準誤差何個分かを見ると

$$
Z_W
=\frac{0.1}{0.0490}
\approx2.041.
$$

これを二乗して

$$
\boxed{W\approx2.041^2\approx4.167}.
$$

3.84を超えるので5%水準で棄却します。

<!-- definition-example-start: def-i3-02-wald -->
**定義の確認**  
ワルド型検定では、ばらつきを $p=0.5$ ではなく推定値 $\hat p=0.6$ で評価します。このためコイン例ではスコア型の4.000と少し違う4.167になります。
<!-- definition-example-end -->

---

## 5. スコア型検定：帰無仮説点に立ったまま傾きを見る

<a id="def-i3-02-score"></a>

<!-- formal-statement-start -->
> **定義（スコア型検定・1母数のスコア型統計量）**  
> $H_0:\theta=\theta_0$ に対し、スコア $U(\theta)=\ell'(\theta)$ とフィッシャー情報量 $I(\theta)$ を用いて
>
> $$
> \boxed{S=\frac{U(\theta_0)^2}{I(\theta_0)}}
> $$
>
> をスコア型統計量とする。正則条件の下で $S\xrightarrow{d}\chi_1^2$ である。
<!-- formal-statement-end -->

### 5.1 同じコインで計算する

二項モデルでは、帰無仮説 $p_0=0.5$ の下で標本比率の標準誤差は

$$
\operatorname{se}_0(\hat p)
=\sqrt{\frac{0.5(1-0.5)}{100}}
=0.05.
$$

したがって帰無仮説点で標準化すると

$$
Z_S
=\frac{0.6-0.5}{0.05}
=2.
$$

二乗して

$$
\boxed{S=4.000}.
$$

<!-- definition-example-start: def-i3-02-score -->
**定義の確認**  
スコア型検定は最尤推定値側へ移動せず、$p=0.5$ が正しいと仮定した場所でばらつきを測ります。ここがワルド型との最も見やすい違いです。
<!-- definition-example-end -->

---

## 6. 3検定を同じデータで見比べる

コイン100回中60表では

| 検定 | 評価の仕方 | 統計量 |
|---|---|---:|
| 尤度比 | $\ell(0.6)-\ell(0.5)$ | $4.027$ |
| ワルド型 | $0.6$ 側で標準誤差を評価 | $4.167$ |
| スコア型 | $0.5$ 側で標準誤差を評価 | $4.000$ |

どれも3.84を超えるので判断は同じです。しかし有限標本では統計量が違います。

正則な大標本で3つが近づく理由は、尤度の山を真値の近くで二次関数として見ると、

- 山の高さ差
- 山頂と帰無値の距離
- 帰無値での傾き

が同じ局所二次近似から作られるからです。

<a id="thm-i3-02-equivalence"></a>

<!-- formal-statement-start -->
> **定理（1母数での尤度比・ワルド型・スコア型検定の漸近同値性）**  
> 正則な1母数モデルで $H_0:\theta=\theta_0$ を考える。通常の最尤推定量の正則条件の下で
>
> $$
> G^2-W=o_p(1),
> \qquad
> W-S=o_p(1),
> $$
>
> かつ
>
> $$
> \boxed{G^2,W,S\xrightarrow{d}\chi_1^2}
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 6.1 正規母平均で完全一致する理由

既知分散正規平均では対数尤度が厳密な二次関数なので

$$
G^2=W=S
=\frac{n(\bar X-\mu_0)^2}{\sigma^2}
$$

が有限標本でも成り立ちます。一般モデルでは「漸近的に近い」であって「有限標本で同じ」ではありません。

---

## 7. ベルヌーイ母比率の一般式

$X_i\sim\operatorname{Bernoulli}(p)$、$\hat p=\bar X$ とします。

$$
\ell(p)
=n\hat p\log p+n(1-\hat p)\log(1-p).
$$

$H_0:p=p_0$ に対し

$$
\boxed{
G^2
=2n\left[
\hat p\log\frac{\hat p}{p_0}
+(1-\hat p)\log\frac{1-\hat p}{1-p_0}
\right]
},
$$

$$
\boxed{
W=\frac{n(\hat p-p_0)^2}{\hat p(1-\hat p)}
},
$$

$$
\boxed{
S=\frac{n(\hat p-p_0)^2}{p_0(1-p_0)}
}.
$$

0節から5節で計算した $n=100,\hat p=0.6,p_0=0.5$ は、この一般式へ実数を代入したものです。

---

## 8. ポアソン平均でも3つを数値で比較する

次は「全部棄却する」例だけでなく、**3つとも棄却しない**例を見ます。

20期間の事故件数が独立に

$$
X_i\sim\operatorname{Poisson}(\lambda)
$$

に従い、合計50件だったとします。

$$
n=20,
\qquad
\sum X_i=50,
\qquad
\hat\lambda=2.5.
$$

$$
H_0:\lambda=2
$$

を検定します。

尤度比統計量は

$$
\begin{aligned}
G^2
&=2n\left[
\hat\lambda\log\frac{\hat\lambda}{\lambda_0}
-(\hat\lambda-\lambda_0)
\right]\\
&=40\{2.5\log1.25-0.5\}\\
&\approx2.314.
\end{aligned}
$$

ワルド型は

$$
W
=\frac{20(2.5-2)^2}{2.5}
=2.000.
$$

スコア型は

$$
S
=\frac{20(2.5-2)^2}{2}
=2.500.
$$

全部3.84未満なので、5%水準ではどの検定でも棄却しません。

> **ここで見るべきこと**  
> $2.000,2.314,2.500$ と有限標本値は違います。それでも帰無仮説付近の大標本では同じ局所情報を見ているため、通常は同じような判断になります。

一般式は

$$
\boxed{
G^2
=2n\left[
\hat\lambda\log\frac{\hat\lambda}{\lambda_0}
-(\hat\lambda-\lambda_0)
\right]
},
$$

$$
\boxed{W=\frac{n(\hat\lambda-\lambda_0)^2}{\hat\lambda}},
\qquad
\boxed{S=\frac{n(\hat\lambda-\lambda_0)^2}{\lambda_0}}.
$$

---

## 9. 迷惑母数：帰無仮説下でも固定されていなければ再推定する

抽象記号だけだと分かりにくいので、まず正規母平均を未知分散の下で検定します。

$$
X_i\sim N(\mu,v),
\qquad
H_0:\mu=50.
$$

10個のデータについて

$$
n=10,
\qquad
\bar x=52,
$$

制約なしの分散最尤推定量が

$$
\hat v
=\frac1{10}\sum_{i=1}^{10}(x_i-52)^2
=16
$$

だったとします。

帰無仮説では平均を50に固定しますが、分散 $v$ は固定していません。したがって $v$ は**50を中心にもう一度推定**します。

恒等式

$$
\frac1n\sum(X_i-\mu_0)^2
=\frac1n\sum(X_i-\bar X)^2
+(\bar X-\mu_0)^2
$$

より

$$
\tilde v
=16+(52-50)^2
=20.
$$

従って尤度比統計量は

$$
\boxed{
G^2
=10\log\frac{20}{16}
\approx2.231
}.
$$

3.84未満なので5%水準では棄却しません。

ここでの核心は

> **帰無仮説が固定したのは平均50だけで、分散16を固定したわけではない。**

ということです。

一般に母数を $(\psi,\lambda)$、検定対象を $\psi$、迷惑母数を $\lambda$ とし

$$
H_0:\psi=\psi_0
$$

なら

$$
\boxed{
\tilde\lambda
=\arg\max_\lambda\ell(\psi_0,\lambda)
}
$$

と帰無仮説の範囲内で再推定します。

---

## 10. 再母数化：尤度比は同じだがワルド型は有限標本で変わる

コイン例へ戻ります。

$$
\hat p=0.6,
\qquad
p_0=0.5,
\qquad
n=100.
$$

$p$ 尺度のワルド型統計量は

$$
W_p\approx4.167.
$$

今度は対数オッズ

$$
\eta=\log\frac p{1-p}
$$

へ変換します。

$$
\hat\eta=\log\frac{0.6}{0.4}=\log1.5\approx0.4055,
\qquad
\eta_0=0.
$$

デルタ法による推定分散は

$$
\widehat{\operatorname{Var}}(\hat\eta)
\approx\frac1{n\hat p(1-\hat p)}
=\frac1{24}.
$$

したがって

$$
\begin{aligned}
W_\eta
&=\frac{(0.4055-0)^2}{1/24}\\
&\approx3.946.
\end{aligned}
$$

同じデータ・同じ仮説なのに

$$
W_p\approx4.167,
\qquad
W_\eta\approx3.946
$$

と有限標本値は変わりました。

<a id="prop-i3-02-lr-invariance"></a>

<!-- formal-statement-start -->
> **命題（尤度比統計量の再母数化不変性）**  
> $\eta=g(\theta)$ が1対1の再母数化であり、帰無仮説集合も同じモデル集合を表すように移されるなら、尤度比 $\Lambda$ と尤度比統計量 $-2\log\Lambda$ は再母数化によって変化しない。
<!-- formal-statement-end -->

尤度比は「同じ2つのモデル集合で得られる最大尤度値」を比べるので、母数の座標名を変えても値は変わりません。コイン例では $p$ 尺度でも対数オッズ尺度でも

$$
G^2\approx4.027
$$

のままです。

---

## 11. 発展：一般制約のワルド型検定と有効情報量

ここからは多母数の発展です。1級対策の基本では、まず前節までの具体例を優先してください。

<a id="def-i3-02-wald-general"></a>

<!-- formal-statement-start -->
> **定義（一般制約のワルド型統計量）**  
> $\theta\in\mathbb R^p$、$H_0:h(\theta)=0$ が $r$ 本の独立な滑らかな制約を表すとする。ヤコビ行列を $H(\theta)=\partial h(\theta)/\partial\theta^{\mathsf T}$ とすると、正則条件下で
>
> $$
> W
> =n h(\hat\theta)^{\mathsf T}
> \left[
> H(\hat\theta)I_1(\hat\theta)^{-1}H(\hat\theta)^{\mathsf T}
> \right]^{-1}
> h(\hat\theta)
> $$
>
> は $\chi_r^2$ へ収束する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i3-02-wald-general -->
**定義の確認**  
線形制約 $h(\theta)=R\theta-r_0$ ならヤコビ行列は $R$ で、$R$ の階数が2なら自由度2のカイ二乗極限になります。
<!-- definition-example-end -->

<a id="def-i3-02-efficient-information"></a>

<!-- formal-statement-start -->
> **定義（迷惑母数を除いた有効情報量）**  
> 情報行列を
>
> $$
> I(\theta)
> =\begin{pmatrix}
> I_{\psi\psi}&I_{\psi\lambda}\\
> I_{\lambda\psi}&I_{\lambda\lambda}
> \end{pmatrix}
> $$
>
> と分割したとき
>
> $$
> \boxed{
> I_{\psi\cdot\lambda}
> =I_{\psi\psi}
> -I_{\psi\lambda}I_{\lambda\lambda}^{-1}I_{\lambda\psi}
> }
> $$
>
> を $\psi$ に対する有効情報量という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i3-02-efficient-information -->
**定義の確認**  
例えば

$$
I=\begin{pmatrix}5&2\\2&4\end{pmatrix}
$$

で第2母数が迷惑母数なら

$$
I_{1\cdot2}=5-\frac{2^2}{4}=4.
$$

迷惑母数が未知なため、第1母数だけを見た情報5を全部は使えず、有効情報量は4になります。
<!-- definition-example-end -->

---

## 12. 発展：3検定が漸近的に同じになる見取り図

観測情報量を

$$
J_n(\theta)=-\ell_n''(\theta)
$$

とします。最尤推定量の近くで

$$
\ell_n(\theta)
\approx
\ell_n(\hat\theta)
-\frac12J_n(\hat\theta)(\theta-\hat\theta)^2.
$$

従って

$$
G^2
\approx J_n(\hat\theta)(\hat\theta-\theta_0)^2.
$$

スコア方程式も

$$
0=U_n(\hat\theta)
\approx U_n(\theta_0)-J_n(\theta_0)(\hat\theta-\theta_0)
$$

と展開できます。正則条件下では $J_n/n$ と $I_n/n$ が同じ極限へ近づくため、3統計量が同じ局所二次近似へ集約されます。

<a id="thm-i3-02-local-alternative"></a>

<!-- formal-statement-start -->
> **定理（1母数局所対立仮説下の極限）**  
> 正則な1母数モデルで
>
> $$
> \theta_n=\theta_0+\frac h{\sqrt n}
> $$
>
> とする。通常の局所漸近正規性が成り立つとき、尤度比・ワルド型・スコア型統計量はいずれも
>
> $$
> \chi_1^2(\delta),
> \qquad
> \delta=h^2I_1(\theta_0)
> $$
>
> へ分布収束する。
<!-- formal-statement-end -->

---

## 13. 使い分け

| 観点 | 尤度比 | ワルド型 | スコア型 |
|---|---|---|---|
| 直観 | 山の高さ差 | 推定値と帰無値の距離 | 帰無点の傾き |
| 必要な推定 | 制約なし + 制約付き | 制約なし | 帰無点評価 |
| 再母数化 | 不変 | 有限標本で非不変 | 大標本で同値 |
| 境界付近 | Wilksが壊れることあり | 特に不安定になりうる | 正則条件を要確認 |
| 正則大標本 | カイ二乗 | カイ二乗 | カイ二乗 |

「どれが常に最良」という話ではありません。試験ではまず、**何をどこで評価している統計量か**を区別できることが重要です。

---

# 演習

## Level A

### I3-02-A01 3つの直観

次を尤度比・ワルド型・スコア型のどれかに対応づけよ。

1. 帰無仮説点での尤度の傾き。
2. 推定値と帰無値の標準誤差単位の距離。
3. 制約なし最大尤度と帰無仮説下最大尤度の差。

<!-- solution-start -->
#### 解答

1. スコア型。
2. ワルド型。
3. 尤度比。
<!-- solution-end -->

### I3-02-A02 コインのワルド型

$n=100,\hat p=0.6,p_0=0.5$ とする。推定標準誤差とワルド型統計量を求めよ。

<!-- solution-start -->
#### 解答

$$
\widehat{\operatorname{se}}(\hat p)
=\sqrt{0.6\cdot0.4/100}\approx0.0490,
$$

$$
W=(0.1/0.0490)^2\approx4.167.
$$
<!-- solution-end -->

### I3-02-A03 コインのスコア型

同じデータで帰無仮説下の標準誤差とスコア型統計量を求めよ。

<!-- solution-start -->
#### 解答

$$
\operatorname{se}_0=\sqrt{0.5\cdot0.5/100}=0.05,
$$

$$
S=(0.1/0.05)^2=4.
$$
<!-- solution-end -->

### I3-02-A04 Wilksの自由度

4次元母数に独立な2本の正則な制約を課す。Wilksの定理を用いてよいとき $-2\log\Lambda$ の極限分布を答えよ。

<!-- solution-start -->
#### 解答

$$
\boxed{\chi_2^2}.
$$
<!-- solution-end -->

## Level B

### I3-02-B01 ベルヌーイ3検定

$n=100$、成功数60、$H_0:p=0.5$ とする。$G^2,W,S$ を求め、$\chi^2_{1,0.95}=3.84$ と比較せよ。

<!-- solution-start -->
#### 解答

$$
\hat p=0.6,
\qquad
G^2\approx4.027,
\qquad
W\approx4.167,
\qquad
S=4.000.
$$

全部3.84を超えるので5%水準で棄却。
<!-- solution-end -->

### I3-02-B02 ポアソン3検定

$n=20,\sum X_i=50$、$H_0:\lambda=2$ とする。3統計量を求め、5%水準で判断せよ。

<!-- solution-start -->
#### 解答

$$
\hat\lambda=2.5,
$$

$$
G^2\approx2.314,
\qquad
W=2.000,
\qquad
S=2.500.
$$

いずれも3.84未満なので棄却しない。
<!-- solution-end -->

### I3-02-B03 未知分散正規母平均の尤度比

$n=10,\bar x=52,\hat v=16$ とし、$H_0:\mu=50$ を検定する。

1. 帰無仮説下の分散最尤推定量 $\tilde v$ を求めよ。
2. 尤度比統計量を求めよ。
3. 5%水準で判断せよ。

<!-- solution-start -->
#### 解答

$$
\tilde v=16+(52-50)^2=20,
$$

$$
G^2=10\log(20/16)\approx2.231<3.84.
$$

従って棄却しない。
<!-- solution-end -->

### I3-02-B04 再母数化とワルド型

$n=100,\hat p=0.6,p_0=0.5$ について、$p$ 尺度と対数オッズ尺度のワルド型統計量を求めよ。

<!-- solution-start -->
#### 解答

$$
W_p\approx4.167.
$$

$$
\hat\eta=\log1.5\approx0.4055,
\qquad
\widehat{\operatorname{Var}}(\hat\eta)=1/24,
$$

$$
W_\eta\approx3.946.
$$

有限標本では一致しない。
<!-- solution-end -->

## Level C

### I3-02-C01 3検定の漸近同値性

1母数正則モデルで $H_0:\theta=\theta_0$ とする。対数尤度の2次展開とスコア方程式の1次展開から、$G^2,W,S$ が同じ局所二次形式へ近づくことを説明せよ。

<!-- solution-start -->
#### 解答

$$
G^2\approx J_n(\hat\theta)(\hat\theta-\theta_0)^2,
$$

$$
U_n(\theta_0)\approx J_n(\theta_0)(\hat\theta-\theta_0).
$$

またワルド型は $I_n(\hat\theta)(\hat\theta-\theta_0)^2$。正則条件下で $J_n/n$ と $I_n/n$ は同じ極限へ近づくため、差は $o_p(1)$ となり共通に $\chi_1^2$ へ収束する。
<!-- solution-end -->

### I3-02-C02 多母数の線形制約ワルド型検定

$H_0:R\theta=r_0$、$R$ の階数を $r$ とする。一般制約のワルド型統計量と極限分布を書け。

<!-- solution-start -->
#### 解答

$$
W
=n(R\hat\theta-r_0)^{\mathsf T}
[R I_1(\hat\theta)^{-1}R^{\mathsf T}]^{-1}
(R\hat\theta-r_0)
\xrightarrow{d}\chi_r^2.
$$
<!-- solution-end -->

### I3-02-C03 迷惑母数と有効情報量

$$
I=\begin{pmatrix}5&2\\2&4\end{pmatrix}
$$

で第1母数を検定し、第2母数を迷惑母数とする。有効情報量を求めよ。

<!-- solution-start -->
#### 解答

$$
I_{1\cdot2}=5-2^2/4=4.
$$
<!-- solution-end -->

### I3-02-C04 2状態マルコフ連鎖の尤度比

2状態マルコフ連鎖

$$
P=\begin{pmatrix}1-p&p\\q&1-q\end{pmatrix}
$$

について、遷移回数を $N_{00},N_{01},N_{10},N_{11}$ とする。$H_0:p=q$ の制約なし・制約付き最尤推定量を求め、尤度比統計量の自由度を答えよ。

<!-- solution-start -->
#### 解答

$$
\hat p=\frac{N_{01}}{N_{00}+N_{01}},
\qquad
\hat q=\frac{N_{10}}{N_{10}+N_{11}}.
$$

帰無仮説下で $p=q=t$ と置くと

$$
\tilde t
=\frac{N_{01}+N_{10}}
{N_{00}+N_{01}+N_{10}+N_{11}}.
$$

制約なし2母数、制約下1母数なので正則なら自由度1。
<!-- solution-end -->

## Level D

### I3-02-D01 局所対立仮説と非心カイ二乗

1母数正則モデルで

$$
\theta_n=\theta_0+\frac h{\sqrt n}
$$

とする。1観測あたりの情報量を $I_1(\theta_0)$ としたとき、3検定の局所対立仮説下の極限分布と非心度を答えよ。

<!-- solution-start -->
#### 解答

$$
G^2,W,S
\xrightarrow{d}
\chi_1^2(\delta),
\qquad
\delta=h^2I_1(\theta_0).
$$
<!-- solution-end -->

---

## 30分ドリル

### I3-02-DRILL01 コイン例を3方向から解く

$n=100$、成功数60、$H_0:p=0.5$ とする。

1. $\hat p$ を求めよ。
2. 尤度比統計量を、2つの対数尤度の差から計算せよ。
3. 推定値側の標準誤差を計算し、ワルド型統計量を求めよ。
4. 帰無値側の標準誤差を計算し、スコア型統計量を求めよ。
5. 3つが有限標本で違う理由を説明せよ。
6. 5%水準で判断せよ。
7. 対数オッズへ再母数化したとき、尤度比は変わらないがワルド型が変わる理由を説明せよ。

<!-- solution-start -->
#### 解答

$$
\hat p=0.6.
$$

$$
G^2
=2\left[60\log\frac{0.6}{0.5}+40\log\frac{0.4}{0.5}\right]
\approx4.027.
$$

$$
\widehat{\operatorname{se}}(\hat p)
=\sqrt{0.24/100}\approx0.0490,
\qquad
W\approx4.167.
$$

$$
\operatorname{se}_0=\sqrt{0.25/100}=0.05,
\qquad
S=4.
$$

評価する場所が、尤度比は両方の最大値、ワルド型は推定値、スコア型は帰無値と異なるため有限標本値も違う。全部3.84を超えるので5%水準で棄却。尤度比はモデル集合の最大尤度値を比べるため1対1再母数化で不変だが、ワルド型は座標上の距離を標準誤差で測るため有限標本で変わりうる。
<!-- solution-end -->
