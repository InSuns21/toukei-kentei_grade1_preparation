<!-- definition-example-audit: strict -->

# I2-02 区間推定

I2-01 では、推定量の漸近分布と標準誤差を求めました。本章では、その不確実性を**区間として報告する方法**を扱います。

中心となる発想は一つです。

$$
\boxed{
\text{確率が既知の不等式}
\;\longrightarrow\;
\text{母数について不等式を解く}
\;\longrightarrow\;
\text{信頼区間}
}
$$

正規母集団では、正規分布・t分布・カイ二乗分布を使って有限標本で厳密な区間を作れます。一方、一般の最尤推定量では I2-01 の漸近正規性を使って近似区間を作ります。この2種類を混同しないことが本章の最重要点です。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

関連する正本:

- [S1-01 の t・カイ二乗分布](../S1_01_標本分布とカイ二乗_t_F分布/index.md)
- [I2-01 の漸近正規性と漸近分散](../I2_01_漸近推測_Delta法/index.md#def-i2-01-asymptotic-normality)
- [I2-01 のワルド型標準誤差へつながる最尤推定量の漸近正規性](../I2_01_漸近推測_Delta法/index.md#thm-i2-01-mle-asymptotic-normality)

## この章で解けるようになる問題

- 「95%信頼区間」の95%が何を意味するかを、被覆確率で説明できる。
- 信頼区間を固定された区間ではなく、標本から作られるランダムな区間として扱える。
- ピボット量を見つけ、その分位点を使って区間を反転できる。
- 正規母平均について、母分散既知なら正規分位点、未知ならt分位点を使える。
- 正規母分散について、カイ二乗分位点の順序を逆にして区間を作れる。
- 片側区間で $\alpha/2$ ではなく $\alpha$ を使う理由を説明できる。
- 漸近正規な推定量からワルド型信頼区間を作れる。
- 二項比率のワルド型区間が境界付近で壊れやすい理由を説明できる。
- 単調変換した母数の区間を、元の区間から正確に移送できる。
- $U(0,\theta)$ のような非正則モデルでも、適切なピボット量があれば厳密区間を作れる。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 信頼係数 | 1節で定義し、被覆確率との違いを明示 |
| 信頼区間の構成 | 2節のピボット量から、3〜11節で具体的に構成 |
| 被覆確率 | 1節で定義し、厳密区間・漸近区間の差を繰り返し確認 |

---

## 1. 信頼区間は「母数がランダム」なのではない

頻度論では母数 $\theta$ は固定値です。標本 $X=(X_1,\ldots,X_n)$ がランダムなので、標本から作る区間

$$
[L(X),U(X)]
$$

の方がランダムです。

<a id="def-i2-02-confidence-interval"></a>

<!-- formal-statement-start -->
> **定義（信頼区間）**  
> 母数 $\theta$ に対し、標本 $X$ から計算される統計量 $L(X),U(X)$ を用いたランダム区間 $[L(X),U(X)]$ を考える。所定の被覆水準を満たすよう構成されたこのランダム区間を、$\theta$ の信頼区間という。
<!-- formal-statement-end -->

標本を観測した後は $L(x),U(x)$ は具体的な数値になります。その時点で区間は固定されています。

<a id="def-i2-02-coverage-probability"></a>

<!-- formal-statement-start -->
> **定義（被覆確率）**  
> ランダム区間 $[L(X),U(X)]$ が真の母数 $\theta$ を含む確率

$$
C(\theta)
=P_\theta\{L(X)\le \theta\le U(X)\}
$$

> を被覆確率という。
<!-- formal-statement-end -->

<a id="def-i2-02-confidence-coefficient"></a>

<!-- formal-statement-start -->
> **定義（信頼係数）**  
> ある区間推定法について

$$
\inf_{\theta\in\Theta}C(\theta)\ge 1-\alpha
$$

> が成り立つとき、$1-\alpha$ をその区間が保証する信頼係数と呼ぶ。本章では、被覆確率が全ての $\theta$ でちょうど $1-\alpha$ になる場合を「被覆確率が正確に $1-\alpha$」と明記する。
<!-- formal-statement-end -->

### 1.1 95%信頼区間の正しい読み方

正しい頻度論的解釈は

> 同じ標本抽出と区間構成を何度も繰り返せば、作られた区間の少なくとも95%が真の母数を含む。

です。

観測後の固定区間 $[a,b]$ について、頻度論の母数を固定値として扱う限り

> 「$P(a\le\theta\le b)=0.95$」

と読むのは適切ではありません。

### 1.2 既知分散の正規平均で確認

$X_i\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$、$\sigma$ 既知とします。標準正規分布の上側 $\alpha/2$ 点を $z_{1-\alpha/2}$ とすれば

$$
P_\mu\left(
-z_{1-\alpha/2}
\le
\frac{\sqrt n(\bar X-\mu)}{\sigma}
\le
z_{1-\alpha/2}
\right)
=1-\alpha.
$$

これを $\mu$ について解くと

$$
P_\mu\left(
\bar X-z_{1-\alpha/2}\frac{\sigma}{\sqrt n}
\le \mu\le
\bar X+z_{1-\alpha/2}\frac{\sigma}{\sqrt n}
\right)
=1-\alpha.
$$

したがって

$$
\boxed{
\left[
\bar X-z_{1-\alpha/2}\frac{\sigma}{\sqrt n},
\quad
\bar X+z_{1-\alpha/2}\frac{\sigma}{\sqrt n}
\right]
}
$$

は被覆確率が正確に $1-\alpha$ の信頼区間です。

<!-- definition-example-start: def-i2-02-confidence-interval, def-i2-02-coverage-probability, def-i2-02-confidence-coefficient -->

**定義の確認**

上の区間では、下端・上端は $\bar X$ に依存するため標本抽出前にはランダムです。また各 $\mu$ について

$$
P_\mu\{L(X)\le\mu\le U(X)\}=1-\alpha
$$

なので被覆確率は常に $1-\alpha$、従って信頼係数も $1-\alpha$ です。観測後に区間が $[9.4,10.6]$ になったとしても、95%という値はこの固定区間に新たな確率を付けるものではありません。

<!-- definition-example-end -->

---

## 2. 区間推定の主役: ピボット量

<a id="def-i2-02-pivotal-quantity"></a>

<!-- formal-statement-start -->
> **定義（ピボット量）**  
> 標本 $X$ と母数 $\theta$ の関数 $Q(X,\theta)$ で、その標本分布が未知母数に依存しないものをピボット量という。
<!-- formal-statement-end -->

典型例は、正規母平均の

$$
Z=rac{\sqrt n(\bar X-\mu)}{\sigma}
$$

です。$\sigma$ が既知なら $Z\sim N(0,1)$ であり、その分布は未知の $\mu$ に依存しません。

<a id="thm-i2-02-pivot-construction"></a>

<!-- formal-statement-start -->
> **定理（ピボット量による信頼区間構成）**  
> $Q(X,\theta)$ の分布が未知母数に依存せず、定数 $a<b$ が

$$
P\{a\le Q(X,\theta)\le b\}=1-\alpha
$$

> を満たすとする。この不等式を $\theta$ について解いて

$$
L(X)\le\theta\le U(X)
$$

> と同値に変形できるなら、$[L(X),U(X)]$ は被覆確率 $1-\alpha$ の信頼区間である。
<!-- formal-statement-end -->

<details>
<summary>なぜこれでよいか</summary>

ピボット量の確率式と母数について解いた不等式は、標本ごとに同値です。したがって事象

$$
\{a\le Q(X,\theta)\le b\}
$$

と

$$
\{L(X)\le\theta\le U(X)\}
$$

は同じ事象です。よって前者の確率が $1-\alpha$ なら後者の確率も $1-\alpha$ です。

</details>

<!-- definition-example-start: def-i2-02-pivotal-quantity -->

**定義の確認**

既知分散の正規平均では

$$
Q(X,\mu)=\frac{\sqrt n(\bar X-\mu)}{\sigma}
$$

が $N(0,1)$ に従い、その分布は未知の $\mu$ に依存しません。したがってピボット量の定義を満たします。一方 $\bar X-\mu$ 自体の分布は $N(0,\sigma^2/n)$ で、$\sigma$ まで未知なら未知母数を含むため、そのままでは完全なピボット量ではありません。

<!-- definition-example-end -->

### 2.1 覚えるべきは「分布」ではなく「反転」

区間推定の問題では、次の順序で考えると安定します。

1. 母数を含む統計量を作る。
2. その分布が未知母数に依存しない形にする。
3. 中央 $1-\alpha$ または片側 $1-\alpha$ の確率式を書く。
4. 母数について不等式を解く。
5. 下端と上端の順序を確認する。

特にカイ二乗分布を使う母分散の区間では、4の反転で端点が逆になるため要注意です。

---

## 3. 正規母平均: 母分散既知

$X_i\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$、$\sigma^2$ 既知なら

$$
\frac{\sqrt n(\bar X-\mu)}{\sigma}
\sim N(0,1).
$$

よって両側 $100(1-\alpha)\%$ 信頼区間は

$$
\boxed{
\mu\in
\left[
\bar X-z_{1-\alpha/2}\frac{\sigma}{\sqrt n},
\quad
\bar X+z_{1-\alpha/2}\frac{\sigma}{\sqrt n}
\right]
}.
$$

区間の半幅は

$$
E=z_{1-\alpha/2}\frac{\sigma}{\sqrt n}
$$

です。したがって希望する半幅 $E$ を満たすには

$$
\boxed{
n\ge
\left(
\frac{z_{1-\alpha/2}\sigma}{E}
\right)^2
}
$$

が必要です。標本サイズ設計そのものは S1-03 の主題ですが、ここでは信頼区間の幅からこの式が出ることを確認します。

---

## 4. 正規母平均: 母分散未知ならt分布

母分散が未知のとき、$\sigma$ を単純に $S$ へ置き換えて標準正規分布を使うのは有限標本では厳密ではありません。

正規母集団では

$$
T=
\frac{\sqrt n(\bar X-\mu)}{S}
\sim t_{n-1}
$$

が厳密に成り立ちます。

<a id="def-i2-02-exact-confidence-interval"></a>

<!-- formal-statement-start -->
> **定義（厳密信頼区間）**  
> 有限の標本サイズ $n$ について、全ての許される母数値で被覆確率が指定水準以上になることが理論的に保証される信頼区間を、本章では厳密信頼区間という。
<!-- formal-statement-end -->

<a id="thm-i2-02-t-confidence-interval"></a>

<!-- formal-statement-start -->
> **定理（正規母平均のt信頼区間）**  
> $X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$ とし、$\sigma^2$ は未知とする。不偏標本分散を

$$
S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X)^2
$$

> とする。このとき $\mu$ の両側 $100(1-\alpha)\%$ 信頼区間は

$$
\boxed{
\left[
\bar X-t_{n-1,1-\alpha/2}\frac{S}{\sqrt n},
\quad
\bar X+t_{n-1,1-\alpha/2}\frac{S}{\sqrt n}
\right]
}
$$

> であり、被覆確率は正確に $1-\alpha$ である。
<!-- formal-statement-end -->

<details>
<summary>導出</summary>

$t$ ピボットより

$$
P\left(
-t_{n-1,1-\alpha/2}
\le
\frac{\sqrt n(\bar X-\mu)}S
\le
t_{n-1,1-\alpha/2}
\right)=1-\alpha.
$$

$S>0$ の場合に $\mu$ について解けば

$$
\bar X-t_{n-1,1-\alpha/2}\frac S{\sqrt n}
\le \mu\le
\bar X+t_{n-1,1-\alpha/2}\frac S{\sqrt n}
$$

です。

</details>

<!-- definition-example-start: def-i2-02-exact-confidence-interval -->

**定義の確認**

正規母集団のt区間は、標本サイズが小さくても $T\sim t_{n-1}$ が厳密に成り立つことから構成されています。したがって「$n$ が大きいからだいたい95%」ではなく、正規性の仮定の下で有限標本でも被覆確率が正確に $1-\alpha$ です。

<!-- definition-example-end -->

### 4.1 なぜ自由度は $n-1$ か

$S^2$ の定義で標本平均を同じデータから推定するため、残差の自由度が1つ失われます。S1-01 で扱った

$$
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
$$

と $\bar X$ と $S^2$ の独立性から $t_{n-1}$ が生じます。

---

## 5. 正規母分散: カイ二乗分布を反転する

正規母集団では

$$
Q=
\frac{(n-1)S^2}{\sigma^2}
\sim\chi^2_{n-1}.
$$

カイ二乗分布の $p$ 分位点を $\chi^2_{\nu,p}$ とします。すると

$$
P\left(
\chi^2_{n-1,\alpha/2}
\le
\frac{(n-1)S^2}{\sigma^2}
\le
\chi^2_{n-1,1-\alpha/2}
\right)
=1-\alpha.
$$

<a id="thm-i2-02-variance-confidence-interval"></a>

<!-- formal-statement-start -->
> **定理（正規母分散のカイ二乗信頼区間）**  
> $X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$ とする。母分散 $\sigma^2$ の両側 $100(1-\alpha)\%$ 信頼区間は

$$
\boxed{
\left[
\frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}},
\quad
\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}}
\right]
}
$$

