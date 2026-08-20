# C17-simulation 独立数理査読

- initial_reviewer_id: c17_math_review
- initial_reviewed_at: 2026-08-21T02:10:40+09:00
- 対象: `anki/cards/39_simulation.md` 全36枚、`anki/formulae.md`、`anki/syllabus/coverage.yaml`

## 初回指摘

### major 1: 不等サイズfoldで交差検証誤差を誤る公式が残っている

- 場所: `anki/formulae.md`「モデル評価・正則化」の交差検証
- 関連カード: `cv-kfold-estimator`
- 根拠: 公式集は
  $$
  \frac1k\sum_{j=1}^k\frac1{|I_j|}\sum_{i\in I_j}L_i
  $$
  としており、fold平均を等重みで平均している。この式が全観測の平均損失
  $$
  \frac1n\sum_{j=1}^k\sum_{i\in I_j}L_i
  $$
  と一致するのは、全foldが同じ大きさの場合に限る。たとえば $|I_1|=1,|I_2|=3$、fold内損失がそれぞれ $0$ とすべて $2$ なら、前者は $1$、後者は $6/4=1.5$ となる。
- 修正案: `cv-kfold-estimator` と同じく全損失を $n$ で割る式へ統一する。fold平均を使うなら $|I_j|/n$ で重み付けする。

### minor 1: 二変量正規Gibbs公式の非退化条件が明示されていない

- 場所: `anki/cards/39_simulation.md` `sim-gibbs-bivariate-normal`
- 根拠: 共分散行列
  $$
  \begin{pmatrix}1&\rho\\\rho&1\end{pmatrix}
  $$
  が正定値で通常の二変量正規密度を持つには $1-\rho^2>0$、すなわち $|\rho|<1$ が必要である。$\rho=\pm1$ では条件付き分散が0となり、記載された通常のGibbs生成公式の前提から外れる。
- 修正案: 問題文または使用公式に $|\rho|<1$ を明記する。

### minor 2: ESSとMCSE公式の成立条件が不足している

- 場所: `anki/cards/39_simulation.md` `sim-ess-mcse`
- 根拠: 定常性だけではMCMC中心極限定理や
  $$
  \tau_{\mathrm{int}}=1+2\sum_{k\ge1}\rho_k
  $$
  の有限性は保証されない。MCSE公式には、対象関数の有限分散に加え、MCMC中心極限定理が成立し、自己相関和が収束して $0<\tau_{\mathrm{int}}<\infty$ となる条件が要る。
- 修正案: 使用公式・定理または注意に、有限分散、MCMC中心極限定理、自己相関和の収束を明記する。

## 独立再計算結果

- 逆関数法: 指数分布の例は $-\log(0.2)/2=0.804718\ldots$ で正しい。
- 棄却法: 受理確率 $1/M$、平均試行回数 $M$ を積分から確認した。
- Box--Muller法: 指定値では $R=1,\Theta=\pi/2$ となり $(Z_1,Z_2)=(0,1)$ で正しい。
- Monte Carlo: 標準誤差、近似区間、対照変量、制御変量、層化、重点サンプリングの分散・期待値・数値例を再計算し、上記指摘以外は正しい。
- MCMC: 定常方程式、詳細釣合い、Metropolis--Hastings受理率、Gibbs条件付き分布、ESS数値例を再計算し、上記条件不足以外は正しい。
- Bootstrap/Jackknife: バイアス、補正値、percentile/basic区間、Jackknife標準誤差とバイアスを再計算し、数値は正しい。
- 置換検定/CV: 正確P値、再配置条件、C17カード側のCV式と数値例は正しい。
- `anki/syllabus/coverage.yaml`: 36枚と既存2枚の登録、および4用語への対応に数理的な不整合はない。

## 機械検証

- `npm run anki:validate`: 実行完了。カード数850、warnings 0。C17の36枚が全件同一priorityであるというerrors 1件あり（試験適合性・優先度査定の領域）。
- `npm run validate`: 成功。構造検証成功、332 MarkdownファイルのKaTeX strict検証成功、237生成対象テキストの検証成功。

## 初回件数

fatal: 0 / major: 1 / minor: 2

## 修正確認

- major 1: 解消。`anki/formulae.md` のモデル評価節を
  $$
  \operatorname{CV}_{(k)}=\frac1n\sum_{j=1}^k\sum_{i\in I_j}
  L\{Y_i,\widehat f^{(-j)}(X_i)\}
  $$
  へ統一したことを確認した。不等サイズfoldでも各観測を等重みで1回ずつ数えるため正しい。
- minor 1: 解消。`sim-gibbs-bivariate-normal` の問題文に $|\rho|<1$ が明記され、条件付き分散 $1-\rho^2>0$ が保証された。
- minor 2: 解消。`sim-ess-mcse` に有限分散、MCMC中心極限定理、$\sum_{k\ge1}|\rho_k|<\infty$ が明記された。これにより長期分散とESS公式の使用条件をカード内で再生できる。
- 追加カード `sim-mcmc-convergence-conditions`: 有限状態における既約性・非周期性の定義と、一意な定常分布への収束という結論は正しい。既約な有限連鎖では1状態の自己遷移 $P_{ii}>0$ が非周期性を導くという例も正しい。
- 追加後の全37枚について初回確認済み36枚を含めて再確認し、新たな数理上の指摘はない。

## 最終機械検証

- `npm run anki:validate`: 成功。851カード、warnings 0。13カテゴリー頁を生成・照合し、各頁最大200枚。
- `npm run validate`: 成功。構造検証成功、334 MarkdownファイルのKaTeX strict検証成功、237生成対象テキストの検証成功。

- final_reviewer_id: c17_math_review
- final_reviewed_at: 2026-08-21T02:14:21+09:00

fatal: 0 / major: 0 / minor: 0
