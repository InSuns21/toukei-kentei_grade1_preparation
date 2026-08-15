# C02-events-distribution-functions 独立数理査読

initial_reviewer_id: /root/anki_math_review
initial_reviewed_at: 2026-08-14T02:09:50+09:00

## 査読メタデータ

- 担当ID: `/root/anki_math_review`
- 査読種別: 初回・独立数理査読
- 対象: `anki/cards/11_events_distribution_functions.md`〜`15_moment_generating_functions.md` の新規55枚、`anki/notation.md`、`anki/formulae.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`
- 独立性: 既存の自己査読や試験適合性査読の結論を根拠にせず、確率、総和、積分、微分、台、端点、母関数の存在範囲を全55枚について独立再計算した。
- 適用した公式ねらい: `math-events, math-distribution-functions` に対応する「確率と確率分布に関する基礎的な事項を理解し、種々の場面に応じた確率計算が正しくできる。」

## 総合判定

新規55枚の具体例の数値・確率・積分・微分には結論を反転させる誤りを認めなかった。事象、累積分布関数、同時・周辺・条件付き分布、確率母関数、モーメント母関数を実際に計算する構成で、対象ねらいの理解・計算行動を担っている。

ただし、公開カードの公式正本である `formulae.md` に複数の使用公式が未収録であり、累積危険率の一般式には必要条件がない。また1カードで名前付き分布の日本語名が不足する。したがって初回稿は要修正とする。

## 初回指摘

### Fatal

なし。

### Major

#### C02-M01 `formulae.md` が新規公開カードの使用公式・判定条件を包含していない

- 場所: `anki/formulae.md` の「分布・モーメント」と、少なくとも次のカード。
  - `prob-pmf-normalization`: $p_X(x)\ge0$、$\sum_xp_X(x)=1$
  - `prob-cdf-validity`: 累積分布関数の非減少性、右連続性、両端極限
  - `prob-interval-from-cdf`, `prob-cdf-endpoint-choice`: 区間端点に応じた $F(b)-F(a)$、$F(b)-F(a-)$
  - `prob-mixed-cdf`: 点質量と連続密度を併せた累積分布関数
  - `prob-joint-cdf-from-density`: 同時密度から同時累積分布関数を得る二重積分
  - `prob-truncated-conditional-density`: 事象による切断密度 $f_X(x)\boldsymbol1_B(x)/P(X\in B)$
  - `prob-conditional-cdf-from-density`: 条件付き密度の積分による条件付き累積分布関数
  - `prob-pgf-validity`: 確率母関数の係数非負性と $G(1)=1$
- 根拠: `formulae.md` は「公式・定理・定義の正本」であり、Anki継続手順はカードと正本の同期を要求する。カード内の再掲だけでは、正本から公開公式を逆引きしたとき上記論点が欠落する。
- 独立確認: 各カードに書かれた上記公式自体は正しく、具体例の計算も一致した。問題はカードと正本の双方向包含である。
- 修正案: 上記の一般式・条件を `formulae.md` に追加し、端点条件や分母正値条件も併記する。

#### C02-M02 `formulae.md` の累積危険率公式が必要条件なしに一般化されている

- 場所: `anki/formulae.md` の「累積危険率」
  $$H_X(x)=-\log S_X(x)=\int_0^xh_X(u)\,du.$$
- 根拠: 後半の積分表示には、非負寿命で $S_X(0)=1$、かつ絶対連続であることが必要である。`notation.md` は「絶対連続な寿命分布」と限定するが、`formulae.md` は無条件の等号としており、両正本が不一致である。
- 反例: $P(X=0)=1/2$、正の部分が重み $1/2$ のrate 1指数密度とする。$t\ge0$ で
  $$S(t)=\frac12e^{-t},\qquad f(t)=\frac12e^{-t},\qquad h(t)=1.$$
  よって
  $$-\log S(t)=t+\log2\ne t=\int_0^t h(u)\,du.$$
- 対象カードへの影響: `prob-cumulative-hazard` の $S(t)=e^{-t^2}$ と `prob-survival-from-hazard` の $h(t)=3t^2,S(0)=1$ は条件を満たし、各計算結果 $H=t^2,h=2t$ および $H=t^3,S=e^{-t^3}$ は正しい。誤りは正本の一般定理の条件である。
- 修正案: `notation.md` と一致させ、「非負で絶対連続、$S(0)=1$」など適用条件を明記する。一般形を扱うなら $H(t)-H(0)=\int_0^t h(u)\,du$ と起点も区別する。

