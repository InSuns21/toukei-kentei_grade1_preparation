<!-- definition-example-audit: strict -->

# I3-02 尤度比・ワルド・スコア検定

I3-01 では、第一種過誤を制御しながら検出力を高めるという検定の基本原理を学びました。本章では、一般の尤度モデルで広く使われる3つの大標本検定、**尤度比検定・ワルド型検定・スコア型検定**を扱います。

1母数の正則モデルでは、3つを別々の公式として暗記する必要はありません。対数尤度を真値の近くで二次関数として見ると、

$$
\boxed{
\begin{array}{c}
\text{尤度比検定}:\ \text{山の高さの差}\\[2mm]
\text{ワルド型検定}:\ \text{推定値と帰無値の距離}\\[2mm]
\text{スコア型検定}:\ \text{帰無仮説点での傾き}
\end{array}
}
$$

という違いとして整理できます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

関連する正本:

- [I1-01](../I1_01_尤度_最尤推定/index.md): 尤度・対数尤度・スコア・最尤推定・迷惑母数
- [I1-02](../I1_02_推定法と推定量の評価/index.md): 1次元フィッシャー情報量
- [I2-01](../I2_01_漸近推測_Delta法/index.md): 1母数MLEの漸近正規性・観測情報量・1変量デルタ法
- [I3-01](../I3_01_検定の基礎とネイマン_ピアソン理論/index.md): 有意水準・棄却域・P値・検出力

## 本章の範囲の見取り図

「検定法の名前が公式範囲にある」ことと、「その最も一般的な多母数行列表現まで必須」であることは別です。本章では次のように分けます。

| 区分 | 内容 |
|---|---|
| **通常ルート** | 尤度比の構成、Wilksの定理の使い方、1母数Wald、1母数Score、1母数での3検定の漸近同値性、制約付きMLE、迷惑母数の再推定、再母数化不変性 |
| **発展** | 情報行列を使う一般制約Wald、Schur補による有効情報量、局所漸近正規性を使うWilksの厳密証明、局所対立仮説と非心カイ二乗 |

なお、**複数母数の尤度そのもの**は発展とは限りません。たとえば「$p,q$ を制約なしで推定し、$H_0:p=q$ の下で1母数へ制約して尤度比を作る」という問題は、情報行列を使わずに解けます。

## この章で解けるようになる問題

### 通常ルート

- 制約なし最尤推定量と帰無仮説下の制約付き最尤推定量を区別できる。
- 尤度比統計量 $-2\log\Lambda$ を構成できる。
- Wilksの定理から、正則な場合のカイ二乗近似と自由度を読める。
- 1母数のワルド型統計量を推定値と標準誤差から作れる。
- 1母数のスコア型統計量を帰無仮説点のスコアと1次元フィッシャー情報量から作れる。
- ベルヌーイ・ポアソンで3統計量を導出し、有限標本では異なっても漸近的に同じになることを説明できる。
- 迷惑母数は帰無仮説下でも、仮説が固定していない限り再推定することを説明できる。
- 尤度比統計量の再母数化不変性を説明できる。
- 境界・非正則モデルでは通常のカイ二乗近似を機械適用できないと判断できる。

### 発展

- 多母数の一般制約Wald統計量を情報行列で書ける。
- Schur補による有効情報量を扱える。
- Wilksの定理を局所二次近似・局所漸近正規性から説明できる。
- 局所対立仮説下の非心カイ二乗極限を扱える。

## 公式出題範囲との対応

| 範囲 | 本章の通常ルート |
|---|---|
| 尤度比検定 | 制約付き最尤推定、尤度比、Wilksの定理、ベルヌーイ・ポアソン・正規・Markov例 |
| ワルド型検定 | 1母数で推定値と標準誤差から構成 |
| スコア型検定 | 1母数で帰無仮説点のスコアと1次元情報量から構成 |

---

## 1. 3検定は何を比べているのか

