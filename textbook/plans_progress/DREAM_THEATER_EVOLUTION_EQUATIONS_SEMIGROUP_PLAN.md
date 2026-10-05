# DREAM THEATER 抽象発展方程式・半群論計画

作成日: 2026-10-06  
状態: in_progress

## 0. 目的

本計画は、関数解析 II の先で、時間発展偏微分方程式を

$$
u'(t)+Au(t)=F(u(t))
$$

という無限次元空間上の発展方程式として統一的に扱うための基盤を整備する。

中心となる問いは

> 具体的な熱方程式・半線形放物型方程式・Navier--Stokes 方程式で個別に現れた「時間発展」「再出発」「Duhamel 公式」「平滑化」「有限時間発散判定」を、作用素と半群の言葉でどこまで共通構造として説明できるか。

である。

本計画は、従来 DREAM_THEATER_FUNCTIONAL_ANALYSIS_OPERATOR_ALGEBRA_PLAN.md に FA8--FA10 として置かれていた発展枝を独立させ、その内容を EVOL1--EVOL6 へ拡張する。

関数解析・作用素環論の本線と、発展方程式・PDE の本線は、関数解析 II の後で分岐させる。

~~~text
関数解析 II
  ├─→ 抽象発展方程式・半群論
  │      └─→ 線形・半線形 evolution PDE
  └─→ 作用素環論 I
         └─→ 作用素環論 II
~~~

作用素環論 I / II を本系列の prerequisite にせず、本系列を作用素環論 I / II の prerequisite にもしない。

---

## 1. canonical ownership

責務を次のように分ける。

| 主題 | canonical owner |
|---|---|
| Banach / Hilbert 空間・有界作用素 | 関数解析 I |
| 弱位相・スペクトル・コンパクト作用素・Fredholm | 関数解析 II |
| 閉作用素・生成作用素・半群・抽象 Cauchy 問題 | 本計画 |
| Banach 環・$C^*$-環・GNS・von Neumann 環 | DREAM_THEATER_FUNCTIONAL_ANALYSIS_OPERATOR_ALGEBRA_PLAN.md |
| heat kernel の具体解析・$L^p$--$L^q$ decay・自己相似 | NPDE 系列 |
| 半線形熱方程式の具体的 blow-up / Fujita 型現象 | NPDE6 |
| Navier--Stokes 固有の Stokes 作用素・非線形項・正則性問題 | NS 系列 |
| 多様体上の heat semigroup / Laplace--Beltrami | DREAM_THEATER_GEOMETRIC_ANALYSIS_PLAN.md |
| Markov semigroup / stochastic generator | 確率解析側の既存・将来正本 |

本系列では、具体的 PDE の定理を抽象化するために既存 NPDE / NS の証明を置き換えない。既存章は従来どおり自己完結させ、本系列は後から一般構造を見抜くための発展科目とする。

---

## 2. prerequisite 方針

### 2.1 必須候補

章ごとに直接依存を固定するが、系列全体として主要な前提候補は次とする。

- 関数解析 I の Banach / Hilbert 空間、有界線形作用素、閉グラフ定理
- 関数解析 II のレゾルベント・スペクトルの基本
- ODE の局所存在・最大解・再出発の考え方
- Lebesgue 積分と Bochner 型積分を使う場合に必要な測度論
- 必要な章だけ Fourier / Sobolev / PDE の具体例

### 2.2 prerequisite にしないもの

- 作用素環論 I / II
- Navier--Stokes 全系列
- 非線形 PDE 全系列
- 幾何解析
- 確率解析 II

具体例として参照するだけの後続理論を prerequisite に追加しない。

### 2.3 定義域を省略しない

非有界作用素では

$$
A:D(A)\subset X\to X
$$

の定義域 $D(A)$ が理論の一部である。

「$A$ を作用素とする」とだけ書いて定義域・稠密性・閉性を暗黙化しない。有界作用素 $A\in B(X)$ との違いを各章で明示する。

---

## 3. コース構成

系列 ID は EVOL とし、章 ID は EVOL1--EVOL6 を予定する。実装開始時に repository 上の衝突を再確認して確定する。

### EVOL1 非有界作用素・閉作用素・グラフノルム

中心問い:

> 微分作用素のように空間全体では定義できない作用素を、極限操作に耐える形でどう扱うか。

扱う内容:

- densely defined operator
- closed operator
- closable operator
- closure
- graph
- graph norm
- core の入口
- resolvent set / spectrum の非有界作用素版への入口
- 微分作用素・Dirichlet Laplacian の最小例
- closed graph theorem との役割差

