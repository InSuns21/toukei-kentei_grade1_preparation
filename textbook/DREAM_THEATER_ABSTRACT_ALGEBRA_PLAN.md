# DREAM THEATER：抽象代数（群・環・体）系列計画

作成日: 2026-09-23

## 0. 位置付け

この文書は、DREAM THEATER に数学科の学部標準レベルの **抽象代数系列**を新設するための設計台帳である。

直接の契機は Lie 群系列 LIE1--LIE4 の前提整理だが、本系列を「Lie 群に必要な群論だけ」の補助教材にはしない。群・環・加群・体について、標準的な学部代数学で学ぶ中核事項を canonical に閉じ、その一部を Lie 群・線形代数・複素解析・数論などから再利用できる構成とする。

旧案では GRP2、RNG2、MOD1、FLD1--FLD2 に主要定理を詰め込みすぎていた。DREAM THEATER では各講に A4/B3/C1 と詳細解答を置き、主要結果の核心証明まで閉じるため、**1講1本の主線**を優先して再分割する。

主線は **15講**とする。

```text
GRP1 → GRP2 → GRP3 → GRP4
          │       │
          │       └──────────────→ LIE2 / LIE4
          └──────────────────────→ LIE1
          │
          └→ RNG1 → RNG2 → RNG3 → RNG4
                                  ├→ MOD1 → MOD2
                                  └→ FLD1 → FLD2 → FLD3 → FLD4 → FLD5
```

Lie 群を読むために環論・体論まで完走する必要はない。

---

## 1. 章粒度の原則

他の DREAM THEATER 系列と同様、1講を「短い講義1回」ではなく教科書の1章程度とする。ただし、次を同じ講へ機械的に詰め込まない。

- 新しい代数構造の定義
- 大きな構造定理
- 独立した分類定理
- 後続分野への応用

原則として各講は、

1. 主役となる定義群
2. 主要定理 1--3 本
3. 直接例・反例
4. 核心証明
5. A4/B3/C1 と詳細解答

が一本の論理線で結ばれる範囲に抑える。

特に次は独立講級として扱う。

- Sylow の定理
- Euclid 整域・PID・UFD の構造
- Gauss の補題と多項式の既約性
- Smith 標準形
- PID 上有限生成加群の構造定理
- 分解体・分離性・正規性
- 有限体
- 有限 Galois 理論の基本定理
- Galois 理論の作図・根号可解性への応用

---

## 2. 既存系列との役割分担

### 2.1 線形代数との境界

既存 LA 系列では、ベクトル空間・線形写像・商空間・双対・行列式・Jordan 標準形・内積・スペクトル理論を canonical に扱っている。

- LA1 の「体」は `R` / `C` 上の線形代数を始めるための最低限定義に留める。
- 一般の体拡大・有限体・分解体・Galois 理論は FLD1--FLD5 が canonical owner となる。
- LA2 の線形写像に対する第一同型定理は線形代数版として残し、群・環の同型定理は GRP2 / RNG1 で扱う。
- LA4 の Jordan 構造は既存 canonical result とし、MOD2 では PID 上加群の構造定理との関係を示すが Jordan 標準形を重複再証明しない。
- LA3E のテンソル積は既存 canonical result を再利用し、一般 tensor category へは進まない。

### 2.2 Lie 群との境界

Lie 群系列は抽象代数全体の完走を要求しない。

- LIE1 は **GRP2 + GEO5** を prerequisite とする。
- LIE2 は **GRP3 + LIE1 + ODE4** を prerequisite とする。
- LIE4 は **GRP3 + LIE3 + GEO3** を prerequisite とする。
- Sylow 理論、環論、加群論、体論、Galois 理論は Lie 群系列の prerequisite にしない。

### 2.3 表現論との境界

有限群・Lie 群の一般表現論は本系列の停止線の外に置く。

ただし、

- 群作用 `G\to\operatorname{Sym}(X)`
- LIE2 の `Ad:G\to GL(\mathfrak g)`

のような具体的な準同型は扱う。

一般の有限次元線形表現、既約表現、Maschke の定理、Schur の補題、指標理論、半単純 Lie 環、root system、最高ウェイト理論は独立の REP 系列へ送る。

