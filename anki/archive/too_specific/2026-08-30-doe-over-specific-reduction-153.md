---
id: engdesign-random-slope-covariance
title: 変量切片・変量傾きモデルの群内共分散を計算する
category: applied-engineering
subcategory: engineering-design
topic: random-slope-covariance
type: calc_step
difficulty: 1
priority: B
hashtags:
  - 固定効果
  - 変量効果
  - 因子
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 固定効果・変量効果
archive_reason: low_priority
canonical_card: engdesign-fixed-effect-hypothesis
archive_note: 理工学シラバスの固定効果・変量効果に対して、変量傾きまで独立カード化するのは発展的。固定/変量の判別、変量切片の分散・共分散・級内相関をcanonical
  cardへ統合済み。
---
## 問題
同一群の応答が $Y(x)=\beta_0+\beta_1x+U_0+U_1x+\varepsilon(x)$ に従う。$\operatorname{Var}(U_0)=4$、$\operatorname{Var}(U_1)=1$、$\operatorname{Cov}(U_0,U_1)=0.5$ のとき、$x=0$ と $x'=2$ の応答の共分散を求めよ。
## 記号・用語
$U_0,U_1$ は群共有のゼロ平均変量切片・変量傾き、異なる時点の誤差は互いに独立で両変量効果とも独立とする。
## 使用公式・定理
$$\operatorname{Cov}\{Y(x),Y(x')\}=\operatorname{Var}(U_0)+(x+x')\operatorname{Cov}(U_0,U_1)+xx'\operatorname{Var}(U_1).$$
## 一手／方針
$x=0,x'=2$ を3項へ代入する。
## 答え
$4+(0+2)(0.5)+0(2)(1)=5$。
## 計算例
両時点が0から離れると変量傾きが共分散へ寄与する。
## 注意
同一時点の分散には測定誤差分散も加わるが、異時点共分散には独立誤差は寄与しない。

<!-- CARD -->

---
id: engdesign-random-effect-blup
title: 変量効果のBLUP縮小量を計算する
category: applied-engineering
subcategory: engineering-design
topic: random-effect-blup
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 変量効果
  - 分散成分
  - 群内相関
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変量効果
archive_reason: low_priority
canonical_card: engdesign-fixed-effect-hypothesis
archive_note: BLUPによる個別群効果予測は固定効果・変量効果の基本判別より発展的で、1級理工学の正本セットでは独立カードにしない。分散成分と級内相関はcanonical
  cardで保持する。
---
## 問題
既知の $\mu,\tau^2,\sigma^2$ を持つ独立同分散の変量切片模型 $Y_{ij}=\mu+U_i+\varepsilon_{ij}$ で、$E[U_i]=E[\varepsilon_{ij}]=0$ とする。群平均 $\overline Y_i=12$、$\mu=10$、$\tau^2=4$、$\sigma^2=9$、群サイズ $n=3$ のとき群平均のBLUPを求めよ。
## 記号・用語
BLUPはbest linear unbiased prediction（最良線形不偏予測）で、群平均を全体平均へ縮小する。
## 使用公式・定理
$B=\tau^2/(\tau^2+\sigma^2/n)$、予測群平均は $\widehat\mu_i=\mu+B(\overline Y_i-\mu)$。
## 一手／方針
群平均の誤差分散 $\sigma^2/n$ と縮小係数Bを求める。
## 答え
$B=4/(4+9/3)=4/7$ より
$$\widehat\mu_i=10+\frac47(12-10)=\frac{78}{7}\approx11.14.$$
## 計算例
生の群平均12より全体平均10へ縮小される。
## 注意
分散成分を推定して使う経験BLUPでは追加の推定不確実性がある。

<!-- CARD -->

---
id: engdesign-rerandomization-balance
title: 共変量釣合いを使う再無作為化候補を選ぶ
category: applied-engineering
subcategory: engineering-design
topic: rerandomization
type: recognition
difficulty: 1
priority: B
hashtags:
  - 実験の計画と実施
  - 完全無作為化
  - 処置効果
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験の計画と実施
archive_reason: low_priority
archive_note: 共変量釣合い基準による再無作為化は、公式理工学シラバスの実験計画項目より発展的。基本の無作為化・ブロック化を優先するため隔離する。
---
## 問題
処置前共変量の群平均差が、無作為割付候補1で2.4、候補2で0.3である。許容基準を絶対差1以下とした再無作為化で採用する候補を答えよ。
## 記号・用語
再無作為化は事前に定めた釣合い基準を満たすまで無作為割付を引き直す方法である。
## 使用公式・定理
採択規則は応答を見ず、処置前共変量だけで全候補へ同じように適用する。
## 一手／方針
各候補の絶対平均差を基準1と比較する。
## 答え
候補1は2.4で棄却、候補2は0.3で採用する。
## 計算例
採用後の割付確率を反映する無作為化推測または設計に対応した解析を行う。
## 注意
結果を見て釣合い基準を変えると選択バイアスを生む。

<!-- CARD -->

---
id: engdesign-graeco-latin-df
title: グレコ・ラテン方格法の自由度を配分する
category: applied-engineering
subcategory: engineering-design
topic: graeco-latin-square
type: calc_step
difficulty: 2
priority: B
hashtags:
  - ブロック化
  - ラテン方格法
  - 自由度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブロック化
archive_reason: low_priority
archive_note: グレコ・ラテン方格の自由度公式は、公式理工学シラバスに明記されたブロック化・直交表・交絡法に比べ優先度が低く、600枚正本では発展扱いとする。
---
## 問題
$p=5$ のグレコ・ラテン方格で、行、列、ラテン処置、ギリシャ処置、誤差、全体の自由度を求めよ。
## 記号・用語
直交する2つのラテン方格を重ね、2種類の処置効果を行・列と分離する。
## 使用公式・定理
4つの主効果は各 $p-1$、誤差は $(p-1)(p-3)$、全体は $p^2-1$。
## 一手／方針
$p=5$ を代入し、5区分の自由度和を確かめる。
## 答え
行4、列4、ラテン処置4、ギリシャ処置4、誤差8、全体24で、$4+4+4+4+8=24$。
## 計算例
$p=5$ では2処置因子を各5水準で25実施により評価できる。
## 注意
2つの処置因子間の交互作用は通常この計画から分離できない。

<!-- CARD -->

---
id: engdesign-precision-weighted-block-difference
title: 精度が異なるブロック内処置差を重み付き統合する
category: applied-engineering
subcategory: engineering-design
topic: weighted-block-contrast
type: calc_step
difficulty: 2
priority: B
hashtags:
  - ブロック化
  - 局所管理
  - 誤差分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブロック化
archive_reason: low_priority
canonical_card: engdesign-confounder-randomization
archive_note: 精度の異なるブロック差の逆分散重み統合は一般的なメタ解析的計算へ寄り、実験計画のブロック化正本から外れる。ブロック化の目的と加法モデルはcanonical
  cardで保持する。
---
## 問題
3ブロックの処置差B−Aが $(2,4,8)$、その分散が $(1,2,4)$ である。独立なブロック差を逆分散重みで統合せよ。
## 記号・用語
逆分散重みは精度の高いブロック差へ大きい重みを与える。
## 使用公式・定理
$$\widehat\Delta=\frac{\sum_jw_jD_j}{\sum_jw_j},\qquad w_j=1/\operatorname{Var}(D_j).$$
## 一手／方針
分散の逆数 $(1,1/2,1/4)$ を作り、加重平均を取る。
## 答え
$$\widehat\Delta=\frac{1(2)+(1/2)4+(1/4)8}{1+1/2+1/4}=\frac6{1.75}=\frac{24}{7}\approx3.43.$$
## 計算例
推定分散は $1/\sum_jw_j=4/7\approx0.571$。
## 注意
分散が同じデータから推定される場合は重み推定の不確実性も考慮する。

<!-- CARD -->

---
id: engdesign-gage-rr-variance
title: Gage R&Rの分散成分から測定変動割合を求める
category: applied-engineering
subcategory: engineering-design
topic: gage-rr
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 変量効果
  - Gage R&R
  - 分散成分
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変量効果
archive_reason: low_priority
canonical_card: engdesign-fixed-effect-hypothesis
archive_note: Gage R&R固有の分散割合計算は、理工学シラバスの変量効果そのものより応用先が限定される。分散成分の基本は固定/変量効果正本へ残す。
---
## 問題
部品間分散9、測定者間分散4、繰返し誤差分散16と推定された交差型Gage R&Rで、総分散と測定システム分散の割合を求めよ。
## 記号・用語
測定システム分散は再現性成分（測定者）と繰返し性成分の和とする。
## 使用公式・定理
$\sigma^2_{\mathrm{GRR}}=\sigma^2_{\mathrm{operator}}+\sigma^2_{\mathrm{repeat}}$、総分散は部品間分散との和。
## 一手／方針
測定者4と繰返し16を足し、全体29で割る。
## 答え
$\sigma^2_{\mathrm{GRR}}=4+16=20$、総分散は $9+20=29$、割合は $20/29\approx0.690$。
## 計算例
標準偏差割合は $\sqrt{20}/\sqrt{29}\approx0.830$ で、分散割合とは異なる。
## 注意
部品×測定者交互作用を含む設計では、その分散成分も再現性側へ加える規約がある。
