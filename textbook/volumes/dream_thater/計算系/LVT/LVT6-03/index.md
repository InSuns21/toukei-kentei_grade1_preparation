# LVT6-03 TypeScriptワークフローの仕様と照合

前提講座：[LVT3-05 状態遷移系・到達可能性・不変量](../LVT3-05/index.md)、[LVT5-05 TypeScript差分テスト](../LVT5-05/index.md)、[LVT5-06 Stateful DRTと遷移列](../LVT5-06/index.md)、[LVT6-02 三目並べの変異バグ](../LVT6-02/index.md)。

前講ではゲームの規則を破るバグを差分検査で発見しました。今回は申請の承認を経ずに公開されないことを要求とします。画面上のボタンを消すだけでは、別の経路から公開操作が呼ばれたときの安全性は分かりません。そこで操作列を受け取る小さな仕様を作り、仕様の安全性を証明してから別実装と比較します。

**ブラウザで実行：** [本講の実行ラボ](../browser-lab.html?chapter=LVT6-03)。Leanの状態遷移・証明・拒否例を試せます。TypeScriptとの比較は第4節のCodespaces端末で行います。

## 1. 要求を遷移表へ変換する

文書は draft（下書き）、submitted（申請済み）、approved（承認済み）、published（公開済み）のいずれかの段階にあります。承認を受けた記録を reviewed という真偽値で持ちます。初期状態は draft、false です。操作は submit（申請）、approve（承認）、publish（公開）、return（差し戻し）の四つです。ここでは一つの文書に対して直列に操作するものとし、操作者の認証や並行更新は扱いません。

| 現在段階 | 受理する操作 | 次段階 | 次の reviewed |
|---|---|---|---|
| draft | submit | submitted | false |
| submitted | approve | approved | true |
| submitted | return | draft | false |
| approved | publish | published | 現在値 |
| approved | return | draft | false |
| published | なし | — | — |

