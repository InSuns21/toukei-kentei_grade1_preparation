# FML5 数学的定理の依存関係と公理監査

前提：[FML1](../FML1/index.md)、[FML2](../FML2/index.md)、[FML3](../FML3/index.md)、[FML4](../FML4/index.md)、[LVT2-08](../../LVT/LVT2-08/index.md)。

ここまでで有限和、代数構造、多項式、完備性を Lean の命題にしました。例えば [完備性を仮定した極限の存在](../FML4/index.md#thm-fml4-complete-limit) は、完備性がある空間についての主張です。今度は研究者から完成したという証明ファイルを受け取ったとしましょう。どの公理に依存するか、どの仮定の下で何を証明したか、という二つの問いに答えられなければ、その結果を再利用できません。

## 1. 宣言の型と値を分けて読む

環境に登録された名前付きの型・定義・定理を宣言と呼びます。宣言の型は対象や仮定、結論を表し、値は定義の右辺や証明項です。`#check` は型を、`#print` は宣言を表示します。[Leanの公理依存](../../LVT/LVT2-08/index.md#def-lvt2-08-axioms) は型と値の参照をたどって到達する公理の集合でした。これを数学的な主張の受入条件に利用します。

例えば宣言 T が補題 L を参照し、L が追加公理 A を参照していれば、T の証明に A の名前が直接書かれていなくても T は A に依存します。また型に現れる定数も対象です。例えば `axiom carrier : Type` が宣言され、`theorem carrierRefl (x : carrier) : x = x := rfl` と書くと、値は反射律でも型には carrier が現れます。

## 2. 許容する公理を先に決める

数学的証明を受け取るとき、採用する基礎理論を固定します。Lean の通常の古典数学では次の三公理を許すことが多いです。

| 公理 | 型の意味 |
| --- | --- |
| propext | 命題 P と Q の双方向の含意から命題型の等式 P = Q を得る |
| Classical.choice | 型 α の元が存在するという命題 Nonempty α から α の元を選ぶ |
| Quot.sound | 関係 r によって関連付けられた a,b の商型 Quot r への像が等しいことを得る |

Nonempty α は α の元を持つことを表す命題です。選択公理はその命題から元を取り出すもので、元を計算するアルゴリズムを指定しません。Quot は二項関係 r に沿って元を同一視する型で、Quot.mk は元をその型へ写します。たとえば自然数上で常に真となる関係を採用すれば、0 と 1 の像は等しくなります。元の自然数としての等式 0 = 1 を得るわけではありません。

<a id="def-fml5-policy"></a>

<!-- formal-statement-start -->
### 定義（数学的証明の許容公理集合）

環境の宣言 T に対し、型と値の参照から得る公理の集合を A(T) とする。受入側が許す公理名の集合 S を固定し、A(T) が S の部分集合であることを公理依存に関する受入条件とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml5-policy -->
**定義の確認**　S を propext、Classical.choice、Quot.sound の三つからなる集合とします。A(T) が propext のみなら、その唯一の元は S に属するので条件を満たします。A(T) が propext と sorryAx の二つなら、sorryAx は S に属さないので条件を満たしません。A(T) が空なら反例となる元がなく、条件を満たします。
<!-- definition-example-end -->

実際に次の宣言を用意します。

~~~lean
theorem reflNat (n : Nat) : n = n := rfl
theorem propEq (P Q : Prop) (h : P ↔ Q) : P = Q := propext h
noncomputable def pick (α : Type) (h : Nonempty α) : α :=
  Classical.choice h
theorem quotientEq :
    Quot.mk (fun _ _ : Nat => True) 0 =
      Quot.mk (fun _ _ : Nat => True) 1 := Quot.sound trivial
~~~

reflNat は自然数の任意の元に反射律を適用します。propEq は h がまさに双方向含意の証明であることから propext に渡せます。pick は h を受け取って選択公理を適用します。quotientEq では r 0 1 が True に簡約され、trivial がその証明を与えるので Quot.sound を適用できます。

`#print axioms` でそれぞれの依存が空、propext、Classical.choice、Quot.sound となることを調べましょう。古典数学を扱う本講では三公理を許しますが、構成的な証明だけを要求する課題では別の S を指定する必要があります。詳細は [Lean公式の公理解説](https://lean-lang.org/doc/reference/latest/Axioms/) を参照してください。

### 2.1 未完成の証明と追加公理

[Leanの公理依存](../../LVT/LVT2-08/index.md#def-lvt2-08-axioms) で学んだ通り、`sorry` は証明を完成させずに sorryAx を使って受理させる仕組みです。独自の `axiom` は証明を要求せずに型を持つ定数を追加します。どちらも別ファイルに隔離します。

~~~lean
axiom bad : (2 : Nat) = 3
theorem fromBad : (2 : Nat) = 3 := bad
theorem contradiction : False :=
  (by decide : (2 : Nat) ≠ 3) fromBad

theorem hole : (2 : Nat) = 3 := by sorry
theorem inherited : (2 : Nat) = 3 := hole
~~~

2 と 3 は異なる自然数です。その否定の証明は 2 = 3 を受け取ると False を返します。fromBad をそこに渡せば False が得られますが、追加公理 bad を必要とします。inherited には直接 sorry がなくても hole の参照を通じて sorryAx が現れます。

`unsafe` はカーネルの通常の安全な宣言とは別の実行用の仕組みです。例えば `unsafe def unsafeZero : Nat := 0` は実行に利用できますが、それを安全な定理の型にそのまま参照させることはできません。後述の UnsafeFailure.lean で確認します。`#eval` の表示値は数学的命題の証明項ではありません。ネイティブ評価を証明へ接続する仕組みも追加の信頼前提を必要とし得るため、本講の受入対象には使いません。

## 3. 定理の型の仮定は公理一覧とは別に読む

公理一覧が空でも、証明したい定理そのものを引数として受け取れば、短い証明が通ります。数学的な条件は定理の型に残ります。

<a id="def-fml5-claim"></a>

<!-- formal-statement-start -->
### 定義（数学的主張の条件と適用範囲）

型 X と各 x : X に対する命題 H(x), P(x) を取る。条件付き主張とは、すべての x : X に対し H(x) ならば P(x) が成立するという命題である。その適用範囲は H(x) の証明を持つ x である。条件を持たない全称主張は、すべての x : X に対する P(x) である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml5-claim -->
**定義の確認**　X を自然数、H(n) と P(n) をともに n = 0 とします。n = 0 なら仮定の証明をそのまま返せます。n = 1 では H(1) が偽なので条件付き主張から 1 = 0 は得られません。条件を持たない全称主張は n = 1 で偽です。
<!-- definition-example-end -->

Lean では次の宣言の値に公理を追加する必要がありません。

~~~lean
theorem assumedZero (n : Nat) (h : n = 0) : n = 0 := h
~~~

研究上は、例えば多項式の全入力における等式を要求されたのに、その等式自体を h として受け取っていないかを調べます。また [有限体での多項式と評価関数の差](../FML3/index.md#prop-fml3-finite-field) のように、証明された等式が形式多項式の等式なのか、有限体上の評価値の等式なのかも型から判定します。公理を許容したことと、主張が意図と一致したことは別の確認です。

## 4. 矛盾した仮定と空の範囲

[FML2 の代数構造インスタンス](../FML2/index.md#def-fml2-structure) で学んだ体には 0 と 1 が異なるという条件があります。これに 0 = 1 を同時に要求すると、そのような体は存在しません。すると本来難しいはずの等式も証明できます。

<a id="prop-fml5-field"></a>

<!-- formal-statement-start -->
### 命題（矛盾した体の仮定からの等式）

体 K と任意の x,y : K を取る。追加仮定 0 = 1 の下では x = y が導かれる。一方、体 K について 0 = 1 を満たすものは存在しない。
<!-- formal-statement-end -->

見取り図：体の条件 0 ≠ 1 と追加仮定を組み合わせれば False が得られます。等式そのものの計算は不要になります。

<!-- proof-start -->
### 証明

[体の条件](../FML2/index.md#def-fml2-structure) より零元と単位元は異なる。従って 0 = 1 の証明を h とすると、否定 0 ≠ 1 は h を入力に取って False を返す関数である。この関数に h を渡して False の証明を得る。

False には構成子がないので、その証明を仮定した場合は False.elim によって任意の命題、特に x = y の証明を構成できる。また任意の体に対して同じ矛盾が得られるので、追加仮定を満たす体は存在しない。

~~~lean
theorem fieldVacuous {K : Type*} [Field K]
    (h : (0 : K) = 1) (x y : K) : x = y :=
  (zero_ne_one h).elim
~~~
<!-- proof-end -->

例えば有理数体で x = 2, y = 3 を取れば通常の等式は成立しません。上の宣言は h を渡せる場合だけ利用できるので、有理数の 2 = 3 を無条件に証明したことにはなりません。対照的に、任意の体に対し 1 を選べば非零元の存在を証明できます。体の条件から 1 ≠ 0 であるためです。

範囲が空であることは型でも表現できます。Empty は元の構成子を持たない型です。次の命題は対象の存在と対象についての全称主張を切り分けます。

<a id="prop-fml5-empty"></a>

<!-- formal-statement-start -->
### 命題（空の定義域での全称命題）

任意の命題 P : Prop に対し、すべての e : Empty について P が成立する。また Nonempty Empty は偽である。
<!-- formal-statement-end -->

見取り図：仮定 e : Empty を消去することでどちらの証明も構成できます。しかし Empty の元を一つ作ることはできません。

<!-- proof-start -->
### 証明

全称主張を証明するには任意の e : Empty を受け取って P を返す関数を構成する。Empty は構成子を持たないので e の場合分けには枝が一つもなく、Empty.elim e で P を得る。

Nonempty Empty の証明 h があると仮定すると、h の唯一の構成子から e : Empty が取り出せる。Empty.elim e を今度は False を目標として使えば矛盾が得られる。したがって Nonempty Empty は偽である。

~~~lean
theorem emptyAll (P : Prop) (e : Empty) : P := Empty.elim e
theorem emptyNotNonempty : ¬ Nonempty Empty := by
  intro h
  exact h.elim (fun e => Empty.elim e)
~~~
<!-- proof-end -->

例えば P を False としても emptyAll は証明できますが、e を与えられないため False 自体は得られません。これを空虚な真といいます。研究定理の検査では、対象型に元があるか、条件を同時に満たす具体例を作れるかを調べます。ただし一つの具体例があっても、すべての意図した対象を覆うとは限りません。仮定の強さも別途比較します。

## 5. 実行して四種類の結果を区別する

前講と同じ固定版 Lean 4.35.0 と Mathlib を使います。[FmlAudit.lean](lab/FmlAudit.lean) に通常の宣言、[Inspect.lean](lab/Inspect.lean) に型と公理一覧の表示を用意します。[TrustDemo.lean](lab/TrustDemo.lean) は独自公理と未完成証明を含む隔離例で、通常のライブラリから import しません。[Failure.lean](lab/Failure.lean) は条件付き定理を無条件に使う誤り、[UnsafeFailure.lean](lab/UnsafeFailure.lean) は安全な宣言が unsafe な定義を参照する誤りを検査します。

~~~bash
cd "textbook/volumes/dream_thater/計算系/FML/FML5/lab"
lean --version
lake exe cache get
lake build
lake env lean Inspect.lean
lake env lean TrustDemo.lean
lake env lean Failure.lean
lake env lean UnsafeFailure.lean
~~~

最後の二つは失敗することが期待されます。各結果を次の順番で読みます。

| 確認対象 | 判断 |
| --- | --- |
| 宣言の受理 | 指定された環境・型に対する検査が通ったか |
| 公理依存 | [許容公理集合](#def-fml5-policy)の範囲内か |
| 型の一致 | 対象、量化、仮定、結論が目的と一致するか |
| 適用可能性 | その仮定を満たす対象や証拠を用意できるか |

実際の研究証明では固定した依存関係の再構築、別カーネルによる検証も重要になります。これらは次講で扱います。

## 6. 演習と詳細解答

### Level A

### FML5-A01 依存の伝播

宣言 A は公理 a を参照し、B は A のみを参照し、C は B と公理 b を参照する。他の公理依存はないとする。C の公理依存と S = {a} に対する判定を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[公理依存](../../LVT/LVT2-08/index.md#def-lvt2-08-axioms) の参照をたどると A から a へ、B から A へ進めるため A(A) = {a}、A(B) = {a} である。C からは C → B → A → a と C → b の二経路がある。従って A(C) = {a,b}。b は S に属さず、[許容公理集合](#def-fml5-policy) の条件は満たされない。
<!-- solution-end -->

### FML5-A02 標準公理を識別する

P,Q を命題とする。双方向の含意 h から P = Q を証明する場合と、型 α の Nonempty α の証明から元を一つ選ぶ場合に使う標準公理をそれぞれ答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

前者は propext h である。h : P ↔ Q は propext の引数の型と一致し、結果の型は P = Q である。後者は Classical.choice h であり、h : Nonempty α から結果の型 α の項が得られる。命題の等しさと元の選択は異なる操作である。いずれも本講の [許容公理集合](#def-fml5-policy) に属する。
<!-- solution-end -->

### FML5-A03 仮定の有無

自然数 n について (n = 5) → (n = 5) と、すべての n に対する n = 5 を比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

第一の命題は任意の n と h : n = 5 を受け取り h を返す関数で証明できる。第二の命題に n = 0 を代入すると 0 = 5 となるが、自然数の比較で偽である。[数学的主張の条件と適用範囲](#def-fml5-claim) の H(n) を n = 5 とした第一の主張では n = 0 に対する仮定を供給できない。
<!-- solution-end -->

### FML5-A04 型の参照

`axiom carrier : Type` がある。`theorem e (x : carrier) : x = x := rfl` の証明値に carrier を明示していないのに公理依存が生じる理由を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

宣言 e の型は任意の x : carrier について x = x である。従って型から carrier への参照が存在する。[公理依存](../../LVT/LVT2-08/index.md#def-lvt2-08-axioms) は値だけでなく型の参照もたどるため carrier が一覧に含まれる。
<!-- solution-end -->

### FML5-A05 unsafe と実行

unsafeZero を実行して 0 が表示されたとする。それだけで unsafeZero = 0 という安全な定理を得られるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

0 は実行結果であり等式の証明項ではない。さらに安全な宣言の型には unsafe な宣言を参照させられない。UnsafeFailure.lean ではこの等式を定理の型に書くと拒否される。安全な定義を別に用意してその値を証明することと、unsafe な実装がその定義と一致するという保証は分けて考える。
<!-- solution-end -->

### Level B

### FML5-B01 矛盾からの導出と反例

任意の自然数 n に対し n + 1 = 0 を仮定すると 2 = 3 が導けることを示せ。追加仮定を削除した場合の結論を判定せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

n は非負なので n + 1 は1以上であり 0 ではない。Lean の Nat.succ_ne_zero n は n の後者が0でないことの証明である。n + 1 は n の後者に簡約されるため、h : n + 1 = 0 をその否定に渡すと False を得る。False.elim で目標 2 = 3 の証明を構成できる。[矛盾した体の仮定からの等式](#prop-fml5-field) と同じ論理機構である。追加仮定を削除すると 2 = 3 は具体的な自然数の比較により偽である。

~~~lean
example (n : Nat) (h : n + 1 = 0) : (2 : Nat) = 3 :=
  (Nat.succ_ne_zero n h).elim
~~~
<!-- solution-end -->

### FML5-B02 空の範囲と存在

任意の e : Empty に対して e に関係なく 7 = 8 を主張する宣言と、任意の n : Nat に対して 7 = 8 を主張する宣言を比較せよ。後者を反証せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

前者は [空の定義域での全称命題](#prop-fml5-empty) で P を 7 = 8 と選べば証明できる。Empty.elim e は e を消去して目標の型の項を返す。後者の証明 h があれば、自然数型には元0があるので h 0 : 7 = 8 を得る。7 と 8 は異なるため、その否定の証明を h 0 に適用すると False を得る。従って後者は偽である。

~~~lean
example : ¬ (∀ _ : Nat, (7 : Nat) = 8) := by
  intro h
  exact (by decide : (7 : Nat) ≠ 8) (h 0)
~~~
<!-- solution-end -->

### FML5-B03 三つの条件を比較する

体 K の元 x について、(i) x = 0 を仮定して x = 0、(ii) 0 = 1 を仮定して x = 0、(iii) 非零元が存在する、という三主張を検査せよ。各仮定の具体的な実現可能性も説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

(i) は h : x = 0 をそのまま返す。任意の体で x = 0 を選べば h は反射律で得られる。ただし x = 1 では h は成立しないため無条件に全元が零とは言えない。(ii) は [矛盾した体の仮定からの等式](#prop-fml5-field) の y に0を代入すれば得られる。体では 0 ≠ 1 なので仮定を満たす例はない。(iii) は x = 1 を選ぶ。体の 0 ≠ 1 から等式の対称律により 1 ≠ 0 が従い、この元と否定の証明を組にして存在を証明できる。

~~~lean
example {K : Type*} [Field K] : ∃ x : K, x ≠ 0 :=
  ⟨1, one_ne_zero⟩
~~~
<!-- solution-end -->

### FML5-B04 間接的な未完成証明

ある研究用補題 L が sorry を含み、T は L を適用している。T のファイルには sorry がなく、ビルドは成功した。許容集合 S が標準三公理のみなら判定はどうなるか。L を完成させた後にも必要な確認を述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

T から L、L から sorryAx への参照経路がある。[公理依存](../../LVT/LVT2-08/index.md#def-lvt2-08-axioms) により sorryAx は T の依存に含まれる。sorryAx は S にないため [許容公理集合](#def-fml5-policy) の条件を満たさない。L を完成させた後も T の型と値の全依存を再検査し、別の追加公理がないことを確認する。さらに T の型が意図する数学的主張と一致しているか、仮定の実現可能性があるかを確認する。ビルドの成功だけではこれらを保証しない。
<!-- solution-end -->

### Level C

### FML5-C01 研究定理の仕様を検査する

自然数 n のすべてについて n + n = n を証明したという報告が来た。実際の宣言は次の三種類のいずれかだったとする。

~~~lean
theorem conditional (n : Nat) (h : n = 0) : n + n = n := by
  subst n
  rfl
theorem vacuous (n : Nat) (h : n + 1 = 0) : n + n = n :=
  (Nat.succ_ne_zero n h).elim
~~~

第三の宣言は、独自公理 globalClaim : ∀ n : Nat, n + n = n を受けて同じ結論を返すものとする。三種類の証明経路と公理依存の受入判定を示し、報告の無条件な主張を反証せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

conditional は仮定 n = 0 で n を0へ置換する。左辺は 0 + 0 = 0、右辺も0なので反射律で閉じる。仮定は n = 0 で実現するが n = 1 には適用できない。vacuous は n + 1 = 0 と Nat.succ_ne_zero n を組み合わせて False を得てから目標を消去する。[矛盾した体の仮定からの等式](#prop-fml5-field) と同じ仕組みであり、n + 1 はどの自然数でも正なので適用可能な n はない。

最初の二つは標準公理以外を追加していない。したがって [許容公理集合](#def-fml5-policy) の条件は満たすが、[数学的主張の条件と適用範囲](#def-fml5-claim) の条件付き主張であり、報告とは型が違う。第三の宣言は型だけなら報告と一致するものの、値は globalClaim を参照するため独自公理が依存に現れる。標準三公理だけを許すなら拒否される。

無条件の全称主張を h と仮定して n = 1 を代入すると、h 1 は 1 + 1 = 1、すなわち 2 = 1 の証明となる。自然数2と1は異なるので矛盾する。

~~~lean
example : ¬ (∀ n : Nat, n + n = n) := by
  intro h
  have bad : (2 : Nat) = 1 := h 1
  exact (by decide : (2 : Nat) ≠ 1) bad
~~~

以上より、公理一覧の合格、宣言の型の一致、仮定の適用可能性を三つとも検査する必要がある。
<!-- solution-end -->

次講ではこの検査を固定版の再構築、statement の比較、別カーネルによる再検証につなげます。
