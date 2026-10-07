# DREAM THEATER 整数論・楕円曲線・モジュラー形式 統合ルート計画

作成日: 2026-10-07  
状態: planned

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
- EC1--EC8: 楕円曲線
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

# 3. 整数論基礎 NT1--NT8

## 3.0 科目の位置付け

「解析的整数論を読むための補講」にはせず、大学の初等整数論を一学期受講したと言える独立科目として完結させる。

既存 RNG / GRP に証明済みの一般定理がある場合は stable result を参照し、整数論では具体的な算術・例・応用へ集中する。

## NT1 整数環・合同式・剰余類

- 整除・最大公約数の整数での再確認
- Euclid / Bézout の具体計算
- 合同式
- Z/nZ
- 線形合同式
- 中国剰余定理
- 連立合同式

canonical proof は RNG2 / RNG3 / GRP2 を再利用する。

## NT2 乗法群・Fermat--Euler・原始根

- (Z/nZ)^×
- Euler の φ 関数
- Fermat の小定理
- Euler の定理
- Wilson の定理
- 元の位数
- 原始根
- 法 p の乗法群の巡回性
- primitive root theorem の扱い範囲

## NT3 平方剰余と平方剰余の相互法則

- 平方剰余・平方非剰余
- Legendre 記号
- Euler 規準
- Gauss の補題
- 補充法則
- 平方剰余の相互法則
- Jacobi 記号
- 二次合同方程式

平方剰余の相互法則は主要定理として標準的な一つの証明を完全に閉じる。

## NT4 算術関数と Dirichlet 畳み込み

- 算術関数
- 乗法的関数
- τ, σ, φ, μ
- Dirichlet 畳み込み
- 単位元 ε
- 乗法的関数の畳み込み閉性
- 素数冪での局所計算

中心式:

$$
(f*g)(n)=\sum_{d\mid n}f(d)g(n/d).
$$

## NT5 Möbius 反転・約数和・総和関数

- Möbius 関数
- μ*1=ε
- Möbius 反転公式
- 約数和恒等式
- summatory function
- 床関数を含む二重和
- Dirichlet hyperbola method への入口

## NT6 不定方程式と平方和

- 一次不定方程式
- Pythagoras 三つ組
- 合同式による解不存在判定
- 二平方和
- Fermat の二平方和定理
- 四平方定理の位置付け
- 局所条件と大域的解への入口

## NT7 連分数・Pell 方程式・Diophantine近似への入口

- 有限・無限連分数
- convergent
- 最良近似の入口
- 二次無理数の周期性
- Pell 方程式
- 基本解からの全解生成
- Diophantine近似という独立分野への出口

irrationality exponent、Roth、metric Diophantine approximation までを NT7 一章へ押し込まない。これらは後述する NDA 系列の canonical responsibility とする。

解析的整数論には必須でないが、初等整数論を一学期科目として完結させる代表主題として含める。

## NT8 素数分布への入口

- Euclid の素数無限性
- π(x)
- Chebyshev の θ, ψ
- 素数分布を定量化する問い
- Chebyshev 型評価への入口
- 素数定理
  $$
  \pi(x)\sim\frac{x}{\log x}
  $$
  が何を主張するか
- Dirichlet 級数を導入する必然性

素数定理の完全証明は ANT へ送る。


---

# 3A. Diophantine近似 NDA1--NDA8

## 3A.0 位置付け

NT7 に一章分の Diophantine 近似を圧縮したり、EOM017 のためだけに irrationality exponent の補講を追加したりしない。

**Diophantine近似を、整数論の内部に置く独立1セメスター科目として設計する。**

公開科目名は「Diophantine近似」とする。管理 ID は仮に NDA1--NDA8 とし、実装開始時に衝突を再確認する。

主 prerequisite:

- NT1--NT3 の必要部分
- NT7
- RA1 / RA1A
- NDA3 以降で必要に応じて線形代数・凸幾何
- NDA8 で測度論 / 確率論の必要部分

