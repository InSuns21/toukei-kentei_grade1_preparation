# C25-engineering-inference-asymptotics 独立数理査読

- 担当ID: `/root/c25_math_review`
- 実行日時: 2026-08-22 (Asia/Tokyo)
- initial_reviewer_id: c25_math_review
- initial_reviewed_at: 2026-08-22T21:09:35+09:00
- 対象: `anki/cards/47_engineering_inference_asymptotics.md` の新規70枚、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/coverage.yaml`
- 査読方法: 全70枚について、問題設定から答え・計算例までの数値、行列積、分散共分散、漸近分散、極限分布、検定統計量を独立再計算した。併せて、仮定、未定義記号、7節テンプレート、公式正本・記法正本・coverageとの同期を確認した。

## 初回結果

- fatal: 0
- major: 2
- minor: 6

## 初回指摘

### major

1. `enginf-new-observation-pi`: 問題が「前カードと同じ値」とだけ記し、Ankiでこのカードを単独提示したとき、予測平均、$s$、二次形式、自由度・臨界値が与えられない。この状態では問題を一意に計算できない。前カードにある $\widehat y_0=50$、$s=4$、$x_0^{\mathsf T}(X^{\mathsf T}X)^{-1}x_0=0.09$、$t_{20,0.025}=2.086$ を問題内へ再掲し、独立した1カードにすること。
2. `anki/formulae.md`、`anki/notation.md`、`engasym-sample-quantile-variance` ほか: 「漸近分散」の規約が正本間で衝突している。`formulae.md` は $\sqrt n(T_n-\theta)\Rightarrow N(0,v)$ の $v$ を漸近分散と呼ぶ一方、`notation.md` とカードは推定量自体の $v/n$ を `\operatorname{Avar}(T_n)` と呼ぶ。中心用語について答案で $v$ と $v/n$ を取り違える原因になるため、$v$ を「漸近分散定数」、$v/n$ を「推定量の近似分散（本教材で `Avar` と書く量）」などと明示して正本とカードを統一すること。

### minor

1. `enginf-logistic-irls-one-step`、`enginf-poisson-mean`、`enginf-glm-link-selection`: 数式中の `qquad` / `quad` にバックスラッシュがなく、空白命令ではなく文字積として表示される。`\qquad` / `\quad` に修正すること。特に前2枚の答えと、リンク対応表の2箇所を確認すること。
2. `engasym-sample-quantile-variance`: 分位点の漸近正規性には、独立同分布標本であること、$F$ が $q_p$ 近傍で微分可能で密度が連続かつ $f(q_p)>0$ であることなどの局所条件が必要である。現状は「$f(q_p)>0$」しか明示されず、経験分布に基づく標本の独立同分布性も読者任せになっている。問題または使用公式・定理に条件を補うこと。
3. `engasym-sample-variance-normal`: 使用公式から答えへ式が一段飛んでいる。少なくとも
   $$\frac{(n-1)S^2/\sigma^2-(n-1)}{\sqrt{2(n-1)}}
   =\frac{\sqrt{n-1}(S^2-\sigma^2)}{\sqrt2\,\sigma^2}\xrightarrow{d}N(0,1)$$
   を示し、$\sqrt n/\sqrt{n-1}\to1$ から答えを得る流れを再掲すると、利用公式から漸近分散 $2\sigma^4$ を追える。
4. `enginf-ols-unbiased-condition`、`enginf-ols-covariance-matrix`: いずれも $(X^{\mathsf T}X)^{-1}$ を使うが、$X$ が列フルランクである条件を問題・使用公式に明示していない。逆行列の存在条件を追記すること。
5. `enginf-gls-whitening`: 初出のGLSを一般化最小二乗法（generalized least squares; GLS）と展開していない。また $\Omega$ は $\operatorname{Var}(\varepsilon)=\sigma^2\Omega$ の「誤差相関構造」とされているが、対角要素1を仮定しておらず、正確には正定値な分散共分散構造（尺度行列）である。用語と定義を修正すること。
6. `enginf-logistic-irls-one-step`: 初出のIRLSが未定義である。「反復再重み付き最小二乗法（iteratively reweighted least squares; IRLS）」を記号・用語欄へ置くこと。作業応答と重みの式・数値 $p=0.5,z=2,w=0.25$ 自体は独立再計算で正しい。

## 再計算で確認した事項

- 70枚すべてに「問題 → 記号・用語 → 使用公式・定理 → 一手／方針 → 答え → 計算例 → 注意」が各1件存在する。
- $n=62$ の標本数設計、局所対立下の $N(h/\sigma,1)$、リスク比・オッズ比の標準誤差、Bernoulli情報量 $1/\{p(1-p)\}$ を再計算し一致した。
- WLS値10.8、Ridge値 $(2,-4/3)^{\mathsf T}$、非線形予測の標準誤差 $\sqrt5/e$、制約付き最小二乗値 $(2,0)^{\mathsf T}$ を再計算し一致した。
- OLS行列計算、線形対比、部分F、分散分析表、平均応答区間、予測区間、レバレッジ、スチューデント化残差、Cookの距離を再計算し、上記の独立提示問題を除いて答えの数値は一致した。
- `coverage.yaml` では2サブカテゴリーと公式用語へのカードID対応が存在し、全70カードIDも対象サブカテゴリーの一覧へ収録されている。

## 機械検証

- `npm run anki:validate`: 成功。1278 cards、0 warnings。配信HTMLのbuild/checkも成功。
- `npm run validate`: 成功。構造検証、KaTeX strict（366 Markdown files）、本文検証がすべて成功。
- 注記: バックスラッシュのない `qquad` / `quad` は通常の英字変数列としてKaTeXに受理されるため、機械検証成功だけでは解消扱いにできない。

## 修正確認

- 初回major 1: `enginf-new-observation-pi` に予測平均、$s$、二次形式、臨界値が再掲され、単独で計算可能になったことを確認した。
- 初回major 2: `formulae.md`、`notation.md`、対象カードで、極限正規分布の分散 $v$ を「漸近分散定数」、推定量自体の近似分散 $v/n$ を本教材の $\operatorname{Avar}$ とする規約へ統一されたことを確認した。$\dot\sim$ の意味も `notation.md` に追加された。
- 初回minor 1--6: `\qquad` / `\quad`、標本分位点の独立同分布性と局所条件、標本分散のカイ二乗標準化途中式、OLSの列フルランク、GLSの正式名と $\Omega$ の定義、IRLSの正式名をすべて確認した。
- 差替え後を含む全70枚について7節が各70件あることを確認し、既存カードの数値・行列・漸近分散を再点検した。

## 第1回修正後再査読

- reviewed_at: 2026-08-22T21:18:00+09:00
- fatal: 0
- major: 0
- minor: 2

1. `enginf-binomial-glm-loglikelihood`: 周辺分布 $Y_i\sim\operatorname{Binomial}(m_i,p_i)$ だけでは、各観測の対数尤度を和で書けない。問題に「$Y_i$ は独立」と明示すること。
2. `enginf-interaction-slope-test`: 5%両側判定に使った標準正規近似と臨界値1.96が「使用公式・定理」にない。$H_0:\beta_3=0$ の下で $Z\dot\sim N(0,1)$、$|Z|>1.96$ なら棄却、と明示し、どの定理から判定したかを追えるようにすること。

## 第2回修正確認

- `enginf-binomial-glm-loglikelihood` の問題に観測間の独立性が明記され、独立二項尤度の積から対数尤度の和を導けることを確認した。
- `enginf-interaction-slope-test` の使用公式・定理に、$H_0:\beta_3=0$、$Z\dot\sim N(0,1)$、5%両側棄却則 $|Z|>1.96$ が明記されたことを確認した。$Z=-2.5$ の判定も再計算し一致した。
- 差替え7枚を含む全70枚を再確認し、追加の計算誤り、条件欠落、未定義記号、式展開の飛躍、7節欠落は認めなかった。

## 最終再査読

- final_reviewer_id: c25_math_review
- final_reviewed_at: 2026-08-22T21:21:50+09:00
- fatal: 0
- major: 0
- minor: 0

## 最終機械検証

- `npm run anki:validate`: 成功。1278 cards、0 warnings。配信HTMLのbuild/checkも成功。
- `npm run validate`: 成功。構造検証、KaTeX strict（368 Markdown files）、本文検証がすべて成功。

fatal: 0 / major: 0 / minor: 0
