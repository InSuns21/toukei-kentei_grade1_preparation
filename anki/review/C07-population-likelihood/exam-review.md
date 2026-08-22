# 試験適合性査読記録（Anki）

- initial_reviewer_id: exam-editor-reviewer-C07
- final_reviewer_id: exam-editor-reviewer-C07
- initial_reviewed_at: 2026-08-18T13:55:00.000Z
- final_reviewed_at: 2026-08-18T14:40:00.000Z
- 担当ID: exam-editor-reviewer-C07
- 作業ID: C07-population-likelihood
- 対象: 母集団と標本・統計量／尤度と最尤推定（math-population-sample-statistic, math-likelihood-mle）
- 査読日時: 2026-08-18
- 対象ファイル: anki/cards/28_likelihood_mle.md（新規35枚）, anki/cards/03_estimation.md（既存）
- 査読種別: 試験適合性査読（Anki固有検査）。連結演習・20〜30分完答・答案圧縮・部分点・撤退基準・5問中3問選択はAnki対象外のため要求せず、欠如を指摘しない。

## 検査範囲と機械検証

- anki/notation.md, anki/formulae.md, anki/syllabus/syllabus.yaml, anki/syllabus/coverage.yaml, anki/progress.yaml, pdfs/statistics_grade1_card_titles_by_parent_priority.md を確認。
- npm run anki:validate： validated 354 cards (0 warnings)、7 category page(s) built & checked、max 200 per page を確認（成功）。
- 新規カードIDは既存と重複なし。既存topicと衝突するものは factorization-theorem の1件のみ。

## ねらい適合性（aims と公式用語の実操作）

公式aims本文「尤度などの統計的推測に重要な役割を果たす概念を理解すると共に、パラメータの推定法の原理を知り、推定量の良さを数学的に定式化できる」に対し、C07の2サブカテゴリーの公式用語はすべてカードで実際に操作されている。

- 尤度関数: mle-likelihood-vs-probability, mle-likelihood-construction（確率との違い・i.i.d.同時密度の積）
- 対数尤度関数: mle-log-likelihood, mle-score-equation（単調変換・積→和）
- 有効スコア関数: score-function-definition（定義・期待値0・分散=I1）
- 最尤推定: mle-score-equation, mle-normal-mean, mle-poisson, mle-exponential, mle-boundary-nonregular, mle-consistency, mle-normal-both, mle-information-inequality
- 十分統計量: suff-statistic-definition, suff-bernoulli, suff-poisson, suff-normal, suff-minimal
- ネイマンの分解定理: neyman-factorization
- 順序統計量: order-statistic-sufficiency

到達行動のうち「定義・計算・条件判定・適用」が、正規/ポアソン/指数/一様/ベルヌーイ・二項のMLE計算、境界・正則条件の判定、不変性・情報不等式の適用として揃っている。

## 知識充足性

- 35枚は target min 35〜max 40 の範囲内。
- 最尤法（138〜152）と十分性・完備性（153〜166）の親見出し範囲を1作業単位として網羅。UMVU構成の3段階、Rao–Blackwell, Lehmann–Scheffé, Basu, 最小十分, 完備, 指数型完備性、順序統計量と十分性まで含み、必要な再生・計算・判定技能は充足している。
- 過剰な論述化はなく、各カードは短時間の再生・計算・判定に適した粒度。1カード1論点は概ね満たす。

## 過不足

- 不足は確認されず。
- 重複候補:
  - topic: factorization-theorem が既存 est-factorization（03）と新規 neyman-factorization（28）で衝突（下記 minor-5）。
  - MLEのBernoulli計算が既存 est-bernoulli-mle（03）と新規 mle-bernoulli-binomial（28）で部分的に重複（下記 minor-5）。

## 優先度根拠

