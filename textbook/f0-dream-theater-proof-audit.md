# DREAM THEATER 通読監査：未定義概念と証明補完計画

この文書は、F0-00 から DREAM THEATER 本編・確率論補講・Encore II〜V へ進む読者が、**未定義語に殴られず、主要命題を「そういう定理です」で飛ばされすぎずに通読できる**状態を作るための監査正本です。

今回の第1段階では、想定順に本文を読み、

1. 初出時点で定義されていない概念
2. 「先取り」なのか「既知前提」なのか分からない概念
3. 後続章が直接依存するのに証明がない主要命題
4. 意図的に黒箱とするなら、その旨と理由を明示すべき定理

を洗い出しました。

この文書に `TODO` として載せた命題は、今後の証明補完対象です。すでに十分な証明があるものは対象外です。

## 監査範囲の拡張：教材密度・例題・演習

証明監査に加えて、**定義・定理の明示性、具体例、A/B/C演習、通常教材比の内容密度**も通読保証の対象とする。詳細基準は [DREAM THEATER 教材密度・例題・演習監査計画](f0-dream-theater-content-exercise-audit.md) を正本とする。

以後の各Batchでは、証明だけを追加して終わらず、そのBatchで触る章について教材密度監査も同時に行う。特にD2はBatch 2で全面再構成する。

---

## 1. 監査した読み順

標準通読線：

```text
F0-00
  ↓
A → A2 → B → C → D → D2 → E → E2 → F → G
  ↓
F0-02 → 02A → 02B → C1 → C2 → C3 → C4 → C5 → C6 → C7
```

完全基礎論：

```text
D2 → D3 → D4 → D5
```

測度論的確率：

