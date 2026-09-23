# NUMLAB0 計算機演習基盤

Encore V の理論講座では、数式と証明だけで内容を追えることを優先しました。

ここから始まる NUMLAB 系列では、その理論をブラウザ上の数値実験へ接続します。

NUMLAB0 の目的は、新しい数値解析の理論を増やすことではありません。後続の演習で毎回、Python 実行環境、時間制限、判定、進捗保存、オフライン動作を作り直さないため、**共通の実行基盤をここで一度だけ確立する**ことが目的です。

---

<a id="numlab0-runtime-architecture"></a>
## 1. 採用する実行方式

本系列では、ブラウザ内 Python ランタイムとして **Pyodide 314.0.7** を固定して使います。

~~~text
Docsify 教材ページ
    ↓
numerical-lab-runtime.js
    ↓ postMessage
module 型 Web Worker
    ↓
Pyodide 314.0.7
    ↓
Python + NumPy / SciPy / Matplotlib
~~~

Python 実行をページの主スレッドへ直接載せません。長い計算や誤って停止しないコードがあっても、教材本文のスクロールやナビゲーションまで固めないためです。

---

## 2. 責務を三つに分ける

### 2.1 ページ側

ページ側は、コード入力欄、実行、停止、初期コードへの復元、実行状態、標準出力、図を表示します。

最後に編集したコードと完了状態は `localStorage` へ保存します。

### 2.2 Worker 側

Worker は、

- Pyodide の初期化
- 必要な Python パッケージの読込み
- ユーザーコードの実行
- 自動テストの実行
- 標準出力・標準エラー出力の回収
- Matplotlib 図の PNG 化

を担当します。

ページの DOM へ直接触れません。

### 2.3 Service Worker 側

Service Worker は、Pyodide の固定バージョン資産を専用 Cache Storage へ保存します。

通常の教材キャッシュはサイトの revision ごとに更新されますが、Pyodide は

~~~text
https://cdn.jsdelivr.net/pyodide/v314.0.7/full/
~~~

へ固定されています。

そのため数値計算ランタイムだけは

~~~text
toukei-grade1-numerical-runtime-v1
~~~

という永続キャッシュへ分離します。

教材本文の更新だけで大きな WebAssembly 資産を毎回捨てないためです。

---

## 3. 初回実行とオフライン実行

この教材サイト自体と同様に、**最初の取得だけはオンライン接続が必要**です。

初回にラボを実行すると、

1. module 型 Web Worker を読む
2. Pyodide 本体を読む
3. コード中の import を調べる
4. NumPy / SciPy / Matplotlib など必要なパッケージを読む
5. 取得した固定バージョン資産を Cache Storage に保存する

という処理が走ります。

一度取得済みなら、その資産がブラウザに残っている限り、同じパッケージを使う演習はネットワークなしでも実行できます。

> ブラウザがストレージを削除した場合や、サイトデータを手動削除した場合は再取得が必要です。

教材全体の「オフライン保存」と Python ランタイムの保存は役割が異なります。

- 教材 Markdown・図版など：教材のオフライン保存
- Pyodide・Python パッケージ：ラボ初回実行時の永続ランタイムキャッシュ

です。

---

<a id="numlab0-lab-format"></a>
## 4. ラボ記法

後続章では、実行したいコードを通常の `python` コードフェンスではなく、次の専用コードフェンスに置きます。

~~~text
language: python-lab
# lab-id: NUMLAB1-EXAMPLE
# lab-title: 表示名
# timeout-ms: 5000

...
~~~

その直後に、

~~~text
language: python-test
assert ...
~~~

を置くと、そのテストは読者画面では隠され、ユーザーコード実行後に同じ Python 名前空間で評価されます。

`lab-id` は全ラボで一意にします。進捗保存のキーにも使うため、後から意味なく変更しません。

`timeout-ms` は**ユーザーコード本体の実行時間の最大値**です。Pyodide やパッケージの初回読込み時間とは分けて扱います。

---

<a id="numlab0-timeout"></a>
## 5. 時間制限では Worker ごと破棄する

Python が

~~~python
while True:
    pass
~~~

へ入った場合、同じ Worker 内から穏当に停止させる処理へ依存しません。

ページ側が時間超過を検出したら `Worker.terminate()` で Worker 自体を破棄します。その後の実行では新しい Worker を作ります。

~~~text
停止できない計算
↓
実行コンテキストごと破棄
↓
次回は新しい環境で再開
~~~

「停止」ボタンも同じ仕組みを使います。

---

## 6. 実行ごとに Python 名前空間を分離する

Worker 自体はパッケージ読込みを再利用するため共有します。

ただし、前のラボで作った変数を次のラボが偶然利用すると、自動テストの意味が壊れます。

そこで各実行では独立した名前空間を作り、

~~~text
ユーザーコード
↓
同じ名前空間で非表示テスト
~~~

