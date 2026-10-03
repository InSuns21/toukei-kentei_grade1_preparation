# DREAM THEATER 確率解析 II — 多様体・Lie 群上の確率解析 コース計画

作成日: 2026-10-03  
状態: planned

## 0. 目的

本計画は、DREAM THEATER の既存「確率解析」STO1--STO14 の後続として、**多様体・Riemann 幾何・Lie 群を既知とする確率解析 II** を独立科目として追加するための設計台帳である。

既存の確率解析ロードマップ
`textbook/volumes/00_foundations/F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md`
は、Euclid 空間上の Stratonovich 解析までを扱い、

~~~text
manifold / tangent bundle / connection
  ↓
manifold-valued SDE / stochastic development
  ↓
幾何学系列完成後の別系列
~~~

へ送る方針をすでに明示している。本科目は、この「別系列」を正本化する。

目標は、多様体上で記号だけを置き換えた SDE 紹介にせず、

1. Stratonovich 形式がなぜ座標変換と両立するかを計算で確認する。
2. ベクトル場で書いた SDE を多様体上に定義し、局所座標表示との同値を追う。
3. Lie 群の不変ベクトル場と確率微分方程式を結び付ける。
4. Riemann 多様体上の Brown 運動を Laplace--Beltrami 作用素、直交枠束、水平持ち上げから構成する。
5. 確率展開・反展開、確率平行移動、確率線積分を幾何学的対象として理解する。
6. 劣リーマン構造と Lie 括弧生成条件から退化拡散を扱う。
7. Wiener 空間上の微分・発散・Sobolev 構造を導入し、Malliavin 解析を SDE へ適用する。
8. Malliavin 共分散と Hörmander 条件から滑らかな密度が生じる機構を追う。
9. 拡散半群・熱核と確率過程を往復し、幾何と解析の接点を理解する。

ところまでを、prerequisite だけから独習者が再構成できる教材にする。

---

## 1. 参考にする射程と、転載しない方針

設計上は、ユーザー指定の丸善出版ページで示された方向性に加え、公開書誌で確認できる確率幾何解析の標準的な話題、

- 多様体上の確率微分方程式
- Lie 群上の確率微分方程式
- 劣リーマン多様体上の拡散
- 確率線積分
- Malliavin 解析
- 熱半群・熱核
- Wiener 空間上の幾何

を参考にする。

特定の書籍の章立て・証明・例題・演習を写経しない。既存 DREAM THEATER の canonical owner と依存 DAG を優先し、同じ内容がすでに STO / GEO / LIE / GPDE にある場合は再実装せず stable anchor へ接続する。

特に、確率積分・Itô 公式・Euclid 空間上の SDE を冒頭からやり直さない。それらは STO6--STO11 を正本とする。

---

## 2. 科目名と ID 方針

公開科目名は原則として

> **確率解析 II — 多様体・Lie 群上の確率解析**

とする。

「確率幾何解析」は検索・文献接続上有用な補助名として初出で併記してよいが、既存「確率解析」との連続性を明確にするため主科目名は「確率解析 II」とする。

章 ID は、既存 STO1--STO14 と衝突せず、内容が幾何学的確率解析であることを示すため、実装時点で衝突がなければ仮に **SGA1--SGA10** を採用する。

SGA は stochastic geometric analysis の管理上の ID であり、学習者向け本文で英字略号を説明語彙として多用しない。

---

## 3. prerequisite 方針

本科目は「確率解析 II」なので、確率解析 I の核心は既知とする。ただし、各章の `chapter.yaml` / `knowledge.yaml` では科目名を丸ごと prerequisite にせず、実際に必要な canonical result へ接続する。

### 3.1 確率解析側

主要候補:

- STO4: Brown 運動
- STO5: 二次変分・連続局所マルチンゲール
- STO6: Itô 積分
- STO7: 多次元 Itô 公式・Stratonovich 積分・Itô--Stratonovich 変換
- STO9: SDE の強解・存在一意性・局所化
- STO10: 弱解・Girsanov
- STO11: Markov 半群・生成作用素・Dynkin 公式
- STO12: Brown 運動のマルチンゲール表現

STO13--STO14 の跳躍解析は本科目の中心 prerequisite ではない。確率解析 I を通読した学習者には既知であるが、多様体上の連続拡散を扱う章へ不要な依存を機械的に追加しない。

