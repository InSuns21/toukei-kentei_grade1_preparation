# カード説明改善 教育・試験適合性査読

- reviewer_id: global_explanation_pedagogy_review
- reviewed_at: 2026-08-22T00:00:00+09:00
- 対象: `anki/cards/31_asymptotic_estimation.md` から `anki/cards/43_regression_multivariate.md` までの13ファイル、計589枚
- 査読範囲: 完成稿、対象13ファイルの `git diff`、カード単体での用語・公式・式展開・追加文の役割
- 本文編集: なし

## 結論

13ファイルすべてに変更が適用され、589枚すべてに `## 使用公式・定理` と `## 答え` が存在する。しかし、現状は教育的な説明改善として未完了である。特に、(1) 解答固有の代入式・数値解を「使用公式・定理」へ先出しする、(2) 「まず上の公式で各記号を対応させ…」というカード固有の情報を持たない定型文を大量挿入する、(3) 文脈を区別しない用語辞書により誤定義を追加する、という横断的問題がある。

機械検証は成功しているが、以下は構文検証では検出できない教育上・意味上の問題である。

## 変更構造の横断確認

| ファイル | カード数 | 記号・用語あり | 使用公式・定理あり | 定型文あり | 「解答で用いる式」あり |
|---|---:|---:|---:|---:|---:|
| 31_asymptotic_estimation.md | 45 | 38 | 45 | 35 | 2 |
| 32_interval_estimation.md | 34 | 9 | 34 | 26 | 0 |
| 33_mathstat_selected_problems.md | 15 | 6 | 15 | 7 | 0 |
| 34_testing_foundations_derivation.md | 53 | 37 | 53 | 40 | 41 |
| 35_normal_various_tests.md | 51 | 15 | 51 | 41 | 36 |
| 36_anova_regression.md | 74 | 35 | 74 | 63 | 59 |
| 37_contingency_nonparametric.md | 51 | 26 | 51 | 40 | 45 |
| 38_incomplete_data.md | 25 | 23 | 25 | 20 | 19 |
| 39_simulation.md | 37 | 26 | 37 | 28 | 24 |
| 40_bayesian_methods.md | 45 | 34 | 45 | 33 | 39 |
| 41_research_sampling.md | 42 | 27 | 42 | 30 | 30 |
| 42_experimental_design.md | 44 | 12 | 44 | 26 | 24 |
| 43_regression_multivariate.md | 73 | 42 | 73 | 61 | 53 |
| 合計 | 589 | 330 | 589 | 450 | 372 |

ここで「定型文」は `まず上の公式で各記号を対応させ、問題の値を代入して順に計算する。` または `上の定義・仮定から、必要な式を順に組み立てる。` を指す。「解答で用いる式」は存在だけでは欠陥ではないが、下記のように解答固有の代入済み式や結論を置いたカードが多数ある。

## 初回指摘

### fatal

なし。

### major

1. **全13ファイル／横断：公式・定理と解答の境界が崩れ、解答の先出しが大量に生じている。**
   - カードID例: `asym-delta-normal-standard-deviation`, `test-null-alternative-definition`, `test-normal-z-one-sided-numeric`, `anova-oneway-ss-numeric`, `cat-log-odds-ratio-ci`, `inc-ipw-mean`, `sim-importance-numeric`, `bayes-normal-normal-numeric`, `sampling-neyman-numeric`, `design-fraction-generator`, `glm-probit-probability`。
   - 具体例: `test-normal-z-one-sided-numeric` の公式欄には一般式でなく、すでに `Z=(11.2-10)/(3/\sqrt{36})=2.4` という問題固有の答えがある。`design-fraction-generator` では公式欄に `C=(+,-,-,+)`、`glm-probit-probability` では `P(Y=1\mid x=0.5)=0.5` を置き、解答欄でそのまま反復する。
   - 影響: 学習者は「一般に再生すべき公式」と「今回だけの代入・計算結果」を識別できない。数値解を導く練習にもならず、同じ式の重複でカードが冗長になる。
   - 修正案: 公式欄には一般式・適用条件・記号対応だけを置く。解答欄を `一般式 → 問題値の対応 → 代入 → 算術 → 結論` の順にする。公式欄の代入済み数値、今回の符号列、今回の棄却結論は削除する。

