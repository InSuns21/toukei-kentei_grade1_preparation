# C25-engineering-inference-asymptotics 試験適合性査読

- initial_reviewer_id: c25_exam_review
- initial_reviewed_at: 2026-08-22T21:09:45+09:00
- 対象: `anki/cards/47_engineering_inference_asymptotics.md` の新規70枚、C21 `applied-multiple-regression`・`applied-multivariate` の関連カード、既存 `math-asymptotic-estimation` カード、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml`
- 公式ねらい: 「統計手法の数理的な側面を正しく理解し、応用に結び付けることができる。特に、解析や線形代数などの数学的な理論が実際の応用にどう結び付くのかを理解する。」
- 公式terms: 線形モデル、一般化線形モデル、線形結合の分布、線形対比、線形制約、大数の法則、中心極限定理、最尤推定量の漸近正規性、漸近分散、一致性、デルタ法
- 参照タイトル: 漸近理論227–244、線形回帰245–266、一般化線形モデル296–311
- 参照優先度: S 23 / A 23 / B 10 / C 0
- 新規カード: 70枚（priority S 35 / A 25 / B 10 / C 0）

## 初回指摘

### fatal

- なし。

### major

1. `enginf-new-observation-pi` が「前カードと同じ値」に依存しており、シャッフル表示されるAnkiカードとして単独で解けない。
   - 影響: 問題文だけでは予測平均、$s$、二次形式、自由度・臨界値が分からず、予測区間を再現できない。検索結果やカテゴリー分割後にも成立しない。
   - 必要な修正: `enginf-mean-response-ci` から必要な数値を問題欄へ再掲し、平均応答区間との比較は計算例または注意に残す。

2. C21との役割分担が一部で成立せず、ほぼ同じ計算の重複が多い一方、指定タイトル中の重要技能がC25にない。
   - 近接重複: `enginf-logistic-probability` と `glm-logistic-probability`、`enginf-logistic-odds-ratio` と `glm-logistic-odds-ratio`、`enginf-logistic-likelihood-ratio` と `glm-likelihood-ratio-test`、`enginf-glm-overdispersion` と `glm-overdispersion-diagnostic`、`enginf-logistic-marginal-effect` と `glm-logistic-marginal-effect`、`enginf-wls-two-weights` と `reg-wls-two-points`、`enginf-gls-whitening` と `reg-gls-estimator`、`enginf-ridge-orthogonal-numeric` と `reg-ridge-closed-form`。
   - 不足: S指定の「交互作用項」264、A指定の「ダミー変数」263、A指定の「GLMの3要素」296、B指定の「指数型分布族」297、B指定の「二項GLMの尤度」304について、C25固有の数理・行列技能がない。C21に基礎カードはあるが、C25は同じタイトル範囲を再びsourceとしており、重複させる項目と役割分担する項目の選択が一貫していない。
   - 影響: 公式ねらいの「数学的理論が実際の応用にどう結び付くか」に対し、確率・オッズ等の初歩計算が枚数を占め、計画行列によるダミー・交互作用、指数型分布族から平均・分散・正準リンクを読む技能が弱い。
   - 必要な修正: 上記の重複カードの一部を、工学設定の計画行列作成・交互作用係数判定、GLMの3要素、指数型分布族の微分、二項GLM対数尤度などへ置換するか、同じカードをC21より一段深い導出・出力判定へ変更する。少なくともS 264とA 296はC25内で実質的に扱う。

3. `engasym-rare-event-poisson-limit` はPoisson極限定理を「中心極限定理」のカードとしてsource・coverageへ対応付けているが、両者は別の極限定理であり、指定タイトル227–244にもPoisson極限はない。
   - 影響: `coverage.yaml` の「中心極限定理」の知識充足を、中心極限定理を使わないカードで水増しする。内容もC04の二項分布のPoisson近似カードと役割が重なる。
   - 必要な修正: 当該カードをC25から外すか、標本平均・標本比率・Slutsky等の指定漸近技能へ置換する。残す場合は「中心極限定理」へのsource・coverage対応を外し、発展的補足として明確に位置付ける。

### minor

1. 3枚で `\qquad` のバックスラッシュが欠け、数式中に文字列 `qquad` が表示される。
   - `enginf-logistic-irls-one-step`: `p=0.5,qquad z=...`
   - `enginf-poisson-mean`: `\eta=1.8,qquad \mu=...`
   - `enginf-glm-link-selection`: 3リンクの区切りが `,quad`。
   - 必要な修正: `qquad` を `\qquad`、`quad` を `\quad` に直す。KaTeX strictは通常文字として受理するため機械検証では検知されない。

2. 記法同期と問題文の分散行列の指示に小さな曖昧さがある。
   - `engasym-mle-asymptotic-normality`、`engasym-poisson-mle-variance`、`enginf-logistic-wald-output` などで使う近似分布記号 `\dot\sim` が `anki/notation.md` に定義されていない。
   - `anki/formulae.md` の漸近相対効率で `\operatorname{AVar}`、`anki/notation.md` とカードでは `\operatorname{Avar}` を使っているため大小文字を統一する。
   - `enginf-glm-wald-joint` は、与えた `\operatorname{diag}(0.25,1)` が $\widehat V$ なのか $R\widehat V R^{\mathsf T}$ なのかを問題文で明示する。答えは後者として計算している。

## ねらい適合性

- 線形代数との接続は、最小二乗法の行列公式、正規方程式、分散共分散行列、Gauss--Markov定理、線形結合、線形対比、線形制約、制約付き推定で明確である。解析との接続は、Taylor展開、連続写像定理、Slutskyの定理、デルタ法、推定方程式の線形化で明確である。
- 工学応用は、工程平均、故障確率・件数、曝露時間、工程効果、センサー平均、許容幅、回帰出力・診断へ結び付いており、公式ねらいの方向には適合する。
- 公式11用語は `coverage.yaml` ですべて `status: card` であり、各用語には少なくとも1枚以上の実カードが対応する。ただしmajor 2のとおり、一般化線形モデルではC21との重複を減らし、数理的な構成・導出へ寄せる必要がある。
- 全70枚は7節を各1回持ち、1カード1論点の短時間反復になっている。Anki範囲外の連結演習、答案圧縮、部分点構造、90分の問題選択戦略は要求していない。

## 知識充足性

- 線形モデル: 行列次元、OLS計算、正規方程式、不偏性、分散、BLUE、分散分析、係数区間、平均応答・新観測、VIF、WLS・GLS、頑健分散、レバレッジ・残差・Cookの距離まで、再生・計算・診断・ソフト出力を一通り扱う。
- 線形結合・対比・制約: 正規分布の線形結合、対比の標準誤差とt検定、複数制約F検定、部分F検定、推定可能性、制約付きOLSを扱い、行列計算技能が十分ある。
- 漸近理論: 大数の法則、中心極限定理、確率収束と一致性、Slutsky、連続写像、デルタ法、MLE漸近正規性、漸近分散・相対効率、推定方程式・サンドイッチ分散を、公式再生と具体計算の両方で扱う。収束概念の定義・包含、強法則、$O_p/o_p$ は既存 `31_asymptotic_estimation.md` が担当し、C25は工学的適用・多変量化・推定方程式へ進む役割分担になっている。
- ソフトウェア出力技能は、回帰係数、ANOVA表、係数区間、Wald検定、逸脱度差、残差逸脱度、Pearson分散倍率を読んで計算・判定するカードで確保されている。
- 一般化線形モデルは、ロジスティック・Poissonの予測、オッズ比、オフセット、Wald・尤度比、IRLS、逸脱度、過分散、リンク、限界効果を扱う。ただしGLMの構成と指数型分布族からの導出がC21任せであり、major 2の修正が必要である。

## 過不足

- 70枚は目安65–75枚に収まり、S/A/Bの参照タイトル56件に対して、基礎再生だけでなく数値計算・導出・判定を分割した枚数として過大ではない。
- C21との重複のうち、同じ公式を工学設定へ適用して一段深い行列計算・診断へ進むものは許容できる。OLSの不偏性・分散、線形制約、推定可能性、Wald同時検定などはC25の明確な追加価値がある。
- 一方、major 2に列挙したロジスティック確率・オッズ比・尤度比・過分散・限界効果、WLS等は数値だけを変えた近接反復で、S/Aの未充足技能と交換する余地がある。
- `engasym-sample-quantile-variance`、`engasym-sandwich-m-estimator`、`engasym-local-alternative-power` は指定タイトルより発展的だがpriority Bであり、数理的応用を補う範囲として妥当である。Poisson極限だけはsource対応が誤っているため別扱いとする。

## 優先度根拠

- sourceはS 23 / A 23 / B 10である。新規カードもBを10枚に抑え、S 35枚・A 25枚で中核技能の反復を厚くしている。タイトル1件を複数カードに分けるため、カード優先度数がsource件数を超えること自体は妥当である。
- SカードはOLS導出・分散、線形結合・制約、回帰検定・区間、中心極限定理、デルタ法、MLE漸近正規性、工学的GLM出力など、他問題の前提になる再現・計算技能へ集中している。
- Bカードは標本分位点、漸近MSE、M推定量、局所対立、IRLS、Ridge、非線形勾配、推定可能性、制約付きOLSなど発展的技能であり、指定B 10件と枚数上も一致する。
- 各カードの `frequency.past_exam` は0であり、個別のS/A/Bは実過去問出現件数の直接確認ではなく、親見出しの指定優先度、前提性、計算・判定技能の汎用性を根拠とする。major 2の修正ではS 264を落とさないことを優先する。

## formulae・notation・coverage・配信品質

- `anki/formulae.md` はOLS・正規方程式・分散・線形制約・部分F・予測区間・HC0・Gauss--Markov、GLM・IRLS・ロジスティック・Poisson・逸脱度・Pearson統計量、大数の法則・中心極限定理・Slutsky・連続写像・デルタ法・MLE漸近正規性・漸近分散を同期している。
- `anki/notation.md` は線形モデル、$R,\boldsymbol r,q,\widehat V,\operatorname{Avar}$、収束矢印、フィッシャー情報量を定義している。minor 2の `\dot\sim` と `Avar/AVar` は修正が必要である。
- `anki/syllabus/coverage.yaml` は新規70枚を2サブカテゴリーへ列挙し、公式11用語すべてをcardへ対応付けている。ただし `engasym-rare-event-poisson-limit` を中心極限定理へ対応させた箇所はmajor 3のとおり修正が必要である。
- 7節は問題・記号用語・使用公式定理・一手方針・答え・計算例・注意の各70件で完全に揃う。major 1を除けば各カードは局所定義と公式を持ち、単独で解ける。

## 機械検証

- `npm run anki:validate`: 成功。1278 cards、0 warnings、25 category pages、最大200枚。
- `npm run validate`: 成功。構造検証、366 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を完了。
- KaTeX strict検証は `qquad`・`quad` を通常の数式文字として受理するため、minor 1は手動査読指摘として残る。

## 初回集計

- fatal: 0
- major: 3
- minor: 2
- fatal: 0 / major: 3 / minor: 2

## 修正確認

- final_reviewer_id: c25_exam_review
- final_reviewed_at: 2026-08-22T21:21:51+09:00
- 再査読範囲: 初回指摘箇所だけでなく、差し替え後の全70枚、C21 `applied-multiple-regression`・`applied-multivariate` の関連カード、既存 `math-asymptotic-estimation` カード、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml` の作業単位全体

