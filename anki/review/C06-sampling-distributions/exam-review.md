# 試験適合性査読記録：C06-sampling-distributions（標本分布）

- 担当：exam-editor-reviewer（試験適合性査読サブエージェント）
- 対象：`anki/cards/22_sampling_distributions.md`（新規47枚）
- 正本：`anki/syllabus/syllabus.yaml`（math-sampling-distributions のねらい「標本分布を理解し、応用に用いることができる」）、`anki/notation.md`、`anki/formulae.md`、`references/past-exam-index.yaml`
- 実施日時：2026-08-16（Asia/Tokyo）
- 状態：初回査読（`anki/progress.yaml` の C06-sampling-distributions は self_review 中）

## 査読メタデータ

- initial_reviewer_id: independent-math-reviewer
- final_reviewer_id: independent-math-reviewer
- initial_reviewed_at: 2026-08-16T10:49:20.000Z
- final_reviewed_at: 2026-08-16T20:05:00.000Z

## 確認範囲と方法

公式シラバスのねらい・用語例（t分布・カイ二乗分布・F分布）、過去問インデックス（MATH-2014-Q3 t分布・信頼区間端点、MATH-2014-Q4 F分布・二標本比較、MATH-2018-Q1 カイ二乗分布・母標準偏差、MATH-2018-Q5 順序統計量の密度）と照合し、Anki の範囲境界（連結演習・論述演習・部分点・問題選択戦略の要求をしない）を適用して査読した。

## 指摘（初回）

### major（1件）
- `samp-iid-sum-variance`（一手）：「和は分散が n 倍、平均は σ/√n」は期待値と標準偏差を混同させる表現だった（E[Xbar]=μ）。「和の分散は nσ²、標本平均の標準偏差は σ/√n、定数倍 c の分散は c² 倍」へ修正を要求。

### minor（5件）
- `samp-t-converges-normal`：タイトル「…と正規近似」に対し設問が自由度の説明のみだった。問題文に「自由度が大きいときの漸近分布を述べよ」を追加。
- `samp-chisq-definition`：定義カードに期待値・分散を併記し、別カード `samp-chisq-degree-of-freedom` と重複。定義と台に絞る。
- `samp-xbar-unbiased` / `samp-iid-sum-variance`：標本平均の分散を両方が再掲。不偏性（E[Xbar]）と分散（Var）へ役割分担。
- `samp-t-distribution-limits`：ν=30 の近さを主文にするのではなく、ν→∞の収束を主結論とする。
- `samp-chisq-expectation-squared`：χ²_1 のモーメント再掲を抑え、原理計算に焦点を置く。

## 修正確認（メイン担当による修正後）

- major `samp-iid-sum-variance`：一手を「和の分散は nσ²、標本平均の標準偏差は σ/√n。定数倍 c の分散は c² 倍」へ修正。
- `samp-t-converges-normal`：問題に「漸近分布を述べよ」を追加、計算例に「n が大きいほど標準正規に近い」を維持。
- `samp-chisq-definition`：問題を「台と密度の形」に限定し、期待値・分散は別カードと明記。
- `samp-xbar-unbiased`：E[Xbar]=μ（不偏性）専用に改訂し、分散の導出は独立和の分散カードへ転送。
- `samp-t-distribution-limits`：ν→∞の収束を主結論とし、ν=30 は実用近似と明記。
- `samp-chisq-expectation-squared`：χ²_1 のモーメント参照を軽くし、$E[Z²]$ と Var は原理計算で求める方針に変更。

## 機械検証（修正後）

- `npm run anki:validate` 成功（284 cards、0 warnings、build/check 成功）
- `npm run validate` 成功（structure / math = KaTeX strict / text）

## 再査読待ち

初回と同じ exam-editor-reviewer へ再査読を依頼する。

## 最終結果（初回）

fatal: 0 / major: 1 / minor: 5

---

# 再査読記録（修正後）

- 担当：exam-editor-reviewer（試験適合性査読サブエージェント・初回と同じ担当）
- 対象：`anki/cards/22_sampling_distributions.md`（全47枚）
- 正本：`anki/syllabus/syllabus.yaml`（math-sampling-distributions のねらい「標本分布を理解し、応用に用いることができる」）、`anki/notation.md`、`anki/formulae.md`、`references/past-exam-index.yaml`
- 実施日時：2026-08-16（Asia/Tokyo）
- 状態：修正後再査読（初回指摘 major 1 / minor 5 の解消確認）