2. **全13ファイル／横断：450枚の定型文が式展開を説明せず、機械的な増量になっている。**
   - カードID例: `asym-mle-poisson-tail-probability`, `ci-variance-chi-calc`, `mathstat-uniform-endpoint-shortest-ci`, `test-power-normal-one-sided`, `test-welch-two-sample-numeric`, `reg-partial-f-numeric`, `np-friedman-numeric`, `surv-logrank-numeric`, `sim-mh-numeric`, `bayes-normal-normal-numeric`, `sampling-neyman-numeric`, `design-rcbd-anova-numeric`, `glm-irls-update`。
   - 影響: 「各記号を対応させる」「順に組み立てる」と宣言するだけで、実際に何を何へ対応させるか、どの等式をどの順で使うかを示していない。ユーザーが問題視した式展開の飛躍を解消しない。
   - 修正案: 定型文を一律削除し、必要なカードだけ固有の一手へ置換する。例: `標本分散のピボットを両側確率で挟む → 不等号を正数で割る → \sigma^2 について解く`、`群平均を求める → 群間平方和 → 群内平方和 → 加法分解で全平方和` のように操作を明記する。

3. **`sim-mh-algorithm`, `sim-mh-numeric`, `sim-random-walk-mh`, `sim-mcmc-convergence-conditions`：MHをMantel–Haenszel法と誤定義している。**
   - severity: major
   - 問題: これらはMetropolis–Hastings法のカードであるのに、追加された用語欄が `MH：Mantel–Haenszel法` となっている。カテゴリ表のMHとMCMCのMHを文脈で区別できていない。
   - 影響: アルゴリズム名を誤学習させる明白な内容誤り。
   - 修正案: 4枚では `MH：Metropolis–Hastings法` とする。Mantel–Haenszelを扱うカードでのみ `MH：Mantel–Haenszel法` を用いる。

4. **`sampling-neyman-allocation`, `sampling-neyman-numeric`：添字 $\ell$ を対数尤度と誤定義している。**
   - severity: major
   - 問題: Neyman配分の `\sum_\ell N_\ell S_\ell` における $\ell$ は層を走る添字であるが、用語欄は `$\ell$：対数尤度` とする。
   - 影響: 分母の総和が何を足しているか理解できず、公式の意味を逆に不明瞭にする。
   - 修正案: `$h,\ell$：層を表す添字`、`$N_h$：第h層の母集団サイズ`、`$S_h$：第h層の母標準偏差` と定義する。

5. **`design-block-confounding`, `design-alias-structure`：実験計画の「交絡」に因果交絡の定義を流用している。**
   - severity: major
   - 問題: 追加文は「処置・曝露と結果の双方に関係する第三要因」と定義するが、この2枚で問う交絡は、計画行列上で効果列が一致して効果を分離推定できないことを指す。
   - 影響: 同じ日本語でも異なる概念を混同し、alias構造やブロック交絡の理解を妨げる。
   - 修正案: `実験計画での交絡：2つ以上の効果が同一の符号列を持ち、観測データから個別に分離推定できないこと` と文脈別に定義する。`design-randomization-purpose` の因果交絡定義とは分ける。

6. **`glm-tobit-likelihood-parts`：Tobitの打ち切りを事象時刻専用の定義で説明している。**
   - severity: major
   - 問題: `打ち切り：事象時刻そのものではなく…` は生存時間解析用の説明であり、潜在応答 $Y^*$ を0で観測するTobitの打ち切りを説明していない。また式で使う標準正規密度 $\phi$ は未定義のまま、$\Phi$ だけを定義している。
   - 影響: モデル設定と用語説明が食い違い、密度寄与と累積確率寄与の区別を理解しにくい。
   - 修正案: `打ち切り：潜在値が閾値以下であることだけが分かり、観測値を閾値として記録する仕組み` とする。`$\phi$：標準正規密度、$\Phi$：標準正規累積分布関数` を併記する。

