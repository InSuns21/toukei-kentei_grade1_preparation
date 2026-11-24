# LVT3-02 全域性・部分正当性・停止性

前講の[入出力契約](../LVT3-01/index.md#def-lvt3-01-contract)では、入力に対して値が返る関数を扱いました。今度は計算の途中で実行が終わらない可能性も考えます。たとえば未処理の品物を一個ずつ処理済みの箱へ移す処理を考えます。最後に正しい個数が返ることと、最後まで進むことには別の根拠が必要です。

**ブラウザで実行：** [本講の実行ラボを開く](../browser-lab.html?chapter=LVT3-02)。まず「予算と結果」を選んで、同じ入力に対する二つの予算の違いを確認してください。

## 1. 実行予算を持つモデル

自然数 n を残り個数、a を処理済み個数とします。n が正なら状態 (n, a) を (n - 1, a + 1) に変えます。n が 0 なら a を返します。各状態で一回の判定を行うため、初期状態 (3, 7) では移送3回と終了判定1回が必要です。

| 残り n | 処理済み a | 次の処理 |
| ---: | ---: | --- |
| 3 | 7 | 一個移す |
| 2 | 8 | 一個移す |
| 1 | 9 | 一個移す |
| 0 | 10 | 10 を返す |

実行予算 k はあと何回判定できるかを表す自然数です。[Option型](../LVT1-03/index.md#def-lvt1-03-option)を使い、some r は値 r を返して終了したこと、none は与えられた予算内に値を返さなかったことを表します。予算切れは業務上の拒否とは別です。none だけから無限に続くとは判断できません。

次の run は予算を一回ずつ減らして計算する関数です。[構造再帰](../LVT1-04/index.md#def-lvt1-04-structural-recursion)により k が小さくなるので run 自身は必ず値（some または none）を返します。以下の Lean コードは [LvtTermination.lean](lab/LvtTermination.lean) の抜粋で、同ファイルには import Lean と名前空間の宣言も含まれます。

```lean
def run : Nat → Nat → Nat → Option Nat
  | 0, _, _ => none
  | _ + 1, 0, a => some a
  | k + 1, n + 1, a => run k n (a + 1)
```

run 3 3 7 は run 2 2 8、run 1 1 9、run 0 0 10 へ進み、最後は none です。run 4 3 7 なら最後は run 1 0 10 となり some 10 を返します。n が 0 の場合でも、終了判定に予算が一回必要です。

## 2. 結果が返る場合と必ず返る場合

正しい結果は a + n です。この要求は run の再帰式からではなく、最初の処理済み個数に未処理個数を全部足すという業務要求から決めています。

ここでは任意の自然数 k, n, a に対して exec k n a が Option Nat を返す計算モデルを考えます。結果が得られた場合にだけその値を検査する条件を部分正当性とします。

<a id="def-lvt3-02-partial"></a>

<!-- formal-statement-start -->
### 定義（Leanの部分正当性）

exec : Nat → Nat → Nat → Option Nat とする。k は実行予算、n は残り個数、a は処理済み個数である。次が成立するとき exec は結果仕様 r = a + n に関して部分正当である。

```text
∀ k n a r : Nat, exec k n a = some r → r = a + n
```
<!-- formal-statement-end -->


<!-- definition-example-start: def-lvt3-02-partial -->
**定義の確認**　例えば、どんな k, n, a に対しても some (a + n) を返す関数は、some の中身が a + n であるから条件を満たす。一方、常に none を返す関数も、some r に等しいという仮定が決して成立しないので条件を満たす。部分正当性だけでは値の存在を要求していない。
<!-- definition-example-end -->


実際に値を得たいなら、入力ごとに十分な予算を取れることも示します。予算を先に一つ固定するのではなく、入力 n, a を取ってから k を選びます。

<a id="def-lvt3-02-terminates"></a>

<!-- formal-statement-start -->
### 定義（Leanの停止性仕様）

exec : Nat → Nat → Nat → Option Nat に対し、次をこの計算モデルの停止性仕様とする。

```text
∀ n a : Nat, ∃ k r : Nat, exec k n a = some r
```

exec は各予算内での実行結果を表す。ここでの停止性は各入力について値を返す有限の予算が存在することである。
<!-- formal-statement-end -->


<!-- definition-example-start: def-lvt3-02-terminates -->
**定義の確認**　exec k n a = some 0 と常に定めるなら、任意の n, a に対して k = 0, r = 0 を選べば条件が成立する。しかし n = 1, a = 2 のとき期待値は 3 であり、結果の正しさは別に確認する必要がある。常に none のモデルは n = a = 0 でもどの k, r についても some r を返さず、停止性仕様を満たさない。
<!-- definition-example-end -->


これら二つの条件を同時に要求すると、入力ごとに結果が存在し、返った結果は仕様に適合するといえます。

<a id="def-lvt3-02-total"></a>

<!-- formal-statement-start -->
### 定義（Leanの全正当性）

exec : Nat → Nat → Nat → Option Nat が、この章の結果仕様 r = a + n に関して全正当であるとは、[部分正当性](#def-lvt3-02-partial)と[停止性仕様](#def-lvt3-02-terminates)の両方を満たすことである。
<!-- formal-statement-end -->


<!-- definition-example-start: def-lvt3-02-total -->
**定義の確認**　exec k n a = some (a + n) と定める。任意の k, n, a, r に対し exec k n a = some r なら some の中身は等しいから r = a + n。さらに任意の n, a について k = 0, r = a + n を選ぶと exec 0 n a = some r。従って両条件が成立する。
<!-- definition-example-end -->



```lean
def PartialCorrect (exec : Nat → Nat → Nat → Option Nat) : Prop :=
  ∀ k n a r, exec k n a = some r → r = a + n

def Terminates (exec : Nat → Nat → Nat → Option Nat) : Prop :=
  ∀ n a, ∃ k r, exec k n a = some r

def TotalCorrect (exec : Nat → Nat → Nat → Option Nat) : Prop :=
  PartialCorrect exec ∧ Terminates exec
```


## 3. 移送した個数を保存する

一個移す前後で n + a は変わりません。これを利用して、予算が途中で尽きる可能性を残したまま結果の正しさを証明します。

<a id="prop-lvt3-02-partial"></a>

<!-- formal-statement-start -->
### 命題（移送モデルの部分正当性）

上で定義した run は [部分正当性](#def-lvt3-02-partial)を満たす。任意の自然数 k, n, a, r に対して run k n a = some r なら r = a + n である。
<!-- formal-statement-end -->


**証明の見取り図**　予算 k に関する[自然数の帰納法](../LVT2-05/index.md#principle-lvt2-05-nat)で示す。移送の前後で処理済み個数と残り個数の和が同じであることを用いる。

<!-- proof-start -->
### 証明

k = 0 の場合、run 0 n a = none なので some r を返すという仮定と矛盾する。従って含意は真である。

k + 1 の場合、任意の n, a, r を取る。n = 0 なら run (k + 1) 0 a = some a。仮定から some a = some r となるので a = r。従って r = a + 0。

n = m + 1 なら再帰式から run k m (a + 1) = some r を得る。帰納仮定は n, a, r を任意に取っていたので、これを m, a + 1, r に適用できる。

```text
r = (a + 1) + m
  = a + (1 + m)
  = a + (m + 1)
  = a + n
```

帰納法により全ての k について主張が成立する。Lean では intro k の直後に induction k を行い、残りの変数を固定しない。[証明自動化](../LVT2-08/index.md#def-lvt2-08-automation)の omega は最後の自然数の線形算術を検査する。

```lean
theorem runPartial : PartialCorrect run := by
  intro k
  induction k with
  | zero =>
    intro n a r h
    simp [run] at h
  | succ k ih =>
    intro n a r h
    cases n with
    | zero =>
      simpa [run] using h.symm
    | succ n =>
      have h' : run k n (a + 1) = some r := h
      have hr := ih n (a + 1) r h'
      omega
```

<!-- proof-end -->


## 4. 予算を決めて停止を示す

残りが n 個なら一個ずつ移す回数は n 回です。さらに n = 0 を判定する一回が必要です。n + 1 で十分だという主張と、それより少ない予算では結果が得られないという主張を区別して証明します。

<a id="prop-lvt3-02-budget"></a>

<!-- formal-statement-start -->
### 命題（移送モデルの実行予算）

任意の自然数 n, a に対し

```text
run (n + 1) n a = some (a + n)
```

が成立する。また任意の自然数 k, n, a に対し k ≤ n なら run k n a = none である。
<!-- formal-statement-end -->


**証明の見取り図**　十分性には残り個数 n の帰納法、不足には予算 k の帰納法を使う。終了判定を数えるため境界は n ではなく n + 1 になる。

<!-- proof-start -->
### 証明

十分性：n = 0 のとき run 1 0 a = some a = some (a + 0)。n = m + 1 の場合は再帰式から

```text
run (m + 2) (m + 1) a
= run (m + 1) m (a + 1)
= some ((a + 1) + m)
= some (a + (m + 1))
```

となる。二行目で a を任意とした帰納仮定を a + 1 に適用した。最後は加法の結合則と交換則による。

不足：k = 0 のとき run 0 n a = none。k + 1 ≤ n のとき n = 0 は不可能なので n = m + 1 と書ける。比較から k ≤ m。再帰式と、n, a を任意にした帰納仮定によって

```text
run (k + 1) (m + 1) a
= run k m (a + 1)
= none
```

を得る。従ってどちらの主張も成立する。

```lean
theorem enough (n a : Nat) : run (n + 1) n a = some (a + n) := by
  induction n generalizing a with
  | zero => simp [run]
  | succ n ih =>
    change run (n + 1) n (a + 1) = some (a + (n + 1))
    rw [ih]
    congr 1 <;> omega

theorem short (k n a : Nat) (h : k ≤ n) : run k n a = none := by
  induction k generalizing n a with
  | zero => rfl
  | succ k ih =>
    cases n with
    | zero => omega
    | succ n =>
      change run k n (a + 1) = none
      exact ih n (a + 1) (by omega)
```

<!-- proof-end -->


十分な予算が見つかったので、値が得られることと値の正しさを組にできます。

<a id="prop-lvt3-02-total"></a>

<!-- formal-statement-start -->
### 命題（移送モデルの全正当性）

run は [全正当性](#def-lvt3-02-total)を満たす。
<!-- formal-statement-end -->


**証明の見取り図**　[予算の命題](#prop-lvt3-02-budget)から存在する予算と結果を構成し、[部分正当性の命題](#prop-lvt3-02-partial)と組にする。

<!-- proof-start -->
### 証明

任意の n, a に対し k = n + 1, r = a + n を取る。[予算の命題](#prop-lvt3-02-budget)により run k n a = some r。これで停止性仕様が成立する。[部分正当性の命題](#prop-lvt3-02-partial)も成立しているから、[連言の導入](../LVT2-02/index.md#def-lvt2-02-and)で両者を組にする。

```lean
theorem runTerminates : Terminates run := by
  intro n a
  exact ⟨n + 1, a + n, enough n a⟩

theorem runTotal : TotalCorrect run := ⟨runPartial, runTerminates⟩
```

<!-- proof-end -->


## 5. 終了を証明し忘れたとき

状態を更新せず終了判定も行わないループを考えます。どの有限予算でも結果が返らないことを never k n a = none でモデル化します。never 自体は Lean の全域関数で、ここで表現しているループの動作とは区別してください。

```lean
def never (_ _ _ : Nat) : Option Nat := none
```


<a id="prop-lvt3-02-never"></a>

<!-- formal-statement-start -->
### 命題（停止性を欠く部分正当なモデル）

never k n a = none と全ての自然数 k, n, a に対し定めたモデル never は [部分正当性](#def-lvt3-02-partial)を満たすが、[停止性仕様](#def-lvt3-02-terminates)を満たさない。
<!-- formal-statement-end -->


**証明の見取り図**　返った結果に対する含意は前件が偽なので成立する。一方、停止性の存在命題には証人を与えられない。

<!-- proof-start -->
### 証明

任意の k, n, a, r を取り never k n a = some r を仮定すると、none = some r となり異なる構成子が等しいことになって矛盾する。偽の仮定からは任意の命題を導けるので部分正当性が成立する。

停止性仕様が成立すると仮定する。n = a = 0 に適用すると k, r が存在して never k 0 0 = some r となるはずである。しかし左辺は none である。この矛盾により停止性仕様は成立しない。

```lean
theorem neverPartial : PartialCorrect never := by
  intro k n a r h
  simp [never] at h

theorem neverNotTerminates : ¬ Terminates never := by
  intro h
  obtain ⟨k, r, hr⟩ := h 0 0
  simp [never] at hr
```

<!-- proof-end -->


## 6. 予算なしで実行する関数

今回は残り個数が減ることを既に確認できたので、予算を引数に取らずに結果を直接返す関数を作れます。全域性とは、指定された入力型の全ての値に対して結果が定まることです。全域性は結果が仕様に合うこととは別です。

<a id="def-lvt3-02-drain"></a>

<!-- formal-statement-start -->
### 定義（Leanの全域的な移送関数）

自然数 n, a に対して drain : Nat → Nat → Nat を次の再帰式で定める。

```text
drain 0 a = a
drain (n + 1) a = drain n (a + 1)
```

再帰引数 n は一回ごとに一つ減り、0 で再帰を終了する。
<!-- formal-statement-end -->


<!-- definition-example-start: def-lvt3-02-drain -->
**定義の確認**　drain 2 4 = drain 1 5 = drain 0 6 = 6。終了時には残りが 0、処理済みが 6 となる。初期値 n = 0, a = 9 なら直ちに 9 を返す。任意の自然数 n から n 回の移送で 0 に到達するため、a がどんな値でも再帰は終了する。
<!-- definition-example-end -->



```lean
def drain : Nat → Nat → Nat
  | 0, a => a
  | n + 1, a => drain n (a + 1)
```


[減少量](../LVT1-04/index.md#def-lvt1-04-decreasing-measure)として n を使えます。a は増えますが、再帰のたびに n が厳密に減るので停止に影響しません。Lean は構造再帰としてこの定義を受理します。続いてこの関数の結果と実行予算モデルの結果を比較します。

<a id="prop-lvt3-02-drain"></a>

<!-- formal-statement-start -->
### 命題（全域的移送関数の正しさ）

任意の自然数 n, a について drain n a = a + n が成立する。さらに任意の自然数 k, n, a, r について run k n a = some r なら r = drain n a が成立する。
<!-- formal-statement-end -->


**証明の見取り図**　残り個数 n の[自然数の帰納法](../LVT2-05/index.md#principle-lvt2-05-nat)で drain の結果を求め、[部分正当性の命題](#prop-lvt3-02-partial)と比較する。

<!-- proof-start -->
### 証明

n = 0 なら drain 0 a = a = a + 0。n = m + 1 のとき

```text
drain (m + 1) a
= drain m (a + 1)
= (a + 1) + m
= a + (m + 1)
```

である。二行目で任意の a に対する帰納仮定を a + 1 に適用した。従って drain n a = a + n が成立する。

run k n a = some r と仮定すると、[移送モデルの部分正当性](#prop-lvt3-02-partial)より r = a + n。上の式の右辺と等しいので r = drain n a となる。

```lean
theorem drainCorrect (n a : Nat) : drain n a = a + n := by
  induction n generalizing a with
  | zero => simp [drain]
  | succ n ih =>
    change drain n (a + 1) = a + (n + 1)
    rw [ih]
    omega

theorem runAgrees (k n a r : Nat) (h : run k n a = some r) :
    r = drain n a := by
  rw [drainCorrect]
  exact runPartial k n a r h
```

<!-- proof-end -->


## 7. 実行して証明責務を見比べる

[実行ラボ](../browser-lab.html?chapter=LVT3-02)には四つの実験があります。Lean Web はオンラインの Lean 環境を使うため、固定版との差が生じる場合があります。固定版の実行はラボにある Codespaces の案内を利用してください（GitHub ログインと利用枠が必要です）。

| 実験 | 観察する内容 |
| --- | --- |
| 予算と結果 | none、some 10、some 7、10 の順に結果を確認 |
| 境界のテスト | 予算 0、n、n + 1 を比較し LVT3-02 OK を確認 |
| 演習解答 | 各命題を型検査する |
| 意図した失敗 | neverPartial を停止性仕様の証明にすると型不一致になる |

固定ツールチェーンは Lean 4.35.0 です。[lakefile.lean](lab/lakefile.lean) を含む実プロジェクトを用い、リポジトリのルートから次を実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT3-02/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

最後のコマンドは意図的に失敗します。成功する四つのコマンドとは分けて実行します。Inspect.lean では評価値のほかに各証明の公理依存を確認できます。run の実行予算はこのモデルの判定回数であり、実機の時間やメモリ使用量ではありません。

## 8. 演習

紙上で考えてから [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) で検査してください。

### Level A

### LVT3-02-A01 予算不足

run 2 2 4 の値を再帰式で求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

run 2 2 4 = run 1 1 5 = run 0 0 6。最後は予算が 0 なので none。状態は残り 0 に達しているが、終了判定を行う予算がない。

```lean
theorem a01 : run 2 2 4 = none := rfl
```

<!-- solution-end -->


### LVT3-02-A02 十分な予算

run 3 2 4 の値と結果仕様を確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

run 3 2 4 = run 2 1 5 = run 1 0 6 = some 6。結果の中身は 6 = 4 + 2 なので要求を満たす。

```lean
theorem a02 : run 3 2 4 = some 6 := rfl
```

<!-- solution-end -->


### LVT3-02-A03 残りゼロ

run 1 0 9 の値を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

予算が正で残りは 0 なので再帰せず some 9 を返す。9 + 0 = 9 で要求を満たす。

```lean
theorem a03 : run 1 0 9 = some 9 := rfl
```

<!-- solution-end -->


### LVT3-02-A04 ゼロ予算

run 0 0 9 の値を求めよ。A03 との差を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

最初の分岐は予算 0 なので none である。A03 は予算 1 を持つため終了判定を行える。残り 0 と予算 0 は意味が違う。

```lean
theorem a04 : run 0 0 9 = none := rfl
```

<!-- solution-end -->


### Level B

### LVT3-02-B01 任意の成功結果

任意の自然数 k, n, a, r で run k n a = some r とする。r = a + n を示し、k が十分かどうかを事前に仮定する必要があるか説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[移送モデルの部分正当性](#prop-lvt3-02-partial)は全ての k に対する含意である。仮定 run k n a = some r をそのまま適用して r = a + n を得る。成功したという仮定があるため、予算の下限を別途仮定する必要はない。

```lean
theorem b01 (k n a r : Nat) (h : run k n a = some r) :
    r = a + n := runPartial k n a r h
```

<!-- solution-end -->


### LVT3-02-B02 予算の境界

任意の自然数 n, a で run n n a = none を示せ。n = 0 も含むか。

- Level: B

<!-- solution-start -->
#### 詳細解答

[予算の命題](#prop-lvt3-02-budget)の不足側で k = n とする。比較 n ≤ n は反射律により成立するので run n n a = none。n = 0 の場合も run 0 0 a = none で含まれる。十分性の側では run (n + 1) n a = some (a + n) となる。

```lean
theorem b02 (n a : Nat) : run n n a = none :=
  short n n a (Nat.le_refl n)
```

<!-- solution-end -->


### LVT3-02-B03 停止しても誤る

wrong k n a = some 0 と定める。停止性仕様は成立し、部分正当性は成立しないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

任意の n, a に対し k = 0, r = 0 を選ぶと wrong 0 n a = some 0。従って停止性仕様を満たす。部分正当性を仮定して k = 0, n = 1, a = 2, r = 0 を代入すると、wrong 0 1 2 = some 0 から 0 = 2 + 1 = 3 が従い矛盾する。従って部分正当性は成立しない。

```lean
def wrong (_ _ _ : Nat) : Option Nat := some 0

theorem b03Term : Terminates wrong := by
  intro n a
  exact ⟨0, 0, rfl⟩

theorem b03Wrong : ¬ PartialCorrect wrong := by
  intro h
  have bad := h 0 1 2 0 rfl
  omega
```

<!-- solution-end -->


### Level C

### LVT3-02-C01 成功から予算と全域関数の結果を復元する

自然数 k, n, a, r で run k n a = some r とする。n < k かつ r = drain n a を示せ。

- Level: C

<!-- solution-start -->
#### 詳細解答

まず n < k が偽と仮定する。自然数の比較から k ≤ n。[予算の命題](#prop-lvt3-02-budget)の不足側によって run k n a = none。これを仮定へ代入すると none = some r となり矛盾する。従って n < k。次に [全域的移送関数の正しさ](#prop-lvt3-02-drain)の後半を仮定 run k n a = some r に適用し r = drain n a を得る。二条件を連言で組にする。この結論は成功時の予算の必要条件と結果の対応を同時に与える。

```lean
theorem c01 (k n a r : Nat) (h : run k n a = some r) :
    n < k ∧ r = drain n a := by
  constructor
  · by_contra hn
    have hs := short k n a (by omega)
    rw [hs] at h
    simp at h
  · exact runAgrees k n a r h
```

<!-- solution-end -->


## 9. 次の学習へ

部分正当性は成功した結果の検査、停止性は成功する有限予算の存在、全正当性はその両方でした。次講ではリストの連結や逆転を扱い、構造再帰で定義した関数の結果を複数の補題から証明します。
