# 試験適合性査読記録（Anki）

- initial_reviewer_id: exam-editor-reviewer-C08
- final_reviewer_id: exam-editor-reviewer-C08
- initial_reviewed_at: 2026-08-18T16:32:00Z
- final_reviewed_at: 2026-08-18T17:08:00Z
- 担当ID: exam-editor-reviewer-C08
- 作業ID: C08-estimation-methods-properties
- 対象: 各種推定法・点推定量の性質（math-estimation-methods, math-point-estimator-properties）
- 査読日時: 2026-08-19
- 対象ファイル: anki/cards/29_estimation_properties.md（新規43枚）, anki/cards/03_estimation.md（既存）
- 査読種別: 試験適合性査読（Anki固有検査）。連結演習・20〜30分完答・答案圧縮・部分点・撤退基準・5問中3問選択はAnki対象外のため要求せず、欠如を指摘しない。

## 検査範囲と機械検証

- anki/notation.md, anki/formulae.md, anki/syllabus/syllabus.yaml, anki/syllabus/coverage.yaml, anki/progress.yaml, pdfs/statistics_grade1_card_titles_by_parent_priority.md を確認。
- npm run anki:validate： validated 397 cards (0 warnings)、7 category page(s) built & checked、max 200 per page を確認（成功）。
- 新規43枚は target min 40〜max 50 の範囲内（43枚）。
- 新規カードIDは既存と重複なし。

## ねらい適合性（aims と公式用語の実操作）

公式aims本文（math-estimation の「推定法の原理を知り、推定量の良さを数学的に定式化できる」）に対し、C08の2サブカテゴリーの公式用語はすべてカードで実際に操作されている。

- math-estimation-methods（モーメント法, 最小二乗法, 線形推定（BLUE）, その他の手法）:
  - モーメント法: est-method-of-moments, est-moments-uniform（一般手順・一様分布U(0,θ)の適用）
  - 最小二乗法・線形推定（BLUE）: est-ols-bline, est-ols-normal-equations, est-gauss-markov（正規方程式導出・Gauss–Markov）
  - その他の手法: est-plug-in（経験分布関数・汎関数代入）
- math-point-estimator-properties（不偏性, 一致性, 十分性, 有効性, 推定量の相対効率）:
  - 不偏性: est-unbiasedness, est-unbiased-construction, est-estimator-estimate-parameter
  - 一致性: est-consistency, est-consistency-bias
  - 十分性・UMVU: est-rao-blackwell, est-umvu-idea, est-sufficiency-completeness, est-lehmann-scheffe
  - 有効性・Fisher情報・CRLB: est-score-mean-zero, est-fisher-information-def/two-forms/additivity, est-fisher-bernoulli/poisson/normal/exponential, est-cramer-rao-lower-bound, est-crlb-equality, est-efficient-estimator, est-asymptotic-efficiency, est-mle-fisher-information, est-fisher-param-transform, est-information-matrix, est-normal-information-matrix, est-crlb-exponential, est-asymptotic-normality-mle, est-information-inequality-summary
  - 相対効率: est-relative-efficiency, est-estimator-comparison, est-bias-variance-comparison

到達行動のうち「定義・計算・条件判定・適用」が、Bernoulli/Poisson/正規/指数のFisher情報計算、CRLBの利用と等号判定、有限標本と漸近の区分、UMVUの構成（Rao–Blackwell, Lehmann–Scheffé）、モーメント法と最小二乗法の適用として揃っている。合格に必要な再生・計算・判定技能は充足。

## 知識充足性

- 43枚は target min 40〜max 50 の範囲内。
- 点推定（124〜137）とFisher情報・推定量の効率（167〜180）の親見出し範囲を1作業単位として網羅。公式用語の4+5=9個すべてに対応するカードがある。
- 各カードは短時間の再生・計算・判定に適した粒度。連結演習・論述化はなく、1カード1論点は概ね満たす。

## 過不足

