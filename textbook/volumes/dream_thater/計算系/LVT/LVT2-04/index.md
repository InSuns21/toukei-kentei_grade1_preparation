# LVT2-04 タクティク・証明状態・局所補題

長い証明項を一度に書く代わりに、今必要な命題を一つずつ解決します。証明状態を読み、各指示がどの論理規則に対応するか説明できるようにしましょう。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT2-04)。編集したソースを Lean Web で試せます。固定 toolchain での検証はラボの Codespaces または下記のコマンドを使います。

## 1. 証明の途中を読む

前講では [Leanの書換え操作](../LVT2-03/index.md#def-lvt2-03-rw) により等式を使って目標を変えました。今回は、何が手元にあり、何をまだ証明しなければならないかを明示します。[Leanの命題型](../LVT2-01/index.md#def-lvt2-01-prop) に従い、`P Q : Prop` は二つの命題、`hp : P` は P の証明を表すとします。[Leanの含意の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-imp) によれば、`f : P → Q` は P の証明を受け取って Q の証明を返す関数です。目標 Q を満たすには、関数適用 `f hp : Q` を作ります。

Lean の Infoview は、証明途中で使える変数・仮定を局所文脈、これから構成する証明の型を目標（ゴール）として表示します。`Γ ⊢ T` の Γ（ガンマ）は局所文脈全体、T はその文脈で証明したい命題を表します。局所定義とはその場所で名前を付けた項です。記号 `⊢` の下または右が目標です。証明が分岐すると未解決のゴールが複数になります。

<a id="def-lvt2-04-state"></a>

<!-- formal-statement-start -->
### 定義（Leanの証明状態）

本講で扱う命題の証明では、証明状態を、未解決の各ゴールとそれぞれの局所文脈の組の列として捉える。局所文脈 Γ はそのゴールで利用できる型付きの変数・仮定・局所定義を記録し、目標 T : Prop は構成すべき証明の型を表す。Γ ⊢ T はこの証明責務を表す。未解決ゴールがなくなれば、その証明責務はすべて解決されたことになる。実際の Lean の状態にはさらに内部の型推論用の情報もある。
<!-- formal-statement-end -->


<!-- definition-example-start: def-lvt2-04-state -->
**定義の確認**　P Q : Prop、f : P → Q、hp : P が文脈 Γ にあり、目標が Q と表示される場合、f hp : Q はこの文脈で型が決まる。f 単独の型は `P → Q` で、一般には目標 Q と一致しない。f hp を渡すとこのゴールが解決し、他にゴールがなければ未解決の列は空になる。
<!-- definition-example-end -->


```text
P Q : Prop
f : P → Q
hp : P
⊢ Q
```

以下では状態を説明のために整形して示します。実際の表示名や case ラベルは Lean の表示設定によって変わります。

## 2. 五つの基本操作

`by` の中に書く証明構成の指示をタクティクと呼びます。[帰納型](../LVT1-03/index.md#def-lvt1-03-inductive-type) の構成子は、その型の項を作る方法でした。命題の証明にもこの考え方を使います。各指示は証明項の一部を構成し、残った証明責務を新しい目標として提示します。[Leanの含意の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-imp)、[Leanの連言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-and)、[Leanの選言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-or) を具体的な操作に対応させます。型が一致するかは文字列ではなく、[Leanの定義的等しさ](../LVT2-03/index.md#def-lvt2-03-defeq) による変換も含めて判定します。

<a id="def-lvt2-04-tactic"></a>

<!-- formal-statement-start -->
### 定義（Leanの基本タクティク）

タクティクとは、現在の証明状態に対して証明項を構成し、残る証明責務を更新する指示である。本講で用いる単純な命題の形では、intro は含意や全称量化の目標から引数を局所文脈に導入し、apply は指定した関数の結論を目標と照合して未解決の引数を新しいゴールにし、exact は型が目標と定義的に一致する項でゴールを閉じる。constructor は目標の構成子を選んで必要な引数を求め、cases は局所仮定をその構成子ごとの場合に分解する。実際には型推論で引数が決まることもあり、操作が適用できないときは失敗する。
<!-- formal-statement-end -->


<!-- definition-example-start: def-lvt2-04-tactic -->
**定義の確認**　目標 P → P に intro hp を実行すると hp : P が文脈に加わり、目標が P になる。exact hp はこの型と一致する項を与えるのでゴールを閉じる。最終的な証明項は `fun hp => hp` であり、元の型 `P → P` を持つ。`fun hp =>` は仮定 hp を引数として束縛する記法である。残る三つの操作は直後の例で確認する。
<!-- definition-example-end -->


```lean
example (P : Prop) : P → P := by
  intro hp
  exact hp
```

### 2.1 apply と exact

目標 Q に f : P → Q を apply すると、まだ与えていない引数の型 P が目標になります。f を適用しただけで P が成立するわけではありません。次に hp : P を exact で渡すことで f hp : Q が完成します。

```lean
example (P Q : Prop) (f : P → Q) (hp : P) : Q := by
  apply f
  exact hp
```

### 2.2 constructor と cases

[Leanの連言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-and) により、`And.intro hp hq : P ∧ Q` には `hp : P` と `hq : Q` がこの順で必要です。`constructor` はこの二つのゴールを作ります。点（`·`）の字下げは、そのうち一つのゴールに対する証明を区切る記法です。

```lean
example (P Q : Prop) (hp : P) (hq : Q) : P ∧ Q := by
  constructor
  · exact hp
  · exact hq
```

反対に `h : P ∧ Q` からは `cases h` で構成子 And.intro の二つの引数を取り出せます。`| intro hp hq =>` はその構成子の場合に引数を hp、hq と名付ける記法です。ここでの intro は構成子名で、引数を導入するタクティク intro とは役割が異なります。唯一の枝の文脈に `hp : P` と `hq : Q` が入り、目標 Q を hq で閉じます。

[Leanの選言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-or) では `h : P ∨ Q` に Or.inl と Or.inr の二つの構成子があります。`cases h with` 以下の `| inl hp =>` と `| inr hq =>` はそれぞれの枝です。目標を `Q ∨ P` とすると、左枝では `hp : P` を右側に入れた `Or.inr hp : Q ∨ P`、右枝では `hq : Q` を左側に入れた `Or.inl hq : Q ∨ P` が必要です。枝の中の仮定はその枝でのみ使えます。

```lean
example (P Q : Prop) (h : P ∧ Q) : Q := by
  cases h with
  | intro hp hq => exact hq
```


```lean
example (P Q : Prop) (h : P ∨ Q) : Q ∨ P := by
  cases h with
  | inl hp => exact Or.inr hp
  | inr hq => exact Or.inl hq
```

## 3. 逆向きに証明を組む

二つの処理 f と g をつなぐとき、最終的な出力から必要な入力へ逆向きにたどれます。

<a id="prop-lvt2-04-compose"></a>

<!-- formal-statement-start -->
### 命題（Leanの含意の合成のタクティク証明）

任意の命題 P, Q, R : Prop と証明 f : P → Q、g : Q → R に対して、P → R の証明を intro、apply、exact によって構成できる。
<!-- formal-statement-end -->

**証明の見取り図**　R を得るために g を使い、Q を得るために f を使います。最後は導入した P の証明が残ります。

<!-- proof-start -->
### 証明

intro hp によって hp : P を仮定し目標 R となる。apply g で目標 Q、apply f で目標 P となる。exact hp で閉じる。逆向きに選んだ関数を順方向に合成すると f hp : Q、g (f hp) : R である。[Leanの含意の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-imp) により fun hp => g (f hp) : P → R が得られる。
```lean
theorem composeProof (P Q R : Prop) (f : P → Q) (g : Q → R) : P → R := by
  intro hp
  apply g
  apply f
  exact hp
```

<!-- proof-end -->

| 操作直後 | 目標 | 新たに分かったこと |
| --- | --- | --- |
| 開始 | P → R | f, g は引数として与えられている |
| intro hp | R | hp : P |
| apply g | Q | R を作る関数 g を選んだ |
| apply f | P | Q を作る関数 f を選んだ |
| exact hp | なし | すべて解決 |

例えば任意の `n m : Nat` を固定し、P を `n = m`、Q を `m = n`、R を `m + 1 = n + 1` とします。

- `h : n = m` から [Leanの等式の対称律と推移律](../LVT2-03/index.md#prop-lvt2-03-chain) により `Eq.symm h : m = n` を得るので、`fun h => Eq.symm h` は P → Q の型を持ちます。この関数を f とします。
- `e : m = n` から [Leanの関数適用に関する等式の合同性](../LVT2-03/index.md#prop-lvt2-03-congr) を関数 `fun x : Nat => x + 1` に適用します。`congrArg (fun x : Nat => x + 1) e` の型は `m + 1 = n + 1` です。e を受け取ってこの証明を返す関数 g は Q → R の型を持ちます。

したがって元の h から `g (f h) : R` が得られます。x は関数内の引数であり、固定した n、m とは区別します。

## 4. 局所補題で共有する

同じ中間結果を何度も使うなら、先に一度証明して名前を与えると、主証明が見通しやすくなります。`have` は新しい中間命題の証明を要求し、成立した証明を局所文脈に加えます。スコープとはその名前を利用できる範囲のことで、例えば have の後の同じ証明ブロックではその名前を使えます。

<a id="def-lvt2-04-local"></a>

<!-- formal-statement-start -->
### 定義（Leanの局所補題）

局所補題とは、証明中の文脈 Γ で構成し、以後そのスコープ内で名前を付けて参照する中間命題の証明である。have h : U := by ... は U : Prop を証明する副ゴールを作り、これを解決した後、元のゴールの文脈に h : U を追加する。U の成立を新しい未証明の仮定として追加する操作ではない。
<!-- formal-statement-end -->


<!-- definition-example-start: def-lvt2-04-local -->
**定義の確認**　`P Q R : Prop`、`f : P → Q`、`hp : P`、`g : Q → R` がある文脈で元の目標を R とします。`have hq : Q := by exact f hp` の副ゴールは Q であり、hq 自身を仮定せず、[Leanの含意の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-imp) で作る `f hp : Q` を渡して閉じます。元のゴール R に戻って初めて `hq : Q` を利用でき、`g hq : R` で閉じられます。次のコードは `:=` の右側に証明項を直接与える短い書き方です。
<!-- definition-example-end -->


```lean
example (P Q R : Prop) (f : P → Q) (g : Q → R) (hp : P) : R := by
  have hq : Q := f hp
  exact g hq
```

## 5. 複数の入力経路から同じ保証を得る

入力の由来が二通りあっても、どちらからも共通の条件 R を得られるとします。さらに R から S が導けるなら、両経路に対して R と S を保証できます。

<a id="prop-lvt2-04-route"></a>

<!-- formal-statement-start -->
### 命題（Leanの選言による仕様の分岐）

任意の命題 P, Q, R, S : Prop、証明 f : P → R、g : Q → R、k : R → S、h : P ∨ Q が与えられれば、R ∧ S の証明を構成できる。
<!-- formal-statement-end -->

**証明の見取り図**　h を二つの場合に分けて共通の中間条件 R を局所補題として確立し、その条件を二つのゴールに再利用します。

<!-- proof-start -->
### 証明

まず [Leanの局所補題](#def-lvt2-04-local) により命題 R を副ゴールにする。hr はこの副ゴールの解決後に使える証明名である。h の左枝では hp : P が得られ、f hp : R を返す。右枝では hq : Q が得られ、g hq : R を返す。[Leanの選言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-or) により Or.elim h f g : R が構成される。元の目標 R ∧ S に戻り、[Leanの連言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-and) により And.intro に hr : R と k hr : S を渡す。これで R ∧ S の証明が完成する。
```lean
theorem routeProof (P Q R S : Prop) (f : P → R) (g : Q → R)
    (k : R → S) (h : P ∨ Q) : R ∧ S := by
  have hr : R := by
    cases h with
    | inl hp => exact f hp
    | inr hq => exact g hq
  constructor
  · exact hr
  · exact k hr
```

<!-- proof-end -->

この一般的な保証から f または g の仮定を単に取り除くことはできません。[Leanの命題型](../LVT2-01/index.md#def-lvt2-01-prop) の True、False を使い、P を False、Q を True、R と S を False と選びます。f と k はともに `False → False` の恒等関数で、`h := Or.inr True.intro : False ∨ True` も構成できます。しかし g の型 `True → False` の証明があれば `g True.intro : False` が得られてしまいます。結論 `False ∧ False` の証明も第一成分に False の証明を要求するため構成できません。右枝で R を作る手段が失われています。逆に P を True、Q を False と選び、h を Or.inl True.intro とすれば f を外した場合の左枝の失敗になります。

## 6. 実行・失敗からの修復

本講の [実行ラボ](../browser-lab.html?chapter=LVT2-04) で Inspect を選び、VS Code を使う場合は各タクティクの直後にカーソルを置いて Infoview を読みます。Main は二つの主要命題の証明を使った例を検査し、LVT2-04 OK を表示します。ExerciseSolutions は全演習の Lean コードです。Failure では h : P ∧ Q を P として exact に渡したため型不一致になります。h から And.left h を取り出す修復は演習 B03 で行います。

固定バージョンは [lean-toolchain](lab/lean-toolchain) で指定しています。リポジトリのルートから次を実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT2-04/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

最後のコマンドだけは失敗することが期待結果です。成功した証明コードは [LvtTactics.lean](lab/LvtTactics.lean) にあります。ゴールが閉じたことと、そもそも正しい仕様を命題として選んだことは別々に確認しましょう。

## 7. 演習と詳細解答

### Level A

### LVT2-04-A01 全称量化と含意

任意の n : Nat について n = n を intro と exact で証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの全称量化の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-forall) により `intro n` で任意の `n : Nat` が局所変数となり、目標は `n = n` になる。[Leanの等式と反射律](../LVT2-03/index.md#def-lvt2-03-eq) により `Eq.refl n : n = n` が得られるので exact で閉じる。証明項 `fun n => Eq.refl n` は特定の n を選ばず任意の n を受け取る。

```lean
example : ∀ n : Nat, n = n := by
  intro n
  exact Eq.refl n
```
<!-- solution-end -->

### LVT2-04-A02 apply と exact

P Q : Prop、f : P → Q、hp : P から Q を apply と exact で示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの基本タクティク](#def-lvt2-04-tactic) に従い apply f は Q を作るための引数 P を新しい目標にする。hp : P があるので exact hp で閉じ、元の目標の証明 `f hp : Q` が得られる。

```lean
example (P Q : Prop) (f : P → Q) (hp : P) : Q := by
  apply f
  exact hp
```
<!-- solution-end -->

### LVT2-04-A03 連言を組み立てる

P Q : Prop、hp : P、hq : Q から Q ∧ P を constructor で作れ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの連言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-and) により constructor は And.intro に対応し、先に Q、次に P を要求する。hq で Q を閉じ、hp で P を閉じる。And.intro hq hp と同じ結論になる。

```lean
example (P Q : Prop) (hp : P) (hq : Q) : Q ∧ P := by
  constructor
  · exact hq
  · exact hp
```
<!-- solution-end -->

### LVT2-04-A04 連言を分解する

P Q : Prop、h : P ∧ Q から Q を cases で示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの連言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-and) により連言の構成子 And.intro の引数 hp : P と hq : Q を取り出す。唯一の枝で目標は Q のままなので hq を渡す。

```lean
example (P Q : Prop) (h : P ∧ Q) : Q := by
  cases h with
  | intro hp hq => exact hq
```
<!-- solution-end -->

### LVT2-04-A05 局所補題の型

P Q R : Prop、f : P → Q、g : Q → R、hp : P から R を have を使って示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの局所補題](#def-lvt2-04-local) と [Leanの含意の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-imp) を使う。f hp : Q を得て hq と名付ける。g の入力型は Q なので g hq : R。元の目標 R を exact で閉じる。

```lean
example (P Q R : Prop) (f : P → Q) (g : Q → R) (hp : P) : R := by
  have hq : Q := f hp
  exact g hq
```
<!-- solution-end -->

### Level B

### LVT2-04-B01 二つの枝を取り違えない

P Q : Prop、h : P ∨ Q から Q ∨ P を cases で証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[Leanの選言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-or) を使う。左の枝では hp : P を得るので右側の構成子 Or.inr hp : Q ∨ P を選ぶ。右の枝では hq : Q を得るので左側の構成子 Or.inl hq : Q ∨ P を選ぶ。両枝を閉じて元の選言に対する証明になる。

```lean
example (P Q : Prop) (h : P ∨ Q) : Q ∨ P := by
  cases h with
  | inl hp => exact Or.inr hp
  | inr hq => exact Or.inl hq
```
<!-- solution-end -->

### LVT2-04-B02 局所補題と等式の向き

a b c : Nat、h : a = b、k : c = b から a = c を have と apply で示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[Leanの等式の対称律と推移律](../LVT2-03/index.md#prop-lvt2-03-chain) により Eq.symm k : b = c を hbc とする。`Eq.trans h` は h の型 `a = b` により始点 a と中間点 b が決まり、目標 `a = c` によって終点 c が決まる。したがって `apply Eq.trans h` の残りのゴールは `b = c`。`exact hbc` で閉じると `Eq.trans h (Eq.symm k) : a = c` になる。

```lean
example (a b c : Nat) (h : a = b) (k : c = b) : a = c := by
  have hbc : b = c := Eq.symm k
  apply Eq.trans h
  exact hbc
```
<!-- solution-end -->

### LVT2-04-B03 失敗した exact の修復

P Q : Prop、h : P ∧ Q の下で目標 P に exact h と書くと失敗する理由を説明し、cases を使わず修復せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

h の型は P ∧ Q であり、一般には [Leanの定義的等しさ](../LVT2-03/index.md#def-lvt2-03-defeq) で目標 P と一致しない。[Leanの連言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-and) の射影 And.left h : P を作って exact に渡す。例えば P を True、Q を False とすると P の証明 True.intro は存在するが、True ∧ False の証明からは第二成分として False が得られてしまう。これは二つの命題が一般には同じでないことを示す例であり、この具体例で h が存在するという主張ではない。

```lean
example (P Q : Prop) (h : P ∧ Q) : P := by
  exact And.left h
```
<!-- solution-end -->

### Level C

### LVT2-04-C01 二経路の共通条件

P Q R S : Prop、f : P → R、g : Q → R、k : R → S から (P ∨ Q) → (R ∧ S) を証明せよ。まず R の局所補題を cases で作り、続いて constructor を使う。証明項でも書け。

- Level: C

<!-- solution-start -->
#### 詳細解答

[Leanの含意の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-imp) に従い intro h で `h : P ∨ Q` を得る。残る目標は `R ∧ S` であり、[Leanの選言による仕様の分岐](#prop-lvt2-04-route) と同じ構成を自分で実行する。

- have hr : R の副ゴール R では、[Leanの選言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-or) により左枝 hp : P に f hp : R、右枝 hq : Q に g hq : R を与える。両枝の目標 R は hp、hq に依存しない。
- 元の目標 R ∧ S に戻ると hr : R が利用できる。[Leanの連言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-and) に従い constructor で R と S を要求し、前者を hr、後者を k hr : S で閉じる。
- 証明項では `Or.elim h f g : R` が得られる。`let hr := ...; ...` はセミコロンより後でその項に hr という名前を付けて使う記法である。`And.intro hr (k hr) : R ∧ S` を作り、h を `fun h =>` で束縛すれば元の含意の型になる。

```lean
example (P Q R S : Prop) (f : P → R) (g : Q → R)
    (k : R → S) : (P ∨ Q) → (R ∧ S) := by
  intro h
  have hr : R := by
    cases h with
    | inl hp => exact f hp
    | inr hq => exact g hq
  constructor
  · exact hr
  · exact k hr
example (P Q R S : Prop) (f : P → R) (g : Q → R)
    (k : R → S) : (P ∨ Q) → (R ∧ S) :=
  fun h => let hr := Or.elim h f g; And.intro hr (k hr)
```
<!-- solution-end -->

## 8. 次講への接続

次講では自然数やリストを構成子ごとに分けるだけでなく、より小さい入力の証明を利用する構造帰納法を学びます。

参考：[Theorem Proving in Lean 4 — Tactics](https://lean-lang.org/theorem_proving_in_lean4/tactics.html)。
