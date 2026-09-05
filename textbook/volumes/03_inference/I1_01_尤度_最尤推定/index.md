<!-- definition-example-audit: strict -->

# I1-01 尤度・最尤推定

観測データが得られたとき、「どの母数なら、このデータがもっとも自然に出てきたと考えられるか」を測るのが尤度です。確率モデルを、今度はデータを固定して母数の関数として読み替えることで、点推定・尤度比検定・ベイズ推定・期待値最大化法へ続く共通言語が得られます。

本章では、尤度・対数尤度・スコア関数を具体的な分布から組み立て、最尤推定量を求めます。ただし「微分して0」に機械的に落とすのではなく、母数空間の境界、支持が母数に依存する場合、複数母数、再パラメータ化まで含めて、**何を最大化しているのかを見失わない解法**を身につけます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

関連章:

- [S1-02 統計量・十分性・分解定理](../S1_02_統計量_十分性_分解定理/index.md): 尤度にデータがどのように集約されるかを理解する前提。
- [P3-01 主要な離散分布](../../02_distributions/P3_01_主要な離散分布/index.md): ベルヌーイ・二項・ポアソン分布。
- [P3-02 主要な連続分布](../../02_distributions/P3_02_主要な連続分布/index.md): 正規・指数・一様分布。
- I1-02 推定法と推定量の評価: フィッシャー情報量、クラーメル・ラオの不等式、不偏性・一致性・有効性へ進む。
- I3-02 尤度比・ワルド・スコア検定: 本章の尤度とスコアを検定統計量へ使う。
- [I4-02 欠測・不完全データ・期待値最大化法](../I4_02_欠測_不完全データ_期待値最大化法/index.md): 観測データ尤度を直接最大化しにくい場合の計算法。

## この章で解けるようになる問題

- 確率質量関数・確率密度関数から標本の尤度と対数尤度を作る。
- スコア方程式を解き、二階微分・単調性・境界を確認して最尤推定量を決める。
- ベルヌーイ、ポアソン、指数、正規分布の標準的な最尤推定量を導出する。
- 一様分布のように支持が母数へ依存するモデルで、指示関数を落とさず最尤推定量を求める。
- 再パラメータ化した母数の最尤推定量を不変性から求める。
- 多母数モデルのスコアベクトルを計算する。
- 局外母数があるとき、有効スコアが「他の母数で説明できるスコア成分を差し引く」量であることを説明する。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 尤度関数 | 独立標本の積、支持・母数空間を含む尤度 |
| 対数尤度関数 | 積を和へ変換し最大化を簡単にする |
| 有効スコア関数 | スコア、スコアベクトル、局外母数を調整した有効スコア |
| 最尤推定 | 内点解、境界解、非正則例、再パラメータ化不変性 |

## 前提知識チェック

1. S1-02: 統計量と十分統計量の意味を説明できる。
2. P3-01/P3-02: ベルヌーイ、ポアソン、指数、正規、一様分布の確率関数・密度を書ける。
3. F0-00: 一変数・多変数の微分、対数微分、最大値判定ができる。
4. P4-01: 最大値 $X_{(n)}=\max_i X_i$ の意味を知っている。

---

## 1. 導入

コインを10回投げて7回表だったとします。表確率を $p$ とすると、この結果が出る確率は、表裏の**並びまで観測している**なら

$$
p^7(1-p)^3
$$

です。ここでデータ「7回表、3回裏」を固定し、$p$ を $0$ から $1$ まで動かしてみます。$p=0.1$ より $p=0.7$ の方が、このデータにははるかに適合します。

この「データを固定し、母数を動かしてモデルの適合の相対的な大きさを見る」関数が尤度です。

確率と尤度は、同じ式を別方向から見ています。

- 確率: 母数を固定し、起こりうるデータを動かす。
- 尤度: 観測データを固定し、母数を動かす。

したがって、連続分布の尤度は確率ではなく**密度の値の積**です。母数について積分して1になる必要もありません。

---

## 2. 定義と記号

<a id="def-i1-01-likelihood"></a>

<!-- formal-statement-start -->
> **定義（尤度関数）**  
> 観測値を $x=(x_1,\ldots,x_n)$、母数を $\theta\in\Theta$ とする。モデルの同時確率質量関数または同時密度を $f_\theta(x)$ とするとき、データ $x$ を固定して

$$
L(\theta;x)=f_\theta(x)
$$

> を $\theta$ の関数とみたものを**尤度関数**という。独立標本なら

$$
L(\theta;x)=\prod_{i=1}^n f_\theta(x_i).
$$
<!-- formal-statement-end -->

比例定数が $\theta$ に依存しなければ、最大化する場所は変わりません。このため

$$
L(\theta;x)\propto g(\theta;x)
$$

として、母数に依存しない因子を省略してよいことがあります。ただし**支持を表す指示関数が $\theta$ に依存する場合は省略できません**。

<a id="def-i1-01-loglikelihood"></a>

<!-- formal-statement-start -->
> **定義（対数尤度関数）**  
> $L(\theta;x)>0$ の範囲で

$$
\ell(\theta;x)=\log L(\theta;x)
$$

> を**対数尤度関数**という。対数は単調増加なので、$L$ と $\ell$ は同じ点で最大になる。
<!-- formal-statement-end -->

独立標本では

$$
\ell(\theta;x)=\sum_{i=1}^n \log f_\theta(x_i)
$$

となり、積が和になります。

<a id="def-i1-01-score"></a>

<!-- formal-statement-start -->
> **定義（スコア関数）**  
> 1母数モデルで対数尤度が微分可能なとき

$$
U(\theta)=\frac{\partial}{\partial\theta}\ell(\theta)
$$

> を**スコア関数**という。多母数 $\theta=(\theta_1,\ldots,\theta_p)^\mathsf T$ では

$$
U(\theta)=\nabla_\theta\ell(\theta)
$$

> をスコアベクトルという。
<!-- formal-statement-end -->

スコアは「母数を少し増やしたとき、対数尤度がどちらへ増えるか」を表します。

<a id="def-i1-01-mle"></a>

<!-- formal-statement-start -->
> **定義（最尤推定量）**  
> 母数空間 $\Theta$ 上で尤度を最大にする値