## NDA1 連分数と最良有理近似

- finite / infinite continued fraction
- convergent
- recurrence
- determinant identity
- best approximation
- 二次無理数の周期性
- Pell 方程式との対応

NT7 の内容を受け、近似論として再整理する。

## NDA2 Dirichlet・Hurwitz・badly approximable numbers

- pigeonhole による Dirichlet approximation
- Hurwitz theorem
- approximation constant
- badly approximable number
- golden ratio の位置付け

## NDA3 geometry of numbers と同時近似

- lattice の最小導入
- symmetric convex body
- Minkowski theorem
- simultaneous approximation
- linear forms

geometry of numbers を巨大な別系列へ膨らませず、本科目に必要な標準部分を閉じる。

## NDA4 一様分布・Kronecker・Weyl

- fractional part
- irrational rotation
- equidistribution mod 1
- Weyl criterion
- Kronecker approximation theorem
- QMC / dynamical systems との接続

## NDA5 irrationality measure・irrationality exponent

- rational approximation exponent
- irrationality exponent $\mu(\alpha)$
- $\mu(\alpha)\ge2$
- badly approximable numbers との関係
- 具体例の exponent

EOM017 で使う語彙はここを canonical owner とする。

## NDA6 Liouville 数・超越数

- Liouville theorem
- Liouville numbers
- transcendence
- 代数的数への近似制約
- 明示的 transcendental number

## NDA7 Thue--Siegel--Roth

- Roth theorem の exact statement
- algebraic irrational に対する $\mu(\alpha)=2$
- Thue / Siegel / Roth の歴史的流れ
- proof architecture
- 完全証明を採用する場合の追加 prerequisite の監査

黒箱一行では済ませない一方、EOM017 のためだけに研究レベルの補助理論を逆輸入しない。

## NDA8 metric Diophantine approximation

- almost every real number の irrationality exponent
- Borel--Cantelli
- Khintchine theorem への入口
- null / full measure
- exceptional set
- Hausdorff dimension との接続

MT8 / 幾何学的測度論への横断リンクを置く。

## NDA から EOM017 への出口

~~~text
NT7
 ↓
NDA1--NDA4
 ↓
NDA5 irrationality exponent
 ↓
NDA6--NDA8
 ↓
代数的無理数では Roth により exponent 2
 ↓
超越数 pi では何が分かるか
 ↓
EOM017
~~~

EOM017 は irrationality exponent の初出定義を担当しない。

---

# 3B. NT9--NT10: Hilbert第10問題へ進む発展章

NT9--NT10 は「基礎が足りないから作る短い補講」ではない。

- 初等整数論 NT
- 計算可能性 CMP
- 楕円曲線 EC

という複数の正規講義を合流させる **整数論発展章** とする。

## NT9 Diophantine集合・Hilbert第10問題 over Z

主 prerequisite:

- NT1
- NT6
- CMP1 Turing machine
- CMP3 万能計算・符号化
- CMP4 decidable / recognizable
- CMP5 停止問題
- CMP6 many-one reduction

扱う内容:

- polynomial equation over $\mathbb Z$
- Diophantine set
- existential Diophantine definition
- recursively enumerable set
- Davis--Putnam--Robinson--Matiyasevich theorem
- Hilbert第10問題の exact statement
- undecidability
- 「計算を整数方程式へ符号化する」とは何か

計算可能性自体は CMP を canonical owner とし、NT9 で再講義しない。

## NT10 Hilbert第10問題 over Q

主 prerequisite:

- NT9
- EC の必要章
- 必要に応じて追加の数論結果

扱う内容:

- $\mathbb Z$ 上と $\mathbb Q$ 上の問題の差
- rational solution
- Diophantine definability
- elliptic curve / rational points との接続
- 古典的部分結果
- 2026年直前まで残っていた障害
- EOM004 への interface