- progress.yaml の title_ids 138〜166 に対する priority_counts（S:19, A:10, B:0, C:0）は、親一覧のタイトル個数と一致（138〜152: S8/A7、153〜166: S11/A3 → S19/A10）。
- 新規35枚はすべて S または A（B/Cなし）。低優先度への下方振り分けや、S/Aタイトルの取りこぼしはない。
- カード個別では S23/A12 とS寄りだが、スコア方程式・順序統計量・正規族十分・完備などはSタイトル（141, 153, 157, 160）の派生カードであり、整合的。優先度は妥当。

## 指摘一覧

### fatal

（該当なし）

### major

- major-1（umvu-construction・計算例）: 1個のBernoulli $X\sim\operatorname{Bernoulli}(p)$ で $T=X$ は完備十分だが、$T$ の関数は $a+bX$ 形に限られ期待値が $p$ の線形関数となり、$p^2$ の不偏推定量は存在しない。カード自身が「$E[X^2]=p$」と書いているのに $X^2$ を $p^2$ のUMVUとし、さらに「$2X^2-X$」は期待値 $p$ で $p^2$ の不偏推定ではない。3段手順（不偏→条件付け→Lehmann–Scheffé）自体は正しいが、具体例が誤っており学習者を誤誘導する。n≧2の正しい例（例：$T=X_1+X_2$、$p^2$ のUMVUは $T(T-1)/2$）への差し替えを推奨。

### minor

- minor-1（mle-constrained・問題文）: 「二項分布 Binomial(n,p) で p_1+p_2=1 のような線形制約」は、単一母数 $p$ の二項分布と2母数の制約 $p_1+p_2=1$（多項/2カテゴリ）が混在し、問題設定が整合しない。計算例はBernoulli $p_1,p_2$ で正しく扱っており、問題文をこの設定に合わせるのが望ましい。
- minor-2（mle-uniform-endpoint・計算例）: 「微分では $\widehat\theta=0$ という誤った解しか得られない」は不正確。$U(0,\theta)$ の対数尤度 $L=\theta^{-n}$ の微分は内部で0にならず（負のまま）、微分では内点解が得られない、が正しい主旨。端点 $\theta\to0$ を解とする言い回しは誤解を招く。
- minor-3（mle-likelihood-vs-probability・答え）: 「尤度は…単位を持たない」は連続分布では不正確（密度の尤度は観測単位の逆数の次元を持つ）。正確には「尤度は確率ではなく、値は基準化・相対比較でのみ意味を持つ」。
- minor-4（basu-theorem・計算例）: 「σ既知下で補助」の言い回しが緩い。$S^2$ の分布は $\sigma^2$ に依存するため、母数 $\mu$ 単独（$\sigma$ 既知）の場合にのみ補助となる。母数の取り方を明示すべき。
- minor-5（配信・重複候補）: topic: factorization-theorem が既存 est-factorization（03）と新規 neyman-factorization（28）で衝突。同様に既存 est-bernoulli-mle（03）と新規 mle-bernoulli-binomial（28）のBernoulli MLE計算が部分的に重複。topic一意性の観点から、重複解消またはtopicの明確化を検討。
- minor-6（記号一貫性）: スコア関数の記号が mle-score-equation では $S(\theta)$、score-function-definition では $U(\theta)$ と揺れる。notation.mdにスコア関数の記号を固定するか、カード内で統一するとよい。

## 総括

公式のねらいと用語（尤度・対数尤度・有効スコア・最尤推定・十分統計量・ネイマン分解・順序統計量）はすべて実際に操作され、再生・計算・判定・適用の技能が合格水準で揃っている。1カード1論点、優先度、配信品質は概ね良好で、機械検証（anki:validate）も成功。ただしUMVU構成の具体例に数学上の誤りがあり、これは修正が必須（major）。残りは表現・整合性・重複候補の改善点（minor）。

fatal: 0 / major: 1 / minor: 6

---

## 再査読記録（2026-08-18）

- 査読種別: 試験適合性再査読（Anki固有、初回指摘の修正確認と対象全文の再確認）
- 対象変更: anki/cards/28_likelihood_mle.md, anki/syllabus/coverage.yaml

### 修正確認

