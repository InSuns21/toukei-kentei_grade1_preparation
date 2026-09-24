# NUMLAB5 準 Monte Carlo 演習

NUMLAB5 では、QMC1–QMC8 の理論を **8本のブラウザ穴埋め演習**へ移します。

この章では新しい準 Monte Carlo 理論を追加しません。各実験は対応する理論章の stable anchor から始め、

```text
点集合・関数空間・双対理論
↓
Python で点集合・周波数・誤差量を構成
↓
ディスクレパンシー・最悪誤差・双対消去・分散・収束次数を測る
↓
理論と照合
```

の順で確認します。

Python / NumPy の共通記法は PYNUM1、ブラウザ実行基盤は NUMLAB0、演習形式は [NUMERICAL LAB AUTHORING STANDARD](../../../NUMERICAL_LAB_AUTHORING_STANDARD.md) に従います。

---

## 0. 実験の共通規約

各理論対応ラボは **穴埋め → 模範解答 → 自動判定** の exercise mode で実行します。

1. 点集合をライブラリから得るだけで終わらず、理論上の構造を数値量として検査する。
2. 決定論的 QMC では、単一の積分誤差だけでなくディスクレパンシー・双対条件・最悪誤差など原因側も測る。
3. Walsh / Fourier モードでは「平均が小さかった」ではなく、双対所属条件と離散平均を対応させる。
4. ランダム化 QMC では点ごとの独立性を仮定せず、**独立なランダム化反復**から標準誤差を測る。
5. 高次法では点集合だけで $N^{-2}$ を主張せず、滑らかな被積分関数と高次構成を同時に使う。
6. hidden test は最終値だけでなく、点集合・双対条件・log-log 傾きなど QMC 理論に対応する性質を検査する。

---

<a id="lab-numlab5-qmc1-discrepancy"></a>
## 1. QMC1：中点集合のスター・ディスクレパンシーと求積誤差