---

# 3. 群論：GRP1--GRP4

## GRP1 群・部分群・巡回群・置換群

**tier: core**

**prerequisites:** 集合・写像・同値関係の基本語彙

主な内容：

- 群・可換群
- 単位元・逆元
- 部分群と部分群判定
- 生成部分群
- 元の位数
- 巡回群
- 直積
- 置換群・対称群・交代群
- 二面体群
- Cayley の定理

主要結果：

- 単位元・逆元の一意性
- 部分群判定
- 巡回群の部分群構造
- Cayley の定理

この講では剰余類・商群へ進まない。まず「群を具体例から読み、部分群を作る」操作を閉じる。

## GRP2 準同型・剰余類・正規部分群・商群

**tier: core**

**prerequisites:** GRP1

主な内容：

- 群準同型・群同型
- 核・像
- 左剰余類・右剰余類
- 指数
- Lagrange の定理
- 正規部分群
- 商群
- 第一・第二・第三同型定理
- 対応定理

主要結果：

- 準同型の核が正規部分群になること
- Lagrange の定理
- 商群の積が well-defined であることと正規性
- 群の同型定理

直接例：

- `Z/nZ`
- `S_n/A_n`
- 行列群の行列式準同型
- 正規でない部分群では剰余類積が壊れる例

LIE1 はここまでを群論の direct prerequisite とする。

## GRP3 群作用・軌道・安定化群・共役

**tier: core**

**prerequisites:** GRP2

主な内容：

- 群作用
- 作用に対応する準同型 `G\to\operatorname{Sym}(X)`
- 軌道
- 安定化群
- 軌道と剰余類 `G/G_x`
- 軌道・安定化群公式
- 推移的作用
- 共役作用
- 共役類
- 中心・中心化群
- 類等式
- 有限 `p`-群の中心

主要結果：

- 軌道が集合を分割すること
- `G/G_x\to Gx` の自然な全単射
- 軌道・安定化群公式
- 類等式
- 有限 `p`-群の中心が非自明であること

LIE2 の共役・Adjoint 表現と LIE4 の滑らかな群作用は、ここで確立した代数的群作用を再利用する。

## GRP4 Cauchy の定理・Sylow の定理・有限群への応用

**tier: core / advanced-standard**

**prerequisites:** GRP3

主な内容：

- Cauchy の定理
- `p`-部分群
- Sylow 部分群
- Sylow の第一・第二・第三定理
- Sylow 部分群数の制約
- 小さい位数の有限群の構造判定
- 正規 Sylow 部分群からの構造情報
- 半直積の入口

主要結果：

- Cauchy の定理
- Sylow の三定理
- 位数 `pq` などの標準的な有限群解析

半直積は有限群の具体例を記述するための入口までとし、一般の拡大理論へ広げない。

---

# 4. 環論：RNG1--RNG4

## RNG1 環・環準同型・イデアル・商環

**tier: core**

**prerequisites:** GRP2, F0-00A1D

主な内容：

- 環・可換環・単位元を持つ環
- 部分環
- 零因子・整域・体
- 環準同型
- イデアル・主イデアル
- 核・像
- 商環
- 環の第一同型定理

主要結果：

- 環準同型の核がイデアルになること
- 商環の演算が well-defined であること
- 環の第一同型定理

直接例：

- `Z/nZ`
- 行列環
- 多項式環
- `Z` のイデアル

## RNG2 素イデアル・極大イデアル・中国剰余定理

**tier: core**

**prerequisites:** RNG1

主な内容：

- 素イデアル
- 極大イデアル
- 商環による特徴付け
- イデアルの和・積・共通部分
- 互いに素なイデアル
- 中国剰余定理
- `Z/nZ` の分解

主要結果：

- `R/I` が整域であることと `I` が素イデアルであることの同値
- `R/I` が体であることと `I` が極大イデアルであることの同値
- 中国剰余定理

## RNG3 整除・Euclid 整域・PID・UFD

**tier: core / advanced-standard**

**prerequisites:** RNG2

主な内容：

