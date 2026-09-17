# DREAM THEATER：ODE・Fourier解析・PDE 再編計画

作成日: 2026-09-13

## 0. この計画の目的

現行の `Encore II：Fourier解析・微分方程式` は、

- `F0-00H1` 常微分方程式・線形系・行列指数
- `F0-00FA1` Fourier級数・直交展開
- `F0-00FA2` Fourier変換・畳み込み・反転
- `F0-00FA3` Plancherel・L2 Fourier変換・特性関数
- `F0-00PDE1` 熱方程式
- `F0-00PDE2` 波動方程式・Laplace方程式・変数分離
- `F0-00PDE3` Sturm--Liouville・スペクトル展開

を一本の発展ルートとして並べている。

この構成は「Fourier法でPDEを解く」という一本の物語としてはよいが、**常微分方程式論・Fourier解析・偏微分方程式論を、それぞれ標準的な学部教科書レベルまで学ぶ構成にはなっていない**。特に ODE は PDE の準備に必要な範囲だけへ圧縮され、PDE では一次方程式・特性曲線、二階方程式の型分類、最大値原理、エネルギー法などの標準論点が薄い。

そこで Encore II を次の三系列へ分解し、各系列を独立に「学部標準コア」として読めるように組み替える。

1. **標準常微分方程式コア（ODE）**
2. **標準Fourier解析コア（FOU）**
3. **標準偏微分方程式コア（PDE）**

推奨通読順は

```text
ODE → Fourier解析 → PDE
```

とする。ただし Fourier解析は ODE の全章完了を前提にはせず、PDE が両系列を合流させる設計にする。

---

## 1. 設計原則

### 1.1 「学部標準」と「発展」を分離する

各系列は、典型的な数学・理工系学部の1学期～2学期の教科書で扱われる範囲を `core` とする。測度論・関数解析を使った厳密化や、大学院PDEへ接続する話は `advanced-standard` / `bridge` として明示し、基本ルートへ逆流させない。

特に Fourier解析の最初から Lebesgue 積分・Hilbert 空間を必須にはしない。新しい `FOU*` 系列は旧 `F0-00FA1`～`FA3` を prerequisite・concept owner・proof dependency・forward reference にせず、自立した標準コアとして実装する。旧ページは URL 互換と旧導線のためだけに残す。

### 1.2 正本の所有者を一つにする

同じ理論を三系列で重複証明しない。

- Sturm--Liouville：**ODE 系列が正本**。Fourier/PDE は参照して使う。
- Fourier級数・Fourier変換・Plancherel：**FOU 系列が正本**。PDE は適用に集中する。
- 変数分離法：**PDE 系列が正本**。ODE 側では境界値問題、FOU 側では固有関数展開との関係だけを扱う。
- Laplace変換：**ODE 系列が正本**。Fourier解析では比較を短く行うだけにする。
- Green の恒等式・Green 関数：**PDE 系列が正本**。Sturm--Liouville では必要な1次元の境界恒等式だけを局所的に使う。

### 1.3 ID衝突を避ける

現行の `F0_00FA1`～`F0_00FA3` は Fourier Analysis の略として FA を使っているが、標準数学コアではすでに `FA1` 以降が **Functional Analysis** の正規IDである。

新しい標準Fourier解析系列は **`FOU1`, `FOU2`, ...** を採用し、`FA*` を新規IDには使わない。旧 `F0_00FA*` ファイルは互換リンク・再利用元として扱う。

### 1.4 古いURLを壊さない

既存 `F0_00H1`, `F0_00FA1`～`FA3`, `F0_00PDE1`～`PDE3`, `F0_00R2` は削除しない。

再編後は、必要に応じて

- 旧ページを互換ハブへ変更する
- 旧内容を新章へ移した場合は新しい正本へのリンクを明示する
- 同じ証明を旧新両方で維持しない

という方針にする。

---

# 2. 標準常微分方程式コア（ODE）

## 到達目標

学部標準の ODE 教科書を読んだ学生として、少なくとも次を自力で扱える状態を目標とする。

- 一階 ODE の代表的な解法を使い分ける。
- 初期値問題の局所存在・一意性が何を仮定しているか説明する。
- 高階線形 ODE の解空間、Wronskian、非斉次方程式を扱う。
- 線形連立系を行列指数・固有値・Jordan 構造から解く。
- 平衡点・線形化・位相平面から簡単な非線形系の挙動を読む。
- Laplace変換で初期値問題を解く。
- 級数解・Frobenius法の基本を使う。
- 境界値問題と Sturm--Liouville 問題を理解し、PDE の固有関数展開へ接続する。

## 章構成案

### ODE1 一階常微分方程式・初期値問題

**core**

- ODE、階数、線形/非線形、自律/非自律、初期値問題・境界値問題
- 変数分離形
- 一階線形方程式・積分因子
- 完全微分方程式
- Bernoulli 方程式
- 自律方程式、平衡解、phase line
- 解曲線と方向場
- Picard--Lindelöf の局所存在・一意性
- Lipschitz 条件が一意性に必要になる機構
- 非一意性の標準反例

**証明境界**：存在・一意性は定理名だけで済ませない。固定点法を使うなら、用いる完備性・縮小性・反復列の収束を本文から追えるようにする。

