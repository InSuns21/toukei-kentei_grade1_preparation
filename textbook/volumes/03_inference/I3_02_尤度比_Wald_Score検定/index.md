<!-- definition-example-audit: strict -->

# I3-02 尤度比・ワルド・スコア検定

I3-01 では、第一種過誤を制御しながら検出力を高めるという検定の基本原理を学びました。本章では、一般の正則な尤度モデルで広く使える3つの大標本検定、**尤度比検定・ワルド型検定・スコア型検定**を扱います。

3つを別々の公式として暗記する必要はありません。対数尤度を真値の近くで二次関数として見ると、

$$
\boxed{
\begin{array}{c}
\text{尤度比検定}:\ \text{山の高さの差}\\[2mm]
\text{ワルド型検定}:\ \text{頂点から帰無仮説までの距離}\\[2mm]
\text{スコア型検定}:\ \text{帰無仮説点での傾き}
\end{array}
}
$$

という違いにすぎません。正則条件の下では、いずれも同じ局所二次近似から同じカイ二乗極限へつながります。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

関連する正本:

- [I1-01](../I1_01_尤度_最尤推定/index.md): 尤度・対数尤度・スコア・最尤推定
- [I1-02](../I1_02_推定法と推定量の評価/index.md): フィッシャー情報量・観測情報量
- [I2-01](../I2_01_漸近推測_Delta法/index.md): 最尤推定量の漸近正規性・デルタ法
- [I3-01](../I3_01_検定の基礎とネイマン_ピアソン理論/index.md): 有意水準・棄却域・P値・検出力
- [L1-02](../../04_linear_models/L1_02_重回帰_線形モデルの行列表現/index.md): 線形制約

## この章で解けるようになる問題

- 制約なし最尤推定量と帰無仮説下の制約付き最尤推定量を区別できる。
- 尤度比統計量 $-2\log\Lambda$ を構成できる。
- Wilksの定理から自由度が「独立な制約の本数」になることを説明できる。
- ワルド型統計量を推定量と標準誤差から構成できる。
- スコア型統計量を帰無仮説点だけで構成できる。
- 1母数問題で3統計量を導出し、有限標本では異なっても漸近的に同値になることを説明できる。
- 多母数モデルで $r$ 本の制約に対するワルド型統計量を書ける。
- 迷惑母数がある場合に制約付き推定量と有効情報量を使える。
- 尤度比統計量の再母数化不変性と、ワルド型統計量の有限標本での非不変性を区別できる。
- 境界母数や非正則モデルでは通常のカイ二乗近似を機械的に使えないと判断できる。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 尤度比検定 | 制約付き最尤推定、尤度比、Wilksの定理、1母数・多母数例 |
| ワルド型検定 | 推定量の漸近正規性を標準化した距離型統計量、一般制約 |
| スコア型検定 | 帰無仮説点のスコアと情報量、迷惑母数を除いた有効情報量 |

---

## 1. 3検定は何を比べているのか

母数を $p$ 次元ベクトル $\theta\in\Theta$ とし、帰無仮説を

$$
H_0:h(\theta)=0
$$

とします。$h(\theta)$ は $r$ 次元で、独立な制約が $r$ 本あるとします。

制約なしの最尤推定量を $\hat\theta$、帰無仮説の制約下で尤度を最大化した推定量を $\tilde\theta$ と書きます。

$$
\hat\theta
=\arg\max_{\theta\in\Theta}\ell_n(\theta),
\qquad
\tilde\theta
=\arg\max_{\theta:\,h(\theta)=0}\ell_n(\theta).
$$

帰無仮説がデータとよく整合するなら、$\hat\theta$ と $\tilde\theta$ は近いはずです。3検定はこの「近さ」を別の角度から測ります。

| 検定 | 見る量 | 必要な推定 |
|---|---|---|
| 尤度比 | $\ell_n(\hat\theta)-\ell_n(\tilde\theta)$ | 制約なし + 制約付き |
| ワルド型 | $h(\hat\theta)$ の標準化距離 | 制約なし |
| スコア型 | $\tilde\theta$ での尤度の傾き | 原則として制約付き |

---

## 2. 尤度比検定: 山の高さを比べる

<a id="def-i3-02-likelihood-ratio"></a>

<!-- formal-statement-start -->
> **定義（尤度比と尤度比統計量）**  
> 帰無仮説 $H_0:\theta\in\Theta_0$ に対し、尤度比を

$$
\Lambda
=
\frac{\sup_{\theta\in\Theta_0}L(\theta)}
{\sup_{\theta\in\Theta}L(\theta)}
=
\frac{L(\tilde\theta)}{L(\hat\theta)}
$$

> と定める。$0\le\Lambda\le1$ であり、通常は

$$
G^2=-2\log\Lambda
=2\{\ell_n(\hat\theta)-\ell_n(\tilde\theta)\}
$$

> を尤度比統計量として用いる。$G^2$ が大きいほど帰無仮説に不利である。
<!-- formal-statement-end -->

### 2.1 例: 既知分散正規母平均