- major-1（umvu-construction）: 単一Bernoulliの誤例を $Y\sim\operatorname{Binomial}(2,p)$、$\delta(Y)=Y(Y-1)/2$ に差し替え済み。$E[Y(Y-1)]=E[Y^2]-E[Y]=(2p+2p^2)-2p=2p^2$ より $E[\delta]=p^2$ を確認（正しい）。3段手順の説明とも整合。⇒ 解決
- minor-1（mle-constrained）: 問題文を「2カテゴリの多項分布（$p_1+p_2=1$）」に整合。⇒ 解決
- minor-2（mle-uniform-endpoint）: 「微分で $\widehat\theta=0$」→「$\ell=-n\log\theta$ は単調減少で内点解がなく、微分では最大点が得られない」に修正。⇒ 解決
- minor-3（mle-likelihood-vs-probability）: 「単位を持たない」→「値は確率ではなく、基準化・相対比較（比や対数差）でのみ意味を持つ」に修正。⇒ 解決
- minor-4（basu-theorem）: 「$\mu$ のみ未知（$\sigma^2$ 既知）のとき $S^2$ の分布は $\mu$ に依存せず補助」と母数を明示。⇒ 解決
- minor-5（topic一意性）: neyman-factorization の topic を factorization-theorem → neyman-factorization に変更。既存 est-factorization とのtopic衝突は解消（重複topicなし）。coverage.yaml も追従。⇒ 解決
- minor-6（スコア記号）: mle-score-equation、mle-asymptotic-normality のスコアを $U(\theta)$ に統一。score-function-definition および formulae.md と整合。⇒ 解決

### 機械検証

- npm run anki:validate： validated 354 cards (0 warnings)、7 category page(s) built & checked（成功）。

### 再確認した品質項目

- ねらい適合性: 公式用語（尤度・対数尤度・有効スコア・最尤推定・十分統計量・ネイマン分解・順序統計量）の操作は維持。修正で到達行動に退行なし。
- 1カード1論点・知識充足性・過不足・優先度: 修正前の水準を維持。新規35枚、カードID/topic重複なし。
- umvu計算例の数学的正しさは本再査読で独立に再計算し、修正後は正しいことを確認。

### 再査読結論

初回指摘 fatal0 / major1 / minor6 のうち、major1・minor6 すべての修正を確認。修正後の対象全文を再確認し、新たな指摘はなし。

fatal: 0 / major: 0 / minor: 0

## 追加カード・表記統一の試験適合性査読（2026-08-23）

- 担当ID: /root/exam_review_population_cards
- 実行日時: 2026-08-23（Asia/Tokyo）
- 対象: `math-population-sample-statistic` 全文、新規基礎5カード、coverage、シラバス用語に基づく表記統一

### 初回指摘

- fatal: 0 / major: 1 / minor: 4
- major: `order-statistic-sufficiency` が各順列の確率を常に $1/n!$ とし、離散分布の同順位を扱えていない。
- minor: 「ネイマンの分解定理」との表記差、バスーの定理等の英語主表記、一般順序統計量カードの発見性、ベルヌーイ因子分解カードの重複。

### 修正確認

- 同順位を含む一般の場合は条件付きの並びの確率が母数に依存しない、と説明を修正。
- シラバス正本「ネイマンの分解定理」をタイトル・問題・公式集・出典へ反映。
- バスーの定理を日本語主表記にし、重複していた `est-factorization` を $U(0,\theta)$ の台依存例へ変更。
- `est-factorization` の答えに $T=X_{(n)}$ を直接提示し、記号を観測値 $x_{(n)}$ に統一。
- 別サブカテゴリーの一般順序統計量カードは既存の所属を維持。coverageの所属制約に適合するため、未追加を欠陥とはしない。
- 新規5カードは、初心者向けの足場、途中計算、1カード1論点、シラバスの到達行動に適合。対象は合計22カードとなり、枚数不足は認めない。

### 再査読結論

- `npm run validate`: success
- fatal: 0 / major: 0 / minor: 0
