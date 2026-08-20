# C15 独立数理査読

- work_id: `C15-contingency-nonparametric`
- initial_reviewer_id: c15_math_review
- initial_reviewed_at: 2026-08-21T01:37:31+09:00
- 対象: `anki/cards/37_contingency_nonparametric.md` の新規51枚、`math-contingency-tables` / `math-nonparametric` の coverage 内関連既存カード、`anki/notation.md`、`anki/formulae.md`、`anki/syllabus/coverage.yaml`
- 査読方法: 定義、帰無分布、自由度、漸近条件、全数値例をカード本文から独立に再計算した。

## 初回指摘と結果

fatal: 0 / major: 4 / minor: 5

### major

1. `cat-multinomial-model` — 多項分布の定義条件がカード内で不足している。
   - 問題点: 確率質量関数に対し、観測度数の台 `n_k\in\mathbb N_0, \sum_k n_k=n` と母数条件 `p_k\ge0` が明示されていない。`\sum_kp_k=1` だけでは定義として不十分である。
   - 根拠: `anki/notation.md` の多項分布の正本には双方が明記されている。分布を直接問うカードなので、少なくとも使用公式・定理欄へ再掲する必要がある。
   - 修正案: PMFの直前または使用公式・定理欄に台と母数条件を追記する。

2. `np-wilcoxon-null-moments`, `np-wilcoxon-normal-approx` および `anki/formulae.md` 冒頭のWilcoxon項 — 符号付順位和の帰無モーメントが成立する仮定が明示されていない。
   - 問題点: `E[W_+]=n(n+1)/4`、`Var(W_+)=n(n+1)(2n+1)/24` の導出で「各順位が独立に確率1/2で正側へ入る」としているが、これは独立な対応差が連続で、帰無仮説下の差の分布が0について対称であることを要する。中央値0だけでは、符号と絶対値順位が独立にならず一般に成立しない。
   - 独立再計算: 対称連続分布なら、条件付きで各符号が独立Bernoulli(1/2)となり、`Var(W_+)=\sum r^2/4=n(n+1)(2n+1)/24` が得られる。`n=20` では `717.5`、`Z=45/\sqrt{717.5}=1.680` で数値自体は正しい。
   - 修正案: 両カードの問題・使用公式欄と公式集に「独立な差、連続、0対称、0差・同順位なし」を明記する。同順位がある場合の補正との境界も維持する。

3. `np-ks-two-sample` — 帰無分布が分布によらないための標本条件が不足している。
   - 問題点: 「連続な同一分布」だけでなく、各標本内が独立同分布で、2標本間も独立であることが必要である。対応データに同じ2標本KS検定を適用することはできない。
   - 修正案: 問題または答えに「互いに独立な2つの独立同分布標本」を明記する。

4. `C15-contingency-nonparametric` 作業メタデータ — `npm run anki:validate` がpriority一律のため失敗している。
   - 検証メッセージ: 「10枚以上の新規カードでpriorityが全件同一です。過去問根拠と依存度を比較して優先度を査定します」。
   - 修正案: `title_ids` の優先度、過去問頻度、前提性を根拠に51枚のpriorityを再査定し、一律Aを解消する。

### minor

1. `cat-log-odds-ratio-ci` — `\widehat{OR}=6,qquad` は `\qquad` のバックスラッシュ欠落。数値再計算は `SE=\sqrt{5/24}=0.4564`、95%区間 `[2.45,14.67]` で正しい。

2. `cat-logistic-2x2-equivalence` — 結論式末尾の `=log\widehat{OR}` は `=\log\widehat{OR}` が正しい。直前の対数差からの導出と `\log4=1.386` は正しい。

3. `np-mann-whitney-normal-numeric` — `E[U]=50,qquad` は `\qquad` のバックスラッシュ欠落。独立再計算では `Var(U)=175`、`Z=-30/\sqrt{175}=-2.268` で判定は正しい。

4. `np-hodges-lehmann-paired` — Walsh平均の列挙3か所の区切り `qquad` は `\qquad` が正しい。Walsh平均 `(1,2,3)` の中央値2という計算は正しい。

