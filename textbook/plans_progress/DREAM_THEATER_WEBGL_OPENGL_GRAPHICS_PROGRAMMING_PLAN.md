# DREAM THEATER WebGL2・OpenGL系リアルタイムCG／GPUプログラミング講座 PLAN（WGL1〜WGL20・全20講確定）

設計・講数確定日：2026-11-15  
状態：in progress（系列 manifest 上はWGL1〜WGL20が全件completed。ただし最終横断監査・実ブラウザ検証は未完了）  
講数：**20講**（A 6講＋B 6講＋C 4講＋D 4講）。既存の流体CG（FCG1〜20）とは別系列とし、共通WebGLラボを共同利用する。

## 0. 判断・中心問い・範囲

**独立講座を設ける**。既存の[FCG全20講](DREAM_THEATER_FLUID_COMPUTER_GRAPHICS_COURSE_PLAN.md)は流体数値模型とその表現が主役であり、FCG2のWebGL2入門だけでは、一般の座標変換・可視性・陰影・テクスチャ・多段レンダリング・GPU検算を順序立てて学べない。一方でFCGの既存20講を増やして描画API入門を重複実装するのは避ける。

> JavaScriptとGLSL ES 3.00を自分で編集・実行し、3Dの幾何が画素へ変わる仕組みとGPU演算の限界を、図・数式・計算結果・ピクセルの独立検算で説明できるか。

- **授業と実行の主軸はWebGL2**。ブラウザ内で環境構築不要、WebGL2はOpenGL ES 3.0に基づく。デスクトップOpenGL（C++/GLFW等）はAPI概念・座標・GLSL差異・状態管理の対応表と任意のローカル発展課題で扱い、ブラウザ外のコンパイル環境を必修にしない。WebGL2にcompute shader、geometry shader、tessellation shader、SSBOがあるかのような説明をしない。GPGPUはfragment shaderとrender-to-textureに限定し、WebGPU computeと明示的に区別。
- **計算系／基礎数理→GPU可視化→応用への橋**。線形代数の行列/内積、微積分、3Dベクトル、JavaScript/HTML/CSSの基礎を入口とする。各章の実在prerequisiteとstable anchorは実装時に確認し、未定義の専門語は先に説明する。GPUが数値解法を正当化するわけではなく、誤差や保存則の判定は計算側の責務。
- **講数を20に確定する理由**：初回三角形から「入力→変換→補間→テクスチャ→照明→多重パス→データテクスチャ→計算→検証→GIS」まで、各講に独立した新機能と手計算できる判定を1つずつ置く。FCG固有の移流・Poisson・粒子格子転送・浅水・煙/炎の物理・保存則を本講座の講数稼ぎとして再講義しない。
- 目標はGPU APIの理解と手書きのGLSL・JSであり、three.js/MapLibre等の高水準ライブラリを主教材のブラックボックスにしない。後の応用例では任意に紹介しても、初学段階の導出・検証コードは素のWebGL2を正本とする。
- **実データへの接続**：WGL20で国土交通省Project PLATEAUの小規模な実在建物モデルを、既存の合成地形・格子実験に続く**必修の第2データセット**として扱う。WGL15のpick、WGL16の描画負荷、WGL19の診断はWGL20における統合実践で再利用する。基礎講の中心問いをPLATEAU固有のデータ変換・配信へ置換しない。WGL20に紐づく3本の独立ケーススタディを全20講とは別の応用教材として計画し、講義IDや進捗の二重管理を作らない。

## 1. 市販教科書・公開一次資料と反映先

