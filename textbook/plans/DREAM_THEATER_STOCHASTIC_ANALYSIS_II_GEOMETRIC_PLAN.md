# DREAM THEATER 確率解析 II — 多様体・Lie 群上の確率解析 コース計画

作成日: 2026-10-03  
改訂日: 2026-11-11（標準教科書の目次・射程と現行 STO / GEO / LIE / GA を照合し講義構成を確定）  
状態: planned（講義本文の実装は未着手）  
**確定講数: 全18講、SGA1--SGA18（欠番・枝番なし）**

## 0. 科目の中心問いと完成範囲

Euclid 空間上の確率解析（STO）の成果を、座標に依存しない多様体・Lie 群・Riemann 幾何へどう運び、拡散の生成作用素、熱核、曲率、Hörmander 型の滑らかさをどう結び付けるか。

本計画は確率解析 I（STO4--STO12）、微分幾何（GEO）、Lie 理論（LIE）、幾何解析（GA）との**発展交差科目**である。確率積分・Euclid SDE・Laplace--Beltrami 作用素・決定論的熱核を最初から再構成しない。

必須到達目標は次の通り。

1. 多様体値半マルチンゲールと Stratonovich SDE を局所座標から定義し、座標変換・局所存在一意性・爆発時刻を検算する。
2. Lie 群上の不変 SDE、直交枠束上の水平 SDE、確率展開・反展開によって Brown 運動を構成する。
3. 接続に沿う確率平行移動、共変マルチンゲール、1-形式の確率線積分を実計算する。
4. 遷移半群・熱核・確率完備性を決定論的 GA5 と接続し、曲率が拡散と勾配評価へ与える影響を理解する。
5. 劣リーマン分布・Lie 括弧生成条件を Heisenberg 型の例で判定する。
6. Wiener 空間上の Malliavin 微分・発散作用素・Sobolev 空間を構成し、SDE の感度・Malliavin 共分散・密度判定へ進む。
7. Norris 型の定量的評価を証明してから、適切な有界性・滑らかさ・一様括弧生成仮定の下で Hörmander 型の滑らかな密度定理の核心を閉じる。
8. 多様体上の Brown 経路空間へ戻り、確率展開と減衰平行移動から経路空間の微分・部分積分を導く。

**18講は内容単位の確定であり、18週・各90分等の時間割ではない。** 各講の主要定理・例・A4/B3/C1以上の演習と詳細解答が独習者に閉じることを優先する。本文実装時に章IDと前提の実在を照合するが、講数増減は PLAN の明示改訂を要する。

## 1. 教科書との照合と設計判断

公開された出版社・版元の目次、著者公開講義資料、書誌説明を照合した。章立てを移植するのではなく、既存 DREAM THEATER の canonical owner と学習者の証明責務に再配置する。

