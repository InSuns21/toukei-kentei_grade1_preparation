# DREAM THEATER 幾何解析 計画

作成日: 2026-10-04
改訂日: 2026-10-14（標準教科書と既存VAR/GEO/GPDEを照合して証明・依存関係を再設計）
状態: planned（PLAN設計改訂のみ。新規本文・系列manifestは未実装）

## 0. 中心問いと本科目の境界

Euclid空間で構成したSobolev空間・楕円型弱解・熱方程式を、曲がったRiemann多様体へどう移すか。そこから**幾何が作用素のスペクトル・熱伝導・調和形式・非線形変分問題にどう現れるか**を追う。

「多様体版PDE」の記号置換にとどめず、
- 計量・体積・接続が局所座標式へどこに入るか、
- compactnessと境界条件の違いが解の存在・一意性・保存則へどう効くか、
- Ricci曲率が解析的評価を生み、解析解が位相・幾何の情報を運ぶのはなぜか、
- 対象を「多様体値の写像」へ変えると線形理論のどこが壊れるか、
を独習者が主要計算と核心証明で再構成できる科目にする。

旧計画の5講構成から、スペクトル・熱核・Bochner・非線形解析を適切に分離した **GA1--GA9（全9講、欠番・枝番なし）** へ再編する。番号は仮IDであり、9週・9回授業という時間割は強制しない。既存の GA1 が確率解析 II のPLANから参照されるため、GA1の責務・IDを維持する。

## 0.1 標準的教科書との比較（2026-10-14）

出版社が公開する目次・内容説明を主たる照合根拠とする。目次の転写ではなく、既存DREAM THEATERの知識正本・証明責務に再配置する。

| 教科書 | 確認した主題 | 本科目での採用・切り分け |
|---|---|---|
| Jürgen Jost, *Riemannian Geometry and Geometric Analysis*, 7th ed., Springer | Laplace作用素と調和形式、曲率・接続、harmonic maps、熱流・変分 | **GA6 Hodge・GA7 Bochner・GA8 harmonic maps**を中核に。GEO/VAR既存定理は再所有しない |
| Steven Rosenberg, *The Laplacian on a Riemannian Manifold*, Cambridge | Hodge定理、Weitzenböck、熱核の構成と漸近 | Hodgeとscalar Laplaceの符号・領域を分離。熱核の存在・正値性・保存性・漸近を別論点に |
| Alexander Grigor'yan, *Heat Kernel and Analysis on Manifolds*, AMS/IP | $L^2$作用素、最大値原理、熱核、スペクトル、完備性、Gaussian評価 | **GA3・GA4・GA5**を分離。非コンパクトをcompactと混同しない |
| Emmanuel Hebey, *Nonlinear Analysis on Manifolds: Sobolev Spaces and Inequalities*, AMS | 多様体Sobolev、境界・非コンパクト、臨界指数・最良定数 | GA2の貼り合わせと定数依存、GA9のcritical問題へ接続 |
| Isaac Chavel, *Eigenvalues in Riemannian Geometry*, Academic Press | Laplace固有値、曲率、不等式、熱核 | Rayleigh商・固有値・曲率下界の解析的意味を GA4/GA7 に取り込む |
| Michael E. Taylor, *Partial Differential Equations III: Nonlinear Equations*, Springer | 調和写像・極小曲面・幾何由来の非線形PDE | GA8/GA9の局所化・非線形性を校正。既存VAR7/8の変分公式は参照する |

確認先:
- https://link.springer.com/book/10.1007/978-3-319-61860-9
- https://www.cambridge.org/core/books/the-laplacian-on-a-riemannian-manifold/56F18C2AB0A765A91892E164079A3B74
- https://bookstore.ams.org/view?ProductCode=AMSIP%2F47
- https://books.google.com/books/about/Nonlinear_Analysis_on_Manifolds_Sobolev.html?id=fsyFAwAAQBAJ
- https://shop.elsevier.com/books/eigenvalues-in-riemannian-geometry/chavel/978-0-12-170640-1
- https://link.springer.com/book/10.1007/978-1-4419-7049-7

