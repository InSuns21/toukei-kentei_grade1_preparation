# C14 独立数理査読（初回）

- initial_reviewer_id: c14_math_review
- initial_reviewed_at: 2026-08-21T01:20:34+09:00
- scope: `anki/cards/36_anova_regression.md` の新規73カード、`math-anova` / `math-regression` coverage 内の関連既存カード、`anki/notation.md`、`anki/formulae.md`、`anki/syllabus/coverage.yaml`

## 独立再計算の結果

平方和分解、平均平方、F統計量、自由度、対比の標準誤差、Tukey・Bonferroni・Scheffe、二元配置、交互作用、単回帰・重回帰の最小二乗推定、係数分散、t・F推測、信頼区間・予測区間、ハット行列、残差分散、レバレッジ、Cook距離について、全数値例と式を独立に再計算した。下記4件を除き、数値、自由度、分布、条件、式展開は正しい。関連既存カード `data-anova-decomposition` と `data-ols-slope` も再計算し、誤りはなかった。

## 指摘

### major

1. `reg-omitted-variable-bias`: 記載された確率極限
   $$\operatorname{plim}\widetilde\beta_1=\beta_1+\beta_2\frac{\operatorname{Cov}(X,Z)}{\operatorname{Var}(X)}$$
   は、少なくとも $\operatorname{Cov}(X,\varepsilon)=0$（通常は $E[\varepsilon\mid X,Z]=0$）、$\operatorname{Var}(X)>0$、必要な有限二次モーメントを仮定して初めて成立する。現状は「真のモデル」とだけあり、内生性がある場合にも無条件で成立する式に読める。問題または答えに成立条件を明示すること。

### minor

1. `anova-ancova-model`: $\mu$ と群効果 $\alpha_i$ の識別制約がないため、提示モデルの母数表示が一意でない。例えば $\sum_i n_i\alpha_i=0$（または基準群制約）を明記すること。
2. `anova-fixed-random-effects`: 変量効果モデルで $A_i$ の分布しか示されず、$\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2)$ と $A_i$ と誤差の独立性が明示されていない。分散成分モデルの共分散構造を決める条件なので追記すること。
3. `reg-log-response-interpretation`: $Y(X+1)/Y(X)\approx e^{\beta_1}$ は、異なる観測の生の応答比について一般に成立する式ではない。$e^{\beta_1}$ は条件付き中央値の比として正確であり、誤差分布がXによらず指数モーメントを持つ場合は条件付き平均の比としても成立する、という推測対象を明示すること。

## 機械検証

- `npm run anki:validate`: 成功。737 cards、0 warnings、13 category pages、各ページ最大200枚。
- `npm run validate`: 成功。構造検証成功、320 Markdown files の KaTeX strict 成功、237生成対象テキスト検証成功。

fatal: 0 / major: 1 / minor: 3

## 修正後再査読

- final_reviewer_id: c14_math_review
- final_reviewed_at: 2026-08-21T01:24:16+09:00

初回と同じ担当がC14全体を再査読した。初回指摘の修正確認は次のとおり。

- `reg-omitted-variable-bias`: $E[\varepsilon\mid X,Z]=0$、有限二次モーメント、$\operatorname{Var}(X)>0$ が明示され、確率極限の成立条件が充足された。
- `anova-ancova-model`: $\sum_i n_i\alpha_i=0$ が追記され、母数表示が識別された。
- `anova-fixed-random-effects`: 誤差の独立同分布正規仮定と変量効果・誤差間の独立性が追記された。
- `reg-log-response-interpretation`: 条件付き中央値の比として正確に定式化され、条件付き平均へ拡張できる条件も区別された。

試験適合性査読対応で追加された `reg-slope-geometric-projection` も独立再計算した。中心化、直交条件、射影係数 $S_{xy}/S_{xx}$、数値例はいずれも正しい。初稿にあった `\widehat\beta_1` のバックスラッシュ欠落も修正済みである。これを含む新規74カードと関連既存カードを通読し、未解消の数理・条件・数値・自由度・分布・式展開上の指摘はない。

### 再検証

- `npm run anki:validate`: 成功。738 cards、0 warnings、13 category pages、各ページ最大200枚。
- `npm run validate`: 成功。構造検証成功、322 Markdown files の KaTeX strict 成功、237生成対象テキスト検証成功。

fatal: 0 / major: 0 / minor: 0
