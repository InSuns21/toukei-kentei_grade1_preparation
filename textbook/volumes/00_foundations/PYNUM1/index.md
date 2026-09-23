# PYNUM1 Python 数値計算速習

Encore V の理論35講では、式を紙上で追えることを優先し、Python 実行環境を前提にしませんでした。

ここからの NUMLAB 系列では、その理論を実際に計算機上で確かめます。

ただし本章は一般的な Python 入門ではありません。変数、条件分岐、反復、関数、基本的なデータ構造、デバッグという考え方自体は既知とします。

本章の目標は、

$$
\boxed{
\text{数式}
\longleftrightarrow
\text{配列の形}
\longleftrightarrow
\text{実行結果}
}
$$

を迷わず往復できる状態です。

後続の数値計算で事故の原因になりやすいのは文法よりむしろ、

- 配列の `shape`
- どの `axis` を潰しているか
- `dtype` が整数か浮動小数点数か
- 元配列とメモリを共有しているか
- 要素積と行列積を混同していないか
- ブロードキャストが意図した向きか
- 乱数状態をどこで保持しているか
- `NaN` や `inf` が混ざっていないか

です。

したがって本章では Python の細部を網羅せず、

$$
\boxed{
\text{NumPy を安全に読む}
+
\text{数値実験を再現可能に書く}
+
\text{誤差を図で診断する}
}
$$

ことへ集中します。

---

## 0. 本章の前提と停止線

本章では、変数、`if`、`for`、関数、リスト、辞書、traceback の基本的な読み方は既知とします。

> **停止線**
>
> 本章では Python の高度なオブジェクト指向、デコレータ、generator 構文、非同期処理、packaging、Web 開発、pandas 中心のデータ分析は扱いません。
>
> SciPy も API の暗記対象にはしません。後続 NUMLAB で「どのモジュールを探せばよいか」が分かるところまでに留めます。

---

## 1. Python の差分だけ先に押さえる

### 1.1 インデントがブロックを決める

Python では中括弧ではなくインデントでブロックを表します。

```python
total = 0.0

for k in range(5):
    total += k

print(total)
```

`range(5)` は

```text
0, 1, 2, 3, 4
```

を生成し、終点5は含みません。

数値計算ではこの半開区間の感覚が重要です。節点が

$$
x_0,x_1,\ldots,x_N
$$

の $N+1$ 個あるとき、区間は

$$
[x_0,x_1],\ldots,[x_{N-1},x_N]
$$

の $N$ 個です。

したがって、

```python
for i in range(N):
    ...
```

なら $i=0,\ldots,N-1$ をちょうど走査できます。

### 1.2 内包表記・tuple unpacking・`enumerate`・`zip`

小さな変換なら、

```python
squares = [k * k for k in range(6)]
```

と書けます。

複数値を返す関数は、

```python
a, b = interval()
```

のように受け取れます。

添字と値が必要なら、

```python
for i, value in enumerate(values):
    ...
```

二つの列を並行して読むなら、

```python
for n, err in zip(ns, errors):
    ...
```

と書きます。

ただし巨大な数値配列を要素ごとに処理する主役は NumPy です。

---

## 2. NumPy 配列は「値」だけでなく形・軸・型を持つ

まず、

```python
import numpy as np
```

とします。

Python のリストと NumPy 配列は見た目が似ていますが、数値計算では後者を

$$
\boxed{
\text{データ}
+
\text{形状}
+
\text{軸}
+
\text{データ型}
}
$$

の組として読みます。

<a id="def-pynum1-array-shape-axis-dtype"></a>
<!-- formal-statement-start -->
### 定義（NumPy 配列の形状・軸・データ型）

NumPy 配列 `a` に対し、

- `a.shape` を **形状**
- 配列の各方向を **軸**
- 軸番号を `axis=0,1,\ldots` で指定する
- `a.dtype` を **データ型**

と呼ぶ。

形状 `(m, n)` の二次元配列では、第0軸の長さが $m$、第1軸の長さが $n$ である。

集約演算で `axis=r` を指定したときは、原則として **第 $r$ 軸を潰して**結果を作る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pynum1-array-shape-axis-dtype -->
**定義の確認**：

```python
a = np.array([
    [1.0, 2.0, 3.0, 4.0],
    [5.0, 6.0, 7.0, 8.0],
    [9.0, 10.0, 11.0, 12.0],
])
```

