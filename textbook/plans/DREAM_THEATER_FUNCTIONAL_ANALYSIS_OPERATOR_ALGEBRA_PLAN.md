# DREAM THEATER 関数解析・作用素環論再編計画

作成日: 2026-10-03  
状態: planned

## 0. 目的

本計画は、現在の DREAM THEATER の「関数解析」を、教育段階を表す「大学院レベル」のような名称ではなく、**数学的内容に基づく4科目**

1. 関数解析 I
2. 関数解析 II
3. 作用素環論 I
4. 作用素環論 II

へ整理し、既存の関数解析系列を保ったまま $C^*$-環・Gelfand 理論・GNS 構成・von Neumann 環へ自然に接続するための設計台帳である。

中心となる通読像は次とする。

$$
\begin{array}{ll}
\text{関数解析 I} & \text{ノルム空間・Banach/Hilbert 空間・Hahn--Banach・Banach 空間の基本定理}\\
\text{関数解析 II} & \text{弱位相・双対性・スペクトル・コンパクト作用素・Fredholm 理論}\\
\text{作用素環論 I} & \text{Banach 環・}C^*\text{-環・Gelfand 理論・関数計算・GNS}\\
\text{作用素環論 II} & \text{von Neumann 環・二重可換子・predual・正規汎関数・factor}
\end{array}
$$

「I / II」は難易度の格付けではなく、**同一分野を内容上の自然な切れ目で分ける名称**とする。

---

## 1. 現状と再編方針

現在の textbook/dream-theater.md では、次の既存ページが一つの「関数解析」にまとまっている。

- F0-00D1 ノルム・Banach
- F0-02C1 Banach・Hilbert
- F0-02C1A Hilbert 射影定理
- F0-02C2 双対空間・Riesz
- F0-02C3 Banach 空間の Fréchet 微分・有界線形写像・連鎖律
- F0-02C3A Banach 双対・Hilbert 随伴
- F0-02C3B Fréchet 連鎖律・Hilbert 随伴の証明
- FA1 Banach 空間の商・Baire・一様有界性原理
- FA2 開写像定理・有界逆定理・閉グラフ定理
- F0-02C6 Hahn--Banach
- FA3 弱位相・弱*位相・標準埋め込み
- F0-02C6A 分離定理・Minkowski 汎関数・Farkas
- FA4 Banach--Alaoglu・Goldstine・反射性
- FA5 スペクトル・レゾルベント
- FA6 コンパクト作用素
- FA7 コンパクト自己共役作用素・Fredholm の交代定理

既存章は内容として大きく不足していない。したがって本計画では、**既存 FA1--FA7 を全面改番・再実装しない**。

再編は次の2段階で行う。

1. 既存ページを「関数解析 I / II」に分けて科目境界を明確化する。
2. FA7 の後に「作用素環論 I / II」を新設する。

stable ID、既存 anchor、既存ページ URL は原則維持し、科目名変更を理由に章IDを振り直さない。

---

## 2. 科目境界

### 2.1 関数解析 I

#### 中心問い

> 有限次元線形代数で使っていた「長さ・直交・線形写像・双対」を無限次元へ移すと、何を仮定すれば同じ議論が生き残るのか。

#### 既存ページ候補

原則として次を「関数解析 I」に置く。

1. 関数解析ロードマップ
2. F0-00D1 ノルム・Banach
3. F0-02C1 Banach・Hilbert
4. F0-02C1A Hilbert 射影定理
5. F0-02C2 双対空間・Riesz
6. F0-02C3 Banach 空間の Fréchet 微分・有界線形写像・連鎖律
7. F0-02C3A Banach 双対・Hilbert 随伴
8. F0-02C3B Fréchet 連鎖律・Hilbert 随伴の証明
9. F0-02C6 Hahn--Banach
10. FA1 Banach 空間の商・Baire・一様有界性原理
11. FA2 開写像定理・有界逆定理・閉グラフ定理

F0-02C6A の分離定理・Minkowski 汎関数・Farkas は、関数解析 I の Hahn--Banach の応用として参照可能だが、凸解析・最適化との責務分担を確認したうえで最終配置を決める。

#### 到達点

