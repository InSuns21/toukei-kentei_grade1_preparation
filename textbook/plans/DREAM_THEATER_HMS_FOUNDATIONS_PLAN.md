# DREAM THEATER ホモロジカル・ミラー対称性の前提整備（依存ルート）

設計: 2026-11-25  
状態: planned（依存ルート台帳。実装・進捗はCATB7〜8と独立FLOERで管理）  
後続: [HM1](DREAM_THEATER_HOMOLOGICAL_MIRROR_SYMMETRY_PLAN.md)

## 1. 中心問いと着手条件

閉曲面の擬正則写像や連接層のコホモロジーを学んだ読者が、どの追加仮定と論証を経れば、複体の圏を比較し、境界付き曲線の計数を代数的な演算へ移せるか。HM1の18講を変更するためではなく、そこで必要になる一般論と解析的な入力の証明責務を分離する。

2026-11-25のmainを照合した時点で、MIRは32/32、AGは38/38、SYMは8/8、CATは40/40、GW1は21/21講completed。CATB1-03〜06およびCATB2-03もcompleted。HM1の第1講で使う圏論の基本事項は揃っている。一方、ルート台帳が要求する導来圏・Floer・$A_\infty$圏の前提整備をcompletedと判断できない。

## 2. 既存教材と不足の切り分け