### ODE2 高階線形微分方程式

**core**

- $n$ 階線形 ODE と解空間
- 線形独立性と Wronskian
- 定係数斉次方程式、重根・複素根
- 非斉次方程式
- 未定係数法
- 定数変化法
- Cauchy--Euler 方程式
- Green 関数の1次元的な入口は必要最小限に留め、正本は PDE へ送る

### ODE3 線形連立系・行列指数・安定性

**core**

現行 `F0-00H1` の行列指数部分を中核として再利用する。

- $x'=Ax$ と基本行列
- 行列指数の定義と微分
- 対角化可能な場合
- 複素固有値と実解
- Jordan block の場合
- 非斉次系と variation of constants
- 2次元位相図（node / saddle / spiral / center）
- 固有値実部と線形安定性

### ODE4 非線形系・位相平面・線形化

**core**

- 平衡点
- 線形化
- Jacobian と局所挙動
- 2次元 phase plane
- 保存量を持つ系の例
- 線形化で判定不能になる場合の注意

**停止線**：一般の分岐理論・中心多様体・高度な力学系は標準コア外。

### ODE5 Laplace変換と初期値問題

**core / bridge**

- Laplace変換の定義
- 線形性、微分、移動則
- 逆変換の基本
- 畳み込み
- 階段関数・インパルス応答の考え方
- 定係数 ODE の初期値問題

Dirac delta の厳密な超関数論はここでは行わず、必要なら Encore III へ送る。

### ODE6 級数解・正則特異点

**core**

- 常点での冪級数解
- 係数漸化式
- 正則特異点
- Frobenius 法の基本
- Bessel / Legendre 方程式を代表例として位置付ける

特殊関数の百科事典化はしない。

### ODE7 境界値問題・Sturm--Liouville

**core-advanced-standard / PDE bridge**

現行 `F0-00PDE3` を主要な再利用元とする。

- 二点境界値問題
- 正則 Sturm--Liouville 問題
- Green 型恒等式
- 境界条件込みの自己共役性
- 固有値の実数性
- 異なる固有値に属する固有関数の直交性
- Dirichlet / Neumann と正弦・余弦系
- 固有関数展開の意味

完全性を一般の Sturm--Liouville 理論でどこまで証明するかは実装時に依存先を確認する。証明なしで「完全」と置く場合は、何を外部定理として境界に置いたか明示する。

### ODE-A 数値解法（任意の学部標準補遺）

**bridge**

- Euler 法
- 改良 Euler 法
- Runge--Kutta 法
- 局所誤差・大域誤差の概念
- 安定性の初歩

理論系列を止めないため必須にはしない。

---

# 3. 標準Fourier解析コア（FOU）

## 到達目標

- Fourier級数の係数を導出し、実形式・複素形式を往来する。
- 点wise収束、$L^2$収束、一様収束を混同しない。
- Dirichlet/Fejér kernel と Gibbs 現象の意味を説明する。
- Bessel・Parseval・完全性を理解する。
- Fourier変換の基本法則、畳み込み、微分、反転を扱う。
- Plancherel により $L^2$ Fourier変換を理解する。
- PDE・確率論への接続を使える。

## 章構成案

### FOU1 Fourier級数・直交性・係数計算

**core**

- 周期関数と三角多項式
- 実 Fourier 係数
- 複素 Fourier 係数
- 直交性から係数公式を導く
- 偶関数・奇関数
- 半区間正弦級数・余弦級数
- Bessel 不等式
- 具体的な区分的関数の展開

旧 `F0-00FA1` には依存しない。FOU1 自身で Riemann 積分と有限和から係数公式・有限次数最小二乗性・有限エネルギー評価まで閉じ、旧ページは互換導線に限定する。

### FOU2 Fourier級数の収束・Fejér・Parseval

**core / advanced-standard**

- Dirichlet kernel
- 点wise収束の標準定理
- 跳躍点で左右極限の平均へ収束すること
- Gibbs 現象
- Fejér kernel と Cesàro 平均
- 三角多項式の稠密性・完全性
- $L^2$ 収束
- Parseval 等式
- 点wise / 一様 / $L^2$ 収束の比較

FOU2 も旧 `F0-00FA1` を証明依存先にはしない。必要な Dirichlet / Fejér kernel、収束定理、完全性、Parseval の論証は FOU2 自身または現行 canonical prerequisite だけで閉じ、旧ページは互換導線に限定する。

### FOU3 Fourier変換・畳み込み・反転

**core**

現行 `F0-00FA2` を主要な再利用元とする。

- $L^1(\mathbb R)$ 上の Fourier変換
- 平行移動、尺度変換、変調
- Riemann--Lebesgue
- 畳み込みと畳み込み定理
- 微分と周波数乗算
- Gaussian の Fourier変換
- approximate identity
- Fourier反転
- 代表的な変換対の計算

### FOU4 Plancherel・$L^2$ Fourier解析

**advanced-standard**

現行 `F0-00FA3` を主要な再利用元とする。