関数解析 I の修了時には、読者が少なくとも次を自力で使えることを目標にする。

- Banach 空間・Hilbert 空間・双対空間
- Hilbert 射影定理と Riesz 表現定理
- 有界線形作用素と随伴
- Hahn--Banach の定理
- Baire のカテゴリー定理を使う関数解析の三大基本定理
  - 一様有界性原理
  - 開写像定理
  - 閉グラフ定理
- 商 Banach 空間

この段階では「弱収束」「スペクトル」「コンパクト作用素」をまだ主役にしない。

### 2.2 関数解析 II

#### 中心問い

> ノルム収束だけでは見えない無限次元のコンパクト性と、一般の線形作用素の「固有値の代わり」をどう捉えるか。

#### 既存ページ候補

原則として次を「関数解析 II」に置く。

1. FA3 弱位相・弱*位相・標準埋め込み
2. FA4 Banach--Alaoglu・Goldstine・反射性
3. FA5 スペクトル・レゾルベント
4. FA6 コンパクト作用素
5. FA7 コンパクト自己共役作用素・Fredholm の交代定理

必要に応じて F0-02C6A の分離定理を FA3 / FA4 の prerequisite として参照する。

#### 到達点

- 弱位相・弱*位相とそれぞれの収束
- Banach--Alaoglu の定理
- Goldstine の定理
- 反射的 Banach 空間
- Banach 空間上の有界作用素のスペクトル・レゾルベント
- スペクトル半径公式
- コンパクト作用素
- Fredholm の交代定理
- コンパクト自己共役作用素のスペクトル定理

ここで扱うスペクトル定理は、固有値展開が成立する**コンパクト自己共役作用素**が中心である。

一般の有界自己共役作用素・有界正規作用素の射影値測度によるスペクトル定理は、後述の作用素環論 I に送る。


### 2.2A 関数解析 II の発展枝：非有界作用素・半群・抽象発展方程式

関数解析 II から PDE へ進む読者向けに、作用素環論とは別方向の発展枝を置く。

中心問いは

> 時間発展 PDE を「無限次元空間上の常微分方程式」として見ると、時間発展を生成する作用素をどう特徴付ければよいか。

である。

この枝は公開科目を新たに「関数解析 III」と分けることを現時点では要求しない。まず FA7 後の補講・発展章として設計し、実装量が大きくなった場合だけ独立科目化を再検討する。

仮 ID は FA8--FA10 とする。

#### FA8 閉作用素・可閉作用素・グラフノルム

扱う内容:

- densely defined operator
- closed operator
- closable operator
- closure
- graph norm
- resolvent
- 非有界作用素で定義域を明示する必要性
- 微分作用素を最小具体例にする

有界作用素の FA5 と異なり、$D(A)$ が空間全体ではないことを毎回明示する。

#### FA9 $C_0$ 半群・生成作用素・Hille--Yosida

扱う内容:

- strongly continuous semigroup
- infinitesimal generator
- generator が一般に非有界になること
- resolvent estimate
- Hille--Yosida theorem
- contraction semigroup
- heat semigroup を代表例にする

Hille--Yosida は「生成作用素ならこの条件」と列挙するだけでなく、resolvent と時間発展がどう結びつくかを学習目標にする。

#### FA10 抽象 Cauchy 問題・mild solution・Duhamel

扱う内容:

- abstract Cauchy problem
- classical / strong / mild solution
- variation of constants formula
- Duhamel formula
- inhomogeneous evolution equation
- analytic semigroup への入口
- parabolic PDE との接続

熱核の具体的 $L^p$--$L^q$ decay や自己相似は DREAM_THEATER_NONLINEAR_PDE_PLAN.md を正本とし、本枝では抽象時間発展の作用素論を主役にする。


### 2.3 作用素環論 I

科目名案:

> **作用素環論 I：Banach 環・$C^*$-環・Gelfand 理論**

#### 中心問い

> 一つ一つの作用素を調べるだけでなく、作用素を加法・積・随伴で閉じた「代数」として見ると、スペクトル論をどこまで統一できるか。

作用素環論 I は、関数解析 II の先に新設する。