### 3.2 微分幾何側

主要候補:

- GEO1: 滑らかな多様体・滑らかな写像
- GEO2: 接空間・余接空間・微分・接束
- GEO3: はめ込み・沈め込み・部分多様体
- GEO5: ベクトル場・積分曲線・局所流・Lie 括弧
- GEO6: 線形分布・Frobenius の定理
- GEO7: テンソル場・微分形式・外微分
- GEO8: 多様体上の積分
- GEO12: Riemann 計量・長さ・距離・体積
- GEO13: アフィン接続・Levi-Civita 接続・平行移動
- GEO14: 測地線・指数写像・正規座標
- GEO15: 完備性・Hopf--Rinow
- GEO16: Riemann 曲率

全章に GEO1--GEO19 を一括 prerequisite としない。例えば多様体値 SDE の導入に Gauss--Bonnet は不要である。

### 3.3 Lie 理論側

- LIE1: Lie 群・Lie 環・不変ベクトル場
- LIE2: 1 パラメータ部分群・指数写像・随伴表現
- LIE3: Lie 部分群・古典群
- LIE4: Lie 群作用・軌道・等質空間・Maurer--Cartan

Lie 群上の拡散章では LIE4 までを既知とする。一方、Riemann 多様体一般の章へ LIE4 を不要に要求しない。

### 3.4 解析側

Malliavin 解析・熱核では必要に応じて、

- 測度論・$L^2$ 完備性
- 関数解析の Hilbert 空間・閉作用素
- GPDE の弱微分・Sobolev 空間
- PDE の熱方程式・楕円型作用素

を参照する。

ただし「熱核を読むために大学院 PDE 全章必修」のような過剰 prerequisite は避ける。確率半群から導ける部分は STO11 を使い、PDE 正則性が本質になる結果だけ GPDE の canonical result を受け取る。

---

## 4. 全体の学習線

主線は次とする。

~~~text
STO7 Stratonovich
      +
GEO1--GEO16
      +
LIE1--LIE4
      ↓
SGA1 多様体値 SDE
      ↓
SGA2 Lie 群上の SDE
      ↓
SGA3 Riemann 多様体上の Brown 運動
      ↓
SGA4 確率平行移動・確率線積分
      ↓
SGA5 劣リーマン拡散
      ↓
SGA6 Malliavin 解析 I
      ↓
SGA7 Malliavin 解析 II
      ↓
SGA8 Hörmander 型非退化性
      ↓
SGA9 熱半群・熱核
      ↓
SGA10 多様体上の Wiener 空間
~~~

「確率解析 I の続きをそのまま番号で増築」するのではなく、幾何・Lie 理論との交差科目として別系列にする。

---

## 5. コース構成案

### SGA1 多様体値 SDE：なぜ Stratonovich 形式が必要か

中心問い:

> Euclid 空間の SDE を座標表示に依存しない多様体上の方程式へどう持ち上げるか。

扱う:

- 多様体値半マルチンゲールの局所座標表示
- ベクトル場 $V_0,V_1,ldots,V_m$ に対する Stratonovich SDE
- 局所座標での成分表示
- 滑らかな写像 $F:M	o N$ に対する連鎖律
- 座標変換と Stratonovich 形式の両立
- Itô 表示へ戻したときに二階補正が現れること
- 停止時刻で局所座標を貼り合わせる考え方
- 存在一意性を局所 chart の Euclid SDE から構成する
- ベクトル場が部分多様体に接している場合の不変性

主要証明責務:

- Stratonovich chain rule を STO7 の Euclid 版から局所座標で展開する。
- chart を変えたとき同じ幾何学的過程を表すことを確認する。
- 「座標不変だから」という一言で終わらせない。

直接例:

- 円周 $S^1$ 上の Brown 型 SDE
- 球面 $S^{d-1}$ 上で接ベクトル場に駆動される SDE
- 座標変換で Itô drift が変わる最小例

### SGA2 Lie 群上の確率微分方程式

中心問い:

> 群構造と確率的な時間発展をどう両立させるか。

扱う:

- 左不変・右不変ベクトル場による SDE
- Lie 環の元から不変ベクトル場を作る
- 行列 Lie 群上の Stratonovich SDE
- 確率指数・確率対数の基本的な考え方
- 左移動による増分の見方
- 生成作用素 $rac12sum_i X_i^2+X_0$
- Haar 測度と対称性
- コンパクト Lie 群上の Brown 運動
- 畳み込み半群との接続
- Maurer--Cartan 形式による anti-development の初歩

主要証明責務:

- 不変ベクトル場 SDE の解が群の中に留まることを局所的に確認する。
- 行列群では積の微分則から群制約が保存される具体例を出す。
- 生成作用素を Itô 公式から導く。

直接例:

- $SO(2)$
- $SO(3)$
- Heisenberg 群
- 可換群 $mathbb R^d$ が通常の Euclid SDE を回収すること

### SGA3 Riemann 多様体上の Brown 運動と確率展開

中心問い:

> 「多様体上で等方的にランダムに動く」とは何を意味するか。

扱う:

- Laplace--Beltrami 作用素
- 生成作用素 $rac12Delta$ としての Brown 運動
- 直交枠束
- Levi-Civita 接続から水平部分空間を作る
- 水平ベクトル場
- 枠束上の Stratonovich SDE
- 射影して得る Riemann Brown 運動
- stochastic development（確率展開）
- anti-development（確率反展開）
- Euclid Brown 運動と多様体 Brown 運動の対応
- geodesic completeness と stochastic completeness の違いの入口

主要証明責務:

- 水平 SDE の射影の生成作用素が $rac12Delta$ になる計算を展開する。
- 正規座標で一次 drift が消えることと二階作用素が残ることを確認する。

直接例:

- $S^1$
- $S^2$
- 平坦トーラス
- Euclid 空間

### SGA4 確率平行移動・確率線積分・多様体値マルチンゲール

中心問い:

> ランダムな曲線に沿ってベクトル・1 形式・接続をどう運ぶか。

扱う:

- 確率平行移動
- 共変 Stratonovich 微分
- 接続を用いた多様体値マルチンゲール
- 1 形式の確率線積分
- 外微分と Stratonovich 線積分
- exact 1-form の積分と端点差
- holonomy への入口
- 必要な範囲で微分形式上の熱半群への橋

主要証明責務:

- $df$ の確率線積分が $f(X_t)-f(X_0)$ を与えることを chain rule から示す。
- 平行移動の長さ保存を metric compatibility から追う。

### SGA5 劣リーマン多様体と退化拡散

中心問い:

> 雑音が接空間の全方向へ直接入らなくても、なぜ過程が空間全体へ広がれるのか。

扱う:

- 水平分布 $Hsubset TM$
- 水平計量
- 劣リーマン多様体（sub-Riemannian manifold）
- bracket-generating condition
- Lie 括弧で新しい方向が生まれる機構
- 水平曲線と Carnot--Carathéodory 距離の入口
- sub-Laplacian
- 水平ベクトル場で駆動される拡散
- Heisenberg 群を標準例とする
- Chow--Rashevsky 型到達可能性の位置付け
- Hörmander 条件への橋

この章で sub-Riemann 幾何の全理論を再実装しない。確率解析へ必要な分布・水平曲線・bracket generation を閉じる。

主要証明責務:

- Heisenberg 群で二つの水平ベクトル場の Lie 括弧が欠けた方向を生成することを手計算する。
- 対応する二階作用素が楕円型ではないのに全方向へ情報を伝える理由を説明する。

### SGA6 Malliavin 解析 I：Wiener 空間を微分する

中心問い:

> Brown 経路そのものを変数とみなして微分するとはどういうことか。

扱う:

- Wiener 空間
- Cameron--Martin 空間
- 円筒汎関数
- Cameron--Martin 方向微分
- Malliavin 微分
- gradient の $H$ 値表示
- closability
- $mathbb D^{1,2}$
- 発散作用素
- Skorokhod 積分
- adapted integrand では Itô 積分を回収すること
- 双対性公式
- Ornstein--Uhlenbeck 作用素への入口

主要証明責務:

- 円筒汎関数で Malliavin 微分を具体的に計算する。
- integration by parts の有限次元 Gaussian 計算から Wiener 空間版へ持ち上げる流れを示す。
- closability を「標準的」で飛ばさず、証明または canonical dependency を確定する。