- $L^1\cap L^2$ 上の Parseval / Plancherel
- $L^2$ 稠密性
- 全 $L^2$ への拡張
- unitary operator としての Fourier変換
- 畳み込み・微分公式の $L^2$ 的読み方
- 不確定性原理の標準形を追加候補とする

この章だけは測度論・Hilbert 空間を明示的な前提にしてよい。FOU1～FOU3 の基本ルートを巻き込まない。

### FOU5 確率・信号処理への接続

**bridge**

- 特性関数 = 確率測度の Fourier変換
- 独立和と畳み込み
- CLT との接続
- DFT の定義
- FFT はアルゴリズムの位置付けまで
- sampling / aliasing は標準的な応用として扱う場合のみ追加

現行 `F0-00FA3` の特性関数部分はここへ移すか参照する。

**停止線**：Schwartz空間・tempered distribution は Encore III 側の正本を使い、FOUコアへ逆流させない。

---

# 4. 標準偏微分方程式コア（PDE）

## 到達目標

- PDE の初期条件・境界条件・well-posedness の意味を説明する。
- 一階輸送方程式を特性曲線で解く。
- 二階線形 PDE を elliptic / parabolic / hyperbolic に分類する。
- 熱・波動・Laplace/Poisson の三典型を複数の方法で解く。
- 最大値原理・エネルギー法から一意性を証明する。
- Fourier変換・Fourier級数・Sturm--Liouville が PDE 解法でどう働くか説明する。
- 古典解の範囲と弱解理論が必要になる境界を認識する。

## 章構成案

### PDE1 PDEの基本・一次方程式・特性曲線

**core**

- PDE、階数、線形/半線形/準線形の区別
- 初期値問題・境界値問題
- well-posedness の概念
- 一階輸送方程式
- 特性曲線法
- 非斉次輸送方程式
- 簡単な一次準線形方程式
- 特性線の交差と古典解の破綻を例で示す

Burgers 方程式は shock の動機付けまでとし、弱解・entropy solution は Encore III 以降へ送る。

### PDE2 二階線形PDEの分類

**core**

- 二階線形 PDE の主部
- 2変数での判別式
- elliptic / parabolic / hyperbolic
- 標準形への変数変換の考え方
- Laplace / heat / wave が三類型の代表であること
- 型と境界・初期データの関係

分類名を置くだけでなく、具体的な方程式で係数行列または判別式を計算する。

### PDE3 熱方程式

**core**

現行 `F0-00PDE1` を主要な再利用元とする。

- 実数全体上の Fourier変換解法
- Gaussian heat kernel
- 質量保存・平滑化
- 有限区間の変数分離
- Dirichlet / Neumann 境界条件
- Fourier級数による解
- 最大値原理
- 最大値原理からの一意性
- エネルギー減衰の基本計算

Brown運動・semigroup は bridge 欄へ残す。

### PDE4 波動方程式

**core**

現行 `F0-00PDE2` の波動部分を主要な再利用元とする。

- 一次元 d'Alembert 公式
- 初期変位・初速度からの解
- 有限伝播速度・依存領域
- エネルギー保存
- エネルギー法による一意性
- 有限区間での変数分離
- 固有モード・Fourier正弦級数
- Fourier変換による全空間解法との比較

### PDE5 Laplace・Poisson方程式と調和関数

**core**

現行 `F0-00PDE2` の Laplace 部分を拡張する。

- Laplace / Poisson 方程式
- Dirichlet / Neumann 問題
- 調和関数
- 平均値性質
- 最大値原理
- 最大値原理からの一意性
- 長方形での変数分離
- 円板での Poisson kernel を標準例として追加

複素解析を前提にせず、PDE として閉じる証明ルートを優先する。

### PDE6 Greenの恒等式・基本解・Green関数

**advanced-standard**

- 発散定理との接続
- Green の第一・第二恒等式
- Laplace作用素の基本解
- Green 関数の考え方
- Poisson 方程式の表現公式
- 境界条件と一意性

多次元で必要な積分定理は既存の解析正本を参照し、無断使用しない。

### PDE7 Fourier法・固有関数法の統合

**bridge / synthesis**

新しい理論を増やす章ではなく、三系列を統合する章とする。

```text
全空間              有界区間・領域
  │                     │
Fourier変換         Sturm--Liouville
  │                     │
連続周波数          離散固有モード
  └────────┬────────────┘
           ↓
       モードごとのODE
```

- 熱：指数減衰
- 波動：調和振動
- Laplace/Poisson：境界データから空間モードを決める

現行 Encore II の「一本の物語」はこの統合章で保存する。

**停止線**：弱微分・Sobolev空間・弱解・Lax--Milgram・一般楕円型方程式は Encore III の正本とし、PDE標準コアでは古典解までで一度閉じる。

---

# 5. 現行章から新系列への移送表

