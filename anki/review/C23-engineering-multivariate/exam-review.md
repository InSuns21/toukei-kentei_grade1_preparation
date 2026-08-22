# C23-engineering-multivariate 試験適合性査読

- initial_reviewer_id: c23_exam_review
- initial_reviewed_at: 2026-08-22T11:08:53Z
- 対象: `anki/cards/45_engineering_multivariate.md` の新規42枚、既存 `engineering-multivariate` 4枚、C21 `applied-multivariate` カード群、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml`
- 公式ねらい: 「統計手法の数理的な側面を正しく理解し、応用に結び付けることができる。特に、解析や線形代数などの数学的な理論が実際の応用にどう結び付くのかを理解する。」のうち、多変量解析法
- 公式terms: 多変量正規分布、平均ベクトル、分散共分散行列、相関行列、固有値・固有ベクトル
- 参照タイトル: 多変量解析343–359
- 参照優先度: S 0 / A 2 / B 14 / C 1

## 初回指摘

### major

1. A優先タイトル346「主成分分析：分散最大化」とB優先タイトル349「主成分負荷量」がC23内で実質的に測定されず、`coverage.yaml` の `engineering-multivariate: complete` は知識充足性を過大評価している。
   - 根拠: `engmv-eigenvalues-covariance-2x2`、`engmv-eigenvectors-covariance-2x2`、`engmv-pca-explained-ratio`、`engmv-standardized-pca-2x2`、`engmv-pca-monitoring-score` は、固有値・固有ベクトル、寄与率、主成分得点を扱うが、Rayleigh商を最大化して主成分方向を得る技能と、主成分負荷量 $\operatorname{Corr}(X_i,Y_j)=\sqrt{\lambda_j}v_{ij}/\sigma_i$ を定義・計算する技能を問わない。
   - C21には `mv-pca-variance-max` と `mv-pca-loading` があるが、両IDはengineering側coverageに記録されず、engineeringページだけを学ぶ読者には届かない。逆に同じ計算をそのまま複製すればカード間重複になる。
   - 影響: sourceのA 2件のうち1件がC23の中心技能になっておらず、線形代数を応用へ結び付ける公式ねらいの中核が欠ける。
   - 必要な修正: C21の一般導出と役割を分け、工程・物性などの具体的な分散共分散行列についてRayleigh商の最大化条件から第1主成分を選ばせるAカードを追加する。主成分負荷量は、固有ベクトル・固有値・元変数の標準偏差から数値計算し、係数・得点・負荷量を区別させるBカードを追加する。coverageへ両IDを対応付ける。

2. 既存C21との役割分担が明示されないまま同じ技能の数値例が重なり、42枚の中で基礎反復が応用技能より優先されている。
   - 根拠: `engmv-covariance-linear-transform-matrix` と `mv-covariance-linear-transform`、`engmv-mahalanobis-distance` と `mv-mahalanobis-distance`、`engmv-pca-explained-ratio` と `mv-pca-contribution-rate`、`engmv-fisher-discriminant-direction` と `mv-lda-direction`、`engmv-ward-merge-increase` と `mv-ward-increase` は、数値だけを変えて同じ公式・同じ到達行動を問う。`engmv-canonical-correlation-diagonal` と `engmv-canonical-eigenvalue` も、いずれも白色化済み対角行列の対角成分から正準相関を読むほぼ同一技能である。
   - 一方、PCAの分散最大化・主成分負荷量は上記major 1のとおり不足し、Hotellingの検定判断は `engmv-hotelling-two-sample` で $T^2=7.5$ を求めるだけで、F変換後の棄却判定まで完遂しない。
   - 影響: カード枚数は目安40–50枚を満たすが、「重複させず、再生・計算・判定技能を充足する」という作業目的に対して配分が不適切である。
   - 必要な修正: 上記重複対の新規カードは、C21より一段進んだ工学的判断へ置き換える。例えば共分散変換は単位変換後の相関不変性、Mahalanobis距離は管理限界との比較、PCAは負荷量解釈、Fisher判別は分類境界、Ward法は複数候補から併合対を選ぶ問題とする。正準相関2枚は一方を一般の非対角行列の固有値計算へ変更するか1枚へ統合する。HotellingはF変換と有意水準での判定を完遂するカードを用意する。

### minor

1. `engmv-classical-mds-three-points` の答えが `$x_1=-1,qquad x_2=0,qquad x_3=1$` となり、2か所で `\qquad` のバックスラッシュが欠けている。
   - 影響: 配信画面で `qquad` が変数列として表示され、座標の列挙が読みにくい。
   - 必要な修正: 2か所とも `,\qquad` に直す。

2. `anki/formulae.md` に追加されたC23の公式で使う主要記号が、節冒頭または `anki/notation.md` で十分に定義されていない。
   - 根拠: $d_M$、$T^2$、$S_p$、$c_j$、$y_{ij}$、$h_i^2$、$\boldsymbol w$、$\Delta(A,B)$ がformulaeの式に現れるが、節冒頭の記号説明にもnotationの多変量解析節にも意味がない。カード内では多くが定義されるものの、formulaeを単独で読むと未定義語になる。
   - 必要な修正: `anki/notation.md` の多変量解析節へ標準的な意味を追記するか、formulaeの各公式に短い局所定義を添える。

3. `engmv-hotelling-two-sample` は参照タイトル345への中心カードだが、カードの主問題が統計量計算で止まり、検定の最終判断が「計算例」の一般式だけに置かれている。
   - 影響: 検定統計量を再生・計算する技能はあるが、F分布の自由度を選び棄却・非棄却を判定する技能を直接反復できない。
   - 必要な修正: major 2の役割再配分時に、数値臨界値またはP値を与えてF変換から結論まで完遂する独立カードを追加する。

## ねらい適合性

- 公式term5件は、`engmv-normal-density-numeric` から条件付き正規分布・Wishart分布・Hotelling統計量まで、平均ベクトル・分散共分散行列・相関行列・固有値計算まで実質的に扱われている。定義再生だけでなく行列積、逆行列、二次形式、固有値問題の具体計算があり、「数理的な側面を正しく理解する」には概ね適合する。
- `engmv-pca-monitoring-score`、LDA/QDA、階層的クラスタリング、k-means法、MDSは応用場面への接続を持つ。特に標準化の要否、事前確率、初期重心、距離の非一意性などの条件判定は試験対策上有用である。
- ただし、線形代数からPCAへ至る中核である分散最大化がC21任せで、C23では固有値を計算した後の適用に飛んでいる。公式ねらいをC23単独で満たすにはmajor 1の補強が必要である。

## 知識充足性

- 343は標本平均・標本分散共分散行列・相関行列・線形変換、344はMahalanobis距離、345は2標本Hotelling、347–348・350は固有値問題・寄与率・標準化PCAで対応する。
- 351–353は因子モデル、共通性・独自性、直交回転の不変性をそれぞれ具体計算する。354–355はLDA/QDA、事前確率、プール共分散、Fisher方向まで扱い、356–357は階層法、Ward法、k-means法の割当・更新・評価を扱う。358–359も正準相関とMDSの基本計算を持つ。
- 346の分散最大化と349の主成分負荷量はC23内で不足する。345は統計量計算を充足するが、検定判断までの技能が弱い。
- 既存engineering4枚 `multi-linear-combination`、`multi-covariance-psd`、`multi-pca-eigen`、`multi-conditional-normal` は、新規の線形結合、共分散行列妥当性、固有値・条件付き正規の入口として再利用できる。これらと新規カードの数値設定は異なるが、新規側の目的を「計算拡張」と明示しないと重複感が残る。

## 過不足

- 不足: PCAの分散最大化、主成分負荷量、HotellingのF変換から検定結論までの完遂。
- 過剰: 多変量正規分布の密度・周辺・条件付き・精度行列・Wishart分布・信頼楕円は数理基盤として有用だが、343–359の中では1つの基礎枠に対して枚数が厚い。A優先PCA中核より先に配分する根拠は弱い。
- 重複: major 2の5組と正準相関2枚は、現在のままでは同じ到達行動の反復である。因子分析はC21が一般式・目的、C23が数値計算・不変性を担うため役割分担が成立している。k-means法はC21の1反復全体に対しC23が割当と重心更新を1カード1論点へ分解しており、学習段階として許容できる。
- 配信・検索: 42枚のsubcategory、ID、coverage対応は機械的に整っている。ただし意味上のcompleteはmajor 1・2を解消するまで保留すべきである。

## 優先度根拠

- sourceのAは343「多変量平均ベクトルと共分散行列」と346「主成分分析：分散最大化」の2件である。前者は複数カードで十分に計算できるが、後者がC23内にないため優先度配分がsourceと一致しない。
- B 14件はMahalanobis距離、Hotelling、PCA固有値・寄与率・負荷量・標準化、因子分析、判別、クラスタリング、MDSであり、広範囲を一巡している。ただし同じB技能の重複例より、未充足の負荷量と検定判断を先に置くべきである。
- Cは正準相関分析1件だけである。`engmv-canonical-correlation-diagonal` と `engmv-canonical-eigenvalue` をともにpriority Cとした点はsourceと整合するが、ほぼ同一の対角例を2枚置く優先度は低い。1枚を一般行列の計算へ発展させないなら統合が妥当である。

## 機械検証

- `npm run anki:validate`: 成功。1154 cards、0 warnings、25 category pages、最大200枚。
- `npm run validate`: 成功。構造検証、358 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を完了。
- KaTeX strict検証は数式中の通常文字列 `qquad` を受理するため、表示上の誤記は手動査読指摘として残す。

## 初回集計

- fatal: 0
- major: 2
- minor: 3
- fatal: 0 / major: 2 / minor: 3

## 修正確認

- final_reviewer_id: c23_exam_review
- final_reviewed_at: 2026-08-22T11:22:23Z
- 再査読範囲: 初回指摘箇所だけでなく、新規2枚を含む全44枚、既存 `engineering-multivariate` 4枚、C21 `applied-multivariate` カード群、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml` の作業単位全体

