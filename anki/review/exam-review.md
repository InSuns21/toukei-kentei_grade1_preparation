# Anki 静的カード教材 試験適合性査読（初回）

- 担当ID: `/root/anki_exam_review`
- 役割: 独立試験適合性査読
- 実行日時: 2026-08-13T22:48:12+09:00
- 対象: `anki/` の Markdown カード31枚、シラバス、validator、builder、生成済み静的Web
- 根拠資料: `AGENTS.md`、`agents/exam-editor-reviewer.md`、`pdfs/anki.md`、`references/official-scope.md`、`style-guide.md`
- 判定: **要修正（現状を公式範囲準拠の pilot 完成稿とは判定しない）**
- 最終件数: **fatal: 0 / major: 7 / minor: 2**

## 総評

31枚はいずれも概ね「1カード1論点」に収まり、多くの `formula`、`strategy`、`calc_step`、`recognition` カードが短い数値例または本質的な式変形を持つ。実ブラウザでも、問題を先に見せる表示、答え開閉、全文検索、カテゴリー・難易度・タグの複合絞り込み、並び替えの実装、390 px 幅での横あふれ防止を確認できた。読込要求はすべて `dist/` 内の相対資産であり、外部CDN・外部Web APIへの要求はなかった。

しかし、シラバスを粗い31個の下位区分へ縮約し、各区分にちょうど1枚置いただけの状態を validator が「未収録なし」と扱っている。公式範囲の実質的な網羅には遠く、特に統計数理の頻出定跡と統計応用（理工学）の主要項目が多数欠落している。また全31枚の出典が `official_syllabus` だけであるのに、全カードが過去問・教科書・独自問題の頻度を正数で主張しているため、頻度、優先度、ソート順を検証できない。Webの基本動作は良好だが、教材選定とメタデータの正当性については重大な改訂が必要である。

## Fatal

なし。

## Major

### EX-MAJ-01 公式範囲の実質的網羅が不足している

**根拠:** `official-scope.md` とカード全31枚を照合すると、少なくとも次がカードとして実質的に未収録である。

- 統計数理: 独立性、同時・周辺・条件付き分布、確率母関数・積率母関数、共分散・歪度・尖度、主要な離散・連続分布、$t$・カイ二乗・$F$ 分布、畳み込み、順序統計量、大数の法則、二項分布の正規・Poisson近似、モーメント法、最小二乗法を推定法として扱う定跡、一致性・有効性、Fisher情報量、Cramér--Rao不等式、最尤推定量の漸近正規性、Kullback--Leibler情報量、赤池情報量規準、交差検証、尤度比・Wald・Score検定、検出力、MCMC、Bayes推定、欠測・不完全データ、混合分布・潜在変数、有限母集団、逆関数法・棄却法・Monte Carlo法。
- 統計応用（理工学）: ランダムウォーク、Markov過程の主要性質、MA・ARIMA、一般化線形モデルの尤度・推定、管理図、保全性、工程管理、固定効果・変量効果、直交表、交絡法。

31枚は仕様の pilot 目安50〜150枚にも届かない。全範囲を横断するなら各公式項目の代表的な「局面→一手→計算」が必要であり、確率分布・推定に絞る pilot なら対象外範囲を明記して coverage 判定から外す必要がある。

**修正条件:** 公式範囲の原子項目ごとに `covered / planned / out_of_pilot` を明示し、`covered` は単なる語の掲載でなくカード本文中の本質的操作で判定する。pilot のスコープを確定したうえで、少なくとも仕様の50枚以上へ拡張する。

### EX-MAJ-02 シラバス分類と coverage validator が見かけ上の網羅を作っている

**根拠:** `syllabus.yaml` は公式分類を粗い独自下位区分へまとめている。例えば `bayes-missing-simulation` は bootstrap 1枚だけで Bayes・欠測・シミュレーションを収録済み扱いにし、`named-distributions` は Gamma型積分1枚、`time-series` は AR(1) 1枚、`design` はブロック化1枚が存在するだけで、それぞれの下位範囲全体が validator を通る。validator は subcategory が全カテゴリーの子集合のどこかに存在することしか見ず、その subcategory が指定 category の子であるかも検査しない。

**影響:** `npm run anki:validate` の成功が公式範囲網羅の証拠にならず、未収録分野を見落としたまま「公式シラバス準拠」と表示できる。

**修正条件:** 公式資料に追跡可能な粒度でノードを分割し、カードから公式ノードIDへ直接対応付ける。category と subcategory の親子関係、各公式ノードの最小カード数または明示的な未収録状態を validator で検査する。

### EX-MAJ-03 頻度・優先度・出典メタデータを検証できない

**根拠:** 全31枚の `sources` は `official_syllabus` 1件だけである。一方、全カードの `frequency.past_exam`、`textbook`、`independent_problems`、`source_confirmations` は正数であり、年度・科目・大問・小問、書籍章・問題番号、確認URLなどの裏付けがない。18枚が優先度S、12枚がAだが、定義上Sは過去問複数回、Aは過去問と教科書演習の双方への登場を要する。`prob-inclusion-exclusion` は自称 `past_exam: 1` のまま優先度Sで、内部定義とも矛盾する。

**影響:** 出題頻度、カード採用理由、頻度順ソート、S/A優先度が再現不能であり、5問中3問を選ぶ試験戦略に必要な優先順位を信用できない。

**修正条件:** 正数の各頻度を具体的な source レコードへ対応させ、同一過去問を複数解説で重複計上しない。確認できない頻度は0または `unknown` に戻す。priority と frequency/source の整合を validator で検査する。

### EX-MAJ-04 名前付き分布の定義・使用条件がカード単体でなお不足する

**根拠:** 査読中の並行更新で Bernoulli・二項・正規の一部カードには定義が補われた。しかしカードは単独で反復する教材であるのに、`multi-linear-combination` は多変量正規分布の台・母数条件・密度を置かず、`test-sign-test` は二項分布、`process-poisson-wait` はPoisson分布の確率質量関数を同じカード内に完全には示していない。`style-guide.md` と `AGENTS.md` は、名前付き分布を問題で使う際に定義を近くへ置き、読者に別ファイルを探索させないことを要求する。

**影響:** パラメータ化・台・正則性の取り違えを防ぐカード教材として不十分で、試験中に必要な条件確認を訓練できない。

**修正条件:** 各カードの論点を壊さない短い「使用する分布」欄、またはカードと同時表示される共通定義を用意し、台・母数・PMF/PDFを示す。定理・漸近結果では必要条件も列挙する。

### EX-MAJ-05 試験上のボトルネックに対して難易度・種別・採用配分が偏っている

**根拠:** 難易度は1が6枚、2が21枚、3が4枚で、4・5は0枚である。種別は `strategy` 10、`formula` 7に偏り、`expansion` と `pitfall` は各1、`reverse` は0である。包除原理、分散公式、直列系の積など即答級カードはある一方、仕様が重点収集対象とする平方完成、中心化平方和、条件付き密度、畳み込み、順序統計量、尤度の積から和、Fisher情報量、Cramér--Rao不等式、カイ二乗・$t$・$F$ の構造認識、尤度比検定などがない。

**影響:** 「知らないと本番で止まる一手」より基礎確認の比重が高く、統計検定1級の小問を高速処理する pilot としての識別力が弱い。S/Aが30/31枚であることも選択優先順位を実質的に失わせる。

