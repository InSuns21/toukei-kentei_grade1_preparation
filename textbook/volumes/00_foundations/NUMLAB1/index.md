# NUMLAB1 数値解析演習

NUMLAB1 では、NA1–NA12 の理論を **12本のブラウザ実験**へ移します。

この章で新しい数値解析理論を定義することはしません。各実験の出発点は対応する理論章の stable anchor です。理論を先に読み、

```text
理論上の予測
↓
Python 実験
↓
誤差・残差・反復履歴
↓
予測と照合
```

の順に確認します。

Python / NumPy の読み方は PYNUM1、ブラウザ実行・時間制限・自動判定・保存の仕組みは NUMLAB0 を共通基盤とします。

---

## 0. 実験の共通規約

各理論対応ラボは、原則として **穴埋め → 模範解答 → 自動判定** の演習形式で実行します。完成コードを読むだけでなく、理論上の核心式を自分でコードへ翻訳してください。

各ラボでは次を守ります。

1. 理論章の stable anchor を先に示す。
2. 実行コードは `python-lab`、自動判定は直後の `python-test` に置く。
3. 誤差や残差は浮動小数点型で保持する。
4. 数値比較には問題に応じた許容誤差を置く。
5. 図だけで結論を出さず、数値表または自動判定も併用する。
6. 実験結果が理論と違うときは、刻み幅、反復回数、丸め、初期値、安定性条件を順に疑う。

---

<a id="lab-numlab1-na1-cancellation"></a>
## 1. NA1：桁落ちと安定な同値式

