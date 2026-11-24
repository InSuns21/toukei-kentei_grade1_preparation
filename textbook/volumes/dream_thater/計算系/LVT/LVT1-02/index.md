# LVT1-02 Lean環境・Lake・再現可能なプロジェクト

前提講座：[LVT1-01 テストと形式証明は何を保証するか](../LVT1-01/index.md)

前講では零判定の仕様をLeanで証明し、別実装をテストしました。今度は、その証明を別のPCでも同じ条件で検査できるようにします。ソースだけを渡しても、Lean本体の版や読み込むライブラリが違えば、同じ名前が見つからなかったり、型が変わったりします。本講では小さなプロジェクトを実際に組み立て、型の確認、具体値の計算、証明の検査、失敗の診断を区別します。

## 1. まず環境を固定する

Leanはコードを読み、型と証明を検査する処理系です。LakeはLeanと一緒に配布されるビルド・パッケージ管理ツールで、ファイル間の依存関係を調べて必要な順に処理します。elanは複数のLeanの版を管理し、プロジェクトごとに使う版を選ぶ道具です。ここでツールチェーンとはLean本体・Lakeなどをまとめた配布物です。

[公式のインストール案内](https://lean-lang.org/install/)に従い、VS CodeとLean 4拡張（leanprover.lean4）を導入します。拡張のセットアップ案内でelanを導入できます。端末のみを使う場合は[手動インストール案内](https://lean-lang.org/install/manual/)を参照してください。Windowsではセットアップ後に新しいPowerShellを開き、macOS・Linuxでは新しいシェルを開いて確認します。既存の環境に別の版が入っていても削除する必要はありません。

本章の lab ディレクトリを端末の作業ディレクトリにします。リポジトリを取得済みなら、ルートから次のように移動できます。

```bash
cd "textbook/volumes/dream_thater/計算系/LVT/LVT1-02/lab"
elan --version
elan show
lean --version
lake --version
```

初回は指定された版を取得するためネットワークが必要です。leanが見つからない場合はelanの実行ファイルへのPATH（コマンドを検索するディレクトリの一覧）を確認します。

本章では lean-toolchain の内容を次の一行に固定します。

```text
leanprover/lean4:v4.35.0
```

elan経由のleanとlakeは通常、現在位置からプロジェクトの設定を探して版を選択します。lean --version の表示で 4.35.0 を確認します。別の版が表示されるなら、作業ディレクトリ、PATH上のlean、elanのoverride（版を上書きする設定）や環境変数を調べます。必要なら elan toolchain install leanprover/lean4:v4.35.0 で明示的に取得できます。

## 2. 何を保存すれば再実行できるか

ソースとは人間が編集するプログラムのテキストです。外部依存とはそのプログラムが利用する別のパッケージです。依存先の名前だけでなく、取得する版やGitのコミット（変更履歴の一点を識別する値）を記録しないと、後日別内容を取得する可能性があります。Lakeは設定と解決した依存の情報を分けて保存します。

<a id="def-lvt1-02-fixed-environment"></a>

<!-- formal-statement-start -->
### 定義（固定されたLeanプロジェクト）

本章では、Leanのツールチェーンを具体的な版で指定し、ビルド設定、ソース、外部依存の解決済みの版を記録したプロジェクトを固定されたLeanプロジェクトと呼ぶ。再現時にはこれらを保存した時点と同じ内容に保つ。さらに実行するコマンドと観測対象（成功・失敗、具体的な出力）を指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lvt1-02-fixed-environment -->
**定義の確認**　本章の lab は lean-toolchain に v4.35.0、lakefile.lean にライブラリと実行対象、LvtEnvironment.lean と Main.lean にソースを記録しています。外部パッケージは利用せず、lake-manifest.json の packages は空配列です。後述する lake build、lake test と評価ファイルのコマンドを固定すれば、何を再現するかも指定できます。OSやCPUに依存するバイナリの完全一致まで要求する定義ではありません。
<!-- definition-example-end -->

| ファイル | 役割 |
| --- | --- |
| lean-toolchain | LeanとLakeの版 |
| lakefile.lean | パッケージ名・ライブラリ・実行対象・テスト対象 |
| lake-manifest.json | 解決済みの外部依存（この例は空） |
| LvtEnvironment.lean | 再利用する関数と証明 |
| Main.lean | 実行入口と具体例の検査 |
| Inspect.lean | 型と値を確認する実験 |
| Failure.lean | 型が合わない失敗例 |
| .gitignore | 生成物 .lake/ を管理対象から外す |

Lakeの設定は次のとおりです。

```lean
import Lake
open Lake DSL

package lvtEnvironment

lean_lib LvtEnvironment

@[default_target, test_driver]
lean_exe lvtEnvironmentDemo where
  root := `Main
```

importは別のファイルで公開された定義を読み込む命令です。ここではLakeの設定用の記法を読み込み、パッケージとライブラリの名前を指定します。lean_exeは実行ファイルの対象を宣言し、rootで入口となるMainモジュール（Leanソースの単位）を選びます。default_targetは引数なしのlake buildで作る対象、test_driverはlake testで起動する対象です。MainがLvtEnvironmentをimportするので、Lakeは先にライブラリを処理します。

外部依存を追加する講では設定ファイルと解決済みのmanifestを共に保存します。lake updateは依存の再解決に用いるコマンドであり、以前の検証を再現するときの習慣的な第一手ではありません。.lake/は生成物なので再作成できます。

## 3. 型を見ることと値を見ること

前講で見た Nat は0を含む自然数の型、Boolはtrueとfalseを持つ型でした。型は式がどの種類の値を表すかをLeanが判断するための情報です。関数型 Nat → Nat は自然数を受け取って自然数を返すことを表します。関数の定義では引数の名前と型を丸括弧に入れ、コロンの後に結果の型、:= の後に計算内容を書きます。

```lean
namespace LvtEnvironment

def bump (n : Nat) : Nat := n + 1

theorem bump_zero : bump 0 = 1 := rfl

end LvtEnvironment
```

namespaceは名前の衝突を避けるために名前をまとめます。定義した関数は外から LvtEnvironment.bump と書きます。theoremは証明を要求する命令です。ここで rfl は、両辺がLeanの定義に従って同じ式に簡約される等式を証明するための基本的な記法です。等式の詳細な証明方法は後の講で学びます。

<a id="prop-lvt1-02-bump-zero"></a>

<!-- formal-statement-start -->
### 命題（零入力での加算関数の値）

自然数を入力とし、自然数を返す関数 $b(n)=n+1$ について、$b(0)=1$ である。
<!-- formal-statement-end -->

**証明の見取り図**　関数定義に0を代入すると、両辺が同じ自然数になります。

<!-- proof-start -->
### 証明

関数の定義に $n=0$ を代入する。

$$
b(0)=0+1=1.
$$

最後の等号は自然数の加法における0の性質である。Leanでは関数の定義と自然数の具体的な計算から両辺が同じ値に簡約され、rflによる等式の証明が成立する。
<!-- proof-end -->

この命題は0に関する等式だけを述べます。前講の[有限な例示テストと全入力一致](../LVT1-01/index.md#prop-lvt1-01-test-boundary)で確認したように、具体的な入力の成功から別実装の全入力一致を推論することはできません。

Inspect.lean では型の検査を指示する #check と、式を具体的に評価する #eval を使います。

```lean
import LvtEnvironment

#check LvtEnvironment.bump
#check LvtEnvironment.bump 2
#eval LvtEnvironment.bump 2
#check LvtEnvironment.bump_zero
```

| 行 | 読み取る内容 |
| --- | --- |
| 1番目の #check | 自然数から自然数への関数（引数名付きで表示されることもある） |
| 2番目の #check | 式の型は Nat |
| #eval | 計算結果は 3 |
| 最後の #check | 証明された等式 LvtEnvironment.bump 0 = 1 |

2を渡すと、関数定義より $2+1=3$ です。型を見るコマンドは3を表示するためのものではなく、その式が自然数型であることを検査します。最後の行は定理名がどんな主張を持つかを確認するもので、すべての自然数を順に評価する命令ではありません。

## 4. 実行・検査・意図的な失敗

lab で次を順に実行します。

```bash
lake build
lake test
lake env lean Inspect.lean
```

lake env はLakeが設定するライブラリ探索環境のもとで後続コマンドを実行します。最初のコマンドではライブラリとMainを検査してビルドします。Main.leanの #guard は具体的な真偽を検査し、正しくない場合にエラーにする命令です。

```lean
import LvtEnvironment

#guard LvtEnvironment.bump 0 == 1
#guard LvtEnvironment.bump 2 == 3

def main : IO Unit := do
  IO.println (LvtEnvironment.bump 2)
```

== はここでは二つの自然数を比較して真偽値を返します。IO Unit は入出力を行い、意味のある戻り値を要求しない実行処理の型で、do は処理を並べる記法です。IO.println は値を一行表示します。lake testは指定した実行対象を起動し、3を出力して正常終了するはずです。ビルドの進行表示は環境で変わり得ます。#guard はソース検査中に確認され、実行時の表示とは別です。

次に次の一行を含むFailure.leanを単独で検査します。

```lean
import LvtEnvironment

#check LvtEnvironment.bump true
```

```bash
lake env lean Failure.lean
```

これは失敗することが期待されるコマンドです。bumpが必要とする型はNatですが、trueはBoolなので入力の型が合いません。エラーが出る位置と要求された型、実際の型を読みます。成功例だけでなく失敗例を独立に保存すれば、検査している対象を取り違えにくくなります。

## 5. VS Codeで検査結果を読む

VS Codeで lab フォルダを開き、Inspect.leanを選びます。LeanのInfoView（式の型、評価結果、エラーや証明途中の目標を表示するパネル）を開きます。Lean拡張のコマンドパレットからInfoViewを探せます。#checkや#evalの行にカーソルを移し、3節の表と照合します。

LvtEnvironment.leanの rfl にカーソルを置くと、証明箇所の情報も確認できます。Failure.leanを開くと型不一致の診断が表示されるはずです。パネルが空の場合は拡張が起動済みか、labが開かれているか、lake buildが成功するかを順に確認します。

同じ名前の関数でも、内容を変えれば出力や証明の成否が変化します。たとえばbumpの本体を n + 2 にすると、0の出力は2になり、元の命題 $b(0)=1$ を rfl で証明できなくなります。2の出力も4になるので、元の具体例の検査も成功しません。これは版の違いに限らずソースの違いが観測結果に影響する具体例です。元に戻して再ビルドしてください。

再現性の範囲を考えるため、固定したツールチェーン・設定・ソースが同じで、検査に必要な外部入力も同じであると仮定します。本章の関数は外部入力を読み込まず、自然数の加算だけを行います。従って入力2に対してはどちらの実行でも $2+1=3$ です。しかし、版を固定するだけでは、現在時刻やファイルの内容を読むプログラムの出力まで決まりません。実行条件と観測した結果を一緒に記録しましょう。

## 6. 演習

### Level A

### LVT1-02-A01 ツールの役割

elan、Lean、Lakeのどれが版を選択し、どれが型を検査し、どれがビルド対象を組み立てるか説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

elanは lean-toolchain の指定を読み、対応するツールチェーンを選択します。Leanはソースを読み、型や証明が正しいか検査します。Lakeはlakefileの設定を読み、MainがLvtEnvironmentをimportしていることからライブラリを先に処理し、実行対象を組み立てます。三つは役割が異なります。
<!-- solution-end -->

### LVT1-02-A02 型と具体値

bump 7 について #check と #eval の結果を予測せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

7はNatなのでNatを要求するbumpへ渡せます。bumpの戻り値の型はNatであり、#checkではこの型が表示されます。関数の定義に代入すると $b(7)=7+1=8$ なので #eval の結果は8です。
<!-- solution-end -->

### LVT1-02-A03 エラーの修正

Failure.lean の true を5に変えた場合、型の検査と値の評価はどうなるか。修正した行と評価の行を書け。

- Level: A

<!-- solution-start -->
#### 詳細解答

trueはBoolですが、5は関数が要求するNatとして解釈できるので型不一致が解消します。

```lean
#check LvtEnvironment.bump 5
#eval LvtEnvironment.bump 5
```

前者の型はNat、後者の値は $5+1=6$ です。実験後はFailure.leanを元に戻します。
<!-- solution-end -->

### LVT1-02-A04 保存対象

lab を別PCで使うとき、lean-toolchain、lakefile.lean、lake-manifest.json、LvtEnvironment.lean、.lake/ のうち、どれを保存し、どれを再生成するか述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[固定されたLeanプロジェクト](#def-lvt1-02-fixed-environment) の条件から、版の指定、ビルド設定、依存の解決結果、ソースを記録する最初の四つを保存します。Mainなど残りのソースも保存します。.lake/はLakeが生成する中間成果物などを置くので再生成できます。実行コマンドと期待出力も保存しておけば別PCで確認できます。
<!-- solution-end -->

### Level B

### LVT1-02-B01 別の関数を追加する

Inspect.leanの末尾に、自然数 n に2を加える関数 addTwo を定義し、0で2になる等式をrflで示し、入力4での型と値を確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

```lean
def addTwo (n : Nat) : Nat := n + 2
theorem addTwo_zero : addTwo 0 = 2 := rfl
#check addTwo 4
#eval addTwo 4
```

0を代入すると $0+2=2$ となり、両辺が同じ自然数に簡約されるためrflが使えます。4はNatで戻り値もNatです。値は $4+2=6$。型を検査する行、具体値を計算する行、等式を証明する行は独立した役割を持ちます。lake env lean Inspect.leanで検査します。
<!-- solution-end -->

### LVT1-02-B02 変更の影響を追う

bumpを n + 2 に変更し、他のソースを変えなかったとする。元の定理、二つの #guard、#eval の結果を予測せよ。ビルドが失敗した場合の観測順にも注意せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

定義から0では $0+2=2$、2では $2+2=4$ です。従って元の定理が要求する1とは異なり、rflは受理されません。Mainの期待値は順に1と3なので、仮に定理の誤りを直して関数をimportできる状態にすれば、どちらの #guard も偽となります。#eval は同じ条件で4を表示します。実際にはライブラリの検査で先に失敗するため、後続のMainやInspectが実行されたとみなしてはいけません。ソースを復元してビルドします。
<!-- solution-end -->

### LVT1-02-B03 再現条件を診断する

同じコミットを取得したAとBの端末で、lean --version の結果が異なる。Aは4.35.0、Bは別の版だった。何を確認し、何を同じにしてから結果を比較するか。

- Level: B

<!-- solution-start -->
#### 詳細解答

まずBもlab内にいることと lean-toolchain の内容が v4.35.0 であることを確認します。次に elan show で選ばれた版を調べ、PATH上でelan経由のleanを使用しているか、overrideや環境変数で版が変更されていないか確認します。必要なら指定版をインストールします。両者で版とソース、設定、依存を一致させてから lake build、lake test、lake env lean Inspect.lean を同じ順に実行します。バージョン表示が異なるまま出力だけ一致しても固定環境の確認にはなりません。
<!-- solution-end -->

### Level C

### LVT1-02-C01 再現記録を設計する

新しい端末にlabをコピーして、正しいソースと型不一致の失敗例を区別して検査する手順を書け。各観測対象と、全入力に関しては何を保証していないかも述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

まず [固定されたLeanプロジェクト](#def-lvt1-02-fixed-environment) に従ってソース、版の指定、設定とmanifestを保存した状態でlabを開きます。生成物は新しい端末で再作成します。

```bash
elan show
lean --version
lake --version
lake build
lake test
lake env lean Inspect.lean
lake env lean Failure.lean
```

版の観測で4.35.0が選ばれたことを確認し、lake buildで正しいソースの型・証明とMainの検査が通ることを確認します。lake testでは2に対する $2+1=3$ の出力と正常終了を確認します。Inspectでは型、3、零入力の等式を別々に確認します。最後は意図的にBoolをNatの引数に渡しているので、型不一致で非正常終了することが期待結果です。ネットワーク障害やimport失敗をこの期待された型不一致の代用としません。

記録にはコマンド、版、結果、エラーの種類を残します。[零入力での加算関数の値](#prop-lvt1-02-bump-zero) は一つの等式の証明で、#guardは0と2の具体的な検査です。[有限な例示テストと全入力一致](../LVT1-01/index.md#prop-lvt1-01-test-boundary) により、これらの検査だけで別実装の全自然数での一致は保証できません。環境をそろえることは比較の前提をそろえる作業であり、製品全体の正しさの証明ではありません。
<!-- solution-end -->

## 7. 参考資料と次講

- [Lean公式インストール案内](https://lean-lang.org/install/)
- [Lean v4.35.0 のLake README](https://github.com/leanprover/lean4/blob/v4.35.0/src/lake/README.md)

次講ではNatやBool以外に、ゲームのプレイヤーや失敗を含む結果を自分で型として表現し、許される入力と出力を明確にします。
