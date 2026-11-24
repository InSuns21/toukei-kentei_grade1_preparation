# LVT1-04 パターン照合・再帰・停止性

前講では[帰納型](../LVT1-03/index.md#def-lvt1-03-inductive-type)の構成子に応じて処理を選びました。盤面を一マスずつ読むには、二つのマスだけでなく任意の有限個のマスを扱う関数が欲しくなります。今回は自然数のリストを使い、残りの入力を小さくして同じ計算を繰り返す方法を学びます。

前提：[LVT1-03](../LVT1-03/index.md)。到達点は、リストの構成子で分岐し、再帰呼出しを手で追い、停止性の根拠を指定し、停止性エラーを修正することです。

## 1. 空の列と先頭・残りの列

リストは有限個の値を順に並べたものです。同じ値を複数回並べても構いません。Lean の List Nat は自然数のリストの型です。空のリストを []、先頭の値 x と残りのリスト xs を組み合わせる構成子を x :: xs と書きます。例えば [2, 4, 1] は 2 :: (4 :: (1 :: [])) の短い記法です。:: は右側から結合します。

<a id="def-lvt1-04-list-constructors"></a>

<!-- formal-statement-start -->
### 定義（リストの再帰的構成）

型 A に対する List A は、空のリスト nil と、A 型の値 x および List A 型の値 xs を受け取る cons x xs により有限回の構成で得られる帰納型である。nil は []、cons x xs は x :: xs と書ける。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-04-list-constructors -->
**定義の確認**　A を Nat とすると、[] は nil によって作れます。1 :: [] は 1 と空のリストから作れ、4 :: (1 :: []) は 4 とその結果から作れます。さらに 2 を先頭に置けば [2, 4, 1] です。各段で先頭は Nat、残りは List Nat になり、有限の三段で構成が終わります。true :: ([] : List Nat) は先頭が Bool なのでこの型のリストにはなりません。
<!-- definition-example-end -->

パターン照合は、値を構成子の形と比較して、対応する枝を選び、その構成子の引数を変数に結び付ける操作です。前講の match と同じ考え方です。次の二つの枝では、空かどうかを判定するだけでなく、空でなければ x と xs を取り出せます。

~~~lean
def firstOrZero (xs : List Nat) : Nat :=
  match xs with
  | [] => 0
  | x :: _ => x
~~~

_ は値を使わない位置です。firstOrZero [2, 4, 1] は 2、firstOrZero [] は 0 です。二つの枝でリストの全構成子を扱います。しかし、先頭だけ取り出してもリスト全体の合計はまだ求まりません。

## 2. 構造を小さくして計算する

合計を求めるには、空なら 0、空でなければ先頭に残りの合計を加えます。関数の定義の中で同じ関数を呼び出すことが再帰です。リストの残り xs は x :: xs を構成する際に用いた、元のリストより短い部分です。このような構成子の内部の値に対して再帰する方法を考えます。

<a id="def-lvt1-04-structural-recursion"></a>

<!-- formal-statement-start -->
### 定義（構造再帰）

有限の構成子によって作られる帰納型の値を引数とする再帰定義において、各再帰呼出しの減少対象が元の値の構成子の内部にある真の部分であるとき、その引数についての構造再帰という。リストの場合、空でない値 x :: xs から残りの xs への呼出しがその例である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-04-structural-recursion -->
**定義の確認**　[リストの再帰的構成](#def-lvt1-04-list-constructors) により、[2, 4, 1] の cons の内部には 2 と [4, 1] があるので、残り [4, 1] への呼出しは条件を満たします。次は [1]、次は [] となります。空のリストでは再帰せず結果を返します。一方、同じ [2, 4, 1] を再び渡すだけでは真の部分へ移っていません。
<!-- definition-example-end -->

~~~lean
def sumList : List Nat → Nat
  | [] => 0
  | x :: xs => x + sumList xs
~~~

この書き方では引数の形に応じた枝を直接並べています。空の枝を基底の場合、もう一方を再帰の場合といいます。入力 [2, 4, 1] を手で展開すると、

~~~
sumList [2, 4, 1]
= 2 + sumList [4, 1]
= 2 + (4 + sumList [1])
= 2 + (4 + (1 + sumList []))
= 2 + (4 + (1 + 0))
= 7
~~~

となります。再帰呼出しの結果が返る順は、空から [1]、[4, 1]、元のリストへと逆向きです。

<a id="prop-lvt1-04-sum-branches"></a>

<!-- formal-statement-start -->
### 命題（リスト合計の計算規則）

sumList : List Nat → Nat を、空のリストで 0 を返し、x :: xs で x + sumList xs を返す構造再帰関数とする。任意の自然数 x と有限の自然数リスト xs に対し、sumList [] = 0 および sumList (x :: xs) = x + sumList xs が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　両辺を具体的な数まで計算する必要はありません。構成子で枝を選べば、右辺の式がそのまま得られます。

<!-- proof-start -->
### 証明

[リストの再帰的構成](#def-lvt1-04-list-constructors) によって、空の場合は第一枝を選ぶ。第一枝の右辺は 0 なので第一の等式が成り立つ。

x :: xs の場合は第二枝を選ぶ。第二枝の局所変数に与えられた x と xs がそれぞれ入るため、右辺は x + sumList xs である。残りのリストの値を具体化する必要はない。これは第二の等式そのものである。

~~~lean
theorem sum_nil : sumList [] = 0 := rfl

theorem sum_cons (x : Nat) (xs : List Nat) :
    sumList (x :: xs) = x + sumList xs := rfl
~~~

rfl は定義に従う簡約で両辺が同じ式になるときの等式の証明である。ここでは任意の x と xs について第二枝の選択だけで両辺が一致する。
<!-- proof-end -->

## 3. 停止する理由を数で示す

再帰が有限回で終わって結果を返す性質を停止性といいます。計算のたびに残りのリストが一つ短くなるなら、最初の長さより多くは短くできません。この理由を、リスト以外の引数にも使える形にします。

<a id="def-lvt1-04-decreasing-measure"></a>

<!-- formal-statement-start -->
### 定義（自然数値の減少尺度）

再帰関数の各呼出しの引数の組を u とする。各 u に非負整数 m(u) を割り当て、どの再帰呼出し u から v に対しても m(v) が m(u) より真に小さくなるとき、m をその再帰の自然数値の減少尺度とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-04-decreasing-measure -->
**定義の確認**　sumList の引数 u はリストです。m(u) を要素数にすると、[2, 4, 1] から [4, 1]、[1]、[] への呼出しで尺度は順に 3, 2, 1, 0 になります。どれも非負整数であり、任意の x :: xs で残りの要素数は元より正確に 1 小さくなるので、具体例だけでなくすべての再帰枝で条件を満たします。
<!-- definition-example-end -->

<a id="prop-lvt1-04-descent"></a>

<!-- formal-statement-start -->
### 命題（自然数の真の減少による停止）

各呼出しの再帰以外の処理が有限時間で終わり、各呼出しで次の再帰呼出しが高々一つである再帰関数を考える。自然数値の減少尺度 m が存在するなら、初期尺度が M の入力に対して再帰呼出しの回数は高々 M 回であり、計算は停止する。最初の呼出しはこの回数に含めない。
<!-- formal-statement-end -->

**証明の見取り図**　非負整数を真に減らすには毎回少なくとも 1 を引く必要があります。尺度 0 からさらに真に減少する非負整数は存在しません。

<!-- proof-start -->
### 証明

初期尺度を M とする。[自然数値の減少尺度](#def-lvt1-04-decreasing-measure) の条件から、一回の再帰呼出しの前後の尺度を a, b とすると、整数で b < a だから b ≤ a − 1 である。最初の一回の後は高々 M − 1、二回の後は高々 (M − 1) − 1 = M − 2 である。

これを k 回繰り返すと、k 回後の尺度は高々 M − k となる。実際、k 回後にこの上界が成立するなら次の一回の後は高々 M − k − 1 = M − (k + 1) となり、初期状態 k = 0 から順に上界が保たれる。

尺度は常に 0 以上なので、k = M + 1 回の呼出しが存在すると 0 ≤ −1 となり矛盾する。したがって再帰呼出しの列は高々 M 回で終わる。各呼出しの再帰以外の処理も有限時間で終わるため、最後の呼出しから順に結果が返り、初期の計算も終了する。
<!-- proof-end -->

ここでは一回の呼出しから高々一つの再帰呼出しを行う場合を扱いました。複数の再帰呼出しがある場合、尺度は呼出しの深さの上界を与えますが、呼出しの総数を同じ上界で抑えられるとは限りません。

## 4. 構造で見えない減少をLeanに伝える

自然数 n から 2 を引ける間だけ引き続け、最後の 0 または 1 を返す関数を作ります。入力 n は非負整数で、Nat の引算は負の結果を 0 とする引算です。n が 2 以上の枝では通常の整数の引算と一致します。

~~~lean
def byTwos (n : Nat) : Nat :=
  if n < 2 then n else byTwos (n - 2)
termination_by n
decreasing_by omega
~~~

if は条件に応じて二つの枝を選びます。n < 2 ならそのまま n を返します。そうでなければ n ≥ 2 なので、n − 2 は非負かつ n より小さい値です。[自然数の真の減少による停止](#prop-lvt1-04-descent) により停止します。

termination_by n は停止性の検査に使う尺度として n を指定します。decreasing_by は、再帰呼出しの尺度が小さくなるという証明責務を解く部分です。omega は自然数・整数の線形な算術関係を自動的に証明する手続きで、ここでは n ≥ 2 から n − 2 < n を証明します。この手続き自体の構成を知る必要はありません。Lean が検査する証明を生成します。

7 を渡すと 7 → 5 → 3 → 1 で停止して 1 を返し、6 では 6 → 4 → 2 → 0 で停止して 0 を返します。0 と 1 は最初から停止します。この計算は停止性の証明とは別に、どんな値が返るかを確認するものです。

## 5. 停止性エラーを修正する

~~~lean
def loop (n : Nat) : Nat := loop n
~~~

この定義は普通の def として受理されません。同じ n を渡すため、尺度 n は減少せず、基底の場合もありません。型の形は Nat → Nat ですが、この式では結果を返す段階に到達しません。

例えば、自然数が 0 なら 0 を返し、それ以外なら一つ小さい自然数に対して再帰する次の関数に変更できます。

~~~lean
def down : Nat → Nat
  | 0 => 0
  | Nat.succ n => down n
~~~

Nat.succ n は n の次の自然数、つまり n + 1 を表す構成子です。入力が 3 なら n = 2、次は 1、最後は 0 です。構造再帰であり、尺度を入力値とすれば [自然数の真の減少による停止](#prop-lvt1-04-descent) の条件を満たします。

停止しても欲しい値が返るとは限りません。例えば合計を求めたいのに常に 0 を返す関数は停止しますが [2, 4, 1] の合計 7 を返しません。停止する根拠と、返す値についての仕様を別々に確かめます。

## 6. Leanで実験する

[固定されたLeanプロジェクト](../LVT1-02/index.md#def-lvt1-02-fixed-environment) として、Lean v4.35.0 と外部依存のない lab を用意しました。リポジトリのルートから次を実行してください。

~~~bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT1-04/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
~~~

LvtRecursion.lean に再帰関数と二つの等式証明があります。Main.lean の #guard は空・単一要素・複数要素の合計、偶数・奇数・境界値の byTwos、down の値を検査します。lake test の期待出力は LVT1-04 OK です。Inspect.lean の #eval は順に 7, 1, 0, 0 を表示します。

~~~bash
lake env lean Failure.lean
~~~

この最後のコマンドは意図的に停止性エラーを発生させます。Failure.lean の loop は再帰引数を変えません。import 失敗などではなく停止性の診断であることを確かめてください。修正例は down です。Failure.lean の loop の定義を down の二枝の定義に置き換えて、Lean が受理することを確認し、実験後は元に戻します。

## 7. 演習

### Level A

### LVT1-04-A01 構成子を読む

自然数リスト [3, 0, 2] を [] と :: のみで表し、先頭と残りを答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[リストの再帰的構成](#def-lvt1-04-list-constructors) から、まず 2 :: []、次に 0 :: (2 :: [])、最後に 3 :: (0 :: (2 :: [])) と作る。先頭は 3、残りは [0, 2] である。0 は自然数なので要素の型を満たす。
<!-- solution-end -->

### LVT1-04-A02 合計を展開する

sumList [3, 0, 2] を再帰の各段階を示して計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[リスト合計の計算規則](#prop-lvt1-04-sum-branches) の第二枝を三回使い、第一枝で終える。

~~~
sumList [3, 0, 2]
= 3 + sumList [0, 2]
= 3 + (0 + sumList [2])
= 3 + (0 + (2 + sumList []))
= 3 + (0 + (2 + 0))
= 5
~~~
<!-- solution-end -->

### LVT1-04-A03 尺度を追う

sumList [9, 8] の初期呼出しを含む引数の列、要素数の列、再帰呼出しの回数を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

最初の引数 [9, 8] から残り [8]、さらに [] へ移り、空の枝で停止する。要素数は 2, 1, 0。初期呼出しを除くので再帰呼出しは二回である。[自然数の真の減少による停止](#prop-lvt1-04-descent) の上界 M = 2 に一致する。
<!-- solution-end -->

### LVT1-04-A04 二ずつ減らす

byTwos 8 と byTwos 5 を手で計算し、最後に選ばれる枝を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

8 は 2 以上なので 6、4、2、0 へ移る。0 < 2 なので最初の枝から 0 が返り、各再帰呼出しも 0 を返す。5 は 3、1 へ移り、1 < 2 なので最初の枝で 1 を返す。どちらも負の自然数を作ることはない。
<!-- solution-end -->

### Level B

### LVT1-04-B01 真の個数を数える

List Bool を受け取り、true の個数を返す countTrue を構造再帰で実装せよ。[true, false, true] と [] の結果を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

空の枝では 0。空でない場合は先頭 b の寄与を、true なら 1、false なら 0 とし、残り bs に対する再帰結果へ加える。

~~~lean
def countTrue : List Bool → Nat
  | [] => 0
  | b :: bs => (if b then 1 else 0) + countTrue bs
~~~

[構造再帰](#def-lvt1-04-structural-recursion) の条件は、再帰引数 bs が元の b :: bs の残りであるため満たされる。入力 [true, false, true] では 1 + countTrue [false, true]、次は 1 + (0 + countTrue [true])、次は 1 + (0 + (1 + countTrue [])) となる。空の枝は 0 なので合計は 2。空の入力だけなら 0 である。
<!-- solution-end -->

### LVT1-04-B02 計算規則を証明する

B01 の countTrue について任意の List Bool 型の値 bs に対し、countTrue (false :: bs) = countTrue bs をLeanで証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

第二枝に b = false を代入すると (if false then 1 else 0) + countTrue bs となる。if の結果は 0 であるので左辺は 0 + countTrue bs になる。Nat の零加算の定理 Nat.zero_add は任意の自然数 k に対して 0 + k = k と述べる。k に countTrue bs を選べば目的の等式が得られる。Leanでは change で目標を定義に従って展開した形に変え、exact でその定理を与える。

~~~lean
theorem count_false (bs : List Bool) :
    countTrue (false :: bs) = countTrue bs := by
  change 0 + countTrue bs = countTrue bs
  exact Nat.zero_add (countTrue bs)
~~~

bs の具体値を選んでいないので、任意の有限リストについての証明である。
<!-- solution-end -->

### LVT1-04-B03 減少しない枝を直す

次の関数を、自然数 n から 3 を引ける間だけ引き、残りの値を返す関数へ修正せよ。停止性の理由と入力 10, 2 の結果を説明せよ。

~~~lean
def badThree (n : Nat) : Nat :=
  if n < 3 then n else badThree n
~~~

- Level: B

<!-- solution-start -->
#### 詳細解答

else の枝では n ≥ 3 だが、元の定義では n が変わらず次の呼出しも同じ枝に入る。再帰引数を n − 3 に変更する。

~~~lean
def byThrees (n : Nat) : Nat :=
  if n < 3 then n else byThrees (n - 3)
termination_by n
decreasing_by omega
~~~

n ≥ 3 なら n − 3 ≥ 0 であり、n − 3 < n である。[自然数の真の減少による停止](#prop-lvt1-04-descent) を尺度 n に適用できる。10 → 7 → 4 → 1 となり 1 を返す。2 は最初から 2 < 3 なので 2 を返す。
<!-- solution-end -->

### Level C

### LVT1-04-C01 探索を終了させる

自然数のリストから最初に現れる正の値を Option Nat で返す firstPositive を作れ。空の場合と正の値を見つけた場合は再帰しない。すべての入力について停止する理由を示し、[0, 0, 4, 6] と [0, 0] の結果、再帰呼出しの回数を求めよ。正の値を見つけた後も探索を続ける実装が要求と異なる理由も述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

[Option型](../LVT1-03/index.md#def-lvt1-03-option) は値がなければ none、値があれば some を使える。空なら正の値はないので none。先頭 x が正なら some x、そうでなければ残り xs を調べる。

~~~lean
def firstPositive : List Nat → Option Nat
  | [] => none
  | x :: xs => if x > 0 then some x else firstPositive xs
~~~

再帰呼出しが起きるのは x が 0 の枝だけである。このとき xs の要素数は x :: xs の要素数より 1 小さく、[自然数値の減少尺度](#def-lvt1-04-decreasing-measure) の条件を満たす。各枝の再帰以外の処理は比較と値の構成で有限時間に終わり、再帰呼出しは高々一つである。したがって [自然数の真の減少による停止](#prop-lvt1-04-descent) により初期の要素数を上界として停止する。

[0, 0, 4, 6] では先頭 0 を二回読み飛ばして [4, 6] へ移る。4 > 0 なので some 4 を返し、残り [6] は調べない。再帰呼出しは二回。[0, 0] では [0]、[] へ二回移り、none を返す。正の値を見つけた後に再帰結果をそのまま返す実装なら、例えば [4, 6] で後方の 6 を返したり、[4] で none を返したりして最初の正の値を返す仕様を破る。また正の値を保存してから探索を続けても、この問題の「見つけたら再帰しない」という条件は満たさない。停止性だけでは返り値や不要な呼出しの有無は決まらない。
<!-- solution-end -->

## 8. 参考資料と次講

- [The Lean Language Reference](https://lean-lang.org/doc/reference/latest/)

次講は List・Array・Fin による盤面表現と安全な添字です。今回は先頭と残りで計算を進め、次は位置を指定して要素を扱います。
