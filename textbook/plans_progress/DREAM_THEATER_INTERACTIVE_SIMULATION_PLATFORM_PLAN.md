# DREAM THEATER 対話型数値シミュレーション共通基盤 PLAN

設計日: 2026-10-14  
着手日: 2026-10-14  
状態: in_progress（Phase 0：通信契約・2模型の基準カーネル・headless検証を追加。Phase 1以降のWorker・UI・配信は未実装）

## 0. 対象、中心問い、位置付け

**物理の時間発展と機械学習の反復推論を、数理的意味を混同せずに同じ操作・表示・実験保存の仕組みで動かせるか。**

本PLANは科目PLANの上位に立つ数学的正本ではなく、**GitHub Pages上の対話型計算実験に共通するソフトウェア基盤の実装計画**である。現行の直接利用者は次の2科目とする。

- [CELEV：変分的周期軌道・n体舞踏解と数値シミュレーション](../plans/DREAM_THEATER_N_BODY_VARIATIONAL_PERIODIC_ORBITS_SIMULATION_PLAN.md)：Newton方程式・Verlet積分・変分的周期軌道探索。
- [ML I・II：機械学習](DREAM_THEATER_MACHINE_LEARNING_I_II_PLAN.md)：標本抽出・勾配法・SGD・EM・MCMC・確率的推論・深層学習と生成模型。

将来のODE/PDE/最適制御教材が使う場合も、共通基盤への依存は**ソフトウェアAPIに限る**。学修prerequisites・knowledge DAG・定理のcanonical ownershipを横断して統合しない。CELEV/MLの章ID・執筆進捗は各系列manifestが所有し、本PLANに系列manifestや未実装章の公開索引を作らない。

## 1. 現在の資産と非変更範囲

2026-10-14の着手時にGitHub実ファイルを確認した。

- [`pages/numerical-lab-runtime.js`](../../pages/numerical-lab-runtime.js)：一回実行型のPython演習、結果表示、保存と中断。常駐型対話実行の共通エンジンはない。
- [`pages/numerical-lab-worker.mjs`](../../pages/numerical-lab-worker.mjs)：Pyodideでコード＋テストを一回実行し、標準出力・Matplotlib PNG等を返す。
- [`textbook/NUMERICAL_LAB_AUTHORING_STANDARD.md`](../NUMERICAL_LAB_AUTHORING_STANDARD.md)：`python-lab` / `python-solution` / `python-test` の学習用契約。新たな連続計算UIとは別。
- [`pages/service-worker.js`](../../pages/service-worker.js)：オフラインと数値ランタイムの配信キャッシュ。後方互換とキャッシュ更新を必ず確認する。

**既存の穴埋め演習・実行タイムアウト・進捗キー・出力形式を直接書き換えて新Runtimeに置換しない。** 演習コードから対話UIへ移動できる導線は提供しても、コード記述・テスト用の一回実行契約を維持する。

## 2. 共通責務と科目固有責務

| レイヤー | 共通基盤が所有 | 科目側が所有 |
|---|---|---|
| 起動と終了 | Workerのライフサイクル、初期化・停止・再開・破棄、処理中と失敗のUI | 数値カーネルの初期値、構成・後始末 |
| 反復進行 | `runBatch` / `singleStep`、バッチ境界、キャンセル、古い世代の結果破棄 | 物理時間刻み・epoch・MCMC試行・変分反復など**ステップの意味** |
| パラメータ | 入力バリデーションの仕組み、変更時の新世代生成、再実行 | 質量、速度、学習率、seed、正規性・可逆性等のモデル別制約 |
| 可視化 | Canvas/HTML/SVG描画アダプター、軸・凡例、ズーム、系列選択 | 軌道/保存量、loss/accuracy、trace/密度等のデータ意味 |
| 記録 | experiment ID、設定・seed・実装版・結果のJSON/CSV export | 真値、誤差、残差、単位、確率的保証と診断解釈 |
| 試験 | 同期・旧ジョブ排除・資源制限・ブラウザ実操作 | Newton保存量/収束、SGD勾配、EM尤度、確率分布等の数値正当性 |