**修正条件:** 根拠付き頻度と過去問の技能連鎖から採用カードを再選定し、頻出の `calc_step`、`expansion`、`recognition`、`proof_step`、`pitfall` を増やす。難易度3以上も、巨大問題にせず小問相当の計算ボトルネックとして収録する。

### EX-MAJ-06 必須レポートと機械検証が仕様を満たしていない

**根拠:** `reports/coverage.md` と `reports/frequent_moves.md` がなく、重複候補・数式レンダリング検証の報告もない。現行 validator は canonical tag、未知タグ、source schema、frequency の型・根拠、priority 整合、semantic duplicate を検査しない。`build_site.mjs --check` は生成HTMLに文字列 `katex` が含まれることを確認するだけで、`dist/` が Markdown からの最新生成物と一致するか、外部参照や未変換LaTeXがないか、検索・filter・Android幅が動くかを検査しない。

**影響:** 今回の31枚は機械検証に成功したが、古い `dist/`、不正な出典・タグ、誤った coverage、壊れたUIでも将来成功し得る。

**修正条件:** 公式ノード別・type別・過去問由来別・S/A別の coverage report と frequent moves report を生成する。`--check` は再生成結果との byte-level または正規化比較、ローカル資産閉包、未変換LaTeX、主要UIの自動テストまで含める。

### EX-MAJ-07 現在のMarkdown正本が機械検証に失敗する

**根拠:** 査読末尾の再実行で、`anki/cards/07_process.md:74` の

```text
\begin{aligned} ... \\(1-0.25) ... \end{aligned}
```

が禁止delimiter `\(` と判定された。`npm run anki:validate` は `cards\07_process.md: 禁止されたLaTeX delimiterです` で exit code 1、続けて実行した `npm run validate` も `anki/cards/07_process.md:74 禁止記法 \(` で exit code 1となった。これは初回読込後の並行更新で導入されたもので、カード本文は本査読担当の編集対象外である。

**影響:** Markdown正本から検証済みHTMLを再生成できず、現行 `dist/` が正本と同期していることも保証できない。

**修正条件:** `aligned` 内の改行と次行の開始を曖昧でないKaTeX記法へ直し、両コマンドを成功させたうえで `dist/` を再生成・同期確認する。

## Minor

### EX-MIN-03 生成HTMLに block 要素を paragraph 内へ入れる不正なマークアップがある

display math が `<p><div class="math-display">...</div></p>` として生成される。Chromiumは補正して表示し、390 px幅で文書全体の横あふれもなかったが、HTMLとして不正でブラウザ差の原因になる。display math は paragraph の外に独立 block として生成する。

### EX-MIN-04 ブラウザコンソールに favicon の404が出る

`http://127.0.0.1:8765/favicon.ico` が404となった。教材機能には影響しないが、静的配布物として不要なコンソールエラーをなくすため、faviconを同梱するか明示的な data URL faviconを指定する。

## 査読中の並行更新で解消を確認した項目

- `multi-covariance-psd`: タイトルが「半正定値性」へ修正され、本文と一致した。
- `data-bootstrap-mean`: 3個の再標本平均から標準誤差 $\sqrt{1/3}$ まで計算する例が追加された。
- Bernoulli・二項・正規を使う複数カード: 台・母数範囲・PMF/PDFまたは使用定理が補足された。ただし EX-MAJ-04 の残件はある。

## Web実動検証

- Chromiumで `dist/index.html` を localhost から読込: 成功。
- 全文検索 `Jacobian`: 1 / 31枚となり、該当カードだけ表示。
- 複合filter: category=`estimation`、difficulty=`3`、tag=`DeltaMethod` で 1 / 31枚となり、異なる軸のAND動作を確認。コード上、同一タグ軸はOR、難易度軸もORである。
- 答え開閉: `details` が開き、答え本文がDOMに存在することを確認。本文は初期HTMLに含まれるため、JavaScriptが壊れても失われない。
- viewport 390 × 844: `innerWidth=390`、`documentElement.scrollWidth=390`。文書全体の横あふれなし。長い数式は `.math-display` の横スクロール対象。
- 静的要求: 読込13件は `index.html`、ローカルCSS・JavaScript、ローカルKaTeX fontのみ。外部HTTP(S)要求なし。閲覧時の数式レンダラー呼出しなし。
- 制約: Playwright CLIは `file:` URLへの遷移をポリシー上拒否したため、`file://` 直接起動そのものは同CLIでは未実施。ただし全参照が相対ローカル資産で閉じ、外部要求がないことは確認した。

## 機械検証

### `npm run anki:validate`

- 初回実行結果: **成功**（`validated 31 cards (0 warnings)`、`checked 31 cards`）
- 査読末尾の再実行結果: **失敗**（exit code 1）
- エラー: `cards\07_process.md: 禁止されたLaTeX delimiterです`
- 判定には最新の失敗を採用する。初回成功後に対象カードが並行更新されている。

### `npm run validate`

- 初回実行結果: **成功**（構造・KaTeX strict・テキスト検証すべて成功）
- 査読末尾の再実行結果: **失敗**（exit code 1）
- 構造検証: 成功
- KaTeX strict: `anki/cards/07_process.md:74 禁止記法 \(` で失敗
- 後続のテキスト検証: KaTeX strict失敗のため未実行

## 再査読で確認する受入条件

1. 公式範囲ノードと各カードの対応が追跡可能で、pilot対象外も明示されている。
2. 50枚以上の pilot とし、EX-MAJ-01・05の中核定跡を優先して補う。
3. 全 frequency・priority が具体的 sources と整合する。
4. 名前付き分布と主要定理の条件をカード単体で確認できる。
5. coverage / frequent moves レポートと強化 validator が追加される。
6. Webの現行合格項目を維持し、HTML validity と favicon エラーを解消する。
7. 修正後に `npm run anki:validate` と `npm run validate` がともに成功する。

---

# 修正後再査読

- 担当ID: `/root/anki_exam_review`（初回と同一担当）
- 実行日時: 2026-08-13T23:12:07+09:00
- 対象: 公開カード50枚、非公開ドラフト2枚、`anki/notation.md`、`anki/formulae.md`、シラバス、validator、builder、生成済み3ページ
- 判定: **要修正**
- 修正後最終件数: **fatal: 0 / major: 7 / minor: 3**

## 修正確認

