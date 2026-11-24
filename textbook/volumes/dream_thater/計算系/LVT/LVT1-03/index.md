# LVT1-03 型・関数・帰納型・Option/Except

前提講座：[LVT1-02 Lean環境・Lake・再現可能なプロジェクト](../LVT1-02/index.md)

前講では自然数の関数を実行し、型が合わない式をLeanが拒否することを確認しました。ゲームの盤面を自然数だけで記録すると、0と1がプレイヤーなのか空きマスなのか、2以上をどう扱うかを別途決めなければなりません。今回は値の候補そのものを型で表し、空きマスへの着手と着手拒否を異なる結果として返す小さなモデルを作ります。盤面全体の規則ではなく、1マスへの着手を対象とします。

## 1. 値の候補と関数の型

型は式がどの種類の値を表すかを指定します。Nat は0を含む自然数、Bool は true と false の型です。関数は受け取る値の型と返す値の型を持ちます。例えば Nat → Nat は自然数を受け取って自然数を返します。

引数が二つの関数の型 A → B → C は A → (B → C) の意味です。最初にA型の値を渡すと、残りの引数Bを受け取る関数が得られます。前講の #check で式の型、#eval で具体値を調べられます。

ゲームのプレイヤーにNatを使う代わりに、二人の候補 x と o だけを用意します。

```lean
inductive Player where
  | x
  | o
  deriving Repr, BEq

inductive Cell where
  | empty
  | occupied (p : Player)
  deriving Repr, BEq
```

inductive は、値を作る方法を列挙して新しい型を宣言する命令です。値を作るそれぞれの記号を構成子（constructor）と呼びます。ここで Player.x と Player.o は引数のない構成子、Cell.occupied はPlayer型の値を一つ受け取ってCell型の値を作る構成子です。deriving Repr, BEq は値の表示と真偽値による比較を生成する指定です。比較の正当性を一般に証明する方法は後の講で扱います。

<a id="def-lvt1-03-inductive-type"></a>

<!-- formal-statement-start -->
### 定義（帰納型）

帰納型とは、指定した構成子によって値を生成する型である。各構成子は引数の型と生成する値の型を指定する。帰納型の値はその構成子を用いて生成される。本講では再帰的な引数（生成する型自身の値を受け取る引数）を含まない型を扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-03-inductive-type -->
**定義の確認**　Playerの構成子は x と o の二つで、どちらにも引数はありません。Cellには引数なしの empty と Player を一つ要求する occupied があるので、Cellの具体値は empty、occupied x、occupied o の三つです。occupied true は必要な型Playerと実際の型Boolが違うため、Cellを作れません。
<!-- definition-example-end -->

```lean
#check Player.x
#check Cell.occupied
#check Cell.occupied Player.x
```

順に Player、Player → Cell（引数名付きで表示されることもあります）、Cell です。型は値を作れる条件を制約しますが、「相手のマスを書き換えてよいか」というゲーム規則までは自動で決めません。

## 2. 値の形に応じて計算する

次の手番のプレイヤーを返す other を作ります。match は入力がどの構成子で作られたかによって計算を選ぶ記法です。構成子の引数がある場合はその値にも名前を付けられます。型から構成子が分かる箇所では Player.x を .x と省略できます。

```lean
def other (p : Player) : Player :=
  match p with
  | .x => .o
  | .o => .x
```

x を渡すと一つ目の枝に入り o を返します。o を渡すと二つ目の枝に入り x を返します。Player の二つの形をすべて扱うので、どちらを入力しても結果が決まります。一つの枝を消して残りを補わなければ未処理の入力が生じ、Leanはこの定義を拒否します。

二回手番を変えると元に戻ることを確かめます。

<a id="prop-lvt1-03-other-twice"></a>

<!-- formal-statement-start -->
### 命題（手番交換の二回適用）

Playerを x と o の二つの構成子を持つ型とする。関数 other は x を o に、o を x に写す。任意の Player 型の値 p に対し、other (other p) = p が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　入力の候補は二つだけなので、それぞれに関数を二回適用します。具体値を適当に選ぶのではなく、すべての構成子を尽くすことが要点です。

<!-- proof-start -->
### 証明