ただし後続の PDE・確率解析などの一般読者に必修とはしない。DREAM THEATER 全体の標準通読では、関数解析 II から分岐する発展科目として扱ってよい。

#### 新規章案

章IDは実装開始時に既存IDとの衝突を確認して確定する。以下では仮に OA1 以降を用いる。

##### OA1 Banach 環とスペクトル

扱う内容:

- Banach 環
- 単位的 Banach 環
- 可逆元
- 可逆元全体の開性
- Neumann 級数
- 元 $a$ のスペクトル $\sigma(a)$
- スペクトル半径
- 閉部分代数
- イデアルと商 Banach 環の入口

FA5 の作用素スペクトル論を「$B(X)$ という Banach 環の一例」として抽象化する。

FA5 と同じ証明を重複実装せず、既存 result を一般 Banach 環へ持ち上げる箇所と、新たに必要な証明を区別する。

##### OA2 可換 Banach 環と Gelfand 変換

扱う内容:

- character
- 極大イデアル
- character space
- Gelfand 位相
- Gelfand 変換
- 可換 Banach 環のスペクトルと character
- 基本例 $C(K)$

ここでは「固有値を持たない作用素でもスペクトルがある」という FA5 の問題意識から、

$$
a \longmapsto \widehat a(\varphi)=\varphi(a)
$$

へ進む動機を通常文と具体例で先に示す。

##### OA3 $C^*$-環の基本構造

扱う内容:

- *-代数
- $C^*$-環
- $C^*$-恒等式
- 自己共役元
- 正元
- unitary / projection
- *-準同型
- *-準同型の基本的ノルム性
- 正元の平方根
- $a^*a$ とノルム

行列環 $M_n(\mathbb C)$、$B(H)$、$C(K)$ を最小例として並行して使う。

##### OA4 連続関数計算と可換 Gelfand--Naimark

扱う内容:

- 自己共役元・正規元の連続関数計算
- スペクトル写像
- $C^*(a,1)$
- 可換 $C^*$-環の Gelfand--Naimark 定理
- $C(K)$ との同型

抽象的な「関数計算」を、まず多項式 $p(a)$ から始め、

$$
p \to f\in C(\sigma(a))
$$

へ近似で拡張する流れを追えるようにする。

##### OA5 正汎関数・状態・GNS 構成

扱う内容:

- 正線形汎関数
- state
- Cauchy--Schwarz 型不等式
- GNS 半内積
- null space による商
- 完備化
- cyclic representation
- GNS 構成

GNS は公式だけで済ませず、

$$
\langle a,b\rangle_\varphi=\varphi(b^*a)
$$

が一般には半内積でしかない理由、null space を割る理由、左乗法が商へ降りる理由、有界作用素になる理由を段階的に証明する。

##### OA6 一般有界自己共役・正規作用素のスペクトル定理

扱う内容:

- $C^*(T,I)$ と連続関数計算
- Riesz--Markov 表現との接続
- spectral measure
- projection-valued measure
- 有界自己共役作用素のスペクトル定理
- 有界正規作用素のスペクトル定理
- Borel 関数計算への入口

目標は

$$
T=\int_{\sigma(T)}\lambda\,dE(\lambda)
$$

を記号として置くだけでなく、有限次元の対角化および FA7 のコンパクト自己共役作用素の固有値展開から、なぜ「固有値の和」を「射影値測度による積分」へ置き換えるのかを読者が理解できるようにすること。

#### 作用素環論 I の prerequisite

基本線は:

- 関数解析 I
- 関数解析 II

章ごとに必要に応じて、

- 測度論の Borel 集合
- Radon 測度
- Riesz--Markov 表現定理
- 複素解析の Cauchy 理論・正則関数

を canonical result として参照する。

「測度論全章」「複素解析全章」を一括 prerequisite にせず、chapter.yaml / knowledge.yaml では実際に使う result だけ接続する。

### 2.4 作用素環論 II

科目名案:

> **作用素環論 II：von Neumann 環**

#### 中心問い

> $C^*$-環を Hilbert 空間上に表現したとき、ノルム閉性ではなく「作用素がベクトルにどう作用するか」という弱い収束で閉じると、どのような新しい構造が現れるか。