$$
\hat\theta_{\mathrm{ML}}\in\operatorname*{arg\,max}_{\theta\in\Theta}L(\theta;x)
$$

> を**最尤推定値**という。データ $X$ の関数として見た $\hat\theta_{\mathrm{ML}}(X)$ を**最尤推定量（MLE）**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i1-01-likelihood, def-i1-01-loglikelihood, def-i1-01-score, def-i1-01-mle -->
**定義の確認**  
独立なベルヌーイ標本で成功数を $S=\sum_iX_i$ とすると

$$
L(p)=p^S(1-p)^{n-S},
\qquad
\ell(p)=S\log p+(n-S)\log(1-p).
$$

その微分

$$
U(p)=\frac{S}{p}-\frac{n-S}{1-p}
$$

がスコアで、$0<S<n$ なら $U(p)=0$ を解いた $\hat p=S/n$ が尤度を最大化します。同じ一例で、尤度・対数尤度・スコア・最尤推定量の4定義を確認できます。
<!-- definition-example-end -->

最大値が複数ある場合、最尤推定値は一意とは限りません。また、母数空間が開集合だと最大値が達成されず「最尤推定量が存在しない」こともあります。

---

## 3. 定理・公式と導出

### 3.1 内点の最大値ならスコア方程式を満たす

<a id="prop-i1-01-score-equation"></a>

<!-- formal-statement-start -->
> **命題（スコア方程式）**  
> $\hat\theta$ が母数空間の内点で、$\ell(\theta)$ が $\hat\theta$ の近傍で微分可能であり、$\hat\theta$ で局所最大をとるなら

$$
U(\hat\theta)=\ell'(\hat\theta)=0
$$

> である。
<!-- formal-statement-end -->

これは微積分の停留条件です。逆は成り立ちません。$U(\theta)=0$ は最大・最小・変曲点の候補を出すだけなので、二階微分、符号変化、端点、尤度そのものを確認します。

### 3.2 ベルヌーイ分布

$X_1,\ldots,X_n$ を独立なベルヌーイ分布に従う確率変数とし、成功確率を $p$、$S=\sum_i X_i$ とします。

$$
L(p)=\prod_{i=1}^n p^{x_i}(1-p)^{1-x_i}
=p^S(1-p)^{n-S}.
$$

$0<S<n$ なら

$$
\ell(p)=S\log p+(n-S)\log(1-p),
$$

$$
U(p)=\frac{S}{p}-\frac{n-S}{1-p}
=\frac{S-np}{p(1-p)}.
$$

したがって $U(p)=0$ より

$$
\boxed{\hat p_{\mathrm{ML}}=\frac{S}{n}=\bar X}.
$$

さらに

$$
\ell''(p)=-\frac{S}{p^2}-\frac{n-S}{(1-p)^2}<0
$$

なので内点では一意な最大です。

ただし $S=0$ なら $L(p)=(1-p)^n$ は単調減少、$S=n$ なら $L(p)=p^n$ は単調増加です。母数空間を $[0,1]$ とすれば、それぞれ $\hat p=0,1$ です。**境界ではスコア方程式を使う必要がありません**。

### 3.3 ポアソン分布

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Poisson}(\lambda)$, $\lambda>0$ とします。

$$
L(\lambda)
=\prod_{i=1}^n\frac{e^{-\lambda}\lambda^{x_i}}{x_i!}
\propto e^{-n\lambda}\lambda^{\sum x_i}.
$$

よって

$$
\ell(\lambda)=
-n\lambda+\left(\sum x_i\right)\log\lambda+\text{const.}
$$

なので

$$
U(\lambda)=-n+\frac{\sum x_i}{\lambda}.
$$

$\sum x_i>0$ なら

$$
\boxed{\hat\lambda_{\mathrm{ML}}=\bar X}.
$$

一方、$\Theta=(0,\infty)$ で全観測が0なら $L(\lambda)=e^{-n\lambda}$ は $\lambda\downarrow0$ で上限1へ近づきますが、$\lambda=0$ は母数空間に含まれないので最大値は達成されません。この設定では有限の最尤推定値は存在しません。

### 3.4 指数分布

率母数 $\lambda>0$ の指数分布

$$
f(x\mid\lambda)=\lambda e^{-\lambda x},\qquad x\ge0
$$

からの独立標本なら

$$
\ell(\lambda)=n\log\lambda-\lambda\sum x_i.
$$

したがって

$$
U(\lambda)=\frac{n}{\lambda}-\sum x_i,
$$

$$
\boxed{\hat\lambda_{\mathrm{ML}}=\frac{n}{\sum x_i}=\frac1{\bar X}}.
$$

平均母数 $\mu=1/\lambda$ で表せば $\hat\mu_{\mathrm{ML}}=\bar X$ です。

### 3.5 正規分布の平均と分散

$X_i\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$ とします。

$$
\ell(\mu,\sigma^2)
=
-\frac n2\log(2\pi)
-\frac n2\log\sigma^2
-\frac{1}{2\sigma^2}\sum_{i=1}^n(x_i-\mu)^2.
$$

$\mu$ で微分すると

$$
\frac{\partial\ell}{\partial\mu}
=\frac{1}{\sigma^2}\sum_{i=1}^n(x_i-\mu),
$$

よって

$$
\boxed{\hat\mu_{\mathrm{ML}}=\bar X}.
$$

これを $\sigma^2$ のスコアへ代入すると

$$
\frac{\partial\ell}{\partial\sigma^2}
=
-\frac{n}{2\sigma^2}
+\frac{1}{2(\sigma^2)^2}\sum_{i=1}^n(x_i-\bar X)^2,
$$

したがって

$$
\boxed{
\hat\sigma^2_{\mathrm{ML}}
=\frac1n\sum_{i=1}^n(X_i-\bar X)^2
}.
$$

分母は $n-1$ ではなく $n$ です。$n-1$ を使う不偏分散は「不偏性を優先した推定量」であり、最尤推定量とは目的が異なります。

### 3.6 支持が母数に依存する一様分布

$X_i\overset{\mathrm{iid}}{\sim}U(0,\theta)$, $\theta>0$ とします。密度は

$$
f(x\mid\theta)=\frac1\theta\mathbf1(0\le x\le\theta).
$$