$X_1,\ldots,X_n$ は独立同分布で

$$
X_i\sim N(\mu,\sigma^2)
$$

に従い、$\sigma^2$ は既知とします。

$$
H_0:\mu=\mu_0
$$

では

$$
\hat\mu=\bar X,
\qquad
\tilde\mu=\mu_0.
$$

対数尤度の $\mu$ に依存する部分は

$$
\ell_n(\mu)
=-\frac{n}{2\sigma^2}(\bar X-\mu)^2+\text{定数}
$$

なので

$$
G^2
=\frac{n(\bar X-\mu_0)^2}{\sigma^2}.
$$

<!-- definition-example-start: def-i3-02-likelihood-ratio -->

**定義の確認**  
この例では制約なし最大値は $\mu=\bar X$、帰無仮説下では $\mu=\mu_0$ に固定されます。2つの最大対数尤度の差を2倍すると $G^2=n(\bar X-\mu_0)^2/\sigma^2$ になります。

<!-- definition-example-end -->

---

## 3. Wilksの定理: なぜカイ二乗分布が出るのか

<a id="thm-i3-02-wilks"></a>

<!-- formal-statement-start -->
> **定理（Wilksの定理）**  
> 真の母数 $\theta_0$ が帰無仮説集合の内点にあり、モデルが識別可能で、対数尤度が十分滑らかで、フィッシャー情報量が正則であるなど通常の正則条件を満たすとする。$p$ 次元母数に $r$ 本の独立な滑らかな制約 $h(\theta)=0$ を課すとき、$H_0$ の下で

$$
-2\log\Lambda
\xrightarrow{d}
\chi_r^2.
$$
<!-- formal-statement-end -->

したがって大標本では、有意水準 $\alpha$ の尤度比検定は

$$
G^2>\chi^2_{r,1-\alpha}
$$

で棄却します。**自由度は母数の総数ではなく、制約によって失う独立な方向の数 $r$** です。

<!-- proof-start -->

### 証明

証明の骨格を示します。真値の近くで局所母数

$$
u=\sqrt n(\theta-\theta_0)
$$

を用いると、正則条件の下で

$$
\ell_n\left(\theta_0+\frac{u}{\sqrt n}\right)-\ell_n(\theta_0)
=
u^{\mathsf T}\Delta_n
-\frac12u^{\mathsf T}I_1(\theta_0)u
+o_p(1),
$$

$$
\Delta_n
=\frac1{\sqrt n}U_n(\theta_0)
\xrightarrow{d}
N_p\bigl(0,I_1(\theta_0)\bigr)
$$

と局所二次近似できます。制約なしではこの二次式を $p$ 次元全体で最大化し、帰無仮説下では制約集合の接空間に制限して最大化します。

両者の最大値差は、標準化された正規ベクトルを制約の法線方向へ射影した長さの二乗になります。独立な法線方向が $r$ 本あるため、極限は $r$ 個の独立標準正規変数の二乗和、すなわち $\chi_r^2$ です。

厳密化には局所漸近正規性と制約集合の正則性が必要です。試験答案では「対数尤度の二次近似」と「制約で失う方向数 $r$」を結びつけます。

<!-- proof-end -->

### 3.1 正則条件を外すと壊れる

次の場合には通常の $\chi_r^2$ 極限を自動適用してはいけません。

- 真値が母数空間の境界にある。
- 帰無仮説下で一部の母数が識別不能になる。
- 情報量が特異になる。
- 一様分布の端点推定のように台が母数に依存する。

たとえば分散成分 $\tau^2\ge0$ に対する $H_0:\tau^2=0$ は境界問題です。通常のWilksの定理の仮定から外れるため、単純に $\chi_1^2$ として処理できないことがあります。

---

## 4. ワルド型検定: 推定値と帰無値の距離を見る

<a id="def-i3-02-wald"></a>

<!-- formal-statement-start -->
> **定義（1母数のワルド型統計量）**  
> 1母数 $\theta$ に対し $H_0:\theta=\theta_0$ を検定する。$\hat\theta$ が漸近正規で、推定標準誤差を $\widehat{\operatorname{se}}(\hat\theta)$ とするとき

$$
W
=
\frac{(\hat\theta-\theta_0)^2}
{\widehat{\operatorname{se}}(\hat\theta)^2}
$$

> をワルド型統計量という。正則条件の下で $H_0$ のもと $W\xrightarrow{d}\chi_1^2$ である。
<!-- formal-statement-end -->

既知分散正規母平均では

$$
\widehat{\operatorname{se}}(\bar X)^2=\frac{\sigma^2}{n},
$$

$$
W
=\frac{(\bar X-\mu_0)^2}{\sigma^2/n}
=\frac{n(\bar X-\mu_0)^2}{\sigma^2}.
$$

<!-- definition-example-start: def-i3-02-wald -->

**定義の確認**  
推定値 $\bar X$ と帰無値 $\mu_0$ の差を、標準誤差 $\sigma/\sqrt n$ で標準化して二乗した量がワルド型統計量です。