#### 新規章案

以下では仮に VN1 以降を用いる。

##### VN1 $B(H)$ の作用素位相

扱う内容:

- strong operator topology (SOT)
- weak operator topology (WOT)
- ノルム収束・強収束・弱収束の含意関係
- 有界集合上での基本的比較
- multiplication がどの意味で連続か
- adjoint と各位相
- 具体的な射影列・shift の例

FA3 の Banach 空間上の弱位相と、$B(H)$ 上の WOT を混同しないように、評価対象を明示する。

##### VN2 可換子・二重可換子・von Neumann 環

扱う内容:

- commutant $S'$
- bicommutant $S''$
- von Neumann 環
- *-部分代数
- WOT / SOT 閉包
- von Neumann の二重可換子定理

中心定理:

$$
M=M''
$$

と、単位を含む *-部分代数について

$$
\overline M^{\mathrm{SOT}}
=
\overline M^{\mathrm{WOT}}
=
M''
$$

を結ぶ。

二重可換子定理は本科目の主要 learning objective とし、核心証明を本文または明示した canonical dependency で閉じる。

##### VN3 射影・部分等長作用素・極分解

扱う内容:

- projection
- partial isometry
- support projection
- polar decomposition
- 射影と閉部分空間
- von Neumann 環内での極分解

有限次元行列で具体計算してから一般形へ進む。

##### VN4 trace class・predual・ultraweak 位相

扱う内容:

- 有限ランク作用素
- trace class
- trace
- $B(H)_*$
- $B(H)$ と trace class の双対関係
- ultraweak / $\sigma$-weak 位相
- predual を持つ $C^*$-環としての von Neumann 環

必要なら Schatten class のうち trace class と Hilbert--Schmidt class をこの章のために局所導入する。ただし独立した Schatten class 系列を将来作る場合は canonical owner を移す。

##### VN5 正規汎関数・正規状態・トレース

扱う内容:

- normal positive functional
- normal state
- ultraweak 連続性
- 単調増加する射影族との関係
- faithful / semifinite trace の入口
- $B(H)$ 上の密度作用素による normal state

量子力学的な「密度行列」は動機例には使えるが、本科目を量子力学教材にはしない。

##### VN6 可換 von Neumann 環と $L^\infty$

扱う内容:

- multiplication operator
- $L^\infty(X,\mu)$
- 可換 von Neumann 環
- measure algebra との対応への入口
- $C(K)$ と $L^\infty$ の違い
- $C^*$-環と von Neumann 環の「閉包の違い」の具体化

ここで

$$
C(K)
\quad\text{と}\quad
L^\infty(X,\mu)
$$

を比較し、作用素環論 I / II の違いを具体的に見せる。

##### VN7 factor と型分類への入口

扱う内容:

- center
- factor
- $B(H)$ が factor になること
- Murray--von Neumann equivalence of projections
- finite / infinite projection
- type I / II / III の定義へ至る基本構造
- type $I_n$, $I_\infty$ の具体例
- II / III 型が必要になる理由の概観

この章では分類理論を「I / II / III という名前を紹介して終わり」にしない一方、Tomita--Takesaki 理論まで逆輸入しない。

#### 作用素環論 II の到達点

読者が少なくとも次を説明できることを完成条件とする。

- $C^*$-環と von Neumann 環の違い
- WOT / SOT / ultraweak 位相の役割
- 二重可換子定理
- predual を持つことの意味
- normal state の意味
- $B(H)$ と $L^\infty$ が代表的 von Neumann 環であること
- factor の定義と center の役割
- type I / II / III 分類で何を分類しようとしているか

---

## 3. 本計画に含めないもの

以下は重要だが、本計画の「作用素環論 II」完了条件には含めない。

- 非有界自己共役作用素の完全なスペクトル理論
- Stone の定理
- unbounded operator の functional calculus
- affiliated operator
- noncommutative $L^p$ 空間
- weights
- modular automorphism group
- Tomita--Takesaki 理論
- crossed product
- Connes の III 型 factor 分類
- K-theory
- KK-theory
- $C^*$-環の nuclearity / exactness
- subfactor theory

