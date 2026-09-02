# DREAM THEATER 形式偏重・隠れ証明 教材導線監査

既存の `audit:proof-pedagogy` は明示的な `proof-start/proof-end` を持つページを中心に見る。第2監査では対象を広げ、**証明マーカーがなくても、定理・導出・証明語が連続して「実質的に証明本文」になっているページ**を抽出する。

特に、完全証明なのに「証明」という見出しを付けず通常本文へ展開すると、proof-folding CIを形式上すり抜けられる。この監査ではその抜け道を `折りたたみ外の証明完了表現` と `詳細証明らしい見出し` で検出候補にする。

## 監査基準

- 数えるもの：定理・命題・補題・系、証明語、数式密度、例・反例、直感/意味/見取り図、演習。
- `証明の見取り図 / 骨格 / アイデア / 概略` は本文に残すべきなので、それ自体は折りたたみ違反とみなさない。
- `3. 証明：...` のような節番号付き見出しも完全証明候補として数える。
- 一方、`これで…証明されました` などが proof block 外にある場合は、実質的な完全証明が通常本文へ露出している強い候補とみなす。
- P0/P1/P2 は機械スクリーニング。本文を人手で読んで FIX-FOLD / FIX-NARRATIVE / FIX-EXAMPLE / OK を確定する。

## 機械スクリーニング結果

- 対象ページ: **51**
- P0候補: **0**
- P1候補: **7**
- P2候補: **27**
- WATCH: **17**

