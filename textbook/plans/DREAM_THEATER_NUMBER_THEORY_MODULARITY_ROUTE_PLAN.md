# DREAM THEATER 整数論・楕円曲線・モジュラー形式 依存ルート

分冊: 2026-10-11  
状態: planned（横断ルート台帳のみ）

- [整数論NT1〜10](../plan_done/DREAM_THEATER_ELEMENTARY_NUMBER_THEORY_PLAN.md)
- [Diophantine近似NDA1〜8](../plan_done/DREAM_THEATER_DIOPHANTINE_APPROXIMATION_PLAN.md)
- [解析的整数論ANT1〜8](../plan_done/DREAM_THEATER_ANALYTIC_NUMBER_THEORY_PLAN.md)
- [楕円曲線EC1〜11](DREAM_THEATER_ELLIPTIC_CURVES_PLAN.md)
- [モジュラー形式MF1〜8](DREAM_THEATER_MODULAR_FORMS_PLAN.md)

## 直接依存DAG

~~~text
RNG/GRP/FLD → NT1〜8 ─┬→ NDA1〜8 → TRN・EOM017
                         ├→ NT9〜10（＋CMP）→ EOM004
                         ├→ ANT1〜8（＋CA12）
                         └→ EC1〜11（＋CA9） ──────────┐
CA8/9/12＋NT2〜4 → MF1〜8 ─────────────────────────┴→ modularityの接続
~~~

NT1〜10は明確に続く一つのPLAN、NDA・ANT・EC・MFは各自の中心問いを持つ独立PLANとする。楕円関数CA8/9の既存証明を繰り返さない。未実装PLANを定理の実在stable anchorと混同しない。

---

## 元PLANの共通設計・文献・依存監査資料（各科目のシラバスは分冊先が正本）

## 0. 目的

本計画は、DREAM THEATER において「整数論基礎」「解析的整数論」「楕円関数」「楕円曲線」「モジュラー形式」を一枚の依存設計へ統合し、既存の複素解析・抽象代数を再利用しながら、最終的に Modularity Theorem（旧称 谷山--志村--Weil 予想）の正確な主張と Fermat の最終定理への論理接続を理解できる地点まで導くための設計台帳である。

本計画だけで Wiles--Taylor--Wiles の証明を閉じることは目的にしない。読者が少なくとも次を自力で説明できることを到達点とする。

1. 初等整数論の標準的な一学期分の内容を扱える。
2. Dirichlet 級数・Euler 積・Dirichlet 文字・L 関数・素数定理を解析的整数論として理解できる。
3. CA8--CA9 の複素トーラス・楕円関数が三次曲線へ接続する理由を理解できる。
4. 楕円曲線を代数・幾何・有限体・有理点・L 関数の側から理解できる。
5. モジュラー群・モジュラー形式・Hecke 作用素・固有形式・newform・モジュラー形式の L 関数を理解できる。
6. 楕円曲線 E/Q と重さ 2 の newform f の間の
   $$
   L(E,s)=L(f,s)
   $$
   が何を意味するかを説明できる。
7. Frey 曲線、Ribet の定理、Modularity Theorem が Fermat の最終定理へどう接続するかを論理の向きを取り違えず説明できる。
8. その証明へ進むには Galois 表現・変形理論・Hecke 環・R=T が追加で必要だと分かる。

中心像は次とする。

~~~text
既存の群論・環論・体論
        │
        ├───────────────┐
        ↓               │
   整数論基礎 NT        │
        │               │
        ├────→ 解析的整数論 ANT ─────────┐
        │                                │
        ↓                                │
   楕円曲線 EC                           │
        │                                │
CA8 Riemann 面・複素トーラス              │
        ↓                                │
CA9 楕円関数・Weierstrass wp ───────┐    │
        │                           │    │
        └────→ EC の複素一様化       │    │
                                    ↓    ↓
CA12 ζ・theta・関数等式 ─────────→ モジュラー形式 MF
                                         │
                                         ↓
                         楕円曲線の modularity
                                         │
                                         ↓
                         Frey → Ribet → FLT