### Minor

#### C02-m01 `prob-mgf-nonexistence` で $N(0,1)$ の日本語分布名がない

- 場所: `anki/cards/15_moment_generating_functions.md`、`prob-mgf-nonexistence` の問題
- 根拠: `$Z\sim N(0,1)$` と記号を使うが、「標準正規分布」または「正規分布」と明記しているのは $X=e^Z$ に対する「対数正規分布」だけである。分布記号を使うカードでは日本語分布名を明記するという規約を満たさない。
- 独立再計算: $E[X^r]=E[e^{rZ}]=e^{r^2/2}$ は正しい。また任意の $t>0$ で十分大きい $z$ に対し $te^z\ge z^2$ なので、被積分関数は尾部で下から正定数に抑えられ、$M_X(t)=\infty$ の証明も正しい。
- 修正案: 「$Z$ は標準正規分布 $N(0,1)$ に従う」とする。

## 全55枚の独立再計算記録

### `11_events_distribution_functions.md`（20枚）

| カードID | 独立計算・条件確認 |
|---|---|
| `prob-conditional-multiplication` | $0.75\cdot0.4=0.30$。分母 $P(B)>0$。 |
| `prob-total-probability` | $0.01(0.60)+0.03(0.40)=0.018$。工場は正確な分割。 |
| `prob-independent-events` | 各周辺 $1/2$、共通部分 $1/4=(1/2)^2$。 |
| `prob-pairwise-not-mutual` | 各ペア共通部分 $1/4$、三重共通部分 $1/4\ne1/8$。 |
| `prob-cdf-from-density` | $\int_0^x2u\,du=x^2$、全積分1、端点0・1と右連続性も整合。 |
| `prob-survival-hazard` | $S(t)=e^{-2t}$、$h(t)=2$。指数分布の密度は正規化される。 |
| `prob-marginal-density` | 三角形上で $f_X(x)=\int_0^x2dy=2x$、積分1。 |
| `prob-conditional-density` | $f_{Y\mid X}=2/(2x)=1/x$（$0<y<x$）、積分1。 |
| `prob-pgf-moments` | $G=2/3+s/3$、$G'(1)=1/3,G''(1)=0$、分散 $2/9$。 |
| `prob-mgf-independent-sum` | $(1/2+e^t/2)^2=1/4+e^t/2+e^{2t}/4$、質量 $(1/4,1/2,1/4)$。 |
| `prob-complement-at-least-one` | $1-0.8^3=0.488$。独立性を積に使用。 |
| `prob-inclusion-exclusion-three` | $1.2-0.3+0.05=0.95$。指定確率は非負な原子確率へ分解可能。 |
| `prob-chain-rule-three` | $0.8\cdot0.5\cdot0.25=0.10$。必要な条件事象は正確率。 |
| `prob-independent-complements` | $P(A^c\cap B)=0.5-0.4(0.5)=0.3=0.6(0.5)$。 |
| `prob-conditioning-breaks-independence` | $P(A\mid C)=P(B\mid C)=1/2$、共通条件付き確率0なので非独立。 |
| `prob-density-normalization` | $c\int_0^1x^2dx=c/3=1$ より $c=3$。 |
| `prob-cdf-jump-mass` | $0.7-0.4=0.3$。右値と左極限の選択が正しい。 |
| `prob-discrete-marginal` | 行和は $0.3,0.7$、総和1。 |
| `prob-discrete-conditional` | 条件行和0.7で割り、質量 $3/7,4/7$。 |
| `prob-joint-factorization-independence` | 周辺密度 $2x,2y$、積 $4xy$。台も直積で独立の結論は正しい。 |

### `12_distribution_function_core.md`（10枚）

