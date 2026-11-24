# LVT2-01 Prop・Bool・Decidable・Curry–Howard対応

前講では[実行可能な参照モデル](../LVT1-06/index.md#def-lvt1-06-reference-model)で空きマスへの着手を判定しました。プログラムが true を返すことと、その判定が仕様に適合することは別です。今回は「判定する値」と「判定の正しさを支える証明」を型で区別し、両者を結びます。

前提：[LVT1-06](../LVT1-06/index.md)。到達点は、命題と証明の型を読み、決定手続きの二つの分岐から判定の正しさを示し、誤った判定器の反例を作ることです。

## 1. 判定する値と証明する命題

自然数 2 と 3 を比較したとき、プログラムの結果として false を受け取れます。一方、数学の主張「2 = 3」は偽の命題です。false というデータは存在しますが、偽の命題の正しい証明は作れません。この違いを Lean の型で捉えます。

<a id="def-lvt2-01-bool"></a>

<!-- formal-statement-start -->
### 定義（Leanの真偽値型）

Lean の Bool は二つの構成子 true と false を持つデータ型である。値を場合分けして計算に用いることができる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-01-bool -->
**定義の確認**　if true then 10 else 20 は 10、if false then 10 else 20 は 20 を返す。どちらも Bool の構成子であり、分岐を一つ選ぶ。false も正当なデータである。
<!-- definition-example-end -->

Lean の等式は、左右の項が等しいという主張を表します。このような主張の種類を表すのが Prop です。式 h : p は、h が型 p の項であることを表し、p が命題なら h をその証明として読みます。

<a id="def-lvt2-01-prop"></a>

<!-- formal-statement-start -->
### 定義（Leanの命題型）

Lean で p : Prop は p が命題であることを表す。h : p である項 h を p の証明項として扱う。True は構成子 True.intro を持つ命題、False は構成子を持たない命題である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-01-prop -->
**定義の確認**　p を 2 = 2 とする。左右が同じ自然数なので、等式の反射性を表す証明項 rfl を与えられる。p は Prop の項であり、rfl は p の項である。True.intro : True も証明項であるが、false : Bool は False の証明項ではない。
<!-- definition-example-end -->

```lean
#check Bool
#check true
#check (2 = 2)
#check (show 2 = 2 from rfl)
#check True.intro
```

#check は項の型を調べます。show ... from ... は、from の後の項が指定した型を持つことを確認します。rfl は左右が定義による計算で同じになる等式の証明にも使えます。例えば 1 + 1 = 2 では左辺が 2 に計算されます。

| 式 | 型 | 役割 |
| --- | --- | --- |
| true | Bool | 真を表すデータ |
| false | Bool | 偽を表すデータ |
| 2 = 2 | Prop | 等しいという命題 |
| rfl（2 = 2 の型を指定） | 2 = 2 | 等式の証明項 |
| False | Prop | 証明できれば矛盾を表す命題 |

## 2. 証明を関数として組み立てる

「p ならば q」を証明したい場合、p の証明を受け取り、そこから q の証明を作ればよいと考えます。これは既習の関数と同じ形です。p → q はこの含意を表し、p → False は p の否定を表します。Lean では後者を ¬ p と書きます。

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

False の証明があると仮定した場合は False.elim により任意の命題を導けます。これは False が構成子を持たないため、その証明が存在する場合の分岐が一つもないことに対応します。

## 3. 証明を伴う判定

自然数の等式は左右の値を計算して比較できます。任意の命題について、このような計算できる判定が最初から与えられるわけではありません。判定するには、成立時には証明、不成立時には否定の証明を返す仕組みが必要です。

<a id="def-lvt2-01-decidable"></a>

<!-- formal-statement-start -->
### 定義（Leanの決定可能性）

p : Prop に対し、Decidable p は次の二つの構成子を持つ型である。

- isTrue hp：hp : p を保持する。
- isFalse hn：hn : ¬ p を保持する。

計算可能な Decidable p の項を構成できれば、p の成立・不成立を証明付きで判定できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-01-decidable -->
**定義の確認**　p = (2 = 2) なら Decidable.isTrue rfl は Decidable p の項である。p = False なら Decidable.isFalse (fun h : False => h) が Decidable p の項である。後者の関数は False の証明を仮定してそのまま False を返すので、否定の証明の型 False → False を持つ。
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

decisionBool は証明付き判定 d から真偽値だけを取り出します。_ は枝の結果でその証明項を直接参照しないことを示します。

通常は Lean の decide を使います。decide p は型クラス（必要な型の項を自動探索する仕組み）によって Decidable p を探し、成立なら true、不成立なら false を返します。例えば自然数の等式については標準の計算可能な判定が用意されています。

```lean
#eval decide ((2 : Nat) = 2) -- true
#eval decide ((2 : Nat) = 3) -- false
#eval decisionBool (2 = 2) yesExample -- true
#eval decisionBool False noExample -- false
```

型クラスによる判定の指定を [Decidable p] と書くと、関数を呼ぶ際に Lean がその引数を探索します。任意の p : Prop だけでは計算可能な判定手続きは得られません。古典論理で命題が真か偽かを論じることと、実行できる手続きを与えることも別です。

## 4. 判定結果と仕様を結ぶ

テストで true になったときに証明を得られるでしょうか。証明を持つ判定から値を取り出した場合は、任意の入力について対応を示せます。true のとき必ず命題が成立する性質を健全性、命題が成立すると必ず true になる性質を完全性と呼びます。

<a id="prop-lvt2-01-decision-bridge"></a>

<!-- formal-statement-start -->
### 命題（証明付き判定の健全性と完全性）

任意の p : Prop と d : Decidable p に対し、decisionBool p d を、d が isTrue なら true、isFalse なら false を返す関数とする。

- decisionBool p d = true なら p が成立する。
- p が成立するなら decisionBool p d = true である。
<!-- formal-statement-end -->

**証明の見取り図**　d の二つの構成子について場合分けする。成立の枝には p の証明があり、不成立の枝には p を仮定した場合の矛盾を導く関数がある。

<!-- proof-start -->
### 証明

健全性について、h : decisionBool p d = true とする。d が isTrue hp なら hp : p をそのまま返せる。d が isFalse hn なら decisionBool の値は false である。h は false = true となる。Bool の異なる構成子は等しくないので、この枝では h から False を得て False.elim で p を導く。

完全性について、hp : p とする。d が isTrue の場合は定義により true = true なので反射性で成立する。d が isFalse hn なら hn : p → False である。hp を hn に渡すと False を得る。この矛盾から False.elim により decisionBool p d = true を導ける。二つの構成子を尽くしたので、任意の d について両方向が成立する。

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

Lean 標準の decide にも同じ二つの方向が用意されています。of_decide_eq_true は true という等式の証明から命題の証明を作り、decide_eq_true は逆方向を作ります。

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
def matches (n k : Nat) : Bool := decide (n = k)
def wrongMatches (_n _k : Nat) : Bool := true

theorem matchesSound (n k : Nat) (h : matches n k = true) :
    n = k :=
  of_decide_eq_true h

theorem matchesComplete (n k : Nat) (h : n = k) :
    matches n k = true :=
  decide_eq_true h
```

matchesSound の仮定を matches の定義で展開すると decide (n = k) = true です。standardSound の p を n = k として適用すれば n = k を得ます。matchesComplete では逆方向を適用します。

| n | k | 仕様 n = k | matches | wrongMatches |
| --- | --- | --- | --- | --- |
| 2 | 2 | 成立 | true | true |
| 2 | 3 | 不成立 | false | true |

wrongMatches については一致する入力のテストだけなら成功しますが、2 と 3 の入力で健全性が破れます。完全性だけなら、n = k が成立するとき常に true を返すので満たします。逆に常に false を返す判定器は健全性を満たしますが、n = k のときも false となり完全性を満たしません。二方向の保証が必要です。

## 6. Leanで実験する

[固定されたLeanプロジェクト](../LVT1-02/index.md#def-lvt1-02-fixed-environment)に従い、リポジトリのルートから実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT2-01/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
python3 check_matches.py
```

Lean v4.35.0 で型・証明を検査し、テスト実行の期待出力は LVT2-01 OK です。Inspect.lean の #check で型を確認し、続く #eval では true、false、true、false の順に表示されます。Python の独立計算は 0 から 8 までの全 81 組の期待値と Lean の実行結果を比較し、常に true の判定の反例を確認します。

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

左辺を自然数の加算で評価すると 3 となり、右辺の 3 と定義による計算で一致する。したがって等式の反射性を表す rfl を型 1 + 2 = 3 に対して使える。

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

p の証明 hp があると仮定し、False を導く。d が isFalse hn なら hn hp が False の証明である。isTrue h の場合、decisionBool の値は true であり、仮定は true = false となる。異なる構成子の等式は成立しないため、矛盾を得る。どちらの枝でも hp から False を導けるので ¬ p が成立する。

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

d が isFalse の場合、定義から false = false である。d が isTrue hp なら hp : p なので hn hp : False を得る。False.elim により目標の等式を導く。

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

健全性の仮定 reject n k = true を展開すると false = true になり、矛盾から n = k を導ける。よって健全性は成立する。完全性について n = k = 0 を選ぶと、仕様は 0 = 0 なので成立するが、reject 0 0 = false である。必要な true が得られないので完全性は成立しない。

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

0 始まりの 9 マスの盤面に対し、自然数 n が有効な番号である仕様を n < 9 とする。判定器 valid n = decide (n < 9) と、誤って n < 8 を用いる shortValid を考える。(1) valid の健全性と完全性を証明せよ。(2) n = 0, 7, 8, 9 について両者を評価せよ。(3) shortValid の健全性と完全性を調べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) valid n = true の仮定は decide (n < 9) = true である。標準の of_decide_eq_true により n < 9 を得る。逆に n < 9 の証明を decide_eq_true に渡すと decide (n < 9) = true、すなわち valid n = true を得る。

(2) 0 と 7 は 8 より小さく、9 よりも小さいので両者 true。8 は 9 より小さいが 8 より小さくないので valid は true、shortValid は false。9 はどちらの上限よりも小さくないので両者 false。

(3) shortValid n = true から n < 8 を得る。自然数の順序において 8 < 9 であり、不等号の推移性により n < 9 である。よって健全性は成立する。完全性は n = 8 が反例であり、仕様は真なのに判定は false となる。

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

具体例だけでは全自然数に対する健全性を保証できない。(3) の証明では任意の n を取ったうえで不等式の推移性を使っている点が重要である。
<!-- solution-end -->

## 8. 次講への接続

今回は一つの命題について、証明を型の項として扱い、計算可能な判定と結びました。次は複数の命題を結ぶ論理結合子と、すべての入力・ある入力について主張する量化を学びます。

参考：[Theorem Proving in Lean 4 — Propositions and Proofs](https://lean-lang.org/theorem_proving_in_lean4/propositions_and_proofs.html)。
