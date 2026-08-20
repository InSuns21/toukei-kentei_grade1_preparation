# C13 独立数理査読

initial_reviewer_id: /root/c13_math_review
initial_reviewed_at: 2026-08-21T00:50:56.6595800+09:00

## 対象

- `anki/cards/35_normal_various_tests.md` の新規48枚
- `math-normal-tests`、`math-various-tests` に属する関連既存カード4枚（`test-chi-square-fit`、`test-sign-test`、`mathstat-exact-poisson-rate-test`、`mathstat-mcnemar-exact-test`）
- `anki/notation.md`、`anki/formulae.md`
- `anki/syllabus/coverage.yaml` の `math-normal-tests`、`math-various-tests`

正規平均・分散のZ/t/カイ二乗/F検定、二項・Poisson検定、適合度・独立性検定、正確検定、順位検定、置換検定、多重検定について、帰無分布、自由度、臨界値の向き、数値例、適用条件を独立に再計算した。確率点記法は `anki/notation.md` の「上側確率点」と照合した。

## 初回指摘

### major

1. `test-yates-correction` の一般式は、$|O_{ij}-E_{ij}|<0.5$ の場合にも一律に0.5を引いて二乗するため、完全一致 $O_{ij}=E_{ij}$ でも正の統計量を返し、「修正により統計量は小さくなる」という注意とも矛盾する。各セルの修正量を
   $$\frac{\{\max(0,|O_{ij}-E_{ij}|-0.5)\}^2}{E_{ij}}$$
   とするか、同値に $\min(0.5,|O_{ij}-E_{ij}|)$ を差から引く形で明記する必要がある。数値例 $|12-10|=2$ は現行式でも正しいが、提示された公式は一般には正しくない。

### minor

1. `test-two-proportion-pooled` は $\widehat p_1,\widehat p_2$ を式で使用するが、$\widehat p_j=X_j/n_j$ の定義がカード内にない。さらにZ近似には帰無仮説下の各群の期待成功数・期待失敗数が十分大きいという条件が必要である。定義と近似条件を同じカードへ補うこと。
2. `test-wilcoxon-signed-rank` は差の連続性・0中心の対称性を明記している一方、正確な符号配置の帰無分布に必要な差 $D_i$ 間の独立性（通常は独立同分布）を明記していない。「独立同分布な対応差」と補うこと。

## 独立再計算メモ

- `test-normal-z-one-sided-numeric` は $Z=2.4$、上側P値 $0.0082$、`test-normal-z-left-sided` は $Z=-1.5$、左側P値 $0.0668$ で正しい。
- `test-normal-t-numeric` は自由度15で $T=2$、両側P値約0.064。`test-paired-t-numeric` は自由度11で $T=3/(4/\sqrt{12})=2.598$。
- 結合2標本例は $S_p^2=5$、標準誤差1、$T=2$。Welch例は $T=1.6036\ldots$、自由度 $12.25/(6.25/9+1/19)=16.397\ldots$。
- 正規母分散例は $Q=33.75$、自由度15の中央95%区間外。分散比例は $F=4$、自由度 $(10,15)$ で正しい。F分布の逆数関係も上側点記法と一致する。
- 正確二項例は $11/1024=0.0107421875$、符号検定例は $22/1024=0.021484375$。
- 2母比率例は標準誤差 $\sqrt{0.005}=0.0707107\ldots$、$Z=2.8284\ldots$、両側P値約0.0047。
- Poisson平均4の $P(X\ge8)=0.05113\ldots$、Poisson Score例は $30/\sqrt{200}=2.1213\ldots$。
- 適合度例は $X^2=6$、自由度3。2×2独立性例は期待表 $(20,30;20,30)$、$X^2=50/3=16.6667\ldots$。
- Fisher正確検定例は $\binom53\binom51/\binom{10}4=50/210$。Mann--Whitney例は $U_X=2$。McNemar例は $225/25=9$。
- 関連既存カードのPoisson条件付き二項分布と数値 $56/1024=0.0546875$、McNemar正確P値 $2(299/4096)=0.145996\ldots$ は正しい。
- 上記指摘以外の公式、自由度、数値例、棄却判断に計算上の誤りは認めなかった。coverageには新規48枚と関連既存4枚が対象サブカテゴリーへ登録されている。

