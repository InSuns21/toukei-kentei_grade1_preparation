# DREAM THEATER 通読監査：証明責務・未定義概念・黒箱境界

この文書は、DREAM THEATER 系列を通読したときに

- 未定義語が推論へ紛れ込まない
- 主要定理が「そういう定理です」で消えない
- 証明済み・後で証明・意図的黒箱を区別できる
- 既存章が過積載なら証明補講へ分割する

ことを保証するための **証明監査正本** です。

教材密度・具体例・演習については [DREAM THEATER 教材密度・例題・演習監査計画](f0-dream-theater-content-exercise-audit.md)、一講義の大きさについては [DREAM THEATER 講義粒度・分割監査](f0-dream-theater-granularity-audit.md) を併用します。

## 現在状態

**2026-09-05 / Batch 13 実装時点**

- P0 読者ブロッカー：**0件**
- P1 後続依存の主要証明：**0件**
- P2 重要な第2陣証明：**0件**
- P3：意図的に黒箱として残す発展定理のみ

したがって、証明監査上の未実装TODOは現在ありません。

---

# 1. 推奨読み順

## 標準基礎論

```text
F0-00
  ↓
A → A1 → A2 → A3 → A3A
  ↓
B → C → C1 → C2 → D
  ↓
E → F → E1 → E2 → F1 → F2
  ↓
D1 → D2 → D2A → D2B → D2C → D2D → D2E
  ↓
G
```

## 完全なLebesgue測度構成

```text
D2 → D3 → D4 → D5 → D2Aへ復帰
```

## 制約付き最適化・関数解析

```text
F0-02 → 02A → 02B → 02B1
  ↓
C1 → C1A → C2 → C3 → C3A → C3B
  ↓
C4 → C4A → C4B → C5 → C5A
  ↓
C6 → C6A → C7 → C7A
```

## 測度論的確率

```text
D2/D2A/D2B/D2C/D2E
  ↓
P1 → P2 → P2A → P3 → P3A → P3B → P3C → P3D
  ↓
P4 → P4A → P5 → P5A → P6 → P6A → P7 → P7A → P7B
```

## Encore II

```text
H1 → FA1 → FA2 → FA3 → PDE1 → PDE2 → PDE3
```

## Encore III

```text
DS1 → DS2 → SOB1 → SOB2 → WK1 → WK2 → WK3
```

## Encore IV

```text
SP1 → SP2 → SP3 → SP4 → SP5
  ↓
TS1 → TS2 → TS2A → E2-03 → TS3
```

## Encore V

```text
NA1 → NA2 → NA3 → NA4
                 ├→ FEM1 ─┐
P5/P6 → MC1 → MC2 → SDE1 → SDE1A ─┤→ UQ1 → MLMC
```

---

# 2. 優先度

| 優先度 | 意味 | 現在 |
|---|---|---:|
| **P0** | 未定義語・循環依存・初見で読者を止めるブロッカー | 0 |
| **P1** | 後続章が直接依存する主要定理。原則完全証明 | 0 |
| **P2** | 標準的かつ重要。専用補講へ分離してよいが証明する | 0 |
| **P3** | 完全証明が別分野を大きく要求する発展定理。黒箱明示で可 | 意図的残存 |

---

# 3. P0：読者ブロッカー監査

すべてDONEです。

- `DONE-P0-F000-01`：F0-00 のHessian・Lagrange・射影等を先取りラベル化
- `DONE-P0-A-01`：A の $X^*$・normal cone・CQ 等を先取りと明示
- `DONE-P0-D2-01`：Borel $\sigma$ 代数を初出前に定義
- `DONE-P0-D2-02`：積 $\sigma$ 代数・積測度をTonelli/Fubini前に定義
- `DONE-P0-D2-03`：Lebesgue測度を受け入れる標準ルートとD3/D4構成ルートを分離
- `DONE-P0-C1-01`：連続関数の一様極限の連続性を接続

P0残件：**0**。

---

# 4. P1：後続を支える主要命題

## 位相・コンパクト性・完備性

- `DONE-P1-B-01`：閉集合の列による特徴付け
- `DONE-P1-B-02`：閉包の列による特徴付け
- `DONE-P1-C-01`：$\varepsilon$--$\delta$ / 列 / 開集合逆像による連続性の同値
- `DONE-P1-C-02`：compact $\Leftrightarrow$ sequentially compact（距離空間）
- `DONE-P1-C-03`：Heine--Borel
- `DONE-P1-C-04`：compactの連続像・Weierstrass最大最小
- `DONE-P1-C-05`：有限直積compact・互いに素なcompact集合間の正距離
- `DONE-P1-D-01`：有限次元ノルム同値・完備性
- `DONE-P1-D-02`：compact metric space は complete

