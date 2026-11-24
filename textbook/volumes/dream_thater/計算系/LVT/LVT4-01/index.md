# LVT4-01 例示・単体テスト・`#guard`・Lake test

前提講座：[LVT3-08](../LVT3-08/index.md)、[LVT3-06](../LVT3-06/index.md)、[LVT1-02](../LVT1-02/index.md)。

前講までにプログラムの正当性を証明しました。しかし、仕様を書き間違えたり、別の実装へ移植するときに境界の比較を変えたりすることがあります。そこで具体的な入力と、仕様から手で求めた期待出力を保存し、変更のたびに実行します。三目並べを使って、テストが何を観測するか、どこまでを証明できるかを分けましょう。

**ブラウザで実行：** [本講の実行ラボ](../browser-lab.html?chapter=LVT4-01)。既習のゲームモデルをそのまま読み込んで実験します。Lean Web と固定版の違いに注意し、Lake の実行はラボから Codespaces を開きます（ログイン・利用枠が必要です）。

## 1. 一つの機能を具体値で検査する

[例示テスト](../LVT1-01/index.md#def-lvt1-01-example-test)では、試す入力を選び、出力を期待出力と照合しました。ここで単体とは、他の処理から分けて呼び出せる関数などの小さな検査対象です。テストケースには入力と期待出力を記録します。たとえば三目並べの勝利判定だけを調べる場合、画面表示や通信は呼び出さず、盤面とプレイヤーを関数に渡します。ここで入力全体を集合 $X$、出力全体を集合 $Y$ とし、前講の[Hoare三つ組](../LVT3-08/index.md#def-lvt3-08-hoare)と同じく、対象の計算は各入力で有限時間内に終了すると仮定します。等しさを判定するとは、二つの出力が等しいかどうかを計算で決められることです。

<a id="def-lvt4-01-unit-test"></a>

<!-- formal-statement-start -->
### 定義（単体テストの成功条件）

検査対象を関数 $f:X\to Y$ とし、各入力 $x\in X$ で実行が有限時間内に終了して一意な出力を返し、出力の等しさを計算で判定できるとする。入力 $x\in X$ と期待出力 $e\in Y$ の組 $(x,e)$ をテストケースとする。単体テストは対象の関数を独立に呼び出し、$f(x)=e$ であれば成功、それ以外は失敗とする。有限個のケースがすべて成功するとき、テスト群の全件成功とする。
<!-- formal-statement-end -->

具体例で使う記号を先に確認します。[三目並べの状態](../LVT3-06/index.md#def-lvt3-06-board)の `initial` は全マス空で手番が X の状態です。[三目並べの着手規則](../LVT3-06/index.md#def-lvt3-06-play)の `play s n` は状態 s と非負整数 n を受け取り、着手の結果を [Option型](../LVT1-03/index.md#def-lvt1-03-option)の `none`（拒否）または `some t`（成功して状態 t へ移る）で返します。これを [Leanの真偽値型](../LVT2-01/index.md#def-lvt2-01-bool)の値へ変換するため、`isNone` は none に true、some に false を返し、`isSome` はその逆を返します。末尾の `.isNone` は直前の Option 値に isNone を適用する記法です。

<!-- definition-example-start: def-lvt4-01-unit-test -->
**定義の確認**　入力集合を $X=\mathbb N_0$（Lean の Nat）、出力集合を $Y=\{\mathrm{true},\mathrm{false}\}$（Bool）とし、初期状態を固定して番号 n だけを変えます。対象関数 $f$ は `fun n : Nat => (play initial n).isNone` です。[三目並べの着手規則](../LVT3-06/index.md#def-lvt3-06-play)は有限個の判定で none または some を返し、isNone も二枝の判定で終わります。どの入力でも一意な Bool が得られます。

ゲームの規則から番号9は範囲外で拒否、番号0は空マスへの合法着手と判断し、期待出力をそれぞれ true、false とします。対象関数の計算では初期状態は終局でなく、9<9 が偽なので none。0<9 は真で、0番のマスは空なので some t（t は0への着手後の状態）です。

| 入力 | 期待出力 | 着手関数の値 | 実測値 |
| --- | --- | --- | --- |
| 9 | true | none | true |
| 0 | false | some t | false |

Bool の等しさは二値の比較で判定でき、画面や通信を介さず関数を呼び出せます。どちらの実測値も対応する期待出力に等しいため、この二件のテスト群は全件成功です。
<!-- definition-example-end -->

期待出力を対象関数自身の出力から作ると、同じ計算を二度行うだけになり、仕様の誤りを発見できません。勝利線の番号や範囲のように、規則から期待出力を独立に決めます。実行が例外で中断した場合も成功ではありません。ここで扱う純粋な関数はすべての入力で結果を返しますが、テストを実行する入出力処理では別途終了状態を観測します。

## 2. 勝利・引き分け・拒否のケースを選ぶ

[三目並べの状態](../LVT3-06/index.md#def-lvt3-06-board)と[勝利条件](../LVT3-06/index.md#def-lvt3-06-win)を再利用します。番号は上から 0,1,2 / 3,4,5 / 6,7,8。`after` は初期状態から着手列を順に実行し、拒否された操作では状態を保持します。[勝利条件](../LVT3-06/index.md#def-lvt3-06-win)の `Wins b p` は盤面 b の八本の線のどれかがプレイヤー p の印で揃うという命題、`Full b` は九マスすべてが空でないという命題、`Finished s` はどちらかの勝利または満盤という命題です。`s.board` は状態 s の盤面、`.x` と `.o` はプレイヤー X と O を表します。これらは九マスについて有限個の比較で判定でき、[証明付き判定の健全性と完全性](../LVT2-01/index.md#prop-lvt2-01-decision-bridge)に従って `decide` で命題の真偽を Bool に変換します。

| ケース | 入力 | 期待出力を決める根拠 |
| --- | --- | --- |
| 正常な着手 | initial, 0 | 空マス、終局でない、範囲内なので isSome = true |
| 上限内 | initial, 8 | 終局でなく8<9、8番も空なので isSome = true |
| 範囲外 | initial, 9 | 9<9 は偽なので isNone = true |
| 重複 | after [0], 0 | 0 は X で埋まっているので isNone = true |
| Xの勝利 | after [2,0,4,1,6] | X は 2,4,6、O は 0,1。X の反対角線が揃う |
| Oの勝利 | after [0,3,1,4,8,5] | O は 3,4,5、X は 0,1,8。O の中央行が揃う |
| 終局後 | after [2,0,4,1,6], 8 | 勝利により終局なので空いている8も拒否 |
| 引き分け | after [0,1,2,4,3,5,7,6,8] | 九マス埋まり、八線すべて混色 |

X の勝利列では4手までは両者とも最大二マス、O の勝利列では5手時点で X の集合 {0,1,8} は勝利線でなく、O は二マスです。従って勝利が決まる前に着手が打ち切られることはありません。引き分けの最終盤面は XOX / XOO / OXX、横は XOX・XOO・OXX、縦は XXO・OOX・XOX、斜めは XOX・XOO。どれも同じ印三つではありません。この盤面をまず九手すべてを配置した候補として計算します。各入力は相異なる番号なので、途中の配置は候補の部分配置です。[一マス更新の保存性](../LVT3-06/index.md#prop-lvt3-06-write)により、同色の勝利線が途中にあれば候補にも残りますが、八線すべて混色なのでそのような線はありません。第 k 手の直前（1≤k≤9）は k−1 マスしか埋まっておらず、満盤でもありません。したがって順に [合法着手の必要十分条件](../LVT3-06/index.md#prop-lvt3-06-success)を適用でき、九手すべて成功して候補どおりになります。

## 3. ソース検査と実行時の検査

`#guard` はソースの処理中に具体的な真偽を検査するコマンドです。true なら検査が通り、false ならエラーになります。`!` は Bool の否定で、true と false を交換します。[固定されたLeanプロジェクト](../LVT1-02/index.md#def-lvt1-02-fixed-environment)の版で次を検査します。

```lean
import LvtGame
open LvtGame

#guard (play initial 8).isSome
#guard (play initial 9).isNone
#guard decide (Wins (after [2,0,4,1,6]).board .x)
#guard !(decide (Wins (after [2,0,4,1,6]).board .o))
```

4行で検査する Bool の期待出力はすべて true です。`#guard` は成功時にその値を表示するコマンドではありません。値を表示するには `#eval` を使います。最後は O の勝利が偽であることを否定演算で true にしています。`#guard` 自体は実行ファイルの中で再試験する命令ではありません。ソースをビルドするときに失敗すればビルドが止まります。

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

任意の状態 $s$ と非負整数 $n\ge9$ を固定する。$n<9$ は偽である。[不正着手の拒否](../LVT3-06/index.md#prop-lvt3-06-reject)をこの状態と番号に適用する。終局なら第一枝で none、終局でなければ第二枝で none なので、いずれの場合も `play s n = none` が成立する。

[関数適用に関する等式の合同性](../LVT2-03/index.md#prop-lvt2-03-congr)により、等式の両辺に Option State から Bool への関数 isNone を適用する。すると

```lean
(play s n).isNone = (none : Option State).isNone
```

となる。右辺は isNone の none の枝の値 true に等しい。よって `(play s n).isNone = true` となる。状態と番号を任意に選んだので全称命題が成立する。
<!-- proof-end -->

```lean
theorem rangeObservation (s : State) (n : Nat) (h : ¬ n < 9) :
    (play s n).isNone = true := by
  simp [reject_range s n h]
```

数学の $n\ge9$ は、非負整数の大小関係では $n<9$ が成立しないことと同値です。Lean の `¬ n < 9` はこの後者を表し、`h` はその証明です。`s` と `n` は任意の入力であり、`h` は n についての条件を与えます。`reject_range` は以前証明した拒否条件であり、`simp` が等式で左辺を none.isNone に書き換え、定義による計算を確認します。

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

`by decide` は具体的な命題 `¬ 12 < 9` を証明する。[不正着手の拒否](../LVT3-06/index.md#prop-lvt3-06-reject)の `reject_range` に s、12、その証明を渡すと `play s 12 = none` が得られる。書換え後の目標は `none.isNone = true` であり、isNone の定義で成立する。
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

X は奇数番目の手で0,2,3,7,8、O は偶数番目の手で1,4,5,6。九つが互いに異なるので最終盤面の候補は XOX / XOO / OXX となる。[勝利条件](../LVT3-06/index.md#def-lvt3-06-win)の八線を調べると横は XOX・XOO・OXX、縦は XXO・OOX・XOX、斜めは XOX・XOO。各線は混色なので両者の Wins は偽。[一マス更新の保存性](../LVT3-06/index.md#prop-lvt3-06-write)より、途中で勝利があれば同じ印が候補の盤面にも残るため、八線が混色であることと矛盾する。第 k 手の直前は k−1 マスだけ埋まり（1≤k≤9）、満盤でなく、選んだマスも空である。初期状態から各手の番号は0〜8であり、順に [合法着手の必要十分条件](../LVT3-06/index.md#prop-lvt3-06-success) が成立するので、候補は実際の最終盤面となる。九マスすべて埋まったので Full は真、[勝利条件と終局条件](../LVT3-06/index.md#def-lvt3-06-win)から Finished も真であり、[不正着手の拒否](../LVT3-06/index.md#prop-lvt3-06-reject)により次の着手0は拒否される。

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
