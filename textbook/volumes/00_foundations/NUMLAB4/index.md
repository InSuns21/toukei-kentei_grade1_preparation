# NUMLAB4 Monte Carlo 演習

NUMLAB4 では、MC1–MC4 の理論を **4本のブラウザ実験**へ移します。

Monte Carlo 法では、推定式を書けるだけでなく、

- 標本数を増やしたとき標準誤差がどの速さで減るか
- 乱数生成手順を再現可能に固定できているか
- 同じ計算予算で本当に分散が減っているか
- Multilevel Monte Carlo で「隣接レベルを同じ乱数で結合する」ことが何を変えるか

を実測することが重要です。

この章では新しい Monte Carlo 理論を追加しません。各実験は MC1–MC4 の stable anchor を出発点とし、

```text
確率・推定理論
↓
固定シードで反復実験
↓
標準誤差・受理率・推定量分散・レベル差分散を測る
↓
理論値と照合
```

の順で確認します。

Python / NumPy の共通記法は PYNUM1、ブラウザ実行基盤は NUMLAB0 を使います。

---

## 0. 実験の共通規約

1. 乱数生成器は `np.random.default_rng(seed)` から明示的に作る。
2. 比較実験では、標本数だけでなく関数評価回数も合わせる。
3. 単一の乱数実現値だけで結論せず、独立反復から標準誤差や推定量分散を測る。
4. 推定値が真値へ近いことと、推定量の分散が小さいことを区別する。
5. 棄却法では、受理後標本だけでなく受理率も記録する。
6. Multilevel Monte Carlo では、レベル差の「周辺分布」だけでなく結合の作り方を確認する。
7. 自動判定には固定シードを使うが、理論上の結論を特定シードだけへ依存させない。

---

<a id="lab-numlab4-mc1-standard-error"></a>
## 1. MC1：標準誤差の $N^{-1/2}$ 則を実測する

