# DREAM THEATER 解析力学 I コース計画

作成日: 2026-10-07  
状態: completed

## 0. 目的

古典力学 I で得た Newton 方程式と保存則を、**一般化座標・作用・Lagrangian・Hamiltonian・Poisson 括弧**によって再構成する一学期の解析力学を新設する。

中心問いは、

> 座標や拘束が複雑でも、運動を一つの変分原理と位相空間の構造から統一的に記述できるか。

とする。

数理量子力学へ必要な $q,p,H$ を単なる記号として渡さず、古典力学での意味と生成される運動を理解した上で量子化へ進ませる。

## 1. 市販教科書との照合

主参照:

- 原島鮮『力学 II（新装版）―解析力学―』裳華房  
  https://www.shokabo.co.jp/textbook/ph4.html
- 宮下精二『解析力学』裳華房  
  https://www.shokabo.co.jp/textbook/ph4.html
- 久保謙一『解析力学』裳華房  
  https://www.shokabo.co.jp/textbook/ph4.html
- 田辺行人・品田正樹『理・工基礎 解析力学』裳華房  
  https://www.shokabo.co.jp/textbook/ph4.html

裳華房の紹介では、解析力学の標準概念として作用積分、Lagrangian、Hamiltonian、正準変数、位相空間、Poisson 括弧が挙げられ、量子力学への接続も明示されている。これを DREAM THEATER の一学期コアの基準とする。

Goldstein 等で扱われる高度な剛体論は必要量を選ぶ。Hamilton--Jacobi は AMECH8 で入口を閉じる一方、シンプレクティック幾何・Lie 群作用・運動量写像・簡約は `DREAM_THEATER_ANALYTICAL_MECHANICS_II_GEOMETRIC_SYMMETRY_PLAN.md`、Liouville--Arnold・作用角変数・Birkhoff・KAM は `DREAM_THEATER_INTEGRABLE_SYSTEMS_PERTURBATION_KAM_PLAN.md` へ送る。

## 2. prerequisite

必須:

- 古典力学 I の MECH1--MECH7 相当
- 多変数微積分
- 線形代数
- ODE1--ODE4

推奨:

- PDE12 Hamilton--Jacobi 方程式は AMECH8 で canonical dependency として参照する。

## 3. 章構成

候補 ID: AMECH1--AMECH8。

### AMECH1 拘束と一般化座標

- holonomic constraint
- configuration space
- 自由度
- 一般化座標
- 仮想変位
- 一般化力
- 極座標・球座標・振り子
- Newton 方程式を座標変換だけで扱う煩雑さ

### AMECH2 d'Alembert 原理と Lagrange 方程式

- 拘束力
- d'Alembert 原理
- 仮想仕事
- Lagrange 方程式
- 自然な Lagrangian $L=T-V$
- 振り子・中心力・連成振動子

適用条件を明示し、式変形だけで拘束力が消えるように見せない。

### AMECH3 作用積分と Hamilton の原理

- 汎関数としての作用
- 固定端変分
- Euler--Lagrange 方程式
- Hamilton の原理
- 境界項
- total derivative を加えた Lagrangian
- 変分法と物理原理の区別

Euler--Lagrange の数学的導出は既存変分法の canonical result があれば参照し、物理的意味を本章の責務とする。

### AMECH4 対称性・循環座標・Noether の定理

- cyclic coordinate
- 一般化運動量
- 時間並進とエネルギー
- 空間並進と運動量
- 回転と角運動量
- 1パラメータ変換
- Noether の定理
- 古典力学 I の保存則を再解釈

Noether は「対称性があると保存する」という標語だけで終えず、有限自由度の力学で証明を閉じる。

### AMECH5 Legendre 変換と Hamilton 形式

- 共役運動量
- regular Lagrangian
- Legendre 変換
- Hamiltonian
- Hamilton の正準方程式
- 位相空間
- $H=T+V$ となる条件
- 調和振動子
- 中心力

数理量子力学で使う

$$
H(q,p)=\frac{p^2}{2m}+V(q)
$$

の canonical owner とする。

### AMECH6 Poisson 括弧と Hamiltonian flow

- Poisson 括弧
- 基本関係 $\{q_i,p_j\}=\delta_{ij}$
- 時間発展 $\dot f=\{f,H\}+\partial_t f$
- 保存量
- 角運動量の Poisson 代数
- Hamiltonian flow
- Liouville の定理への入口

QM8 の交換子との比較は「類似」であって同一視しない。

### AMECH7 正準変換

- canonical transformation
- Poisson 括弧を保つ変換
- generating function
- time-dependent canonical transformation
- simple examples
- phase-space viewpoint
- symplectic form への入口

