# DREAM THEATER 数理量子力学コース計画

作成日: 2026-10-07  
状態: in_progress

## 0. 目的

既存 QM1--QM8 の「量子力学基礎」を受け、具体的な Schrödinger 作用素を解析して **調和振動子と水素原子まで自力で到達する一学期の数理量子力学**を新設する。

本科目は物理前提を暗黙に置かない。古典力学 I・解析力学 I・電磁気学 I で確立した物理概念を参照し、QM1--QM8 で確立した Hilbert 空間形式を再利用する。

中心問いは、

> 具体的な古典 Hamiltonian を自己共役作用素として厳密化し、そのスペクトルから量子系のエネルギーと状態をどう求めるか。

とする。

## 1. 市販教科書との照合

主参照:

- 新井朝雄『ヒルベルト空間と量子力学 改訂増補版』共立出版  
  https://www.kyoritsu-pub.co.jp/book/b10004582.html

同書の後半では、

- 偏微分作用素の本質的自己共役性とスペクトル
- 量子力学の数学的原理
- 最低エネルギーに対する変分原理
- 量子調和振動子
- 球対称ポテンシャルと水素原子

までを扱う。本科目は既存 QM1--QM8 と重なる基礎を再実装せず、特に同書第5--8章に対応する具体的スペクトル解析を主線にする。

必要に応じて、標準的な量子力学教科書の調和振動子・角運動量・水素原子の計算順序も比較するが、厳密性の基準は自己共役性・定義域・スペクトルを曖昧にしない数理量子力学側に置く。

## 2. prerequisite

数学:

- Fourier 解析 FOU1--FOU4
- PDE5 / PDE11 の Laplace 方程式・球面調和関数
- 測度論・$L^2$
- 関数解析 I / II
- EVOL1 の閉作用素一般論
- QM3, QM5, QM6, QM7, QM8

物理:

- MECH3: エネルギー・ポテンシャル
- MECH5: 調和振動子
- MECH6--MECH7: 中心力・2体問題・換算質量
- AMECH5--AMECH6: Hamiltonian・Poisson 括弧
- EMAG3: Coulomb ポテンシャル

標準通読では古典力学 I → 解析力学 I / 電磁気学 I → QM1--QM8 → 本科目を推奨する。ただし chapter.yaml では各章に直接必要な最小 dependency を記述し、電磁気学全章などを不必要に強制しない。

## 3. 既存 QM1--QM8 との責務境界

canonical owner は維持する。

- 状態・観測量・Born 則: QM1--QM2
- PVM・有界自己共役スペクトル定理: QM3
- 非可換性・不確定性: QM4
- 非有界作用素・自己共役性: QM5
- 非有界自己共役スペクトル定理: QM6
- Stone の定理・Schrödinger 発展: QM7
- CCR / Weyl / Stone--von Neumann 入口: QM8

MQ 系列ではこれらを具体的 Hamiltonian に適用する。

## 4. 章構成

ユーザーとの設計合意を保持し、MQ0--MQ4 を主線とする。

### MQ0 古典力学から数理量子力学への橋

役割は物理学をゼロから再講義することではなく、既習の古典・解析力学と QM1--QM8 を接着することである。

- 古典状態 $(q,p)$ と量子状態
- 古典物理量 $f(q,p)$ と自己共役作用素
- $H(q,p)$ と量子 Hamiltonian
- 正準量子化の基本例
- $q\mapsto Q$, $p\mapsto P$
- ordering ambiguity
- Poisson 括弧と交換子の対応は厳密な一般同型ではないこと
- Schrödinger picture / Heisenberg picture
- Heisenberg の運動方程式
- 単位・$\hbar$・無次元化
- 本科目で扱う三つのモデル: 自由粒子、調和振動子、Coulomb 系

MQ0 は「最小物理の代替」ではなく、セメスター級の物理科目を履修済みとした統合章とする。

### MQ1 微分作用素・Schrödinger 作用素と本質的自己共役性

- Schwartz 空間の再利用
- $-i\nabla$, $-\Delta$
- 最小作用素と閉包
- 本質的自己共役性
- core
- Fourier 変換による自由 Hamiltonian
- $H=-\frac{\hbar^2}{2m}\Delta+V$
- potential perturbation
- quadratic form への入口
- 強可換性の必要部分
- Schrödinger 作用素のスペクトル
- 離散スペクトル / 本質スペクトルへの入口

Kato--Rellich 等を使う場合は主張・仮定・証明責務を明確にし、名前だけで本質的自己共役性を済ませない。

### MQ2 変分原理・二次形式・基底状態

- semibounded self-adjoint operator
- quadratic form
- Rayleigh quotient
- スペクトル下端
- min--max 原理への入口
- 変分原理
- trial function
- ground-state energy
- 離散固有値が存在する条件
- 有限次元 Rayleigh--Ritz との接続
- 具体的 trial function の評価

中心式

$$
\inf\sigma(H)
=
\inf_{\psi\in D(H),\ \|\psi\|=1}
\langle\psi,H\psi\rangle
$$

の適用条件を明示する。

### MQ3 量子調和振動子

古典 MECH5 / AMECH5 から

$$
H=\frac{P^2}{2m}+\frac12m\omega^2Q^2
$$

を導入する。