したがって

$$
L(\theta)
=
\theta^{-n}
\prod_{i=1}^n\mathbf1(x_i\le\theta)
=
\theta^{-n}\mathbf1(X_{(n)}\le\theta),
$$

ただし $X_{(n)}=\max_iX_i$ です。

観測値をすべて含むには $\theta\ge X_{(n)}$ が必要で、その範囲では $\theta^{-n}$ は単調減少です。よって

$$
\boxed{\hat\theta_{\mathrm{ML}}=X_{(n)}}.
$$

この例では、最大点は許される範囲の端です。指示関数を「定数」とみなして落とし、$\ell=-n\log\theta$ だけを微分しても正解には到達しません。

### 3.7 最尤推定量の再パラメータ化不変性

<a id="thm-i1-01-invariance"></a>

<!-- formal-statement-start -->
> **定理（最尤推定量の不変性）**  
> $\hat\theta$ が $\theta$ の最尤推定量で、$\eta=g(\theta)$ とする。$g$ が1対1なら

$$
\hat\eta_{\mathrm{ML}}=g(\hat\theta).
$$

> より一般に1対1でなくても、$\eta$ の誘導されたプロファイル尤度を最大化する値として $g(\hat\theta)$ が得られる。
<!-- formal-statement-end -->

1対1の場合は、$\eta$ を動かすことと $\theta=g^{-1}(\eta)$ を動かすことが同じだからです。

たとえば指数分布で率 $\lambda$ の最尤推定量が $1/\bar X$ なら、平均寿命 $\mu=1/\lambda$ の最尤推定量は

$$
\hat\mu_{\mathrm{ML}}
=\frac1{\hat\lambda_{\mathrm{ML}}}
=\bar X.
$$

これは「推定量一般の変換でいつも成り立つ」性質ではなく、**最尤法の最大化構造**から生じます。

### 3.8 有効スコア関数: まず1個の局外母数で考える

まず、関心母数 $\psi$ と局外母数 $\lambda$ がどちらも1個の実数である場合から考えます。この場合だけでも、関心母数のスコアから局外母数方向の成分を取り除くという考え方の核が見えます。

それぞれのスコアを

$$
U_\psi=\frac{\partial\ell}{\partial\psi},
\qquad
U_\lambda=\frac{\partial\ell}{\partial\lambda}
$$

とします。正則条件の下では両者の期待値は0です。そこで、$U_\psi$ のうち $U_\lambda$ と線形に重なる成分を

$$
\frac{\operatorname{Cov}(U_\psi,U_\lambda)}
{\operatorname{Var}(U_\lambda)}U_\lambda
$$

として差し引きます。

<a id="def-i1-01-efficient-score"></a>

<!-- formal-statement-start -->
> **定義（有効スコア関数）**  
> 関心母数 $\psi$、局外母数 $\lambda$ がともに1次元で、$\operatorname{Var}(U_\lambda)>0$ とする。このとき

$$
\boxed{
U_{\mathrm{eff},\psi}
=
U_\psi
-
\frac{\operatorname{Cov}(U_\psi,U_\lambda)}
{\operatorname{Var}(U_\lambda)}U_\lambda
}
$$

> を $\psi$ に対する **有効スコア関数**（有効スコア）という。
<!-- formal-statement-end -->

意味は、**関心母数のスコアから、局外母数のスコアで説明できる方向を取り除く**ことです。特に

$$
\operatorname{Cov}(U_\psi,U_\lambda)=0
$$

なら調整項は消え、$U_{\mathrm{eff},\psi}=U_\psi$ です。

<!-- definition-example-start: def-i1-01-efficient-score -->
**定義の確認**  
ある観測で $U_\psi=3,U_\lambda=2$、また

$$
\operatorname{Cov}(U_\psi,U_\lambda)=1,
\qquad
\operatorname{Var}(U_\lambda)=4
$$

なら

$$
U_{\mathrm{eff},\psi}
=3-\frac14\,2
=\frac52.
$$

局外母数方向と正の重なりがある分だけ、元のスコア $3$ から差し引かれています。
<!-- definition-example-end -->

正規分布 $N(\mu,\sigma^2)$ では、平均 $\mu$ のスコアと分散 $\sigma^2$ のスコアの共分散が0になります。この場合、平均に対する有効スコアは通常の $\mu$ スコアと一致します。

#### 発展: 局外母数がベクトルの場合

> **発展項目**  
> 局外母数が複数ある一般形では情報行列のブロック表示を使います。これは1次元フィッシャー情報量を中心とする通常ルートでは必須としません。

局外母数をベクトル $\lambda$ とし、情報行列をブロック表示すると、一般形は

$$
U_{\mathrm{eff},\psi}
=
U_\psi
-I_{\psi\lambda}I_{\lambda\lambda}^{-1}U_\lambda.
$$

局外母数が1個なら $I_{\psi\lambda}=\operatorname{Cov}(U_\psi,U_\lambda)$、$I_{\lambda\lambda}=\operatorname{Var}(U_\lambda)$ なので、上の通常ルートの式へ戻ります。

### 3.9 正則モデルでスコアの期待値が0になる理由

支持が母数に依存せず、微分と積分を交換できるなら

$$
E_\theta[U(\theta)]
=
\int
\frac{\partial}{\partial\theta}\log f_\theta(x)
\,f_\theta(x)\,dx
=
\int
\frac{\partial}{\partial\theta}f_\theta(x)\,dx.
$$

したがって

$$
E_\theta[U(\theta)]
=
\frac{\partial}{\partial\theta}
\int f_\theta(x)\,dx
=
\frac{\partial}{\partial\theta}1
=0.
$$

ただし $U(0,\theta)$ のように支持が母数へ依存するモデルでは、この交換がそのまま使えません。こうした**正則性条件の破れ**が、境界解や通常とは異なる漸近挙動につながります。

---

## 4. 典型例題

### 例1: 二項データは「組合せ係数を付けても付けなくても」最尤推定量は同じ

$Y\sim\mathrm{Bin}(n,p)$ として $Y=y$ だけを観測したなら

$$
L(p)=\binom ny p^y(1-p)^{n-y}.
$$

一方、ベルヌーイ標本の具体的な0/1列を観測したなら

