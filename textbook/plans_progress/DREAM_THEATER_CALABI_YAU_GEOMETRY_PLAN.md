# DREAM THEATER Calabi–Yau幾何学（CYG1）

分冊: 2026-10-11  
推敲: 2026-11-03（標準教科書・大学院講義ノートとの照合、定義・具体計算・証明境界・学修順序の再設計）  
状態: in_progress（2026-11-04にCYG1-14までの全14章を実装。系列全体の横断監査は未完了）

## 中心問いと到達点

**「Calabi–Yau」と呼ばれる対象の代数的・位相的・計量的条件は、何が同じで何が違うのか。さらに具体的な多様体で標準束、Hodge数、曲率・ホロノミー、変形の自由度をどう結び付けるのか。**

「標準束が自明ならホロノミーは必ず $SU(n)$」「$c_1(X)=0$ なら自明な正則体積形式がある」といった省略を避け、**仮定 → 含意 → 逆が壊れる例 → 正しい追加条件**を一貫して扱う。履修後に次を実際に再構成できることを目指す。

1. コンパクトKähler多様体での $K_X\simeq\mathcal O_X$、$c_1(X)_{\mathbb Z}=0$、$c_1(X)_{\mathbb R}=0$、Ricci平坦Kähler計量、制限／全ホロノミー $\operatorname{Hol}^0(g)$ / $\operatorname{Hol}(g)$ の関係を、成立条件と反例込みで区別する。
2. 滑らかな射影超曲面に随伴公式を適用して三次平面曲線、四次K3曲面、五次Calabi–Yau三次元多様体の標準束を計算し、滑らかさ・コンパクト性・Kähler性を別々に確認する。
3. Hodge分解、Lefschetz型の外部入力、Chern類・Gauss–Bonnetを正しく接続し、滑らかなquinticの $h^{1,1}=1$、$h^{2,1}=101$、$\chi_{\mathrm{top}}=-200$ を数字の出発点から導く。
4. Yauの定理が**何を存在・一意化するか**をKähler類とRicci形式を明示して述べ、複素Monge–Ampère方程式の完全な存在証明を未履修のまま証明済みとしない。
5. 正則体積形式、一次変形 $H^1(X,T_X)$ と $H^{n-1,1}(X)$、Kähler錐の役割を区別し、無障害性やmirror symmetryには別の深い定理が必要と説明する。

## 正本・直接依存・責務境界

| 範囲 | 参照先とこのPLANの責務 |
|---|---|
| 射影空間・正則線束・随伴公式・滑らかなquintic | 完了済み [AG1〜AG3](../plan_done/DREAM_THEATER_ALGEBRAIC_GEOMETRY_I_III_PLAN.md) および [CAG1](../plan_done/DREAM_THEATER_COMPLEX_ALGEBRAIC_GEOMETRY_PLAN.md)。特にCAG1-11〜14の標準束、局所正則3形式、Hodge数計算への橋を再利用。**CYG1がquinticのHodge数の実導出を所有**する。 |
| 複素多様体・正則束・複素型 | 完了済み [CM1/CM2](../plan_done/DREAM_THEATER_COMPLEX_MANIFOLDS_I_II_PLAN.md) の定義・Dolbeault・標準束を参照。 |
| Kähler条件、Ricci形式、第一Chern類、Kähler class、$U(n)$ ホロノミー | 完了済み [KAH1](../plan_done/DREAM_THEATER_KAHLER_GEOMETRY_PLAN.md)、特にKAH1-11/12/13/15/16。Ricci形式の規格化と制限ホロノミーへの含意を借り、重複証明しない。 |
| Hodge分解・対称性・Hard Lefschetz | 完了済み [HOD1](../plan_done/DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md)、特にHOD1-06/07/11〜14。**Hard Lefschetzと弱Lefschetz超平面定理は別物**である。 |
| 全Chern類・Euler標数・弱Lefschetz超平面定理 | quintic・K3の計算に不可欠な入力。既存の実証明ownerを正式着手時に確認し、ないものはCYG1内に必要部分の導出を置くか、**精密に仮定を述べた外部定理**として明示する。単にHOD1から証明済みとみなさない。一般Chern–Weil理論のownerは [GBG](../plans/DREAM_THEATER_PRINCIPAL_BUNDLES_GAUGE_GEOMETRY_PLAN.md)。 |
| Ricci平坦Kähler計量の存在・一意性の**完全証明** | 後続 [YAU1](../plans/DREAM_THEATER_YAU_CALABI_CONJECTURE_PLAN.md)。CYG1はYauの定理を**未証明の外部入力／後続予告**として正確に述べ、定義の比較・幾何的帰結に用いる。YAU1がCYG1を参照する循環は「証明済み依存」では作らない。 |
| 一般のKodaira–Spencer/Kuranishi変形理論、Bogomolov–Tian–Todorov、mirror symmetryの証明 | 必要な一次変形の意味だけ本科目で導入。一般の無障害性・周期写像・mirror定理・Gromov–Witten不変量は本文の主証明対象にしない。 |

