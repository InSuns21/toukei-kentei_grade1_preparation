# DREAM THEATER ホモロジカル・ミラー対称性の前提整備（依存ルート）

設計: 2026-11-25  
状態: completed（2026-11-28、追加12講・接続監査完了。HM1本編は未着手）  
後続: [HM1](../plans/DREAM_THEATER_HOMOLOGICAL_MIRROR_SYMMETRY_PLAN.md)

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

当初の12設計単位のうち代数側7講は[圏論・第2課程（CATB）PLAN](../plan_done/DREAM_THEATER_CATEGORY_THEORY_SECOND_COURSE_PLAN.md)の第7〜8部へ移管し、解析側5講は[独立幾何系FLOER PLAN](./DREAM_THEATER_FLOER_ANALYTIC_FOUNDATIONS_PLAN.md)へ分離した。本ファイルはHM1の前提整備を照合する依存ルート台帳であり、独立した重複講義・manifestは作らない。講義内容の正本はCATB PLANとFLOER PLANであり、CATBの完了状態は[CATB系列manifest](../dream-theater-series/CATB.yaml)を参照する。FLOERの完了状態は[FLOER系列manifest](../dream-theater-series/FLOER.yaml)を参照する。

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

## 6. 接続監査・出口判定（2026-11-28）

監査基準 main: `19cda83a6c0e388b30b5b82f5fc2e45d7d305cfb`。CATB 59/59、FLOER 5/5、MIR 32/32、AG 38/38 の完了manifestと、11/25のSYM・CAT・GWの完了確認を入力とする。今回の対象は追加前提12講とHM1の接続であり、全59講の新規全文再査読ではない。追加12講の本文中の主要定義・定理の実在anchor、章・knowledge metadataの直接前提、既存査読記録を照合し、適用の境界を以下に記録する。