$$
L(p)=p^y(1-p)^{n-y}.
$$

両者は $\binom ny$ という $p$ に依存しない因子だけ違うため、どちらも

$$
\hat p=y/n
$$

を与えます。尤度は絶対値より**母数間の相対比較**が重要です。

### 例2: ガンマ分布の率母数

形状 $a>0$ を既知として

$$
f(x\mid\lambda)
=
\frac{\lambda^a}{\Gamma(a)}
x^{a-1}e^{-\lambda x},\qquad x>0
$$

とします。独立標本では

$$
\ell(\lambda)
=
na\log\lambda
-\lambda\sum x_i
+\text{const.}
$$

より

$$
\boxed{
\hat\lambda_{\mathrm{ML}}
=
\frac{na}{\sum x_i}
=
\frac a{\bar X}
}.
$$

---

## 5. 演習

### I1-01-A01 ベルヌーイ標本の最尤推定

- Level: A
- 目安時間: 8分
- 主題: 尤度・スコア
- 使用技術: 対数尤度、微分、境界確認

$X_1,\ldots,X_8$ は独立にベルヌーイ分布に従い、成功確率を $p$ とする。観測値が $1,0,1,1,0,1,1,0$ であった。

1. 尤度 $L(p)$ と対数尤度 $\ell(p)$ を書け。
2. スコア方程式を解き、$p$ の最尤推定値を求めよ。
3. すべての観測値が1だった場合の最尤推定値を答えよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

表の個数は $S=5$ であるから

$$
L(p)=p^5(1-p)^3,
\qquad
\ell(p)=5\log p+3\log(1-p).
$$

したがって

$$
U(p)=\frac5p-\frac3{1-p}
=\frac{5-8p}{p(1-p)}.
$$

内点解は $5-8p=0$ より

$$
\hat p=\frac58.
$$

また

$$
\ell''(p)=-\frac5{p^2}-\frac3{(1-p)^2}<0
$$

なので最大である。全て1なら $L(p)=p^8$ は $[0,1]$ 上で単調増加だから $\hat p=1$。

##### 本番答案

$S=5$ より $L(p)=p^5(1-p)^3$, $\ell(p)=5\log p+3\log(1-p)$。

$$
\ell'(p)=\frac5p-\frac3{1-p}=0
\iff p=\frac58.
$$

$\ell''(p)<0$ より $\hat p_{\rm ML}=5/8$。全て1なら $L(p)=p^8$ なので境界 $p=1$ が最尤値。

##### 採点基準

- 尤度・対数尤度: 6点
- スコア方程式: 5点
- $\hat p=5/8$ と最大値確認: 5点
- 全て1の境界解: 4点

<!-- solution-end -->

### I1-01-A02 ポアソン分布の最尤推定

- Level: A
- 目安時間: 8分
- 主題: ポアソン分布の尤度
- 使用技術: 母数に依存しない因子の除去

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Poisson}(\lambda)$, $\lambda>0$ とする。$\sum_iX_i=s>0$ として $\lambda$ の最尤推定量を導出せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
L(\lambda)
=
\prod_i\frac{e^{-\lambda}\lambda^{x_i}}{x_i!}
\propto
e^{-n\lambda}\lambda^s.
$$

よって

$$
\ell(\lambda)=-n\lambda+s\log\lambda+\text{const.},
\qquad
\ell'(\lambda)=-n+\frac s\lambda.
$$

$\ell'(\lambda)=0$ より $\lambda=s/n=\bar X$。さらに

$$
\ell''(\lambda)=-\frac{s}{\lambda^2}<0
$$

なので一意な最大である。

##### 本番答案

$$
\ell(\lambda)=-n\lambda+s\log\lambda+\mathrm{const.}
$$

より

$$
\ell'(\lambda)=-n+s/\lambda=0
\quad\Rightarrow\quad
\boxed{\hat\lambda_{\rm ML}=\bar X}.
$$

$s>0$ なら $\ell''(\lambda)=-s/\lambda^2<0$。

##### 採点基準

- 尤度: 6点
- 対数尤度: 4点
- 微分方程式: 4点
- 最尤推定量と最大値確認: 6点

<!-- solution-end -->

### I1-01-A03 指数分布の率と平均寿命

- Level: A
- 目安時間: 8分
- 主題: 再パラメータ化
- 使用技術: 最尤推定量の不変性

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Exp}(\lambda)$ で $f(x\mid\lambda)=\lambda e^{-\lambda x}$ $(x\ge0)$ とする。

1. $\lambda$ の最尤推定量を求めよ。
2. 平均寿命 $\mu=1/\lambda$ の最尤推定量を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\ell(\lambda)=n\log\lambda-\lambda\sum x_i,
$$

したがって

$$
\ell'(\lambda)=\frac n\lambda-\sum x_i=0
$$

より

$$
\hat\lambda=\frac1{\bar X}.
$$

$\mu=1/\lambda$ は1対1変換なので不変性より

$$
\hat\mu=\frac1{\hat\lambda}=\bar X.
$$

##### 本番答案

$$
\ell(\lambda)=n\log\lambda-\lambda\sum x_i
$$

より $\hat\lambda_{\rm ML}=1/\bar X$。最尤推定量の不変性から

$$
\boxed{\hat\mu_{\rm ML}=\bar X}.
$$

##### 採点基準

- 対数尤度: 5点
- $\hat\lambda$: 7点
- 不変性の適用: 4点
- $\hat\mu$: 4点

<!-- solution-end -->

### I1-01-A04 一様分布の境界解

- Level: A
- 目安時間: 10分
- 主題: 母数依存の支持
- 使用技術: 最大順序統計量、単調性

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}U(0,\theta)$, $\theta>0$ とする。$\theta$ の最尤推定量を求めよ。また、単に $\ell(\theta)=-n\log\theta$ を微分するだけでは不十分な理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

密度は

$$
f(x\mid\theta)=\theta^{-1}\mathbf1(0\le x\le\theta)
$$

なので

$$
L(\theta)=\theta^{-n}\mathbf1(X_{(n)}\le\theta).
$$

$\theta<X_{(n)}$ では尤度0、$\theta\ge X_{(n)}$ では $\theta^{-n}$ であり単調減少する。従って最小の許容値