なら `a.shape` は `(3, 4)` です。

```python
a.sum(axis=0)
```

は第0軸を潰すため、

```python
array([15., 18., 21., 24.])
```

となり、形状は `(4,)` です。

一方、

```python
a.sum(axis=1)
```

は第1軸を潰し、

```python
array([10., 26., 42.])
```

となり、形状は `(3,)` です。
<!-- definition-example-end -->

### 2.1 まず `shape` を見る

数値計算コードを読むときは、値を一つずつ追う前に形を確認します。

たとえば、

```python
x.shape == (100,)
A.shape == (100, 100)
```

なら `A @ x` は100成分ベクトルです。

一方、`x.shape == (100, 1)` なら結果も `(100, 1)` です。

数学上は同じ「列ベクトル」のつもりでも、`(100,)` と `(100,1)` は NumPy では別の形です。

### 2.2 `dtype` を確認する

```python
a = np.array([1, 2, 3])
b = np.array([1.0, 2.0, 3.0])
```

では、前者は整数型、後者は浮動小数点型です。

特に危険なのは、

```python
errors = np.zeros(4, dtype=int)
errors[0] = 0.125
```

のように整数配列へ小数を保存しようとする場合です。

誤差、確率、座標、係数などを入れる配列なら、

```python
errors = np.zeros(4, dtype=float)
```

のように意図を明示します。

---

## 3. 代入・ビュー・コピーを混同しない

```python
a = np.array([1.0, 2.0, 3.0])
b = a
b[0] = 99.0
```

とすると、`a[0]` も99になります。

`b = a` はデータの複製ではなく、同じ配列オブジェクトへの別名を作っただけだからです。

<a id="def-pynum1-view-copy"></a>
<!-- formal-statement-start -->
### 定義（NumPy のビューとコピー）

NumPy 配列 $a$ に対し、

- $a$ と同じデータバッファを共有する配列を **ビュー（view）**
- $a$ と独立したデータバッファを持つ複製を **コピー（copy）**

と呼ぶ。

本章で使う基本規則は次である。

1. 単純な代入 `b = a` はコピーを作らない。
2. 基本スライス `a[p:q]` はビューを返す。
3. `.copy()` は独立したコピーを作る。
4. 整数配列や真偽値配列による高度な添字指定はコピーを返す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pynum1-view-copy -->
**定義の確認**：

```python
a = np.array([10.0, 20.0, 30.0, 40.0])

v = a[1:3]
v[0] = -1.0
```

`v` はビューなので、`a` は

```python
array([10., -1., 30., 40.])
```

へ変わります。

一方、

```python
a = np.array([10.0, 20.0, 30.0, 40.0])

c = a[1:3].copy()
c[0] = -1.0
```

なら、`a` は

```python
array([10., 20., 30., 40.])
```

のままです。
<!-- definition-example-end -->

必要なら、

```python
np.shares_memory(a, v)
```

でメモリ共有を確認できます。

---

## 4. ブロードキャストは末尾から形を合わせる

<a id="def-pynum1-broadcasting"></a>
<!-- formal-statement-start -->
### 定義（NumPy のブロードキャスト）

二つの配列の形状を **末尾の軸から**比較する。

対応する軸長について、

- 二つが等しい
- または少なくとも一方が1

のどちらかを各軸で満たすとき、その二配列はその軸について **ブロードキャスト可能**という。

片方に存在しない先頭側の軸は長さ1として扱う。

ブロードキャスト可能な配列どうしでは、長さ1の軸を必要な長さへ仮想的に拡張して要素演算を行う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pynum1-broadcasting -->
**定義の確認**：

```python
u = np.array([
    [1.0],
    [2.0],
    [3.0],
])  # shape (3, 1)

v = np.array([10.0, 20.0, 30.0, 40.0])  # shape (4,)
```

形状を

```text
u: (3, 1)
v: (1, 4)
```

と見れば、各軸で一方が1です。

したがって、

```python
u + v
```

は形状 `(3,4)` となり、

```python
array([
    [11., 21., 31., 41.],
    [12., 22., 32., 42.],
    [13., 23., 33., 43.],
])
```

を返します。
<!-- definition-example-end -->

### 4.1 向きを間違えたら `[:, None]` を疑う