2026年の研究成果そのもの、proof manuscript、formal / human verification の状態は EOM004 側の責務とする。

### NT9--NT10 の停止線

代数幾何一般をこの2章の内部で急造しない。

EOM004 を正確に読むために EC を越える独立分野が一科目分必要だと判明した場合は、その時点で別 PLAN を立てる。


---

# 4. 解析的整数論 ANT1--ANT8

主 prerequisite:

- NT4--NT5
- NT8
- CA7 以降
- CA12

Dirichlet 文字を扱う ANT3 以降では NT2--NT3 を追加する。

## ANT1 算術関数の平均と部分和

- summatory function
- Abel の部分和公式
- Dirichlet hyperbola method
- τ(n), φ(n) の代表的平均
- main term / error term
- 平均次数

## ANT2 Dirichlet 級数・Euler 積の一般論

$$
F(s)=\sum_{n\ge1}\frac{a(n)}{n^s}
$$

を一般に扱う。

- 絶対収束半平面
- Dirichlet 畳み込みと積
- 乗法的係数と Euler 積
- 逆 Dirichlet 級数
- CA12 の ζ を一般構造の基準例として再解釈

## ANT3 Dirichlet 文字・Gauss 和・Dirichlet L 関数

- Dirichlet 文字
- principal / primitive character
- 有限可換群の指標との対応
- 直交関係
- Gauss 和
- Dirichlet L 関数
  $$
  L(s,\chi)=\sum_{n\ge1}\frac{\chi(n)}{n^s}
  $$
- Euler 積

## ANT4 算術級数中の素数に関する Dirichlet の定理

- L(1,χ)≠0
- 文字直交関係による剰余類抽出
- 素数 Euler 積
- 算術級数中の素数無限性

核心である L(1,χ)≠0 を名前だけで飛ばさない。

## ANT5 ζ'/ζ と von Mangoldt 関数

