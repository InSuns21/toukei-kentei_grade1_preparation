# DREAM THEATER 可積分系と摂動論・KAM コース計画

作成日: 2026-10-07  
状態: completed（2026-10-13。INT1〜INT8の公開実装・INT8追跡監査・系列の終了条件を確認）

## 0. 目的

有限次元 Hamilton 系について、**Liouville 可積分性・Liouville--Arnold 定理・作用角変数・近可積分系・共鳴・Birkhoff 標準形・KAM 理論**を一続きに学ぶ。

中心問いは、

> 十分な数の保存量がある Hamilton 系はなぜ「解ける」のか。また、その可積分性を小さく壊したとき、どの秩序が残り、どこから複雑な運動が生じるのか。

とする。

「可積分系と摂動論」と「可積分系・KAM」を別 PLAN に分けず、本計画を finite-dimensional Hamiltonian integrability / near-integrability の canonical owner とする。

## 1. 市販教科書との照合

主参照:

- 伊藤秀一『常微分方程式と解析力学』共立出版  
  https://www.books.or.jp/book-details/9784320015630
- 柴山允瑠『重点解説 ハミルトン力学系―可積分系とKAM理論を中心に―』サイエンス社  
  https://saiensu.co.jp/search/?isbn=978-4-7819-9001-9&y=2023
- V. I. Arnold, *Mathematical Methods of Classical Mechanics*, Springer  
  https://link.springer.com/book/10.1007/978-1-4757-2063-1
- 中村佳正・高崎金久・辻本諭・尾角正人・井ノ口順一『解析学百科II 可積分系の数理』朝倉書店  
  https://www.asakura.co.jp/detail.php?book_code=11727

伊藤の「完全積分可能系 → Arnold--Jost 型定理 → 摂動 → Birkhoff 標準形 → twist map → KAM」と、柴山の「可積分系 → Poincare 非可積分性 → KAM → 制限三体問題 → Arnold 拡散」を本科目の主線の基準にする。

朝倉書店『可積分系の数理』は古典可積分系に加えて Lax 表示・離散可積分系・ソリトン等まで広いが、本科目では有限次元 Hamilton 系に射程を限定する。

## 2. prerequisite

必須:

- 解析力学 I（AMECH1--AMECH8）
- [シンプレクティック幾何学I](./DREAM_THEATER_SYMPLECTIC_GEOMETRY_I_PLAN.md)のSYM1〜4（シンプレクティック形式、Hamilton流、Poisson構造）。全SYM8講を機械的に必須としない
- ODE の流れ・Poincare 写像
- Fourier 級数の基本
- 多変数解析

推奨:

- [幾何学的力学I](./DREAM_THEATER_GEOMETRIC_MECHANICS_I_PLAN.md)のGMECH1〜3（Lie群作用と運動量写像）。INTの章ごとに実際の援用を確認する
- Diophantine approximation の初歩
- 複素解析の Cauchy estimate の基本

KAM の証明で使う解析的評価は必要な範囲を本文で補う。読者に未履修の小分母評価を暗黙前提にしない。

## 3. 章構成

候補 ID: INT1--INT8。

### INT1 第一積分と Liouville 可積分性

- first integral
- functional independence
- Poisson involution
- $n$ degrees of freedom
- Liouville integrability
- regular common level set
- harmonic oscillator / central force
- 「保存量が多い」と「可積分」の違い

次元と独立性を毎回確認し、第一積分の個数だけで可積分性を判定しない。

### INT2 Liouville--Arnold 定理

- commuting Hamiltonian vector fields
- compact connected regular level set
- torus structure
- straightening of the flow
- quasi-periodic motion
- frequency vector
- proof architecture

定理の仮定を省略せず、なぜ compactness と regularity が必要かを例・反例で確認する。

### INT3 作用角変数

- action variables
- angle variables
- canonical form
- Hamiltonian $H=H(I)$
- frequencies
- 1自由度の周期運動
- harmonic oscillator
- pendulum away from separatrix

作用積分を実際に計算し、単なる存在定理で終えない。

### INT4 近可積分 Hamilton 系と小分母

- $H(I,\theta)=H_0(I)+\varepsilon H_1(I,\theta)$
- Fourier expansion
- homological equation
- resonance
- nonresonant denominator
- small divisor problem
- Diophantine condition
- secular term

形式的摂動級数がなぜ一様に正当化できないかを、分母の構造から示す。

### INT5 正準摂動論と共鳴

- near-identity canonical transformation
- generating function
- averaging
- resonant normal form
- slow angle / fast angle
- resonance zone
- pendulum model
- separatrix

天体力学の secular / resonant perturbation へつながる有限自由度の基礎を置く。

### INT6 Birkhoff 標準形

- elliptic equilibrium
- linear symplectic normalization
- homogeneous expansion
- nonresonance
- Birkhoff normal form
- formal integrability
- remainder
- stability information

「標準形が得られた」ことと「級数が収束する」ことを区別する。

### INT7 twist map と Poincare--Birkhoff

- area-preserving map
- annulus
- twist condition
- invariant curves
- Poincare map
- Poincare--Birkhoff fixed point theorem
- periodic orbits
- resonance chain への入口

連続時間 Hamilton 系から離散写像へ落とす意味を明示する。

### INT8 KAM 定理と可積分性の破れ

- Kolmogorov nondegeneracy
- Diophantine frequency
- persistence of invariant tori
- Cantor-like surviving set
- destroyed resonant tori
- KAM theorem statement
- proof mechanism: iterative normalization / quadratic convergence の見取り図
- restricted three-body problem への橋
- Arnold diffusion / inverse KAM の入口

