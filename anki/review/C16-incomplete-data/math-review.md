# C16-incomplete-data 独立数理査読

- initial_reviewer_id: c16_math_review
- initial_reviewed_at: 2026-08-21T01:54:25+09:00
- review_scope: anki/cards/38_incomplete_data.md（新規27枚）、anki/formulae.md、anki/syllabus/coverage.yaml
- validation_anki: pass（`npm run anki:validate`、816 cards、0 warnings）
- validation_project: pass（`npm run validate`、構造・KaTeX 328 Markdown・テキスト237件）

## 初回指摘

### major

1. `surv-kaplan-meier-formula` — 使用公式として掲げた
   $$P(T>t_j)=P(T>t_{j-1})P(T>t_j\mid T\ge t_j)$$
   は一般には成り立たない。右辺第2因子の条件事象が第1因子と連鎖しておらず、特に $t_{j-1}$ と $t_j$ の間の打ち切りを含む設定で積の導出になっていない。確率の乗法公式としては
   $$P(T>t_j)=P(T>t_{j-1})P(T>t_j\mid T>t_{j-1})$$
   とし、KM因子 $1-d_j/n_j$ は「時刻 $t_j$ 直前のリスク集合にいた個体が時刻 $t_j$ を越える条件付き確率」の推定値であることを別に説明する必要がある。

### minor

1. `surv-logrank-statistic` — 答えで $Z=(O_1-E_1)/\sqrt V$ を提示しているが、カード内に $V$ の式がない。使用公式に
   $$V=\sum_j\frac{n_{1j}n_{0j}d_j(n_j-d_j)}{n_j^2(n_j-1)}$$
   を明記すれば、次の数値カードを参照せず式展開を追える。

2. `inc-em-observed-likelihood` — 「Eステップで欠測成分を条件付き期待値へ置換」と一般化しているが、一般のEM法で期待値を取る対象は完全データ対数尤度であり、欠測値そのものの代入と一致するとは限らない。すでに正しいQ関数を示しているため、「完全データ対数尤度（またはその十分統計量）の条件付き期待値を計算する」と直すのが正確。

## 独立再計算結果

- `inc-mcar-mar-mnar` から `inc-multiple-imputation-rubin`：MCAR/MARの条件、観測尤度の周辺化、完全ケース平均、平均代入の偏差平方和、IPWの $10/3$、Rubin則の $T=5.2$ を再計算した。上記EMの表現を除き数式・数値は整合する。
- `surv-survival-hazard-relations` から `surv-censoring-vs-truncation`：$h=f/S$、$H=-\log S$、右打ち切り尤度、指数モデルの $\widehat\lambda=\sum\delta_i/\sum x_i$、条件付き密度を再計算した。数式・成立条件は整合する。
- `surv-kaplan-meier-numeric` と `surv-greenwood-numeric`：$\widehat S(3)=8/15$、Greenwood和 $13/60$、分散 $208/3375\approx0.0616$、標準誤差約0.248を再計算し一致した。
- `surv-logrank-numeric`：$E_1=1.2$、$O-E=0.8$、超幾何分散 $384/900\approx0.427$、$Z\approx1.225$ を再計算し一致した。
- `surv-cox-model` から `surv-delayed-entry-risk-set`：ハザード比 $e^{0.6}\approx1.82$、部分尤度寄与 $2/3$、比例ハザード診断、遅延参加条件 $(L_i,X_i]$ を確認した。単独事象・端点規約の注意も明示されている。
- `anki/formulae.md` のC16追加公式はカード式と一致し、`anki/syllabus/coverage.yaml` は新規27枚と既存EMカードを対象3用語へ対応付けている。

## 初回件数

fatal: 0 / major: 1 / minor: 2

## 修正確認

- `surv-kaplan-meier-formula`：誤った条件付き確率の等式を削除し、時刻直前のリスク集合に基づく $(n_j-d_j)/n_j$ を事象時刻ごとに掛ける積極限法へ修正された。major解消。
- `surv-logrank-statistic`：$n_{0j}=n_j-n_{1j}$ とした超幾何分散の総和
  $$V=\sum_j\frac{d_j(n_j-d_j)n_{1j}(n_j-n_{1j})}{n_j^2(n_j-1)}$$
  が明記され、標準化まで単独カードで追える。minor解消。
- `inc-em-observed-likelihood`：Eステップを完全データ対数尤度または十分統計量の条件付き期待値の計算と明記し、一般のEM法に対して正確になった。minor解消。
- 試験適合性査読による重複整理後の新規25枚を全文再確認した。削除された生存関数関係・指数生存モデルの2枚に依存する式は、各カード内または `anki/formulae.md` に残っており、残存カードの数理的完結性に欠落はない。
- `anki/syllabus/coverage.yaml` は残存25枚と既存 `data-em-responsibility` の対応に同期している。
- 再査読時の `npm run anki:validate` は814 cards、0 warningsで成功した。
- 再査読時の `npm run validate` は構造検証、KaTeX strict 330 Markdown、テキスト237件のすべてで成功した。

- final_reviewer_id: c16_math_review
- final_reviewed_at: 2026-08-21T01:57:53+09:00

## 最終件数

fatal: 0 / major: 0 / minor: 0