### 初回majorの確認

1. `enginf-new-observation-pi` の前カード依存
   - 問題欄へ予測平均50、残差標準偏差4、二次形式0.09、$t$ 臨界値2.086が再掲された。
   - シャッフル表示や検索結果から単独で開いても、予測標準誤差と95%予測区間を最後まで計算できる。初回major 1は解消した。

2. C21との近接重複とC25固有技能の不足
   - 近接重複だったロジスティック確率、オッズ比、尤度比、過分散、限界効果、Ridgeの6枚を削除し、次の6枚へ差し替えた。
     - `enginf-interaction-design-matrix`: S 264「交互作用項」を計画行列 $(1,x,D,xD)$ の作成として扱う。
     - `enginf-interaction-slope-test`: 群別傾きと交互作用係数のWald判定を扱う。
     - `enginf-dummy-reference-contrast`: A 263「ダミー変数」を基準カテゴリ変更と推定可能な対比へ接続する。
     - `enginf-glm-three-components`: A 296「GLMの3要素」をPoissonモデル式から識別する。
     - `enginf-exponential-family-mean-variance`: B 297「指数型分布族」を正規化条件の微分から平均・分散へ接続する。
     - `enginf-binomial-glm-loglikelihood`: B 304「二項GLMの尤度」をロジット線形予測子で展開する。
   - これらはC21の用語再生・基本数値例に対し、C25で計画行列、係数差検定、再パラメータ化、指数型分布族の微分、対数尤度展開へ進む。C21との役割分担が明確になり、初回major 2は解消した。
   - WLSはC21が相対重み $4:1$ の決定、C25が逆分散重みを用いた共通平均の推定値10.8まで計算する。GLSはC21が推定公式の導出、C25が白色化後の誤差分散を確認するため、残る近接カードにも段階差がある。

