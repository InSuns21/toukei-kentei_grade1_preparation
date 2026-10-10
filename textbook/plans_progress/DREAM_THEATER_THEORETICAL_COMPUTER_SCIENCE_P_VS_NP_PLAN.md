# DREAM THEATER 理論計算機科学 — オートマトンから P vs NP への道 コース計画

作成日: 2026-10-04  
状態: in_progress

## 0. 目的

本計画は、DREAM THEATER に現在欠けている **形式言語・オートマトン、計算可能性、計算量理論** の主線を新設し、最終的に $P$ vs $NP$ 問題を「有名な未解決問題」として眺めるのではなく、

1. 何を入力とする判定問題なのか。
2. 計算モデルをどう数学的に定義するのか。
3. 「計算できる」と「効率よく計算できる」をどう分離するのか。
4. $P$、$NP$、coNP、NP-hard、NP-complete が何を意味するのか。
5. Cook--Levin の定理で Turing 機械の計算をなぜ SAT へ符号化できるのか。
6. なぜ一つの NP 完全問題の多項式時間アルゴリズムが全 NP 問題へ波及するのか。
7. $P\stackrel{?}{=}NP$ が何を主張し、何を主張していないのか。
8. 既知の証明技法が相対化、Natural Proofs、algebrization などの障壁にどこで当たるのか。
9. 回路、乱択、通信、証明、論理、暗号、量子計算などが計算量理論とどう接続するのか。

を、自力で説明・証明・帰着構成できるところまで導くための設計台帳である。

本科目群は、現在の DREAM THEATER の「計算系」に属する新しい理論主線とする。数値解析・離散最適化のように「問題をどう解くか」を扱う科目とは責務を分け、こちらでは **何が計算可能か、何が効率よく計算可能か、問題同士の難しさをどう比較するか** を中心にする。

中心となる通読像は次とする。

~~~text
集合・写像・論理記号
      ↓
形式言語・有限オートマトン
      ↓
文脈自由言語・Pushdown automaton
      ↓
Turing 機械
      ↓
決定可能性・停止問題・帰着
      ↓
時間計算量・空間計算量
      ↓
P / NP / coNP
      ↓
Cook--Levin
      ↓
NP 完全性
      ↓
P vs NP
      ↓
高度な計算量理論・証明障壁
~~~

セル・オートマトンは主線の途中に「局所規則で普遍計算ができること」と「時空間図の局所整合性」を可視化する補講として置き、Cook--Levin の tableau 構成へ接続する。

---

## 1. 現状と canonical owner の責務分担

### 1.1 現状

2026-10-04 時点の DREAM THEATER には、次を一つの系列として扱う canonical owner はない。

- 形式言語
- 有限オートマトン
- 文脈自由文法
- Pushdown automaton
- Turing 機械
- 計算可能性
- 決定不能性
- 計算量クラス $P,NP$
- NP 完全性
- Cook--Levin の定理
- $P$ vs $NP$
- 回路計算量・乱択計算量・多項式階層
- 計算量下界の証明障壁

したがって本系列を新規 canonical owner とする。

### 1.2 離散最適化との境界

既存の離散最適化は、整数計画、ネットワーク最適化、マッチング、整数多面体など「有限・離散問題をどう解くか」が主役である。

理論計算機科学系列では、

- 判定問題への定式化
- 多項式時間帰着
- NP-hard / NP-complete
- 計算量下界
- 近似困難性

を主役とする。

将来、離散最適化側で NP-hardness を利用する場合は、本系列の stable result を参照する。逆に、本系列でマッチングや線形計画のアルゴリズムを再実装しない。

### 1.3 論理との境界

命題論理の真理値、論理結合、量化記号、集合・写像は既存基礎を再利用する。

一方、

- Boolean 式を入力文字列として符号化すること
- SAT を判定問題として扱うこと
- 回路を計算モデルとして扱うこと
- 有限構造上の論理と計算量の対応

は本系列の責務とする。

数理論理一般、Gödel の不完全性定理、モデル理論、集合論的独立性を本系列の prerequisite へ一括追加しない。

---

## 2. 科目構成

公開科目は、実装時点で原則として次の四科目へ分ける。

1. **計算理論 I：形式言語・オートマトン**
2. **計算理論 II：計算可能性**
3. **計算量理論 I：$P$・$NP$・NP 完全性**
4. **計算量理論 II：階層・回路・乱択・証明障壁**

「学部レベル」「大学院レベル」のような教育段階名は主科目名に使わない。I / II は内容上の自然な切れ目を表す。

管理 ID は、実装開始時点で衝突がなければ次を採用する。