~~~

---

## 1. 現状と canonical owner

### 1.1 既存の複素解析

本計画作成時点で、次はすでに実装済みである。

- CA8: Riemann 面・被覆・多価関数
  - 複素格子
  - 複素トーラス C/Lambda
  - コンパクト Riemann 面
- CA9: 楕円関数・Weierstrass wp 関数
  - 基本平行四辺形
  - 楕円関数
  - Eisenstein 級数と Weierstrass 不変量
  - Weierstrass の微分方程式
  - 複素トーラスと非特異三次曲線の接続
- CA12: Riemann ζ 関数・theta 変換・解析接続・関数等式
  - Euler 積
  - Jacobi theta 関数
  - Mellin 表現
  - 関数等式

従って「楕円関数」について新規の重複系列を作らない。CA8--CA9 を canonical owner とする。

### 1.2 既存代数

次も canonical dependency として再利用する。

- GRP1--GRP4: 群・商群・群作用・有限群
- RNG1--RNG4: 環・中国剰余定理・Euclid 整域・UFD・多項式環
- FLD0--FLD4: 一般の体上の線形代数・体拡大・有限体・Galois 理論

特に、

- Euclid の互除法・Bézout: RNG3
- 中国剰余定理: RNG2
- Lagrange の定理・商群: GRP2
- 有限体と Frobenius: FLD3

を既存証明の正本とし、整数論基礎で同じ完全証明を複製しない。

### 1.3 新規 canonical owner

本計画は次を新規 canonical owner とする。

- NT1--NT8: 整数論基礎
- NDA1--NDA8: Diophantine近似（整数論内の独立1セメスター科目）
- NT9--NT10: Hilbert第10問題へ進む整数論発展章
- ANT1--ANT8: 解析的整数論
- EC1--EC11: 楕円曲線
- MF1--MF8: モジュラー形式と modularity への橋

PLAN 段階では未実装 ID を public index、knowledge DAG、series manifest へ登録しない。実装開始時に衝突がないことを再確認する。

---

## 2. 市販教科書との照合

特定の一冊を写すのではなく、標準的な教科書の射程と順序を比較し、DREAM THEATER の既存 dependency に合わせて再設計する。

### 2.1 整数論基礎

主参照:

- 雪江明彦『整数論1 初等整数論からp進数へ』日本評論社  
  https://www.nippyo.co.jp/shop/book/6276.html
- Tom M. Apostol, Introduction to Analytic Number Theory, Springer  
  https://link.springer.com/book/10.1007/978-1-4757-5579-4

雪江の合同・平方剰余・不定方程式・数論的関数の流れを参考にする。ただし p進数・代数的整数は本計画の整数論基礎には含めず、将来の代数的整数論・局所体系列へ分離する。

### 2.2 解析的整数論

主参照:

- 雪江明彦『整数論3 解析的整数論への誘い』日本評論社  
  https://www.nippyo.co.jp/shop/book/6474.html
- Tom M. Apostol, Introduction to Analytic Number Theory, Springer  
  https://link.springer.com/book/10.1007/978-1-4757-5579-4

Apostol の「算術関数 → 素数分布 → Dirichlet 文字 → Dirichlet 級数 → ζ/L → 素数定理」と、雪江の「Dirichlet 文字・Gauss 和 → ζ/L → 算術級数定理 → Wiener--Ikehara → 素数定理」を照合する。

既存 CA12 が ζ の解析接続・関数等式をすでに閉じているため、本系列では同じ証明を再実装せず、その解析情報を整数列・素数分布へ戻すことを主役にする。

### 2.3 楕円関数・モジュラー関数

主参照:

- Tom M. Apostol, Modular Functions and Dirichlet Series in Number Theory, Springer  
  https://link.springer.com/book/10.1007/978-1-4684-9910-0
- 『楕円積分と楕円関数』日本評論社  
  https://www.nippyo.co.jp/shop/book/8132.html

