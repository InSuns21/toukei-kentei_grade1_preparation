---
id: enginf-linear-combination-normal
title: 回帰係数の線形結合の分布を求める
category: applied-engineering
subcategory: engineering-linear-inference
topic: linear-combination-distribution
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 線形結合の分布
  - 正規分布
  - 回帰係数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形結合の分布
archive_reason: duplicate
canonical_card: mv-covariance-linear-transform
coverage_card: mv-covariance-linear-transform
archive_note: 正規ベクトルの線形結合 a^T beta_hat の平均・分散・正規分布は
  mv-covariance-linear-transform へ有限標本の exact な結論として吸収済み。分散 a^T C a
  と係数差での共分散項も保持し、漸近正規性との違いも正本で明示したため工学側カード固有の技能は残らない。
---
## 問題
多変量正規分布 $\widehat{\boldsymbol\beta}\sim N_k(\boldsymbol\beta,\sigma^2C)$ のとき、$L=\boldsymbol a^{\mathsf T}\widehat{\boldsymbol\beta}$ の分布を求めよ。
## 記号・用語
$\boldsymbol a$ は既知の $k\times1$ 係数ベクトル、$C$ は既知の分散構造行列である。
## 使用公式・定理
多変量正規ベクトルの線形結合は1変量正規分布に従う。
## 一手／方針
平均には $a^{\mathsf T}$ を掛け、分散には二次形式 $a^{\mathsf T}(\sigma^2C)a$ を作る。
## 答え
$$L\sim N\left(\boldsymbol a^{\mathsf T}\boldsymbol\beta,
\sigma^2\boldsymbol a^{\mathsf T}C\boldsymbol a\right).$$
## 計算例
$a=(1,-1)^{\mathsf T}$ なら $L=\widehat\beta_1-\widehat\beta_2$ は係数差の推定量である。
## 注意
分散は $a^{\mathsf T}Ca$ であり、成分分散の単純和とは限らない。

<!-- CARD -->

---
id: enginf-contrast-estimate-se
title: 線形対比の推定値と標準誤差を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: linear-contrast
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 線形対比
  - 標準誤差
  - 線形モデル
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形対比
archive_reason: duplicate
canonical_card: reg-general-linear-hypothesis
coverage_card: anova-contrast-definition
archive_note: 一般の線形制約 c^T beta=L0 に対する推定値 c^T beta_hat と標準誤差 sqrt(c^T V_hat
  c)、共分散を含む数値例を reg-general-linear-hypothesis
  へ吸収済み。工学側にあった「一般の回帰係数対比でも係数和0」という過剰条件は正本化時に修正し、係数和0は群平均の対比で用いる条件として
  anova-contrast-definition と役割分担した。
---
## 問題
$\widehat\beta=(10,3,5)^{\mathsf T}$、推定分散共分散行列が $\widehat V=\operatorname{diag}(1,0.25,0.36)$ である。$c=(0,1,-1)^{\mathsf T}$ の対比を求めよ。
## 記号・用語
線形対比は、群効果などに掛ける係数の和が0となる線形結合である。
## 使用公式・定理
推定値は $\widehat L=c^{\mathsf T}\widehat\beta$、標準誤差は $\operatorname{SE}(\widehat L)=\sqrt{c^{\mathsf T}\widehat Vc}$。
## 一手／方針
係数差を作り、その分散を二次形式で求める。
## 答え
$$\widehat L=3-5=-2,$$
$$\operatorname{SE}(\widehat L)=\sqrt{0.25+0.36}=\sqrt{0.61}\approx0.781.$$
## 計算例
共分散が0.10なら分散は $0.25+0.36-2(0.10)=0.41$ となる。
## 注意
切片の係数0も含めてベクトルの次元を揃える。

<!-- CARD -->

---
id: enginf-contrast-t-test
title: 線形対比をt検定する
category: applied-engineering
subcategory: engineering-linear-inference
topic: contrast-test
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 線形対比
  - t検定
  - 線形制約
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形対比
archive_reason: duplicate
canonical_card: reg-general-linear-hypothesis
coverage_card: reg-general-linear-hypothesis
archive_note: 1本の一般線形制約に対する t=(c^T beta_hat-L0)/SE、自由度、両側判定、95%信頼区間、q=1 で F=t^2
  となる関係まで reg-general-linear-hypothesis へ統合済み。工学側の -2/0.781=-2.56
  の数値例も正本に保持されている。
---
## 問題
$H_0:c^{\mathsf T}\beta=0$ に対し、$c^{\mathsf T}\widehat\beta=-2$、標準誤差0.781、残差自由度20とする。検定統計量と5%両側判定を求めよ。
## 記号・用語
残差自由度は誤差分散推定に使う自由度である。
## 使用公式・定理
正規線形モデルのもとで
$$T=\frac{c^{\mathsf T}\widehat\beta-c^{\mathsf T}\beta_0}{\operatorname{SE}(c^{\mathsf T}\widehat\beta)}\sim t_{20}.$$
## 一手／方針
帰無値0からの差を標準誤差で割り、$t_{20,0.025}=2.086$ と比較する。
## 答え
$$T=\frac{-2}{0.781}\approx-2.56.$$
$|T|=2.56>2.086$ なので5%水準で $H_0$ を棄却する。
## 計算例
係数差の95%信頼区間は $-2\pm2.086(0.781)\approx(-3.63,-0.37)$。
## 注意
片側検定なら臨界値と棄却方向が変わる。