$$
\boxed{\hat\theta=X_{(n)}}
$$

で最大となる。

$\ell=-n\log\theta$ だけでは $\theta\ge X_{(n)}$ という母数依存の支持条件を落としてしまうため不十分である。

##### 本番答案

$$
L(\theta)=\theta^{-n}\mathbf1\{\theta\ge X_{(n)}\}.
$$

許容範囲 $\theta\ge X_{(n)}$ で $\theta^{-n}$ は減少するから

$$
\boxed{\hat\theta_{\rm ML}=X_{(n)}}.
$$

指示関数が $\theta$ に依存するため省略してはならない。

##### 採点基準

- 尤度の指示関数: 8点
- 許容範囲: 4点
- 単調性と最尤推定量: 5点
- 微分だけでは不足する理由: 3点

<!-- solution-end -->

### I1-01-B01 正規分布の2母数最尤推定

- Level: B
- 目安時間: 15分
- 主題: 多母数の最尤推定
- 使用技術: 偏微分、平方和分解

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$, $\mu\in\mathbb R$, $\sigma^2>0$ とする。

1. 対数尤度を書け。
2. $\mu,\sigma^2$ の最尤推定量を求めよ。
3. $\hat\sigma^2_{\mathrm{ML}}$ と不偏標本分散の分母が異なることを確認せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\ell=
-\frac n2\log(2\pi)
-\frac n2\log\sigma^2
-\frac1{2\sigma^2}\sum_i(x_i-\mu)^2.
$$

$\mu$ のスコアは

$$
\frac{\partial\ell}{\partial\mu}
=\frac1{\sigma^2}\sum_i(x_i-\mu),
$$

よって $\hat\mu=\bar X$。

これを代入して $\sigma^2$ で微分すると

$$
-\frac n{2\sigma^2}
+\frac{\sum_i(x_i-\bar X)^2}{2(\sigma^2)^2}
=0.
$$

従って

$$
\boxed{
\hat\sigma^2_{\rm ML}
=\frac1n\sum_i(X_i-\bar X)^2
}.
$$

一方、不偏標本分散は

$$
S^2=\frac1{n-1}\sum_i(X_i-\bar X)^2.
$$

したがって $\hat\sigma^2_{\rm ML}=\frac{n-1}{n}S^2$ である。

##### 本番答案

$$
\ell(\mu,\sigma^2)
=C-\frac n2\log\sigma^2
-\frac1{2\sigma^2}\sum_i(x_i-\mu)^2.
$$

偏微分を0とすると

$$
\boxed{\hat\mu=\bar X},\qquad
\boxed{\hat\sigma^2=\frac1n\sum_i(X_i-\bar X)^2}.
$$

よって $\hat\sigma^2_{\rm ML}=(n-1)S^2/n$。

##### 採点基準

- 対数尤度: 5点
- $\mu$ の導出: 5点
- $\sigma^2$ の導出: 7点
- 不偏分散との比較: 3点

<!-- solution-end -->

### I1-01-B02 ガンマ分布の率母数

- Level: B
- 目安時間: 12分
- 主題: 既知形状のガンマ分布の最尤推定
- 使用技術: 対数尤度、再パラメータ化

形状 $a>0$ を既知とし、$X_i$ は独立に

$$
f(x\mid\lambda)
=
\frac{\lambda^a}{\Gamma(a)}x^{a-1}e^{-\lambda x},
\qquad x>0,\ \lambda>0
$$

に従う。

1. $\lambda$ の最尤推定量を求めよ。
2. 尺度母数 $\beta=1/\lambda$ の最尤推定量を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\lambda$ に依存する項だけ残せば

$$
\ell(\lambda)
=na\log\lambda-\lambda\sum_i x_i+\text{const.}
$$

なので

$$
\ell'(\lambda)=\frac{na}{\lambda}-\sum_i x_i=0.
$$

従って

$$
\hat\lambda=\frac{na}{\sum_i x_i}=\frac a{\bar X}.
$$

$\beta=1/\lambda$ は1対1なので

$$
\boxed{\hat\beta=\frac{\bar X}{a}}.
$$

##### 本番答案

$$
\ell(\lambda)=na\log\lambda-\lambda\sum x_i+C
$$

より

$$
\boxed{\hat\lambda=a/\bar X}.
$$

不変性から

$$
\boxed{\hat\beta=\bar X/a}.
$$

##### 採点基準

- 対数尤度: 6点
- $\hat\lambda$: 7点
- 不変性: 3点
- $\hat\beta$: 4点

<!-- solution-end -->

### I1-01-B03 開いた母数空間と最尤推定量の非存在

- Level: B
- 目安時間: 12分
- 主題: 最大値と上限の区別
- 使用技術: 単調性、母数空間

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Poisson}(\lambda)$, $\lambda>0$ とし、すべての観測値が0だった。

1. 尤度を書け。
2. $\lambda>0$ のもとで最尤推定値が存在するか判定せよ。
3. 母数空間を $\lambda\ge0$ に拡張した場合はどうなるか。

<!-- solution-start -->

#### 解答

##### 詳細解答

全て0なので

$$
L(\lambda)=e^{-n\lambda}.
$$

これは $\lambda>0$ で厳密に減少し、

$$
\sup_{\lambda>0}L(\lambda)=1
$$

だが、その値は $\lambda=0$ でしか達成されない。従って $\Theta=(0,\infty)$ では最尤推定量は存在しない。

$\Theta=[0,\infty)$ に拡張すれば $\lambda=0$ が許されるので

$$
\hat\lambda=0.
$$

##### 本番答案

$L(\lambda)=e^{-n\lambda}$ は $\lambda>0$ で単調減少。上限は $\lambda\downarrow0$ で1だが0は母数空間外なので最尤推定量は存在しない。$\lambda\ge0$ なら $\boxed{\hat\lambda=0}$。

##### 採点基準

- 尤度: 5点
- 単調性: 5点
- 上限と最大値の区別: 6点
- 拡張後の解: 4点

<!-- solution-end -->

### I1-01-B04 スコアベクトルと直交性

- Level: B
- 目安時間: 15分
- 主題: 多母数スコア
- 使用技術: 偏微分、期待値