これらは将来、必要に応じて

- 作用素環論 III
- 非可換積分論

などの独立計画へ分離する。

特に von Neumann 環を導入するためだけに Tomita--Takesaki 理論を prerequisite にしてはならない。

---

## 4. 依存関係

主要な依存線は次とする。

~~~text
線形代数
  ↓
実解析・位相空間論・測度論
  ↓
関数解析 I
  ↓
関数解析 II
  ↓
作用素環論 I
  ↓
作用素環論 II
~~~

ただし DREAM THEATER 全体の標準通読では、

~~~text
関数解析 II
  ├─→ PDE / 確率解析 / 時系列解析など
  └─→ 作用素環論 I → 作用素環論 II
~~~

と分岐できる設計にする。

PDE・確率解析・時系列解析に、作用素環論 I / II を不要に prerequisite として追加しない。

関数解析 II からは二つの発展方向を区別する。

~~~text
関数解析 II
  ├─→ FA8--FA10 非有界作用素・半群・抽象発展方程式
  │      └─→ 非線形 PDE / evolution PDE
  └─→ 作用素環論 I → 作用素環論 II
~~~

半群枝を学ぶために作用素環論 I / II を prerequisite にせず、作用素環論を学ぶために半群枝を prerequisite にしない。

### 4.1 一般スペクトル定理の置き場所

一般の有界自己共役作用素・正規作用素の spectral measure によるスペクトル定理は、FA7 に逆輸入しない。

FA7 は

- コンパクト
- 自己共役
- 固有ベクトル展開

という具体的な世界で閉じる。

その後、作用素環論 I で

~~~text
有限次元対角化
  ↓
コンパクト自己共役作用素
  ↓
C*(T,I)
  ↓
連続関数計算
  ↓
Riesz--Markov
  ↓
projection-valued measure
  ↓
一般スペクトル定理
~~~

という拡張として扱う。

### 4.2 GNS と von Neumann 環

GNS 構成は作用素環論 I の canonical owner とする。

作用素環論 II では、状態から Hilbert 空間表現を得る一般構成そのものを再証明せず、必要な場面で GNS の stable result を参照する。

### 4.3 測度論との境界

- Radon 測度・Riesz--Markov は既存測度論を参照する。
- $L^\infty$ は既存 $L^p$ 系列との整合を取る。
- 「本質的上限」「a.e. 同値類」を未定義で使わない。
- spectral measure は通常のスカラー測度と何が同じで何が違うかを説明する。

---

## 5. 学習者向けの導入方針

この系列では抽象度が急に上がるため、各主要概念は formal statement から始めない。

### 5.1 Banach 環

まず

- 行列は加えられる
- 行列は掛けられる
- 作用素も加えられる
- 作用素も合成できる

ことを確認し、

> FA5 では一つの作用素 $T$ のスペクトルを調べた。  
> しかし実際には $T$, $T^2$, $p(T)$, $(\lambda I-T)^{-1}$ を同じ空間の中で何度も扱っている。  
> これらをまとめて扱う器が Banach 環である。

という導線を置く。

### 5.2 $C^*$-環

「Banach 環に星印を付けたもの」と定義して終わらせない。

行列で

$$
A^*A
$$

が正定値性・ノルム・特異値と関係していたことを思い出し、Hilbert 空間上の随伴を使うと

$$
\|T^*T\|=\|T\|^2
$$

が成り立つことから抽象化する。

### 5.3 von Neumann 環

いきなり

$$
M=M''
$$

を定義として置かない。

まず有限次元行列では自動的だった「極限を取っても代数の中に残る」という性質が、無限次元では

- ノルム収束
- 各ベクトル上の収束
- 行列係数の収束

で異なることを具体例で示す。

そのうえで、

> ノルムでは閉じていなくても、作用素が各ベクトルにどう見えるかという弱い意味では閉じている代数を考えたい

という問題から SOT / WOT と von Neumann 環へ進む。

---

## 6. 例の系列

抽象概念だけが連続しないよう、全体を通して少なくとも次の具体例を使い回す。

### 行列環

$$
M_n(\mathbb C)
$$

