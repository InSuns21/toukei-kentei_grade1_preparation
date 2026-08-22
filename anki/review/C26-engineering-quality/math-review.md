# C26-engineering-quality 独立数理査読

- 担当ID: `/root/c26_math_review`
- 実行日時: 2026-08-22 (Asia/Tokyo)
- initial_reviewer_id: c26_math_review
- initial_reviewed_at: 2026-08-22T21:37:17+09:00
- 対象: `anki/cards/48_engineering_quality.md` の新規47枚、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/coverage.yaml`
- 査読方法: 全47枚について、管理限界、工程能力指数、裾確率、平均ラン長、EWMA・CUSUM、信頼度、故障率、可用度、保全度、長期費用率を問題設定から独立再計算した。併せて、成立条件、未定義記号、7節テンプレート、公式正本・記法正本・coverageとの同期を確認した。

## 初回結果

- fatal: 0
- major: 2
- minor: 5

## 初回指摘

### major

1. `engqc-p-chart-varying-n`: 「使用公式・定理」は $\overline p\pm3\sqrt{\overline p(1-\overline p)/n_i}$ だけを掲げるため、与えられた値では下側限界が $0.05-3\sqrt{0.05(0.95)/100}\approx-0.0154$ となる。一方、答えは根拠を示さず $LCL=0$ としており、公式から答えを追えない。$LCL_i=\max\{0,\overline p-3\sqrt{\overline p(1-\overline p)/n_i}\}$ を公式欄に明示すること。
2. `anki/formulae.md` と `anki/notation.md`: 追加された $\overline X$--$R$ 管理図の公式が $\overline{\overline X},\overline R,A_2,D_3,D_4$ を使うが、当該節の記号説明にも `notation.md` にも定義がない。特に $A_2,D_3,D_4$ が群サイズごとの管理図定数であること、$\overline R$ が群範囲の平均であることが分からず、公式集単独では利用できない。$S$ 管理図カードで使う $\overline S,B_3,B_4$ も含め、正本へ意味と依存する群サイズを明記し、公式集にも $S$ 管理図の式を同期すること。

### minor

1. `engqc-capability-defect-rate`、`engqc-three-sigma-false-alarm`、`engqc-arl1-mean-shift`: $\Phi$ を標準正規分布の累積分布関数としてカード内で定義していない。単独提示されるカードとして「記号・用語」に $\Phi(z)=P(Z\le z)$、$Z$ は標準正規分布、と再掲すること。
2. `engmaint-two-state-availability`: 使用公式の $\pi_D$ が未定義である。$\pi_U$ と対になる故障状態の定常確率であることを「記号・用語」に明示すること。
3. `engqc-cusum-one-step`、`anki/formulae.md`、`anki/notation.md`: カードは標準化CUSUMの小文字 $k,h$、正本は非標準化CUSUMの大文字 $K,H$ を使う。さらにカードの $h$ は計算例で初出し、定義がない。標準化版と原尺度版の対応を示すか、一方へ統一し、判定値の意味とシグナル条件も公式欄へ置くこと。
4. `engqc-p-chart-constant-n`、`engqc-p-chart-varying-n`、`engqc-np-chart`、`engqc-c-chart`、`engqc-u-chart`: 掲載した対称3シグマ限界は二項・ポアソン計数に対する平均±3標準偏差の近似的限界であり、正規近似が悪い小期待度数では非対称な正確限界等を検討する条件が書かれていない。少なくとも近似式であることと、小標本・低率での注意を明記すること。特に `engqc-c-chart` の「ポアソン分布近似」は、ポアソンモデル自体と3シグマ近似を区別する表現へ直すこと。
5. `engqc-control-chart-sample-size`: 計算は $1.5\sqrt n\ge3$ から $n=4$ で正しいが、これはシフト後平均が上側限界位置に来て1点上方検出確率がおよそ50%になる条件にすぎない。タイトルの「シフト検出標本数」は所望検出力を満たす標本数と誤読しやすい。タイトル・答えを「平均位置を上側3シグマ限界以上にする最小群サイズ」へ合わせるか、検出確率約50%を明記すること。

## 再計算で確認した事項

- 全47枚に「問題 → 記号・用語 → 使用公式・定理 → 一手／方針 → 答え → 計算例 → 注意」の7節が各1件存在する。
- $\overline X$、$R$、$S$、$p$、$np$、$c$、$u$、個別値--MR管理図の全数値を再計算した。上記の可変標本数$p$管理図の下限根拠欠落を除き、掲載値は一致した。
- 3シグマ誤警報確率 $0.00270$、$ARL_0\approx370.4$、2標準誤差シフト後の $ARL_1\approx6.30$、EWMA更新値11・11.75と定常分散1、CUSUM更新値1.4を再計算し一致した。
- $C_p=1.667$、$C_{pk}=0.667$、$C_{pm}=1.179$、両側規格外率0.27%、$C_{pu}=1.111$ を再計算し一致した。
- 直列・並列・2-out-of-3信頼度、指数・Weibull信頼度、MTBF、競合リスク、定常可用度、保全度、故障率最尤推定量、直列可用度を再計算し一致した。年齢取替え費用率は、非負寿命・即時取替えの更新報酬モデルとして式が成立する。
- `coverage.yaml` では新規47カードが `engineering-quality` に収録され、公式5用語「管理図」「信頼性」「保全性」「プロセス管理」「工程能力指数」へ該当カードIDが対応している。

## 機械検証

- `npm run anki:validate`: 成功。1325 cards、0 warnings。配信HTMLのbuild/checkも成功。
- `npm run validate`: 成功。構造検証、KaTeX strict（370 Markdown files）、本文検証（237 files）がすべて成功。
- 注記: 上記は意味上の記号未定義、近似条件、公式から答えへの根拠欠落を検出しないため、機械検証成功だけでは指摘を解消扱いにできない。

## 修正後再査読

- 未実施。

## 初回集計

fatal: 0 / major: 2 / minor: 5

## 第1回修正確認

- reviewed_at: 2026-08-22T21:49:56+09:00
- 初回major 1: `engqc-p-chart-varying-n` の公式欄へ $\max\{0,\cdot\}$ が追加され、$LCL=0$ まで追えることを確認した。
- 初回major 2: `formulae.md` と `notation.md` に $\overline{\overline X},\overline R,\overline S,A_2,D_3,D_4,B_3,B_4$ の意味と群サイズ依存性が明記され、$S$ 管理図の公式も同期されたことを確認した。
- 初回minor 1--5: $\Phi$、$\pi_D$、CUSUMの $k,h$ とシグナル条件、二項・ポアソン計数管理図の正規近似条件、群サイズカードの表題と50%検出に相当する注意が修正されたことを確認した。
- 差し替え6枚を独立再計算した。管理図選択4件はデータ型・検査量との対応が正しい。$p$ 基準値は $20/300=0.0667$、共通原因を含む並列系は $0.95(1-0.1^2)=0.9405$、直列系の部品信頼度要件は $0.9^{1/3}=0.96549$、指数寿命のMTBF要件は $1000/(-\log0.9)=9491.2$、故障率のGarwood型正確区間は上側点規約の下で $[\chi^2_{16,0.975}/8000,\chi^2_{18,0.025}/8000]$ となり、すべて掲載値・式と一致した。

## 第1回修正後再査読

- fatal: 0
- major: 0
- minor: 3

1. `engqc-p-chart-constant-n`、`engqc-p-chart-varying-n`: 答えで突然 $SE$ を使うが、カード内にも `notation.md` にも標準誤差（standard error）の略号としての定義がない。`SE=...` を「比率の標準偏差」などへ書き換えるか、カード内で略号を定義すること。
2. `anki/syllabus/coverage.yaml`: `engqc-cp-numeric` は内容が「$p$ 管理図の基準不適合品率推定」へ差し替えられ、sourceも公式用語「管理図」だが、「管理図」のcards配列には入っておらず「プロセス管理」だけに入っている。対象サブカテゴリーのcards総覧には存在するが、公式用語への対応を同期すること。
3. `anki/notation.md`、`anki/formulae.md`、`engrel-weibull-hazard-shape`、`engrel-weibull-reliability`: 分布正本はワイブル分布の尺度を $\lambda$ とする一方、公式集と2カードは尺度を $\eta$ とする。各カード内では定義されているため計算不能ではないが、正本同期の観点から尺度記号を統一すること。なお故障率 $\lambda$ との衝突を避けるなら、分布正本側を $\eta$ に統一するのが明瞭である。

## 第1回修正後の機械検証

- `npm run anki:validate`: 成功。1325 cards、0 warnings。配信HTMLのbuild/checkも成功。
- `npm run validate`: 成功。構造検証、KaTeX strict（372 Markdown files）、本文検証（237 files）がすべて成功。

fatal: 0 / major: 0 / minor: 3

## 第2回修正確認

- `engqc-p-chart-constant-n` と `engqc-p-chart-varying-n` で $SE$ が標準誤差としてカード内定義されたことを確認した。
- `coverage.yaml` の公式用語「管理図」に `engqc-p-chart-baseline-estimation` が追加され、内容対応へ改名された5カードIDが対象サブカテゴリー総覧と各公式用語配列へ同期されたことを確認した。旧IDの残存参照は機械検証でも認めなかった。
- `notation.md`、`formulae.md`、`engrel-weibull-hazard-shape`、`engrel-weibull-reliability` でワイブル分布の尺度記号が $\lambda$ へ統一され、$R(500)=e^{-0.25}\approx0.7788$ と故障率の単調性が保たれていることを再計算した。
- 全47枚を再確認し、追加の計算誤り、条件欠落、未定義記号、式展開の飛躍、7節欠落、coverage不整合を認めなかった。

## 最終再査読

- final_reviewer_id: c26_math_review
- final_reviewed_at: 2026-08-22T21:53:10+09:00
- fatal: 0
- major: 0
- minor: 0

## 最終機械検証

- `npm run anki:validate`: 成功。1325 cards、0 warnings。配信HTMLのbuild/checkも成功。
- `npm run validate`: 成功。構造検証、KaTeX strict（372 Markdown files）、本文検証（237 files）がすべて成功。

fatal: 0 / major: 0 / minor: 0
