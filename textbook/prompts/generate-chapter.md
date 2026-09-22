# 章生成プロンプト

あなたは統計検定1級「統計数理」「統計応用（理工学）」向け独習教材の執筆者である。

この雛形は通常章・章内演習・30分ドリルの生成用である。`anki/` のカード生成には適用せず、Ankiカードは `AGENTS.md` のAnki規約に従う。

まず対象 `index.md` が `textbook/dream-theater-index.json` に掲載される DREAM THEATER ページかを判定する。

## 共通で読む正本

`AGENTS.md`、`CONTENT_GUIDELINES.md`、`EXERCISE_GUIDELINES.md`、`textbook/curriculum.yaml`、`textbook/notation.md`、`textbook/style-guide.md`、`textbook/dependency-graph.md`、対象章の `chapter.yaml` を読む。

通常の試験向け章では、あわせて `references/official-scope.md`、`references/past-exam-trends.md`、`references/past-exam-index.yaml` を読む。

DREAM THEATER の場合は、上記に加えて次を**必ず**読む。

1. `textbook/DREAM_THEATER_AUTHORING_STANDARD.md`
2. `textbook/DREAM_THEATER_EXERCISE_POLICY.md`
3. `textbook/formal-statement-presentation-guide.md`
4. `textbook/proof-presentation-guide.md`
5. `textbook/knowledge-dag.yaml`
6. 対象系列のカリキュラム・設計台帳

DREAM THEATER の本文品質・証明粒度・定義例・演習量・詳細解答・依存関係については `DREAM_THEATER_AUTHORING_STANDARD.md` を入口の正本とし、専用差分は `DREAM_THEATER_EXERCISE_POLICY.md` に従う。削除済みの旧 `f0-dream-theater-*-audit.md` を規約として探したり復活させたりしない。

章 `{{chapter_id}}`「{{chapter_title}}」を完成させよ。

## 共通制約

1. `chapter.yaml` の `prerequisites` にある章だけを既知として使う。専門語を削除・言い換えする前に、前提章で定義済みか確認する。前提章で学習済みなら通常語彙として使用し、必要な場合は正本へリンクする。
2. `learning_objectives` の全項目を、本文・具体例・証明・演習のいずれかで実質的に扱う。見出しや定理名だけ置いて達成扱いしない。
3. 本文は原則として「意味・動機 → 最小の具体例 → 定義・一般式 → 必要な導出・証明 → 使い道 → 演習」の学習導線を作る。定義・一般式・証明だけを連続して先に置かない。
4. 数学的完全性のために条件・補題・用語が必要になった場合、後続理論を逆輸入したり、CIを通すためだけに依存を増やしたりしない。既存の canonical result を再利用できるか先に確認する。
5. 既知の定理を論理依存として使う場合は、名称と適用条件を示す。formal result への参照は可能な限り stable anchor へ直接リンクする。
6. 分布の台、パラメータ空間、標本仮定、正則性条件など、定理・計算に必要な仮定を省略しない。
7. PMF・PDF・CDF・PGF・MGFなど非自明な略語を通常本文の主表記にしない。`references/terminology-guide.md` の日本語正式名を使う。
8. DREAM THEATER の `knowledge.yaml` では `aliases` を真の同義語だけに限定し、関連語・検索語・複合見出しは入れない。複合見出しは `introduction_aliases`、再掲 concept は canonical concept への `requires` で表す。stable ID / anchor と alias を後方互換目的で混同しない。
9. 既存問題や解答を転載・言い換えコピーしない。参考資料は難度・構造・解答粒度の校正に使う。

## 通常の試験向け章だけに適用する制約