```python
a = np.zeros((3, 4))
r = np.array([1.0, 2.0, 3.0])
```

に対して `a + r` は実行できません。

末尾軸が4と3だからです。

行ごとに1値ずつ足したいなら、

```python
a + r[:, None]
```

とし、`r` を形状 `(3,1)` にします。

---

## 5. ベクトル化は「反復を消すこと」そのものではない

<a id="def-pynum1-vectorization"></a>
<!-- formal-statement-start -->
### 定義（NumPy のベクトル化）

Python で要素を一つずつ取り出して処理する代わりに、

- NumPy の要素演算
- ufunc
- 集約演算
- 行列演算

など、配列全体を対象とする演算として記述することを **NumPy のベクトル化**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pynum1-vectorization -->
**定義の確認**：

```python
x = np.linspace(0.0, 1.0, 5)

y = np.empty_like(x)
for i in range(len(x)):
    y[i] = np.sin(x[i]) + x[i] ** 2
```

は、

```python
y = np.sin(x) + x**2
```

と書けます。

どちらも各 $i$ について

$$
y_i=\sin x_i+x_i^2
$$

を計算しています。
<!-- definition-example-end -->

### 5.1 Python の反復が自然な場合

次は Python の外側反復が自然です。

- メッシュ幅を変えて複数回実験する
- 反復法で停止条件を判定する
- 問題サイズごとに別の疎行列を組み立てる
- ブロードキャストすると巨大な中間配列を作る

狙いは、

$$
\boxed{
\text{数式上まとまった演算を配列演算へ寄せる}
}
$$

ことであり、`for` を一文字も残さないことではありません。

---

## 6. `*` と `@` を区別する

NumPy では `*` は要素ごとの積、`@` は行列積・ベクトル積です。

```python
A = np.array([
    [1.0, 2.0],
    [3.0, 4.0],
])

x = np.array([10.0, 20.0])
```

なら、

```python
A * x
```

はブロードキャストを使った要素積で、

```python
array([
    [10., 40.],
    [30., 80.],
])
```

です。

一方、

```python
A @ x
```

は

$$
\begin{pmatrix}
1&2\\
3&4
\end{pmatrix}
\begin{pmatrix}
10\\
20
\end{pmatrix}
=
\begin{pmatrix}
50\\
110
\end{pmatrix}
$$

に対応します。

### 6.1 頻出する線形代数記法

- `x @ y`：ベクトルの内積
- `A @ x`：行列ベクトル積
- `A @ B`：行列積
- `np.linalg.norm(x)`：Euclid ノルム
- `np.linalg.solve(A, b)`：連立一次方程式 $Ax=b$ の解

単に逆行列を明示的に作るより、連立方程式を解く目的なら `np.linalg.solve` を使います。

---

## 7. ブールマスクで条件を配列へ適用する

<a id="def-pynum1-boolean-mask"></a>
<!-- formal-statement-start -->
### 定義（NumPy のブールマスク）

配列 $a$ と同じ形状の真偽値配列 `mask` を用い、

```python
a[mask]
```

の形で `True` に対応する要素を選択する添字指定を **NumPy のブールマスク**と呼ぶ。

同じ形式で、

```python
a[mask] = value
```

とすれば、`True` の位置だけを更新できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pynum1-boolean-mask -->
**定義の確認**：

```python
x = np.array([1.0, np.nan, 3.0, np.inf, 5.0])
mask = np.isfinite(x)
```

なら、

```python
mask
```

は

```python
array([ True, False,  True, False,  True])
```

です。

したがって、

```python
x[mask]
```

は

```python
array([1., 3., 5.])
```

となります。
<!-- definition-example-end -->

値を条件で選び分けるなら、

```python
np.where(condition, value_if_true, value_if_false)
```

も使えます。

---

## 8. 乱数は `Generator` に状態を持たせる

新規コードでは、乱数状態を暗黙のグローバル状態へ置くより、明示的な乱数生成器オブジェクトへ持たせます。

<a id="def-pynum1-rng"></a>
<!-- formal-statement-start -->
### 定義（NumPy 乱数生成器）

NumPy の

```python
np.random.default_rng(seed)
```

で生成される `Generator` オブジェクトを、本章では **NumPy 乱数生成器**と呼ぶ。

乱数生成器は内部状態を保持し、

