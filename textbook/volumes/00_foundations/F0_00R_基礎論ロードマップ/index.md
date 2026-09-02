# F0-00R 基礎論ロードマップ：標準ルートと発展Encore

このページは、F0-00の先に増えた発展補講を **どこまで読めばよいか** 整理するための入口です。

出発点は [F0-00 統計検定1級のための数学速習](../F0_00_統計検定1級のための数学速習/index.md) です。

設計基準は一貫して次です。

> **物量に負ける可能性はあるが、未定義語に殴られて脱落する構成にはしない。**

通常カリキュラムへ不要な必須依存は追加せず、深掘りは明示的な分岐として隔離します。

---

## 1. 標準通読ルート：F0-00からRKHSまで

```text
F0-00 → A → A2 → B → C → C1 → C2 → D → D1
  ↓
D2 → D2A → D2B → D2C → D2D → D2E
  ↓
E → E2 → F → G → F0-02 → 02A → 02B
  ↓
C1 → C2 → C3 → C4 → C5 → C6 → C7
```

C〜C2は連続性・コンパクト性・存在定理、D〜D1は完備性・ノルム空間・有限/無限次元を一講義ずつ閉じます。A2はHahn--BanachのZorn証明、D2〜D2Eは測度・Lebesgue積分・収束定理・積測度・$L^p$・$L^2$完備性を一講義ずつ閉じる橋です。

---

## 2. 完全基礎論：DREAM THEATER

Lebesgue測度そのものの建設まで追う場合だけD2の直後に挿入します。

```text
D2 → D3 外測度・Caratheodory可測性
   → D4 Lebesgue測度・Borel集合・拡張定理
   → D5 Vitali集合・非可測集合・選択公理
   → D2Aへ復帰 → D2B → D2C → D2D → D2E
```

この分岐は標準RKHSルートの必須にはしません。

---

## 3. 確率論「それどこから来た？」

```text
D2 → P1 確率空間・確率変数・分布
D2A ─→ P2 Radon--Nikodym・密度・期待値
D2C / D2E ─→ P3 独立・積測度・条件付き期待値
D2B ─────────→ P4 収束・Borel--Cantelli・一様可積分性
                 ↓
                P5 強大数則 → P6 特性関数・CLT → P7 統計モデル・尤度・正則性
```

確率変数を可測写像、分布を押し出し測度、pdfをRadon--Nikodym密度、期待値をLebesgue積分として読み直します。

---

## 4. Encore II：Fourier Analysis & Differential Equations

[Encore II ロードマップ](../F0_00R2_EncoreII_Fourier解析_微分方程式/index.md)

```text
H1 ODE・行列指数
 ↓
FA1 Fourier級数
 ↓
FA2 Fourier変換・畳み込み
 ↓
FA3 Plancherel・L2 Fourier・特性関数
 ↓
PDE1 熱方程式
 ↓
PDE2 波動・Laplace・変数分離
 ↓
PDE3 Sturm--Liouville
```

特性関数が確率測度のFourier変換であることから、微分作用素の周波数対角化・古典PDE・固有関数展開へ進みます。目安は約30時間です。

---

## 5. Encore III：Distributions, Sobolev Spaces & Weak Solutions

[Encore III ロードマップ](../F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md)

```text
DS1 Schwartz超関数・Dirac delta
 ↓
DS2 超関数微分・弱微分
 ↓
SOB1 Sobolev W^{k,p}・H^k
 ↓
SOB2 H_0^1・Poincare・trace
 ↓
WK1 弱形式・Poisson
 ↓
WK2 Lax--Milgram
 ↓
WK3 Galerkin・FEMへの橋
```

中心線は

$$
\text{超関数}
\to\text{弱微分}
\to\text{Sobolev}
\to\text{弱形式}
\to\text{Lax--Milgram}
\to\text{Galerkin/FEM}
$$

です。目安は約30時間です。

---

## 6. Encore IV：Stochastic Processes & Spectral Time Series

[Encore IV ロードマップ](../F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md)

```text
SP1 filtration・stopping time
 ↓
SP2 martingale
 ↓
SP3 Brown運動・二次変分
 ↓
SP4 Ito積分・SDE
 ↓
SP5 generator・Kolmogorov・Fokker--Planck
 ↓
TS1 Hilbert予測・innovation・Wold
 ↓
TS2 spectral measure/density
 ↓
E2-03 AR・MA・ARIMA
 ↓
TS3 ARMA周波数領域
```

