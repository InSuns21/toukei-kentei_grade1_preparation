# Anki pilot 独立数理査読

## 査読メタデータ

- 担当ID: `/root/anki_math_review`
- 実行日時: 2026-08-13T22:41:57+09:00
- 査読種別: 初回・敵対的独立数理査読
- 対象: `anki/cards/*.md` の静的カード31枚
- 参照規約: `AGENTS.md`、`agents/independent-math-reviewer.md`、`prompts/review-chapter.md`、`notation.md`、`style-guide.md`、`references/official-scope.md`、`pdfs/anki.md`
- 独立性: カードに書かれた式だけを出発点に全31枚を再計算した。執筆者の意図や他査読者の結論による補完はしていない。

## 総合判定

機械検証は成功したが、定理の適用条件、実数対数の定義域、用語、分布定義の自己完結性に未解消事項があるため、現稿を数理査読合格とはしない。致命的な全体破綻はない。

## 指摘一覧

### major

#### M-01 `est-delta-log`: $\log\widehat\theta$ が確率変数として定義される条件がない

- 場所: `anki/cards/03_estimation.md`、`est-delta-log` の「問題」「計算例」
- 根拠: $\theta>0$ と $\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,\sigma^2)$ からは $P(\widehat\theta>0)\to1$ は従うが、各 $n$ で $\widehat\theta\le0$ となる可能性までは排除できない。その場合、実数値の $\log\widehat\theta$ は定義されない。
- 独立計算: $g(x)=\log x$ は $\theta>0$ の近傍で微分可能で $g'(\theta)=1/\theta$ だから、変換自体が定義されるなら
  $$
  \sqrt n\{g(\widehat\theta)-g(\theta)\}
  \xrightarrow{d}N\left(0,\frac{\sigma^2}{\theta^2}\right)
  $$
  は正しい。
- 修正案: 「$P(\widehat\theta>0)=1$（少なくとも十分大きい $n$ で）を仮定する」または正値推定量であることを問題に明記する。あわせて $0<\sigma^2<\infty$ を明記する。

#### M-02 `test-sign-test`: 二項帰着に必要な独立同分布性がない

- 場所: `anki/cards/04_testing.md`、`test-sign-test` の「問題」「答え」
- 根拠: 各観測の符号が周辺的に確率 $1/2$ でも、符号同士が独立でなければ個数 $S$ は二項分布にならない。「$n=10$ 個の観測」だけでは独立同分布標本を意味しない。
- 独立計算: $X_1,\ldots,X_{10}$ が独立同分布で、連続な共通分布の中央値が $m_0$ なら $P(X_i>m_0)=1/2$ かつ同値確率は0なので、$I_i=\boldsymbol 1_{\{X_i>m_0\}}$ は独立な $\operatorname{Bernoulli}(1/2)$、したがって $S=\sum I_i\sim\operatorname{Binomial}(10,1/2)$ となる。
- 修正案: 問題を「連続な共通分布からの独立同分布標本」とする。同値を許す一般形を扱うなら、同値除外後の有効標本数を条件付きで固定することも明記する。

#### M-03 `test-chi-square-fit`: 自由度を $k-1-r$ とできる推定法・正則性条件が不足

- 場所: `anki/cards/04_testing.md`、`test-chi-square-fit` 全体
- 根拠: 「母数を標本から1個推定した」だけではPearson統計量が自由度 $k-1-r$ のカイ二乗分布へ収束するとは限らない。帰無モデルの識別可能性、内部点、正の区分確率、適切な最尤法または最小カイ二乗法による推定、各期待度数が標本サイズとともに増えることなどが必要である。
- 独立計算: 正則な $r=1$ 次元モデルを5区分へ当てはめる場合に限れば、確率和の制約で1、推定母数で1を失い、$5-1-1=3$ は正しい。
- 修正案: 問題に上記の正則な推定設定を短く明記し、「標本から任意の方法で1個推定」ではないことを示す。

#### M-04 `multi-covariance-psd`: タイトルが「正定値性」で、本文の半正定値性と矛盾

- 場所: `anki/cards/06_multivariate.md`、`multi-covariance-psd` のタイトル
- 根拠: 共分散行列について常に保証されるのは半正定値性であり、正定値性ではない。カード自身の例 $\begin{pmatrix}1&1\\1&1\end{pmatrix}$ は固有値 $2,0$ を持ち、正定値でない。
- 独立計算: 任意の $\boldsymbol a$ に対して $\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)\ge0$。例では $\boldsymbol a=(1,-1)^{\mathsf T}$ に対する二次形式が0である。
- 修正案: タイトルを「共分散行列の半正定値性を二次形式で確認する」に直す。正定値となる追加条件を扱うなら別論点にする。

#### M-05 `model-gauss-markov`: BLUE性の条件が十分に列挙されていない

