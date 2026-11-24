# LVT4-01 例示・単体テスト・`#guard`・Lake test

前提講座：[LVT3-08](../LVT3-08/index.md)、[LVT3-06](../LVT3-06/index.md)、[LVT1-02](../LVT1-02/index.md)。

前講までにプログラムの正当性を証明しました。しかし、仕様を書き間違えたり、別の実装へ移植するときに境界の比較を変えたりすることがあります。そこで具体的な入力と、仕様から手で求めた期待出力を保存し、変更のたびに実行します。三目並べを使って、テストが何を観測するか、どこまでを証明できるかを分けましょう。

**ブラウザで実行：** [本講の実行ラボ](../browser-lab.html?chapter=LVT4-01)。既習のゲームモデルをそのまま読み込んで実験します。Lean Web と固定版の違いに注意し、Lake の実行はラボから Codespaces を開きます（ログイン・利用枠が必要です）。

## 1. 一つの機能を具体値で検査する

[例示テスト](../LVT1-01/index.md#def-lvt1-01-example-test)では、試す入力を選び、出力を期待出力と照合しました。ここで単体とは、他の処理から分けて呼び出せる関数などの小さな検査対象です。テストケースには入力と期待出力を記録します。たとえば三目並べの勝利判定だけを調べる場合、画面表示や通信は呼び出さず、盤面とプレイヤーを関数に渡します。

<a id="def-lvt4-01-unit-test"></a>

<!-- formal-statement-start -->
### 定義（単体テストの成功条件）

検査対象を関数 $f:X\to Y$ とし、任意の入力 $x\in X$ に対して一意な出力が得られ、出力の等しさを判定できるとする。入力 $x\in X$ と期待出力 $e\in Y$ の組 $(x,e)$ をテストケースとする。単体テストは対象の関数を独立に呼び出し、$f(x)=e$ であれば成功、それ以外は失敗とする。有限個のケースがすべて成功するとき、テスト群の全件成功とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt4-01-unit-test -->
**定義の確認**　対象を初期盤面での着手の拒否判定とします。入力は非負整数、出力は Bool です。番号9は有効範囲0〜8に含まれないので、期待出力は true（拒否）。[三目並べの着手規則](../LVT3-06/index.md#def-lvt3-06-play)を使うと初期状態は終局でなく、9<9 が偽なので play initial 9 は none。Option の isNone は none に true を返し、実測値も true です。Bool の二値は等しさを計算でき、通信や画面を起動せずに呼び出せるので条件を満たします。入力0なら空マスへの着手が成功し isNone は false です。この二つを合わせたテスト群は全件成功です。
<!-- definition-example-end -->

期待出力を対象関数自身の出力から作ると、同じ計算を二度行うだけになり、仕様の誤りを発見できません。勝利線の番号や範囲のように、規則から期待出力を独立に決めます。実行が例外で中断した場合も成功ではありません。ここで扱う純粋な関数はすべての入力で結果を返しますが、テストを実行する入出力処理では別途終了状態を観測します。

## 2. 勝利・引き分け・拒否のケースを選ぶ

[三目並べの状態](../LVT3-06/index.md#def-lvt3-06-board)と[勝利条件](../LVT3-06/index.md#def-lvt3-06-win)を再利用します。番号は上から 0,1,2 / 3,4,5 / 6,7,8。`after` は初期状態から着手列を順に実行し、拒否された操作では状態を保持します。`Wins` と `Full` は命題なので、[決定可能な命題](../LVT2-01/index.md#def-lvt2-01-decidable)を Bool に変換する `decide` を使います。

| ケース | 入力 | 期待出力を決める根拠 |
| --- | --- | --- |
| 正常な着手 | initial, 0 | 空マス、終局でない、範囲内なので isSome = true |
| 上限内 | initial, 8 | 8<9 なので isSome = true |
| 範囲外 | initial, 9 | 9<9 は偽なので isNone = true |
| 重複 | after [0], 0 | 0 は X で埋まっているので isNone = true |
| Xの勝利 | after [2,0,4,1,6] | X は 2,4,6、O は 0,1。X の反対角線が揃う |
| Oの勝利 | after [0,3,1,4,8,5] | O は 3,4,5、X は 0,1,8。O の中央行が揃う |
| 終局後 | after [2,0,4,1,6], 8 | 勝利により終局なので空いている8も拒否 |
| 引き分け | after [0,1,2,4,3,5,7,6,8] | 九マス埋まり、八線すべて混色 |

X の勝利列では4手までは両者とも最大二マス、O の勝利列では5手時点で X の集合 {0,1,8} は勝利線でなく、O は二マスです。従って勝利が決まる前に着手が打ち切られることはありません。引き分けの最終盤面は XOX / XOO / OXX、横は XOX・XOO・OXX、縦は XXO・OOX・XOX、斜めは XOX・XOO。どれも同じ印三つではありません。途中盤面で同色の三つが揃っていれば最終盤面でもその三つは変わらず残るので、途中で勝利したこともありません。各入力は相異なる番号であり、各手の前には空きがあるため、九手すべて成功します。

## 3. ソース検査と実行時の検査

`#guard` はソースの処理中に具体的な真偽を検査するコマンドです。`isSome` は some に true、none に false を返し、`isNone` はその逆です。[固定されたLeanプロジェクト](../LVT1-02/index.md#def-lvt1-02-fixed-environment)の版で次を検査します。

```lean
import LvtGame
open LvtGame

#guard (play initial 8).isSome
#guard (play initial 9).isNone
#guard decide (Wins (after [2,0,4,1,6]).board .x)
#guard !(decide (Wins (after [2,0,4,1,6]).board .o))
```

4行の期待出力は順に true、true、true、true です。最後は O の勝利が偽であることを否定演算で true にしています。`#guard` 自体は実行ファイルの中で再試験する命令ではありません。ソースをビルドするときに失敗すればビルドが止まります。

一方、実行ファイルを起動して比較するには、検査処理を `main` の中で実行します。`check` はケース名と実際の Bool、期待出力を受け取り、`!=` が true（不一致）なら `IO.userError` を発生させます。`throw` はその時点で処理を中断するので、成功メッセージには到達しません。

```lean
def check (name : String) (actual expected : Bool) : IO Unit := do
  if actual != expected then
    throw (IO.userError name)
```

[Main.lean](lab/Main.lean) は正常系に加え、`--fail` が渡された場合に意図的に誤った期待出力を比較します。通常は最後に LVT4-01 OK を出力します。実行用の設定は [lakefile.lean](lab/lakefile.lean) にあり、`test_driver` 属性が `lake test` の起動対象を指定しています。既習のゲームモデルは [LvtGame.lean](../LVT3-06/lab/LvtGame.lean) を参照するため、テスト用のコピーを別に保守する必要はありません。

リポジトリのルートから次を実行します。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT4-01/lab"
lean --version
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
```

固定版は 4.35.0。ビルドは `#guard` と型・証明の検査を行い、`lake test` は正常な実行時比較を実行します。Inspect は正常着手、範囲外拒否、X勝利、O勝利の順に true を表示し、全称命題の型と公理依存も表示します。最後のコマンドでは演習の命題を検査します。

次の二つは別々に実行する意図した失敗です。

```bash
lake env lean Failure.lean
lake exe lvtUnitDemo --fail
```

第一のコマンドは「番号9で成功する」という偽の guard を評価して失敗します。第二は正常なケースを通った後、番号9を受理すると誤って期待した比較で例外を発生させます。どちらも非正常終了を確認しますが、前者はソースの検査、後者は実行中の比較です。import 不足など別の失敗はこの実験の成功とみなしません。

## 4. 全称命題との違い

拒否条件を具体値から任意の状態へ広げましょう。`isNone` は Option の構成子を調べる関数で、`none` のときだけ true です。これにより、全称的な拒否条件とテストの観測値を直接つなげられます。

<a id="prop-lvt4-01-range-observation"></a>

<!-- formal-statement-start -->
### 命題（範囲外拒否の観測値）

三目並べの任意の状態 $s$ と非負整数 $n$ に対し、$n\ge9$ なら `(play s n).isNone = true` が成立する。ここで play は終局、範囲外、占有の順に拒否条件を調べる既習の着手関数である。
<!-- formal-statement-end -->

**証明の見取り図**　すべての範囲外入力で none を返す既習の命題を使い、その値に対して isNone を評価します。

<!-- proof-start -->
### 証明

任意の状態 $s$ と非負整数 $n\ge9$ を固定する。$n<9$ は偽である。[不正着手の拒否](../LVT3-06/index.md#prop-lvt3-06-reject)をこの状態と番号に適用すると、play s n = none。終局なら第一枝で拒否、終局でなければ第二枝で拒否するので、盤面の内容に依存しない。等式の両辺に同じ isNone を適用すると、左辺は (play s n).isNone、右辺は none.isNone = true となる。状態と番号を任意に選んだので全称命題が成立する。
<!-- proof-end -->

```lean
theorem rangeObservation (s : State) (n : Nat) (h : ¬ n < 9) :
    (play s n).isNone = true := by
  simp [reject_range s n h]
```

Lean の不等式の仮定は `¬ n < 9` という形です。`reject_range` は以前証明した拒否条件であり、`simp` が等式で左辺を none.isNone に書き換え、定義による計算を確認します。

逆に、初期状態で0と8の受理だけを試しても、9の拒否は保証されません。範囲を判断する正しい関数を `decide (n < 9)`、誤った関数を `decide (n ≤ 9)` とします。0と8では両方とも true、9では前者が false、後者が true です。[有限な例示テストと全入力一致](../LVT1-01/index.md#prop-lvt1-01-test-boundary)の逆が成り立たない具体例です。さらに10では両方 false なので、上限の直後の9を試すことが重要です。

## 5. 演習と詳細解答

### Level A

### LVT4-01-A01 範囲の境界

初期状態に8と9を渡したときの isSome を求め、期待出力付き guard を書け。

- Level: A

<!-- solution-start -->
#### 詳細解答

初期状態には勝者がなく、空マスが残る。8は 8<9 が真で、選んだマスも空なので some が返る。9は 9<9 が偽で none が返る。[三目並べの着手規則](../LVT3-06/index.md#def-lvt3-06-play)により isSome は順に true、false。

```lean
#guard (play initial 8).isSome
#guard !(play initial 9).isSome
```
<!-- solution-end -->

### LVT4-01-A02 重複と別位置

after [0] に対して0と1を入力したとき、isNone を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1手目で0にXが入り、手番はO。勝者はいない。0は範囲内だが占有済みなので none、1は範囲内で空なので some。isNone は順に true、false。[不正着手の拒否](../LVT3-06/index.md#prop-lvt3-06-reject)の占有条件も確認できる。
<!-- solution-end -->

### LVT4-01-A03 Oの勝利

着手列 0,3,1,4,8,5 の後の両者の Wins を計算し、Bool を得る guard を二行書け。

- Level: A

<!-- solution-start -->
#### 詳細解答

交互に配置すると X={0,1,8}、O={3,4,5}。5手目まで X はこの集合の部分集合、O は二マス以下なので勝利しない。最終状態で [勝利条件](../LVT3-06/index.md#def-lvt3-06-win)の中央行 (3,4,5) が O の印だけで埋まる。X の三マスはどの勝利線とも一致しない。よって O は真、X は偽。

```lean
#guard decide (Wins (after [0,3,1,4,8,5]).board .o)
#guard !(decide (Wins (after [0,3,1,4,8,5]).board .x))
```
<!-- solution-end -->

### LVT4-01-A04 終局後

反対角線で X が勝った after [2,0,4,1,6] に8を入力したとき、isSome の値と guard を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

X の印は 2,4,6、O は0,1。[勝利条件](../LVT3-06/index.md#def-lvt3-06-win)の斜め線により Finished は真。8は空でも [不正着手の拒否](../LVT3-06/index.md#prop-lvt3-06-reject)の第一条件により none となる。isSome は false。

```lean
#guard !(play (after [2,0,4,1,6]) 8).isSome
```
<!-- solution-end -->

### Level B

### LVT4-01-B01 比較の境界

受理関数を n<9 から n≤9 に誤って変更した。0,8,9,10 の各入力の Bool を比較し、誤りを検出するケースを特定せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

0と8はいずれも9未満であり9以下でもあるので両関数 true。9は 9<9 が偽、9≤9 が真であるため false と true に分かれる。10では10<9も10≤9も偽なので両方 false。したがってこの四例のうち差が出るのは9だけである。期待出力を false とする9のテストが変更を発見する。0,8,10 だけでは [有限な例示テストと全入力一致](../LVT1-01/index.md#prop-lvt1-01-test-boundary)の全件成功条件を満たしても全入力一致は従わない。
<!-- solution-end -->

### LVT4-01-B02 全称的な拒否

任意の状態 s に対して play s 12 の isNone が true であると証明し、具体的な初期盤面のテストと区別せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

12≥9 なので [範囲外拒否の観測値](#prop-lvt4-01-range-observation)に n=12 を代入すると任意の s で true。初期盤面だけに12を入力する guard は s=initial の場合を計算するだけであり、任意の状態を量化していない。

```lean
example (s : State) : (play s 12).isNone = true := by
  simp [reject_range s 12 (by decide)]
```

`by decide` が 12<9 の否定を具体的に証明する。既習の拒否定理による書換え後は none.isNone = true となる。
<!-- solution-end -->

### LVT4-01-B03 失敗の段階

Failure.lean の実験と `lake exe lvtUnitDemo --fail` の違いを、入力・期待出力・実測値・失敗段階の四点から説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

どちらも initial と9を入力し、isSome=true と誤って期待する。[着手規則](../LVT3-06/index.md#def-lvt3-06-play)より 9<9 が偽なので none、isSome=false が実測値。Failure は false の guard をソース処理中に拒否するので実行ファイルの起動まで進まない。後者はビルドされたプログラムを起動し、実測 false と期待 true の不一致を check が検出して例外を出す。単にビルド失敗しただけでは後者を観測したことにならない。
<!-- solution-end -->

### Level C

### LVT4-01-C01 引き分けを含むテスト設計

着手列 0,1,2,4,3,5,7,6,8 を独立に計算し、満盤、両者の勝利、次の着手の四つの観測値をテストせよ。テスト成功が全対局に関する証明かも述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

X は奇数番目の手で0,2,3,7,8、O は偶数番目の手で1,4,5,6。九つが互いに異なるので最終盤面の候補は XOX / XOO / OXX となる。[勝利条件](../LVT3-06/index.md#def-lvt3-06-win)の八線を調べると横は XOX・XOO・OXX、縦は XXO・OOX・XOX、斜めは XOX・XOO。各線は混色なので両者の Wins は偽。途中で勝利があれば同じ印が最終盤面でも残るため、この候補の混色と矛盾する。各手の直前にはその位置が空で、終局でもないので、候補は実際の最終盤面である。Full は真、Finished は真なので次の着手0は拒否される。

```lean
#guard decide (Full (after [0,1,2,4,3,5,7,6,8]).board)
#guard !(decide (Wins (after [0,1,2,4,3,5,7,6,8]).board .x))
#guard !(decide (Wins (after [0,1,2,4,3,5,7,6,8]).board .o))
#guard (play (after [0,1,2,4,3,5,7,6,8]) 0).isNone
```

四件の期待出力はすべて true となる。これは指定した着手列についての検査であり、全対局についての主張ではない。全到達盤面で二重勝利がないことは [到達盤面の二重勝利の排除](../LVT3-06/index.md#prop-lvt3-06-dual)の証明が保証する。
<!-- solution-end -->

全演習の具体値と B02 の全称命題は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) で検査できます。

## 6. 参考資料と次講

- [Lean 4.35.0 の Lake](https://github.com/leanprover/lean4/blob/v4.35.0/src/lake/README.md)

次講では入力を手で選ぶ代わりに、検査したい性質を決めて入力を多数生成する方法を学びます。
