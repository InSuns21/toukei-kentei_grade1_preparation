# LVT3-05 状態遷移系・到達可能性・不変量

前講の[挿入ソートの正当性](../LVT3-04/index.md#prop-lvt3-04-correct)では、一つの入力と出力の関係を証明しました。今回はアプリの操作が何度も繰り返される場合を考えます。たとえば容量4のカウンタで2単位ずつ増減させるとき、操作を千回続けても上限を超えないでしょうか。操作の回数を固定したテストではなく、許されるすべての有限な操作列を対象とする証明を組み立てます。

**ブラウザで実行：** [本講の実行ラボ](../browser-lab.html?chapter=LVT3-05)。まず Inspect で増加・減少・拒否の値を確認してください。

## 1. 一回の移動と何回もの移動

状態とは、次の操作の可否や結果を決めるために保持する情報です。ここでは状態を自然数 Nat（0を含む）で表します。初期状態とは操作を始める前の状態、一回の遷移とは許された操作による前後の状態の組です。二つの状態に命題を対応させる関係 r : Nat → Nat → Prop で、一回の遷移が存在するかを表します。

<a id="def-lvt3-05-system"></a>

<!-- formal-statement-start -->
### 定義（単一初期状態の遷移モデル）

自然数で表す状態、初期状態 i : Nat、一回の遷移を表す関係 r : Nat → Nat → Prop の組 (Nat, i, r) を考える。このモデルの到達状態 t は、[到達可能性の生成規則](../LVT2-06/index.md#def-lvt2-06-reach) による ReachL r i t が成立する自然数 t である。零回の遷移も認める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-05-system -->
**定義の確認**　i = 0、r x y を「y = x + 2」とする。base で 0 に到達し、r 0 2 は 2 = 0 + 2、r 2 4 は 4 = 2 + 2 なので step を二回適用して 4 に到達する。r 0 4 は偽であり、一回の遷移と到達可能性は一致しない。この関係には上限がないので 6 へも進める。
<!-- definition-example-end -->


ReachL の証明は有限回の構成子適用です。状態の自然数が減ることは必要ありません。往復する辺があっても、証明の長さに沿った帰納法を使えます。ある操作が拒否された場合を関係に含めるかどうかはモデルの設計です。本講では拒否は辺を作らないと約束します。

## 2. 実行可能なモデルを設計する

初期値を 0、容量を 4 とします。増加 up と減少 down の二操作を用意します。成功なら some で移動後の状態を返し、拒否なら none を返します。[Option を含む帰納型](../LVT1-03/index.md#def-lvt1-03-inductive-type) の構成子を利用します。自然数の引き算は負にならず 0 で切り詰められるため、減少は事前に 2 以上であることを検査します。

<a id="def-lvt3-05-advance"></a>

<!-- formal-statement-start -->
### 定義（二単位カウンタの実行規則）

Action は up と down の二つだけを持つ型とする。advance : Nat → Action → Option Nat を次の規則で定める。

```text
advance s up   = if s+2 ≤ 4 then some (s+2) else none
advance s down = if 2 ≤ s   then some (s-2) else none
```

初期状態は 0 とする。入力状態の型は Nat 全体であり、入力が到達可能であることは関数の仮定に含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-05-advance -->
**定義の確認**　advance 0 up = some 2（2 ≤ 4）、advance 2 up = some 4（4 ≤ 4）、advance 4 up = none（6 ≤ 4 は偽）。advance 2 down = some 0（2 ≤ 2）、advance 0 down = none（2 ≤ 0 は偽）。さらに advance 3 down = some 1 であり、到達できるかどうかを関数自身は調べない。
<!-- definition-example-end -->


実行可能な関数から命題への橋渡しをします。操作 a が存在して、実行結果が some t であることを、一回で s から t へ移れる条件にします。

<a id="def-lvt3-05-step"></a>

<!-- formal-statement-start -->
### 定義（二単位カウンタの遷移関係）

任意の s,t : Nat について、[二単位カウンタの実行規則](#def-lvt3-05-advance) を使い、Step s t を「ある a : Action が存在して advance s a = some t」と定める。Reachable t は [到達可能性の生成規則](../LVT2-06/index.md#def-lvt2-06-reach) に Step と初期値 0 を代入した ReachL Step 0 t とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-05-step -->
**定義の確認**　Step 2 4 は a = up を証人として、advance 2 up = some 4 により成立する。Step 4 0 は up が none、down が some 2 なので、二操作のいずれも some 0 を返さず成立しない。Reachable 4 は base で 0、step で 2、もう一回の step で 4 と構成できる。
<!-- definition-example-end -->


| 入力状態 | up | down |
|---|---|---|
| 0 | some 2 | none |
| 2 | some 4 | some 0 |
| 4 | none | some 2 |

表はこの3状態について実行規則を計算したものです。この表だけでは、初期状態から奇数が出現しないことをまだ証明していません。これから表の3行に閉じ込められることを証明します。

## 3. 保存を証明すれば回数を制限しなくてよい

状態に対する命題 P : Nat → Prop を選びます。初期状態で真で、P が真の任意の状態から許された一回の遷移を行っても P が真のままであるなら、[到達証明の不変量原理](../LVT2-06/index.md#prop-lvt2-06-invariant) によって全到達状態で P が成り立ちます。この二条件をまとめたものが帰納的不変量です。

<a id="def-lvt3-05-inductive"></a>

<!-- formal-statement-start -->
### 定義（帰納的不変量）

i : Nat、r : Nat → Nat → Prop、P : Nat → Prop に対し、IsInductive r i P は次の二条件の連言とする。

1. P i が成立する。
2. 任意の s,t : Nat について P s と r s t が成立すれば P t が成立する。

ここで二番目の条件は、到達可能性を別の仮定として追加しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-05-inductive -->
**定義の確認**　i = 0、r x y を y = x + 2、P x を「x は 2 以上」とする。第二条件は x ≥ 2 なら y = x + 2 ≥ 4 ≥ 2 で成立する。しかし P 0 は偽なので帰納的不変量ではない。P x を「ある自然数 k が存在して x = 2k」とすれば、0 = 2·0、x = 2k のとき y = 2k + 2 = 2(k+1) となるので二条件をともに満たす。
<!-- definition-example-end -->


二単位カウンタでは Good s を「s = 0 または s = 2 または s = 4」とします。これは上限以内という要求よりも強い候補です。初期状態は 0 であり、残る仕事は一回の遷移の保存条件を確かめることです。

<a id="prop-lvt3-05-preserve"></a>

<!-- formal-statement-start -->
### 命題（二単位カウンタの保存条件）

[二単位カウンタの遷移関係](#def-lvt3-05-step) を Step、Good s を s = 0 または s = 2 または s = 4 とする。このとき [帰納的不変量](#def-lvt3-05-inductive) の条件 IsInductive Step 0 Good が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　Good s の三つの可能性と Action の二種類を組み合わせ、成功した四つの遷移の終点を検査する。拒否の二枝では Step の証人になれないことを確かめる。

<!-- proof-start -->
### 証明

初期条件は Good 0 の第一の選言 0 = 0 で成立する。任意の s,t : Nat で Good s と Step s t を仮定する。Step の定義から a : Action と advance s a = some t を得る。[選言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-or) により Good s を三場合に分け、さらに a を二場合に分ける。

- s = 0、a = up：advance 0 up = some 2。some 2 = some t の構成子の引数が等しいので t = 2、Good t の第二の選言が成立。
- s = 0、a = down：advance 0 down = none。none = some t は異なる構成子の等式で矛盾。
- s = 2、a = up：some (2+2) = some t から t = 4、第三の選言が成立。
- s = 2、a = down：some (2-2) = some t から t = 0、第一の選言が成立。
- s = 4、a = up：4+2 ≤ 4 が偽で none = some t となり矛盾。
- s = 4、a = down：some (4-2) = some t から t = 2、第二の選言が成立。

全六枝を尽くしたので保存条件が成立する。これを初期条件と組にすると [帰納的不変量](#def-lvt3-05-inductive) の二条件がそろう。Lean の good_step は選言と Action を場合分けして simp で実行規則を計算する。subst は等式から t を置換し、simp [Good] は具体的な自然数の選言を計算する。
<!-- proof-end -->

## 4. 到達状態を確定する

保存条件から得られるのは、まず「到達できるなら Good」という向きです。逆に Good の三状態について具体的な経路を作れば、到達状態を過不足なく確定できます。

<a id="prop-lvt3-05-exact"></a>

<!-- formal-statement-start -->
### 命題（二単位カウンタの到達範囲）

[二単位カウンタの遷移関係](#def-lvt3-05-step) による Reachable と Good（s = 0 または s = 2 または s = 4）について、任意の s : Nat で Reachable s と Good s は同値である。
<!-- formal-statement-end -->

**証明の見取り図**　順方向には保存条件と帰納法、逆方向には 0 から始まる長さ 0、1、2 の具体的な経路を使う。

<!-- proof-start -->
### 証明

Reachable s の証明 h を仮定する。[二単位カウンタの保存条件](#prop-lvt3-05-preserve) から Good 0 と、任意の x,y に対する Good x → Step x y → Good y を得る。[到達証明の不変量原理](../LVT2-06/index.md#prop-lvt2-06-invariant) に r = Step、開始点 = 0、終点 = s、P = Good を代入する。

```text
base の目標 : Good 0
step の目標 : Good y（ih : Good x, e : Step x y）
```

よって h の構成に沿って Good s が成立する。移動回数を任意に固定する必要はない。

逆方向では Good s の三つの選言を場合分けする。

- s = 0：ReachL.base が ReachL Step 0 0 の証明。
- s = 2：advance 0 up = some 2 なので e02 : Step 0 2。ReachL.step ReachL.base e02 : ReachL Step 0 2。
- s = 4：直前の証明 h2 : ReachL Step 0 2 と advance 2 up = some 4 から e24 : Step 2 4。ReachL.step h2 e24 : ReachL Step 0 4。

いずれも [到達可能性の生成規則](../LVT2-06/index.md#def-lvt2-06-reach) の二構成子だけで証明を作った。両方向を示したので同値である。
<!-- proof-end -->

<a id="prop-lvt3-05-bound"></a>

<!-- formal-statement-start -->
### 命題（二単位カウンタの上限保証）

任意の s : Nat について、[二単位カウンタの遷移関係](#def-lvt3-05-step) による Reachable s が成立するなら s ≤ 4 が成立する。
<!-- formal-statement-end -->

**証明の核心**　到達範囲を正確に知れば、上限はその直接の帰結になる。

[二単位カウンタの到達範囲](#prop-lvt3-05-exact) の順方向から s = 0、s = 2、s = 4 のいずれか。各場合の比較 0 ≤ 4、2 ≤ 4、4 ≤ 4 は真なので、すべての到達状態で s ≤ 4 が成立する。

一方、値 3 は上限以下の自然数であり、型としては許されます。しかし 3 = 0、3 = 2、3 = 4 はすべて偽です。到達可能と仮定すると同値の順方向に矛盾します。上限を満たすことと到達可能であることは別の条件です。

## 5. 真である性質と帰納的に保存できる性質

到達状態で成立する性質を、不変量と呼ぶことがあります。本講では、初期条件と全遷移の保存条件を両方満たすものを帰納的不変量と区別します。帰納的不変量なら到達状態の性質になりますが、その逆は一般に成立しません。

<a id="prop-lvt3-05-weak"></a>

<!-- formal-statement-start -->
### 命題（到達状態の性質と保存条件の相違）

[二単位カウンタの遷移関係](#def-lvt3-05-step) に対して AvoidOne s を s ≠ 1 とする。任意の s : Nat で Reachable s なら AvoidOne s が成立するが、[帰納的不変量](#def-lvt3-05-inductive) の条件 IsInductive Step 0 AvoidOne は成立しない。
<!-- formal-statement-end -->

**証明の見取り図**　到達状態は 0、2、4 だけなので 1 は除外される。ところが到達不能な 3 からは 1 に減少できる。

<!-- proof-start -->
### 証明

[二単位カウンタの到達範囲](#prop-lvt3-05-exact) により、到達状態 s は 0、2、4 のいずれか。0 ≠ 1、2 ≠ 1、4 ≠ 1 だから AvoidOne s が成立する。

初期条件 AvoidOne 0 も成立する。しかし s = 3、t = 1 を選ぶと 3 ≠ 1 なので AvoidOne 3 が真で、2 ≤ 3 なので advance 3 down = some (3-2) = some 1。従って Step 3 1 は down を証人として成立する。保存条件が真なら AvoidOne 1、すなわち 1 ≠ 1 が従うが、1 = 1 の反射律と矛盾する。

従って保存条件は偽で、IsInductive Step 0 AvoidOne は成立しない。ここで s = 3 が到達不能であることは、保存条件の全称量化から 3 を除外する理由にはならない。
<!-- proof-end -->

弱い性質だけで帰納法が閉じないときには、Good のように実際に到達する状態を絞り込む強い性質を探すのが有効です。

## 6. Lean で確認する

[モデルと証明のソース](lab/LvtTransitions.lean) は [到達可能性の生成規則](../LVT2-06/index.md#def-lvt2-06-reach) と[到達証明の不変量原理](../LVT2-06/index.md#prop-lvt2-06-invariant) の先行コードを同形で含め、単一ファイルで試せます。good_step、goodInductive、reachableGood、reachExact の順に証明を接続しています。

[実行ラボ](../browser-lab.html?chapter=LVT3-05) の Inspect では some 2、none、none、some 1 の順で計算結果が出ます。続いて構成子と定理の型、公理依存を確認してください。Main は正常四遷移、拒否二分岐、到達不能な入力 3 の実行を検査します。Failure は up を Step 4 6 の証人として渡してみる実験です。advance 4 up は none なので、拒否を示す等式の証明 rejected は some 6 を要求する型と一致しません。ExerciseSolutions は演習の証明を検査します。

固定版は [lean-toolchain](lab/lean-toolchain) の Lean 4.35.0 です。Lean Web の版は固定版と異なることがあります。ラボの Codespaces 導線から端末を開く場合は利用枠を確認し、リポジトリルートから次を実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT3-05/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

最後だけが意図的な失敗です。計算テストは指定入力の出力を確認し、Reachable の定理は初期状態からの任意の有限な合法遷移について述べています。実際の製品が Step 以外の状態更新を行わないこと、またモデルに含めていない並行更新の正しさは別に確かめる必要があります。

## 7. 演習と詳細解答

### Level A

### LVT3-05-A01 零回の遷移

Reachable 0 の証明を構成せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[到達可能性の生成規則](../LVT2-06/index.md#def-lvt2-06-reach) に r = Step、s = 0 を代入すると base : ReachL Step 0 0 が得られる。Reachable 0 はこの命題なので、操作の証人を一つも用意する必要はない。

対応する Lean の証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の a01 で始まる宣言を参照してください。
<!-- solution-end -->

### LVT3-05-A02 拒否の境界

advance 4 up と advance 0 down を計算し、どちらも状態を返さない理由を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[二単位カウンタの実行規則](#def-lvt3-05-advance) より 4+2 = 6 > 4 だから up の条件は偽で none。0 < 2 なので down の条件も偽で none。自然数の切り詰めによる 0 を成功値として返すのではなく、拒否となる。

対応する Lean の証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の a02 で始まる宣言を参照してください。
<!-- solution-end -->

### LVT3-05-A03 往復を含む経路

0 → 2 → 4 → 2 の経路から Reachable 2 の証明を構成せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[二単位カウンタの遷移関係](#def-lvt3-05-step) で e02 は up（0+2=2）、e24 は up（2+2=4）、e42 は down（4−2=2）を証人に取る。[到達可能性の生成規則](../LVT2-06/index.md#def-lvt2-06-reach) に沿って h0 = base、h2 = step h0 e02、h4 = step h2 e24、h2′ = step h4 e42 とする。各 step で前の証明の終点が次の辺の始点に一致する。最終の型は ReachL Step 0 2。

対応する Lean の証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の a03 で始まる宣言を参照してください。
<!-- solution-end -->

### LVT3-05-A04 型には入るが到達不能

3 : Nat が Reachable 3 を満たさないことを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

到達証明 h を仮定する。[二単位カウンタの到達範囲](#prop-lvt3-05-exact) の順方向に s = 3 を代入すると 3 = 0 または 3 = 2 または 3 = 4。いずれも異なる自然数の等式なので偽である。三枝とも矛盾し h は存在しない。3 ≤ 4 は真だが、この事実だけでは到達性を意味しない。

対応する Lean の証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の a04 で始まる宣言を参照してください。
<!-- solution-end -->


### Level B

### LVT3-05-B01 開始点を変更する

同じ Step に対し ReachL Step 1 3 が成立することを示せ。Reachable 3 と混同してはならない理由も説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

初期値を 1 として [到達可能性の生成規則](../LVT2-06/index.md#def-lvt2-06-reach) の base を使えば ReachL Step 1 1。[二単位カウンタの実行規則](#def-lvt3-05-advance) で 1+2=3 ≤ 4 なので advance 1 up = some 3。従って Step 1 3、step により ReachL Step 1 3 を得る。Reachable は開始点 0 を固定した命題であり、この証明の開始点 1 と異なる。Good 1 は偽なので Good による不変量原理の初期条件も満たさない。

対応する Lean の証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の b01 で始まる宣言を参照してください。
<!-- solution-end -->

### LVT3-05-B02 別の弱い性質

P s を s ≠ 3 とする。P はすべての Reachable s で真だが帰納的不変量ではないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[二単位カウンタの到達範囲](#prop-lvt3-05-exact) により到達状態は 0,2,4。0 ≠ 3、2 ≠ 3、4 ≠ 3 が真だから P は成立する。P 0 も真である。一方、s=5、t=3 と置くと 5 ≠ 3 で P 5 は真。2 ≤ 5 より advance 5 down = some (5−2) = some 3 で Step 5 3。保存条件を適用すると P 3、つまり 3 ≠ 3 となり矛盾する。[帰納的不変量](#def-lvt3-05-inductive) の第二条件が壊れたので、全到達状態で真というだけでは帰納的不変量にならない。

対応する Lean の証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の b02 で始まる宣言を参照してください。
<!-- solution-end -->

### LVT3-05-B03 変異した規則

新しい関係 Mutant s t を Step s t または (s = 4 かつ t = 6) とする。初期値 0 から上限4を破る到達証明を作り、保存条件がどこで壊れるか示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

Step 0 2 と Step 2 4 は up の成功枝なので、選言の左側から Mutant 0 2 と Mutant 2 4 を得る。さらに 4 = 4 と 6 = 6 を組にして選言の右側に入れると Mutant 4 6。[到達可能性の生成規則](../LVT2-06/index.md#def-lvt2-06-reach) を r = Mutant として使い、base から step を三回行うと ReachL Mutant 0 6。6 > 4 で上限保証に反する。Good 4 は真だが Good 6 は偽なので追加された辺が [二単位カウンタの保存条件](#prop-lvt3-05-preserve) を壊す。元の Step に対する証明は新しい関係の保存を保証しない。

対応する Lean の証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の b03 で始まる宣言を参照してください。
<!-- solution-end -->


### Level C

### LVT3-05-C01 どの到達状態からも戻れるか

任意の s : Nat で Reachable s なら ReachL Step s 0 が成立することを証明せよ。この性質は全操作列が必ず 0 へ戻ることを意味するか。

- Level: C

<!-- solution-start -->
#### 詳細解答

[二単位カウンタの到達範囲](#prop-lvt3-05-exact) の順方向を適用し、s=0,2,4 の三場合に分ける。s=0 では base : ReachL Step 0 0。s=2 では 2 ≤ 2 より advance 2 down = some 0、従って Step 2 0。開始点2の base にその辺を追加すれば ReachL Step 2 0。s=4 では 4−2=2 より Step 4 2、2−2=0 より Step 2 0。開始点4の base に前者を追加して ReachL Step 4 2、後者を追加して ReachL Step 4 0。各枝の結論を代入すると ReachL Step s 0 となる。これは戻れる経路が少なくとも一つ存在するという主張であり、全経路についての主張ではない。2 → 4 → 2 → 4 → … と交互に動けば、任意の長さの有限経路を作れて、その途中では0を訪れない。従って0へ必ず戻ることは示していない。

対応する Lean の証明は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の c01 で始まる宣言を参照してください。
<!-- solution-end -->


## 8. 次の講義へ

状態の型と到達状態を区別し、一回の合法遷移の保存条件から任意の有限操作列を扱いました。次講ではゲームの着手規則に適用し、拒否すべき操作と合法な盤面の性質を区別して証明します。