- AUT1--AUT7: 形式言語・オートマトン
- CMP1--CMP8: 計算可能性
- CELL1--CELL3: セル・オートマトン補講
- CPLX1--CPLX21: 計算量理論

既存 ID と衝突した場合は実装前に再設計する。plan 段階では public index や knowledge DAG へ未実装 ID を登録しない。

---

## 3. prerequisite 方針

本科目群の入口は可能な限り軽くする。

### 3.1 主 prerequisite

- F0-00A: 集合・写像・量化記号
- 必要に応じて有限集合・直積・関係・同値関係
- 初歩的な数学的帰納法
- 有限グラフの最小限の語彙

線形代数、実解析、位相空間論、測度論は主線 prerequisite にしない。

### 3.2 章内で新たに導入するもの

次は「知っているもの」と仮定せず、最初に必要になった章で導入する。

- アルファベット、文字列、言語
- 漸近記法 $O,\Omega,\Theta$
- 入力長
- 計算モデル
- Boolean 回路
- 証明書・検証器
- 多項式時間帰着
- oracle
- 乱択計算モデル

アルゴリズム実装経験を prerequisite として暗黙要求しない。擬似コードを使う場合は、その場で読める形にする。

---

## 4. 計算理論 I：形式言語・オートマトン

### AUT1 文字列・形式言語・判定問題

中心問い:

> 「問題を解く」を、数学ではどのような対象として表せばよいか。

扱う内容:

- 有限アルファベット $\Sigma$
- 文字列、空文字、長さ
- $\Sigma^*$
- 形式言語 $L\subseteq\Sigma^*$
- 判定問題と言語の対応
- yes-instance / no-instance
- 数、グラフ、論理式を文字列へ符号化する考え方
- 符号化の違いと入力長

主要例:

- 偶数個の 1 を含む二進文字列
- 回文
- SAT の入力を文字列として見る入口
- グラフ到達可能性を符号化する入口

ここで「判定問題へ直す」という視点を明示し、後続の $P$ / $NP$ が言語のクラスとして定義される準備をする。

### AUT2 決定性有限オートマトン

扱う内容:

- 状態・入力・遷移・初期状態・受理状態
- 決定性有限オートマトン（DFA）
- 拡張遷移関数
- 認識言語
- 状態遷移図
- 積オートマトン
- 正規言語の和・共通部分・補集合に対する閉性

主要証明:

- 積構成による共通部分
- 受理状態の補集合による補集合閉性

### AUT3 非決定性有限オートマトン・正規表現

扱う内容:

- 非決定性有限オートマトン（NFA）
- $\varepsilon$-遷移
- subset construction
- DFA と NFA の表現力同値
- 正規表現
- Kleene の定理

「非決定性」を最初にここで経験させるが、$NP$ の非決定性 Turing 機械とは計算時間の意味が違うことを後続で明示する。

### AUT4 正規言語の限界

扱う内容:

- ポンピング補題
- Myhill--Nerode 同値関係
- 右合同
- 最小 DFA
- 状態数下界

主要目標:

- $\{0^n1^n:n\ge0\}$ が正規でないことを証明できる。
- Myhill--Nerode により「有限状態では記憶が足りない」を構造的に説明できる。

### AUT5 文脈自由文法

扱う内容:

- 文法・生成規則
- 導出
- 構文木
- 曖昧性
- 文脈自由言語
- Chomsky 標準形への入口

例:

- 括弧列
- $0^n1^n$
- 算術式

### AUT6 Pushdown automaton

扱う内容:

- スタック
- Pushdown automaton
- 非決定性
- 文脈自由文法との等価性
- CFL の閉性と非閉性の代表例

有限状態からスタックへ記憶能力を増やすと何が変わるかを中心にする。

### AUT7 Chomsky 階層と計算モデルへの橋

扱う内容:

- 正規言語
- 文脈自由言語
- 文脈依存言語
- recursively enumerable language への入口
- 記憶構造と表現力
- Turing 機械を必要とする理由

公開本文では分類名の暗記で終えず、

> 有限状態では何を記憶できず、スタックでは何が可能になり、それでも何が足りないのか

を最小例から示す。

---

## 5. 計算理論 II：計算可能性

### CMP1 Turing 機械

中心問い:

> 「任意のアルゴリズム」を数学的対象として扱うには、どこまで単純な機械で十分か。

扱う内容:

- テープ
- ヘッド
- 状態
- 遷移関数
- configuration
- 計算履歴
- 受理・拒否・停止しない場合
- decider と recognizer

少なくとも一つの簡単な Turing 機械を入力から受理まで手で追う。