| 現行ページ | 主な移送先 | 方針 |
|---|---|---|
| `F0_00R2_EncoreII_Fourier解析_微分方程式` | 三系列の互換ハブ | 旧URL維持。新 ODE / FOU / PDE 入口を案内する |
| `F0_00H1_常微分方程式_線形系_行列指数` | ODE1～ODE3 | 内容を捨てず、基礎解法・高階ODE・連立系へ分割再利用 |
| `F0_00FA1_Fourier級数_直交展開` | FOU1～FOU2 | 計算・点wise収束を前段追加し、既存 Fejér/$L^2$ 証明を後段へ |
| `F0_00FA2_Fourier変換_畳み込み_反転` | FOU3 | ほぼ正本として再利用 |
| `F0_00FA3_Plancherel_L2_特性関数` | FOU4～FOU5 | Plancherel と確率 bridge を分離 |
| `F0_00PDE1_熱方程式_Fourier変換` | PDE3 | 最大値原理・有限区間・一意性を補強 |
| `F0_00PDE2_波動方程式_Laplace方程式_変数分離` | PDE4～PDE5 | 波動と楕円型を分離し、それぞれ標準定理を補強 |
| `F0_00PDE3_Sturm_Liouville_スペクトル展開` | ODE7 + PDE7 | Sturm--Liouville の正本を ODE へ移し、PDE は応用参照にする |

---

# 6. 依存DAG案

基本ルートは、測度論・関数解析を必須化しすぎない。

```text
RA3/RA4/RA4A/RA5 + 線形代数
        │
        ├───────────────┐
        ↓               ↓
      ODE1            FOU1
        ↓               ↓
      ODE2            FOU2
        ↓               ↓
      ODE3            FOU3
        ↓               │
   ODE4/5/6             ├────→ FOU4  [MT/L2/Hilbert を追加前提]
        ↓               ↓
      ODE7 ──────────→ PDE1/PDE2
          \             /
           \           /
            → PDE3～PDE6
                 ↓
               PDE7
```

より厳密には、

- ODE3 は線形代数の固有値・Jordan構造を参照する。
- ODE7 は積分・線形代数・境界値問題を前提とする。
- FOU1～FOU3 は実解析中心で読めるようにする。
- FOU4 だけが Lebesgue積分・$L^2$ 完備性・Hilbert空間を追加前提とする。
- PDE1～PDE5 は古典解析・ODE・FOU の標準コアから読めるようにする。
- PDE6 では多変数積分・発散定理等の正本を明示する。

---

# 7. 各章の品質基準

DREAM THEATER の既存規約をそのまま適用する。

## 本文

- 主要な定義には、その直後または近傍に「定義を実際に使う例」を置く。
- 定理名の列挙で完了扱いしない。
- 独習者が本文から核心論証を再構成できる証明粒度を保つ。
- 仮定をどこで使ったかを局所的に示す。
- 「十分滑らか」などの曖昧な条件で積分交換・部分積分・項別微分を押し切らない。
- 点wise / 一様 / $L^2$ 収束、古典解 / 弱解を混同しない。
- 後続理論を使う場合は canonical anchor を張り、先取りを暗黙にしない。

## 演習

ロードマップ/統合ハブ以外の新規・大幅改稿章は原則として

- Level A: 4題以上
- Level B: 3題以上
- Level C: 1題以上

を満たす。

解答は「公式を使う」で終わらせず、変形・積分・係数決定・境界条件適用・一意性論証などの核心操作を目で追える粒度で書く。

## 章ごとの最低構成

1. この章で何を解決するか
2. 前提知識
3. 定義・基本例
4. 主定理と証明/導出
5. 具体例・計算例
6. 他系列への接続
7. A/B/C 演習
8. 詳細解答
9. 章末チェック

---

# 8. 実装順

## Phase 0：棚卸し

1. 現行7章の定義・定理・例・演習を一覧化する。
2. 各ブロックを `keep / move / split / rewrite / compatibility-only` に分類する。
3. 新章IDと既存 canonical anchor の対応を確定する。
4. `dream-theater-standard-math-core.yaml` へ追加するID案を確定する。

**終了条件**：内容を複製せず移送できる対応表ができること。

## Phase 1：ODE を標準教科書レベルへ拡張

順序：

```text
ODE1 → ODE2 → ODE3 → ODE4 → ODE5 → ODE6 → ODE7
```

まず現行 H1 を分解・再利用し、その後に不足している存在一意性、非斉次高階方程式、非線形系、Laplace変換、級数解、Sturm--Liouvilleを補う。

## Phase 2：Fourier解析を再編

順序：

```text
FOU1 → FOU2 → FOU3 → FOU4 → FOU5
```

既存 FA1～FA3 は数学的内容を極力保存し、初学者向けの標準 Fourier 級数論と、測度論的な厳密化を層分けする。

## Phase 3：PDE を標準教科書レベルへ拡張

順序：

```text
PDE1 → PDE2 → PDE3 → PDE4 → PDE5 → PDE6 → PDE7
```

一次方程式・分類を先に入れ、その後で熱・波動・Laplace/Poissonを「三つの例」ではなく三類型の代表として扱う。

## Phase 4：互換・横断整備

- `F0_00R2` を三系列の互換ハブへ変更
- `textbook/dream-theater.md` の Encore II 目次を三系列へ変更
- `dream-theater-standard-math-core.yaml` と読者向けDAGを同期
- 旧URLから新正本への導線を確認
- 用語・記号・canonical anchor の重複監査
- definition-example / formal-reference / exercise-count / Pages / textbook 等の横断CIを通す

---

# 9. 「学部標準コア」の完了条件