| 初回指摘 | 修正確認 | 再判定 |
|---|---|---|
| EX-MAJ-01 公式範囲・pilot枚数 | 公開カードは31枚から50枚へ増え、仕様のpilot下限に到達した。畳み込み、順序統計量、MGF、モーメント法、Fisher情報量、Cramér--Rao、AIC、尤度比検定、Bayes、EM、Monte Carlo、MA、管理図などが追加された。 | **一部解消・major継続**。公式原子項目別の `covered / planned / out_of_pilot` はなく、後述の未収録項目を「準拠」の範囲から区別できない。 |
| EX-MAJ-02 粗い分類と見かけ上のcoverage | `bayes-missing-simulation` は4枚、`transformations` は3枚など、一部の粗い下位区分に複数カードが入った。 | **未解消**。シラバス構造自体は不変で、validatorも全カテゴリー横断のsub-ID存在しか見ず、親子関係・公式原子項目を検査しない。 |
| EX-MAJ-03 頻度・優先度・出典 | 公開50枚へ拡張された。 | **未解消**。50枚すべての `sources` が `official_syllabus` だけで、全frequencyが正数。年度・科目・大問・教科書問題番号は0件。S=25、A=24で選択優先度もほぼ二値のまま。 |
| EX-MAJ-04 分布定義・使用条件 | `notation.md` が追加され、Bernoulli・二項・正規など複数カードの問題内にも台・母数・PMF/PDFが再掲された。 | **一部解消・major継続**。多変量正規、符号検定の二項分布、Poisson過程、Poisson回帰、Cramér--RaoのBernoulli標本などにはカード内の完全な分布定義がない。正則条件も後述のとおり具体化不足。 |
| EX-MAJ-05 難易度・種別・採用配分 | 本番で止まりやすい計算定跡が大幅に追加され、難易度3は4枚から10枚へ増えた。 | **一部解消・major継続**。`reverse` は0枚で、仕様の「最低限用意」に未達。`pitfall` と `expansion` は各1枚、難易度4・5は0枚、49/50枚がS/Aで、pilotとして識別力がなお弱い。 |
| EX-MAJ-06 レポート・機械検証 | 50枚固定、`使用公式・定理`・`計算例`必須、正本KaTeX、日本語分布名の一部を検査するよう強化された。 | **一部解消・major継続**。coverage/frequent-moves等の必須レポート、source/frequency/priority整合、canonical tag、重複、dist同期、UI、外部参照の検査は未実装。 |
| EX-MAJ-07 禁止delimiter | `07_process.md` の記法が修正された。 | **解消**。両検証コマンドが成功。 |
| EX-MIN-03 不正HTML | builderのparagraph処理は不変。 | **未解消**。`<p><div class="math-display">...</div></p>` が生成済みHTMLに残る。 |
| EX-MIN-04 favicon 404 | `index.html` にはdata URL faviconが追加された。 | **一部解消・minor継続**。`notation.html` を新規セッションで開くと `/favicon.ico` が404。生成する補助2ページにはfavicon指定がない。 |

## 修正後 Fatal

なし。

## 修正後 Major

### RE-EX-MAJ-01 公式範囲の未収録状態を明示できない

50枚pilotとして幅は改善したが、公開カードには依然として、大数の法則、二項分布の正規・Poisson近似、共分散・歪度・尖度、カイ二乗・Studentの $t$・$F$ の構造認識、MLEの漸近正規性、一致性・有効性、Kullback--Leibler情報量、交差検証、Wald・Score検定、検出力、MCMC、finite population、逆関数法・棄却法、ランダムウォーク、ARIMA、保全性、固定・変量効果、直交表などがない。交絡法と制約付き最小二乗はMarkdownに存在するが `published: false` なので公開50枚のcoverageには数えられない。

pilotが全範囲の完成版でないこと自体は許容できる。しかし、`syllabus.yaml` と画面は未収録を示さず、各粗いsubcategoryに1枚以上あれば「公式準拠」に見える。公式原子項目ごとの `covered / planned / out_of_pilot` と公開カードIDを記録する必要がある。

### RE-EX-MAJ-02 シラバス分類・coverage検査が公式原子項目を表さない

`bayes-missing-simulation`、`named-distributions`、`time-series`、`design` のように複数の公式項目を束ねた独自sub-IDが残る。validatorは `subcategoryIds` を全カテゴリーから平坦化して検査するため、カードのsubcategoryがそのcard.categoryの子であることも保証しない。coverageも「各sub-IDに少なくとも1枚」のみである。

公式資料に追跡可能なノードID、category-subcategory親子整合、公開状態を考慮した原子項目coverageを検査する必要がある。

### RE-EX-MAJ-03 provenance・frequency・priorityが依然として裏付けられない

公開50枚のsource typeは全件 `official_syllabus` のみである。一方、全カードで `past_exam`、`textbook`、`independent_problems`、`source_confirmations` が正数である。例えば `prob-inclusion-exclusion` は `past_exam: 1` のままpriority Sで、Sの定義「過去問で複数回」と自己矛盾する。

この状態では頻度順ソートとS/A表示を試験戦略へ利用できない。各正数を年度・科目・大問・小問または書籍章・問題番号へ対応させ、validatorでfrequency/source/priority整合を検査する必要がある。

### RE-EX-MAJ-04 カード内分布定義と正則性条件の再掲が不完全

`notation.md` へのリンクは有用だが、仕様はカード単体での再掲を要求する。次の例はなお不足する。

- `multi-linear-combination`、`multi-conditional-normal`: 多変量正規分布の台・母数条件・密度を問題内に再掲しない。
- `test-sign-test`: 二項分布のPMFを再掲しない。
- `process-poisson-wait`、`model-poisson-glm`: Poisson分布の台・母数・PMFを完全には再掲しない。
- `est-cramer-rao-bernoulli`: Bernoulli分布の台・PMF、特に正則な内部母数 $0<p<1$ を問題内に置かない。
- `est-fisher-bernoulli`、`est-cramer-rao-bernoulli`、`test-likelihood-ratio` と `formulae.md`: 「正則条件の下で」に留まり、微分可能性、母数に依存しない台、微分と総和・積分の交換、情報量の有限性、真値の内部性・識別可能性など、使用する結果ごとの条件を列挙しない。

また `notation.md` 自体もStudentの $t$ 分布と $F$ 分布は構成表示のみ、logistic分布はCDFのみで、表示規則が求めるPMF/PDFを満たしていない。

### RE-EX-MAJ-05 最低限のカード種別と選択優先順位が未完成

公開50枚のtypeは `strategy: 18 / formula: 12 / calc_step: 6 / recognition: 6 / theorem: 2 / proof_step: 2 / condition: 2 / expansion: 1 / pitfall: 1 / reverse: 0`。仕様第9節が最低限用意するとした10種のうち `reverse` がない。頻出式変形・典型罠を独立に反復する層も薄い。difficultyは `1: 7 / 2: 33 / 3: 10 / 4: 0 / 5: 0`、priorityは `S: 25 / A: 24 / B: 1` である。

50枚pilotの量的要件は満たしたが、根拠付きpriorityへの再配分と、少なくとも全必須typeの代表カードが必要である。

### RE-EX-MAJ-06 validatorと必須レポートが完成条件を証明しない

改善後も `reports/` は `validation_errors.md` だけで、仕様が重要成果物とする `coverage.md` と `frequent_moves.md` がない。validatorには同一の `使用公式・定理`・`計算例` 検査が重複記述され、次を検査しない。

- source schema、frequencyの型・根拠、priority定義との整合
- canonical tag・未知tag、duplicate候補
- categoryとsubcategoryの親子関係
- 名前付き分布すべての日本語名・台・母数・PMF/PDF（現行日本語名regexは正規、一様、Poisson、二項、Bernoulli、指数、Betaに限られる）
- 未変換LaTeX、HTML validity、外部依存、検索・複合filter、タブレット幅
- Markdown・notation・formulaeと既存 `dist/` の同期

`build_site.mjs --check` は主ページHTMLをメモリ生成して `katex` 文字列の存在を調べるだけで、`notation.html`・`formulae.html` をcheckせず、既存distとも比較しない。

### RE-EX-MAJ-08 `formulae.md` が「利用公式の正本」として不完全

