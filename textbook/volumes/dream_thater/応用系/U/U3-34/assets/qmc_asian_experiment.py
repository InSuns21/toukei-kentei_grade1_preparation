"""U3-34: independent Monte Carlo vs independently scrambled Sobol, forward/bridge.

Requires numpy and scipy. Run: python assets/qmc_asian_experiment.py
All prices are in JPY; time in years. No Euler discretization is used.
"""
from __future__ import annotations

import numpy as np
from scipy.special import ndtr, ndtri
from scipy.stats import qmc

S0, K, RATE, DIVIDEND, SIGMA, T = 100.0, 100.0, 0.03, 0.0, 0.2, 1.0
M = 8
R = 24
SIZES = (256, 1024, 4096)
SEED = 20261114


def brownian_forward(z: np.ndarray) -> np.ndarray:
    """m independent standard normals -> W at j*T/m, j=1,...,m."""
    n, m = z.shape
    assert m == M
    return np.cumsum(z, axis=1) * np.sqrt(T / m)


def brownian_bridge(z: np.ndarray) -> np.ndarray:
    """m independent normals -> same Gaussian path vector, terminal first."""
    n, m = z.shape
    assert m == M and (m & (m - 1)) == 0
    w = np.zeros((n, m + 1), dtype=float)
    w[:, m] = np.sqrt(T) * z[:, 0]
    intervals = [(0, m)]
    col = 1
    while intervals:
        next_intervals = []
        for left, right in intervals:
            if right - left < 2:
                continue
            mid = (left + right) // 2
            # Conditional mean of W_mid given its two endpoints.
            a = (right - mid) / (right - left)
            b = (mid - left) / (right - left)
            variance = ((mid - left) * (right - mid) /
                        (right - left)) * T / m
            w[:, mid] = (a * w[:, left] + b * w[:, right] +
                         np.sqrt(variance) * z[:, col])
            col += 1
            next_intervals.extend(((left, mid), (mid, right)))
        intervals = next_intervals
    assert col == m
    return w[:, 1:]


def discounted_contracts(z: np.ndarray, use_bridge: bool) -> np.ndarray:
    """Columns: eight-time arithmetic Asian call, terminal European call."""
    w = brownian_bridge(z) if use_bridge else brownian_forward(z)
    times = np.arange(1, M + 1, dtype=float) * T / M
    stock = S0 * np.exp((RATE - DIVIDEND - SIGMA**2 / 2) * times +
                        SIGMA * w)
    discounted = np.exp(-RATE * T)
    asian = discounted * np.maximum(stock.mean(axis=1) - K, 0.0)
    terminal = discounted * np.maximum(stock[:, -1] - K, 0.0)
    return np.column_stack((asian, terminal))


def sample_normals(n: int, method: int, rep: int) -> np.ndarray:
    # Separate independent substreams for different methods, n and replicates.
    rng = np.random.default_rng(
        np.random.SeedSequence([SEED, method, n, rep])
    )
    if method == 0:  # iid pseudo-random normal coordinates
        return rng.standard_normal((n, M))
    # Each call has a fresh, independent Owen-style scramble.
    generator = qmc.Sobol(
        d=M, scramble=True, seed=int(rng.integers(0, 2**32 - 1))
    )
    power = n.bit_length() - 1
    assert n == 2**power
    u = generator.random_base2(m=power)
    # Floating-point protection for inverse-normal endpoints.
    u = np.clip(u, np.nextafter(0.0, 1.0), np.nextafter(1.0, 0.0))
    return ndtri(u)


def check_bridge_covariance() -> None:
    # Evaluate the linear coordinate map on the standard basis:
    # if W=Az, rows of the returned matrix are columns of A.
    basis = np.eye(M, dtype=float)
    transformed = brownian_bridge(basis)
    cov = transformed.T @ transformed
    times = np.arange(1, M + 1, dtype=float) * T / M
    expected = np.minimum.outer(times, times)
    np.testing.assert_allclose(cov, expected, atol=1e-14, rtol=0)
    np.testing.assert_allclose(transformed[:, -1], basis[:, 0])


def main() -> None:
    check_bridge_covariance()
    d1 = (np.log(S0 / K) +
          (RATE - DIVIDEND + SIGMA**2 / 2) * T) / (SIGMA * np.sqrt(T))
    d2 = d1 - SIGMA * np.sqrt(T)
    call_exact = (S0 * np.exp(-DIVIDEND * T) * ndtr(d1) -
                  K * np.exp(-RATE * T) * ndtr(d2))
    print("Contract: Asian call at t=j/8, j=1,...,8; K=100 JPY")
    print(f"Separate reference: European call exact={call_exact:.8f} JPY")
    print(f"Independent replicates R={R}, seed={SEED}, paths per replicate N")
    print("Within each Sobol replicate, points are dependent.")
    print("Ratio = observed replicate variance / iid MC replicate variance.")
    names = ("iid-forward", "scrambled-forward", "scrambled-bridge")
    contracts = ("Asian", "European")
    print("N     payoff    method                 price       SE       var/MC")
    for n in SIZES:
        all_replicates = []
        for method in range(3):
            rep_means = []
            for rep in range(R):
                normals = sample_normals(n, method, rep)
                value = discounted_contracts(normals, use_bridge=(method == 2))
                rep_means.append(value.mean(axis=0))
            all_replicates.append(np.asarray(rep_means))
        baseline = all_replicates[0].var(axis=0, ddof=1)
        for contract_id, contract in enumerate(contracts):
            for method, name in enumerate(names):
                values = all_replicates[method][:, contract_id]
                var = values.var(ddof=1)
                se = np.sqrt(var / R)
                ratio = var / baseline[contract_id]
                print(f"{n:<5d} {contract:<9} {name:<20} "
                      f"{values.mean():10.6f} {se:10.6f} {ratio:10.4f}")
        print("-" * 70)
    print("Price/SE are random experimental outputs, not guaranteed gains.")
    print("Asian price targets the fixed eight-observation contract only.")


if __name__ == "__main__":
    main()