本科目では少なくとも一つの標準的 KAM 定理について、仮定・結論と反復構成の核心を本文で閉じる。全技術補題をブラックボックス化しない。

## 4. canonical ownership と境界

本科目が canonical owner:

- finite-dimensional Liouville integrability
- Liouville--Arnold theorem
- action--angle variables
- near-integrable Hamiltonian perturbation
- small divisor / Diophantine condition
- resonant normal form
- Birkhoff normal form
- KAM theorem の有限次元標準形
- Arnold diffusion への入口

他系列を参照:

- シンプレクティック多様体：[SYM](./DREAM_THEATER_SYMPLECTIC_GEOMETRY_I_PLAN.md)。運動量写像と簡約：[GMECH](./DREAM_THEATER_GEOMETRIC_MECHANICS_I_PLAN.md)。該当定理だけを直接前提にする
- generic invariant manifold / chaos / symbolic dynamics: 力学系
- restricted three-body / solar system applications: CELE 系列
- KdV / Toda / inverse scattering / Lax pair / soliton / discrete integrable systems: 将来の可積分 PDE・離散可積分系列

## 5. 教育設計

主線は次とする。

```text
保存量が n 個あり Poisson 可換
  ↓
共通レベル集合
  ↓
不変トーラス
  ↓
作用角変数で直線運動
  ↓
小さな摂動
  ↓
共鳴・小分母
  ↓
標準形
  ↓
KAM により一部トーラスが存続
```

継続例:

- harmonic oscillator
- nonlinear oscillator
- pendulum
- central force
- simple coupled oscillators
- restricted three-body の局所モデル

理由付き例外がなければ各章 Level A 4題、B 3題、C 1題以上、全問詳細解答。

## 6. 完成条件

- 第一積分の functional independence と involution を確認できる。
- Liouville--Arnold 定理の仮定と結論を正確に述べ、トーラスが現れる理由を説明できる。
- 作用角変数を1自由度・代表的2自由度系で計算できる。
- small divisor が Fourier mode の除算から生じることを導ける。
- resonance と averaging / normal form の関係を説明できる。
- Birkhoff normal form の formal 性と remainder を区別できる。
- KAM 定理の非退化条件・Diophantine 条件・存続トーラスの意味を説明できる。
- 三体問題で「KAM が何を救い、何を救わないか」を読む準備ができている。

## 7. 実装順

1. SYM / GMECH / ODE / DYN / CELE との重複・証明owner監査
2. INT1--INT3
3. INT4--INT5
4. INT6--INT7
5. INT8
6. CELE 系列への cross-link
7. knowledge DAG / public index / series manifest
8. 数学的完全性・読者粒度の二系統レビュー

## 8. 着手時の前提・証明担当監査（2026-10-12）

- AMECH1〜8 と SYM1〜8 の系列manifestはすべて `completed`。SYM4にHamiltonベクトル場・Poisson括弧・座標計算、AMECH6にPoisson力学の基礎がある。ODEの既存教材にも流れ・Poincaré写像へ接続する前提教材がある。未実装のINT定理をこれらの既存正本に仮託しない。
- GMECH1〜8 は完了・横断確認済み。GMECH8は可換保存量と微分の独立性の**具体例・境界**までを担当する。INT1は `2n` 次元での独立な第一積分の個数とinvolutionを新たに形式化し、Liouville可積分性の正本を所有する。
- INT2のLiouville–Arnold証明とINT3の作用角変数は本科目が所有し、SYMやGMECHの相対平衡・簡約の証明を重複させない。INT4以降の小分母・共鳴・Birkhoff・KAMも本科目の担当とする。CELE/DYN等は応用・別の機構として必要箇所で参照する。
- `textbook/dream-theater-series/INT.yaml` を新設してINT1〜8を `planned` とし、先頭のINT1を次の着手章に確定した。未作成の章本文・knowledge metadata・公開索引は先行公開しない。
- 次作業：INT1のchapter/knowledge/本文を新規執筆し、必要なcanonical stable anchor・A4/B3/C1以上の演習・詳細解答と新規章の区分C査読・CIを完成させる。

## 9. 完了時の実装・境界確認（2026-10-13）

- `INT1`〜`INT8` は全て系列 manifest 上 `completed`。8章とも本文・主要結果のstable anchor・証明ブロック・全演習解答を持ち、各章は Level A 4題以上、Level B 3題以上、Level C 1題以上を満たす。公開索引の登録も確認する。
- `INT8` の追跡監査ではKAM定理、解析的ホモロジー方程式、一段のNewton正規化、二次反復、共鳴帯評価と A1〜A5/B1〜B3/C1 を通読・再計算。反復で作用半径を減らす場合のCauchy損失と半径管理を補強した。査読の具体的再導出・未確認事項は完了時PRの査読記録を参照。
- CELEとの接続は、INT1〜INT5の保存量・作用角・共鳴と、INT8のKAM定理をcanonical ownerとして残し、天体力学モデル特有の三体・Lagrange点・Jacobi積分・長期安定性をCELE側で扱う。後続計画は[天体力学・三体問題](../plans_progress/DREAM_THEATER_CELESTIAL_MECHANICS_THREE_BODY_CHAOS_PLAN.md)。
- INT1〜INT7の過去の数学的査読を本項で独立再実施したとは主張しない。最終的な公開・数式・リンク検証は完了時PRのCIで確認する。
