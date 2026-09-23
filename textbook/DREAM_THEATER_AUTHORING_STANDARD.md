# DREAM THEATER 執筆・査読統合規約

このファイルを、`textbook/dream-theater-index.json` に掲載される **DREAM THEATER 数学講座の執筆・改稿・査読における入口となる正本**とする。

目的は、散在していた共通規約・表示規約・演習規約・旧監査台帳の判断基準を一つの順序へ整理し、AI・人間のどちらが編集しても「CI は通ったが教材として薄い」「古い監査記録を現行規約だと誤読した」という状態を防ぐことである。

このファイルは共通規約を全文複製しない。DREAM THEATER 固有の完成条件と、複数の正本をどう合成するかを定める。

---

## 1. 適用範囲と規約の読み順

対象 `index.md` が `textbook/dream-theater-index.json` に掲載される場合、この規約を適用する。

作業前に少なくとも次を確認する。

1. `CONTENT_GUIDELINES.md`
2. `EXERCISE_GUIDELINES.md`
3. `textbook/style-guide.md`
4. **本ファイル `textbook/DREAM_THEATER_AUTHORING_STANDARD.md`**
5. `textbook/DREAM_THEATER_EXERCISE_POLICY.md`
6. `textbook/formal-statement-presentation-guide.md`
7. `textbook/proof-presentation-guide.md`
8. 対象章の `chapter.yaml`
9. `textbook/knowledge-dag.yaml`、`textbook/dependency-graph.md`、対象系列のカリキュラム・設計台帳

適用範囲が重なる場合は、共通正本 → DREAM THEATER 統合規約 → DREAM THEATER 専用差分 → formal/proof 表示正本 → 個別章設計、の順で解釈する。

用語・一般記号・分布記法・KaTeX・formal statement・proof marker など、より専門の正本がある事項はその専門正本に従う。

### 1.1 旧監査Markdownを規約として使わない

過去の `f0-dream-theater-*-audit.md` は、特定時点の状態・残件・一時的判定を記録した監査台帳だった。そこに含まれていた再利用価値のある原則は本ファイルへ統合し、旧監査Markdown自体は削除する。

過去状態を確認する必要がある場合は Git 履歴を参照する。古い監査値を現行規約として復活させない。

特に、旧監査にあった **A2/B3** や **全問「問題・詳細解答・本番答案・採点基準」の4区分**は、DREAM THEATER の現行執筆規約ではない。現在は `DREAM_THEATER_EXERCISE_POLICY.md` の **A4/B3/C1** と **詳細解答必須・本番答案/採点基準不要**を採用する。

---

## 2. DREAM THEATER の目的と読者モデル

DREAM THEATER は統計検定1級の本番答案訓練ではなく、数学・確率・統計理論を大学数学の標準的な流れに沿って理解し、後続理論を自力で読めるようにする発展教材である。

したがって、通常の試験対策章にある「大学初年度以上の概念は極力避ける」という運用を機械的に適用しない。

**何を既知としてよいかは対象章の `prerequisites` と knowledge DAG で決める。**

- prerequisite にない概念を暗黙に先取りしない。
- prerequisite で既習なら、高度な語でも再定義を機械的に要求しない。
- その章で新しく主役になる概念は、意味・定義・例から導入する。
- 後続章の定理を現在章の証明へ逆輸入して循環依存を作らない。

標準数学コアでは「統計に直接必要か」だけで削らず、数学科の標準教科書で中核となる事項を、依存関係の範囲内で体系的に扱う。

---

## 3. 完成条件

次のいずれかだけでは完成扱いしない。

- `implemented` / `existing-anchor` / `reviewed` 等の metadata
- formal statement が存在する
- proof block が存在する
- 演習数の自己申告値が埋まっている
- CI が green

完成とは、**独習者が prerequisites だけを既知として、本文から主要概念・主要定理・核心論証を追い、演習で自力再現できる状態**をいう。

