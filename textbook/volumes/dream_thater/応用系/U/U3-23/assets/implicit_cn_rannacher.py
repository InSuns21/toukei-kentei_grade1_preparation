"""U3-23: Black--Scholes backward Euler, Crank--Nicolson, Rannacher.

All amounts in JPY, maturities and time steps in years.
Python standard library only. No random variables or external dependencies.
"""
from __future__ import annotations

import math


def normal_cdf(z: float) -> float:
    return 0.5 * (1.0 + math.erf(z / math.sqrt(2.0)))


def bs_call(s: float, strike: float, r: float, q: float,
            sigma: float, tau: float) -> float:
    if tau == 0:
        return max(s - strike, 0.0)
    if s == 0:
        return 0.0
    d1 = (math.log(s / strike) + (r - q + 0.5 * sigma**2) * tau) / (sigma * math.sqrt(tau))
    d2 = d1 - sigma * math.sqrt(tau)
    return (s * math.exp(-q * tau) * normal_cdf(d1)
            - strike * math.exp(-r * tau) * normal_cdf(d2))


def thomas(lower: list[float], diagonal: list[float], upper: list[float],
           rhs: list[float]) -> list[float]:
    """Solve a tridiagonal system; lower[0] and upper[-1] are zero."""
    size = len(diagonal)
    if size < 2 or any(len(v) != size for v in (lower, upper, rhs)):
        raise ValueError("incompatible tridiagonal arrays")
    modified_upper = [0.0] * size
    modified_rhs = [0.0] * size

    pivot = diagonal[0]
    if pivot <= 0:
        raise ArithmeticError("nonpositive first pivot")
    modified_upper[0] = upper[0] / pivot
    modified_rhs[0] = rhs[0] / pivot
    for j in range(1, size):
        pivot = diagonal[j] - lower[j] * modified_upper[j - 1]
        if pivot <= 0:
            raise ArithmeticError("nonpositive elimination pivot")
        modified_upper[j] = upper[j] / pivot
        modified_rhs[j] = (rhs[j] - lower[j] * modified_rhs[j - 1]) / pivot

    solution = modified_rhs[:]
    for j in range(size - 2, -1, -1):
        solution[j] -= modified_upper[j] * solution[j + 1]
    return solution


def solve(method: str, m: int, n: int, *, smax: float = 300.0,
          strike: float = 100.0, r: float = 0.05, q: float = 0.02,
          sigma: float = 0.20, maturity: float = 1.0) -> tuple[list[float], float]:
    """Return final call grid and largest linear-solve residual.

    Backward Euler (BE), Crank--Nicolson (CN) and Rannacher (R).
    R has two initial BE half-steps and CN afterwards.
    """
    if method not in {"BE", "CN", "R"}:
        raise ValueError("unknown method")
    if not (m >= 3 and n >= 1 and smax > strike > 0 and maturity > 0
            and r >= 0 and q >= 0 and sigma > 0):
        raise ValueError("invalid grid or model parameters")
    h = smax / m
    k = maturity / n
    values = [max(i * h - strike, 0.0) for i in range(m + 1)]
    current_time = 0.0
    largest_residual = 0.0

    def boundary(tau: float) -> tuple[float, float]:
        return (0.0, smax * math.exp(-q * tau) - strike * math.exp(-r * tau))

    def step(old: list[float], start: float, dt: float,
             theta: float) -> tuple[list[float], float]:
        end = start + dt
        left_new, right_new = boundary(end)
        lower, diagonal, upper, rhs = [], [], [], []
        for i in range(1, m):
            a = 0.5 * (sigma**2 * i**2 - (r - q) * i)
            b = -(sigma**2 * i**2 + r)
            c = 0.5 * (sigma**2 * i**2 + (r - q) * i)
            lower.append(-theta * dt * a if i > 1 else 0.0)
            diagonal.append(1.0 - theta * dt * b)
            upper.append(-theta * dt * c if i < m - 1 else 0.0)
            # The old-time contribution includes old boundary values.
            value = old[i] + (1.0 - theta) * dt * (
                a * old[i - 1] + b * old[i] + c * old[i + 1]
            )
            # New-time boundary values enter the implicit RHS.
            if i == 1:
                value += theta * dt * a * left_new
            if i == m - 1:
                value += theta * dt * c * right_new
            rhs.append(value)

        inside = thomas(lower, diagonal, upper, rhs)
        residual = max(abs(
            diagonal[j] * inside[j]
            + (lower[j] * inside[j - 1] if j > 0 else 0.0)
            + (upper[j] * inside[j + 1] if j + 1 < len(inside) else 0.0)
            - rhs[j]
        ) for j in range(len(inside)))
        return [left_new] + inside + [right_new], residual

    for j in range(n):
        if method == "R" and j == 0:
            values, residual = step(values, current_time, k / 2, 1.0)
            largest_residual = max(largest_residual, residual)
            values, residual = step(values, current_time + k / 2, k / 2, 1.0)
        else:
            theta = 1.0 if method == "BE" else 0.5
            values, residual = step(values, current_time, k, theta)
        largest_residual = max(largest_residual, residual)
        current_time += k
    return values, largest_residual


def main() -> None:
    target = bs_call(100.0, 100.0, 0.05, 0.02, 0.20, 1.0)
    print("U3-23: S0=K=100 JPY, T=1y, r=.05/y, q=.02/y, sigma=.20/sqrt(y), Smax=300")
    print(f"Black--Scholes reference: {target:.9f} JPY")
    print("M=60, h=5 JPY, N varies; residual is maximum |A x - rhs|")
    print(" N    BE (JPY)     CN (JPY)      R (JPY)   max residual")
    expected_n8 = {
        "BE": 9.024377918,
        "CN": 9.170439384,
        "R": 9.161575608,
    }
    for n in (8, 16, 32, 64, 128):
        solutions = {}
        residuals = []
        for method in ("BE", "CN", "R"):
            grid, residual = solve(method, 60, n)
            solutions[method] = grid[20]
            residuals.append(residual)
            assert residual < 1e-9, (method, n, residual)
            if method == "BE":
                assert min(grid) >= -1e-10
        print(
            f"{n:3}  {solutions['BE']:12.9f} {solutions['CN']:12.9f}"
            f" {solutions['R']:12.9f} {max(residuals):14.4g}"
        )
        if n == 8:
            for method, expected in expected_n8.items():
                assert abs(solutions[method] - expected) < 5e-9

    print("Grid effects at fixed N=64: M=30,60,120")
    for m in (30, 60, 120):
        grid, residual = solve("R", m, 64)
        i0 = m // 3
        print(f"  M={m:3}, h={300/m:5.2f}: value={grid[i0]:.9f}, "
              f"abs error={abs(grid[i0]-target):.9f}, residual={residual:.4g}")
        assert residual < 1e-9

    lam, dt = -20.0, 0.2
    be = 1 / (1 - dt * lam)
    cn = (1 + dt * lam / 2) / (1 - dt * lam / 2)
    rannacher = (1 - dt * lam / 2)**-2
    print("High-frequency scalar mode y'=lambda*y, lambda=-20/y, dt=0.2y:")
    print(f"  BE={be:.9f}; CN={cn:.9f}; R first step={rannacher:.9f}; "
          f"exact={math.exp(lam*dt):.9f}")
    assert abs(be - 0.2) < 1e-12
    assert abs(cn + 1 / 3) < 1e-12
    assert abs(rannacher - 1 / 9) < 1e-12
    print("PASS: tridiagonal residuals, positivity of BE, reference prices, damping")


if __name__ == "__main__":
    main()