**共有しない数値アルゴリズム**：CELEVのNewton加速度、velocity-Verlet、離散作用・変分勾配、衝突検出と保存量、MLのモデル/損失/最適化、SGD、EM、MCMC、逆伝播、生成モデル。両者に最適化が現れることを理由に特定の勾配降下実装へ強制統合しない。共通の乱数APIも確率過程の意味やサンプラーを隠さない。

## 3. 抽象化の最小単位・プロトコル

### 3.1 ExperimentAdapterの契約

科目側が次のインターフェースを満たす薄いアダプターを渡す。実装言語はJSまたはPython/NumPy（専用Worker内）を許し、UIと数値計算を分離する。

```text
ExperimentAdapter
  validateParameters(params) -> parameterErrors
  initialize(params, seed) -> state, diagnostics
  stepBatch(state, steps, limits) -> state, observations, diagnostics
  snapshot(state) -> serializableSnapshot
  dispose(state) -> void
```

- `steps` は**各分野の反復回数**であり、物理時間・epoch・学習時間に読み替えない。結果には `stepIndex` と、適用可能な場合のみ `physicalTime` / `epoch` / `sampleIndex` 等の**明示ラベルと単位**を添付する。
- 反復を必要としない独立標本抽出や閉形式の計算は、同じUIを利用する`computeOnce`型のアダプターでよい。無意味な擬似時間を導入しない。
- カーネルの数理定義・仮定・収束/保存性・ランダム性はアダプターが宣言する。表示層が計算値を推測したり、グラフ描画用補間を新しい物理解として返したりしない。
- 初期化・結果スナップショットはJSON互換のメタ情報と、必要に応じて所有権を明示した転送可能な数値配列を分ける。

### 3.2 Workerメッセージと状態機械

**最初の実装で固定するプロトコルバージョンは`1`**。具体的な型定義と正誤例は共通Runtime着手PRで併記する。要求には少なくとも `protocolVersion`、`sessionId`、`requestId`、`generation`、`engineId`、`experimentId` を付ける。

| リクエスト | 役割 | 応答 |
|---|---|---|
| `initialize` | params/seed/資源上限を検査し初期状態を生成 | `ready` + 診断と初期snapshot |
| `computeOnce` | 単発計算を新しい世代で実行 | `result` + 有限な結果と診断 |
| `runBatch` | 上限付き計算バッチを実行 | `progress` / `result`（世代とstepIndex付） |
| `singleStep` | 1回分の意味ある反復を実行 | `result` |
| `pause` / `resume` | **バッチ境界で**停止/再開 | `paused` / `running` |
| `updateParameters` / `reset` | 既存世代を無効化し再初期化 | 新世代の`ready` |
| `cancel` / `dispose` | 計算の中断要求/資源解放 | `cancelled` / `disposed` |
| 全操作の失敗 | 検証/演算/実行基盤のエラー | `error` + 種別/説明/再試行可否 |

状態は `idle → initializing → ready → running ↔ paused → ready/disposed` を基本とし、`error`はどの計算状態からも遷移可能。不能な操作は明示的に拒否する。古い`generation`や異なる`requestId`の結果は描画・保存へ反映しない。

`pause`は重い同期計算を即座にプリエンプトできないので**小さいバッチ境界で応答**する。停止要求に応答しないWorkerは期限と上限に従ってterminateし、次の`initialize`で復旧する。破棄後のメッセージ受信を無害化する。複数の同時実行は先に設定した上限で拒否/待機させ、Pyodideインスタンス増殖を避ける。

### 3.3 可視化と診断データ契約