> である。
<!-- formal-statement-end -->

### 5.1 なぜ分位点が逆になるか

途中式

$$
a
\le
\frac{c}{\sigma^2}
\le
b
$$

で $a,b,c>0$ とすると、逆数を取るため

$$
\frac cb
\le
\sigma^2
\le
\frac ca
$$

となります。したがって**大きいカイ二乗分位点が下端、小さい分位点が上端**に来ます。

### 5.2 母標準偏差の区間

平方根は単調増加なので、$\sigma^2$ の区間 $[L,U]$ が得られたら

$$
\boxed{[\sqrt L,\sqrt U]}
$$

が $\sigma$ の同じ信頼係数の区間です。

---

## 6. 片側信頼区間

<a id="def-i2-02-one-sided-confidence-interval"></a>

<!-- formal-statement-start -->
> **定義（片側信頼区間）**  
> 母数の下限だけを与える $[L(X),\infty)$、または上限だけを与える $(-\infty,U(X)]$ の形の信頼区間を片側信頼区間という。
<!-- formal-statement-end -->

既知分散の正規平均について

$$
Z=\frac{\sqrt n(\bar X-\mu)}\sigma\sim N(0,1).
$$

上側信頼限界を求めるなら

$$
P(Z\ge -z_{1-\alpha})=1-\alpha
$$

