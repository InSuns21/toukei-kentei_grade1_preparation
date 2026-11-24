# LVT3-01 要求を事前条件・事後条件へ

前講では、必要な補題を探し、Lean が受理した証明の仮定を確認しました。今度は証明する命題を決めます。「注文した数量だけ在庫を減らす」という要求には、数量が正であること、在庫が足りること、成功したときの残数、失敗したときの応答という別々の問いがあります。条件を取り違えると、誤った実装にも正しさの証明が付いてしまいます。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT3-01)。

## 1. 入力・出力と契約を分ける

在庫数 stock と要求数量 qty は自然数（0 を含む）とします。要求の数量は正とし、在庫不足は異常な入力ではなく、正常な拒否として扱います。計算結果には [Option型](../LVT1-03/index.md#def-lvt1-03-option) を用い、成功なら `some rest`（残数 rest）、拒否なら `none` とします。ここでは純粋関数の返り値だけを扱い、データベースの更新はまだ行いません。

入力型に属する値がすべて有効とは限りません。qty = 0 は自然数型に属しますが、正の注文数量という要求に反します。入力が有効かどうかを命題で表したものが事前条件、入力と結果の組に対する要求が事後条件です。たとえば 5 個ある品物を 2 個注文した場合、成功の残数が 3 でなければなりません。事後条件は実装を見て決めるのではなく、要求から独立に決めます。

<a id="def-lvt3-01-contract"></a>

<!-- formal-statement-start -->
### 定義（Leanの入出力契約）

型 α、β、関数 f : α → β、入力に関する命題 p : α → Prop、入力と出力に関する命題 q : α → β → Prop を取る。p を事前条件、q を事後条件とする。f がこの契約を満たすとは、次の命題が成立することである。

```text
∀ x : α, p x → q x (f x)
```

ここで Prop は命題の型である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-01-contract -->
**定義の確認**　α = β = Nat、p n を 0 < n、q n r を r = n + 1 とする。f n = n + 1 なら任意の n に対し f n = n + 1 は等式の反射律で成立するため、p n を仮定しても成立する。n = 2 では p 2 が真で f 2 = 3、q 2 3 は 3 = 3 で真である。一方 n = 0 では p 0 が偽なので、契約はその入力での出力値を要求しない。関数そのものは 0 に対しても値を持つ。
<!-- definition-example-end -->

[全称量化](../LVT2-02/index.md#def-lvt2-02-forall) の導入で任意の入力 x を取り、[含意の導入](../LVT2-02/index.md#def-lvt2-02-imp) で p x の証明を仮定して q x (f x) を示します。Lean での定義は次です（以降のコードは同一の [LvtContracts.lean](lab/LvtContracts.lean) にあります）。

```lean
import Lean

namespace LvtContracts
def Satisfies {α β : Type} (p : α → Prop)
    (q : α → β → Prop) (f : α → β) : Prop :=
  ∀ x, p x → q x (f x)
```

入力型、事前条件、事後条件、関数の四つを別々に指定できます。入力型に属する全値のうち、事前条件を満たすものにだけこの契約の結論が適用されることに注意してください。

## 2. 在庫引当の要求を命題へ翻訳する

入力は stock と qty を一組にした Order とします。事前条件は数量が正であることです。在庫不足を事前条件から除くと、不足時の拒否が証明の対象外になってしまいます。本講では不足時の動作も仕様化します。

成功結果には二つの条件が必要です。引当数量が在庫以下であることと、残数に引当数量を足すと元の在庫に戻ることです。後者は在庫を余分に減らしたり増やしたりしない要求を表します。拒否結果については元の在庫が数量より少ないことを要求します。

<a id="def-lvt3-01-order"></a>

<!-- formal-statement-start -->
### 定義（Leanの在庫引当仕様）

入力 o : Order は二つの自然数 stock、qty を持つ。出力は Option Nat とする。事前条件 orderPre o は 0 < o.qty である。事後条件 orderPost o result は結果によって次のように定める。

| result | 要求する命題 |
| --- | --- |
| some rest | qty ≤ stock かつ rest + qty = stock |
| none | stock < qty |

ここで stock、qty は o の各成分、rest は自然数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-01-order -->
**定義の確認**　stock = 5、qty = 2 なら 0 < 2 で有効である。some 3 について 2 ≤ 5 と 3 + 2 = 5 の両方を確認できる。some 4 は 4 + 2 = 6 で残数の条件を満たさない。none は 5 < 2 が偽なので許されない。stock = 1、qty = 2 なら 0 < 2 で有効、none は 1 < 2 が真なので許される。some 0 でさえ 2 ≤ 1 を満たさず、成功結果は許されない。qty = 0 は事前条件を満たさない。
<!-- definition-example-end -->

```lean
structure Order where
  stock : Nat
  qty : Nat
```

```lean
def orderPre (o : Order) : Prop := 0 < o.qty

def orderPost (o : Order) (result : Option Nat) : Prop :=
  match result with
  | some rest => o.qty ≤ o.stock ∧ rest + o.qty = o.stock
  | none => o.stock < o.qty
```

上の定義には実装の引き算を直接書いていません。成功の保存関係から残数を求める設計です。自然数の引き算は負になる場合に 0 に切り捨てられるので、在庫不足の検査なしに stock - qty を成功値にしてはいけません。具体的に 1 - 2 = 0 ですが、0 + 2 = 2 であり、元の在庫 1 には戻りません。

## 3. 実装が仕様を満たすことを証明する

要求を実行可能な関数へ変換します。数量が正でないなら拒否、正であって在庫以下なら引き算で残数を計算、それ以外なら不足として拒否します。

```lean
def takeStock (o : Order) : Option Nat :=
  if 0 < o.qty then
    if o.qty ≤ o.stock then some (o.stock - o.qty) else none
  else none
```

| stock | qty | takeStock の結果 | 契約の適用 |
| ---: | ---: | --- | --- |
| 5 | 2 | some 3 | 成功条件 |
| 2 | 2 | some 0 | 成功条件（等号の境界） |
| 1 | 2 | none | 拒否条件 |
| 0 | 1 | none | 拒否条件 |
| 5 | 0 | none | 対象外、別途保証 |

<a id="prop-lvt3-01-correct"></a>

<!-- formal-statement-start -->
### 命題（在庫引当関数の契約充足）

上で定義した関数 takeStock は [在庫引当仕様](#def-lvt3-01-order) を満たす。すなわち任意の o : Order に対し orderPre o なら orderPost o (takeStock o) が成立する。また任意の stock : Nat に対し takeStock ⟨stock, 0⟩ = none が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　数量が正なら外側の条件は成立する。数量が在庫以下かどうかで分け、成功側は減算で保存式を示し、拒否側は在庫不足の比較を示す。数量ゼロの主張は契約とは別に外側の条件で示す。

<!-- proof-start -->
### 証明

任意の o を取り、stock = s、qty = k とおく。事前条件から 0 < k が分かるため、takeStock の最初の比較は真である。

場合1：k ≤ s とする。このとき r = s - k が返る。自然数の差はこの条件の下では切り捨てを生じず、整数での非負の差 s - k と一致する。従って

```text
r + k = (s - k) + k = s
```

である。比較 k ≤ s は場合分けの仮定そのものである。[連言の導入](../LVT2-02/index.md#def-lvt2-02-and) で両方の証明を組にすると、orderPost o (some r) の証明が得られる。

場合2：k ≤ s が偽とする。自然数を比較すれば k ≤ s または s < k のどちらか一方であるため、s < k が成立する。関数は none を返す。事後条件の none 分岐は s < k なのでこれで閉じる。

二つの場合は全ての有効な入力を覆う。[入出力契約](#def-lvt3-01-contract) の全称命題を得た。Lean の `by_cases` は命題の真偽で証明を分ける。各枝で `simp only` により該当する if と match を簡約し、[証明自動化](../LVT2-08/index.md#def-lvt2-08-automation) の omega で上の自然数の線形算術を検査する。

```lean
theorem takeCorrect : Satisfies orderPre orderPost takeStock := by
  intro o hp
  change 0 < o.qty at hp
  by_cases h : o.qty ≤ o.stock
  · simp only [takeStock, if_pos hp, if_pos h, orderPost]
    exact ⟨h, by omega⟩
  · simp only [takeStock, if_pos hp, if_neg h, orderPost]
    omega

theorem rejectZero (stock : Nat) :
    takeStock ⟨stock, 0⟩ = none := by
  simp [takeStock]
```

数量ゼロでは 0 < 0 が偽なので、在庫の値に関係なく外側の if の else に進み、none となる。これは事前条件が偽の場合にも成立する個別の命題である。
<!-- proof-end -->

たとえば stock = qty = 2 でも 0 + 2 = 2 なので成功が許されます。ここで比較を厳密な不等式に変えると、在庫がちょうど足りる場合に拒否してしまいます。

## 4. 弱すぎる仕様を見つける

「成功時に残数が元の在庫を超えない」という条件だけでは、在庫を減らさずに成功しても、毎回拒否しても証明が通ります。条件が必要であることと、それだけで要求全体を表すことは違います。

<a id="def-lvt3-01-weak"></a>

<!-- formal-statement-start -->
### 定義（Leanの弱い在庫仕様）

入力 o : Order に対して事前条件は orderPre o とする。事後条件 weakPost o result は result = some rest のとき rest ≤ o.stock、result = none のとき True とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-01-weak -->
**定義の確認**　stock = 5、qty = 2 は有効である。some 5 は 5 ≤ 5 なので許されるが、2 個引き当てたはずなのに残数が減っていない。none は True が成立するため許される。どちらも [在庫引当仕様](#def-lvt3-01-order) には反する。
<!-- definition-example-end -->

```lean
def weakPost (o : Order) (result : Option Nat) : Prop :=
  match result with
  | some rest => rest ≤ o.stock
  | none => True

def rejectAll (_ : Order) : Option Nat := none
```

<a id="prop-lvt3-01-weak"></a>

<!-- formal-statement-start -->
### 命題（弱い在庫仕様の反例）

全入力に none を返す関数 rejectAll は orderPre と weakPost の契約を満たすが、orderPre と orderPost の契約は満たさない。
<!-- formal-statement-end -->

**証明の見取り図**　弱い事後条件は拒否に対して何も要求しない。元の事後条件では、在庫が足りる入力を一つ取れば矛盾する。

<!-- proof-start -->
### 証明

任意の o と orderPre o の証明を取る。rejectAll o = none なので weakPost o (rejectAll o) は定義展開で True になる。その証明項は True.intro であり、数量や在庫とは無関係に構成できる。

元の仕様を満たすと仮定し、o = ⟨5, 2⟩ を選ぶ。2 > 0 なので事前条件は真である。仮定した契約から orderPost o (rejectAll o) が従うが、rejectAll o = none を代入すると 5 < 2 になる。これは偽である。従って元の契約を満たすという仮定を否定できる。

```lean
theorem weakAllowsReject : Satisfies orderPre weakPost rejectAll := by
  intro o hp
  exact True.intro

theorem rejectNotCorrect : ¬ Satisfies orderPre orderPost rejectAll := by
  intro h
  have bad := h ⟨5, 2⟩ (by decide : orderPre ⟨5, 2⟩)
  change (5 : Nat) < 2 at bad
  omega
```
<!-- proof-end -->

拒否を許す条件も仕様の一部です。成功時の安全性だけを検証した結果を、適切な要求が必ず成功するという主張に置き換えてはいけません。

## 5. 充足できない仕様と空虚な保証

逆に、在庫不足でも必ず注文を成功させたい、と要求したらどうなるでしょうか。追加の仕入れをモデル化しない限り、元の在庫より大きな引当数量を引くことはできません。

<a id="def-lvt3-01-impossible"></a>

<!-- formal-statement-start -->
### 定義（Leanの成功必須仕様）

事前条件を orderPre とする。入力 o : Order と結果 result : Option Nat に対し、事後条件 mustSucceed o result は、次を満たす自然数 rest が存在するという命題である。

```text
result = some rest ∧ rest + o.qty = o.stock
```
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-01-impossible -->
**定義の確認**　o = ⟨5, 2⟩、result = some 3 では rest = 3 を選ぶと両方の条件が真になる。o = ⟨1, 2⟩ では rest が自然数であるため rest + 2 は最低でも 2 になる。1 と等しくできないので、どの result も事後条件を満たさない。どちらも数量は正で事前条件を満たしている。
<!-- definition-example-end -->

```lean
def mustSucceed (o : Order) (result : Option Nat) : Prop :=
  ∃ rest : Nat, result = some rest ∧ rest + o.qty = o.stock
```

<a id="prop-lvt3-01-impossible"></a>

<!-- formal-statement-start -->
### 命題（成功必須仕様の充足不能性）

任意の f : Order → Option Nat に対し、f は orderPre と mustSucceed の契約を満たさない。
<!-- formal-statement-end -->

**証明の見取り図**　一つの有効入力に対して、可能な出力が一つもないことを示せば、全入力を満たす実装は存在しない。

<!-- proof-start -->
### 証明

任意の f が契約を満たすと仮定する。o = ⟨1, 2⟩ は 0 < 2 を満たすので、契約を適用して mustSucceed o (f o) を得る。[存在量化の除去](../LVT2-02/index.md#def-lvt2-02-exists) で証拠となる rest と二つの条件を取り出す。そのうち保存式は rest + 2 = 1 である。rest ≥ 0 だから rest + 2 ≥ 2 となり、2 ≤ 1 が従って矛盾する。f の定義は使っていない。従ってどの関数でも不可能である。

```lean
theorem impossible (f : Order → Option Nat) :
    ¬ Satisfies orderPre mustSucceed f := by
  intro h
  obtain ⟨rest, _, hr⟩ := h ⟨1, 2⟩ (by decide : orderPre ⟨1, 2⟩)
  change rest + 2 = 1 at hr
  omega
```
<!-- proof-end -->

事前条件を「数量が正で、かつ在庫以下」と変更すれば矛盾は解消するが、不足時の応答を保証するという元の要求が消える。別の危険は事前条件を常に False にすることである。この場合、[含意の導入](../LVT2-02/index.md#def-lvt2-02-imp) で偽の仮定から任意の結論を導けるため、どんな実装でも契約を満たす。有効な入力の存在を確認し、要求の範囲を勝手に縮めないことが重要である。

## 6. 仕様から結果がどこまで決まるか

異なるアルゴリズムで作った二つの実装が同じ仕様を満たすとして、結果も同じでしょうか。一般の契約では複数の結果が許されることもあります。在庫引当仕様では、在庫が足りる場合は保存式が残数を決め、不足時は拒否以外を許しません。

<a id="prop-lvt3-01-unique"></a>

<!-- formal-statement-start -->
### 命題（在庫引当仕様の結果一意性）

f、g : Order → Option Nat がともに orderPre と orderPost の契約を満たすとする。任意の o : Order について orderPre o が成り立つなら f o = g o が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　二つの出力をそれぞれ none または some に分ける。片方だけが拒否した場合は在庫の比較が矛盾し、両方成功した場合は保存式から残数が等しい。

<!-- proof-start -->
### 証明

任意の有効入力 o を取る。stock = s、qty = k とおく。[入出力契約](#def-lvt3-01-contract) によってそれぞれの事後条件が得られる。

両方が none の場合は同じ構成子なので等しい。f o = none、g o = some b の場合は f の事後条件から s < k、g の事後条件から k ≤ s を得て矛盾する。f o = some a、g o = none の場合は逆に f から k ≤ s、g から s < k を得て矛盾する。

両方成功した場合は a、b が自然数であり、事後条件から次を得る。

```text
a + k = s
b + k = s
a + k = b + k
a = b
```

最後は自然数の加算の右消去である。整数として比較すれば両辺から同じ k を引ける。[等式の書換え](../LVT2-03/index.md#def-lvt2-03-defeq) により残数が等しいので some a = some b となる。四つの場合を尽くしたので結論を得る。

実装では `cases h1 : f o` が出力の二種類の形と等式 h1 を与える。事後条件をその等式で簡約して、必要な比較と保存式を得る。矛盾と右消去は omega で検査する。congrArg some e は等式 e : a = b から some a = some b を作る。

```lean
theorem uniqueOnValid (f g : Order → Option Nat)
    (hf : Satisfies orderPre orderPost f)
    (hg : Satisfies orderPre orderPost g)
    (o : Order) (hp : orderPre o) : f o = g o := by
  have hqf := hf o hp
  have hqg := hg o hp
  cases h1 : f o with
  | none =>
    have hn : o.stock < o.qty := by
      simpa only [h1, orderPost] using hqf
    cases h2 : g o with
    | none => rfl
    | some b =>
      have hb : o.qty ≤ o.stock ∧ b + o.qty = o.stock := by
        simpa only [h2, orderPost] using hqg
      have hh := hb.1
      omega
  | some a =>
    have ha : o.qty ≤ o.stock ∧ a + o.qty = o.stock := by
      simpa only [h1, orderPost] using hqf
    cases h2 : g o with
    | none =>
      have hn : o.stock < o.qty := by
        simpa only [h2, orderPost] using hqg
      have hh := ha.1
      omega
    | some b =>
      have hb : o.qty ≤ o.stock ∧ b + o.qty = o.stock := by
        simpa only [h2, orderPost] using hqg
      have ea := ha.2
      have eb := hb.2
      have e : a = b := by omega
      exact congrArg some e
```
<!-- proof-end -->

[在庫引当関数の契約充足](#prop-lvt3-01-correct) と組み合わせると、仕様を満たす任意の関数は有効入力で takeStock と一致する。ただしこれは純粋関数の出力についての命題であり、外部のサービスが同じ関数を実装していること、同時注文でも在庫が正しく更新されることは別の保証である。

## 7. 実験：同じ入力でも証明の要求が異なる

[実行ラボ](../browser-lab.html?chapter=LVT3-01) で Inspect を選び、計算値と定理の型を調べます。Main は具体的な境界入力を確認します。ExerciseSolutions では演習の証明を実行できます。Failure は弱い仕様の証明項を元の仕様の証明に使おうとして型不一致を起こす例です。

固定版の [lean-toolchain](lab/lean-toolchain) と [実装・証明ソース](lab/LvtContracts.lean) を使う場合は GitHub Codespaces またはローカル端末で次を実行します。Codespaces には GitHub ログインと利用枠が必要で、Lean Web は固定版と異なる環境の場合があります。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT3-01/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

| 実験 | 期待結果 |
| --- | --- |
| Inspect | some 3、some 0、none、none、none と定理の型・公理依存 |
| Main | LVT3-01 OK |
| ExerciseSolutions | 9題の命題を検査 |
| Failure | 型不一致による非ゼロ終了 |

Failure で渡した weakAllowsReject の型を確認し、求める命題との差を比較してください。正常系の `#print axioms` では、[公理依存](../LVT2-08/index.md#def-lvt2-08-axioms) を確認できます。数量を 0 にして結果を観察し、事前条件の外でも個別の保証があることを確認します。次に境界入力 ⟨2, 2⟩ を変えずに takeStock の内側の比較を厳密な不等式へ変更すると、正しさの証明と境界の具体例をどちらも修正しなければ通らなくなることを観察します。

## 8. 演習と詳細解答


### Level A


### LVT3-01-A01 成功と等号の境界

入力 ⟨5, 2⟩ と ⟨2, 2⟩ の計算結果を求め、事前条件と事後条件を確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

いずれも qty = 2 で正だから外側の条件は真である。前者は 2 ≤ 5、後者は 2 ≤ 2 なので内側も真となり、それぞれ some (5 - 2) = some 3 と some (2 - 2) = some 0 を得る。[在庫引当仕様](#def-lvt3-01-order) の成功条件は、前者で 2 ≤ 5 と 3 + 2 = 5、後者で 2 ≤ 2 と 0 + 2 = 2 であり、両方の入力で満たされる。等号を含む比較が必要である。

```lean
theorem a01 : takeStock ⟨5, 2⟩ = some 3 ∧
    takeStock ⟨2, 2⟩ = some 0 := by decide
```
<!-- solution-end -->


### LVT3-01-A02 在庫不足

入力 ⟨1, 2⟩ の計算結果を求め、拒否が仕様に適合する理由を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

0 < 2 なので有効入力である。2 ≤ 1 は偽だから内側の else に入り、none となる。[在庫引当仕様](#def-lvt3-01-order) の拒否条件は 1 < 2 であり真である。事前条件に 2 ≤ 1 を要求していないので、この拒否は契約の対象である。

```lean
theorem a02 : takeStock ⟨1, 2⟩ = none := by decide
```
<!-- solution-end -->


### LVT3-01-A03 数量ゼロ

任意の stock : Nat について takeStock ⟨stock, 0⟩ を求めよ。この結論は契約だけで保証されるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

外側の条件は 0 < 0 で偽である。従って内側の比較に進まず、stock に関係なく none となる。[契約充足命題](#prop-lvt3-01-correct) の後半を使う。事前条件 orderPre ⟨stock, 0⟩ 自体が偽なので、契約の含意だけでは出力は定まらない。

```lean
theorem a03 (stock : Nat) : takeStock ⟨stock, 0⟩ = none :=
  rejectZero stock
```
<!-- solution-end -->


### LVT3-01-A04 誤った残数

o = ⟨5, 2⟩、result = some 4 が事後条件を満たさないことを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[在庫引当仕様](#def-lvt3-01-order) の some 分岐を展開する。仮定から 2 ≤ 5 と 4 + 2 = 5 の連言を得る。[連言の除去](../LVT2-02/index.md#def-lvt2-02-and) で後半を取り出すと 6 = 5 となって矛盾する。残数が在庫以下であるだけでは不十分である。

```lean
theorem a04 : ¬ orderPost ⟨5, 2⟩ (some 4) := by
  intro h
  change (2 : Nat) ≤ 5 ∧ 4 + 2 = 5 at h
  have he := h.2
  omega
```
<!-- solution-end -->


### Level B


### LVT3-01-B01 拒否し続ける実装

rejectAll が弱い仕様に適合することと、元の仕様には適合しないことをそれぞれ証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[弱い在庫仕様の反例](#prop-lvt3-01-weak) の二方向を再構成する。任意の有効 o で rejectAll o = none、weakPost o none = True だから True.intro で閉じる。元の契約を仮定して有効な ⟨5, 2⟩ を代入すると orderPost ⟨5, 2⟩ none すなわち 5 < 2 になる。偽なので仮定は否定される。二つの結論を連言でまとめる。

```lean
theorem b01 : Satisfies orderPre weakPost rejectAll ∧
    ¬ Satisfies orderPre orderPost rejectAll :=
  ⟨weakAllowsReject, rejectNotCorrect⟩
```
<!-- solution-end -->


### LVT3-01-B02 実装を問わず矛盾する要求

任意の f : Order → Option Nat について成功必須仕様に適合するという命題を否定せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[成功必須仕様の充足不能性](#prop-lvt3-01-impossible) の証明では f の具体的なコードは不要である。有効な ⟨1, 2⟩ に契約を適用し、mustSucceed の存在量化から rest : Nat と rest + 2 = 1 を取り出す。rest ≥ 0 なので rest + 2 ≥ 2、従って 1 ≥ 2 という矛盾を得る。入力の選択が全称命題を反証する鍵である。

```lean
theorem b02 (f : Order → Option Nat) :
    ¬ Satisfies orderPre mustSucceed f := impossible f
```
<!-- solution-end -->


### LVT3-01-B03 空虚な契約

任意の f : Order → Option Nat が、事前条件を常に False、事後条件を orderPost とした契約を満たすことを示せ。何が保証されるか。

- Level: B

<!-- solution-start -->
#### 詳細解答

[入出力契約](#def-lvt3-01-contract) を展開すると、任意の o に対して False → orderPost o (f o) を示せばよい。任意の o を取り False の証明 hp を仮定する。False.elim hp は任意の命題の証明を構成できるため目標が閉じる。これは [含意の導入](../LVT2-02/index.md#def-lvt2-02-imp) による証明である。しかし事前条件を満たす入力は一つもなく、具体的な出力についての保証はない。

```lean
theorem b03 (f : Order → Option Nat) :
    Satisfies (fun _ => False) orderPost f := by
  intro o hp
  exact False.elim hp
```
<!-- solution-end -->


### LVT3-01-B04 事前条件を広げる

事前条件を常に True に変え、事後条件は orderPost のままにすると takeStock が契約を満たさないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

契約を満たすと仮定して o = ⟨5, 0⟩ を代入する。True.intro により事前条件は成立する。[契約充足命題](#prop-lvt3-01-correct) の数量ゼロの結論から takeStock o = none である。事後条件を展開すると 5 < 0 となり矛盾する。元の事後条件で none を許していたのは在庫不足の場合だけだった。数量ゼロにも拒否を許すなら、その条件を事後条件へ明記する必要がある。

```lean
theorem b04 : ¬ Satisfies (fun _ => True) orderPost takeStock := by
  intro h
  have bad := h ⟨5, 0⟩ True.intro
  rw [rejectZero 5] at bad
  change (5 : Nat) < 0 at bad
  omega
```
<!-- solution-end -->


### Level C


### LVT3-01-C01 別実装との一致

f : Order → Option Nat が orderPre と orderPost の契約を満たすとする。有効な入力 o で f o = takeStock o を示し、対象外入力でも一致するか検討せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

[契約充足命題](#prop-lvt3-01-correct) で takeStock も契約を満たす。o = ⟨s, k⟩ かつ k > 0 とする。k ≤ s のとき takeStock は some (s - k) を返す。f が none を返したとすると事後条件から s < k となり仮定に矛盾する。従って f は some a を返す。保存式 a + k = s と (s - k) + k = s を比較し、a + k = (s - k) + k、右消去から a = s - k を得る。k ≤ s が偽なら s < k であり takeStock は none となる。f が some a なら k ≤ s が従って矛盾するため、f も none である。以上は [結果一意性](#prop-lvt3-01-unique) で g = takeStock とした場合の具体的な証明である。対象外の qty = 0 では一致は従わない。例えば数量ゼロのときだけ some stock を返し、他の入力では takeStock と同じ結果を返す関数は、有効入力の全てで契約を満たすが、数量ゼロでは takeStock の none と異なる。

```lean
theorem c01 (f : Order → Option Nat)
    (hf : Satisfies orderPre orderPost f)
    (o : Order) (hp : orderPre o) : f o = takeStock o :=
  uniqueOnValid f takeStock hf takeCorrect o hp
```
<!-- solution-end -->


## 9. 次の学習へ

仕様の入力領域と成功・失敗の条件を独立に決め、実装が条件を満たすことを証明できました。次は、計算が結果を返したときの正しさと、計算が必ず終了して結果を返すことの違いを扱います。