### 初回majorの確認

1. PCAの分散最大化・主成分負荷量
   - `engmv-pca-rayleigh-process-variance` が、工程特性の分散共分散行列についてRayleigh--Ritz定理を明示し、特性方程式、最大固有値、固有ベクトルの正規化、最大分散まで完遂する。priority Aでタイトル346の中核技能を直接測定する。
   - `engmv-pca-loading-numeric` が、主成分負荷量を変数と主成分の相関として定義し、$\ell_{ij}=\sqrt{\lambda_j}v_{ij}/\sigma_i$ へ数値を代入する。主成分係数と負荷量を区別し、タイトル349を充足する。
   - `anki/formulae.md` に主成分負荷量公式、`anki/notation.md` に $\ell_{ij}$ の定義、coverageに両カードIDが同期された。初回major 1は解消した。

2. C21との役割分担と技能配分
   - `engmv-unit-change-correlation-invariance` は単なる共分散行列変換から、単位換算後の相関不変性の実証へ変更された。正負の換算係数についても、一方だけが負なら符号反転、同符号なら不変と正確に限定された。
   - `engmv-mahalanobis-control-limit` は距離計算だけでなくカイ二乗管理限界との比較と工程異常の判定まで行う。`engmv-fisher-discriminant-direction` は方向計算後に射影平均と分類境界を求め、新観測の分類まで完遂する。
   - `engmv-ward-merge-increase` は3候補の平方和増加をすべて計算し、最小の併合対を選ぶ。C21の1組の増加量計算から意思決定技能へ進んだ。
   - 正準相関は、`engmv-canonical-correlation-diagonal` が白色化済み対角例で特異値を読む入口、`engmv-canonical-eigenvalue` が非対角交差共分散行列の積を作り固有値を計算する発展例となり、役割が分かれた。
   - `engmv-hotelling-two-sample-decision` が $T^2$ を正しい自由度のF統計量へ変換し、5%臨界値と比較して非棄却を結論する。初回major 2とminor 3は解消した。

