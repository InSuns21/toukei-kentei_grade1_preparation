# DREAM THEATER 変分的周期軌道・n体舞踏解と数値シミュレーション PLAN

作成日: 2026-10-13  
状態: in_progress（2026-10-14。CELEV1〜6を実装済み。CELEV7〜8とCELEV固有Python/数値シミュレーションは未完了）

## 0. 中心問いと停止線

**可積分でないNewtonのn体問題において、なぜ対称性を課した作用最小化から衝突のない周期軌道が存在すると証明できるのか。また、存在の証明と数値軌道の観測は何が違うのか。**

CELE1〜8の「三体問題の方程式・中心配置・非可積分性・KAM・カオス」を踏まえ、柴山允瑠『n体問題と変分法―周期解をめぐって―』の中心である**変分的存在論、衝突排除、8の字解、舞踏解**を扱う。既存のINT・CELE・AMECHの定義・証明をそのまま重複実装しない。

数学的存在証明の正本と、実際のNewton方程式を積分するブラウザ数値実験をセットで設計する。ただし数値実験は厳密存在証明・真の周期性・無限時間安定性の代わりではない。

- 仮講義ID: CELEV1〜CELEV8。節目・証明量に応じて追加/分割可。固定8講ノルマではない。
- **初期PLANの設計段階では教材・数値プログラムを実装しなかった。** CELEV1・2の章別実装を進めており、全章と数値成果物の完成までは本PLANを完了扱いしない。
- 停止線: 任意質量・任意対称群の周期解一般存在定理、全nに対する舞踏解、Morse/Floer全理論、Rigorous numericsによる8の字解の機械証明、n体一般の大域衝突正則化、GPU大規模n体。

## 1. 教科書・研究論文と既存PLANの照合

中心文献:
1. 柴山允瑠『n体問題と変分法―周期解をめぐって―』日本評論社（2024）
   https://www.nippyo.co.jp/shop/book/9379.html
   第1〜10章は力学・変分原理、最小点の存在、固定端点問題、周期ポテンシャル、特異ポテンシャル、中心配置、8の字解、舞踏解、最小点の証明、変分構造。
2. A. Chenciner and R. Montgomery, “A remarkable periodic solution of the three-body problem in the case of equal masses,” *Annals of Mathematics* 152 (2000), 881–901.
   https://annals.math.princeton.edu/articles/12364
3. D. L. Ferrario and S. Terracini, “On the existence of collisionless equivariant minimizers for the classical n-body problem,” *Inventiones Mathematicae* 155 (2004), 305–362.
   https://arxiv.org/abs/math-ph/0302022
4. K. R. Meyer, G. R. Hall and D. Offin, *Introduction to Hamiltonian Dynamical Systems and the N-Body Problem*（周期軌道・Hamiltonian理論との接続）。
5. J. Mawhin and M. Willem, *Critical Point Theory and Hamiltonian Systems*（minimax・非極小型周期解の発展）。
6. R. Montgomery, “N body animations and a tour”（歴史的8の字初期条件と数値検算資料）。
   https://people.ucsc.edu/~rmont/Nbdy/NbdyC1.html

GitHub上の既存正本:
- [AMECH3 作用積分とHamiltonの原理](../volumes/dream_thater/物理系/AMECH/AMECH3/index.md) — 第一変分の物理的入口。
- [CELE2 n体Hamilton系](../volumes/dream_thater/物理系/CELE/CELE2/index.md) — Newton方程式、衝突集合。
- [CELE3 中心配置](../volumes/dream_thater/物理系/CELE/CELE3/index.md) — Euler/Lagrange解、相似解。再証明しない。
- [CELE6 カオス](../volumes/dream_thater/物理系/CELE/CELE6/index.md)、[CELE7 共鳴・KAM](../volumes/dream_thater/物理系/CELE/CELE7/index.md)、[INT](../plan_done/DREAM_THEATER_INTEGRABLE_SYSTEMS_PERTURBATION_KAM_PLAN.md) — 非可積分性と安定性の区別。
- [VAR 変分問題](../plan_done/DREAM_THEATER_VARIATIONAL_PROBLEMS_GEOMETRIC_PLAN.md) — **直接法・Tonelli・無限次元臨界点理論を含むVAR9〜12を証明の正本**とする。
- [GPDE3 Sobolev空間](../volumes/dream_thater/解析系/GPDE/GPDE3/index.md)、[GPDE4 端点トレース](../volumes/dream_thater/解析系/GPDE/GPDE4/index.md) — 関数空間の基礎。区間上のcompact embedding/周期端点条件はVAR9で直接扱う。