<!-- definition-example-end -->

### 4.1 多母数・一般制約

$h(\theta)$ が $r$ 次元で、ヤコビ行列を

$$
H(\theta)=\frac{\partial h(\theta)}{\partial\theta^{\mathsf T}}
$$

とします。1観測あたりのフィッシャー情報量を $I_1(\theta)$ とすると、デルタ法から

$$
\sqrt n h(\hat\theta)
\xrightarrow{d}
N_r\left(0,
H(\theta_0)I_1(\theta_0)^{-1}H(\theta_0)^{\mathsf T}
\right)
$$

を得ます。

<a id="def-i3-02-wald-general"></a>

<!-- formal-statement-start -->
> **定義（一般制約のワルド型統計量）**  
> $H_0:h(\theta)=0$ が $r$ 本の独立な滑らかな制約を表すとき、

$$
W
=
n\,h(\hat\theta)^{\mathsf T}
\left[
H(\hat\theta)I_1(\hat\theta)^{-1}H(\hat\theta)^{\mathsf T}
\right]^{-1}
h(\hat\theta)
$$

> を一般制約のワルド型統計量とする。正則条件の下で $H_0$ のもと $W\xrightarrow{d}\chi_r^2$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i3-02-wald-general -->

**定義の確認**  
線形制約 $h(\theta)=R\theta-r_0$ なら $H(\theta)=R$ です。したがって

$$
W
=n(R\hat\theta-r_0)^{\mathsf T}
\left[R I_1(\hat\theta)^{-1}R^{\mathsf T}\right]^{-1}
(R\hat\theta-r_0).
$$

$R$ の階数が $r$ なら極限自由度も $r$ です。

<!-- definition-example-end -->

---

## 5. スコア型検定: 帰無仮説点での傾きを見る

最尤推定量まで動かさず、帰無仮説を仮に正しいと置いた点で「尤度がどちらへ上がりたがっているか」を見るのがスコア型検定です。

<a id="def-i3-02-score"></a>

<!-- formal-statement-start -->
> **定義（1母数のスコア型統計量）**  
> $H_0:\theta=\theta_0$ に対し、スコア $U_n(\theta)=\ell_n'(\theta)$ とフィッシャー情報量 $I_n(\theta)$ を用いて

$$
S
=
\frac{U_n(\theta_0)^2}{I_n(\theta_0)}
$$

> をスコア型統計量という。正則条件の下で $H_0$ のもと $S\xrightarrow{d}\chi_1^2$ である。
<!-- formal-statement-end -->

既知分散正規母平均では

$$
U_n(\mu)
=\frac{n(\bar X-\mu)}{\sigma^2},
\qquad
I_n(\mu)=\frac n{\sigma^2},
$$

したがって

$$
S
=\frac{n(\bar X-\mu_0)^2}{\sigma^2}.
$$

<!-- definition-example-start: def-i3-02-score -->

**定義の確認**  
帰無仮説点 $\mu_0$ でスコアを計算し、その分散に対応する情報量で標準化して二乗しています。ここでは対数尤度が厳密な二次関数なので、尤度比・ワルド型・スコア型の3統計量が完全に一致します。

<!-- definition-example-end -->

計算上は、尤度比検定は制約なし推定と制約付き推定の両方、ワルド型検定は制約なし推定、スコア型検定は原則として帰無仮説下の制約付き推定だけで構成できます。

---

## 6. 3検定はなぜ漸近的に同じなのか

1母数で $H_0:\theta=\theta_0$ を考えます。$J_n(\theta)=-\ell_n''(\theta)$ を観測情報量とします。

最尤推定量の近くでは

$$
\ell_n(\theta)
\approx
\ell_n(\hat\theta)
-\frac12J_n(\hat\theta)(\theta-\hat\theta)^2.
$$

したがって

$$
G^2
\approx
J_n(\hat\theta)(\hat\theta-\theta_0)^2.
$$

一方、ワルド型統計量は

$$
W
\approx
I_n(\hat\theta)(\hat\theta-\theta_0)^2.
$$

またスコア方程式を $\theta_0$ の周りで展開すると

$$
0=U_n(\hat\theta)
\approx
U_n(\theta_0)-J_n(\theta_0)(\hat\theta-\theta_0),
$$

ゆえに

$$
S
=\frac{U_n(\theta_0)^2}{I_n(\theta_0)}
\approx
I_n(\theta_0)(\hat\theta-\theta_0)^2.
$$

<a id="thm-i3-02-equivalence"></a>

<!-- formal-statement-start -->
> **定理（尤度比・ワルド型・スコア型検定の漸近同値性）**  
> 1母数の正則モデルで $H_0:\theta=\theta_0$ を考える。通常の最尤推定量の正則条件が成り立つとき、

$$
G^2-W=o_p(1),
\qquad
W-S=o_p(1),
$$

> であり、$H_0$ の下で

$$
G^2,\ W,\ S
\xrightarrow{d}
\chi_1^2.
$$
<!-- formal-statement-end -->

