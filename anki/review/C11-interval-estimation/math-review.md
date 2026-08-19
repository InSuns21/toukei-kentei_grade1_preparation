# C11-interval-estimation 独立数理査読（math-review）

- 作業単位: C11-interval-estimation（区間推定）
- 査読種別: 独立数理査読サブエージェント
- 担当ID: MATH-REV-C11-20260819
- 実行日時: 2026-08-19 Asia/Tokyo
- 対象ファイル: `anki/cards/32_interval_estimation.md`
- 正本: `anki/notation.md`, `anki/formulae.md`, `anki/syllabus/coverage.yaml`
- source: `pdfs/statistics_grade1_card_titles_by_parent_priority.md`（親「区間推定」、title_ids 181–194）

## 1. 査読方針と再計算経路

各カードの定義・定理・数値計算例を、提示された式とは独立の別経路（手動・Python による分位点・半幅・区間端の直接計算）で再計算した。本作業は Anki カード教材であるため、連結演習・答案圧縮・部分点構造は要求しない（project-doc の「Anki作業と通常章・模試の範囲境界」に従う）。

判定基準:
- fatal: 数学的誤り、カード破損、致命的な論点欠落。
- major: 重要な論点の欠落・誤った定理・誤った向き・不整合。
- minor: 表記揺れ、正本/メタデータの不整合、自己査読の誤記。

## 2. 全カードの再計算・検証結果（31 枚）

id は 31 件（下記）を確認。`<!-- CARD -->` マーカーも 31 件。

### 定義系（正しい）
- ci-coverage-probability: 被覆確率の定義 $P_\theta(L\le\theta\le U)=1-\alpha$ 正しい。
- ci-coverage-frequentist: 頻度主義的解釈正しい。ベイズ信用区間との違いに言及。
- ci-pivot-definition: ピボット量の定義（分布が $\theta$ に依存しない）正しい。
- ci-pivot-construction: $a\le Q\le b$ を $\theta$ について解く手順、正規平均例の向き正しい。
- ci-one-sided: 下側 $[L,\infty)$・上側 $(-\infty,U]$、上側 $\alpha$ 点 $z_\alpha$ の使い分け正しい。
- ci-test-duality: $CI_{1-\alpha}(x)=\{\theta:\text{棄却しない}\}$ 正しい。
- ci-duality-acceptance: 受容域 $\{|\bar x-\mu|\le z_{\alpha/2}\sigma/\sqrt n\}$ を $\mu$ で解いて両側区間と一致。正しい。
- ci-asymptotic-def: 漸近被覆確率の定義正しい。
- ci-length-confidence-tradeoff: 半幅 $\propto z_{\alpha/2}$、$z_{0.05}=1.645<z_{0.025}=1.96$ で $\alpha$ 減少で増大。正しい。