未実装PLANの内容を既に証明済みと記述しない。着手時は各canonical stable anchorと実章を再検査する。

## 2. 主な数学的依存と証明境界

平面Newton n体、質量m_i>0、G>0、重心ゼロ・周期T>0の候補曲線q_i(t)で
- L = (1/2) sum_i m_i |q_i'|^2 + U(q),
- U(q) = G sum_{i<j} m_i m_j / |q_i-q_j|,
- A(q) = integral_0^T L dt。

衝突集合を除くNewton方程式は q_i'' = G sum_{j!=i} m_j(q_j-q_i)/|q_j-q_i|^3 である。許容曲線と拡張実数値の作用の定義を先に固定する。

存在証明で次を混同しない:
1. **Coercivity**: 並進・時間シフト・定数ループ等の非コンパクトな自由度を、重心制約・固定端点・対称性や規格化で適切に制御する。
2. **コンパクト性と下半連続性**: H^1の弱極限とC^0の一様収束を用い、特異積分の極限は必要な非負性/Fatouの仮定で扱う。**すべての最小化問題に単純なTonelli定理を無条件適用しない**。
3. **衝突排除**: 自由端点または対称制約の下でMarchal型局所変形が本当に許されるか確認する。対称クラス全体の極小はそれだけで非衝突と限らない。
4. **対称臨界性**: Palaisの原理は適用する関数空間、群作用の滑らかさ、有限群/コンパクト群等の仮定を確認して使う。
5. **非自明性・接合**: 得られた解が定数解/衝突解でなく、基本区間の対称延長がC^2解になることと周期を確認する。
6. **安定性**: 作用の極小性・Morse指数・Floquet乗数・KAM的安定性は別概念。数値軌道の閉じた見かけを存在証明に転用しない。

着手時にはVAR9〜12の既存本文とstable anchorを確認し、成立済みの正本を再利用する。未立証の仮定はCELEV内で明示して扱う。

## 3. CELEV講義群（仮ID）

### CELEV1 n体の作用と周期ループ空間
- CELE2・AMECH3から作用を導く。H^1_per([0,T];(R^2)^n)・重心拘束・衝突集合・拡張実数値作用。
- 固定端点問題と周期境界問題を比較。時間シフト、粒子置換、回転、位相対称性の具体例。
- 変分からNewton方程式、端点項、周期接合条件の導出。
- VAR9のH^1基礎を参照。非衝突がまだ示されない局面でEL方程式を仮定しない。

### CELEV2 最小化列と周期解の存在
- 決まった許容クラスでの作用の下界、Poincaré型評価、反射・時間シフト対称性による定数モード排除。
- 弱極限、端点条件の閉性、特異ポテンシャルの積分値の下半連続性。
- 周期的ポテンシャル系の具体例。**存在**と**非衝突・非自明**の別判定。
- VAR9〜10を一般理論の正本とし、n体に固有のコーシビティのみここで証明。

### CELEV3 特異ポテンシャル・衝突・局所変形
- 弱衝突/強衝突、二体衝突と全衝突、有限作用でも衝突する可能性。
- Marchalの衝突回避機構、作用が下がる局所変形、固定端点と対称制約での条件差。
- 単純化した例では計算を完結させ、研究論文級の一般定理は仮定を明記して外部定理とする。

### CELEV4 対称作用原理
- 時間の二面体群作用、平面回転・鏡映、粒子置換、equivariant loop space。
- 対称臨界性の証明可能な有限群モデル、群作用による最小化の許容クラス。
- 固定点空間の極小点が衝突しないことを保証するための追加条件。Ferrario–Terraciniの定理の正確な対象・仮定。

