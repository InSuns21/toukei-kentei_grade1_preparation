# DREAM THEATER 通読監査：未定義概念と証明補完計画

この文書は、F0-00 から DREAM THEATER 本編・確率論補講・Encore II〜V へ進む読者が、**未定義語に殴られず、主要命題を「そういう定理です」で飛ばされすぎずに通読できる**状態を保証するための証明監査正本です。

監査対象は次の4点です。

1. 初出時点で定義されていない概念
2. 「先取り」なのか「既知前提」なのか分からない概念
3. 後続章が直接依存するのに証明がない主要命題
4. 意図的に黒箱とするなら、その旨と理由を明示すべき定理

教材密度・例題・演習は [DREAM THEATER 教材密度・例題・演習監査計画](f0-dream-theater-content-exercise-audit.md)、講義粒度は [DREAM THEATER 講義粒度・分割監査](f0-dream-theater-granularity-audit.md) を併用します。

> **現在地（Batch 11）**  
> P0読者ブロッカーとP1証明責務は解消済みです。P2も床板級の証明を再監査し、Fréchet連鎖律・Hilbert随伴・normal/tangent polar・LOTUS・条件付き期待値の基本性質とDoob--Dynkin・LICQ⇒MFCQ・dominated⇒UI・Riemann--Lebesgueまで本文証明済みに同期しました。現在のP2実残は **A2の選択公理⇔Zorn、TS2のspectral representation、SDE1のweak order 1** です。

---

## 1. 監査した読み順

標準通読線：

```text
F0-00
  ↓
A → A1 → A2 → A3 → B → F0-00C → F0-00C1 → F0-00C2 → D → D1 → D2 → D2A → D2B → D2C → D2D → D2E → E → E1 → E2 → F → F1 → F2 → G
  ↓
F0-02 → 02A → 02B → F0-02C1 → C2 → C3 → C3A → C4 → C4A → C5 → C5A → C6 → C6A → C7 → C7A
```

完全基礎論：

```text
D2 → D3 → D4 → D5 → D2Aへ復帰
```

測度論的確率：

```text
D2/D2A/D2B/D2C/D2E → P1 → P2 → P3 → P4 → P5 → P6 → P7
```

Encore II：

```text
H1 → FA1 → FA2 → FA3 → PDE1 → PDE2 → PDE3
```

Encore III：

```text
DS1 → DS2 → SOB1 → SOB2 → WK1 → WK2 → WK3
```

Encore IV：

```text
SP1 → SP2 → SP3 → SP4 → SP5 → TS1 → TS2 → E2-03 → TS3
```

Encore V：

```text
NA1 → NA2 → NA3 → NA4
                 ├→ FEM1 ─┐
P5/P6 → MC1 → MC2 → SDE1 ─┤→ UQ1 → MLMC
```

---

## 2. 優先度

| 優先度 | 意味 |
|---|---|
| **P0** | 未定義語・循環依存・その場で「なにこれ？」になる読者ブロッカー。証明より先に修正する。 |
| **P1** | 後続の論理鎖が直接依存する主要定理。原則として本文または専用補講で完全証明する。 |
| **P2** | 標準的で重要だが、局所的には別の証明済み定理で代替できる／一旦黒箱でも通読可能。教材全体の床板として有用なら第2陣で証明する。 |
| **P3** | 発展定理。完全証明すると別分野の大きな前提が必要。使用条件と黒箱である理由を明記する。 |

### 実装上の原則

- 通常の有限次元結果は、証明が短く閉じるなら黒箱化しない。
- 定義は原則 `**定義の確認**` で条件を具体例に照合する。
- theorem / lemma の依存は stable anchor で明示し、「前節の補題から」だけで済ませない。
- `<!-- proof-start -->` の直後には「証明」を含む見出しを置く。
- 編集した章は grandfather に頼らず strict validator を通す。

---

# 3. P0：読者ブロッカー

すべて解消済みです。

| ID | 状態 | 対応 |
|---|---|---|
| DONE-P0-F000-01 | ✅ | Hessian・Lagrange未定乗数法・正定値性・射影・Schur complement等を先取りラベルと明記 |
| DONE-P0-A-01 | ✅ | `X^*`・normal cone・row full rank・constraint qualification等を先取りと明記 |
| DONE-P0-D2-01 | ✅ | Borel σ代数を初出前に定義 |
| DONE-P0-D2-02 | ✅ | 積σ代数・積測度をTonelli/Fubiniの前に導入 |
| DONE-P0-D2-03 | ✅ | Lebesgue測度を標準ルートでは受け入れ、D3/D4で構成する境界を明記 |
| DONE-P0-C1-01 | ✅ | `C([0,1])` のBanach性で使う一様極限定理を接続 |