| カードID | 独立計算・条件確認 |
|---|---|
| `prob-pmf-normalization` | 係数和 $1+2+3=6$ より $c=1/6$。 |
| `prob-cdf-validity` | 非減少、右連続、$-\infty$ で0、$+\infty$ で1。接続点0・2も整合。 |
| `prob-interval-from-cdf` | $9/16-1/16=1/2$。連続分布なので端点質量なし。 |
| `prob-cdf-endpoint-choice` | $F(3)-F(1-)=0.7$、点1の質量0.3を含む。 |
| `prob-mixed-cdf` | 点0に1/2、$(0,1)$ の密度1/2。右連続、総確率1。 |
| `prob-joint-cdf-from-density` | 単位正方形の左下長方形積分は $xy$。 |
| `prob-rectangle-from-joint-cdf` | $0.56-0.14-0.24+0.06=0.24$。 |
| `prob-survival-from-cdf` | $t\ge0$ で $e^{-t^2}$、$t<0$ で1。 |
| `prob-cumulative-hazard` | 掲載例では $H=t^2$、$h=2t$。正本条件はC02-M02。 |
| `prob-survival-from-hazard` | $\int_0^t3u^2du=t^3$、$S=e^{-t^3}$。正規化可能な生存関数。 |

### `13_joint_conditional_distribution.md`（9枚）

| カードID | 独立計算・条件確認 |
|---|---|
| `prob-joint-density-normalization` | 三角形面積2より $2c=1$、$c=1/2$。 |
| `prob-joint-pmf-normalization` | 4係数 $1,2,2,3$ の和8より $c=1/8$。 |
| `prob-discrete-independence-cross-product` | $0.04\ne0.06$ なので非独立。全セル正で交差積判定を適用可能。 |
| `prob-conditional-equals-marginal` | 各条件付き質量と周辺質量は全て1/2。$x=0,1$ の双方で一致。 |
| `prob-joint-cdf-independence` | 全点で積分解する仮定から独立、例は $0.6(0.5)=0.3$。 |
| `prob-mixture-marginal` | $0.8(0.3)+0.2(0.7)=0.38$。 |
| `prob-truncated-conditional-density` | $P(X>1)=1/2$、$(1,2)$ の条件付き密度1、積分1。 |
| `prob-density-bayes-two-class` | 重み $0.3,0.1$ を正規化し $0.75$。周辺密度0.4は正。 |
| `prob-conditional-cdf-from-density` | $0\le y<x$ で $y/x$、台外0・1。固定 $x\in(0,1)$ で右連続。 |

### `14_probability_generating_functions.md`（8枚）

| カードID | 独立計算・条件確認 |
|---|---|
| `prob-pgf-recover-pmf` | 係数 $(0.2,0.5,0.3)$ は非負で和1。 |
| `prob-pgf-binomial` | 二項定理により $(1-p+ps)^n$。$n=2,p=1/2$ の例も一致。 |
| `prob-pgf-geometric` | 添字移動後 $ps/[1-(1-p)s]$、収束条件 $|(1-p)s|<1$。 |
| `prob-pgf-poisson` | 指数級数から $e^{-\lambda}e^{\lambda s}=e^{\lambda(s-1)}$。 |
| `prob-pgf-independent-sum` | Bernoulli分布3個の独立和は $(1-p+ps)^3$。 |
| `prob-pgf-thinning` | 条件付き二項分布を平均し $G_Y(s)=G_N(1-q+qs)$、Poisson時はrate $\lambda q$。 |
| `prob-pgf-factorial-moment` | $G''(s)=\lambda^2e^{\lambda(s-1)}$、$G''(1)=\lambda^2$。 |
| `prob-pgf-validity` | $G(1)=1$ だが係数 $-1/4<0$ なので不適格。 |

### `15_moment_generating_functions.md`（8枚）

| カードID | 独立計算・条件確認 |
|---|---|
| `prob-mgf-mean-variance` | $M'(0)=2,M''(0)=8$、分散 $8-4=4$。原点近傍で有限。 |
| `prob-mgf-affine-transform` | $e^{3t}M_X(2t)=e^{3t}/(1-2t)$、存在範囲 $t<1/2$。 |
| `prob-mgf-iid-sum` | 独立同分布3個で $(1-t)^{-3}$、Gamma(shape 3, rate 1) と一致。 |
| `prob-mgf-exponential-domain` | 積分収束は $t<\lambda$、値 $\lambda/(\lambda-t)$。 |
| `prob-mgf-gamma` | Gamma積分で $\{\beta/(\beta-t)\}^{\alpha}$、$t<\beta$。 |
| `prob-mgf-identify-normal` | $\mu=3,\sigma^2/2=2$ より正規分布 $N(3,4)$。 |
| `prob-mgf-nonexistence` | 全正整数次モーメントは有限だが任意の $t>0$ で発散。数理は正しく、名称のみC02-m01。 |
| `prob-mgf-uniqueness-domain` | 原点を含む開区間で有限かつ一致なら同分布。0一点では常に値1で識別不能。 |