直接例:

- $F=B_T$
- $F=B_T^2$
- $F=exp(B_T-T/2)$
- $F=f(B_{t_1},ldots,B_{t_n})$

### SGA7 Malliavin 解析 II：SDE の感度と Malliavin 共分散

中心問い:

> SDE の終点 $X_t$ が Brown 経路の摂動へどう反応するか。

扱う:

- SDE の Jacobian flow
- 初期値微分
- Malliavin 微分 $D_sX_t$
- variation of constants
- Malliavin 共分散行列
- 非退化性
- 密度存在の integration-by-parts criterion
- 多様体値 SDE での局所座標と接空間表示
- Lie 括弧と共分散の関係

主要証明責務:

- $D_sX_t=J_{s,t}V(X_s)$ 型の公式を、適用条件と行列の向きを明示して導く。
- 共分散行列
  $$
  C_t=int_0^t J_{s,t}V(X_s)V(X_s)^*J_{s,t}^*,ds
  $$
  がどこから出るかを一段ずつ示す。
- 非退化なら密度を持つという主張の証明責務を明示する。

### SGA8 Hörmander 条件と滑らかな密度

中心問い:

> 雑音が直接入らない方向へ Lie 括弧が伝播すると、なぜ確率分布の密度が滑らかになるか。

扱う:

- strong / parabolic Hörmander condition
- Lie algebra generated by diffusion vector fields
- Malliavin 共分散の非退化
- Norris lemma の役割
- Hörmander 型滑らかさ定理
- hypoellipticity との対応
- support theorem との違い
- Heisenberg 群・Kolmogorov 型拡散の具体例

この章は本科目の主要定理章である。

**完成条件として二択を曖昧にしない。**

1. Norris lemma を含む核心証明を本科目内で閉じる。
2. Norris lemma を別 canonical chapter へ独立実装し、SGA8 はその stable result を使って Hörmander 証明を閉じる。

「Hörmander の定理は標準的」で主役の証明を丸ごと飛ばした状態を完成扱いにしない。

### SGA9 熱半群・熱核と確率過程

中心問い:

> 拡散の遷移確率と熱方程式の基本解は、なぜ同じ対象になるのか。

扱う:

- Markov 半群の再確認
- Riemann 多様体上の熱半群
- transition density と heat kernel
- $partial_tu=rac12Delta u$
- Chapman--Kolmogorov と heat kernel
- 対称性
- 保存性と stochastic completeness
- Feynman--Kac の幾何版
- Hörmander 拡散の滑らかな密度
- Varadhan 型短時間漸近の位置付け
- 距離と熱核の短時間挙動
- Lie 群・劣リーマン空間への接続

Varadhan の完全証明など大規模な漸近解析は、独立した教育価値と prerequisite を監査して採否を決める。採用するなら結果だけ「標準定理」として置くのでなく、証明 owner を明示する。

### SGA10 多様体上の Wiener 空間と無限次元幾何

中心問い:

> 多様体値 Brown 経路全体の空間には、どのような微分構造を入れられるか。

扱う候補:

- path space $C([0,T],M)$
- stochastic development による Euclid Wiener space との対応
- Bismut tangent space
- damped parallel translation
- path space gradient
- integration by parts
- Ornstein--Uhlenbeck 型作用素
- 多様体値 Wiener functional
- Hodge--Kodaira 型分解の入口

この章は本科目の発展終章とし、無限次元多様体一般論を prerequisite にしない。必要な構造を path space に特化して導入する。

---

## 6. 発展枝

参考文献に現れる高度な話題のうち、主線を壊すものは別枝にする。

### SGA-X1 確率振動積分

候補:

- 二次 Wiener 汎関数
- Hilbert--Schmidt / Volterra 作用素
- Fredholm determinant 型表現
- stationary phase との比較

関数解析・作用素論の依存を先に監査する。

### SGA-X2 KdV・無反射ポテンシャルと確率解析

候補:

- KdV 方程式
- Lax pair の既存 owner 確認
- Ornstein--Uhlenbeck 過程と無反射ポテンシャル
- 二次 Wiener 汎関数

これは「確率解析 II」の必須完成条件には入れない。KdV 自体の canonical treatment がない状態で、確率側から逆輸入しない。

