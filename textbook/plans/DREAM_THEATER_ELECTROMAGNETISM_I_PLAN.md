# DREAM THEATER 電磁気学 I コース計画

作成日: 2026-10-07  
状態: planned

## 0. 目的

DREAM THEATER に大学初年級から読める一学期の **電磁気学 I** を新設する。

数理量子力学の水素原子で Coulomb ポテンシャルだけを借りる補講にはせず、電荷・電場・電位から Maxwell 方程式と電磁波までを一つの体系として学ぶ。

中心問いは、

> 電荷と電流が作る場を、局所的な微分方程式と積分法則でどう記述し、荷電粒子の運動へどう戻すか。

とする。

高校物理の電磁気を暗黙前提にしない。VC 系列の数学と、実験・経験則としての電磁気法則を区別する。

## 1. 市販教科書との照合

主参照:

- 兵頭俊夫『電磁気学（増補修訂版）』裳華房  
  https://shokabo.co.jp/mybooks/ISBN978-4-7853-2274-8.htm
- 加藤岳生『電磁気学入門』裳華房  
  https://www.shokabo.co.jp/textbook/ph6.html
- 河辺哲次『ベーシック 電磁気学』裳華房  
  https://www.shokabo.co.jp/mybooks/ISBN978-4-7853-2237-3.htm
- 小宮山進・竹川敦『マクスウェル方程式から始める 電磁気学』裳華房  
  https://www.shokabo.co.jp/textbook/ph6.html

兵頭は高校物理未履修者を想定し、実験事実から基本原理へ進む構成である。河辺は大学1・2年向け半期用として、Coulomb 力から Maxwell 方程式・電磁波までを扱う。DREAM THEATER では両者の長所を取り、まず静電気の具体像を作り、後半で Maxwell 方程式へ統合する。

## 2. prerequisite

必須:

- 多変数微積分
- VC1--VC5
- MECH1--MECH4

推奨:

- PDE5--PDE6 の Laplace / Poisson 方程式・Green 関数
- FOU1--FOU3 の波・Fourier 記法

VC9 に Maxwell 方程式の数学的入口が既にあるため、数学的恒等式を重複証明せず、物理法則・単位・境界条件・具体例を本系列で閉じる。

## 3. 章構成

候補 ID: EMAG1--EMAG8。

### EMAG1 電荷・Coulomb 力・電場

- 電荷
- 電荷保存
- Coulomb の法則
- 重ね合わせ
- 電場
- 点電荷・連続分布
- 電気力線は補助表現であること
- SI 単位
- 実験法則と場のモデル化

### EMAG2 Gauss の法則と静電場

- 電束
- Gauss の法則
- 対称性を使う計算
- 積分形と微分形
- $\nabla\cdot E=\rho/\varepsilon_0$
- 球・円筒・平面対称
- delta 分布の必要性への入口

### EMAG3 電位・Poisson 方程式・Coulomb ポテンシャル

- 保存力としての静電場
- 電位
- $E=-\nabla\phi$
- Poisson / Laplace 方程式
- 点電荷の電位
- 2電荷系の位置エネルギー
- 電子と陽子の Coulomb ポテンシャル

$$
V(r)=-\frac{e^2}{4\pi\varepsilon_0r}
$$

がどこから来るかを MQ4 の canonical physical dependency として閉じる。

### EMAG4 導体・境界値問題・静電エネルギー

- 静電平衡
- 導体表面
- 境界条件
- 静電容量
- capacitor
- 場のエネルギー
- uniqueness theorem
- image method への入口

数学的 uniqueness は PDE 系の結果を必要に応じて参照する。

### EMAG5 電流・磁場・Ampere の法則

- 電流密度
- 連続の式
- Biot--Savart の法則
- 磁場
- Ampere の法則
- $\nabla\cdot B=0$
- ベクトルポテンシャル
- gauge の入口

### EMAG6 Lorentz 力と荷電粒子

- Lorentz force
- 電場・磁場中の運動
- 一様磁場中の円運動
- crossed fields
- canonical momentum への入口
- scalar / vector potential
- 電磁場中の Lagrangian

AMECH と接続し、将来の minimal coupling の物理的出発点を用意する。

### EMAG7 電磁誘導と Maxwell 方程式

- Faraday の法則
- Lenz の法則
- displacement current
- Maxwell 方程式
- 積分形と微分形
- 連続の式との整合
- gauge transformation
- 電磁ポテンシャル

四つの方程式を単なる暗記表にせず、どの経験則を統合したかを示す。

### EMAG8 電磁波とエネルギー

- 真空中の波動方程式
- 光速
- 平面波
- $E,B,k$ の直交関係
- energy density
- Poynting vector
- momentum への入口
- classical electromagnetism の適用限界
- 量子論へ何が残るか

## 4. MQ への出口

MQ4 に直接必要なのは主に EMAG3 の Coulomb ポテンシャルである。

一方、科目として EMAG1--EMAG8 を完走することで、

- 電磁場は独立した力学変数であること
- scalar / vector potential
- gauge
- Lorentz force
- 場のエネルギー

まで理解でき、将来の電磁場の量子化・QED への入口も確保する。

MQ の formal prerequisite を不必要に EMAG8 まで強制せず、章単位で最小依存を記述する。

## 5. 境界

本科目に含めない:

- 物質中の電磁気学の完全理論
- 特殊相対論からの共変形式
- radiation の高度な理論
- Green 関数による一般境界値問題の網羅
- gauge theory の幾何学
- 量子電磁力学

これらは後続科目候補とする。

## 6. 教育設計

各基本法則で

実験・経験則 → 積分形 → 対称性を使う例 → 微分形 → 他の法則との整合

の順を基本とする。

VC の定理と Maxwell の物理法則を混同しない。たとえば Gauss--Ostrogradsky の定理は数学、Gauss の法則は物理法則である。

理由付き例外がなければ各章 Level A 4題、B 3題、C 1題以上、全問詳細解答。

## 7. 完成条件

- Coulomb の法則から電場と電位を計算できる。
- Gauss の法則を積分形・微分形で使える。
- Poisson 方程式と静電ポテンシャルを接続できる。
- Coulomb ポテンシャル $-1/r$ の物理的由来を説明できる。
- Biot--Savart / Ampere / Faraday の各法則を具体例で使える。
- Lorentz 力から荷電粒子運動を立式できる。
- Maxwell 方程式から真空中の波動方程式を導ける。
- 数学定理と物理法則の区別を保てる。

## 8. 実装順

1. VC9 / PDE5--6 / FOU / MECH / AMECH との重複監査
2. EMAG1--EMAG4
3. EMAG5--EMAG6
4. EMAG7--EMAG8
5. MQ4 への Coulomb-potential cross-link
6. knowledge DAG / public index / series manifest
7. 数学的完全性・物理的モデル化の二系統レビュー
