# C18-bayesian-methods 独立数理査読

- initial_reviewer_id: c18_math_review
- initial_reviewed_at: 2026-08-21T09:31:39+09:00
- target: anki/cards/40_bayesian_methods.md 全45枚、anki/formulae.md、anki/syllabus/coverage.yaml

## 初回指摘

### minor

1. `bayes-density-formula`：事後密度の正規化が成立する条件 $0<m(x)<\infty$ が明示されていない。提示式自体は正しいが、事後分布が定義できるための条件を「使用公式・定理」または「注意」に加えること。
2. `bayes-factor-definition`：周辺尤度比の定義式は正しいが、モデル固有母数に置く事前分布がproperであること（または任意定数を含まない正規化済みの事前分布であること）が当該カード内に明示されていない。`bayes-factor-improper-prior` に説明はあるものの、1カード単独で定義の成立条件を再生できるよう注意を追記すること。

### 再計算結果

- Beta--Binomial、Gamma--Poisson、Gamma--Exponential、Normal--Normal、正規--逆Gamma、Dirichlet--Multinomialの共役更新を再計算し、超母数・正規化係数・数値例は一致した。
- Bernoulli、Poisson、指数、正規、Studentのtの事後予測分布を積分または分散分解で再計算し、式は一致した。
- 二乗損失、絶対損失、0--1損失、非対称絶対損失の事後期待損失を再計算し、対応する事後平均・中央値・MAP・分位点は正しい。
- 信用区間、ベイズファクター、事後オッズ、正規階層モデルの縮小係数、Gibbs完全条件付き分布を再計算し、数値例を含め誤りはなかった。
- `anki/formulae.md` のC18対応公式と `anki/syllabus/coverage.yaml` のカード対応はカード本文と整合した。

## 機械検証

- `npm run anki:validate`: 成功（896 cards、0 warnings）
- `npm run validate`: 成功（構造検証、336 MarkdownのKaTeX strict検証、237生成対象テキスト検証）

## 初回件数

fatal: 0 / major: 0 / minor: 2

## 修正確認

- `bayes-density-formula`：問題文に $0<m(x)<\infty$ が明記され、事後密度の正規化条件をカード単独で確認できる。解消。
- `bayes-factor-definition`：使用公式欄に各モデル内のproper事前分布条件が明記され、通常のベイズファクターの成立条件をカード単独で確認できる。解消。
- 修正後の全45枚、`anki/formulae.md`、`anki/syllabus/coverage.yaml` を再査読した。共役更新、予測分布、損失によるBayes決定、信用区間、ベイズファクター、階層モデル/Gibbsの式展開・利用公式・成立条件・数値例に未解消の数理的問題はない。
- `npm run anki:validate`: 成功（896 cards、0 warnings）
- `npm run validate`: 成功（構造検証、338 MarkdownのKaTeX strict検証、237生成対象テキスト検証）

- final_reviewer_id: c18_math_review
- final_reviewed_at: 2026-08-21T09:33:56+09:00

## 最終件数

fatal: 0 / major: 0 / minor: 0