**PLANの状態**：2026-11-03にCYG1系列manifestとCYG1-01の章本文を新設し、2026-11-04にCYG1-14までの章を実装した。各章の完了状態は [`CYG1.yaml`](../dream-theater-series/CYG1.yaml) の章statusを正本とする。系列全体の横断監査は今後行うため、このPLANは `plans_progress/` に維持する。

## 対象・記号・定義の安全柵

- 主舞台は**滑らか、連結、コンパクト、複素次元 $n\ge1$ のKähler多様体** $X$。非コンパクト・特異・非Kählerの用法は明示的に別枠とし、「Calabi–Yau」の**単一の普遍的定義がある**とはしない。$K_X=\det\Omega_X^1$、$c_1(X)=-c_1(K_X)$ とする。
- $c_1(X)_{\mathbb Z}\in H^2(X;\mathbb Z)$ は整係数の第一Chern類、$c_1(X)_{\mathbb R}\in H^2(X;\mathbb R)$ はその実係数像。有限CW型のコンパクト多様体では **$c_1(X)_{\mathbb R}=0\iff c_1(X)_{\mathbb Z}$ がtorsion**。それだけで $c_1(X)_{\mathbb Z}=0$ や $K_X\simeq\mathcal O_X$ を結論しない。
- $K_X\simeq\mathcal O_X$ は**消えない大域正則 $n$ 形式** $\Omega$ が存在することと同値で、$c_1(X)_{\mathbb Z}=0$ を含意する。標準束の位相的自明性と**正則**自明性を同一視しない。Enriques曲面の $K_X$ が非自明な2-torsionとなる事実は、構成・存在についての外部入力であると明記して反例に用いる。
- KAH1の規約に合わせ $\omega=i\,g_{j\bar k}\,dz^j\wedge d\bar z^k$、$\rho=-i\partial\bar\partial\log\det(g_{j\bar k})$、$[\rho/(2\pi)]=c_1(X)_{\mathbb R}$。$\rho=0$ は**指定した計量**の条件、$c_1=0$ はコホモロジー類の条件。$\rho=0\Rightarrow c_1(X)_{\mathbb R}=0$、逆の**存在**はYauの定理を必要とする。
- $\operatorname{Hol}^0(g)$ は単位元連結成分（制限ホロノミー）、$\operatorname{Hol}(g)$ は全ホロノミー。Kähler計量では $\operatorname{Hol}(g)\subseteq U(n)$。Ricci平坦なら $\operatorname{Hol}^0(g)\subseteq SU(n)$ だが、全ホロノミーについては別の検討を要する。$K_X$ 自明で**そのRicci平坦計量**を選ぶと正則体積形式の平行性から $\operatorname{Hol}(g)\subseteq SU(n)$。いずれも **$=SU(n)$ を保証しない**。
- 複素トーラス・積・hyperkähler例を用いて $\operatorname{Hol}(g)\subsetneq SU(n)$ を示す。$SU(2)=Sp(1)$ の特例と $n\ge3$ の一般的な $SU(n)$ 型を混同しない。ホロノミーの「群の包含」「等号」「計量に関する命題」を分けて書く。
- $h^{p,q}(X)=\dim_{\mathbb C}H^{p,q}_{\bar\partial}(X)$、$H=c_1(\mathcal O_{\mathbb P^m}(1))$、$\int_{\mathbb P^m}H^m=1$。quinticでは $\int_XH^3=5$ とし、実・複素次元、Chern類の次数、Euler標数の符号を固定する。