1個の観測 $X\sim N(\mu,\sigma^2)$ について、母数を $(\mu,v)$, $v=\sigma^2$ とする。

1. $U_\mu,U_v$ を求めよ。
2. $E[U_\mu U_v]=0$ を示せ。
3. このとき $\mu$ に対する有効スコアが $U_\mu$ と一致する理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1観測の対数尤度は

$$
\ell=-\frac12\log(2\pi)-\frac12\log v-\frac{(X-\mu)^2}{2v}.
$$

よって

$$
U_\mu=\frac{X-\mu}{v},
$$

$$
U_v=-\frac1{2v}+\frac{(X-\mu)^2}{2v^2}
=\frac{(X-\mu)^2-v}{2v^2}.
$$

従って

$$
E[U_\mu U_v]
=\frac1{2v^3}
E\left[(X-\mu)\{(X-\mu)^2-v\}\right].
$$

中心正規分布の1次・3次中心モーメントはいずれも0なので

$$
E[U_\mu U_v]=0.
$$

従って情報行列の交差成分 $I_{\mu v}=0$ であり、

$$
U_{\mathrm{eff},\mu}
=U_\mu-I_{\mu v}I_{vv}^{-1}U_v
=U_\mu.
$$

##### 本番答案

$$
U_\mu=(X-\mu)/v,\qquad
U_v=\{(X-\mu)^2-v\}/(2v^2).
$$

正規分布では奇数次中心モーメントが0なので

$$
E(U_\mu U_v)=0.
$$

従って $I_{\mu v}=0$ であり $\boxed{U_{\rm eff,\mu}=U_\mu}$。

##### 採点基準

- 2つのスコア: 8点
- 積の期待値の式: 5点
- 0の理由: 3点
- 有効スコア: 4点

<!-- solution-end -->

### I1-01-C01 二項尤度・境界・尤度比

- Level: C
- 目安時間: 25分
- 主題: 尤度の総合操作
- 使用技術: 最尤推定量、相対尤度、対数尤度差

独立なベルヌーイ試行を20回行い、14回成功した。

1. $p$ の尤度を定数倍を除いて書き、最尤推定量を求めよ。
2. $p=0.5$ と $p=0.7$ の尤度比 $L(0.7)/L(0.5)$ を求めよ。
3. 対数尤度差 $\ell(0.7)-\ell(0.5)$ を書け。
4. 成功数が0の場合、最尤推定量をスコア方程式だけで探すのが不適切な理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

成功数 $S=14$ より

$$
L(p)\propto p^{14}(1-p)^6.
$$

したがって

$$
\ell'(p)=\frac{14}{p}-\frac6{1-p}=0
$$

から

$$
\hat p=\frac{14}{20}=0.7.
$$

尤度比は

$$
\frac{L(0.7)}{L(0.5)}
=\frac{0.7^{14}0.3^6}{0.5^{20}}
=2^{20}0.7^{14}0.3^6.
$$

対数尤度差は

$$
14\log\frac{0.7}{0.5}
+6\log\frac{0.3}{0.5}.
$$

成功数0なら

$$
L(p)=(1-p)^{20}
$$

で、$[0,1]$ 上の最大は境界 $p=0$。内点の停留条件 $U(p)=0$ は最大化の必要条件ではないため、スコア方程式だけでは境界解を扱えない。

##### 本番答案

$$
L(p)\propto p^{14}(1-p)^6,\qquad
\hat p=14/20=0.7.
$$

$$
\frac{L(0.7)}{L(0.5)}
=2^{20}0.7^{14}0.3^6,
$$

$$
\ell(0.7)-\ell(0.5)
=14\log(1.4)+6\log(0.6).
$$

成功0なら $L(p)=(1-p)^{20}$ の最大は境界 $p=0$ であり、内点条件 $U=0$ は使えない。

##### 採点基準

- 尤度: 4点
- 最尤推定量: 5点
- 尤度比: 4点
- 対数尤度差: 3点
- 境界解の説明: 4点

<!-- solution-end -->

### I1-01-C02 一様分布の尺度推定と再パラメータ化

- Level: C
- 目安時間: 25分
- 主題: 非正則モデルの最尤推定
- 使用技術: 支持、順序統計量、不変性

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}U(0,\theta)$, $\theta>0$ とし、$M=X_{(n)}$ とする。

1. 尤度を $M$ を用いて書き、$\hat\theta_{\rm ML}$ を求めよ。
2. 区間の長さ $\eta=2\theta$ の最尤推定量を求めよ。
3. 密度を $\theta$ について微分する前に支持を確認すべき理由を説明せよ。
4. $M<\theta$ のとき $P_\theta(M\le m)$ を求め、最尤推定量が標本平均ではなく最大値に依存する理由をデータ情報の観点から説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

尤度は

$$
L(\theta)=\theta^{-n}\mathbf1(M\le\theta).
$$

従って $\theta\ge M$ で単調減少なので

$$
\hat\theta=M.
$$

$\eta=2\theta$ は1対1変換だから

$$
\hat\eta=2M.
$$

このモデルでは、$\theta<M$ の候補は観測最大値を生成できず尤度0になる。従って支持条件こそが最大化問題の一部であり、これを落として微分してはならない。

$0\le m\le\theta$ に対して

$$
P(M\le m)
=P(X_1\le m,\ldots,X_n\le m)
=\left(\frac m\theta\right)^n.
$$

$\theta$ は分布の右端点なので、「観測された値の大きさの平均」より「どこまで大きな値が実際に現れたか」が直接的な制約を与える。尤度も標本を $M$ だけを通じて支持条件へ集約する。

##### 本番答案

$$
L(\theta)=\theta^{-n}\mathbf1(\theta\ge M)
$$

より

$$
\boxed{\hat\theta=M},\qquad
\boxed{\hat\eta=2M}.
$$

$\theta<M$ は尤度0なので、支持を落として微分してはいけない。また

$$
P(M\le m)=(m/\theta)^n,\quad0\le m\le\theta.
$$

$\theta$ は右端点を決めるため、最大値 $M$ が直接の情報を持つ。

##### 採点基準

- 尤度: 5点
- $\hat\theta$: 4点
- $\hat\eta$: 3点
- 支持の説明: 4点
- 最大値の分布と解釈: 4点

