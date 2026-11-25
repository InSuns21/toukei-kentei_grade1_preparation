# LVT6-05 サーバーサイドTypeScript認可の完全性の証明：API・テナント境界

**前提講義：** [LVT3-05](../LVT3-05/index.md)、[LVT3-07](../LVT3-07/index.md)、[LVT5-05](../LVT5-05/index.md)、[LVT5-06](../LVT5-06/index.md)、[LVT6-04](../LVT6-04/index.md)。

前講では規則から許可と拒否を合成しました。今回は「正しい利用者を許可する」ことと「許可されていない利用者を拒否する」ことを別々に調べます。さらに、判定関数が正しくても、あるAPIだけ判定を呼ばなければ保護は成立しません。

**ブラウザで実行：** [本講の実行ラボ](../browser-lab.html?chapter=LVT6-05)。Lean の判断・証明・意図的な失敗を試せます。TypeScript のサーバー側ルート関数と差分検査は第5節の端末で実行します。

## 1. 業務仕様を先に決める

API は外部からプログラムの操作を要求する窓口です。ここでは project（作業用資源）の取得 GET、更新 PATCH、削除 DELETE を考えます。テナントとは利用者と資源を所属させる組織単位です。認証は利用者の身元の確認、認可は操作の許可判断です。主体 principal は認証結果に含まれる利用者ID、所属テナントID、役割（viewer、editor、admin）を持ちます。資源 resource はサーバー側で取得した project ID、テナントID、所有者IDを持ちます。操作 action は read、update、delete の三種類です。

IDは空でない英数字・ハイフンの文字列とします。要求に含まれる project ID からサーバー内の資源を検索し、認証済みの主体の情報もサーバーから得ます。クライアントが主張する役割・所有者・テナントは採用しません。未知の操作、未知の役割、未認証、IDの形式不良、存在しない資源は拒否します。認証と検索の結果が真正であることは本講の仮定であり、認証プロトコルそのものは扱いません。

業務上の許可表を、実装より先に次のように確定します。以下の表は認証済みで、主体と資源のテナントが一致する場合に限ります。

| 役割 | read | update | delete |
|---|---|---|---|
| viewer | 許可 | 拒否 | 拒否 |
| editor | 許可 | 自分が所有するときのみ許可 | 拒否 |
| admin | 許可 | 許可 | 許可 |

別テナントの場合は、adminでも、所有者IDが偶然一致していても全操作を拒否します。正規化とは、ここでは具体的な入力を検査し、既知の役割と操作、認証の有無、テナント一致、所有者一致という五つの成分に変換することです。役割や操作の型が不明な入力は正規化に失敗します。

<a id="def-lvt6-05-permission"></a>

<!-- formal-statement-start -->
### 定義（テナント付き要求の許可仕様）

要求の抽象領域 T は、役割 v（viewer、editor、admin）、操作 a（read、update、delete）、真偽値 t（テナント一致）、o（所有者一致）、b（認証済み）からなる五つ組とする。認証済みの部分領域を R とする（b=true）。

許可述語 P(r) は、r が T に属し、b=true、t=true であり、かつ次の少なくとも一つが成立するときに成立する。

- v=admin
- a=read
- v=editor、a=update、o=true

型の不明な入力、資源検索失敗などは T に入れず拒否する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt6-05-permission -->
**定義の確認。** 認証済み editor のIDが u1、所属が t1、project の所有者が u1、所属が t1 なら update に対して b=t=o=true、v=editor、a=update です。三番目の条件を満たすため P は成立します。project の所属だけ t2 に変えると t=false で、所有者の一致が残っていても P は不成立です。未認証なら b=false であり、admin/read でも P は不成立です。
<!-- definition-example-end -->

## 2. 判定関数の両方向を証明する

実行できる判断 D は Bool を返す関数です。まず b が偽なら拒否し、次に t が偽なら拒否します。残りでは役割と操作の表を使い、editor/update のときだけ o を返します。判定が真なのに仕様が不成立なら不正許可、仕様が成立するのに判定が偽なら許可漏れです。この二つをそれぞれ安全性、完全性の失敗として区別します。

