# F0-00R 基礎論ロードマップ：標準ルートと発展Encore

このページは、F0-00の先に増えた発展補講を **どの順番で読めば未定義語にぶつからないか** 整理するための入口です。

出発点は [F0-00 統計検定1級のための数学速習](../F0_00_統計検定1級のための数学速習/index.md) です。

設計基準は一貫して次です。

> **物量に負ける可能性はあるが、未定義語に殴られて脱落する構成にはしない。**

F0-00本体は試験計算を優先した速習です。そこから理論へ進む場合は、「計算できる」ことと「定義・定理を知っている」ことを区別します。

---

## 1. 標準通読ルート：線形代数を先に理論化する

標準ルートは次です。

```text
F0-00
 ↓
A → A1 → A2 → A3
 ↓
B
 ↓
C → C1 → C2
 ↓
D  コーシー列・完備距離空間
 ↓
E  ベクトル空間・部分空間・span・一次独立・基底・次元
 ↓
F  線形写像・表現行列・基底変換・相似・対角化
 ↓
E1 内積・Gram--Schmidt・直交射影・QR
 ↓
E2 Cauchy--Schwarz・Bessel・Parseval
 ↓
F1 固有空間・実対称行列・スペクトル定理・PSD
 ↓
F2 SVD・特異値・作用素ノルム
 ↓
D1 ノルム空間・Banach・有限次元と無限次元
 ↓
D2 → D2A → D2B → D2C → D2D → D2E
 ↓
G
 ↓
F0-02 → 02A → 02B → 02B1
 ↓
F0-02C1 → C1A → C2 → C3 → C3A → C4 → C4A → C5 → C5A → C6 → C6A → C7 → C7A
```

### なぜD1より先にE〜F2を読むのか

D1「ノルム空間・Banach」は、冒頭から

- ベクトル空間
- 基底
- 次元
- 有限次元

を使います。

これらを「大学1年でやったはず」として処理すると、関数解析へ入った瞬間に前提が崩れます。

そこで標準ルートでは、Dで距離空間の完備性まで準備したあと、いったん線形代数へ進みます。

特に次の内容は省略しません。

1. ベクトル空間の定義
2. 部分空間・span
3. 一次独立・基底
4. Steinitz交換補題と次元のwell-defined性
5. 基底延長
6. 線形写像・kernel・image・rank-nullity
7. 任意基底に関する表現行列
8. 写像の合成と行列積
9. 基底変換行列
10. 相似変換
11. 固有空間
12. 一般の対角化可能性
13. 代数的重複度・幾何学的重複度
14. 内積・正規直交基底・Gram--Schmidt
15. 射影・最小二乗・QR
16. 実対称行列のスペクトル定理
17. SVD・作用素ノルム

その後でD1へ進むと、有限次元ノルム同値の証明に出てくる

$$
\dim V=p,
\qquad
x=\sum_{j=1}^p\xi_je_j
$$

が未定義語ではなくなります。

---

## 2. 「計算速習」と「理論線形代数」は役割が違う

F0-00本体の線形代数は、統計検定1級の問題を解くために

- 行列積
- 行列式
- 逆行列
- rank
- 固有値
- 固有ベクトル
- 直交対角化
- 二次形式

を計算できることを主目的としています。

一方、E〜F2は

> **なぜその計算が成立するのか、基底を変えるとは何か、行列は何を表しているのか**

を扱う理論ルートです。

したがって両者は重複ではなく、

```text
F0-00：まず計算できるようにする
   ↓
E〜F2：その計算を構造として理解し直す
```

という関係です。

---

## 3. 完全基礎論：DREAM THEATER

Lebesgue測度そのものの建設まで追う場合だけD2の直後に挿入します。

```text
D2
 ↓
D3 外測度・Caratheodory可測性
 ↓
D4 Lebesgue測度・Borel集合・拡張定理
 ↓
D5 Vitali集合・非可測集合・選択公理
 ↓
D2Aへ復帰 → D2B → D2C → D2D → D2E
```

この分岐は標準RKHSルートの必須にはしません。

---

## 4. 確率論「それどこから来た？」

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

## 5. Encore II：Fourier Analysis & Differential Equations

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

特性関数が確率測度のFourier変換であることから、微分作用素の周波数対角化・古典PDE・固有関数展開へ進みます。

---

## 6. Encore III：Distributions, Sobolev Spaces & Weak Solutions

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
\to
\text{弱微分}
\to
\text{Sobolev}
\to
\text{弱形式}
\to
\text{Lax--Milgram}
\to
\text{Galerkin/FEM}
$$

です。

---

## 7. Encore IV：Stochastic Processes & Spectral Time Series

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

前半は条件付き期待値からSDE・PDE、後半は定常過程からWold・スペクトル解析・ARMA filterへ進みます。

---

## 8. Encore V：Numerical Analysis, FEM & Monte Carlo

[Encore V ロードマップ](../F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md)

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

---

## 9. III・IV・Vの交差点

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

## 10. 目的別の読み方

- **統計検定1級の試験対策だけ**：F0-00から通常教材へ戻る。発展補講は不要。
- **線形代数を計算ではなく理論から復習**：E → F → E1 → E2 → F1 → F2。
- **RKHS・関数解析**：標準通読ルートをD1以降まで進む。
- **漸近統計の理論**：D2からP1〜P7。
- **Lebesgue測度って誰が作った？**：DREAM THEATER。
- **特性関数ってFourier変換ですよね？**：Encore II。
- **古典解がないPDEは？**：Encore III。
- **Brown運動を微分したら？ ARMAをFourier変換したら？**：Encore IV。
- **で、実際どうやって計算するの？**：Encore V。

---

## 11. 通読可能性の確認基準

全発展ルートで次を守ります。

1. 定義語は原則として使う前に導入する。
2. 「大学初年級で既習」を理由に理論定義を省略しない。
3. 行列計算と抽象線形代数を区別する。
4. 基底・次元を使う前に、基底の本数が一定である理由まで説明する。
5. 表現行列・基底変換・相似・対角化を固有値計算だけに還元しない。
6. 高度定理を証明しない場合はその旨を明記する。
7. 前章の概念が次章で何に使われるかを明記する。
8. 標準カリキュラムへ不要な発展前提を逆流させない。
9. 各Encoreに停止線を置く。
10. 数値結果では数学的近似誤差と計算アルゴリズム誤差を分ける。

---

## 12. 現在の全体像

```text
F0-00
  ↓
集合・距離・連続・コンパクト・完備
  ↓
線形代数理論
E → F → E1 → E2 → F1 → F2
  ↓
D1 ノルム・Banach
  ↓
D2 → D2A → D2B → D2C → D2D → D2E
  ├→ Probability P1 → ... → P7
  ├→ DREAM THEATER D3 → D4 → D5 → D2Aへ復帰
  └→ G → Optimization / Functional Analysis / RKHS
```

標準ルートでは、**Banach空間へ入る前に有限次元線形代数を理論として一度閉じる**構成にします。