三系列をそれぞれ完成扱いにする条件は次の通り。

### ODE

- 一階解法、存在一意性、高階線形、連立系、位相平面、Laplace変換、級数解、Sturm--Liouvilleを一通り持つ。
- 現行 H1 の「PDEを解くための最低限」から、独立した ODE 教科書レベルへ拡張されている。

### Fourier解析

- Fourier級数の計算だけでなく、収束・Gibbs・Fejér・Parsevalを持つ。
- Fourier変換・反転・畳み込み・Plancherelまで一本につながる。
- 基本ルートと測度論的厳密化の前提が分離されている。

### PDE

- 一階特性曲線と二階型分類を持つ。
- 熱・波動・Laplace/Poissonについて、代表公式だけでなく一意性を支える最大値原理またはエネルギー法まで扱う。
- Fourier法・変数分離・Sturm--Liouvilleの役割分担が明確である。
- 弱解・Sobolevを未説明のまま使わず、Encore IIIとの境界が明示されている。

---

# 10. この再編で維持するもの / 捨てるもの

## 維持するもの

- 現行 Encore II の「ODE → Fourier → PDE がつながる」物語
- Gaussian、特性関数、Brown運動など統計・確率への横接続
- Fejér / Plancherel まで踏み込む既存 Fourier 章の強さ
- Sturm--Liouville を線形代数のスペクトル論と結び付ける見方

## 捨てるもの

- ODE を PDE の準備だけで終える構成
- Fourier解析の入口に測度論・Hilbert空間を実質必須化する一本道
- 熱・波動・Laplaceを並べただけで PDE 標準コア完了とみなす構成
- Sturm--Liouville の同内容を ODE / Fourier / PDE の各系列で重複保持すること
- `FA` が Fourier Analysis と Functional Analysis の両方を意味するID運用

---

## 最終形

```text
標準実解析・線形代数
        │
        ├───────────────┐
        ↓               ↓
 標準ODEコア        標準Fourier解析コア
        │               │
        ├──────┬────────┘
               ↓
          標準PDEコア
               │
               ↓
 Encore III：distribution / Sobolev / 弱解
```

Encore II という名称は過去URL互換と三系列への入口として残してよいが、**教材の正本構造は ODE / FOU / PDE の三系列へ分解する**。

---

# 11. 実装進捗

最終更新: 2026-09-16

この節を再編作業の進捗正本とし、本文・演習・監査・CIの状態を章単位で更新する。`implemented` や CI green だけを教材完成とはみなさず、Section 7 の品質基準を満たしたかを併記する。

## 11.1 Phase 0 棚卸しの進捗

現時点では ODE1 着手に必要な `F0_00H1_常微分方程式_線形系_行列指数` を本文まで監査済み。残りの Fourier/PDE 旧章のブロック単位棚卸しは後続 Phase 2/3 着手前に継続する。

| 既存ブロック | 判定 | 新正本 / 扱い |
|---|---|---|
| H1 §1–4 ODE定義・初期値/境界値・変数分離・一階線形 | `move + rewrite` | ODE1。定義例、解落とし、積分因子の導出を補強 |
| H1 §5–7 二階定係数・調和振動子・重ね合わせ | `move + rewrite` | ODE2。高階線形系として再構成予定 |
| H1 §8–11 連立線形系・行列指数・固有値安定性 | `move + rewrite` | ODE3。行列指数部分を主要再利用元とする |
| H1 §12 Fourier解析への接続 | `move / compatibility-only` | PDE7 の統合説明へ移送し、旧H1は互換導線を残す |

旧 H1 の内容を新旧両ページで並行に育てない。ODE2/ODE3への移送が進んだ段階で旧 H1 を互換ハブ化する。

## 11.2 章別ステータス