---

# 4. P1：後続を支える主要命題

**P1残件は0件です。** Batch 10で監査台帳と実装を再照合し、最後のF/Gも本文証明まで閉じました。

## 4.1 位相・compact・complete

| ID | 状態 | 証明済み内容 |
|---|---|---|
| DONE-P1-B-01 | ✅ | 距離空間で閉集合 ⇔ 収束列の極限を含む |
| DONE-P1-B-02 | ✅ | 閉包の列による特徴付け |
| DONE-P1-C-01 | ✅ | ε–δ・列・開集合逆像による連続性の同値 |
| DONE-P1-C-02 | ✅ | metric spaceでcompact ⇔ sequentially compact |
| DONE-P1-C-03 | ✅ | Heine--Borel |
| DONE-P1-C-04 | ✅ | compactの連続像・Weierstrass最大最小定理 |
| DONE-P1-C-05 | ✅ | 有限直積のcompact性・互いに素なcompact集合間の正距離 |
| DONE-P1-D-01 | ✅ | 有限次元ノルム同値と完備性 |
| DONE-P1-D-02 | ✅ | compact metric spaceはcomplete |

## 4.2 Lebesgue積分・測度構成

| ID | 状態 | 証明済み内容 |
|---|---|---|
| DONE-P1-D2-04 | ✅ | 単調収束定理 |
| DONE-P1-D2-05 | ✅ | Fatouの補題 |
| DONE-P1-D2-06 | ✅ | 優収束定理 |
| DONE-P1-D2-07 | ✅ | σ有限積測度の存在・一意性 |
| DONE-P1-D2-08 | ✅ | Tonelli / Fubini |
| DONE-P1-D2-09 | ✅ | Minkowskiと $L^p$ ノルム |
| DONE-P1-D2-10 | ✅ | $L^2$ 完備性（Riesz--Fischer） |
| DONE-P1-D3-01 | ✅ | Carathéodory可測集合がσ代数をなすこと |
| DONE-P1-D3-02 | ✅ | 外測度の制限がcountably additiveな完全測度になること |
| DONE-P1-D4-01 | ✅ | 有限区間被覆の長さ評価 |
| DONE-P1-D4-02 | ✅ | 開区間のCarathéodory可測性 |
| DONE-P1-D4-03 | ✅ | 実直線上の開集合の可算互いに素開区間分解 |

## 4.3 線形代数・凸解析・KKT

| ID | 状態 | 証明済み内容 |
|---|---|---|
| DONE-P1-F-01 | ✅ | 球面制約に必要なLagrange未定乗数法の必要条件を証明し、Rayleigh商からのスペクトル定理へ接続 |
| DONE-P1-G-01 | ✅ | 開凸領域上の $C^2$ 関数で `convex ⇔ Hessian PSD` を両方向証明 |
| DONE-P1-C4-01 | ✅ | 劣微分和則と制約付きFermat条件 |
| DONE-P1-C5-01 | ✅ | 採用CQを明示した一般化KKT |
| DONE-P1-C5-02 | ✅ | Robinson CQからnormal-cone / multiplier representationへの証明鎖 |

## 4.4 測度論的確率

| ID | 状態 | 証明済み内容 |
|---|---|---|
| DONE-P1-P2-01 | ✅ | Radon--Nikodym定理（教材で必要なσ有限版） |
| DONE-P1-P3-01 | ✅ | 条件付き期待値の存在とa.s.一意性 |
| DONE-P1-P3-02 | ✅ | $L^2(\mathcal G)$ への直交射影としての条件付き期待値 |
| DONE-P1-P4-01 | ✅ | Borel--Cantelli第2補題 |
| DONE-P1-P4-02 | ✅ | 一様可積分性 + 確率収束 ⇒ $L^1$ 収束（Vitali型） |
| DONE-P1-P6-01 | ✅ | 特性関数の一意性 |
| DONE-P1-P6-02 | ✅ | 教材で使う向きのLévy連続性定理 |

## 4.5 Fourier / Sobolev

| ID | 状態 | 証明済み内容 |
|---|---|---|
| DONE-P1-FA1-01 | ✅ | 三角系 / 複素指数系の $L^2(-\pi,\pi)$ 完備性、Parseval、$L^2$収束 |
| DONE-P1-FA2-01 | ✅ | Gaussian正則化によるFourier反転 |
| DONE-P1-FA3-01 | ✅ | Plancherel等式と $L^2$ への拡張 |
| DONE-P1-FA3-02 | ✅ | $L^1\cap L^2$ の $L^2$ 稠密性 |
| DONE-P1-SOB2-01 | ✅ | 後続Lax--Milgramに必要な有界領域版Poincaré不等式 |