`formulae.md` は「カード教材で利用する公式・定理・定義の正本」と宣言するが、50枚の「使用公式・定理」欄で使う項目の相当数が正本にない。例として、包除原理、離散CDFの累積、Gamma積分、最尤推定のargmax、正規平均の信頼区間、符号検定、標本オッズ比、bootstrap標準誤差、共分散行列の半正定値性、Rayleigh商、線形対比、logistic回帰のオッズ比、乱塊法、モーメント法、Beta--Bernoulli共役、EM負担率、Monte Carlo積分、条件付き正規、定常分布、MA(1)自己共分散、Poisson回帰の平均比、指数寿命、交互作用の差の差が未収録である。

収録済み項目について、$N(\mu,\sigma^2)$ の第2引数、Gamma shape-rate、$I_1/I_n$、転置、自己共分散、AIC、尤度比、AR(1)などの表記に矛盾は見つからなかった。問題は矛盾よりも正本の網羅不足である。各公開カードのformula IDを正本項目へ機械的に対応させ、未対応をerrorにする必要がある。

## 修正後 Minor

### RE-EX-MIN-03 display mathのHTML構造

生成HTMLに `<p><div class="math-display">...</div></p>` が残る。Chromiumは補正するがHTMLとして不正である。display数式をparagraphの外へ生成する。

### RE-EX-MIN-04 補助ページのfavicon 404

主ページでは解消したが、`notation.html` を開くと `/favicon.ico` が404となる。`notation.html` と `formulae.html` のheadにも主ページと同じfaviconを入れる。

### RE-EX-MIN-05 正本内の用語・記法の小さな不一致

- `notation.md` のPareto分布で `$x_m,alpha>0$` とあり、Greek文字 `\alpha` ではなく英字積 `alpha` として数式レンダリングされる。
- `dist-mgf-poisson` は「モーメント母関数」と書くが、プロジェクトの正式日本語名規則に合わせ「積率母関数（moment generating function; MGF）」へ統一するのが望ましい。

## 修正後Web実動検証

- Chromiumで公開50枚を確認。DOM上の `.card` は50件、表示カウンタも `50 / 50`。
- viewport 768 × 1024で `innerWidth=768`、`scrollWidth=768`。タブレット基準で文書全体の横あふれなし。
- 全文検索 `Fisher情報` は2件（Fisher情報量、Cramér--Rao）を返した。
- category=`estimation`、difficulty=`3`、tag=`Fisher情報` の複合条件で `est-fisher-bernoulli` 1件となり、異なる軸のAND動作を確認。
- `notation.html` と `formulae.html` への導線、戻るリンク、見出し・数式表示を確認。両ページとも768pxで横あふれなし。
- 主ページのブラウザコンソールは errors 0 / warnings 0。notationページのみfavicon 404が1件。
- 主ページの静的要求14件はすべて `127.0.0.1` 上のHTML・CSS・JavaScript・font。外部HTTP(S)要求なし。
- 答え本文は引き続き初期HTMLに存在し、native `details` で開閉する。

## 修正後機械検証

### `npm run anki:validate`

- 実行結果: **成功**（exit code 0）
- `validated 50 cards (0 warnings)`
- `checked 50 cards`
- ただし成功範囲には RE-EX-MAJ-01〜06・08 の未検査事項を含まない。

### `npm run validate`

- 実行結果: **成功**（exit code 0）
- 構造検証: 成功
- KaTeX strict: Markdown 231ファイルを検証し成功（査読報告追記後の最終実行）
- テキスト検証: 生成対象237件を検証し成功

---

# Anki配信・継続アーキテクチャ変更査読

- 担当ID: `/root/anki_exam_review`（カード教材の全試験適合性査読と同一担当）
- 実行日時: 2026-08-13T23:57:04+09:00
- 査読単位: 今回追加・変更された配信HTML生成、カテゴリー/サブカテゴリー分割、進捗状態機械、独立査読契約、継続執筆・選択コミット導線
- 対象: `anki/scripts/build_site.mjs`、`validate_cards.mjs`、`progress.mjs`、`progress.yaml`、両HTML template、`syllabus/syllabus.yaml`、生成済み `dist/*.html`、`AGENTS.md`、`anki/README.md`、`anki/prompts/review-batch.md`、`package.json`
- カード内容: 直前の全50枚 `fatal: 0 / major: 0 / minor: 0` を基準とし、今回変更による回帰だけを確認した。
- 判定: **要修正**
- 今回の最終件数: **fatal: 0 / major: 3 / minor: 0**

## Fatal

なし。

## Major

### ARCH-EX-MAJ-01 継続手順が配信HTMLを生成せず、staleな `dist/` でも完了できる

`npm run anki:validate` は `validate_cards.mjs` の後に `build_site.mjs --check` を実行するが、`--check` はメモリ上でHTMLを組み立てるだけで `dist/` へ書かず、既存生成物との一致も比較しない。`progress.mjs complete` も `anki:validate` と全体 `validate` だけを呼び、`npm run anki:build` を呼ばない。`AGENTS.md` のAnki継続手順にもbuild工程がないため、カードやtemplateを更新したまま古い配信HTMLを選択コミットできる。

今回の作業ツリーでも実害を確認した。`anki/templates/index.html` は2026-08-13 23:44:46更新で `.page-nav` に `flex-wrap: wrap` とpaddingがある一方、生成済み `category-probability.html` は23:44:26更新で、その2指定がない古いHTMLである。それでも `npm run anki:validate` は成功する。768×1024の実ブラウザでは古いナビゲーションが全10リンクを一列へ圧縮し、長い日本語カテゴリー名が細かく改行された。

`complete` の最終検証前に必ずbuildし、その後にcleanな一時出力または再生成結果と `dist/` のファイル集合・内容が一致することをvalidatorで検査する必要がある。生成済みHTMLをコミット対象とする契約なら、check-onlyの成功だけでは不十分である。

### ARCH-EX-MAJ-02 `progress.mjs` の状態遷移と独立再査読契約を機械的に迂回できる

`AGENTS.md` と `review-batch.md` は、`self_review -> independent_review -> revision -> reviewed`、2独立査読、同一担当の全バッチ再査読を明記しており、今回 `independent_review` stageと末尾判定確認が追加された点は改善である。しかし `progress.mjs stage` は現在状態を見ず、存在するbatchへ `self_review`、`independent_review`、`revision` のどれでも直接設定できる。したがってコード上は `planned -> revision` が可能である。`start` も別の `current_batch` があっても開始でき、既存のactive batchを上書きできるほか、`revision -> drafting` の逆行を許す。

`complete` は独立査読前のstatusを拒否し、各ファイル中の最後の件数表記がゼロかを確認するようになったが、担当ID・実行日時・初回指摘・修正確認、初回と再査読の担当一致、reviewが当該batch開始後に作成されたことは確認しない。順序付きtransition map、単一active batch制約、review metadataの構造化とphase/reviewer IDの対応検査が必要である。

### ARCH-EX-MAJ-03 環境変数で1ページ200枚上限を迂回できる

validatorは `progress.cards_per_page` を1〜200に制限するが、builderが実際に使う値は `Number(process.env.ANKI_PAGE_SIZE || progress.cards_per_page)` であり、環境変数側を検査しない。再現として次はいずれもexit code 0だった。

