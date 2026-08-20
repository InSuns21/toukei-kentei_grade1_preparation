# C17-simulation 試験適合性査読

- initial_reviewer_id: c17_exam_review
- initial_reviewed_at: 2026-08-21T02:10:34+09:00
- review_scope: anki/cards/39_simulation.md の新規36枚、既存関連カード、anki/formulae.md、anki/syllabus/coverage.yaml、公式aim、title_ids 442–454

## 初回指摘

### ねらい適合性

公式のねらい「不完全データの分析について理解すると共に、コンピュータを用いたシミュレーションができる。モデル構築に役立てる。」に対し、単なる用語再生に留まらず、次の到達行動を確認できる構成である。

- 乱数：`sim-inverse-transform-continuous`、`sim-inverse-transform-exponential-numeric`、`sim-inverse-transform-discrete`、`sim-accept-reject`、`sim-box-muller` により、生成式の導出、数値生成、受理率の計算ができる。
- モンテカルロシミュレーション：`sim-mc-standard-error`、`sim-mc-ci-numeric`、`sim-antithetic-variates`、`sim-control-variate`、`sim-importance-numeric` により、誤差評価と分散減少法の選択・計算ができる。既存の `data-monte-carlo-integral` が積分近似を補完する。
- MCMC：`sim-markov-stationary`、`sim-detailed-balance`、`sim-mh-algorithm`、`sim-mh-numeric`、`sim-random-walk-mh`、`sim-gibbs-bivariate-normal`、`sim-ess-mcse` により、定常分布、受理判定、更新、調整、精度評価を一連で扱う。
- ブートストラップ：`boot-empirical-distribution` から `boot-sampling-distribution-relation` まで、再標本化原理、標準誤差、バイアス、区間、Jackknife、置換・ランダム化検定、交差検証を再生・計算・判定できる。既存の `data-bootstrap-mean` が title_id 443 の具体計算を担う。

したがって、公式用語4項目と「コンピュータを用いたシミュレーションができる」という行動目標への実質的対応は概ね十分である。

### 知識充足性

title_ids 442–454 は、442=`boot-empirical-distribution`、443=`data-bootstrap-mean`、444=`boot-bias-estimate`、445=`boot-percentile-ci`、446–447=`boot-parametric-nonparametric`、448=`jackknife-leave-one-out`・`jackknife-standard-error`、449=`jackknife-bias`、450=`perm-test-principle`・`perm-test-numeric`、451=`randomization-vs-permutation`、452=`cv-kfold-estimator`、453=`cv-loocv-kfold`、454=`boot-sampling-distribution-relation` で実質的に充足している。

公式・定義の再生だけでなく、`sim-mh-numeric`、`boot-basic-ci`、`jackknife-standard-error`、`perm-test-numeric` などに完遂した数値例があり、Ankiで必要な短い計算技能を反復できる。formulaeにはMonte Carlo、MCMC、Bootstrap、Jackknife、CVの主要式が同期され、coverageの4用語にもカードが割り当てられている。

ただし、MCMCについて「定常分布が存在するだけでは収束を保証しない」という注意はあるものの、有限状態Markov連鎖で既約性・非周期性から一意な定常分布への収束を判定するカードがない。`sim-markov-stationary` の直後に、既約・非周期を具体的な遷移行列から判定する1枚を追加すれば、MCMCが正しく使える条件判定まで閉じる。

### 過不足

- major: 新規36枚のpriorityが全てCであり、`npm run anki:validate` が「10枚以上の新規カードでpriorityが全件同一」として失敗する。sourceのtitle_ids 442–454が全件Cである事実は維持しつつ、他論点の前提となる `sim-inverse-transform-continuous`、`sim-mc-standard-error`、`sim-mh-algorithm`、`boot-empirical-distribution` などは依存度に基づきBへ引き上げ、C中心だが一様ではない査定にする必要がある。
- minor: MCMC収束条件を直接問うカードがない。既約性と非周期性を遷移図または小さな遷移行列から判定し、有限状態では一意な定常分布への収束につながることを問うカードを1枚追加する。
- 重複について、`data-bootstrap-mean` と `boot-empirical-distribution` は前者が標準誤差の具体計算、後者が再標本化分布の定義で役割が分かれ、`data-monte-carlo-integral` と `sim-mc-standard-error` も推定量構成と誤差評価で役割が分かれる。削除すべき実質重複はない。
- 36枚はtarget 35–45内であり、乱数6、Monte Carlo7、MCMC8、リサンプリング15程度の配分も、親「リサンプリング」13タイトルを全て扱いながら公式用語を補う範囲として過剰ではない。

### 優先度根拠

親一覧の title_ids 442–454 は全てCであり、Bootstrap・Jackknife・置換検定・交差検証の個別カードをCとする根拠は明確である。一方、優先度は過去問頻度だけでなく他カードへの依存度も含む。逆関数法、Monte Carlo標準誤差、MH受理率、Bootstrap経験分布は、それぞれ後続する複数の計算カードの前提なのでBが妥当である。分散減少法、ESS、basic区間、Jackknifeバイアスなど発展的・周辺的なカードはCのままでよい。

### 配信品質

カードID、category、subcategory、topic、hashtagsは検索可能な粒度で付与されている。1カード1論点、使用公式・定理、計算例、注意の区切りも一貫しており、配信上の読解を妨げる欠落は認めない。coverageとformulaeの同期も、priorityエラーを除けば機械検証上の不整合はない。

## 機械検証

- `npm run anki:validate`: 失敗。カード数850、errors 1、warnings 0。原因はC17新規カード36枚のpriority全件同一。
- `npm run validate`: 成功。構造検証、332 MarkdownのKaTeX strict検証、237生成対象テキスト検証がすべて成功。

## 初回件数

fatal: 0 / major: 1 / minor: 1

## 修正確認

- priority一様性：解消。`sim-inverse-transform-continuous`、`sim-mc-standard-error`、`sim-markov-stationary`、`sim-mh-algorithm`、`boot-empirical-distribution`、`perm-test-principle`、`cv-kfold-estimator` を、後続カードへの依存度に基づきBへ引き上げた。さらに新設の `sim-mcmc-convergence-conditions` もBとし、残る発展・周辺カードはsourceのC評価を維持した。このB/C区分は優先度定義と整合する。
- MCMC収束条件：解消。`sim-mcmc-convergence-conditions` は既約性と非周期性を定義式で再生させ、有限状態連鎖について一意な定常分布の存在と任意初期分布からの収束を結論づける。自己遷移を用いた非周期性の具体判定も含み、条件判定技能を補完した。
- 関連修正：`sim-gibbs-bivariate-normal` は $|\rho|<1$ を明示し、`sim-ess-mcse` は有限分散、MCMC中心極限定理、自己相関の絶対可算性を仮定に加えた。`cv-kfold-estimator` とformulaeの交差検証式はfoldサイズが異なる場合にも有効な観測単位平均へ統一されている。
- 最終構成は新規37枚でtarget 35–45内。公式用語4項目、title_ids 442–454、再生・計算・条件判定技能、既存カードとの差別化、formulae・coverage同期に未解消の過不足はない。

## 再査読時の機械検証

- `npm run anki:validate`: 成功。851 cards、warnings 0。配信HTMLも13カテゴリー、各ページ最大200枚でbuild/check成功。
- `npm run validate`: 成功。構造検証、334 MarkdownのKaTeX strict検証、237生成対象テキスト検証がすべて成功。

- final_reviewer_id: c17_exam_review
- final_reviewed_at: 2026-08-21T02:14:24+09:00

## 最終件数

fatal: 0 / major: 0 / minor: 0