| 優先 | 講義 | 定理等 | 例 | 直感 | 演習 | proof | 証明完了語 | 証明語 | 数式比 | 警告 |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| P1 | [F0-02B 分離超平面定理・Farkasの補題](volumes/00_foundations/F0_02B_分離超平面定理_Farkas_SVM/index.md) | 3 | 0 | 0 | 1 | 0 | 0 | 20 | 39% | 定理・命題等3件、証明語密度高(20)、例見出し0、直感・意味・見取り図見出し0 |
| P1 | [F0-00D5 補講：Vitali集合・非可測集合・選択公理](volumes/00_foundations/F0_00D5_Vitali集合_非可測集合_選択公理/index.md) | 0 | 0 | 0 | 0 | 0 | 0 | 14 | 29% | 証明語密度高(14)、例見出し0、直感・意味・見取り図見出し0、演習見出し0 |
| P1 | [F0-00SP3 Encore IV：Brown運動・Gaussian過程・二次変分](volumes/00_foundations/F0_00SP3_Brown運動_Gaussian過程_二次変分/index.md) | 0 | 0 | 0 | 0 | 0 | 0 | 14 | 26% | 証明語密度高(14)、例見出し0、直感・意味・見取り図見出し0、演習見出し0 |
| P1 | [F0-00D4 補講：Lebesgue測度・Borel集合・Carathéodory拡張定理](volumes/00_foundations/F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md) | 2 | 0 | 2 | 0 | 0 | 0 | 13 | 32% | 例見出し0、演習見出し0 |
| P1 | [F0-00TS2 Encore IV：Herglotz定理・spectral measure・spectral density](volumes/00_foundations/F0_00TS2_Herglotz_spectral_measure_density/index.md) | 2 | 0 | 0 | 0 | 0 | 0 | 6 | 38% | 例見出し0、直感・意味・見取り図見出し0、演習見出し0 |
| P1 | [F0-00FA2 Encore II：Fourier変換・畳み込み・反転](volumes/00_foundations/F0_00FA2_Fourier変換_畳み込み_反転/index.md) | 2 | 0 | 0 | 0 | 0 | 0 | 5 | 41% | 例見出し0、直感・意味・見取り図見出し0、演習見出し0 |
| P1 | [F0-00P7A 最尤推定量一致性・漸近正規性：KL・大数の法則・中心極限定理・Taylor](volumes/00_foundations/F0_00P7A_MLE_一致性_漸近正規性/index.md) | 4 | 0 | 0 | 1 | 0 | 0 | 5 | 39% | 定理・命題等4件、例見出し0、直感・意味・見取り図見出し0 |
| P2 | [F0-02A KKT条件の導出：接錐・polar cone・Farkasの補題](volumes/00_foundations/F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md) | 2 | 1 | 3 | 2 | 0 | 0 | 19 | 51% | 証明語密度高(19)、数式行約51% |
| P2 | [F0-00D3 補講：外測度・Carathéodory可測性](volumes/00_foundations/F0_00D3_外測度_Caratheodory可測性/index.md) | 0 | 0 | 2 | 0 | 0 | 0 | 11 | 32% | 例見出し0、演習見出し0 |
| P2 | [F0-02C7 関数解析VII：RKHS・再生核・Moore--Aronszajn](volumes/00_foundations/F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md) | 1 | 0 | 1 | 1 | 0 | 0 | 10 | 34% | 例見出し0 |
| P2 | [F0-00FA3 Encore II：Plancherel・L2 Fourier変換・特性関数](volumes/00_foundations/F0_00FA3_Plancherel_L2_特性関数/index.md) | 0 | 0 | 1 | 0 | 0 | 0 | 9 | 38% | 例見出し0、演習見出し0 |
| P2 | [F0-00PDE1 Encore II：熱方程式・Fourier変換・Gaussian heat kernel](volumes/00_foundations/F0_00PDE1_熱方程式_Fourier変換/index.md) | 0 | 0 | 1 | 0 | 0 | 0 | 8 | 33% | 例見出し0、演習見出し0 |
| P2 | [F0-02B1 SVM・凸包・最大マージン](volumes/00_foundations/F0_02B1_SVM_凸包_最大マージン/index.md) | 0 | 0 | 0 | 1 | 0 | 0 | 8 | 38% | 例見出し0、直感・意味・見取り図見出し0 |
| P2 | [F0-00F1 固有空間・実対称行列・スペクトル定理・PSD](volumes/00_foundations/F0_00F1_固有空間_スペクトル定理_PSD/index.md) | 2 | 0 | 0 | 1 | 0 | 0 | 6 | 36% | 例見出し0、直感・意味・見取り図見出し0 |
| P2 | [F0-00A3 補講：半順序・Zornの補題・極大延長](volumes/00_foundations/F0_00A3_半順序_Zorn_極大延長/index.md) | 3 | 1 | 0 | 1 | 0 | 0 | 5 | 23% | 詳細証明らしい見出し1件・proof block 0、定理・命題等3件、直感・意味・見取り図見出し0 |
| P2 | [F0-02C7A 関数解析VII-A：representer theorem・kernel SVM](volumes/00_foundations/F0_02C7A_representer_kernel_SVM/index.md) | 5 | 0 | 1 | 2 | 1 | 0 | 4 | 42% | 定理・命題等5件、例見出し0 |
| P2 | [F0-00MLMC Encore V：Multilevel Monte Carlo](volumes/00_foundations/F0_00MLMC_Multilevel_Monte_Carlo/index.md) | 1 | 0 | 1 | 0 | 0 | 0 | 1 | 37% | 例見出し0、演習見出し0 |
| P2 | [F0-00 統計検定1級のための数学速習](volumes/00_foundations/F0_00_統計検定1級のための数学速習/index.md) | 1 | 1 | 1 | 3 | 0 | 0 | 22 | 36% | 証明語密度高(22) |
| P2 | [F0-00F 線形写像・表現行列・基底変換・相似・対角化](volumes/00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md) | 2 | 5 | 6 | 1 | 2 | 0 | 15 | 34% | 証明語密度高(15) |
| P2 | [F0-00E1 内積・Gram--Schmidt・直交射影・QR](volumes/00_foundations/F0_00E1_内積_Gram_Schmidt_射影_QR/index.md) | 0 | 1 | 0 | 2 | 0 | 0 | 14 | 39% | 証明語密度高(14)、直感・意味・見取り図見出し0 |
| P2 | [F0-00D2E 補講：$L^2$完備性・Riesz--Fischer・Hilbert空間への橋](volumes/00_foundations/F0_00D2E_L2完備性_Riesz_Fischer/index.md) | 5 | 1 | 5 | 1 | 2 | 0 | 9 | 28% | 定理・命題等5件、例1件 |
| P2 | [F0-00D2D 補講：$L^p$空間・Hölderの不等式・Minkowskiの不等式](volumes/00_foundations/F0_00D2D_Lp_Holder_Minkowski/index.md) | 6 | 4 | 8 | 1 | 5 | 0 | 5 | 31% | 定理・命題等6件 |
| P2 | [F0-02C6A 関数解析VI-A：分離定理・Minkowski functional・Farkas](volumes/00_foundations/F0_02C6A_分離定理_Minkowski_Farkas/index.md) | 2 | 0 | 1 | 1 | 0 | 0 | 5 | 30% | 例見出し0 |
| P2 | [F0-00D2C 補講：積測度・Tonelliの定理・Fubiniの定理](volumes/00_foundations/F0_00D2C_積測度_Tonelli_Fubini/index.md) | 7 | 5 | 6 | 1 | 3 | 0 | 4 | 31% | 定理・命題等7件 |
| P2 | [F0-00P5A truncation・Kolmogorov収束定理・Kronecker補題：一般独立同分布強大数則](volumes/00_foundations/F0_00P5A_truncation_Kronecker_一般SLLN/index.md) | 4 | 0 | 1 | 1 | 0 | 0 | 4 | 27% | 定理・命題等4件、例見出し0 |
| P2 | [F0-00SOB2 Encore III：H0^1・Poincare不等式・trace・境界条件](volumes/00_foundations/F0_00SOB2_H01_Poincare_trace/index.md) | 1 | 0 | 4 | 0 | 0 | 0 | 4 | 30% | 例見出し0、演習見出し0 |
| P2 | [F0-00SP2 Encore IV：martingale・submartingale・optional stopping](volumes/00_foundations/F0_00SP2_martingale_optional_stopping/index.md) | 1 | 0 | 1 | 0 | 0 | 0 | 4 | 24% | 例見出し0、演習見出し0 |
| P2 | [F0-02C6 関数解析VI：Hahn--Banach・汎関数拡張](volumes/00_foundations/F0_02C6_Hahn_Banach_分離定理/index.md) | 3 | 0 | 2 | 1 | 1 | 0 | 4 | 27% | 定理・命題等3件、例見出し0 |
| P2 | [F0-00P6A 独立同分布中心極限定理：特性関数の局所Taylor展開](volumes/00_foundations/F0_00P6A_iid_中心極限定理/index.md) | 2 | 0 | 1 | 1 | 0 | 0 | 3 | 37% | 例見出し0 |
| P2 | [F0-00A2 補講：選択関数・選択公理・可算選択](volumes/00_foundations/F0_00A2_選択公理_Zorn_極大原理/index.md) | 1 | 0 | 0 | 1 | 0 | 0 | 2 | 13% | 例見出し0、直感・意味・見取り図見出し0 |
| P2 | [F0-00P4A 一様可積分性・Vitali：確率収束からL1収束へ](volumes/00_foundations/F0_00P4A_一様可積分性_Vitali/index.md) | 2 | 0 | 0 | 1 | 0 | 0 | 2 | 27% | 例見出し0、直感・意味・見取り図見出し0 |
| P2 | [F0-00P5 Kolmogorov最大不等式・有限分散版強大数則](volumes/00_foundations/F0_00P5_大数の強法則/index.md) | 0 | 0 | 0 | 1 | 1 | 0 | 2 | 41% | 例見出し0、直感・意味・見取り図見出し0 |
| P2 | [F0-00WK2 Encore III：Lax--Milgram定理・弱解の存在一意性](volumes/00_foundations/F0_00WK2_Lax_Milgram_存在一意性/index.md) | 2 | 0 | 1 | 0 | 1 | 0 | 2 | 29% | 例見出し0、演習見出し0 |
| P2 | [F0-02C1A 関数解析I-A：Hilbert射影定理・直交分解](volumes/00_foundations/F0_02C1A_Hilbert射影定理_直交分解/index.md) | 3 | 0 | 1 | 1 | 1 | 0 | 1 | 28% | 定理・命題等3件、例見出し0 |
| WATCH | [F0-00B 補講：距離空間・開集合・閉集合・収束](volumes/00_foundations/F0_00B_距離空間_開集合_閉集合_収束/index.md) | 4 | 2 | 6 | 2 | 4 | 0 | 12 | 24% | 定理・命題等4件 |
| WATCH | [F0-00D 補講：コーシー列・完備距離空間](volumes/00_foundations/F0_00D_Cauchy列_完備性_無限次元/index.md) | 4 | 5 | 11 | 2 | 4 | 0 | 9 | 21% | 定理・命題等4件 |
| WATCH | [F0-00D1 補講：ノルム空間・Banach・有限次元と無限次元](volumes/00_foundations/F0_00D1_ノルム_Banach_有限次元_無限次元/index.md) | 2 | 2 | 5 | 1 | 2 | 0 | 9 | 39% | 大きな機械警告なし |
| WATCH | [F0-00D2B 補講：単調収束定理・Fatouの補題・優収束定理](volumes/00_foundations/F0_00D2B_単調収束_Fatou_優収束/index.md) | 9 | 3 | 6 | 1 | 3 | 0 | 4 | 27% | 定理・命題等9件 |
| WATCH | [F0-00P6 特性関数・Lévy連続性定理：分布収束をFourier変換で見る](volumes/00_foundations/F0_00P6_特性関数_中心極限定理/index.md) | 2 | 0 | 1 | 1 | 0 | 0 | 4 | 29% | 例見出し0 |
| WATCH | [F0-00WK3 Encore III：楕円型PDE・Galerkin法・有限要素法への橋](volumes/00_foundations/F0_00WK3_楕円型PDE_Galerkin_FEM/index.md) | 1 | 1 | 0 | 1 | 0 | 0 | 3 | 35% | 直感・意味・見取り図見出し0 |
| WATCH | [F0-00C1 補講：コンパクト性・点列コンパクト性・Heine--Borel](volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md) | 7 | 4 | 4 | 1 | 6 | 0 | 2 | 18% | 定理・命題等7件 |
| WATCH | [F0-00P2 密度・Radon–Nikodym：pmfとpdfを同じ式で読む](volumes/00_foundations/F0_00P2_密度_期待値_Radon_Nikodym/index.md) | 1 | 0 | 2 | 1 | 0 | 0 | 1 | 29% | 例見出し0 |
| WATCH | [F0-00P7B QMD・LAN：統計モデルの局所Hilbert幾何](volumes/00_foundations/F0_00P7B_QMD_LAN/index.md) | 1 | 0 | 1 | 1 | 0 | 0 | 1 | 23% | 例見出し0 |
| WATCH | [F0-00E ベクトル空間・部分空間・span・一次独立・基底・次元](volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md) | 2 | 3 | 3 | 1 | 0 | 0 | 11 | 24% | 大きな機械警告なし |
| WATCH | [F0-00G 凸集合・凸関数・凸最適化の基礎](volumes/00_foundations/F0_00G_凸集合_凸関数_凸最適化/index.md) | 0 | 4 | 1 | 2 | 0 | 0 | 8 | 34% | 大きな機械警告なし |
| WATCH | [F0-00D2 補講：測度空間・測度0・a.e.・可測関数](volumes/00_foundations/F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md) | 5 | 6 | 9 | 1 | 5 | 0 | 7 | 20% | 定理・命題等5件 |
| WATCH | [F0-00P4 limsup・Borel–Cantelli・確率収束：無限回起こる事象を制御する](volumes/00_foundations/F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md) | 3 | 2 | 2 | 1 | 1 | 0 | 6 | 29% | 定理・命題等3件 |
| WATCH | [F0-00C2 補講：コンパクト性の応用・最大最小・最近点](volumes/00_foundations/F0_00C2_コンパクト性の応用_最大最小_最近点/index.md) | 4 | 3 | 5 | 1 | 4 | 0 | 3 | 27% | 定理・命題等4件 |
| WATCH | [F0-00D2A 補講：単関数からLebesgue積分を構成する](volumes/00_foundations/F0_00D2A_単関数_Lebesgue積分_構成/index.md) | 4 | 2 | 7 | 1 | 4 | 0 | 2 | 29% | 定理・命題等4件 |
| WATCH | [F0-02C2 関数解析II：線形汎関数・双対空間・Riesz表現](volumes/00_foundations/F0_02C2_線形汎関数_双対空間_Riesz/index.md) | 1 | 1 | 3 | 1 | 1 | 0 | 7 | 27% | 大きな機械警告なし |
| WATCH | [F0-00C 補講：連続写像・連続性の同値条件](volumes/00_foundations/F0_00C_連続写像_コンパクト性_最大最小/index.md) | 1 | 1 | 2 | 1 | 1 | 0 | 4 | 21% | 大きな機械警告なし |