<!-- solution-end -->

### I1-01-C03 正規モデルのプロファイル尤度

- Level: C
- 目安時間: 30分
- 主題: 局外母数
- 使用技術: 条件付き最大化、プロファイル尤度

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$ とする。

1. 固定した $\mu$ に対して $\sigma^2$ を最大化する値 $\hat\sigma^2(\mu)$ を求めよ。
2. それを代入した $\mu$ のプロファイル対数尤度が
   $$
   \ell_p(\mu)=C-\frac n2\log\left\{\frac1n\sum_i(x_i-\mu)^2\right\}
   $$
   と書けることを示せ。
3. $\ell_p(\mu)$ を最大にする $\mu$ を求めよ。
4. この操作が「局外母数を固定値に決め打ちする」ことと異なる点を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

固定した $\mu$ に対し

$$
\ell=
C-\frac n2\log\sigma^2
-\frac{Q(\mu)}{2\sigma^2},
\qquad
Q(\mu)=\sum_i(x_i-\mu)^2.
$$

$\sigma^2$ で微分すると

$$
-\frac n{2\sigma^2}+\frac{Q(\mu)}{2(\sigma^2)^2}=0
$$

なので

$$
\hat\sigma^2(\mu)=\frac{Q(\mu)}n.
$$

代入すれば

$$
\ell_p(\mu)
=C'-\frac n2\log\{Q(\mu)/n\},
$$

ただし $-n/2$ など $\mu$ に依存しない項は $C'$ へ吸収した。

$\log$ は単調増加で係数が負なので、$\ell_p$ の最大化は $Q(\mu)$ の最小化と同値。平方和分解

$$
Q(\mu)
=\sum_i(x_i-\bar x)^2+n(\bar x-\mu)^2
$$

より最小は $\mu=\bar x$ である。

プロファイル尤度は各 $\mu$ に対し局外母数 $\sigma^2$ を**その $\mu$ のもとで最も有利な値に再最適化**する。固定値へ決め打ちする操作ではない。

##### 本番答案

$$
\hat\sigma^2(\mu)
=\frac1n\sum_i(x_i-\mu)^2.
$$

これを代入して

$$
\ell_p(\mu)
=C-\frac n2\log\left[\frac1n\sum_i(x_i-\mu)^2\right].
$$

平方和分解から括弧内は $\mu=\bar x$ で最小なので

$$
\boxed{\hat\mu=\bar x}.
$$

プロファイル化では各 $\mu$ ごとに $\sigma^2$ を再最大化する。

##### 採点基準

- $\hat\sigma^2(\mu)$: 5点
- プロファイル対数尤度: 5点
- 平方和分解と $\hat\mu$: 6点
- 局外母数の説明: 4点

<!-- solution-end -->

### I1-01-C04 有効スコアの計算

- Level: C
- 目安時間: 20分
- 主題: 有効スコア
- 使用技術: スコアの共分散・分散、射影の意味

関心母数を $\psi$、1個の局外母数を $\lambda$ とする。ある観測で

$$
U_\psi=3,\qquad U_\lambda=2,
$$

またモデルの下で

$$
\operatorname{Cov}(U_\psi,U_\lambda)=1,
\qquad
\operatorname{Var}(U_\lambda)=4
$$

であった。

1. $U_\lambda$ を差し引く係数を求めよ。
2. $\psi$ の有効スコアを求めよ。
3. $\operatorname{Cov}(U_\psi,U_\lambda)=0$ なら何が簡単になるか説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

差し引く係数は

$$
\frac{\operatorname{Cov}(U_\psi,U_\lambda)}
{\operatorname{Var}(U_\lambda)}
=\frac14.
$$

したがって

$$
\boxed{
U_{\mathrm{eff},\psi}
=3-\frac14\cdot2
=\frac52
}.
$$

共分散が0なら $U_\psi$ と $U_\lambda$ は線形な意味で直交しているため、差し引く成分がなく

$$
\boxed{U_{\mathrm{eff},\psi}=U_\psi}
$$

となる。

##### 本番答案

$$
\frac{\operatorname{Cov}(U_\psi,U_\lambda)}
{\operatorname{Var}(U_\lambda)}=\frac14,
\qquad
\boxed{U_{\rm eff,\psi}=3-(1/4)2=5/2}.
$$

共分散が0なら調整項は0である。

##### 採点基準

- 係数: 5点
- 有効スコア式: 7点
- 数値計算: 4点
- 直交時の解釈: 4点

<!-- solution-end -->

### I1-01-D01 位置尺度一様分布の最尤推定

- Level: D
- 目安時間: 40分
- 主題: 多母数・支持依存モデル
- 使用技術: 最小値・最大値、制約付き最大化

$X_1,\ldots,X_n$ は独立に $U(a,b)$, $a<b$ に従う。$X_{(1)}=\min_iX_i$, $X_{(n)}=\max_iX_i$ とする。

1. $(a,b)$ の尤度を書け。
2. 最尤推定値の候補が $a=X_{(1)}, b=X_{(n)}$ であることを説明せよ。
3. 母数空間を $a<b$ とすると、標本中に異なる値が少なくとも2つある場合にその候補は許容されることを確認せよ。
4. 区間中心 $m=(a+b)/2$ と幅 $w=b-a$ の最尤推定量を求めよ。
5. このモデルで通常のスコア方程式中心の議論が適さない理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

密度は

$$
f(x\mid a,b)
=\frac1{b-a}\mathbf1(a\le x\le b).
$$

よって

$$
L(a,b)
=(b-a)^{-n}
\mathbf1(a\le X_{(1)},\ X_{(n)}\le b).
$$

尤度が正であるためには、区間 $[a,b]$ が全観測を含まなければならない。その制約の下で尤度を最大にするには幅 $b-a$ を最小にすればよい。全観測を含む最短区間は

$$
[a,b]=[X_{(1)},X_{(n)}].
$$

従って標本範囲が正、すなわち $X_{(1)}<X_{(n)}$ なら

$$
\hat a=X_{(1)},\qquad
\hat b=X_{(n)}.
$$

再パラメータ化

$$
m=\frac{a+b}{2},\qquad w=b-a
$$