3. Poisson極限の中心極限定理への誤対応
   - `engasym-rare-event-poisson-limit` は削除され、指定Sタイトル239「標本比率の漸近正規性」に対応する `engasym-proportion-standardization` へ差し替えられた。
   - 新カードはベルヌーイ分布の平均・分散を明示し、中心極限定理による標準化と実用標準誤差の置換まで扱う。`coverage.yaml` の「中心極限定理」も新IDへ更新され、初回major 3は解消した。

### 初回minorの確認

1. `\qquad`・`\quad` のバックスラッシュ欠落
   - `enginf-logistic-irls-one-step`、`enginf-poisson-mean`、`enginf-glm-link-selection` はすべて正しいLaTeXコマンドへ修正された。
   - 全70枚を検索し、バックスラッシュのない `qquad`・`quad` は残っていない。初回minor 1は解消した。

2. 記法同期とWald問題の曖昧さ
   - `anki/notation.md` に $T_n\dot\sim D_n$ を大標本近似分布の記号として定義した。
   - 漸近分散は、$V$ を漸近分散定数、推定量自体の近似分散を $\operatorname{Avar}(\widehat\theta)=V/n$ とする規約に、`anki/formulae.md`、`anki/notation.md`、カード本文が統一された。
   - `enginf-glm-wald-joint` は与えた対角行列が制約差の推定分散共分散行列 $R\widehat V R^{\mathsf T}$ であると問題欄に明記された。
   - 初回minor 2は解消した。