| 章 | 状態 | 本文・証明 | 演習・詳細解答 | 依存・再利用 | 機械検証 |
|---|---|---|---|---|---|
| ODE1 | **実装・検証完了（PR #276）** | 一階解法、phase line、積分方程式、Lipschitz、Picard--Lindelöf の存在一意性を実装。固定点定理を黒箱化せず Picard 反復の一様Cauchy性から閉じた | A4 / B3 / C1。全問に `solution-start/end` の詳細解答あり | RA3 / RA4 / RA5 を前提。H1 §1–4 を再利用・補強 | textbook / Pages / exercises / concepts / standard math core / terminology の6系統を green 確認 |
| ODE2 | **実装・検証完了（PR #277）** | 連続係数高階線形IVPの存在一意性、n次元解空間、Wronskian / Abel、定係数の重根・複素根、非斉次、未定係数法、定数変化法、Cauchy--Euler、1次元Green核まで実装 | A4 / B3 / C1。全問に詳細解答あり | ODE1 + LA3C。H1 §5–7 を再利用・補強し、ODE3 / 行列指数は逆輸入しない | textbook / Pages / exercises / concepts / standard math core / terminology を検証 |
| ODE3 | **実装・検証完了（PR #280）** | 線形連立系、行列指数の級数構成と微分、基本行列、Jordan block、複素固有対、定数変化公式、2次元位相図、Lyapunov・漸近・指数安定性と境界 Jordan 条件まで実装 | A4 / B3 / C1。全問に詳細解答あり | ODE2 + LA4。H1 §8–11 を移送・補強し、旧H1を ODE1–ODE3 への互換ハブ化。FA2 / PDE1 / PDE2 の旧ODE concept依存も現行IDへ移管 | textbook / Pages / exercises / concepts / standard math core / terminology の6系統 green。proof / formalism pedagogy audit も green |
| ODE4 | **実装・検証完了（PR #282）** | 非線形自律系、平衡点・nullcline、Fréchet/Jacobian 線形化、双曲型・非双曲型を実装。Hurwitz 線形化から局所指数安定性を定数変化公式・剰余評価・退出時刻・解延長まで閉じ、保存量判定と非双曲型の反例も示した | A4 / B3 / C1。全問に詳細解答あり | ODE3 + F0-02C3。一般の Hartman--Grobman、中心多様体、Poincaré--Bendixson、Hopf 分岐は停止線外とし逆輸入しない | textbook / Pages / exercises / concepts / standard math core / terminology の6系統 green。proof / formalism pedagogy audit 実行済み。ODE4 は両監査で機械 P2、人手再査読で OK |
| ODE5 | **実装・検証完了（PR #286）** | 指数位数とLaplace変換の収束、線形性・微分則・2種の移動則、逆変換候補の検証、三角領域の積分交換からLaplace変換の積公式、定係数線形IVP、階段入力、Green核・応答核まで実装 | A4 / B3 / C1。全問に詳細解答あり | ODE2。一般の逆Laplace一意性・Fourier反転・Dirac delta超関数論を逆輸入せず、Green核はODE2正本を参照。片側合成積はFA2の一般畳み込みを先取りしないローカル概念として管理 | textbook / Pages / exercises / concepts / standard math core / terminology の6系統を検証。proof / formalism pedagogy audit も実行 |
| ODE6 | **実装・検証完了（PR #287）** | 収束冪級数表示と項別微分の正当化、常点の冪級数解と係数漸化式・収束、正則特異点の Frobenius 級数・指標方程式・非共鳴収束、指標根の差と共鳴、Bessel / Legendre の代表計算まで実装 | A4 / B3 / C1。全問に詳細解答あり | ODE2 + RA5。複素解析 CA3 や一般特殊関数論を逆輸入せず、Weierstrass M-test / 微分と極限交換は RA5 正本を参照 | textbook 検証一式と proof / formalism pedagogy audit を green 確認。Pages / exercises / concepts / standard math core / terminology は final head で再確認して merge |
| ODE7 | **実装・検証完了（PR #288）** | 二点境界値問題、正則Sturm--Liouville、Lagrange恒等式、分離型自己共役境界条件、実固有値、重み付き直交性、単純性、Dirichlet / Neumann / 混合固有値列、Rayleigh商、共鳴可解条件まで実装。一般完全性は証明境界を明示 | A4 / B3 / C1。全問に詳細解答あり | ODE2。旧PDE3を互換ハブ化し、Sturm--Liouville正本をODE7へ集約。一般固有関数完全性は後続FOU / 関数解析へ送り逆輸入しない | textbook / Pages / exercises / concepts / standard math core / terminology を検証。proof / formalism pedagogy audit も実行 |
| FOU1 | **実装・検証完了（PR #289）** | 周期波形・三角多項式、一周期積分消去則、実 Fourier 係数、N次 Fourier 有限和、固定次数最小二乗性、偶奇対称性、複素指数係数、半区間係数、有限エネルギー不等式を実装。$x$・矩形波・$|x|$・$x^2$・三角形波を手計算し、無限段階の収束論は FOU2 へ分離 | A4 / B3 / C1。全問に詳細解答あり | RA4 のみ。旧 `F0-00FA1`・旧 Fourier 本文を prerequisite / concept owner / proof dependency / forward reference にせず、FOU1 内で有限次数理論を閉じる | textbook / Pages / exercises / concepts / standard math core / terminology の6系統 green。proof / formalism pedagogy audit も実行 |
| FOU2 | **実装・検証完了（PR #290）** | Dirichlet核と積分表示、高周波振動積分の消去補題、区分的C1関数の各点収束、Gibbs現象、Fejér核・Fejér平均、連続周期関数への一様収束、三角多項式の一様稠密性、区分的連続関数の二乗平均収束、係数エネルギー等式（Parseval等式）と三角系の完全性まで実装 | A4 / B4 / C1。全問に詳細解答あり | FOU1のみ。旧 `F0-00FA1`、Lebesgue積分、Hilbert空間を prerequisite / proof dependency にせず、Riemann積分と章内論証で無限段階を閉じる | textbook / Pages / exercises / concepts / standard math core / terminology を検証。proof / formalism pedagogy audit も実行 |

## 11.3 ODE1 で今回閉じた品質論点