人手査読では最低限、次を確認する。

1. 定義の意味が本文から分かる。
2. 主役となる定義に、条件を実際に検証する具体例がある。
3. 主要定理について「何を言うか・なぜ欲しいか・どの仮定が働くか」が分かる。
4. 後続依存の主要結果は、本文または canonical dependency で核心証明まで閉じている。
5. 「明らか」「同様」「既知」「標準的」で核心論証を飛ばしていない。
6. learning objective が定理名・見出しだけでなく本文・例・演習のいずれかで実質的に扱われている。
7. 詳細解答を読めば、学習者が紙上で計算・導出・証明を再現できる。
8. 完全証明を閉じた状態でも、定理の意味・動機・最小例・重要な仮定・使い道を追える。

CI green は必要条件であって十分条件ではない。

---

## 4. 本文の標準学習サイクル

証明を持つ主要論点は、原則として次の学習サイクルを作る。

```text
何が問題か / なぜ必要か
  ↓
最小の具体例・反例
  ↓
定義・定理
  ↓
証明の見取り図・核心
  ↓
完全証明（折りたたみ）
  ↓
何が分かったか / どこで使うか
  ↓
その場で使う具体例・演習
```

見出し名を機械的に統一する必要はない。重要なのは、一般論・定義・定理・証明だけが連続する辞書形式にしないことである。

### 4.1 本文品質

- 抽象概念では、有限集合・低次元・具体的な関数・列・行列・確率変数など、手で確認できる最小例を優先する。
- 定理の前後に、その意味・必要性・後続での使い道を説明する。
- 「証明したから説明も済んだ」と扱わない。
- 厳密性のために不要な最大一般性を持ち込まない一方、必要な仮定を削って偽の一般性を作らない。
- 本文を短くするために核心論証を削らない。
- 同一ページに独立した中心問いが複数あり、それぞれ別の「定義→定理→証明→演習」サイクルを形成するなら分割を検討する。
- ページ長・文字数だけでは分割しない。一つの中心定理を最後まで構成するために長い場合は一講義としてよい。

---

## 5. 定義・具体例・反例

formal statement の表示・anchor は `formal-statement-presentation-guide.md` に従う。

主要な定義・定理・命題・補題は、ステートメント単体で対象・仮定・結論が分かるようにする。「同じ仮定の下で」「上の関数について」だけで本質条件を外へ預けない。

### 5.1 定義例

定義直後の例は、単に「これは定義を満たす」と宣言して終えない。

直前の定義に複数条件があるなら、少なくとも非自明な条件を式または論理で実際に確認する。主役となる抽象対象ごとに最低1つの直接例を検討する。

例の標準目安は一講義あたり 2〜4 個だが、数を機械的な完成条件にはしない。役割の異なる例を優先する。

### 5.2 反例

仮定が本質なら、可能な範囲で反例・失敗例を置く。

反例では「結論が偽」とだけ書かず、**どの仮定を失い、元の証明のどの機構が壊れたか**まで説明する。

---

## 6. 証明責務と粒度

証明の表示方法は `proof-presentation-guide.md` に従う。

### 6.1 原則完全証明するもの

次は原則として核心証明を省略しない。

- その章の learning objective そのものとなる主要定理
- 後続章が直接依存する主要結果
- 標準数学コアで、その分野の標準教科書なら証明を学ぶことが自然な結果
- 新しい証明技法・構成法を学ぶための代表結果

証明では必要に応じて、次を局所的に追えるようにする。

- 何を示せばよいか
- 量化順序
- どの仮定をどこで使うか
- 主要な構成
- 各包含・各含意
- well-defined 性
- 存在・一意性
- 極限・積分・微分・和の交換を正当化する条件
- 有限化、閉性、コンパクト性、完備性、可測性などが働く箇所

核心部分を「明らか」「同様に」「標準的議論」「既知」に置き換えない。

