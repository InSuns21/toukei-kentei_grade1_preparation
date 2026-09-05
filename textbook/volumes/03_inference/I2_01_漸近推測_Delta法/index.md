# I2-01 漸近推測・Delta法

I1-02 では、不偏性・一致性・分散・Fisher情報量を使って推定量を評価しました。本章ではさらに一歩進み、標本サイズ $n$ が大きいときに**推定誤差そのものがどのような分布になるか**を扱います。

中心となる流れは

$$
\boxed{
\text{推定量の一致性}
\;\longrightarrow\;
\text{誤差を }\sqrt n\text{ 倍する}
\;\longrightarrow\;
\text{極限分布を求める}
\;\longrightarrow\;
\text{滑らかな変換へDelta法で伝える}
}
$$

です。

特に正則な最尤推定量については、単に

$$
\hat\theta_{\mathrm{ML}}\approx N\!\left(\theta,\frac1{I_n(\theta)}\right)
$$

と暗記するのではなく、なぜこの形になるかを**スコアの中心極限定理・対数尤度の曲率・Taylor展開・Slutskyの定理**から導きます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

関連する正本:

- [I1-01 のスコア関数](../I1_01_尤度_最尤推定/index.md#def-i1-01-score)
- [I1-02 のFisher情報量](../I1_02_推定法と推定量の評価/index.md#def-i1-02-fisher-information)
- [I1-02 のFisher情報量の二階微分表示](../I1_02_推定法と推定量の評価/index.md#prop-i1-02-information-hessian)
- [P4-02 の独立同分布中心極限定理](../../02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/index.md#thm-p4-02-iid-clt)
- P4-02 §5: Slutsky型の定理と連続写像

## この章で解けるようになる問題

- $\sqrt n(T_n-\theta)$ の極限分布から、$T_n$ の大標本でのばらつきを読める。
- 「漸近分散」と有限標本の分散を混同せず、$V(\theta)/n$ の形へ戻せる。
- スコア方程式を真値のまわりでTaylor展開し、正則な最尤推定量の漸近正規性を導出できる。
- 期待Fisher情報量と観測情報量を区別し、最尤推定量の標準誤差近似を作れる。
- 1変量Delta法を使い、率・オッズ・対数オッズ・標準偏差などの変換後の漸近分散を求められる。
- 多変量Delta法で勾配・Jacobianから共分散行列を変換できる。
- $g'(\theta)=0$ のとき一次Delta法が退化することを見抜き、必要なら二次項まで展開できる。
- 再母数化後のFisher情報量とDelta法の漸近分散が一致することを確認できる。
- 一様分布の最大値のような非正則モデルで $\sqrt n$ 正規近似が破れることを説明できる。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 最尤推定量の漸近正規性 | スコア方程式のTaylor展開、スコアのCLT、HessianのLLN、Slutsky |
| デルタ法 | 1変量、多変量、一次導関数0の場合の二次展開 |
| 漸近分散 | root-$n$ 漸近分散、Fisher情報量逆数、変換後の漸近分散 |

## 前提知識チェック

1. I1-01: 尤度、対数尤度、スコア方程式を扱える。
2. I1-02: Fisher情報量、正則条件、Cramér--Rao下限を扱える。
3. P4-02: 確率収束・分布収束・中心極限定理・Slutskyの定理を使える。
4. 1変数・多変数のTaylor展開、勾配、Jacobianを使える。

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

を観察すると、0へ潰れずに非退化な極限分布が現れます。

<a id="def-i2-01-asymptotic-distribution"></a>

<!-- formal-statement-start -->
> **定義（漸近分布）**  
> 推定量列 $T_n$ に対し、定数列 $a_n>0$、中心化項 $b_n$ を選んだとき

$$
a_n(T_n-b_n)\xrightarrow{d}Z
$$

> となる非退化な確率変数 $Z$ の分布を、その中心化・尺度の下での漸近分布という。
<!-- formal-statement-end -->

本章では最も重要な $a_n=\sqrt n$ の場合を中心に扱います。

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

したがって、大標本では形式的に

$$
T_n
\approx
N\!\left(\theta,\frac{V(\theta)}n\right)
$$

と読みます。

### 2.1 「漸近分散」と $\operatorname{Var}(T_n)$ は同じではない

ここは頻出の混乱点です。

$$
\sqrt n(T_n-\theta)\Rightarrow N(0,V)
$$

と書いたとき、$V$ は $T_n$ 自身の有限標本分散ではありません。近似的には

$$
\operatorname{Var}(T_n)\approx\frac Vn
$$

です。

文献によっては $V/n$ を「漸近分散」と呼ぶこともあります。本教材では式の曖昧さを避けるため、必ず

$$
\sqrt n(T_n-\theta)\Rightarrow N(0,V)
$$

の形を先に書き、どちらの量を指しているか明示します。

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

ここから真値 $\theta_0$ のまわりで展開します。

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

右辺は

1. スコアの和の確率変動
2. 対数尤度の平均曲率

の積に分かれました。

### 3.2 スコア側は中心極限定理

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

### 3.3 曲率側は大数則

正則条件下では

$$
-I_1(\theta_0)
=E[\ell_1''(\theta_0)].
$$

さらに $\hat\theta_n\xrightarrow{p}\theta_0$ と、近傍で二階微分に対する一様な大数則が使える条件を仮定すると

$$
-\frac1n\ell_n''(\tilde\theta_n)
\xrightarrow{p}
I_1(\theta_0).
$$

### 3.4 Slutskyで結合する

以上を掛け合わせると

$$
\sqrt n(\hat\theta_n-\theta_0)
\xrightarrow{d}
N\!\left(0,\frac1{I_1(\theta_0)}\right).
$$

<a id="thm-i2-01-mle-asymptotic-normality"></a>

<!-- formal-statement-start -->
> **定理（正則な1母数最尤推定量の漸近正規性）**  
> 真値 $\theta_0$ が母数空間の内点にあり、支持が局所的に母数へ依存せず、対数尤度が十分滑らかで、スコアの中心極限定理と対数尤度二階微分の大数則が成り立ち、$0<I_1(\theta_0)<\infty$ とする。さらに内点の最尤推定量 $\hat\theta_n$ が一致的でスコア方程式を満たすとする。このとき

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
}
$$

と書けます。

### 3.5 定理の仮定は飾りではない

この定理は「最尤推定量なら何でも正規になる」とは言っていません。

- 境界上の真値
- 支持が母数に依存するモデル
- Fisher情報量が有限正でない場合
- 識別不能
- 一致性がない極大点を選んだ場合

などでは、収束率や極限分布が変わることがあります。後で $U(0,\theta)$ を使って具体的に確認します。

---

## 4. 期待Fisher情報量と観測情報量

I1-02 で扱った期待Fisher情報量は

$$
I_n(\theta)
=-E_\theta[\ell_n''(\theta)]
$$

でした。

一方、実際に観測したデータでの曲率そのものを使う量もあります。

<a id="def-i2-01-observed-information"></a>

<!-- formal-statement-start -->
> **定義（観測情報量）**  
> 1母数モデルで

$$
\boxed{
j_n(\theta)=-\ell_n''(\theta)
}
$$

> を観測情報量という。
<!-- formal-statement-end -->

大標本では、正則条件下で $j_n(\hat\theta_n)$ と $I_n(\hat\theta_n)$ は同じ一次の尺度 $n$ を持ちます。そのため最尤推定量の標準誤差は

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

と近似します。

これは次章 I2-02 の区間推定、I3-02 のWald型検定へ直結します。

---

## 5. 漸近有効性

I1-02 では有限標本でCramér--Rao下限を達成する有効推定量を扱いました。漸近論では、有限標本で厳密に下限を達成しなくても、$n$ を大きくしたときに効率限界へ近づく推定量を考えます。

<a id="def-i2-01-asymptotic-efficiency"></a>

<!-- formal-statement-start -->
> **定義（本章での漸近有効性）**  
> 正則な1母数独立同分布モデルで、推定量 $T_n$ が

$$
\sqrt n(T_n-\theta)
\xrightarrow{d}
N\!\left(0,I_1(\theta)^{-1}\right)
$$

> を満たすとき、本章では $T_n$ がFisher情報量に基づく漸近効率限界を達成するといい、漸近有効と呼ぶ。
<!-- formal-statement-end -->

正則な最尤推定量は上の定理によりこの形を持ちます。

ただし、「漸近分布がこの分散を持つ」ことと「有限標本の分散が厳密に $I_n^{-1}$ である」ことは別です。

---

## 6. 1変量Delta法

推定したい量が $\theta$ そのものではなく

$$
\eta=g(\theta)
$$

である場面は非常に多くあります。たとえば

- 率 $\lambda$ から平均寿命 $1/\lambda$
- 成功確率 $p$ からオッズ $p/(1-p)$
- 成功確率 $p$ から対数オッズ $\log\{p/(1-p)\}$
- 分散 $v$ から標準偏差 $\sqrt v$

です。

$T_n$ の極限分布が分かっていれば、$g(T_n)$ の極限分布を毎回ゼロから求める必要はありません。

### 6.1 Taylor展開から導く

$g$ が $\theta$ で微分可能なら

$$
g(T_n)
=g(\theta)+g'(\theta)(T_n-\theta)+r_n,
$$

ここで $r_n=o_p(|T_n-\theta|)$ です。

$T_n-\theta=O_p(n^{-1/2})$ なら

$$
\sqrt n\,r_n=o_p(1).
$$

したがって

$$
\sqrt n\{g(T_n)-g(\theta)\}
=
g'(\theta)\sqrt n(T_n-\theta)+o_p(1).
$$

Slutskyの定理により次を得ます。

<a id="thm-i2-01-delta-scalar"></a>

<!-- formal-statement-start -->
> **定理（1変量Delta法）**  
> 
> $$
> \sqrt n(T_n-\theta)\xrightarrow{d}N(0,V(\theta))
> $$
> 
> とし、$g$ が $\theta$ で微分可能とする。このとき

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

実際には未知の $\theta$ を $T_n$ で置き換えて標準誤差を推定することが多くあります。

---

## 7. Delta法の基本例

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

だからDelta法より

$$
\sqrt n(\hat\lambda-\lambda)
\xrightarrow{d}
N(0,\lambda^2).
$$

したがって

$$
\boxed{
\operatorname{Var}(\hat\lambda)\approx\frac{\lambda^2}{n}
}.
$$

1観測あたりのFisher情報量は $I_1(\lambda)=1/\lambda^2$ なので

$$
I_1(\lambda)^{-1}=\lambda^2
$$

と完全に一致します。

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

を考えると

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

大標本での標準誤差は

$$
\operatorname{se}\{g(\hat p)\}
\approx
\sqrt{\frac1{np(1-p)}}
$$

で、実際には $p$ を $\hat p$ で置き換えます。

### 7.3 分散から標準偏差へ

平均 $\mu$ が既知で

$$
X_i\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)
$$

とします。

$$
T_n=\frac1n\sum_{i=1}^n(X_i-\mu)^2
$$

なら

$$
E[(X_i-\mu)^2]=\sigma^2,
\qquad
\operatorname{Var}((X_i-\mu)^2)=2\sigma^4.
$$

中心極限定理より

$$
\sqrt n(T_n-\sigma^2)
\xrightarrow{d}N(0,2\sigma^4).
$$

$g(v)=\sqrt v$ とすると

$$
g'(\sigma^2)=\frac1{2\sigma}.
$$

よって

$$
\boxed{
\sqrt n(\sqrt{T_n}-\sigma)
\xrightarrow{d}
N\!\left(0,\frac{\sigma^2}{2}\right)
}.
$$

---

## 8. 多変量Delta法

複数の統計量を同時に変換するときは勾配・Jacobianを使います。

<a id="thm-i2-01-delta-multivariate"></a>

<!-- formal-statement-start -->
> **定理（多変量Delta法）**  
> $T_n\in\mathbb R^p$、$\theta\in\mathbb R^p$ とし

$$
\sqrt n(T_n-\theta)
\xrightarrow{d}
N_p(0,\Sigma)
$$

> とする。$g:\mathbb R^p\to\mathbb R^q$ が $\theta$ で微分可能で、Jacobianを $J_g(\theta)$ とすると

$$
\boxed{
\sqrt n\{g(T_n)-g(\theta)\}
\xrightarrow{d}
N_q\!\left(0,J_g(\theta)\Sigma J_g(\theta)^\mathsf T\right)
}
$$

> が成り立つ。
<!-- formal-statement-end -->

$q=1$ ならJacobianは勾配の転置なので

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

とし

$$
\theta=(\mu,m_2)^\mathsf T,
\qquad
m_2=E[X^2]
$$

を考えます。

母分散は

$$
\sigma^2=g(\mu,m_2)=m_2-\mu^2.
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

したがって $(M_{1n},M_{2n})$ の漸近共分散行列 $\Sigma$ が分かれば

$$
\operatorname{AVar}(M_{2n}-M_{1n}^2)
=
(-2\mu,1)\Sigma
\begin{pmatrix}
-2\mu\\1
\end{pmatrix}
$$

と機械的に計算できます。

有限4次モーメントを仮定して整理すると、この値は

$$
\mu_4-\sigma^4
$$

となります。ここで

$$
\mu_4=E[(X-\mu)^4]
$$

です。正規分布なら $\mu_4=3\sigma^4$ なので漸近分散は $2\sigma^4$ です。

---

## 9. 一次導関数が0ならどうするか

1変量Delta法で $g'(\theta)=0$ なら

$$
\sqrt n\{g(T_n)-g(\theta)\}\xrightarrow{p}0
$$

となり、一次近似は非退化な極限を与えません。

この場合は二階Taylor展開

$$
g(T_n)
=g(\theta)
+\frac12g''(\theta)(T_n-\theta)^2
+o_p((T_n-\theta)^2)
$$

を使います。

<a id="prop-i2-01-second-order-delta"></a>

<!-- formal-statement-start -->
> **命題（二次Delta法の基本形）**  
> 
> $$
> \sqrt n(T_n-\theta)\xrightarrow{d}Z,
> $$
> 
> $g'(\theta)=0$、$g$ が $\theta$ で二階微分可能とする。このとき適切な剰余条件の下で

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

が有限標本でも厳密に成り立ちます。

$g(x)=x^2$ は $g'(0)=0$、$g''(0)=2$ なので

$$
n\bar X^2
\xrightarrow{d}
Z^2
\sim\chi_1^2.
$$

つまり「Delta法を使うといつでも正規極限」という理解は誤りです。

---

## 10. 再母数化とFisher情報量

$\eta=g(\theta)$ が1対1の滑らかな変換で、逆関数を $\theta=h(\eta)$ とします。

連鎖律より

$$
U_\eta
=
\frac{\partial\ell}{\partial\eta}
=
\frac{\partial\ell}{\partial\theta}
\frac{d\theta}{d\eta}
=
U_\theta\frac{d\theta}{d\eta}.
$$

したがって

<a id="prop-i2-01-fisher-reparameterization"></a>

<!-- formal-statement-start -->
> **命題（Fisher情報量の再母数化則）**  
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

一方、最尤推定量の不変性により

$$
\hat\eta=g(\hat\theta).
$$

$\hat\theta$ が正則MLEならDelta法から

$$
\operatorname{AVar}(\hat\eta)
=
\{g'(\theta)\}^2I_\theta(\theta)^{-1}.
$$

逆関数の微分

$$
\frac{d\theta}{d\eta}=rac1{g'(\theta)}
$$

を使うと

$$
\{g'(\theta)\}^2I_\theta^{-1}
=I_\eta^{-1}.
$$

したがって「MLEを変換してDelta法を使う」方法と「再母数化後のFisher情報量を直接計算する」方法は整合します。

---

## 11. 多母数MLEの漸近正規性

母数がベクトル $\theta\in\mathbb R^p$ の場合、スコアベクトルを

$$
U_n(\theta)=\nabla\ell_n(\theta)
$$

とし、1観測あたりのFisher情報行列を

$$
I_1(\theta)
=E[U_1(\theta)U_1(\theta)^\mathsf T]
$$

とします。

1母数と同様に、スコア方程式をベクトルTaylor展開すると、正則条件下で

$$
\boxed{
\sqrt n(\hat\theta_n-\theta_0)
\xrightarrow{d}
N_p\!\left(0,I_1(\theta_0)^{-1}\right)
}
$$

となります。

ここで $I_1^{-1}$ は成分ごとの逆数ではなく**行列の逆行列**です。

この形と多変量Delta法を組み合わせれば、$g(\theta)$ がスカラーでもベクトルでも

$$
J_g(\theta_0)
I_1(\theta_0)^{-1}
J_g(\theta_0)^\mathsf T
$$

で変換後の漸近共分散を得られます。

---

## 12. 非正則例: 一様分布のMLEは $\sqrt n$ 正規ではない

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}U(0,\theta)$ とし

$$
M_n=X_{(n)}
$$

とします。I1-01 で見たように最尤推定量は

$$
\hat\theta_{\mathrm{ML}}=M_n.
$$

ここでは支持 $[0,\theta]$ が母数に依存するため、正則MLEの漸近正規性定理の仮定が破れています。

$t\ge0$ を固定すると

$$
\begin{aligned}
P\{n(\theta-M_n)>t\}
&=P\left(M_n<\theta-\frac tn\right)\\
&=\left(1-\frac{t}{n\theta}\right)^n
\end{aligned}
$$

であり、$n\to\infty$ で

$$
\left(1-\frac{t}{n\theta}\right)^n
\to e^{-t/\theta}.
$$

<a id="prop-i2-01-uniform-n-rate"></a>

<!-- formal-statement-start -->
> **命題（一様分布MLEの非正規極限）**  
> $X_i\overset{\mathrm{iid}}{\sim}U(0,\theta)$、$M_n=X_{(n)}$ とすると

$$
\boxed{
n(\theta-M_n)
\xrightarrow{d}
\mathrm{Exp}(1/\theta)
}
$$

> である。ここで $\mathrm{Exp}(1/\theta)$ は率 $1/\theta$ の指数分布を表す。
<!-- formal-statement-end -->

この例では誤差は $1/\sqrt n$ ではなく $1/n$ の尺度です。しかも極限分布は正規分布ではありません。

したがって

$$
\boxed{\text{MLEだから }\sqrt n\text{ 正規、ではない}}
$$

ということが分かります。

---

## 13. よくある誤り

### 誤り1: 漸近分散 $V$ をそのまま $\operatorname{Var}(T_n)$ と書く

$$
\sqrt n(T_n-\theta)\Rightarrow N(0,V)
$$

なら、$T_n$ の近似分散は $V/n$ です。

### 誤り2: 最尤推定量なら正則条件を確認しない

一様分布、境界母数、混合モデルなどでは通常の結論が破れることがあります。

### 誤り3: Delta法で導関数を二乗し忘れる

分散は

$$
\{g'(\theta)\}^2V
$$

です。

### 誤り4: $g'(\theta)=0$ なのに一次Delta法で非退化な正規分布を出す

一次項が消えたら尺度が変わります。二次項を確認します。

### 誤り5: 多変量で $J\Sigma J^\mathsf T$ の順序を崩す

次元を確認します。

### 誤り6: 観測情報量と期待Fisher情報量を同一視する

有限標本では

$$
j_n(\theta)=-\ell_n''(\theta)
$$

はデータに依存し、$I_n(\theta)$ はその期待的な情報量です。

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

極限分布に現れる分散が root-$n$ 漸近分散なので

$$
\boxed{9\theta^2}.
$$

したがって

$$
\operatorname{Var}(T_n)\approx\frac{9\theta^2}{n}.
$$

標準誤差は

$$
\operatorname{se}(T_n)\approx\frac{3|\theta|}{\sqrt n}.
$$

plug-in すると

$$
\boxed{\widehat{\operatorname{se}}(T_n)=\frac{3|T_n|}{\sqrt n}}.
$$

##### 本番答案

$$
\operatorname{AVar}=9\theta^2,
\qquad
\operatorname{Var}(T_n)\approx9\theta^2/n,
\qquad
\widehat{\operatorname{se}}=3|T_n|/\sqrt n.
$$

##### 採点基準

- 漸近分散: 6点
- 有限標本分散への読み替え: 7点
- plug-in標準誤差: 7点

<!-- solution-end -->

### I2-01-A02 ベルヌーイMLEの漸近正規性

- Level: A
- 目安時間: 10分
- 主題: Fisher情報量
- 使用技術: 正則MLEの公式

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Bernoulli}(p)$、$0<p<1$ とする。$\hat p=\bar X$ について、Fisher情報量から漸近分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1観測あたり

$$
I_1(p)=\frac1{p(1-p)}.
$$

したがって正則MLEの漸近正規性より

$$
\boxed{
\sqrt n(\hat p-p)
\xrightarrow{d}N(0,p(1-p))
}.
$$

従って大標本では

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

- Fisher情報量: 7点
- 逆数: 5点
- 漸近分布: 8点

<!-- solution-end -->

### I2-01-A03 指数分布の率母数にDelta法

- Level: A
- 目安時間: 10分
- 主題: 1変量Delta法
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

$g(x)=1/x$ だから

$$
g'(\mu)=-1/\mu^2=-\lambda^2.
$$

よって

$$
\operatorname{AVar}(\hat\lambda)
=\lambda^4\frac1{\lambda^2}
=\boxed{\lambda^2}.
$$

##### 本番答案

$$
g'(1/\lambda)=-\lambda^2
$$

よりDelta法から

$$
\boxed{\sqrt n(\hat\lambda-\lambda)\Rightarrow N(0,\lambda^2)}.
$$

##### 採点基準

- $\bar X$ のCLT: 6点
- 導関数: 6点
- Delta法: 8点

<!-- solution-end -->

### I2-01-A04 分散から標準偏差へ

- Level: A
- 目安時間: 10分
- 主題: Delta法
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

$g(v)=\sqrt v$ とすると

$$
g'(\sigma^2)=\frac1{2\sigma}.
$$

よって

$$
\{g'(\sigma^2)\}^2 2\sigma^4
=\frac1{4\sigma^2}2\sigma^4
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
g'(\sigma^2)=1/(2\sigma)
$$

より

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

### I2-01-B01 MLE漸近正規性の4段階

- Level: B
- 目安時間: 20分
- 主題: MLEの漸近正規性
- 使用技術: Taylor展開、CLT、LLN、Slutsky

正則な独立同分布1母数モデルで真値を $\theta_0$、MLEを $\hat\theta_n$ とする。次を示せ。

1. スコア方程式を $\theta_0$ のまわりで展開し、
   $$
   \sqrt n(\hat\theta_n-\theta_0)
   =\left\{-n^{-1}\ell_n''(\tilde\theta_n)\right\}^{-1}
   \frac{U_n(\theta_0)}{\sqrt n}
   $$
   を導け。
2. 右辺の分子の極限分布を書け。
3. 右辺の曲率項の確率極限を書け。
4. 最終的な漸近分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

スコア方程式 $U_n(\hat\theta_n)=0$ に平均値の定理を用いると

$$
0=U_n(\theta_0)+(\hat\theta_n-\theta_0)\ell_n''(\tilde\theta_n).
$$

移項して $\sqrt n$ を掛ければ指定式を得ます。

正則条件下で1観測スコアは平均0、分散 $I_1(\theta_0)$ なので

$$
\frac{U_n(\theta_0)}{\sqrt n}
\Rightarrow N(0,I_1(\theta_0)).
$$

また一致性と大数則により

$$
-\frac1n\ell_n''(\tilde\theta_n)
\xrightarrow{p}I_1(\theta_0).
$$

Slutskyより

$$
\boxed{
\sqrt n(\hat\theta_n-\theta_0)
\Rightarrow
N\!\left(0,I_1(\theta_0)^{-1}\right)
}.
$$

##### 本番答案

$$
0=U_n(\theta_0)+(\hat\theta_n-\theta_0)\ell_n''(\tilde\theta_n)
$$

より

$$
\sqrt n(\hat\theta_n-\theta_0)
=\{-\ell_n''(\tilde\theta_n)/n\}^{-1}U_n(\theta_0)/\sqrt n.
$$

CLT と LLN からそれぞれ

$$
U_n/\sqrt n\Rightarrow N(0,I_1),
\qquad
-\ell_n''/n\to_p I_1.
$$

従って Slutsky より

$$
\boxed{\sqrt n(\hat\theta_n-\theta_0)\Rightarrow N(0,I_1^{-1})}.
$$

##### 採点基準

- Taylor展開: 6点
- スコアCLT: 5点
- 曲率LLN: 5点
- Slutskyと結論: 4点

<!-- solution-end -->

### I2-01-B02 ベルヌーイの対数オッズ

- Level: B
- 目安時間: 15分
- 主題: Delta法
- 使用技術: logit変換、plug-in標準誤差

$X_i\sim\mathrm{Bernoulli}(p)$、$0<p<1$ とし、$\hat p=\bar X$ とする。

$$
\eta=\log\frac p{1-p},
\qquad
\hat\eta=\log\frac{\hat p}{1-\hat p}
$$

について、

1. $\hat\eta$ のroot-$n$漸近分散を求めよ。
2. 大標本での標準誤差のplug-in推定量を書け。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\sqrt n(\hat p-p)\Rightarrow N(0,p(1-p)).
$$

$g(p)=\log p-\log(1-p)$ なので

$$
g'(p)=\frac1p+\frac1{1-p}
=\frac1{p(1-p)}.
$$

従って

$$
\operatorname{AVar}(\hat\eta)
=\frac1{p^2(1-p)^2}p(1-p)
=\boxed{\frac1{p(1-p)}}.
$$

したがって

$$
\operatorname{se}(\hat\eta)
\approx\sqrt{\frac1{np(1-p)}}.
$$

plug-in すると

$$
\boxed{
\widehat{\operatorname{se}}(\hat\eta)
=\sqrt{\frac1{n\hat p(1-\hat p)}}
}.
$$

##### 本番答案

$$
g'(p)=1/[p(1-p)]
$$

より

$$
\boxed{\operatorname{AVar}(\hat\eta)=1/[p(1-p)]},
$$

$$
\boxed{\widehat{\operatorname{se}}=\{n\hat p(1-\hat p)\}^{-1/2}}.
$$

##### 採点基準

- 導関数: 6点
- 漸近分散: 8点
- 標準誤差: 6点

<!-- solution-end -->

### I2-01-B03 多変量Delta法で分散を作る

- Level: B
- 目安時間: 20分
- 主題: 多変量Delta法
- 使用技術: 勾配、共分散行列

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

数値例では $\mu=1$ なので

$$
(-2,1)
\begin{pmatrix}1&2\\2&8\end{pmatrix}
\begin{pmatrix}-2\\1\end{pmatrix}.
$$

まず

$$
\begin{pmatrix}1&2\\2&8\end{pmatrix}
\begin{pmatrix}-2\\1\end{pmatrix}
=
\begin{pmatrix}0\\4\end{pmatrix}
$$

だから

$$
\boxed{4}.
$$

##### 本番答案

$$
\nabla g=(-2\mu,1)^\mathsf T,
$$

$$
\boxed{\operatorname{AVar}=(-2\mu,1)\Sigma(-2\mu,1)^\mathsf T}.
$$

指定値では $\boxed{4}$。

##### 採点基準

- 勾配: 5点
- 多変量Delta法: 8点
- 行列計算: 7点

<!-- solution-end -->

### I2-01-B04 一次Delta法が退化する例

- Level: B
- 目安時間: 15分
- 主題: 二次Delta法
- 使用技術: Taylor展開、カイ二乗分布

$X_i\overset{\mathrm{iid}}{\sim}N(0,1)$ とし、$T_n=\bar X^2$ とする。

1. $g(x)=x^2$ に一次Delta法を適用すると何が起こるか説明せよ。
2. $nT_n$ の極限分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$g'(0)=0$ なので一次Delta法は

$$
\sqrt n\bar X^2\to_p0
$$

という退化した結論しか与えません。

一方

$$
\sqrt n\bar X\sim N(0,1)
$$

なので

$$
n\bar X^2=(\sqrt n\bar X)^2\sim\chi_1^2
$$

が有限標本でも成り立ちます。したがって

$$
\boxed{nT_n\Rightarrow\chi_1^2}.
$$

##### 本番答案

$g'(0)=0$ なので一次Delta法は退化する。$\sqrt n\bar X\sim N(0,1)$ より

$$
\boxed{n\bar X^2=(\sqrt n\bar X)^2\sim\chi_1^2}.
$$

##### 採点基準

- $g'(0)=0$ の指摘: 6点
- 尺度を $n$ に変える判断: 6点
- 極限分布: 8点

<!-- solution-end -->

## Level C

### I2-01-C01 指数分布: MLE・Fisher情報量・Delta法を閉じる

- Level: C
- 目安時間: 25分
- 主題: 最尤推定量の漸近正規性
- 使用技術: 尤度、Fisher情報量、中心極限定理、Delta法

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$ を率母数表示で考える。

1. $\lambda$ のMLEを求めよ。
2. 1観測あたりのFisher情報量を求めよ。
3. 正則MLEの定理から $\hat\lambda$ の漸近分布を求めよ。
4. 一方、$\bar X$ の中心極限定理とDelta法から同じ漸近分布を導け。
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
U_n(\lambda)=\frac n\lambda-\sum_iX_i=0
$$

から

$$
\hat\lambda=\frac1{\bar X}.
$$

二階微分は

$$
\ell_n''(\lambda)=-\frac n{\lambda^2},
$$

したがって

$$
I_1(\lambda)=\frac1{\lambda^2}.
$$

正則MLE定理より

$$
\boxed{
\sqrt n(\hat\lambda-\lambda)
\Rightarrow N(0,\lambda^2)
}.
$$

別解として

$$
E[X]=1/\lambda,
\quad
\operatorname{Var}(X)=1/\lambda^2
$$

より

$$
\sqrt n(\bar X-1/\lambda)
\Rightarrow N(0,1/\lambda^2).
$$

$g(x)=1/x$、$g'(1/\lambda)=-\lambda^2$ なのでDelta法から同じく漸近分散 $\lambda^2$ を得ます。

MLEが $\hat\lambda=g(\bar X)$ という滑らかな変換で表され、正則MLEの効率限界 $I_1^{-1}$ とDelta法の線形化が同じ局所曲率を捉えているため整合します。

##### 本番答案

$$
\hat\lambda=1/\bar X,
\qquad
I_1(\lambda)=1/\lambda^2.
$$

従って正則MLE定理から

$$
\sqrt n(\hat\lambda-\lambda)\Rightarrow N(0,\lambda^2).
$$

また $\bar X$ のCLTと $g(x)=1/x$ のDelta法でも $g'(1/\lambda)^2/\lambda^2=\lambda^2$。両者は一致する。

##### 採点基準

- MLE: 4点
- Fisher情報量: 4点
- MLE漸近正規性: 4点
- Delta法による再導出: 6点
- 一致理由: 2点

<!-- solution-end -->

### I2-01-C02 ベルヌーイの確率・オッズ・対数オッズ

- Level: C
- 目安時間: 25分
- 主題: 複数変換のDelta法
- 使用技術: Bernoulli、導関数、漸近分散比較

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Bernoulli}(p)$、$0<p<1$ とし $\hat p=\bar X$ とする。

1. $\hat p$ のroot-$n$漸近分散を求めよ。
2. オッズ
   $$
   r=\frac p{1-p}
   $$
   の推定量 $\hat r=\hat p/(1-\hat p)$ のroot-$n$漸近分散を求めよ。
3. 対数オッズ
   $$
   \eta=\log r
   $$
   の推定量のroot-$n$漸近分散を求めよ。
4. $p\to0$ または $p\to1$ で対数オッズの分散が大きくなる理由を式から説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\operatorname{AVar}(\hat p)=p(1-p).
$$

オッズ $g(p)=p/(1-p)$ は

$$
g'(p)=\frac1{(1-p)^2}
$$

なので

$$
\boxed{
\operatorname{AVar}(\hat r)
=\frac{p}{(1-p)^3}
}.
$$

対数オッズ $h(p)=\log\{p/(1-p)\}$ では

$$
h'(p)=\frac1{p(1-p)}
$$

より

$$
\boxed{
\operatorname{AVar}(\hat\eta)
=\frac1{p(1-p)}
}.
$$

$p$ が0または1へ近づくと $p(1-p)\to0$ なので、その逆数が発散します。確率尺度で端に近い小さな変動がlogit尺度では大きく引き伸ばされるためです。

##### 本番答案

$$
\operatorname{AVar}(\hat p)=p(1-p).
$$

$$
\left\{\frac{d}{dp}\frac p{1-p}\right\}^2p(1-p)
=\boxed{\frac{p}{(1-p)^3}}.
$$

$$
\left\{\frac{d}{dp}\log\frac p{1-p}\right\}^2p(1-p)
=\boxed{\frac1{p(1-p)}}.
$$

端点では分母 $p(1-p)$ が0へ近づくため分散が増大する。

##### 採点基準

- $\hat p$: 3点
- オッズ: 6点
- 対数オッズ: 7点
- 端点解釈: 4点

<!-- solution-end -->

### I2-01-C03 一様分布MLEの収束率

- Level: C
- 目安時間: 25分
- 主題: 非正則漸近論
- 使用技術: 順序統計量、指数極限、正則条件

$X_i\overset{\mathrm{iid}}{\sim}U(0,\theta)$、$M_n=X_{(n)}$ とする。

1. $M_n$ がMLEであることを確認せよ。
2. $t\ge0$ に対して $P\{n(\theta-M_n)>t\}$ を求めよ。
3. 極限分布を求めよ。
4. この結果が正則MLEの漸近正規性定理と矛盾しない理由を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

尤度は

$$
L(\theta)=\theta^{-n}\mathbf1(M_n\le\theta).
$$

許される $\theta\ge M_n$ の範囲では単調減少なので

$$
\hat\theta=M_n.
$$

また

$$
\begin{aligned}
P\{n(\theta-M_n)>t\}
&=P(M_n<\theta-t/n)\\
&=\left(\frac{\theta-t/n}{\theta}\right)^n\\
&=\left(1-\frac{t}{n\theta}\right)^n
\to e^{-t/\theta}.
\end{aligned}
$$

従って

$$
\boxed{
n(\theta-M_n)\Rightarrow\mathrm{Exp}(1/\theta)
}.
$$

支持 $[0,\theta]$ が母数に依存するので正則条件が破れており、通常の $\sqrt n$ 正規定理の対象外です。

##### 本番答案

$$
L(\theta)=\theta^{-n}\mathbf1(M_n\le\theta)
$$

より $\hat\theta=M_n$。

$$
P\{n(\theta-M_n)>t\}
=\left(1-\frac{t}{n\theta}\right)^n
\to e^{-t/\theta}.
$$

よって

$$
\boxed{n(\theta-M_n)\Rightarrow\mathrm{Exp}(1/\theta)}.
$$

支持が $\theta$ に依存するため正則MLE定理は適用できない。

##### 採点基準

- MLE: 4点
- 生存関数: 7点
- 極限分布: 5点
- 正則条件: 4点

<!-- solution-end -->

### I2-01-C04 2母数正規MLEを $(\mu,\sigma)$ へ変換する

- Level: C
- 目安時間: 25分
- 主題: 多母数MLEと多変量Delta法
- 使用技術: Fisher情報行列、Jacobian

$X_i\overset{\mathrm{iid}}{\sim}N(\mu,v)$、$v=\sigma^2>0$ とする。正則MLE $\hat\theta=(\hat\mu,\hat v)^\mathsf T$ について

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

1. $g(\mu,v)=(\mu,\sqrt v)^\mathsf T$ のJacobianを求めよ。
2. $(\hat\mu,\hat\sigma)$ の漸近共分散行列を求めよ。
3. $\hat\mu$ と $\hat\sigma$ の漸近共分散を答えよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
J_g(\mu,v)
=
\begin{pmatrix}
1&0\\
0&1/(2\sqrt v)
\end{pmatrix}
=
\begin{pmatrix}
1&0\\
0&1/(2\sigma)
\end{pmatrix}.
$$

多変量Delta法より

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
J_g=\operatorname{diag}(1,1/(2\sigma)).
$$

よって

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

漸近共分散は $\boxed0$。

##### 採点基準

- Jacobian: 6点
- 行列積: 8点
- 漸近分布: 4点
- 共分散: 2点

<!-- solution-end -->

## Level D

### I2-01-D01 指数寿命モデルを別尺度へ運ぶ

- Level: D
- 目安時間: 40分
- 主題: MLE・再母数化・Delta法・漸近効率
- 使用技術: 指数分布、Fisher情報量、Jacobian、共分散

寿命 $X_1,\ldots,X_n$ が独立に率 $\lambda>0$ の指数分布に従うとする。平均寿命を

$$
m=\frac1\lambda
$$

とし、時点 $t>0$ まで生存する確率を

$$
R(t)=e^{-\lambda t}
$$

とする。

1. $\lambda$ のMLE $\hat\lambda$ とそのroot-$n$漸近分散を求めよ。
2. $\hat m=1/\hat\lambda$ のroot-$n$漸近分散をDelta法で求めよ。さらに $\hat m$ を標本から直接簡単化せよ。
3. $\widehat{R}(t)=e^{-t\hat\lambda}$ のroot-$n$漸近分散を求めよ。
4. ベクトル
   $$
   g(\lambda)=\begin{pmatrix}m\\R(t)\end{pmatrix}
   $$
   にDelta法を適用し、$(\hat m,\widehat R(t))$ のroot-$n$漸近共分散を求めよ。
5. $m$ を母数として直接Fisher情報量を計算し、2の結果と一致することを示せ。

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

1観測Fisher情報量は $I_1(\lambda)=1/\lambda^2$ なので

$$
\boxed{\operatorname{AVar}(\hat\lambda)=\lambda^2}.
$$

平均寿命 $m=g_1(\lambda)=1/\lambda$ では

$$
g_1'(\lambda)=-\frac1{\lambda^2}=-m^2.
$$

よって

$$
\operatorname{AVar}(\hat m)
=\frac1{\lambda^4}\lambda^2
=\boxed{\frac1{\lambda^2}=m^2}.
$$

しかも

$$
\hat m=\frac1{\hat\lambda}=\bar X.
$$

これは標本平均のCLTと一致します。

生存確率では

$$
g_2'(\lambda)=-t e^{-\lambda t}=-tR(t)
$$

なので

$$
\boxed{
\operatorname{AVar}(\widehat R(t))
=t^2R(t)^2\lambda^2
}.
$$

ベクトル変換のJacobianは1母数から2出力なので

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
J_g\lambda^2J_g^\mathsf T
=
\boxed{
\begin{pmatrix}
1/\lambda^2&tR(t)/\lambda\\
tR(t)/\lambda&t^2R(t)^2\lambda^2
\end{pmatrix}
}.
$$

共分散が正になるのは、$\hat\lambda$ が大きくなると $\hat m$ と $\widehat R(t)$ はともに小さくなるためです。

最後に $m=1/\lambda$、すなわち $\lambda=1/m$ と再母数化すると

$$
\frac{d\lambda}{dm}=-\frac1{m^2}.
$$

Fisher情報量の再母数化則から

$$
I_1(m)
=I_1(\lambda)\left(\frac{d\lambda}{dm}\right)^2
=m^2\frac1{m^4}
=\frac1{m^2}.
$$

従って正則MLEの漸近分散は

$$
I_1(m)^{-1}=m^2,
$$

2と一致します。

##### 本番答案

$$
\hat\lambda=1/\bar X,
\qquad
\operatorname{AVar}(\hat\lambda)=\lambda^2.
$$

Delta法より

$$
\operatorname{AVar}(\hat m)
=(1/\lambda^4)\lambda^2=1/\lambda^2=m^2,
\qquad
\hat m=\bar X.
$$

$$
\operatorname{AVar}(\widehat R(t))
=t^2R(t)^2\lambda^2.
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

再母数化則から $I_1(m)=1/m^2$、よって逆数 $m^2$ で一致する。

##### 採点基準

- $\lambda$ のMLE・漸近分散: 4点
- $m$ のDelta法と簡約: 5点
- $R(t)$ のDelta法: 4点
- 多変量共分散: 5点
- 再母数化Fisher情報量: 2点

<!-- solution-end -->

## 14. 30分ドリル

### I2-01-DRILL01 故障率から平均寿命・生存確率へ

- Level: C
- 目安時間: 30分
- 主題: 正則MLEとDelta法の連結
- 使用技術: 尤度、Fisher情報量、Delta法、plug-in標準誤差

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$ とする。$t_0>0$ を固定し

$$
m=1/\lambda,
\qquad
q=e^{-\lambda t_0}
$$

とおく。

1. $\lambda$ のMLEを求めよ。
2. Fisher情報量から $\hat\lambda$ のroot-$n$漸近分散を求めよ。
3. $\hat m$ の漸近分布を求めよ。
4. $\hat q=e^{-t_0\hat\lambda}$ の漸近分布を求めよ。
5. $\hat q$ の大標本標準誤差を、未知母数をMLEで置き換えた形で書け。
6. この問題で通常の正則MLE理論を使える理由を、一様分布 $U(0,\theta)$ と対比して述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

尤度から

$$
\hat\lambda=1/\bar X.
$$

1観測あたりのFisher情報量は

$$
I_1(\lambda)=1/\lambda^2
$$

なので

$$
\sqrt n(\hat\lambda-\lambda)
\Rightarrow N(0,\lambda^2).
$$

$m=1/\lambda$ について

$$
\frac{dm}{d\lambda}=-1/\lambda^2
$$

だから

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
\operatorname{se}(\hat q)
\approx
\frac{t_0q\lambda}{\sqrt n}.
$$

plug-in すると

$$
\boxed{
\widehat{\operatorname{se}}(\hat q)
=
\frac{t_0\hat q\hat\lambda}{\sqrt n}
}.
$$

指数分布では支持 $[0,\infty)$ が $\lambda$ に依存せず、真値が内部にあり、対数尤度も滑らかです。一方 $U(0,\theta)$ では支持上端が $\theta$ 自身で動くため、通常の正則MLE理論が破れます。

##### 本番答案

$$
\hat\lambda=1/\bar X,
\qquad
I_1(\lambda)=1/\lambda^2,
$$

$$
\sqrt n(\hat\lambda-\lambda)\Rightarrow N(0,\lambda^2).
$$

Delta法より

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

指数分布は支持が母数に依存しない正則モデルだが、一様分布は支持が母数依存なので通常のMLE漸近正規性定理の対象外。

##### 採点基準

- MLE: 3点
- Fisher情報量と漸近分布: 4点
- 平均寿命のDelta法: 4点
- 生存確率のDelta法: 4点
- plug-in標準誤差: 3点
- 正則性の比較: 2点

<!-- solution-end -->

## 15. 過去問との対応

本章では公式問題文を転載せず、過去問索引で確認できる技能構造を独自問題へ落としています。

- `MATH-2012-Q3`: 指数分布の最尤推定、Fisher情報量、Delta法。本章では C01 と DRILL01 が直接対応する。
- `MATH-2018-Q1`: カイ二乗分布・母標準偏差。分散から標準偏差への非線形変換を A04 と C04 で練習する。
- `MATH-2018-Q2`: 超幾何分布の推定量。逆数型の非線形変換に対するDelta法という技能を B03 とは別設定で一般化している。

実過去問を解く際は、公式問題集または公式公開問題を正本とし、第三者解説はテーマ照合・別解確認に限って利用します。

## 16. 章末チェック

- 漸近正規性を「有限標本で正規分布」と誤解していない。
- root-$n$ 漸近分散 $V$ と $\operatorname{Var}(T_n)\approx V/n$ を区別できる。
- MLEのTaylor展開式を自力で作れる。
- スコア側に中心極限定理、曲率側に大数則を使う理由を説明できる。
- Slutskyの定理で2つを結合し $I_1^{-1}$ を導ける。
- 観測情報量 $j_n$ と期待Fisher情報量 $I_n$ を区別できる。
- 1変量Delta法をTaylor展開から導ける。
- 導関数を二乗して漸近分散を変換できる。
- 多変量では $J\Sigma J^\mathsf T$ を使える。
- $g'(\theta)=0$ なら一次Delta法が退化することを確認できる。
- 再母数化後のFisher情報量とDelta法が整合することを示せる。
- 一様分布MLEでは $n$ 尺度と指数極限が現れることを説明できる。
- 「MLEなら必ず $\sqrt n$ 正規」という誤った一般化をしない。
