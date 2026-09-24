# NUMLAB3 有限要素法演習

NUMLAB3 では、FEM1–FEM7 の理論を **7本のブラウザ実験**へ移します。

有限要素法では、変分形式を書けることと、実際に

- 基底関数から行列を組み立てる
- メッシュ形状が補間誤差へどう現れるかを見る
- 理論上の収束次数を数値で測る
- 混合問題の安定性を行列から診断する
- 時間発展で離散エネルギーを追う
- 移流卓越時の振動と安定化を比較する

ことが同じくらい重要です。

この章では新しい有限要素理論を追加しません。各実験は FEM1–FEM7 の stable anchor を出発点とし、

```text
変分形式・有限要素理論
↓
局所行列・大域行列・時間発展を Python で構成
↓
誤差・固有値・残差・エネルギーを測定
↓
理論上の保証と照合
```

の順に確認します。

Python / NumPy の共通記法は PYNUM1、ブラウザ実行基盤は NUMLAB0 を使います。

---

## 0. 実験の共通規約

1. 行列は「作れた」だけで終わらず、対称性・正定値性・残差など理論に対応する量を検査する。
2. 局所要素計算と大域組立てを分ける。
3. メッシュ幅を変える実験では、何を固定し何を細分化したかを明記する。
4. 誤差次数を読むときは、$L^2$ 誤差と $H^1$ 半ノルム誤差を区別する。
5. 混合問題では、連立方程式が解けたことだけでなく Schur 補行列や制約行列の rank も確認する。
6. 時間発展では、解の値だけでなく離散エネルギー履歴も記録する。
7. 安定化では「振動が消えた」ことと「精度が上がった」ことを混同しない。

---

<a id="lab-numlab3-fem1-galerkin"></a>
## 1. FEM1：Galerkin 行列と残差直交性

