# LVT1-05 List・Array・Finと安全な添字

前講では[リストの再帰的構成](../LVT1-04/index.md#def-lvt1-04-list-constructors)を使って、列を先頭から処理しました。三目並べのような盤面を扱うときは、例えば第2行第1列のマスを直接読みたいことがあります。列に何個の値があるか、指定された番号に値が存在するかを区別しましょう。

前提：[LVT1-04](../LVT1-04/index.md)。到達点は、List と Array の違いを説明し、範囲外を Option で処理し、Fin によって添字の条件を型に含め、固定長盤面の座標変換を検査することです。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT1-05)。Lean Web では教材の定義・証明・具体例を編集し、実行結果やエラーを確認できます。Lake や複数ファイルの実行は同じラボから GitHub Codespaces（ブラウザ版VS Code）を開いて行います。ローカルへのインストールは不要です。

## 1. 列を番号で読む

[リストの再帰的構成](../LVT1-04/index.md#def-lvt1-04-list-constructors)では、空と先頭・残りから有限列を作りました。`A` を要素の型とします。配列 `Array A` も A 型の値を順に並べた有限列で、Lean では `#[4, 7, 0]` と書けます。`List` では同じ列を `[4, 7, 0]` と書きます。要素の順序と個数が重要で、List の長さは length、Array の個数は size で得られます。

本講の長さ・添字は Lean の `Nat`、すなわち $\mathbb N_0=\{0,1,2,\ldots\}$ の値です。本講では Lean の慣例に従い自然数に 0 を含めます。`n` は列の個数、`i` は番号を表します。リスト `xs` の `xs.length` と配列 `a` の `a.size` はそれぞれの個数です。

添字とは値の位置を指定する番号です。Lean のリストと配列では先頭から 0, 1, 2, ... と番号を振ります。第1要素の添字は 0 です。3 個の値なら番号は 0, 1, 2 で終わります。

<a id="def-lvt1-05-index-range"></a>

<!-- formal-statement-start -->
### 定義（有効な添字）

長さ $n\in\mathbb N_0$ の有限列に対し、$i\in\mathbb N_0$ が $i<n$ を満たすとき、$i$ をその列の有効な添字という。i = 0 は空でない列の先頭を指し、i = n は有効ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-05-index-range -->
**定義の確認**　[4, 7, 0] の長さは 3 です。0 < 3, 1 < 3, 2 < 3 なので三つの添字に順に 4, 7, 0 が対応します。3 < 3 は成り立たず、3 は範囲外です。空列では n = 0 なので、自然数 i で i < 0 を満たすものは一つもありません。
<!-- definition-example-end -->

| 表現 | 個数 | 有効な番号 | 得意な操作 |
| --- | --- | --- | --- |
| List Nat | xs.length | 0 から xs.length 未満 | 先頭と残りへの分解、再帰 |
| Array Nat | a.size | 0 から a.size 未満 | 番号による要素の読み出し |

両者とも型名だけでは個数を決めていません。例えば #[4, 7] も #[4, 7, 0] も Array Nat です。リストの先頭を一つずつ取り除くと指定番号へ到達できますが、配列では添字で直接読むインターフェースを使えます。

## 2. 存在しない番号を結果として表す

外から入力された自然数 i には、まだ有効であるという根拠がありません。前々講の[Option型](../LVT1-03/index.md#def-lvt1-03-option)を使い、値があれば some、なければ none として返せます。

`(式 : 型)` で型を指定します。`xs[i]?` と `a[i]?` は番号を検査して `Option` 型の結果を返す記法です。末尾の `?` は値がない場合にも `none` を返す読み出しを表します。`#eval` は式を評価して具体値を表示します。

```lean
#eval ([4, 7, 0] : List Nat)[1]?
#eval (#[4, 7, 0] : Array Nat)[3]?
```

最初は some 7、次は none です。添字 2 に対する some 0 と、添字 3 に対する none は異なる結果です。盤面で 0 を空きマスの印に使うなら、範囲外を 0 で埋めると、存在しないマスと空きマスを混同します。

次は[リストの再帰的構成](../LVT1-04/index.md#def-lvt1-04-list-constructors)と自然数の構成子を使った読み出しの参照実装です。コードの `α` は `A` と同じく任意の要素型を表す型変数で、Lean が暗黙の型引数として補います。`List α → Nat → Option α` はリストと番号を受け取り、要素型 `α` の値の有無を返す型です。`Nat.succ i` は `i + 1` を意味します。二つの引数の形をコンマで区切って照合し、`_` はその位置の値を使用しないことを表します。

```lean
def readList : List α → Nat → Option α
  | [], _ => none
  | x :: _, 0 => some x
  | _ :: xs, Nat.succ i => readList xs i
```

具体例の計算を枝ごとに追います。

```text
readList [4, 7, 0] 2
= readList [7, 0] 1
= readList [0] 0
= some 0

readList [4, 7, 0] 3
= readList [7, 0] 2
= readList [0] 1
= readList [] 0
= none
```

[構造再帰](../LVT1-04/index.md#def-lvt1-04-structural-recursion)の第三枝では先頭を取り除き、番号も一つ減らします。元の長さが $m+1$、番号が $i+1$ なら、残りの列の長さは $m$、番号は $i$ です。$i+1<m+1$ と $i<m$ は同値で、残りの列の番号 $i$ は元の同じ位置を指します。再帰以外の処理は有限時間で終わり、再帰呼出しは高々一つなので、[自然数の真の減少による停止](../LVT1-04/index.md#prop-lvt1-04-descent)を長さの尺度に適用でき、初期の長さ以下の再帰呼出しで停止します。

## 3. 添字に範囲の根拠を持たせる

呼出しのたびに範囲を判定する代わりに、範囲内と確認した番号だけを引数に受け取る関数を作りたいことがあります。Lean の Fin n は、自然数の値と、その値が n 未満であることを示す証明の組です。値の欄を `val`、証明の欄を `isLt` と呼びます。`⟨i, h⟩` は番号 `i` と範囲の証明 `h` を組にする構成記法です。`j.val` と `j.isLt` のドットは組 `j` の各欄を取り出します。`by decide` は具体的な判定可能な条件を計算し、真なら証明を作る記法です。

<a id="def-lvt1-05-fin-index"></a>

<!-- formal-statement-start -->
### 定義（Fin型）

自然数 n に対して Fin n は、自然数 i と不等式 i < n の証明 h を持つ型である。要素を ⟨i, h⟩ と構成し、val で i、isLt で h を取り出す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-05-fin-index -->
**定義の確認**　n = 3、i = 2 とする。i は自然数で 2 < 3 は真なので、証明 h を与えて ⟨2, h⟩ を Fin 3 の値にできる。下の Lean コードの by decide は具体的な不等式を計算で判定し、成立する場合に証明を作る。i = 3 では必要な $3<3$ が偽なので、番号 3 を値の欄に持つ `Fin 3` の要素は存在しない。n = 0 でも自然数が 0 未満になることはない。
<!-- definition-example-end -->

```lean
def last3 : Fin 3 := ⟨2, by decide⟩
#eval last3.val
```

last3.val は 2 です。注意したいのは、数値リテラルを直接 Fin にすると、例えば `(3 : Fin 3)` は 3 を 3 で割った余り 0 を値の欄に持つことです。これは番号 3 の有効性を証明したのではなく、番号を 0 に変換した結果です。外部入力が範囲内かどうかを検査する方法としては使えません。番号を変えずに受け取るため、ここでは値と範囲の証明を明示して構成します。範囲の証明を取り出せば、配列の安全なアクセスにそのまま渡せます。

`a : Array α` に対し、`i : Fin a.size` の型は先に渡した配列 `a` の個数で決まります。`a[i.val]'(i.isLt)` は角括弧で番号を指定し、直後の `'` でその番号の範囲の証明を明示的に渡す記法です。

```lean
def readArray (a : Array α) (i : Fin a.size) : α :=
  a[i.val]'(i.isLt)
```

[Fin型](#def-lvt1-05-fin-index)の定義で `n` に `a.size` を代入すると、`i.isLt` が証明する条件は `i.val < a.size` です。これは配列の読み出しが要求する条件そのものです。例えば `a = #[4, 7, 0]` では `a.size = 3` なので、`last3 : Fin 3` の番号 2 と証明 `2 < 3` を用いて値 0 を得ます。リストの `xs.get` も `Fin xs.length` を受け取ります。サイズの異なる配列に添字を使い回すには、新しいサイズでも範囲内である根拠が必要です。

## 4. 任意の入力を検査して安全な関数につなぐ

外部の自然数 i を受け取るときは、i < a.size を判定します。成立した枝でだけ [Fin型](#def-lvt1-05-fin-index) の値を構成すれば、値の読み出しに必要な仮定が得られます。`if h : 条件 then ... else ...` は真の枝で条件の証明を `h` として使える記法です。偽の枝では条件の否定の証明を使えますが、ここでは不要です。`¬` は条件の否定を表します。

```lean
def checkedArray (a : Array α) (i : Nat) : Option α :=
  if h : i < a.size then
    some (readArray a ⟨i, h⟩)
  else none
```

成立しない枝では読み出しを行いません。

<a id="prop-lvt1-05-checked-array"></a>

<!-- formal-statement-start -->
### 命題（検査付き配列読み出しの二分岐）

型 A、配列 a : Array A、自然数 i を任意に取る。readArray は Fin a.size を引数としてその番号の値を返す関数、checkedArray は i < a.size のときにだけ readArray a ⟨i, h⟩ を some で包み、そうでなければ none を返す関数とする。

i < a.size の証明 h があれば checkedArray a i = some (readArray a ⟨i, h⟩) が成り立つ。i < a.size が成り立たないなら checkedArray a i = none が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図**　条件が真のときに得た証明を Fin の構成に使います。条件が偽なら配列に触れず none を返すので、存在しない番号で読み出す枝がありません。

<!-- proof-start -->
### 証明

i < a.size が成立する場合、[Fin型](#def-lvt1-05-fin-index)の条件を満たすので ⟨i, h⟩ : Fin a.size を構成できる。条件分岐を展開して真の枝を選ぶと、次の計算になる。

```text
checkedArray a i
= some (readArray a ⟨i, h⟩)
= some (a[i]'h)
```

最後の等号では組の `val` が `i`、`isLt` が `h` であることを使った。分岐の内部で得る証明と外から与えた証明が別の記述でも、Lean は同じ命題の証明を区別しないため（証明の無関係性）、この等式は成立する。

成立しない場合は if の第二枝を選ぶ。そこには readArray の呼出しがなく、返す値は none である。自然数の比較では $i<a.\mathrm{size}$ または $i\ge a.\mathrm{size}$ のどちらか一方だけが成り立つので、全入力を覆う。`simp` は定義と与えた等式・仮定を使って式を簡約する手続きであり、以下では `h` によって選ぶ枝が決まる。

```lean
theorem checked_in (a : Array α) (i : Nat) (h : i < a.size) :
    checkedArray a i = some (readArray a ⟨i, h⟩) := by
  simp [checkedArray, h]

theorem checked_out (a : Array α) (i : Nat) (h : ¬ i < a.size) :
    checkedArray a i = none := by
  simp [checkedArray, h]
```

ここでは `simp [checkedArray, h]` により `checkedArray` を展開し、第一証明では `h` で真の枝、第二証明では `h` で偽の枝を選ぶ。各式の両辺は選ばれた枝の結果に一致する。
<!-- proof-end -->

例えば a = #[4, 7, 0] とすると、i = 2 では 2 < 3 が真で some 0、i = 3 では 3 < 3 が偽で none を返します。a が空なら i = 0 も none です。この仕様は範囲の検査を保証しますが、例えば盤面のマスが空かどうかというゲーム規則は別の検査です。

## 5. 固定長の盤面と座標変換

Array Nat の個数は値を見て調べます。いつも n 個のマスだけがある盤面なら、[Fin型](#def-lvt1-05-fin-index) の各番号へ一つずつ値を割り当てる関数としても表現できます。`Fin n → A` は入力の型が `Fin n`、出力の型が `A` である関数型です。`b i` は数学の関数適用 $b(i)$ に対応します。これは配列の実装方法を指定するのではなく、どの位置の値が定義されているべきかを示す型です。

<a id="def-lvt1-05-fixed-board"></a>

<!-- formal-statement-start -->
### 定義（固定長盤面の関数表現）

自然数 n とマスの値の型 A に対し、固定長盤面の関数表現とは Fin n → A 型の関数 b である。各 Fin n の値 i に対して b i がそのマスの値を与える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-05-fixed-board -->
**定義の確認**　n = 3、A = Nat とし、番号 0 には 4、番号 1 には 7、その他には 0 を返す関数を作る。[Fin型](#def-lvt1-05-fin-index)の条件から入力番号は 0, 1, 2 の三通りで尽きる。各番号で条件を順に調べると、0 は最初の条件が真、1 は最初が偽で次が真、2 は両方が偽である。したがって出力は順に 4, 7, 0 で、どの入力にも `Nat` 型の値が一つ決まる。3 は入力に含まれない。空きマス 0 も値として保持される。
<!-- definition-example-end -->

`fun i => ...` は入力 `i` に対する出力を右側で指定する関数の記法です。`=` は等しいという条件で、Lean の `if` がこの条件を判定して枝を選びます。

```lean
def row3 : Fin 3 → Nat :=
  fun i => if i.val = 0 then 4 else if i.val = 1 then 7 else 0

#eval row3 ⟨1, by decide⟩
```

結果は 7 です。3 行 3 列の盤面では行 r と列 c をともに 0 から数えます。行優先（行ごとに左から右へ並べる順序）で一次元の番号を作るには、行番号 $r$ より前にある $r$ 行のマス数 $3r$ に、行内の列番号 $c$ を足します。Lean では行と列を `Fin 3` 型の値 `r`, `c` として受け取るので、数学の行・列番号は `r.val`, `c.val` に対応します。`3 * r.val + c.val` の `*` は掛け算です。

| 行と列 | 列0 | 列1 | 列2 |
| --- | ---: | ---: | ---: |
| 行0 | 0 | 1 | 2 |
| 行1 | 3 | 4 | 5 |
| 行2 | 6 | 7 | 8 |

<a id="prop-lvt1-05-grid-index"></a>

<!-- formal-statement-start -->
### 命題（3行3列の添字の有効性）

r, c を Fin 3 の任意の要素とする。自然数 $k=3\cdot r.\mathrm{val}+c.\mathrm{val}$ は 9 未満であり、$k$ を値とする `Fin 9` の要素を構成できる。
<!-- formal-statement-end -->

**証明の見取り図**　行も列も最大は 2 なので、最後の行の最後の列でも番号は 8 です。二つの入力の型がこの上界を保証します。

<!-- proof-start -->
### 証明

[Fin型](#def-lvt1-05-fin-index)より r.val < 3 および c.val < 3 である。両者とも自然数なので 0 ≤ r.val ≤ 2、0 ≤ c.val ≤ 2 である。3 は正なので $0\le 3\cdot r.\mathrm{val}\le 3\cdot2=6$ である。ここに $0\le c.\mathrm{val}\le 2$ を加えると次の上界が成立する。

$$
0 \le 3\cdot r.\mathrm{val}+c.\mathrm{val}\le 6+2=8<9.
$$

よって k は自然数かつ 9 未満である。Fin 9 の構成に k とこの不等式の証明を渡せる。

`have hr := r.isLt` は行の上界の証明に `hr` という名前を付けます。列でも同じ操作を行います。前講の `omega` は自然数・整数の線形算術を扱う証明手続きです（`import Lean` で利用できます）。

```lean
def gridIndex (r c : Fin 3) : Fin 9 :=
  ⟨3 * r.val + c.val, by
    have hr := r.isLt
    have hc := c.isLt
    omega⟩
```

`omega` が用いる上界は `hr : r.val < 3` と `hc : c.val < 3` であり、証明すべき条件は `3 * r.val + c.val < 9` である。係数は定数 3 なので線形な不等式であり、上の計算と同じ根拠で証明責務を解ける。
<!-- proof-end -->

例えば r.val = 1、c.val = 2 なら 3 × 1 + 2 = 5 です。座標 (0, 3) を許すと一次元の番号が 3 となり、一見範囲内でも (1, 0) と衝突します。行と列それぞれの条件を先に検査する理由です。9 個の要素があるという条件だけで、入力された二次元座標の妥当性は保証できません。

## 6. Leanで実験する

第2講の[固定されたLeanプロジェクト](../LVT1-02/index.md#def-lvt1-02-fixed-environment)に従い Lean v4.35.0 の lab を用意しました。Codespaces の端末で、リポジトリのルートから実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT1-05/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
```

LvtIndexing.lean に読み出し関数、分岐の証明、盤面と座標変換があります。Main.lean は空列、最後の要素、直後の範囲外、9 マスすべての番号を検査します。lake test の期待出力は LVT1-05 OK です。Inspect.lean は順に some 7、none、some 0、5 を出力します。

```bash
lake env lean Failure.lean
```

このコマンドでは意図的に Fin 3 の値として番号 3 を構成しようとします。3 < 3 の証明を作れないという診断を確認し、番号を 2 に変えると受理されることを試してください。実験後は元に戻します。

## 7. 演習

### Level A

### LVT1-05-A01 有効な番号

[8, 0, 5, 2] と空列について、全有効添字と各値を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[有効な添字](#def-lvt1-05-index-range)は自然数 i が長さ未満となる条件である。最初の列の長さは 4。0, 1, 2, 3 はいずれも 4 未満であり、値は順に 8, 0, 5, 2。4 は 4 未満ではない。空列では長さ 0 なので条件を満たす自然数は存在しない。
<!-- solution-end -->

### LVT1-05-A02 リストの読み出し

readList [9, 0] 1 と readList [9, 0] 2 を定義から計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

前者では `1 = Nat.succ 0` なので第三枝、続いて第二枝を選ぶ。後者は第三枝を二回、続いて第一枝を選ぶ。

```text
readList [9, 0] 1 = readList [0] 0 = some 0
readList [9, 0] 2 = readList [0] 1 = readList [] 0 = none
```

0 という値と値がないことを区別できる。
<!-- solution-end -->

### LVT1-05-A03 Fin の構成

番号 0 と 4 について、Fin 4 の値を構成できるか判定せよ。Fin 0 についても述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Fin型](#def-lvt1-05-fin-index)には自然数と上界の証明が必要である。0 は自然数で 0 < 4 なので `(⟨0, by decide⟩ : Fin 4)` と構成できる。4 は自然数だが 4 < 4 が偽なので値が 4 の要素を構成できない。Fin 0 はどの自然数 i についても i < 0 が偽なので要素を持たない。
<!-- solution-end -->

### LVT1-05-A04 行優先の番号

座標 (2, 1) と (0, 2) の一次元添字を求めよ。両座標の有効性も確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

2, 1, 0 は自然数でいずれも 3 未満である。[3行3列の添字の有効性](#prop-lvt1-05-grid-index)の仮定を満たす。最初は 3 × 2 + 1 = 6 + 1 = 7、次は 3 × 0 + 2 = 2。ともに 9 未満である。
<!-- solution-end -->

### Level B

### LVT1-05-B01 失敗の情報を保存する

配列 a = #[6, 0] の添字 1, 2, 0 を checkedArray で検査し、失敗時に 0 を返す実装の問題点を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

`a.size = 2` である。[検査付き配列読み出しの二分岐](#prop-lvt1-05-checked-array)を適用する。番号 1 では `1 < 2` の証明 `h` が得られ、`readArray a ⟨1, h⟩` は番号 1 の値 0 を返す。番号 2 では `2 < 2` が偽なので `none`、番号 0 では `0 < 2` が真で値 6 を包む。

```text
checkedArray a 1 = some 0
checkedArray a 2 = none
checkedArray a 0 = some 6
```

失敗を 0 に変えると入力 1 と 2 の両方で 0 が返り、実際の空きマスと範囲外を区別できない。
<!-- solution-end -->

### LVT1-05-B02 任意長から固定長へ

任意の自然数リスト xs の有効な添字だけを受け取る readListFin を Lean で定義せよ。xs = [5, 8] の番号 1 の結果を求め、なぜ Fin 3 では同じ関数の引数型として不十分か述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

必要な条件は `i.val < xs.length` である。リスト `xs` が先に定まることで `xs.get` の入力型 `Fin xs.length` の上界も定まる。[Fin型](#def-lvt1-05-fin-index)の n に xs.length を選ぶ。標準の List.get がこの型の添字を取るので次のように渡す。

```lean
def readListFin (xs : List α) (i : Fin xs.length) : α :=
  xs.get i
```

長さ 2 のリストに番号 1 を与えると 1 < 2 であり、先頭 5 の次の値 8 が返る。Fin 3 の値には番号 2 も含まれるが、2 < 2 は偽なので長さ 2 のリストには使えない。必要なのは実際の長さと一致した上界である。
<!-- solution-end -->

### LVT1-05-B03 固定長盤面を作る

Fin 3 → Bool 型の盤面で、中央のマスだけ true、他を false とする関数を作れ。全有効添字で値を確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[固定長盤面の関数表現](#def-lvt1-05-fixed-board)では、各 Fin 3 の番号に Bool を一つ割り当てる。中央は添字 1 なので比較を返す関数にする。`==` は二つの自然数の比較結果を `Bool` として返す演算であり、証明すべき等式 `=` とは区別する。

```lean
def middleOnly (i : Fin 3) : Bool :=
  i.val == 1
```

番号 0 では 0 == 1 は false、番号 1 では 1 == 1 は true、番号 2 では 2 == 1 は false になる。Fin 3 はこの三つの番号しか持たないので、すべての有効入力に値が定まる。
<!-- solution-end -->

### Level C

### LVT1-05-C01 外部座標を検査する

自然数 r, c を受け取り、有効な 3 行 3 列の座標なら Option (Fin 9) の some に一次元添字を包んで返し、無効なら none を返す checkedGrid を定義せよ。全入力に対して範囲内の番号しか返さない理由を述べ、(2, 2)、(0, 3)、(3, 0) の結果を確認せよ。一次元の番号だけを検査する方法が十分でない反例も示せ。

- Level: C

<!-- solution-start -->
#### 詳細解答

座標の条件は r < 3 と c < 3 である。行の条件が真の枝で証明 hr、さらに列の条件が真の枝で証明 hc を得る。この二つを使えば [Fin型](#def-lvt1-05-fin-index) の構成が可能になる。

```lean
def checkedGrid (r c : Nat) : Option (Fin 9) :=
  if hr : r < 3 then
    if hc : c < 3 then
      some (gridIndex ⟨r, hr⟩ ⟨c, hc⟩)
    else none
  else none
```

行も列も真の枝では `⟨r, hr⟩`, `⟨c, hc⟩` がそれぞれ `Fin 3` 型となり、値の欄は元の入力 `r`, `c` のままである。したがって [3行3列の添字の有効性](#prop-lvt1-05-grid-index) を適用できる。$0\le r,c\le2$ から、

$$
0\le 3r+c\le 3\cdot2+2=8<9.
$$

よって `some` に包む値の番号は必ず有効である。行が偽なら外側の else、行が真で列が偽なら内側の else で none。これで全入力を覆う。

(2, 2) では二つの条件が真で番号 3 × 2 + 2 = 8 を持つ Fin 9 を返す。(0, 3) は行だけ真で none、(3, 0) は行が偽で none となる。一次元番号だけを見る方法では (0, 3) の番号 3 が 9 未満なので誤って受理する。これは有効な (1, 0) の番号 3 と一致するため、座標自体の検査が欠かせない。
<!-- solution-end -->

## 8. 次への接続

List と Array は任意長のデータを保持でき、Fin は番号の条件を引数の型に含められます。外部の入力はまず Option を返す検査付き関数で処理し、有効と分かった値を内部の盤面操作に渡せます。次講では盤面の状態を変える関数と外部入出力を分離します。

参考： [Lean Language Reference: Arrays](https://lean-lang.org/doc/reference/latest/Basic-Types/Arrays/)、[Finite Natural Numbers](https://lean-lang.org/doc/reference/latest/Basic-Types/Finite-Natural-Numbers/)。