## 全体再査読

- 全70枚は「問題 → 記号・用語 → 使用公式・定理 → 一手／方針 → 答え → 計算例 → 注意」の7節を各1回持つ。各カードは独立して読め、公式再生、行列・微分・確率計算、条件判定、ソフトウェア出力解釈のいずれか1論点へ収束している。
- 公式11用語は全件がカード本文で実質的に扱われ、`coverage.yaml` のterm対応と一致する。線形モデル側はOLSの導出から対比・制約・診断・GLMへ、漸近理論側は収束・極限定理からデルタ法・MLE・推定方程式へ進み、公式ねらいの解析・線形代数と応用の接続を満たす。
- 参照タイトル227–266・296–311について、C25は既存 `31_asymptotic_estimation.md` の収束概念・定理再生、およびC21の回帰・GLM基本技能を重複収録するだけでなく、標準化、サンドイッチ分散、計画行列、線形制約、指数型分布族の微分、尤度展開へ進む。役割分担後に、削除すべき同一問題の複製や指定S技能の欠落は残っていない。
- 新規カードのpriorityはS 35 / A 25 / B 10 / C 0で、sourceのS 23 / A 23 / B 10 / C 0に対し、S/Aタイトルを複数の再生・計算・判定カードへ分けた配分として妥当である。Bは10枚に抑えられ、発展論点が中核技能を圧迫しない。
- 70枚は目安65–75枚に収まる。ソフトウェア出力技能は通常線形モデルの係数・ANOVA・信頼区間・残差診断と、GLMのWald・逸脱度・リンク判定を含む。Anki範囲外の連結演習、答案圧縮、部分点構造、問題選択戦略は要求していない。
- `anki/formulae.md` は差し替えカードに必要なGLM3要素、指数型分布族の平均分散、ダミー交互作用、GLM Wald制約を追加し、線形モデル・漸近理論の公式もカードと一致する。`anki/notation.md` は近似分布と漸近分散規約を含めて同期している。
- `anki/syllabus/coverage.yaml` は全70枚を正しい2サブカテゴリーへ列挙し、公式11用語へ意味的に対応付ける。obsoleteな差し替え前IDは残っていない。カテゴリー配信は最大200枚制約内である。

## 再査読時の機械検証

- `npm run anki:validate`: 成功。1278 cards、0 warnings、25 category pages、最大200枚。
- `npm run validate`: 成功。構造検証、368 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を完了。

### 数理再査読後の最終本文確認

- `enginf-binomial-glm-loglikelihood` は問題欄で観測間の独立性を明示した。各観測の二項確率質量関数の積から対数尤度を和へ変える条件がカード内で完結し、本文の対数尤度・スコアと整合する。
- `enginf-interaction-slope-test` は $H_0:\beta_3=0$、$Z\dot\sim N(0,1)$、5%両側の棄却則 $|Z|>1.96$ を公式欄へ明示した。$Z=-2.5$ から棄却する答えまで、未記載の臨界値判定を読者に補わせない。
- 上記2枚を含む全70枚を再確認し、7節は各70件、独立カード性、公式11用語、C21・既存漸近カードとの役割分担、formulae・notation・coverage同期に新たな不整合はない。
- 最終本文に対する `npm run anki:validate` は1278 cards・0 warningsで成功し、`npm run validate` は構造検証、368 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証で成功した。

## 最終件数

- fatal: 0
- major: 0
- minor: 0
- fatal: 0 / major: 0 / minor: 0