より

$$
\boxed{
\mu\le
\bar X+z_{1-\alpha}\frac\sigma{\sqrt n}
}
$$

です。

下側信頼限界は

$$
\boxed{
\mu\ge
\bar X-z_{1-\alpha}\frac\sigma{\sqrt n}
}.
$$

両側区間では両端に合計 $\alpha$ を分けるため $\alpha/2$、片側区間では片側だけに $\alpha$ を置くため $\alpha$ を使います。

<!-- definition-example-start: def-i2-02-one-sided-confidence-interval -->

**定義の確認**

$(-\infty,\bar X+z_{1-\alpha}\sigma/\sqrt n]$ は、上端だけが有限の片側区間です。真の $\mu$ がこの区間に含まれる確率は

$$
P_\mu\left(
\mu\le\bar X+z_{1-\alpha}\frac\sigma{\sqrt n}
\right)=1-\alpha
$$

なので、上側 $100(1-\alpha)\%$ 信頼区間になっています。

<!-- definition-example-end -->

---

## 7. 漸近正規性から作るワルド型信頼区間

一般の母数では、有限標本で使えるピボット量が見つからないことがあります。その場合、I2-01 の漸近正規性を使います。

<a id="def-i2-02-asymptotic-confidence-interval"></a>

<!-- formal-statement-start -->
> **定義（漸近信頼区間）**  
> 標本サイズ $n\to\infty$ のとき被覆確率が目標水準 $1-\alpha$ へ収束する区間を漸近信頼区間という。有限標本で被覆確率が正確に $1-\alpha$ であることは要求しない。
<!-- formal-statement-end -->

<a id="prop-i2-02-wald-confidence-interval"></a>

<!-- formal-statement-start -->
> **命題（漸近正規推定量のワルド型信頼区間）**  
> 推定量 $\hat\theta_n$ が

$$
\frac{\hat\theta_n-\theta}{\widehat{\operatorname{se}}(\hat\theta_n)}
\xrightarrow{d}N(0,1)
$$

> を満たすとする。このとき

$$
\boxed{
\hat\theta_n
\pm
z_{1-\alpha/2}
\widehat{\operatorname{se}}(\hat\theta_n)
}
$$

> は $\theta$ の両側 $100(1-\alpha)\%$ 漸近信頼区間である。
<!-- formal-statement-end -->

### 7.1 最尤推定量ではどう使うか

正則な1母数最尤推定量では

$$
\hat\theta
\approx
N\left(\theta,\frac1{I_n(\theta)}\right).
$$

未知の $\theta$ を $\hat\theta$ で置き換えて

$$
\widehat{\operatorname{se}}(\hat\theta)
=
\frac1{\sqrt{I_n(\hat\theta)}}
$$

とすれば

$$
\boxed{
\hat\theta
\pm
z_{1-\alpha/2}
\frac1{\sqrt{I_n(\hat\theta)}}
}
$$

がワルド型区間です。観測情報量を使う場合もあります。

<!-- definition-example-start: def-i2-02-asymptotic-confidence-interval -->

**定義の確認**

ベルヌーイ標本で $\hat p=\bar X$ とすると

$$
\sqrt n(\hat p-p)
\Rightarrow N(0,p(1-p)).
$$

従って

$$
\hat p
\pm
z_{1-\alpha/2}
\sqrt{\frac{\hat p(1-\hat p)}n}
$$

は漸近信頼区間です。しかし有限の $n$ で被覆確率が正確に $1-\alpha$ になるとは限らず、$\hat p=0$ や1では区間幅が0になることさえあります。これは厳密信頼区間との違いを示す典型例です。

<!-- definition-example-end -->

---