7. **計算カードの複数箇所で、必要な一般公式・記号が欠け、代入後の式から始まっている。**
   - severity: major
   - `ci-variance-chi-calc`: カイ二乗分位点の上側・下側規約と一般の区間公式を示さず、公式欄が `135/27.488` から始まる。`\chi^2_{15,0.025}=27.488` は採用している上側確率規約を明記しないと一般的な下側分位点表記と逆に読める。
   - `cat-log-odds-ratio-ci`: `\widehat{OR}=ad/(bc)` と一般の区間 `\exp\{\log\widehat{OR}\pm z_{\alpha/2}SE\}` を示さず、突然 `\widehat{OR}=6` になる。
   - `inc-ipw-mean`: 公式で $R_i,X_i,\pi_i$ を使うが、観測指標、共変量、観測確率として定義していない。
   - `bayes-normal-normal-numeric`: 「精度加算公式」と名称だけを置き、一般の事後精度・事後平均式を示さないまま `1/4+9/9` へ飛ぶ。
   - `design-rcbd-anova-numeric`: $df,SS,MS$ を定義せず、公式欄にも $MS=SS/df$ と $F=MS_A/MS_E$ がない。
   - `glm-irls-update`: Fisher scoringを重み付き最小二乗として表すと宣言するだけで、作業応答と重みがスコア方程式からどう現れるかを示していない。
   - 修正案: 各カードで記号をその文脈に即して定義し、一般式を先に置いたうえで、解答を代入順に展開する。難度4の導出カードでは少なくとも開始式と変形根拠を1段入れる。

8. **`mathstat-uniform-endpoint-shortest-ci`：最短性の導出が答えの後の「計算例」へ置かれている。**
   - severity: major
   - 問題: 答え欄は区間を箱で提示するだけで、なぜ最短かを示す $b^n-a^n=1-\gamma$ と区間長最小化は後続の計算例にある。
   - 影響: 答えだけ読むと結論の出所を追えず、「計算例」が実質的な証明になっている。
   - 修正案: ピボットの確率条件 → $\theta$ について解く → 区間長を最小化 → $b=1,a=\gamma^{1/n}$ → 結論、を答え欄へ移す。数値代入だけを計算例へ残す。

### minor

1. **`sampling-effective-sample-size`：無関係なMCMC用語を用語欄へ追加している。**
   - severity: minor
   - 問題: 調査抽出の設計効果による有効標本サイズを問うカードで、`MCMC：マルコフ連鎖モンテカルロ法` が用語欄に入る。注意欄の比較のためではあるが、中心論点の記号ではない。
   - 修正案: 用語欄から外し、注意欄で「MCMCにも同名の別概念がある」と日本語で比較する。

2. **`test-null-alternative-definition`：問題・公式で使わない「検出力」を用語欄へ追加している。**
   - severity: minor
   - 問題: カードの中心は帰無仮説・対立仮説と母数空間であり、検出力は末尾の補助例にしか現れない。
   - 修正案: このカードでは `\Theta,\Theta_0,\Theta_1` を定義し、検出力は専用カードへ委ねるか計算例内で短く説明する。

3. **記号・用語欄の有無が内容の難しさと対応していない。**
   - severity: minor
   - 例: `asym-convergence-almost-sure`, `ci-pivot-definition`, `test-welch-two-sample-formula`, `anova-twoway-f-tests`, `np-kruskal-wallis-formula`, `sim-importance-sampling`, `design-two-level-coding`, `mv-hotelling-one-sample` は専門記号・略語を扱うが用語欄がない一方、単純な `Var` や `Cov` の定義は多数のカードへ反復される。
   - 修正案: 一律の単語検出でなく、カード単体で初見の学習者が式を読めるかを基準にする。分布記号、分位点規約、略語、添字、行列・ベクトルの役割を優先し、既に問題文で自然に定義された基本記号は重複させない。

4. **`sim-importance-numeric`：$f,g,h$ の役割が明示されていない。**
   - severity: minor
   - 問題: 問題文は提案分布gと書くが、$f$ が目標密度、$h$ が期待値を取りたい関数であることをカード内に明示しない。
   - 修正案: 公式の直前に `f：目標密度、g：提案密度、h：積分したい関数` と置き、$E_f[h(X)]$ から重点サンプリング式へ書き換える1行を示す。

## 13ファイル別の適用確認と代表的な修正対象