直接例では、微分作用素や Laplacian について「どの関数空間からどの関数空間へ写すか」を明示する。

### EVOL2 $C_0$ 半群・生成作用素・Hille--Yosida

中心問い:

> 時刻 $t$ ごとの解作用素 $T(t)$ が分かっているとき、微分方程式を生む無限小生成作用素をどう取り出すか。逆に生成作用素から時間発展をどう復元するか。

扱う内容:

- semigroup property
- strongly continuous semigroup
- contraction semigroup
- infinitesimal generator
- generator が閉かつ稠密定義になること
- resolvent estimate
- Laplace transform と resolvent
- Hille--Yosida theorem
- heat semigroup
- translation semigroup

Hille--Yosida は条件を暗記させず、

$$
(\lambda I-A)^{-1}
=
\int_0^\infty e^{-\lambda t}T(t)\,dt
$$

という関係から、なぜ resolvent 条件が時間発展を支配するのかを説明する。

### EVOL3 dissipative operator・Lumer--Phillips

中心問い:

> エネルギーが増えない時間発展を、生成作用素側の不等式だけからどう特徴付けるか。

扱う内容:

- dissipative operator
- maximal dissipative operator
- Hilbert 空間での内積条件
- Banach 空間での dissipativity の入口
- range condition
- Lumer--Phillips theorem
- contraction semigroup generation
- Laplacian / Stokes 型作用素の具体例への橋
- エネルギー法との対応

Hille--Yosida と Lumer--Phillips の役割を区別し、後者が PDE のエネルギー構造から生成性を確認するときに有効であることを示す。

### EVOL4 抽象 Cauchy 問題・mild solution・Duhamel 公式

中心問い:

> 初期値が生成作用素の定義域に入らない場合でも、時間発展をどの意味で解と呼べるか。

代表形:

$$
u'(t)=Au(t)+f(t),
\qquad
u(0)=u_0.
$$

扱う内容:

- abstract Cauchy problem
- classical solution
- strong solution
- mild solution
- variation of constants formula
- Duhamel formula
- inhomogeneous evolution equation
- uniqueness
- regularity improvement の条件
- weak formulation との違い

特に

$$
u(t)=T(t)u_0+\int_0^tT(t-s)f(s)\,ds
$$

を完成式として置くだけでなく、積分式をどこから得るか、どの意味で微分方程式へ戻れるかを段階的に確認する。

### EVOL5 analytic semigroup・sectorial operator・放物型 smoothing

中心問い:

> 熱方程式が「ただ存在する」だけでなく、正の時刻で急に滑らかになる現象を作用素論でどう表すか。

扱う内容:

- analytic semigroup
- sectorial operator の入口
- resolvent sector estimate
- fractional powers の入口
- smoothing estimate
- parabolic regularization
- Dirichlet Laplacian
- heat semigroup
- elliptic operator との接続
- maximal regularity は発展への入口に留める

必要なら

$$
\|A^\alpha T(t)\|
\le
C_\alpha t^{-\alpha}
$$

型評価を代表例として扱い、「正の時間が微分を買う」ことを具体的に読む。

fractional power の完全理論や $H^\infty$ functional calculus は本PLANの完成条件に含めない。

### EVOL6 半線形発展方程式・局所解・continuation criterion

中心問い:

> 線形時間発展が分かっているとき、非線形項を Duhamel 公式へ入れて局所解を作り、最大存在時間と blow-up alternative をどう一般化するか。

代表形:

$$
u'(t)=Au(t)+F(u(t)),
\qquad
u(0)=u_0.
$$

または符号規約に応じて

$$
u'(t)+Au(t)=F(u(t)).
$$

扱う内容:

- mild formulation
- nonlinear Duhamel map
- Banach fixed point
- local Lipschitz nonlinearity
- local well-posedness
- maximal existence time
- restart argument
- continuation criterion
- blow-up alternative
- semilinear heat equation との対応
- Navier--Stokes との「論理構造だけ」の比較
- global existence に追加評価が必要な理由

一般形では

$$
u(t)
=
T(t)u_0
+
\int_0^tT(t-s)F(u(s))\,ds
$$

を不動点写像として扱う。

NPDE6 の比較原理・Fujita 指数や、NS 固有の bilinear estimate を本章へ移さない。共通化するのは

~~~text
線形生成作用素
→ mild formulation
→ 局所不動点
→ 最大存在時間
→ 再出発
→ continuation / blow-up alternative
~~~

