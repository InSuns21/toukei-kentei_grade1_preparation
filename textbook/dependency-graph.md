# 依存関係

通常カリキュラムの機械可読な正本は `curriculum.yaml` の各章の `prerequisites` です。

```text
F0-00（数学速習）
  -> P1 -> P2 -> P3 -> P4 -> S1
  -> I1 -> I2 -> I3 -> I4
  -> L1 -> L2
  -> E1 / E2 / E3 / E4
```

F0-01は通常教材章として廃止済み。`status: supplementary` の補講は通常カリキュラムの進捗集計へ含めない。補講の局所的な機械可読前提は各 `chapter.yaml` の `prerequisites` を正本とする。

---

## 発展補講：関数解析・RKHS標準通読

```text
F0-00
  ↓
A → A1 → A1B → A1C → B0 → B → B1
                 │
                 └→ A1D → A2 → A3 → A3A  （順序・選択公理・Zornの任意深掘り）
  ↓
C → C1 → C2 → D
  ↓
D0 Cauchy完備化
  ↓
D0A 一般距離空間の完備化
  ↓
D0B Dedekind切断
  ↓
D0C Cauchy構成とDedekind構成の同値
  ↓
E → F → E1 → E2 → F1 → F2
  ↓
D1 → D2 → D2A → D2B → D2C → D2D → D2E
  ↓
G
  ↓
F0-02 → 02A → 02B → 02B1
  ↓
F0-02C1 → C1A → C2
  ↓
C3 → C3A → C4 → C4A → C5 → C5A → C6 → C6A → C7 → C7A
```

位相・コンパクト性へ進む局所的な前提列は

```text
A1 → A1B → A1C → B0 → B → B1 → C → C1
```

とする。A1Bで実数の上限性質・Archimedes性、A1Cでべき集合・集合族・添字集合・添字付き集合族・任意和/任意交差、B0で点列・部分列・「十分大きい添字」、Bで距離空間、B1で位相空間・近傍・部分空間位相・位相的収束・位相的連続性を導入する。A1D・A2・A3・A3Aは順序・整列・選択公理・Zornの補題を追う集合論側の深掘りであり、この局所列の必須前提にはしない。

実数の構成を追う局所列は

```text
D → D0 → D0A → D0B → D0C
```

とする。D0で有理Cauchy列の商から $\mathbb R_C$、D0Aで任意の距離空間の完備化、D0BでDedekind切断から $\mathbb R_D$、D0Cで $\mathbb R_C\cong\mathbb R_D$ を構成する。局所的な必須前提は各 `chapter.yaml` を正本とし、D0Bは上限性質との接続のためA1Bも参照する。

標準通読は細かく刻む一方、局所的な必須前提は各 `chapter.yaml` を正本とする。EはBを前提とし、D1はD+C2+Eを前提とするため、線形代数を測度論より前へ置く。例としてHahn--Banach本体C6はA3+C2から、RKHS本体C7はC2から読める。02AはFarkasの証明を02Bへ参照するが、02Bは02Aを必須前提としないため循環しない。C2のRiesz標準証明はC1AのHilbert射影定理を使用する。

---

## 幾何学編：滑らかな多様体から微分形式へ

線形代数側では、多様体上のテンソル場・微分形式へ進む前にテンソル積と外積代数を閉じる。

```text
LA3A 代数的双対 ─┐
                  ├→ LA3E テンソル積・外積代数
LA3D 抽象行列式 ─┘
```

現在実装済みの幾何学主線は GEO1--GEO7 である。

```text
TOP4 Hausdorff・第二可算 ─┐
                           ├→ GEO1 滑らかな多様体・滑らかな写像
RA6A 逆関数定理 ──────────┘
                                  ↓
LA3A 代数的双対 ───────────────→ GEO2 接空間・余接空間・微分・接束
                                  ├────────────→ GEO3 階数定理・部分多様体 ─→ GEO4 1 の分割・局所化・埋め込み
                                  │                 ↑                              ↑
RA6A 逆関数定理 ──────────────────┘                 │                              │
TOP5A Urysohn・局所コンパクト性 ───────────────────────────────────────────────────┘
                                  │
                                  └→ GEO5 ベクトル場・局所流・Lie 括弧 ─→ GEO6 Frobenius
                                      │
LA3E テンソル積・外積代数 ────────────┼→ GEO7 テンソル場・微分形式・外微分
GEO2 接・余接空間・微分 ───────────────┘
```