- 公式用語4サブ用語（モーメント法/最小二乗法/線形推定BLUE/その他の手法）と5用語（不偏性/一致性/十分性/有効性/相対効率）はいずれも過不足なく充当されている。
- 不足は確認されず。
- 重複候補（topicの再利用・内容の類似）:
  - topic: umvu が est-umvu-idea, est-lehmann-scheffe の2枚で共用（下記 minor-1）。
  - topic: cramer-rao が4枚、topic: fisher-information が7枚で共用。同一ファイル内なので配信は許容範囲だが、検索フィルタ粒度としてtopicが粗い（下記 minor-1）。
  - est-ols-bline と est-gauss-markov が共に「BLUE」を説明（定義提示と定理の分担で内容はほぼ補充的、下記 minor-2 候補）。
  - est-consistency-bias の T=X_1 反例は est-consistency の反例と重複（レンジ中点の別反例も提示され、追加価値あり、下記 minor-3 候補）。

## 優先度根拠

- progress.yaml の title_ids 124〜137（点推定）, 167〜180（Fisher情報・効率）に対する priority_counts（S:15, A:13, B:0, C:0）を、親一覧の個別タイトル優先度と照合した。
  - 124〜137: S=125,126,127,131,134（5）, A=124,128,129,130,132,133,135,136,137（9）
  - 167〜180: S=167,168,169,170,171,172,173,174,178,179（10）, A=175,176,177,180（4）
  - 合計 S=15 / A=13 → 一致確認。
- 新規43枚の合計優先度は S16 / A25 / B2 とS/Aに集中しており、Sタイトル（167-174等）の派生カードをSとしている点、付加的な発展カード（est-shape-parameter-transform, est-posterior-risk）をBとしている点は整合的。低優先度への下方振り分けやS/Aタイトルの取りこぼしはない。優先度は妥当。

## 指摘一覧

### fatal

（該当なし）

### major

（該当なし）

### minor

- minor-1（topic一意性・検索品質）: topic: umvu が est-umvu-idea と est-lehmann-scheffe で共用され、topic: cramer-rao が4枚、topic: fisher-information/similar が7枚に及ぶ。同一配信ページ内のトピック再利用は許容されるが、配信HTMLでの検索・フィルタ粒度を保つため、主要カードには区別可能なtopicを割るか、topic一意性のarray化を検討するとよい（他作業ではtopic重複解消がminor扱い）。
- minor-2（重複候補）: est-ols-bline（線形推定量・BLUEの定義）と est-gauss-markov（線形不偏の中で最小分散）はBLUEの説明が部分的に重複し、est-information-inequality-summary は est-cramer-rao-lower-bound/est-efficient-estimator の内容の総括に近い。それぞれ「定義提示 vs 定理の仮定・結論 vs 等号判定」と観点は異なり致命的ではないが、カード間の指針（どのカードがどの出題行動を担当するか）が重ならないことを確認してほしい。
- minor-3（重複候補・多分布）: est-consistency-bias の T=X_1 反例は est-consistency の計算例と同じ。レンジ中点の別反例が追加されているため追加価値はあるが、同じ例を2枚で扱っている点を明示的に区別するか、一方は別反例（レンジ中点のみ）に絞るとよい。
- minor-4（優先度整合の注記）: 新規43枚中、B付与の est-shape-parameter-transform / est-posterior-risk は、対応する親一覧タイトル（133 推定量の変換とバイアス, 136 損失関数とリスク関数）のA代替ではなく拡張カードとして位置づけられる。優先度の意味（B=標準〜周辺）に沿っており問題ないが、将来C10以降の作業と重複しないよう、この拡張カードの所在をcoverage.yamlで明示するとよい。

## 総括

公式のねらいと用語（モーメント法・最小二乗法・線形推定BLUE・その他の手法、不偏性・一致性・十分性・有効性・相対効率）はすべて実際に操作され、再生・計算・判定・適用の技能が合格水準で揃っている。1カード1論点、優先度、配信品質（397枚・7ページ・max200）は概ね良好で、機械検証（anki:validate）も成功。数学的内容の試験適合性に致命的・重大な問題はなく、指摘はtopic粒度と内容重複に関する改善点（minor）のみ。連結演習・完答時間などAnki対象外の項目は未指摘。