表にない組は拒否し、段階と reviewed の両方を保持します。操作の結果は受理フラグと次状態の組です。既習の[単一初期状態の遷移モデル](../LVT3-05/index.md#def-lvt3-05-system)に当てはめると、状態は四段階と二つの真偽値の直積（8通り）、操作は4通り、遷移は32組について全域的です。入力の文字列が四操作のどれでもないときは、モデルの外で入力エラーとします。

<a id="def-lvt6-03-workflow"></a>

<!-- formal-statement-start -->
### 定義（文書公開ワークフロー）

状態は draft・submitted・approved・published のいずれかの段階と、真偽値 b の組とする。操作は submit・approve・publish・return の四種類、初期状態は (draft,false) とする。以下の五組を受理し、受理フラグ true と指定の次状態を返す。

| 段階 | 操作 | 次状態 |
|---|---|---|
| draft | submit | (submitted,false) |
| submitted | approve | (approved,true) |
| submitted | return | (draft,false) |
| approved | publish | (published,b) |
| approved | return | (draft,false) |

それ以外の段階と操作の組では受理フラグ false と元の状態を返す。有限の操作列はこの遷移を左から順に適用し、拒否の場合にも次の操作へ進む。
<!-- formal-statement-end -->

例えば submit, approve, return, submit, publish を順に与えると、申請、承認、差し戻し、再申請までは受理されます。最後の公開は submitted からなので拒否され、状態は (submitted, false) のままです。拒否後も実行を続ける契約なので、その後の approve, publish はともに受理されます。

## 2. 安全性を証明する

承認済みと公開済みでだけ reviewed が true となる条件を整合条件とします。これは初期状態だけの性質ではなく、一回の遷移で保たれることを確かめたい性質です。既習の[帰納的不変量](../LVT3-05/index.md#def-lvt3-05-inductive)の考え方で、段階を p、記録を b とし、approved と published で true、それ以外で false を返す関数を R とします。

$$
I(p,b) :\Longleftrightarrow b=R(p).
$$

例えば (approved, true) は整合し、(approved, false) は整合しません。後者も型には属するので、証明では初期状態から到達することと型に属することを区別します。

<a id="prop-lvt6-03-preservation"></a>

<!-- formal-statement-start -->
### 命題（公開ワークフローの整合条件の保存）

文書公開ワークフローの状態が整合条件を満たすなら、四操作のいずれを適用した次状態も整合条件を満たす。初期状態から任意の有限操作列を実行した最終状態も整合条件を満たす。特に到達した published 状態の承認記録は true である。
<!-- formal-statement-end -->

**証明の見取り図**　受理される五組だけ調べればよく、拒否では状態が変わりません。これを任意の有限列へ帰納法で延長します。

<!-- proof-start -->
### 証明

整合する状態 (p,b) を取る。受理の五組を調べる。

- draft から submit：次状態は (submitted,false)。R(submitted)=false なので整合する。
- submitted から approve：(approved,true)。R(approved)=true。
- submitted から return：(draft,false)。R(draft)=false。
- approved から publish：仮定から b=R(approved)=true。次状態は (published,b) で R(published)=true=b。
- approved から return：(draft,false)。R(draft)=false。

残り11組の段階と操作では次状態が (p,b) のままであり、仮定がそのまま成り立つ。従って一回の保存が示された。

有限列について、任意の整合する開始状態 s からの実行で整合性が保たれることを列の構造帰納法で示す。空列なら最終状態は s。先頭操作 a と残りの列 v からなるとき、s に a を適用した次状態 s' は一回の保存により整合する。帰納仮定を開始状態 s' と列 v に適用すると最終状態も整合する。初期状態 (draft,false) は R(draft)=false により整合するので結論が従う。任意の接頭列も有限列なので、途中の各状態についても同じ結論が成立する。published なら R(published)=true だから b=true。
<!-- proof-end -->

記録が真であるだけでは、いつ承認されたかが分からないモデルも考えられます。本モデルでは false から true へ変える唯一の操作が submitted からの approve で、差し戻しと申請では false に戻します。この更新規則と次の結果を合わせると、受理された公開に先立つ承認が必要であることを説明できます。

<a id="prop-lvt6-03-publish-source"></a>

<!-- formal-statement-start -->
### 命題（公開の受理条件と拒否時の状態保持）

文書公開ワークフローの任意の状態について、publish が受理されることと、操作前の段階が approved であることは同値である。任意の四操作が拒否されたなら次状態は操作前の状態に等しい。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

publish の列を遷移表で読む。draft、submitted、published には受理行がなく、approved だけに受理行がある。よって受理なら approved であり、approved なら受理する。記録 b の値は判定を変えない。拒否は受理する五組の補集合であり、各組の規則は元の状態を返すことなので、記録も段階も変化しない。
<!-- proof-end -->

[整合条件の保存](#prop-lvt6-03-preservation)より、初期状態からの操作列の中で publish を受理する直前は (approved,true) です。この true は、それ以前の受理された approve で作られ、以降に return や submit があれば false に戻ります。従って最後の申請以後に受理された承認があります。approved,false という到達不能な状態から始めれば publish は受理されるので、初期状態の仮定を外してこの保証を主張してはいけません。

## 3. Leanでどの命題を検査するか

[Leanの実装](lab/LvtWorkflow.lean) では Phase、Action、State を型にし（return は Lean の予約語なので sendBack と表記し）、step が受理フラグと状態を返します。consistent は上の等式を命題として表す述語です。preserve は段階4種と操作4種に場合分けし、受理された公開では仮定の等式から記録を読み取ります。run は操作列を一つずつ消費する再帰関数で、runPreserve の帰納仮定は任意の開始状態に対して使えるようにしています。publishSource と rejectedUnchanged は第2節の二つの結論を個別に確認します。

例えば初期状態から submit, approve, publish を実行すると (published,true) です。submit, publish では最後が拒否されるので (submitted,false) です。[Inspect.lean](lab/Inspect.lean) の #guard と #eval で確認し、#print axioms で定理の依存する公理を調べます。[Failure.lean](lab/Failure.lean) は初期状態からの publish が受理されるという誤った等式を証明しようとして拒否されます。具体例の計算と、全操作列についての帰納法を区別しましょう。

## 4. TypeScript実装を仕様と照合する

[状態付き観測列](../LVT5-06/index.md#def-lvt5-06-stateful-trace)として、各操作の直後の受理フラグ、段階、承認記録を順に比較します。例えば submit, publish, approve, publish の観測は以下の通りです。

| 操作 | 受理 | 段階 | reviewed |
|---|---|---|---|
| submit | 1 | submitted | 0 |
| publish | 0 | submitted | 0 |
| approve | 1 | approved | 1 |
| publish | 1 | published | 1 |

[Main.lean](lab/Main.lean) は文字列の操作を解析して Lean の step を逐次実行するCLIです。未知操作があれば先に全体を拒否して終了コード2を返します。空列は空出力、その他の列は各操作に対し受理ビット、段階名、記録ビットをカンマで区切った一行を出します。

[差分ハーネス](lab/differential.ts) の製品は TypeScript の遷移表を用いて段階を更新し、承認と差し戻しで記録を更新します。Leanからコード生成したものではありません。CLIの終了コード、標準エラー、応答行数、行形式を確認し、行を順序どおり比較します。fast-check は四操作を要素とする長さ0〜24の列を生成します。固定例では差し戻し、拒否、終局後操作、空列も確認します。未知操作はCLIで別に拒否を確認します。

故意の変異は submitted から publish する経路を一つ追加することです。入力 submit, publish では、1行目は両者とも 1,submitted,0。2行目は仕様が 0,submitted,0、変異が 1,published,0 になります。最初の相違は2行目。変異は承認なしに公開するので安全性も破ります。長さ1以下の操作列は初期段階 draft からしか動かず、変異経路に到達できません。従ってこの入力は最短です。生成器の縮小結果が常に全体最短になると仮定せず、ここでは遷移表から最短性を別に確認しました。

Codespacesを開き（GitHubへのログインと利用枠が必要）、以下を端末で実行します。Lean 4.35.0、Node.js 22.16.0、fast-check 3.23.2を使います。Nodeの型注釈除去による実行であり、静的型検査とは別です。

~~~bash
cd "$(git rev-parse --show-toplevel)/textbook/volumes/dream_thater/計算系/LVT/LVT6-03/lab"
lake build
lake test
lake env lean Inspect.lean
npm install --ignore-scripts
npm test
# 意図的な失敗
lake env lean Failure.lean
~~~

npm test は固定例・100回の生成比較・変異探索を実行します。seed は20261125です。変異探索の出力には seed、縮小パスと反例列が出ます。固定反例 submit, publish は生成結果と独立して必ず検査します。実験欄から Lean Web に送るソースは実ファイルを連結したものです。外部サービスのLeanの版は固定CLIと異なる場合があります。

Leanの証明は定義された step と任意の有限操作列についての保証です。実行比較が成功しても、TypeScriptの任意長の列、文字列解析、並行操作、認証やDB更新まで証明したことにはなりません。今回のモデルの境界は一文書・直列実行・四操作です。

## 5. 演習と詳細解答

### Level A

### LVT6-03-A01 直列操作

submit, approve, return, publish の各観測を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

初期は (draft,false)。submit は受理し (submitted,false)、approve は受理し (approved,true)、return は受理し (draft,false)。draft から publish は表にないため拒否して元状態を保つ。観測は順に 1,submitted,0、1,approved,1、1,draft,0、0,draft,0。
<!-- solution-end -->

### LVT6-03-A02 状態の整合性

四段階と真偽値の全8組のうち、整合条件を満たす組を列挙せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

R は draft と submitted で false、approved と published で true。各段階について b=R(p) を満たす b は一つだけなので、(draft,false)、(submitted,false)、(approved,true)、(published,true) の四組。各段階で反対の記録を持つ残り四組は不整合。
<!-- solution-end -->

### LVT6-03-A03 空列と拒否

空列、publish, approve、submit の三入力の最終状態と受理数を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

空列では更新がなく (draft,false)、受理数0。publish は draft で拒否され、[拒否時の状態保持](#prop-lvt6-03-publish-source)により approve の直前も draft。approve も拒否なので (draft,false)、受理数0。submit は draft から受理され (submitted,false)、受理数1。
<!-- solution-end -->

### LVT6-03-A04 最短正常公開

初期状態から公開する最短の受理操作列と長さを求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

公開には approved が必要（[公開の受理条件](#prop-lvt6-03-publish-source)）。approved に入る行は submitted から approve のみ、submitted に入る行は draft から submit のみ。従って最低3操作が必要。submit, approve, publish は各行を順に通り (published,true) へ到達するので長さ3で実現する。
<!-- solution-end -->

### Level B

### LVT6-03-B01 記録を消し忘れる変異

approved から return したとき、段階は draft に戻るが記録を保持する変異を考える。最短の検出列と壊れる整合条件を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

submit で (submitted,false)、approve で (approved,true) に至る。return の正常結果は (draft,false)、変異は (draft,true)。両方受理するが第三観測の記録が異なる。R(draft)=false に対し true なので [整合条件の保存](#prop-lvt6-03-preservation) が壊れる。変異が働くには approved への到達が必要で、最低2操作、その次に return なので3操作が下限。この列は下限を達成する。
<!-- solution-end -->

### LVT6-03-B02 終状態だけの比較

B01の変異に対して submit, approve, return, submit を入力する。全観測と最終状態だけの比較の差を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

最初の二行は両者とも 1,submitted,0 と 1,approved,1。第三行は仕様が 1,draft,0、変異が 1,draft,1。第四行の submit はどちらも (submitted,false) に更新するため最終行は両者とも 1,submitted,0。[状態付き観測列](../LVT5-06/index.md#def-lvt5-06-stateful-trace)なら第三行の差を検出するが、最終状態だけでは見逃す。
<!-- solution-end -->

### LVT6-03-B03 初期条件を外す

任意の State から開始しても公開記録は必ず true となる、という主張を反証し、正しい仮定を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

(approved,false) は State の型に属する。publish の受理条件は approved であることだけなので受理し、記録を保持する結果は (published,false)。従って主張は偽。開始状態が整合条件を満たすことを仮定すれば、[整合条件の保存](#prop-lvt6-03-preservation)を任意の有限列に適用でき、published では R(published)=true だから記録は true になる。初期状態はその仮定を満たす。
<!-- solution-end -->

### Level C

### LVT6-03-C01 承認の迂回を切り分ける

第4節の submitted から publish を許す変異について、最短反例の証明、比較すべき観測、再現実験と保証の限界を説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

空列では状態は一致。長さ1なら操作前は draft なので変更した submitted の行を使わない。submit は両者で (submitted,false) を返す。次の publish は正常仕様で拒否され (submitted,false) のまま、変異では受理され (published,false) になる。従って長さ2で差が生じ、短い列には差がないため最短。受理フラグ、段階、記録を比較する。記録だけなら両者 false なので検出できない。変異後の状態では R(published)=true と記録 false が不一致なので [整合条件の保存](#prop-lvt6-03-preservation) も破れる。

第4節のコマンドで lake build、lake test、npm test を実行し、固定反例と生成比較を確かめる。生成反例の seed、縮小パス、操作列、使用した版を保存する。最初の相違の位置を見て、CLIのエラーや行数不一致と製品の結果不一致を区別する。Leanモデルの保存命題は任意の有限列を扱うが、TypeScriptは固定例と生成した列で照合しただけである。別の経路からのDB更新や認証の誤り、並行更新はこの実験と証明の対象外である。
<!-- solution-end -->

## 6. 次講への接続

状態と操作を固定すると、受理条件を遷移表で説明し、その安全性と実装の対応を別々に検査できます。次講では受理・拒否の判断そのものを認可ポリシーとして扱います。
