# LVT2-06 帰納的述語と証明の帰納法

前講の [Leanのリストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) では、空リストと先頭追加というデータの構成に沿って性質を証明しました。今度は「画面Aから画面Cへ移動できる」「自然数のリストが小さい順に並んでいる」という条件そのものを、証明を作る規則として表します。証明の構成を逆にたどれば、到達できた理由や、整列しているために必要な条件が分かります。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT2-06)。固定版の実行方法は第5節にあります。

## 1. 命題を作る規則

自然数で表した画面や状態を考えます。二つの状態 x,y の間を直接移動できるという命題を r x y : Prop とします。このように各入力に命題を対応させるものが述語（入力が二つなら関係）です。命題の証明がその型の項であることは [Curry–Howard対応](../LVT2-01/index.md#def-lvt2-01-curry-howard) で学びました。ここでは、ある命題の証明を作る方法を構成子として列挙します。これが帰納的述語です。直接移動の関係と、零回以上の有限回の移動で到達できる関係は区別します。

<a id="def-lvt2-06-reach"></a>

<!-- formal-statement-start -->
### 定義（到達可能性の生成規則）

r : Nat → Nat → Prop、s : Nat を固定する。ReachL r s : Nat → Prop を、base : ReachL r s s と、任意の x,y : Nat に対する step : ReachL r s x → r x y → ReachL r s y の二つの構成子で帰納的に定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-06-reach -->
**定義の確認**　r 0 1 と r 1 2 の証明を e01, e12 とする。base : ReachL r 0 0、step base e01 : ReachL r 0 1、step (step base e01) e12 : ReachL r 0 2 の順に証明を作れる。r 0 2 を仮定する必要はない。移動が一度もない場合も base に含まれる。
<!-- definition-example-end -->


```lean
inductive ReachL (r : Nat → Nat → Prop) (s : Nat) : Nat → Prop where
  | base : ReachL r s s
  | step {x y : Nat} : ReachL r s x → r x y → ReachL r s y
```

Lean では r と s は証明全体で固定するパラメータ、最後の状態 t は構成子ごとに変わる添字です。step の暗黙引数 x,y は、前の証明と辺の型から推論されます。証明は base を根とする有限な構成です。例えば t = 2 を数として分解しても移動経路は分かりません。分解する対象を h : ReachL r s t に変えます。

## 2. 到達証明についての帰納法

すべての到達状態で成立してほしい性質 P を考えます。開始時に P が成立し、一回の移動で P が保存されるなら、何回移動しても P が成立するはずです。ここで保存を証明するとは、移動前の P x と辺 r x y の証明を入力として移動後の P y を構成することです。

<a id="prop-lvt2-06-invariant"></a>

<!-- formal-statement-start -->
### 命題（到達証明の不変量原理）

r : Nat → Nat → Prop、s,t : Nat、P : Nat → Prop とする。P s が成立し、任意の x,y : Nat で P x と r x y から P y が従うと仮定する。このとき ReachL r s t が成立するなら P t が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　h の最後の構成子を調べます。base なら開始条件、step なら一つ短い到達証明から帰納仮定を得て保存条件を適用します。

<!-- proof-start -->
### 証明

h の構成について帰納法を行う。base の場合、終点 t は s であり、目標 P s は init で閉じる。step の場合、ある x,y に対し h は step hx e、hx : ReachL r s x、e : r x y である。目標は P y となる。hx に対する帰納仮定 ih : P x を得る。preserve x y の型は P x → r x y → P y なので、ih、e の順に適用して P y を得る。各構成子を覆ったので、有限な任意の到達証明で結論が成立する。Lean の @step は暗黙引数 x,y も名前で取り出す。

```lean
theorem reach_invariant {r : Nat → Nat → Prop} {s t : Nat}
    (P : Nat → Prop) (init : P s)
    (preserve : ∀ x y, P x → r x y → P y)
    (h : ReachL r s t) : P t := by
  induction h with
  | base => exact init
  | @step x y hx e ih => exact preserve x y ih e
```

<!-- proof-end -->


状態を表す自然数で帰納法をするのではありません。移動は数を小さくするとは限らず、同じ状態へ戻る辺があっても到達証明の構成の長さは有限です。cases h では最後の構成子は分かりますが、induction h のような ih は得られません。

<a id="prop-lvt2-06-trans"></a>

<!-- formal-statement-start -->
### 命題（到達可能性の推移性（Lean））

r : Nat → Nat → Prop と a,b,c : Nat に対し、ReachL r a b と ReachL r b c が成立すれば ReachL r a c が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　P x を「a から x へ到達できる」と選ぶと、b から c への証明に前半の到達証明をつなげられます。

<!-- proof-start -->
### 証明

[到達証明の不変量原理](#prop-lvt2-06-invariant) に開始点 b、終点 c、P x = ReachL r a x を代入する。初期条件 P b は hab。任意の x,y と hx : P x、e : r x y について、step hx e : ReachL r a y は P y の証明である。したがって保存条件は fun x y hx e => ReachL.step hx e で与えられる。最後に hbc を原理に渡すと P c、つまり ReachL r a c を得る。

```lean
theorem reach_trans {r : Nat → Nat → Prop} {a b c : Nat}
    (hab : ReachL r a b) (hbc : ReachL r b c) : ReachL r a c :=
  reach_invariant (ReachL r a) hab
    (fun _ _ hx e => ReachL.step hx e) hbc
```

<!-- proof-end -->


## 3. 到達できないことも証明する

具体的な辺を二本だけ持つモデルを作ります。EdgeL の構成子は 0 → 1 と 1 → 2 のみです。自然数 3 は状態として表現できますが、開始点 0 からの到達証明が存在するとは限りません。次の SmallL は状態が 0,1,2 のいずれかであるという命題です。


```lean
inductive EdgeL : Nat → Nat → Prop where
  | e01 : EdgeL 0 1
  | e12 : EdgeL 1 2

def SmallL (n : Nat) : Prop := n = 0 ∨ n = 1 ∨ n = 2
```

<a id="prop-lvt2-06-small"></a>

<!-- formal-statement-start -->
### 命題（有限辺モデルの到達範囲）

EdgeL を e01 : EdgeL 0 1、e12 : EdgeL 1 2 のみから生成する関係とする。任意の t : Nat について ReachL EdgeL 0 t なら t = 0 ∨ t = 1 ∨ t = 2 が成立する。特に ¬ ReachL EdgeL 0 3 が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　0,1,2 のどれかという性質を開始点と全辺で検査して、到達証明の帰納法で全経路に拡張します。

<!-- proof-start -->
### 証明

P = SmallL とする。P 0 は左の等式 0 = 0 から Or.inl rfl。任意の x,y と e : EdgeL x y に対し e を場合分けする。e01 なら y = 1 なので Or.inr (Or.inl rfl) : P 1、e12 なら y = 2 なので Or.inr (Or.inr rfl) : P 2。この二本以外の構成子はない。従って P x を仮定した保存条件が成立する（この例では前の状態の性質を使わなくてもよい）。[到達証明の不変量原理](#prop-lvt2-06-invariant) に開始点 0、終点 t、P、上の基底と保存条件、到達証明 h を渡すと P t を得る。仮に t = 3 へ到達するなら P 3 = (3 = 0 ∨ 3 = 1 ∨ 3 = 2)。三つの比較はいずれも偽で、具体的な決定可能命題の否定を decide で証明できる。P 3 とその否定を適用して False を得る。

```lean
theorem small_step (x y : Nat) (_ : SmallL x) (e : EdgeL x y) :
    SmallL y := by
  cases e with
  | e01 => exact Or.inr (Or.inl rfl)
  | e12 => exact Or.inr (Or.inr rfl)

theorem reach_small {t : Nat} (h : ReachL EdgeL 0 t) : SmallL t :=
  reach_invariant SmallL (Or.inl rfl) small_step h

theorem not_reach_three : ¬ ReachL EdgeL 0 3 := by
  intro h
  have h3 : SmallL 3 := reach_small h
  have hn : ¬ (3 = 0 ∨ 3 = 1 ∨ 3 = 2) := by decide
  exact hn h3
```

<!-- proof-end -->


もし EdgeL に 2 → 3 の辺を追加したら、その枝で SmallL 3 を示す必要が生じ、保存条件は成立しなくなります。元の不変量を使って変更後のモデルを証明することはできません。

## 4. リストの整列性を証明の構成で表す

自然数のリストを小さい順（等しい値は許す）に並べたいとします。空と一要素なら隣接する二要素はありません。二要素以上なら、先頭二要素の比較と、先頭を一つ除いたリストの整列性を同時に確認します。各隣接対をこのように確認する命題を SortedL とします。ここで扱う整列性は、有限リストの要素の並び方についての条件です。

<a id="def-lvt2-06-sorted"></a>

<!-- formal-statement-start -->
### 定義（整列リストの生成規則）

SortedL : List Nat → Prop を次の三構成子で帰納的に定める。nil : SortedL []、任意の a : Nat に対して single : SortedL [a]、任意の a,b : Nat と xs : List Nat に対して cons : a ≤ b → SortedL (b :: xs) → SortedL (a :: b :: xs)。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-06-sorted -->
**定義の確認**　[] は nil、[3] は single 3 で成立する。[1,2,3] では 2 ≤ 3 と single 3 から cons で SortedL [2,3]、1 ≤ 2 とその証明から cons で SortedL [1,2,3] を得る。各比較は具体的な自然数の比較として decide で証明できる。
<!-- definition-example-end -->


```lean
inductive SortedL : List Nat → Prop where
  | nil : SortedL []
  | single (a : Nat) : SortedL [a]
  | cons {a b : Nat} {xs : List Nat} :
      a ≤ b → SortedL (b :: xs) → SortedL (a :: b :: xs)
```

```lean
example : SortedL [1,2,3] :=
  SortedL.cons (by decide) (SortedL.cons (by decide) (SortedL.single 3))
```

### 4.1 証明の構成子を逆向きに読む

二要素以上のリストに対する整列証明はどの構成子から作られたのでしょうか。nil の結論は空、single の結論は一要素なので、残る cons の引数から情報を取り出せます。このような推論を逆向き推論（inversion）と呼びます。

<a id="prop-lvt2-06-pair"></a>

<!-- formal-statement-start -->
### 命題（整列証明の逆向き推論）

任意の a,b : Nat、xs : List Nat について SortedL (a :: b :: xs) が成立するなら a ≤ b ∧ SortedL (b :: xs) が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　結論のリスト形状に一致できる構成子だけを残し、構成子に渡された二つの証明を取り出します。

<!-- proof-start -->
### 証明

h : SortedL (a :: b :: xs) を cases で分解する。nil の添字 [] と single の添字 [u] は a :: b :: xs と一致できない。cons の添字 u :: v :: ys が a :: b :: xs と一致するには u = a、v = b、ys = xs が必要である（List の構成子の形と引数が対応する）。従って残る引数は hle : a ≤ b と hs : SortedL (b :: xs)。連言の構成子 ⟨hle, hs⟩ が目標を閉じる。帰納仮定は不要であり cases で十分である。

```lean
theorem sorted_pair {a b : Nat} {xs : List Nat}
    (h : SortedL (a :: b :: xs)) : a ≤ b ∧ SortedL (b :: xs) := by
  cases h with
  | cons hle hs => exact ⟨hle, hs⟩
```

<!-- proof-end -->


### 4.2 先頭を除いても整列する

<a id="prop-lvt2-06-tail"></a>

<!-- formal-statement-start -->
### 命題（整列性の末尾保存）

任意の a : Nat、xs : List Nat について SortedL (a :: xs) が成立するなら SortedL xs が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　一要素と二要素以上の証明に分けます。

<!-- proof-start -->
### 証明

h の添字は a :: xs なので nil は一致しない。single の場合 xs = [] であり、SortedL.nil が目標の証明である。cons の場合 xs = b :: ys となり、構成子の第二引数 hs : SortedL (b :: ys) がちょうど SortedL xs である。全ての可能な構成子を覆った。

```lean
theorem sorted_tail {a : Nat} {xs : List Nat}
    (h : SortedL (a :: xs)) : SortedL xs := by
  cases h with
  | single => exact SortedL.nil
  | cons _ hs => exact hs
```

<!-- proof-end -->


例えば [1,2,3] の整列証明から SortedL [2,3]、続いて SortedL [3] を得ます。一方、整列性だけでは入力要素が保存されることまでは証明できません。常に空リストを返す処理も出力の整列性だけは満たします。ソートの仕様には別の条件も必要になることを後の講義で学びます。

## 5. Leanで実験する

[実行ラボ](../browser-lab.html?chapter=LVT2-06) の Inspect で構成子、主要命題の型、具体的な到達証明と整列証明を確認してください。Main は到達可能・不能の証明と整列性を検査します。ExerciseSolutions で全8題を確認できます。Failure は ReachL EdgeL 0 0 を ReachL EdgeL 0 3 として渡すため、型の違いで拒否されます。base の終点を変えることはできません。

固定版は [lean-toolchain](lab/lean-toolchain) に指定されています。[LvtPredicates.lean](lab/LvtPredicates.lean) を変更して構成子の型を観察してください。リポジトリのルートから実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT2-06/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

最後のコマンドだけが失敗するのが期待結果です。

## 6. 演習と詳細解答

### Level A

### LVT2-06-A01 零回の移動

任意の r : Nat → Nat → Prop と s : Nat について ReachL r s s を証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

開始点自身には辺が不要である。 [到達可能性の生成規則](#def-lvt2-06-reach) の base はまさにこの型を持つ。

```lean
example (r : Nat → Nat → Prop) (s : Nat) : ReachL r s s :=
  ReachL.base
```
<!-- solution-end -->

### LVT2-06-A02 二本の辺をつなぐ

EdgeL において 0 から 2 へ到達可能であることを、構成子だけで示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[到達可能性の生成規則](#def-lvt2-06-reach) の base で ReachL EdgeL 0 0 を得る。e01 を step に渡すと ReachL EdgeL 0 1、さらに e12 を渡すと ReachL EdgeL 0 2 になる。

```lean
example : ReachL EdgeL 0 2 :=
  ReachL.step (ReachL.step ReachL.base EdgeL.e01) EdgeL.e12
```
<!-- solution-end -->

### LVT2-06-A03 重複を許す整列

SortedL [2,2,4] の証明を構成せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[整列リストの生成規則](#def-lvt2-06-sorted) により single 4 で末尾を作る。2 ≤ 4 と 2 ≤ 2 は具体的自然数の比較なので decide で証明できる。前者で cons を一回、後者でさらに一回適用する。等号を許すので重複も条件を満たす。

```lean
example : SortedL [2,2,4] :=
  SortedL.cons (by decide) (SortedL.cons (by decide) (SortedL.single 4))
```
<!-- solution-end -->

### LVT2-06-A04 整列した二要素の逆向き推論

a b : Nat、h : SortedL [a,b] から a ≤ b を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[整列証明の逆向き推論](#prop-lvt2-06-pair) に xs = [] を入れると a ≤ b ∧ SortedL [b] を得る。第一成分 .1 が目的の比較の証明である。

```lean
example (a b : Nat) (h : SortedL [a,b]) : a ≤ b :=
  (sorted_pair h).1
```
<!-- solution-end -->

### Level B

### LVT2-06-B01 到達可能性の合成

任意の関係 r と自然数 a,b,c について、a から b と b から c の到達証明を受け取り a から c の証明を作れ。reach_trans は使わず reach_invariant を使え。

- Level: B

<!-- solution-start -->
#### 詳細解答

[到達証明の不変量原理](#prop-lvt2-06-invariant) において P x = ReachL r a x と置く。開始点 b の証明は hab。任意の辺 r x y と P x があれば step hx e は P y。hbc は b から c の到達証明なので原理の結論 P c は ReachL r a c である。

```lean
example {r : Nat → Nat → Prop} {a b c : Nat}
    (hab : ReachL r a b) (hbc : ReachL r b c) : ReachL r a c :=
  reach_invariant (ReachL r a) hab
    (fun _ _ hx e => ReachL.step hx e) hbc
```
<!-- solution-end -->

### LVT2-06-B02 末尾を二回取り出す

a b : Nat、xs : List Nat と SortedL (a :: b :: xs) から SortedL xs を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[整列性の末尾保存](#prop-lvt2-06-tail) を最初に a と b :: xs に適用して SortedL (b :: xs) を得る。次に b と xs に適用して SortedL xs を得る。xs が空でも single の場合が保証されている。

```lean
example (a b : Nat) (xs : List Nat)
    (h : SortedL (a :: b :: xs)) : SortedL xs :=
  sorted_tail (sorted_tail h)
```
<!-- solution-end -->

### LVT2-06-B03 不正な順序を排除する

SortedL [4,1] が成り立たないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

仮に h : SortedL [4,1] があるとする。[整列証明の逆向き推論](#prop-lvt2-06-pair) により (sorted_pair h).1 : 4 ≤ 1 を得る。しかし具体的比較について ¬ (4 ≤ 1) が decide で証明できる。両者から False を得る。

```lean
example : ¬ SortedL [4,1] := by
  intro h
  have bad : 4 ≤ 1 := (sorted_pair h).1
  have hn : ¬ (4 ≤ 1) := by decide
  exact hn bad
```
<!-- solution-end -->

### Level C

### LVT2-06-C01 別の開始点からの到達不能性

EdgeL で 1 から 0 へ到達できないことを、P n = (n = 1 ∨ n = 2) と置いて証明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

開始点 1 では左側の等式 1 = 1 が rfl で成り立つ。辺 e01 の終点は 1 なので P 1 の左側、e12 の終点は 2 なので P 2 の右側を証明できる。これで任意の辺で P が保存される。[到達証明の不変量原理](#prop-lvt2-06-invariant) を開始点 1、終点 0、仮の到達証明 h に適用すると P 0、すなわち 0 = 1 ∨ 0 = 2 が得られる。この選言は具体的な等式の判定により否定されるため矛盾する。開始点を 0 に変えると基底が壊れることにも注意する。

```lean
example : ¬ ReachL EdgeL 1 0 := by
  intro h
  let P : Nat → Prop := fun n => n = 1 ∨ n = 2
  have init : P 1 := Or.inl rfl
  have preserve : ∀ x y, P x → EdgeL x y → P y := by
    intro x y hx e
    cases e with
    | e01 => exact Or.inl rfl
    | e12 => exact Or.inr rfl
  have h0 : P 0 := reach_invariant P init preserve h
  have hn : ¬ (0 = 1 ∨ 0 = 2) := by decide
  exact hn h0
```
<!-- solution-end -->

## 7. 次講への接続

今回は命題を構成子から生成し、証明の帰納法と逆向き推論を使いました。次は値とその性質を一つの型にまとめ、安全な入力や状態を表現する方法を学びます。

参考：[Theorem Proving in Lean 4 — Inductive Types](https://lean-lang.org/theorem_proving_in_lean4/inductive_types.html)。
