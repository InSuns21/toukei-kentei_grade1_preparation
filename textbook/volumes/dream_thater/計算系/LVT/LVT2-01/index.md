# LVT2-01 Prop・Bool・Decidable・Curry–Howard対応

前講では[実行可能な参照モデル](../LVT1-06/index.md#def-lvt1-06-reference-model)で空きマスへの着手を判定しました。プログラムが true を返すことと、その判定が仕様に適合することは別です。今回は「判定する値」と「判定の正しさを支える証明」を型で区別し、両者を結びます。

前提：[LVT1-06](../LVT1-06/index.md)。到達点は、命題と証明の型を読み、決定手続きの二つの分岐から判定の正しさを示し、誤った判定器の反例を作ることです。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT2-01)。Lean Web で命題・証明・判定器を編集し、型、評価値、反例を確認できます。Python との照合や Lake の実行は同じラボから GitHub Codespaces（ブラウザ版VS Code）を開いて行います。ローカルへのインストールは不要です。

## 1. 計算と論理の二つの役割

自然数 2 と 3 を比較したとき、プログラムの結果として false を受け取れます。一方、数学の主張「2 = 3」は偽の命題です。false というデータは存在しますが、矛盾のない論理のもとでは偽の命題の正しい証明は作れません。この違いを Lean の型で捉えます。以下で自然数というときは Lean の `Nat`、すなわち 0 を含む非負整数を指します。`Bool` は前講で盤面の値に使った型です。ここでは [帰納型](../LVT1-03/index.md#def-lvt1-03-inductive-type) の構成子（値を作る方法）に立ち返り、その二つの値を確認します。

<a id="def-lvt2-01-bool"></a>

<!-- formal-statement-start -->
### 定義（Leanの真偽値型）

Lean の Bool は二つの構成子 true と false を持つデータ型である。値を場合分けして計算に用いることができる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-01-bool -->
**定義の確認**　if true then 10 else 20 は 10、if false then 10 else 20 は 20 を返す。`true : Bool` と `false : Bool` はいずれも引数を必要としない構成子であり、条件に使うと分岐を一つ選ぶ。false も正当なデータである。
<!-- definition-example-end -->

Lean の等式は、左右の項が等しいという主張を表します。Bool の二つの値とは異なり、Prop は個々の命題を分類する型であり、等式ごとに異なる命題が得られます。命題そのものが Prop の項です。式 `h : p` は、h が型 p の項（その型に属する式）であることを表し、p が命題なら h をその証明として読みます。`True` は成立する命題で、証明の構成子 `True.intro` を持ちます。`False` は矛盾を表す命題で、証明を作る構成子を持ちません。自然数の等式 `=` は命題を作り、比較演算 `==` は真偽値を返します（[第2講の零入力での加算関数の値](../LVT1-02/index.md#prop-lvt1-02-bump-zero)とその後の比較例）。同じ講で使った `rfl` は、等式の両辺が定義による計算で同じ式に簡約されるときに使える証明項です。

<a id="def-lvt2-01-prop"></a>

<!-- formal-statement-start -->
### 定義（Leanの命題型）

Lean で p : Prop は p が命題であることを表す。h : p である項 h を p の証明項として扱う。True は構成子 True.intro を持つ命題、False は構成子を持たない命題である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-01-prop -->
**定義の確認**　p を 2 = 2 とする。左右が同じ自然数なので、等式の反射性を表す証明項 rfl を与えられる。`p : Prop` であり、期待する型を p と指定すると `rfl : p` が得られる。`True.intro : True` も証明項であるが、`false : Bool` は False の証明項ではない。False には証明を直接作る構成子がない。
<!-- definition-example-end -->

```lean
#check Bool
#check true
#check (2 = 2)
#check (show 2 = 2 from rfl)
#check True.intro
```

ここで `#check` は項の型を調べ、`show T from e` は e を型 T の項として検査します。例えば `show 2 = 2 from rfl` では、左右が同じ自然数であることから `rfl` が型 `2 = 2` を持ちます。`1 + 1 = 2` でも左辺が 2 に計算されるので同じ根拠で証明できます。

| 式 | 型 | 役割 |
| --- | --- | --- |
| true | Bool | 真を表すデータ |
| false | Bool | 偽を表すデータ |
| 2 = 2 | Prop | 等しいという命題 |
| rfl（2 = 2 の型を指定） | 2 = 2 | 等式の証明項 |
| False | Prop | 証明できれば矛盾を表す命題 |

## 2. 証明を関数として組み立てる

「p ならば q」を証明したい場合、p の証明を受け取り、そこから q の証明を作ればよいと考えます。これは既習の関数と同じ形です。`p → q` はこの含意を表し、`p → False` は p の否定を表します。Lean では後者を `¬ p` と書きます。`fun h : p => h` のコロンは引数の型、矢印の右側（`=>` の後）は返す項です。関数を型として見ると、入力型 p、出力型 p の `p → p` になります。`fun h => h` は期待する関数型から引数の型が分かる場合の省略形です。

<a id="def-lvt2-01-curry-howard"></a>

<!-- formal-statement-start -->
### 定義（Curry–Howard対応）

Lean の命題を型、命題の証明をその型の項として捉える対応を Curry–Howard対応という。p, q : Prop に対し、含意 p → q の証明は p の証明を受け取って q の証明を返す関数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-01-curry-howard -->
**定義の確認**　任意の p : Prop に対して fun h : p => h を考える。引数 h の型は p、返す h の型も p である。よって関数の型は p → p となり、「p ならば p」の証明を構成したことになる。
<!-- definition-example-end -->

```lean
theorem selfImp (p : Prop) : p → p :=
  fun h => h

theorem fixedEquality : 1 + 1 = 2 := rfl
```

selfImp は任意の命題について成立します。p が偽の場合にも含意の証明は作れます。関数を作るだけなら p の証明を実際に供給する必要はないためです。fixedEquality は具体的な等式の証明です。証明の型を指定し、項がその型に合うか Lean のカーネル（証明項を検査する中核）が検査します。

[Leanの命題型](#def-lvt2-01-prop)の False は構成子を持ちません。`f : False` を仮定した場合、どの構成子で f が作られたかを場合分けしても枝が一つもありません。したがって任意の目標命題 q に対し、`False.elim f : q` でその目標を閉じられます。これは False の証明を新たに作る操作ではなく、すでに仮定した矛盾を使う操作です。

## 3. 証明を伴う判定

自然数の等式は左右の値を計算して比較できます。任意の命題について、このような計算できる判定が最初から与えられるわけではありません。証明付きの判定では、成立時には命題の証明、不成立時には否定の証明を返す仕組みが必要です。[帰納型](../LVT1-03/index.md#def-lvt1-03-inductive-type) の構成子に証明を持たせます。`p : Prop` を固定して、`hp : p` は成立の証明、`hn : ¬ p`（すなわち `hn : p → False`）は不成立の証明を表す名前とします。

<a id="def-lvt2-01-decidable"></a>

<!-- formal-statement-start -->
### 定義（Leanの決定可能性）

p : Prop に対し、Decidable p は次の二つの構成子を持つ型である。

- isTrue hp：hp : p を保持する。
- isFalse hn：hn : ¬ p を保持する。

計算可能な Decidable p の項を構成できれば、p の成立・不成立を証明付きで判定できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-01-decidable -->
**定義の確認**　p として命題 `2 = 2` を選ぶ。`rfl : 2 = 2` を構成できるので、成立の構成子にこれを渡した `Decidable.isTrue rfl` は `Decidable (2 = 2)` の項である。次に p として命題 False を選ぶ。不成立の構成子に渡すには `¬ False` の型の項が必要であり、`Decidable.isFalse (fun h : False => h)` が `Decidable False` の項となる。後者の関数は False の証明を仮定してそのまま False を返すので、否定の証明の型 False → False を持つ。
<!-- definition-example-end -->

```lean
def yesExample : Decidable (2 = 2) :=
  .isTrue rfl

def noExample : Decidable False :=
  .isFalse (fun h => h)

def decisionBool (p : Prop) (d : Decidable p) : Bool :=
  match d with
  | .isTrue _ => true
  | .isFalse _ => false
```

`decisionBool p d` は、命題 p とその[証明付き判定](#def-lvt2-01-decidable) d を受け取り、真偽値だけを取り出します。`match` は構成子で場合分けし、`.isTrue` と `.isFalse` の先頭のドットは期待する型から `Decidable` を補う記法です。`_` は枝の結果でその証明項を直接参照しないことを示します。例えば `yesExample` は `.isTrue rfl` に展開されるため true の枝を選び、`noExample` は `.isFalse (fun h => h)` に展開されるため false の枝を選びます。

通常は Lean の decide を使います。decide p は型クラス（必要な型の項を自動探索する仕組み）によって Decidable p を探し、成立なら true、不成立なら false を返します。例えば自然数の等式については標準の計算可能な判定が用意されています。

```lean
#eval decide ((2 : Nat) = 2) -- true
#eval decide ((2 : Nat) = 3) -- false
#eval decisionBool (2 = 2) yesExample -- true
#eval decisionBool False noExample -- false
```

型クラスによる判定の指定を [Decidable p] と書くと、関数を呼ぶ際に Lean がその引数を探索します。任意の p : Prop だけでは計算可能な判定手続きは得られません。古典論理で命題が真か偽かを論じることと、実行できる手続きを与えることも別です。

## 4. 判定結果と仕様を結ぶ

証明で使う Bool の二つの構成子が異なることを確認します。Bool の値 b に対して、b が true なら True、false なら False という命題を対応させます（この対応を Q と呼びます）。仮に `false = true` が成立すれば、等しい値を置き換えて `Q true` の証明 `True.intro` を `Q false` の証明としても使えることになります。しかし `Q false` は False なので矛盾です。`true = false` も等式の左右を逆にすれば同じ矛盾を得ます。Lean の `cases bad` は、bad がこのような異なる構成子の等式の証明であるとき、成立する場合がないことを利用します。

テストで true になったときに証明を得られるでしょうか。証明を持つ判定から値を取り出した場合は、任意の入力について対応を示せます。true のとき必ず命題が成立する性質を健全性、命題が成立すると必ず true になる性質を完全性と呼びます。

<a id="prop-lvt2-01-decision-bridge"></a>

<!-- formal-statement-start -->
### 命題（証明付き判定の健全性と完全性）

任意の p : Prop と d : Decidable p に対し、decisionBool p d を、d が isTrue なら true、isFalse なら false を返す関数とする。

- decisionBool p d = true なら p が成立する。
- p が成立するなら decisionBool p d = true である。
<!-- formal-statement-end -->

**証明の見取り図**　[Leanの決定可能性](#def-lvt2-01-decidable)の d の二つの構成子について場合分けする。成立の枝には p の証明があり、不成立の枝には p を仮定した場合の矛盾を導く関数がある。

<!-- proof-start -->
### 証明

健全性について、h : decisionBool p d = true とする。d が isTrue hp なら hp : p をそのまま返せる。d が isFalse hn なら、decisionBool の定義を展開して `decisionBool p (.isFalse hn) = false` を得る。したがって仮定 h の型は `false = true` に簡約される。節の冒頭で確認した構成子の相違から False を得て、`False.elim` で p を導く。

完全性について、hp : p とする。d が isTrue の場合は定義により true = true なので反射性で成立する。d が isFalse hn なら hn : p → False である。hp を hn に渡すと `hn hp : False` を得る。ここで目標は定義により `false = true` に簡約されている。この矛盾を `False.elim` に渡せばその目標を満たす証明が得られる。二つの構成子を尽くしたので、任意の d について両方向が成立する。

```lean
theorem sound (p : Prop) (d : Decidable p)
    (h : decisionBool p d = true) : p := by
  cases d with
  | isTrue hp => exact hp
  | isFalse hn =>
    have bad : false = true := h
    cases bad

theorem complete (p : Prop) (d : Decidable p)
    (hp : p) : decisionBool p d = true := by
  cases d with
  | isTrue h => rfl
  | isFalse hn => exact False.elim (hn hp)
```

by は証明項を組み立てる操作を記す入口です。cases d は d の構成子ごとの証明に分けます。exact は提示した証明項で目標を満たします。have bad は途中で使う証明に名前を付けます。cases bad は異なる Bool 構成子の等式には成立する枝がないことを利用します。ここでは各操作と紙上の論証との対応だけを使います。
<!-- proof-end -->

例えば yesExample を渡すと decisionBool の結果が true になるので、[証明付き判定の健全性と完全性](#prop-lvt2-01-decision-bridge)から 2 = 2 の証明を取り出せます。

[証明付き判定の健全性と完全性](#prop-lvt2-01-decision-bridge)と同じ二つの方向が Lean 標準の decide にも用意されています。of_decide_eq_true は true という等式の証明から命題の証明を作り、decide_eq_true は逆方向を作ります。

```lean
theorem standardSound (p : Prop) [Decidable p]
    (h : decide p = true) : p :=
  of_decide_eq_true h

theorem standardComplete (p : Prop) [Decidable p]
    (h : p) : decide p = true :=
  decide_eq_true h
```

## 5. 仕様と判定器を取り違えない

自然数 n が指定番号 k と一致するという仕様を n = k とします。正しい判定器と、常に true を返す誤った判定器を比較します。

```lean
def sameNumber (n k : Nat) : Bool := decide (n = k)
def wrongMatches (_n _k : Nat) : Bool := true

theorem matchesSound (n k : Nat) (h : sameNumber n k = true) :
    n = k :=
  of_decide_eq_true h

theorem matchesComplete (n k : Nat) (h : n = k) :
    sameNumber n k = true :=
  decide_eq_true h
```

matchesSound の仮定を sameNumber の定義で展開すると decide (n = k) = true です。[証明付き判定の健全性と完全性](#prop-lvt2-01-decision-bridge)の標準版 standardSound で p を命題 `n = k` として適用すれば n = k を得ます。matchesComplete では同じ命題に standardComplete を適用して `decide (n = k) = true` を得て、sameNumber の定義に戻します。`_n` と `_k` は使用しない引数に付けた名前で、任意の自然数を受け取ります。

| n | k | 仕様 n = k | sameNumber | wrongMatches |
| --- | --- | --- | --- | --- |
| 2 | 2 | 成立 | true | true |
| 2 | 3 | 不成立 | false | true |

wrongMatches については一致する入力のテストだけなら成功しますが、2 と 3 の入力で健全性が破れます。完全性だけなら、n = k が成立するとき常に true を返すので満たします。逆に常に false を返す判定器は健全性を満たしますが、n = k のときも false となり完全性を満たしません。二方向の保証が必要です。

## 6. Leanで実験する

[固定されたLeanプロジェクト](../LVT1-02/index.md#def-lvt1-02-fixed-environment)に従い、Codespaces の端末でリポジトリのルートから実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT2-01/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
python3 check_matches.py
```

Lean v4.35.0 で型・証明を検査し、テスト実行の期待出力は LVT2-01 OK です。Inspect.lean の #check で型を確認し、続く #eval では true、false、true、false の順に表示されます。Python の独立計算は 0 から 8 までの全 81 組の比較用の結果と Lean の実行結果を比較し、常に true の判定の反例を確認します。等しい組は 9 組、全体は 9 × 9 = 81 組なので、不一致の反例は 81 − 9 = 72 組です。[有限な例示テストと全入力一致](../LVT1-01/index.md#prop-lvt1-01-test-boundary)により、この比較だけで範囲外を含む全自然数に対する一致が証明されるわけではありません。

次のコードは別ファイルで試すと型エラーになります。false の型は Bool であり False ではありません。

```lean
example : False := false
```

## 7. 演習

### Level A

### LVT2-01-A01 型を区別する

true、False、3 = 3、True.intro の型を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

true は [Leanの真偽値型](#def-lvt2-01-bool)の構成子なので Bool。False と 3 = 3 は [Leanの命題型](#def-lvt2-01-prop)に属する主張なので Prop。True.intro は True の証明項なので True 型である。False 自体は命題であり、False の証明ではない。
<!-- solution-end -->

### LVT2-01-A02 等式の証明項

1 + 2 = 3 を rfl で証明できる理由を説明し、Lean の項を書け。

- Level: A

<!-- solution-start -->
#### 詳細解答

自然数の加算は右の引数を一つ減らすごとに結果に 1 を加える。したがって 1 + 2 は 1 + 1 に 1 を加えた値、1 + 1 は 1 + 0 に 1 を加えた値である。1 + 0 = 1 から順に 2、3 となり、右辺の 3 と定義による計算で一致する。したがって等式の反射性を表す rfl を型 1 + 2 = 3 に対して使える。

```lean
example : 1 + 2 = 3 := rfl
```
<!-- solution-end -->

### LVT2-01-A03 証明を返す関数

任意の p : Prop に対し p → p の証明項を関数で書き、その型を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Curry–Howard対応](#def-lvt2-01-curry-howard)により、p 型の入力から p 型の出力を作ればよい。入力 h : p をそのまま返すと出力も p なので、fun h : p => h の型は p → p である。

```lean
example (p : Prop) : p → p := fun h => h
```
<!-- solution-end -->

### LVT2-01-A04 不成立の判定

d = Decidable.isFalse (fun h : False => h) とする。d の型と decisionBool False d の値を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

関数は False 型の引数をそのまま返すので False → False、すなわち ¬ False の型を持つ。[Leanの決定可能性](#def-lvt2-01-decidable)により d : Decidable False。decisionBool の isFalse 枝が選ばれ、値は false となる。
<!-- solution-end -->

### Level B

### LVT2-01-B01 false から否定を得る

p : Prop、d : Decidable p とし、decisionBool p d = false と仮定する。¬ p を証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

p の証明 hp があると仮定し、False を導く。[Leanの決定可能性](#def-lvt2-01-decidable)で d が isFalse hn なら `hn : p → False` なので `hn hp : False` が得られる。isTrue h の場合、decisionBool の値は true であり、仮定は true = false となる。異なる構成子の等式は成立しないため、矛盾を得る。どちらの枝でも hp から False を導けるので ¬ p が成立する。

```lean
example (p : Prop) (d : Decidable p)
    (h : decisionBool p d = false) : ¬ p := by
  intro hp
  cases d with
  | isTrue hTrue =>
    have bad : true = false := h
    cases bad
  | isFalse hn => exact hn hp
```

intro hp は否定を p → False という関数として構成するため、入力 hp : p を受け取る操作である。
<!-- solution-end -->

### LVT2-01-B02 否定から false を得る

p : Prop、d : Decidable p、hn : ¬ p とする。decisionBool p d = false を証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[Leanの決定可能性](#def-lvt2-01-decidable)の d が isFalse の場合、decisionBool の match は `.isFalse _ => false` の枝を選ぶ。したがって目標は `false = false` に簡約され、rfl で証明できる。d が isTrue hp なら `hp : p` なので `hn hp : False` を得る。目標は `true = false` に簡約されており、False.elim によりこの目標の等式を導く。

```lean
example (p : Prop) (d : Decidable p)
    (hn : ¬ p) : decisionBool p d = false := by
  cases d with
  | isTrue hp => exact False.elim (hn hp)
  | isFalse h => rfl
```
<!-- solution-end -->

### LVT2-01-B03 常に拒否する判定器

自然数 n, k に対する仕様を n = k とする。reject n k = false をすべての入力で返す判定器の健全性と完全性を調べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

健全性の仮定 reject n k = true を展開すると false = true になり、矛盾から n = k を導ける。よって健全性は成立する。完全性について n = k = 0 を選ぶと、仕様は 0 = 0 なので成立するが、reject 0 0 = false である。必要な true が得られないので完全性は成立しない。[証明付き判定の健全性と完全性](#prop-lvt2-01-decision-bridge)のように証明付き判定を取り出すという前提が reject にはない。`!` は Bool の否定（true と false を交換する演算）であり、命題の否定 `¬` とは作用対象が異なる。`#guard` は具体的な真偽値が true か検査するので、`#guard !(reject 0 0)` は拒否されたことの検査となる。

```lean
def reject (n k : Nat) : Bool := false

example (n k : Nat) (h : reject n k = true) : n = k := by
  have bad : false = true := h
  cases bad

#guard !(reject 0 0)
```
<!-- solution-end -->

### Level C

### LVT2-01-C01 盤面番号の検査

[有効な添字](../LVT1-05/index.md#def-lvt1-05-index-range)の定義に従い、0 始まりの 9 マスの盤面に対し、自然数 n が有効な番号である仕様を n < 9 とする。判定器 valid n = decide (n < 9) と、誤って n < 8 を用いる shortValid を考える。

1. valid の健全性と完全性を証明せよ。
2. n = 0, 7, 8, 9 について両者を評価せよ。
3. shortValid の健全性と完全性を調べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) valid n = true の仮定は decide (n < 9) = true である。[証明付き判定の健全性と完全性](#prop-lvt2-01-decision-bridge)の標準版 of_decide_eq_true に p として命題 `n < 9` を渡すと、n < 9 の証明を得る。逆に n < 9 の証明を decide_eq_true に渡すと decide (n < 9) = true、すなわち valid n = true を得る。

(2) 0 と 7 は 8 より小さく、9 よりも小さいので両者 true。8 は 9 より小さいが 8 より小さくないので valid は true、shortValid は false。9 はどちらの上限よりも小さくないので両者 false。

(3) shortValid n = true を定義で展開して `decide (n < 8) = true` とする。上と同じ健全性の標準版で p を命題 `n < 8` として、その証明を得る。自然数の順序において 8 < 9 である。不等号の推移性 `Nat.lt_trans` は a < b と b < c の証明を順に受け取り a < c の証明を返すので、a = n、b = 8、c = 9 として n < 9 を得る。よって健全性は成立する。完全性は n = 8 が反例であり、仕様は真なのに判定は false となる。コード中の `by decide` は、目標 `8 < 9` に対して計算可能な判定を行い、その成立の証明を作る操作である。`&&` は二つの Bool がともに true のときだけ true を返す演算である。

```lean
def valid (n : Nat) : Bool := decide (n < 9)
def shortValid (n : Nat) : Bool := decide (n < 8)

example (n : Nat) (h : valid n = true) : n < 9 :=
  of_decide_eq_true h

example (n : Nat) (h : n < 9) : valid n = true :=
  decide_eq_true h

example (n : Nat) (h : shortValid n = true) : n < 9 :=
  Nat.lt_trans (of_decide_eq_true h : n < 8) (by decide)

#guard valid 0 && shortValid 0
#guard valid 7 && shortValid 7
#guard valid 8 && !(shortValid 8)
#guard !(valid 9) && !(shortValid 9)
```

[有限な例示テストと全入力一致](../LVT1-01/index.md#prop-lvt1-01-test-boundary)により、具体例だけでは全自然数に対する健全性を保証できない。(3) の証明では任意の n を取ったうえで不等式の推移性を使っている点が重要である。
<!-- solution-end -->

## 8. 次講への接続

今回は一つの命題について、証明を型の項として扱い、計算可能な判定と結びました。次は複数の命題を結ぶ論理結合子と、すべての入力・ある入力について主張する量化を学びます。

参考：[Theorem Proving in Lean 4 — Propositions and Proofs](https://lean-lang.org/theorem_proving_in_lean4/propositions_and_proofs.html)。