<!-- proof-start -->

### 証明

I2-01 の結果から

$$
\hat\theta-\theta_0=O_p(n^{-1/2}).
$$

また正則条件から $J_n(\theta)/n$ は $\theta_0$ 近傍で $I_1(\theta_0)$ へ確率収束します。対数尤度を $\hat\theta$ の周りで二次展開すると、中間点 $\bar\theta$ を用いて

$$
G^2
=J_n(\bar\theta)(\hat\theta-\theta_0)^2
$$

と書けます。$J_n(\bar\theta)/n$ と $J_n(\hat\theta)/n$ は同じ極限を持つため $G^2-W=o_p(1)$ です。

さらに

$$
0
=U_n(\hat\theta)
=U_n(\theta_0)-J_n(\check\theta)(\hat\theta-\theta_0)
$$

となる中間点 $\check\theta$ が存在します。これを $S$ に代入し、$J_n/n$ と $I_n/n$ の確率収束を用いると $S-W=o_p(1)$ を得ます。

最後に

$$
\sqrt{I_n(\theta_0)}(\hat\theta-\theta_0)
\xrightarrow{d}N(0,1)
$$

なので、その二乗は $\chi_1^2$ へ分布収束します。Slutskyの定理から $G^2$ と $S$ も同じ極限を持ちます。

<!-- proof-end -->

**漸近的に同じことと、有限標本で同じことは別です。** 次のベルヌーイ例で違いを確認します。

---

## 7. ベルヌーイ母比率で3者を比較する

$X_1,\ldots,X_n$ は独立同分布でベルヌーイ分布に従い、

$$
X_i\sim\operatorname{Bernoulli}(p),
\qquad 0<p<1
$$

とします。$S_n=\sum_iX_i$、$\hat p=S_n/n$ とし、

$$
H_0:p=p_0
$$

を検定します。

対数尤度は

$$
\ell_n(p)
=S_n\log p+(n-S_n)\log(1-p).
$$

尤度比統計量は

$$
G^2
=2n\left[
\hat p\log\frac{\hat p}{p_0}
+(1-\hat p)\log\frac{1-\hat p}{1-p_0}
\right].
$$

ワルド型統計量は

$$
W
=\frac{n(\hat p-p_0)^2}{\hat p(1-\hat p)},
$$

スコア型統計量は

$$
S
=\frac{n(\hat p-p_0)^2}{p_0(1-p_0)}.
$$

分母を見ると違いが分かります。ワルド型は推定値 $\hat p$、スコア型は帰無値 $p_0$ で分散を評価し、尤度比は尤度曲面そのものの高さ差を使います。

### 7.1 数値例

$n=100$、$S_n=60$、$p_0=0.5$ なら $\hat p=0.6$ で、

$$
S=4,
\qquad
W=\frac{25}{6}\approx4.17,
$$

$$
G^2
=200\left[0.6\log1.2+0.4\log0.8\right]
\approx4.03.
$$

$\chi^2_{1,0.95}\approx3.84$ と比べると3つとも5%水準で棄却しますが、統計量の値は同じではありません。

> **注意**  
> $\hat p$ が0や1に近い小標本ではワルド型近似が不安定になりやすく、カイ二乗近似そのものも粗くなります。

---

## 8. ポアソン平均でも3者を比較する

$X_i$ は独立同分布で

$$
X_i\sim\operatorname{Poisson}(\lambda),
\qquad \lambda>0
$$

とし、$H_0:\lambda=\lambda_0$ を考えます。最尤推定量は $\hat\lambda=\bar X$ です。

$$
G^2
=2n\left[
\hat\lambda\log\frac{\hat\lambda}{\lambda_0}
-(\hat\lambda-\lambda_0)
\right],
$$

$$
W
=\frac{n(\hat\lambda-\lambda_0)^2}{\hat\lambda},
\qquad
S
=\frac{n(\hat\lambda-\lambda_0)^2}{\lambda_0}.
$$

ここでも有限標本では3者は異なりますが、$\hat\lambda-\lambda_0=O_p(n^{-1/2})$ の範囲では同じ一次近似へ集約されます。

---

## 9. 迷惑母数があるとき

母数を

$$
\theta=(\psi,\lambda)
$$

と分け、$\psi$ が検定対象、$\lambda$ が迷惑母数とします。

$$
H_0:\psi=\psi_0
$$

の下では、$\lambda$ は固定せず帰無仮説の範囲内で最大化します。

$$
\tilde\lambda
=\arg\max_{\lambda}\ell_n(\psi_0,\lambda).
$$

したがって尤度比検定の分子は $L(\psi_0,\tilde\lambda)$ です。「帰無仮説だから全母数を固定する」のではありません。

情報行列を

$$
I(\theta)
=
\begin{pmatrix}
I_{\psi\psi}&I_{\psi\lambda}\\
I_{\lambda\psi}&I_{\lambda\lambda}
\end{pmatrix}
$$

と分割します。

<a id="def-i3-02-efficient-information"></a>