### CMP2 計算モデルの頑健性

扱う内容:

- 多テープ Turing 機械
- 非決定性 Turing 機械
- RAM 的モデルへの入口
- モデル間シミュレーション
- Church--Turing thesis

「同じ関数を計算できる」と「同じ計算量で計算できる」を分ける。

### CMP3 万能計算と自己参照

扱う内容:

- Turing 機械自身の符号化 $\langle M\rangle$
- $\langle M,x\rangle$
- 万能 Turing 機械
- プログラムをデータとして扱うこと
- 自己参照への入口

停止問題の対角線論法が突然見えない形で現れないようにする。

### CMP4 決定可能・認識可能・列挙可能

扱う内容:

- decidable
- recognizable
- co-recognizable
- enumerator
- recognizer と列挙器の対応

### CMP5 停止問題と対角線論法

主要結果:

- $A_{TM}$ の決定不能性
- HALT の決定不能性
- 対角化

証明では「自分自身を入力する」箇所と論理矛盾が生じる箇所を省略しない。

### CMP6 計算可能性の帰着

扱う内容:

- many-one reduction
- 決定不能性を移す方法
- mapping reduction の向き
- $A\le_m B$ から何が従うか

ここで後の多項式時間帰着と共通する「難しさを写す」発想を作る。

### CMP7 Rice の定理

扱う内容:

- 言語の意味的性質
- 非自明性
- Rice の定理
- syntactic property との区別
- 適用できる例 / できない例

### CMP8 $\lambda$ 計算・再帰関数・計算可能性の同値像

扱う内容:

- $\lambda$ 計算の最小導入
- 再帰関数的計算の入口
- 異なる計算モデルが同じ「計算可能性」を捉えるという見方
- Church--Turing thesis の位置付け

完全な型理論やプログラミング言語意味論へは広げない。

---

## 6. 補講：セル・オートマトン

セル・オートマトンは独立の主 prerequisite ではなく、CMP2 後から CPLX7 までの間に読む補講系列とする。

### CELL1 局所規則と時空間図

扱う内容:

- 一次元セル・オートマトン
- 有限状態集合
- 近傍
- 局所更新則
- 時空間図
- 有限伝播速度
- elementary cellular automata の小例

中心的な見方:

$$
x_i(t+1)
=
F(x_{i-r}(t),\ldots,x_{i+r}(t)).
$$

「次の状態は局所的に決まるが、長時間後の全体像は複雑になり得る」ことを具体例で見る。

### CELL2 普遍計算と計算モデル

扱う内容:

- セル・オートマトンによる計算
- Turing 機械を時空間発展として見る
- 普遍計算
- Rule 110 等の位置付け
- Turing complete と「高速に計算できる」の違い

個別の巨大な普遍性証明を本講義の必須完成条件にはしない。必要なら定理として参照し、計算量理論へ必要な「局所更新で一般計算を表現できる」という構造を重点的に扱う。

### CELL3 局所整合性から Cook--Levin へ

中心問い:

> 計算全体の正しさを、なぜ多数の小さな局所条件に分解できるのか。

扱う内容:

- Turing 計算履歴の時空間 tableau
- 各時刻・テープ位置のセル
- 合法な局所遷移
- 初期条件
- 受理条件
- 局所窓の整合性

ここでは SAT への完全符号化をまだ終えず、CPLX7 の Cook--Levin で Boolean 式へ落とすための視覚的・構造的橋を作る。

---

## 7. 計算量理論 I：P・NP・NP 完全性

### CPLX1 入力サイズ・時間計算量・空間計算量

扱う内容:

- 入力長 $n=|x|$
- worst-case complexity
- $O,\Omega,\Theta$
- 多項式時間
- 指数時間
- 単項符号化 / 二進符号化
- pseudo-polynomial time への入口
- 時間と空間の資源

### CPLX2 クラス $P$

扱う内容:

- deterministic polynomial time
- $P$
- 計算モデル変更に対する多項式時間の頑健性
- グラフ到達可能性などの具体例

「$n^{100}$ も $P$」という形式的事実と、「実用上高速」の意味を区別する。

### CPLX3 クラス $NP$：証明書と検証

中心問い:

> 答えを速く見つけられなくても、与えられた答えを速く検証できるとは何か。

扱う内容:

- polynomially balanced certificate
- polynomial-time verifier
- $NP$
- SAT, CLIQUE, Hamiltonian cycle などの証明書

定義を「非決定性機械で解ける」で始めず、最初に具体的な証明書・検証から入る。

### CPLX4 非決定性 Turing 機械と $NP$

扱う内容:

- nondeterministic polynomial time
- 計算木
- verifier 定義との同値
- $P\subseteq NP$
- coNP
- TAUT
- $NP\cap coNP$

### CPLX5 多項式時間 many-one 帰着

扱う内容:

$$
A\le_p B.
$$

- reduction algorithm
- yes / no の保存
- 合成
- $B\in P$ なら $A\in P$
- hardness を移す向き

帰着の向きを取り違えないことを重点演習にする。

### CPLX6 NP-hard・NP-complete

扱う内容:

- NP-hard
- NP-complete
- $P=NP$ との同値な言い換え
- 「NP-complete = 解けない」ではないこと
- 未解決性と条件付き結論の区別

### CPLX7 Cook--Levin の定理

本科目群の第一の山場とする。

中心問い:

> 任意の非決定性多項式時間計算を、一つの Boolean 充足可能性問題へどう翻訳するか。

tableau の各セルに対し、必要に応じて

$$
X_{t,i,s}
=
\text{時刻 }t\text{、位置 }i\text{ が記号・状態 }s\text{ を持つ}
$$

型の Boolean 変数を導入する。

論理式を少なくとも次へ分解する。

$$
\varphi
=
\varphi_{\mathrm{cell}}
\land
\varphi_{\mathrm{start}}
\land
\varphi_{\mathrm{move}}
\land
\varphi_{\mathrm{accept}}.
$$

証明責務:

1. 各セルがちょうど一つの状態を持つ。
2. 初期配置が入力 $x$ と一致する。
3. 隣接時刻が合法な Turing 遷移に従う。
4. 受理状態が現れる。
5. 充足割当てから受理計算を復元できる。
6. 受理計算から充足割当てを作れる。
7. 変数数・節数が $|x|$ の多項式で抑えられる。

最終的に

$$
M\text{ accepts }x
\iff
\varphi_{M,x}\in SAT
$$

と

$$
|\varphi_{M,x}|=\operatorname{poly}(|x|)
$$

を閉じる。

「tableau を SAT に符号化できる」で核心を飛ばさない。

### CPLX8 SAT から 3-SAT へ

扱う内容:

- CNF
- clause
- 3-CNF
- 長い節の分解
- 補助変数
- equisatisfiable と equivalent の違い
- 多項式サイズ評価

### CPLX9 グラフ問題への帰着

候補:

- 3-SAT $\le_p$ CLIQUE
- CLIQUE $\leftrightarrow$ Independent Set
- Independent Set $\leftrightarrow$ Vertex Cover
- Hamiltonian cycle への代表帰着

「ガジェット」を、なぜその形にするのかから説明する。

### CPLX10 数値問題と弱 NP 完全性

扱う内容候補:

- Subset Sum
- Partition
- Knapsack の判定版
- 二進符号化
- pseudo-polynomial algorithm
- weakly / strongly NP-hard の入口

離散最適化側に既存 canonical owner ができた場合は重複せず相互参照する。

### CPLX11 $P$ vs $NP$

中心問い:

> ここまで定義した道具を使うと、ミレニアム問題は正確には何を問うているのか。

扱う内容:

- $P\subseteq NP$
- $P=NP$ と NP 完全問題の多項式時間可解性の同値
- $P\ne NP$ を示すために必要なこと
- search vs decision の関係
- self-reducibility の代表例
- $P=NP$ が意味すること
- $P=NP$ だけから直ちには従わないこと
- 暗号への含意を過剰に単純化しない
- Clay Millennium Problem の位置付け

CPLX11 を読んだ時点で、読者が問題文そのものを厳密に説明できることを第一到達点とする。

---

## 8. 計算量理論 II：高度な計算量理論

### CPLX12 空間計算量

扱う内容:

- $L$
- $NL$
- $PSPACE$
- configuration graph
- time と space の基本関係

### CPLX13 Savitch の定理

主要結果:

$$
NSPACE(s(n))
\subseteq
DSPACE(s(n)^2)
$$

の標準形。

到達可能性を中点で再帰分割する核心を完全に追う。

### CPLX14 PSPACE 完全性と TQBF

扱う内容:

- quantified Boolean formula
- TQBF
- PSPACE membership
- PSPACE-hardness の構成
- alternating view への入口

### CPLX15 階層定理

扱う内容:

- deterministic time hierarchy
- space hierarchy
- diagonalization
- 「より多くの資源が本当により多くの問題を解く」こと

### CPLX16 多項式階層

扱う内容:

- $\Sigma_k^P,\Pi_k^P$
- alternating quantifiers
- oracle characterization
- $P=NP$ のときの collapse
- coNP との接続