```text
ANKI_PAGE_SIZE=201 node anki/scripts/build_site.mjs --check
checked 50 cards in 9 category page(s), max 201 per page

ANKI_PAGE_SIZE=500 node anki/scripts/build_site.mjs --check
checked 50 cards in 9 category page(s), max 500 per page
```

現在は最大カテゴリー8枚なので直ちに201枚ページは生成されないが、将来の継続バッチでは要件を破る。builderで**実効pageSize**自体を整数1〜200に制限し、最終検査も `page.cards.length <= 200` という固定上限にする必要がある。

## Minor

なし。

## 合格確認事項

- `dist/index.html` はカード本文を持たないカテゴリー一覧で、公式範囲に沿う統計数理5カテゴリー、統計応用（理工学）4カテゴリー、合計9カテゴリーと各枚数を表示する。
- 公開50枚は9個の `category-<category-id>.html` に重複なく分かれ、旧 `cards-*.html` は残っていない。
- `syllabus.yaml` の全subcategory IDに日本語表示名があり、生成ページのselect、カードheader、ナビゲーションは日本語名を使う。英語IDはvalue/URL等の内部識別子に限定される。
- 分割実装は、カテゴリーが実効上限以下ならカテゴリー単位、超えた場合は `category.children` の意味境界を先に使い、そのsubcategoryだけが上限超過なら内部をsliceする順序である。`ANKI_PAGE_SIZE=2` の非書込checkでも、50枚が35ページへsubcategory優先で分割され、各ページ2枚以下になった。
- Playwright実動確認: 768×1024でカテゴリー一覧から「確率」ページへ遷移でき、3枚を表示した。subcategory selectは「確率変数・分布関数」「事象と確率」「条件付き確率・独立・Bayes」と日本語表示され、「事象と確率」の選択で3枚から1枚へ絞り込まれた。カード、検索・filter、答えのnative `details` は維持されている。
- HTML・CSS・JavaScript・KaTeX fontは相対参照で `dist/` 内にあり、外部HTTP(S)依存はない。
- `AGENTS.md` は50枚執筆、self review、`independent_review` stage、2独立査読、revision、同一担当再査読、両validator、progress更新、対象ファイルの選択的stage/commit、commit後確認を明記する。`review-batch.md` の上限も200枚・意味境界優先へ一致した。
- `npm run anki:progress` は `cards: 50 / current_batch: null / next_batch: batch-002 / reviewed: 1 / planned: 1` を返した。

## 機械検証

### `npm run anki:validate`

- 実行結果: **成功**（exit code 0）
- `validated 50 cards (0 warnings)`
- `checked 50 cards in 9 category page(s), max 200 per page`
- ただしARCH-EX-MAJ-01・03のとおり、既存 `dist/` との同期と固定200上限は検査範囲外である。

### `npm run validate`

- 実行結果: **成功**（exit code 0）
- 構造検証: 成功
- KaTeX strict: Markdown 232ファイルを検証し成功
- テキスト検証: 生成対象249件を検証し成功

---

# Anki配信・継続アーキテクチャ修正後再査読

- 担当ID: `/root/anki_exam_review`（初回と同一担当）
- 実行日時: 2026-08-14T00:00:35+09:00
- 判定: **要修正**
- 修正後最終件数: **fatal: 0 / major: 1 / minor: 0**

## 初回3 majorの修正確認

| 初回指摘 | 修正確認 | 再判定 |
|---|---|---|
| ARCH-EX-MAJ-01 stale `dist/` で完了可能 | `AGENTS.md` とREADMEへ `npm run anki:build` が追加された。`--check` は期待HTML全件、余剰HTML、style/app一致、オフライン数式資産の存在を検査する。現行 `dist/` は再生成済みでtemplateと一致する。 | **解消**。`npm run anki:validate` も9カテゴリー全生成物の一致を確認して成功した。 |
| ARCH-EX-MAJ-02 状態遷移・再査読契約の迂回 | 単一active batch、`drafting -> self_review -> independent_review -> revision` のstage順、最新判定、初回/最終担当ID一致、両日時、初回指摘/修正確認の存在検査が追加された。 | **一部解消・major継続**。`complete` が `independent_review` 状態をなお許すため、revision stage自体を迂回できる。 |
| ARCH-EX-MAJ-03 200枚上限の環境変数迂回 | builderが実効 `pageSize` を整数1〜200に制限する。 | **解消**。`ANKI_PAGE_SIZE=201 ... --check` はexit code 1、「1ページの上限は1〜200枚です」で拒否された。 |

## Fatal

なし。

## Major

### RE-ARCH-EX-MAJ-01 `complete` が `independent_review -> revision` を必須化していない

`stage` の通常遷移は厳密になったが、`complete` の受入条件は次のままである。

```js
if (!new Set(["independent_review", "revision"]).has(batch.status)) ...
```

このため、独立査読stageのまま査読ファイルへ `initial_reviewer_id`、`final_reviewer_id`、両日時、「初回指摘」「修正確認」、末尾ゼロ判定を置けば、`stage ... revision` を一度も実行せず完了できる。要求された「2独立査読 → 修正 → 同一査読者再査読」という工程順を状態機械が保証しない。

`complete` は `batch.status === "revision"` のみ受理する必要がある。さらにrevisionへ遷移した日時を記録し、`final_reviewed_at` がその後であることを検査すれば、再査読の時系列も保証できる。

## Minor

なし。

## 修正後合格確認

- `index.html` は9カテゴリーの一覧、カードは9個のカテゴリー別HTMLに分離される。
- 公式シラバスに沿うカテゴリー構造、日本語subcategory表示、意味境界を先に使う分割順、単一subcategory内だけの最大200枚分割に回帰はない。
- Playwrightによる768×1024実動確認で、カテゴリー入口から確率ページへ遷移し、日本語subcategory「事象と確率」を選ぶと3枚から1枚へ絞り込まれた。更新済みpage-navはwrapと44px以上の操作領域を持つ。
- `dist/` は相対参照のHTML/CSS/JavaScript/KaTeX fontだけで閲覧でき、外部HTTP依存はない。
- AGENTS/README/review promptは、50枚単位、2独立査読、同一担当再査読、build、両validate、進捗更新、選択コミットを明記する。

## 修正後機械検証

### `npm run anki:validate`

- 実行結果: **成功**（exit code 0）
- `validated 50 cards (0 warnings)`
- `checked 50 cards in 9 category page(s), max 200 per page`

### `npm run validate`

- 実行結果: **成功**（exit code 0）
- 構造検証: 成功
- KaTeX strict: Markdown 232ファイルを検証し成功
- テキスト検証: 生成対象237件を検証し成功

### 200枚上限の負例

- `ANKI_PAGE_SIZE=201 node anki/scripts/build_site.mjs --check`: **期待どおり失敗**（exit code 1）
- エラー: `1ページの上限は1〜200枚です`

## 再修正の受入条件

1. 公式原子項目ごとの公開coverage状態を作り、未収録を準拠済みに数えない。
2. 全frequency・priorityを追跡可能な過去問・教科書sourceと整合させる。
3. 公開カード内の分布定義・正則性条件を補完する。
4. 10種すべてのカードtypeをpilotに含め、priorityを実データで再配分する。
5. `formulae.md` の全項目にIDを付け、全公開カードから機械対応させる。
6. coverage / frequent movesレポートと、dist・UI・外部依存まで検査するvalidatorを追加する。
7. minor 3件を解消し、両検証コマンドを再度成功させる。

