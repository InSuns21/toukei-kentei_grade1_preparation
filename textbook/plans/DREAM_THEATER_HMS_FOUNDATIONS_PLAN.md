# DREAM THEATER ホモロジカル・ミラー対称性の前提整備（独立補講）

設計: 2026-11-25  
状態: planned（設計のみ。本文・系列manifestは未作成）  
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

直接確認した本文とknowledge metadataに基づく境界である。GitHubのコード検索は既知のconcept IDにも結果を返さなかったため、検索の空集合を全リポジトリにおける不存在の証明とは扱わない。各補講の執筆前に、関連する既存章のknowledge metadata・formal anchorを再照合して重複を避ける。

## 3. 補講の設計単位

次の単位は独立した中心問いと証明責務の割当てであり、講数の固定上限ではない。実装前に実在章IDを照合し、各単位を独習可能な粒度で分割・統合する。HM1の章を先にcompletedへ変更しない。

### A. ホモロジー代数・導来圏

1. **A1：複体と鎖写像**。加法圏上の余鎖複体、射の合成と加法、アーベル圏でのコホモロジー。二項・三項複体の計算と、完全性の必要性。
2. **A2：鎖ホモトピーと錐**。ホモトピーが誘導写像を変えないこと、シフトの符号、写像錐の微分の二乗零、短完全列から長完全列への接続射。非零な可縮複体と、全次数のコホモロジーが零でも可縮ではない複体の例を区別する。
3. **A3：擬同型と局所化**。アーベル圏のホモトピー圏、擬同型の二つから三つ目が従う性質（2-out-of-3）、roofとその同値関係、局所化の普遍性。複体の同型・ホモトピー同値・擬同型を比較し、擬同型がホモトピー同値でない例を検算する。
4. **A4：導来圏と三角**。小ささまたは宇宙の仮定を宣言し、$K(\mathcal A)$ から $D(\mathcal A)$ を構成する。シフト、錐、完全三角形の標準モデルとコホモロジーの長完全列。三角圏公理と証明責務のうち本ルートで使う部分を明示する。
5. **A5：分解・導来関手・Ext**。十分な射影対象／入射対象の仮定を分け、比較写像と選択独立性を確認する。例えば整数加群の射影分解から $\operatorname{Ext}^1_{\mathbb Z}(\mathbb Z/n,\mathbb Z)$ を計算する。連接層の圏そのものに十分な入射対象があるとは仮定せず、周囲の加群の層の導来圏との比較は必要な条件を確認する。

### B. 次数付き代数の基礎

6. **B1：次数・テンソル積・Koszul符号**。係数体／環、余鎖次数、テンソル積の微分、次数付き写像の合成・交換符号を明示する。テンソル積の微分の二乗零と符号の相殺を手計算する。
7. **B2：微分付き次数付き代数と懸垂**。Leibniz則とシフト、通常の結合的な代数から次数付き代数へ。懸垂したテンソル余代数と余導分の構成を有限長の例から導き、二乗零が低次の恒等式を生む仕組みを示す。HM1-04〜06ではこの一般論を圏の対象・多入力演算・関手へ適用する。

### C. Floer理論の解析基盤

8. **C1：横断交叉と境界値問題**。Lagrange境界条件、完全実部分空間、有限stripの局所モデル、境界の楕円型評価。平坦な境界での反射法は適用条件を確認し、一般の境界条件への拡張に必要な項を扱う。
9. **C2：stripの端と作用・エネルギー**。有限エネルギー解、横断的な端点、漸近作用素。exactな場合に作用差とエネルギーの符号を検算する。一般の多価作用を単一の原始関数で書かない。
10. **C3：重み付きSobolev空間とFredholm指数**。漸近作用素のスペクトルギャップ、指数減衰、重みの許容範囲、境界付き非コンパクト作用素の評価とFredholm性。Maslov指数／相対次数との対応を仮定付きで示す。閉曲面の指数式との違いを明示する。
11. **C4：横断性・コンパクト性・境界**。単純解の正則化、再パラメータ化、有限エネルギーのコンパクト化。球面泡・円板泡・stripの折れ曲がりの区別。exactまたは適切な無泡仮定を選び、一次元モジュライの境界が何で尽くされるかを示す。
12. **C5：貼り合わせと向きの入力**。pregluingの誤差、neck長に一様な右逆、縮小写像による補正、逆向きの局所一意性。まず無泡かつ正則なモデルを扱う。係数体 $\mathbb F_2$ の境界点の偶数性と、整数係数に必要な行列式線・相対spin等の追加条件を区別する。多角形の整合的摂動・符号・障害はHM1で追加する。

## 4. 依存と出口ゲート

- AはCAT1-06/07・CATB1-03〜06を基礎とする。AG3-07/08は層の具体例として再利用し、一般論を層の文脈に閉じない。
- BはA1/A2と既習の線形代数・テンソル積を入力とする。
- CはSYM6/8とGW1の解析章を入力とし、C1→C2→C3→C4→C5の順で必要な定理の仮定を明示する。
- HM1-01〜03はAの一般論を連接層・楕円曲線に接続する。HM1-04〜06はBの符号と構成を用いる。HM1-07〜13はCの解析的入力から演算の代数的恒等式を導く。HM1-14〜18の鏡像対応を補講だけで証明したとは主張しない。
- ルート台帳の前提整備条件は維持する。補講設計の完成のみではHM1を着手可能・completedとしない。必要な独立補講の実装、区分C査読、検証、依存の照合を終えたときに再判定する。
- 既存の結果を参照する場合は実在するstable anchorを使用位置で付ける。新規各章はA4/B3/C1以上と全詳細解答、数学的全件自己査読と別観点再読、CIを必須とする。
- 解析結果を限定モデルでのみ閉じた場合、その仮定がHM1の対象（特に楕円曲線のLagrange曲線）に実際に成立するか別途検査する。閉曲面上の全Lagrangeがexactと仮定してはいけない。適切な無泡条件やNovikov係数が必要な範囲は明示し、一般の場合は未構成として残す。

## 5. 文献との対応

- [The Stacks Project, Derived Categories §13.5](https://stacks.math.columbia.edu/tag/05R1)、[§13.11](https://stacks.math.columbia.edu/tag/05RR)：局所化の普遍性、ホモトピー圏から導来圏を構成する順序。A3/A4の設計根拠。
- [B. Keller, Introduction to A-infinity algebras and modules](https://arxiv.org/abs/math/9910179)：次数付き演算・符号・代数的構造。BからHM1-04〜06への接続。
- [P. Seidel, Fukaya Categories and Picard–Lefschetz Theory](https://ems.press/books/zlam/2/contents)：Floer理論と$A_\infty$圏の構成に必要な解析・代数の切り分け。CからHM1-07〜13への接続。
- [MIT OCW, Topics in Geometry: Mirror Symmetry](https://ocw.mit.edu/courses/18-969-topics-in-geometry-mirror-symmetry-spring-2009/pages/lecture-notes/)：楕円曲線のHMSへの出口。補講では一般のCalabi–Yauに関する予想の証明を請け負わない。