### CPLX17 Oracle と相対化

扱う内容:

- oracle Turing machine
- $P^A,NP^A$
- Baker--Gill--Solovay 型相対化障壁の意味
- 「oracle の世界で両方の答えが作れる」ことが何を制限するか

ここで証明障壁の第一段階へ入る。

### CPLX18 回路計算量

扱う内容:

- Boolean circuit
- size
- depth
- circuit family
- uniform / non-uniform
- $P/poly$
- formula vs circuit
- 下界問題

### CPLX19 回路下界への入口

扱う内容候補:

- $AC^0$
- parity 下界
- switching lemma の位置付け
- monotone circuit lower bounds
- 一般回路下界との巨大な距離

完全証明を採用する結果は実装時に proof owner を明確化する。高度な下界を結果名だけ列挙しない。

### CPLX20 乱択計算

扱う内容:

- $RP$
- $coRP$
- $ZPP$
- $BPP$
- error reduction
- randomized algorithms
- pseudorandomness への入口
- derandomization と lower bounds の接点

### CPLX21 $P$ vs $NP$ の証明障壁

本科目群の第二の山場とする。

扱う内容:

1. relativization
2. Natural Proofs
3. algebrization
4. circuit lower bound と擬似乱数の接続
5. 「障壁」は $P\ne NP$ の証明不可能性を示す定理ではないこと
6. どの種類の証明技法が排除され、何がまだ残っているか

読者が、

> なぜ既知の典型的手法を単純に強化するだけでは難しいのか

を技術的な理由付きで説明できることを到達点とする。

---

## 9. 主線から分岐する関連分野

以下は重要だが、主線の全読者へ prerequisite として課さない。CPLX11 または CPLX21 修了後に独立計画へ分ける。

## 9.1 近似アルゴリズム・近似困難性・PCP

- approximation ratio
- PTAS / FPTAS
- MAX-SAT
- PCP theorem
- gap reduction
- hardness of approximation

離散最適化との交差が大きいため、実装時は責務分担を先に確定する。

## 9.2 パラメータ化計算量

- parameter $k$
- fixed-parameter tractability
- $FPT$
- kernelization
- $W[1],W[2]$
- Clique を代表例とする hardness

## 9.3 Fine-grained complexity

- SETH
- 3SUM conjecture
- Orthogonal Vectors
- conditional lower bound
- $n^2$ と $n^{2-\varepsilon}$ の差を問う考え方

## 9.4 通信計算量

- deterministic / randomized communication complexity
- rectangle
- fooling set
- discrepancy
- set disjointness
- streaming・data structure lower bound への応用

## 9.5 証明計算量

- propositional proof system
- proof length
- resolution
- Frege 系
- $NP$ / $coNP$ との接続

## 9.6 記述計算量・有限モデル理論

- finite structure
- first-order logic
- existential second-order logic
- Fagin の定理

代表的到達点:

$$
NP
=
\text{existential second-order definability}.
$$

## 9.7 暗号理論

P vs NP との関係を誤って単純化しないことを最優先にする。

- average-case complexity
- one-way function
- pseudorandom generator
- semantic security
- public-key cryptography
- zero-knowledge proof

特に $P\ne NP$ だけから一般的な暗号の存在が直ちに従うわけではないことを明示する。

## 9.8 量子計算量

既存線形代数を prerequisite とする別枝。

- quantum circuit
- $BQP$
- Grover
- Shor
- $QMA$
- $NP$ との既知の関係

「量子計算機なら NP 完全問題をすべて高速に解ける」という誤解を避ける。

## 9.9 アルゴリズム情報理論

- Kolmogorov complexity
- incompressibility
- universal machine
- algorithmic randomness
- uncomputability of $K(x)$

計算可能性と情報・ランダム性を結ぶ独立枝とする。

---

## 10. 依存地図

主線は次とする。

~~~text
F0-00A 集合・写像・量化記号
  ↓
AUT1--AUT4 正規言語・有限オートマトン
  ↓
AUT5--AUT7 文脈自由言語・PDA・Chomsky 階層
  ↓
CMP1--CMP4 Turing 機械・計算モデル・認識可能性
  ↓
CMP5--CMP8 決定不能性・帰着・Rice・計算可能性の同値像
  ├──────────────→ CELL1--CELL3 セル・オートマトン補講
  ↓
CPLX1--CPLX6 P / NP / 帰着 / NP 完全性
  ↓
CPLX7 Cook--Levin
  ↓
CPLX8--CPLX10 代表的 NP 完全問題
  ↓
CPLX11 P vs NP
  ↓