```python
rng.random(...)
rng.normal(...)
rng.integers(...)
```

などのメソッドを呼ぶたびに状態を更新する。

同じ乱数生成方式と同じ初期化条件を用いる限り、同じ seed から同じ呼出し順序で同じ疑似乱数列を再現できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pynum1-rng -->
**定義の確認**：

```python
rng1 = np.random.default_rng(12345)
rng2 = np.random.default_rng(12345)

x1 = rng1.normal(size=4)
x2 = rng2.normal(size=4)

print(np.array_equal(x1, x2))
```

は `True` です。

一方、

```python
x3 = rng1.normal(size=4)
```

は通常 `x1` と異なります。`rng1` の内部状態がすでに進んでいるからです。
<!-- definition-example-end -->

### 8.1 再現性の単位を明示する

後続 NUMLAB では、

```python
def experiment(seed):
    rng = np.random.default_rng(seed)
    ...
```

のように実験入口で seed を受け取り、必要な関数へ `rng` を渡す形を基本にします。

既存コードではグローバル乱数 API を見ることがありますが、本系列の新規コードでは `Generator` を主に使います。

---

## 9. Matplotlib は Axes に描く

最小形は次です。

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots()

ax.plot(x, y)
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.grid(True)

plt.show()
```

後続 NUMLAB では、

- `ax.plot(...)`：折れ線
- `ax.scatter(...)`：散布図
- `ax.loglog(...)`：両対数図

を主に使います。

---

## 10. log-log 図で収束次数を読む

数値解析では、

$$
E_N
\approx
C N^{-p}
$$

のようなべき乗則が頻出します。

<a id="def-pynum1-loglog"></a>
<!-- formal-statement-start -->
### 定義（log-log 図）

正の横軸データ $N$ と正の縦軸データ $E_N$ に対し、両軸を対数目盛にして描いた図を **log-log 図**と呼ぶ。

もし

$$
E_N
=
C N^{-p}
$$

なら、

$$
\log E_N
=
\log C-p\log N
$$

であるため、log-log 図上では傾き $-p$ の直線になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pynum1-loglog -->
**定義の確認**：

```python
N = np.array([16, 32, 64, 128], dtype=float)
E = N**(-2)

fig, ax = plt.subplots()
ax.loglog(N, E, marker="o")
```

では $E_N=N^{-2}$ なので、傾きは $-2$ です。

隣接点から指数を計算するなら、

```python
p = np.log(E[:-1] / E[1:]) / np.log(N[1:] / N[:-1])
```

で `[2,2,2]` が得られます。
<!-- definition-example-end -->

log-log 図では0や負の値をそのまま描けません。

描画前には、

```python
mask = np.isfinite(error) & (error > 0.0)
```

のように確認します。

ただし誤差0を見たら、厳密一致だけでなく、整数 `dtype` への切り捨てや underflow も疑います。

---

## 11. 数値計算で頻出する失敗

### 11.1 shape mismatch

```python
A.shape == (100, 100)
x.shape == (99,)
```

なら `A @ x` は実行できません。

必要なら、

```python
assert A.shape[1] == x.shape[0]
```

と置きます。

### 11.2 `(n,)` と `(n,1)` の混同

```python
np.zeros(3).shape
```

は `(3,)` です。

```python
np.zeros((3, 1)).shape
```

は `(3,1)` です。

無条件に `squeeze()` するより、どの軸を落とすか明示する方が安全な場面もあります。

### 11.3 整数配列への小数代入

誤差配列を、

```python
errors = np.zeros(5, dtype=int)
```

と作ってはいけません。

```python
errors = np.zeros(5, dtype=float)
```

とします。

### 11.4 `NaN` と `inf`

節目で、

```python
assert np.all(np.isfinite(x))
```

と確認できます。

### 11.5 off-by-one

```python
N = 8
x = np.linspace(0.0, 1.0, N + 1)
```

なら節点は9個、区間は8個です。

### 11.6 ビューを更新して元データまで変える

```python
interior = u[1:-1]
interior[:] = 0.0
```

では `u` も変わります。

独立データが必要なら、

```python
interior = u[1:-1].copy()
```

とします。

---

## 12. SciPy は「どの棚に何があるか」だけ覚える

### 12.1 `scipy.linalg`

密行列の線形代数を扱います。

- 連立一次方程式
- 行列分解
- 固有値問題

などで、NumPy より専門的な選択肢が必要になったときに探します。

### 12.2 `scipy.sparse`

疎行列の格納形式と組立てを扱います。

有限差分法・有限要素法では大規模行列の大半が0になるため、後続 NUMLAB で重要になります。

### 12.3 `scipy.sparse.linalg`

疎行列向けの直接法、反復法、固有値計算の入口です。

### 12.4 `scipy.stats`

確率分布、分布関数、統計量などの入口です。

Monte Carlo 実験の基本乱数源は、本系列では明示的な NumPy 乱数生成器を使います。

---

## 13. 数値実験の共通形

後続 NUMLAB では、次の順序を基本形にします。

1. 問題サイズ・seed を固定する。
2. 配列の形と型を意識して作る。
3. 主要計算を関数へ分離する。
4. `assert` と `np.isfinite` で不変条件を確認する。
5. 問題サイズを変える外側反復を回す。
6. 数値表と図の両方で結果を見る。

たとえば、

```python
sizes = np.array([16, 32, 64, 128], dtype=int)
errors = np.empty(sizes.shape, dtype=float)