- 31: 全45枚に公式欄あり。`asym-mle-poisson-tail-probability` では $I_1$ と `\dot\sim` の意味を明示し、一般式から標準化までつなぐ必要がある。
- 32: 全34枚に公式欄あり。`ci-variance-chi-calc` の分位点規約と一般区間式が不足する。
- 33: 全15枚に公式欄あり。`mathstat-uniform-endpoint-shortest-ci` は最短性導出を答え欄へ移す必要がある。
- 34: 全53枚に公式欄あり。41枚で「解答で用いる式」を置き、定義そのものを答え前に提示するカードが多い。`test-null-alternative-definition` が代表例。
- 35: 全51枚に公式欄あり。`test-normal-z-one-sided-numeric` では一般のZ統計量でなく代入済みの答えを先出しする。
- 36: 全74枚に公式欄あり。`anova-oneway-ss-numeric` は群間・群内平方和の一般式を置かず、数値16を先出しする。
- 37: 全51枚に公式欄あり。`cat-log-odds-ratio-ci` はOR推定式・区間式の開始点が不足する。
- 38: 全25枚に公式欄あり。`inc-ipw-mean` は $R_i,X_i,\pi_i$ の定義不足がある。
- 39: 全37枚に公式欄あり。Metropolis–HastingsのMH誤定義は必ず修正が必要。
- 40: 全45枚に公式欄あり。`bayes-normal-normal-numeric` は精度加算の一般式を明示する必要がある。
- 41: 全42枚に公式欄あり。Neyman配分2枚の $\ell$ 誤定義がある。
- 42: 全44枚に公式欄あり。実験計画上の交絡を因果交絡と分ける必要がある。
- 43: 全73枚に公式欄あり。`glm-tobit-likelihood-parts` の打ち切り定義と $\phi$、`glm-irls-update` の導出開始点を補う必要がある。

## 機械検証

- `npm run anki:validate`: 成功。1055 cards、0 warnings、19 category pages、最大200枚。
- `npm run validate`: 成功。構造検証、351 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を完了。
- 上記major/minorは、構文・KaTeX・メタデータ検証では判定できない意味・教育設計上の問題である。

## 初回集計

- fatal: 0
- major: 8
- minor: 4
- fatal: 0 / major: 8 / minor: 4

## 修正確認

- final_reviewer_id: global_explanation_pedagogy_review
- final_reviewed_at: 2026-08-22T00:30:00+09:00
- 再査読範囲: 初回指摘箇所だけでなく、対象13ファイルの全589枚と `anki/scripts/improve_card_explanations.mjs`

### 初回major 1・2の確認：公式欄と解答欄の分離、定型文の撤回

- 全589枚について `問題 → 記号・用語（必要な場合） → 使用公式・定理 → 一手／方針（既存時） → 答え → 計算例 → 注意` の相対順序を機械的に検査し、順序違反は0枚だった。
- 全589枚の公式欄に `この欄の役割：解答で使う定義・公式・定理と、その適用条件` が明示されている。
- 初回に450枚あった `まず上の公式で各記号を対応させ…`／`上の定義・仮定から…` の定型文は0枚になった。
- 初回に372枚あった `解答で用いる式` ラベルは0枚になり、問題固有の代入済み式・数値解を公式欄へ機械コピーする処理は撤回された。
- 変更前から存在した `一手`／`方針` は55件、現在稿も55件である。特に `mathstat-uniform-endpoint-shortest-ci` では、一手を保ったまま、ピボットの確率条件、区間への反転、区間長の微分、端点選択、結論の順で最短性を追える。
- したがって初回major 1・2は解消した。

### 初回major 3〜6の確認：文脈依存語の修正

- `sim-mh-algorithm`, `sim-mh-numeric`, `sim-random-walk-mh` は `MH：Metropolis–Hastings法` となった。MCMC収束条件カードから無関係なMH定義も除かれた。一方、`cat-mantel-haenszel-or`, `cat-mantel-haenszel-numeric` は `MH：Mantel–Haenszel法` であり、分野別に正しく区別される。
- `sampling-neyman-allocation`, `sampling-neyman-numeric` は `$h,\ell$：層を表す添字` とし、$N_h,S_h,n_h$ の役割もカード内で定義する。対数尤度との誤対応はない。
- `design-block-confounding` は、実験計画上の交絡を「複数の効果が同じコントラストに対応して分離できない状態」と定義する。`design-alias-structure` も同じ符号列が分離不能であることを公式欄で説明する。無作為化・因果比較の交絡とは文脈上区別されている。
- `glm-tobit-likelihood-parts` は潜在値と観測限界による打ち切りを定義し、標準正規分布の確率密度関数 $\phi$ と累積分布関数 $\Phi$ を両方定義する。
- したがって初回major 3〜6は解消した。