5. `np-asymptotic-relative-efficiency` — `3/\pi=0.95493` から必要標本数倍率 `\pi/3=1.04720` は正しいが、「効率損失は約4.7%」は効率そのものの低下 `1-3/\pi=4.51%` と必要標本数の増加 `4.72%` を混同する表現である。
   - 修正案: 「必要標本数は約4.7%増える」または「効率は約4.5%低い」と区別して書く。

## 独立再計算で一致を確認した主な項目

- 2×2 Pearson短縮式: 例は `100(1000)^2/(50\cdot50\cdot40\cdot60)=16.6667`。
- G二乗のセル寄与: `24\log(1.2)=4.3757`。
- オッズ比区間、Fisher超幾何確率 `50/210=0.238095`、Mantel–Haenszel推定量 `3.6/1.1=3.2727`。
- Simpson例の層別率と周辺率、独立モデル・逸脱度自由度 `(3-1)(4-1)=6`。
- 符号検定の反転区間、Mann–Whitneyの平均・分散、Kruskal–Wallis例 `H=32/7=4.5714`。
- Friedman例 `Q=8`、Spearman例 `0.8`、Kendall例 `0.6`。
- 連検定例 `E[R]=11`, `Var(R)=90/19`, `Z=-2.7568`。
- 置換検定例 `p=2/6=1/3`、Kruskal–Wallis同順位補正、Hodges–Lehmann推定量、確率的優越度 `15/20=0.75`。
- coverage掲載の既存 `data-odds-ratio` と `test-sign-test` は、対象論点に関する式・数値・条件に数理上の誤りなし。

## 機械検証

- `npm run anki:validate`: **失敗**。カード数789、errors 1、warnings 0。原因はC15新規カード51枚のpriority一律。
- `npm run validate`: **成功**。教材構造・依存関係・進捗メタデータ、324 MarkdownのKaTeX strict、237生成対象テキストの検証を通過。

## 修正後再査読

- final_reviewer_id: c15_math_review
- final_reviewed_at: 2026-08-21T01:41:15+09:00

初回と同じ担当が新規51枚、関連既存カード、記法・公式・coverageを再査読した。

### 修正確認

1. `cat-multinomial-model`: `n_k\in\mathbb N_0`、`\sum_kn_k=n`、`p_k\ge0`、`\sum_kp_k=1` がPMFの直前に追加され、多項分布の台と母数条件が揃った。
2. `np-wilcoxon-null-moments`, `np-wilcoxon-normal-approx`, `anki/formulae.md`: 独立同分布な対応差、連続性、0対称、0差・同順位なしという条件が明示された。条件の下で符号を独立Bernoulli(1/2)として行った初回の再計算と一致する。
3. `np-ks-two-sample`: 標本内が独立同分布で、2標本間も独立であることが明示された。
4. priority: 新規51枚がA 10枚・B 41枚へ再査定され、一律priorityが解消された。
5. `cat-log-odds-ratio-ci`, `cat-logistic-2x2-equivalence`, `np-mann-whitney-normal-numeric`, `np-hodges-lehmann-paired`: 欠落していた `\qquad` / `\log` がすべて修正され、数式表示と数理的意味が一致した。
6. `np-asymptotic-relative-efficiency`: 必要標本数の増加約4.7%と、効率低下約4.5%が区別された。

修正による新たな数理的不整合は認めない。初回に一致を確認した数値例・自由度・帰無分布も変更されておらず、全件解消を確認した。

### 再査読時の機械検証

- `npm run anki:validate`: **成功**。789枚、warnings 0、13カテゴリページ、各ページ最大200枚。
- `npm run validate`: **成功**。構造検証、326 MarkdownのKaTeX strict、237生成対象テキストの検証を通過。

fatal: 0 / major: 0 / minor: 0

- initial_reviewer_id: c15_math_review
- initial_reviewed_at: 2026-08-21T01:37:31+09:00
- final_reviewer_id: c15_math_review
- final_reviewed_at: 2026-08-21T01:41:15+09:00
fatal: 0 / major: 0 / minor: 0