- 単元・同伴
- 既約元・素元
- 整除関係
- 最大公約元
- Bézout 恒等式
- Euclid 整域
- 単項イデアル整域
- 一意分解整域
- `ED ⇒ PID ⇒ UFD`

主要結果：

- Euclid の互除法
- PID で既約元が素元になること
- PID が UFD であること
- UFD における因数分解の一意性

この講では多項式環固有の Gauss の補題を扱わない。

## RNG4 多項式環・Gauss の補題・既約多項式

**tier: core / advanced-standard**

**prerequisites:** RNG3

主な内容：

- 多項式環 `R[x]`
- 体上の多項式の除法
- `F[x]` の Euclid 整域性
- content と原始多項式
- Gauss の補題
- UFD 上の多項式環
- 既約多項式
- 有理根判定
- Eisenstein の既約判定
- 多項式の因数分解

主要結果：

- `F[x]` が Euclid 整域であること
- Gauss の補題
- `R` が UFD なら `R[x]` も UFD となることの標準版
- 代表的な既約判定

---

# 5. 加群：MOD1--MOD2

## MOD1 加群・部分加群・商加群・自由加群

**tier: core / advanced-standard**

**prerequisites:** RNG3, LA2

主な内容：

- 左加群・右加群
- 加群準同型
- 部分加群
- 商加群
- 加群版同型定理
- 生成系
- 自由加群
- 基底
- torsion 元・torsion 加群
- `Z`-加群としての Abel 群
- `F[x]`-加群としての線形作用素の入口

主要結果：

- 加群版第一同型定理
- 自由加群の普遍的性質の初歩
- torsion 部分加群の基本性質

Smith 標準形と PID 上構造定理は次講へ送る。

## MOD2 Smith 標準形・PID 上有限生成加群

**tier: advanced-standard**

**prerequisites:** MOD1, RNG4

主な内容：

- PID 上行列の行・列基本変形
- Smith 標準形
- 不変因子
- elementary divisor
- PID 上有限生成加群の構造定理
- 有限生成 Abel 群の構造定理
- `F[x]`-加群と線形作用素の構造
- LA4 の Jordan 構造との接続

主要結果：

- Smith 標準形
- PID 上有限生成加群の構造定理
- 有限生成 Abel 群の分類

LA4 の Jordan 標準形は重複再証明せず、加群構造論が線形作用素の分類を統一的に説明することを示す。

---

# 6. 体論：FLD1--FLD5

## FLD1 体拡大・代数的元・最小多項式

**tier: core**

**prerequisites:** RNG4

主な内容：

- 体拡大
- 拡大次数
- 塔の公式
- 代数的元・超越元
- 最小多項式
- 単純拡大
- `F[x]/(p)` による単純代数拡大

主要結果：

- 塔の公式
- 有限拡大なら代数拡大
- 代数的元 `\alpha` に対する `F(\alpha)\cong F[x]/(m_\alpha)`

## FLD2 分解体・分離性・正規性

**tier: core / advanced-standard**

**prerequisites:** FLD1

主な内容：

- 多項式の分解体
- 分解体の存在
- 埋め込みの延長の入口
- 重根と形式微分
- 分離多項式・分離拡大
- 正規拡大
- 分解体と正規性
- Galois 拡大への準備

主要結果：

- 分解体の存在
- 分解体の同型を除く一意性の有限版
- 分離性の基本判定
- 有限拡大が Galois となる条件への橋

## FLD3 有限体

**tier: core / advanced-standard**

**prerequisites:** FLD2, GRP3

主な内容：

- 標数
- Frobenius 写像
- `x^{p^n}-x`
- 有限体の乗法群
- `\mathbb F_{p^n}` の存在
- 同型を除く一意性
- 部分体
- 有限体拡大
- Frobenius 自己同型

主要結果：

- 有限体の乗法群が巡回群であること
- `\mathbb F_{p^n}` の存在と一意性
- `\mathbb F_{p^m}\subset \mathbb F_{p^n}` の条件
- 有限体拡大が Galois であること

## FLD4 有限 Galois 理論

**tier: advanced-standard capstone**

**prerequisites:** FLD2, GRP3

主な内容：