| HM1担当 | 完成した入力 | 接続時の責務 |
|---|---|---|
| 01–02 | [CATB7-01](../volumes/dream_thater/基礎論系/CATB/CATB7-01/index.md#def-catb7-01-cochain-complex)（余鎖複体）、[CATB7-02](../volumes/dream_thater/基礎論系/CATB/CATB7-02/index.md#def-catb7-02-cone)（錐）、[CATB7-03](../volumes/dream_thater/基礎論系/CATB/CATB7-03/index.md#thm-catb7-03-localization)（局所化） | 圏・加法・複体の定義を既習として使用。導来圏の射はroofであり単なる鎖写像と混同しない。 |
| 02–03,17 | [CATB7-04](../volumes/dream_thater/基礎論系/CATB/CATB7-04/index.md#thm-catb7-04-short-exact-triangle)（完全三角形）、[CATB7-05](../volumes/dream_thater/基礎論系/CATB/CATB7-05/index.md#thm-catb7-05-derived-hom)（分解によるHom計算）、[AG3-08](../volumes/dream_thater/代数系/AG/AG3-08/index.md#def-ag3-08-injective-resolution) | 有界導来圏と連接層の比較、Extの具体計算はHM1-03。連接層の圏に十分な入射・射影対象を仮定しない。周囲の加群層の圏と包含による比較の条件を明示する。TR3・八面体公理の一般証明はCATB7-04の範囲外。 |
| 04–06 | [CATB8-01](../volumes/dream_thater/基礎論系/CATB/CATB8-01/index.md#thm-catb8-01-tensor-differential)（テンソル微分）、[CATB8-02](../volumes/dream_thater/基礎論系/CATB/CATB8-02/index.md#thm-catb8-02-coderivation-extension)（余導分延長）、[懸垂符号](../volumes/dream_thater/基礎論系/CATB/CATB8-02/index.md#eq-catb8-02-suspended-operations) | 被約テンソル余代数から対象ごとの合成可能な語へ拡張。高次演算・関手・準同値・twisted complexes・分裂閉包はHM1の新規責務。曲率項を含む場合は被約余代数の議論を無条件で使わない。 |
| 07 | [FLOER1-01](../volumes/dream_thater/幾何系/FLOER/FLOER1-01/index.md#thm-floer1-01-estimate)（境界評価）、[FLOER1-02](../volumes/dream_thater/幾何系/FLOER/FLOER1-02/index.md#thm-floer1-02-asymptotic-invertible)（端の可逆性）、[FLOER1-03](../volumes/dream_thater/幾何系/FLOER/FLOER1-03/index.md#thm-floer1-03-relative-index)（相対指数） | 交点の次数・係数・相対類を定義し、指数と次数の関係を確認する。 |
| 08 | [FLOER1-04](../volumes/dream_thater/幾何系/FLOER/FLOER1-04/index.md#thm-floer1-04-boundary)（低次元極限）、[FLOER1-05](../volumes/dream_thater/幾何系/FLOER/FLOER1-05/index.md#thm-floer1-05-square-zero)（完全境界での二乗零） | 完全境界での証明機構を再利用。閉トーラスに定理を直接適用せず、下記の直線対を最初のモデルとする。非自明なstripを扱う場合はエネルギー切断・正則性・コンパクト化・貼り合わせの追加条件を先に確立。 |
| 09–13 | [FLOER1-05](../volumes/dream_thater/幾何系/FLOER/FLOER1-05/index.md#thm-floer1-05-collar)（半区間）、[行列式線](../volumes/dream_thater/幾何系/FLOER/FLOER1-05/index.md#def-floer1-05-det-line)、[条件付き符号計数](../volumes/dream_thater/幾何系/FLOER/FLOER1-05/index.md#prop-floer1-05-signed-count) とCATB8 | stripの結果を多角形へそのまま移さない。整合的摂動、向き・相対spin、grading、Novikov係数、障害・単位の構成をHM1で扱う。 |
| 14–18 | MIR2・AG3・SYMと上記のHM1内成果 | theta関数、生成元、完全忠実性・本質的全射性、Dehn twistの対応をそれぞれ論証。前提整備の完了は鏡像同値の証明を意味しない。 |

### 6.1 代表的な接続計算

- 余鎖次数で微分の次数は1。FLOERの指数が $d(p)-d(q)=1$ のstripを $p\mapsto q$ と数えると、幾何側の次数 $d$ は1下がる。余鎖次数を $|p|=-d(p)$ と選べば $|q|-|p|=1$ となりCATB7の複体へ接続できる。HM1で別のgrading規約を選ぶなら射の向きも含めて変換を明示する。
- CATB8-01のテンソル微分では、$|a|=p$ とすると $d(a\otimes b)=da\otimes b+(-1)^pa\otimes db$。二度作用させた交差項の係数は $(-1)^{p+1}+(-1)^p=0$。CATB8-02の懸垂 $s$ は次数 $-1$、$b_1=-sds^{-1}$、$b_2(sa\otimes sb)=(-1)^ps(ab)$ は次数1。FLOERの二乗零から $b_1^2=sd^2s^{-1}=0$ は従うが、積や高次演算の恒等式は別のモジュライ境界を要する。奇数次数余導分の二乗の交差項の消去は標数2でも2で割らない。
- トーラス $X=\mathbb R^2/\mathbb Z^2$ に $\omega=dx\wedge dy$ を取ると $\int_X\omega=1$。従ってStokesにより大域的に $\omega=d\lambda$ とはならない。原始整数方向 $v_j=(a_j,b_j)$ のアフィン直線の像 $L_j$ は埋め込み円であり、$\det(v_0,v_1)\ne0$ なら横断。交点数は格子指数 $[\mathbb Z^2:\mathbb Zv_0+\mathbb Zv_1]=|\det(v_0,v_1)|$（例えば $(1,0),(1,2)$ なら2点）。球面・円板は平面へ持ち上がる。円板境界は一つの直線に入り、$\lambda=-y\,dx$ のその直線への制限は $d(-ay_0t-abt^2/2)$。よって球面・円板の面積はStokesで0、適合構造の非負エネルギーから非定数泡はない。
- 同じ直線対の収束端付きstripの持ち上げは両境界が固定した二直線に入り、その交点は唯一なので両端は同一点。平面上の完全境界での作用差は0、従って非定数stripは存在しない。この対の微分は零であり、任意の交点の係数で二乗零を直接確認できる。定数stripの線形化は標準平坦構造では固定横断境界の可逆な全帯作用素（FLOER1-03）。正則性・指数1の非定数解のコンパクト化を閉標的へ無条件に一般化したのではない。
- 非平行な直線対のこの結果は、平行・同一曲線の自己Floer、摂動後の曲線、三本以上の境界付き多角形の有限性や積の非自明性を保証しない。面積でフィルターした係数（例：実数指数のNovikov級数で各有限上限以下の項数を有限とする）を使うなら、その有限性を各モジュライで証明し、積の面積加法性を確認する。整数符号は境界向きの積との整合を別途確立し、$\mathbb F_2$ の偶数性だけからは導かない。

### 6.2 査読・検証の証拠と判定

- CATB側は全59講の完了監査 [#4788](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4788) と同PLANの第7部・第8部の個別PR記録を再利用する。
- FLOER側は全5講の実装と追跡監査 [#4722](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4722)、[#4726](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4726)、[#4737](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4737)、[#4750](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4750)、[#4759](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4759) がmergedであることを確認。最終講実装 [#4752](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4752) に5ワークフロー成功の記録がある。今回の変更はPLAN・manifestの参照のみで、章本文・演習・knowledge・公開目次の変更はない。
- 接続監査では上記の次数・符号・面積・無泡性・定理仮定の照合を実施した。既存各章の全演習を今回新たに解き直したという意味ではなく、既存査読記録を再利用した同一AI担当の接続監査である。独立第三者査読・ローカルCLIは未実施。状態遷移を含む今回のPRで必須CIを確認する。
- **判定：HM1-01着手可。** 追加前提12講と接続ゲートを満たしたのでHMS前提整備ルートとFLOER PLANをdoneへ移す。HM1は本編未着手のためplansに維持し、18講の構成と追加証明責務は維持する。上記の未証明事項は前提補講の未完了ではなくHM1の指定講義の責務であり、その実装時に解消しない限り該当講をcompletedとしない。