## ねらい・coverageの数理面確認

- 実カード数は55枚で、`progress.yaml` の目安55〜65枚内。
- `math-events` は条件付き確率、全確率、補集合、包除、連鎖則、独立、相互独立、条件付け後の非独立を数値計算・判定・証明で扱う。既存のBayes診断カードと合わせ、公式用語を単に列挙せず操作へ接続している。
- `math-distribution-functions` は確率質量・密度の正規化、累積分布関数の構成・判定・端点、同時・周辺・条件付き分布、生存・危険率、確率母関数・モーメント母関数を、総和・積分・微分・係数比較へ接続する。
- `coverage.yaml` の両項目は `card` で、列挙された新規カードIDは実在し、対象subcategoryと一致する。
- 対象ねらいに対する数理技能の重大な欠落や、同じ計算だけを言い換えた重大な重複は認めない。C02-M01/M02を解消すれば、正本からも同じ技能を再生できる。

## 機械検証

- `npm run anki:validate`: success

  ```text
  validated 105 cards (0 warnings)
  built 105 cards in 7 category page(s), max 200 per page
  checked 105 cards in 7 category page(s), max 200 per page
  ```

- `npm run validate`: success

  ```text
  教材構造、依存関係、進捗メタデータを検証しました。
  243 個の Markdown ファイルを KaTeX strict で検証しました。
  237 個の生成対象テキストを検証しました。
  ```

- 注記: 機械検証はKaTeX・構造・カード数を通過したが、C02-M01の正本包含、C02-M02の定理条件、C02-m01の日本語名を検出しない。

## 修正確認

初回査読時点では未実施。同じ担当による再査読時に全55枚と両正本を再確認する。

## 初回件数

fatal: 0 / major: 2 / minor: 1

---

## 修正後再査読

final_reviewer_id: /root/anki_math_review
final_reviewed_at: 2026-08-14T02:22:46+09:00

### 再査読メタデータ

- 担当ID: `/root/anki_math_review`（初回と同一担当）
- 対象: `anki/cards/11_events_distribution_functions.md`〜`16_probability_missing_skills.md` の新規58枚、`anki/notation.md`、`anki/formulae.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`
- 方法: 初回指摘箇所だけでなく、初回55枚を再読・再計算し、追加3枚を独立再計算した。名前付き分布、台、端点、分母正値条件、微分・積分、母関数の存在範囲、正本との包含、公式用語単位coverageを再照合した。
- 時系列: `final_reviewed_at` は `progress.yaml` の `revision_at: 2026-08-13T17:20:39.292Z` より後である。

### 初回指摘の修正確認

- C02-M01 `formulae.md` の包含不足: **解消**。
  - 確率質量関数の非負・総和1、累積分布関数の非減少・右連続・両端極限、区間端点公式、混合分布の累積分布関数を追加済み。
  - 同時密度から同時累積分布関数を得る二重積分、条件付き累積分布関数、事象による切断密度、確率母関数の係数非負・$G(1)=1$ 判定も追加済み。
  - 対応カードの「使用公式・定理」と記号・条件を照合し、数学的矛盾はない。
- C02-M02 累積危険率の条件不足: **解消**。
  - $S_X(x)>0$ で $H_X(x)=-\log S_X(x)$ と定義し、$H_X(x)=\int_0^xh_X(u)\,du$ と $S_X(x)=e^{-H_X(x)}$ は「非負で絶対連続な寿命分布かつ $S_X(0)=1$」に限定された。
  - `notation.md` の条件と一致し、初回反例の点0の質量を誤って包含しない。
  - `prob-cumulative-hazard` と `prob-survival-from-hazard` の具体例は引き続き条件を満たし、$H=t^2,h=2t$ および $H=t^3,S=e^{-t^3}$ を再確認した。
