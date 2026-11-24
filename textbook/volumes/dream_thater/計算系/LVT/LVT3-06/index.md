# LVT3-06 ゲーム規則の安全性

前講の[二単位カウンタの保存条件](../LVT3-05/index.md#prop-lvt3-05-preserve)では、許された一回の遷移を調べて任意の有限操作列を扱いました。今度は三目並べです。ゲーム画面から番号9が送られたり、すでに埋まったマスを選んだり、勝敗が決まった後に操作が届いたりしたらどうするでしょうか。個別の入力をテストするだけでなく、規則を数式と実行可能な関数にし、成功した着手が何を保証するかを証明します。

**ブラウザで実行：** [本講の実行ラボ](../browser-lab.html?chapter=LVT3-06)。Inspect では反対角線の勝利と終局後の拒否を確認できます。

## 1. 盤面を型で表す

マス番号は行ごとに左から右へ0〜8とします。

```text
0 1 2
3 4 5
6 7 8
```

プレイヤーは X と O の二人、マスは空・X・O の三種類です。手番は次に着手するプレイヤーを意味します。[固定長盤面の関数表現](../LVT1-05/index.md#def-lvt1-05-fixed-board)を使い、全九つの位置に値を割り当てます。外部から受け取る自然数と、範囲確認済みの [Fin型](../LVT1-05/index.md#def-lvt1-05-fin-index) の値を区別します。

<a id="def-lvt3-06-board"></a>

<!-- formal-statement-start -->
### 定義（三目並べの状態）

Player は X または O、Cell は空・X・O のいずれかとする。mark(p) はプレイヤー p の印、other(p) は相手である。Board = Fin 9 → Cell とし、状態 s は盤面 b と手番 p の組 (b,p) とする。初期状態 initial は全マス空、手番 X とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-06-board -->
**定義の確認**　初期盤面では b(0), …, b(8) がすべて空で、p = X。番号8は 8 < 9 の証明と組にして Fin 9 の値になるが、9は 9 < 9 が偽なのでならない。X の相手は O、O の相手は X である。
<!-- definition-example-end -->


任意長の List Cell 型は空リストや10要素のリストも許します。本講の Board は最初から九つの位置を持つ型なので、List へ位置順に変換した boardList の長さは必ず9です。Lean の List.ofFn は Fin 9 の各要素を順に列挙し、その関数値をリスト化します。これは任意のリストが9要素だという主張ではありません。リストを状態に採用する別実装では、初期長9と一回の更新の長さ保存を別々に示す必要があります。

## 2. 何を勝利とするか

縦・横・斜めに同じプレイヤーの印が三つ揃ったら勝利です。三つの番号を一組として列挙すれば、判定を決定可能な命題にできます。満盤とは九マスすべてが空でないこと、終局とは勝利したプレイヤーがいるか満盤であることです。

<a id="def-lvt3-06-win"></a>

<!-- formal-statement-start -->
### 定義（三目並べの勝利条件）

盤面 b とプレイヤー p、三番号 i,j,k : Fin 9 について Line b p i j k を b(i) = mark(p)、b(j) = mark(p)、b(k) = mark(p) の連言とする。Wins b p は次の八組のうち少なくとも一組で Line が成立するという命題とする。

| 方向 | 番号の組 |
|---|---|
| 横 | (0,1,2), (3,4,5), (6,7,8) |
| 縦 | (0,3,6), (1,4,7), (2,5,8) |
| 斜め | (0,4,8), (2,4,6) |

Full b は b(0) から b(8) までのすべてが空でないこと、Finished s は Wins b X または Wins b O または Full b とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-06-win -->
**定義の確認**　b(2)=b(4)=b(6)=X、b(0)=b(1)=O、残りが空の場合、(2,4,6) の三等式はすべて真なので Wins b X。O は二マスしかなく、八組はいずれも相異なる三番号だから Wins b O は偽。空マスが残るので Full b は偽だが、X の勝利により Finished s は真。
<!-- definition-example-end -->


行は行番号0,1,2の三本、列も三本です。端から端へ進む長さ3の直線で縦横以外は行と列が同時に1ずつ変わる二方向だけです。したがってこの八組が三目並べの規則を過不足なく記述します。反対角線 (2,4,6) を忘れると、上の例で勝利を見落とします。Lean では各マスの等式を決定できるので連言・選言も判定可能です。[決定可能な命題](../LVT2-01/index.md#def-lvt2-01-decidable)として、Wins と Finished の真偽を実行して確かめられます。

## 3. 着手を一回の関数にする

着手に成功したら選んだ一マスだけを手番の印に更新し、手番を相手に変えます。失敗なら none、成功なら some で新状態を返します。画面側が拒否時に元状態を維持する規則も別に定めます。

<a id="def-lvt3-06-play"></a>

<!-- formal-statement-start -->
### 定義（三目並べの着手規則）

状態 s=(b,p)、自然数 n を入力とする。write b i c は i : Fin 9 の位置を c にし、それ以外の位置 j の値を b(j) のままにする盤面関数とする。moved s i = (write b i mark(p), other(p)) とする。play s n は次の上から最初に該当する枝を採用する。

1. Finished s なら none。
2. n ≥ 9 なら none。
3. n < 9 の証明から i : Fin 9 を構成し、b(i) が空でなければ none。
4. 以上に該当しなければ some (moved s i)。

attempt s n は play が some t なら t、none なら s とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-06-play -->
**定義の確認**　初期状態で n=2 は終局でなく 2<9 かつ b(2) が空なので成功し、b(2)=X、手番Oとなる。同じ2をもう一度選ぶと終局ではないが b(2)=X が空でないため none。attempt なら状態は変化しない。初期状態で9を選ぶと範囲外なので none。
<!-- definition-example-end -->


<a id="prop-lvt3-06-write"></a>

<!-- formal-statement-start -->
### 命題（一マス更新の保存性）

任意の盤面 b、番号 i,j : Fin 9、マス値 c について、write b i c の i 番目は c である。j ≠ i なら j 番目は b(j) である。従って moved s i は指定マス以外を変更せず、手番を other(p) にする。
<!-- formal-statement-end -->


**証明の見取り図**　write の条件 j=i の真偽を場合分けする。

<!-- proof-start -->
### 証明

[三目並べの着手規則](#def-lvt3-06-play)の write は j=i なら c、それ以外なら b(j) を返す。j=i の枝は等式 i=i が真なので write b i c i = c。j≠i の枝では条件が偽なので write b i c j = b(j)。moved はこの関数を第一成分、other(p) を第二成分とする組なので、成分を取り出せば主張が従う。
<!-- proof-end -->


<a id="prop-lvt3-06-reject"></a>

<!-- formal-statement-start -->
### 命題（不正着手の拒否）

任意の状態 s と自然数 n について、Finished s または n ≥ 9 なら play s n = none。任意の i : Fin 9 について s.board(i) が空でなければ play s i.val = none。さらに play s n = none なら attempt s n = s。
<!-- formal-statement-end -->


**証明の見取り図**　拒否枝を実行順に追い、画面側の扱いを分ける。

<!-- proof-start -->
### 証明

[三目並べの着手規則](#def-lvt3-06-play)による。Finished s が真なら第一枝で none。n≥9 の場合、第一枝が真ならすでに none、偽なら第二枝が真なので none。空でない i の場合、第一枝が真なら none、偽なら i.isLt により第二枝は該当せず第三枝で none。これで全拒否条件を尽くした。最後に play s n = none を attempt の定義に代入すると元状態 s が返る。none 自体は状態を表さないので、この最後の保証は attempt に関するものである。
<!-- proof-end -->


<a id="prop-lvt3-06-success"></a>

<!-- formal-statement-start -->
### 命題（合法着手の必要十分条件）

任意の状態 s,t と自然数 n について play s n = some t であるための必要十分条件は、ある i : Fin 9 が存在して i.val=n、Finished s が偽、s.board(i) が空、t=moved s i がすべて成立することである。
<!-- formal-statement-end -->


**証明の見取り図**　成功した枝から条件を取り出し、逆向きには条件を順番に代入する。

<!-- proof-start -->
### 証明

順方向：第一枝が真なら none=some t となり異なる構成子の等式で矛盾する。従って Finished s は偽。第二枝で n≥9 も同じ矛盾を生むので n<9。i=⟨n, n<9 の証明⟩を取る。第三枝が真でも none=some t になるので b(i) は空。残る第四枝により some (moved s i)=some t。some の引数が等しいので t=moved s i。逆方向：i.val=n と i.isLt から n<9、Finished s が偽なので第一枝を通過し、第二枝も通過する。構成した Fin の番号は i と一致する（証明欄の違いは値を変えない）。b(i) が空なので第四枝で some (moved s i)=some t を得る。
<!-- proof-end -->


これと[一マス更新の保存性](#prop-lvt3-06-write)を合わせると、合法着手は空だったマス一つを占有し、それ以外の印を上書きせず、手番を交替することが分かります。ここまでの命題は到達可能性を仮定せず、型に入る任意の状態について成立します。

## 4. 二人同時に勝つことはあるか

入力としては、上段すべてX、下段すべてOという盤面も構成できます。型だけではこの矛盾した勝敗を排除できません。初期状態から実際に許される着手だけを繰り返した盤面を区別します。

<a id="def-lvt3-06-reachable"></a>

<!-- formal-statement-start -->
### 定義（合法着手による到達盤面）

Reachable s を次の二規則で生成する。初期状態 initial は Reachable。Reachable s と play s n = some t が成立すれば Reachable t とする。ここで n は任意の自然数であり、拒否は新しい遷移を作らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt3-06-reachable -->
**定義の確認**　initial から2にXを置いた状態 s1 は play initial 2=some s1 なので Reachable。s1 から0にOを置いた状態 s2 は play s1 0=some s2 なので Reachable。s1 で2を再び選んでも none なので、その拒否による新しい step は作れない。
<!-- definition-example-end -->


これは[到達可能性の生成規則](../LVT2-06/index.md#def-lvt2-06-reach)を自然数の状態から State 型へ置き換えたものです。相手の勝利線が今回初めて現れるかを考えると、終局検査と一マス更新を組み合わせた証明ができます。

<a id="prop-lvt3-06-opponent"></a>

<!-- formal-statement-start -->
### 命題（相手の勝利線の逆保存）

盤面 b、プレイヤー p、番号 i : Fin 9 とし、b′ = write b i mark(p) とする。Wins b′ other(p) が成立すれば Wins b other(p) が成立する。
<!-- formal-statement-end -->


**証明の見取り図**　相手の印があるマスは更新位置でないと示し、勝利線の三マスすべてへ適用する。

<!-- proof-start -->
### 証明

任意の j で b′(j)=mark(other(p)) とする。もし j=i なら[一マス更新の保存性](#prop-lvt3-06-write)により b′(j)=mark(p)。p=X なら X=O、p=O なら O=X となり、いずれも異なる構成子の等式で矛盾する。従って j≠i であり、同じ命題から b′(j)=b(j)。これを仮定の等式に代入すると b(j)=mark(other(p)) となる。

[三目並べの勝利条件](#def-lvt3-06-win)により b′ で相手の勝利線 (a,d,e) が八組のいずれかに存在する。上の議論を j=a,d,e の三つそれぞれに適用し、b(a)=mark(other(p))、b(d)=mark(other(p))、b(e)=mark(other(p)) を得る。三等式を連言にすると Line b other(p) a d e。同じ組が八組の中に含まれるので、対応する選言に入れて Wins b other(p) を得る。
<!-- proof-end -->


<a id="prop-lvt3-06-dual"></a>

<!-- formal-statement-start -->
### 命題（到達盤面の二重勝利の排除）

任意の状態 s について Reachable s なら Wins s.board X と Wins s.board O が同時に成立することはない。さらに boardList s の長さは9である。
<!-- formal-statement-end -->


**証明の見取り図**　初期盤面を検査し、任意の成功した着手の直後に二重勝利がないことを示す。

<!-- proof-start -->
### 証明

初期盤面は全マス空である。どの勝利線でも最初のマスの等式が空=X または空=O となり偽なので、両者の Wins は偽である。

成功した着手 play s n = some t を考える。[合法着手の必要十分条件](#prop-lvt3-06-success)から Finished s が偽で、ある i に対し t=moved s i である。ここで p=s.turn とする。もし t で X と O がともに勝っていれば、p=X なら O が、p=O なら X が勝っているので Wins t.board other(p) が成立する。[相手の勝利線の逆保存](#prop-lvt3-06-opponent)に b=s.board、b′=t.board を代入すると Wins s.board other(p)。これは Finished s の第一または第二の選言を成立させ、Finished s が偽という条件に矛盾する。

[合法着手による到達盤面](#def-lvt3-06-reachable)の証明の最後が base なら初期盤面の結果、step なら直前の成功した着手の結果を適用する。よって任意の有限な合法着手列に対して二重勝利はない。この場合は step の結果が以前の不変量に依存しないので帰納仮定さえ不要である。長さは[三目並べの状態](#def-lvt3-06-board)の型が保証し、List.ofFn は Fin 9 の九つの位置にそれぞれ一つの値を対応させるため9となる。
<!-- proof-end -->


終局検査を省いた規則なら、X が0,1,2に置いて勝った後で O が3,4,5を完成させる列 0,3,1,4,2,5 を許してしまいます。最後の5で相手の勝利線が新しく作られるわけではなく、すでに存在するXの勝利を許したままOが勝つのです。従って終局検査が証明で不可欠です。

## 5. Lean で計算と証明を確認する

[モデルと証明のソース](lab/LvtGame.lean)では success_spec と legal_success が成功条件の二方向、old_opponent_cell、old_opponent_line、old_opponent_win が逆保存の三段階、success_no_dual と reachable_no_dual が二重勝利排除です。nine_cells は List.ofFn の長さを確認します。勝利判定は八組の選言を直接計算するので、ゲームの仕様と関数の間で勝利線の二重実装をしていません。

[実行ラボ](../browser-lab.html?chapter=LVT3-06)で Inspect を開くと、着手列 2,0,4,1,6 の盤面、Xの勝利判定 true、終局後の着手拒否 true、引き分け盤面が順に表示されます。Main では範囲外・重複・反対角線・終局後・引き分けを検査します。Failure では初期状態の9への着手を成功として証明しようとしますが、none の等式は some の等式の型と一致しません。ExerciseSolutions では全演習の命題を確認します。

固定版は [lean-toolchain](lab/lean-toolchain) の Lean 4.35.0 です。Lean Web の版は固定版と異なる場合があります。ラボの Codespaces 導線から端末を開き、利用枠を確認してリポジトリルートから次を実行できます。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT3-06/lab"
lake build
lake test
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
```

最後だけが意図的な失敗です。全称命題は記述した状態と play の意味について成立します。別の言語で書いたゲームが同じ規則で動くこと、外部入力を正しく自然数へ変換すること、並行リクエストの処理はこの証明には含まれません。また全対局で必ず勝者が出るとは主張していません。

## 6. 演習と詳細解答

### Level A

### LVT3-06-A01 九つの位置

任意長のリストと Board の違いを説明し、初期盤面の boardList の長さを求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

任意長の List は長さ0や10も許す。[三目並べの状態](#def-lvt3-06-board)の Board は Fin 9 の各番号に一つずつ値を割り当てる。List.ofFn は番号0,1,…,8の九個を順に並べる。initial ではどの値も空なので空マス九個からなるリストで、長さ9。

対応する Lean の命題は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の a01 を参照してください。
<!-- solution-end -->

### LVT3-06-A02 範囲外

play initial 9 の値を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[三目並べの着手規則](#def-lvt3-06-play)より initial では空=X、空=O が偽なので勝者はおらず、空マスがあるため Full も偽。第一枝を通過するが 9<9 は偽なので第二枝で none。

対応する Lean の命題は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の a02 を参照してください。
<!-- solution-end -->

### LVT3-06-A03 反対角線

着手列 2,0,4,1,6 を初期状態から実行し、勝者を特定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

手番は X,O,X,O,X の順。X の集合は {2,4,6}、O は {0,1} となる。途中4手までは両者二マス以下なので勝利線はなく、いずれも異なる空マスへの合法着手である。五手目に b(2)=b(4)=b(6)=X。[三目並べの勝利条件](#def-lvt3-06-win)の反対角線に対応し X が勝つ。O は二マスなので勝てない。

対応する Lean の命題は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の a03 を参照してください。
<!-- solution-end -->

### LVT3-06-A04 重複着手

初期状態から0に着手した後、再び0を選ぶとどうなるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

一手目は0<9、初期マス空、終局でないので成功。b(0)=X、手番O。次は0<9だが b(0)≠空である。[不正着手の拒否](#prop-lvt3-06-reject)に i=0 を代入すれば none。

対応する Lean の命題は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の a04 を参照してください。
<!-- solution-end -->

### Level B

### LVT3-06-B01 他のマスは保存される

任意の状態 s と異なる二番号 i,j : Fin 9 に対し、(moved s i).board(j)=s.board(j) を証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[三目並べの着手規則](#def-lvt3-06-play)により左辺は write s.board i mark(s.turn) j。j≠i なので if の偽の枝が選ばれる。[一マス更新の保存性](#prop-lvt3-06-write)の c=mark(s.turn) の場合に当たり、値は s.board(j)。勝利判定や到達可能性を仮定する必要はない。

対応する Lean の命題は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の b01 を参照してください。
<!-- solution-end -->

### LVT3-06-B02 終局後の操作

2,0,4,1,6 の後に8を attempt で入力したとき、盤面と手番を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

A03 の計算では X が反対角線で勝ち、次の手番は O。[三目並べの勝利条件](#def-lvt3-06-win)から Finished が真。[不正着手の拒否](#prop-lvt3-06-reject)の終局条件で play s 8=none、attempt s 8=s となる。従って X={2,4,6}, O={0,1}、残り空、手番Oのまま。空いている8であっても終局の条件が優先される。

対応する Lean の命題は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の b02 を参照してください。
<!-- solution-end -->

### LVT3-06-B03 勝者のいない満盤

0,1,2,4,3,5,7,6,8 の順に着手した盤面が引き分けになることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

X={0,2,3,7,8}、O={1,4,5,6}。最終盤面の八線を順に読むと、横は XOX・XOO・OXX、縦は XXO・OOX・XOX、斜めは XOX・XOO。いずれも両方の印を含む。途中に勝利があれば、その三マスは上書きされないので最終盤面にも残るはずだが八線の確認に反する。したがって九手はすべて終局前の空マスへの合法着手である。九マス埋まったので Full が真、両者の Wins は偽、引き分けとなる。

対応する Lean の命題は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の b03 を参照してください。
<!-- solution-end -->

### Level C

### LVT3-06-C01 任意の長さの合法操作列

Reachable s なら、両者同時勝利がなく、boardList s の長さが9であることを示せ。終局検査を削除すると何が壊れるか。

- Level: C

<!-- solution-start -->
#### 詳細解答

[合法着手による到達盤面](#def-lvt3-06-reachable)の最後の生成規則で場合分けする。base は全マス空なので各勝利線の最初の等式が偽で両者とも勝たない。step はある旧状態 u、番号 n と play u n=some s を持つ。[合法着手の必要十分条件](#prop-lvt3-06-success)で Finished u は偽、s=moved u i。p=u.turn とし、両者勝利を仮定すると相手 other(p) も勝つ。[相手の勝利線の逆保存](#prop-lvt3-06-opponent)で旧盤面でも相手が勝っており、Finished u が真になって矛盾する。従って二重勝利なし。List.ofFn の九つの値の列挙から長さ9。終局検査を削除した場合、0,3,1,4,2,5 と交互に置くとXは上段、Oは中段を完成させる。第五手でXが勝ち、第六手も許されるため、Finished u が偽という証明の前提が失われる。

対応する Lean の命題は [ExerciseSolutions.lean](lab/ExerciseSolutions.lean) の c01 を参照してください。
<!-- solution-end -->

## 7. 次の講義へ

一つの実行可能なゲーム規則について、受理した操作の条件と、すべての合法な到達盤面の性質を区別しました。次講では抽象状態と実装状態を対応させる関係を考えます。