## Lebesgue積分・測度構成

- `DONE-P1-D2-04`：単調収束定理
- `DONE-P1-D2-05`：Fatouの補題
- `DONE-P1-D2-06`：優収束定理
- `DONE-P1-D2-07`：積測度の存在一意性
- `DONE-P1-D2-08`：Tonelli / Fubini
- `DONE-P1-D2-09`：Minkowski と $L^p$ ノルム
- `DONE-P1-D2-10`：$L^2$ 完備性 / Riesz--Fischer
- `DONE-P1-D3-01`：Carathéodory可測集合が $\sigma$ 代数
- `DONE-P1-D3-02`：外測度の制限が可算加法的測度
- `DONE-P1-D4-01`：区間被覆の長さ補題
- `DONE-P1-D4-02`：開区間のCarathéodory可測性
- `DONE-P1-D4-03`：実直線上の開集合の可算互いに素区間分解

## 線形代数・凸解析・KKT

- `DONE-P1-F-01`：Rayleigh商で使うLagrange必要条件
- `DONE-P1-G-01`：$C^2$ 凸性とHessian半正定値性
- `DONE-P1-C4-01`：$\partial(f+\delta_C)=\partial f+N_C$
- `DONE-P1-C5-01`：採用CQを明示した一般化KKT
- `DONE-P1-C5-02`：Robinson CQからmultiplier representation

## 測度論的確率

- `DONE-P1-P2-01`：Radon--Nikodym定理
- `DONE-P1-P3-01`：条件付き期待値のa.s.一意性
- `DONE-P1-P3-02`：条件付き期待値の $L^2$ 射影解釈
- `DONE-P1-P4-01`：Borel--Cantelli第2補題
- `DONE-P1-P4-02`：UI + 確率収束 $\Rightarrow L^1$ 収束
- `DONE-P1-P6-01`：特性関数の一意性
- `DONE-P1-P6-02`：Lévy連続性定理の教材使用版

## Fourier・Sobolev

- `DONE-P1-FA1-01`：三角系の $L^2$ 完備性
- `DONE-P1-FA2-01`：Fourier inversion theorem
- `DONE-P1-FA3-01`：Plancherel定理
- `DONE-P1-FA3-02`：$L^1\cap L^2$ の $L^2$ 稠密性
- `DONE-P1-SOB2-01`：後続で使うPoincaré不等式

## 確率過程・時系列

- `DONE-P1-SP2-01`：有界停止時刻版 optional stopping
- `DONE-P1-SP4-01`：Itô公式
- `DONE-P1-SP4-02`：global Lipschitz条件下のSDE存在一意性
- `DONE-P1-TS1-01`：Wold decomposition
- `DONE-P1-TS2-01`：Herglotz定理

## 数値SDE

- `DONE-P1-SDE1-01`：Euler--Maruyama strong order $1/2$

P1残件：**0**。

---

# 5. P2：重要な第2陣証明

Batch 11--13 で全件を本文または専用補講へ実装しました。

| 旧P2項目 | 状態 | 実装先 |
|---|---|---|
| 選択公理 $\Leftrightarrow$ Zorn | **DONE** | `F0-00A3A`：partial choice functions、Hartogs、超限再帰、greedy maximal chain |
| Fréchet chain rule | **DONE** | `F0-02C3B`：残差 $o(\|h\|)$ から完全証明 |
| Hilbert adjoint のRiesz導出 | **DONE** | `F0-02C3B`：存在・線形性・有界性・一意性 |
| $N_C(x)=T_C(x)^\circ$ | **DONE** | `F0-02C4B`：$T_C=\overline{\operatorname{cone}(C-x)}$ から両包含 |
| LICQ $\Rightarrow$ MFCQ | **DONE** | `F0-02C5A` 既存本文で証明済み |
| LOTUS / pushforward integration | **DONE** | `F0-00P3D`：指示関数→単関数→MCT→正負部分 |
| tower / take-out / Doob--Dynkin | **DONE** | tower・take-out は `P3A`、Doob--Dynkin は `P3D` |
| dominated family $\Rightarrow$ UI | **DONE** | `F0-00P4` 既存本文で証明済み |
| Riemann--Lebesgue lemma | **DONE** | `F0-00FA2` 既存本文で証明済み |
| spectral representation theorem | **DONE** | `F0-00TS2A`：$L^2(F)$ 稠密性→等長写像→直交増分ランダム測度 |
| Euler--Maruyama weak order 1 | **DONE** | `F0-00SDE1A`：backward Kolmogorov→local $O(h^2)$→global $O(h)$ |