- 共有表示は `scatter`（点群/軌跡）、`line`（時間/反復の系列）、`heatmap`（密度/Attention等）、`histogram`、`table` の**データ駆動アダプター**を最小集合とする。アダプターは軸・尺度・次元・単位・凡例・色以外の区別方法と表示可能範囲を指定する。
- CELEV側は位置/速度/保存量/最小距離、ML側は損失/勾配/分布/確率/尤度などを自ら生成する。保存量をloss扱いしたり、サンプル時刻を物理時刻として描かない。
- 表示の間引き・描画フレームレートを、数値積分刻みやサンプリングの試行回数と混同しない。転送量・描画量に上限を持ち、精度に影響する場合は明示する。
- UIはキーボード操作、適切なlabel/aria、ズーム・軸の単位、色以外の線種/記号による識別、小画面での軸・ラベル衝突防止を受け入れ条件とする。

## 4. 再現性・計算誠実性・安全装置

1. **記録**：experiment ID、engine ID/版、protocol版、入力、rng algorithm/seed、生成データ版、表示/計算ステップ数、停止理由、環境の主要versionをJSONで保存。時系列は必要な範囲でCSV exportする。ブラウザローカル計算を基本とし、個人データを外部送信しない。
2. **再計算**：同一実装/seed/設定での再現可能性を固定テストで検証する。JS/Python間の浮動小数点結果は丸め・実装差を考慮し誤差許容値付き比較とし、ビット完全一致を無条件要求しない。
3. **数理検算**：UI側の成功メッセージより、独立した小問題の手計算・解析解・残差検証を優先する。CELEVは2体円軌道・保存量・刻み幅検証、MLは4セル分布の母集団リスク・正規方程式・EM尤度・勾配差分等を別モジュールで検査する。
4. **失敗可視化**：NaN/∞、分布確率の不正、特異行列、衝突、発散、未収束、Worker停止、Pyodide読込失敗を成功として隠さない。計算が失敗した場合も最後に確認できた状態/診断と理由を表示する。
5. **資源制限**：実行回数・総CPU時間・バッチ時間・転送サイズ・記録長・メモリ上限を定める。ワーカー終了で復旧できるようcheckpoint境界を設計する。永続保存はサイズ制限と旧版読込拒否/移行方針を持つ。
6. **公開検証**：オンライン初回起動、再訪・キャッシュ更新、オフライン時の分かる失敗表示、複数画面遷移、非表示タブ復帰、低性能端末での応答性を調べる。再現用JSONから再実行できることと、変更されたパラメータが数値カーネルへ伝播することをブラウザ試験で立証する。

## 5. 実装方針・フォルダの責任分離（候補パス）

パスは**候補**であり、着手時に既存ビルド/Service Worker/Pyodide契約と衝突を検証して確定する。Phase 0 の `protocol.mjs` と受け入れ模型は追加済み。Worker/UI/保存・可視化はまだ存在しない。

```text
pages/simulation/                 # 新しい共通UI/Workerクライアント（候補）
  simulation-runtime.js           # 状態遷移、メッセージ検証、世代管理
  simulation-worker-host.mjs      # 計算カーネルを載せる専用Workerホスト
  plot-adapters.js                # 可視化のデータ契約と共通軸
  experiment-record.js            # seed、設定、ログの検証/保存/出力
  engines/celev/                 # CELEV固有Newton・変分カーネル
  engines/ml/                    # ML固有サンプリング・最適化・推論
scripts/validate-simulation-*.mjs # プロトコル/描画/エンジン数値検証（候補）
```

既存Python一回実行ラボと新Workerホストは分離する。CELEVは数値部分に専用Pyodide/NumPy Workerを優先、MLでは有限4セル・2次元小問題の軽量JSエンジンを認める。**同じUI・実験記録・メッセージ契約を守れば、全分野にPythonを強制しない**。Python↔JSの計算境界は代表的な固定模型で検算する。

## 6. 実装段階と必要な成果物

### Phase 0: 共通契約と受け入れ模型を固定