理論： [桁落ち](../NA1/index.md#def-na1-cancellation)

数学的には

$$
\sqrt{x+1}-\sqrt{x}
=
\frac{1}{\sqrt{x+1}+\sqrt{x}}
$$

ですが、大きな $x$ では左辺が「近い数どうしの差」になります。

**穴埋め課題：** 安定な有理化式と相対差の定義をコードへ落としてください。

```python-lab
# lab-id: NUMLAB1-NA1-CANCELLATION
# lab-title: 桁落ちを安定な同値式と比較
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

x = np.array([1e4, 1e8, 1e12, 1e16], dtype=float)

unstable = np.sqrt(x + 1.0) - np.sqrt(x)
# ヒント: 桁落ちを避けるため、差を直接引かない代数的に同値な式へ直す。
stable = ___
# ヒント: 不安定な計算結果が安定な基準値からどれだけずれたかを相対量で測る。
relative_gap = ___

for xi, u, s, g in zip(x, unstable, stable, relative_gap):
    print(f"x={xi:.0e}  direct={u:.17e}  stable={s:.17e}  relative gap={g:.3e}")

fig, ax = plt.subplots()
ax.loglog(x, relative_gap, marker="o")
ax.set_xlabel("x")
ax.set_ylabel("relative discrepancy")
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

x = np.array([1e4, 1e8, 1e12, 1e16], dtype=float)

unstable = np.sqrt(x + 1.0) - np.sqrt(x)
stable = 1.0 / (np.sqrt(x + 1.0) + np.sqrt(x))
relative_gap = np.abs(unstable - stable) / stable

for xi, u, s, g in zip(x, unstable, stable, relative_gap):
    print(f"x={xi:.0e}  direct={u:.17e}  stable={s:.17e}  relative gap={g:.3e}")

fig, ax = plt.subplots()
ax.loglog(x, relative_gap, marker="o")
ax.set_xlabel("x")
ax.set_ylabel("relative discrepancy")
ax.grid(True)
```

```python-test
assert np.isfinite(stable).all()
assert np.all(stable > 0.0)
assert relative_gap[-1] > 0.5
assert relative_gap[-1] > relative_gap[0]
```

大きな $x$ で直接差を取る式だけが壊れるなら、問題そのものではなく式の評価方法に原因があると読めます。

---

<a id="lab-numlab1-na2-newton"></a>
## 2. NA2：Newton 法の二次収束

理論： [Newton 法の局所二次収束](../NA2/index.md#thm-na2-newton-quadratic)

$\sqrt2$ を

$$
f(x)=x^2-2
$$

の零点として求めます。

**穴埋め課題：** Newton 更新式と二次収束を測る誤差比を埋めてください。

```python-lab
# lab-id: NUMLAB1-NA2-NEWTON
# lab-title: Newton 法の二次収束を実測
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np

root = np.sqrt(2.0)
x = 1.0
xs = [x]

for _ in range(4):
    # ヒント: Newton 法の一段更新。現在の近似値から次の近似値を作る。
    x = ___
    xs.append(x)

xs = np.array(xs)
errors = np.abs(xs - root)
# ヒント: 二次収束ならほぼ一定になる誤差比を、連続する誤差列から作る。
quadratic_ratio = ___

print("iterates:", xs)
print("errors:", errors)
print("e_(k+1) / e_k^2:", quadratic_ratio)
```

```python-solution
import numpy as np

root = np.sqrt(2.0)
x = 1.0
xs = [x]

for _ in range(4):
    x = x - (x * x - 2.0) / (2.0 * x)
    xs.append(x)

xs = np.array(xs)
errors = np.abs(xs - root)
quadratic_ratio = errors[2:] / errors[1:-1]**2

print("iterates:", xs)
print("errors:", errors)
print("e_(k+1) / e_k^2:", quadratic_ratio)
```

```python-test
assert np.all(errors[1:] < errors[:-1])
assert errors[-1] < 1e-11
assert np.isfinite(quadratic_ratio).all()
assert 0.30 < quadratic_ratio[-1] < 0.40
```

誤差比 $e_{k+1}/e_k^2$ が有限な定数へ近づくことが、二次収束の数値的な指紋です。

---

<a id="lab-numlab1-na3-system-newton"></a>
## 3. NA3：非線形連立方程式の Newton 法

理論： [非線形連立方程式に対する Newton 法](../NA3/index.md#def-na3-system-newton)

円と直線

$$
x^2+y^2=1,
\qquad
x-y=0
$$

の第1象限の交点を求めます。

**穴埋め課題：** Jacobian を使った Newton step と反復更新を埋めてください。

```python-lab
# lab-id: NUMLAB1-NA3-SYSTEM-NEWTON
# lab-title: 2変数 Newton 法
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np

def F(z):
    x, y = z
    return np.array([
        x * x + y * y - 1.0,
        x - y,
    ])

def J(z):
    x, y = z
    return np.array([
        [2.0 * x, 2.0 * y],
        [1.0, -1.0],
    ])

z = np.array([0.8, 0.6], dtype=float)
history = [np.linalg.norm(F(z))]

for _ in range(5):
    # ヒント: Jacobian を係数行列とする Newton 方程式を解き、修正量を求める。
    step = ___
    # ヒント: 求めた修正量を現在のベクトルへ加えて次の反復点に進む。
    z = ___
    history.append(np.linalg.norm(F(z)))

history = np.array(history)

print("root:", z)
print("residual history:", history)
```

```python-solution
import numpy as np

def F(z):
    x, y = z
    return np.array([
        x * x + y * y - 1.0,
        x - y,
    ])

def J(z):
    x, y = z
    return np.array([
        [2.0 * x, 2.0 * y],
        [1.0, -1.0],
    ])

z = np.array([0.8, 0.6], dtype=float)
history = [np.linalg.norm(F(z))]

for _ in range(5):
    step = np.linalg.solve(J(z), -F(z))
    z = z + step
    history.append(np.linalg.norm(F(z)))

history = np.array(history)

print("root:", z)
print("residual history:", history)
```

```python-test
target = np.array([1.0, 1.0]) / np.sqrt(2.0)
assert np.allclose(z, target, atol=1e-12, rtol=1e-12)
assert np.linalg.norm(F(z)) < 1e-12
assert history[-1] < history[0]
```

逆行列を作らず、毎回 `J(z) step = -F(z)` を連立一次方程式として解く点も確認してください。

---

<a id="lab-numlab1-na4-runge"></a>
## 4. NA4：Runge 関数と Chebyshev 節点

理論： [Chebyshev 節点](../NA4/index.md#def-na4-chebyshev-nodes)

$$
f(x)=\frac{1}{1+25x^2}
$$

を20次多項式で補間し、等間隔節点と Chebyshev 節点を比べます。

この実験は、完成コードを読むだけでなく、**節点の作り方と誤差評価を自分で埋める演習**として実行します。

- 等間隔節点を $[-1,1]$ に作る。
- Chebyshev 節点の公式を NumPy で書く。
- 二つの補間の最大誤差を同じ評価格子上で計算する。

「穴埋め」タブの `___` をすべて置き換えてから実行してください。必要なら「模範解答」タブで完成コードを確認できます。

```python-lab
# lab-id: NUMLAB1-NA4-RUNGE
# lab-title: 等間隔節点と Chebyshev 節点を比較
# lab-mode: exercise
# timeout-ms: 10000

import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import BarycentricInterpolator

def runge(x):
    return 1.0 / (1.0 + 25.0 * x * x)

degree = 20
k = np.arange(degree + 1)

# ヒント: 区間 [-1,1] を degree+1 個に等分して補間節点を作る。
equi_nodes = ___
# ヒント: 端点付近へ密になる Chebyshev 節点を、余弦で生成する。
cheb_nodes = ___

equi_interp = BarycentricInterpolator(equi_nodes, runge(equi_nodes))
cheb_interp = BarycentricInterpolator(cheb_nodes, runge(cheb_nodes))

grid = np.linspace(-1.0, 1.0, 2001)
truth = runge(grid)
equi_values = equi_interp(grid)
cheb_values = cheb_interp(grid)

# ヒント: 等間隔節点補間の最大絶対誤差を格子上で測る。
equi_error = ___
# ヒント: Chebyshev 節点補間の最大絶対誤差を同じ格子上で測る。
cheb_error = ___

print("max error, equidistant:", equi_error)
print("max error, Chebyshev:", cheb_error)

fig, ax = plt.subplots()
ax.plot(grid, truth, label="Runge")
ax.plot(grid, equi_values, label="equidistant")
ax.plot(grid, cheb_values, label="Chebyshev")
ax.set_ylim(-1.0, 2.0)
ax.legend()
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import BarycentricInterpolator

def runge(x):
    return 1.0 / (1.0 + 25.0 * x * x)

degree = 20
k = np.arange(degree + 1)

equi_nodes = np.linspace(-1.0, 1.0, degree + 1)
cheb_nodes = np.cos((2 * k + 1) * np.pi / (2 * (degree + 1)))

equi_interp = BarycentricInterpolator(equi_nodes, runge(equi_nodes))
cheb_interp = BarycentricInterpolator(cheb_nodes, runge(cheb_nodes))

grid = np.linspace(-1.0, 1.0, 2001)
truth = runge(grid)
equi_values = equi_interp(grid)
cheb_values = cheb_interp(grid)

equi_error = np.max(np.abs(equi_values - truth))
cheb_error = np.max(np.abs(cheb_values - truth))

print("max error, equidistant:", equi_error)
print("max error, Chebyshev:", cheb_error)

fig, ax = plt.subplots()
ax.plot(grid, truth, label="Runge")
ax.plot(grid, equi_values, label="equidistant")
ax.plot(grid, cheb_values, label="Chebyshev")
ax.set_ylim(-1.0, 2.0)
ax.legend()
ax.grid(True)
```

```python-test
assert np.isfinite(equi_error)
assert np.isfinite(cheb_error)
assert np.allclose(
    equi_nodes,
    np.linspace(-1.0, 1.0, degree + 1),
)
assert np.allclose(
    np.sort(cheb_nodes),
    np.sort(np.cos((2 * k + 1) * np.pi / (2 * (degree + 1)))),
)
assert np.isclose(
    equi_error,
    np.max(np.abs(equi_values - truth)),
)
assert np.isclose(
    cheb_error,
    np.max(np.abs(cheb_values - truth)),
)
assert cheb_error < equi_error
assert cheb_error < 0.1
```

高次数化だけでは十分でなく、節点配置が誤差増幅へ直接効くことを図と最大誤差の両方で確認します。

---

<a id="lab-numlab1-na5-gauss"></a>
## 5. NA5：Gauss--Legendre 求積の誤差減衰

理論： [Gauss 求積公式](../NA5/index.md#def-na5-gauss-quadrature)

$$
\int_0^1 e^x\,dx=e-1
$$

を $n$ 点 Gauss--Legendre 求積で近似します。

**穴埋め課題：** Gauss--Legendre 節点の区間変換と重み付き求積式を埋めてください。

```python-lab
# lab-id: NUMLAB1-NA5-GAUSS
# lab-title: Gauss--Legendre 求積の誤差
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt
from numpy.polynomial.legendre import leggauss

exact = np.e - 1.0
ns = np.arange(2, 6)
errors = []

for n in ns:
    t, w = leggauss(int(n))
    # ヒント: Gauss--Legendre の標準区間 [-1,1] の節点を積分区間 [0,1] へ写す。
    x = ___
    # ヒント: 変数変換の係数を含めて、重み付き関数値和を作る。
    approx = ___
    errors.append(abs(approx - exact))

errors = np.array(errors)

print("n:", ns)
print("errors:", errors)

fig, ax = plt.subplots()
ax.semilogy(ns, errors, marker="o")
ax.set_xlabel("number of points")
ax.set_ylabel("absolute error")
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt
from numpy.polynomial.legendre import leggauss

exact = np.e - 1.0
ns = np.arange(2, 6)
errors = []

for n in ns:
    t, w = leggauss(int(n))
    x = 0.5 * (t + 1.0)
    approx = 0.5 * np.sum(w * np.exp(x))
    errors.append(abs(approx - exact))

errors = np.array(errors)

print("n:", ns)
print("errors:", errors)

fig, ax = plt.subplots()
ax.semilogy(ns, errors, marker="o")
ax.set_xlabel("number of points")
ax.set_ylabel("absolute error")
ax.grid(True)
```

```python-test
assert np.isfinite(errors).all()
assert errors[0] > errors[2] > errors[3]
assert errors[-1] < 1e-10
```

滑らかな関数では、点数を少し増やすだけで誤差が急速に小さくなる様子が見えます。

---

<a id="lab-numlab1-na6-euler"></a>
## 6. NA6：Euler 法の一次収束

理論： [Euler 法の一次収束](../NA6/index.md#cor-na6-euler-convergence)

$$
y'=y,
\qquad
y(0)=1
$$

を $t=1$ まで解きます。

**穴埋め課題：** Euler 法の一段更新と実測収束次数の式を埋めてください。

```python-lab
# lab-id: NUMLAB1-NA6-EULER
# lab-title: Euler 法の一次収束を実測
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

def euler_exp(N):
    h = 1.0 / N
    y = 1.0
    for _ in range(N):
        # ヒント: 陽的 Euler 法の一段更新。現在値と右辺から次の値を作る。
        y = ___
    return y

Ns = np.array([10, 20, 40, 80, 160, 320], dtype=int)
exact = np.e
errors = np.array([abs(euler_exp(int(N)) - exact) for N in Ns], dtype=float)

# ヒント: 格子幅を半分にしたときの誤差比から、実測の log-log 傾きを求める。
orders = ___

print("errors:", errors)
print("observed orders:", orders)

fig, ax = plt.subplots()
ax.loglog(Ns, errors, marker="o")
ax.set_xlabel("N")
ax.set_ylabel("absolute error")
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

def euler_exp(N):
    h = 1.0 / N
    y = 1.0
    for _ in range(N):
        y = y + h * y
    return y

Ns = np.array([10, 20, 40, 80, 160, 320], dtype=int)
exact = np.e
errors = np.array([abs(euler_exp(int(N)) - exact) for N in Ns], dtype=float)

orders = (
    np.log(errors[:-1] / errors[1:])
    / np.log(Ns[1:] / Ns[:-1])
)

print("errors:", errors)
print("observed orders:", orders)

fig, ax = plt.subplots()
ax.loglog(Ns, errors, marker="o")
ax.set_xlabel("N")
ax.set_ylabel("absolute error")
ax.grid(True)
```

```python-test
assert np.all(errors[1:] < errors[:-1])
assert 0.95 < orders[-1] < 1.05
assert np.isfinite(errors).all()
```

実測収束次数が1へ近づけば、理論上の大域一次収束と一致しています。

---

<a id="lab-numlab1-na7-stiff"></a>
## 7. NA7：硬い減衰問題と絶対安定性

理論： [絶対安定領域](../NA7/index.md#def-na7-absolute-stability-region)

$$
y'=-50y,
\qquad
y(0)=1
$$

に刻み幅 $h=0.05$ を使います。

陽的 Euler 法では

$$
1+h\lambda=1-2.5=-1.5
$$

となり、減衰問題なのに数値解が増幅します。

**穴埋め課題：** 陽的 Euler 法と後退 Euler 法の増幅式をそれぞれ埋めてください。

```python-lab
# lab-id: NUMLAB1-NA7-STIFF
# lab-title: 陽的 Euler 法と後退 Euler 法の安定性
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

lam = -50.0
h = 0.05
steps = 20

explicit = np.empty(steps + 1)
backward = np.empty(steps + 1)
explicit[0] = 1.0
backward[0] = 1.0

for k in range(steps):
    # ヒント: 陽的 Euler 法の増幅因子を使って次時刻の値を更新する。
    explicit[k + 1] = ___
    # ヒント: 後退 Euler 法の陰的更新を、この線形問題では閉じた形で書ける。
    backward[k + 1] = ___

t = h * np.arange(steps + 1)
exact = np.exp(lam * t)

print("explicit final:", explicit[-1])
print("backward final:", backward[-1])
print("exact final:", exact[-1])

fig, ax = plt.subplots()
ax.semilogy(t, np.abs(explicit), label="explicit Euler")
ax.semilogy(t, np.abs(backward), label="backward Euler")
ax.semilogy(t, exact, label="exact")
ax.legend()
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

lam = -50.0
h = 0.05
steps = 20

explicit = np.empty(steps + 1)
backward = np.empty(steps + 1)
explicit[0] = 1.0
backward[0] = 1.0

for k in range(steps):
    explicit[k + 1] = (1.0 + h * lam) * explicit[k]
    backward[k + 1] = backward[k] / (1.0 - h * lam)

t = h * np.arange(steps + 1)
exact = np.exp(lam * t)

print("explicit final:", explicit[-1])
print("backward final:", backward[-1])
print("exact final:", exact[-1])

fig, ax = plt.subplots()
ax.semilogy(t, np.abs(explicit), label="explicit Euler")
ax.semilogy(t, np.abs(backward), label="backward Euler")
ax.semilogy(t, exact, label="exact")
ax.legend()
ax.grid(True)
```

```python-test
assert abs(explicit[-1]) > 100.0
assert abs(backward[-1]) < 1e-8
assert abs(backward[-1] - exact[-1]) < abs(explicit[-1] - exact[-1])
```

精度以前に、安定領域へ入っているかどうかが挙動を決める例です。

---

<a id="lab-numlab1-na8-cholesky"></a>
## 8. NA8：Cholesky 分解を再構成して検査する

理論： [Cholesky 分解](../NA8/index.md#def-na8-cholesky-factorization)

実対称正定値三重対角行列を分解し、

$$
A\approx LL^{\mathsf T}
$$

を直接検査します。

**穴埋め課題：** Cholesky 分解と前進・後退代入に対応する線形方程式を埋めてください。

```python-lab
# lab-id: NUMLAB1-NA8-CHOLESKY
# lab-title: Cholesky 分解の再構成誤差
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np

n = 12
A = 2.0 * np.eye(n)
A += -1.0 * np.eye(n, k=1)
A += -1.0 * np.eye(n, k=-1)

# ヒント: 対称正定値行列を下三角因子へ分解する。
L = ___
reconstruction_error = np.linalg.norm(A - L @ L.T, ord=np.inf)

b = np.ones(n)
# ヒント: まず下三角系を解いて中間変数を求める。
y = ___
# ヒント: 続いて転置下三角系を解き、元の連立方程式の解を得る。
x = ___
residual = np.linalg.norm(b - A @ x)

print("reconstruction error:", reconstruction_error)
print("linear-system residual:", residual)
print("min diagonal of L:", np.min(np.diag(L)))
```

```python-solution
import numpy as np

n = 12
A = 2.0 * np.eye(n)
A += -1.0 * np.eye(n, k=1)
A += -1.0 * np.eye(n, k=-1)

L = np.linalg.cholesky(A)
reconstruction_error = np.linalg.norm(A - L @ L.T, ord=np.inf)

b = np.ones(n)
y = np.linalg.solve(L, b)
x = np.linalg.solve(L.T, y)
residual = np.linalg.norm(b - A @ x)

print("reconstruction error:", reconstruction_error)
print("linear-system residual:", residual)
print("min diagonal of L:", np.min(np.diag(L)))
```

```python-test
assert np.allclose(L, np.tril(L))
assert np.all(np.diag(L) > 0.0)
assert reconstruction_error < 1e-12
assert residual < 1e-11
```

因子が得られたことだけでなく、元の行列をどれだけ正確に再構成できるかまで確認します。

---

<a id="lab-numlab1-na9-cg"></a>
## 9. NA9：共役勾配法の残差履歴

理論： [共役勾配法](../NA9/index.md#def-na9-cg)

一次元 Poisson 型の実対称正定値行列に共役勾配法を適用します。

**穴埋め課題：** CG 法の step length、残差更新、探索方向更新を埋めてください。

```python-lab
# lab-id: NUMLAB1-NA9-CG
# lab-title: 共役勾配法の残差履歴
# lab-mode: exercise
# timeout-ms: 8000

import numpy as np
import matplotlib.pyplot as plt

n = 40
A = 2.0 * np.eye(n)
A += -1.0 * np.eye(n, k=1)
A += -1.0 * np.eye(n, k=-1)
b = np.ones(n)

x = np.zeros(n)
r = b - A @ x
p = r.copy()
rr = r @ r
residuals = [np.sqrt(rr)]

for _ in range(n):
    Ap = A @ p
    # ヒント: 現在の探索方向上で残差を最も減らす step length を作る。
    alpha = ___
    # ヒント: step length だけ探索方向へ進んで近似解を更新する。
    x = ___
    # ヒント: 行列ベクトル積を再利用し、更新後の残差を作る。
    r = ___
    rr_new = r @ r
    residuals.append(np.sqrt(rr_new))
    if np.sqrt(rr_new) < 1e-10:
        break
    # ヒント: 新旧残差ノルムから探索方向の混合係数を作る。
    beta = ___
    # ヒント: 新しい残差と前の探索方向を組み合わせ、A-共役な次方向を作る。
    p = ___
    rr = rr_new

residuals = np.array(residuals)
reference = np.linalg.solve(A, b)

print("iterations:", len(residuals) - 1)
print("final residual:", residuals[-1])
print("solution error:", np.linalg.norm(x - reference))

fig, ax = plt.subplots()
ax.semilogy(np.arange(len(residuals)), residuals, marker="o")
ax.set_xlabel("iteration")
ax.set_ylabel("residual norm")
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

n = 40
A = 2.0 * np.eye(n)
A += -1.0 * np.eye(n, k=1)
A += -1.0 * np.eye(n, k=-1)
b = np.ones(n)

x = np.zeros(n)
r = b - A @ x
p = r.copy()
rr = r @ r
residuals = [np.sqrt(rr)]

for _ in range(n):
    Ap = A @ p
    alpha = rr / (p @ Ap)
    x = x + alpha * p
    r = r - alpha * Ap
    rr_new = r @ r
    residuals.append(np.sqrt(rr_new))
    if np.sqrt(rr_new) < 1e-10:
        break
    beta = rr_new / rr
    p = r + beta * p
    rr = rr_new

residuals = np.array(residuals)
reference = np.linalg.solve(A, b)

print("iterations:", len(residuals) - 1)
print("final residual:", residuals[-1])
print("solution error:", np.linalg.norm(x - reference))

fig, ax = plt.subplots()
ax.semilogy(np.arange(len(residuals)), residuals, marker="o")
ax.set_xlabel("iteration")
ax.set_ylabel("residual norm")
ax.grid(True)
```

```python-test
assert len(residuals) - 1 <= n
assert residuals[-1] < 1e-8
assert np.allclose(x, reference, atol=1e-8, rtol=1e-8)
```

有限次元の厳密算術では高々 $n$ 回で終了する構造を、丸め誤差を含む計算でも残差履歴から観察できます。

---

<a id="lab-numlab1-na10-power"></a>
## 10. NA10：冪乗法と固有対残差

理論： [冪乗法](../NA10/index.md#def-na10-power-method)

実対称行列の最大固有値へ向かう反復を、Rayleigh 商と固有対残差で診断します。

**穴埋め課題：** べき乗法の反復、正規化、Rayleigh 商を埋めてください。

```python-lab
# lab-id: NUMLAB1-NA10-POWER
# lab-title: 冪乗法の固有対残差
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

A = np.array([
    [4.0, 1.0, 0.0],
    [1.0, 3.0, 0.0],
    [0.0, 0.0, 1.0],
])

x = np.array([1.0, 1.0, 1.0])
x = x / np.linalg.norm(x)
residuals = []

for _ in range(60):
    # ヒント: 現在ベクトルへ行列を作用させ、支配固有方向を強調する。
    x = ___
    # ヒント: 方向だけを残すため、各反復でベクトルを正規化する。
    x = ___
    # ヒント: 現在ベクトルに対する Rayleigh 商から固有値近似を作る。
    rayleigh = ___
    residuals.append(np.linalg.norm(A @ x - rayleigh * x))

residuals = np.array(residuals)
lambda_max = np.linalg.eigvalsh(A)[-1]

print("Rayleigh quotient:", rayleigh)
print("largest eigenvalue:", lambda_max)
print("eigenpair residual:", residuals[-1])

fig, ax = plt.subplots()
ax.semilogy(np.arange(1, len(residuals) + 1), residuals)
ax.set_xlabel("iteration")
ax.set_ylabel("eigenpair residual")
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

A = np.array([
    [4.0, 1.0, 0.0],
    [1.0, 3.0, 0.0],
    [0.0, 0.0, 1.0],
])

x = np.array([1.0, 1.0, 1.0])
x = x / np.linalg.norm(x)
residuals = []

for _ in range(60):
    x = A @ x
    x = x / np.linalg.norm(x)
    rayleigh = x @ A @ x
    residuals.append(np.linalg.norm(A @ x - rayleigh * x))

residuals = np.array(residuals)
lambda_max = np.linalg.eigvalsh(A)[-1]

print("Rayleigh quotient:", rayleigh)
print("largest eigenvalue:", lambda_max)
print("eigenpair residual:", residuals[-1])

fig, ax = plt.subplots()
ax.semilogy(np.arange(1, len(residuals) + 1), residuals)
ax.set_xlabel("iteration")
ax.set_ylabel("eigenpair residual")
ax.grid(True)
```

```python-test
assert abs(rayleigh - lambda_max) < 1e-10
assert residuals[-1] < 1e-9
assert residuals[-1] < residuals[0]
```

反復ベクトルだけでなく、$Ax-\rho(x)x$ を見ることで近似固有対の品質を直接測れます。

---

<a id="lab-numlab1-na11-pagerank"></a>
## 11. NA11：PageRank の停止誤差評価

理論： [PageRank 反復の停止判定](../NA11/index.md#prop-na11-pagerank-stopping)

反復差だけから、未知の PageRank ベクトルまでの誤差を保証します。

**穴埋め課題：** PageRank の固定点反復と停止誤差上界を埋めてください。

```python-lab
# lab-id: NUMLAB1-NA11-PAGERANK
# lab-title: PageRank の停止判定を実測
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

P = np.array([
    [0.0, 0.0, 1.0],
    [0.5, 0.0, 0.0],
    [0.5, 1.0, 0.0],
])
alpha = 0.85
v = np.ones(3) / 3.0
target_error = 1e-10

x = np.ones(3) / 3.0
differences = []
x_stop = None
bound = None

for _ in range(1000):
    # ヒント: 遷移作用と teleportation を合わせた PageRank の固定点反復を書く。
    x_next = ___
    d = np.linalg.norm(x_next - x, ord=1)
    differences.append(d)

    if d <= (1.0 - alpha) * target_error:
        x_stop = x.copy()
        # ヒント: 停止時の差分から、固定点までの誤差上界を評価する。
        bound = ___
        break

    x = x_next

exact = np.linalg.solve(
    np.eye(3) - alpha * P,
    (1.0 - alpha) * v,
)
actual_error = np.linalg.norm(x_stop - exact, ord=1)

print("iterations:", len(differences))
print("guaranteed bound:", bound)
print("actual error:", actual_error)
print("PageRank:", x_stop)

fig, ax = plt.subplots()
ax.semilogy(np.arange(1, len(differences) + 1), differences)
ax.set_xlabel("iteration")
ax.set_ylabel("successive difference")
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

P = np.array([
    [0.0, 0.0, 1.0],
    [0.5, 0.0, 0.0],
    [0.5, 1.0, 0.0],
])
alpha = 0.85
v = np.ones(3) / 3.0
target_error = 1e-10

x = np.ones(3) / 3.0
differences = []
x_stop = None
bound = None

for _ in range(1000):
    x_next = alpha * (P @ x) + (1.0 - alpha) * v
    d = np.linalg.norm(x_next - x, ord=1)
    differences.append(d)

    if d <= (1.0 - alpha) * target_error:
        x_stop = x.copy()
        bound = d / (1.0 - alpha)
        break

    x = x_next

exact = np.linalg.solve(
    np.eye(3) - alpha * P,
    (1.0 - alpha) * v,
)
actual_error = np.linalg.norm(x_stop - exact, ord=1)

print("iterations:", len(differences))
print("guaranteed bound:", bound)
print("actual error:", actual_error)
print("PageRank:", x_stop)

fig, ax = plt.subplots()
ax.semilogy(np.arange(1, len(differences) + 1), differences)
ax.set_xlabel("iteration")
ax.set_ylabel("successive difference")
ax.grid(True)
```

```python-test
assert x_stop is not None
assert np.all(x_stop > 0.0)
assert abs(np.sum(x_stop) - 1.0) < 1e-12
assert actual_error <= bound * (1.0 + 1e-10)
assert bound <= target_error
```

真値は自動確認のためにだけ線形方程式で求めています。実際の停止条件は、反復中に計算できる差 $d_k$ だけで判定しています。

---

<a id="lab-numlab1-na12-optimization"></a>
## 12. NA12：最急降下法と共役勾配法

理論： [共役勾配法による二次関数最小化](../NA12/index.md#thm-na12-cg-quadratic-minimization)

実対称正定値二次関数

$$
\phi(x)
=
\frac12 x^{\mathsf T}Ax-b^{\mathsf T}x
$$

で、最急降下法の条件数依存と共役勾配法の有限次元構造を並べて見ます。

**穴埋め課題：** 最急降下法の厳密直線探索と CG の更新係数を埋めてください。

```python-lab
# lab-id: NUMLAB1-NA12-OPTIMIZATION
# lab-title: 最急降下法と共役勾配法を比較
# lab-mode: exercise
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

A = np.diag([1.0, 100.0])
b = np.array([1.0, 1.0])
solution = np.linalg.solve(A, b)

x_sd = np.zeros(2)
sd_errors = [np.linalg.norm(x_sd - solution)]

for _ in range(40):
    r = b - A @ x_sd
    # ヒント: 最急降下法の探索方向上で二次関数を最小にする厳密 step length を作る。
    step = ___
    x_sd = x_sd + step * r
    sd_errors.append(np.linalg.norm(x_sd - solution))

x_cg = np.zeros(2)
r = b - A @ x_cg
p = r.copy()
rr = r @ r
cg_errors = [np.linalg.norm(x_cg - solution)]

for _ in range(2):
    Ap = A @ p
    # ヒント: CG 法で現在の探索方向に沿って進む step length を作る。
    alpha = ___
    x_cg = x_cg + alpha * p
    r = r - alpha * Ap
    cg_errors.append(np.linalg.norm(x_cg - solution))
    rr_new = r @ r
    if np.sqrt(rr_new) < 1e-14:
        break
    # ヒント: 新旧残差から次の探索方向を作る混合係数を計算する。
    beta = ___
    # ヒント: 新しい残差へ前の探索方向成分を加え、次の共役方向を作る。
    p = ___
    rr = rr_new

sd_errors = np.array(sd_errors)
cg_errors = np.array(cg_errors)

print("steepest descent final error:", sd_errors[-1])
print("CG final error:", cg_errors[-1])
print("CG iterations:", len(cg_errors) - 1)

fig, ax = plt.subplots()
ax.semilogy(np.arange(len(sd_errors)), sd_errors, label="steepest descent")
ax.semilogy(np.arange(len(cg_errors)), cg_errors, marker="o", label="CG")
ax.set_xlabel("iteration")
ax.set_ylabel("solution error")
ax.legend()
ax.grid(True)
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

A = np.diag([1.0, 100.0])
b = np.array([1.0, 1.0])
solution = np.linalg.solve(A, b)

x_sd = np.zeros(2)
sd_errors = [np.linalg.norm(x_sd - solution)]

for _ in range(40):
    r = b - A @ x_sd
    step = (r @ r) / (r @ A @ r)
    x_sd = x_sd + step * r
    sd_errors.append(np.linalg.norm(x_sd - solution))

x_cg = np.zeros(2)
r = b - A @ x_cg
p = r.copy()
rr = r @ r
cg_errors = [np.linalg.norm(x_cg - solution)]

for _ in range(2):
    Ap = A @ p
    alpha = rr / (p @ Ap)
    x_cg = x_cg + alpha * p
    r = r - alpha * Ap
    cg_errors.append(np.linalg.norm(x_cg - solution))
    rr_new = r @ r
    if np.sqrt(rr_new) < 1e-14:
        break
    beta = rr_new / rr
    p = r + beta * p
    rr = rr_new

sd_errors = np.array(sd_errors)
cg_errors = np.array(cg_errors)

print("steepest descent final error:", sd_errors[-1])
print("CG final error:", cg_errors[-1])
print("CG iterations:", len(cg_errors) - 1)

fig, ax = plt.subplots()
ax.semilogy(np.arange(len(sd_errors)), sd_errors, label="steepest descent")
ax.semilogy(np.arange(len(cg_errors)), cg_errors, marker="o", label="CG")
ax.set_xlabel("iteration")
ax.set_ylabel("solution error")
ax.legend()
ax.grid(True)
```

```python-test
assert sd_errors[-1] < sd_errors[0]
assert len(cg_errors) - 1 <= 2
assert cg_errors[-1] < 1e-12
assert cg_errors[-1] < sd_errors[-1]
```

2次元なら共役勾配法は厳密算術で高々2回です。一方、条件数100の最急降下法は細長い等高線上をジグザグし、同じ速度では進みません。

---

## 13. 12本をどう読み返すか

実験結果を「動いた」で終わらせず、次の対応を読み返してください。

| 理論 | 実験で観察した量 |
|---|---|
| NA1 | 数学的に同値な式の相対的な食い違い |
| NA2 | Newton 誤差と $e_{k+1}/e_k^2$ |
| NA3 | 非線形残差ノルム |
| NA4 | 最大補間誤差 |
| NA5 | Gauss--Legendre 求積誤差 |
| NA6 | Euler 法の実測収束次数 |
| NA7 | 減衰問題に対する数値解の増幅・減衰 |
| NA8 | $A-LL^{\mathsf T}$ の再構成誤差 |
| NA9 | 共役勾配法の残差履歴 |
| NA10 | 固有対残差 |
| NA11 | 反復差から得る停止誤差上界 |
| NA12 | 最急降下法と共役勾配法の誤差履歴 |

共通しているのは、**理論で保証された量を、その量に対応する診断値で測る**ことです。

---

## 14. 次へ

NA1–NA12 のブラウザ実験が揃いました。

次は **NUMLAB2「差分法演習」** です。FDM1–FDM4 の空間離散化・時間発展・安定性を、格子幅と時間刻みを実際に変えながら確認します。
