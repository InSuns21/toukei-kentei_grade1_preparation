# LVT2-08 定理探索・自動化・信頼境界

ここまでに、定義を展開し、必要な補題を用意して、証明状態の目標を一つずつ閉じる方法を学びました。実際の開発ではライブラリの補題名をすべて覚えることはできません。また、機械が証明を受理したという表示だけでは、何を仮定してどの命題を証明したのかまでは分かりません。本講では容量制約を題材に、補題を探す、証明を自動化する、依存する公理と実際の要求を調べる、という三つの作業をつなぎます。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT2-08)。

## 1. 定理名ではなく、欲しい結論から探す

自然数の使用数 used、予約枠 reserved、容量 cap があり、used ≤ reserved と reserved ≤ cap が分かっているとします。目標は used ≤ cap です。欲しい補題の形は「三つの数について、最初の二つの不等式から三つ目の不等式を得る」です。名前を知らなくても、この形から候補を探せます。

<a id="def-lvt2-08-search"></a>

<!-- formal-statement-start -->
### 定義（Leanの定理探索）

局所的に利用できる仮定の集まり Γ と目標命題 G に対し、定理探索とは、環境にある宣言から結論が G に適合する候補を探し、候補の引数と必要な仮定を Γ に照らして確認する作業である。候補の発見と、その適用による証明の完成は区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-08-search -->
**定義の確認**　Γ に h₁ : 2 ≤ 4、h₂ : 4 ≤ 5 があり、G を 2 ≤ 5 とする。候補 Nat.le_trans は a ≤ b と b ≤ c から a ≤ c を得る。a = 2、b = 4、c = 5 を代入すると結論は G に一致し、残る二条件は h₁ と h₂ で充足する。片方しかなければ候補が見つかっても適用は完了しない。
<!-- definition-example-end -->

まず固定環境で `#check Nat.le_trans` を実行し、引数の順序と型を読みます。`exact?` は現在の目標を閉じる証明を探索し、成功すれば候補を提案します。`apply?` は適用できる補題を探すためにも使えます。探索は万能ではなく、探索範囲や時間の制限もあります。提案された式を `exact` などで再実行し、必要な仮定を確認します。

```lean
import Lean

#check Nat.le_trans

example (n : Nat) : n ≤ n := by
  exact?
```

ここで n は任意の自然数です。候補が提案されたら、その型を `#check` で読み、明示的な `exact Nat.le_refl n` に置き換えても同じ目標が閉じることを確認します。検索結果の表示文言は環境により変わるため、特定の候補名が出ることではなく、その証明が目標を満たすことが重要です。

### 標準ライブラリと mathlib

このラボは Lean の固定版と標準ライブラリだけを利用します。mathlib は Lean で形式化された数学の大規模なライブラリで、別途依存を導入したプロジェクトで利用します。まず現在のプロジェクトの import と版を確認し、次の順に検索するとよいでしょう。