## 8. 二項比率のワルド型区間は境界で危ない

$X_i\sim\mathrm{Bernoulli}(p)$ なら

$$
\hat p=\frac1n\sum_iX_i,
\qquad
\widehat{\operatorname{se}}(\hat p)
=
\sqrt{\frac{\hat p(1-\hat p)}n}.
$$

したがって形式的なワルド型区間は

$$
\boxed{
\hat p
\pm
z_{1-\alpha/2}
\sqrt{\frac{\hat p(1-\hat p)}n}
}.
$$

ただし次の問題があります。

- 下端が0未満、上端が1超になることがある。
- $\hat p=0$ または1で推定標準誤差が0になる。
- $np$ や $n(1-p)$ が小さいと正規近似が悪い。
- 有限標本の被覆確率が名目水準から大きくずれることがある。

従って「計算できたから95%」ではありません。近似区間では**近似が妥当な領域か**まで確認します。

本章では公式範囲に集中するため、二項比率の各種改良区間を主題にはしません。後続の検定論ではスコア型検定との関係が見えます。

---

## 9. 単調変換した母数の区間

$\theta$ の信頼区間 $[L,U]$ があり、新しい母数を

$$
\eta=g(\theta)
$$

とします。

<a id="prop-i2-02-monotone-transform"></a>

<!-- formal-statement-start -->
> **命題（単調変換による信頼区間の移送）**  
> $g$ が単調増加なら、$\theta$ の区間 $[L,U]$ から

$$
[g(L),g(U)]
$$

> を作れば、$\eta=g(\theta)$ について元の区間と同じ被覆事象を持つ。$g$ が単調減少なら端点を入れ替えて

$$
[g(U),g(L)]
$$

> とする。
<!-- formal-statement-end -->

理由は、単調増加なら

$$
L\le\theta\le U
\iff
g(L)\le g(\theta)\le g(U)
$$

だからです。

### 9.1 デルタ法による区間との違い

元の区間を単調変換する方法は、**元の区間が持つ被覆事象をそのまま移す**方法です。一方デルタ法で

$$
g(\hat\theta)
\pm
z_{1-\alpha/2}|g'(\hat\theta)|
\widehat{\operatorname{se}}(\hat\theta)
$$

とする方法は局所線形近似です。

元の区間が厳密で $g$ が単調なら、区間変換後も被覆確率は元と同じです。これは、単なる一次近似であるデルタ法区間より強い性質です。

### 9.2 例: 指数分布の平均寿命

率母数 $\lambda$ の区間が

$$
[L_\lambda,U_\lambda]
$$

なら、平均寿命 $m=1/\lambda$ は単調減少変換なので

$$
\boxed{
\left[
\frac1{U_\lambda},
\frac1{L_\lambda}
\right]
}
$$

です。端点の順序が逆になる点に注意します。

---

## 10. 指数分布の率母数: 厳密区間も作れる

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$ を率母数表示で考えます。

和

$$
S=\sum_{i=1}^nX_i
$$

について

$$
S\sim\mathrm{Gamma}(n,\text{rate}=\lambda)
$$

なので

$$
2\lambda S\sim\chi^2_{2n}.
$$

従って

$$
P\left(
\chi^2_{2n,\alpha/2}
\le
2\lambda S
\le
\chi^2_{2n,1-\alpha/2}
\right)=1-\alpha.
$$

$\lambda$ について解けば

$$
\boxed{
\lambda\in
\left[
\frac{\chi^2_{2n,\alpha/2}}{2S},
\quad
\frac{\chi^2_{2n,1-\alpha/2}}{2S}
\right]
}.
$$

これは有限標本で厳密です。

一方 I2-01 の漸近正規性からは

$$
\hat\lambda=\frac nS,
\qquad
\widehat{\operatorname{se}}(\hat\lambda)
\approx\frac{\hat\lambda}{\sqrt n}
$$

なのでワルド型区間も作れます。両者は大標本では近づきますが、小標本では一致しません。

---

## 11. 非正則モデルでもピボット量は使える: 一様分布

$I2$-01 で見た

$$
X_i\overset{\mathrm{iid}}{\sim}U(0,\theta),
\qquad
M=X_{(n)}
$$

を考えます。$0<m<\theta$ に対して

$$
P_\theta(M\le m)
=
\left(\frac m\theta\right)^n.
$$

したがって

$$
R=\frac M\theta
$$

の分布は

$$
P(R\le r)=r^n,
\qquad 0\le r\le1
$$

で、$\theta$ に依存しません。つまり $R$ はピボット量です。

<a id="prop-i2-02-uniform-exact-ci"></a>

<!-- formal-statement-start -->
> **命題（一様分布最大値による厳密信頼区間）**  
> $X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}U(0,\theta)$、$M=X_{(n)}$ とする。$0<a<b\le1$ が

$$
b^n-a^n=1-\alpha
$$

> を満たすなら

$$
\boxed{
\left[
\frac Mb,
\quad
\frac Ma
\right]
}
$$

> は $\theta$ の被覆確率 $1-\alpha$ の厳密信頼区間である。ただし $a=0$ の場合は上端を $\infty$ と解釈する。
<!-- formal-statement-end -->

<details>
<summary>導出</summary>

$$
P(a\le R\le b)
=P(a\le M/\theta\le b)
=b^n-a^n.
$$

また $a,b>0$ なら

$$
a\le\frac M\theta\le b
$$

は

$$
\frac Mb\le\theta\le\frac Ma
$$

と同値です。

</details>

この例は重要です。$U(0,\theta)$ は支持が母数に依存するため通常の正則な最尤推定量の理論から外れます。しかし、**正則性がないことと信頼区間が作れないことは別**です。適切な有限標本ピボット量があれば厳密区間を作れます。

---

## 12. よくある誤り

### 誤り1: 観測後の区間に95%の確率で母数が入る

頻度論では母数は固定です。95%は区間構成法の長期反復での被覆率を表します。

### 誤り2: 母分散未知でも正規分位点を使う

正規母集団で $\sigma$ を $S$ に置き換えるなら、有限標本ではt分布を使います。

### 誤り3: 分散の区間でカイ二乗分位点の順序をそのまま使う

