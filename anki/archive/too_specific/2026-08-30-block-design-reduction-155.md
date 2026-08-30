---
id: engdesign-weighted-contrast-covariance
title: 不等反復で2コントラストの共分散を判定する
category: applied-engineering
subcategory: engineering-design
topic: unequal-replication-contrasts
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 実験の計画と実施
  - 不等反復
  - コントラスト
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 直交表
archive_reason: low_priority
canonical_card: design-orthogonal-array-basic
archive_note: 不等反復では通常の係数内積ではなく反復数で重み付けされた共分散を見るという注意は直交表canonical
  cardに保持済み。専用の共分散数値代入は600枚正本では独立カードにしない。
---
## 問題
3処置の独立標本数が $(2,4,4)$、コントラスト係数が $\boldsymbol c=(1,-1,0)$、$\boldsymbol d=(1/2,1/2,-1)$ である。誤差分散を $\sigma^2$ として両推定量の共分散を求めよ。
## 記号・用語
各係数ベクトルは成分和0を満たし、$\widehat C=\sum_i c_i\overline Y_i$、$\widehat D=\sum_i d_i\overline Y_i$ とする。
## 使用公式・定理
独立・等分散誤差では $\operatorname{Cov}(\widehat C,\widehat D)=\sigma^2\sum_i c_id_i/n_i$。
## 一手／方針
反復数を分母に入れた重み付き内積を計算する。
## 答え
$$\operatorname{Cov}(\widehat C,\widehat D)=\sigma^2\left(\frac{1/2}{2}-\frac{1/2}{4}\right)=\frac{\sigma^2}{8}.$$
## 計算例
共分散が0でないため、この不等反復計画では両コントラストは直交しない。
## 注意
係数の通常内積だけを0にしても、不等反復では無相関にならない。

<!-- CARD -->

---
id: engdesign-cyclic-incomplete-blocks
title: 基本ブロックを巡回して不完備ブロック計画を作る
category: applied-engineering
subcategory: engineering-design
topic: cyclic-incomplete-block
type: calc_step
difficulty: 3
priority: B
hashtags:
  - ブロック化
  - 不完備ブロック
  - 巡回計画
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブロック化
archive_reason: low_priority
archive_note: 基本ブロックを法vで巡回して計画を機械的に生成する操作は、ブロック化の中心概念より特殊。過去問対応の不完備ブロック推定可能性カードを優先し、発展隔離する。
---
## 問題
処置を $0,1,2,3,4$ とし、基本ブロック $\{0,1\}$ を法5で巡回して5ブロックを作れ。
## 記号・用語
巡回計画は基本ブロックの各処置番号へ同じ整数を法vで加える。
## 使用公式・定理
$B_s=\{(x+s)\bmod5:x\in\{0,1\}\}$、$s=0,\ldots,4$。
## 一手／方針
$s$ を0から4まで動かす。
## 答え
$\{0,1\},\{1,2\},\{2,3\},\{3,4\},\{4,0\}$。
## 計算例
各処置は2回現れ、接続グラフは5角形なので全処置対比が推定可能である。
## 注意
隣接処置対だけが共出現するためBIBDではない。

<!-- CARD -->

---
id: engdesign-incomplete-incidence-matrix
title: 不完備ブロック計画の接続行列を作る
category: applied-engineering
subcategory: engineering-design
topic: incomplete-block-incidence
type: calc_step
difficulty: 3
priority: B
hashtags:
  - ブロック化
  - 不完備ブロック
  - 接続行列
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブロック化
archive_reason: low_priority
canonical_card: engdesign-incomplete-block-connectivity
archive_note: 与えられたブロックから0-1接続行列を転記するだけのカードは、過去問対応の接続グラフによる処置対比の推定可能性判定に比べ独立演習価値が低い。
---
## 問題
処置A、B、Cとブロック1=$(A,B)$、2=$(A,C)$、3=$(B,C)$ から、行を処置、列をブロックとする接続行列 $N$ を作れ。
## 記号・用語
$N_{ij}=1$ は処置$i$がブロック$j$に入ること、0は入らないことを表す。
## 使用公式・定理
各ブロックの処置集合を列ごとの0–1指示ベクトルへする。
## 一手／方針
ブロック1、2、3についてA、B、Cの有無を順に記入する。
## 答え
$$N=\begin{pmatrix}1&1&0\\1&0&1\\0&1&1\end{pmatrix}.$$
## 計算例
各行和は反復数2、各列和はブロックサイズ2である。
## 注意
不完備ブロックでは全処置が同一ブロックにそろわないため、ブロック調整した比較を使う。

<!-- CARD -->

---
id: engdesign-bibd-parameter-check
title: BIBDのパラメータ関係を確認する
category: applied-engineering
subcategory: engineering-design
topic: bibd-parameters
type: calc_step
difficulty: 3
priority: B
hashtags:
  - ブロック化
  - BIBD
  - 不完備ブロック
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブロック化
archive_reason: low_priority
archive_note: BIBDのvr=bk、lambda(v-1)=r(k-1)への単純代入は、公式シラバスの一般的なブロック化より特殊で、現在の頻度情報も0。過去問対応の不完備ブロック推定可能性を残して発展隔離する。
---
## 問題
処置数 $v=4$、ブロックサイズ $k=3$、各処置の反復数 $r=3$、ブロック数 $b=4$ の計画がBIBDの基本関係を満たすか確認し、処置対の共出現数 $\lambda$ を求めよ。
## 記号・用語
BIBDはbalanced incomplete block design（釣合い型不完備ブロック計画）である。
## 使用公式・定理
$vr=bk$、$\lambda(v-1)=r(k-1)$。
## 一手／方針
総処置出現数を両側で確認し、第2式から$\lambda$を解く。
## 答え
$4(3)=4(3)=12$、$\lambda=3(2)/3=2$ なので基本関係を満たす。
## 計算例
各処置対がちょうど2ブロックで一緒に現れる必要がある。
## 注意
パラメータ関係は必要条件であり、整数解があっても実際の配置が存在するとは限らない。