fatal: 0 / major: 0 / minor: 4

---

## 再査読記録（2026-08-19）

- 査読種別: 試験適合性再査読（Anki固有、初回指摘の修正確認と対象全文の再確認）
- 対象変更: anki/cards/29_estimation_properties.md, anki/syllabus/coverage.yaml

### 修正確認

- minor-1（topic一意性・検索品質）: topicを各カードの論点に合わせて分化・一意化した。est-umvu-idea（umvu）と est-lehmann-scheffe（lehmann-scheffe）でtopicを分割し、CRLB系は est-cramer-rao-lower-bound/crlb-equality（cramer-rao）、est-crlb-exponential（crlb-exponential）、est-information-inequality-summary（crlb-equality-judgment）へ分離した。Fisher情報系も Bernoulli（fisher-info-bernoulli）、Poisson（fisher-info-poisson）、正規（fisher-info-normal）、指数（fisher-info-exponential）、一般定義（fisher-information）、情報行列（fisher-information-matrix）へ分化。topicの粗い共用が解消され、検索・フィルタ粒度が改善。⇒ 解決
- minor-2（重複候補）: est-ols-bline は sourceを「最小二乗法」、論点を「最小二乗法の考え方とBLUEの定義提示」に、est-gauss-markov は sourceを「線形推定（BLUE）」、論点を「Gauss–Markovの定理の仮定・結論」に明確に分担（定義提示 vs 定理の仮定・結論）。また est-crlb-exponential は $\mu=1/\lambda$（rate）と $\lambda$ のCRLBを $g'(\lambda)=-1/\lambda^2$ を用いて $\{g'(\lambda)\}^2/I_n(\lambda)=1/(n\lambda^2)$ と両方明示し、est-cramer-rao-lower-bound / est-information-inequality-summary とは「一般下界の導出 / 指数族でのCRLB利用 / 等号達成の判定」と観点を分割。⇒ 解決
- minor-3（重複候補・多分布）: est-consistency の計算例は「$\overline X$ は一致する」側（$\overline X$ の分散が0へ向かう）に限定されており、初回で指摘した $T=X_1$ 反例の重複は実際にはなかった。est-consistency-bias 側のみが $T=X_1$ とレンジ中点の反例を扱う。反例の役割が独立していることを確認。⇒ 指摘自体の補正を含めて解決
- minor-4（優先度整合の注記）: est-shape-parameter-transform（B）は「非線形変換のバイアス補正」、est-posterior-risk（B）は「二乗損失の事後平均」という固有の拡張論点を持ち、coverage.yamlでそれぞれ transform-bias / loss-risk の用語に対応付けて明示された。C10以降の作業との重複リスクもcoverage.yaml上の配置で特定可能。⇒ 解決

### 機械検証

- npm run validate： structure ✔ / math（296 Markdown, KaTeX strict）✔ / text（237ファイル）✔（成功）。
- npm run anki:validate： validated 397 cards (0 warnings)、7 category page(s) built & checked、max 200 per page（成功）。

### 再確認した品質項目

- ねらい適合性: 公式用語（モーメント法・最小二乗法・線形推定BLUE・その他の手法、不偏性・一致性・十分性・有効性・相対効率）の操作は維持。修正で到達行動に退行なし。
- 1カード1論点・知識充足性・過不足・優先度: 修正前の水準を維持。新規43枚、カードID/topic重複なし。
- est-crlb-exponential の再母数化（$\mu=1/\lambda$）とCRLB計算は本再査読で独立に再計算し、$g'(\lambda)=-1/\lambda^2$ より $\{g'(\lambda)\}^2/I_n(\lambda)=1/(n\lambda^2)$ が正しく、$\overline X$ が $\mu$ の有効推定量であることを確認。

### 再査読結論

初回指摘 fatal0 / major0 / minor4 のうち、minor4 すべての修正・整理を確認した。修正後の対象全文を再確認し、新たな指摘はなし。

fatal: 0 / major: 0 / minor: 0