<!-- formal-statement-start -->
> **定義（迷惑母数を除いた有効情報量）**  
> $\psi$ に対する情報から迷惑母数 $\lambda$ の線形影響を除いたシューア補

$$
I_{\psi\cdot\lambda}
=
I_{\psi\psi}
-I_{\psi\lambda}I_{\lambda\lambda}^{-1}I_{\lambda\psi}
$$

> を $\psi$ に対する有効情報量という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i3-02-efficient-information -->

**定義の確認**  
$I_{\psi\lambda}=0$ なら

$$
I_{\psi\cdot\lambda}=I_{\psi\psi}.
$$

この場合、情報行列の意味で2母数は直交しており、迷惑母数方向を除くことによる情報損失はありません。

<!-- definition-example-end -->

---

## 10. 例: 正規母平均を未知分散の下で検定する

$X_i\sim N(\mu,v)$ とし、$v$ は未知とします。

$$
H_0:\mu=\mu_0.
$$

制約なし最尤推定量は

$$
\hat\mu=\bar X,
\qquad
\hat v
=\frac1n\sum_{i=1}^n(X_i-\bar X)^2.
$$

帰無仮説下では

$$
\tilde\mu=\mu_0,
\qquad
\tilde v
=\frac1n\sum_{i=1}^n(X_i-\mu_0)^2.
$$

正規対数尤度を分散について最大化すると

$$
G^2
=n\log\frac{\tilde v}{\hat v}.
$$

正則条件下では $G^2\xrightarrow{d}\chi_1^2$ です。ただしこの正規母集団問題には有限標本で正確な $t$ 検定があるため、I3-03 では正確な有限標本法との関係を整理します。

---

## 11. 再母数化で何が変わるか

<a id="prop-i3-02-lr-invariance"></a>

<!-- formal-statement-start -->
> **命題（尤度比統計量の再母数化不変性）**  
> $\eta=g(\theta)$ が1対1の再母数化であり、帰無仮説集合も同じモデル集合を表すように移されるなら、尤度比 $\Lambda$ と尤度比統計量 $-2\log\Lambda$ は再母数化によって変化しない。
<!-- formal-statement-end -->

<!-- proof-start -->

### 証明

1対1対応により、$\theta$ 空間上で尤度を最大化することと、対応する $\eta$ 空間上で同じモデルの尤度を最大化することは同値です。帰無仮説集合についても同様なので、分子・分母の最大尤度値がそれぞれ保存され、比 $\Lambda$ も保存されます。

<!-- proof-end -->

一方、ワルド型統計量は非線形な再母数化で有限標本値が一般に変わります。たとえば $p$ と対数オッズ

$$
\eta=\log\frac p{1-p}
$$

に対して、$p$ 尺度で作る標準化距離と $\eta$ 尺度で作る標準化距離は有限標本では一致しません。デルタ法によって局所的には一致するため、正則な大標本では同じ極限を持ちます。

---

## 12. 3検定の使い分け

| 観点 | 尤度比 | ワルド型 | スコア型 |
|---|---|---|---|
| 直観 | 山の高さ差 | 推定値の距離 | 帰無点の傾き |
| 必要な最適化 | 制約なし + 制約付き | 制約なし | 制約付き |
| 再母数化 | 強い不変性 | 有限標本で非不変 | 正則大標本で同値 |
| 小標本 | 近似誤差あり | 境界付近で不安定なことあり | 近似誤差あり |
| 大標本極限 | $\chi_r^2$ | $\chi_r^2$ | $\chi_r^2$ |

どれが常に最良というわけではありません。モデル・標本サイズ・計算可能性・境界の有無を見て選びます。

---

## 13. 局所対立仮説と検出力

固定された遠い対立仮説では、一致性を持つ検定の検出力は $n\to\infty$ で1へ近づきます。3検定の細かな差を調べるには

$$
\theta_n
=\theta_0+\frac h{\sqrt n}
$$

という局所対立仮説を考えます。

<a id="thm-i3-02-local-alternative"></a>

<!-- formal-statement-start -->
> **定理（1母数局所対立仮説下の極限）**  
> 正則な1母数モデルで $\theta_n=\theta_0+h/\sqrt n$ とする。通常の局所漸近正規性が成り立つとき、尤度比・ワルド型・スコア型統計量はいずれも

$$
\chi_1^2(\delta),
\qquad
\delta=h^2I_1(\theta_0)
$$

> へ分布収束する。ここで $\chi_1^2(\delta)$ は非心度 $\delta$ の非心カイ二乗分布である。
<!-- formal-statement-end -->

3検定は局所対立仮説に対する一次の漸近検出力まで同じになります。

---

## 14. 典型的な誤答