シンプレクティック多様体の一般論は将来の独立科目へ送る。

### AMECH8 Hamilton--Jacobi 理論

- Hamilton--Jacobi 方程式
- principal function
- characteristic function
- 完全積分
- 1自由度の例
- 中心力の作用
- 幾何光学との類似への入口
- PDE12 との責務分担
- WKB / 半古典近似へ向かう見取り図

PDE としての Hamilton--Jacobi 方程式の一般理論は PDE12 / HJC 系を canonical owner とし、本章は解析力学から式が現れる理由を担当する。

## 4. 数理量子力学との接続

本科目から MQ へ渡すものは、

- 状態変数 $(q,p)$
- Hamiltonian $H(q,p)$
- 共役変数
- Poisson 括弧
- Hamiltonian が時間発展を生成するという見方
- 調和振動子
- 中心力
- 作用

である。

量子化で

$$
q\mapsto Q,\qquad p\mapsto P,\qquad H(q,p)\mapsto \widehat H
$$

と移る際、これは一般に一意な写像ではなく、ordering 等の問題を含むモデル化であることを MQ0 で明示する。

## 5. 境界

本科目に含めない:

- シンプレクティック多様体・Lie 群作用・運動量写像・簡約の一般論（解析力学 II）
- 無限次元 Hamilton 系
- 場の理論
- Dirac constraint theory
- Liouville--Arnold・作用角変数・Birkhoff・KAM（可積分系と摂動論）
- 三体問題・Hamiltonian chaos の発展理論（天体力学系列）
- 量子化の一般理論

既存 PDE12 の Hamilton--Jacobi 方程式を重複実装しない。

## 6. 教育設計・演習

各章で具体系を最低一つ最後まで計算する。抽象的な座標変換だけで進めない。

継続例:

- 単振り子
- 調和振動子
- 2体中心力
- 連成振動子

理由付き例外がなければ各章 Level A 4題、B 3題、C 1題以上、全問詳細解答。

## 7. 完成条件

- 拘束系から一般化座標を選べる。
- Hamilton の原理から Lagrange 方程式を導ける。
- Noether の定理を有限自由度で証明し、三つの基本保存則へ適用できる。
- regularity 条件を確認して Legendre 変換できる。
- Hamilton 方程式と Poisson 括弧を使える。
- Hamilton--Jacobi 方程式が力学から現れる過程を説明できる。
- MQ0 で古典 Hamiltonian と量子 Hamiltonian の違いを理解する準備ができている。

## 8. 実装順

1. MECH / PDE12 / HJC / 最適制御との重複監査
2. AMECH1--AMECH4
3. AMECH5--AMECH6
4. AMECH7--AMECH8
5. 解析力学 II / 変分問題 / 可積分系 / MQ0 への cross-link
6. knowledge DAG / public index / series manifest
7. 数学的完全性・物理的意味の二系統レビュー


## 9. 進捗

- 2026-10-07: AMECH1「拘束と一般化座標」を実装・査読し、系列 manifest / routing / public index を更新。
- 2026-10-07: AMECH2「d'Alembert 原理と Lagrange 方程式」を実装・査読し、系列 manifest / routing / public index を更新。
- 2026-10-07: AMECH3「作用積分と Hamilton の原理」を実装・査読し、系列 manifest / routing / public index を更新。
- 2026-10-07: AMECH4「対称性・循環座標・Noether の定理」を実装・査読し、有限自由度の Noether の定理と三つの基本保存則を接続。
- 2026-10-07: AMECH5「Legendre 変換と Hamilton 形式」を実装・査読し、正則性から Legendre 写像の局所可逆性、Hamilton の正準方程式、相空間、自然なラグランジアンと中心力の具体計算まで接続。
- 2026-10-07: AMECH6「Poisson 括弧と Hamiltonian flow」を実装・査読し、Poisson 括弧による時間発展・保存量、角運動量の括弧関係、Hamiltonian flow、Liouville の位相体積保存まで接続。
- 2026-10-07: AMECH7「正準変換」を実装・査読し、Poisson 括弧保存、Jacobian 行列条件、Hamiltonian flow の正準性、第2種母関数、時間依存正準変換から Hamilton--Jacobi 方程式への入口まで接続。
- 2026-10-08: AMECH8「Hamilton--Jacobi 理論」を実装・査読し、母関数からの Hamilton--Jacobi 還元、Hamilton の主関数と端点微分、完全積分、1自由度の求積、中心力分離、Kepler 軌道まで接続。
- 2026-10-08: PDE12 との責務分担、幾何光学・半古典近似への見取り図、解析力学 II・変分問題・可積分系・数理量子力学への接続を確認し、解析力学 I 系列を完了。