### 公式系（正しい）
- ci-normal-mean-known: $z$ 区間、上側 $\alpha/2$ 点の定義正しい。
- ci-t-interval-pivot: $T=(\bar X-\mu)/(S/\sqrt n)\sim t_{n-1}$ は正規性から導かれる。正しい。
- ci-t-vs-z: 既知 $z_{\alpha/2}$／未知 $t_{n-1,\alpha/2}$、$n$ 大で近似。正しい。
- ci-variance-chi-derivation: $P(\chi^2_{n-1,1-\alpha/2}\le (n-1)S^2/\sigma^2\le \chi^2_{n-1,\alpha/2})=1-\alpha$、区間 $[(n-1)S^2/\chi^2_{n-1,\alpha/2},\ (n-1)S^2/\chi^2_{n-1,1-\alpha/2}]$。上側点記法（$\chi^2_{\nu,\alpha/2}$ = 上側 $\alpha/2$ 点）で内部整合。非対称性の理由（右裾が長い）正しい。
- ci-f-variance-ratio: 分散比ピボット $(S_1^2/\sigma_1^2)/(S_2^2/\sigma_2^2)\sim F$。両側でも分位点の向きが逆になる点に言及。正しい。
- ci-two-sample-mean-diff: プール分散 $S_p^2$、自由度 $n_1+n_2-2$ の $t$ 区間。正しい。
- ci-welch-interval: Satterthwaite 近似自由度 $\nu$ の式正しい。$\nu\le n_1+n_2-2$ に言及。
- ci-proportion: Wald 型 $\hat p\pm z_{\alpha/2}\sqrt{\hat p(1-\hat p)/n}$。漸近正規性から導出。正しい（Wilson は範囲外の設計選択）。
- ci-proportion-diff: 非プール標準誤差の差の区間。正しい。
- ci-asymptotic-mle: $\sqrt n(\hat\theta-\theta)\to_d N(0,I_1(\theta)^{-1})$、区間 $\hat\theta\pm z_{\alpha/2}/\sqrt{n\,I_1(\hat\theta)}$。正しい。
- ci-delta-method: $\sqrt n(g(T_n)-g(\theta))\to_d N(0,g'(\theta)^2\sigma^2)$、区間 $g(T_n)\pm z_{\alpha/2}|g'(T_n)|\hat\sigma/\sqrt n$。分散伝播正しい。

### 計算系（全数値を別経路で再計算し一致）
| カード | 検証項目 | 別経路計算 | 結果 |
|---|---|---|---|
| ci-normal-mean-known-calc | 既知分散半幅 | $1.96\times 2/5=0.784$ | 一致 $[99.216,100.784]$ |
| ci-variance-chi-calc | カイ二乗区間 | $(15\cdot9)/27.488=4.91,\ (15\cdot9)/6.262=21.56$ | 一致 $[4.91,21.56]$ |
| ci-f-variance-ratio-calc | F 区間 | $1.5/4.026=0.373,\ 1.5/0.2484=6.04$ | 一致 $[0.373,6.04]$ |
| ci-two-sample-mean-diff-calc | 2標本等分散 | $2.101\times\sqrt{4/10+4/10}=1.879$ | 一致 $[0.121,3.879]$ |
| ci-welch-calc | Welch | $SE=\sqrt{9/12+4/15}=\sqrt{1.0167}=1.008,\ \nu=(1.0167)^2/(0.0511+0.00508)=18.38,\ 2.101\times1.008=2.118$ | 一致 $[-0.118,4.118]$ |
| ci-proportion-calc | 比率 | $\sqrt{0.21/400}=0.02291,\ 1.96\times0.02291=0.0449$ | 一致 $[0.255,0.345]$ |
| ci-proportion-diff-calc | 比率差 | $\sqrt{0.25/200+0.24/200}=0.0495,\ 1.96\times0.0495=0.0970$ | 一致 $[0.003,0.197]$ |
| ci-one-sided-calc | 片側 | $1.645\times0.4=0.658$ | 一致 $(-\infty,99.342]$ |
| ci-asymptotic-mle-calc | MLE 漸近 | $SE=\sqrt{0.4\cdot0.6/100}=0.0490,\ 1.96\times0.0490=0.0960$ | 一致 $[0.304,0.496]$ |
| ci-delta-method-calc | デルタ法 | $g'=e^2=7.389,\ SE=7.389\times0.2=1.478,\ 1.96\times1.478=2.896;\ 7.389\pm2.896$ | 一致 $[4.49,10.29]$ |
| ci-sample-size-for-width | 必要標本サイズ | $(1.96\cdot2/0.5)^2=(7.84)^2=61.47\to\lceil\cdot\rceil=62$ | 一致 $n=62$ |

注: Welch の $\nu=18.38$ に対し $t_{18,0.025}=2.101$ を用いる床（floor）近似は標準的であり許容。

### 非自明な変形の「変形前・操作/根拠・変形後」確認
- ピボット構成（正規平均）: 不等式反転の向き正しい。
- カイ二乗・F の両側区間: 上下端で分位点の向きが逆になる理由を「右裾が長い／非対称」として明示。正しい。
- Welch 自由度: 分子・分母の成分 $(S_i^2/n_i)^2/(n_i-1)$ を明示し、計算例で $(1.0167)^2/(0.0511+0.00508)$ と操作を追える形にしている。
- デルタ法: 分散伝播 $g'(\theta)^2\sigma^2$ を標準誤差 $|g'|\hat\sigma/\sqrt n$ として展開。正しい。
- 双対性: 受容域⇔区間の変形を「$\mu$ について解く」として示している。正しい。

分布名・母数・台が必要な例（正規・カイ二乗・F・t）は問題文または定理欄でその場明示されており、別ファイル探索を強いていない。

## 3. 指摘

### minor-1: カード枚数のメタデータ不整合（カード本文の欠陥ではない）
- 根拠: 対象ファイル名 `32_interval_estimation.md`、および自己査読記録 `self-review.md`（冒頭「新規32枚」、§4、§6、結論）は「32 枚」と記載。しかし実際のカードは **31 枚**（id 31 件、`<!-- CARD -->` 31 件）である。一方、source title_ids 181–194（14 件）はすべて主対応カードを持ち（self-review §5 の対応表どおり）、いずれかの source タイトルに対応するカードが欠落している事実はない。
- 判定: 真の「32 枚目のカード」が存在すべき論点が source 上見当たらず、現状は単なる枚数の過大計上と判断。したがって major（論点欠落）ではなく minor（メタデータ/数え間違い）とする。
- 修正案: メイン担当が (a) 不足していると考える論点があれば 32 枚目を追加、または (b) 枚数表記を 31 に統一（ファイル名は慣例で維持可だが、`self-review.md` の「32枚」記載と coverage の枚数記録を 31 に修正）すること。

### minor-2: 自己査読 §4 のカイ二乗区間の誤記（カード本文は正しい）
- 根拠: 本査読のタスク提示と `self-review.md` §4 に「カイ二乗区間[1.89,13.33]」とあるが、この値はいずれのカードにも存在せず、かつ $n=16,\ S^2=9$ では正しくない。正しい値はカード `ci-variance-chi-calc` の通り $[4.91,21.56]$（別経路再計算で確認）。タスク提示の「[1.89,13.33]」も誤った転記。
- 判定: カード本文 `ci-variance-chi-calc` は正しく、誤りは自己査読・タスク提示の転記ミス。カード側の defect ではないので minor。
- 修正案: `self-review.md` §4 の「カイ二乗区間[1.89,13.33]」を正しい「[4.91,21.56]」に修正。タスク提示側の誤記は本査読で補正済み（カードは正）。

## 4. 機械検証（validate）
- コマンド: `npm run validate`（C:\srcjs\toukei-kentei_grade1_preparation）
- 結果: 成功（exit code 0）
  - validate:structure: OK
  - validate:math: 308 個の Markdown を KaTeX strict で検証 OK
  - validate:text: 237 個の生成対象テキストを検証 OK

## 5. 結論
数学的内容（定義・定理・全数値計算例・分布の非対称性に対する分位点の向き・Welch 自由度・デルタ法の分散伝播・双対性）はすべて独立再計算で一致し、致命的・重要な誤りはない。指摘は minor 2 件（いずれもカード本文の欠陥ではなく、メタデータ／自己査読の転記不整合）。修正後、再査読は minor を解消する程度で十分。

fatal: 0 / major: 0 / minor: 2

---

## 6. 修正後再査読（re-review）

- 担当ID: MATH-REV-C11-20260819（初回と同一の独立数理査読サブエージェント）
- 実行日時: 2026-08-19 Asia/Tokyo
- 目的: 初回指摘 minor-1・minor-2 の解消確認と、修正による他カードへの悪影響・新たな fatal/major/minor の有無確認。

### 6.1 minor-1（枚数メタデータ）の解消確認
- 自己査読記録 `self-review.md` の §7「実カード枚数と優先度配分（査読指摘への事前訂正）」で、実際の新規カードを **31枚**（ファイル名は `32_` だが中身31枚）と明示し、source 181–194 の14タイトル対応はすべて揃っていると記録済み。
- 独立確認: 対象ファイルの `<-- CARD -->` マーカー数 = 31、`id:` 行数 = 31 を機械的に計数。いずれも 31 で一致。ファイル名 `32_` は慣例維持のため残し、実カード枚数の表記は 31 に統一されている。
- 判定: minor-1 は **解消** と確認。カード本文の欠陥ではなく、メタデータ/自己査読の枚数過大計上であった点は不変。

### 6.2 minor-2（カイ二乗区間の転記誤記）の解消確認
- 自己査読記録 `self-review.md` §4「具体例完遂」は正しい値 `[4.91,21.56]` を記載。旧誤記 `[1.89,13.33]` はいずれの記録にも残っていない。
- 独立確認: 対象ファイルで正規表現検索。`[4.91,21.56]` は `ci-variance-chi-calc` を含め 2 件出現。`[1.89,13.33]` は 0 件（存在せず）。カード本文 `ci-variance-chi-calc` の区間は初回別経路再計算通り `[4.91,21.56]` で正しい。
- 判定: minor-2 は **解消** と確認。誤記は自己査読・タスク提示の転記ミスであり、カード側の defect ではない点は不変。

### 6.3 修正による波及確認
- 上記2件はメタデータ/転記の不整合であり、カード本文（`32_interval_estimation.md` の31枚）の数式・定理・数値には一切手が入っていない。
- 新規31枚すべての定義・公式・計算系は初回で独立再計算済みで一致しており、今回の自己査読表記訂正によって再計算結果や他カードとの整合に変化はない。
- 新たな fatal / major / minor は検出せず。

### 6.4 機械検証（validate）
- コマンド: `npm run validate`（C:\srcjs\toukei-kentei_grade1_preparation）
- 結果: 成功（exit code 0）
  - validate:structure: OK
  - validate:math: 309 個の Markdown を KaTeX strict で検証 OK
  - validate:text: 237 個の生成対象テキストを検証 OK

### 6.5 結論（再査読）
初回指摘 minor-1・minor-2 の両件は、自己査読記録への表記訂正として確実に反映されており、カード本文の数学的正しさは維持されている。修正による他カードへの悪影響・新たな指摘はなし。

fatal: 0 / major: 0 / minor: 0

## 初回指摘
- minor-1: ファイル名・自己査読が「32枚」と記載していたが実際は31枚。カード本文の欠陥ではない（メタデータ/転記の不整合）。
- minor-2: 自己査読とタスク提示のカイ二乗区間「[1.89,13.33]」が誤記。正しい値はカード ci-variance-chi-calc の [4.91,21.56]。

## 修正確認
- minor-1: 自己査読記録（self-review.md §7）で実カード31枚と明示。対象ファイル本文は変更なし。
- minor-2: 自己査読記録 §4 は正しい [4.91,21.56] に訂正。対象ファイル本文は変更なし（元から正）。
- 両件ともカード本文の数学的正しさは維持され、他カードへの悪影響・新たな指摘はなし。

<!-- initial_reviewer_id: MATH-REV-C11-20260819 final_reviewer_id: MATH-REV-C11-20260819 initial_reviewed_at: 2026-08-19T14:45:00Z final_reviewed_at: 2026-08-19T14:53:00Z -->

## 再査読担当の同一性について（メモ）
初回数理査読（MATH-REV-C11-20260819、2026-08-19）と修正後再査読（Cicero 起動、担当ID は初回と同一の MATH-REV-C11-20260819 で全文再査読）は同一IDである。セッション越えのため新規スレッドで起動したが、初回指摘だけでなく31枚全文を独立再計算・再査読し、その事情を本ファイルに記録する（AGENTS.md の「セッションをまたいで同じ担当を再開できない場合」の規定に準拠）。