- von Mangoldt 関数 Λ(n)
- Euler 積の対数微分
  $$
  -\frac{\zeta'(s)}{\zeta(s)}
  =
  \sum_{n\ge1}\frac{\Lambda(n)}{n^s}
  $$
- ψ(x), θ(x), π(x) の比較
- 零点情報が素数側へ戻る仕組み

## ANT6 Re s=1 の零点不存在と素数定理

- ζ(s) の Re s=1 上の零点不存在
- de la Vallée Poussin 型の正値性議論
- Tauberian theorem の必要性
- Wiener--Ikehara
- ψ(x)~x
- 部分積分から π(x)~x/log x

Wiener--Ikehara を採用する場合は必要な形を証明するか、将来 canonical Tauberian result が存在する場合のみ直接参照する。

## ANT7 非自明零点・明示公式・零点計数

- critical strip
- functional equation による対称性
- ξ(s)
- Hadamard product への必要最小限の接続
- Riemann--von Mangoldt 型零点計数
- Perron 型反転への入口
- von Mangoldt の明示公式の意味

## ANT8 Riemann 予想と誤差項・一般 L 関数への橋

- Riemann 予想の exact statement
- 素数定理の誤差項との関係
- zero-free region
- GRH への入口
- Dirichlet L 関数の零点
- L 関数に共通する
  - Dirichlet 級数
  - Euler 積
  - 解析接続
  - 関数等式
- modular form の L 関数への橋

---

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

# 6. 楕円曲線 EC1--EC8

主 prerequisite:

- RNG1--RNG4
- FLD0--FLD3
- GRP1--GRP3
- NT1--NT4

EC3 では CA8--CA9 を追加する。

## EC1 非特異三次曲線と Weierstrass 方程式

- projective plane の必要最小限
- 無限遠点
- plane cubic
- nonsingularity
- Weierstrass equation
- discriminant
- 変数変換
- characteristic 2,3 の注意
- Q, R, C, F_p 上の具体例

## EC2 chord--tangent 群則

- chord--tangent construction
- 単位元・逆元
- 加法公式
- 可換性
- associativity
- doubling formula

associativity を図から明らかとして済ませない。実装前に proof route を確定する。

候補:

1. 有理関数・divisor の必要最小限を導入する。
2. CA9 の複素一様化から characteristic 0 を理解し、代数的恒等式として整理する。
3. 将来の代数曲線 canonical owner を参照する。

## EC3 複素一様化・格子・j 不変量

- CA9 の wp を再利用
- C/Λ → E(C)
- 群準同型性
- 双正則性
- lattice scaling
- g2, g3, Δ, j
- C 上の楕円曲線の同型分類
- complex multiplication への入口

CA9 と EC の正式な合流点とする。

## EC4 torsion・height・descent・Mordell--Weil

- torsion subgroup
- Nagell--Lutz 型結果
- rational height
- canonical height への入口
- descent
- weak Mordell--Weil
- Mordell--Weil theorem

完全証明に数体一般論が不可避になる場合、代数的整数論を黙って prerequisite にせず proof route を再設計する。

## EC5 有限体上の楕円曲線・Frobenius・Hasse 評価

- E(F_q)
- 点数
- Frobenius endomorphism
- a_q=q+1-#E(F_q)
- Hasse bound
  $$
  |a_q|\le2\sqrt q
  $$
- extension field 上の点数
- finite-field zeta function への入口

## EC6 reduction・good/bad reduction・conductor

- integral model
- reduction modulo p
- good reduction
- multiplicative / additive reduction
- discriminant と bad prime
- minimal model への入口
- conductor N_E
- local data と modular form の level への橋

Kodaira--Néron classification の完全理論は必須範囲にしない。

## EC7 Hasse--Weil L 関数

good prime p について

$$
a_p=p+1-\#E(\mathbb F_p)
$$

を用い、

$$
L_p(E,s)=
\left(1-a_pp^{-s}+p^{1-2s}\right)^{-1}
$$

型の local factor を構成する。

- Euler product
- bad prime の local factor
- conductor
- Hasse bound による収束域
- completed L function の予想される関数等式
- Modularity Theorem により解析接続・関数等式が得られる論理順序

## EC8 modular な楕円曲線と modularity interface

- modular elliptic curve の定義
- weight 2 newform
- Fourier coefficient a_p(f)
- good prime での a_p(E)=a_p(f)
- Euler factor の一致
- L(E,s)=L(f,s)
- modular parametrization X_0(N)→E
- conductor と level

Modularity Theorem の最終 statement は MF8 でまとめる。

---

# 7. モジュラー形式 MF1--MF8

主 prerequisite:

- CA8--CA9
- CA12
- GRP3
- NT2--NT4

MF6 以降では ANT2--ANT4、MF8 では EC1--EC8 を追加する。

## MF1 上半平面・格子・modular group

- upper half-plane H
- SL_2(Z), PSL_2(Z)
- fractional linear transformation
- generators S,T
- lattice basis change
- fundamental domain
- cusps への入口

CA9 の lattice scaling から自然に導入する。

## MF2 モジュラー形式・q 展開・Eisenstein 級数

- modular form of weight k
- cusp holomorphy
- q=e^{2πiτ}
- q-expansion
- cusp form
- Eisenstein series E_k
- E_4, E_6
- discriminant modular form Δ
- j invariant

CA9 の g2, g3, j と接続する。

## MF3 valence formula と full modular group 上の構造

- fundamental domain 内の零点
- valence formula
- dimension formula の full group 版
- ring structure
  $$
  M_*(SL_2(\mathbb Z))\cong\mathbb C[E_4,E_6]
  $$
- cusp forms
- Δ
- modular function と j

## MF4 congruence subgroup・cusps・modular curve

- Γ_0(N), Γ_1(N), Γ(N)
- finite index
- cusps
- compactification
- modular curve X_0(N)
- Riemann surface としての modular curve
- weight 2 form と正則微分
- elliptic curve の moduli interpretation への入口

scheme-theoretic moduli は本計画に含めない。

## MF5 Hecke 作用素・固有形式

- Hecke operator T_n
- q-expansion への作用
- commuting family
- eigenform
- normalized eigenform
- Fourier coefficient の乗法性
- Petersson inner product への入口

## MF6 モジュラー形式の L 関数

normalized eigenform

$$
f(\tau)=\sum_{n\ge1}a_nq^n
$$

に対し

$$
L(f,s)=\sum_{n\ge1}\frac{a_n}{n^s}
$$

を扱う。

- Euler product
- Mellin transform
- functional equation
- completed L function
- ANT の L 関数との共通構造
- weight / level と Gamma factor / conductor

CA12 の theta--Mellin 構成を prototype として再利用する。

## MF7 oldform・newform・level と算術

- oldspace / newspace
- newform
- Atkin--Lehner theory の必要部分
- normalized newform
- local Euler factor
- conductor / level dictionary
- weight 2 newform
- EC8 との係数比較

## MF8 Modularity Theorem と Fermat の最終定理への橋

本計画の終端章。

### statement

有理数体上の任意の楕円曲線 E/Q は modular である。

少なくとも次を接続する。

1. weight 2 newform f が存在し L(E,s)=L(f,s)。
2. good prime のほとんど全てで a_p(E)=a_p(f)。
3. 適切な level N に対し modular parametrization X_0(N)→E が存在する。

### FLT への論理接続

指数 p>2 の仮想的 Fermat 解から Frey 曲線を作り、

~~~text
Fermat の反例
  ↓
Frey 曲線
  ↓
Ribet の定理
  ↓
その曲線は modular ではあり得ない

一方

Modularity Theorem
  ↓
Q 上の楕円曲線は modular

したがって矛盾
~~~

を追う。

### 停止線

Wiles--Taylor--Wiles の modularity lifting proof は本章では証明しない。

証明へ進むには少なくとも、

- elliptic curve の Tate module
- l-adic Galois representation
- residual representation
- Galois cohomology
- deformation functor / universal deformation ring
- Hecke algebra
- modularity lifting
- R=T
- patching

が必要になる。

これらは将来の独立 PLAN「Galois 表現・modularity lifting・Wiles の証明」の責務とする。

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

CA8 → CA9 ────────→ MF1 → MF2 → MF3 → MF4 → MF5 → MF6 → MF7 ──┐
 │      │             ↑                                ↑          │
 │      └→ EC3        │                                └── ANT ───┤
 │                    │                                            │
 └────────────────────┘                                            │
                                                                   │
NT1--NT4 → EC1 → EC2 → EC3 → EC4 → EC5 → EC6 → EC7 → EC8 ────────┘
                                                                   │
                                                                   ↓
                                                                  MF8
                                                                   ↓
                                                        Modularity Theorem
                                                                   ↓
                                                           Frey → Ribet → FLT
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

EC4 等で不可避になった場合は proof route を点検し、実装上の都合だけで未履修理論を逆輸入しない。

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

EC1--EC8 で一学期科目として完結。

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
- EC2 associativity、EC4 Mordell--Weil、EC5 Hasse bound、ANT6 Tauberian step の proof route を実装前に確定。

## Phase 1: NT1--NT8

整数論基礎を一学期科目として実装する。

## Phase 2: ANT1--ANT8

解析的整数論を実装し、CA12 の ζ の解析情報を prime distribution へ戻す。

## Phase 3: CA8--CA9 接続監査

全面改稿はしない。EC / MF に必要な stable anchor または説明が不足する場合だけ局所補強する。

## Phase 4: EC1--EC8

楕円曲線を group law から Hasse--Weil L、modularity interface まで実装する。

## Phase 5: MF1--MF8

modular group から newform、modular L、Modularity Theorem、FLT bridge まで実装する。

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
