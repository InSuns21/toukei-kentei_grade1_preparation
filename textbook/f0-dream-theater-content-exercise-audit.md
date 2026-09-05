# DREAM THEATER 教材密度・例題・演習監査

この文書は `textbook/f0-dream-theater-proof-audit.md` を補完し、DREAM THEATER 本編・確率論補講・Encore II〜Vについて **証明があるだけでなく、教材として一周できるか** を監査する正本です。

共通演習形式はリポジトリ直下の `EXERCISE_GUIDELINES.md` を唯一の正本とします。

## 現在状態：2026-09-05 / Batch 13

証明監査は P0/P1/P2 が全て0件になりました。一方、教材密度監査はまだ完了ではありません。

現在の最大残件は、Batch 11/12で新設した証明補講の **演習フォーマット正規化** です。

| 章 | 証明 | 定義・例 | 演習数 | 共通4区分 | 判定 |
|---|---|---|---:|---|---|
| A3A AC⇔Zorn | 完了 | 十分 | A2/B3 | 完了 | **GREEN** |
| TS2A spectral representation | 完了 | 十分 | A2/B3 | 完了 | **GREEN** |
| SDE1A weak order 1 | 完了 | 十分 | A2/B2 | 簡略解答 | **AMBER** |
| C3B chain rule / adjoint | 完了 | 十分 | A2/B2 | 簡略解答 | **AMBER** |
| C4B tangent / normal polar | 完了 | 十分 | A2/B2 | 簡略解答 | **AMBER** |
| P3D pushforward / Doob--Dynkin | 完了 | 十分 | A2/B2 | 簡略解答 | **AMBER** |

**次の最優先は Batch 14：上記AMBER 4章の演習正規化。**

---

# 1. 監査軸

各講義ページを次の6軸で確認します。

1. **未定義概念**：推論に使う語・記号・対象が使用前に定義されているか。
2. **主要命題と証明**：後続依存の主要命題に完全証明または明示的なP3状態があるか。
3. **教材構造**：定義・定理・例の役割がreader-facingに明示されているか。
4. **例題・演習密度**：読んだ概念を自力で使うA/B中心の問題があるか。
5. **内容密度**：主要learning objectiveが説明だけで終わっていないか。
6. **講義粒度**：一ページへ独立した学習サイクルを詰め込みすぎていないか。

完成した講義の基本サイクルは

```text
定義
 ↓
直感・位置付け
 ↓
具体例 / 反例
 ↓
主要命題
 ↓
証明 / 証明状態
 ↓
A問題
 ↓
B問題
```

です。

---

# 2. formal statement の基準

主要な定義・定理・補題・命題は **ステートメント単体で自己完結**させます。

最低限、次を含めます。

- 対象となる空間・集合・写像・確率変数
- 新しい記号
- 必要な仮定
- 結論
- stable anchor
- standard formal statement panel

「同じ仮定の下で」「上の関数について」のように、本質条件を直前の散文へ預けないことを原則とします。

新しい定義を説明文の

> **用語** と呼びます

だけで済ませることも避け、formal definitionへ昇格させます。

---

# 3. 具体例の基準

### 標準目安

- 1講義あたり本文内の具体例 **2〜4個**
- 主役となる抽象対象ごとに最低1例を検討
- 境界・符号・仮定が本質なら反例または失敗例も検討
- 定義例は、単なる言い換えではなく定義式を実際に確認する

例の役割は「分かった気になる」ことではなく、抽象定義を計算可能な対象へ落とすことです。

### Batch 13確認

**A3A**

- partial choice function
- greedy maximal chain
- Hartogsで停止する超限選択

が役割の異なる具体構成になっており、十分です。

**TS2A**

- white noise：Lebesgue型flat spectrum
- sinusoidal process：2原子のline spectrum
- 有限線形フィルタ：$|A(e^{-i\lambda})|^2$ によるspectral measure変換

まで入り、連続・原子的・filter変換の三方向を確認できます。

---

# 4. 演習数の標準

ロードマップ・Facadeを除く講義ページの標準目安は次です。

| Level | 標準問題数 | 役割 |
|---|---:|---|
| A | 2〜3 | 定義確認・一段の導出 |
| **B** | **3〜5** | 主力。複数概念を接続する典型問題 |
| C | 0〜1 | 自然な発展だけ |
| D | 原則0 | DREAM THEATERだからという理由で院試化しない |

短い証明補講では B2 でも直ちにNGとはしませんが、章に複数の主要learning objectiveがある場合は **B3を第一候補**とします。

講義ページで B0 は原則警告です。

---

# 5. 各大問の必須4区分

`EXERCISE_GUIDELINES.md` に従い、原則として全大問に

1. 問題
2. **詳細解答**
3. **本番答案**
4. **採点基準（20点）**

を持たせます。

詳細解答は、採点対象の非自明な計算・証明を「同様に」「整理すると」だけで飛ばさず、紙上で再現可能な粒度にします。

本番答案は詳細解答の単なるコピペではなく、採点に必要な論理だけを残した短い答案です。

採点基準は原則20点で、核心となる論理へ最も多く配点します。

---

# 6. Batch 13 教材密度監査

## A3A：GREEN

### 学習サイクル

```text
partial choice function
 ↓
Zorn -> AC
 ↓
Hartogs lemma
 ↓
AC -> well-ordering
 ↓
greedy maximal chain
 ↓
well-ordering -> Zorn
```