GEO2 は接空間・余接空間・写像の微分を canonical に担当する。GEO3 は定数階数定理・はめ込み・沈め込み・正則値・埋め込み部分多様体、GEO4 は局所有限細分・滑らかな局所化関数・1 の分割とコンパクト多様体の有限次元 Euclid 埋め込みを担当する。

GEO5 は ODE1 / ODE4 の存在一意性を再利用して積分曲線・局所流を構成し、Lie 括弧・流れによる解釈・ベクトル場の直線化定理を閉じる。GEO6 は GEO3 と GEO5 から Frobenius の定理を証明する。

GEO7 は GEO2・GEO5・LA3E を直接 prerequisite とする。LA3E のテンソル積・外積・内部積を点ごとの接空間へ適用し、微分形式の引き戻し、外微分、$d^2=0$、外微分の自然性、Lie 微分、Cartan の公式までを canonical に担当する。外微分の座標不変表示で Lie 括弧、Cartan の公式で局所流を使うため、GEO5 は実際の証明依存である。

GEO8 以降は未実装なので reader-facing DAG へ先行登録しない。

---

## 完全基礎論（DREAM THEATER）

Lebesgue測度そのものの建設まで追う場合はD2の直後に次を読む。π--λ定理 D3A は、生成 σ 代数へ性質を拡張する独立した道具として P4 からも参照する。

```text
F0-00D2
  ↓
F0-00D3 外測度・Caratheodory可測性
  ├────────────→ F0-00D4 Lebesgue測度・Borel集合・拡張定理
  └→ F0-00D3A π--λ定理・Dynkin族 ─→ F0-00D4
                                      ↓
                         F0-00D5 Vitali集合・非可測集合・選択公理
  ↓
F0-00D2Aへ復帰
```

D4 は拡張の一意性証明で D3A の π--λ 定理を使うため、局所前提を D3 と D3A の両方とする。D4〜D5は関数解析・RKHSにも確率論補講にも必須前提としない。一方、P4で Kolmogorov の 0--1 則を証明するときも D3A の π--λ定理を局所前提として使う。D3A 自身の前提はその knowledge / dependency metadata を正本とする。

---

## 確率論「それどこから来た？」

```text
F0-00D2
  ↓
P1 確率空間・確率変数・分布
  ↓
P2 RN密度・pmf/pdf → P2A 期待値・LOTUS
  ↓
P3 独立・積測度 → P3A 条件付き期待値 → P3B L2射影・最良予測
  ↓
P4 limsup/liminf・末尾事象・0--1則・Borel--Cantelli → P4A UI・Vitali
  ↑
D3A π--λ定理（P4の独立性拡張で使用）
  ↓
P5 有限分散SLLN → P5A 一般iid SLLN
  │
  └────────────→ P6 特性関数・Lévy → P6A iid CLT
                                      ↓
P7 正則model・score・Fisher → P7A MLE漸近論
                         └──→ P7B QMD・LAN
```

標準通読と必須前提は分離する。P4は末尾事象の0--1則を本文で閉じるため D3A を局所前提に持つ。P6/P6AはSLLNを証明に使わず、P5Aはheavy-tailまでSLLNを証明したい読者向け。P3BはHilbert予測への橋、P7BはP7Aを経由せずQMD/LANへ入れる。

---

## DREAM THEATER：標準複素解析 I--II

複素解析の読順は CA1--CA6 を局所理論・Cauchy 理論・留数・解析接続・円板幾何の主線、CA7--CA12 を大域正則関数論・Riemann 面・関数構成・特殊関数の後半系列とする。局所的な必須前提の正本は各 `chapter.yaml` である。

~~~text
CA1 → CA2 → CA3 → CA4 → CA5 → CA6
                              ↓
TOP5 ───────────────────────→ CA7 正則関数列・正規族・Riemann 写像
                              ├───────────────┐
                              ↓               ↓
TOP1/TOP2/TOP4/TOP5 ───────→ CA8             CA10 ← CA4
                              ↓               ↓
                            CA9             CA11
                                                ↓
FOU2 ──────────────────────────────────────────┤
FOU3 ──────────────────────────────────────────┤→ CA12
F0-00D2C ──────────────────────────────────────┘
~~~

CA8 は CA7 に加えて商位相・Hausdorff 性・第二可算性・コンパクト性を使い、複素トーラスまで構成する。CA9 は CA8 の複素トーラスを楕円関数の自然な定義域として使う。