<a id="prop-lvt6-05-sound"></a>

<!-- formal-statement-start -->
### 命題（認可判定の安全性）

T の任意の要求 r に対し、D(r)=true なら P(r) が成立する。ここで D は未認証または別テナントなら false、それ以外では admin に全操作を、viewer に read を、editor に read と所有者一致時の update を許可する真偽値関数である。P は [テナント付き要求の許可仕様](#def-lvt6-05-permission) の述語である。
<!-- formal-statement-end -->

見取り図：真を返した時点で二つの入口検査を通っています。その後に真を返す分岐をすべて列挙し、仕様の条件を一つずつ得ます。

<!-- proof-start -->
### 証明

D(r)=true とする。b=false なら第一検査で D=false となり矛盾する。b=true で t=false なら第二検査で D=false となり矛盾する。従って b=t=true。

admin の場合、仕様の第一条件 v=admin が成立する。viewer の場合、update と delete は false を返すので a=read であり、第二条件が成立する。editor の場合、delete は false なので a=read または update。read なら第二条件が成立する。update なら D=o だから o=true、従って第三条件が成立する。役割は三種類に限るため尽くした。いずれも b=t=true と合わせて P(r) が成立する。
<!-- proof-end -->

<a id="prop-lvt6-05-complete"></a>

<!-- formal-statement-start -->
### 命題（認可判定の完全性）

T の任意の要求 r に対し、[テナント付き要求の許可仕様](#def-lvt6-05-permission) の P(r) が成立するなら、[認可判定の安全性](#prop-lvt6-05-sound) で定めた D(r)=true である。
<!-- formal-statement-end -->

見取り図：今度は仕様を出発点にします。許可される三つの理由から、実装が通る分岐を逆向きに確認します。

<!-- proof-start -->
### 証明

P(r) より b=t=true なので入口検査は通過する。第一条件 v=admin が成立するなら、操作によらず D=true。第二条件 a=read が成立するなら、admin、viewer、editor の各 read 分岐はすべて true である。第三条件 v=editor、a=update、o=true が成立するなら、editor/update 分岐で D=o=true。論理和の少なくとも一つが真であるから D=true を得る。
<!-- proof-end -->

二命題を合わせると D(r)=true と P(r) が同値になります。特に R 上でも成立します。T の外の入力には D を直接適用せず、正規化失敗として拒否します。未認証は b=false の場合として扱えるため、T 内に保持して拒否することもできます。

例えば認可を常に false にする関数は安全性を満たします（前件が一度も成立しない）が、同一テナントの viewer/read を拒否するので完全性を満たしません。安全性だけを検査して終了してはいけません。

## 3. API経路で認可を強制する

判定関数の証明をAPIへ接続します。保護対象ルートを GET、PATCH、DELETE と固定します。副作用とは、ここでは資源データを返すことも含め、保護された情報の読出し・更新・削除を実行することです。認可の前には、要求の形式検査、認証の確認、資源の検索と一致判定だけを行います。検索結果は許可前にクライアントへ返しません。

各要求は raw（受信）、normalized（形式確認）、authenticated（認証確認）、checked（認可済み）、effect（保護操作実行）を順に進みます。拒否の場合はそれ以上進みません。形式確認に失敗した要求は raw で終了し、認証が偽なら normalized で、D が偽なら authenticated で終了します。資源検索と一致判定は認可までに済ませます。この有限列を実行経路として観察します。

<a id="def-lvt6-05-route"></a>

<!-- formal-statement-start -->
### 定義（保護操作の実行経路モデル）

入力は形式検査結果 valid と、T に属する要求 r とする。valid=false のとき経路は [raw]、valid=true かつ b=false のとき [raw, normalized]、valid=true かつ b=true かつ D(r)=false のとき [raw, normalized, authenticated] とする。それ以外では [raw, normalized, authenticated, checked, effect] とする。effect は保護操作の実行を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt6-05-route -->
**定義の確認。** 形式が正しく、認証済みの editor が同一テナントの他人の資源を更新すると、valid=true、b=t=true、o=false なので D=false。経路は authenticated で止まる三要素の列です。同じ要求の所有者だけ本人に変えると D=true になり、checked、effect がこの順で追加されます。
<!-- definition-example-end -->

<a id="prop-lvt6-05-route-safe"></a>

<!-- formal-statement-start -->
### 命題（保護操作の認可先行性）

[保護操作の実行経路モデル](#def-lvt6-05-route) に従う任意の valid と要求 r について、経路に effect が含まれるなら valid=true、b=true、D(r)=true であり、effect より前に checked が含まれる。また P(r) が成立する。
<!-- formal-statement-end -->

見取り図：可能な経路は四種類だけです。保護操作に到達できる経路を絞れば、認可前の実行がないことを確認できます。

<!-- proof-start -->
### 証明

valid=false なら経路は raw だけで effect はない。従って valid=true。b=false なら normalized までで effect はない。従って b=true。D(r)=false なら authenticated までで effect はない。従って D(r)=true。残る経路は raw、normalized、authenticated、checked、effect の順の五要素列で、checked は4番目、effect は5番目である。[認可判定の安全性](#prop-lvt6-05-sound) をこの r と D(r)=true に適用して P(r) を得る。
<!-- proof-end -->

これは [単一初期状態の遷移モデル](../LVT3-05/index.md#def-lvt3-05-system) の有限経路に特化した場合です。実装側でこの経路以外が存在しないかは別に調べます。例えば PATCH だけ checked を飛ばすと、他人の資源を更新できてしまいます。認可関数が正しいことはその反例を排除しません。

## 4. TypeScript のルートとサービス境界

[サーバー側コード](lab/api.ts) はHTTP通信そのものではなく、HTTPアダプターから呼ばれるルート処理を再現します。認証済み主体はサーバー内のセッション表から取得し、資源はサーバー内の表から取得します。外部要求にはメソッド、project ID、セッション識別子しか必要ありません。余計な主張は採用しません。

| 登録されたルート | 正規化する操作 | 保護操作 |
|---|---|---|
| GET | read | read |
| PATCH | update | update |
| DELETE | delete | delete |

呼出し関係は次の通りです。

~~~text
dispatch → 入力検査 → セッション・資源検索
         → authorize → guardedEffect → 保護操作
~~~

三ルートは同じ dispatch を使い、未知メソッドは拒否します。guardedEffect は許可を再検査します。内部の保護操作はモジュール外に直接公開しません。更新・削除を実行する関数を別のルートから呼べるように変更した場合、その経路も調査対象です。本例の保護操作は観測用のイベントを記録する小さな代替処理であり、実際のDB更新やHTTPサーバーの全経路を証明するものではありません。

[操作結果の詳細化条件](../LVT3-07/index.md#def-lvt3-07-refinement) と同じ発想で、具体入力から T への分類、分類後の判断、実行経路をそれぞれ照合します。実装に対して全入力の対応を証明するには、具体入力の分類が正しいこと、判断が五成分以外に依存しないこと、全ての実行経路が上のモデルに従うことが必要です。例えば、形式化した TypeScript の部分言語の意味論で各分岐を対応させるか、証明済み仕様から正しさを証明した生成器でコードを作る方法があります。

## 5. Leanと実装を比較する実験

[Leanモデル](lab/LvtTenant.lean) では Permitted を論理和と論理積で記し、decideAccess を役割・操作の分岐で記します。allowIff は役割3、操作3、残る真偽値3個の全72場合を場合分けして簡約します。soundness と completeness は同値の両方向です。traceSafe は effect を含む場合に入口条件と許可が成立することを示します。Leanの型にない文字列は [CLI](lab/Main.lean) が別に拒否します。

[比較ハーネス](lab/differential.ts) は 3×3×2×2×2=72 通りの抽象要求について Lean の判断と独立した TypeScript 判定を照合します。さらに全抽象要求を実際のルートへ具体化し、保護操作の有無と順序を確認します。[要求順の応答照合](../LVT5-05/index.md#def-lvt5-05-paired-observation) と [状態付き観測列](../LVT5-06/index.md#def-lvt5-06-stateful-trace) の観測を使い、許可値だけでなく経路のイベント列を比較します。固定例のほか、fast-check でIDや不正要求を生成します。

次の変異では、どの保証が破れるかを分けて観察します。

| 変異 | 反例と観測 |
|---|---|
| テナント検査を省く | 別テナントの admin/read が許可される |
| 所有者の代わりにテナント一致を使う | 同一テナントの非所有 editor/update が許可される |
| 未知役割を admin にする | 未知役割/read が許可される |
| PATCH の認可を省く | 認可なしで更新イベントが発生する |
| 内部サービスから保護操作を直接呼ぶ | checked なしで effect が発生する |

Codespaces（GitHub ログインと利用枠が必要）の端末で次を実行します。固定版は Lean 4.35.0、Node.js 22.16.0、fast-check 3.23.2 です。

~~~bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT6-05/lab"
lake build
lake test
lake env lean Inspect.lean
npm install --ignore-scripts
npm test
# 意図的な証明失敗
lake env lean Failure.lean
~~~

[Inspect.lean](lab/Inspect.lean) は許可・拒否・経路と定理の公理を表示します。[Failure.lean](lab/Failure.lean) は別テナントの admin/read が許可されるという誤った等式なので拒否されます。差分検査では72件の抽象判断とルート観測、5種類の変異の検出、生成検査を確認します。生成の seed は 20261125 で、失敗時は fast-check の反例と path を記録します。

| 証拠 | 保証対象 |
|---|---|
| Leanの定理 | 抽象領域 T の全要求と四経路 |
| 72件の照合 | 指定した有限抽象入力における実行結果 |
| ルート・変異・生成検査 | サンプル実装で観測した経路と不正入力 |
| 未形式化 | 認証、DBの整合性、競合、動的ルート、Node.jsの意味論 |

特に認可時と操作時で資源の所属が変わる場合は、同一スナップショットやトランザクション等で条件を保持する別の設計が必要です。

## 6. 演習と詳細解答

### Level A

### LVT6-05-A01 役割表

同一テナントの認証済み viewer と editor について、所有者でない場合の三操作を判定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

b=t=true、o=false なので入口を通る。viewer/read は true、update と delete は false。editor/read は true、update は o=false、delete は false。仕様の第二条件 a=read だけが成立するため、両役割とも read のみ許可となる。
<!-- solution-end -->

### LVT6-05-A02 テナント優先

別テナントの認証済み admin が所有者IDの一致する資源を削除する場合を判定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

b=true、t=false、o=true である。第一検査を通るが第二検査で D=false。仕様は t=true を必要とするので admin 条件が真でも P は偽である。所有者の一致とテナントの一致は別条件である。
<!-- solution-end -->

### LVT6-05-A03 正規化失敗

未知メソッド、存在しない資源、未認証のうち、どれが T の外でありどれを T 内の拒否として表せるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

未知メソッドは操作の三種類に属さず、存在しない資源は一致判定の対象がないため正規化できず T の外で拒否する。未認証については他の抽象成分が与えられていれば b=false として T 内に表現でき、D の第一検査で拒否される。実際のセッション検索失敗時には抽象成分を作らず拒否してもよい。
<!-- solution-end -->

### LVT6-05-A04 経路の比較

形式が正しい同一テナントの認証済み editor の update で、所有者一致が真と偽の場合の経路を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

入口条件は valid=b=t=true。o=true なら editor/update の D=o=true なので raw、normalized、authenticated、checked、effect の五要素。o=false なら D=false で raw、normalized、authenticated の三要素。checked 以降が存在しないので保護操作は起きない。
<!-- solution-end -->

### Level B

### LVT6-05-B01 安全性と完全性の独立

常時拒否と常時許可の二関数について P に対する安全性・完全性を判定せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

常時拒否は D=true の要求がなく、含意 D=true なら P はすべて真なので安全。同一テナントの認証済み viewer/read は P が真だが D=false なので完全ではない。常時許可は P が真なら必ず D=true なので完全。しかし b=true、t=false の admin/read でも D=true、P は偽なので安全ではない。従って二方向は互いに代用できない。
<!-- solution-end -->

### LVT6-05-B02 有限照合の数

72通りのうち許可となる件数を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

許可には b=t=true が必要なのでこの二成分は各1通り。残りの役割・操作・所有者一致は 3×3×2=18 通り。admin は三操作それぞれ o が2通りなので6件。viewer は read の o が2通りなので2件。editor は read が2件、update の o=true が1件、delete は0件なので3件。合計 6+2+3=11 件。拒否は72−11=61件。
<!-- solution-end -->

### LVT6-05-B03 所有者の取り違え

editor/update の所有者判定を常に t と置き換えた変異の反例を構成し、失われた条件を述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

主体 u1 と資源所有者 u2 を同じテナント t1 に置く。b=t=true、o=false である。元の D は editor/update で o=false を返す。変異は t=true を返すため不正許可になる。P の第一条件 admin は偽、第二条件 read も偽、第三条件は o=false で偽。従って P は不成立であり、[認可判定の安全性](#prop-lvt6-05-sound) が破れる。
<!-- solution-end -->

### LVT6-05-B04 入口を省くルート

PATCH だけ認可を行わずに effect へ進む実装について、判定関数が正しい場合にも成立しない命題を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

形式が正しく認証済み、同一テナントの viewer/update を選ぶ。D=false、P は偽である。正しい経路は authenticated で止まる。変異経路は raw、normalized、authenticated、effect となり effect を含むが checked がない。[保護操作の認可先行性](#prop-lvt6-05-route-safe) の経路モデルに従うという仮定が失われている。判定関数の安全性・完全性自体は変わらない。
<!-- solution-end -->

### Level C

### LVT6-05-C01 保証台帳と反例

第5節の実験を実行し、72件の照合、未知役割、テナント検査欠落、PATCH省略、内部サービス迂回を、どの保証を検査するか分類せよ。実システムで全入力の証明を主張するための残る条件も挙げよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

まず三役割、三操作、三つの真偽値を独立に列挙するため 3×3×2×2×2=72 件である。B02 の数え方により許可11件、拒否61件が期待される。正常な比較で全件一致することを確認する。未知役割は T に属さないので、文字列を admin に変換する変異を不正入力として検出する。別テナントの admin/read は t=false で P が偽なのにテナント検査省略では真になる。これらは分類と判定の失敗である。

PATCH の反例は B04 と同じ viewer/update。D は偽でも保護操作が観測されるため経路の失敗である。内部サービス迂回では raw から effect へ進む列を考えると checked がないため経路モデルと一致しない。実験出力で各変異が検出されることを確認し、生成失敗なら seed と path を保存する。

[認可判定の完全性](#prop-lvt6-05-complete) と安全性は T の全要求の論証だが、72件の実行は一般の具体入力に対する TypeScript の定理ではない。残る条件は、(1) 認証・資源検索の正確さ、(2) 具体IDの分類が全許容入力で正しいこと、(3) 判定が抽象成分のみに依存し常に D と一致すること、(4) 全保護経路が checked を経ること、(5) 判定時の条件が操作時まで保存されること、である。HTTP、DB、並行実行を追加する場合はこれらを改めて証明または検査する。
<!-- solution-end -->

## 7. 次講への接続

次講では、証明検査・差分テスト・継続的インテグレーションを組み合わせて、保証が失われたときに再現できる仕組みを作ります。