は $a=m-w/2$, $b=m+w/2$ との1対1変換なので

$$
\boxed{
\hat m=\frac{X_{(1)}+X_{(n)}}2
},
\qquad
\boxed{
\hat w=X_{(n)}-X_{(1)}
}.
$$

このモデルでは支持が $(a,b)$ に依存し、最大点は「全観測をぎりぎり含む」という境界条件で決まる。尤度の滑らかな内点停留条件を解く問題ではない。

なお全観測値が同一なら $X_{(1)}=X_{(n)}$ で、$a<b$ を保ったまま幅を0へ近づけると尤度が無限大へ発散するため、有限の最尤推定量は存在しない。この点も母数空間と最大値の存在確認が必要であることを示す。

##### 本番答案

$$
L(a,b)
=(b-a)^{-n}
\mathbf1\{a\le X_{(1)},\,X_{(n)}\le b\}.
$$

正の尤度を保ちつつ $b-a$ を最小化すればよいから、$X_{(1)}<X_{(n)}$ なら

$$
\boxed{\hat a=X_{(1)},\quad\hat b=X_{(n)}}.
$$

従って不変性より

$$
\boxed{\hat m=\frac{X_{(1)}+X_{(n)}}2,\quad
\hat w=X_{(n)}-X_{(1)}}.
$$

支持が母数依存で最大点が制約境界にあるため、通常のスコア方程式中心の解法は適さない。全観測同値なら幅を0へ近づけて尤度が発散し、最尤推定量は存在しない。

##### 採点基準

- 尤度と支持条件: 5点
- 最短区間の議論: 5点
- $(\hat a,\hat b)$: 3点
- $(\hat m,\hat w)$: 3点
- 非正則性・同値標本時の非存在: 4点

<!-- solution-end -->

## 6. 本番ドリル

### I1-01-DRILL01 指数寿命モデルの尤度から再パラメータ化まで

- Level: C
- 目安時間: 30分
- 主題: 尤度・スコア・最尤推定量・不変性
- 使用技術: 指数分布、対数尤度、二階微分

ある部品の寿命 $X_1,\ldots,X_n$ は独立に率 $\lambda>0$ の指数分布

$$
f(x\mid\lambda)=\lambda e^{-\lambda x},\qquad x\ge0
$$

に従う。総稼働時間を $T=\sum_iX_i$ とする。

1. 尤度と対数尤度を $T$ で表せ。
2. スコア $U(\lambda)$ を求め、$\lambda$ の最尤推定量を導出せよ。
3. その点が最大であることを確認せよ。
4. 平均寿命 $\mu=1/\lambda$ の最尤推定量を求めよ。
5. 同じ $T$ を持つ2つの標本は $\lambda$ に関して同じ尤度比を与えることを説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

独立性より

$$
L(\lambda)
=\lambda^n e^{-\lambda T},
$$

$$
\ell(\lambda)=n\log\lambda-\lambda T.
$$

従って

$$
U(\lambda)=\frac n\lambda-T.
$$

$T>0$ なら

$$
U(\lambda)=0
\iff
\hat\lambda=\frac nT=\frac1{\bar X}.
$$

また

$$
\ell''(\lambda)=-\frac n{\lambda^2}<0
$$

なので一意な最大である。

$\mu=1/\lambda$ は1対1なので

$$
\boxed{\hat\mu=\frac Tn=\bar X}.
$$

尤度はデータ $x_1,\ldots,x_n$ を $T$ だけを通じて含む。従って2標本が同じ $T$ を持てば、任意の $\lambda_1,\lambda_2$ について

$$
\frac{L(\lambda_1)}{L(\lambda_2)}
=\left(\frac{\lambda_1}{\lambda_2}\right)^n
e^{-(\lambda_1-\lambda_2)T}
$$

が同一になる。これは S1-02 で扱った十分性との接続でもある。

##### 本番答案

$$
L(\lambda)=\lambda^ne^{-\lambda T},
\qquad
\ell(\lambda)=n\log\lambda-\lambda T.
$$

$$
U(\lambda)=n/\lambda-T=0
\Rightarrow
\boxed{\hat\lambda=n/T}.
$$

$\ell''=-n/\lambda^2<0$ より最大。不変性から

$$
\boxed{\hat\mu=T/n=\bar X}.
$$

また尤度比は

$$
\frac{L(\lambda_1)}{L(\lambda_2)}
=(\lambda_1/\lambda_2)^n
e^{-(\lambda_1-\lambda_2)T}
$$

で $T$ のみに依存する。

##### 採点基準

- 尤度・対数尤度: 4点
- スコア: 4点
- $\hat\lambda$: 4点
- 最大値確認: 3点
- $\hat\mu$: 2点
- 尤度比と十分性の説明: 3点

<!-- solution-end -->

## 7. 過去問との対応

本章では特定年度の公式問題文を転載しません。統計検定1級で頻出する次の操作を、本章の演習へ分解して収録しています。

- 標準分布族から尤度を組み立て、対数尤度を微分する。
- 複数母数の最尤推定を連立偏微分または条件付き最大化で処理する。
- 端点・支持が母数に依存するモデルで、微分より先に母数の許容範囲を決める。
- 再パラメータ化された量の最尤推定量を不変性で求める。
- スコア検定へつながるスコアおよび有効スコアを計算する。

後続の I1-02 で推定量の良さ、I2-01 で最尤推定量の漸近分布、I3-02 で尤度比・ワルド・スコア検定へ接続します。

## 8. 章末チェック

- 尤度を「母数の確率」と誤解せず、データ固定・母数可変の関数として説明できる。
- 独立標本の尤度を積で、対数尤度を和で書ける。
- 内点解ではスコア方程式を使い、最大値確認までできる。
- 境界解では $U(\theta)=0$ に固執せず、単調性・端点を調べられる。
- 母数依存の支持を指示関数として尤度に残せる。
- ベルヌーイ、ポアソン、指数、正規、一様分布の最尤推定量を導出できる。
- 最尤推定量の不変性から変換後の母数の最尤推定量を求められる。
- 多母数スコアベクトルと有効スコアの意味を説明できる。
- 正則条件が破れるモデルでは $E[U]=0$ などの標準公式を無条件に使わない。
