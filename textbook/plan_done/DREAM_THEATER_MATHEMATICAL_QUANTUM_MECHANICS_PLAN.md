# DREAM THEATER 数理量子力学コース計画

作成日: 2026-10-07  
状態: completed

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
- 2026-10-08: MQ1 の自由 Hamiltonian の Schwartz core・本質的自己共役性、実有界ポテンシャルと相対界1未満の摂動、強可換性、自由粒子の本質スペクトル、二次形式入口を実装。詳細証明・演習 A4/B4/C1・全問詳細解答と chapter / knowledge / glossary を追加し、MQ2 を次作業に更新。
- 2026-10-08: MQ2 のスペクトル下端の変分原理、閉二次形式・形式定義域、基底状態と下端非達成例、有限次元 min–max、Rayleigh–Ritz、Gaussian 試行関数を実装。演習 A4/B4/C1 と詳細解答を追加し、MQ3 を次作業に更新。

- 2026-10-08: MQ3 のユニタリ無次元化、ladder 構成と Hermite 多項式、Fourier 一意性による完全性、Schwartz core からの本質的自己共役性、全スペクトル・レゾルベント、直接解との比較を実装。演習 A4/B4/C1 と詳細解答を追加し、MQ4 を次作業に更新。

- 2026-10-08: MQ4「中心力ポテンシャルと水素原子」を実装。Hardy 不等式による相対界0と自己共役性、球面調和関数の部分波分解、原点境界、動径因数分解による負固有値の完全列挙、相対コンパクト性と Weyl 列による本質スペクトル、Laguerre 波動関数・規格化・縮退、A4/B4/C1 と全問詳細解答を収録。公開索引・系列 manifest・work-state を MQ4 完了へ更新。EMAG3 からの Coulomb 入力を参照して物理学側との接続を実施。
- MQ0--MQ4 は章単位の実装を終了。PLAN 第9節の新井『ヒルベルト空間と量子力学』との到達内容の横断照合および系列全体の追加査読は別の作業として残すため、PLAN は `plans_progress/` を維持する。第三者による独立査読が完了したという主張はしない。

- 2026-10-08: 下記第11節の系列横断監査を実施。内積規約・Hilbert基底係数・Rayleigh–Ritz添字を修正し、MQ4のレゾルベント恒等式の導出とMQ1の区間/リンクも補修。出版社の目次照合、公開索引、章別45題の詳細解答・主要証明の棚卸しと再読を完了。変更差分と査読根拠はPR #858に記録。CIはPRの最終コミットに対するチェックで確認する。

## 11. MQ0–MQ4 系列横断監査（2026-10-08）

### 到達内容の横断照合

新井朝雄『ヒルベルト空間と量子力学 改訂増補版』の第5–8章の章・節構成と、既存 QM1–QM8 および MQ0–MQ4 の責務を照合した。対応は第5章の微分作用素・Schrödinger 作用素の自己共役性・スペクトルに MQ1、第6章の量子力学の数学的原理・量子化・Heisenberg 方程式・変分原理に QM1–QM8、MQ0、MQ2、第7章の調和振動子に MQ3、第8章の球対称ポテンシャル・水素様原子に MQ4 である。第5章の一般化 Laplace 作用素の一般論など、計画書で独立の到達目標にしていない内容まで本系列が網羅すると主張しない。比較元の目次情報は出版社の書誌および書店の目次情報で確認した。

### 実本文による数学・物理・読者粒度の監査

- MQ0：位相空間と測定確率、CCR と混合積の順序、二つの描像、三因子の積の微分、単位・規格化を照合。物理的な「正準量子化は選択である」という留保を維持。
- MQ1：Fourier 最大乗算定義域と Schwartz core の二段近似、相対界 1 未満の resolvent/グラフノルム、強可換性、自由粒子の連続スペクトルを照合。本文末の本質スペクトルの区間表記および MQ2 へのリンクを修正。
- MQ2：スペクトル射影の下端への集中、閉形式と作用素定義域、min–max、有限次元 Rayleigh–Ritz の係数表示、Gaussian 試行関数積分を照合。内積が第1変数線形の場合の行列成分の添字を修正し、二重和を追記。
- MQ3：生成・消滅演算子、Hermite の ladder と Rodrigues、Gaussian 重みからの Fourier 一意性による完全性、最大対角作用素・Schwartz core、分散計算を照合。既存 QM 系列の内積規約に従って展開係数と随伴計算を修正。
- MQ4：換算質量、Hardy 不等式と相対界、部分波のユニタリ性・原点条件、動径因数分解、Weyl 列の両方向、Laguerre 積分と (n^2) 重複度を照合。相対コンパクト性からのレゾルベントの連結を三次元の作用素定義域上で展開し、prerequisite 外の FA5 参照による論理飛躍を解消。

各章の learning objectives、本文中の全主要命題・定理と証明、演習 A1–A4/B1–B4/C1（全45題）の問題文・詳細解答を対象に、数学的完全性の検算と、前提だけで中間操作を追えるかの別観点の再読を行った。代表的な章別の式と演習ID・具体的箇所・指摘履歴は本作業の PR 本文に記載する。両査読パスは同一担当・同一実行コンテキスト内で実施しており、第三者の独立査読とは称しない。

### routing / DAG / 公開索引

MQ0–MQ4 の各 `chapter.yaml` の直接 prerequisites と `knowledge.yaml` の concept requires を確認した。`textbook/dream-theater-index.json`、科目索引 `textbook/dream-theater.md` の各5章へのパス、MQ series manifest の5章 completed および `next_work: null` を照合した。機械依存の追加や concept alias の水増しは行っていない。

### 検証ゲート

変更章の exercise count、concept/knowledge、formal/proof、Pages link/数式に対する PR #858 の必須 CI と、差分・査読根拠を確認したうえで main に反映する。上記の章本文・索引・manifest の照合を終えたため、PLAN の機械上の完了移動は PR と同じ変更単位に含める。CI 未成功の段階で PR を merge しない。