## 講義構成（暫定14章。章数は固定しない）

章IDは**未予約の仮ID**。中心問い・証明量・演習量に応じて分割・統合してよい。時間割上の「10講」等に合わせて証明を詰め込まない。

### 第I部　「Calabi–Yau」の意味を固定する

1. **CYG1-01：標準束、Chern類、ホロノミーは同じ定義か。** Kähler・コンパクト等の共通仮定、$K_X$・$c_1$・$\rho$・$\operatorname{Hol}^0/\operatorname{Hol}$ を既出の根拠に接続。含意関係の表を証明／未証明の区別付きで作り、逆向きは一つずつ吟味する。
2. **CYG1-02：標準束の自明性をどう手で確かめるか。** 消えない正則体積形式と標準束の同型を局所枠・遷移関数で往復する。随伴公式 $K_X\simeq\mathcal O_X(d-m-1)$（滑らかな $X_d\subset\mathbb P^m$）から $d=m+1$ を導く。滑らかさのJacobian判定と、正の線束／自明線束の混同を防ぐ。
3. **CYG1-03：整係数・実係数の差、torsionの反例。** Chern類の係数変更とtorsionの意味を有限生成Abel群の簡単な例で確認。$K_X$ がtorsionだが非自明なEnriques曲面を定義の境界として位置付け、具体構成・双有理分類までは外部既知事項として扱う。「$c_1=0$」の係数を省かない習慣を付ける。
4. **CYG1-04：楕円曲線と複素トーラス。** $\mathbb C^n/\Lambda$ の平行正則形式 $dz^1\wedge\cdots\wedge dz^n$、標準束・平坦Kähler計量・自明ホロノミーを直接確認。楕円曲線のHodgeダイヤモンドをHOD1の根拠から再計算し、複素トーラスの射影性は偏極が要ることを指摘する。

### 第II部　K3とquinticを実際に計算する

5. **CYG1-05：四次K3曲面と $SU(2)$ の前提。** Fermat四次曲面 $\sum_{i=0}^3z_i^4=0\subset\mathbb P^3$ の滑らかさ、$K_X\simeq\mathcal O_X$ を導く。弱Lefschetz超平面定理（単連結性・低次コホモロジーへの入力）とChern類計算の必要箇所を外部定理か証明付き補題として分離し、$\chi=24$、$b_2=22$、$h^{2,0}=1$、$h^{1,1}=20$ を検算。hyperkählerとの関係は後述のホロノミーへ橋渡しする。
6. **CYG1-06：Hodgeダイヤモンドを何が制約するか。** HOD1のHodge対称性・Serre型双対・Hard Lefschetzの適用条件を確認。$K_X\simeq\mathcal O_X$ から $h^{n,0}=1$（連結・コンパクト）を示す一方、**$h^{p,0}=0$（$0<p<n$）は標準束自明性だけでは従わない**ことをトーラスで確かめる。強いホロノミー仮定とBochnerの関係は第III部に送る。
7. **CYG1-07：接束のChern類とEuler標数。** 滑らかな次数$d$超曲面 $X_d\subset\mathbb P^m$ の法束列、$c(T\mathbb P^m)=(1+H)^{m+1}$、Whitney積公式から $c(TX_d)=(1+H)^{m+1}/(1+dH)$ を対象次数まで導く。トップChern類の積分がEuler標数となるChern–Gauss–Bonnetの入力と、形式的べき級数の打切りを切り分ける。
8. **CYG1-08：quintic threefoldのHodge数 $1,101$。** 滑らかな $X=\{\sum_{i=0}^4z_i^5=0\}\subset\mathbb P^4$ のJacobian、$K_X\simeq\mathcal O_X$ を再検算。$c(TX)=(1+H)^5/(1+5H)=1+10H^2-40H^3$ より $\chi=\int_Xc_3=-40\cdot5=-200$。**弱Lefschetz**（$b_1=0$、$b_2=1$）に加え、非零Kähler類が $(1,1)$ 型であることから $h^{1,1}=1,h^{2,0}=0$ を確定する。$K_X$ 自明による $h^{3,0}=1$ とHOD1の対称性を使い、$\chi=2(h^{1,1}-h^{2,1})$、$h^{2,1}=101$ を導出。Euler類の公式と弱Lefschetzの証明有無を表示し、既出のHard Lefschetzだけで代替しない。
9. **CYG1-09：完全交叉と、どこで計算が壊れるか。** 滑らかな完全交叉 $X_{d_1,\ldots,d_r}\subset\mathbb P^{n+r}$ に $K_X\simeq\mathcal O_X(\sum d_i-n-r-1)$ を導く。三次元の $(3,3)\subset\mathbb P^5$ 等を直接例とし、特異な五次超曲面、非コンパクト、多重交叉で随伴公式・Hodge・Euler計算の前提がどこで失われるかを示す。