という論理骨格である。

---

## 4. 既存 PDE 系列との接続

### 4.1 NPDE6

NPDE6 では半線形熱方程式を具体的に扱い、比較原理や Fujita 型 blow-up を学ぶ。

EVOL6 は、その具体論を置き換えず、

- heat semigroup が線形部分を担う
- nonlinear Duhamel map が局所解を担う
- local Lipschitz と smoothing estimate が不動点を閉じる
- 有界性が維持されれば再出発できる

という抽象構造を後から整理する。

### 4.2 Navier--Stokes

NS 系列では

$$
u_t+\nu Au+B(u,u)=f
$$

という形が既に現れる。

本系列では Stokes 作用素・Leray 射影・三重線形形式を再構築しない。

接続するときは

$$
\text{linear semigroup}
+
\text{quadratic nonlinearity}
$$

という mild formulation の構造を比較するに留め、Navier--Stokes の正則性問題を一般半群論だけで解けるような記述をしない。

### 4.3 幾何解析

将来の DREAM_THEATER_GEOMETRIC_ANALYSIS_PLAN.md では、Laplace--Beltrami 作用素から heat semigroup を扱える。

本系列が先に実装されていれば、幾何解析側では生成作用素・mild solution の一般論を再証明せず、多様体固有の解析に集中できる。

### 4.4 確率過程

Markov semigroup と generator は本系列と形式的に近いが、確率核・期待値・正値保存・Markov 性は確率側の責務とする。

将来接続するとき、同じ generator という語が「抽象半群の生成作用素」と「Markov 過程の生成作用素」でどう一致するかを説明する。

---

## 5. 本計画に含めないもの

以下は重要だが、EVOL1--EVOL6 の完成条件には含めない。

- nonlinear semigroup の完全理論
- Crandall--Liggett theorem
- maximal $L^p$ regularity の完全理論
- $H^\infty$ functional calculus
- interpolation space の完全体系
- evolution family / nonautonomous semigroup の一般論
- delay differential equation
- integrated semigroup
- cosine family
- Stone theorem の完全理論
- unitary group の量子力学的応用
- dispersive equation の Strichartz 理論
- invariant manifold / attractor の完全理論

必要になった場合は独立PLANまたは力学系・調和解析側へ分離する。

---

## 6. 学習者向け導入方針

抽象概念を定義から連打しない。

### 6.1 非有界作用素

まず

$$
\frac{d}{dx}
$$

は連続関数全体には作用できないことを確認する。

「作用素には定義域が必要」という困りごとから

$$
A:D(A)\subset X\to X
$$

へ進む。

### 6.2 半群

まず熱方程式を時間 $s$ だけ進め、さらに $t$ だけ進めると、最初から $s+t$ 進めたものと一致することを見る。

そこから

$$
T(t+s)=T(t)T(s)
$$

を抽象化する。

### 6.3 生成作用素

有限次元 ODE の

$$
e^{tA}
$$

を思い出し、

$$
Ax
=
\lim_{t\downarrow0}
\frac{T(t)x-x}{t}
$$

へ進む。

この極限が全ての $x$ で存在するとは限らないことから generator の定義域を導入する。

### 6.4 mild solution

古典微分が存在しない初期値でも $T(t)u_0$ は意味を持つ例を先に示す。

「微分方程式を積分方程式へ下げる」必要性から Duhamel 公式へ進む。

---

## 7. 演習設計

各変更章は理由付き例外がなければ最低

- Level A: 4題
- Level B: 3題
- Level C: 1題

とし、全問に詳細解答を付ける。

最低数に到達しても、主要 learning objective を自力使用する問題が不足するなら追加する。

代表題材:

### EVOL1
- 微分作用素の閉性確認
- graph norm の完備性
- closable だが bounded でない作用素
- 定義域を変えると作用素が変わる例

### EVOL2
- translation semigroup の強連続性
- generator の計算
- resolvent の Laplace 表現
- heat semigroup の semigroup property

### EVOL3
- dissipativity の直接確認
- Laplacian のエネルギー不等式
- range condition の小例
- Lumer--Phillips の適用判定

### EVOL4
- Duhamel 公式の導出
- classical solution から mild solution への変換
- mild solution が classical になる条件
- 定数外力・単純な diagonal generator の明示解

### EVOL5
- heat semigroup の smoothing estimate
- analytic extension の最小例
- $A^\alpha T(t)$ の時間特異性
- 正の時刻での regularization