| 出典 | 取り込む核となる内容 |
| --- | --- |
| S. Marschner & P. Shirley, [Fundamentals of Computer Graphics, 5th ed., CRC Press](https://www.routledge.com/Fundamentals-of-Computer-Graphics/Marschner-Shirley/p/book/9781032122861) | 画像・座標変換・視点・グラフィックスパイプライン・サンプリング・テクスチャ・シェーディング（WGL1–9）。本書のray tracing全般は本系列の必修実装にしない |
| T. Akenine-Möller, E. Haines & N. Hoffman, [Real-Time Rendering, 4th ed., CRC Press](https://www.routledge.com/Real-Time-Rendering-Fourth-Edition/AkenineMoller-Haines-Hoffman/p/book/9781138627000) | 変換・GPU・shading・テクスチャ・影・PBR・image-space処理・性能（WGL2–19） |
| Khronos, [WebGL公式](https://www.khronos.org/webgl/)と[WebGL 2.0仕様](https://registry.khronos.org/webgl/specs/latest/2.0/) | WebGL2/OpenGL ES 3.0の仕様境界・能力/互換性、WebGLとOpenGLの差異（全講） |
| Khronos, [OpenGL／OpenGL ES reference](https://registry.khronos.org/OpenGL-Refpages/) | buffer、draw call、texture、framebuffer、GLSLの正確な入出力・型・状態を確認（WGL1–19） |
| [WebGL2 Fundamentals](https://webgl2fundamentals.org/webgl/lessons/) | 実際の描画パイプライン、texture、framebuffer、shadow、GPGPU等の公開教育的配置を照合。コード・図は転載せず独自に作成 |
| [MDN WebGL2RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext) | ブラウザcontext・API・例外とフォールバック（WGL1・17–19） |
| [PLATEAU 公式FAQ](https://www.mlit.go.jp/plateau/faq/)・[3D都市モデル標準製品仕様書（CRS）](https://www.mlit.go.jp/plateaudocument/toc7/toc7_02/toc7_02_03/_crs/) | CityGMLの位置づけ、CRS（EPSG:6697等、入力のsrsNameを必ず照合）、標高基準、出典・ライセンスの確認（WGL20・ケーススタディ） |
| [PLATEAU 配信サービス：CityGML](https://docs.plateauview.mlit.go.jp/datasets/citygml/)・[3D Tiles/MVT](https://docs.plateauview.mlit.go.jp/datasets/3d-tiles/) | 小規模データをオフライン抽出する手順の資料、3D Tiles/MVTによるタイル配信の発展課題（既定ラボで外部取得しない） |
| [Physically Based Rendering, 4th ed.](https://www.pbrt.org/) | 光輸送・反射モデルをWGL12の近似の根拠として使う。フルpath tracerや分光renderは範囲外 |
| 既存[FCG PLAN](DREAM_THEATER_FLUID_COMPUTER_GRAPHICS_COURSE_PLAN.md)・[FLUID PLAN](DREAM_THEATER_FLUID_MECHANICS_COURSE_PLAN.md) | 流体の物理・数値計算の正本を尊重し、可視化レイヤだけを本系列から再利用（特にFCG2・10・15・19・20） |

資料は範囲と説明順序の検証に利用し、図・演習・ソース・数値例は自作する。各版の機能・ブラウザ対応は実装日に再検証する。

## 2. FLUID10型を発展させた共通プログラミングラボ（必須）

### 2.1 学習者向け画面

[FLUID10のブラウザPython実験](../volumes/dream_thater/物理系/FLUID/FLUID10/index.md)の「章の途中で実験を起動し、条件を調整して結果とグラフを同じページで読む」導線と、[Pythonファイルラボ規約](../NUMERICAL_LAB_AUTHORING_STANDARD.md)の3タブ方式を踏襲。ただし FLUID10 の python-file-lab は **完成済み .py の再現実験**であり、JS/GLSLの編集器ではない。既存Python runtimeを転用/改変して見かけだけのGPUラボにしない。

**WGLとFCGで同一の編集・実行ラボを使用する。** 新しい共通ラボUIの表示は3タブ：

1. **実験条件・課題**：学習目的、編集する箇所（必ずしも穴埋めとはしない）、初期値・パラメータ・プリセット・予測する画素/数値、GL拡張/限界、チェック項目。
2. **コード編集**：独立した JavaScript／vertex GLSL／fragment GLSL 編集欄を設け、複数passが必要な講ではpass別GLSLも扱う。表示中のコードは実行される元ソースそのもの。リセット・プリセット読込・差分/複製・必要なヒントと模範解答への導線を用意し、学習者が編集後に実行できる。完成コードの単なる閲覧で「プログラミング済」としない。
3. **実行結果**：実際のWebGL2 canvas、shaderコンパイル/リンクエラー（行・stage・driver log）、静止/時間変化の操作、GPU/CPU診断、数表/誤差、必要な代替表示、画素検算結果。実行を押すと結果タブへ切替。結果を見た後にコードへ戻って修正できる。

本形式はWGL/FCGの教育用契約であり、NUMLAB1–5の既存「穴埋め／模範解答／実行結果」契約を変更しない。JS/GLSL課題の模範解答は本文の詳細解答・ラボ内開示から参照し、単なる色変化で成功扱いしない。

### 2.2 コードとランタイムを分離する

- **新しい共有ラボ1種類**（名称・Markdown記法・公開パスは最初の実装PRで確定）を、WGLとFCGで共有する。章ごとの教材ソース（JS、.vert/.frag等のGLSL、入力プリセット、期待値、検査用JS）を同じPRで作成し、実行欄はその実ファイルを読込・編集できる。Markdownへの巨大な二重埋込は避ける。
- 共通ホストは3タブ、コードエディタ、実行/停止/再実行、shader診断、Canvas/Canvas2D代替、履歴・バージョン付き保存、教材ページ内の表示とPages解決を担当。章は初期値、GLSL/JS、CPU参照計算、期待結果・誤差検査を所有する。
- 読者が編集したJSは**隔離された不透明originの sandbox iframe**（原則 allow-scripts のみ、allow-same-originは付与しない）で走らせる。親のDOM・保存データ・サービスワーカー・教材UIへの直接アクセスを許さない。CSPとURL/依存ファイルのallowlistで外部通信・外部import・ポップアップ・top navigationを禁止し、iframe生成後のメッセージはsource・session token・request id・世代を照合する。opaque origin の message origin は null になりうるためorigin文字列だけで認証しない。
- JSを自由編集させる以上、**ブラウザ側から無限ループを完全にプリエンプトできない**。実行ごとに隔離iframe/contextを破棄・再生成し、ホストにタイムアウト/世代上限/資源上限を設ける。GPUドライバ停止・GPUハングは完全に防げないため、カーネル/ブラウザ依存の制約と警告を明記する。検査用pixel readbackと別系統CPU参考値を持つ。
- WebGL2が非対応/失敗なら対応検査を表示し、必要なら同じ理論のCanvas2D/CPU参照値を示す。ただしGPU-specificな到達目標をCPU再現で達成済みにはしない。GPU再試験が必要と明記する。GPUでfloat render targetを使う講は拡張・format・フィルタ可否を実測/問い合わせで判定し、対応前提で固定しない。
- ネットワーク不要の静的Pages資産で配布できる設計を優先し、CSP/Service Worker・オフライン再訪・古い保存状態・ページ更新を検査する。外部CDN・remote texture・実ユーザーデータをラボの既定入力としない。WGL20のPLATEAU実データは**事前に抽出・ローカル座標変換した少量の固定スナップショットを同梱**し、sandbox iframeから許可済み静的資産として読み込ませる。外部3D Tiles APIの動的アクセスは共通ラボ内で無理に有効化せず、発展用の別環境に分離する。
- [対話型シミュレーション共通基盤](DREAM_THEATER_INTERACTIVE_SIMULATION_PLATFORM_PLAN.md)のstop/reset、実験記録/世代制御は適合する部分を**APIとして再利用**するが、既存WorkerプロトコルにGL contextや任意コード評価を無理に同居させない。共通UIの仮定は着手PRで実コードと照合する。
- **WGL1またはFCGの先行着手講（どちらが先でもよい）で最小安全ラボを同時実装**。WGL1→2・FCG2以降のWebGL課題が同じ基盤を段階拡張し、重複実装しない。共通ランタイム変更は両系列の回帰影響を評価する。ソフトウェア上の再利用は、他系列の未完了章を数学的prerequisiteに要求する理由にはならない。

### 2.3 全講での具体的受け入れ契約

- **必ず「コード編集→実行→観察→検算→修正」が成立**する。ソースを実ファイルから読み、編集を保存/初期化でき、変更が実際の画素/診断へ伝播する。コード課題は穴埋め固定ではなく、条件を変える課題・バグ修正・シェーダ改造・新機能実装を使い分ける。
- テストはshaderコンパイル/リンク、GL error、CPUによる2×2/4×4小格子や既知行列/画素の独立計算、readPixels（色空間/型/量子化に応じた許容差）、境界・深度・補間・法線・ガンマの典型誤りを扱う。GPU負荷・フレームレートは環境と実測を付す。
- 編集JS/GLSLから結果を戻すのはサイズ制限した構造化メッセージのみ。実行時エラーはソース位置と詳細を出す。結果canvasと診断はキーボード対応・数値表・色以外の識別手段を持つ。
- 最初のラボ共通化PRで headless・ブラウザのshader実コンパイル/実描画/実入力/隔離/中断/オフラインの受入試験を実装。ユーザー編集JSに対する権限隔離、CSP、悪意ある無限ループ/巨大texture要求への制限を検査する。残るGPU hangリスクを説明する。

## 3. 全20講の確定シラバス

**全講の本文に共通ラボを埋め込み、読者がJavaScriptまたはGLSL（多くは両方）を変更して実行できること。** 初学前半は完全に理解できる小さなGLSLを使い、後半でも「完成アプリを開く」だけにしない。図は座標変換・光路・深度・データフローの理解に必要な講に制作し、全講1枚をノルマにしない。

| 講義 | 中心問い・主要数理 | 同じ講で実装する編集可能ラボ | 受け入れ検算 |
| --- | --- | --- | --- |
| **WGL1** | ブラウザの画素までの最短経路は？ Canvas/viewport/GL context・JS⇄GLSL・状態 | WebGL2 context取得から三角形を描く最小JS・頂点/フラグメントGLSLの3欄を編集 | 初期画素/背景、shaderを壊した時のエラーと隔離、resize |
| **WGL2** | GPUは頂点とピクセルをどう区別する？ 属性・uniform・補間varying・draw call | 頂点色から補間色の三角形、uniformとvaryingを変更 | 三角形頂点と内部補間の既知値、型の誤用 |
| **WGL3** | 多数の三角形をどう共有する？ VBO/EBO・VAO・添字・drawArrays/Elements | 共有頂点の四角形・格子を編集し2つの描画法を切替 | 重複/再利用、添字範囲、面積/頂点数 |
| **WGL4** | モデル座標を世界へどう移す？ 斉次座標・4×4行列・合成順序・逆行列 | 回転・移動・拡大縮小をJS行列とGLSLで編集し、軸を可視化 | 4点の手計算、行列列優先規約と順序反例 |
| **WGL5** | 視点と投影はどう画素を決める？ view/projection・透視除算・near/far・depth | カメラと直交/透視投影の実装、手前・奥の立方体描画 | 投影の端点・可視/不可視、深度の向きとz-fighting |
| **WGL6** | 三角形内部の値はどう決まる？ barycentric・透視補正補間・背面判定・aliasing | UV格子と補間の違いを描画、三角形の向きとsamplingを変更 | barycentricの和1、edgeの画素、perspective差 |
| **WGL7** | テクスチャ画像はなぜにじみ/ちらつく？ UV・texel・filter・wrap・mipmap | 手製checkerboardとdata textureを貼り、各sampler設定を編集 | UV境界・nearest/linear・縮小誤差 |
| **WGL8** | 透明・色空間の計算はいつ正しい？ alpha/前後合成・sRGBと線形光 | 透明な重なり、blending順序と線形/非線形計算を変更 | 既知2色の合成値、描画順/alphaの反例 |
| **WGL9** | 法線と光源は明暗をどう決める？ 法線変換・Lambert/Blinn–Phong | 立方体と球の法線/照明をvertex/fragment shaderで変更 | 内積・正規化・逆転置変換、零光源 |
| **WGL10** | 一回描いた結果を次に使うには？ framebuffer/attachment・render-to-texture | 第1パスで図形→第2パスで別canvas上へフィルタ表示 | FBO completeness、画素読出し、viewportとresize |
| **WGL11** | 光が遮られる場所をどう判定する？ 光視点・shadow map・depth bias | depth pass＋影付きpassをGLSL編集、bias比較 | 陰のある/ない点、shadow acneとpeter panning |
| **WGL12** | 金属と粗面の光はどう近似する？ Fresnel・microfacet・エネルギー制約 | roughness/metallicで変わる簡素なBRDF・法線と光源 | 極限・反射率範囲、物理模型と近似の違い |
| **WGL13** | 周囲の風景を反射へ使うには？ cubemap・方向座標・反射ベクトル | 自作6面textureで環境反射を編集・回転 | 6面方位・向き・継ぎ目、反射方向 |
| **WGL14** | 画面全体をどう加工する？ 畳み込み・blur・postprocess・tone mapping | 2段FBOでぼかしとエッジ抽出をJS/GLSL編集 | 定数画像・インパルス応答・係数総和と端処理 |
| **WGL15** | 画面クリックを3D物体へどう対応させる？ 逆変換・ray・ID picking | マウス/キーボードで選択、CPU射線とGL ID bufferを比較 | CSS pixel⇄device pixel、選択ID・奥行き・resize |
| **WGL16** | 同じ形を多数描くと何が速い？ instance属性・batching・draw calls | 多数の立方体/点をinstancing描画へ変更 | 同一配置のpixel差、draw回数/負荷の実測 |
| **WGL17** | 物理データをGPU textureへ送るとき何を失う？ 成分・型・float/整数・精度 | 既知2D格子のデータをtextureにし、形式/復元式を編集 | CPU値とGPU readback、量子化・format/extension |
| **WGL18** | fragment shaderだけで時間発展できる？ ping-pong・feedback禁止・境界 | 2D拡散（小格子）の2枚texture更新、CPU差分解と並列表示 | 1stepの手計算・質量/境界・刻み誤差、readback |
| **WGL19** | 動く描画の正しさと性能をどう監査する？ GPU状態・profiling・context loss | WGL18をrender fpsと計算step分離、再初期化/diagnostics実装 | 固定初期値・pixel/数値一致、資源解放・復帰・低性能 |
| **WGL20** | GIS地形と数値格子を誤解なく重ねるには？ 高さ格子・地図座標/ローカル座標・mesh表示・実都市データのCRS/精度 | (1) 合成DEM＋合成水深/スカラー場を自作してGLSL表示、(2) 同梱した小規模PLATEAU建物メッシュを素のWebGL2で重ねる。JSとGLSLを双方編集でき、FCGの物理solverとは独立に実行 | 標高≠水深・高さ基準・水平/鉛直単位・軸順・float精度・Z誇張・既知頂点位置・遮蔽/画素値。PLATEAUプリセットを外しても合成実験が成立 |

各講の「ラボ」は本文執筆と同一PRで完成する。主役でない数学的基盤（線形代数、積分、フラックス/偏微分方程式）を重複証明せず、依存する既出結果への本文内リンクと必要な中間計算を示す。1講に主要な新しいプログラミング技能を1つ以上含め、演習数の水増しや動くデモだけの講義にしない。

### 3.1 PLATEAUによる実践ケーススタディ（全20講の外、WGL20の付属応用教材）

**狙い**：初歩の三角形・合成DEMで得たGPU技能を、実在する都市形状・建物属性・地形/水深の意味の異なるデータへ接続し、見た目だけでなく座標・計算・画素を独立検査できるようにする。**講義番号は増やさず**、WGL20からリンクする独立した3本のケーススタディ（CS1〜CS3）を実装対象とする。ケーススタディIDは教材内のラベルであって系列manifestの新章IDではない。公開ページ/補助ファイルの具体パスはWGL20実装PRで決定する。

**学習順序と既習への接続**：WGL20の合成データで基準面・座標を確認 → WGL20の同梱PLATEAUデータで幾何を描く → CS1でWGL5/15（視点・picking）を再利用 → CS2でWGL9/16/19（法線・描画負荷・診断）を組み合わせる → CS3でWGL8/10/17/20（透明合成・FBO・数値texture・高さ基準）を接続。WGL15/16/19の単独履修や既存のcompleted章を、後からPLATEAUデータ必須に変更しない。

| 実践 | 学習者が編集・実装する機能 | 独立した受け入れ検算 |
| --- | --- | --- |
| **CS1：小地区3D都市ビューア** | 建物メッシュ、視点操作、クリック/キーボード選択、選択ID表示。JSのモデル変換とGLSLの描画・ID色出力を編集 | 基準点と代表頂点のローカル座標・選択ID・前後関係をCPU射線/ID bufferで照合。端末画素比/resize後も一致 |
| **CS2：建物属性・都市描画性能** | データに実在する属性（利用可能なら高さ・用途等）による色分け、欠測の明示、描画の分割/結合を比較。instancingが有効な反復形状と、形状が異なる建物のbatchingを区別 | 属性原値と凡例・表示色、欠測扱い、描画結果の一致、draw call・fps・メモリ使用量の環境別計測。単一数値で速度向上を保証しない |
| **CS3：建物・地形・仮想浸水深の重ね合わせ** | 建物・簡易地形に**教材で生成した仮想**水位/浸水深格子を可視化。透明度・深度/遮蔽・Z誇張を変更し、浮きや誤配置を検出 | 地盤高・水面高・浸水深の次元と基準面を分け、既知点で `浸水深 = max(0, 水面高 - 地盤高)` を独立計算。実際のハザード評価・洪水予測とは称しない |

**実データ・座標・再現性の契約**

1. 対象自治体・年度・データ版・抽出範囲・地物種・LODを**実装時に実在の公開データから確定**する。対象は数棟〜数十棟程度の小地区を基本とし、バンドル容量・読み込み時間を実測して絞る。現時点で自治体・データ件数・属性の有無を断定しない。配布元・原データURL・取得日・版/処理条件・出典表記・該当する利用ライセンスと再配布条件を添付のメタデータに固定する。版変更で参照結果が変わっても既定実験を再現できるよう、教材の入力は固定スナップショットとする。
2. CityGML原本のCRS・軸順・高さ基準・単位をメタデータで検証する（標準のEPSG:6697を参照するが、個々の入力の宣言を優先）。必要な座標変換は**オフライン前処理で**行い、変換前後の代表点・基準原点・単位・軸方向・地盤高の意味を表に残す。GPU投入前に局所原点を引いてメートル単位の小さい値へ移し、JavaScript側の倍精度値とGLSL/Float32値の差を代表点で測る。経緯度をそのままメートル座標として扱わず、floatで巨大な世界座標を直接保持しない。
3. **原データ → 抽出 → 三角形化/属性保持 → 座標変換 → 静的教材資産**の前処理スクリプト、処理手順、入力チェック、期待頂点/建物/ID数、固定テスト値を同梱。教材ラボには必要最小限のローカルメッシュ・属性だけを渡し、CityGML全文parser・高精細都市全域配信をWebGL2入門の必修にしない。検査値は編集可能な描画コードと独立のCPU処理または計算表から作る。
4. **CS1〜CS3とも既存3タブ形式**で「コード編集→実行→観察→検算→修正」を成立させる。GPUの選択・画素・描画負荷と、CPUで判定する座標・属性・数値の正しさを分離する。外部CDN/外部通信を要求せず、Pages上の静的配布・オフライン再訪・幅360px表示・キーボード操作・WebGL2失敗時の未達表示を検証する。
5. 3D Tilesのストリーミング、広域LOD、CesiumJS/MapLibre等との接続は**任意の発展解説または別環境の実験**とし、教材内のsandbox権限を拡張しない。3D Tilesを受け取るだけの完成ビューア操作を、JS/GLSLでのGPU実装技能の修了判定に代用しない。

**完了ゲート**：WGL20本体と3件のケーススタディの実行資産・教材内リンク・再現データの来歴/ライセンス・CPU/GPU検算・ブラウザ表示・適用する演習/詳細解答・必要なCIを確認する。3件のケーススタディの完了はWGL20本体の章ステータスとは別に、本PLANの最終横断監査で照合する。WGL20章がcompletedになっただけで、ケーススタディが未実装なら本PLANをdoneへ移さない。

## 4. 既存FCG・FLUIDとの役割分担と実装順

- **WGLの正本**：GPU pipeline、WebGL2/GLSL ES、buffer/texture/FBO、座標・視点、shader照明、GPUデータ型/精度/性能/検査、共通JS・GLSL編集実行ラボ。FCG側はこれらを必要最小限に導入するか、実際に完成しているWGL章へリンクする。
- **FCGの正本**：流れの移流・圧力投影・PIC/FLIP・Level Set・浅水・煙/炎のモデル、粒子/流体の物理と可視化が一致する診断。WGL18の拡散格子はGPUデータ処理の最小模型でありFCGの流体ソルバーを置換しない。WGL20の合成地形表示・PLATEAU小地区の重ね合わせ・CS3の仮想浸水図は、FCG20の浸水数値モデルと区別する。
- **FLUID/CTM等の正本**：流体の物理方程式・保存則・導出。描画を物理予測と取り違えず、流体物理の証明は所属系列を参照する。
- **実装順の自由度**：先にFCGが進む場合、FCGのGLSL実験に必要な最小概念はその章で説明し、まだ存在しないWGL章を前提としない。後からWGLが完成したら実在stable anchorへ接続する。逆も同様。系列の数学的completedは別々に管理する。
- **共通ラボの実装責任**：最初にJS/GLSLラボを必要とする章のPRで共通ランタイムの最小機能を作り、他系列の講では自分の教材コード/テストを追加する。共有ランタイムを変更するPRはWGLとFCGの双方の実行回帰テストを実施する。既存Pyodide/python-file-labやNUMLABの保存契約を壊さない。
- ソフトウェアソースは「計算モデル（CPU真値/JS）」「描画shader/JS」「テスト」「教材」に分け、コードと記事が食い違うときはPRを未完了扱いにする。共有rendererの数理依存をknowledge DAGの偽のprerequisiteとして追加しない。

## 5. 各講PRの必須成果物とレビュー

1. 章の中心問いと動機、最初に説明する概念/導出、直接例、仮定・適用範囲、数式中間計算、WGL固有のCPU基準値と画像の区別、既習stable anchorへの使用箇所リンク。
2. **JS/GLSL編集可能な3タブラボ**をその章本文から起動でき、単体で閉じた再現コード、プリセット、実行結果、compile/link/GLエラーと初期化・停止・リセット・編集保存が動くこと。単なるコード掲載・完成動画だけでは不可。
3. 最低 Level A4・B3・C1（教育上の理由付き例外を除く）の演習と**全問詳細解答**。図/プログラムの出力に頼らず、主要式・計算・誤差の根拠を紙上で追える粒度とする。
4. shader実コンパイル・GLSL stage別エラー・CPU独立検算・readPixels・型/format/カラー空間の許容差・実ブラウザpixel検証。数学結果がある場合は新章Cとして主要結果・全演習を全件自己再計算し、別観点で本文を再読。第三者査読と誤称しない。
5. 端末別のWebGL2機能検査・GL context lost/restored、360px表示/ズーム、キーボード、視覚・数値代替、モノクロ識別、prefers-reduced-motion、時間・fpsと計算stepの分離、cache/オフライン、隔離された任意JSの安全試験。実機未確認部分は残件として明記。
6. 同じPRで変更章・コード・テスト・公開目次ソース・当該系列manifestを更新し、変更範囲に応じたchanged-only validationおよび共通基盤に波及する場合のfull validationを実施。図・SVGは必要な講で同時制作・実レンダリング査読。

## 6. PLANの状態遷移と最終全体監査（1サイクル）

- **現在の状態（2026-11-19の現行GitHub確認）**：本PLANは`textbook/plans_progress/`にあり、`textbook/dream-theater-series/WGL.yaml`でWGL1〜WGL20が全件`completed`。WGL20からの付属CS1〜CS3本文・静的PLATEAUデータ・抽出スクリプト・ホスト側数値検査・Nodeテストは実在する。章IDは増やさない。ただし実ブラウザのWebGL2/ピッキング/オフライン検証と、以下の一回限りの横断監査は完了したとは確認されていない。
- **毎講の局所ゲート**：実行ソース・教材・テスト・図をまとめて作り、コード実行、計算・描画・全詳細解答の検算、実表示とCIを通してからcompletedにする。共通ランタイム修正時にはFCG/NUMLABへの互換性を同じPRで検証する。
- **WGL20完了後の系列横断監査は1回**：WGL1–20の定義/anchor/前提順、GLSLとJSの入力出力、色空間/座標/深度/精度の一貫性、全ラボの共有runtimeでのコード編集→実行→復帰と隔離/停止、FCGの代表例との互換性、目次・Pages・系列manifestを確認する。加えてWGL20のPLATEAU同梱データとCS1〜CS3の前処理・ライセンス・座標変換・実行/検算・公開リンクを照合する。重大指摘は該当講と波及範囲をその監査サイクル内で修正・再検査する。
- **最終監査の残件（2026-11-19時点）**：WGL1〜WGL20の教材・演習数・ラボソースの存在、WGL20の二命題・全10解答、WGL20から参照するlocal stable anchorとCS1〜CS3のファイルは静的に照合済み。ただし、全20講の数学・記法・GLSL入出力を対象とする手動横断再査読と、実ブラウザでの全ラボのshaderコンパイル・画素・選択ID・context loss/復帰・360px/キーボード/オフライン・共有FCG代表例の互換性検証は未完了。Node単体テストとCI成功だけでこれらを実施したとは判定しない。実機条件と結果を記録し、重大な失敗は修正・再検証する。
- 全20講・ラボ・レビュー・公開・**PLATEAU付属ケーススタディ3件**・横断監査を完了して初めて、PLANをplans_progress/からplan_done/へ移動し、WGL.yamlのplanと直接参照を同じPRで更新する。系列の20という講数やWGL20章単独のcompletedだけでdoneにはしない。

## 7. 範囲外・過大な約束をしないもの

デスクトップOpenGL固有のwindow/context managementやC++/Vulkanの実装、WebGPU compute、GPU vendorの正確なタイミング測定保証、ゲームエンジン全般、分光path tracing/完全GI、全3D流体・**都市全域/高精細GIS地形タイルの実データ配信・本格3D Tilesストリーミング**、GPU安全性の完全保証は対象外。WGL20でのPLATEAU小地区の静的実データ表示はこの除外に含めない。ブラウザ/OS/GPU依存の未対応は検知し、単なる静止代替を実装済みのGPU技能として認定しない。