の順に実行します。

別のラボ実行で残った Python の変数は利用しません。

---

<a id="numlab0-tolerance"></a>
## 7. 数値判定では完全一致を要求しない

浮動小数点計算では `computed == expected` を常に要求するのは不適切です。

後続 NUMLAB では、必要に応じて `np.isclose(...)` や `np.allclose(...)` を使います。

基本形は

$$
|a-b|
\le
\mathrm{atol}
+
\mathrm{rtol}|b|
$$

です。

`atol` と `rtol` は問題ごとに決めます。

「とりあえず大きな数値許容誤差にして通す」のではなく、

- 離散化によるずれを判定したいのか
- 浮動小数点の丸めだけを吸収したいのか
- 反復停止によるずれを含むのか

を区別します。

---

<a id="numlab0-property-testing"></a>
## 8. 性質ベーステスト

特定の一例だけでなく、多数の入力に対する不変性を確認したい場合があります。

たとえば中心化関数

~~~python
center(x) = x - mean(x)
~~~

なら、出力の平均は常に0に近くなるべきです。

さらに入力全体へ定数を足しても、

~~~text
center(x + c) ≈ center(x)
~~~

が成り立つはずです。

NUMLAB では、このような**関数が満たすべき性質そのもの**を非表示テストに書きます。

乱数を使う場合も、テスト用乱数生成器の初期化値を固定し、失敗を再現できるようにします。

---

## 9. スモークラボ 1：ランタイムと科学技術計算パッケージ

最初の実行は大きめのパッケージを読むため時間がかかることがあります。

実行後に Pyodide 関連資産が Cache Storage へ残るので、後続実行は軽くなります。

```python-lab
# lab-id: NUMLAB0-RUNTIME-CHECK
# lab-title: Python / NumPy / SciPy / Matplotlib を確認
# timeout-ms: 20000

import sys
import numpy as np
import scipy
import matplotlib

x = np.array([1.0, 2.0, 3.0])

print("Python:", sys.version.split()[0])
print("NumPy:", np.__version__)
print("SciPy:", scipy.__version__)
print("Matplotlib:", matplotlib.__version__)
print("mean:", x.mean())
```

```python-test
assert np.allclose(x.mean(), 2.0)
assert x.shape == (3,)
assert np.isfinite(x).all()
```

このラボが通れば、Python 実行、NumPy、SciPy、Matplotlib、非表示テストまでの基本経路がつながっています。

---

## 10. スモークラボ 2：数値許容誤差

```python-lab
# lab-id: NUMLAB0-TOLERANCE
# lab-title: np.allclose で数値判定
# timeout-ms: 5000

import numpy as np

def close_enough(a, b, atol=1e-12, rtol=1e-9):
    return np.allclose(a, b, atol=atol, rtol=rtol)

computed = 0.1 + 0.2
expected = 0.3

print("== :", computed == expected)
print("allclose:", close_enough(computed, expected))
```

```python-test
assert computed != expected
assert close_enough(computed, expected)
assert not close_enough(1.0, 1.01, atol=1e-12, rtol=1e-9)
```

ここでは `0.1 + 0.2 == 0.3` を合格条件にはしていません。

数値計算の自動判定は、数学上の意味に対応する数値許容誤差で行います。

---

## 11. スモークラボ 3：性質ベーステスト

```python-lab
# lab-id: NUMLAB0-PROPERTY
# lab-title: 中心化関数の性質を検査
# timeout-ms: 5000

import numpy as np

def center(values):
    x = np.asarray(values, dtype=float)
    return x - x.mean()

sample = np.array([2.0, 4.0, 9.0, 11.0])
centered = center(sample)

print("mean:", centered.mean())
print("centered:", centered)
```

```python-test
rng = np.random.default_rng(2026)

for _ in range(30):
    x = rng.normal(size=50)
    c = rng.normal()

    y = center(x)
    shifted = center(x + c)

    assert np.allclose(y.mean(), 0.0, atol=1e-12, rtol=0.0)
    assert np.allclose(shifted, y, atol=1e-12, rtol=1e-12)
```

このテストは、30個の再現可能な入力について、

1. 中心化後の平均が0に近い
2. 入力全体への定数加算で中心化結果が変わらない

という二つの性質を検査します。

---

## 12. スモークラボ 4：Matplotlib 図の回収

Worker は DOM を直接操作できません。

そこで Matplotlib 図は Worker 内で PNG へ変換し、データ URL としてページ側へ返します。

```python-lab
# lab-id: NUMLAB0-MATPLOTLIB
# lab-title: log-log 図を Worker から返す
# timeout-ms: 8000

import numpy as np
import matplotlib.pyplot as plt

n = np.array([8, 16, 32, 64, 128], dtype=float)
error = n ** (-2)

fig, ax = plt.subplots()
ax.loglog(n, error, marker="o")
ax.set_xlabel("N")
ax.set_ylabel("error")
ax.grid(True)

print("error ratio:", error[:-1] / error[1:])
```

