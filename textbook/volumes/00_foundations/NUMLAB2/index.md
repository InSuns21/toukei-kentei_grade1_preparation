# NUMLAB2 差分法演習

NUMLAB2 では、FDM1–FDM4 の理論を **4本のブラウザ実験**へ移します。

差分法では、式を導出できるだけでなく、

- 時間刻みを変えたときに何が壊れるか
- 格子を細かくしたとき誤差がどの速さで減るか
- 安定化がどの振動を抑えるか

を実際に見ることが重要です。

この章では新しい差分法理論を追加しません。理論章の stable anchor を出発点とし、

```text
差分スキーム
↓
ブラウザ内 Python で時間発展・線形方程式を計算
↓
誤差・最大値・振動を測る
↓
安定性・収束性の理論と照合
```

という順で確認します。

Python / NumPy の共通記法は PYNUM1、実行基盤は NUMLAB0 を使います。

---

## 0. 実験の共通規約

1. 空間格子幅を $h$、時間刻みを $\tau$ と書く。
2. 熱方程式では
   $$
   r=\frac{\kappa\tau}{h^2}
   $$
   を毎回計算し、安定性条件との位置関係を確認する。
3. Dirichlet 境界値は内部未知量と分離し、境界を毎ステップ明示的に保持する。
4. 数値解の「見た目」だけでなく、最大誤差・最大ノルム・単調性などを数値として検査する。
5. 格子細分化実験では、空間誤差と時間誤差のどちらが支配するかを意識して $\tau$ と $h$ の関係を決める。
6. 自動判定は理論から期待される不変条件・収束次数・安定性を直接検査する。

---

<a id="lab-numlab2-fdm1-heat-schemes"></a>
## 1. FDM1：同じ空間離散化から FTCS と後退 Euler を作る