for i, N in enumerate(sizes):
    errors[i] = run_experiment(int(N))

assert np.all(np.isfinite(errors))
```

のような形です。

---

## 14. 演習

### 演習 PYNUM1-A1

- Level: A
- 主題: shape・axis・dtype
- 使用技術: 配列形状、軸付き集約
- 計算量: 小

```python
A = np.array([
    [1, 2, 3],
    [4, 5, 6],
], dtype=float)
```

について、

1. `A.shape` と `A.dtype` を答えよ。
2. `A.sum(axis=0)` の値と形状を求めよ。
3. `A.sum(axis=1)` の値と形状を求めよ。
4. `axis=0` と `axis=1` の違いを「どの軸を潰すか」で説明せよ。

<!-- solution-start -->
### 詳細解答

`A` は2行3列なので、

```python
A.shape == (2, 3)
```

です。

`dtype=float` を指定しているため、浮動小数点型です。

`axis=0` は第0軸を潰すため、

```python
A.sum(axis=0)
```

は

```python
array([5., 7., 9.])
```

で、形状は `(3,)` です。

`axis=1` は第1軸を潰すため、

```python
A.sum(axis=1)
```

は

```python
array([6., 15.])
```

で、形状は `(2,)` です。

したがって、

$$
\boxed{
\texttt{axis=0}:(2,3)\to(3,)
}
$$

$$
\boxed{
\texttt{axis=1}:(2,3)\to(2,)
}
$$

です。
<!-- solution-end -->

### 演習 PYNUM1-A2

- Level: A
- 主題: 要素積と行列積
- 使用技術: `*`、`@`
- 計算量: 小

```python
A = np.array([
    [1.0, 2.0],
    [3.0, 4.0],
])