理論： [Monte Carlo 推定量の不偏性・分散・二乗平均平方根誤差](../MC1/index.md#prop-mc1-unbiased-variance-rmse) / [Monte Carlo 標準誤差](../MC1/index.md#def-mc1-standard-error)

積分

$$
I
=
\int_0^1 x^2\,dx
=
\frac13
$$

を、

$$
\widehat I_N
=
\frac1N
\sum_{i=1}^N U_i^2,
\qquad
U_i\sim \operatorname{Unif}(0,1)
$$

で推定します。

ここで

$$
\operatorname{Var}(U^2)
=
\frac15-\frac19
=
\frac4{45}.
$$

したがって理論上の標準誤差は

$$
\operatorname{SE}(\widehat I_N)
=
\sqrt{\frac4{45N}}.
$$

独立反復を多数回行い、その推定値の標準偏差を実測標準誤差として比較します。

```python-lab
# lab-id: NUMLAB4-MC1-STANDARD-ERROR
# lab-title: Monte Carlo 標準誤差の N^{-1/2} 則
# timeout-ms: 10000

import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(20260924)

Ns = np.array([64, 256, 1024, 4096], dtype=int)
replications = 300

true_value = 1.0 / 3.0
sigma = np.sqrt(4.0 / 45.0)

empirical_se = np.empty(len(Ns))
theoretical_se = sigma / np.sqrt(Ns)
mean_estimates = np.empty(len(Ns))

for k, N in enumerate(Ns):
    samples = rng.random((replications, int(N))) ** 2
    estimates = samples.mean(axis=1)

    empirical_se[k] = estimates.std(ddof=1)
    mean_estimates[k] = estimates.mean()

observed_exponents = (
    np.log(empirical_se[:-1] / empirical_se[1:])
    / np.log(Ns[1:] / Ns[:-1])
)

scaled_se = empirical_se * np.sqrt(Ns)

print("N:", Ns)
print("empirical SE:", empirical_se)
print("theoretical SE:", theoretical_se)
print("SE * sqrt(N):", scaled_se)
print("observed exponents:", observed_exponents)
print("mean estimates:", mean_estimates)

fig, ax = plt.subplots()
ax.loglog(Ns, empirical_se, marker="o", label="empirical SE")
ax.loglog(Ns, theoretical_se, linestyle="--", label="sigma / sqrt(N)")
ax.set_xlabel("N")
ax.set_ylabel("standard error")
ax.legend()
ax.grid(True)
```

```python-test
assert np.all(empirical_se > 0.0)
assert np.all(np.isfinite(empirical_se))
assert np.all((scaled_se > 0.25) & (scaled_se < 0.35))
assert np.all((observed_exponents > 0.35) & (observed_exponents < 0.65))
assert abs(mean_estimates[-1] - true_value) < 0.003
```

標本数を4倍にすると、標準誤差はおよそ半分になります。

この実験では、

$$
\operatorname{SE}(\widehat I_N)\sqrt N
$$

が $N$ を変えてもほぼ一定になることを直接確認しています。

---

<a id="lab-numlab4-mc2-sampling"></a>
## 2. MC2：逆関数法と棄却法を同じ乱数生成器で確認する

理論： [逆関数法の正当性](../MC2/index.md#thm-mc2-inverse-transform) / [棄却法の受理率と平均提案回数](../MC2/index.md#cor-mc2-rejection-rate)

まず率 $\lambda=2$ の指数分布を考えます。

一様乱数 $U$ から

$$
X
=
-\frac1\lambda\log(1-U)
$$

とすれば、[逆関数法](../MC2/index.md#thm-mc2-inverse-transform)により指数分布標本が得られます。

次に、$0\le x\le1$ 上の密度

$$
f(x)=2x
$$

を一様提案密度 $q(x)=1$ から棄却法で生成します。

包絡定数は $M=2$ なので、理論上の受理率は

$$
\frac1M=\frac12.
$$

```python-lab
# lab-id: NUMLAB4-MC2-SAMPLING
# lab-title: 逆関数法・棄却法・固定シード
# timeout-ms: 8000

import numpy as np
import matplotlib.pyplot as plt

rng_a = np.random.default_rng(2026)
rng_b = np.random.default_rng(2026)

probe_a = rng_a.random(8)
probe_b = rng_b.random(8)
reproducible = np.array_equal(probe_a, probe_b)

rng_inverse = np.random.default_rng(2026)
sample_size = 12000

u = rng_inverse.random(sample_size)
exponential_sample = -np.log1p(-u) / 2.0

rng_rejection = np.random.default_rng(2026)

accepted_chunks = []
accepted_count = 0
proposal_count = 0
batch_size = 6000

while accepted_count < sample_size:
    x = rng_rejection.random(batch_size)
    v = rng_rejection.random(batch_size)

    accepted = x[v <= x]
    accepted_chunks.append(accepted)

    accepted_count += accepted.size
    proposal_count += batch_size

rejection_sample = np.concatenate(accepted_chunks)[:sample_size]
acceptance_rate = accepted_count / proposal_count

print("fixed-seed reproducible:", reproducible)
print("exponential sample mean:", exponential_sample.mean())
print("theoretical exponential mean:", 0.5)
print("rejection sample mean:", rejection_sample.mean())
print("theoretical target mean:", 2.0 / 3.0)
print("acceptance rate:", acceptance_rate)

fig, ax = plt.subplots()
ax.hist(
    rejection_sample,
    bins=30,
    density=True,
    alpha=0.6,
    label="rejection sample",
)

grid = np.linspace(0.0, 1.0, 200)
ax.plot(grid, 2.0 * grid, label="target density 2x")
ax.set_xlabel("x")
ax.set_ylabel("density")
ax.legend()
```

```python-test
assert reproducible
assert abs(exponential_sample.mean() - 0.5) < 0.03
assert abs(rejection_sample.mean() - 2.0 / 3.0) < 0.02
assert 0.47 < acceptance_rate < 0.53
assert np.all((rejection_sample >= 0.0) & (rejection_sample <= 1.0))
```

同じシードは「同じ乱数生成契約を再現する」ために使います。

一方、棄却法では受理後の標本平均だけでなく、提案からどれだけ捨てたかも計算量に直結します。ここでは受理率が理論値 $1/2$ に近いことまで確認します。

---

<a id="lab-numlab4-mc3-variance-reduction"></a>
## 3. MC3：同じ関数評価予算で分散減少率を比較する

理論： [分散減少法](../MC3/index.md#def-mc3-variance-reduction) / [最適制御変量係数](../MC3/index.md#thm-mc3-optimal-control-variate)

再び

$$
I
=
E[U^2]
=
\frac13
$$

を推定します。

通常 Monte Carlo 法では、1複製あたり $2n$ 回 $f(u)=u^2$ を評価します。

対称変量法では $n$ 個の $U$ に対して

$$
f(U),\qquad f(1-U)
$$

を計算するので、関数評価回数は同じ $2n$ 回です。

また、制御変量 $G(U)=U$ は

$$
E[G(U)]=\frac12
$$

が既知です。

$f(U)=U^2$ では最適係数が $c^\ast=1$ なので、

$$
U^2-\left(U-\frac12\right)
$$

を平均します。

```python-lab
# lab-id: NUMLAB4-MC3-VARIANCE-REDUCTION
# lab-title: 通常法・対称変量・制御変量の分散比較
# timeout-ms: 8000

import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(2026)

replications = 1000
pair_count = 128
function_evaluations = 2 * pair_count

u_plain = rng.random((replications, function_evaluations))
plain_estimates = (u_plain ** 2).mean(axis=1)

u_antithetic = rng.random((replications, pair_count))
antithetic_estimates = 0.5 * (
    u_antithetic ** 2
    + (1.0 - u_antithetic) ** 2
).mean(axis=1)

u_control = rng.random((replications, function_evaluations))
control_estimates = (
    u_control ** 2
    - (u_control - 0.5)
).mean(axis=1)

variances = np.array([
    plain_estimates.var(ddof=1),
    antithetic_estimates.var(ddof=1),
    control_estimates.var(ddof=1),
])

means = np.array([
    plain_estimates.mean(),
    antithetic_estimates.mean(),
    control_estimates.mean(),
])

variance_reduction_factors = variances[0] / variances

print("function evaluations per replication:", function_evaluations)
print("means:", means)
print("variances:", variances)
print("variance reduction factors:", variance_reduction_factors)

fig, ax = plt.subplots()
ax.bar(
    ["plain", "antithetic", "control"],
    variances,
)
ax.set_ylabel("empirical estimator variance")
```

```python-test
assert np.all(np.abs(means - 1.0 / 3.0) < 0.005)
assert variances[1] < variances[0]
assert variances[2] < variances[0]
assert variance_reduction_factors[1] > 5.0
assert variance_reduction_factors[2] > 10.0
```

三つの推定量は同じ期待値を持ちますが、同じ関数評価回数でも推定量分散は大きく異なります。

分散減少法の比較では、

$$
\boxed{
\text{推定値がたまたま真値に近い}
}
$$

ではなく、

$$
\boxed{
\text{独立反復した推定量そのものの分散が小さい}
}
$$

ことを見る必要があります。

---

<a id="lab-numlab4-mc4-level-coupling"></a>
## 4. MC4：レベル間結合が差の分散を落とす

理論： [レベル間結合](../MC4/index.md#def-mc4-level-coupling) / [MLMC 推定量の期待値と分散](../MC4/index.md#thm-mc4-mlmc-expectation-variance)

$U\sim\operatorname{Unif}(0,1)$ に対し、二進量子化

$$
Q_\ell(U)
=
2^{-\ell}
\left\lfloor
2^\ell U
\right\rfloor
$$

を考えます。

隣接レベルを **同じ $U$** で結合すると、

$$
\Delta_\ell
=
Q_\ell(U)-Q_{\ell-1}(U)
$$

は

$$
0
\quad\text{または}\quad
2^{-\ell}
$$

だけを取ります。

各値の確率は $1/2$ なので、

$$
\operatorname{Var}(\Delta_\ell)
=
2^{-2\ell-2}.
$$

したがってレベルを1上げるごとに分散は約 $1/4$ になります。

比較のため、粗いレベルだけ独立な $V$ から生成した

$$
Q_\ell(U)-Q_{\ell-1}(V)
$$

も測ります。

```python-lab
# lab-id: NUMLAB4-MC4-LEVEL-COUPLING
# lab-title: MLMC のレベル間結合と差分散
# timeout-ms: 10000

import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(2026)

sample_size = 60000
levels = np.arange(2, 9, dtype=int)

coupled_variances = np.empty(len(levels))
independent_variances = np.empty(len(levels))

for k, level in enumerate(levels):
    fine_scale = 2 ** int(level)
    coarse_scale = 2 ** int(level - 1)

    u = rng.random(sample_size)

    fine = np.floor(fine_scale * u) / fine_scale
    coarse_coupled = np.floor(coarse_scale * u) / coarse_scale

    coupled_difference = fine - coarse_coupled
    coupled_variances[k] = coupled_difference.var(ddof=1)

    v = rng.random(sample_size)
    coarse_independent = np.floor(coarse_scale * v) / coarse_scale

    independent_difference = fine - coarse_independent
    independent_variances[k] = independent_difference.var(ddof=1)

theoretical_coupled = 2.0 ** (-2.0 * levels - 2.0)

coupled_beta = -np.polyfit(
    levels,
    np.log2(coupled_variances),
    1,
)[0]

independent_beta = -np.polyfit(
    levels,
    np.log2(independent_variances),
    1,
)[0]

print("levels:", levels)
print("coupled variances:", coupled_variances)
print("theoretical coupled variances:", theoretical_coupled)
print("independent variances:", independent_variances)
print("coupled beta:", coupled_beta)
print("independent beta:", independent_beta)

fig, ax = plt.subplots()
ax.semilogy(
    levels,
    coupled_variances,
    marker="o",
    label="same U",
)
ax.semilogy(
    levels,
    independent_variances,
    marker="s",
    label="independent U, V",
)
ax.semilogy(
    levels,
    theoretical_coupled,
    linestyle="--",
    label="2^(-2l-2)",
)
ax.set_xlabel("level")
ax.set_ylabel("variance of level difference")
ax.legend()
ax.grid(True)
```

```python-test
assert np.allclose(
    coupled_variances,
    theoretical_coupled,
    rtol=0.03,
)
assert 1.9 < coupled_beta < 2.1
assert abs(independent_beta) < 0.15
assert independent_variances[-1] > 1000.0 * coupled_variances[-1]
assert independent_variances[-1] > 0.1
```

細かい近似と粗い近似の周辺分布を正しく作るだけでは不十分です。

同じ $U$ を共有した結合では、隣接レベルがほとんど同じ値を返すため、その差だけが小さくなります。

独立な $U,V$ を使うと各レベル自体は正しく生成されても、差の分散はほとんど減りません。

これが Multilevel Monte Carlo で「結合」が核心になる理由です。

---

## 5. 4本の実験を理論へ戻す

| 理論章 | 理論で得た結論 | 実験で測った量 |
|---|---|---|
| MC1 | 標準誤差は $N^{-1/2}$ で減る | 独立反復の標準偏差・実測指数 |
| MC2 | 変換法・棄却法で目標分布を生成できる | 標本平均・固定シード再現性・受理率 |
| MC3 | 同じ期待値を保ったまま推定量分散を減らせる | 通常法に対する分散減少率 |
| MC4 | 良いレベル間結合で補正分散が減衰する | 同一乱数結合と独立結合のレベル差分散 |

Monte Carlo 法では、

$$
\boxed{
\text{推定式}
\to
\text{乱数生成契約}
\to
\text{独立反復}
\to
\text{誤差・分散診断}
}
$$

までを一つの実験単位として扱います。

---

## 6. 次へ

MC1–MC4 のブラウザ実験が揃いました。

次は **NUMLAB5** へ進みます。

QMC1–QMC8 で学んだ準 Monte Carlo 法を、点集合の低次元投影・ディスクレパンシー・ランダム化誤差評価・高次収束のブラウザ実験へ移します。