### 6.2 既存正本を再利用する場合

既存の canonical result で証明済みなら、同じ証明を複製しない。

- stable anchor へ直接リンクする。
- 現在の対象がその定理の仮定を満たす理由を局所的に確認する。
- 章トップへのリンクだけで「証明済み」としない。

### 6.3 意図的黒箱

完全証明が別分野の大規模理論・本章の射程を大きく超える理論を必要とする場合だけ、意図的黒箱としてよい。

その場合は、

- この教材では定理として使うこと
- 必要な追加前提
- 証明を扱う正本、または範囲外であること

を読者向けに明示する。

「証明が長い」だけでは黒箱化を正当化しない。

---

## 7. 演習量と役割

演習数の現行正本は `DREAM_THEATER_EXERCISE_POLICY.md` とする。

新規追加・実質的改稿を行った DREAM THEATER 章は、理由付き例外がなければ実本文上で最低

- Level A: **4題以上**
- Level B: **3題以上**
- Level C: **1題以上**

を満たす。

題数だけ合わせる水増しは禁止する。教育上不自然なら `chapter.yaml` の `dream_theater_exercise_count_exception` に理由を書く。

### 7.1 レベルの役割

- **Level A**: 定義確認、基本計算、証明の一段階など、章の基本操作を単独で実行する。
- **Level B**: 主力。複数の概念・命題を接続し、本文を読んだだけではなく自分で論証を組み立てる。
- **Level C**: 章全体または複数の主要論点を統合する自然な発展問題。単なる計算量増加で難化させない。
- Level D は DREAM THEATER だからという理由だけで院試・研究レベルへ難化させない。

問題数を満たしていても、主要 learning objective を一度も自力使用させていなければ不足と判定する。

---

## 8. DREAM THEATER の詳細解答

DREAM THEATER では各演習に **詳細解答**を必須とする。

**本番答案・20点採点基準は原則として作成しない。** これは通常の統計検定試験対策章との差分である。

詳細解答は答えの提示ではなく、再現可能な導出を書く。非自明な箇所では必要に応じて、

- 出発点
- 使用する定義・定理
- 適用条件
- 中間式
- 何を代入したか
- どの項が消えるか
- なぜその極限・積分・微分・交換が許されるか
- 結論

を追えるようにする。

「整理すると」「計算すると」「同様に」で複数段の非自明な計算や論証を隠さない。

証明問題では本文の証明を単に複写せず、学習者が証明戦略を再構成できる解説にする。

`EXERCISE_GUIDELINES.md` の途中式・定理適用・問題文自己完結性に関する共通原則は継承する。ただし「本番答案」「採点基準」の要求は `DREAM_THEATER_EXERCISE_POLICY.md` により免除する。

---

## 9. 依存関係と重複回避

編集前に対象章の `prerequisites`、knowledge DAG、standard math core の読順を確認する。

- 未習概念を暗黙に使わない。
- 必要な理論が既存章にある場合、新しい重複 concept・重複定理・重複章を作る前に正本を再利用できないか確認する。
- dependency 追加は CI を通すためではなく、実際の数学的依存がある場合だけ行う。
- 後続理論を証明へ逆輸入しない。
- formal dependency は canonical stable anchor へリンクする。
- 既存章を再利用する場合でも、対象章の learning objective に必要な説明・例・仮定確認まで参照先へ丸投げしない。

### 9.1 `knowledge.yaml` の語彙設計

`knowledge.yaml` の `name`、`aliases`、`introduction_aliases` は役割を分ける。