x = np.array([2.0, 5.0])
```

について、

1. `A * x` を求めよ。
2. `A @ x` を求めよ。
3. 二つの結果の形状を答えよ。
4. 数学の $Ax$ に対応するのはどちらか説明せよ。

<!-- solution-start -->
### 詳細解答

`A * x` では `x` が各行へブロードキャストされ、

```python
array([
    [2., 10.],
    [6., 20.],
])
```

となります。

形状は `(2,2)` です。

一方、`A @ x` は行列ベクトル積なので、

$$
\begin{pmatrix}
1&2\\
3&4
\end{pmatrix}
\begin{pmatrix}
2\\
5
\end{pmatrix}
=
\begin{pmatrix}
12\\
26
\end{pmatrix}.
$$

従って、

```python
array([12., 26.])
```

で、形状は `(2,)` です。

数学の $Ax$ に対応するのは `A @ x` です。
<!-- solution-end -->

### 演習 PYNUM1-A3

- Level: A
- 主題: ビューとコピー
- 使用技術: basic slicing、`.copy()`
- 計算量: 小

コード1：

```python
a = np.array([0.0, 1.0, 2.0, 3.0, 4.0])
b = a[1:4]
b[:] = -1.0
```

コード2：

```python
a = np.array([0.0, 1.0, 2.0, 3.0, 4.0])
b = a[1:4].copy()
b[:] = -1.0
```

1. コード1の最後の `a` を求めよ。
2. コード2の最後の `a` を求めよ。
3. 違いが生じる理由を説明せよ。
4. 元配列を変更してよいか不明なら、どちらを選ぶ方が安全か述べよ。

<!-- solution-start -->
### 詳細解答

コード1の `b` はビューなので、`b` の更新は `a` へ反映されます。

従って、

```python
array([0., -1., -1., -1., 4.])
```

です。

コード2では `.copy()` で独立したデータを作るため、`a` は

```python
array([0., 1., 2., 3., 4.])
```

のままです。

違いはデータバッファを共有しているかどうかです。

元配列を変更してよいか不明で独立した作業領域が必要なら、コピーを明示する方が安全です。
<!-- solution-end -->

### 演習 PYNUM1-A4

- Level: A
- 主題: ブロードキャストとブールマスク
- 使用技術: `[:, None]`、条件配列
- 計算量: 小

```python
A = np.zeros((3, 4))
r = np.array([1.0, 2.0, 3.0])
c = np.array([10.0, 20.0, 30.0, 40.0])
```

とする。

1. `A + c` の形状を求めよ。
2. `A + r` がそのままでは実行できない理由を説明せよ。
3. 各行へ `r` の値を1個ずつ足し、さらに `c` を各行へ足す式を書け。
4. 得た配列から20より大きい要素だけをブールマスクで取り出せ。

<!-- solution-start -->
### 詳細解答

`A.shape` は `(3,4)`、`c.shape` は `(4,)` です。

末尾軸が4で一致するため、`A + c` の形状は `(3,4)` です。

一方、`r.shape` は `(3,)` なので、`A` の末尾軸4と `r` の末尾軸3が一致せず、どちらも1ではありません。

各行へ `r` の値を1個ずつ足すには、

```python
C = A + r[:, None] + c
```

とします。

結果は、

```python
array([
    [11., 21., 31., 41.],
    [12., 22., 32., 42.],
    [13., 23., 33., 43.],
])
```

です。

20より大きい要素は、

```python
C[C > 20.0]
```

で取り出せます。
<!-- solution-end -->

### 演習 PYNUM1-B1

- Level: B
- 主題: ベクトル化と軸付き集約
- 使用技術: 配列演算、`axis`
- 計算量: 中

4本の二次元ベクトル

$$
(3,4),\quad
(5,12),\quad
(8,15),\quad
(7,24)
$$

を行に並べた配列 `X` を作る。

1. `X.shape == (4,2)` を確認せよ。
2. 各行の Euclid ノルムを求めよ。
3. 各行を自分のノルムで割って単位ベクトルへ正規化せよ。
4. 正規化後の各行ノルムが1であることを `np.allclose` で確認せよ。
5. ノルム配列へ `[:, None]` が必要な理由を shape から説明せよ。

<!-- solution-start -->
### 詳細解答

```python
X = np.array([
    [3.0, 4.0],
    [5.0, 12.0],
    [8.0, 15.0],
    [7.0, 24.0],
])
```

とします。

`X.shape` は `(4,2)` です。

各行のノルムは、

```python
norms = np.linalg.norm(X, axis=1)
```

で、

```python
array([5., 13., 17., 25.])
```

となります。

`norms.shape` は `(4,)` です。

各行を対応するノルムで割るには、

```python
Y = X / norms[:, None]
```

とします。

`norms[:, None].shape` は `(4,1)` なので、

```text
X:              (4, 2)
norms[:, None]: (4, 1)
```

となり、第1軸の1が2へブロードキャストされます。

確認は、

```python
np.allclose(
    np.linalg.norm(Y, axis=1),
    1.0,
)
```

で行えます。
<!-- solution-end -->

### 演習 PYNUM1-B2

- Level: B
- 主題: 乱数生成器と再現性
- 使用技術: `default_rng`、状態更新
- 計算量: 中

次の三つの実験を行え。

1. seed 2026 から乱数生成器 `rng1`、`rng2` を別々に作り、それぞれ標準正規乱数を5個生成する。
2. `rng1` からさらに5個生成する。
3. seed 2027 から `rng3` を作り、5個生成する。

そのうえで、

- 1の二列が一致する理由
- 2が1と通常一致しない理由
- 3が1と通常一致しない理由

を説明せよ。

<!-- solution-start -->
### 詳細解答

```python
rng1 = np.random.default_rng(2026)
rng2 = np.random.default_rng(2026)

