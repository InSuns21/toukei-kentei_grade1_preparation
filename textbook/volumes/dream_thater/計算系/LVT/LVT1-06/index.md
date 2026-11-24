# LVT1-06 純粋な参照モデルと入出力境界

前講の[固定長盤面の関数表現](../LVT1-05/index.md#def-lvt1-05-fixed-board)では、存在するマスだけを番号で指定できました。しかし実際のプログラムに届く入力は、例えば文字列「2」です。文字列を誤って番号 1 に変換すれば、安全な盤面操作でも別のマスを更新します。盤面の規則と入力を解釈する規則を別々に確かめましょう。

前提：[LVT1-05](../LVT1-05/index.md)。到達点は、純粋な盤面更新を定義し、失敗と成功の結果を説明し、入出力層とモデルを分離して誤変換の反例を実行することです。

## 1. 盤面を値として扱う

今回は三目並べの準備として、3 行 3 列の盤面に印があるかどうかだけを扱います。手番、勝敗、終了判定はまだ導入しません。各マスの値は Bool で、false は空、true は印があることを表します。Lean の `Nat` は 0 を含む非負整数の型です。本講で番号を自然数と呼ぶときも 0 を含めます。前講の[Fin型](../LVT1-05/index.md#def-lvt1-05-fin-index)により有効な番号は 0 から 8 です。

外部のファイルや時刻を参照する関数では、見かけ上同じ引数を与えても結果が変わるかもしれません。必要な情報をすべて引数として渡し、結果を値として返す関数なら、盤面を変えずに何度でも同じ計算を試せます。結果が引数だけから決まることと、計算が外部に影響しないことを一つの性質として捉えます。

<a id="def-lvt1-06-pure-function"></a>

<!-- formal-statement-start -->
### 定義（純粋関数）

入力型 A と出力型 B を取る。A から B への関数が、結果を引数だけから決め、計算の際に外部の状態を読み書きしないとき、純粋関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-06-pure-function -->
**定義の確認**　自然数 n を受け取って n + 1 を返す関数を考える。n = 2 なら 3、同じ n = 2 を再度渡しても 3 となる。計算は自然数の加算だけであり、時刻、ファイル、画面を読み書きしない。結果の決定と外部状態を操作しないという両条件を満たす。一方、ファイルに 3 を書き込んでから 3 を返す処理は、結果が同じでも後者の条件を満たさない。
<!-- definition-example-end -->

[固定長盤面の関数表現](../LVT1-05/index.md#def-lvt1-05-fixed-board) でマスの個数を 9、値の型を Bool とします。`b i` は数学の関数適用 $b(i)$ に対応します。`i` は着手位置、`j` は新しい盤面の値を調べる位置です。[Fin型](../LVT1-05/index.md#def-lvt1-05-fin-index) の `i.val` と `j.val` はそれぞれの自然数の番号であり、同じ番号なら同じマスです。`fun j => ...` は j を引数に取る関数を作る記法、`fun _ => false` は引数を使わず常に false を返す関数です。

```lean
abbrev Board := Fin 9 → Bool

def emptyBoard : Board := fun _ => false

def writeMark (b : Board) (i : Fin 9) : Board :=
  fun j => if j.val = i.val then true else b j
```

abbrev は型の別名を導入する記法です。writeMark は b を変更する操作ではなく、新しい盤面を表す関数を返します。新しい盤面の番号 j の値を決めるため、j の自然数としての値と着手位置 i の値を比べます。例えば空盤面に番号 2 の印を置くと、j = 2 では true、j = 0 では元の b 0 = false です。元の emptyBoard 2 は依然 false です。

しかし既に印のあるマスへの着手は拒否したいので、第3講で学んだ[Option型](../LVT1-03/index.md#def-lvt1-03-option)を使います。

```lean
def place (b : Board) (i : Fin 9) : Option Board :=
  if b i then none else some (writeMark b i)
```

ここで if b i は Bool が true のとき第一枝、false のとき第二枝を選びます。仕様は「占有マスを拒否し、空きマスならその位置だけに印を付ける」です。place は盤面と位置を引数として受け取り、成功時の新しい盤面または失敗を返すので、仕様を実行して結果を調べられます。第1講の[実行可能仕様](../LVT1-01/index.md#def-lvt1-01-executable-spec) と同じく、すべての対象入力で結果を計算して停止することが必要です。ここでは空きかどうかの一回の判定と、各マスを求める有限の計算で実現できます。このような仕様を別の実装との比較の基準にするとき、参照モデルと呼びます。

<a id="def-lvt1-06-reference-model"></a>

<!-- formal-statement-start -->
### 定義（実行可能な参照モデル）

対象の処理について、仕様が定める各入力に対して停止して期待結果を返す [実行可能仕様](../LVT1-01/index.md#def-lvt1-01-executable-spec) を実装し、その結果を同じ入力と出力の規約を持つ別の実装の比較基準として用いるとき、その実装を実行可能な参照モデルという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-06-reference-model -->
**定義の確認**　place に emptyBoard と番号 2 を渡すと、空きマスなので some (writeMark emptyBoard 2) が計算される。任意の入力盤面でも place は一回の条件分岐で結果を返し、成功盤面の各値は一回の番号比較と必要なら元の盤面の参照で求まる。両実装が成功したときは、盤面を表す関数の値を全 9 マスで比較する。番号 0 から 8 の順に false, false, true, false, false, false, false, false, false となるので、比較対象が同じ九つの値を返せば、この入力の結果は一致する。番号 1 だけを true にする実装なら番号 2 で true と false が異なるため不一致である。成功と失敗も区別し、失敗同士ならどちらも none である。こうして計算結果を比較基準にできる。ただしここでの仕様は着手の一部であり、勝敗の判定は比較の対象ではない。
<!-- definition-example-end -->

## 2. 盤面更新の規則を確認する

着手を成功とする条件と、そのとき得られる盤面を分けて調べます。

<a id="prop-lvt1-06-place-branches"></a>

<!-- formal-statement-start -->
### 命題（着手の分岐と更新位置）

b : Fin 9 → Bool、i : Fin 9 を任意に取る。writeMark b i は任意の番号 j : Fin 9 の値を、j.val = i.val なら true、それ以外なら b j とする盤面とする。place b i は b i が true なら none、false なら some (writeMark b i) を返す関数とする。

- b i = true なら place b i = none である。
- b i = false なら place b i = some (writeMark b i) であり、新しい盤面の i の値は true である。
- 任意の j : Fin 9 で j.val ≠ i.val なら writeMark b i j = b j である。
<!-- formal-statement-end -->

**証明の見取り図**　最初に place の条件を評価して成功か拒否かを決めます。成功なら writeMark の定義を更新対象とそれ以外の位置で評価します。

<!-- proof-start -->
### 証明

b i = true と仮定する。place の if の条件が true なので第一枝を選び、none を得る。

着手の可否にかかわらず、b' = writeMark b i と定める。

b i = false と仮定する。第二枝を選ぶので some b' を得る。j = i を代入すれば i.val = i.val が真であるから b' i = true である。

任意の j で j.val ≠ i.val と仮定する。writeMark の条件 j.val = i.val は偽であり、else の値 b j が選ばれる。従って b' j = b j である。Fin 9 の各番号は 0 から 8 のいずれかであり、同じ番号なら同じマスである。従って二つの位置の場合分けは全有効番号を覆う。b は関数の引数であり、どの枝も b 自体を書き換えていない。

```lean
theorem place_occupied (b : Board) (i : Fin 9) (h : b i = true) :
    place b i = none := by
  simp [place, h]

theorem place_empty (b : Board) (i : Fin 9) (h : b i = false) :
    place b i = some (writeMark b i) := by
  simp [place, h]

theorem write_here (b : Board) (i : Fin 9) :
    writeMark b i i = true := by
  simp [writeMark]

theorem write_elsewhere (b : Board) (i j : Fin 9) (h : j.val ≠ i.val) :
    writeMark b i j = b j := by
  simp [writeMark, h]
```

simp はここでは定義を展開し、仮定 h を使って if の条件を真または偽に置き換える。最初の二式では h によって if の枝が一つに決まり、第三式では自己の番号との比較が真になり、第四式では h により比較が偽になる。
<!-- proof-end -->

## 3. 外から届く文字列を扱う

外部のデータには有効な番号だけでなく、数字に読めない文字列や範囲外の数字もあります。文字列を内部の型へ変換する処理を復号、内部の値を外部へ送る文字列へ変換する処理を符号化と呼びます。ここでは簡単な通信形式として、入力文字列には 0 始まりの自然数の番号を一つ書く約束とします。Lean の String.toNat? で自然数に読めるかを調べます。

エラーには「数字に読めない」「番号が範囲外」「占有済み」の三種類があります。[Except型](../LVT1-03/index.md#def-lvt1-03-except)なら失敗の原因も値にできます。三種類の原因は [帰納型](../LVT1-03/index.md#def-lvt1-03-inductive-type) の構成子として表します。`raw` は入力文字列で、`raw.toNat?` は自然数に読めれば `some n`、読めなければ `none` を返します。`if h : n < 9 then ...` の真の枝では条件の証明 h を利用できます。[有効な添字](../LVT1-05/index.md#def-lvt1-05-index-range) の条件を確認してから [Fin型](../LVT1-05/index.md#def-lvt1-05-fin-index) の `⟨n, h⟩` を作ります。先頭にドットを付けた `.ok`、`.error` などは期待される型から構成子の所属を補う記法です。

```lean
inductive RequestError where
  | malformed
  | outOfRange
  | occupied
  deriving Repr, BEq

def decode (raw : String) : Except RequestError (Fin 9) :=
  match raw.toNat? with
  | none => .error .malformed
  | some n =>
    if h : n < 9 then .ok ⟨n, h⟩ else .error .outOfRange
```

Repr は値の確認用表示、BEq は値を真偽値で比較するための仕組みを自動で作る指定です。復号の具体例を表にします。

| 入力 | 自然数への変換 | 範囲の検査 | 復号結果 |
| --- | --- | --- | --- |
| "2" | some 2 | 2 < 9 | ok 番号2 |
| "9" | some 9 | 9 < 9 は偽 | error outOfRange |
| "abc" | none | 行わない | error malformed |

次に復号の結果を内部の着手につなぎます。`e` は失敗原因、`i` は復号した番号、`next` は着手に成功した新しい盤面です。

```lean
def runRequest (b : Board) (raw : String) : Except RequestError Board :=
  match decode raw with
  | .error e => .error e
  | .ok i =>
    match place b i with
    | none => .error .occupied
    | some next => .ok next
```

<a id="prop-lvt1-06-decode-rejection"></a>

<!-- formal-statement-start -->
### 命題（復号失敗の伝播）

b : Fin 9 → Bool、raw : String、e : RequestError を任意に取る。runRequest は decode raw が error e なら error e をそのまま返し、ok i なら place b i の結果を Except に変換する関数とする。decode raw = error e ならば runRequest b raw = error e である。このとき runRequest の定義を場合分けに従って簡約すると、着手関数を含む枝を選ばずに結果が得られる。
<!-- formal-statement-end -->

**証明の見取り図**　復号の結果が失敗なら、盤面操作へ進む枝が選ばれません。

<!-- proof-start -->
### 証明

仮定 decode raw = error e を runRequest の定義中の match の対象に代入する。すると対象は error e という構成子を持つ値である。従って第一枝だけが選ばれ、結果は error e となる。place b i が現れるのは第二枝だけであり、第一枝の結果には含まれない。b の各マスの値に関する仮定は不要である。この命題の等式は返り値についての主張であり、実行時間やコンパイラの命令列についての主張ではない。

```lean
theorem rejected_before_place (b : Board) (raw : String) (e : RequestError)
    (h : decode raw = .error e) :
    runRequest b raw = .error e := by
  simp [runRequest, h]
```
<!-- proof-end -->

例えば raw = "9" のとき、decode は error outOfRange を返すので、[復号失敗の伝播](#prop-lvt1-06-decode-rejection)により盤面が空でも満杯でも同じエラーとなります。

## 4. 値の計算と入出力を分離する

ファイルへの書込み、端末への表示、ネットワークからの入力のように、計算の外側の世界を読み書きする操作を入出力（IO）と呼びます。Lean では IO Unit 型の処理として、例えば IO.println で文字列を表示できます。Unit は意味のある結果値を必要としないときに使う型です。String 型の値を返すだけの関数と、実際に表示する IO Unit 型の処理を区別しましょう。ここで内部モデルとは番号を受け取って着手を計算する place の部分です。文字列への変換と外部との読み書きがこのモデルと外の世界をつなぎます。

<a id="def-lvt1-06-io-boundary"></a>

<!-- formal-statement-start -->
### 定義（入出力境界）

外部形式のデータを内部の型へ変換する処理、内部の結果を外部形式へ変換する処理、および外部との読み書きを担う部分を、内部モデルに対する入出力境界という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-06-io-boundary -->
**定義の確認**　空盤面を使い、端末から文字列 "2" を受け取る。decode は 2 < 9 を確認して番号 2 の Fin 9 を作る。[着手の分岐と更新位置](#prop-lvt1-06-place-branches) により空盤面の番号 2 だけが true になる。番号 0 から 8 の値を順に false なら "0"、true なら "1" に変換して連結すると "001000000" になり、成功を示す "ok " を先頭に付けて "ok 001000000" を表示する。文字列の受取り・復号・符号化・表示が境界であり、Fin 9 を受け取って盤面を計算する place は内部モデルに当たる。decode や符号化は [純粋関数](#def-lvt1-06-pure-function) として実装でき、実際の読み書きだけを IO にできる。
<!-- definition-example-end -->

List.map は各要素に関数を適用して同じ順序のリストを作ります。String.intercalate "" は空文字列を区切りとして連結します。0 から 8 の順に各マスを 0 または 1 に変換するので、番号 2 だけが true なら 001000000 です。++ は左の文字列の後ろに右の文字列を順に付ける Lean の演算です。例えば "ab" ++ "c" は "abc" になります。

列挙する番号はすべて 9 未満なので、Fin 9 の数値リテラルとして書いても番号が変わりません（[Fin型](../LVT1-05/index.md#def-lvt1-05-fin-index)）。外部から来た番号の範囲検査は省略できません。

```lean
def boardText (b : Board) : String :=
  String.intercalate "" (([0, 1, 2, 3, 4, 5, 6, 7, 8] : List (Fin 9)).map
    (fun i => if b i then "1" else "0"))

def reply (res : Except RequestError Board) : String :=
  match res with
  | .error .malformed => "error malformed"
  | .error .outOfRange => "error outOfRange"
  | .error .occupied => "error occupied"
  | .ok next => "ok " ++ boardText next
```

`boardText` は盤面を文字列へ変換し、`reply` は成功・失敗に応じた返答を作ります。

端末コマンドの引数を文字列として受け取るプログラムでは、純粋部分の結果を最後に表示します。`args` は引数の文字列のリストで、`[raw]` は要素がちょうど一つの場合にだけ一致し、`_` は残りの場合を受け持ちます。

```lean
def main (args : List String) : IO Unit :=
  match args with
  | [raw] => IO.println (reply (runRequest emptyBoard raw))
  | _ => IO.println "error expected one argument"
```

この例では起動ごとに emptyBoard を渡すため、プロセス間で着手を保存しません。続けて着手するには直前の成功結果の盤面を次の入力へ渡します。盤面の計算、符号化、表示は別々に検査できます。

## 5. 境界の誤りを見つける

仕様が 0 始まりであるにもかかわらず、正の入力を 1 始まりの番号だと解釈する復号関数を考えます。自然数が 0 なら拒否し、Nat.succ n なら一つ小さい n を使う実装です。Nat.succ n は n + 1 を表すため、例えば 2 を照合すると n = 1 が得られます。

```lean
def wrongDecode (raw : String) : Except RequestError (Fin 9) :=
  match raw.toNat? with
  | none => .error .malformed
  | some 0 => .error .outOfRange
  | some (Nat.succ n) =>
    if h : n < 9 then .ok ⟨n, h⟩ else .error .outOfRange
```

raw = "2" では正しい decode は番号 2、wrongDecode は 2 = Nat.succ 1 なので番号 1 です。どちらも Fin 9 の条件を満たします。[着手の分岐と更新位置](#prop-lvt1-06-place-branches)を emptyBoard に適用すると、前者は 001000000、後者は 010000000 になります。着手の命題に矛盾はありません。命題が保証するのは渡された i の更新であって、raw が意図した i に変換されたことではないからです。さらに "0" は誤って拒否され、"9" は番号 8 として誤って受理されます。

JSON は文字列で構造化データを伝える形式です。例えば {"index":2} という JSON の入力を使う場合にも、index の存在、自然数として読めること、0 始まりの規約と範囲を確認する必要があります。本講では一つの自然数だけを伝える形式でその構造を学び、後の講で JSON の処理を実装します。

## 6. Leanで実験する

[固定されたLeanプロジェクト](../LVT1-02/index.md#def-lvt1-02-fixed-environment)に沿い、Lean v4.35.0 の lab を用います。リポジトリのルートから実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT1-06/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean --run Boundary.lean 2
lake env lean --run Boundary.lean 9
lake env lean --run Boundary.lean abc
```

lake test の期待出力は LVT1-06 OK です。Inspect.lean は次の 5 行を表示します（Lean の文字列表示には引用符が付く場合があります）。

```text
ok 001000000
error outOfRange
error malformed
error occupied
ok 010000000
```

最後の行は wrongDecode で番号 1 を得て着手した結果です。端末の Boundary.lean は最初の 3 行をそれぞれのコマンドで表示します。独立した Python の参照用スクリプトは 0 から 9 までの数字文字列、abc、x、空文字列について、空盤面からの Lean CLI の出力と比較します。占有済みのケースや誤復号関数そのものはこの Python 検査の対象ではありません。

```bash
python3 check_boundary.py
```

同じ規約で正しい結果と照合します。誤変換の差は Inspect.lean の最後の出力で確認できます。[有限な例示テストと全入力一致](../LVT1-01/index.md#prop-lvt1-01-test-boundary) により、有限個の入力で一致したことと、上の命題の全入力での成立は区別してください。

## 7. 演習

### Level A

### LVT1-06-A01 純粋な計算

emptyBoard を b とし、writeMark b 4 を b' とする。b 4、b' 4、b' 3 を求め、writeMark の純粋性を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

b はどの番号でも false なので b 4 = false である。b' 4 では比較 4 = 4 が真となり true を返す。b' 3 では 3 = 4 が偽で b 3 = false を返す。[純粋関数](#def-lvt1-06-pure-function)の条件を確認すると、各結果は b, i と評価する位置 j から決まり、外部データの読書きもない。元の b 4 は false のままである。
<!-- solution-end -->

### LVT1-06-A02 既存の印

b = writeMark emptyBoard 4 とする。place b 4 と place b 8 の結果を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

b 4 は 4 = 4 により true、b 8 は 8 ≠ 4 により false である。[着手の分岐と更新位置](#prop-lvt1-06-place-branches)を適用すると、place b 4 は none、place b 8 は some (writeMark b 8)。後者は番号 8 を true にし、番号 4 は 4 ≠ 8 により b 4 = true を保持する。他の七つは false のままである。
<!-- solution-end -->

### LVT1-06-A03 入力を判定する

decode に "0"、"8"、"9"、"x" を渡した結果をそれぞれ答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

"0" は some 0 に変換され 0 < 9 なので ok の番号 0。"8" は some 8 で 8 < 9 なので ok の番号 8。"9" は some 9 だが 9 < 9 は偽で error outOfRange。"x" は none なので error malformed となり、範囲検査に進まない。
<!-- solution-end -->

### LVT1-06-A04 符号化する

番号 0、4、8 のみが true の盤面について boardText と、reply にその盤面を ok として渡した結果を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

0 から 8 の順の値は true, false, false, false, true, false, false, false, true である。map により "1","0","0","0","1","0","0","0","1" となり、空文字列で連結すると "100010001"。reply の ok 枝は "ok " を前に連結するので "ok 100010001" となる。
<!-- solution-end -->

### Level B

### LVT1-06-B01 着手を連続させる

空盤面から "2"、"5" の順に runRequest を行い、成功時には結果盤面を次へ渡す。二つの返答を求め、さらに "2" を入力した結果を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

decode "2" は番号 2。emptyBoard 2 = false なので [着手の分岐と更新位置](#prop-lvt1-06-place-branches)により番号 2 だけ true となり、返答は "ok 001000000"。その盤面を b とする。decode "5" は番号 5 で b 5 = false。[着手の分岐と更新位置](#prop-lvt1-06-place-branches) の i に 5、j に 2 を取る。番号 5 は true となり、2 ≠ 5 なので新しい盤面の番号 2 の値は b 2 = true のままである。返答は "ok 001001000"。さらに "2" を復号すると番号 2、現在の盤面では true のため place は none。runRequest は error occupied に変換し、返答は "error occupied" となる。エラー時は新しい盤面を得ていないので、呼出し側は直前の盤面を保持する。
<!-- solution-end -->

### LVT1-06-B02 復号失敗と盤面の関係

任意の盤面 b について runRequest b "9" と runRequest b "abc" を求め、なぜ盤面の値を一つも調べる必要がないのか説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

"9" は自然数 9 に読めるが 9 < 9 が偽なので decode "9" = error outOfRange。"abc" は自然数に読めず decode "abc" = error malformed。[復号失敗の伝播](#prop-lvt1-06-decode-rejection)の raw にそれぞれを代入し、e に対応するエラーを選ぶと runRequest b "9" = error outOfRange、runRequest b "abc" = error malformed である。match の第一枝だけを通るので place は呼ばれず、b の値に条件はない。
<!-- solution-end -->

### LVT1-06-B03 表示形式の失敗

誤った符号化が番号 8 から 0 の順でマスを連結するとする。番号 2 のみが true の盤面について正しい文字列と誤った文字列を求め、どの部分を直すべきか述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

正しい順では位置 2 に 1 があり "001000000"。逆順は元の位置 8,7,6,5,4,3,2,1,0 を読む。位置 2 は逆順の添字 8 − 2 = 6 に移るので "000000100" になる。盤面の関数自体は番号 2 だけを true としており、[入出力境界](#def-lvt1-06-io-boundary)の符号化が順序規約に違反している。boardText の列挙順を直すべきで、place の更新位置を変更してはいけない。
<!-- solution-end -->

### Level C

### LVT1-06-C01 誤った復号を診断する

wrongDecode を使った場合、"0"、"2"、"9" がそれぞれどう処理されるか計算せよ。空盤面を使うときの正しい返答と比較し、内部の着手についての命題がすべて成立してもこの誤りが残る理由を述べよ。誤りを検出する三つの検査を Lean の #guard で実装せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

正しい decode は "0" と "2" をそれぞれ 0 と 2 に変換する。空盤面の両マスは false なので、[着手の分岐と更新位置](#prop-lvt1-06-place-branches)により返答は "ok 100000000" と "ok 001000000"。9 は範囲外で "error outOfRange"。

wrongDecode "0" は 0 の枝で error outOfRange。wrongDecode "2" は 2 = Nat.succ 1 で 1 < 9 なので番号 1 を返し、空盤面の更新結果は "ok 010000000"。wrongDecode "9" は 9 = Nat.succ 8 で 8 < 9 を満たし、番号 8 を更新して "ok 000000001" になる。三つとも正しい規約と不一致である。

着手命題の入力 i は復号後の Fin 9 であり、外部文字列を自然数としてどう読むかは仮定に含まれない。したがって内部で i の位置が正しく更新されても、通信の規約に違反しうる。次は正しい実装に対する検査であり、runRequest の中の decode を wrongDecode に置換した実装なら三つとも失敗する。`#guard` は具体的な真偽値を検査する命令で、`==` は二つの文字列を比較して Bool を返す演算である。証明する等式 `=` とは区別する。

```lean
#guard reply (runRequest emptyBoard "0") == "ok 100000000"
#guard reply (runRequest emptyBoard "2") == "ok 001000000"
#guard reply (runRequest emptyBoard "9") == "error outOfRange"
```

内部の命題とは別に、外部入力と観測される返答を組にして確かめることが重要である。
<!-- solution-end -->

## 8. 次への接続

純粋な参照モデルの計算と、入出力の規約を分けると、失敗箇所を特定しやすくなります。次講では、実行結果を表す Bool と数学的な主張を表す Prop を区別して、Lean の証明を体系的に学びます。

参考：[Functional Programming in Lean](https://lean-lang.org/functional_programming_in_lean/)、[Lean言語リファレンス](https://lean-lang.org/doc/reference/latest/)。