**主要な改訂判断**:
1. 旧GA3は楕円型・熱方程式・熱核・スペクトルを一章に詰め込んでいたため、GA3/GA4/GA5へ分離。
2. 旧5講案のGA4はHodge分解の証明と、曲率が消滅定理へ現れるBochner型評価を欠いたため、現GA7を設ける。
3. GA8後続の幾何学的非線形方程式の比較対象・臨界性をGA9に限定的に追加。
4. VAR系列がすでに極小曲面の第一・第二変分を担当しているため、幾何解析ではその導出を別のcanonical theoremとして重複登録しない。

## 1. canonical ownerと前提

| 領域 | 正本 | GA側の責務 |
|---|---|---|
| 滑らかな多様体・接束・微分形式・積分・1の分割 | GEO1--GEO8の該当章 | 既習結果を使って解析作用素を構成 |
| Riemann計量・Levi-Civita接続・測地線・曲率 | GEO12--GEO17の該当章 | 計量・接続・Ricciの具体成分を用いる |
| Euclid Sobolev・Rellich・楕円弱形式・正則性 | GPDE3--GPDE9の該当章 | chartでの一様比較、局所化、貼り合わせの新しい証明 |
| 変分の直接法・Tonelli / minimax | VAR9--VAR12（執筆時に実装済み章・anchorを確認） | 存在論を必要時のみ援用。VAR未執筆定理は既知としない |
| 極小曲面の第一/第二変分、Jacobi作用素、安定性 | VAR7--VAR8（系列manifestで完成状況を確認） | 幾何PDEとしての弱形式・正則性・線形化に重点 |
| Laplace--Beltramiの幾何定義、manifold Sobolev、Hodge・熱核、harmonic mapの解析 | **本GA計画** | 各章の証明正本 |
| stochastic development・Brown運動・確率熱核 | 確率解析 II（SGA） | deterministic semigroupの結果をSGAに提供 |
| 一般非線形拡散、完全な幾何学的流れ | NPDE / 将来の専用計画 | 既習の幾何PDEからの出口に限定 |
| Euclid GMT・有限周長・currents/varifolds | GMT計画 | 幾何解析をGMTの同義科目にしない |

前提は**GEO全部・GPDE全部を無条件に要求しない**。個々の定理が使用するGEO章（Hodge star、Ricci、de Rham、boundary orientation等）、GPDE章（Lax--Milgram、trace、interior regularity等）を章執筆時に実在結果・stable anchorへ紐付ける。未整備の結果はGA側で必要範囲を構成するか、前提側の実装が完了するまで「未実装」と明記する。

## 2. 全科目で固定する仮定・記法

基本モデルは**滑らかな、連結な、コンパクトで境界のない $d$ 次元Riemann多様体 $(M,g)$**。断らなければ $d\ge2$、$d=1$ の例は別扱い。境界付き、非コンパクト、完備のみの場合は章ごとに明記して一般化する。

符号規約を先に固定する:
- scalar $\Delta_g=\operatorname{div}_g\nabla_g$ は compact 境界なし上の $L^2$ で**非正**、$L_g=-\Delta_g\ge0$。
- 熱半群は $e^{t\Delta_g}=e^{-tL_g}$。熱方程式は $\partial_t u=\Delta_g u$。
- Hodge Laplacian $\Delta_H=dd^*+d^*d\ge0$ は微分形式に作用し、$0$-形式上では $\Delta_H=-\Delta_g$。
- 境界ありでは外向き単位法線 $\nu$ とDirichlet/Neumann条件を必ず指定し、Greenの境界項と領域(domain)を省略しない。

式の正規化・曲率の符号はGEOの既存正本と照合し、不一致なら定義から変換を説明する。コンパクトさだけで境界なし・連結性を推定しない。

## 3. 講義群（仮ID）

### GA1 Laplace--Beltrami・Green公式・弱形式

中心問い: 計量はなぜ「曲がった空間のLaplacian」を決めるか。