### EVOL6
- nonlinear Duhamel map の contraction estimate
- 局所解の再出発
- maximal existence time
- blow-up alternative
- NPDE6 / NS5 との比較問題

詳細解答では、不動点写像の閉球不変性・縮小率・時間幅の選び方を「十分小さく取る」で省略しない。

---

## 8. 実装フェーズ

### Phase 0: 境界監査

- 関数解析 II の既存結果を確認する。
- FA5--FA7 と EVOL1 の重複を確認する。
- ODE / PDE / NPDE / NS のどの result を具体例として参照するか固定する。
- EVOL1--EVOL6 の章ID衝突を再確認する。
- canonical terminology を確認する。

### Phase 1: EVOL1--EVOL2

- 非有界作用素
- 閉作用素
- $C_0$ 半群
- generator
- Hille--Yosida

までを閉じる。

この段階で EVOL 系列 manifest を作成し、work-state を plans_progress の本PLANへ切り替える。

### Phase 2: EVOL3--EVOL4

- dissipativity
- Lumer--Phillips
- abstract Cauchy problem
- mild solution
- Duhamel formula

までを閉じる。

### Phase 3: EVOL5

- analytic semigroup
- sectorial operator
- parabolic smoothing

を閉じ、具体的熱方程式と接続する。

### Phase 4: EVOL6

- semilinear evolution equation
- local fixed point
- continuation
- blow-up alternative

を閉じる。

NPDE6 / NS5 の証明を再実装せず、抽象構造の比較を行う。

### Phase 5: 横断監査

- knowledge DAG
- prerequisite
- dream-theater-index
- dream-theater.md
- standard-math-core
- 関数解析ロードマップ
- NPDE / NS / 幾何解析PLANとの cross-link
- terminology

を同期する。

---

## 9. validation

PLAN作成段階では本文・knowledge DAG・index は変更しない。

実装時は変更スコープに応じて少なくとも

~~~text
npm run validate:textbook:changed
npm run validate:textbook-knowledge:changed
npm run validate:dream-theater-concepts:changed
npm run validate:dream-theater-exercise-counts
~~~

を使う。

knowledge DAG、全体 index、validator、共通規約へ波及する変更では full validation へ昇格する。

---

## 10. 完成条件

本計画は次を全て満たしたとき完了とする。

1. EVOL1--EVOL6 が教材本文・chapter metadata・knowledge metadata を含めて完成している。
2. 非有界作用素で定義域・稠密性・閉性が省略されていない。
3. $C_0$ 半群と生成作用素の対応を具体例とともに説明できる。
4. Hille--Yosida の仮定と結論を単独で確定でき、resolvent 条件の意味を説明できる。
5. Lumer--Phillips が energy / dissipativity と contraction semigroup を結ぶことを追える。
6. classical / strong / mild solution の違いを具体例で区別できる。
7. Duhamel 公式を適用対象・仮定・主要中間式まで追って導ける。
8. analytic semigroup による parabolic smoothing の代表評価を再現できる。
9. 半線形発展方程式の局所不動点・最大存在時間・再出発・blow-up alternative を紙上で再構成できる。
10. NPDE6 や NS 系列の固有理論を本系列の一般論と同一視していない。
11. 作用素環論 I / II との prerequisite が相互に不要であることが明確になっている。
12. 各章が DREAM THEATER の導入・定義例・formal statement・証明・演習・詳細解答の規約を満たす。
13. 必要な routing / series manifest / index / knowledge DAG / cross-link 更新まで完了している。
14. 対象スコープに必要な validation が green で、数学的完全性・読者粒度の人手監査に重大指摘が残っていない。

---

## 11. 最終的な通読像

~~~text
関数解析 I
  ↓
関数解析 II
  ├─→ 抽象発展方程式・半群論
  │     EVOL1 非有界作用素
  │     EVOL2 C0 半群・Hille--Yosida
  │     EVOL3 Lumer--Phillips
  │     EVOL4 抽象 Cauchy 問題・Duhamel
  │     EVOL5 analytic semigroup・smoothing
  │     EVOL6 半線形発展方程式
  │       ├─→ 非線形 PDE
  │       ├─→ Navier--Stokes の mild formulation
  │       └─→ 幾何解析の heat semigroup
  │
  └─→ 作用素環論 I
        ↓
      作用素環論 II
~~~

この分離により、「作用素を代数として調べる道」と「作用素が生成する時間発展を調べる道」を、それぞれ独立した数学科目として育てる。