別枝では CA10 が CA7 の局所一様収束と CA4 の Laurent 展開・留数を使って Weierstrass 因数分解と Mittag--Leffler の定理を構成し、CA11 の Gamma 関数、CA12 の Riemann ζ 関数へ進む。CA12 のテータ変換は FOU3 の Gauss 関数の Fourier 変換と FOU2 の Fourier 級数収束を直接参照し、Mellin 表現で F0-00D2C の Fubini の定理を使う。

---

## Encore II：Fourier Analysis & Differential Equations

現行主線は ODE1--ODE11 / FOU1--FOU5 / PDE1--PDE12 とする。再編前の F0-00H1、F0-00FA1--F0-00FA3、F0-00PDE1--F0-00PDE3 は archive / migration source とし、現行 prerequisite / concept owner / proof dependency にしない。

```text
ODE1 → ODE2 → ODE3 → ODE4
                    ↓
                  ODE8 → ODE9 → ODE10 → ODE11
ODE2 → ODE6 → ODE7 ───────────────┐
                                   │
FOU1 → FOU2 → FOU3 → FOU4 → FOU5 │
                                   ↓
PDE1 → PDE2 → PDE3 → PDE4 → PDE5 → PDE6 → PDE7 → PDE8 → PDE9
  │                                  │              │
  └──────────────→ PDE12 ← ODE8      └→ PDE10 → PDE11
                       ↑                  ↑       ↑
                     RA6A              VC4/VC6  ODE6/VC6
```

ODE8 は ODE4 の局所非線形系を最大解・Grönwall・流れへ拡張する。ODE9--ODE11 は Lyapunov 法、平面周期軌道、局所分岐へ進む。Poincaré--Bendixson の平面位相入力と一般 Hopf 定理は停止線を明示する。

PDE8 は PDE7 の古典解主線へ Duhamel 非斉次問題を追加する。PDE9 は多次元波動、PDE10 は PDE6 と VC4/VC6 を使う一般次元ポテンシャル論、PDE11 は ODE6 と VC6 を使う特殊関数・球面調和、PDE12 は PDE1 + ODE8 + RA6A から一般一階 PDE と Hamilton--Jacobi の古典特性論へ進む。

読者向け入口は `F0_00R2_EncoreII_Fourier解析_微分方程式/index.md`。
---

## Encore III：Graduate PDE — Distributions, Sobolev Spaces & Weak Solutions

現行主線は GPDE1--GPDE10 とする。再編前の F0-00DS1、F0-00DS2、F0-00SOB1、F0-00SOB2、F0-00WK1、F0-00WK2、F0-00WK3 は archive / migration source であり、現行主線の prerequisite / concept owner / proof dependency にしない。

~~~text
PDE7 / F0-00D2 / F0-02C1 / F0-02C2
  ↓
GPDE1 テスト関数・distribution
  ↓
GPDE2 distribution微分・mollifier・弱微分
  ↓
GPDE3 Sobolev空間
  ↓
GPDE4 H_0^1・Poincare・trace
  ↓
GPDE5 Sobolev embedding・compactness
  ↓
GPDE6 弱形式・変分形式
  ↓
GPDE7 Lax--Milgram
  ↓
GPDE8 二階線形楕円型PDE
  ↓
GPDE9 楕円型正則性
  ↓
GPDE10 Galerkin・時間発展PDEの弱解
~~~

補助依存として、GPDE5 の weak convergence は FA3 を canonical reference とする。GPDE6 は Encore II の PDE5（Laplace / Poisson）を古典側の接続元とし、GPDE10 は PDE3 / PDE4（熱・波動）を弱解の立場から再訪する。

読者向け入口は `F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md`。未完成 GPDE 章は reader-facing index に先行登録しない。
---

## Encore IV：Stochastic Analysis & Time Series

現行主線は STO1--STO14 と TSA1--TSA6 とする。再編前の F0-00SP1--F0-00SP5、F0-00TS1、F0-00TS2、F0-00TS2A、F0-00TS3 は archive / migration source であり、現行主線の prerequisite / concept owner / proof dependency にしない。

~~~text
TOP6 → TOP7 一様構造

F0-00D4 + F0-00C1
  ↓
MT8 Hausdorff measure / dimension
  │
  └────────────────────────────────────┐
                                       ↓
F0-00P1 + F0-00P3C               STO4 + STO5 + STO8
  ↓                                    ↓
STO1 確率過程・filtration・stopping time  STO4A Brownian path geometry
  ├──────────────→ STO2A 可算状態 Markov chain
  ↓
STO2 離散時間 martingale・不等式・収束
  ↓