### CELEV5 等質量三体の8の字解
- Chenciner–Montgomeryの等質量・平面・重心零のモデル。
- 基本時間区間の対称性と三角形の形状空間、同じ曲線をT/3だけずらして辿る条件。
- 最小化列→極小解→衝突排除→変分的停留性→対称延長→8の字周期解を段階的に証明。
- 「存在」と「曲線の具体的初期条件」は別。後者は数値近似であって存在定理の入力にしない。
- 論文のどの補題を本文で完全再証明し、どの補題を外部定理とするかを着手時に台帳化する。

### CELEV6 n体舞踏解・組み紐と軌道分類
- choreography q_{i+1}(t)=q_i(t+T/n) の粒子番号規約とその検証。
- 対称性・置換作用、軌道のホモトピー/組み紐型、Hip-Hop系との違い。
- 全n・全対称性での存在を主張せず、仮定つき存在結果と具体例を区別する。

### CELEV7 周期軌道の第二変分・Floquetと安定性
- 周期変分でのHessian、Jacobi型線形化、モノドロミー行列、Floquet乗数、ゼロモード。
- 作用最小性と線形・非線形安定性の差。対称制約つきHessianと全変分のHessianの差。
- INT/CELEと接続し、フレームや拘束を除く手順を明記する。
- 変分的minimax・Morse indexの発展はVAR11〜12の正本を参照する。

### CELEV8 数値変分法と実際のn体シミュレーション
- 時間格子化された作用A_Nの構成、離散勾配・有限差分検算、対称性を保つ射影勾配法などの実装。
- 多数の初期経路から局所停留点/候補軌道を探索。初期候補への依存、特異性、非凸性を公開。
- 得られた格子経路から初期値を推定し、**別プログラムのNewton方程式積分**で軌道を検算する。
- 初期値探索は軌道の存在証明ではない。離散最適化の残差と連続Newton方程式の残差を別表示。

## 4. 実動作する数値シミュレーション（必須成果物）

**共通基盤との分担：** [DREAM THEATER 対話型数値シミュレーション共通基盤](../plans_progress/DREAM_THEATER_INTERACTIVE_SIMULATION_PLATFORM_PLAN.md)を、実行/停止・Worker通信契約・世代管理・表示アダプター・実験記録の正本とする。本章以下のPython数値カーネル、物理時間刻み、離散変分探索、保存量・衝突判定、数値許容誤差は**CELEV固有**であり、共通基盤へ移さない。共通RuntimeのPhase 0/1にJS基準模型とWorker/UIが実装済みだが、CELEV固有Python/NumPy物理・変分カーネルは未実装。共通Runtimeの基準模型を本番CELEVカーネルと混同しない。


### 4.0 実装アーキテクチャ：既存Pyodide優先・JavaScript描画

**初期方針はPython（Pyodide）で数値計算、JavaScriptで入力とCanvas 2D描画を担うハイブリッド構成。** 3体の物理積分・離散作用最小化をすぐJavaScriptへ移植せず、既存のPython学習資産を再利用する。計算言語そのものを絶対条件とはしない。端末上の測定で性能・配信容量・初回起動に実質的な問題がある部分だけ、同じ計算契約・回帰テストのもとJS/WASMへ差し替える。

**現行資産と差分（実GitHub実装の確認事項）**
- [Python実行Worker](../../pages/numerical-lab-worker.mjs): 現行Pyodide `314.0.7`、`loadPyodide`、依存パッケージ読込、Pythonコード+テストを1ジョブとして実行。**進行中の座標を継続的に送るAPIはまだない**。
- [PythonラボUI](../../pages/numerical-lab-runtime.js): Web Worker作成・強制停止・進捗保存・MatplotlibのPNG結果表示。**通常8秒/最大60秒の実行制限、起動上限120秒は既存の一回実行型ジョブに対するもの**。時間発展の1ステップごとにこのジョブを再実行する設計は採らない。
- [Python数値ラボ規約](../NUMERICAL_LAB_AUTHORING_STANDARD.md)と[現行runtime検証](../../scripts/validate-numerical-lab-runtime.mjs): `python-lab`/solution/test はコード穴埋め演習の正本。CELEVの**常時動く対話式シミュレーションとは別契約**とし、既存演習UI・タイムアウト・保存キー・CIを壊さない。
- [Pages service worker](../../pages/service-worker.js): Pyodideアセットのキャッシュを既に持つ。新しい専用WorkerやPython実験データの追加時はPages assembly、配信URL、キャッシュ版、初回オンライン起動・再訪起動・オフライン時の動作を検証する。

