"""PML2-05: manufactured Poisson datasets, solver and split verification.

Run: python pde_dataset.py
No third-party packages, network or files are needed.
"""
import math
import random

SEED = 20261123
SIGMA = 0.01
GRIDS = (4, 8, 16)
SPLITS = {
    "train": (-0.2, 0.0, 0.2),
    "validation": (-0.1, 0.1),
    "test": (-0.25, 0.25),
}


def exact(a, x):
    return x * (1.0 - x) + a * math.sin(math.pi * x)


def forcing(a, x):
    return 2.0 + a * math.pi**2 * math.sin(math.pi * x)


def tridiagonal_poisson(rhs, h):
    """Solve (-z[j-1]+2*z[j]-z[j+1])/h**2=rhs[j] with zero endpoints."""
    m = len(rhs)
    assert m >= 1 and 0 < h < 1
    # Thomas elimination for the positive definite Dirichlet tridiagonal
    # matrix (only boundary-adjacent rows are strictly diagonally dominant).
    d = [2.0] * m
    r = [h * h * value for value in rhs]
    for i in range(1, m):
        factor = -1.0 / d[i - 1]
        d[i] += factor
        r[i] -= factor * r[i - 1]
    z = [0.0] * m
    z[-1] = r[-1] / d[-1]
    for i in range(m - 2, -1, -1):
        z[i] = (r[i] + z[i + 1]) / d[i]
    return [0.0, *z, 0.0]


def make_case(a, n):
    """Generate independent analytic and numerical labels for one PDE case."""
    h = 1.0 / n
    xs = [j * h for j in range(n + 1)]
    true = [exact(a, x) for x in xs]
    f = [forcing(a, x) for x in xs]
    numerical = tridiagonal_poisson(f[1:-1], h)
    lam = 4.0 / (h * h) * math.sin(math.pi * h / 2.0) ** 2

    residual = max(
        abs(
            (2 * numerical[j] - numerical[j - 1] - numerical[j + 1])
            / (h * h)
            - f[j]
        )
        for j in range(1, n)
    )
    actual_error = max(abs(true[j] - numerical[j]) for j in range(n + 1))
    predicted_error = abs(a) * (math.pi**2 / lam - 1.0) * max(
        abs(math.sin(math.pi * x)) for x in xs
    )

    assert abs(true[0]) < 1e-14 and abs(true[-1]) < 1e-14
    assert numerical[0] == numerical[-1] == 0.0
    assert residual < 1e-10, (a, n, residual)
    assert abs(actual_error - predicted_error) < 1e-10, (
        a, n, actual_error, predicted_error
    )
    return xs, true, numerical, f, actual_error, residual


def main():
    # A PDE parameter, not a grid point, is the grouping key.
    train = set(SPLITS["train"])
    val = set(SPLITS["validation"])
    test = set(SPLITS["test"])
    assert not (train & val or train & test or val & test)
    assert all(-0.25 <= a <= 0.25 for group in SPLITS.values() for a in group)

    rng = random.Random(SEED)
    print(f"seed={SEED}  sigma={SIGMA}  grids={GRIDS}  boundary=(0,0)")
    print("labels: analytic truth vs finite-difference numerical solution")
    print("split        a       n     max nodal error     max solver residual")
    for split, parameters in SPLITS.items():
        for a in parameters:
            for n in GRIDS:
                xs, true, numerical, f, error, residual = make_case(a, n)
                print(f"{split:10s}  {a:+.2f}    {n:2d}     {error:14.8e}   {residual:14.8e}")

                if split == "train" and n == GRIDS[0]:
                    # Independently sampled observational labels; boundary
                    # conditions are kept exact and never randomized.
                    observations = [
                        true[j] + rng.gauss(0.0, SIGMA)
                        for j in range(1, n)
                    ]
                    j = n // 2
                    print(
                        f"    example train case a={a:+.2f}, x={xs[j]:.2f}: "
                        f"true={true[j]:.8f}, numeric={numerical[j]:.8f}, "
                        f"noisy_observation={observations[j - 1]:.8f}"
                    )

    print("PASS: boundary, partition, analytic error and numerical residual")


if __name__ == "__main__":
    main()