[帰納型](#def-lvt1-03-inductive-type) Player の値の形から、p が x の場合と o の場合に分ける。

p が x のとき、内側の other x は o である。外側は other o なので x に戻る。

p が o のとき、内側の other o は x である。外側は other x なので o に戻る。

いずれも結果が入力 p に一致する。二つ以外の構成子はないため、全入力について成立する。

```lean
theorem other_twice (p : Player) : other (other p) = p := by
  cases p <;> rfl
```

by は証明手順を記述する入口である。cases p は p の構成子に応じて二つの証明目標を作る。<;> は左の手順が作ったすべての目標に右の手順を適用する記法である。両目標は上の計算で x = x、o = o に簡約されるため、前講で使った rfl がそれぞれを証明する。
<!-- proof-end -->

## 3. 値が存在しない場合を型で表す

空きマスに所有者は存在しません。しかし occupied p なら p が所有者です。Player型だけを返す関数にすると、空きマスに対して x か o のどちらかを返さなければならず、仕様と合いません。そこで値がない場合も返せる型を使います。型を引数に取る Option は、Player だけでなく Nat などにも適用できます。

<a id="def-lvt1-03-option"></a>

<!-- formal-statement-start -->
### 定義（Option型）

型 A に対する Option A は、値が存在しないことを表す none と、A 型の値 a を一つ持つ some a の二種類の構成子を持つ型である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-03-option -->
**定義の確認**　Option Player では none が所有者なし、some Player.x と some Player.o が所有者ありの二例です。some true は Bool の値を包むので Option Player にはなりません。none は中身を持たないため、単独で書く場合は (none : Option Player) のように結果の型を指定できます。
<!-- definition-example-end -->

```lean
def owner (c : Cell) : Option Player :=
  match c with
  | .empty => none
  | .occupied p => some p
```

入力が empty なら none、occupied x なら some x、occupied o なら some o になります。二つ目の枝の p には occupied に渡された値がそのまま入ります。所有者がいないことと、所有者が x であることが混同されません。

## 4. 成功と失敗理由を区別する

1マスへの着手には「空なら置く、埋まっていれば拒否する」という仕様を採用します。成功した場合は更新後のマス、失敗した場合は既にいるプレイヤーを返します。まず本講専用の Result 型を宣言します。

```lean
inductive Result where
  | played (cell : Cell)
  | blocked (byPlayer : Player)
  deriving Repr, BEq

def play (p : Player) (c : Cell) : Result :=
  match c with
  | .empty => .played (.occupied p)
  | .occupied q => .blocked q
```

play の型は Player → Cell → Result です。play Player.x Cell.empty では空きマスの枝に入り、played (occupied x) を返します。play Player.x (Cell.occupied Player.o) では既存の所有者 q に o が入り、blocked o を返します。p と q を混同すると、誰が先に置いていたかの情報が失われます。

成功型とエラー型を引数として指定できる汎用の型 Except もあります。ここではエラーの種類を PlayError として分離します。既存プレイヤーを受け取る occupied という構成子を一つ持たせます。

```lean
inductive PlayError where
  | occupied (p : Player)
  deriving Repr, BEq
```

<a id="def-lvt1-03-except"></a>

<!-- formal-statement-start -->
### 定義（Except型）

エラーの型 E と成功値の型 A に対する Except E A は、成功値 a を持つ ok a と、エラー値 e を持つ error e の二種類の構成子を持つ型である。a の型は A、e の型は E である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-03-except -->
**定義の確認**　E を既存プレイヤーを保持する PlayError、A を Cell とすれば、ok (Cell.occupied Player.x) は成功値、error (PlayError.occupied Player.o) は失敗値です。ok Player.x は成功値の型Cellに合わず、error Cell.empty はエラー値の型PlayErrorに合いません。Option型と違って失敗した理由を保持できます。
<!-- definition-example-end -->

```lean
def playExcept (p : Player) (c : Cell) : Except PlayError Cell :=
  match play p c with
  | .played d => .ok d
  | .blocked q => .error (.occupied q)
```

playExcept は Result の二つの形を [Except型](#def-lvt1-03-except) の二つの形へ変換します。played の中の Cell はそのまま成功値になり、blocked の中の Player は occupied で包んでエラーになります。

<a id="prop-lvt1-03-play-branches"></a>

<!-- formal-statement-start -->
### 命題（空きマスと占有マスの着手結果）

Player は x と o を持ち、Cell は empty または occupied q（q は Player）、PlayError は occupied q を持つとする。play は空きマスで played (occupied p)、占有マスで blocked q を返す。playExcept は前者を ok、後者を error (PlayError.occupied q) へ変換する関数である。任意の Player 型の値 p, q について次が成立する。

- playExcept p Cell.empty = Except.ok (Cell.occupied p)
- playExcept p (Cell.occupied q) = Except.error (PlayError.occupied q)
<!-- formal-statement-end -->

**証明の見取り図**　まず play で入力マスを判定し、得られた Result を playExcept の分岐へ渡します。着手するプレイヤー p と既存プレイヤー q の役割を追います。

<!-- proof-start -->
### 証明

空きマスでは play p Cell.empty が played (Cell.occupied p) に簡約される。playExcept の match は played の枝を選ぶので、d = Cell.occupied p を代入して Except.ok (Cell.occupied p) を得る。

占有マスでは play p (Cell.occupied q) が blocked q に簡約される。playExcept の match は blocked の枝を選ぶので、Except.error (PlayError.occupied q) を得る。

いずれも p, q の具体値を選ぶ必要はなく、関数の定義だけで成立する。

```lean
theorem play_empty (p : Player) :
    playExcept p .empty = .ok (.occupied p) := rfl

theorem play_occupied (p q : Player) :
    playExcept p (.occupied q) = .error (.occupied q) := rfl
```
<!-- proof-end -->

このモデルは更新後のマスを値として返すので、外部の盤面を書き換える処理をまだ含みません。成功結果を呼び出し側が正しく使うかは別の問題です。例えば常に ok (occupied p) を返す関数も同じ戻り値の型を持てますが、占有マスの拒否規則を破ります。型による制約と、関数が仕様を満たすことの証明を区別してください。

## 5. Leanで実験する

[固定されたLeanプロジェクト](../LVT1-02/index.md#def-lvt1-02-fixed-environment) の作り方に従い、lab にLean v4.35.0、Lake設定、外部依存なしのmanifest、ソースを用意しました。LvtTypes.lean に上の型・関数・証明をまとめています。リポジトリのルートから実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT1-03/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
```

lake test は Main.lean の実行入口を起動し、LVT1-03 OK を表示します。Mainの #guard はビルド中に具体例の比較を確認します。Inspectでは owner empty が none、owner (occupied x) が some x、占有されたマスへの着手が error (occupied o) になることを確認します。表示の修飾名は環境によって異なることがあります。

Lean 4.35.0 の Except にはこの比較に必要な BEq が用意されていないため、二つの結果が一致するかを真偽値で返す sameOutcome を自作します。二つの結果を同時に match し、成功同士では Cell、失敗同士では PlayError の値を比較します。残る二通り（成功と失敗、失敗と成功）は false です。これはテストで使う関数であり、上の等式の証明には使いません。

```lean
def sameOutcome (a b : Except PlayError Cell) : Bool :=
  match a, b with
  | .ok c, .ok d => c == d
  | .error e, .error f => e == f
  | _, _ => false
```

例えば成功値 empty とエラー occupied x を比較すると、最後の枝が選ばれて false になります。成功同士でも empty と occupied x は異なるため false です。

```lean
#guard owner Cell.empty == (none : Option Player)
#guard sameOutcome (playExcept .x (.occupied .o))
  (Except.error (PlayError.occupied Player.o))
```

次は意図的な失敗です。

```bash
lake env lean Failure.lean
```

Failure.lean は Cell.occupied true を検査するので、Playerを要求する構成子にBoolを渡した型不一致で失敗するのが期待結果です。import失敗など別の原因で失敗した場合は型の制約を確認したことにはなりません。

具体例の検査と [手番交換の二回適用](#prop-lvt1-03-other-twice)、[空きマスと占有マスの着手結果](#prop-lvt1-03-play-branches) の証明は区別してください。後者は指定した型の全入力について成り立ちます。

## 6. 演習

### Level A

### LVT1-03-A01 構成子と型

Player.x、Cell.occupied、Cell.occupied Player.o の型を答えよ。Cell.occupied true が拒否される理由も述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[帰納型](#def-lvt1-03-inductive-type) の構成子宣言を読みます。x は引数なしで Player を生成するので Player 型です。occupied は Player を受け取って Cell を生成するので Player → Cell です。Player.o は要求される Player 型なので適用した結果は Cell 型になります。true は Bool 型なので occupied の引数の型を満たしません。
<!-- solution-end -->

### LVT1-03-A02 部分適用

play Player.x の型を答え、Cell.empty を続けて渡した結果を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

play の型は Player → (Cell → Result) です。Player.x を渡すと一番目の引数が確定し、残りは Cell → Result です。Cell.empty を渡すと play の empty の枝が選ばれ、p に Player.x を代入して Result.played (Cell.occupied Player.x) を得ます。
<!-- solution-end -->

### LVT1-03-A03 所有者

三つのCellの値について owner の結果をすべて求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

empty では最初の枝から none。occupied x では二番目の枝の p が x なので some x。occupied o では p が o なので some o です。[Option型](#def-lvt1-03-option) により三つの結果は Option Player 型で、none と some x を区別できます。
<!-- solution-end -->

### LVT1-03-A04 エラーの値

playExcept Player.x (Cell.occupied Player.o) の型と値を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

結果の型は Except PlayError Cell です。play x (occupied o) は blocked o を返します。playExcept の blocked の枝で q に o を代入すると error (PlayError.occupied Player.o) になります。既存のプレイヤーは o であり、着手者 x ではありません。[空きマスと占有マスの着手結果](#prop-lvt1-03-play-branches) の占有の場合にも一致します。
<!-- solution-end -->

### Level B

### LVT1-03-B01 空き判定を実装する

Cellを受け取って空きマスなら true、それ以外なら false を返す isEmpty を作り、三つの値を手計算で確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

```lean
def isEmpty (c : Cell) : Bool :=
  match c with
  | .empty => true
  | .occupied _ => false
```

empty では true の枝を選びます。occupied x と occupied o ではどちらも occupied の枝を選びます。_ はその中身に名前を付けない記法で、両者とも false になります。二種類の構成子を尽くしています。
<!-- solution-end -->

### LVT1-03-B02 失敗理由を捨てる変換

Except PlayError Cell を Option Cell に変換し、成功値を保存して失敗理由だけを捨てる forgetError を実装せよ。x が空きマスに着手する場合と o のマスに着手する場合を計算せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[Except型](#def-lvt1-03-except) の二つの構成子を調べ、成功値だけを [Option型](#def-lvt1-03-option) の some に移します。

```lean
def forgetError (r : Except PlayError Cell) : Option Cell :=
  match r with
  | .ok c => some c
  | .error _ => none
```

[空きマスと占有マスの着手結果](#prop-lvt1-03-play-branches) より、空きマスでは playExcept x empty = ok (occupied x) です。変換後は some (occupied x) です。占有マスでは playExcept x (occupied o) = error (occupied o) です。変換後は none となります。error (occupied x) も none へ写るため、none だけを見ても元のエラー値を復元できません。
<!-- solution-end -->

### LVT1-03-B03 所有者の保存を示す

任意の Player 型の値 p に対して owner (Cell.occupied p) = some p を示し、Leanの定理を書け。

- Level: B

<!-- solution-start -->
#### 詳細解答

owner の定義で occupied p を渡すと、occupied の枝が選ばれます。枝の局所変数には入力の p がそのまま入り、右辺は some p です。具体的なプレイヤーに場合分けしなくても、両辺は定義に従って同じ式に簡約されます。

```lean
theorem owner_after_play (p : Player) :
    owner (.occupied p) = some p := rfl
```

この主張は空きマスを対象にしていません。empty では owner の結果は none です。
<!-- solution-end -->

### Level C

### LVT1-03-C01 型だけでは規則を保証しない

playExcept と同じ型を持つが占有マスへの着手を誤って許す関数 badPlay を書け。二つの入力で正しい関数との結果を比較し、どの命題が成立しなくなるか述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

```lean
def badPlay (p : Player) (_c : Cell) : Except PlayError Cell :=
  .ok (.occupied p)
```

入力 _c を使わず、常に成功を返す関数です。戻り値の occupied p は Cell 型で、ok は成功値 Cell を受け取るので、型は正しいです。

x と empty を渡すと badPlay は ok (occupied x) を返し、正しい playExcept も play の empty の枝から同じ結果を返します。x と occupied o を渡すと badPlay は ok (occupied x) を返します。しかし正しい play は blocked o を返し、playExcept はこれを error (occupied o) に変換します。

したがって [空きマスと占有マスの着手結果](#prop-lvt1-03-play-branches) の空きマス側の式は badPlay に置き換えても成立しますが、占有マス側は p = x、q = o の反例で成立しません。成功と失敗は Except の異なる構成子です。ExerciseSolutions.lean の二つの具体的な #guard でこの差を確認します。型の検査だけではこの誤りを防げず、仕様に対応する定理または適切な入力でのテストが必要です。
<!-- solution-end -->

## 7. 参考資料と次講

- [The Lean Language Reference](https://lean-lang.org/doc/reference/latest/)

次講では match の分岐をさらに使い、再帰的な計算と停止性を扱います。
