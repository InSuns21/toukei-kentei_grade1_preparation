---
id: prob-characteristic-function-definition
title: 特性関数を期待値の式で定義し常に存在することを確認する
category: math-probability
subcategory: math-distribution-functions
topic: characteristic-function-definition
type: recognition
difficulty: 2
priority: S
hashtags: [特性関数, 定義, 存在]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: additional, topic: 特性関数（公式MGF/PGFの拡張・ユーザー要請） }]
---
## 問題
確率変数 $X$ の特性関数を定義し、それが実変数 $t$ について常に存在することを述べよ。

## 答え
複素値関数
$$\varphi_X(t)=E[e^{itX}]=E[\cos(tX)]+iE[\sin(tX)].$$
$t$ は実数。$\lvert e^{itX}\rvert=1$ より、期待値は常に有限で存在する（絶対収束）。

## 使用公式・定理
特性関数は $e^{itX}$ の期待値として定義され、モーメント母関数より広い分布で定義される。モーメント母関数は指数関数 $e^{tX}$ の期待値なので、$t=0$ の近傍で有限を要する。

## 計算例
$X\sim\operatorname{Bernoulli}(p)$ の特性関数は
$$\varphi_X(t)=1-p+pe^{it}.$$
$t$ が虚数でない実数なら $\lvert e^{it}\rvert=1$ で収束が保証される。

## 一手
$\lvert e^{itX}\rvert=1$ だから、どんな分布でも $\varphi_X(t)$ は絶対収束する。母関数と使い分ける。

## 注意
特性関数は実軸全体で定義される。モーメント母関数と異なり、$t$ の虚数部を持たないことが存在の鍵。

<!-- CARD -->
---
id: prob-characteristic-function-sum
title: 独立な和の特性関数を積で表す
category: math-probability
subcategory: math-distribution-functions
topic: characteristic-function-sum
type: theorem
difficulty: 2
priority: S
hashtags: [特性関数, 独立和, 積]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: additional, topic: 特性関数（公式MGF/PGFの拡張・ユーザー要請） }]
---
## 問題
独立な $X_1,\ldots,X_n$ の和 $S=X_1+\cdots+X_n$ の特性関数を各 $\varphi_{X_i}(t)$ で表せ。

## 答え
$$\varphi_S(t)=\prod_{i=1}^n\varphi_{X_i}(t).$$
独立なら積に分解できる。母関数と同じ性質。

## 使用公式・定理
$\varphi_S(t)=E[e^{it\sum X_i}]=\prod_iE[e^{itX_i}]=\prod_i\varphi_{X_i}(t)$。独立性により積の期待値が期待値の積に分解する。

## 計算例
$X_1,\ldots,X_n$ が独立に $\operatorname{Bernoulli}(p)$ のとき
$$\varphi_S(t)=(1-p+pe^{it})^n,$$
これは $\operatorname{Binomial}(n,p)$ の特性関数で、分布が一意に定まる（一意性）。

## 一手
$e^{it\sum X_i}=\prod_i e^{itX_i}$ と分解し、全項が同じ実数 $t$ を持つことと独立性を利用して期待値を積に分ける。

## 注意
実数 $t$ が全項で共通だからこそ、$\varphi_S(t)=E[e^{itS}]$ が $\prod_iE[e^{itX_i}]$ と因数分解できる。積への分解は個々の独立性が不可欠。既存の `prob-mgf-iid-sum`・`prob-pgf-independent-sum` と同じ構造。

<!-- CARD -->
---
id: prob-characteristic-function-uniqueness
title: 特性関数の一意性で分布を対応付ける
category: math-probability
subcategory: math-distribution-functions
topic: characteristic-function-uniqueness
type: theorem
difficulty: 3
priority: S
hashtags: [特性関数, 一意性, 分布の同定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: additional, topic: 特性関数（公式MGF/PGFの拡張・ユーザー要請） }]
---
## 問題
2つの分布の特性関数が一致するとき、分布はどうなるか。また応用上の意義を述べよ。

## 答え
特性関数が実変数 $t$ の関数として一致すれば、対応する分布は一致する（一意性定理）。再生性や和の分布の同定に使える。