1. **尤度比の分子・分母を逆にする。** 本教材では $\Lambda=L(\tilde\theta)/L(\hat\theta)\le1$ とする。
2. **迷惑母数まで帰無値に固定する。** 帰無仮説が課していない母数は制約下で再推定する。
3. **Wilksの自由度を母数総次元とする。** 自由度は独立な制約数 $r$ である。
4. **ワルド型とスコア型の分散評価点を混同する。** 前者は推定点、後者は帰無点で評価するのが基本である。
5. **境界問題でも自動的に $\chi_r^2$ とする。** Wilksの定理は正則条件付きである。
6. **3統計量は常に数値的に等しいと考える。** 一般には有限標本で異なり、正則大標本で漸近的に一致する。

---

# 演習

## Level A

### I3-02-A01 高さ・距離・傾き

次の説明を、尤度比検定・ワルド型検定・スコア型検定に対応させてください。

1. 制約なし最尤推定量と帰無仮説集合の距離を推定分散で標準化する。
2. 帰無仮説下の点でスコアを評価する。
3. 制約なし最大対数尤度と制約付き最大対数尤度の差を見る。

<!-- solution-start -->

**解答**  
1はワルド型、2はスコア型、3は尤度比です。

<!-- solution-end -->

### I3-02-A02 正規既知分散

$X_i\sim N(\mu,4)$、$n=25$ とします。$H_0:\mu=0$ に対するワルド型統計量を $\bar X$ で表してください。

<!-- solution-start -->

**解答**

$$
W
=\frac{\bar X^2}{4/25}
=\frac{25\bar X^2}{4}.
$$

<!-- solution-end -->

### I3-02-A03 スコア型統計量

ベルヌーイ分布で $H_0:p=p_0$ とするとき、スコア型統計量を $\hat p$ で表してください。

<!-- solution-start -->

**解答**

$$
S
=\frac{n(\hat p-p_0)^2}{p_0(1-p_0)}.
$$

<!-- solution-end -->

### I3-02-A04 自由度

4次元母数 $\theta\in\mathbb R^4$ に独立な2本の滑らかな制約を課します。正則条件の下で $-2\log\Lambda$ の極限分布を答えてください。

<!-- solution-start -->

**解答**

$$
-2\log\Lambda\xrightarrow{d}\chi_2^2.
$$

<!-- solution-end -->

---

## Level B

### I3-02-B01 ベルヌーイ3検定

$n=100$、成功数60、$H_0:p=0.5$ とします。

1. $\hat p$ を求めてください。
2. スコア型統計量を求めてください。
3. ワルド型統計量を求めてください。
4. 尤度比統計量を求めてください。
5. $\chi^2_{1,0.95}\approx3.84$ と比較してください。

<!-- solution-start -->

**解答**

$$
\hat p=0.6,
\qquad
S=4,
$$

$$
W=\frac{25}{6}\approx4.17,
$$

$$
G^2
=200\{0.6\log1.2+0.4\log0.8\}
\approx4.03.
$$

いずれも3.84を上回るので、各大標本検定では5%水準で $H_0$ を棄却します。

<!-- solution-end -->

### I3-02-B02 ポアソン3検定

$X_i\sim\operatorname{Poisson}(\lambda)$、$H_0:\lambda=\lambda_0$ とします。最尤推定量と3統計量を導いてください。

<!-- solution-start -->

**解答**

$$
\hat\lambda=\bar X.
$$

対数尤度の $\lambda$ に依存する部分は

$$
\ell_n(\lambda)
=n\bar X\log\lambda-n\lambda.
$$

したがって

$$
G^2
=2n\left[
\hat\lambda\log\frac{\hat\lambda}{\lambda_0}
-(\hat\lambda-\lambda_0)
\right],
$$

$$
W
=\frac{n(\hat\lambda-\lambda_0)^2}{\hat\lambda},
\qquad
S
=\frac{n(\hat\lambda-\lambda_0)^2}{\lambda_0}.
$$

<!-- solution-end -->

### I3-02-B03 未知分散正規母平均の尤度比

$X_i\sim N(\mu,v)$ で $v$ 未知、$H_0:\mu=\mu_0$ とします。$\hat v$、$\tilde v$ を求め、尤度比統計量を導いてください。

<!-- solution-start -->

**解答**

$$
\hat v=\frac1n\sum_{i=1}^n(X_i-\bar X)^2,
\qquad
\tilde v=\frac1n\sum_{i=1}^n(X_i-\mu_0)^2.
$$

正規対数尤度を $v$ について最大化すると

$$
G^2
=n\log\frac{\tilde v}{\hat v}.
$$

<!-- solution-end -->

### I3-02-B04 再母数化とワルド型検定

ベルヌーイ母比率を

$$
\eta=\log\frac p{1-p}
$$

で再母数化します。$p$ 尺度と $\eta$ 尺度のワルド型統計量を書き、有限標本で一般に一致しない理由を説明してください。

<!-- solution-start -->

**解答**

$$
W_p
=\frac{n(\hat p-p_0)^2}{\hat p(1-\hat p)}.
$$

デルタ法より

$$
\widehat{\operatorname{Var}}(\hat\eta)
\approx\frac1{n\hat p(1-\hat p)},
$$

したがって

$$
W_\eta
=n\hat p(1-\hat p)
\left[
\log\frac{\hat p}{1-\hat p}
-
\log\frac{p_0}{1-p_0}
\right]^2.
$$

