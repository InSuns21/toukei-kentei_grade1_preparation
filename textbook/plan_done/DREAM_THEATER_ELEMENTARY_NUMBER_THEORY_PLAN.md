# DREAM THEATER 整数論 I〜発展（NT1〜NT10）

分冊: 2026-10-11  
状態: completed（2026-10-12 全10章の実装・公開と系列横断監査を完了）

## 中心問いと直接依存

RNG1〜4、GRP1〜4、FLDの必要部分。NT9/10はCMP1〜6（計算可能性）も前提とする。同じNT番号の基礎→発展なので1つのPLANに保つ。

**本科目の正本：** 合同式・算術関数・不定方程式からHilbert第10問題の整数論的橋。

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

## 章別執筆・数理査読・完了判定

2026-10-12 に NT1 の章別実装・検証へ着手し、NT1〜NT10 の全章が系列 manifest 上で completed となった。各章で実在する直接prerequisiteとconcept ownerを確認し、独習者が追える証明粒度、演習A4/B3/C1以上と全詳細解答を整える。変更章自身の全証明・全演習の自己再計算、別観点再査読を必須とし、別の完了章の追跡監査は章IDを指定した明示依頼時だけ実施する。科目ごとの公開・依存・リンクの横断監査を通して初めてPLAN全体を完了扱いにする。


## 科目横断の完了確認（2026-10-12）

- NT1〜NT10 の全章で本文・章メタデータが揃い、演習 A4/B3/C1 以上と全詳細解答を確認した。
- 公開索引 `textbook/dream-theater-index.json` と目次 `textbook/dream-theater.md` に10章すべてが登録されている。
- NT各章の内部・相互 stable anchor 参照269件に欠落がなく、外部の直接参照先11章でも参照 anchor が実在することを確認した。
- NT10 の追跡監査で主要証明5件・演習解答11件を再計算し、接線の因数分解、整数と有理数間の帰着、分母の非零条件を検証した。重大指摘・本文修正はなし。
- 最終ゲートとして、このPLAN移動と系列manifest変更についてPRの必須CI・最終差分を検証する。