## 使用公式・定理
特性関数による一意性：$\varphi_X(t)=\varphi_Y(t)$（すべての実数 $t$）なら $X,Y$ は同分布。

## 計算例
$\varphi(t)=\exp\left(i\mu t-\frac{\sigma^2t^2}{2}\right)$ が正規分布 $N(\mu,\sigma^2)$ の特性関数であることを知っていれば、この形の特性関数を持つ変数は $N(\mu,\sigma^2)$ に従う。

## 一手
「和の特性関数」＝積の形を計算し、既知の特性関数の形と突き合わせて分布を同定する。

## 注意
特性関数は実軸全体で定義され一意性が保証される。モーメント母関数のように「原点近傍で有限」という条件を明示しなくて済む利点がある。

<!-- CARD -->
---
id: prob-characteristic-function-normal
title: 正規分布の特性関数を導出する
category: math-probability
subcategory: math-distribution-functions
topic: characteristic-function-normal
type: calc_step
difficulty: 3
priority: S
hashtags: [特性関数, 正規分布, モーメント母関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: additional, topic: 特性関数（公式MGF/PGFの拡張・ユーザー要請） }]
---
## 問題
$X$ を正規分布 $N(\mu,\sigma^2)$ に従う確率変数とする。$X$ の特性関数を求めよ。

## 答え
$$\varphi_X(t)=e^{i\mu t-\frac{\sigma^2t^2}{2}}.$$

## 使用公式・定理
正規分布のモーメント母関数 $M_X(t)=e^{\mu t+\frac{\sigma^2t^2}{2}}$ に対し、$t$ を $it$ に置き換えた形
$$\varphi_X(t)=M_X(it)=e^{i\mu t+\frac{\sigma^2(it)^2}{2}}=e^{i\mu t-\frac{\sigma^2t^2}{2}}.$$

## 計算例
$X\sim N(2,9)$ なら $\varphi_X(t)=e^{i2t-\frac{9t^2}{2}}$。$t$ は実数で常に定義される。

## 一手
正規分布は特性関数が既知の代表例。$it$ の置き換えでモーメント母関数から得る。モーメント母関数の形の同定は既存の `prob-mgf-identify-normal` を参照。

## 注意
$N(\mu,\sigma^2)$ の第2引数は分散。$N(\mu,\sigma^2)$ のモーメント母関数は指数部が $t$ の整関数（多項式）なので、$t\mapsto it$ の置き換えはこの場合に解析接続として正当化される。一般の分布では $M_X(it)=E[e^{itX}]$ がモーメント母関数への $it$ の形式的代入と必ずしも一致しない点に注意。指数部の符号が $-\sigma^2t^2/2$ になる点も確認する。

<!-- CARD -->
---
id: prob-cumulant-mgf
title: キュムラント母関数を対数モーメント母関数で定義する
category: math-probability
subcategory: math-distribution-functions
topic: cumulant-mgf
type: recognition
difficulty: 3
priority: S
hashtags: [キュムラント母関数, 対数, モーメント母関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: additional, topic: キュムラント母関数（公式MGF/PGFの拡張・ユーザー要請） }]
---
## 問題
キュムラント母関数 $K_X(t)=\log M_X(t)$ を定義し、その展開 $K_X(t)=\sum_{r\ge1}\kappa_r t^r/r!$ の係数 $\kappa_r$（第 $r$ キュムラント）から、第1・第2キュムラントと期待値・分散の関係を述べよ。

## 答え
$M_X(t)$ をモーメント母関数とし、原点の近傍で $M_X(t)>0$ のとき
$$K_X(t)=\log M_X(t).$$
これを $t=0$ で展開し、$\kappa_r$ を第 $r$ キュムラントとすると
$$K_X(t)=\sum_{r=1}^{\infty}\kappa_r\frac{t^r}{r!},\qquad \kappa_1=E[X],\quad \kappa_2=\operatorname{Var}(X).$$

## 使用公式・定理
$K_X(t)=\log M_X(t)$ を $t=0$ で展開した $K_X(t)=\sum_{r\ge1}\kappa_r t^r/r!$ の係数 $\kappa_r$ を第 $r$ キュムラントとする。

