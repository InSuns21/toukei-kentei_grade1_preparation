# DREAM THEATER スペクトルグラフ理論 — 独立科目PLAN

作成日: 2026-10-10  
再設計: 2026-10-12  
状態: completed（2026-10-12、SGT1〜SGT8・系列横断監査・公開導線確認を完了）

## 0. 中心問い

グラフの組合せ構造が、Laplacian の固有値・固有ベクトル・random walk を通じてどこまで読めるのか。多様体学習のためだけの graph Laplacian 補講ではなく、**独立したスペクトルグラフ理論の科目**とする。

## 1. 前提と正本境界

- 既存正本: LA の対称行列・Rayleigh quotient・スペクトル; 確率論の有限 Markov chain の基礎（未修なら本科目の必要部分で定義）。
- 本科目: weighted graph、combinatorial / normalized / random-walk Laplacian、Cheeger 型不等式、spectral partition、random walk と mixing、effective resistance、スペクトル摂動。
- GEO/幾何解析 PLAN: 滑らかな多様体・Laplace–Beltrami・熱核。
- **MFL1**: `n` 点の幾何データからグラフを構成した場合の連続 Laplace–Beltrami への近似、密度補正、bandwidth/boundary と標本揺らぎ。これらはグラフの純粋な数学的性質と混同せず、MFL1 側を正本とする。

## 2. 証明のまとまりから章を設計する

次のA〜Fは**学習ブロック**であり、1ブロック＝1講・1章ではない。講数・週数を固定せず、グラフの具体計算・重要な定理の証明・反例・詳細解答を独習者が再現できる単位に分割・統合する。

### A. 有限グラフのLaplacian

- 重み付きグラフ、隣接行列、次数、体積、cutの定義。
- 組合せLaplacian L=D-Aの半正定値性、Dirichletエネルギーの辺ごとの和による証明。
- 連結成分と核の次元、固有値分解をpath・cycle・complete graphで計算する。

### B. 正規化とrandom walk

- 対称正規化Laplacianとrandom-walk Laplacian、零次数の頂点における逆行列の定義域。
- 正規化固有値、重み付き内積、遷移確率、詳細釣合い、定常分布を結び付ける。
- Rayleigh–Ritz、min–max、スペクトルギャップを導く。

### C. CutとCheeger型不等式

- conductanceの定義と固有値の正規化を固定し、Cheeger型不等式の両方向を証明する。
- sweep cutを構成し、定数・次数・体積の条件を追う。

### D. 分割と摂動

- spectral clustering、ratio cut／normalized cut、固有ベクトルを使う緩和問題。
- graph perturbationとDavis–Kahan型安定性。固有値間隔を明示し、既存LA／FAを使う箇所にリンクする。
- 固有空間の推定と真のクラスタの回復を混同しない。

### E. 混合と電気ネットワーク

- random walk mixingをspectral gapから評価し、連結性・非周期性（必要ならlazy walk）を条件に含める。
- electrical network、effective resistance、Laplacian擬似逆とspanning treeの入口。weighted pathで検算する。

### F. 点群グラフと連続極限への橋

- random geometric graph・近傍グラフの構成、有限グラフのスペクトルとエネルギー。
- continuum Laplace–Beltramiへの近似や標本誤差の一般理論はMFL側に引き渡す。
- 二つのcliqueを一辺でつないだグラフなどで、conductance・固有値・mixingを横断して計算する。

## 2.1 系列章の配置（固定講数ではない）

- SGT1（completed）: 重み付きグラフ、組合せLaplacian、Dirichletエネルギー、連結成分と核、有限例・cutの入門。
- SGT2（completed）: 正規化Laplacian、零次数、ランダムウォークの遷移行列と定常分布。
- SGT3（completed）: 正規化されたconductanceとCheeger型不等式・sweep cutの完全証明。
- SGT4（completed）: ratio cut / normalized cut とスペクトル緩和・クラスタリング。
- SGT5（completed）: 固有値ギャップとDavis–Kahan型摂動評価。
- SGT6（completed）: lazy walk、非周期性、混合時間とスペクトルギャップ。
- SGT7（completed）: 有効抵抗、擬似逆と電気ネットワーク。
- SGT8（completed）: 点群グラフ、連続極限への責任境界、橋で結んだグラフなどの科目横断演習。

各章は主要定理・演習の完備性に応じて分割・統合してよく、上記は15週の時間割ではない。SGT1〜SGT8完了後、2026-10-12に全系列の依存・公開導線・数理横断照合を終え、PLANを完了判定した。

## 3. 最重要の区別

- graph Laplacian、normalized graph Laplacian、continuum Laplace–Beltrami は演算子が異なる。内積・正規化・境界条件・重みを固定する。
- `D^{-1/2}` や `D^{-1}` は孤立頂点で定義できない。零次数の除外または規約を明示する。
- Cheeger inequality の conductance の分母・固有値正規化による定数の違いを監査する。
- graph 上の random walk の mixing では連結性・非周期性（例: lazy walk）などの仮定を明示する。
- スペクトルクラスタリングで固有空間が得られることは、任意の真のクラスタが回復できることを保証しない。
- 点群の KNN グラフ構築 → manifold operator 近似は MFL1 の標本誤差定理へ引き渡す。