CPLX12--CPLX16 空間計算量・階層
  ↓
CPLX17--CPLX21 oracle・回路・乱択・証明障壁
~~~

発展分岐:

~~~text
CPLX11 / CPLX21
  ├─→ 近似困難性・PCP
  ├─→ パラメータ化計算量
  ├─→ Fine-grained complexity
  ├─→ 通信計算量
  ├─→ 証明計算量
  ├─→ 記述計算量
  ├─→ 暗号理論
  ├─→ 量子計算量
  └─→ アルゴリズム情報理論
~~~

この図は plan 上の学習設計であり、実装時の正式 dependency は各章の chapter.yaml / knowledge.yaml に必要最小限で登録する。

---

## 11. 教育設計上の重点

## 11.1 「機械の定義」だけを連続させない

有限オートマトン、PDA、Turing 機械を formal definition の列として並べない。

各モデルで、

1. それまでのモデルで何ができるか。
2. どの具体例で記憶能力が不足するか。
3. 何を追加すれば不足を埋められるか。
4. 新しいモデルでも何ができないか。

を先に示す。

## 11.2 帰着は必ず具体的に作る

「既知の NP 完全問題から帰着すればよい」で終えない。

最低限、

- 入力変換
- yes-instance の保存
- no-instance の保存
- サイズが多項式であること
- 構成時間が多項式であること

を追う。

## 11.3 Cook--Levin を最大の証明教材の一つにする

Cook--Levin では、Turing 機械、セル・オートマトンの時空間図、局所整合性、Boolean 式の四者を接続する。

DREAM THEATER の「2--4 手の非自明な省略を読者へ押し付けない」規約を特に厳格に適用する。

## 11.4 未解決問題と定理を区別する

- $P=NP$ か $P\ne NP$ かは未解決。
- NP 完全性や階層定理は証明済み。
- 証明障壁は「$P\ne NP$ を証明できない」という不可能性定理ではない。

この三者を混同しない。

## 11.5 実装可能性と抽象理論を往復する

必要に応じて小さな DFA、NFA、PDA、Turing 機械、SAT、帰着ガジェットを手で追う。

ただしプログラミング実習を必須 prerequisite にしない。コードは概念理解を助ける補助として扱う。

---

## 12. 演習方針

実装時は DREAM_THEATER_EXERCISE_POLICY.md の A4 / B3 / C1 を各章の標準とする。

系列固有の典型演習は次とする。

### Level A

- DFA を実際に走らせる
- NFA を DFA に変換する
- 簡単な文法の導出木を書く
- Turing 機械の configuration を追う
- $O,\Theta$ を判定する
- certificate を構成して verifier を書く

### Level B

- 非正規性を証明する
- CFG と PDA を相互変換する
- 決定不能性の帰着を構成する
- polynomial reduction を構成する
- SAT ガジェットの正しさを両方向に証明する
- 時間・空間階層の証明を部分再構成する

### Level C

- 新しい問題について NP 完全性を最初から示す
- Cook--Levin の一部符号化を別の機械モデルで再構成する
- oracle / circuit / proof barrier の仮定を比較し、どこまで結論が移るか証明する

題数水増しのため、同じ帰着を問題名だけ変えて反復しない。

---

## 13. 実装フェーズ

## Phase 0: inventory と用語・依存設計

- 既存 DREAM THEATER 全体で関連語・重複結果を再検索する。
- 公開科目名、ID、stable anchor 方針を確定する。
- 離散最適化、集合論、将来の数理論理との責務境界を確定する。
- terminology guide に必要な日本語主表記を追加するか判断する。
- knowledge DAG への登録は実装ページ単位で行う。

完了条件:

- 未実装 ID を public index に先行登録しない。
- 重複 canonical owner を作らない。

## Phase 1: 計算理論 I

AUT1--AUT7 を実装する。

重点監査:

- DFA / NFA / 正規表現の同値性
- pumping lemma の量化順序
- Myhill--Nerode
- CFG / PDA の対応

## Phase 2: 計算理論 II + セル・オートマトン補講

CMP1--CMP8、CELL1--CELL3 を実装する。

重点監査:

- recognizer / decider の区別
- 停止問題の対角化
- 帰着の向き
- Church--Turing thesis を定理扱いしない
- CELL3 と Cook--Levin の責務重複を避ける

## Phase 3: 計算量理論 I

CPLX1--CPLX11 を実装する。

最重要 gate:

- CPLX7 Cook--Levin を教育的・数学的に完全な状態へする。
- CPLX8--CPLX10 の少なくとも複数の代表帰着を詳細に閉じる。
- CPLX11 で $P$ vs $NP$ の定式化・含意・非含意を明確化する。

