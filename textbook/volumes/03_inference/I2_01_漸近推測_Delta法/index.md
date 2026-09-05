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

特に正則な最尤推定量については、単に

$$
\hat\theta_{\mathrm{ML}}
\approx
N\!\left(\theta,\frac1{I_n(\theta)}\right)
$$

と暗記するのではなく、なぜこの形になるかを**スコアの中心極限定理・対数尤度の曲率・Taylor展開・Slutskyの定理**から導きます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

関連する正本:

- [I1-01 のスコア関数](../I1_01_尤度_最尤推定/index.md#def-i1-01-score)
- [I1-02 のフィッシャー情報量](../I1_02_推定法と推定量の評価/index.md#def-i1-02-fisher-information)
- [I1-02 のフィッシャー情報量の二階微分表示](../I1_02_推定法と推定量の評価/index.md#prop-i1-02-information-hessian)
- [P4-02 の独立同分布中心極限定理](../../02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/index.md#thm-p4-02-iid-clt)
- P4-02 §5: Slutsky型の定理と連続写像

## この章で解けるようになる問題

- $\sqrt n(T_n-\theta)$ の極限分布から、$T_n$ の大標本でのばらつきを読める。
- 「漸近分散」と有限標本の分散を混同せず、$V(\theta)/n$ の形へ戻せる。
- スコア方程式を真値のまわりでTaylor展開し、正則な最尤推定量の漸近正規性を導出できる。
- 期待フィッシャー情報量と観測情報量を区別し、最尤推定量の標準誤差近似を作れる。
- 1変量デルタ法で、率・オッズ・対数オッズ・標準偏差などの変換後の漸近分散を求められる。
- 多変量デルタ法で勾配・ヤコビ行列から分散共分散行列を変換できる。
- $g'(\theta)=0$ のとき一次デルタ法が退化することを見抜き、必要なら二次項まで展開できる。
- 再母数化後のフィッシャー情報量とデルタ法の漸近分散が一致することを確認できる。
- 一様分布の最大値のような非正則モデルで $\sqrt n$ 正規近似が破れることを説明できる。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 最尤推定量の漸近正規性 | スコア方程式のTaylor展開、スコアの中心極限定理、二階微分の大数の法則、Slutskyの定理 |
| デルタ法 | 1変量、多変量、一次導関数0の場合の二次展開 |
| 漸近分散 | root-$n$ 漸近分散、フィッシャー情報量逆数、変換後の漸近分散 |

## 前提知識チェック

1. I1-01: 尤度、対数尤度、スコア方程式を扱える。
2. I1-02: フィッシャー情報量、正則条件、クラーメル・ラオ下限を扱える。
3. P4-02: 確率収束・分布収束・中心極限定理・Slutskyの定理を使える。
4. 1変数・多変数のTaylor展開、勾配、ヤコビ行列を使える。

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
> **定義（漸近分散）**  
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

### 2.1 漸近分散と有限標本分散は同じではない

$$
\sqrt n(T_n-\theta)\Rightarrow N(0,V)
$$

と書いたとき、$V$ は $T_n$ 自身の有限標本分散ではありません。近似的には

$$
\operatorname{Var}(T_n)\approx\frac Vn
$$

です。

文献によっては $V/n$ を「漸近分散」と呼ぶこともあります。本教材では式の曖昧さを避けるため、必ず中心化・尺度調整した極限式を先に書きます。

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

したがって $\bar X$ の root-$n$ 漸近分散は $\sigma^2$、大標本近似での分散は $\sigma^2/n$ です。

---

## 3. 正則な最尤推定量はなぜ漸近正規になるか

真の母数を $\theta_0$ とし、独立同分布標本の対数尤度を

$$
\ell_n(\theta)=\sum_{i=1}^n\log f(X_i;\theta)
$$

とします。スコアは

$$
U_n(\theta)=\ell_n'(\theta).
$$

最尤推定量 $\hat\theta_n$ が内点にあり、スコア方程式を満たすなら

$$
U_n(\hat\theta_n)=0.
$$

### 3.1 Taylor展開

平均値の定理を用いると、$\theta_0$ と $\hat\theta_n$ の間の点 $\tilde\theta_n$ が存在して

$$
0
=U_n(\hat\theta_n)
=U_n(\theta_0)
+(\hat\theta_n-\theta_0)\ell_n''(\tilde\theta_n)
$$

です。よって

$$
\sqrt n(\hat\theta_n-\theta_0)
=
\left\{-\frac1n\ell_n''(\tilde\theta_n)\right\}^{-1}
\frac{U_n(\theta_0)}{\sqrt n}.
$$

右辺は「スコアの和の確率変動」と「対数尤度の平均曲率」の積に分かれました。

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

### 3.3 曲率側は大数の法則

正則条件下では

$$
-I_1(\theta_0)=E[\ell_1''(\theta_0)].
$$

さらに $\hat\theta_n\xrightarrow{p}\theta_0$ と、近傍で二階微分に対する一様な大数の法則が使える条件を仮定すると

$$
-\frac1n\ell_n''(\tilde\theta_n)
\xrightarrow{p}
I_1(\theta_0).
$$

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
> 真値 $\theta_0$ が母数空間の内点にあり、支持が局所的に母数へ依存せず、対数尤度が十分滑らかで、スコアの中心極限定理と対数尤度二階微分の大数の法則が成り立ち、$0<I_1(\theta_0)<\infty$ とする。さらに内点の最尤推定量 $\hat\theta_n$ が一致的でスコア方程式を満たすとする。このとき

$$
\boxed{
\sqrt n(\hat\theta_n-\theta_0)
\xrightarrow{d}
N\!\left(0,I_1(\theta_0)^{-1}\right)
}
$$

> が成り立つ。
<!-- formal-statement-end -->

独立同分布標本では $I_n(\theta_0)=nI_1(\theta_0)$ なので、大標本では

$$
\boxed{
\hat\theta_n
\approx
N\!\left(\theta_0,I_n(\theta_0)^{-1}\right)
}.
$$

### 3.5 定理の仮定は飾りではない

この定理は「最尤推定量なら何でも正規になる」とは言っていません。境界上の真値、支持が母数に依存するモデル、フィッシャー情報量が有限正でない場合、識別不能、一致性がない極大点を選んだ場合などでは、収束率や極限分布が変わることがあります。

---

## 4. 期待フィッシャー情報量と観測情報量

I1-02 で扱った期待フィッシャー情報量は

$$
I_n(\theta)
=-E_\theta[\ell_n''(\theta)]
$$

でした。一方、実際に観測したデータでの曲率そのものを使う量もあります。

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

たとえば指数分布の率母数 $\lambda$ では

$$
\ell_n''(\lambda)=-\frac n{\lambda^2}
$$

なので $j_n(\lambda)=n/\lambda^2$ です。この例では二階微分がデータに依存しないため、観測情報量と期待フィッシャー情報量が一致します。

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

[正則な1母数最尤推定量の漸近正規性](#thm-i2-01-mle-asymptotic-normality)により、正則な最尤推定量はこの形を持ちます。ただし、「漸近分布がこの分散を持つ」ことと「有限標本の分散が厳密に $I_n^{-1}$ である」ことは別です。

---

## 6. 1変量デルタ法

推定したい量が $\theta$ そのものではなく

$$
\eta=g(\theta)
$$

である場面は多くあります。たとえば、率 $\lambda$ から平均寿命 $1/\lambda$、成功確率 $p$ からオッズ $p/(1-p)$、成功確率 $p$ から対数オッズ $\log\{p/(1-p)\}$、分散 $v$ から標準偏差 $\sqrt v$ への変換です。

### 6.1 Taylor展開から導く

$g$ が $\theta$ で微分可能なら

$$
g(T_n)
=g(\theta)+g'(\theta)(T_n-\theta)+r_n,
$$

ここで $r_n=o_p(|T_n-\theta|)$ です。$T_n-\theta=O_p(n^{-1/2})$ なら

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
> 推定量 $T_n$ が $\sqrt n(T_n-\theta)\xrightarrow{d}N(0,V(\theta))$ を満たし、$g$ が $\theta$ で微分可能とする。このとき

$$
\boxed{
\sqrt n\{g(T_n)-g(\theta)\}
\xrightarrow{d}
N\!\left(0,\{g'(\theta)\}^2V(\theta)\right)
}
$$

> が成り立つ。
<!-- formal-statement-end -->

したがって大標本で

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

1観測あたりのフィッシャー情報量は $I_1(\lambda)=1/\lambda^2$ なので、その逆数と一致します。

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

### 7.3 分散から標準偏差へ

平均 $\mu$ が既知で $X_i\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$ とし

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

$g(v)=\sqrt v$ なら $g'(\sigma^2)=1/(2\sigma)$ なので

$$
\boxed{
\sqrt n(\sqrt{T_n}-\sigma)
\xrightarrow{d}
N\!\left(0,\frac{\sigma^2}{2}\right)
}.
$$

---

## 8. 多変量デルタ法

複数の統計量を同時に変換するときは勾配・ヤコビ行列を使います。

<a id="thm-i2-01-delta-multivariate"></a>

<!-- formal-statement-start -->
> **定理（多変量デルタ法）**  
> $T_n\in\mathbb R^p$、$\theta\in\mathbb R^p$ とし、$\sqrt n(T_n-\theta)\xrightarrow{d}N_p(0,\Sigma)$ とする。$g:\mathbb R^p\to\mathbb R^q$ が $\theta$ で微分可能で、ヤコビ行列を $J_g(\theta)$ とすると

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

### 8.1 標本第1・第2モーメントから分散へ

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

$(M_{1n},M_{2n})$ の漸近分散共分散行列を $\Sigma$ とすれば

$$
\operatorname{AVar}(M_{2n}-M_{1n}^2)
=
(-2\mu,1)\Sigma
\begin{pmatrix}-2\mu\\1\end{pmatrix}.
$$

有限4次モーメントを仮定して整理すると、この値は

$$
\mu_4-\sigma^4,
\qquad
\mu_4=E[(X-\mu)^4]
$$

です。正規分布なら $\mu_4=3\sigma^4$ なので $2\sigma^4$ になります。

---

## 9. 一次導関数が0ならどうするか

1変量デルタ法で $g'(\theta)=0$ なら

$$
\sqrt n\{g(T_n)-g(\theta)\}\xrightarrow{p}0
$$

となり、一次近似は非退化な極限を与えません。この場合は二階Taylor展開を使います。

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

### 9.1 例: 平均0で $\bar X^2$

$X_i\sim N(0,1)$ なら

$$
\sqrt n\bar X\sim N(0,1)
$$

が有限標本でも厳密に成り立ちます。$g(x)=x^2$ は $g'(0)=0$、$g''(0)=2$ なので

$$
\boxed{
n\bar X^2
\xrightarrow{d}
\chi_1^2
}.
$$

「デルタ法を使うといつでも正規極限」という理解は誤りです。

---

## 10. 再母数化とフィッシャー情報量

$\eta=g(\theta)$ が1対1の滑らかな変換で、逆関数を $\theta=h(\eta)$ とします。連鎖律より

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
> 1対1で微分可能な再母数化 $\eta=g(\theta)$ の下で

$$
\boxed{
I_\eta(\eta)
=I_\theta(\theta)
\left(\frac{d\theta}{d\eta}\right)^2
}
$$

> が成り立つ。
<!-- formal-statement-end -->

一方、最尤推定量の不変性により $\hat\eta=g(\hat\theta)$ です。デルタ法から

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
\{g'(\theta)\}^2I_\theta^{-1}=I_\eta^{-1}.
$$

したがって「最尤推定量を変換してデルタ法を使う」方法と「再母数化後のフィッシャー情報量を直接計算する」方法は整合します。

---

## 11. 多母数への拡張

母数がベクトル $\theta\in\mathbb R^p$ の場合、スコアベクトルを

$$
U_n(\theta)=\nabla\ell_n(\theta)
$$

とし、1観測あたりのフィッシャー情報行列を

$$
I_1(\theta)
=E[U_1(\theta)U_1(\theta)^\mathsf T]
$$

とします。1母数と同様に、スコア方程式をベクトルTaylor展開すると、正則条件下で

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

で与えられます。

---

## 12. 非正則例: 一様分布の最尤推定量は $\sqrt n$ 正規ではない

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}U(0,\theta)$ とし、$M_n=X_{(n)}$ とします。尤度は

$$
L(\theta)=\theta^{-n}\mathbf1(M_n\le\theta)
$$

なので、最尤推定量は $\hat\theta=M_n$ です。

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

## 13. よくある誤り

1. **漸近分散 $V$ をそのまま $\operatorname{Var}(T_n)$ と書く。**  
   $\sqrt n(T_n-\theta)\Rightarrow N(0,V)$ なら、$T_n$ の近似分散は $V/n$ です。
2. **最尤推定量なら正則条件を確認しない。**  
   一様分布、境界母数、識別不能なモデルなどでは通常の結論が破れることがあります。
3. **デルタ法で導関数を二乗し忘れる。**  
   1変量では漸近分散が $\{g'(\theta)\}^2V$ になります。
4. **$g'(\theta)=0$ なのに一次デルタ法で非退化な正規分布を出す。**  
   一次項が消えたら尺度を見直し、二次項を確認します。
5. **多変量で $J\Sigma J^\mathsf T$ の順序を崩す。**  
   行列の次元を確認します。
6. **観測情報量と期待フィッシャー情報量を同一視する。**  
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

##### 詳細解答

root-$n$ 漸近分散は $\boxed{9\theta^2}$ です。したがって

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

##### 本番答案

$$
\operatorname{AVar}=9\theta^2,
\quad
\operatorname{Var}(T_n)\approx9\theta^2/n,
\quad
\widehat{\operatorname{se}}=3|T_n|/\sqrt n.
$$

##### 採点基準

- 漸近分散: 6点
- 有限標本分散への読み替え: 7点
- 標準誤差: 7点

<!-- solution-end -->

### I2-01-A02 ベルヌーイ最尤推定量の漸近正規性

- Level: A
- 目安時間: 10分
- 主題: フィッシャー情報量
- 使用技術: 正則な最尤推定量の漸近正規性

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Bernoulli}(p)$、$0<p<1$ とする。$\hat p=\bar X$ について、フィッシャー情報量から漸近分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

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

##### 本番答案

$$
I_1(p)^{-1}=p(1-p)
$$

より

$$
\boxed{\sqrt n(\hat p-p)\Rightarrow N(0,p(1-p))}.
$$

##### 採点基準

- フィッシャー情報量: 7点
- 逆数: 5点
- 漸近分布: 8点

<!-- solution-end -->

### I2-01-A03 指数分布の率母数にデルタ法

- Level: A
- 目安時間: 10分
- 主題: 1変量デルタ法
- 使用技術: 中心極限定理、逆数変換

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$ とする。$\hat\lambda=1/\bar X$ の root-$n$ 漸近分散を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\mu=1/\lambda$ とおくと

$$
\sqrt n(\bar X-\mu)
\Rightarrow N(0,1/\lambda^2).
$$

$g(x)=1/x$ だから $g'(\mu)=-\lambda^2$。よって

$$
\boxed{
\sqrt n(\hat\lambda-\lambda)
\Rightarrow N(0,\lambda^2)
}.
$$

##### 本番答案

$$
g'(1/\lambda)=-\lambda^2
$$

より漸近分散は $\boxed{\lambda^2}$。

##### 採点基準

- $\bar X$ の中心極限定理: 6点
- 導関数: 6点
- デルタ法: 8点

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

##### 詳細解答

$g(v)=\sqrt v$ とすると $g'(\sigma^2)=1/(2\sigma)$ なので

$$
\{g'(\sigma^2)\}^2 2\sigma^4
=\frac{\sigma^2}{2}.
$$

したがって

$$
\boxed{
\sqrt n(S_n-\sigma)
\Rightarrow N\!\left(0,\frac{\sigma^2}{2}\right)
}.
$$

##### 本番答案

$$
\boxed{\sqrt n(S_n-\sigma)\Rightarrow N(0,\sigma^2/2)}.
$$

##### 採点基準

- 変換関数: 4点
- 導関数: 6点
- 分散計算: 5点
- 結論: 5点

<!-- solution-end -->

## Level B

### I2-01-B01 最尤推定量の漸近正規性を4段階で導く

- Level: B
- 目安時間: 20分
- 主題: 最尤推定量の漸近正規性
- 使用技術: Taylor展開、中心極限定理、大数の法則、Slutskyの定理

正則な独立同分布1母数モデルで真値を $\theta_0$、最尤推定量を $\hat\theta_n$ とする。

1. スコア方程式を $\theta_0$ のまわりで展開せよ。
2. $U_n(\theta_0)/\sqrt n$ の極限分布を書け。
3. $-\ell_n''(\tilde\theta_n)/n$ の確率極限を書け。
4. 最終的な漸近分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
0=U_n(\theta_0)+(\hat\theta_n-\theta_0)\ell_n''(\tilde\theta_n)
$$

より

$$
\sqrt n(\hat\theta_n-\theta_0)
=\{-\ell_n''(\tilde\theta_n)/n\}^{-1}
U_n(\theta_0)/\sqrt n.
$$

中心極限定理と大数の法則から

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

##### 本番答案

Taylor展開で

$$
\sqrt n(\hat\theta_n-\theta_0)
=\{-\ell_n''(\tilde\theta_n)/n\}^{-1}U_n(\theta_0)/\sqrt n.
$$

前者は $I_1(\theta_0)^{-1}$ へ確率収束し、後者は $N(0,I_1(\theta_0))$ へ分布収束する。よって

$$
\boxed{\sqrt n(\hat\theta_n-\theta_0)\Rightarrow N(0,I_1^{-1})}.
$$

##### 採点基準

- Taylor展開: 6点
- スコアの中心極限定理: 5点
- 曲率の大数の法則: 5点
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

##### 詳細解答

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

##### 本番答案

$$
\boxed{\operatorname{AVar}(\hat\eta)=1/[p(1-p)]},
\qquad
\boxed{\widehat{\operatorname{se}}=\{n\hat p(1-\hat p)\}^{-1/2}}.
$$

##### 採点基準

- 導関数: 6点
- 漸近分散: 8点
- 標準誤差: 6点

<!-- solution-end -->

### I2-01-B03 多変量デルタ法で分散を作る

- Level: B
- 目安時間: 20分
- 主題: 多変量デルタ法
- 使用技術: 勾配、分散共分散行列

有限4次モーメントを持つ独立同分布標本について

$$
T_n=\begin{pmatrix}M_{1n}\\M_{2n}\end{pmatrix}
=\begin{pmatrix}n^{-1}\sum X_i\\n^{-1}\sum X_i^2\end{pmatrix}
$$

とする。$\mu=E[X]$、$m_2=E[X^2]$ とし

$$
\sqrt n\left(T_n-\begin{pmatrix}\mu\\m_2\end{pmatrix}\right)
\Rightarrow N_2(0,\Sigma)
$$

が成り立つとする。

1. $g(a,b)=b-a^2$ の勾配を求めよ。
2. $S_n^2=M_{2n}-M_{1n}^2$ の漸近分散を $\Sigma$ を使って書け。
3. $\Sigma=\begin{pmatrix}1&2\\2&8\end{pmatrix}$、$\mu=1$ のとき数値を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\nabla g(a,b)=\begin{pmatrix}-2a\\1\end{pmatrix}.
$$

従って

$$
\operatorname{AVar}(S_n^2)
=(-2\mu,1)\Sigma
\begin{pmatrix}-2\mu\\1\end{pmatrix}.
$$

指定値では

$$
\begin{pmatrix}1&2\\2&8\end{pmatrix}
\begin{pmatrix}-2\\1\end{pmatrix}
=
\begin{pmatrix}0\\4\end{pmatrix},
$$

したがって $\boxed4$ です。

##### 本番答案

$$
\boxed{\operatorname{AVar}=(-2\mu,1)\Sigma(-2\mu,1)^\mathsf T}.
$$

指定値では $\boxed4$。

##### 採点基準

- 勾配: 5点
- 多変量デルタ法: 8点
- 行列計算: 7点

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

##### 詳細解答

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

##### 本番答案

$g'(0)=0$ なので一次近似は退化する。尺度を $n$ に変えると

$$
\boxed{n\bar X^2\sim\chi_1^2}.
$$

##### 採点基準

- $g'(0)=0$ の指摘: 6点
- 尺度変更: 6点
- 極限分布: 8点

<!-- solution-end -->

## Level C

### I2-01-C01 指数分布: 最尤推定・フィッシャー情報量・デルタ法を閉じる

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

##### 詳細解答

対数尤度は

$$
\ell_n(\lambda)=n\log\lambda-\lambda\sum_iX_i.
$$

よって

$$
\hat\lambda=\frac1{\bar X}.
$$

二階微分は $\ell_n''(\lambda)=-n/\lambda^2$ なので

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

別に、$E[X]=1/\lambda$、$\operatorname{Var}(X)=1/\lambda^2$ と $g(x)=1/x$ を使えば、中心極限定理とデルタ法から同じ結論を得ます。両者は同じ局所的な尤度曲率を異なる経路で表しているため整合します。

##### 本番答案

$$
\hat\lambda=1/\bar X,
\qquad
I_1(\lambda)=1/\lambda^2,
$$

$$
\boxed{\sqrt n(\hat\lambda-\lambda)\Rightarrow N(0,\lambda^2)}.
$$

$\bar X$ に $g(x)=1/x$ のデルタ法を適用しても同じ漸近分散 $\lambda^2$ を得る。

##### 採点基準

- 最尤推定量: 4点
- フィッシャー情報量: 4点
- 漸近正規性: 4点
- デルタ法による再導出: 6点
- 一致理由: 2点

<!-- solution-end -->

### I2-01-C02 ベルヌーイ分布の確率・オッズ・対数オッズ

- Level: C
- 目安時間: 25分
- 主題: 複数変換のデルタ法
- 使用技術: ベルヌーイ分布、導関数、漸近分散比較

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Bernoulli}(p)$、$0<p<1$ とし $\hat p=\bar X$ とする。

1. $\hat p$ のroot-$n$漸近分散を求めよ。
2. オッズ $r=p/(1-p)$ の推定量 $\hat r=\hat p/(1-\hat p)$ のroot-$n$漸近分散を求めよ。
3. 対数オッズ $\eta=\log r$ の推定量のroot-$n$漸近分散を求めよ。
4. $p\to0$ または $p\to1$ で対数オッズの分散が大きくなる理由を式から説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\operatorname{AVar}(\hat p)=p(1-p).
$$

オッズ $g(p)=p/(1-p)$ では $g'(p)=1/(1-p)^2$ なので

$$
\boxed{\operatorname{AVar}(\hat r)=\frac{p}{(1-p)^3}}.
$$

対数オッズでは $h'(p)=1/[p(1-p)]$ なので

$$
\boxed{\operatorname{AVar}(\hat\eta)=\frac1{p(1-p)}}.
$$

$p$ が0または1へ近づくと $p(1-p)\to0$ なので、その逆数が発散します。

##### 本番答案

$$
\operatorname{AVar}(\hat p)=p(1-p),
$$

$$
\boxed{\operatorname{AVar}(\hat r)=p/(1-p)^3},
\qquad
\boxed{\operatorname{AVar}(\hat\eta)=1/[p(1-p)]}.
$$

##### 採点基準

- $\hat p$: 3点
- オッズ: 6点
- 対数オッズ: 7点
- 端点解釈: 4点

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

##### 詳細解答

$$
L(\theta)=\theta^{-n}\mathbf1(M_n\le\theta)
$$

より $\hat\theta=M_n$ です。また

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

##### 本番答案

$$
\hat\theta=M_n,
\qquad
P\{n(\theta-M_n)>t\}
=\left(1-\frac{t}{n\theta}\right)^n
\to e^{-t/\theta}.
$$

よって

$$
\boxed{n(\theta-M_n)\Rightarrow\mathrm{Exp}(1/\theta)}.
$$

##### 採点基準

- 最尤推定量: 4点
- 生存関数: 7点
- 極限分布: 5点
- 正則条件: 4点

<!-- solution-end -->

### I2-01-C04 2母数正規モデルを $(\mu,\sigma)$ へ変換する

- Level: C
- 目安時間: 25分
- 主題: 多母数最尤推定と多変量デルタ法
- 使用技術: フィッシャー情報行列、ヤコビ行列

$X_i\overset{\mathrm{iid}}{\sim}N(\mu,v)$、$v=\sigma^2>0$ とする。正則な最尤推定量 $\hat\theta=(\hat\mu,\hat v)^\mathsf T$ について

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
2. $(\hat\mu,\hat\sigma)$ の漸近分散共分散行列を求めよ。
3. $\hat\mu$ と $\hat\sigma$ の漸近共分散を答えよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

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
J_g
\begin{pmatrix}
\sigma^2&0\\
0&2\sigma^4
\end{pmatrix}
J_g^\mathsf T
=
\boxed{
\begin{pmatrix}
\sigma^2&0\\
0&\sigma^2/2
\end{pmatrix}
}.
$$

したがって漸近共分散は0です。

##### 本番答案

$$
J_g=\operatorname{diag}(1,1/(2\sigma)),
$$

$$
\boxed{
\sqrt n
\begin{pmatrix}\hat\mu-\mu\\\hat\sigma-\sigma\end{pmatrix}
\Rightarrow
N_2\left(0,
\begin{pmatrix}\sigma^2&0\\0&\sigma^2/2\end{pmatrix}
\right)
}.
$$

##### 採点基準

- ヤコビ行列: 6点
- 行列積: 8点
- 漸近分布: 4点
- 共分散: 2点

<!-- solution-end -->

## Level D

### I2-01-D01 指数寿命モデルを別尺度へ運ぶ

- Level: D
- 目安時間: 40分
- 主題: 最尤推定・再母数化・デルタ法・漸近有効性
- 使用技術: 指数分布、フィッシャー情報量、ヤコビ行列、共分散

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
2. $\hat m=1/\hat\lambda$ のroot-$n$漸近分散をデルタ法で求め、$\hat m$ を標本から直接簡単化せよ。
3. $\widehat R(t)=e^{-t\hat\lambda}$ のroot-$n$漸近分散を求めよ。
4. ベクトル $g(\lambda)=(m,R(t))^\mathsf T$ にデルタ法を適用し、$(\hat m,\widehat R(t))$ のroot-$n$漸近分散共分散行列を求めよ。
5. $m$ を母数として直接フィッシャー情報量を計算し、2の結果と一致することを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

対数尤度

$$
\ell_n=n\log\lambda-\lambda\sum_iX_i
$$

より

$$
\hat\lambda=\frac1{\bar X}.
$$

1観測フィッシャー情報量は $I_1(\lambda)=1/\lambda^2$ なので

$$
\boxed{\operatorname{AVar}(\hat\lambda)=\lambda^2}.
$$

平均寿命 $m=1/\lambda$ では

$$
\frac{dm}{d\lambda}=-\frac1{\lambda^2}.
$$

よって

$$
\boxed{\operatorname{AVar}(\hat m)=1/\lambda^2=m^2},
\qquad
\hat m=\bar X.
$$

また $R(t)=e^{-\lambda t}$ では

$$
\frac{dR(t)}{d\lambda}=-tR(t),
$$

したがって

$$
\boxed{
\operatorname{AVar}(\widehat R(t))
=t^2R(t)^2\lambda^2
}.
$$

ヤコビ行列は

$$
J_g(\lambda)
=
\begin{pmatrix}
-1/\lambda^2\\
-tR(t)
\end{pmatrix}.
$$

入力の漸近分散は $\lambda^2$ なので

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

$m=1/\lambda$、すなわち $\lambda=1/m$ と再母数化すると

$$
\frac{d\lambda}{dm}=-\frac1{m^2}.
$$

再母数化則より

$$
I_1(m)
=I_1(\lambda)\left(\frac{d\lambda}{dm}\right)^2
=m^2\frac1{m^4}
=\frac1{m^2}.
$$

よって $I_1(m)^{-1}=m^2$ となり、デルタ法の結果と一致します。

##### 本番答案

$$
\hat\lambda=1/\bar X,
\quad
\operatorname{AVar}(\hat\lambda)=\lambda^2,
$$

$$
\operatorname{AVar}(\hat m)=m^2,
\quad
\hat m=\bar X,
$$

$$
\operatorname{AVar}(\widehat R(t))=t^2R(t)^2\lambda^2.
$$

また

$$
\operatorname{ACov}
\begin{pmatrix}\hat m\\\widehat R(t)\end{pmatrix}
=
\begin{pmatrix}
1/\lambda^2&tR(t)/\lambda\\
tR(t)/\lambda&t^2R(t)^2\lambda^2
\end{pmatrix}.
$$

再母数化後は $I_1(m)=1/m^2$ なので、その逆数は $m^2$ で一致する。

##### 採点基準

- $\lambda$ の最尤推定量・漸近分散: 4点
- $m$ のデルタ法と簡約: 5点
- $R(t)$ のデルタ法: 4点
- 多変量分散共分散行列: 5点
- 再母数化フィッシャー情報量: 2点

<!-- solution-end -->

## 14. 30分ドリル

### I2-01-DRILL01 故障率から平均寿命・生存確率へ

- Level: C
- 目安時間: 30分
- 主題: 正則な最尤推定量とデルタ法の連結
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

##### 詳細解答

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

$q=e^{-\lambda t_0}$ では $dq/d\lambda=-t_0q$ なので

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

##### 本番答案

$$
\hat\lambda=1/\bar X,
\quad
I_1(\lambda)=1/\lambda^2,
$$

$$
\sqrt n(\hat\lambda-\lambda)\Rightarrow N(0,\lambda^2),
$$

$$
\sqrt n(\hat m-m)\Rightarrow N(0,1/\lambda^2),
$$

$$
\sqrt n(\hat q-q)\Rightarrow N(0,t_0^2q^2\lambda^2).
$$

$$
\widehat{\operatorname{se}}(\hat q)
=t_0\hat q\hat\lambda/\sqrt n.
$$

##### 採点基準

- 最尤推定量: 3点
- フィッシャー情報量と漸近分布: 4点
- 平均寿命のデルタ法: 4点
- 生存確率のデルタ法: 4点
- 標準誤差: 3点
- 正則性の比較: 2点

<!-- solution-end -->

## 15. 過去問との対応

本章では公式問題文を転載せず、過去問索引で確認できる技能構造を独自問題へ落としています。

- `MATH-2012-Q3`: 指数分布の最尤推定・フィッシャー情報量・デルタ法。本章では C01 と DRILL01 が直接対応する。
- `MATH-2018-Q1`: カイ二乗分布・母標準偏差。分散から標準偏差への非線形変換を A04 と C04 で練習する。
- `MATH-2018-Q2`: 超幾何分布の推定量・デルタ法。逆数型などの非線形変換へデルタ法を適用する技能として接続する。

実過去問を解く際は、公式問題集または公式公開問題を正本とし、第三者解説はテーマ照合・別解確認に限って利用します。

## 16. 章末チェック

- 漸近正規性を「有限標本で正規分布」と誤解していない。
- root-$n$ 漸近分散 $V$ と $\operatorname{Var}(T_n)\approx V/n$ を区別できる。
- 最尤推定量のTaylor展開式を自力で作れる。
- スコア側に中心極限定理、曲率側に大数の法則を使う理由を説明できる。
- Slutskyの定理で2つを結合し $I_1^{-1}$ を導ける。
- 観測情報量 $j_n$ と期待フィッシャー情報量 $I_n$ を区別できる。
- 1変量デルタ法をTaylor展開から導ける。
- 導関数を二乗して漸近分散を変換できる。
- 多変量では $J\Sigma J^\mathsf T$ を使える。
- $g'(\theta)=0$ なら一次デルタ法が退化することを確認できる。
- 再母数化後のフィッシャー情報量とデルタ法が整合することを示せる。
- 一様分布の最尤推定量では $n$ 尺度と指数極限が現れることを説明できる。
- 「最尤推定量なら必ず $\sqrt n$ 正規」という誤った一般化をしない。
