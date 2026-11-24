# LVT2-02 含意・連言・選言・全称・存在

前講では一つの命題の証明と判定を区別しました。実際の仕様では、複数の条件を結び、任意の入力に対する保証や反例の存在を述べる必要があります。本講では命題の組み立て方と、組み立てた証明を分解する方法を Lean の証明項として学びます。

前提：[LVT2-01](../LVT2-01/index.md)。本講では命題を型として読む [Leanの命題型](../LVT2-01/index.md#def-lvt2-01-prop) を用います。論理の記号を計算データと混同しないようにしましょう。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT2-02)。Lean Web で証明項を編集し、型検査と意図的な型エラーを観察できます。Lake の実行はラボから Codespaces を開いて行います（GitHub ログインと利用枠が必要）。

## 1. 五つの論理操作

前講の [Curry–Howard対応](../LVT2-01/index.md#def-lvt2-01-curry-howard) を使えば、条件付き保証を関数として組み立てられます。導入規則とは目的の型の証明を作る方法、除去規則とは既に得た証明を使う方法です。

<a id="def-lvt2-02-imp"></a>

<!-- formal-statement-start -->
### 定義（Leanの含意の導入・除去規則）

p, q : Prop に対し、p → q の証明は p の証明を受け取って q の証明を返す関数である。導入では仮定 h : p のもとで q の証明 t を作り、fun h => t とする。除去では f : p → q と hp : p を用いて f hp : q を得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-02-imp -->
**定義の確認**　p = q = True とすれば、fun h : True => h は True → True の証明であり、これを True.intro に適用すると True の証明が返る。
<!-- definition-example-end -->

着手には番号が範囲内で、かつマスが空いているという二条件を要求したいことがあります。両方の証明をひとまとめにします。

<a id="def-lvt2-02-and"></a>

<!-- formal-statement-start -->
### 定義（Leanの連言の導入・除去規則）

p, q : Prop に対し、p ∧ q は両方が成立するという命題である。hp : p と hq : q から And.intro hp hq : p ∧ q を作る。h : p ∧ q から h.left : p と h.right : q を取り出せる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-02-and -->
**定義の確認**　p = (2 = 2)、q = True とすると、And.intro rfl True.intro が連言の証明になる。left は 2 = 2 の証明、right は True の証明を返す。
<!-- definition-example-end -->

管理者または所有者であれば操作を許可する場合を考えます。どちらの理由が与えられるか分からないので、両方の枝で許可を導けるようにします。

<a id="def-lvt2-02-or"></a>

<!-- formal-statement-start -->
### 定義（Leanの選言の導入・除去規則）

p, q : Prop に対し、p ∨ q は少なくとも一方が成立するという命題である。hp : p から Or.inl hp、hq : q から Or.inr hq を作れる。h : p ∨ q、f : p → r、g : q → r（r : Prop）から Or.elim h f g : r を得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-02-or -->
**定義の確認**　p = True、q = False とすれば Or.inl True.intro : True ∨ False である。r = True とし、左枝 fun h => h、右枝 fun h => False.elim h を与えると、両枝の結果型が True なので Or.elim で True が得られる。両方が成立する場合も Or.inl または Or.inr を使える。
<!-- definition-example-end -->

有限個のテストから離れ、任意の入力について仕様を述べます。変数 x の値ごとに命題 P x を返す関数 P を述語と呼びます。量化記号の後の x はその範囲内で名前が結び付けられる（束縛される）変数です。

<a id="def-lvt2-02-forall"></a>

<!-- formal-statement-start -->
### 定義（Leanの全称量化の導入・除去規則）

α : Type と P : α → Prop に対し、∀ x : α, P x はすべての x について P x が成立するという命題である。任意の x : α について t : P x を作れば fun x => t が証明となる。h : ∀ x : α, P x と a : α から h a : P a を得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-02-forall -->
**定義の確認**　α = Nat、P n = (n = n) とすれば fun n => rfl は全称命題の証明になる。入力 7 を与えると 7 = 7 の証明が返る。特定の 7 だけを証明しても全称の導入にはならない。
<!-- definition-example-end -->

ある入力に対してバグが起きると主張するには、実際にその入力と条件の証明を示せば十分です。この条件を満たす具体的な値を証人と呼びます。

<a id="def-lvt2-02-exists"></a>

<!-- formal-statement-start -->
### 定義（Leanの存在量化の導入・除去規則）

α : Type、P : α → Prop とする。∃ x : α, P x は条件を満たす x が少なくとも一つ存在するという命題である。a : α と ha : P a から Exists.intro a ha を作る。h : ∃ x : α, P x と、任意の x : α に対し P x の証明から r を返す関数 k（r : Prop が x に依存しない）から Exists.elim h k : r を得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-02-exists -->
**定義の確認**　P n = (n = 3) と置く。a = 3 と ha = rfl によって Exists.intro 3 rfl が存在の証明になる。r = True とし、任意の n と hn : n = 3 を受け取る fun n hn => True.intro を使えば True を得る。この r は n に依存しない。
<!-- definition-example-end -->

Lean では ∧ の優先順位は ∨ より高く、p → q → r は p → (q → r) と読まれます。迷ったら括弧を付けましょう。∀ と ∃ のコンマより右は量化の範囲です。例えば ∀ n : Nat, P n → Q n は、任意の n を受け取った後に P n の証明を受け取る関数です。∃ n : Nat, P n → Q n は、ある n で含意が成立するという異なる主張です。

## 2. 条件をまとめ直す

三つの命題 p, q, r を用意します。p が必須で、q または r の一方が必要なとき、どちらの許可理由が得られても p が維持されることを示します。

<a id="prop-lvt2-02-distribute"></a>

<!-- formal-statement-start -->
### 命題（Leanの連言と選言の分配）

任意の p, q, r : Prop に対して p ∧ (q ∨ r) → (p ∧ q) ∨ (p ∧ r) の証明項を構成できる。
<!-- formal-statement-end -->

**証明の見取り図**　[Leanの連言の導入・除去規則](#def-lvt2-02-and)で共通条件 p を取り出し、[Leanの選言の導入・除去規則](#def-lvt2-02-or)で残りを二枝に分ける。

<!-- proof-start -->
### 証明

h : p ∧ (q ∨ r) を仮定する。連言の除去により h.left : p、h.right : q ∨ r を得る。選言の左枝では hq : q を仮定し And.intro h.left hq : p ∧ q を作り、Or.inl で目標の選言へ入れる。右枝では hr : r を仮定し And.intro h.left hr : p ∧ r を作り、Or.inr で同じ目標へ入れる。Or.elim に両枝の関数を渡せば目標が得られる。最後に h を束縛し、含意の証明項とする。

```lean
theorem distribute (p q r : Prop) : p ∧ (q ∨ r) → (p ∧ q) ∨ (p ∧ r) :=
  fun h => Or.elim h.right
    (fun hq => Or.inl (And.intro h.left hq))
    (fun hr => Or.inr (And.intro h.left hr))
```

<!-- proof-end -->

例えば p = (2 = 2)、q = True、r = False なら And.intro rfl (Or.inl True.intro) が前提を満たします。この証明を distribute に渡すと、p ∧ q の証明を左側に持つ選言が得られます。必須条件をどの枝でも失わないのがポイントです。

## 3. 存在から存在を導く

入力 n について二条件を満たす証人が得られたとき、同じ証人で片方の条件だけを保証できます。

<a id="prop-lvt2-02-collect"></a>

<!-- formal-statement-start -->
### 命題（Leanの存在量化と連言の射影）

任意の P, Q : Nat → Prop について (∃ n, P n ∧ Q n) → ∃ n, P n の証明項を構成できる。
<!-- formal-statement-end -->

**証明の見取り図**　[Leanの存在量化の導入・除去規則](#def-lvt2-02-exists)で証人を局所的に使い、[Leanの連言の導入・除去規則](#def-lvt2-02-and)で第一条件を取り出して新しい存在命題へ包み直す。

<!-- proof-start -->
### 証明

h : ∃ n, P n ∧ Q n と仮定する。任意の n : Nat と hn : P n ∧ Q n を受け取る枝を作る。hn.left : P n を得るので Exists.intro n hn.left : ∃ m, P m を作れる。結論の m は新たに束縛された名前で、局所的な n は結論の外に残らない。したがって Exists.elim h にこの枝を渡せる。h を束縛して目的の含意を得る。

```lean
theorem collect (P Q : Nat → Prop) :
    (∃ n, P n ∧ Q n) → ∃ n, P n :=
  fun h => Exists.elim h (fun n hn => Exists.intro n hn.left)
```

<!-- proof-end -->

例えば P n = (n = 3)、Q n = (n + 1 = 4) なら証人 3 と And.intro rfl rfl から前提を作り、collect に渡すと ∃ n, n = 3 の証明を得ます。存在証明は Prop に属するので、ここで任意の存在証明から Nat 型の実行用データを取り出す関数を作ったわけではありません。実行用の値を保持する型とは役割が違います。

## 4. 量化順序と実行

「各入力に対して別々の出力を選べる」と「すべての入力に共通の出力がある」は異なります。Bool では前者を y = x で満たせますが、後者の y は true と false の両方に等しくなければならず不可能です。演習 B03 で証明します。

[固定されたLeanプロジェクト](../LVT1-02/index.md#def-lvt1-02-fixed-environment)と同じ Lean v4.35.0 を使用します。Codespaces の端末で次を実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT2-02/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

最後のコマンドだけが意図的に失敗します。選言の証明を連言の証明として返そうとしているためです。例えば真の左条件と偽の右条件から選言は作れますが、連言には右条件の証明も必要になります。正常系では LVT2-02 OK と表示され、Inspect.lean では各証明の型を #check で確認できます。証明を #eval して真偽値を得るのではなく、型検査を使います。

## 5. 演習

### Level A

### LVT2-02-A01 含意の合成

p, q, r : Prop とし、f : p → q、g : q → r から p → r を作れ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの含意の導入・除去規則](#def-lvt2-02-imp)により hp : p を仮定する。f hp : q、次に g (f hp) : r となる。hp を束縛して関数にすれば目標型を得る。

```lean
example (p q r : Prop) (f : p → q) (g : q → r) : p → r :=
  fun hp => g (f hp)
```
<!-- solution-end -->

### LVT2-02-A02 連言から右側を取り出す

p, q : Prop とし、p ∧ q → q ∧ p を証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの連言の導入・除去規則](#def-lvt2-02-and)で h : p ∧ q から h.right : q と h.left : p を得る。この順に And.intro に渡すと q ∧ p の証明になる。

```lean
example (p q : Prop) : p ∧ q → q ∧ p :=
  fun h => And.intro h.right h.left
```
<!-- solution-end -->

### LVT2-02-A03 選言の左右を交換する

p, q : Prop とし、p ∨ q → q ∨ p を証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの選言の導入・除去規則](#def-lvt2-02-or)を使う。左枝 hp : p では新しい選言の右を選び、右枝 hq : q では新しい選言の左を選ぶ。両枝が同じ q ∨ p を返すため Or.elim を適用できる。

```lean
example (p q : Prop) : p ∨ q → q ∨ p :=
  fun h => Or.elim h (fun hp => Or.inr hp) (fun hq => Or.inl hq)
```
<!-- solution-end -->

### LVT2-02-A04 全称命題を特殊化する

P : Nat → Prop と h : ∀ n : Nat, P n が与えられる。P 5 を証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの全称量化の導入・除去規則](#def-lvt2-02-forall)により、h は自然数 n を受け取ると P n の証明を返す。5 : Nat を代入すると h 5 : P 5 となる。

```lean
example (P : Nat → Prop) (h : ∀ n : Nat, P n) : P 5 := h 5
```
<!-- solution-end -->

### LVT2-02-A05 存在の証人を選ぶ

∃ n : Nat, n + 1 = 4 を証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの存在量化の導入・除去規則](#def-lvt2-02-exists)を用いる。証人を 3 と選ぶと、残る条件は 3 + 1 = 4。自然数の計算で左辺が 4 となるので rfl を渡せる。

```lean
example : ∃ n : Nat, n + 1 = 4 := Exists.intro 3 rfl
```
<!-- solution-end -->

### Level B

### LVT2-02-B01 全称と連言を組み合わせる

P Q : Nat → Prop とする。すべての n で P n ∧ Q n が成立するなら、(∀ n, P n) ∧ (∀ n, Q n) を証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

h を前提とする。[Leanの全称量化の導入・除去規則](#def-lvt2-02-forall)で任意の n に h n を適用する。[Leanの連言の導入・除去規則](#def-lvt2-02-and)で (h n).left : P n、(h n).right : Q n を得る。各々の n を関数で束縛し、二つの全称証明を And.intro に渡す。

```lean
example (P Q : Nat → Prop) (h : ∀ n, P n ∧ Q n) :
    (∀ n, P n) ∧ (∀ n, Q n) :=
  And.intro (fun n => (h n).left) (fun n => (h n).right)
```
<!-- solution-end -->

### LVT2-02-B02 存在を反証する

P : Nat → Prop と h : ∀ n, ¬ P n が与えられる。¬ (∃ n, P n) を証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

存在証明 e を仮定して False を目標とする。[Leanの存在量化の導入・除去規則](#def-lvt2-02-exists)で任意の証人 n と hn : P n を受け取る枝を作る。[Leanの全称量化の導入・除去規則](#def-lvt2-02-forall)より h n : P n → False なので h n hn : False。除去の結果型は n に依存しない False であり、e を束縛すれば否定を得る。

```lean
example (P : Nat → Prop) (h : ∀ n, ¬ P n) : ¬ (∃ n, P n) :=
  fun e => Exists.elim e (fun n hn => h n hn)
```
<!-- solution-end -->

### LVT2-02-B03 量化の順序を反証する

Bool 上で ∀ x : Bool, ∃ y : Bool, y = x を証明せよ。∃ y : Bool, ∀ x : Bool, y = x が成立しない理由も証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

前者では任意の x を受け取り、証人 y = x を選べば rfl が条件を満たす。後者の存在証明を仮定すると [Leanの存在量化の導入・除去規則](#def-lvt2-02-exists)で y と h : ∀ x, y = x を得る。y = true の枝では h false : true = false、y = false の枝では h true : false = true。前講の Bool の異なる構成子の等式には成立する枝がないので、どちらも矛盾する。cases は前講で用いた場合分けである。

```lean
example : ∀ x : Bool, ∃ y : Bool, y = x :=
  fun x => Exists.intro x rfl

example : ¬ (∃ y : Bool, ∀ x : Bool, y = x) :=
  fun e => Exists.elim e (fun y h => by
    cases y with
    | false =>
      have bad : false = true := h true
      cases bad
    | true =>
      have bad : true = false := h false
      cases bad)
```
<!-- solution-end -->

### Level C

### LVT2-02-C01 認可仕様の合成と仮定漏れ

Valid Owner Admin Allow : Nat → Prop とする。任意の n について Valid n ∧ Owner n から Allow n を導け、Valid n ∧ Admin n からも Allow n を導けると仮定する。任意の n に対し Valid n ∧ (Owner n ∨ Admin n) → Allow n を証明せよ。さらに Valid を外すと元の仮定からは一般に導けないことを、全ての n で Valid が False、Owner が True、Admin と Allow が False となる例で示せ。

- Level: C

<!-- solution-start -->
#### 詳細解答

任意の n と h を取る。[Leanの連言の導入・除去規則](#def-lvt2-02-and)により hv : Valid n と ho : Owner n ∨ Admin n を得る。[Leanの選言の導入・除去規則](#def-lvt2-02-or)で ho を場合分けする。所有者の枝では And.intro hv hOwner、管理者の枝では And.intro hv hAdmin を作る。各枝で対応する全称仮定を n に適用し、作った連言を渡すと Allow n が得られる。両枝を束ね、n と h を関数で束縛する。反例では二つの元の仮定は、前件に False が含まれるため h.left : False を返せば成立する。だが n = 0 で Owner 0 ∨ Admin 0 は Or.inl True.intro によって成立する一方、Allow 0 は False である。よって Valid を外した含意は成立しない。

```lean
example (Valid Owner Admin Allow : Nat → Prop)
    (fo : ∀ n, Valid n ∧ Owner n → Allow n)
    (fa : ∀ n, Valid n ∧ Admin n → Allow n) :
    ∀ n, Valid n ∧ (Owner n ∨ Admin n) → Allow n :=
  fun n h => Or.elim h.right
    (fun ho => fo n (And.intro h.left ho))
    (fun ha => fa n (And.intro h.left ha))

example : ∀ _n : Nat, False ∧ True → False := fun _ h => h.left
example : ∀ _n : Nat, False ∧ False → False := fun _ h => h.left
example : ¬ (∀ _n : Nat, True ∨ False → False) :=
  fun h => h 0 (Or.inl True.intro)
```
<!-- solution-end -->

## 6. 次講への接続

論理の型と証明の組み立て方を学びました。次は等式の証明を用いて、式の一部を書き換えながら仕様を証明します。

参考：[Theorem Proving in Lean 4 — Propositions and Proofs](https://lean-lang.org/theorem_proving_in_lean4/propositions_and_proofs.html)。