## 機械検証

- `npm run anki:validate`: 成功（661 cards、0 warnings、2026-08-21）
- `npm run validate`: 成功（構造、KaTeX strict 316 Markdown files、テキスト、2026-08-21）
- 機械検証は上記のYates修正式の意味上の問題および適用条件の不足を検出しなかった。

## 初回集計

fatal: 0 / major: 1 / minor: 2

## 修正後再査読

final_reviewer_id: /root/c13_math_review
final_reviewed_at: 2026-08-21T00:56:34.8300627+09:00

新規51枚、関連既存4枚、`anki/notation.md`、`anki/formulae.md`、対象coverageを同じ担当が全文再査読した。

### 修正確認

- 初回major 1（`test-yates-correction`）: 解消。セル寄与は $\{\max(0,|O-E|-0.5)\}^2/E$ へ修正され、完全一致では0、かつ各セルで未修正寄与以下となる。数値例も $(2-0.5)^2/10=0.225$ で一致する。
- 初回minor 1（`test-two-proportion-pooled`）: 解消。$\widehat p_j=X_j/n_j$ の定義と、帰無仮説下の各群の期待成功数・期待失敗数が十分大きいというZ近似条件が追加された。
- 初回minor 2（`test-wilcoxon-signed-rank`）: 解消。帰無仮説の条件が独立同分布な差、連続性、0中心の対称性として明記された。

### 追加・差し替えカードの確認

- `test-goodness-fit-estimated-parameters`: $\widehat\lambda=40/50=0.8$、$E_0=50e^{-0.8}=22.4664\ldots$、自由度 $4-1-1=2$ は正しい。確率質量関数と推定母数による自由度減少がカード内に明示されている。
- `test-wilcoxon-signed-rank-numeric`: 順位和総計21、$W_+=0$、対称な両端2通りを $2^6$ 通りで割った両側P値 $1/32=0.03125$ は正しい。独立同分布、連続、対称性、0差・同順位なしの条件も明示されている。
- `test-mann-whitney-u-numeric`: $U_X=0$、全ラベル割当て $\binom84=70$、両端2通りによる両側P値 $2/70=0.028571\ldots$ は正しい。交換可能性と位置差解釈の追加条件も明示されている。
- `test-ks-one-sample-numeric`: $D^+=(0.20,0.40,0.60,0.80)$ の最大0.80、$D^-=(0.05,-0.15,-0.35,-0.55)$ の最大0.05、したがって $D_n=0.80$ であり、与えられた臨界値0.68による棄却判断は正しい。完全指定された連続帰無分布という条件も明示されている。
- coverageには新規51枚と関連既存4枚が対象サブカテゴリーへ収録され、追加3枚は `math-various-tests` と「ノンパラメトリック検定」の双方へ対応付けられている。

### 再検証

- `npm run anki:validate`: 成功（664 cards、0 warnings、2026-08-21）
- `npm run validate`: 成功（構造、KaTeX strict 318 Markdown files、テキスト、2026-08-21）

## 最終集計

fatal: 0 / major: 0 / minor: 0

## 最終本文変更後の確認

final_post_edit_reviewed_at: 2026-08-21T00:58:42.0565294+09:00

- `test-ks-one-sample-numeric` の $n=4$、両側5%正確臨界値は $0.6239\ldots$ であり、丸めた0.624は正しい。$D^+=0.80$、$D^-=0.05$、$D_n=0.80>0.624$ なので棄却判断も変わらず正しい。
- `test-independence-chisquare` と `test-independence-2x2-numeric` の `sources.topic` は「独立性のカイ二乗検定」へ修正され、カード内容と一致する。数式・数値への変更はない。
- C13対象の新規51枚、関連既存4枚、公式、記法、coverageを本文変更後に確認し、新たな数理・表記上の指摘はない。
- `npm run anki:validate`: 成功（664 cards、0 warnings、2026-08-21）
- `npm run validate`: 成功（構造、KaTeX strict 318 Markdown files、テキスト、2026-08-21）

最終結果: fatal: 0 / major: 0 / minor: 0