理論： [空間半離散系と Euler 法による二つの差分スキームの対応](../FDM1/index.md#prop-fdm1-semidiscrete-euler)

熱方程式

$$
u_t=u_{xx},
\qquad
0<x<1,
$$

に斉次 Dirichlet 境界条件

$$
u(t,0)=u(t,1)=0
$$

と初期値

$$
u(0,x)=\sin(\pi x)
$$

を与えます。

厳密解は

$$
u(t,x)=e^{-\pi^2t}\sin(\pi x)
$$

です。

FTCS は空間半離散系へ前進 Euler 法を、後退 Euler 差分法は後退 Euler 法を適用したものとして比較できます。

```python-lab
# lab-id: NUMLAB2-FDM1-HEAT-SCHEMES
# lab-title: FTCS と後退 Euler 差分法を同じ格子で比較
# timeout-ms: 12000

import numpy as np
import matplotlib.pyplot as plt

kappa = 1.0
J = 30
h = 1.0 / J
r = 0.4
tau = r * h * h / kappa
steps = 45
T = steps * tau

x = np.linspace(0.0, 1.0, J + 1)
u0 = np.sin(np.pi * x)

# FTCS
u_ftcs = u0.copy()
for _ in range(steps):
    old = u_ftcs.copy()
    u_ftcs[1:-1] = old[1:-1] + r * (
        old[2:] - 2.0 * old[1:-1] + old[:-2]
    )
    u_ftcs[0] = 0.0
    u_ftcs[-1] = 0.0

# 後退 Euler 差分法
n = J - 1
A = (1.0 + 2.0 * r) * np.eye(n)
A += -r * np.eye(n, k=1)
A += -r * np.eye(n, k=-1)

u_be = u0.copy()
for _ in range(steps):
    u_be[1:-1] = np.linalg.solve(A, u_be[1:-1])
    u_be[0] = 0.0
    u_be[-1] = 0.0

exact = np.exp(-np.pi**2 * T) * np.sin(np.pi * x)
ftcs_error = np.max(np.abs(u_ftcs - exact))
be_error = np.max(np.abs(u_be - exact))

print("h:", h)
print("tau:", tau)
print("r:", r)
print("T:", T)
print("FTCS max error:", ftcs_error)
print("backward Euler max error:", be_error)

fig, ax = plt.subplots()
ax.plot(x, exact, label="exact")
ax.plot(x, u_ftcs, marker="o", markevery=3, label="FTCS")
ax.plot(x, u_be, marker="s", markevery=3, label="backward Euler")
ax.set_xlabel("x")
ax.set_ylabel("u(T, x)")
ax.legend()
ax.grid(True)
```

```python-test
assert 0.0 < r <= 0.5
assert np.all(np.isfinite(u_ftcs))
assert np.all(np.isfinite(u_be))
assert u_ftcs[0] == 0.0 and u_ftcs[-1] == 0.0
assert u_be[0] == 0.0 and u_be[-1] == 0.0
assert ftcs_error < 2e-3
assert be_error < 3e-3
```

二つの方法は同じ離散 Laplacian を使いますが、時間積分法が異なります。

FTCS では現在時刻の値から次時刻を直接作り、後退 Euler 差分法では各ステップで線形方程式を解きます。FDM1 の「陽解法・陰解法」の違いが、そのままコード構造へ現れています。

---

<a id="lab-numlab2-fdm2-cfl"></a>
## 2. FDM2：CFL 条件を破ると高周波モードが増幅する

理論： [FTCS の von Neumann 型安定性](../FDM2/index.md#thm-fdm2-ftcs-stability)

周期格子上の交互振動モード

$$
U_j^0=(-1)^j
$$

は最も高周波な Fourier モードです。

FTCS の増幅因子は

$$
G(\xi)=1-4r\sin^2\frac{\xi}{2}
$$

なので、$\xi=\pi$ では

$$
G(\pi)=1-4r.
$$

$r=0.4$ なら $|G|=0.6<1$、$r=0.6$ なら $|G|=1.4>1$ です。

```python-lab
# lab-id: NUMLAB2-FDM2-CFL
# lab-title: CFL 条件の成立・破綻を交互振動モードで比較
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

J = 64
j = np.arange(J)
mode = (-1.0) ** j

def evolve_ftcs(u0, r, steps):
    u = u0.copy()
    norms = [np.max(np.abs(u))]

    for _ in range(steps):
        u = u + r * (
            np.roll(u, -1)
            - 2.0 * u
            + np.roll(u, 1)
        )
        norms.append(np.max(np.abs(u)))

    return u, np.array(norms)

steps = 12
stable_r = 0.4
unstable_r = 0.6

u_stable, stable_norms = evolve_ftcs(mode, stable_r, steps)
u_unstable, unstable_norms = evolve_ftcs(mode, unstable_r, steps)

stable_factor = 1.0 - 4.0 * stable_r
unstable_factor = 1.0 - 4.0 * unstable_r

print("stable amplification factor:", stable_factor)
print("unstable amplification factor:", unstable_factor)
print("stable final max norm:", stable_norms[-1])
print("unstable final max norm:", unstable_norms[-1])

fig, ax = plt.subplots()
ax.semilogy(np.arange(steps + 1), stable_norms, marker="o", label="r=0.4")
ax.semilogy(np.arange(steps + 1), unstable_norms, marker="s", label="r=0.6")
ax.set_xlabel("time step")
ax.set_ylabel("max norm")
ax.legend()
ax.grid(True)
```

```python-test
assert abs(stable_factor) < 1.0
assert abs(unstable_factor) > 1.0
assert np.allclose(stable_norms[1:] / stable_norms[:-1], abs(stable_factor))
assert np.allclose(unstable_norms[1:] / unstable_norms[:-1], abs(unstable_factor))
assert stable_norms[-1] < stable_norms[0]
assert unstable_norms[-1] > 10.0 * unstable_norms[0]
```

連続の熱方程式は高周波を強く減衰させます。

ところが $r>1/2$ では、差分法が最も細かい格子振動を逆に増幅します。これは「少し精度が悪くなる」のではなく、連続問題とは反対の時間発展を離散系が作る失敗です。

---

<a id="lab-numlab2-fdm3-convergence"></a>
## 3. FDM3：安定性条件の下で格子収束次数を測る

理論： [FTCS の最大ノルム収束](../FDM3/index.md#thm-fdm3-ftcs-convergence)

FDM3 では、十分滑らかな解に対し

$$
\|e\|_\infty
=
O(\tau+h^2)
$$

を導きました。

そこで

$$
\tau=0.4h^2
$$

と結び付ければ、

$$
\tau+h^2=O(h^2)
$$

なので、格子幅 $h$ を半分にしたとき誤差はおよそ $1/4$ になるはずです。

```python-lab
# lab-id: NUMLAB2-FDM3-CONVERGENCE
# lab-title: FTCS の二次格子収束を実測
# timeout-ms: 12000

import math
import numpy as np
import matplotlib.pyplot as plt

kappa = 1.0
T = 0.02
target_r = 0.4

def ftcs_error(J):
    h = 1.0 / J

    max_tau = target_r * h * h / kappa
    steps = math.ceil(T / max_tau)
    tau = T / steps
    r = kappa * tau / (h * h)

    x = np.linspace(0.0, 1.0, J + 1)
    u = np.sin(np.pi * x)

    for _ in range(steps):
        old = u.copy()
        u[1:-1] = old[1:-1] + r * (
            old[2:] - 2.0 * old[1:-1] + old[:-2]
        )
        u[0] = 0.0
        u[-1] = 0.0

    exact = np.exp(-np.pi**2 * T) * np.sin(np.pi * x)
    error = np.max(np.abs(u - exact))

    return error, r, steps

Js = np.array([20, 40, 80, 160], dtype=int)
errors = np.empty(Js.shape, dtype=float)
rs = np.empty(Js.shape, dtype=float)
steps_used = np.empty(Js.shape, dtype=int)

for i, J in enumerate(Js):
    errors[i], rs[i], steps_used[i] = ftcs_error(int(J))

orders = (
    np.log(errors[:-1] / errors[1:])
    / np.log(Js[1:] / Js[:-1])
)

print("J:", Js)
print("r:", rs)
print("steps:", steps_used)
print("errors:", errors)
print("observed orders:", orders)

fig, ax = plt.subplots()
ax.loglog(Js, errors, marker="o", label="FTCS error")
ax.loglog(Js, errors[0] * (Js[0] / Js) ** 2, linestyle="--", label="J^-2 reference")
ax.set_xlabel("J")
ax.set_ylabel("max error")
ax.legend()
ax.grid(True)
```

```python-test
assert np.all(rs <= 0.5)
assert np.all(errors[1:] < errors[:-1])
assert np.isfinite(errors).all()
assert np.all((orders > 1.9) & (orders < 2.1))
assert errors[-1] < 1e-5
```

ここで観察している次数2は、FTCS が時間について二次精度になったという意味ではありません。

時間誤差は $O(\tau)$ ですが、$\tau$ 自体を $O(h^2)$ に選んだため、

$$
O(\tau)+O(h^2)=O(h^2)
$$

となっています。空間・時間の二つの誤差尺度を同時に管理して初めて、格子収束次数を正しく読めます。

---

<a id="lab-numlab2-fdm4-upwind"></a>
## 4. FDM4：移流卓越時の中心差分振動と風上化

理論： [移流卓越時の中心差分解の交互振動](../FDM4/index.md#prop-fdm4-centered-oscillation) / [風上差分型移流拡散スキーム](../FDM4/index.md#def-fdm4-upwind-scheme)

定常移流拡散問題

$$
-\kappa u''+a u'=0,
\qquad
u(0)=0,
\qquad
u(1)=1
$$

を考えます。

$a>0$ とし、

$$
\kappa=0.025,
\qquad
a=1,
\qquad
J=10
$$

とすると、

$$
h=0.1,
\qquad
Pe_h=\frac{ah}{2\kappa}=2>1.
$$

中心差分では係数の符号構造が崩れ、交互振動が現れます。

```python-lab
# lab-id: NUMLAB2-FDM4-UPWIND
# lab-title: 中心差分の振動と風上差分の単調性
# timeout-ms: 8000

import numpy as np
import matplotlib.pyplot as plt

kappa = 0.025
a = 1.0
J = 10
h = 1.0 / J
Pe_h = abs(a) * h / (2.0 * kappa)

x = np.linspace(0.0, 1.0, J + 1)

def solve_scheme(kind):
    n = J - 1
    A = np.zeros((n, n))
    b = np.zeros(n)

    if kind == "centered":
        left = -kappa / h**2 - a / (2.0 * h)
        diag = 2.0 * kappa / h**2
        right = -kappa / h**2 + a / (2.0 * h)
    elif kind == "upwind":
        left = -kappa / h**2 - a / h
        diag = 2.0 * kappa / h**2 + a / h
        right = -kappa / h**2
    else:
        raise ValueError("unknown scheme")

    for row in range(n):
        A[row, row] = diag

        if row > 0:
            A[row, row - 1] = left

        if row < n - 1:
            A[row, row + 1] = right
        else:
            b[row] -= right * 1.0

    interior = np.linalg.solve(A, b)
    return np.concatenate(([0.0], interior, [1.0]))

centered = solve_scheme("centered")
upwind = solve_scheme("upwind")

physical_peclet = a / kappa
exact = (
    np.exp(physical_peclet * x) - 1.0
) / (
    np.exp(physical_peclet) - 1.0
)

centered_error = np.max(np.abs(centered - exact))
upwind_error = np.max(np.abs(upwind - exact))

print("grid Peclet number:", Pe_h)
print("centered:", centered)
print("upwind:", upwind)
print("centered max error:", centered_error)
print("upwind max error:", upwind_error)

fig, ax = plt.subplots()
ax.plot(x, exact, label="exact")
ax.plot(x, centered, marker="o", label="centered")
ax.plot(x, upwind, marker="s", label="upwind")
ax.set_xlabel("x")
ax.set_ylabel("u")
ax.legend()
ax.grid(True)
```

```python-test
assert Pe_h > 1.0
assert np.min(centered) < -0.1
assert np.any(np.diff(centered) < 0.0)
assert np.all(upwind >= -1e-14)
assert np.all(upwind <= 1.0 + 1e-14)
assert np.all(np.diff(upwind) >= -1e-14)
assert upwind_error < centered_error
```

風上差分は中心差分より低次ですが、この格子では非物理的な交互振動を抑えます。

その代わり、風上化は理論で導いた

$$
\frac{|a|h}{2}
$$

に対応する数値拡散を持ち、境界層を実際より厚く見せます。

したがって、

$$
\boxed{
\text{振動を抑える}
\neq
\text{誤差が消える}
}
$$

です。

安定化は精度との交換条件を持つことを、中心差分・風上差分・厳密解の3本を同じ図に重ねて確認できます。

---

## 5. 4本の実験を理論へ戻す

| 理論章 | 理論で得た結論 | 実験で測った量 |
|---|---|---|
| FDM1 | 同じ空間半離散系から陽・陰時間離散を作れる | FTCS と後退 Euler の数値解・最大誤差 |
| FDM2 | FTCS は $r\le1/2$ で安定 | 高周波モードの一段増幅率と最大ノルム |
| FDM3 | 安定性 + 整合性から $O(\tau+h^2)$ 収束 | $\tau\propto h^2$ での実測格子収束次数 |
| FDM4 | $Pe_h>1$ で中心差分は振動し得る。風上差分は単調性を回復する | 離散解の符号・単調性・最大誤差 |

差分法では、単に「解が出た」ことを成功条件にしません。

- 高周波が増幅していないか
- 格子を細かくすると理論どおり誤差が減るか
- 離散最大値原理に対応する範囲・単調性が保たれているか

まで診断して初めて、理論と計算が接続します。

---

## 6. 次へ

FDM1–FDM4 のブラウザ実験が揃いました。

次は **NUMLAB3「有限要素法演習」** です。

FEM1–FEM7 の変分形式、有限要素空間、補間誤差、楕円型誤差評価、鞍点問題、放物型問題、移流拡散安定化を、メッシュと数値解を実際に動かしながら確認します。