まず1母数モデルで

$$
H_0:\theta=\theta_0
$$

を考えます。制約なし最尤推定量を $\hat\theta$ とします。

3つの考え方は次の通りです。

| 検定 | 見る量 | 直観 |
|---|---|---|
| 尤度比 | 最大尤度と帰無仮説下の尤度の差 | 帰無仮説にすると山がどれだけ低くなるか |
| ワルド型 | $\hat\theta-\theta_0$ | 推定値が帰無値から標準誤差何個分離れたか |
| スコア型 | $U_n(\theta_0)$ | 帰無値で尤度がどれだけ傾いているか |

複数母数でも尤度比の考え方自体は同じです。帰無仮説が一部の母数だけを制約するなら、残りはその制約下で再推定します。

---

## 2. 尤度比検定: 山の高さを比べる

帰無仮説を

$$
H_0:\theta\in\Theta_0
$$

とし、制約なし最尤推定量を $\hat\theta$、制約付き最尤推定量を $\tilde\theta$ とします。

$$
\hat\theta
=\arg\max_{\theta\in\Theta}\ell_n(\theta),
\qquad
\tilde\theta
=\arg\max_{\theta\in\Theta_0}\ell_n(\theta).
$$

<a id="def-i3-02-likelihood-ratio"></a>

<!-- formal-statement-start -->
> **定義（尤度比と尤度比統計量）**  
> 帰無仮説 $H_0:\theta\in\Theta_0$ に対し、尤度比を
>
> $$
> \Lambda
> =
> \frac{\sup_{\theta\in\Theta_0}L(\theta)}
> {\sup_{\theta\in\Theta}L(\theta)}
> =
> \frac{L(\tilde\theta)}{L(\hat\theta)}
> $$
>
> と定める。$0\le\Lambda\le1$ であり、通常は
>
> $$
> \boxed{
> G^2=-2\log\Lambda
> =2\{\ell_n(\hat\theta)-\ell_n(\tilde\theta)\}
> }
> $$
>
> を尤度比統計量として用いる。$G^2$ が大きいほど帰無仮説に不利である。
<!-- formal-statement-end -->

### 2.1 例: 既知分散正規母平均

$$
X_i\sim N(\mu,\sigma^2),
\qquad
H_0:\mu=\mu_0,
$$

とし、$\sigma^2$ は既知とします。

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
\boxed{
G^2
=\frac{n(\bar X-\mu_0)^2}{\sigma^2}
}.
$$

<!-- definition-example-start: def-i3-02-likelihood-ratio -->
**定義の確認**  
制約なし最大値は $\mu=\bar X$、帰無仮説下では $\mu=\mu_0$ に固定されます。2つの最大対数尤度の差を2倍すると上式になります。
<!-- definition-example-end -->

---

## 3. Wilksの定理: なぜカイ二乗分布が出るのか

<a id="thm-i3-02-wilks"></a>