x1 = rng1.normal(size=5)
x2 = rng2.normal(size=5)

x1_next = rng1.normal(size=5)

rng3 = np.random.default_rng(2027)
x3 = rng3.normal(size=5)

print(np.array_equal(x1, x2))
print(np.array_equal(x1, x1_next))
print(np.array_equal(x1, x3))
```

最初の比較は `True` です。

`rng1` と `rng2` は別オブジェクトですが、同じ初期化条件と同じ呼出し順序で使われるため、同じ疑似乱数列の先頭5個を返します。

`x1_next` は `rng1` の状態が進んだ後の次の5個なので、`x1` とは通常一致しません。

`rng3` は seed が異なるため、初期状態が異なります。

したがって `x3` も `x1` と通常一致しません。
<!-- solution-end -->

### 演習 PYNUM1-B3

- Level: B
- 主題: 数値診断
- 使用技術: dtype、有限値判定、shape assertion
- 計算量: 中

次のコードには問題がある。

```python
Ns = np.array([8, 16, 32, 64])
errors = np.zeros_like(Ns)

values = np.array([0.5, 0.25, np.nan, 0.0625])

errors[:] = values

mask = errors > 0
print(np.log(errors[mask]))
```

1. `errors` が誤差配列として不適切な理由を説明せよ。
2. `errors` を適切に初期化せよ。
3. `NaN` と `inf` を除外し、有限な正の値だけを選ぶマスクを書け。
4. shape の不一致も検出するコードを書け。

<!-- solution-start -->
### 詳細解答

`Ns` は整数配列なので、

```python
np.zeros_like(Ns)
```

も整数型です。

したがって小数誤差を正しく保持できません。

修正は、

```python
errors = np.zeros_like(Ns, dtype=float)
```

です。

有限な正の値だけを選ぶには、

```python
mask = np.isfinite(errors) & (errors > 0.0)
```

とします。

shape も確認するなら、

```python
assert errors.shape == values.shape
```

を代入前に置けます。

全体は、

```python
Ns = np.array([8, 16, 32, 64])
errors = np.zeros_like(Ns, dtype=float)

values = np.array([0.5, 0.25, np.nan, 0.0625])

assert errors.shape == values.shape

errors[:] = values

mask = np.isfinite(errors) & (errors > 0.0)
log_errors = np.log(errors[mask])
```

となります。
<!-- solution-end -->

### 演習 PYNUM1-C1

- Level: C
- 主題: 数値実験の統合
- 使用技術: ベクトル化、dtype、誤差評価、log-log 図、収束次数
- 計算量: 大

積分

$$
I
=
\int_0^1 e^x\,dx
=
e-1
$$

を複合台形則で近似する。

分割数を

$$
N=8,16,32,64,128
$$

とする。

1. `np.linspace` と配列演算を用いて複合台形則を計算する関数 `trap_exp(N)` を書け。
2. 各 $N$ の絶対誤差を `dtype=float` の NumPy 配列へ保存せよ。
3. 全誤差が有限かつ正であることを確認せよ。
4. 隣接する $N$ について
   $$
   p_N
   =
   \frac{\log(E_N/E_{2N})}{\log2}
   $$
   を計算せよ。
5. $N$ 対誤差の log-log 図を描け。
6. $p_N$ が2へ近づくことと、図の傾きが約 $-2$ になることの対応を説明せよ。
7. 誤差配列を `np.zeros_like(Ns)` とだけ初期化すると何が起こりうるか説明せよ。

<!-- solution-start -->
### 詳細解答

複合台形則を

$$
T_N
=
\frac h2
\sum_{i=0}^{N-1}
\left[
f(x_i)+f(x_{i+1})
\right],
\qquad
h=\frac1N
$$

の形で使います。

```python
import numpy as np
import matplotlib.pyplot as plt

def trap_exp(N):
    h = 1.0 / N
    x = np.linspace(0.0, 1.0, N + 1, dtype=float)
    y = np.exp(x)

    return 0.5 * h * np.sum(y[:-1] + y[1:])
```

`y[:-1]` と `y[1:]` はどちらも形状 `(N,)` なので、各小区間の両端値を一度に足せます。

次に、

```python
Ns = np.array([8, 16, 32, 64, 128], dtype=int)
errors = np.empty(Ns.shape, dtype=float)