Apostol の「楕円関数 → モジュラー群・モジュラー関数 → Dirichlet 級数」という接続を参考にする。ただし楕円関数そのものは CA8--CA9 を再利用する。

### 2.4 楕円曲線

主参照:

- Joseph H. Silverman and John T. Tate, Rational Points on Elliptic Curves, Springer  
  https://link.springer.com/book/10.1007/978-3-319-18588-0

同書の「幾何と算術 → torsion → 有理点 → 有限体 → 整数点 → 複素乗法」という学部上級レベルの構成を参考にする。

DREAM THEATER では Modularity Theorem への接続のため、複素一様化・有限体上の Frobenius・reduction・conductor・Hasse--Weil L 関数を主線へ明示的に入れる。

### 2.5 モジュラー形式

主参照:

- Fred Diamond and Jerry Shurman, A First Course in Modular Forms, Springer  
  https://link.springer.com/book/10.1007/978-0-387-27226-9

同書の楕円曲線・モジュラー曲線・Hecke 作用素・固有形式・L 関数を Modularity Theorem へ向けて配置する設計を参考にする。

本計画では Galois 表現以降を次計画へ送る一方、

- congruence subgroup
- modular curve
- Hecke operator
- eigenform / newform
- modular form の L 関数
- 楕円曲線の modularity の正確な statement

までは本系列で閉じる。

### 2.6 日本語での統合像

- 藤崎源二郎・森田康夫・山本芳彦『数論への出発 増補版』日本評論社  
  https://www.nippyo.co.jp/shop/book/2379.html

同書が「初等整数論 → 平方剰余 → ゼータ関数 → 保型関数 → 楕円曲線 → Fermat の最終定理」を一冊の見取り図として並べる点を、本計画の複数枝が modularity で合流する構造の参考にする。

---

## 2.7 Diophantine近似

NDA1--NDA8 の範囲校正では、次の標準書を参照する。

- J. W. S. Cassels, *An Introduction to Diophantine Approximation*
- Wolfgang M. Schmidt, *Diophantine Approximation*
- Ivan Niven, *Irrational Numbers*

連分数だけの講義にも、EOM017 の irrationality exponent だけの補講にもせず、有理近似・同時近似・超越性・metric theory まで一学期として自然に閉じる範囲を採る。

# 5. 楕円関数 branch: CA8--CA9 を再利用

CA8--CA9 はすでに

~~~text
Riemann 面
  ↓
複素格子 Λ
  ↓
複素トーラス C/Λ
  ↓
楕円関数
  ↓
Weierstrass wp
  ↓