理論： [スター・ディスクレパンシー](../QMC1/index.md#def-qmc1-star-discrepancy) / [Koksma--Hlawka の不等式](../QMC1/index.md#thm-qmc1-koksma-hlawka)

一次元の中点集合

$$
P_N
=
\left\{
\frac{j+1/2}{N}:j=0,\ldots,N-1
\right\}
$$

では

$$
D_N^\ast
=
\frac{1}{2N}.
$$

さらに

$$
f(x)=x^2
$$

の変動は1なので、Koksma--Hlawka の不等式から

$$
|Q_N(f)-I(f)|
\le
D_N^\ast
$$

が得られます。

この例では実際の中点則誤差はさらに速く $N^{-2}$ で減ります。

**穴埋め課題：** 中点集合、一次元スター・ディスクレパンシー、求積値をコードへ翻訳してください。

```python-lab
# lab-id: NUMLAB5-QMC1-DISCREPANCY
# lab-title: 中点集合のスター・ディスクレパンシー
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

Ns = np.array([4, 8, 16, 32, 64], dtype=int)
discrepancies = []
errors = []

def star_discrepancy_1d(points):
    points = np.sort(np.asarray(points, dtype=float))
    N = len(points)
    i = np.arange(1, N + 1, dtype=float)
    upper = ___
    lower = ___
    return max(np.max(upper), np.max(lower))

for N in Ns:
    points = ___
    discrepancy = star_discrepancy_1d(points)
    estimate = ___
    error = abs(estimate - 1.0 / 3.0)

    discrepancies.append(discrepancy)
    errors.append(error)

discrepancies = np.array(discrepancies)
errors = np.array(errors)

print("N:", Ns)
print("star discrepancy:", discrepancies)
print("x^2 integration error:", errors)
print("N * D*:", Ns * discrepancies)
print("N^2 * error:", Ns**2 * errors)

fig, ax = plt.subplots()
ax.loglog(Ns, discrepancies, marker="o", label="star discrepancy")
ax.loglog(Ns, errors, marker="s", label="integration error")
ax.legend()
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

Ns = np.array([4, 8, 16, 32, 64], dtype=int)
discrepancies = []
errors = []

def star_discrepancy_1d(points):
    points = np.sort(np.asarray(points, dtype=float))
    N = len(points)
    i = np.arange(1, N + 1, dtype=float)
    upper = i / N - points
    lower = points - (i - 1.0) / N
    return max(np.max(upper), np.max(lower))

for N in Ns:
    points = (np.arange(N) + 0.5) / N
    discrepancy = star_discrepancy_1d(points)
    estimate = np.mean(points ** 2)
    error = abs(estimate - 1.0 / 3.0)

    discrepancies.append(discrepancy)
    errors.append(error)

discrepancies = np.array(discrepancies)
errors = np.array(errors)

print("N:", Ns)
print("star discrepancy:", discrepancies)
print("x^2 integration error:", errors)
print("N * D*:", Ns * discrepancies)
print("N^2 * error:", Ns**2 * errors)

fig, ax = plt.subplots()
ax.loglog(Ns, discrepancies, marker="o", label="star discrepancy")
ax.loglog(Ns, errors, marker="s", label="integration error")
ax.legend()
ax.grid(True)
```

```python-test
assert np.allclose(discrepancies, 1.0 / (2.0 * Ns))
assert np.allclose(errors, 1.0 / (12.0 * Ns**2))
assert np.all(errors <= discrepancies + 1e-15)
assert np.allclose(Ns * discrepancies, 0.5)
```

ここでは

$$
D_N^\ast=O(N^{-1})
$$

に対して、特定の滑らかな関数では実誤差が $O(N^{-2})$ まで速く減っています。

Koksma--Hlawka の不等式は一様性と関数側の変動を分離する**上界**であり、個々の関数について常に鋭い等式になるわけではありません。

---

<a id="lab-numlab5-qmc2-worst-case-error"></a>
## 2. QMC2：再生核から最悪誤差を直接計算する

理論： [RKHS 最悪誤差の表現公式](../QMC2/index.md#thm-qmc2-worst-case-error)

一次元の再生核

$$
K(x,y)=1+\min(x,y)
$$

を考えます。

等重み点集合 $x_1,\ldots,x_N$ に対する最悪誤差平方は

$$
e_N^2
=
\int_0^1\int_0^1 K(x,y)\,dx\,dy
-
\frac{2}{N}
\sum_{i=1}^N
\int_0^1 K(x_i,y)\,dy
+
\frac{1}{N^2}
\sum_{i,j=1}^N K(x_i,x_j).
$$

この核では

$$
\int_0^1 K(x,y)\,dy
=
1+x-\frac{x^2}{2},
$$

$$
\int_0^1\int_0^1 K(x,y)\,dx\,dy
=
\frac43.
$$

中点集合について最悪誤差を実測します。

**穴埋め課題：** 核行列、積分表現元の値、最悪誤差平方の公式を埋めてください。

```python-lab
# lab-id: NUMLAB5-QMC2-WORST-CASE-ERROR
# lab-title: RKHS 最悪誤差を核公式から計算
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

Ns = np.array([2, 4, 8, 16, 32, 64], dtype=int)
worst_case_errors = []

def kernel(x, y):
    return 1.0 + np.minimum(x, y)

def kernel_integral(x):
    return 1.0 + x - 0.5 * x * x

kernel_double_integral = 4.0 / 3.0

for N in Ns:
    points = (np.arange(N) + 0.5) / N
    K = ___
    representer_values = ___
    error_squared = ___
    worst_case_errors.append(np.sqrt(max(error_squared, 0.0)))

worst_case_errors = np.array(worst_case_errors)
scaled_errors = Ns * worst_case_errors
orders = np.log(worst_case_errors[:-1] / worst_case_errors[1:]) / np.log(2.0)

print("N:", Ns)
print("worst-case errors:", worst_case_errors)
print("N * error:", scaled_errors)
print("orders:", orders)

fig, ax = plt.subplots()
ax.loglog(Ns, worst_case_errors, marker="o", label="RKHS worst-case error")
ax.loglog(
    Ns,
    worst_case_errors[0] * Ns[0] / Ns,
    linestyle="--",
    label="N^-1 reference",
)
ax.legend()
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

Ns = np.array([2, 4, 8, 16, 32, 64], dtype=int)
worst_case_errors = []

def kernel(x, y):
    return 1.0 + np.minimum(x, y)

def kernel_integral(x):
    return 1.0 + x - 0.5 * x * x

kernel_double_integral = 4.0 / 3.0

for N in Ns:
    points = (np.arange(N) + 0.5) / N
    K = kernel(points[:, None], points[None, :])
    representer_values = kernel_integral(points)
    error_squared = (
        kernel_double_integral
        - 2.0 * np.mean(representer_values)
        + np.mean(K)
    )
    worst_case_errors.append(np.sqrt(max(error_squared, 0.0)))

worst_case_errors = np.array(worst_case_errors)
scaled_errors = Ns * worst_case_errors
orders = np.log(worst_case_errors[:-1] / worst_case_errors[1:]) / np.log(2.0)

print("N:", Ns)
print("worst-case errors:", worst_case_errors)
print("N * error:", scaled_errors)
print("orders:", orders)

fig, ax = plt.subplots()
ax.loglog(Ns, worst_case_errors, marker="o", label="RKHS worst-case error")
ax.loglog(
    Ns,
    worst_case_errors[0] * Ns[0] / Ns,
    linestyle="--",
    label="N^-1 reference",
)
ax.legend()
ax.grid(True)
```

```python-test
assert np.all(worst_case_errors[1:] < worst_case_errors[:-1])
assert np.allclose(
    scaled_errors,
    1.0 / np.sqrt(12.0),
    rtol=1e-10,
    atol=1e-12,
)
assert np.allclose(orders, 1.0, atol=1e-10)
assert np.all(worst_case_errors > 0.0)
```

この例では

$$
e_N
=
\frac{1}{\sqrt{12}\,N}
$$

が数値的にそのまま現れます。

特定の被積分関数を一つ選ばなくても、再生核から**関数空間の単位球全体に対する誤差**を点集合だけで評価できることが QMC2 の要点です。

---

<a id="lab-numlab5-qmc3-lattice-character"></a>
## 3. QMC3：双対格子に入る Fourier モードだけが残る

理論： [ランク1格子上の複素指数モードの離散直交性](../QMC3/index.md#thm-qmc3-character-orthogonality)

$N=5$ とし、周波数

$$
\boldsymbol h=(1,-1)
$$

を考えます。

生成ベクトル

$$
\boldsymbol z_{\mathrm{bad}}=(1,1)
$$

では

$$
\boldsymbol h\cdot\boldsymbol z_{\mathrm{bad}}
\equiv0\pmod5
$$

なので、この周波数は双対格子に入ります。

一方

$$
\boldsymbol z_{\mathrm{good}}=(1,2)
$$

では双対条件を満たしません。

**穴埋め課題：** ランク1格子点、双対条件、複素指数モードの格子平均を実装してください。

```python-lab
# lab-id: NUMLAB5-QMC3-LATTICE-CHARACTER
# lab-title: 格子則の Fourier モード消去
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

N = 5
h = np.array([1, -1], dtype=int)

def lattice_points(z):
    n = np.arange(N, dtype=int)[:, None]
    z = np.asarray(z, dtype=int)
    return ___

def character_mean(points, frequency):
    phase = points @ np.asarray(frequency, dtype=float)
    values = ___
    return values.mean()

z_bad = np.array([1, 1], dtype=int)
z_good = np.array([1, 2], dtype=int)

bad_points = lattice_points(z_bad)
good_points = lattice_points(z_good)

bad_dual = ___
good_dual = ___

bad_mean = character_mean(bad_points, h)
good_mean = character_mean(good_points, h)

print("bad generator dual condition:", bad_dual)
print("good generator dual condition:", good_dual)
print("bad character mean:", bad_mean)
print("good character mean:", good_mean)

fig, ax = plt.subplots()
ax.scatter(bad_points[:, 0], bad_points[:, 1], label="z=(1,1)")
ax.scatter(
    good_points[:, 0],
    good_points[:, 1],
    marker="x",
    label="z=(1,2)",
)
ax.set_xlabel("x1")
ax.set_ylabel("x2")
ax.legend()
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

N = 5
h = np.array([1, -1], dtype=int)

def lattice_points(z):
    n = np.arange(N, dtype=int)[:, None]
    z = np.asarray(z, dtype=int)
    return ((n * z) % N) / N

def character_mean(points, frequency):
    phase = points @ np.asarray(frequency, dtype=float)
    values = np.exp(2j * np.pi * phase)
    return values.mean()

z_bad = np.array([1, 1], dtype=int)
z_good = np.array([1, 2], dtype=int)

bad_points = lattice_points(z_bad)
good_points = lattice_points(z_good)

bad_dual = (h @ z_bad) % N == 0
good_dual = (h @ z_good) % N == 0

bad_mean = character_mean(bad_points, h)
good_mean = character_mean(good_points, h)

print("bad generator dual condition:", bad_dual)
print("good generator dual condition:", good_dual)
print("bad character mean:", bad_mean)
print("good character mean:", good_mean)

fig, ax = plt.subplots()
ax.scatter(bad_points[:, 0], bad_points[:, 1], label="z=(1,1)")
ax.scatter(
    good_points[:, 0],
    good_points[:, 1],
    marker="x",
    label="z=(1,2)",
)
ax.set_xlabel("x1")
ax.set_ylabel("x2")
ax.legend()
ax.grid(True)
```

```python-test
assert bad_dual
assert not good_dual
assert np.isclose(abs(bad_mean), 1.0, atol=1e-12)
assert abs(good_mean) < 1e-12
assert len(np.unique(good_points, axis=0)) == N
```

同じ5点でも生成ベクトルにより「消せない低周波」が変わります。

点の見た目だけでなく、

$$
\boldsymbol h\cdot\boldsymbol z
\equiv0\pmod N
$$

という双対条件が積分誤差の周波数選別を決めています。

---

<a id="lab-numlab5-qmc4-digital-net"></a>
## 4. QMC4：生成行列から $(0,2,2)$-ネットを作る

理論： [素数底のデジタル点集合](../QMC4/index.md#def-qmc4-digital-net)

底2、$m=2$ とし、

$$
C_1=
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix},
\qquad
C_2=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$

を使います。

生成した4点が、

- 各座標の幅 $1/4$ の区間
- 面積 $1/4$ の4象限

へちょうど1点ずつ入ることを確認します。

**穴埋め課題：** 桁ベクトルへの生成行列作用と2進小数への読み戻しを実装してください。

```python-lab
# lab-id: NUMLAB5-QMC4-DIGITAL-NET
# lab-title: 底2の4点デジタルネット
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

m = 2
N = 2 ** m

C1 = np.array([
    [1, 0],
    [0, 1],
], dtype=int)

C2 = np.array([
    [0, 1],
    [1, 0],
], dtype=int)

n = np.arange(N, dtype=int)
digit_vectors = ___
weights = ___

def digital_coordinate(C):
    output_digits = ___
    return ___

points = np.column_stack([
    digital_coordinate(C1),
    digital_coordinate(C2),
])

quarter_counts_x1 = np.bincount(
    np.floor(4.0 * points[:, 0]).astype(int),
    minlength=4,
)
quarter_counts_x2 = np.bincount(
    np.floor(4.0 * points[:, 1]).astype(int),
    minlength=4,
)

quadrant_index = (
    2 * np.floor(2.0 * points[:, 0]).astype(int)
    + np.floor(2.0 * points[:, 1]).astype(int)
)
quadrant_counts = np.bincount(quadrant_index, minlength=4)

print("points:")
print(points)
print("x1 quarter counts:", quarter_counts_x1)
print("x2 quarter counts:", quarter_counts_x2)
print("quadrant counts:", quadrant_counts)

fig, ax = plt.subplots()
ax.scatter(points[:, 0], points[:, 1], s=70)
ax.set_xlim(-0.05, 1.0)
ax.set_ylim(-0.05, 1.0)
ax.set_xlabel("x1")
ax.set_ylabel("x2")
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

m = 2
N = 2 ** m

C1 = np.array([
    [1, 0],
    [0, 1],
], dtype=int)

C2 = np.array([
    [0, 1],
    [1, 0],
], dtype=int)

n = np.arange(N, dtype=int)
digit_vectors = ((n[:, None] >> np.arange(m)) & 1)
weights = 2.0 ** (-np.arange(1, m + 1))

def digital_coordinate(C):
    output_digits = (digit_vectors @ C.T) % 2
    return output_digits @ weights

points = np.column_stack([
    digital_coordinate(C1),
    digital_coordinate(C2),
])

quarter_counts_x1 = np.bincount(
    np.floor(4.0 * points[:, 0]).astype(int),
    minlength=4,
)
quarter_counts_x2 = np.bincount(
    np.floor(4.0 * points[:, 1]).astype(int),
    minlength=4,
)

quadrant_index = (
    2 * np.floor(2.0 * points[:, 0]).astype(int)
    + np.floor(2.0 * points[:, 1]).astype(int)
)
quadrant_counts = np.bincount(quadrant_index, minlength=4)

print("points:")
print(points)
print("x1 quarter counts:", quarter_counts_x1)
print("x2 quarter counts:", quarter_counts_x2)
print("quadrant counts:", quadrant_counts)

fig, ax = plt.subplots()
ax.scatter(points[:, 0], points[:, 1], s=70)
ax.set_xlim(-0.05, 1.0)
ax.set_ylim(-0.05, 1.0)
ax.set_xlabel("x1")
ax.set_ylabel("x2")
ax.grid(True)
```

```python-test
expected = np.array([
    [0.0, 0.0],
    [0.5, 0.25],
    [0.25, 0.5],
    [0.75, 0.75],
])
assert np.allclose(points, expected)
assert np.array_equal(
    quarter_counts_x1,
    np.ones(4, dtype=int),
)
assert np.array_equal(
    quarter_counts_x2,
    np.ones(4, dtype=int),
)
assert np.array_equal(
    quadrant_counts,
    np.ones(4, dtype=int),
)
```

各座標だけを見る均等性ではなく、2次元の $b$ 進基本区間まで点数が正確に制御されています。

これが $(0,2,2)$-ネットの有限解像度での意味です。

---

<a id="lab-numlab5-qmc5-walsh-dual"></a>
## 5. QMC5：Walsh 双対周波数だけがデジタルネット平均に残る

理論： [デジタルネット上の Walsh 関数の離散直交性](../QMC5/index.md#thm-qmc5-digital-character-property)

前節の4点

$$
(0,0),\quad
(1/2,1/4),\quad
(1/4,1/2),\quad
(3/4,3/4)
$$

を使います。

QMC5 の canonical example では

$$
(1,2),\ (2,1)
$$

は双対ネットへ入り、

$$
(1,1),\ (2,2)
$$

は入りません。

底2の Walsh 関数を桁から直接実装し、点平均を比較します。

**穴埋め課題：** $x$ と $k$ の2進桁、桁内積の偶奇、二次元 Walsh 文字の平均を実装してください。

```python-lab
# lab-id: NUMLAB5-QMC5-WALSH-DUAL
# lab-title: Walsh 双対周波数の離散直交性
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

points = np.array([
    [0.0, 0.0],
    [0.5, 0.25],
    [0.25, 0.5],
    [0.75, 0.75],
])

def walsh_base2(k, x, m=2):
    powers = 2.0 ** np.arange(1, m + 1)
    x_digits = ___
    k_digits = ___
    parity = ___
    return 1 - 2 * parity

frequencies = np.array([
    [1, 2],
    [1, 1],
    [2, 1],
    [2, 2],
], dtype=int)

character_means = []

for k1, k2 in frequencies:
    values = ___
    character_means.append(values.mean())

character_means = np.array(character_means)

print("frequencies:")
print(frequencies)
print("Walsh character means:", character_means)

fig, ax = plt.subplots()
ax.bar(
    [f"({k1},{k2})" for k1, k2 in frequencies],
    np.abs(character_means),
)
ax.set_ylabel("|digital-net average|")
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

points = np.array([
    [0.0, 0.0],
    [0.5, 0.25],
    [0.25, 0.5],
    [0.75, 0.75],
])

def walsh_base2(k, x, m=2):
    powers = 2.0 ** np.arange(1, m + 1)
    x_digits = np.floor(x[:, None] * powers).astype(int) % 2
    k_digits = (k >> np.arange(m)) & 1
    parity = (x_digits * k_digits).sum(axis=1) % 2
    return 1 - 2 * parity

frequencies = np.array([
    [1, 2],
    [1, 1],
    [2, 1],
    [2, 2],
], dtype=int)

character_means = []

for k1, k2 in frequencies:
    values = (
        walsh_base2(int(k1), points[:, 0])
        * walsh_base2(int(k2), points[:, 1])
    )
    character_means.append(values.mean())

character_means = np.array(character_means)

print("frequencies:")
print(frequencies)
print("Walsh character means:", character_means)

fig, ax = plt.subplots()
ax.bar(
    [f"({k1},{k2})" for k1, k2 in frequencies],
    np.abs(character_means),
)
ax.set_ylabel("|digital-net average|")
```

```python-test
assert np.isclose(character_means[0], 1.0)
assert np.isclose(character_means[1], 0.0)
assert np.isclose(character_means[2], 1.0)
assert np.isclose(character_means[3], 0.0)
assert np.all(np.isin(character_means, [-1.0, 0.0, 1.0]))
```

Fourier 格子則と同様に、デジタルネットでも「双対に入った周波数だけが消えずに残る」という構造が見えます。

違うのは、通常の指数関数ではなく $b$ 進桁に適合した Walsh 関数が文字になる点です。

---

<a id="lab-numlab5-qmc6-polynomial-lattice"></a>
## 6. QMC6：Laurent 展開係数から多項式格子を生成する

理論： [多項式格子のデジタルネット表示](../QMC6/index.md#thm-qmc6-digital-representation)

canonical example

$$
b=2,\qquad
m=2,\qquad
p(x)=x^2+x+1,\qquad
\boldsymbol q=(1,x)
$$

を使います。

QMC6 で計算した Laurent 展開は

$$
\frac1p
=
0x^{-1}+1x^{-2}+1x^{-3}+\cdots,
$$

$$
\frac{x}{p}
=
1x^{-1}+1x^{-2}+0x^{-3}+\cdots.
$$

係数列 $t_{j,\ell}$ から

$$
(C_j)_{a,r+1}
=
t_{j,a+r}
$$

を作り、同じ4点を再現します。

**穴埋め課題：** Laurent 係数から生成行列を切り出し、入力桁を2進小数へ写す部分を実装してください。

```python-lab
# lab-id: NUMLAB5-QMC6-POLYNOMIAL-LATTICE
# lab-title: 多項式格子の canonical 4点例
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

m = 2
N = 2 ** m

t_q1 = np.array([0, 1, 1], dtype=int)
t_q2 = np.array([1, 1, 0], dtype=int)

def generating_matrix(coefficients):
    return ___

C1 = generating_matrix(t_q1)
C2 = generating_matrix(t_q2)

n = np.arange(N, dtype=int)
digit_vectors = ___
weights = 2.0 ** (-np.arange(1, m + 1))

def coordinate(C):
    output_digits = ___
    return ___

points = np.column_stack([
    coordinate(C1),
    coordinate(C2),
])

print("C1 =")
print(C1)
print("C2 =")
print(C2)
print("polynomial lattice points:")
print(points)

fig, ax = plt.subplots()
ax.scatter(points[:, 0], points[:, 1], s=70)
ax.set_xlim(-0.05, 1.0)
ax.set_ylim(-0.05, 1.0)
ax.set_xlabel("x1")
ax.set_ylabel("x2")
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

m = 2
N = 2 ** m

t_q1 = np.array([0, 1, 1], dtype=int)
t_q2 = np.array([1, 1, 0], dtype=int)

def generating_matrix(coefficients):
    return np.array([
        [coefficients[a + r] for r in range(m)]
        for a in range(m)
    ], dtype=int)

C1 = generating_matrix(t_q1)
C2 = generating_matrix(t_q2)

n = np.arange(N, dtype=int)
digit_vectors = ((n[:, None] >> np.arange(m)) & 1)
weights = 2.0 ** (-np.arange(1, m + 1))

def coordinate(C):
    output_digits = (digit_vectors @ C.T) % 2
    return output_digits @ weights

points = np.column_stack([
    coordinate(C1),
    coordinate(C2),
])

print("C1 =")
print(C1)
print("C2 =")
print(C2)
print("polynomial lattice points:")
print(points)

fig, ax = plt.subplots()
ax.scatter(points[:, 0], points[:, 1], s=70)
ax.set_xlim(-0.05, 1.0)
ax.set_ylim(-0.05, 1.0)
ax.set_xlabel("x1")
ax.set_ylabel("x2")
ax.grid(True)
```

```python-test
expected_C1 = np.array([
    [0, 1],
    [1, 1],
])
expected_C2 = np.array([
    [1, 1],
    [1, 0],
])
expected_points = np.array([
    [0.0, 0.0],
    [0.25, 0.75],
    [0.75, 0.5],
    [0.5, 0.25],
])
assert np.array_equal(C1, expected_C1)
assert np.array_equal(C2, expected_C2)
assert np.allclose(points, expected_points)
assert len(np.unique(points, axis=0)) == 4
```

多項式格子は別の種類の点集合に見えますが、Laurent 係数を生成行列へ並べると QMC4 型デジタルネットとしてそのまま実装できます。

---

<a id="lab-numlab5-qmc7-digital-shift"></a>
## 7. QMC7：デジタルシフトの不偏性と反復標準誤差

理論： [デジタルシフト QMC の厳密分散公式](../QMC7/index.md#thm-qmc7-shift-exact-variance) / [独立ランダム化反復](../QMC7/index.md#def-qmc7-independent-replicates)

底2の2点ネット

$$
P=\{0,1/2\}
$$

と

$$
f(x)
=
2+3\,\operatorname{wal}_1(x)-2\,\operatorname{wal}_2(x)
$$

を使います。

$P$ 上では $\operatorname{wal}_1$ が消え、$\operatorname{wal}_2$ だけが双対に残るため、一様デジタルシフト後の推定量は

$$
0
\quad\text{または}\quad
4
$$

となります。

従って真の積分値は2、理論分散は4です。

ここでは有限8桁のデジタルシフトを XOR として実装し、2000回の独立ランダム化から平均・分散・標準誤差を推定します。

**穴埋め課題：** 全点へ同じデジタルシフトを作用させ、反復推定量の分散と標準誤差を計算してください。

```python-lab
# lab-id: NUMLAB5-QMC7-DIGITAL-SHIFT
# lab-title: デジタルシフトの不偏性と分散
# lab-mode: exercise
# timeout-ms: 8000

import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(2026)

bits = 8
scale = 2 ** bits
replications = 2000

base_points = np.array([0, scale // 2], dtype=np.uint16)

def walsh_from_integer(k, integers):
    positions = np.arange(bits, dtype=int)
    x_digits = (
        (integers[:, None] >> (bits - 1 - positions))
        & 1
    ).astype(int)
    k_digits = ((k >> positions) & 1).astype(int)
    parity = (x_digits * k_digits).sum(axis=1) % 2
    return 1 - 2 * parity

estimates = np.empty(replications)
first_digit_balanced = np.empty(replications, dtype=bool)

for r in range(replications):
    shift = np.uint16(rng.integers(0, scale))
    shifted = ___

    w1 = walsh_from_integer(1, shifted)
    w2 = walsh_from_integer(2, shifted)

    values = 2.0 + 3.0 * w1 - 2.0 * w2
    estimates[r] = ___

    first_digits = (shifted >> (bits - 1)) & 1
    first_digit_balanced[r] = np.array_equal(
        np.sort(first_digits),
        np.array([0, 1], dtype=np.uint16),
    )

mean_estimate = estimates.mean()
sample_variance = ___
standard_error = ___

print("replicate mean:", mean_estimate)
print("sample variance:", sample_variance)
print("estimated standard error:", standard_error)
print(
    "all shifts preserve first-digit balance:",
    first_digit_balanced.all(),
)

fig, ax = plt.subplots()
ax.hist(
    estimates,
    bins=np.array([-0.5, 0.5, 3.5, 4.5]),
    density=True,
)
ax.set_xlabel("randomized QMC estimate")
ax.set_ylabel("relative frequency")
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(2026)

bits = 8
scale = 2 ** bits
replications = 2000

base_points = np.array([0, scale // 2], dtype=np.uint16)

def walsh_from_integer(k, integers):
    positions = np.arange(bits, dtype=int)
    x_digits = (
        (integers[:, None] >> (bits - 1 - positions))
        & 1
    ).astype(int)
    k_digits = ((k >> positions) & 1).astype(int)
    parity = (x_digits * k_digits).sum(axis=1) % 2
    return 1 - 2 * parity

estimates = np.empty(replications)
first_digit_balanced = np.empty(replications, dtype=bool)

for r in range(replications):
    shift = np.uint16(rng.integers(0, scale))
    shifted = np.bitwise_xor(base_points, shift)

    w1 = walsh_from_integer(1, shifted)
    w2 = walsh_from_integer(2, shifted)

    values = 2.0 + 3.0 * w1 - 2.0 * w2
    estimates[r] = values.mean()

    first_digits = (shifted >> (bits - 1)) & 1
    first_digit_balanced[r] = np.array_equal(
        np.sort(first_digits),
        np.array([0, 1], dtype=np.uint16),
    )

mean_estimate = estimates.mean()
sample_variance = estimates.var(ddof=1)
standard_error = np.sqrt(sample_variance / replications)

print("replicate mean:", mean_estimate)
print("sample variance:", sample_variance)
print("estimated standard error:", standard_error)
print(
    "all shifts preserve first-digit balance:",
    first_digit_balanced.all(),
)

fig, ax = plt.subplots()
ax.hist(
    estimates,
    bins=np.array([-0.5, 0.5, 3.5, 4.5]),
    density=True,
)
ax.set_xlabel("randomized QMC estimate")
ax.set_ylabel("relative frequency")
```

```python-test
assert first_digit_balanced.all()
assert set(np.unique(estimates)).issubset({0.0, 4.0})
assert abs(mean_estimate - 2.0) < 0.12
assert 3.7 < sample_variance < 4.3
assert 0.035 < standard_error < 0.055
```

ランダム化された2点は独立ではありません。むしろ同じシフトを共有するため強く依存しています。

それでも各点の周辺分布が一様なので推定量は不偏であり、**独立なのは2000回のランダム化反復どうし**です。標準誤差はその反復から推定します。

---

<a id="lab-numlab5-qmc8-interlacing"></a>
## 8. QMC8：桁交互配置で一次収束から二次収束へ

理論： [桁交互配置](../QMC8/index.md#def-qmc8-digit-interlacing) / [桁交互配置による次数 α デジタルネット構成](../QMC8/index.md#thm-qmc8-interlacing-order-alpha)

QMC8 の $\alpha=2$ の構成では、2座標の2進桁

$$
x_1
=
0.a_1a_2a_3\ldots,
\qquad
x_2
=
0.b_1b_2b_3\ldots
$$

を

$$
0.a_1b_1a_2b_2a_3b_3\ldots
$$

と交互配置して1座標へまとめます。

ここでは SciPy の決定論的 Sobol 点を**素材としてだけ**使い、交互配置そのものは章の定義から自前実装します。

滑らかな関数

$$
f(x)=e^x,
\qquad
I=e-1
$$

について、

- 通常の1次元 Sobol 点
- 2次元 Sobol 点を $\alpha=2$ で桁交互配置した点

の誤差次数を比較します。

**穴埋め課題：** 2座標の各2進桁を読み出し、出力整数の奇数・偶数位置へ交互に配置し、誤差の log-log 傾きを求めてください。

```python-lab
# lab-id: NUMLAB5-QMC8-INTERLACING
# lab-title: 桁交互配置による高次収束
# lab-mode: exercise
# timeout-ms: 20000

import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import qmc

def interlace_two_coordinates(points, m):
    scale = 2 ** m
    integers = np.rint(points * scale).astype(np.uint64)
    out = np.zeros(len(points), dtype=np.uint64)

    for r in range(m):
        bit1 = ___
        bit2 = ___

        out |= ___

    return out.astype(float) / (2.0 ** (2 * m))

ms = np.arange(4, 10, dtype=int)
Ns = 2 ** ms

standard_errors = []
interlaced_errors = []
exact = np.e - 1.0

for m in ms:
    standard_points = qmc.Sobol(
        d=1,
        scramble=False,
    ).random_base2(int(m))[:, 0]

    source_points = qmc.Sobol(
        d=2,
        scramble=False,
    ).random_base2(int(m))

    interlaced_points = interlace_two_coordinates(
        source_points,
        int(m),
    )

    standard_errors.append(
        abs(np.exp(standard_points).mean() - exact)
    )
    interlaced_errors.append(
        abs(np.exp(interlaced_points).mean() - exact)
    )

standard_errors = np.array(standard_errors)
interlaced_errors = np.array(interlaced_errors)

standard_rate = ___
interlaced_rate = ___

print("N:", Ns)
print("standard Sobol errors:", standard_errors)
print("interlaced errors:", interlaced_errors)
print("standard observed rate:", standard_rate)
print("interlaced observed rate:", interlaced_rate)

fig, ax = plt.subplots()
ax.loglog(
    Ns,
    standard_errors,
    marker="o",
    label="ordinary 1D Sobol",
)
ax.loglog(
    Ns,
    interlaced_errors,
    marker="s",
    label="digit-interlaced",
)
ax.legend()
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import qmc

def interlace_two_coordinates(points, m):
    scale = 2 ** m
    integers = np.rint(points * scale).astype(np.uint64)
    out = np.zeros(len(points), dtype=np.uint64)

    for r in range(m):
        bit1 = (
            integers[:, 0] >> np.uint64(m - 1 - r)
        ) & np.uint64(1)
        bit2 = (
            integers[:, 1] >> np.uint64(m - 1 - r)
        ) & np.uint64(1)

        out |= bit1 << np.uint64(2 * m - 1 - 2 * r)
        out |= bit2 << np.uint64(2 * m - 2 - 2 * r)

    return out.astype(float) / (2.0 ** (2 * m))

ms = np.arange(4, 10, dtype=int)
Ns = 2 ** ms

standard_errors = []
interlaced_errors = []
exact = np.e - 1.0

for m in ms:
    standard_points = qmc.Sobol(
        d=1,
        scramble=False,
    ).random_base2(int(m))[:, 0]

    source_points = qmc.Sobol(
        d=2,
        scramble=False,
    ).random_base2(int(m))

    interlaced_points = interlace_two_coordinates(
        source_points,
        int(m),
    )

    standard_errors.append(
        abs(np.exp(standard_points).mean() - exact)
    )
    interlaced_errors.append(
        abs(np.exp(interlaced_points).mean() - exact)
    )

standard_errors = np.array(standard_errors)
interlaced_errors = np.array(interlaced_errors)

standard_rate = -np.polyfit(
    np.log2(Ns),
    np.log2(standard_errors),
    1,
)[0]
interlaced_rate = -np.polyfit(
    np.log2(Ns),
    np.log2(interlaced_errors),
    1,
)[0]

print("N:", Ns)
print("standard Sobol errors:", standard_errors)
print("interlaced errors:", interlaced_errors)
print("standard observed rate:", standard_rate)
print("interlaced observed rate:", interlaced_rate)

fig, ax = plt.subplots()
ax.loglog(
    Ns,
    standard_errors,
    marker="o",
    label="ordinary 1D Sobol",
)
ax.loglog(
    Ns,
    interlaced_errors,
    marker="s",
    label="digit-interlaced",
)
ax.legend()
ax.grid(True)
```

```python-test
assert np.all(standard_errors > 0.0)
assert np.all(interlaced_errors > 0.0)
assert 0.9 < standard_rate < 1.1
assert 1.8 < interlaced_rate < 2.2
assert interlaced_errors[-1] < 0.01 * standard_errors[-1]
```

この実験では同じ点数 $N$ に対し、

$$
\text{通常構成}
\approx
N^{-1},
\qquad
\text{桁交互配置}
\approx
N^{-2}
$$

という傾きが現れます。

ただし高次構成だけで任意の関数が二次収束するわけではありません。ここでは $e^x$ という滑らかな関数を使っており、QMC8 の高次 Walsh 減衰条件と対応する状況を数値的に見ています。

---

## 9. 8本の実験を理論へ戻す

| 理論章 | 理論で得た結論 | 実験で測った量 |
|---|---|---|
| QMC1 | 点集合の一様性をスター・ディスクレパンシーで測る | $D_N^\ast$ と $x^2$ の求積誤差 |
| QMC2 | RKHS 単位球上の最悪誤差を核だけで計算できる | midpoint rule の最悪誤差と実測次数 |
| QMC3 | 双対格子周波数だけが格子平均に残る | 複素指数モードの格子平均 |
| QMC4 | 生成行列が $b$ 進箱の点数構造を作る | 幅1/4区間・面積1/4箱の点数 |
| QMC5 | 双対ネット周波数だけが Walsh 平均に残る | Walsh 文字のデジタルネット平均 |
| QMC6 | 多項式格子は Laurent 係数からデジタル生成行列として作れる | canonical 生成行列と4点集合 |
| QMC7 | デジタルシフトは不偏性とネット構造を両立する | 反復平均・分散・標準誤差・第一桁均衡 |
| QMC8 | 桁交互配置で高次デジタル構成を作れる | 通常構成と交互配置後の実測 log-log 傾き |

準 Monte Carlo 法では、

$$
\boxed{
\text{点集合}
\to
\text{双対構造}
\to
\text{関数側の周波数減衰}
\to
\text{誤差}
}
$$

という流れが一貫しています。

---

## 10. Encore V の計算機演習系列の完了

これで

$$
\boxed{
\text{PYNUM1}
\to
\text{NUMLAB0}
\to
\text{NUMLAB1}
\to
\cdots
\to
\text{NUMLAB5}
}
$$

が揃いました。

- PYNUM1：Python / NumPy 数値計算速習
- NUMLAB0：共通ブラウザ実行基盤
- NUMLAB1：数値解析
- NUMLAB2：差分法
- NUMLAB3：FEM 系列の計算機演習
- NUMLAB4：Monte Carlo
- NUMLAB5：準 Monte Carlo

NUMLAB1–NUMLAB5 の各理論対応実験は、すべて穴埋め・模範解答・hidden test・理論 stable anchor の対応を持ちます。