**モジュール分離と通信契約**
1. Python物理カーネル: pure Python/NumPyによる `acceleration(state, params)`、`verlet_step(state, dt)`、`diagnostics(state)`、`integrate_batch(state, steps, dt)` を状態/計算に分離。CPU数値実装の正本を先に作り、CPythonとPyodideの双方で同じテストベクトルを使う。
2. Python変分カーネル: `action(path, params)`、`gradient(path, params)`、`optimize_batch(path, constraints, iterations)` を別モジュールにし、手動導出と有限差分検算が可能なAPIとする。NumPy/SciPyの関数一発で学習すべき離散勾配/拘束を隠さず、必要なら最適化ライブラリとの比較を行う。
3. **CELEV固有の常駐数値カーネルと共通Workerホスト**: 共通PLANで定める`initialize` / `runBatch` / `singleStep` / `pause` / `reset` / `dispose` の通信・世代管理・停止・例外処理を再利用し、CELEV固有のNewton積分・`integrate_batch` / `optimize_batch` をExperimentAdapterとして接続する。Python側で状態を保持するが、共通の通信・UIコードをCELEV専用に複製しない。既存`numerical-lab-worker.mjs`は一回実行型のまま維持し、Pyodide初回起動・キャッシュ・同時Worker数を監視する。
4. **共通UI＋CELEV固有のCanvas描画**: 共通UIの実行/停止・ステップ送り・ズーム・記録/exportを再利用し、初期値・質量・積分刻み・物理時刻・保存量/衝突警告はCELEV側が定義する。表示速度と物理刻みを独立に管理し、物理法則の計算をJS描画側で重複実装しない。補間は表示に限り物理ステップと混同しない。
5. **バッチ転送**: Pythonは固定`dt`で複数ステップ（初期の比較候補20/50/100ステップ）をまとめ、位置・速度・エネルギー・ステップ番号・物理時刻を型付き配列またはサイズ制限つきメッセージとしてJSへ転送する。フレームごとにPythonを再起動・Python/JSを往復する1ステップ通信はしない。Canvasの要求フレームと物理時間の刻みは別。先読みバッファ上限を定め、停止/パラメータ変更時は旧世代の出力を破棄する。
6. **代替経路の停止条件**: 冷間/再訪ロード時間、Workerピークメモリ、積分1万ステップのCPU時間、描画FPS、UI入力から停止までの応答時間、長時間安定性を測定する。基準デバイス・閾値を実装開始時に明示し、比較ベンチと数値一致テストの結果を残す。Pyodideが計測上のボトルネックと判明した物理時間発展のみJS/WASMカーネルへ差し替えてよいが、Pythonの変分学習課題・最適化実験は原則残す。

**静止画像を時間差で移動するだけのSVG/GIF/Canvas再生は受け入れない。** 初期条件または質量を変更したときにPythonの方程式計算が新規に走り、位置・保存量と誤差が実際に変化することを自動試験と実ブラウザ試験の両方で立証する。

### 4.1 2つの独立モード

**A. 物理時間発展（必須・第一実装）**
- ブラウザの常駐Pyodide WorkerでNewtonの相互重力を固定物理刻みで実際に数値積分し、バッチ処理した状態列をJS Canvasへ送る。保存した固定軌道の再生、補間だけの擬似運動は禁止。再生中も要求量だけ積分を継続し、パラメータ変更ではPythonの積分状態を明示的に初期化して再計算する。
- 初期値、質量、速度、積分刻みを変更するとPythonで運動方程式を**再計算**する。表示速度の変更だけでは物理`dt`を変更しない。初期値リセット、再開/停止、ステップ送り、軌跡の表示範囲と期間を用意する。
- 方程式は q_i''=G sum_{j != i} m_j(q_j-q_i)/r_ij^3。粒子と軌跡はCanvas 2D（必要ならWebGL）で描画。SVGは静的補助図に限る。
- 初期実装: 平面2体円軌道、Lagrange正三角形、等質量三体8の字。次段階で質量比/速度摂動、近接遭遇、n=4などへ拡張。
- **固定時間刻みvelocity-Verlet（kick-drift-kick）**を主方式。Euler法と同精度とみなさない。dtを半減して軌道閉合・エネルギー誤差を比較。必要なら適応Runge–Kuttaを比較用とするが、可変刻みVerletを無条件にシンプレクティックと称しない。
- 既定は**softeningなし**。近接距離r_minが警告閾値に達した場合、数値的未解決/衝突危険を明示して停止する。発散・NaN・ステップ上限・CPU/フレーム時間制限を設ける。softeningを将来許す場合は元のNewton系とは異なる模型とUIに明記する。