独立した問いは「ACとZornがなぜ同値なのか」の1本にまとまっており、分割不要です。

### 演習

- A01 chain合併が関数になる理由
- A02 greedy chainの極大性
- B01 Zorn→ACを一続きに再構成
- B02 Hartogsが超限選択を止める理由
- B03 well-ordering→Zornを一続きに再構成

A2/B3、全問4区分済み。

## TS2A：GREEN

### 学習サイクル

```text
Herglotz measure F
 ↓
C(T) dense in L2(F)
 ↓
trigonometric polynomials dense
 ↓
U0 isometry
 ↓
completion to U
 ↓
Z(A)=U1_A
 ↓
spectral stochastic integral
 ↓
spectral representation theorem
```

長めですが、問いは一貫して「共分散のspectral measureから過程そのものをどう復元するか」です。TS2から分離済みなので、現時点で追加分割は不要と判定します。

### 演習

- A01 covariance isometry
- A02 orthogonal increments
- B01 任意有限Borel測度での三角多項式稠密性
- B02 $L^2$ 可算加法性
- B03 有限線形filterとspectral measure変換

A2/B3、全問4区分済み。

---

# 7. Batch 14：最優先の教材密度残件

証明自体は触らず、Batch 11/12の4補講を共通演習規約へ合わせます。

## SDE1A

現状：A2/B2、簡略解答。

対応：

- 既存A/Bを詳細解答・本番答案・20点採点基準へ変換
- B03を追加
- 候補：線形SDEまたは十分単純なpayoffで1-step weak defectを具体計算し、抽象証明を数式で確認

## C3B

現状：A2/B2、簡略解答。

対応：

- 全問4区分化
- B03を追加
- 候補：非線形 $F$ に対する $J(x)=\frac12\|F(x)-y\|^2$ で
  $$
  \nabla J(x)=DF(x)^\dagger(F(x)-y)
  $$
  をchain rule + adjointから導く

## C4B

現状：A2/B2、簡略解答。

対応：

- 全問4区分化
- B03を追加
- 候補：polyhedral setのactive constraintsから tangent cone と normal coneを両方計算し、polar関係を検算

## P3D

現状：A2/B2、簡略解答。

対応：

- 全問4区分化
- B03を追加
- 候補：有限値 $Y$ に対する $E[X\mid Y]=m(Y)$ をDoob--Dynkinと条件付き期待値の定義から具体構成

Batch 14完了条件：4章すべて **A2/B3以上・全問4区分**。

---

# 8. その後の横断密度監査

Batch 14の後は章群ごとに次を機械監査＋本文確認します。

## 優先1：Encore IV / V

理由：確率過程・数値SDEは証明追加で章が増えたため、前提リンクと粒度が崩れやすい。

対象：

- SP1--SP5
- TS1--TS3
- NA1--NA4
- FEM1
- MC1--MC2
- SDE1/SDE1A
- UQ1/MLMC

見る点：

- learning objectiveごとの例の有無
- B問題0または1の章
- 1ページへ「定義・存在定理・数値法・応用」が混在していないか
- 後続章へしか必要ない概念を前章で過剰に掘っていないか

## 優先2：関数解析・凸解析・KKT

対象：C1--C7A と G/G1/G2。

見る点：

- Banach/Hilbert dualの記号・型の一貫性
- tangent/normal/polar/dual coneの符号規約
- CQの具体例と失敗例
- G/G1/C4/C4A/C4B/G2 の新しい標準通読順で重複が再発していないか
- RKHS/SVMへの接続が飛んでいないか

## 優先3：測度論的確率

対象：P1--P7B。

見る点：

- RN → conditional expectation → $L^2$ projection の三つの見方が混線していないか
- a.s.同値類を各章で必要以上に再説明していないか
- convergence modeの例・反例が十分か

---

# 9. 粒度判定

ページの長さだけでは分割しません。

**分割候補**は、同じページに

- 独立した中心問いが2個以上
- それぞれに別の定義→定理→証明→演習サイクル
- 前半だけを前提に後半を飛ばしてよい読者経路が自然に存在

する場合です。

逆に長くても「一つの定理を最後まで構成する」ページは、一講義として維持できます。TS2Aはこの理由で維持判定です。

---

# 10. 完了条件

DREAM THEATERの教材密度監査完了には、講義ページごとに次を満たすことを要求します。

1. 主要learning objectiveが本文内の定義・定理・例へ対応する。
2. 主要定義はformal definitionとして識別できる。
3. 主要定理は仮定と結論が自己完結している。
4. P1/P2の証明状態が明確である。
5. 主要抽象概念に具体例または反例がある。
6. 原則A2以上・B2以上、通常はB3以上を目指す。
7. 各大問が詳細解答・本番答案・20点採点基準を持つ。
8. B問題が章の中心論理を自力で再構成させる。
9. C問題は必要な章だけ0〜1問。
10. 後続章への接続が明示される。
11. 一ページに独立した学習サイクルを詰め込みすぎない。
12. `chapter.yaml` のexercise countsと本文が一致する。
13. textbook / Pages / terminology / exercise style のCIを通す。

証明監査が閉じた後も、この密度監査がGREENになるまではDREAM THEATER全体の監査完了とはしません。