<!-- formal-statement-start -->
> **定理（Wilksの定理）**  
> 真の母数が帰無仮説集合の正則な点にあり、モデルが識別可能で、対数尤度が十分滑らかであるなど通常の正則条件を満たすとする。帰無仮説によって独立な自由方向を $r$ 個失うとき、$H_0$ の下で
>
> $$
> \boxed{
> -2\log\Lambda
> \xrightarrow{d}
> \chi_r^2
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

したがって大標本では、有意水準 $\alpha$ の尤度比検定は

$$
G^2>\chi^2_{r,1-\alpha}
$$

で棄却します。

**自由度は「制約によって失う独立な方向の数」**です。

### 3.1 通常ルートでの理解

1母数で $H_0:\theta=\theta_0$ なら制約は1本なので

$$
G^2\Rightarrow\chi_1^2.
$$

2母数 $(p,q)$ に $H_0:p=q$ を課すなら、2自由度の母数空間から1本の独立制約を課すので、正則ならやはり自由度は1です。

### 3.2 発展: Wilksの定理の証明の見取り図

> **発展項目**  
> 以下は「なぜ自由度 $r$ のカイ二乗になるのか」を一般の多母数モデルで厳密化する方向の話です。局所漸近正規性や情報行列を用いるため、通常ルートでは結論だけ使えれば十分です。

真値 $\theta_0$ の近くで

$$
\theta=\theta_0+\frac{u}{\sqrt n}
$$

と局所化すると、正則条件下で対数尤度は概念的に

$$
\ell_n\left(\theta_0+\frac{u}{\sqrt n}\right)-\ell_n(\theta_0)
=
u^{\mathsf T}\Delta_n
-\frac12u^{\mathsf T}I_1(\theta_0)u
+o_p(1)
$$

という二次式で近似されます。

制約なしではこの二次式を全方向で最大化し、帰無仮説下では許された方向だけで最大化します。その最大値差が、標準化された正規ベクトルの「制約で失った $r$ 方向」の二乗和となるため、$\chi_r^2$ が現れます。

### 3.3 正則条件を外すと壊れる

次の場合には通常の $\chi_r^2$ 極限を自動適用してはいけません。

- 真値が母数空間の境界にある。
- 帰無仮説下で一部の母数が識別不能になる。
- 情報量が退化する。
- 一様分布の端点推定のように支持が母数に依存する。

---

## 4. ワルド型検定: 推定値と帰無値の距離を見る

<a id="def-i3-02-wald"></a>

<!-- formal-statement-start -->
> **定義（1母数のワルド型統計量）**  
> 1母数 $\theta$ に対し $H_0:\theta=\theta_0$ を検定する。$\hat\theta$ が漸近正規で、推定標準誤差を $\widehat{\operatorname{se}}(\hat\theta)$ とするとき
>
> $$
> \boxed{
> W
> =
> \frac{(\hat\theta-\theta_0)^2}
> {\widehat{\operatorname{se}}(\hat\theta)^2}
> }
> $$
>
> をワルド型統計量という。正則条件の下で $H_0$ のもと $W\xrightarrow{d}\chi_1^2$ である。
<!-- formal-statement-end -->

既知分散正規母平均では

$$
\widehat{\operatorname{se}}(\bar X)^2=\frac{\sigma^2}{n},
$$

したがって

$$
W
=\frac{n(\bar X-\mu_0)^2}{\sigma^2}.
$$

<!-- definition-example-start: def-i3-02-wald -->
**定義の確認**  
推定値 $\bar X$ と帰無値 $\mu_0$ の差を、標準誤差 $\sigma/\sqrt n$ で標準化して二乗した量です。
<!-- definition-example-end -->

### 4.1 発展: 多母数・一般制約のワルド型統計量

> **発展項目**  
> ここでは情報行列・多変量デルタ法を使います。1次元フィッシャー情報量を中心とする通常ルートでは必須としません。

$\theta\in\mathbb R^p$、$h(\theta)\in\mathbb R^r$ とし、ヤコビ行列を

$$
H(\theta)
=\frac{\partial h(\theta)}{\partial\theta^{\mathsf T}}
$$

とします。多母数MLEの漸近分散共分散行列を $I_1(\theta)^{-1}$ と書ける正則条件下では、多変量デルタ法から

$$
\sqrt n h(\hat\theta)
\xrightarrow{d}
N_r\left(0,
H(\theta_0)I_1(\theta_0)^{-1}H(\theta_0)^{\mathsf T}
\right).
$$

<a id="def-i3-02-wald-general"></a>

<!-- formal-statement-start -->
> **発展定義（一般制約のワルド型統計量）**  
> $H_0:h(\theta)=0$ が $r$ 本の独立な滑らかな制約を表すとき、
>
> $$
> W
> =
> n\,h(\hat\theta)^{\mathsf T}
> \left[
> H(\hat\theta)I_1(\hat\theta)^{-1}H(\hat\theta)^{\mathsf T}
> \right]^{-1}
> h(\hat\theta)
> $$
>
> は正則条件の下で $\chi_r^2$ へ収束する。
<!-- formal-statement-end -->

---

## 5. スコア型検定: 帰無仮説点での傾きを見る

最尤推定量まで動かさず、帰無仮説を正しいと置いた点で「尤度がどちらへ上がりたがっているか」を見るのがスコア型検定です。

<a id="def-i3-02-score"></a>

<!-- formal-statement-start -->
> **定義（1母数のスコア型統計量）**  
> $H_0:\theta=\theta_0$ に対し、スコア $U_n(\theta)=\ell_n'(\theta)$ と1次元フィッシャー情報量 $I_n(\theta)$ を用いて
>
> $$
> \boxed{
> S
> =
> \frac{U_n(\theta_0)^2}{I_n(\theta_0)}
> }
> $$
>
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
帰無仮説点 $\mu_0$ でスコアを計算し、その分散に対応する情報量で標準化して二乗しています。
<!-- definition-example-end -->

この正規例では対数尤度が厳密な二次関数なので、尤度比・ワルド型・スコア型の3統計量が完全に一致します。

---

## 6. 1母数では3検定はなぜ漸近的に同じなのか

$H_0:\theta=\theta_0$ を考えます。観測情報量を

$$
J_n(\theta)=-\ell_n''(\theta)
$$

とします。

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

一方、Wald統計量は

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

なので

$$
S
=\frac{U_n(\theta_0)^2}{I_n(\theta_0)}
\approx
I_n(\theta_0)(\hat\theta-\theta_0)^2.
$$

I2-01 で扱った正則条件の下では、$J_n/n$ と $I_n/n$ は同じ極限へ近づきます。

<a id="thm-i3-02-equivalence"></a>

<!-- formal-statement-start -->
> **定理（1母数での尤度比・ワルド型・スコア型検定の漸近同値性）**  
> 正則な1母数モデルで $H_0:\theta=\theta_0$ を考える。通常の最尤推定量の正則条件が成り立つとき、
>
> $$
> G^2-W=o_p(1),
> \qquad
> W-S=o_p(1),
> $$
>
> であり、$H_0$ の下で
>
> $$
> \boxed{
> G^2,\ W,\ S
> \xrightarrow{d}
> \chi_1^2
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

**漸近的に同じことと、有限標本で同じことは別です。**

---

## 7. ベルヌーイ母比率で3者を比較する

$$
X_i\sim\operatorname{Bernoulli}(p),
\qquad
H_0:p=p_0,
$$

とし、$S_n=\sum_iX_i$、$\hat p=S_n/n$ とします。

対数尤度は

$$
\ell_n(p)
=S_n\log p+(n-S_n)\log(1-p).
$$

尤度比統計量は

$$
\boxed{
G^2
=2n\left[
\hat p\log\frac{\hat p}{p_0}
+(1-\hat p)\log\frac{1-\hat p}{1-p_0}
\right]
}.
$$

ワルド型統計量は

$$
\boxed{
W
=\frac{n(\hat p-p_0)^2}{\hat p(1-\hat p)}
}.
$$

スコア型統計量は

$$
\boxed{
S
=\frac{n(\hat p-p_0)^2}{p_0(1-p_0)}
}.
$$

ワルド型は推定値 $\hat p$、スコア型は帰無値 $p_0$ で分散を評価し、尤度比は尤度そのものの高さ差を使います。

### 7.1 数値例

$n=100$、$S_n=60$、$p_0=0.5$ なら

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
=200\left[0.6\log1.2+0.4\log0.8\right]
\approx4.03.
$$

$\chi^2_{1,0.95}\approx3.84$ と比べると、3つとも5%水準で棄却しますが、統計量の値は一致しません。

---

## 8. ポアソン平均でも3者を比較する

$$
X_i\sim\operatorname{Poisson}(\lambda),
\qquad
H_0:\lambda=\lambda_0
$$

とします。最尤推定量は

$$
\hat\lambda=\bar X.
$$

尤度比統計量は

$$
\boxed{
G^2
=2n\left[
\hat\lambda\log\frac{\hat\lambda}{\lambda_0}
-(\hat\lambda-\lambda_0)
\right]
}.
$$

ワルド型・スコア型は

$$
\boxed{
W
=\frac{n(\hat\lambda-\lambda_0)^2}{\hat\lambda}
},
\qquad
\boxed{
S
=\frac{n(\hat\lambda-\lambda_0)^2}{\lambda_0}
}.
$$

ここでも有限標本では3者は異なります。

---

## 9. 迷惑母数があるとき: まず「再推定する」を押さえる

母数を

$$
\theta=(\psi,\lambda)
$$

と分け、$\psi$ が検定対象、$\lambda$ が迷惑母数とします。

$$
H_0:\psi=\psi_0
$$

の下でも、$\lambda$ は帰無仮説が固定していません。したがって

$$
\boxed{
\tilde\lambda
=\arg\max_{\lambda}\ell_n(\psi_0,\lambda)
}
$$

と**帰無仮説の範囲内で再推定**します。

これは尤度比検定を解くうえで重要な通常ルートの考え方です。

### 9.1 発展: 情報行列と有効情報量

> **発展項目**  
> ここからは情報行列を用いる一般論です。迷惑母数を再推定するという考え方自体とは分けてください。

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
> **発展定義（迷惑母数を除いた有効情報量）**  
> $\psi$ に対する情報から迷惑母数 $\lambda$ の線形影響を除いたSchur補
>
> $$
> \boxed{
> I_{\psi\cdot\lambda}
> =
> I_{\psi\psi}
> -I_{\psi\lambda}I_{\lambda\lambda}^{-1}I_{\lambda\psi}
> }
> $$
>
> を $\psi$ に対する有効情報量という。
<!-- formal-statement-end -->

$I_{\psi\lambda}=0$ なら

$$
I_{\psi\cdot\lambda}=I_{\psi\psi}.
$$

<!-- definition-example-start: def-i3-02-efficient-information -->
**定義の確認**  
交差情報が0なら、情報行列の意味で2方向は直交しており、迷惑母数方向を除いても一次の情報量は減りません。
<!-- definition-example-end -->

---

## 10. 例: 正規母平均を未知分散の下で尤度比検定する

$$
X_i\sim N(\mu,v),
\qquad
H_0:\mu=\mu_0,
$$

とし、$v$ は未知とします。

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

ここで重要なのは、$H_0$ が固定しているのは $\mu$ だけなので、**$v$ は帰無仮説下でも再推定している**ことです。

正規対数尤度を $v$ について最大化すると

$$
\boxed{
G^2
=n\log\frac{\tilde v}{\hat v}
}.
$$

正則条件下では

$$
G^2\xrightarrow{d}\chi_1^2.
$$

---

## 11. 再母数化で何が変わるか

<a id="prop-i3-02-lr-invariance"></a>

<!-- formal-statement-start -->
> **命題（尤度比統計量の再母数化不変性）**  
> $\eta=g(\theta)$ が1対1の再母数化であり、帰無仮説集合も同じモデル集合を表すように移されるなら、尤度比 $\Lambda$ と尤度比統計量 $-2\log\Lambda$ は再母数化によって変化しない。
<!-- formal-statement-end -->

1対1対応により、母数の名前を変えても最大尤度値そのものは変わらないからです。

一方、ワルド型統計量は非線形再母数化で有限標本値が一般に変わります。たとえば $p$ と対数オッズ

$$
\eta=\log\frac p{1-p}
$$

では、$p$ 尺度と $\eta$ 尺度で測る「距離」は有限標本では同じになりません。1変量デルタ法により局所的には一致するため、大標本では同じ極限へ近づきます。

---

## 12. 3検定の使い分け

| 観点 | 尤度比 | ワルド型 | スコア型 |
|---|---|---|---|
| 直観 | 山の高さ差 | 推定値と帰無値の距離 | 帰無点の傾き |
| 必要な推定 | 制約なし + 制約付き | 制約なし | 1母数なら帰無点評価 |
| 再母数化 | 強い不変性 | 有限標本で非不変 | 大標本で同値 |
| 小標本 | 近似誤差あり | 境界付近で不安定なことあり | 近似誤差あり |
| 正則大標本 | $\chi_1^2$（1制約） | $\chi_1^2$ | $\chi_1^2$ |

どれが常に最良というわけではありません。

---

## 13. 発展: 局所対立仮説と検出力

> **発展項目**  
> 以下は漸近検出力を精密比較するための理論です。通常の1級対策では、Wald・Score・尤度比の構成と帰無仮説下の極限を優先してください。

固定された遠い対立仮説では、一致性を持つ検定の検出力は $n\to\infty$ で1へ近づきます。そこで

$$
\theta_n
=\theta_0+\frac h{\sqrt n}
$$

という局所対立仮説を考えます。

<a id="thm-i3-02-local-alternative"></a>

<!-- formal-statement-start -->
> **発展定理（1母数局所対立仮説下の極限）**  
> 正則な1母数モデルで $\theta_n=\theta_0+h/\sqrt n$ とする。通常の局所漸近正規性が成り立つとき、尤度比・ワルド型・スコア型統計量はいずれも
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

## 14. 典型的な誤答

1. **尤度比の分子・分母を逆にする。**  
   本教材では $\Lambda=L(\tilde\theta)/L(\hat\theta)\le1$ とする。
2. **迷惑母数まで帰無値に固定する。**  
   帰無仮説が固定していない母数は制約下で再推定する。
3. **Wilksの自由度を母数総次元とする。**  
   自由度は制約で失う独立方向数である。
4. **ワルド型とスコア型の分散評価点を混同する。**  
   1母数では前者は推定点、後者は帰無点で評価するのが基本である。
5. **境界問題でも自動的に $\chi_r^2$ とする。**  
   Wilksの定理は正則条件付きである。
6. **3統計量は常に数値的に等しいと考える。**  
   一般には有限標本で異なり、正則大標本で漸近的に一致する。
7. **一般制約WaldやSchur補を必須公式として暗記する。**  
   情報行列を使うこれらは本章では発展項目である。

---

# 演習

## Level A

### I3-02-A01 高さ・距離・傾き

次の説明を、尤度比検定・ワルド型検定・スコア型検定に対応させてください。

1. 推定値と帰無値の差を標準誤差で標準化する。
2. 帰無仮説点でスコアを評価する。
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

### I3-02-A04 Wilksの自由度

4次元母数に独立な2本の正則な制約を課します。Wilksの定理を用いてよいとき、$-2\log\Lambda$ の極限分布を答えてください。

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

$$
\boxed{
G^2
=n\log\frac{\tilde v}{\hat v}
}.
$$

$v$ は帰無仮説が固定していないため、帰無仮説下でも $\tilde v$ として再推定しています。
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

1変量デルタ法より

$$
\widehat{\operatorname{Var}}(\hat\eta)
\approx\frac1{n\hat p(1-\hat p)}.
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

非線形変換では2つの距離が有限標本で厳密には一致しません。
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

I2-01 の正則条件から $J_n/n$ と $I_n/n$ は同じ正の極限へ近づき、

$$
\sqrt{I_n(\theta_0)}(\hat\theta-\theta_0)
\xrightarrow{d}N(0,1).
$$

したがって $G^2,W,S$ は $\chi_1^2$ へ収束します。
<!-- solution-end -->

### [発展] I3-02-C02 多母数の線形制約Wald

> 情報行列と一般制約Waldを使う発展演習です。通常ルートでは省略して構いません。

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
W
=n(R\hat\theta-r_0)^{\mathsf T}
\left[R I_1(\hat\theta)^{-1}R^{\mathsf T}\right]^{-1}
(R\hat\theta-r_0)
\xrightarrow{d}\chi_r^2.
$$
<!-- solution-end -->

### [発展] I3-02-C03 迷惑母数と有効情報量

> Schur補を使う情報行列の発展演習です。

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

とします。第1母数を検定し、第2母数を迷惑母数とするとき、有効情報量を求めてください。

<!-- solution-start -->
**解答**

$$
\boxed{
I_{1\cdot2}
=a-\frac{c^2}{b}
}.
$$
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
\boxed{G^2\xrightarrow{d}\chi_1^2}.
$$

この問題は情報行列を使わず、**制約付きMLEと尤度比**だけで解けます。
<!-- solution-end -->

---

## Level D

### [発展] I3-02-D01 局所対立仮説と非心カイ二乗

> 局所漸近正規性を背景とする発展問題です。

1母数正則モデルで $H_0:\theta=\theta_0$ とし、

$$
\theta_n=\theta_0+\frac h{\sqrt n}
$$

を考えます。1観測あたりの情報量を $I_1(\theta_0)$ とします。

1. $\sqrt{nI_1(\theta_0)}(\hat\theta-\theta_0)$ の極限分布を求めてください。
2. ワルド型統計量の極限分布と非心度を求めてください。

<!-- solution-start -->
**解答**

$$
\sqrt n(\hat\theta-\theta_0)
=\sqrt n(\hat\theta-\theta_n)+h.
$$

したがって

$$
\sqrt{nI_1(\theta_0)}(\hat\theta-\theta_0)
\xrightarrow{d}
N\left(h\sqrt{I_1(\theta_0)},1\right).
$$

よって

$$
\boxed{
W
\xrightarrow{d}
\chi_1^2(\delta),
\qquad
\delta=h^2I_1(\theta_0)
}.
$$
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

$$
G^2
=2n\left[
\hat p\log\frac{\hat p}{p_0}
+(1-\hat p)\log\frac{1-\hat p}{1-p_0}
\right],
$$

$$
W
=\frac{n(\hat p-p_0)^2}{\hat p(1-\hat p)},
\qquad
S_{\mathrm{score}}
=\frac{n(\hat p-p_0)^2}{p_0(1-p_0)}.
$$

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

正則な1母数・1制約問題では

$$
G^2,W,S\xrightarrow{d}\chi_1^2.
$$

<!-- solution-end -->

---

## 章末チェック

### 通常ルート

- [ ] 制約なし最尤推定量 $\hat\theta$ と制約付き最尤推定量 $\tilde\theta$ を区別できる。
- [ ] 尤度比統計量 $2\{\ell(\hat\theta)-\ell(\tilde\theta)\}$ を導ける。
- [ ] Wilksの自由度を制約で失う独立方向数として読める。
- [ ] 1母数ワルド型統計量を「推定値と帰無値の標準化距離」と説明できる。
- [ ] 1母数スコア型統計量を「帰無仮説点の傾き」と説明できる。
- [ ] ベルヌーイ・ポアソンで3統計量を計算できる。
- [ ] 1母数で3検定の漸近同値性をTaylor展開から説明できる。
- [ ] 迷惑母数は帰無仮説下でも必要なら再推定することを理解している。
- [ ] 尤度比の再母数化不変性を説明できる。
- [ ] 境界・非正則問題では通常のWilks近似が壊れ得ることを判断できる。

### 発展

- [ ] 一般制約Waldが情報行列と多変量デルタ法を使う発展項目だと区別できる。
- [ ] Schur補による有効情報量の意味を知っている。
- [ ] 局所対立仮説と非心カイ二乗が漸近検出力の発展理論だと位置付けられる。