## Phase 4: 計算量理論 II

CPLX12--CPLX21 を実装する。

重点:

- Savitch
- hierarchy theorem
- PH
- relativization
- circuit complexity
- randomized complexity
- Natural Proofs / algebrization

証明が大規模になる結果は、独立 canonical chapter 化するか、本章で閉じるかを実装前に決める。「標準結果」とだけ書いて完成扱いしない。

## Phase 5: 発展枝の優先順位判定

主線完成後、次の独立 plan の採否・順序を決める。

第一候補:

1. 近似アルゴリズム・PCP
2. 暗号理論
3. 量子計算量
4. パラメータ化計算量
5. 通信計算量
6. 証明計算量
7. 記述計算量
8. Fine-grained complexity
9. アルゴリズム情報理論

この順序は固定しない。既存 DREAM THEATER の進捗と依存の完成度を見て再評価する。

---

## 14. 公開索引・通読順への反映方針

plan 作成時点では textbook/dream-theater-index.json と textbook/dream-theater-standard-math-core.md を変更しない。

最初の実装科目が DREAM THEATER の完成条件を満たした時点で、公開索引の「計算系」に科目を追加する。

標準通読順では、線形代数・実解析などの解析主幹を prerequisite にしない独立枝として、

~~~text
集合論
  ├─→ 線形代数 → 実解析 → ...
  └─→ 計算理論 I → 計算理論 II → 計算量理論 I → 計算量理論 II
~~~

と分岐できる設計を第一候補とする。

ただし、公開通読順は実装済み章の実 dependency から決定し、plan の図を独立した依存正本にはしない。

---

## 15. 本計画に含めないもの

主線を肥大化させないため、次は本計画の完成条件には含めない。

- コンパイラ理論全般
- プログラミング言語意味論全般
- 型理論全般
- 圏論的計算理論
- 分散計算量
- オンラインアルゴリズム
- streaming algorithms の体系
- data structure lower bounds の体系
- learning theory 全般
- game complexity 全般
- interactive proof / PCP の完全系列
- quantum information theory 全般
- cryptography の実装・プロトコル工学
- logic in computer science 全般

これらは主線から自然な必要性が生じた時点で別 plan とする。

---

## 16. 最終到達点

主線完成時、読者は少なくとも次を自力で説明できる状態を目標とする。

1. 有限オートマトン、PDA、Turing 機械の表現力の違い。
2. 決定可能性と計算量の違い。
3. 停止問題がなぜ決定不能か。
4. $P$、$NP$、coNP の定義と代表例。
5. certificate/verifier と非決定性 Turing 機械による $NP$ の定義がなぜ一致するか。
6. polynomial-time reduction が難しさをどう移すか。
7. Cook--Levin の tableau 符号化を主要中間式・局所制約から再構成する方法。
8. SAT から複数の代表 NP 完全問題への帰着。
9. $P=NP$ と NP 完全問題の多項式時間可解性がなぜ同値か。
10. $P$ vs $NP$ が暗号・最適化等に関係する一方、それだけで全てを決める問題ではない理由。
11. PSPACE、PH、乱択、回路などが $P/NP$ の外側にどのような地図を作るか。
12. relativization、Natural Proofs、algebrization がどの証明戦略を制限するか。
13. セル・オートマトンの時空間図と Cook--Levin の局所整合性が同じ構造を共有する理由。
14. 通信計算量、証明計算量、記述計算量、暗号、量子計算、PCP 等がどの地点から分岐するか。

最終的な目標は「$P$ vs $NP$ の答えを知る」ことではなく、

> **問題を厳密に定式化し、NP 完全性の核心証明を追い、現代の計算量理論で何が既知で何が未解決なのかを自分で地図化できること**

とする。
 
## 17. 進捗

