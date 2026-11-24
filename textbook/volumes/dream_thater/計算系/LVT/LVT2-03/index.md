# LVT2-03 等式・書換え・簡約

式の計算と等式の証明を区別し、既に証明した等式を別の仕様に持ち込む方法を学びます。等式の向き、置換する対象、簡約に用いる規則を自分で選べるようにすることが目標です。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT2-03)。Lean Web では実ソースを編集して型検査を試せます。固定された環境で Lake を実行するにはラボから Codespaces を開きます（GitHub ログインと利用枠が必要）。

## 1. 等式は計算結果だけではない

前講では [Leanの全称量化の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-forall) により、任意の入力についての保証を扱いました。今回は、入力の別表現が同じ値だという証明を得たとき、既に証明した仕様をどう再利用するかを考えます。例えば入力番号に 0 を加える処理は番号を変えません。しかし、変数を含む式の等しさは、具体的な数の計算だけでは確認できないことがあります。

同じ型の二つの値を比較する命題を作ります。前提となる [Leanの命題型](../LVT2-01/index.md#def-lvt2-01-prop) の通り、等式が成立するという主張も証明を要求する型です。

<a id="def-lvt2-03-eq"></a>

<!-- formal-statement-start -->
### 定義（Leanの等式と反射律）

型 α : Type と a, b : α に対し、a = b（Eq a b）は二つの値が等しいという Prop 型の命題である。等式の帰納的な構成子 Eq.refl は任意の a : α に対して Eq.refl a : a = a を与える。反射律とは、このように各値が自分自身に等しいことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-03-eq -->
**定義の確認**　a を自然数 3 とすると、両辺は同じ Nat 型で、Eq.refl (3 : Nat) の型は (3 : Nat) = 3 です。Bool の true と Nat の 3 をこの等式の両辺にそのまま置くことはできません。
<!-- definition-example-end -->

Lean では式を評価するための定義の展開や関数の適用が型の比較にも使われます。例えば (fun n : Nat => n + 1) 2 は関数の引数に 2 を代入すると 2 + 1 になり、計算すると 3 です。このような計算規則のもとで一致する式は、別途等式の仮定を受け取る必要がありません。

<a id="def-lvt2-03-defeq"></a>

<!-- formal-statement-start -->
### 定義（Leanの定義的等しさ）

同じ型の二つの式が Lean の型検査で用いる変換規則（定義の展開や関数適用の簡約など）により同一と認められるとき、それらは定義的に等しいという。これは型検査で用いる判断であって、新たな Prop 型の命題ではない。定義的に等しい a, b の等式 a = b は反射律による証明 rfl で構成できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-03-defeq -->
**定義の確認**　(2 : Nat) + 1 は自然数の加算を計算すると 3 になるため、rfl は (2 : Nat) + 1 = 3 の証明になります。関数 (fun n : Nat => n + 1) を 2 に適用した式も、同じ計算で 3 に達します。
<!-- definition-example-end -->

```lean
example : (2 : Nat) + 1 = 3 := rfl
example : (fun n : Nat => n + 1) 2 = 3 := rfl
```

自然数の加算は第2引数を再帰的に減らすので、n + 0 は定義から n になります。一方、0 + n は n が未知の変数であると定義の計算だけでは n に達しません。この場合は Nat.zero_add n という等式の定理を使います。Nat.zero_add の帰納法による証明の組み立て方は後の構造帰納法の講義で扱います。ここでは標準ライブラリの型を #check で確認して用います。

```lean
example (n : Nat) : n + 0 = n := rfl
example (n : Nat) : 0 + n = n := Nat.zero_add n
```

「真である等式」と「定義の計算だけで一致する式」を区別できると、rfl が失敗したときに何が不足しているかを判断できます。

## 2. 等式を仕様の中で使う

二つの入力 a と b が等しいという証拠があるとします。a に対して条件 P が成立しているなら、b にも同じ条件を適用したいところです。P は入力を取って命題を返す関数（述語）です。この置換は等式の証明を取り除く規則として正当化されます。

<a id="def-lvt2-03-subst"></a>

<!-- formal-statement-start -->
### 定義（Leanの等式による置換）

型 α : Type、値 a, b : α、述語 P : α → Prop を取る。h : a = b と ha : P a が与えられるとき、Eq.subst h ha : P b を構成する操作を等式による置換という。等式の証明を反射律の場合に分解すると b は a になり、元の ha がそのまま結論の証明になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-03-subst -->
**定義の確認**　P n を n = 3 とし、a = 1 + 2、b = 3 とします。h : (1 : Nat) + 2 = 3 と ha : (1 : Nat) + 2 = 3 はともに rfl で作れます。Eq.subst に h と ha を渡すと P 3、つまり 3 = 3 の証明になります。h は入力の同一性を、ha は元の条件の成立を与えており、役割が異なります。
<!-- definition-example-end -->

```lean
example (P : Nat → Prop) (a b : Nat) (h : a = b) (ha : P a) :
    P b := Eq.subst h ha
```

この規則を使って、等式を逆向きに使う場合や二本の等式をつなぐ場合を構成します。

<a id="prop-lvt2-03-chain"></a>

<!-- formal-statement-start -->
### 命題（Leanの等式の対称律と推移律）

型 α : Type の値 a, b, c : α を取る。a = b から b = a を構成できる。また a = b と b = c から a = c を構成できる。
<!-- formal-statement-end -->

**証明の見取り図**　[Leanの等式による置換](#def-lvt2-03-subst) を使い、対称律では「入力が a と等しい」という条件を、推移律では「a が入力と等しい」という条件を移します。

<!-- proof-start -->
### 証明

対称律：h : a = b とする。述語 P x を x = a と定めると P a は a = a であり、反射律が証明を与える。h によって P a を P b へ置換すると b = a となる。

推移律：h : a = b と k : b = c を取る。述語 Q x を a = x とすると Q b は h によって成立する。k で Q b を Q c へ置換すると a = c となる。

Lean の cases h は等式の証明 h を唯一の構成子 Eq.refl の場合に分解する。その枝では b と a が同一となり、対称律の目標は a = a、推移律では k : a = c が残る。これらを rfl と k で閉じる。

```lean
theorem reverseEq {α : Type} {a b : α} (h : a = b) : b = a := by
  cases h
  rfl

theorem chainEq {α : Type} {a b c : α}
    (h : a = b) (k : b = c) : a = c := by
  cases h
  exact k
```
<!-- proof-end -->

標準ライブラリの Eq.symm と Eq.trans はそれぞれこの操作を提供します。例えば n = m と m = 5 の証明をつなぐと n = 5 が得られます。

## 3. 関数の中に等式を持ち込む

入力が等しければ、同じ関数を適用した出力も等しいはずです。例えば正規化された番号が同じなら、その番号に同じ処理を適用した結果も同じです。

<a id="prop-lvt2-03-congr"></a>

<!-- formal-statement-start -->
### 命題（Leanの関数適用に関する等式の合同性）

型 α, β : Type、値 a, b : α、関数 f : α → β を取る。h : a = b があれば f a = f b の証明を構成できる。
<!-- formal-statement-end -->

**証明の見取り図**　[Leanの等式による置換](#def-lvt2-03-subst) により、述語 P x を f a = f x と選びます。

<!-- proof-start -->
### 証明

P a は f a = f a である。[Leanの等式と反射律](#def-lvt2-03-eq) からその証明 rfl が得られる。h : a = b で P a を P b へ置換すると f a = f b となる。

コードでは h を反射律の枝に分解すると b が a になり、目標も f a = f a となるため rfl で閉じる。

```lean
theorem liftEq {α β : Type} (f : α → β) {a b : α}
    (h : a = b) : f a = f b := by
  cases h
  rfl
```
<!-- proof-end -->

標準ライブラリの congrArg f h もこの証明を構成します。例えば f n = n + 2、h : a = b であれば congrArg (fun n : Nat => n + 2) h は a + 2 = b + 2 を与えます。

逆方向は一般には成立しません。f n = 0 とすると f 1 = f 2 は 0 = 0 なので成立しますが、1 = 2 は成立しません。出力を等しくする関数が異なる入力を区別するとは限らないからです。

## 4. rw と simp：書換えを組み立てる

証明の途中で残っている命題を目標といいます。by の後で目標を変形する指示をタクティクといいます。次講で証明状態を体系的に扱うため、ここでは等式を使う指示に限って学びます。

<a id="def-lvt2-03-rw"></a>

<!-- formal-statement-start -->
### 定義（Leanの書換え操作）

h : a = b に対し、rw [h] は目標中の照合できる a を b に置換する指示である。rw [← h] は逆向きの置換を指定する。rw [h] at hp は局所仮定 hp の型を対象とする。置換後の証明義務は元の等式によって正当化される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-03-rw -->
**定義の確認**　目標 f a = f b と h : a = b に対し rw [h] を実行すると f b = f b となり、反射律で閉じます。逆に目標 f b = f a で rw [← h] を実行すると f a = f a になります。仮定 hp : P a に rw [h] at hp を適用すれば hp : P b に変わります。
<!-- definition-example-end -->

```lean
example (f : Nat → Nat) (a b : Nat) (h : a = b) : f a = f b := by
  rw [h]

example (P : Nat → Prop) (a b : Nat) (h : a = b) (hp : P a) :
    P b := by
  rw [h] at hp
  exact hp
```

同じ種類の書換えが何度も必要な式では、一つずつ箇所を探すより、使う規則を指定して式を簡約したいことがあります。例えば (0 + n) + 0 から左右の余分な 0 を除きます。

<a id="def-lvt2-03-simp"></a>

<!-- formal-statement-start -->
### 定義（Leanの簡約操作）

simp は簡約用に登録された定理と指定された規則などを使い、目標や仮定の式を簡約する指示である。simp only [r₁, …, rₖ] は使用する簡約定理を指定した集合に制限する（基本的な計算規則は働く）。簡約後に残る目標は別途証明する必要がある。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-03-simp -->
**定義の確認**　任意の n : Nat について (0 + n) + 0 = n を考えます。Nat.zero_add は 0 + n = n、Nat.add_zero は n + 0 = n を与えます。二規則を指定すると左辺は n + 0 を経て n になり、右辺と一致します。
<!-- definition-example-end -->

```lean
example (n : Nat) : (0 + n) + 0 = n := by
  simp only [Nat.zero_add, Nat.add_zero]
```

rw は選んだ等式と向きを明示するのに適し、simp only は繰り返し現れる簡約をまとめるのに適します。simp は任意の真の命題を判定する方法ではありません。どの規則を使っているか確認し、意味を変える書換えを混ぜないようにします。

## 5. 入力の正規化と仕様の保存

余分な 0 を取り除く例を、入力の表現を正規化する小さな関数として考えます。ここでは正規化とは同じ番号を表す式を整える処理を指します。仕様をそのまま保てることを証明します。

```lean
def normalize (n : Nat) : Nat := (0 + n) + 0
```

<a id="prop-lvt2-03-normalize"></a>

<!-- formal-statement-start -->
### 命題（Leanの自然数入力の正規化保存）

normalize : Nat → Nat を normalize n = (0 + n) + 0 と定義する。任意の n : Nat について normalize n = n が成立する。さらに任意の述語 P : Nat → Prop について P n から P (normalize n) を構成できる。
<!-- formal-statement-end -->

**証明の見取り図**　[Leanの簡約操作](#def-lvt2-03-simp) で余分な 0 を除き、[Leanの等式の対称律と推移律](#prop-lvt2-03-chain) と [Leanの等式による置換](#def-lvt2-03-subst) で条件を正規化後の入力へ移します。

<!-- proof-start -->
### 証明

n を任意に固定する。normalize n を展開すると (0 + n) + 0 になる。Nat.zero_add n で内側を n に置換すると n + 0、Nat.add_zero n で n となる。したがって h : normalize n = n が得られる。

P n の証明 hp を仮定する。h の向きを Eq.symm h により反転すると n = normalize n となる。この等式で P n を置換すれば P (normalize n) の証明になる。

```lean
theorem normalize_eq (n : Nat) : normalize n = n := by
  simp only [normalize, Nat.zero_add, Nat.add_zero]

theorem preserve (P : Nat → Prop) (n : Nat) (hp : P n) :
    P (normalize n) :=
  Eq.subst (Eq.symm (normalize_eq n)) hp
```
<!-- proof-end -->

例えば P n を n = 7 として、n = 7 の証明を preserve に渡せば正規化後も番号が 7 であることを得ます。この結果は任意の自然数と任意の述語について成立します。実際の外部システムがこの normalize と同じ処理をすることは、別の確認が必要です。

## 6. Lean で実行する

[固定されたLeanプロジェクト](../LVT1-02/index.md#def-lvt1-02-fixed-environment) と同じ Lean v4.35.0 で実行します。ブラウザのラボでは実ソースを選択して編集でき、Lean Web の型検査で目標やエラーを観察できます。Lean Web 側のバージョンは固定環境と異なる場合があります。固定版を使用する場合は Codespaces の端末で次を実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT2-03/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

正常系では LVT2-03 OK と表示され、Inspect.lean では Eq.refl、Eq.subst、congrArg の型、加算の定理の型と normalize 7 の評価値 7 を確認できます。最後の Failure.lean は意図的に失敗します。一つ目は任意の a と b が等しいと根拠なく rfl で証明しようとし、二つ目は a = b の証明を b = a の型へそのまま渡そうとします。後者は Eq.symm h で修正でき、前者には一般に証明が存在しません。

## 7. 演習

### Level A

### LVT2-03-A01 反射律と計算

(fun n : Nat => n + 2) 3 = 5 を rfl で証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの定義的等しさ](#def-lvt2-03-defeq) を使う。関数の引数 n を 3 に置き換えると 3 + 2 になる。自然数の計算で 3 + 2 = 5 なので左右は定義的に一致し、rfl が証明になる。

```lean
example : (fun n : Nat => n + 2) 3 = 5 := rfl
```
<!-- solution-end -->

### LVT2-03-A02 加算の向き

任意の n : Nat について n + 0 = n と 0 + n = n を証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

前者は第2引数が 0 なので加算の定義から n となる。後者は第2引数が変数なので rfl に頼らず、Nat.zero_add を n に適用する。

```lean
example (n : Nat) : n + 0 = n := rfl
example (n : Nat) : 0 + n = n := Nat.zero_add n
```
<!-- solution-end -->

### LVT2-03-A03 等式を逆向きに使う

a, b : Nat と h : a = b から b = a を得よ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの等式の対称律と推移律](#prop-lvt2-03-chain) の対称律を適用する。Eq.symm は h の両辺を交換するため、結果型は b = a となる。

```lean
example (a b : Nat) (h : a = b) : b = a := Eq.symm h
```
<!-- solution-end -->

### LVT2-03-A04 述語の置換

P : Nat → Prop、a, b : Nat、h : a = b、hb : P b から P a を得よ。

- Level: A

<!-- solution-start -->
#### 詳細解答

Eq.symm h : b = a とする。[Leanの等式による置換](#def-lvt2-03-subst) で入力 b の条件 hb を入力 a の条件へ移す。

```lean
example (P : Nat → Prop) (a b : Nat) (h : a = b) (hb : P b) :
    P a := Eq.subst (Eq.symm h) hb
```
<!-- solution-end -->

### LVT2-03-A05 書換えの対象

h : a = b、hp : P a から P b を rw で証明せよ。ただし P : Nat → Prop と a, b : Nat とする。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの書換え操作](#def-lvt2-03-rw) で目標ではなく仮定 hp を指定する。h の左辺 a を b に置き換えると hp : P b となり、残りの目標と型が一致する。

```lean
example (P : Nat → Prop) (a b : Nat) (h : a = b) (hp : P a) :
    P b := by
  rw [h] at hp
  exact hp
```
<!-- solution-end -->

### Level B

### LVT2-03-B01 等式の鎖と関数

a, b, c : Nat、f : Nat → Nat、h : a = b、k : c = b から f a = f c を証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

まず Eq.symm k : b = c を得る。[Leanの等式の対称律と推移律](#prop-lvt2-03-chain) から Eq.trans h (Eq.symm k) : a = c となる。[Leanの関数適用に関する等式の合同性](#prop-lvt2-03-congr) を f に適用すると f a = f c が得られる。

```lean
example (f : Nat → Nat) (a b c : Nat) (h : a = b) (k : c = b) :
    f a = f c := congrArg f (Eq.trans h (Eq.symm k))
```
<!-- solution-end -->

### LVT2-03-B02 二段階の簡約

任意の n : Nat について 0 + ((0 + n) + 0) = n を、使う定理を指定して証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[Leanの簡約操作](#def-lvt2-03-simp) で Nat.zero_add と Nat.add_zero を指定する。手計算では外側の 0 + を除いて (0 + n) + 0、内側を除いて n + 0、末尾の 0 を除いて n になる。どの順で簡約しても、この例では同じ n に達する。

```lean
example (n : Nat) : 0 + ((0 + n) + 0) = n := by
  simp only [Nat.zero_add, Nat.add_zero]
```
<!-- solution-end -->

### LVT2-03-B03 合同性の逆は成立するか

関数 f : Nat → Nat を f n = 0 とする。f 1 = f 2 を示し、1 = 2 は成立しないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

f の定義を両辺で展開すると 0 = 0 になり、rfl で成立する。一方 1 = 2 の証明 h が存在すれば、1 は Nat.succ 0、2 は Nat.succ 1 なので、後者を作る Nat.succ の引数が等しくなければならない。Lean が帰納型の構成子に対して生成する Nat.succ.inj に h を渡すと h0 : 0 = 1 を得る。0 は Nat.zero、1 は Nat.succ 0 で構成子が異なるため、この等式の cases h0 に成立する枝はなく False が導かれる。したがって [Leanの関数適用に関する等式の合同性](#prop-lvt2-03-congr) の逆はこの例で偽である。

```lean
example : (fun _ : Nat => 0) 1 = (fun _ : Nat => 0) 2 := rfl
example : ¬ ((1 : Nat) = 2) := by
  intro h
  have h0 : (0 : Nat) = 1 := Nat.succ.inj h
  cases h0
```
<!-- solution-end -->

### Level C

### LVT2-03-C01 正規化の仕様保存と境界

normalize を本文の関数とする。任意の f : Nat → Nat と n : Nat に対し f (normalize (normalize n)) = f n を証明せよ。さらに、任意の P : Nat → Prop に対して P (normalize (normalize n)) なら P n を導け。正規化を常に 0 を返す関数へ変えたとき、任意の P について P n を正規化後に保存できないことを例示せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

[Leanの自然数入力の正規化保存](#prop-lvt2-03-normalize) の等式をまず入力 normalize n に適用し、h₁ : normalize (normalize n) = normalize n を得る。次に n に適用し、h₂ : normalize n = n を得る。[Leanの等式の対称律と推移律](#prop-lvt2-03-chain) で Eq.trans h₁ h₂ は normalize (normalize n) = n となる。[Leanの関数適用に関する等式の合同性](#prop-lvt2-03-congr) で関数 f の両辺も等しくなる。後半は同じ等式を [Leanの等式による置換](#def-lvt2-03-subst) に渡し、元の述語を P n に移す。誤った関数 bad n = 0 では n = 1、P m = (m = 1) を選ぶと P 1 は rfl で成立するが、P (bad 1) は 0 = 1 なので成立しない。cases により異なる自然数の構成子の等式には枝がない。

```lean
example (f : Nat → Nat) (n : Nat) :
    f (normalize (normalize n)) = f n :=
  congrArg f (Eq.trans (normalize_eq (normalize n)) (normalize_eq n))
example (P : Nat → Prop) (n : Nat) (hp : P (normalize (normalize n))) :
    P n := Eq.subst (Eq.trans (normalize_eq (normalize n)) (normalize_eq n)) hp
example : (1 : Nat) = 1 := rfl
example : ¬ ((fun _ : Nat => 0) 1 = 1) := by
  intro h
  cases h
```
<!-- solution-end -->

## 8. 次講への接続

次講では目標と局所仮定を確認しながら、複数のタクティクや局所補題を組み立てます。

参考：[Theorem Proving in Lean 4 — Quantifiers and Equality](https://lean-lang.org/theorem_proving_in_lean4/quantifiers_and_equality.html)。