- 主役となる ODE / 線形・自律 / 初期値・境界値 / 変数分離 / 一階線形 / 完全微分 / Bernoulli / 平衡解 / Lipschitz の各定義に、条件を実際に確認する例を配置した。
- 変数分離と Bernoulli 変換では、0で割る・$1/y$ を置く操作により平衡解が消える箇所を明示した。
- 積分因子は公式暗記にせず、$(\mu y)'$ を作る条件 $\mu'=p\mu$ から導出した。
- Picard--Lindelöf は $Mh\le b$ が反復を長方形内へ保つこと、$Lh<1$ が縮小性を作ることを局所的に示し、反復列の一様Cauchy性、連続な一様極限、不動点、一意性まで証明した。
- 非一意性反例 $y'=3|y|^{2/3}$ では、結論が偽であるだけでなく Lipschitz 評価と縮小機構が壊れることまで説明した。
- 演習は分類・変数分離・積分因子・完全微分・Bernoulli・phase line・Lipschitz・Picard反復を実際に使わせ、題数だけの水増しを避けた。

## 11.4 ODE1 検証記録

PR #276 では、最初の validation で露出した `glossary.yaml` 欠落、DREAM THEATER manifest 未登録、RA4 formal anchor 参照不足、definition-example の明示ラベル、knowledge metadata と導入順の不整合を、実ログに従って本文・metadata側で修正した。CIを通すためだけの prerequisite 追加はせず、ODE3 の行列指数のみ正当な forward reference として明示した。

最終的に **Validate textbook / Validate Pages assembly / Validate DREAM THEATER exercises / Validate DREAM THEATER concepts / Validate DREAM THEATER standard math core / Validate terminology** の6系統をすべて green 確認した。ODE1 は本文・証明・定義例・演習・詳細解答・依存関係の初回実装を完了し、merge-ready とする。

## 11.5 ODE3 で今回閉じた品質論点と検証記録

- 行列指数は記号として置くだけでなく、成分ごとの絶対・一様収束、項別微分、時間加法則、逆行列まで冪級数から閉じた。
- $x'=Ax$ の一意性は $e^{-(t-t_0)A}x(t)$ の微分が0になることから直接示し、基本行列・主基本行列へ接続した。
- Jordan block では冪零部分が多項式因子を生む機構を明示し、$\operatorname{Re}\lambda=0$ の境界で非自明 Jordan block が Lyapunov 安定性を壊すことを反例と一般証明の両方で示した。
- 複素固有対から実解へ戻す計算、非斉次系の定数変化公式、2次元 node / saddle / spiral / center の読み方を本文から再構成できる粒度にした。
- 旧 F0-00H1 は内容正本から互換ハブへ退役させ、後続 Fourier / PDE 章の旧 ODE concept 依存も ODE1 / ODE2 の現行IDへ付け替えた。
- 演習は A4 / B3 / C1 を実装し、対角系、複素固有値、Jordan block、定数変化、saddle、境界安定性、パラメータ付き完全分類を実際に使わせ、全問に詳細解答を付した。
- **Validate textbook / Validate Pages assembly / Validate DREAM THEATER exercises / Validate DREAM THEATER concepts / Validate DREAM THEATER standard math core / Validate terminology** の6系統を green 確認し、さらに `npm run audit:proof-pedagogy` と `npm run audit:formalism-pedagogy` も green を確認した。

## 11.6 ODE4 で今回閉じた品質論点と検証記録

- 非線形自律系・平衡点、軌道・位相平面・nullcline、線形化、双曲型・非双曲型、保存量の主要定義に、条件を実際に計算して確認する直接例を配置した。
- Fréchet 微分から $F(x_*+u)=DF(x_*)u+r(u)$、$r(u)=o(\|u\|)$ を取り出し、「Jacobian を計算した」ことと「非線形系の挙動を証明した」ことを区別した。
- 線形化行列が Hurwitz の場合は、ODE3 の指数減衰と定数変化公式を用い、剰余の局所評価、積分不等式、退出時刻による球内不変性、有限時刻端点からの解延長まで書いて局所指数安定性を閉じた。
- 非双曲型では $x'=-x^3$ と $x'=x^3$ が同じ線形化 $u'=0$ を持ちながら安定性が逆になることを明示解で示し、失われる機構が三次項の符号であることまで説明した。保存量を持つ非線形振動子では $\nabla H\cdot F=0$ を直接確認し、線形化が判定不能な場合の別ルートを示した。
- Hartman--Grobman、中心多様体、安定多様体、Poincaré--Bendixson、Hopf 分岐、一般分岐理論は停止線外とし、証明なしの黒箱として現在章へ逆輸入しなかった。
- 演習は A4 / B3 / C1 を実装し、平衡点・Jacobian、nullcline、線形化剰余、保存量、Hurwitz 条件、非双曲型反例、非線形振り子、統合的な位相平面解析を実際に使わせ、全問に詳細解答を付した。
- **Validate textbook / Validate Pages assembly / Validate DREAM THEATER exercises / Validate DREAM THEATER concepts / Validate DREAM THEATER standard math core / Validate terminology** の6系統を green 確認した。さらに `npm run audit:proof-pedagogy` と `npm run audit:formalism-pedagogy` を実行し、ODE4 はいずれも機械 P2。前者は「証明4本・直接例5件・証明比15%・省略語候補0」、後者は「proof block 4・隠れ証明0・直接例5件」で、P2 の主因は「直感/意味」という名前の見出しがないことだった。本文の導入、線形化の限界説明、実践フロー、各例を人手で再査読し、見出し追加だけでスコアを下げる修正は不要と判断して **OK** とした。
- 二監査を実行するため一時的に追加した Actions の監査ステップは、結果確認後に元の workflow へ完全に戻した。

