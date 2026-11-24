# LVT3-07 抽象仕様・詳細化・モデルとの対応

前講では[三目並べの着手規則](../LVT3-06/index.md#def-lvt3-06-play)を一つの関数として定め、その関数が守る性質を証明しました。しかし、仕様を満たす製品は一通りの内部表現で書かれるとは限りません。例えば容量2の記憶装置で利用者が知りたいのは空・一個・満杯の区別であり、内部では二つの枠を別々の真偽値で管理できます。内部状態を変更しても同じ操作結果を返すには何を証明すればよいでしょうか。

**ブラウザで実行：** [本講の実行ラボ](../browser-lab.html?chapter=LVT3-07)。Inspect では状態の違いと、満杯での拒否を含む応答列を観察できます。

## 1. 同じ意味を持つ二つの状態

利用者から見える情報だけを残すものを抽象状態、実行のために保持する情報を具体状態とします。枠の内容は区別せず、各枠が埋まっているかだけを扱います。空を false、使用中を true とし、具体状態を左・右の順で表します。以下では 0,1 をそれぞれ false,true の略記に使います。抽象側の三状態を E（空）、O（一個）、F（満杯）と書きます。具体側のどの状態が抽象側のどの意味を表すかを決める関数を用意します。

<a id="def-lvt3-07-decode"></a>

<!-- formal-statement-start -->
### 定義（抽象状態と具体状態の対応）

抽象状態の集合を A = {E,O,F}、具体状態の集合を C = {0,1} × {0,1} とする。具体状態の抽象的意味を与える写像 d : C → A を次の表で定める。

| c | d(c) |
|---|---|
| (0,0) | E |
| (1,0) | O |
| (0,1) | O |
| (1,1) | F |

初期状態は抽象側で E、具体側で (0,0) とする。a が c に対応するとは a = d(c) が成り立つことである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-07-decode -->
**定義の確認**　具体状態 (1,0) と (0,1) は第一成分が異なるので別の状態である。どちらも使用中の枠が一個なので d(1,0) = O、d(0,1) = O。従って同じ抽象状態に対応する。四つの入力の各々に表の行が一つあるので d は全域的な関数である。E,O,F のいずれにも対応する具体状態があり、初期状態の対応 d(0,0) = E も成立する。
<!-- definition-example-end -->

抽象状態から具体状態を逆に一意に決めることはできません。一個という情報だけではどちらの枠が埋まっているか分からないからです。このように実装の自由度を残すことが、仕様と実装を分ける理由です。

## 2. 仕様と実装の一操作

操作は put（一個追加）、take（一個取り出す）の二種類です。空から取り出すことと、満杯へ追加することは拒否します。結果は[Option型](../LVT1-03/index.md#def-lvt1-03-option)で表し、成功なら some に次状態を入れ、拒否なら none を返します。拒否の場合はまだ次状態を返していない点に注意してください。

抽象仕様は個数だけで結果を決めます。実装側は空き枠を左から探して追加し、埋まった枠を左から探して取り出します。ここでいう仕様は実装の分岐から逆算せず、容量と操作の要求から先に決めます。

<a id="def-lvt3-07-steps"></a>

<!-- formal-statement-start -->
### 定義（抽象仕様と具体実行の操作規則）

状態 A,C と写像 d は[抽象状態と具体状態の対応](#def-lvt3-07-decode)のもの、操作の集合を U = {put,take} とする。仕様 S : A × U → Option A、実装 I : C × U → Option C を次の表で定める。

| 抽象状態 | S(状態,put) | S(状態,take) |
|---|---|---|
| E | some O | none |
| O | some F | some E |
| F | none | some O |

| 具体状態 | I(状態,put) | I(状態,take) |
|---|---|---|
| (0,0) | some (1,0) | none |
| (1,0) | some (1,1) | some (0,0) |
| (0,1) | some (1,1) | some (0,0) |
| (1,1) | none | some (0,1) |

各操作は表により全ての状態で結果が定まる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-07-steps -->
**定義の確認**　c = (1,1) に take を適用する。左枠が使用中なのでそこを空け、右枠は変更せず I(c,take) = some (0,1) となる。抽象側は F から一個減るので S(F,take) = some O。d(0,1) = O であり、取り出した後も対応する。満杯で put すると左右の空き検査が両方失敗し、I(c,put) = none。仕様側も容量超過なので S(F,put) = none。
<!-- definition-example-end -->

ここでの取り出しは枠を一つ空ける操作です。値の順序を返すキューではありません。保存する情報を変えると、同じ対応写像では仕様を表し切れないことがあります。

## 3. 一操作の対応を証明する

実装の結果が some c' なら d(c') へ写して some d(c') とし、none ならそのまま none とします。これを Option 上の写像 D とします。Lean の Option.map decode がこの働きをします。操作の前だけでなく、結果も抽象側で一致することを要求します。この条件を満たすと、具体的な操作規則は抽象仕様の詳細化として利用できます。

<a id="def-lvt3-07-refinement"></a>

<!-- formal-statement-start -->
### 定義（操作結果の詳細化条件）

状態集合 A,C、共通操作集合 U、対応写像 d : C → A、仕様 S : A × U → Option A、実装 I : C × U → Option C を考える。Option 上の写像 D : Option C → Option A は D(none) = none、D(some c') = some d(c') とする。

具体初期状態 c₀ と抽象初期状態 a₀ の対応 d(c₀) = a₀、および任意の c ∈ C、u ∈ U について次の等式が成立することを、ここでの詳細化条件とする。

$$
D(I(c,u))=S(d(c),u).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-07-refinement -->
**定義の確認**　c = (0,1)、u = put では I(c,u) = some (1,1) なので D(I(c,u)) = some F。d(c) = O だから S(O,put) = some F であり一致する。c = (0,0)、u = take では I(c,u) = none なので D(I(c,u)) = none = S(E,take)。初期状態は d(0,0) = E。残りの入力も確認すれば全称条件が成立する。
<!-- definition-example-end -->

この等式の利点は、成功時の次状態の対応だけでなく、成功か拒否か自体も比較することです。図式としては「実装してから抽象化」と「抽象化してから仕様を実行」の二経路が同じ Option A に到着します。

<a id="prop-lvt3-07-step"></a>

<!-- formal-statement-start -->
### 命題（一操作の対応保存）

[抽象状態と具体状態の対応](#def-lvt3-07-decode)および[抽象仕様と具体実行の操作規則](#def-lvt3-07-steps)に対して、[操作結果の詳細化条件](#def-lvt3-07-refinement)が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　初期状態の対応を確かめた後、具体状態四種類と操作二種類の八通りに分け、D を適用した結果と S の結果を照合します。

<!-- proof-start -->
### 証明

初期状態は d(0,0) = E。任意の c,u を取る。操作規則から I を計算し、D の定義に従って some の中身だけを d で写す。一方 S には表の d(c) を入力する。

| c | u | I(c,u) | D(I(c,u)) | S(d(c),u) |
|---|---|---|---|---|
| (0,0) | put | some (1,0) | some O | some O |
| (0,0) | take | none | none | none |
| (1,0) | put | some (1,1) | some F | some F |
| (1,0) | take | some (0,0) | some E | some E |
| (0,1) | put | some (1,1) | some F | some F |
| (0,1) | take | some (0,0) | some E | some E |
| (1,1) | put | none | none | none |
| (1,1) | take | some (0,1) | some O | some O |

具体状態は二つの真偽値の全組合せ、操作は二構成子だけなので、この八行が全入力を尽くす。第四列と第五列は全行で一致する。これと初期状態の対応により結論が成立する。

Lean では二つの Bool と Op を順に cases で分解し、各枝で関数を簡約すると左右が同じ項になるので rfl が使える。

```lean
theorem step_comm (c : Slots) (a : Op) :
    (impl c a).map decode = spec (decode c) a := by
  cases c with
  | mk l r => cases l <;> cases r <;> cases a <;> rfl
```
<!-- proof-end -->

具体側の状態は異なっていても抽象側の結果が一致すればよいという条件です。例えば満杯から右枠を先に空ける別実装も、同じ成功応答と抽象状態 O を返せば仕様と矛盾しません。

## 4. 拒否を含む操作列

利用者は失敗した操作の後も次の操作を送るかもしれません。そこで、none なら状態を保持するという実行方法を双方で採用します。さらに利用者に見せる成功・拒否の記録を真偽値のリストとして残します。最終状態だけでなく、全ての応答が一致することを目標にします。

<a id="def-lvt3-07-trace"></a>

<!-- formal-statement-start -->
### 定義（拒否を含む有限操作列の観測）

状態集合 A,C、操作集合 U、関数 S,I は[抽象仕様と具体実行の操作規則](#def-lvt3-07-steps)のものとする。添字 X が A のとき T_X = S、C のとき T_X = I と書く。状態 x ∈ X、操作 u ∈ U に対して、次状態 n_X(x,u) は T_X(x,u) = some y なら y、none なら x とする。応答 b_X(x,u) は some のとき true、none のとき false とする。

有限操作列 L（空列 [] または先頭 u と残り L' からなる u :: L'）に対する最終状態 R_X と応答列 B_X を次の再帰で定める。

$$
R_X(x,[])=x,\qquad B_X(x,[])=[]
$$

$$
R_X(x,u::L')=R_X(n_X(x,u),L')
$$

$$
B_X(x,u::L')=b_X(x,u)::B_X(n_X(x,u),L')
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-07-trace -->
**定義の確認**　初期状態から列 put,put,put,take を実行する。具体側では (0,0) → (1,0) → (1,1) → (1,1) → (0,1)。第三操作は none なので状態を保持する。抽象側は E → O → F → F → O。両側の応答列は [true,true,false,true]、最終状態の対応は d(0,1) = O。空列なら初期状態をそのまま返し、応答列は空となる。
<!-- definition-example-end -->

Lean の getD は some の値を取り出し、none なら指定の既定値を返します。本講の既定値は移動前の状態です。isSome は some の場合だけ true を返します。従って n_C は advanceC、b_C は (impl c u).isSome で書けます。抽象側も同じ方法で定義します。

<a id="prop-lvt3-07-advance"></a>

<!-- formal-statement-start -->
### 命題（次状態と応答の対応保存）

[操作結果の詳細化条件](#def-lvt3-07-refinement)を満たす本講の状態機械に対し、任意の c ∈ C、u ∈ U で[拒否を含む有限操作列の観測](#def-lvt3-07-trace)の一操作の次状態と応答は次を満たす。

$$
d(n_C(c,u))=n_A(d(c),u)
$$

$$
b_C(c,u)=b_A(d(c),u).
$$
<!-- formal-statement-end -->

**証明の見取り図**　実装の結果が some か none かの二場合だけで十分です。一操作の等式で抽象仕様の結果を決めます。

<!-- proof-start -->
### 証明

c,u を任意に取る。[一操作の対応保存](#prop-lvt3-07-step)により D(I(c,u)) = S(d(c),u)。

I(c,u) = some c' の場合、D の規則から S(d(c),u) = some d(c')。従って n_C(c,u) = c'、n_A(d(c),u) = d(c') である。

$$
d(n_C(c,u))=d(c')=n_A(d(c),u).
$$

両側とも some を返すので b_C(c,u) = true = b_A(d(c),u)。

I(c,u) = none の場合、D(none) = none なので S(d(c),u) = none。状態保持の規則から n_C(c,u) = c、n_A(d(c),u) = d(c) であり、

$$
d(n_C(c,u))=d(c)=n_A(d(c),u).
$$

両側とも none を返すので b_C(c,u) = false = b_A(d(c),u)。Option C の二構成子を尽くしたので結論を得る。
<!-- proof-end -->

一操作で次状態と応答が一致したことを、何回でも繰り返し使える形にします。

<a id="prop-lvt3-07-trace"></a>

<!-- formal-statement-start -->
### 命題（有限操作列の対応保存）

[操作結果の詳細化条件](#def-lvt3-07-refinement)を満たす本講の状態機械について、任意の具体状態 c ∈ C と有限操作列 L に対し、[拒否を含む有限操作列の観測](#def-lvt3-07-trace)の最終状態と応答列は次を満たす。

$$
d(R_C(c,L))=R_A(d(c),L)
$$

$$
B_C(c,L)=B_A(d(c),L).
$$

特に c = (0,0) とすると抽象初期状態 E からの実行と対応する。
<!-- formal-statement-end -->

**証明の見取り図**　[Leanのリストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list)を操作列に適用する。最初の操作で対応が保たれ、残りの列には更新後の状態を入れて帰納仮定を使う。帰納仮定で具体状態を固定しないことが要点です。

<!-- proof-start -->
### 証明

L に関する帰納法を行い、各段で任意の c について二つの等式を示す。

空列なら R_C(c,[]) = c、R_A(d(c),[]) = d(c)、B_C(c,[]) = [] = B_A(d(c),[]) だから成立する。

L = u :: L' の場合、任意の z ∈ C について残りの列 L' で二等式が成り立つと仮定する。c を任意に選び、z = n_C(c,u) と置く。[次状態と応答の対応保存](#prop-lvt3-07-advance)により d(z) = n_A(d(c),u) と b_C(c,u) = b_A(d(c),u) を得る。

再帰定義により、最終状態について

$$
d(R_C(c,u::L'))=d(R_C(z,L')).
$$

帰納仮定の状態を z に選ぶと右辺は R_A(d(z),L') になる。ここへ d(z) の等式を代入し、抽象側の再帰定義に戻す。

$$
R_A(d(z),L')=R_A(n_A(d(c),u),L')
$$

$$
=R_A(d(c),u::L').
$$

応答列も、まず再帰定義で先頭と残りに分ける。

$$
B_C(c,u::L')=b_C(c,u)::B_C(z,L').
$$

帰納仮定から B_C(z,L') = B_A(d(z),L')。先頭応答の等式も代入すると

$$
=b_A(d(c),u)::B_A(d(z),L')
$$

$$
=b_A(d(c),u)::B_A(n_A(d(c),u),L')
$$

$$
=B_A(d(c),u::L').
$$

従って任意の c に関する命題が保存され、有限操作列すべてについて成立する。初期状態では d(0,0) = E を代入する。
<!-- proof-end -->

任意の有限操作列に対して成立するので、列の長さに上限を置く必要はありません。また任意の途中までの列も有限操作列であり、同じ命題を適用すれば途中の抽象状態も一致します。この結論は無限列が停止することや、並行実行時の順序についての証明ではありません。

## 5. 最終状態だけでは見つからない誤実装

満杯時の put だけを変更し、拒否する代わりに some (1,1) を返す実装を I_bad とします。ほかの分岐は I のままです。c = (1,1)、u = put では

$$
D(I_{\mathrm{bad}}(c,u))=\operatorname{some} F
$$

$$
S(d(c),u)=\operatorname{none}.
$$

some と none は異なる構成子なので等しくありません。ここで失われたのは一操作の詳細化条件です。元の証明の拒否の枝では、実装が none なら仕様も none と導いていましたが、変異では実装が some、仕様が none となり、応答が一致するという推論が壊れます。

一方、具体側の次状態は (1,1)、抽象側の次状態は F であり d(1,1) = F。状態だけを比べるテストはこの誤りを見逃します。しかも put,put で初期状態から満杯へ到達できるため、到達不能な入力だけで発生する誤りでもありません。

## 6. Lean で対応を検査する

[モデルと証明のソース](lab/LvtRefinement.lean)では Count が抽象状態、Slots が具体状態、decode が写像 d、spec と impl が操作規則です。initial_comm と step_comm は初期条件と一操作の八枝、advance_comm と accepted_comm は次状態と応答の保存を確認します。run_comm と obs_comm は操作列に関する帰納法です。Lean の generalizing c は帰納仮定の具体状態を任意のままにします。bad_counterexample は変異した実装が詳細化条件を破ることを示します。

[実行ラボ](../browser-lab.html?chapter=LVT3-07)の Inspect で put,put,take 後の Slots は左 false、右 true、抽象状態は one。put,put,put,take,take,take の応答列は双方 [true,true,false,true,true,false]。変異と仕様の成功判定はそれぞれ true と false になります。Main はこれらの具体的な検査を行います。Failure は満杯時の変異が返す some full の等式を、none との等式として使おうとするため型不一致になります。ExerciseSolutions で演習に対応する命題を検査できます。

固定版は [lean-toolchain](lab/lean-toolchain) の Lean 4.35.0 です。Lean Web の版は固定版と異なることがあります。Codespaces はアカウントと利用枠を確認した上でラボから端末を開き、リポジトリルートで次を実行してください。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT3-07/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

最後のコマンドだけが意図的な失敗です。具体状態を実装に持つ別言語のプログラムについては、そのプログラムの操作規則が I と対応することを別途確かめる必要があります。

## 7. 演習と詳細解答

### Level A

### LVT3-07-A01 抽象状態からの逆算

対応表 d について d(1,0) = d(0,1) を確かめ、具体状態を抽象状態だけから一意に決められるか答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[抽象状態と具体状態の対応](#def-lvt3-07-decode)の表の第二行と第三行はどちらも O。第一成分は 1 と 0 で異なるので (1,0) ≠ (0,1)。従って O の逆像には少なくとも二要素があり、抽象状態 O だけではどちらの枠が使用中かを一意に決められない。Lean の a01 は等しい抽象状態と異なる具体状態の連言を検査する。
<!-- solution-end -->

### LVT3-07-A02 満杯への追加

抽象状態 F と具体状態 (1,1) に put を適用し、両側の結果を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[抽象仕様と具体実行の操作規則](#def-lvt3-07-steps)より F は容量2に達しているため S(F,put) = none。具体側では左枠1、右枠1の両方が使用中で、空きがないため I((1,1),put) = none。D(none) = none なので両結果も対応する。Lean の a02 は二つの none を検査する。
<!-- solution-end -->

### LVT3-07-A03 左枠から追加

c = (0,1)、u = put に対し I(c,u)、d(c)、S(d(c),u) を順に求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

左枠が0なので左を1にし、右は1を保存する。[抽象仕様と具体実行の操作規則](#def-lvt3-07-steps)から I(c,u) = some (1,1)。d(c) = O なので仕様では S(O,put) = some F。d(1,1) = F だから D(I(c,u)) = some F と一致する。Lean の a03 は二つの成功結果を検査する。
<!-- solution-end -->

### LVT3-07-A04 空から取り出す

空の具体状態 (0,0) に take を適用したとき、操作の応答 b_C と保持する次状態 n_C を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

左右の枠は0なので取り出せない。I((0,0),take) = none。[拒否を含む有限操作列の観測](#def-lvt3-07-trace)では none から b_C = false、n_C = 元の状態 (0,0) を得る。none を状態 (0,0) と混同してはいけない。前者は操作結果、後者は保持する状態である。Lean の a04 は両方を検査する。
<!-- solution-end -->

### Level B

### LVT3-07-B01 具体表現を選ばない証明

任意の c ∈ C について d(c) = O を仮定する。D(I(c,take)) = some E を一操作の対応保存から導け。

- Level: B

<!-- solution-start -->
#### 詳細解答

[一操作の対応保存](#prop-lvt3-07-step)に操作 take と任意の状態 c を選んで

$$
D(I(c,\mathrm{take}))=S(d(c),\mathrm{take})
$$

を得る。仮定 d(c) = O を代入すると右辺は S(O,take)。[抽象仕様と具体実行の操作規則](#def-lvt3-07-steps)からこれは some E であり結論を得る。実際 c の候補 (1,0),(0,1) はいずれも一個の枠だけを空けて (0,0) に移る。Lean の b01 は step_comm と仮定による書換えでこの論証を表す。
<!-- solution-end -->

### LVT3-07-B02 二つの実行表現

初期状態から put,put,take,put を順に処理し、具体状態・抽象状態・応答を各段で求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[抽象仕様と具体実行の操作規則](#def-lvt3-07-steps)を両側に適用する。初期状態は (0,0) と E。

| 操作 | 具体側の結果 | 抽象側の結果 | 応答 |
|---|---|---|---|
| put | some (1,0) | some O | true |
| put | some (1,1) | some F | true |
| take | some (0,1) | some O | true |
| put | some (1,1) | some F | true |

各段で some なので[拒否を含む有限操作列の観測](#def-lvt3-07-trace)により次状態は some の中身になる。最終状態は (1,1) と F で d(1,1) = F、応答列は [true,true,true,true]。Lean の b02 で具体側の状態と応答を検査する。
<!-- solution-end -->

### LVT3-07-B03 弱い比較で見逃す変異

I_bad は満杯時の put だけを some (1,1) に変えた実装とする。状態保持規則は変えない。満杯状態で put したとき、変異と正常な実装の次状態が一致する一方、応答が仕様と異なることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

c = (1,1) とする。正常実装は I(c,put) = none なので次状態は c。変異は I_bad(c,put) = some c なので次状態は c。従ってどちらの次状態も (1,1) で一致する。しかし d(c) = F で S(F,put) = none だから仕様の応答は false、変異は some なので true。[操作結果の詳細化条件](#def-lvt3-07-refinement)の左辺は some F、右辺は none になり破れる。Lean の b03 は同じ次状態と異なる応答を連言として確認する。
<!-- solution-end -->

### Level C

### LVT3-07-C01 全ての有限な操作履歴の対応

任意の有限操作列 L について初期具体状態 (0,0) と初期抽象状態 E からの最終状態と応答列が対応することを示せ。拒否が途中で起こる場合も含めるため、初期状態に限定して帰納法を始めてはいけない。

- Level: C

<!-- solution-start -->
#### 詳細解答

まず任意の開始具体状態 c について、最終状態の抽象化と抽象側の最終状態が等しく、応答列も等しい、という強い命題 P(L) を考える。空列では最終状態は c と d(c)、応答列は共に [] で成立する。

L = u :: L' とする。P(L') を仮定し、c を任意に選ぶ。z = n_C(c,u) と置く。[次状態と応答の対応保存](#prop-lvt3-07-advance)より d(z) = n_A(d(c),u) と b_C(c,u) = b_A(d(c),u) が成り立つ。ここには none の場合に z = c となる枝も含まれる。

帰納仮定は任意の状態に対するものなので、状態 z で使用できる。

$$
d(R_C(z,L'))=R_A(d(z),L')
$$

$$
B_C(z,L')=B_A(d(z),L').
$$

最終状態について再帰定義と d(z) の等式を使えば

$$
d(R_C(c,u::L'))=d(R_C(z,L'))
$$

$$
=R_A(n_A(d(c),u),L')=R_A(d(c),u::L').
$$

応答列では、先頭応答の等式と残りの列の等式をそれぞれ代入する。

$$
B_C(c,u::L')=b_C(c,u)::B_C(z,L')
$$

$$
=b_A(d(c),u)::B_A(d(z),L')
$$

$$
=B_A(d(c),u::L').
$$

これで P(u :: L') が成り立つ。最後に c = (0,0) を選び d(0,0) = E を代入する。この順序なら途中で状態が変わっても帰納仮定を使える。[有限操作列の対応保存](#prop-lvt3-07-trace)の初期状態への適用でも同じ結論を得る。Lean の c01 はその適用を二つの等式の連言として記述している。
<!-- solution-end -->

## 8. 次の講義へ

今回は仕様と実装が同じ外部動作をするための対応を証明しました。次講では個々の命令とその前後の条件に目を向け、Hoare論理と最弱事前条件によって、プログラムが必要な保証を満たすための条件を導出します。
