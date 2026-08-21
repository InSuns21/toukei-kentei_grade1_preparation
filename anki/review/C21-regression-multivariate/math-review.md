# C21-regression-multivariate 独立数理査読

- initial_reviewer_id: c21_math_review
- initial_reviewed_at: 2026-08-21T12:46:23+09:00
- review_scope: `anki/cards/43_regression_multivariate.md` の新規70枚、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/coverage.yaml` の `applied-multiple-regression` / `applied-multivariate`

## 初回指摘

### major

1. `reg-leverage-threshold` — $p$ の意味が未定義で、公式集と記号規約が衝突している。
   - カードは「$n=50,p=5$ の回帰」から平均レバレッジを $p/n=0.10$ としているため、$p$ を切片込みの推定係数数として使っている。
   - 一方、`anki/formulae.md` の回帰全体F検定・レバレッジでは $p$ を説明変数数として使い、$sum_i h_{ii}=p+1$ としている。この規約なら平均は $(p+1)/n=0.12$、2倍基準は0.24となる。
   - カード単独で計算を一意に追えるよう、切片込み係数数を $k=5$ と明記して $k/n$ を用いるか、$p$ を説明変数数として $(p+1)/n$ に直す必要がある。

2. `mv-hotelling-f-transform` — exactなF分布への変換に必要な母集団仮定がカード内にない。
   - $\{(n-p)/(p(n-1))\}T^2\sim F_{p,n-p}$ は、独立な標本が $p$ 次元正規母集団から得られ、標本共分散が可逆である場合のexactな結果である。
   - 現在は $n>p$ と標本共分散の分母しか再掲されていない。Ankiは各カード単独で再生するため、直前カードへの依存では成立条件を満たさない。

### minor

1. `mv-kmeans-one-iteration` — 新重心の式が `$\bar x_{C_1}=1,qquad \bar x_{C_2}=9$` となり、`\qquad` のバックスラッシュが欠落している。KaTeX検証は通るが、`qquad` が数式中の文字列として表示され、計算結果が読みにくい。

2. `glm-nonlinear-regression-gradient` — Gauss–Newton更新で $(\boldsymbol J^{\mathsf T}\boldsymbol J)^{-1}$ を使う条件が明記されていない。少なくとも更新点で $\boldsymbol J$ が列フルランクであること、特異なら一般化逆行列等が必要であることを注意へ補うと、成立条件をカード単独で判定できる。

## 独立再計算・確認結果

- 回帰診断：PRESS恒等式、DFFITS、DFBETA、HC0/HC3、Breusch–Paganの $nR^2$、条件数を再計算した。上記レバレッジ記号規約を除き、公式と数値結果は整合した。
- GLS・正則化・選択：GLS正規方程式、WLS相対重み、Ridge閉形式・SVD縮小率、Lassoソフト閾値・KKT、Elastic Net、$C_p$、AIC、BICを再計算した。数値結果は正しい。
- GLM：指数型分布族の平均・分散、logit逆変換、オッズ比、二項対数尤度とscore、IRLS、Poisson平均比・offset、逸脱度、Pearson統計量、尤度比、過分散、限界効果、probit、Tobitを再導出した。数値結果は正しい。
- 多変量：標本共分散、線形変換、Mahalanobis距離、Hotelling $T^2$、PCA固有値・寄与率・得点・負荷量・再構成誤差、因子モデル共分散・共通性・回転・因子得点、LDA、Ward法、k-means、正準相関、古典的MDSを再導出した。上記Hotelling条件とk-means記法を除き整合した。
- coverageの70カード参照と `applied-multiple-regression` / `applied-multivariate` の用語対応を確認した。対象カードIDとの不一致はなかった。

## 機械検証

- `npm run anki:validate`: 成功（1052 cards、0 warnings、配信19カテゴリ）
- `npm run validate`: 成功（構造検証、KaTeX strict 348 Markdown、本文検証237ファイル）

## 初回集計

- fatal: 0
- major: 2
- minor: 2

## 修正確認（第1回再査読）

- reviewed_at: 2026-08-21T12:51:47+09:00
- `reg-leverage-threshold`: 解消。$k$ を切片込み係数総数と定義し、平均 $k/n$、目安 $2k/n$、トレース公式の記号が一貫した。
- `mv-hotelling-f-transform`: 解消。問題と使用公式の双方に、多変量正規母集団からの独立標本、$S$ の可逆性を再掲した。$F=20/3$ と自由度 $(2,8)$ も再計算して一致した。
- `mv-kmeans-one-iteration`: 解消。`\qquad` が正しく表示され、重心1,9と更新後WSS=4も再計算して一致した。
- `glm-nonlinear-regression-gradient`: 解消。現在値でのヤコビ行列の列フルランク条件が追加された。
- 追加カード `reg-software-output-interpretation`: $1.20/0.40=3.00$、個別t検定と回帰全体F検定の帰無仮説を確認し、指摘なし。
- 追加カード `glm-software-deviance-output`: 逸脱度差 $120-90=30$、自由度差2、5%臨界値5.991との比較、$90/97\approx0.928$ を再計算し、指摘なし。
- 追加カード `mv-pca-software-output`: 固有値和3、寄与率 $2.4/3=0.80$、丸められた固有ベクトルのノルム二乗 $0.70^2+0.68^2+0.22^2=1.0008$ を確認し、指摘なし。

### 再査読で残った指摘

#### major

1. `anki/formulae.md` のC21追加公式に成立条件が欠け、1項は条件なしでは式自体が成立しない。
   - 1標本Hotelling統計量のexactなF分布には、多変量正規母集団からの独立標本、$S$ の可逆性、$n>p$ を併記する必要がある。カード側だけでなく、公式集も条件付きの公式として同期させる必要がある。
   - 因子分析の $\Sigma=\Lambda\Lambda^{\mathsf T}+\Psi$ には $\operatorname{Cov}(F,\varepsilon)=0$ が必要である。現在の「$\operatorname{Var}(F)=I$、$\operatorname{Var}(\varepsilon)=\Psi$ なら」という記述だけでは交差共分散項が消えず、一般には式が成立しない。

### 第1回再査読集計

- fatal: 0
- major: 1
- minor: 0

## 第1回再査読の機械検証

- `npm run anki:validate`: 成功（1055 cards、0 warnings、配信19カテゴリ）
- `npm run validate`: 成功（構造検証、KaTeX strict 350 Markdown、本文検証237ファイル）

最終件数は未確定。上記公式集の条件追記後に再確認する。

## 修正確認（最終再査読）

- final_reviewer_id: c21_math_review
- final_reviewed_at: 2026-08-21T12:53:18+09:00
- `anki/formulae.md` の1標本Hotelling公式に、p次元正規母集団からの独立標本、$S$ 可逆、$n>p$、帰無仮説下というexactなF分布の全条件が追加された。カード `mv-hotelling-one-sample` / `mv-hotelling-f-transform` と整合する。
- 因子分析公式に $\operatorname{Cov}(F,\varepsilon)=0$ が追加され、共分散展開の交差項が0となる根拠が明示された。カード `mv-factor-model-covariance` と整合する。
- 73枚全体、公式集、記法、`applied-multiple-regression` / `applied-multivariate` のcoverageを再確認し、新たな数理上・式展開上の指摘はない。

## 最終機械検証

- `npm run anki:validate`: 成功（1055 cards、0 warnings、配信19カテゴリ）
- `npm run validate`: 成功（構造検証、KaTeX strict 350 Markdown、本文検証237ファイル）

## 最終件数

- fatal: 0
- major: 0
- minor: 0

fatal: 0 / major: 0 / minor: 0