### SGA-X3 rough paths への橋

- Stratonovich SDE と ODE 的 chain rule
- Wong--Zakai 近似
- Brown rough path
- Lyons continuity

rough paths は独立した大規模理論なので、必要なら別 plan とする。

---

## 7. 本科目で特に守る証明粒度

### 7.1 座標変換

多様体上の SDE で最も危険なのは、

> Stratonovich だから座標不変である。

だけで済ませることである。

実際には、

1. 局所座標 $x$ で成分表示を書く。
2. 別座標 $y=Phi(x)$ を選ぶ。
3. Euclid Stratonovich chain rule を $Phi$ に適用する。
4. $DPhi,V_i$ が pushforward されたベクトル場の成分になることを確認する。
5. Itô 形式では Hessian 補正が入ることと比較する。

ところまで追う。

### 7.2 枠束・水平持ち上げ

「水平持ち上げを取る」で終わらせない。

- 枠 $u:mathbb R^d	o T_xM$ が何を表すか。
- Levi-Civita 接続が水平部分空間をどう決めるか。
- 標準基底 $e_i$ を水平ベクトル場へどう持ち上げるか。
- 枠束上の SDE を $pi$ で射影すると何が起こるか。

を低次元例と一般式の両方で示す。

### 7.3 Lie 括弧と Hörmander 条件

Lie 括弧を「方向が増える演算」とだけ説明しない。

Heisenberg 群などで

$$
X,quad Y,quad [X,Y]
$$

を実際に計算し、点ごとの span が接空間全体になることを確認する。

### 7.4 Malliavin 微分

「経路を微分する」という比喩だけで進めない。

円筒汎関数

$$
F=f(B_{t_1},ldots,B_{t_n})
$$

に対し、Cameron--Martin 摂動 $B+arepsilon h$ を入れ、

$$
rac{d}{darepsilon}F(B+arepsilon h)igg|_{arepsilon=0}
$$

を実計算してから $H$ 内積表示へ進む。

### 7.5 熱核

「生成作用素が Laplacian だから熱方程式」で一段飛ばしにしない。

Dynkin 公式、semigroup derivative、test function への作用、transition density がある場合の積分表示を区別する。

---

## 8. 直接例の基準

各主要概念に、定義条件を実際に検証する例を置く。

優先する標準例:

- $S^1$ 上の拡散
- $S^2$ 上の Brown 運動
- 平坦トーラス
- $SO(2)$ / $SO(3)$
- Heisenberg 群
- Kolmogorov 型退化拡散
- Ornstein--Uhlenbeck 過程
- Euclid 空間を特殊例として回収する計算

「球面上の Brown 運動は有名なので例」とするだけでなく、生成作用素・接ベクトル場・制約保存のいずれかを実際に確認する。

---

## 9. 演習設計

各実装章は DREAM THEATER 標準どおり、理由付き例外がなければ最低

- Level A: 4 題
- Level B: 3 題
- Level C: 1 題

を置き、全問に詳細解答を付ける。

代表題材:

### SGA1

- 座標変換で Stratonovich SDE が pushforward されることを確認する。
- $S^1$ の角度座標と埋め込み座標を往復する。
- 接ベクトル場条件から部分多様体不変性を確認する。

### SGA2

- $SO(2)$ の左不変 SDE を角度表示へ落とす。
- 行列積の Stratonovich 微分を計算する。
- 左不変生成作用素を求める。
- Heisenberg 群の不変ベクトル場を計算する。

### SGA3--SGA4

- Laplace--Beltrami 作用素を局所座標で計算する。
- 球面 Brown 運動の extrinsic 表現を検証する。
- 確率平行移動の長さ保存を示す。
- exact 1-form の確率線積分を計算する。

### SGA5

- bracket-generating condition を Heisenberg 群で確認する。
- 水平曲線の制約を具体的に解く。
- sub-Laplacian の principal symbol が退化することを確認する。

### SGA6--SGA8

- 円筒汎関数の Malliavin 微分。
- Skorokhod 積分が adapted case で Itô 積分になること。
- 線形 SDE の Malliavin 共分散を陽に求める。
- Kolmogorov 拡散で Lie 括弧が欠けた方向を生成すること。
- 非退化性から密度が得られる integration-by-parts の再現。