$1/\sigma^2$ が入るので、逆数を取ると端点が反転します。

### 誤り4: 両側95%区間で $z_{0.95}$ を使う

両側95%なら両端に2.5%ずつ置くため $z_{0.975}$ です。

### 誤り5: 片側95%区間で $z_{0.975}$ を使う

片側95%なら片側だけに5%を置くため $z_{0.95}$ です。

### 誤り6: ワルド型区間を厳密区間と呼ぶ

漸近正規性から作る区間は一般に近似区間です。有限標本で名目水準を正確に満たす保証はありません。

### 誤り7: 単調減少変換で端点を入れ替えない

$g$ が減少関数なら $[L,U]$ は $[g(U),g(L)]$ へ写ります。

---

## 13. 章のまとめ

区間推定は次の3層に分けると整理できます。

1. **意味**: 信頼区間はランダム区間、被覆確率は $P_\theta(L\le\theta\le U)$、信頼係数は保証水準。
2. **厳密構成**: ピボット量の確率式を母数について反転する。
3. **漸近構成**: 厳密ピボットがなければ漸近正規性と推定標準誤差からワルド型区間を作る。

正規母集団では

$$
\begin{array}{c|c}
\text{対象} & \text{ピボット量}\\ \hline
\mu,\ \sigma^2\text{既知} & \sqrt n(\bar X-\mu)/\sigma\sim N(0,1)\\
\mu,\ \sigma^2\text{未知} & \sqrt n(\bar X-\mu)/S\sim t_{n-1}\\
\sigma^2 & (n-1)S^2/\sigma^2\sim\chi^2_{n-1}
\end{array}
$$

を軸にすればよいです。

---

# 演習

## Level A

### I2-02-A01 95%信頼区間の意味

- Level: A
- 目安時間: 10分
- 主題: 被覆確率
- 使用技術: 定義の言語化

ある方法で95%信頼区間を作り、観測結果として $[2.1,3.4]$ を得た。

1. 「真の母数がこの区間に入る確率は95%である」という説明が頻度論で不適切な理由を述べよ。
2. 95%の意味を被覆確率を用いて説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

頻度論では母数 $\theta$ は固定値であり、標本から作る区間 $[L(X),U(X)]$ がランダムです。観測後の $[2.1,3.4]$ は固定された区間です。

95%とは、同じ標本抽出と区間構成を繰り返したとき

$$
P_\theta\{L(X)\le\theta\le U(X)\}=0.95
$$

または少なくとも0.95になることを意味します。

##### 本番答案

母数は固定、区間がランダムである。95%は

$$
\boxed{P_\theta(L(X)\le\theta\le U(X))=0.95}
$$

という反復標本抽出での被覆率を表す。

##### 採点基準

- 母数固定・区間ランダム: 10点
- 被覆確率の説明: 10点

<!-- solution-end -->

### I2-02-A02 母分散既知の正規平均

- Level: A
- 目安時間: 10分
- 主題: 正規母平均の信頼区間
- 使用技術: 標準正規分位点

$X_i\overset{\mathrm{iid}}{\sim}N(\mu,16)$、$n=64$、$\bar X=10$ とする。$z_{0.975}=1.96$ として $\mu$ の95%信頼区間を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

標準誤差は

$$
\frac\sigma{\sqrt n}=\frac4{8}=0.5.
$$

従って

$$
10\pm1.96\times0.5=10\pm0.98.
$$

よって

$$
\boxed{[9.02,10.98]}.
$$

##### 本番答案

$$
\boxed{10\pm1.96\cdot\frac4{\sqrt{64}}=[9.02,10.98]}.
$$

##### 採点基準

- 標準誤差: 8点
- 分位点: 4点
- 区間: 8点

<!-- solution-end -->

### I2-02-A03 母分散未知の正規平均

- Level: A
- 目安時間: 10分
- 主題: t信頼区間
- 使用技術: t分位点

正規母集団から $n=16$、$\bar X=50$、$S=8$ を得た。$t_{15,0.975}=2.131$ として $\mu$ の95%信頼区間を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\frac S{\sqrt n}=\frac84=2.
$$

従って

$$
50\pm2.131\times2
=50\pm4.262.
$$

よって

$$
\boxed{[45.738,54.262]}.
$$

##### 本番答案

$$
\boxed{50\pm2.131\cdot\frac8{\sqrt{16}}=[45.738,54.262]}.
$$

##### 採点基準

- 自由度15: 4点
- 標準誤差: 6点
- 区間: 10点

<!-- solution-end -->

### I2-02-A04 正規母分散の区間

- Level: A
- 目安時間: 12分
- 主題: カイ二乗信頼区間
- 使用技術: 不等式反転

正規母集団から $n=11$、$S^2=4$ を得た。自由度10について

$$
\chi^2_{10,0.025}=3.247,
\qquad
\chi^2_{10,0.975}=20.483
$$

とする。$\sigma^2$ の95%信頼区間を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$(n-1)S^2=40$ なので

$$
\left[
\frac{40}{20.483},
\frac{40}{3.247}
\right]
\approx
[1.953,12.319].
$$

##### 本番答案

$$
\boxed{\sigma^2\in[1.953,12.319]}.
$$

##### 採点基準

- 自由度: 4点
- 分位点の反転: 8点
- 数値計算: 8点

<!-- solution-end -->

## Level B

### I2-02-B01 ピボット量から指数分布の厳密区間

- Level: B
- 目安時間: 18分
- 主題: ピボット量
- 使用技術: ガンマ分布、カイ二乗分布

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$ とする。

1. $S=\sum_iX_i$ の分布を述べよ。
2. $2\lambda S$ の分布を述べよ。
3. $\lambda$ の両側 $100(1-\alpha)\%$ 信頼区間を導け。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
S\sim\mathrm{Gamma}(n,\text{rate}=\lambda),
\qquad
2\lambda S\sim\chi^2_{2n}.
$$

従って

$$
P\left(
\chi^2_{2n,\alpha/2}\le2\lambda S\le\chi^2_{2n,1-\alpha/2}
\right)=1-\alpha.
$$