### 初回minorの確認

1. `engmv-classical-mds-three-points` の座標列挙は2か所とも `\qquad` に修正され、配信数式として正しく表示される。
2. `anki/notation.md` に $d_M,T^2,S_p,c_j,y_{ij},h_i^2,\boldsymbol w,\Delta(A,B)$ の意味が追加され、formulaeの未定義記号は解消した。追加された主成分負荷量もformulaeとnotationの双方へ同期された。
3. Hotelling検定の判断技能は上記の追加カードで解消した。

### 全体再査読

- 全44枚は「問題 → 記号・用語 → 使用公式・定理 → 一手／方針 → 答え → 計算例 → 注意」の7節を各1回ずつ持つ。定義再生、行列計算、公式適用、条件判定、工学的解釈を1カード1論点で反復できる。
- 公式terms5件は、多変量正規分布の密度・周辺・条件付き・独立性・標本分布、平均ベクトル、標本分散共分散行列、相関行列、固有値・固有ベクトルの計算で実質的に充足する。`coverage.yaml` のstatus `complete` と各termのカード対応は意味上も妥当である。
- title_ids 343–359は全件に対応する。A優先343は平均・共分散・相関・線形変換、A優先346はRayleigh商による分散最大化を具体計算する。B優先14件はMahalanobis管理判断、Hotelling検定、PCA固有値・寄与率・負荷量・標準化、因子分析、判別、クラスタリング、k-means法、MDSを扱う。C優先358は2段階の正準相関カードに限定される。
- C21との重複は、一般公式・単一計算から工学的な判定・比較・解釈への段階的拡張として整理された。因子分析はC21の一般式・目的に対しC23が数値計算と回転不変性、k-means法はC21の1反復全体に対しC23が割当・更新の1論点分解を担うため、不要な複製ではない。
- 多変量正規分布・Wishart分布・信頼楕円は参照タイトルの基礎側を厚くするが、44枚は目安40–50枚に収まり、A優先PCA中核を補った後の数理基盤として許容できる。削除すべき過剰カードはない。
- `anki/formulae.md`、`anki/notation.md`、`anki/syllabus/coverage.yaml` は、新規カードの主要公式・記号・カードIDと同期している。カード本文にも使用公式と局所定義が再掲され、別ファイル探索を前提としない。

## 再査読時の機械検証

- `npm run anki:validate`: 成功。1156 cards、0 warnings、25 category pages、最大200枚。
- `npm run validate`: 成功。構造検証、360 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を完了。

## 最終件数

- fatal: 0
- major: 0
- minor: 0
- fatal: 0 / major: 0 / minor: 0