1. `official_scope` と公式出題範囲を優先する。
2. Level C は実過去問と同様に一設定で4〜6小問を連結し、20〜30分で論述答案まで完成できる独自問題とする。
3. 詳細解答と本番答案を分離し、同じ結論になることを確認する。
4. `chapter.yaml` の `past_exam_alignment` に必要な過去問対応を記録する。
5. 実過去問は問題文を転載せず、公式入手先、年度・科目・大問、現在解く範囲、後続章へ保留する範囲、答案確認項目を示す。
6. Borel集合、Lebesgue測度、a.e.、微分同相、Tonelliの定理などを、prerequisite にないのに大学初年度読者の暗黙前提として持ち込まない。必要なら意味から導入するか共通基礎章・補足へ分離する。

## DREAM THEATER だけに適用する制約

1. 通常章の「大学初年度以上の概念を避ける」運用を機械的に持ち込まない。既知範囲は `prerequisites` と knowledge DAG で判定する。
2. `implemented`、`existing-anchor`、formal statement の存在、proof block の存在、CI greenだけで完成扱いしない。独習者が本文から主要概念・主要定理・核心論証を再構成できることを確認する。
3. 主役となる定義には、定義条件を実際に検証する直接例を置く。反例では、どの仮定を失い証明のどの機構が壊れるかまで説明する。
4. 後続依存の主要定理、learning objective そのものとなる主要定理、標準教科書で証明を学ぶことが自然な結果は、本文または canonical dependency で核心証明まで閉じる。「明らか」「同様」「既知」「標準的」で核心論証を飛ばさない。
5. 完全証明を閉じた状態でも、定理の意味・動機・最小例・重要な仮定・使い道が分かる教材導線を保つ。
6. 演習は理由付き例外がなければ実本文上 `Level A >= 4 / Level B >= 3 / Level C >= 1` を満たす。題数だけの水増しは禁止する。
7. 各演習には紙上で再現できる**詳細解答**を置く。本番答案・採点基準は新規追加しない。
8. 詳細解答では、出発点・使用定理・適用条件・主要中間式を追えるようにし、「整理すると」「計算すると」「同様に」で非自明な複数段を飛ばさない。
9. ページ長だけで分割しない。独立した中心問いが複数あり、それぞれ別の「定義→定理→証明→演習」サイクルを形成する場合に分割を検討する。

## 出力

- `index.md` を章本文の正本とし、必要な導入・定義・定理・具体例・証明・演習・詳細解答を1ページへ統合する。
- 通常の試験向け章では、各演習を「問題 → `<!-- solution-start -->` → 詳細解答・本番答案・採点基準 → `<!-- solution-end -->`」の順に置く。
- DREAM THEATER では、各演習を「問題 → `<!-- solution-start -->` → 詳細解答 → `<!-- solution-end -->`」の順に置く。
- DREAM THEATER の完全証明は `proof-presentation-guide.md` に従い `proof-start` / `proof-end` で折りたたむ。証明の見取り図・核心・重要な仮定は本文側に残す。
- formal statement は `formal-statement-presentation-guide.md` に従い、自己完結したステートメント、stable anchor、panel marker を持たせる。
- `chapter.yaml`、`glossary.yaml`、`review/validation.md` および必要な knowledge/dependency metadata を同期する。
- knowledge metadata を追加・更新するときは、読者向け主表記を `references/terminology-guide.md` に合わせ、短い alias が別分野の概念名を横取りしないか確認する。WARN を消すためだけに標準用語を不自然に改名しない。
- 旧 `00_overview.md`〜`09_past_exam_practice.md` 分割形式は新規生成しない。

生成後、数値例は独立計算で検算する。

通常章では少なくとも `npm run validate`、`npm run audit:textbook-granularity`、`npm run validate:pages` を実行する。

DREAM THEATER の変更章ではさらに、変更内容に応じて次を実行し、機械検証後に `DREAM_THEATER_AUTHORING_STANDARD.md` の査読チェックリストを人手確認する。

```bash
npm run validate:dream-theater-exercise-counts
npm run audit:proof-pedagogy
npm run audit:formalism-pedagogy
```

knowledge / standard math core を変更した場合は対応する strict validation も実行すること。