- $\nabla_g u$、$\operatorname{div}_g X$、体積密度 $dV_g$ と局所座標表示
- $\Delta_g u=|g|^{-1/2}\partial_i(|g|^{1/2}g^{ij}\partial_j u)$ を定義から導出
- Green第一・第二公式、外向き法線項、$\int|\nabla u|^2$ と弱形式
- $S^1$・$S^2$・平坦トーラスで具体計算。曲面埋め込みの座標の選択を明示
- 境界なしでは $\int_M(-\Delta_g u)\,dV_g=0$、Neumannの可解性条件がどこから来るか

確率解析IIの SGA3 はこの章が実装されるまでは未証明のGA1定理を既知として使用しない。

### GA2 多様体Sobolev空間・貼り合わせ・コンパクト性

- coordinate charts・有限subordinate partition of unityで $W^{k,p}(M)$ を構成
- 座標交換のchain ruleと計量/体積Jacobianの上下界によるnorm equivalence
- compact境界なし上のSobolev embedding・Rellichの必要な範囲、平均零Poincaré
- Hilbert弱収束、$H^1(M)$・traceが必要なときのboundary charts
- $M$が非コンパクトならglobal Poincaré/Rellich・有限atlasが自動では成立しない反例を置く
- 多様体上の局所ノルムと共変微分によるノルムの比較を具体例で示す

核心証明は「局所化→Euclid定理の適用条件→一様定数→有限和→global」を省略しない。

### GA3 楕円型方程式・弱解・最大値原理

- compact境界なしの $-\Delta_g u=f$ では $\int_M f=0$ が必要、解は定数の違いまで一意
- 平均零 $H^1$ 上のcoercivityとLax--Milgram、Poincaréで可解性を証明
- $-\Delta_g+\lambda$（$\lambda>0$）とPoisson問題の比較
- elliptic regularityのchart上の局所化と滑らかな係数の正則性。境界正則性を無条件に一般化しない
- 弱/強最大値原理の採用版を仮定込みで証明。境界なし調和関数の定数性
- Dirichlet/Neumannの違いと反例（compatibilityを欠く例）

### GA4 Laplace作用素のスペクトル理論

- 平均零部分と定数固有空間、$L_g=-\Delta_g$ の弱形式・非負自己共役実現
- compact埋め込みからのcompact resolvent、離散固有値と正規直交固有関数
- Rayleigh quotient、min--maxの採用版、$\lambda_1>0$ とPoincaré不等式の対応
- 円・平坦トーラス・球面で低次固有値の確認（球面調和関数の必要基礎を明示）
- Weyl漸近公式・完全な固有関数 $L^p$ 評価は停止線。主張するなら定理としての証明責務を別途定義

### GA5 熱方程式・熱半群・熱核

- $e^{-tL_g}$ と固有関数展開による解の構成、$t>0$ での平滑化
- 熱核 $p_t(x,y)$ の存在・対称性・滑らかさ・半群性・正値性・質量保存の各論理を区別
- compact連結境界なし上の長時間極限 $p_t(x,y)\to1/\mathrm{Vol}(M)$ とスペクトルギャップ
- 平坦トーラスのFourier級数熱核とperiodized Gaussianを照合
- 短時間での局所Gaussian像と測地距離。構成する採用版の短時間評価と、詳細なparametrix全展開を区別
- **非コンパクト完備だけでは質量保存を無条件に主張しない**。stochastic completenessに別条件が必要な場合がある
- SGA側のtransition densityとの一致は生成作用素・正規化・一意性を確認して接続する

### GA6 Hodge Laplacian・調和形式・de Rham

- Hodge star / codifferential $d^*$ / $\Delta_H$ の定義、境界条件なしの場合の形式的随伴と実際の作用素領域
- $L^2$ 内積と $\langle\Delta_H\omega,\omega\rangle=\|d\omega\|^2+\|d^*\omega\|^2$
- harmonic / exact / coexact の直交分解と有限次元性
- Hodge theorem のde Rham cohomologyとの同型を、楕円正則性と直交分解の補題から閉じる
- 円・トーラス・球面で次数別の調和形式の例と、Betti数への橋
- 非コンパクト・境界ありの $L^2$ Hodge分解を同じ定理文で主張しない