---

# 基準変更後・第2回再査読

- 担当ID: `/root/anki_exam_review`（初回・前回と同一担当）
- 実行日時: 2026-08-13T23:20:12+09:00
- 適用基準: 名前付き分布はカード内で日本語名を明記し、台・母数範囲・PMF/PDFの完全定義は `anki/notation.md` に集約する。英語正式名・略語はカードでは要求しない。
- 対象: 公開カード50枚、非公開ドラフト2枚、`notation.md`、`formulae.md`、`syllabus/coverage.yaml`、3種レポート、validator、builder、生成済みWeb
- 判定: **要修正**
- 最終件数: **fatal: 0 / major: 5 / minor: 0**

## 基準変更と修正確認

| 旧指摘 | 現行確認 | 再判定 |
|---|---|---|
| RE-EX-MAJ-01 / 02 公式範囲coverage | `syllabus/coverage.yaml` と `reports/coverage.md` が追加され、未収録を `planned`、正本だけの項目を `reference` と表示する枠組みはできた。 | **一部解消・major継続**。項目が原子的でなく、複数項目の一部だけを扱うカードでも束全体が `card` になる。validatorも意味上の対応を検査しない。 |
| RE-EX-MAJ-03 provenance・frequency・priority | metadataの形は全50枚にある。 | **未解消・major継続**。公開50枚の `sources` は依然すべて `official_syllabus` だけで、頻度値を年度・科目・問題番号や教科書章・問題番号へ追跡できない。 |
| RE-EX-MAJ-04 カード内分布定義 | ユーザー指定により、カード内の完全な台・母数・PMF/PDF再掲は不要となった。カードでは日本語分布名を先に書く運用とvalidatorが追加された。 | **カード内定義不足の指摘は撤回・解消**。ただし集約先 `notation.md` の完全性と、定理を使うのに必要な正則条件の不足は別件としてmajor継続。 |
| RE-EX-MAJ-05 type構成 | `dist-variance-moment` が `reverse` となり、公開50枚に10種すべてが存在する。公開内訳は formula 11 / theorem 2 / condition 2 / proof_step 2 / calc_step 6 / expansion 1 / recognition 6 / strategy 18 / reverse 1 / pitfall 1。 | **解消**。難易度4・5がないこと自体は50枚pilotの必須違反とはしない。根拠のないpriorityはRE-EX2-MAJ-02で扱う。 |
| RE-EX-MAJ-06 レポート・validator | `coverage.md`、`frequent_moves.md`、`duplicate_candidates.md` が生成されるようになった。 | **一部解消・major継続**。レポート列と検証内容が仕様所定の情報を満たさない。 |
| RE-EX-MAJ-08 `formulae.md` | 前回列挙した公式の大半が追加され、公開カードとの式・記法に数値的な矛盾は見つからなかった。 | **一部解消・major継続**。利用公式との機械的対応がなく、Poisson分布のMGF、MLEのargmax、ロジットリンク等、カードで使う式が正本に未収録。 |
| RE-EX-MIN-03 不正HTML | display数式を段落外に生成する実装へ変更された。現行 `dist/` に `<p><div` はない。 | **解消**。 |
| RE-EX-MIN-04 favicon | `index.html`、`notation.html`、`formulae.html` の全headにdata URL faviconがある。 | **解消**。 |
| RE-EX-MIN-05 正本の記法・用語 | Pareto分布は `$x_m,\alpha>0$` へ修正済み。「モーメント母関数」はリポジトリ直下 `notation.md` と一致する。 | **解消**。 |

## Fatal

なし。

## Major

### RE-EX2-MAJ-01 `coverage.yaml` が公式範囲の原子項目を正しく表さず、過大な `card` 判定がある

追加された状態管理は改善だが、名称が複数の独立論点を一項目へ束ねている。実質対応を確認すると、少なくとも次は `card` が束全体をカバーしていない。

- `不偏性・一致性・有効性`: bias--variance分解とCramér--Raoだけで、一致性を扱わない。
- `MLE漸近正規性・Delta法`: `est-delta-log` はDelta法だけで、MLEの漸近正規性を扱わない。
- `KL情報量・AIC・交差検証`: `est-aic-choice` はAICの数値比較だけで、KL情報量と交差検証を扱わない。
- `AR・MA・ARIMA`: AR(1)とMA(1)はあるがARIMAを扱わない。
- `線形対比・制約`: 公開カードは線形対比だけで、制約付き最小二乗は `published: false`。
- `信頼性・保全性`: 信頼度と指数寿命はあるが、保全性を扱わない。
- `固定効果・変量効果・ブロック・直交表・交絡`: 公開カードはブロック化と交互作用だけで、固定/変量効果・直交表を扱わず、交絡カードは `published: false`。

公式資料は「単なる語の掲載を範囲カバーと数えない」としている。各独立論点を分割し、`card / reference / planned` を個別に付ける必要がある。現行validatorはstatus、ID存在、空配列だけを調べ、カード本文が項目を実質的に扱うかやcategory-subcategory親子関係を検証しない。

### RE-EX2-MAJ-02 frequency・priorityに追跡可能な根拠がない

公開50枚はすべて `sources: [{ type: official_syllabus, ... }]` のみだが、全カードの `past_exam`、`textbook`、`independent_problems`、`source_confirmations` は正数である。例えば `prob-inclusion-exclusion` は `past_exam: 1` なのにpriority Sで、仕様の「S = 過去問で複数回登場」とも矛盾する。

公式シラバスは収録範囲の根拠にはなるが、出題回数・教科書登場回数の根拠にはならない。各数値を年度・科目・大問・小問または書籍章・問題番号へ対応させ、sourceとfrequencyとpriorityの整合をvalidatorで検査しない限り、頻度順・priority順を試験選択戦略へ使えない。

### RE-EX2-MAJ-03 集約先の分布定義と主要定理の正則条件が不完全

カード内に完全な分布定義を要求する旧指摘は撤回する。しかし新基準は `notation.md` を台・母数・PMF/PDFの正本とするため、集約先自体は完全でなければならない。現行ではStudentの $t$ 分布と $F$ 分布は構成表示だけでPDFがなく、logistic分布はCDFだけでPDFがない。したがって `math-t-chi-f: reference` を完全定義済みとは判定できない。

また、これは分布定義の配置基準とは別に、AGENTS.mdが要求する正則性条件の問題である。`est-cramer-rao-bernoulli` は正本上 $0\le p\le1$ のBernoulli分布を参照しながら、Cramér--Rao適用に必要な内部母数 $0<p<1$ をカードに示さない。Fisher情報量・Cramér--Rao・尤度比検定も「正則条件の下で」に留まり、各結果に必要な台の母数非依存性、微分と総和/積分の交換、有限正情報量、真値の内部性・識別可能性等を正本にも列挙していない。

### RE-EX2-MAJ-04 追加レポートが仕様所定の情報を欠く

`coverage.md` はカテゴリーごとの総数とtype名の存在、coverage項目のstatusを出すだけである。仕様第70節がシラバス各項目ごとに求める各typeの**枚数**、過去問由来数、S/A priority数がない。`frequent_moves.md` もtagとカード枚数だけで、第71節が求める過去問登場回数、教科書登場回数、関連カテゴリーがない。