$2S>0$ で割れば

$$
\boxed{
\lambda\in
\left[
\frac{\chi^2_{2n,\alpha/2}}{2S},
\frac{\chi^2_{2n,1-\alpha/2}}{2S}
\right]
}.
$$

##### 本番答案

$$
2\lambda S\sim\chi^2_{2n}
$$

より

$$
\boxed{
\left[
\chi^2_{2n,\alpha/2}/(2S),
\chi^2_{2n,1-\alpha/2}/(2S)
\right]
}.
$$

##### 採点基準

- 和の分布: 5点
- ピボット量: 5点
- 区間反転: 10点

<!-- solution-end -->

### I2-02-B02 片側区間と両側区間

- Level: B
- 目安時間: 15分
- 主題: 片側信頼区間
- 使用技術: 標準正規分位点

$X_i\overset{\mathrm{iid}}{\sim}N(\mu,9)$、$n=36$、$\bar X=20$ とする。$z_{0.95}=1.645$、$z_{0.975}=1.96$ とする。

1. $\mu$ の95%上側信頼限界を求めよ。
2. $\mu$ の95%両側信頼区間を求めよ。
3. 1と2で分位点が異なる理由を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

標準誤差は $3/6=0.5$。

上側95%信頼限界は

$$
20+1.645\times0.5=20.8225.
$$

従って

$$
\boxed{\mu\le20.8225}.
$$

両側95%区間は

$$
20\pm1.96\times0.5
$$

より

$$
\boxed{[19.02,20.98]}.
$$

片側では片側の裾に5%、両側では左右に2.5%ずつ置くため分位点が異なります。

##### 本番答案

$$
\boxed{U=20.8225},
\qquad
\boxed{[19.02,20.98]}.
$$

片側は $\alpha$、両側は各裾に $\alpha/2$ を置く。

##### 採点基準

- 片側限界: 7点
- 両側区間: 7点
- 分位点の説明: 6点

<!-- solution-end -->

### I2-02-B03 二項比率のワルド型区間

- Level: B
- 目安時間: 18分
- 主題: 漸近信頼区間
- 使用技術: 正規近似、標準誤差

$n=100$ 回の独立なベルヌーイ試行で成功が4回だった。

1. $\hat p$ を求めよ。
2. 95%ワルド型信頼区間を求めよ。$z_{0.975}=1.96$ とする。
3. この区間をそのまま信頼してよいか、理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\hat p=0.04.
$$

推定標準誤差は

$$
\sqrt{\frac{0.04\times0.96}{100}}
\approx0.01960.
$$

従って

$$
0.04\pm1.96\times0.01960
\approx0.04\pm0.0384,
$$

よって

$$
\boxed{[0.0016,0.0784]}.
$$

ただし成功数4は小さく、正規近似は十分良いとは言いにくいです。ワルド型区間は有限標本で名目被覆率を保証せず、境界付近では被覆が悪化しやすいので注意が必要です。

##### 本番答案

$$
\hat p=0.04,
\qquad
\boxed{[0.0016,0.0784]}.
$$

成功数が小さく境界に近いため、正規近似に基づくワルド型区間の有限標本被覆は不安定である。

##### 採点基準

- 推定値: 4点
- 標準誤差: 6点
- 区間: 4点
- 注意点: 6点

<!-- solution-end -->

### I2-02-B04 単調変換で平均寿命の区間へ

- Level: B
- 目安時間: 15分
- 主題: 区間の単調変換
- 使用技術: 単調減少関数

指数分布の率母数 $\lambda$ の95%信頼区間が

$$
[0.2,0.5]
$$

であった。平均寿命 $m=1/\lambda$ の95%信頼区間を求めよ。また、なぜ端点が逆になるか説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$g(\lambda)=1/\lambda$ は $\lambda>0$ で単調減少です。従って

$$
[0.2,0.5]
\mapsto
\left[\frac1{0.5},\frac1{0.2}\right]
=[2,5].
$$

##### 本番答案

$$
\boxed{m\in[2,5]}.
$$

$1/\lambda$ が単調減少なので端点の順序が反転する。

##### 採点基準

- 単調減少の指摘: 6点
- 端点反転: 6点
- 区間: 8点

<!-- solution-end -->

## Level C

### I2-02-C01 正規母平均と母分散を同時に処理する

- Level: C
- 目安時間: 25分
- 主題: 正規母集団の厳密信頼区間
- 使用技術: t分布、カイ二乗分布

正規母集団から $n=25$、$\bar X=12$、$S^2=9$ を得た。次の分位点を用いてよい。

$$
t_{24,0.975}=2.064,
$$

$$
\chi^2_{24,0.025}=12.401,
\qquad
\chi^2_{24,0.975}=39.364.
$$

1. $\mu$ の95%信頼区間を求めよ。
2. $\sigma^2$ の95%信頼区間を求めよ。
3. $\sigma$ の95%信頼区間を求めよ。
4. 1と2が有限標本で厳密であるために必要な分布仮定を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$S=3$、標準誤差は $3/5=0.6$ なので

$$
\mu:\quad
12\pm2.064\times0.6
=12\pm1.2384.
$$

従って

$$
\boxed{\mu\in[10.7616,13.2384]}.
$$

分散について

$$
(n-1)S^2=24\times9=216.
$$

従って

$$
\boxed{
\sigma^2\in
\left[
\frac{216}{39.364},
\frac{216}{12.401}
\right]
\approx[5.487,17.418]
}.
$$

平方根を取れば

$$
\boxed{\sigma\in[2.342,4.173]}.
$$

$t$ ピボットとカイ二乗ピボットが有限標本で厳密に成り立つには、母集団の正規性が必要です。

##### 本番答案

$$
\boxed{\mu\in[10.7616,13.2384]},
$$

$$
\boxed{\sigma^2\in[5.487,17.418]},
\qquad
\boxed{\sigma\in[2.342,4.173]}.
$$

有限標本での厳密性は正規母集団を仮定する。

##### 採点基準

- 平均区間: 5点
- 分散区間: 7点
- 標準偏差区間: 4点
- 正規性の指摘: 4点

<!-- solution-end -->