### GA7 Bochner--Weitzenböck公式・曲率と解析

- scalar Bochner identity（上記の $\Delta_g$ 規約）
  $\frac12\Delta_g|\nabla u|^2=|\nabla^2u|^2+\langle\nabla u,\nabla\Delta_g u\rangle+\mathrm{Ric}(\nabla u,\nabla u)$
- 正規直交標構と接続交換公式から、Ricci項が現れる中間計算を省略せず導く
- 1-形式上のWeitzenböck公式（$\Delta_H=\nabla^*\nabla+\mathrm{Ric}$）の採用版と符号整合
- Ricci正値のとき調和1-形式が消えるBochnerの消滅定理。非負だけの場合との違い
- 適切な曲率下界のもとでの第一固有値評価（例: $\mathrm{Ric}\ge(d-1)K\,g$, $K>0$ なら $\lambda_1\ge dK$）の証明責務を固定
- complete非コンパクトへの積分公式の無条件拡張を避け、cutoff・境界項・可積分性を必要に応じて明示

### GA8 調和写像・非線形幾何変分

- 滑らかな写像 $u:(M,g)\to(N,h)$、エネルギー、pullback connection、tension field $\tau(u)$
- 第一変分から $\tau(u)=0$ を導く。既存VARの変分一般論へ正本リンクし、写像値の共変微分はGAで具体化
- 球面値制約 $|u|=1$ から $\Delta_g u+|du|_g^2u=0$（Euclid空間への標準埋込み）を導く
- $W^{1,2}(M,N)$ の意味、weak harmonic mapの試験変分、target constraintの保持
- domain dimensionが2のときのエネルギーのスケールと高次元での違い。弱調和写像の滑らかさを無条件に宣言しない
- harmonic map heat flowは滑らかな解に対するエネルギー散逸の計算を入口にし、一般存在/特異性理論は境界外

### GA9 幾何的非線形楕円PDEと臨界現象

- minimal graph equation・平均曲率方程式を**VAR7/VAR8の面積変分・第二変分**から受け取り、線形化・一様楕円性の成立範囲・境界条件を解析する
- 楕円方程式での係数が未知関数/勾配に依存することと、線形弱解理論をそのまま適用できない理由
- Sobolev critical exponent $2^*=2d/(d-2)$（$d\ge3$）のscaling、critical embeddingがcompactでない集中列の例
- Yamabe型問題は conformal Laplacian とscalar curvature方程式の入口に限定し、Yamabe問題の完全解決をここで無証明に仮定しない
- 幾何学的流れ（mean curvature flow・Ricci flow）は、対象量と放物型性・ゲージ/座標の問題を示す出口。一般短時間存在や特異性分類の完全理論は別PLAN
- 本章の主要証明は minimal graph equationの楕円性判定、critical scalingと集中の具体計算まで閉じる。全面的非線形PDE理論を一章に押し込まない

## 4. 順序と章ごとの依存

~~~text
GEO（計量・接続・曲率） + GPDE（Sobolev・弱PDE）
                      │
                    GA1
                      ↓
                    GA2
                      ↓
                    GA3
                      ↓
                    GA4
                      ↓
                    GA5 ───────→ SGA（確率的熱核）
                      │
                    GA6
                      ↓
                    GA7
                      │
                    GA8 ────────→ GA9（VAR7/8も参照）
~~~

この図は読順であり、全章に全先行章のprerequisiteを積み上げない。例えばGA6の微分形式はGEO7とGA2/GA4で構成でき、GA5の熱核を前提にせずHodge定理を証明する選択肢もある。実装時のproof choiceに応じて必要最小の依存だけを登録する。

## 5. 境界・非コンパクト・符号をまたぐ重点監査

章を横断する次の混同を人手で確認する。