## 計算例
$X\sim N(\mu,\sigma^2)$ なら $M_X(t)=e^{\mu t+\frac{\sigma^2t^2}{2}}$ より
$$K_X(t)=\mu t+\frac{\sigma^2}{2}t^2.$$
したがって $\kappa_1=\mu$、$\kappa_2=\sigma^2$、$r\ge3$ は0。

## 一手
対数を取って展開係数を読む。第1・第2キュムラントは平均・分散に一致する。

## 注意
正規分布では3次以上のキュムラントがすべて0になる。モーメント母関数が存在することが前提。平均・分散は既存の `prob-mgf-mean-variance` と一致する（第1・第2キュムラントの観点からの再整理）。

<!-- CARD -->
---
id: prob-cumulant-sum
title: 独立和のキュムラントが加法性を持つことを示す
category: math-probability
subcategory: math-distribution-functions
topic: cumulant-sum
type: theorem
difficulty: 3
priority: A
hashtags: [キュムラント, 独立和, 加法性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: additional, topic: キュムラント母関数（公式MGF/PGFの拡張・ユーザー要請） }]
---
## 問題
独立な $X,Y$ の和 $S=X+Y$ の各キュムラントを $X,Y$ のキュムラントで表せ。

## 答え
$$\kappa_r(S)=\kappa_r(X)+\kappa_r(Y)\quad(r\ge1).$$
独立和のキュムラントは各次数ごとに加法性を持つ。

## 使用公式・定理
$M_S(t)=M_X(t)M_Y(t)$ だから
$$K_S(t)=\log M_S(t)=\log M_X(t)+\log M_Y(t)=K_X(t)+K_Y(t).$$

## 計算例
$X,Y$ が独立に $N(\mu_1,\sigma_1^2),N(\mu_2,\sigma_2^2)$ なら $S$ の1次・2次キュムラントは
$$\kappa_1=\mu_1+\mu_2,\quad \kappa_2=\sigma_1^2+\sigma_2^2,$$
3次以上は0。$S\sim N(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$ が再生する。

## 一手
和の母関数＝積 → 対数で和 → キュムラントの加法性が瞬時に出る。

## 注意
期待値・分散だけでなくすべての次数で加法性が成り立ち、「和の分布の同定」に強力。

<!-- CARD -->
---
id: prob-characteristic-nonexistence-mgf
title: モーメント母関数が不存在な分布でも特性関数は存在する
category: math-probability
subcategory: math-distribution-functions
topic: characteristic-no-mgf
type: pitfall
difficulty: 3
priority: S
hashtags: [特性関数, モーメント母関数, 存在]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: additional, topic: 特性関数（公式MGF/PGFの拡張・ユーザー要請） }]
---
## 問題
対数正規分布やコーシー分布ではモーメント母関数が存在しない。それらでも特性関数は定義されるか。

## 答え
定義される。特性関数 $\varphi_X(t)=E[e^{itX}]$ は $\lvert e^{itX}\rvert=1$ により常に絶対収束する。モーメント母関数の不存在と特性関数の存在は両立する。

## 使用公式・定理
モーメント母関数は実指数 $e^{tX}$ の期待値 $E[e^{tX}]$ であり、$\lvert e^{tX}\rvert=e^{tX}$ が $t>0$ で発散し得るため不存在となり得る。特性関数は $e^{itX}$ で常に有界（$\lvert e^{itX}\rvert=1$）なので実変数 $t$ 全体で定義される。

## 計算例
コーシー分布 $\operatorname{Cauchy}(0,\gamma)$ は平均すら存在しないが、特性関数は
$$\varphi_X(t)=e^{-\gamma\lvert t\rvert},$$
と実軸全域で定義される。対数正規分布も特性関数は存在する（閉形式は複雑）。

## 一手
「モーメント母関数が無い」イコール「分布が扱えない」ではない。特性関数が常に存在するので、モーメントが無い分布でも和・同定を扱える。

## 注意
特性関数は複素数値だが、期待値の存在は $\lvert e^{itX}\rvert=1$ により複素積分を必要とせずに保証される。一意性と独立性の議論には十分。

<!-- CARD -->