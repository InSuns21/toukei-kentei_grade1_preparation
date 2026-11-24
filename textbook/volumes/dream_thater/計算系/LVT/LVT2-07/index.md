# LVT2-07 依存型・部分型・不変条件を型へ

前講では [到達可能性の生成規則](../LVT2-06/index.md#def-lvt2-06-reach) により、値とは別に到達の証明を作りました。今回は値を受け取るインターフェースそのものに条件を含めます。例えば「長さが3のリスト」「使用数が容量以下の状態」だけを受け取る関数を作れば、呼出し側は条件の証明を一緒に用意します。ただし、範囲内の値を返すことと、要求どおりに値を更新することは違います。その違いを小さな予約システムで確かめます。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT2-07)。

## 1. 入力によって型が変わる関数

ここでは Lean の `Nat` を自然数（0 を含む非負整数）と呼びます。`A : Type` は型 A、`a : A` はその型の項、`f a` は関数適用を表します（[Leanの等式](../LVT2-03/index.md#def-lvt2-03-eq) の記法）。

通常の関数型 Nat → Nat では出力の型 Nat は入力の値と無関係です。一方、長さ2のリストを選んだ後には有効な添字は Fin 2、長さ3なら Fin 3 になります。[Fin型](../LVT1-05/index.md#def-lvt1-05-fin-index) の上界は、自然数の値を引数に取って型を決める例です。こうした値を添字とする型の集まりを型族として扱います。`B : A → Type` は入力 a ごとに型 `B a` を返す関数です。`(a : A) → B a` では a が右側にも現れます。前講の到達命題の添字は終点を指定しましたが、ここでは結果のデータ型を指定します。

<a id="def-lvt2-07-dependent"></a>

<!-- formal-statement-start -->
### 定義（依存関数型）

A を型、B : A → Type を型族（各 a : A に型 B a を対応させる関数）とする。依存関数型 (a : A) → B a の項 f は、任意の a : A に対し f a : B a を与える関数である。B が a に依存しないときは通常の関数型になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-07-dependent -->
**定義の確認**　A = Nat、B n = Fin (n + 1) とする。f n を番号0と 0 < n + 1 の証明の組にすると、任意の自然数 n に対して後者は `Nat.zero_lt_succ n : 0 < Nat.succ n` で得られる。[定義的等しさ](../LVT2-03/index.md#def-lvt2-03-defeq) により `n + 1` は `Nat.succ n` に簡約されるため、この証明の型は Fin (n + 1) の要求する条件そのものである。n = 0 なら f 0 : Fin 1、n = 2 なら f 2 : Fin 3 であり、同じ関数が入力ごとに異なる型の値を返す。
<!-- definition-example-end -->

```lean
def firstL (n : Nat) : Fin (n + 1) :=
  ⟨0, Nat.zero_lt_succ n⟩
```

複数引数を取る関数でも、後の引数の型が先の引数に依存できます。

```lean
def readL (xs : List Nat) (i : Fin xs.length) : Nat := xs.get i
```

これはリスト xs を受け取ると Fin xs.length → Nat 型の関数を返す、という依存関数型です。xs = [5, 8] のとき xs.length = 2 なので番号1と 1 < 2 の証明を組にすれば、xs.get は先頭5の次の8を返します。空リストでは Fin 0 を構成できないので、この関数に渡せる添字がありません。長さが異なる別のリストへ添字を渡すには、対応する上界の証明が必要です。

## 2. 値と条件を組にする

Fin では値と上界の証明を組にしました。今度は任意の命題を条件にできます。[Curry–Howard対応](../LVT2-01/index.md#def-lvt2-01-curry-howard) で学んだように、P a : Prop の項は命題 P a の証明です。値 a とその証明を一緒に保持する Lean の Subtype を使います。`P : A → Prop` は各 a に命題を対応させる[述語](../LVT2-02/index.md#def-lvt2-02-forall) です。`{a : A // P a}` の `//` より右が値の条件、`⟨a, h⟩` の第一成分が値、第二成分がその条件の証明です。ドット記法 `x.val` と `x.property` はそれぞれの成分を取り出します。

<a id="def-lvt2-07-subtype"></a>

<!-- formal-statement-start -->
### 定義（部分型）

A : Type と P : A → Prop に対し、部分型 {a : A // P a} は値 a : A と証明 h : P a の組 ⟨a, h⟩ の型である。項 x から値 x.val : A と証明 x.property : P x.val を取り出せる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-07-subtype -->
**定義の確認**　A = Nat、P n = (0 < n) とする。値4は自然数であり、0 < 4 は真なので [決定可能性](../LVT2-01/index.md#def-lvt2-01-decidable) に基づく `by decide` で証明を構成できる。組 `x := ⟨4, by decide⟩` の値 `x.val` は4、`x.property` の型は `0 < x.val`、すなわち `0 < 4` になる。値0では 0 < 0 が偽なので、この値を保ったまま部分型の項にはできない。
<!-- definition-example-end -->

```lean
def PositiveL := {n : Nat // 0 < n}

def nextPositive (n : Nat) : PositiveL :=
  ⟨n + 1, Nat.zero_lt_succ n⟩
```

例えば nextPositive 4 の値は 4 + 1 = 5 であり、証明の欄は 0 < 5 を保証します。すべての n に対する関数なので、具体的な n を判定するのではなく、任意の n の後者は正という Nat.zero_lt_succ を適用しています。Fin n も自然数と上界の証明を持ちますが、Lean では Fin と一般の Subtype は別の型です。条件が同じでも型が自動的に一致するわけではありません。また Lean は同じ命題 `P a` の二つの証明を定義的に等しいと扱います（証明の無関係性）。したがって同じ部分型で値 a が同じなら、証明欄を異なる方法で構成しても `⟨a, h₁⟩` と `⟨a, h₂⟩` は定義的に等しくなります。これは異なる命題の証明を交換できるという意味ではありません。

## 3. リストの長さを型に含める

リストの型 List Nat だけでは長さは定まりません。値がリストであり、その長さが指定された自然数と等しいことまで要求する表現を作ります。[リストの再帰的構成](../LVT1-04/index.md#def-lvt1-04-list-constructors) では `[]` は空リスト、`a :: xs` は先頭 a と残り xs からなるリストです。`xs.length` は要素数で、空なら0、先頭追加なら残りの長さに1を足します。ここでは [部分型](#def-lvt2-07-subtype) の条件を長さの等式にします。

<a id="def-lvt2-07-sized"></a>

<!-- formal-statement-start -->
### 定義（長さ付きリスト）

自然数 n に対し SizedL n を {xs : List Nat // xs.length = n} と定める。値の欄は自然数リスト、証明の欄は長さと n の等式である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-07-sized -->
**定義の確認**　[8,9] は自然数リストで、空リストの長さ0から先頭追加のたびに1を加えると length [8,9] = (0 + 1) + 1 = 2 となる。従って ⟨[8,9], by decide⟩ は SizedL 2 の項になる。SizedL 3 には同じ値を入れられない（2 = 3 が偽）。
<!-- definition-example-end -->

```lean
def SizedL (n : Nat) := {xs : List Nat // xs.length = n}
```

先頭に一つ追加する操作の型には、結果の長さが n + 1 になることを記述できます。

<a id="prop-lvt2-07-prepend"></a>

<!-- formal-statement-start -->
### 命題（長さ付きリストの先頭追加）

任意の n,a : Nat と xs : SizedL n に対し、値の欄が a :: xs.val となる SizedL (n + 1) の項 prependL a xs を構成できる。
<!-- formal-statement-end -->

**証明の見取り図**　元の長さの等式を取り出し、両辺に自然数の後者（1を加えた数）を適用します。

<!-- proof-start -->
### 証明

[長さ付きリスト](#def-lvt2-07-sized) より xs.property : xs.val.length = n を得る。リストの長さは先頭追加に対して次のように計算される。

```text
(a :: xs.val).length
= xs.val.length + 1
= n + 1
```

最後の等号は既習の [合同性](../LVT2-03/index.md#prop-lvt2-03-congr) を自然数の後者 Nat.succ に適用したもの。Lean の m + 1 は Nat.succ m に定義的に簡約されるので congrArg Nat.succ xs.property が必要な等式を与える。値 a :: xs.val とその証明を組にする。値の射影は構成時の第一成分そのものなので、[定義的等しさ](../LVT2-03/index.md#def-lvt2-03-defeq) により `rfl` で一致する。コードの `{n : Nat}` は暗黙引数で、xs の型 SizedL n から n が推論される。

```lean
def prependL {n : Nat} (a : Nat) (xs : SizedL n) : SizedL (n + 1) :=
  ⟨a :: xs.val, congrArg Nat.succ xs.property⟩

theorem prepend_value {n : Nat} (a : Nat) (xs : SizedL n) :
    (prependL a xs).val = a :: xs.val := rfl
```

<!-- proof-end -->

例えば prependL 7 ⟨[8,9], by decide⟩ は値 [7,8,9] と長さ3の証明を持ちます。戻り値の型だけからは、その値が元のリストの先頭追加であるとは分かりません。長さ3の別のリストも型の条件を満たすため、値の等式 prepend_value に意味があります。

## 4. 容量制約を持つ予約システム

容量 cap 個の資源のうち n 個を使用中とします。n は自然数なので負にはならず、さらに n ≤ cap を要求します。操作を何回行っても成立してほしい状態の性質が不変条件です（[到達証明の不変量原理](../LVT2-06/index.md#prop-lvt2-06-invariant)）。この章では状態の型を制限し、状態を返す操作がその条件を満たす証明も返すようにします。ここでは使用数の上界を状態の型に含めます。

<a id="def-lvt2-07-used"></a>

<!-- formal-statement-start -->
### 定義（容量制約付き状態）

容量 cap : Nat に対し UsedL cap を {n : Nat // n ≤ cap} と定める。状態 s : UsedL cap の使用数は s.val、容量条件の証明は s.property である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-07-used -->
**定義の確認**　cap = 3 とする。使用数2は自然数であり 2 ≤ 3 なので有効である。満杯の3も 3 ≤ 3 なので有効である。4では 4 ≤ 3 が偽なので有効な状態にならない。cap = 0 では使用数0だけが条件を満たす。
<!-- definition-example-end -->

予約には [Option型](../LVT1-03/index.md#def-lvt1-03-option) を使います。`some` は成功した状態を包み、`none` は失敗を表します。`if h : n ≤ cap then ... else ...` は条件を判定し、真の枝で h を条件の証明として使う記法です（[検査付き配列読み出しの二分岐](../LVT1-05/index.md#prop-lvt1-05-checked-array)）。

```lean
def UsedL (cap : Nat) := {n : Nat // n ≤ cap}

def checkedUsed (cap n : Nat) : Option (UsedL cap) :=
  if h : n ≤ cap then some ⟨n, h⟩ else none

def reserveL {cap : Nat} (s : UsedL cap) : Option (UsedL cap) :=
  checkedUsed cap (s.val + 1)
```

外から渡された数値はそのまま信用せず、[検査付き配列読み出しの二分岐](../LVT1-05/index.md#prop-lvt1-05-checked-array) と同様に条件を判定します。真の枝だけで証明 h を使い状態を構成します。予約では現在の使用数を一つ増やした候補を渡します。Option の some は成功、none は失敗を表します。

<a id="prop-lvt2-07-reserve"></a>

<!-- formal-statement-start -->
### 命題（予約操作の二分岐）

任意の cap : Nat と s : UsedL cap について、h : s.val + 1 ≤ cap があれば reserveL s = some ⟨s.val + 1, h⟩ となる。この不等式が成立しなければ reserveL s = none となる。
<!-- formal-statement-end -->

**証明の見取り図**　予約候補を n = s.val + 1 と置き、checkedUsed の条件を二分します。成功時には容量だけでなく使用数が正確に1増えることも分かります。

<!-- proof-start -->
### 証明

reserveL s を展開すると checkedUsed cap (s.val + 1) である。さらに checkedUsed を展開する。h があるなら if は真の枝を選び、値 s.val + 1 と h の組を some で包む。否定 h があるなら偽の枝を選び none を返す。[決定可能性](../LVT2-01/index.md#def-lvt2-01-decidable) により自然数の比較は判定できるので、この二枝がすべての場合を覆う。n = s.val + 1 と略記すると、計算は次のようになる。

```text
reserveL s
= checkedUsed cap n
= if h' : n ≤ cap then some ⟨n, h'⟩ else none
= some ⟨n, h⟩   （h : n ≤ cap の場合）
  または none   （h : ¬ (n ≤ cap) の場合）
```

真の枝の h' と仮定 h は同じ命題の証明なので、証明の無関係性により組の証明欄は一致する。偽の枝の h は条件の否定を表し、真の枝とは別の場合の名前である。[簡約タクティク](../LVT2-03/index.md#def-lvt2-03-simp) `simp [reserveL, checkedUsed, h]` は二つの定義と局所仮定 h を使ってこの分岐を簡約する。

```lean
theorem reserve_in {cap : Nat} (s : UsedL cap) (h : s.val + 1 ≤ cap) :
    reserveL s = some ⟨s.val + 1, h⟩ := by
  simp [reserveL, checkedUsed, h]

theorem reserve_out {cap : Nat} (s : UsedL cap) (h : ¬ (s.val + 1 ≤ cap)) :
    reserveL s = none := by
  simp [reserveL, checkedUsed, h]
```

<!-- proof-end -->

| 容量 | 現在の使用数 | 候補 | 結果 |
|---:|---:|---:|---|
| 3 | 2 | 3 | some（使用数3） |
| 3 | 3 | 4 | none |
| 0 | 0 | 1 | none |

some の中身からは .property によって容量条件を取り出せます。一方、常に0へ戻す関数も同じ状態型を返せます。`Nat.zero_le cap : 0 ≤ cap` は任意の自然数 cap について0が下界であるという標準補題です。

```lean
def resetL {cap : Nat} (_ : UsedL cap) : UsedL cap :=
  ⟨0, Nat.zero_le cap⟩
```

容量3、使用数2から resetL を呼ぶと使用数0であり、0 ≤ 3 は真ですが、予約が求める使用数3ではありません。型に書いた条件と操作の仕様は別です。さらに、実際のデータベースが同時予約をどう扱うかは、この純粋な状態モデルだけでは証明していません。

## 5. Leanで実験する

[実行ラボ](../browser-lab.html?chapter=LVT2-07) の Inspect で型、値8、5、[7,8,9]、some 3、none を確認します。Main はこれらの計算例を #guard で検査します。ExerciseSolutions は全演習の証明を含みます。Failure は SizedL 2 をそのまま SizedL 3 として返そうとし、型の不一致で拒否されます。先頭追加を用いて修正してみましょう。

固定版の [lean-toolchain](lab/lean-toolchain) と [LvtDependent.lean](lab/LvtDependent.lean) を用います。リポジトリのルートから実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT2-07/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

最後のコマンドだけが失敗するのが期待結果です。

## 6. 演習と詳細解答

### Level A

### LVT2-07-A01 長さに依存する添字

readL [5,8] に番号1を渡し、結果を証明せよ。番号2をそのまま渡せない理由も述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Fin型](../LVT1-05/index.md#def-lvt1-05-fin-index) において n = [5,8].length = 2 とする。1 < 2 なので ⟨1, by decide⟩ : Fin 2 を構成できる。readL は xs.get i に展開され、番号1では先頭を一つ飛ばし、次の8が選ばれる。`[5,8] = 5 :: (8 :: [])` であり、番号1の読み出しは残り `[8]` の番号0の読み出しに帰着する。そこで8を得る。[定義的等しさ](../LVT2-03/index.md#def-lvt2-03-defeq) により `rfl` で閉じる。番号2の場合 2 < 2 が偽である。

```lean
example : readL [5, 8] ⟨1, by decide⟩ = 8 := rfl
```
<!-- solution-end -->

### LVT2-07-A02 正の自然数

値4を PositiveL として構成し、値0については必要な条件が偽であることを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[部分型](#def-lvt2-07-subtype) の A を Nat、P を 0 < n とする。4は自然数であり 0 < 4 は真なので decide が証明を作る。一方、0 < 0 は偽で、その否定は decide で証明できる。従って値0のままでは証明欄を埋められない。

```lean
example : PositiveL := ⟨4, by decide⟩
example : ¬ (0 < (0 : Nat)) := by decide
```
<!-- solution-end -->

### LVT2-07-A03 空の長さ付きリスト

SizedL 0 の項を一つ構成せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[長さ付きリスト](#def-lvt2-07-sized) の n に0を代入する。空リスト [] は List Nat で、length [] は定義により0なので、必要な等式 [] の長さ = 0 は rfl で証明される。二つを組にする。

```lean
example : SizedL 0 := ⟨[], rfl⟩
```
<!-- solution-end -->

### LVT2-07-A04 証明の取り出し

任意の s : UsedL 5 について s.val ≤ 5 を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[容量制約付き状態](#def-lvt2-07-used) の cap を5にすると条件は n ≤ 5 である。部分型の第二成分 s.property の型は s.val ≤ 5 そのものなので、新たに数値を計算する必要はない。

```lean
example (s : UsedL 5) : s.val ≤ 5 := s.property
```
<!-- solution-end -->

### Level B

### LVT2-07-B01 先頭追加を二回行う

a,b : Nat、xs : SizedL 2 から、先頭が a,b の順になる SizedL 4 の項を構成せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[長さ付きリストの先頭追加](#prop-lvt2-07-prepend) をまず n = 2、追加値 b で適用する。値 b :: xs.val、長さ 2 + 1 = 3 を得る。次に n = 3、追加値 a で適用する。値 a :: b :: xs.val、長さ 3 + 1 = 4 となる。二回の追加の結果型は `SizedL ((2 + 1) + 1)` であり、[定義的等しさ](../LVT2-03/index.md#def-lvt2-03-defeq) により `SizedL 4` と一致する。

```lean
example (a b : Nat) (xs : SizedL 2) :
    SizedL 4 := prependL a (prependL b xs)
```
<!-- solution-end -->

### LVT2-07-B02 境界での予約

容量3について使用数2と3からの予約結果をそれぞれ証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

両状態は 2 ≤ 3、3 ≤ 3 により有効である。[予約操作の二分岐](#prop-lvt2-07-reserve) において使用数2では候補 2 + 1 = 3 が 3 ≤ 3 を満たすため reserve_in にその証明を渡す。使用数3では候補 3 + 1 = 4 が 4 ≤ 3 を満たさないため reserve_out に否定の証明を渡す。いずれも具体的比較は [決定可能性](../LVT2-01/index.md#def-lvt2-01-decidable) に基づく `by decide` で閉じる。コードの `_` は期待する等式の左辺から状態引数を Lean に推論させる位置である。成功結果の証明欄が別の `by decide` で作られていても、同じ命題の証明であるため等式は成立する。

```lean
example : reserveL (⟨2, by decide⟩ : UsedL 3) =
    some ⟨3, by decide⟩ := reserve_in _ (by decide)
example : reserveL (⟨3, by decide⟩ : UsedL 3) = none :=
  reserve_out _ (by decide)
```
<!-- solution-end -->

### LVT2-07-B03 不変条件と要求の違い

容量3、使用数2の状態に resetL を適用した結果が、有効な状態だが予約後の使用数3ではないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

resetL は ⟨0, Nat.zero_le 3⟩ を返す。[容量制約付き状態](#def-lvt2-07-used) の条件 0 ≤ 3 は成立する。値を取り出すと0であり 0 ≠ 3 は真であるから、次の証明が得られる。型の不変条件だけでは予約の事後条件を導けない。

```lean
example : (resetL (⟨2, by decide⟩ : UsedL 3)).val ≠ 3 := by decide
```
<!-- solution-end -->

### Level C

### LVT2-07-C01 容量2の予約列と保証の範囲

容量2、使用数0から予約を3回試みる。各回の成功結果を次回の入力とし、失敗なら直前の状態を保持するものとする。各回の戻り値を証明し、任意の有効状態の容量条件を示せ。外部実装との一致がこの証明に含まれるか説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

初期状態は ⟨0, by decide⟩ : UsedL 2 である。[予約操作の二分岐](#prop-lvt2-07-reserve) を cap = 2 に固定して使う。第一回は 0 + 1 = 1 ≤ 2 なので some（使用数1）、第二回は 1 + 1 = 2 ≤ 2 なので some（使用数2）、第三回は 2 + 1 = 3 で 3 ≤ 2 が偽なので none になる。失敗時の規則により状態は使用数2のままである。任意の s : UsedL 2 の第二成分は [容量制約付き状態](#def-lvt2-07-used) により s.val ≤ 2 を与えるので、保持された状態でも容量を超えない。

```lean
example : reserveL (⟨0, by decide⟩ : UsedL 2) =
    some ⟨1, by decide⟩ := reserve_in _ (by decide)
example : reserveL (⟨1, by decide⟩ : UsedL 2) =
    some ⟨2, by decide⟩ := reserve_in _ (by decide)
example : reserveL (⟨2, by decide⟩ : UsedL 2) = none :=
  reserve_out _ (by decide)
example (s : UsedL 2) : s.val ≤ 2 := s.property
```

失敗時に状態を保持する規則は問題文の仮定である。実際のサーバーが同じ入力状態を使い、同じ更新規則と失敗処理を実行することは別に検証する必要がある。例えば二つの利用者が同時に使用数1を読み、別々に予約する処理は、この逐次モデルの証明だけでは排除できない。
<!-- solution-end -->

## 7. 次講への接続

依存する型を使うことで、値の有効性を関数のインターフェースに移せました。必要な証明は具体的な判定、既習補題、簡約などから構成しました。次講では定理探索や自動化を使いながら、何が証明されているのかを検査します。

参考：[Functional Programming in Lean — Dependent Types](https://lean-lang.org/functional_programming_in_lean/)、[Theorem Proving in Lean 4](https://lean-lang.org/theorem_proving_in_lean4/)。
