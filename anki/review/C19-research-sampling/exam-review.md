# C19-research-sampling 試験適合性査読

- initial_reviewer_id: c19_exam_review
- initial_reviewed_at: 2026-08-21T09:46:15+09:00
- final_reviewer_id: c19_exam_review
- final_reviewed_at: 2026-08-21T09:49:12+09:00

## 対象

- `anki/cards/41_research_sampling.md` の新規42枚
- `anki/formulae.md`
- `anki/syllabus/coverage.yaml` の `applied-research-types`、`applied-sampling`
- `anki/progress.yaml` の C19 メタデータ
- 参照親見出し「標本調査」、title_ids 412–428、priority_counts A3/B14

## ねらい適合性

公式ねらい全文「研究法の違いを理解すると共に、データの取り方に関する基礎事項を理解し実践に応用できる。」に対し、次の到達行動を確認した。

- 研究法の識別：`research-experimental-observational`、`research-cohort-design`、`research-case-control-design`、`research-cross-sectional-design`、`research-prospective-retrospective` により、実験研究・観察研究・調査を設定から判定できる。
- データ取得法の選択：`sampling-srs-definition`、`sampling-stratified-mean`、`sampling-cluster-vs-stratified`、`sampling-two-stage-inclusion`、`sampling-systematic-rule` により、完全無作為抽出、層化抽出、集落抽出、二段抽出、系統抽出を区別して適用できる。
- 推定計算：`sampling-mean-unbiased`、`sampling-fpc-mean-variance`、`sampling-total-estimator`、`sampling-stratified-variance`、`sampling-ht-numeric` により、包含確率・設計期待値・有限母集団補正を使った再生と計算ができる。
- 実践上の判定：`sampling-design-effect`、`sampling-nonresponse-bias`、`sampling-coverage-error` により、精度低下、非回答、標本枠の欠陥を判定できる。

## 知識充足性

title_ids 412–428 は全件について実質的な対応がある。特にA優先度の413、415、418は、`sampling-srs-definition`、`sampling-mean-unbiased`／`sampling-fpc-mean-variance`、`sampling-stratified-mean`／`sampling-stratified-variance` で定義・導出・計算を複数方向から扱っている。B優先度の母合計、母比率、比例・Neyman配分、集落・二段・系統抽出、Horvitz–Thompson推定、比・回帰推定、設計効果、非回答・カバレッジも欠落していない。

公式用語は、実験研究、観察研究、調査、完全無作為抽出、層化抽出、サンプルサイズの設計について本文・タイトル・検索用メタデータ・coverageに対応がある。二段階抽出だけはカード本文で短縮形「二段抽出」のみを使っており、下記minorを要する。

## 過不足

### 初回指摘

1. major — `research-confounding-definition`：交絡因子の条件を「Yの原因または予測因子」としているため、結果の子孫や選択変数など、調整すべきでない単なる予測因子まで交絡因子と誤判定し得る。試験で調整変数を判定する技能に直結するため、Zが曝露より前に定まり、XとYの共通原因となる典型構造を中心に示し、「予測できるだけでは交絡因子とは限らない」と明示すること。
2. minor — `sampling-proportion-variance`：母比率推定量の真の設計分散は導出できるが、実際の標準誤差計算で使う推定式が「必要なら不偏化」とだけ記され、再生できない。単純無作為非復元抽出で $\widehat{\operatorname{Var}}_d(p)=(1-n/N)p(1-p)/(n-1)$ を示し、数値代入まで追えるようにすること。
3. minor — `sampling-two-stage-inclusion`、`sampling-two-stage-total`：公式用語は「二段階抽出」だが、表示本文では「二段抽出」しか使っていない。初出で「二段階抽出（二段抽出）」と同義を明示し、公式語からカードを再生できるようにすること。

現状の重複は許容範囲である。`sampling-design-effect` と `sampling-effective-sample-size`、`sampling-neyman-allocation` と `sampling-neyman-numeric` は、それぞれ定義・計算を分担しており1カード1論点を保つ。研究デザイン10枚も、研究法の判定軸が異なり機械的重複ではない。42枚は目標40–45枚内であり、論述演習や答案圧縮を追加する必要はない。

## 優先度根拠

- source親「標本調査」の priority_counts A3/B14 と照合し、Aの単純無作為抽出・母平均推定・層化抽出には中核カードを配置している。
- Bの14論点にも全て対応カードがあり、公式・定義だけでなく数値計算または条件判定を組み合わせている。
- 追加した研究法カードのA指定は、公式ねらいの前半である研究法の違いと因果推論・一般化の区別を支えるため妥当である。
- 各カードの `frequency.past_exam` は0で、具体的な過去問IDによる上方修正根拠は記録されていない。このためS指定を設けず、参照タイトル一覧と公式ねらいを優先度根拠とした判断は保守的で妥当である。

## 配信品質・機械検証

- カードIDはcoverageと一致し、検索用hashtags、公式出題範囲source、問題・答え・使用公式・計算例・注意の各欄が揃っている。
- `npm run anki:validate`：成功。938 cards、0 warnings、19 category pages、最大200枚。
- 初回 `npm run validate`：成功。構造検証、340 MarkdownのKaTeX strict検証、237生成対象テキスト検証が全て成功。
- 再査読 `npm run anki:validate`：成功。938 cards、0 warnings、19 category pages、最大200枚。
- 再査読 `npm run validate`：成功。構造検証、342 MarkdownのKaTeX strict検証、237生成対象テキスト検証が全て成功。

## 初回件数

fatal: 0 / major: 1 / minor: 2

## 修正確認

同じ担当者が全42枚と同期対象を再査読し、初回3指摘の解消を確認した。

1. `research-confounding-definition`：Zを曝露以前に定まるX・Yの共通原因または適切な代理変数とし、中間変数・合流点を除外した。単なる結果予測因子を交絡因子と誤認する余地が解消され、観察研究における調整変数の判定技能として妥当になった。
2. `sampling-proportion-variance`：$\widehat{\operatorname{Var}}_d(p)=(1-n/N)p(1-p)/(n-1)$ を明記し、$N=1000,n=100,p=0.3$ から分散約0.00191、標準誤差約0.0437へ至る計算を完遂した。公式再生と数値適用の両方を満たす。
3. `sampling-two-stage-inclusion`、`sampling-two-stage-total`、`anki/formulae.md`：表示上の用語を公式語「二段階抽出」へ統一した。coverage・hashtagsと本文の検索語が一致した。

修正後も42枚は1カード1論点を保ち、title_ids 412–428、公式4用語、A3/B14の重点、公式ねらい全文の到達行動に欠落・不要な重複はない。配信ビルドも0 warningsであり、新たな指摘はない。

## 最終件数

fatal: 0 / major: 0 / minor: 0