前半は条件付き期待値からSDE・PDE、後半は定常過程からWold・スペクトル解析・ARMA filterへ進みます。目安は約40時間です。

---

## 7. Encore V：Numerical Analysis, FEM & Monte Carlo

[Encore V ロードマップ](../F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md)

Encore IIIのFEM枝とEncore IV/確率論のMonte Carlo・SDE枝を、数値計算として合流させます。

```text
NA1 浮動小数点・誤差・条件数・安定性
 ↓
NA2 疎数値線形代数・CG・前処理
 ↓
NA3 補間・数値微分・quadrature
 ↓
NA4 ODE数値解法・Runge--Kutta

Encore III WK3 ─→ FEM1 mesh・basis・assembly ─┐
                                             │
P5/P6 ─→ MC1 Monte Carlo ─→ MC2 分散削減 ───┼→ UQ1 random PDE / Monte Carlo FEM
                                             │                 ↓
Encore IV SP4 ─→ SDE1 Euler--Maruyama ───────┘               MLMC
```

重要な接続は次です。

- coercivity → SPD stiffness matrix → CG
- Sturm--Liouville / 直交多項式 → Gaussian quadrature
- weak formulation → finite element assembly
- LLN / CLT → Monte Carlo consistency / standard error
- 回帰・射影 → control variate
- 標本抽出論 → stratified Monte Carlo
- Itô / Brown運動 → Euler--Maruyama
- 共分散作用素 → Karhunen--Loeve random field
- FEM mesh hierarchy + common random numbers → MLMC

UQ1では地下水流

$$
-\nabla\cdot(k(x,\omega)\nabla h)=q
$$

を主要例として、random permeabilityをsamplingしsample-wise FEMで解きます。

Encore Vは約45〜50時間を想定します。

---

## 8. III・IV・Vの交差点

```text
Brown運動 → white noise → Schwartz超関数
    │
    └→ SDE → generator → PDE → Sobolev弱解 → FEM
                  │                         │
                  └→ Euler--Maruyama       └→ Monte Carlo FEM
                            │                        │
                            └──────── MLMC ─────────┘
```

理論路線が数値路線で再び合流します。

---

## 9. 目的別の読み方

- **統計検定1級の試験対策**：F0-00から通常教材へ戻る。Encore不要。
- **RKHS・関数解析**：標準通読ルート。
- **漸近統計の理論**：D2からP1〜P7。
- **Lebesgue測度って誰が作った？**：DREAM THEATER。
- **特性関数ってFourier変換ですよね？**：Encore II。
- **古典解がないPDEは？**：Encore III。
- **Brown運動を微分したら？ ARMAをFourier変換したら？**：Encore IV。
- **で、実際どうやって計算するの？**：Encore V。

---

## 10. 通読可能性の確認基準

全発展ルートで次を守ります。

1. 定義語は原則として使う前に導入する。
2. 高度定理を証明しない場合はその旨を明記する。
3. 前章の概念が次章で何に使われるかを明記する。
4. conditioning/stability、discretization/samplingなど似た誤差概念を区別する。
5. 標準カリキュラムへ不要な発展前提を逆流させない。
6. 各Encoreに停止線を置く。
7. 数値結果では数学的近似誤差と計算アルゴリズム誤差を分ける。

---

## 11. 現在の全体像

```text
                         ┌→ DREAM THEATER D3-D5
                         │
F0-00 → foundations → D2 ├→ Probability P1-P7
                         │
                         └→ Functional analysis / RKHS
                                      │
                                      └→ Encore II Fourier / PDE
                                                    │
                                                    └→ Encore III weak PDE / FEM

Probability + Fourier ─→ Encore IV stochastic process / spectral TS
          │                            │
          └──────────────┬─────────────┘
                         ↓
               Encore V numerical analysis
                 ├→ FEM
                 ├→ Monte Carlo
                 ├→ SDE simulation
                 └→ UQ / MLMC
```

もはや一本の道ではなく、**前提関係を壊さず乗り換えられる地下鉄網**として管理します。