- `name` は concept を識別する読者向けの主名称とする。
- `aliases` は**同じ概念・定理を指す真の別称**だけに使う。関連語、検索語、構成要素、章内で同時に扱う語、単なる短縮見出しを入れない。
- 一つの見出し・formal label で複数 concept を同時に導入する場合、その見出し文字列は各 concept の `aliases` に重複登録せず、必要な concept の `introduction_aliases` に置く。
- 既出 concept を章内で再掲する場合は、canonical concept を `requires` で参照する。再掲側は「○○の再掲」「この章で使う○○の再掲」のように機械的に一意な名称を持たせ、canonical 名を alias として取り直さない。
- 同じ自然言語が分野ごとに別概念を表す場合、本文の標準語を無理に変えない。global alias は「関数列の下極限」「Markov連鎖の可逆性」「定係数線形ODEの特性多項式」のように必要な文脈を加える。
- stable ID・stable anchor は後方互換性のために保持するが、誤った alias は互換性層として温存しない。alias は semantic resolver の入力であり、URL互換や参照互換の代用品ではない。
- 数学的意味を持つ記号を正規化で落とさない。「弱*位相」と「弱位相」のように `*` が概念識別に効く場合は別 alias として保持する。Markdown の `**` 強調記号だけを装飾として除去する。
- 短い一般語 alias が他分野の concept 名へ広く食い込む場合は、まず「真の別称か」を確認する。真の別称なら WARN を許容できるが、関連語・構成要素なら `introduction_aliases` または本文へ移す。
- concept audit は HTML の tag / attribute、コード、数式、URL など読者本文ではない文字列を概念使用として扱わない。stable anchor の断片が別 concept の alias と一致しても dependency を発生させない。
- 真の別称でも `net`、`unit`、`torus` のように分野横断で多義的な語は `textbook/dream-theater-knowledge.yaml` の contextual alias として扱える。自由文や複合専門語中の部分一致だけでは blocking にせず、formal label、完全一致の強調・リンク文字列・引用など明示的な参照で使用を確定する。
- 「digital net」「単位トーラス」のような標準的な複合専門語が短い alias を含むだけなら、監査を通すために本文語彙を不自然に改名しない。誤検出なら resolver / policy を修正する。

既存 `knowledge.yaml` の alias を変更すると semantic resolution が未変更ページへ波及しうるため、scope detector が full audit を要求する場合は省略しない。WARN をゼロにすること自体を目的に語彙を不自然に改名せず、意味的な誤登録だけを直す。

---

## 10. 執筆・改稿の作業手順

1. 対象の実ファイルを確実に特定する。
2. 本規約と関連正本を読む。
3. `chapter.yaml`、prerequisite、knowledge DAG、formal dependency を確認する。
4. 既存章なら本文を通読し、不足している論証・例・演習・説明を特定する。いきなり全面書き換えしない。
5. 本文・formal statement・証明・例・演習・詳細解答を実装する。
6. learning objective ごとに本文・例・演習の coverage を人手確認する。
7. 必要な validation / audit を実行する。
8. CI green 後も、証明粒度・定義例・本文導線・演習量・詳細解答・依存関係を人手で再確認する。

DREAM THEATER の変更では最低限、変更内容に応じて次を使う。

```bash
npm run validate
npm run validate:pages
npm run validate:dream-theater-exercise-counts
npm run audit:proof-pedagogy
npm run audit:formalism-pedagogy
```

knowledge / standard math core を変更した場合は、対応する strict validation も実行する。

### 10.1 概念依存監査の範囲

概念依存監査は、変更の影響範囲に応じて使い分ける。PR では変更ページを対象にした changed-only strict validation を通常の blocking 検証とし、すべての教材変更で全 DREAM THEATER を再走査することは要求しない。

次は **changed-only を原則**とする。

- DREAM THEATER 本文・chapter metadata の通常編集
- 新規章の追加
- `dream-theater-index.json` への既存項目を壊さない path の純粋追加
- その新規章に対する新規 `knowledge.yaml` の追加

次は未変更ページへ判定が波及しうるため、PR でも **full audit** の対象とする。