## 4.6 確率過程・時系列・SDE

| ID | 状態 | 証明済み内容 |
|---|---|---|
| DONE-P1-SP2-01 | ✅ | 有界停止時刻版optional samplingとUIによる拡張 |
| DONE-P1-SP4-01 | ✅ | Brown運動版から一般Itô process版へのItô公式 |
| DONE-P1-SP4-02 | ✅ | global Lipschitz SDEの強解存在一意性 |
| DONE-P1-TS1-01 | ✅ | Wold decomposition |
| DONE-P1-TS2-01 | ✅ | Herglotz定理 |
| DONE-P1-SDE1-01 | ✅ | Euler--Maruyama strong order $1/2$ |

---

# 5. P2：第2陣の証明

Batch 11で旧P2一覧を本文と再照合しました。以下の床板は**証明済み**です。

## 5.1 DONE-P2

| ID | 状態 | 証明・参照 |
|---|---|---|
| DONE-P2-C3-01 | ✅ Batch 11 | [Fréchet微分の連鎖律](volumes/00_foundations/F0_02C3_Frechet微分_線形作用素_随伴/index.md#thm-f0-02c3-frechet-chain-rule)。二つの残差を $o(\|h\|)$ と $O(\|h\|)$ で制御して証明。 |
| DONE-P2-C3A-01 | ✅ Batch 11 | [Hilbert随伴の存在・一意性](volumes/00_foundations/F0_02C3A_随伴作用素_Banach_Hilbert/index.md#thm-f0-02c3a-hilbert-adjoint-existence)。Riesz表現から線形性・有界性・ノルム等式まで導出。 |
| DONE-P2-C4A-01 | ✅ Batch 11 | [凸集合のtangent cone](volumes/00_foundations/F0_02C4A_tangent_polar_dual_cone/index.md#thm-f0-02c4a-convex-tangent-cone) と [normal = polar](volumes/00_foundations/F0_02C4A_tangent_polar_dual_cone/index.md#thm-f0-02c4a-normal-polar)。通常の有限次元凸解析で必要な版を完全証明。 |
| DONE-P2-C5A-01 | ✅ Batch 4 | [LICQ ⇒ MFCQ](volumes/00_foundations/F0_02C5A_制約想定_LICQ_MFCQ_Robinson/index.md#thm-f0-02c5a-licq-mfcq)。行フルランクから指定右辺を持つ線形方程式を解く。 |
| DONE-P2-P2A-01 | ✅ Batch 11 | [押し出し積分公式・LOTUS](volumes/00_foundations/F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-pushforward-integration)。指示関数→単関数→MCT→正負部分で証明。 |
| DONE-P2-P3A-01 | ✅ Batch 5 / 11 | [条件付き期待値の基本性質](volumes/00_foundations/F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-basic-properties)、[tower](volumes/00_foundations/F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-tower)、[Doob--Dynkin](volumes/00_foundations/F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-doob-dynkin) を本文証明済み。 |
| DONE-P2-P4A-01 | ✅ Batch 9 | [可積分な支配関数から一様可積分性](volumes/00_foundations/F0_00P4A_一様可積分性_Vitali/index.md#thm-f0-00p4a-dominated-ui) を証明済み。 |
| DONE-P2-FA2-01 | ✅ Batch 6A | [Riemann--Lebesgue補題](volumes/00_foundations/F0_00FA2_Fourier変換_畳み込み_反転/index.md#lem-f0-00fa2-riemann-lebesgue) を $L^1$ 平行移動連続性から証明済み。 |

> **C4Aの「一般形」について**  
> DREAM THEATERで通常使用する有限次元凸集合 $C\subset\mathbb R^n$ については完全に閉じています。一般Banach空間での各種tangent/normal coneの一致条件は、定義選択まで含めて別の凸解析一般論になるため本監査の必須責務にはしません。

## 5.2 REMAIN-P2

### TODO-P2-A2-01：選択公理とZornの補題の同値性

Hahn--Banach証明ではZornの補題自体を使える状態になっています。同値性まで証明することは通読上の直接依存ではありませんが、基礎論ルートを完全に閉じるなら追加します。

### TODO-P2-TS2-02：spectral representation theorem

Herglotz定理は証明済みです。次の大物は、定常過程を直交増分過程により

$$
X_t=\int e^{it\lambda}\,dZ(\lambda)
$$

の形へ表すスペクトル表現です。Wold/Herglotzだけより一段深いHilbert空間上の構成を要するため独立Batchとします。

### TODO-P2-SDE1-02：Euler--Maruyamaのweak order 1

strong order $1/2$ は証明済みです。weak order 1 は追加の滑らかさ条件とKolmogorov backward equationまたはItô--Taylor展開を要するため、strong証明と混ぜず独立Batchとします。

---

# 6. P3：黒箱であることを明示すればよい発展定理

- 選択公理 ⇔ well-ordering theorem の完全証明
- Jordan--von Neumann theorem の完全証明
- Moore--Aronszajn theorem の完全な構成証明
- 一般trace theorem
- 一般Sobolev embedding
- Rellich--Kondrachov compactness
- 一般Carathéodory extension theoremの最大一般性
- 無限次元Banach空間における各種tangent / normal cone一般論
- semimartingale一般論・Girsanov・local time
- 一般SPDE理論
- 一般MCMC / SMC / advanced QMC

P3は「証明しない」こと自体を問題とはしません。ただし本文で使用する場合は、**この教材では定理として使う**ことと使用条件を明示します。

---

# 7. すでに証明が十分あり、機械的にTODOに戻さないもの

- Cauchy--Schwarz
- Bessel不等式
- 有限次元Parseval
- Hilbert projection theorem
- Riesz representation theorem
- Hahn--Banach theorem（Zornによるmaximal extensionを含む）
- Vitali集合の非可測性
- 有限分散版の強大数則
- Borel--Cantelli第1補題
- RKHSのkernel PSD性
- representer theoremの主要論理
- Itô isometry
- Lax--Milgram theorem
- Galerkin orthogonality / Céaの補題
- 条件付き期待値のtower / take-out-what-is-known
- Riemann--Lebesgue lemma
- LICQ ⇒ MFCQ
- dominated family ⇒ uniform integrability

---

# 8. Batch実装履歴

| Batch | 主題 | 状態 |
|---|---|---|
| 0 | 読者ブロッカー除去 | ✅ |
| 1 | 距離・compact・complete | ✅ |
| 2 | Lebesgue積分 | ✅ |
| 3 | Lebesgue測度構成・積測度 | ✅ |
| 4 | 凸解析・一般化KKT | ✅ |
| 5 | RN・条件付き期待値・測度論的確率 | ✅ |
| 6A | Fourier completeness / inversion / Plancherel | ✅ |
| 6B | Poincaré | ✅ |
| 7A | stopping time / martingale | ✅ |
| 7B | Brown運動 / Itô / SDE存在一意性 | ✅ |
| 7C | Wold | ✅ |
| 7D | Herglotz / spectral measure | ✅ |
| 8 | Euler--Maruyama strong order $1/2$ | ✅ |
| 9 | UI周辺の残床板 | ✅ |
| 10 | P1台帳同期 + F1/G最終穴埋め | ✅ |
| 11 | P2床板再監査：chain rule / adjoint / normal-polar / LOTUS / Doob--Dynkin | 実装中 |

---

# 9. 本文へ入れる未補完・黒箱表記

証明未補完の主要命題は次の形式で識別します。

```markdown
> **TODO（証明補完・P2）**
> この命題は監査正本の `<TODO-ID>` に対応する。
> 現時点では使用条件と結論を明示して使い、独立Batchで証明する。
```

黒箱として残すP3にはTODOではなく次を置きます。

```markdown
> **この教材では定理として使う**
> 完全証明には本ルート外の追加前提が必要なため、ここでは主張と使用条件を明示して使う。
```

---

# 10. 完了条件

DREAM THEATER通読保証の完成条件は、各想定ルートについて次を満たすことです。

1. 推論に使う概念は使用前に定義済みである。
2. 単なる予告語は「先取り」と明記される。
3. P1命題は完全証明がある。
4. P2命題は証明または明示的な参照がある。
5. P3命題は「この教材では定理として使う」と宣言される。
6. 各章の `prerequisites` と実際に本文が要求する前提が一致する。
7. 読者が「なにこれ？」となったとき、前へ戻るべき章がリンクで特定できる。
8. 主要概念が明示的な定義として識別でき、主要命題の仮定と結論が明確である。
9. 主要概念に具体例または反例があり、原則として各講義章にA/B演習がある。
10. B問題を主力とし、C問題は必要な章に0〜1問程度とする。
11. 演習は共通規約の詳細解答・本番答案・20点採点基準を満たす。
12. 通常教材と比べて、説明だけで終わる主要学習目標が残っていない。
13. 一講義に独立した学習サイクルを詰め込みすぎていない。過積載ならURL互換を保って分割する。

P1は完了済みです。P2はBatch 11完了時点で残る3件を、それぞれ独立Batchとして処理します。