### I2-02-C02 指数分布: 厳密区間とワルド型区間を比較する

- Level: C
- 目安時間: 25分
- 主題: 厳密区間と漸近区間
- 使用技術: カイ二乗ピボット、フィッシャー情報量

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$、$n=10$、$S=\sum X_i=20$ とする。$\chi^2_{20,0.025}=9.591$、$\chi^2_{20,0.975}=34.170$、$z_{0.975}=1.96$ とする。

1. $\lambda$ の最尤推定量を求めよ。
2. ピボット量 $2\lambda S$ から95%厳密信頼区間を求めよ。
3. $I_n(\lambda)=n/\lambda^2$ を用いて95%ワルド型信頼区間を求めよ。
4. 2と3が異なる理由を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\hat\lambda=\frac nS=\frac{10}{20}=0.5.
$$

厳密区間は

$$
\left[
\frac{9.591}{40},
\frac{34.170}{40}
\right]
=
\boxed{[0.2398,0.8543]}.
$$

ワルド型では

$$
\widehat{\operatorname{se}}
=\frac{\hat\lambda}{\sqrt n}
=\frac{0.5}{\sqrt{10}}
\approx0.1581.
$$

従って

$$
0.5\pm1.96\times0.1581
\approx0.5\pm0.3099,
$$

より

$$
\boxed{[0.1901,0.8099]}.
$$

厳密区間は有限標本で $2\lambda S\sim\chi^2_{20}$ を用いているのに対し、ワルド型区間は最尤推定量の漸近正規近似を用いています。$n=10$ では両者が一致する理由はありません。

##### 本番答案

$$
\hat\lambda=0.5,
$$

$$
\boxed{CI_{\mathrm{exact}}=[0.2398,0.8543]},
\qquad
\boxed{CI_{\mathrm{Wald}}=[0.1901,0.8099]}.
$$

前者は有限標本ピボット、後者は漸近正規近似による。

##### 採点基準

- 最尤推定量: 3点
- 厳密区間: 7点
- ワルド型区間: 6点
- 相違理由: 4点

<!-- solution-end -->

### I2-02-C03 変換母数の区間: 直接変換とデルタ法

- Level: C
- 目安時間: 25分
- 主題: 単調変換と漸近区間
- 使用技術: 区間変換、デルタ法

正の母数 $\theta$ の95%信頼区間が $[4,9]$ であるとする。また、$\hat\theta=6.25$、$\widehat{\operatorname{se}}(\hat\theta)=1$ とする。新しい母数 $\eta=\sqrt\theta$ を考える。

1. 元の区間を単調変換して $\eta$ の95%信頼区間を求めよ。
2. デルタ法により $\widehat{\operatorname{se}}(\sqrt{\hat\theta})$ を求めよ。
3. $z_{0.975}=1.96$ としてデルタ法ワルド型区間を求めよ。
4. 1と3の性質の違いを説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

平方根は単調増加なので

$$
[4,9]\mapsto[2,3].
$$

従って直接変換区間は

$$
\boxed{[2,3]}.
$$

$g(\theta)=\sqrt\theta$ だから

$$
g'(\theta)=\frac1{2\sqrt\theta}.
$$

$\hat\theta=6.25$ では $\sqrt{\hat\theta}=2.5$ なので

$$
\widehat{\operatorname{se}}(g(\hat\theta))
\approx
\frac1{2\times2.5}\times1=0.2.
$$

従ってデルタ法ワルド型区間は

$$
2.5\pm1.96\times0.2
=2.5\pm0.392,
$$

よって

$$
\boxed{[2.108,2.892]}.
$$

直接変換は元の区間の被覆事象を単調変換でそのまま移すのに対し、デルタ法区間は局所的な一次近似です。

##### 本番答案

$$
\boxed{[2,3]},
\qquad
\widehat{\operatorname{se}}=0.2,
\qquad
\boxed{[2.108,2.892]}.
$$

直接変換は元の区間の被覆事象を保存し、デルタ法は漸近近似である。

##### 採点基準

- 直接変換: 4点
- デルタ法標準誤差: 6点
- ワルド型区間: 5点
- 性質の比較: 5点

<!-- solution-end -->

### I2-02-C04 一様分布: 最大値から厳密区間を作る

- Level: C
- 目安時間: 25分
- 主題: 非正則モデルのピボット量
- 使用技術: 順序統計量、区間反転

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}U(0,\theta)$、$M=X_{(n)}$ とする。

1. $R=M/\theta$ の分布関数を求めよ。
2. $R$ がピボット量であることを示せ。
3. $P(R\ge\alpha^{1/n})=1-\alpha$ を示せ。
4. 3を反転して、$\theta$ の上側が有限な片側 $100(1-\alpha)\%$ 信頼区間を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$0\le r\le1$ について

$$
P(R\le r)
=P(M\le r\theta)
=r^n.
$$

この分布は $\theta$ に依存しないため $R$ はピボット量です。

$$
P(R\ge\alpha^{1/n})
=1-P(R<\alpha^{1/n})
=1-\alpha.
$$

事象

$$
\frac M\theta\ge\alpha^{1/n}
$$

は

$$
\theta\le\frac M{\alpha^{1/n}}
$$

と同値です。また必ず $\theta\ge M$ ですから

$$
\boxed{
\theta\in
\left[M,\frac M{\alpha^{1/n}}\right]
}
$$

が被覆確率 $1-\alpha$ の区間です。

##### 本番答案

$$
F_R(r)=r^n,
$$

したがって $R$ はピボット量で

$$
\boxed{
P\left(M\le\theta\le M\alpha^{-1/n}\right)=1-\alpha
}.
$$

##### 採点基準

- 分布関数: 5点
- ピボット量: 3点
- 確率式: 4点
- 区間反転: 8点

<!-- solution-end -->

## Level D

### I2-02-D01 一様分布の厳密区間を設計する

- Level: D
- 目安時間: 30分
- 主題: 被覆確率と区間設計
- 使用技術: 順序統計量、ピボット量、最適化

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}U(0,\theta)$、$M=X_{(n)}$ とする。$0<a<b\le1$ に対し