**B. 変分的軌道探索（必須・第二実装）**
- N分割の周期ループについて q[k]の位置を未知量とし、Pythonで離散作用A_N=sum_k dt[(1/2)sum_i m_i |(q_i[k+1]-q_i[k])/dt|^2+U(q[k])] を数値最小化する。反復の進捗・候補曲線はWorkerからJS側へバッチ転送し、Canvasで描画する。
- 重心・期間・対称性を拘束し、少なくとも8の字の対称クラスを扱う。最適化は離散勾配と射影/線探索を明記して実装する。
- **衝突に対する小さな正則化を黙って入れない**。必要ならペナルティ/softening付き近似を「別模型」として表示し、非正則化作用での検算を別途実施。
- 初期曲線を変更して実際に反復し、反復ごとの作用・勾配ノルム・制約違反・最小粒子間距離・反復数・収束判定を描画。
- 最小化で得た格子曲線と時間発展の軌道を重ね、周期端点残差とNewton方程式残差を比較。既知初期値の呼び出しを「発見」として見せない。

### 4.2 誠実性のための実時間診断

同時表示: E(t)-E(0) または相対誤差（E(0)≈0では絶対値使用）、全運動量P(t)-P(0)、全角運動量L(t)-L(0)、重心と重心速度、最小粒子間距離、計算ステップ数、経過シミュレーション時間、時間刻み、軌道閉合残差。

- 8の字の検証で使う基準状態: G=m1=m2=m3=1、r1=(-0.97000436,0.24308753)、r2=-r1、r3=(0,0)、v3=(0.93240737,0.86473146)、v1=v2=-v3/2。参考周期T≈6.3259。出典: Montgomeryの初期条件公開資料。表示では近似値と明記。
- 例示的な受け入れ試験: dt=0.001、1周期、丸めた上記初期条件で max_t|E(t)-E(0)|<1e-4、位置閉合残差<1e-2 を満たす（実装前にしきい値・相対単位・周期端点補間を確定）。dt半減で誤差の縮小傾向を検査する。数値しきい値を**理論上の保証**や万能精度と称しない。
- 2体円軌道: 周期/半径・エネルギー・角運動量を解析解と比較。正三角形: CELE3の円相似解と比較。
- 速度/質量を変えた場合は、元の8の字厳密周期性を仮定しない。重力単位系、許容n、数値許容誤差を明記。
- 非表示タブ・低性能端末ではワーカー/バッチ計算とUI更新を分離し、描画負荷で物理時間刻みが変化しないようにする。

### 4.3 ブラウザ実装・成果物とテスト

