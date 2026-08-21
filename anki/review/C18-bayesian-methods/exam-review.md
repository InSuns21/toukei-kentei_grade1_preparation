# C18-bayesian-methods 試験適合性査読

- initial_reviewer_id: c18_exam_review
- initial_reviewed_at: 2026-08-21T09:31:56+09:00
- review_scope: anki/cards/40_bayesian_methods.md の新規45枚、既存関連カード、anki/formulae.md、anki/syllabus/coverage.yaml、公式aim、title_ids 312–328

## 初回指摘

### ねらい適合性

公式のねらい「不完全データの分析について理解すると共に、コンピュータを用いたシミュレーションができる。モデル構築に役立てる。」のうち、ベイズ法が担うモデル構築への到達行動を、次のように実質的に扱っている。

- 事前分布・事後分布：`bayes-density-formula`、`bayes-conjugate-definition`、`bayes-proper-improper` で定義と条件を再生し、既存の `data-bayes-beta`、`mathstat-gamma-poisson-posterior` と新規の `bayes-gamma-exponential-update`、`bayes-normal-normal-update`、`bayes-dirichlet-multinomial-update` で尤度と事前分布から事後分布を導出できる。
- 推定・区間・予測：`bayes-squared-loss-mean`、`bayes-absolute-loss-median`、`bayes-zero-one-map` で損失関数に応じた推定量を判定し、`bayes-normal-credible-interval`、`bayes-credible-vs-confidence` で区間の計算と解釈を区別し、複数の事後予測カードで未知母数を積分消去できる。
- モデル比較：`bayes-factor-definition`、`bayes-factor-beta-binomial`、`bayes-factor-discrete-numeric`、`bayes-posterior-odds` で、周辺尤度、ベイズファクター、事後オッズを定義・計算できる。`bayes-factor-prior-sensitivity` と `bayes-factor-improper-prior` により適用条件も判定できる。
- 階層ベイズモデル：`bayes-hierarchical-definition` で3層の因子分解、`bayes-normal-hierarchical-shrinkage` と `bayes-beta-binomial-hierarchy` で部分プーリング、`bayes-hierarchical-conditional-independence` で条件付き独立と周辺依存を扱い、モデル構築上の意味まで説明できる。
- ギブスサンプリング：`bayes-gibbs-full-conditionals` で更新原理、`bayes-normal-hierarchical-gibbs-theta` と `bayes-normal-hierarchical-gibbs-mu` で完全条件付き分布の導出を扱う。既存の `sim-gibbs-bivariate-normal` が同一掃引内で更新済み成分を使う生成手順を補完する。

したがって、公式用語「事前分布」「事後分布」「階層ベイズモデル」「ギブスサンプリング」は名前だけでなく、再生・導出・計算・条件判定の各技能として充足している。

### 知識充足性

title_ids 312–328 は次の対応で実質的に充足している。

- 312–314：`bayes-density-formula`、`bayes-conjugate-definition`、既存の2共役更新カード。
- 315–320：既存の `data-bayes-beta`、`mathstat-gamma-poisson-posterior` に加え、Beta–Binomial、Gamma–Poisson、Gamma–Exponential、Normal–Normal、Dirichlet–Multinomialの更新・数値計算・事後予測カード。
- 321–324：`bayes-squared-loss-mean`、`bayes-absolute-loss-median`、`bayes-zero-one-map`、`bayes-asymmetric-loss-quantile`、`bayes-posterior-risk-numeric`。
- 325：`bayes-normal-credible-interval`、`bayes-beta-equal-tail-interval`、`bayes-hpd-interval`、`bayes-credible-vs-confidence`。
- 326：`bayes-proper-improper`、`bayes-factor-improper-prior`、`bayes-prior-sensitivity`。
- 327：`bayes-factor-definition` から `bayes-posterior-odds` までの定義・導出・数値計算・適用条件。
- 328：`bayes-hierarchical-definition` から `bayes-empirical-bayes` までの因子分解、縮小、情報共有、条件付き独立、超母数の扱い。