$$
I_{a,b}(M)
=
\left[
\frac Mb,
\frac Ma
\right]
$$

を考える。

1. $I_{a,b}(M)$ の被覆確率を求めよ。
2. 被覆確率を $1-\alpha$ にする条件を求めよ。
3. 区間の相対幅

$$
W(a,b)=\frac{M/a-M/b}{M}=\frac1a-\frac1b
$$

を考える。制約 $b^n-a^n=1-\alpha$ の下で、$a$ を大きくすることが一般に相対幅を小さくする方向に働く理由を説明せよ。
4. $b=1$ とした場合の $a$ を求め、区間を明示せよ。
5. 4の区間が C04 の区間と一致することを確認せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$R=M/\theta$ の分布関数は $F_R(r)=r^n$ なので

$$
P_\theta\{\theta\in I_{a,b}(M)\}
=P(a\le R\le b)
=b^n-a^n.
$$

従って被覆確率を $1-\alpha$ にする条件は

$$
\boxed{b^n-a^n=1-\alpha}.
$$

相対幅は

$$
W(a,b)=a^{-1}-b^{-1}.
$$

$a$ が0へ近づくと $1/a$ が発散し、区間上端が極端に大きくなります。従って短い区間を考えるなら $a$ を不必要に小さくしないことが重要です。ただし $a,b$ は被覆制約で連動するため、厳密な最適化では制約を代入して1変数問題として扱います。

$b=1$ とすると

$$
1-a^n=1-\alpha
$$

より

$$
\boxed{a=\alpha^{1/n}}.
$$

従って

$$
I_{a,1}(M)
=
\boxed{
\left[
M,
M\alpha^{-1/n}
\right]
}.
$$

これは C04 で得た区間と一致します。

##### 本番答案

$$
P(\theta\in I_{a,b})=b^n-a^n.
$$

従って $1-\alpha$ 被覆には

$$
\boxed{b^n-a^n=1-\alpha}.
$$

$b=1$ なら $a=\alpha^{1/n}$ で

$$
\boxed{
\theta\in[M,M\alpha^{-1/n}]
}.
$$

##### 採点基準

- 被覆確率: 5点
- 被覆条件: 4点
- 相対幅の考察: 4点
- $b=1$ の解: 4点
- C04との一致: 3点

<!-- solution-end -->

---

## 30分ドリル

### I2-02-DRILL01 正規母集団の区間推定を一気に処理する

- 目安時間: 30分
- 主題: 信頼区間の総合
- 使用技術: t分布、カイ二乗分布、片側区間、解釈

正規母集団から $n=20$ の標本を取り、$\bar X=100$、$S=10$ を得た。次を用いてよい。

$$
t_{19,0.975}=2.093,
\qquad
t_{19,0.95}=1.729,
$$

$$
\chi^2_{19,0.025}=8.907,
\qquad
\chi^2_{19,0.975}=32.852.
$$

1. $\mu$ の95%両側信頼区間を求めよ。
2. $\mu$ の95%上側信頼限界を求めよ。
3. $\sigma^2$ の95%両側信頼区間を求めよ。
4. $\sigma$ の95%両側信頼区間を求めよ。
5. 「1で得た区間に真の $\mu$ が95%の確率で入る」という説明を修正せよ。
6. 標本サイズが十分大きいとして $t$ 分位点を標準正規分位点へ近似することと、正規母集団という仮定を外してよいことが同値でない理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

平均の標準誤差は

$$
\frac{S}{\sqrt n}
=
\frac{10}{\sqrt{20}}
\approx2.2361.
$$

したがって95%両側区間は

$$
100\pm2.093\times2.2361
\approx100\pm4.680,
$$

よって

$$
\boxed{[95.320,104.680]}.
$$

95%上側信頼限界は

$$
100+1.729\times2.2361
\approx103.866,
$$

従って

$$
\boxed{\mu\le103.866}.
$$

分散について

$$
(n-1)S^2=19\times100=1900.
$$

よって

$$
\sigma^2\in
\left[
\frac{1900}{32.852},
\frac{1900}{8.907}
\right]
\approx
\boxed{[57.835,213.315]}.
$$

平方根を取って

$$
\boxed{\sigma\in[7.605,14.605]}.
$$

95%の意味は、同じ標本抽出と区間構成を繰り返したときに、作られた区間の95%が固定された真の $\mu$ を含むということです。

また $t_\nu$ が自由度の増加とともに標準正規分布へ近づくことは、分位点の近似に関する話です。母集団非正規でもt統計量が有限標本で厳密にt分布に従うことを意味しません。大標本では中心極限定理等により別の漸近正規近似が使える場合がありますが、その根拠は別です。

##### 本番答案

$$
\boxed{\mu\in[95.320,104.680]},
$$

$$
\boxed{\mu\le103.866},
$$

$$
\boxed{\sigma^2\in[57.835,213.315]},
qquad
\boxed{\sigma\in[7.605,14.605]}.
$$

95%は固定母数に対する観測後確率ではなく、区間構成法の反復被覆率を表す。$t$ 分位点の正規近似と母集団正規性の解除は別問題である。

##### 採点基準

- 平均の両側区間: 4点
- 平均の片側限界: 3点
- 分散区間: 5点
- 標準偏差区間: 2点
- 信頼区間の解釈: 3点
- 大標本近似の説明: 3点

<!-- solution-end -->

---

## 到達確認

次を自力で説明できれば、本章の核は閉じています。

1. 信頼区間と被覆確率を数式で定義できる。
2. 信頼係数と、特定の $\theta$ における被覆確率を区別できる。
3. ピボット量から信頼区間を反転できる。
4. 正規母平均で $z$ と $t$ を使い分けられる。
5. 正規母分散の区間でカイ二乗分位点の順序を正しく反転できる。
6. 片側区間と両側区間で分位点が異なる理由を説明できる。
7. 厳密信頼区間と漸近信頼区間を区別できる。
8. 単調変換で区間の被覆事象が保存されることを説明できる。
9. ワルド型区間が境界付近で不安定になり得ることを説明できる。
10. 非正則モデルでもピボット量から厳密区間を作れることを一様分布で示せる。