非線形変換では2つの距離が有限標本で厳密には一致しません。局所的にはTaylor展開で一致します。

<!-- solution-end -->

---

## Level C

### I3-02-C01 3検定の漸近同値性

1母数正則モデルで $H_0:\theta=\theta_0$ とします。

1. $\ell_n(\theta_0)$ を $\hat\theta$ の周りで2次展開してください。
2. 尤度比統計量を観測情報量と $\hat\theta-\theta_0$ で表してください。
3. スコア方程式から $U_n(\theta_0)$ と $\hat\theta-\theta_0$ を結びつけてください。
4. 3統計量が共通に $\chi_1^2$ へ収束することを説明してください。

<!-- solution-start -->

**解答**

$U_n(\hat\theta)=0$ なので、中間点 $\bar\theta$ を用いて

$$
G^2
=J_n(\bar\theta)(\hat\theta-\theta_0)^2.
$$

また別の中間点 $\check\theta$ を用いて

$$
U_n(\theta_0)
=J_n(\check\theta)(\hat\theta-\theta_0).
$$

正則条件から $J_n/n$ と $I_n/n$ は同じ正の極限へ収束し、

$$
\sqrt{I_n(\theta_0)}(\hat\theta-\theta_0)
\xrightarrow{d}N(0,1).
$$

したがって $G^2,W,S$ は同じ標準正規量の二乗と $o_p(1)$ の差しか持たず、$\chi_1^2$ へ収束します。

<!-- solution-end -->

### I3-02-C02 多母数の線形制約

$\theta\in\mathbb R^p$ の最尤推定量が

$$
\sqrt n(\hat\theta-\theta_0)
\xrightarrow{d}
N_p(0,I_1(\theta_0)^{-1})
$$

を満たすとします。$H_0:R\theta=r_0$、$R$ は階数 $r$ の $r\times p$ 行列です。ワルド型統計量と極限分布を求めてください。

<!-- solution-start -->

**解答**

$$
\sqrt n(R\hat\theta-r_0)
\xrightarrow{d}
N_r\left(0,R I_1(\theta_0)^{-1}R^{\mathsf T}\right).
$$

したがって

$$
W
=n(R\hat\theta-r_0)^{\mathsf T}
\left[R I_1(\hat\theta)^{-1}R^{\mathsf T}\right]^{-1}
(R\hat\theta-r_0)
\xrightarrow{d}\chi_r^2.
$$

<!-- solution-end -->

### I3-02-C03 迷惑母数と有効情報量

情報行列が

$$
I
=
\begin{pmatrix}
a&c\\
c&b
\end{pmatrix},
\qquad a>0,\ b>0,\ ab-c^2>0
$$

とします。第1母数を検定し、第2母数を迷惑母数とするとき、有効情報量を求めてください。また $c=0$ の意味を説明してください。

<!-- solution-start -->

**解答**

$$
I_{1\cdot2}
=a-\frac{c^2}{b}.
$$

$c=0$ なら $I_{1\cdot2}=a$ で、迷惑母数方向を除くことによる情報損失はありません。

<!-- solution-end -->

### I3-02-C04 2状態Markov連鎖の尤度比

2状態Markov連鎖で、状態0からの遷移回数を $N_{00},N_{01}$、状態1からの遷移回数を $N_{10},N_{11}$ とします。

$$
P
=
\begin{pmatrix}
1-p&p\\
q&1-q
\end{pmatrix},
$$

$$
L(p,q)
\propto
(1-p)^{N_{00}}p^{N_{01}}
q^{N_{10}}(1-q)^{N_{11}}.
$$

$H_0:p=q$ を尤度比検定してください。

<!-- solution-start -->

**解答**

制約なしでは

$$
\hat p
=\frac{N_{01}}{N_{00}+N_{01}},
\qquad
\hat q
=\frac{N_{10}}{N_{10}+N_{11}}.
$$

帰無仮説下で $p=q=t$ と置くと

$$
\tilde t
=\frac{N_{01}+N_{10}}
{N_{00}+N_{01}+N_{10}+N_{11}}.
$$

したがって

$$
\begin{aligned}
G^2=2[&N_{01}\log(\hat p/\tilde t)
+N_{00}\log\{(1-\hat p)/(1-\tilde t)\}\\
&+N_{10}\log(\hat q/\tilde t)
+N_{11}\log\{(1-\hat q)/(1-\tilde t)\}].
\end{aligned}
$$

制約なしでは2母数、帰無仮説下では1母数なので、正則条件下で

$$
G^2\xrightarrow{d}\chi_1^2.
$$

この問題は2025年統計応用理工学Q2の「Markov連鎖・最尤推定・尤度比検定」への接続を意識した一般化練習です。

<!-- solution-end -->

---

## Level D

### I3-02-D01 局所対立仮説と非心カイ二乗

1母数正則モデルで $H_0:\theta=\theta_0$ とし、

$$
\theta_n=\theta_0+\frac h{\sqrt n}
$$