### SGA9--SGA10

- compact manifold 上の heat semigroup の保存性。
- Brown 運動の transition density から heat equation を確認する。
- stochastic development の最小計算。
- path-space directional derivative の円筒例。

題数のために「定義を書け」「用語を答えよ」を量産しない。

---

## 10. 典型的誤解を明示的に潰す

少なくとも次を本文・注意・演習で扱う。

1. Itô 形式が「座標不変でない」ことと、Itô 過程自体が幾何学的に無意味であることを混同しない。
2. Stratonovich 記号 $circ,dB_t$ を普通の Riemann--Stieltjes 積分とみなさない。
3. 多様体値 SDE の係数は単なる $mathbb R^d$ 値関数ではなくベクトル場である。
4. Riemann 多様体上の Brown 運動を「座標ごとに独立 Brown 運動」と定義しない。
5. geodesic completeness と stochastic completeness を同一視しない。
6. Lie 群上の Brown 運動と Lie 環上の Brown 運動を同じ空間の過程として扱わない。
7. bracket-generating condition を Frobenius の involutive condition と取り違えない。
8. Malliavin 微分と時間微分を混同しない。
9. Malliavin 共分散の正定値性と通常の状態共分散行列の正定値性を同一視しない。
10. Hörmander 条件が「拡散係数行列が各点で正則」という楕円性と同じ条件ではない。
11. heat kernel の存在・滑らかさ・正値性・保存性を一つの事実としてまとめない。
12. 確率平行移動と通常の deterministic path に沿う平行移動の定義域の違いを曖昧にしない。

---

## 11. 既存系列との責務分担

### STO

- 確率積分、Itô 公式、Stratonovich 変換、Euclid SDE は STO を canonical とする。
- SGA1 では必要な公式を再掲してよいが、証明 owner を取り直さない。
- jump SDE は本科目の必須主線に入れない。

### GEO

- 多様体、接束、ベクトル場、Lie 括弧、微分形式、Riemann 計量、Levi-Civita 接続は GEO を canonical とする。
- SGA 側では「確率過程へどう適用するか」を主役にする。

### LIE

- Lie 群・Lie 環・指数写像・随伴表現・Maurer--Cartan は LIE を canonical とする。
- SGA2 ではそれらを確率 SDE へ使う。

### PDE / GPDE

- heat equation、Sobolev 空間、楕円型正則性の一般論は既存 owner を確認する。
- SGA9 は heat kernel と stochastic representation の交点に責務を限定する。

### 将来の rough paths / SPDE

- rough paths、regularity structures、SPDE は本科目へ詰め込まない。
- 必要なら独立科目にする。

---

## 12. 標準学習順での位置

本科目は既存の「確率解析 I」だけでは開始できず、微分幾何と Lie 理論の両方へ依存する。

したがって `dream-theater-standard-math-core.md` では、実装後に主幹の途中へ無理に挿入せず、**Lie 理論修了後に合流できる発展交差科目**として案内する。

概念上の依存は

~~~text
確率解析 I ───────────────┐
                           │
微分幾何 I / II ──────────┼→ 確率解析 II
                           │
Lie 理論 ─────────────────┘
~~~

である。

確率解析 I の読者全員へ微分幾何・Lie 理論を必修化しない。

---

## 13. 実装順

1. current main で STO7 / STO9 / STO11、GEO5 / GEO12--GEO16、LIE1--LIE4 の canonical anchor と knowledge concept ID を監査する。
2. SGA1 多様体値 SDE。
3. SGA2 Lie 群上の SDE。
4. SGA3 Riemann 多様体上の Brown 運動。
5. SGA4 確率平行移動・確率線積分。
6. SGA5 劣リーマン拡散。
7. SGA6 Malliavin 解析 I。
8. SGA7 Malliavin 解析 II。
9. SGA8 Hörmander 条件・滑らかな密度。
10. SGA9 熱半群・熱核。
11. SGA10 多様体上の Wiener 空間。
12. dream-theater.md に独立科目を追加する。
13. dream-theater-index.json を更新する。
14. dream-theater-standard-math-core.md に発展交差科目として追加する。
15. 必要な日本語主表記を references/terminology-guide.md へ同期する。
16. knowledge DAG と chapter prerequisites を更新する。
17. DREAM THEATER 専用 validation / pedagogy audit を実行する。
18. 数理査読・読者粒度査読を行い、fatal / major / minor を解消する。