- 最初の $C^*$-環
- 有限次元 von Neumann 環
- projection / unitary / positive element / state の数値例
- factor の最初の例

### 連続関数

$$
C(K)
$$

- 可換 $C^*$-環
- Gelfand 理論の基準例
- spectrum と関数の値域

### 有界作用素

$$
B(H)
$$

- 非可換 $C^*$-環
- von Neumann 環
- commutant
- predual
- factor

### 本質的有界関数

$$
L^\infty(X,\mu)
$$

- 可換 von Neumann 環
- multiplication operator
- $C(K)$ との比較

### 対角作用素

$$
T(x_n)=(\lambda_nx_n)
$$

- FA6 / FA7 のコンパクト作用素
- 非コンパクトな有界正規作用素
- spectral measure
- SOT / WOT 収束

同じ具体例を別章で再利用し、「抽象理論が何を一般化しているか」を見失わせない。

---

## 7. 演習設計

新規 DREAM THEATER 章は、理由付き例外がなければ各章

- Level A: 4題
- Level B: 3題
- Level C: 1題

を満たす。

### Level A

定義を直接検証する。

例:

- $M_2(\mathbb C)$ で正元を判定する
- $C([0,1])$ の元のスペクトルを求める
- 与えた作用素列の SOT / WOT 収束を確認する
- commutant を小さな行列例で計算する

### Level B

主要定理を1--2個組み合わせる。

例:

- Gelfand 変換の具体計算
- 正汎関数から GNS 空間を有限次元例で構成
- multiplication operator の spectral projection を求める
- $B(H)$ の rank-one operators の commutant から二重可換子を考える

### Level C

章の核心を再構成する。

例:

- 可換 $C^*$-環の関数計算を一連の導出で使う
- GNS 構成の well-defined 性を証明する
- 二重可換子定理の核心補題を再証明する
- trace class と normal functional の対応を導く

演習解答で「標準的」「同様に」「計算すると」によって非自明な2--4手を隠さない。

---

## 8. 目次・ロードマップの変更方針

本計画を実装するとき、少なくとも次を同期する。

### textbook/dream-theater.md

現在の「関数解析」を、既存 stable anchor との互換性を考慮しながら

~~~text
関数解析 I
関数解析 II
作用素環論 I
作用素環論 II
~~~

へ整理する。

既存 dt-subject-functional-analysis は、可能なら「関数解析 I」の anchor として維持し、既存リンクを壊さない。

新規科目には別 anchor を付ける。

### textbook/dream-theater-standard-math-core.md

標準通読では、現在の「関数解析」を少なくとも

~~~text
関数解析 I
↓
関数解析 II
~~~

に分割する。

作用素環論 I / II は一般の解析主幹に強制せず、**関数解析 II 後の発展分岐**として案内することを第一候補とする。

実装時に他の発展科目一覧の構成と照合し、通読順の番号体系を更新する。

### textbook/dream-theater-index.json

新規ページを実装した段階でのみ追加する。

plan 段階では未実装パスを index に入れない。

---

## 9. 実装フェーズ

### Phase 0: 科目境界監査

- 現在の関数解析ロードマップ本文を読む。
- F0 系列と FA1--FA7 の責務を再確認する。
- F0-02C6A の配置を決める。
- 既存リンク・anchor を調査する。
- 「関数解析 I / II」への目次分割だけで数学的依存逆転が起きないことを確認する。

### Phase 1: 関数解析 I / II の目次再編

- dream-theater.md
- dream-theater-standard-math-core.md
- 関数解析ロードマップ

を同期する。

既存章本文は、科目名変更だけを理由に全面改稿しない。

ただし新しい境界から見て導入文・「次に何を学ぶか」が明らかに不整合なら局所修正する。

### Phase 1A: 半群・抽象発展方程式

PDE 側から需要が高い順に

- FA8 閉作用素・可閉作用素
- FA9 $C_0$ 半群・Hille--Yosida
- FA10 抽象 Cauchy 問題・mild solution・Duhamel

を実装する。

この Phase は作用素環論 I / II と独立に進めてよい。DREAM_THEATER_NONLINEAR_PDE_PLAN.md の実装に必要な結果だけ先行して閉じることも許す。