`duplicate_candidates.md` は生成されたが、判定は正規化した `title + topic` の完全一致だけである。第68節の問題・答え・数式・hashtags・意味類似の比較を行わず、canonical moveの重複検出として弱い。3ファイルの存在だけでは、頻度・重複・範囲対応を検証したことにならない。

### RE-EX2-MAJ-05 validatorが正本との対応・分類・Web完成条件を保証しない

`formulae.md` は大幅に拡充され、目視した共通項目の表記矛盾は解消した。一方、各正本項目に安定IDがなく、カードの「使用公式・定理」からの参照IDもないため、対応漏れを機械検出できない。実際、カードで使うPoisson分布の $M_X(t)=\exp\{\lambda(e^t-1)\}$、最尤推定のargmax定義、ロジットリンク式は正本に同じ形で収録されていない。

加えてvalidatorは、source schema、frequency/source/priority整合、canonical/未知tag、category-subcategory親子関係、coverageの実質対応、全named distributionの日本語名、正本とカードの式同期を検査しない。生成レポートの不足もerrorにならない。`build_site.mjs --check` は主ページ文字列にKaTeXがあることだけを確認し、補助ページ、生成済みdistとの同期、HTML validity、外部依存、検索・複合filter、タブレット幅を検査しない。両コマンドの成功は構文上の健全性を示すが、仕様全体の完成証明にはならない。

## Minor

なし。

## 50枚pilot・Web確認

- 公開カードは50枚で、仕様のpilot範囲50〜150枚を満たす。非公開ドラフト2枚は公開数に含めていない。
- 全公開カードに問題、答えまたは方針、使用公式・定理、計算例があり、概ね1カード1論点・小問相当の粒度である。
- 必須10 typeは全種が公開pilotに存在する。
- 前回のChromium実動確認（768×1024、50件表示、全文検索、category+difficulty+tagのAND filter、横あふれなし、ローカル資産のみ、答えのnative details）に関係する実装は維持されている。
- 現行生成物で不正な `<p><div` はなく、3ページすべてに埋め込みfaviconがある。HTML・CSS・JavaScript・KaTeX fontは `dist/` 内で完結する。

## 機械検証

### `npm run anki:validate`

- 実行結果: **成功**（exit code 0）
- `validated 50 cards (0 warnings)`
- `checked 50 cards`

### `npm run validate`

- 実行結果: **成功**（exit code 0）
- 構造検証: 成功
- KaTeX strict: Markdown 231ファイルを検証し成功
- テキスト検証: 生成対象237件を検証し成功

---

# Anki配信・継続アーキテクチャ最終再査読

- 担当ID: `/root/anki_exam_review`（初回と同一査読者）
- 実行日時: 2026-08-14T00:02:50+09:00
- 対象: Anki配信・生成物検証・進捗遷移・継続手順・選択コミット契約の変更一式
- 判定: **合格**
- 最終件数: **fatal: 0 / major: 0 / minor: 0**

## 残件の解消確認

### RE-ARCH-EX-MAJ-01 査読・修正の時系列を偽装できる

**解消**。

- `complete` は `revision` 状態からのみ受理される。
- 各段階への遷移時に `<status>_at` が記録され、`independent_review_at` と `revision_at` は有効な日時で、かつ前者が後者より前でなければならない。
- 数理査読・試験適合性査読の双方について、`independent_review_at <= initial_reviewed_at < revision_at < final_reviewed_at` が必須になった。
- 初回・最終の担当ID一致、最新判定の `fatal / major / minor` 全件ゼロ、初回指摘と修正確認の記録も必須である。
- これにより、修正前の初回査読、修正後の同一査読者による再査読という順序を省略・逆転して `reviewed` にできない。

## 変更単位の最終確認

- `index.html` は9カテゴリーの一覧であり、カードページは公式シラバスのカテゴリー単位で生成される。
- 1カテゴリーが200枚を超える場合は日本語の意味的subcategory境界を先に使い、単一subcategoryが200枚を超える場合だけ内部分割する。ページ上限は1〜200以外を拒否する。
- `--check` は期待HTML全件、余剰HTML、`style.css`、`app.js`、数式資産を検査し、生成物の未同期を成功扱いしない。
- 768×1024の実ブラウザ確認で、日本語カテゴリー・subcategory表示、検索・絞り込み・カード展開に問題はない。外部HTTP資産依存もなく、オフライン配信要件を満たす。
- `AGENTS.md`、`anki/README.md`、`anki/prompts/review-batch.md` は、50枚執筆、2独立査読、修正、同一査読者再査読、build、両validate、進捗更新、対象限定の選択コミットまでを一貫して要求する。
- 既査読済み50枚のカード内容に、今回の配信・継続アーキテクチャ変更による回帰は認めない。

## 最終機械検証

### `npm run anki:validate`

- 実行結果: **成功**（exit code 0）
- `validated 50 cards (0 warnings)`
- `checked 50 cards in 9 category page(s), max 200 per page`

### `npm run validate`

- 実行結果: **成功**（exit code 0）
- 構造検証: 成功
- KaTeX strict: Markdown 232ファイルを検証し成功
- テキスト検証: 生成対象237件を検証し成功

## 最終受入条件

1. coverageを独立論点単位へ分割し、実際に扱わない論点を `card` に含めない。
2. frequencyとpriorityを追跡可能な過去問・教科書sourceへ対応させる。
3. `notation.md` にStudentの $t$、$F$、logistic分布のPDFを補い、主要推測定理の正則条件を具体化する。
4. coverage/frequent/duplicateレポートを仕様所定の集計へ拡張する。
5. 正本項目とカードを安定IDで対応させ、分類・出典・正本同期・Web完成条件までvalidatorで検査する。

---

# 全追加修正後・最終再査読

- 担当ID: `/root/anki_exam_review`（全回同一担当）
- 実行日時: 2026-08-13T23:27:04+09:00
- 対象: 公開カード50枚、非公開ドラフト2枚、両正本、公式範囲coverage、3種レポート、validator、生成済みWeb
- pilot解釈: 本成果物は公式範囲の完成版ではなく、全域を横断する50枚でカード教材の粒度・分類・操作感を検証するpilotである。`planned` の未収録項目そのものは不具合に数えない。
- 判定: **条件付き合格（頻度根拠のみ要修正）**
- 最終件数: **fatal: 0 / major: 1 / minor: 0**

## 前回5 majorの解消確認

| 前回指摘 | 最終確認 | 判定 |
|---|---|---|
| RE-EX2-MAJ-01 coverageの過大判定 | MLE漸近正規性/Delta法、KL/AIC/交差検証、AR/MA/ARIMA、信頼性/保全性、固定効果/変量効果/ブロック/直交表/交絡が分離され、未収録は `planned` になった。coverageの `card` は「pilot内に計算を完遂する代表カードがある」と明記される。 | **解消**。50枚pilotの状態表として、収録済みと拡張予定を判別できる。 |
| RE-EX2-MAJ-02 frequency・priority根拠 | metadata値とpriorityは残るが、具体的な過去問・教科書sourceは追加されていない。 | **未解消**。下記1 majorへ集約。 |
| RE-EX2-MAJ-03 分布正本・正則条件 | `notation.md` にStudentの $t$、$F$、logistic分布の密度が追加された。`formulae.md` にFisher情報量、Cramér--Rao、尤度比検定、Pearson適合度の具体条件が追加された。日本語分布名の不足も修正済み。 | **解消**。変更後の分布記載基準と整合する。 |
| RE-EX2-MAJ-04 レポート | 原子coverageの状態が `coverage.md` に反映され、frequent moveとduplicate候補も再生成された。50枚pilotの収録状況・タグ反復・重複有無は確認できる。 | **pilot範囲では解消**。ただし頻度列の根拠不足は下記majorに含める。 |
| RE-EX2-MAJ-05 正本・分類・validator | Poisson分布MGF、最尤推定量argmax、正規平均の信頼区間、AR(1)条件、乱塊法の制約が正本へ追加され、カードとの表記一致を目視確認した。category-subcategory親子検査も追加された。 | **解消**。出典schema・頻度整合検査だけは下記majorに残す。 |