一括で 10 章を薄く作って「implemented」にしない。各章を A4/B3/C1・詳細解答・主要証明まで閉じてから次へ進む。

---

## 14. 用語方針

学習者向け本文では、日本語として定着している一般概念は日本語を主表記にする。

実装前に terminology guide と照合し、少なくとも次を統一する。

- 確率微分方程式
- Stratonovich 積分
- 多様体値確率過程
- 確率展開（stochastic development）
- 確率反展開（anti-development）
- 確率平行移動
- 確率線積分
- 劣リーマン多様体（sub-Riemannian manifold）
- 水平分布
- 劣 Laplace 作用素 / sub-Laplacian の採用表記
- Malliavin 微分
- Cameron--Martin 空間
- Skorokhod 積分
- Malliavin 共分散
- Hörmander 条件
- 熱半群
- 熱核
- 確率完備性

人名由来の名称は、Hörmander、Malliavin、Cameron--Martin、Levi-Civita、Bismut など人名部分の英字表記を保持する。

「sub-Riemann」が既存の日本語文献で広く使われる場合でも、本文の主表記を機械的に英語へ固定しない。terminology guide で実際の採用表記を決める。

---

## 15. 機械検証

変更章ごとに少なくとも

- `npm run validate`
- `npm run validate:pages`
- `npm run validate:dream-theater-exercise-counts`
- `npm run audit:proof-pedagogy`
- `npm run audit:formalism-pedagogy`

を実行する。

新規章の pure-add では changed-only strict validation を原則とする。knowledge DAG・全体概念レジストリ・推論規則など未変更ページへ波及する変更を行った場合だけ full audit へ広げる。

CI green は完成の十分条件にしない。

---

## 16. 完成条件

次を全て満たしたとき、本科目を completed とする。

- 多様体値 Stratonovich SDE の座標不変性を読者が局所座標計算から再現できる。
- 多様体上の SDE の存在一意性を Euclid SDE と chart の貼り合わせへ接続できる。
- Lie 群上の不変 SDE と生成作用素を計算できる。
- Riemann Brown 運動を $rac12Delta$ の拡散として説明し、枠束上の水平 SDE から構成できる。
- stochastic development / anti-development の対応を追える。
- 確率平行移動・確率線積分を接続・微分形式と結び付けられる。
- 劣リーマン分布と bracket-generating condition を Heisenberg 群で直接検証できる。
- Cameron--Martin 空間、Malliavin 微分、発散作用素、$mathbb D^{1,2}$ を円筒汎関数から構成できる。
- SDE の Malliavin 微分と Malliavin 共分散の主要式を導ける。
- Hörmander 条件が共分散の非退化へどう結び付くかを、Norris lemma を含む明示的 proof dependency から追える。
- Hörmander 型滑らか密度定理の核心証明が本科目または canonical dependency で閉じている。
- heat semigroup と heat kernel を transition law・生成作用素・熱方程式の三方向から接続できる。
- geodesic completeness / stochastic completeness / heat kernel mass conservation の区別を説明できる。
- SGA1--SGA10 の各変更章が DREAM THEATER の導入・直接例・証明粒度・演習数・詳細解答規約を満たす。
- 学習者向け目次に未実装章を完成済みとして公開していない。
- 既存 STO / GEO / LIE / GPDE の canonical content を重複実装していない。

---

## 17. 参考文献候補

設計・査読時の参考候補として、少なくとも次の系統を比較する。

- 谷口説男『確率幾何解析』：多様体・Lie 群上の SDE、劣リーマン拡散、Malliavin 解析、熱核への接続。
- Elton P. Hsu, *Stochastic Analysis on Manifolds*：枠束、水平持ち上げ、stochastic development、Riemann Brown 運動、熱核、path space。
- Malliavin 解析の標準的教科書・講義録：Cameron--Martin、Malliavin derivative、divergence、Hörmander theorem の証明粒度の照合。

参考文献の存在を理由に本文の証明を省略しない。証明を technical input とする場合は、その定理が本科目の主要 learning objective かどうかを先に判定する。
