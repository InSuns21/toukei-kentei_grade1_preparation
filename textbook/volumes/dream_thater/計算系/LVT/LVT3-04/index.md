# LVT3-04 ソート仕様：順序と置換の両立

前講の[リスト写像の入出力一致](../LVT3-03/index.md#prop-lvt3-03-spec)では要素の順番も含めて仕様を定めました。ソートでは順番を変えることが目的です。しかし入力 [3,1,3] に対して [1,3] を返す処理は小さい順に並んでいても、3 が一個失われています。並び方と要素の保存を独立に要求し、両方を全入力について証明しましょう。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT3-04)。最初の実験で重複した 3 の個数と、空リストを返す誤実装の個数を比べてください。

## 1. 順序と要素を区別する

対象は有限の自然数リスト List Nat、順序は自然数の通常の大小関係 ≤ です。[整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted) の SortedL は空と単一要素を認め、a :: b :: xs の場合は a ≤ b と SortedL (b :: xs) を要求します。例えば [1,1,3] は 1 ≤ 1 と 1 ≤ 3 で成立します。同じ値の重複を許します。各隣接対を比較するため、自然数の ≤ の推移性で離れた対についても前の値が後の値以下になります。

値が保存されるとは、単に「同じ種類の値が存在する」という意味ではありません。値 k が何回現れるかを数え、入力と出力で各 k について一致を要求します。a = k のとき 1、そうでなければ 0 を返す量を I(a=k) と書きます。

<a id="def-lvt3-04-count"></a>

<!-- formal-statement-start -->
### 定義（出現回数）

k : Nat を固定する。occ k : List Nat → Nat を次の計算規則で定める。


```text
occ k [] = 0
occ k (a :: xs) = I(a=k) + occ k xs
```

<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-04-count -->
**定義の確認**　occ 3 [3,1,3] = 1 + occ 3 [1,3] = 1 + 0 + occ 3 [3] = 1 + 0 + 1 + 0 = 2。occ 1 [3,1,3] = 0 + 1 + 0 + 0 = 1。occ 4 [3,1,3] = 0 である。各再帰は残りに進むため有限回で止まる。
<!-- definition-example-end -->


有限リストの置換（並べ替え）は、値を新しく作ったり削除したりせずに位置だけを入れ替えることです。本講では各自然数 k の出現回数が等しいことをその仕様とします。この条件なら [1,3] と [1,3,3] を区別できます。位置交換を繰り返すと個数は変わりません。逆に全ての個数が一致するなら、入力の先頭値 a が出力にも少なくとも一個あります。その一個を出力の先頭に移し、両方から a を一個ずつ除くと全ての値の個数の一致が保たれます。残りについて同じ操作を入力の長さで帰納的に行えます。入力が空なら出力に要素 b が存在すると occ b が正になり矛盾するので出力も空です。したがって位置交換で実現可能な並べ替えと一致します。

## 2. 挿入によるソート

まず整列済みリストへ一値 x を追加します。先頭 a が x 以上ならその前に x を入れ、そうでなければ a を残して末尾側へ進みます。

<a id="def-lvt3-04-insert"></a>

<!-- formal-statement-start -->
### 定義（挿入ソートの挿入操作）

x : Nat に対し insertL x : List Nat → List Nat を定める。


```text
insertL x [] = [x]
insertL x (a :: xs) =
  if x ≤ a then x :: a :: xs
  else a :: insertL x xs
```

<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-04-insert -->
**定義の確認**　insertL 2 [1,2,4] = 1 :: insertL 2 [2,4]（2 ≤ 1 は偽）= 1 :: 2 :: 2 :: [4]（2 ≤ 2 は真）= [1,2,2,4]。空なら insertL 2 [] = [2]。再帰はリストの長さを一つ減らす。
<!-- definition-example-end -->

ソート本体は残りのリストを先に整列し、元の先頭をその結果へ挿入します。

<a id="def-lvt3-04-sort"></a>

<!-- formal-statement-start -->
### 定義（挿入ソート）

sortL : List Nat → List Nat を次の式で定める。insertL は [挿入ソートの挿入操作](#def-lvt3-04-insert) とする。


```text
sortL [] = []
sortL (a :: xs) = insertL a (sortL xs)
```

<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-04-sort -->
**定義の確認**　sortL [3,1,3] の再帰は sortL [] = [] から始まり、insertL 3 [] = [3]、insertL 1 [3] = [1,3]、insertL 3 [1,3] = 1 :: insertL 3 [3] = [1,3,3] を返す。外側の再帰は長さ 3、2、1、0 と減り、各挿入も有限回で終わる。
<!-- definition-example-end -->


要求を実装とは別の命題にします。sortL を定義に含めず、どの候補出力にも適用できるようにします。

<a id="def-lvt3-04-spec"></a>

<!-- formal-statement-start -->
### 定義（ソートの二条件仕様）

xs, ys : List Nat に対し SortSpec xs ys は、ys が [整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted) による SortedL を満たし、かつすべての k : Nat について occ k ys = occ k xs を満たす命題とする。occ は [出現回数](#def-lvt3-04-count) である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-04-spec -->
**定義の確認**　xs = [3,1,3]、ys = [1,3,3] とすると 1 ≤ 3 と 3 ≤ 3 から SortedL ys が成立する。k = 1 なら両方 1 回、k = 3 なら両方 2 回、それ以外なら両方 0 回である。よって全 k を覆い、二条件が成立する。ys = [1,3] では k = 3 の回数が 1 ≠ 2 なので第二条件が成立しない。
<!-- definition-example-end -->


## 3. 挿入操作を証明する

<a id="prop-lvt3-04-insert-sorted"></a>

<!-- formal-statement-start -->
### 命題（挿入による整列性の保存）

任意の x : Nat、xs : List Nat に対し、SortedL xs なら SortedL (insertL x xs) が成立する。SortedL は [整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted)、insertL は [挿入ソートの挿入操作](#def-lvt3-04-insert) による。
<!-- formal-statement-end -->

**証明の見取り図**　整列証明の構成に沿って帰納する。二要素以上では x が先頭二値のどこに入るかを比較する。

<!-- proof-start -->
### 証明

空の場合は [x] が single x で整列する。一要素 [a] では x ≤ a なら [x,a]、そうでなければ自然数の比較では x ≤ a が偽なら a < x であり、従って a ≤ x なので [a,x] が整列する。

二要素以上 a :: b :: xs の整列証明から a ≤ b と SortedL (b :: xs) が得られる。帰納仮定は SortedL (insertL x (b :: xs))。次の三場合を尽くす。

- x ≤ a の場合、結果は x :: a :: b :: xs。元の整列証明に比較 x ≤ a を添え、cons を一回適用する。
- x ≤ a が偽、x ≤ b が真の場合、a ≤ x が成立する。挿入の計算規則から結果は a :: x :: b :: xs。SortedL (b :: xs) に x ≤ b を添えて cons、さらに a ≤ x を添えて cons を適用する。
- x ≤ a も x ≤ b も偽の場合、結果は a :: b :: insertL x xs。帰納仮定を挿入の規則で展開すると SortedL (b :: insertL x xs)。元の a ≤ b を添えて cons を適用する。

三場合は比較の真偽で尽くされる。Lean では induction h が整列証明を対象に取り、by_cases が比較を分ける。omega は x ≤ a の否定から a ≤ x を導く自然数算術だけに使う。実装中の insertSorted がこの証明である。
<!-- proof-end -->


挿入する値が何であっても個数の変化は一個だけです。この結果には挿入先が整列しているという仮定は不要です。

<a id="prop-lvt3-04-insert-count"></a>

<!-- formal-statement-start -->
### 命題（挿入による出現回数の変化）

任意の x,k : Nat と xs : List Nat について、[挿入ソートの挿入操作](#def-lvt3-04-insert) と [出現回数](#def-lvt3-04-count) は次を満たす。


```text
occ k (insertL x xs) = I(x=k) + occ k xs
```

<!-- formal-statement-end -->

**証明の見取り図**　リストの長さに沿う構造帰納法で、比較の二分岐それぞれについて個数を展開する。

<!-- proof-start -->
### 証明

[リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) を使う。空の場合は occ k [x] = I(x=k) + 0 で右辺と等しい。

非空の場合 a :: xs とし、帰納仮定を occ k (insertL x xs) = I(x=k) + occ k xs とする。

x ≤ a が真なら

```text
occ k (insertL x (a :: xs))
= occ k (x :: a :: xs)
= I(x=k) + (I(a=k) + occ k xs)
= I(x=k) + occ k (a :: xs)
```

偽なら

```text
occ k (insertL x (a :: xs))
= occ k (a :: insertL x xs)
= I(a=k) + occ k (insertL x xs)
= I(a=k) + (I(x=k) + occ k xs)
= I(x=k) + (I(a=k) + occ k xs)
= I(x=k) + occ k (a :: xs)
```

三番目の等号は帰納仮定、四番目は自然数の加法の結合則と交換則。整列性をどこにも仮定していない。Lean の insertCount はこの展開を simp と omega で実行する。
<!-- proof-end -->


## 4. ソート本体の正当性

<a id="prop-lvt3-04-sort-sorted"></a>

<!-- formal-statement-start -->
### 命題（挿入ソートの整列性）

任意の xs : List Nat について SortedL (sortL xs) が成立する。SortedL は [整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted)、sortL は [挿入ソート](#def-lvt3-04-sort) による。
<!-- formal-statement-end -->

**証明の見取り図**　残りを整列できるという帰納仮定に挿入の保存命題を適用する。

<!-- proof-start -->
### 証明

[リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) により、空の場合 sortL [] = [] なので SortedL.nil が証明となる。非空 a :: xs の場合、帰納仮定は SortedL (sortL xs)。[挿入による整列性の保存](#prop-lvt3-04-insert-sorted) に x = a、挿入先 = sortL xs を代入すると SortedL (insertL a (sortL xs)) を得る。これは [挿入ソート](#def-lvt3-04-sort) の計算規則で SortedL (sortL (a :: xs)) となる。
<!-- proof-end -->


<a id="prop-lvt3-04-sort-count"></a>

<!-- formal-statement-start -->
### 命題（挿入ソートの出現回数保存）

任意の k : Nat、xs : List Nat について occ k (sortL xs) = occ k xs が成立する。occ は [出現回数](#def-lvt3-04-count)、sortL は [挿入ソート](#def-lvt3-04-sort) による。
<!-- formal-statement-end -->

**証明の見取り図**　値 k を任意に固定し、挿入の個数変化を帰納仮定と合わせる。

<!-- proof-start -->
### 証明

[リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) を使う。空では両辺 0。非空の場合、帰納仮定は occ k (sortL xs) = occ k xs。

```text
occ k (sortL (a :: xs))
= occ k (insertL a (sortL xs))
= I(a=k) + occ k (sortL xs)
= I(a=k) + occ k xs
= occ k (a :: xs)
```

二番目の等号は [挿入による出現回数の変化](#prop-lvt3-04-insert-count) を x = a、挿入先 = sortL xs に適用したもの、三番目は帰納仮定。最後は occ の規則である。k は任意だったので全ての値を覆う。
<!-- proof-end -->


<a id="prop-lvt3-04-correct"></a>

<!-- formal-statement-start -->
### 命題（挿入ソートの正当性）

任意の xs : List Nat について SortSpec xs (sortL xs) が成立する。SortSpec は [ソートの二条件仕様](#def-lvt3-04-spec)、sortL は [挿入ソート](#def-lvt3-04-sort) による。
<!-- formal-statement-end -->

**証明の見取り図**　二つの証明を連言の証明として組にする。

<!-- proof-start -->
### 証明

[挿入ソートの整列性](#prop-lvt3-04-sort-sorted) から SortedL (sortL xs)、[挿入ソートの出現回数保存](#prop-lvt3-04-sort-count) から任意の k について occ k (sortL xs) = occ k xs を得る。[連言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-and) で両者を組にすると SortSpec xs (sortL xs) の証明になる。Lean では次の通り。

```lean
theorem sortCorrect (xs : List Nat) : SortSpec xs (sortL xs) :=
  ⟨sortSorted xs, fun k => sortCount k xs⟩
```
入力の長さや重複を除外する事前条件はない。
<!-- proof-end -->


## 5. 弱い仕様と実行実験

常に [] を返す eraseAll は SortedL.nil で整列性を満たします。しかし [3] を渡すと 3 の個数が 1 から 0 になります。逆に入力をそのまま返す keepInput は全 k の個数を変えませんが [2,1] では 2 ≤ 1 が偽です。長さと整列性だけを組み合わせても [1,3,3] の代わりに [1,1,3] を返す欠陥を見逃します。二条件を独立に確かめる理由です。

本講の [LvtSorting.lean](lab/LvtSorting.lean) は単独で実行できるよう、先行講義の SortedL の構成子を同じ形で含めています。自然数の比較は Lean が判定できるので if に使えます。定義・証明の全コードと実行例は実行ラボで編集できます。

[実行ラボ](../browser-lab.html?chapter=LVT3-04) の Inspect で []、[0,1,3,3]、2、0 の出力と定理の公理依存を観察します。Main は空、単一要素、重複、逆順、整列済みの入力と誤実装を検査して LVT3-04 OK を表示します。ExerciseSolutions は演習の証明を検査します。Failure は整列性の証明を二条件仕様の証明として渡し、型不一致で拒否されます。

Lean Web はオンライン実行環境で、固定版と異なることがあります。固定版では [lean-toolchain](lab/lean-toolchain) を使います。ラボの Codespaces 導線から端末を開けば、ログインと利用枠の範囲で次のコマンドを実行できます（リポジトリルートから開始）。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT3-04/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

最後のコマンドだけが失敗するのが期待結果です。有限個のテスト結果と、任意の入力を量化する定理の成立は別の確認です。ここで証明した対象は自然数リストの純粋関数で、別言語の実装や実行時間、安定ソート（同じキーを持つ別のレコードの相対順序を保存する性質）までは主張しません。

## 6. 演習と詳細解答

### Level A

### LVT3-04-A01 重複を許す整列

SortedL [1,1,3] の証明を構成せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted) の single 3 から開始する。1 ≤ 3 を cons の第一引数に、single 3 を第二引数に渡して SortedL [1,3] を得る。さらに 1 ≤ 1 を第一引数にその証明を渡せば SortedL [1,1,3]。等号を許す点が重要である。

対応するLean証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の a01 から始まる名前を確認してください。
<!-- solution-end -->

### LVT3-04-A02 個数を数える

occ 2 [2,1,2] と occ 4 [2,1,2] を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[出現回数](#def-lvt3-04-count) より前者は 1 + 0 + 1 + 0 = 2、後者は 0 + 0 + 0 + 0 = 0。最後の 0 は空リストに対する値である。

対応するLean証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の a02 から始まる名前を確認してください。
<!-- solution-end -->

### LVT3-04-A03 挿入の境界

insertL 2 [1,2,4] を計算し、等しい値を削除しないことを確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[挿入ソートの挿入操作](#def-lvt3-04-insert) より 2 ≤ 1 は偽なので 1 :: insertL 2 [2,4]。2 ≤ 2 は真なので 1 :: 2 :: 2 :: [4] = [1,2,2,4]。元の 2 と新しい 2 の二個が残る。

対応するLean証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の a03 から始まる名前を確認してください。
<!-- solution-end -->

### LVT3-04-A04 空出力の欠陥

eraseAll [3] は整列性を満たすが個数保存を満たさないことを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

定義から eraseAll [3] = []。[整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted) の nil で整列する。しかし [出現回数](#def-lvt3-04-count) によって occ 3 [] = 0、occ 3 [3] = 1 + 0 = 1。k = 3 が全称条件への反例となる。

対応するLean証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の a04 から始まる名前を確認してください。
<!-- solution-end -->

### Level B

### LVT3-04-B01 個数だけでは不足する

keepInput [2,1] が全ての値の個数を保存する一方で整列性を満たさないことを証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

任意の k で keepInput [2,1] = [2,1] だから occ k の両辺は同じ式。整列すると仮定すれば [整列証明の逆向き推論](../LVT2-06/index.md#prop-lvt2-06-pair) を a = 2、b = 1、xs = [] に適用できる。第一成分から 2 ≤ 1 を得るが偽。従って整列性は成立しない。

対応するLean証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の b01 から始まる名前を確認してください。
<!-- solution-end -->

### LVT3-04-B02 長さは一個増える

任意の自然数 x とリスト xs について (insertL x xs).length = xs.length + 1 を証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) を使う。空では挿入後 [x] の長さ 1 = 0 + 1。非空 a :: xs では x ≤ a の場合、結果 x :: a :: xs の長さは xs.length + 2 = (a :: xs).length + 1。偽の場合、結果は a :: insertL x xs で、その長さは (insertL x xs).length + 1 = (xs.length + 1) + 1 = (a :: xs).length + 1。二番目の等号は帰納仮定。整列性を仮定していない。

対応するLean証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の b02 から始まる名前を確認してください。
<!-- solution-end -->

### LVT3-04-B03 挿入順を交換する

自然数 x,y,k とリスト xs について、x と y を順に挿入する順番を交換しても k の出現回数が同じことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[挿入による出現回数の変化](#prop-lvt3-04-insert-count) を二回使う。occ k (insertL x (insertL y xs)) = I(x=k) + occ k (insertL y xs) = I(x=k) + (I(y=k) + occ k xs)。逆順は I(y=k) + (I(x=k) + occ k xs)。加法の結合則と交換則で一致する。この証明は個数の一致のみを示し、二つの結果のリスト自体の等しさは主張していない。

対応するLean証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の b03 から始まる名前を確認してください。
<!-- solution-end -->

### Level C

### LVT3-04-C01 再ソートしても変化しない

整列した任意の xs について sortL xs = xs を証明し、任意の入力 xs について sortL (sortL xs) = sortL xs を導け。

- Level: C

<!-- solution-start -->
#### 詳細解答

[整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted) の証明について帰納する。空なら sortL [] = []、単一要素 [a] なら sortL [a] = insertL a [] = [a]。二要素以上 a :: b :: ys では a ≤ b と SortedL (b :: ys) があり、帰納仮定は sortL (b :: ys) = b :: ys。[挿入ソート](#def-lvt3-04-sort) を展開すると sortL (a :: b :: ys) = insertL a (sortL (b :: ys)) = insertL a (b :: ys) = a :: b :: ys。最後は a ≤ b が真なので [挿入ソートの挿入操作](#def-lvt3-04-insert) の第一分岐。これで全構成子を覆った。次に任意の入力 xs に [挿入ソートの整列性](#prop-lvt3-04-sort-sorted) を適用すると SortedL (sortL xs)。今示した主張の入力を sortL xs とすれば sortL (sortL xs) = sortL xs を得る。

対応するLean証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の c01 から始まる名前を確認してください。
<!-- solution-end -->

## 7. 次の講義へ

挿入ソートでは入力から出力への関係を一つの関数について証明しました。次講では処理の途中の状態を明示し、許される遷移を繰り返しても不変量が保存されることを扱います。
