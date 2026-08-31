---
id: enginf-glm-three-components
title: 一般化線形モデルの3要素をモデル式から識別する
category: applied-engineering
subcategory: engineering-linear-inference
topic: glm-components
type: recognition
difficulty: 2
priority: A
hashtags:
  - 一般化線形モデル
  - リンク関数
  - 線形予測子
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデル
archive_reason: duplicate
canonical_card: glm-three-components
coverage_card: glm-three-components
archive_note: 一般側の正本はGLMの確率成分・系統成分・リンク関数を識別するだけでなく、指数型分布族、自然母数、正準リンク、ポアソン・二項の具体例まで一続きで扱う。engineering側のポアソン対数リンク例は同じ判断単位の一例なので吸収可能。
---
## 問題
$Y_i\mid x_i\sim\operatorname{Poisson}(\mu_i)$、$\log\mu_i=\beta_0+\beta_1x_i$ について、一般化線形モデルの3要素を答えよ。
## 記号・用語
3要素は確率成分、系統成分、リンク関数である。
## 使用公式・定理
確率成分は応答の指数型分布族、系統成分は線形予測子 $\eta_i=x_i^{\mathsf T}\beta$、リンクは $g(\mu_i)=\eta_i$。
## 一手／方針
分布、右辺の線形式、平均と線形式を結ぶ変換を切り分ける。
## 答え
確率成分はポアソン分布、系統成分は $\eta_i=\beta_0+\beta_1x_i$、リンク関数は $g(\mu)=\log\mu$。
## 計算例
二項ロジットモデルなら確率成分は二項分布、リンクはロジット。
## 注意
リンク関数は応答そのものではなく条件付き平均へ作用する。

<!-- CARD -->

---
id: enginf-exponential-family-mean-variance
title: 指数型分布族から平均と分散を微分で求める
category: applied-engineering
subcategory: engineering-linear-inference
topic: exponential-family
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 一般化線形モデル
  - 指数型分布族
  - 分散関数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデル
archive_reason: duplicate
canonical_card: glm-three-components
coverage_card: glm-three-components
archive_note: 一般側のGLM正本に指数型分布族 f(y;theta,phi)=exp[{y
  theta-b(theta)}/a(phi)+c(y,phi)] と E[Y]=b'(theta), Var(Y)=a(phi)b''(theta)
  が既に統合され、ポアソンでの具体確認も含むため完全重複。
---
## 問題
$f(y;\theta,\phi)=\exp[\{y\theta-b(\theta)\}/a(\phi)+c(y,\phi)]$ の平均と分散を $b$ の微分で表せ。
## 記号・用語
$\theta$ は正準母数、$\phi$ は分散母数、$b$ は累積母関数に対応する関数である。
## 使用公式・定理
対数正規化条件を $\theta$ で1回・2回微分する。
## 一手／方針
スコアの期待値0と、その分散または2階微分を使う。
## 答え
$$E[Y]=b'(\theta),\qquad \operatorname{Var}(Y)=a(\phi)b''(\theta).$$
## 計算例
ポアソン分布では $b(\theta)=e^\theta$、$a(\phi)=1$ なので平均と分散はいずれも $e^\theta$。
## 注意
$a(\phi)$ の規約は分布族の表現により異なるため密度式と一緒に読む。

<!-- CARD -->

---
id: enginf-binomial-glm-loglikelihood
title: 二項一般化線形モデルの対数尤度を書く
category: applied-engineering
subcategory: engineering-linear-inference
topic: binomial-glm-likelihood
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 一般化線形モデル
  - 二項分布
  - 対数尤度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデル
archive_reason: duplicate
canonical_card: glm-logistic-score
coverage_card: glm-logistic-score
archive_note: 一般側のロジスティック回帰正本はベルヌーイ対数尤度からスコア・情報行列・IRLSまで扱い、さらに二項応答
  Y_i~Bin(m_i,p_i) の対数尤度 y_i log p_i+(m_i-y_i)log(1-p_i)+const と m_i
  を含む重みまで明記している。engineering側の y_i eta_i-m_i log(1+e^{eta_i}) は同一式の変形なので独立カード不要。
---
## 問題
観測間で独立に $Y_i\sim\operatorname{Binomial}(m_i,p_i)$、$\operatorname{logit}(p_i)=x_i^{\mathsf T}\beta$ とする。$\beta$ に依存する対数尤度を書け。
## 記号・用語
$m_i$ は試行数、$Y_i$ は成功数、$\eta_i=x_i^{\mathsf T}\beta$ は線形予測子である。
## 使用公式・定理
$p_i=e^{\eta_i}/(1+e^{\eta_i})$、$\log(1-p_i)=-\log(1+e^{\eta_i})$。
## 一手／方針
二項対数尤度へロジットの逆変換を代入する。
## 答え
定数項を除き
$$\ell(\beta)=\sum_i\left[Y_i\eta_i-m_i\log(1+e^{\eta_i})\right].$$
## 計算例
微分するとスコアは $\sum_i x_i(Y_i-m_ip_i)$。
## 注意
ベルヌーイデータは $m_i=1$ の特別な場合である。