## 11.7 ODE6 で今回閉じた品質論点と検証記録

- 係数の収束冪級数表示を局所概念として定義し、冪級数の項別微分を RA5 の Weierstrass M-test と微分・極限交換から正当化した。複素解析の「解析的関数」と語彙・依存を混同しない。
- 常点では係数漸化式を積の Cauchy 型係数比較から導き、重み付き係数評価で局所収束を示したうえで、ODE2 の存在一意性と接続して初期値から定まる局所冪級数解を閉じた。
- 正則特異点では Frobenius 級数、指標方程式、一般係数漸化式を最低次数から導出し、非共鳴時の収束を分母の二次成長と係数評価から示した。指標根の差が正整数の場合も「必ず対数項」とはせず、共鳴段の条件式が成立するかで分岐することを明示した。
- 指標方程式には Cauchy--Euler 方程式から最低次数を実際に計算する直接例を追加し、Bessel 方程式では整数差共鳴、Legendre 方程式では級数の打ち切りを手計算で確認した。
- 演習は A4 / B3 / C1 を実装し、常点・特異点分類、係数漸化式、重根、Bessel、非整数差、共鳴、Legendre 多項式を実際に使わせ、全問に詳細解答を付した。
- 前提は ODE2 + RA5 に保ち、CI の語彙衝突を理由に CA3 を追加しなかった。一般特殊関数論や複素解析的延長も現在章へ逆輸入していない。
- `npm run audit:proof-pedagogy` と `npm run audit:formalism-pedagogy` を含む textbook 検証一式を green 確認した。監査のため一時追加した Actions 処理は最終 head では撤去する。

## 11.8 ODE7 で今回閉じた品質論点と検証記録

- 二点境界値問題では、同じ二階線形 ODE でも端点条件により解が0個・1個・無数個になり得ることを最小例で直接確認した。
- 正則 Sturm--Liouville 問題では $p\in C^1$, $q,w\in C$, $p>0$, $w>0$ の役割を局所的に説明し、Lagrange恒等式と分離型境界条件による境界形式の消滅を省略せず証明した。
- 固有値の実数性、重み付き直交性、分離型条件での固有値の単純性を、Lagrange恒等式と ODE2 の一意性だけで閉じた。
- $-y''=\lambda y$ の Dirichlet / Neumann / 混合境界条件を $\lambda<0$, $\lambda=0$, $\lambda>0$ に分け、正弦・余弦・半整数周波数と Neumann の定数モードを手計算で導いた。
- Dirichlet 問題の Rayleigh 商と粗い固有値下界、共鳴する非斉次問題の必要可解条件まで導出した。
- 一般正則 Sturm--Liouville 問題の固有値列の存在・離散性・完全性は意図的な証明境界として後続 Fourier 解析・関数解析へ送り、後続理論を prerequisite へ逆輸入していない。
- 旧 F0-00PDE3 は互換ハブへ退役させ、Sturm--Liouville の concept ownership を ODE7 へ一本化した。
- 演習は A4 / B3 / C1、全問詳細解答付き。textbook / Pages / exercises / concepts / standard math core / terminology の検証と proof / formalism pedagogy audit を実行した。

FOU2 は **実装・検証完了（PR #290）**。FOU1 の有限次数理論だけを直接前提に、Dirichlet核による各点収束、Gibbs現象、Fejér平均による一様近似、三角多項式の稠密性、二乗平均収束、係数エネルギー等式（Parseval等式）までを Riemann 積分側で閉じた。旧 `F0_00FA1_Fourier級数_直交展開` は証明依存先にしていない。次の実装単位は **FOU3「Fourier変換・畳み込み・反転」**。


## 11.7 FOU2 最終査読（PR #290、2026-09-17）

- 独立数理査読と読者粒度・依存査読を実施し、修正後はいずれも fatal: 0 / major: 0 / minor: 0。
- 二乗平均収束の定義を各関数自身の Riemann 積分可能性で固定し、跳躍点で用いる導関数の左右極限と平均値の定理による展開を明示した。Gibbs・Fejér のステートメントも対象・仮定を単独で確定できる形へ補完した。
- Heine–Cantor と FOU1 の一周期積分消去則へ stable anchor で接続し、周期境界を越える一様連続性の適用を説明した。振動積分の消去補題から未使用の Dirichlet 積分表示への依存辺を除いた。
- B4 を追加し、局所線形補間、Fejér 近似、最小二乗性、二乗平均収束、完全性・係数一意性を詳細解答付きで再構成する演習とした。演習は A4 / B4 / C1。
- 全履歴を取得したローカル環境で通常検証、Pages、演習数、concept strict、standard math core、用語、通常教材 knowledge DAG を検証。proof / formalism pedagogy の候補は本文・証明を読み、誤った仮定や未解消の核心省略がないことを確認した。
- 旧 head `7e449db` の GitHub Actions は検証失敗ではなく maintainer approval 待ちだった。ローカル検証結果と GitHub Actions の実行状態は区別する。