| 探索先 | 入力の手掛かり | 確認すること |
| --- | --- | --- |
| `#check`・補完・`exact?` | 名前、現在の証明状態 | 現在の環境に宣言が存在するか |
| [mathlib API](https://leanprover-community.github.io/mathlib4_docs/) | 名前、分野、型 | どのモジュールにあるか |
| [Loogle](https://loogle.lean-lang.org/) | 型の形や部分式 | 変数の型・仮定・結論 |
| [LeanSearch](https://leansearch.net/) | 自然言語で欲しい性質 | 提案の型と実際の適用 |

例えば Loogle で `Nat.le_trans` を調べ、a、b、c が自然数で、二つの不等式が必要であることを確認する。見つけた補題が実数用なら、そのまま自然数の目標へ適用できるとは限りません。mathlib にしかない宣言をこの固定ラボに貼っても利用できないことがあります。検索の補助資料として [Lean community の定理探索解説](https://leanprover-community.github.io/blog/posts/searching-for-theorems-in-mathlib/) を参照できます。

<a id="prop-lvt2-08-chain"></a>

<!-- formal-statement-start -->
### 命題（Leanの容量上界の補題適用）

任意の used、reserved、cap : Nat に対し、used ≤ reserved かつ reserved ≤ cap なら used ≤ cap である。
<!-- formal-statement-end -->

**証明の見取り図**　Nat.le_trans の中間値を reserved として、二つの仮定を順に渡す。

<!-- proof-start -->
### 証明

目標は used ≤ cap、仮定は h₁ : used ≤ reserved と h₂ : reserved ≤ cap である。Nat.le_trans の a、b、c をそれぞれ used、reserved、cap に特殊化すると、次の型を持つ関数が得られる。

```text
(used ≤ reserved) → (reserved ≤ cap) → (used ≤ cap)
```

[含意の除去規則](../LVT2-02/index.md#def-lvt2-02-imp) により、まず h₁ を適用すると (reserved ≤ cap) → (used ≤ cap) となる。さらに h₂ を適用すると目標の型の証明項になる。任意の三つの自然数と仮定に対する構成なので、数値例に限定されない。

```lean
theorem withinChain (used reserved cap : Nat)
    (h₁ : used ≤ reserved) (h₂ : reserved ≤ cap) :
    used ≤ cap := Nat.le_trans h₁ h₂
```
<!-- proof-end -->

2 ≤ 4、4 ≤ 5 の場合は 2 ≤ 5 を得ます。反対に h₂ を外すと used = reserved = 4、cap = 3 では 4 ≤ 4 は真でも 4 ≤ 3 は偽です。補題が要求する仮定は省けません。

## 2. 自動化に任せる範囲を決める

予約枠が一つ空いているとき、使用数を一つ増やしても容量を超えないことを証明しましょう。手動で不等式を変形することも、自然数の線形算術を扱う `omega` に証明探索を任せることもできます。

<a id="def-lvt2-08-automation"></a>

<!-- formal-statement-start -->
### 定義（Leanの証明自動化）

Leanの証明自動化とは、[証明状態](../LVT2-04/index.md#def-lvt2-04-state) の仮定と目標に対し、タクティクが補題適用・簡約・決定手続きなどを実行して証明項を構成する仕組みである。通常のタクティクが構成した証明項は、Leanの型検査を担うカーネルで検査される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-08-automation -->
**定義の確認**　仮定 h : used < cap、目標 used + 1 ≤ cap とする。omega は自然数上の整数係数による線形算術を処理する。自然数の厳密不等式 h は used + 1 ≤ cap と同値なので、この目標を閉じられる。具体値 used = 2、cap = 3 なら h は 2 < 3 であり、結論は 3 ≤ 3。証明項が目標の型を持つことまで検査される。
<!-- definition-example-end -->

| タクティク | この講での用途 | 適用の注意 |
| --- | --- | --- |
| `simp` | 既知の等式や定義の簡約 | 任意の算術命題が解けるわけではない |
| `decide` | 具体的な決定可能命題の証明 | 判定結果まで簡約できる必要がある |
| `omega` | Nat・Int の線形算術 | 一般の変数同士の積などは対象外 |
| `exact?` | 現在の目標を閉じる補題探索 | 候補が存在しても探索が成功するとは限らない |

`simp` の意味は [簡約操作](../LVT2-03/index.md#def-lvt2-03-simp)、`decide` の根拠は [Leanの決定可能性](../LVT2-01/index.md#def-lvt2-01-decidable) にあります。例えば `by decide` で 3 ≤ 5 を示せることと、未知の n に対して n ≤ n + 1 を証明できることは別です。後者では n がまだ与えられていないため、具体値の判定をそのまま使わず、一般的な補題や線形算術を利用します。

<a id="prop-lvt2-08-next"></a>

<!-- formal-statement-start -->
### 命題（Leanの一枠予約の算術保証）

任意の used、cap : Nat について、used < cap なら used + 1 ≤ cap である。また任意の cap : Nat について、cap + 1 ≤ cap は成立しない。
<!-- formal-statement-end -->

**証明の見取り図**　自然数には隣り合う整数の間に別の自然数がないので、厳密不等式を1増加した非厳密不等式へ置き換えられる。満杯時はその条件が破れる。

<!-- proof-start -->
### 証明

自然数の比較において used < cap は Nat.succ used ≤ cap と同値であり、Nat.succ used = used + 1 である。従って h から used + 1 ≤ cap を得る。別の主張では cap + 1 ≤ cap と仮定すると、両辺から cap を整数として引いた不等式 1 ≤ 0 を得る。自然数の整数への埋込みは順序と加算を保つため、この移項は矛盾を与える。自然数の切り捨て減算を機械的に使ったわけではない。

```lean
theorem nextWithin (used cap : Nat) (h : used < cap) :
    used + 1 ≤ cap := by
  omega

theorem noRoom (cap : Nat) : ¬ (cap + 1 ≤ cap) := by
  omega
```

前者は h を仮定に持つ線形不等式、後者は否定を示すために反対の不等式を仮定すると矛盾する線形算術問題である。どちらも任意の自然数を扱い、列挙で証明しているのではない。
<!-- proof-end -->

| used | cap | 条件 used < cap | 増加後の比較 |
| ---: | ---: | --- | --- |
| 0 | 1 | 真 | 1 ≤ 1 |
| 2 | 3 | 真 | 3 ≤ 3 |
| 3 | 3 | 偽 | 4 ≤ 3 は偽 |
| 0 | 0 | 偽 | 1 ≤ 0 は偽 |

これは [容量制約付き状態](../LVT2-07/index.md#def-lvt2-07-used) についての数値条件を扱う結果です。実際の予約が成功するか、返す値が何かは、操作の定義と [予約操作の二分岐](../LVT2-07/index.md#prop-lvt2-07-reserve) のような別の証明が必要です。

## 3. 受理された証明の前提を調べる

Leanの宣言には、証明を構成して検査する theorem と、証明を要求せず命題を前提として追加する axiom があります。証明を途中で埋める `sorry` も、未解決の目標を一時的に受理させる機能です。仮定の追加が必要な数学理論もありますが、根拠なく偽の命題を追加すると、その後の論証が意味を失います。

<a id="def-lvt2-08-axioms"></a>

<!-- formal-statement-start -->
### 定義（Leanの公理依存）

Leanの宣言 D の公理依存とは、D の型または値から参照される宣言をたどり、直接または間接に利用される公理の集合である。`#print axioms D` によってこの依存を調べられる。未完成の証明を受理する `sorry` は `sorryAx` への依存を生じさせる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-08-axioms -->
**定義の確認**　claimedFits という追加公理があり、それを用いて宣言 bogusViaAxiom を作ると、後者の証明本体に axiom という単語がなくても claimedFits が依存に含まれる。さらに別の宣言が bogusViaAxiom を利用すれば、その依存にも claimedFits が含まれる。通常の反射律だけによる証明にはこの追加公理は不要である。
<!-- definition-example-end -->

次は**悪い証明を受理させる隔離実験**です。通常のライブラリや正当性証明には取り込まないでください。

```lean
namespace LvtUntrustedDemo
axiom claimedFits : (3 : Nat) ≤ 2

theorem bogusViaAxiom : False :=
  (by decide : ¬ ((3 : Nat) ≤ 2)) claimedFits

theorem bogusViaSorry : (3 : Nat) ≤ 2 := by
  sorry

theorem inheritedHole : False :=
  (by decide : ¬ ((3 : Nat) ≤ 2)) bogusViaSorry

#print axioms bogusViaAxiom
#print axioms inheritedHole
end LvtUntrustedDemo
```

自然数3は2より大きいので、3 ≤ 2 の否定には具体的な判定で証明を構成できます。しかし同時に 3 ≤ 2 を追加公理または未完成の証明から得てしまうと、否定の証明にその証明項を渡して False を得ます。Lean の否定 ¬ P は P → False という関数型であるためです。上の二つの宣言の依存は、それぞれ claimedFits と sorryAx を含みます。後者は直接 sorry を書いていない inheritedHole にも伝わります。

通常の Lean では命題の外延性 `propext`、古典的選択 `Classical.choice`、商型に関する `Quot.sound` などを用いる証明があります。ここでは各公理の構成理論へは立ち入らず、採用する理論の前提として認めるかを区別します。公理の一覧が空でなければすべて不正という意味ではありません。逆に一覧が空でも、要求と命題が異なれば製品の正当性は保証されません。詳細は [公式の公理依存解説](https://lean-lang.org/doc/reference/latest/Axioms) と [証明の検証](https://lean-lang.org/doc/reference/latest/ValidatingProofs/) を参照してください。

## 4. 信頼境界：外部の答えを命題と混同しない

外部のプログラムが「容量内である」と応答した場合、何をもってその答えを信じればよいのでしょうか。真偽値を受け取るだけなら、誤った判定器でも true を返せます。判定値と命題の関係そのものを証明する必要があります。

<a id="def-lvt2-08-trust"></a>

<!-- formal-statement-start -->
### 定義（Leanの信頼境界）

形式証明を利用する際の信頼境界とは、何を検査済みの証拠から導くか、何を検査対象外の前提として受け入れるかの区別である。本講では、カーネルが検査する命題とその公理依存、実行時の評価・外部の判定値、および現実の要求と形式化した仕様の対応を分けて扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt2-08-trust -->
**定義の確認**　容量2、使用数3について、外部プログラムが true を出したとする。true は Bool の値であり、3 ≤ 2 の証明項ではない。実際に 3 ≤ 2 は偽である。一方、カーネルが ¬ (3 ≤ 2) の証明を検査できる。さらに実際の使用数が3かどうかは入力の取得方法にも依存する。この三者がそれぞれ異なる証拠と前提を必要とする。
<!-- definition-example-end -->

次の関数は誤った外部判定器の最小モデルです。入力に関係なく true を返します。

```lean
def alwaysAccept (_used _cap : Nat) : Bool := true
```

<a id="prop-lvt2-08-external"></a>

<!-- formal-statement-start -->
### 命題（Leanの外部判定値の非健全性の反例）

alwaysAccept を任意の自然数の組に対して true を返す関数とする。すべての used、cap : Nat について alwaysAccept used cap = true なら used ≤ cap である、という命題は偽である。
<!-- formal-statement-end -->

**証明の見取り図**　使用数3、容量2を代入する。判定値は真だが容量条件は偽なので、全入力での含意に対する反例になる。

<!-- proof-start -->
### 証明

全称命題の証明 h があると仮定する。[全称量化の除去規則](../LVT2-02/index.md#def-lvt2-02-forall) に従って used = 3、cap = 2 を代入すると、h 3 2 は alwaysAccept 3 2 = true → 3 ≤ 2 の証明となる。alwaysAccept 3 2 は定義により true に簡約されるので、前件は rfl で構成できる。その証明を渡すと bad : 3 ≤ 2 を得る。しかし ¬ (3 ≤ 2) は具体的な自然数の比較を decide で証明できる。これを bad に適用すると False となる。よって元の全称命題は否定される。

```lean
theorem externalNotSound :
    ¬ (∀ used cap : Nat, alwaysAccept used cap = true → used ≤ cap) := by
  intro h
  have bad : 3 ≤ 2 := h 3 2 rfl
  exact (by decide : ¬ ((3 : Nat) ≤ 2)) bad
```
<!-- proof-end -->

正しい判定器なら、[証明付き判定の健全性と完全性](../LVT2-01/index.md#prop-lvt2-01-decision-bridge) のように判定値が真であることと命題の成立を対応付けます。外部から補題候補や証明コードが来た場合も、そのコードを再検査します。AIによる提案、テストの成功、`#eval` の出力は、それだけで任意入力に関する命題の証明にはなりません。`native_decide` のようにネイティブ実行結果を証明に接続する仕組みには、通常のカーネル簡約とは異なる信頼前提があるため、ここでは使用しません。

## 5. 実行して証拠を比較する

[実行ラボ](../browser-lab.html?chapter=LVT2-08) では Inspect で型・探索結果・通常の証明の公理依存を、Main で具体的な比較と判定器の反例を確認します。TrustDemo には意図的に追加公理と sorry があり、表示上は受理されても依存に問題が見つかります。Failure は、異なる型の証明を渡そうとするため拒否されます。

固定版の [lean-toolchain](lab/lean-toolchain) と [LvtAutomation.lean](lab/LvtAutomation.lean) で再現できます。通常系と TrustDemo は分けて実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT2-08/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean TrustDemo.lean
lake env lean Failure.lean
```

期待結果は以下の通りです。

| 実験 | 期待結果 |
| --- | --- |
| Main | LVT2-08 OK |
| Inspect | 補題の型と探索結果、true、false、通常証明の公理依存 |
| ExerciseSolutions | 全9題の証明または具体例の検査 |
| TrustDemo | sorry の警告、claimedFits と sorryAx の依存 |
| Failure | 型不一致による非ゼロ終了 |

Inspect と ExerciseSolutions の証明が、意図的な公理や sorryAx を利用していないことを確認してください。TrustDemo が受理されたことを、正しい証明が完成したと解釈してはいけません。

## 6. 演習と詳細解答

### Level A

### LVT2-08-A01 補題の型を読む

自然数 a、b、c と h₁ : a ≤ b、h₂ : b ≤ c がある。Nat.le_trans の引数と結論を説明し、a ≤ c を証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[容量上界の補題適用](#prop-lvt2-08-chain) の used、reserved、cap を順に a、b、c とする。Nat.le_trans をこの三値に特殊化すると (a ≤ b) → (b ≤ c) → (a ≤ c) となる。最初の仮定 h₁ を渡した関数は残りの b ≤ c を要求する。h₂ を渡して結論を得る。

```lean
example (a b c : Nat) (h₁ : a ≤ b) (h₂ : b ≤ c) :
    a ≤ c := Nat.le_trans h₁ h₂
```
<!-- solution-end -->

### LVT2-08-A02 探索結果を明示的な証明へ

任意の自然数 n に対する n ≤ n の証明を exact? で探し、Nat.le_refl の型を確認して明示的な証明に書き換えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[定理探索](#def-lvt2-08-search) では目標 n ≤ n に適合する結論を探す。Nat.le_refl は任意の自然数 n に対して n ≤ n を返すので、n を引数として渡すだけで目標の型の証明項が得られる。exact? が別の候補を提示しても、その型が同じ目標を証明していればよい。

```lean
example (n : Nat) : n ≤ n := by exact?
#check Nat.le_refl
example (n : Nat) : n ≤ n := Nat.le_refl n
```
<!-- solution-end -->

### LVT2-08-A03 具体的な判定

5 ≤ 7 と ¬ (8 ≤ 7) を decide で証明せよ。何が計算されるか説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[決定可能性](../LVT2-01/index.md#def-lvt2-01-decidable) により自然数の比較は判定できる。5 ≤ 7 は 7 = 5 + 2 なので真、8 ≤ 7 は 8 = 7 + 1 なので偽であり、否定は真となる。いずれも全引数が具体的なので判定を簡約して証明を得られる。

```lean
example : (5 : Nat) ≤ 7 := by decide
example : ¬ ((8 : Nat) ≤ 7) := by decide
```
<!-- solution-end -->

### LVT2-08-A04 自動化の使い分け

任意の自然数 n に対する n + 0 = n を simp、n ≤ n + 1 を omega で証明し、それぞれの根拠を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[簡約操作](../LVT2-03/index.md#def-lvt2-03-simp) は加算の右零元の性質を適用して左辺 n + 0 を n にする。残りは n = n で反射律で閉じる。第二問は n + 1 が n より1大きい自然数であり、差は非負である。omega が扱う線形算術の範囲なので証明できる。

```lean
example (n : Nat) : n + 0 = n := by simp
example (n : Nat) : n ≤ n + 1 := by omega
```
<!-- solution-end -->

### Level B

### LVT2-08-B01 二枠予約

任意の used、cap : Nat について used + 2 ≤ cap を仮定すると used + 1 ≤ cap であることを示せ。逆は成立するか。

- Level: B

<!-- solution-start -->
#### 詳細解答

used + 2 は used + 1 より1大きいので used + 1 ≤ used + 2 が成立する。[容量上界の補題適用](#prop-lvt2-08-chain) により中間値を used + 2、最終値を cap として、仮定 used + 2 ≤ cap と合成する。omega でも同じ線形不等式を処理できる。逆は used = 2、cap = 3 で 2 + 1 = 3 ≤ 3 だが 2 + 2 = 4 ≤ 3 は偽なので成立しない。

```lean
example (used cap : Nat) (h : used + 2 ≤ cap) :
    used + 1 ≤ cap := by
  have h₁ : used + 1 ≤ used + 2 := by omega
  exact Nat.le_trans h₁ h
example : (2 : Nat) + 1 ≤ 3 := by decide
example : ¬ ((2 : Nat) + 2 ≤ 3) := by decide
```
<!-- solution-end -->

### LVT2-08-B02 欠けた仮定

「任意の a、b、c : Nat について a ≤ b なら a ≤ c」という主張を反証せよ。探索した補題で証明できない理由も述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

a = b = 2、c = 1 とする。前件は 2 ≤ 2 なので反射律で証明できる。主張が真と仮定して三値と前件の証明を渡すと 2 ≤ 1 を得るが、その否定は具体的な比較から証明でき、矛盾する。Nat.le_trans に必要な b ≤ c、ここでは 2 ≤ 1 を作れないため、検索が補題を発見しても目標を閉じられない。

```lean
example : ¬ (∀ a b c : Nat, a ≤ b → a ≤ c) := by
  intro h
  have bad : 2 ≤ 1 := h 2 2 1 (by decide)
  exact (by decide : ¬ ((2 : Nat) ≤ 1)) bad
```
<!-- solution-end -->

### LVT2-08-B03 間接的な公理依存

TrustDemo の inheritedHole の本体には sorry が書かれていない。なぜ #print axioms inheritedHole で sorryAx が現れるか。また bogusViaAxiom に現れる独自公理は何か。

- Level: B

<!-- solution-start -->
#### 詳細解答

[公理依存](#def-lvt2-08-axioms) は直接の参照だけではなく参照先の依存も追う。inheritedHole の本体は「3 ≤ 2 の否定」と bogusViaSorry を適用して False を返す。bogusViaSorry の証明が sorry なので sorryAx を参照する。従って inheritedHole → bogusViaSorry → sorryAx という経路がある。bogusViaAxiom の本体は否定を claimedFits に適用するので、claimedFits が独自公理として現れる。

```lean
-- TrustDemo.lean 内で実行するコマンド
#print axioms LvtUntrustedDemo.inheritedHole
#print axioms LvtUntrustedDemo.bogusViaAxiom
```

警告を見落としても依存の検査で発見できる。通常のライブラリにこの実験を import しない。
<!-- solution-end -->

### LVT2-08-B04 判定器の交換

自然数 n、cap に対して goodCheck n cap = decide (n ≤ cap) と定める。入力 n = 3、cap = 2 で alwaysAccept と異なることを示し、goodCheck が true のとき n ≤ cap が成り立つことを一般に証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

alwaysAccept 3 2 は定義により true となる。3 ≤ 2 は偽なので goodCheck 3 2 は false となる。一般の入力では [証明付き判定の健全性と完全性](../LVT2-01/index.md#prop-lvt2-01-decision-bridge) により、決定可能命題 P = (n ≤ cap) について decide P = true の証明 h から P の証明を得る。goodCheck の定義を展開した h に of_decide_eq_true を適用する。

```lean
def goodCheck (n cap : Nat) : Bool := decide (n ≤ cap)
example : alwaysAccept 3 2 = true := rfl
example : goodCheck 3 2 = false := by decide
example (n cap : Nat) (h : goodCheck n cap = true) :
    n ≤ cap := by
  change decide (n ≤ cap) = true at h
  exact of_decide_eq_true h
```

この証明は goodCheck の定義についてのものであり、外部実装が goodCheck と常に一致することは別の命題である。
<!-- solution-end -->

### Level C

### LVT2-08-C01 自動化と保証の台帳

容量 cap、使用数 used は自然数とする。予約の判定を checkRoom used cap = decide (used < cap) とする。判定が true なら used + 1 ≤ cap を証明せよ。判定が false で、さらに used ≤ cap なら used = cap となることを証明せよ。最後に、外部サービスが常に true を返す場合に同じ保証が成り立つか、また Lean の証明が通ったことから実サービスの容量制約まで保証できるか説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

判定が true のとき、定義展開で decide (used < cap) = true を得る。[証明付き判定の健全性と完全性](../LVT2-01/index.md#prop-lvt2-01-decision-bridge) において P を used < cap に選び、of_decide_eq_true で used < cap の証明を得る。[一枠予約の算術保証](#prop-lvt2-08-next) にこれを適用すると used + 1 ≤ cap が成り立つ。

false のときは used < cap と仮定すると、同じ判定器の完全性により decide (used < cap) = true となり、false と true が一致する矛盾になる。従って ¬ (used < cap) である。自然数の全順序から cap ≤ used を得て、仮定 used ≤ cap と合わせると両者は等しい。Leanでは of_decide_eq_false により否定を得て、omega が二つの不等式から等式を構成する。

```lean
def checkRoom (used cap : Nat) : Bool := decide (used < cap)

example (used cap : Nat) (h : checkRoom used cap = true) :
    used + 1 ≤ cap := by
  change decide (used < cap) = true at h
  exact nextWithin used cap (of_decide_eq_true h)

example (used cap : Nat) (h₀ : used ≤ cap)
    (h : checkRoom used cap = false) : used = cap := by
  change decide (used < cap) = false at h
  have hn : ¬ (used < cap) := of_decide_eq_false h
  omega
```

used = cap = 2 では外部サービスが常に true を返すとしても、増加後は 3 ≤ 2 となり偽である。よって判定値だけから最初の結論は導けない。また二番目の命題から h₀ を除くと used = 3、cap = 2 が反例になる。checkRoom 3 2 は false でも 3 ≠ 2 である。

保証を次のように区分する。

| 証拠 | 保証される内容 |
| --- | --- |
| checkRoom の二定理と公理依存の確認 | 形式化した自然数のモデルについて、記載した仮定の下での結論 |
| 外部サービスの具体的な出力テスト | テストした入力における出力 |
| 実サービスの容量保証 | 実際の容量・使用数を正しく取得し、操作がモデルと対応することなど別の証拠が必要 |

Leanの定理が受理されたという事実に、外部サービスとの対応や同時実行時の振る舞いまで含めない。これは [信頼境界](#def-lvt2-08-trust) の具体的な適用である。
<!-- solution-end -->

## 7. 次の学習へ

定理を探して証明を短く書けるようになり、その証明が何に依存するかも確認できるようになりました。次は、証明するべき命題自体をどう選ぶかを考えます。事前条件、事後条件、失敗結果を区別し、利用者の要求を形式的な仕様へ写すことから始めます。
