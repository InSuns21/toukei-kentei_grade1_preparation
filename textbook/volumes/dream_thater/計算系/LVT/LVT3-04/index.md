# LVT3-04 ソート仕様：順序と置換の両立

前講の[リスト写像の入出力一致](../LVT3-03/index.md#prop-lvt3-03-spec)では要素の順番も含めて仕様を定めました。ソートでは順番を変えることが目的です。しかし入力 [3,1,3] に対して [1,3] を返す処理は小さい順に並んでいても、3 が一個失われています。並び方と要素の保存を独立に要求し、両方を全入力について証明しましょう。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT3-04)。最初の実験で重複した 3 の個数と、空リストを返す誤実装の個数を比べてください。

## 1. 順序と要素を区別する

対象は有限の自然数リスト `List Nat`、順序は自然数の通常の大小関係 `≤` です。Lean の `Nat` は 0 を含む自然数の型です。[リストの再帰的構成](../LVT1-04/index.md#def-lvt1-04-list-constructors) に従い、`[]` は空、`a :: xs` は先頭 a と残り xs からなるリスト、`[a,b]` は `a :: (b :: [])` の略記です。`xs.length` は要素数で、`[].length = 0`、`(a :: xs).length = xs.length + 1` です。`f x` は関数 f への引数 x の適用を表します。

[整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted) の SortedL は空と単一要素を認め、a :: b :: xs の場合は a ≤ b と SortedL (b :: xs) を要求します。空の証明を `SortedL.nil`、一要素の証明を `SortedL.single a`、比較の証明 hab と残りの整列証明 hs を組み合わせる証明を `SortedL.cons hab hs` と書きます（以下、構成子名の `SortedL.` は適宜省略します）。例えば [1,1,3] は single 3 から 1 ≤ 3 を使って cons で [1,3] の証明を作り、さらに 1 ≤ 1 を使って cons で [1,1,3] の証明を作れます。同じ値の重複を許します。各隣接対を比較するため、自然数の ≤ の推移性で離れた対についても前の値が後の値以下になります。

値が保存されるとは、単に「同じ種類の値が存在する」という意味ではありません。値 k が何回現れるかを数え、入力と出力で各 k について一致を要求します。a = k のとき 1、そうでなければ 0 を返す量を `I(a=k)` と書きます。これは紙上の記法で、Lean コードでは `if a = k then 1 else 0` と書きます。[証明付き判定](../LVT2-01/index.md#def-lvt2-01-decidable) が自然数の等式について計算可能なので、条件に応じて二つの値を選べます。これから定義する `occ k xs` では数えたい値 k を固定し、リスト xs を空になるまで短くします。

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
**定義の確認**　k = 3 を固定し、各先頭 a に対して I(a=k) を計算する。

```text
occ 3 [3,1,3]
= 1 + occ 3 [1,3]
= 1 + (0 + occ 3 [3])
= 1 + (0 + (1 + occ 3 []))
= 1 + (0 + (1 + 0))
= 2
```

k = 1 なら 0 + (1 + (0 + 0)) = 1、k = 4 なら全比較が偽なので 0 + (0 + (0 + 0)) = 0 となる。各再帰は残りに進み、有限回で空リストの規則に到達する。
<!-- definition-example-end -->


有限リストの置換（並べ替え）は、値を新しく作ったり削除したりせずに位置だけを入れ替えることです。本講では各自然数 k の出現回数が等しいことをその仕様とします。この条件なら [1,3] と [1,3,3] を区別できます。[出現回数](#def-lvt3-04-count) の再帰式を展開すると各位置の指示量を一回ずつ足す計算になります。隣り合う二値 a,b の交換は、任意の k について次のように個数を保ちます。

```text
I(a=k) + (I(b=k) + occ k xs)
= I(b=k) + (I(a=k) + occ k xs)
```

交換箇所より前の値の寄与も変わりません。離れた位置の交換も隣接交換の列で実現できるため、有限回の位置交換は個数を保存します。

逆に入力 u と出力 v の個数がすべて一致すると仮定し、[リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) により入力について帰納します（各入力について出力 v は任意）。入力が空なら、出力が非空で先頭が b の場合、occ b v = 1 + 残りの出現回数 ≥ 1 となって occ b u = 0 に反します。従って出力も空です。

入力が a :: xs なら、occ a v = occ a (a :: xs) = 1 + occ a xs ≥ 1 です。出力のどこにも a がなければ全ての指示量が 0 になるので、出力には a が少なくとも一個あります。その一個を隣接交換で出力の先頭に移し、a :: ys とします。交換は個数を保つので、任意の k について次が成立します。

```text
I(a=k) + occ k xs
= occ k (a :: xs)
= occ k (a :: ys)
= I(a=k) + occ k ys
```

自然数の加法で両辺の共通項 I(a=k) を消去すると occ k xs = occ k ys です。入力の長さが一つ減ったので帰納仮定で残り ys を xs に並べ替えられます。先頭の a を固定したままその交換を行えば、出力から入力を復元できます。交換は逆順にも実行できるため、入力から出力への置換も存在します。したがって二つの有限リストの全出現回数の一致は、位置交換で実現できる並べ替えと同値です。

## 2. 挿入によるソート

まず一値 x をリストへ追加します。先頭 a が x 以上ならその前に x を入れ、そうでなければ a を残して末尾側へ進みます。比較 `x ≤ a` も自然数の計算可能な [証明付き判定](../LVT2-01/index.md#def-lvt2-01-decidable) を使います。`insertL x xs` は x を固定して xs に対して再帰します。定義自体は整列していないリストにも適用でき、整列性の保存は整列済みの入力に限って第3節で証明します。

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
**定義の確認**　x = 2 を固定する。最初の比較 2 ≤ 1 は偽、次の比較 2 ≤ 2 は真なので、次のように計算する。

```text
insertL 2 [1,2,4]
= 1 :: insertL 2 [2,4]
= 1 :: (2 :: (2 :: [4]))
= [1,2,2,4]
```

空なら insertL 2 [] = [2]。再帰する分岐はリストの長さを一つ減らす。入力中の 2 を残したまま新しい 2 を挿入できている。
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
**定義の確認**　空のリストまで再帰してから、[挿入操作](#def-lvt3-04-insert) を順に適用する。

```text
sortL [] = []
sortL [3] = insertL 3 [] = [3]
sortL [1,3] = insertL 1 [3] = [1,3]
sortL [3,1,3] = insertL 3 [1,3]
              = 1 :: insertL 3 [3]
              = 1 :: (3 :: (3 :: []))
              = [1,3,3]
```

外側の再帰は長さ 3、2、1、0 と減り、各挿入も有限回で終わる。
<!-- definition-example-end -->


要求を実装とは別の命題にします。`xs` を入力、`ys` を候補出力とし、sortL を定義に含めません。整列性と個数保存を [連言](../LVT2-02/index.md#def-lvt2-02-and) `∧` で結び、個数保存は [全称量化](../LVT2-02/index.md#def-lvt2-02-forall) `∀ k : Nat` で全ての値を対象にします。Lean では `SortedL ys ∧ ∀ k : Nat, occ k ys = occ k xs` と書きます。

<a id="def-lvt3-04-spec"></a>

<!-- formal-statement-start -->
### 定義（ソートの二条件仕様）

xs, ys : List Nat に対し SortSpec xs ys は、ys が [整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted) による SortedL を満たし、かつすべての k : Nat について occ k ys = occ k xs を満たす命題とする。occ は [出現回数](#def-lvt3-04-count) である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-04-spec -->
**定義の確認**　xs = [3,1,3]、ys = [1,3,3] とする。

第一条件は [整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted) で、single 3 に比較 3 ≤ 3 を添えて cons で [3,3] の証明を作り、比較 1 ≤ 3 を添えてもう一度 cons を適用する。

第二条件は [出現回数](#def-lvt3-04-count) の規則で任意の k について次のように確認する。

| k の場合分け | occ k xs | occ k ys |
| --- | --- | --- |
| k = 1 | 0 + 1 + 0 + 0 = 1 | 1 + 0 + 0 + 0 = 1 |
| k = 3 | 1 + 0 + 1 + 0 = 2 | 0 + 1 + 1 + 0 = 2 |
| k が 1,3 以外 | 0 | 0 |

全ての場合で一致するため全称条件が成立し、二条件を組にできる。ys = [1,3] では single 3 に 1 ≤ 3 を添えれば整列するが、k = 3 の回数が 1 ≠ 2 なので第二条件が成立しない。
<!-- definition-example-end -->


## 3. 挿入操作を証明する

<a id="prop-lvt3-04-insert-sorted"></a>

<!-- formal-statement-start -->
### 命題（挿入による整列性の保存）

任意の x : Nat、xs : List Nat に対し、SortedL xs なら SortedL (insertL x xs) が成立する。SortedL は [整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted)、insertL は [挿入ソートの挿入操作](#def-lvt3-04-insert) による。
<!-- formal-statement-end -->

**証明の見取り図**　[整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted) の三構成子に沿って証明の帰納法を使う。x は固定し、整列証明 h の結論に現れるリストを変化させる。二要素以上では x が先頭二値のどこに入るかを比較する。

<!-- proof-start -->
### 証明

[挿入操作](#def-lvt3-04-insert) の規則を展開する。空の場合は insertL x [] = [x] で、single x がその整列証明になる。一要素 [a] では x ≤ a が真なら insertL x [a] = [x,a] なので、single a に x ≤ a を添えて cons を使う。偽なら insertL x [a] = a :: insertL x [] = [a,x] となる。自然数の全順序より x ≤ a の否定から a < x、従って a ≤ x が成り立つので、single x に a ≤ x を添えて cons を使う。

二要素以上 a :: b :: xs の整列証明は cons hab hs の形であり、[整列証明の逆向き推論](../LVT2-06/index.md#prop-lvt2-06-pair) と同じく hab は a ≤ b の証明、hs は SortedL (b :: xs) の証明である。帰納仮定は SortedL (insertL x (b :: xs))。次の三場合を尽くす。

- x ≤ a の場合、結果は x :: a :: b :: xs。元の整列証明に比較 x ≤ a を添え、cons を一回適用する。
- x ≤ a が偽、x ≤ b が真の場合、a ≤ x が成立する。挿入の計算規則から結果は a :: x :: b :: xs。SortedL (b :: xs) に x ≤ b を添えて cons、さらに a ≤ x を添えて cons を適用する。
- x ≤ a も x ≤ b も偽の場合、結果は a :: b :: insertL x xs。帰納仮定を挿入の規則で展開すると SortedL (b :: insertL x xs)。元の a ≤ b を添えて cons を適用する。

三場合は比較の真偽で尽くされる。Lean では induction h が整列証明を対象に取り、by_cases が比較を分ける。[証明の自動化](../LVT2-08/index.md#def-lvt2-08-automation) の `omega` はここでは x ≤ a の否定から a ≤ x を導く自然数算術にだけ使う。実装中の insertSorted がこの証明である。
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

偽の場合の三番目の等号は帰納仮定、四番目は自然数の加法の結合則と交換則。整列性をどこにも仮定していない。Lean の `insertCount` はこの展開を [簡約操作](../LVT2-03/index.md#def-lvt2-03-simp) `simp` と [自然数の線形算術を扱う自動化](../LVT2-08/index.md#def-lvt2-08-automation) `omega` で実行する。
<!-- proof-end -->


## 4. ソート本体の正当性

<a id="prop-lvt3-04-sort-sorted"></a>

<!-- formal-statement-start -->
### 命題（挿入ソートの整列性）

任意の xs : List Nat について SortedL (sortL xs) が成立する。SortedL は [整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted)、sortL は [挿入ソート](#def-lvt3-04-sort) による。
<!-- formal-statement-end -->

**証明の見取り図**　残りを整列できるという帰納仮定に [挿入による整列性の保存](#prop-lvt3-04-insert-sorted) を適用する。

<!-- proof-start -->
### 証明

[リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) により、空の場合 sortL [] = [] なので SortedL.nil が証明となる。非空 a :: xs の場合、帰納仮定は SortedL (sortL xs)。[挿入による整列性の保存](#prop-lvt3-04-insert-sorted) に x = a、挿入先 = sortL xs を代入すると SortedL (insertL a (sortL xs)) を得る。これは [挿入ソート](#def-lvt3-04-sort) の計算規則で SortedL (sortL (a :: xs)) となる。
<!-- proof-end -->


<a id="prop-lvt3-04-sort-count"></a>

<!-- formal-statement-start -->
### 命題（挿入ソートの出現回数保存）

任意の k : Nat、xs : List Nat について occ k (sortL xs) = occ k xs が成立する。occ は [出現回数](#def-lvt3-04-count)、sortL は [挿入ソート](#def-lvt3-04-sort) による。
<!-- formal-statement-end -->

**証明の見取り図**　値 k を任意に固定し、[挿入による出現回数の変化](#prop-lvt3-04-insert-count) を帰納仮定と合わせる。

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

二番目の等号は [挿入による出現回数の変化](#prop-lvt3-04-insert-count) を x = a、挿入先 = sortL xs に適用したもの、三番目は帰納仮定。最後は [出現回数](#def-lvt3-04-count) の規則である。k は任意だったので全ての値を覆う。
<!-- proof-end -->


<a id="prop-lvt3-04-correct"></a>

<!-- formal-statement-start -->
### 命題（挿入ソートの正当性）

任意の xs : List Nat について SortSpec xs (sortL xs) が成立する。SortSpec は [ソートの二条件仕様](#def-lvt3-04-spec)、sortL は [挿入ソート](#def-lvt3-04-sort) による。
<!-- formal-statement-end -->

**証明の見取り図**　[挿入ソートの整列性](#prop-lvt3-04-sort-sorted) と [挿入ソートの出現回数保存](#prop-lvt3-04-sort-count) を連言の証明として組にする。

<!-- proof-start -->
### 証明

[挿入ソートの整列性](#prop-lvt3-04-sort-sorted) から SortedL (sortL xs)、[挿入ソートの出現回数保存](#prop-lvt3-04-sort-count) から任意の k について occ k (sortL xs) = occ k xs を得る。[全称量化の導入規則](../LVT2-02/index.md#def-lvt2-02-forall) により `fun k => sortCount k xs` は k を受け取って対応する等式の証明を返す。入力 xs はここで固定されている。[連言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-and) による `⟨hp, hq⟩` は `And.intro hp hq` の略記なので、第一の証明とこの全称の証明を順に渡せば [ソートの二条件仕様](#def-lvt3-04-spec) の証明になる。Lean では次の通り。

```lean
theorem sortCorrect (xs : List Nat) : SortSpec xs (sortL xs) :=
  ⟨sortSorted xs, fun k => sortCount k xs⟩
```
入力の長さや重複を除外する事前条件はない。
<!-- proof-end -->


## 5. 弱い仕様と実行実験

任意の入力 xs について `eraseAll xs = []`、`keepInput xs = xs` と定めます。前者は [整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted) の nil で整列性を満たします。しかし [3] を渡すと 3 の個数が 1 から 0 になります。逆に keepInput は全 k の個数を変えませんが [2,1] では [整列証明の逆向き推論](../LVT2-06/index.md#prop-lvt2-06-pair) が要求する 2 ≤ 1 が偽です。長さと整列性だけを組み合わせても入力 [1,3,3] に対し [1,1,3] を返す欠陥を見逃します。両方とも長さ 3 で整列していますが、出現回数は k = 1 で 1 回から 2 回、k = 3 で 2 回から 1 回へ変化します。二条件を独立に確かめる理由です。

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

任意の k で keepInput [2,1] = [2,1] だから occ k の両辺は同じ式。整列すると仮定すれば [整列証明の逆向き推論](../LVT2-06/index.md#prop-lvt2-06-pair) を a = 2、b = 1、xs = [] に適用できる。[連言の除去規則](../LVT2-02/index.md#def-lvt2-02-and) で第一成分を取り出すと 2 ≤ 1 を得るが偽。従って整列性は成立しない。

対応するLean証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の b01 から始まる名前を確認してください。
<!-- solution-end -->

### LVT3-04-B02 長さは一個増える

任意の自然数 x とリスト xs について (insertL x xs).length = xs.length + 1 を証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) を使い、x を固定する。空では [挿入操作](#def-lvt3-04-insert) により insertL x [] = [x] なので長さは 1 = 0 + 1。非空 a :: xs の場合の帰納仮定は (insertL x xs).length = xs.length + 1 である。第1節の長さの再帰規則を使う。

x ≤ a が真なら

```text
(insertL x (a :: xs)).length
= (x :: a :: xs).length
= (a :: xs).length + 1
```

偽なら

```text
(insertL x (a :: xs)).length
= (a :: insertL x xs).length
= (insertL x xs).length + 1
= (xs.length + 1) + 1
= (a :: xs).length + 1
```

三番目の等号が帰納仮定の適用である。整列性はどちらの分岐でも仮定していない。

対応するLean証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の b02 から始まる名前を確認してください。
<!-- solution-end -->

### LVT3-04-B03 挿入順を交換する

自然数 x,y,k とリスト xs について、x と y を順に挿入する順番を交換しても k の出現回数が同じことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[挿入による出現回数の変化](#prop-lvt3-04-insert-count) を、外側の挿入と内側の挿入に順に適用する。k は両方で同じ値に固定する。左側では y を先に、x を後に挿入する。

```text
occ k (insertL x (insertL y xs))
= I(x=k) + occ k (insertL y xs)
= I(x=k) + (I(y=k) + occ k xs)
= I(y=k) + (I(x=k) + occ k xs)
= I(y=k) + occ k (insertL x xs)
= occ k (insertL y (insertL x xs))
```

中央の等号は加法の結合則と交換則、最後の二つの等号は同じ命題を逆向きに適用したものである。この証明は個数の一致のみを示し、二つの結果のリスト自体の等しさは主張していない。

対応するLean証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の b03 から始まる名前を確認してください。
<!-- solution-end -->

### Level C

### LVT3-04-C01 再ソートしても変化しない

整列した任意の xs について sortL xs = xs を証明し、任意の入力 xs について sortL (sortL xs) = sortL xs を導け。

- Level: C

<!-- solution-start -->
#### 詳細解答

[整列リストの生成規則](../LVT2-06/index.md#def-lvt2-06-sorted) の証明について帰納する。空なら sortL [] = []、単一要素 [a] なら sortL [a] = insertL a [] = [a]。二要素以上 a :: b :: ys では a ≤ b と SortedL (b :: ys) があり、帰納仮定は sortL (b :: ys) = b :: ys。[挿入ソート](#def-lvt3-04-sort) を展開すると

```text
sortL (a :: b :: ys)
= insertL a (sortL (b :: ys))
= insertL a (b :: ys)
= a :: b :: ys
```

二番目の等号は帰納仮定を insertL a の引数に適用した [等式の合同性](../LVT2-03/index.md#prop-lvt2-03-congr)、最後は a ≤ b が真なので [挿入ソートの挿入操作](#def-lvt3-04-insert) の第一分岐である。これで全構成子を覆った。次に任意の入力 xs に [挿入ソートの整列性](#prop-lvt3-04-sort-sorted) を適用すると SortedL (sortL xs)。今示した主張の入力を sortL xs とすれば sortL (sortL xs) = sortL xs を得る。

対応するLean証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の c01 から始まる名前を確認してください。
<!-- solution-end -->

## 7. 次の講義へ

挿入ソートでは入力から出力への関係を一つの関数について証明しました。次講では処理の途中の状態を明示し、許される遷移を繰り返しても不変量が保存されることを扱います。