P2残件：**0**。

### P2完了時の教材密度ルール

新設した証明補講は、既存の概念章を肥大化させず、原則

```text
前提の再確認
→ 定義
→ 具体例
→ 定理
→ 完全証明
→ A問題2問
→ B問題2問
```

で一つの学習サイクルを閉じています。

---

# 6. P3：意図的に黒箱としてよい発展定理

P3は「証明がないから未完成」ではありません。本文に **この教材では定理として使う** ことと、必要な追加前提を明示できていればよいものです。

主な対象は次です。

- 順序数・超限再帰そのものをZF公理から構成する集合論基礎
- Jordan--von Neumann theorem の完全証明
- Moore--Aronszajn theorem の最大一般性での構成証明
- 一般trace theorem
- 一般Sobolev embedding
- Rellich--Kondrachov compactness
- 一般Carathéodory extension theorem の最大一般性
- semimartingale一般論・Girsanov・local time
- 一般SPDE理論
- 一般MCMC / SMC / advanced QMC

なお、旧P3候補だった「ACとwell-ordering theoremの関係」は `A3A` でACから整列可能定理を導くところまで実装済みです。

---

# 7. 証明済みで機械的TODO化しない代表例

- Cauchy--Schwarz
- Bessel不等式
- Parseval
- Hilbert projection theorem
- Riesz representation theorem
- Hahn--Banach theorem
- Vitali集合の非可測性
- 強大数則
- Borel--Cantelli第1補題
- RKHSのkernel PSD性
- representer theorem
- Itô isometry
- Lax--Milgram theorem
- Galerkin orthogonality / Céaの補題

定理名が出てくるだけでTODOへ戻さず、**実際に後続が依存するか・既存証明が十分か**を本文で確認して判断します。

---

# 8. Batch履歴

- **Batch 0**：先取り語・Borel・積測度などP0ブロッカー除去
- **Batch 1**：距離・compact・complete
- **Batch 2**：Lebesgue積分
- **Batch 3**：Lebesgue測度構成
- **Batch 4**：凸解析・KKT
- **Batch 5**：RN・条件付き期待値・UI・特性関数
- **Batch 6**：Fourier / Sobolev
- **Batch 7**：optional stopping・Itô・SDE・Wold・Herglotz
- **Batch 8**：Euler--Maruyama strong convergence
- **Batch 9**：確率収束・Lévy等の残件
- **Batch 10**：Rayleigh/Lagrange、Hessian判定を閉じ **P1=0**
- **Batch 11**：`SDE1A`、Euler--Maruyama weak order 1
- **Batch 12**：`C3B` / `C4B` / `P3D`、P2を2件まで圧縮。SDE1Aのformal/索引負債も修正
- **Batch 13**：`A3A` / `TS2A` を追加し **P2=0**

---

# 9. 本文表記の規約

## 未補完の主要命題が新たに見つかった場合

```markdown
> **TODO（証明補完・P1/P2）**
> 後続章が依存するため、監査台帳へIDを追加し、本文または専用補講で証明する。
```

## P3として意図的に黒箱化する場合

```markdown
> **この教材では定理として使う**
> 完全証明には本ルート外の追加前提が必要なため、ここでは仮定・結論・使用箇所を明示して使う。
```

読者が「証明済み / 後で証明 / 意図的黒箱」を区別できることを優先します。

---

# 10. 通読保証の完了条件

1. 推論に使う概念は使用前に定義済み。
2. 単なる予告語は「先取り」と明記。
3. P1命題には完全証明がある。
4. P2命題には本文または専用補講の証明がある。
5. P3命題は黒箱であることと必要条件を明示。
6. `prerequisites` と本文が実際に要求する前提が一致。
7. 前提へ戻るリンクが特定できる。
8. 主要定義・主要定理はformal panelとstable anchorを持つ。
9. 主要概念に具体例または反例がある。
10. 原則として各講義にA/B演習がある。
11. B問題を主力とし、C問題は必要な章だけに置く。
12. 説明だけで終わる主要learning objectiveを残さない。
13. 一講義が過積載ならURL互換を保ちながら補講へ分割する。
14. `dream-theater-index.json` と `dream-theater.md` に孤児章・重複章・順序ずれを残さない。
15. textbook / Pages / terminology のstrict CIを通す。

Batch 13完了後は、証明TODOを探す監査から **教材密度・演習品質・章粒度の横断監査**へ主戦場を移します。
