# DREAM THEATER 最適輸送・Wasserstein 幾何 — 独立1セメスターPLAN

作成日: 2026-10-10  
状態: planned（発展数学・PLAN 設計のみ）

## 0. 中心問い

確率分布どうしの距離を、点ごとの mass の輸送費用から作ると何が起こるか。確率測度の空間に生じる幾何と勾配流を体系化し、生成モデル・Fokker–Planck・流体・物理の変分法に接続する。

**最適輸送 OTR1 はML2の基本的な生成モデル説明の必須前提ではない。** 深い Wasserstein 幾何と輸送・拡散の接続を扱う独立数学科目とする。

## 1. 既存正本と境界

- 既存正本: MT の測度・弱収束・積分、確率論の条件付き分布、OPT の凸性・双対、FA の弱位相、PDE/GPDE の拡散方程式。
- 幾何解析・確率解析 II は一般の多様体・Laplace–Beltrami・拡散半群を所有する。
- 本科目: coupling、Kantorovich primal / dual、`W_p`、最適写像、Wasserstein 幾何、Benamou–Brenier、確率測度上の勾配流。
- ML2: score-based diffusion / flow matching の確率モデルと目的関数。
- PML1/2: Fokker–Planck、流体、物理制約つき近似での応用。輸送の一般定理を複製しない。

**講数方針（2026-10-12）**：1セメスター・15項目は仮の射程であり、15講・15週・90分×15回を強制しない。以下の番号は**テーマ整理用**であって正式な講・週番号ではない。主要定理の証明、反例、詳細演習が独習者に再現可能な単位へ、内容を統合・分割・増補する。完了基準は講数ではなく学習目標と証明・監査の充足である。

## 2. 学習内容案（15項目は整理用・講数は可変）

| テーマ番号 | 内容・主証明 |
|---|---|
| 1 | Monge 問題・cost・mass conservation |
| 2 | coupling・周辺分布・Kantorovich 緩和 |
| 3 | 有限離散最適輸送・線形計画 |
| 4 | Kantorovich 双対・相補性 |
| 5 | Wasserstein `W_1, W_2`、有限 moment |
| 6 | metrization と弱収束＋moment 条件の関係 |
| 7 | `c`-transform・optimality 条件 |
| 8 | Brenier 定理の主張・凸勾配写像 |
| 9 | displacement interpolation・Wasserstein 測地線 |
| 10 | Benamou–Brenier 動的定式化 |
| 11 | 確率密度の連続の方程式と速度場 |
| 12 | relative entropy と自由エネルギー |
| 13 | Fokker–Planck を Wasserstein 勾配流として読む条件 |
| 14 | JKO 離散時間勾配流・entropy regularization / Sinkhorn |
| 15 | score-based models との区別、総合証明・計算 |

## 3. 技術的前提と停止線

- `W_p` を定義する際は確率測度の `p` 次モーメント有限性を要求する。
- Monge の最適写像は常に存在するとは限らない。Kantorovich の coupling と区別する。
- Brenier 定理は二次費用・Euclid 空間・source の絶対連続性など採用形の仮定を明示する。
- Wasserstein 勾配流での `\partial_t\rho=\nabla\cdot(\rho\nabla V)+\Delta\rho` は可積分性・境界条件・正則性・弱解の意味を定めて導く。
- score matching、拡散確率過程の逆時間式、確率測度の勾配流は相互に関係するが同一の定義ではない。
- Benamou–Brenier / Brenier / JKO の完全な一般証明に追加の講・補題が必要なら講数を増やして閉じる。既存のprerequisiteを越える補講が必要な場合は証明の所属を明示し、未証明の一般定理を証明済み扱いにしない。

## 4. 演習・実装条件

有限離散輸送の primal/dual 計算、一次元 quantile による輸送、Gaussian `W_2` の計算、熱方程式と自由エネルギーの時間減少を数値検証する。可能なら単純な保守的離散化と学習型近似を比較する。

仮 ID `OTR1`。正式 chapter ID・依存 DAG・演習解答・独立数学監査・CI・公開導線は実装時に追加する。

参考範囲: Cédric Villani, *Topics in Optimal Transportation* / *Optimal Transport: Old and New*; Filippo Santambrogio, *Optimal Transport for Applied Mathematicians*; Luigi Ambrosio, Nicola Gigli, Giuseppe Savaré, *Gradient Flows*.