- 場所: `anki/cards/08_models.md`、`model-gauss-markov` の「答え」
- 根拠: 現稿は $\boldsymbol X$ が固定された計画行列であること、または条件付きで $E[\boldsymbol\varepsilon\mid\boldsymbol X]=\boldsymbol0$、$\operatorname{Cov}(\boldsymbol\varepsilon\mid\boldsymbol X)=\sigma^2\boldsymbol I_n$ とすることを述べていない。ランダムな $\boldsymbol X$ と誤差が相関し得る読みでは、表示された条件だけでOLSの不偏性は出ない。$\sigma^2>0$ と次元も欠ける。
- 独立計算: 固定された $\boldsymbol X\in\mathbb R^{n\times p}$ が列フルランクで、$\boldsymbol\beta\in\mathbb R^p$、$E[\boldsymbol\varepsilon]=\boldsymbol0$ なら
  $$
  E[\widehat{\boldsymbol\beta}]
  =(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol X\boldsymbol\beta
  =\boldsymbol\beta.
  $$
  さらに球状共分散の下でGauss--Markovの比較が成立する。
- 修正案: 固定計画版か条件付き版かを明示し、$n\times p$、$n\ge p$、列フルランク、$\sigma^2>0$ を併記する。

#### M-06 `data-bootstrap-mean`: 数値例が標準誤差の算出まで完遂されていない

- 場所: `anki/cards/05_data_analysis.md`、`data-bootstrap-mean` の「計算例」
- 根拠: 3個の再標本平均を列挙した後、一般式へ戻っており、その具体例で最後の本質的操作である標準偏差計算を実行していない。`pdfs/anki.md` の「1カード1論点。ただし具体例で最後まで一度動かす」に反する。
- 独立計算: 列挙された平均は $(5/3,8/3,5/3)$、その平均は2なので、これら3反復だけを例として使うなら
  $$
  \widehat{\mathrm{se}}_{\mathrm{boot}}
  =\sqrt{\frac{(-1/3)^2+(2/3)^2+(-1/3)^2}{3-1}}
  =\sqrt{\frac13}.
  $$
- 修正案: 上の数値計算を最後まで載せ、この値は説明用の $B=3$ による不安定なMonte Carlo近似であり、実用上は十分大きい $B$ を使うと明記する。

#### M-07 複数カード: 名前付き分布の台・母数・確率関数がカード内で自己完結していない

- 場所: 少なくとも `dist-clt-standardize`、`est-factorization`、`est-bernoulli-mle`、`test-normal-ci`、`test-np-bernoulli`、`test-sign-test`、`multi-linear-combination`、`process-poisson-wait`
- 根拠: `AGENTS.md`、`notation.md`、`style-guide.md` は、名前付き分布を定理・問題で使う際に、台・母数範囲・確率質量関数または密度を同じ節または問題冒頭へ置くよう求める。静的カードは単独表示されるが、上記カードには必要な定義が揃っていない。例えば `test-np-bernoulli` は $X\sim\operatorname{Binomial}(n,p)$ の台 $\{0,\ldots,n\}$、$n\in\mathbb N$、$0\le p\le1$、確率質量関数を示していない。
- 独立確認: 各カードの数値式自体は、通常の規約（正規分布の第2引数は分散、Bernoulli/Binomialの成功確率は $p$、Poisson過程の率はrate）を外部から補えば再計算できた。しかしカード本文だけでは規約確認を完結できない。
- 修正案: 各カードの問題直前または問題内に、必要最小限の「使用する分布」行を置く。カード単独表示時にも読める形とし、別カード探索を前提にしない。

#### M-08 `est-factorization`: 台が母数に依存しないことを因子分解定理の必要条件と誤読させる

- 場所: `anki/cards/03_estimation.md`、`est-factorization` の「条件」
- 根拠: 因子分解定理は、共通の支配的な確率質量・密度表現の下で $f_\theta(x)=g_\theta(T(x))h(x)$ と分解できることを述べる。母数依存の台でも、その依存を $g_\theta(T(x))$ に取り込める場合があり、「台が母数に依存しない」は一般の必要条件ではない。例えば $U(0,\theta)$ 標本では台が $\theta$ に依存するが、標本最大値が十分統計量になる。
- 独立計算: Bernoulli標本では
  $$
  f_p(x)=p^{\sum_i x_i}(1-p)^{n-\sum_i x_i}
  \boldsymbol{1}_{\{0,1\}^n}(x)
  $$
  とし、指示関数は $p$ を含まない $h(x)$ に置けるため、$T=\sum_iX_i$ の十分性は正しい。
- 修正案: 「この例では台が $p$ に依存せず、台の指示関数を $h(x)$ に含められる」と限定する。一般の必要条件であるかのような見出し・表現を避ける。

### minor

#### m-01 `prob-bayes-diagnostic`: 事象記号 $D$ と $+$ が未定義

- 場所: `anki/cards/01_probability.md`、`prob-bayes-diagnostic` の「なぜ？」「計算例」
- 根拠: 問題文は自然言語だけで、式から突然 $D$ と $+$ が現れる。
- 修正案: 「$D=$罹患、$+=$陽性と置く」を式の直前に加える。

#### m-02 `est-bias-variance`: 二次モーメントの有限性がない

- 場所: `anki/cards/03_estimation.md`、`est-bias-variance` の「問題」
- 根拠: 分散と有限値の平均二乗誤差を通常の実数として扱うには $E[T^2]<\infty$ が必要である。
- 修正案: 「$E[T^2]<\infty$ とする」を問題に加える。

#### m-03 `test-np-bernoulli`: 尤度比式の母数範囲と離散検定の境界無作為化がない

- 場所: `anki/cards/04_testing.md`、`test-np-bernoulli` 全体
- 根拠: 表示された比には $p_0$、$1-p_1$ が分母に現れるため $0<p_0<p_1<1$ が必要である。また離散分布では所与の有意水準を厳密に使い切るため臨界点で無作為化が必要な場合がある。
- 独立計算: 隣接比 $p_1(1-p_0)/\{p_0(1-p_1)\}>1$ は上の内部母数条件で正しい。
- 修正案: 母数範囲を問題に加え、「厳密なサイズ $\alpha$ が必要なら臨界点で無作為化する場合がある」と注意へ加える。

#### m-04 `data-odds-ratio`: $a,b,c,d$ のセル配置が曖昧

- 場所: `anki/cards/05_data_analysis.md`、`data-odds-ratio` の「問題」
- 根拠: 「順に」だけでは行列のどのセルが $a,b,c,d$ か、どの行・列を基準にしたオッズかをカード単独で復元できない。
- 独立計算: 配置を $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ と仮定すれば $ad/(bc)=300/50=6$ は正しい。
- 修正案: 2×2表を実際に表示し、行・列の事象と基準カテゴリーを明記する。

#### m-05 `data-anova-decomposition`: expansionカードの具体的数値確認がない

- 場所: `anki/cards/05_data_analysis.md`、`data-anova-decomposition` の「計算例」
- 根拠: 一般式の展開と交差項消去は正しく完遂しているが、`pdfs/anki.md` が expansion カードに原則求める短い具体例になっていない。
- 独立確認: $y_{11}=1,y_{12}=3,y_{21}=2,y_{22}=4$ なら、全体平均 $2.5$、群平均 $2,3$ で、全平方和5、群間平方和1、群内平方和4となり $5=1+4$ を確認できる。
- 修正案: 上のような2群各2観測の数値例を1行で添える。

## 全31枚の独立再計算記録

| ID | 独立再計算・条件確認 | 判定 |
|---|---|---|
| `prob-inclusion-exclusion` | $0.6+0.5-0.2=0.9$。確率範囲も整合。 | pass |
| `prob-bayes-diagnostic` | 分母 $0.009+0.0495=0.0585$、比は $2/13\approx0.153846$。 | minor: m-01 |
| `prob-cdf-from-pmf` | $x<0,0\le x<1,x\ge1$ で $0,1/4,1$。右連続・端点とも正しい。 | pass |
| `dist-variance-moment` | $6-2^2=2$。 | pass |
| `dist-gamma-recognition` | $u=bx$、$dx=du/b$ により係数は $b^{-(a-1)}b^{-1}=b^{-a}$。 | pass |
| `dist-jacobian-scale` | $x=y/2$、絶対Jacobian $1/2$、$y>0$、積分1。 | pass |
| `dist-clt-standardize` | 標準誤差 $2/10=0.2$、標準化値 $(10.4-10)/0.2=2$。 | major: M-07 |
| `est-factorization` | Bernoulli尤度の指数は $T,n-T$ で十分性の結論は正しい。 | major: M-07, M-08 |
| `est-bernoulli-mle` | 成功3、失敗2。$\ell''=-3/p^2-2/(1-p)^2<0$、最大点は $3/5$。 | major: M-07 |
| `est-bias-variance` | 中心化後の交差項は0で恒等式は正しい。 | minor: m-02 |
| `est-delta-log` | 導関数 $1/\theta$ と漸近分散 $\sigma^2/\theta^2$ は正しいが定義域条件不足。 | major: M-01 |
| `test-normal-ci` | 標準誤差 $2/10=0.2$、半幅 $0.392$、区間 $(9.608,10.392)$。 | major: M-07 |
| `test-np-bernoulli` | 尤度比の隣接比は内部母数で1より大きく、上側棄却方向は正しい。 | major: M-07; minor: m-03 |
| `test-chi-square-fit` | 正則な1母数モデルなら $5-1-1=3$。一般記述のままでは条件不足。 | major: M-03 |
| `test-sign-test` | 独立同分布条件を補えば $S\sim\operatorname{Binomial}(10,1/2)$、$P(S=10)=2^{-10}$。 | major: M-02, M-07 |
| `data-ols-slope` | $\bar x=2,\bar y=8/3$、分子4、分母2、傾き2。 | pass |
| `data-anova-decomposition` | 平均を足し引きし、群内偏差和0で交差項が消える。恒等式は正しい。 | minor: m-05 |
| `data-odds-ratio` | 行列配置を通常どおり補えば $ad/(bc)=6$。 | minor: m-04 |
| `data-bootstrap-mean` | 掲載3平均による標準偏差は $\sqrt{1/3}$ だが本文はそこまで計算していない。 | major: M-06 |
| `multi-linear-combination` | 平均 $1-2=-1$、分散 $4+9-2\cdot1=11$。 | major: M-07 |
| `multi-covariance-psd` | 二次形式は分散。例の固有値は $2,0$ で半正定値、非正定値。 | major: M-04 |
| `multi-pca-eigen` | 特性多項式から固有値 $3,1$、最大方向 $(1,1)^{\mathsf T}/\sqrt2$。 | pass |
| `process-markov-two-step` | $(P^2)_{12}=0.8\cdot0.2+0.2\cdot0.7=0.30$。 | pass |
| `process-poisson-wait` | $P\{N(1)=0\}=e^{-2}$、密度 $2e^{-2t}$ は正規化される。 | major: M-07 |
| `process-ar1-stationary` | $\gamma(0)=0.25\gamma(0)+3$ より4。$|0.5|<1$ も満たす。 | pass |
| `model-gauss-markov` | 固定計画または条件付き外生性を補えば不偏性の式は正しい。 | major: M-05 |
| `model-logistic-odds` | 単位増加の対数オッズ差0.7、オッズ比 $e^{0.7}\approx2.01375$。 | pass |
| `model-contrast` | 係数和 $1-1/2-1/2=0$。分散の倍率則も正しい。 | pass |
| `eng-capability-index` | $(16-4)/(6\cdot2)=1$。$C_p$ が中心ずれを含まないとの注意も正しい。 | pass |
| `eng-series-reliability` | 独立性の下で $0.9\cdot0.8=0.72$。 | pass |
| `eng-blocking` | 日をブロックにし各日内で全4処理を無作為化する設計と加法モデルは整合。 | pass |

## 機械検証

- 実行日時: 2026-08-13T22:41:57+09:00
- コマンド: `npm run anki:validate`
- 終了コード: 0
- 結果:

  ```text
  validated 31 cards (0 warnings)
  checked 31 cards
  ```

- 判定: success。ただし、このvalidator成功は上記の意味論・定理条件・定義域・用語の指摘を解消しない。

## 初回査読件数

fatal: 0 / major: 8 / minor: 5

## 修正後再査読

### 再査読メタデータ

- 担当ID: `/root/anki_math_review`（初回と同一担当）
- 実行日時: 2026-08-13T22:52:59+09:00
- 対象: 修正後の `anki/cards/*.md` 全31枚
- 方法: 初回指摘箇所だけでなく、全カードの問題、答え、使用公式・定理、計算例、注意を再読し、全数値・数式を再計算した。

### 初回指摘の修正確認

- M-01 `est-delta-log`: **解消**。$0<\sigma^2<\infty$、$\theta>0$、$\widehat\theta$ が正値推定量であることが問題に追加され、Delta法の仮定と $g'(\theta)=1/\theta$ が明示された。
- M-02 `test-sign-test`: **個別論点は解消**。連続な共通分布からの独立同分布標本が明記され、指示関数の和から二項分布へ帰着する式も追加された。名前付き分布の自己完結性については後述のM-07が残る。
- M-03 `test-chi-square-fit`: **解消**。正則性、識別可能性、正の区分確率、期待度数の増大、内部母数の最尤推定が明記され、$5-1-1=3$ の適用条件が揃った。
- M-04 `multi-covariance-psd`: **解消**。タイトルが「半正定値性」に修正され、本文との矛盾がなくなった。例の固有値は再計算して $2,0$、二次形式は $\boldsymbol a=(1,-1)^{\mathsf T}$ で0となる。
- M-05 `model-gauss-markov`: **解消**。固定計画、$\boldsymbol X\in\mathbb R^{n\times p}$、$n\ge p$、列フルランク、$\sigma^2>0$ が明記され、不偏性の等号展開も正しい。
- M-06 `data-bootstrap-mean`: **解消**。掲載された3反復について、平均の平均2から標準誤差 $\sqrt{1/3}$ まで計算が完遂され、$B=3$ は手順確認用との限定も付いた。
- M-07 名前付き分布の自己完結性: **一部解消・残件あり**。`est-factorization`、`est-bernoulli-mle`、`test-normal-ci`、`test-np-bernoulli` は台・母数規約・確率関数の追記を確認した。一方、下記4カードは初回指摘が残る。
- M-08 `est-factorization`: **解消**。「この例では」と限定され、台の母数非依存性を因子分解定理一般の必要条件とする誤読が解消された。Bernoulli尤度の因子分解も正しい。
- m-01 `prob-bayes-diagnostic`: **解消**。$D=$罹患、$+=$陽性が定義され、$0.009/0.0585=2/13$ の展開も正しい。
- m-02 `est-bias-variance`: **解消**。$E[T^2]<\infty$ が追加された。
- m-03 `test-np-bernoulli`: **解消**。$0<p_0<p_1<1$ と臨界点での無作為化が追加され、隣接比の単調性計算も正しい。
- m-04 `data-odds-ratio`: **解消**。2×2表の配置、事象列、比較方向が明示され、$ad/(bc)=6$ を再確認した。
- m-05 `data-anova-decomposition`: **解消**。数値例で $SS_T=5$、$SS_B=1$、$SS_W=4$ が示され、独立計算でも一致した。

### 再査読で残る major

#### M-07（継続）4カードで名前付き分布の定義がなお自己完結していない

- `dist-clt-standardize`: 極限分布 $N(0,1)$ の台・確率密度がカード内にない。
- `test-sign-test`: $\operatorname{Bernoulli}(1/2)$ と $\operatorname{Binomial}(n,1/2)$ を使うが、少なくとも結論で用いる二項分布の台と確率質量関数がない。
- `multi-linear-combination`: $N_2(\boldsymbol\mu,\boldsymbol\Sigma)$ と $N(\mu,\sigma^2)$ の台・母数条件・確率密度がない。
- `process-poisson-wait`: $N(t)\sim\operatorname{Poisson}(\lambda t)$ を使うが、Poisson分布の台と確率質量関数がない。待ち時間の密度と台は追記済みである。
- 根拠: 初回M-07および `AGENTS.md`、`notation.md`、`style-guide.md` の「名前付き分布は同じ節または問題冒頭に台・母数・確率質量関数／密度を置く」という明示要件。カードは単独表示されるため、別カードや外部定義による補完では満たさない。
- 修正案: 各カードに必要な分布だけを1行で定義する。例えば符号検定なら
  $$
  P(S=s)=\binom ns2^{-n},\qquad s=0,1,\ldots,n,
  $$
  Poisson過程なら
  $$
  P\{N(t)=k\}=e^{-\lambda t}\frac{(\lambda t)^k}{k!},\qquad k=0,1,\ldots
  $$
  を置けば、そのカードで実際に使う規約が確定する。

### 再査読で新たに確認した minor

#### R-m01 `test-normal-ci`: 数値計算に使う $z_{0.975}=1.96$ が問題から脱落

- 場所: `anki/cards/04_testing.md`、`test-normal-ci` の「問題」「計算例」
- 根拠: 修正前の問題には「$z_{0.975}=1.96$ を用いて」があったが、修正後はその指定がなく、計算例で説明なく1.96を代入している。カード単独では標準正規分布表または数値計算を外部に要求する。
- 独立計算: $z_{0.975}=1.959963\ldots$ を1.96へ丸めれば、半幅は $1.96\cdot2/10=0.392$、区間 $(9.608,10.392)$ で正しい。
- 修正案: 問題へ「$z_{0.975}=1.96$ を用いる」を戻すか、計算例で「標準正規分布表から $z_{0.975}\approx1.96$」と明記する。

### 全31枚の回帰確認

- 上記M-07該当4枚とR-m01該当1枚を除く26枚は、数式、符号、定数、自由度、台、Jacobian、条件付き確率の分母、分布パラメータ、漸近分散、行列次元、1カード1論点、具体例完遂について新たな残件なし。
- 追加された「使用公式・定理」は各カードの論点と整合し、数式展開も元の答えと一致した。
- カード本文・実装は査読者側では変更していない。

### 修正後の機械検証

- 実行日時: 2026-08-13T22:52:59+09:00
- コマンド: `npm run anki:validate`
- 終了コード: 0
- 結果:

  ```text
  validated 31 cards (0 warnings)
  checked 31 cards
  ```

- 判定: success。ただしM-07とR-m01はvalidatorの検査対象外であり、機械検証成功だけでは解消しない。

### 修正後再査読の最終件数

fatal: 0 / major: 1 / minor: 1

## 公開pilot 50枚への拡張後・追加再査読

### 再査読メタデータ

- 担当ID: `/root/anki_math_review`（初回から同一担当）
- 実行日時: 2026-08-13T23:11:04+09:00
- 対象: 公開カード50枚、`anki/notation.md`、`anki/formulae.md`、生成済み `anki/dist/index.html`、`anki/dist/notation.html`、`anki/dist/formulae.html`
- 対象数の確認: Markdownには52カードあるが、`model-restricted-ls` と `eng-confounding` は `published: false` であり、validatorとHTMLが対象にする公開カードは50枚である。追加された公開カード19枚をすべて独立再計算した。
- 方法: 公開50枚について問題、答え、使用公式・定理、計算例、注意を再読し、`anki/notation.md` および `anki/formulae.md` との表記・条件・定義の一致を照合した。

### 前回残件の修正確認

- M-07: **一部のみ解消、継続**。`test-normal-ci` など一部カードには定義が追加されたが、後述のとおり既存・新規の複数カードでカード内定義がなお欠ける。
- R-m01 `test-normal-ci`: **解消**。問題に $z_{0.975}=1.96$ が復元され、半幅 $1.96\cdot2/10=0.392$ と整合する。

### major

#### R2-M01（M-07継続）名前付き分布を使うカードの自己完結性が未達

- 場所: 少なくとも次の公開カード。
  - 既存: `dist-clt-standardize`、`est-delta-log`、`test-chi-square-fit`、`test-sign-test`、`multi-linear-combination`、`process-poisson-wait`
  - 新規: `dist-order-max`、`est-cramer-rao-bernoulli`、`test-z-rejection`、`test-likelihood-ratio`、`data-bayes-beta`、`data-monte-carlo-integral`、`multi-conditional-normal`、`model-poisson-glm`
- 根拠: `anki/notation.md` は「名前付き分布を問題で使う場合は、台・母数範囲・確率質量関数または密度をカード内に示す」と明記する。また今回の査読要件も、各カード内で日本語分布名・定義・使用公式を再掲するよう求めている。
- 具体例:
  - `dist-order-max` と `data-monte-carlo-integral` は一様分布 $U(0,1)$ の密度をカード内に置いていない。
  - `est-cramer-rao-bernoulli` は「Bernoulli標本」とだけ書き、Bernoulli分布の日本語名、台、$0<p<1$、確率質量関数を再掲していない。
  - `test-z-rejection` は正規分布 $N(\mu,4)$ の台・密度・母数条件を置いていない。
  - `test-likelihood-ratio` と `test-chi-square-fit` は極限のカイ二乗分布を使うが、その日本語名、台、自由度条件、定義をカード内に置いていない。
  - `multi-conditional-normal` は2変量正規分布の平均・共分散だけを示し、台・正定値条件・密度を置いていない。
  - `model-poisson-glm` と `process-poisson-wait` はPoisson分布の台・母数条件・確率質量関数を再掲していない。
  - `data-bayes-beta` はBeta分布の台と密度は示すが $a,b>0$ がなく、同時に用いるBernoulli分布の台・確率質量関数を示していない。
- 独立確認: 外部の標準的定義または `anki/notation.md` を補えば各計算結果は正しい。しかしカード単独表示で規約を確定できないため、正本自身が要求する自己完結性を満たさない。
- 修正案: 各カードで実際に使う分布だけを、問題または「使用公式・定理」に日本語名、台、母数範囲、PMF/PDF付きで再掲する。

#### R2-M02 `anki/formulae.md` が「利用公式・定理・定義の正本」としてカード集合を包含していない

- 場所: `anki/formulae.md` と公開50カードの「使用公式・定理」
- 根拠: `anki/formulae.md` は「カード教材で利用する公式・定理・定義の正本」と宣言するが、カードで使用される公式の多数が正本に存在しない。カード側の再掲と正本との一致を双方向に検証できない。
- 正本に未収録の主なカード公式:
  - `prob-inclusion-exclusion` の包除原理
  - `prob-cdf-from-pmf` の累積分布関数の和
  - `dist-gamma-recognition` のGamma積分
  - `test-normal-ci`、`test-z-rejection` の正規平均の標準化・区間／棄却域
  - `test-sign-test` の符号数の二項分布
  - `data-odds-ratio` のオッズ比
  - `data-bootstrap-mean` のbootstrap標準誤差
  - `multi-covariance-psd` の共分散二次形式
  - `multi-pca-eigen` のRayleigh商
  - `process-poisson-wait` のPoisson過程の待ち時間
  - `model-logistic-odds`、`model-contrast`、`eng-blocking`
  - 新規のモーメント法、Beta--Bernoulli共役更新、EM負担率、Monte Carlo積分、条件付き正規平均、Markov定常分布、MA(1)自己共分散、Poisson回帰平均比、指数寿命、2因子交互作用
- 条件不足: 正本のAR(1)定常分散は、革新の平均0、分散 $\sigma_\varepsilon^2$、過去との無相関という分散漸化式に必要な条件を明記していない。カード側には条件があるが、正本側がより弱い記述になっている。
- 修正案: 正本を公開カードで使う全公式・定理の一覧へ拡張し、各カードの式・条件と一語一句または数学的に同値な形で照合可能にする。少なくとも定理条件はカードより弱くしない。

### minor

#### R2-m01 `test-sign-test`: 指示関数記法が正本と不一致

- 場所: `anki/cards/04_testing.md`、`test-sign-test` の「使用公式・定理」
- 根拠: `anki/notation.md` は $\boldsymbol{1}_A$ を正本記法とするが、カードは `\boldsymbol1_{\{X_i>m_0\}}` を使う。
- 修正案: `\boldsymbol{1}_{\{X_i>m_0\}}` に統一する。

#### R2-m02 `data-monte-carlo-integral`: 正本の一様分布の台と数値例が不一致

- 場所: `anki/cards/10_pilot_expansion.md`、`data-monte-carlo-integral`
- 根拠: `anki/notation.md` は $U(0,1)$ の台を $0<x<1$ とするが、計算例は $u=(0,1/2,1)$ と両端点を標本値に使う。正本との表記上・設定上の不一致である。
- 独立計算: 掲載値を形式的に代入した $\widehat I_3=5/12$ は正しい。
- 修正案: $0<u_i<1$ を満たす簡単な値へ変更するか、正本の台規約を端点を含む表現へ改め、教材全体で統一する。

#### R2-m03 `eng-two-factor-interaction`: 4セルの「順に」が添字配置を確定しない

- 場所: `anki/cards/10_pilot_expansion.md`、`eng-two-factor-interaction` の「問題」
- 根拠: 計算は $(\mu_{11},\mu_{12},\mu_{21},\mu_{22})=(10,14,12,20)$ を仮定しているが、「低・高のセル平均が順に」だけではAとBのどちらの水準を先に動かす順序か一意でない。
- 独立計算: 上記の配置ならA効果はB低で $12-10=2$、B高で $20-14=6$、差の差は4で正しい。
- 修正案: 2×2表または $(\mu_{11},\mu_{12},\mu_{21},\mu_{22})$ の対応を問題に明記する。

#### R2-m04 `anki/notation.md`: Pareto分布の母数条件にLaTeX表記漏れ

- 場所: `anki/notation.md` のPareto分布
- 根拠: `$x_m,alpha>0$` は `\alpha` のバックスラッシュが欠け、正本上は文字列 `alpha` になっている。現在の公開カードにはPareto分布カードがないため、今回の数値計算へは波及しない。
- 修正案: `$x_m,\alpha>0$` に直す。

### 新規公開19枚の独立再計算

| ID | 独立再計算 | 判定 |
|---|---|---|
| `dist-mgf-poisson` | $M'_X(t)=\lambda e^tM_X(t)$、$M'_X(0)=\lambda$。 | pass |
| `dist-convolution-uniform` | 共通範囲は $\max(0,z-1)<x<\min(1,z)$、密度は $z,2-z,0$、積分1。 | pass |
| `dist-order-max` | $F_M(m)=m^2$、$f_M(m)=2m$、$\int_0^12m\,dm=1$。 | major: R2-M01 |
| `est-moments-exponential` | $E[X]=1/\lambda=\overline X$ から $\widehat\lambda=1/\overline X$、数値例は $1/2$。 | pass |
| `est-fisher-bernoulli` | $-E[\ell'']=p/p^2+(1-p)/(1-p)^2=1/\{p(1-p)\}$。 | pass |
| `est-cramer-rao-bernoulli` | $I_n=n/[p(1-p)]$ より下限 $p(1-p)/n$、$\operatorname{Var}(\overline X)$ と一致。 | major: R2-M01 |
| `est-aic-choice` | AICはAが206、Bが208なのでAを選択。 | pass |
| `test-z-rejection` | 標準誤差0.2、$Z=2.5$、両側5%臨界値1.96を超える。 | major: R2-M01 |
| `test-likelihood-ratio` | $2\{-40-(-42)\}=4$、制約数1。 | major: R2-M01 |
| `data-bayes-beta` | 事前指数 $(1,2)$ に成功3、失敗2を足し $(4,4)$、事後は $\operatorname{Beta}(5,5)$。 | major: R2-M01 |
| `data-em-responsibility` | $0.12/(0.12+0.06)=2/3$。 | pass |
| `data-monte-carlo-integral` | 表示値の平均は $5/12$、真値は $1/3$。 | major: R2-M01; minor: R2-m02 |
| `multi-conditional-normal` | 共分散行列の行列式は $4\cdot9-3^2=27>0$、条件付き平均は $0+(3/9)(4-1)=1$。 | major: R2-M01 |
| `process-stationary-markov` | $0.2\pi_1=0.3\pi_2$ と和1から $(3/5,2/5)^{\mathsf T}$、代入でも不変。 | pass |
| `process-ma1-autocovariance` | $\gamma(0)=4+0.25\cdot4=5$、$\gamma(1)=0.5\cdot4=2$、$|h|>1$ で0。 | pass |
| `model-poisson-glm` | 対数平均差0.8、平均比 $e^{0.8}=2.22554\ldots\approx2.23$。 | major: R2-M01 |
| `eng-xbar-limits` | 標準誤差1、管理限界は13、10、7。 | pass |
| `eng-exponential-reliability` | $R(100)=e^{-1}\approx0.367879$、平均 $1/0.01=100$。 | pass |
| `eng-two-factor-interaction` | 想定されたセル配置なら差の差 $(20-14)-(12-10)=4$。 | minor: R2-m03 |

### 既存31枚の回帰確認

- 全31枚の数値・式を再計算した。前回までに解消済みのM-01〜M-06、M-08および旧minorは再発していない。
- R2-M01、R2-M02、R2-m01に記載した定義・正本整合性以外に、新たな数値誤り、符号誤り、自由度誤り、Jacobian誤り、行列次元誤りは認めなかった。
- 1カード1論点と、各具体例で問われた計算を最後まで行う構造は、公開50枚すべてで維持されている。

### HTML生成確認

- `anki/dist/index.html`: 公開50カードを収録し、`notation.html` と `formulae.html` へのリンクがある。
- `anki/dist/notation.html`: 生成済み。
- `anki/dist/formulae.html`: 生成済み。
- `npm run anki:validate` 内の `build_site.mjs --check` は50カードについて成功した。

### 機械検証

- 実行日時: 2026-08-13T23:11:04+09:00
- `npm run anki:validate`: success

  ```text
  validated 50 cards (0 warnings)
  checked 50 cards
  ```

- `npm run validate`: success

  ```text
  教材構造、依存関係、進捗メタデータを検証しました。
  231 個の Markdown ファイルを KaTeX strict で検証しました。
  237 個の生成対象テキストを検証しました。
  ```

- 注記: 機械検証は公開枚数、必須見出し、KaTeX等を確認するが、R2-M01〜R2-m04の意味論的整合性は検出しない。

### 公開pilot 50枚・追加再査読の最終件数

fatal: 0 / major: 2 / minor: 4

## 分布記載基準変更後・最終再査読

### 再査読メタデータ

- 担当ID: `/root/anki_math_review`（初回から同一担当）
- 実行日時: 2026-08-13T23:21:37+09:00
- 対象: 公開カード50枚、`anki/notation.md`、`anki/formulae.md`、生成HTML
- 適用した変更基準: 名前付き分布はカード内に日本語名を明記すればよく、台・母数範囲・確率質量関数／密度は `anki/notation.md` へ集約する。英語正式名や略語展開もカード内の必須要件としない。
- 方法: 変更基準でR2-M01を再判定した後、全50枚の日本語分布名、使用公式・条件、数値例、両正本との一致を再確認した。

### 前回指摘の再判定・修正確認

- R2-M01（カード内の分布定義再掲不足）: **変更基準により解消**。台・母数・PMF/PDFをカード内へ全再掲しないこと自体は指摘対象から除外した。`anki/notation.md` の表示規則も新基準へ更新され、各分布定義の正本として機能している。
- R2-M02（`formulae.md` の包含不足）: **大幅改善したが残件あり**。包除原理、CDF、Gamma積分、正規平均、符号検定、オッズ比、bootstrap、共分散二次形式、Rayleigh商、条件付き正規、待ち時間、定常分布、MA(1)、回帰、Bayes、EM、Monte Carlo、信頼性、交互作用などの追記を確認した。下記R3-M01が残る。
- R2-m01（指示関数）: **解消**。`test-sign-test` は正本どおり $\boldsymbol{1}_{\{X_i>m_0\}}$ を使う。
- R2-m02（Monte Carlo例の端点）: **未解消**。現在も $u=(0,1/2,1)$ である。
- R2-m03（2因子セル順）: **未解消**。現在も「セル平均が順に $10,14,12,20$」だけで添字配置を明示していない。
- R2-m04（Pareto分布の `\alpha`）: **解消**。`anki/notation.md` は $x_m,\alpha>0$ に修正された。

### major

#### R3-M01 `anki/formulae.md` はなお公開カードの「使用公式・定理」を完全には包含しない

- 場所: `anki/formulae.md` と公開カードの「使用公式・定理」
- 残る具体例:
  - `dist-mgf-poisson` はPoisson分布のモーメント母関数 $M_X(t)=\exp\{\lambda(e^t-1)\}$ を「使用公式・定理」に置くが、正本には一般のMGF定義しかなく、この分布固有公式がない。
  - `est-bernoulli-mle` は $\widehat p\in\operatorname*{arg\,max}L=\operatorname*{arg\,max}\ell$ を使用するが、正本に最尤推定量・対数尤度最大化の定義がない。
  - `test-normal-ci` は $\overline X\pm z_{1-\alpha/2}\sigma/\sqrt n$ を使用するが、正本は「枢軸量を反転して作る」とだけ記し、区間式自体を収録していない。
  - `eng-blocking` は識別制約 $\sum_i\tau_i=\sum_j\beta_j=0$ を含む加法モデルを再掲するが、正本の乱塊法には識別制約がない。
  - AR(1)定常分散の正本記述は、$|\phi|<1$ 以外に、革新の平均0、分散 $\sigma_\varepsilon^2$、過去との無相関という分散漸化式に必要な条件を明記していない。カード側の条件より弱い。
- 根拠: `anki/formulae.md` は「カード教材で利用する公式・定理・定義の正本」と宣言し、カードには使用項目を再掲するとしている。正本側に式または必要条件がなければ、正本と再掲の一致を検証できない。
- 修正案: 上記の式・定義・条件を正本へ追加し、カード側と数学的に同値な形にする。

#### R3-M02 日本語分布名が本文にない分布参照が残る

- `test-chi-square-fit`: `\chi^2_{k-1-r}` を使うが、本文中に「カイ二乗分布」の記載がない。
- `test-likelihood-ratio`: `\chi^2_r` を使うが、本文中に「カイ二乗分布」の記載がない。
- `process-poisson-wait`: `N(t)\sim\operatorname{Poisson}(\lambda t)` を使うが、本文では「Poisson過程」とだけ記し、「Poisson分布」と明記していない。
- 根拠: 変更後の `anki/notation.md` も「名前付き分布を問題で使う場合は、日本語名を明記する」と定める。台・母数・PMF/PDFの再掲は不要だが、日本語分布名は必要である。
- 修正案: 各使用公式の直前または直後に、それぞれ「カイ二乗分布」「Poisson分布」と明記する。

### minor

#### R3-m01 `data-monte-carlo-integral`: 一様分布の台と例示標本が不一致

- 場所: `anki/cards/10_pilot_expansion.md`、`data-monte-carlo-integral`
- 現状: `anki/notation.md` は $U(0,1)$ の台を $0<x<1$ とする一方、カードは $u=(0,1/2,1)$ を用いる。
- 独立計算: 形式的な代入結果 $5/12$ は正しい。
- 修正案: 例示値を開区間内へ移すか、正本の台規約と一貫する説明を加える。

#### R3-m02 `eng-two-factor-interaction`: セル平均の添字対応が曖昧

- 場所: `anki/cards/10_pilot_expansion.md`、`eng-two-factor-interaction`
- 現状: 「因子Aが低・高、因子Bが低・高のセル平均が順に $10,14,12,20$」では、どの順で水準を動かすかが一意でない。
- 独立計算: $(\mu_{11},\mu_{12},\mu_{21},\mu_{22})=(10,14,12,20)$ なら差の差は $(20-14)-(12-10)=4$ で正しい。
- 修正案: 2×2表またはセル添字との対応を明記する。

### 全50枚・両正本の最終回帰確認

- 公開50枚の数値・数式を再確認した。R3-M01、R3-M02、R3-m01、R3-m02を除き、独立再計算結果に新たな誤りはない。
- 変更基準に照らし、カード内で台・母数・PMF/PDFを省略して `anki/notation.md` を参照正本とする構成は許容される。
- `anki/notation.md` の分布パラメータ化はカードと整合する。正規分布の第2引数は分散、Gamma分布はshape-rate、幾何分布は初成功までの試行回数という規約に反する公開カードはない。
- 既に掲載された計算例は、問われた操作を最後まで実行している。
- 生成された `index.html`、`notation.html`、`formulae.html` の存在とリンクを確認した。
- カード本文、正本、実装は査読者側では変更していない。

### 最終機械検証

- 実行日時: 2026-08-13T23:21:37+09:00
- `npm run anki:validate`: success

  ```text
  validated 50 cards (0 warnings)
  checked 50 cards
  ```

- `npm run validate`: success

  ```text
  教材構造、依存関係、進捗メタデータを検証しました。
  231 個の Markdown ファイルを KaTeX strict で検証しました。
  237 個の生成対象テキストを検証しました。
  ```

- 注記: validatorは日本語分布名を一部パターンで検査するが、本文中の全分布参照、正本の双方向包含、セル配置の曖昧さまでは検出しない。

### 分布記載基準変更後・最終件数

fatal: 0 / major: 2 / minor: 2

## 全残件修正後・最終確認

### 確認メタデータ

- 担当ID: `/root/anki_math_review`（初回から同一担当）
- 実行日時: 2026-08-13T23:23:41+09:00
- 対象: 公開カード50枚、`anki/notation.md`、`anki/formulae.md`、生成HTML
- 方法: R3-M01、R3-M02、R3-m01、R3-m02の修正箇所を独立に確認し、全50枚と両正本に回帰がないか再確認した。

### 残件の解消確認

- R3-M01 `formulae.md` の包含不足: **解消**。
  - Poisson分布のモーメント母関数 $M_X(t)=\exp\{\lambda(e^t-1)\}$ を収録。
  - 最尤推定量の $\operatorname*{arg\,max}$ 定義を収録。
  - 母分散既知の正規平均について、信頼区間 $\overline X\pm z_{1-\alpha/2}\sigma/\sqrt n$ を収録。
  - AR(1)定常分散に、革新の平均0、分散 $\sigma_\varepsilon^2$、過去との無相関を追加。
  - 乱塊法に識別制約 $\sum_i\tau_i=\sum_j\beta_j=0$ を追加。
  - 各項目は対応カードの「使用公式・定理」と数学的に一致する。
- R3-M02 日本語分布名不足: **解消**。
  - `test-chi-square-fit` と `test-likelihood-ratio` に「カイ二乗分布」を明記。
  - `process-poisson-wait` に「Poisson分布」を明記。
- R3-m01 `data-monte-carlo-integral`: **解消**。
  - 例示標本は開区間内の $(1/4,1/2,3/4)$ へ変更された。
  - 独立再計算:
    $$
    \frac{(1/4)^2+(1/2)^2+(3/4)^2}{3}
    =\frac{1/16+4/16+9/16}{3}
    =\frac7{24}
    \approx0.292.
    $$
- R3-m02 `eng-two-factor-interaction`: **解消**。
  - $(\mu_{11},\mu_{12},\mu_{21},\mu_{22})=(10,14,12,20)$、第1添字が因子A、第2添字が因子Bと明記された。
  - 独立再計算: $(20-14)-(12-10)=6-2=4$。

### 全体回帰確認

- 公開50枚の数式、符号、定数、自由度、分布名、分布パラメータ化、定理条件、行列次元、具体例の完遂を再確認し、新たな指摘はない。
- `anki/notation.md` は、カード内では日本語分布名と論点に必要な式・条件だけを示し、台・母数・PMF/PDFを正本へ集約するという変更基準と整合する。
- `anki/formulae.md` は公開50枚の「使用公式・定理」を包含し、今回照合した対応項目に条件の欠落はない。
- `index.html`、`notation.html`、`formulae.html` の生成対象も機械検証を通過した。
- カード本文、正本、実装は査読者側では変更していない。

### 最終機械検証

- 実行日時: 2026-08-13T23:23:41+09:00
- `npm run anki:validate`: success

  ```text
  validated 50 cards (0 warnings)
  checked 50 cards
  ```

- `npm run validate`: success

  ```text
  教材構造、依存関係、進捗メタデータを検証しました。
  231 個の Markdown ファイルを KaTeX strict で検証しました。
  237 個の生成対象テキストを検証しました。
  ```

### 最終件数

fatal: 0 / major: 0 / minor: 0

---

# Anki配信アーキテクチャ変更・敵対的再査読

initial_reviewer_id: /root/anki_math_review
initial_reviewed_at: 2026-08-13T23:57:00+09:00
final_reviewer_id: /root/anki_math_review
final_reviewed_at: 2026-08-14T00:15:00+09:00

## 査読メタデータ

- 担当ID: `/root/anki_math_review`（直前までの数理査読と同一担当）
- 実行日時: 2026-08-14T00:04:32+09:00
- 対象: `anki/scripts/build_site.mjs`、`validate_cards.mjs`、`progress.mjs`、`progress.yaml`、`templates/index.html`、`templates/categories.html`、`syllabus/syllabus.yaml`、`dist/*.html` とローカル資産、`AGENTS.md`、`anki/README.md`、`anki/prompts/review-batch.md`、`package.json`
- 範囲: カード50枚の数理内容は直前の全件ゼロ判定を引き継ぎ、今回の配信・分割・進捗変更による回帰だけを査読した。

## 初回指摘

### ARCH-M01 `build_site.mjs --check` が生成済み `dist/` の陳腐化を検出しない

- 初回確認時、`--check` はメモリ内で生成したページのKaTeX文字列と枚数上限だけを検査し、生成済みHTMLとの一致を検査していなかった。
- 再現として、実装更新後の古い `dist/category-probability.html` が残った状態でも旧チェック設計では同期を保証できなかった。
- 修正案は、期待HTML全件との内容一致、期待外HTMLの不存在、生成資産の同期を `--check` で検査することとした。

## 修正確認

- ARCH-M01: **解消**。`expectedHtml` に `index.html`、`notation.html`、`formulae.html`、全カテゴリーページを列挙し、欠落・内容不一致・余剰HTMLを拒否する。`style.css` と `app.js` も正本との内容一致を検査する。
- 1ページ上限: **確認済み**。`pageSize` は整数かつ1〜200だけを受理し、`ANKI_PAGE_SIZE=201` は終了コード1で拒否した。
- 意味境界分割: **確認済み**。カテゴリー総数が上限以下ならカテゴリー1ページ、超えたときだけ `category.children` のサブカテゴリー順に分け、各サブカテゴリー内部だけを上限枚数でsliceする。上限2枚の代替試験では50枚を35ページへ分割し、最大2枚、期待した日本語サブカテゴリー単位と内部part数に一致した。
- 欠落・重複防止: **確認済み**。生成直前にflattenしたID数と一意数を公開カード数へ照合する防御が追加された。現行生成物も source 50 / rendered 50 / unique 50、missing 0 / extra 0 / duplicate 0。
- 入口とカテゴリー: **確認済み**。`dist/index.html` はカード本文0件、公式シラバス9カテゴリーへのリンク9件。生成カードページは9件で、各カードは所属カテゴリーのページに一度だけ現れる。
- 日本語サブカテゴリー: **確認済み**。全 `children` は重複せず、`syllabus.subcategories` に日本語表示名があり、ナビゲーション、カード見出し、select optionはその正本名を使う。
- 正本導線: **確認済み**。カテゴリー一覧と全カードページから `notation.html`、`formulae.html` へ到達でき、両正本ページから一覧へ戻れる。KaTeXはビルド時に埋め込まれる。
- 9インチ768px: **確認済み**。Chromiumを768×1024へ変更してカテゴリー一覧とカードページを実表示し、カードは1列で、検索・選択・答えの `details`、ナビゲーション、数式の横スクロールを利用できることを目視確認した。
- オフライン現物: **確認済み**。生成HTML/CSS/JavaScriptの `src`、`href`、CSS `url()` に外部HTTP(S) URLは0件。KaTeX CSSはnode_modulesの正本と一致し、参照woff2は期待20 / 実在20 / 欠落0。
- 継続契約: **確認済み**。`AGENTS.md` は50枚執筆、`self_review`、`independent_review`、2独立査読、`revision`、同一担当再査読、両ゼロ判定、build、両validate、進捗更新、選択コミット、コミット後確認を明記し、READMEと査読promptも200枚・意味境界・同一担当要件に同期した。
- 進捗状態機械化: **確認済み**。`progress.mjs` は別 `current_batch` の開始を拒否し、`drafting -> self_review -> independent_review -> revision` の順だけを受理して各 `<status>_at` を記録する。`complete` はrevisionだけを受理し、最新の件数判定、初回/最終担当ID一致、初回指摘・修正確認、`independent_review_at <= initial_reviewed_at < revision_at < final_reviewed_at`、50枚終端、両validateを検査する。

## Major

### ARCH-R1-M01 オフライン数式資産の完全性を `--check` が保証しない

- 場所: `anki/scripts/build_site.mjs` の `--check` 分岐（KaTeX資産確認）。
- 根拠: `style.css` と `app.js` は内容一致を検査する一方、`assets/katex.min.css` と `assets/fonts` は存在だけを検査している。したがってKaTeX CSSを改変する、fontsディレクトリを空にする、20個中1個のwoff2を欠落させる、という回帰でも `npm run anki:validate` が成功し得る。また期待HTML・CSS・JavaScriptへの外部HTTP(S)参照を拒否する検査がなく、将来テンプレートへCDN依存が入ってもオフライン要件を機械的に守れない。
- 現物確認: 現在の `dist/` はKaTeX CSS完全一致、期待woff2 20 / 実在20 / 欠落0、外部URL 0であり、今の配信物自体は正常である。指摘は、将来の「続きを書いて」で両validateを完了条件にする際の回帰防止欠落である。
- 修正案: `katex.min.css` をnode_modules正本とバイト一致させ、正本CSSが参照するwoff2集合を全件存在・内容一致で検査する。あわせて期待HTML、配信CSS、JavaScriptのURL参照を解析し、`data:`、相対パス、ページ内fragment以外のネットワークURLをerrorにする。

## Minor

なし。

## 機械検証

- `npm run anki:validate`: **success**

  ```text
  validated 50 cards (0 warnings)
  checked 50 cards in 9 category page(s), max 200 per page
  ```

- `npm run validate`: **success**

  ```text
  教材構造、依存関係、進捗メタデータを検証しました。
  232 個の Markdown ファイルを KaTeX strict で検証しました。
  237 個の生成対象テキストを検証しました。
  ```

## 今回の最終件数

fatal: 0 / major: 1 / minor: 0

## ARCH-R1-M01対応後の再確認

- 実行日時: 2026-08-14T00:08:00+09:00
- KaTeX CSS: **解消**。node_modules原本と生成資産をバイト一致で検査する。
- KaTeX woff2: **解消**。原本と生成先のファイル名集合を一致させ、各ファイルもバイト一致で検査する。現物は20 / 20、欠落・内容不一致0。
- 外部URL: **一部解消・major継続**。現物の外部resource URLは0で、`src` / `href` / CSS `url()` / `@import` / `fetch()` / 動的 `import()` の `http(s)://` は拒否する。しかし次のネットワーク参照を正規表現が見落とす。

  ```text
  import "https://cdn.example/x.js"            -> false
  <img srcset="https://cdn.example/x.png 1x"> -> false
  <script src="//cdn.example/x.js">           -> false
  ```

  特に静的importは、修正説明で検査対象とした「importのHTTP(S)」を満たさない。protocol-relative URLもブラウザーではHTTP(S)外部取得になる。`srcset` を含むresource-bearing属性、静的/動的import、`http://`、`https://`、`//host/...` を一貫して拒否する必要がある。
- 再実行した `npm run anki:validate` と `npm run validate` はともにsuccess。ただし上記3ケースがcheckを通過するため、未解消majorを0にはしない。

### 対応後の件数

fatal: 0 / major: 1 / minor: 0

## 外部参照RegExp拡張後の再確認

- 実行日時: 2026-08-14T00:12:00+09:00
- 単純な `import "https://..."`、URLが先頭の `srcset`、protocol-relativeな `src="//..."` は拒否するようになった。
- ただし、一般的な静的import/re-exportと複数候補srcsetの後続URLはなお見落とす。正規表現単体の再現結果は次のとおり。

  ```text
  import x from "https://cdn.example/x.js"                  -> false
  import {x} from "//cdn.example/x.js"                      -> false
  export {x} from "https://cdn.example/x.js"                -> false
  <img srcset="local.png 1x, https://cdn.example/x.png 2x"> -> false
  ```

- `npm run anki:validate` は50 cards / 0 warnings / 9 category pages / max 200でsuccess、`npm run validate` もsuccess。しかし上記が機械検証を通過するため、ARCH-R1-M01は未解消とする。

### RegExp拡張後の件数

fatal: 0 / major: 1 / minor: 0

## 一律ネットワークURL拒否後の最終再査読

### 修正確認

- ARCH-R1-M01: **解消**。
- `build_site.mjs --check` はKaTeX CSSを原本とバイト一致、woff2をファイル集合と各内容の双方で一致確認する。
- SVG namespace宣言 `xmlns="http://www.w3.org/2000/svg"` だけを外部取得でない識別子として除外し、その後のHTML/CSS/JavaScript全文に残る `http://`、`https://`、`//host` を構文に依存せず拒否する。
- 前回見落とした `import x from "https://..."`、`import {x} from "//..."`、`export {x} from "https://..."`、srcset第2候補の `https://...` はすべて検出true、SVG namespaceだけはfalseとなることを独立再現した。
- これにより、現物のオフライン完結だけでなく、将来の生成HTML・CSS・JavaScriptの外部ネットワーク依存回帰も `npm run anki:validate` で拒否できる。

### 最終機械検証

- `npm run anki:validate`: success

  ```text
  validated 50 cards (0 warnings)
  checked 50 cards in 9 category page(s), max 200 per page
  ```

- `npm run validate`: success

  ```text
  教材構造、依存関係、進捗メタデータを検証しました。
  232 個の Markdown ファイルを KaTeX strict で検証しました。
  237 個の生成対象テキストを検証しました。
  ```

### アーキテクチャ変更の最終件数

fatal: 0 / major: 0 / minor: 0