### 初回major 7・8の確認：一般式・記号・導出開始点

- `ci-variance-chi-calc` は、ピボット、上側分位点の規約、一般の母分散区間を公式欄に置き、答えで自由度・分子・分位点を順に代入する。
- `cat-log-odds-ratio-ci` は、$\widehat{OR}=ad/(bc)$、対数標準誤差、指数変換した一般区間を先に示し、数値計算と分離する。
- `inc-ipw-mean` は $R_i,X_i,\pi_i$ を定義し、条件付き期待値が $Y_i$ へ戻る式からHorvitz–Thompson型平均を導く。
- `bayes-normal-normal-numeric` は、事前・データ・事後の分布設定と一般の精度・事後平均公式を先に示す。
- `design-rcbd-anova-numeric` は $df_A,df_E$、$MS=SS/df$、$F_A=MS_A/MS_E$、帰無分布を公式欄へ置き、答えで自由度、平均平方、比の順に計算する。
- `glm-irls-update` はスコア、フィッシャー情報、Fisher scoringを開始点に置き、それを作業応答と重み行列による重み付き最小二乗へ書き換える位置づけを明示する。
- `mathstat-uniform-endpoint-shortest-ci` は、初回に「計算例」へ退避していた最短性の導出を答え欄へ戻した。
- したがって初回major 7・8は解消した。

### 初回minorの確認

- `sampling-effective-sample-size` の用語欄はDEFFとSRSだけになり、MCMCは別概念との注意に限られる。
- `test-null-alternative-definition` は $\Theta_0,\Theta_1$ を定義し、中心論点でない検出力を用語欄から除いた。
- `sim-importance-numeric` は $f$ を目標密度、$g$ を提案密度、$h$ を期待値の対象関数として定義し、測度変換の積分式から推定式へつなぐ。
- `記号・用語` 欄は330枚から272枚へ減り、単純な文字検出による無関係な定義を削除した。一方、欄がないカードでも、問題文または公式欄でそのカード固有の記号を導入していることを全体確認した。用語欄の枚数自体を目的化していない。
- したがって初回minor 1〜4は解消した。

### スクリプト確認

- `anki/scripts/improve_card_explanations.mjs` の対象はファイル番号31〜43に限定されている。
- 節順は明示した優先配列で整列し、既存の `一手` と `方針` を保持する。
- 公式欄には役割文だけを付加し、答え本文から式を抽出・分類・複製する処理はない。
- MHはMetropolis／MCMCの文脈とMantel–Haenszelの文脈を分け、交絡も要因計画・ブロック・aliasの文脈を分ける。$\ell$ はカード内に尤度がある場合だけ対数尤度として扱う。
- 既存の `記号・用語` 欄を自動上書きしないため、個別に補強した定義を保持する。

### 全体再査読

- 13ファイルすべてに変更が適用され、カード数は589枚のまま維持されている。
- 各カードは単独で、問題、必要な記号・用語、一般の定義・公式・定理、必要に応じた一手、代入・計算・結論を順に読める。
- 公式欄は解答の先出しではなく、解答で利用する一般則と適用条件を識別する役割になった。定義カードでも「何を再生するか」と答えの具体化が区別されている。
- 計算カードでは、一般式から問題固有値への代入開始点が明確になり、初回の代表例で確認された式展開の飛躍は解消している。
- 追加文はカード固有の説明または用語定義として機能し、初回のような大量の無内容な方針文、数値解の重複、文脈を誤った用語定義は残っていない。

## 再査読時の機械検証

- `npm run anki:validate`: 成功。1055 cards、0 warnings、19 category pages、最大200枚。
- `npm run validate`: 成功。構造検証、353 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を完了。

## 最終件数

- fatal: 0
- major: 0
- minor: 0
- fatal: 0 / major: 0 / minor: 0