- **GitHub Pagesで動作するPython+JSハイブリッド実装を第一候補**とする。PyodideをCELEV専用Worker内で長時間保持し、Pythonカーネルで数値積分/離散変分最適化、JS Canvas 2Dで可視化とUIを実装する。既存の通常Pythonラボの「コード編集→テスト→PNG出力」形式は壊さない。
- 納品物はPythonの物理/変分カーネル、CELEV固有の数値Workerアダプター、共通Runtimeと接続するCanvas描画コンポーネント、共通メッセージ契約への準拠テスト、公開教材とのリンク、演習モード、性能測定・検証スクリプト、再現用パラメータ・ログ。計算と描画を分離し、物理カーネルはPythonだけでヘッドレステスト可能とする。
- Python学習課題としてVerletの更新式・Newton力・作用と勾配・制約射影・保存量を既存`python-lab`/`python-solution`/`python-test`形式で**別途**作成できる。穴埋めと模範解答で同じアルゴリズムが走ることを確認する。対話型本体を`python-lab`として偽装しない。
- 通信仕様のテスト: 初回Pyodide準備と依存読込、Worker生成/破棄、メッセージ型、jobID/世代管理、バッチ境界、pause/resume/reset、旧状態の破棄、例外/衝突検出、再起動、有限配列、同時操作の競合、連続実行中のUI応答。
- 数学・物理のテスト（CPython/Pyodideの両方で走る想定）: Newtonの作用反作用と運動量変化、2体円運動、3体8の字再現、dt比較、時間反転誤差、力の有限差分検算、中心質量系制約、衝突ガード、NaN/Infinity検出、変分勾配の有限差分との一致、拘束を保つ反復、描画ゼロでも数値計算が進むこと。
- 性能比較の必須記録: 冷間・キャッシュ済み起動、`20/50/100`ステップ/メッセージ比較、1万物理ステップの計算時間、Canvasの表示fps・入力遅延、メモリ、バックグラウンドタブ復帰、連続反復の漏れ、通信コスト。測定デバイス・ブラウザ・Python/JS版を固定して記録する。**性能未測定の段階で「JSが高速」「Pyodideで十分」と断定しない**。
- ブラウザUIで**動作すること**を受け入れ条件とし、Playwright等で初期条件変更前後の計算値・ログが変化し、実際にPython workerが`step-batch`と`optimize-batch`を走らせたことを検査する。単なるCanvas/SVG/GIFの固定再生では不合格。
- GitHub Pagesの既存Service Workerと整合し、オンライン初回起動、キャッシュ済み再訪、Pyodide/NumPyアセット未キャッシュのオフライン失敗表示を確認する。デプロイ時のバージョン差・キャッシュ更新を検証し、既存Pythonラボの継続動作も回帰テスト。
- 画面は教材本文内の専用ラボリンクから起動し、数式・実験設定・観測・誤差・限界・問答をセットで提示。パラメータURL共有、CSV/JSON初期値/ログexport、再現可能な実験ID。大規模外部依存・GPUは初期必須としない。
- Pyodideで許容不能な遅延やメモリ消費を**測定で**確認した場合に限り、物理時間発展部分だけ同じデータ契約を持つJS/WASMカーネルへ段階的に交換する。置換時はPythonとの数値一致、保存則とdt収束、相互作用テストを必須とし、後退しないことをCIで確認する。

## 5. 演習設計と証明責務

- 原則として各章A4/B3/C1以上、全問詳細解答。数値演習でも**導出・実装方針・観測・誤差分析・結論の限界**を解答に含める。
- 主要存在定理の補題と境界仮定を、章の見出しだけで済ませない。証明正本が他章にあるなら実在stable anchorへ直接リンク。
- Figure-eightの存在・衝突回避は数値軌跡の表示と独立に査読する。数値反復成功でも“数学的に存在を証明した”と書かない。
- CELEV5の教育上の最重要問題: 対称性で固定した基本区間の極小値と、許される変分の範囲、衝突回避、滑らかな全周軌道への延長の4点を順に検証。
- CELEV7の重要反例: 対称クラスでの極小は全ての方向での二次正定性を意味しない。

## 6. 着手順・受け入れ条件

本PLANの数値実装に入る際は、共通基盤PLANのPhase 0/1との接続を確認する。CELEV固有アルゴリズム・数学的査読は共通基盤の実装とは独立に進められるが、対話シミュレーションの完成判定には共通UI/Workerの実動作確認が必要。

