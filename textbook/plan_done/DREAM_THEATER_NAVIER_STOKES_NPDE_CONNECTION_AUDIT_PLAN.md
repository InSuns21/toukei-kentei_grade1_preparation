# DREAM THEATER Navier--Stokes × 非線形PDE 接続監査計画

作成日: 2026-10-05  
状態: completed

## 0. 目的

本計画は、非線形偏微分方程式系列（NPDE1--NPDE7）の一般理論が整備された後に、完了済みの Navier--Stokes 系列（NS1--NS8A）を再監査し、一般論と NS 固有論の境界を明確にするための横断監査計画である。

中心となる問いは、

> Navier--Stokes 系列で先に局所導入した scaling、criticality、blow-up、弱解、長時間挙動などを、後から整備された非線形 PDE 一般論へどう接続すれば、NS 系列の自己完結性を壊さずに理論構造を見通しよくできるか。

である。

この計画は NS1--NS8A を全面書き換えるものではない。NS 系列は既存 prerequisite だけで引き続き読める状態を維持し、NPDE を後付けの必須 prerequisite にしない。

---

## 1. canonical ownership

一般論と NS 固有論の責務を次のように分ける。

| 主題 | canonical owner |
|---|---|
| scalar conservation law / entropy solution / 選択原理 | NPDE1--NPDE2 |
| 単調作用素 / 非線形変分法 / $p$-Laplacian | NPDE3 |
| scaling / criticality / self-similarity の一般機構 | NPDE4 |
| nonlinear diffusion / finite propagation | NPDE5 |
| semilinear heat / finite-time blow-up の一般的比較 | NPDE6 |
| rescaling / long-time asymptotics / universal profile | NPDE7 |
| 発散零空間 / Leray 射影 / Stokes 作用素 | NS1 |
| Navier--Stokes 非線形項 / 三重線形形式 | NS2 |
| Leray--Hopf 弱解 | NS3 |
| 2D / 3D の差 | NS4--NS5 |
| NS 固有の scaling / 臨界空間 | NS6 |
| Prodi--Serrin / 渦伸長 / 正則性判定 | NS7 |
| CMI 定式化 / 2026年特異点構成 | NS8--NS8A |

一般的な道具を NPDE へ集約しても、NS でその道具を初めて使う読者のための最小説明は残す。

---

## 2. 監査対象

重点対象は次とする。

### NS3 Leray--Hopf 弱解と大域存在

NPDE1--NPDE2 完成後に、

- 「弱解を作れば問題が終わるわけではない」という一般的論点
- scalar conservation law の entropy selection と Navier--Stokes の弱解問題の違い
- entropy condition を NS へ機械的に持ち込めない理由

を比較できる短い接続を検討する。

NS3 の存在証明や Leray--Hopf 固有の定義は NS 側に残す。

### NS5 三次元局所強解・有限時間発散判定

NPDE6 完成後に、

- continuation criterion
- finite-time blow-up
- 「何のノルムが発散するのか」を固定する考え方
- semilinear heat の blow-up と NS の breakdown criterion の相違

を比較する。

半線形熱方程式の Fujita 型結果を NS の証明へ逆輸入しない。

### NS6 スケーリング・臨界性

NPDE4 完成後の最重要監査対象とする。

確認項目:

- scaling 変換の導出順序が NPDE4 の一般手順と整合しているか
- subcritical / critical / supercritical の意味を二重定義していないか
- NS 固有の速度・圧力・時空間 scaling は十分に局所導出されているか
- $L^p$、Sobolev 型量などの scaling exponent の計算を一般論へ接続できるか
- NPDE4 を未読でも NS6 が読めるか

一般定義を参照できる場合でも、NS の scaling 自体の計算は残す。

### NS7 正則性判定・渦伸長

NPDE4 / NPDE6 完成後に、

- critical quantity を監視する一般的発想
- blow-up prevention と continuation criterion の関係
- NS 固有の vortex stretching

を分離して見せる。

渦伸長、Prodi--Serrin、NS 固有正則性判定は NS の canonical result のままとする。

### NS8A 2026年有限時間特異点構成

NPDE4 / NPDE6 / NPDE7 完成後の重点監査対象とする。

確認項目:

- 異方的 concentration scale を NPDE4 の isotropic scaling / similarity と比較できるか
- 有限 $L^2$ energy と $L^\infty$ blow-up の両立を集中現象の一般的視点から補足できるか
- self-similar / rescaled dynamics と 2026年構成の違いを曖昧にしていないか
- 「blow-up solution を書けば forcing が自動的に admissible」という誤解を residual の smoothness 条件で防げているか
- NPDE の一般論を参照しても、2026年構成固有の仕組みが埋もれないか

---

## 3. 実施タイミング

NPDE の全章完成まで何も見直さないのではなく、一般理論が確定した節目で接続候補を記録する。

### Gate A: NPDE2 完成後

対象:
- NS3

目的:
- distributional weak solution と entropy-selected solution の違いを整理する。

### Gate B: NPDE4 完成後

対象:
- NS6
- NS7
- NS8A

目的:
- scaling / criticality / self-similarity の用語・定義・計算手順を統一する。

### Gate C: NPDE6 完成後

対象:
- NS5
- NS7
- NS8A

目的:
- finite-time blow-up、continuation、blow-up quantity の比較を整理する。

### Gate D: NPDE7 完成後

対象:
- NS4
- NS8A

目的:
- rescaling / asymptotics と NS の時間発展の見方を比較し、必要な発展参照だけを追加する。

本計画そのものを `plans_progress/` へ移すのは、NPDE 側の必要な一般論が揃い、実際に NS 本文・依存関係の監査を開始するときとする。

---

## 4. 編集原則

1. **NS の自己完結性を維持する。**  
   NPDE1--NPDE7 を NS の後付け prerequisite にしない。

2. **一般論は重複正本化しない。**  
   NPDE で一般 theorem / definition が正本化された場合、NS ではその一般論を必要以上に再証明しない。

3. **NS 固有の導出は残す。**  
   一般 scaling を NPDE に送っても、Navier--Stokes 方程式そのものの scaling 計算は NS6 に残す。

4. **比較は同一視にしない。**  
   conservation law の entropy solution、semilinear heat の blow-up、Navier--Stokes の weak solution / regularity problem を同じ解概念・同じ機構として扱わない。

5. **後続理論を過去の証明へ逆輸入しない。**  
   NPDE の結果を使わないと NS1--NS8A の主要証明が成立しない構成へ変更しない。

6. **学習者向け本文に編集事情を書かない。**  
   canonical owner、cross-series audit 等は plan / metadata に留める。

---

## 5. 監査方法

各対象章について次の4列の対応表を作る。

| NS の論点 | NPDE の一般結果 | NS に残すもの | 修正種別 |
|---|---|---|---|
| 例: NS6 scaling | NPDE4 scaling | NS 方程式固有の指数計算 | 参照追加 / 重複整理 |

修正種別は原則として次から選ぶ。

- no-change
- terminology-align
- forward-reference
- comparison-note
- local-derivation-keep
- duplicated-general-proof-reduce
- knowledge-dependency-adjust

本文を読まずに機械的な一括置換をしない。

---

## 6. knowledge DAG / prerequisite 方針

- NPDE は NS の prerequisite として一括追加しない。
- 既存 NS concept が NPDE concept を論理的に必要としない限り `requires` を追加しない。
- 後から学ぶと理解が深まるだけの関係は、本文の発展参照または既存 schema で許される forward reference として扱う。
- 同じ概念を別 ID で二重登録していることが判明した場合は、数学的同一性を確認してから canonical concept に統合する。
- alias は真の同義語に限定する。

---

## 7. 完成条件

以下をすべて満たしたとき本計画を完了とする。

- NS1--NS8A 全章について NPDE との接続要否を判定した。
- NS3 / NS5 / NS6 / NS7 / NS8A の重点監査を完了した。
- NS は NPDE 未読でも従来どおり自立して読める。
- NPDE 既読者には一般理論と NS 固有機構の境界が見える。
- scaling / criticality / blow-up / self-similarity の用語が系列間で矛盾しない。
- entropy solution と Navier--Stokes 弱解を混同させる記述がない。
- 必要な knowledge / dependency / index 更新を完了した。
- 対象変更に応じた DREAM THEATER validation が green である。
- 数学的完全性と読者粒度の人手監査を行い、重大指摘を解消した。