## Fatal

なし。

## Major

### FINAL-EX-MAJ-01 frequency・priorityを具体的sourceへ追跡できない

公開50枚の `sources` はすべて `official_syllabus` のみだが、全カードの `past_exam`、`textbook`、`independent_problems`、`source_confirmations` は正数である。公式シラバスは範囲の根拠であって、過去問登場回数や教科書登場回数の根拠ではない。また `prob-inclusion-exclusion` は `past_exam: 1` かつpriority Sで、仕様の「S = 過去問で複数回登場」と一致しない。

この同一原因により、`frequent_moves.md` はカード枚数だけで過去問登場回数・教科書登場回数を裏付けられず、`coverage.md` も「過去問由来」「S/A priority数」を信頼できる形で出せない。validatorもsource schema、frequency/source/priority整合を検査しない。各正数を年度・科目・大問・小問または書籍章・問題番号へ対応させ、集計とvalidatorを同じ根拠データから生成する必要がある。

## Minor

なし。

## 50枚pilot・カード/Web最終確認

- 公開50枚はpilot仕様の50〜150枚を満たす。非公開2枚は公開数に含めない。
- 全公開カードに問題、答えまたは方針、使用公式・定理、計算例があり、概ね1カード1論点・小問相当である。
- formula / theorem / condition / proof_step / calc_step / expansion / recognition / strategy / reverse / pitfall の全10 typeが公開pilotに存在する。
- `planned` にしたMLE漸近正規性、KL情報量、交差検証、Wald/Score、MCMC、ARIMA、保全性、変量効果、直交表、交絡等を、50枚pilotの未達とは数えない。
- 前回実動確認済みの全文検索、category+difficulty+tag複合filter、priority/頻度sort、768px幅、native details、オフライン資産構成に回帰はない。
- 現行生成物に `<p><div` はなく、3ページすべてにdata URL faviconがある。外部HTTP依存はない。

## 最終機械検証

### `npm run anki:validate`

- 実行結果: **成功**（exit code 0）
- `validated 50 cards (0 warnings)`
- `checked 50 cards`

### `npm run validate`

- 実行結果: **成功**（exit code 0）
- 構造検証: 成功
- KaTeX strict: Markdown 231ファイルを検証し成功
- テキスト検証: 生成対象237件を検証し成功

## 最終受入条件

残る受入条件は1件だけである。frequency各値とpriorityを具体的sourceへ対応させ、frequent/coverage集計とvalidatorのsource整合検査を同じ正本データから生成する。

---

# frequency・priority修正後の最終確認

- 担当ID: `/root/anki_exam_review`（全回同一担当）
- 実行日時: 2026-08-13T23:30:06+09:00
- 対象: 公開カード50枚、frequency・priority・sources、source整合validator、再生成レポート、生成済みWeb
- 判定: **合格**
- 最終件数: **fatal: 0 / major: 0 / minor: 0**

## 最後のmajorの解消確認

### FINAL-EX-MAJ-01 frequency・priorityの具体的source不足

**解消**。

- 公開50枚すべての `past_exam`、`textbook`、`independent_problems`、`source_confirmations` は、未検証値として正直に0へ戻された。
- 公開50枚すべてのpriorityは、具体的な出題頻度根拠を要求しないBへ戻された。
- `sources` は公式範囲対応を示す `official_syllabus` のみであり、0件の頻度値と矛盾しない。
- validatorは、`past_exam` / `textbook` / `independent_problem` の具体的sourceがないカードについて、いずれかのfrequencyが正ならerrorにする。
- validatorは、同じ具体的sourceがないカードのpriority S/Aもerrorにする。
- したがって、将来具体的sourceを追加するまでは未確認頻度を0・priority Bとして扱い、裏付けのない頻度順・優先度表示を試験戦略へ流用しない状態になった。

## 全体最終判定

- 50枚pilotの範囲、カード粒度、具体例、全10 type、公式範囲の `card / reference / planned`、両正本との表記、名前付き分布の日本語名、静的検索・複合filter・sort・タブレット幅・オフライン性について、未解消指摘はない。
- HTML block構造、favicon、分布正本、正則条件、公式正本、coverage/frequent/duplicateレポートの前回指摘は解消済みで、今回の変更による回帰はない。
- 今後、実在する過去問・教科書・独自問題sourceを追加したカードだけが正のfrequencyまたはS/Aを持てる。

## 最終機械検証

### `npm run anki:validate`

- 実行結果: **成功**（exit code 0）
- `validated 50 cards (0 warnings)`
- `checked 50 cards`

### `npm run validate`

- 実行結果: **成功**（exit code 0）
- 構造検証: 成功
- KaTeX strict: Markdown 231ファイルを検証し成功
- テキスト検証: 生成対象237件を検証し成功

---

# Anki配信・継続アーキテクチャ最終回帰確認（数理査読対応後）

- 担当ID: `/root/anki_exam_review`（初回と同一査読者）
- 実行日時: 2026-08-14T00:08:00+09:00
- 対象: `build_site.mjs --check` のKaTeX資産同期・外部resource参照禁止の追加変更
- 判定: **合格**
- 最終件数: **fatal: 0 / major: 0 / minor: 0**

## 回帰確認

- `katex.min.css` はインストール済みKaTeX原本とのバイト一致を検査する。
- 配信先の `.woff2` 集合はKaTeX原本の集合と一致しなければならず、全20ファイルを個別にバイト一致検査する。欠落・余剰・stale fontはいずれも成功扱いしない。
- 生成予定HTML、`style.css`、`app.js`、`katex.min.css` の全文を対象に、KaTeXが生成するSVG名前空間宣言だけを除外したうえで、HTTP(S)絶対URLとprotocol-relative URLを構文位置にかかわらず一律拒否する。`srcset`、CSS、静的importなど個別構文による取りこぼしはない。
- 現行生成物は上記検査に成功し、KaTeX資産の同期およびオフライン配信要件に回帰はない。
- 直前のアーキテクチャ最終判定 `fatal: 0 / major: 0 / minor: 0` を維持する。

## 最終機械検証

### `npm run anki:validate`

- 実行結果: **成功**（exit code 0）
- `validated 50 cards (0 warnings)`
- `checked 50 cards in 9 category page(s), max 200 per page`

### `npm run validate`

- 実行結果: **成功**（exit code 0）
- 構造検証: 成功
- KaTeX strict: Markdown 232ファイルを検証し成功
- テキスト検証: 生成対象237件を検証し成功
