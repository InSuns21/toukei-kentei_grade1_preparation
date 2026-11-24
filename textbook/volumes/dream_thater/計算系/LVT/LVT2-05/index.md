# LVT2-05 自然数・リストの構造帰納法

前講では [Leanの基本タクティク](../LVT2-04/index.md#def-lvt2-04-tactic) で入力を場合分けしました。再帰関数には入力を小さくして同じ処理を繰り返すものがあります。有限個のテストだけでは任意の長さで正しいと分かりません。小さい入力で成り立つことを利用して、すべての入力の証明を構成する方法を学びます。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT2-05)。固定版での実行方法は第6節にあります。

## 1. 自然数を構成する順序で証明する

Lean の `Nat` は 0 を含む非負整数の型です。[帰納型](../LVT1-03/index.md#def-lvt1-03-inductive-type) の構成子 `Nat.zero`（`0`）と、自然数 `n` から次の自然数を作る `Nat.succ n` で構成されます。以下の説明では `succ n` を `Nat.succ n` の略記とします。[Leanの全称量化](../LVT2-02/index.md#def-lvt2-02-forall) で学んだ述語 `P : Nat → Prop` を固定します。[命題型](../LVT2-01/index.md#def-lvt2-01-prop) の記法で、`P n` は入力 `n` に対応する命題、`h : P n` はその証明です。`∀ n : Nat, P n` はすべての自然数についての主張を表します。P 0 を証明し、任意の n で P n の証明から P (Nat.succ n) の証明を作れれば、構成子を何回使った自然数でも性質が成立します。最初を基底、P n の証明を帰納仮定、後者を帰納ステップと呼びます。自然数の構成に沿って基底とステップから結果を作る Lean の規則（再帰子）を `Nat.rec` と呼びます。

<a id="principle-lvt2-05-nat"></a>

<!-- formal-statement-start -->
### 原理（Leanの自然数の帰納法）

P : Nat → Prop に対し、基底 z : P 0 とステップ s : ∀ n : Nat, P n → P (Nat.succ n) があれば、すべての n : Nat について P n が成り立つ。Lean では Nat.rec によってこの証明を構成できる。
<!-- formal-statement-end -->


例えば 2 に対しては z : P 0、s 0 z : P 1、s 1 (s 0 z) : P 2 と証明を構成できます。一般の n は 0 から有限回 succ を適用して得られるため、この構成は全自然数を覆います。ここでは結果の型を入力 `n` に応じた命題 `P n` とし、基底の証明 `z` とステップの関数 `s` から `Nat.rec z s n : P n` を構成します。Lean は期待する型や引数からこの述語を推論します。

```lean
example (P : Nat → Prop) (z : P 0)
    (s : ∀ n, P n → P (Nat.succ n)) (n : Nat) : P n :=
  Nat.rec z s n
```


[基本タクティク](../LVT2-04/index.md#def-lvt2-04-tactic) の `cases n` では `zero` と `succ` の枝に分かれますが、後者に小さい入力の証明は自動的には加わりません。`induction n` は帰納法を適用するタクティクです。`| succ n ih =>` の `n` は元の入力 `Nat.succ n` の一つ前の自然数、`ih` は induction hypothesis（帰納仮定）を表す任意の名前で、型は `P n` です。これはまだ証明していない P (succ n) を仮定することとは異なります。

## 2. 自然数の再帰関数を検証する

[構造再帰](../LVT1-04/index.md#def-lvt1-04-structural-recursion) に沿って、0 なら 0、succ n なら steps n に succ を適用する steps を定義します。

```lean
def steps : Nat → Nat
  | 0 => 0
  | Nat.succ n => Nat.succ (steps n)
```


steps 2 は succ (steps 1)、次に succ (succ (steps 0))、最後に 2 です。一般の n について同じ結論を確かめましょう。

<a id="prop-lvt2-05-steps"></a>

<!-- formal-statement-start -->
### 命題（自然数再帰による入力の保存）

再帰式 `steps 0 = 0`、`steps (Nat.succ n) = Nat.succ (steps n)`（任意の `n : Nat`）で定まる `steps : Nat → Nat` に対して、任意の n : Nat で steps n = n が成り立つ。
<!-- formal-statement-end -->


**証明の見取り図**　P n を steps n = n と置きます。帰納ステップは両辺に succ を適用する等式です。

<!-- proof-start -->
### 証明

[自然数の帰納法](#principle-lvt2-05-nat) を適用する。基底は steps 0 = 0 で定義の展開から成立。帰納仮定 ih : steps n = n の下で目標は steps (succ n) = succ n。左辺を展開すると succ (steps n) = succ n になる。 [Leanの関数適用に関する等式の合同性](../LVT2-03/index.md#prop-lvt2-03-congr) を ih と Nat.succ に適用すると目標の証明が得られる。change は [Leanの定義的等しさ](../LVT2-03/index.md#def-lvt2-03-defeq) により目標を等価な型に表示し直す。

```lean
theorem steps_id (n : Nat) : steps n = n := by
  induction n with
  | zero => rfl
  | succ n ih =>
    change Nat.succ (steps n) = Nat.succ n
    exact congrArg Nat.succ ih
```

<!-- proof-end -->


## 3. リストの構造に沿って証明する

[リストの再帰的構成](../LVT1-04/index.md#def-lvt1-04-list-constructors) では、空リスト [] または先頭 a と残りのリスト xs から a :: xs が作られます。自然数の場合の `Nat.succ` に対応するのは `List.cons`（コードの枝名は `cons`）です。`List.nil` は `[]`、`List.cons a xs` は `a :: xs` と書きます。要素の型 `α : Type` は固定し、変数 `a : α` は先頭、`xs : List α` は残りを表します。`[a,b]` は `a :: (b :: [])` の略記です。`P : List α → Prop` はリストごとに命題を返す述語です。

<a id="principle-lvt2-05-list"></a>

<!-- formal-statement-start -->
### 原理（Leanのリストの帰納法）

α : Type と P : List α → Prop を固定する。P [] の証明と、任意の a : α、xs : List α に対して P xs → P (a :: xs) の証明があれば、任意の xs : List α について P xs が成り立つ。
<!-- formal-statement-end -->


例えば [2,3] には基底の証明 P []、3 を先頭に付けるステップによる P [3]、2 を先頭に付けるステップによる P [2,3] が順に得られます。リストは有限回 `cons` を適用して構成されるため、リストの再帰子 `List.rec` の基底とステップによって全入力の証明が構成されます。`induction xs` の `| cons a xs ih =>` では元の入力が `a :: xs`、帰納仮定 `ih : P xs` は残りのリストだけについての証明です。ステップ `s a xs` の型は `P xs → P (a :: xs)` なので、これに `ih` を渡せば目標が閉じます。

```lean
example {α : Type} (P : List α → Prop) (z : P [])
    (s : ∀ a xs, P xs → P (a :: xs)) (xs : List α) : P xs := by
  induction xs with
  | nil => exact z
  | cons a xs ih => exact s a xs ih
```


## 4. 連結の性質を証明する

二つのリストを順に並べる処理を連結と呼びます。標準ライブラリの補題を黒箱として使わず、今回の実装 joinL を第一引数の再帰で作ります。flipL は、空なら空、先頭と残りに分けられるなら残りの反転の末尾に先頭を追加する関数です。どちらも [構造再帰](../LVT1-04/index.md#def-lvt1-04-structural-recursion) であり、`joinL` は第二引数 `ys` を変えず第一引数の残り `xs` に、`flipL` は自身の唯一の引数の残り `xs` に再帰します。空リストでは再帰しません。

<a id="def-lvt2-05-list-operations"></a>

<!-- formal-statement-start -->
### 定義（再帰的なリスト連結と反転）

α : Type を固定する。joinL : List α → List α → List α を joinL [] ys = ys、joinL (a :: xs) ys = a :: joinL xs ys で定める。flipL : List α → List α を flipL [] = []、flipL (a :: xs) = joinL (flipL xs) [a] で定める。ここで [a] は a :: [] を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-05-list-operations -->
**定義の確認**　`α := Nat` とする。第一引数の先頭と残りを読み取るたびに連結の再帰式を適用する。第二引数は `[3]` のままである。

```text
joinL [1,2] [3]
= 1 :: joinL [2] [3]
= 1 :: (2 :: joinL [] [3])
= 1 :: (2 :: [3])
= [1,2,3]
```

反転では残りを先に反転し、先頭を一要素リストとして末尾へ連結する。

```text
flipL [1,2]
= joinL (flipL [2]) [1]
= joinL (joinL (flipL []) [2]) [1]
= joinL (joinL [] [2]) [1]
= joinL [2] [1]
= 2 :: joinL [] [1]
= [2,1]
```

各段で先頭は Nat、残りと戻り値は List Nat である。`joinL [] [3] = [3]` と `flipL [] = []` が基底であり、二つの関数とも再帰するリストの長さが 2、1、0 と減る。両関数の四つの計算規則を使い、[定義的等しさ](../LVT2-03/index.md#def-lvt2-03-defeq) によりこれらの具体的な等式を確かめられる。
<!-- definition-example-end -->


```lean
def joinL {α : Type} : List α → List α → List α
  | [], ys => ys
  | a :: xs, ys => a :: joinL xs ys

def flipL {α : Type} : List α → List α
  | [] => []
  | a :: xs => joinL (flipL xs) [a]
```


### 4.1 空リストを右に連結する

<a id="prop-lvt2-05-join-nil"></a>

<!-- formal-statement-start -->
### 命題（リスト連結の右単位元）

α : Type、xs : List α に対し、[再帰的なリスト連結](#def-lvt2-05-list-operations) joinL について joinL xs [] = xs が成立する。
<!-- formal-statement-end -->


**証明の見取り図**　第一引数の構成子で分け、残りのリストに対する帰納仮定を使います。

<!-- proof-start -->
### 証明

[リストの帰納法](#principle-lvt2-05-list) により、基底は joinL [] [] = []。ステップは joinL (a :: xs) [] = a :: xs。左辺を展開して a :: joinL xs [] = a :: xs を得る。帰納仮定 joinL xs [] = xs に、リスト t を a :: t へ送る関数を適用する [等式の合同性](../LVT2-03/index.md#prop-lvt2-03-congr) で閉じる。

```lean
theorem join_nil {α : Type} (xs : List α) : joinL xs [] = xs := by
  induction xs with
  | nil => rfl
  | cons a xs ih =>
    change a :: joinL xs [] = a :: xs
    exact congrArg (fun t => a :: t) ih
```

<!-- proof-end -->


### 4.2 連結の括弧を移動する

<a id="prop-lvt2-05-join-assoc"></a>

<!-- formal-statement-start -->
### 命題（リスト連結の結合律）

α : Type と xs, ys, zs : List α に対して、[再帰的なリスト連結](#def-lvt2-05-list-operations) joinL は joinL (joinL xs ys) zs = joinL xs (joinL ys zs) を満たす。
<!-- formal-statement-end -->


**証明の見取り図**　ys と zs を固定し、再帰が進む第一引数 xs で帰納法を行います。

<!-- proof-start -->
### 証明

[リストの帰納法](#principle-lvt2-05-list) を使う。基底の左辺 joinL (joinL [] ys) zs は joinL ys zs、右辺 joinL [] (joinL ys zs) も joinL ys zs。ステップでは [再帰的なリスト連結と反転](#def-lvt2-05-list-operations) の連結の定義 を展開し、左辺と右辺をそれぞれ計算する。

```text
joinL (joinL (a :: xs) ys) zs
= joinL (a :: joinL xs ys) zs
= a :: joinL (joinL xs ys) zs

joinL (a :: xs) (joinL ys zs)
= a :: joinL xs (joinL ys zs)
```

帰納仮定 `joinL (joinL xs ys) zs = joinL xs (joinL ys zs)` に先頭 `a` を付ける関数 `fun t : List α => a :: t` を適用する [等式の合同性](../LVT2-03/index.md#prop-lvt2-03-congr) で一致する。

```lean
theorem join_assoc {α : Type} (xs ys zs : List α) :
    joinL (joinL xs ys) zs = joinL xs (joinL ys zs) := by
  induction xs with
  | nil => rfl
  | cons a xs ih =>
    change a :: joinL (joinL xs ys) zs = a :: joinL xs (joinL ys zs)
    exact congrArg (fun t => a :: t) ih
```

<!-- proof-end -->


## 5. 反転の性質

### 5.1 連結してから反転する

[1,2] と [3,4] を連結して反転すると [4,3,2,1]。右のリストを反転してから左のリストを反転したものを連結する順序と一致します。

<a id="prop-lvt2-05-flip-join"></a>

<!-- formal-statement-start -->
### 命題（反転と連結の交換則）

α : Type、xs, ys : List α に対し、[再帰的な連結と反転](#def-lvt2-05-list-operations) joinL と flipL について flipL (joinL xs ys) = joinL (flipL ys) (flipL xs) が成立する。
<!-- formal-statement-end -->


**証明の見取り図**　`ys` を任意に固定し、`xs` で [リストの帰納法](#principle-lvt2-05-list) を使います。基底で [右単位元](#prop-lvt2-05-join-nil)、ステップで [結合律](#prop-lvt2-05-join-assoc) が必要です。

<!-- proof-start -->
### 証明

[リストの帰納法](#principle-lvt2-05-list) を適用する。基底では左辺 flipL (joinL [] ys) = flipL ys。右辺 joinL (flipL ys) (flipL []) = joinL (flipL ys) [] は [リスト連結の右単位元](#prop-lvt2-05-join-nil) により flipL ys。

ステップでは帰納仮定 `ih : flipL (joinL xs ys) = joinL (flipL ys) (flipL xs)` を使う。左辺を [再帰的なリスト連結と反転](#def-lvt2-05-list-operations) で二回展開する。

```text
flipL (joinL (a :: xs) ys)
= flipL (a :: joinL xs ys)
= joinL (flipL (joinL xs ys)) [a]
```

次に [書換え操作](../LVT2-03/index.md#def-lvt2-03-rw) で `ih` を左から右へ適用し、[リスト連結の結合律](#prop-lvt2-05-join-assoc) に `flipL ys`、`flipL xs`、`[a]` を渡す。

```text
joinL (flipL (joinL xs ys)) [a]
= joinL (joinL (flipL ys) (flipL xs)) [a]
= joinL (flipL ys) (joinL (flipL xs) [a])
= joinL (flipL ys) (flipL (a :: xs))
```

最後の等式は反転の定義を右から左へ用いたもので、ステップの右辺と一致する。

コードの基底では `join_nil (flipL ys)` が右辺から左辺への等式なので、[等式の対称律](../LVT2-03/index.md#prop-lvt2-03-chain) を表す `.symm` で向きを逆にする。ステップの `rw [ih, join_assoc]` は上の二つの書換えを順番に行う。

```lean
theorem flip_join {α : Type} (xs ys : List α) :
    flipL (joinL xs ys) = joinL (flipL ys) (flipL xs) := by
  induction xs with
  | nil =>
    change flipL ys = joinL (flipL ys) []
    exact (join_nil (flipL ys)).symm
  | cons a xs ih =>
    change joinL (flipL (joinL xs ys)) [a] =
      joinL (flipL ys) (joinL (flipL xs) [a])
    rw [ih, join_assoc]
```

<!-- proof-end -->


### 5.2 反転を二回実行する

<a id="prop-lvt2-05-flip-twice"></a>

<!-- formal-statement-start -->
### 命題（リスト反転の対合性）

α : Type、xs : List α に対し、[再帰的なリスト反転](#def-lvt2-05-list-operations) flipL について flipL (flipL xs) = xs が成立する。
<!-- formal-statement-end -->


**証明の見取り図**　内側の反転を展開すると連結が現れるため、直前の交換則で外側の反転を分配します。

<!-- proof-start -->
### 証明

[リストの帰納法](#principle-lvt2-05-list) を適用する。基底は flipL (flipL []) = flipL [] = []。ステップでは `ih : flipL (flipL xs) = xs` とする。内側の反転を展開し、[反転と連結の交換則](#prop-lvt2-05-flip-join) に `flipL xs` と `[a]` を代入してから帰納仮定を適用する。

```text
flipL (flipL (a :: xs))
= flipL (joinL (flipL xs) [a])
= joinL (flipL [a]) (flipL (flipL xs))
= joinL (flipL [a]) xs
```

[再帰的なリスト連結と反転](#def-lvt2-05-list-operations) から一要素リストの反転は次のように計算できる。

```text
flipL [a]
= joinL (flipL []) [a]
= joinL [] [a]
= [a]
```

したがって残った左辺を計算すると、

```text
joinL (flipL [a]) xs
= joinL [a] xs
= a :: joinL [] xs
= a :: xs
```

となり、右辺と一致する。コードの `rw [flip_join, ih]` は交換則、帰納仮定の順に書き換える。`<;> rfl` はその後に残ったすべての目標を [定義的等しさ](../LVT2-03/index.md#def-lvt2-03-defeq) に基づく反射律で閉じる（目標が既に閉じていれば何もしない）。

```lean
theorem flip_twice {α : Type} (xs : List α) :
    flipL (flipL xs) = xs := by
  induction xs with
  | nil => rfl
  | cons a xs ih =>
    change flipL (joinL (flipL xs) [a]) = a :: xs
    rw [flip_join, ih] <;> rfl
```

<!-- proof-end -->


## 6. Lean で実験する

[実行ラボ](../browser-lab.html?chapter=LVT2-05) の Inspect では steps 3、連結、反転、二回反転の具体値を確認し、各定理の型も調べます。Main は具体的な #guard と定理の適用を検査します。ExerciseSolutions では全8題のコードを実行できます。Failure では帰納ステップの目標 steps (succ n) = succ n に ih : steps n = n をそのまま渡すため型が一致しません。第2節のように succ の合同性を使う修復を試してください。

固定版は [lean-toolchain](lab/lean-toolchain) に指定されています。リポジトリのルートから次を実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT2-05/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

最後のコマンドだけが失敗することが期待結果です。[LvtInduction.lean](lab/LvtInduction.lean) を編集するとき、基底とステップがどちらも成立しているかを確認してください。例えば誤った主張 flipL xs = xs は xs = [1,2] のとき反転が [2,1] になるため成り立ちません。基底が成立するだけでは全入力の性質にはなりません。例えば `xs = [2]` では `flipL xs = xs` が成立しますが、先頭 `a = 1` を加えた `1 :: xs = [1,2]` では成立しません。つまりこの帰納仮定からステップを構成できないことが具体的に分かります。

## 7. 演習と詳細解答

### Level A

### LVT2-05-A01 再帰の基底と二回の展開

steps 2 = 2 を計算し、Lean で証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

steps 2 = succ (steps 1) = succ (succ (steps 0)) = succ (succ 0) = 2。定義の展開だけで両辺が一致する。

```lean
example : steps 2 = 2 := by rfl
```
<!-- solution-end -->

### LVT2-05-A02 自然数の帰納ステップ

n : Nat と h : steps n = n から steps (Nat.succ n) = Nat.succ n を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

左辺を定義で展開すると succ (steps n)。[等式の合同性](../LVT2-03/index.md#prop-lvt2-03-congr) を h に適用すると succ (steps n) = succ n となる。

```lean
example (n : Nat) (h : steps n = n) : steps (Nat.succ n) = Nat.succ n := by
  change Nat.succ (steps n) = Nat.succ n
  exact congrArg Nat.succ h
```
<!-- solution-end -->

### LVT2-05-A03 任意の性質を自然数へ広げる

P : Nat → Prop、z : P 0、s : ∀ n, P n → P (Nat.succ n) から任意の n で P n を証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[自然数の帰納法](#principle-lvt2-05-nat) を使う。zero の目標 P 0 は z、succ の目標 P (succ n) は s n ih で閉じる。ih は P n の証明であり s の第二引数に一致する。

```lean
example (P : Nat → Prop) (z : P 0)
    (s : ∀ n, P n → P (Nat.succ n)) (n : Nat) : P n := by
  induction n with
  | zero => exact z
  | succ n ih => exact s n ih
```
<!-- solution-end -->

### LVT2-05-A04 連結の左単位元

任意の α : Type、ys : List α に対して joinL [] ys = ys を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

joinL は第一引数の構成子を調べる。[再帰的なリスト連結と反転](#def-lvt2-05-list-operations) の連結の定義 により第一引数が `[]` なら第二引数 `ys` を返すため、両辺は [定義的に等しい](../LVT2-03/index.md#def-lvt2-03-defeq)。帰納法は必要ない。

```lean
example {α : Type} (ys : List α) : joinL [] ys = ys := by rfl
```
<!-- solution-end -->

### Level B

### LVT2-05-B01 連結の右単位元を再構成

任意の α : Type、xs : List α について joinL xs [] = xs を帰納法で証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[リストの帰納法](#principle-lvt2-05-list) を使う。基底は joinL [] [] = []。ステップでは joinL (a :: xs) [] = a :: joinL xs []。帰納仮定 joinL xs [] = xs に先頭 a を付ける関数 `fun t : List α => a :: t` を適用する [等式の合同性](../LVT2-03/index.md#prop-lvt2-03-congr) により a :: joinL xs [] = a :: xs となる。

```lean
example {α : Type} (xs : List α) : joinL xs [] = xs := by
  induction xs with
  | nil => rfl
  | cons a xs ih =>
    change a :: joinL xs [] = a :: xs
    exact congrArg (fun t => a :: t) ih
```
<!-- solution-end -->

<a id="lvt2-05-b02"></a>

### LVT2-05-B02 一要素の反転

任意の α : Type と a : α について flipL [a] = [a] を証明せよ。さらに flipL [a,a] = [a,a] も示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

flipL [a] = joinL (flipL []) [a] = joinL [] [a] = [a]。二要素の場合は flipL [a,a] = joinL (flipL [a]) [a] = joinL [a] [a] = a :: joinL [] [a] = [a,a]。どちらも定義だけで解決する。

```lean
example {α : Type} (a : α) : flipL [a] = [a] := by rfl
example {α : Type} (a : α) : flipL [a,a] = [a,a] := by rfl
```
<!-- solution-end -->

### LVT2-05-B03 末尾追加と反転

任意の α : Type、xs : List α、a : α に対して flipL (joinL xs [a]) = a :: flipL xs を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[反転と連結の交換則](#prop-lvt2-05-flip-join) に xs と [a] を代入する。左辺は joinL (flipL [a]) (flipL xs) となる。[B02 の展開](#lvt2-05-b02) で flipL [a] = [a]。joinL [a] (flipL xs) = a :: joinL [] (flipL xs) = a :: flipL xs。

```lean
example {α : Type} (xs : List α) (a : α) :
    flipL (joinL xs [a]) = a :: flipL xs := by
  rw [flip_join] <;> rfl
```
<!-- solution-end -->

### Level C

### LVT2-05-C01 二度反転する証明を組み直す

任意の α : Type と xs : List α について flipL (flipL xs) = xs をリストの帰納法で証明せよ。flip_twice は使わず、[反転と連結の交換則](#prop-lvt2-05-flip-join) を使う。

- Level: C

<!-- solution-start -->
#### 詳細解答

[リストの帰納法](#principle-lvt2-05-list) により空リストでは flipL (flipL []) = []。ステップの帰納仮定は flipL (flipL xs) = xs。外側の反転の引数は joinL (flipL xs) [a] だから、[反転と連結の交換則](#prop-lvt2-05-flip-join) に第一引数 flipL xs、第二引数 [a] を入れると joinL (flipL [a]) (flipL (flipL xs))。帰納仮定で後半を xs に置換する。[B02 の展開](#lvt2-05-b02) により `flipL [a] = [a]` なので、残る計算は次の通りである。

```text
joinL (flipL [a]) xs
= joinL [a] xs
= a :: joinL [] xs
= a :: xs
```

最後の二段は [再帰的なリスト連結と反転](#def-lvt2-05-list-operations) の連結の定義 による。

```lean
example {α : Type} (xs : List α) : flipL (flipL xs) = xs := by
  induction xs with
  | nil => rfl
  | cons a xs ih =>
    change flipL (joinL (flipL xs) [a]) = a :: xs
    rw [flip_join, ih] <;> rfl
```
<!-- solution-end -->

## 8. 次講への接続

今回はデータの構成子に沿って証明しました。次は帰納的に定めた命題の証明そのものを分解し、到達可能性などの性質を証明します。

参考：[Theorem Proving in Lean 4 — Inductive Types](https://lean-lang.org/theorem_proving_in_lean4/inductive_types.html)。