- 体の自己同型
- 固定体
- Galois 群
- 有限 Galois 拡大
- 中間体
- 部分群
- Galois 対応
- 正規部分群と正規中間拡大
- 商群と中間拡大

主要結果：

- 有限 Galois 理論の基本定理
- 中間体と部分群の包含反転対応
- 正規部分群と正規中間拡大の対応

有限体・円分体などの具体例を計算するが、作図・根号可解性は次講へ送る。

## FLD5 Galois 理論の応用：作図可能性・根号による可解性

**tier: advanced-standard / bridge**

**prerequisites:** FLD4, GRP4

主な内容：

- 二次拡大列
- 定規とコンパスによる作図可能数
- 正多角形作図への入口
- 群の導来列
- 可解群
- 根号拡大
- 多項式の根号による可解性
- Galois 群と可解性の対応
- 一般五次方程式が根号では解けないことの位置付け

主要結果：

- 作図可能数の拡大次数に関する必要条件
- 二次拡大列による作図可能性の標準判定
- 可解群と根号による可解性の関係を、採用する有限標数0の範囲で証明

証明境界：

一般の無限 Galois 理論、Krull 位相、類体論、代数的整数論、有限単純群の分類は扱わない。

---

# 7. 推奨 prerequisite DAG

```text
GRP1 群・部分群・巡回群・置換群
  ↓
GRP2 準同型・剰余類・正規部分群・商群
  ├──────────────→ LIE1 + GEO5
  ├──────────────→ RNG1 ← F0-00A1D
  ↓
GRP3 群作用・軌道・共役
  ├──────────────→ LIE2 + LIE1 + ODE4
  ├──────────────→ LIE4 + LIE3 + GEO3
  ↓
GRP4 Cauchy・Sylow・有限群

RNG1 環・イデアル・商環
  ↓
RNG2 素・極大イデアル・中国剰余定理
  ↓
RNG3 ED・PID・UFD
  ↓
RNG4 多項式環・Gauss の補題・既約性
  ├──────────────→ FLD1 → FLD2 ─┬→ FLD3
  │                              └→ FLD4 → FLD5 ← GRP4
  └──────────────→ MOD1 → MOD2
                         ↑
                        LA2

GRP3 ───────────────────────────→ FLD3 / FLD4
```

direct prerequisite は各章実装時に証明依存を再確認し、「先に読んでいると便利」だけの依存を増やさない。

---

# 8. 学部標準範囲と停止線

本系列で canonical に押さえる範囲：

- 群・部分群・巡回群・置換群
- 準同型・剰余類・正規部分群・商群・同型定理
- 群作用・軌道・安定化群・共役・類等式
- Cauchy / Sylow
- 環・イデアル・商環
- 素イデアル・極大イデアル・中国剰余定理
- Euclid 整域・PID・UFD
- 多項式環・Gauss の補題・既約判定
- 加群・Smith 標準形・PID 上有限生成加群
- 有限生成 Abel 群
- 体拡大・最小多項式・分解体
- 分離性・正規性
- 有限体
- 有限 Galois 理論
- 作図可能性・根号による可解性の標準的応用

停止線：

- 有限単純群の分類
- 群コホモロジー
- 一般の群拡大理論
- 一般 Noether 環・局所化・Krull 次元
- 可換環論の深部・代数幾何
- ホモロジー代数
- 無限 Galois 理論・Krull 位相
- 類体論
- 一般表現論

---

# 9. 証明責務

DREAM THEATER の現行規約に従い、標準教科書で証明を学ぶことが自然な主要結果は theorem-name catalog にしない。

原則として本文または canonical dependency で核心証明まで閉じるもの：

- Cayley の定理
- Lagrange の定理
- 群の同型定理
- 軌道・安定化群公式
- 類等式
- Cauchy の定理
- Sylow の三定理
- 環の同型定理
- 素イデアル / 極大イデアルと商環の特徴付け
- 中国剰余定理
- `ED ⇒ PID ⇒ UFD`
- Gauss の補題
- Smith 標準形
- PID 上有限生成加群の構造定理
- 拡大次数の塔の公式
- 分解体の存在
- 有限体の存在と一意性
- 有限 Galois 理論の基本定理
- 作図可能性・根号可解性で実際に用いる群論・体論の橋