## 修正確認（指摘ごと）

- **major `samp-iid-sum-variance`（一手）**：修正を確認。「和の分散は $n\sigma^2$、標本平均の標準偏差は $\sigma/\sqrt n$。定数倍 $c$ の分散は $c^2$ 倍」となり、期待値と標準偏差の混同は解消。計算例（$\sigma=3,n=16$ で $\operatorname{Var}(T)=144,\operatorname{SD}(\overline X)=3/4$）・答えとも整合。**解消**。
- **minor `samp-t-converges-normal`**：問題文に「また自由度が大きいときの漸近分布を述べよ」が追加され、タイトル「…と正規近似」と設問・答え（t分布と、自由度が大きいときの標準正規への近似）が一致。**解消**。
- **minor `samp-chisq-definition`**：設問が「分布・台・密度の形」に限定され、期待値・分散の請求は「自由度のカードで扱う」へ委譲。`samp-chisq-degree-of-freedom` との重複が解消。**解消**。
- **minor `samp-xbar-unbiased` / `samp-iid-sum-variance`**：`samp-xbar-unbiased` は $E[\overline X]=\mu$（不偏性）に特化し、分散導出は「独立和の分散のカードで扱う」と明記。`samp-iid-sum-variance` は $\operatorname{Var}(T)=n\sigma^2,\operatorname{Var}(\overline X)=\sigma^2/n$ を担当。役割分担が明確になり、標本平均の分散の重複が解消。**解消**。
- **minor `samp-t-distribution-limits`**：$\nu\to\infty$ で $N(0,1)$ へ収束することを主結論とし、計算例で「$\nu=30$ では実用上標準正規に近いとされる」と実用近似であることを明記。**解消**。
- **minor `samp-chisq-expectation-squared`**：$E[Z^2]$・$\operatorname{Var}(Z^2)$ を分散公式と4次モーメント（$E[Z^4]=3$）から原理計算で求める方針へ変更し、$\chi^2_1$ のモーメント再掲は「自由度カードで扱う」と軽い参照に限定。`samp-chisq-degree-of-freedom` との重複が解消。**解消**。

## 修正で新たに生じていないかの確認（全47枚）

- 1カード1論点：修正対象カードは各1論点に収束し、論点の複合化・重複なし。
- ねらい適合性：t分布・カイ二乗分布・F分布の定義・統計量・分位点・区間・応用の訓練は維持。過去問対応（MATH-2014-Q3/Q4、MATH-2018-Q1/Q5）と優先度（S/A/B）に変更なし。
- 重複・過不足：カードは47枚のまま。IDの重複・重複論点なし。
- 配信品質：ID命名（`samp-` プレフィックス）、見出し6種の各47個、KaTeX（strict）は検証済み。`anki/syllabus/coverage.yaml` の `math-sampling-distributions` に全47枚がリストされ、追加・欠落なし。

## 機械検証（再査読時）

- `npm run validate` 成功（structure / math = KaTeX strict / text）
- `node anki/scripts/build_site.mjs --check` 成功（284 cards、7 pages、max 200/page）
- カードID一意（47枚中重複なし）、`$` の対称性に異常なし

## 再査読の総評

初回指摘6件（major 1・minor 5）はいずれも適切に修正され、全47枚で新たな不整合・欠落は確認されなかった。Anki の範囲境界（連結演習・論述演習・部分点・問題選択戦略の要求をしない）を適用した上で、試験適合性は良好と判断する。

## 総評（ねらい適合性・知識充足性・過不足・優先度根拠）

- ねらい適合性：公式ねらい「標本分布を理解し、応用に用いることができる」に対して、t分布・カイ二乗分布・F分布の定義・統計量・分位点・区間・応用を操作するカードが揃い、ねらいに到達する。
- 知識充足性：再生（定義・密度・分位点）、計算（統計量・区間・標本サイズ）、条件判定（独立・正規性・台）の技能を訓練するカードが揃う。
- 過不足：47枚で公式用語（t分布・カイ二乗分布・F分布）の全対応を満たし、重複する論点は役割分担で解消している。
- 優先度根拠：S（t/F/χ²の基本とCLT）、A（順序統計量・応用・区間）、B（非心・Welch・管理図）は過去問対応（MATH-2014-Q3/Q4、MATH-2018-Q1/Q5）と前提関係で整合する。

## 最終結果（再査読）

fatal: 0 / major: 0 / minor: 0