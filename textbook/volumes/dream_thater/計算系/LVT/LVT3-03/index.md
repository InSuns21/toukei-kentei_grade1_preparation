# LVT3-03 リスト処理の関数正当性

前講の[全域的な移送関数](../LVT3-02/index.md#def-lvt3-02-drain)では、計算が止まることと結果が正しいことを区別しました。今度は複数の値を順に処理します。例えば商品価格を一律に1増やす処理で、入力 [2,2,0] に対して [3,3,1] が要求されます。入力の長さが保たれるだけでは、元の値 [2,2,0] を返す誤りも通ってしまいます。各要素と順序を含む仕様を作り、全入力で実装と一致することを証明します。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT3-03)。最初の実験で空リスト、重複要素、反転した結果を比べてください。

## 1. 全要素を変換する

[リストの再帰的構成](../LVT1-04/index.md#def-lvt1-04-list-constructors) を使います。要素の型を α : Type、変換後の型を β : Type とし、f : α → β は一要素を変換する全域的な純粋関数です。空リストは []、先頭 x と残り xs を持つリストは x :: xs と書きます。変換後のリストは、元の順序のまま各要素を f に通したものです。この処理をリスト写像と呼びます。Lean 標準ライブラリの List.map はこの要求を表す関数で、xs.map f と書きます。空なら空、先頭と残りなら f x を先頭にし残りを写像する、という二つの計算規則を持ちます。今回は別の実装 mapL を作り、標準の関数と一致するかを調べます。

<a id="def-lvt3-03-map"></a>

<!-- formal-statement-start -->
### 定義（再帰的なリスト写像）

α β : Type、f : α → β を固定する。mapL f : List α → List β を次の式で定める。

```text
mapL f [] = []
mapL f (x :: xs) = f x :: mapL f xs
```

各再帰呼出しでは xs が元の入力 x :: xs の残りとなる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-03-map -->
**定義の確認**　α = β = Nat、f n = n + 1 とする。空なら mapL f [] = []。非空の計算は

```text
mapL f [2,0]
= 3 :: mapL f [0]
= 3 :: (1 :: mapL f [])
= 3 :: (1 :: [])
= [3,1]
```

である。f x は Nat、残りの結果は List Nat なので構成子 :: の型が一致する。入力長は2、1、0と減り、最後は再帰を行わない。異なる型でも f : Nat → Bool を f n = (n == 0) とすれば mapL f [0,2] = true :: false :: [] であり、結果の型は List Bool。
<!-- definition-example-end -->

```lean
def mapL {α β : Type} (f : α → β) : List α → List β
  | [] => []
  | x :: xs => f x :: mapL f xs
```

[構造再帰](../LVT1-04/index.md#def-lvt1-04-structural-recursion) により有限リストの残りにだけ再帰するので全入力で定まります。以下の Lean コードは [LvtListCorrectness.lean](lab/LvtListCorrectness.lean) の抜粋です。

## 2. 実装を仕様と照合する

一つの入力だけでなく、任意の入力 xs に対して標準の写像と完全に同じリストを返すことを示します。リストの等しさは長さ・順序・各要素の一致を含みます。

<a id="prop-lvt3-03-spec"></a>

<!-- formal-statement-start -->
### 命題（リスト写像の入出力一致）

α β : Type、f : α → β、xs : List α を任意に取る。[再帰的なリスト写像](#def-lvt3-03-map) は mapL f xs = xs.map f を満たす。
<!-- formal-statement-end -->

**証明の見取り図**　[リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) で、二つの関数の空・非空の場合の計算規則を照合する。

<!-- proof-start -->
### 証明

空の場合は mapL f [] = [] = [].map f。非空の場合は帰納仮定 mapL f xs = xs.map f を取る。二つの計算規則を展開すると

```text
mapL f (x :: xs)
= f x :: mapL f xs
= f x :: xs.map f
= (x :: xs).map f
```

となる。二番目の等号は帰納仮定に先頭 f x を付ける関数を適用する [等式の合同性](../LVT2-03/index.md#prop-lvt2-03-congr) である。これで基底と帰納ステップが閉じる。

```lean
theorem mapSpec {α β : Type} (f : α → β) (xs : List α) :
    mapL f xs = xs.map f := by
  induction xs with
  | nil => rfl
  | cons x xs ih =>
    change f x :: mapL f xs = f x :: xs.map f
    exact congrArg (fun t => f x :: t) ih
```

<!-- proof-end -->

例えば [2,2,0] に対する要求では、標準の関数も [3,3,1] を返します。任意の長さでも一致するため、重複や空入力を除外する事前条件は不要です。

## 3. 長さを保つことと十分な仕様

xs.length はリストの要素数で、[].length = 0、(x :: xs).length = xs.length + 1 です。変換で要素の個数が変わらないことは、例えば入力行と出力行を対応させる処理の必要条件です。

<a id="prop-lvt3-03-length"></a>

<!-- formal-statement-start -->
### 命題（リスト写像の長さ保存）

α β : Type、f : α → β、xs : List α に対して (mapL f xs).length = xs.length が成立する。mapL は [再帰的なリスト写像](#def-lvt3-03-map) で定める。
<!-- formal-statement-end -->

**証明の見取り図**　[リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) で長さの計算式を両辺に適用する。

<!-- proof-start -->
### 証明

空では両辺0。非空では

```text
(mapL f (x :: xs)).length
= (f x :: mapL f xs).length
= (mapL f xs).length + 1
= xs.length + 1
= (x :: xs).length
```

第三の等号は帰納仮定 (mapL f xs).length = xs.length に 1 を足す関数を適用する [等式の合同性](../LVT2-03/index.md#prop-lvt2-03-congr) である。

```lean
theorem mapLength {α β : Type} (f : α → β) (xs : List α) :
    (mapL f xs).length = xs.length := by
  induction xs with
  | nil => rfl
  | cons x xs ih =>
    change (mapL f xs).length + 1 = xs.length + 1
    exact congrArg (fun n => n + 1) ih
```

<!-- proof-end -->

ただし長さは十分な条件ではありません。bad xs = xs とする関数は任意の xs : List Nat で長さが等しくなりますが、f n = n + 1、xs = [0] に対して bad xs = [0]、mapL f xs = [1] となり一致しません。これは前に学んだ[弱い仕様](../LVT3-01/index.md#def-lvt3-01-weak) の具体例です。長さを検証する証明自体が正しくても、要求した要素の変換は保証できません。

## 4. 分割して処理しても同じ結果になる

xs ++ ys は Lean 標準のリスト連結です。先行講義の[再帰的なリスト連結と反転](../LVT2-05/index.md#def-lvt2-05-list-operations) の joinL と同じ計算規則、[] ++ ys = ys と (x :: xs) ++ ys = x :: (xs ++ ys) を持ちます。例えば [1,2] と [3] を連結してから1を足すと [2,3,4] になります。二つを別々に処理してから連結しても同じです。

<a id="prop-lvt3-03-join"></a>

<!-- formal-statement-start -->
### 命題（リスト写像と連結の交換則）

α β : Type、f : α → β、xs, ys : List α に対し、[再帰的なリスト写像](#def-lvt3-03-map) について mapL f (xs ++ ys) = mapL f xs ++ mapL f ys が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　第二引数 ys を固定し、連結が再帰する第一引数 xs に [リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) を使う。

<!-- proof-start -->
### 証明

基底の左辺 mapL f ([] ++ ys) = mapL f ys。右辺 mapL f [] ++ mapL f ys = [] ++ mapL f ys = mapL f ys。非空の場合の左辺と右辺は

```text
mapL f ((x :: xs) ++ ys)
= mapL f (x :: (xs ++ ys))
= f x :: mapL f (xs ++ ys)

mapL f (x :: xs) ++ mapL f ys
= (f x :: mapL f xs) ++ mapL f ys
= f x :: (mapL f xs ++ mapL f ys)
```

帰納仮定 mapL f (xs ++ ys) = mapL f xs ++ mapL f ys に先頭 f x を付ける [等式の合同性](../LVT2-03/index.md#prop-lvt2-03-congr) を適用すると左右が一致する。

```lean
theorem mapJoin {α β : Type} (f : α → β) (xs ys : List α) :
    mapL f (xs ++ ys) = mapL f xs ++ mapL f ys := by
  induction xs with
  | nil => rfl
  | cons x xs ih =>
    change f x :: mapL f (xs ++ ys) = f x :: (mapL f xs ++ mapL f ys)
    exact congrArg (fun t => f x :: t) ih
```

<!-- proof-end -->

この結果は、入力を連続する二つの部分に分割し、それぞれ独立に変換した後、元の順序で結合する実装の根拠になります。

## 5. 二段の変換を一段にまとめる

さらに γ : Type、g : β → γ を取り、f の結果に g を適用します。関数の合成は h x = g (f x) で与えられます。例えば f n = n + 1、g n = 2 * n なら [1,3] を f で [2,4]、g で [4,8] にし、一度に h を適用しても [4,8] です。

<a id="prop-lvt3-03-compose"></a>

<!-- formal-statement-start -->
### 命題（リスト写像の合成則）

α β γ : Type、f : α → β、g : β → γ、xs : List α に対し、[再帰的なリスト写像](#def-lvt3-03-map) について mapL g (mapL f xs) = mapL (fun x => g (f x)) xs が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　[リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) を使い、非空の場合は先頭の二段階変換と残りの二段階変換を分離する。

<!-- proof-start -->
### 証明

空では両辺とも空。h x = g (f x) と置く。非空の場合、

```text
mapL g (mapL f (x :: xs))
= mapL g (f x :: mapL f xs)
= g (f x) :: mapL g (mapL f xs)
= g (f x) :: mapL h xs
= mapL h (x :: xs)
```

三番目の等号は帰納仮定を [等式の合同性](../LVT2-03/index.md#prop-lvt2-03-congr) により先頭 g (f x) を保ったまま適用したもの。h の値は γ 型である。

```lean
theorem mapCompose {α β γ : Type} (f : α → β) (g : β → γ)
    (xs : List α) : mapL g (mapL f xs) = mapL (fun x => g (f x)) xs := by
  induction xs with
  | nil => rfl
  | cons x xs ih =>
    change g (f x) :: mapL g (mapL f xs) =
      g (f x) :: mapL (fun x => g (f x)) xs
    exact congrArg (fun t => g (f x) :: t) ih
```

<!-- proof-end -->

各変換が純粋関数である今回のモデルでは、中間リストを作らない実装へ置き換えられます。外部状態を読み書きする処理の順番まで同じになるという主張ではありません。

## 6. 反転と変換の順番

標準リストの xs.reverse は順序を逆にする関数です。先行講義の flipL と同じ計算規則を持ちます。空なら空、(x :: xs).reverse = xs.reverse ++ [x] です（Lean の標準補題 List.reverse_cons）。[反転と連結の交換則](../LVT2-05/index.md#prop-lvt2-05-flip-join) では連結した左右の順序が入れ替わりました。ここでは各要素を独立に変換するので、反転と変換の順序を交換しても結果が変わりません。

<a id="prop-lvt3-03-reverse"></a>

<!-- formal-statement-start -->
### 命題（リスト写像と反転の交換則）

α β : Type、f : α → β、xs : List α に対し、[再帰的なリスト写像](#def-lvt3-03-map) について mapL f xs.reverse = (mapL f xs).reverse が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　[リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) のステップでは反転の計算規則が連結を生む。[リスト写像と連結の交換則](#prop-lvt3-03-join) を使って分解する。

<!-- proof-start -->
### 証明

基底は両辺空。非空では

```text
mapL f ((x :: xs).reverse)
= mapL f (xs.reverse ++ [x])
= mapL f xs.reverse ++ mapL f [x]
= (mapL f xs).reverse ++ [f x]
= (f x :: mapL f xs).reverse
= (mapL f (x :: xs)).reverse
```

二番目の等号は [リスト写像と連結の交換則](#prop-lvt3-03-join) を xs.reverse と [x] に適用した。三番目は帰納仮定と mapL f [x] = f x :: mapL f [] = [f x]。最後の二式は標準反転の計算規則と mapL の定義。Lean の simp only は指定された書換えだけを使う。

```lean
theorem mapReverse {α β : Type} (f : α → β) (xs : List α) :
    mapL f xs.reverse = (mapL f xs).reverse := by
  induction xs with
  | nil => rfl
  | cons x xs ih =>
    simp only [List.reverse_cons, mapJoin, mapL, ih]
```

<!-- proof-end -->

例えば [1,2] を反転してから f n = n + 1 を適用すると [3,2]、変換してから反転しても [3,2] です。

## 7. 累積引数のある実装

mapL は残りの計算が終わった後に先頭を付けます。別の方法は、処理した値を累積リスト acc の先頭に追加してから残りに進むことです。この方法では最後の再帰呼出しの結果がそのまま呼出し元の結果になるため、末尾再帰と呼びます。処理済みの値は逆順に積まれます。元の入力と累積リストの関係を定式化しましょう。

<a id="def-lvt3-03-acc"></a>

<!-- formal-statement-start -->
### 定義（累積引数付き逆順写像）

α β : Type、f : α → β に対し mapRevAcc f : List α → List β → List β を次で定める。

```text
mapRevAcc f [] acc = acc
mapRevAcc f (x :: xs) acc = mapRevAcc f xs (f x :: acc)
```

第一引数は未処理のリスト、第二引数 acc は累積リストであり、再帰ごとに第一引数が短くなる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-03-acc -->
**定義の確認**　f n = n + 1、入力 [1,2]、初期 acc = [9] の場合、

```text
mapRevAcc f [1,2] [9]
= mapRevAcc f [2] [2,9]
= mapRevAcc f [] [3,2,9]
= [3,2,9]
```

となる。空入力では acc の値によらず直ちに acc を返す。各再帰で f x : Nat を List Nat の先頭に追加している。累積リストの長さは増えるが、未処理リストの長さは2、1、0と減る。
<!-- definition-example-end -->

```lean
def mapRevAcc {α β : Type} (f : α → β) :
    List α → List β → List β
  | [], acc => acc
  | x :: xs, acc => mapRevAcc f xs (f x :: acc)
```

空の acc に対する等式だけを帰納法で示そうとすると、非空入力で次の acc が f x :: [] になり、帰納仮定を適用できません。そこで acc を固定せず、任意の累積リストについて主張します。

<a id="prop-lvt3-03-acc"></a>

<!-- formal-statement-start -->
### 命題（累積リスト写像の一般化された正当性）

α β : Type、f : α → β、xs : List α、acc : List β に対して、[累積引数付き逆順写像](#def-lvt3-03-acc) は次を満たす。

```text
mapRevAcc f xs acc = (mapL f xs).reverse ++ acc
```

<!-- formal-statement-end -->

**証明の見取り図**　[リストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) で xs に関して証明する。acc を任意のままにして、帰納仮定を f x :: acc に適用する。

<!-- proof-start -->
### 証明

空の場合、左辺は acc、右辺は [].reverse ++ acc = [] ++ acc = acc。非空では帰納仮定を任意の b : List β に対する mapRevAcc f xs b = (mapL f xs).reverse ++ b とする。b = f x :: acc を代入して左辺を計算すると

```text
mapRevAcc f (x :: xs) acc
= mapRevAcc f xs (f x :: acc)
= (mapL f xs).reverse ++ (f x :: acc)
```

右辺は

```text
(mapL f (x :: xs)).reverse ++ acc
= (f x :: mapL f xs).reverse ++ acc
= ((mapL f xs).reverse ++ [f x]) ++ acc
= (mapL f xs).reverse ++ ([f x] ++ acc)
= (mapL f xs).reverse ++ (f x :: acc)
```

三番目の等号には [リスト連結の結合律](../LVT2-05/index.md#prop-lvt2-05-join-assoc) に対応する標準補題 List.append_assoc を使った。最後の等号は [f x] ++ acc = f x :: ([] ++ acc) = f x :: acc である。左右が一致した。Lean の generalizing acc は帰納仮定が任意の acc を取るようにする。

```lean
theorem accCorrect {α β : Type} (f : α → β) (xs : List α)
    (acc : List β) : mapRevAcc f xs acc = (mapL f xs).reverse ++ acc := by
  induction xs generalizing acc with
  | nil => rfl
  | cons x xs ih =>
    change mapRevAcc f xs (f x :: acc) = (mapL f (x :: xs)).reverse ++ acc
    rw [ih]
    simp [mapL, List.reverse_cons, List.append_assoc]
```

<!-- proof-end -->

acc = [] を代入すると逆順の写像が得られます。もう一度反転すれば元の順序の写像になることを最後の演習で証明します。実装の停止性は第一引数の減少で、出力の正当性はこの等式で支えられています。

## 8. Lean で実験する

[実行ラボ](../browser-lab.html?chapter=LVT3-03) は実際の教材ソースを使います。Lean Web と固定版の違いがある場合は、Codespaces またはローカルの固定版で再実行してください（Codespaces は GitHub ログインと利用枠が必要です）。

| 実験 | 観察する内容 |
| --- | --- |
| 写像・反転・累積引数 | 空、[3,3,1]、[3,2]、[3,2,9] の評価値と証明の型 |
| 境界のテスト | 空・重複・型の変更・累積引数を検査し LVT3-03 OK を表示 |
| 演習解答 | 8題の証明を型検査 |
| 意図した失敗 | 長さの等式をリストの等式として渡すと型不一致 |

固定版は [lean-toolchain](lab/lean-toolchain) の Lean 4.35.0 です。リポジトリのルートから次を実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT3-03/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

最後のコマンドだけが失敗することが要求されます。Inspect.lean は計算値のほか各定理の公理依存を表示します。bad [0] の誤実装を長さ検査だけで受理する危険を、Failure.lean で確かめてください。これらの全称的な定理は Lean 上の純粋関数の結果についての主張です。別言語の実装が同じ関数を計算するか、外部入力が正しくリストへ変換されるかは別途確認します。

## 9. 演習と詳細解答

紙上で計算または証明してから [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) で照合してください。mapL と mapRevAcc は本文の定義を用います。

### Level A

### LVT3-03-A01 空リスト

Nat 上の f n = n + 1 とし、mapL f [] の値を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

定義の空リストの枝を使う。mapL f [] = [] であり、f を適用する要素はない。

```lean
theorem a01 : mapL (fun n : Nat => n + 1) [] = [] := rfl
```
<!-- solution-end -->

### LVT3-03-A02 重複のある入力

Nat 上の f n = n + 1 に対して mapL f [2,2,0] を計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

mapL f [2,2,0] = 3 :: mapL f [2,0] = 3 :: 3 :: mapL f [0] = 3 :: 3 :: 1 :: mapL f [] = [3,3,1]。同じ値の要素を消さない。

```lean
theorem a02 : mapL (fun n : Nat => n + 1) [2,2,0] = [3,3,1] := rfl
```
<!-- solution-end -->

### LVT3-03-A03 異なる型への写像

f : Nat → Bool を f n = (n == 0) とする。mapL f [0,2,0] を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

0 == 0 は true、2 == 0 は false。再帰式から true :: mapL f [2,0] = true :: false :: mapL f [0] = true :: false :: true :: []。結果は List Bool であり、入力と要素型は違うが長さは3。

```lean
theorem a03 : mapL (fun n : Nat => n == 0) [0,2,0] = [true,false,true] := rfl
```
<!-- solution-end -->

### LVT3-03-A04 長さだけを満たす誤実装

Nat のリストをそのまま返す関数 bad を考える。長さ保存は全入力で成立するが、f n = n + 1 に対する写像の仕様を満たさない入力を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

任意の xs について bad xs = xs なので両辺の長さは xs.length。xs = [0] では bad xs = [0]、mapL f xs = [1]。長さはどちらも1だが最初の要素が違う。長さだけの契約ではこの誤りを排除できない。

```lean
theorem a04Length (xs : List Nat) : (bad xs).length = xs.length := rfl
theorem a04Wrong : bad [0] ≠ mapL (fun n : Nat => n + 1) [0] := by decide
```
<!-- solution-end -->

### Level B

### LVT3-03-B01 三つの連結

α β : Type、f : α → β、xs, ys, zs : List α とする。mapL f ((xs ++ ys) ++ zs) = (mapL f xs ++ mapL f ys) ++ mapL f zs を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[リスト写像と連結の交換則](#prop-lvt3-03-join) に第一引数 xs ++ ys、第二引数 zs を代入すると左辺は mapL f (xs ++ ys) ++ mapL f zs。次に xs, ys に同じ命題を適用すると要求する右辺になる。括弧の位置は変えていない。

```lean
theorem b01 {α β : Type} (f : α → β) (xs ys zs : List α) :
    mapL f ((xs ++ ys) ++ zs) = (mapL f xs ++ mapL f ys) ++ mapL f zs := by
  rw [mapJoin, mapJoin]
```
<!-- solution-end -->

### LVT3-03-B02 二段階変換と反転

α β γ : Type、f : α → β、g : β → γ、xs : List α とする。mapL g (mapL f xs.reverse) = (mapL (fun x => g (f x)) xs).reverse を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[リスト写像の合成則](#prop-lvt3-03-compose) に入力 xs.reverse を代入して左辺を mapL (fun x => g (f x)) xs.reverse にする。次に [リスト写像と反転の交換則](#prop-lvt3-03-reverse) を合成関数 h x = g (f x) と入力 xs に適用すると右辺になる。h は α から γ への関数なので適用できる。

```lean
theorem b02 {α β γ : Type} (f : α → β) (g : β → γ) (xs : List α) :
    mapL g (mapL f xs.reverse) = (mapL (fun x => g (f x)) xs).reverse := by
  rw [mapCompose, mapReverse]
```
<!-- solution-end -->

### LVT3-03-B03 累積引数を空に限定する危険

f n = n + 1、xs = [1,2]、acc = [9] とし mapRevAcc f xs acc を計算せよ。空の累積引数だけの等式では帰納ステップが閉じない理由も述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

mapRevAcc f [1,2] [9] = mapRevAcc f [2] [2,9] = mapRevAcc f [] [3,2,9] = [3,2,9]。空から始めても最初の再帰で acc = [2] となる。空の場合だけの帰納仮定では [2] に適用できない。[累積リスト写像の一般化された正当性](#prop-lvt3-03-acc) は任意の acc に適用できるのでこの問題を解決する。

```lean
theorem b03 : mapRevAcc (fun n : Nat => n + 1) [1,2] [9] = [3,2,9] := rfl
```
<!-- solution-end -->

### Level C

### LVT3-03-C01 順序を復元する実装

α β : Type、f : α → β、xs : List α とする。fastMap f xs = (mapRevAcc f xs []).reverse と定める。全入力で fastMap f xs = xs.map f を示せ。

- Level: C

<!-- solution-start -->
#### 詳細解答

[累積リスト写像の一般化された正当性](#prop-lvt3-03-acc) を acc = [] に適用すると mapRevAcc f xs [] = (mapL f xs).reverse ++ []。右単位元でこれは (mapL f xs).reverse。両辺を反転し、[リスト反転の対合性](../LVT2-05/index.md#prop-lvt2-05-flip-twice) と同じ標準リストの反転則 List.reverse_reverse を mapL f xs に適用すると fastMap f xs = mapL f xs。[リスト写像の入出力一致](#prop-lvt3-03-spec) から mapL f xs = xs.map f である。入力が空の場合も定理の量化に含まれる。

```lean
def fastMap {α β : Type} (f : α → β) (xs : List α) :=
  (mapRevAcc f xs []).reverse
theorem c01 {α β : Type} (f : α → β) (xs : List α) :
    fastMap f xs = xs.map f := by
  unfold fastMap
  rw [accCorrect]
  simp [mapSpec]
```
<!-- solution-end -->

## 10. 次の講義へ

写像の入出力一致を証明すると、長さ保存などの必要条件と完全な結果仕様を区別できます。次講では並べ替え処理を扱い、出力が整列していることと元の要素が失われていないことを同時に要求します。