### Phase 2: 作用素環論 I

順に

- OA1 Banach 環
- OA2 Gelfand 理論
- OA3 $C^*$-環
- OA4 連続関数計算・可換 Gelfand--Naimark
- OA5 状態・GNS
- OA6 一般スペクトル定理

を実装する。

OA1--OA6 の詳細IDは開始時に確定する。

### Phase 3: 作用素環論 II

順に

- VN1 作用素位相
- VN2 二重可換子
- VN3 射影・極分解
- VN4 predual
- VN5 正規状態・トレース
- VN6 可換 von Neumann 環
- VN7 factor

を実装する。

### Phase 4: 横断監査

- 用語統一
- chapter.yaml / knowledge.yaml
- knowledge DAG
- dream-theater-index
- dream-theater.md
- standard-math-core
- リンク
- prerequisite

を横断確認する。

「$C^*$-環」「von Neumann 環」「弱作用素位相」「弱*位相」などの matcher / alias が互いを誤認しないことも監査する。

---

## 10. 検証

実装時には変更内容に応じて少なくとも

~~~text
npm run validate
npm run validate:pages
npm run validate:dream-theater-exercise-counts
npm run audit:proof-pedagogy
npm run audit:formalism-pedagogy
~~~

を実行する。

knowledge.yaml、全体 concept registry、依存監査ロジックを変更した場合は対応する strict validation も実行する。

科目目次だけを変更した場合でも、

- Pages / link validation
- prerequisite の人手照合
- stable anchor の後方互換性

を確認する。

---

## 11. 完成条件

本計画は、単に「von Neumann 環」という章が存在すれば完了ではない。

少なくとも次を満たしたときに完成とする。

1. 関数解析 I / II の責務が明確で、既存 FA1--FA7 の内容が自然に配置されている。
2. Banach 環から $C^*$-環への導入が具体例から追える。
3. Gelfand 理論を使って可換 $C^*$-環を関数環として理解できる。
4. GNS 構成を商空間・完備化・表現まで自力で追える。
5. FA7 のコンパクト自己共役スペクトル定理から、一般有界自己共役・正規作用素の spectral measure 版へ橋が架かっている。
6. SOT / WOT が FA3 の弱位相・弱*位相と明確に区別されている。
7. 二重可換子定理の意味と核心証明を追える。
8. predual と normal functional の関係を説明できる。
9. $M_n(\mathbb C)$、$C(K)$、$B(H)$、$L^\infty(X,\mu)$ の4例を通して各概念を検証できる。
10. factor と type I / II / III 分類が「名前だけの紹介」にならず、center・projection の構造から動機を説明できる。
11. 既存 PDE・確率解析等へ不要な prerequisite を追加していない。
12. 全変更章が DREAM THEATER の導入・証明・例・演習・詳細解答の規約を満たす。
13. FA8--FA10 で、閉作用素から $C_0$ 半群・生成作用素・Hille--Yosida・mild solution までが PDE から再利用できる stable result として閉じている。

---

## 12. 最終的な科目像

完成後の見取り図は次とする。

~~~text
関数解析 I
  ノルム空間
  Banach / Hilbert 空間
  双対
  Hahn--Banach
  Baire
  一様有界性
  開写像・閉グラフ

        ↓

関数解析 II
  弱位相・弱*位相
  Banach--Alaoglu
  反射性
  スペクトル・レゾルベント
  コンパクト作用素
  Fredholm
  コンパクト自己共役作用素

  ├─→ 発展枝：FA8--FA10
  │     閉作用素
  │     C0 半群・生成作用素
  │     Hille--Yosida
  │     抽象 Cauchy 問題・mild solution
  │
  └─→ 作用素環論 I
        Banach 環
        Gelfand 理論
        C*-環
        連続関数計算
        Gelfand--Naimark
        状態・GNS
        一般スペクトル定理
          ↓
        作用素環論 II
  SOT / WOT
  可換子・二重可換子
  von Neumann 環
  極分解・射影
  predual
  normal state / trace
  可換 von Neumann 環
  factor・型分類への入口
~~~

この4科目構成を、今後の関数解析・作用素環系列の設計基準とする。