```text
D2 → P1 → P2 → P3 → P4 → P5 → P6 → P7
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
| **P1** | 後続の論理鎖が直接依存する主要定理。原則として本文または専用補講で証明する。 |
| **P2** | 標準的で重要だが、局所的には別の証明済み定理で代替できる／一旦黒箱でも通読可能。 |
| **P3** | 発展定理。証明するとさらに別分野の大きな前提が必要になる。黒箱であることを明示すればよい。 |

---

# 3. P0：まず「なにこれ？」を消す

## F0-00 本体

### DONE-P0-F000-01 ✅：先取り用語を先取りと明記

章冒頭の一覧では、本文の初学者がまだ定義を見ていない段階で、

- Hessian
- Lagrange未定乗数法
- 正定値性
- 射影
- Schur complement

などの名前が見える。

**対応：** 「この一覧には後続で定義する先取りラベルを含む。ここで意味を覚える必要はない」と明記する。

## F0-00A

### DONE-P0-A-01 ✅：後続記法を先取りと明記

`X^*`、normal cone、row full rank、constraint qualification などは、この章の集合・写像の説明に必須ではない。

**対応：** 後続章への予告であることを明記し、定義前に推論へ使わない。

## F0-00D2

### DONE-P0-D2-01 ✅：Borel σ代数を初出前に定義

現状は「連続関数はBorel可測」という文脈で **Borel σ代数** が先に現れる。

先に

$$
\mathcal B(\mathbb R)
:=
\sigma(\{G\subset\mathbb R:G\text{ は開集合}\})
$$

を置き、D4でLebesgue σ代数との関係を深掘りする。

### DONE-P0-D2-02 ✅：積σ代数・積測度をTonelli/Fubiniの前に定義

現状は

$$
\mu\times\nu
$$

が定義前に現れる。

先に

$$
\mathcal A\otimes\mathcal B
=
\sigma\{A\times B:A\in\mathcal A,\ B\in\mathcal B\}
$$

と、積測度が長方形上で

$$
(\mu\times\nu)(A\times B)=\mu(A)\nu(B)
$$

を満たすことを定義・定理として導入する。

### DONE-P0-D2-03 ✅：Lebesgue測度の存在をどこで受け入れるか明記

標準ルートではD2でLebesgue測度を使い、DREAM THEATERルートではD3/D4で構成する。

**対応：** D2冒頭に「標準ルートでは存在と基本性質を定理として受け入れる。構成を追う読者はD3→D4へ」と明記する。

## F0-02C1

### DONE-P0-C1-01 ✅：`C([0,1])` のBanach性で使う一様極限定理を前章へ接続

「連続関数の一様極限は連続」を使うなら、Cで証明するかC1で短証明を付ける。

---

# 4. P1：後続を支える主要命題の証明TODO

## B / C / D：位相・コンパクト性・完備性

### DONE-P1-B-01 ✅

距離空間で

$$
F\text{ が閉}
\iff
x_n\in F,\ x_n\to x \Rightarrow x\in F
$$

を証明する。

### DONE-P1-B-02 ✅

閉包の列による特徴付け

$$
x\in\overline A
\iff
\exists x_n\in A:\ x_n\to x
$$

を証明する。

### DONE-P1-C-01 ✅

連続性について、距離空間で

- ε–δ定義
- 列による連続性
- 開集合の逆像が開

の同値性を証明する。

### DONE-P1-C-02 ✅

距離空間で compact ⇔ sequentially compact を証明する。

### DONE-P1-C-03 ✅

Heine--Borel

$$
K\subset\mathbb R^n:
\quad
K\text{ compact}
\iff
K\text{ closed and bounded}
$$

を証明する。

### DONE-P1-C-04 ✅

連続像はcompact、Weierstrass最大最小定理を証明する。

### DONE-P1-C-05 ✅

非空compact集合の有限直積のcompact性、および互いに素な非空compact集合間の距離が正になることを証明する。

### DONE-P1-D-01 ✅

有限次元ノルム空間では全てのノルムが同値であり、したがって有限次元ノルム空間が完備になることを証明する。

### DONE-P1-D-02 ✅

compact metric space は complete であることを証明する。

---

## D2：Lebesgue積分の床板

### TODO-P1-D2-04：単調収束定理

MCTを単関数近似から証明する。

### TODO-P1-D2-05：Fatouの補題

MCTから導出する。

### TODO-P1-D2-06：優収束定理

Fatouを正負両側へ適用する標準証明を付ける。

### TODO-P1-D2-07：積測度の存在と一意性

少なくともσ有限の場合に後続で必要な形を定理として明示し、証明を補完する。

### TODO-P1-D2-08：Tonelli / Fubini

非負関数のTonelliから可積分関数のFubiniへ進む証明を付ける。

### TODO-P1-D2-09：Minkowskiと $L^p$ ノルム

一般 $1\le p<\infty$ で三角不等式を保証するMinkowski不等式を証明する。

### TODO-P1-D2-10：$L^2$ 完備性（Riesz--Fischer）

現在の証明骨格を、Cauchy列からa.e.収束する部分列を構成して極限を得るところまで通す。

---

## D3 / D4：Lebesgue測度の構成

### TODO-P1-D3-01

Carathéodory可測集合全体がσ代数をなすことを証明する。

### TODO-P1-D3-02

外測度をCarathéodory可測集合へ制限するとcountably additiveな測度になることを証明する。

### TODO-P1-D4-01

有限個の区間が $[a,b]$ を覆うなら区間長総和が $b-a$ 以上になる補題を証明する。

### TODO-P1-D4-02

開区間がCarathéodory可測であることをproof sketchではなく証明にする。

### TODO-P1-D4-03

実数直線上の開集合が高々可算個の互いに素な開区間の和になることを証明する。

証明方針：連結成分は開区間であり、各成分に有理数を1個対応させる。

---

## F / G / C4 / C5：線形代数・凸解析・KKT

### TODO-P1-F-01

スペクトル定理のRayleigh商による証明で使うLagrange未定乗数法の必要条件を、F0-00で既知扱いせず証明・参照する。

### TODO-P1-G-01

$C^2$ 凸関数について

$$
f\text{ convex}
\iff
\nabla^2 f(x)\succeq0
$$

の成立条件を明記して証明する。

### TODO-P1-C4-01

制約付き最適化で使う劣微分和則

$$
\partial(f+\delta_C)(x)
=
\partial f(x)+N_C(x)
$$

について、成立条件を明記し証明する。

### TODO-P1-C5-01

一般化KKTを「適切なCQの下で」とだけせず、採用するCQを明示した定理として書き、証明する。

### TODO-P1-C5-02

Robinson CQからnormal-cone / multiplier representationへ進む論理を明示し、一般化KKTの証明鎖へ組み込む。

---

## P2 / P3 / P4 / P6：測度論的確率

### TODO-P1-P2-01：Radon--Nikodym定理

現在は「完全証明は標準測度論に譲る」としているが、P3の条件付き期待値の存在が直接依存する。

少なくともσ有限測度で必要な版を専用節または補講として証明する。

### TODO-P1-P3-01：条件付き期待値のa.s.一意性

RN密度のa.e.一意性から短く証明する。

### TODO-P1-P3-02：条件付き期待値の射影解釈

- $L^2(\mathcal G)$ が閉部分空間
- $E[X\mid\mathcal G]$ がそこへの直交射影

を証明する。

### TODO-P1-P4-01：Borel--Cantelli第2補題

現在のproof skeletonを完全証明へ上げる。

### TODO-P1-P4-02：一様可積分性 + 確率収束 ⇒ $L^1$ 収束

Vitali型収束定理の証明を追加する。

### TODO-P1-P6-01：特性関数の一意性

任意の確率測度について、同じ特性関数を持てば同じ分布であることを証明する。

### TODO-P1-P6-02：Lévy連続性定理

CLTの最後の論理ステップとして実際に使用しているため、少なくともこの教材で使う方向

$$
\varphi_n(t)\to\varphi(t),\quad
\varphi\text{ が0で連続かつ特性関数}
\Rightarrow
P_n\Rightarrow P
$$

を証明する。tightnessが必要になるため、必要なら専用補講へ分離する。

---

## Encore II：Fourier解析

### TODO-P1-FA1-01

三角系 / 複素指数系が $L^2(-\pi,\pi)$ でcompleteであることを証明し、Fourier級数のParsevalと $L^2$ 収束の床を埋める。

### TODO-P1-FA2-01

Fourier inversion theoremを、本文で採用する十分条件の下で証明する。

### TODO-P1-FA3-01：Plancherel定理

FA3はPlancherel等式を章の主役として使っているが、等式自体の証明がない。

$L^1\cap L^2$ 上で証明し、そこから $L^2$ 全体へ拡張する。

### TODO-P1-FA3-02

$$
L^1(\mathbb R)\cap L^2(\mathbb R)
$$

が $L^2(\mathbb R)$ に稠密であることを証明する。

---

## Encore III：Sobolev・弱解

### TODO-P1-SOB2-01：Poincaré不等式

一次元の証明はある。後続のLax--Milgramで一般領域版を使うため、採用する領域条件を明記して必要な版を証明する。

trace定理・一般Sobolev embedding・Rellich--Kondrachovはこの段階ではP3として黒箱でもよい。

---

## Encore IV：確率過程・スペクトル時系列

### TODO-P1-SP2-01：optional stopping theorem

「条件を満たす」とだけせず、まず有界停止時刻版を完全に証明する。一般版は一様可積分性を使う拡張として分離する。

### TODO-P1-SP4-01：Itô公式

Itô isometryは本文で導出されているが、章の主役であるItô公式は直感説明から定理へ飛んでいる。

まずBrown運動に対する $C^2$ 版を分割和・Taylor展開から証明し、その後一般Itô process版へ拡張する。

### TODO-P1-SP4-02：SDEの存在一意性

global Lipschitz + linear growth の標準版をPicard反復・Itô isometry・Gronwallで証明する。

### TODO-P1-TS1-01：Wold decomposition

TS1の章タイトル級の主命題だが、現状は主張のみ。Hilbert空間の入れ子部分空間とinnovationを使った証明を追加する。

### TODO-P1-TS2-01：Herglotz定理

現状「調和解析とRiesz表現が必要なので定理として使う」と明記されている。Encore IVのスペクトル理論全体が直接依存するため、専用証明節を追加する。

---

## Encore V：数値解析

### TODO-P1-SDE1-01：Euler--Maruyamaのstrong order $1/2$

係数のglobal Lipschitz等、成立条件を明記した上で証明する。MLMCのcoupling理解に直接効く。

### TODO-P2-SDE1-02：Euler--Maruyamaのweak order 1

追加の滑らかさ条件が必要。Kolmogorov backward equationまたはItô--Taylor展開を使うため、P2として後段に回す。

---

# 5. P2：重要だが第2陣でよい証明

- A2：選択公理とZornの補題の同値性
- C3：Fréchet chain rule
- C3：Hilbert adjointの存在一意性をRieszから丁寧に導く
- C4：$N_C(x)=T_C(x)^\circ$ の一般形
- C5：LICQ ⇒ MFCQ
- P2：LOTUS / pushforward integration formula
- P3：tower property、take-out-what-is-known、Doob--Dynkin lemma
- P4：dominated family ⇒ uniform integrability
- FA2：Riemann--Lebesgue lemma
- TS2：spectral representation theorem
- SDE1：weak order 1

---

# 6. P3：黒箱であることを明示すればよい発展定理

- 選択公理 ⇔ well-ordering theorem の完全証明
- Jordan--von Neumann theorem の完全証明
- Moore--Aronszajn theorem の完全な構成証明
- 一般trace theorem
- 一般Sobolev embedding
- Rellich--Kondrachov compactness
- 一般Carathéodory extension theoremの最大一般性
- semimartingale一般論・Girsanov・local time
- 一般SPDE理論
- 一般MCMC/SMC/advanced QMC

P3は「証明しない」こと自体を問題とはしない。ただし、**この教材内では証明しない**と明示する。

---

# 7. すでに証明が十分あり、TODOにしないもの

監査で「定理名がある」だけで機械的にTODO化しないため、確認済みの主な証明済み項目を記録する。

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
- Galerkin orthogonality / Céaの補題（既存本文で確認する範囲）

---

# 8. 証明追加の実装順

## Batch 0：読者ブロッカー除去

1. F0-00 / A の先取り用語ラベル
2. D2のBorel σ代数
3. D2の積σ代数・積測度
4. D2標準ルートとD3/D4構成ルートの境界
5. C1の一様極限定理参照

## Batch 1：距離・compact・complete ✅

B → C → D の主要命題を証明し、定義・具体例・A/B中心の演習まで補強済み。Cのみ統合問題としてLevel Cを1問置いた。

- B: Level A 2問 / B 3問 / C 0問
- C: Level A 2問 / B 3問 / C 1問
- D: Level A 2問 / B 3問 / C 0問

これにより後続のWeierstrass、射影、スペクトル定理の床を固めた。

## Batch 2：Lebesgue積分

D2の MCT → Fatou → DCT → product measure → Tonelli/Fubini → Minkowski → $L^2$ completeness。

ここが最大のボトルネック。**証明追記だけでなく、定義・定理の明示、具体例、A/B中心の演習、C最大1問まで含むD2全面再構成**を行う。

## Batch 3：Lebesgue測度構成

D3/D4を閉じる。

## Batch 4：凸解析・KKT

G → C4 → C5。

## Batch 5：測度論的確率

RN → conditional expectation → UI/Vitali convergence → characteristic-function uniqueness → Lévy。

## Batch 6：Fourier / Sobolev

Fourier completeness → inversion → Plancherel → Poincaré。

## Batch 7：確率過程

optional stopping → Itô formula → SDE existence/uniqueness → Wold → Herglotz。

## Batch 8：数値解析

Euler--Maruyama strong convergenceからMLMCへ接続する。

---

# 9. 本文へ入れるTODO表記の規約

証明未補完の主要命題には、今後次の形式を置く。

```markdown
> **TODO（証明補完・P1）**
> この命題は後続章が直接依存する主要定理である。現在は主張／証明骨格のみ。
> `textbook/f0-dream-theater-proof-audit.md` の `<TODO-ID>` に従って完全証明を追加する。
```

黒箱として残すP3には、TODOではなく次を置く。

```markdown
> **この教材では定理として使う**
> 完全証明には本ルート外の追加前提が必要なため、ここでは主張と使用条件を明示して使う。
```

これにより、読者が

- 「証明済みなのか」
- 「後で証明するのか」
- 「意図的に黒箱なのか」

を区別できるようにする。

---

# 10. 完了条件

DREAM THEATER通読保証の完成条件は、各想定ルートについて次を満たすこととする。

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

Batch 0の読者ブロッカー除去後、Batch 1からは証明監査と教材密度監査を同時に進める。