### 第III部　Ricci平坦性と特殊ホロノミーの正確な接続

10. **CYG1-10：Yauの定理が付け加える存在量化。** コンパクトKähler $X$ と固定したKähler類 $[\omega]$、$2\pi c_1(X)_{\mathbb R}$ の指定代表 $\eta$ に対し、同じ類に属する**一意の**Kähler計量 $\omega'$ が $\rho(\omega')=\eta$ を満たすという定理の仮定・結論を正確に記述。$c_1(X)_{\mathbb R}=0$ で $\eta=0$ を選ぶRicci平坦存在の帰結を示す。ただし**定理の存在証明はYAU1で行う未証明入力**で、CYG1は連続性の方法や事前評価を「証明した」と記さない。
11. **CYG1-11：Ricci曲率ゼロから $SU(n)$ への含意と逆の限界。** KAH1の曲率・接続から行列式ホロノミーの曲率を追い、$\rho=0\Rightarrow\operatorname{Hol}^0(g)\subseteq SU(n)$ を説明。正則体積形式の平行性（Bochner型議論）の適用条件を示し、$K_X$ 自明のときの**全ホロノミーの包含**に進む。トーラスの自明群、積多様体、K3の $SU(2)=Sp(1)$ を比較し、$\operatorname{Hol}=SU(n)$ と断定するための既約性・単連結性等の追加議論を明示する。

### 第IV部　変形の自由度と次の数学への出口

12. **CYG1-12：複素構造の一次変形と正則体積形式。** $\Omega$ の収縮 $T_X\xrightarrow{\iota_{(-)}\Omega}\Omega_X^{n-1}$ を局所座標で検証し、コホモロジーの同型 $H^1(X,T_X)\simeq H^{n-1,1}(X)$ に接続。ここでいう次元は**無限小変形の接空間**の次元であり、実際の滑らかなモジュライの次元と断定するにはKodaira–Spencer/KuranishiとBogomolov–Tian–Todorov等の深い入力が必要と明記する。
13. **CYG1-13：quinticの101個の複素変形とKähler方向。** 斉次五次式の単項式126個、全体のスカラー1次元、射影座標変換 $\dim PGL(5)=24$ により**一般的な滑らかなquinticの多項式変形で** $126-1-24=101$ を数える。全変形との同一視には別途変形論が必要と示し、第8章の $h^{2,1}=101$ と突き合わせる。Kähler方向の $h^{1,1}=1$ は別の自由度であり、Kähler錐と複素化Kählerモジュライを混同しない。
14. **CYG1-14：総合判定とmirror symmetryへの入口。** cubic/K3/quintic/トーラス/Enriquesを横断して「$K_X$・$c_1$・Ricci平坦・$\operatorname{Hol}$・Hodge数」の適用可能な結論を条件表で整理。mirror pairの $h^{1,1}\leftrightarrow h^{2,1}$ を**典型例の予告**として紹介し、quinticのmirrorの構成、特異点解消、周期写像・Gromov–Witten不変量・mirror定理の証明は本PLANの完了条件に含めない。

## 主要な証明・計算・反例の完了チェックポイント