(wp')^2 = 4wp^3 - g2 wp - g3
  ↓
非特異三次曲線
~~~

を閉じている。

従って新規の「楕円関数 I / II」は作らない。

### EC 側への出口

CA9 の

$$
z\longmapsto(\wp(z),\wp'(z))
$$

を複素楕円曲線の一様化

$$
\mathbb C/\Lambda\simeq E(\mathbb C)
$$

へ完成させる。

### MF 側への出口

格子の基底

$$
\Lambda=\mathbb Z\omega_1+\mathbb Z\omega_2
$$

の変更から

$$
\tau=\omega_2/\omega_1
\longmapsto
\frac{a\tau+b}{c\tau+d}
$$

を導き modular group へ進む。

CA12 の theta 変換は modular transformation の先行例として利用する。

---

# 8. 依存関係

~~~text
RNG2 ─┐
RNG3 ─┼─→ NT1 → NT2 → NT3
GRP2 ─┘       │
              └→ NT4 → NT5 → NT8
                  │             │
                  ├→ NT6        └→ ANT1 → ANT2 → ANT3 → ANT4
                  └→ NT7                     │
                                             ├→ ANT5 → ANT6 → ANT7 → ANT8
CA12 ────────────────────────────────────────┘

CA8 → CA9 → EC3（複素一様化）
   └────────────→ MF1 → MF2 → MF3 → MF4 → MF5 → MF6 → MF7 ─┐
CA12 / ANT の該当章 ───────────────────────────────→ MF6 ──┤
                                                         │
NT1--NT4 → EC1 → EC2 → EC4 → EC7 → EC8 → EC9 → EC10 ────┤
                  ├────→ EC5 → EC6                     │
                  └────→ EC3                           │
                                                         ↓
                                                        EC11
                                                         ↓
                                                        MF8
                                                         ↓
                                          Modularity Theorem → FLT
~~~

実際の chapter.yaml prerequisite はこの図を機械的に転写せず、その章が直接使用する最小依存だけを登録する。

### CA9 と CA12 の役割の違い

- CA9 は lattice、wp、g2、g3、cubic curve を供給する。
- CA12 は theta transformation、Mellin transform、L-function 的な関数等式を供給する。
- MF で両方が modular transformation / modular form / modular L function という一つの言語へ合流する。

### ANT と MF

MF1--MF5 は主に複素解析・群作用・格子から開始できる。MF6--MF8 で Dirichlet series、Euler product、L 関数の解析を統合するため ANT を利用する。

### 代数的整数論との境界

次は本計画の主線 prerequisite に一括追加しない。

- number field
- ring of integers
- ideal factorization
- class group
- unit theorem
- Dedekind zeta
- local field
- adèle / idèle
- class field theory

EC6 等で不可避になった場合は proof route を点検し、実装上の都合だけで未履修理論を逆輸入しない。

---

# 9. 一学期相当の境界

## 整数論基礎

NT1--NT8 で一学期科目として完結。

到達点:

- congruence
- Fermat--Euler
- quadratic reciprocity
- arithmetic functions
- Möbius inversion
- representative Diophantine equations
- continued fractions / Pell
- prime distribution question

## 解析的整数論

ANT1--ANT8 で一学期科目として完結。

到達点:

- arithmetic average
- Dirichlet series
- characters / L
- Dirichlet theorem
- prime number theorem
- zero distribution / explicit formula
- RH の意味

## 楕円関数

新規一学期科目へ膨らませない。CA8--CA9 が complex analysis II 内の完成済み branch として canonical owner になっているため、そのまま EC / MF の prerequisite にする。

## 楕円曲線

EC1--EC11 は暫定の学習順であり、11講固定ではない。特に結合法則・一般 Mordell--Weil・Hasse 評価・導手の証明経路を閉じるため、必要に応じて分割する。

到達点:

- group law
- complex uniformization
- rational points
- finite fields
- reduction
- conductor
- Hasse--Weil L
- modularity interface

## モジュラー形式

MF1--MF8 で一学期から学部上級 / 大学院導入相当。

到達点:

- modular group
- modular forms
- Eisenstein / Δ / j
- congruence subgroup / modular curve
- Hecke
- eigenform / newform
- modular L
- Modularity Theorem の exact statement
- FLT への logical bridge

---

# 10. 本計画に含めないもの

### 代数的整数論・局所体

Dedekind domain、class group、unit theorem、local field、adèle / idèle、class field theory。

### 高度な代数幾何

scheme、sheaf cohomology、general moduli stack、étale cohomology、abelian variety 一般論。

MF4 の modular curve と EC の plane cubic に必要な部分だけを局所導入する。

### Wiles の証明

Galois representation、deformation theory、Hecke algebra、modularity lifting、R=T、Taylor--Wiles patching。

### Langlands program

modularity を Langlands program の一例として位置付ける出口は置けるが、本計画の学習目標にはしない。

---

# 11. 学習者向け導入

### 整数論基礎

~~~text
整数を割った余りをまとめたい
  ↓
合同式
  ↓
積でも情報を保ちたい
  ↓
(Z/nZ)^×
  ↓
冪の周期
  ↓
Fermat--Euler
~~~

のように具体問題から構造へ進む。

### 解析的整数論

~~~text
素数を数えたい
  ↓
素数を直接扱うのは難しい
  ↓
一意分解を積へ符号化
  ↓
Euler product
  ↓
log derivative
  ↓
von Mangoldt function
  ↓
zero の位置
  ↓
prime distribution
~~~

を主線にする。

### 楕円曲線

~~~text
三次曲線と直線は3点で交わる
  ↓
2点から3点目が決まる
  ↓
これを加法として使えるか
  ↓
chord--tangent law
  ↓
なぜ本当に群になるか
~~~

を追う。

### モジュラー形式

~~~text
格子 Λ=<ω1,ω2> は基底の取り方が一意でない
  ↓
同じ格子を別の基底で書く
  ↓
τ=ω2/ω1 が Möbius 変換される
  ↓
この基底変更と整合する正則関数を調べたい
  ↓
modular form
~~~

という CA9 からの導線を置く。

---

# 12. 演習方針

新規実装章は、理由付き例外がなければ DREAM THEATER 標準の

- Level A: 4題以上
- Level B: 3題以上
- Level C: 1題以上

を満たす。

- NT: 合同式・Legendre 記号・畳み込み・reciprocity・Pell
- ANT: Euler product・文字直交・log derivative・PNT・explicit formula
- EC: point addition・discriminant・finite-field count・reduction・local factor
- MF: transformation law・q-expansion・Hecke・eigenform・Euler product・modularity statement

を自力再現させる。

---

# 13. 実装フェーズ

## Phase 0: 依存・ID・proof route 監査

- CA8 / CA9 / CA12 の stable result を確認。
- GRP / RNG / FLD の再利用箇所を確定。
- NT / ANT / EC / MF の ID 衝突を再確認。
- EC2 結合法則、EC4 isogeny/degree、EC6 一般 Mordell--Weil、EC8 Hasse 評価、EC9 導手の proof route、および ANT6 Tauberian step を実装前に確定。

## Phase 1: NT1--NT8

整数論基礎を一学期科目として実装する。

## Phase 2: ANT1--ANT8

解析的整数論を実装し、CA12 の ζ の解析情報を prime distribution へ戻す。

## Phase 3: CA8--CA9 接続監査

全面改稿はしない。EC / MF に必要な stable anchor または説明が不足する場合だけ局所補強する。

## Phase 4: EC1--EC10

楕円曲線の群則・有理点・有限体・Hasse 評価・還元・Hasse--Weil L 関数まで実装する。EC6の一般証明に未履修の前提が必要なら独立に解決し、例示的な2-descentのみで完成扱いにしない。

## Phase 5: MF1--MF7

modular group から newform と modular L まで実装する。MF7からEC11へ先行依存を張らない。

## Phase 5A: EC11 → MF8

EC11で曲線の局所係数・導手とnewformを照合してから、MF8でModularity TheoremとFLT bridgeを接続する。

## Phase 6: 横断監査

- duplicate definition / theorem
- stable anchor
- prerequisite
- knowledge DAG
- terminology
- public index
- standard-math-core
- series manifest
- exercise coverage
- proof completeness
- Frey--Ribet--Modularity--FLT の論理方向

を確認する。

## Phase 7: 後続計画

必要なら MF8 完了後に DREAM_THEATER_GALOIS_REPRESENTATIONS_MODULARITY_LIFTING_PLAN.md を新規設計する。

本計画を Wiles の証明全体へ黙って肥大化させない。

---

# 14. 検証

通常の leaf chapter 実装では changed-only fast path を優先する。

変更内容に応じて少なくとも:

~~~text
npm run validate:textbook:changed
npm run validate:textbook-knowledge:changed
npm run validate:dream-theater-concepts:changed
npm run validate:dream-theater-exercise-counts
~~~

を使う。

global index、knowledge DAG、common resolver、series manifest など未変更ページへ影響する変更では full validation へ昇格する。

数学的には別途、

1. 合同式・数論的恒等式。
2. Dirichlet series / Euler product の収束域と交換正当化。
3. L(1,χ)≠0 の証明責務。
4. PNT の Tauberian step。
5. EC discriminant / nonsingularity。
6. group law associativity。
7. finite-field point count / Hasse bound。
8. conductor / level。
9. modular transformation law。
10. Hecke eigenvalue / Euler factor。
11. L(E,s)=L(f,s)。
12. Frey--Ribet--Modularity--FLT の論理方向。

を人手で再計算する。

---

# 15. 完成条件

本計画はページ数だけで完了扱いしない。少なくとも次を満たす。

1. NT1--NT8 が初等整数論の独立した一学期科目として読める。
2. 既存 RNG / GRP の定理を不必要に重複証明していない。
3. quadratic reciprocity を主要定理として完全に扱う。
4. Dirichlet convolution と Möbius inversion が ANT の Dirichlet series へ自然に接続する。
5. ANT で Dirichlet の算術級数定理を核心証明まで追える。
6. ANT で prime number theorem を核心証明まで追える。
7. CA12 の ζ の解析情報が von Mangoldt function と prime distribution へ戻る。
8. CA8--CA9 を楕円関数 canonical owner として再利用する。
9. EC の group law を「図から明らか」で済ませない。
10. C/Λ と E(C) の対応を CA9 から完全に接続する。
11. finite field、Frobenius、reduction、conductor、Hasse--Weil L が一つの流れになる。
12. MF で CA9 の lattice と CA12 の theta / Mellin が合流する。
13. Hecke operator から eigenform の multiplicative coefficients と Euler product まで追える。
14. weight 2 newform と elliptic curve の local coefficient を対応できる。
15. Modularity Theorem を複数の表現で正確に説明できる。
16. Frey curve → Ribet → Modularity → FLT を自力で説明できる。
17. Wiles の machinery を未定義で逆輸入していない。
18. 全新規章が DREAM THEATER の導入・定義例・核心証明・有意味な A4/B3/C1・詳細解答規約を満たす。
19. public index / standard-math-core / chapter prerequisite / knowledge DAG が一致する。
20. 完了後、Galois representation / modularity lifting の後続計画を独立に開始できる。

---

# 16. 最終的な学習像

~~~text
整数論基礎
  合同式
  Fermat--Euler
  平方剰余
  相互法則
  算術関数
  Dirichlet 畳み込み
  Möbius 反転
  不定方程式
  連分数・Pell
       │
       ├──────────────→ 楕円曲線 EC
       │                  group law
       │                  rational points
       │                  finite fields
       │                  reduction
       │                  conductor
       │                  Hasse--Weil L
       │                         │
       ↓                         │
解析的整数論 ANT                 │
  Dirichlet series               │
  characters / L                 │
  Dirichlet theorem              │
  prime number theorem           │
  zeta zeros                     │
  explicit formula               │
       │                         │
       │                         │
CA8 Riemann surfaces             │
  ↓                              │
CA9 elliptic functions           │
  C/Λ, wp, g2,g3                 │
       │                         │
       ├────→ 複素一様化 ─────────┘
       │
CA12 theta / zeta
       │
       └────────────┐
                    ↓
               モジュラー形式 MF
                 SL2(Z)
                 Eisenstein
                 Delta / j
                 modular curve
                 Hecke
                 eigenform / newform
                 modular L
                    │
                    ├───────────┐
                    │           │
                    │      楕円曲線 EC
                    │           │
                    └─────┬─────┘
                          ↓
                 Modularity Theorem
                          ↓
                   Frey + Ribet
                          ↓
             Fermat の最終定理への橋
                          ↓
              後続: Galois 表現,
              deformation, R=T
~~~

この統合像を、今後の整数論・楕円曲線・モジュラー形式系列の設計基準とする。


## 17. 2026-10-07 EOM 接続再設計

- EOM017 のためだけの NT7A は作らない。Diophantine近似を NDA1--NDA8 の独立1セメスター科目として用意する。
- DIO 系列は作らない。Hilbert第10問題は NT9--NT10 として整数論側に置く。
- NT9--NT10 は初等整数論の必修続編ではなく、NT + CMP + EC を合流させる発展章とする。
- EOM004 / EOM017 固有の2026年結果・検証状況は EOM 側へ置く。