---

# 10. 例・反例・演習

各章は理由付き例外がなければ最低

- Level A: 4 題
- Level B: 3 題
- Level C: 1 題

を置き、全問に詳細解答を付ける。

系列全体で少なくとも次を直接計算させる。

- `S_n`, `A_n`, 二面体群の部分群・剰余類・共役類
- 群作用の軌道・安定化群
- Sylow 部分群による小さい有限群の構造判定
- `Z/nZ` のイデアル・単元・零因子
- 中国剰余定理による具体的な同型
- `Z`, `F[x]` での Euclid の互除法
- Gauss の補題・Eisenstein 判定
- Smith 標準形
- 有限生成 Abel 群の不変因子 / elementary divisor 分解
- `F[x]/(p)` による有限拡大
- 二次・三次・四次程度の分解体
- 有限体での Frobenius と乗法群
- 具体的な Galois 対応
- 作図可能性と根号可解性の具体例

反例では結論が壊れるだけでなく、失った仮定と壊れた証明機構まで説明する。

---

# 11. 実装フェーズ

## Phase A：群論

1. GRP1 群・部分群・巡回群・置換群 ✅ 2026-09-23
2. GRP2 準同型・剰余類・正規部分群・商群 ✅ 2026-09-23
3. GRP3 群作用・軌道・安定化群・共役 ✅ 2026-09-23
4. GRP4 Cauchy の定理・Sylow の定理・有限群への応用 ✅ 2026-09-23

GRP2 完了後に LIE1、GRP3 完了後に LIE2 / LIE4 の実装を開始してよい。Lie 系列は GRP4 を待たない。

## Phase B：環論

5. RNG1 環・環準同型・イデアル・商環 ✅ 2026-09-23
6. RNG2 素イデアル・極大イデアル・中国剰余定理 ✅ 2026-09-23
7. RNG3 整除・Euclid 整域・PID・UFD
8. RNG4 多項式環・Gauss の補題・既約多項式

## Phase C：加群

9. MOD1 加群・部分加群・商加群・自由加群
10. MOD2 Smith 標準形・PID 上有限生成加群

## Phase D：体論・Galois 理論

11. FLD1 体拡大・代数的元・最小多項式
12. FLD2 分解体・分離性・正規性
13. FLD3 有限体
14. FLD4 有限 Galois 理論
15. FLD5 Galois 理論の応用：作図可能性・根号による可解性

原則として **1講座を1作業セッション**で完成させる。本文・metadata・knowledge・glossary・演習・詳細解答・検証を同じ作業単位で閉じる。

---

# 12. reader-facing index / DAG 登録方針

計画ファイルだけを変更した段階では、未実装 GRP / RNG / MOD / FLD ノードを

- `textbook/dream-theater-index.json`
- `textbook/dream-theater-standard-math-core.yaml`
- `textbook/dream-theater-standard-math-core.md`
- `textbook/knowledge-dag.yaml`
- `textbook/dependency-graph.md`

へ先行公開しない。

各章の実装完了時に、その章と実際の直接依存だけを canonical registry へ追加する。

---

# 13. 次の実装開始点

GRP1「群・部分群・巡回群・置換群」、GRP2「準同型・剰余類・正規部分群・商群」、GRP3「群作用・軌道・安定化群・共役」、GRP4「Cauchy の定理・Sylow の定理・有限群への応用」、RNG1「環・環準同型・イデアル・商環」、RNG2「素イデアル・極大イデアル・中国剰余定理」は 2026-09-23 に実装完了。Phase B の環論は商環の構造判定と中国剰余定理まで進んだ。

現在の次の実装対象は

**RNG3「整除・Euclid 整域・PID・UFD」**

とする。

RNG2 で素イデアル・極大イデアルを商環の整域性・体性から特徴付け、互いに素なイデアルと有限中国剰余定理まで canonical に構成した。RNG3 では整域上の整除・最大公約数・Bézout 等式・Euclid 整域・単項イデアル整域・一意分解整域を主線として、RNG4 の多項式環と既約性判定へ接続する。