| 対象 | 実本文での合格条件 |
|---|---|
| 定義の論理 | $K_X\simeq\mathcal O_X\Rightarrow c_1(X)_{\mathbb Z}=0\Rightarrow c_1(X)_{\mathbb R}=0$ を正しい根拠で示し、逆や「全Hol=SU(n)」が無条件には成り立たない例を区別する。 |
| 楕円曲線・トーラス | 正則体積形式・平坦計量・ホロノミー・Hodge数を座標と格子の上で確認し、「HolがちょうどSU(n)」を誤導入しない。 |
| 四次曲面・完全交叉 | Jacobianの全座標判定、複素次元、随伴公式の $d-m-1$、標準束の自明性を計算する。K3のb2とh11には必要な外部定理の明示を伴わせる。 |
| quinticのChern数 | $c_1=0,c_2=10H^2,c_3=-40H^3$、$\int_XH^3=5$、$\chi=-200$ の各係数・符号・次元を再計算する。 |
| quinticのHodge数 | 弱Lefschetzの $b_1=0,b_2=1$ と非零Kähler類の $(1,1)$ 性から $h^{1,1}=1,h^{2,0}=0$ を示す。HOD1のHodge対称性と $h^{3,0}=1$ を使い、$b_3=2+2h^{2,1}$、Euler標数から $h^{2,1}=101$ に至る。未証明の弱Lefschetz／Chern–Gauss–Bonnetは名前と仮定を明記する。 |
| 計量とホロノミー | Kähler類を固定したYau存在・一意性と、Ricci平坦からの**制限**Hol包含を別々に述べる。全Hol包含には平行体積形式、等号にはさらに既約性の議論が必要と示す。 |
| 変形 | $T_X\cong\Omega_X^{n-1}$ の収縮を局所枠で確かめ、$H^1(T_X)$ とHodge数の対応、quinticの126−1−24を導く。無障害性と滑らかなモジュライは未証明入力として分離する。 |

**証明停止線**：CAG1の標準束・随伴公式、KAH1のRicci形式、HOD1のHodge分解は実在する既習定理に接続する。これに対し、弱Lefschetz超平面定理、Chern–Gauss–Bonnetの一般形、Bergerのホロノミー分類、Yauの存在証明、Bogomolov–Tian–Todorov、mirror定理は、本科目の前提から自動的には証明されない。必要な場合は結果の正確な仮定・結論、外部出典、使った箇所、未証明の範囲を本文で読者に分かる形で示す。「外部入力である」ことを主要計算の中間式欠落の免罪符にはしない。

## 演習の骨格（各実装章に原則A4/B3/C1以上・全詳細解答）

- **A：定義と直接例。** $\Omega$ の局所遷移での非消滅、$K_{X_d}$ の係数、平坦トーラスのRicci形式、Jacobianの階数、$c(TX_d)$ の形式的展開、Hodgeダイヤモンドの対称性。
- **B：二段以上の接続。** cubic/quartic/quinticの随伴公式と滑らかさ、四次曲面のEuler・Hodge数、Enriquesのtorsionによる逆含意否定、$b_3$ とEulerから $h^{2,1}$ を解く計算、正則体積形式による $T_X\cong\Omega_X^{n-1}$。
- **C：境界と総合判定。** quinticの $c_3$・Euler・Hodgeの全経路、$K_X$ 自明なのに全Holが真に小さい積・トーラス、実係数 $c_1=0$ から正則体積形式を誤推論する「偽証明」の修正、quinticの101次元の二つの数え方の前提比較。

問題の数字を使い回して数を水増しせず、全learning objectiveを独立に使用させる。全詳細解答は出発点・適用条件・定理の参照・主要中間式・結論を省略しない。用語の初出順、定義例での判定公式との橋渡し、使用箇所のcanonical stable anchorを確認する。

## 標準教科書・公開講義ノートとの照合（2026-11-03）