## 4. 代表例と完成条件

path, cycle, complete graph, 二つの clique を1辺でつないだ graph、weighted path を計算し、固有値・conductance・random walk を比較する。少なくとも Cheeger 型評価と graph Laplacian の Dirichlet 表現を証明し、有限 graph と連続 limit の主張を混同しない。

SGT系列の章IDは SGT1〜SGT8 と確定した。SGT1 は F0-00F1 を直接前提とし、2026-10-12 に本文・概念依存・演習を実装した。SGT2は2026-10-12に正規化Laplacian・定常分布・変分表示を実装した。SGT3は2026-10-12にCheeger不等式の両方向・sweep cutと詳細演習を実装した。SGT4は2026-10-12にRatio Cut・Normalized Cut・二値指示ベクトルのRayleigh商・固有値緩和・多群trace表示と演習10題を実装した。SGT5は2026-10-12にWeyl評価、Davis–Kahan型の下位空間・単純固有ベクトル評価、正規化Laplacianの次数摂動、閾値余裕と反例、演習9題を実装した。SGT6は2026-10-12にlazy walk、全変動距離、スペクトル混合時間の上下界、二部性による非収束、三角形の厳密計算、演習9題を実装した。SGT7は電気ネットワーク・擬似逆・二つの最小エネルギー原理・重み付き全域木の証明と演習9題を2026-10-12に実装した。SGT8 は2026-10-12に半径・対称化近傍グラフ、閾値の余裕と固有値摂動、一本橋グラフのconductance・正規化スペクトル・lazy混合下界・有効抵抗、演習9題を実装した。系列manifestを completed に更新し、2026-10-12にSGT1〜SGT8の系列横断監査・公開導線の最終完了判定を実施した。各変更章に初出定義の直接例、主要証明、Level A 4題・B 3題・C 1題以上（理由付き例外を除く）の演習と全詳細解答を備える。主要証明と全演習を再計算し、別観点で再査読する。別の完了章の追跡監査は章ID指定の明示依頼がある場合のみ行う。chapter ID競合、knowledge DAG、参照リンク、学習導線、公開索引とCIを検証し、講数でなく学修目標の充足をもって完成とする。

## 5. 最終系列横断監査・完了判定（2026-10-12）

この節はPLAN全体のクローズ判定記録であり、各章の個別査読記録や全証明の独立第三者査読を意味しない。

- **実装・進捗**：`textbook/dream-theater-series/SGT.yaml` のSGT1〜SGT8が全て `completed`。各章の `chapter.yaml` と `knowledge.yaml` で直接prerequisitesが一致し、対応する本文・定義・主要結果・演習が存在する。
- **演習・構造**：実本文の演習は合計76題（Level A 36、B 32、C 8）。各章のA4/B3/C1下限を満たし、全76題の `solution-start/end` が対応する。45件の `proof-start/end` と各章のformal-statementマーカーも対応する。孤立頂点の逆次数、正規化、連結性、有限点群と連続極限の責任境界を各章の代表定理・例・演習で横断照合した。
- **依存・リンク**：SGT1〜SGT8内のstable-anchor付きMarkdown参照225箇所について、対象ファイルとfragmentの実在を照合し、欠落0件。参照先にはSGT系列内のほか、直接必要なF0-00F1、F0-00E2、LA3Bの正本を含む。
- **公開導線**：`textbook/dream-theater-index.json` の計算系と `textbook/dream-theater.md` の「スペクトルグラフ理論」に、SGT1〜SGT8の本文全8件が重複なく登録されていることを確認。SGT8の直近改稿PR #1100ではtextbook / exercise / concept / terminology / Pages assemblyの5ワークフローがsuccess。
- **数理横断検算**：SGT1〜SGT3・SGT6・SGT7を共通の3頂点道（重み1）へ適用した。$d=(1,2,1)$、組合せLaplacianの固有値は $0,1,3$、対称正規化Laplacianの固有値は $0,1,2$。全非自明cutのconductanceは $1$ でCheeger評価 $1/2\leq1\leq2$ と整合する。lazy walkでは固有値 $1,1/2,0$、定常分布 $\pi=(1/4,1/2,1/4)$。頂点1から1歩の分布は $(1/2,1/2,0)$、全変動距離 $1/4=(1/2)(1/2)$ で混合下界を検算した。端点間の有効抵抗は直列の2辺から $2$ となり、Laplacian擬似逆の式でも一致する。
- **完了判定**：A〜Fの主要学習ブロック、依存と公開導線、必要な系列横断照合を満たし、PLAN固有の残タスクはない。SGT8までの章別査読に加え、同一担当による系列横断の別観点照合を行った。第三者による独立査読は称さない。SGT系列PLANは履歴として `textbook/plan_done/` に保存する。

参考範囲: Fan Chung, *Spectral Graph Theory*; Daniel Spielman, *Spectral and Algebraic Graph Theory*（公開講義ノート）; Ulrike von Luxburg, “A Tutorial on Spectral Clustering”.