- [x] 現行のPythonラボ、service worker、Pages assembly、テスト入口を再確認（既存コードは変更しない）。
- [x] JSON schema相当のメッセージ定義と状態遷移表、protocol=1・負例のheadlessテストを作成（Workerへの接続はPhase 1）。
- [x] 同じ共通adapter契約で2模型の基準式を固定：**CELEV二体円運動（実時間積分）**、**ML1-01有限4セル標本抽出（単発・乱数実験）**。Phase 0 は独立したJSの受け入れカーネル。CELEV側の本番Python実装はPhase 2。
- [x] 実機入力遅延・メモリ・初回起動時間の測定項目と観測条件を固定（[Phase 0仕様](../../pages/simulation/README.md)）。**実測と閾値設定はPhase 1以降**。

### Phase 1: 共通Runtime・可視化・保存

- [ ] Workerホスト、セッション/世代管理、`computeOnce`/`runBatch`/`pause`/`reset`/`dispose` を実装。
- [ ] line/scatter/heatmap/tableの共通描画とエラー画面、設定JSON・診断/CSV出力を作る。
- [ ] 計算APIのheadlessテスト、ブラウザ操作テスト、エラー/旧応答/メモリ制限・再訪キャッシュテストを追加。

### Phase 2: 二科目による共通化検証

- [ ] **CELEV固有**：Python側のNewton＋Verletで二体円運動を初期値変更から再計算し、軌道・保存量・刻み幅を検証。次に変分最適化・8の字検証へ拡張（数学的完了はCELEV PLANが所有）。
- [ ] **ML固有**：有限4セルの真の母集団リスクとseed付き標本反復を再計算し、確率和・経験リスク・再現性・UI連動を検証。次に勾配降下/EMなどへ拡張（教育的完了はML PLANが所有）。
- [ ] 共通UIの再利用率だけでなく、**追加教材の実装手順とテストが短くなり、分野固有の例外が無理なく分離できているか**を評価。早すぎる抽象化による複雑化があれば局所コードへ戻す。

### Phase 3: 完了・移管

- [ ] CELEV/ML側の該当PLANに実際の実装パス・protocol版・実験IDと数値テスト参照を記録。
- [ ] 既存Pythonラボの実行/保存/表示/テストが変わらず通ることを確認。
- [ ] 共通基盤のheadless、Playwright等の実ブラウザ、配信/キャッシュ・性能/アクセシビリティをCIで検証。
- [ ] 共通基盤の実装とテスト・直接参照が揃った時点で本PLANを `plans_progress/` → `plan_done/` に移す。設計のみの現在は `plans/` に留める。**CELEV/MLの章や系列を共通基盤完了だけでcompletedにしない。**

## 7. 完了判定・レビュー範囲

本PLANの完成は**共通RuntimeをCELEV/MLの2つの異なる模型で実操作できる**ことと、worker/描画/再現性・数値検算・Pagesの回帰テストが通ることによる。ソースコードだけ、事前録画の軌跡、固定SVG/GIF、見た目だけのアニメーションでは完成としない。

本変更はPLANの設計・責務整理のみであり、数値エンジン・UI/通信実装をまだ提供しない。CELEV/ML各講の証明・詳細演習・学習成果物は各PLANの査読規定で完成判定する。


## 8. Phase 0 着手成果物（2026-10-14）

- [protocol v1 / 状態遷移 / JSON制限](../../pages/simulation/protocol.mjs) — 純粋な契約検証。Workerの起動・同期は未接続。
- [CELEV二体円運動のVerlet受け入れ模型](../../pages/simulation/engines/celev/two-body.mjs) — 保存量・物理時刻の基準。
- [ML1-01四セル標本抽出の受け入れ模型](../../pages/simulation/engines/ml/four-cell.mjs) — 母集団リスク・seed・標本数の基準。
- [受け入れ試験と実機測定条件](../../pages/simulation/README.md)、[headlessテスト](../../scripts/validate-simulation-phase0.mjs)。Pages組立の冒頭から呼ぶ。CI合否はPRで確認。

**次工程:** Phase 1 の専用Workerとセッション状態機械、Canvas/HTML/SVGの表示アダプター、記録の再読み込み・export、および実ブラウザ/キャッシュ検証。これらが終わるまでは基盤完成や公開動作を主張しない。