| 問い | compact連結・境界なし | 境界あり/非コンパクトに変えたとき |
|---|---|---|
| $\Delta_g u=f$ の可解性 | 平均零と定数核が障害 | Dirichlet/Neumann/無限遠条件、Fredholm性が変わる |
| Poincaré / Rellich | 平均零・有限atlasで制御 | global版には別仮定が必要 |
| 熱核の積分 | 保存性が成立 | stochastic completenessは自動でない |
| 調和関数 | 最大値原理で定数 | 非有界調和関数がありうる |
| Hodge分解 | compact境界なし版 | 絶対/相対境界条件や閉値域が問題になる |
| Bochner積分 | 境界項なし | cutoff・減衰・境界項が要る |
| harmonic maps | smooth/weakの違いを明示 | 次元・エネルギー・target曲率が正則性を左右する |

特に「Hodge Laplacianとscalar Laplaceが同符号」「完備なら熱半群が必ず保守的」「弱調和写像は常に滑らか」という誤った短絡を防ぐ。

## 6. 既存科目との参照・停止線

- GEO15/17 の測地線最小性・Jacobi場はVARおよびGEOが正本。GA7ではBochner評価のために曲率公式を使用するが、幾何学一般論を再証明しない。
- VAR7/8 は曲面積の第一/第二変分の正本。GA9はその結果に続く楕円性・弱形式・解析的挙動を担当する。
- GPDE3--9の Euclid 弱形式/正則性の「局所化に必要な具体条件」を検証して援用する。一般PDEの証明を全篇複製しない。
- SGA3/SGA9 はLaplace--Beltrami・熱核に対応する確率過程を扱う。GA1/GA5の決定論的結果の未実装状態に注意する。
- HA のEuclid CZ / Littlewood--Paley理論はGAで必要な場合のみ direct prerequisite。HA全講を多様体PDEの必須条件にしない。
- Ricci flow、mean curvature flow、Yamabe問題、極小曲面の完全な高次正則性、index theory、Yang--Mills、sub-Riemannian解析、general noncompact heat-kernel Gaussian bound、幾何学的測度論は**体系的な完全理論にしない**。新たな独立成果物が必要なら別PLANとする。

## 7. 証明・例・演習の設計

理由付き例外がない限り各新設・変更章に Level A 4題 / Level B 3題 / Level C 1題**以上**、全問に紙上再現できる詳細解答をつける。

最低限の練習題材:
- $S^1$、$S^2$、トーラスでの局所座標Laplacianと符号
- Green公式・Neumann適合条件を直接積分
- partition of unityとJacobianを用いるSobolevノルム比較
- compact resolvent→固有関数展開とRayleigh商の検算
- flat torusの熱核と保守性・長時間極限
- トーラスの調和形式とde Rham cohomologyの次数別照合
- scalar Bochner公式と正Ricciによる消滅、$\lambda_1$下界の指数計算
- 球面値写像の許容変分から張力場/制約項
- minimal graphの線形化とcritical Sobolev集中列

証明は「局所座標で同様」「楕円正則性より」の一行で終えず、係数の上下界・Jacobian・作用素領域・境界項・符号・接続の交換・使用するGPDE/FAの具体定理を明示する。principal resultは独習者がcanonical dependencyのみで核心を追えるよう設計する。

## 8. 完了条件

1. Laplace--BeltramiとGreen公式を定義から導き、$S^1$・$S^2$・torusで検算できる。
2. 多様体Sobolev空間を有限atlasで作り、norm equivalence・Rellich・Poincaréの仮定を述べられる。
3. compact境界なしPoisson問題の可解性障害、平均零での存在、一意性、正則性の証明が閉じる。
4. compact resolventから固有関数・Rayleigh商を導出し、熱半群・熱核の存在と各性質を区別できる。
5. Hodge分解とde Rhamの同型の主要論証、Bochner--Weitzenböckの曲率項、消滅・固有値評価を再現できる。
6. 調和写像の張力場・球面値制約を第一変分から導け、弱解と滑らかな解・高次元特異性を混同しない。
7. minimal graphとcritical Sobolevを具体計算し、VAR/GMT/NPDE/SGA側の正本・停止線を守る。
8. 各章の仮定・proof dependency・stable anchor、演習・詳細解答、数学的再査読、CI・公開索引・系列manifestの整合が完了した段階でのみPLANをdoneへ移す。