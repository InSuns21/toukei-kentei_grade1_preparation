# I2-01 漸近推測・デルタ法

I1-02 では、不偏性・一致性・分散・フィッシャー情報量を使って推定量を評価しました。本章ではさらに一歩進み、標本サイズ $n$ が大きいときに**推定誤差そのものがどのような分布になるか**を扱います。

中心となる流れは

$$
\boxed{
\text{推定量の一致性}
\longrightarrow
\text{誤差を }\sqrt n\text{ 倍する}
\longrightarrow
\text{極限分布を求める}
\longrightarrow
\text{滑らかな変換へデルタ法で伝える}
}
$$

です。

特に正則な1母数モデルの最尤推定量については、単に

$$
\hat\theta_{\mathrm{ML}}
\approx
N\!\left(\theta,\frac1{I_n(\theta)}\right)
$$

と暗記するのではなく、なぜこの形になるかを**スコアの中心極限定理・対数尤度の二階微分・Taylor展開・Slutskyの定理**から導きます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

関連する正本:

- [I1-01 のスコア関数](../I1_01_尤度_最尤推定/index.md#def-i1-01-score)
- [I1-02 のフィッシャー情報量](../I1_02_推定法と推定量の評価/index.md#def-i1-02-fisher-information)
- [I1-02 のフィッシャー情報量の二階微分表示](../I1_02_推定法と推定量の評価/index.md#prop-i1-02-information-hessian)
- [P4-02 の独立同分布中心極限定理](../../02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/index.md#thm-p4-02-iid-clt)
- P4-02 §5: Slutsky型の定理と連続写像

## 本章の範囲の見取り図

通常ルートと発展項目を分けます。

| 区分 | 内容 |
|---|---|
| **通常ルート** | root-$n$ 漸近正規性、1母数最尤推定量の漸近正規性、漸近分散、観測情報量、**1変量デルタ法**、1母数再母数化、非正則例 |
| **補足** | 一次導関数が0の場合の二次デルタ法 |
| **発展** | 多変量デルタ法、フィッシャー情報行列、多母数最尤推定量の一般的な漸近正規性 |

統計検定1級の通常ルートでは、フィッシャー情報量は**1次元**を中心に扱います。したがって、多変量デルタ法や情報行列は「知っていると見通しがよい一般化」ではありますが、本章の必須到達目標にはしません。

## この章で解けるようになる問題

- $\sqrt n(T_n-\theta)$ の極限分布から、$T_n$ の大標本でのばらつきを読める。
- 「root-$n$ 漸近分散」と有限標本の分散を混同せず、$V(\theta)/n$ の形へ戻せる。
- スコア方程式を真値のまわりでTaylor展開し、正則な**1母数**最尤推定量の漸近正規性を導出できる。
- 期待フィッシャー情報量と観測情報量を区別し、最尤推定量の標準誤差近似を作れる。
- 1変量デルタ法で、率・オッズ・対数オッズ・標準偏差などの変換後の漸近分散を求められる。
- $g'(\theta)=0$ のとき一次デルタ法が退化することを見抜き、必要なら二次項を見るべきだと判断できる。
- 1母数の再母数化後のフィッシャー情報量とデルタ法の漸近分散が一致することを確認できる。
- 一様分布の最大値のような非正則モデルで $\sqrt n$ 正規近似が破れることを説明できる。

## 公式出題範囲との対応

| 範囲 | 本章の通常ルート |
|---|---|
| 最尤推定量の漸近正規性 | 1母数モデルでスコア方程式をTaylor展開し、中心極限定理・二階微分の確率収束・Slutskyの定理で導く |
| デルタ法 | **1変量デルタ法**を中心に扱う |
| 漸近分散 | root-$n$ 漸近分散、フィッシャー情報量逆数、変換後の漸近分散 |
| フィッシャー情報量 | 1次元の情報量と観測情報量 |

## 前提知識チェック

1. I1-01: 尤度、対数尤度、スコア方程式を扱える。
2. I1-02: 1母数のフィッシャー情報量、正則条件、クラーメル・ラオ下限を扱える。
3. P4-02: 確率収束・分布収束・中心極限定理・Slutskyの定理を使える。
4. 1変数のTaylor展開を使える。
5. $O_p,o_p$ の意味を既習として使う。

---

## 1. 漸近推測では何を見ているのか

一致性は

$$
T_n\xrightarrow{p}\theta
$$

という性質でした。しかし、これだけでは「どのくらいの速さで近づくのか」「大標本でどの程度ばらつくのか」は分かりません。

典型的な推定量では誤差が

$$
T_n-\theta=O_p(n^{-1/2})
$$

の大きさになります。そこで $\sqrt n$ 倍して

$$
\sqrt n(T_n-\theta)
$$

を見ると、0へ潰れずに非退化な極限分布が現れます。

<a id="def-i2-01-asymptotic-distribution"></a>

<!-- formal-statement-start -->
> **定義（漸近分布）**  
> 推定量列 $T_n$ に対し、定数列 $a_n>0$、中心化項 $b_n$ を選んだとき

$$
a_n(T_n-b_n)\xrightarrow{d}Z
$$

> となる非退化な確率変数 $Z$ の分布を、その中心化・尺度の下での漸近分布という。
<!-- formal-statement-end -->

たとえば標本平均では、有限分散の独立同分布標本について $a_n=\sqrt n$、$b_n=\mu$ とすれば中心極限定理から正規分布が現れます。

---

## 2. 漸近正規性と漸近分散

<a id="def-i2-01-asymptotic-normality"></a>

<!-- formal-statement-start -->
> **定義（root-$n$ 漸近正規性）**  
> 推定量 $T_n$ が母数 $\theta$ に対して

$$
\sqrt n(T_n-\theta)
\xrightarrow{d}
N(0,V(\theta))
$$

> を満たすとき、$T_n$ は root-$n$ 漸近正規であるという。
<!-- formal-statement-end -->

<a id="def-i2-01-asymptotic-variance"></a>

<!-- formal-statement-start -->
> **定義（root-$n$ 漸近分散）**  
> 本章では

$$
\sqrt n(T_n-\theta)
\xrightarrow{d}
N(0,V(\theta))
$$

> に現れる $V(\theta)$ を **root-$n$ 漸近分散** と呼ぶ。
<!-- formal-statement-end -->

したがって、大標本では

$$
T_n
\approx
N\!\left(\theta,\frac{V(\theta)}n\right)
$$

と読みます。

### 2.1 `AVar` の意味

本章の演習では式を短くするため

$$
\boxed{
\operatorname{AVar}(T_n):=V(\theta)
}
$$

と書くことがあります。つまり、`AVar` は本章では**root-$n$ 漸近分散**の略記です。

$$
\sqrt n(T_n-\theta)\Rightarrow N(0,V)
$$

なら

$$
\operatorname{AVar}(T_n)=V,
\qquad
\operatorname{Var}(T_n)\approx\frac{V}{n}.
$$

したがって `AVar` と有限標本の $\operatorname{Var}(T_n)$ は同じものではありません。文献によって「漸近分散」の語法には揺れがあるため、本教材では必ず最初に尺度付きの極限式を確認します。

### 2.2 例: 標本平均

$X_i$ が独立同分布で

$$
E[X_i]=\mu,
\qquad
\operatorname{Var}(X_i)=\sigma^2<\infty
$$

なら中心極限定理より

$$
\sqrt n(\bar X-\mu)
\xrightarrow{d}N(0,\sigma^2).
$$

したがって

$$
\operatorname{AVar}(\bar X)=\sigma^2,
\qquad
\operatorname{Var}(\bar X)=\frac{\sigma^2}{n}.
$$

---

## 3. 正則な最尤推定量はなぜ漸近正規になるか

ここでは**1母数**の独立同分布モデルに絞ります。

真の母数を $\theta_0$ とし、対数尤度を

$$
\ell_n(\theta)=\sum_{i=1}^n\log f(X_i;\theta)
$$

とします。スコアは

$$
U_n(\theta)=\ell_n'(\theta).
$$

最尤推定量 $\hat\theta_n$ が母数空間の内点にあり、スコア方程式を満たすなら

$$
U_n(\hat\theta_n)=0.
$$

### 3.1 スコア方程式をTaylor展開する

平均値の定理を使うと、$\theta_0$ と $\hat\theta_n$ の間の点 $\tilde\theta_n$ が存在して

$$
0
=U_n(\hat\theta_n)
=U_n(\theta_0)
+(\hat\theta_n-\theta_0)\ell_n''(\tilde\theta_n)
$$

です。よって

$$
\boxed{
\sqrt n(\hat\theta_n-\theta_0)
=
\left\{-\frac1n\ell_n''(\tilde\theta_n)\right\}^{-1}
\frac{U_n(\theta_0)}{\sqrt n}
}.
$$

右辺は、

1. $U_n(\theta_0)/\sqrt n$: **スコアの確率変動**
2. $-\ell_n''(\tilde\theta_n)/n$: **対数尤度の負の二階微分を1観測あたりに直した量**

に分かれました。

二階微分が大きいほど、対数尤度の山は真値付近で尖っています。「曲率」という言葉を使うこともありますが、本章では新しい数学的対象を導入しているわけではなく、単に $-\ell_n''$ の大きさを直観的にそう呼んでいるだけです。

### 3.2 スコア側の極限

1観測のスコアを

$$
U_i(\theta_0)
=\frac{\partial}{\partial\theta}\log f(X_i;\theta_0)
$$

とします。正則条件下では

$$
E[U_i(\theta_0)]=0,
\qquad
\operatorname{Var}(U_i(\theta_0))=I_1(\theta_0).
$$

したがって中心極限定理より

$$
\frac{U_n(\theta_0)}{\sqrt n}
=
\frac1{\sqrt n}\sum_{i=1}^nU_i(\theta_0)
\xrightarrow{d}
N(0,I_1(\theta_0)).
$$

### 3.3 二階微分側はフィッシャー情報量へ近づく

正則条件下では

$$
I_1(\theta_0)
=-E[\ell_1''(\theta_0)].
$$

また、$\hat\theta_n\xrightarrow{p}\theta_0$ なら、その間にある $\tilde\theta_n$ も $\theta_0$ の近くへ入っていきます。さらに真値の近くで二階微分が十分安定しており、大数の法則を適用できる正則条件の下では

$$
\boxed{
-\frac1n\ell_n''(\tilde\theta_n)
\xrightarrow{p}
I_1(\theta_0)
}
$$

となります。

試験対策として重要なのは、

$$
\text{スコア側は中心極限定理},
\qquad
\text{二階微分側は情報量へ確率収束}
$$

という役割分担です。

> **発展メモ（厳密化）**  
> $\tilde\theta_n$ は標本から決まるランダムな点なので、固定した $\theta_0$ だけに通常の大数の法則を適用すれば自動的に上式が出るわけではありません。厳密な証明では、真値近傍で二階微分を**一様に制御**できる条件を置きます。その代表的な道具が一様大数の法則です。ここは最尤推定量の漸近正規性を厳密化するための「地下数学」であり、本章の通常ルートでは定理そのものを使いこなすことを要求しません。

### 3.4 Slutskyの定理で結合する

以上を掛け合わせると

$$
\sqrt n(\hat\theta_n-\theta_0)
\xrightarrow{d}
N\!\left(0,\frac1{I_1(\theta_0)}\right).
$$

<a id="thm-i2-01-mle-asymptotic-normality"></a>

<!-- formal-statement-start -->
> **定理（正則な1母数最尤推定量の漸近正規性）**  
> 真値 $\theta_0$ が母数空間の内点にあり、支持が局所的に母数へ依存せず、対数尤度が十分滑らかで、スコアの中心極限定理と対数尤度二階微分の必要な確率収束が成り立ち、$0<I_1(\theta_0)<\infty$ とする。さらに内点の最尤推定量 $\hat\theta_n$ が一致的でスコア方程式を満たすとする。このとき

$$
\boxed{
\sqrt n(\hat\theta_n-\theta_0)
\xrightarrow{d}
N\!\left(0,I_1(\theta_0)^{-1}\right)
}
$$

> が成り立つ。
<!-- formal-statement-end -->

独立同分布標本では

$$
I_n(\theta_0)=nI_1(\theta_0)
$$

なので、大標本では

$$
\boxed{
\hat\theta_n
\approx
N\!\left(\theta_0,I_n(\theta_0)^{-1}\right)
}.
$$

### 3.5 定理の仮定は飾りではない

この定理は「最尤推定量なら何でも正規になる」とは言っていません。たとえば、

- 真値が母数空間の境界にある
- 支持が母数に依存する
- フィッシャー情報量が有限正でない
- モデルが識別不能
- 一致的でない極大点を選ぶ

といった場合には、収束率や極限分布が変わることがあります。

---

## 4. 期待フィッシャー情報量と観測情報量

I1-02 で扱った期待フィッシャー情報量は

$$
I_n(\theta)
=-E_\theta[\ell_n''(\theta)]
$$

でした。一方、実際に観測したデータに対する負の二階微分そのものも使います。

<a id="def-i2-01-observed-information"></a>

<!-- formal-statement-start -->
> **定義（観測情報量）**  
> 1母数モデルで、実現した標本に対する対数尤度の負の二階微分

$$
\boxed{
j_n(\theta)=-\ell_n''(\theta)
}
$$

> を観測情報量という。
<!-- formal-statement-end -->

グラフでいえば、$j_n$ は対数尤度の山の「尖り具合」を測ります。これはあくまで $-\ell_n''$ の直観的説明です。

たとえば指数分布の率母数 $\lambda$ では

$$
\ell_n''(\lambda)=-\frac n{\lambda^2}
$$

なので

$$
j_n(\lambda)=\frac n{\lambda^2}.
$$

この例では二階微分がデータに依存しないため、観測情報量と期待フィッシャー情報量が一致します。

一般には有限標本で両者は一致しませんが、正則な大標本では同じ一次の尺度 $n$ を持ちます。そのため最尤推定量の標準誤差は

$$
\operatorname{se}(\hat\theta_n)
\approx
\frac1{\sqrt{I_n(\hat\theta_n)}}
$$

または

$$
\operatorname{se}(\hat\theta_n)
\approx
\frac1{\sqrt{j_n(\hat\theta_n)}}
$$

と近似します。これは I2-02 の区間推定、I3-02 のワルド型検定へつながります。

---

## 5. 漸近有効性

I1-02 では有限標本でクラーメル・ラオ下限を達成する有効推定量を扱いました。漸近論では、有限標本で厳密に下限を達成しなくても、$n$ を大きくしたときに効率限界へ近づく推定量を考えます。

<a id="def-i2-01-asymptotic-efficiency"></a>

<!-- formal-statement-start -->
> **定義（本章での漸近有効性）**  
> 正則な1母数独立同分布モデルで、推定量 $T_n$ が

$$
\sqrt n(T_n-\theta)
\xrightarrow{d}
N\!\left(0,I_1(\theta)^{-1}\right)
$$

> を満たすとき、本章では $T_n$ がフィッシャー情報量に基づく漸近効率限界を達成するといい、漸近有効と呼ぶ。
<!-- formal-statement-end -->

[正則な1母数最尤推定量の漸近正規性](#thm-i2-01-mle-asymptotic-normality)により、正則な最尤推定量はこの形を持ちます。ただし、有限標本の分散が厳密に $I_n^{-1}$ であるという意味ではありません。

---

## 6. 1変量デルタ法

推定したい量が $\theta$ そのものではなく

$$
\eta=g(\theta)
$$

である場面は多くあります。たとえば、

- 率 $\lambda$ から平均寿命 $1/\lambda$
- 成功確率 $p$ からオッズ $p/(1-p)$
- 成功確率 $p$ から対数オッズ $\log\{p/(1-p)\}$
- 分散 $v$ から標準偏差 $\sqrt v$

への変換です。

### 6.1 Taylor展開から導く

$g$ が $\theta$ で微分可能なら

$$
g(T_n)
=g(\theta)+g'(\theta)(T_n-\theta)+r_n,
$$

ここで

$$
r_n=o_p(|T_n-\theta|).
$$

$T_n-\theta=O_p(n^{-1/2})$ なら

$$
\sqrt n\,r_n=o_p(1).
$$

したがって

$$
\sqrt n\{g(T_n)-g(\theta)\}
=g'(\theta)\sqrt n(T_n-\theta)+o_p(1).
$$

<a id="thm-i2-01-delta-scalar"></a>

<!-- formal-statement-start -->
> **定理（1変量デルタ法）**  
> 推定量 $T_n$ が

$$
\sqrt n(T_n-\theta)\xrightarrow{d}N(0,V(\theta))
$$

> を満たし、$g$ が $\theta$ で微分可能とする。このとき

$$
\boxed{
\sqrt n\{g(T_n)-g(\theta)\}
\xrightarrow{d}
N\!\left(0,\{g'(\theta)\}^2V(\theta)\right)
}
$$

> が成り立つ。
<!-- formal-statement-end -->

したがって

$$
\boxed{
\operatorname{AVar}\{g(T_n)\}
=\{g'(\theta)\}^2\operatorname{AVar}(T_n)
}
$$

であり、大標本では

$$
\operatorname{Var}\{g(T_n)\}
\approx
\frac{\{g'(\theta)\}^2V(\theta)}n.
$$

---

## 7. デルタ法の基本例

### 7.1 指数分布: 平均から率へ

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$ を率母数表示で考えます。

$$
E[X]=\frac1\lambda,
\qquad
\operatorname{Var}(X)=\frac1{\lambda^2}.
$$

$\mu=1/\lambda$ とおけば中心極限定理より

$$
\sqrt n(\bar X-\mu)
\xrightarrow{d}
N\!\left(0,\frac1{\lambda^2}\right).
$$

率の最尤推定量は

$$
\hat\lambda=\frac1{\bar X}=g(\bar X),
\qquad
g(x)=\frac1x.
$$

$$
g'(\mu)=-\frac1{\mu^2}=-\lambda^2
$$

だからデルタ法より

$$
\boxed{
\sqrt n(\hat\lambda-\lambda)
\xrightarrow{d}
N(0,\lambda^2)
}.
$$

したがって

$$
\operatorname{AVar}(\hat\lambda)=\lambda^2.
$$

1観測あたりのフィッシャー情報量は

$$
I_1(\lambda)=\frac1{\lambda^2}
$$

なので、その逆数と一致します。

### 7.2 ベルヌーイ分布: 対数オッズ

$X_i\sim\mathrm{Bernoulli}(p)$ なら

$$
\sqrt n(\hat p-p)
\xrightarrow{d}
N(0,p(1-p)),
\qquad
\hat p=\bar X.
$$

対数オッズ

$$
\eta=g(p)=\log\frac p{1-p}
$$

について

$$
g'(p)=\frac1{p(1-p)}.
$$

よって

$$
\boxed{
\sqrt n\{g(\hat p)-g(p)\}
\xrightarrow{d}
N\!\left(0,\frac1{p(1-p)}\right)
}.
$$

したがって

$$
\operatorname{AVar}\{g(\hat p)\}
=\frac1{p(1-p)}.
$$

### 7.3 分散から標準偏差へ

平均 $\mu$ が既知で

$$
X_i\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)
$$

とし

$$
T_n=\frac1n\sum_{i=1}^n(X_i-\mu)^2
$$

とします。正規分布の4次モーメントから

$$
E[(X_i-\mu)^2]=\sigma^2,
\qquad
\operatorname{Var}((X_i-\mu)^2)=2\sigma^4.
$$

したがって

$$
\sqrt n(T_n-\sigma^2)
\xrightarrow{d}N(0,2\sigma^4).
$$

$g(v)=\sqrt v$ なら

$$
g'(\sigma^2)=\frac1{2\sigma}
$$

なので

$$
\boxed{
\sqrt n(\sqrt{T_n}-\sigma)
\xrightarrow{d}
N\!\left(0,\frac{\sigma^2}{2}\right)
}.
$$

---

## 8. 補足: 一次導関数が0ならどうするか

1変量デルタ法で $g'(\theta)=0$ なら

$$
\sqrt n\{g(T_n)-g(\theta)\}
\xrightarrow{p}0
$$

となり、一次近似は非退化な極限を与えません。この場合は二階Taylor展開を確認します。

<a id="prop-i2-01-second-order-delta"></a>

<!-- formal-statement-start -->
> **命題（二次デルタ法の基本形）**  
> $\sqrt n(T_n-\theta)\xrightarrow{d}Z$、$g'(\theta)=0$ とし、$g$ が $\theta$ で二階微分可能とする。適切な剰余条件の下で

$$
\boxed{
n\{g(T_n)-g(\theta)\}
\xrightarrow{d}
\frac12g''(\theta)Z^2
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 8.1 例: 平均0で $\bar X^2$

$X_i\sim N(0,1)$ なら

$$
\sqrt n\bar X\sim N(0,1)
$$

が有限標本でも厳密に成り立ちます。$g(x)=x^2$ は

$$
g'(0)=0,
\qquad
g''(0)=2
$$

なので

$$
\boxed{
n\bar X^2
\xrightarrow{d}
\chi_1^2
}.
$$

「デルタ法を使えばいつでも正規極限になる」という理解は誤りです。

---

## 9. 1母数の再母数化とフィッシャー情報量

$\eta=g(\theta)$ が1対1の滑らかな変換で、逆関数を

$$
\theta=h(\eta)
$$

とします。連鎖律より

$$
U_\eta
=
\frac{\partial\ell}{\partial\eta}
=
U_\theta\frac{d\theta}{d\eta}.
$$

<a id="prop-i2-01-fisher-reparameterization"></a>

<!-- formal-statement-start -->
> **命題（フィッシャー情報量の再母数化則）**  
> 1対1で微分可能な1母数再母数化 $\eta=g(\theta)$ の下で

$$
\boxed{
I_\eta(\eta)
=I_\theta(\theta)
\left(\frac{d\theta}{d\eta}\right)^2
}
$$

> が成り立つ。
<!-- formal-statement-end -->

一方、最尤推定量の不変性により

$$
\hat\eta=g(\hat\theta).
$$

デルタ法から

$$
\operatorname{AVar}(\hat\eta)
=\{g'(\theta)\}^2I_\theta(\theta)^{-1}.
$$

逆関数の微分

$$
\frac{d\theta}{d\eta}=\frac{1}{g'(\theta)}
$$

を使うと

$$
\{g'(\theta)\}^2I_\theta^{-1}
=I_\eta^{-1}.
$$

したがって、

- 最尤推定量を変換してデルタ法を使う
- 再母数化後のフィッシャー情報量を直接計算する

の2経路は整合します。

---

## 10. 非正則例: 一様分布の最尤推定量は $\sqrt n$ 正規ではない

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}U(0,\theta)$ とし、

$$
M_n=X_{(n)}
$$

とします。尤度は

$$
L(\theta)=\theta^{-n}\mathbf1(M_n\le\theta)
$$

なので、最尤推定量は

$$
\hat\theta=M_n
$$

です。

$t\ge0$ を固定すると

$$
\begin{aligned}
P\{n(\theta-M_n)>t\}
&=P\left(M_n<\theta-\frac tn\right)\\
&=\left(1-\frac{t}{n\theta}\right)^n
\to e^{-t/\theta}.
\end{aligned}
$$

<a id="prop-i2-01-uniform-n-rate"></a>

<!-- formal-statement-start -->
> **命題（一様分布の最尤推定量の非正規極限）**  
> $X_i\overset{\mathrm{iid}}{\sim}U(0,\theta)$、$M_n=X_{(n)}$ とすると

$$
\boxed{
n(\theta-M_n)
\xrightarrow{d}
\mathrm{Exp}(1/\theta)
}
$$

> が成り立つ。ここで $\mathrm{Exp}(1/\theta)$ は率 $1/\theta$ の指数分布を表す。
<!-- formal-statement-end -->

この例では誤差は $1/\sqrt n$ ではなく $1/n$ の尺度です。しかも極限分布は正規分布ではありません。支持 $[0,\theta]$ が母数に依存するため、正則な最尤推定量の漸近正規性定理の仮定を満たしません。

---

## 11. 発展: 多変量デルタ法

> **発展項目**  
> ここからの多変量デルタ法は、1変量デルタ法の自然な一般化です。ただし、統計検定1級の通常ルートでは必須項目として扱いません。行列版を使う問題や、後続分野との接続を見たい場合に読んでください。

複数の統計量を同時に変換するときは勾配・ヤコビ行列を使います。

<a id="thm-i2-01-delta-multivariate"></a>

<!-- formal-statement-start -->
> **定理（多変量デルタ法）**  
> $T_n\in\mathbb R^p$、$\theta\in\mathbb R^p$ とし、

$$
\sqrt n(T_n-\theta)\xrightarrow{d}N_p(0,\Sigma)
$$

> とする。$g:\mathbb R^p\to\mathbb R^q$ が $\theta$ で微分可能で、ヤコビ行列を $J_g(\theta)$ とすると

$$
\boxed{
\sqrt n\{g(T_n)-g(\theta)\}
\xrightarrow{d}
N_q\!\left(0,J_g(\theta)\Sigma J_g(\theta)^\mathsf T\right)
}
$$

> が成り立つ。
<!-- formal-statement-end -->

$q=1$ なら

$$
\operatorname{AVar}\{g(T_n)\}
=
\nabla g(\theta)^\mathsf T
\Sigma
\nabla g(\theta).
$$

### 11.1 発展例: 標本第1・第2モーメントから分散へ

$$
M_{1n}=\frac1n\sum_iX_i,
\qquad
M_{2n}=\frac1n\sum_iX_i^2
$$

とし、$\mu=E[X]$、$m_2=E[X^2]$ とします。母分散は

$$
\sigma^2=g(\mu,m_2)=m_2-\mu^2,
$$

勾配は

$$
\nabla g(\mu,m_2)
=
\begin{pmatrix}
-2\mu\\
1
\end{pmatrix}.
$$

$(M_{1n},M_{2n})$ のroot-$n$漸近分散共分散行列を $\Sigma$ とすれば

$$
\operatorname{AVar}(M_{2n}-M_{1n}^2)
=
(-2\mu,1)\Sigma
\begin{pmatrix}-2\mu\\1\end{pmatrix}.
$$

有限4次モーメントを仮定して整理すると

$$
\mu_4-\sigma^4,
\qquad
\mu_4=E[(X-\mu)^4]
$$

です。正規分布なら $\mu_4=3\sigma^4$ なので $2\sigma^4$ になります。

---

## 12. 発展: 多母数最尤推定量とフィッシャー情報行列

> **発展項目**  
> フィッシャー情報量を行列へ一般化する節です。1次元フィッシャー情報量の試験対策が目的なら省略して構いません。

母数がベクトル

$$
\theta\in\mathbb R^p
$$

の場合、スコアベクトルを

$$
U_n(\theta)=\nabla\ell_n(\theta)
$$

とし、1観測あたりのフィッシャー情報行列を

$$
I_1(\theta)
=E[U_1(\theta)U_1(\theta)^\mathsf T]
$$

とします。正則条件下で1母数と同様の議論を行うと

$$
\sqrt n(\hat\theta_n-\theta_0)
\xrightarrow{d}
N_p\!\left(0,I_1(\theta_0)^{-1}\right).
$$

ここで $I_1^{-1}$ は成分ごとの逆数ではなく**逆行列**です。多変量デルタ法を組み合わせれば、変換後の漸近分散共分散行列は

$$
J_g(\theta_0)
I_1(\theta_0)^{-1}
J_g(\theta_0)^\mathsf T
$$

となります。

---

## 13. よくある誤り

1. **`AVar` を有限標本分散と読む。**  
   本章では $\operatorname{AVar}(T_n)$ は root-$n$ 漸近分散です。$T_n$ 自身の大標本分散は約 $\operatorname{AVar}(T_n)/n$ です。
2. **最尤推定量なら正則条件を確認しない。**  
   一様分布、境界母数、識別不能なモデルなどでは通常の結論が破れることがあります。
3. **デルタ法で導関数を二乗し忘れる。**  
   1変量では漸近分散が $\{g'(\theta)\}^2V$ になります。
4. **$g'(\theta)=0$ なのに一次デルタ法で非退化な正規分布を出す。**  
   一次項が消えたら尺度を見直し、二次項を確認します。
5. **「一様大数の法則」を本章の必須前提だと思う。**  
   厳密証明の地下では必要になりますが、通常ルートでは「二階微分側が情報量へ確率収束する正則条件」として使えば十分です。
6. **発展の多変量公式を1級の必須項目と混同する。**  
   $J\Sigma J^\mathsf T$ やフィッシャー情報行列は本章では発展です。
7. **観測情報量と期待フィッシャー情報量を同一視する。**  
   有限標本では観測情報量は実データに依存します。

---

# 演習

## Level A

### I2-01-A01 漸近分散を読み直す

- Level: A
- 目安時間: 8分
- 主題: 漸近正規性
- 使用技術: 尺度の読み替え

ある推定量 $T_n$ が

$$
\sqrt n(T_n-\theta)\xrightarrow{d}N(0,9\theta^2)
$$

を満たすとする。

1. root-$n$ 漸近分散を答えよ。
2. 大標本での $\operatorname{Var}(T_n)$ の近似を書け。
3. $\theta$ を $T_n$ で置き換えた標準誤差推定量を書け。

<!-- solution-start -->

#### 解答

$$
\boxed{\operatorname{AVar}(T_n)=9\theta^2}.
$$

したがって

$$
\operatorname{Var}(T_n)\approx\frac{9\theta^2}{n},
\qquad
\operatorname{se}(T_n)\approx\frac{3|\theta|}{\sqrt n}.
$$

plug-in すると

$$
\boxed{
\widehat{\operatorname{se}}(T_n)
=\frac{3|T_n|}{\sqrt n}
}.
$$

<!-- solution-end -->

### I2-01-A02 ベルヌーイ最尤推定量の漸近正規性

- Level: A
- 目安時間: 10分
- 主題: フィッシャー情報量
- 使用技術: 正則な最尤推定量の漸近正規性

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Bernoulli}(p)$、$0<p<1$ とする。$\hat p=\bar X$ について、フィッシャー情報量から漸近分布を求めよ。

<!-- solution-start -->

#### 解答

1観測あたり

$$
I_1(p)=\frac1{p(1-p)}.
$$

したがって

$$
\boxed{
\sqrt n(\hat p-p)
\xrightarrow{d}N(0,p(1-p))
}.
$$

大標本では

$$
\hat p\approx N\!\left(p,\frac{p(1-p)}n\right).
$$

<!-- solution-end -->

### I2-01-A03 指数分布の率母数にデルタ法

- Level: A
- 目安時間: 10分
- 主題: 1変量デルタ法
- 使用技術: 中心極限定理、逆数変換

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$ とする。$\hat\lambda=1/\bar X$ の root-$n$ 漸近分散を求めよ。

<!-- solution-start -->

#### 解答

$\mu=1/\lambda$ とおくと

$$
\sqrt n(\bar X-\mu)
\Rightarrow N(0,1/\lambda^2).
$$

$g(x)=1/x$ だから

$$
g'(\mu)=-\lambda^2.
$$

よって

$$
\boxed{
\sqrt n(\hat\lambda-\lambda)
\Rightarrow N(0,\lambda^2)
}
$$

であり

$$
\boxed{\operatorname{AVar}(\hat\lambda)=\lambda^2}.
$$

<!-- solution-end -->

### I2-01-A04 分散から標準偏差へ

- Level: A
- 目安時間: 10分
- 主題: デルタ法
- 使用技術: 平方根変換

ある $T_n$ が

$$
\sqrt n(T_n-\sigma^2)\Rightarrow N(0,2\sigma^4),
\qquad \sigma>0
$$

を満たす。$S_n=\sqrt{T_n}$ の漸近分布を求めよ。

<!-- solution-start -->

#### 解答

$g(v)=\sqrt v$ とすると

$$
g'(\sigma^2)=\frac1{2\sigma}.
$$

したがって

$$
\boxed{
\sqrt n(S_n-\sigma)
\Rightarrow N\!\left(0,\frac{\sigma^2}{2}\right)
}.
$$

<!-- solution-end -->

---

## Level B

### I2-01-B01 最尤推定量の漸近正規性を4段階で導く

- Level: B
- 目安時間: 20分
- 主題: 最尤推定量の漸近正規性
- 使用技術: Taylor展開、中心極限定理、確率収束、Slutskyの定理

正則な独立同分布1母数モデルで真値を $\theta_0$、最尤推定量を $\hat\theta_n$ とする。

1. スコア方程式を $\theta_0$ のまわりで展開せよ。
2. $U_n(\theta_0)/\sqrt n$ の極限分布を書け。
3. $-\ell_n''(\tilde\theta_n)/n$ の確率極限を書け。
4. 最終的な漸近分布を求めよ。

<!-- solution-start -->

#### 解答

$$
0=U_n(\theta_0)+(\hat\theta_n-\theta_0)\ell_n''(\tilde\theta_n)
$$

より

$$
\sqrt n(\hat\theta_n-\theta_0)
=\{-\ell_n''(\tilde\theta_n)/n\}^{-1}
U_n(\theta_0)/\sqrt n.
$$

正則条件下で

$$
\frac{U_n(\theta_0)}{\sqrt n}
\Rightarrow N(0,I_1(\theta_0)),
$$

$$
-\frac1n\ell_n''(\tilde\theta_n)
\xrightarrow{p}I_1(\theta_0).
$$

Slutskyの定理より

$$
\boxed{
\sqrt n(\hat\theta_n-\theta_0)
\Rightarrow N(0,I_1(\theta_0)^{-1})
}.
$$

##### 採点基準

- Taylor展開: 6点
- スコアの中心極限定理: 5点
- 二階微分側の確率収束: 5点
- Slutskyの定理と結論: 4点

<!-- solution-end -->

### I2-01-B02 ベルヌーイ分布の対数オッズ

- Level: B
- 目安時間: 15分
- 主題: デルタ法
- 使用技術: 対数オッズ変換、標準誤差

$X_i\sim\mathrm{Bernoulli}(p)$、$0<p<1$ とし、$\hat p=\bar X$ とする。

$$
\eta=\log\frac p{1-p},
\qquad
\hat\eta=\log\frac{\hat p}{1-\hat p}
$$

について、root-$n$ 漸近分散と大標本標準誤差のplug-in推定量を求めよ。

<!-- solution-start -->

#### 解答

$$
\sqrt n(\hat p-p)\Rightarrow N(0,p(1-p)).
$$

$$
g'(p)=\frac1{p(1-p)}
$$

だから

$$
\boxed{
\operatorname{AVar}(\hat\eta)=\frac1{p(1-p)}
}.
$$

従って

$$
\boxed{
\widehat{\operatorname{se}}(\hat\eta)
=\sqrt{\frac1{n\hat p(1-\hat p)}}
}.
$$

<!-- solution-end -->

### I2-01-B03 再母数化して情報量を確認する

- Level: B
- 目安時間: 15分
- 主題: 1母数再母数化
- 使用技術: フィッシャー情報量、連鎖律、デルタ法

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$ とし、平均寿命を

$$
m=\frac1\lambda
$$

とする。$I_1(\lambda)=1/\lambda^2$ を用いてよい。

1. $d\lambda/dm$ を求めよ。
2. 再母数化則から $I_1(m)$ を求めよ。
3. $I_1(m)^{-1}$ と $\hat m=\bar X$ のroot-$n$漸近分散が一致することを確認せよ。

<!-- solution-start -->

#### 解答

$$
\lambda=\frac1m,
\qquad
\frac{d\lambda}{dm}=-\frac1{m^2}.
$$

したがって

$$
I_1(m)
=I_1(\lambda)\left(\frac{d\lambda}{dm}\right)^2
=m^2\frac1{m^4}
=\frac1{m^2}.
$$

よって

$$
\boxed{I_1(m)^{-1}=m^2}.
$$

一方、指数分布では

$$
\sqrt n(\bar X-m)\Rightarrow N(0,m^2),
$$

なので一致します。

<!-- solution-end -->

### I2-01-B04 一次デルタ法が退化する例

- Level: B
- 目安時間: 15分
- 主題: 二次デルタ法
- 使用技術: Taylor展開、カイ二乗分布

$X_i\overset{\mathrm{iid}}{\sim}N(0,1)$ とし、$T_n=\bar X^2$ とする。

1. $g(x)=x^2$ に一次デルタ法を適用すると何が起こるか説明せよ。
2. $nT_n$ の極限分布を求めよ。

<!-- solution-start -->

#### 解答

$g'(0)=0$ なので一次デルタ法は

$$
\sqrt n\bar X^2\xrightarrow{p}0
$$

という退化した結論しか与えません。一方

$$
\sqrt n\bar X\sim N(0,1)
$$

だから

$$
\boxed{n\bar X^2=(\sqrt n\bar X)^2\sim\chi_1^2}.
$$

<!-- solution-end -->

---

## Level C

### I2-01-C01 指数分布: 最尤推定・情報量・デルタ法を閉じる

- Level: C
- 目安時間: 25分
- 主題: 最尤推定量の漸近正規性
- 使用技術: 尤度、フィッシャー情報量、中心極限定理、デルタ法

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$ を率母数表示で考える。

1. $\lambda$ の最尤推定量を求めよ。
2. 1観測あたりのフィッシャー情報量を求めよ。
3. 正則な最尤推定量の定理から $\hat\lambda$ の漸近分布を求めよ。
4. $\bar X$ の中心極限定理とデルタ法から同じ漸近分布を導け。
5. 2つの導出が一致する理由を述べよ。

<!-- solution-start -->

#### 解答

対数尤度は

$$
\ell_n(\lambda)=n\log\lambda-\lambda\sum_iX_i.
$$

よって

$$
\hat\lambda=\frac1{\bar X}.
$$

二階微分は

$$
\ell_n''(\lambda)=-\frac n{\lambda^2}
$$

なので

$$
I_1(\lambda)=\frac1{\lambda^2}.
$$

正則な最尤推定量の漸近正規性より

$$
\boxed{
\sqrt n(\hat\lambda-\lambda)
\Rightarrow N(0,\lambda^2)
}.
$$

また、$E[X]=1/\lambda$、$\operatorname{Var}(X)=1/\lambda^2$ と $g(x)=1/x$ を使えば、中心極限定理とデルタ法から同じ結論を得ます。

両者が一致するのは、正則な1母数最尤推定量の漸近分散が $I_1(\lambda)^{-1}$ であり、1母数の再母数化とデルタ法が同じ局所一次近似を表しているからです。

<!-- solution-end -->

### I2-01-C02 ベルヌーイ分布の確率・オッズ・対数オッズ

- Level: C
- 目安時間: 25分
- 主題: 複数の1変量変換
- 使用技術: ベルヌーイ分布、導関数、漸近分散比較

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Bernoulli}(p)$、$0<p<1$ とし $\hat p=\bar X$ とする。

1. $\hat p$ のroot-$n$漸近分散を求めよ。
2. オッズ $r=p/(1-p)$ の推定量 $\hat r=\hat p/(1-\hat p)$ のroot-$n$漸近分散を求めよ。
3. 対数オッズ $\eta=\log r$ の推定量のroot-$n$漸近分散を求めよ。
4. $p\to0$ または $p\to1$ で対数オッズの分散が大きくなる理由を式から説明せよ。

<!-- solution-start -->

#### 解答

$$
\operatorname{AVar}(\hat p)=p(1-p).
$$

オッズ $g(p)=p/(1-p)$ では

$$
g'(p)=\frac1{(1-p)^2}
$$

なので

$$
\boxed{\operatorname{AVar}(\hat r)=\frac{p}{(1-p)^3}}.
$$

対数オッズでは

$$
h'(p)=\frac1{p(1-p)}
$$

なので

$$
\boxed{\operatorname{AVar}(\hat\eta)=\frac1{p(1-p)}}.
$$

$p$ が0または1へ近づくと $p(1-p)\to0$ なので、その逆数が発散します。

<!-- solution-end -->

### I2-01-C03 一様分布の最尤推定量の収束率

- Level: C
- 目安時間: 25分
- 主題: 非正則漸近論
- 使用技術: 順序統計量、指数極限、正則条件

$X_i\overset{\mathrm{iid}}{\sim}U(0,\theta)$、$M_n=X_{(n)}$ とする。

1. $M_n$ が最尤推定量であることを確認せよ。
2. $t\ge0$ に対して $P\{n(\theta-M_n)>t\}$ を求めよ。
3. 極限分布を求めよ。
4. この結果が正則な最尤推定量の漸近正規性定理と矛盾しない理由を説明せよ。

<!-- solution-start -->

#### 解答

$$
L(\theta)=\theta^{-n}\mathbf1(M_n\le\theta)
$$

より

$$
\hat\theta=M_n.
$$

また

$$
\begin{aligned}
P\{n(\theta-M_n)>t\}
&=P(M_n<\theta-t/n)\\
&=\left(1-\frac{t}{n\theta}\right)^n
\to e^{-t/\theta}.
\end{aligned}
$$

従って

$$
\boxed{n(\theta-M_n)\Rightarrow\mathrm{Exp}(1/\theta)}.
$$

支持 $[0,\theta]$ が母数に依存するので、正則な最尤推定量の漸近正規性定理は適用できません。

<!-- solution-end -->

### [発展] I2-01-C04 2母数正規モデルを $(\mu,\sigma)$ へ変換する

> この問題は多変量デルタ法の発展演習です。通常ルートでは省略して構いません。

- Level: C
- 目安時間: 25分
- 主題: 多変量デルタ法
- 使用技術: ヤコビ行列、分散共分散行列

$X_i\overset{\mathrm{iid}}{\sim}N(\mu,v)$、$v=\sigma^2>0$ とする。正則な推定量 $\hat\theta=(\hat\mu,\hat v)^\mathsf T$ について

$$
\sqrt n
\begin{pmatrix}
\hat\mu-\mu\\
\hat v-v
\end{pmatrix}
\Rightarrow
N_2\left(
\begin{pmatrix}0\\0\end{pmatrix},
\begin{pmatrix}
v&0\\
0&2v^2
\end{pmatrix}
\right)
$$

を用いてよい。

1. $g(\mu,v)=(\mu,\sqrt v)^\mathsf T$ のヤコビ行列を求めよ。
2. $(\hat\mu,\hat\sigma)$ のroot-$n$漸近分散共分散行列を求めよ。

<!-- solution-start -->

#### 解答

$$
J_g(\mu,v)
=
\begin{pmatrix}
1&0\\
0&1/(2\sigma)
\end{pmatrix}.
$$

多変量デルタ法より

$$
\boxed{
J_g
\begin{pmatrix}
\sigma^2&0\\
0&2\sigma^4
\end{pmatrix}
J_g^\mathsf T
=
\begin{pmatrix}
\sigma^2&0\\
0&\sigma^2/2
\end{pmatrix}
}.
$$

<!-- solution-end -->

---

## Level D

### [発展] I2-01-D01 1母数から複数の量へ運ぶ

> この問題の「複数の推定量を同時に扱う」部分は多変量デルタ法の発展です。各成分の漸近分散だけなら1変量デルタ法で解けます。

- Level: D
- 目安時間: 40分
- 主題: 最尤推定・再母数化・デルタ法
- 使用技術: 指数分布、フィッシャー情報量、1変量デルタ法、多変量デルタ法（発展）

寿命 $X_1,\ldots,X_n$ が独立に率 $\lambda>0$ の指数分布に従うとする。平均寿命を

$$
m=\frac1\lambda
$$

とし、時点 $t>0$ まで生存する確率を

$$
R(t)=e^{-\lambda t}
$$

とする。

1. $\lambda$ の最尤推定量 $\hat\lambda$ とそのroot-$n$漸近分散を求めよ。
2. $\hat m=1/\hat\lambda$ のroot-$n$漸近分散を1変量デルタ法で求めよ。
3. $\widehat R(t)=e^{-t\hat\lambda}$ のroot-$n$漸近分散を求めよ。
4. **発展:** $(\hat m,\widehat R(t))$ のroot-$n$漸近分散共分散行列を求めよ。
5. $m$ を母数として直接フィッシャー情報量を計算し、2の結果と一致することを示せ。

<!-- solution-start -->

#### 解答

$$
\hat\lambda=\frac1{\bar X},
\qquad
I_1(\lambda)=\frac1{\lambda^2}
$$

なので

$$
\boxed{\operatorname{AVar}(\hat\lambda)=\lambda^2}.
$$

平均寿命 $m=1/\lambda$ では

$$
\frac{dm}{d\lambda}=-\frac1{\lambda^2}
$$

より

$$
\boxed{\operatorname{AVar}(\hat m)=\frac1{\lambda^2}=m^2}.
$$

また

$$
\frac{dR(t)}{d\lambda}=-tR(t)
$$

なので

$$
\boxed{
\operatorname{AVar}(\widehat R(t))
=t^2R(t)^2\lambda^2
}.
$$

発展として

$$
J_g(\lambda)
=
\begin{pmatrix}
-1/\lambda^2\\
-tR(t)
\end{pmatrix}
$$

を使うと

$$
\boxed{
J_g\lambda^2J_g^\mathsf T
=
\begin{pmatrix}
1/\lambda^2&tR(t)/\lambda\\
tR(t)/\lambda&t^2R(t)^2\lambda^2
\end{pmatrix}
}.
$$

さらに $\lambda=1/m$ だから

$$
\frac{d\lambda}{dm}=-\frac1{m^2}.
$$

再母数化則より

$$
I_1(m)
=I_1(\lambda)\left(\frac{d\lambda}{dm}\right)^2
=\frac1{m^2},
$$

したがって

$$
I_1(m)^{-1}=m^2
$$

で2と一致します。

<!-- solution-end -->

---

## 14. 30分ドリル

### I2-01-DRILL01 故障率から平均寿命・生存確率へ

- Level: C
- 目安時間: 30分
- 主題: 正則な最尤推定量と1変量デルタ法の連結
- 使用技術: 尤度、フィッシャー情報量、デルタ法、標準誤差

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$ とする。$t_0>0$ を固定し

$$
m=1/\lambda,
\qquad
q=e^{-\lambda t_0}
$$

とおく。

1. $\lambda$ の最尤推定量を求めよ。
2. フィッシャー情報量から $\hat\lambda$ のroot-$n$漸近分散を求めよ。
3. $\hat m$ の漸近分布を求めよ。
4. $\hat q=e^{-t_0\hat\lambda}$ の漸近分布を求めよ。
5. $\hat q$ の大標本標準誤差を、未知母数を最尤推定量で置き換えた形で書け。
6. この問題で通常の正則な最尤推定量の理論を使える理由を、一様分布 $U(0,\theta)$ と対比して述べよ。

<!-- solution-start -->

#### 解答

$$
\hat\lambda=1/\bar X,
\qquad
I_1(\lambda)=1/\lambda^2
$$

なので

$$
\sqrt n(\hat\lambda-\lambda)
\Rightarrow N(0,\lambda^2).
$$

$m=1/\lambda$ について

$$
\boxed{
\sqrt n(\hat m-m)
\Rightarrow N(0,1/\lambda^2)
}.
$$

$q=e^{-\lambda t_0}$ では

$$
\frac{dq}{d\lambda}=-t_0q
$$

なので

$$
\boxed{
\sqrt n(\hat q-q)
\Rightarrow N(0,t_0^2q^2\lambda^2)
}.
$$

従って

$$
\boxed{
\widehat{\operatorname{se}}(\hat q)
=\frac{t_0\hat q\hat\lambda}{\sqrt n}
}.
$$

指数分布では支持 $[0,\infty)$ が $\lambda$ に依存せず、真値が内部にあり、対数尤度も滑らかです。一方 $U(0,\theta)$ では支持上端が $\theta$ 自身で動くため、通常の正則な最尤推定量の理論が破れます。

<!-- solution-end -->

---

## 15. 過去問との対応

本章では公式問題文を転載せず、過去問索引で確認できる技能構造を独自問題へ落としています。

- `MATH-2012-Q3`: 指数分布の最尤推定・フィッシャー情報量・デルタ法。本章では C01 と DRILL01 が直接対応する。
- `MATH-2018-Q1`: カイ二乗分布・母標準偏差。分散から標準偏差への1変量変換を A04 で練習する。
- `MATH-2018-Q2`: 超幾何分布の推定量・デルタ法。逆数型などの非線形変換へ1変量デルタ法を適用する技能として接続する。

実過去問を解く際は、公式問題集または公式公開問題を正本とし、第三者解説はテーマ照合・別解確認に限って利用します。

---

## 16. 章末チェック

### 通常ルート

- 漸近正規性を「有限標本で正規分布」と誤解していない。
- root-$n$ 漸近分散 $V$ と $\operatorname{Var}(T_n)\approx V/n$ を区別できる。
- 本章の `AVar` が root-$n$ 漸近分散を表すことを説明できる。
- 最尤推定量のTaylor展開式を自力で作れる。
- スコア側に中心極限定理、二階微分側に確率収束を使う理由を説明できる。
- Slutskyの定理で2つを結合し $I_1^{-1}$ を導ける。
- 観測情報量 $j_n$ と期待フィッシャー情報量 $I_n$ を区別できる。
- 1変量デルタ法をTaylor展開から導ける。
- 導関数を二乗してroot-$n$漸近分散を変換できる。
- 1母数の再母数化後のフィッシャー情報量とデルタ法が整合することを示せる。
- 一様分布の最尤推定量では $n$ 尺度と指数極限が現れることを説明できる。
- 「最尤推定量なら必ず $\sqrt n$ 正規」という誤った一般化をしない。

### 補足・発展

- $g'(\theta)=0$ なら一次デルタ法が退化することを確認できる。
- 多変量デルタ法では $J\Sigma J^\mathsf T$ が現れることを知っている。
- フィッシャー情報行列は1次元フィッシャー情報量の発展的な一般化だと区別できる。

---

## 17. 定義の具体例による確認

<!-- definition-example-start: def-i2-01-asymptotic-distribution, def-i2-01-asymptotic-normality, def-i2-01-asymptotic-variance -->
**定義の確認**

$X_i$ が独立同分布で $E[X_i]=\mu$、$\operatorname{Var}(X_i)=\sigma^2<\infty$ なら

$$
\sqrt n(\bar X-\mu)\xrightarrow{d}N(0,\sigma^2).
$$

したがって $a_n=\sqrt n$、$b_n=\mu$ とした漸近分布は $N(0,\sigma^2)$ であり、$\bar X$ は root-$n$ 漸近正規です。また

$$
\operatorname{AVar}(\bar X)=\sigma^2,
\qquad
\operatorname{Var}(\bar X)=\sigma^2/n.
$$

<!-- definition-example-end -->

<!-- definition-example-start: def-i2-01-observed-information -->
**定義の確認**

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$ では

$$
\ell_n(\lambda)=n\log\lambda-\lambda\sum_iX_i,
\qquad
\ell_n''(\lambda)=-\frac{n}{\lambda^2}.
$$

よって

$$
j_n(\lambda)=-\ell_n''(\lambda)=\frac{n}{\lambda^2}.
$$

このモデルでは二階微分が標本値に依存しないため、期待値を取っても同じ

$$
I_n(\lambda)=n/\lambda^2
$$

となります。
<!-- definition-example-end -->

<!-- definition-example-start: def-i2-01-asymptotic-efficiency -->
**定義の確認**

指数分布の率母数では

$$
I_1(\lambda)=1/\lambda^2
$$

で、最尤推定量 $\hat\lambda=1/\bar X$ は

$$
\sqrt n(\hat\lambda-\lambda)
\xrightarrow{d}N(0,\lambda^2)
=N\!\left(0,I_1(\lambda)^{-1}\right).
$$

したがって本章の定義に照らして $\hat\lambda$ は漸近有効です。ここで言っているのは root-$n$ 極限の分散が情報量逆数に一致することであり、有限標本での $\operatorname{Var}(\hat\lambda)$ が厳密に $\lambda^2/n$ であるという主張ではありません。
<!-- definition-example-end -->