- 2026-10-08: Phase 0 の初期確認。F0-00A を AUT1 の直接前提とし、離散最適化のアルゴリズム本論・数理論理一般との責務を分離。形式言語と符号化の正本を AUT 系列に確定。
- 2026-10-08: AUT1「文字列・形式言語・判定問題」を本文・主要結果・10題の詳細解答まで実装。AUT2--AUT7 は未実装。
- 2026-10-08: AUT1 の依存監査では一般的な「要素が有限個」という条件を本文で具体的に説明し、後続の論理式の充足可能性のみを明示的な予告参照として登録した。work-state の章見出し階層と PR 査読証拠の要件を確認した。
- 2026-10-08: AUT1 の正式公開前構造監査に合わせて glossary.yaml を追加。KaTeX で使えない命題記号列の数式表記を、入力符号化の通常文へ置換した。
- 2026-10-09: CPLX2「クラスP」を執筆。言語クラスの定義、到達可能集合の帰納的不変条件、隣接行列の多項式時間判定、固定本数作業テープの模倣、補集合・和集合・共通部分への閉性、10題の演習解答を追加。CPLX3へ進行。
- 2026-10-09: CPLX3「クラスNP：証明書と検証」を追加。証明書・検証器・NPの量化定義、長さ切断命題、SAT・CLIQUE・有向Hamilton閉路のNP所属定理、およびA5/B4/C1の詳細解答を実装。次はCPLX4。
- 2026-10-10: CPLX7「Cook–Levinの定理」を実装。有限幅の計算表、Boolean変数X/H/Z、セル・初期配置・一歩遷移・受理の四制約、受理枝と真の割当ての双方向構成、節数・出力時間の多項式評価、SATのNP完全性の証明を記載。演習A5/B4/C1と詳細解答を執筆し、章・索引・series・work-stateをCPLX8への進行に同期。

- 2026-10-10: Phase 4 に着手。CPLX12「空間計算量」を追加し、読み取り専用入力と作業テープの分離、L・NL・PSPACE、計算配置数と時間上界、STCONのNL所属、NL⊆P・NP⊆PSPACEの完全証明、演習A5/B4/C1の詳細解答を実装。CPLX13「Savitchの定理」へ進行。
- 2026-10-10: CPLX13「Savitch の定理」を実装。中間点再帰の両方向・停止性・再帰スタック上界・空間構成可能性・NSPACE(s)⊆DSPACE(s²)・NPSPACE=PSPACEを証明し、A5/B4/C1全10題の詳細解答を追加。CPLX14へ進行。
- 2026-10-10: CPLX14「PSPACE完全性とTQBF」を実装。QBFの意味論と選択ゲーム、深さ優先評価によるPSPACE所属、多項式長の一歩関係、存在・全称量化を使った共有到達可能性式、TQBFへの多項式時間帰着を詳細に証明。A5/B5/C1の全11題と詳細解答を追加し、CPLX15へ進行。

- 2026-10-10: CPLX15「階層定理」を実装。時間・空間構成可能性、パディング、万能模倣の償却費用、決定性時間階層定理・空間階層定理の対角化と停止性、P⊊EXPTIME・PSPACE⊊EXPSPACEの導出、A5/B4/C1の詳細解答を追加。CPLX16へ進行。
- 2026-10-10: CPLX16「多項式階層」を実装。量化子によるSigma/Pi階層、coNPとの双対性、PH⊆PSPACE、適応的oracle問い合わせの実行記録を使ったSigma(k+1)=NP^Sigma(k)の双方向証明、階層崩壊条件とP=NP/NP=coNPの帰結を補強。A5/B4/C1の全10題と詳細解答を追加し、CPLX17へ進行。

- 2026-10-10: CPLX18「回路計算量」を実装。Boolean回路のサイズ・深さ、依存変数下界、式と共有の区別、回路族とuniform生成、P/polyに決定不能言語が含まれる証明、PとP-uniformの同値、助言との同値、Shannon型計数下界を詳細に構成。A5/B4/C1全10題と詳細解答を追加し、公開facade・索引・系列・work-stateをCPLX19への進行に同期。
- 2026-10-10: CPLX19「回路下界への入口」を追加。parityの深さ2 DNF/CNF指数下界、二本信号XORの対数深さ構成、制限後parityと決定木、単調しきい値関数のDNF下界と動的回路上界、二入力一般回路の線形下界を証明。一般AC0下界と単調マッチング下界は適用範囲を区別して参考文献へ案内。A5/B4/C1全10題の詳細解答を追加し、CPLX20へ進行。
- 2026-10-10: CPLX20「乱択計算」を新設。乱択Turing機械、RP・coRP・BPP・ZPP、片側誤りと多数決の指数的増幅、ZPP=RP∩coRP、BPP⊆P/poly、短い種による条件付き脱乱択化を証明。A5/B4/C1全10題の詳細解答を追加し、CPLX21へ進行。

- 2026-10-10: Phase 4の最終章CPLX21「P vs NPの証明障壁」を実装。相対化の論理的限界、Natural Proofsの具体的三条件と擬似乱数識別器の条件付き衝突、多重線形拡張の存在一意性、A5/B4/C1の演習と詳細解答を追加。CPLX系列はCPLX21まで完了。Phase 2のセル・オートマトン補講やPhase 5の発展分岐採否は本章とは別の残タスクであり、PLAN全体は進行中に留める。
