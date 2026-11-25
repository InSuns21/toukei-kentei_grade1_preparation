# LVT6-01 三目並べ教材の証明範囲を査読する

前提講座：[LVT3-06 ゲーム規則の安全性](../LVT3-06/index.md)、[LVT5-08 差分検査の保証範囲と弱点](../LVT5-08/index.md)、[LVT2-08 定理探索・自動化・信頼境界](../LVT2-08/index.md)、[LVT5-04 Python：pytest + Hypothesis差分テスト](../LVT5-04/index.md)。

前講では証明の対象、比較で観測する値、生成する入力の範囲を分けました。今回は実際の公開教材を読み、その証拠を取り出します。命題「盤面の長さを変えない」だけから「盤面は常に九マス」と言えるでしょうか。初期状態と遷移を結び付けると、正確な主張に直せます。

**ブラウザで実行：** [本講の実行ラボ](../browser-lab.html?chapter=LVT6-01)。リスト更新と帰納法の関係を試します。外部教材そのものの再現は第5節です。

## 1. 外部の仕様を読む

[kazunori279/lean4-tictactoe-test の固定版](https://github.com/kazunori279/lean4-tictactoe-test/tree/c332ba3e2d2bf78edb993ae6acadcd83f927073e) を対象にします。

| ソース | 内容 |
|---|---|
| [Spec.lean](https://github.com/kazunori279/lean4-tictactoe-test/blob/c332ba3e2d2bf78edb993ae6acadcd83f927073e/lean_spec/TicTacToe/Spec.lean) | 実行仕様 |
| [Proofs.lean](https://github.com/kazunori279/lean4-tictactoe-test/blob/c332ba3e2d2bf78edb993ae6acadcd83f927073e/lean_spec/TicTacToe/Proofs.lean) | 六定理、四つの具体例 |
| [game.py](https://github.com/kazunori279/lean4-tictactoe-test/blob/c332ba3e2d2bf78edb993ae6acadcd83f927073e/tictactoe/game.py) | Pythonの別実装 |
| [test_unit.py](https://github.com/kazunori279/lean4-tictactoe-test/blob/c332ba3e2d2bf78edb993ae6acadcd83f927073e/tests/test_unit.py)、[test_differential.py](https://github.com/kazunori279/lean4-tictactoe-test/blob/c332ba3e2d2bf78edb993ae6acadcd83f927073e/tests/test_differential.py) | 例示・差分テスト |

本系列の[三目並べの状態](../LVT3-06/index.md#def-lvt3-06-board) は Fin 9 からマスへの関数でした。外部仕様では `Board = List Cell`、`Cell = Option Player` です。[Option型](../LVT1-03/index.md#def-lvt1-03-option) を使い、空を `none`、X と O を `some X` と `some O` で表します。List は任意長を許します。[Fin型](../LVT1-05/index.md#def-lvt1-05-fin-index) の `Fin 9` の番号は0〜8に限られますが、外部仕様の `Nat` は0を含む非負整数全体です。以下、`b` は盤面リスト、`i`、`pos`、`n` は0始まりの着手番号、`s` は更新前の状態、`t` は更新後の状態を表します。`s.board` のようなドット記法は状態の成分を取り出し、`b.length` はリストの要素数を表します。GameState は board、turn（手番）、status（ongoing、won p、draw のいずれか）の三成分を持ちます。初期状態 initialState の盤面は none を九個並べたリスト、手番 X、status は ongoing です。

`cellAt b i` は [有効な添字](../LVT1-05/index.md#def-lvt1-05-index-range) の条件 `i < b.length` が成立すれば i 番の値を返し、それ以外なら `none` を返します。従って空マスと範囲外を `cellAt` だけでは区別できません。`b.set i c` は `List.set` を盤面 b、番号 i、置換するマス値 c に適用した記法で、範囲内ならそのマスを置き換え、範囲外なら元リストを返します。例えば `[].set 0 (some X)` は `[]` です。

`applyMove s pos` の戻り値は [Except型](../LVT1-03/index.md#def-lvt1-03-except) `Except String GameState` です。`error e` は拒否の理由文字列 e、`ok t` は成功後の状態 t を持ちます。Lean コードの `.error`、`.ok` はそれぞれ同じ構成子の型名を省いた記法です。判定は次の順です。

1. status が ongoing 以外なら game_over。
2. pos が9以上なら out_of_bounds。
3. cellAt が none 以外なら cell_occupied。
4. それ以外なら List.set で更新し、勝利、満盤、継続の順に判定して新状態を返す。勝利と満盤の枝では手番を保持し、継続時だけ交替する。

勝利線は [三目並べの勝利条件](../LVT3-06/index.md#def-lvt3-06-win) と同じ八組です。`hasWon b p` は、そのうち一組でも三マスすべての `cellAt` が `some p` となるかを真偽値で返します。`isFull b` はリストの全要素が `some` かを調べます。`other(p)` と Lean の `p.other` はともに手番 p の相手を表します。外部仕様では終局検査に保存された status を使います。[三目並べの着手規則](../LVT3-06/index.md#def-lvt3-06-play) のように毎回盤面から Finished（勝者がいるか満盤であること）を計算するわけではないので、任意の GameState では盤面と status が食い違う可能性があります。

## 2. 六つの theorem を分類する

| 定理名 | 仮定・入力 | 結論 |
|---|---|---|
| initial_board_length | 初期状態 | 長さ9 |
| other_involutive | 任意の Player p | 相手の相手は p |
| other_ne_self | 任意の Player p | 相手は p でない |
| applyMove_rejects_finished_game | status が ongoing でない | game_over |
| applyMove_rejects_out_of_bounds | status が ongoing、pos ≥ 9 | out_of_bounds |
| applyMove_preserves_board_length | applyMove s pos = ok t | t と s の盤面長が等しい |

最初の定理は九個の none のリストを展開して数えれば9です。二番目は X→O→X と O→X→O の二場合、三番目は O≠X と X≠O の二場合です。

拒否の二定理は applyMove の枝を開けば確認できます。status が終局なら第一枝で直ちに error となり、pos の値は問いません。ongoing かつ pos ≥ 9 なら第一枝を通過して第二枝で error になります。ongoing の仮定を削ると、終局で pos=9 の場合は game_over を返すので、同じ結論は成立しません。

長さ保存の証明は、仮定が ok t であることから最初の三つの error 枝を除外します。残る勝利・満盤・継続の三枝はどれも t.board = s.board.set pos (some s.turn) です。`List.set` の長さが保存される理由も、[Leanのリストの帰納法](../LVT2-05/index.md#principle-lvt2-05-list) に沿って確認します。`a :: q` は先頭要素 a と残りのリスト q からなるリストです。置換値 c を固定し、任意の非負整数 i に対し `(b.set i c).length = b.length` を示します。

- `b = []` なら、任意の i で `[].set i c = []` なので両辺0です。
- `b = a :: q`、`i = 0` なら、更新結果は `c :: q` で長さは更新前と同じ `1 + q.length` です。
- `b = a :: q`、`i = j + 1` なら、更新結果は `a :: (q.set j c)` です。短いリスト q に対する帰納仮定 `(q.set j c).length = q.length` を使うと、更新後の長さは `1 + (q.set j c).length = 1 + q.length` になります。

この三場合で空リストと非空リストのすべての添字を尽くしました。従って成功の三枝すべてで `t.board.length = s.board.length` となります。

ここで s の長さは仮定しません。短い盤面にも適用できる保存命題ですが、長さの絶対値を与える命題ではありません。成功した着手が実際に一マスを埋めることも、この等式だけからは分かりません。

## 3. 出発点と帰納法を加える

[合法着手による到達盤面](../LVT3-06/index.md#def-lvt3-06-reachable) の構成を外部教材の List と Except に対応させます。記号 `R(s)`（Lean では `Reach s`）は初期状態から成功した着手だけを有限回繰り返して s が得られるという命題です。零回も含め、最初の状態を証拠とし、成功結果を一つずつ連結するという意味で規則から生成します。

<a id="def-lvt6-01-list-reachable"></a>

<!-- formal-statement-start -->
### 定義（リスト盤面の成功到達状態）

外部仕様の GameState の初期値を initialState、非負整数 `pos : Nat` に対する遷移を `applyMove s pos` とする。s と t はいずれも GameState の値とし、述語 R は次の二規則だけで生成される（有限回の規則適用によって得られる状態を対象とする）。

- R(initialState)。
- R(s) と applyMove s pos = ok t が成立すれば R(t)。

<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt6-01-list-reachable -->
**定義の確認**　`s = initialState` は第一規則そのものにより `R(s)` が成立する。`pos = 0` では status が ongoing、`0 < 9`、`cellAt s.board 0 = none` なので三つの拒否条件をすべて通過する。更新後の盤面は `[some X, none, none, none, none, none, none, none, none]` である。X は一マスだけなのでどの勝利線も完成せず、空マスが八個あるので満盤でもない。従って `applyMove s 0 = ok t` となり、t の手番は O、status は ongoing である。第一規則で得た `R(s)` とこの成功等式を第二規則に代入して `R(t)` を得る。同じ0を再び指定すると `cellAt t.board 0 = some X` なので `cell_occupied` となる。この拒否は第二規則の成功等式を満たさず、新しい R の証拠を作らない。
<!-- definition-example-end -->

これで長さを保存する各遷移に初期長を結び付けられます。[帰納的不変量](../LVT3-05/index.md#def-lvt3-05-inductive) の考え方を、自然数の状態から GameState の状態へ移して用います。

<a id="prop-lvt6-01-nine"></a>

<!-- formal-statement-start -->
### 命題（成功到達状態の九マス保証）

外部仕様の GameState s が [リスト盤面の成功到達状態](#def-lvt6-01-list-reachable) ならば s.board.length = 9 である。
<!-- formal-statement-end -->

**証明の見取り図**　初期長9を基底とし、成功した各遷移で同じ長さが維持されることを使います。

<!-- proof-start -->
### 証明

[リスト盤面の成功到達状態](#def-lvt6-01-list-reachable) の生成規則に関する帰納法を行う。基底では s=initialState であり、外部の命題 initial_board_length により s.board.length=9。

帰納段階では R(s) と applyMove s pos = ok t があり、帰納仮定 s.board.length=9 を得ているとする。外部の命題 applyMove_preserves_board_length に s,t,pos と成功の等式を代入すると t.board.length=s.board.length。帰納仮定を右辺に代入すると `t.board.length = s.board.length = 9` を得る。二規則を尽くしたので任意の R(s) に対して成立する。
<!-- proof-end -->

[UpstreamAudit.lean](lab/UpstreamAudit.lean) は第5節の補修後の Proofs を import し、二つの既存の主張を実際に使ってこの結論を証明します。元の Proofs.lean にこの到達性定理があるわけではなく、追加の証明です。

## 4. 仮定を外して反例を作る

空のリスト、手番X、ongoing の状態 u は外部 GameState の型に入ります。applyMove u 0 を手で評価します。ongoing なので第一枝は偽、0<9 なので第二枝は偽、cellAt [] 0 は none なので第三枝も偽です。List.set [] 0 (some X) は [] のまま。八本の勝利線には印がないので hasWon は偽。空リストの all は調べる要素が一つもなく真なので isFull [] は真。従って戻り値は ok、盤面長0、status draw、手番X です。

長さ保存の定理は 0=0 を保証しており破れていません。[成功到達状態の九マス保証](#prop-lvt6-01-nine) の対偶から、この入力も出力も初期状態から成功着手で到達できません。任意の盤面を受け取る API なら、長さと状態整合性を検査するか型で制限する必要があります。

九マスあっても上段が X,X,X、残りが空、status が ongoing の状態を考えます。O の手番で番号3を選べば applyMove は拒否せず、そこへ O を置きます。終局拒否の定理は status を仮定しているため、この入力に game_over を結論できません。九マスであることと盤面・手番・status の整合性は別の証明責務です。

## 5. 証明とテストを再現する

外部教材の [README](https://github.com/kazunori279/lean4-tictactoe-test/blob/c332ba3e2d2bf78edb993ae6acadcd83f927073e/README.md) は Lean 4 v4.22.0 の toolchain を使います。本教材のブラウザ実験は別の固定版 v4.35.0 です。以下は elan、uv、Git が使える端末（Codespaces でも可）で実行します。Codespaces は GitHub ログインと利用枠が必要です。

```bash
# 本教材リポジトリのルートから
cp 'textbook/volumes/dream_thater/計算系/LVT/LVT6-01/lab/repair_upstream_proofs.py' /tmp/lvt-repair.py
cp 'textbook/volumes/dream_thater/計算系/LVT/LVT6-01/lab/UpstreamAudit.lean' /tmp/lvt-audit.lean
git clone https://github.com/kazunori279/lean4-tictactoe-test.git /tmp/lvt-upstream
cd /tmp/lvt-upstream
git checkout --detach c332ba3e2d2bf78edb993ae6acadcd83f927073e
cd lean_spec
lean --version
lake update
# 原版の失敗を観察する
lake test
# 以下は原版の証明スクリプトだけを補修して再実行
python3 /tmp/lvt-repair.py ..
git diff --exit-code -- TicTacToe/Spec.lean Main.lean
lake test
lake build
lake env lean /tmp/lvt-audit.lean
cd ..
uv sync --locked
uv run --locked pytest -v -rs
```

指定版4.22.0で原版の lake test を実行すると、Proofs.lean の二つの拒否証明で未解決のゴール、長さ保存の証明で split の失敗、二つの拒否例で BEq (Except String GameState) の不足が生じます。したがって原版の六つの宣言をすべて検証済みとは扱えません。

[補修スクリプト](lab/repair_upstream_proofs.py) は定理の仮定・結論と実行仕様を変えません。終了状態の証明では status の三構成子を場合分けして Bool の不等号が true になることを示し、継続状態では ongoing 同士の不等号が false と計算されることを示します。長さ保存の枝では let に束縛された盤面を展開してから split します。拒否例は Except を場合分けし、error の文字列だけを比較します。変更は一時チェックアウトの Proofs.lean に限定します。

原版の失敗と補修後の検査は別の証拠です。補修後の期待値は lake test と lake build の成功、追加証明と短い盤面の #guard の成功、pytest の7テスト成功で skip が0であることです。追加ファイルの #print axioms で [Leanの公理依存](../LVT2-08/index.md#def-lvt2-08-axioms) も確認できます。

Proofs.lean の #guard は上段勝利、引分、占有マス拒否、勝利後拒否の四具体例。Python の test_unit.py はこれらと範囲外拒否の五例です。具体例はすべての着手列に対する theorem ではありません。

差分テストは [生成領域と実行集合](../LVT5-04/index.md#def-lvt5-04-generated-domain) を意識して読みます。

| テスト | 生成 | 比較 |
|---|---|---|
| random_move_sequences | 0〜11、長さ0〜12、最大500例の設定 | 各列の結果辞書 |
| full_game_permutations | 0〜8の順列、最大500例の設定 | 各順列の長さ0〜9の十個の接頭列 |

入力は初期状態からの着手列だけです。0〜8の順列は 9! = 362880 通りあり、設定500は完全列挙ではありません。重複、範囲外入力も生成領域に含まれますが、負整数、12以上、任意の GameState は含まれません。

[Main.lean](https://github.com/kazunori279/lean4-tictactoe-test/blob/c332ba3e2d2bf78edb993ae6acadcd83f927073e/lean_spec/Main.lean) は自然数列を JSON から読み、成功なら ok, board, turn, status, winner を、拒否なら ok, error を返します。Python も同じ形の辞書を作り、比較は辞書全体の等価性です。エラー直前の盤面や途中の全トレースは一つの最終拒否出力から観測できません。接頭列を個別に検査すると、その接頭列の結果を追加で観測できます。

[conftest.py](https://github.com/kazunori279/lean4-tictactoe-test/blob/c332ba3e2d2bf78edb993ae6acadcd83f927073e/tests/conftest.py) はオラクルバイナリが無いと差分検査を skip します。pytest の終了コードが0でも差分比較を実行したとは限りません。バイナリを作ってからテスト名と skip 件数を確認します。[差分検出集合](../LVT5-08/index.md#def-lvt5-08-detection-set) の考え方で入力範囲と観測を記録します。

| 証拠 | 主張できる範囲 | 別途必要な確認 |
|---|---|---|
| 補修後の六つの theorem | 外部仕様内、各仮定下 | 要求の整合性、到達範囲 |
| 追加の到達性定理 | 成功到達状態の長さ9 | 勝敗・手番の整合性 |
| #guard、単体テスト | 明示した具体例 | 他の入力 |
| pytest差分一致 | 実行された列と結果辞書 | 全入力、途中の副作用、共通バグ |

ブラウザの [LvtAudit.lean](lab/LvtAudit.lean) は外部コードの複製ではなく、初期長と成功遷移の保存条件を抽象化した小モデルです。write はルール検査を省きリスト更新だけを行います。[Inspect.lean](lab/Inspect.lean) で長さ0の更新と初期長9を比較し、[Failure.lean](lab/Failure.lean) で長さ0=9という誤りを拒否させます。端末では本講の lab 内で次を実行します。

```bash
lean -o LvtAudit.olean LvtAudit.lean
LEAN_PATH=. lean Inspect.lean
# 意図的な type mismatch
LEAN_PATH=. lean Failure.lean
```

期待値は初期長9と空リスト長0です。Lean Web のバージョンは端末の固定版と異なる場合があるため、固定版の結果と区別してください。

## 6. 演習と詳細解答

### Level A

### LVT6-01-A01 拒否条件の順序

終局状態と ongoing の状態にそれぞれ番号9を渡す。戻り値を比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

終局では status が ongoing でないので第一枝で game_over。番号9の判定には進まない。ongoing では第一枝は偽で、9≥9 が真なので第二枝で out_of_bounds。後者の外部定理には ongoing の仮定が必要である。
<!-- solution-end -->

### LVT6-01-A02 型と長さ

長さ3の空盤面のマス1を X へ更新する。更新前後の長さと九マス保証の関係を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

更新前は [none,none,none]、更新後は [none,some X,none]。要素数は前3、後3で保存される。3=3 は長さ保存の結論だが3=9ではない。[成功到達状態の九マス保証](#prop-lvt6-01-nine) により、どちらも初期状態からの成功到達状態ではない。
<!-- solution-end -->

### LVT6-01-A03 手番交替の確認

X と O の両場合で other_involutive と other_ne_self を確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

p=X なら other(p)=O、other(other(p))=X=p、O≠X。p=O なら other(p)=X、other(other(p))=O=p、X≠O。Player の構成子は二つだけなので全場合を尽くした。
<!-- solution-end -->

### LVT6-01-A04 テストの skip

五単体テストが成功し、二差分テストが skip された。台帳に記録できる証拠は何か。

- Level: A

<!-- solution-start -->
#### 詳細解答

五つの具体例は製品の結果を期待値と比較した証拠である。二差分テストは比較を実行していないため一致の証拠ではない。オラクルバイナリを lake build で作り、pytest を再実行して二差分テストの成功と skip 0 を別に記録する。証明の成功は第5節の補修後の lake test の結果としてさらに別に記録する。
<!-- solution-end -->

### Level B

### LVT6-01-B01 一マスで反例を構成

盤面 [none]、手番O、ongoing に番号0を渡す。各枝、更新結果、勝敗、手番を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

第一枝は ongoing なので偽、0≥9 も偽、cellAt [none] 0=none なので第三枝も偽。set 0 (some O) は [some O]。八本の勝利線は各々相異なる三番号を含み、少なくとも二番号は範囲外で cellAt が none となるため O の勝利は偽。一マスだけを all で調べると isSome(some O)=true なので満盤は真。従って ok の盤面 [some O]、手番O、draw を返す。長さ1=1は保存されるが [成功到達状態の九マス保証](#prop-lvt6-01-nine) によりこの状態は到達不能。
<!-- solution-end -->

### LVT6-01-B02 拒否を自己遷移にする

成功時は返った状態へ、拒否時は元状態へ進む新しい遷移を定義する。初期状態から有限回のこの遷移で長さ9が保存されることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

初期長は initial_board_length から9。k 回後の状態 s の長さを9と仮定する。次の入力を n とする。applyMove s n=ok t なら applyMove_preserves_board_length から t.board.length=s.board.length=9。error e なら次状態は定義により s のままで長さ9。この二場合で Except を尽くした。従って操作回数 k に関する [Leanの自然数の帰納法](../LVT2-05/index.md#principle-lvt2-05-nat) により任意の有限操作列で成立する。拒否を自己遷移にする API の保証であり、元の playMoves のエラーで終了する挙動とは区別する。
<!-- solution-end -->

### LVT6-01-B03 順列の検査範囲

長さ9の順列を500個すべて異なるように選べたと仮定する。長さ9の順列のうち検査した割合と、接頭列比較の回数を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

全順列は、先頭に9通り、次に残り8通り、以後同じように選ぶので、

$$
9!=9\times8\times7\times6\times5\times4\times3\times2\times1=362880.
$$

長さ9の順列を母集団とした割合は

$$
\frac{500}{362880}=\frac{25}{18144}\approx0.001378=0.1378\%.
$$

長さ0〜9の十個の接頭列を各順列で比較するので500×10=5000回。ただし空列など共通接頭列は繰り返されるため5000個の相異なる入力ではない。終局を起こした着手までの接頭列は成功し、その次の着手まで含む接頭列からは game_over となる。これは500例を実際に得たという仮定下の計算であり、設定値だけでは実回数を保証しない。
<!-- solution-end -->

### LVT6-01-B04 status の整合性

上段が X,X,X、残りは空、手番O、status ongoing の状態に3を入力する。終局拒否の定理が破れているか判断せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

status が ongoing なので第一枝は偽。3<9 でマス3は空なので第二、第三枝も偽。更新後マス3はO、Oは一マスしかなく勝利せず、残り五マスが空なので満盤でもない。よって ok、手番X、ongoing。applyMove_rejects_finished_game の仮定 status≠ongoing が満たされないので定理の反例ではない。しかし [三目並べの勝利条件](../LVT3-06/index.md#def-lvt3-06-win) では X が勝っている。任意 GameState の入口では status と盤面の整合性を別途検査する。
<!-- solution-end -->

### Level C

### LVT6-01-C01 保証台帳を査読する

「長さ保存が証明され、pytestが通ったので、任意の状態を受け取るPythonの apply_move は安全」と主張された。長さ、終局、比較対象、実行証拠から主張を書き直し、追試を設計せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

長さ保存の仮定は applyMove s n=ok t、結論は t と s の盤面長の等式である。空リストの外部 Lean 状態では0への着手が ok、draw、長さ0を返す。従って任意状態が9マスという主張は偽。一方で initial_board_length と保存を帰納法で結んだ [成功到達状態の九マス保証](#prop-lvt6-01-nine) は正しい。Python 側は短い盤面を直接受け取ると、例えば空盤面・ongoing・pos=0 では state.board[0] で IndexError が起きるので、九マスの事前条件か入力検査が必要である。

終局拒否は status が ongoing でない場合の定理。B04 の状態では X が勝っていても status が ongoing のため適用できない。盤面と status の整合性を初期状態で確認し成功遷移ごとに保たれる証明を加えるか、任意状態を受け取る入口で検査する。

比較対象は初期状態からの着手列であり任意の GameState ではない。ランダム生成は0〜11、最大長12、順列生成は0〜8で、負整数も未比較である。Python は ongoing の状態なら -1 を out_of_bounds とする（終局なら先に game_over）。一方、Lean の JSON 入力は Nat のリストなので -1 を含む要求を着手処理前に invalid_json として拒否する。この境界では仕様を揃えて別に試験する。最終結果の error だけでは途中の状態変化は分からないので、接頭列の結果を保存するか遷移ごとに観測する。

最後に原版の lake test の失敗を記録し、第5節の補修後に theorem と #guard を確認し、lake build 後の pytest で五単体・二差分テストが実際に成功し skip が0か確認する。短い盤面、盤面と status の矛盾、負整数を追試する。適切な主張は「補修後の Lean 仕様の六定理が各仮定で成立し、追加証明で成功到達状態の長さ9が保証される。Python は実行した着手列について結果辞書が一致した」である。全入力での Python の安全性を主張するには要求・入力対応・実装との対応を追加で証明する。
<!-- solution-end -->

## 7. 次の講義へ

次講では仕様を固定し、製品側の勝利判定に変異を加え、例示テストと差分検査で検出した反例を比較します。