| 文献・該当範囲 | CYG1へ取り込む骨格 | 証明を後送する境界 |
|---|---|---|
| [Daniel Huybrechts, *Complex Geometry: An Introduction* (Springer, 2005), Kähler Manifolds / Vector Bundles / Deformations of Complex Structures](https://link.springer.com/book/10.1007/b137952) | Kähler・標準束・Chern類→Hodge→変形へ進む導入順、例・演習を通じた概念の確認。 | 既出のCM/KAH/HODを再講義せず、一般変形論は必要な入口に限定。 |
| [Dominic Joyce, *Compact Manifolds with Special Holonomy* (Oxford, 2000), §§5–7](https://academic.oup.com/book/53817) | Calabi予想、Ricci-flat Kähler、$SU(n)$ / $Sp(n)$ のホロノミー、K3の区別。 | 連続性の方法・特殊ホロノミー分類の長い証明はYAU1等へ。 |
| [Mark Gross・Dominic Joyce・Daniel Huybrechts, *Calabi–Yau Manifolds and Related Geometries* (Springer, 2003), Gross「Calabi–Yau Manifolds and Mirror Symmetry」](https://link.springer.com/book/10.1007/978-3-642-19004-9) | 具体例→古典的幾何→複素／Kählerモジュライ→mirrorへの階段を組む。 | 周期構造・mirrorの本格的な計算は独立の発展課題。 |
| [David A. Cox・Sheldon Katz, *Mirror Symmetry and Algebraic Geometry* (AMS, 1999), Ch. 2 / 5 / 6](https://www.ams.org/surv/068) | quintic三次元多様体を一つの計算対象として反復し、Hodge数と変形数を照合する。 | toric mirror・量子コホモロジー・mirror theoremは扱わない。 |
| [Xenia de la Ossa, *Calabi–Yau Manifolds and Mirror Symmetry*（Oxford公開講義ノート）, quinticのEuler・Hodge数計算](https://people.maths.ox.ac.uk/delaossa/LecturesQuad.pdf) | $c_3=-40H^3$、$\chi=-200$、$h^{1,1}=1$、$h^{2,1}=101$ への計算順序を照合。 | 弱Lefschetzを「exerciseだから既証明」と扱わず、外部定理の使用位置を指定。 |
| [Valentino Tosatti / Wenrui Kong, *Notes on Calabi-Yau Manifolds*（公開講義ノート、2024）, §1](https://cims.nyu.edu/~wk805/files/CY_Manifolds_Notes.pdf) | 実係数第一Chern類消滅という定義の流儀と、Yauの定理によるRicci-flat存在の関係を照合。 | Yauの定理の完全証明・a priori estimatesはYAU1へ。 |
| [MIT OCW 18.969, *Topics in Geometry: Mirror Symmetry*, lecture 2 (2009)](https://ocw.mit.edu/courses/18-969-topics-in-geometry-mirror-symmetry-spring-2009/42040c1f577d7178b66e4d6e3fbd12f4_MIT18_969s09_lec02.pdf) | 一次変形と無障害性（Bogomolov–Tian–Todorov）を**別の段階の主張**として扱う。 | 無障害性の深い証明は本講へ逆輸入しない。 |

照合は**章立て・定理の適用条件・計算の検算**に限り、文献の本文・図・演習を転載しない。書籍の全ページ・全証明を通読したという記録ではない。実装時は定理番号・仮定・正規化を対象原文へ戻って再照合する。

## 着手・査読・完成条件

1. 正式着手時に仮ID、予定章と `textbook/dream-theater-series/` の衝突を調べ、CYG1系列manifestと章別 `chapter.yaml` / `knowledge.yaml` を実装進行に合わせて作る。PLAN固有の実装・検証・監査が始まった時点でのみ `plans_progress/` へ**移動**し、直接のplan参照と同期する。
2. 各章のprerequisiteは必要な**実在章**に絞る。CAG1・KAH1・HOD1の結果は使う文脈の結果名から実在stable anchorへリンクする。弱Lefschetz・全Chern類・変形論のownerと未証明補題を個別に棚卸しする。
3. 初出定義の前に動機・通常文による導入を置き、判定式が定義の各条件にどう対応するかを直接例で示す。各章に教育的に必要な演習を置き、A4/B3/C1を下限として全問の詳細解答を用意する。
4. 新規執筆章は現行[執筆基準](../DREAM_THEATER_AUTHORING_STANDARD.md)区分Cの**全主要証明・全演習解答の自己再計算と別観点再読**を実施し、証拠・未確認事項をPRに残す。同一担当者による別観点再読を第三者独立査読と称さない。**別の完成章の追跡監査はユーザーが章IDを指定した場合のみ**行う。
5. 系列の最終完了は全objective、証明／外部入力の境界、quinticの数値経路、定義間の逆含意、概念owner、全演習、manifest・公開目次・stable link・CIを横断監査した後だけ `plan_done/` へ移す。計画の推敲だけで「着手済み」「completed」と記録しない。