45枚中24枚が `calc_step` で、Beta事後平均・MAP、Gamma–Exponential更新、Normal–Normal平方完成、ベイズファクター、事後リスク、Gibbs完全条件付き分布などの具体計算が十分に配置されている。formulaeにはベイズの公式、事後予測、主要共役更新、損失と推定量、信用区間、ベイズファクター、階層正規モデル、Gibbs完全条件付き分布が同期されている。coverageも公式用語4項目へ該当カードを過不足なく割り当てている。

### 過不足

- 新規45枚はtarget 45–55内である。公式17タイトルを、定義カード、具体計算カード、条件判定カードへ意味的に分けた結果であり、枚数だけを増やした過剰分割ではない。
- `data-bayes-beta` と新規のBeta関連カードは、前者が共役更新の完遂例、後者が事後要約・予測を扱うため役割が異なる。`mathstat-gamma-poisson-posterior` と `bayes-gamma-poisson-predictive` も更新と予測で異なり、実質重複ではない。
- `bayes-normal-normal-update`、`bayes-normal-normal-numeric`、`bayes-normal-precision-update` は、それぞれ平方完成による導出、数値代入、精度表記の再生を担当する。試験で必要な式変形と短時間計算を分離した妥当な反復である。
- ベイズファクター群も、定義、積分計算、数値判断、事前感度、不適切事前分布という異なる技能を問う。削除すべき重複は認めない。
- 公式用語、title_ids、再生・計算・判定技能に未充足の論点は認めない。fatal、major、minorに該当する指摘はない。

### 優先度根拠

親一覧はA6件・B11件である。Aの中核である密度版ベイズ公式、共役事前分布、損失に基づくベイズ推定、信用区間と信頼区間の区別、ベイズファクターは、`bayes-density-formula`、`bayes-conjugate-definition`、`bayes-squared-loss-mean`、`bayes-normal-credible-interval`、`bayes-credible-vs-confidence`、`bayes-factor-definition`、`bayes-posterior-odds` でAに置かれている。`bayes-normal-normal-update` も複数の階層・予測カードの前提となるためAが妥当である。

残る37枚はBで、親一覧の共役モデル、事後予測、各損失、無情報事前分布、階層ベイズという標準〜周辺論点に整合する。元タイトルの優先度を尊重しつつ、複数カードの前提となる導出だけをAへ引き上げた構成であり、Sの過大評価やCへの過小評価はない。

### 配信品質

全カードに一意なID、カテゴリー、サブカテゴリー、topic、hashtagsがあり、検索可能である。各カードは「問題」「答え」「使用公式・定理」「計算例」「注意」に分かれ、1カード1論点として配信時にも式と条件を追える。coverage・formulaeとの同期、カード一覧ページの生成・検査にも不整合はない。

## 機械検証

- `npm run anki:validate`: 成功。896 cards、warnings 0。配信HTMLも19カテゴリー、各ページ最大200枚でbuild/check成功。
- `npm run validate`: 成功。構造検証、336 MarkdownのKaTeX strict検証、237生成対象テキスト検証がすべて成功。

## 初回件数

fatal: 0 / major: 0 / minor: 0

## 修正確認

- `bayes-density-formula`：周辺尤度の条件 $0<m(x)<\infty$ が問題文に明記され、事後密度を正規化できる条件を再生した上でベイズの公式を適用できる。定義カードとしての試験適合性が向上し、1カード1論点も維持されている。
- `bayes-factor-definition`：通常のベイズファクターでは各モデル内の事前分布がproperであるという適用条件が、使用公式・定理に明記された。`bayes-factor-improper-prior` の理由説明と役割分担されており、重複ではなく定義時の条件再生と誤用防止を補完している。
- 全45枚を再査読し、公式aim、公式用語4項目、title_ids 312–328、再生・計算・判定技能、既存カードとの差別化、A/B優先度、formulae・coverage・配信構造に新たな不足や過剰は認めない。

## 再査読時の機械検証

- `npm run anki:validate`: 成功。896 cards、warnings 0。配信HTMLも19カテゴリー、各ページ最大200枚でbuild/check成功。
- `npm run validate`: 成功。構造検証、338 MarkdownのKaTeX strict検証、237生成対象テキスト検証がすべて成功。

- final_reviewer_id: c18_exam_review
- final_reviewed_at: 2026-08-21T09:34:00+09:00

## 最終件数

fatal: 0 / major: 0 / minor: 0