| 文献・確認元 | 確認した中心領域 | 本 PLAN での採用・境界 |
|---|---|---|
| 谷口説男『確率幾何解析』（朝倉書店、2021）、[版元登録目次](https://www.hanmoto.com/bd/isbn/9784254118353) | 多様体・Lie 群 SDE、sub-Riemann 拡散、確率線積分、Malliavin 解析、熱核。確率振動積分・KdV も収録 | SGA1--SGA3・SGA7・SGA10--SGA16 に反映。確率振動積分・KdV は独立した発展枝 |
| Elton P. Hsu, *Stochastic Analysis on Manifolds*（AMS、2002）、[書誌](https://www.ams.org/books/gsm/038/) | 水平持ち上げ、確率展開、Brown 運動、熱半群、曲率、経路空間 | SGA4--SGA6・SGA8--SGA9・SGA17--SGA18。特に曲率と拡散の接点を独立講に |
| Michel Émery, *Stochastic Calculus in Manifolds*（Springer、1989）、[出版社目次](https://link.springer.com/book/10.1007/978-3-642-75051-9) | 多様体値半マルチンゲール、共変マルチンゲール、二階の幾何、1-形式の積分、平行移動 | SGA1・SGA6・SGA7 に分離。Schwartz--Meyer の二階接束一般論は必修にしない |
| David Nualart, *The Malliavin Calculus and Related Topics*, 2nd ed.（Springer、2006）、[出版社目次](https://link.springer.com/book/10.1007/3-540-28329-3) | Wiener 空間解析、密度の正則性、非適合積分、Wiener 測度の変換 | 微分・発散（SGA11--SGA12）、感度・密度（SGA13--SGA14）、定量非退化・Hörmander（SGA15--SGA16）を区別 |
| Fabrice Baudoin, *Diffusion Processes and Stochastic Calculus*（EMS、2014）、[出版社目次](https://ems.press/books/etb/196/contents) | Markov 過程、対称拡散半群、Itô 解析、SDE と Malliavin 解析、rough paths | SGA8 の半群橋渡しと SGA11--SGA14 を補強。rough paths は別 PLAN とする |

照合して修正した主な点:

- 旧10講案では **直交枠束の構成・Brown 運動の解析、平行移動・線積分、Malliavin 微分・密度判定・Norris 評価** がそれぞれ過密だったため分離する。
- Hsu の主要な柱である **曲率と Brown 運動の関係**を独立講にする。ただし GA7 の Bochner 公式と幾何学的導出を重複しない。
- 「Hörmander 条件を紹介する」だけでなく、**定量的共分散評価（Norris 型補題）と滑らか密度定理の証明**を別講で完結させる。
- 谷口本の確率振動積分・KdV は重要な独立領域だが、本科目の連続拡散・確率微分幾何という中心問いを超えるため必須18講へ水増しせず発展 PLAN 候補に留める。
- GA1 と GA5 はすでに完成している。SGA で Laplace--Beltrami・熱核の決定論的正本を再実装しない。

## 2. ID・状態・前提の管理

- 公開科目名: **確率解析 II — 多様体・Lie 群上の確率解析**（初出で「確率幾何解析」を補助名として併記可）。
- 章 ID: **SGA1--SGA18**。SGA は管理 ID であり、学習者への説明語彙ではない。
- 本 PLAN は設計改訂のみなので **textbook/plans/** に留める。SGA 系列 manifest は未作成・本文未実装であり、設計段階で completed を登録しない。講義に着手するときに系列 manifest を作り、正規の状態遷移で plans_progress へ移す。
- 既存結果の具体的参照と stable anchor は講義着手時に current main で確認する。実際の chapter.yaml / knowledge.yaml には本当に用いる最小 prerequisite だけ登録する。

### 前提の核

| 領域 | canonical owner と使い方 |
|---|---|
| 確率解析 | STO4（Brown 運動・Wiener 測度）、STO5--STO7（二次変分・Itô・Stratonovich）、STO9（SDE・局所化）、STO11（半群・生成作用素）、必要な箇所で STO10 / STO12 |
| 微分幾何 | GEO1--GEO3（多様体・接空間・部分多様体）、GEO5--GEO7（ベクトル場・Lie 括弧・分布・微分形式）、GEO12--GEO16（Riemann 計量・接続・測地線・完備性・曲率）を講ごとに限定 |
| Lie 理論 | LIE1--LIE4。不変ベクトル場・指数写像・Maurer--Cartan を SGA3 で用いる。一般の Riemann 多様体章に LIE4 を一律要求しない |
| 幾何解析 | [GA1](../volumes/dream_thater/幾何系/GA/GA1/index.md)（Laplace--Beltrami・Green 公式）、[GA5](../volumes/dream_thater/幾何系/GA/GA5/index.md)（熱半群・熱核）、GA7（Bochner / Ricci 評価）の既存結果を使用 |
| 関数解析・PDE | Hilbert 空間・閉作用素・Sobolev の必要結果に限定し、既存 FA / GPDE / GA などの canonical anchor に接続する。完全な無限次元幾何一般論は前提にしない |

STO13--STO14 の跳躍解析、GEO の全章通読、GA の全講を一律 prerequisite にしない。compact / noncompact、complete / stochastically complete、有界係数 / 局所係数は主張ごとに明示する。

## 3. 確定した18講と学習順

| 講 | 主題・中心問い | 核心的な成果物 |
|---|---|---|
| **SGA1** | 多様体値半マルチンゲールと Stratonovich 連鎖律 | chart 間の変換、Itô の二階補正 |
| **SGA2** | 多様体上の SDE の構成・爆発時刻 | 局所解の貼り合わせ、部分多様体の不変性 |
| **SGA3** | Lie 群上の SDE・確率指数 | 不変ベクトル場、生成作用素、群制約保存 |
| **SGA4** | 直交枠束・水平持ち上げ・確率展開 | 接続から水平 SDE、展開・反展開 |
| **SGA5** | Riemann 多様体上の Brown 運動 | 射影の生成作用素が $\frac12\Delta$ になる導出 |
| **SGA6** | 確率平行移動・共変マルチンゲール | 計量保存と接続によるマルチンゲール判定 |
| **SGA7** | 微分形式の確率線積分 | 1-形式の座標不変な積分と exact 形式の端点公式 |
| **SGA8** | 拡散半群・熱核・確率完備性 | 遷移核と GA5 の熱核、質量保存・非爆発の区別 |
| **SGA9** | 曲率と Brown 運動の勾配評価 | 確率平行移動・Ricci 曲率・半群勾配の接続 |
| **SGA10** | 劣リーマン幾何と退化拡散 | Heisenberg 分布、括弧生成と劣 Laplace 作用素 |
| **SGA11** | Wiener 空間上の微分 | Cameron--Martin 空間、円筒関数、Malliavin 微分 |
| **SGA12** | 発散作用素・Wiener Sobolev 空間 | 部分積分、closability、Skorokhod 積分 |
| **SGA13** | 確率流と SDE の Malliavin 感度 | Jacobian flow、$D_sX_t$ の変分方程式 |
| **SGA14** | Malliavin 共分散と密度判定 | 共分散行列、密度存在と滑らかさの条件の区別 |
| **SGA15** | Lie 括弧伝播と Norris 型補題 | reduced covariance、定量的非退化性の核心評価 |
| **SGA16** | Hörmander 型滑らかな密度定理 | inverse moment、反復部分積分、定理と具体例 |
| **SGA17** | 多様体上の Brown 経路空間と接ベクトル | 確率展開、Bismut 型接方向、減衰平行移動 |
| **SGA18** | 経路空間の部分積分・Dirichlet 形式 | 経路空間勾配・発散・Ornstein--Uhlenbeck 型作用素 |

必須の依存線は **SGA1→2→3、SGA2→4→5→6→7、SGA5→8→9、SGA3+SGA7→10、STO4+SGA2→11→12→13→14→15→16、SGA4+SGA6+SGA12→17→18** を基本とする。SGA8 と SGA10 の相互依存、SGA9 と SGA11 の相互依存は置かない。

### 3.1 第I部：多様体と Lie 群の確率力学（SGA1--SGA3）

**SGA1 — 多様体値半マルチンゲールと Stratonovich 連鎖律**

- $f(X)$ が局所半マルチンゲールであるという test function 定義と、chart による判定を照合する。
- ベクトル場係数の Stratonovich SDE を局所座標で表し、$y=\Phi(x)$ への chain rule を成分ごとに計算する。
- Itô drift に現れる Hessian 項を同じ座標変換で比較する。
- 例: $S^1$ の角度座標と埋め込み座標、非線形座標変換の二階補正。
- **証明ゲート**: pushforward の各係数と二次変分の補正を示し、「Stratonovich だから不変」で省略しない。

**SGA2 — 多様体上の SDE の構成・爆発時刻**

- 局所 Lipschitz・滑らかさ仮定の下で chart の Euclid SDE を停止時刻まで解き、一意性を使って重なる chart で貼り合わせる。
- 極大解・爆発時刻、compact な場合の非爆発、complete でも一般の任意ベクトル場 SDE は非爆発とは限らないことを区別する。
- 接ベクトル場による埋め込み部分多様体の保存を Stratonovich 連鎖律から導く。
- 例: 球面上の接ベクトル場駆動 SDE と制約関数の保存。
- **証明ゲート**: 停止・貼り合わせ・解の一意性の順を確定し、局所解と大域解の混同を禁止する。

**SGA3 — Lie 群上の SDE・確率指数**

- 左／右不変ベクトル場、群積の微分、左 Maurer--Cartan 形式を用いて Lie 環駆動の確率指数・確率対数の向きを確定する。
- $L=V_0+\frac12\sum_i V_i^2$ を Itô 公式から導く。コンパクト群の Haar 測度との関係を扱い、非コンパクト群の左右不変性を自動的に同一視しない。
- 例: $SO(2)$ の角度 SDE、行列積の Stratonovich 微分、$SO(3)$、Heisenberg 群。
- **証明ゲート**: 行列群の保存制約と左・右の符号・乗算側を実際に計算する。

### 3.2 第II部：枠束・Brown 運動・微分形式（SGA4--SGA7）

**SGA4 — 直交枠束・水平持ち上げ・確率展開**

- 枠 $u:\mathbb R^d\to T_xM$、枠束・直交枠束、接続による水平部分空間、水平標準ベクトル場を定義例から構成する。
- 水平 Stratonovich SDE の局所形、確率展開と反展開の相互対応（初期枠固定・爆発時刻まで）を扱う。
- 例: 平坦トーラスと曲面の局所枠、Euclid 空間への退化。
- **証明ゲート**: 接続形式と Christoffel 記号から水平性の式を導き、射影と反展開を確認する。

**SGA5 — Riemann 多様体上の Brown 運動**

- $\frac12\Delta$ の martingale problem として Brown 運動を特徴付け、SGA4 の水平 Brown SDE の射影で構成する。
- 正規座標・局所直交枠で二階作用素を導く。非コンパクトでは爆発時刻までとする。
- 例: $S^1$、$S^2$、平坦トーラス。埋め込み球面で Itô drift に現れる法線補正を検算する。
- **証明ゲート**: 水平ベクトル場の二乗和から $\Delta$ を得る中間式を省かない。GA1 の符号規約へ合わせる。

**SGA6 — 確率平行移動・共変マルチンゲール**

- 半マルチンゲール曲線に沿う共変 Stratonovich 微分と確率平行移動を、枠束の水平性から定義する。
- Levi-Civita 計量両立性による等長性、接続に依存する多様体値マルチンゲールの判定を扱う。
- 例: $S^2$ の局所平行移動、Euclid における定数枠、曲線上の1ベクトルの長さ保存。
- **証明ゲート**: 接続係数・共変 Itô drift 補正を追い、通常の座標別局所マルチンゲールとの違いを明示する。

**SGA7 — 微分形式の確率線積分**

- $1$-形式 $\alpha$ の $\int\alpha\circ dX$ を chart 間で貼り合わせ、共変 Itô 版との補正を示す。
- $\alpha=df$ の端点公式と積分の合成則、holonomy への入口を扱う。微分形式の決定論的定義は GEO7 を使う。
- 例: $S^1$ の角度形式の局所表示と winding、exact 形式の積分、Heisenberg 水平方向の線積分。
- **証明ゲート**: 原始関数のない閉形式と exact 形式を区別し、局所／大域の結論を混ぜない。

### 3.3 第III部：熱核・曲率・退化拡散（SGA8--SGA10）

**SGA8 — 拡散半群・熱核・確率完備性**

- $P_tf(x)=\mathbb E_x[f(X_t);t<\zeta]$ と遷移確率、生成作用素、Dynkin 公式、後退熱方程式、Chapman--Kolmogorov を接続する。
- GA5 の熱核（決定論的な存在・正則性）と、確率的遷移密度としての同定を仮定を明示して行う。
- $P_t1=1$、非爆発、stochastic completeness の同値を同じ設定で示し、測地的完備性との相違を説明する。
- compact な場合の Feynman--Kac、非compact な場合の最小熱核・質量損失を区別する。
- **証明ゲート**: test function・初期値・境界／無限遠条件と期待値交換の条件を明記する。

**SGA9 — 曲率と Brown 運動の勾配評価**

- 確率平行移動で異なる接空間を比較し、Ricci 曲率が減衰平行移動の方程式へどう現れるかを導く。
- compact Riemann 多様体など境界・爆発の障害がない設定で、GA7 の Bochner 公式から熱半群の勾配評価を導き、確率的解釈と照合する。
- 例: 平坦トーラス、球面、負曲率の局所例。曲率下界と確率完備性の一般定理は条件なしに主張しない。
- **証明ゲート**: $P_t|\nabla f|^2-|\nabla P_t f|^2$ の符号と $\frac12\Delta$ の係数、Ricci の符号を検算する。

**SGA10 — 劣リーマン幾何と退化拡散**

- 水平分布 $H\subset TM$、水平計量、水平曲線、Carnot--Carathéodory 距離と bracket-generating 条件を区別して導入する。
- $L=\frac12\sum_i X_i^2+X_0$ の主記号が退化しても Lie 括弧が方向を増やす仕組みを示す。
- 例: Heisenberg 群の $[X,Y]$ を手計算し接空間の span を検証する。Kolmogorov 拡散との違いを示す。
- Chow--Rashevsky の一般証明・sub-Riemann 幾何の大系は必修外。必要な到達可能性の主張は適用範囲と canonical proof owner を明記する。
- **証明ゲート**: Frobenius の involutive 条件と括弧生成条件の方向を取り違えない。

### 3.4 第IV部：Malliavin 解析と Hörmander 定理（SGA11--SGA16）

**SGA11 — Wiener 空間上の微分**

- STO4 の古典 Wiener 測度から始め、Cameron--Martin 空間 $H$、円筒汎関数、方向微分、$H$ 内積表示を定義する。
- $F=f(B_{t_1},\ldots,B_{t_n})$ に $B+\varepsilon h$ を入れてから $D_sF$ を導く。
- 例: $B_T$、$B_T^2$、$e^{B_T-T/2}$、2時点の円筒汎関数。
- **証明ゲート**: 評価写像の方向微分から時間変数表示へ移る際、$H$ と $L^2([0,T])$ の同定を示す。

**SGA12 — 発散作用素・Wiener Sobolev 空間**

- 有限次元 Gaussian 部分積分から双対性、closability、$\mathbb D^{1,2}$、高階 $\mathbb D^{k,p}$、発散 $\delta$、Skorokhod 積分へ進む。
- adapted な被積分関数では $\delta(u)=\int u\,dB$ となる条件を証明する。
- Ornstein--Uhlenbeck 作用素 $L_W=-\delta D$ と Dirichlet 形式の基本を示す。
- **証明ゲート**: 閉包と定義域、有限次元近似、双対性を「標準的」で省略しない。

**SGA13 — 確率流と SDE の Malliavin 感度**

- 十分滑らかな有界導関数を持つ Euclid SDE の Jacobian flow $J_t$ と二点伝播 $J_{s,t}$ を定義する。
- $D_sX_t=J_{s,t}V(X_s)\mathbf1_{\{s\le t\}}$（列ベクトル規約）を変分方程式から導く。
- 多様体版は局所枠／接空間で表し、局所化と Jacobian の入出力空間を明記する。
- **証明ゲート**: 微分と確率積分の交換、初期条件、Stratonovich / Itô の drift 補正を検算する。

**SGA14 — Malliavin 共分散・密度判定**

- $V$ を拡散ベクトル場の列行列として
  $$
  C_t=\int_0^t J_{s,t}V(X_s)V(X_s)^\ast J_{s,t}^\ast\,ds
  $$
  を $DX_t$ の Gram 行列から導く。
- 密度の存在条件（非退化 a.s.）と滑らかな密度の条件（全階微分と逆行列式の可積分性）を区別する。
- 例: 線形 Gaussian SDE と Kolmogorov 拡散の明示共分散。通常の状態共分散との違い。
- **証明ゲート**: integration-by-parts weight の反復に必要な逆 moment を特定し、単なる正定値性だけから $C^\infty$ を結論しない。

**SGA15 — Lie 括弧伝播・Norris 型補題**

- reduced Malliavin 共分散と Jacobian の逆を使う範囲・仮定を確定し、共分散の小ささから Lie 括弧方向の小ささへ伝播する補題を証明する。
- Norris 型の確率的補題を定量的確率評価として導き、次数・停止・局所化・係数の微分階数を明記する。
- Heisenberg と Kolmogorov モデルで bracket の段数と共分散の小固有値を照合する。
- **証明ゲート**: 小確率評価を「Norris lemma により」で丸ごと隠さない。文献定理を技術入力にする場合は別の実装済み canonical owner への stable anchor が必須。

**SGA16 — Hörmander 型滑らかな密度定理**

- まず $C_b^\infty$ 係数と有限段の一様 strong Hörmander 条件など、共分散の逆 moment を証明可能な明示仮定で主定理を立てる。
- SGA15 の評価から $\mathbb E[(\det C_t)^{-p}]<\infty$（$t>0$、必要な各 $p$）を導き、SGA12/14 の反復部分積分で滑らかな密度を得る。
- parabolic Hörmander 条件（drift との反復括弧）へ拡張する場合は追加証明を明示し、strong 条件と同じとみなさない。
- Heisenberg・Kolmogorov 拡散を検算し、密度の存在・滑らかさ・正値性・support を別の命題として扱う。
- **証明ゲート**: Norris 評価→逆 moment→部分積分→正則性の各矢印を本文か既存 canonical result で閉じる。

### 3.5 第V部：多様体上の Wiener 経路空間（SGA17--SGA18）

**SGA17 — Brown 経路空間と接方向**

- compact Riemann 多様体など十分安全な仮定で、$C_x([0,T],M)$ の Brown 運動の法を確率展開の押出しとして定義する。
- Cameron--Martin 方向の摂動を単純に点wise 接ベクトルへ移したときの問題を示し、Bismut 型接方向・減衰平行移動を定義する。
- 円筒汎関数 $F=f(X_{t_1},\dots,X_{t_n})$ の方向微分を接空間表示で計算する。
- **証明ゲート**: 平行移動と減衰平行移動を区別し、接方向が満たす可積分性・適合性を明記する。

**SGA18 — 経路空間の部分積分・Dirichlet 形式**

- SGA17 の接方向に対する integration by parts を円筒関数から導き、Ricci の補正を明示する。
- 経路空間勾配の閉包、対応する Dirichlet 形式と Ornstein--Uhlenbeck 型作用素を扱う。
- Wiener 空間の通常の勾配との相違、有限次元曲率の寄与、基点固定経路空間の適用範囲を整理する。
- Wiener 経路空間上の完全な Hodge--Kodaira 分解は独立した発展枝とし、証明なしに本科目の主要到達目標へ含めない。
- **証明ゲート**: 作用素の定義域・形式の対称性・閉性の成立条件を示す。名称の紹介だけで終章を完成扱いにしない。

## 4. 既存教材との重複回避と依存監査

1. STO4 の [Wiener 測度](../volumes/dream_thater/解析系/STO/STO4/index.md#def-sto4-wiener-measure) と STO7 の Itô / Stratonovich、STO9 の解の存在、STO11 の Markov 半群を正本として再利用する。
2. GEO5--GEO7、GEO12--GEO16 と LIE1--LIE4 の定義・基本定理は繰り返さず、各講で使用する箇所の結果名から実在する stable anchor へリンクする。
3. **GA1 の Laplace--Beltrami、GA5 の決定論的熱核、GA7 の Bochner / Ricci** は完成済み。SGA5/8/9 は確率的構成・表現・解釈を担う。旧計画の「SGA3 前に GA1 の完成を確認」は現在地と不一致なので削除した。
4. SGA10 の一般的な sub-Riemann 幾何と SGA16 の確率的 Hörmander 証明は、別々の中心問いを持つ。SGA10 で SGA16 の主定理を先取りしない。
5. Schwartz--Meyer 二階幾何、Wiener 測度の一般変換、path-space Hodge など独立体系を要する結果は、採用するなら事前に prerequisite と証明 owner を確定する。
6. SGA の新規本文は DREAM_THEATER_AUTHORING_STANDARD.md 第10・10.1節の区分C査読を行う。新しい series manifest と公開 TOC は**着手した実在章だけ**を登録する。

## 5. 演習と全講の共通数学ゲート

- 各講の最低問題数は Level A: 4、Level B: 3、Level C: 1（全問に詳細解答）。18講の最低数は合計144題。ただし数合わせは禁止し、learning objectives を検証できなければ増やす。
- SGA1--SGA3: 座標変換・接束・群の乗算側・生成作用素を手で計算する。
- SGA4--SGA7: 水平持ち上げ・球面の drift 補正・共変微分・線積分の exact 条件を確認する。
- SGA8--SGA10: 熱方程式と質量保存の適用条件・曲率の符号・Heisenberg の括弧を検算する。
- SGA11--SGA14: 円筒汎関数の微分・双対性・Jacobian の向き・Gram 行列の導出を再現する。
- SGA15--SGA16: bracket 階数、停止時刻、小確率評価、逆 moment、部分積分から密度正則性をつなぐ。
- SGA17--SGA18: 確率平行移動と減衰平行移動の違い、円筒関数の経路方向微分と部分積分を検算する。

主役となる定義は formal statement より前に導入し、その条件を実際に検証する直接例を置く。非自明な二段以上の計算は「同様に」「標準定理」と飛ばさない。例・証明・演習解答で既出結果を使う箇所に canonical stable anchor を付ける。

## 6. 特に潰すべき誤解・技術上の注意

1. 「Stratonovich は座標不変」を計算なしで唱えない。Itô 表示も二階幾何によって意味付けられることと両立させる。
2. Stratonovich 積分を古典 Riemann--Stieltjes 積分と同一視しない。
3. 多様体値 SDE の局所存在と非爆発を同一視しない。geodesic completeness は任意の SDE の nonexplosion ではない。
4. Brown 運動の座標成分が独立 Brown 運動だとしない。$\frac12\Delta$ の規約を GA1 と揃える。
5. 左不変・右不変の SDE、確率指数、Haar 測度を無条件に左右対称とみなさない。
6. deterministic path に沿う平行移動と semimartingale path に沿う確率平行移動を混同しない。
7. 閉1-形式と exact 1-形式、局所原始関数と大域原始関数を混同しない。
8. 測地的完備性と確率完備性、熱核の存在・滑らかさ・正値性・質量保存を混同しない。
9. Frobenius の involutive 条件と Hörmander の bracket-generating 条件を逆にしない。
10. Malliavin 共分散を通常の状態共分散行列と同一視しない。非退化 a.s. と inverse moment の全階可積分性を区別する。
11. strong Hörmander と drift を含む parabolic Hörmander を同じ仮定として書かない。
12. path-space の damped transport と通常の平行移動を混同しない。
13. 公式や定理の適用は定義域、可積分性、停止時刻、境界条件、時間 $t>0$ の条件を毎回記録する。

## 7. 実装時の順序・公開・検証

1. current main で SGA1--SGA18 の ID 衝突、STO / GEO / LIE / GA の chapter.yaml・knowledge.yaml と必要な stable anchor を確認する。
2. 最初の章実装開始時に PLAN を plans_progress へ**移動**し、SGA 系列 manifest を作成して plan パスを一致させる。全講を planned として列挙し、completed は実際の完成講だけにする。
3. SGA1→SGA18 を §3 の依存順に実装する。ただし独立した講間の実施順は canonical dependency を検算すれば前後可能。新規章は区分Cとして全主要定理・証明・演習・詳細解答の全件査読を行う。
4. 目次ソース textbook/dream-theater-toc/** と学修ルートへ**実装済み講のみ**公開する。公開先の textbook/dream-theater.md は生成物なので直接編集しない。
5. 葉章のみの変更では changed-only validation（validate:textbook:changed、validate:textbook-knowledge:changed、validate:dream-theater-concepts:changed）と演習数、必要な pedagogy audit を用いる。共有 index・knowledge DAG・validator に波及する変更は full validation を行う。
6. 概念・演習・公開ルート・用語を検算し、系列 manifest と本 PLAN に残タスクがなくなった時点で plan_done へ移動する。全18講を薄く一括実装して completed としない。

## 8. 必須18講から独立させる発展枝

- **確率振動積分**: 二次 Wiener 汎関数、Volterra / Hilbert--Schmidt 作用素、Fredholm determinant。別 PLAN の核として見積もる。
- **KdV と確率解析**: Lax pair、無反射ポテンシャル、Ornstein--Uhlenbeck と二次 Wiener 汎関数。既存 KdV owner の確認が先。
- **rough paths**: Wong--Zakai、Brown rough path、Lyons の連続性定理。独立科目として設計する。
- **Wiener 経路空間上の Hodge 理論**: 1-形式の閉作用素・Hodge--Kodaira 型分解・曲率による補正。SGA18 の到達範囲には含めない。
- **Varadhan 型の一般短時間漸近・sub-Riemann 熱核精密評価**: GA5 の決定論的結果と区別した証明 PLAN が必要。今回の主線では位置付けと直接計算に留める。

## 9. 完成判定

- [ ] SGA1--SGA18 の本文・chapter.yaml・knowledge.yaml・系列 manifest・公開導線が整合している。
- [ ] 各講で導入順、定義例、形式的な仮定・結論、主要定理の核心証明、最低 A4/B3/C1 と詳細解答が揃っている。
- [ ] 枠束上の水平 SDE の射影、$\frac12\Delta$、球面の Itô 補正、熱核の質量保存、Heisenberg 括弧が直接計算されている。
- [ ] Malliavin 微分・closability・双対性・SDE 感度・共分散行列の中間計算が全て検証されている。
- [ ] Norris 型の定量補題から inverse moment を得て Hörmander 型滑らかな密度の核心を証明し、strength の異なる条件と結論を分離している。
- [ ] path-space の微分・減衰平行移動・integration by parts・閉 Dirichlet 形式の定義域が示されている。
- [ ] 既存 STO / GEO / LIE / GA と証明の正本を重複させず、実際の使用箇所に到達可能な stable anchor がある。
- [ ] changed-only / full のスコープに適合した CI と数学的自己査読・別観点での再読を終え、未確認部分を「完了」にしない。

**次講**は系列 manifest の先頭から連続 completed の直後の planned を採る。現時点では未着手なので、最初の実装候補は **SGA1「多様体値半マルチンゲールと Stratonovich 連鎖律」** である。