## 人手判定ラベル

- **FIX-FOLD**: 実質的な完全証明が通常本文へ露出。見取り図は残し、完全証明を proof block へ移す。
- **FIX-NARRATIVE**: 定理・導出の前後に問題意識、最小例、意味、使い道が不足。
- **FIX-EXAMPLE**: 抽象一般論が先行し、低次元・有限集合・数値例が不足。
- **OK-BLACKBOX**: 高度な定理を意図的に黒箱化し、理由と依存先が明記されている。
- **OK**: 証明を後回しにしても本文だけで学習サイクルが成立。

## CIとの役割分担

この監査自体は文章品質のヒューリスティックなので非ブロッキングとする。ただし、人手確認で FIX-FOLD と確定したパターンは `validate:proof-folding` 側へ一般化し、将来の再発をブロックする。

## 2026-09-02 人手監査 round 3

機械上位候補を本文まで読み、スコアだけでは区別できない「本当に折りたたむべき完全証明」と「導出が多いだけの教材」を分離した。

| 講義 | 人手判定 | 対応 |
|---|---|---|
| F0-02C6 Hahn--Banach | **FIX-FOLD** | 一次元延長 → extension poset → chain上界 → Zorn → 全空間、の完全証明を折りたたむ。見取り図は本文に残す。 |
| F0-02C1A Hilbert射影定理 | **FIX-FOLD** | 最小化列 → Cauchy → 完備性 → 閉性 → 一意性、の完全証明を折りたたむ。 |
| F0-00WK2 Lax--Milgram | **FIX-FOLD** | Rieszで作用素化 → coercivity → 単射/閉range → 稠密 → 全射 → 安定性、を一つの完全証明として折りたたむ。 |
| F0-02C7A representer theorem | **FIX-FOLD** | `3. 証明：...` が従来CIをすり抜けていた。representer theoremの証明だけ折りたたみ、kernel SVMの導出は本文に残す。 |
| F0-00P5 強大数則 | **FIX-FOLD** | 最大不等式 → dyadic化 → Borel--Cantelli → gap filling の完全証明を折りたたむ。冒頭/章末の証明地図は残す。 |
| F0-00E2 Cauchy--Schwarz | **FIX-FOLD** | Cauchy--Schwarzと等号条件の完全証明を折りたたむ。三角不等式・Bessel・Parsevalの意味付けは本文に残す。 |
| F0-02C2 Riesz表現 | **FIX-FOLD** | kernelへの射影を使うRiesz表現の完全証明を折りたたむ。有限次元・積分・評価汎関数の具体例は本文に残す。 |
| F0-02B 分離/Farkas | **FIX-FOLD + FIX-EXAMPLE** | 最近点 → 分離 → 錐分離 → Farkas が長い証明鎖。次ラウンドで低次元例を先に置き、技術証明を分割して折りたたむ。 |
| F0-00D5 Vitali | **FIX-FOLD** | 問いと構成は良いが、章全体が非可測性の完全証明。構成の地図を残し詳細な排反・被覆・2ケース矛盾を折りたたむ。 |
| F0-00SP3 Brown運動 | **OK / FIX-EXERCISE** | 共分散・martingale・二次変分の計算は説明的導出。存在定理は意図的に黒箱化済み。証明偏重ではない。 |
| F0-00D4 Lebesgue測度 | **OK-PROOF-TODO / FIX-EXERCISE** | 構成の導線は良い。未完の完全証明は別のproof audit TODOとして管理されており、現状を「完全証明」と誤認して折りたたまない。 |
| F0-00TS2 Herglotz | **OK-BLACKBOX / FIX-EXERCISE** | Herglotzの完全証明を意図的に黒箱化し、white noise・line spectrum・periodogramへ応用している。 |
| F0-00FA2 Fourier変換 | **OK / FIX-EXERCISE** | 畳み込み・微分・PDEへの導出は教材本体。Riemann--Lebesgueは黒箱であることを明示済み。 |
| F0-00P7A MLE漸近論 | **FIX-EXAMPLE** | consistency + score CLT + Hessian LLN + Taylor + Slutsky の導線は良い。Bernoulli/正規など具体モデルを追加する余地がある。 |

### CIへ昇格する事項

今回、人手で `FIX-FOLD` と確認したページから二つの再発パターンが確定した。

1. `## 3. 証明：...`、`## 4. 最大不等式の証明` のような **節番号付き証明見出し**。
2. 見出しを証明と呼ばず本文を続け、最後だけ `これで...証明されました` とする **隠れ完全証明**。

これらは文章品質の曖昧なスコアではなく、完全証明の折りたたみ規約そのものなので `validate:proof-folding` のブロッキング対象へ昇格する。