```python-test
ratio = error[:-1] / error[1:]
assert np.allclose(ratio, 4.0)
assert np.all(error > 0.0)
```

表示される図は iframe や外部画像 URL ではありません。Worker 内で作った PNG をページへ返しています。

---

<a id="numlab0-progress-storage"></a>
## 13. 進捗保存

各ラボについて保存するのは、

- 初期コードのハッシュ
- 最後に編集したコード
- 非表示テストを通過したか
- 完了日時

です。

保存先は `localStorage` です。

教材側の初期コードが更新されるとハッシュが変わるため、古い保存コードを新しい教材へ無条件に復元しません。

「初期コードへ戻す」は、そのラボの編集コード・完了状態・出力・図を初期化します。Python ランタイム全体や他のラボ進捗、Pyodide パッケージの Cache Storage は消しません。

---

## 14. テストを非表示にする理由

非表示テストは「答えを秘密にする」ためではありません。

主な目的は、教材本文をテスト実装で埋めないことです。

テストの正本自体は Markdown にあり、リポジトリ上では読めます。

つまり、

- 読者画面では実験に集中できる
- リポジトリでは判定条件をレビューできる

という分離です。

---

## 15. NUMLAB で使う判定の三層

後続章では、おおむね次の三層を使います。

### 15.1 形状・有限性

~~~python
assert x.shape == expected_shape
assert np.isfinite(x).all()
~~~

### 15.2 数値値の許容誤差

~~~python
assert np.allclose(actual, expected, atol=..., rtol=...)
~~~

### 15.3 性質

~~~python
for input_value in reproducible_cases:
    assert invariant(input_value)
~~~

一つの固定された数値だけを当てるテストに寄せすぎないようにします。

---

## 16. 実行基盤の安全上の注意

本基盤は、任意の Python を安全なクラウド隔離環境で実行するサービスではありません。

コードは**読者自身のブラウザ**で動きます。

教材側では、

- 外部 API キーを埋めない
- 個人情報を教材コードへ要求しない
- ネットワーク接続を正答条件にしない
- 巨大メモリ確保を前提にしない
- 長時間 CPU を占有する課題を作らない

という方針にします。

時間制限は停止しない計算から UI を復旧させるための機構であり、悪意あるコードに対する完全な安全保証ではありません。

---

## 17. 自動検証が検査するもの

NUMLAB0 追加に合わせて、Pages の自動検証へ数値ラボ基盤の検査を追加します。

自動検証は少なくとも、

- ランタイム用 JavaScript の構文
- module 型 Web Worker の構文
- Pyodide バージョンの固定
- Worker 分離
- ランタイム資産が Pages 成果物へコピーされること
- Service Worker の永続ランタイムキャッシュ設定
- NUMLAB0 の全 `python-lab` に一意な `lab-id` があること
- 時間制限が許容範囲内であること
- 各 `python-lab` の直後に `python-test` があること
- 非表示テストに少なくとも一つ `assert` があること

を確認します。

「本文にラボっぽいコードを書いた」だけでは完成扱いにしません。

---

## 18. NUMLAB0 の完成条件

本章は数学演習章ではないため、A4/B3/C1 の紙上演習は置きません。

代わりに、この章の完成条件は次です。

1. ラボ UI が Docsify 上で生成される。
2. Python は module 型 Web Worker で動く。
3. NumPy / SciPy / Matplotlib が読み込める。
4. 実行中の Worker を停止できる。
5. 時間超過で Worker が破棄される。
6. 非表示テスト が同じ実行名前空間を検査できる。
7. 数値許容誤差のテスト が書ける。
8. 再現可能な性質ベーステストが書ける。
9. Matplotlib の図をページへ返せる。
10. 完了状態と編集コードを保存できる。
11. 固定 Pyodide ランタイムを永続キャッシュできる。
12. 自動検証が上記の構成を壊す変更を検出できる。

---

## 19. 後続章で変えないもの

NUMLAB1 以降では、原則として次を再設計しません。

- Pyodide バージョン
- Worker プロトコル
- 時間制限の基本方式
- `python-lab` / `python-test` 記法
- localStorage の進捗形式
- Matplotlib 図の返却経路
- ランタイムキャッシュ の責務分離

後続章は**実験内容**へ集中します。

必要な変更が生じた場合も、各 NUMLAB へ個別実装をコピーせず NUMLAB0 の共通基盤を更新します。

---

## 20. 次へ

NUMLAB0 で実行基盤を固定したので、次は **NUMLAB1「数値解析演習」** です。

NA1–NA12 で扱った理論のうち、計算機実験に向く主題を選び、

- 収束の実測
- 条件数と誤差
- 反復法の挙動
- 補間・数値積分
- 行列計算

などを、理論 anchor と相互参照できるラボへ落とします。