- C02-m01 `prob-mgf-nonexistence` の日本語分布名: **解消**。「$Z$ は標準正規分布 $N(0,1)$ に従う」と明記された。対数正規分布の全正整数次モーメントと正側モーメント母関数発散の証明にも回帰はない。

### その他の指定修正確認

- `prob-joint-factorization-independence`: **解消・正しい**。密度による独立条件を「ほとんどすべての $(x,y)$ について $f_{X,Y}=f_Xf_Y$」と記し、単に同時台内部だけの一致を一般条件としない。掲載例では周辺密度 $2x,2y$、積 $4xy$、長方形台と台外の0まで一致するので独立である。
- 既存55枚: 初回再計算表の値を全件再確認した。修正による数値・式・条件の回帰はない。

### 追加3枚の独立再計算

| カードID | 独立再計算・判定 |
|---|---|
| `prob-counting-sample-space` | 公平な硬貨3回の等確率標本点は $2^3=8$、表2回の位置は $\binom32=3$。従って $P=3/8$。等確率条件と注意も正しい。 |
| `prob-conditional-definition-direct` | $P(B)=0.30>0$、$P(A\mid B)=0.18/0.30=0.60$。分母と条件記号の対応は正しい。 |
| `prob-density-from-cdf-derivative` | $0<x<1$ で $F'(x)=2x$、定数区間で0。端点に跳びはなく、$\int_0^12x\,dx=1$。絶対連続性の条件と注意も正しい。 |

### 公式用語単位coverageの確認

- `syllabus.yaml` はschema 3で、対象小項目の公式用語は `math-events` 5件、`math-distribution-functions` 10件、合計15件。
- `coverage.yaml` は同じ順序・表記で15件全てを登録し、全件 `status: card`、両小項目は `status: complete` である。
- `math-events`:
  - 確率の計算: 全確率・補集合・場合の数で実計算する。
  - 統計的独立: 積条件、相互独立、補事象、条件付け後の非独立を判定する。
  - 条件付き確率: 定義の割算、乗法公式、連鎖則を双方向に操作する。
  - ベイズの定理: `prob-bayes-diagnostic` で事後確率を数値計算する。
  - 包除原理: 2事象・3事象で重複補正を計算する。
- `math-distribution-functions`:
  - 確率関数、確率密度関数、累積分布関数、生存関数、危険率は、正規化・積分・微分・端点・相互変換のカードを持つ。
  - 同時分布、周辺分布、条件付き分布は、離散表と連続密度の双方で和・積分・割算・Bayes更新を行う。
  - 確率母関数、モーメント母関数（積率母関数）は、係数回収、微分、独立和、分布同定、存在範囲・非存在まで操作する。
- 割当カードは全て実在し、対応小項目のsubcategoryに属する。公式用語を単に本文へ掲載しただけの割当は認めない。
- validatorは、公式termsの完全同順登録、card/planned状態、カードID実在、subcategory一致、全用語card対応とcompleteの一致を検査する。さらに現在のrevision作業とreviewed作業について、対象全用語にcard対応がない場合をerrorにする実装を確認した。

### 修正後のねらい適合性

- 新規58枚は目安55〜65枚内である。
- 公式ねらい「確率と確率分布に関する基礎的な事項を理解し、種々の場面に応じた確率計算が正しくできる」に対し、場合の数、条件付き確率、独立性、分布関数、密度、同時・条件付き分布、母関数を、定義再生だけでなく数値計算・積分・微分・判定へ接続する。
- 初回時点で見つからなかった「等確率な有限標本空間からの場合の数」「条件付き確率の定義を直接使う割算」「累積分布関数から密度への微分」も追加3枚で明示的に操作する。数学的な不足・過剰・重大な重複は残らない。

### 最終機械検証

- `npm run anki:validate`: success

  ```text
  validated 108 cards (0 warnings)
  built 108 cards in 7 category page(s), max 200 per page
  checked 108 cards in 7 category page(s), max 200 per page
  ```

- `npm run validate`: success

  ```text
  教材構造、依存関係、進捗メタデータを検証しました。
  246 個の Markdown ファイルを KaTeX strict で検証しました。
  237 個の生成対象テキストを検証しました。
  ```

## 最終件数

fatal: 0 / major: 0 / minor: 0