exact = np.e - 1.0

for i, N in enumerate(Ns):
    approx = trap_exp(int(N))
    errors[i] = abs(approx - exact)
```

とします。

問題サイズを変える外側反復は Python で書き、各 $N$ 内部の要素計算は NumPy へ寄せています。

有限性と正値性は、

```python
assert np.all(np.isfinite(errors))
assert np.all(errors > 0.0)
```

で確認します。

収束次数は、

```python
orders = (
    np.log(errors[:-1] / errors[1:])
    / np.log(Ns[1:] / Ns[:-1])
)
```

で求められます。

今回は $N$ が毎回2倍なので、

```python
orders = np.log(errors[:-1] / errors[1:]) / np.log(2.0)
```

でも同じです。

図は、

```python
fig, ax = plt.subplots()

ax.loglog(Ns, errors, marker="o", label="trapezoidal error")

ax.set_xlabel("N")
ax.set_ylabel("absolute error")
ax.grid(True)
ax.legend()

plt.show()
```

です。

ここで誤差が

$$
E_N\approx C N^{-2}
$$

なら、

$$
\log E_N\approx\log C-2\log N
$$

なので log-log 図の傾きは約 $-2$ です。

一方、

$$
p_N
=
\frac{\log(E_N/E_{2N})}{\log2}
$$

は約2になります。

従って、

$$
\boxed{
\text{log-log 図の傾き}
\approx
-p_N
}
$$

です。

最後に、

```python
errors = np.zeros_like(Ns)
```

とすると、`Ns` が整数型なので `errors` も整数型になります。

小さい誤差を代入すると0へ切り捨てられ、その後に対数を取れば `-inf` が生じるなど、診断まで壊れます。

したがって誤差配列は、

```python
errors = np.zeros_like(Ns, dtype=float)
```

または、

```python
errors = np.empty(Ns.shape, dtype=float)
```

と作ります。
<!-- solution-end -->

---

## 15. 後続 NUMLAB での共通規約

本章以後、数値実験コードでは原則として次を守ります。

1. 配列を作ったら必要箇所で `shape` と `dtype` を確認する。
2. `*` と `@` を数学上の演算に対応させる。
3. ビューを意図しているかコピーを意図しているかを明確にする。
4. 複雑なブロードキャストは shape をコメントまたは assertion で残す。
5. 乱数は `np.random.default_rng(seed)` から作った `Generator` を明示的に渡す。
6. 誤差配列は原則として浮動小数点型で保持する。
7. 節目で `np.isfinite` を確認する。
8. 問題サイズを変える外側反復まで無理にベクトル化しない。
9. 収束実験は数値表と log-log 図の両方を見る。
10. SciPy の API は必要な章で目的から選び、関数名の暗記を要求しない。

---

## 16. まとめ

本章の主役は Python 文法ではなく、

$$
\boxed{
\text{NumPy 配列を正しく読む力}
}
$$

でした。

配列ではまず、

$$
\boxed{
\texttt{shape}
\quad
\texttt{axis}
\quad
\texttt{dtype}
}
$$

を確認します。

さらに、

$$
\boxed{
\text{代入}
\ne
\text{コピー}
}
$$

であり、基本スライスはビューを返すため、共有メモリを意識する必要があります。

ブロードキャストは形状を末尾から比較し、

$$
\boxed{
\text{軸長が等しい}
\quad\text{または}\quad
\text{一方が1}
}
$$

なら要素演算を拡張できます。

ベクトル化は「Python の反復を全て消すこと」ではなく、数式上まとまった演算を配列演算へ移すことです。

乱数では、

```python
rng = np.random.default_rng(seed)
```

として状態を明示的な乱数生成器へ持たせます。

最後に、

$$
E_N\approx CN^{-p}
$$

なら log-log 図の傾きから $p$ を読めます。

これで後続 NUMLAB では、

$$
\boxed{
\text{理論で予測した量}
\to
\text{NumPy で計算}
\to
\text{shape / dtype / finite を検査}
\to
\text{表と図で検証}
}
$$

という共通の実験手順を使えます。

次の NUMLAB0 では、このコードを GitHub Pages 上で安全に実行するための **計算機演習基盤**を設計・実装します。