を考えます。1観測あたりの情報量を $I_1(\theta_0)$ とします。

1. $\sqrt{nI_1(\theta_0)}(\hat\theta-\theta_0)$ の極限分布を求めてください。
2. ワルド型統計量の極限分布と非心度を求めてください。
3. 尤度比・スコア型も同じ局所極限を持つ理由を説明してください。

<!-- solution-start -->

**解答**

$$
\sqrt n(\hat\theta-\theta_0)
=\sqrt n(\hat\theta-\theta_n)+h.
$$

漸近正規性より

$$
\sqrt{nI_1(\theta_0)}(\hat\theta-\theta_0)
\xrightarrow{d}
N\left(h\sqrt{I_1(\theta_0)},1\right).
$$

したがって

$$
W
\xrightarrow{d}
\chi_1^2(\delta),
\qquad
\delta=h^2I_1(\theta_0).
$$

尤度比・スコア型はワルド型と $o_p(1)$ の差しか持たないため、同じ局所極限を持ちます。

<!-- solution-end -->

---

# 30分ドリル I3-02-DRILL01

$X_1,\ldots,X_n$ は独立同分布でベルヌーイ分布に従うとします。$S=\sum_iX_i$、$\hat p=S/n$ とし、

$$
H_0:p=p_0,
\qquad 0<p_0<1
$$

を検定します。

1. 対数尤度、スコア、フィッシャー情報量を求めてください。
2. 最尤推定量 $\hat p$ を求めてください。
3. 尤度比統計量を導いてください。
4. ワルド型統計量を導いてください。
5. スコア型統計量を導いてください。
6. 3統計量が有限標本では異なる理由を説明してください。
7. $n=100,S=60,p_0=0.5$ のとき各統計量を計算し、5%水準で判断してください。
8. $p_0$ が0または1に近いとき大標本近似に注意が必要な理由を説明してください。

<!-- solution-start -->

## ドリル解答

$$
\ell_n(p)
=S\log p+(n-S)\log(1-p),
$$

$$
U_n(p)
=\frac{n(\hat p-p)}{p(1-p)},
\qquad
I_n(p)=\frac n{p(1-p)},
$$

$$
\hat p=\frac Sn.
$$

尤度比統計量は

$$
G^2
=2n\left[
\hat p\log\frac{\hat p}{p_0}
+(1-\hat p)\log\frac{1-\hat p}{1-p_0}
\right].
$$

ワルド型統計量は

$$
W
=\frac{n(\hat p-p_0)^2}{\hat p(1-\hat p)},
$$

スコア型統計量は

$$
S_{\mathrm{score}}
=\frac{n(\hat p-p_0)^2}{p_0(1-p_0)}.
$$

ワルド型は推定点、スコア型は帰無点で情報量を評価し、尤度比は曲面の高さ差を使うため有限標本では値が異なります。

$n=100,S=60,p_0=0.5$ なら

$$
\hat p=0.6,
\qquad
G^2\approx4.03,
\qquad
W\approx4.17,
\qquad
S_{\mathrm{score}}=4.
$$

いずれも $\chi^2_{1,0.95}\approx3.84$ を上回るので5%水準で棄却します。

$p_0$ が境界に近いと二項分布の歪みが強く、期待度数も小さくなってカイ二乗近似が粗くなります。ワルド型では $\hat p(1-\hat p)$ が小さくなるため特に不安定になり得ます。

### 試験答案の最短形

$$
\boxed{
\begin{aligned}
G^2
&=2\{\ell(\hat\theta)-\ell(\tilde\theta)\},\\
W
&=\frac{(\hat\theta-\theta_0)^2}{\widehat{\operatorname{Var}}(\hat\theta)},\\
S
&=\frac{U_n(\theta_0)^2}{I_n(\theta_0)}.
\end{aligned}
}
$$

正則な1制約問題では

$$
G^2,W,S\xrightarrow{d}\chi_1^2.
$$

ただし、有限標本で等しいとは限らず、境界・非正則問題では通常のカイ二乗近似を自動適用しません。

<!-- solution-end -->

---

## 章末チェック

- [ ] 制約なし最尤推定量 $\hat\theta$ と制約付き最尤推定量 $\tilde\theta$ を区別できる。
- [ ] 尤度比統計量 $2\{\ell(\hat\theta)-\ell(\tilde\theta)\}$ を導ける。
- [ ] Wilksの定理の自由度が独立制約数になることを説明できる。
- [ ] ワルド型統計量を「推定値と帰無値の標準化距離」と説明できる。
- [ ] スコア型統計量を「帰無仮説点の傾き」と説明できる。
- [ ] ベルヌーイ・ポアソンで3統計量を計算できる。
- [ ] 3検定の漸近同値性をTaylor展開から説明できる。
- [ ] 迷惑母数は帰無仮説下でも再推定することを理解している。
- [ ] 尤度比の再母数化不変性を説明できる。
- [ ] 境界・非正則問題では通常のWilks近似が壊れ得ることを判断できる。