- 既存章の `knowledge.yaml` の変更・削除・移動
- `dream-theater-index.json` における既存 path / section の削除・改名・移動・並べ替え
- `textbook/dream-theater-knowledge.yaml`、`textbook/dream-theater-inference-rules.yaml` の変更
- concept audit の判定ロジック・共通解決ロジック・workflow 自体の変更
- 差分基準を安全に解決できない場合

pure-add 判定は「既存 section と既存 path の順序・所属を保ったまま、新しい section または path だけを挿入した変更」とする。単に index ファイルが変更されたという理由だけで full audit を要求しない。

main への push では全体監査を実行し、リポジトリ全体の drift を継続的に検出する。将来、依存 DAG の downstream closure や alias の逆参照から影響ページを正確に列挙できるようになった場合は、既存章の knowledge 変更についても full audit を impact audit へ段階的に置き換えてよい。

具体的な CI 判定は `scripts/detect-dream-theater-concept-audit-scope.mjs` と `.github/workflows/validate-dream-theater-concepts.yml` を実装上の正本とする。

監査コマンドの警告を、見出しを足すだけで機械的に消さない。本文を読み、実際の欠陥がある場合だけ修正する。

---

## 11. 査読チェックリスト

公開・merge 前に対象章を実際に読み、次を確認する。

### 本文

- [ ] 主要論点に動機または位置付けがある。
- [ ] 抽象論だけが続かず、手で追える具体例がある。
- [ ] 定義・定理・証明の列だけになっていない。
- [ ] 証明を閉じても意味・重要な仮定・使い道が分かる。

### 定義・formal statement

- [ ] 主要定義に直接例がある。
- [ ] 定義例で条件を実際に検証している。
- [ ] formal statement が単体で対象・仮定・結論を確定できる。
- [ ] stable anchor があり、論理依存はその anchor へ飛ぶ。

### 証明

- [ ] 主要定理の核心論証を再構成できる。
- [ ] 仮定を使う場所が局所的に分かる。
- [ ] well-defined 性、存在、一意性、各包含・含意を必要な箇所で省略していない。
- [ ] 「明らか」「同様」「既知」で核心部分を隠していない。
- [ ] intentional black box は理由と境界を明記している。

### 演習・解答

- [ ] 原則 A4/B3/C1 以上、または教育上の理由付き例外がある。
- [ ] 主要 learning objective を演習で自力使用させている。
- [ ] 問題文だけで必要な対象・記号・仮定を特定できる。
- [ ] 詳細解答が紙上で再現可能である。
- [ ] 非自明な計算・証明を「同様に」「整理すると」で飛ばしていない。
- [ ] DREAM THEATER に不要な本番答案・採点基準を新規追加していない。

### 依存関係・knowledge metadata

- [ ] prerequisite 外の理論を暗黙使用していない。
- [ ] 後続章を逆輸入していない。
- [ ] 既存正本を再利用できるのに重複定理・重複 concept を作っていない。
- [ ] dependency は数学的に必要なものだけである。
- [ ] `aliases` に関連語・検索語・複合見出しを入れていない。
- [ ] 複合見出しは必要に応じて `introduction_aliases` で照合している。
- [ ] 再掲 concept が canonical 名を global alias として取り直していない。
- [ ] 短い alias の WARN を機械的に消さず、真の同義語か意味衝突かを確認した。

---

## 12. 最終判断原則

規約の形式的充足より、**独習者が数学を再構成できること**を優先する。

ただし「教育的に良さそう」という理由で、既存の正本・依存関係・ユーザーが指定した範囲を勝手に変更しない。

不足を見つけた場合は、その場しのぎの文言・marker・metadata の追加ではなく、実際の欠陥に応じて

- 本文補強
- 具体例・反例追加
- 証明補完
- 演習追加
- 詳細解答補強
- canonical result への参照
- 必要なら章分割

を選ぶ。

**見出し、marker、metadata、CI green を教材完成の代用品にしない。**