STO3 Kolmogorov extension・continuity
  ↓
STO4 Brown 運動・hitting time・strong Markov
  ├──────────────→ STO3A Donsker
  ↓                  ↑
STO5 local martingale│
・quadratic variation│
・semimartingale     │
  ↓                  │
STO6 stochastic integral
  ↓                  │
STO7 multidimensional Ito calculus・Stratonovich
  ↓
STO8 local time・Tanaka

F0-00P6A + STO2 ─────────────────→ STO3A

STO7 → STO9 SDE → STO10 Girsanov
                 ├→ STO11 Markov・generator・martingale problem
                 └→ STO12 Brownian martingale representation

F0-00P6 → F0-00P6B Poisson少数法則 ┐
STO2 ────────────────────────────────┴→ STO13 Poisson・CTMC・random measure
                                       ↓
                                    STO14 Levy・jump calculus

F0-00P3B + Hilbert / Fourier
  ↓
TSA1 定常過程・Hilbert予測
  ↓
TSA2 Wold
  ↓
TSA3 Herglotz・spectral representation
  ↓
TSA4 linear filter・ARMA / ARIMA
  ↓
TSA5 ergodicity・mixing・dependent limit

TSA1 + P3-03 + LA3B + F0-00P7
  ↓
TSA6 状態空間・Kalman フィルタ・イノベーション
~~~

STO1 の direct prerequisite は F0-00P1 と F0-00P3C、STO2 は STO1・F0-00P3C・F0-00P4A とする。後続章でも証明に実際に必要な直接依存だけを各 chapter.yaml に置く。読者向け入口は `F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md`。未完成 STO / TSA 章は reader-facing index に先行登録しない。
---

## Encore V：計算数理

通常教材および Encore II〜IV の必須前提にはしない。新系列では未完成章を canonical dependency として先行登録せず、完成した講から順に依存グラフへ加える。

### 現在の canonical dependency

~~~text
RA3 微分法 ───────┐
                   ├→ NA1 浮動小数点・誤差・条件数・安定性
F0-00F2 SVD・作用素ノルム ─┘

RA2 中間値定理 ─────────────┐
F0-00D Cauchy列・完備性 ────┼→ NA2 非線形方程式・不動点反復・Newton 法
RA3 平均値・Taylor ──────────┤
NA1 誤差・安定性 ────────────┘

NA1 条件数・残差 ───────────┐
NA2 Newton 法・収束次数 ─────┼→ NA3 非線形連立方程式
F0-02C3 Fréchet微分・Jacobian ┤
RA4 微積分学の基本定理 ──────┘

RA3 Rolle・平均値・Taylor ────┐
NA1 誤差・条件付け ──────────┴→ NA4 多項式補間
~~~

NA1 では、最近接丸めの標準相対誤差モデル、丸め因子の積の評価、桁落ち、スカラー関数の相対条件数、2-ノルム行列条件数、前方誤差・後方誤差、残差、後方安定性を扱う。

NA2 では、中間値定理による根の囲い込み、二分法、縮小不動点反復、収束次数、Newton 法、単根近傍での局所二次収束、残差から根誤差への評価を扱う。主要な収束証明では RA2 の中間値定理、F0-00D の完備性、RA3 の平均値定理・Taylor の定理を canonical dependency として用いる。

NA3 では、Fréchet 微分の行列表示として Jacobian を使い、多変数 Newton 法を線形連立方程式として導く。Jacobian の Lipschitz 性から二次線形化誤差を導き、可逆行列の摂動評価と組み合わせて局所収束・二次誤差評価を証明する。さらに逆 Jacobian のノルムから根の局所感度と残差評価を導き、悪条件性・特異 Jacobian・初期値依存を扱う。

NA4 では、Lagrange 補間の存在一意性、分割差分と Newton 補間、Rolle の定理による補間誤差公式を閉じる。節点選択では Chebyshev の最小最大性から Chebyshev 節点を導き、Runge 現象と Lebesgue 定数を通じて近似誤差・データ感度・丸め誤差を区別する。

後続の NA5–NA12、FDM1–FDM4、FEM1–FEM7、MC1–MC4、QMC1–QMC8 は DREAM_THEATER_ENCORE_V_REWRITE_PLAN.md の計画対象であり、各講の実装完了時に実際の直接依存だけを追加する。

読者向け入口は F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md。現在の実装済み本編は NA4 までで、次の実装対象は NA5「数値積分・直交多項式・Gauss 型積分」である。

---
