# LVT6-04 Cedarに学ぶ認可ポリシーのモデル

**前提講義：** [LVT6-03](../LVT6-03/index.md)、[LVT5-05](../LVT5-05/index.md)、[LVT5-08](../LVT5-08/index.md)。

前講では公開の前に承認が必要なことを状態遷移で説明しました。しかし、承認操作を誰が実行できるかは別の問題です。例えば、ある規則が編集を許し、別の規則が利用停止中の人の操作を拒むとき、どちらを優先するでしょうか。本講では規則の評価と最終判断を分け、許可がない場合と拒否がある場合に必ず拒否する仕組みを作ります。

**ブラウザで実行：** [本講の実行ラボ](../browser-lab.html?chapter=LVT6-04)。Leanで判断と証明を試せます。TypeScriptとの照合は第4節の端末で実行します。

## 1. 要求を受け取る認可器

認証は利用者が誰かを確かめる処理、認可はその利用者が対象への操作を実行してよいかを判断する処理です。認証済みの利用者（principal）が一つの文書（resource）を読み書きする場面を考えます。利用者の役割は viewer または editor、操作の種類は read または write、利用停止フラグは true または false とします。これらは信頼できる情報から取得済みと仮定します。文書は一つに固定するので文書識別子は判断に使いません。

[Cedarの認可仕様](https://docs.cedarpolicy.com/auth/authorization.html) は、要求と各ポリシー（許可・拒否を指定する規則）を照合してから判断を合成します。主体、操作、資源、追加の状況情報（それぞれ Cedar の `principal`、`action`、`resource`、`context`）を要求に含められます。満たされた forbid があれば拒否し、それがなく満たされた permit があれば許可し、どちらもなければ拒否します。実際のCedarには評価エラーを診断に記録し、その規則を判断から除く仕組みもあります。本講はエラーを生じない三種類の規則と八種類の正規化済み要求に限定します。Cedarの構文解析、型検証、エンティティ階層や評価器を再実装するわけではありません。

要求を r=(role,action,blocked) と書きます。規則名 R は閲覧許可、W は編集者の書込許可、S は利用停止者の拒否です。規則が要求を満たすかどうかは次の表で決めます。

| 規則 | 種別 | 満たす条件 |
|---|---|---|
| R | permit | action が read |
| W | permit | role が editor かつ action が write |
| S | forbid | blocked が true |

規則の有限列を L とします。空列も認め、規則の重複も許します。P(r,L) は L 内に要求を満たす permit が一つ以上あるとき true、F(r,L) は要求を満たす forbid が一つ以上あるとき true、それ以外は false です。ここで一つ以上あるかの判定は先頭から順に真偽値を論理和で集約できます。空列の論理和は false です。

<a id="def-lvt6-04-policy"></a>

<!-- formal-statement-start -->
### 定義（有限認可ポリシーモデル）

要求 r は role が viewer または editor、action が read または write、blocked が真偽値である三つ組とする。規則列 L は次の三種類からなる任意の有限列とする。R は read を許可する規則、W は editor の write を許可する規則、S は blocked=true の要求を拒否する規則である。P(r,L) は L に含まれる R または W の条件が少なくとも一つ成立するか、F(r,L) は L に含まれる S の条件が少なくとも一つ成立するかを表す真偽値とする。

判断 A(r,L) は F が true なら false、そうでなければ P とする。A が true の場合を許可、false の場合を拒否とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt6-04-policy -->
**定義の確認**　L=[R,W,S] とし、r=(editor,write,true) を取ります。role は二種類のうち editor、action は write、blocked は真偽値なので定義域に属します。列の三要素は規定の三規則です。R の read 条件は偽、W の editor かつ write は真、S の blocked は真です。したがって P=true、F=true。F が true なので A=false となります。同じ要求の blocked を false に変えると R は偽、W は真、S は偽なので P=true、F=false、A=true です。空列なら P=F=false で A=false になります。許可、拒否、競合、空列のいずれも同じ定義で計算できます。
<!-- definition-example-end -->

## 2. 判断の性質を証明する

規則の種類や列長に依存せず、二つの集約値だけで判断を記述できます。以下で true と false をそれぞれ 1 と 0 と書くこともあります。

| P | F | A |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

<a id="prop-lvt6-04-decision"></a>

<!-- formal-statement-start -->
### 命題（認可判断の許可条件）

有限認可ポリシーモデルの任意の要求 r と規則列 L について、A(r,L)=true であることと、P(r,L)=true かつ F(r,L)=false であることは同値である。特に P が false の場合と F が true の場合には必ず A=false となる。
<!-- formal-statement-end -->

**証明の見取り図**　二つの真偽値の全四組を調べ、許可が起こる一組を特定します。

<!-- proof-start -->
### 証明

F=true とする。判断の第一分岐が選ばれ、P の値がいずれでも A=false となる。よって許可には F=false が必要である。

F=false とする。このとき第二分岐が選ばれ A=P となる。P=true なら A=true、P=false なら A=false である。従って A=true なら F=false かつ P=true であり、その二条件が成立すれば第二分岐から A=P=true である。P=false の場合には第一分岐でも第二分岐でも false、F=true なら第一分岐で false なので最後の二結論も従う。
<!-- proof-end -->

この結果から、拒否を表す規則を追加しても既存の許可規則によって上書きされないことを確かめます。例えば利用停止の処理は既存の閲覧・書込ポリシーを探して書き直すのではなく、拒否規則を付け加える方法で表現できます。

<a id="prop-lvt6-04-guardrail"></a>

<!-- formal-statement-start -->
### 命題（利用停止規則の拒否保存）

有限認可ポリシーモデルで blocked=true の任意の要求 r を取る。任意の有限規則列 L の先頭に S を付けた列を S::L とすると A(r,S::L)=false である。さらに、任意の位置に規則を挿入しても S を残す限り判断は false である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

S は blocked=true のとき必ず条件を満たす forbid である。列 S::L の拒否集約値は、先頭の評価 true と残りの F(r,L) の論理和である。後者が false なら true OR false=true、true なら true OR true=true なので F(r,S::L)=true である。[認可判断の許可条件](#prop-lvt6-04-decision) から A=false となる。

挿入後も S が残っているなら、その位置の条件評価は true である。任意の有限列で一つの true を含む論理和は true となることを確認する。S より後ろの評価の論理和を b とすると、S から末尾までの論理和は true OR b=true である。前に一要素追加するたびに、その評価 c が true でも false でも c OR true=true となる。S より前の要素の個数についてこれを反復すれば列全体の F=true が得られる。再び同じ命題から A=false である。
<!-- proof-end -->

順序を交換しても「ある」という条件は変わりません。同じ規則を追加しても既に存在する一致の有無は変わりません。従って順序・重複はこの判断に影響しません。一方、S を削除する場合や blocked を誤って false と分類する場合は命題の仮定が失われます。

## 3. Leanでモデルを実行する

[Leanソース](lab/LvtAuthorization.lean) は Role、Action、Request、Rule を型とし、permitMatch、forbidMatch で一つの規則の条件を計算します。hasPermit と hasForbid は List.any で集約し、authorize は if で拒否優先にします。allowIff は二つの集約値について場合分けして上の四行を検査します。defaultDeny と forbidDominates はそれぞれ許可がない場合と拒否がある場合を直接検査します。prependSuspended は S を先頭に付けると List.any の先頭の判定が true になることを使います。任意位置に S が残る場合の紙上の論証は第2節です。

[Inspect.lean](lab/Inspect.lean) の #guard は競合、正常許可、空列、順序変更を確認し、#print axioms は定理が依存する公理を表示します。[Failure.lean](lab/Failure.lean) は競合でも許可されるという誤った等式を反射律で証明しようとする例です。[Leanの等式と反射律](../LVT2-03/index.md#def-lvt2-03-eq) は両辺が等しい場合に適用できるので、この例は拒否されます。

## 4. 独立したTypeScript実装と比較する

Leanの判断を参照モデルとして、[観測付き差分検査](../LVT5-01/index.md#def-lvt5-01-observed) を行います。観測は許可なら文字 1、拒否なら 0 です。[Main.lean](lab/Main.lean) は役割・操作・停止ビット・規則列をコマンドライン引数として読み、妥当な入力について一行を返します。不明な文字列には終了コード2を返し、判断値と入力エラーを区別します。

[TypeScriptの比較ハーネス](lab/differential.ts) は規則列を Set（重複を取り除く集合）に変換してから判定する別実装を用意します。R があり read、または W があり editor/write なら許可候補、S があり blocked なら拒否候補です。まず八種類の要求と三規則の全ての部分集合（8通り）を組み合わせて64件を検査します。例えば L=[R,W,S] の八件は次の通りです。

| role | action | blocked=false | blocked=true |
|---|---|---|---|
| viewer | read | 許可 | 拒否 |
| viewer | write | 拒否 | 拒否 |
| editor | read | 許可 | 拒否 |
| editor | write | 許可 | 拒否 |

次に fast-check で要求と長さ0〜12の規則列を生成し、順序や重複を含めて比較します。正常実装とは別に、許可候補が真なら拒否候補を無視する変異を作ります。例えば r=(editor,write,true)、L=[W,S] では P=true、F=true なので Lean は 0、変異は 1 です。長さ1以下では permit と forbid が同時に存在しないため、変異が現れるには最低2規則が必要です。これは縮小アルゴリズムに頼らず示した最短性です。

Codespaces（GitHubへのログインと利用枠が必要）のリポジトリルートから次を実行します。Lean 4.35.0、Node.js 22.16.0、fast-check 3.23.2を用います。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT6-04/lab"
lake build
lake test
lake env lean Inspect.lean
npm install --ignore-scripts
npm test
# 意図的な失敗
lake env lean Failure.lean
```

比較ハーネスは64件の比較、固定競合例、100回の生成比較、変異探索を行います。seed は20261125です。標準出力が一行の 0 または 1 で、標準エラーが空であることも確認します。未知の役割・操作・停止値・規則と引数不足は入力エラーとして別に検査します。変異探索では seed、縮小パス、入力を記録します。Nodeの型注釈除去による実行であり、静的型検査とは区別します。

全64件の一致は、この八要求と八部分集合という有限領域での実行結果です。任意長の列に関するLeanの証明と、実際のTypeScriptプログラムがすべての入力で同じ結果を返すという定理とは異なります。また blocked の取得元やHTTP経路で認可が必ず実行されることは、ここでの入力・出力比較に含まれません。

## 5. 演習と詳細解答

### Level A

### LVT6-04-A01 閲覧と書込の判定

L=[R,W]、blocked=false とする。viewer の read と write、editor の write の P,F,A を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

S がないため三要求とも F=false。viewer/read では R が真、W は write でないため偽で P=true、A=true。viewer/write では R が偽、W は editor でないため偽で P=false、A=false。editor/write では R が偽、W が真で P=true、A=true。いずれも F=false なので A=P を使った。
<!-- solution-end -->

### LVT6-04-A02 空列と不一致

editor/write、blocked=false に対し、L=[] と L=[R,S] の判断を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

空列ではどの規則も存在しないので P=F=false、A=false。[認可判断の許可条件](#prop-lvt6-04-decision) により、L=[R,S] でも R は read 条件が偽、S は blocked が false なので偽。W は存在しないため P=false、F=false、A=false。規則が存在することと条件を満たす規則が存在することは違う。
<!-- solution-end -->

### LVT6-04-A03 競合

r=(editor,write,true)、L=[S,W,W] の判断を求め、W をさらに追加するとどうなるか説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

S の条件は真、二つの W も editor/write なので真。F=true、P=true となるため A=false。W を追加すると許可候補の論理和は true OR true=true、拒否候補は既存 S により true のままである。[利用停止規則の拒否保存](#prop-lvt6-04-guardrail) から追加後も A=false。
<!-- solution-end -->

### LVT6-04-A04 順序と重複

r=(viewer,read,false) に対し L=[R,S] と L'=[S,R,R] の判断を比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

L は R が真、S が偽なので P=true、F=false。L' は S が偽、二つの R が真なので P=true OR true=true、F=false。双方とも A=P=true。順序交換と R の重複が判断を変えない具体例である。
<!-- solution-end -->

### Level B

### LVT6-04-B01 許可規則追加の効果

任意の要求 r と有限列 L について、R または W を一つ追加したとき、もとが許可なら許可が維持されることを示せ。もとが拒否なら常に維持されるか。

- Level: B

<!-- solution-start -->
#### 詳細解答

もとが許可なので [認可判断の許可条件](#prop-lvt6-04-decision) より P=true、F=false。追加規則の許可条件を q とすると P'=true OR q=true。追加規則は forbid でないので F'=false OR false=false。従って A'=true。

もとが拒否なら常に維持されるわけではない。r=(viewer,read,false)、L=[] では P=F=false で拒否。R を追加すると P'=true、F'=false となって許可へ変わる。逆に F=true が理由の拒否は permit 追加では F が変わらないため維持される。
<!-- solution-end -->

### LVT6-04-B02 誤った拒否条件

S を削除したモデルで利用停止者が必ず拒否されるという主張を反証し、停止情報の誤分類も説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

r=(viewer,read,true)、L=[R] とする。R は read なので P=true、S が存在せず F=false なので A=true。停止者を拒否するには S が必要であり、[利用停止規則の拒否保存](#prop-lvt6-04-guardrail) の仮定が失われている。次に L=[R,S] でも実際の停止者を誤って r'=(viewer,read,false) として入力すれば R は真、S は偽、P=true、F=false で許可となる。正しいモデルの定理は入力された blocked=true に適用されるのであって、外部の分類の正しさまでは示さない。
<!-- solution-end -->

### LVT6-04-B03 変異の最短反例

許可候補を優先する変異が正常な認可器と異なるのはどの P,F の組か。最短の規則列と要求を与えよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

変異は P=true なら許可し、それ以外は拒否するので P がその判断である。正常判断は F=true なら false、F=false なら P。F=false では常に一致、F=true かつ P=false でも双方 false。相違は P=F=true のみ。r=(viewer,read,true)、L=[R,S] なら R と S がともに真なのでこの組が実現する。空列なら両候補が偽。一規則なら permit と forbid のどちらか一種類にしか属せず、両候補を真にできない。従って長さ2が最小。
<!-- solution-end -->

### Level C

### LVT6-04-C01 保証を分解する

三種類の規則の全ての部分集合と全要求を照合する試験を設計し、競合変異の反例、列の重複・順序、実システムの未証明事項を区別せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

role、action、blocked の各成分は2通りで要求は 2×2×2=8 通り。R,W,S を含むか否かも各2通りなので部分集合は 2×2×2=8 通り。各要求と各集合を一度ずつ組み合わせれば64件となる。例えば editor/write/true と [W,S] を比較すると W の条件が真で P=true、S の条件も真で F=true。正常の第一分岐は 0、許可優先の変異は 1 なので固定反例になる。

部分集合としての八列だけでは [S,W] や [W,S,W] を別入力として実行しない。理論上はどの規則が存在して条件を満たすかだけで P,F が決まるので、順序と重複は判断を変えない。しかしTypeScript側の入力処理が誤って先頭規則だけを調べる可能性はある。生成比較では順序・重複も含め、固定反例と併せて確認する。第4節のコマンドを実行して出力の一行形式と終了コードを検査し、失敗時は seed、縮小パス、具体入力を記録する。

[認可判断の許可条件](#prop-lvt6-04-decision) は任意の有限規則列のLeanモデルに成立する。比較試験は64件と生成した列の観測一致を検査する。認証済み利用者から role を正しく取得すること、blocked を改ざん不能にすること、全HTTP経路で副作用の前に認可することは別の保証責務である。実際のCedarの評価エラーや複雑な条件もこのモデルの外にある。
<!-- solution-end -->

## 6. 次講への接続

判断関数の安全性を証明することと、実際のAPIがその判断を必ず使用することは別々の検証課題です。次講ではテナント境界を含む独立した要求仕様と、サーバー側の認可適用を扱います。