- Hamiltonian の自己共役性
- 無次元化
- creation / annihilation operator
- CCR と因数分解
- ground state
- Hermite 関数
- ladder construction
- 完全性
- 固有値
  $$
  E_n=\hbar\omega\left(n+\frac12\right)
  $$
- スペクトルがこれで尽くされること
- Schrödinger 方程式の直接解との比較
- zero-point energy

形式的な $a,a^*$ 計算だけで定義域問題を消さない。

### MQ4 中心力ポテンシャルと水素原子

物理入力:

- MECH7 の2体問題・換算質量
- EMAG3 の Coulomb ポテンシャル

から水素様原子の Hamiltonian

$$
H=
-\frac{\hbar^2}{2\mu}\Delta
-
\frac{Ze^2}{4\pi\varepsilon_0r}
$$

を構成する。

扱う内容:

- 回転対称性
- 角運動量作用素
- $L^2$ と $L_z$
- 強可換性・同時スペクトル分解の必要部分
- 球面調和関数は PDE11 を再利用
- 球座標での Laplacian
- partial-wave decomposition
- radial Schrödinger equation
- $r=0$ の境界条件
- Coulomb Hamiltonian の自己共役性
- bound states
- principal / orbital / magnetic quantum numbers
- energy levels
  $$
  E_n=-\frac{\mu Z^2e^4}{2(4\pi\varepsilon_0)^2\hbar^2n^2}
  $$
- degeneracy
- continuum spectrum への入口
- 水素原子のスペクトルが何を説明するか

「球座標へ変数分離すれば終わり」にせず、Hilbert 空間の分解と作用素の定義域を追う。

## 5. MQ4 までで到達するもの

新井『ヒルベルト空間と量子力学』との比較では、既存 QM1--QM8 と本 MQ0--MQ4 を合わせて、

- Hilbert 空間形式
- 自己共役作用素
- スペクトル定理
- 本質的自己共役性
- Stone の定理
- 正準量子化
- Heisenberg 運動方程式
- 変分原理
- 量子調和振動子
- 球対称ポテンシャル
- 水素原子

まで一続きに読める状態を目標とする。

## 6. 本科目に含めないもの

- 散乱理論の完全理論
- 多体 Schrödinger 作用素
- Fock 空間
- 第二量子化
- 相対論的量子力学
- Dirac 方程式
- 量子場理論
- path integral の厳密構成
- adiabatic theorem の一般論
- semiclassical analysis の一般論

これらは将来の独立 PLAN とする。

## 7. 教育設計

各モデルは

古典モデル
→ Hamiltonian
→ Hilbert 空間と定義域
→ 自己共役性
→ スペクトル
→ 測定可能量としての意味
→ 時間発展

の順で閉じる。

物理的意味と数学的定理を混同しない。特に量子化規則を古典理論からの数学的定理として導いたように書かない。

理由付き例外がなければ各章 Level A 4題、B 3題、C 1題以上、全問詳細解答。

## 8. 完成条件

- 古典 Hamiltonian から量子 Hamiltonian へ移る際のモデル化の選択を説明できる。
- 自由 Hamiltonian と代表的 Schrödinger 作用素の自己共役性を定義域込みで扱える。
- スペクトル下端と変分原理を使える。
- 調和振動子の全スペクトルと固有関数を構成できる。
- 水素原子を2体問題から換算質量へ縮約できる。
- Coulomb ポテンシャルの物理的由来を説明できる。
- 球面調和関数と動径方程式から bound-state spectrum を導ける。
- QM1--QM8 の抽象理論が具体的量子系で何をしているかを説明できる。

## 9. 実装順

1. QM1--QM8 / PDE11 / FOU / EVOL1 / MECH / AMECH / EMAG との重複監査
2. MQ0
3. MQ1
4. MQ2
5. MQ3
6. MQ4
7. 新井『ヒルベルト空間と量子力学』第5--8章との到達監査
8. knowledge DAG / public index / series manifest
9. 数学的完全性・物理的意味・読者粒度の三系統レビュー

## 10. 実装・検証進捗

- 2026-10-08: MQ 系列の PLAN 固有の着手作業を開始。対象を MQ0--MQ4 と確認し、work-state の active series を MQ、next_work を MQ0 に切り替え、MQ series manifest を作成。
- 2026-10-08: 依存境界の着手時監査として、QM3 の PVM・有界自己共役スペクトル定理、QM5 の位置/運動量作用素と自己共役性、QM6 の非有界スペクトル定理、QM7 の Stone 理論、QM8 の CCR/Weyl、MECH5 の古典調和振動子、MECH7 の換算質量、AMECH5--AMECH6 の Hamilton 形式/Poisson 括弧、EMAG3 の Coulomb ポテンシャルの既存章設計を照合。MQ0 はこれらの再証明ではなく、量子化の選択・対応と描像の橋渡しを中心にする。
- 2026-10-08: MQ0 の本文・演習 A4/B4/C1・詳細解答・chapter.yaml / knowledge.yaml を実装。MQ0 の公開索引を追加し、MQ1 を次の作業として series / work-state に反映。
- EMAG 計画には MQ4 への Coulomb ポテンシャル cross-link が残るため、MQ4 実装時まで EMAG の PLAN は進行中のまま保つ。