理論： [Galerkin 方程式の行列表現](../FEM1/index.md#prop-fem1-basis-system) / [Galerkin 直交性](../FEM1/index.md#thm-fem1-galerkin-orthogonality)

一次元 Poisson 問題

$$
-u''=\pi^2\sin(\pi x),
\qquad
u(0)=u(1)=0
$$

を考えます。

厳密解は $u(x)=\sin(\pi x)$ です。

試行空間を

$$
V_h
=
\operatorname{span}
\{
\phi_1,\phi_2
\}
$$

とし、

$$
\phi_1(x)=x(1-x),
\qquad
\phi_2(x)=x(1-x)(2x-1)
$$

を使います。

```python-lab
# lab-id: NUMLAB3-FEM1-GALERKIN
# lab-title: Galerkin 行列と残差直交性
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

q, w = np.polynomial.legendre.leggauss(12)
xq = 0.5 * (q + 1.0)
wq = 0.5 * w

def phi1(x):
    return x * (1.0 - x)

def dphi1(x):
    return 1.0 - 2.0 * x

def phi2(x):
    return x * (1.0 - x) * (2.0 * x - 1.0)

def dphi2(x):
    return -6.0 * x * x + 6.0 * x - 1.0

phi = [phi1, phi2]
dphi = [dphi1, dphi2]

K = np.array([
    [
        np.sum(wq * dphi[i](xq) * dphi[j](xq))
        for j in range(2)
    ]
    for i in range(2)
])

f = np.pi**2 * np.sin(np.pi * xq)
F = np.array([
    np.sum(wq * f * phi[i](xq))
    for i in range(2)
])

coef = np.linalg.solve(K, F)
residual = K @ coef - F
eigenvalues = np.linalg.eigvalsh(K)

grid = np.linspace(0.0, 1.0, 401)
uh = coef[0] * phi1(grid) + coef[1] * phi2(grid)
exact = np.sin(np.pi * grid)

print("K =")
print(K)
print("coefficients:", coef)
print("eigenvalues:", eigenvalues)
print("Galerkin residual:", residual)
print("max nodal-curve error:", np.max(np.abs(uh - exact)))

fig, ax = plt.subplots()
ax.plot(grid, exact, label="exact")
ax.plot(grid, uh, label="Galerkin")
ax.set_xlabel("x")
ax.set_ylabel("u")
ax.legend()
ax.grid(True)
```

```python-test
assert np.allclose(K, K.T, atol=1e-13)
assert np.all(eigenvalues > 0.0)
assert np.linalg.norm(residual) < 1e-12
assert abs(coef[1]) < 1e-12
assert np.max(np.abs(uh - exact)) < 0.06
```

残差 $Kc-F$ がほぼ0になることは、各基底関数を試験関数にした Galerkin 方程式を満たしていることそのものです。

また、剛性行列の固有値が正であることは、この有限次元空間上でエネルギーが退化していないことを表します。

---

<a id="lab-numlab3-fem2-assembly"></a>
## 2. FEM2：局所剛性行列から大域行列を組み立てる

理論： [Poisson の局所剛性行列と局所荷重ベクトル](../FEM2/index.md#def-fem2-local-stiffness) / [局所組立てと疎性](../FEM2/index.md#prop-fem2-assembly-sparsity)

単位正方形の四隅と中心点

$$
(0,0),\ (1,0),\ (1,1),\ (0,1),\ (1/2,1/2)
$$

を使い、中心点から四隅へ線を引いて4三角形に分割します。

各三角形上で一次節点基底の勾配を求め、

$$
K_{ij}^{(T)}
=
\int_T
\nabla\phi_i\cdot\nabla\phi_j\,dx
$$

を組み立てます。

```python-lab
# lab-id: NUMLAB3-FEM2-ASSEMBLY
# lab-title: 三角形 P1 要素の局所・大域組立て
# timeout-ms: 5000

import numpy as np

nodes = np.array([
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
    [0.5, 0.5],
])

triangles = np.array([
    [0, 1, 4],
    [1, 2, 4],
    [2, 3, 4],
    [3, 0, 4],
], dtype=int)

def local_stiffness(coords):
    x = coords[:, 0]
    y = coords[:, 1]

    interpolation_matrix = np.array([
        [1.0, x[0], y[0]],
        [1.0, x[1], y[1]],
        [1.0, x[2], y[2]],
    ])

    coefficients = np.linalg.inv(interpolation_matrix)
    gradients = coefficients[1:, :].T

    edge_matrix = np.array([
        [x[1] - x[0], y[1] - y[0]],
        [x[2] - x[0], y[2] - y[0]],
    ])
    area = 0.5 * abs(np.linalg.det(edge_matrix))

    Ke = area * (gradients @ gradients.T)
    Fe = np.full(3, area / 3.0)

    return Ke, Fe, area

K = np.zeros((len(nodes), len(nodes)))
F = np.zeros(len(nodes))

local_matrices = []

for tri in triangles:
    Ke, Fe, area = local_stiffness(nodes[tri])
    local_matrices.append(Ke)

    for a, i in enumerate(tri):
        F[i] += Fe[a]
        for b, j in enumerate(tri):
            K[i, j] += Ke[a, b]

boundary = np.array([0, 1, 2, 3])
interior = np.array([4])

Kii = K[np.ix_(interior, interior)]
Fi = F[interior]
u_center = np.linalg.solve(Kii, Fi)

print("first local stiffness =")
print(local_matrices[0])
print("global stiffness =")
print(K)
print("global load =", F)
print("center value =", u_center[0])
```

```python-test
reference_local = np.array([
    [1.0, -0.5, -0.5],
    [-0.5, 0.5, 0.0],
    [-0.5, 0.0, 0.5],
])

assert np.allclose(local_matrices[0], reference_local)
assert np.allclose(K, K.T)
assert np.allclose(K.sum(axis=1), 0.0)
assert np.isclose(K[4, 4], 4.0)
assert np.isclose(F[4], 1.0 / 3.0)
assert np.isclose(u_center[0], 1.0 / 12.0)
```

大域行列の非零成分は、同じ三角形を共有する節点同士にだけ現れます。

「局所基底の局所台」が、そのまま大域剛性行列の疎な結合構造になります。

---

<a id="lab-numlab3-fem3-shape-regularity"></a>
## 3. FEM3：つぶれた三角形で補間勾配が増幅する

理論： [要素形状比と形状正則なメッシュ族](../FEM3/index.md#def-fem3-shape-regularity)

三角形

$$
T_\varepsilon
=
\operatorname{conv}
\{
(0,0),(1,0),(1/2,\varepsilon)
\}
$$

上で

$$
u(x,y)=x^2
$$

を頂点補間します。

補間関数を

$$
I_Tu(x,y)=ax+by+c
$$

とすると、頂点値から

$$
a=1,
\qquad
b=-\frac{1}{4\varepsilon}
$$

が得られます。

つまり $\varepsilon\to0$ で、元の関数には存在しない大きな $y$ 方向勾配が補間関数に生じます。

```python-lab
# lab-id: NUMLAB3-FEM3-SHAPE
# lab-title: つぶれた三角形の補間勾配増幅
# timeout-ms: 5000

import numpy as np
import matplotlib.pyplot as plt

epsilons = np.array([0.5, 0.25, 0.125, 0.0625, 0.03125])
shape_ratios = []
spurious_gradients = []

for eps in epsilons:
    vertices = np.array([
        [0.0, 0.0],
        [1.0, 0.0],
        [0.5, eps],
    ])

    values = vertices[:, 0] ** 2

    interpolation_matrix = np.column_stack([
        np.ones(3),
        vertices[:, 0],
        vertices[:, 1],
    ])

    c, a, b = np.linalg.solve(interpolation_matrix, values)

    edge_lengths = np.array([
        np.linalg.norm(vertices[1] - vertices[0]),
        np.linalg.norm(vertices[2] - vertices[1]),
        np.linalg.norm(vertices[0] - vertices[2]),
    ])

    area = 0.5 * eps
    inradius = 2.0 * area / np.sum(edge_lengths)
    diameter = np.max(edge_lengths)

    shape_ratios.append(diameter / inradius)
    spurious_gradients.append(abs(b))

shape_ratios = np.array(shape_ratios)
spurious_gradients = np.array(spurious_gradients)

print("epsilon:", epsilons)
print("shape ratio h/rho:", shape_ratios)
print("|d(Iu)/dy|:", spurious_gradients)

fig, ax = plt.subplots()
ax.loglog(shape_ratios, spurious_gradients, marker="o")
ax.set_xlabel("shape ratio h_K / rho_K")
ax.set_ylabel("spurious y-gradient")
ax.grid(True)
```

```python-test
assert np.all(shape_ratios[1:] > shape_ratios[:-1])
assert np.all(spurious_gradients[1:] > spurious_gradients[:-1])
assert np.allclose(
    spurious_gradients,
    1.0 / (4.0 * epsilons),
)
assert np.allclose(
    spurious_gradients[1:] / spurious_gradients[:-1],
    2.0,
)
```

メッシュ幅だけを小さくしても、要素が細長くつぶれていけば勾配誤差の定数は一様に保てません。

FEM3 の形状正則性は、この幾何学的な増幅を一様に抑えるための仮定です。

---

<a id="lab-numlab3-fem4-rates"></a>
## 4. FEM4：一次有限要素解の $H^1$ 一次・$L^2$ 二次収束

理論： [一次有限要素法の標準 $H^1$・$L^2$ 誤差評価](../FEM4/index.md#cor-fem4-standard-rates)

一次元 Poisson 問題

$$
-u''=\pi^2\sin(\pi x),
\qquad
u(0)=u(1)=0
$$

を一様メッシュ上の連続区分一次要素で解きます。

理論上、

$$
|u-u_h|_{H^1}=O(h),
\qquad
\|u-u_h\|_{L^2}=O(h^2)
$$

です。

```python-lab
# lab-id: NUMLAB3-FEM4-RATES
# lab-title: P1 Poisson 解の H1・L2 収束次数
# timeout-ms: 12000

import numpy as np
import matplotlib.pyplot as plt

q, w = np.polynomial.legendre.leggauss(4)

def solve_and_measure(N):
    h = 1.0 / N
    n = N - 1

    K = (2.0 / h) * np.eye(n)
    K += (-1.0 / h) * np.eye(n, k=1)
    K += (-1.0 / h) * np.eye(n, k=-1)

    F = np.zeros(n)

    for e in range(N):
        x_left = e * h
        x_right = (e + 1) * h

        for qk, wk in zip(q, w):
            x = 0.5 * (x_left + x_right) + 0.5 * h * qk
            f = np.pi**2 * np.sin(np.pi * x)

            phi_left = (x_right - x) / h
            phi_right = (x - x_left) / h
            weight = 0.5 * h * wk

            if e > 0:
                F[e - 1] += weight * f * phi_left
            if e + 1 < N:
                F[e] += weight * f * phi_right

    interior = np.linalg.solve(K, F)
    U = np.concatenate(([0.0], interior, [0.0]))

    l2_sq = 0.0
    h1_sq = 0.0

    for e in range(N):
        x_left = e * h
        x_right = (e + 1) * h
        uh_prime = (U[e + 1] - U[e]) / h

        for qk, wk in zip(q, w):
            x = 0.5 * (x_left + x_right) + 0.5 * h * qk
            weight = 0.5 * h * wk

            phi_left = (x_right - x) / h
            phi_right = (x - x_left) / h
            uh = U[e] * phi_left + U[e + 1] * phi_right

            exact = np.sin(np.pi * x)
            exact_prime = np.pi * np.cos(np.pi * x)

            l2_sq += weight * (uh - exact) ** 2
            h1_sq += weight * (uh_prime - exact_prime) ** 2

    return np.sqrt(l2_sq), np.sqrt(h1_sq)

Ns = np.array([8, 16, 32, 64], dtype=int)
l2_errors = np.empty(len(Ns))
h1_errors = np.empty(len(Ns))

for i, N in enumerate(Ns):
    l2_errors[i], h1_errors[i] = solve_and_measure(int(N))

l2_orders = np.log(l2_errors[:-1] / l2_errors[1:]) / np.log(2.0)
h1_orders = np.log(h1_errors[:-1] / h1_errors[1:]) / np.log(2.0)

print("N:", Ns)
print("L2 errors:", l2_errors)
print("H1 seminorm errors:", h1_errors)
print("L2 observed orders:", l2_orders)
print("H1 observed orders:", h1_orders)

fig, ax = plt.subplots()
ax.loglog(Ns, l2_errors, marker="o", label="L2")
ax.loglog(Ns, h1_errors, marker="s", label="H1 seminorm")
ax.legend()
ax.grid(True)
```

```python-test
assert np.all(l2_errors[1:] < l2_errors[:-1])
assert np.all(h1_errors[1:] < h1_errors[:-1])
assert np.all((l2_orders > 1.95) & (l2_orders < 2.05))
assert np.all((h1_orders > 0.95) & (h1_orders < 1.05))
```

同じ有限要素解でも、測るノルムによって誤差次数が異なります。

Aubin--Nitsche 型双対論法が $L^2$ 誤差を一段改善するという FEM4 の結論を、格子細分化から直接読み取れます。

---

<a id="lab-numlab3-fem5-saddle"></a>
## 5. FEM5：Schur 補行列から離散 inf-sup の退化を見る

理論： [混合有限要素行列と Schur 補行列](../FEM5/index.md#prop-fem5-block-schur)

有限次元鞍点系

$$
\begin{pmatrix}
A & B^{\mathsf T}\\
B & 0
\end{pmatrix}
\begin{pmatrix}
u\\p
\end{pmatrix}
=
\begin{pmatrix}
f\\g
\end{pmatrix}
$$

を考えます。

$A$ が正定値なら、圧力側の安定性は

$$
S=BA^{-1}B^{\mathsf T}
$$

の退化と密接に結び付きます。

```python-lab
# lab-id: NUMLAB3-FEM5-SADDLE
# lab-title: Schur 補行列と偽圧力モード
# timeout-ms: 5000

import numpy as np

A = np.diag([2.0, 3.0, 4.0])

B_good = np.array([
    [1.0, 0.0, 1.0],
    [0.0, 1.0, 1.0],
])

B_bad = np.array([
    [1.0, 0.0, 1.0],
    [2.0, 0.0, 2.0],
])

def schur(B):
    return B @ np.linalg.solve(A, B.T)

S_good = schur(B_good)
S_bad = schur(B_bad)

good_eigenvalues = np.linalg.eigvalsh(S_good)
bad_eigenvalues = np.linalg.eigvalsh(S_bad)

f = np.array([1.0, 2.0, 0.5])
g = np.array([0.2, -0.1])

KKT = np.block([
    [A, B_good.T],
    [B_good, np.zeros((2, 2))],
])

solution = np.linalg.solve(KKT, np.concatenate([f, g]))
u = solution[:3]
p = solution[3:]

constraint_residual = B_good @ u - g

print("good Schur eigenvalues:", good_eigenvalues)
print("bad Schur eigenvalues:", bad_eigenvalues)
print("velocity-like variable:", u)
print("pressure-like variable:", p)
print("constraint residual:", constraint_residual)
```

```python-test
assert np.all(good_eigenvalues > 0.0)
assert bad_eigenvalues[0] < 1e-12
assert np.linalg.matrix_rank(B_good) == 2
assert np.linalg.matrix_rank(B_bad) == 1
assert np.linalg.norm(constraint_residual) < 1e-12
```

$B_{\mathrm{bad}}$ では2本の制約行が線形従属なので、Schur 補行列に零固有値が現れます。

これは圧力側に「制約から見えない方向」が残る有限次元モデルであり、離散 inf-sup 条件が退化する機構を行列として観察できます。

---

<a id="lab-numlab3-fem6-parabolic"></a>
## 6. FEM6：後退 Euler 有限要素法の離散エネルギー

理論： [後退 Euler 有限要素法](../FEM6/index.md#def-fem6-backward-euler-fem) / [離散エネルギー評価](../FEM6/index.md#thm-fem6-backward-euler-energy)

一次元熱方程式

$$
u_t-u_{xx}=0,
\qquad
u(t,0)=u(t,1)=0,
\qquad
u(0,x)=\sin(\pi x)
$$

を連続区分一次要素で空間離散し、時間を後退 Euler 法で進めます。

係数ベクトル $c^n$ は

$$
(M+\tau K)c^{n+1}=Mc^n
$$

を満たします。

```python-lab
# lab-id: NUMLAB3-FEM6-PARABOLIC
# lab-title: 後退 Euler FEM の離散エネルギー減衰
# timeout-ms: 12000

import numpy as np
import matplotlib.pyplot as plt

N = 40
h = 1.0 / N
n = N - 1

M = (2.0 * h / 3.0) * np.eye(n)
M += (h / 6.0) * np.eye(n, k=1)
M += (h / 6.0) * np.eye(n, k=-1)

K = (2.0 / h) * np.eye(n)
K += (-1.0 / h) * np.eye(n, k=1)
K += (-1.0 / h) * np.eye(n, k=-1)

nodes = np.linspace(0.0, 1.0, N + 1)
c = np.sin(np.pi * nodes[1:-1])

tau = 0.001
steps = 50
T = tau * steps

A = M + tau * K

energies = [c @ M @ c]

for _ in range(steps):
    c = np.linalg.solve(A, M @ c)
    energies.append(c @ M @ c)

energies = np.array(energies)

exact = (
    np.exp(-np.pi**2 * T)
    * np.sin(np.pi * nodes[1:-1])
)
max_error = np.max(np.abs(c - exact))

print("initial discrete energy:", energies[0])
print("final discrete energy:", energies[-1])
print("max nodal error:", max_error)

fig, ax = plt.subplots()
ax.semilogy(
    np.arange(steps + 1) * tau,
    energies,
)
ax.set_xlabel("time")
ax.set_ylabel("c^T M c")
ax.grid(True)
```

```python-test
assert np.all(np.linalg.eigvalsh(M) > 0.0)
assert np.all(np.linalg.eigvalsh(K) > 0.0)
assert np.all(np.diff(energies) <= 1e-13)
assert energies[-1] < energies[0]
assert max_error < 2e-3
```

後退 Euler 有限要素法では、各時間ステップで $M+\tau K$ を解きます。

ここでは解の振幅が減るだけでなく、質量行列で測った離散 $L^2$ エネルギーも単調に減少しています。

---

<a id="lab-numlab3-fem7-supg"></a>
## 7. FEM7：標準 Galerkin の振動と SUPG による風上化

理論： [一次元一次有限要素 Galerkin 法と中心差分の対応](../FEM7/index.md#thm-fem7-galerkin-centered) / [一次元 SUPG と風上差分の一致](../FEM7/index.md#thm-fem7-supg-upwind)

定常移流拡散問題

$$
-\varepsilon u''+bu'=0,
\qquad
u(0)=0,
\qquad
u(1)=1
$$

で

$$
\varepsilon=0.025,
\qquad
b=1,
\qquad
h=0.1
$$

とします。

要素 Péclet 数は

$$
Pe_h
=
\frac{bh}{2\varepsilon}
=
2
$$

なので、標準 Galerkin 法は中心差分型の振動を持ち得ます。

一次元一次要素で

$$
\tau_{\mathrm{SUPG}}
=
\frac{h}{2b}
$$

とすると、SUPG 追加項は

$$
\tau_{\mathrm{SUPG}}b^2
=
\frac{bh}{2}
$$

の流線方向拡散を加え、一次風上差分と一致します。

```python-lab
# lab-id: NUMLAB3-FEM7-SUPG
# lab-title: 標準 Galerkin と SUPG を比較
# timeout-ms: 8000

import numpy as np
import matplotlib.pyplot as plt

epsilon = 0.025
b = 1.0
J = 10
h = 1.0 / J
n = J - 1

x = np.linspace(0.0, 1.0, J + 1)
Pe_h = abs(b) * h / (2.0 * epsilon)

def solve_centered_with_diffusion(diffusion):
    left = -diffusion / h**2 - b / (2.0 * h)
    diag = 2.0 * diffusion / h**2
    right = -diffusion / h**2 + b / (2.0 * h)

    A = diag * np.eye(n)
    A += left * np.eye(n, k=-1)
    A += right * np.eye(n, k=1)

    rhs = np.zeros(n)
    rhs[-1] -= right * 1.0

    interior = np.linalg.solve(A, rhs)
    return np.concatenate(([0.0], interior, [1.0])), A

standard, A_standard = solve_centered_with_diffusion(epsilon)

tau_supg = h / (2.0 * b)
effective_diffusion = epsilon + tau_supg * b * b
supg, A_supg = solve_centered_with_diffusion(effective_diffusion)

physical_peclet = b / epsilon
exact = (
    np.exp(physical_peclet * x) - 1.0
) / (
    np.exp(physical_peclet) - 1.0
)

print("element Peclet number:", Pe_h)
print("SUPG tau:", tau_supg)
print("effective diffusion:", effective_diffusion)
print("standard Galerkin:", standard)
print("SUPG:", supg)

fig, ax = plt.subplots()
ax.plot(x, exact, label="exact")
ax.plot(x, standard, marker="o", label="standard Galerkin")
ax.plot(x, supg, marker="s", label="SUPG")
ax.set_xlabel("x")
ax.set_ylabel("u")
ax.legend()
ax.grid(True)
```

```python-test
upwind_left = -epsilon / h**2 - b / h
upwind_diag = 2.0 * epsilon / h**2 + b / h
upwind_right = -epsilon / h**2

A_upwind = upwind_diag * np.eye(n)
A_upwind += upwind_left * np.eye(n, k=-1)
A_upwind += upwind_right * np.eye(n, k=1)

assert Pe_h > 1.0
assert np.min(standard) < -0.1
assert np.any(np.diff(standard) < 0.0)
assert np.all(supg >= -1e-14)
assert np.all(supg <= 1.0 + 1e-14)
assert np.all(np.diff(supg) >= -1e-14)
assert np.allclose(A_supg, A_upwind)
```

標準 Galerkin 法では、連続問題に存在しない交互振動が節点値へ現れます。

SUPG は流線方向に追加制御を入れて、この一次元設定では風上差分と同じ離散方程式になります。

ただし追加拡散により境界層は厚く見えます。安定化は「何も失わず精度だけ上げる操作」ではありません。

---

## 8. 7本の実験を理論へ戻す

| 理論章 | 理論で得た結論 | 実験で測った量 |
|---|---|---|
| FEM1 | Galerkin 方程式と直交性 | 剛性行列の固有値・Galerkin 残差 |
| FEM2 | 局所要素から大域系を組み立てる | 局所剛性行列・大域行列・中心節点解 |
| FEM3 | 形状正則性が補間定数を制御する | 形状比と偽の横方向補間勾配 |
| FEM4 | P1 法は $H^1$ 一次・$L^2$ 二次 | 実測有限要素収束次数 |
| FEM5 | 離散 inf-sup が混合安定性を支える | Schur 補行列の最小固有値・rank |
| FEM6 | 後退 Euler FEM は無条件エネルギー安定 | $c^{\mathsf T}Mc$ の時間履歴 |
| FEM7 | SUPG は流線方向安定化を与える | 標準 Galerkin 振動・SUPG 単調性・風上行列との一致 |

有限要素法では、

$$
\boxed{
\text{変分形式}
\to
\text{局所要素}
\to
\text{大域行列}
\to
\text{数値診断}
}
$$

の各段階がつながっていることが重要です。

---

## 9. 次へ

FEM1–FEM7 のブラウザ実験が揃いました。

次は **NUMLAB4** へ進みます。

MC1–MC4 の標準誤差、乱数生成、分散減少、Multilevel Monte Carlo を、再現可能な乱数生成器と実測分散を使って確認します。
