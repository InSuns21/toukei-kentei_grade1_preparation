# NUMERICAL LAB AUTHORING STANDARD

この文書は、PYNUM1 / NUMLAB0–NUMLAB5 のブラウザ内 Python ラボを執筆・改稿するときの正本である。

NUMLAB0 は実行基盤の読者向け説明、本文書は執筆規約を担当する。

---

## 1. 適用範囲

- **PYNUM1**: Python / NumPy のクイックスタート。完成コードを自由編集する `free` ラボを許す。
- **NUMLAB0**: ランタイム・保存・timeout・描画・自動判定の smoke test。完成コードを自由編集する `free` ラボを許す。
- **NUMLAB1–NUMLAB5**: 理論章に対応する計算機演習。**すべての理論対応ラボを原則ではなく必須の `exercise` mode とする。**

NUMLAB1–NUMLAB5 で完成コードだけを置く `free` ラボは作らない。単なるデモが必要なら本文中の通常 `python` コード例として置き、理論対応 experiment ID を持つラボとは分離する。

---

## 2. 標準ブロック構成

理論対応ラボは次の3ブロックを連続させる。

~~~text
language: python-lab
# lab-id: ...
# lab-title: ...
# lab-mode: exercise
# timeout-ms: ...

# ヒント: この空欄の役割・使う理論・作る量を、答えを直接書かずに示す。
... ___ ...
~~~

~~~text
language: python-solution
... 完成コード ...
~~~

~~~text
language: python-test
assert ...
~~~

役割は次の通り。

- `python-lab`: 学習者が編集する穴埋め初期コード。
- `python-solution`: 模範解答。穴埋め記号を残さない。
- `python-test`: 読者画面では隠す自動判定。学習者コードと同じ実行環境で評価する。

問題文・数式・理論 stable anchor・何を埋めるかの説明は、コードフェンスの直前に通常 Markdown で書く。

---

## 3. 穴埋めの教育的役割

穴埋め記号は `___` とする。

穴埋めはコードの機械的な写経ではなく、**理論を数値計算へ翻訳する核心操作**に置く。

良い例:

- Newton 法の更新式
- CG 法の step length / residual / search direction
- CFL 条件を含む時間刻み
- 有限要素の局所剛性行列
- Monte Carlo 標準誤差・制御変量・レベル間結合

避ける例:

- `import numpy as np` の `np`
- 図のタイトルや凡例文字列
- 本質でない配列長
- 単に本文から数字をコピーするだけの箇所
- 1ラボのほぼ全行を穴埋めにして、プログラム再構成が主課題になる構成

目安として1ラボあたり **1–5箇所程度**とし、learning objective をコードへ移す最小限の穴埋めにする。教育上必要ならこの範囲を超えてよいが、題数・空欄数の水増しはしない。

### 3.1 空欄の直前に局所ヒントを置く

各 `___` の**直前行**には、同じ字下げで `# ヒント:` コメントを必ず置く。

ヒントは、学習者がその空欄へ到達した時点で「何を考える場所か」を局所的に復元するためのものとする。次のいずれかを短く示す。

- その変数・式の役割
- 使う定理・数値計算法・性質
- 作る量の意味
- 行列・ベクトル・残差・誤差などの対象
- 安定側 / 不安定側、更新前 / 更新後など比較の向き

一方、完成式そのもの、数値解そのもの、右辺をほぼ写した擬似解答は書かない。

良い例:

~~~python
# ヒント: Newton 法の一段更新。現在の近似値から次の近似値を作る。
x = ___

# ヒント: 二次収束ならほぼ一定になる誤差比を、連続する誤差列から作る。
quadratic_ratio = ___
~~~

避ける例:

~~~python
# ヒント: x - f(x) / f_prime(x) を入れる。
x = ___
~~~

章冒頭の「穴埋め課題」説明だけでは局所ヒントの代わりにならない。空欄が離れていても、各 `___` の直前で出題意図を読める状態にする。

---

## 4. 模範解答

`python-solution` は、そのままブラウザで実行可能な完成コードとする。

- starter と同じ数値実験を解く。
- `___` を残さない。
- hidden test を通すだけの別解・ハードコードへすり替えない。
- 本文で説明していない高度な API を模範解答だけに突然導入しない。
- 同じ章の他ラボで Python / NumPy の基礎説明を重複させず、必要なら PYNUM1 へリンクする。

---

## 5. 自動判定

`python-test` は最終数値だけでなく、可能なら**理論上の構造や性質**を確認する。

優先する判定:

- 構成した節点・行列・離散化が正しい
- 収束次数が理論値へ近い
- 残差・誤差・エネルギーが期待する性質を持つ
- 安定性条件の成立 / 破綻を再現する
- 分散減少・レベル差分散など、比較したい量が実際に改善する

浮動小数点値には `np.isclose` / `np.allclose` など、問題に応じた tolerance を使う。

乱数を使うテストは再現可能な固定乱数生成器を使う。

---

## 6. UI と進捗

exercise mode は読者画面で

~~~text
[穴埋め] [模範解答] [実行結果]
~~~

の3タブへ変換する。

- `___` が残っている間は Python を起動しない。
- 模範解答はシンタックスハイライトして表示する。
- 模範解答を穴埋め欄へ反映できる。
- 実行後は結果タブへ移る。
- 編集内容・完了状態は既存の localStorage 契約を使う。
- `lab-id` は保存キー・台帳キーでもあるため、意味なく変更しない。

---

## 7. 理論との対応

NUMLAB1–NUMLAB5 の各実験は `textbook/numerical-lab-links.yaml` に登録する。

各レコードは少なくとも、

- theory chapter
- theory stable anchor
- lab chapter
- lab stable anchor
- experiment ID

を持つ。

理論章の見出しだけへ曖昧にリンクせず、canonical stable anchor を使う。

---

## 8. CI 完成条件

Pages validation では少なくとも次を blocking にする。

- `lab-id` の全ページ一意性
- `timeout-ms` の範囲
- `python-lab -> python-solution -> python-test` の並び
- NUMLAB1–NUMLAB5 の全ラボが `lab-mode: exercise` であること
- exercise starter に `___` が1個以上あること
- **各 `___` の直前行に `# ヒント:` コメントがあること**
- solution に `___` が残っていないこと
- starter / solution / test が Python として構文解析できること
- hidden test に最低1個の `assert` があること
- theory / lab stable anchor と experiment ID が台帳と一致すること

CI green だけを教育品質の十分条件にしない。レビューでは「空欄が learning objective の核心操作に置かれているか」「各局所ヒントが答えを漏らさず出題意図を示しているか」「模範解答を読めば計算を再現できるか」も確認する。