| 既存の証明・定義の担当 | 再利用できる範囲 | 前提補講で閉じる事項 |
| --- | --- | --- |
| [CAT1-06](../volumes/dream_thater/基礎論系/CAT/CAT1-06/index.md#def-cat1-06-functor)、[CAT1-07](../volumes/dream_thater/基礎論系/CAT/CAT1-07/index.md#def-cat1-07-natural-transformation)、[CATB1-03](../volumes/dream_thater/基礎論系/CATB/CATB1-03/index.md#def-catb1-03-additive-category) | 関手、自然変換、加法圏、双積 | 既習として再利用。一般の複体とその射の加法・合成へ接続 |
| [CATB1-04](../volumes/dream_thater/基礎論系/CATB/CATB1-04/index.md#def-catb1-04-abelian-category)、[CATB1-05](../volumes/dream_thater/基礎論系/CATB/CATB1-05/index.md#def-catb1-05-exact)、[CATB1-06](../volumes/dream_thater/基礎論系/CATB/CATB1-06/index.md#lem-catb1-06-snake) | 核・余核、完全列、Snakeの補題 | 複体の一般論、長完全列と射のホモトピーへの接続 |
| [AG3-07](../volumes/dream_thater/代数系/AG/AG3-07/index.md#prop-ag3-07-cech-square-zero)、[AG3-08](../volumes/dream_thater/代数系/AG/AG3-08/index.md#prop-ag3-08-resolution-independence) | Čech複体、入射層・入射分解、分解の選択不変性、層コホモロジー | 層に限定した結果を一般の導来圏の構成と混同しない。擬同型の局所化、錐と三角、一般の導来関手の定義域、Extの計算を別途確立 |
| [CATB2-03](../volumes/dream_thater/基礎論系/CATB/CATB2-03/index.md#def-catb2-03-enriched-functor) | 豊穣関手・自然変換 | 次数付きテンソル積とKoszul符号、微分付き次数付き代数、懸垂・余代数表示による高次恒等式の基礎 |
| [SYM8](../volumes/dream_thater/幾何系/SYM/SYM8/index.md#def-sym8-almost-complex)、[GW1-03](../volumes/dream_thater/幾何系/GW/GW1-03/index.md#thm-gw1-03-fredholm) | 適合概複素構造、閉曲面のCauchy–Riemann型線形化とFredholm性 | Lagrange境界条件付きの楕円型評価、非コンパクトなstripの端と指数。閉曲面のFredholm定理を境界付きstripへそのまま適用できない |
| [GW1-06](../volumes/dream_thater/幾何系/GW/GW1-06/index.md#thm-gw1-06-compactness)、[GW1-12](../volumes/dream_thater/幾何系/GW/GW1-12/index.md#prop-gw1-12-gluing-local)、[GW1-21](../volumes/dream_thater/幾何系/GW/GW1-21/index.md#prop-gw1-21-lyapunov-schmidt) | 閉曲面のコンパクト性、節点での局所貼り合わせ、Fredholm零点の局所有限次元縮約 | Lagrange境界の泡立ち、stripの折れ曲がり、長いneck上で一様な右逆、貼り合わせの全射性と一意性。GW1-21の後続案内でもFloer微分の二乗零は新たな論証とされている |

直接確認した本文とknowledge metadataに基づく境界である。GitHubのコード検索は既知のconcept IDにも結果を返さなかったため、検索の空集合を全リポジトリにおける不存在の証明とは扱わない。CATB7〜8およびFLOERの各講義の執筆前に、関連する既存章のknowledge metadata・formal anchorを再照合して重複を避ける。

## 3. 圏論・第2課程への統合（2026-11-25）

当初の12設計単位のうち代数側7講は[圏論・第2課程（CATB）PLAN](../plans_progress/DREAM_THEATER_CATEGORY_THEORY_SECOND_COURSE_PLAN.md)の第7〜8部へ移管し、解析側5講は[独立幾何系FLOER PLAN](DREAM_THEATER_FLOER_ANALYTIC_FOUNDATIONS_PLAN.md)へ分離した。本ファイルはHM1の前提整備を照合する依存ルート台帳であり、独立した重複講義・manifestは作らない。講義内容の正本はCATB PLANとFLOER PLANであり、CATBの完了状態は[CATB系列manifest](../dream-theater-series/CATB.yaml)を参照する。FLOER manifestは実装開始時に作成する。

| 旧設計 | 統合先 | 講数 |
| --- | --- | ---: |
| A1〜A5：ホモロジー代数・導来圏 | CATB7-01〜05（通算53〜57） | 5 |
| B1〜B2：次数付き代数 | CATB8-01〜02（通算58〜59） | 2 |
| C1〜C5：Floer解析 | FLOER1-01〜05（独立系列） | 5 |

FLOERはFukaya圏への接続を目的とする独立幾何・解析講義であり、圏論とは区別する。HM1の18講は変更しない。

## 4. 依存と出口ゲート

- AはCAT1-06/07・CATB1-03〜06を基礎とする。AG3-07/08は層の具体例として再利用し、一般論を層の文脈に閉じない。
- BはA1/A2と既習の線形代数・テンソル積を入力とする。
- CはSYM6/8とGW1の解析章を入力とし、C1→C2→C3→C4→C5の順で必要な定理の仮定を明示する。
- HM1-01〜03はAの一般論を連接層・楕円曲線に接続する。HM1-04〜06はBの符号と構成を用いる。HM1-07〜13はCの解析的入力から演算の代数的恒等式を導く。HM1-14〜18の鏡像対応を補講だけで証明したとは主張しない。
- ルート台帳の前提整備条件は維持する。補講設計の完成のみではHM1を着手可能・completedとしない。CATB7〜8およびFLOERの必要な講義の実装、区分C査読、検証、依存の照合を終えたときに再判定する。
- 既存の結果を参照する場合は実在するstable anchorを使用位置で付ける。新規各章はA4/B3/C1以上と全詳細解答、数学的全件自己査読と別観点再読、CIを必須とする。
- 解析結果を限定モデルでのみ閉じた場合、その仮定がHM1の対象（特に楕円曲線のLagrange曲線）に実際に成立するか別途検査する。閉曲面上の全Lagrangeがexactと仮定してはいけない。適切な無泡条件やNovikov係数が必要な範囲は明示し、一般の場合は未構成として残す。

## 5. 文献との対応

- [The Stacks Project, Derived Categories §13.5](https://stacks.math.columbia.edu/tag/05R1)、[§13.11](https://stacks.math.columbia.edu/tag/05RR)：局所化の普遍性、ホモトピー圏から導来圏を構成する順序。A3/A4の設計根拠。
- [B. Keller, Introduction to A-infinity algebras and modules](https://arxiv.org/abs/math/9910179)：次数付き演算・符号・代数的構造。BからHM1-04〜06への接続。
- [P. Seidel, Fukaya Categories and Picard–Lefschetz Theory](https://ems.press/books/zlam/2/contents)：Floer理論と$A_\infty$圏の構成に必要な解析・代数の切り分け。CからHM1-07〜13への接続。
- [MIT OCW, Topics in Geometry: Mirror Symmetry](https://ocw.mit.edu/courses/18-969-topics-in-geometry-mirror-symmetry-spring-2009/pages/lecture-notes/)：楕円曲線のHMSへの出口。補講では一般のCalabi–Yauに関する予想の証明を請け負わない。