1. 既存のVAR9〜12、GPDE3〜5、AMECH3、CELE2/3/6/7/8、INT/DYNの実在アンカー・本文を照合。
2. CELEV1〜3で存在・直接法・特異性の入口を完成（VARの未完成項目を既知としない）。
3. CELEV4〜6で対称最小化、8の字、舞踏解の存在・条件・外部定理を査読。
4. 既存Pyodide/Service Workerの配信・起動・キャッシュを回帰確認し、**Python物理カーネル+CELEV専用Worker+JS CanvasでAモードを先行実装**。2体円軌道・正三角形・8の字の3系統、Workerの停止/再初期化、dtと描画fpsの分離を受け入れ試験する。
5. **Bモード離散変分の探索**をPythonカーネルで別実装し、JSへ反復ログを転送。既知初期値再生ではないこと、作用減少と勾配/拘束検算が成立することをテストする。
6. CELEV7〜8、主教材からラボへの導線、数学/数値/可読性/表示の四観点査読。
7. Pyodide初回/再訪/オフライン、Workerの競合・再開、NumPy依存と配信キャッシュ、CPython↔Pyodide一致、バッチ転送の性能測定を実施。性能が閾値を超えた箇所だけJS/WASM代替を比較・承認する。
8. 各章manifest・knowledge・stable anchor・公開index・実験台帳の整合、changed-onlyから必要に応じてfull CI、Pages公開表示・ブラウザの実操作確認。
9. 数値実験パラメータ・反復ログ・失敗例と追跡監査を保存。誤差検証を満たさないケースは失敗表示し、完成扱いしない。

**PLAN登録だけでは系列manifestを作らず、公開目次に未実装章を掲載しない。** 新しいCELEVのID・パスは執筆開始時に最新リポジトリと突き合わせて確定する。


## 7. 進捗と完了判定（2026-10-14 時点）

**講義本文**：系列 manifest `textbook/dream-theater-series/CELEV.yaml` の CELEV1〜CELEV8 はすべて `completed`。CELEV1〜2の直接法と周期ループ、CELEV3の衝突処理、CELEV4〜6の対称性・舞踏解、CELEV7の第二変分・Floquet、CELEV8の離散作用・勾配・射影・Verlet・誤差診断を各章の本文・定義例・証明・詳細解答として実装済み。本文での成立範囲（非衝突、質量、対称制約）と数値候補の非証明性を区別する。

**数値実装**：`pages/simulation/engines/celev/celev_kernel.py` に Python の Newton 積分・離散変分計算・保存量診断を実装。`pages/simulation/celev8-python-worker.mjs`、`celev8-app.mjs`、`celev8.html` に Pyodide Worker・操作画面・Canvas 表示を接続済み。`scripts/test-celev8-kernel.py` は有限差分勾配・投影対称性・二体解析基準値・保存量・刻み検査・変分探索を対象とする。`scripts/validate-celev8-browser.mjs` はブラウザ内の Python 物理積分と変分探索の操作、パラメータ変更時の再計算、候補の独立積分を対象とする。2026-10-14のCELEV8導入PR #1443では、`Validate textbook` と `Validate Pages assembly` などのCIチェックが成功した。

**追跡監査**：CELEV8の主要結果 `prop-celev8-gradient`、`prop-celev8-projection-properties`、`prop-celev8-descent`、`prop-celev8-momentum` と演習A1〜A5・B1〜B4・C1を再読・再計算。対称射影の正規直交性と全格子非衝突の判定を補強した。検算の内訳・主要中間式・初出定義の判定記録は [CELEV8追跡監査PR #1447](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/1447) に記録。

**PLAN全体の未確認の受け入れ事項**（第4.3節および第6節より）：

1. CELEV固有Pyodideで初回オンライン／再訪／オフライン／キャッシュ更新を実ブラウザで比較し、リリース間のキャッシュ整合も確認する。
2. 低性能の実端末、非表示タブ復帰、長時間実行、Worker再初期化時の競合・停止・メモリ・熱とUI応答を計測する。共通基盤のCPUスロットリング試験を実機測定の代用としない。
3. CELEV Python数値実装について20/50/100ステップバッチ、1万ステップ、PyodideとCPythonの数値一致・CPU時間・メモリ・描画fps・入力遅延を所定環境・バージョン付きで記録する。
4. 8の字と正三角形の有限時間誤差、周期閉合、刻み半減および失敗例を実測ログとして保存し、コードの存在やグリーンCIのみで受け入れ値の達成を推定しない。
5. 第6節の横断査読、教材からラボへの公開導線と実表示、数値実験台帳と再現パラメータ、必要なPages公開確認を最終的に照合する。

この一覧は **未実施と断定する一覧ではなく、このPLANの完了証拠として本記録で確認できていない事項** を明示したものである。各項目の実測・受け入れ結果を記録し、必要な最終横断監査を完了するまではこのPLANを `plans_progress/` に保持する。講義8章の `completed` とPLAN全体の `plan_done/` 移行を混同しない。
