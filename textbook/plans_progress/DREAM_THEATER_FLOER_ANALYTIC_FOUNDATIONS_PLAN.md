# DREAM THEATER Floer理論の解析基盤（FLOER）

設計確定日：2026-11-25  
状態：in progress（FLOER1-01〜05の講義実装、残り0講。HMS前提整備ルートでのCATB7〜8との接続照合が残る）  
講義数：5講（FLOER1-01〜05）。核心証明の粒度により再審議できる。

## 1. 中心問いと依存

Lagrange交叉から生成元を作り、境界条件付きの擬正則stripを数えるとき、なぜ有限次元の正則モジュライと境界の記述が得られるのか。閉曲面のGromov–Witten理論と境界付きFloer理論の解析を区別する。圏論CATBとは別の幾何系講義とし、HM1のFukaya圏構成に入力を渡す。

- 入口：完成済みの [SYM6](../volumes/dream_thater/幾何系/SYM/SYM6/index.md)、[SYM8](../volumes/dream_thater/幾何系/SYM/SYM8/index.md#def-sym8-almost-complex)、[GW1-03](../volumes/dream_thater/幾何系/GW/GW1-03/index.md#thm-gw1-03-fredholm)、[GW1-06](../volumes/dream_thater/幾何系/GW/GW1-06/index.md#thm-gw1-06-compactness)、[GW1-12](../volumes/dream_thater/幾何系/GW/GW1-12/index.md#prop-gw1-12-gluing-local)、[GW1-21](../volumes/dream_thater/幾何系/GW/GW1-21/index.md#prop-gw1-21-lyapunov-schmidt) の該当結果。各講で実際に使う前提を章metadataに記す。
- 代数側は [CATB7〜8](../plans_progress/DREAM_THEATER_CATEGORY_THEORY_SECOND_COURSE_PLAN.md) が担当する。解析講義の証明に不要な圏論全課程の完了は要求しない。
- 後続：[HM1](../plans/DREAM_THEATER_HOMOLOGICAL_MIRROR_SYMMETRY_PLAN.md)。一般のFukaya圏、整合的多角形摂動、障害理論、鏡像同値はHM1の責務とする。
- 予定配置：`textbook/volumes/dream_thater/幾何系/FLOER/<章ID>/`。進捗は [FLOER系列manifest](../dream-theater-series/FLOER.yaml) を参照する。

## 2. 講義構成

SYM6/8とGW1-03/06/12/21の必要な解析・幾何の結果を入力とし、順に横断交叉・境界値問題、作用と端の解析、Fredholm性、コンパクト性、貼り合わせを学ぶ。閉曲面の結果を境界付きstripへそのまま流用しない。

| 章ID | 講義題名 | 中心問い・証明責務 |
| --- | --- | --- |
| **FLOER1-01** | Lagrange横断交叉と境界値問題 | Lagrange境界条件、完全実部分空間、有限stripの局所モデル、境界の楕円型評価。平坦な境界での反射法は適用条件を確認し、一般の境界条件への拡張に必要な項を扱う。 |
| **FLOER1-02** | stripの端と作用・エネルギー | 有限エネルギー解、横断的な端点、漸近作用素。exactな場合に作用差とエネルギーの符号を検算する。一般の多価作用を単一の原始関数で書かない。 |
| **FLOER1-03** | 重み付きSobolev空間とFredholm指数 | 漸近作用素のスペクトルギャップ、指数減衰、重みの許容範囲、境界付き非コンパクト作用素の評価とFredholm性。Maslov指数／相対次数との対応を仮定付きで示す。閉曲面の指数式との違いを明示する。 |
| **FLOER1-04** | Floer理論の横断性・コンパクト性・境界 | 単純解の正則化、再パラメータ化、有限エネルギーのコンパクト化。球面泡・円板泡・stripの折れ曲がりの区別。exactまたは適切な無泡仮定を選び、一次元モジュライの境界が何で尽くされるかを示す。 |
| **FLOER1-05** | Floer理論の貼り合わせと向き | pregluingの誤差、neck長に一様な右逆、縮小写像による補正、逆向きの局所一意性。まず無泡かつ正則なモデルを扱う。係数体 $\mathbb F_2$ の境界点の偶数性と、整数係数に必要な行列式線・相対spin等の追加条件を区別する。多角形の整合的摂動・符号・障害はHM1で追加する。 |

## 3. 完成・接続ゲート

- 各章で定義の直接例、主要結果の証明、A4/B3/C1以上の演習と全詳細解答を整備し、区分Cの全件再計算・別観点再読とCIを完了する。
- まず正則・無泡のモデルを明示して証明を閉じる。非コンパクトなstrip上のFredholm性、指数・減衰、コンパクト性と貼り合わせの仮定を別々に確認する。整数係数の場合は向き付けの条件を明記する。
- HM1の楕円曲線上のLagrange曲線に限定モデルの仮定が成立するかを別途確認する。閉シンプレクティック多様体をexactと仮定せず、必要な無泡条件とNovikov係数を明示する。一般論を証明済みとは扱わない。
- [HMS前提整備ルート](../plans/DREAM_THEATER_HMS_FOUNDATIONS_PLAN.md)でCATB7〜8・FLOERの両方を照合し、必要成果物・査読・検証が揃ってからHM1に進む。

## 4. 講義実装の出口（2026-11-26）

- FLOER1-05は完全境界・正則・無泡のモデルで二断面付き一様逆、非線形補正と局所一意性、折れ曲がり境界の半区間、係数体上の二乗零を扱う。整数係数の向き付け定理そのものは仮定と区別し、符号付き計数の代数的帰結を示す。
- 楕円曲線の非平行な原始整数方向の直線対について球面・円板の泡排除とstripの面積零を持ち上げで確認した。一般の摂動・曲線・多角形とNovikov係数はHM1で条件を再確認する。
- 予定5講は実装済み。CATB7〜8との依存照合・HM1への接続ゲートは未完了なのでPLANは進行中に置く。

## 5. 参考文献

- [P. Seidel, Fukaya Categories and Picard–Lefschetz Theory](https://ems.press/books/zlam/2/contents)：Floer解析とFukaya圏への接続。
- [D. McDuff / D. Salamon, J-holomorphic Curves and Symplectic Topology](https://doi.org/10.1090/coll/052)：擬正則曲線の解析・コンパクト性の基礎。閉曲面の結果とLagrange境界付きの追加論証を区別する。
- [MIT OCW, Topics in Geometry: Mirror Symmetry](https://ocw.mit.edu/courses/18-969-topics-in-geometry-mirror-symmetry-spring-2009/pages/lecture-notes/)：楕円曲線のHMSへの接続。
